// ==========================================================================
// Workflow Executions API (workflowexecutions v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "workflowexecutions",
  version: "v1",
  rootUrl: "https://workflowexecutions.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Step {
  /** Name of a step within the routine. */
  step?: string;
  /** Name of a routine within the workflow. */
  routine?: string;
}

export const Step: Schema.Schema<Step> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      step: Schema.optional(Schema.String),
      routine: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Step" }) as any as Schema.Schema<Step>;

export interface Status {
  /** A list of currently executing or last executed step names for the workflow execution currently running. If the workflow has succeeded or failed, this is the last attempted or executed step. Presently, if the current step is inside a subworkflow, the list only includes that step. In the future, the list will contain items for each step in the call stack, starting with the outermost step in the `main` subworkflow, and ending with the most deeply nested step. */
  currentSteps?: Array<Step>;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currentSteps: Schema.optional(Schema.Array(Step)),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface PubsubMessage {
  /** Optional. If non-empty, identifies related messages for which publish order should be respected. If a `Subscription` has `enable_message_ordering` set to `true`, messages published with the same non-empty `ordering_key` value will be delivered to subscribers in the order in which they are received by the Pub/Sub system. All `PubsubMessage`s published in a given `PublishRequest` must specify the same `ordering_key` value. For more information, see [ordering messages](https://cloud.google.com/pubsub/docs/ordering). */
  orderingKey?: string;
  /** The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. */
  publishTime?: string;
  /** Optional. Attributes for this message. If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription. */
  attributes?: Record<string, string>;
  /** ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. */
  messageId?: string;
  /** Optional. The message data field. If this field is empty, the message must contain at least one attribute. */
  data?: string;
}

export const PubsubMessage: Schema.Schema<PubsubMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      orderingKey: Schema.optional(Schema.String),
      publishTime: Schema.optional(Schema.String),
      attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      messageId: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PubsubMessage",
  }) as any as Schema.Schema<PubsubMessage>;

export interface TriggerPubsubExecutionRequest {
  /** Required. LINT: LEGACY_NAMES The query parameter value for __GCP_CloudEventsMode, set by the Eventarc service when configuring triggers. */
  GCPCloudEventsMode?: string;
  /** Required. The message of the Pub/Sub push notification. */
  message?: PubsubMessage;
  /** The number of attempts that have been made to deliver this message. This is set by Pub/Sub for subscriptions that have the "dead letter" feature enabled, and hence provided here for compatibility, but is ignored by Workflows. */
  deliveryAttempt?: number;
  /** Required. The subscription of the Pub/Sub push notification. Format: projects/{project}/subscriptions/{sub} */
  subscription?: string;
}

export const TriggerPubsubExecutionRequest: Schema.Schema<TriggerPubsubExecutionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      GCPCloudEventsMode: Schema.optional(Schema.String),
      message: Schema.optional(PubsubMessage),
      deliveryAttempt: Schema.optional(Schema.Number),
      subscription: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TriggerPubsubExecutionRequest",
  }) as any as Schema.Schema<TriggerPubsubExecutionRequest>;

export interface Position {
  /** The source code line number the current instruction was generated from. */
  line?: string;
  /** The number of bytes of source code making up this stack trace element. */
  length?: string;
  /** The source code column position (of the line) the current instruction was generated from. */
  column?: string;
}

export const Position: Schema.Schema<Position> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      line: Schema.optional(Schema.String),
      length: Schema.optional(Schema.String),
      column: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface StackTraceElement {
  /** The routine where the error occurred. */
  routine?: string;
  /** The step the error occurred at. */
  step?: string;
  /** The source position information of the stack trace element. */
  position?: Position;
}

export const StackTraceElement: Schema.Schema<StackTraceElement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      routine: Schema.optional(Schema.String),
      step: Schema.optional(Schema.String),
      position: Schema.optional(Position),
    }),
  ).annotate({
    identifier: "StackTraceElement",
  }) as any as Schema.Schema<StackTraceElement>;

export interface StackTrace {
  /** An array of stack elements. */
  elements?: Array<StackTraceElement>;
}

