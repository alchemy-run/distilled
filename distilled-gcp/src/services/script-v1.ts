// ==========================================================================
// Apps Script API (script v1)
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
  name: "script",
  version: "v1",
  rootUrl: "https://script.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAppsScriptTypeWebAppConfig {
  /** Who has permission to run the web app. */
  access?: "UNKNOWN_ACCESS" | "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS" | (string & {});
  /** Who to execute the web app as. */
  executeAs?: "UNKNOWN_EXECUTE_AS" | "USER_ACCESSING" | "USER_DEPLOYING" | (string & {});
}

export const GoogleAppsScriptTypeWebAppConfig: Schema.Schema<GoogleAppsScriptTypeWebAppConfig> = Schema.suspend(() => Schema.Struct({
  access: Schema.optional(Schema.String),
  executeAs: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsScriptTypeWebAppConfig" }) as any as Schema.Schema<GoogleAppsScriptTypeWebAppConfig>;

export interface GoogleAppsScriptTypeExecutionApiConfig {
  /** Who has permission to run the API executable. */
  access?: "UNKNOWN_ACCESS" | "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS" | (string & {});
}

export const GoogleAppsScriptTypeExecutionApiConfig: Schema.Schema<GoogleAppsScriptTypeExecutionApiConfig> = Schema.suspend(() => Schema.Struct({
  access: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsScriptTypeExecutionApiConfig" }) as any as Schema.Schema<GoogleAppsScriptTypeExecutionApiConfig>;

export interface GoogleAppsScriptTypeExecutionApiEntryPoint {
  /** The entry point's configuration. */
  entryPointConfig?: GoogleAppsScriptTypeExecutionApiConfig;
}

export const GoogleAppsScriptTypeExecutionApiEntryPoint: Schema.Schema<GoogleAppsScriptTypeExecutionApiEntryPoint> = Schema.suspend(() => Schema.Struct({
  entryPointConfig: Schema.optional(GoogleAppsScriptTypeExecutionApiConfig),
})).annotate({ identifier: "GoogleAppsScriptTypeExecutionApiEntryPoint" }) as any as Schema.Schema<GoogleAppsScriptTypeExecutionApiEntryPoint>;

export interface GoogleAppsScriptTypeAddOnEntryPoint {
  /** The add-on's required title. */
  title?: string;
  /** The add-on's optional report issue URL. */
  reportIssueUrl?: string;
  /** The add-on's optional description. */
  description?: string;
  /** The add-on's required list of supported container types. */
  addOnType?: "UNKNOWN_ADDON_TYPE" | "GMAIL" | "DATA_STUDIO" | (string & {});
  /** The add-on's required post install tip URL. */
  postInstallTipUrl?: string;
  /** The add-on's optional help URL. */
  helpUrl?: string;
}

export const GoogleAppsScriptTypeAddOnEntryPoint: Schema.Schema<GoogleAppsScriptTypeAddOnEntryPoint> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  reportIssueUrl: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  addOnType: Schema.optional(Schema.String),
  postInstallTipUrl: Schema.optional(Schema.String),
  helpUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsScriptTypeAddOnEntryPoint" }) as any as Schema.Schema<GoogleAppsScriptTypeAddOnEntryPoint>;

export interface GoogleAppsScriptTypeWebAppEntryPoint {
  /** The URL for the web application. */
  url?: string;
  /** The entry point's configuration. */
  entryPointConfig?: GoogleAppsScriptTypeWebAppConfig;
}

export const GoogleAppsScriptTypeWebAppEntryPoint: Schema.Schema<GoogleAppsScriptTypeWebAppEntryPoint> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  entryPointConfig: Schema.optional(GoogleAppsScriptTypeWebAppConfig),
})).annotate({ identifier: "GoogleAppsScriptTypeWebAppEntryPoint" }) as any as Schema.Schema<GoogleAppsScriptTypeWebAppEntryPoint>;

export interface EntryPoint {
  /** An entry point specification for Apps Script API execution calls. */
  executionApi?: GoogleAppsScriptTypeExecutionApiEntryPoint;
  /** Add-on properties. */
  addOn?: GoogleAppsScriptTypeAddOnEntryPoint;
  /** An entry point specification for web apps. */
  webApp?: GoogleAppsScriptTypeWebAppEntryPoint;
  /** The type of the entry point. */
  entryPointType?: "ENTRY_POINT_TYPE_UNSPECIFIED" | "WEB_APP" | "EXECUTION_API" | "ADD_ON" | (string & {});
}

export const EntryPoint: Schema.Schema<EntryPoint> = Schema.suspend(() => Schema.Struct({
  executionApi: Schema.optional(GoogleAppsScriptTypeExecutionApiEntryPoint),
  addOn: Schema.optional(GoogleAppsScriptTypeAddOnEntryPoint),
  webApp: Schema.optional(GoogleAppsScriptTypeWebAppEntryPoint),
  entryPointType: Schema.optional(Schema.String),
})).annotate({ identifier: "EntryPoint" }) as any as Schema.Schema<EntryPoint>;

export interface GoogleAppsScriptTypeProcess {
  /** Time the execution started. */
  startTime?: string;
  /** The executions status. */
  processStatus?: "PROCESS_STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELED" | "FAILED" | "TIMED_OUT" | "UNKNOWN" | "DELAYED" | "EXECUTION_DISABLED" | (string & {});
  /** The executions type. */
  processType?: "PROCESS_TYPE_UNSPECIFIED" | "ADD_ON" | "EXECUTION_API" | "TIME_DRIVEN" | "TRIGGER" | "WEBAPP" | "EDITOR" | "SIMPLE_TRIGGER" | "MENU" | "BATCH_TASK" | (string & {});
  /** The executing users access level to the script. */
  userAccessLevel?: "USER_ACCESS_LEVEL_UNSPECIFIED" | "NONE" | "READ" | "WRITE" | "OWNER" | (string & {});
  /** Duration the execution spent executing. */
  duration?: string;
  /** Name of the script being executed. */
  projectName?: string;
  /** Which version of maestro to use to execute the script. */
  runtimeVersion?: "RUNTIME_VERSION_UNSPECIFIED" | "DEPRECATED_ES5" | "V8" | (string & {});
  /** Name of the function the started the execution. */
  functionName?: string;
}

export const GoogleAppsScriptTypeProcess: Schema.Schema<GoogleAppsScriptTypeProcess> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  processStatus: Schema.optional(Schema.String),
  processType: Schema.optional(Schema.String),
  userAccessLevel: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  projectName: Schema.optional(Schema.String),
  runtimeVersion: Schema.optional(Schema.String),
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsScriptTypeProcess" }) as any as Schema.Schema<GoogleAppsScriptTypeProcess>;

export interface ListUserProcessesResponse {
  /** Token for the next page of results. If empty, there are no more pages remaining. */
  nextPageToken?: string;
  /** List of processes matching request parameters. */
  processes?: Array<GoogleAppsScriptTypeProcess>;
}

export const ListUserProcessesResponse: Schema.Schema<ListUserProcessesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  processes: Schema.optional(Schema.Array(GoogleAppsScriptTypeProcess)),
})).annotate({ identifier: "ListUserProcessesResponse" }) as any as Schema.Schema<ListUserProcessesResponse>;

