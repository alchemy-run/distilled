// ==========================================================================
// PageSpeed Insights API (pagespeedonline v5)
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
  name: "pagespeedonline",
  version: "v5",
  rootUrl: "https://pagespeedonline.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Bucket {
  /** The proportion of data in this bucket. */
  proportion?: number;
  /** Lower bound for a bucket's range. */
  min?: number;
  /** Upper bound for a bucket's range. */
  max?: number;
}

export const Bucket: Schema.Schema<Bucket> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      proportion: Schema.optional(Schema.Number),
      min: Schema.optional(Schema.Number),
      max: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Bucket" }) as any as Schema.Schema<Bucket>;

export interface UserPageLoadMetricV5 {
  /** Identifies the form factor of the metric being collected. */
  formFactor?: string;
  /** We use this field to store certain percentile value for this metric. For v4, this field contains pc50. For v5, this field contains pc90. */
  percentile?: number;
  /** Metric distributions. Proportions should sum up to 1. */
  distributions?: Array<Bucket>;
  /** The category of the specific time metric. */
  category?: string;
  /** Identifies the type of the metric. */
  metricId?: string;
  /** The median number of the metric, in millisecond. */
  median?: number;
}

export const UserPageLoadMetricV5: Schema.Schema<UserPageLoadMetricV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      formFactor: Schema.optional(Schema.String),
      percentile: Schema.optional(Schema.Number),
      distributions: Schema.optional(Schema.Array(Bucket)),
      category: Schema.optional(Schema.String),
      metricId: Schema.optional(Schema.String),
      median: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "UserPageLoadMetricV5",
  }) as any as Schema.Schema<UserPageLoadMetricV5>;

export interface CategoryGroupV5 {
  /** The human readable title of the group */
  title?: string;
  /** The description of what the category is grouping */
  description?: string;
}

export const CategoryGroupV5: Schema.Schema<CategoryGroupV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CategoryGroupV5",
  }) as any as Schema.Schema<CategoryGroupV5>;

export interface MetricSavings {
  /** Optional. Optional numeric value representing the audit's savings for the LCP metric. */
  LCP?: number;
  /** Optional. Optional numeric value representing the audit's savings for the CLS metric. */
  CLS?: number;
  /** Optional. Optional numeric value representing the audit's savings for the INP metric. */
  INP?: number;
  /** Optional. Optional numeric value representing the audit's savings for the FCP metric. */
  FCP?: number;
  /** Optional. Optional numeric value representing the audit's savings for the TBT metric. */
  TBT?: number;
}

export const MetricSavings: Schema.Schema<MetricSavings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      LCP: Schema.optional(Schema.Number),
      CLS: Schema.optional(Schema.Number),
      INP: Schema.optional(Schema.Number),
      FCP: Schema.optional(Schema.Number),
      TBT: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "MetricSavings",
  }) as any as Schema.Schema<MetricSavings>;

export interface LighthouseAuditResultV5 {
  /** The score of the audit, can be null. */
  score?: unknown;
  /** The unit of the numeric_value field. Used to format the numeric value for display. */
  numericUnit?: string;
  /** The value that should be displayed on the UI for this audit. */
  displayValue?: string;
  /** An explanation of the errors in the audit. */
  explanation?: string;
  /** The description of the audit. */
  description?: string;
  /** The metric savings of the audit. */
  metricSavings?: MetricSavings;
  /** The enumerated score display mode. */
  scoreDisplayMode?: string;
  /** The human readable title. */
  title?: string;
  /** An error message from a thrown error inside the audit. */
  errorMessage?: string;
  /** Possible warnings that occurred in the audit, can be null. */
  warnings?: unknown;
  /** Freeform details section of the audit. */
  details?: Record<string, unknown>;
  /** A numeric value that has a meaning specific to the audit, e.g. the number of nodes in the DOM or the timestamp of a specific load event. More information can be found in the audit details, if present. */
  numericValue?: number;
  /** The audit's id. */
  id?: string;
}

