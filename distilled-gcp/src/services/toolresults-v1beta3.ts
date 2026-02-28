// ==========================================================================
// Cloud Tool Results API (toolresults v1beta3)
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
  name: "toolresults",
  version: "v1beta3",
  rootUrl: "https://toolresults.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SafeHtmlProto {
  /** IMPORTANT: Never set or read this field, even from tests, it is private. See documentation at the top of .proto file for programming language packages with which to create or read this message. */
  privateDoNotAccessOrElseSafeHtmlWrappedValue?: string;
}

export const SafeHtmlProto: Schema.Schema<SafeHtmlProto> = Schema.suspend(() => Schema.Struct({
  privateDoNotAccessOrElseSafeHtmlWrappedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "SafeHtmlProto" }) as any as Schema.Schema<SafeHtmlProto>;

export interface RegionProto {
  /** The top of the rectangle, in pixels. Always set. */
  topPx?: number;
  /** The left side of the rectangle, in pixels. Always set. */
  leftPx?: number;
  /** The height, in pixels. Always set. */
  heightPx?: number;
  /** The width, in pixels. Always set. */
  widthPx?: number;
}

export const RegionProto: Schema.Schema<RegionProto> = Schema.suspend(() => Schema.Struct({
  topPx: Schema.optional(Schema.Number),
  leftPx: Schema.optional(Schema.Number),
  heightPx: Schema.optional(Schema.Number),
  widthPx: Schema.optional(Schema.Number),
})).annotate({ identifier: "RegionProto" }) as any as Schema.Schema<RegionProto>;

export interface SuggestionProto {
  /** General title for the suggestion, in the user's language, without markup. Always set. */
  title?: string;
  /** Concise message, in the user's language, representing the suggestion, which may contain markup. Always set. */
  shortMessage?: SafeHtmlProto;
  /** Message, in the user's language, explaining the suggestion, which may contain markup. Always set. */
  longMessage?: SafeHtmlProto;
  /** Relative importance of a suggestion. Always set. */
  priority?: "unknownPriority" | "error" | "warning" | "info" | (string & {});
  /** Reference to a help center article concerning this type of suggestion. Always set. */
  helpUrl?: string;
  /** Reference to a view element, identified by its resource name, if it has one. */
  resourceName?: string;
  /** A somewhat human readable identifier of the source view, if it does not have a resource_name. This is a path within the accessibility hierarchy, an element with resource name; similar to an XPath. */
  pseudoResourceId?: string;
  /** Region within the screenshot that is relevant to this suggestion. Optional. */
  region?: RegionProto;
  /** Relative importance of a suggestion as compared with other suggestions that have the same priority and category. This is a meaningless value that can be used to order suggestions that are in the same category and have the same priority. The larger values have higher priority (i.e., are more important). Optional. */
  secondaryPriority?: number;
  /** ID of the screen for the suggestion. It is used for getting the corresponding screenshot path. For example, screen_id "1" corresponds to "1.png" file in GCS. Always set. */
  screenId?: string;
}

export const SuggestionProto: Schema.Schema<SuggestionProto> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  shortMessage: Schema.optional(SafeHtmlProto),
  longMessage: Schema.optional(SafeHtmlProto),
  priority: Schema.optional(Schema.String),
  helpUrl: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  pseudoResourceId: Schema.optional(Schema.String),
  region: Schema.optional(RegionProto),
  secondaryPriority: Schema.optional(Schema.Number),
  screenId: Schema.optional(Schema.String),
})).annotate({ identifier: "SuggestionProto" }) as any as Schema.Schema<SuggestionProto>;

export interface SuggestionClusterProto {
  /** Category in which these types of suggestions should appear. Always set. */
  category?: "unknownCategory" | "contentLabeling" | "touchTargetSize" | "lowContrast" | "implementation" | (string & {});
  /** A sequence of suggestions. All of the suggestions within a cluster must have the same SuggestionPriority and belong to the same SuggestionCategory. Suggestions with the same screenshot URL should be adjacent. */
  suggestions?: Array<SuggestionProto>;
}

export const SuggestionClusterProto: Schema.Schema<SuggestionClusterProto> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  suggestions: Schema.optional(Schema.Array(SuggestionProto)),
})).annotate({ identifier: "SuggestionClusterProto" }) as any as Schema.Schema<SuggestionClusterProto>;

export interface ListStepAccessibilityClustersResponse {
  /** A full resource name of the step. For example, projects/my-project/histories/bh.1234567890abcdef/executions/ 1234567890123456789/steps/bs.1234567890abcdef Always presents. */
  name?: string;
  /** A sequence of accessibility suggestions, grouped into clusters. Within the sequence, clusters that belong to the same SuggestionCategory should be adjacent. Within each category, clusters should be ordered by their SuggestionPriority (ERRORs first). The categories should be ordered by their highest priority cluster. */
  clusters?: Array<SuggestionClusterProto>;
}

export const ListStepAccessibilityClustersResponse: Schema.Schema<ListStepAccessibilityClustersResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  clusters: Schema.optional(Schema.Array(SuggestionClusterProto)),
})).annotate({ identifier: "ListStepAccessibilityClustersResponse" }) as any as Schema.Schema<ListStepAccessibilityClustersResponse>;

export interface FileReference {
  /** The URI of a file stored in Google Cloud Storage. For example: http://storage.googleapis.com/mybucket/path/to/test.xml or in gsutil format: gs://mybucket/path/to/test.xml with version-specific info, gs://mybucket/path/to/test.xml#1360383693690000 An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set */
  fileUri?: string;
}

export const FileReference: Schema.Schema<FileReference> = Schema.suspend(() => Schema.Struct({
  fileUri: Schema.optional(Schema.String),
})).annotate({ identifier: "FileReference" }) as any as Schema.Schema<FileReference>;

export interface Duration {
  /** Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years */
  seconds?: string;
  /** Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive. */
  nanos?: number;
}

export const Duration: Schema.Schema<Duration> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Duration" }) as any as Schema.Schema<Duration>;

export interface TestSuiteOverview {
  /** If this test suite was parsed from XML, this is the URI where the original XML file is stored. Note: Multiple test suites can share the same xml_source Returns INVALID_ARGUMENT if the uri format is not supported. - In create/response: optional - In update request: never */
  xmlSource?: FileReference;
  /** The name of the test suite. - In create/response: always set - In update request: never */
  name?: string;
  /** Number of test cases, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never */
  totalCount?: number;
  /** Number of failed test cases, typically set by the service by parsing the xml_source. May also be set by the user. - In create/response: always set - In update request: never */
  failureCount?: number;
  /** Number of test cases in error, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never */
  errorCount?: number;
  /** Number of test cases not run, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never */
  skippedCount?: number;
  /** Number of flaky test cases, set by the service by rolling up flaky test attempts. Present only for rollup test suite overview at environment level. A step cannot have flaky test cases. */
  flakyCount?: number;
  /** Elapsed time of test suite. */
  elapsedTime?: Duration;
}

export const TestSuiteOverview: Schema.Schema<TestSuiteOverview> = Schema.suspend(() => Schema.Struct({
  xmlSource: Schema.optional(FileReference),
  name: Schema.optional(Schema.String),
  totalCount: Schema.optional(Schema.Number),
  failureCount: Schema.optional(Schema.Number),
  errorCount: Schema.optional(Schema.Number),
  skippedCount: Schema.optional(Schema.Number),
  flakyCount: Schema.optional(Schema.Number),
  elapsedTime: Schema.optional(Duration),
})).annotate({ identifier: "TestSuiteOverview" }) as any as Schema.Schema<TestSuiteOverview>;

export interface ToolExitCode {
  /** Tool execution exit code. A value of 0 means that the execution was successful. - In response: always set - In create/update request: always set */
  number?: number;
}

export const ToolExitCode: Schema.Schema<ToolExitCode> = Schema.suspend(() => Schema.Struct({
  number: Schema.optional(Schema.Number),
})).annotate({ identifier: "ToolExitCode" }) as any as Schema.Schema<ToolExitCode>;

export interface Timestamp {
  /** Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive. */
  seconds?: string;
  /** Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive. */
  nanos?: number;
}

export const Timestamp: Schema.Schema<Timestamp> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Timestamp" }) as any as Schema.Schema<Timestamp>;

export interface TestCaseReference {
  /** The name of the test case. Required. */
  name?: string;
  /** The name of the class. */
  className?: string;
  /** The name of the test suite to which this test case belongs. */
  testSuiteName?: string;
}

export const TestCaseReference: Schema.Schema<TestCaseReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  className: Schema.optional(Schema.String),
  testSuiteName: Schema.optional(Schema.String),
})).annotate({ identifier: "TestCaseReference" }) as any as Schema.Schema<TestCaseReference>;

export interface ToolOutputReference {
  /** A FileReference to an output file. - In response: always set - In create/update request: always set */
  output?: FileReference;
  /** The creation time of the file. - In response: present if set by create/update request - In create/update request: optional */
  creationTime?: Timestamp;
  /** The test case to which this output file belongs. - In response: present if set by create/update request - In create/update request: optional */
  testCase?: TestCaseReference;
}

export const ToolOutputReference: Schema.Schema<ToolOutputReference> = Schema.suspend(() => Schema.Struct({
  output: Schema.optional(FileReference),
  creationTime: Schema.optional(Timestamp),
  testCase: Schema.optional(TestCaseReference),
})).annotate({ identifier: "ToolOutputReference" }) as any as Schema.Schema<ToolOutputReference>;

export interface ToolExecution {
  /** The full tokenized command line including the program name (equivalent to argv in a C program). - In response: present if set by create request - In create request: optional - In update request: never set */
  commandLineArguments?: Array<string>;
  /** References to any plain text logs output the tool execution. This field can be set before the tool has exited in order to be able to have access to a live view of the logs while the tool is running. The maximum allowed number of tool logs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list */
  toolLogs?: Array<FileReference>;
  /** Tool execution exit code. This field will be set once the tool has exited. - In response: present if set by create/update request - In create request: optional - In update request: optional, a FAILED_PRECONDITION error will be returned if an exit_code is already set. */
  exitCode?: ToolExitCode;
  /** References to opaque files of any format output by the tool execution. The maximum allowed number of tool outputs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list */
  toolOutputs?: Array<ToolOutputReference>;
}

export const ToolExecution: Schema.Schema<ToolExecution> = Schema.suspend(() => Schema.Struct({
  commandLineArguments: Schema.optional(Schema.Array(Schema.String)),
  toolLogs: Schema.optional(Schema.Array(FileReference)),
  exitCode: Schema.optional(ToolExitCode),
  toolOutputs: Schema.optional(Schema.Array(ToolOutputReference)),
})).annotate({ identifier: "ToolExecution" }) as any as Schema.Schema<ToolExecution>;

export interface StackTrace {
  /** The stack trace message. Required */
  exception?: string;
}

export const StackTrace: Schema.Schema<StackTrace> = Schema.suspend(() => Schema.Struct({
  exception: Schema.optional(Schema.String),
})).annotate({ identifier: "StackTrace" }) as any as Schema.Schema<StackTrace>;

export interface Any {
  /** A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL's path must represent the fully qualified name of the type (as in `path/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). In practice, teams usually precompile into the binary all types that they expect it to use in the context of Any. However, for URLs which use the scheme `http`, `https`, or no scheme, one can optionally set up a type server that maps type URLs to message definitions as follows: * If no scheme is provided, `https` is assumed. * An HTTP GET on the URL must yield a google.protobuf.Type value in binary format, or produce an error. * Applications are allowed to cache lookup results based on the URL, or have them precompiled into a binary to avoid any lookup. Therefore, binary compatibility needs to be preserved on changes to types. (Use versioned type names to manage breaking changes.) Note: this functionality is not currently available in the official protobuf release, and it is not used for type URLs beginning with type.googleapis.com. Schemes other than `http`, `https` (or the empty scheme) might be used with implementation specific semantics. */
  typeUrl?: string;
  /** Must be a valid serialized protocol buffer of the above specified type. */
  value?: string;
}

export const Any: Schema.Schema<Any> = Schema.suspend(() => Schema.Struct({
  typeUrl: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Any" }) as any as Schema.Schema<Any>;

export interface TestIssue {
  /** A brief human-readable message describing the issue. Required. */
  errorMessage?: string;
  /** Deprecated in favor of stack trace fields inside specific warnings. */
  stackTrace?: StackTrace;
  /** Warning message with additional details of the issue. Should always be a message from com.google.devtools.toolresults.v1.warnings */
  warning_migration?: Any;
  /** Severity of issue. Required. */
  severity?: "unspecifiedSeverity" | "info" | "suggestion" | "warning" | "severe" | (string & {});
  /** Type of issue. Required. */
  type?: "unspecifiedType" | "fatalException" | "nativeCrash" | "anr" | "unusedRoboDirective" | "compatibleWithOrchestrator" | "launcherActivityNotFound" | "startActivityNotFound" | "incompleteRoboScriptExecution" | "completeRoboScriptExecution" | "failedToInstall" | "availableDeepLinks" | "nonSdkApiUsageViolation" | "nonSdkApiUsageReport" | "encounteredNonAndroidUiWidgetScreen" | "encounteredLoginScreen" | "performedGoogleLogin" | "iosException" | "iosCrash" | "performedMonkeyActions" | "usedRoboDirective" | "usedRoboIgnoreDirective" | "insufficientCoverage" | "inAppPurchases" | "crashDialogError" | "uiElementsTooDeep" | "blankScreen" | "overlappingUiElements" | "unityException" | "deviceOutOfMemory" | "logcatCollectionError" | "detectedAppSplashScreen" | "assetIssue" | (string & {});
  /** Category of issue. Required. */
  category?: "unspecifiedCategory" | "common" | "robo" | (string & {});
}

export const TestIssue: Schema.Schema<TestIssue> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
  stackTrace: Schema.optional(StackTrace),
  warning_migration: Schema.optional(Any),
  severity: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
})).annotate({ identifier: "TestIssue" }) as any as Schema.Schema<TestIssue>;