export interface GoogleAppsScriptTypeUser {
  /** The user's photo. */
  photoUrl?: string;
  /** The user's domain. */
  domain?: string;
  /** The user's identifying email address. */
  email?: string;
  /** The user's display name. */
  name?: string;
}

export const GoogleAppsScriptTypeUser: Schema.Schema<GoogleAppsScriptTypeUser> = Schema.suspend(() => Schema.Struct({
  photoUrl: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsScriptTypeUser" }) as any as Schema.Schema<GoogleAppsScriptTypeUser>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleAppsScriptTypeFunction {
  /** The function name in the script project. */
  name?: string;
  /** The ordered list of parameter names of the function in the script project. */
  parameters?: Array<string>;
}

export const GoogleAppsScriptTypeFunction: Schema.Schema<GoogleAppsScriptTypeFunction> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAppsScriptTypeFunction" }) as any as Schema.Schema<GoogleAppsScriptTypeFunction>;

export interface GoogleAppsScriptTypeFunctionSet {
  /** A list of functions composing the set. */
  values?: Array<GoogleAppsScriptTypeFunction>;
}

export const GoogleAppsScriptTypeFunctionSet: Schema.Schema<GoogleAppsScriptTypeFunctionSet> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(GoogleAppsScriptTypeFunction)),
})).annotate({ identifier: "GoogleAppsScriptTypeFunctionSet" }) as any as Schema.Schema<GoogleAppsScriptTypeFunctionSet>;

