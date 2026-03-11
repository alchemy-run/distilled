/**
 * Cloudflare WORKFLOWS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service workflows
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Errors
// =============================================================================

export class InstanceNotFound extends Schema.TaggedErrorClass<InstanceNotFound>()(
  "InstanceNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InstanceNotFound, [{ code: 10201 }, { code: 10400 }]);

export class InvalidBody extends Schema.TaggedErrorClass<InvalidBody>()(
  "InvalidBody",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidBody, [{ code: 10002 }]);

export class InvalidRoute extends Schema.TaggedErrorClass<InvalidRoute>()(
  "InvalidRoute",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoute, [{ code: 7003 }]);

export class VersionNotFound extends Schema.TaggedErrorClass<VersionNotFound>()(
  "VersionNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(VersionNotFound, [{ code: 10300 }]);

export class WorkflowInternalError extends Schema.TaggedErrorClass<WorkflowInternalError>()(
  "WorkflowInternalError",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WorkflowInternalError, [{ code: 10001 }]);

export class WorkflowNotFound extends Schema.TaggedErrorClass<WorkflowNotFound>()(
  "WorkflowNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WorkflowNotFound, [{ code: 10200 }]);

// =============================================================================
// Instance
// =============================================================================

export interface GetInstanceRequest {
  workflowName: string;
  instanceId: string;
  accountId: string;
}

export const GetInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  instanceId: Schema.String.pipe(T.HttpPath("instanceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workflows/{workflowName}/instances/{instanceId}",
  }),
) as unknown as Schema.Schema<GetInstanceRequest>;

export interface GetInstanceResponse {
  end: string | null;
  error: { message: string; name: string } | null;
  output: string | number | null;
  params: unknown;
  queued: string;
  start: string | null;
  status:
    | "queued"
    | "running"
    | "paused"
    | "errored"
    | "terminated"
    | "complete"
    | "waitingForPause"
    | "waiting";
  steps: (
    | {
        attempts: {
          end: string | null;
          error: { message: string; name: string } | null;
          start: string;
          success: boolean | null;
        }[];
        config: {
          retries: {
            delay: number;
            limit: number;
            backoff?: "constant" | "linear" | "exponential" | null;
          };
          timeout: number;
        };
        end: string | null;
        name: string;
        output: unknown;
        start: string;
        success: boolean | null;
        type: "step";
      }
    | {
        end: string;
        error: { message: string; name: string } | null;
        finished: boolean;
        name: string;
        start: string;
        type: "sleep";
      }
    | { trigger: { source: string }; type: "termination" }
    | {
        end: string;
        error: { message: string; name: string } | null;
        finished: boolean;
        name: string;
        output: string | number | boolean;
        start: string;
        type: "waitForEvent";
      }
  )[];
  success: boolean | null;
  trigger: { source: "unknown" | "api" | "binding" | "event" | "cron" };
  versionId: string;
}

export const GetInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  end: Schema.Union([Schema.String, Schema.Null]),
  error: Schema.Union([
    Schema.Struct({
      message: Schema.String,
      name: Schema.String,
    }),
    Schema.Null,
  ]),
  output: Schema.Union([Schema.String, Schema.Number, Schema.Null]),
  params: Schema.Unknown,
  queued: Schema.String,
  start: Schema.Union([Schema.String, Schema.Null]),
  status: Schema.Literals([
    "queued",
    "running",
    "paused",
    "errored",
    "terminated",
    "complete",
    "waitingForPause",
    "waiting",
  ]),
  steps: Schema.Array(
    Schema.Union([
      Schema.Struct({
        attempts: Schema.Array(
          Schema.Struct({
            end: Schema.Union([Schema.String, Schema.Null]),
            error: Schema.Union([
              Schema.Struct({
                message: Schema.String,
                name: Schema.String,
              }),
              Schema.Null,
            ]),
            start: Schema.String,
            success: Schema.Union([Schema.Boolean, Schema.Null]),
          }),
        ),
        config: Schema.Struct({
          retries: Schema.Struct({
            delay: Schema.Number,
            limit: Schema.Number,
            backoff: Schema.optional(
              Schema.Union([
                Schema.Literals(["constant", "linear", "exponential"]),
                Schema.Null,
              ]),
            ),
          }),
          timeout: Schema.Number,
        }),
        end: Schema.Union([Schema.String, Schema.Null]),
        name: Schema.String,
        output: Schema.Unknown,
        start: Schema.String,
        success: Schema.Union([Schema.Boolean, Schema.Null]),
        type: Schema.Literal("step"),
      }),
      Schema.Struct({
        end: Schema.String,
        error: Schema.Union([
          Schema.Struct({
            message: Schema.String,
            name: Schema.String,
          }),
          Schema.Null,
        ]),
        finished: Schema.Boolean,
        name: Schema.String,
        start: Schema.String,
        type: Schema.Literal("sleep"),
      }),
      Schema.Struct({
        trigger: Schema.Struct({
          source: Schema.String,
        }),
        type: Schema.Literal("termination"),
      }),
      Schema.Struct({
        end: Schema.String,
        error: Schema.Union([
          Schema.Struct({
            message: Schema.String,
            name: Schema.String,
          }),
          Schema.Null,
        ]),
        finished: Schema.Boolean,
        name: Schema.String,
        output: Schema.Union([Schema.String, Schema.Number, Schema.Boolean]),
        start: Schema.String,
        type: Schema.Literal("waitForEvent"),
      }),
    ]),
  ),
  success: Schema.Union([Schema.Boolean, Schema.Null]),
  trigger: Schema.Struct({
    source: Schema.Literals(["unknown", "api", "binding", "event", "cron"]),
  }),
  versionId: Schema.String,
}) as unknown as Schema.Schema<GetInstanceResponse>;

export type GetInstanceError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | InstanceNotFound;

export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResponse,
  GetInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInstanceRequest,
  output: GetInstanceResponse,
  errors: [WorkflowNotFound, InvalidRoute, InstanceNotFound],
}));

export interface ListInstancesRequest {
  workflowName: string;
  /** Path param: */
  accountId: string;
  /** Query param: `page` and `cursor` are mutually exclusive, use one or the other. */
  cursor?: string;
  /** Query param: Accepts ISO 8601 with no timezone offsets and in UTC. */
  dateEnd?: string;
  /** Query param: Accepts ISO 8601 with no timezone offsets and in UTC. */
  dateStart?: string;
  /** Query param: should only be used when `cursor` is used, defines a new direction for the cursor */
  direction?: "asc" | "desc";
  /** Query param: */
  status?:
    | "queued"
    | "running"
    | "paused"
    | "errored"
    | "terminated"
    | "complete"
    | "waitingForPause"
    | "waiting";
}

