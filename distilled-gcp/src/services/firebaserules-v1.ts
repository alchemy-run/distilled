// ==========================================================================
// Firebase Rules API (firebaserules v1)
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
  name: "firebaserules",
  version: "v1",
  rootUrl: "https://firebaserules.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Arg {
  /** Argument exactly matches value provided. */
  exactValue?: unknown;
  /** Argument matches any value provided. */
  anyValue?: Empty;
}

export const Arg: Schema.Schema<Arg> = Schema.suspend(() => Schema.Struct({
  exactValue: Schema.optional(Schema.Unknown),
  anyValue: Schema.optional(Empty),
})).annotate({ identifier: "Arg" }) as any as Schema.Schema<Arg>;

export interface Result {
  /** The result is an actual value. The type of the value must match that of the type declared by the service. */
  value?: unknown;
  /** The result is undefined, meaning the result could not be computed. */
  undefined?: Empty;
}

export const Result: Schema.Schema<Result> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  undefined: Schema.optional(Empty),
})).annotate({ identifier: "Result" }) as any as Schema.Schema<Result>;

export interface FunctionMock {
  /** The mock result of the function call. */
  result?: Result;
  /** The list of `Arg` values to match. The order in which the arguments are provided is the order in which they must appear in the function invocation. */
  args?: Array<Arg>;
  /** The name of the function. The function name must match one provided by a service declaration. */
  function?: string;
}

export const FunctionMock: Schema.Schema<FunctionMock> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(Result),
  args: Schema.optional(Schema.Array(Arg)),
  function: Schema.optional(Schema.String),
})).annotate({ identifier: "FunctionMock" }) as any as Schema.Schema<FunctionMock>;

export interface SourcePosition {
  /** Line number of the source fragment. 1-based. */
  line?: number;
  /** Name of the `File`. */
  fileName?: string;
  /** Start position relative to the beginning of the file. */
  currentOffset?: number;
  /** First column on the source line associated with the source fragment. */
  column?: number;
  /** End position relative to the beginning of the file. */
  endOffset?: number;
}

export const SourcePosition: Schema.Schema<SourcePosition> = Schema.suspend(() => Schema.Struct({
  line: Schema.optional(Schema.Number),
  fileName: Schema.optional(Schema.String),
  currentOffset: Schema.optional(Schema.Number),
  column: Schema.optional(Schema.Number),
  endOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "SourcePosition" }) as any as Schema.Schema<SourcePosition>;

export interface VisitedExpression {
  /** The evaluated value for the visited expression, e.g. true/false */
  value?: unknown;
  /** Position in the `Source` or `Ruleset` where an expression was visited. */
  sourcePosition?: SourcePosition;
}

export const VisitedExpression: Schema.Schema<VisitedExpression> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  sourcePosition: Schema.optional(SourcePosition),
})).annotate({ identifier: "VisitedExpression" }) as any as Schema.Schema<VisitedExpression>;

export interface FunctionCall {
  /** Name of the function invoked. */
  function?: string;
  /** The arguments that were provided to the function. */
  args?: Array<unknown>;
}

export const FunctionCall: Schema.Schema<FunctionCall> = Schema.suspend(() => Schema.Struct({
  function: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Schema.Unknown)),
})).annotate({ identifier: "FunctionCall" }) as any as Schema.Schema<FunctionCall>;

export interface ValueCount {
  /** The amount of times that expression returned. */
  count?: number;
  /** The return value of the expression */
  value?: unknown;
}

export const ValueCount: Schema.Schema<ValueCount> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "ValueCount" }) as any as Schema.Schema<ValueCount>;

export interface ExpressionReport {
  /** Position of expression in original rules source. */
  sourcePosition?: SourcePosition;
  /** Subexpressions */
  children?: Array<ExpressionReport>;
  /** Values that this expression evaluated to when encountered. */
  values?: Array<ValueCount>;
}

