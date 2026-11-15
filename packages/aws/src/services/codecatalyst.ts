import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "CodeCatalyst",
  service: "CodeCatalyst",
  propagate: TxXray.propagate,
} as const;

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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccessTokenName = string;
export interface CreateAccessTokenRequest {
  name: string;
  expiresTime?: Date | undefined;
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
  branchName?: string | undefined;
}
export type RepositoriesInput = RepositoryInput[];
export type ClientToken = string;
export interface IdeConfiguration {
  runtime?: string | undefined;
  name?: string | undefined;
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
  repositories?: RepositoryInput[] | undefined;
  clientToken?: string | undefined;
  alias?: string | undefined;
  ides?: IdeConfiguration[] | undefined;
  instanceType: string;
  inactivityTimeoutMinutes?: number | undefined;
  persistentStorage: PersistentStorageConfiguration;
  vpcConnectionName?: string | undefined;
}
export type Uuid = string;
export interface CreateDevEnvironmentResponse {
  spaceName: string;
  projectName: string;
  id: string;
  vpcConnectionName?: string | undefined;
}
export type ProjectDisplayName = string;
export type ProjectDescription = string;
export interface CreateProjectRequest {
  spaceName: string;
  displayName: string;
  description?: string | undefined;
}
export interface CreateProjectResponse {
  spaceName?: string | undefined;
  name: string;
  displayName?: string | undefined;
  description?: string | undefined;
}
export type SourceRepositoryDescriptionString = string;
export interface CreateSourceRepositoryRequest {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string | undefined;
}
export interface CreateSourceRepositoryResponse {
  spaceName: string;
  projectName: string;
  name: string;
  description?: string | undefined;
}
export interface CreateSourceRepositoryBranchRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
  name: string;
  headCommitId?: string | undefined;
}
export type SourceRepositoryBranchRefString = string;
export interface CreateSourceRepositoryBranchResponse {
  ref?: string | undefined;
  name?: string | undefined;
  lastUpdatedTime?: Date | undefined;
  headCommitId?: string | undefined;
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
  displayName?: string | undefined;
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
  displayName?: string | undefined;
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
  branchName?: string | undefined;
}
export type DevEnvironmentRepositorySummaries = DevEnvironmentRepositorySummary[];
export interface Ide {
  runtime?: string | undefined;
  name?: string | undefined;
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
  statusReason?: string | undefined;
  repositories: DevEnvironmentRepositorySummary[];
  alias?: string | undefined;
  ides?: Ide[] | undefined;
  instanceType: string;
  inactivityTimeoutMinutes: number;
  persistentStorage: PersistentStorage;
  vpcConnectionName?: string | undefined;
}
export interface GetProjectRequest {
  spaceName: string;
  name: string;
}
export interface GetProjectResponse {
  spaceName?: string | undefined;
  name: string;
  displayName?: string | undefined;
  description?: string | undefined;
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
  description?: string | undefined;
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
  displayName?: string | undefined;
  description?: string | undefined;
}
export interface GetSubscriptionRequest {
  spaceName: string;
}
export interface GetSubscriptionResponse {
  subscriptionType?: string | undefined;
  awsAccountName?: string | undefined;
  pendingSubscriptionType?: string | undefined;
  pendingSubscriptionStartTime?: Date | undefined;
}
export interface GetUserDetailsRequest {
  id?: string | undefined;
  userName?: string | undefined;
}
export interface EmailAddress {
  email?: string | undefined;
  verified?: boolean | undefined;
}
export interface GetUserDetailsResponse {
  userId?: string | undefined;
  userName?: string | undefined;
  displayName?: string | undefined;
  primaryEmail?: EmailAddress | undefined;
  version?: string | undefined;
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
  sourceRepositoryName?: string | undefined;
  sourceBranchName?: string | undefined;
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
  statusReasons?: WorkflowRunStatusReason[] | undefined;
  startTime: Date;
  endTime?: Date | undefined;
  lastUpdatedTime: Date;
}
export interface ListAccessTokensRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AccessTokenSummary {
  id: string;
  name: string;
  expiresTime?: Date | undefined;
}
export type AccessTokenSummaries = AccessTokenSummary[];
export interface ListAccessTokensResponse {
  items: AccessTokenSummary[];
  nextToken?: string | undefined;
}
export type StringList = string[];
export interface Filter {
  key: string;
  values: string[];
  comparisonOperator?: string | undefined;
}
export type Filters = Filter[];
export interface ListDevEnvironmentsRequest {
  spaceName: string;
  projectName?: string | undefined;
  filters?: Filter[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface DevEnvironmentSummary {
  spaceName?: string | undefined;
  projectName?: string | undefined;
  id: string;
  lastUpdatedTime: Date;
  creatorId: string;
  status: string;
  statusReason?: string | undefined;
  repositories: DevEnvironmentRepositorySummary[];
  alias?: string | undefined;
  ides?: Ide[] | undefined;
  instanceType: string;
  inactivityTimeoutMinutes: number;
  persistentStorage: PersistentStorage;
  vpcConnectionName?: string | undefined;
}
export type DevEnvironmentSummaryList = DevEnvironmentSummary[];
export interface ListDevEnvironmentsResponse {
  items: DevEnvironmentSummary[];
  nextToken?: string | undefined;
}
export interface ListDevEnvironmentSessionsRequest {
  spaceName: string;
  projectName: string;
  devEnvironmentId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
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
  nextToken?: string | undefined;
}
export interface ListEventLogsRequest {
  spaceName: string;
  startTime: Date;
  endTime: Date;
  eventName?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type OperationType = string;
export type UserType = string;
export interface UserIdentity {
  userType: string;
  principalId: string;
  userName?: string | undefined;
  awsAccountId?: string | undefined;
}
export interface ProjectInformation {
  name?: string | undefined;
  projectId?: string | undefined;
}
export interface EventPayload {
  contentType?: string | undefined;
  data?: string | undefined;
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
  projectInformation?: ProjectInformation | undefined;
  requestId?: string | undefined;
  requestPayload?: EventPayload | undefined;
  responsePayload?: EventPayload | undefined;
  errorCode?: string | undefined;
  sourceIpAddress?: string | undefined;
  userAgent?: string | undefined;
}
export type EventLogEntries = EventLogEntry[];
export interface ListEventLogsResponse {
  nextToken?: string | undefined;
  items: EventLogEntry[];
}
export type FilterKey = string;
export type ComparisonOperator = string;
export interface ProjectListFilter {
  key: string;
  values: string[];
  comparisonOperator?: string | undefined;
}
export type ProjectListFilters = ProjectListFilter[];
export interface ListProjectsRequest {
  spaceName: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: ProjectListFilter[] | undefined;
}
export interface ProjectSummary {
  name: string;
  displayName?: string | undefined;
  description?: string | undefined;
}
export type ProjectSummaries = ProjectSummary[];
export interface ListProjectsResponse {
  nextToken?: string | undefined;
  items?: ProjectSummary[] | undefined;
}
export interface ListSourceRepositoriesRequest {
  spaceName: string;
  projectName: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type SourceRepositoryIdString = string;
export interface ListSourceRepositoriesItem {
  id: string;
  name: string;
  description?: string | undefined;
  lastUpdatedTime: Date;
  createdTime: Date;
}
export type ListSourceRepositoriesItems = ListSourceRepositoriesItem[];
export interface ListSourceRepositoriesResponse {
  items?: ListSourceRepositoriesItem[] | undefined;
  nextToken?: string | undefined;
}
export interface ListSourceRepositoryBranchesRequest {
  spaceName: string;
  projectName: string;
  sourceRepositoryName: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListSourceRepositoryBranchesItem {
  ref?: string | undefined;
  name?: string | undefined;
  lastUpdatedTime?: Date | undefined;
  headCommitId?: string | undefined;
}
export type ListSourceRepositoryBranchesItems = ListSourceRepositoryBranchesItem[];
export interface ListSourceRepositoryBranchesResponse {
  nextToken?: string | undefined;
  items: ListSourceRepositoryBranchesItem[];
}
export interface ListSpacesRequest {
  nextToken?: string | undefined;
}
export interface SpaceSummary {
  name: string;
  regionName: string;
  displayName?: string | undefined;
  description?: string | undefined;
}
export type SpaceSummaries = SpaceSummary[];
export interface ListSpacesResponse {
  nextToken?: string | undefined;
  items?: SpaceSummary[] | undefined;
}
export interface WorkflowRunSortCriteria {}
export type WorkflowRunSortCriteriaList = WorkflowRunSortCriteria[];
export interface ListWorkflowRunsRequest {
  spaceName: string;
  workflowId?: string | undefined;
  projectName: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  sortBy?: WorkflowRunSortCriteria[] | undefined;
}
export interface WorkflowRunSummary {
  id: string;
  workflowId: string;
  workflowName: string;
  status: string;
  statusReasons?: WorkflowRunStatusReason[] | undefined;
  startTime: Date;
  endTime?: Date | undefined;
  lastUpdatedTime: Date;
}
export type WorkflowRunSummaries = WorkflowRunSummary[];
export interface ListWorkflowRunsResponse {
  nextToken?: string | undefined;
  items?: WorkflowRunSummary[] | undefined;
}
export interface WorkflowSortCriteria {}
export type WorkflowSortCriteriaList = WorkflowSortCriteria[];
export interface ListWorkflowsRequest {
  spaceName: string;
  projectName: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  sortBy?: WorkflowSortCriteria[] | undefined;
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
  nextToken?: string | undefined;
  items?: WorkflowSummary[] | undefined;
}
export interface StartDevEnvironmentRequest {
  spaceName: string;
  projectName: string;
  id: string;
  ides?: IdeConfiguration[] | undefined;
  instanceType?: string | undefined;
  inactivityTimeoutMinutes?: number | undefined;
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
  arguments?: string[] | undefined;
}
export interface DevEnvironmentSessionConfiguration {
  sessionType: string;
  executeCommandSessionConfiguration?: ExecuteCommandSessionConfiguration | undefined;
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
  sessionId?: string | undefined;
  spaceName: string;
  projectName: string;
  id: string;
}
export interface StartWorkflowRunRequest {
  spaceName: string;
  projectName: string;
  workflowId: string;
  clientToken?: string | undefined;
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
  alias?: string | undefined;
  ides?: IdeConfiguration[] | undefined;
  instanceType?: string | undefined;
  inactivityTimeoutMinutes?: number | undefined;
  clientToken?: string | undefined;
}
export interface UpdateDevEnvironmentResponse {
  id: string;
  spaceName: string;
  projectName: string;
  alias?: string | undefined;
  ides?: IdeConfiguration[] | undefined;
  instanceType?: string | undefined;
  inactivityTimeoutMinutes?: number | undefined;
  clientToken?: string | undefined;
}
export interface UpdateProjectRequest {
  spaceName: string;
  name: string;
  description?: string | undefined;
}
export interface UpdateProjectResponse {
  spaceName?: string | undefined;
  name?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
}
export type SpaceDescription = string;
export interface UpdateSpaceRequest {
  name: string;
  description?: string | undefined;
}
export interface UpdateSpaceResponse {
  name?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
}
export interface VerifySessionRequest {}
export interface VerifySessionResponse {
  identity?: string | undefined;
}
export type CreateAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a personal access token (PAT) for the current user. A personal access token (PAT) is similar to a password.
 * It is associated with your user identity for use across all spaces and projects in Amazon CodeCatalyst. You use PATs to access CodeCatalyst
 * from resources that include integrated development environments (IDEs) and Git-based source repositories.
 * PATs represent you in Amazon CodeCatalyst and you can manage them in your user settings.For more information, see
 * Managing personal access tokens in Amazon CodeCatalyst.
 */
export const createAccessToken: API.OperationMethod<
  CreateAccessTokenRequest & RegionInput,
  CreateAccessTokenResponse,
  CreateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<CreateAccessTokenRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<CreateAccessTokenResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessToken",
  telemetry: TELEMETRY,
  span: "CreateAccessToken",
}));

export type CreateDevEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Dev Environment in Amazon CodeCatalyst, a cloud-based development environment that you can use to quickly work on the code stored
 * in the source repositories of your project.
 *
 * When created in the Amazon CodeCatalyst console, by default a Dev Environment is configured to have a 2 core processor, 4GB of RAM, and 16GB of persistent storage. None of these
 * defaults apply to a Dev Environment created programmatically.
 */
export const createDevEnvironment: API.OperationMethod<
  CreateDevEnvironmentRequest & RegionInput,
  CreateDevEnvironmentResponse,
  CreateDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<CreateDevEnvironmentRequest>,
  output: __S(345, __c43, 1) as any as S.Schema<CreateDevEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevEnvironment",
  telemetry: TELEMETRY,
  span: "CreateDevEnvironment",
}));