export const StackTrace: Schema.Schema<StackTrace> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      elements: Schema.optional(Schema.Array(StackTraceElement)),
    }),
  ).annotate({ identifier: "StackTrace" }) as any as Schema.Schema<StackTrace>;

export interface Workflowexecutions_Error {
  /** Human-readable stack trace string. */
  context?: string;
  /** Stack trace with detailed information of where error was generated. */
  stackTrace?: StackTrace;
  /** Error message and data returned represented as a JSON string. */
  payload?: string;
}

export const Workflowexecutions_Error: Schema.Schema<Workflowexecutions_Error> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      context: Schema.optional(Schema.String),
      stackTrace: Schema.optional(StackTrace),
      payload: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Workflowexecutions_Error",
  }) as any as Schema.Schema<Workflowexecutions_Error>;

export interface StateError {
  /** Provides specifics about the error. */
  details?: string;
  /** The type of this state error. */
  type?: "TYPE_UNSPECIFIED" | "KMS_ERROR" | (string & {});
}

export const StateError: Schema.Schema<StateError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "StateError" }) as any as Schema.Schema<StateError>;

export interface Execution {
  /** Input parameters of the execution represented as a JSON string. The size limit is 32KB. *Note*: If you are using the REST API directly to run your workflow, you must escape any JSON string value of `argument`. Example: `'{"argument":"{\"firstName\":\"FIRST\",\"lastName\":\"LAST\"}"}'` */
  argument?: string;
  /** Output only. Measures the duration of the execution. */
  duration?: string;
  /** Output only. Status tracks the current steps and progress data of this execution. */
  status?: Status;
  /** Output only. Output of the execution represented as a JSON string. The value can only be present if the execution's state is `SUCCEEDED`. */
  result?: string;
  /** Output only. Revision of the workflow this execution is using. */
  workflowRevisionId?: string;
  /** Output only. Marks the creation of the execution. */
  createTime?: string;
  /** Output only. Marks the end of execution, successful or not. */
  endTime?: string;
  /** Optional. If set to true, the execution will not be backlogged when the concurrency quota is exhausted. The backlog execution starts when the concurrency quota becomes available. */
  disableConcurrencyQuotaOverflowBuffering?: boolean;
  /** Optional. Describes the execution history level to apply to this execution. If not specified, the execution history level is determined by its workflow's execution history level. If the levels are different, the executionHistoryLevel overrides the workflow's execution history level for this execution. */
  executionHistoryLevel?:
    | "EXECUTION_HISTORY_LEVEL_UNSPECIFIED"
    | "EXECUTION_HISTORY_BASIC"
    | "EXECUTION_HISTORY_DETAILED"
    | (string & {});
  /** Output only. The error which caused the execution to finish prematurely. The value is only present if the execution's state is `FAILED` or `CANCELLED`. */
  error?: Workflowexecutions_Error;
  /** Output only. The resource name of the execution. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name?: string;
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
  /** The call logging level associated to this execution. */
  callLogLevel?:
    | "CALL_LOG_LEVEL_UNSPECIFIED"
    | "LOG_ALL_CALLS"
    | "LOG_ERRORS_ONLY"
    | "LOG_NONE"
    | (string & {});
  /** Labels associated with this execution. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. By default, labels are inherited from the workflow but are overridden by any labels associated with the execution. */
  labels?: Record<string, string>;
  /** Output only. Error regarding the state of the Execution resource. For example, this field will have error details if the execution data is unavailable due to revoked KMS key permissions. */
  stateError?: StateError;
  /** Output only. Marks the beginning of execution. Note that this will be the same as `createTime` for executions that start immediately. */
  startTime?: string;
}

export const Execution: Schema.Schema<Execution> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      argument: Schema.optional(Schema.String),
      duration: Schema.optional(Schema.String),
      status: Schema.optional(Status),
      result: Schema.optional(Schema.String),
      workflowRevisionId: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      disableConcurrencyQuotaOverflowBuffering: Schema.optional(Schema.Boolean),
      executionHistoryLevel: Schema.optional(Schema.String),
      error: Schema.optional(Workflowexecutions_Error),
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      callLogLevel: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      stateError: Schema.optional(StateError),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Execution" }) as any as Schema.Schema<Execution>;