export const ExpressionReport: Schema.Schema<ExpressionReport> = Schema.suspend(() => Schema.Struct({
  sourcePosition: Schema.optional(SourcePosition),
  children: Schema.optional(Schema.Array(ExpressionReport)),
  values: Schema.optional(Schema.Array(ValueCount)),
})).annotate({ identifier: "ExpressionReport" }) as any as Schema.Schema<ExpressionReport>;

export interface TestResult {
  /** State of the test. */
  state?: "STATE_UNSPECIFIED" | "SUCCESS" | "FAILURE" | (string & {});
  /** The set of visited permission expressions for a given test. This returns the positions and evaluation results of all visited permission expressions which were relevant to the test case, e.g. ``` match /path { allow read if: } ``` For a detailed report of the intermediate evaluation states, see the `expression_reports` field */
  visitedExpressions?: Array<VisitedExpression>;
  /** Debug messages related to test execution issues encountered during evaluation. Debug messages may be related to too many or too few invocations of function mocks or to runtime errors that occur during evaluation. For example: ```Unable to read variable [name: "resource"]``` */
  debugMessages?: Array<string>;
  /** The set of function calls made to service-defined methods. Function calls are included in the order in which they are encountered during evaluation, are provided for both mocked and unmocked functions, and included on the response regardless of the test `state`. */
  functionCalls?: Array<FunctionCall>;
  /** Position in the `Source` or `Ruleset` where the principle runtime error occurs. Evaluation of an expression may result in an error. Rules are deny by default, so a `DENY` expectation when an error is generated is valid. When there is a `DENY` with an error, the `SourcePosition` is returned. E.g. `error_position { line: 19 column: 37 }` */
  errorPosition?: SourcePosition;
  /** The mapping from expression in the ruleset AST to the values they were evaluated to. Partially-nested to mirror AST structure. Note that this field is actually tracking expressions and not permission statements in contrast to the "visited_expressions" field above. Literal expressions are omitted. */
  expressionReports?: Array<ExpressionReport>;
}

export const TestResult: Schema.Schema<TestResult> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  visitedExpressions: Schema.optional(Schema.Array(VisitedExpression)),
  debugMessages: Schema.optional(Schema.Array(Schema.String)),
  functionCalls: Schema.optional(Schema.Array(FunctionCall)),
  errorPosition: Schema.optional(SourcePosition),
  expressionReports: Schema.optional(Schema.Array(ExpressionReport)),
})).annotate({ identifier: "TestResult" }) as any as Schema.Schema<TestResult>;

export interface Metadata {
  /** Services that this ruleset has declarations for (e.g., "cloud.firestore"). There may be 0+ of these. */
  services?: Array<string>;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface TestCase {
  /** Specifies what should be included in the response. */
  expressionReportLevel?: "LEVEL_UNSPECIFIED" | "NONE" | "FULL" | "VISITED" | (string & {});
  /** Specifies whether paths (such as request.path) are encoded and how. */
  pathEncoding?: "ENCODING_UNSPECIFIED" | "URL_ENCODED" | "PLAIN" | (string & {});
  /** Optional resource value as it appears in persistent storage before the request is fulfilled. The resource type depends on the `request.path` value. */
  resource?: unknown;
  /** Test expectation. */
  expectation?: "EXPECTATION_UNSPECIFIED" | "ALLOW" | "DENY" | (string & {});
  /** Request context. The exact format of the request context is service-dependent. See the appropriate service documentation for information about the supported fields and types on the request. Minimally, all services support the following fields and types: Request field | Type ---------------|----------------- auth.uid | `string` auth.token | `map` headers | `map` method | `string` params | `map` path | `string` time | `google.protobuf.Timestamp` If the request value is not well-formed for the service, the request will be rejected as an invalid argument. */
  request?: unknown;
  /** Optional function mocks for service-defined functions. If not set, any service defined function is expected to return an error, which may or may not influence the test outcome. */
  functionMocks?: Array<FunctionMock>;
}

export const TestCase: Schema.Schema<TestCase> = Schema.suspend(() => Schema.Struct({
  expressionReportLevel: Schema.optional(Schema.String),
  pathEncoding: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.Unknown),
  expectation: Schema.optional(Schema.String),
  request: Schema.optional(Schema.Unknown),
  functionMocks: Schema.optional(Schema.Array(FunctionMock)),
})).annotate({ identifier: "TestCase" }) as any as Schema.Schema<TestCase>;