export type CreateProjectError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a project in a specified space.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest & RegionInput,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<CreateProjectRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<CreateProjectResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
  telemetry: TELEMETRY,
  span: "CreateProject",
}));

export type CreateSourceRepositoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an empty Git-based source repository in a specified project. The repository is
 * created with an initial empty commit with a default branch named `main`.
 */
export const createSourceRepository: API.OperationMethod<
  CreateSourceRepositoryRequest & RegionInput,
  CreateSourceRepositoryResponse,
  CreateSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<CreateSourceRepositoryRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<CreateSourceRepositoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepository",
  telemetry: TELEMETRY,
  span: "CreateSourceRepository",
}));

export type CreateSourceRepositoryBranchError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a branch in a specified source repository in Amazon CodeCatalyst.
 *
 * This API only creates a branch in a source repository hosted in Amazon CodeCatalyst. You cannot use this API to create a branch in a linked repository.
 */
export const createSourceRepositoryBranch: API.OperationMethod<
  CreateSourceRepositoryBranchRequest & RegionInput,
  CreateSourceRepositoryBranchResponse,
  CreateSourceRepositoryBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateSourceRepositoryBranchRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateSourceRepositoryBranchResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceRepositoryBranch",
  telemetry: TELEMETRY,
  span: "CreateSourceRepositoryBranch",
}));