export const ListInstancesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cursor: Schema.optional(Schema.String).pipe(T.HttpQuery("cursor")),
  dateEnd: Schema.optional(Schema.String).pipe(T.HttpQuery("date_end")),
  dateStart: Schema.optional(Schema.String).pipe(T.HttpQuery("date_start")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  status: Schema.optional(
    Schema.Literals([
      "queued",
      "running",
      "paused",
      "errored",
      "terminated",
      "complete",
      "waitingForPause",
      "waiting",
    ]),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workflows/{workflowName}/instances",
  }),
) as unknown as Schema.Schema<ListInstancesRequest>;

export type ListInstancesResponse = {
  id: string;
  createdOn: string;
  endedOn: string | null;
  modifiedOn: string;
  startedOn: string | null;
  status:
    | "queued"
    | "running"
    | "paused"
    | "errored"
    | "terminated"
    | "complete"
    | "waitingForPause"
    | "waiting";
  versionId: string;
  workflowId: string;
}[];

export const ListInstancesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createdOn: Schema.String,
    endedOn: Schema.Union([Schema.String, Schema.Null]),
    modifiedOn: Schema.String,
    startedOn: Schema.Union([Schema.String, Schema.Null]),
    status: Schema.Literals([
      "queued",
      "running",
      "paused",
      "errored",
      "terminated",
      "complete",
      "waitingForPause",
      "waiting",
    ]),
    versionId: Schema.String,
    workflowId: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdOn: "created_on",
      endedOn: "ended_on",
      modifiedOn: "modified_on",
      startedOn: "started_on",
      status: "status",
      versionId: "version_id",
      workflowId: "workflow_id",
    }),
  ),
) as unknown as Schema.Schema<ListInstancesResponse>;

export type ListInstancesError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | InvalidBody;

export const listInstances: API.OperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [WorkflowNotFound, InvalidRoute, InvalidBody],
}));

export interface CreateInstanceRequest {
  workflowName: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  instanceId?: string;
  /** Body param: */
  instanceRetention?: {
    errorRetention?: number | string;
    successRetention?: number | string;
  };
  /** Body param: */
  params?: unknown;
}

