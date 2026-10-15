import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CodeCatalyst",
  serviceShapeName: "CodeCatalyst",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "CodeCatalyst" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-09-28");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Region, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      return e(Endpoint);
    }
    {
      const PartitionResult = _.partition("us-west-2");
      if (!(Region != null) && PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === false) {
            return err("Partition does not support FIPS.");
          }
          return e(
            `https://codecatalyst-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(`https://codecatalyst.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (Region != null && PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === false) {
            return err("Partition does not support FIPS.");
          }
          return e(
            `https://codecatalyst-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(`https://codecatalyst.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
      }
    }
    return err("No matching endpoint rule");
  },
  '{"url":"https://codecatalyst.global.api.aws","properties":{},"headers":{}}',
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

export type AccessTokenName = string;
export interface CreateAccessTokenRequest {
  name: string;
  expiresTime?: Date;
}
export type AccessTokenSecret = string | redacted.Redacted<string>;
export type AccessTokenId = string;
export interface CreateAccessTokenResponse {
  secret: string | redacted.Redacted<string>;
  name: string;
  expiresTime: Date;
  accessTokenId: string;
}
export type NameString = string;
export type SourceRepositoryNameString = string;
export type SourceRepositoryBranchString = string;
export interface RepositoryInput {
  repositoryName: string;
  branchName?: string;
}
export type RepositoriesInput = RepositoryInput[];
export type ClientToken = string;
export interface IdeConfiguration {
  runtime?: string;
  name?: string;
}
export type IdeConfigurationList = IdeConfiguration[];
export type InstanceType = string;
export type InactivityTimeoutMinutes = number;
export interface PersistentStorageConfiguration {
  sizeInGiB: number;
}
export interface CreateDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  repositories?: RepositoryInput[];
  clientToken?: string;
  alias?: string;
  ides?: IdeConfiguration[];
  instanceType: string;
  inactivityTimeoutMinutes?: number;
  persistentStorage: PersistentStorageConfiguration;
  vpcConnectionName?: string;
}
export type Uuid = string;
export interface CreateDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  vpcConnectionName?: string;
}
export type ProjectDisplayName = string;
export type ProjectDescription = string;
export interface CreateProjectRequest {
  spaceName: string;
  displayName: string;
  description?: string;
}
export interface CreateProjectResponse {
  spaceName?: string;
  name: string;
  displayName?: string;
  description?: string;
}
export type SourceRepositoryDescriptionString = string;
export interface CreateSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string;
}
export interface CreateSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string;
}
export interface CreateSourceRepositoryBranchRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
  name: string;
  headCommitId?: string;
}
export type SourceRepositoryBranchRefString = string;
export interface CreateSourceRepositoryBranchResponse {
  ref?: string;
  name?: string;
  lastUpdatedTime?: Date;
  headCommitId?: string;
}
export interface DeleteAccessTokenRequest {
  id: string;
}
export interface DeleteAccessTokenResponse {}
export interface DeleteDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
}
export interface DeleteDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
}
export interface DeleteProjectRequest {
  spaceName: string;
  name: string;
}
export interface DeleteProjectResponse {
  spaceName: string;
  name: string;
  displayName?: string;
}
export interface DeleteSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
}
export interface DeleteSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
}
export interface DeleteSpaceRequest {
  name: string;
}
export interface DeleteSpaceResponse {
  name: string;
  displayName?: string;
}
export interface GetDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
}
export type DevEnvironmentStatus = string;
export type StatusReason = string;
export interface DevEnvironmentRepositorySummary {
  repositoryName: string;
  branchName?: string;
}
export type DevEnvironmentRepositorySummaries = DevEnvironmentRepositorySummary[];
export interface Ide {
  runtime?: string;
  name?: string;
}
export type Ides = Ide[];
export interface PersistentStorage {
  sizeInGiB: number;
}
export interface GetDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  lastUpdatedTime: Date;
  creatorId: string;
  status: string;
  statusReason?: string;
  repositories: DevEnvironmentRepositorySummary[];
  alias?: string;
  ides?: Ide[];
  instanceType: string;
  inactivityTimeoutMinutes: number;
  persistentStorage: PersistentStorage;
  vpcConnectionName?: string;
}
export interface GetProjectRequest {
  spaceName: string;
  name: string;
}
export interface GetProjectResponse {
  spaceName?: string;
  name: string;
  displayName?: string;
  description?: string;
}
export interface GetSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
}
export interface GetSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string;
  lastUpdatedTime: Date;
  createdTime: Date;
}
export interface GetSourceRepositoryCloneUrlsRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
}
export interface GetSourceRepositoryCloneUrlsResponse {
  https: string;
}
export interface GetSpaceRequest {
  name: string;
}
export type RegionString = string;
export interface GetSpaceResponse {
  name: string;
  regionName: string;
  displayName?: string;
  description?: string;
}
export interface GetSubscriptionRequest {
  spaceName: string;
}
export interface GetSubscriptionResponse {
  subscriptionType?: string;
  awsAccountName?: string;
  pendingSubscriptionType?: string;
  pendingSubscriptionStartTime?: Date;
}
export interface GetUserDetailsRequest {
  id?: string;
  userName?: string;
}
export interface EmailAddress {
  email?: string;
  verified?: boolean;
}
export interface GetUserDetailsResponse {
  userId?: string;
  userName?: string;
  displayName?: string;
  primaryEmail?: EmailAddress;
  version?: string;
}
export interface GetWorkflowRequest {
  spaceName: string;
  id: string;
  projectName: string;
}
export interface WorkflowDefinition {
  path: string;
}
export type WorkflowRunMode = string;
export type WorkflowStatus = string;
export interface GetWorkflowResponse {
  spaceName: string;
  projectName: string;
  id: string;
  name: string;
  sourceRepositoryName?: string;
  sourceBranchName?: string;
  definition: WorkflowDefinition;
  createdTime: Date;
  lastUpdatedTime: Date;
  runMode: string;
  status: string;
}
export interface GetWorkflowRunRequest {
  spaceName: string;
  id: string;
  projectName: string;
}
export type WorkflowRunStatus = string;
export interface WorkflowRunStatusReason {}
export type WorkflowRunStatusReasons = WorkflowRunStatusReason[];
export interface GetWorkflowRunResponse {
  spaceName: string;
  projectName: string;
  id: string;
  workflowId: string;
  status: string;
  statusReasons?: WorkflowRunStatusReason[];
  startTime: Date;
  endTime?: Date;
  lastUpdatedTime: Date;
}
export interface ListAccessTokensRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AccessTokenSummary {
  id: string;
  name: string;
  expiresTime?: Date;
}
export type AccessTokenSummaries = AccessTokenSummary[];
export interface ListAccessTokensResponse {
  items: AccessTokenSummary[];
  nextToken?: string;
}
export type StringList = string[];
export interface Filter {
  key: string;
  values: string[];
  comparisonOperator?: string;
}
export type Filters = Filter[];
export interface ListDevEnvironmentsRequest {
  spaceName: string;
  projectName?: string;
  filters?: Filter[];
  nextToken?: string;
  maxResults?: number;
}
export interface DevEnvironmentSummary {
  spaceName?: string;
  projectName?: string;
  id: string;
  lastUpdatedTime: Date;
  creatorId: string;
  status: string;
  statusReason?: string;
  repositories: DevEnvironmentRepositorySummary[];
  alias?: string;
  ides?: Ide[];
  instanceType: string;
  inactivityTimeoutMinutes: number;
  persistentStorage: PersistentStorage;
  vpcConnectionName?: string;
}
export type DevEnvironmentSummaryList = DevEnvironmentSummary[];
export interface ListDevEnvironmentsResponse {
  items: DevEnvironmentSummary[];
  nextToken?: string;
}
export interface ListDevEnvironmentSessionsRequest {
  spaceName: string;
  projectName: string;
  devEnvironmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DevEnvironmentSessionSummary {
  spaceName: string;
  projectName: string;
  devEnvironmentId: string;
  startedTime: Date;
  id: string;
}
export type DevEnvironmentSessionsSummaryList = DevEnvironmentSessionSummary[];
export interface ListDevEnvironmentSessionsResponse {
  items: DevEnvironmentSessionSummary[];
  nextToken?: string;
}
export interface ListEventLogsRequest {
  spaceName: string;
  startTime: Date;
  endTime: Date;
  eventName?: string;
  nextToken?: string;
  maxResults?: number;
}
export type OperationType = string;
export type UserType = string;
export interface UserIdentity {
  userType: string;
  principalId: string;
  userName?: string;
  awsAccountId?: string;
}
export interface ProjectInformation {
  name?: string;
  projectId?: string;
}
export interface EventPayload {
  contentType?: string;
  data?: string;
}
export interface EventLogEntry {
  id: string;
  eventName: string;
  eventType: string;
  eventCategory: string;
  eventSource: string;
  eventTime: Date;
  operationType: string;
  userIdentity: UserIdentity;
  projectInformation?: ProjectInformation;
  requestId?: string;
  requestPayload?: EventPayload;
  responsePayload?: EventPayload;
  errorCode?: string;
  sourceIpAddress?: string;
  userAgent?: string;
}
export type EventLogEntries = EventLogEntry[];
export interface ListEventLogsResponse {
  nextToken?: string;
  items: EventLogEntry[];
}
export type FilterKey = string;
export type ComparisonOperator = string;
export interface ProjectListFilter {
  key: string;
  values: string[];
  comparisonOperator?: string;
}
export type ProjectListFilters = ProjectListFilter[];
export interface ListProjectsRequest {
  spaceName: string;
  nextToken?: string;
  maxResults?: number;
  filters?: ProjectListFilter[];
}
export interface ProjectSummary {
  name: string;
  displayName?: string;
  description?: string;
}
export type ProjectSummaries = ProjectSummary[];
export interface ListProjectsResponse {
  nextToken?: string;
  items?: ProjectSummary[];
}
export interface ListSourceRepositoriesRequest {
  spaceName: string;
  projectName: string;
  nextToken?: string;
  maxResults?: number;
}
export type SourceRepositoryIdString = string;
export interface ListSourceRepositoriesItem {
  id: string;
  name: string;
  description?: string;
  lastUpdatedTime: Date;
  createdTime: Date;
}
export type ListSourceRepositoriesItems = ListSourceRepositoriesItem[];
export interface ListSourceRepositoriesResponse {
  items?: ListSourceRepositoriesItem[];
  nextToken?: string;
}
export interface ListSourceRepositoryBranchesRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListSourceRepositoryBranchesItem {
  ref?: string;
  name?: string;
  lastUpdatedTime?: Date;
  headCommitId?: string;
}
export type ListSourceRepositoryBranchesItems = ListSourceRepositoryBranchesItem[];
export interface ListSourceRepositoryBranchesResponse {
  nextToken?: string;
  items: ListSourceRepositoryBranchesItem[];
}
export interface ListSpacesRequest {
  nextToken?: string;
}
export interface SpaceSummary {
  name: string;
  regionName: string;
  displayName?: string;
  description?: string;
}
export type SpaceSummaries = SpaceSummary[];
export interface ListSpacesResponse {
  nextToken?: string;
  items?: SpaceSummary[];
}
export interface WorkflowRunSortCriteria {}
export type WorkflowRunSortCriteriaList = WorkflowRunSortCriteria[];
export interface ListWorkflowRunsRequest {
  spaceName: string;
  workflowId?: string;
  projectName: string;
  nextToken?: string;
  maxResults?: number;
  sortBy?: WorkflowRunSortCriteria[];
}
export interface WorkflowRunSummary {
  id: string;
  workflowId: string;
  workflowName: string;
  status: string;
  statusReasons?: WorkflowRunStatusReason[];
  startTime: Date;
  endTime?: Date;
  lastUpdatedTime: Date;
}
export type WorkflowRunSummaries = WorkflowRunSummary[];
export interface ListWorkflowRunsResponse {
  nextToken?: string;
  items?: WorkflowRunSummary[];
}
export interface WorkflowSortCriteria {}
export type WorkflowSortCriteriaList = WorkflowSortCriteria[];
export interface ListWorkflowsRequest {
  spaceName: string;
  projectName: string;
  nextToken?: string;
  maxResults?: number;
  sortBy?: WorkflowSortCriteria[];
}
export interface WorkflowDefinitionSummary {
  path: string;
}
export interface WorkflowSummary {
  id: string;
  name: string;
  sourceRepositoryName: string;
  sourceBranchName: string;
  definition: WorkflowDefinitionSummary;
  createdTime: Date;
  lastUpdatedTime: Date;
  runMode: string;
  status: string;
}
export type WorkflowSummaries = WorkflowSummary[];
export interface ListWorkflowsResponse {
  nextToken?: string;
  items?: WorkflowSummary[];
}
export interface StartDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
  ides?: IdeConfiguration[];
  instanceType?: string;
  inactivityTimeoutMinutes?: number;
}
export interface StartDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  status: string;
}
export type DevEnvironmentSessionType = string;
export type ExecuteCommandSessionConfigurationArguments = string[];
export interface ExecuteCommandSessionConfiguration {
  command: string;
  arguments?: string[];
}
export interface DevEnvironmentSessionConfiguration {
  sessionType: string;
  executeCommandSessionConfiguration?: ExecuteCommandSessionConfiguration;
}
export interface StartDevEnvironmentSessionRequest {
  spaceName: string;
  projectName: string;
  id: string;
  sessionConfiguration: DevEnvironmentSessionConfiguration;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface DevEnvironmentAccessDetails {
  streamUrl: string | redacted.Redacted<string>;
  tokenValue: string | redacted.Redacted<string>;
}
export interface StartDevEnvironmentSessionResponse {
  accessDetails: DevEnvironmentAccessDetails;
  sessionId?: string;
  spaceName: string;
  projectName: string;
  id: string;
}
export interface StartWorkflowRunRequest {
  spaceName: string;
  projectName: string;
  workflowId: string;
  clientToken?: string;
}
export interface StartWorkflowRunResponse {
  spaceName: string;
  projectName: string;
  id: string;
  workflowId: string;
}
export interface StopDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
}
export interface StopDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  status: string;
}
export interface StopDevEnvironmentSessionRequest {
  spaceName: string;
  projectName: string;
  id: string;
  sessionId: string;
}
export interface StopDevEnvironmentSessionResponse {
  spaceName: string;
  projectName: string;
  id: string;
  sessionId: string;
}
export interface UpdateDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
  alias?: string;
  ides?: IdeConfiguration[];
  instanceType?: string;
  inactivityTimeoutMinutes?: number;
  clientToken?: string;
}
export interface UpdateDevEnvironmentResponse {
  id: string;
  spaceName: string;
  projectName: string;
  alias?: string;
  ides?: IdeConfiguration[];
  instanceType?: string;
  inactivityTimeoutMinutes?: number;
  clientToken?: string;
}
export interface UpdateProjectRequest {
  spaceName: string;
  name: string;
  description?: string;
}
export interface UpdateProjectResponse {
  spaceName?: string;
  name?: string;
  displayName?: string;
  description?: string;
}
export type SpaceDescription = string;
export interface UpdateSpaceRequest {
  name: string;
  description?: string;
}
export interface UpdateSpaceResponse {
  name?: string;
  displayName?: string;
  description?: string;
}
export interface VerifySessionRequest {}
export interface VerifySessionResponse {
  identity?: string;
}
export type CreateAccessTokenError = CommonErrors;
/**
 * Creates a personal access token (PAT) for the current user. A personal access token (PAT) is similar to a password.
 * It is associated with your user identity for use across all spaces and projects in Amazon CodeCatalyst. You use PATs to access CodeCatalyst
 * from resources that include integrated development environments (IDEs) and Git-based source repositories.
 * PATs represent you in Amazon CodeCatalyst and you can manage them in your user settings.For more information, see
 * Managing personal access tokens in Amazon CodeCatalyst.
 */
