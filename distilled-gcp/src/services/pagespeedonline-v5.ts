// ==========================================================================
// PageSpeed Insights API (pagespeedonline v5)
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
  name: "pagespeedonline",
  version: "v5",
  rootUrl: "https://pagespeedonline.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Bucket {
  /** Lower bound for a bucket's range. */
  min?: number;
  /** Upper bound for a bucket's range. */
  max?: number;
  /** The proportion of data in this bucket. */
  proportion?: number;
}

export const Bucket: Schema.Schema<Bucket> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
  proportion: Schema.optional(Schema.Number),
})).annotate({ identifier: "Bucket" }) as any as Schema.Schema<Bucket>;

export interface UserPageLoadMetricV5 {
  /** Identifies the type of the metric. */
  metricId?: string;
  /** Identifies the form factor of the metric being collected. */
  formFactor?: string;
  /** Metric distributions. Proportions should sum up to 1. */
  distributions?: Array<Bucket>;
  /** The median number of the metric, in millisecond. */
  median?: number;
  /** The category of the specific time metric. */
  category?: string;
  /** We use this field to store certain percentile value for this metric. For v4, this field contains pc50. For v5, this field contains pc90. */
  percentile?: number;
}

export const UserPageLoadMetricV5: Schema.Schema<UserPageLoadMetricV5> = Schema.suspend(() => Schema.Struct({
  metricId: Schema.optional(Schema.String),
  formFactor: Schema.optional(Schema.String),
  distributions: Schema.optional(Schema.Array(Bucket)),
  median: Schema.optional(Schema.Number),
  category: Schema.optional(Schema.String),
  percentile: Schema.optional(Schema.Number),
})).annotate({ identifier: "UserPageLoadMetricV5" }) as any as Schema.Schema<UserPageLoadMetricV5>;

export interface PagespeedApiLoadingExperienceV5 {
  /** The url, pattern or origin which the metrics are on. */
  id?: string;
  /** The map of . */
  metrics?: Record<string, UserPageLoadMetricV5>;
  /** The human readable speed "category" of the id. */
  overall_category?: string;
  /** The requested URL, which may differ from the resolved "id". */
  initial_url?: string;
  /** True if the result is an origin fallback from a page, false otherwise. */
  origin_fallback?: boolean;
}

export const PagespeedApiLoadingExperienceV5: Schema.Schema<PagespeedApiLoadingExperienceV5> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Record(Schema.String, UserPageLoadMetricV5)),
  overall_category: Schema.optional(Schema.String),
  initial_url: Schema.optional(Schema.String),
  origin_fallback: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PagespeedApiLoadingExperienceV5" }) as any as Schema.Schema<PagespeedApiLoadingExperienceV5>;