export interface File {
  /** The user who modified the file most recently. The details visible in this object are controlled by the profile visibility settings of the last modifying user. */
  lastModifyUser?: GoogleAppsScriptTypeUser;
  /** The type of the file. */
  type?: "ENUM_TYPE_UNSPECIFIED" | "SERVER_JS" | "HTML" | "JSON" | (string & {});
  /** The file content. */
  source?: string;
  /** Last modified date timestamp. */
  updateTime?: string;
  /** Creation date timestamp. */
  createTime?: string;
  /** The name of the file. The file extension is not part of the file name, which can be identified from the type field. */
  name?: string;
  /** The defined set of functions in the script file, if any. */
  functionSet?: GoogleAppsScriptTypeFunctionSet;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  lastModifyUser: Schema.optional(GoogleAppsScriptTypeUser),
  type: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  functionSet: Schema.optional(GoogleAppsScriptTypeFunctionSet),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface Content {
  /** The list of script project files. One of the files is a script manifest; it must be named "appsscript", must have type of JSON, and include the manifest configurations for the project. */
  files?: Array<File>;
  /** The script project's Drive ID. */
  scriptId?: string;
}

export const Content: Schema.Schema<Content> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(File)),
  scriptId: Schema.optional(Schema.String),
})).annotate({ identifier: "Content" }) as any as Schema.Schema<Content>;

export interface Status {
  /** An array that contains a single ExecutionError object that provides information about the nature of the error. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which is in English. Any user-facing error message is localized and sent in the details field, or localized by the client. */
  message?: string;
  /** The status code. For this API, this value either: - 10, indicating a `SCRIPT_TIMEOUT` error, - 3, indicating an `INVALID_ARGUMENT` error, or - 1, indicating a `CANCELLED` execution. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** This field indicates whether the script execution has completed. A completed execution has a populated `response` field containing the ExecutionResponse from function that was executed. */
  done?: boolean;
  /** If a `run` call succeeds but the script function (or Apps Script itself) throws an exception, this field contains a Status object. The `Status` object's `details` field contains an array with a single ExecutionError object that provides information about the nature of the error. */
  error?: Status;
  /** If the script function returns successfully, this field contains an ExecutionResponse object with the function's return value. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface DeploymentConfig {
  /** The manifest file name for this deployment. */
  manifestFileName?: string;
  /** The script project's Drive ID. */
  scriptId?: string;
  /** The description for this deployment. */
  description?: string;
  /** The version number on which this deployment is based. */
  versionNumber?: number;
}

