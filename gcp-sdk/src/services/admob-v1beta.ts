// ==========================================================================
// AdMob API (admob v1beta)
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
  name: "admob",
  version: "v1beta",
  rootUrl: "https://admob.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PublisherAccount {
  /** The unique ID by which this publisher account can be identified in the API requests (for example, pub-1234567890). */
  publisherId?: string;
  /** The time zone that is used in reports that are generated for this account. The value is a time-zone ID as specified by the CLDR project, for example, "America/Los_Angeles". */
  reportingTimeZone?: string;
  /** Resource name of this account. Format is accounts/{publisher_id}. */
  name?: string;
  /** Currency code of the earning-related metrics, which is the 3-letter code defined in ISO 4217. The daily average rate is used for the currency conversion. */
  currencyCode?: string;
}

export const PublisherAccount: Schema.Schema<PublisherAccount> = Schema.suspend(
  () =>
    Schema.Struct({
      publisherId: Schema.optional(Schema.String),
      reportingTimeZone: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PublisherAccount",
}) as any as Schema.Schema<PublisherAccount>;

export interface ListPublisherAccountsResponse {
  /** Publisher that the client credentials can access. */
  account?: Array<PublisherAccount>;
  /** If not empty, indicates that there might be more accounts for the request; you must pass this value in a new `ListPublisherAccountsRequest`. */
  nextPageToken?: string;
}

export const ListPublisherAccountsResponse: Schema.Schema<ListPublisherAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      account: Schema.optional(Schema.Array(PublisherAccount)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPublisherAccountsResponse",
  }) as any as Schema.Schema<ListPublisherAccountsResponse>;

export interface AppLinkedAppInfo {
  /** The app store ID of the app; present if and only if the app is linked to an app store. If the app is added to the Google Play store, it will be the application ID of the app. For example: "com.example.myapp". See https://developer.android.com/studio/build/application-id. If the app is added to the Apple App Store, it will be app store ID. For example "105169111". Note that setting the app store id is considered an irreversible action. Once an app is linked, it cannot be unlinked. */
  appStoreId?: string;
  /** Optional. The app store information for published Android apps. This field is only used for apps on the Android platform and will be ignored if the PLATFORM is set to iOS. The default value is the Google Play App store. This field can be updated after app is created. If the app is not published, this field will not be included in the response. */
  androidAppStores?: Array<
    | "ANDROID_APP_STORE_UNSPECIFIED"
    | "GOOGLE_PLAY_APP_STORE"
    | "AMAZON_APP_STORE"
    | "OPPO_APP_STORE"
    | "SAMSUNG_APP_STORE"
    | "VIVO_APP_STORE"
    | "XIAOMI_APP_STORE"
    | (string & {})
  >;
  /** Output only. Display name of the app as it appears in the app store. This is an output-only field, and may be empty if the app cannot be found in the store. */
  displayName?: string;
}

export const AppLinkedAppInfo: Schema.Schema<AppLinkedAppInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      appStoreId: Schema.optional(Schema.String),
      androidAppStores: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AppLinkedAppInfo",
}) as any as Schema.Schema<AppLinkedAppInfo>;

export interface AppManualAppInfo {
  /** The display name of the app as shown in the AdMob UI, which is provided by the user. The maximum length allowed is 80 characters. */
  displayName?: string;
}

export const AppManualAppInfo: Schema.Schema<AppManualAppInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AppManualAppInfo",
}) as any as Schema.Schema<AppManualAppInfo>;

export interface App {
  /** Output only. The approval state for the app. The field is read-only. */
  appApprovalState?:
    | "APP_APPROVAL_STATE_UNSPECIFIED"
    | "ACTION_REQUIRED"
    | "IN_REVIEW"
    | "APPROVED"
    | (string & {});
  /** Describes the platform of the app. Limited to "IOS" and "ANDROID". */
  platform?: string;
  /** Immutable. The information for an app that is linked to an app store. This field is present if and only if the app is linked to an app store. */
  linkedAppInfo?: AppLinkedAppInfo;
  /** The externally visible ID of the app which can be used to integrate with the AdMob SDK. This is a read only property. Example: ca-app-pub-9876543210987654~0123456789 */
  appId?: string;
  /** Resource name for this app. Format is accounts/{publisher_id}/apps/{app_id_fragment} Example: accounts/pub-9876543210987654/apps/0123456789 */
  name?: string;
  /** The information for an app that is not linked to any app store. After an app is linked, this information is still retrivable. If no name is provided for the app upon creation, a placeholder name will be used. */
  manualAppInfo?: AppManualAppInfo;
}

export const App: Schema.Schema<App> = Schema.suspend(() =>
  Schema.Struct({
    appApprovalState: Schema.optional(Schema.String),
    platform: Schema.optional(Schema.String),
    linkedAppInfo: Schema.optional(AppLinkedAppInfo),
    appId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    manualAppInfo: Schema.optional(AppManualAppInfo),
  }),
).annotate({ identifier: "App" }) as any as Schema.Schema<App>;

export interface ReportRowDimensionValue {
  /** Dimension value in the format specified in the report's spec Dimension enum. */
  value?: string;
  /** The localized string representation of the value. If unspecified, the display label should be derived from the value. */
  displayLabel?: string;
}

export const ReportRowDimensionValue: Schema.Schema<ReportRowDimensionValue> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      displayLabel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReportRowDimensionValue",
  }) as any as Schema.Schema<ReportRowDimensionValue>;

export interface AdapterAdapterConfigMetadata {
  /** This is used to fill the key of the [ad_unit_configurations](#AdUnitMapping.ad_unit_configurations). */
  adapterConfigMetadataId?: string;
  /** Name of the adapter configuration metadata. */
  adapterConfigMetadataLabel?: string;
  /** Whether this metadata is required for configuring the AdUnitMappings. */
  isRequired?: boolean;
}

export const AdapterAdapterConfigMetadata: Schema.Schema<AdapterAdapterConfigMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      adapterConfigMetadataId: Schema.optional(Schema.String),
      adapterConfigMetadataLabel: Schema.optional(Schema.String),
      isRequired: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AdapterAdapterConfigMetadata",
  }) as any as Schema.Schema<AdapterAdapterConfigMetadata>;

export interface Adapter {
  /** Output only. Resource name of the adapter. Format is: accounts/{publisher_id}/adSources/{ad_source_id}/adapters/{adapter_id}. */
  name?: string;
  /** Output only. Indicates the formats of the ad units supported by this adapter. */
  formats?: Array<string>;
  /** Output only. ID of this adapter. It is used to set [adapter_id](#AdUnitMapping.adapter_id). */
  adapterId?: string;
  /** Output only. Configuration metadata associated with this adapter. */
  adapterConfigMetadata?: Array<AdapterAdapterConfigMetadata>;
  /** Output only. Mobile application platform supported by this adapter. Supported values are: IOS, ANDROID, WINDOWS_PHONE */
  platform?: string;
  /** Output only. The display name of this adapter. */
  title?: string;
}

export const Adapter: Schema.Schema<Adapter> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    formats: Schema.optional(Schema.Array(Schema.String)),
    adapterId: Schema.optional(Schema.String),
    adapterConfigMetadata: Schema.optional(
      Schema.Array(AdapterAdapterConfigMetadata),
    ),
    platform: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Adapter" }) as any as Schema.Schema<Adapter>;

export interface MediationGroupTargeting {
  /** The parameter can be used to target ad requests based on the availability of the IDFA. If set to ALL, the mediation group applies to all ad requests (with or without IDFA). If set to AVAILABLE, the mediation group applies to ad requests with IDFA. If set to NOT_AVAILABLE, the mediation group applies to ad requests without IDFA. Doesn't need to be specified for an ANDROID device. */
  idfaTargeting?:
    | "IDFA_TARGETING_UNSPECIFIED"
    | "ALL"
    | "AVAILABLE"
    | "NOT_AVAILABLE"
    | (string & {});
  /** The Unicode country/region code (CLDR) of a location, such as "US". Unset if this mediation group targets all available regions. For more information, see http://www.unicode.org/reports/tr35/#unicode_region_subtag. */
  targetedRegionCodes?: Array<string>;
  /** Ad format targeted by this mediation group. Examples: "BANNER", "NATIVE". */
  format?: string;
  /** Ad units targeted by this mediation group. Example: "ca-app-pub-1234/8790". */
  adUnitIds?: Array<string>;
  /** Describes the platform of the app. Examples: "IOS", "ANDROID". */
  platform?: string;
  /** The Unicode country/region code (CLDR) of a location, such as "US". Unset if this mediation group does not exclude any region. */
  excludedRegionCodes?: Array<string>;
}