export const createAccessToken: API.OperationMethod<
  CreateAccessTokenRequest,
  CreateAccessTokenResponse,
  CreateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAccessTokenRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateAccessTokenResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessToken",
}));

export type CreateDevEnvironmentError = CommonErrors;
/**
 * Creates a Dev Environment in Amazon CodeCatalyst, a cloud-based development environment that you can use to quickly work on the code stored
 * in the source repositories of your project.
 *
 * When created in the Amazon CodeCatalyst console, by default a Dev Environment is configured to have a 2 core processor, 4GB of RAM, and 16GB of persistent storage. None of these
 * defaults apply to a Dev Environment created programmatically.
 */
export const createDevEnvironment: API.OperationMethod<
  CreateDevEnvironmentRequest,
  CreateDevEnvironmentResponse,
  CreateDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<CreateDevEnvironmentRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<CreateDevEnvironmentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevEnvironment",
}));

export type CreateProjectError = CommonErrors;
/**
 * Creates a project in a specified space.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<CreateProjectRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<CreateProjectResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
}));

export type CreateSourceRepositoryError = CommonErrors;
/**
 * Creates an empty Git-based source repository in a specified project. The repository is
 * created with an initial empty commit with a default branch named `main`.
 */
export const createSourceRepository: API.OperationMethod<
  CreateSourceRepositoryRequest,
  CreateSourceRepositoryResponse,
  CreateSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<CreateSourceRepositoryRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<CreateSourceRepositoryResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepository",
}));