export type DeleteAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified personal access token (PAT). A personal access token can only be deleted by the user who created it.
 */
export const deleteAccessToken: API.OperationMethod<
  DeleteAccessTokenRequest & RegionInput,
  DeleteAccessTokenResponse,
  DeleteAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DeleteAccessTokenRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteAccessTokenResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessToken",
  telemetry: TELEMETRY,
  span: "DeleteAccessToken",
}));

export type DeleteDevEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Dev Environment.
 */
export const deleteDevEnvironment: API.OperationMethod<
  DeleteDevEnvironmentRequest & RegionInput,
  DeleteDevEnvironmentResponse,
  DeleteDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteDevEnvironmentRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<DeleteDevEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEnvironment",
  telemetry: TELEMETRY,
  span: "DeleteDevEnvironment",
}));

export type DeleteProjectError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a project in a space.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest & RegionInput,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteProjectRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<DeleteProjectResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
  telemetry: TELEMETRY,
  span: "DeleteProject",
}));

export type DeleteSourceRepositoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a source repository in Amazon CodeCatalyst. You cannot use this API to delete a linked repository. It can only be used to delete a Amazon CodeCatalyst source repository.
 */
export const deleteSourceRepository: API.OperationMethod<
  DeleteSourceRepositoryRequest & RegionInput,
  DeleteSourceRepositoryResponse,
  DeleteSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DeleteSourceRepositoryRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<DeleteSourceRepositoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceRepository",
  telemetry: TELEMETRY,
  span: "DeleteSourceRepository",
}));