export const MediationGroupTargeting: Schema.Schema<MediationGroupTargeting> =
  Schema.suspend(() =>
    Schema.Struct({
      idfaTargeting: Schema.optional(Schema.String),
      targetedRegionCodes: Schema.optional(Schema.Array(Schema.String)),
      format: Schema.optional(Schema.String),
      adUnitIds: Schema.optional(Schema.Array(Schema.String)),
      platform: Schema.optional(Schema.String),
      excludedRegionCodes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "MediationGroupTargeting",
  }) as any as Schema.Schema<MediationGroupTargeting>;

export interface Admob_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Admob_Date: Schema.Schema<Admob_Date> = Schema.suspend(() =>
  Schema.Struct({
    year: Schema.optional(Schema.Number),
    month: Schema.optional(Schema.Number),
    day: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Admob_Date" }) as any as Schema.Schema<Admob_Date>;

export interface DateRange {
  /** Start date of the date range, inclusive. Must be less than or equal to the end date. */
  startDate?: Admob_Date;
  /** End date of the date range, inclusive. Must be greater than or equal to the start date. */
  endDate?: Admob_Date;
}

export const DateRange: Schema.Schema<DateRange> = Schema.suspend(() =>
  Schema.Struct({
    startDate: Schema.optional(Admob_Date),
    endDate: Schema.optional(Admob_Date),
  }),
).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface LocalizationSettings {
  /** Currency code of the earning related metrics, which is the 3-letter code defined in ISO 4217. The daily average rate is used for the currency conversion. Defaults to the account currency code if unspecified. */
  currencyCode?: string;
  /** Language used for any localized text, such as some dimension value display labels. The language tag defined in the IETF BCP47. Defaults to 'en-US' if unspecified. */
  languageCode?: string;
}

export const LocalizationSettings: Schema.Schema<LocalizationSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      currencyCode: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocalizationSettings",
  }) as any as Schema.Schema<LocalizationSettings>;

export interface ReportHeader {
  /** The date range for which the report is generated. This is identical to the range specified in the report request. */
  dateRange?: DateRange;
  /** Localization settings of the report. This is identical to the settings in the report request. */
  localizationSettings?: LocalizationSettings;
  /** The report time zone. The value is a time-zone ID as specified by the CLDR project, for example, "America/Los_Angeles". */
  reportingTimeZone?: string;
}

export const ReportHeader: Schema.Schema<ReportHeader> = Schema.suspend(() =>
  Schema.Struct({
    dateRange: Schema.optional(DateRange),
    localizationSettings: Schema.optional(LocalizationSettings),
    reportingTimeZone: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ReportHeader",
}) as any as Schema.Schema<ReportHeader>;

export interface CampaignReportSpec {
  /** List of metrics of the report. A report must specify at least one metric. */
  metrics?: Array<
    | "METRIC_UNSPECIFIED"
    | "IMPRESSIONS"
    | "CLICKS"
    | "CLICK_THROUGH_RATE"
    | "INSTALLS"
    | "ESTIMATED_COST"
    | "AVERAGE_CPI"
    | "INTERACTIONS"
    | (string & {})
  >;
  /** The date range for which the report is generated. The max range is 30 days. */
  dateRange?: DateRange;
  /** List of dimensions of the report. The value combination of these dimensions determines the row of the report. If no dimensions are specified, the report returns a single row of requested metrics for the entire account. */
  dimensions?: Array<
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "CAMPAIGN_ID"
    | "CAMPAIGN_NAME"
    | "AD_ID"
    | "AD_NAME"
    | "PLACEMENT_ID"
    | "PLACEMENT_NAME"
    | "PLACEMENT_PLATFORM"
    | "COUNTRY"
    | "FORMAT"
    | (string & {})
  >;
  /** Language used for any localized text, such as certain applicable dimension values. The language tag is defined in the IETF BCP47. Defaults to 'en-US' if unspecified or invalid. */
  languageCode?: string;
}

export const CampaignReportSpec: Schema.Schema<CampaignReportSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      metrics: Schema.optional(Schema.Array(Schema.String)),
      dateRange: Schema.optional(DateRange),
      dimensions: Schema.optional(Schema.Array(Schema.String)),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CampaignReportSpec",
  }) as any as Schema.Schema<CampaignReportSpec>;

export interface GenerateCampaignReportRequest {
  /** Campaign report specification. */
  reportSpec?: CampaignReportSpec;
}

export const GenerateCampaignReportRequest: Schema.Schema<GenerateCampaignReportRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      reportSpec: Schema.optional(CampaignReportSpec),
    }),
  ).annotate({
    identifier: "GenerateCampaignReportRequest",
  }) as any as Schema.Schema<GenerateCampaignReportRequest>;

export interface MediationGroupMediationGroupLine {
  /** The ID of the ad source this mediation line is associated with. */
  adSourceId?: string;
  /** Indicates how the CPM for this mediation line is provided. Note that `MANUAL` and `LIVE` are the only fully-supported mode at the moment. Please use the AdMob UI (https://admob.google.com) if you wish to create or update to other cpm modes. */
  cpmMode?: "CPM_MODE_UNSPECIFIED" | "LIVE" | "MANUAL" | "ANO" | (string & {});
  /** References of the ad unit mappings for each ad unit associated with this mediation line. Key is the ad unit ID, value is resource name of the ad unit mapping. For mediation lines where the ad source id is the AdMob Network, ad unit mappings will be ignored. */
  adUnitMappings?: Record<string, string>;
  /** The status of the mediation group line. Only enabled mediation group lines will be served. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ENABLED"
    | "DISABLED"
    | "REMOVED"
    | (string & {});
  /** The 16 digit ID for this mediation line e.g. 0123456789012345. When creating a new mediation group line, use a distinct negative integer as the ID place holder. */
  id?: string;
  /** User-provided label for this mediation line. The maximum length allowed is 255 characters. */
  displayName?: string;
  /** The CPM for this allocation line. $0.01 is the minimum allowed amount. For LIVE CPM modes, the default amount is $0.01. This value is ignored if `cpm_mode` is `LIVE`. **Warning:** "USD" is the only supported currency at the moment. The unit is in micros. */
  cpmMicros?: string;
  /** Output only. The Mediation A/B experiment variant to which the mediation group line belongs to. */
  experimentVariant?:
    | "VARIANT_UNSPECIFIED"
    | "VARIANT_A"
    | "VARIANT_B"
    | "ORIGINAL"
    | (string & {});
}

export const MediationGroupMediationGroupLine: Schema.Schema<MediationGroupMediationGroupLine> =
  Schema.suspend(() =>
    Schema.Struct({
      adSourceId: Schema.optional(Schema.String),
      cpmMode: Schema.optional(Schema.String),
      adUnitMappings: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      state: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      cpmMicros: Schema.optional(Schema.String),
      experimentVariant: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MediationGroupMediationGroupLine",
  }) as any as Schema.Schema<MediationGroupMediationGroupLine>;

export interface StringList {
  /** The string values. */
  values?: Array<string>;
}

export const StringList: Schema.Schema<StringList> = Schema.suspend(() =>
  Schema.Struct({
    values: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "StringList" }) as any as Schema.Schema<StringList>;

export interface NetworkReportSpecDimensionFilter {
  /** Matches a row if its value for the specified dimension is in one of the values specified in this condition. */
  matchesAny?: StringList;
  /** Applies the filter criterion to the specified dimension. */
  dimension?:
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "MONTH"
    | "WEEK"
    | "AD_UNIT"
    | "APP"
    | "AD_TYPE"
    | "COUNTRY"
    | "FORMAT"
    | "PLATFORM"
    | "MOBILE_OS_VERSION"
    | "GMA_SDK_VERSION"
    | "APP_VERSION_NAME"
    | "SERVING_RESTRICTION"
    | (string & {});
}

export const NetworkReportSpecDimensionFilter: Schema.Schema<NetworkReportSpecDimensionFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchesAny: Schema.optional(StringList),
      dimension: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NetworkReportSpecDimensionFilter",
  }) as any as Schema.Schema<NetworkReportSpecDimensionFilter>;

