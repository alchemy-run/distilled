/**
 * Cloudflare WORKFLOWS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service workflows
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// Instance
// =============================================================================

export interface GetInstanceRequest {
  workflowName: string;
  instanceId: string;
  accountId: string;
}

export const GetInstanceRequest = Schema.Struct({
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
  output: string | number;
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
            backoff?: "constant" | "linear" | "exponential";
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

export const GetInstanceResponse = Schema.Struct({
  end: Schema.Union([Schema.String, Schema.Null]),
  error: Schema.Union([
    Schema.Struct({
      message: Schema.String,
      name: Schema.String,
    }),
    Schema.Null,
  ]),
  output: Schema.Union([Schema.String, Schema.Number]),
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
              Schema.Literals(["constant", "linear", "exponential"]),
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

export type GetInstanceError = CommonErrors;

export const getInstance: API.OperationMethod<
  GetInstanceRequest,
  GetInstanceResponse,
  GetInstanceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInstanceRequest,
  output: GetInstanceResponse,
  errors: [],
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

export const ListInstancesRequest = Schema.Struct({
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

export const ListInstancesResponse = Schema.Array(
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

export type ListInstancesError = CommonErrors;

export const listInstances: API.OperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [],
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

export const CreateInstanceRequest = Schema.Struct({
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

export const CreateInstanceResponse = Schema.Struct({
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
) as unknown as Schema.Schema<CreateInstanceResponse>;

export type CreateInstanceError = CommonErrors;

export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateInstanceRequest,
  output: CreateInstanceResponse,
  errors: [],
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

export const BulkInstanceRequest = Schema.Struct({
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
    method: "GET",
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

export const BulkInstanceResponse = Schema.Array(
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

export type BulkInstanceError = CommonErrors;

export const bulkInstance: API.OperationMethod<
  BulkInstanceRequest,
  BulkInstanceResponse,
  BulkInstanceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkInstanceRequest,
  output: BulkInstanceResponse,
  errors: [],
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

export const CreateInstanceEventRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<CreateInstanceEventResponse>;

export type CreateInstanceEventError = CommonErrors;

export const createInstanceEvent: API.OperationMethod<
  CreateInstanceEventRequest,
  CreateInstanceEventResponse,
  CreateInstanceEventError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateInstanceEventRequest,
  output: CreateInstanceEventResponse,
  errors: [],
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

export const PatchInstanceStatusRequest = Schema.Struct({
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

export const PatchInstanceStatusResponse = Schema.Struct({
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

export type PatchInstanceStatusError = CommonErrors;

export const patchInstanceStatus: API.OperationMethod<
  PatchInstanceStatusRequest,
  PatchInstanceStatusResponse,
  PatchInstanceStatusError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchInstanceStatusRequest,
  output: PatchInstanceStatusResponse,
  errors: [],
}));

// =============================================================================
// Version
// =============================================================================

export interface GetVersionRequest {
  workflowName: string;
  versionId: string;
  accountId: string;
}

export const GetVersionRequest = Schema.Struct({
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

export const GetVersionResponse = Schema.Struct({
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

export type GetVersionError = CommonErrors;

export const getVersion: API.OperationMethod<
  GetVersionRequest,
  GetVersionResponse,
  GetVersionError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVersionRequest,
  output: GetVersionResponse,
  errors: [],
}));

export interface ListVersionsRequest {
  workflowName: string;
  /** Path param: */
  accountId: string;
}

export const ListVersionsRequest = Schema.Struct({
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

export const ListVersionsResponse = Schema.Array(
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

export type ListVersionsError = CommonErrors;

export const listVersions: API.OperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [],
}));

// =============================================================================
// Workflow
// =============================================================================

export interface GetWorkflowRequest {
  workflowName: string;
  accountId: string;
}

export const GetWorkflowRequest = Schema.Struct({
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
    complete?: number;
    errored?: number;
    paused?: number;
    queued?: number;
    running?: number;
    terminated?: number;
    waiting?: number;
    waitingForPause?: number;
  };
  modifiedOn: string;
  name: string;
  scriptName: string;
  triggeredOn: string | null;
}

export const GetWorkflowResponse = Schema.Struct({
  id: Schema.String,
  className: Schema.String,
  createdOn: Schema.String,
  instances: Schema.Struct({
    complete: Schema.optional(Schema.Number),
    errored: Schema.optional(Schema.Number),
    paused: Schema.optional(Schema.Number),
    queued: Schema.optional(Schema.Number),
    running: Schema.optional(Schema.Number),
    terminated: Schema.optional(Schema.Number),
    waiting: Schema.optional(Schema.Number),
    waitingForPause: Schema.optional(Schema.Number),
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

export type GetWorkflowError = CommonErrors;

export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [],
}));

export interface ListWorkflowsRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Allows filtering workflows` name. */
  search?: string;
}

export const ListWorkflowsRequest = Schema.Struct({
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
    complete?: number;
    errored?: number;
    paused?: number;
    queued?: number;
    running?: number;
    terminated?: number;
    waiting?: number;
    waitingForPause?: number;
  };
  modifiedOn: string;
  name: string;
  scriptName: string;
  triggeredOn: string | null;
}[];

export const ListWorkflowsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    className: Schema.String,
    createdOn: Schema.String,
    instances: Schema.Struct({
      complete: Schema.optional(Schema.Number),
      errored: Schema.optional(Schema.Number),
      paused: Schema.optional(Schema.Number),
      queued: Schema.optional(Schema.Number),
      running: Schema.optional(Schema.Number),
      terminated: Schema.optional(Schema.Number),
      waiting: Schema.optional(Schema.Number),
      waitingForPause: Schema.optional(Schema.Number),
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

export type ListWorkflowsError = CommonErrors;

export const listWorkflows: API.OperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [],
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

export const PutWorkflowRequest = Schema.Struct({
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
  isDeleted: number;
  modifiedOn: string;
  name: string;
  scriptName: string;
  terminatorRunning: number;
  triggeredOn: string | null;
  versionId: string;
}

export const PutWorkflowResponse = Schema.Struct({
  id: Schema.String,
  className: Schema.String,
  createdOn: Schema.String,
  isDeleted: Schema.Number,
  modifiedOn: Schema.String,
  name: Schema.String,
  scriptName: Schema.String,
  terminatorRunning: Schema.Number,
  triggeredOn: Schema.Union([Schema.String, Schema.Null]),
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

export type PutWorkflowError = CommonErrors;

export const putWorkflow: API.OperationMethod<
  PutWorkflowRequest,
  PutWorkflowResponse,
  PutWorkflowError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutWorkflowRequest,
  output: PutWorkflowResponse,
  errors: [],
}));

export interface DeleteWorkflowRequest {
  workflowName: string;
  accountId: string;
}

export const DeleteWorkflowRequest = Schema.Struct({
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
  success: boolean | null;
}

export const DeleteWorkflowResponse = Schema.Struct({
  status: Schema.Literal("ok"),
  success: Schema.Union([Schema.Boolean, Schema.Null]),
}) as unknown as Schema.Schema<DeleteWorkflowResponse>;

export type DeleteWorkflowError = CommonErrors;

export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [],
}));
