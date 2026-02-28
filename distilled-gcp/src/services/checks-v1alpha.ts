// ==========================================================================
// Checks API (checks v1alpha)
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
  name: "checks",
  version: "v1alpha",
  rootUrl: "https://checks.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleChecksAccountV1alphaApp {
  /** The resource name of the app. Example: `accounts/123/apps/456` */
  name?: string;
  /** The app's title. */
  title?: string;
}

export const GoogleChecksAccountV1alphaApp: Schema.Schema<GoogleChecksAccountV1alphaApp> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksAccountV1alphaApp" }) as any as Schema.Schema<GoogleChecksAccountV1alphaApp>;

export interface GoogleChecksAccountV1alphaListAppsResponse {
  /** The apps. */
  apps?: Array<GoogleChecksAccountV1alphaApp>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleChecksAccountV1alphaListAppsResponse: Schema.Schema<GoogleChecksAccountV1alphaListAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(GoogleChecksAccountV1alphaApp)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksAccountV1alphaListAppsResponse" }) as any as Schema.Schema<GoogleChecksAccountV1alphaListAppsResponse>;

export interface GoogleChecksAisafetyV1alphaTextInput {
  /** Actual piece of text to be classified. */
  content?: string;
  /** Optional. Language of the text in ISO 639-1 format. If the language is invalid or not specified, the system will try to detect it. */
  languageCode?: string;
}

export const GoogleChecksAisafetyV1alphaTextInput: Schema.Schema<GoogleChecksAisafetyV1alphaTextInput> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaTextInput" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaTextInput>;

export interface GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent {
  /** Content in text format. */
  textInput?: GoogleChecksAisafetyV1alphaTextInput;
}

export const GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent: Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent> = Schema.suspend(() => Schema.Struct({
  textInput: Schema.optional(GoogleChecksAisafetyV1alphaTextInput),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent>;

export interface GoogleChecksAisafetyV1alphaClassifyContentRequestContext {
  /** Optional. Prompt that generated the model response. */
  prompt?: string;
}

export const GoogleChecksAisafetyV1alphaClassifyContentRequestContext: Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequestContext> = Schema.suspend(() => Schema.Struct({
  prompt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaClassifyContentRequestContext" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequestContext>;

export interface GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig {
  /** Required. Type of the policy. */
  policyType?: "POLICY_TYPE_UNSPECIFIED" | "DANGEROUS_CONTENT" | "PII_SOLICITING_RECITING" | "HARASSMENT" | "SEXUALLY_EXPLICIT" | "HATE_SPEECH" | "MEDICAL_INFO" | "VIOLENCE_AND_GORE" | "OBSCENITY_AND_PROFANITY" | (string & {});
  /** Optional. Score threshold to use when deciding if the content is violative or non-violative. If not specified, the default 0.5 threshold for the policy will be used. */
  threshold?: number;
}

export const GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig: Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig> = Schema.suspend(() => Schema.Struct({
  policyType: Schema.optional(Schema.String),
  threshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig>;

export interface GoogleChecksAisafetyV1alphaClassifyContentRequest {
  /** Required. Content to be classified. */
  input?: GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent;
  /** Optional. Context about the input that will be used to help on the classification. */
  context?: GoogleChecksAisafetyV1alphaClassifyContentRequestContext;
  /** Required. List of policies to classify against. */
  policies?: Array<GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig>;
  /** Optional. Version of the classifier to use. If not specified, the latest version will be used. */
  classifierVersion?: "CLASSIFIER_VERSION_UNSPECIFIED" | "STABLE" | "LATEST" | (string & {});
}

export const GoogleChecksAisafetyV1alphaClassifyContentRequest: Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequest> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(GoogleChecksAisafetyV1alphaClassifyContentRequestInputContent),
  context: Schema.optional(GoogleChecksAisafetyV1alphaClassifyContentRequestContext),
  policies: Schema.optional(Schema.Array(GoogleChecksAisafetyV1alphaClassifyContentRequestPolicyConfig)),
  classifierVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaClassifyContentRequest" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentRequest>;

export interface GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult {
  /** Type of the policy. */
  policyType?: "POLICY_TYPE_UNSPECIFIED" | "DANGEROUS_CONTENT" | "PII_SOLICITING_RECITING" | "HARASSMENT" | "SEXUALLY_EXPLICIT" | "HATE_SPEECH" | "MEDICAL_INFO" | "VIOLENCE_AND_GORE" | "OBSCENITY_AND_PROFANITY" | (string & {});
  /** Final score for the results of this policy. */
  score?: number;
  /** Result of the classification for the policy. */
  violationResult?: "VIOLATION_RESULT_UNSPECIFIED" | "VIOLATIVE" | "NON_VIOLATIVE" | "CLASSIFICATION_ERROR" | (string & {});
}

export const GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult: Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult> = Schema.suspend(() => Schema.Struct({
  policyType: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  violationResult: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult>;

export interface GoogleChecksAisafetyV1alphaClassifyContentResponse {
  /** Results of the classification for each policy. */
  policyResults?: Array<GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult>;
}

export const GoogleChecksAisafetyV1alphaClassifyContentResponse: Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentResponse> = Schema.suspend(() => Schema.Struct({
  policyResults: Schema.optional(Schema.Array(GoogleChecksAisafetyV1alphaClassifyContentResponsePolicyResult)),
})).annotate({ identifier: "GoogleChecksAisafetyV1alphaClassifyContentResponse" }) as any as Schema.Schema<GoogleChecksAisafetyV1alphaClassifyContentResponse>;

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

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface WaitOperationRequest {
  /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
  timeout?: string;
}

export const WaitOperationRequest: Schema.Schema<WaitOperationRequest> = Schema.suspend(() => Schema.Struct({
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "WaitOperationRequest" }) as any as Schema.Schema<WaitOperationRequest>;

export interface GoogleChecksRepoScanV1alphaCodeAttribution {
  /** Required. Path of the file. */
  path?: string;
  /** Required. Line number (1-based). */
  lineNumber?: number;
  /** Optional. Code excerpt where the source was detected along with surrounding code. */
  codeExcerpt?: string;
  /** Optional. Start line number of the code excerpt (1-based). */
  startLineNumber?: number;
}

export const GoogleChecksRepoScanV1alphaCodeAttribution: Schema.Schema<GoogleChecksRepoScanV1alphaCodeAttribution> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  lineNumber: Schema.optional(Schema.Number),
  codeExcerpt: Schema.optional(Schema.String),
  startLineNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaCodeAttribution" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaCodeAttribution>;

export interface GoogleChecksRepoScanV1alphaSource {
  /** Required. Data type. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "DATA_TYPE_APPROXIMATE_LOCATION" | "DATA_TYPE_PRECISE_LOCATION" | "DATA_TYPE_PERSONAL_NAME" | "DATA_TYPE_EMAIL_ADDRESS" | "DATA_TYPE_USER_IDS" | "DATA_TYPE_PHYSICAL_ADDRESS" | "DATA_TYPE_PHONE_NUMBER" | "DATA_TYPE_RACE_AND_ETHNICITY" | "DATA_TYPE_POLITICAL_OR_RELIGIOUS_BELIEFS" | "DATA_TYPE_SEXUAL_ORIENTATION" | "DATA_TYPE_OTHER_PERSONAL_INFO" | "DATA_TYPE_PAYMENT_INFO" | "DATA_TYPE_PURCHASE_HISTORY" | "DATA_TYPE_CREDIT_SCORE" | "DATA_TYPE_OTHER_FINANCIAL_INFO" | "DATA_TYPE_HEALTH_INFO" | "DATA_TYPE_FITNESS_INFO" | "DATA_TYPE_EMAILS" | "DATA_TYPE_TEXT_MESSAGES" | "DATA_TYPE_OTHER_IN_APP_MESSAGES" | "DATA_TYPE_PHOTOS" | "DATA_TYPE_VIDEOS" | "DATA_TYPE_VOICE_OR_SOUND_RECORDINGS" | "DATA_TYPE_MUSIC_FILES" | "DATA_TYPE_OTHER_AUDIO_FILES" | "DATA_TYPE_FILES_AND_DOCS" | "DATA_TYPE_CALENDAR_EVENTS" | "DATA_TYPE_CONTACTS" | "DATA_TYPE_APP_INTERACTIONS" | "DATA_TYPE_IN_APP_SEARCH_HISTORY" | "DATA_TYPE_INSTALLED_APPS" | "DATA_TYPE_OTHER_USER_GENERATED_CONTENT" | "DATA_TYPE_OTHER_ACTIONS" | "DATA_TYPE_WEB_BROWSING_HISTORY" | "DATA_TYPE_CRASH_LOGS" | "DATA_TYPE_PERFORMANCE_DIAGNOSTICS" | "DATA_TYPE_OTHER_APP_PERFORMANCE_DATA" | "DATA_TYPE_DEVICE_OR_OTHER_IDS" | (string & {});
  /** Optional. Source code attribution for the finding. */
  codeAttribution?: GoogleChecksRepoScanV1alphaCodeAttribution;
  /** Optional. Whether the finding was marked as a false positive. */
  falsePositive?: boolean;
}

export const GoogleChecksRepoScanV1alphaSource: Schema.Schema<GoogleChecksRepoScanV1alphaSource> = Schema.suspend(() => Schema.Struct({
  dataType: Schema.optional(Schema.String),
  codeAttribution: Schema.optional(GoogleChecksRepoScanV1alphaCodeAttribution),
  falsePositive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaSource" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaSource>;

export interface GoogleChecksRepoScanV1alphaSourceCode {
  /** Required. Source code. */
  code?: string;
  /** Required. Path of the file. */
  path?: string;
  /** Required. Start line number (1-based). */
  startLine?: number;
  /** Required. End line number (1-based). */
  endLine?: number;
}

export const GoogleChecksRepoScanV1alphaSourceCode: Schema.Schema<GoogleChecksRepoScanV1alphaSourceCode> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  startLine: Schema.optional(Schema.Number),
  endLine: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaSourceCode" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaSourceCode>;

export interface GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification {
  /** Required. Candidate data type. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "DATA_TYPE_APPROXIMATE_LOCATION" | "DATA_TYPE_PRECISE_LOCATION" | "DATA_TYPE_PERSONAL_NAME" | "DATA_TYPE_EMAIL_ADDRESS" | "DATA_TYPE_USER_IDS" | "DATA_TYPE_PHYSICAL_ADDRESS" | "DATA_TYPE_PHONE_NUMBER" | "DATA_TYPE_RACE_AND_ETHNICITY" | "DATA_TYPE_POLITICAL_OR_RELIGIOUS_BELIEFS" | "DATA_TYPE_SEXUAL_ORIENTATION" | "DATA_TYPE_OTHER_PERSONAL_INFO" | "DATA_TYPE_PAYMENT_INFO" | "DATA_TYPE_PURCHASE_HISTORY" | "DATA_TYPE_CREDIT_SCORE" | "DATA_TYPE_OTHER_FINANCIAL_INFO" | "DATA_TYPE_HEALTH_INFO" | "DATA_TYPE_FITNESS_INFO" | "DATA_TYPE_EMAILS" | "DATA_TYPE_TEXT_MESSAGES" | "DATA_TYPE_OTHER_IN_APP_MESSAGES" | "DATA_TYPE_PHOTOS" | "DATA_TYPE_VIDEOS" | "DATA_TYPE_VOICE_OR_SOUND_RECORDINGS" | "DATA_TYPE_MUSIC_FILES" | "DATA_TYPE_OTHER_AUDIO_FILES" | "DATA_TYPE_FILES_AND_DOCS" | "DATA_TYPE_CALENDAR_EVENTS" | "DATA_TYPE_CONTACTS" | "DATA_TYPE_APP_INTERACTIONS" | "DATA_TYPE_IN_APP_SEARCH_HISTORY" | "DATA_TYPE_INSTALLED_APPS" | "DATA_TYPE_OTHER_USER_GENERATED_CONTENT" | "DATA_TYPE_OTHER_ACTIONS" | "DATA_TYPE_WEB_BROWSING_HISTORY" | "DATA_TYPE_CRASH_LOGS" | "DATA_TYPE_PERFORMANCE_DIAGNOSTICS" | "DATA_TYPE_OTHER_APP_PERFORMANCE_DATA" | "DATA_TYPE_DEVICE_OR_OTHER_IDS" | (string & {});
  /** Required. Line number (1-based). */
  lineNumber?: number;
}

export const GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification: Schema.Schema<GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification> = Schema.suspend(() => Schema.Struct({
  dataType: Schema.optional(Schema.String),
  lineNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification>;

export interface GoogleChecksRepoScanV1alphaCodeScan {
  /** Required. Source code to analyze. */
  sourceCode?: GoogleChecksRepoScanV1alphaSourceCode;
  /** Optional. Data type classification requests. */
  dataTypeClassifications?: Array<GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification>;
}

export const GoogleChecksRepoScanV1alphaCodeScan: Schema.Schema<GoogleChecksRepoScanV1alphaCodeScan> = Schema.suspend(() => Schema.Struct({
  sourceCode: Schema.optional(GoogleChecksRepoScanV1alphaSourceCode),
  dataTypeClassifications: Schema.optional(Schema.Array(GoogleChecksRepoScanV1alphaCodeScanDataTypeClassification)),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaCodeScan" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaCodeScan>;

export interface GoogleChecksRepoScanV1alphaCliAnalysis {
  /** Optional. Data sources detected in the scan. */
  sources?: Array<GoogleChecksRepoScanV1alphaSource>;
  /** Optional. Requested code scans resulting from preliminary CLI analysis. */
  codeScans?: Array<GoogleChecksRepoScanV1alphaCodeScan>;
}

export const GoogleChecksRepoScanV1alphaCliAnalysis: Schema.Schema<GoogleChecksRepoScanV1alphaCliAnalysis> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(GoogleChecksRepoScanV1alphaSource)),
  codeScans: Schema.optional(Schema.Array(GoogleChecksRepoScanV1alphaCodeScan)),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaCliAnalysis" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaCliAnalysis>;

export interface GoogleChecksRepoScanV1alphaPullRequest {
  /** Required. This can be supplied by the user or parsed automatically from predefined CI environment variables. */
  prNumber?: string;
  /** Required. For PR analysis, we compare against the most recent scan of the base branch to highlight new issues. */
  baseBranch?: string;
}

export const GoogleChecksRepoScanV1alphaPullRequest: Schema.Schema<GoogleChecksRepoScanV1alphaPullRequest> = Schema.suspend(() => Schema.Struct({
  prNumber: Schema.optional(Schema.String),
  baseBranch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaPullRequest" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaPullRequest>;

export interface GoogleChecksRepoScanV1alphaScmMetadata {
  /** Required. Revision ID, e.g. Git commit hash. */
  revisionId?: string;
  /** Required. Branch name. */
  branch?: string;
  /** Required. Git remote URL. */
  remoteUri?: string;
  /** Optional. Contains info about the associated pull request. This is only populated for pull request scans. */
  pullRequest?: GoogleChecksRepoScanV1alphaPullRequest;
}

export const GoogleChecksRepoScanV1alphaScmMetadata: Schema.Schema<GoogleChecksRepoScanV1alphaScmMetadata> = Schema.suspend(() => Schema.Struct({
  revisionId: Schema.optional(Schema.String),
  branch: Schema.optional(Schema.String),
  remoteUri: Schema.optional(Schema.String),
  pullRequest: Schema.optional(GoogleChecksRepoScanV1alphaPullRequest),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaScmMetadata" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaScmMetadata>;

export interface GoogleChecksRepoScanV1alphaGenerateScanRequest {
  /** Required. CLI analysis results. */
  cliAnalysis?: GoogleChecksRepoScanV1alphaCliAnalysis;
  /** Required. Local scan path. */
  localScanPath?: string;
  /** Required. CLI version. */
  cliVersion?: string;
  /** Required. SCM metadata. */
  scmMetadata?: GoogleChecksRepoScanV1alphaScmMetadata;
}

export const GoogleChecksRepoScanV1alphaGenerateScanRequest: Schema.Schema<GoogleChecksRepoScanV1alphaGenerateScanRequest> = Schema.suspend(() => Schema.Struct({
  cliAnalysis: Schema.optional(GoogleChecksRepoScanV1alphaCliAnalysis),
  localScanPath: Schema.optional(Schema.String),
  cliVersion: Schema.optional(Schema.String),
  scmMetadata: Schema.optional(GoogleChecksRepoScanV1alphaScmMetadata),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaGenerateScanRequest" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaGenerateScanRequest>;

export interface GoogleChecksRepoScanV1alphaRepoScan {
  /** Identifier. Resource name of the scan. */
  name?: string;
  /** A URL to view results. */
  resultsUri?: string;
  /** Local scan path. */
  localScanPath?: string;
  /** CLI version. */
  cliVersion?: string;
  /** Data sources detected. */
  sources?: Array<GoogleChecksRepoScanV1alphaSource>;
  /** SCM metadata. */
  scmMetadata?: GoogleChecksRepoScanV1alphaScmMetadata;
}

export const GoogleChecksRepoScanV1alphaRepoScan: Schema.Schema<GoogleChecksRepoScanV1alphaRepoScan> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resultsUri: Schema.optional(Schema.String),
  localScanPath: Schema.optional(Schema.String),
  cliVersion: Schema.optional(Schema.String),
  sources: Schema.optional(Schema.Array(GoogleChecksRepoScanV1alphaSource)),
  scmMetadata: Schema.optional(GoogleChecksRepoScanV1alphaScmMetadata),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaRepoScan" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaRepoScan>;

export interface GoogleChecksRepoScanV1alphaListRepoScansResponse {
  /** The repo scans for the specified app. */
  repoScans?: Array<GoogleChecksRepoScanV1alphaRepoScan>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleChecksRepoScanV1alphaListRepoScansResponse: Schema.Schema<GoogleChecksRepoScanV1alphaListRepoScansResponse> = Schema.suspend(() => Schema.Struct({
  repoScans: Schema.optional(Schema.Array(GoogleChecksRepoScanV1alphaRepoScan)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksRepoScanV1alphaListRepoScansResponse" }) as any as Schema.Schema<GoogleChecksRepoScanV1alphaListRepoScansResponse>;

export interface GoogleChecksReportV1alphaAnalyzeUploadRequest {
  /** Optional. Git commit hash or changelist number associated with the upload. */
  codeReferenceId?: string;
  /** Optional. The type of the uploaded app binary. If not provided, the server assumes APK file for Android and IPA file for iOS. */
  appBinaryFileType?: "APP_BINARY_FILE_TYPE_UNSPECIFIED" | "ANDROID_APK" | "ANDROID_AAB" | "IOS_IPA" | (string & {});
}

export const GoogleChecksReportV1alphaAnalyzeUploadRequest: Schema.Schema<GoogleChecksReportV1alphaAnalyzeUploadRequest> = Schema.suspend(() => Schema.Struct({
  codeReferenceId: Schema.optional(Schema.String),
  appBinaryFileType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaAnalyzeUploadRequest" }) as any as Schema.Schema<GoogleChecksReportV1alphaAnalyzeUploadRequest>;

export interface GoogleChecksReportV1alphaAppBundle {
  /** Unique id of the bundle. For example: "com.google.Gmail". */
  bundleId?: string;
  /** The user-visible version of the bundle such as the Android `versionName` or iOS `CFBundleShortVersionString`. For example: "7.21.1". */
  version?: string;
  /** The version used throughout the operating system and store to identify the build such as the Android `versionCode` or iOS `CFBundleVersion`. */
  versionId?: string;
  /** Identifies the type of release. */
  releaseType?: "APP_BUNDLE_RELEASE_TYPE_UNSPECIFIED" | "PUBLIC" | "PRE_RELEASE" | (string & {});
  /** Git commit hash or changelist number associated with the release. */
  codeReferenceId?: string;
}

export const GoogleChecksReportV1alphaAppBundle: Schema.Schema<GoogleChecksReportV1alphaAppBundle> = Schema.suspend(() => Schema.Struct({
  bundleId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  versionId: Schema.optional(Schema.String),
  releaseType: Schema.optional(Schema.String),
  codeReferenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaAppBundle" }) as any as Schema.Schema<GoogleChecksReportV1alphaAppBundle>;

export interface GoogleChecksReportV1alphaCheckStateMetadata {
  /** The time when the check first started failing. */
  firstFailingTime?: string;
  /** The last time the check failed. */
  lastFailingTime?: string;
  /** Indicators related to the check state. */
  badges?: Array<"CHECK_STATE_BADGE_UNSPECIFIED" | "NEWLY_FAILING" | "RECENTLY_FAILING" | "RESOLVED" | (string & {})>;
}

export const GoogleChecksReportV1alphaCheckStateMetadata: Schema.Schema<GoogleChecksReportV1alphaCheckStateMetadata> = Schema.suspend(() => Schema.Struct({
  firstFailingTime: Schema.optional(Schema.String),
  lastFailingTime: Schema.optional(Schema.String),
  badges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckStateMetadata" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckStateMetadata>;

export interface GoogleChecksReportV1alphaCheckCitation {
  /** Citation type. */
  type?: "CITATION_TYPE_UNSPECIFIED" | "COPPA" | "GDPR" | "FERPA" | "CAL_OPPA" | "CCPA" | "SOPIPA" | "LGPD" | "CPRA" | "VCDPA" | "GOOGLE_PLAY_POLICY" | "APP_STORE_POLICY" | "CPA" | "CTDPA" | "UCPA" | "PIPEDA" | "ALBERTA_PIPA" | "QUEBEC_ACT" | "QUEBEC_BILL_64" | "CHINA_PIPL" | "SOUTH_KOREA_PIPA" | "SOUTH_AFRICA_POPIA" | "JAPAN_APPI" | "INDIA_DPDPA" | "OCPA" | "TDPSA" | "MCDPA" | (string & {});
}

export const GoogleChecksReportV1alphaCheckCitation: Schema.Schema<GoogleChecksReportV1alphaCheckCitation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckCitation" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckCitation>;

export interface GoogleChecksReportV1alphaPolicyFragment {
  /** Policy URL. */
  sourceUri?: string;
  /** HTML content. */
  htmlContent?: string;
}

export const GoogleChecksReportV1alphaPolicyFragment: Schema.Schema<GoogleChecksReportV1alphaPolicyFragment> = Schema.suspend(() => Schema.Struct({
  sourceUri: Schema.optional(Schema.String),
  htmlContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaPolicyFragment" }) as any as Schema.Schema<GoogleChecksReportV1alphaPolicyFragment>;

export interface GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence {
  /** The privacy policy fragment that was used during the check. */
  policyFragment?: GoogleChecksReportV1alphaPolicyFragment;
}

export const GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence> = Schema.suspend(() => Schema.Struct({
  policyFragment: Schema.optional(GoogleChecksReportV1alphaPolicyFragment),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence>;

export interface GoogleChecksReportV1alphaEndpoint {
  /** Domain name (e.g. ads.google.com). */
  domain?: string;
}

export const GoogleChecksReportV1alphaEndpoint: Schema.Schema<GoogleChecksReportV1alphaEndpoint> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaEndpoint" }) as any as Schema.Schema<GoogleChecksReportV1alphaEndpoint>;

export interface GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails {
  /** Endpoint the data type was sent to. */
  endpoint?: GoogleChecksReportV1alphaEndpoint;
}

export const GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails: Schema.Schema<GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails> = Schema.suspend(() => Schema.Struct({
  endpoint: Schema.optional(GoogleChecksReportV1alphaEndpoint),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails>;

export interface GoogleChecksReportV1alphaSdk {
  /** SDK identifier. */
  id?: string;
}

export const GoogleChecksReportV1alphaSdk: Schema.Schema<GoogleChecksReportV1alphaSdk> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaSdk" }) as any as Schema.Schema<GoogleChecksReportV1alphaSdk>;

export interface GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk {
  /** SDK that is attributed to the exfiltration. */
  sdk?: GoogleChecksReportV1alphaSdk;
}

export const GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk: Schema.Schema<GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk> = Schema.suspend(() => Schema.Struct({
  sdk: Schema.optional(GoogleChecksReportV1alphaSdk),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk>;

export interface GoogleChecksReportV1alphaDataTypeEndpointEvidence {
  /** Type of data that was exfiltrated. */
  exfiltratedDataType?: "EXFILTRATED_DATA_TYPE_UNSPECIFIED" | "EXFILTRATED_DATA_TYPE_PHONE_NUMBER" | "EXFILTRATED_DATA_TYPE_PRECISE_LOCATION" | "EXFILTRATED_DATA_TYPE_CONTACT_NAME" | "EXFILTRATED_DATA_TYPE_CONTACT_EMAIL" | "EXFILTRATED_DATA_TYPE_CONTACT_PHONE_NUMBER" | "EXFILTRATED_DATA_TYPE_INCOMING_TEXT_NUMBER" | "EXFILTRATED_DATA_TYPE_INCOMING_TEXT_MESSAGE" | "EXFILTRATED_DATA_TYPE_OUTGOING_TEXT_NUMBER" | "EXFILTRATED_DATA_TYPE_OUTGOING_TEXT_MESSAGE" | "EXFILTRATED_DATA_TYPE_ADVERTISING_ID" | "EXFILTRATED_DATA_TYPE_ANDROID_ID" | "EXFILTRATED_DATA_TYPE_IMEI" | "EXFILTRATED_DATA_TYPE_IMSI" | "EXFILTRATED_DATA_TYPE_SIM_SERIAL_NUMBER" | "EXFILTRATED_DATA_TYPE_SSID" | "EXFILTRATED_DATA_TYPE_ACCOUNT" | "EXFILTRATED_DATA_TYPE_EXTERNAL_ACCOUNT" | "EXFILTRATED_DATA_TYPE_INSTALLED_PACKAGES" | (string & {});
  /** Endpoints the data type was sent to. */
  endpointDetails?: Array<GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails>;
  /** Set of SDKs that are attributed to the exfiltration. */
  attributedSdks?: Array<GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk>;
}

export const GoogleChecksReportV1alphaDataTypeEndpointEvidence: Schema.Schema<GoogleChecksReportV1alphaDataTypeEndpointEvidence> = Schema.suspend(() => Schema.Struct({
  exfiltratedDataType: Schema.optional(Schema.String),
  endpointDetails: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataTypeEndpointEvidenceEndpointDetails)),
  attributedSdks: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataTypeEndpointEvidenceAttributedSdk)),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataTypeEndpointEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataTypeEndpointEvidence>;

export interface GoogleChecksReportV1alphaPermission {
  /** Permission identifier. */
  id?: string;
}

export const GoogleChecksReportV1alphaPermission: Schema.Schema<GoogleChecksReportV1alphaPermission> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaPermission" }) as any as Schema.Schema<GoogleChecksReportV1alphaPermission>;

export interface GoogleChecksReportV1alphaDataTypePermissionEvidence {
  /** Permission declared by your app. */
  permission?: GoogleChecksReportV1alphaPermission;
}

export const GoogleChecksReportV1alphaDataTypePermissionEvidence: Schema.Schema<GoogleChecksReportV1alphaDataTypePermissionEvidence> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(GoogleChecksReportV1alphaPermission),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataTypePermissionEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataTypePermissionEvidence>;

export interface GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence {
  /** The privacy policy fragment that implies collection of the data type. */
  policyFragment?: GoogleChecksReportV1alphaPolicyFragment;
}

export const GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence: Schema.Schema<GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence> = Schema.suspend(() => Schema.Struct({
  policyFragment: Schema.optional(GoogleChecksReportV1alphaPolicyFragment),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence>;

export interface GoogleChecksReportV1alphaDataTypeEvidence {
  /** List of endpoints the data type was sent to. */
  endpoints?: Array<GoogleChecksReportV1alphaDataTypeEndpointEvidence>;
  /** List of included permissions that imply collection of the data type. */
  permissions?: Array<GoogleChecksReportV1alphaDataTypePermissionEvidence>;
  /** List of privacy policy texts that imply collection of the data type. */
  privacyPolicyTexts?: Array<GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence>;
}

export const GoogleChecksReportV1alphaDataTypeEvidence: Schema.Schema<GoogleChecksReportV1alphaDataTypeEvidence> = Schema.suspend(() => Schema.Struct({
  endpoints: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataTypeEndpointEvidence)),
  permissions: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataTypePermissionEvidence)),
  privacyPolicyTexts: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataTypePrivacyPolicyTextEvidence)),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataTypeEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataTypeEvidence>;

export interface GoogleChecksReportV1alphaCheckDataTypeEvidence {
  /** The data type that was found in your app. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "DATA_TYPE_APPROXIMATE_LOCATION" | "DATA_TYPE_PRECISE_LOCATION" | "DATA_TYPE_PERSONAL_NAME" | "DATA_TYPE_EMAIL_ADDRESS" | "DATA_TYPE_USER_IDS" | "DATA_TYPE_PHYSICAL_ADDRESS" | "DATA_TYPE_PHONE_NUMBER" | "DATA_TYPE_RACE_AND_ETHNICITY" | "DATA_TYPE_POLITICAL_OR_RELIGIOUS_BELIEFS" | "DATA_TYPE_SEXUAL_ORIENTATION" | "DATA_TYPE_OTHER_PERSONAL_INFO" | "DATA_TYPE_PAYMENT_INFO" | "DATA_TYPE_PURCHASE_HISTORY" | "DATA_TYPE_CREDIT_SCORE" | "DATA_TYPE_OTHER_FINANCIAL_INFO" | "DATA_TYPE_HEALTH_INFO" | "DATA_TYPE_FITNESS_INFO" | "DATA_TYPE_EMAILS" | "DATA_TYPE_TEXT_MESSAGES" | "DATA_TYPE_OTHER_IN_APP_MESSAGES" | "DATA_TYPE_PHOTOS" | "DATA_TYPE_VIDEOS" | "DATA_TYPE_VOICE_OR_SOUND_RECORDINGS" | "DATA_TYPE_MUSIC_FILES" | "DATA_TYPE_OTHER_AUDIO_FILES" | "DATA_TYPE_FILES_AND_DOCS" | "DATA_TYPE_CALENDAR_EVENTS" | "DATA_TYPE_CONTACTS" | "DATA_TYPE_APP_INTERACTIONS" | "DATA_TYPE_IN_APP_SEARCH_HISTORY" | "DATA_TYPE_INSTALLED_APPS" | "DATA_TYPE_OTHER_USER_GENERATED_CONTENT" | "DATA_TYPE_OTHER_ACTIONS" | "DATA_TYPE_WEB_BROWSING_HISTORY" | "DATA_TYPE_CRASH_LOGS" | "DATA_TYPE_PERFORMANCE_DIAGNOSTICS" | "DATA_TYPE_OTHER_APP_PERFORMANCE_DATA" | "DATA_TYPE_DEVICE_OR_OTHER_IDS" | (string & {});
  /** Evidence collected about the data type. */
  dataTypeEvidence?: GoogleChecksReportV1alphaDataTypeEvidence;
}

export const GoogleChecksReportV1alphaCheckDataTypeEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckDataTypeEvidence> = Schema.suspend(() => Schema.Struct({
  dataType: Schema.optional(Schema.String),
  dataTypeEvidence: Schema.optional(GoogleChecksReportV1alphaDataTypeEvidence),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckDataTypeEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckDataTypeEvidence>;

export interface GoogleChecksReportV1alphaCheckEndpointEvidence {
  /** The endpoint that was contacted by your app. */
  endpoint?: GoogleChecksReportV1alphaEndpoint;
}

export const GoogleChecksReportV1alphaCheckEndpointEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckEndpointEvidence> = Schema.suspend(() => Schema.Struct({
  endpoint: Schema.optional(GoogleChecksReportV1alphaEndpoint),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckEndpointEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckEndpointEvidence>;

export interface GoogleChecksReportV1alphaCheckPermissionEvidence {
  /** The permission that was found in your app. */
  permission?: GoogleChecksReportV1alphaPermission;
}

export const GoogleChecksReportV1alphaCheckPermissionEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckPermissionEvidence> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(GoogleChecksReportV1alphaPermission),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckPermissionEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckPermissionEvidence>;

export interface GoogleChecksReportV1alphaCheckSdkEvidence {
  /** The SDK that was found in your app. */
  sdk?: GoogleChecksReportV1alphaSdk;
}

export const GoogleChecksReportV1alphaCheckSdkEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckSdkEvidence> = Schema.suspend(() => Schema.Struct({
  sdk: Schema.optional(GoogleChecksReportV1alphaSdk),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckSdkEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckSdkEvidence>;

export interface GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo {
  /** The URL contacted by your app. This includes the protocol, domain, and URL parameters. */
  uri?: string;
}

export const GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo: Schema.Schema<GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo>;

export interface GoogleChecksReportV1alphaCheckDataSecurityEvidence {
  /** Evidence related to data in transit. */
  dataInTransitInfo?: Array<GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo>;
}

export const GoogleChecksReportV1alphaCheckDataSecurityEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckDataSecurityEvidence> = Schema.suspend(() => Schema.Struct({
  dataInTransitInfo: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckDataSecurityEvidenceDataInTransitInfo)),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckDataSecurityEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckDataSecurityEvidence>;

export interface GoogleChecksReportV1alphaCheckSdkIssueEvidence {
  /** The SDK with an issue. */
  sdk?: GoogleChecksReportV1alphaSdk;
  /** The SDK version. */
  sdkVersion?: string;
}

export const GoogleChecksReportV1alphaCheckSdkIssueEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckSdkIssueEvidence> = Schema.suspend(() => Schema.Struct({
  sdk: Schema.optional(GoogleChecksReportV1alphaSdk),
  sdkVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckSdkIssueEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckSdkIssueEvidence>;

export interface GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails {
  /** The endpoint in violation. */
  endpoint?: GoogleChecksReportV1alphaEndpoint;
}

export const GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails: Schema.Schema<GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails> = Schema.suspend(() => Schema.Struct({
  endpoint: Schema.optional(GoogleChecksReportV1alphaEndpoint),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails>;

export interface GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence {
  /** Endpoints in violation. */
  endpointDetails?: Array<GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails>;
}

export const GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence> = Schema.suspend(() => Schema.Struct({
  endpointDetails: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidenceEndpointDetails)),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence>;

export interface GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails {
  /** The permission in violation. */
  permission?: GoogleChecksReportV1alphaPermission;
}

export const GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails: Schema.Schema<GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(GoogleChecksReportV1alphaPermission),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails>;

export interface GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence {
  /** Permissions in violation. */
  permissionDetails?: Array<GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails>;
}

export const GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence> = Schema.suspend(() => Schema.Struct({
  permissionDetails: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidencePermissionDetails)),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence>;

export interface GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails {
  /** The SDK in violation. */
  sdk?: GoogleChecksReportV1alphaSdk;
}

export const GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails: Schema.Schema<GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails> = Schema.suspend(() => Schema.Struct({
  sdk: Schema.optional(GoogleChecksReportV1alphaSdk),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails>;

export interface GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence {
  /** SDKs in violation. */
  sdkDetails?: Array<GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails>;
}

export const GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence> = Schema.suspend(() => Schema.Struct({
  sdkDetails: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidenceSdkDetails)),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence>;

export interface GoogleChecksReportV1alphaCheckEvidence {
  /** Evidence collected from your privacy policy(s). */
  privacyPolicyTexts?: Array<GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence>;
  /** Evidence concerning data types found in your app. */
  dataTypes?: Array<GoogleChecksReportV1alphaCheckDataTypeEvidence>;
  /** Evidence concerning endpoints that were contacted by your app. */
  endpoints?: Array<GoogleChecksReportV1alphaCheckEndpointEvidence>;
  /** Evidence concerning permissions that were found in your app. */
  permissions?: Array<GoogleChecksReportV1alphaCheckPermissionEvidence>;
  /** Evidence concerning SDKs that were found in your app. */
  sdks?: Array<GoogleChecksReportV1alphaCheckSdkEvidence>;
  /** Evidence concerning data security. */
  dataSecurity?: GoogleChecksReportV1alphaCheckDataSecurityEvidence;
  /** Evidence concerning SDK issues. */
  sdkIssues?: Array<GoogleChecksReportV1alphaCheckSdkIssueEvidence>;
  /** Evidence collected from endpoint restriction violation analysis. */
  endpointRestrictionViolations?: Array<GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence>;
  /** Evidence collected from permission restriction violation analysis. */
  permissionRestrictionViolations?: Array<GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence>;
  /** Evidence collected from SDK restriction violation analysis. */
  sdkRestrictionViolations?: Array<GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence>;
}

export const GoogleChecksReportV1alphaCheckEvidence: Schema.Schema<GoogleChecksReportV1alphaCheckEvidence> = Schema.suspend(() => Schema.Struct({
  privacyPolicyTexts: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckPrivacyPolicyTextEvidence)),
  dataTypes: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckDataTypeEvidence)),
  endpoints: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckEndpointEvidence)),
  permissions: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckPermissionEvidence)),
  sdks: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckSdkEvidence)),
  dataSecurity: Schema.optional(GoogleChecksReportV1alphaCheckDataSecurityEvidence),
  sdkIssues: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckSdkIssueEvidence)),
  endpointRestrictionViolations: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckEndpointRestrictionViolationEvidence)),
  permissionRestrictionViolations: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckPermissionRestrictionViolationEvidence)),
  sdkRestrictionViolations: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckSdkRestrictionViolationEvidence)),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheckEvidence" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheckEvidence>;

export interface GoogleChecksReportV1alphaCheck {
  /** The type of check that was run. A type will only appear once in a report's list of checks. */
  type?: "CHECK_TYPE_UNSPECIFIED" | "STORE_LISTING_PRIVACY_POLICY_LINK_PRESENT" | "PRIVACY_POLICY_UPDATE_DATE_RECENT" | "PRIVACY_POLICY_GDPR_GENERAL_RULES" | "PRIVACY_POLICY_CCPA_GENERAL_RULES" | "PRIVACY_POLICY_COLLECTION_CATEGORIES_DATA_NOTICE" | "PRIVACY_POLICY_PROCESSING_PURPOSE_DATA_NOTICE" | "PRIVACY_POLICY_SHARING_CATEGORIES_DATA_NOTICE" | "PRIVACY_POLICY_DATA_RETENTION_NOTICE" | "PRIVACY_POLICY_CONTACT_DETAILS_NOTICE" | "PRIVACY_POLICY_CHILDREN_GENERAL_RULES" | "PRIVACY_POLICY_DATA_TYPE_PHONE_NUMBER" | "PRIVACY_POLICY_DATA_TYPE_USER_ACCOUNT_INFO" | "PRIVACY_POLICY_DATA_TYPE_PRECISE_LOCATION" | "PRIVACY_POLICY_DATA_TYPE_DEVICE_ID" | "PRIVACY_POLICY_DATA_TYPE_APPS_ON_DEVICE" | "PRIVACY_POLICY_DATA_TYPE_CONTACTS" | "PRIVACY_POLICY_DATA_TYPE_TEXT_MESSAGES" | "PRIVACY_POLICY_DATA_TYPE_PII" | "PRIVACY_POLICY_DATA_TYPE_PII_CATEGORIES" | "PRIVACY_POLICY_DATA_TYPE_HEALTH_AND_BIOMETRIC" | "PRIVACY_POLICY_BRAZIL_LGPD_GENERAL_RULES" | "PRIVACY_POLICY_VIRGINIA_VCDPA_GENERAL_RULES" | "PRIVACY_POLICY_AFFILIATION_MENTION" | "PRIVACY_POLICY_RIGHT_TO_DELETE_NOTICE" | "PRIVACY_POLICY_RIGHT_TO_ACCESS_NOTICE" | "PRIVACY_POLICY_RIGHT_TO_RECTIFICATION_NOTICE" | "PRIVACY_POLICY_RIGHT_TO_KNOW_ABOUT_SELLING_NOTICE" | "PRIVACY_POLICY_RIGHT_TO_KNOW_ABOUT_SHARING_NOTICE" | "PRIVACY_POLICY_RIGHT_TO_OPT_OUT_FROM_SELLING_NOTICE" | "PRIVACY_POLICY_METHOD_TO_OPT_OUT_FROM_SELLING_OR_SHARING_NOTICE" | "PRIVACY_POLICY_DATA_CONTROLLER_IDENTITY" | "PRIVACY_POLICY_DPO_CONTACT_DETAILS" | "PRIVACY_POLICY_RIGHT_TO_LODGE_A_COMPLAINT" | "PRIVACY_POLICY_LEGAL_BASIS" | "PRIVACY_POLICY_CHILDREN_INFO_COLLECTION" | "PRIVACY_POLICY_CHILDREN_INFO_USAGE_PURPOSES" | "PRIVACY_POLICY_CHILDREN_INFO_DISCLOSURE_PRACTICES" | "PRIVACY_POLICY_CHILDREN_INFO_PUBLICITY" | "PRIVACY_POLICY_PARENTS_METHOD_OF_INFO_DELETION" | "PRIVACY_POLICY_PARENTS_METHOD_TO_INFO_REVIEW" | "PRIVACY_POLICY_PARENTS_METHOD_TO_STOP_FURTHER_INFO_COLLECTION_USE" | "PRIVACY_POLICY_PARENTS_RIGHT_TO_INFO_DELETION" | "PRIVACY_POLICY_PARENTS_RIGHT_TO_INFO_REVIEW" | "PRIVACY_POLICY_PARENTS_RIGHT_TO_STOP_FURTHER_INFO_COLLECTION_USE" | "PRIVACY_POLICY_PSL_APPROXIMATE_LOCATION" | "PRIVACY_POLICY_PSL_PRECISE_LOCATION" | "PRIVACY_POLICY_PSL_NAME" | "PRIVACY_POLICY_PSL_EMAIL_ADDRESS" | "PRIVACY_POLICY_PSL_USER_IDENTIFIERS" | "PRIVACY_POLICY_PSL_ADDRESS" | "PRIVACY_POLICY_PSL_PHONE_NUMBER" | "PRIVACY_POLICY_PSL_RACE_AND_ETHNICITY" | "PRIVACY_POLICY_PSL_CREDIT_SCORE" | "PRIVACY_POLICY_PSL_PURCHASE_HISTORY" | "PRIVACY_POLICY_PSL_HEALTH_INFO" | "PRIVACY_POLICY_PSL_FITNESS_INFO" | "PRIVACY_POLICY_PSL_EMAIL_MESSAGES" | "PRIVACY_POLICY_PSL_TEXT_MESSAGES" | "PRIVACY_POLICY_PSL_PHOTOS" | "PRIVACY_POLICY_PSL_VIDEOS" | "PRIVACY_POLICY_PSL_MUSIC_FILES" | "PRIVACY_POLICY_PSL_VOICE_OR_SOUND_RECORDINGS" | "PRIVACY_POLICY_PSL_FILES_AND_DOCS" | "PRIVACY_POLICY_PSL_CALENDAR_EVENTS" | "PRIVACY_POLICY_PSL_CONTACTS" | "PRIVACY_POLICY_PSL_APP_INTERACTIONS" | "PRIVACY_POLICY_PSL_IN_APP_SEARCH_HISTORY" | "PRIVACY_POLICY_PSL_WEB_BROWSING_HISTORY" | "PRIVACY_POLICY_PSL_INSTALLED_APPS" | "PRIVACY_POLICY_PSL_CRASH_LOGS" | "PRIVACY_POLICY_PSL_DIAGNOSTICS" | "PRIVACY_POLICY_PSL_DEVICE_OR_OTHER_IDS" | "DATA_MONITORING_NEW_ENDPOINT" | "DATA_MONITORING_NEW_PERMISSION" | "DATA_MONITORING_NEW_DATA_TYPE" | "DATA_MONITORING_NEW_SDK" | "DATA_MONITORING_ENCRYPTION" | "DATA_MONITORING_NEW_DATA_TYPE_VERSION_DIFF" | "DATA_MONITORING_NEW_ENDPOINT_VERSION_DIFF" | "DATA_MONITORING_NEW_PERMISSION_VERSION_DIFF" | "DATA_MONITORING_NEW_SDK_VERSION_DIFF" | "DATA_MONITORING_SDKS_DENYLIST_VIOLATION" | "DATA_MONITORING_PERMISSIONS_DENYLIST_VIOLATION" | "DATA_MONITORING_ENDPOINTS_DENYLIST_VIOLATION" | "DATA_MONITORING_OUTDATED_SDK_VERSION" | "DATA_MONITORING_CRITICAL_SDK_ISSUE" | "PRIVACY_POLICY_DATA_TYPE_SENSITIVE_INFO" | "DATA_MONITORING_PII_LOGCAT_LEAK" | "DATA_MONITORING_MINIMIZE_PERMISSION_MEDIA" | "DATA_MONITORING_MINIMIZE_PERMISSION_CAMERA" | "DATA_MONITORING_MINIMIZE_PERMISSION_DOCUMENTS" | (string & {});
  /** The urgency or risk level of the check. */
  severity?: "CHECK_SEVERITY_UNSPECIFIED" | "PRIORITY" | "POTENTIAL" | "OPPORTUNITY" | (string & {});
  /** The result after running the check. */
  state?: "CHECK_STATE_UNSPECIFIED" | "PASSED" | "FAILED" | "UNCHECKED" | (string & {});
  /** Additional information about the check state in relation to past reports. */
  stateMetadata?: GoogleChecksReportV1alphaCheckStateMetadata;
  /** Regions that are impacted by the check. For more info, see https://google.aip.dev/143#countries-and-regions. */
  regionCodes?: Array<string>;
  /** Regulations and policies that serve as the legal basis for the check. */
  citations?: Array<GoogleChecksReportV1alphaCheckCitation>;
  /** Evidence that substantiates the check result. */
  evidence?: GoogleChecksReportV1alphaCheckEvidence;
}

export const GoogleChecksReportV1alphaCheck: Schema.Schema<GoogleChecksReportV1alphaCheck> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  stateMetadata: Schema.optional(GoogleChecksReportV1alphaCheckStateMetadata),
  regionCodes: Schema.optional(Schema.Array(Schema.String)),
  citations: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheckCitation)),
  evidence: Schema.optional(GoogleChecksReportV1alphaCheckEvidence),
})).annotate({ identifier: "GoogleChecksReportV1alphaCheck" }) as any as Schema.Schema<GoogleChecksReportV1alphaCheck>;

export interface GoogleChecksReportV1alphaDataMonitoringResultMetadata {
  /** Your app's version name when this result was last detected within the last 8 weeks. If not set, it wasn't detected within the last 8 weeks. */
  lastDetectedAppVersion?: string;
  /** The timestamp when this result was first detected within the last 8 weeks. If not set, it wasn't detected within the last 8 weeks. */
  firstDetectedTime?: string;
  /** The timestamp when this result was last detected within the last 8 weeks. If not set, it wasn't detected within the last 8 weeks. */
  lastDetectedTime?: string;
  /** Badges that apply to this result. */
  badges?: Array<"DATA_MONITORING_RESULT_BADGE_UNSPECIFIED" | "NEW" | (string & {})>;
}

export const GoogleChecksReportV1alphaDataMonitoringResultMetadata: Schema.Schema<GoogleChecksReportV1alphaDataMonitoringResultMetadata> = Schema.suspend(() => Schema.Struct({
  lastDetectedAppVersion: Schema.optional(Schema.String),
  firstDetectedTime: Schema.optional(Schema.String),
  lastDetectedTime: Schema.optional(Schema.String),
  badges: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataMonitoringResultMetadata" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataMonitoringResultMetadata>;

export interface GoogleChecksReportV1alphaDataMonitoringEndpointResult {
  /** Metadata about the result. */
  metadata?: GoogleChecksReportV1alphaDataMonitoringResultMetadata;
  /** The endpoint that was contacted by your app. */
  endpoint?: GoogleChecksReportV1alphaEndpoint;
  /** The number of times this endpoint was contacted by your app. */
  hitCount?: number;
}

export const GoogleChecksReportV1alphaDataMonitoringEndpointResult: Schema.Schema<GoogleChecksReportV1alphaDataMonitoringEndpointResult> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleChecksReportV1alphaDataMonitoringResultMetadata),
  endpoint: Schema.optional(GoogleChecksReportV1alphaEndpoint),
  hitCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataMonitoringEndpointResult" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataMonitoringEndpointResult>;

export interface GoogleChecksReportV1alphaDataMonitoringPermissionResult {
  /** Metadata about the result. */
  metadata?: GoogleChecksReportV1alphaDataMonitoringResultMetadata;
  /** The permission that was found in your app. */
  permission?: GoogleChecksReportV1alphaPermission;
}

export const GoogleChecksReportV1alphaDataMonitoringPermissionResult: Schema.Schema<GoogleChecksReportV1alphaDataMonitoringPermissionResult> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleChecksReportV1alphaDataMonitoringResultMetadata),
  permission: Schema.optional(GoogleChecksReportV1alphaPermission),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataMonitoringPermissionResult" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataMonitoringPermissionResult>;

export interface GoogleChecksReportV1alphaDataMonitoringDataTypeResult {
  /** Metadata about the result. */
  metadata?: GoogleChecksReportV1alphaDataMonitoringResultMetadata;
  /** The data type that was shared or collected by your app. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "DATA_TYPE_APPROXIMATE_LOCATION" | "DATA_TYPE_PRECISE_LOCATION" | "DATA_TYPE_PERSONAL_NAME" | "DATA_TYPE_EMAIL_ADDRESS" | "DATA_TYPE_USER_IDS" | "DATA_TYPE_PHYSICAL_ADDRESS" | "DATA_TYPE_PHONE_NUMBER" | "DATA_TYPE_RACE_AND_ETHNICITY" | "DATA_TYPE_POLITICAL_OR_RELIGIOUS_BELIEFS" | "DATA_TYPE_SEXUAL_ORIENTATION" | "DATA_TYPE_OTHER_PERSONAL_INFO" | "DATA_TYPE_PAYMENT_INFO" | "DATA_TYPE_PURCHASE_HISTORY" | "DATA_TYPE_CREDIT_SCORE" | "DATA_TYPE_OTHER_FINANCIAL_INFO" | "DATA_TYPE_HEALTH_INFO" | "DATA_TYPE_FITNESS_INFO" | "DATA_TYPE_EMAILS" | "DATA_TYPE_TEXT_MESSAGES" | "DATA_TYPE_OTHER_IN_APP_MESSAGES" | "DATA_TYPE_PHOTOS" | "DATA_TYPE_VIDEOS" | "DATA_TYPE_VOICE_OR_SOUND_RECORDINGS" | "DATA_TYPE_MUSIC_FILES" | "DATA_TYPE_OTHER_AUDIO_FILES" | "DATA_TYPE_FILES_AND_DOCS" | "DATA_TYPE_CALENDAR_EVENTS" | "DATA_TYPE_CONTACTS" | "DATA_TYPE_APP_INTERACTIONS" | "DATA_TYPE_IN_APP_SEARCH_HISTORY" | "DATA_TYPE_INSTALLED_APPS" | "DATA_TYPE_OTHER_USER_GENERATED_CONTENT" | "DATA_TYPE_OTHER_ACTIONS" | "DATA_TYPE_WEB_BROWSING_HISTORY" | "DATA_TYPE_CRASH_LOGS" | "DATA_TYPE_PERFORMANCE_DIAGNOSTICS" | "DATA_TYPE_OTHER_APP_PERFORMANCE_DATA" | "DATA_TYPE_DEVICE_OR_OTHER_IDS" | (string & {});
  /** Evidence collected about the data type. */
  dataTypeEvidence?: GoogleChecksReportV1alphaDataTypeEvidence;
}

export const GoogleChecksReportV1alphaDataMonitoringDataTypeResult: Schema.Schema<GoogleChecksReportV1alphaDataMonitoringDataTypeResult> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleChecksReportV1alphaDataMonitoringResultMetadata),
  dataType: Schema.optional(Schema.String),
  dataTypeEvidence: Schema.optional(GoogleChecksReportV1alphaDataTypeEvidence),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataMonitoringDataTypeResult" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataMonitoringDataTypeResult>;

export interface GoogleChecksReportV1alphaDataMonitoringSdkResult {
  /** Metadata about the result. */
  metadata?: GoogleChecksReportV1alphaDataMonitoringResultMetadata;
  /** The SDK that was found in your app. */
  sdk?: GoogleChecksReportV1alphaSdk;
}

export const GoogleChecksReportV1alphaDataMonitoringSdkResult: Schema.Schema<GoogleChecksReportV1alphaDataMonitoringSdkResult> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleChecksReportV1alphaDataMonitoringResultMetadata),
  sdk: Schema.optional(GoogleChecksReportV1alphaSdk),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataMonitoringSdkResult" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataMonitoringSdkResult>;

export interface GoogleChecksReportV1alphaDataMonitoring {
  /** Endpoints that were found by dynamic analysis of your app. */
  endpoints?: Array<GoogleChecksReportV1alphaDataMonitoringEndpointResult>;
  /** Permissions that your app uses. */
  permissions?: Array<GoogleChecksReportV1alphaDataMonitoringPermissionResult>;
  /** Data types that your app shares or collects. */
  dataTypes?: Array<GoogleChecksReportV1alphaDataMonitoringDataTypeResult>;
  /** SDKs that your app uses. */
  sdks?: Array<GoogleChecksReportV1alphaDataMonitoringSdkResult>;
}

export const GoogleChecksReportV1alphaDataMonitoring: Schema.Schema<GoogleChecksReportV1alphaDataMonitoring> = Schema.suspend(() => Schema.Struct({
  endpoints: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataMonitoringEndpointResult)),
  permissions: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataMonitoringPermissionResult)),
  dataTypes: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataMonitoringDataTypeResult)),
  sdks: Schema.optional(Schema.Array(GoogleChecksReportV1alphaDataMonitoringSdkResult)),
})).annotate({ identifier: "GoogleChecksReportV1alphaDataMonitoring" }) as any as Schema.Schema<GoogleChecksReportV1alphaDataMonitoring>;

export interface GoogleChecksReportV1alphaReport {
  /** Resource name of the report. */
  name?: string;
  /** A URL to view results. */
  resultsUri?: string;
  /** Information about the analyzed app bundle. */
  appBundle?: GoogleChecksReportV1alphaAppBundle;
  /** List of checks that were run on the app bundle. */
  checks?: Array<GoogleChecksReportV1alphaCheck>;
  /** Information related to data monitoring. */
  dataMonitoring?: GoogleChecksReportV1alphaDataMonitoring;
}

export const GoogleChecksReportV1alphaReport: Schema.Schema<GoogleChecksReportV1alphaReport> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resultsUri: Schema.optional(Schema.String),
  appBundle: Schema.optional(GoogleChecksReportV1alphaAppBundle),
  checks: Schema.optional(Schema.Array(GoogleChecksReportV1alphaCheck)),
  dataMonitoring: Schema.optional(GoogleChecksReportV1alphaDataMonitoring),
})).annotate({ identifier: "GoogleChecksReportV1alphaReport" }) as any as Schema.Schema<GoogleChecksReportV1alphaReport>;

export interface GoogleChecksReportV1alphaListReportsResponse {
  /** The reports for the specified app. */
  reports?: Array<GoogleChecksReportV1alphaReport>;
  /** A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleChecksReportV1alphaListReportsResponse: Schema.Schema<GoogleChecksReportV1alphaListReportsResponse> = Schema.suspend(() => Schema.Struct({
  reports: Schema.optional(Schema.Array(GoogleChecksReportV1alphaReport)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChecksReportV1alphaListReportsResponse" }) as any as Schema.Schema<GoogleChecksReportV1alphaListReportsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets an app. */
export interface GetAccountsAppsRequest {
  /** Required. Resource name of the app. Example: `accounts/123/apps/456` */
  name: string;
}

export const GetAccountsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/apps/{appsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsAppsRequest>;

export type GetAccountsAppsResponse = GoogleChecksAccountV1alphaApp;
export const GetAccountsAppsResponse = GoogleChecksAccountV1alphaApp;

export type GetAccountsAppsError = CommonErrors;

export const getAccountsApps: API.OperationMethod<GetAccountsAppsRequest, GetAccountsAppsResponse, GetAccountsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsAppsRequest,
  output: GetAccountsAppsResponse,
  errors: [],
}));

/** Lists the apps under the given account. */
export interface ListAccountsAppsRequest {
  /** Required. The parent account. Example: `accounts/123` */
  parent: string;
  /** Optional. The maximum number of results to return. The server may further constrain the maximum number of results returned in a single page. If unspecified, the server will decide the number of results to be returned. */
  pageSize?: number;
  /** Optional. A page token received from a previous `ListApps` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListAccountsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/apps" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAppsRequest>;

export type ListAccountsAppsResponse = GoogleChecksAccountV1alphaListAppsResponse;
export const ListAccountsAppsResponse = GoogleChecksAccountV1alphaListAppsResponse;

export type ListAccountsAppsError = CommonErrors;

export const listAccountsApps = API.makePaginated(() => ({
  input: ListAccountsAppsRequest,
  output: ListAccountsAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListAccountsAppsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListAccountsAppsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAppsOperationsRequest>;

export type ListAccountsAppsOperationsResponse = ListOperationsResponse;
export const ListAccountsAppsOperationsResponse = ListOperationsResponse;

export type ListAccountsAppsOperationsError = CommonErrors;

export const listAccountsAppsOperations = API.makePaginated(() => ({
  input: ListAccountsAppsOperationsRequest,
  output: ListAccountsAppsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetAccountsAppsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetAccountsAppsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsAppsOperationsRequest>;

export type GetAccountsAppsOperationsResponse = Operation;
export const GetAccountsAppsOperationsResponse = Operation;

export type GetAccountsAppsOperationsError = CommonErrors;

export const getAccountsAppsOperations: API.OperationMethod<GetAccountsAppsOperationsRequest, GetAccountsAppsOperationsResponse, GetAccountsAppsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsAppsOperationsRequest,
  output: GetAccountsAppsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteAccountsAppsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteAccountsAppsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsAppsOperationsRequest>;

export type DeleteAccountsAppsOperationsResponse = Empty;
export const DeleteAccountsAppsOperationsResponse = Empty;

export type DeleteAccountsAppsOperationsError = CommonErrors;

export const deleteAccountsAppsOperations: API.OperationMethod<DeleteAccountsAppsOperationsRequest, DeleteAccountsAppsOperationsResponse, DeleteAccountsAppsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsAppsOperationsRequest,
  output: DeleteAccountsAppsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelAccountsAppsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelAccountsAppsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelAccountsAppsOperationsRequest>;

export type CancelAccountsAppsOperationsResponse = Empty;
export const CancelAccountsAppsOperationsResponse = Empty;

export type CancelAccountsAppsOperationsError = CommonErrors;

export const cancelAccountsAppsOperations: API.OperationMethod<CancelAccountsAppsOperationsRequest, CancelAccountsAppsOperationsResponse, CancelAccountsAppsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelAccountsAppsOperationsRequest,
  output: CancelAccountsAppsOperationsResponse,
  errors: [],
}));

/** Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done. */
export interface WaitAccountsAppsOperationsRequest {
  /** The name of the operation resource to wait on. */
  name: string;
  /** Request body */
  body?: WaitOperationRequest;
}

export const WaitAccountsAppsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(WaitOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/operations/{operationsId}:wait", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WaitAccountsAppsOperationsRequest>;

export type WaitAccountsAppsOperationsResponse = Operation;
export const WaitAccountsAppsOperationsResponse = Operation;

export type WaitAccountsAppsOperationsError = CommonErrors;

export const waitAccountsAppsOperations: API.OperationMethod<WaitAccountsAppsOperationsRequest, WaitAccountsAppsOperationsResponse, WaitAccountsAppsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WaitAccountsAppsOperationsRequest,
  output: WaitAccountsAppsOperationsResponse,
  errors: [],
}));

/** Gets a report. By default, only the name and results_uri fields are returned. You can include other fields by listing them in the `fields` URL query parameter. For example, `?fields=name,checks` will return the name and checks fields. */
export interface GetAccountsAppsReportsRequest {
  /** Required. Resource name of the report. Example: `accounts/123/apps/456/reports/789` */
  name: string;
  /** Optional. An [AIP-160](https://google.aip.dev/160) filter string to filter checks within the report. Only checks that match the filter string are included in the response. Example: `state = FAILED` */
  checksFilter?: string;
}

export const GetAccountsAppsReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  checksFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("checksFilter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/reports/{reportsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsAppsReportsRequest>;

export type GetAccountsAppsReportsResponse = GoogleChecksReportV1alphaReport;
export const GetAccountsAppsReportsResponse = GoogleChecksReportV1alphaReport;

export type GetAccountsAppsReportsError = CommonErrors;

export const getAccountsAppsReports: API.OperationMethod<GetAccountsAppsReportsRequest, GetAccountsAppsReportsResponse, GetAccountsAppsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsAppsReportsRequest,
  output: GetAccountsAppsReportsResponse,
  errors: [],
}));

/** Lists reports for the specified app. By default, only the name and results_uri fields are returned. You can include other fields by listing them in the `fields` URL query parameter. For example, `?fields=reports(name,checks)` will return the name and checks fields. */
export interface ListAccountsAppsReportsRequest {
  /** Required. Resource name of the app. Example: `accounts/123/apps/456` */
  parent: string;
  /** Optional. The maximum number of reports to return. If unspecified, at most 10 reports will be returned. The maximum value is 50; values above 50 will be coerced to 50. */
  pageSize?: number;
  /** Optional. A page token received from a previous `ListReports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReports` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. An [AIP-160](https://google.aip.dev/160) filter string to filter reports. Example: `appBundle.releaseType = PRE_RELEASE` */
  filter?: string;
  /** Optional. An [AIP-160](https://google.aip.dev/160) filter string to filter checks within reports. Only checks that match the filter string are included in the response. Example: `state = FAILED` */
  checksFilter?: string;
}

export const ListAccountsAppsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  checksFilter: Schema.optional(Schema.String).pipe(T.HttpQuery("checksFilter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAppsReportsRequest>;

export type ListAccountsAppsReportsResponse = GoogleChecksReportV1alphaListReportsResponse;
export const ListAccountsAppsReportsResponse = GoogleChecksReportV1alphaListReportsResponse;

export type ListAccountsAppsReportsError = CommonErrors;

export const listAccountsAppsReports = API.makePaginated(() => ({
  input: ListAccountsAppsReportsRequest,
  output: ListAccountsAppsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetAccountsReposOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetAccountsReposOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/repos/{reposId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsReposOperationsRequest>;

export type GetAccountsReposOperationsResponse = Operation;
export const GetAccountsReposOperationsResponse = Operation;

export type GetAccountsReposOperationsError = CommonErrors;

export const getAccountsReposOperations: API.OperationMethod<GetAccountsReposOperationsRequest, GetAccountsReposOperationsResponse, GetAccountsReposOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsReposOperationsRequest,
  output: GetAccountsReposOperationsResponse,
  errors: [],
}));

/** Uploads the results of local Code Compliance analysis and generates a scan of privacy issues. Returns a google.longrunning.Operation containing analysis and findings. */
export interface GenerateAccountsReposScansRequest {
  /** Required. Resource name of the repo. Example: `accounts/123/repos/456` */
  parent: string;
  /** Request body */
  body?: GoogleChecksRepoScanV1alphaGenerateScanRequest;
}

export const GenerateAccountsReposScansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleChecksRepoScanV1alphaGenerateScanRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/accounts/{accountsId}/repos/{reposId}/scans:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAccountsReposScansRequest>;

export type GenerateAccountsReposScansResponse = Operation;
export const GenerateAccountsReposScansResponse = Operation;

export type GenerateAccountsReposScansError = CommonErrors;

export const generateAccountsReposScans: API.OperationMethod<GenerateAccountsReposScansRequest, GenerateAccountsReposScansResponse, GenerateAccountsReposScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAccountsReposScansRequest,
  output: GenerateAccountsReposScansResponse,
  errors: [],
}));

/** Gets a repo scan. By default, only the name and results_uri fields are returned. You can include other fields by listing them in the `fields` URL query parameter. For example, `?fields=name,sources` will return the name and sources fields. */
export interface GetAccountsReposScansRequest {
  /** Required. Resource name of the repo scan. Example: `accounts/123/repos/456/scans/789` */
  name: string;
}

export const GetAccountsReposScansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/repos/{reposId}/scans/{scansId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsReposScansRequest>;

export type GetAccountsReposScansResponse = GoogleChecksRepoScanV1alphaRepoScan;
export const GetAccountsReposScansResponse = GoogleChecksRepoScanV1alphaRepoScan;

export type GetAccountsReposScansError = CommonErrors;

export const getAccountsReposScans: API.OperationMethod<GetAccountsReposScansRequest, GetAccountsReposScansResponse, GetAccountsReposScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsReposScansRequest,
  output: GetAccountsReposScansResponse,
  errors: [],
}));

/** Lists repo scans for the specified repo. */
export interface ListAccountsReposScansRequest {
  /** Required. Resource name of the repo. Example: `accounts/123/repos/456` */
  parent: string;
  /** Optional. The maximum number of repo scans to return. If unspecified, at most 10 repo scans will be returned. The maximum value is 50; values above 50 will be coerced to 50. */
  pageSize?: number;
  /** Optional. A page token received from a previous `ListRepoScans` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRepoScans` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. An [AIP-160](https://google.aip.dev/160) filter string to filter repo scans. Example: `scmMetadata.branch = main` */
  filter?: string;
}

export const ListAccountsReposScansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/repos/{reposId}/scans" }),
  svc,
) as unknown as Schema.Schema<ListAccountsReposScansRequest>;

export type ListAccountsReposScansResponse = GoogleChecksRepoScanV1alphaListRepoScansResponse;
export const ListAccountsReposScansResponse = GoogleChecksRepoScanV1alphaListRepoScansResponse;

export type ListAccountsReposScansError = CommonErrors;

export const listAccountsReposScans = API.makePaginated(() => ({
  input: ListAccountsReposScansRequest,
  output: ListAccountsReposScansResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Analyze a piece of content with the provided set of policies. */
export interface ClassifyContentAisafetyRequest {
  /** Request body */
  body?: GoogleChecksAisafetyV1alphaClassifyContentRequest;
}

export const ClassifyContentAisafetyRequest = Schema.Struct({
  body: Schema.optional(GoogleChecksAisafetyV1alphaClassifyContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/aisafety:classifyContent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClassifyContentAisafetyRequest>;

export type ClassifyContentAisafetyResponse = GoogleChecksAisafetyV1alphaClassifyContentResponse;
export const ClassifyContentAisafetyResponse = GoogleChecksAisafetyV1alphaClassifyContentResponse;

export type ClassifyContentAisafetyError = CommonErrors;

export const classifyContentAisafety: API.OperationMethod<ClassifyContentAisafetyRequest, ClassifyContentAisafetyResponse, ClassifyContentAisafetyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClassifyContentAisafetyRequest,
  output: ClassifyContentAisafetyResponse,
  errors: [],
}));

/** Analyzes the uploaded app bundle and returns a google.longrunning.Operation containing the generated Report. ## Example (upload only) Send a regular POST request with the header `X-Goog-Upload-Protocol: raw`. ``` POST https://checks.googleapis.com/upload/v1alpha/{parent=accounts/* /apps/*}/reports:analyzeUpload HTTP/1.1 X-Goog-Upload-Protocol: raw Content-Length: Content-Type: application/octet-stream ``` ## Example (upload with metadata) Send a multipart POST request where the first body part contains the metadata JSON and the second body part contains the binary upload. Include the header `X-Goog-Upload-Protocol: multipart`. ``` POST https://checks.googleapis.com/upload/v1alpha/{parent=accounts/* /apps/*}/reports:analyzeUpload HTTP/1.1 X-Goog-Upload-Protocol: multipart Content-Length: ? Content-Type: multipart/related; boundary=BOUNDARY --BOUNDARY Content-Type: application/json {"code_reference_id":"db5bcc20f94055fb5bc08cbb9b0e7a5530308786"} --BOUNDARY --BOUNDARY-- ``` *Note:* Metadata-only requests are not supported. */
export interface UploadMediaRequest {
  /** Required. Resource name of the app. Example: `accounts/123/apps/456` */
  parent: string;
  /** Request body */
  body?: GoogleChecksReportV1alphaAnalyzeUploadRequest;
}

export const UploadMediaRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleChecksReportV1alphaAnalyzeUploadRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/accounts/{accountsId}/apps/{appsId}/reports:analyzeUpload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = Operation;
export const UploadMediaResponse = Operation;

export type UploadMediaError = CommonErrors;

export const uploadMedia: API.OperationMethod<UploadMediaRequest, UploadMediaResponse, UploadMediaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