export type DeleteSpaceError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a space.
 *
 * Deleting a space cannot be undone. Additionally, since space names must be unique across Amazon CodeCatalyst, you cannot reuse names of deleted spaces.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceRequest & RegionInput,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DeleteSpaceRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<DeleteSpaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
  telemetry: TELEMETRY,
  span: "DeleteSpace",
}));

export type GetDevEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a Dev Environment for a source repository in a project. Dev Environments are specific to the user who creates them.
 */
export const getDevEnvironment: API.OperationMethod<
  GetDevEnvironmentRequest & RegionInput,
  GetDevEnvironmentResponse,
  GetDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetDevEnvironmentRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<GetDevEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEnvironment",
  telemetry: TELEMETRY,
  span: "GetDevEnvironment",
}));

export type GetProjectError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a project.
 */
export const getProject: API.OperationMethod<
  GetProjectRequest & RegionInput,
  GetProjectResponse,
  GetProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<GetProjectRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<GetProjectResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProject",
  telemetry: TELEMETRY,
  span: "GetProject",
}));

export type GetSourceRepositoryError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a source repository.
 */
export const getSourceRepository: API.OperationMethod<
  GetSourceRepositoryRequest & RegionInput,
  GetSourceRepositoryResponse,
  GetSourceRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetSourceRepositoryRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<GetSourceRepositoryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepository",
  telemetry: TELEMETRY,
  span: "GetSourceRepository",
}));

export type GetSourceRepositoryCloneUrlsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the URLs that can be used with a Git client to clone a source
 * repository.
 */
export const getSourceRepositoryCloneUrls: API.OperationMethod<
  GetSourceRepositoryCloneUrlsRequest & RegionInput,
  GetSourceRepositoryCloneUrlsResponse,
  GetSourceRepositoryCloneUrlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetSourceRepositoryCloneUrlsRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<GetSourceRepositoryCloneUrlsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceRepositoryCloneUrls",
  telemetry: TELEMETRY,
  span: "GetSourceRepositoryCloneUrls",
}));

export type GetSpaceError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an space.
 */
export const getSpace: API.OperationMethod<
  GetSpaceRequest & RegionInput,
  GetSpaceResponse,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetSpaceRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<GetSpaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
  telemetry: TELEMETRY,
  span: "GetSpace",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the Amazon Web Services account used for billing purposes
 * and the billing plan for the space.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest & RegionInput,
  GetSubscriptionResponse,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetSubscriptionRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<GetSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
  telemetry: TELEMETRY,
  span: "GetSubscription",
}));

export type GetUserDetailsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a user.
 */
export const getUserDetails: API.OperationMethod<
  GetUserDetailsRequest & RegionInput,
  GetUserDetailsResponse,
  GetUserDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetUserDetailsRequest>,
  output: __S(122, __c15, 2) as any as S.Schema<GetUserDetailsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDetails",
  telemetry: TELEMETRY,
  span: "GetUserDetails",
}));

export type GetWorkflowError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest & RegionInput,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<GetWorkflowRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<GetWorkflowResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
  telemetry: TELEMETRY,
  span: "GetWorkflow",
}));

export type GetWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified run of a workflow.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest & RegionInput,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetWorkflowRunRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<GetWorkflowRunResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
  telemetry: TELEMETRY,
  span: "GetWorkflowRun",
}));

export type ListAccessTokensError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all personal access tokens (PATs) associated with the user who calls the API. You can only list PATs associated with your Amazon Web Services Builder ID.
 */
export const listAccessTokens: API.PaginatedOperationMethod<
  ListAccessTokensRequest & RegionInput,
  ListAccessTokensResponse,
  ListAccessTokensError,
  Credentials | HttpClient.HttpClient,
  AccessTokenSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListAccessTokensRequest>,
  output: __S(163, __c20, 3) as any as S.Schema<ListAccessTokensResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAccessTokens",
})) as any;

export type ListDevEnvironmentsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of Dev Environments in a project.
 */
export const listDevEnvironments: API.PaginatedOperationMethod<
  ListDevEnvironmentsRequest & RegionInput,
  ListDevEnvironmentsResponse,
  ListDevEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  DevEnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListDevEnvironmentsRequest>,
  output: __S(171, __c21, 3) as any as S.Schema<ListDevEnvironmentsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDevEnvironments",
})) as any;

export type ListDevEnvironmentSessionsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of active sessions for a Dev Environment in a project.
 */
export const listDevEnvironmentSessions: API.PaginatedOperationMethod<
  ListDevEnvironmentSessionsRequest & RegionInput,
  ListDevEnvironmentSessionsResponse,
  ListDevEnvironmentSessionsError,
  Credentials | HttpClient.HttpClient,
  DevEnvironmentSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListDevEnvironmentSessionsRequest>,
  output: __S(195, __c24, 3) as any as S.Schema<ListDevEnvironmentSessionsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEnvironmentSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDevEnvironmentSessions",
})) as any;