export interface TestTiming {
  /** How long it took to run the test process. - In response: present if previously set. - In create/update request: optional */
  testProcessDuration?: Duration;
}

export const TestTiming: Schema.Schema<TestTiming> = Schema.suspend(() => Schema.Struct({
  testProcessDuration: Schema.optional(Duration),
})).annotate({ identifier: "TestTiming" }) as any as Schema.Schema<TestTiming>;

export interface TestExecutionStep {
  /** List of test suite overview contents. This could be parsed from xUnit XML log by server, or uploaded directly by user. This references should only be called when test suites are fully parsed or uploaded. The maximum allowed number of test suite overviews per step is 1000. - In response: always set - In create request: optional - In update request: never (use publishXunitXmlFiles custom method instead) */
  testSuiteOverviews?: Array<TestSuiteOverview>;
  /** Represents the execution of the test runner. The exit code of this tool will be used to determine if the test passed. - In response: always set - In create/update request: optional */
  toolExecution?: ToolExecution;
  /** Issues observed during the test execution. For example, if the mobile app under test crashed during the test, the error message and the stack trace content can be recorded here to assist debugging. - In response: present if set by create or update - In create/update request: optional */
  testIssues?: Array<TestIssue>;
  /** The timing break down of the test execution. - In response: present if set by create or update - In create/update request: optional */
  testTiming?: TestTiming;
}

export const TestExecutionStep: Schema.Schema<TestExecutionStep> = Schema.suspend(() => Schema.Struct({
  testSuiteOverviews: Schema.optional(Schema.Array(TestSuiteOverview)),
  toolExecution: Schema.optional(ToolExecution),
  testIssues: Schema.optional(Schema.Array(TestIssue)),
  testTiming: Schema.optional(TestTiming),
})).annotate({ identifier: "TestExecutionStep" }) as any as Schema.Schema<TestExecutionStep>;

export interface ToolExecutionStep {
  /** A Tool execution. - In response: present if set by create/update request - In create/update request: optional */
  toolExecution?: ToolExecution;
}

export const ToolExecutionStep: Schema.Schema<ToolExecutionStep> = Schema.suspend(() => Schema.Struct({
  toolExecution: Schema.optional(ToolExecution),
})).annotate({ identifier: "ToolExecutionStep" }) as any as Schema.Schema<ToolExecutionStep>;

export interface SuccessDetail {
  /** If a native process other than the app crashed. */
  otherNativeCrash?: boolean;
}