export type CreateSourceRepositoryBranchError = CommonErrors;
/**
 * Creates a branch in a specified source repository in Amazon CodeCatalyst.
 *
 * This API only creates a branch in a source repository hosted in Amazon CodeCatalyst. You cannot use this API to create a branch in a linked repository.
 */
export const createSourceRepositoryBranch: API.OperationMethod<
  CreateSourceRepositoryBranchRequest,
  CreateSourceRepositoryBranchResponse,
  CreateSourceRepositoryBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<CreateSourceRepositoryBranchRequest>,
  output: __S(336, __c42, 0) as any as S.Schema<CreateSourceRepositoryBranchResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepositoryBranch",
}));

export type DeleteAccessTokenError = CommonErrors;
/**
 * Deletes a specified personal access token (PAT). A personal access token can only be deleted by the user who created it.
 */
export const deleteAccessToken: API.OperationMethod<
  DeleteAccessTokenRequest,
  DeleteAccessTokenResponse,
  DeleteAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<DeleteAccessTokenRequest>,
  output: __S(352, __c44, 0) as any as S.Schema<DeleteAccessTokenResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessToken",
}));

export type DeleteDevEnvironmentError = CommonErrors;
/**
 * Deletes a Dev Environment.
 */
export const deleteDevEnvironment: API.OperationMethod<
  DeleteDevEnvironmentRequest,
  DeleteDevEnvironmentResponse,
  DeleteDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<DeleteDevEnvironmentRequest>,
  output: __S(361, __c45, 1) as any as S.Schema<DeleteDevEnvironmentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEnvironment",
}));

