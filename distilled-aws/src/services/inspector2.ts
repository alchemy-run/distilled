import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Inspector2",
  serviceShapeName: "Inspector2",
});
const auth = T.AwsAuthSigv4({ name: "inspector2" });
const ver = T.ServiceVersion("2020-06-08");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type AccountId = string;
export type ValidationExceptionReason = string;
export type ScanConfigurationArn = string;
export type ProjectId = string;
export type AssociationResultStatusMessage = string;
export type Status = string;
export type ErrorCode = string;
export type NonEmptyString = string;
export type FindingArn = string;
export type CodeSnippetErrorCode = string;
export type CisaDateAdded = Date;
export type CisaDateDue = Date;
export type CisaAction = string;
export type RiskScore = number;
export type EvidenceRule = string;
export type EvidenceDetail = string;
export type EvidenceSeverity = string;
export type Ttp = string;
export type Tool = string;
export type LastSeen = Date;
export type FirstSeen = Date;
export type VulnerabilityReferenceUrl = string;
export type Cwe = string;
export type FindingDetailsErrorCode = string;
export type MeteringAccountId = string;
export type FreeTrialType = string;
export type FreeTrialStatus = string;
export type FreeTrialInfoErrorCode = string;
export type Ec2DeepInspectionStatus = string;
export type ReportId = string;
export type CisScanName = string;
export type TimeOfDay = string;
export type Timezone = string;
export type TargetAccount = string;
export type TargetResourceTagsKey = string;
export type TargetResourceTagsValue = string;
export type MapKey = string;
export type MapValue = string;
export type CisScanConfigurationArn = string;
export type IntegrationName = string;
export type InstanceUrl = string | redacted.Redacted<string>;
export type GitLabAccessToken = string | redacted.Redacted<string>;
export type CodeSecurityIntegrationArn = string;
export type AuthorizationUrl = string | redacted.Redacted<string>;
export type ScanConfigurationName = string;
export type FrequencyExpression = string;
export type FilterAction = string;
export type FilterDescription = string;
export type StringComparison = string;
export type StringInput = string;
export type MapComparison = string;
export type Port = number;
export type FilterName = string;
export type FilterReason = string;
export type FilterArn = string;
export type ReportFormat = string;
export type ResourceStringComparison = string;
export type ResourceStringInput = string;
export type ResourceMapComparison = string;
export type SbomReportFormat = string;
export type ResourceScanType = string;
export type ClientToken = string;
export type CisScanArn = string;
export type ResourceId = string;
export type NextToken = string;
export type GetCisScanResultDetailsMaxResults = number;
export type CisFindingArn = string;
export type GetClustersForImageNextToken = string;
export type CodeSecurityUuid = string;
export type EcrRescanDuration = string;
export type EcrRescanDurationStatus = string;
export type DateTimeTimestamp = Date;
export type EcrPullDateRescanDuration = string;
export type EcrPullDateRescanMode = string;
export type Ec2ScanMode = string;
export type Ec2ScanModeStatus = string;
export type RelationshipStatus = string;
export type Path = string;
export type ScanType = string;
export type ResourceType = string;
export type KmsKeyArn = string;
export type ExternalReportStatus = string;
export type ReportingErrorCode = string;
export type ErrorMessage = string;
export type Service = string;
export type ListAccountPermissionsMaxResults = number;
export type Operation = string;
export type ListCisScanConfigurationsMaxResults = number;
export type CisOwnerId = string;
export type CisScanResultsMaxResults = number;
export type ListCisScansMaxResults = number;
export type OwnerId = string;
export type ListCoverageMaxResults = number;
export type CoverageStringComparison = string;
export type CoverageStringInput = string;
export type CoverageMapComparison = string;
export type CoverageResourceType = string;
export type ScanStatusCode = string;
export type ScanStatusReason = string;
export type EcrScanFrequency = string;
export type AmiId = string;
export type Ec2Platform = string;
export type Runtime = string;
export type CodeRepositoryIntegrationArn = string;
export type CommitId = string;
export type ScanMode = string;
export type GroupKey = string;
export type AggCounts = number;
export type ListDelegatedAdminMaxResults = number;
export type DelegatedAdminStatus = string;
export type ListFilterMaxResults = number;
export type AggregationType = string;
export type ListFindingAggregationsMaxResults = number;
export type AggregationFindingType = string;
export type AggregationResourceType = string;
export type SortOrder = string;
export type AccountSortBy = string;
export type AmiSortBy = string;
export type AwsEcrContainerSortBy = string;
export type Ec2InstanceSortBy = string;
export type FindingTypeSortBy = string;
export type ImageLayerSortBy = string;
export type PackageSortBy = string;
export type RepositorySortBy = string;
export type TitleSortBy = string;
export type LambdaLayerSortBy = string;
export type LambdaFunctionSortBy = string;
export type CodeRepositorySortBy = string;
export type ListFindingsMaxResults = number;
export type SortField = string;
export type FindingType = string;
export type FindingDescription = string;
export type FindingTitle = string;
export type Severity = string;
export type FindingStatus = string;
export type IpV4Address = string;
export type IpV6Address = string;
export type Platform = string;
export type ImageHash = string;
export type FunctionName = string;
export type Version = string;
export type ExecutionRoleArn = string;
export type LambdaLayerArn = string;
export type SubnetId = string;
export type SecurityGroupId = string;
export type VpcId = string;
export type PackageType = string;
export type Architecture = string;
export type CodeRepositoryProjectName = string;
export type CodeRepositoryProviderType = string;
export type NetworkProtocol = string;
export type Component = string;
export type ComponentType = string;
export type ComponentArn = string;
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
export type FixAvailable = string;
export type ExploitAvailable = string;
export type EpssScoreValue = number;
export type ListMembersMaxResults = number;
export type Arn = string;
export type ListUsageTotalsMaxResults = number;
export type ListUsageTotalsNextToken = string;
export type UsageAccountId = string;
export type UsageType = string;
export type UsageValue = number;
export type MonthlyCostEstimate = number;
export type Currency = string;
export type VulnId = string;
export type VulnerabilitySource = string;
export type VulnerabilityDescription = string;
export type Target = string;
export type VendorSeverity = string;
export type CvssBaseScore = number;
export type CvssScoringVector = string;
export type RelatedVulnerability = string;
export type VendorCreatedAt = Date;
export type VendorUpdatedAt = Date;
export type VulnerabilitySourceUrl = string;
export type EpssScore = number;
export type UUID = string;
export type RuleId = string;
export type CisRuleDetails = Uint8Array;
export type CodeSecurityClientToken = string;
export type Reason = string;
export type CheckCount = number;
export type Vendor = string;
export type Product = string;
export type PlatformVersion = string;
export type BenchmarkVersion = string;
export type BenchmarkProfile = string;
export type TagKey = string;
export type GitLabAuthCode = string | redacted.Redacted<string>;
export type GitHubAuthCode = string | redacted.Redacted<string>;
export type GitHubInstallationId = string;

//# Schemas
export interface AssociateMemberRequest {
  accountId: string;
}
export const AssociateMemberRequest = S.suspend(() =>
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
).annotate({
  identifier: "AssociateMemberRequest",
}) as any as S.Schema<AssociateMemberRequest>;
export interface AssociateMemberResponse {
  accountId: string;
}
export const AssociateMemberResponse = S.suspend(() =>
  S.Struct({ accountId: S.String }),
).annotate({
  identifier: "AssociateMemberResponse",
}) as any as S.Schema<AssociateMemberResponse>;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFields = ValidationExceptionField[];
export const ValidationExceptionFields = S.Array(ValidationExceptionField);
export type CodeSecurityResource = { projectId: string };
export const CodeSecurityResource = S.Union([
  S.Struct({ projectId: S.String }),
]);
export interface AssociateConfigurationRequest {
  scanConfigurationArn: string;
  resource: CodeSecurityResource;
}
export const AssociateConfigurationRequest = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.String, resource: CodeSecurityResource }),
).annotate({
  identifier: "AssociateConfigurationRequest",
}) as any as S.Schema<AssociateConfigurationRequest>;
export type AssociateConfigurationRequestList = AssociateConfigurationRequest[];
export const AssociateConfigurationRequestList = S.Array(
  AssociateConfigurationRequest,
);
export interface BatchAssociateCodeSecurityScanConfigurationRequest {
  associateConfigurationRequests: AssociateConfigurationRequest[];
}
export const BatchAssociateCodeSecurityScanConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      associateConfigurationRequests: AssociateConfigurationRequestList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/codesecurity/scan-configuration/batch/associate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchAssociateCodeSecurityScanConfigurationRequest",
}) as any as S.Schema<BatchAssociateCodeSecurityScanConfigurationRequest>;
export type AssociationResultStatusCode =
  | "INTERNAL_ERROR"
  | "ACCESS_DENIED"
  | "SCAN_CONFIGURATION_NOT_FOUND"
  | "INVALID_INPUT"
  | "RESOURCE_NOT_FOUND"
  | "QUOTA_EXCEEDED"
  | (string & {});
export const AssociationResultStatusCode = S.String;
export interface FailedAssociationResult {
  scanConfigurationArn?: string;
  resource?: CodeSecurityResource;
  statusCode?: AssociationResultStatusCode;
  statusMessage?: string;
}
export const FailedAssociationResult = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.optional(S.String),
    resource: S.optional(CodeSecurityResource),
    statusCode: S.optional(AssociationResultStatusCode),
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedAssociationResult",
}) as any as S.Schema<FailedAssociationResult>;
export type FailedAssociationResultList = FailedAssociationResult[];
export const FailedAssociationResultList = S.Array(FailedAssociationResult);
export interface SuccessfulAssociationResult {
  scanConfigurationArn?: string;
  resource?: CodeSecurityResource;
}
export const SuccessfulAssociationResult = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.optional(S.String),
    resource: S.optional(CodeSecurityResource),
  }),
).annotate({
  identifier: "SuccessfulAssociationResult",
}) as any as S.Schema<SuccessfulAssociationResult>;
export type SuccessfulAssociationResultList = SuccessfulAssociationResult[];
export const SuccessfulAssociationResultList = S.Array(
  SuccessfulAssociationResult,
);
export interface BatchAssociateCodeSecurityScanConfigurationResponse {
  failedAssociations?: FailedAssociationResult[];
  successfulAssociations?: SuccessfulAssociationResult[];
}
export const BatchAssociateCodeSecurityScanConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      failedAssociations: S.optional(FailedAssociationResultList),
      successfulAssociations: S.optional(SuccessfulAssociationResultList),
    }),
).annotate({
  identifier: "BatchAssociateCodeSecurityScanConfigurationResponse",
}) as any as S.Schema<BatchAssociateCodeSecurityScanConfigurationResponse>;
export interface DisassociateConfigurationRequest {
  scanConfigurationArn: string;
  resource: CodeSecurityResource;
}
export const DisassociateConfigurationRequest = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.String, resource: CodeSecurityResource }),
).annotate({
  identifier: "DisassociateConfigurationRequest",
}) as any as S.Schema<DisassociateConfigurationRequest>;
export type DisassociateConfigurationRequestList =
  DisassociateConfigurationRequest[];