export interface RendererFormattedStrings {
  /** The disclaimer shown below a performance metric value. */
  varianceDisclaimer?: string;
  /** The heading for the estimated page load savings opportunity of an audit. */
  opportunityResourceColumnLabel?: string;
  /** The heading for the estimated page load savings of opportunity audits. */
  opportunitySavingsColumnLabel?: string;
  /** The error string shown next to an erroring audit. */
  errorMissingAuditInfo?: string;
  /** The label shown next to an audit or metric that has had an error. */
  errorLabel?: string;
  /** The label shown above a bulleted list of warnings. */
  warningHeader?: string;
  /** The tooltip text on an expandable chevron icon. */
  auditGroupExpandTooltip?: string;
  /** The heading that is shown above a list of audits that are passing. */
  passedAuditsGroupTitle?: string;
  /** The heading shown above a list of audits that do not apply to a page. */
  notApplicableAuditsGroupTitle?: string;
  /** The heading shown above a list of audits that were not computerd in the run. */
  manualAuditsGroupTitle?: string;
  /** The label shown preceding important warnings that may have invalidated an entire report. */
  toplevelWarningsMessage?: string;
  /** The label that explains the score gauges scale (0-49, 50-89, 90-100). */
  scorescaleLabel?: string;
  /** The label for values shown in the summary of critical request chains. */
  crcLongestDurationLabel?: string;
  /** The label for the initial request in a critical request chain. */
  crcInitialNavigation?: string;
  /** The disclaimer shown under performance explaining that the network can vary. */
  lsPerformanceCategoryDescription?: string;
  /** The title of the lab data performance category. */
  labDataTitle?: string;
  /** The heading that is shown above a list of audits that have warnings */
  warningAuditsGroupTitle?: string;
  /** The label for the button to show all lines of a snippet */
  snippetExpandButtonLabel?: string;
  /** The label for the button to show only a few lines of a snippet */
  snippetCollapseButtonLabel?: string;
  /** This label is for a filter checkbox above a table of items */
  thirdPartyResourcesLabel?: string;
  /** Descriptive explanation for emulation setting when emulating a generic desktop form factor, as opposed to a mobile-device like form factor. */
  runtimeDesktopEmulation?: string;
  /** Descriptive explanation for emulation setting when emulating a Nexus 5X mobile device. */
  runtimeMobileEmulation?: string;
  /** Descriptive explanation for emulation setting when no device emulation is set. */
  runtimeNoEmulation?: string;
  /** Label for a row in a table that shows the estimated CPU power of the machine running Lighthouse. Example row values: 532, 1492, 783. */
  runtimeSettingsBenchmark?: string;
  /** Label for a row in a table that describes the CPU throttling conditions that were used during a Lighthouse run, if any. */
  runtimeSettingsCPUThrottling?: string;
  /** Label for a row in a table that describes the kind of device that was emulated for the Lighthouse run. Example values for row elements: 'No Emulation', 'Emulated Desktop', etc. */
  runtimeSettingsDevice?: string;
  /** Label for a row in a table that shows the time at which a Lighthouse run was conducted; formatted as a timestamp, e.g. Jan 1, 1970 12:00 AM UTC. */
  runtimeSettingsFetchTime?: string;
  /** Label for a row in a table that describes the network throttling conditions that were used during a Lighthouse run, if any. */
  runtimeSettingsNetworkThrottling?: string;
  /** Title of the Runtime settings table in a Lighthouse report. Runtime settings are the environment configurations that a specific report used at auditing time. */
  runtimeSettingsTitle?: string;
  /** Label for a row in a table that shows the User Agent that was detected on the Host machine that ran Lighthouse. */
  runtimeSettingsUA?: string;
  /** Label for a row in a table that shows the User Agent that was used to send out all network requests during the Lighthouse run. */
  runtimeSettingsUANetwork?: string;
  /** Label for a row in a table that shows the URL that was audited during a Lighthouse run. */
  runtimeSettingsUrl?: string;
  /** Descriptive explanation for a runtime setting that is set to an unknown value. */
  runtimeUnknown?: string;
  /** Option in a dropdown menu that copies the Lighthouse JSON object to the system clipboard. */
  dropdownCopyJSON?: string;
  /** Option in a dropdown menu that toggles the themeing of the report between Light(default) and Dark themes. */
  dropdownDarkTheme?: string;
  /** Option in a dropdown menu that opens a full Lighthouse report in a print dialog. */
  dropdownPrintExpanded?: string;
  /** Option in a dropdown menu that opens a small, summary report in a print dialog. */
  dropdownPrintSummary?: string;
  /** Option in a dropdown menu that saves the current report as a new GitHub Gist. */
  dropdownSaveGist?: string;
  /** Option in a dropdown menu that saves the Lighthouse report HTML locally to the system as a '.html' file. */
  dropdownSaveHTML?: string;
  /** Option in a dropdown menu that saves the Lighthouse JSON object to the local system as a '.json' file. */
  dropdownSaveJSON?: string;
  /** Option in a dropdown menu that opens the current report in the Lighthouse Viewer Application. */
  dropdownViewer?: string;
  /** Label for button to create an issue against the Lighthouse GitHub project. */
  footerIssue?: string;
  /** Descriptive explanation for environment throttling that was provided by the runtime environment instead of provided by Lighthouse throttling. */
  throttlingProvided?: string;
  /** Label for a row in a table that shows in what tool Lighthouse is being run (e.g. The lighthouse CLI, Chrome DevTools, Lightrider, WebPageTest, etc). */
  runtimeSettingsChannel?: string;
  /** Text link pointing to the Lighthouse scoring calculator. This link immediately follows a sentence stating the performance score is calculated from the perf metrics. */
  calculatorLink?: string;
  /** Label for a row in a table that shows the version of the Axe library used */
  runtimeSettingsAxeVersion?: string;
  /** Label for a button that opens the Treemap App */
  viewTreemapLabel?: string;
  /** Label preceding a radio control for filtering the list of audits. The radio choices are various performance metrics (FCP, LCP, TBT), and if chosen, the audits in the report are hidden if they are not relevant to the selected metric. */
  showRelevantAudits?: string;
}