export const SuccessDetail: Schema.Schema<SuccessDetail> = Schema.suspend(() => Schema.Struct({
  otherNativeCrash: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SuccessDetail" }) as any as Schema.Schema<SuccessDetail>;

export interface FailureDetail {
  /** If the failure was severe because the system (app) under test crashed. */
  crashed?: boolean;
  /** If the test overran some time limit, and that is why it failed. */
  timedOut?: boolean;
  /** If an app is not installed and thus no test can be run with the app. This might be caused by trying to run a test on an unsupported platform. */
  notInstalled?: boolean;
  /** If a native process (including any other than the app) crashed. */
  otherNativeCrash?: boolean;
  /** If the robo was unable to crawl the app; perhaps because the app did not start. */
  unableToCrawl?: boolean;
  /** If the Roboscript failed to complete successfully, e.g., because a Roboscript action or assertion failed or a Roboscript action could not be matched during the entire crawl. */
  failedRoboscript?: boolean;
  /** If the device ran out of memory during a test, causing the test to crash. */
  deviceOutOfMemory?: boolean;
}

export const FailureDetail: Schema.Schema<FailureDetail> = Schema.suspend(() => Schema.Struct({
  crashed: Schema.optional(Schema.Boolean),
  timedOut: Schema.optional(Schema.Boolean),
  notInstalled: Schema.optional(Schema.Boolean),
  otherNativeCrash: Schema.optional(Schema.Boolean),
  unableToCrawl: Schema.optional(Schema.Boolean),
  failedRoboscript: Schema.optional(Schema.Boolean),
  deviceOutOfMemory: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FailureDetail" }) as any as Schema.Schema<FailureDetail>;

export interface InconclusiveDetail {
  /** If the test runner could not determine success or failure because the test depends on a component other than the system under test which failed. For example, a mobile test requires provisioning a device where the test executes, and that provisioning can fail. */
  infrastructureFailure?: boolean;
  /** If the end user aborted the test execution before a pass or fail could be determined. For example, the user pressed ctrl-c which sent a kill signal to the test runner while the test was running. */
  abortedByUser?: boolean;
  /** If results are being provided to the user in certain cases of infrastructure failures */
  hasErrorLogs?: boolean;
}

export const InconclusiveDetail: Schema.Schema<InconclusiveDetail> = Schema.suspend(() => Schema.Struct({
  infrastructureFailure: Schema.optional(Schema.Boolean),
  abortedByUser: Schema.optional(Schema.Boolean),
  hasErrorLogs: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "InconclusiveDetail" }) as any as Schema.Schema<InconclusiveDetail>;

export interface SkippedDetail {
  /** If the requested OS version doesn't run on the specific device model. */
  incompatibleDevice?: boolean;
  /** If the App doesn't support the specific API level. */
  incompatibleAppVersion?: boolean;
  /** If the App doesn't run on the specific architecture, for example, x86. */
  incompatibleArchitecture?: boolean;
}

export const SkippedDetail: Schema.Schema<SkippedDetail> = Schema.suspend(() => Schema.Struct({
  incompatibleDevice: Schema.optional(Schema.Boolean),
  incompatibleAppVersion: Schema.optional(Schema.Boolean),
  incompatibleArchitecture: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SkippedDetail" }) as any as Schema.Schema<SkippedDetail>;

export interface Outcome {
  /** The simplest way to interpret a result. Required */
  summary?: "unset" | "success" | "failure" | "inconclusive" | "skipped" | "flaky" | (string & {});
  /** More information about a SUCCESS outcome. Returns INVALID_ARGUMENT if this field is set but the summary is not SUCCESS. Optional */
  successDetail?: SuccessDetail;
  /** More information about a FAILURE outcome. Returns INVALID_ARGUMENT if this field is set but the summary is not FAILURE. Optional */
  failureDetail?: FailureDetail;
  /** More information about an INCONCLUSIVE outcome. Returns INVALID_ARGUMENT if this field is set but the summary is not INCONCLUSIVE. Optional */
  inconclusiveDetail?: InconclusiveDetail;
  /** More information about a SKIPPED outcome. Returns INVALID_ARGUMENT if this field is set but the summary is not SKIPPED. Optional */
  skippedDetail?: SkippedDetail;
}

export const Outcome: Schema.Schema<Outcome> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(Schema.String),
  successDetail: Schema.optional(SuccessDetail),
  failureDetail: Schema.optional(FailureDetail),
  inconclusiveDetail: Schema.optional(InconclusiveDetail),
  skippedDetail: Schema.optional(SkippedDetail),
})).annotate({ identifier: "Outcome" }) as any as Schema.Schema<Outcome>;

export interface StepLabelsEntry {
  key?: string;
  value?: string;
}

export const StepLabelsEntry: Schema.Schema<StepLabelsEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "StepLabelsEntry" }) as any as Schema.Schema<StepLabelsEntry>;

export interface StepDimensionValueEntry {
  key?: string;
  value?: string;
}

export const StepDimensionValueEntry: Schema.Schema<StepDimensionValueEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "StepDimensionValueEntry" }) as any as Schema.Schema<StepDimensionValueEntry>;

export interface IndividualOutcome {
  stepId?: string;
  outcomeSummary?: "unset" | "success" | "failure" | "inconclusive" | "skipped" | "flaky" | (string & {});
  /** Unique int given to each step. Ranges from 0(inclusive) to total number of steps(exclusive). The primary step is 0. */
  multistepNumber?: number;
  /** How long it took for this step to run. */
  runDuration?: Duration;
}

export const IndividualOutcome: Schema.Schema<IndividualOutcome> = Schema.suspend(() => Schema.Struct({
  stepId: Schema.optional(Schema.String),
  outcomeSummary: Schema.optional(Schema.String),
  multistepNumber: Schema.optional(Schema.Number),
  runDuration: Schema.optional(Duration),
})).annotate({ identifier: "IndividualOutcome" }) as any as Schema.Schema<IndividualOutcome>;

export interface PrimaryStep {
  /** Rollup test status of multiple steps that were run with the same configuration as a group. */
  rollUp?: "unset" | "success" | "failure" | "inconclusive" | "skipped" | "flaky" | (string & {});
  /** Step Id and outcome of each individual step. */
  individualOutcome?: Array<IndividualOutcome>;
}

export const PrimaryStep: Schema.Schema<PrimaryStep> = Schema.suspend(() => Schema.Struct({
  rollUp: Schema.optional(Schema.String),
  individualOutcome: Schema.optional(Schema.Array(IndividualOutcome)),
})).annotate({ identifier: "PrimaryStep" }) as any as Schema.Schema<PrimaryStep>;

export interface MultiStep {
  /** Step Id of the primary (original) step, which might be this step. */
  primaryStepId?: string;
  /** Unique int given to each step. Ranges from 0(inclusive) to total number of steps(exclusive). The primary step is 0. */
  multistepNumber?: number;
  /** Present if it is a primary (original) step. */
  primaryStep?: PrimaryStep;
}

export const MultiStep: Schema.Schema<MultiStep> = Schema.suspend(() => Schema.Struct({
  primaryStepId: Schema.optional(Schema.String),
  multistepNumber: Schema.optional(Schema.Number),
  primaryStep: Schema.optional(PrimaryStep),
})).annotate({ identifier: "MultiStep" }) as any as Schema.Schema<MultiStep>;

export interface Step {
  /** An execution of a test runner. */
  testExecutionStep?: TestExecutionStep;
  /** An execution of a tool (used for steps we don't explicitly support). */
  toolExecutionStep?: ToolExecutionStep;
  /** A unique identifier within a Execution for this Step. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response: always set - In create/update request: never set */
  stepId?: string;
  /** The time when the step was created. - In response: always set - In create/update request: never set */
  creationTime?: Timestamp;
  /** The time when the step status was set to complete. This value will be set automatically when state transitions to COMPLETE. - In response: set if the execution state is COMPLETE. - In create/update request: never set */
  completionTime?: Timestamp;
  /** A short human-readable name to display in the UI. Maximum of 100 characters. For example: Clean build A PRECONDITION_FAILED will be returned upon creating a new step if it shares its name and dimension_value with an existing step. If two steps represent a similar action, but have different dimension values, they should share the same name. For instance, if the same set of tests is run on two different platforms, the two steps should have the same name. - In response: always set - In create request: always set - In update request: never set */
  name?: string;
  /** A description of this tool For example: mvn clean package -D skipTests=true - In response: present if set by create/update request - In create/update request: optional */
  description?: string;
  /** The initial state is IN_PROGRESS. The only legal state transitions are * IN_PROGRESS -> COMPLETE A PRECONDITION_FAILED will be returned if an invalid transition is requested. It is valid to create Step with a state set to COMPLETE. The state can only be set to COMPLETE once. A PRECONDITION_FAILED will be returned if the state is set to COMPLETE multiple times. - In response: always set - In create/update request: optional */
  state?: "unknownState" | "pending" | "inProgress" | "complete" | (string & {});
  /** Classification of the result, for example into SUCCESS or FAILURE - In response: present if set by create/update request - In create/update request: optional */
  outcome?: Outcome;
  /** Whether any of the outputs of this step are images whose thumbnails can be fetched with ListThumbnails. - In response: always set - In create/update request: never set */
  hasImages?: boolean;
  /** Arbitrary user-supplied key/value pairs that are associated with the step. Users are responsible for managing the key namespace such that keys don't accidentally collide. An INVALID_ARGUMENT will be returned if the number of labels exceeds 100 or if the length of any of the keys or values exceeds 100 characters. - In response: always set - In create request: optional - In update request: optional; any new key/value pair will be added to the map, and any new value for an existing key will update that key's value */
  labels?: Array<StepLabelsEntry>;
  /** If the execution containing this step has any dimension_definition set, then this field allows the child to specify the values of the dimensions. The keys must exactly match the dimension_definition of the execution. For example, if the execution has `dimension_definition = ['attempt', 'device']` then a step must define values for those dimensions, eg. `dimension_value = ['attempt': '1', 'device': 'Nexus 6']` If a step does not participate in one dimension of the matrix, the value for that dimension should be empty string. For example, if one of the tests is executed by a runner which does not support retries, the step could have `dimension_value = ['attempt': '', 'device': 'Nexus 6']` If the step does not participate in any dimensions of the matrix, it may leave dimension_value unset. A PRECONDITION_FAILED will be returned if any of the keys do not exist in the dimension_definition of the execution. A PRECONDITION_FAILED will be returned if another step in this execution already has the same name and dimension_value, but differs on other data fields, for example, step field is different. A PRECONDITION_FAILED will be returned if dimension_value is set, and there is a dimension_definition in the execution which is not specified as one of the keys. - In response: present if set by create - In create request: optional - In update request: never set */
  dimensionValue?: Array<StepDimensionValueEntry>;
  /** How long it took for this step to run. If unset, this is set to the difference between creation_time and completion_time when the step is set to the COMPLETE state. In some cases, it is appropriate to set this value separately: For instance, if a step is created, but the operation it represents is queued for a few minutes before it executes, it would be appropriate not to include the time spent queued in its run_duration. PRECONDITION_FAILED will be returned if one attempts to set a run_duration on a step which already has this field set. - In response: present if previously set; always present on COMPLETE step - In create request: optional - In update request: optional */
  runDuration?: Duration;
  /** How much the device resource is used to perform the test. This is the device usage used for billing purpose, which is different from the run_duration, for example, infrastructure failure won't be charged for device usage. PRECONDITION_FAILED will be returned if one attempts to set a device_usage on a step which already has this field set. - In response: present if previously set. - In create request: optional - In update request: optional */
  deviceUsageDuration?: Duration;
  /** Details when multiple steps are run with the same configuration as a group. These details can be used identify which group this step is part of. It also identifies the groups 'primary step' which indexes all the group members. - In response: present if previously set. - In create request: optional, set iff this step was performed more than once. - In update request: optional */
  multiStep?: MultiStep;
}

export const Step: Schema.Schema<Step> = Schema.suspend(() => Schema.Struct({
  testExecutionStep: Schema.optional(TestExecutionStep),
  toolExecutionStep: Schema.optional(ToolExecutionStep),
  stepId: Schema.optional(Schema.String),
  creationTime: Schema.optional(Timestamp),
  completionTime: Schema.optional(Timestamp),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  outcome: Schema.optional(Outcome),
  hasImages: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Array(StepLabelsEntry)),
  dimensionValue: Schema.optional(Schema.Array(StepDimensionValueEntry)),
  runDuration: Schema.optional(Duration),
  deviceUsageDuration: Schema.optional(Duration),
  multiStep: Schema.optional(MultiStep),
})).annotate({ identifier: "Step" }) as any as Schema.Schema<Step>;

export interface ListStepsResponse {
  /** Steps. */
  steps?: Array<Step>;
  /** A continuation token to resume the query at the next item. If set, indicates that there are more steps to read, by calling list again with this value in the page_token field. */
  nextPageToken?: string;
}

export const ListStepsResponse: Schema.Schema<ListStepsResponse> = Schema.suspend(() => Schema.Struct({
  steps: Schema.optional(Schema.Array(Step)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStepsResponse" }) as any as Schema.Schema<ListStepsResponse>;

export interface PublishXunitXmlFilesRequest {
  /** URI of the Xunit XML files to publish. The maximum size of the file this reference is pointing to is 50MB. Required. */
  xunitXmlFiles?: Array<FileReference>;
}

export const PublishXunitXmlFilesRequest: Schema.Schema<PublishXunitXmlFilesRequest> = Schema.suspend(() => Schema.Struct({
  xunitXmlFiles: Schema.optional(Schema.Array(FileReference)),
})).annotate({ identifier: "PublishXunitXmlFilesRequest" }) as any as Schema.Schema<PublishXunitXmlFilesRequest>;

export interface TestCase {
  /** A unique identifier within a Step for this Test Case. */
  testCaseId?: string;
  /** The elapsed run time of the test case. Required. */
  elapsedTime?: Duration;
  /** The start time of the test case. */
  startTime?: Timestamp;
  /** The end time of the test case. */
  endTime?: Timestamp;
  /** The stack trace details if the test case failed or encountered an error. The maximum size of the stack traces is 100KiB, beyond which the stack track will be truncated. Zero if the test case passed. */
  stackTraces?: Array<StackTrace>;
  /** The status of the test case. Required. */
  status?: "passed" | "failed" | "error" | "skipped" | "flaky" | (string & {});
  /** Why the test case was skipped. Present only for skipped test case */
  skippedMessage?: string;
  /** Test case reference, e.g. name, class name and test suite name. Required. */
  testCaseReference?: TestCaseReference;
  /** References to opaque files of any format output by the tool execution. @OutputOnly */
  toolOutputs?: Array<ToolOutputReference>;
}

export const TestCase: Schema.Schema<TestCase> = Schema.suspend(() => Schema.Struct({
  testCaseId: Schema.optional(Schema.String),
  elapsedTime: Schema.optional(Duration),
  startTime: Schema.optional(Timestamp),
  endTime: Schema.optional(Timestamp),
  stackTraces: Schema.optional(Schema.Array(StackTrace)),
  status: Schema.optional(Schema.String),
  skippedMessage: Schema.optional(Schema.String),
  testCaseReference: Schema.optional(TestCaseReference),
  toolOutputs: Schema.optional(Schema.Array(ToolOutputReference)),
})).annotate({ identifier: "TestCase" }) as any as Schema.Schema<TestCase>;

export interface ListTestCasesResponse {
  /** List of test cases. */
  testCases?: Array<TestCase>;
  nextPageToken?: string;
}

export const ListTestCasesResponse: Schema.Schema<ListTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(TestCase)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTestCasesResponse" }) as any as Schema.Schema<ListTestCasesResponse>;

export interface Thumbnail {
  /** The thumbnail's content type, i.e. "image/png". Always set. */
  contentType?: string;
  /** The height of the thumbnail, in pixels. Always set. */
  heightPx?: number;
  /** The width of the thumbnail, in pixels. Always set. */
  widthPx?: number;
  /** The thumbnail file itself. That is, the bytes here are precisely the bytes that make up the thumbnail file; they can be served as an image as-is (with the appropriate content type.) Always set. */
  data?: string;
}

export const Thumbnail: Schema.Schema<Thumbnail> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  heightPx: Schema.optional(Schema.Number),
  widthPx: Schema.optional(Schema.Number),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "Thumbnail" }) as any as Schema.Schema<Thumbnail>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Image {
  /** The step to which the image is attached. Always set. */
  stepId?: string;
  /** A reference to the full-size, original image. This is the same as the tool_outputs entry for the image under its Step. Always set. */
  sourceImage?: ToolOutputReference;
  /** The thumbnail. */
  thumbnail?: Thumbnail;
  /** An error explaining why the thumbnail could not be rendered. */
  error?: Status;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  stepId: Schema.optional(Schema.String),
  sourceImage: Schema.optional(ToolOutputReference),
  thumbnail: Schema.optional(Thumbnail),
  error: Schema.optional(Status),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface ListStepThumbnailsResponse {
  /** A list of image data. Images are returned in a deterministic order; they are ordered by these factors, in order of importance: * First, by their associated test case. Images without a test case are considered greater than images with one. * Second, by their creation time. Images without a creation time are greater than images with one. * Third, by the order in which they were added to the step (by calls to CreateStep or UpdateStep). */
  thumbnails?: Array<Image>;
  /** A continuation token to resume the query at the next item. If set, indicates that there are more thumbnails to read, by calling list again with this value in the page_token field. */
  nextPageToken?: string;
}

export const ListStepThumbnailsResponse: Schema.Schema<ListStepThumbnailsResponse> = Schema.suspend(() => Schema.Struct({
  thumbnails: Schema.optional(Schema.Array(Image)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListStepThumbnailsResponse" }) as any as Schema.Schema<ListStepThumbnailsResponse>;

export interface MatrixDimensionDefinition {
}

export const MatrixDimensionDefinition: Schema.Schema<MatrixDimensionDefinition> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MatrixDimensionDefinition" }) as any as Schema.Schema<MatrixDimensionDefinition>;

export interface AndroidAppInfo {
  /** The name of the app. Optional */
  name?: string;
  /** The package name of the app. Required. */
  packageName?: string;
  /** The version name of the app. Optional. */
  versionName?: string;
  /** The internal version code of the app. Optional. */
  versionCode?: string;
}

export const AndroidAppInfo: Schema.Schema<AndroidAppInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  versionName: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "AndroidAppInfo" }) as any as Schema.Schema<AndroidAppInfo>;

export interface AndroidInstrumentationTest {
  /** The java package for the test to be executed. Required */
  testPackageId?: string;
  /** The InstrumentationTestRunner class. Required */
  testRunnerClass?: string;
  /** Each target must be fully qualified with the package name or class name, in one of these formats: - "package package_name" - "class package_name.class_name" - "class package_name.class_name#method_name" If empty, all targets in the module will be run. */
  testTargets?: Array<string>;
  /** The flag indicates whether Android Test Orchestrator will be used to run test or not. */
  useOrchestrator?: boolean;
}

export const AndroidInstrumentationTest: Schema.Schema<AndroidInstrumentationTest> = Schema.suspend(() => Schema.Struct({
  testPackageId: Schema.optional(Schema.String),
  testRunnerClass: Schema.optional(Schema.String),
  testTargets: Schema.optional(Schema.Array(Schema.String)),
  useOrchestrator: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AndroidInstrumentationTest" }) as any as Schema.Schema<AndroidInstrumentationTest>;

export interface AndroidRoboTest {
  /** The initial activity that should be used to start the app. Optional */
  appInitialActivity?: string;
  /** The java package for the bootstrap. Optional */
  bootstrapPackageId?: string;
  /** The runner class for the bootstrap. Optional */
  bootstrapRunnerClass?: string;
  /** The max depth of the traversal stack Robo can explore. Optional */
  maxDepth?: number;
  /** The max number of steps/actions Robo can execute. Default is no limit (0). Optional */
  maxSteps?: number;
}

export const AndroidRoboTest: Schema.Schema<AndroidRoboTest> = Schema.suspend(() => Schema.Struct({
  appInitialActivity: Schema.optional(Schema.String),
  bootstrapPackageId: Schema.optional(Schema.String),
  bootstrapRunnerClass: Schema.optional(Schema.String),
  maxDepth: Schema.optional(Schema.Number),
  maxSteps: Schema.optional(Schema.Number),
})).annotate({ identifier: "AndroidRoboTest" }) as any as Schema.Schema<AndroidRoboTest>;

export interface AndroidTestLoop {
}

export const AndroidTestLoop: Schema.Schema<AndroidTestLoop> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AndroidTestLoop" }) as any as Schema.Schema<AndroidTestLoop>;

export interface AndroidTest {
  /** Information about the application under test. */
  androidAppInfo?: AndroidAppInfo;
  /** Max time a test is allowed to run before it is automatically cancelled. */
  testTimeout?: Duration;
  /** An Android instrumentation test. */
  androidInstrumentationTest?: AndroidInstrumentationTest;
  /** An Android robo test. */
  androidRoboTest?: AndroidRoboTest;
  /** An Android test loop. */
  androidTestLoop?: AndroidTestLoop;
}

export const AndroidTest: Schema.Schema<AndroidTest> = Schema.suspend(() => Schema.Struct({
  androidAppInfo: Schema.optional(AndroidAppInfo),
  testTimeout: Schema.optional(Duration),
  androidInstrumentationTest: Schema.optional(AndroidInstrumentationTest),
  androidRoboTest: Schema.optional(AndroidRoboTest),
  androidTestLoop: Schema.optional(AndroidTestLoop),
})).annotate({ identifier: "AndroidTest" }) as any as Schema.Schema<AndroidTest>;

export interface IosAppInfo {
  /** The name of the app. Required */
  name?: string;
}

export const IosAppInfo: Schema.Schema<IosAppInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "IosAppInfo" }) as any as Schema.Schema<IosAppInfo>;

export interface IosXcTest {
  /** Bundle ID of the app. */
  bundleId?: string;
  /** Xcode version that the test was run with. */
  xcodeVersion?: string;
}

export const IosXcTest: Schema.Schema<IosXcTest> = Schema.suspend(() => Schema.Struct({
  bundleId: Schema.optional(Schema.String),
  xcodeVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "IosXcTest" }) as any as Schema.Schema<IosXcTest>;

export interface IosTestLoop {
  /** Bundle ID of the app. */
  bundleId?: string;
}

export const IosTestLoop: Schema.Schema<IosTestLoop> = Schema.suspend(() => Schema.Struct({
  bundleId: Schema.optional(Schema.String),
})).annotate({ identifier: "IosTestLoop" }) as any as Schema.Schema<IosTestLoop>;

export interface IosRoboTest {
}

export const IosRoboTest: Schema.Schema<IosRoboTest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IosRoboTest" }) as any as Schema.Schema<IosRoboTest>;

export interface IosTest {
  /** Information about the application under test. */
  iosAppInfo?: IosAppInfo;
  /** Max time a test is allowed to run before it is automatically cancelled. */
  testTimeout?: Duration;
  /** An iOS XCTest. */
  iosXcTest?: IosXcTest;
  /** An iOS test loop. */
  iosTestLoop?: IosTestLoop;
  /** An iOS Robo test. */
  iosRoboTest?: IosRoboTest;
}

export const IosTest: Schema.Schema<IosTest> = Schema.suspend(() => Schema.Struct({
  iosAppInfo: Schema.optional(IosAppInfo),
  testTimeout: Schema.optional(Duration),
  iosXcTest: Schema.optional(IosXcTest),
  iosTestLoop: Schema.optional(IosTestLoop),
  iosRoboTest: Schema.optional(IosRoboTest),
})).annotate({ identifier: "IosTest" }) as any as Schema.Schema<IosTest>;

export interface Specification {
  /** An Android mobile test execution specification. */
  androidTest?: AndroidTest;
  /** An iOS mobile test execution specification. */
  iosTest?: IosTest;
}

export const Specification: Schema.Schema<Specification> = Schema.suspend(() => Schema.Struct({
  androidTest: Schema.optional(AndroidTest),
  iosTest: Schema.optional(IosTest),
})).annotate({ identifier: "Specification" }) as any as Schema.Schema<Specification>;

export interface Execution {
  /** A unique identifier within a History for this Execution. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response always set - In create/update request: never set */
  executionId?: string;
  /** The initial state is IN_PROGRESS. The only legal state transitions is from IN_PROGRESS to COMPLETE. A PRECONDITION_FAILED will be returned if an invalid transition is requested. The state can only be set to COMPLETE once. A FAILED_PRECONDITION will be returned if the state is set to COMPLETE multiple times. If the state is set to COMPLETE, all the in-progress steps within the execution will be set as COMPLETE. If the outcome of the step is not set, the outcome will be set to INCONCLUSIVE. - In response always set - In create/update request: optional */
  state?: "unknownState" | "pending" | "inProgress" | "complete" | (string & {});
  /** The time when the Execution was created. This value will be set automatically when CreateExecution is called. - In response: always set - In create/update request: never set */
  creationTime?: Timestamp;
  /** The time when the Execution status transitioned to COMPLETE. This value will be set automatically when state transitions to COMPLETE. - In response: set if the execution state is COMPLETE. - In create/update request: never set */
  completionTime?: Timestamp;
  /** Classify the result, for example into SUCCESS or FAILURE - In response: present if set by create/update request - In create/update request: optional */
  outcome?: Outcome;
  /** The dimensions along which different steps in this execution may vary. This must remain fixed over the life of the execution. Returns INVALID_ARGUMENT if this field is set in an update request. Returns INVALID_ARGUMENT if the same name occurs in more than one dimension_definition. Returns INVALID_ARGUMENT if the size of the list is over 100. - In response: present if set by create - In create request: optional - In update request: never set */
  dimensionDefinitions?: Array<MatrixDimensionDefinition>;
  /** Lightweight information about execution request. - In response: present if set by create - In create: optional - In update: optional */
  specification?: Specification;
  /** TestExecution Matrix ID that the TestExecutionService uses. - In response: present if set by create - In create: optional - In update: never set */
  testExecutionMatrixId?: string;
}

export const Execution: Schema.Schema<Execution> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  creationTime: Schema.optional(Timestamp),
  completionTime: Schema.optional(Timestamp),
  outcome: Schema.optional(Outcome),
  dimensionDefinitions: Schema.optional(Schema.Array(MatrixDimensionDefinition)),
  specification: Schema.optional(Specification),
  testExecutionMatrixId: Schema.optional(Schema.String),
})).annotate({ identifier: "Execution" }) as any as Schema.Schema<Execution>;

export interface ListExecutionsResponse {
  /** Executions. Always set. */
  executions?: Array<Execution>;
  /** A continuation token to resume the query at the next item. Will only be set if there are more Executions to fetch. */
  nextPageToken?: string;
}

export const ListExecutionsResponse: Schema.Schema<ListExecutionsResponse> = Schema.suspend(() => Schema.Struct({
  executions: Schema.optional(Schema.Array(Execution)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListExecutionsResponse" }) as any as Schema.Schema<ListExecutionsResponse>;

export interface Screen {
  /** File reference of the png file. Required. */
  fileReference?: string;
  /** Model of the device that the screenshot was taken on. Required. */
  model?: string;
  /** OS version of the device that the screenshot was taken on. Required. */
  version?: string;
  /** Locale of the device that the screenshot was taken on. Required. */
  locale?: string;
}

export const Screen: Schema.Schema<Screen> = Schema.suspend(() => Schema.Struct({
  fileReference: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.String),
})).annotate({ identifier: "Screen" }) as any as Schema.Schema<Screen>;

export interface ScreenshotCluster {
  /** A unique identifier for the cluster. @OutputOnly */
  clusterId?: string;
  /** A singular screen that represents the cluster as a whole. This screen will act as the "cover" of the entire cluster. When users look at the clusters, only the key screen from each cluster will be shown. Which screen is the key screen is determined by the ClusteringAlgorithm */
  keyScreen?: Screen;
  /** A string that describes the activity of every screen in the cluster. */
  activity?: string;
  /** Full list of screens. */
  screens?: Array<Screen>;
}

export const ScreenshotCluster: Schema.Schema<ScreenshotCluster> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  keyScreen: Schema.optional(Screen),
  activity: Schema.optional(Schema.String),
  screens: Schema.optional(Schema.Array(Screen)),
})).annotate({ identifier: "ScreenshotCluster" }) as any as Schema.Schema<ScreenshotCluster>;

export interface ListScreenshotClustersResponse {
  /** The set of clusters associated with an execution Always set */
  clusters?: Array<ScreenshotCluster>;
}

export const ListScreenshotClustersResponse: Schema.Schema<ListScreenshotClustersResponse> = Schema.suspend(() => Schema.Struct({
  clusters: Schema.optional(Schema.Array(ScreenshotCluster)),
})).annotate({ identifier: "ListScreenshotClustersResponse" }) as any as Schema.Schema<ListScreenshotClustersResponse>;

export interface EnvironmentDimensionValueEntry {
  key?: string;
  value?: string;
}

export const EnvironmentDimensionValueEntry: Schema.Schema<EnvironmentDimensionValueEntry> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvironmentDimensionValueEntry" }) as any as Schema.Schema<EnvironmentDimensionValueEntry>;

export interface StepSummary {
}

export const StepSummary: Schema.Schema<StepSummary> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StepSummary" }) as any as Schema.Schema<StepSummary>;

export interface MergedResult {
  /** State of the resource */
  state?: "unknownState" | "pending" | "inProgress" | "complete" | (string & {});
  /** Outcome of the resource */
  outcome?: Outcome;
  /** The combined and rolled-up result of each test suite that was run as part of this environment. Combining: When the test cases from a suite are run in different steps (sharding), the results are added back together in one overview. (e.g., if shard1 has 2 failures and shard2 has 1 failure than the overview failure_count = 3). Rollup: When test cases from the same suite are run multiple times (flaky), the results are combined (e.g., if testcase1.run1 fails, testcase1.run2 passes, and both testcase2.run1 and testcase2.run2 fail then the overview flaky_count = 1 and failure_count = 1). */
  testSuiteOverviews?: Array<TestSuiteOverview>;
}

export const MergedResult: Schema.Schema<MergedResult> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  outcome: Schema.optional(Outcome),
  testSuiteOverviews: Schema.optional(Schema.Array(TestSuiteOverview)),
})).annotate({ identifier: "MergedResult" }) as any as Schema.Schema<MergedResult>;

export interface ShardSummary {
  /** Summaries of the steps belonging to the shard. With flaky_test_attempts enabled from TestExecutionService, more than one run (Step) can present. And the runs will be sorted by multistep_number. */
  runs?: Array<StepSummary>;
  /** Merged result of the shard. */
  shardResult?: MergedResult;
}

export const ShardSummary: Schema.Schema<ShardSummary> = Schema.suspend(() => Schema.Struct({
  runs: Schema.optional(Schema.Array(StepSummary)),
  shardResult: Schema.optional(MergedResult),
})).annotate({ identifier: "ShardSummary" }) as any as Schema.Schema<ShardSummary>;

export interface ResultsStorage {
  /** The root directory for test results. */
  resultsStoragePath?: FileReference;
  /** The path to the Xunit XML file. */
  xunitXmlFile?: FileReference;
}

export const ResultsStorage: Schema.Schema<ResultsStorage> = Schema.suspend(() => Schema.Struct({
  resultsStoragePath: Schema.optional(FileReference),
  xunitXmlFile: Schema.optional(FileReference),
})).annotate({ identifier: "ResultsStorage" }) as any as Schema.Schema<ResultsStorage>;

export interface Environment {
  /** Output only. A Project id. */
  projectId?: string;
  /** Output only. A History id. */
  historyId?: string;
  /** Output only. An Execution id. */
  executionId?: string;
  /** Output only. An Environment id. */
  environmentId?: string;
  /** Dimension values describing the environment. Dimension values always consist of "Model", "Version", "Locale", and "Orientation". - In response: always set - In create request: always set - In update request: never set */
  dimensionValue?: Array<EnvironmentDimensionValueEntry>;
  /** A short human-readable name to display in the UI. Maximum of 100 characters. For example: Nexus 5, API 27. */
  displayName?: string;
  /** Output only. The time when the Environment was created. */
  creationTime?: Timestamp;
  /** Output only. The time when the Environment status was set to complete. This value will be set automatically when state transitions to COMPLETE. */
  completionTime?: Timestamp;
  /** Output only. Summaries of shards. Only one shard will present unless sharding feature is enabled in TestExecutionService. */
  shardSummaries?: Array<ShardSummary>;
  /** Merged result of the environment. */
  environmentResult?: MergedResult;
  /** The location where output files are stored in the user bucket. */
  resultsStorage?: ResultsStorage;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  historyId: Schema.optional(Schema.String),
  executionId: Schema.optional(Schema.String),
  environmentId: Schema.optional(Schema.String),
  dimensionValue: Schema.optional(Schema.Array(EnvironmentDimensionValueEntry)),
  displayName: Schema.optional(Schema.String),
  creationTime: Schema.optional(Timestamp),
  completionTime: Schema.optional(Timestamp),
  shardSummaries: Schema.optional(Schema.Array(ShardSummary)),
  environmentResult: Schema.optional(MergedResult),
  resultsStorage: Schema.optional(ResultsStorage),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface ListEnvironmentsResponse {
  /** A Project id. Always set. */
  projectId?: string;
  /** A History id. Always set. */
  historyId?: string;
  /** A Execution id Always set. */
  executionId?: string;
  /** Environments. Always set. */
  environments?: Array<Environment>;
  /** A continuation token to resume the query at the next item. Will only be set if there are more Environments to fetch. */
  nextPageToken?: string;
}

export const ListEnvironmentsResponse: Schema.Schema<ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  historyId: Schema.optional(Schema.String),
  executionId: Schema.optional(Schema.String),
  environments: Schema.optional(Schema.Array(Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEnvironmentsResponse" }) as any as Schema.Schema<ListEnvironmentsResponse>;

export interface History {
  /** A unique identifier within a project for this History. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response always set - In create request: never set */
  historyId?: string;
  /** A name to uniquely identify a history within a project. Maximum of 200 characters. - In response always set - In create request: always set */
  name?: string;
  /** A short human-readable (plain text) name to display in the UI. Maximum of 100 characters. - In response: present if set during create. - In create request: optional */
  displayName?: string;
  /** The platform of the test history. - In response: always set. Returns the platform of the last execution if unknown. */
  testPlatform?: "unknownPlatform" | "android" | "ios" | (string & {});
}

export const History: Schema.Schema<History> = Schema.suspend(() => Schema.Struct({
  historyId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  testPlatform: Schema.optional(Schema.String),
})).annotate({ identifier: "History" }) as any as Schema.Schema<History>;

export interface ListHistoriesResponse {
  /** Histories. */
  histories?: Array<History>;
  /** A continuation token to resume the query at the next item. Will only be set if there are more histories to fetch. Tokens are valid for up to one hour from the time of the first list request. For instance, if you make a list request at 1PM and use the token from this first request 10 minutes later, the token from this second response will only be valid for 50 minutes. */
  nextPageToken?: string;
}

export const ListHistoriesResponse: Schema.Schema<ListHistoriesResponse> = Schema.suspend(() => Schema.Struct({
  histories: Schema.optional(Schema.Array(History)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListHistoriesResponse" }) as any as Schema.Schema<ListHistoriesResponse>;

export interface CPUInfo {
  /** description of the device processor ie '1.8 GHz hexa core 64-bit ARMv8-A' */
  cpuProcessor?: string;
  /** the CPU clock speed in GHz */
  cpuSpeedInGhz?: number;
  /** the number of CPU cores */
  numberOfCores?: number;
}

export const CPUInfo: Schema.Schema<CPUInfo> = Schema.suspend(() => Schema.Struct({
  cpuProcessor: Schema.optional(Schema.String),
  cpuSpeedInGhz: Schema.optional(Schema.Number),
  numberOfCores: Schema.optional(Schema.Number),
})).annotate({ identifier: "CPUInfo" }) as any as Schema.Schema<CPUInfo>;

export interface MemoryInfo {
  /** Total memory available on the device in KiB */
  memoryTotalInKibibyte?: string;
  /** Maximum memory that can be allocated to the process in KiB */
  memoryCapInKibibyte?: string;
}

export const MemoryInfo: Schema.Schema<MemoryInfo> = Schema.suspend(() => Schema.Struct({
  memoryTotalInKibibyte: Schema.optional(Schema.String),
  memoryCapInKibibyte: Schema.optional(Schema.String),
})).annotate({ identifier: "MemoryInfo" }) as any as Schema.Schema<MemoryInfo>;

export interface PerfEnvironment {
  /** CPU related environment info */
  cpuInfo?: CPUInfo;
  /** Memory related environment info */
  memoryInfo?: MemoryInfo;
}

export const PerfEnvironment: Schema.Schema<PerfEnvironment> = Schema.suspend(() => Schema.Struct({
  cpuInfo: Schema.optional(CPUInfo),
  memoryInfo: Schema.optional(MemoryInfo),
})).annotate({ identifier: "PerfEnvironment" }) as any as Schema.Schema<PerfEnvironment>;

export interface AppStartTime {
  /** The time from app start to the first displayed activity being drawn, as reported in Logcat. See https://developer.android.com/topic/performance/launch-time.html#time-initial */
  initialDisplayTime?: Duration;
  /** Optional. The time from app start to reaching the developer-reported "fully drawn" time. This is only stored if the app includes a call to Activity.reportFullyDrawn(). See https://developer.android.com/topic/performance/launch-time.html#time-full */
  fullyDrawnTime?: Duration;
}

export const AppStartTime: Schema.Schema<AppStartTime> = Schema.suspend(() => Schema.Struct({
  initialDisplayTime: Schema.optional(Duration),
  fullyDrawnTime: Schema.optional(Duration),
})).annotate({ identifier: "AppStartTime" }) as any as Schema.Schema<AppStartTime>;

export interface GraphicsStatsBucket {
  /** Lower bound of render time in milliseconds. */
  renderMillis?: string;
  /** Number of frames in the bucket. */
  frameCount?: string;
}

export const GraphicsStatsBucket: Schema.Schema<GraphicsStatsBucket> = Schema.suspend(() => Schema.Struct({
  renderMillis: Schema.optional(Schema.String),
  frameCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GraphicsStatsBucket" }) as any as Schema.Schema<GraphicsStatsBucket>;

export interface GraphicsStats {
  /** Total frames rendered by package. */
  totalFrames?: string;
  /** Total frames with slow render time. Should be <= total_frames. */
  jankyFrames?: string;
  /** 50th percentile frame render time in milliseconds. */
  p50Millis?: string;
  /** 90th percentile frame render time in milliseconds. */
  p90Millis?: string;
  /** 95th percentile frame render time in milliseconds. */
  p95Millis?: string;
  /** 99th percentile frame render time in milliseconds. */
  p99Millis?: string;
  /** Total "missed vsync" events. */
  missedVsyncCount?: string;
  /** Total "high input latency" events. */
  highInputLatencyCount?: string;
  /** Total "slow UI thread" events. */
  slowUiThreadCount?: string;
  /** Total "slow bitmap upload" events. */
  slowBitmapUploadCount?: string;
  /** Total "slow draw" events. */
  slowDrawCount?: string;
  /** Histogram of frame render times. There should be 154 buckets ranging from [5ms, 6ms) to [4950ms, infinity) */
  buckets?: Array<GraphicsStatsBucket>;
}

export const GraphicsStats: Schema.Schema<GraphicsStats> = Schema.suspend(() => Schema.Struct({
  totalFrames: Schema.optional(Schema.String),
  jankyFrames: Schema.optional(Schema.String),
  p50Millis: Schema.optional(Schema.String),
  p90Millis: Schema.optional(Schema.String),
  p95Millis: Schema.optional(Schema.String),
  p99Millis: Schema.optional(Schema.String),
  missedVsyncCount: Schema.optional(Schema.String),
  highInputLatencyCount: Schema.optional(Schema.String),
  slowUiThreadCount: Schema.optional(Schema.String),
  slowBitmapUploadCount: Schema.optional(Schema.String),
  slowDrawCount: Schema.optional(Schema.String),
  buckets: Schema.optional(Schema.Array(GraphicsStatsBucket)),
})).annotate({ identifier: "GraphicsStats" }) as any as Schema.Schema<GraphicsStats>;

export interface PerfMetricsSummary {
  /** The cloud project @OutputOnly */
  projectId?: string;
  /** A tool results history ID. @OutputOnly */
  historyId?: string;
  /** A tool results execution ID. @OutputOnly */
  executionId?: string;
  /** A tool results step ID. @OutputOnly */
  stepId?: string;
  /** Set of resource collected */
  perfMetrics?: Array<"perfMetricTypeUnspecified" | "memory" | "cpu" | "network" | "graphics" | (string & {})>;
  /** Describes the environment in which the performance metrics were collected */
  perfEnvironment?: PerfEnvironment;
  appStartTime?: AppStartTime;
  /** Graphics statistics for the entire run. Statistics are reset at the beginning of the run and collected at the end of the run. */
  graphicsStats?: GraphicsStats;
}

export const PerfMetricsSummary: Schema.Schema<PerfMetricsSummary> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  historyId: Schema.optional(Schema.String),
  executionId: Schema.optional(Schema.String),
  stepId: Schema.optional(Schema.String),
  perfMetrics: Schema.optional(Schema.Array(Schema.String)),
  perfEnvironment: Schema.optional(PerfEnvironment),
  appStartTime: Schema.optional(AppStartTime),
  graphicsStats: Schema.optional(GraphicsStats),
})).annotate({ identifier: "PerfMetricsSummary" }) as any as Schema.Schema<PerfMetricsSummary>;

export interface BasicPerfSampleSeries {
  perfMetricType?: "perfMetricTypeUnspecified" | "memory" | "cpu" | "network" | "graphics" | (string & {});
  perfUnit?: "perfUnitUnspecified" | "kibibyte" | "percent" | "bytesPerSecond" | "framesPerSecond" | "byte" | (string & {});
  sampleSeriesLabel?: "sampleSeriesTypeUnspecified" | "memoryRssPrivate" | "memoryRssShared" | "memoryRssTotal" | "memoryTotal" | "cpuUser" | "cpuKernel" | "cpuTotal" | "ntBytesTransferred" | "ntBytesReceived" | "networkSent" | "networkReceived" | "graphicsFrameRate" | (string & {});
}

export const BasicPerfSampleSeries: Schema.Schema<BasicPerfSampleSeries> = Schema.suspend(() => Schema.Struct({
  perfMetricType: Schema.optional(Schema.String),
  perfUnit: Schema.optional(Schema.String),
  sampleSeriesLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "BasicPerfSampleSeries" }) as any as Schema.Schema<BasicPerfSampleSeries>;

export interface PerfSampleSeries {
  /** The cloud project @OutputOnly */
  projectId?: string;
  /** A tool results history ID. @OutputOnly */
  historyId?: string;
  /** A tool results execution ID. @OutputOnly */
  executionId?: string;
  /** A tool results step ID. @OutputOnly */
  stepId?: string;
  /** A sample series id @OutputOnly */
  sampleSeriesId?: string;
  /** Basic series represented by a line chart */
  basicPerfSampleSeries?: BasicPerfSampleSeries;
}

export const PerfSampleSeries: Schema.Schema<PerfSampleSeries> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  historyId: Schema.optional(Schema.String),
  executionId: Schema.optional(Schema.String),
  stepId: Schema.optional(Schema.String),
  sampleSeriesId: Schema.optional(Schema.String),
  basicPerfSampleSeries: Schema.optional(BasicPerfSampleSeries),
})).annotate({ identifier: "PerfSampleSeries" }) as any as Schema.Schema<PerfSampleSeries>;

export interface ListPerfSampleSeriesResponse {
  /** The resulting PerfSampleSeries sorted by id */
  perfSampleSeries?: Array<PerfSampleSeries>;
}

export const ListPerfSampleSeriesResponse: Schema.Schema<ListPerfSampleSeriesResponse> = Schema.suspend(() => Schema.Struct({
  perfSampleSeries: Schema.optional(Schema.Array(PerfSampleSeries)),
})).annotate({ identifier: "ListPerfSampleSeriesResponse" }) as any as Schema.Schema<ListPerfSampleSeriesResponse>;

export interface PerfSample {
  /** Timestamp of collection. */
  sampleTime?: Timestamp;
  /** Value observed */
  value?: number;
}

export const PerfSample: Schema.Schema<PerfSample> = Schema.suspend(() => Schema.Struct({
  sampleTime: Schema.optional(Timestamp),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "PerfSample" }) as any as Schema.Schema<PerfSample>;

export interface BatchCreatePerfSamplesRequest {
  /** The set of PerfSamples to create should not include existing timestamps */
  perfSamples?: Array<PerfSample>;
}

export const BatchCreatePerfSamplesRequest: Schema.Schema<BatchCreatePerfSamplesRequest> = Schema.suspend(() => Schema.Struct({
  perfSamples: Schema.optional(Schema.Array(PerfSample)),
})).annotate({ identifier: "BatchCreatePerfSamplesRequest" }) as any as Schema.Schema<BatchCreatePerfSamplesRequest>;

export interface BatchCreatePerfSamplesResponse {
  perfSamples?: Array<PerfSample>;
}

export const BatchCreatePerfSamplesResponse: Schema.Schema<BatchCreatePerfSamplesResponse> = Schema.suspend(() => Schema.Struct({
  perfSamples: Schema.optional(Schema.Array(PerfSample)),
})).annotate({ identifier: "BatchCreatePerfSamplesResponse" }) as any as Schema.Schema<BatchCreatePerfSamplesResponse>;

export interface ListPerfSamplesResponse {
  perfSamples?: Array<PerfSample>;
  /** Optional, returned if result size exceeds the page size specified in the request (or the default page size, 500, if unspecified). It indicates the last sample timestamp to be used as page_token in subsequent request */
  nextPageToken?: string;
}

export const ListPerfSamplesResponse: Schema.Schema<ListPerfSamplesResponse> = Schema.suspend(() => Schema.Struct({
  perfSamples: Schema.optional(Schema.Array(PerfSample)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPerfSamplesResponse" }) as any as Schema.Schema<ListPerfSamplesResponse>;

export interface ProjectSettings {
  /** The name of the project's settings. Always of the form: projects/{project-id}/settings In update request: never set In response: always set */
  name?: string;
  /** The name of the Google Cloud Storage bucket to which results are written. By default, this is unset. In update request: optional In response: optional */
  defaultBucket?: string;
}

export const ProjectSettings: Schema.Schema<ProjectSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  defaultBucket: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectSettings" }) as any as Schema.Schema<ProjectSettings>;

export interface ANR {
  /** The stack trace of the ANR crash. Optional. */
  stackTrace?: StackTrace;
}

export const ANR: Schema.Schema<ANR> = Schema.suspend(() => Schema.Struct({
  stackTrace: Schema.optional(StackTrace),
})).annotate({ identifier: "ANR" }) as any as Schema.Schema<ANR>;

export interface AvailableDeepLinks {
}

export const AvailableDeepLinks: Schema.Schema<AvailableDeepLinks> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AvailableDeepLinks" }) as any as Schema.Schema<AvailableDeepLinks>;

export interface BlankScreen {
  /** The screen id of the element */
  screenId?: string;
}

export const BlankScreen: Schema.Schema<BlankScreen> = Schema.suspend(() => Schema.Struct({
  screenId: Schema.optional(Schema.String),
})).annotate({ identifier: "BlankScreen" }) as any as Schema.Schema<BlankScreen>;

export interface CrashDialogError {
  /** The name of the package that caused the dialog. */
  crashPackage?: string;
}

export const CrashDialogError: Schema.Schema<CrashDialogError> = Schema.suspend(() => Schema.Struct({
  crashPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "CrashDialogError" }) as any as Schema.Schema<CrashDialogError>;

export interface DetectedAppSplashScreen {
}

export const DetectedAppSplashScreen: Schema.Schema<DetectedAppSplashScreen> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DetectedAppSplashScreen" }) as any as Schema.Schema<DetectedAppSplashScreen>;

export interface DeviceOutOfMemory {
}

export const DeviceOutOfMemory: Schema.Schema<DeviceOutOfMemory> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeviceOutOfMemory" }) as any as Schema.Schema<DeviceOutOfMemory>;

export interface EncounteredLoginScreen {
  /** Number of encountered distinct login screens. */
  distinctScreens?: number;
  /** Subset of login screens. */
  screenIds?: Array<string>;
}

export const EncounteredLoginScreen: Schema.Schema<EncounteredLoginScreen> = Schema.suspend(() => Schema.Struct({
  distinctScreens: Schema.optional(Schema.Number),
  screenIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EncounteredLoginScreen" }) as any as Schema.Schema<EncounteredLoginScreen>;

export interface EncounteredNonAndroidUiWidgetScreen {
  /** Number of encountered distinct screens with non Android UI widgets. */
  distinctScreens?: number;
  /** Subset of screens which contain non Android UI widgets. */
  screenIds?: Array<string>;
}

export const EncounteredNonAndroidUiWidgetScreen: Schema.Schema<EncounteredNonAndroidUiWidgetScreen> = Schema.suspend(() => Schema.Struct({
  distinctScreens: Schema.optional(Schema.Number),
  screenIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EncounteredNonAndroidUiWidgetScreen" }) as any as Schema.Schema<EncounteredNonAndroidUiWidgetScreen>;

export interface FailedToInstall {
}

export const FailedToInstall: Schema.Schema<FailedToInstall> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FailedToInstall" }) as any as Schema.Schema<FailedToInstall>;

export interface AssetIssue {
}

export const AssetIssue: Schema.Schema<AssetIssue> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AssetIssue" }) as any as Schema.Schema<AssetIssue>;

export interface FatalException {
  /** The stack trace of the fatal exception. Optional. */
  stackTrace?: StackTrace;
}

export const FatalException: Schema.Schema<FatalException> = Schema.suspend(() => Schema.Struct({
  stackTrace: Schema.optional(StackTrace),
})).annotate({ identifier: "FatalException" }) as any as Schema.Schema<FatalException>;

export interface InAppPurchasesFound {
  /** The total number of in-app purchases flows started. */
  inAppPurchasesFlowsStarted?: number;
  /** The total number of in-app purchases flows explored: how many times the robo tries to buy a SKU. */
  inAppPurchasesFlowsExplored?: number;
}

export const InAppPurchasesFound: Schema.Schema<InAppPurchasesFound> = Schema.suspend(() => Schema.Struct({
  inAppPurchasesFlowsStarted: Schema.optional(Schema.Number),
  inAppPurchasesFlowsExplored: Schema.optional(Schema.Number),
})).annotate({ identifier: "InAppPurchasesFound" }) as any as Schema.Schema<InAppPurchasesFound>;

export interface InsufficientCoverage {
}

export const InsufficientCoverage: Schema.Schema<InsufficientCoverage> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "InsufficientCoverage" }) as any as Schema.Schema<InsufficientCoverage>;

export interface IosAppCrashed {
  /** The stack trace, if one is available. Optional. */
  stackTrace?: StackTrace;
}

export const IosAppCrashed: Schema.Schema<IosAppCrashed> = Schema.suspend(() => Schema.Struct({
  stackTrace: Schema.optional(StackTrace),
})).annotate({ identifier: "IosAppCrashed" }) as any as Schema.Schema<IosAppCrashed>;

export interface LauncherActivityNotFound {
}

export const LauncherActivityNotFound: Schema.Schema<LauncherActivityNotFound> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LauncherActivityNotFound" }) as any as Schema.Schema<LauncherActivityNotFound>;

export interface LogcatCollectionError {
}

export const LogcatCollectionError: Schema.Schema<LogcatCollectionError> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LogcatCollectionError" }) as any as Schema.Schema<LogcatCollectionError>;

export interface NativeCrash {
  /** The stack trace of the native crash. Optional. */
  stackTrace?: StackTrace;
}

export const NativeCrash: Schema.Schema<NativeCrash> = Schema.suspend(() => Schema.Struct({
  stackTrace: Schema.optional(StackTrace),
})).annotate({ identifier: "NativeCrash" }) as any as Schema.Schema<NativeCrash>;

export interface NonSdkApiUsageViolation {
  /** Total number of unique hidden API's accessed. */
  uniqueApis?: number;
  /** Signatures of a subset of those hidden API's. */
  apiSignatures?: Array<string>;
}

export const NonSdkApiUsageViolation: Schema.Schema<NonSdkApiUsageViolation> = Schema.suspend(() => Schema.Struct({
  uniqueApis: Schema.optional(Schema.Number),
  apiSignatures: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NonSdkApiUsageViolation" }) as any as Schema.Schema<NonSdkApiUsageViolation>;

export interface UpgradeInsight {
  /** The name of the package to be upgraded. */
  packageName?: string;
  /** The suggested version to upgrade to. Optional: In case we are not sure which version solves this problem */
  upgradeToVersion?: string;
}

export const UpgradeInsight: Schema.Schema<UpgradeInsight> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  upgradeToVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "UpgradeInsight" }) as any as Schema.Schema<UpgradeInsight>;

export interface PendingGoogleUpdateInsight {
  /** The name of the Google-provided library with the non-SDK API dependency. */
  nameOfGoogleLibrary?: string;
}

export const PendingGoogleUpdateInsight: Schema.Schema<PendingGoogleUpdateInsight> = Schema.suspend(() => Schema.Struct({
  nameOfGoogleLibrary: Schema.optional(Schema.String),
})).annotate({ identifier: "PendingGoogleUpdateInsight" }) as any as Schema.Schema<PendingGoogleUpdateInsight>;

export interface NonSdkApiInsight {
  /** An insight indicating that the hidden API usage originates from the use of a library that needs to be upgraded. */
  upgradeInsight?: UpgradeInsight;
  /** An insight indicating that the hidden API usage originates from a Google-provided library. */
  pendingGoogleUpdateInsight?: PendingGoogleUpdateInsight;
  /** A unique ID, to be used for determining the effectiveness of this particular insight in the context of a matcher. (required) */
  matcherId?: string;
  /** Optional sample stack traces, for which this insight applies (there should be at least one). */
  exampleTraceMessages?: Array<string>;
}

export const NonSdkApiInsight: Schema.Schema<NonSdkApiInsight> = Schema.suspend(() => Schema.Struct({
  upgradeInsight: Schema.optional(UpgradeInsight),
  pendingGoogleUpdateInsight: Schema.optional(PendingGoogleUpdateInsight),
  matcherId: Schema.optional(Schema.String),
  exampleTraceMessages: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NonSdkApiInsight" }) as any as Schema.Schema<NonSdkApiInsight>;

export interface NonSdkApi {
  /** The signature of the Non-SDK API */
  apiSignature?: string;
  /** The total number of times this API was observed to have been called. */
  invocationCount?: number;
  /** Which list this API appears on */
  list?: "NONE" | "WHITE" | "BLACK" | "GREY" | "GREY_MAX_O" | "GREY_MAX_P" | "GREY_MAX_Q" | "GREY_MAX_R" | "GREY_MAX_S" | (string & {});
  /** Example stack traces of this API being called. */
  exampleStackTraces?: Array<string>;
  /** Optional debugging insights for non-SDK API violations. */
  insights?: Array<NonSdkApiInsight>;
}

export const NonSdkApi: Schema.Schema<NonSdkApi> = Schema.suspend(() => Schema.Struct({
  apiSignature: Schema.optional(Schema.String),
  invocationCount: Schema.optional(Schema.Number),
  list: Schema.optional(Schema.String),
  exampleStackTraces: Schema.optional(Schema.Array(Schema.String)),
  insights: Schema.optional(Schema.Array(NonSdkApiInsight)),
})).annotate({ identifier: "NonSdkApi" }) as any as Schema.Schema<NonSdkApi>;

export interface NonSdkApiUsageViolationReport {
  /** Total number of unique Non-SDK API's accessed. */
  uniqueApis?: number;
  /** Minimum API level required for the application to run. */
  minSdkVersion?: number;
  /** Specifies the API Level on which the application is designed to run. */
  targetSdkVersion?: number;
  /** Examples of the detected API usages. */
  exampleApis?: Array<NonSdkApi>;
}

export const NonSdkApiUsageViolationReport: Schema.Schema<NonSdkApiUsageViolationReport> = Schema.suspend(() => Schema.Struct({
  uniqueApis: Schema.optional(Schema.Number),
  minSdkVersion: Schema.optional(Schema.Number),
  targetSdkVersion: Schema.optional(Schema.Number),
  exampleApis: Schema.optional(Schema.Array(NonSdkApi)),
})).annotate({ identifier: "NonSdkApiUsageViolationReport" }) as any as Schema.Schema<NonSdkApiUsageViolationReport>;

export interface OverlappingUIElements {
  /** The screen id of the elements */
  screenId?: string;
  /** Resource names of the overlapping screen elements */
  resourceName?: Array<string>;
}

export const OverlappingUIElements: Schema.Schema<OverlappingUIElements> = Schema.suspend(() => Schema.Struct({
  screenId: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OverlappingUIElements" }) as any as Schema.Schema<OverlappingUIElements>;

export interface PerformedGoogleLogin {
}

export const PerformedGoogleLogin: Schema.Schema<PerformedGoogleLogin> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PerformedGoogleLogin" }) as any as Schema.Schema<PerformedGoogleLogin>;

export interface PerformedMonkeyActions {
  /** The total number of monkey actions performed during the crawl. */
  totalActions?: number;
}

export const PerformedMonkeyActions: Schema.Schema<PerformedMonkeyActions> = Schema.suspend(() => Schema.Struct({
  totalActions: Schema.optional(Schema.Number),
})).annotate({ identifier: "PerformedMonkeyActions" }) as any as Schema.Schema<PerformedMonkeyActions>;

export interface RoboScriptExecution {
  /** The total number of actions in the Robo script. */
  totalActions?: number;
  /** The number of Robo script actions executed successfully. */
  successfulActions?: number;
}

export const RoboScriptExecution: Schema.Schema<RoboScriptExecution> = Schema.suspend(() => Schema.Struct({
  totalActions: Schema.optional(Schema.Number),
  successfulActions: Schema.optional(Schema.Number),
})).annotate({ identifier: "RoboScriptExecution" }) as any as Schema.Schema<RoboScriptExecution>;

export interface StartActivityNotFound {
  action?: string;
  uri?: string;
}

export const StartActivityNotFound: Schema.Schema<StartActivityNotFound> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "StartActivityNotFound" }) as any as Schema.Schema<StartActivityNotFound>;

export interface UIElementTooDeep {
  /** The screen id of the element */
  screenId?: string;
  /** The screen state id of the element */
  screenStateId?: string;
  /** The depth of the screen element */
  depth?: number;
}

export const UIElementTooDeep: Schema.Schema<UIElementTooDeep> = Schema.suspend(() => Schema.Struct({
  screenId: Schema.optional(Schema.String),
  screenStateId: Schema.optional(Schema.String),
  depth: Schema.optional(Schema.Number),
})).annotate({ identifier: "UIElementTooDeep" }) as any as Schema.Schema<UIElementTooDeep>;

export interface UnspecifiedWarning {
}

export const UnspecifiedWarning: Schema.Schema<UnspecifiedWarning> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UnspecifiedWarning" }) as any as Schema.Schema<UnspecifiedWarning>;

export interface UnusedRoboDirective {
  /** The name of the resource that was unused. */
  resourceName?: string;
}

export const UnusedRoboDirective: Schema.Schema<UnusedRoboDirective> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "UnusedRoboDirective" }) as any as Schema.Schema<UnusedRoboDirective>;

export interface UsedRoboDirective {
  /** The name of the resource that was used. */
  resourceName?: string;
}

export const UsedRoboDirective: Schema.Schema<UsedRoboDirective> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "UsedRoboDirective" }) as any as Schema.Schema<UsedRoboDirective>;

export interface UsedRoboIgnoreDirective {
  /** The name of the resource that was ignored. */
  resourceName?: string;
}

export const UsedRoboIgnoreDirective: Schema.Schema<UsedRoboIgnoreDirective> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
})).annotate({ identifier: "UsedRoboIgnoreDirective" }) as any as Schema.Schema<UsedRoboIgnoreDirective>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the Tool Results settings for a project. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read from project */
export interface GetSettingsProjectsRequest {
  /** A Project id. Required. */
  projectId: string;
}

export const GetSettingsProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsProjectsRequest>;

export type GetSettingsProjectsResponse = ProjectSettings;
export const GetSettingsProjectsResponse = ProjectSettings;

export type GetSettingsProjectsError = CommonErrors;

export const getSettingsProjects: API.OperationMethod<GetSettingsProjectsRequest, GetSettingsProjectsResponse, GetSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsProjectsRequest,
  output: GetSettingsProjectsResponse,
  errors: [],
}));

/** Creates resources for settings which have not yet been set. Currently, this creates a single resource: a Google Cloud Storage bucket, to be used as the default bucket for this project. The bucket is created in an FTL-own storage project. Except for in rare cases, calling this method in parallel from multiple clients will only create a single bucket. In order to avoid unnecessary storage charges, the bucket is configured to automatically delete objects older than 90 days. The bucket is created with the following permissions: - Owner access for owners of central storage project (FTL-owned) - Writer access for owners/editors of customer project - Reader access for viewers of customer project The default ACL on objects created in the bucket is: - Owner access for owners of central storage project - Reader access for owners/editors/viewers of customer project See Google Cloud Storage documentation for more details. If there is already a default bucket set and the project can access the bucket, this call does nothing. However, if the project doesn't have the permission to access the bucket or the bucket is deleted, a new bucket will be created. May return any canonical error codes, including the following: - PERMISSION_DENIED - if the user is not authorized to write to project - Any error code raised by Google Cloud Storage */
export interface InitializeSettingsProjectsRequest {
  /** A Project id. Required. */
  projectId: string;
}

export const InitializeSettingsProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}:initializeSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitializeSettingsProjectsRequest>;

export type InitializeSettingsProjectsResponse = ProjectSettings;
export const InitializeSettingsProjectsResponse = ProjectSettings;

export type InitializeSettingsProjectsError = CommonErrors;

export const initializeSettingsProjects: API.OperationMethod<InitializeSettingsProjectsRequest, InitializeSettingsProjectsResponse, InitializeSettingsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitializeSettingsProjectsRequest,
  output: InitializeSettingsProjectsResponse,
  errors: [],
}));

/** Creates a History. The returned History will have the id set. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the containing project does not exist */
export interface CreateProjectsHistoriesRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended. */
  requestId?: string;
  /** Request body */
  body?: History;
}

export const CreateProjectsHistoriesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(History).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsHistoriesRequest>;

export type CreateProjectsHistoriesResponse = History;
export const CreateProjectsHistoriesResponse = History;

export type CreateProjectsHistoriesError = CommonErrors;

export const createProjectsHistories: API.OperationMethod<CreateProjectsHistoriesRequest, CreateProjectsHistoriesResponse, CreateProjectsHistoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsHistoriesRequest,
  output: CreateProjectsHistoriesResponse,
  errors: [],
}));

/** Gets a History. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the History does not exist */
export interface GetProjectsHistoriesRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
}

export const GetProjectsHistoriesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesRequest>;

export type GetProjectsHistoriesResponse = History;
export const GetProjectsHistoriesResponse = History;

export type GetProjectsHistoriesError = CommonErrors;

export const getProjectsHistories: API.OperationMethod<GetProjectsHistoriesRequest, GetProjectsHistoriesResponse, GetProjectsHistoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesRequest,
  output: GetProjectsHistoriesResponse,
  errors: [],
}));

/** Lists Histories for a given Project. The histories are sorted by modification time in descending order. The history_id key will be used to order the history with the same modification time. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the History does not exist */
export interface ListProjectsHistoriesRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A continuation token to resume the query at the next item. Optional. */
  pageToken?: string;
  /** The maximum number of Histories to fetch. Default value: 20. The server will use this default if the field is not set or has a value of 0. Any value greater than 100 will be treated as 100. Optional. */
  pageSize?: number;
  /** If set, only return histories with the given name. Optional. */
  filterByName?: string;
}