export const LighthouseAuditResultV5: Schema.Schema<LighthouseAuditResultV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Unknown),
      numericUnit: Schema.optional(Schema.String),
      displayValue: Schema.optional(Schema.String),
      explanation: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      metricSavings: Schema.optional(MetricSavings),
      scoreDisplayMode: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      warnings: Schema.optional(Schema.Unknown),
      details: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      numericValue: Schema.optional(Schema.Number),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LighthouseAuditResultV5",
  }) as any as Schema.Schema<LighthouseAuditResultV5>;

export interface LhrEntity {
  /** Optional. An optional flag indicating if the entity is not recognized. */
  isUnrecognized?: boolean;
  /** Required. Name of the entity. */
  name?: string;
  /** Required. A list of URL origin strings that belong to this entity. */
  origins?: Array<string>;
  /** Optional. An optional category name for the entity. */
  category?: string;
  /** Optional. An optional flag indicating if the entity is the first party. */
  isFirstParty?: boolean;
  /** Optional. An optional homepage URL of the entity. */
  homepage?: string;
}

export const LhrEntity: Schema.Schema<LhrEntity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isUnrecognized: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      origins: Schema.optional(Schema.Array(Schema.String)),
      category: Schema.optional(Schema.String),
      isFirstParty: Schema.optional(Schema.Boolean),
      homepage: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "LhrEntity" }) as any as Schema.Schema<LhrEntity>;

export interface PagespeedApiLoadingExperienceV5 {
  /** True if the result is an origin fallback from a page, false otherwise. */
  origin_fallback?: boolean;
  /** The url, pattern or origin which the metrics are on. */
  id?: string;
  /** The human readable speed "category" of the id. */
  overall_category?: string;
  /** The map of . */
  metrics?: Record<string, UserPageLoadMetricV5>;
  /** The requested URL, which may differ from the resolved "id". */
  initial_url?: string;
}

export const PagespeedApiLoadingExperienceV5: Schema.Schema<PagespeedApiLoadingExperienceV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      origin_fallback: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      overall_category: Schema.optional(Schema.String),
      metrics: Schema.optional(
        Schema.Record(Schema.String, UserPageLoadMetricV5),
      ),
      initial_url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PagespeedApiLoadingExperienceV5",
  }) as any as Schema.Schema<PagespeedApiLoadingExperienceV5>;

export interface PagespeedVersion {
  /** The major version number of PageSpeed used to generate these results. */
  major?: string;
  /** The minor version number of PageSpeed used to generate these results. */
  minor?: string;
}

export const PagespeedVersion: Schema.Schema<PagespeedVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      major: Schema.optional(Schema.String),
      minor: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PagespeedVersion",
  }) as any as Schema.Schema<PagespeedVersion>;

export interface AuditRefs {
  /** Any audit IDs closely relevant to this one. */
  relevantAudits?: Array<string>;
  /** The audit ref id. */
  id?: string;
  /** The weight this audit's score has on the overall category score. */
  weight?: number;
  /** The category group that the audit belongs to (optional). */
  group?: string;
  /** The conventional acronym for the audit/metric. */
  acronym?: string;
}

export const AuditRefs: Schema.Schema<AuditRefs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      relevantAudits: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
      weight: Schema.optional(Schema.Number),
      group: Schema.optional(Schema.String),
      acronym: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "AuditRefs" }) as any as Schema.Schema<AuditRefs>;

export interface LighthouseCategoryV5 {
  /** The human-friendly name of the category. */
  title?: string;
  /** The overall score of the category, the weighted average of all its audits. (The category's score, can be null.) */
  score?: unknown;
  /** The string identifier of the category. */
  id?: string;
  /** A description for the manual audits in the category. */
  manualDescription?: string;
  /** An array of references to all the audit members of this category. */
  auditRefs?: Array<AuditRefs>;
  /** A more detailed description of the category and its importance. */
  description?: string;
}

export const LighthouseCategoryV5: Schema.Schema<LighthouseCategoryV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      score: Schema.optional(Schema.Unknown),
      id: Schema.optional(Schema.String),
      manualDescription: Schema.optional(Schema.String),
      auditRefs: Schema.optional(Schema.Array(AuditRefs)),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LighthouseCategoryV5",
  }) as any as Schema.Schema<LighthouseCategoryV5>;