export const DisassociateConfigurationRequestList = S.Array(
  DisassociateConfigurationRequest,
);
export interface BatchDisassociateCodeSecurityScanConfigurationRequest {
  disassociateConfigurationRequests: DisassociateConfigurationRequest[];
}
export const BatchDisassociateCodeSecurityScanConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      disassociateConfigurationRequests: DisassociateConfigurationRequestList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/codesecurity/scan-configuration/batch/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDisassociateCodeSecurityScanConfigurationRequest",
}) as any as S.Schema<BatchDisassociateCodeSecurityScanConfigurationRequest>;
export interface BatchDisassociateCodeSecurityScanConfigurationResponse {
  failedAssociations?: FailedAssociationResult[];
  successfulAssociations?: SuccessfulAssociationResult[];
}
export const BatchDisassociateCodeSecurityScanConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      failedAssociations: S.optional(FailedAssociationResultList),
      successfulAssociations: S.optional(SuccessfulAssociationResultList),
    }),
).annotate({
  identifier: "BatchDisassociateCodeSecurityScanConfigurationResponse",
}) as any as S.Schema<BatchDisassociateCodeSecurityScanConfigurationResponse>;
export type AccountIdSet = string[];
export const AccountIdSet = S.Array(S.String);
export interface BatchGetAccountStatusRequest {
  accountIds?: string[];
}
export const BatchGetAccountStatusRequest = S.suspend(() =>
  S.Struct({ accountIds: S.optional(AccountIdSet) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/status/batch/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetAccountStatusRequest",
}) as any as S.Schema<BatchGetAccountStatusRequest>;
export interface State {
  status: string;
  errorCode: string;
  errorMessage: string;
}
export const State = S.suspend(() =>
  S.Struct({ status: S.String, errorCode: S.String, errorMessage: S.String }),
).annotate({ identifier: "State" }) as any as S.Schema<State>;
export interface ResourceState {
  ec2: State;
  ecr: State;
  lambda?: State;
  lambdaCode?: State;
  codeRepository?: State;
}
export const ResourceState = S.suspend(() =>
  S.Struct({
    ec2: State,
    ecr: State,
    lambda: S.optional(State),
    lambdaCode: S.optional(State),
    codeRepository: S.optional(State),
  }),
).annotate({ identifier: "ResourceState" }) as any as S.Schema<ResourceState>;
export interface AccountState {
  accountId: string;
  state: State;
  resourceState: ResourceState;
}
export const AccountState = S.suspend(() =>
  S.Struct({ accountId: S.String, state: State, resourceState: ResourceState }),
).annotate({ identifier: "AccountState" }) as any as S.Schema<AccountState>;
export type AccountStateList = AccountState[];
export const AccountStateList = S.Array(AccountState);
export interface ResourceStatus {
  ec2: string;
  ecr: string;
  lambda?: string;
  lambdaCode?: string;
  codeRepository?: string;
}
export const ResourceStatus = S.suspend(() =>
  S.Struct({
    ec2: S.String,
    ecr: S.String,
    lambda: S.optional(S.String),
    lambdaCode: S.optional(S.String),
    codeRepository: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceStatus" }) as any as S.Schema<ResourceStatus>;
export interface FailedAccount {
  accountId: string;
  status?: string;
  resourceStatus?: ResourceStatus;
  errorCode: string;
  errorMessage: string;
}
export const FailedAccount = S.suspend(() =>
  S.Struct({
    accountId: S.String,
    status: S.optional(S.String),
    resourceStatus: S.optional(ResourceStatus),
    errorCode: S.String,
    errorMessage: S.String,
  }),
).annotate({ identifier: "FailedAccount" }) as any as S.Schema<FailedAccount>;
export type FailedAccountList = FailedAccount[];
export const FailedAccountList = S.Array(FailedAccount);
export interface BatchGetAccountStatusResponse {
  accounts: AccountState[];
  failedAccounts?: FailedAccount[];
}
export const BatchGetAccountStatusResponse = S.suspend(() =>
  S.Struct({
    accounts: AccountStateList,
    failedAccounts: S.optional(FailedAccountList),
  }),
).annotate({
  identifier: "BatchGetAccountStatusResponse",
}) as any as S.Schema<BatchGetAccountStatusResponse>;
export type FindingArns = string[];
export const FindingArns = S.Array(S.String);
export interface BatchGetCodeSnippetRequest {
  findingArns: string[];
}
export const BatchGetCodeSnippetRequest = S.suspend(() =>
  S.Struct({ findingArns: FindingArns }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/codesnippet/batchget" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetCodeSnippetRequest",
}) as any as S.Schema<BatchGetCodeSnippetRequest>;
export interface CodeLine {
  content: string;
  lineNumber: number;
}
export const CodeLine = S.suspend(() =>
  S.Struct({ content: S.String, lineNumber: S.Number }),
).annotate({ identifier: "CodeLine" }) as any as S.Schema<CodeLine>;
export type CodeLineList = CodeLine[];
export const CodeLineList = S.Array(CodeLine);
export interface SuggestedFix {
  description?: string;
  code?: string;
}
export const SuggestedFix = S.suspend(() =>
  S.Struct({ description: S.optional(S.String), code: S.optional(S.String) }),
).annotate({ identifier: "SuggestedFix" }) as any as S.Schema<SuggestedFix>;
export type SuggestedFixes = SuggestedFix[];
export const SuggestedFixes = S.Array(SuggestedFix);
export interface CodeSnippetResult {
  findingArn?: string;
  startLine?: number;
  endLine?: number;
  codeSnippet?: CodeLine[];
  suggestedFixes?: SuggestedFix[];
}
export const CodeSnippetResult = S.suspend(() =>
  S.Struct({
    findingArn: S.optional(S.String),
    startLine: S.optional(S.Number),
    endLine: S.optional(S.Number),
    codeSnippet: S.optional(CodeLineList),
    suggestedFixes: S.optional(SuggestedFixes),
  }),
).annotate({
  identifier: "CodeSnippetResult",
}) as any as S.Schema<CodeSnippetResult>;
export type CodeSnippetResultList = CodeSnippetResult[];
export const CodeSnippetResultList = S.Array(CodeSnippetResult);
export interface CodeSnippetError {
  findingArn: string;
  errorCode: string;
  errorMessage: string;
}
export const CodeSnippetError = S.suspend(() =>
  S.Struct({
    findingArn: S.String,
    errorCode: S.String,
    errorMessage: S.String,
  }),
).annotate({
  identifier: "CodeSnippetError",
}) as any as S.Schema<CodeSnippetError>;
export type CodeSnippetErrorList = CodeSnippetError[];
export const CodeSnippetErrorList = S.Array(CodeSnippetError);
export interface BatchGetCodeSnippetResponse {
  codeSnippetResults?: CodeSnippetResult[];
  errors?: CodeSnippetError[];
}
export const BatchGetCodeSnippetResponse = S.suspend(() =>
  S.Struct({
    codeSnippetResults: S.optional(CodeSnippetResultList),
    errors: S.optional(CodeSnippetErrorList),
  }),
).annotate({
  identifier: "BatchGetCodeSnippetResponse",
}) as any as S.Schema<BatchGetCodeSnippetResponse>;
export type FindingArnList = string[];
export const FindingArnList = S.Array(S.String);
export interface BatchGetFindingDetailsRequest {
  findingArns: string[];
}
export const BatchGetFindingDetailsRequest = S.suspend(() =>
  S.Struct({ findingArns: FindingArnList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/details/batch/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetFindingDetailsRequest",
}) as any as S.Schema<BatchGetFindingDetailsRequest>;
export interface CisaData {
  dateAdded?: Date;
  dateDue?: Date;
  action?: string;
}
export const CisaData = S.suspend(() =>
  S.Struct({
    dateAdded: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    dateDue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    action: S.optional(S.String),
  }),
).annotate({ identifier: "CisaData" }) as any as S.Schema<CisaData>;
export interface Evidence {
  evidenceRule?: string;
  evidenceDetail?: string;
  severity?: string;
}
export const Evidence = S.suspend(() =>
  S.Struct({
    evidenceRule: S.optional(S.String),
    evidenceDetail: S.optional(S.String),
    severity: S.optional(S.String),
  }),
).annotate({ identifier: "Evidence" }) as any as S.Schema<Evidence>;
export type EvidenceList = Evidence[];
export const EvidenceList = S.Array(Evidence);
export type Ttps = string[];
export const Ttps = S.Array(S.String);
export type Tools = string[];
export const Tools = S.Array(S.String);
export interface ExploitObserved {
  lastSeen?: Date;
  firstSeen?: Date;
}
export const ExploitObserved = S.suspend(() =>
  S.Struct({
    lastSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    firstSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ExploitObserved",
}) as any as S.Schema<ExploitObserved>;
export type VulnerabilityReferenceUrls = string[];
export const VulnerabilityReferenceUrls = S.Array(S.String);
export type Cwes = string[];
export const Cwes = S.Array(S.String);
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
export const FindingDetail = S.suspend(() =>
  S.Struct({
    findingArn: S.optional(S.String),
    cisaData: S.optional(CisaData),
    riskScore: S.optional(S.Number),
    evidences: S.optional(EvidenceList),
    ttps: S.optional(Ttps),
    tools: S.optional(Tools),
    exploitObserved: S.optional(ExploitObserved),
    referenceUrls: S.optional(VulnerabilityReferenceUrls),
    cwes: S.optional(Cwes),
    epssScore: S.optional(S.Number),
  }),
).annotate({ identifier: "FindingDetail" }) as any as S.Schema<FindingDetail>;
export type FindingDetails = FindingDetail[];
export const FindingDetails = S.Array(FindingDetail);
export interface FindingDetailsError {
  findingArn: string;
  errorCode: string;
  errorMessage: string;
}
export const FindingDetailsError = S.suspend(() =>
  S.Struct({
    findingArn: S.String,
    errorCode: S.String,
    errorMessage: S.String,
  }),
).annotate({
  identifier: "FindingDetailsError",
}) as any as S.Schema<FindingDetailsError>;
export type FindingDetailsErrorList = FindingDetailsError[];
export const FindingDetailsErrorList = S.Array(FindingDetailsError);
export interface BatchGetFindingDetailsResponse {
  findingDetails?: FindingDetail[];
  errors?: FindingDetailsError[];
}
export const BatchGetFindingDetailsResponse = S.suspend(() =>
  S.Struct({
    findingDetails: S.optional(FindingDetails),
    errors: S.optional(FindingDetailsErrorList),
  }),
).annotate({
  identifier: "BatchGetFindingDetailsResponse",
}) as any as S.Schema<BatchGetFindingDetailsResponse>;
export type MeteringAccountIdList = string[];
export const MeteringAccountIdList = S.Array(S.String);
export interface BatchGetFreeTrialInfoRequest {
  accountIds: string[];
}
export const BatchGetFreeTrialInfoRequest = S.suspend(() =>
  S.Struct({ accountIds: MeteringAccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/freetrialinfo/batchget" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetFreeTrialInfoRequest",
}) as any as S.Schema<BatchGetFreeTrialInfoRequest>;
export interface FreeTrialInfo {
  type: string;
  start: Date;
  end: Date;
  status: string;
}
export const FreeTrialInfo = S.suspend(() =>
  S.Struct({
    type: S.String,
    start: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    end: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: S.String,
  }),
).annotate({ identifier: "FreeTrialInfo" }) as any as S.Schema<FreeTrialInfo>;
export type FreeTrialInfoList = FreeTrialInfo[];
export const FreeTrialInfoList = S.Array(FreeTrialInfo);
export interface FreeTrialAccountInfo {
  accountId: string;
  freeTrialInfo: FreeTrialInfo[];
}
export const FreeTrialAccountInfo = S.suspend(() =>
  S.Struct({ accountId: S.String, freeTrialInfo: FreeTrialInfoList }),
).annotate({
  identifier: "FreeTrialAccountInfo",
}) as any as S.Schema<FreeTrialAccountInfo>;
export type FreeTrialAccountInfoList = FreeTrialAccountInfo[];
export const FreeTrialAccountInfoList = S.Array(FreeTrialAccountInfo);
export interface FreeTrialInfoError {
  accountId: string;
  code: string;
  message: string;
}
export const FreeTrialInfoError = S.suspend(() =>
  S.Struct({ accountId: S.String, code: S.String, message: S.String }),
).annotate({
  identifier: "FreeTrialInfoError",
}) as any as S.Schema<FreeTrialInfoError>;
export type FreeTrialInfoErrorList = FreeTrialInfoError[];
export const FreeTrialInfoErrorList = S.Array(FreeTrialInfoError);
export interface BatchGetFreeTrialInfoResponse {
  accounts: FreeTrialAccountInfo[];
  failedAccounts: FreeTrialInfoError[];
}
export const BatchGetFreeTrialInfoResponse = S.suspend(() =>
  S.Struct({
    accounts: FreeTrialAccountInfoList,
    failedAccounts: FreeTrialInfoErrorList,
  }),
).annotate({
  identifier: "BatchGetFreeTrialInfoResponse",
}) as any as S.Schema<BatchGetFreeTrialInfoResponse>;
export interface BatchGetMemberEc2DeepInspectionStatusRequest {
  accountIds?: string[];
}
export const BatchGetMemberEc2DeepInspectionStatusRequest = S.suspend(() =>
  S.Struct({ accountIds: S.optional(AccountIdSet) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ec2deepinspectionstatus/member/batch/get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetMemberEc2DeepInspectionStatusRequest",
}) as any as S.Schema<BatchGetMemberEc2DeepInspectionStatusRequest>;
export interface MemberAccountEc2DeepInspectionStatusState {
  accountId: string;
  status?: string;
  errorMessage?: string;
}
export const MemberAccountEc2DeepInspectionStatusState = S.suspend(() =>
  S.Struct({
    accountId: S.String,
    status: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "MemberAccountEc2DeepInspectionStatusState",
}) as any as S.Schema<MemberAccountEc2DeepInspectionStatusState>;
export type MemberAccountEc2DeepInspectionStatusStateList =
  MemberAccountEc2DeepInspectionStatusState[];
export const MemberAccountEc2DeepInspectionStatusStateList = S.Array(
  MemberAccountEc2DeepInspectionStatusState,
);
export interface FailedMemberAccountEc2DeepInspectionStatusState {
  accountId: string;
  ec2ScanStatus?: string;
  errorMessage?: string;
}
export const FailedMemberAccountEc2DeepInspectionStatusState = S.suspend(() =>
  S.Struct({
    accountId: S.String,
    ec2ScanStatus: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedMemberAccountEc2DeepInspectionStatusState",
}) as any as S.Schema<FailedMemberAccountEc2DeepInspectionStatusState>;
export type FailedMemberAccountEc2DeepInspectionStatusStateList =
  FailedMemberAccountEc2DeepInspectionStatusState[];
export const FailedMemberAccountEc2DeepInspectionStatusStateList = S.Array(
  FailedMemberAccountEc2DeepInspectionStatusState,
);
export interface BatchGetMemberEc2DeepInspectionStatusResponse {
  accountIds?: MemberAccountEc2DeepInspectionStatusState[];
  failedAccountIds?: FailedMemberAccountEc2DeepInspectionStatusState[];
}
export const BatchGetMemberEc2DeepInspectionStatusResponse = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(MemberAccountEc2DeepInspectionStatusStateList),
    failedAccountIds: S.optional(
      FailedMemberAccountEc2DeepInspectionStatusStateList,
    ),
  }),
).annotate({
  identifier: "BatchGetMemberEc2DeepInspectionStatusResponse",
}) as any as S.Schema<BatchGetMemberEc2DeepInspectionStatusResponse>;
export interface MemberAccountEc2DeepInspectionStatus {
  accountId: string;
  activateDeepInspection: boolean;
}
export const MemberAccountEc2DeepInspectionStatus = S.suspend(() =>
  S.Struct({ accountId: S.String, activateDeepInspection: S.Boolean }),
).annotate({
  identifier: "MemberAccountEc2DeepInspectionStatus",
}) as any as S.Schema<MemberAccountEc2DeepInspectionStatus>;
export type MemberAccountEc2DeepInspectionStatusList =
  MemberAccountEc2DeepInspectionStatus[];
export const MemberAccountEc2DeepInspectionStatusList = S.Array(
  MemberAccountEc2DeepInspectionStatus,
);
export interface BatchUpdateMemberEc2DeepInspectionStatusRequest {
  accountIds: MemberAccountEc2DeepInspectionStatus[];
}
export const BatchUpdateMemberEc2DeepInspectionStatusRequest = S.suspend(() =>
  S.Struct({ accountIds: MemberAccountEc2DeepInspectionStatusList }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ec2deepinspectionstatus/member/batch/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateMemberEc2DeepInspectionStatusRequest",
}) as any as S.Schema<BatchUpdateMemberEc2DeepInspectionStatusRequest>;
export interface BatchUpdateMemberEc2DeepInspectionStatusResponse {
  accountIds?: MemberAccountEc2DeepInspectionStatusState[];
  failedAccountIds?: FailedMemberAccountEc2DeepInspectionStatusState[];
}
export const BatchUpdateMemberEc2DeepInspectionStatusResponse = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(MemberAccountEc2DeepInspectionStatusStateList),
    failedAccountIds: S.optional(
      FailedMemberAccountEc2DeepInspectionStatusStateList,
    ),
  }),
).annotate({
  identifier: "BatchUpdateMemberEc2DeepInspectionStatusResponse",
}) as any as S.Schema<BatchUpdateMemberEc2DeepInspectionStatusResponse>;
export interface CancelFindingsReportRequest {
  reportId: string;
}
export const CancelFindingsReportRequest = S.suspend(() =>
  S.Struct({ reportId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reporting/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelFindingsReportRequest",
}) as any as S.Schema<CancelFindingsReportRequest>;
export interface CancelFindingsReportResponse {
  reportId: string;
}
export const CancelFindingsReportResponse = S.suspend(() =>
  S.Struct({ reportId: S.String }),
).annotate({
  identifier: "CancelFindingsReportResponse",
}) as any as S.Schema<CancelFindingsReportResponse>;
export interface CancelSbomExportRequest {
  reportId: string;
}
export const CancelSbomExportRequest = S.suspend(() =>
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
).annotate({
  identifier: "CancelSbomExportRequest",
}) as any as S.Schema<CancelSbomExportRequest>;
export interface CancelSbomExportResponse {
  reportId?: string;
}
export const CancelSbomExportResponse = S.suspend(() =>
  S.Struct({ reportId: S.optional(S.String) }),
).annotate({
  identifier: "CancelSbomExportResponse",
}) as any as S.Schema<CancelSbomExportResponse>;
export type CisSecurityLevel = "LEVEL_1" | "LEVEL_2" | (string & {});
export const CisSecurityLevel = S.String;
export interface OneTimeSchedule {}
export const OneTimeSchedule = S.suspend(() => S.Struct({})).annotate({
  identifier: "OneTimeSchedule",
}) as any as S.Schema<OneTimeSchedule>;
export interface Time {
  timeOfDay: string;
  timezone: string;
}
export const Time = S.suspend(() =>
  S.Struct({ timeOfDay: S.String, timezone: S.String }),
).annotate({ identifier: "Time" }) as any as S.Schema<Time>;
export interface DailySchedule {
  startTime: Time;
}
export const DailySchedule = S.suspend(() =>
  S.Struct({ startTime: Time }),
).annotate({ identifier: "DailySchedule" }) as any as S.Schema<DailySchedule>;
export type Day =
  | "SUN"
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | (string & {});
export const Day = S.String;
export type DaysList = Day[];
export const DaysList = S.Array(Day);
export interface WeeklySchedule {
  startTime: Time;
  days: Day[];
}
export const WeeklySchedule = S.suspend(() =>
  S.Struct({ startTime: Time, days: DaysList }),
).annotate({ identifier: "WeeklySchedule" }) as any as S.Schema<WeeklySchedule>;
export interface MonthlySchedule {
  startTime: Time;
  day: Day;
}
export const MonthlySchedule = S.suspend(() =>
  S.Struct({ startTime: Time, day: Day }),
).annotate({
  identifier: "MonthlySchedule",
}) as any as S.Schema<MonthlySchedule>;
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
export const Schedule = S.Union([
  S.Struct({ oneTime: OneTimeSchedule }),
  S.Struct({ daily: DailySchedule }),
  S.Struct({ weekly: WeeklySchedule }),
  S.Struct({ monthly: MonthlySchedule }),
]);
export type TargetAccountList = string[];
export const TargetAccountList = S.Array(S.String);
export type TagValueList = string[];
export const TagValueList = S.Array(S.String);
export type TargetResourceTags = { [key: string]: string[] | undefined };
export const TargetResourceTags = S.Record(
  S.String,
  TagValueList.pipe(S.optional),
);
export interface CreateCisTargets {
  accountIds: string[];
  targetResourceTags: { [key: string]: string[] | undefined };
}
export const CreateCisTargets = S.suspend(() =>
  S.Struct({
    accountIds: TargetAccountList,
    targetResourceTags: TargetResourceTags,
  }),
).annotate({
  identifier: "CreateCisTargets",
}) as any as S.Schema<CreateCisTargets>;
export type CisTagMap = { [key: string]: string | undefined };
export const CisTagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateCisScanConfigurationRequest {
  scanName: string;
  securityLevel: CisSecurityLevel;
  schedule: Schedule;
  targets: CreateCisTargets;
  tags?: { [key: string]: string | undefined };
}
export const CreateCisScanConfigurationRequest = S.suspend(() =>
  S.Struct({
    scanName: S.String,
    securityLevel: CisSecurityLevel,
    schedule: Schedule,
    targets: CreateCisTargets,
    tags: S.optional(CisTagMap),
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
).annotate({
  identifier: "CreateCisScanConfigurationRequest",
}) as any as S.Schema<CreateCisScanConfigurationRequest>;
export interface CreateCisScanConfigurationResponse {
  scanConfigurationArn?: string;
}
export const CreateCisScanConfigurationResponse = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateCisScanConfigurationResponse",
}) as any as S.Schema<CreateCisScanConfigurationResponse>;
export type IntegrationType = "GITLAB_SELF_MANAGED" | "GITHUB" | (string & {});
export const IntegrationType = S.String;
export interface CreateGitLabSelfManagedIntegrationDetail {
  instanceUrl: string | redacted.Redacted<string>;
  accessToken: string | redacted.Redacted<string>;
}
export const CreateGitLabSelfManagedIntegrationDetail = S.suspend(() =>
  S.Struct({ instanceUrl: SensitiveString, accessToken: SensitiveString }),
).annotate({
  identifier: "CreateGitLabSelfManagedIntegrationDetail",
}) as any as S.Schema<CreateGitLabSelfManagedIntegrationDetail>;
export type CreateIntegrationDetail = {
  gitlabSelfManaged: CreateGitLabSelfManagedIntegrationDetail;
};
export const CreateIntegrationDetail = S.Union([
  S.Struct({ gitlabSelfManaged: CreateGitLabSelfManagedIntegrationDetail }),
]);
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateCodeSecurityIntegrationRequest {
  name: string;
  type: IntegrationType;
  details?: CreateIntegrationDetail;
  tags?: { [key: string]: string | undefined };
}
export const CreateCodeSecurityIntegrationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    type: IntegrationType,
    details: S.optional(CreateIntegrationDetail),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreateCodeSecurityIntegrationRequest",
}) as any as S.Schema<CreateCodeSecurityIntegrationRequest>;
export type IntegrationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLING"
  | (string & {});
export const IntegrationStatus = S.String;
export interface CreateCodeSecurityIntegrationResponse {
  integrationArn: string;
  status: IntegrationStatus;
  authorizationUrl?: string | redacted.Redacted<string>;
}
export const CreateCodeSecurityIntegrationResponse = S.suspend(() =>
  S.Struct({
    integrationArn: S.String,
    status: IntegrationStatus,
    authorizationUrl: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CreateCodeSecurityIntegrationResponse",
}) as any as S.Schema<CreateCodeSecurityIntegrationResponse>;
export type ConfigurationLevel = "ORGANIZATION" | "ACCOUNT" | (string & {});
export const ConfigurationLevel = S.String;
export type PeriodicScanFrequency =
  | "WEEKLY"
  | "MONTHLY"
  | "NEVER"
  | (string & {});
export const PeriodicScanFrequency = S.String;
export interface PeriodicScanConfiguration {
  frequency?: PeriodicScanFrequency;
  frequencyExpression?: string;
}
export const PeriodicScanConfiguration = S.suspend(() =>
  S.Struct({
    frequency: S.optional(PeriodicScanFrequency),
    frequencyExpression: S.optional(S.String),
  }),
).annotate({
  identifier: "PeriodicScanConfiguration",
}) as any as S.Schema<PeriodicScanConfiguration>;
export type ContinuousIntegrationScanEvent =
  | "PULL_REQUEST"
  | "PUSH"
  | (string & {});
export const ContinuousIntegrationScanEvent = S.String;
export type ContinuousIntegrationScanSupportedEvents =
  ContinuousIntegrationScanEvent[];
export const ContinuousIntegrationScanSupportedEvents = S.Array(
  ContinuousIntegrationScanEvent,
);
export interface ContinuousIntegrationScanConfiguration {
  supportedEvents: ContinuousIntegrationScanEvent[];
}
export const ContinuousIntegrationScanConfiguration = S.suspend(() =>
  S.Struct({ supportedEvents: ContinuousIntegrationScanSupportedEvents }),
).annotate({
  identifier: "ContinuousIntegrationScanConfiguration",
}) as any as S.Schema<ContinuousIntegrationScanConfiguration>;
export type RuleSetCategory = "SAST" | "IAC" | "SCA" | (string & {});
export const RuleSetCategory = S.String;
export type RuleSetCategories = RuleSetCategory[];
export const RuleSetCategories = S.Array(RuleSetCategory);
export interface CodeSecurityScanConfiguration {
  periodicScanConfiguration?: PeriodicScanConfiguration;
  continuousIntegrationScanConfiguration?: ContinuousIntegrationScanConfiguration;
  ruleSetCategories: RuleSetCategory[];
}
export const CodeSecurityScanConfiguration = S.suspend(() =>
  S.Struct({
    periodicScanConfiguration: S.optional(PeriodicScanConfiguration),
    continuousIntegrationScanConfiguration: S.optional(
      ContinuousIntegrationScanConfiguration,
    ),
    ruleSetCategories: RuleSetCategories,
  }),
).annotate({
  identifier: "CodeSecurityScanConfiguration",
}) as any as S.Schema<CodeSecurityScanConfiguration>;
export type ProjectSelectionScope = "ALL" | (string & {});
export const ProjectSelectionScope = S.String;
export interface ScopeSettings {
  projectSelectionScope?: ProjectSelectionScope;
}
export const ScopeSettings = S.suspend(() =>
  S.Struct({ projectSelectionScope: S.optional(ProjectSelectionScope) }),
).annotate({ identifier: "ScopeSettings" }) as any as S.Schema<ScopeSettings>;
export interface CreateCodeSecurityScanConfigurationRequest {
  name: string;
  level: ConfigurationLevel;
  configuration: CodeSecurityScanConfiguration;
  scopeSettings?: ScopeSettings;
  tags?: { [key: string]: string | undefined };
}
export const CreateCodeSecurityScanConfigurationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    level: ConfigurationLevel,
    configuration: CodeSecurityScanConfiguration,
    scopeSettings: S.optional(ScopeSettings),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/codesecurity/scan-configuration/create",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCodeSecurityScanConfigurationRequest",
}) as any as S.Schema<CreateCodeSecurityScanConfigurationRequest>;
export interface CreateCodeSecurityScanConfigurationResponse {
  scanConfigurationArn: string;
}
export const CreateCodeSecurityScanConfigurationResponse = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.String }),
).annotate({
  identifier: "CreateCodeSecurityScanConfigurationResponse",
}) as any as S.Schema<CreateCodeSecurityScanConfigurationResponse>;
export interface StringFilter {
  comparison: string;
  value: string;
}
export const StringFilter = S.suspend(() =>
  S.Struct({ comparison: S.String, value: S.String }),
).annotate({ identifier: "StringFilter" }) as any as S.Schema<StringFilter>;
export type StringFilterList = StringFilter[];
export const StringFilterList = S.Array(StringFilter);
export interface DateFilter {
  startInclusive?: Date;
  endInclusive?: Date;
}
export const DateFilter = S.suspend(() =>
  S.Struct({
    startInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DateFilter" }) as any as S.Schema<DateFilter>;
export type DateFilterList = DateFilter[];
export const DateFilterList = S.Array(DateFilter);
export interface NumberFilter {
  upperInclusive?: number;
  lowerInclusive?: number;
}
export const NumberFilter = S.suspend(() =>
  S.Struct({
    upperInclusive: S.optional(S.Number),
    lowerInclusive: S.optional(S.Number),
  }),
).annotate({ identifier: "NumberFilter" }) as any as S.Schema<NumberFilter>;
export type NumberFilterList = NumberFilter[];
export const NumberFilterList = S.Array(NumberFilter);
export interface MapFilter {
  comparison: string;
  key: string;
  value?: string;
}
export const MapFilter = S.suspend(() =>
  S.Struct({
    comparison: S.String,
    key: S.String,
    value: S.optional(S.String),
  }),
).annotate({ identifier: "MapFilter" }) as any as S.Schema<MapFilter>;
export type MapFilterList = MapFilter[];
export const MapFilterList = S.Array(MapFilter);
export interface PortRangeFilter {
  beginInclusive?: number;
  endInclusive?: number;
}
export const PortRangeFilter = S.suspend(() =>
  S.Struct({
    beginInclusive: S.optional(S.Number),
    endInclusive: S.optional(S.Number),
  }),
).annotate({
  identifier: "PortRangeFilter",
}) as any as S.Schema<PortRangeFilter>;
export type PortRangeFilterList = PortRangeFilter[];
export const PortRangeFilterList = S.Array(PortRangeFilter);
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
export const PackageFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(StringFilter),
    version: S.optional(StringFilter),
    epoch: S.optional(NumberFilter),
    release: S.optional(StringFilter),
    architecture: S.optional(StringFilter),
    sourceLayerHash: S.optional(StringFilter),
    sourceLambdaLayerArn: S.optional(StringFilter),
    filePath: S.optional(StringFilter),
  }),
).annotate({ identifier: "PackageFilter" }) as any as S.Schema<PackageFilter>;
export type PackageFilterList = PackageFilter[];
export const PackageFilterList = S.Array(PackageFilter);
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
}
export const FilterCriteria = S.suspend(() =>
  S.Struct({
    findingArn: S.optional(StringFilterList),
    awsAccountId: S.optional(StringFilterList),
    findingType: S.optional(StringFilterList),
    severity: S.optional(StringFilterList),
    firstObservedAt: S.optional(DateFilterList),
    lastObservedAt: S.optional(DateFilterList),
    updatedAt: S.optional(DateFilterList),
    findingStatus: S.optional(StringFilterList),
    title: S.optional(StringFilterList),
    inspectorScore: S.optional(NumberFilterList),
    resourceType: S.optional(StringFilterList),
    resourceId: S.optional(StringFilterList),
    resourceTags: S.optional(MapFilterList),
    ec2InstanceImageId: S.optional(StringFilterList),
    ec2InstanceVpcId: S.optional(StringFilterList),
    ec2InstanceSubnetId: S.optional(StringFilterList),
    ecrImagePushedAt: S.optional(DateFilterList),
    ecrImageArchitecture: S.optional(StringFilterList),
    ecrImageRegistry: S.optional(StringFilterList),
    ecrImageRepositoryName: S.optional(StringFilterList),
    ecrImageTags: S.optional(StringFilterList),
    ecrImageHash: S.optional(StringFilterList),
    ecrImageLastInUseAt: S.optional(DateFilterList),
    ecrImageInUseCount: S.optional(NumberFilterList),
    portRange: S.optional(PortRangeFilterList),
    networkProtocol: S.optional(StringFilterList),
    componentId: S.optional(StringFilterList),
    componentType: S.optional(StringFilterList),
    vulnerabilityId: S.optional(StringFilterList),
    vulnerabilitySource: S.optional(StringFilterList),
    vendorSeverity: S.optional(StringFilterList),
    vulnerablePackages: S.optional(PackageFilterList),
    relatedVulnerabilities: S.optional(StringFilterList),
    fixAvailable: S.optional(StringFilterList),
    lambdaFunctionName: S.optional(StringFilterList),
    lambdaFunctionLayers: S.optional(StringFilterList),
    lambdaFunctionRuntime: S.optional(StringFilterList),
    lambdaFunctionLastModifiedAt: S.optional(DateFilterList),
    lambdaFunctionExecutionRoleArn: S.optional(StringFilterList),
    exploitAvailable: S.optional(StringFilterList),
    codeVulnerabilityDetectorName: S.optional(StringFilterList),
    codeVulnerabilityDetectorTags: S.optional(StringFilterList),
    codeVulnerabilityFilePath: S.optional(StringFilterList),
    epssScore: S.optional(NumberFilterList),
    codeRepositoryProjectName: S.optional(StringFilterList),
    codeRepositoryProviderType: S.optional(StringFilterList),
  }),
).annotate({ identifier: "FilterCriteria" }) as any as S.Schema<FilterCriteria>;
export interface CreateFilterRequest {
  action: string;
  description?: string;
  filterCriteria: FilterCriteria;
  name: string;
  tags?: { [key: string]: string | undefined };
  reason?: string;
}
export const CreateFilterRequest = S.suspend(() =>
  S.Struct({
    action: S.String,
    description: S.optional(S.String),
    filterCriteria: FilterCriteria,
    name: S.String,
    tags: S.optional(TagMap),
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/filters/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFilterRequest",
}) as any as S.Schema<CreateFilterRequest>;
export interface CreateFilterResponse {
  arn: string;
}
export const CreateFilterResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "CreateFilterResponse",
}) as any as S.Schema<CreateFilterResponse>;
export interface Destination {
  bucketName: string;
  keyPrefix?: string;
  kmsKeyArn: string;
}
export const Destination = S.suspend(() =>
  S.Struct({
    bucketName: S.String,
    keyPrefix: S.optional(S.String),
    kmsKeyArn: S.String,
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface CreateFindingsReportRequest {
  filterCriteria?: FilterCriteria;
  reportFormat: string;
  s3Destination: Destination;
}
export const CreateFindingsReportRequest = S.suspend(() =>
  S.Struct({
    filterCriteria: S.optional(FilterCriteria),
    reportFormat: S.String,
    s3Destination: Destination,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reporting/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFindingsReportRequest",
}) as any as S.Schema<CreateFindingsReportRequest>;
export interface CreateFindingsReportResponse {
  reportId?: string;
}
export const CreateFindingsReportResponse = S.suspend(() =>
  S.Struct({ reportId: S.optional(S.String) }),
).annotate({
  identifier: "CreateFindingsReportResponse",
}) as any as S.Schema<CreateFindingsReportResponse>;
export interface ResourceStringFilter {
  comparison: string;
  value: string;
}
export const ResourceStringFilter = S.suspend(() =>
  S.Struct({ comparison: S.String, value: S.String }),
).annotate({
  identifier: "ResourceStringFilter",
}) as any as S.Schema<ResourceStringFilter>;
export type ResourceStringFilterList = ResourceStringFilter[];
export const ResourceStringFilterList = S.Array(ResourceStringFilter);
export interface ResourceMapFilter {
  comparison: string;
  key: string;
  value?: string;
}
export const ResourceMapFilter = S.suspend(() =>
  S.Struct({
    comparison: S.String,
    key: S.String,
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceMapFilter",
}) as any as S.Schema<ResourceMapFilter>;
export type ResourceMapFilterList = ResourceMapFilter[];
export const ResourceMapFilterList = S.Array(ResourceMapFilter);
export interface ResourceFilterCriteria {
  accountId?: ResourceStringFilter[];
  resourceId?: ResourceStringFilter[];
  resourceType?: ResourceStringFilter[];
  ecrRepositoryName?: ResourceStringFilter[];
  lambdaFunctionName?: ResourceStringFilter[];
  ecrImageTags?: ResourceStringFilter[];
  ec2InstanceTags?: ResourceMapFilter[];
  lambdaFunctionTags?: ResourceMapFilter[];
}
export const ResourceFilterCriteria = S.suspend(() =>
  S.Struct({
    accountId: S.optional(ResourceStringFilterList),
    resourceId: S.optional(ResourceStringFilterList),
    resourceType: S.optional(ResourceStringFilterList),
    ecrRepositoryName: S.optional(ResourceStringFilterList),
    lambdaFunctionName: S.optional(ResourceStringFilterList),
    ecrImageTags: S.optional(ResourceStringFilterList),
    ec2InstanceTags: S.optional(ResourceMapFilterList),
    lambdaFunctionTags: S.optional(ResourceMapFilterList),
  }),
).annotate({
  identifier: "ResourceFilterCriteria",
}) as any as S.Schema<ResourceFilterCriteria>;
export interface CreateSbomExportRequest {
  resourceFilterCriteria?: ResourceFilterCriteria;
  reportFormat: string;
  s3Destination: Destination;
}
export const CreateSbomExportRequest = S.suspend(() =>
  S.Struct({
    resourceFilterCriteria: S.optional(ResourceFilterCriteria),
    reportFormat: S.String,
    s3Destination: Destination,
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
).annotate({
  identifier: "CreateSbomExportRequest",
}) as any as S.Schema<CreateSbomExportRequest>;
export interface CreateSbomExportResponse {
  reportId?: string;
}
export const CreateSbomExportResponse = S.suspend(() =>
  S.Struct({ reportId: S.optional(S.String) }),
).annotate({
  identifier: "CreateSbomExportResponse",
}) as any as S.Schema<CreateSbomExportResponse>;
export interface DeleteCisScanConfigurationRequest {
  scanConfigurationArn: string;
}
export const DeleteCisScanConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteCisScanConfigurationRequest",
}) as any as S.Schema<DeleteCisScanConfigurationRequest>;
export interface DeleteCisScanConfigurationResponse {
  scanConfigurationArn: string;
}
export const DeleteCisScanConfigurationResponse = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.String }),
).annotate({
  identifier: "DeleteCisScanConfigurationResponse",
}) as any as S.Schema<DeleteCisScanConfigurationResponse>;
export interface DeleteCodeSecurityIntegrationRequest {
  integrationArn: string;
}
export const DeleteCodeSecurityIntegrationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteCodeSecurityIntegrationRequest",
}) as any as S.Schema<DeleteCodeSecurityIntegrationRequest>;
export interface DeleteCodeSecurityIntegrationResponse {
  integrationArn?: string;
}
export const DeleteCodeSecurityIntegrationResponse = S.suspend(() =>
  S.Struct({ integrationArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteCodeSecurityIntegrationResponse",
}) as any as S.Schema<DeleteCodeSecurityIntegrationResponse>;
export interface DeleteCodeSecurityScanConfigurationRequest {
  scanConfigurationArn: string;
}
export const DeleteCodeSecurityScanConfigurationRequest = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.String }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/codesecurity/scan-configuration/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCodeSecurityScanConfigurationRequest",
}) as any as S.Schema<DeleteCodeSecurityScanConfigurationRequest>;
export interface DeleteCodeSecurityScanConfigurationResponse {
  scanConfigurationArn?: string;
}
export const DeleteCodeSecurityScanConfigurationResponse = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteCodeSecurityScanConfigurationResponse",
}) as any as S.Schema<DeleteCodeSecurityScanConfigurationResponse>;
export interface DeleteFilterRequest {
  arn: string;
}
export const DeleteFilterRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/filters/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFilterRequest",
}) as any as S.Schema<DeleteFilterRequest>;
export interface DeleteFilterResponse {
  arn: string;
}
export const DeleteFilterResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "DeleteFilterResponse",
}) as any as S.Schema<DeleteFilterResponse>;
export interface DescribeOrganizationConfigurationRequest {}
export const DescribeOrganizationConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribeOrganizationConfigurationRequest",
}) as any as S.Schema<DescribeOrganizationConfigurationRequest>;
export interface AutoEnable {
  ec2: boolean;
  ecr: boolean;
  lambda?: boolean;
  lambdaCode?: boolean;
  codeRepository?: boolean;
}
export const AutoEnable = S.suspend(() =>
  S.Struct({
    ec2: S.Boolean,
    ecr: S.Boolean,
    lambda: S.optional(S.Boolean),
    lambdaCode: S.optional(S.Boolean),
    codeRepository: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AutoEnable" }) as any as S.Schema<AutoEnable>;
export interface DescribeOrganizationConfigurationResponse {
  autoEnable?: AutoEnable;
  maxAccountLimitReached?: boolean;
}
export const DescribeOrganizationConfigurationResponse = S.suspend(() =>
  S.Struct({
    autoEnable: S.optional(AutoEnable),
    maxAccountLimitReached: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeOrganizationConfigurationResponse",
}) as any as S.Schema<DescribeOrganizationConfigurationResponse>;
export type DisableResourceTypeList = string[];
export const DisableResourceTypeList = S.Array(S.String);
export interface DisableRequest {
  accountIds?: string[];
  resourceTypes?: string[];
}
export const DisableRequest = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIdSet),
    resourceTypes: S.optional(DisableResourceTypeList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "DisableRequest" }) as any as S.Schema<DisableRequest>;
export interface Account {
  accountId: string;
  status: string;
  resourceStatus: ResourceStatus;
}
export const Account = S.suspend(() =>
  S.Struct({
    accountId: S.String,
    status: S.String,
    resourceStatus: ResourceStatus,
  }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export type AccountList = Account[];
export const AccountList = S.Array(Account);
export interface DisableResponse {
  accounts: Account[];
  failedAccounts?: FailedAccount[];
}
export const DisableResponse = S.suspend(() =>
  S.Struct({
    accounts: AccountList,
    failedAccounts: S.optional(FailedAccountList),
  }),
).annotate({
  identifier: "DisableResponse",
}) as any as S.Schema<DisableResponse>;
export interface DisableDelegatedAdminAccountRequest {
  delegatedAdminAccountId: string;
}
export const DisableDelegatedAdminAccountRequest = S.suspend(() =>
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
).annotate({
  identifier: "DisableDelegatedAdminAccountRequest",
}) as any as S.Schema<DisableDelegatedAdminAccountRequest>;
export interface DisableDelegatedAdminAccountResponse {
  delegatedAdminAccountId: string;
}
export const DisableDelegatedAdminAccountResponse = S.suspend(() =>
  S.Struct({ delegatedAdminAccountId: S.String }),
).annotate({
  identifier: "DisableDelegatedAdminAccountResponse",
}) as any as S.Schema<DisableDelegatedAdminAccountResponse>;
export interface DisassociateMemberRequest {
  accountId: string;
}
export const DisassociateMemberRequest = S.suspend(() =>
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
).annotate({
  identifier: "DisassociateMemberRequest",
}) as any as S.Schema<DisassociateMemberRequest>;
export interface DisassociateMemberResponse {
  accountId: string;
}
export const DisassociateMemberResponse = S.suspend(() =>
  S.Struct({ accountId: S.String }),
).annotate({
  identifier: "DisassociateMemberResponse",
}) as any as S.Schema<DisassociateMemberResponse>;
export type EnableResourceTypeList = string[];
export const EnableResourceTypeList = S.Array(S.String);
export interface EnableRequest {
  accountIds?: string[];
  resourceTypes: string[];
  clientToken?: string;
}
export const EnableRequest = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIdSet),
    resourceTypes: EnableResourceTypeList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/enable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "EnableRequest" }) as any as S.Schema<EnableRequest>;
export interface EnableResponse {
  accounts: Account[];
  failedAccounts?: FailedAccount[];
}
export const EnableResponse = S.suspend(() =>
  S.Struct({
    accounts: AccountList,
    failedAccounts: S.optional(FailedAccountList),
  }),
).annotate({ identifier: "EnableResponse" }) as any as S.Schema<EnableResponse>;
export interface EnableDelegatedAdminAccountRequest {
  delegatedAdminAccountId: string;
  clientToken?: string;
}
export const EnableDelegatedAdminAccountRequest = S.suspend(() =>
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
).annotate({
  identifier: "EnableDelegatedAdminAccountRequest",
}) as any as S.Schema<EnableDelegatedAdminAccountRequest>;
export interface EnableDelegatedAdminAccountResponse {
  delegatedAdminAccountId: string;
}
export const EnableDelegatedAdminAccountResponse = S.suspend(() =>
  S.Struct({ delegatedAdminAccountId: S.String }),
).annotate({
  identifier: "EnableDelegatedAdminAccountResponse",
}) as any as S.Schema<EnableDelegatedAdminAccountResponse>;
export type ReportTargetAccounts = string[];
export const ReportTargetAccounts = S.Array(S.String);
export type CisReportFormat = "PDF" | "CSV" | (string & {});
export const CisReportFormat = S.String;
export interface GetCisScanReportRequest {
  scanArn: string;
  targetAccounts?: string[];
  reportFormat?: CisReportFormat;
}
export const GetCisScanReportRequest = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    targetAccounts: S.optional(ReportTargetAccounts),
    reportFormat: S.optional(CisReportFormat),
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
).annotate({
  identifier: "GetCisScanReportRequest",
}) as any as S.Schema<GetCisScanReportRequest>;
export type CisReportStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export const CisReportStatus = S.String;
export interface GetCisScanReportResponse {
  url?: string;
  status?: CisReportStatus;
}
export const GetCisScanReportResponse = S.suspend(() =>
  S.Struct({ url: S.optional(S.String), status: S.optional(CisReportStatus) }),
).annotate({
  identifier: "GetCisScanReportResponse",
}) as any as S.Schema<GetCisScanReportResponse>;
export type CisFindingStatusComparison = "EQUALS" | (string & {});
export const CisFindingStatusComparison = S.String;
export type CisFindingStatus = "PASSED" | "FAILED" | "SKIPPED" | (string & {});
export const CisFindingStatus = S.String;
export interface CisFindingStatusFilter {
  comparison: CisFindingStatusComparison;
  value: CisFindingStatus;
}
export const CisFindingStatusFilter = S.suspend(() =>
  S.Struct({ comparison: CisFindingStatusComparison, value: CisFindingStatus }),
).annotate({
  identifier: "CisFindingStatusFilter",
}) as any as S.Schema<CisFindingStatusFilter>;
export type CisFindingStatusFilterList = CisFindingStatusFilter[];
export const CisFindingStatusFilterList = S.Array(CisFindingStatusFilter);
export type CisStringComparison =
  | "EQUALS"
  | "PREFIX"
  | "NOT_EQUALS"
  | (string & {});