export type ListEventLogsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
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
  ListEventLogsRequest & RegionInput,
  ListEventLogsResponse,
  ListEventLogsError,
  Credentials | HttpClient.HttpClient,
  EventLogEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListEventLogsRequest>,
  output: __S(206, __c25, 6) as any as S.Schema<ListEventLogsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventLogs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEventLogs",
})) as any;

export type ListProjectsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of projects.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest & RegionInput,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListProjectsRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<ListProjectsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProjects",
})) as any;

export type ListSourceRepositoriesError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of source repositories in a project.
 */
export const listSourceRepositories: API.PaginatedOperationMethod<
  ListSourceRepositoriesRequest & RegionInput,
  ListSourceRepositoriesResponse,
  ListSourceRepositoriesError,
  Credentials | HttpClient.HttpClient,
  ListSourceRepositoriesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListSourceRepositoriesRequest>,
  output: __S(219, __c27, 3) as any as S.Schema<ListSourceRepositoriesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSourceRepositories",
})) as any;

export type ListSourceRepositoryBranchesError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of branches in a specified source repository.
 */
export const listSourceRepositoryBranches: API.PaginatedOperationMethod<
  ListSourceRepositoryBranchesRequest & RegionInput,
  ListSourceRepositoryBranchesResponse,
  ListSourceRepositoryBranchesError,
  Credentials | HttpClient.HttpClient,
  ListSourceRepositoryBranchesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListSourceRepositoryBranchesRequest>,
  output: __S(226, __c28, 2) as any as S.Schema<ListSourceRepositoryBranchesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceRepositoryBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSourceRepositoryBranches",
})) as any;

export type ListSpacesError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of spaces.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesRequest & RegionInput,
  ListSpacesResponse,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListSpacesRequest>,
  output: __S(234, __c29, 2) as any as S.Schema<ListSpacesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "items" } as const,
  telemetry: TELEMETRY,
  span: "ListSpaces",
})) as any;

export type ListWorkflowRunsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of workflow runs of a specified workflow.
 */
export const listWorkflowRuns: API.PaginatedOperationMethod<
  ListWorkflowRunsRequest & RegionInput,
  ListWorkflowRunsResponse,
  ListWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListWorkflowRunsRequest>,
  output: __S(243, __c30, 3) as any as S.Schema<ListWorkflowRunsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListWorkflowRuns",
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of workflows in a specified project.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest & RegionInput,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(251, __c31, 3) as any as S.Schema<ListWorkflowsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListWorkflows",
})) as any;

export type StartDevEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a specified Dev Environment and puts it into an active state.
 */
export const startDevEnvironment: API.OperationMethod<
  StartDevEnvironmentRequest & RegionInput,
  StartDevEnvironmentResponse,
  StartDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<StartDevEnvironmentRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<StartDevEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironment",
  telemetry: TELEMETRY,
  span: "StartDevEnvironment",
}));

export type StartDevEnvironmentSessionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a session for a specified Dev Environment.
 */
export const startDevEnvironmentSession: API.OperationMethod<
  StartDevEnvironmentSessionRequest & RegionInput,
  StartDevEnvironmentSessionResponse,
  StartDevEnvironmentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(274, __c34, 2) as any as S.Schema<StartDevEnvironmentSessionRequest>,
  output: __S(276, __c34, 4) as any as S.Schema<StartDevEnvironmentSessionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDevEnvironmentSession",
  telemetry: TELEMETRY,
  span: "StartDevEnvironmentSession",
}));

export type StartWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Begins a run of a specified workflow.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest & RegionInput,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<StartWorkflowRunRequest>,
  output: __S(281, __c35, 1) as any as S.Schema<StartWorkflowRunResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
  telemetry: TELEMETRY,
  span: "StartWorkflowRun",
}));

export type StopDevEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Pauses a specified Dev Environment and places it in a non-running state. Stopped Dev Environments do not consume compute minutes.
 */
export const stopDevEnvironment: API.OperationMethod<
  StopDevEnvironmentRequest & RegionInput,
  StopDevEnvironmentResponse,
  StopDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<StopDevEnvironmentRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<StopDevEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironment",
  telemetry: TELEMETRY,
  span: "StopDevEnvironment",
}));

export type StopDevEnvironmentSessionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a session for a specified Dev Environment.
 */
