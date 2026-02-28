// ==========================================================================
// Google Tasks API (tasks v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "tasks",
  version: "v1",
  rootUrl: "https://tasks.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DriveResourceInfo {
  /** Output only. Identifier of the file in the Drive API. */
  driveFileId?: string;
  /** Output only. Resource key required to access files shared via a shared link. Not required for all files. See also developers.google.com/drive/api/guides/resource-keys. */
  resourceKey?: string;
}

export const DriveResourceInfo: Schema.Schema<DriveResourceInfo> = Schema.suspend(() => Schema.Struct({
  driveFileId: Schema.optional(Schema.String),
  resourceKey: Schema.optional(Schema.String),
})).annotate({ identifier: "DriveResourceInfo" }) as any as Schema.Schema<DriveResourceInfo>;

export interface SpaceInfo {
  /** Output only. The Chat space where this task originates from. The format is "spaces/{space}". */
  space?: string;
}

export const SpaceInfo: Schema.Schema<SpaceInfo> = Schema.suspend(() => Schema.Struct({
  space: Schema.optional(Schema.String),
})).annotate({ identifier: "SpaceInfo" }) as any as Schema.Schema<SpaceInfo>;

export interface AssignmentInfo {
  /** Output only. An absolute link to the original task in the surface of assignment (Docs, Chat spaces, etc.). */
  linkToTask?: string;
  /** Output only. The type of surface this assigned task originates from. Currently limited to DOCUMENT or SPACE. */
  surfaceType?: "CONTEXT_TYPE_UNSPECIFIED" | "GMAIL" | "DOCUMENT" | "SPACE" | (string & {});
  /** Output only. Information about the Drive file where this task originates from. Currently, the Drive file can only be a document. This field is read-only. */
  driveResourceInfo?: DriveResourceInfo;
  /** Output only. Information about the Chat Space where this task originates from. This field is read-only. */
  spaceInfo?: SpaceInfo;
}

export const AssignmentInfo: Schema.Schema<AssignmentInfo> = Schema.suspend(() => Schema.Struct({
  linkToTask: Schema.optional(Schema.String),
  surfaceType: Schema.optional(Schema.String),
  driveResourceInfo: Schema.optional(DriveResourceInfo),
  spaceInfo: Schema.optional(SpaceInfo),
})).annotate({ identifier: "AssignmentInfo" }) as any as Schema.Schema<AssignmentInfo>;

export interface Task {
  /** Output only. Type of the resource. This is always "tasks#task". */
  kind?: string;
  /** Task identifier. */
  id?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Title of the task. Maximum length allowed: 1024 characters. */
  title?: string;
  /** Output only. Last modification time of the task (as a RFC 3339 timestamp). */
  updated?: string;
  /** Output only. URL pointing to this task. Used to retrieve, update, or delete this task. */
  selfLink?: string;
  /** Output only. Parent task identifier. This field is omitted if it is a top-level task. Use the "move" method to move the task under a different parent or to the top level. A parent task can never be an assigned task (from Chat Spaces, Docs). This field is read-only. */
  parent?: string;
  /** Output only. String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task's corresponding position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). Use the "move" method to move the task to another position. */
  position?: string;
  /** Notes describing the task. Tasks assigned from Google Docs cannot have notes. Optional. Maximum length allowed: 8192 characters. */
  notes?: string;
  /** Status of the task. This is either "needsAction" or "completed". */
  status?: string;
  /** Scheduled date for the task (as an RFC 3339 timestamp). Optional. This represents the day that the task should be done, or that the task is visible on the calendar grid. It doesn't represent the deadline of the task. Only date information is recorded; the time portion of the timestamp is discarded when setting this field. It isn't possible to read or write the time that a task is scheduled for using the API. */
  due?: string;
  /** Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed. */
  completed?: string;
  /** Flag indicating whether the task has been deleted. For assigned tasks this field is read-only. They can only be deleted by calling tasks.delete, in which case both the assigned task and the original task (in Docs or Chat Spaces) are deleted. To delete the assigned task only, navigate to the assignment surface and unassign the task from there. The default is False. */
  deleted?: boolean;
  /** Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only. */
  hidden?: boolean;
  /** Output only. Collection of links. This collection is read-only. */
  links?: Array<{ type?: string; description?: string; link?: string }>;
  /** Output only. An absolute link to the task in the Google Tasks Web UI. */
  webViewLink?: string;
  /** Output only. Context information for assigned tasks. A task can be assigned to a user, currently possible from surfaces like Docs and Chat Spaces. This field is populated for tasks assigned to the current user and identifies where the task was assigned from. This field is read-only. */
  assignmentInfo?: AssignmentInfo;
}