export const RendererFormattedStrings: Schema.Schema<RendererFormattedStrings> = Schema.suspend(() => Schema.Struct({
  varianceDisclaimer: Schema.optional(Schema.String),
  opportunityResourceColumnLabel: Schema.optional(Schema.String),
  opportunitySavingsColumnLabel: Schema.optional(Schema.String),
  errorMissingAuditInfo: Schema.optional(Schema.String),
  errorLabel: Schema.optional(Schema.String),
  warningHeader: Schema.optional(Schema.String),
  auditGroupExpandTooltip: Schema.optional(Schema.String),
  passedAuditsGroupTitle: Schema.optional(Schema.String),
  notApplicableAuditsGroupTitle: Schema.optional(Schema.String),
  manualAuditsGroupTitle: Schema.optional(Schema.String),
  toplevelWarningsMessage: Schema.optional(Schema.String),
  scorescaleLabel: Schema.optional(Schema.String),
  crcLongestDurationLabel: Schema.optional(Schema.String),
  crcInitialNavigation: Schema.optional(Schema.String),
  lsPerformanceCategoryDescription: Schema.optional(Schema.String),
  labDataTitle: Schema.optional(Schema.String),
  warningAuditsGroupTitle: Schema.optional(Schema.String),
  snippetExpandButtonLabel: Schema.optional(Schema.String),
  snippetCollapseButtonLabel: Schema.optional(Schema.String),
  thirdPartyResourcesLabel: Schema.optional(Schema.String),
  runtimeDesktopEmulation: Schema.optional(Schema.String),
  runtimeMobileEmulation: Schema.optional(Schema.String),
  runtimeNoEmulation: Schema.optional(Schema.String),
  runtimeSettingsBenchmark: Schema.optional(Schema.String),
  runtimeSettingsCPUThrottling: Schema.optional(Schema.String),
  runtimeSettingsDevice: Schema.optional(Schema.String),
  runtimeSettingsFetchTime: Schema.optional(Schema.String),
  runtimeSettingsNetworkThrottling: Schema.optional(Schema.String),
  runtimeSettingsTitle: Schema.optional(Schema.String),
  runtimeSettingsUA: Schema.optional(Schema.String),
  runtimeSettingsUANetwork: Schema.optional(Schema.String),
  runtimeSettingsUrl: Schema.optional(Schema.String),
  runtimeUnknown: Schema.optional(Schema.String),
  dropdownCopyJSON: Schema.optional(Schema.String),
  dropdownDarkTheme: Schema.optional(Schema.String),
  dropdownPrintExpanded: Schema.optional(Schema.String),
  dropdownPrintSummary: Schema.optional(Schema.String),
  dropdownSaveGist: Schema.optional(Schema.String),
  dropdownSaveHTML: Schema.optional(Schema.String),
  dropdownSaveJSON: Schema.optional(Schema.String),
  dropdownViewer: Schema.optional(Schema.String),
  footerIssue: Schema.optional(Schema.String),
  throttlingProvided: Schema.optional(Schema.String),
  runtimeSettingsChannel: Schema.optional(Schema.String),
  calculatorLink: Schema.optional(Schema.String),
  runtimeSettingsAxeVersion: Schema.optional(Schema.String),
  viewTreemapLabel: Schema.optional(Schema.String),
  showRelevantAudits: Schema.optional(Schema.String),
})).annotate({ identifier: "RendererFormattedStrings" }) as any as Schema.Schema<RendererFormattedStrings>;

export interface I18n {
  /** Internationalized strings that are formatted to the locale in configSettings. */
  rendererFormattedStrings?: RendererFormattedStrings;
}