export interface TestSuite {
  /** Collection of test cases associated with the `TestSuite`. */
  testCases?: Array<TestCase>;
}

export const TestSuite: Schema.Schema<TestSuite> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(TestCase)),
})).annotate({ identifier: "TestSuite" }) as any as Schema.Schema<TestSuite>;

export interface Issue {
  /** Short error description. */
  description?: string;
  /** The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "DEPRECATION" | "WARNING" | "ERROR" | (string & {});
  /** Position of the issue in the `Source`. */
  sourcePosition?: SourcePosition;
}

export const Issue: Schema.Schema<Issue> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  sourcePosition: Schema.optional(SourcePosition),
})).annotate({ identifier: "Issue" }) as any as Schema.Schema<Issue>;

export interface Release {
  /** Output only. Time the release was updated. */
  updateTime?: string;
  /** Output only. Time the release was created. */
  createTime?: string;
  /** Required. Name of the `Ruleset` referred to by this `Release`. The `Ruleset` must exist for the `Release` to be created. */
  rulesetName?: string;
  /** Required. Format: `projects/{project_id}/releases/{release_id}` */
  name?: string;
}

export const Release: Schema.Schema<Release> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  rulesetName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Release" }) as any as Schema.Schema<Release>;

export interface UpdateReleaseRequest {
  /** Optional. Specifies which fields to update. */
  updateMask?: string;
  /** Required. `Release` to update. */
  release?: Release;
}

export const UpdateReleaseRequest: Schema.Schema<UpdateReleaseRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  release: Schema.optional(Release),
})).annotate({ identifier: "UpdateReleaseRequest" }) as any as Schema.Schema<UpdateReleaseRequest>;

export interface File {
  /** Fingerprint (e.g. github sha) associated with the `File`. */
  fingerprint?: string;
  /** Required. File name. */
  name?: string;
  /** Required. Textual Content. */
  content?: string;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  fingerprint: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface Source {
  /** Required. `File` set constituting the `Source` bundle. */
  files?: Array<File>;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Array(File)),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface TestRulesetRequest {
  /** Optional. Optional `Source` to be checked for correctness. This field must not be set when the resource name refers to a `Ruleset`. */
  source?: Source;
  /** Required. The tests to execute against the `Source`. When `Source` is provided inline, the test cases will only be run if the `Source` is syntactically and semantically valid. Inline `TestSuite` to run. */
  testSuite?: TestSuite;
}

export const TestRulesetRequest: Schema.Schema<TestRulesetRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Source),
  testSuite: Schema.optional(TestSuite),
})).annotate({ identifier: "TestRulesetRequest" }) as any as Schema.Schema<TestRulesetRequest>;

export interface Ruleset {
  /** Output only. Time the `Ruleset` was created. */
  createTime?: string;
  /** Immutable. Intended resource to which this Ruleset should be released. May be left blank to signify the resource associated with the default release. Expected format: firestore.googleapis.com/projects//databases/ */
  attachmentPoint?: string;
  /** Output only. The metadata for this ruleset. */
  metadata?: Metadata;
  /** Required. `Source` for the `Ruleset`. */
  source?: Source;
  /** Output only. Name of the `Ruleset`. The ruleset_id is auto generated by the service. Format: `projects/{project_id}/rulesets/{ruleset_id}` */
  name?: string;
}

export const Ruleset: Schema.Schema<Ruleset> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  attachmentPoint: Schema.optional(Schema.String),
  metadata: Schema.optional(Metadata),
  source: Schema.optional(Source),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Ruleset" }) as any as Schema.Schema<Ruleset>;