export const CisStringComparison = S.String;
export interface CisStringFilter {
  comparison: CisStringComparison;
  value: string;
}
export const CisStringFilter = S.suspend(() =>
  S.Struct({ comparison: CisStringComparison, value: S.String }),
).annotate({
  identifier: "CisStringFilter",
}) as any as S.Schema<CisStringFilter>;
export type CheckIdFilterList = CisStringFilter[];
export const CheckIdFilterList = S.Array(CisStringFilter);
export type TitleFilterList = CisStringFilter[];
export const TitleFilterList = S.Array(CisStringFilter);
export type CisSecurityLevelComparison = "EQUALS" | (string & {});
export const CisSecurityLevelComparison = S.String;
export interface CisSecurityLevelFilter {
  comparison: CisSecurityLevelComparison;
  value: CisSecurityLevel;
}
export const CisSecurityLevelFilter = S.suspend(() =>
  S.Struct({ comparison: CisSecurityLevelComparison, value: CisSecurityLevel }),
).annotate({
  identifier: "CisSecurityLevelFilter",
}) as any as S.Schema<CisSecurityLevelFilter>;
export type CisSecurityLevelFilterList = CisSecurityLevelFilter[];
export const CisSecurityLevelFilterList = S.Array(CisSecurityLevelFilter);
export type CisFindingArnFilterList = CisStringFilter[];
export const CisFindingArnFilterList = S.Array(CisStringFilter);
export interface CisScanResultDetailsFilterCriteria {
  findingStatusFilters?: CisFindingStatusFilter[];
  checkIdFilters?: CisStringFilter[];
  titleFilters?: CisStringFilter[];
  securityLevelFilters?: CisSecurityLevelFilter[];
  findingArnFilters?: CisStringFilter[];
}
export const CisScanResultDetailsFilterCriteria = S.suspend(() =>
  S.Struct({
    findingStatusFilters: S.optional(CisFindingStatusFilterList),
    checkIdFilters: S.optional(CheckIdFilterList),
    titleFilters: S.optional(TitleFilterList),
    securityLevelFilters: S.optional(CisSecurityLevelFilterList),
    findingArnFilters: S.optional(CisFindingArnFilterList),
  }),
).annotate({
  identifier: "CisScanResultDetailsFilterCriteria",
}) as any as S.Schema<CisScanResultDetailsFilterCriteria>;
export type CisScanResultDetailsSortBy = "CHECK_ID" | "STATUS" | (string & {});
export const CisScanResultDetailsSortBy = S.String;
export type CisSortOrder = "ASC" | "DESC" | (string & {});
export const CisSortOrder = S.String;
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
export const GetCisScanResultDetailsRequest = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    targetResourceId: S.String,
    accountId: S.String,
    filterCriteria: S.optional(CisScanResultDetailsFilterCriteria),
    sortBy: S.optional(CisScanResultDetailsSortBy),
    sortOrder: S.optional(CisSortOrder),
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
).annotate({
  identifier: "GetCisScanResultDetailsRequest",
}) as any as S.Schema<GetCisScanResultDetailsRequest>;
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
export const CisScanResultDetails = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    accountId: S.optional(S.String),
    targetResourceId: S.optional(S.String),
    platform: S.optional(S.String),
    status: S.optional(CisFindingStatus),
    statusReason: S.optional(S.String),
    checkId: S.optional(S.String),
    title: S.optional(S.String),
    checkDescription: S.optional(S.String),
    remediation: S.optional(S.String),
    level: S.optional(CisSecurityLevel),
    findingArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CisScanResultDetails",
}) as any as S.Schema<CisScanResultDetails>;
export type CisScanResultDetailsList = CisScanResultDetails[];
export const CisScanResultDetailsList = S.Array(CisScanResultDetails);
export interface GetCisScanResultDetailsResponse {
  scanResultDetails?: CisScanResultDetails[];
  nextToken?: string;
}
export const GetCisScanResultDetailsResponse = S.suspend(() =>
  S.Struct({
    scanResultDetails: S.optional(CisScanResultDetailsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCisScanResultDetailsResponse",
}) as any as S.Schema<GetCisScanResultDetailsResponse>;
export interface ClusterForImageFilterCriteria {
  resourceId: string;
}
export const ClusterForImageFilterCriteria = S.suspend(() =>
  S.Struct({ resourceId: S.String }),
).annotate({
  identifier: "ClusterForImageFilterCriteria",
}) as any as S.Schema<ClusterForImageFilterCriteria>;
export interface GetClustersForImageRequest {
  filter: ClusterForImageFilterCriteria;
  maxResults?: number;
  nextToken?: string;
}
export const GetClustersForImageRequest = S.suspend(() =>
  S.Struct({
    filter: ClusterForImageFilterCriteria,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClustersForImageRequest",
}) as any as S.Schema<GetClustersForImageRequest>;
export interface AwsEcsMetadataDetails {
  detailsGroup: string;
  taskDefinitionArn: string;
}
export const AwsEcsMetadataDetails = S.suspend(() =>
  S.Struct({ detailsGroup: S.String, taskDefinitionArn: S.String }),
).annotate({
  identifier: "AwsEcsMetadataDetails",
}) as any as S.Schema<AwsEcsMetadataDetails>;
export interface AwsEksWorkloadInfo {
  name: string;
  type: string;
}
export const AwsEksWorkloadInfo = S.suspend(() =>
  S.Struct({ name: S.String, type: S.String }),
).annotate({
  identifier: "AwsEksWorkloadInfo",
}) as any as S.Schema<AwsEksWorkloadInfo>;
export type AwsEksWorkloadInfoList = AwsEksWorkloadInfo[];
export const AwsEksWorkloadInfoList = S.Array(AwsEksWorkloadInfo);
export interface AwsEksMetadataDetails {
  namespace?: string;
  workloadInfoList?: AwsEksWorkloadInfo[];
}
export const AwsEksMetadataDetails = S.suspend(() =>
  S.Struct({
    namespace: S.optional(S.String),
    workloadInfoList: S.optional(AwsEksWorkloadInfoList),
  }),
).annotate({
  identifier: "AwsEksMetadataDetails",
}) as any as S.Schema<AwsEksMetadataDetails>;
export type ClusterMetadata =
  | {
      awsEcsMetadataDetails: AwsEcsMetadataDetails;
      awsEksMetadataDetails?: never;
    }
  | {
      awsEcsMetadataDetails?: never;
      awsEksMetadataDetails: AwsEksMetadataDetails;
    };
export const ClusterMetadata = S.Union([
  S.Struct({ awsEcsMetadataDetails: AwsEcsMetadataDetails }),
  S.Struct({ awsEksMetadataDetails: AwsEksMetadataDetails }),
]);
export interface ClusterDetails {
  lastInUse: Date;
  runningUnitCount?: number;
  stoppedUnitCount?: number;
  clusterMetadata: ClusterMetadata;
}
export const ClusterDetails = S.suspend(() =>
  S.Struct({
    lastInUse: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    runningUnitCount: S.optional(S.Number),
    stoppedUnitCount: S.optional(S.Number),
    clusterMetadata: ClusterMetadata,
  }),
).annotate({ identifier: "ClusterDetails" }) as any as S.Schema<ClusterDetails>;
export type ClusterDetailsList = ClusterDetails[];
export const ClusterDetailsList = S.Array(ClusterDetails);
export interface ClusterInformation {
  clusterArn: string;
  clusterDetails?: ClusterDetails[];
}
export const ClusterInformation = S.suspend(() =>
  S.Struct({
    clusterArn: S.String,
    clusterDetails: S.optional(ClusterDetailsList),
  }),
).annotate({
  identifier: "ClusterInformation",
}) as any as S.Schema<ClusterInformation>;
export type ClusterInformationList = ClusterInformation[];
export const ClusterInformationList = S.Array(ClusterInformation);
export interface GetClustersForImageResponse {
  cluster: ClusterInformation[];
  nextToken?: string;
}
export const GetClustersForImageResponse = S.suspend(() =>
  S.Struct({
    cluster: ClusterInformationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetClustersForImageResponse",
}) as any as S.Schema<GetClustersForImageResponse>;
export interface GetCodeSecurityIntegrationRequest {
  integrationArn: string;
  tags?: { [key: string]: string | undefined };
}
export const GetCodeSecurityIntegrationRequest = S.suspend(() =>
  S.Struct({ integrationArn: S.String, tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/codesecurity/integration/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCodeSecurityIntegrationRequest",
}) as any as S.Schema<GetCodeSecurityIntegrationRequest>;
export interface GetCodeSecurityIntegrationResponse {
  integrationArn: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  statusReason: string;
  createdOn: Date;
  lastUpdateOn: Date;
  tags?: { [key: string]: string | undefined };
  authorizationUrl?: string | redacted.Redacted<string>;
}
export const GetCodeSecurityIntegrationResponse = S.suspend(() =>
  S.Struct({
    integrationArn: S.String,
    name: S.String,
    type: IntegrationType,
    status: IntegrationStatus,
    statusReason: S.String,
    createdOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    authorizationUrl: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "GetCodeSecurityIntegrationResponse",
}) as any as S.Schema<GetCodeSecurityIntegrationResponse>;
export interface GetCodeSecurityScanRequest {
  resource: CodeSecurityResource;
  scanId: string;
}
export const GetCodeSecurityScanRequest = S.suspend(() =>
  S.Struct({ resource: CodeSecurityResource, scanId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/codesecurity/scan/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCodeSecurityScanRequest",
}) as any as S.Schema<GetCodeSecurityScanRequest>;
export type CodeScanStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export const CodeScanStatus = S.String;
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
export const GetCodeSecurityScanResponse = S.suspend(() =>
  S.Struct({
    scanId: S.optional(S.String),
    resource: S.optional(CodeSecurityResource),
    accountId: S.optional(S.String),
    status: S.optional(CodeScanStatus),
    statusReason: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastCommitId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCodeSecurityScanResponse",
}) as any as S.Schema<GetCodeSecurityScanResponse>;
export interface GetCodeSecurityScanConfigurationRequest {
  scanConfigurationArn: string;
}
export const GetCodeSecurityScanConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetCodeSecurityScanConfigurationRequest",
}) as any as S.Schema<GetCodeSecurityScanConfigurationRequest>;
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
export const GetCodeSecurityScanConfigurationResponse = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.optional(S.String),
    name: S.optional(S.String),
    configuration: S.optional(CodeSecurityScanConfiguration),
    level: S.optional(ConfigurationLevel),
    scopeSettings: S.optional(ScopeSettings),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetCodeSecurityScanConfigurationResponse",
}) as any as S.Schema<GetCodeSecurityScanConfigurationResponse>;
export interface GetConfigurationRequest {}
export const GetConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configuration/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationRequest",
}) as any as S.Schema<GetConfigurationRequest>;
export interface EcrRescanDurationState {
  rescanDuration?: string;
  status?: string;
  updatedAt?: Date;
  pullDateRescanDuration?: string;
  pullDateRescanMode?: string;
}
export const EcrRescanDurationState = S.suspend(() =>
  S.Struct({
    rescanDuration: S.optional(S.String),
    status: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullDateRescanDuration: S.optional(S.String),
    pullDateRescanMode: S.optional(S.String),
  }),
).annotate({
  identifier: "EcrRescanDurationState",
}) as any as S.Schema<EcrRescanDurationState>;
export interface EcrConfigurationState {
  rescanDurationState?: EcrRescanDurationState;
}
export const EcrConfigurationState = S.suspend(() =>
  S.Struct({ rescanDurationState: S.optional(EcrRescanDurationState) }),
).annotate({
  identifier: "EcrConfigurationState",
}) as any as S.Schema<EcrConfigurationState>;
export interface Ec2ScanModeState {
  scanMode?: string;
  scanModeStatus?: string;
}
export const Ec2ScanModeState = S.suspend(() =>
  S.Struct({
    scanMode: S.optional(S.String),
    scanModeStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "Ec2ScanModeState",
}) as any as S.Schema<Ec2ScanModeState>;
export interface Ec2ConfigurationState {
  scanModeState?: Ec2ScanModeState;
}
export const Ec2ConfigurationState = S.suspend(() =>
  S.Struct({ scanModeState: S.optional(Ec2ScanModeState) }),
).annotate({
  identifier: "Ec2ConfigurationState",
}) as any as S.Schema<Ec2ConfigurationState>;
export interface GetConfigurationResponse {
  ecrConfiguration?: EcrConfigurationState;
  ec2Configuration?: Ec2ConfigurationState;
}
export const GetConfigurationResponse = S.suspend(() =>
  S.Struct({
    ecrConfiguration: S.optional(EcrConfigurationState),
    ec2Configuration: S.optional(Ec2ConfigurationState),
  }),
).annotate({
  identifier: "GetConfigurationResponse",
}) as any as S.Schema<GetConfigurationResponse>;
export interface GetDelegatedAdminAccountRequest {}
export const GetDelegatedAdminAccountRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetDelegatedAdminAccountRequest",
}) as any as S.Schema<GetDelegatedAdminAccountRequest>;
export interface DelegatedAdmin {
  accountId?: string;
  relationshipStatus?: string;
}
export const DelegatedAdmin = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    relationshipStatus: S.optional(S.String),
  }),
).annotate({ identifier: "DelegatedAdmin" }) as any as S.Schema<DelegatedAdmin>;
export interface GetDelegatedAdminAccountResponse {
  delegatedAdmin?: DelegatedAdmin;
}
export const GetDelegatedAdminAccountResponse = S.suspend(() =>
  S.Struct({ delegatedAdmin: S.optional(DelegatedAdmin) }),
).annotate({
  identifier: "GetDelegatedAdminAccountResponse",
}) as any as S.Schema<GetDelegatedAdminAccountResponse>;
export interface GetEc2DeepInspectionConfigurationRequest {}
export const GetEc2DeepInspectionConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetEc2DeepInspectionConfigurationRequest",
}) as any as S.Schema<GetEc2DeepInspectionConfigurationRequest>;
export type PathList = string[];
export const PathList = S.Array(S.String);
export interface GetEc2DeepInspectionConfigurationResponse {
  packagePaths?: string[];
  orgPackagePaths?: string[];
  status?: string;
  errorMessage?: string;
}
export const GetEc2DeepInspectionConfigurationResponse = S.suspend(() =>
  S.Struct({
    packagePaths: S.optional(PathList),
    orgPackagePaths: S.optional(PathList),
    status: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEc2DeepInspectionConfigurationResponse",
}) as any as S.Schema<GetEc2DeepInspectionConfigurationResponse>;
export interface GetEncryptionKeyRequest {
  scanType: string;
  resourceType: string;
}
export const GetEncryptionKeyRequest = S.suspend(() =>
  S.Struct({
    scanType: S.String.pipe(T.HttpQuery("scanType")),
    resourceType: S.String.pipe(T.HttpQuery("resourceType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/encryptionkey/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEncryptionKeyRequest",
}) as any as S.Schema<GetEncryptionKeyRequest>;
export interface GetEncryptionKeyResponse {
  kmsKeyId: string;
}
export const GetEncryptionKeyResponse = S.suspend(() =>
  S.Struct({ kmsKeyId: S.String }),
).annotate({
  identifier: "GetEncryptionKeyResponse",
}) as any as S.Schema<GetEncryptionKeyResponse>;
export interface GetFindingsReportStatusRequest {
  reportId?: string;
}
export const GetFindingsReportStatusRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetFindingsReportStatusRequest",
}) as any as S.Schema<GetFindingsReportStatusRequest>;
export interface GetFindingsReportStatusResponse {
  reportId?: string;
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  destination?: Destination;
  filterCriteria?: FilterCriteria;
}
export const GetFindingsReportStatusResponse = S.suspend(() =>
  S.Struct({
    reportId: S.optional(S.String),
    status: S.optional(S.String),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
    destination: S.optional(Destination),
    filterCriteria: S.optional(FilterCriteria),
  }),
).annotate({
  identifier: "GetFindingsReportStatusResponse",
}) as any as S.Schema<GetFindingsReportStatusResponse>;
export interface GetMemberRequest {
  accountId: string;
}
export const GetMemberRequest = S.suspend(() =>
  S.Struct({ accountId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMemberRequest",
}) as any as S.Schema<GetMemberRequest>;
export interface Member {
  accountId?: string;
  relationshipStatus?: string;
  delegatedAdminAccountId?: string;
  updatedAt?: Date;
}
export const Member = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    relationshipStatus: S.optional(S.String),
    delegatedAdminAccountId: S.optional(S.String),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export interface GetMemberResponse {
  member?: Member;
}
export const GetMemberResponse = S.suspend(() =>
  S.Struct({ member: S.optional(Member) }),
).annotate({
  identifier: "GetMemberResponse",
}) as any as S.Schema<GetMemberResponse>;
export interface GetSbomExportRequest {
  reportId: string;
}
export const GetSbomExportRequest = S.suspend(() =>
  S.Struct({ reportId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sbomexport/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSbomExportRequest",
}) as any as S.Schema<GetSbomExportRequest>;
export interface GetSbomExportResponse {
  reportId?: string;
  format?: string;
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  s3Destination?: Destination;
  filterCriteria?: ResourceFilterCriteria;
}
export const GetSbomExportResponse = S.suspend(() =>
  S.Struct({
    reportId: S.optional(S.String),
    format: S.optional(S.String),
    status: S.optional(S.String),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
    s3Destination: S.optional(Destination),
    filterCriteria: S.optional(ResourceFilterCriteria),
  }),
).annotate({
  identifier: "GetSbomExportResponse",
}) as any as S.Schema<GetSbomExportResponse>;
export interface ListAccountPermissionsRequest {
  service?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAccountPermissionsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListAccountPermissionsRequest",
}) as any as S.Schema<ListAccountPermissionsRequest>;
export interface Permission {
  service: string;
  operation: string;
}
export const Permission = S.suspend(() =>
  S.Struct({ service: S.String, operation: S.String }),
).annotate({ identifier: "Permission" }) as any as S.Schema<Permission>;
export type Permissions = Permission[];
export const Permissions = S.Array(Permission);
export interface ListAccountPermissionsResponse {
  permissions: Permission[];
  nextToken?: string;
}
export const ListAccountPermissionsResponse = S.suspend(() =>
  S.Struct({ permissions: Permissions, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAccountPermissionsResponse",
}) as any as S.Schema<ListAccountPermissionsResponse>;
export type CisScanNameFilterList = CisStringFilter[];
export const CisScanNameFilterList = S.Array(CisStringFilter);
export type TagComparison = "EQUALS" | (string & {});
export const TagComparison = S.String;
export interface TagFilter {
  comparison: TagComparison;
  key: string;
  value: string;
}
export const TagFilter = S.suspend(() =>
  S.Struct({ comparison: TagComparison, key: S.String, value: S.String }),
).annotate({ identifier: "TagFilter" }) as any as S.Schema<TagFilter>;
export type ResourceTagFilterList = TagFilter[];
export const ResourceTagFilterList = S.Array(TagFilter);
export type CisScanConfigurationArnFilterList = CisStringFilter[];
export const CisScanConfigurationArnFilterList = S.Array(CisStringFilter);
export interface ListCisScanConfigurationsFilterCriteria {
  scanNameFilters?: CisStringFilter[];
  targetResourceTagFilters?: TagFilter[];
  scanConfigurationArnFilters?: CisStringFilter[];
}
export const ListCisScanConfigurationsFilterCriteria = S.suspend(() =>
  S.Struct({
    scanNameFilters: S.optional(CisScanNameFilterList),
    targetResourceTagFilters: S.optional(ResourceTagFilterList),
    scanConfigurationArnFilters: S.optional(CisScanConfigurationArnFilterList),
  }),
).annotate({
  identifier: "ListCisScanConfigurationsFilterCriteria",
}) as any as S.Schema<ListCisScanConfigurationsFilterCriteria>;
export type CisScanConfigurationsSortBy =
  | "SCAN_NAME"
  | "SCAN_CONFIGURATION_ARN"
  | (string & {});
export const CisScanConfigurationsSortBy = S.String;
export interface ListCisScanConfigurationsRequest {
  filterCriteria?: ListCisScanConfigurationsFilterCriteria;
  sortBy?: CisScanConfigurationsSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListCisScanConfigurationsRequest = S.suspend(() =>
  S.Struct({
    filterCriteria: S.optional(ListCisScanConfigurationsFilterCriteria),
    sortBy: S.optional(CisScanConfigurationsSortBy),
    sortOrder: S.optional(CisSortOrder),
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
).annotate({
  identifier: "ListCisScanConfigurationsRequest",
}) as any as S.Schema<ListCisScanConfigurationsRequest>;
export type CisAccountIdList = string[];
export const CisAccountIdList = S.Array(S.String);
export interface CisTargets {
  accountIds?: string[];
  targetResourceTags?: { [key: string]: string[] | undefined };
}
export const CisTargets = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(CisAccountIdList),
    targetResourceTags: S.optional(TargetResourceTags),
  }),
).annotate({ identifier: "CisTargets" }) as any as S.Schema<CisTargets>;
export interface CisScanConfiguration {
  scanConfigurationArn: string;
  ownerId?: string;
  scanName?: string;
  securityLevel?: CisSecurityLevel;
  schedule?: Schedule;
  targets?: CisTargets;
  tags?: { [key: string]: string | undefined };
}
export const CisScanConfiguration = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.String,
    ownerId: S.optional(S.String),
    scanName: S.optional(S.String),
    securityLevel: S.optional(CisSecurityLevel),
    schedule: S.optional(Schedule),
    targets: S.optional(CisTargets),
    tags: S.optional(CisTagMap),
  }),
).annotate({
  identifier: "CisScanConfiguration",
}) as any as S.Schema<CisScanConfiguration>;
export type CisScanConfigurationList = CisScanConfiguration[];
export const CisScanConfigurationList = S.Array(CisScanConfiguration);
export interface ListCisScanConfigurationsResponse {
  scanConfigurations?: CisScanConfiguration[];
  nextToken?: string;
}
export const ListCisScanConfigurationsResponse = S.suspend(() =>
  S.Struct({
    scanConfigurations: S.optional(CisScanConfigurationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCisScanConfigurationsResponse",
}) as any as S.Schema<ListCisScanConfigurationsResponse>;
export type OneAccountIdFilterList = CisStringFilter[];
export const OneAccountIdFilterList = S.Array(CisStringFilter);
export type PlatformFilterList = CisStringFilter[];
export const PlatformFilterList = S.Array(CisStringFilter);
export interface CisNumberFilter {
  upperInclusive?: number;
  lowerInclusive?: number;
}
export const CisNumberFilter = S.suspend(() =>
  S.Struct({
    upperInclusive: S.optional(S.Number),
    lowerInclusive: S.optional(S.Number),
  }),
).annotate({
  identifier: "CisNumberFilter",
}) as any as S.Schema<CisNumberFilter>;
export type CisNumberFilterList = CisNumberFilter[];
export const CisNumberFilterList = S.Array(CisNumberFilter);
export interface CisScanResultsAggregatedByChecksFilterCriteria {
  accountIdFilters?: CisStringFilter[];
  checkIdFilters?: CisStringFilter[];
  titleFilters?: CisStringFilter[];
  platformFilters?: CisStringFilter[];
  failedResourcesFilters?: CisNumberFilter[];
  securityLevelFilters?: CisSecurityLevelFilter[];
}
export const CisScanResultsAggregatedByChecksFilterCriteria = S.suspend(() =>
  S.Struct({
    accountIdFilters: S.optional(OneAccountIdFilterList),
    checkIdFilters: S.optional(CheckIdFilterList),
    titleFilters: S.optional(TitleFilterList),
    platformFilters: S.optional(PlatformFilterList),
    failedResourcesFilters: S.optional(CisNumberFilterList),
    securityLevelFilters: S.optional(CisSecurityLevelFilterList),
  }),
).annotate({
  identifier: "CisScanResultsAggregatedByChecksFilterCriteria",
}) as any as S.Schema<CisScanResultsAggregatedByChecksFilterCriteria>;
export type CisScanResultsAggregatedByChecksSortBy =
  | "CHECK_ID"
  | "TITLE"
  | "PLATFORM"
  | "FAILED_COUNTS"
  | "SECURITY_LEVEL"
  | (string & {});
export const CisScanResultsAggregatedByChecksSortBy = S.String;
export interface ListCisScanResultsAggregatedByChecksRequest {
  scanArn: string;
  filterCriteria?: CisScanResultsAggregatedByChecksFilterCriteria;
  sortBy?: CisScanResultsAggregatedByChecksSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListCisScanResultsAggregatedByChecksRequest = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    filterCriteria: S.optional(CisScanResultsAggregatedByChecksFilterCriteria),
    sortBy: S.optional(CisScanResultsAggregatedByChecksSortBy),
    sortOrder: S.optional(CisSortOrder),
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
).annotate({
  identifier: "ListCisScanResultsAggregatedByChecksRequest",
}) as any as S.Schema<ListCisScanResultsAggregatedByChecksRequest>;
export interface StatusCounts {
  failed?: number;
  skipped?: number;
  passed?: number;
}
export const StatusCounts = S.suspend(() =>
  S.Struct({
    failed: S.optional(S.Number),
    skipped: S.optional(S.Number),
    passed: S.optional(S.Number),
  }),
).annotate({ identifier: "StatusCounts" }) as any as S.Schema<StatusCounts>;
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
export const CisCheckAggregation = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    checkId: S.optional(S.String),
    title: S.optional(S.String),
    checkDescription: S.optional(S.String),
    level: S.optional(CisSecurityLevel),
    accountId: S.optional(S.String),
    statusCounts: S.optional(StatusCounts),
    platform: S.optional(S.String),
  }),
).annotate({
  identifier: "CisCheckAggregation",
}) as any as S.Schema<CisCheckAggregation>;
export type CisCheckAggregationList = CisCheckAggregation[];
export const CisCheckAggregationList = S.Array(CisCheckAggregation);
export interface ListCisScanResultsAggregatedByChecksResponse {
  checkAggregations?: CisCheckAggregation[];
  nextToken?: string;
}
export const ListCisScanResultsAggregatedByChecksResponse = S.suspend(() =>
  S.Struct({
    checkAggregations: S.optional(CisCheckAggregationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCisScanResultsAggregatedByChecksResponse",
}) as any as S.Schema<ListCisScanResultsAggregatedByChecksResponse>;
export type AccountIdFilterList = CisStringFilter[];
export const AccountIdFilterList = S.Array(CisStringFilter);
export type CisResultStatusComparison = "EQUALS" | (string & {});
export const CisResultStatusComparison = S.String;
export type CisResultStatus = "PASSED" | "FAILED" | "SKIPPED" | (string & {});
export const CisResultStatus = S.String;
export interface CisResultStatusFilter {
  comparison: CisResultStatusComparison;
  value: CisResultStatus;
}
export const CisResultStatusFilter = S.suspend(() =>
  S.Struct({ comparison: CisResultStatusComparison, value: CisResultStatus }),
).annotate({
  identifier: "CisResultStatusFilter",
}) as any as S.Schema<CisResultStatusFilter>;
export type CisResultStatusFilterList = CisResultStatusFilter[];
export const CisResultStatusFilterList = S.Array(CisResultStatusFilter);
export type ResourceIdFilterList = CisStringFilter[];
export const ResourceIdFilterList = S.Array(CisStringFilter);
export type CisTargetStatusComparison = "EQUALS" | (string & {});
export const CisTargetStatusComparison = S.String;
export type CisTargetStatus =
  | "TIMED_OUT"
  | "CANCELLED"
  | "COMPLETED"
  | (string & {});
export const CisTargetStatus = S.String;
export interface CisTargetStatusFilter {
  comparison: CisTargetStatusComparison;
  value: CisTargetStatus;
}
export const CisTargetStatusFilter = S.suspend(() =>
  S.Struct({ comparison: CisTargetStatusComparison, value: CisTargetStatus }),
).annotate({
  identifier: "CisTargetStatusFilter",
}) as any as S.Schema<CisTargetStatusFilter>;
export type TargetStatusFilterList = CisTargetStatusFilter[];
export const TargetStatusFilterList = S.Array(CisTargetStatusFilter);
export type CisTargetStatusReason =
  | "SCAN_IN_PROGRESS"
  | "UNSUPPORTED_OS"
  | "SSM_UNMANAGED"
  | (string & {});
export const CisTargetStatusReason = S.String;
export interface CisTargetStatusReasonFilter {
  comparison: CisTargetStatusComparison;
  value: CisTargetStatusReason;
}
export const CisTargetStatusReasonFilter = S.suspend(() =>
  S.Struct({
    comparison: CisTargetStatusComparison,
    value: CisTargetStatusReason,
  }),
).annotate({
  identifier: "CisTargetStatusReasonFilter",
}) as any as S.Schema<CisTargetStatusReasonFilter>;
export type TargetStatusReasonFilterList = CisTargetStatusReasonFilter[];
export const TargetStatusReasonFilterList = S.Array(
  CisTargetStatusReasonFilter,
);
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
export const CisScanResultsAggregatedByTargetResourceFilterCriteria = S.suspend(
  () =>
    S.Struct({
      accountIdFilters: S.optional(AccountIdFilterList),
      statusFilters: S.optional(CisResultStatusFilterList),
      checkIdFilters: S.optional(CheckIdFilterList),
      targetResourceIdFilters: S.optional(ResourceIdFilterList),
      targetResourceTagFilters: S.optional(ResourceTagFilterList),
      platformFilters: S.optional(PlatformFilterList),
      targetStatusFilters: S.optional(TargetStatusFilterList),
      targetStatusReasonFilters: S.optional(TargetStatusReasonFilterList),
      failedChecksFilters: S.optional(CisNumberFilterList),
    }),
).annotate({
  identifier: "CisScanResultsAggregatedByTargetResourceFilterCriteria",
}) as any as S.Schema<CisScanResultsAggregatedByTargetResourceFilterCriteria>;
export type CisScanResultsAggregatedByTargetResourceSortBy =
  | "RESOURCE_ID"
  | "FAILED_COUNTS"
  | "ACCOUNT_ID"
  | "PLATFORM"
  | "TARGET_STATUS"
  | "TARGET_STATUS_REASON"
  | (string & {});
export const CisScanResultsAggregatedByTargetResourceSortBy = S.String;
export interface ListCisScanResultsAggregatedByTargetResourceRequest {
  scanArn: string;
  filterCriteria?: CisScanResultsAggregatedByTargetResourceFilterCriteria;
  sortBy?: CisScanResultsAggregatedByTargetResourceSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListCisScanResultsAggregatedByTargetResourceRequest = S.suspend(
  () =>
    S.Struct({
      scanArn: S.String,
      filterCriteria: S.optional(
        CisScanResultsAggregatedByTargetResourceFilterCriteria,
      ),
      sortBy: S.optional(CisScanResultsAggregatedByTargetResourceSortBy),
      sortOrder: S.optional(CisSortOrder),
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
).annotate({
  identifier: "ListCisScanResultsAggregatedByTargetResourceRequest",
}) as any as S.Schema<ListCisScanResultsAggregatedByTargetResourceRequest>;
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
export const CisTargetResourceAggregation = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    targetResourceId: S.optional(S.String),
    accountId: S.optional(S.String),
    targetResourceTags: S.optional(TargetResourceTags),
    statusCounts: S.optional(StatusCounts),
    platform: S.optional(S.String),
    targetStatus: S.optional(CisTargetStatus),
    targetStatusReason: S.optional(CisTargetStatusReason),
  }),
).annotate({
  identifier: "CisTargetResourceAggregation",
}) as any as S.Schema<CisTargetResourceAggregation>;
export type CisTargetResourceAggregationList = CisTargetResourceAggregation[];
export const CisTargetResourceAggregationList = S.Array(
  CisTargetResourceAggregation,
);
export interface ListCisScanResultsAggregatedByTargetResourceResponse {
  targetResourceAggregations?: CisTargetResourceAggregation[];
  nextToken?: string;
}
export const ListCisScanResultsAggregatedByTargetResourceResponse = S.suspend(
  () =>
    S.Struct({
      targetResourceAggregations: S.optional(CisTargetResourceAggregationList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCisScanResultsAggregatedByTargetResourceResponse",
}) as any as S.Schema<ListCisScanResultsAggregatedByTargetResourceResponse>;
export type CisScanStatusComparison = "EQUALS" | (string & {});
export const CisScanStatusComparison = S.String;
export type CisScanStatus =
  | "FAILED"
  | "COMPLETED"
  | "CANCELLED"
  | "IN_PROGRESS"
  | (string & {});
export const CisScanStatus = S.String;
export interface CisScanStatusFilter {
  comparison: CisScanStatusComparison;
  value: CisScanStatus;
}
export const CisScanStatusFilter = S.suspend(() =>
  S.Struct({ comparison: CisScanStatusComparison, value: CisScanStatus }),
).annotate({
  identifier: "CisScanStatusFilter",
}) as any as S.Schema<CisScanStatusFilter>;
export type CisScanStatusFilterList = CisScanStatusFilter[];
export const CisScanStatusFilterList = S.Array(CisScanStatusFilter);
export interface CisDateFilter {
  earliestScanStartTime?: Date;
  latestScanStartTime?: Date;
}
export const CisDateFilter = S.suspend(() =>
  S.Struct({
    earliestScanStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    latestScanStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "CisDateFilter" }) as any as S.Schema<CisDateFilter>;
export type CisScanDateFilterList = CisDateFilter[];
export const CisScanDateFilterList = S.Array(CisDateFilter);
export type CisScanArnFilterList = CisStringFilter[];
export const CisScanArnFilterList = S.Array(CisStringFilter);
export type CisScheduledByFilterList = CisStringFilter[];
export const CisScheduledByFilterList = S.Array(CisStringFilter);
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
export const ListCisScansFilterCriteria = S.suspend(() =>
  S.Struct({
    scanNameFilters: S.optional(CisScanNameFilterList),
    targetResourceTagFilters: S.optional(ResourceTagFilterList),
    targetResourceIdFilters: S.optional(ResourceIdFilterList),
    scanStatusFilters: S.optional(CisScanStatusFilterList),
    scanAtFilters: S.optional(CisScanDateFilterList),
    scanConfigurationArnFilters: S.optional(CisScanConfigurationArnFilterList),
    scanArnFilters: S.optional(CisScanArnFilterList),
    scheduledByFilters: S.optional(CisScheduledByFilterList),
    failedChecksFilters: S.optional(CisNumberFilterList),
    targetAccountIdFilters: S.optional(AccountIdFilterList),
  }),
).annotate({
  identifier: "ListCisScansFilterCriteria",
}) as any as S.Schema<ListCisScansFilterCriteria>;
export type ListCisScansDetailLevel = "ORGANIZATION" | "MEMBER" | (string & {});
export const ListCisScansDetailLevel = S.String;
export type ListCisScansSortBy =
  | "STATUS"
  | "SCHEDULED_BY"
  | "SCAN_START_DATE"
  | "FAILED_CHECKS"
  | (string & {});
export const ListCisScansSortBy = S.String;
export interface ListCisScansRequest {
  filterCriteria?: ListCisScansFilterCriteria;
  detailLevel?: ListCisScansDetailLevel;
  sortBy?: ListCisScansSortBy;
  sortOrder?: CisSortOrder;
  nextToken?: string;
  maxResults?: number;
}
export const ListCisScansRequest = S.suspend(() =>
  S.Struct({
    filterCriteria: S.optional(ListCisScansFilterCriteria),
    detailLevel: S.optional(ListCisScansDetailLevel),
    sortBy: S.optional(ListCisScansSortBy),
    sortOrder: S.optional(CisSortOrder),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cis/scan/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCisScansRequest",
}) as any as S.Schema<ListCisScansRequest>;
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
export const CisScan = S.suspend(() =>
  S.Struct({
    scanArn: S.String,
    scanConfigurationArn: S.String,
    status: S.optional(CisScanStatus),
    scanName: S.optional(S.String),
    scanDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    failedChecks: S.optional(S.Number),
    totalChecks: S.optional(S.Number),
    targets: S.optional(CisTargets),
    scheduledBy: S.optional(S.String),
    securityLevel: S.optional(CisSecurityLevel),
  }),
).annotate({ identifier: "CisScan" }) as any as S.Schema<CisScan>;
export type CisScanList = CisScan[];
export const CisScanList = S.Array(CisScan);
export interface ListCisScansResponse {
  scans?: CisScan[];
  nextToken?: string;
}
export const ListCisScansResponse = S.suspend(() =>
  S.Struct({ scans: S.optional(CisScanList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListCisScansResponse",
}) as any as S.Schema<ListCisScansResponse>;
export interface ListCodeSecurityIntegrationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListCodeSecurityIntegrationsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListCodeSecurityIntegrationsRequest",
}) as any as S.Schema<ListCodeSecurityIntegrationsRequest>;
export interface CodeSecurityIntegrationSummary {
  integrationArn: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  statusReason: string;
  createdOn: Date;
  lastUpdateOn: Date;
  tags?: { [key: string]: string | undefined };
}
export const CodeSecurityIntegrationSummary = S.suspend(() =>
  S.Struct({
    integrationArn: S.String,
    name: S.String,
    type: IntegrationType,
    status: IntegrationStatus,
    statusReason: S.String,
    createdOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateOn: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CodeSecurityIntegrationSummary",
}) as any as S.Schema<CodeSecurityIntegrationSummary>;
export type IntegrationSummaries = CodeSecurityIntegrationSummary[];
export const IntegrationSummaries = S.Array(CodeSecurityIntegrationSummary);
export interface ListCodeSecurityIntegrationsResponse {
  integrations?: CodeSecurityIntegrationSummary[];
  nextToken?: string;
}
export const ListCodeSecurityIntegrationsResponse = S.suspend(() =>
  S.Struct({
    integrations: S.optional(IntegrationSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodeSecurityIntegrationsResponse",
}) as any as S.Schema<ListCodeSecurityIntegrationsResponse>;
export interface ListCodeSecurityScanConfigurationAssociationsRequest {
  scanConfigurationArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCodeSecurityScanConfigurationAssociationsRequest = S.suspend(
  () =>
    S.Struct({
      scanConfigurationArn: S.String,
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/codesecurity/scan-configuration/associations/list",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCodeSecurityScanConfigurationAssociationsRequest",
}) as any as S.Schema<ListCodeSecurityScanConfigurationAssociationsRequest>;
export interface CodeSecurityScanConfigurationAssociationSummary {
  resource?: CodeSecurityResource;
}
export const CodeSecurityScanConfigurationAssociationSummary = S.suspend(() =>
  S.Struct({ resource: S.optional(CodeSecurityResource) }),
).annotate({
  identifier: "CodeSecurityScanConfigurationAssociationSummary",
}) as any as S.Schema<CodeSecurityScanConfigurationAssociationSummary>;
export type CodeSecurityScanConfigurationAssociationSummaries =
  CodeSecurityScanConfigurationAssociationSummary[];
export const CodeSecurityScanConfigurationAssociationSummaries = S.Array(
  CodeSecurityScanConfigurationAssociationSummary,
);
export interface ListCodeSecurityScanConfigurationAssociationsResponse {
  associations?: CodeSecurityScanConfigurationAssociationSummary[];
  nextToken?: string;
}
export const ListCodeSecurityScanConfigurationAssociationsResponse = S.suspend(
  () =>
    S.Struct({
      associations: S.optional(
        CodeSecurityScanConfigurationAssociationSummaries,
      ),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCodeSecurityScanConfigurationAssociationsResponse",
}) as any as S.Schema<ListCodeSecurityScanConfigurationAssociationsResponse>;
export interface ListCodeSecurityScanConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListCodeSecurityScanConfigurationsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListCodeSecurityScanConfigurationsRequest",
}) as any as S.Schema<ListCodeSecurityScanConfigurationsRequest>;
export interface CodeSecurityScanConfigurationSummary {
  scanConfigurationArn: string;
  name: string;
  ownerAccountId: string;
  periodicScanFrequency?: PeriodicScanFrequency;
  frequencyExpression?: string;
  continuousIntegrationScanSupportedEvents?: ContinuousIntegrationScanEvent[];
  ruleSetCategories: RuleSetCategory[];
  scopeSettings?: ScopeSettings;
  tags?: { [key: string]: string | undefined };
}
export const CodeSecurityScanConfigurationSummary = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.String,
    name: S.String,
    ownerAccountId: S.String,
    periodicScanFrequency: S.optional(PeriodicScanFrequency),
    frequencyExpression: S.optional(S.String),
    continuousIntegrationScanSupportedEvents: S.optional(
      ContinuousIntegrationScanSupportedEvents,
    ),
    ruleSetCategories: RuleSetCategories,
    scopeSettings: S.optional(ScopeSettings),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CodeSecurityScanConfigurationSummary",
}) as any as S.Schema<CodeSecurityScanConfigurationSummary>;
export type CodeSecurityScanConfigurationSummaries =
  CodeSecurityScanConfigurationSummary[];
export const CodeSecurityScanConfigurationSummaries = S.Array(
  CodeSecurityScanConfigurationSummary,
);
export interface ListCodeSecurityScanConfigurationsResponse {
  configurations?: CodeSecurityScanConfigurationSummary[];
  nextToken?: string;
}
export const ListCodeSecurityScanConfigurationsResponse = S.suspend(() =>
  S.Struct({
    configurations: S.optional(CodeSecurityScanConfigurationSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodeSecurityScanConfigurationsResponse",
}) as any as S.Schema<ListCodeSecurityScanConfigurationsResponse>;
export interface CoverageStringFilter {
  comparison: string;
  value: string;
}
export const CoverageStringFilter = S.suspend(() =>
  S.Struct({ comparison: S.String, value: S.String }),
).annotate({
  identifier: "CoverageStringFilter",
}) as any as S.Schema<CoverageStringFilter>;
export type CoverageStringFilterList = CoverageStringFilter[];
export const CoverageStringFilterList = S.Array(CoverageStringFilter);
export interface CoverageMapFilter {
  comparison: string;
  key: string;
  value?: string;
}
export const CoverageMapFilter = S.suspend(() =>
  S.Struct({
    comparison: S.String,
    key: S.String,
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "CoverageMapFilter",
}) as any as S.Schema<CoverageMapFilter>;
export type CoverageMapFilterList = CoverageMapFilter[];
export const CoverageMapFilterList = S.Array(CoverageMapFilter);
export interface CoverageDateFilter {
  startInclusive?: Date;
  endInclusive?: Date;
}
export const CoverageDateFilter = S.suspend(() =>
  S.Struct({
    startInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CoverageDateFilter",
}) as any as S.Schema<CoverageDateFilter>;
export type CoverageDateFilterList = CoverageDateFilter[];
export const CoverageDateFilterList = S.Array(CoverageDateFilter);
export interface CoverageNumberFilter {
  upperInclusive?: number;
  lowerInclusive?: number;
}
export const CoverageNumberFilter = S.suspend(() =>
  S.Struct({
    upperInclusive: S.optional(S.Number),
    lowerInclusive: S.optional(S.Number),
  }),
).annotate({
  identifier: "CoverageNumberFilter",
}) as any as S.Schema<CoverageNumberFilter>;
export type CoverageNumberFilterList = CoverageNumberFilter[];
export const CoverageNumberFilterList = S.Array(CoverageNumberFilter);
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
}
export const CoverageFilterCriteria = S.suspend(() =>
  S.Struct({
    scanStatusCode: S.optional(CoverageStringFilterList),
    scanStatusReason: S.optional(CoverageStringFilterList),
    accountId: S.optional(CoverageStringFilterList),
    resourceId: S.optional(CoverageStringFilterList),
    resourceType: S.optional(CoverageStringFilterList),
    scanType: S.optional(CoverageStringFilterList),
    ecrRepositoryName: S.optional(CoverageStringFilterList),
    ecrImageTags: S.optional(CoverageStringFilterList),
    ec2InstanceTags: S.optional(CoverageMapFilterList),
    lambdaFunctionName: S.optional(CoverageStringFilterList),
    lambdaFunctionTags: S.optional(CoverageMapFilterList),
    lambdaFunctionRuntime: S.optional(CoverageStringFilterList),
    lastScannedAt: S.optional(CoverageDateFilterList),
    scanMode: S.optional(CoverageStringFilterList),
    imagePulledAt: S.optional(CoverageDateFilterList),
    ecrImageLastInUseAt: S.optional(CoverageDateFilterList),
    ecrImageInUseCount: S.optional(CoverageNumberFilterList),
    codeRepositoryProjectName: S.optional(CoverageStringFilterList),
    codeRepositoryProviderType: S.optional(CoverageStringFilterList),
    codeRepositoryProviderTypeVisibility: S.optional(CoverageStringFilterList),
    lastScannedCommitId: S.optional(CoverageStringFilterList),
  }),
).annotate({
  identifier: "CoverageFilterCriteria",
}) as any as S.Schema<CoverageFilterCriteria>;
export interface ListCoverageRequest {
  maxResults?: number;
  nextToken?: string;
  filterCriteria?: CoverageFilterCriteria;
}
export const ListCoverageRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filterCriteria: S.optional(CoverageFilterCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/coverage/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCoverageRequest",
}) as any as S.Schema<ListCoverageRequest>;
export interface ScanStatus {
  statusCode: string;
  reason: string;
}
export const ScanStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, reason: S.String }),
).annotate({ identifier: "ScanStatus" }) as any as S.Schema<ScanStatus>;
export interface EcrRepositoryMetadata {
  name?: string;
  scanFrequency?: string;
}
export const EcrRepositoryMetadata = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), scanFrequency: S.optional(S.String) }),
).annotate({
  identifier: "EcrRepositoryMetadata",
}) as any as S.Schema<EcrRepositoryMetadata>;
export type TagList = string[];
export const TagList = S.Array(S.String);
export interface EcrContainerImageMetadata {
  tags?: string[];
  imagePulledAt?: Date;
  lastInUseAt?: Date;
  inUseCount?: number;
}
export const EcrContainerImageMetadata = S.suspend(() =>
  S.Struct({
    tags: S.optional(TagList),
    imagePulledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inUseCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "EcrContainerImageMetadata",
}) as any as S.Schema<EcrContainerImageMetadata>;
export interface Ec2Metadata {
  tags?: { [key: string]: string | undefined };
  amiId?: string;
  platform?: string;
}
export const Ec2Metadata = S.suspend(() =>
  S.Struct({
    tags: S.optional(TagMap),
    amiId: S.optional(S.String),
    platform: S.optional(S.String),
  }),
).annotate({ identifier: "Ec2Metadata" }) as any as S.Schema<Ec2Metadata>;
export type LambdaLayerList = string[];
export const LambdaLayerList = S.Array(S.String);
export interface LambdaFunctionMetadata {
  functionTags?: { [key: string]: string | undefined };
  layers?: string[];
  functionName?: string;
  runtime?: string;
}
export const LambdaFunctionMetadata = S.suspend(() =>
  S.Struct({
    functionTags: S.optional(TagMap),
    layers: S.optional(LambdaLayerList),
    functionName: S.optional(S.String),
    runtime: S.optional(S.String),
  }),
).annotate({
  identifier: "LambdaFunctionMetadata",
}) as any as S.Schema<LambdaFunctionMetadata>;
export interface ProjectPeriodicScanConfiguration {
  frequencyExpression?: string;
  ruleSetCategories?: RuleSetCategory[];
}
export const ProjectPeriodicScanConfiguration = S.suspend(() =>
  S.Struct({
    frequencyExpression: S.optional(S.String),
    ruleSetCategories: S.optional(RuleSetCategories),
  }),
).annotate({
  identifier: "ProjectPeriodicScanConfiguration",
}) as any as S.Schema<ProjectPeriodicScanConfiguration>;
export type ProjectPeriodicScanConfigurationList =
  ProjectPeriodicScanConfiguration[];
export const ProjectPeriodicScanConfigurationList = S.Array(
  ProjectPeriodicScanConfiguration,
);
export interface ProjectContinuousIntegrationScanConfiguration {
  supportedEvent?: ContinuousIntegrationScanEvent;
  ruleSetCategories?: RuleSetCategory[];
}
export const ProjectContinuousIntegrationScanConfiguration = S.suspend(() =>
  S.Struct({
    supportedEvent: S.optional(ContinuousIntegrationScanEvent),
    ruleSetCategories: S.optional(RuleSetCategories),
  }),
).annotate({
  identifier: "ProjectContinuousIntegrationScanConfiguration",
}) as any as S.Schema<ProjectContinuousIntegrationScanConfiguration>;
export type ProjectContinuousIntegrationScanConfigurationList =
  ProjectContinuousIntegrationScanConfiguration[];
export const ProjectContinuousIntegrationScanConfigurationList = S.Array(
  ProjectContinuousIntegrationScanConfiguration,
);
export interface ProjectCodeSecurityScanConfiguration {
  periodicScanConfigurations?: ProjectPeriodicScanConfiguration[];
  continuousIntegrationScanConfigurations?: ProjectContinuousIntegrationScanConfiguration[];
}
export const ProjectCodeSecurityScanConfiguration = S.suspend(() =>
  S.Struct({
    periodicScanConfigurations: S.optional(
      ProjectPeriodicScanConfigurationList,
    ),
    continuousIntegrationScanConfigurations: S.optional(
      ProjectContinuousIntegrationScanConfigurationList,
    ),
  }),
).annotate({
  identifier: "ProjectCodeSecurityScanConfiguration",
}) as any as S.Schema<ProjectCodeSecurityScanConfiguration>;
export interface CodeRepositoryOnDemandScan {
  lastScannedCommitId?: string;
  lastScanAt?: Date;
  scanStatus?: ScanStatus;
}
export const CodeRepositoryOnDemandScan = S.suspend(() =>
  S.Struct({
    lastScannedCommitId: S.optional(S.String),
    lastScanAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    scanStatus: S.optional(ScanStatus),
  }),
).annotate({
  identifier: "CodeRepositoryOnDemandScan",
}) as any as S.Schema<CodeRepositoryOnDemandScan>;
export interface CodeRepositoryMetadata {
  projectName: string;
  integrationArn?: string;
  providerType: string;
  providerTypeVisibility: string;
  lastScannedCommitId?: string;
  scanConfiguration?: ProjectCodeSecurityScanConfiguration;
  onDemandScan?: CodeRepositoryOnDemandScan;
}
export const CodeRepositoryMetadata = S.suspend(() =>
  S.Struct({
    projectName: S.String,
    integrationArn: S.optional(S.String),
    providerType: S.String,
    providerTypeVisibility: S.String,
    lastScannedCommitId: S.optional(S.String),
    scanConfiguration: S.optional(ProjectCodeSecurityScanConfiguration),
    onDemandScan: S.optional(CodeRepositoryOnDemandScan),
  }),
).annotate({
  identifier: "CodeRepositoryMetadata",
}) as any as S.Schema<CodeRepositoryMetadata>;
export interface ResourceScanMetadata {
  ecrRepository?: EcrRepositoryMetadata;
  ecrImage?: EcrContainerImageMetadata;
  ec2?: Ec2Metadata;
  lambdaFunction?: LambdaFunctionMetadata;
  codeRepository?: CodeRepositoryMetadata;
}
export const ResourceScanMetadata = S.suspend(() =>
  S.Struct({
    ecrRepository: S.optional(EcrRepositoryMetadata),
    ecrImage: S.optional(EcrContainerImageMetadata),
    ec2: S.optional(Ec2Metadata),
    lambdaFunction: S.optional(LambdaFunctionMetadata),
    codeRepository: S.optional(CodeRepositoryMetadata),
  }),
).annotate({
  identifier: "ResourceScanMetadata",
}) as any as S.Schema<ResourceScanMetadata>;
export interface CoveredResource {
  resourceType: string;
  resourceId: string;
  accountId: string;
  scanType: string;
  scanStatus?: ScanStatus;
  resourceMetadata?: ResourceScanMetadata;
  lastScannedAt?: Date;
  scanMode?: string;
}
export const CoveredResource = S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    resourceId: S.String,
    accountId: S.String,
    scanType: S.String,
    scanStatus: S.optional(ScanStatus),
    resourceMetadata: S.optional(ResourceScanMetadata),
    lastScannedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    scanMode: S.optional(S.String),
  }),
).annotate({
  identifier: "CoveredResource",
}) as any as S.Schema<CoveredResource>;
export type CoveredResources = CoveredResource[];
export const CoveredResources = S.Array(CoveredResource);
export interface ListCoverageResponse {
  nextToken?: string;
  coveredResources?: CoveredResource[];
}
export const ListCoverageResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    coveredResources: S.optional(CoveredResources),
  }),
).annotate({
  identifier: "ListCoverageResponse",
}) as any as S.Schema<ListCoverageResponse>;
export interface ListCoverageStatisticsRequest {
  filterCriteria?: CoverageFilterCriteria;
  groupBy?: string;
  nextToken?: string;
}
export const ListCoverageStatisticsRequest = S.suspend(() =>
  S.Struct({
    filterCriteria: S.optional(CoverageFilterCriteria),
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
).annotate({
  identifier: "ListCoverageStatisticsRequest",
}) as any as S.Schema<ListCoverageStatisticsRequest>;
export interface Counts {
  count?: number;
  groupKey?: string;
}
export const Counts = S.suspend(() =>
  S.Struct({ count: S.optional(S.Number), groupKey: S.optional(S.String) }),
).annotate({ identifier: "Counts" }) as any as S.Schema<Counts>;
export type CountsList = Counts[];
export const CountsList = S.Array(Counts);
export interface ListCoverageStatisticsResponse {
  countsByGroup?: Counts[];
  totalCounts: number;
  nextToken?: string;
}
export const ListCoverageStatisticsResponse = S.suspend(() =>
  S.Struct({
    countsByGroup: S.optional(CountsList),
    totalCounts: S.Number,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCoverageStatisticsResponse",
}) as any as S.Schema<ListCoverageStatisticsResponse>;
export interface ListDelegatedAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListDelegatedAdminAccountsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delegatedadminaccounts/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDelegatedAdminAccountsRequest",
}) as any as S.Schema<ListDelegatedAdminAccountsRequest>;
export interface DelegatedAdminAccount {
  accountId?: string;
  status?: string;
}
export const DelegatedAdminAccount = S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String), status: S.optional(S.String) }),
).annotate({
  identifier: "DelegatedAdminAccount",
}) as any as S.Schema<DelegatedAdminAccount>;
export type DelegatedAdminAccountList = DelegatedAdminAccount[];
export const DelegatedAdminAccountList = S.Array(DelegatedAdminAccount);
export interface ListDelegatedAdminAccountsResponse {
  delegatedAdminAccounts?: DelegatedAdminAccount[];
  nextToken?: string;
}
export const ListDelegatedAdminAccountsResponse = S.suspend(() =>
  S.Struct({
    delegatedAdminAccounts: S.optional(DelegatedAdminAccountList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDelegatedAdminAccountsResponse",
}) as any as S.Schema<ListDelegatedAdminAccountsResponse>;
export type FilterArnList = string[];
export const FilterArnList = S.Array(S.String);
export interface ListFiltersRequest {
  arns?: string[];
  action?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFiltersRequest = S.suspend(() =>
  S.Struct({
    arns: S.optional(FilterArnList),
    action: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/filters/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFiltersRequest",
}) as any as S.Schema<ListFiltersRequest>;
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
export const Filter = S.suspend(() =>
  S.Struct({
    arn: S.String,
    ownerId: S.String,
    name: S.String,
    criteria: FilterCriteria,
    action: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
    reason: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = S.Array(Filter);
export interface ListFiltersResponse {
  filters: Filter[];
  nextToken?: string;
}
export const ListFiltersResponse = S.suspend(() =>
  S.Struct({ filters: FilterList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFiltersResponse",
}) as any as S.Schema<ListFiltersResponse>;
export interface AccountAggregation {
  findingType?: string;
  resourceType?: string;
  sortOrder?: string;
  sortBy?: string;
}
export const AccountAggregation = S.suspend(() =>
  S.Struct({
    findingType: S.optional(S.String),
    resourceType: S.optional(S.String),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountAggregation",
}) as any as S.Schema<AccountAggregation>;
export interface AmiAggregation {
  amis?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const AmiAggregation = S.suspend(() =>
  S.Struct({
    amis: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({ identifier: "AmiAggregation" }) as any as S.Schema<AmiAggregation>;
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
export const AwsEcrContainerAggregation = S.suspend(() =>
  S.Struct({
    resourceIds: S.optional(StringFilterList),
    imageShas: S.optional(StringFilterList),
    repositories: S.optional(StringFilterList),
    architectures: S.optional(StringFilterList),
    imageTags: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
    lastInUseAt: S.optional(DateFilterList),
    inUseCount: S.optional(NumberFilterList),
  }),
).annotate({
  identifier: "AwsEcrContainerAggregation",
}) as any as S.Schema<AwsEcrContainerAggregation>;
export interface Ec2InstanceAggregation {
  amis?: StringFilter[];
  operatingSystems?: StringFilter[];
  instanceIds?: StringFilter[];
  instanceTags?: MapFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const Ec2InstanceAggregation = S.suspend(() =>
  S.Struct({
    amis: S.optional(StringFilterList),
    operatingSystems: S.optional(StringFilterList),
    instanceIds: S.optional(StringFilterList),
    instanceTags: S.optional(MapFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "Ec2InstanceAggregation",
}) as any as S.Schema<Ec2InstanceAggregation>;
export interface FindingTypeAggregation {
  findingType?: string;
  resourceType?: string;
  sortOrder?: string;
  sortBy?: string;
}
export const FindingTypeAggregation = S.suspend(() =>
  S.Struct({
    findingType: S.optional(S.String),
    resourceType: S.optional(S.String),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "FindingTypeAggregation",
}) as any as S.Schema<FindingTypeAggregation>;
export interface ImageLayerAggregation {
  repositories?: StringFilter[];
  resourceIds?: StringFilter[];
  layerHashes?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const ImageLayerAggregation = S.suspend(() =>
  S.Struct({
    repositories: S.optional(StringFilterList),
    resourceIds: S.optional(StringFilterList),
    layerHashes: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "ImageLayerAggregation",
}) as any as S.Schema<ImageLayerAggregation>;
export interface PackageAggregation {
  packageNames?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const PackageAggregation = S.suspend(() =>
  S.Struct({
    packageNames: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "PackageAggregation",
}) as any as S.Schema<PackageAggregation>;
export interface RepositoryAggregation {
  repositories?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const RepositoryAggregation = S.suspend(() =>
  S.Struct({
    repositories: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryAggregation",
}) as any as S.Schema<RepositoryAggregation>;
export interface TitleAggregation {
  titles?: StringFilter[];
  vulnerabilityIds?: StringFilter[];
  resourceType?: string;
  sortOrder?: string;
  sortBy?: string;
  findingType?: string;
}
export const TitleAggregation = S.suspend(() =>
  S.Struct({
    titles: S.optional(StringFilterList),
    vulnerabilityIds: S.optional(StringFilterList),
    resourceType: S.optional(S.String),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
    findingType: S.optional(S.String),
  }),
).annotate({
  identifier: "TitleAggregation",
}) as any as S.Schema<TitleAggregation>;
export interface LambdaLayerAggregation {
  functionNames?: StringFilter[];
  resourceIds?: StringFilter[];
  layerArns?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const LambdaLayerAggregation = S.suspend(() =>
  S.Struct({
    functionNames: S.optional(StringFilterList),
    resourceIds: S.optional(StringFilterList),
    layerArns: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "LambdaLayerAggregation",
}) as any as S.Schema<LambdaLayerAggregation>;
export interface LambdaFunctionAggregation {
  resourceIds?: StringFilter[];
  functionNames?: StringFilter[];
  runtimes?: StringFilter[];
  functionTags?: MapFilter[];
  sortOrder?: string;
  sortBy?: string;
}
export const LambdaFunctionAggregation = S.suspend(() =>
  S.Struct({
    resourceIds: S.optional(StringFilterList),
    functionNames: S.optional(StringFilterList),
    runtimes: S.optional(StringFilterList),
    functionTags: S.optional(MapFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
  }),
).annotate({
  identifier: "LambdaFunctionAggregation",
}) as any as S.Schema<LambdaFunctionAggregation>;
export interface CodeRepositoryAggregation {
  projectNames?: StringFilter[];
  providerTypes?: StringFilter[];
  sortOrder?: string;
  sortBy?: string;
  resourceIds?: StringFilter[];
}
export const CodeRepositoryAggregation = S.suspend(() =>
  S.Struct({
    projectNames: S.optional(StringFilterList),
    providerTypes: S.optional(StringFilterList),
    sortOrder: S.optional(S.String),
    sortBy: S.optional(S.String),
    resourceIds: S.optional(StringFilterList),
  }),
).annotate({
  identifier: "CodeRepositoryAggregation",
}) as any as S.Schema<CodeRepositoryAggregation>;
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
    };
export const AggregationRequest = S.Union([
  S.Struct({ accountAggregation: AccountAggregation }),
  S.Struct({ amiAggregation: AmiAggregation }),
  S.Struct({ awsEcrContainerAggregation: AwsEcrContainerAggregation }),
  S.Struct({ ec2InstanceAggregation: Ec2InstanceAggregation }),
  S.Struct({ findingTypeAggregation: FindingTypeAggregation }),
  S.Struct({ imageLayerAggregation: ImageLayerAggregation }),
  S.Struct({ packageAggregation: PackageAggregation }),
  S.Struct({ repositoryAggregation: RepositoryAggregation }),
  S.Struct({ titleAggregation: TitleAggregation }),
  S.Struct({ lambdaLayerAggregation: LambdaLayerAggregation }),
  S.Struct({ lambdaFunctionAggregation: LambdaFunctionAggregation }),
  S.Struct({ codeRepositoryAggregation: CodeRepositoryAggregation }),
]);
export interface ListFindingAggregationsRequest {
  aggregationType: string;
  nextToken?: string;
  maxResults?: number;
  accountIds?: StringFilter[];
  aggregationRequest?: AggregationRequest;
}
export const ListFindingAggregationsRequest = S.suspend(() =>
  S.Struct({
    aggregationType: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    accountIds: S.optional(StringFilterList),
    aggregationRequest: S.optional(AggregationRequest),
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
).annotate({
  identifier: "ListFindingAggregationsRequest",
}) as any as S.Schema<ListFindingAggregationsRequest>;
export interface SeverityCounts {
  all?: number;
  medium?: number;
  high?: number;
  critical?: number;
}
export const SeverityCounts = S.suspend(() =>
  S.Struct({
    all: S.optional(S.Number),
    medium: S.optional(S.Number),
    high: S.optional(S.Number),
    critical: S.optional(S.Number),
  }),
).annotate({ identifier: "SeverityCounts" }) as any as S.Schema<SeverityCounts>;
export interface AccountAggregationResponse {
  accountId?: string;
  severityCounts?: SeverityCounts;
  exploitAvailableCount?: number;
  fixAvailableCount?: number;
}
export const AccountAggregationResponse = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    exploitAvailableCount: S.optional(S.Number),
    fixAvailableCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "AccountAggregationResponse",
}) as any as S.Schema<AccountAggregationResponse>;
export interface AmiAggregationResponse {
  ami: string;
  accountId?: string;
  severityCounts?: SeverityCounts;
  affectedInstances?: number;
}
export const AmiAggregationResponse = S.suspend(() =>
  S.Struct({
    ami: S.String,
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    affectedInstances: S.optional(S.Number),
  }),
).annotate({
  identifier: "AmiAggregationResponse",
}) as any as S.Schema<AmiAggregationResponse>;
export type StringList = string[];
export const StringList = S.Array(S.String);
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
export const AwsEcrContainerAggregationResponse = S.suspend(() =>
  S.Struct({
    resourceId: S.String,
    imageSha: S.optional(S.String),
    repository: S.optional(S.String),
    architecture: S.optional(S.String),
    imageTags: S.optional(StringList),
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inUseCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsEcrContainerAggregationResponse",
}) as any as S.Schema<AwsEcrContainerAggregationResponse>;
export interface Ec2InstanceAggregationResponse {
  instanceId: string;
  ami?: string;
  operatingSystem?: string;
  instanceTags?: { [key: string]: string | undefined };
  accountId?: string;
  severityCounts?: SeverityCounts;
  networkFindings?: number;
}
export const Ec2InstanceAggregationResponse = S.suspend(() =>
  S.Struct({
    instanceId: S.String,
    ami: S.optional(S.String),
    operatingSystem: S.optional(S.String),
    instanceTags: S.optional(TagMap),
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    networkFindings: S.optional(S.Number),
  }),
).annotate({
  identifier: "Ec2InstanceAggregationResponse",
}) as any as S.Schema<Ec2InstanceAggregationResponse>;
export interface FindingTypeAggregationResponse {
  accountId?: string;
  severityCounts?: SeverityCounts;
  exploitAvailableCount?: number;
  fixAvailableCount?: number;
}
export const FindingTypeAggregationResponse = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    exploitAvailableCount: S.optional(S.Number),
    fixAvailableCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "FindingTypeAggregationResponse",
}) as any as S.Schema<FindingTypeAggregationResponse>;
export interface ImageLayerAggregationResponse {
  repository: string;
  resourceId: string;
  layerHash: string;
  accountId: string;
  severityCounts?: SeverityCounts;
}
export const ImageLayerAggregationResponse = S.suspend(() =>
  S.Struct({
    repository: S.String,
    resourceId: S.String,
    layerHash: S.String,
    accountId: S.String,
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "ImageLayerAggregationResponse",
}) as any as S.Schema<ImageLayerAggregationResponse>;
export interface PackageAggregationResponse {
  packageName: string;
  accountId?: string;
  severityCounts?: SeverityCounts;
}
export const PackageAggregationResponse = S.suspend(() =>
  S.Struct({
    packageName: S.String,
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "PackageAggregationResponse",
}) as any as S.Schema<PackageAggregationResponse>;
export interface RepositoryAggregationResponse {
  repository: string;
  accountId?: string;
  severityCounts?: SeverityCounts;
  affectedImages?: number;
}
export const RepositoryAggregationResponse = S.suspend(() =>
  S.Struct({
    repository: S.String,
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    affectedImages: S.optional(S.Number),
  }),
).annotate({
  identifier: "RepositoryAggregationResponse",
}) as any as S.Schema<RepositoryAggregationResponse>;
export interface TitleAggregationResponse {
  title: string;
  vulnerabilityId?: string;
  accountId?: string;
  severityCounts?: SeverityCounts;
}
export const TitleAggregationResponse = S.suspend(() =>
  S.Struct({
    title: S.String,
    vulnerabilityId: S.optional(S.String),
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "TitleAggregationResponse",
}) as any as S.Schema<TitleAggregationResponse>;
export interface LambdaLayerAggregationResponse {
  functionName: string;
  resourceId: string;
  layerArn: string;
  accountId: string;
  severityCounts?: SeverityCounts;
}
export const LambdaLayerAggregationResponse = S.suspend(() =>
  S.Struct({
    functionName: S.String,
    resourceId: S.String,
    layerArn: S.String,
    accountId: S.String,
    severityCounts: S.optional(SeverityCounts),
  }),
).annotate({
  identifier: "LambdaLayerAggregationResponse",
}) as any as S.Schema<LambdaLayerAggregationResponse>;
export interface LambdaFunctionAggregationResponse {
  resourceId: string;
  functionName?: string;
  runtime?: string;
  lambdaTags?: { [key: string]: string | undefined };
  accountId?: string;
  severityCounts?: SeverityCounts;
  lastModifiedAt?: Date;
}
export const LambdaFunctionAggregationResponse = S.suspend(() =>
  S.Struct({
    resourceId: S.String,
    functionName: S.optional(S.String),
    runtime: S.optional(S.String),
    lambdaTags: S.optional(TagMap),
    accountId: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LambdaFunctionAggregationResponse",
}) as any as S.Schema<LambdaFunctionAggregationResponse>;
export interface CodeRepositoryAggregationResponse {
  projectNames: string;
  providerType?: string;
  severityCounts?: SeverityCounts;
  exploitAvailableActiveFindingsCount?: number;
  fixAvailableActiveFindingsCount?: number;
  accountId?: string;
  resourceId?: string;
}
export const CodeRepositoryAggregationResponse = S.suspend(() =>
  S.Struct({
    projectNames: S.String,
    providerType: S.optional(S.String),
    severityCounts: S.optional(SeverityCounts),
    exploitAvailableActiveFindingsCount: S.optional(S.Number),
    fixAvailableActiveFindingsCount: S.optional(S.Number),
    accountId: S.optional(S.String),
    resourceId: S.optional(S.String),
  }),
).annotate({
  identifier: "CodeRepositoryAggregationResponse",
}) as any as S.Schema<CodeRepositoryAggregationResponse>;
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
    };
export const AggregationResponse = S.Union([
  S.Struct({ accountAggregation: AccountAggregationResponse }),
  S.Struct({ amiAggregation: AmiAggregationResponse }),
  S.Struct({ awsEcrContainerAggregation: AwsEcrContainerAggregationResponse }),
  S.Struct({ ec2InstanceAggregation: Ec2InstanceAggregationResponse }),
  S.Struct({ findingTypeAggregation: FindingTypeAggregationResponse }),
  S.Struct({ imageLayerAggregation: ImageLayerAggregationResponse }),
  S.Struct({ packageAggregation: PackageAggregationResponse }),
  S.Struct({ repositoryAggregation: RepositoryAggregationResponse }),
  S.Struct({ titleAggregation: TitleAggregationResponse }),
  S.Struct({ lambdaLayerAggregation: LambdaLayerAggregationResponse }),
  S.Struct({ lambdaFunctionAggregation: LambdaFunctionAggregationResponse }),
  S.Struct({ codeRepositoryAggregation: CodeRepositoryAggregationResponse }),
]);
export type AggregationResponseList = AggregationResponse[];
export const AggregationResponseList = S.Array(AggregationResponse);
export interface ListFindingAggregationsResponse {
  aggregationType: string;
  responses?: AggregationResponse[];
  nextToken?: string;
}
export const ListFindingAggregationsResponse = S.suspend(() =>
  S.Struct({
    aggregationType: S.String,
    responses: S.optional(AggregationResponseList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingAggregationsResponse",
}) as any as S.Schema<ListFindingAggregationsResponse>;
export interface SortCriteria {
  field: string;
  sortOrder: string;
}
export const SortCriteria = S.suspend(() =>
  S.Struct({ field: S.String, sortOrder: S.String }),
).annotate({ identifier: "SortCriteria" }) as any as S.Schema<SortCriteria>;
export interface ListFindingsRequest {
  maxResults?: number;
  nextToken?: string;
  filterCriteria?: FilterCriteria;
  sortCriteria?: SortCriteria;
}
export const ListFindingsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filterCriteria: S.optional(FilterCriteria),
    sortCriteria: S.optional(SortCriteria),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/findings/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingsRequest",
}) as any as S.Schema<ListFindingsRequest>;
export interface Recommendation {
  text?: string;
  Url?: string;
}
export const Recommendation = S.suspend(() =>
  S.Struct({ text: S.optional(S.String), Url: S.optional(S.String) }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export interface Remediation {
  recommendation?: Recommendation;
}
export const Remediation = S.suspend(() =>
  S.Struct({ recommendation: S.optional(Recommendation) }),
).annotate({ identifier: "Remediation" }) as any as S.Schema<Remediation>;
export type IpV4AddressList = string[];
export const IpV4AddressList = S.Array(S.String);
export type IpV6AddressList = string[];
export const IpV6AddressList = S.Array(S.String);
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
export const AwsEc2InstanceDetails = S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    imageId: S.optional(S.String),
    ipV4Addresses: S.optional(IpV4AddressList),
    ipV6Addresses: S.optional(IpV6AddressList),
    keyName: S.optional(S.String),
    iamInstanceProfileArn: S.optional(S.String),
    vpcId: S.optional(S.String),
    subnetId: S.optional(S.String),
    launchedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    platform: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsEc2InstanceDetails",
}) as any as S.Schema<AwsEc2InstanceDetails>;
export type ImageTagList = string[];
export const ImageTagList = S.Array(S.String);
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
export const AwsEcrContainerImageDetails = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    imageTags: S.optional(ImageTagList),
    pushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    author: S.optional(S.String),
    architecture: S.optional(S.String),
    imageHash: S.String,
    registry: S.String,
    platform: S.optional(S.String),
    lastInUseAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    inUseCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsEcrContainerImageDetails",
}) as any as S.Schema<AwsEcrContainerImageDetails>;
export type LayerList = string[];
export const LayerList = S.Array(S.String);
export type SubnetIdList = string[];
export const SubnetIdList = S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = S.Array(S.String);
export interface LambdaVpcConfig {
  subnetIds?: string[];
  securityGroupIds?: string[];
  vpcId?: string;
}
export const LambdaVpcConfig = S.suspend(() =>
  S.Struct({
    subnetIds: S.optional(SubnetIdList),
    securityGroupIds: S.optional(SecurityGroupIdList),
    vpcId: S.optional(S.String),
  }),
).annotate({
  identifier: "LambdaVpcConfig",
}) as any as S.Schema<LambdaVpcConfig>;
export type ArchitectureList = string[];
export const ArchitectureList = S.Array(S.String);
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
export const AwsLambdaFunctionDetails = S.suspend(() =>
  S.Struct({
    functionName: S.String,
    runtime: S.String,
    codeSha256: S.String,
    version: S.String,
    executionRoleArn: S.String,
    layers: S.optional(LayerList),
    vpcConfig: S.optional(LambdaVpcConfig),
    packageType: S.optional(S.String),
    architectures: S.optional(ArchitectureList),
    lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AwsLambdaFunctionDetails",
}) as any as S.Schema<AwsLambdaFunctionDetails>;
export interface CodeRepositoryDetails {
  projectName?: string;
  integrationArn?: string;
  providerType?: string;
}
export const CodeRepositoryDetails = S.suspend(() =>
  S.Struct({
    projectName: S.optional(S.String),
    integrationArn: S.optional(S.String),
    providerType: S.optional(S.String),
  }),
).annotate({
  identifier: "CodeRepositoryDetails",
}) as any as S.Schema<CodeRepositoryDetails>;
export interface ResourceDetails {
  awsEc2Instance?: AwsEc2InstanceDetails;
  awsEcrContainerImage?: AwsEcrContainerImageDetails;
  awsLambdaFunction?: AwsLambdaFunctionDetails;
  codeRepository?: CodeRepositoryDetails;
}
export const ResourceDetails = S.suspend(() =>
  S.Struct({
    awsEc2Instance: S.optional(AwsEc2InstanceDetails),
    awsEcrContainerImage: S.optional(AwsEcrContainerImageDetails),
    awsLambdaFunction: S.optional(AwsLambdaFunctionDetails),
    codeRepository: S.optional(CodeRepositoryDetails),
  }),
).annotate({
  identifier: "ResourceDetails",
}) as any as S.Schema<ResourceDetails>;
export interface Resource {
  type: string;
  id: string;
  partition?: string;
  region?: string;
  tags?: { [key: string]: string | undefined };
  details?: ResourceDetails;
}
export const Resource = S.suspend(() =>
  S.Struct({
    type: S.String,
    id: S.String,
    partition: S.optional(S.String),
    region: S.optional(S.String),
    tags: S.optional(TagMap),
    details: S.optional(ResourceDetails),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = S.Array(Resource);
export interface CvssScoreAdjustment {
  metric: string;
  reason: string;
}
export const CvssScoreAdjustment = S.suspend(() =>
  S.Struct({ metric: S.String, reason: S.String }),
).annotate({
  identifier: "CvssScoreAdjustment",
}) as any as S.Schema<CvssScoreAdjustment>;
export type CvssScoreAdjustmentList = CvssScoreAdjustment[];
export const CvssScoreAdjustmentList = S.Array(CvssScoreAdjustment);
export interface CvssScoreDetails {
  scoreSource: string;
  cvssSource?: string;
  version: string;
  score: number;
  scoringVector: string;
  adjustments?: CvssScoreAdjustment[];
}
export const CvssScoreDetails = S.suspend(() =>
  S.Struct({
    scoreSource: S.String,
    cvssSource: S.optional(S.String),
    version: S.String,
    score: S.Number,
    scoringVector: S.String,
    adjustments: S.optional(CvssScoreAdjustmentList),
  }),
).annotate({
  identifier: "CvssScoreDetails",
}) as any as S.Schema<CvssScoreDetails>;
export interface InspectorScoreDetails {
  adjustedCvss?: CvssScoreDetails;
}
export const InspectorScoreDetails = S.suspend(() =>
  S.Struct({ adjustedCvss: S.optional(CvssScoreDetails) }),
).annotate({
  identifier: "InspectorScoreDetails",
}) as any as S.Schema<InspectorScoreDetails>;
export interface PortRange {
  begin: number;
  end: number;
}
export const PortRange = S.suspend(() =>
  S.Struct({ begin: S.Number, end: S.Number }),
).annotate({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export interface Step {
  componentId: string;
  componentType: string;
  componentArn?: string;
}
export const Step = S.suspend(() =>
  S.Struct({
    componentId: S.String,
    componentType: S.String,
    componentArn: S.optional(S.String),
  }),
).annotate({ identifier: "Step" }) as any as S.Schema<Step>;
export type StepList = Step[];
export const StepList = S.Array(Step);
export interface NetworkPath {
  steps?: Step[];
}
export const NetworkPath = S.suspend(() =>
  S.Struct({ steps: S.optional(StepList) }),
).annotate({ identifier: "NetworkPath" }) as any as S.Schema<NetworkPath>;
export interface NetworkReachabilityDetails {
  openPortRange: PortRange;
  protocol: string;
  networkPath: NetworkPath;
}
export const NetworkReachabilityDetails = S.suspend(() =>
  S.Struct({
    openPortRange: PortRange,
    protocol: S.String,
    networkPath: NetworkPath,
  }),
).annotate({
  identifier: "NetworkReachabilityDetails",
}) as any as S.Schema<NetworkReachabilityDetails>;
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
export const VulnerablePackage = S.suspend(() =>
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
).annotate({
  identifier: "VulnerablePackage",
}) as any as S.Schema<VulnerablePackage>;
export type VulnerablePackageList = VulnerablePackage[];
export const VulnerablePackageList = S.Array(VulnerablePackage);
export interface CvssScore {
  baseScore: number;
  scoringVector: string;
  version: string;
  source: string;
}
export const CvssScore = S.suspend(() =>
  S.Struct({
    baseScore: S.Number,
    scoringVector: S.String,
    version: S.String,
    source: S.String,
  }),
).annotate({ identifier: "CvssScore" }) as any as S.Schema<CvssScore>;
export type CvssScoreList = CvssScore[];
export const CvssScoreList = S.Array(CvssScore);
export type VulnerabilityIdList = string[];
export const VulnerabilityIdList = S.Array(S.String);
export type NonEmptyStringList = string[];
export const NonEmptyStringList = S.Array(S.String);
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
export const PackageVulnerabilityDetails = S.suspend(() =>
  S.Struct({
    vulnerabilityId: S.String,
    vulnerablePackages: S.optional(VulnerablePackageList),
    source: S.String,
    cvss: S.optional(CvssScoreList),
    relatedVulnerabilities: S.optional(VulnerabilityIdList),
    sourceUrl: S.optional(S.String),
    vendorSeverity: S.optional(S.String),
    vendorCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    vendorUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    referenceUrls: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "PackageVulnerabilityDetails",
}) as any as S.Schema<PackageVulnerabilityDetails>;
export interface ExploitabilityDetails {
  lastKnownExploitAt?: Date;
}
export const ExploitabilityDetails = S.suspend(() =>
  S.Struct({
    lastKnownExploitAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ExploitabilityDetails",
}) as any as S.Schema<ExploitabilityDetails>;
export interface CodeFilePath {
  fileName: string;
  filePath: string;
  startLine: number;
  endLine: number;
}
export const CodeFilePath = S.suspend(() =>
  S.Struct({
    fileName: S.String,
    filePath: S.String,
    startLine: S.Number,
    endLine: S.Number,
  }),
).annotate({ identifier: "CodeFilePath" }) as any as S.Schema<CodeFilePath>;
export type DetectorTagList = string[];
export const DetectorTagList = S.Array(S.String);
export type ReferenceUrls = string[];
export const ReferenceUrls = S.Array(S.String);
export type CweList = string[];
export const CweList = S.Array(S.String);
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
export const CodeVulnerabilityDetails = S.suspend(() =>
  S.Struct({
    filePath: CodeFilePath,
    detectorTags: S.optional(DetectorTagList),
    referenceUrls: S.optional(ReferenceUrls),
    ruleId: S.optional(S.String),
    sourceLambdaLayerArn: S.optional(S.String),
    detectorId: S.String,
    detectorName: S.String,
    cwes: CweList,
  }),
).annotate({
  identifier: "CodeVulnerabilityDetails",
}) as any as S.Schema<CodeVulnerabilityDetails>;
export interface EpssDetails {
  score?: number;
}
export const EpssDetails = S.suspend(() =>
  S.Struct({ score: S.optional(S.Number) }),
).annotate({ identifier: "EpssDetails" }) as any as S.Schema<EpssDetails>;
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
export const Finding = S.suspend(() =>
  S.Struct({
    findingArn: S.String,
    awsAccountId: S.String,
    type: S.String,
    description: S.String,
    title: S.optional(S.String),
    remediation: Remediation,
    severity: S.String,
    firstObservedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastObservedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.String,
    resources: ResourceList,
    inspectorScore: S.optional(S.Number),
    inspectorScoreDetails: S.optional(InspectorScoreDetails),
    networkReachabilityDetails: S.optional(NetworkReachabilityDetails),
    packageVulnerabilityDetails: S.optional(PackageVulnerabilityDetails),
    fixAvailable: S.optional(S.String),
    exploitAvailable: S.optional(S.String),
    exploitabilityDetails: S.optional(ExploitabilityDetails),
    codeVulnerabilityDetails: S.optional(CodeVulnerabilityDetails),
    epss: S.optional(EpssDetails),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type FindingList = Finding[];
export const FindingList = S.Array(Finding);
export interface ListFindingsResponse {
  nextToken?: string;
  findings?: Finding[];
}
export const ListFindingsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    findings: S.optional(FindingList),
  }),
).annotate({
  identifier: "ListFindingsResponse",
}) as any as S.Schema<ListFindingsResponse>;
export interface ListMembersRequest {
  onlyAssociated?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export const ListMembersRequest = S.suspend(() =>
  S.Struct({
    onlyAssociated: S.optional(S.Boolean),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/members/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembersRequest",
}) as any as S.Schema<ListMembersRequest>;
export type MemberList = Member[];
export const MemberList = S.Array(Member);
export interface ListMembersResponse {
  members?: Member[];
  nextToken?: string;
}
export const ListMembersResponse = S.suspend(() =>
  S.Struct({
    members: S.optional(MemberList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembersResponse",
}) as any as S.Schema<ListMembersResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type UsageAccountIdList = string[];
export const UsageAccountIdList = S.Array(S.String);
export interface ListUsageTotalsRequest {
  maxResults?: number;
  nextToken?: string;
  accountIds?: string[];
}
export const ListUsageTotalsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    accountIds: S.optional(UsageAccountIdList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/usage/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUsageTotalsRequest",
}) as any as S.Schema<ListUsageTotalsRequest>;
export interface Usage {
  type?: string;
  total?: number;
  estimatedMonthlyCost?: number;
  currency?: string;
}
export const Usage = S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    total: S.optional(S.Number),
    estimatedMonthlyCost: S.optional(S.Number),
    currency: S.optional(S.String),
  }),
).annotate({ identifier: "Usage" }) as any as S.Schema<Usage>;
export type UsageList = Usage[];
export const UsageList = S.Array(Usage);
export interface UsageTotal {
  accountId?: string;
  usage?: Usage[];
}
export const UsageTotal = S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String), usage: S.optional(UsageList) }),
).annotate({ identifier: "UsageTotal" }) as any as S.Schema<UsageTotal>;
export type UsageTotalList = UsageTotal[];
export const UsageTotalList = S.Array(UsageTotal);
export interface ListUsageTotalsResponse {
  nextToken?: string;
  totals?: UsageTotal[];
}
export const ListUsageTotalsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    totals: S.optional(UsageTotalList),
  }),
).annotate({
  identifier: "ListUsageTotalsResponse",
}) as any as S.Schema<ListUsageTotalsResponse>;
export interface ResetEncryptionKeyRequest {
  scanType: string;
  resourceType: string;
}
export const ResetEncryptionKeyRequest = S.suspend(() =>
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
).annotate({
  identifier: "ResetEncryptionKeyRequest",
}) as any as S.Schema<ResetEncryptionKeyRequest>;
export interface ResetEncryptionKeyResponse {}
export const ResetEncryptionKeyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResetEncryptionKeyResponse",
}) as any as S.Schema<ResetEncryptionKeyResponse>;
export type VulnIdList = string[];
export const VulnIdList = S.Array(S.String);
export interface SearchVulnerabilitiesFilterCriteria {
  vulnerabilityIds: string[];
}
export const SearchVulnerabilitiesFilterCriteria = S.suspend(() =>
  S.Struct({ vulnerabilityIds: VulnIdList }),
).annotate({
  identifier: "SearchVulnerabilitiesFilterCriteria",
}) as any as S.Schema<SearchVulnerabilitiesFilterCriteria>;
export interface SearchVulnerabilitiesRequest {
  filterCriteria: SearchVulnerabilitiesFilterCriteria;
  nextToken?: string;
}
export const SearchVulnerabilitiesRequest = S.suspend(() =>
  S.Struct({
    filterCriteria: SearchVulnerabilitiesFilterCriteria,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/vulnerabilities/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchVulnerabilitiesRequest",
}) as any as S.Schema<SearchVulnerabilitiesRequest>;
export type Targets = string[];
export const Targets = S.Array(S.String);
export interface AtigData {
  firstSeen?: Date;
  lastSeen?: Date;
  targets?: string[];
  ttps?: string[];
}
export const AtigData = S.suspend(() =>
  S.Struct({
    firstSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastSeen: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    targets: S.optional(Targets),
    ttps: S.optional(Ttps),
  }),
).annotate({ identifier: "AtigData" }) as any as S.Schema<AtigData>;
export interface Cvss4 {
  baseScore?: number;
  scoringVector?: string;
}
export const Cvss4 = S.suspend(() =>
  S.Struct({
    baseScore: S.optional(S.Number),
    scoringVector: S.optional(S.String),
  }),
).annotate({ identifier: "Cvss4" }) as any as S.Schema<Cvss4>;
export interface Cvss3 {
  baseScore?: number;
  scoringVector?: string;
}
export const Cvss3 = S.suspend(() =>
  S.Struct({
    baseScore: S.optional(S.Number),
    scoringVector: S.optional(S.String),
  }),
).annotate({ identifier: "Cvss3" }) as any as S.Schema<Cvss3>;
export type RelatedVulnerabilities = string[];
export const RelatedVulnerabilities = S.Array(S.String);
export interface Cvss2 {
  baseScore?: number;
  scoringVector?: string;
}
export const Cvss2 = S.suspend(() =>
  S.Struct({
    baseScore: S.optional(S.Number),
    scoringVector: S.optional(S.String),
  }),
).annotate({ identifier: "Cvss2" }) as any as S.Schema<Cvss2>;
export type DetectionPlatforms = string[];
export const DetectionPlatforms = S.Array(S.String);
export interface Epss {
  score?: number;
}
export const Epss = S.suspend(() =>
  S.Struct({ score: S.optional(S.Number) }),
).annotate({ identifier: "Epss" }) as any as S.Schema<Epss>;
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
export const Vulnerability = S.suspend(() =>
  S.Struct({
    id: S.String,
    cwes: S.optional(Cwes),
    cisaData: S.optional(CisaData),
    source: S.optional(S.String),
    description: S.optional(S.String),
    atigData: S.optional(AtigData),
    vendorSeverity: S.optional(S.String),
    cvss4: S.optional(Cvss4),
    cvss3: S.optional(Cvss3),
    relatedVulnerabilities: S.optional(RelatedVulnerabilities),
    cvss2: S.optional(Cvss2),
    vendorCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    vendorUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    sourceUrl: S.optional(S.String),
    referenceUrls: S.optional(VulnerabilityReferenceUrls),
    exploitObserved: S.optional(ExploitObserved),
    detectionPlatforms: S.optional(DetectionPlatforms),
    epss: S.optional(Epss),
  }),
).annotate({ identifier: "Vulnerability" }) as any as S.Schema<Vulnerability>;
export type Vulnerabilities = Vulnerability[];
export const Vulnerabilities = S.Array(Vulnerability);
export interface SearchVulnerabilitiesResponse {
  vulnerabilities: Vulnerability[];
  nextToken?: string;
}
export const SearchVulnerabilitiesResponse = S.suspend(() =>
  S.Struct({
    vulnerabilities: Vulnerabilities,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchVulnerabilitiesResponse",
}) as any as S.Schema<SearchVulnerabilitiesResponse>;
export interface SendCisSessionHealthRequest {
  scanJobId: string;
  sessionToken: string;
}
export const SendCisSessionHealthRequest = S.suspend(() =>
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
).annotate({
  identifier: "SendCisSessionHealthRequest",
}) as any as S.Schema<SendCisSessionHealthRequest>;
export interface SendCisSessionHealthResponse {}
export const SendCisSessionHealthResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendCisSessionHealthResponse",
}) as any as S.Schema<SendCisSessionHealthResponse>;
export type CisRuleStatus =
  | "FAILED"
  | "PASSED"
  | "NOT_EVALUATED"
  | "INFORMATIONAL"
  | "UNKNOWN"
  | "NOT_APPLICABLE"
  | "ERROR"
  | (string & {});
export const CisRuleStatus = S.String;
export interface CisSessionMessage {
  ruleId: string;
  status: CisRuleStatus;
  cisRuleDetails: Uint8Array;
}
export const CisSessionMessage = S.suspend(() =>
  S.Struct({ ruleId: S.String, status: CisRuleStatus, cisRuleDetails: T.Blob }),
).annotate({
  identifier: "CisSessionMessage",
}) as any as S.Schema<CisSessionMessage>;
export type CisSessionMessages = CisSessionMessage[];
export const CisSessionMessages = S.Array(CisSessionMessage);
export interface SendCisSessionTelemetryRequest {
  scanJobId: string;
  sessionToken: string;
  messages: CisSessionMessage[];
}
export const SendCisSessionTelemetryRequest = S.suspend(() =>
  S.Struct({
    scanJobId: S.String,
    sessionToken: S.String,
    messages: CisSessionMessages,
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
).annotate({
  identifier: "SendCisSessionTelemetryRequest",
}) as any as S.Schema<SendCisSessionTelemetryRequest>;
export interface SendCisSessionTelemetryResponse {}
export const SendCisSessionTelemetryResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendCisSessionTelemetryResponse",
}) as any as S.Schema<SendCisSessionTelemetryResponse>;
export interface StartCisSessionMessage {
  sessionToken: string;
}
export const StartCisSessionMessage = S.suspend(() =>
  S.Struct({ sessionToken: S.String }),
).annotate({
  identifier: "StartCisSessionMessage",
}) as any as S.Schema<StartCisSessionMessage>;
export interface StartCisSessionRequest {
  scanJobId: string;
  message: StartCisSessionMessage;
}
export const StartCisSessionRequest = S.suspend(() =>
  S.Struct({ scanJobId: S.String, message: StartCisSessionMessage }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/cissession/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCisSessionRequest",
}) as any as S.Schema<StartCisSessionRequest>;
export interface StartCisSessionResponse {}
export const StartCisSessionResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "StartCisSessionResponse",
}) as any as S.Schema<StartCisSessionResponse>;
export interface StartCodeSecurityScanRequest {
  clientToken?: string;
  resource: CodeSecurityResource;
}
export const StartCodeSecurityScanRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    resource: CodeSecurityResource,
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
).annotate({
  identifier: "StartCodeSecurityScanRequest",
}) as any as S.Schema<StartCodeSecurityScanRequest>;
export interface StartCodeSecurityScanResponse {
  scanId?: string;
  status?: CodeScanStatus;
}
export const StartCodeSecurityScanResponse = S.suspend(() =>
  S.Struct({
    scanId: S.optional(S.String),
    status: S.optional(CodeScanStatus),
  }),
).annotate({
  identifier: "StartCodeSecurityScanResponse",
}) as any as S.Schema<StartCodeSecurityScanResponse>;
export type StopCisSessionStatus =
  | "SUCCESS"
  | "FAILED"
  | "INTERRUPTED"
  | "UNSUPPORTED_OS"
  | (string & {});
export const StopCisSessionStatus = S.String;
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
export const StopCisMessageProgress = S.suspend(() =>
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
).annotate({
  identifier: "StopCisMessageProgress",
}) as any as S.Schema<StopCisMessageProgress>;
export interface ComputePlatform {
  vendor?: string;
  product?: string;
  version?: string;
}
export const ComputePlatform = S.suspend(() =>
  S.Struct({
    vendor: S.optional(S.String),
    product: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({
  identifier: "ComputePlatform",
}) as any as S.Schema<ComputePlatform>;
export interface StopCisSessionMessage {
  status: StopCisSessionStatus;
  reason?: string;
  progress: StopCisMessageProgress;
  computePlatform?: ComputePlatform;
  benchmarkVersion?: string;
  benchmarkProfile?: string;
}
export const StopCisSessionMessage = S.suspend(() =>
  S.Struct({
    status: StopCisSessionStatus,
    reason: S.optional(S.String),
    progress: StopCisMessageProgress,
    computePlatform: S.optional(ComputePlatform),
    benchmarkVersion: S.optional(S.String),
    benchmarkProfile: S.optional(S.String),
  }),
).annotate({
  identifier: "StopCisSessionMessage",
}) as any as S.Schema<StopCisSessionMessage>;
export interface StopCisSessionRequest {
  scanJobId: string;
  sessionToken: string;
  message: StopCisSessionMessage;
}
export const StopCisSessionRequest = S.suspend(() =>
  S.Struct({
    scanJobId: S.String,
    sessionToken: S.String,
    message: StopCisSessionMessage,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/cissession/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopCisSessionRequest",
}) as any as S.Schema<StopCisSessionRequest>;
export interface StopCisSessionResponse {}
export const StopCisSessionResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "StopCisSessionResponse",
}) as any as S.Schema<StopCisSessionResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateCisTargets {
  accountIds?: string[];
  targetResourceTags?: { [key: string]: string[] | undefined };
}
export const UpdateCisTargets = S.suspend(() =>
  S.Struct({
    accountIds: S.optional(TargetAccountList),
    targetResourceTags: S.optional(TargetResourceTags),
  }),
).annotate({
  identifier: "UpdateCisTargets",
}) as any as S.Schema<UpdateCisTargets>;
export interface UpdateCisScanConfigurationRequest {
  scanConfigurationArn: string;
  scanName?: string;
  securityLevel?: CisSecurityLevel;
  schedule?: Schedule;
  targets?: UpdateCisTargets;
}
export const UpdateCisScanConfigurationRequest = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.String,
    scanName: S.optional(S.String),
    securityLevel: S.optional(CisSecurityLevel),
    schedule: S.optional(Schedule),
    targets: S.optional(UpdateCisTargets),
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
).annotate({
  identifier: "UpdateCisScanConfigurationRequest",
}) as any as S.Schema<UpdateCisScanConfigurationRequest>;
export interface UpdateCisScanConfigurationResponse {
  scanConfigurationArn: string;
}
export const UpdateCisScanConfigurationResponse = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.String }),
).annotate({
  identifier: "UpdateCisScanConfigurationResponse",
}) as any as S.Schema<UpdateCisScanConfigurationResponse>;
export interface UpdateGitLabSelfManagedIntegrationDetail {
  authCode: string | redacted.Redacted<string>;
}
export const UpdateGitLabSelfManagedIntegrationDetail = S.suspend(() =>
  S.Struct({ authCode: SensitiveString }),
).annotate({
  identifier: "UpdateGitLabSelfManagedIntegrationDetail",
}) as any as S.Schema<UpdateGitLabSelfManagedIntegrationDetail>;
export interface UpdateGitHubIntegrationDetail {
  code: string | redacted.Redacted<string>;
  installationId: string;
}
export const UpdateGitHubIntegrationDetail = S.suspend(() =>
  S.Struct({ code: SensitiveString, installationId: S.String }),
).annotate({
  identifier: "UpdateGitHubIntegrationDetail",
}) as any as S.Schema<UpdateGitHubIntegrationDetail>;
export type UpdateIntegrationDetails =
  | {
      gitlabSelfManaged: UpdateGitLabSelfManagedIntegrationDetail;
      github?: never;
    }
  | { gitlabSelfManaged?: never; github: UpdateGitHubIntegrationDetail };
export const UpdateIntegrationDetails = S.Union([
  S.Struct({ gitlabSelfManaged: UpdateGitLabSelfManagedIntegrationDetail }),
  S.Struct({ github: UpdateGitHubIntegrationDetail }),
]);
export interface UpdateCodeSecurityIntegrationRequest {
  integrationArn: string;
  details: UpdateIntegrationDetails;
}
export const UpdateCodeSecurityIntegrationRequest = S.suspend(() =>
  S.Struct({
    integrationArn: S.String,
    details: UpdateIntegrationDetails,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/codesecurity/integration/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCodeSecurityIntegrationRequest",
}) as any as S.Schema<UpdateCodeSecurityIntegrationRequest>;
export interface UpdateCodeSecurityIntegrationResponse {
  integrationArn: string;
  status: IntegrationStatus;
}
export const UpdateCodeSecurityIntegrationResponse = S.suspend(() =>
  S.Struct({ integrationArn: S.String, status: IntegrationStatus }),
).annotate({
  identifier: "UpdateCodeSecurityIntegrationResponse",
}) as any as S.Schema<UpdateCodeSecurityIntegrationResponse>;
export interface UpdateCodeSecurityScanConfigurationRequest {
  scanConfigurationArn: string;
  configuration: CodeSecurityScanConfiguration;
}
export const UpdateCodeSecurityScanConfigurationRequest = S.suspend(() =>
  S.Struct({
    scanConfigurationArn: S.String,
    configuration: CodeSecurityScanConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/codesecurity/scan-configuration/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCodeSecurityScanConfigurationRequest",
}) as any as S.Schema<UpdateCodeSecurityScanConfigurationRequest>;
export interface UpdateCodeSecurityScanConfigurationResponse {
  scanConfigurationArn?: string;
}
export const UpdateCodeSecurityScanConfigurationResponse = S.suspend(() =>
  S.Struct({ scanConfigurationArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateCodeSecurityScanConfigurationResponse",
}) as any as S.Schema<UpdateCodeSecurityScanConfigurationResponse>;
export interface EcrConfiguration {
  rescanDuration: string;
  pullDateRescanDuration?: string;
  pullDateRescanMode?: string;
}
export const EcrConfiguration = S.suspend(() =>
  S.Struct({
    rescanDuration: S.String,
    pullDateRescanDuration: S.optional(S.String),
    pullDateRescanMode: S.optional(S.String),
  }),
).annotate({
  identifier: "EcrConfiguration",
}) as any as S.Schema<EcrConfiguration>;
export interface Ec2Configuration {
  scanMode: string;
}
export const Ec2Configuration = S.suspend(() =>
  S.Struct({ scanMode: S.String }),
).annotate({
  identifier: "Ec2Configuration",
}) as any as S.Schema<Ec2Configuration>;
export interface UpdateConfigurationRequest {
  ecrConfiguration?: EcrConfiguration;
  ec2Configuration?: Ec2Configuration;
}
export const UpdateConfigurationRequest = S.suspend(() =>
  S.Struct({
    ecrConfiguration: S.optional(EcrConfiguration),
    ec2Configuration: S.optional(Ec2Configuration),
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
).annotate({
  identifier: "UpdateConfigurationRequest",
}) as any as S.Schema<UpdateConfigurationRequest>;
export interface UpdateConfigurationResponse {}
export const UpdateConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateConfigurationResponse",
}) as any as S.Schema<UpdateConfigurationResponse>;
export interface UpdateEc2DeepInspectionConfigurationRequest {
  activateDeepInspection?: boolean;
  packagePaths?: string[];
}
export const UpdateEc2DeepInspectionConfigurationRequest = S.suspend(() =>
  S.Struct({
    activateDeepInspection: S.optional(S.Boolean),
    packagePaths: S.optional(PathList),
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
).annotate({
  identifier: "UpdateEc2DeepInspectionConfigurationRequest",
}) as any as S.Schema<UpdateEc2DeepInspectionConfigurationRequest>;
export interface UpdateEc2DeepInspectionConfigurationResponse {
  packagePaths?: string[];
  orgPackagePaths?: string[];
  status?: string;
  errorMessage?: string;
}
export const UpdateEc2DeepInspectionConfigurationResponse = S.suspend(() =>
  S.Struct({
    packagePaths: S.optional(PathList),
    orgPackagePaths: S.optional(PathList),
    status: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateEc2DeepInspectionConfigurationResponse",
}) as any as S.Schema<UpdateEc2DeepInspectionConfigurationResponse>;
export interface UpdateEncryptionKeyRequest {
  kmsKeyId: string;
  scanType: string;
  resourceType: string;
}
export const UpdateEncryptionKeyRequest = S.suspend(() =>
  S.Struct({
    kmsKeyId: S.String,
    scanType: S.String,
    resourceType: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/encryptionkey/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEncryptionKeyRequest",
}) as any as S.Schema<UpdateEncryptionKeyRequest>;
export interface UpdateEncryptionKeyResponse {}
export const UpdateEncryptionKeyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateEncryptionKeyResponse",
}) as any as S.Schema<UpdateEncryptionKeyResponse>;
export interface UpdateFilterRequest {
  action?: string;
  description?: string;
  filterCriteria?: FilterCriteria;
  name?: string;
  filterArn: string;
  reason?: string;
}
export const UpdateFilterRequest = S.suspend(() =>
  S.Struct({
    action: S.optional(S.String),
    description: S.optional(S.String),
    filterCriteria: S.optional(FilterCriteria),
    name: S.optional(S.String),
    filterArn: S.String,
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/filters/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFilterRequest",
}) as any as S.Schema<UpdateFilterRequest>;
export interface UpdateFilterResponse {
  arn: string;
}
export const UpdateFilterResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "UpdateFilterResponse",
}) as any as S.Schema<UpdateFilterResponse>;
export interface UpdateOrganizationConfigurationRequest {
  autoEnable: AutoEnable;
}
export const UpdateOrganizationConfigurationRequest = S.suspend(() =>
  S.Struct({ autoEnable: AutoEnable }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/organizationconfiguration/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOrganizationConfigurationRequest",
}) as any as S.Schema<UpdateOrganizationConfigurationRequest>;
export interface UpdateOrganizationConfigurationResponse {
  autoEnable: AutoEnable;
}
export const UpdateOrganizationConfigurationResponse = S.suspend(() =>
  S.Struct({ autoEnable: AutoEnable }),
).annotate({
  identifier: "UpdateOrganizationConfigurationResponse",
}) as any as S.Schema<UpdateOrganizationConfigurationResponse>;
export interface UpdateOrgEc2DeepInspectionConfigurationRequest {
  orgPackagePaths: string[];
}
export const UpdateOrgEc2DeepInspectionConfigurationRequest = S.suspend(() =>
  S.Struct({ orgPackagePaths: PathList }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/ec2deepinspectionconfiguration/org/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOrgEc2DeepInspectionConfigurationRequest",
}) as any as S.Schema<UpdateOrgEc2DeepInspectionConfigurationRequest>;
export interface UpdateOrgEc2DeepInspectionConfigurationResponse {}
export const UpdateOrgEc2DeepInspectionConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateOrgEc2DeepInspectionConfigurationResponse",
}) as any as S.Schema<UpdateOrgEc2DeepInspectionConfigurationResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String, resourceId: S.String },
).pipe(C.withQuotaError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: S.String,
    fields: S.optional(ValidationExceptionFields),
  },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
).pipe(C.withConflictError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { message: S.String },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Associates an Amazon Web Services account with an Amazon Inspector delegated administrator. An HTTP 200 response
 * indicates the association was successfully started, but doesn’t indicate whether it was
 * completed. You can check if the association completed by using ListMembers for multiple
 * accounts or GetMembers for a single account.
 */
export const associateMember: API.OperationMethod<
  AssociateMemberRequest,
  AssociateMemberResponse,
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateMemberRequest,
  output: AssociateMemberResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates multiple code repositories with an Amazon Inspector code security scan
 * configuration.
 */
export const batchAssociateCodeSecurityScanConfiguration: API.OperationMethod<
  BatchAssociateCodeSecurityScanConfigurationRequest,
  BatchAssociateCodeSecurityScanConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchAssociateCodeSecurityScanConfigurationRequest,
  output: BatchAssociateCodeSecurityScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates multiple code repositories from an Amazon Inspector code security scan
 * configuration.
 */
export const batchDisassociateCodeSecurityScanConfiguration: API.OperationMethod<
  BatchDisassociateCodeSecurityScanConfigurationRequest,
  BatchDisassociateCodeSecurityScanConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDisassociateCodeSecurityScanConfigurationRequest,
  output: BatchDisassociateCodeSecurityScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the Amazon Inspector status of multiple Amazon Web Services accounts within your environment.
 */
export const batchGetAccountStatus: API.OperationMethod<
  BatchGetAccountStatusRequest,
  BatchGetAccountStatusResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetAccountStatusRequest,
  output: BatchGetAccountStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves code snippets from findings that Amazon Inspector detected code vulnerabilities
 * in.
 */
export const batchGetCodeSnippet: API.OperationMethod<
  BatchGetCodeSnippetRequest,
  BatchGetCodeSnippetResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetCodeSnippetRequest,
  output: BatchGetCodeSnippetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets vulnerability details for findings.
 */
export const batchGetFindingDetails: API.OperationMethod<
  BatchGetFindingDetailsRequest,
  BatchGetFindingDetailsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetFindingDetailsRequest,
  output: BatchGetFindingDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets free trial status for multiple Amazon Web Services accounts.
 */
export const batchGetFreeTrialInfo: API.OperationMethod<
  BatchGetFreeTrialInfoRequest,
  BatchGetFreeTrialInfoResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetFreeTrialInfoRequest,
  output: BatchGetFreeTrialInfoResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves Amazon Inspector deep inspection activation status of multiple member accounts within
 * your organization. You must be the delegated administrator of an organization in Amazon Inspector to
 * use this API.
 */
export const batchGetMemberEc2DeepInspectionStatus: API.OperationMethod<
  BatchGetMemberEc2DeepInspectionStatusRequest,
  BatchGetMemberEc2DeepInspectionStatusResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetMemberEc2DeepInspectionStatusRequest,
  output: BatchGetMemberEc2DeepInspectionStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Activates or deactivates Amazon Inspector deep inspection for the provided member accounts in your
 * organization. You must be the delegated administrator of an organization in Amazon Inspector to use
 * this API.
 */
export const batchUpdateMemberEc2DeepInspectionStatus: API.OperationMethod<
  BatchUpdateMemberEc2DeepInspectionStatusRequest,
  BatchUpdateMemberEc2DeepInspectionStatusResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateMemberEc2DeepInspectionStatusRequest,
  output: BatchUpdateMemberEc2DeepInspectionStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Cancels the given findings report.
 */
export const cancelFindingsReport: API.OperationMethod<
  CancelFindingsReportRequest,
  CancelFindingsReportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelFindingsReportRequest,
  output: CancelFindingsReportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Cancels a software bill of materials (SBOM) report.
 */
export const cancelSbomExport: API.OperationMethod<
  CancelSbomExportRequest,
  CancelSbomExportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelSbomExportRequest,
  output: CancelSbomExportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a CIS scan configuration.
 */
export const createCisScanConfiguration: API.OperationMethod<
  CreateCisScanConfigurationRequest,
  CreateCisScanConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCisScanConfigurationRequest,
  output: CreateCisScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCodeSecurityIntegrationRequest,
  output: CreateCodeSecurityIntegrationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a scan configuration for code security scanning.
 */
export const createCodeSecurityScanConfiguration: API.OperationMethod<
  CreateCodeSecurityScanConfigurationRequest,
  CreateCodeSecurityScanConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCodeSecurityScanConfigurationRequest,
  output: CreateCodeSecurityScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a filter resource using specified filter criteria. When the filter action is set
 * to `SUPPRESS` this action creates a suppression rule.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFilterRequest,
  output: CreateFilterResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a finding report. By default only `ACTIVE` findings are returned in
 * the report. To see `SUPRESSED` or `CLOSED` findings you must specify
 * a value for the `findingStatus` filter criteria.
 */
export const createFindingsReport: API.OperationMethod<
  CreateFindingsReportRequest,
  CreateFindingsReportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFindingsReportRequest,
  output: CreateFindingsReportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a software bill of materials (SBOM) report.
 */
export const createSbomExport: API.OperationMethod<
  CreateSbomExportRequest,
  CreateSbomExportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSbomExportRequest,
  output: CreateSbomExportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a CIS scan configuration.
 */
export const deleteCisScanConfiguration: API.OperationMethod<
  DeleteCisScanConfigurationRequest,
  DeleteCisScanConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCisScanConfigurationRequest,
  output: DeleteCisScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a code security integration.
 */
export const deleteCodeSecurityIntegration: API.OperationMethod<
  DeleteCodeSecurityIntegrationRequest,
  DeleteCodeSecurityIntegrationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCodeSecurityIntegrationRequest,
  output: DeleteCodeSecurityIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a code security scan configuration.
 */
export const deleteCodeSecurityScanConfiguration: API.OperationMethod<
  DeleteCodeSecurityScanConfigurationRequest,
  DeleteCodeSecurityScanConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCodeSecurityScanConfigurationRequest,
  output: DeleteCodeSecurityScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a filter resource.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFilterRequest,
  output: DeleteFilterResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Describe Amazon Inspector configuration settings for an Amazon Web Services organization.
 */
export const describeOrganizationConfiguration: API.OperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeOrganizationConfigurationRequest,
  output: DescribeOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disables Amazon Inspector scans for one or more Amazon Web Services accounts. Disabling all scan types in an
 * account disables the Amazon Inspector service.
 */
export const disable: API.OperationMethod<
  DisableRequest,
  DisableResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableRequest,
  output: DisableResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disables the Amazon Inspector delegated administrator for your organization.
 */
export const disableDelegatedAdminAccount: API.OperationMethod<
  DisableDelegatedAdminAccountRequest,
  DisableDelegatedAdminAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableDelegatedAdminAccountRequest,
  output: DisableDelegatedAdminAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates a member account from an Amazon Inspector delegated administrator.
 */
export const disassociateMember: API.OperationMethod<
  DisassociateMemberRequest,
  DisassociateMemberResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateMemberRequest,
  output: DisassociateMemberResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Enables Amazon Inspector scans for one or more Amazon Web Services accounts.
 */
export const enable: API.OperationMethod<
  EnableRequest,
  EnableResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableRequest,
  output: EnableResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Enables the Amazon Inspector delegated administrator for your Organizations organization.
 */
export const enableDelegatedAdminAccount: API.OperationMethod<
  EnableDelegatedAdminAccountRequest,
  EnableDelegatedAdminAccountResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableDelegatedAdminAccountRequest,
  output: EnableDelegatedAdminAccountResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves a CIS scan report.
 */
export const getCisScanReport: API.OperationMethod<
  GetCisScanReportRequest,
  GetCisScanReportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCisScanReportRequest,
  output: GetCisScanReportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves CIS scan result details.
 */
export const getCisScanResultDetails: API.OperationMethod<
  GetCisScanResultDetailsRequest,
  GetCisScanResultDetailsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetCisScanResultDetailsRequest,
  ) => stream.Stream<
    GetCisScanResultDetailsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetCisScanResultDetailsRequest,
  ) => stream.Stream<
    CisScanResultDetails,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetCisScanResultDetailsRequest,
  output: GetCisScanResultDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scanResultDetails",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of clusters and metadata associated with an image.
 */
export const getClustersForImage: API.OperationMethod<
  GetClustersForImageRequest,
  GetClustersForImageResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetClustersForImageRequest,
  ) => stream.Stream<
    GetClustersForImageResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetClustersForImageRequest,
  ) => stream.Stream<
    ClusterInformation,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetClustersForImageRequest,
  output: GetClustersForImageResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "cluster",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Retrieves information about a code security integration.
 */
export const getCodeSecurityIntegration: API.OperationMethod<
  GetCodeSecurityIntegrationRequest,
  GetCodeSecurityIntegrationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCodeSecurityIntegrationRequest,
  output: GetCodeSecurityIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about a specific code security scan.
 */
export const getCodeSecurityScan: API.OperationMethod<
  GetCodeSecurityScanRequest,
  GetCodeSecurityScanResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCodeSecurityScanRequest,
  output: GetCodeSecurityScanResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about a code security scan configuration.
 */
export const getCodeSecurityScanConfiguration: API.OperationMethod<
  GetCodeSecurityScanConfigurationRequest,
  GetCodeSecurityScanConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCodeSecurityScanConfigurationRequest,
  output: GetCodeSecurityScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves setting configurations for Inspector scans.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Retrieves information about the Amazon Inspector delegated administrator for your
 * organization.
 */
export const getDelegatedAdminAccount: API.OperationMethod<
  GetDelegatedAdminAccountRequest,
  GetDelegatedAdminAccountResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDelegatedAdminAccountRequest,
  output: GetDelegatedAdminAccountResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the activation status of Amazon Inspector deep inspection and custom paths associated
 * with your account.
 */
export const getEc2DeepInspectionConfiguration: API.OperationMethod<
  GetEc2DeepInspectionConfigurationRequest,
  GetEc2DeepInspectionConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEc2DeepInspectionConfigurationRequest,
  output: GetEc2DeepInspectionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
/**
 * Gets an encryption key.
 */
export const getEncryptionKey: API.OperationMethod<
  GetEncryptionKeyRequest,
  GetEncryptionKeyResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEncryptionKeyRequest,
  output: GetEncryptionKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets the status of a findings report.
 */
export const getFindingsReportStatus: API.OperationMethod<
  GetFindingsReportStatusRequest,
  GetFindingsReportStatusResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFindingsReportStatusRequest,
  output: GetFindingsReportStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets member information for your organization.
 */
export const getMember: API.OperationMethod<
  GetMemberRequest,
  GetMemberResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMemberRequest,
  output: GetMemberResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets details of a software bill of materials (SBOM) report.
 */
export const getSbomExport: API.OperationMethod<
  GetSbomExportRequest,
  GetSbomExportResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSbomExportRequest,
  output: GetSbomExportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists the permissions an account has to configure Amazon Inspector.
 * If the account is a member account or standalone account with resources managed by an Organizations policy, the operation returns fewer permissions.
 */
export const listAccountPermissions: API.OperationMethod<
  ListAccountPermissionsRequest,
  ListAccountPermissionsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountPermissionsRequest,
  ) => stream.Stream<
    ListAccountPermissionsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountPermissionsRequest,
  ) => stream.Stream<
    Permission,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountPermissionsRequest,
  output: ListAccountPermissionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissions",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists CIS scan configurations.
 */
export const listCisScanConfigurations: API.OperationMethod<
  ListCisScanConfigurationsRequest,
  ListCisScanConfigurationsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCisScanConfigurationsRequest,
  ) => stream.Stream<
    ListCisScanConfigurationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCisScanConfigurationsRequest,
  ) => stream.Stream<
    CisScanConfiguration,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCisScanConfigurationsRequest,
  output: ListCisScanConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scanConfigurations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists scan results aggregated by checks.
 */
export const listCisScanResultsAggregatedByChecks: API.OperationMethod<
  ListCisScanResultsAggregatedByChecksRequest,
  ListCisScanResultsAggregatedByChecksResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCisScanResultsAggregatedByChecksRequest,
  ) => stream.Stream<
    ListCisScanResultsAggregatedByChecksResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCisScanResultsAggregatedByChecksRequest,
  ) => stream.Stream<
    CisCheckAggregation,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCisScanResultsAggregatedByChecksRequest,
  output: ListCisScanResultsAggregatedByChecksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "checkAggregations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists scan results aggregated by a target resource.
 */
export const listCisScanResultsAggregatedByTargetResource: API.OperationMethod<
  ListCisScanResultsAggregatedByTargetResourceRequest,
  ListCisScanResultsAggregatedByTargetResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCisScanResultsAggregatedByTargetResourceRequest,
  ) => stream.Stream<
    ListCisScanResultsAggregatedByTargetResourceResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCisScanResultsAggregatedByTargetResourceRequest,
  ) => stream.Stream<
    CisTargetResourceAggregation,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCisScanResultsAggregatedByTargetResourceRequest,
  output: ListCisScanResultsAggregatedByTargetResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targetResourceAggregations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a CIS scan list.
 */
export const listCisScans: API.OperationMethod<
  ListCisScansRequest,
  ListCisScansResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCisScansRequest,
  ) => stream.Stream<
    ListCisScansResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCisScansRequest,
  ) => stream.Stream<
    CisScan,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCisScansRequest,
  output: ListCisScansResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scans",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all code security integrations in your account.
 */
export const listCodeSecurityIntegrations: API.OperationMethod<
  ListCodeSecurityIntegrationsRequest,
  ListCodeSecurityIntegrationsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListCodeSecurityIntegrationsRequest,
  output: ListCodeSecurityIntegrationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists the associations between code repositories and Amazon Inspector code security scan
 * configurations.
 */
export const listCodeSecurityScanConfigurationAssociations: API.OperationMethod<
  ListCodeSecurityScanConfigurationAssociationsRequest,
  ListCodeSecurityScanConfigurationAssociationsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListCodeSecurityScanConfigurationAssociationsRequest,
  output: ListCodeSecurityScanConfigurationAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists all code security scan configurations in your account.
 */
export const listCodeSecurityScanConfigurations: API.OperationMethod<
  ListCodeSecurityScanConfigurationsRequest,
  ListCodeSecurityScanConfigurationsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListCodeSecurityScanConfigurationsRequest,
  output: ListCodeSecurityScanConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists coverage details for your environment.
 */
export const listCoverage: API.OperationMethod<
  ListCoverageRequest,
  ListCoverageResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCoverageRequest,
  ) => stream.Stream<
    ListCoverageResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCoverageRequest,
  ) => stream.Stream<
    CoveredResource,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoverageRequest,
  output: ListCoverageResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "coveredResources",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists Amazon Inspector coverage statistics for your environment.
 */
export const listCoverageStatistics: API.OperationMethod<
  ListCoverageStatisticsRequest,
  ListCoverageStatisticsResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCoverageStatisticsRequest,
  ) => stream.Stream<
    ListCoverageStatisticsResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCoverageStatisticsRequest,
  ) => stream.Stream<
    Counts,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCoverageStatisticsRequest,
  output: ListCoverageStatisticsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "countsByGroup",
  } as const,
}));
/**
 * Lists information about the Amazon Inspector delegated administrator of your organization.
 */