export const Task: Schema.Schema<Task> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  position: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  due: Schema.optional(Schema.String),
  completed: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  hidden: Schema.optional(Schema.Boolean),
  links: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(Schema.String), description: Schema.optional(Schema.String), link: Schema.optional(Schema.String) }))),
  webViewLink: Schema.optional(Schema.String),
  assignmentInfo: Schema.optional(AssignmentInfo),
})).annotate({ identifier: "Task" }) as any as Schema.Schema<Task>;

export interface Tasks {
  /** Type of the resource. This is always "tasks#tasks". */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Token used to access the next page of this result. */
  nextPageToken?: string;
  /** Collection of tasks. */
  items?: Array<Task>;
}

export const Tasks: Schema.Schema<Tasks> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Task)),
})).annotate({ identifier: "Tasks" }) as any as Schema.Schema<Tasks>;

export interface TaskList {
  /** Output only. Type of the resource. This is always "tasks#taskList". */
  kind?: string;
  /** Task list identifier. */
  id?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Title of the task list. Maximum length allowed: 1024 characters. */
  title?: string;
  /** Output only. Last modification time of the task list (as a RFC 3339 timestamp). */
  updated?: string;
  /** Output only. URL pointing to this task list. Used to retrieve, update, or delete this task list. */
  selfLink?: string;
}

export const TaskList: Schema.Schema<TaskList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
})).annotate({ identifier: "TaskList" }) as any as Schema.Schema<TaskList>;

export interface TaskLists {
  /** Type of the resource. This is always "tasks#taskLists". */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Token that can be used to request the next page of this result. */
  nextPageToken?: string;
  /** Collection of task lists. */
  items?: Array<TaskList>;
}

export const TaskLists: Schema.Schema<TaskLists> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(TaskList)),
})).annotate({ identifier: "TaskLists" }) as any as Schema.Schema<TaskLists>;

// ==========================================================================
// Operations
// ==========================================================================

/** Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list. */
export interface ClearTasksRequest {
  /** Task list identifier. */
  tasklist: string;
}

export const ClearTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
}).pipe(
  T.Http({ method: "POST", path: "tasks/v1/lists/{tasklist}/clear", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearTasksRequest>;

export interface ClearTasksResponse {}
export const ClearTasksResponse: Schema.Schema<ClearTasksResponse> = Schema.Struct({}) as any as Schema.Schema<ClearTasksResponse>;

export type ClearTasksError = CommonErrors;

export const clearTasks: API.OperationMethod<ClearTasksRequest, ClearTasksResponse, ClearTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearTasksRequest,
  output: ClearTasksResponse,
  errors: [],
}));

/** Deletes the specified task from the task list. If the task is assigned, both the assigned task and the original task (in Docs, Chat Spaces) are deleted. To delete the assigned task only, navigate to the assignment surface and unassign the task from there. */
export interface DeleteTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Task identifier. */
  task: string;
}

export const DeleteTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  task: Schema.String.pipe(T.HttpPath("task")),
}).pipe(
  T.Http({ method: "DELETE", path: "tasks/v1/lists/{tasklist}/tasks/{task}" }),
  svc,
) as unknown as Schema.Schema<DeleteTasksRequest>;

export interface DeleteTasksResponse {}
export const DeleteTasksResponse: Schema.Schema<DeleteTasksResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteTasksResponse>;