export type DeleteProjectError = CommonErrors;
/**
 * Deletes a project in a space.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<DeleteProjectRequest>,
  output: __S(369, __c46, 1) as any as S.Schema<DeleteProjectResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

export type DeleteSourceRepositoryError = CommonErrors;
/**
 * Deletes a source repository in Amazon CodeCatalyst. You cannot use this API to delete a linked repository. It can only be used to delete a Amazon CodeCatalyst source repository.
 */
export const deleteSourceRepository: API.OperationMethod<
  DeleteSourceRepositoryRequest,
  DeleteSourceRepositoryResponse,
  DeleteSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<DeleteSourceRepositoryRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<DeleteSourceRepositoryResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceRepository",
}));

export type DeleteSpaceError = CommonErrors;
/**
 * Deletes a space.
 *
 * Deleting a space cannot be undone. Additionally, since space names must be unique across Amazon CodeCatalyst, you cannot reuse names of deleted spaces.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<DeleteSpaceRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<DeleteSpaceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
}));

export type GetDevEnvironmentError = CommonErrors;
/**
 * Returns information about a Dev Environment for a source repository in a project. Dev Environments are specific to the user who creates them.
 */
export const getDevEnvironment: API.OperationMethod<
  GetDevEnvironmentRequest,
  GetDevEnvironmentResponse,
  GetDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetDevEnvironmentRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<GetDevEnvironmentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEnvironment",
}));