export const ListProjectsHistoriesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filterByName: Schema.optional(Schema.String).pipe(T.HttpQuery("filterByName")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesRequest>;

export type ListProjectsHistoriesResponse = ListHistoriesResponse;
export const ListProjectsHistoriesResponse = ListHistoriesResponse;

export type ListProjectsHistoriesError = CommonErrors;

export const listProjectsHistories = API.makePaginated(() => ({
  input: ListProjectsHistoriesRequest,
  output: ListProjectsHistoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an Execution. The returned Execution will have the id set. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the containing History does not exist */
export interface CreateProjectsHistoriesExecutionsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended. */
  requestId?: string;
  /** Request body */
  body?: Execution;
}

export const CreateProjectsHistoriesExecutionsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Execution).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsHistoriesExecutionsRequest>;

export type CreateProjectsHistoriesExecutionsResponse = Execution;
export const CreateProjectsHistoriesExecutionsResponse = Execution;

export type CreateProjectsHistoriesExecutionsError = CommonErrors;

export const createProjectsHistoriesExecutions: API.OperationMethod<CreateProjectsHistoriesExecutionsRequest, CreateProjectsHistoriesExecutionsResponse, CreateProjectsHistoriesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsHistoriesExecutionsRequest,
  output: CreateProjectsHistoriesExecutionsResponse,
  errors: [],
}));

