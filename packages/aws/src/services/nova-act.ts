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
  sdkId: "Nova Act",
  serviceShapeName: "AmazonNovaAgentsDataPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "nova-act" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-08-22");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
              `https://nova-act-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://nova-act-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://nova-act.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://nova-act.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://nova-act.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "InternalServerExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
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
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(121, __c15, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ModelStatus = "ACTIVE" | "LEGACY" | "DEPRECATED" | "PREVIEW" | (string & {});
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
  input: __S(131, __c16, 3) as any as S.Schema<CreateActRequest>,
  output: __S(132, __c16, 4) as any as S.Schema<CreateActResponse>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<CreateSessionRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<CreateSessionResponse>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<CreateWorkflowDefinitionRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<CreateWorkflowDefinitionResponse>,
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
}));

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
  input: __S(1, __c0, 1) as any as S.Schema<CreateWorkflowRunRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<CreateWorkflowRunResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<DeleteWorkflowDefinitionRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<DeleteWorkflowDefinitionResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<DeleteWorkflowRunRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<DeleteWorkflowRunResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetWorkflowDefinitionRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<GetWorkflowDefinitionResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<GetWorkflowRunRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<GetWorkflowRunResponse>,
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
}));

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
  input: __S(44, __c5, 4) as any as S.Schema<InvokeActStepRequest>,
  output: __S(47, __c5, 7) as any as S.Schema<InvokeActStepResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<ListActsRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<ListActsResponse>,
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
  input: __S(64, __c8, 0) as any as S.Schema<ListModelsRequest>,
  output: __S(71, __c8, 7) as any as S.Schema<ListModelsResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModels",
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(74, __c9, 2) as any as S.Schema<ListSessionsResponse>,
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
  input: __S(80, __c10, 0) as any as S.Schema<ListWorkflowDefinitionsRequest>,
  output: __S(83, __c10, 3) as any as S.Schema<ListWorkflowDefinitionsResponse>,
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
  input: __S(88, __c11, 0) as any as S.Schema<ListWorkflowRunsRequest>,
  output: __S(91, __c11, 3) as any as S.Schema<ListWorkflowRunsResponse>,
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
  input: __S(97, __c12, 1) as any as S.Schema<UpdateActRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<UpdateActResponse>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<UpdateWorkflowRunRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<UpdateWorkflowRunResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ compatibilityVersion: S.Number, sdkVersion: S.optional(S.String) }),
      ).annotate({ identifier: "ClientInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          modelId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          logGroupName: S.optional(S.String),
          clientInfo: __S(0, __c0, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkflowRunRequest" });
    case 2:
      return S.suspend(() => S.Struct({ workflowRunId: S.String, status: S.String })).annotate({
        identifier: "CreateWorkflowRunResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workflow-definitions/{workflowDefinitionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkflowDefinitionRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkflowRunRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflow-definitions/{workflowDefinitionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(SensitiveString),
          exportConfig: S.optional(__S(168, __c21, 0)),
          status: S.String,
        }),
      ).annotate({ identifier: "GetWorkflowDefinitionResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
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
          workflowRunArn: S.String,
          workflowRunId: S.String,
          status: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          modelId: S.String,
          logGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWorkflowRunResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ text: S.String })]);
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ callId: S.optional(S.String), content: __S(41, __c5, 1) }),
      ).annotate({ identifier: "CallResult" });
    case 3:
      return S.Array(__S(42, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          actId: S.String.pipe(T.HttpLabel("actId")),
          callResults: __S(43, __c5, 3),
          previousStepId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions/{sessionId}/acts/{actId}/invoke-step/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeActStepRequest" });
    case 5:
      return S.suspend(() => S.Struct({ callId: S.String, input: S.Any, name: S.String })).annotate(
        { identifier: "Call" },
      );
    case 6:
      return S.Array(__S(45, __c5, 5));
    case 7:
      return S.suspend(() => S.Struct({ calls: __S(46, __c5, 6), stepId: S.String })).annotate({
        identifier: "InvokeActStepResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.optional(S.String).pipe(T.HttpQuery("workflowRunId")),
          sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortOrder: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workflow-definitions/{workflowDefinitionName}/acts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListActsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowRunId: S.String,
          sessionId: S.String,
          actId: S.String,
          status: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          traceLocation: S.optional(__S(56, __c7, 0)),
        }),
      ).annotate({ identifier: "ActSummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ actSummaries: __S(50, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListActsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ locationType: S.String, location: S.String })).annotate({
        identifier: "TraceLocation",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientCompatibilityVersion: S.Number.pipe(T.HttpQuery("clientCompatibilityVersion")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/models" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelLifecycle: __S(160, __c20, 0),
          minimumCompatibilityVersion: S.Number,
        }),
      ).annotate({ identifier: "ModelSummary" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          aliasName: S.String,
          latestModelId: S.String,
          resolvedModelId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelAlias" });
    case 4:
      return S.Array(__S(67, __c8, 3));
    case 5:
      return S.Array(S.String);
    case 6:
      return S.suspend(() =>
        S.Struct({
          clientCompatibilityVersion: S.Number,
          supportedModelIds: __S(69, __c8, 5),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "CompatibilityInformation" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          modelSummaries: __S(66, __c8, 2),
          modelAliases: __S(68, __c8, 4),
          compatibilityInformation: __S(70, __c8, 6),
        }),
      ).annotate({ identifier: "ListModelsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortOrder: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSessionsRequest" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ sessionSummaries: __S(73, __c9, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortOrder: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workflow-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionArn: S.String,
          workflowDefinitionName: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
        }),
      ).annotate({ identifier: "WorkflowDefinitionSummary" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionSummaries: __S(82, __c10, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkflowDefinitionsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortOrder: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs",
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
          workflowRunArn: S.String,
          workflowRunId: S.String,
          status: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          traceLocation: S.optional(__S(56, __c7, 0)),
        }),
      ).annotate({ identifier: "WorkflowRunSummary" });
    case 2:
      return S.Array(__S(89, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ workflowRunSummaries: __S(90, __c11, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkflowRunsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ message: SensitiveString, type: S.optional(S.String) }),
      ).annotate({ identifier: "ActError" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          actId: S.String.pipe(T.HttpLabel("actId")),
          status: S.String,
          error: S.optional(__S(96, __c12, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions/{sessionId}/acts/{actId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateActRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "UpdateActResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
          status: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkflowRunRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(120, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ json: S.Any })]);
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, description: SensitiveString, inputSchema: __S(128, __c16, 0) }),
      ).annotate({ identifier: "ToolSpec" });
    case 2:
      return S.Array(__S(129, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          task: SensitiveString,
          toolSpecs: S.optional(__S(130, __c16, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions/{sessionId}/acts",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateActRequest" });
    case 4:
      return S.suspend(() => S.Struct({ actId: S.String, status: S.String })).annotate({
        identifier: "CreateActResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowDefinitionName: S.String.pipe(T.HttpLabel("workflowDefinitionName")),
          workflowRunId: S.String.pipe(T.HttpLabel("workflowRunId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workflow-definitions/{workflowDefinitionName}/workflow-runs/{workflowRunId}/sessions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSessionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ sessionId: S.String })).annotate({
        identifier: "CreateSessionResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(SensitiveString),
          exportConfig: S.optional(__S(168, __c21, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workflow-definitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateWorkflowDefinitionRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "CreateWorkflowDefinitionResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ s3BucketName: S.String, s3KeyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "WorkflowExportConfig" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