export interface Categories {
  /** The Progressive-Web-App (PWA) category, containing all pwa related audits. This is deprecated in Lighthouse's 12.0 release. */
  pwa?: LighthouseCategoryV5;
  /** The performance category, containing all performance related audits. */
  performance?: LighthouseCategoryV5;
  /** The best practices category, containing all best practices related audits. */
  "best-practices"?: LighthouseCategoryV5;
  /** The Search-Engine-Optimization (SEO) category, containing all seo related audits. */
  seo?: LighthouseCategoryV5;
  /** The accessibility category, containing all accessibility related audits. */
  accessibility?: LighthouseCategoryV5;
}

export const Categories: Schema.Schema<Categories> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pwa: Schema.optional(LighthouseCategoryV5),
      performance: Schema.optional(LighthouseCategoryV5),
      "best-practices": Schema.optional(LighthouseCategoryV5),
      seo: Schema.optional(LighthouseCategoryV5),
      accessibility: Schema.optional(LighthouseCategoryV5),
    }),
  ).annotate({ identifier: "Categories" }) as any as Schema.Schema<Categories>;

export interface ConfigSettings {
  /** The locale setting. */
  locale?: string;
  /** List of categories of audits the run should conduct. */
  onlyCategories?: unknown;
  /** How Lighthouse should interpret this run in regards to scoring performance metrics and skipping mobile-only tests in desktop. */
  formFactor?: string;
  /** The form factor the emulation should use. This field is deprecated, form_factor should be used instead. */
  emulatedFormFactor?: string;
  /** How Lighthouse was run, e.g. from the Chrome extension or from the npm module. */
  channel?: string;
}

export const ConfigSettings: Schema.Schema<ConfigSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locale: Schema.optional(Schema.String),
      onlyCategories: Schema.optional(Schema.Unknown),
      formFactor: Schema.optional(Schema.String),
      emulatedFormFactor: Schema.optional(Schema.String),
      channel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfigSettings",
  }) as any as Schema.Schema<ConfigSettings>;

export interface RuntimeError {
  /** The enumerated Lighthouse Error code. */
  code?: string;
  /** A human readable message explaining the error code. */
  message?: string;
}

export const RuntimeError: Schema.Schema<RuntimeError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RuntimeError",
  }) as any as Schema.Schema<RuntimeError>;

export interface Timing {
  /** The total duration of Lighthouse's run. */
  total?: number;
}

export const Timing: Schema.Schema<Timing> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      total: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Timing" }) as any as Schema.Schema<Timing>;

export interface Environment {
  /** The benchmark index number that indicates rough device class. */
  benchmarkIndex?: number;
  /** The user agent string of the version of Chrome used. */
  hostUserAgent?: string;
  /** The version of libraries with which these results were generated. Ex: axe-core. */
  credits?: Record<string, string>;
  /** The user agent string that was sent over the network. */
  networkUserAgent?: string;
}

export const Environment: Schema.Schema<Environment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      benchmarkIndex: Schema.optional(Schema.Number),
      hostUserAgent: Schema.optional(Schema.String),
      credits: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      networkUserAgent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Environment",
  }) as any as Schema.Schema<Environment>;

export interface StackPack {
  /** The stack pack id. */
  id?: string;
  /** The stack pack advice strings. */
  descriptions?: Record<string, string>;
  /** The stack pack icon data uri. */
  iconDataURL?: string;
  /** The stack pack title. */
  title?: string;
}

export const StackPack: Schema.Schema<StackPack> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      descriptions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      iconDataURL: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "StackPack" }) as any as Schema.Schema<StackPack>;