export const listDelegatedAdminAccounts: API.OperationMethod<
  ListDelegatedAdminAccountsRequest,
  ListDelegatedAdminAccountsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDelegatedAdminAccountsRequest,
  ) => stream.Stream<
    ListDelegatedAdminAccountsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDelegatedAdminAccountsRequest,
  ) => stream.Stream<
    DelegatedAdminAccount,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDelegatedAdminAccountsRequest,
  output: ListDelegatedAdminAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "delegatedAdminAccounts",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists the filters associated with your account.
 */
export const listFilters: API.OperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFiltersRequest,
  ) => stream.Stream<
    ListFiltersResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFiltersRequest,
  ) => stream.Stream<
    Filter,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFiltersRequest,
  output: ListFiltersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "filters",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists aggregated finding data for your environment based on specific criteria.
 */
export const listFindingAggregations: API.OperationMethod<
  ListFindingAggregationsRequest,
  ListFindingAggregationsResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFindingAggregationsRequest,
  ) => stream.Stream<
    ListFindingAggregationsResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFindingAggregationsRequest,
  ) => stream.Stream<
    AggregationResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFindingAggregationsRequest,
  output: ListFindingAggregationsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "responses",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists findings for your environment.
 */
export const listFindings: API.OperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFindingsRequest,
  ) => stream.Stream<
    ListFindingsResponse,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFindingsRequest,
  ) => stream.Stream<
    Finding,
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsRequest,
  output: ListFindingsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
}));
/**
 * List members associated with the Amazon Inspector delegated administrator for your
 * organization.
 */