/** Lists Executions for a given History. The executions are sorted by creation_time in descending order. The execution_id key will be used to order the executions with the same creation_time. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the containing History does not exist */
export interface ListProjectsHistoriesExecutionsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A continuation token to resume the query at the next item. Optional. */
  pageToken?: string;
  /** The maximum number of Executions to fetch. Default value: 25. The server will use this default if the field is not set or has a value of 0. Optional. */
  pageSize?: number;
}

export const ListProjectsHistoriesExecutionsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsRequest>;

export type ListProjectsHistoriesExecutionsResponse = ListExecutionsResponse;
export const ListProjectsHistoriesExecutionsResponse = ListExecutionsResponse;

export type ListProjectsHistoriesExecutionsError = CommonErrors;

export const listProjectsHistoriesExecutions = API.makePaginated(() => ({
  input: ListProjectsHistoriesExecutionsRequest,
  output: ListProjectsHistoriesExecutionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an Execution. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the Execution does not exist */
export interface GetProjectsHistoriesExecutionsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** An Execution id. Required. */
  executionId: string;
}

export const GetProjectsHistoriesExecutionsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesExecutionsRequest>;

export type GetProjectsHistoriesExecutionsResponse = Execution;
export const GetProjectsHistoriesExecutionsResponse = Execution;

export type GetProjectsHistoriesExecutionsError = CommonErrors;

export const getProjectsHistoriesExecutions: API.OperationMethod<GetProjectsHistoriesExecutionsRequest, GetProjectsHistoriesExecutionsResponse, GetProjectsHistoriesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesExecutionsRequest,
  output: GetProjectsHistoriesExecutionsResponse,
  errors: [],
}));