export interface RendererFormattedStrings {
  /** Label for a row in a table that shows the User Agent that was used to send out all network requests during the Lighthouse run. */
  runtimeSettingsUANetwork?: string;
  /** Label for a row in a table that shows the version of the Axe library used */
  runtimeSettingsAxeVersion?: string;
  /** The heading shown above a list of audits that were not computerd in the run. */
  manualAuditsGroupTitle?: string;
  /** The title of the lab data performance category. */
  labDataTitle?: string;
  /** Label for a row in a table that describes the CPU throttling conditions that were used during a Lighthouse run, if any. */
  runtimeSettingsCPUThrottling?: string;
  /** Label for a row in a table that shows the URL that was audited during a Lighthouse run. */
  runtimeSettingsUrl?: string;
  /** The label shown above a bulleted list of warnings. */
  warningHeader?: string;
  /** The error string shown next to an erroring audit. */
  errorMissingAuditInfo?: string;
  /** The disclaimer shown under performance explaining that the network can vary. */
  lsPerformanceCategoryDescription?: string;
  /** Option in a dropdown menu that opens a full Lighthouse report in a print dialog. */
  dropdownPrintExpanded?: string;
  /** Option in a dropdown menu that opens the current report in the Lighthouse Viewer Application. */
  dropdownViewer?: string;
  /** Option in a dropdown menu that saves the Lighthouse JSON object to the local system as a '.json' file. */
  dropdownSaveJSON?: string;
  /** Label for button to create an issue against the Lighthouse GitHub project. */
  footerIssue?: string;
  /** Descriptive explanation for emulation setting when emulating a Nexus 5X mobile device. */
  runtimeMobileEmulation?: string;
  /** This label is for a filter checkbox above a table of items */
  thirdPartyResourcesLabel?: string;
  /** Label preceding a radio control for filtering the list of audits. The radio choices are various performance metrics (FCP, LCP, TBT), and if chosen, the audits in the report are hidden if they are not relevant to the selected metric. */
  showRelevantAudits?: string;
  /** Label for a row in a table that shows the time at which a Lighthouse run was conducted; formatted as a timestamp, e.g. Jan 1, 1970 12:00 AM UTC. */
  runtimeSettingsFetchTime?: string;
  /** The label that explains the score gauges scale (0-49, 50-89, 90-100). */
  scorescaleLabel?: string;
  /** Label for a row in a table that shows the estimated CPU power of the machine running Lighthouse. Example row values: 532, 1492, 783. */
  runtimeSettingsBenchmark?: string;
  /** The disclaimer shown below a performance metric value. */
  varianceDisclaimer?: string;
  /** The tooltip text on an expandable chevron icon. */
  auditGroupExpandTooltip?: string;
  /** The heading shown above a list of audits that do not apply to a page. */
  notApplicableAuditsGroupTitle?: string;
  /** The heading that is shown above a list of audits that are passing. */
  passedAuditsGroupTitle?: string;
  /** Label for a row in a table that describes the network throttling conditions that were used during a Lighthouse run, if any. */
  runtimeSettingsNetworkThrottling?: string;
  /** Descriptive explanation for environment throttling that was provided by the runtime environment instead of provided by Lighthouse throttling. */
  throttlingProvided?: string;
  /** Option in a dropdown menu that saves the Lighthouse report HTML locally to the system as a '.html' file. */
  dropdownSaveHTML?: string;
  /** Text link pointing to the Lighthouse scoring calculator. This link immediately follows a sentence stating the performance score is calculated from the perf metrics. */
  calculatorLink?: string;
  /** Option in a dropdown menu that saves the current report as a new GitHub Gist. */
  dropdownSaveGist?: string;
  /** Label for a row in a table that shows the User Agent that was detected on the Host machine that ran Lighthouse. */
  runtimeSettingsUA?: string;
  /** Descriptive explanation for a runtime setting that is set to an unknown value. */
  runtimeUnknown?: string;
  /** Option in a dropdown menu that copies the Lighthouse JSON object to the system clipboard. */
  dropdownCopyJSON?: string;
  /** Descriptive explanation for emulation setting when no device emulation is set. */
  runtimeNoEmulation?: string;
  /** The heading for the estimated page load savings opportunity of an audit. */
  opportunityResourceColumnLabel?: string;
  /** The label for the initial request in a critical request chain. */
  crcInitialNavigation?: string;
  /** The heading for the estimated page load savings of opportunity audits. */
  opportunitySavingsColumnLabel?: string;
  /** Descriptive explanation for emulation setting when emulating a generic desktop form factor, as opposed to a mobile-device like form factor. */
  runtimeDesktopEmulation?: string;
  /** Title of the Runtime settings table in a Lighthouse report. Runtime settings are the environment configurations that a specific report used at auditing time. */
  runtimeSettingsTitle?: string;
  /** The label shown preceding important warnings that may have invalidated an entire report. */
  toplevelWarningsMessage?: string;
  /** The label for the button to show all lines of a snippet */
  snippetExpandButtonLabel?: string;
  /** Label for a row in a table that describes the kind of device that was emulated for the Lighthouse run. Example values for row elements: 'No Emulation', 'Emulated Desktop', etc. */
  runtimeSettingsDevice?: string;
  /** Option in a dropdown menu that toggles the themeing of the report between Light(default) and Dark themes. */
  dropdownDarkTheme?: string;
  /** The label for the button to show only a few lines of a snippet */
  snippetCollapseButtonLabel?: string;
  /** The label shown next to an audit or metric that has had an error. */
  errorLabel?: string;
  /** Option in a dropdown menu that opens a small, summary report in a print dialog. */
  dropdownPrintSummary?: string;
  /** The label for values shown in the summary of critical request chains. */
  crcLongestDurationLabel?: string;
  /** Label for a button that opens the Treemap App */
  viewTreemapLabel?: string;
  /** Label for a row in a table that shows in what tool Lighthouse is being run (e.g. The lighthouse CLI, Chrome DevTools, Lightrider, WebPageTest, etc). */
  runtimeSettingsChannel?: string;
  /** The heading that is shown above a list of audits that have warnings */
  warningAuditsGroupTitle?: string;
}