export const listMembers: API.OperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMembersRequest,
  ) => stream.Stream<
    ListMembersResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMembersRequest,
  ) => stream.Stream<
    Member,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "members",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all tags attached to a given resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists the Amazon Inspector usage totals over the last 30 days.
 */
export const listUsageTotals: API.OperationMethod<
  ListUsageTotalsRequest,
  ListUsageTotalsResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListUsageTotalsRequest,
  ) => stream.Stream<
    ListUsageTotalsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListUsageTotalsRequest,
  ) => stream.Stream<
    UsageTotal,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsageTotalsRequest,
  output: ListUsageTotalsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "totals",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Resets an encryption key. After the key is reset your resources will be encrypted by an
 * Amazon Web Services owned key.
 */
export const resetEncryptionKey: API.OperationMethod<
  ResetEncryptionKeyRequest,
  ResetEncryptionKeyResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResetEncryptionKeyRequest,
  output: ResetEncryptionKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists Amazon Inspector coverage details for a specific vulnerability.
 */
export const searchVulnerabilities: API.OperationMethod<
  SearchVulnerabilitiesRequest,
  SearchVulnerabilitiesResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: SearchVulnerabilitiesRequest,
  ) => stream.Stream<
    SearchVulnerabilitiesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: SearchVulnerabilitiesRequest,
  ) => stream.Stream<
    Vulnerability,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchVulnerabilitiesRequest,
  output: SearchVulnerabilitiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vulnerabilities",
  } as const,
}));
/**
 * Sends a CIS session health. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to start a CIS scan session for the scan ID supplied by the service.
 */