export type GetProjectError = CommonErrors;
/**
 * Returns information about a project.
 */
export const getProject: API.OperationMethod<
  GetProjectRequest,
  GetProjectResponse,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetProjectRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<GetProjectResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
}));

export type GetSourceRepositoryError = CommonErrors;
/**
 * Returns information about a source repository.
 */
export const getSourceRepository: API.OperationMethod<
  GetSourceRepositoryRequest,
  GetSourceRepositoryResponse,
  GetSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetSourceRepositoryRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<GetSourceRepositoryResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepository",
}));

export type GetSourceRepositoryCloneUrlsError = CommonErrors;
/**
 * Returns information about the URLs that can be used with a Git client to clone a source
 * repository.
 */
export const getSourceRepositoryCloneUrls: API.OperationMethod<
  GetSourceRepositoryCloneUrlsRequest,
  GetSourceRepositoryCloneUrlsResponse,
  GetSourceRepositoryCloneUrlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<GetSourceRepositoryCloneUrlsRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<GetSourceRepositoryCloneUrlsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepositoryCloneUrls",
}));

export type GetSpaceError = CommonErrors;
/**
 * Returns information about an space.
 */
export const getSpace: API.OperationMethod<
  GetSpaceRequest,
  GetSpaceResponse,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetSpaceRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<GetSpaceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
}));

export type GetSubscriptionError = CommonErrors;
/**
 * Returns information about the Amazon Web Services account used for billing purposes
 * and the billing plan for the space.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetSubscriptionRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<GetSubscriptionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type GetUserDetailsError = CommonErrors;
/**
 * Returns information about a user.
 */
export const getUserDetails: API.OperationMethod<
  GetUserDetailsRequest,
  GetUserDetailsResponse,
  GetUserDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetUserDetailsRequest>,
  output: __S(90, __c11, 2) as any as S.Schema<GetUserDetailsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDetails",
}));

export type GetWorkflowError = CommonErrors;
/**
 * Returns information about a workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetWorkflowRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<GetWorkflowResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
}));

export type GetWorkflowRunError = CommonErrors;
/**
 * Returns information about a specified run of a workflow.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetWorkflowRunRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<GetWorkflowRunResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
}));

export type ListAccessTokensError = CommonErrors;
/**
 * Lists all personal access tokens (PATs) associated with the user who calls the API. You can only list PATs associated with your Amazon Web Services Builder ID.
 */
export const listAccessTokens: API.PaginatedOperationMethod<
  ListAccessTokensRequest,
  ListAccessTokensResponse,
  ListAccessTokensError,
  Credentials | HttpClient.HttpClient,
  AccessTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<ListAccessTokensRequest>,
  output: __S(131, __c16, 3) as any as S.Schema<ListAccessTokensResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevEnvironmentsError = CommonErrors;
/**
 * Retrieves a list of Dev Environments in a project.
 */
export const listDevEnvironments: API.PaginatedOperationMethod<
  ListDevEnvironmentsRequest,
  ListDevEnvironmentsResponse,
  ListDevEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  DevEnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListDevEnvironmentsRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<ListDevEnvironmentsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevEnvironmentSessionsError = CommonErrors;
/**
 * Retrieves a list of active sessions for a Dev Environment in a project.
 */
export const listDevEnvironmentSessions: API.PaginatedOperationMethod<
  ListDevEnvironmentSessionsRequest,
  ListDevEnvironmentSessionsResponse,
  ListDevEnvironmentSessionsError,
  Credentials | HttpClient.HttpClient,
  DevEnvironmentSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<ListDevEnvironmentSessionsRequest>,
  output: __S(179, __c22, 3) as any as S.Schema<ListDevEnvironmentSessionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEnvironmentSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventLogsError = CommonErrors;
/**
 * Retrieves a list of events that occurred during a specific time in a space. You can
 * use these events to audit user and system activity in a space. For more information, see
 * Monitoring in the *Amazon CodeCatalyst User Guide*.
 *
 * ListEventLogs guarantees events for the last 30 days in a given space. You can also
 * view and retrieve a list of management events over the last 90 days for Amazon CodeCatalyst in the
 * CloudTrail console by viewing Event history, or by creating a trail to create
 * and maintain a record of events that extends past 90 days. For more information, see Working with CloudTrail Event History and Working with
 * CloudTrail trails.
 */
export const listEventLogs: API.PaginatedOperationMethod<
  ListEventLogsRequest,
  ListEventLogsResponse,
  ListEventLogsError,
  Credentials | HttpClient.HttpClient,
  EventLogEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListEventLogsRequest>,
  output: __S(190, __c23, 6) as any as S.Schema<ListEventLogsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventLogs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError = CommonErrors;
/**
 * Retrieves a list of projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListProjectsRequest>,
  output: __S(195, __c24, 3) as any as S.Schema<ListProjectsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceRepositoriesError = CommonErrors;
/**
 * Retrieves a list of source repositories in a project.
 */