export const RendererFormattedStrings: Schema.Schema<RendererFormattedStrings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      runtimeSettingsUANetwork: Schema.optional(Schema.String),
      runtimeSettingsAxeVersion: Schema.optional(Schema.String),
      manualAuditsGroupTitle: Schema.optional(Schema.String),
      labDataTitle: Schema.optional(Schema.String),
      runtimeSettingsCPUThrottling: Schema.optional(Schema.String),
      runtimeSettingsUrl: Schema.optional(Schema.String),
      warningHeader: Schema.optional(Schema.String),
      errorMissingAuditInfo: Schema.optional(Schema.String),
      lsPerformanceCategoryDescription: Schema.optional(Schema.String),
      dropdownPrintExpanded: Schema.optional(Schema.String),
      dropdownViewer: Schema.optional(Schema.String),
      dropdownSaveJSON: Schema.optional(Schema.String),
      footerIssue: Schema.optional(Schema.String),
      runtimeMobileEmulation: Schema.optional(Schema.String),
      thirdPartyResourcesLabel: Schema.optional(Schema.String),
      showRelevantAudits: Schema.optional(Schema.String),
      runtimeSettingsFetchTime: Schema.optional(Schema.String),
      scorescaleLabel: Schema.optional(Schema.String),
      runtimeSettingsBenchmark: Schema.optional(Schema.String),
      varianceDisclaimer: Schema.optional(Schema.String),
      auditGroupExpandTooltip: Schema.optional(Schema.String),
      notApplicableAuditsGroupTitle: Schema.optional(Schema.String),
      passedAuditsGroupTitle: Schema.optional(Schema.String),
      runtimeSettingsNetworkThrottling: Schema.optional(Schema.String),
      throttlingProvided: Schema.optional(Schema.String),
      dropdownSaveHTML: Schema.optional(Schema.String),
      calculatorLink: Schema.optional(Schema.String),
      dropdownSaveGist: Schema.optional(Schema.String),
      runtimeSettingsUA: Schema.optional(Schema.String),
      runtimeUnknown: Schema.optional(Schema.String),
      dropdownCopyJSON: Schema.optional(Schema.String),
      runtimeNoEmulation: Schema.optional(Schema.String),
      opportunityResourceColumnLabel: Schema.optional(Schema.String),
      crcInitialNavigation: Schema.optional(Schema.String),
      opportunitySavingsColumnLabel: Schema.optional(Schema.String),
      runtimeDesktopEmulation: Schema.optional(Schema.String),
      runtimeSettingsTitle: Schema.optional(Schema.String),
      toplevelWarningsMessage: Schema.optional(Schema.String),
      snippetExpandButtonLabel: Schema.optional(Schema.String),
      runtimeSettingsDevice: Schema.optional(Schema.String),
      dropdownDarkTheme: Schema.optional(Schema.String),
      snippetCollapseButtonLabel: Schema.optional(Schema.String),
      errorLabel: Schema.optional(Schema.String),
      dropdownPrintSummary: Schema.optional(Schema.String),
      crcLongestDurationLabel: Schema.optional(Schema.String),
      viewTreemapLabel: Schema.optional(Schema.String),
      runtimeSettingsChannel: Schema.optional(Schema.String),
      warningAuditsGroupTitle: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RendererFormattedStrings",
  }) as any as Schema.Schema<RendererFormattedStrings>;

