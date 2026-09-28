import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CodeCatalyst",
  target: "CodeCatalyst",
  version: "2022-09-28",
  sigv4: "CodeCatalyst",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
      if (
        !(Region != null) &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === false) {
            return err("Partition does not support FIPS.");
          }
          return e(
            `https://codecatalyst-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://codecatalyst.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === false) {
            return err("Partition does not support FIPS.");
          }
          return e(
            `https://codecatalyst-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://codecatalyst.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
    return err("No matching endpoint rule");
  },
};

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
export type DevEnvironmentRepositorySummaries =
  DevEnvironmentRepositorySummary[];
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
export type ListSourceRepositoryBranchesItems =
  ListSourceRepositoryBranchesItem[];
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
  descriptor: {
    service: svc,
    http: "PUT /v1/accessTokens",
    input: { name: 0, expiresTime: D.tsAs("date-time") },
    output: { secret: D.secret, expiresTime: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments",
    input: {
      spaceName: 0,
      projectName: 0,
      repositories: D.list({ repositoryName: 0, branchName: 0 }),
      clientToken: 0,
      alias: 0,
      ides: D.list(i_IdeConfiguration),
      instanceType: 0,
      inactivityTimeoutMinutes: 0,
      persistentStorage: { sizeInGiB: 0 },
      vpcConnectionName: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects",
    input: { spaceName: 0, displayName: 0, description: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
    input: { spaceName: 0, projectName: 0, name: 0, description: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepository",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/branches/{name}",
    input: {
      spaceName: 0,
      projectName: 0,
      sourceRepositoryName: 0,
      name: 0,
      headCommitId: 0,
    },
    output: { lastUpdatedTime: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepositoryBranch",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/accessTokens/{id}",
    input: { id: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessToken",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
    input: { spaceName: 0, projectName: 0, id: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/spaces/{spaceName}/projects/{name}",
    input: { spaceName: 0, name: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
    input: { spaceName: 0, projectName: 0, name: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceRepository",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/spaces/{name}",
    input: { name: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
    input: { spaceName: 0, projectName: 0, id: 0 },
    output: { lastUpdatedTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/projects/{name}",
    input: { spaceName: 0, name: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{name}",
    input: { spaceName: 0, projectName: 0, name: 0 },
    output: { lastUpdatedTime: D.ts, createdTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepository",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/cloneUrls",
    input: { spaceName: 0, projectName: 0, sourceRepositoryName: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepositoryCloneUrls",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{name}",
    input: { name: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/subscription",
    input: { spaceName: 0 },
    output: { pendingSubscriptionStartTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /userDetails",
    input: { id: D.m({ query: "id" }), userName: D.m({ query: "userName" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDetails",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/projects/{projectName}/workflows/{id}",
    input: { spaceName: 0, id: 0, projectName: 0 },
    output: { createdTime: D.ts, lastUpdatedTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/spaces/{spaceName}/projects/{projectName}/workflowRuns/{id}",
    input: { spaceName: 0, id: 0, projectName: 0 },
    output: { startTime: D.ts, endTime: D.ts, lastUpdatedTime: D.ts },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/accessTokens",
    input: { maxResults: 0, nextToken: 0 },
    output: { items: D.list({ expiresTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/devEnvironments",
    input: {
      spaceName: 0,
      projectName: 0,
      filters: D.list({ key: 0, values: 0, comparisonOperator: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list({ lastUpdatedTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{devEnvironmentId}/sessions",
    input: {
      spaceName: 0,
      projectName: 0,
      devEnvironmentId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list({ startedTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/eventLogs",
    input: {
      spaceName: 0,
      startTime: D.tsAs("date-time"),
      endTime: D.tsAs("date-time"),
      eventName: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list({ eventTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/projects",
    input: {
      spaceName: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list({ key: 0, values: 0, comparisonOperator: 0 }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories",
    input: { spaceName: 0, projectName: 0, nextToken: 0, maxResults: 0 },
    output: { items: D.list({ lastUpdatedTime: D.ts, createdTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/projects/{projectName}/sourceRepositories/{sourceRepositoryName}/branches",
    input: {
      spaceName: 0,
      projectName: 0,
      sourceRepositoryName: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list({ lastUpdatedTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces",
    input: { nextToken: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
  } as const,
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/projects/{projectName}/workflowRuns",
    input: {
      spaceName: 0,
      workflowId: D.m({ query: "workflowId" }),
      projectName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortBy: D.list({}),
    },
    output: {
      items: D.list({ startTime: D.ts, endTime: D.ts, lastUpdatedTime: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/spaces/{spaceName}/projects/{projectName}/workflows",
    input: {
      spaceName: 0,
      projectName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sortBy: D.list({}),
    },
    output: { items: D.list({ createdTime: D.ts, lastUpdatedTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/start",
    input: {
      spaceName: 0,
      projectName: 0,
      id: 0,
      ides: D.list(i_IdeConfiguration),
      instanceType: 0,
      inactivityTimeoutMinutes: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/session",
    input: {
      spaceName: 0,
      projectName: 0,
      id: 0,
      sessionConfiguration: {
        sessionType: 0,
        executeCommandSessionConfiguration: { command: 0, arguments: 0 },
      },
    },
    output: { accessDetails: { streamUrl: D.secret, tokenValue: D.secret } },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironmentSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/workflowRuns",
    input: {
      spaceName: 0,
      projectName: 0,
      workflowId: D.m({ query: "workflowId" }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/stop",
    input: { spaceName: 0, projectName: 0, id: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}/session/{sessionId}",
    input: { spaceName: 0, projectName: 0, id: 0, sessionId: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironmentSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/spaces/{spaceName}/projects/{projectName}/devEnvironments/{id}",
    input: {
      spaceName: 0,
      projectName: 0,
      id: 0,
      alias: 0,
      ides: D.list(i_IdeConfiguration),
      instanceType: 0,
      inactivityTimeoutMinutes: 0,
      clientToken: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/spaces/{spaceName}/projects/{name}",
    input: { spaceName: 0, name: 0, description: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v1/spaces/{name}",
    input: { name: 0, description: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
})) as any;

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
  descriptor: { service: svc, http: "GET /session" },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySession",
})) as any;

const i_IdeConfiguration: D.LazyStruct = () => ({ runtime: 0, name: 0 });