export interface ListExecutionsResponse {
  /** The executions which match the request. */
  executions?: Array<Execution>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListExecutionsResponse: Schema.Schema<ListExecutionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executions: Schema.optional(Schema.Array(Execution)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListExecutionsResponse",
  }) as any as Schema.Schema<ListExecutionsResponse>;

export interface StepEntryMetadata {
  /** Progress type of this step entry. */
  progressType?:
    | "PROGRESS_TYPE_UNSPECIFIED"
    | "PROGRESS_TYPE_FOR"
    | "PROGRESS_TYPE_SWITCH"
    | "PROGRESS_TYPE_RETRY"
    | "PROGRESS_TYPE_PARALLEL_FOR"
    | "PROGRESS_TYPE_PARALLEL_BRANCH"
    | (string & {});
  /** Progress number represents the current state of the current progress. eg: A step entry represents the 4th iteration in a progress of PROGRESS_TYPE_FOR. Note: This field is only populated when an iteration exists and the starting value is 1. */
  progressNumber?: string;
  /** Expected iteration represents the expected number of iterations in the step's progress. */
  expectedIteration?: string;
  /** Child thread id that this step entry belongs to. */
  threadId?: string;
}

export const StepEntryMetadata: Schema.Schema<StepEntryMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      progressType: Schema.optional(Schema.String),
      progressNumber: Schema.optional(Schema.String),
      expectedIteration: Schema.optional(Schema.String),
      threadId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StepEntryMetadata",
  }) as any as Schema.Schema<StepEntryMetadata>;

export interface CancelExecutionRequest {}

export const CancelExecutionRequest: Schema.Schema<CancelExecutionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelExecutionRequest",
  }) as any as Schema.Schema<CancelExecutionRequest>;

export interface Exception {
  /** Error message represented as a JSON string. */
  payload?: string;
}

export const Exception: Schema.Schema<Exception> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      payload: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Exception" }) as any as Schema.Schema<Exception>;

export interface Callback {
  /** Output only. The resource name of the callback. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}/callback/{callback} */
  name?: string;
  /** Output only. The payloads received by the callback that have not been processed by a waiting execution step. */
  availablePayloads?: Array<string>;
  /** Output only. The method accepted by the callback. For example: GET, POST, PUT. */
  method?: string;
  /** Output only. Number of execution steps waiting on this callback. */
  waiters?: string;
}

export const Callback: Schema.Schema<Callback> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      availablePayloads: Schema.optional(Schema.Array(Schema.String)),
      method: Schema.optional(Schema.String),
      waiters: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Callback" }) as any as Schema.Schema<Callback>;

export interface VariableData {
  /** Variables that are associated with this step. */
  variables?: Record<string, unknown>;
}

export const VariableData: Schema.Schema<VariableData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "VariableData",
  }) as any as Schema.Schema<VariableData>;

export interface DeleteExecutionHistoryRequest {}

export const DeleteExecutionHistoryRequest: Schema.Schema<DeleteExecutionHistoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteExecutionHistoryRequest",
  }) as any as Schema.Schema<DeleteExecutionHistoryRequest>;

export interface NavigationInfo {
  /** The step entry, if any, that can be reached by "stepping out" of the current workflow being executed. */
  parent?: string;
  /** The index of the previous step in the current workflow, if any. */
  previous?: string;
  /** The index of the next step in the current workflow, if any. */
  next?: string;
  /** Step entries that can be reached by "stepping into" e.g. a subworkflow call. */
  children?: Array<string>;
}

export const NavigationInfo: Schema.Schema<NavigationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      previous: Schema.optional(Schema.String),
      next: Schema.optional(Schema.String),
      children: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "NavigationInfo",
  }) as any as Schema.Schema<NavigationInfo>;