export const I18n: Schema.Schema<I18n> = Schema.suspend(() => Schema.Struct({
  rendererFormattedStrings: Schema.optional(RendererFormattedStrings),
})).annotate({ identifier: "I18n" }) as any as Schema.Schema<I18n>;

export interface MetricSavings {
  /** Optional. Optional numeric value representing the audit's savings for the LCP metric. */
  LCP?: number;
  /** Optional. Optional numeric value representing the audit's savings for the FCP metric. */
  FCP?: number;
  /** Optional. Optional numeric value representing the audit's savings for the CLS metric. */
  CLS?: number;
  /** Optional. Optional numeric value representing the audit's savings for the TBT metric. */
  TBT?: number;
  /** Optional. Optional numeric value representing the audit's savings for the INP metric. */
  INP?: number;
}

export const MetricSavings: Schema.Schema<MetricSavings> = Schema.suspend(() => Schema.Struct({
  LCP: Schema.optional(Schema.Number),
  FCP: Schema.optional(Schema.Number),
  CLS: Schema.optional(Schema.Number),
  TBT: Schema.optional(Schema.Number),
  INP: Schema.optional(Schema.Number),
})).annotate({ identifier: "MetricSavings" }) as any as Schema.Schema<MetricSavings>;

export interface LighthouseAuditResultV5 {
  /** The audit's id. */
  id?: string;
  /** The human readable title. */
  title?: string;
  /** The description of the audit. */
  description?: string;
  /** The enumerated score display mode. */
  scoreDisplayMode?: string;
  /** The value that should be displayed on the UI for this audit. */
  displayValue?: string;
  /** An explanation of the errors in the audit. */
  explanation?: string;
  /** An error message from a thrown error inside the audit. */
  errorMessage?: string;
  /** Freeform details section of the audit. */
  details?: Record<string, unknown>;
  /** The score of the audit, can be null. */
  score?: unknown;
  /** Possible warnings that occurred in the audit, can be null. */
  warnings?: unknown;
  /** A numeric value that has a meaning specific to the audit, e.g. the number of nodes in the DOM or the timestamp of a specific load event. More information can be found in the audit details, if present. */
  numericValue?: number;
  /** The unit of the numeric_value field. Used to format the numeric value for display. */
  numericUnit?: string;
  /** The metric savings of the audit. */
  metricSavings?: MetricSavings;
}

export const LighthouseAuditResultV5: Schema.Schema<LighthouseAuditResultV5> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  scoreDisplayMode: Schema.optional(Schema.String),
  displayValue: Schema.optional(Schema.String),
  explanation: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  score: Schema.optional(Schema.Unknown),
  warnings: Schema.optional(Schema.Unknown),
  numericValue: Schema.optional(Schema.Number),
  numericUnit: Schema.optional(Schema.String),
  metricSavings: Schema.optional(MetricSavings),
})).annotate({ identifier: "LighthouseAuditResultV5" }) as any as Schema.Schema<LighthouseAuditResultV5>;

export interface CategoryGroupV5 {
  /** The human readable title of the group */
  title?: string;
  /** The description of what the category is grouping */
  description?: string;
}

export const CategoryGroupV5: Schema.Schema<CategoryGroupV5> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "CategoryGroupV5" }) as any as Schema.Schema<CategoryGroupV5>;

export interface StackPack {
  /** The stack pack id. */
  id?: string;
  /** The stack pack title. */
  title?: string;
  /** The stack pack icon data uri. */
  iconDataURL?: string;
  /** The stack pack advice strings. */
  descriptions?: Record<string, string>;
}

export const StackPack: Schema.Schema<StackPack> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  iconDataURL: Schema.optional(Schema.String),
  descriptions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "StackPack" }) as any as Schema.Schema<StackPack>;

export interface Environment {
  /** The user agent string that was sent over the network. */
  networkUserAgent?: string;
  /** The user agent string of the version of Chrome used. */
  hostUserAgent?: string;
  /** The benchmark index number that indicates rough device class. */
  benchmarkIndex?: number;
  /** The version of libraries with which these results were generated. Ex: axe-core. */
  credits?: Record<string, string>;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  networkUserAgent: Schema.optional(Schema.String),
  hostUserAgent: Schema.optional(Schema.String),
  benchmarkIndex: Schema.optional(Schema.Number),
  credits: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface RuntimeError {
  /** The enumerated Lighthouse Error code. */
  code?: string;
  /** A human readable message explaining the error code. */
  message?: string;
}

export const RuntimeError: Schema.Schema<RuntimeError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "RuntimeError" }) as any as Schema.Schema<RuntimeError>;