export const DeploymentConfig: Schema.Schema<DeploymentConfig> = Schema.suspend(() => Schema.Struct({
  manifestFileName: Schema.optional(Schema.String),
  scriptId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  versionNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeploymentConfig" }) as any as Schema.Schema<DeploymentConfig>;

export interface CreateProjectRequest {
  /** The title for the project. */
  title?: string;
  /** The Drive ID of a parent file that the created script project is bound to. This is usually the ID of a Google Doc, Google Sheet, Google Form, or Google Slides file. If not set, a standalone script project is created. */
  parentId?: string;
}

export const CreateProjectRequest: Schema.Schema<CreateProjectRequest> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  parentId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateProjectRequest" }) as any as Schema.Schema<CreateProjectRequest>;

export interface ScriptStackTraceElement {
  /** The name of the function that failed. */
  function?: string;
  /** The line number where the script failed. */
  lineNumber?: number;
}

export const ScriptStackTraceElement: Schema.Schema<ScriptStackTraceElement> = Schema.suspend(() => Schema.Struct({
  function: Schema.optional(Schema.String),
  lineNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "ScriptStackTraceElement" }) as any as Schema.Schema<ScriptStackTraceElement>;

export interface MetricsValue {
  /** Indicates the number of executions counted. */
  value?: string;
  /** Required field indicating the start time of the interval. */
  startTime?: string;
  /** Required field indicating the end time of the interval. */
  endTime?: string;
}

export const MetricsValue: Schema.Schema<MetricsValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "MetricsValue" }) as any as Schema.Schema<MetricsValue>;

export interface Deployment {
  /** The deployment configuration. */
  deploymentConfig?: DeploymentConfig;
  /** The deployment's entry points. */
  entryPoints?: Array<EntryPoint>;
  /** The deployment ID for this deployment. */
  deploymentId?: string;
  /** Last modified date time stamp. */
  updateTime?: string;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() => Schema.Struct({
  deploymentConfig: Schema.optional(DeploymentConfig),
  entryPoints: Schema.optional(Schema.Array(EntryPoint)),
  deploymentId: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface Metrics {
  /** Number of active users. */
  activeUsers?: Array<MetricsValue>;
  /** Number of total executions. */
  totalExecutions?: Array<MetricsValue>;
  /** Number of failed executions. */
  failedExecutions?: Array<MetricsValue>;
}

export const Metrics: Schema.Schema<Metrics> = Schema.suspend(() => Schema.Struct({
  activeUsers: Schema.optional(Schema.Array(MetricsValue)),
  totalExecutions: Schema.optional(Schema.Array(MetricsValue)),
  failedExecutions: Schema.optional(Schema.Array(MetricsValue)),
})).annotate({ identifier: "Metrics" }) as any as Schema.Schema<Metrics>;

export interface ExecutionRequest {
  /** The name of the function to execute in the given script. The name does not include parentheses or parameters. It can reference a function in an included library such as `Library.libFunction1`. */
  function?: string;
  /** *Deprecated*. For use with Android add-ons only. An ID that represents the user's current session in the Android app for Google Docs or Sheets, included as extra data in the [Intent](https://developer.android.com/guide/components/intents-filters.html) that launches the add-on. When an Android add-on is run with a session state, it gains the privileges of a [bound](https://developers.google.com/apps-script/guides/bound) script—that is, it can access information like the user's current cursor position (in Docs) or selected cell (in Sheets). To retrieve the state, call `Intent.getStringExtra("com.google.android.apps.docs.addons.SessionState")`. Optional. */
  sessionState?: string;
  /** The parameters to be passed to the function being executed. The object type for each parameter should match the expected type in Apps Script. Parameters cannot be Apps Script-specific object types (such as a `Document` or a `Calendar`); they can only be primitive types such as `string`, `number`, `array`, `object`, or `boolean`. Optional. */
  parameters?: Array<unknown>;
  /** If `true` and the user is an owner of the script, the script runs at the most recently saved version rather than the version deployed for use with the Apps Script API. Optional; default is `false`. */
  devMode?: boolean;
}

export const ExecutionRequest: Schema.Schema<ExecutionRequest> = Schema.suspend(() => Schema.Struct({
  function: Schema.optional(Schema.String),
  sessionState: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(Schema.Unknown)),
  devMode: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ExecutionRequest" }) as any as Schema.Schema<ExecutionRequest>;

export interface Version {
  /** The description for this version. */
  description?: string;
  /** When the version was created. */
  createTime?: string;
  /** The incremental ID that is created by Apps Script when a version is created. This is system assigned number and is immutable once created. */
  versionNumber?: number;
  /** The script project's Drive ID. */
  scriptId?: string;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  versionNumber: Schema.optional(Schema.Number),
  scriptId: Schema.optional(Schema.String),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface UpdateDeploymentRequest {
  /** The deployment configuration. */
  deploymentConfig?: DeploymentConfig;
}

export const UpdateDeploymentRequest: Schema.Schema<UpdateDeploymentRequest> = Schema.suspend(() => Schema.Struct({
  deploymentConfig: Schema.optional(DeploymentConfig),
})).annotate({ identifier: "UpdateDeploymentRequest" }) as any as Schema.Schema<UpdateDeploymentRequest>;

export interface ListScriptProcessesResponse {
  /** List of processes matching request parameters. */
  processes?: Array<GoogleAppsScriptTypeProcess>;
  /** Token for the next page of results. If empty, there are no more pages remaining. */
  nextPageToken?: string;
}

export const ListScriptProcessesResponse: Schema.Schema<ListScriptProcessesResponse> = Schema.suspend(() => Schema.Struct({
  processes: Schema.optional(Schema.Array(GoogleAppsScriptTypeProcess)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListScriptProcessesResponse" }) as any as Schema.Schema<ListScriptProcessesResponse>;

export interface Project {
  /** When the script was last updated. */
  updateTime?: string;
  /** The title for the project. */
  title?: string;
  /** User who last modified the script. */
  lastModifyUser?: GoogleAppsScriptTypeUser;
  /** The script project's Drive ID. */
  scriptId?: string;
  /** User who originally created the script. */
  creator?: GoogleAppsScriptTypeUser;
  /** The parent's Drive ID that the script will be attached to. This is usually the ID of a Google Document or Google Sheet. This field is optional, and if not set, a stand-alone script will be created. */
  parentId?: string;
  /** When the script was created. */
  createTime?: string;
}

export const Project: Schema.Schema<Project> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  lastModifyUser: Schema.optional(GoogleAppsScriptTypeUser),
  scriptId: Schema.optional(Schema.String),
  creator: Schema.optional(GoogleAppsScriptTypeUser),
  parentId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Project" }) as any as Schema.Schema<Project>;

export interface ExecutionResponse {
  /** The return value of the script function. The type matches the object type returned in Apps Script. Functions called using the Apps Script API cannot return Apps Script-specific objects (such as a `Document` or a `Calendar`); they can only return primitive types such as a `string`, `number`, `array`, `object`, or `boolean`. */
  result?: unknown;
}

export const ExecutionResponse: Schema.Schema<ExecutionResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "ExecutionResponse" }) as any as Schema.Schema<ExecutionResponse>;

export interface ListVersionsResponse {
  /** The token use to fetch the next page of records. if not exist in the response, that means no more versions to list. */
  nextPageToken?: string;
  /** The list of versions. */
  versions?: Array<Version>;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  versions: Schema.optional(Schema.Array(Version)),
})).annotate({ identifier: "ListVersionsResponse" }) as any as Schema.Schema<ListVersionsResponse>;

export interface ExecutionError {
  /** The error message thrown by Apps Script, usually localized into the user's language. */
  errorMessage?: string;
  /** An array of objects that provide a stack trace through the script to show where the execution failed, with the deepest call first. */
  scriptStackTraceElements?: Array<ScriptStackTraceElement>;
  /** The error type, for example `TypeError` or `ReferenceError`. If the error type is unavailable, this field is not included. */
  errorType?: string;
}

export const ExecutionError: Schema.Schema<ExecutionError> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
  scriptStackTraceElements: Schema.optional(Schema.Array(ScriptStackTraceElement)),
  errorType: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutionError" }) as any as Schema.Schema<ExecutionError>;

export interface ListDeploymentsResponse {
  /** The token that can be used in the next call to get the next page of results. */
  nextPageToken?: string;
  /** The list of deployments. */
  deployments?: Array<Deployment>;
}

export const ListDeploymentsResponse: Schema.Schema<ListDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  deployments: Schema.optional(Schema.Array(Deployment)),
})).annotate({ identifier: "ListDeploymentsResponse" }) as any as Schema.Schema<ListDeploymentsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Get metrics data for scripts, such as number of executions and active users. */
export interface GetMetricsProjectsRequest {
  /** Required field indicating what granularity of metrics are returned. */
  metricsGranularity?: "UNSPECIFIED_GRANULARITY" | "WEEKLY" | "DAILY" | (string & {});
  /** Optional field indicating a specific deployment to retrieve metrics from. */
  "metricsFilter.deploymentId"?: string;
  /** Required field indicating the script to get metrics for. */
  scriptId: string;
}

export const GetMetricsProjectsRequest = Schema.Struct({
  metricsGranularity: Schema.optional(Schema.String).pipe(T.HttpQuery("metricsGranularity")),
  "metricsFilter.deploymentId": Schema.optional(Schema.String).pipe(T.HttpQuery("metricsFilter.deploymentId")),
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}/metrics" }),
  svc,
) as unknown as Schema.Schema<GetMetricsProjectsRequest>;

export type GetMetricsProjectsResponse = Metrics;
export const GetMetricsProjectsResponse = Metrics;

export type GetMetricsProjectsError = CommonErrors;

export const getMetricsProjects: API.OperationMethod<GetMetricsProjectsRequest, GetMetricsProjectsResponse, GetMetricsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetricsProjectsRequest,
  output: GetMetricsProjectsResponse,
  errors: [],
}));

/** Creates a new, empty script project with no script files and a base manifest file. */
export interface CreateProjectsRequest {
  /** Request body */
  body?: CreateProjectRequest;
}

export const CreateProjectsRequest = Schema.Struct({
  body: Schema.optional(CreateProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsRequest>;

export type CreateProjectsResponse = Project;
export const CreateProjectsResponse = Project;

export type CreateProjectsError = CommonErrors;

export const createProjects: API.OperationMethod<CreateProjectsRequest, CreateProjectsResponse, CreateProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsRequest,
  output: CreateProjectsResponse,
  errors: [],
}));

/** Gets a script project's metadata. */
export interface GetProjectsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
}

export const GetProjectsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRequest>;

export type GetProjectsResponse = Project;
export const GetProjectsResponse = Project;

export type GetProjectsError = CommonErrors;

export const getProjects: API.OperationMethod<GetProjectsRequest, GetProjectsResponse, GetProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [],
}));