export interface NetworkReportSpecSortCondition {
  /** Sort by the specified metric. */
  metric?:
    | "METRIC_UNSPECIFIED"
    | "AD_REQUESTS"
    | "CLICKS"
    | "ESTIMATED_EARNINGS"
    | "IMPRESSIONS"
    | "IMPRESSION_CTR"
    | "IMPRESSION_RPM"
    | "MATCHED_REQUESTS"
    | "MATCH_RATE"
    | "SHOW_RATE"
    | (string & {});
  /** Sort by the specified dimension. */
  dimension?:
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "MONTH"
    | "WEEK"
    | "AD_UNIT"
    | "APP"
    | "AD_TYPE"
    | "COUNTRY"
    | "FORMAT"
    | "PLATFORM"
    | "MOBILE_OS_VERSION"
    | "GMA_SDK_VERSION"
    | "APP_VERSION_NAME"
    | "SERVING_RESTRICTION"
    | (string & {});
  /** Sorting order of the dimension or metric. */
  order?: "SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
}

export const NetworkReportSpecSortCondition: Schema.Schema<NetworkReportSpecSortCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      metric: Schema.optional(Schema.String),
      dimension: Schema.optional(Schema.String),
      order: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NetworkReportSpecSortCondition",
  }) as any as Schema.Schema<NetworkReportSpecSortCondition>;

export interface NetworkReportSpec {
  /** Describes which report rows to match based on their dimension values. */
  dimensionFilters?: Array<NetworkReportSpecDimensionFilter>;
  /** Describes the sorting of report rows. The order of the condition in the list defines its precedence; the earlier the condition, the higher its precedence. If no sort conditions are specified, the row ordering is undefined. */
  sortConditions?: Array<NetworkReportSpecSortCondition>;
  /** List of dimensions of the report. The value combination of these dimensions determines the row of the report. If no dimensions are specified, the report returns a single row of requested metrics for the entire account. */
  dimensions?: Array<
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "MONTH"
    | "WEEK"
    | "AD_UNIT"
    | "APP"
    | "AD_TYPE"
    | "COUNTRY"
    | "FORMAT"
    | "PLATFORM"
    | "MOBILE_OS_VERSION"
    | "GMA_SDK_VERSION"
    | "APP_VERSION_NAME"
    | "SERVING_RESTRICTION"
    | (string & {})
  >;
  /** List of metrics of the report. A report must specify at least one metric. */
  metrics?: Array<
    | "METRIC_UNSPECIFIED"
    | "AD_REQUESTS"
    | "CLICKS"
    | "ESTIMATED_EARNINGS"
    | "IMPRESSIONS"
    | "IMPRESSION_CTR"
    | "IMPRESSION_RPM"
    | "MATCHED_REQUESTS"
    | "MATCH_RATE"
    | "SHOW_RATE"
    | (string & {})
  >;
  /** Maximum number of report data rows to return. If the value is not set, the API returns as many rows as possible, up to 100000. Acceptable values are 1-100000, inclusive. Values larger than 100000 return an error. */
  maxReportRows?: number;
  /** A report time zone. Accepts an IANA TZ name values, such as "America/Los_Angeles." If no time zone is defined, the account default takes effect. Check default value by the get account action. **Warning:** The "America/Los_Angeles" is the only supported value at the moment. */
  timeZone?: string;
  /** The date range for which the report is generated. */
  dateRange?: DateRange;
  /** Localization settings of the report. */
  localizationSettings?: LocalizationSettings;
}

export const NetworkReportSpec: Schema.Schema<NetworkReportSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      dimensionFilters: Schema.optional(
        Schema.Array(NetworkReportSpecDimensionFilter),
      ),
      sortConditions: Schema.optional(
        Schema.Array(NetworkReportSpecSortCondition),
      ),
      dimensions: Schema.optional(Schema.Array(Schema.String)),
      metrics: Schema.optional(Schema.Array(Schema.String)),
      maxReportRows: Schema.optional(Schema.Number),
      timeZone: Schema.optional(Schema.String),
      dateRange: Schema.optional(DateRange),
      localizationSettings: Schema.optional(LocalizationSettings),
    }),
  ).annotate({
    identifier: "NetworkReportSpec",
  }) as any as Schema.Schema<NetworkReportSpec>;

export interface GenerateNetworkReportRequest {
  /** Network report specification. */
  reportSpec?: NetworkReportSpec;
}

export const GenerateNetworkReportRequest: Schema.Schema<GenerateNetworkReportRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      reportSpec: Schema.optional(NetworkReportSpec),
    }),
  ).annotate({
    identifier: "GenerateNetworkReportRequest",
  }) as any as Schema.Schema<GenerateNetworkReportRequest>;

export interface AdUnitRewardSettings {
  /** Reward amount for this ad unit. */
  unitAmount?: string;
  /** Reward item for this ad unit. */
  unitType?: string;
}

export const AdUnitRewardSettings: Schema.Schema<AdUnitRewardSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      unitAmount: Schema.optional(Schema.String),
      unitType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdUnitRewardSettings",
  }) as any as Schema.Schema<AdUnitRewardSettings>;

export interface MediationReportSpecDimensionFilter {
  /** Matches a row if its value for the specified dimension is in one of the values specified in this condition. */
  matchesAny?: StringList;
  /** Applies the filter criterion to the specified dimension. */
  dimension?:
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "MONTH"
    | "WEEK"
    | "AD_SOURCE"
    | "AD_SOURCE_INSTANCE"
    | "AD_UNIT"
    | "APP"
    | "MEDIATION_GROUP"
    | "COUNTRY"
    | "FORMAT"
    | "PLATFORM"
    | "MOBILE_OS_VERSION"
    | "GMA_SDK_VERSION"
    | "APP_VERSION_NAME"
    | "SERVING_RESTRICTION"
    | (string & {});
}

export const MediationReportSpecDimensionFilter: Schema.Schema<MediationReportSpecDimensionFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchesAny: Schema.optional(StringList),
      dimension: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MediationReportSpecDimensionFilter",
  }) as any as Schema.Schema<MediationReportSpecDimensionFilter>;

export interface MediationReportSpecSortCondition {
  /** Sort by the specified dimension. */
  dimension?:
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "MONTH"
    | "WEEK"
    | "AD_SOURCE"
    | "AD_SOURCE_INSTANCE"
    | "AD_UNIT"
    | "APP"
    | "MEDIATION_GROUP"
    | "COUNTRY"
    | "FORMAT"
    | "PLATFORM"
    | "MOBILE_OS_VERSION"
    | "GMA_SDK_VERSION"
    | "APP_VERSION_NAME"
    | "SERVING_RESTRICTION"
    | (string & {});
  /** Sorting order of the dimension or metric. */
  order?: "SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING" | (string & {});
  /** Sort by the specified metric. */
  metric?:
    | "METRIC_UNSPECIFIED"
    | "AD_REQUESTS"
    | "CLICKS"
    | "ESTIMATED_EARNINGS"
    | "IMPRESSIONS"
    | "IMPRESSION_CTR"
    | "MATCHED_REQUESTS"
    | "MATCH_RATE"
    | "OBSERVED_ECPM"
    | (string & {});
}

export const MediationReportSpecSortCondition: Schema.Schema<MediationReportSpecSortCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      dimension: Schema.optional(Schema.String),
      order: Schema.optional(Schema.String),
      metric: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MediationReportSpecSortCondition",
  }) as any as Schema.Schema<MediationReportSpecSortCondition>;

export interface MediationReportSpec {
  /** Localization settings of the report. */
  localizationSettings?: LocalizationSettings;
  /** The date range for which the report is generated. */
  dateRange?: DateRange;
  /** List of metrics of the report. A report must specify at least one metric. */
  metrics?: Array<
    | "METRIC_UNSPECIFIED"
    | "AD_REQUESTS"
    | "CLICKS"
    | "ESTIMATED_EARNINGS"
    | "IMPRESSIONS"
    | "IMPRESSION_CTR"
    | "MATCHED_REQUESTS"
    | "MATCH_RATE"
    | "OBSERVED_ECPM"
    | (string & {})
  >;
  /** Maximum number of report data rows to return. If the value is not set, the API returns as many rows as possible, up to 100000. Acceptable values are 1-100000, inclusive. Values larger than 100000 return an error. */
  maxReportRows?: number;
  /** A report time zone. Accepts an IANA TZ name values, such as "America/Los_Angeles." If no time zone is defined, the account default takes effect. Check default value by the get account action. **Warning:** The "America/Los_Angeles" is the only supported value at the moment. */
  timeZone?: string;
  /** List of dimensions of the report. The value combination of these dimensions determines the row of the report. If no dimensions are specified, the report returns a single row of requested metrics for the entire account. */
  dimensions?: Array<
    | "DIMENSION_UNSPECIFIED"
    | "DATE"
    | "MONTH"
    | "WEEK"
    | "AD_SOURCE"
    | "AD_SOURCE_INSTANCE"
    | "AD_UNIT"
    | "APP"
    | "MEDIATION_GROUP"
    | "COUNTRY"
    | "FORMAT"
    | "PLATFORM"
    | "MOBILE_OS_VERSION"
    | "GMA_SDK_VERSION"
    | "APP_VERSION_NAME"
    | "SERVING_RESTRICTION"
    | (string & {})
  >;
  /** Describes which report rows to match based on their dimension values. */
  dimensionFilters?: Array<MediationReportSpecDimensionFilter>;
  /** Describes the sorting of report rows. The order of the condition in the list defines its precedence; the earlier the condition, the higher its precedence. If no sort conditions are specified, the row ordering is undefined. */
  sortConditions?: Array<MediationReportSpecSortCondition>;
}