/** Updates an existing Execution with the supplied partial entity. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if the requested state transition is illegal - NOT_FOUND - if the containing History does not exist */
export interface PatchProjectsHistoriesExecutionsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** Required. */
  historyId: string;
  /** Required. */
  executionId: string;
  /** A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended. */
  requestId?: string;
  /** Request body */
  body?: Execution;
}

export const PatchProjectsHistoriesExecutionsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Execution).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsHistoriesExecutionsRequest>;

export type PatchProjectsHistoriesExecutionsResponse = Execution;
export const PatchProjectsHistoriesExecutionsResponse = Execution;

export type PatchProjectsHistoriesExecutionsError = CommonErrors;

export const patchProjectsHistoriesExecutions: API.OperationMethod<PatchProjectsHistoriesExecutionsRequest, PatchProjectsHistoriesExecutionsResponse, PatchProjectsHistoriesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsHistoriesExecutionsRequest,
  output: PatchProjectsHistoriesExecutionsResponse,
  errors: [],
}));

/** Lists accessibility clusters for a given Step May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if an argument in the request happens to be invalid; e.g. if the locale format is incorrect - NOT_FOUND - if the containing Step does not exist */
export interface AccessibilityClustersProjectsHistoriesExecutionsStepsRequest {
  /** A full resource name of the step. For example, projects/my-project/histories/bh.1234567890abcdef/executions/ 1234567890123456789/steps/bs.1234567890abcdef Required. */
  name: string;
  /** The accepted format is the canonical Unicode format with hyphen as a delimiter. Language must be lowercase, Language Script - Capitalized, Region - UPPERCASE. See http://www.unicode.org/reports/tr35/#Unicode_locale_identifier for details. Required. */
  locale?: string;
}