export interface ListRulesetsResponse {
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
  /** List of `Ruleset` instances. */
  rulesets?: Array<Ruleset>;
}

export const ListRulesetsResponse: Schema.Schema<ListRulesetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  rulesets: Schema.optional(Schema.Array(Ruleset)),
})).annotate({ identifier: "ListRulesetsResponse" }) as any as Schema.Schema<ListRulesetsResponse>;

export interface ListReleasesResponse {
  /** List of `Release` instances. */
  releases?: Array<Release>;
  /** The pagination token to retrieve the next page of results. If the value is empty, no further results remain. */
  nextPageToken?: string;
}

export const ListReleasesResponse: Schema.Schema<ListReleasesResponse> = Schema.suspend(() => Schema.Struct({
  releases: Schema.optional(Schema.Array(Release)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReleasesResponse" }) as any as Schema.Schema<ListReleasesResponse>;

export interface TestRulesetResponse {
  /** Syntactic and semantic `Source` issues of varying severity. Issues of `ERROR` severity will prevent tests from executing. */
  issues?: Array<Issue>;
  /** The set of test results given the test cases in the `TestSuite`. The results will appear in the same order as the test cases appear in the `TestSuite`. */
  testResults?: Array<TestResult>;
}

export const TestRulesetResponse: Schema.Schema<TestRulesetResponse> = Schema.suspend(() => Schema.Struct({
  issues: Schema.optional(Schema.Array(Issue)),
  testResults: Schema.optional(Schema.Array(TestResult)),
})).annotate({ identifier: "TestRulesetResponse" }) as any as Schema.Schema<TestRulesetResponse>;

export interface GetReleaseExecutableResponse {
  /** Executable view of the `Ruleset` referenced by the `Release`. */
  executable?: string;
  /** `Ruleset` name associated with the `Release` executable. */
  rulesetName?: string;
  /** `Language` used to generate the executable bytes. */
  language?: "LANGUAGE_UNSPECIFIED" | "FIREBASE_RULES" | "EVENT_FLOW_TRIGGERS" | (string & {});
  /** The Rules runtime version of the executable. */
  executableVersion?: "RELEASE_EXECUTABLE_VERSION_UNSPECIFIED" | "FIREBASE_RULES_EXECUTABLE_V1" | "FIREBASE_RULES_EXECUTABLE_V2" | (string & {});
  /** Timestamp for the most recent `Release.update_time`. */
  updateTime?: string;
  /** Optional, indicates the freshness of the result. The response is guaranteed to be the latest within an interval up to the sync_time (inclusive). */
  syncTime?: string;
}

export const GetReleaseExecutableResponse: Schema.Schema<GetReleaseExecutableResponse> = Schema.suspend(() => Schema.Struct({
  executable: Schema.optional(Schema.String),
  rulesetName: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  executableVersion: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  syncTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GetReleaseExecutableResponse" }) as any as Schema.Schema<GetReleaseExecutableResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Test `Source` for syntactic and semantic correctness. Issues present, if any, will be returned to the caller with a description, severity, and source location. The test method may be executed with `Source` or a `Ruleset` name. Passing `Source` is useful for unit testing new rules. Passing a `Ruleset` name is useful for regression testing an existing rule. The following is an example of `Source` that permits users to upload images to a bucket bearing their user id and matching the correct metadata: _*Example*_ // Users are allowed to subscribe and unsubscribe to the blog. service firebase.storage { match /users/{userId}/images/{imageName} { allow write: if userId == request.auth.uid && (imageName.matches('*.png$') || imageName.matches('*.jpg$')) && resource.mimeType.matches('^image/') } } */
export interface TestProjectsRequest {
  /** Required. Tests may either provide `source` or a `Ruleset` resource name. For tests against `source`, the resource name must refer to the project: Format: `projects/{project_id}` For tests against a `Ruleset`, this must be the `Ruleset` resource name: Format: `projects/{project_id}/rulesets/{ruleset_id}` */
  name: string;
  /** Request body */
  body?: TestRulesetRequest;
}

export const TestProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TestRulesetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:test", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestProjectsRequest>;

export type TestProjectsResponse = TestRulesetResponse;
export const TestProjectsResponse = TestRulesetResponse;

export type TestProjectsError = CommonErrors;

export const testProjects: API.OperationMethod<TestProjectsRequest, TestProjectsResponse, TestProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestProjectsRequest,
  output: TestProjectsResponse,
  errors: [],
}));

/** Delete a `Ruleset` by resource name. If the `Ruleset` is referenced by a `Release` the operation will fail. */
export interface DeleteProjectsRulesetsRequest {
  /** Required. Resource name for the ruleset to delete. Format: `projects/{project_id}/rulesets/{ruleset_id}` */
  name: string;
}

export const DeleteProjectsRulesetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/rulesets/{rulesetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsRulesetsRequest>;

export type DeleteProjectsRulesetsResponse = Empty;
export const DeleteProjectsRulesetsResponse = Empty;

export type DeleteProjectsRulesetsError = CommonErrors;

export const deleteProjectsRulesets: API.OperationMethod<DeleteProjectsRulesetsRequest, DeleteProjectsRulesetsResponse, DeleteProjectsRulesetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsRulesetsRequest,
  output: DeleteProjectsRulesetsResponse,
  errors: [],
}));

/** Get a `Ruleset` by name including the full `Source` contents. */
export interface GetProjectsRulesetsRequest {
  /** Required. Resource name for the ruleset to get. Format: `projects/{project_id}/rulesets/{ruleset_id}` */
  name: string;
}

export const GetProjectsRulesetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/rulesets/{rulesetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRulesetsRequest>;

export type GetProjectsRulesetsResponse = Ruleset;
export const GetProjectsRulesetsResponse = Ruleset;

export type GetProjectsRulesetsError = CommonErrors;

export const getProjectsRulesets: API.OperationMethod<GetProjectsRulesetsRequest, GetProjectsRulesetsResponse, GetProjectsRulesetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsRulesetsRequest,
  output: GetProjectsRulesetsResponse,
  errors: [],
}));