export interface StepEntry {
  /** Output only. The numeric ID of this step entry, used for navigation. */
  entryId?: string;
  /** Output only. The state of the step entry. */
  state?:
    | "STATE_UNSPECIFIED"
    | "STATE_IN_PROGRESS"
    | "STATE_SUCCEEDED"
    | "STATE_FAILED"
    | "STATE_CANCELLED"
    | (string & {});
  /** Output only. The VariableData associated with this step. */
  variableData?: VariableData;
  /** Output only. The StepEntryMetadata associated with this step. */
  stepEntryMetadata?: StepEntryMetadata;
  /** Output only. The most recently updated time of the step entry. */
  updateTime?: string;
  /** Output only. The exception thrown by the step entry. */
  exception?: Exception;
  /** Output only. The full resource name of the step entry. Each step entry has a unique entry ID, which is a monotonically increasing counter. Step entry names have the format: `projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}/stepEntries/{step_entry}`. */
  name?: string;
  /** Output only. The name of the routine this step entry belongs to. A routine name is the subworkflow name defined in the YAML source code. The top level routine name is `main`. */
  routine?: string;
  /** Output only. The name of the step this step entry belongs to. */
  step?: string;
  /** Output only. The type of the step this step entry belongs to. */
  stepType?:
    | "STEP_TYPE_UNSPECIFIED"
    | "STEP_ASSIGN"
    | "STEP_STD_LIB_CALL"
    | "STEP_CONNECTOR_CALL"
    | "STEP_SUBWORKFLOW_CALL"
    | "STEP_CALL"
    | "STEP_SWITCH"
    | "STEP_CONDITION"
    | "STEP_FOR"
    | "STEP_FOR_ITERATION"
    | "STEP_PARALLEL_FOR"
    | "STEP_PARALLEL_BRANCH"
    | "STEP_PARALLEL_BRANCH_ENTRY"
    | "STEP_TRY_RETRY_EXCEPT"
    | "STEP_TRY"
    | "STEP_RETRY"
    | "STEP_EXCEPT"
    | "STEP_RETURN"
    | "STEP_RAISE"
    | "STEP_GOTO"
    | (string & {});
  /** Output only. The creation time of the step entry. */
  createTime?: string;
  /** Output only. The NavigationInfo associated with this step. */
  navigationInfo?: NavigationInfo;
}

export const StepEntry: Schema.Schema<StepEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entryId: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      variableData: Schema.optional(VariableData),
      stepEntryMetadata: Schema.optional(StepEntryMetadata),
      updateTime: Schema.optional(Schema.String),
      exception: Schema.optional(Exception),
      name: Schema.optional(Schema.String),
      routine: Schema.optional(Schema.String),
      step: Schema.optional(Schema.String),
      stepType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      navigationInfo: Schema.optional(NavigationInfo),
    }),
  ).annotate({ identifier: "StepEntry" }) as any as Schema.Schema<StepEntry>;

export interface ExportDataResponse {
  /** The JSON string with customer data and metadata for an execution with the given name */
  data?: string;
}

export const ExportDataResponse: Schema.Schema<ExportDataResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExportDataResponse",
  }) as any as Schema.Schema<ExportDataResponse>;

export interface ListCallbacksResponse {
  /** The callbacks which match the request. */
  callbacks?: Array<Callback>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCallbacksResponse: Schema.Schema<ListCallbacksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      callbacks: Schema.optional(Schema.Array(Callback)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCallbacksResponse",
  }) as any as Schema.Schema<ListCallbacksResponse>;

export interface ListStepEntriesResponse {
  /** A token to retrieve next page of results. Pass this value in the ListStepEntriesRequest.page_token field in the subsequent call to `ListStepEntries` method to retrieve the next page of results. */
  nextPageToken?: string;
  /** The list of entries. */
  stepEntries?: Array<StepEntry>;
  /** Indicates the total number of StepEntries that matched the request filter. For running executions, this number shows the number of StepEntries that are executed thus far. */
  totalSize?: number;
}

export const ListStepEntriesResponse: Schema.Schema<ListStepEntriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      stepEntries: Schema.optional(Schema.Array(StepEntry)),
      totalSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ListStepEntriesResponse",
  }) as any as Schema.Schema<ListStepEntriesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface TriggerPubsubExecutionProjectsLocationsWorkflowsRequest {
  /** Required. Name of the workflow for which an execution should be created. Format: projects/{project}/locations/{location}/workflows/{workflow} */
  workflow: string;
  /** Request body */
  body?: TriggerPubsubExecutionRequest;
}

