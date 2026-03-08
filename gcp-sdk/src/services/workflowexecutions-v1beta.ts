// ==========================================================================
// Workflow Executions API (workflowexecutions v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "workflowexecutions",
  version: "v1beta",
  rootUrl: "https://workflowexecutions.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Step {
  /** Name of a routine within the workflow. */
  routine?: string;
  /** Name of a step within the routine. */
  step?: string;
}

export const Step: Schema.Schema<Step> = Schema.suspend(() =>
  Schema.Struct({
    routine: Schema.optional(Schema.String),
    step: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Step" }) as any as Schema.Schema<Step>;

export interface Status {
  /** A list of currently executing or last executed step names for the workflow execution currently running. If the workflow has succeeded or failed, this is the last attempted or executed step. Presently, if the current step is inside a subworkflow, the list only includes that step. In the future, the list will contain items for each step in the call stack, starting with the outermost step in the `main` subworkflow, and ending with the most deeply nested step. */
  currentSteps?: Array<Step>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    currentSteps: Schema.optional(Schema.Array(Step)),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Position {
  /** The source code line number the current instruction was generated from. */
  line?: string;
  /** The number of bytes of source code making up this stack trace element. */
  length?: string;
  /** The source code column position (of the line) the current instruction was generated from. */
  column?: string;
}

export const Position: Schema.Schema<Position> = Schema.suspend(() =>
  Schema.Struct({
    line: Schema.optional(Schema.String),
    length: Schema.optional(Schema.String),
    column: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface StackTraceElement {
  /** The step the error occurred at. */
  step?: string;
  /** The source position information of the stack trace element. */
  position?: Position;
  /** The routine where the error occurred. */
  routine?: string;
}

export const StackTraceElement: Schema.Schema<StackTraceElement> =
  Schema.suspend(() =>
    Schema.Struct({
      step: Schema.optional(Schema.String),
      position: Schema.optional(Position),
      routine: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StackTraceElement",
  }) as any as Schema.Schema<StackTraceElement>;

export interface StackTrace {
  /** An array of stack elements. */
  elements?: Array<StackTraceElement>;
}

export const StackTrace: Schema.Schema<StackTrace> = Schema.suspend(() =>
  Schema.Struct({
    elements: Schema.optional(Schema.Array(StackTraceElement)),
  }),
).annotate({ identifier: "StackTrace" }) as any as Schema.Schema<StackTrace>;

export interface Workflowexecutions_Error {
  /** Stack trace with detailed information of where error was generated. */
  stackTrace?: StackTrace;
  /** Human-readable stack trace string. */
  context?: string;
  /** Error message and data returned represented as a JSON string. */
  payload?: string;
}

export const Workflowexecutions_Error: Schema.Schema<Workflowexecutions_Error> =
  Schema.suspend(() =>
    Schema.Struct({
      stackTrace: Schema.optional(StackTrace),
      context: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Workflowexecutions_Error",
  }) as any as Schema.Schema<Workflowexecutions_Error>;

export interface Execution {
  /** Output only. Status tracks the current steps and progress data of this execution. */
  status?: Status;
  /** Output only. Output of the execution represented as a JSON string. The value can only be present if the execution's state is `SUCCEEDED`. */
  result?: string;
  /** Output only. The resource name of the execution. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name?: string;
  /** Output only. Marks the beginning of execution. */
  startTime?: string;
  /** Output only. The error which caused the execution to finish prematurely. The value is only present if the execution's state is `FAILED` or `CANCELLED`. */
  error?: Workflowexecutions_Error;
  /** The call logging level associated to this execution. */
  callLogLevel?:
    | "CALL_LOG_LEVEL_UNSPECIFIED"
    | "LOG_ALL_CALLS"
    | "LOG_ERRORS_ONLY"
    | (string & {});
  /** Output only. Current state of the execution. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "SUCCEEDED"
    | "FAILED"
    | "CANCELLED"
    | "UNAVAILABLE"
    | "QUEUED"
    | (string & {});
  /** Output only. Marks the end of execution, successful or not. */
  endTime?: string;
  /** Output only. Revision of the workflow this execution is using. */
  workflowRevisionId?: string;
  /** Input parameters of the execution represented as a JSON string. The size limit is 32KB. *Note*: If you are using the REST API directly to run your workflow, you must escape any JSON string value of `argument`. Example: `'{"argument":"{\"firstName\":\"FIRST\",\"lastName\":\"LAST\"}"}'` */
  argument?: string;
}

export const Execution: Schema.Schema<Execution> = Schema.suspend(() =>
  Schema.Struct({
    status: Schema.optional(Status),
    result: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    error: Schema.optional(Workflowexecutions_Error),
    callLogLevel: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    workflowRevisionId: Schema.optional(Schema.String),
    argument: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Execution" }) as any as Schema.Schema<Execution>;

export interface ListExecutionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The executions which match the request. */
  executions?: Array<Execution>;
}

export const ListExecutionsResponse: Schema.Schema<ListExecutionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      executions: Schema.optional(Schema.Array(Execution)),
    }),
  ).annotate({
    identifier: "ListExecutionsResponse",
  }) as any as Schema.Schema<ListExecutionsResponse>;

export interface CancelExecutionRequest {}

export const CancelExecutionRequest: Schema.Schema<CancelExecutionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelExecutionRequest",
  }) as any as Schema.Schema<CancelExecutionRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsLocationsWorkflowsExecutionsRequest {
  /** Optional. A view defining which fields should be filled in the returned execution. The API will default to the FULL view. */
  view?: "EXECUTION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Required. Name of the execution to be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name: string;
}

export const GetProjectsLocationsWorkflowsExecutionsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsWorkflowsExecutionsRequest>;

export type GetProjectsLocationsWorkflowsExecutionsResponse = Execution;
export const GetProjectsLocationsWorkflowsExecutionsResponse = Execution;

export type GetProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Returns an execution of the given name. */
export const getProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  GetProjectsLocationsWorkflowsExecutionsRequest,
  GetProjectsLocationsWorkflowsExecutionsResponse,
  GetProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkflowsExecutionsRequest,
  output: GetProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsWorkflowsExecutionsRequest {
  /** Required. Name of the execution to be cancelled. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name: string;
  /** Request body */
  body?: CancelExecutionRequest;
}

export const CancelProjectsLocationsWorkflowsExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelExecutionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsWorkflowsExecutionsRequest>;

export type CancelProjectsLocationsWorkflowsExecutionsResponse = Execution;
export const CancelProjectsLocationsWorkflowsExecutionsResponse = Execution;

export type CancelProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Cancels an execution of the given name. */
export const cancelProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  CancelProjectsLocationsWorkflowsExecutionsRequest,
  CancelProjectsLocationsWorkflowsExecutionsResponse,
  CancelProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsWorkflowsExecutionsRequest,
  output: CancelProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkflowsExecutionsRequest {
  /** Required. Name of the workflow for which an execution should be created. Format: projects/{project}/locations/{location}/workflows/{workflow} The latest revision of the workflow will be used. */
  parent: string;
  /** Request body */
  body?: Execution;
}

export const CreateProjectsLocationsWorkflowsExecutionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Execution).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsWorkflowsExecutionsRequest>;

export type CreateProjectsLocationsWorkflowsExecutionsResponse = Execution;
export const CreateProjectsLocationsWorkflowsExecutionsResponse = Execution;

export type CreateProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Creates a new execution using the latest revision of the given workflow. */
export const createProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  CreateProjectsLocationsWorkflowsExecutionsRequest,
  CreateProjectsLocationsWorkflowsExecutionsResponse,
  CreateProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkflowsExecutionsRequest,
  output: CreateProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkflowsExecutionsRequest {
  /** Required. Name of the workflow for which the executions should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow} */
  parent: string;
  /** Maximum number of executions to return per call. Max supported value depends on the selected Execution view: it's 10000 for BASIC and 100 for FULL. The default value used if the field is not specified is 100, regardless of the selected view. Values greater than the max value will be coerced down to it. */
  pageSize?: number;
  /** Optional. A view defining which fields should be filled in the returned executions. The API will default to the BASIC view. */
  view?: "EXECUTION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** A page token, received from a previous `ListExecutions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListExecutions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsWorkflowsExecutionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsWorkflowsExecutionsRequest>;

export type ListProjectsLocationsWorkflowsExecutionsResponse =
  ListExecutionsResponse;
export const ListProjectsLocationsWorkflowsExecutionsResponse =
  ListExecutionsResponse;

export type ListProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Returns a list of executions which belong to the workflow with the given name. The method returns executions of all workflow revisions. Returned executions are ordered by their start time (newest first). */
export const listProjectsLocationsWorkflowsExecutions: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkflowsExecutionsRequest,
  ListProjectsLocationsWorkflowsExecutionsResponse,
  ListProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkflowsExecutionsRequest,
  output: ListProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