export const sendCisSessionHealth: API.OperationMethod<
  SendCisSessionHealthRequest,
  SendCisSessionHealthResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendCisSessionHealthRequest,
  output: SendCisSessionHealthResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Sends a CIS session telemetry. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to start a CIS scan session for the scan ID supplied by the service.
 */
export const sendCisSessionTelemetry: API.OperationMethod<
  SendCisSessionTelemetryRequest,
  SendCisSessionTelemetryResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendCisSessionTelemetryRequest,
  output: SendCisSessionTelemetryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Starts a CIS session. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to start a CIS scan session for the scan ID supplied by the service.
 */
export const startCisSession: API.OperationMethod<
  StartCisSessionRequest,
  StartCisSessionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartCisSessionRequest,
  output: StartCisSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Initiates a code security scan on a specified repository.
 */
export const startCodeSecurityScan: API.OperationMethod<
  StartCodeSecurityScanRequest,
  StartCodeSecurityScanResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartCodeSecurityScanRequest,
  output: StartCodeSecurityScanResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Stops a CIS session. This API is used by the Amazon Inspector SSM plugin to
 * communicate with the Amazon Inspector service. The Amazon Inspector SSM plugin calls
 * this API to stop a CIS scan session for the scan ID supplied by the service.
 */