export interface AuditRefs {
  /** The audit ref id. */
  id?: string;
  /** The weight this audit's score has on the overall category score. */
  weight?: number;
  /** The category group that the audit belongs to (optional). */
  group?: string;
  /** The conventional acronym for the audit/metric. */
  acronym?: string;
  /** Any audit IDs closely relevant to this one. */
  relevantAudits?: Array<string>;
}

export const AuditRefs: Schema.Schema<AuditRefs> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  weight: Schema.optional(Schema.Number),
  group: Schema.optional(Schema.String),
  acronym: Schema.optional(Schema.String),
  relevantAudits: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditRefs" }) as any as Schema.Schema<AuditRefs>;

export interface LighthouseCategoryV5 {
  /** The string identifier of the category. */
  id?: string;
  /** The human-friendly name of the category. */
  title?: string;
  /** A more detailed description of the category and its importance. */
  description?: string;
  /** A description for the manual audits in the category. */
  manualDescription?: string;
  /** An array of references to all the audit members of this category. */
  auditRefs?: Array<AuditRefs>;
  /** The overall score of the category, the weighted average of all its audits. (The category's score, can be null.) */
  score?: unknown;
}

export const LighthouseCategoryV5: Schema.Schema<LighthouseCategoryV5> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  manualDescription: Schema.optional(Schema.String),
  auditRefs: Schema.optional(Schema.Array(AuditRefs)),
  score: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "LighthouseCategoryV5" }) as any as Schema.Schema<LighthouseCategoryV5>;

export interface Categories {
  /** The accessibility category, containing all accessibility related audits. */
  accessibility?: LighthouseCategoryV5;
  /** The best practices category, containing all best practices related audits. */
  "best-practices"?: LighthouseCategoryV5;
  /** The Search-Engine-Optimization (SEO) category, containing all seo related audits. */
  seo?: LighthouseCategoryV5;
  /** The Progressive-Web-App (PWA) category, containing all pwa related audits. This is deprecated in Lighthouse's 12.0 release. */
  pwa?: LighthouseCategoryV5;
  /** The performance category, containing all performance related audits. */
  performance?: LighthouseCategoryV5;
}

export const Categories: Schema.Schema<Categories> = Schema.suspend(() => Schema.Struct({
  accessibility: Schema.optional(LighthouseCategoryV5),
  "best-practices": Schema.optional(LighthouseCategoryV5),
  seo: Schema.optional(LighthouseCategoryV5),
  pwa: Schema.optional(LighthouseCategoryV5),
  performance: Schema.optional(LighthouseCategoryV5),
})).annotate({ identifier: "Categories" }) as any as Schema.Schema<Categories>;

export interface Timing {
  /** The total duration of Lighthouse's run. */
  total?: number;
}

export const Timing: Schema.Schema<Timing> = Schema.suspend(() => Schema.Struct({
  total: Schema.optional(Schema.Number),
})).annotate({ identifier: "Timing" }) as any as Schema.Schema<Timing>;

export interface ConfigSettings {
  /** List of categories of audits the run should conduct. */
  onlyCategories?: unknown;
  /** The form factor the emulation should use. This field is deprecated, form_factor should be used instead. */
  emulatedFormFactor?: string;
  /** The locale setting. */
  locale?: string;
  /** How Lighthouse was run, e.g. from the Chrome extension or from the npm module. */
  channel?: string;
  /** How Lighthouse should interpret this run in regards to scoring performance metrics and skipping mobile-only tests in desktop. */
  formFactor?: string;
}