export const stopDevEnvironmentSession: API.OperationMethod<
  StopDevEnvironmentSessionRequest & RegionInput,
  StopDevEnvironmentSessionResponse,
  StopDevEnvironmentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<StopDevEnvironmentSessionRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<StopDevEnvironmentSessionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDevEnvironmentSession",
  telemetry: TELEMETRY,
  span: "StopDevEnvironmentSession",
}));

export type UpdateDevEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes one or more values for a Dev Environment. Updating certain values of the Dev Environment will cause a restart.
 */
export const updateDevEnvironment: API.OperationMethod<
  UpdateDevEnvironmentRequest & RegionInput,
  UpdateDevEnvironmentResponse,
  UpdateDevEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UpdateDevEnvironmentRequest>,
  output: __S(305, __c38, 1) as any as S.Schema<UpdateDevEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevEnvironment",
  telemetry: TELEMETRY,
  span: "UpdateDevEnvironment",
}));

export type UpdateProjectError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes one or more values for a project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest & RegionInput,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<UpdateProjectRequest>,
  output: __S(313, __c39, 1) as any as S.Schema<UpdateProjectResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
  telemetry: TELEMETRY,
  span: "UpdateProject",
}));

export type UpdateSpaceError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes one or more values for a space.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceRequest & RegionInput,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<UpdateSpaceRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<UpdateSpaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
  telemetry: TELEMETRY,
  span: "UpdateSpace",
}));

export type VerifySessionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Verifies whether the calling user has a valid Amazon CodeCatalyst login and session. If successful, this returns the ID of the user in Amazon CodeCatalyst.
 */