export const listSourceRepositories: API.PaginatedOperationMethod<
  ListSourceRepositoriesRequest,
  ListSourceRepositoriesResponse,
  ListSourceRepositoriesError,
  Credentials | HttpClient.HttpClient,
  ListSourceRepositoriesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListSourceRepositoriesRequest>,
  output: __S(203, __c25, 3) as any as S.Schema<ListSourceRepositoriesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceRepositoryBranchesError = CommonErrors;
/**
 * Retrieves a list of branches in a specified source repository.
 */
export const listSourceRepositoryBranches: API.PaginatedOperationMethod<
  ListSourceRepositoryBranchesRequest,
  ListSourceRepositoryBranchesResponse,
  ListSourceRepositoryBranchesError,
  Credentials | HttpClient.HttpClient,
  ListSourceRepositoryBranchesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListSourceRepositoryBranchesRequest>,
  output: __S(210, __c26, 2) as any as S.Schema<ListSourceRepositoryBranchesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceRepositoryBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSpacesError = CommonErrors;
/**
 * Retrieves a list of spaces.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesRequest,
  ListSpacesResponse,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListSpacesRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<ListSpacesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "items" } as const,
})) as any;

export type ListWorkflowRunsError = CommonErrors;
/**
 * Retrieves a list of workflow runs of a specified workflow.
 */
export const listWorkflowRuns: API.PaginatedOperationMethod<
  ListWorkflowRunsRequest,
  ListWorkflowRunsResponse,
  ListWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListWorkflowRunsRequest>,
  output: __S(227, __c28, 3) as any as S.Schema<ListWorkflowRunsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowsError = CommonErrors;
/**
 * Retrieves a list of workflows in a specified project.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(235, __c29, 3) as any as S.Schema<ListWorkflowsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDevEnvironmentError = CommonErrors;
/**
 * Starts a specified Dev Environment and puts it into an active state.
 */
export const startDevEnvironment: API.OperationMethod<
  StartDevEnvironmentRequest,
  StartDevEnvironmentResponse,
  StartDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<StartDevEnvironmentRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<StartDevEnvironmentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironment",
}));

export type StartDevEnvironmentSessionError = CommonErrors;
/**
 * Starts a session for a specified Dev Environment.
 */
export const startDevEnvironmentSession: API.OperationMethod<
  StartDevEnvironmentSessionRequest,
  StartDevEnvironmentSessionResponse,
  StartDevEnvironmentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(266, __c33, 2) as any as S.Schema<StartDevEnvironmentSessionRequest>,
  output: __S(268, __c33, 4) as any as S.Schema<StartDevEnvironmentSessionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironmentSession",
}));

export type StartWorkflowRunError = CommonErrors;
/**
 * Begins a run of a specified workflow.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<StartWorkflowRunRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<StartWorkflowRunResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
}));

export type StopDevEnvironmentError = CommonErrors;
/**
 * Pauses a specified Dev Environment and places it in a non-running state. Stopped Dev Environments do not consume compute minutes.
 */
export const stopDevEnvironment: API.OperationMethod<
  StopDevEnvironmentRequest,
  StopDevEnvironmentResponse,
  StopDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<StopDevEnvironmentRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<StopDevEnvironmentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironment",
}));

export type StopDevEnvironmentSessionError = CommonErrors;
/**
 * Stops a session for a specified Dev Environment.
 */
export const stopDevEnvironmentSession: API.OperationMethod<
  StopDevEnvironmentSessionRequest,
  StopDevEnvironmentSessionResponse,
  StopDevEnvironmentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<StopDevEnvironmentSessionRequest>,
  output: __S(289, __c36, 1) as any as S.Schema<StopDevEnvironmentSessionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironmentSession",
}));

export type UpdateDevEnvironmentError = CommonErrors;
/**
 * Changes one or more values for a Dev Environment. Updating certain values of the Dev Environment will cause a restart.
 */
export const updateDevEnvironment: API.OperationMethod<
  UpdateDevEnvironmentRequest,
  UpdateDevEnvironmentResponse,
  UpdateDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UpdateDevEnvironmentRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<UpdateDevEnvironmentResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevEnvironment",
}));

export type UpdateProjectError = CommonErrors;
/**
 * Changes one or more values for a project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UpdateProjectRequest>,
  output: __S(305, __c38, 1) as any as S.Schema<UpdateProjectResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
}));

export type UpdateSpaceError = CommonErrors;
/**
 * Changes one or more values for a space.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<UpdateSpaceRequest>,
  output: __S(313, __c39, 1) as any as S.Schema<UpdateSpaceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
}));

export type VerifySessionError = CommonErrors;
/**
 * Verifies whether the calling user has a valid Amazon CodeCatalyst login and session. If successful, this returns the ID of the user in Amazon CodeCatalyst.
 */