/** Gets the content of the script project, including the code source and metadata for each script file. */
export interface GetContentProjectsRequest {
  /** The version number of the project to retrieve. If not provided, the project's HEAD version is returned. */
  versionNumber?: number;
  /** The script project's Drive ID. */
  scriptId: string;
}

export const GetContentProjectsRequest = Schema.Struct({
  versionNumber: Schema.optional(Schema.Number).pipe(T.HttpQuery("versionNumber")),
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}/content" }),
  svc,
) as unknown as Schema.Schema<GetContentProjectsRequest>;

export type GetContentProjectsResponse = Content;
export const GetContentProjectsResponse = Content;

export type GetContentProjectsError = CommonErrors;

export const getContentProjects: API.OperationMethod<GetContentProjectsRequest, GetContentProjectsResponse, GetContentProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentProjectsRequest,
  output: GetContentProjectsResponse,
  errors: [],
}));

/** Updates the content of the specified script project. This content is stored as the HEAD version, and is used when the script is executed as a trigger, in the script editor, in add-on preview mode, or as a web app or Apps Script API in development mode. This clears all the existing files in the project. */
export interface UpdateContentProjectsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
  /** Request body */
  body?: Content;
}

export const UpdateContentProjectsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  body: Schema.optional(Content).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{scriptId}/content", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateContentProjectsRequest>;