export const verifySession: API.OperationMethod<
  VerifySessionRequest & RegionInput,
  VerifySessionResponse,
  VerifySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<VerifySessionRequest>,
  output: __S(329, __c41, 1) as any as S.Schema<VerifySessionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySession",
  telemetry: TELEMETRY,
  span: "VerifySession",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
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
function __c1(j: number): any {
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
function __c2(j: number): any {
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAccessTokenResponse" });
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
function __c5(j: number): any {
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
function __c7(j: number): any {
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
function __c8(j: number): any {
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
          repositories: __S(353, __c44, 1),
          alias: S.optional(S.String),
          ides: S.optional(__S(361, __c45, 1)),
          instanceType: S.String,
          inactivityTimeoutMinutes: S.Number,
          persistentStorage: __S(354, __c44, 2),
          vpcConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDevEnvironmentResponse" });
  }
}
function __c9(j: number): any {
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
function __c10(j: number): any {
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
function __c11(j: number): any {
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/spaces/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSpaceRequest" });
  }
}
function __c13(j: number): any {
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
function __c14(j: number): any {
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
function __c15(j: number): any {
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
          primaryEmail: S.optional(__S(121, __c15, 1)),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetUserDetailsResponse" });
  }
}
function __c16(j: number): any {
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
          definition: __S(136, __c17, 0),
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          runMode: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "GetWorkflowResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String })).annotate({
        identifier: "WorkflowDefinition",
      });
  }
}
function __c18(j: number): any {
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
          statusReasons: S.optional(__S(152, __c19, 0)),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetWorkflowRunResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(24, __c3, 0));
  }
}
function __c20(j: number): any {
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
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(162, __c20, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessTokensResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.optional(S.String),
          filters: S.optional(__S(177, __c22, 1)),
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
          repositories: __S(353, __c44, 1),
          alias: S.optional(S.String),
          ides: S.optional(__S(361, __c45, 1)),
          instanceType: S.String,
          inactivityTimeoutMinutes: S.Number,
          persistentStorage: __S(354, __c44, 2),
          vpcConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DevEnvironmentSummary" });
    case 2:
      return S.Array(__S(169, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(170, __c21, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDevEnvironmentsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          key: S.String,
          values: __S(184, __c23, 0),
          comparisonOperator: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(176, __c22, 0));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c24(j: number): any {
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
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(194, __c24, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDevEnvironmentSessionsResponse" });
  }
}
function __c25(j: number): any {
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
          userIdentity: __S(201, __c25, 1),
          projectInformation: S.optional(__S(202, __c25, 2)),
          requestId: S.optional(S.String),
          requestPayload: S.optional(__S(203, __c25, 3)),
          responsePayload: S.optional(__S(203, __c25, 3)),
          errorCode: S.optional(S.String),
          sourceIpAddress: S.optional(S.String),
          userAgent: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventLogEntry" });
    case 5:
      return S.Array(__S(204, __c25, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(205, __c25, 5) }),
      ).annotate({ identifier: "ListEventLogsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(177, __c22, 1)),
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
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(210, __c26, 2)) }),
      ).annotate({ identifier: "ListProjectsResponse" });
  }
}
function __c27(j: number): any {
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
      return S.Array(__S(217, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(218, __c27, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSourceRepositoriesResponse" });
  }
}
function __c28(j: number): any {
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
      return S.Array(__S(8, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(225, __c28, 1) }),
      ).annotate({ identifier: "ListSourceRepositoryBranchesResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/spaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSpacesRequest" });
    case 1:
      return S.Array(__S(104, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(233, __c29, 1)) }),
      ).annotate({ identifier: "ListSpacesResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          workflowId: S.optional(S.String).pipe(T.HttpQuery("workflowId")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortBy: S.optional(__S(152, __c19, 0)),
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
          statusReasons: S.optional(__S(152, __c19, 0)),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "WorkflowRunSummary" });
    case 2:
      return S.Array(__S(241, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(242, __c30, 2)) }),
      ).annotate({ identifier: "ListWorkflowRunsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          sortBy: S.optional(__S(152, __c19, 0)),
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
          definition: __S(136, __c17, 0),
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          runMode: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "WorkflowSummary" });
    case 2:
      return S.Array(__S(249, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(250, __c31, 2)) }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          ides: S.optional(__S(361, __c45, 1)),
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
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceName: S.String, projectName: S.String, id: S.String, status: S.String }),
      ).annotate({ identifier: "StartDevEnvironmentResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ command: S.String, arguments: S.optional(__S(184, __c23, 0)) }),
      ).annotate({ identifier: "ExecuteCommandSessionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionType: S.String,
          executeCommandSessionConfiguration: S.optional(__S(272, __c34, 0)),
        }),
      ).annotate({ identifier: "DevEnvironmentSessionConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          sessionConfiguration: __S(273, __c34, 1),
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
          accessDetails: __S(275, __c34, 3),
          sessionId: S.optional(S.String),
          spaceName: S.String,
          projectName: S.String,
          id: S.String,
        }),
      ).annotate({ identifier: "StartDevEnvironmentSessionResponse" });
  }
}
function __c35(j: number): any {
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
function __c36(j: number): any {
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
function __c37(j: number): any {
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
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          id: S.String.pipe(T.HttpLabel("id")),
          alias: S.optional(S.String),
          ides: S.optional(__S(361, __c45, 1)),
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
          ides: S.optional(__S(361, __c45, 1)),
          instanceType: S.optional(S.String),
          inactivityTimeoutMinutes: S.optional(S.Number),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateDevEnvironmentResponse" });
  }
}
function __c39(j: number): any {
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
function __c40(j: number): any {
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
function __c41(j: number): any {
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
function __c42(j: number): any {
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
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceName: S.String.pipe(T.HttpLabel("spaceName")),
          projectName: S.String.pipe(T.HttpLabel("projectName")),
          repositories: S.optional(__S(353, __c44, 1)),
          clientToken: S.optional(S.String),
          alias: S.optional(S.String),
          ides: S.optional(__S(361, __c45, 1)),
          instanceType: S.String,
          inactivityTimeoutMinutes: S.optional(S.Number),
          persistentStorage: __S(354, __c44, 2),
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
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, branchName: S.optional(S.String) }),
      ).annotate({ identifier: "RepositoryInput" });
    case 1:
      return S.Array(__S(352, __c44, 0));
    case 2:
      return S.suspend(() => S.Struct({ sizeInGiB: S.Number })).annotate({
        identifier: "PersistentStorageConfiguration",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ runtime: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "IdeConfiguration" });
    case 1:
      return S.Array(__S(360, __c45, 0));
  }
}
function __c46(j: number): any {
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
function __c47(j: number): any {
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
function __c48(j: number): any {
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