export const MediationReportSpec: Schema.Schema<MediationReportSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      localizationSettings: Schema.optional(LocalizationSettings),
      dateRange: Schema.optional(DateRange),
      metrics: Schema.optional(Schema.Array(Schema.String)),
      maxReportRows: Schema.optional(Schema.Number),
      timeZone: Schema.optional(Schema.String),
      dimensions: Schema.optional(Schema.Array(Schema.String)),
      dimensionFilters: Schema.optional(
        Schema.Array(MediationReportSpecDimensionFilter),
      ),
      sortConditions: Schema.optional(
        Schema.Array(MediationReportSpecSortCondition),
      ),
    }),
  ).annotate({
    identifier: "MediationReportSpec",
  }) as any as Schema.Schema<MediationReportSpec>;

export interface ReportWarning {
  /** Describes the details of the warning message, in English. */
  description?: string;
  /** Type of the warning. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "DATA_BEFORE_ACCOUNT_TIMEZONE_CHANGE"
    | "DATA_DELAYED"
    | "OTHER"
    | "REPORT_CURRENCY_NOT_ACCOUNT_CURRENCY"
    | (string & {});
}

export const ReportWarning: Schema.Schema<ReportWarning> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ReportWarning",
}) as any as Schema.Schema<ReportWarning>;

export interface ReportFooter {
  /** Warnings associated with generation of the report. */
  warnings?: Array<ReportWarning>;
  /** Total number of rows that matched the request. Warning: This count does NOT always match the number of rows in the response. Do not make that assumption when processing the response. */
  matchingRowCount?: string;
}

export const ReportFooter: Schema.Schema<ReportFooter> = Schema.suspend(() =>
  Schema.Struct({
    warnings: Schema.optional(Schema.Array(ReportWarning)),
    matchingRowCount: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ReportFooter",
}) as any as Schema.Schema<ReportFooter>;

export interface ReportRowMetricValue {
  /** Metric integer value. */
  integerValue?: string;
  /** Amount in micros. One million is equivalent to one unit. Currency value is in the unit (USD, EUR or other) specified by the request. For example, $6.50 whould be represented as 6500000 micros. */
  microsValue?: string;
  /** Double precision (approximate) decimal values. Rates are from 0 to 1. */
  doubleValue?: number;
}

export const ReportRowMetricValue: Schema.Schema<ReportRowMetricValue> =
  Schema.suspend(() =>
    Schema.Struct({
      integerValue: Schema.optional(Schema.String),
      microsValue: Schema.optional(Schema.String),
      doubleValue: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReportRowMetricValue",
  }) as any as Schema.Schema<ReportRowMetricValue>;

export interface ReportRow {
  /** Map of dimension values in a row, with keys as enum name of the dimensions. */
  dimensionValues?: Record<string, ReportRowDimensionValue>;
  /** Map of metric values in a row, with keys as enum name of the metrics. If a metric being requested has no value returned, the map will not include it. */
  metricValues?: Record<string, ReportRowMetricValue>;
}

export const ReportRow: Schema.Schema<ReportRow> = Schema.suspend(() =>
  Schema.Struct({
    dimensionValues: Schema.optional(
      Schema.Record(Schema.String, ReportRowDimensionValue),
    ),
    metricValues: Schema.optional(
      Schema.Record(Schema.String, ReportRowMetricValue),
    ),
  }),
).annotate({ identifier: "ReportRow" }) as any as Schema.Schema<ReportRow>;

export interface GenerateNetworkReportResponse {
  /** Actual report data. */
  row?: ReportRow;
  /** Additional information about the generated report, such as warnings about the data. */
  footer?: ReportFooter;
  /** Report generation settings that describes the report contents, such as the report date range and localization settings. */
  header?: ReportHeader;
}

export const GenerateNetworkReportResponse: Schema.Schema<GenerateNetworkReportResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      row: Schema.optional(ReportRow),
      footer: Schema.optional(ReportFooter),
      header: Schema.optional(ReportHeader),
    }),
  ).annotate({
    identifier: "GenerateNetworkReportResponse",
  }) as any as Schema.Schema<GenerateNetworkReportResponse>;

export interface AdUnit {
  /** The externally visible ID of the ad unit which can be used to integrate with the AdMob SDK. This is a read only property. Example: ca-app-pub-9876543210987654/0123456789 */
  adUnitId?: string;
  /** Ad media type supported by this ad unit. Possible values as follows: "RICH_MEDIA" - Text, image, and other non-video media. "VIDEO" - Video media. */
  adTypes?: Array<string>;
  /** Optional. Settings for a rewarded ad unit. This can be set or unset only when the ad_format is "REWARDED". */
  rewardSettings?: AdUnitRewardSettings;
  /** Resource name for this ad unit. Format is accounts/{publisher_id}/adUnits/{ad_unit_id_fragment} Example: accounts/pub-9876543210987654/adUnits/0123456789 */
  name?: string;
  /** The externally visible ID of the app this ad unit is associated with. Example: ca-app-pub-9876543210987654~0123456789 */
  appId?: string;
  /** The display name of the ad unit as shown in the AdMob UI, which is provided by the user. The maximum length allowed is 80 characters. */
  displayName?: string;
  /** AdFormat of the ad unit. Possible values are as follows: "APP_OPEN" - App Open ad format. "BANNER" - Banner ad format. "BANNER_INTERSTITIAL" - Legacy format that can be used as either banner or interstitial. This format can no longer be created but can be targeted by mediation groups. "INTERSTITIAL" - A full screen ad. Supported ad types are "RICH_MEDIA" and "VIDEO". "NATIVE" - Native ad format. "REWARDED" - An ad that, once viewed, gets a callback verifying the view so that a reward can be given to the user. Supported ad types are "RICH_MEDIA" (interactive) and video where video can not be excluded. "REWARDED_INTERSTITIAL" - Rewarded Interstitial ad format. Only supports video ad type. See https://support.google.com/admob/answer/9884467. */
  adFormat?: string;
}

export const AdUnit: Schema.Schema<AdUnit> = Schema.suspend(() =>
  Schema.Struct({
    adUnitId: Schema.optional(Schema.String),
    adTypes: Schema.optional(Schema.Array(Schema.String)),
    rewardSettings: Schema.optional(AdUnitRewardSettings),
    name: Schema.optional(Schema.String),
    appId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    adFormat: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AdUnit" }) as any as Schema.Schema<AdUnit>;

export interface ListAdUnitsResponse {
  /** The resulting ad units for the requested account. */
  adUnits?: Array<AdUnit>;
  /** If not empty, indicates that there may be more ad units for the request; this value should be passed in a new `ListAdUnitsRequest`. */
  nextPageToken?: string;
}

export const ListAdUnitsResponse: Schema.Schema<ListAdUnitsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      adUnits: Schema.optional(Schema.Array(AdUnit)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdUnitsResponse",
  }) as any as Schema.Schema<ListAdUnitsResponse>;

export interface MediationGroup {
  /** Resource name for this mediation group. Format is: accounts/{publisher_id}/mediationGroups/{mediation_group_id} Example: accounts/pub-9876543210987654/mediationGroups/0123456789 */
  name?: string;
  /** The mediation lines used for serving for this mediation group. Key is the ID of the mediation group line. For creation, use distinct negative values as placeholder. */
  mediationGroupLines?: Record<string, MediationGroupMediationGroupLine>;
  /** User provided name for the mediation group. The maximum length allowed is 120 characters. */
  displayName?: string;
  /** The status of the mediation group. Only enabled mediation groups will be served. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Output only. The state of the mediation a/b experiment that belongs to this mediation group. */
  mediationAbExperimentState?:
    | "EXPERIMENT_STATE_UNSPECIFIED"
    | "RUNNING"
    | "NOT_RUNNING"
    | (string & {});
  /** The ID of the mediation group. Example: "0123456789". This is a read only property. */
  mediationGroupId?: string;
  /** Set of criteria targeted by this mediation group, such as ad units and geo locations. */
  targeting?: MediationGroupTargeting;
}

export const MediationGroup: Schema.Schema<MediationGroup> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      mediationGroupLines: Schema.optional(
        Schema.Record(Schema.String, MediationGroupMediationGroupLine),
      ),
      displayName: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      mediationAbExperimentState: Schema.optional(Schema.String),
      mediationGroupId: Schema.optional(Schema.String),
      targeting: Schema.optional(MediationGroupTargeting),
    }),
).annotate({
  identifier: "MediationGroup",
}) as any as Schema.Schema<MediationGroup>;