/** List `Ruleset` metadata only and optionally filter the results by `Ruleset` name. The full `Source` contents of a `Ruleset` may be retrieved with GetRuleset. */
export interface ListProjectsRulesetsRequest {
  /** Optional. Next page token for loading the next batch of `Ruleset` instances. */
  pageToken?: string;
  /** Required. Resource name for the project. Format: `projects/{project_id}` */
  name: string;
  /** Optional. `Ruleset` filter. The list method supports filters with restrictions on `Ruleset.name`. Filters on `Ruleset.create_time` should use the `date` function which parses strings that conform to the RFC 3339 date/time specifications. Example: `create_time > date("2017-01-01T00:00:00Z") AND name=UUID-*` */
  filter?: string;
  /** Optional. Page size to load. Maximum of 100. Defaults to 10. Note: `page_size` is just a hint and the service may choose to load less than `page_size` due to the size of the output. To traverse all of the releases, caller should iterate until the `page_token` is empty. */
  pageSize?: number;
}

export const ListProjectsRulesetsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/rulesets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRulesetsRequest>;

export type ListProjectsRulesetsResponse = ListRulesetsResponse;
export const ListProjectsRulesetsResponse = ListRulesetsResponse;

export type ListProjectsRulesetsError = CommonErrors;

export const listProjectsRulesets = API.makePaginated(() => ({
  input: ListProjectsRulesetsRequest,
  output: ListProjectsRulesetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a `Ruleset` from `Source`. The `Ruleset` is given a unique generated name which is returned to the caller. `Source` containing syntactic or semantics errors will result in an error response indicating the first error encountered. For a detailed view of `Source` issues, use TestRuleset. */
export interface CreateProjectsRulesetsRequest {
  /** Required. Resource name for Project which owns this `Ruleset`. Format: `projects/{project_id}` */
  name: string;
  /** Request body */
  body?: Ruleset;
}

export const CreateProjectsRulesetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Ruleset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/rulesets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsRulesetsRequest>;

export type CreateProjectsRulesetsResponse = Ruleset;
export const CreateProjectsRulesetsResponse = Ruleset;

export type CreateProjectsRulesetsError = CommonErrors;

export const createProjectsRulesets: API.OperationMethod<CreateProjectsRulesetsRequest, CreateProjectsRulesetsResponse, CreateProjectsRulesetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsRulesetsRequest,
  output: CreateProjectsRulesetsResponse,
  errors: [],
}));