export type DeleteTasksError = CommonErrors;

export const deleteTasks: API.OperationMethod<DeleteTasksRequest, DeleteTasksResponse, DeleteTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTasksRequest,
  output: DeleteTasksResponse,
  errors: [],
}));

/** Returns the specified task. */
export interface GetTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Task identifier. */
  task: string;
}

export const GetTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  task: Schema.String.pipe(T.HttpPath("task")),
}).pipe(
  T.Http({ method: "GET", path: "tasks/v1/lists/{tasklist}/tasks/{task}" }),
  svc,
) as unknown as Schema.Schema<GetTasksRequest>;

export type GetTasksResponse = Task;
export const GetTasksResponse = Task;

export type GetTasksError = CommonErrors;

export const getTasks: API.OperationMethod<GetTasksRequest, GetTasksResponse, GetTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTasksRequest,
  output: GetTasksResponse,
  errors: [],
}));

/** Creates a new task on the specified task list. Tasks assigned from Docs or Chat Spaces cannot be inserted from Tasks Public API; they can only be created by assigning them from Docs or Chat Spaces. A user can have up to 20,000 non-hidden tasks per list and up to 100,000 tasks in total at a time. */
export interface InsertTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Parent task identifier. If the task is created at the top level, this parameter is omitted. An assigned task cannot be a parent task, nor can it have a parent. Setting the parent to an assigned task results in failure of the request. Optional. */
  parent?: string;
  /** Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional. */
  previous?: string;
  /** Request body */
  body?: Task;
}

export const InsertTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  previous: Schema.optional(Schema.String).pipe(T.HttpQuery("previous")),
  body: Schema.optional(Task).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tasks/v1/lists/{tasklist}/tasks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertTasksRequest>;

export type InsertTasksResponse = Task;
export const InsertTasksResponse = Task;

export type InsertTasksError = CommonErrors;

export const insertTasks: API.OperationMethod<InsertTasksRequest, InsertTasksResponse, InsertTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertTasksRequest,
  output: InsertTasksResponse,
  errors: [],
}));

/** Returns all tasks in the specified task list. Doesn't return assigned tasks by default (from Docs, Chat Spaces). A user can have up to 20,000 non-hidden tasks per list and up to 100,000 tasks in total at a time. */
export interface ListTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date. */
  completedMax?: string;
  /** Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date. */
  completedMin?: string;
  /** Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date. */
  dueMax?: string;
  /** Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date. */
  dueMin?: string;
  /** Maximum number of tasks returned on one page. Optional. The default is 20 (max allowed: 100). */
  maxResults?: number;
  /** Token specifying the result page to return. Optional. */
  pageToken?: string;
  /** Flag indicating whether completed tasks are returned in the result. Note that showHidden must also be True to show tasks completed in first party clients, such as the web UI and Google's mobile apps. Optional. The default is True. */
  showCompleted?: boolean;
  /** Flag indicating whether deleted tasks are returned in the result. Optional. The default is False. */
  showDeleted?: boolean;
  /** Flag indicating whether hidden tasks are returned in the result. Optional. The default is False. */
  showHidden?: boolean;
  /** Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time. */
  updatedMin?: string;
  /** Optional. Flag indicating whether tasks assigned to the current user are returned in the result. Optional. The default is False. */
  showAssigned?: boolean;
}

export const ListTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  completedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("completedMax")),
  completedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("completedMin")),
  dueMax: Schema.optional(Schema.String).pipe(T.HttpQuery("dueMax")),
  dueMin: Schema.optional(Schema.String).pipe(T.HttpQuery("dueMin")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showCompleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showCompleted")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  showHidden: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showHidden")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
  showAssigned: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showAssigned")),
}).pipe(
  T.Http({ method: "GET", path: "tasks/v1/lists/{tasklist}/tasks" }),
  svc,
) as unknown as Schema.Schema<ListTasksRequest>;

export type ListTasksResponse = Tasks;
export const ListTasksResponse = Tasks;

