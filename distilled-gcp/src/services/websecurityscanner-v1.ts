// ==========================================================================
// Web Security Scanner API (websecurityscanner v1)
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
  name: "websecurityscanner",
  version: "v1",
  rootUrl: "https://websecurityscanner.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ScanConfigError {
  /** Output only. Indicates the reason code for a configuration failure. */
  code?: "CODE_UNSPECIFIED" | "OK" | "INTERNAL_ERROR" | "APPENGINE_API_BACKEND_ERROR" | "APPENGINE_API_NOT_ACCESSIBLE" | "APPENGINE_DEFAULT_HOST_MISSING" | "CANNOT_USE_GOOGLE_COM_ACCOUNT" | "CANNOT_USE_OWNER_ACCOUNT" | "COMPUTE_API_BACKEND_ERROR" | "COMPUTE_API_NOT_ACCESSIBLE" | "CUSTOM_LOGIN_URL_DOES_NOT_BELONG_TO_CURRENT_PROJECT" | "CUSTOM_LOGIN_URL_MALFORMED" | "CUSTOM_LOGIN_URL_MAPPED_TO_NON_ROUTABLE_ADDRESS" | "CUSTOM_LOGIN_URL_MAPPED_TO_UNRESERVED_ADDRESS" | "CUSTOM_LOGIN_URL_HAS_NON_ROUTABLE_IP_ADDRESS" | "CUSTOM_LOGIN_URL_HAS_UNRESERVED_IP_ADDRESS" | "DUPLICATE_SCAN_NAME" | "INVALID_FIELD_VALUE" | "FAILED_TO_AUTHENTICATE_TO_TARGET" | "FINDING_TYPE_UNSPECIFIED" | "FORBIDDEN_TO_SCAN_COMPUTE" | "FORBIDDEN_UPDATE_TO_MANAGED_SCAN" | "MALFORMED_FILTER" | "MALFORMED_RESOURCE_NAME" | "PROJECT_INACTIVE" | "REQUIRED_FIELD" | "RESOURCE_NAME_INCONSISTENT" | "SCAN_ALREADY_RUNNING" | "SCAN_NOT_RUNNING" | "SEED_URL_DOES_NOT_BELONG_TO_CURRENT_PROJECT" | "SEED_URL_MALFORMED" | "SEED_URL_MAPPED_TO_NON_ROUTABLE_ADDRESS" | "SEED_URL_MAPPED_TO_UNRESERVED_ADDRESS" | "SEED_URL_HAS_NON_ROUTABLE_IP_ADDRESS" | "SEED_URL_HAS_UNRESERVED_IP_ADDRESS" | "SERVICE_ACCOUNT_NOT_CONFIGURED" | "TOO_MANY_SCANS" | "UNABLE_TO_RESOLVE_PROJECT_INFO" | "UNSUPPORTED_BLACKLIST_PATTERN_FORMAT" | "UNSUPPORTED_FILTER" | "UNSUPPORTED_FINDING_TYPE" | "UNSUPPORTED_URL_SCHEME" | "CLOUD_ASSET_INVENTORY_ASSET_NOT_FOUND" | (string & {});
  /** Output only. Indicates the full name of the ScanConfig field that triggers this error, for example "scan_config.max_qps". This field is provided for troubleshooting purposes only and its actual value can change in the future. */
  fieldName?: string;
}

export const ScanConfigError: Schema.Schema<ScanConfigError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  fieldName: Schema.optional(Schema.String),
})).annotate({ identifier: "ScanConfigError" }) as any as Schema.Schema<ScanConfigError>;

export interface ScanRunWarningTrace {
  /** Output only. Indicates the warning code. */
  code?: "CODE_UNSPECIFIED" | "INSUFFICIENT_CRAWL_RESULTS" | "TOO_MANY_CRAWL_RESULTS" | "TOO_MANY_FUZZ_TASKS" | "BLOCKED_BY_IAP" | "NO_STARTING_URL_FOUND_FOR_MANAGED_SCAN" | (string & {});
}

export const ScanRunWarningTrace: Schema.Schema<ScanRunWarningTrace> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "ScanRunWarningTrace" }) as any as Schema.Schema<ScanRunWarningTrace>;

export interface ScanRunErrorTrace {
  /** Output only. If the scan encounters TOO_MANY_HTTP_ERRORS, this field indicates the most common HTTP error code, if such is available. For example, if this code is 404, the scan has encountered too many NOT_FOUND responses. */
  mostCommonHttpErrorCode?: number;
  /** Output only. If the scan encounters SCAN_CONFIG_ISSUE error, this field has the error message encountered during scan configuration validation that is performed before each scan run. */
  scanConfigError?: ScanConfigError;
  /** Output only. Indicates the error reason code. */
  code?: "CODE_UNSPECIFIED" | "INTERNAL_ERROR" | "SCAN_CONFIG_ISSUE" | "AUTHENTICATION_CONFIG_ISSUE" | "TIMED_OUT_WHILE_SCANNING" | "TOO_MANY_REDIRECTS" | "TOO_MANY_HTTP_ERRORS" | "STARTING_URLS_CRAWL_HTTP_ERRORS" | (string & {});
}