export const CreateInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  instanceId: Schema.optional(Schema.String),
  instanceRetention: Schema.optional(
    Schema.Struct({
      errorRetention: Schema.optional(
        Schema.Union([Schema.Number, Schema.String]),
      ),
      successRetention: Schema.optional(
        Schema.Union([Schema.Number, Schema.String]),
      ),
    }).pipe(
      Schema.encodeKeys({
        errorRetention: "error_retention",
        successRetention: "success_retention",
      }),
    ),
  ),
  params: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({
    instanceId: "instance_id",
    instanceRetention: "instance_retention",
    params: "params",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/workflows/{workflowName}/instances",
  }),
) as unknown as Schema.Schema<CreateInstanceRequest>;

export interface CreateInstanceResponse {
  id: string;
  status:
    | "queued"
    | "running"
    | "paused"
    | "errored"
    | "terminated"
    | "complete"
    | "waitingForPause"
    | "waiting";
  versionId: string;
  workflowId: string;
}

export const CreateInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    status: Schema.Literals([
      "queued",
      "running",
      "paused",
      "errored",
      "terminated",
      "complete",
      "waitingForPause",
      "waiting",
    ]),
    versionId: Schema.String,
    workflowId: Schema.String,
  },
).pipe(
  Schema.encodeKeys({
    id: "id",
    status: "status",
    versionId: "version_id",
    workflowId: "workflow_id",
  }),
) as unknown as Schema.Schema<CreateInstanceResponse>;

export type CreateInstanceError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | InvalidBody;

export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInstanceRequest,
  output: CreateInstanceResponse,
  errors: [WorkflowNotFound, InvalidRoute, InvalidBody],
}));

export interface BulkInstanceRequest {
  workflowName: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  body?: {
    instanceId?: string;
    instanceRetention?: {
      errorRetention?: number | string;
      successRetention?: number | string;
    };
    params?: unknown;
  }[];
}

export const BulkInstanceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.optional(
    Schema.Array(
      Schema.Struct({
        instanceId: Schema.optional(Schema.String),
        instanceRetention: Schema.optional(
          Schema.Struct({
            errorRetention: Schema.optional(
              Schema.Union([Schema.Number, Schema.String]),
            ),
            successRetention: Schema.optional(
              Schema.Union([Schema.Number, Schema.String]),
            ),
          }).pipe(
            Schema.encodeKeys({
              errorRetention: "error_retention",
              successRetention: "success_retention",
            }),
          ),
        ),
        params: Schema.optional(Schema.Unknown),
      }).pipe(
        Schema.encodeKeys({
          instanceId: "instance_id",
          instanceRetention: "instance_retention",
          params: "params",
        }),
      ),
    ),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/workflows/{workflowName}/instances/batch",
  }),
) as unknown as Schema.Schema<BulkInstanceRequest>;

export type BulkInstanceResponse = {
  id: string;
  status:
    | "queued"
    | "running"
    | "paused"
    | "errored"
    | "terminated"
    | "complete"
    | "waitingForPause"
    | "waiting";
  versionId: string;
  workflowId: string;
}[];

export const BulkInstanceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    status: Schema.Literals([
      "queued",
      "running",
      "paused",
      "errored",
      "terminated",
      "complete",
      "waitingForPause",
      "waiting",
    ]),
    versionId: Schema.String,
    workflowId: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      status: "status",
      versionId: "version_id",
      workflowId: "workflow_id",
    }),
  ),
) as unknown as Schema.Schema<BulkInstanceResponse>;

export type BulkInstanceError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | InvalidBody;

export const bulkInstance: API.OperationMethod<
  BulkInstanceRequest,
  BulkInstanceResponse,
  BulkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkInstanceRequest,
  output: BulkInstanceResponse,
  errors: [WorkflowNotFound, InvalidRoute, InvalidBody],
}));

// =============================================================================
// InstanceEvent
// =============================================================================

export interface CreateInstanceEventRequest {
  workflowName: string;
  instanceId: string;
  eventType: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  body?: unknown;
}

export const CreateInstanceEventRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
    instanceId: Schema.String.pipe(T.HttpPath("instanceId")),
    eventType: Schema.String.pipe(T.HttpPath("eventType")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    body: Schema.optional(Schema.Unknown).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/workflows/{workflowName}/instances/{instanceId}/events/{eventType}",
    }),
  ) as unknown as Schema.Schema<CreateInstanceEventRequest>;

export type CreateInstanceEventResponse = unknown;

export const CreateInstanceEventResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<CreateInstanceEventResponse>;

export type CreateInstanceEventError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | InstanceNotFound
  | InvalidBody;

export const createInstanceEvent: API.OperationMethod<
  CreateInstanceEventRequest,
  CreateInstanceEventResponse,
  CreateInstanceEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInstanceEventRequest,
  output: CreateInstanceEventResponse,
  errors: [WorkflowNotFound, InvalidRoute, InstanceNotFound, InvalidBody],
}));