export type ListTasksError = CommonErrors;

export const listTasks = API.makePaginated(() => ({
  input: ListTasksRequest,
  output: ListTasksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Moves the specified task to another position in the destination task list. If the destination list is not specified, the task is moved within its current list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks. A user can have up to 2,000 subtasks per task. */
export interface MoveTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Task identifier. */
  task: string;
  /** Optional. New parent task identifier. If the task is moved to the top level, this parameter is omitted. The task set as parent must exist in the task list and can not be hidden. Exceptions: 1. Assigned and repeating tasks cannot be set as parent tasks (have subtasks), or be moved under a parent task (become subtasks). 2. Tasks that are both completed and hidden cannot be nested, so the parent field must be empty. */
  parent?: string;
  /** Optional. New previous sibling task identifier. If the task is moved to the first position among its siblings, this parameter is omitted. The task set as previous must exist in the task list and can not be hidden. Exceptions: 1. Tasks that are both completed and hidden can only be moved to position 0, so the previous field must be empty. */
  previous?: string;
  /** Optional. Destination task list identifier. If set, the task is moved from tasklist to the destinationTasklist list. Otherwise the task is moved within its current list. Recurrent tasks cannot currently be moved between lists. */
  destinationTasklist?: string;
}

export const MoveTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  task: Schema.String.pipe(T.HttpPath("task")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  previous: Schema.optional(Schema.String).pipe(T.HttpQuery("previous")),
  destinationTasklist: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationTasklist")),
}).pipe(
  T.Http({ method: "POST", path: "tasks/v1/lists/{tasklist}/tasks/{task}/move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveTasksRequest>;

export type MoveTasksResponse = Task;
export const MoveTasksResponse = Task;

export type MoveTasksError = CommonErrors;

export const moveTasks: API.OperationMethod<MoveTasksRequest, MoveTasksResponse, MoveTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveTasksRequest,
  output: MoveTasksResponse,
  errors: [],
}));

/** Updates the specified task. This method supports patch semantics. */
export interface PatchTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Task identifier. */
  task: string;
  /** Request body */
  body?: Task;
}

export const PatchTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  task: Schema.String.pipe(T.HttpPath("task")),
  body: Schema.optional(Task).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "tasks/v1/lists/{tasklist}/tasks/{task}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTasksRequest>;

export type PatchTasksResponse = Task;
export const PatchTasksResponse = Task;

export type PatchTasksError = CommonErrors;

export const patchTasks: API.OperationMethod<PatchTasksRequest, PatchTasksResponse, PatchTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTasksRequest,
  output: PatchTasksResponse,
  errors: [],
}));

/** Updates the specified task. */
export interface UpdateTasksRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Task identifier. */
  task: string;
  /** Request body */
  body?: Task;
}

export const UpdateTasksRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  task: Schema.String.pipe(T.HttpPath("task")),
  body: Schema.optional(Task).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tasks/v1/lists/{tasklist}/tasks/{task}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateTasksRequest>;

export type UpdateTasksResponse = Task;
export const UpdateTasksResponse = Task;

export type UpdateTasksError = CommonErrors;

export const updateTasks: API.OperationMethod<UpdateTasksRequest, UpdateTasksResponse, UpdateTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateTasksRequest,
  output: UpdateTasksResponse,
  errors: [],
}));

/** Deletes the authenticated user's specified task list. If the list contains assigned tasks, both the assigned tasks and the original tasks in the assignment surface (Docs, Chat Spaces) are deleted. */
export interface DeleteTasklistsRequest {
  /** Task list identifier. */
  tasklist: string;
}

export const DeleteTasklistsRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
}).pipe(
  T.Http({ method: "DELETE", path: "tasks/v1/users/@me/lists/{tasklist}" }),
  svc,
) as unknown as Schema.Schema<DeleteTasklistsRequest>;

export interface DeleteTasklistsResponse {}
export const DeleteTasklistsResponse: Schema.Schema<DeleteTasklistsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteTasklistsResponse>;