export const ConfigSettings: Schema.Schema<ConfigSettings> = Schema.suspend(() => Schema.Struct({
  onlyCategories: Schema.optional(Schema.Unknown),
  emulatedFormFactor: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  formFactor: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigSettings" }) as any as Schema.Schema<ConfigSettings>;

export interface LhrEntity {
  /** Required. Name of the entity. */
  name?: string;
  /** Optional. An optional homepage URL of the entity. */
  homepage?: string;
  /** Optional. An optional category name for the entity. */
  category?: string;
  /** Optional. An optional flag indicating if the entity is the first party. */
  isFirstParty?: boolean;
  /** Optional. An optional flag indicating if the entity is not recognized. */
  isUnrecognized?: boolean;
  /** Required. A list of URL origin strings that belong to this entity. */
  origins?: Array<string>;
}

export const LhrEntity: Schema.Schema<LhrEntity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  homepage: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  isFirstParty: Schema.optional(Schema.Boolean),
  isUnrecognized: Schema.optional(Schema.Boolean),
  origins: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LhrEntity" }) as any as Schema.Schema<LhrEntity>;

export interface LighthouseResultV5 {
  /** The time that this run was fetched. */
  fetchTime?: string;
  /** The original requested url. */
  requestedUrl?: string;
  /** The final resolved url that was audited. */
  finalUrl?: string;
  /** URL of the main document request of the final navigation. */
  mainDocumentUrl?: string;
  /** URL displayed on the page after Lighthouse finishes. */
  finalDisplayedUrl?: string;
  /** The lighthouse version that was used to generate this LHR. */
  lighthouseVersion?: string;
  /** The internationalization strings that are required to render the LHR. */
  i18n?: I18n;
  /** The user agent that was used to run this LHR. */
  userAgent?: string;
  /** Map of audits in the LHR. */
  audits?: Record<string, LighthouseAuditResultV5>;
  /** Map of category groups in the LHR. */
  categoryGroups?: Record<string, CategoryGroupV5>;
  /** The Stack Pack advice strings. */
  stackPacks?: Array<StackPack>;
  /** Environment settings that were used when making this LHR. */
  environment?: Environment;
  /** List of all run warnings in the LHR. Will always output to at least `[]`. */
  runWarnings?: Array<unknown>;
  /** A top-level error message that, if present, indicates a serious enough problem that this Lighthouse result may need to be discarded. */
  runtimeError?: RuntimeError;
  /** Map of categories in the LHR. */
  categories?: Categories;
  /** Timing information for this LHR. */
  timing?: Timing;
  /** The configuration settings for this LHR. */
  configSettings?: ConfigSettings;
  /** Screenshot data of the full page, along with node rects relevant to the audit results. */
  fullPageScreenshot?: unknown;
  /** Entity classification data. */
  entities?: Array<LhrEntity>;
}

export const LighthouseResultV5: Schema.Schema<LighthouseResultV5> = Schema.suspend(() => Schema.Struct({
  fetchTime: Schema.optional(Schema.String),
  requestedUrl: Schema.optional(Schema.String),
  finalUrl: Schema.optional(Schema.String),
  mainDocumentUrl: Schema.optional(Schema.String),
  finalDisplayedUrl: Schema.optional(Schema.String),
  lighthouseVersion: Schema.optional(Schema.String),
  i18n: Schema.optional(I18n),
  userAgent: Schema.optional(Schema.String),
  audits: Schema.optional(Schema.Record(Schema.String, LighthouseAuditResultV5)),
  categoryGroups: Schema.optional(Schema.Record(Schema.String, CategoryGroupV5)),
  stackPacks: Schema.optional(Schema.Array(StackPack)),
  environment: Schema.optional(Environment),
  runWarnings: Schema.optional(Schema.Array(Schema.Unknown)),
  runtimeError: Schema.optional(RuntimeError),
  categories: Schema.optional(Categories),
  timing: Schema.optional(Timing),
  configSettings: Schema.optional(ConfigSettings),
  fullPageScreenshot: Schema.optional(Schema.Unknown),
  entities: Schema.optional(Schema.Array(LhrEntity)),
})).annotate({ identifier: "LighthouseResultV5" }) as any as Schema.Schema<LighthouseResultV5>;

export interface PagespeedVersion {
  /** The major version number of PageSpeed used to generate these results. */
  major?: string;
  /** The minor version number of PageSpeed used to generate these results. */
  minor?: string;
}

export const PagespeedVersion: Schema.Schema<PagespeedVersion> = Schema.suspend(() => Schema.Struct({
  major: Schema.optional(Schema.String),
  minor: Schema.optional(Schema.String),
})).annotate({ identifier: "PagespeedVersion" }) as any as Schema.Schema<PagespeedVersion>;

export interface PagespeedApiPagespeedResponseV5 {
  /** Kind of result. */
  kind?: string;
  /** The captcha verify result */
  captchaResult?: string;
  /** Canonicalized and final URL for the document, after following page redirects (if any). */
  id?: string;
  /** Metrics of end users' page loading experience. */
  loadingExperience?: PagespeedApiLoadingExperienceV5;
  /** Metrics of the aggregated page loading experience of the origin */
  originLoadingExperience?: PagespeedApiLoadingExperienceV5;
  /** The UTC timestamp of this analysis. */
  analysisUTCTimestamp?: string;
  /** Lighthouse response for the audit url as an object. */
  lighthouseResult?: LighthouseResultV5;
  /** The version of PageSpeed used to generate these results. */
  version?: PagespeedVersion;
}

export const PagespeedApiPagespeedResponseV5: Schema.Schema<PagespeedApiPagespeedResponseV5> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  captchaResult: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  loadingExperience: Schema.optional(PagespeedApiLoadingExperienceV5),
  originLoadingExperience: Schema.optional(PagespeedApiLoadingExperienceV5),
  analysisUTCTimestamp: Schema.optional(Schema.String),
  lighthouseResult: Schema.optional(LighthouseResultV5),
  version: Schema.optional(PagespeedVersion),
})).annotate({ identifier: "PagespeedApiPagespeedResponseV5" }) as any as Schema.Schema<PagespeedApiPagespeedResponseV5>;