export const TriggerPubsubExecutionProjectsLocationsWorkflowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workflow: Schema.String.pipe(T.HttpPath("workflow")),
    body: Schema.optional(TriggerPubsubExecutionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}:triggerPubsubExecution",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TriggerPubsubExecutionProjectsLocationsWorkflowsRequest>;

export type TriggerPubsubExecutionProjectsLocationsWorkflowsResponse =
  Execution;
export const TriggerPubsubExecutionProjectsLocationsWorkflowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Execution;

export type TriggerPubsubExecutionProjectsLocationsWorkflowsError =
  DefaultErrors;

/** Triggers a new execution using the latest revision of the given workflow by a Pub/Sub push notification. */
export const triggerPubsubExecutionProjectsLocationsWorkflows: API.OperationMethod<
  TriggerPubsubExecutionProjectsLocationsWorkflowsRequest,
  TriggerPubsubExecutionProjectsLocationsWorkflowsResponse,
  TriggerPubsubExecutionProjectsLocationsWorkflowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TriggerPubsubExecutionProjectsLocationsWorkflowsRequest,
  output: TriggerPubsubExecutionProjectsLocationsWorkflowsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsWorkflowsExecutionsRequest {
  /** Required. Name of the execution to be cancelled. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name: string;
  /** Request body */
  body?: CancelExecutionRequest;
}

export const CancelProjectsLocationsWorkflowsExecutionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelExecutionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsWorkflowsExecutionsRequest>;

export type CancelProjectsLocationsWorkflowsExecutionsResponse = Execution;
export const CancelProjectsLocationsWorkflowsExecutionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Execution;

export type CancelProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Cancels an execution of the given name. */
export const cancelProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  CancelProjectsLocationsWorkflowsExecutionsRequest,
  CancelProjectsLocationsWorkflowsExecutionsResponse,
  CancelProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateProjectsLocationsWorkflowsExecutionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Execution).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkflowsExecutionsRequest>;

export type CreateProjectsLocationsWorkflowsExecutionsResponse = Execution;
export const CreateProjectsLocationsWorkflowsExecutionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Execution;

export type CreateProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Creates a new execution using the latest revision of the given workflow. For more information, see Execute a workflow. */
export const createProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  CreateProjectsLocationsWorkflowsExecutionsRequest,
  CreateProjectsLocationsWorkflowsExecutionsResponse,
  CreateProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsWorkflowsExecutionsRequest,
  output: CreateProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkflowsExecutionsRequest {
  /** Maximum number of executions to return per call. Max supported value depends on the selected Execution view: it's 1000 for BASIC and 100 for FULL. The default value used if the field is not specified is 100, regardless of the selected view. Values greater than the max value will be coerced down to it. */
  pageSize?: number;
  /** Required. Name of the workflow for which the executions should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow} */
  parent: string;
  /** Optional. A view defining which fields should be filled in the returned executions. The API will default to the BASIC view. */
  view?: "EXECUTION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. Filters applied to the `[Executions.ListExecutions]` results. The following fields are supported for filtering: `executionId`, `state`, `createTime`, `startTime`, `endTime`, `duration`, `workflowRevisionId`, `stepName`, `label`, and `disableConcurrencyQuotaOverflowBuffering`. For details, see AIP-160. For more information, see Filter executions. For example, if you are using the Google APIs Explorer: `state="SUCCEEDED"` or `startTime>"2023-08-01" AND state="FAILED"` */
  filter?: string;
  /** A page token, received from a previous `ListExecutions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListExecutions` must match the call that provided the page token. Note that pagination is applied to dynamic data. The list of executions returned can change between page requests. */
  pageToken?: string;
  /** Optional. Comma-separated list of fields that specify the ordering applied to the `[Executions.ListExecutions]` results. By default the ordering is based on descending `createTime`. The following fields are supported for ordering: `executionId`, `state`, `createTime`, `startTime`, `endTime`, `duration`, and `workflowRevisionId`. For details, see AIP-132. */
  orderBy?: string;
}

export const ListProjectsLocationsWorkflowsExecutionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkflowsExecutionsRequest>;

export type ListProjectsLocationsWorkflowsExecutionsResponse =
  ListExecutionsResponse;
export const ListProjectsLocationsWorkflowsExecutionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListExecutionsResponse;