export interface I18n {
  /** Internationalized strings that are formatted to the locale in configSettings. */
  rendererFormattedStrings?: RendererFormattedStrings;
}

export const I18n: Schema.Schema<I18n> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rendererFormattedStrings: Schema.optional(RendererFormattedStrings),
    }),
  ).annotate({ identifier: "I18n" }) as any as Schema.Schema<I18n>;

export interface LighthouseResultV5 {
  /** Map of audits in the LHR. */
  audits?: Record<string, LighthouseAuditResultV5>;
  /** The final resolved url that was audited. */
  finalUrl?: string;
  /** URL displayed on the page after Lighthouse finishes. */
  finalDisplayedUrl?: string;
  /** Map of categories in the LHR. */
  categories?: Categories;
  /** The configuration settings for this LHR. */
  configSettings?: ConfigSettings;
  /** The time that this run was fetched. */
  fetchTime?: string;
  /** Map of category groups in the LHR. */
  categoryGroups?: Record<string, CategoryGroupV5>;
  /** A top-level error message that, if present, indicates a serious enough problem that this Lighthouse result may need to be discarded. */
  runtimeError?: RuntimeError;
  /** Timing information for this LHR. */
  timing?: Timing;
  /** The original requested url. */
  requestedUrl?: string;
  /** Entity classification data. */
  entities?: Array<LhrEntity>;
  /** The user agent that was used to run this LHR. */
  userAgent?: string;
  /** Environment settings that were used when making this LHR. */
  environment?: Environment;
  /** Screenshot data of the full page, along with node rects relevant to the audit results. */
  fullPageScreenshot?: unknown;
  /** The Stack Pack advice strings. */
  stackPacks?: Array<StackPack>;
  /** The internationalization strings that are required to render the LHR. */
  i18n?: I18n;
  /** The lighthouse version that was used to generate this LHR. */
  lighthouseVersion?: string;
  /** List of all run warnings in the LHR. Will always output to at least `[]`. */
  runWarnings?: Array<unknown>;
  /** URL of the main document request of the final navigation. */
  mainDocumentUrl?: string;
}

export const LighthouseResultV5: Schema.Schema<LighthouseResultV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audits: Schema.optional(
        Schema.Record(Schema.String, LighthouseAuditResultV5),
      ),
      finalUrl: Schema.optional(Schema.String),
      finalDisplayedUrl: Schema.optional(Schema.String),
      categories: Schema.optional(Categories),
      configSettings: Schema.optional(ConfigSettings),
      fetchTime: Schema.optional(Schema.String),
      categoryGroups: Schema.optional(
        Schema.Record(Schema.String, CategoryGroupV5),
      ),
      runtimeError: Schema.optional(RuntimeError),
      timing: Schema.optional(Timing),
      requestedUrl: Schema.optional(Schema.String),
      entities: Schema.optional(Schema.Array(LhrEntity)),
      userAgent: Schema.optional(Schema.String),
      environment: Schema.optional(Environment),
      fullPageScreenshot: Schema.optional(Schema.Unknown),
      stackPacks: Schema.optional(Schema.Array(StackPack)),
      i18n: Schema.optional(I18n),
      lighthouseVersion: Schema.optional(Schema.String),
      runWarnings: Schema.optional(Schema.Array(Schema.Unknown)),
      mainDocumentUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LighthouseResultV5",
  }) as any as Schema.Schema<LighthouseResultV5>;