export const AccessibilityClustersProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectsId}/histories/{historiesId}/executions/{executionsId}/steps/{stepsId}:accessibilityClusters" }),
  svc,
) as unknown as Schema.Schema<AccessibilityClustersProjectsHistoriesExecutionsStepsRequest>;

export type AccessibilityClustersProjectsHistoriesExecutionsStepsResponse = ListStepAccessibilityClustersResponse;
export const AccessibilityClustersProjectsHistoriesExecutionsStepsResponse = ListStepAccessibilityClustersResponse;

export type AccessibilityClustersProjectsHistoriesExecutionsStepsError = CommonErrors;

export const accessibilityClustersProjectsHistoriesExecutionsSteps: API.OperationMethod<AccessibilityClustersProjectsHistoriesExecutionsStepsRequest, AccessibilityClustersProjectsHistoriesExecutionsStepsResponse, AccessibilityClustersProjectsHistoriesExecutionsStepsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AccessibilityClustersProjectsHistoriesExecutionsStepsRequest,
  output: AccessibilityClustersProjectsHistoriesExecutionsStepsResponse,
  errors: [],
}));

/** Creates a Step. The returned Step will have the id set. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if the step is too large (more than 10Mib) - NOT_FOUND - if the containing Execution does not exist */
export interface CreateProjectsHistoriesExecutionsStepsRequest {
  /** Required. A Project id. */
  projectId: string;
  /** Required. A History id. */
  historyId: string;
  /** Required. An Execution id. */
  executionId: string;
  /** A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended. */
  requestId?: string;
  /** Request body */
  body?: Step;
}

export const CreateProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Step).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsHistoriesExecutionsStepsRequest>;

export type CreateProjectsHistoriesExecutionsStepsResponse = Step;
export const CreateProjectsHistoriesExecutionsStepsResponse = Step;

export type CreateProjectsHistoriesExecutionsStepsError = CommonErrors;

export const createProjectsHistoriesExecutionsSteps: API.OperationMethod<CreateProjectsHistoriesExecutionsStepsRequest, CreateProjectsHistoriesExecutionsStepsResponse, CreateProjectsHistoriesExecutionsStepsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsHistoriesExecutionsStepsRequest,
  output: CreateProjectsHistoriesExecutionsStepsResponse,
  errors: [],
}));

/** Gets a Step. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the Step does not exist */
export interface GetProjectsHistoriesExecutionsStepsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A Execution id. Required. */
  executionId: string;
  /** A Step id. Required. */
  stepId: string;
}

export const GetProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesExecutionsStepsRequest>;

export type GetProjectsHistoriesExecutionsStepsResponse = Step;
export const GetProjectsHistoriesExecutionsStepsResponse = Step;

export type GetProjectsHistoriesExecutionsStepsError = CommonErrors;

export const getProjectsHistoriesExecutionsSteps: API.OperationMethod<GetProjectsHistoriesExecutionsStepsRequest, GetProjectsHistoriesExecutionsStepsResponse, GetProjectsHistoriesExecutionsStepsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesExecutionsStepsRequest,
  output: GetProjectsHistoriesExecutionsStepsResponse,
  errors: [],
}));

/** Lists Steps for a given Execution. The steps are sorted by creation_time in descending order. The step_id key will be used to order the steps with the same creation_time. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if an argument in the request happens to be invalid; e.g. if an attempt is made to list the children of a nonexistent Step - NOT_FOUND - if the containing Execution does not exist */
export interface ListProjectsHistoriesExecutionsStepsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A Execution id. Required. */
  executionId: string;
  /** A continuation token to resume the query at the next item. Optional. */
  pageToken?: string;
  /** The maximum number of Steps to fetch. Default value: 25. The server will use this default if the field is not set or has a value of 0. Optional. */
  pageSize?: number;
}

export const ListProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsStepsRequest>;

export type ListProjectsHistoriesExecutionsStepsResponse = ListStepsResponse;
export const ListProjectsHistoriesExecutionsStepsResponse = ListStepsResponse;

export type ListProjectsHistoriesExecutionsStepsError = CommonErrors;

export const listProjectsHistoriesExecutionsSteps = API.makePaginated(() => ({
  input: ListProjectsHistoriesExecutionsStepsRequest,
  output: ListProjectsHistoriesExecutionsStepsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing Step with the supplied partial entity. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write project - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if the requested state transition is illegal (e.g try to upload a duplicate xml file), if the updated step is too large (more than 10Mib) - NOT_FOUND - if the containing Execution does not exist */
export interface PatchProjectsHistoriesExecutionsStepsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A Execution id. Required. */
  executionId: string;
  /** A Step id. Required. */
  stepId: string;
  /** A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended. */
  requestId?: string;
  /** Request body */
  body?: Step;
}

export const PatchProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Step).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsHistoriesExecutionsStepsRequest>;

export type PatchProjectsHistoriesExecutionsStepsResponse = Step;
export const PatchProjectsHistoriesExecutionsStepsResponse = Step;

export type PatchProjectsHistoriesExecutionsStepsError = CommonErrors;

export const patchProjectsHistoriesExecutionsSteps: API.OperationMethod<PatchProjectsHistoriesExecutionsStepsRequest, PatchProjectsHistoriesExecutionsStepsResponse, PatchProjectsHistoriesExecutionsStepsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsHistoriesExecutionsStepsRequest,
  output: PatchProjectsHistoriesExecutionsStepsResponse,
  errors: [],
}));

/** Publish xml files to an existing Step. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write project - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if the requested state transition is illegal, e.g. try to upload a duplicate xml file or a file too large. - NOT_FOUND - if the containing Execution does not exist */
export interface PublishXunitXmlFilesProjectsHistoriesExecutionsStepsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A Execution id. Required. */
  executionId: string;
  /** A Step id. Note: This step must include a TestExecutionStep. Required. */
  stepId: string;
  /** Request body */
  body?: PublishXunitXmlFilesRequest;
}

export const PublishXunitXmlFilesProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  body: Schema.optional(PublishXunitXmlFilesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}:publishXunitXmlFiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishXunitXmlFilesProjectsHistoriesExecutionsStepsRequest>;

export type PublishXunitXmlFilesProjectsHistoriesExecutionsStepsResponse = Step;
export const PublishXunitXmlFilesProjectsHistoriesExecutionsStepsResponse = Step;

export type PublishXunitXmlFilesProjectsHistoriesExecutionsStepsError = CommonErrors;

export const publishXunitXmlFilesProjectsHistoriesExecutionsSteps: API.OperationMethod<PublishXunitXmlFilesProjectsHistoriesExecutionsStepsRequest, PublishXunitXmlFilesProjectsHistoriesExecutionsStepsResponse, PublishXunitXmlFilesProjectsHistoriesExecutionsStepsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishXunitXmlFilesProjectsHistoriesExecutionsStepsRequest,
  output: PublishXunitXmlFilesProjectsHistoriesExecutionsStepsResponse,
  errors: [],
}));

/** Retrieves a PerfMetricsSummary. May return any of the following error code(s): - NOT_FOUND - The specified PerfMetricsSummary does not exist */
export interface GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
}

export const GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfMetricsSummary" }),
  svc,
) as unknown as Schema.Schema<GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsRequest>;

export type GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsResponse = PerfMetricsSummary;
export const GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsResponse = PerfMetricsSummary;

export type GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsError = CommonErrors;

export const getPerfMetricsSummaryProjectsHistoriesExecutionsSteps: API.OperationMethod<GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsRequest, GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsResponse, GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsRequest,
  output: GetPerfMetricsSummaryProjectsHistoriesExecutionsStepsResponse,
  errors: [],
}));

/** Gets details of a Test Case for a Step. Experimental test cases API. Still in active development. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the containing Test Case does not exist */
export interface GetProjectsHistoriesExecutionsStepsTestCasesRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A Execution id Required. */
  executionId: string;
  /** A Step id. Note: This step must include a TestExecutionStep. Required. */
  stepId: string;
  /** A Test Case id. Required. */
  testCaseId: string;
}

export const GetProjectsHistoriesExecutionsStepsTestCasesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  testCaseId: Schema.String.pipe(T.HttpPath("testCaseId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/testCases/{testCaseId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesExecutionsStepsTestCasesRequest>;

export type GetProjectsHistoriesExecutionsStepsTestCasesResponse = TestCase;
export const GetProjectsHistoriesExecutionsStepsTestCasesResponse = TestCase;

export type GetProjectsHistoriesExecutionsStepsTestCasesError = CommonErrors;

export const getProjectsHistoriesExecutionsStepsTestCases: API.OperationMethod<GetProjectsHistoriesExecutionsStepsTestCasesRequest, GetProjectsHistoriesExecutionsStepsTestCasesResponse, GetProjectsHistoriesExecutionsStepsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesExecutionsStepsTestCasesRequest,
  output: GetProjectsHistoriesExecutionsStepsTestCasesResponse,
  errors: [],
}));