export interface MediationAbExperimentExperimentMediationLine {
  /** The mediation group line used by the experiment. */
  mediationGroupLine?: MediationGroupMediationGroupLine;
}

export const MediationAbExperimentExperimentMediationLine: Schema.Schema<MediationAbExperimentExperimentMediationLine> =
  Schema.suspend(() =>
    Schema.Struct({
      mediationGroupLine: Schema.optional(MediationGroupMediationGroupLine),
    }),
  ).annotate({
    identifier: "MediationAbExperimentExperimentMediationLine",
  }) as any as Schema.Schema<MediationAbExperimentExperimentMediationLine>;

export interface MediationAbExperiment {
  /** Output only. The experiment mediation lines for control. They are inherited from the parent mediation group. It is an output only field. */
  controlMediationLines?: Array<MediationAbExperimentExperimentMediationLine>;
  /** Output only. The time at which the experiment was started (in UTC). */
  startTime?: string;
  /** Output only. The state of the experiment. It is an output only field. */
  state?:
    | "EXPERIMENT_STATE_UNSPECIFIED"
    | "EXPIRED"
    | "RUNNING"
    | "ENDED"
    | (string & {});
  /** Output only. The variant leader for the experiment according to some key metrics. */
  variantLeader?:
    | "VARIANT_LEADER_UNSPECIFIED"
    | "CONTROL"
    | "TREATMENT"
    | "INSUFFICIENT_DATA"
    | "TOO_EARLY_TO_CALL"
    | "NO_VARIANT_LEADER"
    | (string & {});
  /** Output only. The mediation group id this experiment belongs to. This can be used for filtering the experiments in the list experiments API. */
  mediationGroupId?: string;
  /** The experiment mediation lines created for the treatment. They will be used for serving when the experiment status is RUNNING. */
  treatmentMediationLines?: Array<MediationAbExperimentExperimentMediationLine>;
  /** The display name for the mediation A/B experiment. */
  displayName?: string;
  /** Resource name for this experiment. The format is accounts/{publisher_id}/ mediationGroups/{mediation_group_id}/mediationAbExperiment/ {mediation_group_experiment_id}. For example: accounts/pub-9876543210987654/mediationGroups/0123456789/ mediationAbExperiment/12345 */
  name?: string;
  /** Output only. Unique identifier for the mediation A/B experiment. It is an output only property. */
  experimentId?: string;
  /** Output only. The time at which the experiment was ended or target to end (in UTC). */
  endTime?: string;
  /** The percentage of the mediation A/B experiment traffic that will be send to the treatment (variant B). The remainder is sent to the control (variant A). The percentage is expressed as an integer in the inclusive range of [1,99]. See https://support.google.com/admob/answer/9572326 for details. */
  treatmentTrafficPercentage?: string;
}

export const MediationAbExperiment: Schema.Schema<MediationAbExperiment> =
  Schema.suspend(() =>
    Schema.Struct({
      controlMediationLines: Schema.optional(
        Schema.Array(MediationAbExperimentExperimentMediationLine),
      ),
      startTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      variantLeader: Schema.optional(Schema.String),
      mediationGroupId: Schema.optional(Schema.String),
      treatmentMediationLines: Schema.optional(
        Schema.Array(MediationAbExperimentExperimentMediationLine),
      ),
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      experimentId: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      treatmentTrafficPercentage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MediationAbExperiment",
  }) as any as Schema.Schema<MediationAbExperiment>;

export interface StopMediationAbExperimentRequest {
  /** The choice for the winning variant. */
  variantChoice?:
    | "VARIANT_CHOICE_UNSPECIFIED"
    | "VARIANT_CHOICE_A"
    | "VARIANT_CHOICE_B"
    | (string & {});
}

export const StopMediationAbExperimentRequest: Schema.Schema<StopMediationAbExperimentRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      variantChoice: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StopMediationAbExperimentRequest",
  }) as any as Schema.Schema<StopMediationAbExperimentRequest>;

export interface AdUnitMapping {
  /** Output only. The status of this ad unit mapping. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | (string & {});
  /** Settings for the specified ad unit to make an ad request to 3rd party ad network. Key-value pairs with values set by the user for the keys requested by the ad network. Please see https://support.google.com/admob/answer/3245073 for details on how to configure the network settings. */
  adUnitConfigurations?: Record<string, string>;
  /** The ID of mediation ad source adapter used by this ad unit mapping. The adapter determines the information needed in the ad_network_settings. */
  adapterId?: string;
  /** Optional. The display name of this ad unit mapping instance. */
  displayName?: string;
  /** Resource name of this ad unit mapping. Format is: accounts/{publisher_id}/adUnits/{ad_unit_id_fragment}/adUnitMappings/{ad_unit_mapping_id} Example: accounts/pub-1234567890123456/adUnits/0123456789/adUnitMappings/987654321 */
  name?: string;
}

export const AdUnitMapping: Schema.Schema<AdUnitMapping> = Schema.suspend(() =>
  Schema.Struct({
    state: Schema.optional(Schema.String),
    adUnitConfigurations: Schema.optional(
      Schema.Record(Schema.String, Schema.String),
    ),
    adapterId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "AdUnitMapping",
}) as any as Schema.Schema<AdUnitMapping>;

export interface BatchCreateAdUnitMappingsResponse {
  /** The Ad units mappings created under the requested account. */
  adUnitMappings?: Array<AdUnitMapping>;
}

export const BatchCreateAdUnitMappingsResponse: Schema.Schema<BatchCreateAdUnitMappingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      adUnitMappings: Schema.optional(Schema.Array(AdUnitMapping)),
    }),
  ).annotate({
    identifier: "BatchCreateAdUnitMappingsResponse",
  }) as any as Schema.Schema<BatchCreateAdUnitMappingsResponse>;

export interface ListMediationGroupsResponse {
  /** The resulting mediation groups for the requested account. */
  mediationGroups?: Array<MediationGroup>;
  /** If not empty, indicates that there may be more mediation groups for the request; this value should be passed in a new `ListMediationGroupsRequest`. */
  nextPageToken?: string;
}

export const ListMediationGroupsResponse: Schema.Schema<ListMediationGroupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      mediationGroups: Schema.optional(Schema.Array(MediationGroup)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListMediationGroupsResponse",
  }) as any as Schema.Schema<ListMediationGroupsResponse>;

export interface AdSource {
  /** Resource name of this ad source. Format is: accounts/{publisher_id}/adSources/{ad_source_id} */
  name?: string;
  /** Display name of this ad source. */
  title?: string;
  /** ID of this ad source. */
  adSourceId?: string;
}

export const AdSource: Schema.Schema<AdSource> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    adSourceId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AdSource" }) as any as Schema.Schema<AdSource>;

export interface ListAdSourcesResponse {
  /** The ad sources. */
  adSources?: Array<AdSource>;
  /** Used to set the `page_token` in the `ListAdSourcesRequest` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAdSourcesResponse: Schema.Schema<ListAdSourcesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      adSources: Schema.optional(Schema.Array(AdSource)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdSourcesResponse",
  }) as any as Schema.Schema<ListAdSourcesResponse>;

export interface ListAppsResponse {
  /** The resulting apps for the requested account. */
  apps?: Array<App>;
  /** If not empty, indicates that there may be more apps for the request; this value should be passed in a new `ListAppsRequest`. */
  nextPageToken?: string;
}

export const ListAppsResponse: Schema.Schema<ListAppsResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      apps: Schema.optional(Schema.Array(App)),
      nextPageToken: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ListAppsResponse",
}) as any as Schema.Schema<ListAppsResponse>;