export type UpdateContentProjectsResponse = Content;
export const UpdateContentProjectsResponse = Content;

export type UpdateContentProjectsError = CommonErrors;

export const updateContentProjects: API.OperationMethod<UpdateContentProjectsRequest, UpdateContentProjectsResponse, UpdateContentProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateContentProjectsRequest,
  output: UpdateContentProjectsResponse,
  errors: [],
}));

/** Creates a deployment of an Apps Script project. */
export interface CreateProjectsDeploymentsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
  /** Request body */
  body?: DeploymentConfig;
}

export const CreateProjectsDeploymentsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  body: Schema.optional(DeploymentConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{scriptId}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDeploymentsRequest>;

export type CreateProjectsDeploymentsResponse = Deployment;
export const CreateProjectsDeploymentsResponse = Deployment;

export type CreateProjectsDeploymentsError = CommonErrors;

export const createProjectsDeployments: API.OperationMethod<CreateProjectsDeploymentsRequest, CreateProjectsDeploymentsResponse, CreateProjectsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsDeploymentsRequest,
  output: CreateProjectsDeploymentsResponse,
  errors: [],
}));

/** Lists the deployments of an Apps Script project. */
export interface ListProjectsDeploymentsRequest {
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from a previous response. */
  pageToken?: string;
  /** The maximum number of deployments on each returned page. Defaults to 50. */
  pageSize?: number;
  /** The script project's Drive ID. */
  scriptId: string;
}

export const ListProjectsDeploymentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDeploymentsRequest>;

export type ListProjectsDeploymentsResponse = ListDeploymentsResponse;
export const ListProjectsDeploymentsResponse = ListDeploymentsResponse;

export type ListProjectsDeploymentsError = CommonErrors;

export const listProjectsDeployments = API.makePaginated(() => ({
  input: ListProjectsDeploymentsRequest,
  output: ListProjectsDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a deployment of an Apps Script project. */
export interface DeleteProjectsDeploymentsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
  /** The deployment ID to be undeployed. */
  deploymentId: string;
}

export const DeleteProjectsDeploymentsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{scriptId}/deployments/{deploymentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDeploymentsRequest>;

export type DeleteProjectsDeploymentsResponse = Empty;
export const DeleteProjectsDeploymentsResponse = Empty;

export type DeleteProjectsDeploymentsError = CommonErrors;

export const deleteProjectsDeployments: API.OperationMethod<DeleteProjectsDeploymentsRequest, DeleteProjectsDeploymentsResponse, DeleteProjectsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsDeploymentsRequest,
  output: DeleteProjectsDeploymentsResponse,
  errors: [],
}));

/** Gets a deployment of an Apps Script project. */
export interface GetProjectsDeploymentsRequest {
  /** The deployment ID. */
  deploymentId: string;
  /** The script project's Drive ID. */
  scriptId: string;
}

export const GetProjectsDeploymentsRequest = Schema.Struct({
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}/deployments/{deploymentId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsDeploymentsRequest>;

export type GetProjectsDeploymentsResponse = Deployment;
export const GetProjectsDeploymentsResponse = Deployment;

export type GetProjectsDeploymentsError = CommonErrors;

export const getProjectsDeployments: API.OperationMethod<GetProjectsDeploymentsRequest, GetProjectsDeploymentsResponse, GetProjectsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsDeploymentsRequest,
  output: GetProjectsDeploymentsResponse,
  errors: [],
}));

/** Updates a deployment of an Apps Script project. */
export interface UpdateProjectsDeploymentsRequest {
  /** The deployment ID for this deployment. */
  deploymentId: string;
  /** The script project's Drive ID. */
  scriptId: string;
  /** Request body */
  body?: UpdateDeploymentRequest;
}

export const UpdateProjectsDeploymentsRequest = Schema.Struct({
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  body: Schema.optional(UpdateDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{scriptId}/deployments/{deploymentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsDeploymentsRequest>;

export type UpdateProjectsDeploymentsResponse = Deployment;
export const UpdateProjectsDeploymentsResponse = Deployment;

export type UpdateProjectsDeploymentsError = CommonErrors;

export const updateProjectsDeployments: API.OperationMethod<UpdateProjectsDeploymentsRequest, UpdateProjectsDeploymentsResponse, UpdateProjectsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsDeploymentsRequest,
  output: UpdateProjectsDeploymentsResponse,
  errors: [],
}));

/** List the versions of a script project. */
export interface ListProjectsVersionsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from a previous response. */
  pageToken?: string;
  /** The maximum number of versions on each returned page. Defaults to 50. */
  pageSize?: number;
}

export const ListProjectsVersionsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsVersionsRequest>;