export type ListProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Returns a list of executions which belong to the workflow with the given name. The method returns executions of all workflow revisions. Returned executions are ordered by their start time (newest first). */
export const listProjectsLocationsWorkflowsExecutions: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkflowsExecutionsRequest,
  ListProjectsLocationsWorkflowsExecutionsResponse,
  ListProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsWorkflowsExecutionsRequest,
  output: ListProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkflowsExecutionsRequest {
  /** Optional. A view defining which fields should be filled in the returned execution. The API will default to the FULL view. */
  view?: "EXECUTION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Required. Name of the execution to be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name: string;
}

export const GetProjectsLocationsWorkflowsExecutionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkflowsExecutionsRequest>;

export type GetProjectsLocationsWorkflowsExecutionsResponse = Execution;
export const GetProjectsLocationsWorkflowsExecutionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Execution;

export type GetProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Returns an execution of the given name. */
export const getProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  GetProjectsLocationsWorkflowsExecutionsRequest,
  GetProjectsLocationsWorkflowsExecutionsResponse,
  GetProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsWorkflowsExecutionsRequest,
  output: GetProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsRequest {
  /** Required. Name of the execution for which step entries should be deleted. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name: string;
  /** Request body */
  body?: DeleteExecutionHistoryRequest;
}

export const DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DeleteExecutionHistoryRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}:deleteExecutionHistory",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsRequest>;

export type DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsResponse =
  Empty;
export const DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsError =
  DefaultErrors;

/** Deletes all step entries for an execution. */
export const deleteExecutionHistoryProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsRequest,
  DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsResponse,
  DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsRequest,
  output: DeleteExecutionHistoryProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface ExportDataProjectsLocationsWorkflowsExecutionsRequest {
  /** Required. Name of the execution for which data is to be exported. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  name: string;
}

export const ExportDataProjectsLocationsWorkflowsExecutionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}:exportData",
    }),
    svc,
  ) as unknown as Schema.Schema<ExportDataProjectsLocationsWorkflowsExecutionsRequest>;

export type ExportDataProjectsLocationsWorkflowsExecutionsResponse =
  ExportDataResponse;
export const ExportDataProjectsLocationsWorkflowsExecutionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ExportDataResponse;

export type ExportDataProjectsLocationsWorkflowsExecutionsError = DefaultErrors;

/** Returns all metadata stored about an execution, excluding most data that is already accessible using other API methods. */
export const exportDataProjectsLocationsWorkflowsExecutions: API.OperationMethod<
  ExportDataProjectsLocationsWorkflowsExecutionsRequest,
  ExportDataProjectsLocationsWorkflowsExecutionsResponse,
  ExportDataProjectsLocationsWorkflowsExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportDataProjectsLocationsWorkflowsExecutionsRequest,
  output: ExportDataProjectsLocationsWorkflowsExecutionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkflowsExecutionsCallbacksRequest {
  /** Required. Name of the execution for which the callbacks should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  parent: string;
  /** A page token, received from a previous `ListCallbacks` call. Provide this to retrieve the subsequent page. Note that pagination is applied to dynamic data. The list of callbacks returned can change between page requests if callbacks are created or deleted. */
  pageToken?: string;
  /** Maximum number of callbacks to return per call. The default value is 100 and is also the maximum value. */
  pageSize?: number;
}

export const ListProjectsLocationsWorkflowsExecutionsCallbacksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}/callbacks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkflowsExecutionsCallbacksRequest>;

export type ListProjectsLocationsWorkflowsExecutionsCallbacksResponse =
  ListCallbacksResponse;
export const ListProjectsLocationsWorkflowsExecutionsCallbacksResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCallbacksResponse;

export type ListProjectsLocationsWorkflowsExecutionsCallbacksError =
  DefaultErrors;