// ==========================================================================
// Operations
// ==========================================================================

/** Runs PageSpeed analysis on the page at the specified URL, and returns PageSpeed scores, a list of suggestions to make that page faster, and other information. */
export interface RunpagespeedPagespeedapiRequest {
  /** A Lighthouse category to run; if none are given, only Performance category will be run */
  category?: "CATEGORY_UNSPECIFIED" | "ACCESSIBILITY" | "BEST_PRACTICES" | "PERFORMANCE" | "PWA" | "SEO" | (string & {})[];
  /** The locale used to localize formatted results */
  locale?: string;
  /** The analysis strategy (desktop or mobile) to use, and desktop is the default */
  strategy?: "STRATEGY_UNSPECIFIED" | "DESKTOP" | "MOBILE" | (string & {});
  /** Required. The URL to fetch and analyze */
  url: string;
  /** Campaign name for analytics. */
  utm_campaign?: string;
  /** Campaign source for analytics. */
  utm_source?: string;
  /** The captcha token passed when filling out a captcha. */
  captchaToken?: string;
}

export const RunpagespeedPagespeedapiRequest = Schema.Struct({
  category: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("category")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  strategy: Schema.optional(Schema.String).pipe(T.HttpQuery("strategy")),
  url: Schema.String.pipe(T.HttpQuery("url")),
  utm_campaign: Schema.optional(Schema.String).pipe(T.HttpQuery("utm_campaign")),
  utm_source: Schema.optional(Schema.String).pipe(T.HttpQuery("utm_source")),
  captchaToken: Schema.optional(Schema.String).pipe(T.HttpQuery("captchaToken")),
}).pipe(
  T.Http({ method: "GET", path: "pagespeedonline/v5/runPagespeed" }),
  svc,
) as unknown as Schema.Schema<RunpagespeedPagespeedapiRequest>;

export type RunpagespeedPagespeedapiResponse = PagespeedApiPagespeedResponseV5;
export const RunpagespeedPagespeedapiResponse = PagespeedApiPagespeedResponseV5;

export type RunpagespeedPagespeedapiError = CommonErrors;

export const runpagespeedPagespeedapi: API.OperationMethod<RunpagespeedPagespeedapiRequest, RunpagespeedPagespeedapiResponse, RunpagespeedPagespeedapiError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunpagespeedPagespeedapiRequest,
  output: RunpagespeedPagespeedapiResponse,
  errors: [],
}));

