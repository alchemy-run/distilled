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
  sdkId: "MigrationHubStrategy",
  serviceShapeName: "AWSMigrationHubStrategyRecommendation",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "migrationhub-strategy" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-02-19");
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
              `https://migrationhub-strategy-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://migrationhub-strategy-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://migrationhub-strategy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://migrationhub-strategy.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://migrationhub-strategy.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleLockClientException
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleLockClientException>()(
    "ServiceLinkedRoleLockClientException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationComponentId = string;
export interface GetApplicationComponentDetailsRequest {
  applicationComponentId: string;
}
export type ResourceId = string;
export type ResourceName = string;
export type TransformationToolName = string;
export type TranformationToolDescription = string;
export type TranformationToolInstallationLink = string;
export interface TransformationTool {
  name?: string;
  description?: string;
  tranformationToolInstallationLink?: string;
}
export type TargetDestination = string;
export type Strategy = string;
export interface RecommendationSet {
  transformationTool?: TransformationTool;
  targetDestination?: string;
  strategy?: string;
}
export type SrcCodeOrDbAnalysisStatus = string;
export type StatusMessage = string;
export type Severity = string;
export interface AntipatternSeveritySummary {
  severity?: string;
  count?: number;
}
export type ListAntipatternSeveritySummary = AntipatternSeveritySummary[];
export interface DatabaseConfigDetail {
  secretName?: string;
}
export interface SourceCodeRepository {
  repository?: string;
  branch?: string;
  versionControlType?: string;
  projectName?: string;
}
export type SourceCodeRepositories = SourceCodeRepository[];
export type AppType = string;
export type ResourceSubType = string;
export type InclusionStatus = string;
export type S3Bucket = string;
export type S3Key = string;
export interface S3Object {
  s3Bucket?: string;
  s3key?: string;
}
export type AntipatternReportStatus = string;
export type ServerId = string;
export type RuntimeAnalysisStatus = string;
export type AppUnitErrorCategory = string;
export interface AppUnitError {
  appUnitErrorCategory?: string;
}
export type AnalysisType = string;
export type AnalysisStatusUnion =
  | { runtimeAnalysisStatus: string; srcCodeOrDbAnalysisStatus?: never }
  | { runtimeAnalysisStatus?: never; srcCodeOrDbAnalysisStatus: string };
export type BinaryAnalyzerName = string;
export type RunTimeAnalyzerName = string;
export type SourceCodeAnalyzerName = string;
export type AnalyzerNameUnion =
  | { binaryAnalyzerName: string; runTimeAnalyzerName?: never; sourceCodeAnalyzerName?: never }
  | { binaryAnalyzerName?: never; runTimeAnalyzerName: string; sourceCodeAnalyzerName?: never }
  | { binaryAnalyzerName?: never; runTimeAnalyzerName?: never; sourceCodeAnalyzerName: string };
export interface AntipatternReportResult {
  analyzerName?: AnalyzerNameUnion;
  antiPatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
}
export type AntipatternReportResultList = AntipatternReportResult[];
export interface Result {
  analysisType?: string;
  analysisStatus?: AnalysisStatusUnion;
  statusMessage?: string;
  antipatternReportResultList?: AntipatternReportResult[];
}
export type ResultList = Result[];
export interface ApplicationComponentDetail {
  id?: string;
  name?: string;
  recommendationSet?: RecommendationSet;
  analysisStatus?: string;
  statusMessage?: string;
  listAntipatternSeveritySummary?: AntipatternSeveritySummary[];
  databaseConfigDetail?: DatabaseConfigDetail;
  sourceCodeRepositories?: SourceCodeRepository[];
  appType?: string;
  resourceSubType?: string;
  inclusionStatus?: string;
  antipatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
  osVersion?: string;
  osDriver?: string;
  lastAnalyzedTimestamp?: Date;
  associatedServerId?: string;
  moreServerAssociationExists?: boolean;
  runtimeStatus?: string;
  runtimeStatusMessage?: string;
  appUnitError?: AppUnitError;
  resultList?: Result[];
}
export interface AssociatedApplication {
  name?: string;
  id?: string;
}
export type AssociatedApplications = AssociatedApplication[];
export type AssociatedServerIDs = string[];
export interface GetApplicationComponentDetailsResponse {
  applicationComponentDetail?: ApplicationComponentDetail;
  associatedApplications?: AssociatedApplication[];
  moreApplicationResource?: boolean;
  associatedServerIds?: string[];
}
export interface GetApplicationComponentStrategiesRequest {
  applicationComponentId: string;
}
export type StrategyRecommendation = string;
export interface ApplicationComponentStrategy {
  recommendation?: RecommendationSet;
  status?: string;
  isPreferred?: boolean;
}
export type ApplicationComponentStrategies = ApplicationComponentStrategy[];
export interface GetApplicationComponentStrategiesResponse {
  applicationComponentStrategies?: ApplicationComponentStrategy[];
}
export type AsyncTaskId = string;
export interface GetAssessmentRequest {
  id: string;
}
export type AssessmentStatus = string;
export type AssessmentStatusMessage = string;
export interface DataCollectionDetails {
  status?: string;
  servers?: number;
  failed?: number;
  success?: number;
  inProgress?: number;
  startTime?: Date;
  completionTime?: Date;
  statusMessage?: string;
}
export type Condition = string;
export type AssessmentTargetValues = string[];
export interface AssessmentTarget {
  condition: string;
  name: string;
  values: string[];
}
export type AssessmentTargets = AssessmentTarget[];
export interface GetAssessmentResponse {
  id?: string;
  dataCollectionDetails?: DataCollectionDetails;
  assessmentTargets?: AssessmentTarget[];
}
export interface GetImportFileTaskRequest {
  id: string;
}
export type ImportFileTaskStatus = string;
export type ImportS3Bucket = string;
export type ImportS3Key = string;
export interface GetImportFileTaskResponse {
  id?: string;
  status?: string;
  startTime?: Date;
  inputS3Bucket?: string;
  inputS3Key?: string;
  statusReportS3Bucket?: string;
  statusReportS3Key?: string;
  completionTime?: Date;
  numberOfRecordsSuccess?: number;
  numberOfRecordsFailed?: number;
  importName?: string;
}
export interface GetLatestAssessmentIdRequest {}
export interface GetLatestAssessmentIdResponse {
  id?: string;
}
export interface GetPortfolioPreferencesRequest {}
export type BusinessGoalsInteger = number;
export interface BusinessGoals {
  speedOfMigration?: number;
  reduceOperationalOverheadWithManagedServices?: number;
  modernizeInfrastructureWithCloudNativeTechnologies?: number;
  licenseCostReduction?: number;
}
export interface PrioritizeBusinessGoals {
  businessGoals?: BusinessGoals;
}
export type AwsManagedTargetDestination = string;
export type AwsManagedTargetDestinations = string[];
export interface AwsManagedResources {
  targetDestination: string[];
}
export type SelfManageTargetDestination = string;
export type SelfManageTargetDestinations = string[];
export interface SelfManageResources {
  targetDestination: string[];
}
export type NoPreferenceTargetDestination = string;
export type NoPreferenceTargetDestinations = string[];
export interface NoManagementPreference {
  targetDestination: string[];
}
export type ManagementPreference =
  | { awsManagedResources: AwsManagedResources; selfManageResources?: never; noPreference?: never }
  | { awsManagedResources?: never; selfManageResources: SelfManageResources; noPreference?: never }
  | {
      awsManagedResources?: never;
      selfManageResources?: never;
      noPreference: NoManagementPreference;
    };
export interface ApplicationPreferences {
  managementPreference?: ManagementPreference;
}
export type DatabaseManagementPreference = string;
export type HeterogeneousTargetDatabaseEngine = string;
export type HeterogeneousTargetDatabaseEngines = string[];
export interface Heterogeneous {
  targetDatabaseEngine: string[];
}
export type HomogeneousTargetDatabaseEngine = string;
export type HomogeneousTargetDatabaseEngines = string[];
export interface Homogeneous {
  targetDatabaseEngine?: string[];
}
export type TargetDatabaseEngine = string;
export type TargetDatabaseEngines = string[];
export interface NoDatabaseMigrationPreference {
  targetDatabaseEngine: string[];
}
export type DatabaseMigrationPreference =
  | { heterogeneous: Heterogeneous; homogeneous?: never; noPreference?: never }
  | { heterogeneous?: never; homogeneous: Homogeneous; noPreference?: never }
  | { heterogeneous?: never; homogeneous?: never; noPreference: NoDatabaseMigrationPreference };
export interface DatabasePreferences {
  databaseManagementPreference?: string;
  databaseMigrationPreference?: DatabaseMigrationPreference;
}
export type ApplicationMode = string;
export interface GetPortfolioPreferencesResponse {
  prioritizeBusinessGoals?: PrioritizeBusinessGoals;
  applicationPreferences?: ApplicationPreferences;
  databasePreferences?: DatabasePreferences;
  applicationMode?: string;
}
export interface GetPortfolioSummaryRequest {}
export interface StrategySummary {
  strategy?: string;
  count?: number;
}
export type ListStrategySummary = StrategySummary[];
export interface ApplicationComponentSummary {
  appType?: string;
  count?: number;
}
export type ListApplicationComponentSummary = ApplicationComponentSummary[];
export type ServerOsType = string;
export interface ServerSummary {
  ServerOsType?: string;
  count?: number;
}
export type ListServerSummary = ServerSummary[];
export interface ApplicationComponentStatusSummary {
  srcCodeOrDbAnalysisStatus?: string;
  count?: number;
}
export type ListApplicationComponentStatusSummary = ApplicationComponentStatusSummary[];
export type RunTimeAssessmentStatus = string;
export interface ServerStatusSummary {
  runTimeAssessmentStatus?: string;
  count?: number;
}
export type ListServerStatusSummary = ServerStatusSummary[];
export interface AssessmentSummary {
  listServerStrategySummary?: StrategySummary[];
  listApplicationComponentStrategySummary?: StrategySummary[];
  listAntipatternSeveritySummary?: AntipatternSeveritySummary[];
  listApplicationComponentSummary?: ApplicationComponentSummary[];
  listServerSummary?: ServerSummary[];
  antipatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
  lastAnalyzedTimestamp?: Date;
  listApplicationComponentStatusSummary?: ApplicationComponentStatusSummary[];
  listServerStatusSummary?: ServerStatusSummary[];
}
export interface GetPortfolioSummaryResponse {
  assessmentSummary?: AssessmentSummary;
}
export type RecommendationTaskId = string;
export interface GetRecommendationReportDetailsRequest {
  id: string;
}
export type RecommendationReportStatus = string;
export type RecommendationReportStatusMessage = string;
export type RecommendationReportTimeStamp = Date;
export type S3Keys = string[];
export interface RecommendationReportDetails {
  status?: string;
  statusMessage?: string;
  startTime?: Date;
  completionTime?: Date;
  s3Bucket?: string;
  s3Keys?: string[];
}
export interface GetRecommendationReportDetailsResponse {
  id?: string;
  recommendationReportDetails?: RecommendationReportDetails;
}
export type NextToken = string;
export type MaxResult = number;
export interface GetServerDetailsRequest {
  serverId: string;
  nextToken?: string;
  maxResults?: number;
}
export type OSType = string;
export type OSVersion = string;
export interface OSInfo {
  type?: string;
  version?: string;
}
export type InterfaceName = string;
export type IPAddress = string;
export type MacAddress = string;
export type NetMask = string;
export interface NetworkInfo {
  interfaceName: string;
  ipAddress: string;
  macAddress: string;
  netMask: string;
}
export type NetworkInfoList = NetworkInfo[];
export interface SystemInfo {
  osInfo?: OSInfo;
  fileSystemType?: string;
  networkInfoList?: NetworkInfo[];
  cpuArchitecture?: string;
}
export type ServerErrorCategory = string;
export interface ServerError {
  serverErrorCategory?: string;
}
export interface ServerDetail {
  id?: string;
  name?: string;
  recommendationSet?: RecommendationSet;
  dataCollectionStatus?: string;
  statusMessage?: string;
  listAntipatternSeveritySummary?: AntipatternSeveritySummary[];
  systemInfo?: SystemInfo;
  applicationComponentStrategySummary?: StrategySummary[];
  antipatternReportS3Object?: S3Object;
  antipatternReportStatus?: string;
  antipatternReportStatusMessage?: string;
  serverType?: string;
  lastAnalyzedTimestamp?: Date;
  serverError?: ServerError;
}
export interface GetServerDetailsResponse {
  nextToken?: string;
  serverDetail?: ServerDetail;
  associatedApplications?: AssociatedApplication[];
}
export interface GetServerStrategiesRequest {
  serverId: string;
}
export interface ServerStrategy {
  recommendation?: RecommendationSet;
  status?: string;
  numberOfApplicationComponents?: number;
  isPreferred?: boolean;
}
export type ServerStrategies = ServerStrategy[];
export interface GetServerStrategiesResponse {
  serverStrategies?: ServerStrategy[];
}
export type SortOrder = string;
export interface ListAnalyzableServersRequest {
  sort?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AnalyzableServerSummary {
  hostname?: string;
  ipAddress?: string;
  source?: string;
  vmId?: string;
}
export type AnalyzableServerSummaryList = AnalyzableServerSummary[];
export interface ListAnalyzableServersResponse {
  analyzableServers?: AnalyzableServerSummary[];
  nextToken?: string;
}
export type ApplicationComponentCriteria = string;
export type GroupName = string;
export interface Group {
  name?: string;
  value?: string;
}
export type GroupIds = Group[];
export interface ListApplicationComponentsRequest {
  applicationComponentCriteria?: string;
  filterValue?: string;
  sort?: string;
  groupIdFilter?: Group[];
  nextToken?: string;
  maxResults?: number;
}
export type ApplicationComponentDetails = ApplicationComponentDetail[];
export interface ListApplicationComponentsResponse {
  applicationComponentInfos?: ApplicationComponentDetail[];
  nextToken?: string;
}
export interface ListCollectorsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type CollectorHealth = string;
export interface VcenterBasedRemoteInfo {
  vcenterConfigurationTimeStamp?: string;
  osType?: string;
}
export type VcenterBasedRemoteInfoList = VcenterBasedRemoteInfo[];
export type AuthType = string;
export interface IPAddressBasedRemoteInfo {
  ipAddressConfigurationTimeStamp?: string;
  authType?: string;
  osType?: string;
}
export type IPAddressBasedRemoteInfoList = IPAddressBasedRemoteInfo[];
export type VersionControlType = string;
export interface VersionControlInfo {
  versionControlType?: string;
  versionControlConfigurationTimeStamp?: string;
}
export type VersionControlInfoList = VersionControlInfo[];
export type PipelineType = string;
export interface PipelineInfo {
  pipelineType?: string;
  pipelineConfigurationTimeStamp?: string;
}
export type PipelineInfoList = PipelineInfo[];
export interface RemoteSourceCodeAnalysisServerInfo {
  remoteSourceCodeAnalysisServerConfigurationTimestamp?: string;
}
export interface ConfigurationSummary {
  vcenterBasedRemoteInfoList?: VcenterBasedRemoteInfo[];
  ipAddressBasedRemoteInfoList?: IPAddressBasedRemoteInfo[];
  versionControlInfoList?: VersionControlInfo[];
  pipelineInfoList?: PipelineInfo[];
  remoteSourceCodeAnalysisServerInfo?: RemoteSourceCodeAnalysisServerInfo;
}
export interface Collector {
  collectorId?: string;
  ipAddress?: string;
  hostName?: string;
  collectorHealth?: string;
  collectorVersion?: string;
  registeredTimeStamp?: string;
  lastActivityTimeStamp?: string;
  configurationSummary?: ConfigurationSummary;
}
export type Collectors = Collector[];
export interface ListCollectorsResponse {
  Collectors?: Collector[];
  nextToken?: string;
}
export interface ListImportFileTaskRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ImportFileTaskInformation {
  id?: string;
  status?: string;
  startTime?: Date;
  inputS3Bucket?: string;
  inputS3Key?: string;
  statusReportS3Bucket?: string;
  statusReportS3Key?: string;
  completionTime?: Date;
  numberOfRecordsSuccess?: number;
  numberOfRecordsFailed?: number;
  importName?: string;
}
export type ListImportFileTaskInformation = ImportFileTaskInformation[];
export interface ListImportFileTaskResponse {
  taskInfos?: ImportFileTaskInformation[];
  nextToken?: string;
}
export type ServerCriteria = string;
export interface ListServersRequest {
  serverCriteria?: string;
  filterValue?: string;
  sort?: string;
  groupIdFilter?: Group[];
  nextToken?: string;
  maxResults?: number;
}
export type ServerDetails = ServerDetail[];
export interface ListServersResponse {
  serverInfos?: ServerDetail[];
  nextToken?: string;
}
export interface PutPortfolioPreferencesRequest {
  prioritizeBusinessGoals?: PrioritizeBusinessGoals;
  applicationPreferences?: ApplicationPreferences;
  databasePreferences?: DatabasePreferences;
  applicationMode?: string;
}
export interface PutPortfolioPreferencesResponse {}
export type AssessmentDataSourceType = string;
export interface StartAssessmentRequest {
  s3bucketForAnalysisData?: string;
  s3bucketForReportData?: string;
  assessmentTargets?: AssessmentTarget[];
  assessmentDataSourceType?: string;
}
export interface StartAssessmentResponse {
  assessmentId?: string;
}
export type DataSourceType = string;
export interface StartImportFileTaskRequest {
  name: string;
  S3Bucket: string;
  s3key: string;
  dataSourceType?: string;
  groupId?: Group[];
  s3bucketForReportData?: string;
}
export interface StartImportFileTaskResponse {
  id?: string;
}
export type OutputFormat = string;
export interface StartRecommendationReportGenerationRequest {
  outputFormat?: string;
  groupIdFilter?: Group[];
}
export interface StartRecommendationReportGenerationResponse {
  id?: string;
}
export interface StopAssessmentRequest {
  assessmentId: string;
}
export interface StopAssessmentResponse {}
export interface StrategyOption {
  strategy?: string;
  toolName?: string;
  targetDestination?: string;
  isPreferred?: boolean;
}
export type VersionControl = string;
export type SourceVersion = string;
export type Location = string;
export type ProjectName = string;
export interface SourceCode {
  versionControl?: string;
  sourceVersion?: string;
  location?: string;
  projectName?: string;
}
export type SourceCodeList = SourceCode[];
export type SecretsManagerKey = string | redacted.Redacted<string>;
export interface UpdateApplicationComponentConfigRequest {
  applicationComponentId: string;
  inclusionStatus?: string;
  strategyOption?: StrategyOption;
  sourceCodeList?: SourceCode[];
  secretsManagerKey?: string | redacted.Redacted<string>;
  configureOnly?: boolean;
  appType?: string;
}
export interface UpdateApplicationComponentConfigResponse {}
export interface UpdateServerConfigRequest {
  serverId: string;
  strategyOption?: StrategyOption;
}
export interface UpdateServerConfigResponse {}
export type ErrorMessage = string;
export type GetApplicationComponentDetailsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about an application component.
 */
export const getApplicationComponentDetails: API.OperationMethod<
  GetApplicationComponentDetailsRequest,
  GetApplicationComponentDetailsResponse,
  GetApplicationComponentDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<GetApplicationComponentDetailsRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<GetApplicationComponentDetailsResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationComponentDetails",
}));

export type GetApplicationComponentStrategiesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a list of all the recommended strategies and tools for an application component
 * running on a server.
 */
export const getApplicationComponentStrategies: API.OperationMethod<
  GetApplicationComponentStrategiesRequest,
  GetApplicationComponentStrategiesResponse,
  GetApplicationComponentStrategiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetApplicationComponentStrategiesRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<GetApplicationComponentStrategiesResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationComponentStrategies",
}));

export type GetAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the status of an on-going assessment.
 */
export const getAssessment: API.OperationMethod<
  GetAssessmentRequest,
  GetAssessmentResponse,
  GetAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<GetAssessmentRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<GetAssessmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessment",
}));

export type GetImportFileTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details about a specific import task.
 */
export const getImportFileTask: API.OperationMethod<
  GetImportFileTaskRequest,
  GetImportFileTaskResponse,
  GetImportFileTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<GetImportFileTaskRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<GetImportFileTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportFileTask",
}));

export type GetLatestAssessmentIdError =
  | AccessDeniedException
  | DependencyException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the latest ID of a specific assessment task.
 */
export const getLatestAssessmentId: API.OperationMethod<
  GetLatestAssessmentIdRequest,
  GetLatestAssessmentIdResponse,
  GetLatestAssessmentIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<GetLatestAssessmentIdRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<GetLatestAssessmentIdResponse>,
  errors: [
    AccessDeniedException,
    DependencyException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLatestAssessmentId",
}));

export type GetPortfolioPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves your migration and modernization preferences.
 */
export const getPortfolioPreferences: API.OperationMethod<
  GetPortfolioPreferencesRequest,
  GetPortfolioPreferencesResponse,
  GetPortfolioPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<GetPortfolioPreferencesRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<GetPortfolioPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortfolioPreferences",
}));

export type GetPortfolioSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves overall summary including the number of servers to rehost and the overall
 * number of anti-patterns.
 */
export const getPortfolioSummary: API.OperationMethod<
  GetPortfolioSummaryRequest,
  GetPortfolioSummaryResponse,
  GetPortfolioSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetPortfolioSummaryRequest>,
  output: __S(154, __c9, 10) as any as S.Schema<GetPortfolioSummaryResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortfolioSummary",
}));

export type GetRecommendationReportDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about the specified recommendation report.
 */
export const getRecommendationReportDetails: API.OperationMethod<
  GetRecommendationReportDetailsRequest,
  GetRecommendationReportDetailsResponse,
  GetRecommendationReportDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetRecommendationReportDetailsRequest>,
  output: __S(178, __c11, 2) as any as S.Schema<GetRecommendationReportDetailsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendationReportDetails",
}));

export type GetServerDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specified server.
 */
export const getServerDetails: API.PaginatedOperationMethod<
  GetServerDetailsRequest,
  GetServerDetailsResponse,
  GetServerDetailsError,
  Credentials | HttpClient.HttpClient,
  AssociatedApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetServerDetailsRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<GetServerDetailsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServerDetails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedApplications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetServerStrategiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves recommended strategies and tools for the specified server.
 */
export const getServerStrategies: API.OperationMethod<
  GetServerStrategiesRequest,
  GetServerStrategiesResponse,
  GetServerStrategiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetServerStrategiesRequest>,
  output: __S(227, __c14, 3) as any as S.Schema<GetServerStrategiesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServerStrategies",
}));

export type ListAnalyzableServersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the servers fetched from customer vCenter using Strategy Recommendation Collector.
 */
export const listAnalyzableServers: API.PaginatedOperationMethod<
  ListAnalyzableServersRequest,
  ListAnalyzableServersResponse,
  ListAnalyzableServersError,
  Credentials | HttpClient.HttpClient,
  AnalyzableServerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListAnalyzableServersRequest>,
  output: __S(243, __c15, 3) as any as S.Schema<ListAnalyzableServersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalyzableServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analyzableServers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceLinkedRoleLockClientException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the application components (processes).
 */
export const listApplicationComponents: API.PaginatedOperationMethod<
  ListApplicationComponentsRequest,
  ListApplicationComponentsResponse,
  ListApplicationComponentsError,
  Credentials | HttpClient.HttpClient,
  ApplicationComponentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListApplicationComponentsRequest>,
  output: __S(258, __c16, 2) as any as S.Schema<ListApplicationComponentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceLinkedRoleLockClientException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applicationComponentInfos",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the installed collectors.
 */
export const listCollectors: API.PaginatedOperationMethod<
  ListCollectorsRequest,
  ListCollectorsResponse,
  ListCollectorsError,
  Credentials | HttpClient.HttpClient,
  Collector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListCollectorsRequest>,
  output: __S(301, __c18, 13) as any as S.Schema<ListCollectorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "Collectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportFileTaskError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all the imports performed.
 */
export const listImportFileTask: API.PaginatedOperationMethod<
  ListImportFileTaskRequest,
  ListImportFileTaskResponse,
  ListImportFileTaskError,
  Credentials | HttpClient.HttpClient,
  ImportFileTaskInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListImportFileTaskRequest>,
  output: __S(306, __c19, 2) as any as S.Schema<ListImportFileTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportFileTask",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskInfos",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the servers.
 */
export const listServers: API.PaginatedOperationMethod<
  ListServersRequest,
  ListServersResponse,
  ListServersError,
  Credentials | HttpClient.HttpClient,
  ServerDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListServersRequest>,
  output: __S(322, __c20, 2) as any as S.Schema<ListServersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serverInfos",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutPortfolioPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Saves the specified migration and modernization preferences.
 */
export const putPortfolioPreferences: API.OperationMethod<
  PutPortfolioPreferencesRequest,
  PutPortfolioPreferencesResponse,
  PutPortfolioPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<PutPortfolioPreferencesRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<PutPortfolioPreferencesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPortfolioPreferences",
}));

export type StartAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts the assessment of an on-premises environment.
 */
export const startAssessment: API.OperationMethod<
  StartAssessmentRequest,
  StartAssessmentResponse,
  StartAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<StartAssessmentRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<StartAssessmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssessment",
}));

export type StartImportFileTaskError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a file import.
 */
export const startImportFileTask: API.OperationMethod<
  StartImportFileTaskRequest,
  StartImportFileTaskResponse,
  StartImportFileTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<StartImportFileTaskRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<StartImportFileTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportFileTask",
}));

export type StartRecommendationReportGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts generating a recommendation report.
 */
export const startRecommendationReportGeneration: API.OperationMethod<
  StartRecommendationReportGenerationRequest,
  StartRecommendationReportGenerationResponse,
  StartRecommendationReportGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<StartRecommendationReportGenerationRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<StartRecommendationReportGenerationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommendationReportGeneration",
}));

export type StopAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the assessment of an on-premises environment.
 */
export const stopAssessment: API.OperationMethod<
  StopAssessmentRequest,
  StopAssessmentResponse,
  StopAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<StopAssessmentRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<StopAssessmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAssessment",
}));

export type UpdateApplicationComponentConfigError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an application component.
 */
export const updateApplicationComponentConfig: API.OperationMethod<
  UpdateApplicationComponentConfigRequest,
  UpdateApplicationComponentConfigResponse,
  UpdateApplicationComponentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(434, __c27, 2) as any as S.Schema<UpdateApplicationComponentConfigRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<UpdateApplicationComponentConfigResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationComponentConfig",
}));

export type UpdateServerConfigError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of the specified server.
 */
export const updateServerConfig: API.OperationMethod<
  UpdateServerConfigRequest,
  UpdateServerConfigResponse,
  UpdateServerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<UpdateServerConfigRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<UpdateServerConfigResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServerConfig",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationComponentId: S.String.pipe(T.HttpLabel("applicationComponentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/get-applicationcomponent-strategies/{applicationComponentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationComponentStrategiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendation: S.optional(__S(497, __c31, 1)),
          status: S.optional(S.String),
          isPreferred: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ApplicationComponentStrategy" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ applicationComponentStrategies: S.optional(__S(2, __c0, 2)) }),
      ).annotate({ identifier: "GetApplicationComponentStrategiesResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-assessment/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssessmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          servers: S.optional(S.Number),
          failed: S.optional(S.Number),
          success: S.optional(S.Number),
          inProgress: S.optional(S.Number),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataCollectionDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          dataCollectionDetails: S.optional(__S(17, __c1, 1)),
          assessmentTargets: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "GetAssessmentResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ condition: S.String, name: S.String, values: __S(512, __c32, 0) }),
      ).annotate({ identifier: "AssessmentTarget" });
    case 1:
      return S.Array(__S(32, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-import-file-task/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImportFileTaskRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          inputS3Bucket: S.optional(S.String),
          inputS3Key: S.optional(S.String),
          statusReportS3Bucket: S.optional(S.String),
          statusReportS3Key: S.optional(S.String),
          completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          numberOfRecordsSuccess: S.optional(S.Number),
          numberOfRecordsFailed: S.optional(S.Number),
          importName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetImportFileTaskResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-latest-assessment-id" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLatestAssessmentIdRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.optional(S.String) })).annotate({
        identifier: "GetLatestAssessmentIdResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-portfolio-preferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortfolioPreferencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          prioritizeBusinessGoals: S.optional(__S(129, __c8, 1)),
          applicationPreferences: S.optional(__S(132, __c8, 4)),
          databasePreferences: S.optional(__S(136, __c8, 8)),
          applicationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPortfolioPreferencesResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          speedOfMigration: S.optional(S.Number),
          reduceOperationalOverheadWithManagedServices: S.optional(S.Number),
          modernizeInfrastructureWithCloudNativeTechnologies: S.optional(S.Number),
          licenseCostReduction: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BusinessGoals" });
    case 1:
      return S.suspend(() => S.Struct({ businessGoals: S.optional(__S(128, __c8, 0)) })).annotate({
        identifier: "PrioritizeBusinessGoals",
      });
    case 2:
      return S.suspend(() => S.Struct({ targetDestination: __S(512, __c32, 0) })).annotate({
        identifier: "AwsManagedResources",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ awsManagedResources: __S(130, __c8, 2) }),
        /*@__PURE__*/ S.Struct({ selfManageResources: __S(130, __c8, 2) }),
        /*@__PURE__*/ S.Struct({ noPreference: __S(130, __c8, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({ managementPreference: S.optional(__S(131, __c8, 3)) }),
      ).annotate({ identifier: "ApplicationPreferences" });
    case 5:
      return S.suspend(() => S.Struct({ targetDatabaseEngine: __S(512, __c32, 0) })).annotate({
        identifier: "Heterogeneous",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ targetDatabaseEngine: S.optional(__S(512, __c32, 0)) }),
      ).annotate({ identifier: "Homogeneous" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ heterogeneous: __S(133, __c8, 5) }),
        /*@__PURE__*/ S.Struct({ homogeneous: __S(134, __c8, 6) }),
        /*@__PURE__*/ S.Struct({ noPreference: __S(133, __c8, 5) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          databaseManagementPreference: S.optional(S.String),
          databaseMigrationPreference: S.optional(__S(135, __c8, 7)),
        }),
      ).annotate({ identifier: "DatabasePreferences" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-portfolio-summary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortfolioSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ appType: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "ApplicationComponentSummary" });
    case 2:
      return S.Array(__S(145, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ServerOsType: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerSummary" });
    case 4:
      return S.Array(__S(147, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ srcCodeOrDbAnalysisStatus: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "ApplicationComponentStatusSummary" });
    case 6:
      return S.Array(__S(149, __c9, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ runTimeAssessmentStatus: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "ServerStatusSummary" });
    case 8:
      return S.Array(__S(151, __c9, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          listServerStrategySummary: S.optional(__S(161, __c10, 1)),
          listApplicationComponentStrategySummary: S.optional(__S(161, __c10, 1)),
          listAntipatternSeveritySummary: S.optional(__S(529, __c33, 1)),
          listApplicationComponentSummary: S.optional(__S(146, __c9, 2)),
          listServerSummary: S.optional(__S(148, __c9, 4)),
          antipatternReportS3Object: S.optional(__S(530, __c33, 2)),
          antipatternReportStatus: S.optional(S.String),
          antipatternReportStatusMessage: S.optional(S.String),
          lastAnalyzedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          listApplicationComponentStatusSummary: S.optional(__S(150, __c9, 6)),
          listServerStatusSummary: S.optional(__S(152, __c9, 8)),
        }),
      ).annotate({ identifier: "AssessmentSummary" });
    case 10:
      return S.suspend(() =>
        S.Struct({ assessmentSummary: S.optional(__S(153, __c9, 9)) }),
      ).annotate({ identifier: "GetPortfolioSummaryResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ strategy: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "StrategySummary" });
    case 1:
      return S.Array(__S(160, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-recommendation-report-details/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationReportDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          completionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          s3Bucket: S.optional(S.String),
          s3Keys: S.optional(__S(512, __c32, 0)),
        }),
      ).annotate({ identifier: "RecommendationReportDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          recommendationReportDetails: S.optional(__S(177, __c11, 1)),
        }),
      ).annotate({ identifier: "GetRecommendationReportDetailsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serverId: S.String.pipe(T.HttpLabel("serverId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-server-details/{serverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServerDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          serverDetail: S.optional(__S(213, __c13, 5)),
          associatedApplications: S.optional(__S(545, __c34, 1)),
        }),
      ).annotate({ identifier: "GetServerDetailsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), version: S.optional(S.String) }),
      ).annotate({ identifier: "OSInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          interfaceName: S.String,
          ipAddress: S.String,
          macAddress: S.String,
          netMask: S.String,
        }),
      ).annotate({ identifier: "NetworkInfo" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          osInfo: S.optional(__S(208, __c13, 0)),
          fileSystemType: S.optional(S.String),
          networkInfoList: S.optional(__S(210, __c13, 2)),
          cpuArchitecture: S.optional(S.String),
        }),
      ).annotate({ identifier: "SystemInfo" });
    case 4:
      return S.suspend(() => S.Struct({ serverErrorCategory: S.optional(S.String) })).annotate({
        identifier: "ServerError",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          recommendationSet: S.optional(__S(497, __c31, 1)),
          dataCollectionStatus: S.optional(S.String),
          statusMessage: S.optional(S.String),
          listAntipatternSeveritySummary: S.optional(__S(529, __c33, 1)),
          systemInfo: S.optional(__S(211, __c13, 3)),
          applicationComponentStrategySummary: S.optional(__S(161, __c10, 1)),
          antipatternReportS3Object: S.optional(__S(530, __c33, 2)),
          antipatternReportStatus: S.optional(S.String),
          antipatternReportStatusMessage: S.optional(S.String),
          serverType: S.optional(S.String),
          lastAnalyzedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          serverError: S.optional(__S(212, __c13, 4)),
        }),
      ).annotate({ identifier: "ServerDetail" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serverId: S.String.pipe(T.HttpLabel("serverId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/get-server-strategies/{serverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServerStrategiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendation: S.optional(__S(497, __c31, 1)),
          status: S.optional(S.String),
          numberOfApplicationComponents: S.optional(S.Number),
          isPreferred: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ServerStrategy" });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ serverStrategies: S.optional(__S(226, __c14, 2)) }),
      ).annotate({ identifier: "GetServerStrategiesResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sort: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-analyzable-servers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAnalyzableServersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          hostname: S.optional(S.String),
          ipAddress: S.optional(S.String),
          source: S.optional(S.String),
          vmId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalyzableServerSummary" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          analyzableServers: S.optional(__S(242, __c15, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAnalyzableServersResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationComponentCriteria: S.optional(S.String),
          filterValue: S.optional(S.String),
          sort: S.optional(S.String),
          groupIdFilter: S.optional(__S(273, __c17, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-applicationcomponents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListApplicationComponentsRequest" });
    case 1:
      return S.Array(__S(570, __c35, 10));
    case 2:
      return S.suspend(() =>
        S.Struct({
          applicationComponentInfos: S.optional(__S(257, __c16, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationComponentsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Group" });
    case 1:
      return S.Array(__S(272, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/list-collectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCollectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vcenterConfigurationTimeStamp: S.optional(S.String),
          osType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VcenterBasedRemoteInfo" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ipAddressConfigurationTimeStamp: S.optional(S.String),
          authType: S.optional(S.String),
          osType: S.optional(S.String),
        }),
      ).annotate({ identifier: "IPAddressBasedRemoteInfo" });
    case 4:
      return S.Array(__S(291, __c18, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          versionControlType: S.optional(S.String),
          versionControlConfigurationTimeStamp: S.optional(S.String),
        }),
      ).annotate({ identifier: "VersionControlInfo" });
    case 6:
      return S.Array(__S(293, __c18, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          pipelineType: S.optional(S.String),
          pipelineConfigurationTimeStamp: S.optional(S.String),
        }),
      ).annotate({ identifier: "PipelineInfo" });
    case 8:
      return S.Array(__S(295, __c18, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ remoteSourceCodeAnalysisServerConfigurationTimestamp: S.optional(S.String) }),
      ).annotate({ identifier: "RemoteSourceCodeAnalysisServerInfo" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          vcenterBasedRemoteInfoList: S.optional(__S(290, __c18, 2)),
          ipAddressBasedRemoteInfoList: S.optional(__S(292, __c18, 4)),
          versionControlInfoList: S.optional(__S(294, __c18, 6)),
          pipelineInfoList: S.optional(__S(296, __c18, 8)),
          remoteSourceCodeAnalysisServerInfo: S.optional(__S(297, __c18, 9)),
        }),
      ).annotate({ identifier: "ConfigurationSummary" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          collectorId: S.optional(S.String),
          ipAddress: S.optional(S.String),
          hostName: S.optional(S.String),
          collectorHealth: S.optional(S.String),
          collectorVersion: S.optional(S.String),
          registeredTimeStamp: S.optional(S.String),
          lastActivityTimeStamp: S.optional(S.String),
          configurationSummary: S.optional(__S(298, __c18, 10)),
        }),
      ).annotate({ identifier: "Collector" });
    case 12:
      return S.Array(__S(299, __c18, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ Collectors: S.optional(__S(300, __c18, 12)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCollectorsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-import-file-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImportFileTaskRequest" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ taskInfos: S.optional(__S(305, __c19, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportFileTaskResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serverCriteria: S.optional(S.String),
          filterValue: S.optional(S.String),
          sort: S.optional(S.String),
          groupIdFilter: S.optional(__S(273, __c17, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-servers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServersRequest" });
    case 1:
      return S.Array(__S(213, __c13, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({ serverInfos: S.optional(__S(321, __c20, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServersResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          prioritizeBusinessGoals: S.optional(__S(129, __c8, 1)),
          applicationPreferences: S.optional(__S(132, __c8, 4)),
          databasePreferences: S.optional(__S(136, __c8, 8)),
          applicationMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-portfolio-preferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutPortfolioPreferencesRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "PutPortfolioPreferencesResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3bucketForAnalysisData: S.optional(S.String),
          s3bucketForReportData: S.optional(S.String),
          assessmentTargets: S.optional(__S(33, __c2, 1)),
          assessmentDataSourceType: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/start-assessment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAssessmentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ assessmentId: S.optional(S.String) })).annotate({
        identifier: "StartAssessmentResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          S3Bucket: S.String,
          s3key: S.String,
          dataSourceType: S.optional(S.String),
          groupId: S.optional(__S(273, __c17, 1)),
          s3bucketForReportData: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-import-file-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartImportFileTaskRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          outputFormat: S.optional(S.String),
          groupIdFilter: S.optional(__S(273, __c17, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-recommendation-report-generation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRecommendationReportGenerationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/stop-assessment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAssessmentRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          versionControl: S.optional(S.String),
          sourceVersion: S.optional(S.String),
          location: S.optional(S.String),
          projectName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceCode" });
    case 1:
      return S.Array(__S(432, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          applicationComponentId: S.String,
          inclusionStatus: S.optional(S.String),
          strategyOption: S.optional(__S(448, __c28, 0)),
          sourceCodeList: S.optional(__S(433, __c27, 1)),
          secretsManagerKey: S.optional(SensitiveString),
          configureOnly: S.optional(S.Boolean),
          appType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-applicationcomponent-config/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationComponentConfigRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          strategy: S.optional(S.String),
          toolName: S.optional(S.String),
          targetDestination: S.optional(S.String),
          isPreferred: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StrategyOption" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serverId: S.String, strategyOption: S.optional(__S(448, __c28, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-server-config/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServerConfigRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationComponentId: S.String.pipe(T.HttpLabel("applicationComponentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/get-applicationcomponent-details/{applicationComponentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApplicationComponentDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationComponentDetail: S.optional(__S(570, __c35, 10)),
          associatedApplications: S.optional(__S(545, __c34, 1)),
          moreApplicationResource: S.optional(S.Boolean),
          associatedServerIds: S.optional(__S(512, __c32, 0)),
        }),
      ).annotate({ identifier: "GetApplicationComponentDetailsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          tranformationToolInstallationLink: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransformationTool" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transformationTool: S.optional(__S(496, __c31, 0)),
          targetDestination: S.optional(S.String),
          strategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationSet" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ severity: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "AntipatternSeveritySummary" });
    case 1:
      return S.Array(__S(528, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ s3Bucket: S.optional(S.String), s3key: S.optional(S.String) }),
      ).annotate({ identifier: "S3Object" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), id: S.optional(S.String) }),
      ).annotate({ identifier: "AssociatedApplication" });
    case 1:
      return S.Array(__S(544, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ secretName: S.optional(S.String) })).annotate({
        identifier: "DatabaseConfigDetail",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repository: S.optional(S.String),
          branch: S.optional(S.String),
          versionControlType: S.optional(S.String),
          projectName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceCodeRepository" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() => S.Struct({ appUnitErrorCategory: S.optional(S.String) })).annotate({
        identifier: "AppUnitError",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ runtimeAnalysisStatus: S.String }),
        /*@__PURE__*/ S.Struct({ srcCodeOrDbAnalysisStatus: S.String }),
      ]);
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ binaryAnalyzerName: S.String }),
        /*@__PURE__*/ S.Struct({ runTimeAnalyzerName: S.String }),
        /*@__PURE__*/ S.Struct({ sourceCodeAnalyzerName: S.String }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          analyzerName: S.optional(__S(565, __c35, 5)),
          antiPatternReportS3Object: S.optional(__S(530, __c33, 2)),
          antipatternReportStatus: S.optional(S.String),
          antipatternReportStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AntipatternReportResult" });
    case 7:
      return S.Array(__S(566, __c35, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          analysisType: S.optional(S.String),
          analysisStatus: S.optional(__S(564, __c35, 4)),
          statusMessage: S.optional(S.String),
          antipatternReportResultList: S.optional(__S(567, __c35, 7)),
        }),
      ).annotate({ identifier: "Result" });
    case 9:
      return S.Array(__S(568, __c35, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          recommendationSet: S.optional(__S(497, __c31, 1)),
          analysisStatus: S.optional(S.String),
          statusMessage: S.optional(S.String),
          listAntipatternSeveritySummary: S.optional(__S(529, __c33, 1)),
          databaseConfigDetail: S.optional(__S(560, __c35, 0)),
          sourceCodeRepositories: S.optional(__S(562, __c35, 2)),
          appType: S.optional(S.String),
          resourceSubType: S.optional(S.String),
          inclusionStatus: S.optional(S.String),
          antipatternReportS3Object: S.optional(__S(530, __c33, 2)),
          antipatternReportStatus: S.optional(S.String),
          antipatternReportStatusMessage: S.optional(S.String),
          osVersion: S.optional(S.String),
          osDriver: S.optional(S.String),
          lastAnalyzedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          associatedServerId: S.optional(S.String),
          moreServerAssociationExists: S.optional(S.Boolean),
          runtimeStatus: S.optional(S.String),
          runtimeStatusMessage: S.optional(S.String),
          appUnitError: S.optional(__S(563, __c35, 3)),
          resultList: S.optional(__S(569, __c35, 9)),
        }),
      ).annotate({ identifier: "ApplicationComponentDetail" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