/** Returns a list of active callbacks that belong to the execution with the given name. The returned callbacks are ordered by callback ID. */
export const listProjectsLocationsWorkflowsExecutionsCallbacks: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkflowsExecutionsCallbacksRequest,
  ListProjectsLocationsWorkflowsExecutionsCallbacksResponse,
  ListProjectsLocationsWorkflowsExecutionsCallbacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsWorkflowsExecutionsCallbacksRequest,
  output: ListProjectsLocationsWorkflowsExecutionsCallbacksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsWorkflowsExecutionsStepEntriesRequest {
  /** Deprecated field. */
  view?:
    | "EXECUTION_ENTRY_VIEW_UNSPECIFIED"
    | "EXECUTION_ENTRY_VIEW_BASIC"
    | "EXECUTION_ENTRY_VIEW_DETAILED"
    | (string & {});
  /** Required. Name of the workflow execution to list entries for. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} */
  parent: string;
  /** Optional. Number of step entries to return per call. The default max is 1000. */
  pageSize?: number;
  /** Optional. Comma-separated list of fields that specify the ordering applied to the `[StepEntries.ListStepEntries]` results. By default the ordering is based on ascending `entryId`. The following fields are supported for ordering: `entryId`, `createTime`, `updateTime`, `routine`, `step`, `stepType`, `state`. For details, see AIP-132. */
  orderBy?: string;
  /** Optional. The number of step entries to skip. It can be used with or without a pageToken. If used with a pageToken, then it indicates the number of step entries to skip starting from the requested page. */
  skip?: number;
  /** Optional. Filters applied to the `[StepEntries.ListStepEntries]` results. The following fields are supported for filtering: `entryId`, `createTime`, `updateTime`, `routine`, `step`, `stepType`, `parent`, `state`. For details, see AIP-160. For example, if you are using the Google APIs Explorer: `state="SUCCEEDED"` or `createTime>"2023-08-01" AND state="FAILED"` */
  filter?: string;
  /** Optional. A page token, received from a previous `ListStepEntries` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListStepEntries` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsWorkflowsExecutionsStepEntriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    skip: Schema.optional(Schema.Number).pipe(T.HttpQuery("skip")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}/stepEntries",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkflowsExecutionsStepEntriesRequest>;

export type ListProjectsLocationsWorkflowsExecutionsStepEntriesResponse =
  ListStepEntriesResponse;
export const ListProjectsLocationsWorkflowsExecutionsStepEntriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListStepEntriesResponse;

export type ListProjectsLocationsWorkflowsExecutionsStepEntriesError =
  DefaultErrors;

/** Lists step entries for the corresponding workflow execution. Returned entries are ordered by their create_time. */
export const listProjectsLocationsWorkflowsExecutionsStepEntries: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkflowsExecutionsStepEntriesRequest,
  ListProjectsLocationsWorkflowsExecutionsStepEntriesResponse,
  ListProjectsLocationsWorkflowsExecutionsStepEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsWorkflowsExecutionsStepEntriesRequest,
  output: ListProjectsLocationsWorkflowsExecutionsStepEntriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkflowsExecutionsStepEntriesRequest {
  /** Required. The name of the step entry to retrieve. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}/stepEntries/{step_entry} */
  name: string;
  /** Deprecated field. */
  view?:
    | "EXECUTION_ENTRY_VIEW_UNSPECIFIED"
    | "EXECUTION_ENTRY_VIEW_BASIC"
    | "EXECUTION_ENTRY_VIEW_DETAILED"
    | (string & {});
}

export const GetProjectsLocationsWorkflowsExecutionsStepEntriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workflows/{workflowsId}/executions/{executionsId}/stepEntries/{stepEntriesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkflowsExecutionsStepEntriesRequest>;

export type GetProjectsLocationsWorkflowsExecutionsStepEntriesResponse =
  StepEntry;
export const GetProjectsLocationsWorkflowsExecutionsStepEntriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ StepEntry;

export type GetProjectsLocationsWorkflowsExecutionsStepEntriesError =
  DefaultErrors;

/** Gets a step entry. */
export const getProjectsLocationsWorkflowsExecutionsStepEntries: API.OperationMethod<
  GetProjectsLocationsWorkflowsExecutionsStepEntriesRequest,
  GetProjectsLocationsWorkflowsExecutionsStepEntriesResponse,
  GetProjectsLocationsWorkflowsExecutionsStepEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsWorkflowsExecutionsStepEntriesRequest,
  output: GetProjectsLocationsWorkflowsExecutionsStepEntriesResponse,
  errors: [],
}));