export const verifySession: API.OperationMethod<
  VerifySessionRequest,
  VerifySessionResponse,
  VerifySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<VerifySessionRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<VerifySessionResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySession",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          expiresTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v1/accessTokens" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAccessTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          secret: SensitiveString,
          name: S.String,
          expiresTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          accessTokenId: S.String,
        }),
      ).annotate({ identifier: "CreateAccessTokenResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          repositories: S.optional(__S(17, __c2, 1)),
          clientToken: S.optional(S.String),
          alias: S.optional(S.String),
          ides: S.optional(__S(25, __c3, 1)),
          instanceType: S.String,
          inactivityTimeoutMinutes: S.optional(S.Number),
          persistentStorage: __S(18, __c2, 2),
          vpcConnectionName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDevEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
          vpcConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateDevEnvironmentResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, branchName: S.optional(S.String) }),
      ).annotate({ identifier: "RepositoryInput" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() => S.Struct({ sizeInGiB: S.Number })).annotate({
        identifier: "PersistentStorageConfiguration",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ runtime: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "IdeConfiguration" });
    case 1:
      return S.Array(__S(24, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDevEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          creatorId: S.String,
          status: S.String,
          statusReason: S.optional(S.String),
          repositories: __S(17, __c2, 1),
          alias: S.optional(S.String),
          ides: S.optional(__S(25, __c3, 1)),
          instanceType: S.String,
          inactivityTimeoutMinutes: S.Number,
          persistentStorage: __S(18, __c2, 2),
          vpcConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDevEnvironmentResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/spaces/{spaceName}/projects/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProjectRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSourceRepositoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          name: S.String,
          description: S.optional(S.String),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetSourceRepositoryResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          sourceRepositoryName: S.String.pipe(T.HttpLabel("sourceRepositoryName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/cloneUrls",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSourceRepositoryCloneUrlsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ https: S.String })).annotate({
        identifier: "GetSourceRepositoryCloneUrlsResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/spaces/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSpaceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          regionName: S.String,
          displayName: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSpaceResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String.pipe(T.HttpLabel("spaceName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/spaces/{spaceName}/subscription" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          subscriptionType: S.optional(S.String),
          awsAccountName: S.optional(S.String),
          pendingSubscriptionType: S.optional(S.String),
          pendingSubscriptionStartTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "GetSubscriptionResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String).pipe(T.HttpQuery("id")),
          userName: S.optional(S.String).pipe(T.HttpQuery("userName")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/userDetails" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetUserDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ email: S.optional(S.String), verified: S.optional(S.Boolean) }),
      ).annotate({ identifier: "EmailAddress" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String),
          userName: S.optional(S.String),
          displayName: S.optional(S.String),
          primaryEmail: S.optional(__S(89, __c11, 1)),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetUserDetailsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          id: S.String.pipe(T.HttpLabel("id")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflows/{id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
          name: S.String,
          sourceRepositoryName: S.optional(S.String),
          sourceBranchName: S.optional(S.String),
          definition: __S(104, __c13, 0),
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          runMode: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "GetWorkflowResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String })).annotate({
        identifier: "WorkflowDefinition",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          id: S.String.pipe(T.HttpLabel("id")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflowRuns/{id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
          workflowId: S.String,
          status: S.String,
          statusReasons: S.optional(__S(120, __c15, 0)),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetWorkflowRunResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(352, __c44, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/accessTokens" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccessTokensRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          expiresTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AccessTokenSummary" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(130, __c16, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessTokensResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          displayName: S.String,
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/spaces/{spaceName}/projects" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProjectRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.optional(S.String),
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProjectResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.optional(S.String),
          filters: S.optional(__S(161, __c20, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/spaces/{spaceName}/devEnvironments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDevEnvironmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.optional(S.String),
          projectName: S.optional(S.String),
          id: S.String,
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          creatorId: S.String,
          status: S.String,
          statusReason: S.optional(S.String),
          repositories: __S(17, __c2, 1),
          alias: S.optional(S.String),
          ides: S.optional(__S(25, __c3, 1)),
          instanceType: S.String,
          inactivityTimeoutMinutes: S.Number,
          persistentStorage: __S(18, __c2, 2),
          vpcConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DevEnvironmentSummary" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(154, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDevEnvironmentsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          key: S.String,
          values: __S(168, __c21, 0),
          comparisonOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(160, __c20, 0));
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
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          devEnvironmentId: S.String.pipe(T.HttpLabel("devEnvironmentId")),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{devEnvironmentId}/sessions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDevEnvironmentSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          devEnvironmentId: S.String,
          startedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          id: S.String,
        }),
      ).annotate({ identifier: "DevEnvironmentSessionSummary" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(178, __c22, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDevEnvironmentSessionsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          eventName: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/spaces/{spaceName}/eventLogs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventLogsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userType: S.String,
          principalId: S.String,
          userName: S.optional(S.String),
          awsAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserIdentity" });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), projectId: S.optional(S.String) }),
      ).annotate({ identifier: "ProjectInformation" });
    case 3:
      return S.suspend(() =>
        S.Struct({ contentType: S.optional(S.String), data: S.optional(S.String) }),
      ).annotate({ identifier: "EventPayload" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          eventName: S.String,
          eventType: S.String,
          eventCategory: S.String,
          eventSource: S.String,
          eventTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          operationType: S.String,
          userIdentity: __S(185, __c23, 1),
          projectInformation: S.optional(__S(186, __c23, 2)),
          requestId: S.optional(S.String),
          requestPayload: S.optional(__S(187, __c23, 3)),
          responsePayload: S.optional(__S(187, __c23, 3)),
          errorCode: S.optional(S.String),
          sourceIpAddress: S.optional(S.String),
          userAgent: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventLogEntry" });
    case 5:
      return S.Array(__S(188, __c23, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(189, __c23, 5) }),
      ).annotate({ identifier: "ListEventLogsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(161, __c20, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/spaces/{spaceName}/projects" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProjectsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          displayName: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectSummary" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(194, __c24, 2)) }),
      ).annotate({ identifier: "ListProjectsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSourceRepositoriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          description: S.optional(S.String),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListSourceRepositoriesItem" });
    case 2:
      return S.Array(__S(201, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(202, __c25, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSourceRepositoriesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          sourceRepositoryName: S.String.pipe(T.HttpLabel("sourceRepositoryName")),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/branches",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSourceRepositoryBranchesRequest" });
    case 1:
      return S.Array(__S(336, __c42, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(209, __c26, 1) }),
      ).annotate({ identifier: "ListSourceRepositoryBranchesResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/spaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSpacesRequest" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(217, __c27, 1)) }),
      ).annotate({ identifier: "ListSpacesResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          workflowId: S.optional(S.String).pipe(T.HttpQuery("workflowId")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortBy: S.optional(__S(120, __c15, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflowRuns",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          workflowId: S.String,
          workflowName: S.String,
          status: S.String,
          statusReasons: S.optional(__S(120, __c15, 0)),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "WorkflowRunSummary" });
    case 2:
      return S.Array(__S(225, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(226, __c28, 2)) }),
      ).annotate({ identifier: "ListWorkflowRunsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortBy: S.optional(__S(120, __c15, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflows",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          sourceRepositoryName: S.String,
          sourceBranchName: S.String,
          definition: __S(104, __c13, 0),
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          runMode: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "WorkflowSummary" });
    case 2:
      return S.Array(__S(233, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(234, __c29, 2)) }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          ides: S.optional(__S(25, __c3, 1)),
          instanceType: S.optional(S.String),
          inactivityTimeoutMinutes: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDevEnvironmentRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String, projectName: S.String, id: S.String, status: S.String }),
      ).annotate({ identifier: "StartDevEnvironmentResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSourceRepositoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          name: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSourceRepositoryResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ command: S.String, arguments: S.optional(__S(168, __c21, 0)) }),
      ).annotate({ identifier: "ExecuteCommandSessionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionType: S.String,
          executeCommandSessionConfiguration: S.optional(__S(264, __c33, 0)),
        }),
      ).annotate({ identifier: "DevEnvironmentSessionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          sessionConfiguration: __S(265, __c33, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/session",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDevEnvironmentSessionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ streamUrl: SensitiveString, tokenValue: SensitiveString }),
      ).annotate({ identifier: "DevEnvironmentAccessDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          accessDetails: __S(267, __c33, 3),
          sessionId: S.optional(S.String),
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
        }),
      ).annotate({ identifier: "StartDevEnvironmentSessionResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          workflowId: S.String.pipe(T.HttpQuery("workflowId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/workflowRuns",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartWorkflowRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
          workflowId: S.String,
        }),
      ).annotate({ identifier: "StartWorkflowRunResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopDevEnvironmentRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/session/{sessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopDevEnvironmentSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String, projectName: S.String, id: S.String, sessionId: S.String }),
      ).annotate({ identifier: "StopDevEnvironmentSessionResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          alias: S.optional(S.String),
          ides: S.optional(__S(25, __c3, 1)),
          instanceType: S.optional(S.String),
          inactivityTimeoutMinutes: S.optional(S.Number),
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDevEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          spaceName: S.String,
          projectName: S.String,
          alias: S.optional(S.String),
          ides: S.optional(__S(25, __c3, 1)),
          instanceType: S.optional(S.String),
          inactivityTimeoutMinutes: S.optional(S.Number),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateDevEnvironmentResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/spaces/{spaceName}/projects/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.optional(S.String),
          name: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProjectResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/spaces/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSpaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          displayName: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSpaceResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/session" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifySessionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ identity: S.optional(S.String) })).annotate({
        identifier: "VerifySessionResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          sourceRepositoryName: S.String.pipe(T.HttpLabel("sourceRepositoryName")),
          name: S.String.pipe(T.HttpLabel("name")),
          headCommitId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/branches/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSourceRepositoryBranchRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ref: S.optional(S.String),
          name: S.optional(S.String),
          lastUpdatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          headCommitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSourceRepositoryBranchResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/accessTokens/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccessTokenRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAccessTokenResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDevEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String, projectName: S.String, id: S.String }),
      ).annotate({ identifier: "DeleteDevEnvironmentResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/spaces/{spaceName}/projects/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String, name: S.String, displayName: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteProjectResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSourceRepositoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String, projectName: S.String, name: S.String }),
      ).annotate({ identifier: "DeleteSourceRepositoryResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/spaces/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSpaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, displayName: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteSpaceResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
