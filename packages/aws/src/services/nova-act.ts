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
  sdkId: "Nova Act",
  target: "AmazonNovaAgentsDataPlane",
  version: "2025-08-22",
  sigv4: "nova-act",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
                `https://nova-act-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://nova-act-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://nova-act.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://nova-act.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{
    readonly message: string;
    readonly retryAfterSeconds?: number;
    readonly reason?: InternalServerExceptionReason;
  }> {}
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
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type WorkflowDefinitionName = string;
export type UuidString = string;
export type Task = string | redacted.Redacted<string>;
export type ToolName = string;
export type ToolDescription = string | redacted.Redacted<string>;
export type ToolInputSchemaDocument = unknown;
export type ToolInputSchema = { json: any };
export interface ToolSpec {
  name: string;
  description: string | redacted.Redacted<string>;
  inputSchema: ToolInputSchema;
}
export type ToolSpecs = ToolSpec[];
export type ClientToken = string;
export interface CreateActRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
  sessionId: string;
  task: string | redacted.Redacted<string>;
  toolSpecs?: ToolSpec[];
  clientToken?: string;
}
export type ActStatus =
  | "RUNNING"
  | "PENDING_CLIENT_ACTION"
  | "PENDING_HUMAN_ACTION"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export interface CreateActResponse {
  actId: string;
  status: ActStatus;
}
export interface CreateSessionRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
  clientToken?: string;
}
export interface CreateSessionResponse {
  sessionId: string;
}
export type WorkflowDescription = string | redacted.Redacted<string>;
export type S3BucketName = string;
export type S3KeyPrefix = string;
export interface WorkflowExportConfig {
  s3BucketName: string;
  s3KeyPrefix?: string;
}
export interface CreateWorkflowDefinitionRequest {
  name: string;
  description?: string | redacted.Redacted<string>;
  exportConfig?: WorkflowExportConfig;
  clientToken?: string;
}
export type WorkflowDefinitionStatus = "ACTIVE" | "DELETING" | (string & {});
export interface CreateWorkflowDefinitionResponse {
  status: WorkflowDefinitionStatus;
}
export type ModelId = string;
export type CloudWatchLogGroupName = string;
export type NonBlankString = string;
export interface ClientInfo {
  compatibilityVersion: number;
  sdkVersion?: string;
}
export interface CreateWorkflowRunRequest {
  workflowDefinitionName: string;
  modelId: string;
  clientToken?: string;
  logGroupName?: string;
  clientInfo: ClientInfo;
}
export type WorkflowRunStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "DELETING"
  | (string & {});
export interface CreateWorkflowRunResponse {
  workflowRunId: string;
  status: WorkflowRunStatus;
}
export interface DeleteWorkflowDefinitionRequest {
  workflowDefinitionName: string;
}
export interface DeleteWorkflowDefinitionResponse {
  status: WorkflowDefinitionStatus;
}
export interface DeleteWorkflowRunRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
}
export interface DeleteWorkflowRunResponse {
  status: WorkflowRunStatus;
}
export interface GetWorkflowDefinitionRequest {
  workflowDefinitionName: string;
}
export type WorkflowDefinitionArn = string;
export interface GetWorkflowDefinitionResponse {
  name: string;
  arn: string;
  createdAt: Date;
  description?: string | redacted.Redacted<string>;
  exportConfig?: WorkflowExportConfig;
  status: WorkflowDefinitionStatus;
}
export interface GetWorkflowRunRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
}
export type WorkflowRunArn = string;
export interface GetWorkflowRunResponse {
  workflowRunArn: string;
  workflowRunId: string;
  status: WorkflowRunStatus;
  startedAt: Date;
  endedAt?: Date;
  modelId: string;
  logGroupName?: string;
}
export type CallId = string;
export type CallResultContent = { text: string };
export type CallResultContents = CallResultContent[];
export interface CallResult {
  callId?: string;
  content: CallResultContent[];
}
export type CallResults = CallResult[];
export interface InvokeActStepRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
  sessionId: string;
  actId: string;
  callResults: CallResult[];
  previousStepId?: string;
}
export type SensitiveDocument = unknown;
export interface Call {
  callId: string;
  input: any;
  name: string;
}
export type Calls = Call[];
export interface InvokeActStepResponse {
  calls: Call[];
  stepId: string;
}
export type MaxResults = number;
export type NextToken = string;
export type SortOrder = "Ascending" | "Descending" | (string & {});
export interface ListActsRequest {
  workflowDefinitionName: string;
  workflowRunId?: string;
  sessionId?: string;
  maxResults?: number;
  nextToken?: string;
  sortOrder?: SortOrder;
}
export type TraceLocationType = "S3" | (string & {});
export interface TraceLocation {
  locationType: TraceLocationType;
  location: string;
}
export interface ActSummary {
  workflowRunId: string;
  sessionId: string;
  actId: string;
  status: ActStatus;
  startedAt: Date;
  endedAt?: Date;
  traceLocation?: TraceLocation;
}
export type ActSummaries = ActSummary[];
export interface ListActsResponse {
  actSummaries: ActSummary[];
  nextToken?: string;
}
export interface ListModelsRequest {
  clientCompatibilityVersion: number;
}
export type ModelStatus =
  | "ACTIVE"
  | "LEGACY"
  | "DEPRECATED"
  | "PREVIEW"
  | (string & {});
export interface ModelLifecycle {
  status: ModelStatus;
}
export interface ModelSummary {
  modelId: string;
  modelLifecycle: ModelLifecycle;
  minimumCompatibilityVersion: number;
}
export type ModelSummaries = ModelSummary[];
export interface ModelAlias {
  aliasName: string;
  latestModelId: string;
  resolvedModelId?: string;
}
export type ModelAliases = ModelAlias[];
export type ModelIdList = string[];
export interface CompatibilityInformation {
  clientCompatibilityVersion: number;
  supportedModelIds: string[];
  message?: string;
}
export interface ListModelsResponse {
  modelSummaries: ModelSummary[];
  modelAliases: ModelAlias[];
  compatibilityInformation: CompatibilityInformation;
}
export interface ListSessionsRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
  maxResults?: number;
  nextToken?: string;
  sortOrder?: SortOrder;
}
export interface SessionSummary {
  sessionId: string;
}
export type SessionSummaries = SessionSummary[];
export interface ListSessionsResponse {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export interface ListWorkflowDefinitionsRequest {
  maxResults?: number;
  nextToken?: string;
  sortOrder?: SortOrder;
}
export interface WorkflowDefinitionSummary {
  workflowDefinitionArn: string;
  workflowDefinitionName: string;
  createdAt: Date;
  status: WorkflowDefinitionStatus;
}
export type WorkflowDefinitionSummaries = WorkflowDefinitionSummary[];
export interface ListWorkflowDefinitionsResponse {
  workflowDefinitionSummaries: WorkflowDefinitionSummary[];
  nextToken?: string;
}
export interface ListWorkflowRunsRequest {
  workflowDefinitionName: string;
  maxResults?: number;
  nextToken?: string;
  sortOrder?: SortOrder;
}
export interface WorkflowRunSummary {
  workflowRunArn: string;
  workflowRunId: string;
  status: WorkflowRunStatus;
  startedAt: Date;
  endedAt?: Date;
  traceLocation?: TraceLocation;
}
export type WorkflowRunSummaries = WorkflowRunSummary[];
export interface ListWorkflowRunsResponse {
  workflowRunSummaries: WorkflowRunSummary[];
  nextToken?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface ActError {
  message: string | redacted.Redacted<string>;
  type?: string;
}
export interface UpdateActRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
  sessionId: string;
  actId: string;
  status: ActStatus;
  error?: ActError;
}
export interface UpdateActResponse {}
export interface UpdateWorkflowRunRequest {
  workflowDefinitionName: string;
  workflowRunId: string;
  status: WorkflowRunStatus;
}
export interface UpdateWorkflowRunResponse {}
export type InternalServerExceptionReason =
  | "InvalidModelGeneration"
  | "RequestTokenLimitExceeded"
  | (string & {});
export type ValidationExceptionReason =
  | "FieldValidationFailed"
  | "InvalidStatus"
  | "GuardrailIntervened"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateActError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new AI task (act) within a session that can interact with tools and perform specific actions.
 */
export const createAct: API.OperationMethod<
  CreateActRequest,
  CreateActResponse,
  CreateActError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions/{sessionId}/acts",
    input: {
      workflowDefinitionName: 0,
      workflowRunId: 0,
      sessionId: 0,
      task: 0,
      toolSpecs: D.list({ name: 0, description: 0, inputSchema: { json: 0 } }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAct",
})) as any;

export type CreateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new session context within a workflow run to manage conversation state and acts.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions",
    input: {
      workflowDefinitionName: 0,
      workflowRunId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
})) as any;

export type CreateWorkflowDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workflow definition template that can be used to execute multiple workflow runs.
 */
export const createWorkflowDefinition: API.OperationMethod<
  CreateWorkflowDefinitionRequest,
  CreateWorkflowDefinitionResponse,
  CreateWorkflowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions",
    input: {
      name: 0,
      description: 0,
      exportConfig: { s3BucketName: 0, s3KeyPrefix: 0 },
      clientToken: D.m({ idempotency: true }),
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
  operationName: "CreateWorkflowDefinition",
})) as any;

export type CreateWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new execution instance of a workflow definition with specified parameters.
 */
export const createWorkflowRun: API.OperationMethod<
  CreateWorkflowRunRequest,
  CreateWorkflowRunResponse,
  CreateWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions/{workflowDefinitionName}/workflow-runs",
    input: {
      workflowDefinitionName: 0,
      modelId: 0,
      clientToken: D.m({ idempotency: true }),
      logGroupName: 0,
      clientInfo: { compatibilityVersion: 0, sdkVersion: 0 },
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
  operationName: "CreateWorkflowRun",
})) as any;

export type DeleteWorkflowDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow definition and all associated resources. This operation cannot be undone.
 */
export const deleteWorkflowDefinition: API.OperationMethod<
  DeleteWorkflowDefinitionRequest,
  DeleteWorkflowDefinitionResponse,
  DeleteWorkflowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workflow-definitions/{workflowDefinitionName}",
    input: { workflowDefinitionName: 0 },
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
  operationName: "DeleteWorkflowDefinition",
})) as any;

export type DeleteWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates and cleans up a workflow run, stopping all associated acts and sessions.
 */
export const deleteWorkflowRun: API.OperationMethod<
  DeleteWorkflowRunRequest,
  DeleteWorkflowRunResponse,
  DeleteWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
    input: { workflowDefinitionName: 0, workflowRunId: 0 },
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
  operationName: "DeleteWorkflowRun",
})) as any;

export type GetWorkflowDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and configuration of a specific workflow definition.
 */
export const getWorkflowDefinition: API.OperationMethod<
  GetWorkflowDefinitionRequest,
  GetWorkflowDefinitionResponse,
  GetWorkflowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow-definitions/{workflowDefinitionName}",
    input: { workflowDefinitionName: 0 },
    output: { createdAt: D.ts, description: D.secret },
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
  operationName: "GetWorkflowDefinition",
})) as any;

export type GetWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state, configuration, and execution details of a workflow run.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
    input: { workflowDefinitionName: 0, workflowRunId: 0 },
    output: { startedAt: D.ts, endedAt: D.ts },
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
  operationName: "GetWorkflowRun",
})) as any;

export type InvokeActStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Executes the next step of an act, processing tool call results and returning new tool calls if needed.
 */
export const invokeActStep: API.OperationMethod<
  InvokeActStepRequest,
  InvokeActStepResponse,
  InvokeActStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions/{sessionId}/acts/{actId}/invoke-step/",
    input: {
      workflowDefinitionName: 0,
      workflowRunId: 0,
      sessionId: 0,
      actId: 0,
      callResults: D.list({ callId: 0, content: D.list({ text: 0 }) }),
      previousStepId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeActStep",
})) as any;

export type ListActsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all acts within a specific session with their current status and execution details.
 */
export const listActs: API.PaginatedOperationMethod<
  ListActsRequest,
  ListActsResponse,
  ListActsError,
  Credentials | HttpClient.HttpClient,
  ActSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow-definitions/{workflowDefinitionName}/acts",
    input: {
      workflowDefinitionName: 0,
      workflowRunId: D.m({ query: "workflowRunId" }),
      sessionId: D.m({ query: "sessionId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortOrder: 0,
    },
    output: { actSummaries: D.list({ startedAt: D.ts, endedAt: D.ts }) },
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
  operationName: "ListActs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all available AI models that can be used for workflow execution, including their status and compatibility information.
 */
export const listModels: API.OperationMethod<
  ListModelsRequest,
  ListModelsResponse,
  ListModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /models",
    input: {
      clientCompatibilityVersion: D.m({ query: "clientCompatibilityVersion" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModels",
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all sessions within a specific workflow run.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
    input: {
      workflowDefinitionName: 0,
      workflowRunId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortOrder: 0,
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
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all workflow definitions in your account with optional filtering and pagination.
 */
export const listWorkflowDefinitions: API.PaginatedOperationMethod<
  ListWorkflowDefinitionsRequest,
  ListWorkflowDefinitionsResponse,
  ListWorkflowDefinitionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workflow-definitions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortOrder: 0,
    },
    output: { workflowDefinitionSummaries: D.list({ createdAt: D.ts }) },
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
  operationName: "ListWorkflowDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowDefinitionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkflowRunsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all workflow runs for a specific workflow definition with optional filtering and pagination.
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
    http: "POST /workflow-definitions/{workflowDefinitionName}/workflow-runs",
    input: {
      workflowDefinitionName: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortOrder: 0,
    },
    output: {
      workflowRunSummaries: D.list({ startedAt: D.ts, endedAt: D.ts }),
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
  operationName: "ListWorkflowRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowRunSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type UpdateActError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing act's configuration, status, or error information.
 */
export const updateAct: API.OperationMethod<
  UpdateActRequest,
  UpdateActResponse,
  UpdateActError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions/{sessionId}/acts/{actId}",
    input: {
      workflowDefinitionName: 0,
      workflowRunId: 0,
      sessionId: 0,
      actId: 0,
      status: 0,
      error: { message: 0, type: 0 },
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
  operationName: "UpdateAct",
})) as any;

export type UpdateWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration or state of an active workflow run.
 */
export const updateWorkflowRun: API.OperationMethod<
  UpdateWorkflowRunRequest,
  UpdateWorkflowRunResponse,
  UpdateWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
    input: { workflowDefinitionName: 0, workflowRunId: 0, status: 0 },
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
  operationName: "UpdateWorkflowRun",
})) as any;