// =============================================================================
// InstanceStatus
// =============================================================================

export interface PatchInstanceStatusRequest {
  workflowName: string;
  instanceId: string;
  /** Path param: */
  accountId: string;
  /** Body param: Apply action to instance. */
  status: "resume" | "pause" | "terminate" | "restart";
}

export const PatchInstanceStatusRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
    instanceId: Schema.String.pipe(T.HttpPath("instanceId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    status: Schema.Literals(["resume", "pause", "terminate", "restart"]),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/accounts/{account_id}/workflows/{workflowName}/instances/{instanceId}/status",
    }),
  ) as unknown as Schema.Schema<PatchInstanceStatusRequest>;

export interface PatchInstanceStatusResponse {
  status:
    | "queued"
    | "running"
    | "paused"
    | "errored"
    | "terminated"
    | "complete"
    | "waitingForPause"
    | "waiting";
  /** Accepts ISO 8601 with no timezone offsets and in UTC. */
  timestamp: string;
}

export const PatchInstanceStatusResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.Literals([
      "queued",
      "running",
      "paused",
      "errored",
      "terminated",
      "complete",
      "waitingForPause",
      "waiting",
    ]),
    timestamp: Schema.String,
  }) as unknown as Schema.Schema<PatchInstanceStatusResponse>;

export type PatchInstanceStatusError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | InstanceNotFound;

export const patchInstanceStatus: API.OperationMethod<
  PatchInstanceStatusRequest,
  PatchInstanceStatusResponse,
  PatchInstanceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchInstanceStatusRequest,
  output: PatchInstanceStatusResponse,
  errors: [WorkflowNotFound, InvalidRoute, InstanceNotFound],
}));

// =============================================================================
// Version
// =============================================================================

export interface GetVersionRequest {
  workflowName: string;
  versionId: string;
  accountId: string;
}

export const GetVersionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  versionId: Schema.String.pipe(T.HttpPath("versionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workflows/{workflowName}/versions/{versionId}",
  }),
) as unknown as Schema.Schema<GetVersionRequest>;

export interface GetVersionResponse {
  id: string;
  className: string;
  createdOn: string;
  modifiedOn: string;
  workflowId: string;
}

export const GetVersionResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  className: Schema.String,
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  workflowId: Schema.String,
}).pipe(
  Schema.encodeKeys({
    id: "id",
    className: "class_name",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    workflowId: "workflow_id",
  }),
) as unknown as Schema.Schema<GetVersionResponse>;

export type GetVersionError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute
  | VersionNotFound;

export const getVersion: API.OperationMethod<
  GetVersionRequest,
  GetVersionResponse,
  GetVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVersionRequest,
  output: GetVersionResponse,
  errors: [WorkflowNotFound, InvalidRoute, VersionNotFound],
}));

export interface ListVersionsRequest {
  workflowName: string;
  /** Path param: */
  accountId: string;
}

export const ListVersionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workflows/{workflowName}/versions",
  }),
) as unknown as Schema.Schema<ListVersionsRequest>;

export type ListVersionsResponse = {
  id: string;
  className: string;
  createdOn: string;
  modifiedOn: string;
  workflowId: string;
}[];

export const ListVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    className: Schema.String,
    createdOn: Schema.String,
    modifiedOn: Schema.String,
    workflowId: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      className: "class_name",
      createdOn: "created_on",
      modifiedOn: "modified_on",
      workflowId: "workflow_id",
    }),
  ),
) as unknown as Schema.Schema<ListVersionsResponse>;

export type ListVersionsError = DefaultErrors | WorkflowNotFound | InvalidRoute;

export const listVersions: API.OperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [WorkflowNotFound, InvalidRoute],
}));

// =============================================================================
// Workflow
// =============================================================================

export interface GetWorkflowRequest {
  workflowName: string;
  accountId: string;
}

export const GetWorkflowRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workflows/{workflowName}",
  }),
) as unknown as Schema.Schema<GetWorkflowRequest>;

export interface GetWorkflowResponse {
  id: string;
  className: string;
  createdOn: string;
  instances: {
    complete?: number | null;
    errored?: number | null;
    paused?: number | null;
    queued?: number | null;
    running?: number | null;
    terminated?: number | null;
    waiting?: number | null;
    waitingForPause?: number | null;
  };
  modifiedOn: string;
  name: string;
  scriptName: string;
  triggeredOn: string | null;
}

