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
  sdkId: "Application Discovery Service",
  target: "AWSPoseidonService_V2015_11_01",
  version: "2015-11-01",
  sigv4: "discovery",
  protocol: awsJson1_1Protocol,
  xmlns: "http://ec2.amazon.com/awsposiedon/V2015_11_01/",
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
                `https://discovery-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://discovery-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://discovery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://discovery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AuthorizationErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationErrorException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ConflictErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictErrorException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class HomeRegionNotSetException
  extends /*@__PURE__*/ TE.TaggedError(
    "HomeRegionNotSetException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotPermittedException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServerInternalErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerInternalErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export type ApplicationId = string;
export type ConfigurationId = string;
export type ConfigurationIdList = string[];
export interface AssociateConfigurationItemsToApplicationRequest {
  applicationConfigurationId: string;
  configurationIds: string[];
}
export interface AssociateConfigurationItemsToApplicationResponse {}
export type AgentId = string;
export interface DeleteAgent {
  agentId: string;
  force?: boolean;
}
export type DeleteAgents = DeleteAgent[];
export interface BatchDeleteAgentsRequest {
  deleteAgents: DeleteAgent[];
}
export type DeleteAgentErrorCode =
  | "NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "AGENT_IN_USE"
  | (string & {});
export interface BatchDeleteAgentError {
  agentId: string;
  errorMessage: string;
  errorCode: DeleteAgentErrorCode;
}
export type BatchDeleteAgentErrors = BatchDeleteAgentError[];
export interface BatchDeleteAgentsResponse {
  errors?: BatchDeleteAgentError[];
}
export type ImportTaskIdentifier = string;
export type ToDeleteIdentifierList = string[];
export interface BatchDeleteImportDataRequest {
  importTaskIds: string[];
  deleteHistory?: boolean;
}
export type BatchDeleteImportDataErrorCode =
  | "NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "OVER_LIMIT"
  | (string & {});
export type BatchDeleteImportDataErrorDescription = string;
export interface BatchDeleteImportDataError_ {
  importTaskId?: string;
  errorCode?: BatchDeleteImportDataErrorCode;
  errorDescription?: string;
}
export type BatchDeleteImportDataErrorList = BatchDeleteImportDataError_[];
export interface BatchDeleteImportDataResponse {
  errors?: BatchDeleteImportDataError_[];
}
export type ApplicationName = string;
export type ApplicationDescription = string;
export type ApplicationWave = string;
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  wave?: string;
}
export interface CreateApplicationResponse {
  configurationId?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagSet = Tag[];
export interface CreateTagsRequest {
  configurationIds: string[];
  tags: Tag[];
}
export interface CreateTagsResponse {}
export type ApplicationIdsList = string[];
export interface DeleteApplicationsRequest {
  configurationIds: string[];
}
export interface DeleteApplicationsResponse {}
export interface DeleteTagsRequest {
  configurationIds: string[];
  tags?: Tag[];
}
export interface DeleteTagsResponse {}
export type AgentIds = string[];
export type FilterValue = string;
export type FilterValues = string[];
export type Condition = string;
export interface Filter {
  name: string;
  values: string[];
  condition: string;
}
export type Filters = Filter[];
export type NextToken = string;
export interface DescribeAgentsRequest {
  agentIds?: string[];
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export interface AgentNetworkInfo {
  ipAddress?: string;
  macAddress?: string;
}
export type AgentNetworkInfoList = AgentNetworkInfo[];
export type AgentStatus =
  | "HEALTHY"
  | "UNHEALTHY"
  | "RUNNING"
  | "UNKNOWN"
  | "BLACKLISTED"
  | "SHUTDOWN"
  | (string & {});
export interface AgentInfo {
  agentId?: string;
  hostName?: string;
  agentNetworkInfoList?: AgentNetworkInfo[];
  connectorId?: string;
  version?: string;
  health?: AgentStatus;
  lastHealthPingTime?: string;
  collectionStatus?: string;
  agentType?: string;
  registeredTime?: string;
}
export type AgentsInfo = AgentInfo[];
export interface DescribeAgentsResponse {
  agentsInfo?: AgentInfo[];
  nextToken?: string;
}
export type UUID = string;
export interface DescribeBatchDeleteConfigurationTaskRequest {
  taskId: string;
}
export type BatchDeleteConfigurationTaskStatus =
  | "INITIALIZING"
  | "VALIDATING"
  | "DELETING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type DeletionConfigurationItemType = "SERVER" | (string & {});
export type ErrorStatusCode = number;
export type ErrorMessage = string;
export interface FailedConfiguration {
  configurationId?: string;
  errorStatusCode?: number;
  errorMessage?: string;
}
export type FailedConfigurationList = FailedConfiguration[];
export type WarningCode = number;
export type WarningText = string;
export interface DeletionWarning {
  configurationId?: string;
  warningCode?: number;
  warningText?: string;
}
export type DeletionWarningsList = DeletionWarning[];
export interface BatchDeleteConfigurationTask {
  taskId?: string;
  status?: BatchDeleteConfigurationTaskStatus;
  startTime?: Date;
  endTime?: Date;
  configurationType?: DeletionConfigurationItemType;
  requestedConfigurations?: string[];
  deletedConfigurations?: string[];
  failedConfigurations?: FailedConfiguration[];
  deletionWarnings?: DeletionWarning[];
}
export interface DescribeBatchDeleteConfigurationTaskResponse {
  task?: BatchDeleteConfigurationTask;
}
export interface DescribeConfigurationsRequest {
  configurationIds: string[];
}
export type DescribeConfigurationsAttribute = {
  [key: string]: string | undefined;
};
export type DescribeConfigurationsAttributes = {
  [key: string]: string | undefined;
}[];
export interface DescribeConfigurationsResponse {
  configurations?: { [key: string]: string | undefined }[];
}
export type ConfigurationsExportId = string;
export type ContinuousExportIds = string[];
export type DescribeContinuousExportsMaxResults = number;
export interface DescribeContinuousExportsRequest {
  exportIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type ContinuousExportStatus =
  | "START_IN_PROGRESS"
  | "START_FAILED"
  | "ACTIVE"
  | "ERROR"
  | "STOP_IN_PROGRESS"
  | "STOP_FAILED"
  | "INACTIVE"
  | (string & {});
export type StringMax255 = string;
export type S3Bucket = string;
export type DataSource = "AGENT" | (string & {});
export type DatabaseName = string;
export type SchemaStorageConfig = { [key: string]: string | undefined };
export interface ContinuousExportDescription {
  exportId?: string;
  status?: ContinuousExportStatus;
  statusDetail?: string;
  s3Bucket?: string;
  startTime?: Date;
  stopTime?: Date;
  dataSource?: DataSource;
  schemaStorageConfig?: { [key: string]: string | undefined };
}
export type ContinuousExportDescriptions = ContinuousExportDescription[];
export interface DescribeContinuousExportsResponse {
  descriptions?: ContinuousExportDescription[];
  nextToken?: string;
}
export type ExportIds = string[];
export interface DescribeExportConfigurationsRequest {
  exportIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type ExportStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "IN_PROGRESS"
  | (string & {});
export type ExportStatusMessage = string;
export type ConfigurationsDownloadUrl = string;
export type ExportRequestTime = Date;
export interface ExportInfo {
  exportId: string;
  exportStatus: ExportStatus;
  statusMessage: string;
  configurationsDownloadUrl?: string;
  exportRequestTime: Date;
  isTruncated?: boolean;
  requestedStartTime?: Date;
  requestedEndTime?: Date;
}
export type ExportsInfo = ExportInfo[];
export interface DescribeExportConfigurationsResponse {
  exportsInfo?: ExportInfo[];
  nextToken?: string;
}
export type FilterName = string;
export interface ExportFilter {
  name: string;
  values: string[];
  condition: string;
}
export type ExportFilters = ExportFilter[];
export interface DescribeExportTasksRequest {
  exportIds?: string[];
  filters?: ExportFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface DescribeExportTasksResponse {
  exportsInfo?: ExportInfo[];
  nextToken?: string;
}
export type ImportTaskFilterName =
  | "IMPORT_TASK_ID"
  | "STATUS"
  | "NAME"
  | "FILE_CLASSIFICATION"
  | (string & {});
export type ImportTaskFilterValue = string;
export type ImportTaskFilterValueList = string[];
export interface ImportTaskFilter {
  name?: ImportTaskFilterName;
  values?: string[];
}
export type DescribeImportTasksFilterList = ImportTaskFilter[];
export type DescribeImportTasksMaxResults = number;
export interface DescribeImportTasksRequest {
  filters?: ImportTaskFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type ClientRequestToken = string;
export type ImportTaskName = string;
export type ImportURL = string;
export type ImportStatus =
  | "IMPORT_IN_PROGRESS"
  | "IMPORT_COMPLETE"
  | "IMPORT_COMPLETE_WITH_ERRORS"
  | "IMPORT_FAILED"
  | "IMPORT_FAILED_SERVER_LIMIT_EXCEEDED"
  | "IMPORT_FAILED_RECORD_LIMIT_EXCEEDED"
  | "IMPORT_FAILED_UNSUPPORTED_FILE_TYPE"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "DELETE_FAILED_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | (string & {});
export type FileClassification =
  | "MODELIZEIT_EXPORT"
  | "RVTOOLS_EXPORT"
  | "VMWARE_NSX_EXPORT"
  | "IMPORT_TEMPLATE"
  | (string & {});
export type S3PresignedUrl = string;
export interface ImportTask {
  importTaskId?: string;
  clientRequestToken?: string;
  name?: string;
  importUrl?: string;
  status?: ImportStatus;
  importRequestTime?: Date;
  importCompletionTime?: Date;
  importDeletedTime?: Date;
  fileClassification?: FileClassification;
  serverImportSuccess?: number;
  serverImportFailure?: number;
  applicationImportSuccess?: number;
  applicationImportFailure?: number;
  errorsAndFailedEntriesZip?: string;
}
export type ImportTaskList = ImportTask[];
export interface DescribeImportTasksResponse {
  nextToken?: string;
  tasks?: ImportTask[];
}
export interface TagFilter {
  name: string;
  values: string[];
}
export type TagFilters = TagFilter[];
export interface DescribeTagsRequest {
  filters?: TagFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type ConfigurationItemType =
  | "SERVER"
  | "PROCESS"
  | "CONNECTION"
  | "APPLICATION"
  | (string & {});
export interface ConfigurationTag {
  configurationType?: ConfigurationItemType;
  configurationId?: string;
  key?: string;
  value?: string;
  timeOfCreation?: Date;
}
export type ConfigurationTagSet = ConfigurationTag[];
export interface DescribeTagsResponse {
  tags?: ConfigurationTag[];
  nextToken?: string;
}
export interface DisassociateConfigurationItemsFromApplicationRequest {
  applicationConfigurationId: string;
  configurationIds: string[];
}
export interface DisassociateConfigurationItemsFromApplicationResponse {}
export interface ExportConfigurationsRequest {}
export interface ExportConfigurationsResponse {
  exportId?: string;
}
export interface GetDiscoverySummaryRequest {}
export interface CustomerAgentInfo {
  activeAgents: number;
  healthyAgents: number;
  blackListedAgents: number;
  shutdownAgents: number;
  unhealthyAgents: number;
  totalAgents: number;
  unknownAgents: number;
}
export interface CustomerConnectorInfo {
  activeConnectors: number;
  healthyConnectors: number;
  blackListedConnectors: number;
  shutdownConnectors: number;
  unhealthyConnectors: number;
  totalConnectors: number;
  unknownConnectors: number;
}
export interface CustomerMeCollectorInfo {
  activeMeCollectors: number;
  healthyMeCollectors: number;
  denyListedMeCollectors: number;
  shutdownMeCollectors: number;
  unhealthyMeCollectors: number;
  totalMeCollectors: number;
  unknownMeCollectors: number;
}
export interface CustomerAgentlessCollectorInfo {
  activeAgentlessCollectors: number;
  healthyAgentlessCollectors: number;
  denyListedAgentlessCollectors: number;
  shutdownAgentlessCollectors: number;
  unhealthyAgentlessCollectors: number;
  totalAgentlessCollectors: number;
  unknownAgentlessCollectors: number;
}
export interface GetDiscoverySummaryResponse {
  servers?: number;
  applications?: number;
  serversMappedToApplications?: number;
  serversMappedtoTags?: number;
  agentSummary?: CustomerAgentInfo;
  connectorSummary?: CustomerConnectorInfo;
  meCollectorSummary?: CustomerMeCollectorInfo;
  agentlessCollectorSummary?: CustomerAgentlessCollectorInfo;
}
export type OrderByElementFieldName = string;
export type OrderString = "ASC" | "DESC" | (string & {});
export interface OrderByElement {
  fieldName: string;
  sortOrder?: OrderString;
}
export type OrderByList = OrderByElement[];
export interface ListConfigurationsRequest {
  configurationType: ConfigurationItemType;
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
  orderBy?: OrderByElement[];
}
export type Configuration = { [key: string]: string | undefined };
export type Configurations = { [key: string]: string | undefined }[];
export interface ListConfigurationsResponse {
  configurations?: { [key: string]: string | undefined }[];
  nextToken?: string;
}
export interface ListServerNeighborsRequest {
  configurationId: string;
  portInformationNeeded?: boolean;
  neighborConfigurationIds?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type BoxedInteger = number;
export interface NeighborConnectionDetail {
  sourceServerId: string;
  destinationServerId: string;
  destinationPort?: number;
  transportProtocol?: string;
  connectionsCount: number;
}
export type NeighborDetailsList = NeighborConnectionDetail[];
export interface ListServerNeighborsResponse {
  neighbors: NeighborConnectionDetail[];
  nextToken?: string;
  knownDependencyCount?: number;
}
export interface StartBatchDeleteConfigurationTaskRequest {
  configurationType: DeletionConfigurationItemType;
  configurationIds: string[];
}
export interface StartBatchDeleteConfigurationTaskResponse {
  taskId?: string;
}
export interface StartContinuousExportRequest {}
export interface StartContinuousExportResponse {
  exportId?: string;
  s3Bucket?: string;
  startTime?: Date;
  dataSource?: DataSource;
  schemaStorageConfig?: { [key: string]: string | undefined };
}
export interface StartDataCollectionByAgentIdsRequest {
  agentIds: string[];
}
export interface AgentConfigurationStatus {
  agentId?: string;
  operationSucceeded?: boolean;
  description?: string;
}
export type AgentConfigurationStatusList = AgentConfigurationStatus[];
export interface StartDataCollectionByAgentIdsResponse {
  agentsConfigurationStatus?: AgentConfigurationStatus[];
}
export type ExportDataFormat = "CSV" | (string & {});
export type ExportDataFormats = ExportDataFormat[];
export type ExportEnabled = boolean;
export type UsageMetricBasisName = string;
export type UsageMetricPercentageAdjust = number;
export interface UsageMetricBasis {
  name?: string;
  percentageAdjust?: number;
}
export type Tenancy = "DEDICATED" | "SHARED" | (string & {});
export type EC2InstanceType = string;
export type ExcludedInstanceTypes = string[];
export type UserPreferredRegion = string;
export type PurchasingOption =
  | "ALL_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "NO_UPFRONT"
  | (string & {});
export type OfferingClass = "STANDARD" | "CONVERTIBLE" | (string & {});
export type TermLength = "ONE_YEAR" | "THREE_YEAR" | (string & {});
export interface ReservedInstanceOptions {
  purchasingOption: PurchasingOption;
  offeringClass: OfferingClass;
  termLength: TermLength;
}
export interface Ec2RecommendationsExportPreferences {
  enabled?: boolean;
  cpuPerformanceMetricBasis?: UsageMetricBasis;
  ramPerformanceMetricBasis?: UsageMetricBasis;
  tenancy?: Tenancy;
  excludedInstanceTypes?: string[];
  preferredRegion?: string;
  reservedInstanceOptions?: ReservedInstanceOptions;
}
export type ExportPreferences = {
  ec2RecommendationsPreferences: Ec2RecommendationsExportPreferences;
};
export interface StartExportTaskRequest {
  exportDataFormat?: ExportDataFormat[];
  filters?: ExportFilter[];
  startTime?: Date;
  endTime?: Date;
  preferences?: ExportPreferences;
}
export interface StartExportTaskResponse {
  exportId?: string;
}
export interface StartImportTaskRequest {
  clientRequestToken?: string;
  name: string;
  importUrl: string;
}
export interface StartImportTaskResponse {
  task?: ImportTask;
}
export interface StopContinuousExportRequest {
  exportId: string;
}
export interface StopContinuousExportResponse {
  startTime?: Date;
  stopTime?: Date;
}
export interface StopDataCollectionByAgentIdsRequest {
  agentIds: string[];
}
export interface StopDataCollectionByAgentIdsResponse {
  agentsConfigurationStatus?: AgentConfigurationStatus[];
}
export interface UpdateApplicationRequest {
  configurationId: string;
  name?: string;
  description?: string;
  wave?: string;
}
export interface UpdateApplicationResponse {}
export type Message = string;
export type AssociateConfigurationItemsToApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Associates one or more configuration items with an application.
 */
export const associateConfigurationItemsToApplication: API.OperationMethod<
  AssociateConfigurationItemsToApplicationRequest,
  AssociateConfigurationItemsToApplicationResponse,
  AssociateConfigurationItemsToApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationConfigurationId: 0, configurationIds: 0 },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateConfigurationItemsToApplication",
})) as any;

export type BatchDeleteAgentsError =
  | AuthorizationErrorException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes one or more agents or collectors as specified by ID. Deleting an agent or collector does not
 * delete the previously discovered data.
 * To delete the data collected, use `StartBatchDeleteConfigurationTask`.
 */
export const batchDeleteAgents: API.OperationMethod<
  BatchDeleteAgentsRequest,
  BatchDeleteAgentsResponse,
  BatchDeleteAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { deleteAgents: D.list({ agentId: 0, force: 0 }) },
  },
  errors: [
    AuthorizationErrorException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAgents",
})) as any;

export type BatchDeleteImportDataError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes one or more import tasks, each identified by their import ID. Each import task has
 * a number of records that can identify servers or applications.
 *
 * Amazon Web Services Application Discovery Service has built-in matching logic that will identify when
 * discovered servers match existing entries that you've previously discovered, the information
 * for the already-existing discovered server is updated. When you delete an import task that
 * contains records that were used to match, the information in those matched records that comes
 * from the deleted records will also be deleted.
 */
export const batchDeleteImportData: API.OperationMethod<
  BatchDeleteImportDataRequest,
  BatchDeleteImportDataResponse,
  BatchDeleteImportDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { importTaskIds: 0, deleteHistory: 0 } },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteImportData",
})) as any;

export type CreateApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Creates an application with the given name and description.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0, description: 0, wave: 0 } },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateTagsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Creates one or more tags for configuration items. Tags are metadata that help you
 * categorize IT assets. This API accepts a list of multiple configuration items.
 *
 * Do not store sensitive information (like personal data) in tags.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { configurationIds: 0, tags: D.list(i_Tag) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
})) as any;

export type DeleteApplicationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes a list of applications and their associations with configuration
 * items.
 */
export const deleteApplications: API.OperationMethod<
  DeleteApplicationsRequest,
  DeleteApplicationsResponse,
  DeleteApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { configurationIds: 0 } },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplications",
})) as any;

export type DeleteTagsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deletes the association between configuration items and one or more tags. This API
 * accepts a list of multiple configuration items.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { configurationIds: 0, tags: D.list(i_Tag) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

export type DescribeAgentsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Lists agents or collectors as specified by ID or other filters. All agents/collectors
 * associated with your user can be listed if you call `DescribeAgents` as is
 * without passing any parameters.
 */
export const describeAgents: API.PaginatedOperationMethod<
  DescribeAgentsRequest,
  DescribeAgentsResponse,
  DescribeAgentsError,
  Credentials | HttpClient.HttpClient,
  AgentInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      agentIds: 0,
      filters: D.list(i_Filter),
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentsInfo",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeBatchDeleteConfigurationTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Takes a unique deletion task identifier as input and returns metadata about a configuration deletion task.
 */
export const describeBatchDeleteConfigurationTask: API.OperationMethod<
  DescribeBatchDeleteConfigurationTaskRequest,
  DescribeBatchDeleteConfigurationTaskResponse,
  DescribeBatchDeleteConfigurationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { taskId: 0 },
    output: { task: { startTime: D.ts, endTime: D.ts } },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchDeleteConfigurationTask",
})) as any;

export type DescribeConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves attributes for a list of configuration item IDs.
 *
 * All of the supplied IDs must be for the same asset type from one of the
 * following:
 *
 * - server
 *
 * - application
 *
 * - process
 *
 * - connection
 *
 * Output fields are specific to the asset type specified. For example, the output for a
 * *server* configuration item includes a list of attributes about the
 * server, such as host name, operating system, number of network cards, etc.
 *
 * For a complete list of outputs for each asset type, see Using the DescribeConfigurations Action in the Amazon Web Services Application
 * Discovery Service User Guide.
 */
export const describeConfigurations: API.OperationMethod<
  DescribeConfigurationsRequest,
  DescribeConfigurationsResponse,
  DescribeConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { configurationIds: 0 } },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurations",
})) as any;

export type DescribeContinuousExportsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Lists exports as specified by ID. All continuous exports associated with your user
 * can be listed if you call `DescribeContinuousExports` as is without passing
 * any parameters.
 */
export const describeContinuousExports: API.PaginatedOperationMethod<
  DescribeContinuousExportsRequest,
  DescribeContinuousExportsResponse,
  DescribeContinuousExportsError,
  Credentials | HttpClient.HttpClient,
  ContinuousExportDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { exportIds: 0, maxResults: 0, nextToken: 0 },
    output: { descriptions: D.list({ startTime: D.ts, stopTime: D.ts }) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContinuousExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "descriptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeExportConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * `DescribeExportConfigurations` is deprecated. Use DescribeExportTasks, instead.
 */
export const describeExportConfigurations: API.PaginatedOperationMethod<
  DescribeExportConfigurationsRequest,
  DescribeExportConfigurationsResponse,
  DescribeExportConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ExportInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { exportIds: 0, maxResults: 0, nextToken: 0 },
    output: { exportsInfo: D.list(o_ExportInfo) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportsInfo",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeExportTasksError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieve status of one or more export tasks. You can retrieve the status of up to 100
 * export tasks.
 */
export const describeExportTasks: API.PaginatedOperationMethod<
  DescribeExportTasksRequest,
  DescribeExportTasksResponse,
  DescribeExportTasksError,
  Credentials | HttpClient.HttpClient,
  ExportInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      exportIds: 0,
      filters: D.list(i_ExportFilter),
      maxResults: 0,
      nextToken: 0,
    },
    output: { exportsInfo: D.list(o_ExportInfo) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exportsInfo",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeImportTasksError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Returns an array of import tasks for your account, including status information, times,
 * IDs, the Amazon S3 Object URL for the import file, and more.
 */
export const describeImportTasks: API.PaginatedOperationMethod<
  DescribeImportTasksRequest,
  DescribeImportTasksResponse,
  DescribeImportTasksError,
  Credentials | HttpClient.HttpClient,
  ImportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { tasks: D.list(o_ImportTask) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeTagsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a list of configuration items that have tags as specified by the key-value
 * pairs, name and value, passed to the optional parameter `filters`.
 *
 * There are three valid tag filter names:
 *
 * - tagKey
 *
 * - tagValue
 *
 * - configurationId
 *
 * Also, all configuration items associated with your user that have tags can be
 * listed if you call `DescribeTags` as is without passing any parameters.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsRequest,
  DescribeTagsResponse,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { tags: D.list({ timeOfCreation: D.ts }) },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisassociateConfigurationItemsFromApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Disassociates one or more configuration items from an application.
 */
export const disassociateConfigurationItemsFromApplication: API.OperationMethod<
  DisassociateConfigurationItemsFromApplicationRequest,
  DisassociateConfigurationItemsFromApplicationResponse,
  DisassociateConfigurationItemsFromApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { applicationConfigurationId: 0, configurationIds: 0 },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateConfigurationItemsFromApplication",
})) as any;

export type ExportConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Deprecated. Use `StartExportTask` instead.
 *
 * Exports all discovered configuration data to an Amazon S3 bucket or an application that
 * enables you to view and evaluate the data. Data includes tags and tag associations, processes,
 * connections, servers, and system performance. This API returns an export ID that you can query
 * using the *DescribeExportConfigurations* API. The system imposes a limit of
 * two configuration exports in six hours.
 */
export const exportConfigurations: API.OperationMethod<
  ExportConfigurationsRequest,
  ExportConfigurationsResponse,
  ExportConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportConfigurations",
})) as any;

export type GetDiscoverySummaryError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a short summary of discovered assets.
 *
 * This API operation takes no request parameters and is called as is at the command
 * prompt as shown in the example.
 */
export const getDiscoverySummary: API.OperationMethod<
  GetDiscoverySummaryRequest,
  GetDiscoverySummaryResponse,
  GetDiscoverySummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiscoverySummary",
})) as any;

export type ListConfigurationsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a list of configuration items as specified by the value passed to the
 * required parameter `configurationType`. Optional filtering may be applied to refine
 * search results.
 */
export const listConfigurations: API.PaginatedOperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      configurationType: 0,
      filters: D.list(i_Filter),
      maxResults: 0,
      nextToken: 0,
      orderBy: D.list({ fieldName: 0, sortOrder: 0 }),
    },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServerNeighborsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Retrieves a list of servers that are one network hop away from a specified
 * server.
 */
export const listServerNeighbors: API.OperationMethod<
  ListServerNeighborsRequest,
  ListServerNeighborsResponse,
  ListServerNeighborsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      configurationId: 0,
      portInformationNeeded: 0,
      neighborConfigurationIds: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServerNeighbors",
})) as any;

export type StartBatchDeleteConfigurationTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | LimitExceededException
  | OperationNotPermittedException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Takes a list of configurationId as input and starts an asynchronous deletion
 * task to remove the configurationItems. Returns a unique deletion task identifier.
 */
export const startBatchDeleteConfigurationTask: API.OperationMethod<
  StartBatchDeleteConfigurationTaskRequest,
  StartBatchDeleteConfigurationTaskResponse,
  StartBatchDeleteConfigurationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { configurationType: 0, configurationIds: 0 },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    LimitExceededException,
    OperationNotPermittedException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBatchDeleteConfigurationTask",
})) as any;

export type StartContinuousExportError =
  | AuthorizationErrorException
  | ConflictErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ResourceInUseException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Start the continuous flow of agent's discovered data into Amazon Athena.
 */
export const startContinuousExport: API.OperationMethod<
  StartContinuousExportRequest,
  StartContinuousExportResponse,
  StartContinuousExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {}, output: { startTime: D.ts } },
  errors: [
    AuthorizationErrorException,
    ConflictErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ResourceInUseException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContinuousExport",
})) as any;

export type StartDataCollectionByAgentIdsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Instructs the specified agents to start collecting data.
 */
export const startDataCollectionByAgentIds: API.OperationMethod<
  StartDataCollectionByAgentIdsRequest,
  StartDataCollectionByAgentIdsResponse,
  StartDataCollectionByAgentIdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { agentIds: 0 } },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataCollectionByAgentIds",
})) as any;

export type StartExportTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Begins the export of a discovered data report to an Amazon S3 bucket managed by Amazon Web Services.
 *
 * Exports might provide an estimate of fees and savings based on certain information
 * that you provide. Fee estimates do not include any taxes that might apply.
 * Your actual fees and savings depend on a variety of factors, including your actual usage of Amazon Web Services
 * services, which might vary from the estimates provided in this report.
 *
 * If you do not specify `preferences` or `agentIds` in the filter, a
 * summary of all servers, applications, tags, and performance is generated. This data is an
 * aggregation of all server data collected through on-premises tooling, file import, application
 * grouping and applying tags.
 *
 * If you specify `agentIds` in a filter, the task exports up to 72 hours of
 * detailed data collected by the identified Application Discovery Agent, including network,
 * process, and performance details. A time range for exported agent data may be set by using
 * `startTime` and `endTime`. Export of detailed agent data is limited to
 * five concurrently running exports.
 * Export of detailed agent data is limited to two exports per day.
 *
 * If you enable `ec2RecommendationsPreferences` in `preferences`
 * , an
 * Amazon EC2 instance matching the characteristics of each server in Application Discovery Service is generated.
 * Changing the attributes of the `ec2RecommendationsPreferences` changes the
 * criteria of the recommendation.
 */
export const startExportTask: API.OperationMethod<
  StartExportTaskRequest,
  StartExportTaskResponse,
  StartExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      exportDataFormat: 0,
      filters: D.list(i_ExportFilter),
      startTime: 0,
      endTime: 0,
      preferences: {
        ec2RecommendationsPreferences: {
          enabled: 0,
          cpuPerformanceMetricBasis: i_UsageMetricBasis,
          ramPerformanceMetricBasis: i_UsageMetricBasis,
          tenancy: 0,
          excludedInstanceTypes: 0,
          preferredRegion: 0,
          reservedInstanceOptions: {
            purchasingOption: 0,
            offeringClass: 0,
            termLength: 0,
          },
        },
      },
    },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportTask",
})) as any;

export type StartImportTaskError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ResourceInUseException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Starts an import task, which allows you to import details of your on-premises environment
 * directly into Amazon Web Services Migration Hub without having to use the Amazon Web Services Application Discovery
 * Service (Application Discovery Service) tools such as the Amazon Web Services Application Discovery Service Agentless Collector
 * or Application Discovery Agent. This gives you the option to
 * perform migration assessment and planning directly from your imported data, including the
 * ability to group your devices as applications and track their migration status.
 *
 * To start an import request, do this:
 *
 * - Download the specially formatted comma separated value (CSV) import template, which
 * you can find here: https://s3.us-west-2.amazonaws.com/templates-7cffcf56-bd96-4b1c-b45b-a5b42f282e46/import_template.csv.
 *
 * - Fill out the template with your server and application data.
 *
 * - Upload your import file to an Amazon S3 bucket, and make a note of it's Object URL.
 * Your import file must be in the CSV format.
 *
 * - Use the console or the `StartImportTask` command with the Amazon Web Services CLI or one
 * of the Amazon Web Services SDKs to import the records from your file.
 *
 * For more information, including step-by-step procedures, see Migration Hub
 * Import in the Amazon Web Services Application Discovery Service User
 * Guide.
 *
 * There are limits to the number of import tasks you can create (and delete) in an Amazon Web Services
 * account. For more information, see Amazon Web Services Application
 * Discovery Service Limits in the Amazon Web Services Application Discovery Service User
 * Guide.
 */
export const startImportTask: API.OperationMethod<
  StartImportTaskRequest,
  StartImportTaskResponse,
  StartImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clientRequestToken: D.m({ idempotency: true }),
      name: 0,
      importUrl: 0,
    },
    output: { task: o_ImportTask },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ResourceInUseException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportTask",
})) as any;

export type StopContinuousExportError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Stop the continuous flow of agent's discovered data into Amazon Athena.
 */
export const stopContinuousExport: API.OperationMethod<
  StopContinuousExportRequest,
  StopContinuousExportResponse,
  StopContinuousExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { exportId: 0 },
    output: { startTime: D.ts, stopTime: D.ts },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopContinuousExport",
})) as any;

export type StopDataCollectionByAgentIdsError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Instructs the specified agents to stop collecting data.
 */
export const stopDataCollectionByAgentIds: API.OperationMethod<
  StopDataCollectionByAgentIdsRequest,
  StopDataCollectionByAgentIdsResponse,
  StopDataCollectionByAgentIdsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { agentIds: 0 } },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDataCollectionByAgentIds",
})) as any;

export type UpdateApplicationError =
  | AuthorizationErrorException
  | HomeRegionNotSetException
  | InvalidParameterException
  | InvalidParameterValueException
  | ServerInternalErrorException
  | CommonErrors;
/**
 * Updates metadata about an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { configurationId: 0, name: 0, description: 0, wave: 0 },
  },
  errors: [
    AuthorizationErrorException,
    HomeRegionNotSetException,
    InvalidParameterException,
    InvalidParameterValueException,
    ServerInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

const i_ExportFilter: D.LazyStruct = () => ({
  name: 0,
  values: 0,
  condition: 0,
});
const i_Filter: D.LazyStruct = () => ({ name: 0, values: 0, condition: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_UsageMetricBasis: D.LazyStruct = () => ({
  name: 0,
  percentageAdjust: 0,
});
const o_ExportInfo: D.LazyStruct = () => ({
  exportRequestTime: D.ts,
  requestedStartTime: D.ts,
  requestedEndTime: D.ts,
});
const o_ImportTask: D.LazyStruct = () => ({
  importRequestTime: D.ts,
  importCompletionTime: D.ts,
  importDeletedTime: D.ts,
});