export type ListProjectsVersionsResponse = ListVersionsResponse;
export const ListProjectsVersionsResponse = ListVersionsResponse;

export type ListProjectsVersionsError = CommonErrors;

export const listProjectsVersions = API.makePaginated(() => ({
  input: ListProjectsVersionsRequest,
  output: ListProjectsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a version of a script project. */
export interface GetProjectsVersionsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
  /** The version number. */
  versionNumber: number;
}

export const GetProjectsVersionsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  versionNumber: Schema.Number.pipe(T.HttpPath("versionNumber")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{scriptId}/versions/{versionNumber}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsVersionsRequest>;

export type GetProjectsVersionsResponse = Version;
export const GetProjectsVersionsResponse = Version;

export type GetProjectsVersionsError = CommonErrors;

export const getProjectsVersions: API.OperationMethod<GetProjectsVersionsRequest, GetProjectsVersionsResponse, GetProjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsVersionsRequest,
  output: GetProjectsVersionsResponse,
  errors: [],
}));

/** Creates a new immutable version using the current code, with a unique version number. */
export interface CreateProjectsVersionsRequest {
  /** The script project's Drive ID. */
  scriptId: string;
  /** Request body */
  body?: Version;
}

export const CreateProjectsVersionsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  body: Schema.optional(Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{scriptId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsVersionsRequest>;

export type CreateProjectsVersionsResponse = Version;
export const CreateProjectsVersionsResponse = Version;

export type CreateProjectsVersionsError = CommonErrors;

export const createProjectsVersions: API.OperationMethod<CreateProjectsVersionsRequest, CreateProjectsVersionsResponse, CreateProjectsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsVersionsRequest,
  output: CreateProjectsVersionsResponse,
  errors: [],
}));

/** List information about a script's executed processes, such as process type and current status. */
export interface ListScriptProcessesProcessesRequest {
  /** Optional field used to limit returned processes to those that were started on or after the given timestamp. */
  "scriptProcessFilter.startTime"?: string;
  /** Optional field used to limit returned processes to those originating from projects with a specific deployment ID. */
  "scriptProcessFilter.deploymentId"?: string;
  /** Optional field used to limit returned processes to those having one of the specified process statuses. */
  "scriptProcessFilter.statuses"?: "PROCESS_STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELED" | "FAILED" | "TIMED_OUT" | "UNKNOWN" | "DELAYED" | "EXECUTION_DISABLED" | (string & {})[];
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from a previous response. */
  pageToken?: string;
  /** Optional field used to limit returned processes to those that completed on or before the given timestamp. */
  "scriptProcessFilter.endTime"?: string;
  /** The script ID of the project whose processes are listed. */
  scriptId?: string;
  /** The maximum number of returned processes per page of results. Defaults to 50. */
  pageSize?: number;
  /** Optional field used to limit returned processes to those originating from a script function with the given function name. */
  "scriptProcessFilter.functionName"?: string;
  /** Optional field used to limit returned processes to those having one of the specified process types. */
  "scriptProcessFilter.types"?: "PROCESS_TYPE_UNSPECIFIED" | "ADD_ON" | "EXECUTION_API" | "TIME_DRIVEN" | "TRIGGER" | "WEBAPP" | "EDITOR" | "SIMPLE_TRIGGER" | "MENU" | "BATCH_TASK" | (string & {})[];
  /** Optional field used to limit returned processes to those having one of the specified user access levels. */
  "scriptProcessFilter.userAccessLevels"?: "USER_ACCESS_LEVEL_UNSPECIFIED" | "NONE" | "READ" | "WRITE" | "OWNER" | (string & {})[];
}

export const ListScriptProcessesProcessesRequest = Schema.Struct({
  "scriptProcessFilter.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("scriptProcessFilter.startTime")),
  "scriptProcessFilter.deploymentId": Schema.optional(Schema.String).pipe(T.HttpQuery("scriptProcessFilter.deploymentId")),
  "scriptProcessFilter.statuses": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("scriptProcessFilter.statuses")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "scriptProcessFilter.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("scriptProcessFilter.endTime")),
  scriptId: Schema.optional(Schema.String).pipe(T.HttpQuery("scriptId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "scriptProcessFilter.functionName": Schema.optional(Schema.String).pipe(T.HttpQuery("scriptProcessFilter.functionName")),
  "scriptProcessFilter.types": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("scriptProcessFilter.types")),
  "scriptProcessFilter.userAccessLevels": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("scriptProcessFilter.userAccessLevels")),
}).pipe(
  T.Http({ method: "GET", path: "v1/processes:listScriptProcesses" }),
  svc,
) as unknown as Schema.Schema<ListScriptProcessesProcessesRequest>;