/** Create a `Release`. Release names should reflect the developer's deployment practices. For example, the release name may include the environment name, application name, application version, or any other name meaningful to the developer. Once a `Release` refers to a `Ruleset`, the rules can be enforced by Firebase Rules-enabled services. More than one `Release` may be 'live' concurrently. Consider the following three `Release` names for `projects/foo` and the `Ruleset` to which they refer. Release Name -> Ruleset Name * projects/foo/releases/prod -> projects/foo/rulesets/uuid123 * projects/foo/releases/prod/beta -> projects/foo/rulesets/uuid123 * projects/foo/releases/prod/v23 -> projects/foo/rulesets/uuid456 The relationships reflect a `Ruleset` rollout in progress. The `prod` and `prod/beta` releases refer to the same `Ruleset`. However, `prod/v23` refers to a new `Ruleset`. The `Ruleset` reference for a `Release` may be updated using the UpdateRelease method. */
export interface CreateProjectsReleasesRequest {
  /** Required. Resource name for the project which owns this `Release`. Format: `projects/{project_id}` */
  name: string;
  /** Request body */
  body?: Release;
}

export const CreateProjectsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Release).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/releases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsReleasesRequest>;

export type CreateProjectsReleasesResponse = Release;
export const CreateProjectsReleasesResponse = Release;

export type CreateProjectsReleasesError = CommonErrors;

export const createProjectsReleases: API.OperationMethod<CreateProjectsReleasesRequest, CreateProjectsReleasesResponse, CreateProjectsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsReleasesRequest,
  output: CreateProjectsReleasesResponse,
  errors: [],
}));

/** List the `Release` values for a project. This list may optionally be filtered by `Release` name, `Ruleset` name, `TestSuite` name, or any combination thereof. */
export interface ListProjectsReleasesRequest {
  /** Optional. Next page token for the next batch of `Release` instances. */
  pageToken?: string;
  /** Optional. Page size to load. Maximum of 100. Defaults to 10. Note: `page_size` is just a hint and the service may choose to load fewer than `page_size` results due to the size of the output. To traverse all of the releases, the caller should iterate until the `page_token` on the response is empty. */
  pageSize?: number;
  /** Optional. `Release` filter. The list method supports filters with restrictions on the `Release.name`, and `Release.ruleset_name`. Example 1: A filter of 'name=prod*' might return `Release`s with names within 'projects/foo' prefixed with 'prod': Name -> Ruleset Name: * projects/foo/releases/prod -> projects/foo/rulesets/uuid1234 * projects/foo/releases/prod/v1 -> projects/foo/rulesets/uuid1234 * projects/foo/releases/prod/v2 -> projects/foo/rulesets/uuid8888 Example 2: A filter of `name=prod* ruleset_name=uuid1234` would return only `Release` instances for 'projects/foo' with names prefixed with 'prod' referring to the same `Ruleset` name of 'uuid1234': Name -> Ruleset Name: * projects/foo/releases/prod -> projects/foo/rulesets/1234 * projects/foo/releases/prod/v1 -> projects/foo/rulesets/1234 In the examples, the filter parameters refer to the search filters are relative to the project. Fully qualified prefixed may also be used. */
  filter?: string;
  /** Required. Resource name for the project. Format: `projects/{project_id}` */
  name: string;
}

export const ListProjectsReleasesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/releases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsReleasesRequest>;