export type DeleteTasklistsError = CommonErrors;

export const deleteTasklists: API.OperationMethod<DeleteTasklistsRequest, DeleteTasklistsResponse, DeleteTasklistsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTasklistsRequest,
  output: DeleteTasklistsResponse,
  errors: [],
}));

/** Returns the authenticated user's specified task list. */
export interface GetTasklistsRequest {
  /** Task list identifier. */
  tasklist: string;
}

export const GetTasklistsRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
}).pipe(
  T.Http({ method: "GET", path: "tasks/v1/users/@me/lists/{tasklist}" }),
  svc,
) as unknown as Schema.Schema<GetTasklistsRequest>;

export type GetTasklistsResponse = TaskList;
export const GetTasklistsResponse = TaskList;

export type GetTasklistsError = CommonErrors;

export const getTasklists: API.OperationMethod<GetTasklistsRequest, GetTasklistsResponse, GetTasklistsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTasklistsRequest,
  output: GetTasklistsResponse,
  errors: [],
}));

/** Creates a new task list and adds it to the authenticated user's task lists. A user can have up to 2000 lists at a time. */
export interface InsertTasklistsRequest {
  /** Request body */
  body?: TaskList;
}

export const InsertTasklistsRequest = Schema.Struct({
  body: Schema.optional(TaskList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tasks/v1/users/@me/lists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertTasklistsRequest>;

export type InsertTasklistsResponse = TaskList;
export const InsertTasklistsResponse = TaskList;

export type InsertTasklistsError = CommonErrors;

export const insertTasklists: API.OperationMethod<InsertTasklistsRequest, InsertTasklistsResponse, InsertTasklistsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertTasklistsRequest,
  output: InsertTasklistsResponse,
  errors: [],
}));

/** Returns all the authenticated user's task lists. A user can have up to 2000 lists at a time. */
export interface ListTasklistsRequest {
  /** Maximum number of task lists returned on one page. Optional. The default is 1000 (max allowed: 1000). */
  maxResults?: number;
  /** Token specifying the result page to return. Optional. */
  pageToken?: string;
}

export const ListTasklistsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tasks/v1/users/@me/lists" }),
  svc,
) as unknown as Schema.Schema<ListTasklistsRequest>;

export type ListTasklistsResponse = TaskLists;
export const ListTasklistsResponse = TaskLists;

export type ListTasklistsError = CommonErrors;

export const listTasklists = API.makePaginated(() => ({
  input: ListTasklistsRequest,
  output: ListTasklistsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Updates the authenticated user's specified task list. This method supports patch semantics. */
export interface PatchTasklistsRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Request body */
  body?: TaskList;
}

export const PatchTasklistsRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  body: Schema.optional(TaskList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "tasks/v1/users/@me/lists/{tasklist}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTasklistsRequest>;

export type PatchTasklistsResponse = TaskList;
export const PatchTasklistsResponse = TaskList;

export type PatchTasklistsError = CommonErrors;

export const patchTasklists: API.OperationMethod<PatchTasklistsRequest, PatchTasklistsResponse, PatchTasklistsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTasklistsRequest,
  output: PatchTasklistsResponse,
  errors: [],
}));

/** Updates the authenticated user's specified task list. */
export interface UpdateTasklistsRequest {
  /** Task list identifier. */
  tasklist: string;
  /** Request body */
  body?: TaskList;
}

export const UpdateTasklistsRequest = Schema.Struct({
  tasklist: Schema.String.pipe(T.HttpPath("tasklist")),
  body: Schema.optional(TaskList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tasks/v1/users/@me/lists/{tasklist}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateTasklistsRequest>;

export type UpdateTasklistsResponse = TaskList;
export const UpdateTasklistsResponse = TaskList;

export type UpdateTasklistsError = CommonErrors;

export const updateTasklists: API.OperationMethod<UpdateTasklistsRequest, UpdateTasklistsResponse, UpdateTasklistsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateTasklistsRequest,
  output: UpdateTasklistsResponse,
  errors: [],
}));