/** Lists Test Cases attached to a Step. Experimental test cases API. Still in active development. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the containing Step does not exist */
export interface ListProjectsHistoriesExecutionsStepsTestCasesRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** A Execution id Required. */
  executionId: string;
  /** A Step id. Note: This step must include a TestExecutionStep. Required. */
  stepId: string;
  /** A continuation token to resume the query at the next item. Optional. */
  pageToken?: string;
  /** The maximum number of TestCases to fetch. Default value: 100. The server will use this default if the field is not set or has a value of 0. Optional. */
  pageSize?: number;
}

export const ListProjectsHistoriesExecutionsStepsTestCasesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/testCases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsStepsTestCasesRequest>;

export type ListProjectsHistoriesExecutionsStepsTestCasesResponse = ListTestCasesResponse;
export const ListProjectsHistoriesExecutionsStepsTestCasesResponse = ListTestCasesResponse;

export type ListProjectsHistoriesExecutionsStepsTestCasesError = CommonErrors;

export const listProjectsHistoriesExecutionsStepsTestCases = API.makePaginated(() => ({
  input: ListProjectsHistoriesExecutionsStepsTestCasesRequest,
  output: ListProjectsHistoriesExecutionsStepsTestCasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists thumbnails of images attached to a step. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read from the project, or from any of the images - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the step does not exist, or if any of the images do not exist */
export interface ListProjectsHistoriesExecutionsStepsThumbnailsRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** An Execution id. Required. */
  executionId: string;
  /** A Step id. Required. */
  stepId: string;
  /** A continuation token to resume the query at the next item. Optional. */
  pageToken?: string;
  /** The maximum number of thumbnails to fetch. Default value: 50. The server will use this default if the field is not set or has a value of 0. Optional. */
  pageSize?: number;
}

export const ListProjectsHistoriesExecutionsStepsThumbnailsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/thumbnails" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsStepsThumbnailsRequest>;

export type ListProjectsHistoriesExecutionsStepsThumbnailsResponse = ListStepThumbnailsResponse;
export const ListProjectsHistoriesExecutionsStepsThumbnailsResponse = ListStepThumbnailsResponse;

export type ListProjectsHistoriesExecutionsStepsThumbnailsError = CommonErrors;

export const listProjectsHistoriesExecutionsStepsThumbnails = API.makePaginated(() => ({
  input: ListProjectsHistoriesExecutionsStepsThumbnailsRequest,
  output: ListProjectsHistoriesExecutionsStepsThumbnailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a PerfMetricsSummary resource. Returns the existing one if it has already been created. May return any of the following error code(s): - NOT_FOUND - The containing Step does not exist */
export interface CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
  /** Request body */
  body?: PerfMetricsSummary;
}

export const CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  body: Schema.optional(PerfMetricsSummary).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfMetricsSummary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryRequest>;

export type CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryResponse = PerfMetricsSummary;
export const CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryResponse = PerfMetricsSummary;

export type CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryError = CommonErrors;

export const createProjectsHistoriesExecutionsStepsPerfMetricsSummary: API.OperationMethod<CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryRequest, CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryResponse, CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryRequest,
  output: CreateProjectsHistoriesExecutionsStepsPerfMetricsSummaryResponse,
  errors: [],
}));

/** Creates a PerfSampleSeries. May return any of the following error code(s): - ALREADY_EXISTS - PerfMetricSummary already exists for the given Step - NOT_FOUND - The containing Step does not exist */
export interface CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
  /** Request body */
  body?: PerfSampleSeries;
}

export const CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  body: Schema.optional(PerfSampleSeries).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest>;

export type CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse = PerfSampleSeries;
export const CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse = PerfSampleSeries;

export type CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesError = CommonErrors;

export const createProjectsHistoriesExecutionsStepsPerfSampleSeries: API.OperationMethod<CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest, CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse, CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest,
  output: CreateProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse,
  errors: [],
}));

/** Gets a PerfSampleSeries. May return any of the following error code(s): - NOT_FOUND - The specified PerfSampleSeries does not exist */
export interface GetProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
  /** A sample series id */
  sampleSeriesId: string;
}

export const GetProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  sampleSeriesId: Schema.String.pipe(T.HttpPath("sampleSeriesId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries/{sampleSeriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest>;

export type GetProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse = PerfSampleSeries;
export const GetProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse = PerfSampleSeries;

export type GetProjectsHistoriesExecutionsStepsPerfSampleSeriesError = CommonErrors;

export const getProjectsHistoriesExecutionsStepsPerfSampleSeries: API.OperationMethod<GetProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest, GetProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse, GetProjectsHistoriesExecutionsStepsPerfSampleSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest,
  output: GetProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse,
  errors: [],
}));

/** Lists PerfSampleSeries for a given Step. The request provides an optional filter which specifies one or more PerfMetricsType to include in the result; if none returns all. The resulting PerfSampleSeries are sorted by ids. May return any of the following canonical error codes: - NOT_FOUND - The containing Step does not exist */
export interface ListProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
  /** Specify one or more PerfMetricType values such as CPU to filter the result */
  filter?: "perfMetricTypeUnspecified" | "memory" | "cpu" | "network" | "graphics" | (string & {})[];
}

export const ListProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  filter: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest>;

export type ListProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse = ListPerfSampleSeriesResponse;
export const ListProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse = ListPerfSampleSeriesResponse;

export type ListProjectsHistoriesExecutionsStepsPerfSampleSeriesError = CommonErrors;

export const listProjectsHistoriesExecutionsStepsPerfSampleSeries: API.OperationMethod<ListProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest, ListProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse, ListProjectsHistoriesExecutionsStepsPerfSampleSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsHistoriesExecutionsStepsPerfSampleSeriesRequest,
  output: ListProjectsHistoriesExecutionsStepsPerfSampleSeriesResponse,
  errors: [],
}));

/** Creates a batch of PerfSamples - a client can submit multiple batches of Perf Samples through repeated calls to this method in order to split up a large request payload - duplicates and existing timestamp entries will be ignored. - the batch operation may partially succeed - the set of elements successfully inserted is returned in the response (omits items which already existed in the database). May return any of the following canonical error codes: - NOT_FOUND - The containing PerfSampleSeries does not exist */
export interface BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
  /** A sample series id */
  sampleSeriesId: string;
  /** Request body */
  body?: BatchCreatePerfSamplesRequest;
}

export const BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  sampleSeriesId: Schema.String.pipe(T.HttpPath("sampleSeriesId")),
  body: Schema.optional(BatchCreatePerfSamplesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries/{sampleSeriesId}/samples:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest>;

export type BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse = BatchCreatePerfSamplesResponse;
export const BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse = BatchCreatePerfSamplesResponse;

export type BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesError = CommonErrors;

export const batchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamples: API.OperationMethod<BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest, BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse, BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest,
  output: BatchCreateProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse,
  errors: [],
}));

/** Lists the Performance Samples of a given Sample Series - The list results are sorted by timestamps ascending - The default page size is 500 samples; and maximum size allowed 5000 - The response token indicates the last returned PerfSample timestamp - When the results size exceeds the page size, submit a subsequent request including the page token to return the rest of the samples up to the page limit May return any of the following canonical error codes: - OUT_OF_RANGE - The specified request page_token is out of valid range - NOT_FOUND - The containing PerfSampleSeries does not exist */
export interface ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest {
  /** The cloud project */
  projectId: string;
  /** A tool results history ID. */
  historyId: string;
  /** A tool results execution ID. */
  executionId: string;
  /** A tool results step ID. */
  stepId: string;
  /** A sample series id */
  sampleSeriesId: string;
  /** The default page size is 500 samples, and the maximum size is 5000. If the page_size is greater than 5000, the effective page size will be 5000 */
  pageSize?: number;
  /** Optional, the next_page_token returned in the previous response */
  pageToken?: string;
}

export const ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  stepId: Schema.String.pipe(T.HttpPath("stepId")),
  sampleSeriesId: Schema.String.pipe(T.HttpPath("sampleSeriesId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfSampleSeries/{sampleSeriesId}/samples" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest>;

export type ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse = ListPerfSamplesResponse;
export const ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse = ListPerfSamplesResponse;

export type ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesError = CommonErrors;

export const listProjectsHistoriesExecutionsStepsPerfSampleSeriesSamples = API.makePaginated(() => ({
  input: ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesRequest,
  output: ListProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a single screenshot cluster by its ID */
export interface GetProjectsHistoriesExecutionsClustersRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** An Execution id. Required. */
  executionId: string;
  /** A Cluster id Required. */
  clusterId: string;
}

export const GetProjectsHistoriesExecutionsClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/clusters/{clusterId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesExecutionsClustersRequest>;

export type GetProjectsHistoriesExecutionsClustersResponse = ScreenshotCluster;
export const GetProjectsHistoriesExecutionsClustersResponse = ScreenshotCluster;

export type GetProjectsHistoriesExecutionsClustersError = CommonErrors;

export const getProjectsHistoriesExecutionsClusters: API.OperationMethod<GetProjectsHistoriesExecutionsClustersRequest, GetProjectsHistoriesExecutionsClustersResponse, GetProjectsHistoriesExecutionsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesExecutionsClustersRequest,
  output: GetProjectsHistoriesExecutionsClustersResponse,
  errors: [],
}));

/** Lists Screenshot Clusters Returns the list of screenshot clusters corresponding to an execution. Screenshot clusters are created after the execution is finished. Clusters are created from a set of screenshots. Between any two screenshots, a matching score is calculated based off their metadata that determines how similar they are. Screenshots are placed in the cluster that has screens which have the highest matching scores. */
export interface ListProjectsHistoriesExecutionsClustersRequest {
  /** A Project id. Required. */
  projectId: string;
  /** A History id. Required. */
  historyId: string;
  /** An Execution id. Required. */
  executionId: string;
}

export const ListProjectsHistoriesExecutionsClustersRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsClustersRequest>;

export type ListProjectsHistoriesExecutionsClustersResponse = ListScreenshotClustersResponse;
export const ListProjectsHistoriesExecutionsClustersResponse = ListScreenshotClustersResponse;

export type ListProjectsHistoriesExecutionsClustersError = CommonErrors;

export const listProjectsHistoriesExecutionsClusters: API.OperationMethod<ListProjectsHistoriesExecutionsClustersRequest, ListProjectsHistoriesExecutionsClustersResponse, ListProjectsHistoriesExecutionsClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsHistoriesExecutionsClustersRequest,
  output: ListProjectsHistoriesExecutionsClustersResponse,
  errors: [],
}));

/** Gets an Environment. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the Environment does not exist */
export interface GetProjectsHistoriesExecutionsEnvironmentsRequest {
  /** Required. A Project id. */
  projectId: string;
  /** Required. A History id. */
  historyId: string;
  /** Required. An Execution id. */
  executionId: string;
  /** Required. An Environment id. */
  environmentId: string;
}

export const GetProjectsHistoriesExecutionsEnvironmentsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  environmentId: Schema.String.pipe(T.HttpPath("environmentId")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/environments/{environmentId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsHistoriesExecutionsEnvironmentsRequest>;

export type GetProjectsHistoriesExecutionsEnvironmentsResponse = Environment;
export const GetProjectsHistoriesExecutionsEnvironmentsResponse = Environment;

export type GetProjectsHistoriesExecutionsEnvironmentsError = CommonErrors;

export const getProjectsHistoriesExecutionsEnvironments: API.OperationMethod<GetProjectsHistoriesExecutionsEnvironmentsRequest, GetProjectsHistoriesExecutionsEnvironmentsResponse, GetProjectsHistoriesExecutionsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsHistoriesExecutionsEnvironmentsRequest,
  output: GetProjectsHistoriesExecutionsEnvironmentsResponse,
  errors: [],
}));

/** Lists Environments for a given Execution. The Environments are sorted by display name. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the containing Execution does not exist */
export interface ListProjectsHistoriesExecutionsEnvironmentsRequest {
  /** Required. A Project id. */
  projectId: string;
  /** Required. A History id. */
  historyId: string;
  /** Required. An Execution id. */
  executionId: string;
  /** A continuation token to resume the query at the next item. */
  pageToken?: string;
  /** The maximum number of Environments to fetch. Default value: 25. The server will use this default if the field is not set or has a value of 0. */
  pageSize?: number;
}

export const ListProjectsHistoriesExecutionsEnvironmentsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  historyId: Schema.String.pipe(T.HttpPath("historyId")),
  executionId: Schema.String.pipe(T.HttpPath("executionId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsHistoriesExecutionsEnvironmentsRequest>;

export type ListProjectsHistoriesExecutionsEnvironmentsResponse = ListEnvironmentsResponse;
export const ListProjectsHistoriesExecutionsEnvironmentsResponse = ListEnvironmentsResponse;

export type ListProjectsHistoriesExecutionsEnvironmentsError = CommonErrors;

export const listProjectsHistoriesExecutionsEnvironments = API.makePaginated(() => ({
  input: ListProjectsHistoriesExecutionsEnvironmentsRequest,
  output: ListProjectsHistoriesExecutionsEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