export interface PagespeedApiPagespeedResponseV5 {
  /** Kind of result. */
  kind?: string;
  /** The captcha verify result */
  captchaResult?: string;
  /** The UTC timestamp of this analysis. */
  analysisUTCTimestamp?: string;
  /** The version of PageSpeed used to generate these results. */
  version?: PagespeedVersion;
  /** Lighthouse response for the audit url as an object. */
  lighthouseResult?: LighthouseResultV5;
  /** Metrics of the aggregated page loading experience of the origin */
  originLoadingExperience?: PagespeedApiLoadingExperienceV5;
  /** Metrics of end users' page loading experience. */
  loadingExperience?: PagespeedApiLoadingExperienceV5;
  /** Canonicalized and final URL for the document, after following page redirects (if any). */
  id?: string;
}

export const PagespeedApiPagespeedResponseV5: Schema.Schema<PagespeedApiPagespeedResponseV5> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      captchaResult: Schema.optional(Schema.String),
      analysisUTCTimestamp: Schema.optional(Schema.String),
      version: Schema.optional(PagespeedVersion),
      lighthouseResult: Schema.optional(LighthouseResultV5),
      originLoadingExperience: Schema.optional(PagespeedApiLoadingExperienceV5),
      loadingExperience: Schema.optional(PagespeedApiLoadingExperienceV5),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PagespeedApiPagespeedResponseV5",
  }) as any as Schema.Schema<PagespeedApiPagespeedResponseV5>;

// ==========================================================================
// Operations
// ==========================================================================

export interface RunpagespeedPagespeedapiRequest {
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
  /** A Lighthouse category to run; if none are given, only Performance category will be run */
  category?:
    | "CATEGORY_UNSPECIFIED"
    | "ACCESSIBILITY"
    | "BEST_PRACTICES"
    | "PERFORMANCE"
    | "PWA"
    | "SEO"
    | (string & {})[];
  /** The locale used to localize formatted results */
  locale?: string;
}

export const RunpagespeedPagespeedapiRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    strategy: Schema.optional(Schema.String).pipe(T.HttpQuery("strategy")),
    url: Schema.String.pipe(T.HttpQuery("url")),
    utm_campaign: Schema.optional(Schema.String).pipe(
      T.HttpQuery("utm_campaign"),
    ),
    utm_source: Schema.optional(Schema.String).pipe(T.HttpQuery("utm_source")),
    captchaToken: Schema.optional(Schema.String).pipe(
      T.HttpQuery("captchaToken"),
    ),
    category: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("category"),
    ),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.Http({ method: "GET", path: "pagespeedonline/v5/runPagespeed" }),
    svc,
  ) as unknown as Schema.Schema<RunpagespeedPagespeedapiRequest>;

export type RunpagespeedPagespeedapiResponse = PagespeedApiPagespeedResponseV5;
export const RunpagespeedPagespeedapiResponse =
  /*@__PURE__*/ /*#__PURE__*/ PagespeedApiPagespeedResponseV5;

export type RunpagespeedPagespeedapiError = DefaultErrors;

/** Runs PageSpeed analysis on the page at the specified URL, and returns PageSpeed scores, a list of suggestions to make that page faster, and other information. */
export const runpagespeedPagespeedapi: API.OperationMethod<
  RunpagespeedPagespeedapiRequest,
  RunpagespeedPagespeedapiResponse,
  RunpagespeedPagespeedapiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RunpagespeedPagespeedapiRequest,
  output: RunpagespeedPagespeedapiResponse,
  errors: [],
}));