export interface ListAdaptersResponse {
  /** Used to set the `page_token` in the `ListAdapterRequest` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The adapter. */
  adapters?: Array<Adapter>;
}

export const ListAdaptersResponse: Schema.Schema<ListAdaptersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      adapters: Schema.optional(Schema.Array(Adapter)),
    }),
  ).annotate({
    identifier: "ListAdaptersResponse",
  }) as any as Schema.Schema<ListAdaptersResponse>;

export interface ListAdUnitMappingsResponse {
  /** The ad unit mappings from the specified account and ad unit. */
  adUnitMappings?: Array<AdUnitMapping>;
  /** Used to set the `page_token` in the `ListAdUnitMappingsRequest` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAdUnitMappingsResponse: Schema.Schema<ListAdUnitMappingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      adUnitMappings: Schema.optional(Schema.Array(AdUnitMapping)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAdUnitMappingsResponse",
  }) as any as Schema.Schema<ListAdUnitMappingsResponse>;

export interface GenerateCampaignReportResponse {
  /** The campaign report data from the specified publisher. At most 100000 rows will be returned from the API. */
  rows?: Array<ReportRow>;
}

export const GenerateCampaignReportResponse: Schema.Schema<GenerateCampaignReportResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      rows: Schema.optional(Schema.Array(ReportRow)),
    }),
  ).annotate({
    identifier: "GenerateCampaignReportResponse",
  }) as any as Schema.Schema<GenerateCampaignReportResponse>;

export interface GenerateMediationReportRequest {
  /** Network report specification. */
  reportSpec?: MediationReportSpec;
}

export const GenerateMediationReportRequest: Schema.Schema<GenerateMediationReportRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      reportSpec: Schema.optional(MediationReportSpec),
    }),
  ).annotate({
    identifier: "GenerateMediationReportRequest",
  }) as any as Schema.Schema<GenerateMediationReportRequest>;

export interface CreateAdUnitMappingRequest {
  /** Required. The parent which owns the ad unit mapping. Format: accounts/{publisher_id}/adUnits/{ad_unit_id} */
  parent?: string;
  /** Required. The ad unit mapping to create. */
  adUnitMapping?: AdUnitMapping;
}

export const CreateAdUnitMappingRequest: Schema.Schema<CreateAdUnitMappingRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      adUnitMapping: Schema.optional(AdUnitMapping),
    }),
  ).annotate({
    identifier: "CreateAdUnitMappingRequest",
  }) as any as Schema.Schema<CreateAdUnitMappingRequest>;

export interface BatchCreateAdUnitMappingsRequest {
  /** Required. The request message specifying the ad unit mappings to create. A maximum of 100 ad unit mappings can be created in a batch. If the number of ad unit mappings in the batch request exceed 100, the entire request will be rejected and no ad unit mappings will be created. */
  requests?: Array<CreateAdUnitMappingRequest>;
}

export const BatchCreateAdUnitMappingsRequest: Schema.Schema<BatchCreateAdUnitMappingsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(Schema.Array(CreateAdUnitMappingRequest)),
    }),
  ).annotate({
    identifier: "BatchCreateAdUnitMappingsRequest",
  }) as any as Schema.Schema<BatchCreateAdUnitMappingsRequest>;

export interface GenerateMediationReportResponse {
  /** Actual report data. */
  row?: ReportRow;
  /** Additional information about the generated report, such as warnings about the data. */
  footer?: ReportFooter;
  /** Report generation settings that describes the report contents, such as the report date range and localization settings. */
  header?: ReportHeader;
}

export const GenerateMediationReportResponse: Schema.Schema<GenerateMediationReportResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      row: Schema.optional(ReportRow),
      footer: Schema.optional(ReportFooter),
      header: Schema.optional(ReportHeader),
    }),
  ).annotate({
    identifier: "GenerateMediationReportResponse",
  }) as any as Schema.Schema<GenerateMediationReportResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetAccountsRequest {
  /** Resource name of the publisher account to retrieve. Example: accounts/pub-9876543210987654 */
  name: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = PublisherAccount;
export const GetAccountsResponse = PublisherAccount;

export type GetAccountsError = DefaultErrors;

/** Gets information about the specified AdMob publisher account. */
export const getAccounts: API.OperationMethod<
  GetAccountsRequest,
  GetAccountsResponse,
  GetAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

export interface ListAccountsRequest {
  /** Maximum number of accounts to return. */
  pageSize?: number;
  /** The value returned by the last `ListPublisherAccountsResponse`; indicates that this is a continuation of a prior `ListPublisherAccounts` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListAccountsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = ListPublisherAccountsResponse;
export const ListAccountsResponse = ListPublisherAccountsResponse;

export type ListAccountsError = DefaultErrors;

/** Lists the AdMob publisher account that was most recently signed in to from the AdMob UI. For more information, see https://support.google.com/admob/answer/10243672. */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GenerateAccountsNetworkReportRequest {
  /** Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: GenerateNetworkReportRequest;
}

export const GenerateAccountsNetworkReportRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateNetworkReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/networkReport:generate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GenerateAccountsNetworkReportRequest>;

export type GenerateAccountsNetworkReportResponse =
  GenerateNetworkReportResponse;
export const GenerateAccountsNetworkReportResponse =
  GenerateNetworkReportResponse;

export type GenerateAccountsNetworkReportError = DefaultErrors;

/** Generates an AdMob Network report based on the provided report specification. Returns result of a server-side streaming RPC. The result is returned in a sequence of responses. */
export const generateAccountsNetworkReport: API.OperationMethod<
  GenerateAccountsNetworkReportRequest,
  GenerateAccountsNetworkReportResponse,
  GenerateAccountsNetworkReportError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateAccountsNetworkReportRequest,
  output: GenerateAccountsNetworkReportResponse,
  errors: [],
}));

export interface BatchCreateAccountsAdUnitMappingsRequest {
  /** Required. The AdMob account which owns this collection of ad unit mappings. Format: accounts/{publisher_id} See https://support.google.com/admob/answer/2784578 for instructions on how to find your AdMob publisher ID. */
  parent: string;
  /** Request body */
  body?: BatchCreateAdUnitMappingsRequest;
}

export const BatchCreateAccountsAdUnitMappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateAdUnitMappingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/adUnitMappings:batchCreate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchCreateAccountsAdUnitMappingsRequest>;

export type BatchCreateAccountsAdUnitMappingsResponse =
  BatchCreateAdUnitMappingsResponse;
export const BatchCreateAccountsAdUnitMappingsResponse =
  BatchCreateAdUnitMappingsResponse;

export type BatchCreateAccountsAdUnitMappingsError = DefaultErrors;

/** Batch create the ad unit mappings under the specific AdMob account. The maximum allowed batch size is 100. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const batchCreateAccountsAdUnitMappings: API.OperationMethod<
  BatchCreateAccountsAdUnitMappingsRequest,
  BatchCreateAccountsAdUnitMappingsResponse,
  BatchCreateAccountsAdUnitMappingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchCreateAccountsAdUnitMappingsRequest,
  output: BatchCreateAccountsAdUnitMappingsResponse,
  errors: [],
}));

export interface GenerateAccountsMediationReportRequest {
  /** Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: GenerateMediationReportRequest;
}

export const GenerateAccountsMediationReportRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateMediationReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/mediationReport:generate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GenerateAccountsMediationReportRequest>;

export type GenerateAccountsMediationReportResponse =
  GenerateMediationReportResponse;
export const GenerateAccountsMediationReportResponse =
  GenerateMediationReportResponse;

export type GenerateAccountsMediationReportError = DefaultErrors;

/** Generates an AdMob Mediation report based on the provided report specification. Returns result of a server-side streaming RPC. The result is returned in a sequence of responses. */
export const generateAccountsMediationReport: API.OperationMethod<
  GenerateAccountsMediationReportRequest,
  GenerateAccountsMediationReportResponse,
  GenerateAccountsMediationReportError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateAccountsMediationReportRequest,
  output: GenerateAccountsMediationReportResponse,
  errors: [],
}));