export const GetWorkflowResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  className: Schema.String,
  createdOn: Schema.String,
  instances: Schema.Struct({
    complete: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    errored: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    queued: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    running: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    terminated: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    waiting: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    waitingForPause: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
  }),
  modifiedOn: Schema.String,
  name: Schema.String,
  scriptName: Schema.String,
  triggeredOn: Schema.Union([Schema.String, Schema.Null]),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    className: "class_name",
    createdOn: "created_on",
    instances: "instances",
    modifiedOn: "modified_on",
    name: "name",
    scriptName: "script_name",
    triggeredOn: "triggered_on",
  }),
) as unknown as Schema.Schema<GetWorkflowResponse>;

export type GetWorkflowError = DefaultErrors | WorkflowNotFound | InvalidRoute;

export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [WorkflowNotFound, InvalidRoute],
}));

export interface ListWorkflowsRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Allows filtering workflows` name. */
  search?: string;
}

export const ListWorkflowsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/workflows" }),
) as unknown as Schema.Schema<ListWorkflowsRequest>;

export type ListWorkflowsResponse = {
  id: string;
  className: string;
  createdOn: string;
  instances: {
    complete?: number | null;
    errored?: number | null;
    paused?: number | null;
    queued?: number | null;
    running?: number | null;
    terminated?: number | null;
    waiting?: number | null;
    waitingForPause?: number | null;
  };
  modifiedOn: string;
  name: string;
  scriptName: string;
  triggeredOn: string | null;
}[];

export const ListWorkflowsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    className: Schema.String,
    createdOn: Schema.String,
    instances: Schema.Struct({
      complete: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      errored: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      paused: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      queued: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      running: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      terminated: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      waiting: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      waitingForPause: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
    }),
    modifiedOn: Schema.String,
    name: Schema.String,
    scriptName: Schema.String,
    triggeredOn: Schema.Union([Schema.String, Schema.Null]),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      className: "class_name",
      createdOn: "created_on",
      instances: "instances",
      modifiedOn: "modified_on",
      name: "name",
      scriptName: "script_name",
      triggeredOn: "triggered_on",
    }),
  ),
) as unknown as Schema.Schema<ListWorkflowsResponse>;

export type ListWorkflowsError = DefaultErrors | InvalidRoute;

export const listWorkflows: API.OperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [InvalidRoute],
}));

export interface PutWorkflowRequest {
  workflowName: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  className: string;
  /** Body param: */
  scriptName: string;
}

export const PutWorkflowRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  className: Schema.String,
  scriptName: Schema.String,
}).pipe(
  Schema.encodeKeys({ className: "class_name", scriptName: "script_name" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/workflows/{workflowName}",
  }),
) as unknown as Schema.Schema<PutWorkflowRequest>;

export interface PutWorkflowResponse {
  id: string;
  className: string;
  createdOn: string;
  isDeleted?: number | null;
  modifiedOn: string;
  name: string;
  scriptName: string;
  terminatorRunning?: number | null;
  triggeredOn?: string | null;
  versionId: string;
}

export const PutWorkflowResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  className: Schema.String,
  createdOn: Schema.String,
  isDeleted: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  modifiedOn: Schema.String,
  name: Schema.String,
  scriptName: Schema.String,
  terminatorRunning: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  triggeredOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  versionId: Schema.String,
}).pipe(
  Schema.encodeKeys({
    id: "id",
    className: "class_name",
    createdOn: "created_on",
    isDeleted: "is_deleted",
    modifiedOn: "modified_on",
    name: "name",
    scriptName: "script_name",
    terminatorRunning: "terminator_running",
    triggeredOn: "triggered_on",
    versionId: "version_id",
  }),
) as unknown as Schema.Schema<PutWorkflowResponse>;

export type PutWorkflowError =
  | DefaultErrors
  | WorkflowInternalError
  | InvalidRoute;

export const putWorkflow: API.OperationMethod<
  PutWorkflowRequest,
  PutWorkflowResponse,
  PutWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutWorkflowRequest,
  output: PutWorkflowResponse,
  errors: [WorkflowInternalError, InvalidRoute],
}));

export interface DeleteWorkflowRequest {
  workflowName: string;
  accountId: string;
}

export const DeleteWorkflowRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflowName: Schema.String.pipe(T.HttpPath("workflowName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workflows/{workflowName}",
  }),
) as unknown as Schema.Schema<DeleteWorkflowRequest>;

export interface DeleteWorkflowResponse {
  status: "ok";
  success?: boolean | null;
}

export const DeleteWorkflowResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    status: Schema.Literal("ok"),
    success: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  },
) as unknown as Schema.Schema<DeleteWorkflowResponse>;

export type DeleteWorkflowError =
  | DefaultErrors
  | WorkflowNotFound
  | InvalidRoute;

export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [WorkflowNotFound, InvalidRoute],
}));