export const stopCisSession: API.OperationMethod<
  StopCisSessionRequest,
  StopCisSessionResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopCisSessionRequest,
  output: StopCisSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a CIS scan configuration.
 */
export const updateCisScanConfiguration: API.OperationMethod<
  UpdateCisScanConfigurationRequest,
  UpdateCisScanConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCisScanConfigurationRequest,
  output: UpdateCisScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCodeSecurityIntegrationRequest,
  output: UpdateCodeSecurityIntegrationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates an existing code security scan configuration.
 */
export const updateCodeSecurityScanConfiguration: API.OperationMethod<
  UpdateCodeSecurityScanConfigurationRequest,
  UpdateCodeSecurityScanConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCodeSecurityScanConfigurationRequest,
  output: UpdateCodeSecurityScanConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates setting configurations for your Amazon Inspector account. When you use this API as an Amazon Inspector
 * delegated administrator this updates the setting for all accounts you manage. Member
 * accounts in an organization cannot update this setting.
 */
export const updateConfiguration: API.OperationMethod<
  UpdateConfigurationRequest,
  UpdateConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConfigurationRequest,
  output: UpdateConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Activates, deactivates Amazon Inspector deep inspection, or updates custom paths for your account.
 */
export const updateEc2DeepInspectionConfiguration: API.OperationMethod<
  UpdateEc2DeepInspectionConfigurationRequest,
  UpdateEc2DeepInspectionConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEc2DeepInspectionConfigurationRequest,
  output: UpdateEc2DeepInspectionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates an encryption key. A `ResourceNotFoundException` means that an
 * Amazon Web Services owned key is being used for encryption.
 */
export const updateEncryptionKey: API.OperationMethod<
  UpdateEncryptionKeyRequest,
  UpdateEncryptionKeyResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEncryptionKeyRequest,
  output: UpdateEncryptionKeyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Specifies the action that is to be applied to the findings that match the filter.
 */
export const updateFilter: API.OperationMethod<
  UpdateFilterRequest,
  UpdateFilterResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFilterRequest,
  output: UpdateFilterResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the configurations for your Amazon Inspector organization.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOrganizationConfigurationRequest,
  output: UpdateOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the Amazon Inspector deep inspection custom paths for your organization. You must be an
 * Amazon Inspector delegated administrator to use this API.
 */
export const updateOrgEc2DeepInspectionConfiguration: API.OperationMethod<
  UpdateOrgEc2DeepInspectionConfigurationRequest,
  UpdateOrgEc2DeepInspectionConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOrgEc2DeepInspectionConfigurationRequest,
  output: UpdateOrgEc2DeepInspectionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