export type ListProjectsReleasesResponse = ListReleasesResponse;
export const ListProjectsReleasesResponse = ListReleasesResponse;

export type ListProjectsReleasesError = CommonErrors;

export const listProjectsReleases = API.makePaginated(() => ({
  input: ListProjectsReleasesRequest,
  output: ListProjectsReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Delete a `Release` by resource name. */
export interface DeleteProjectsReleasesRequest {
  /** Required. Resource name for the `Release` to delete. Format: `projects/{project_id}/releases/{release_id}` */
  name: string;
}

export const DeleteProjectsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/releases/{releasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsReleasesRequest>;

export type DeleteProjectsReleasesResponse = Empty;
export const DeleteProjectsReleasesResponse = Empty;

export type DeleteProjectsReleasesError = CommonErrors;

export const deleteProjectsReleases: API.OperationMethod<DeleteProjectsReleasesRequest, DeleteProjectsReleasesResponse, DeleteProjectsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsReleasesRequest,
  output: DeleteProjectsReleasesResponse,
  errors: [],
}));

/** Get a `Release` by name. */
export interface GetProjectsReleasesRequest {
  /** Required. Resource name of the `Release`. Format: `projects/{project_id}/releases/{release_id}` */
  name: string;
}

export const GetProjectsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/releases/{releasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsReleasesRequest>;

export type GetProjectsReleasesResponse = Release;
export const GetProjectsReleasesResponse = Release;

export type GetProjectsReleasesError = CommonErrors;

export const getProjectsReleases: API.OperationMethod<GetProjectsReleasesRequest, GetProjectsReleasesResponse, GetProjectsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsReleasesRequest,
  output: GetProjectsReleasesResponse,
  errors: [],
}));

/** Update a `Release` via PATCH. Only updates to `ruleset_name` will be honored. `Release` rename is not supported. To create a `Release` use the CreateRelease method. */
export interface PatchProjectsReleasesRequest {
  /** Required. Resource name for the project which owns this `Release`. Format: `projects/{project_id}` */
  name: string;
  /** Request body */
  body?: UpdateReleaseRequest;
}

export const PatchProjectsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateReleaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/releases/{releasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsReleasesRequest>;

export type PatchProjectsReleasesResponse = Release;
export const PatchProjectsReleasesResponse = Release;

export type PatchProjectsReleasesError = CommonErrors;

export const patchProjectsReleases: API.OperationMethod<PatchProjectsReleasesRequest, PatchProjectsReleasesResponse, PatchProjectsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsReleasesRequest,
  output: PatchProjectsReleasesResponse,
  errors: [],
}));

/** Get the `Release` executable to use when enforcing rules. */
export interface GetExecutableProjectsReleasesRequest {
  /** Required. Resource name of the `Release`. Format: `projects/{project_id}/releases/{release_id}` */
  name: string;
  /** Optional. The requested runtime executable version. Defaults to FIREBASE_RULES_EXECUTABLE_V1. */
  executableVersion?: "RELEASE_EXECUTABLE_VERSION_UNSPECIFIED" | "FIREBASE_RULES_EXECUTABLE_V1" | "FIREBASE_RULES_EXECUTABLE_V2" | (string & {});
}

export const GetExecutableProjectsReleasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  executableVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("executableVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/releases/{releasesId}:getExecutable" }),
  svc,
) as unknown as Schema.Schema<GetExecutableProjectsReleasesRequest>;

export type GetExecutableProjectsReleasesResponse = GetReleaseExecutableResponse;
export const GetExecutableProjectsReleasesResponse = GetReleaseExecutableResponse;

export type GetExecutableProjectsReleasesError = CommonErrors;

export const getExecutableProjectsReleases: API.OperationMethod<GetExecutableProjectsReleasesRequest, GetExecutableProjectsReleasesResponse, GetExecutableProjectsReleasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetExecutableProjectsReleasesRequest,
  output: GetExecutableProjectsReleasesResponse,
  errors: [],
}));