export const ScanRunErrorTrace: Schema.Schema<ScanRunErrorTrace> = Schema.suspend(() => Schema.Struct({
  mostCommonHttpErrorCode: Schema.optional(Schema.Number),
  scanConfigError: Schema.optional(ScanConfigError),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "ScanRunErrorTrace" }) as any as Schema.Schema<ScanRunErrorTrace>;

export interface ScanRun {
  /** Output only. Whether the scan run has found any vulnerabilities. */
  hasVulnerabilities?: boolean;
  /** Output only. A list of warnings, if such are encountered during this scan run. */
  warningTraces?: Array<ScanRunWarningTrace>;
  /** Output only. The time at which the ScanRun started. */
  startTime?: string;
  /** Output only. The resource name of the ScanRun. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. The ScanRun IDs are generated by the system. */
  name?: string;
  /** Output only. The number of URLs tested during this ScanRun. If the scan is in progress, the value represents the number of URLs tested up to now. The number of URLs tested is usually larger than the number URLS crawled because typically a crawled URL is tested with multiple test payloads. */
  urlsTestedCount?: string;
  /** Output only. If result_state is an ERROR, this field provides the primary reason for scan's termination and more details, if such are available. */
  errorTrace?: ScanRunErrorTrace;
  /** Output only. The number of URLs crawled during this ScanRun. If the scan is in progress, the value represents the number of URLs crawled up to now. */
  urlsCrawledCount?: string;
  /** Output only. The result state of the ScanRun. This field is only available after the execution state reaches "FINISHED". */
  resultState?: "RESULT_STATE_UNSPECIFIED" | "SUCCESS" | "ERROR" | "KILLED" | (string & {});
  /** Output only. The percentage of total completion ranging from 0 to 100. If the scan is in queue, the value is 0. If the scan is running, the value ranges from 0 to 100. If the scan is finished, the value is 100. */
  progressPercent?: number;
  /** Output only. The time at which the ScanRun reached termination state - that the ScanRun is either finished or stopped by user. */
  endTime?: string;
  /** Output only. The execution state of the ScanRun. */
  executionState?: "EXECUTION_STATE_UNSPECIFIED" | "QUEUED" | "SCANNING" | "FINISHED" | (string & {});
}

export const ScanRun: Schema.Schema<ScanRun> = Schema.suspend(() => Schema.Struct({
  hasVulnerabilities: Schema.optional(Schema.Boolean),
  warningTraces: Schema.optional(Schema.Array(ScanRunWarningTrace)),
  startTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  urlsTestedCount: Schema.optional(Schema.String),
  errorTrace: Schema.optional(ScanRunErrorTrace),
  urlsCrawledCount: Schema.optional(Schema.String),
  resultState: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
  endTime: Schema.optional(Schema.String),
  executionState: Schema.optional(Schema.String),
})).annotate({ identifier: "ScanRun" }) as any as Schema.Schema<ScanRun>;

export interface OutdatedLibrary {
  /** The name of the outdated library. */
  libraryName?: string;
  /** URLs to learn more information about the vulnerabilities in the library. */
  learnMoreUrls?: Array<string>;
  /** The version number. */
  version?: string;
}

export const OutdatedLibrary: Schema.Schema<OutdatedLibrary> = Schema.suspend(() => Schema.Struct({
  libraryName: Schema.optional(Schema.String),
  learnMoreUrls: Schema.optional(Schema.Array(Schema.String)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "OutdatedLibrary" }) as any as Schema.Schema<OutdatedLibrary>;

export interface CustomAccount {
  /** Required. The login form URL of the website. */
  loginUrl?: string;
  /** Required. The user name of the custom account. */
  username?: string;
  /** Required. Input only. The password of the custom account. The credential is stored encrypted and not returned in any response nor included in audit logs. */
  password?: string;
}

export const CustomAccount: Schema.Schema<CustomAccount> = Schema.suspend(() => Schema.Struct({
  loginUrl: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomAccount" }) as any as Schema.Schema<CustomAccount>;

export interface GoogleAccount {
  /** Required. The user name of the Google account. */
  username?: string;
  /** Required. Input only. The password of the Google account. The credential is stored encrypted and not returned in any response nor included in audit logs. */
  password?: string;
}

export const GoogleAccount: Schema.Schema<GoogleAccount> = Schema.suspend(() => Schema.Struct({
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAccount" }) as any as Schema.Schema<GoogleAccount>;

export interface IapTestServiceAccountInfo {
  /** Required. Describes OAuth2 client id of resources protected by Identity-Aware-Proxy (IAP). */
  targetAudienceClientId?: string;
}

export const IapTestServiceAccountInfo: Schema.Schema<IapTestServiceAccountInfo> = Schema.suspend(() => Schema.Struct({
  targetAudienceClientId: Schema.optional(Schema.String),
})).annotate({ identifier: "IapTestServiceAccountInfo" }) as any as Schema.Schema<IapTestServiceAccountInfo>;

export interface IapCredential {
  /** Authentication configuration when Web-Security-Scanner service account is added in Identity-Aware-Proxy (IAP) access policies. */
  iapTestServiceAccountInfo?: IapTestServiceAccountInfo;
}

export const IapCredential: Schema.Schema<IapCredential> = Schema.suspend(() => Schema.Struct({
  iapTestServiceAccountInfo: Schema.optional(IapTestServiceAccountInfo),
})).annotate({ identifier: "IapCredential" }) as any as Schema.Schema<IapCredential>;

export interface Authentication {
  /** Authentication using a custom account. */
  customAccount?: CustomAccount;
  /** Authentication using a Google account. */
  googleAccount?: GoogleAccount;
  /** Authentication using Identity-Aware-Proxy (IAP). */
  iapCredential?: IapCredential;
}

export const Authentication: Schema.Schema<Authentication> = Schema.suspend(() => Schema.Struct({
  customAccount: Schema.optional(CustomAccount),
  googleAccount: Schema.optional(GoogleAccount),
  iapCredential: Schema.optional(IapCredential),
})).annotate({ identifier: "Authentication" }) as any as Schema.Schema<Authentication>;

export interface Schedule {
  /** A timestamp indicates when the next run will be scheduled. The value is refreshed by the server after each run. If unspecified, it will default to current server time, which means the scan will be scheduled to start immediately. */
  scheduleTime?: string;
  /** Required. The duration of time between executions in days. */
  intervalDurationDays?: number;
}

export const Schedule: Schema.Schema<Schedule> = Schema.suspend(() => Schema.Struct({
  scheduleTime: Schema.optional(Schema.String),
  intervalDurationDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface ScanConfig {
  /** Whether the scan config is managed by Web Security Scanner, output only. */
  managedScan?: boolean;
  /** The authentication configuration. If specified, service will use the authentication configuration during scanning. */
  authentication?: Authentication;
  /** The user agent used during scanning. */
  userAgent?: "USER_AGENT_UNSPECIFIED" | "CHROME_LINUX" | "CHROME_ANDROID" | "SAFARI_IPHONE" | (string & {});
  /** The maximum QPS during scanning. A valid value ranges from 5 to 20 inclusively. If the field is unspecified or its value is set 0, server will default to 15. Other values outside of [5, 20] range will be rejected with INVALID_ARGUMENT error. */
  maxQps?: number;
  /** Whether to keep scanning even if most requests return HTTP error codes. */
  ignoreHttpStatusErrors?: boolean;
  /** Identifier. The resource name of the ScanConfig. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. The ScanConfig IDs are generated by the system. */
  name?: string;
  /** Required. The starting URLs from which the scanner finds site pages. */
  startingUrls?: Array<string>;
  /** Set of Google Cloud platforms targeted by the scan. If empty, APP_ENGINE will be used as a default. */
  targetPlatforms?: Array<"TARGET_PLATFORM_UNSPECIFIED" | "APP_ENGINE" | "COMPUTE" | "CLOUD_RUN" | "CLOUD_FUNCTIONS" | (string & {})>;
  /** Whether the scan configuration has enabled static IP address scan feature. If enabled, the scanner will access applications from static IP addresses. */
  staticIpScan?: boolean;
  /** The risk level selected for the scan */
  riskLevel?: "RISK_LEVEL_UNSPECIFIED" | "NORMAL" | "LOW" | (string & {});
  latestRun?: ScanRun;
  /** Controls export of scan configurations and results to Security Command Center. */
  exportToSecurityCommandCenter?: "EXPORT_TO_SECURITY_COMMAND_CENTER_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** The schedule of the ScanConfig. */
  schedule?: Schedule;
  /** Required. The user provided display name of the ScanConfig. */
  displayName?: string;
  /** The excluded URL patterns as described in https://cloud.google.com/security-command-center/docs/how-to-use-web-security-scanner#excluding_urls */
  blacklistPatterns?: Array<string>;
}

export const ScanConfig: Schema.Schema<ScanConfig> = Schema.suspend(() => Schema.Struct({
  managedScan: Schema.optional(Schema.Boolean),
  authentication: Schema.optional(Authentication),
  userAgent: Schema.optional(Schema.String),
  maxQps: Schema.optional(Schema.Number),
  ignoreHttpStatusErrors: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  startingUrls: Schema.optional(Schema.Array(Schema.String)),
  targetPlatforms: Schema.optional(Schema.Array(Schema.String)),
  staticIpScan: Schema.optional(Schema.Boolean),
  riskLevel: Schema.optional(Schema.String),
  latestRun: Schema.optional(ScanRun),
  exportToSecurityCommandCenter: Schema.optional(Schema.String),
  schedule: Schema.optional(Schedule),
  displayName: Schema.optional(Schema.String),
  blacklistPatterns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ScanConfig" }) as any as Schema.Schema<ScanConfig>;

export interface ListScanConfigsResponse {
  /** The list of ScanConfigs returned. */
  scanConfigs?: Array<ScanConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListScanConfigsResponse: Schema.Schema<ListScanConfigsResponse> = Schema.suspend(() => Schema.Struct({
  scanConfigs: Schema.optional(Schema.Array(ScanConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListScanConfigsResponse" }) as any as Schema.Schema<ListScanConfigsResponse>;

export interface Xss {
  /** Stack traces leading to the point where the XSS occurred. */
  stackTraces?: Array<string>;
  /** The reproduction url for the seeding POST request of a Stored XSS. */
  storedXssSeedingUrl?: string;
  /** An error message generated by a javascript breakage. */
  errorMessage?: string;
  /** The attack vector of the payload triggering this XSS. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "LOCAL_STORAGE" | "SESSION_STORAGE" | "WINDOW_NAME" | "REFERRER" | "FORM_INPUT" | "COOKIE" | "POST_MESSAGE" | "GET_PARAMETERS" | "URL_FRAGMENT" | "HTML_COMMENT" | "POST_PARAMETERS" | "PROTOCOL" | "STORED_XSS" | "SAME_ORIGIN" | "USER_CONTROLLABLE_URL" | (string & {});
}

export const Xss: Schema.Schema<Xss> = Schema.suspend(() => Schema.Struct({
  stackTraces: Schema.optional(Schema.Array(Schema.String)),
  storedXssSeedingUrl: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  attackVector: Schema.optional(Schema.String),
})).annotate({ identifier: "Xss" }) as any as Schema.Schema<Xss>;

export interface VulnerableParameters {
  /** The vulnerable parameter names. */
  parameterNames?: Array<string>;
}

export const VulnerableParameters: Schema.Schema<VulnerableParameters> = Schema.suspend(() => Schema.Struct({
  parameterNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VulnerableParameters" }) as any as Schema.Schema<VulnerableParameters>;

export interface FindingTypeStats {
  /** Output only. The count of findings belonging to this finding type. */
  findingCount?: number;
  /** Output only. The finding type associated with the stats. */
  findingType?: string;
}

export const FindingTypeStats: Schema.Schema<FindingTypeStats> = Schema.suspend(() => Schema.Struct({
  findingCount: Schema.optional(Schema.Number),
  findingType: Schema.optional(Schema.String),
})).annotate({ identifier: "FindingTypeStats" }) as any as Schema.Schema<FindingTypeStats>;

export interface Xxe {
  /** Location within the request where the payload was placed. */
  payloadLocation?: "LOCATION_UNSPECIFIED" | "COMPLETE_REQUEST_BODY" | (string & {});
  /** The XML string that triggered the XXE vulnerability. Non-payload values might be redacted. */
  payloadValue?: string;
}

export const Xxe: Schema.Schema<Xxe> = Schema.suspend(() => Schema.Struct({
  payloadLocation: Schema.optional(Schema.String),
  payloadValue: Schema.optional(Schema.String),
})).annotate({ identifier: "Xxe" }) as any as Schema.Schema<Xxe>;

export interface ViolatingResource {
  /** URL of this violating resource. */
  resourceUrl?: string;
  /** The MIME type of this resource. */
  contentType?: string;
}

export const ViolatingResource: Schema.Schema<ViolatingResource> = Schema.suspend(() => Schema.Struct({
  resourceUrl: Schema.optional(Schema.String),
  contentType: Schema.optional(Schema.String),
})).annotate({ identifier: "ViolatingResource" }) as any as Schema.Schema<ViolatingResource>;

export interface Header {
  /** Header name. */
  name?: string;
  /** Header value. */
  value?: string;
}

export const Header: Schema.Schema<Header> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Header" }) as any as Schema.Schema<Header>;

export interface VulnerableHeaders {
  /** List of missing headers. */
  missingHeaders?: Array<Header>;
  /** List of vulnerable headers. */
  headers?: Array<Header>;
}

export const VulnerableHeaders: Schema.Schema<VulnerableHeaders> = Schema.suspend(() => Schema.Struct({
  missingHeaders: Schema.optional(Schema.Array(Header)),
  headers: Schema.optional(Schema.Array(Header)),
})).annotate({ identifier: "VulnerableHeaders" }) as any as Schema.Schema<VulnerableHeaders>;

export interface Form {
  /** ! The URI where to send the form when it's submitted. */
  actionUri?: string;
  /** ! The names of form fields related to the vulnerability. */
  fields?: Array<string>;
}

export const Form: Schema.Schema<Form> = Schema.suspend(() => Schema.Struct({
  actionUri: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Form" }) as any as Schema.Schema<Form>;

export interface Finding {
  /** Output only. An addon containing information reported for an XXE, if any. */
  xxe?: Xxe;
  /** Output only. The tracking ID uniquely identifies a vulnerability instance across multiple ScanRuns. */
  trackingId?: string;
  /** Output only. An addon containing detailed information regarding any resource causing the vulnerability such as JavaScript sources, image, audio files, etc. */
  violatingResource?: ViolatingResource;
  /** Output only. The resource name of the Finding. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanruns/{scanRunId}/findings/{findingId}'. The finding IDs are generated by the system. */
  name?: string;
  /** Output only. The http method of the request that triggered the vulnerability, in uppercase. */
  httpMethod?: string;
  /** Output only. The body of the request that triggered the vulnerability. */
  body?: string;
  /** Output only. The description of the vulnerability. */
  description?: string;
  /** Output only. An addon containing information about request parameters which were found to be vulnerable. */
  vulnerableParameters?: VulnerableParameters;
  /** Output only. An addon containing information about vulnerable or missing HTTP headers. */
  vulnerableHeaders?: VulnerableHeaders;
  /** Output only. The URL where the browser lands when the vulnerability is detected. */
  finalUrl?: string;
  /** Output only. The type of the Finding. Detailed and up-to-date information on findings can be found here: https://cloud.google.com/security-command-center/docs/how-to-remediate-web-security-scanner-findings */
  findingType?: string;
  /** Output only. The URL produced by the server-side fuzzer and used in the request that triggered the vulnerability. */
  fuzzedUrl?: string;
  /** Output only. An addon containing information reported for an XSS, if any. */
  xss?: Xss;
  /** Output only. An addon containing information about outdated libraries. */
  outdatedLibrary?: OutdatedLibrary;
  /** Output only. If the vulnerability was originated from nested IFrame, the immediate parent IFrame is reported. */
  frameUrl?: string;
  /** Output only. The severity level of the reported vulnerability. */
  severity?: "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
  /** Output only. The URL containing human-readable payload that user can leverage to reproduce the vulnerability. */
  reproductionUrl?: string;
  /** Output only. An addon containing information reported for a vulnerability with an HTML form, if any. */
  form?: Form;
}

export const Finding: Schema.Schema<Finding> = Schema.suspend(() => Schema.Struct({
  xxe: Schema.optional(Xxe),
  trackingId: Schema.optional(Schema.String),
  violatingResource: Schema.optional(ViolatingResource),
  name: Schema.optional(Schema.String),
  httpMethod: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  vulnerableParameters: Schema.optional(VulnerableParameters),
  vulnerableHeaders: Schema.optional(VulnerableHeaders),
  finalUrl: Schema.optional(Schema.String),
  findingType: Schema.optional(Schema.String),
  fuzzedUrl: Schema.optional(Schema.String),
  xss: Schema.optional(Xss),
  outdatedLibrary: Schema.optional(OutdatedLibrary),
  frameUrl: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  reproductionUrl: Schema.optional(Schema.String),
  form: Schema.optional(Form),
})).annotate({ identifier: "Finding" }) as any as Schema.Schema<Finding>;

export interface ListFindingsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The list of Findings returned. */
  findings?: Array<Finding>;
}

export const ListFindingsResponse: Schema.Schema<ListFindingsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  findings: Schema.optional(Schema.Array(Finding)),
})).annotate({ identifier: "ListFindingsResponse" }) as any as Schema.Schema<ListFindingsResponse>;

export interface StopScanRunRequest {
}

export const StopScanRunRequest: Schema.Schema<StopScanRunRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopScanRunRequest" }) as any as Schema.Schema<StopScanRunRequest>;

export interface CrawledUrl {
  /** Output only. The URL that was crawled. */
  url?: string;
  /** Output only. The http method of the request that was used to visit the URL, in uppercase. */
  httpMethod?: string;
  /** Output only. The body of the request that was used to visit the URL. */
  body?: string;
}

export const CrawledUrl: Schema.Schema<CrawledUrl> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  httpMethod: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
})).annotate({ identifier: "CrawledUrl" }) as any as Schema.Schema<CrawledUrl>;

export interface ListFindingTypeStatsResponse {
  /** The list of FindingTypeStats returned. */
  findingTypeStats?: Array<FindingTypeStats>;
}

export const ListFindingTypeStatsResponse: Schema.Schema<ListFindingTypeStatsResponse> = Schema.suspend(() => Schema.Struct({
  findingTypeStats: Schema.optional(Schema.Array(FindingTypeStats)),
})).annotate({ identifier: "ListFindingTypeStatsResponse" }) as any as Schema.Schema<ListFindingTypeStatsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListScanRunsResponse {
  /** The list of ScanRuns returned. */
  scanRuns?: Array<ScanRun>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListScanRunsResponse: Schema.Schema<ListScanRunsResponse> = Schema.suspend(() => Schema.Struct({
  scanRuns: Schema.optional(Schema.Array(ScanRun)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListScanRunsResponse" }) as any as Schema.Schema<ListScanRunsResponse>;

export interface ListCrawledUrlsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The list of CrawledUrls returned. */
  crawledUrls?: Array<CrawledUrl>;
}

export const ListCrawledUrlsResponse: Schema.Schema<ListCrawledUrlsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  crawledUrls: Schema.optional(Schema.Array(CrawledUrl)),
})).annotate({ identifier: "ListCrawledUrlsResponse" }) as any as Schema.Schema<ListCrawledUrlsResponse>;

export interface StartScanRunRequest {
}

export const StartScanRunRequest: Schema.Schema<StartScanRunRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StartScanRunRequest" }) as any as Schema.Schema<StartScanRunRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists ScanConfigs under a given project. */
export interface ListProjectsScanConfigsRequest {
  /** A token identifying a page of results to be returned. This should be a `next_page_token` value returned from a previous List request. If unspecified, the first page of results is returned. */
  pageToken?: string;
  /** The maximum number of ScanConfigs to return, can be limited by server. If not specified or not positive, the implementation will select a reasonable value. */
  pageSize?: number;
  /** Required. The parent resource name, which should be a project resource name in the format 'projects/{projectId}'. */
  parent: string;
}

export const ListProjectsScanConfigsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsScanConfigsRequest>;

export type ListProjectsScanConfigsResponse = ListScanConfigsResponse;
export const ListProjectsScanConfigsResponse = ListScanConfigsResponse;

export type ListProjectsScanConfigsError = CommonErrors;

export const listProjectsScanConfigs = API.makePaginated(() => ({
  input: ListProjectsScanConfigsRequest,
  output: ListProjectsScanConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Start a ScanRun according to the given ScanConfig. */
export interface StartProjectsScanConfigsRequest {
  /** Required. The resource name of the ScanConfig to be used. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. */
  name: string;
  /** Request body */
  body?: StartScanRunRequest;
}

export const StartProjectsScanConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartScanRunRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartProjectsScanConfigsRequest>;

export type StartProjectsScanConfigsResponse = ScanRun;
export const StartProjectsScanConfigsResponse = ScanRun;

export type StartProjectsScanConfigsError = CommonErrors;

export const startProjectsScanConfigs: API.OperationMethod<StartProjectsScanConfigsRequest, StartProjectsScanConfigsResponse, StartProjectsScanConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartProjectsScanConfigsRequest,
  output: StartProjectsScanConfigsResponse,
  errors: [],
}));

/** Updates a ScanConfig. This method support partial update of a ScanConfig. */
export interface PatchProjectsScanConfigsRequest {
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Identifier. The resource name of the ScanConfig. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. The ScanConfig IDs are generated by the system. */
  name: string;
  /** Request body */
  body?: ScanConfig;
}

export const PatchProjectsScanConfigsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ScanConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsScanConfigsRequest>;

export type PatchProjectsScanConfigsResponse = ScanConfig;
export const PatchProjectsScanConfigsResponse = ScanConfig;

export type PatchProjectsScanConfigsError = CommonErrors;

export const patchProjectsScanConfigs: API.OperationMethod<PatchProjectsScanConfigsRequest, PatchProjectsScanConfigsResponse, PatchProjectsScanConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsScanConfigsRequest,
  output: PatchProjectsScanConfigsResponse,
  errors: [],
}));

/** Deletes an existing ScanConfig and its child resources. */
export interface DeleteProjectsScanConfigsRequest {
  /** Required. The resource name of the ScanConfig to be deleted. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. */
  name: string;
}

export const DeleteProjectsScanConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsScanConfigsRequest>;

export type DeleteProjectsScanConfigsResponse = Empty;
export const DeleteProjectsScanConfigsResponse = Empty;

export type DeleteProjectsScanConfigsError = CommonErrors;

export const deleteProjectsScanConfigs: API.OperationMethod<DeleteProjectsScanConfigsRequest, DeleteProjectsScanConfigsResponse, DeleteProjectsScanConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsScanConfigsRequest,
  output: DeleteProjectsScanConfigsResponse,
  errors: [],
}));

/** Gets a ScanConfig. */
export interface GetProjectsScanConfigsRequest {
  /** Required. The resource name of the ScanConfig to be returned. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}'. */
  name: string;
}

export const GetProjectsScanConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsScanConfigsRequest>;

export type GetProjectsScanConfigsResponse = ScanConfig;
export const GetProjectsScanConfigsResponse = ScanConfig;

export type GetProjectsScanConfigsError = CommonErrors;

export const getProjectsScanConfigs: API.OperationMethod<GetProjectsScanConfigsRequest, GetProjectsScanConfigsResponse, GetProjectsScanConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsScanConfigsRequest,
  output: GetProjectsScanConfigsResponse,
  errors: [],
}));

/** Creates a new ScanConfig. */
export interface CreateProjectsScanConfigsRequest {
  /** Required. The parent resource name where the scan is created, which should be a project resource name in the format 'projects/{projectId}'. */
  parent: string;
  /** Request body */
  body?: ScanConfig;
}

export const CreateProjectsScanConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ScanConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/scanConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsScanConfigsRequest>;

export type CreateProjectsScanConfigsResponse = ScanConfig;
export const CreateProjectsScanConfigsResponse = ScanConfig;

export type CreateProjectsScanConfigsError = CommonErrors;

export const createProjectsScanConfigs: API.OperationMethod<CreateProjectsScanConfigsRequest, CreateProjectsScanConfigsResponse, CreateProjectsScanConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsScanConfigsRequest,
  output: CreateProjectsScanConfigsResponse,
  errors: [],
}));

/** Lists ScanRuns under a given ScanConfig, in descending order of ScanRun stop time. */
export interface ListProjectsScanConfigsScanRunsRequest {
  /** A token identifying a page of results to be returned. This should be a `next_page_token` value returned from a previous List request. If unspecified, the first page of results is returned. */
  pageToken?: string;
  /** Required. The parent resource name, which should be a scan resource name in the format 'projects/{projectId}/scanConfigs/{scanConfigId}'. */
  parent: string;
  /** The maximum number of ScanRuns to return, can be limited by server. If not specified or not positive, the implementation will select a reasonable value. */
  pageSize?: number;
}

export const ListProjectsScanConfigsScanRunsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns" }),
  svc,
) as unknown as Schema.Schema<ListProjectsScanConfigsScanRunsRequest>;

export type ListProjectsScanConfigsScanRunsResponse = ListScanRunsResponse;
export const ListProjectsScanConfigsScanRunsResponse = ListScanRunsResponse;

export type ListProjectsScanConfigsScanRunsError = CommonErrors;

export const listProjectsScanConfigsScanRuns = API.makePaginated(() => ({
  input: ListProjectsScanConfigsScanRunsRequest,
  output: ListProjectsScanConfigsScanRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a ScanRun. */
export interface GetProjectsScanConfigsScanRunsRequest {
  /** Required. The resource name of the ScanRun to be returned. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. */
  name: string;
}

export const GetProjectsScanConfigsScanRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns/{scanRunsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsScanConfigsScanRunsRequest>;

export type GetProjectsScanConfigsScanRunsResponse = ScanRun;
export const GetProjectsScanConfigsScanRunsResponse = ScanRun;

export type GetProjectsScanConfigsScanRunsError = CommonErrors;

export const getProjectsScanConfigsScanRuns: API.OperationMethod<GetProjectsScanConfigsScanRunsRequest, GetProjectsScanConfigsScanRunsResponse, GetProjectsScanConfigsScanRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsScanConfigsScanRunsRequest,
  output: GetProjectsScanConfigsScanRunsResponse,
  errors: [],
}));

/** Stops a ScanRun. The stopped ScanRun is returned. */
export interface StopProjectsScanConfigsScanRunsRequest {
  /** Required. The resource name of the ScanRun to be stopped. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. */
  name: string;
  /** Request body */
  body?: StopScanRunRequest;
}

export const StopProjectsScanConfigsScanRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopScanRunRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns/{scanRunsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsScanConfigsScanRunsRequest>;

export type StopProjectsScanConfigsScanRunsResponse = ScanRun;
export const StopProjectsScanConfigsScanRunsResponse = ScanRun;

export type StopProjectsScanConfigsScanRunsError = CommonErrors;

export const stopProjectsScanConfigsScanRuns: API.OperationMethod<StopProjectsScanConfigsScanRunsRequest, StopProjectsScanConfigsScanRunsResponse, StopProjectsScanConfigsScanRunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsScanConfigsScanRunsRequest,
  output: StopProjectsScanConfigsScanRunsResponse,
  errors: [],
}));

/** List CrawledUrls under a given ScanRun. */
export interface ListProjectsScanConfigsScanRunsCrawledUrlsRequest {
  /** Required. The parent resource name, which should be a scan run resource name in the format 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. */
  parent: string;
  /** The maximum number of CrawledUrls to return, can be limited by server. If not specified or not positive, the implementation will select a reasonable value. */
  pageSize?: number;
  /** A token identifying a page of results to be returned. This should be a `next_page_token` value returned from a previous List request. If unspecified, the first page of results is returned. */
  pageToken?: string;
}

export const ListProjectsScanConfigsScanRunsCrawledUrlsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns/{scanRunsId}/crawledUrls" }),
  svc,
) as unknown as Schema.Schema<ListProjectsScanConfigsScanRunsCrawledUrlsRequest>;

export type ListProjectsScanConfigsScanRunsCrawledUrlsResponse = ListCrawledUrlsResponse;
export const ListProjectsScanConfigsScanRunsCrawledUrlsResponse = ListCrawledUrlsResponse;

export type ListProjectsScanConfigsScanRunsCrawledUrlsError = CommonErrors;

export const listProjectsScanConfigsScanRunsCrawledUrls = API.makePaginated(() => ({
  input: ListProjectsScanConfigsScanRunsCrawledUrlsRequest,
  output: ListProjectsScanConfigsScanRunsCrawledUrlsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all FindingTypeStats under a given ScanRun. */
export interface ListProjectsScanConfigsScanRunsFindingTypeStatsRequest {
  /** Required. The parent resource name, which should be a scan run resource name in the format 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. */
  parent: string;
}

export const ListProjectsScanConfigsScanRunsFindingTypeStatsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns/{scanRunsId}/findingTypeStats" }),
  svc,
) as unknown as Schema.Schema<ListProjectsScanConfigsScanRunsFindingTypeStatsRequest>;

export type ListProjectsScanConfigsScanRunsFindingTypeStatsResponse = ListFindingTypeStatsResponse;
export const ListProjectsScanConfigsScanRunsFindingTypeStatsResponse = ListFindingTypeStatsResponse;

export type ListProjectsScanConfigsScanRunsFindingTypeStatsError = CommonErrors;

export const listProjectsScanConfigsScanRunsFindingTypeStats: API.OperationMethod<ListProjectsScanConfigsScanRunsFindingTypeStatsRequest, ListProjectsScanConfigsScanRunsFindingTypeStatsResponse, ListProjectsScanConfigsScanRunsFindingTypeStatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsScanConfigsScanRunsFindingTypeStatsRequest,
  output: ListProjectsScanConfigsScanRunsFindingTypeStatsResponse,
  errors: [],
}));

/** List Findings under a given ScanRun. */
export interface ListProjectsScanConfigsScanRunsFindingsRequest {
  /** Required. The parent resource name, which should be a scan run resource name in the format 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}'. */
  parent: string;
  /** The filter expression. The expression must be in the format: . Supported field: 'finding_type'. Supported operator: '='. */
  filter?: string;
  /** A token identifying a page of results to be returned. This should be a `next_page_token` value returned from a previous List request. If unspecified, the first page of results is returned. */
  pageToken?: string;
  /** The maximum number of Findings to return, can be limited by server. If not specified or not positive, the implementation will select a reasonable value. */
  pageSize?: number;
}

export const ListProjectsScanConfigsScanRunsFindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns/{scanRunsId}/findings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsScanConfigsScanRunsFindingsRequest>;

export type ListProjectsScanConfigsScanRunsFindingsResponse = ListFindingsResponse;
export const ListProjectsScanConfigsScanRunsFindingsResponse = ListFindingsResponse;

export type ListProjectsScanConfigsScanRunsFindingsError = CommonErrors;

export const listProjectsScanConfigsScanRunsFindings = API.makePaginated(() => ({
  input: ListProjectsScanConfigsScanRunsFindingsRequest,
  output: ListProjectsScanConfigsScanRunsFindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a Finding. */
export interface GetProjectsScanConfigsScanRunsFindingsRequest {
  /** Required. The resource name of the Finding to be returned. The name follows the format of 'projects/{projectId}/scanConfigs/{scanConfigId}/scanRuns/{scanRunId}/findings/{findingId}'. */
  name: string;
}

export const GetProjectsScanConfigsScanRunsFindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/scanConfigs/{scanConfigsId}/scanRuns/{scanRunsId}/findings/{findingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsScanConfigsScanRunsFindingsRequest>;

export type GetProjectsScanConfigsScanRunsFindingsResponse = Finding;
export const GetProjectsScanConfigsScanRunsFindingsResponse = Finding;

export type GetProjectsScanConfigsScanRunsFindingsError = CommonErrors;

export const getProjectsScanConfigsScanRunsFindings: API.OperationMethod<GetProjectsScanConfigsScanRunsFindingsRequest, GetProjectsScanConfigsScanRunsFindingsResponse, GetProjectsScanConfigsScanRunsFindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsScanConfigsScanRunsFindingsRequest,
  output: GetProjectsScanConfigsScanRunsFindingsResponse,
  errors: [],
}));