export type ListScriptProcessesProcessesResponse = ListScriptProcessesResponse;
export const ListScriptProcessesProcessesResponse = ListScriptProcessesResponse;

export type ListScriptProcessesProcessesError = CommonErrors;

export const listScriptProcessesProcesses = API.makePaginated(() => ({
  input: ListScriptProcessesProcessesRequest,
  output: ListScriptProcessesProcessesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List information about processes made by or on behalf of a user, such as process type and current status. */
export interface ListProcessesRequest {
  /** Optional field used to limit returned processes to those originating from a script function with the given function name. */
  "userProcessFilter.functionName"?: string;
  /** The maximum number of returned processes per page of results. Defaults to 50. */
  pageSize?: number;
  /** Optional field used to limit returned processes to those having one of the specified user access levels. */
  "userProcessFilter.userAccessLevels"?: "USER_ACCESS_LEVEL_UNSPECIFIED" | "NONE" | "READ" | "WRITE" | "OWNER" | (string & {})[];
  /** Optional field used to limit returned processes to those having one of the specified process statuses. */
  "userProcessFilter.statuses"?: "PROCESS_STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELED" | "FAILED" | "TIMED_OUT" | "UNKNOWN" | "DELAYED" | "EXECUTION_DISABLED" | (string & {})[];
  /** Optional field used to limit returned processes to those originating from projects with a specific deployment ID. */
  "userProcessFilter.deploymentId"?: string;
  /** Optional field used to limit returned processes to those originating from projects with a specific script ID. */
  "userProcessFilter.scriptId"?: string;
  /** The token for continuing a previous list request on the next page. This should be set to the value of `nextPageToken` from a previous response. */
  pageToken?: string;
  /** Optional field used to limit returned processes to those having one of the specified process types. */
  "userProcessFilter.types"?: "PROCESS_TYPE_UNSPECIFIED" | "ADD_ON" | "EXECUTION_API" | "TIME_DRIVEN" | "TRIGGER" | "WEBAPP" | "EDITOR" | "SIMPLE_TRIGGER" | "MENU" | "BATCH_TASK" | (string & {})[];
  /** Optional field used to limit returned processes to those that were started on or after the given timestamp. */
  "userProcessFilter.startTime"?: string;
  /** Optional field used to limit returned processes to those that completed on or before the given timestamp. */
  "userProcessFilter.endTime"?: string;
  /** Optional field used to limit returned processes to those originating from projects with project names containing a specific string. */
  "userProcessFilter.projectName"?: string;
}

export const ListProcessesRequest = Schema.Struct({
  "userProcessFilter.functionName": Schema.optional(Schema.String).pipe(T.HttpQuery("userProcessFilter.functionName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  "userProcessFilter.userAccessLevels": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("userProcessFilter.userAccessLevels")),
  "userProcessFilter.statuses": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("userProcessFilter.statuses")),
  "userProcessFilter.deploymentId": Schema.optional(Schema.String).pipe(T.HttpQuery("userProcessFilter.deploymentId")),
  "userProcessFilter.scriptId": Schema.optional(Schema.String).pipe(T.HttpQuery("userProcessFilter.scriptId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "userProcessFilter.types": Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("userProcessFilter.types")),
  "userProcessFilter.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("userProcessFilter.startTime")),
  "userProcessFilter.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("userProcessFilter.endTime")),
  "userProcessFilter.projectName": Schema.optional(Schema.String).pipe(T.HttpQuery("userProcessFilter.projectName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/processes" }),
  svc,
) as unknown as Schema.Schema<ListProcessesRequest>;

export type ListProcessesResponse = ListUserProcessesResponse;
export const ListProcessesResponse = ListUserProcessesResponse;

export type ListProcessesError = CommonErrors;

export const listProcesses = API.makePaginated(() => ({
  input: ListProcessesRequest,
  output: ListProcessesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface RunScriptsRequest {
  /** The script ID of the script to be executed. Find the script ID on the **Project settings** page under "IDs." As multiple executable APIs can be deployed in new IDE for same script, this field should be populated with DeploymentID generated while deploying in new IDE instead of script ID. */
  scriptId: string;
  /** Request body */
  body?: ExecutionRequest;
}

export const RunScriptsRequest = Schema.Struct({
  scriptId: Schema.String.pipe(T.HttpPath("scriptId")),
  body: Schema.optional(ExecutionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/scripts/{scriptId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunScriptsRequest>;

export type RunScriptsResponse = Operation;
export const RunScriptsResponse = Operation;

export type RunScriptsError = CommonErrors;

export const runScripts: API.OperationMethod<RunScriptsRequest, RunScriptsResponse, RunScriptsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunScriptsRequest,
  output: RunScriptsResponse,
  errors: [],
}));