export interface GenerateAccountsCampaignReportRequest {
  /** Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: GenerateCampaignReportRequest;
}

export const GenerateAccountsCampaignReportRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GenerateCampaignReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/campaignReport:generate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GenerateAccountsCampaignReportRequest>;

export type GenerateAccountsCampaignReportResponse =
  GenerateCampaignReportResponse;
export const GenerateAccountsCampaignReportResponse =
  GenerateCampaignReportResponse;

export type GenerateAccountsCampaignReportError = DefaultErrors;

/** Generates Campaign Report based on provided specifications. */
export const generateAccountsCampaignReport: API.OperationMethod<
  GenerateAccountsCampaignReportRequest,
  GenerateAccountsCampaignReportResponse,
  GenerateAccountsCampaignReportError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateAccountsCampaignReportRequest,
  output: GenerateAccountsCampaignReportResponse,
  errors: [],
}));

export interface ListAccountsAdUnitsRequest {
  /** Required. Resource name of the account to list ad units for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** The maximum number of ad units to return. If unspecified or 0, at most 10,000 ad units will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** The value returned by the last `ListAdUnitsResponse`; indicates that this is a continuation of a prior `ListAdUnits` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListAccountsAdUnitsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts/{accountsId}/adUnits" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAdUnitsRequest>;

export type ListAccountsAdUnitsResponse = ListAdUnitsResponse;
export const ListAccountsAdUnitsResponse = ListAdUnitsResponse;

export type ListAccountsAdUnitsError = DefaultErrors;

/** List the ad units under the specified AdMob account. */
export const listAccountsAdUnits: API.PaginatedOperationMethod<
  ListAccountsAdUnitsRequest,
  ListAccountsAdUnitsResponse,
  ListAccountsAdUnitsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsAdUnitsRequest,
  output: ListAccountsAdUnitsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAccountsAdUnitsRequest {
  /** Required. Resource name of the account to create the specified ad unit for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: AdUnit;
}

export const CreateAccountsAdUnitsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AdUnit).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/adUnits",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsAdUnitsRequest>;

export type CreateAccountsAdUnitsResponse = AdUnit;
export const CreateAccountsAdUnitsResponse = AdUnit;

export type CreateAccountsAdUnitsError = DefaultErrors;

/** Creates an ad unit under the specified AdMob account. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const createAccountsAdUnits: API.OperationMethod<
  CreateAccountsAdUnitsRequest,
  CreateAccountsAdUnitsResponse,
  CreateAccountsAdUnitsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsAdUnitsRequest,
  output: CreateAccountsAdUnitsResponse,
  errors: [],
}));

export interface CreateAccountsAdUnitsAdUnitMappingsRequest {
  /** Required. The parent which owns the ad unit mapping. Format: accounts/{publisher_id}/adUnits/{ad_unit_id} */
  parent: string;
  /** Request body */
  body?: AdUnitMapping;
}

export const CreateAccountsAdUnitsAdUnitMappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AdUnitMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/adUnits/{adUnitsId}/adUnitMappings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsAdUnitsAdUnitMappingsRequest>;

export type CreateAccountsAdUnitsAdUnitMappingsResponse = AdUnitMapping;
export const CreateAccountsAdUnitsAdUnitMappingsResponse = AdUnitMapping;

export type CreateAccountsAdUnitsAdUnitMappingsError = DefaultErrors;

/** Create an ad unit mapping under the specific AdMob account and ad unit. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const createAccountsAdUnitsAdUnitMappings: API.OperationMethod<
  CreateAccountsAdUnitsAdUnitMappingsRequest,
  CreateAccountsAdUnitsAdUnitMappingsResponse,
  CreateAccountsAdUnitsAdUnitMappingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsAdUnitsAdUnitMappingsRequest,
  output: CreateAccountsAdUnitsAdUnitMappingsResponse,
  errors: [],
}));

export interface ListAccountsAdUnitsAdUnitMappingsRequest {
  /** Required. The parent which owns this collection of ad unit mappings. Format: accounts/{publisher_id}/adUnits/{ad_unit_id} */
  parent: string;
  /** The maximum number of ad unit mappings to return. If unspecified or 0, at most 10,000 ad unit mappings will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** A page token, received from a previous `ListAdUnitMappings` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** The filter string that uses [EBNF grammar syntax](https://google.aip.dev/assets/misc/ebnf-filtering.txt). Possible field to filter by is: - "DISPLAY_NAME" Possible filter function is: - `IN`: Used to filter fields that represent a singleton including "DISPLAY_NAME". The filter functions can be added together using `AND`. `OR` functionality is not supported. Example: filter: IN(DISPLAY_NAME, "Test Ad Unit Mapping 1", "Test Ad Unit Mapping 2") */
  filter?: string;
}

export const ListAccountsAdUnitsAdUnitMappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/accounts/{accountsId}/adUnits/{adUnitsId}/adUnitMappings",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsAdUnitsAdUnitMappingsRequest>;

export type ListAccountsAdUnitsAdUnitMappingsResponse =
  ListAdUnitMappingsResponse;
export const ListAccountsAdUnitsAdUnitMappingsResponse =
  ListAdUnitMappingsResponse;

export type ListAccountsAdUnitsAdUnitMappingsError = DefaultErrors;

/** List ad unit mappings under the specified AdMob account and ad unit. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const listAccountsAdUnitsAdUnitMappings: API.PaginatedOperationMethod<
  ListAccountsAdUnitsAdUnitMappingsRequest,
  ListAccountsAdUnitsAdUnitMappingsResponse,
  ListAccountsAdUnitsAdUnitMappingsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsAdUnitsAdUnitMappingsRequest,
  output: ListAccountsAdUnitsAdUnitMappingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountsAdSourcesRequest {
  /** Required. The parent which owns this collection of ad sources. Format: accounts/{publisher_id} */
  parent: string;
  /** The maximum number of ad sources to return. If unspecified or 0, at most 10,000 ad sources will be returned. The maximum value is 20,000; values above 10,000 will be coerced to 20,000. */
  pageSize?: number;
  /** A page token, received from a previous `ListAdSources` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListAccountsAdSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts/{accountsId}/adSources" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAdSourcesRequest>;

export type ListAccountsAdSourcesResponse = ListAdSourcesResponse;
export const ListAccountsAdSourcesResponse = ListAdSourcesResponse;

export type ListAccountsAdSourcesError = DefaultErrors;

/** List the ad sources. */
export const listAccountsAdSources: API.PaginatedOperationMethod<
  ListAccountsAdSourcesRequest,
  ListAccountsAdSourcesResponse,
  ListAccountsAdSourcesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsAdSourcesRequest,
  output: ListAccountsAdSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountsAdSourcesAdaptersRequest {
  /** The maximum number of adapters to return. If unspecified or 0, at most 10,000 adapters will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** A page token, received from a previous `ListAdapters` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. The parent which owns this collection of adapters. Format: accounts/{publisher_id}/adSources/{ad_source_id} */
  parent: string;
}

export const ListAccountsAdSourcesAdaptersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/accounts/{accountsId}/adSources/{adSourcesId}/adapters",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsAdSourcesAdaptersRequest>;

export type ListAccountsAdSourcesAdaptersResponse = ListAdaptersResponse;
export const ListAccountsAdSourcesAdaptersResponse = ListAdaptersResponse;

export type ListAccountsAdSourcesAdaptersError = DefaultErrors;

/** List the adapters of the ad source. */
export const listAccountsAdSourcesAdapters: API.PaginatedOperationMethod<
  ListAccountsAdSourcesAdaptersRequest,
  ListAccountsAdSourcesAdaptersResponse,
  ListAccountsAdSourcesAdaptersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsAdSourcesAdaptersRequest,
  output: ListAccountsAdSourcesAdaptersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountsAppsRequest {
  /** The maximum number of apps to return. If unspecified or 0, at most 10,000 apps will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** The value returned by the last `ListAppsResponse`; indicates that this is a continuation of a prior `ListApps` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. Resource name of the account to list apps for. Example: accounts/pub-9876543210987654 */
  parent: string;
}

export const ListAccountsAppsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts/{accountsId}/apps" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAppsRequest>;

export type ListAccountsAppsResponse = ListAppsResponse;
export const ListAccountsAppsResponse = ListAppsResponse;

export type ListAccountsAppsError = DefaultErrors;

/** List the apps under the specified AdMob account. */
export const listAccountsApps: API.PaginatedOperationMethod<
  ListAccountsAppsRequest,
  ListAccountsAppsResponse,
  ListAccountsAppsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsAppsRequest,
  output: ListAccountsAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAccountsAppsRequest {
  /** Required. Resource name of the account for which the app is being created. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** Request body */
  body?: App;
}

export const CreateAccountsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(App).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/apps",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsAppsRequest>;

export type CreateAccountsAppsResponse = App;
export const CreateAccountsAppsResponse = App;

