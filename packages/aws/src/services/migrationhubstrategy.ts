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
  sdkId: "MigrationHubStrategy",
  target: "AWSMigrationHubStrategyRecommendation",
  version: "2020-02-19",
  sigv4: "migrationhub-strategy",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://migrationhub-strategy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://migrationhub-strategy.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class DependencyException
  extends /*@__PURE__*/ TE.TaggedError("DependencyException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceLinkedRoleLockClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLinkedRoleLockClientException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
  | {
      binaryAnalyzerName: string;
      runTimeAnalyzerName?: never;
      sourceCodeAnalyzerName?: never;
    }
  | {
      binaryAnalyzerName?: never;
      runTimeAnalyzerName: string;
      sourceCodeAnalyzerName?: never;
    }
  | {
      binaryAnalyzerName?: never;
      runTimeAnalyzerName?: never;
      sourceCodeAnalyzerName: string;
    };
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
  | {
      awsManagedResources: AwsManagedResources;
      selfManageResources?: never;
      noPreference?: never;
    }
  | {
      awsManagedResources?: never;
      selfManageResources: SelfManageResources;
      noPreference?: never;
    }
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
  | {
      heterogeneous?: never;
      homogeneous?: never;
      noPreference: NoDatabaseMigrationPreference;
    };
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
export type ListApplicationComponentStatusSummary =
  ApplicationComponentStatusSummary[];
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
  descriptor: {
    service: svc,
    http: "GET /get-applicationcomponent-details/{applicationComponentId}",
    input: { applicationComponentId: 0 },
    output: { applicationComponentDetail: o_ApplicationComponentDetail },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationComponentDetails",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-applicationcomponent-strategies/{applicationComponentId}",
    input: { applicationComponentId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationComponentStrategies",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-assessment/{id}",
    input: { id: 0 },
    output: {
      dataCollectionDetails: { startTime: D.ts, completionTime: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-import-file-task/{id}",
    input: { id: 0 },
    output: { startTime: D.ts, completionTime: D.ts },
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
  operationName: "GetImportFileTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-latest-assessment-id",
    input: {},
  },
  errors: [
    AccessDeniedException,
    DependencyException,
    InternalServerException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLatestAssessmentId",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-portfolio-preferences",
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
  operationName: "GetPortfolioPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-portfolio-summary",
    input: {},
    output: { assessmentSummary: { lastAnalyzedTimestamp: D.ts } },
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortfolioSummary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-recommendation-report-details/{id}",
    input: { id: 0 },
    output: {
      recommendationReportDetails: { startTime: D.ts, completionTime: D.ts },
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
  operationName: "GetRecommendationReportDetails",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /get-server-details/{serverId}",
    input: {
      serverId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { serverDetail: o_ServerDetail },
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
  descriptor: {
    service: svc,
    http: "GET /get-server-strategies/{serverId}",
    input: { serverId: 0 },
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
  operationName: "GetServerStrategies",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /list-analyzable-servers",
    input: { sort: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-applicationcomponents",
    input: {
      applicationComponentCriteria: 0,
      filterValue: 0,
      sort: 0,
      groupIdFilter: D.list(i_Group),
      nextToken: 0,
      maxResults: 0,
    },
    output: { applicationComponentInfos: D.list(o_ApplicationComponentDetail) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /list-collectors",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /list-import-file-task",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { taskInfos: D.list({ startTime: D.ts, completionTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-servers",
    input: {
      serverCriteria: 0,
      filterValue: 0,
      sort: 0,
      groupIdFilter: D.list(i_Group),
      nextToken: 0,
      maxResults: 0,
    },
    output: { serverInfos: D.list(o_ServerDetail) },
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
  descriptor: {
    service: svc,
    http: "POST /put-portfolio-preferences",
    input: {
      prioritizeBusinessGoals: {
        businessGoals: {
          speedOfMigration: 0,
          reduceOperationalOverheadWithManagedServices: 0,
          modernizeInfrastructureWithCloudNativeTechnologies: 0,
          licenseCostReduction: 0,
        },
      },
      applicationPreferences: {
        managementPreference: {
          awsManagedResources: { targetDestination: 0 },
          selfManageResources: { targetDestination: 0 },
          noPreference: { targetDestination: 0 },
        },
      },
      databasePreferences: {
        databaseManagementPreference: 0,
        databaseMigrationPreference: {
          heterogeneous: { targetDatabaseEngine: 0 },
          homogeneous: { targetDatabaseEngine: 0 },
          noPreference: { targetDatabaseEngine: 0 },
        },
      },
      applicationMode: 0,
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
  operationName: "PutPortfolioPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-assessment",
    input: {
      s3bucketForAnalysisData: 0,
      s3bucketForReportData: 0,
      assessmentTargets: D.list({ condition: 0, name: 0, values: 0 }),
      assessmentDataSourceType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-import-file-task",
    input: {
      name: 0,
      S3Bucket: 0,
      s3key: 0,
      dataSourceType: 0,
      groupId: D.list(i_Group),
      s3bucketForReportData: 0,
    },
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
  operationName: "StartImportFileTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-recommendation-report-generation",
    input: { outputFormat: 0, groupIdFilter: D.list(i_Group) },
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
  operationName: "StartRecommendationReportGeneration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /stop-assessment",
    input: { assessmentId: 0 },
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
  operationName: "StopAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-applicationcomponent-config/",
    input: {
      applicationComponentId: 0,
      inclusionStatus: 0,
      strategyOption: i_StrategyOption,
      sourceCodeList: D.list({
        versionControl: 0,
        sourceVersion: 0,
        location: 0,
        projectName: 0,
      }),
      secretsManagerKey: 0,
      configureOnly: 0,
      appType: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationComponentConfig",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-server-config/",
    input: { serverId: 0, strategyOption: i_StrategyOption },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServerConfig",
})) as any;

const i_Group: D.LazyStruct = () => ({ name: 0, value: 0 });
const i_StrategyOption: D.LazyStruct = () => ({
  strategy: 0,
  toolName: 0,
  targetDestination: 0,
  isPreferred: 0,
});
const o_ApplicationComponentDetail: D.LazyStruct = () => ({
  lastAnalyzedTimestamp: D.ts,
});
const o_ServerDetail: D.LazyStruct = () => ({ lastAnalyzedTimestamp: D.ts });