export type CreateAccountsAppsError = DefaultErrors;

/** Creates an app under the specified AdMob account. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const createAccountsApps: API.OperationMethod<
  CreateAccountsAppsRequest,
  CreateAccountsAppsResponse,
  CreateAccountsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsAppsRequest,
  output: CreateAccountsAppsResponse,
  errors: [],
}));

export interface CreateAccountsMediationGroupsRequest {
  /** Required. The parent which owns the mediation group. Format: accounts/{publisher_id} */
  parent: string;
  /** Request body */
  body?: MediationGroup;
}

export const CreateAccountsMediationGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(MediationGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/accounts/{accountsId}/mediationGroups",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsMediationGroupsRequest>;

export type CreateAccountsMediationGroupsResponse = MediationGroup;
export const CreateAccountsMediationGroupsResponse = MediationGroup;

export type CreateAccountsMediationGroupsError = DefaultErrors;

/** Create a mediation group under the specific AdMob account. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const createAccountsMediationGroups: API.OperationMethod<
  CreateAccountsMediationGroupsRequest,
  CreateAccountsMediationGroupsResponse,
  CreateAccountsMediationGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsMediationGroupsRequest,
  output: CreateAccountsMediationGroupsResponse,
  errors: [],
}));

export interface ListAccountsMediationGroupsRequest {
  /** Required. Resource name of the account to list mediation groups for. Example: accounts/pub-9876543210987654 */
  parent: string;
  /** The maximum number of mediation groups to return. If unspecified or 0, at most 10,000 mediation groups will be returned. The maximum value is 20,000; values above 20,000 will be coerced to 20,000. */
  pageSize?: number;
  /** The value returned by the last `ListMediationGroupsResponse`; indicates that this is a continuation of a prior `ListMediationGroups` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** The filter string that uses [EBNF grammar syntax](https://google.aip.dev/assets/misc/ebnf-filtering.txt). Possible fields to filter by are: - "AD_SOURCE_IDS" - "AD_UNIT_IDS" - "APP_IDS" - "DISPLAY_NAME" - "FORMAT" - "MEDIATION_GROUP_ID" - "PLATFORM" - "STATE" - "TARGETED_REGION_CODES" Possible filter functions are: - `IN`: Used to filter fields that represent a singleton including "MEDIATION_GROUP_ID", "DISPLAY_NAME", "STATE", "PLATFORM", and "FORMAT". - `CONTAINS_ANY`: Used to filter fields that represent a collection including "AD_SOURCE_IDS", "AD_UNIT_IDS", "APP_IDS", and "TARGETED_REGION_CODES". The filter functions can be added together using `AND`. `OR` functionality is not supported. Example: filter: IN(DISPLAY_NAME, "Test Group 1", "Test Group 2") AND IN(PLATFORM, "ANDROID") AND CONTAINS_ANY(AD_SOURCE_IDS, "5450213213286189855") */
  filter?: string;
}

export const ListAccountsMediationGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/accounts/{accountsId}/mediationGroups",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsMediationGroupsRequest>;

export type ListAccountsMediationGroupsResponse = ListMediationGroupsResponse;
export const ListAccountsMediationGroupsResponse = ListMediationGroupsResponse;

export type ListAccountsMediationGroupsError = DefaultErrors;

/** List mediation groups under the specified AdMob account. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const listAccountsMediationGroups: API.PaginatedOperationMethod<
  ListAccountsMediationGroupsRequest,
  ListAccountsMediationGroupsResponse,
  ListAccountsMediationGroupsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsMediationGroupsRequest,
  output: ListAccountsMediationGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAccountsMediationGroupsRequest {
  /** List of mediation group fields to be updated. Updates to repeated fields such as items in a list will fully replace the existing value(s) with the new value(s). Updates to individual values in a map can be done by indexing by the key. The following field masks are supported for mediation group updates: - "mediation_group_lines[\"{mediation_group_line_id}\"]" clang-format off - "mediation_group_lines[\"{mediation_group_line_id}\"].ad_unit_mappings[\"{ad_unit_id}\"]" clang-format on - "mediation_group_lines[\"{mediation_group_line_id}\"].cpm_micros" - "mediation_group_lines[\"{mediation_group_line_id}\"].cpm_mode" - "mediation_group_lines[\"{mediation_group_line_id}\"].state" - "mediation_group_lines[\"{mediation_group_line_id}\"].display_name" - "targeting.ad_unit_ids" To update a mediation group with a new mediation group line, use a distinct negative number for the "mediation_group_line_id". For Example: update_mask { paths: "mediation_group_lines[\"123456789012345\"].cpm_micros" } */
  updateMask?: string;
  /** Resource name for this mediation group. Format is: accounts/{publisher_id}/mediationGroups/{mediation_group_id} Example: accounts/pub-9876543210987654/mediationGroups/0123456789 */
  name: string;
  /** Request body */
  body?: MediationGroup;
}

export const PatchAccountsMediationGroupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MediationGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/accounts/{accountsId}/mediationGroups/{mediationGroupsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsMediationGroupsRequest>;

export type PatchAccountsMediationGroupsResponse = MediationGroup;
export const PatchAccountsMediationGroupsResponse = MediationGroup;

export type PatchAccountsMediationGroupsError = DefaultErrors;

/** Update the specified mediation group under the specified AdMob account. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const patchAccountsMediationGroups: API.OperationMethod<
  PatchAccountsMediationGroupsRequest,
  PatchAccountsMediationGroupsResponse,
  PatchAccountsMediationGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsMediationGroupsRequest,
  output: PatchAccountsMediationGroupsResponse,
  errors: [],
}));

export interface CreateAccountsMediationGroupsMediationAbExperimentsRequest {
  /** Required. The parent which owns the mediation group. Format: accounts/{publisher_id}/mediationGroups/{mediation_group_id} */
  parent: string;
  /** Request body */
  body?: MediationAbExperiment;
}

export const CreateAccountsMediationGroupsMediationAbExperimentsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(MediationAbExperiment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/accounts/{accountsId}/mediationGroups/{mediationGroupsId}/mediationAbExperiments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAccountsMediationGroupsMediationAbExperimentsRequest>;

export type CreateAccountsMediationGroupsMediationAbExperimentsResponse =
  MediationAbExperiment;
export const CreateAccountsMediationGroupsMediationAbExperimentsResponse =
  MediationAbExperiment;

export type CreateAccountsMediationGroupsMediationAbExperimentsError =
  DefaultErrors;

/** Create an A/B testing experiment for a specified AdMob account and a mediation group. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const createAccountsMediationGroupsMediationAbExperiments: API.OperationMethod<
  CreateAccountsMediationGroupsMediationAbExperimentsRequest,
  CreateAccountsMediationGroupsMediationAbExperimentsResponse,
  CreateAccountsMediationGroupsMediationAbExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsMediationGroupsMediationAbExperimentsRequest,
  output: CreateAccountsMediationGroupsMediationAbExperimentsResponse,
  errors: [],
}));

export interface StopAccountsMediationGroupsMediationAbExperimentsRequest {
  /** Name of the mediation group, the experiment for which to choose a variant for. Example: accounts/pub-9876543210987654/mediationGroups/0123456789/ mediationAbExperiments */
  name: string;
  /** Request body */
  body?: StopMediationAbExperimentRequest;
}

export const StopAccountsMediationGroupsMediationAbExperimentsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StopMediationAbExperimentRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/accounts/{accountsId}/mediationGroups/{mediationGroupsId}/mediationAbExperiments:stop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StopAccountsMediationGroupsMediationAbExperimentsRequest>;

export type StopAccountsMediationGroupsMediationAbExperimentsResponse =
  MediationAbExperiment;
export const StopAccountsMediationGroupsMediationAbExperimentsResponse =
  MediationAbExperiment;

export type StopAccountsMediationGroupsMediationAbExperimentsError =
  DefaultErrors;

/** Stop the mediation A/B experiment and choose a variant. This method has limited access. If you see a 403 permission denied error, please reach out to your account manager for access. */
export const stopAccountsMediationGroupsMediationAbExperiments: API.OperationMethod<
  StopAccountsMediationGroupsMediationAbExperimentsRequest,
  StopAccountsMediationGroupsMediationAbExperimentsResponse,
  StopAccountsMediationGroupsMediationAbExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: StopAccountsMediationGroupsMediationAbExperimentsRequest,
  output: StopAccountsMediationGroupsMediationAbExperimentsResponse,
  errors: [],
}));
