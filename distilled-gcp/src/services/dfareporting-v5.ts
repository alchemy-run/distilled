// ==========================================================================
// Campaign Manager 360 API (dfareporting v5)
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
  name: "dfareporting",
  version: "v5",
  rootUrl: "https://dfareporting.googleapis.com/",
  servicePath: "dfareporting/v5/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AccountPermissionGroup {
  /** ID of this account permission group. */
  id?: string;
  /** Name of this account permission group. */
  name?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountPermissionGroup". */
  kind?: string;
}

export const AccountPermissionGroup: Schema.Schema<AccountPermissionGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountPermissionGroup" }) as any as Schema.Schema<AccountPermissionGroup>;

export interface AccountPermissionGroupsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountPermissionGroupGroupsListResponse". */
  kind?: string;
  /** Account permission group collection. */
  accountPermissionGroups?: Array<AccountPermissionGroup>;
}

export const AccountPermissionGroupsListResponse: Schema.Schema<AccountPermissionGroupsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  accountPermissionGroups: Schema.optional(Schema.Array(AccountPermissionGroup)),
})).annotate({ identifier: "AccountPermissionGroupsListResponse" }) as any as Schema.Schema<AccountPermissionGroupsListResponse>;

export interface AccountPermission {
  /** ID of this account permission. */
  id?: string;
  /** Name of this account permission. */
  name?: string;
  /** Permission group of this account permission. */
  permissionGroupId?: string;
  /** Administrative level required to enable this account permission. */
  level?: "USER" | "ADMINISTRATOR" | (string & {});
  /** Account profiles associated with this account permission. Possible values are: - "ACCOUNT_PROFILE_BASIC" - "ACCOUNT_PROFILE_STANDARD" */
  accountProfiles?: Array<"ACCOUNT_PROFILE_BASIC" | "ACCOUNT_PROFILE_STANDARD" | (string & {})>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountPermission". */
  kind?: string;
}

export const AccountPermission: Schema.Schema<AccountPermission> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  permissionGroupId: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  accountProfiles: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountPermission" }) as any as Schema.Schema<AccountPermission>;

export interface AccountPermissionsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountPermissionsListResponse". */
  kind?: string;
  /** Account permission collection. */
  accountPermissions?: Array<AccountPermission>;
}

export const AccountPermissionsListResponse: Schema.Schema<AccountPermissionsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  accountPermissions: Schema.optional(Schema.Array(AccountPermission)),
})).annotate({ identifier: "AccountPermissionsListResponse" }) as any as Schema.Schema<AccountPermissionsListResponse>;

export interface LookbackConfiguration {
  /** Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive. */
  clickDuration?: number;
  /** Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive. */
  postImpressionActivitiesDuration?: number;
}

export const LookbackConfiguration: Schema.Schema<LookbackConfiguration> = Schema.suspend(() => Schema.Struct({
  clickDuration: Schema.optional(Schema.Number),
  postImpressionActivitiesDuration: Schema.optional(Schema.Number),
})).annotate({ identifier: "LookbackConfiguration" }) as any as Schema.Schema<LookbackConfiguration>;

export interface ReportsConfiguration {
  /** Report generation time zone ID of this account. This is a required field that cannot be changed on update. Acceptable values are: - "1" for "America/New_York" - "2" for "Europe/London" - "3" for "Europe/Paris" - "4" for "Africa/Johannesburg" - "5" for "Asia/Jerusalem" - "6" for "Asia/Shanghai" - "7" for "Asia/Hong_Kong" - "8" for "Asia/Tokyo" - "9" for "Australia/Sydney" - "10" for "Asia/Dubai" - "11" for "America/Los_Angeles" - "12" for "Pacific/Auckland" - "13" for "America/Sao_Paulo" - "16" for "America/Asuncion" - "17" for "America/Chicago" - "18" for "America/Denver" - "19" for "America/St_Johns" - "20" for "Asia/Dhaka" - "21" for "Asia/Jakarta" - "22" for "Asia/Kabul" - "23" for "Asia/Karachi" - "24" for "Asia/Calcutta" - "25" for "Asia/Pyongyang" - "26" for "Asia/Rangoon" - "27" for "Atlantic/Cape_Verde" - "28" for "Atlantic/South_Georgia" - "29" for "Australia/Adelaide" - "30" for "Australia/Lord_Howe" - "31" for "Europe/Moscow" - "32" for "Pacific/Kiritimati" - "35" for "Pacific/Norfolk" - "36" for "Pacific/Tongatapu" */
  reportGenerationTimeZoneId?: string;
  /** Whether the exposure to conversion report is enabled. This report shows detailed pathway information on up to 10 of the most recent ad exposures seen by a user before converting. */
  exposureToConversionEnabled?: boolean;
  /** Default lookback windows for new advertisers in this account. */
  lookbackConfiguration?: LookbackConfiguration;
}

export const ReportsConfiguration: Schema.Schema<ReportsConfiguration> = Schema.suspend(() => Schema.Struct({
  reportGenerationTimeZoneId: Schema.optional(Schema.String),
  exposureToConversionEnabled: Schema.optional(Schema.Boolean),
  lookbackConfiguration: Schema.optional(LookbackConfiguration),
})).annotate({ identifier: "ReportsConfiguration" }) as any as Schema.Schema<ReportsConfiguration>;

export interface Account {
  /** ID of this account. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this account. This is a required field, and must be less than 128 characters long and be globally unique. */
  name?: string;
  /** Whether this account is active. */
  active?: boolean;
  /** Description of this account. */
  description?: string;
  /** ID of currency associated with this account. This is a required field. Acceptable values are: - "1" for USD - "2" for GBP - "3" for ESP - "4" for SEK - "5" for CAD - "6" for JPY - "7" for DEM - "8" for AUD - "9" for FRF - "10" for ITL - "11" for DKK - "12" for NOK - "13" for FIM - "14" for ZAR - "15" for IEP - "16" for NLG - "17" for EUR - "18" for KRW - "19" for TWD - "20" for SGD - "21" for CNY - "22" for HKD - "23" for NZD - "24" for MYR - "25" for BRL - "26" for PTE - "28" for CLP - "29" for TRY - "30" for ARS - "31" for PEN - "32" for ILS - "33" for CHF - "34" for VEF - "35" for COP - "36" for GTQ - "37" for PLN - "39" for INR - "40" for THB - "41" for IDR - "42" for CZK - "43" for RON - "44" for HUF - "45" for RUB - "46" for AED - "47" for BGN - "48" for HRK - "49" for MXN - "50" for NGN - "51" for EGP */
  currencyId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#account". */
  kind?: string;
  /** Maximum image size allowed for this account, in kilobytes. Value must be greater than or equal to 1. */
  maximumImageSize?: string;
  /** Default placement dimensions for this account. */
  defaultCreativeSizeId?: string;
  /** Maximum number of active ads allowed for this account. */
  activeAdsLimitTier?: "ACTIVE_ADS_TIER_40K" | "ACTIVE_ADS_TIER_75K" | "ACTIVE_ADS_TIER_100K" | "ACTIVE_ADS_TIER_200K" | "ACTIVE_ADS_TIER_300K" | "ACTIVE_ADS_TIER_500K" | "ACTIVE_ADS_TIER_750K" | "ACTIVE_ADS_TIER_1M" | (string & {});
  /** ID of the country associated with this account. */
  countryId?: string;
  /** Reporting configuration of this account. */
  reportsConfiguration?: ReportsConfiguration;
  /** Whether to serve creatives with Active View tags. If disabled, viewability data will not be available for any impressions. */
  activeViewOptOut?: boolean;
  /** Account permissions assigned to this account. */
  accountPermissionIds?: Array<string>;
  /** User role permissions available to the user roles of this account. */
  availablePermissionIds?: Array<string>;
  /** Profile for this account. This is a read-only field that can be left blank. */
  accountProfile?: "ACCOUNT_PROFILE_BASIC" | "ACCOUNT_PROFILE_STANDARD" | (string & {});
  /** Whether campaigns created in this account will be enabled for Nielsen OCR reach ratings by default. */
  nielsenOcrEnabled?: boolean;
  /** Locale of this account. Acceptable values are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW" (Chinese Traditional) */
  locale?: string;
  /** Share Path to Conversion reports with Twitter. */
  shareReportsWithTwitter?: boolean;
  /** File size limit in kilobytes of Rich Media teaser creatives. Acceptable values are 1 to 10240, inclusive. */
  teaserSizeLimit?: string;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  currencyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  maximumImageSize: Schema.optional(Schema.String),
  defaultCreativeSizeId: Schema.optional(Schema.String),
  activeAdsLimitTier: Schema.optional(Schema.String),
  countryId: Schema.optional(Schema.String),
  reportsConfiguration: Schema.optional(ReportsConfiguration),
  activeViewOptOut: Schema.optional(Schema.Boolean),
  accountPermissionIds: Schema.optional(Schema.Array(Schema.String)),
  availablePermissionIds: Schema.optional(Schema.Array(Schema.String)),
  accountProfile: Schema.optional(Schema.String),
  nielsenOcrEnabled: Schema.optional(Schema.Boolean),
  locale: Schema.optional(Schema.String),
  shareReportsWithTwitter: Schema.optional(Schema.Boolean),
  teaserSizeLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface AccountsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Account collection. */
  accounts?: Array<Account>;
}

export const AccountsListResponse: Schema.Schema<AccountsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  accounts: Schema.optional(Schema.Array(Account)),
})).annotate({ identifier: "AccountsListResponse" }) as any as Schema.Schema<AccountsListResponse>;

export interface AccountActiveAdSummary {
  /** ID of the account. */
  accountId?: string;
  /** Ads that can be activated for the account. */
  availableAds?: string;
  /** Ads that have been activated for the account */
  activeAds?: string;
  /** Maximum number of active ads allowed for the account. */
  activeAdsLimitTier?: "ACTIVE_ADS_TIER_40K" | "ACTIVE_ADS_TIER_75K" | "ACTIVE_ADS_TIER_100K" | "ACTIVE_ADS_TIER_200K" | "ACTIVE_ADS_TIER_300K" | "ACTIVE_ADS_TIER_500K" | "ACTIVE_ADS_TIER_750K" | "ACTIVE_ADS_TIER_1M" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountActiveAdSummary". */
  kind?: string;
}

export const AccountActiveAdSummary: Schema.Schema<AccountActiveAdSummary> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  availableAds: Schema.optional(Schema.String),
  activeAds: Schema.optional(Schema.String),
  activeAdsLimitTier: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountActiveAdSummary" }) as any as Schema.Schema<AccountActiveAdSummary>;

export interface ObjectFilter {
  /** Applicable when status is ASSIGNED. The user has access to objects with these object IDs. */
  objectIds?: Array<string>;
  /** Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list. */
  status?: "NONE" | "ASSIGNED" | "ALL" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter". */
  kind?: string;
}

export const ObjectFilter: Schema.Schema<ObjectFilter> = Schema.suspend(() => Schema.Struct({
  objectIds: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectFilter" }) as any as Schema.Schema<ObjectFilter>;

export interface AccountUserProfile {
  /** ID of the user profile. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of the user profile. This is a required field. Must be less than 64 characters long, must be globally unique, and cannot contain whitespace or any of the following characters: "&;<>"#%,". */
  name?: string;
  /** Email of the user profile. The email address must be linked to a Google Account. This field is required on insertion and is read-only after insertion. */
  email?: string;
  /** Account ID of the user profile. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of the user profile. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Locale of the user profile. This is a required field. Acceptable values are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW" (Chinese Traditional) */
  locale?: string;
  /** User role ID of the user profile. This is a required field. */
  userRoleId?: string;
  /** User type of the user profile. This is a read-only field that can be left blank. */
  userAccessType?: "NORMAL_USER" | "SUPER_USER" | "INTERNAL_ADMINISTRATOR" | "READ_ONLY_SUPER_USER" | (string & {});
  /** Whether this user profile is active. This defaults to false, and must be set true on insert for the user profile to be usable. */
  active?: boolean;
  /** Comments for this user profile. */
  comments?: string;
  /** Trafficker type of this user profile. This is a read-only field. */
  traffickerType?: "INTERNAL_NON_TRAFFICKER" | "INTERNAL_TRAFFICKER" | "EXTERNAL_TRAFFICKER" | (string & {});
  /** Filter that describes which campaigns are visible to the user profile. */
  campaignFilter?: ObjectFilter;
  /** Filter that describes which sites are visible to the user profile. */
  siteFilter?: ObjectFilter;
  /** Filter that describes which user roles are visible to the user profile. */
  userRoleFilter?: ObjectFilter;
  /** Filter that describes which advertisers are visible to the user profile. */
  advertiserFilter?: ObjectFilter;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountUserProfile". */
  kind?: string;
}

export const AccountUserProfile: Schema.Schema<AccountUserProfile> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.String),
  userRoleId: Schema.optional(Schema.String),
  userAccessType: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  comments: Schema.optional(Schema.String),
  traffickerType: Schema.optional(Schema.String),
  campaignFilter: Schema.optional(ObjectFilter),
  siteFilter: Schema.optional(ObjectFilter),
  userRoleFilter: Schema.optional(ObjectFilter),
  advertiserFilter: Schema.optional(ObjectFilter),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountUserProfile" }) as any as Schema.Schema<AccountUserProfile>;

export interface AccountUserProfilesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#accountUserProfilesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Account user profile collection. */
  accountUserProfiles?: Array<AccountUserProfile>;
}

export const AccountUserProfilesListResponse: Schema.Schema<AccountUserProfilesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  accountUserProfiles: Schema.optional(Schema.Array(AccountUserProfile)),
})).annotate({ identifier: "AccountUserProfilesListResponse" }) as any as Schema.Schema<AccountUserProfilesListResponse>;

export interface DimensionValue {
  /** The name of the dimension. */
  dimensionName?: string;
  /** The value of the dimension. */
  value?: string;
  /** The ID associated with the value if available. */
  id?: string;
  /** Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT. */
  matchType?: "EXACT" | "BEGINS_WITH" | "CONTAINS" | "WILDCARD_EXPRESSION" | (string & {});
  /** The kind of resource this is, in this case dfareporting#dimensionValue. */
  kind?: string;
  /** The eTag of this response for caching purposes. */
  etag?: string;
}

export const DimensionValue: Schema.Schema<DimensionValue> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  matchType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionValue" }) as any as Schema.Schema<DimensionValue>;

export interface PlacementAssignment {
  /** ID of the placement to be assigned. This is a required field. */
  placementId?: string;
  /** Whether this placement assignment is active. When true, the placement will be included in the ad's rotation. */
  active?: boolean;
  /** Whether the placement to be assigned requires SSL. This is a read-only field that is auto-generated when the ad is inserted or updated. */
  sslRequired?: boolean;
  /** Dimension value for the ID of the placement. This is a read-only, auto-generated field. */
  placementIdDimensionValue?: DimensionValue;
}

export const PlacementAssignment: Schema.Schema<PlacementAssignment> = Schema.suspend(() => Schema.Struct({
  placementId: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  sslRequired: Schema.optional(Schema.Boolean),
  placementIdDimensionValue: Schema.optional(DimensionValue),
})).annotate({ identifier: "PlacementAssignment" }) as any as Schema.Schema<PlacementAssignment>;

export interface EventTagOverride {
  /** ID of this event tag override. This is a read-only, auto-generated field. */
  id?: string;
  /** Whether this override is enabled. */
  enabled?: boolean;
}

export const EventTagOverride: Schema.Schema<EventTagOverride> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EventTagOverride" }) as any as Schema.Schema<EventTagOverride>;

export interface ClickThroughUrlSuffixProperties {
  /** Whether this entity should override the inherited click-through URL suffix with its own defined value. */
  overrideInheritedSuffix?: boolean;
  /** Click-through URL suffix to apply to all ads in this entity's scope. Must be less than 128 characters long. */
  clickThroughUrlSuffix?: string;
}

export const ClickThroughUrlSuffixProperties: Schema.Schema<ClickThroughUrlSuffixProperties> = Schema.suspend(() => Schema.Struct({
  overrideInheritedSuffix: Schema.optional(Schema.Boolean),
  clickThroughUrlSuffix: Schema.optional(Schema.String),
})).annotate({ identifier: "ClickThroughUrlSuffixProperties" }) as any as Schema.Schema<ClickThroughUrlSuffixProperties>;

export interface DefaultClickThroughEventTagProperties {
  /** Whether this entity should override the inherited default click-through event tag with its own defined value. */
  overrideInheritedEventTag?: boolean;
  /** ID of the click-through event tag to apply to all ads in this entity's scope. */
  defaultClickThroughEventTagId?: string;
}

export const DefaultClickThroughEventTagProperties: Schema.Schema<DefaultClickThroughEventTagProperties> = Schema.suspend(() => Schema.Struct({
  overrideInheritedEventTag: Schema.optional(Schema.Boolean),
  defaultClickThroughEventTagId: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultClickThroughEventTagProperties" }) as any as Schema.Schema<DefaultClickThroughEventTagProperties>;

export interface LastModifiedInfo {
  /** Timestamp of the last change in milliseconds since epoch. */
  time?: string;
}

export const LastModifiedInfo: Schema.Schema<LastModifiedInfo> = Schema.suspend(() => Schema.Struct({
  time: Schema.optional(Schema.String),
})).annotate({ identifier: "LastModifiedInfo" }) as any as Schema.Schema<LastModifiedInfo>;

export interface Country {
  /** DART ID of this country. This is the ID used for targeting and generating reports. */
  dartId?: string;
  /** Name of this country. */
  name?: string;
  /** Country code. */
  countryCode?: string;
  /** Whether ad serving supports secure servers in this country. */
  sslEnabled?: boolean;
  /** Output only. The TV data providers supported in this country. */
  tvDataProviders?: Array<"INVALID_TV_DATA_PROVIDER" | "IBOPE_AR" | "IBOPE_BR" | "IBOPE_CL" | "IBOPE_CO" | "TNS_VN" | "COMSCORE_NATIONAL_US" | "COMSCORE_CA" | "SAMBA_AU" | (string & {})>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#country". */
  kind?: string;
}

export const Country: Schema.Schema<Country> = Schema.suspend(() => Schema.Struct({
  dartId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  sslEnabled: Schema.optional(Schema.Boolean),
  tvDataProviders: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Country" }) as any as Schema.Schema<Country>;

export interface Region {
  /** DART ID of this region. */
  dartId?: string;
  /** Name of this region. */
  name?: string;
  /** Country code of the country to which this region belongs. */
  countryCode?: string;
  /** DART ID of the country to which this region belongs. */
  countryDartId?: string;
  /** Region code. */
  regionCode?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#region". */
  kind?: string;
}

export const Region: Schema.Schema<Region> = Schema.suspend(() => Schema.Struct({
  dartId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  countryDartId: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Region" }) as any as Schema.Schema<Region>;

export interface City {
  /** DART ID of this city. This is the ID used for targeting and generating reports. */
  dartId?: string;
  /** Name of this city. */
  name?: string;
  /** Country code of the country to which this city belongs. */
  countryCode?: string;
  /** DART ID of the country to which this city belongs. */
  countryDartId?: string;
  /** Region code of the region to which this city belongs. */
  regionCode?: string;
  /** DART ID of the region to which this city belongs. */
  regionDartId?: string;
  /** Metro region code of the metro region (DMA) to which this city belongs. */
  metroCode?: string;
  /** ID of the metro region (DMA) to which this city belongs. */
  metroDmaId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#city". */
  kind?: string;
}

export const City: Schema.Schema<City> = Schema.suspend(() => Schema.Struct({
  dartId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  countryDartId: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  regionDartId: Schema.optional(Schema.String),
  metroCode: Schema.optional(Schema.String),
  metroDmaId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "City" }) as any as Schema.Schema<City>;

export interface Metro {
  /** DMA ID of this metro region. This is the ID used for targeting and generating reports, and is equivalent to metro_code. */
  dmaId?: string;
  /** DART ID of this metro region. */
  dartId?: string;
  /** Name of this metro region. */
  name?: string;
  /** Metro code of this metro region. This is equivalent to dma_id. */
  metroCode?: string;
  /** Country code of the country to which this metro region belongs. */
  countryCode?: string;
  /** DART ID of the country to which this metro region belongs. */
  countryDartId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#metro". */
  kind?: string;
}

export const Metro: Schema.Schema<Metro> = Schema.suspend(() => Schema.Struct({
  dmaId: Schema.optional(Schema.String),
  dartId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  metroCode: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  countryDartId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Metro" }) as any as Schema.Schema<Metro>;

export interface PostalCode {
  /** ID of this postal code. */
  id?: string;
  /** Country code of the country to which this postal code belongs. */
  countryCode?: string;
  /** DART ID of the country to which this postal code belongs. */
  countryDartId?: string;
  /** Postal code. This is equivalent to the id field. */
  code?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#postalCode". */
  kind?: string;
}

export const PostalCode: Schema.Schema<PostalCode> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  countryDartId: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PostalCode" }) as any as Schema.Schema<PostalCode>;

export interface GeoTargeting {
  /** Whether or not to exclude the countries in the countries field from targeting. If false, the countries field refers to countries which will be targeted by the ad. */
  excludeCountries?: boolean;
  /** Countries to be targeted or excluded from targeting, depending on the setting of the excludeCountries field. For each country only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting or excluding a country, do not target regions, cities, metros, or postal codes in the same country. */
  countries?: Array<Country>;
  /** Regions to be targeted. For each region only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a region, do not target or exclude the country of the region. */
  regions?: Array<Region>;
  /** Cities to be targeted. For each city only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a city, do not target or exclude the country of the city, and do not target the metro or region of the city. */
  cities?: Array<City>;
  /** Metros to be targeted. For each metro only dmaId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a metro, do not target or exclude the country of the metro. */
  metros?: Array<Metro>;
  /** Postal codes to be targeted. For each postal code only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a postal code, do not target or exclude the country of the postal code. */
  postalCodes?: Array<PostalCode>;
}

export const GeoTargeting: Schema.Schema<GeoTargeting> = Schema.suspend(() => Schema.Struct({
  excludeCountries: Schema.optional(Schema.Boolean),
  countries: Schema.optional(Schema.Array(Country)),
  regions: Schema.optional(Schema.Array(Region)),
  cities: Schema.optional(Schema.Array(City)),
  metros: Schema.optional(Schema.Array(Metro)),
  postalCodes: Schema.optional(Schema.Array(PostalCode)),
})).annotate({ identifier: "GeoTargeting" }) as any as Schema.Schema<GeoTargeting>;

export interface OperatingSystem {
  /** DART ID of this operating system. This is the ID used for targeting. */
  dartId?: string;
  /** Name of this operating system. */
  name?: string;
  /** Whether this operating system is for desktop. */
  desktop?: boolean;
  /** Whether this operating system is for mobile. */
  mobile?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem". */
  kind?: string;
}

export const OperatingSystem: Schema.Schema<OperatingSystem> = Schema.suspend(() => Schema.Struct({
  dartId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  desktop: Schema.optional(Schema.Boolean),
  mobile: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "OperatingSystem" }) as any as Schema.Schema<OperatingSystem>;

export interface Browser {
  /** ID referring to this grouping of browser and version numbers. This is the ID used for targeting. */
  browserVersionId?: string;
  /** DART ID of this browser. This is the ID used when generating reports. */
  dartId?: string;
  /** Name of this browser. */
  name?: string;
  /** Major version number (leftmost number) of this browser. For example, for Chrome 5.0.376.86 beta, this field should be set to 5. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox ?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is. */
  majorVersion?: string;
  /** Minor version number (number after first dot on left) of this browser. For example, for Chrome 5.0.375.86 beta, this field should be set to 0. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox ?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is. */
  minorVersion?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#browser". */
  kind?: string;
}

export const Browser: Schema.Schema<Browser> = Schema.suspend(() => Schema.Struct({
  browserVersionId: Schema.optional(Schema.String),
  dartId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  majorVersion: Schema.optional(Schema.String),
  minorVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Browser" }) as any as Schema.Schema<Browser>;

export interface PlatformType {
  /** ID of this platform type. */
  id?: string;
  /** Name of this platform type. */
  name?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#platformType". */
  kind?: string;
}

export const PlatformType: Schema.Schema<PlatformType> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PlatformType" }) as any as Schema.Schema<PlatformType>;

export interface MobileCarrier {
  /** ID of this mobile carrier. */
  id?: string;
  /** Name of this mobile carrier. */
  name?: string;
  /** Country code of the country to which this mobile carrier belongs. */
  countryCode?: string;
  /** DART ID of the country to which this mobile carrier belongs. */
  countryDartId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileCarrier". */
  kind?: string;
}

export const MobileCarrier: Schema.Schema<MobileCarrier> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  countryDartId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileCarrier" }) as any as Schema.Schema<MobileCarrier>;

export interface ConnectionType {
  /** ID of this connection type. */
  id?: string;
  /** Name of this connection type. */
  name?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#connectionType". */
  kind?: string;
}

export const ConnectionType: Schema.Schema<ConnectionType> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectionType" }) as any as Schema.Schema<ConnectionType>;

export interface OperatingSystemVersion {
  /** ID of this operating system version. */
  id?: string;
  /** Name of this operating system version. */
  name?: string;
  /** Operating system of this operating system version. */
  operatingSystem?: OperatingSystem;
  /** Major version (leftmost number) of this operating system version. */
  majorVersion?: string;
  /** Minor version (number after the first dot) of this operating system version. */
  minorVersion?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemVersion". */
  kind?: string;
}

export const OperatingSystemVersion: Schema.Schema<OperatingSystemVersion> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  operatingSystem: Schema.optional(OperatingSystem),
  majorVersion: Schema.optional(Schema.String),
  minorVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "OperatingSystemVersion" }) as any as Schema.Schema<OperatingSystemVersion>;

export interface TechnologyTargeting {
  /** Operating systems that this ad targets. To target specific versions, use operatingSystemVersions. For each operating system only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system, do not set targeting for operating system versions for the same operating system. */
  operatingSystems?: Array<OperatingSystem>;
  /** Browsers that this ad targets. For each browser either set browserVersionId or dartId along with the version numbers. If both are specified, only browserVersionId will be used. The other fields are populated automatically when the ad is inserted or updated. */
  browsers?: Array<Browser>;
  /** Platform types that this ad targets. For example, desktop, mobile, or tablet. For each platform type, only id is required, and the other fields are populated automatically when the ad is inserted or updated. */
  platformTypes?: Array<PlatformType>;
  /** Mobile carriers that this ad targets. For each mobile carrier only id is required, and the other fields are populated automatically when the ad is inserted or updated. If targeting a mobile carrier, do not set targeting for any zip codes. */
  mobileCarriers?: Array<MobileCarrier>;
  /** Connection types that this ad targets. For each connection type only id is required. The other fields are populated automatically when the ad is inserted or updated. */
  connectionTypes?: Array<ConnectionType>;
  /** Operating system versions that this ad targets. To target all versions, use operatingSystems. For each operating system version, only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system version, do not set targeting for the corresponding operating system in operatingSystems. */
  operatingSystemVersions?: Array<OperatingSystemVersion>;
}

export const TechnologyTargeting: Schema.Schema<TechnologyTargeting> = Schema.suspend(() => Schema.Struct({
  operatingSystems: Schema.optional(Schema.Array(OperatingSystem)),
  browsers: Schema.optional(Schema.Array(Browser)),
  platformTypes: Schema.optional(Schema.Array(PlatformType)),
  mobileCarriers: Schema.optional(Schema.Array(MobileCarrier)),
  connectionTypes: Schema.optional(Schema.Array(ConnectionType)),
  operatingSystemVersions: Schema.optional(Schema.Array(OperatingSystemVersion)),
})).annotate({ identifier: "TechnologyTargeting" }) as any as Schema.Schema<TechnologyTargeting>;

export interface DayPartTargeting {
  /** Whether or not to use the user's local time. If false, the America/New York time zone applies. */
  userLocalTime?: boolean;
  /** Days of the week when the ad will serve. Acceptable values are: - "SUNDAY" - "MONDAY" - "TUESDAY" - "WEDNESDAY" - "THURSDAY" - "FRIDAY" - "SATURDAY" */
  daysOfWeek?: Array<"SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | (string & {})>;
  /** Hours of the day when the ad will serve, where 0 is midnight to 1 AM and 23 is 11 PM to midnight. Can be specified with days of week, in which case the ad would serve during these hours on the specified days. For example if Monday, Wednesday, Friday are the days of week specified and 9-10am, 3-5pm (hours 9, 15, and 16) is specified, the ad would serve Monday, Wednesdays, and Fridays at 9-10am and 3-5pm. Acceptable values are 0 to 23, inclusive. */
  hoursOfDay?: Array<number>;
}

export const DayPartTargeting: Schema.Schema<DayPartTargeting> = Schema.suspend(() => Schema.Struct({
  userLocalTime: Schema.optional(Schema.Boolean),
  daysOfWeek: Schema.optional(Schema.Array(Schema.String)),
  hoursOfDay: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "DayPartTargeting" }) as any as Schema.Schema<DayPartTargeting>;

export interface FrequencyCap {
  /** Number of times an individual user can be served the ad within the specified duration. Acceptable values are 1 to 15, inclusive. */
  impressions?: string;
  /** Duration of time, in seconds, for this frequency cap. The maximum duration is 90 days. Acceptable values are 1 to 7776000, inclusive. */
  duration?: string;
}

export const FrequencyCap: Schema.Schema<FrequencyCap> = Schema.suspend(() => Schema.Struct({
  impressions: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "FrequencyCap" }) as any as Schema.Schema<FrequencyCap>;

export interface DeliverySchedule {
  /** Whether or not hard cutoff is enabled. If true, the ad will not serve after the end date and time. Otherwise the ad will continue to be served until it has reached its delivery goals. */
  hardCutoff?: boolean;
  /** Serving priority of an ad, with respect to other ads. The lower the priority number, the greater the priority with which it is served. */
  priority?: "AD_PRIORITY_01" | "AD_PRIORITY_02" | "AD_PRIORITY_03" | "AD_PRIORITY_04" | "AD_PRIORITY_05" | "AD_PRIORITY_06" | "AD_PRIORITY_07" | "AD_PRIORITY_08" | "AD_PRIORITY_09" | "AD_PRIORITY_10" | "AD_PRIORITY_11" | "AD_PRIORITY_12" | "AD_PRIORITY_13" | "AD_PRIORITY_14" | "AD_PRIORITY_15" | "AD_PRIORITY_16" | (string & {});
  /** Impression ratio for this ad. This ratio determines how often each ad is served relative to the others. For example, if ad A has an impression ratio of 1 and ad B has an impression ratio of 3, then Campaign Manager will serve ad B three times as often as ad A. Acceptable values are 1 to 10, inclusive. */
  impressionRatio?: string;
  /** Limit on the number of times an individual user can be served the ad within a specified period of time. */
  frequencyCap?: FrequencyCap;
}

export const DeliverySchedule: Schema.Schema<DeliverySchedule> = Schema.suspend(() => Schema.Struct({
  hardCutoff: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.String),
  impressionRatio: Schema.optional(Schema.String),
  frequencyCap: Schema.optional(FrequencyCap),
})).annotate({ identifier: "DeliverySchedule" }) as any as Schema.Schema<DeliverySchedule>;

export interface ClickThroughUrl {
  /** Whether the campaign default landing page is used. */
  defaultLandingPage?: boolean;
  /** ID of the landing page for the click-through URL. Applicable if the defaultLandingPage field is set to false. */
  landingPageId?: string;
  /** Custom click-through URL. Applicable if the defaultLandingPage field is set to false and the landingPageId field is left unset. */
  customClickThroughUrl?: string;
  /** Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If defaultLandingPage is enabled then the campaign's default landing page URL is assigned to this field. - If defaultLandingPage is not enabled and a landingPageId is specified then that landing page's URL is assigned to this field. - If neither of the above cases apply, then the customClickThroughUrl is assigned to this field. */
  computedClickThroughUrl?: string;
}

export const ClickThroughUrl: Schema.Schema<ClickThroughUrl> = Schema.suspend(() => Schema.Struct({
  defaultLandingPage: Schema.optional(Schema.Boolean),
  landingPageId: Schema.optional(Schema.String),
  customClickThroughUrl: Schema.optional(Schema.String),
  computedClickThroughUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ClickThroughUrl" }) as any as Schema.Schema<ClickThroughUrl>;

export interface CreativeGroupAssignment {
  /** ID of the creative group to be assigned. */
  creativeGroupId?: string;
  /** Creative group number of the creative group assignment. */
  creativeGroupNumber?: "CREATIVE_GROUP_ONE" | "CREATIVE_GROUP_TWO" | (string & {});
}

export const CreativeGroupAssignment: Schema.Schema<CreativeGroupAssignment> = Schema.suspend(() => Schema.Struct({
  creativeGroupId: Schema.optional(Schema.String),
  creativeGroupNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeGroupAssignment" }) as any as Schema.Schema<CreativeGroupAssignment>;

export interface RichMediaExitOverride {
  /** ID for the override to refer to a specific exit in the creative. */
  exitId?: string;
  /** Whether to use the clickThroughUrl. If false, the creative-level exit will be used. */
  enabled?: boolean;
  /** Click-through URL of this rich media exit override. Applicable if the enabled field is set to true. */
  clickThroughUrl?: ClickThroughUrl;
}

export const RichMediaExitOverride: Schema.Schema<RichMediaExitOverride> = Schema.suspend(() => Schema.Struct({
  exitId: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  clickThroughUrl: Schema.optional(ClickThroughUrl),
})).annotate({ identifier: "RichMediaExitOverride" }) as any as Schema.Schema<RichMediaExitOverride>;

export interface CompanionClickThroughOverride {
  /** ID of the creative for this companion click-through override. */
  creativeId?: string;
  /** Click-through URL of this companion click-through override. */
  clickThroughUrl?: ClickThroughUrl;
}

export const CompanionClickThroughOverride: Schema.Schema<CompanionClickThroughOverride> = Schema.suspend(() => Schema.Struct({
  creativeId: Schema.optional(Schema.String),
  clickThroughUrl: Schema.optional(ClickThroughUrl),
})).annotate({ identifier: "CompanionClickThroughOverride" }) as any as Schema.Schema<CompanionClickThroughOverride>;

export interface CreativeAssignment {
  /** ID of the creative to be assigned. This is a required field. */
  creativeId?: string;
  /** Whether this creative assignment is active. When true, the creative will be included in the ad's rotation. */
  active?: boolean;
  /** Weight of the creative assignment, applicable when the rotation type is CREATIVE_ROTATION_TYPE_RANDOM. Value must be greater than or equal to 1. */
  weight?: number;
  startTime?: string;
  endTime?: string;
  /** Sequence number of the creative assignment, applicable when the rotation type is CREATIVE_ROTATION_TYPE_SEQUENTIAL. Acceptable values are 1 to 65535, inclusive. */
  sequence?: number;
  /** Click-through URL of the creative assignment. */
  clickThroughUrl?: ClickThroughUrl;
  /** Creative group assignments for this creative assignment. Only one assignment per creative group number is allowed for a maximum of two assignments. */
  creativeGroupAssignments?: Array<CreativeGroupAssignment>;
  /** Rich media exit overrides for this creative assignment. Applicable when the creative type is any of the following: - DISPLAY - RICH_MEDIA_INPAGE - RICH_MEDIA_INPAGE_FLOATING - RICH_MEDIA_IM_EXPAND - RICH_MEDIA_EXPANDING - RICH_MEDIA_INTERSTITIAL_FLOAT - RICH_MEDIA_MOBILE_IN_APP - RICH_MEDIA_MULTI_FLOATING - RICH_MEDIA_PEEL_DOWN - VPAID_LINEAR - VPAID_NON_LINEAR */
  richMediaExitOverrides?: Array<RichMediaExitOverride>;
  /** Companion creative overrides for this creative assignment. Applicable to video ads. */
  companionCreativeOverrides?: Array<CompanionClickThroughOverride>;
  /** Whether applicable event tags should fire when this creative assignment is rendered. If this value is unset when the ad is inserted or updated, it will default to true for all creative types EXCEPT for INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO. */
  applyEventTags?: boolean;
  /** Whether the creative to be assigned is SSL-compliant. This is a read-only field that is auto-generated when the ad is inserted or updated. */
  sslCompliant?: boolean;
  /** Dimension value for the ID of the creative. This is a read-only, auto-generated field. */
  creativeIdDimensionValue?: DimensionValue;
}

export const CreativeAssignment: Schema.Schema<CreativeAssignment> = Schema.suspend(() => Schema.Struct({
  creativeId: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  weight: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  sequence: Schema.optional(Schema.Number),
  clickThroughUrl: Schema.optional(ClickThroughUrl),
  creativeGroupAssignments: Schema.optional(Schema.Array(CreativeGroupAssignment)),
  richMediaExitOverrides: Schema.optional(Schema.Array(RichMediaExitOverride)),
  companionCreativeOverrides: Schema.optional(Schema.Array(CompanionClickThroughOverride)),
  applyEventTags: Schema.optional(Schema.Boolean),
  sslCompliant: Schema.optional(Schema.Boolean),
  creativeIdDimensionValue: Schema.optional(DimensionValue),
})).annotate({ identifier: "CreativeAssignment" }) as any as Schema.Schema<CreativeAssignment>;

export interface CreativeRotation {
  /** Type of creative rotation. Can be used to specify whether to use sequential or random rotation. */
  type?: "CREATIVE_ROTATION_TYPE_SEQUENTIAL" | "CREATIVE_ROTATION_TYPE_RANDOM" | (string & {});
  /** Strategy for calculating weights. Used with CREATIVE_ROTATION_TYPE_RANDOM. */
  weightCalculationStrategy?: "WEIGHT_STRATEGY_EQUAL" | "WEIGHT_STRATEGY_CUSTOM" | "WEIGHT_STRATEGY_HIGHEST_CTR" | "WEIGHT_STRATEGY_OPTIMIZED" | (string & {});
  /** Creative optimization configuration that is used by this ad. It should refer to one of the existing optimization configurations in the ad's campaign. If it is unset or set to 0, then the campaign's default optimization configuration will be used for this ad. */
  creativeOptimizationConfigurationId?: string;
  /** Creative assignments in this creative rotation. */
  creativeAssignments?: Array<CreativeAssignment>;
}

export const CreativeRotation: Schema.Schema<CreativeRotation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  weightCalculationStrategy: Schema.optional(Schema.String),
  creativeOptimizationConfigurationId: Schema.optional(Schema.String),
  creativeAssignments: Schema.optional(Schema.Array(CreativeAssignment)),
})).annotate({ identifier: "CreativeRotation" }) as any as Schema.Schema<CreativeRotation>;

export interface ListTargetingExpression {
  /** Expression describing which lists are being targeted by the ad. */
  expression?: string;
}

export const ListTargetingExpression: Schema.Schema<ListTargetingExpression> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTargetingExpression" }) as any as Schema.Schema<ListTargetingExpression>;

export interface KeyValueTargetingExpression {
  /** Keyword expression being targeted by the ad. */
  expression?: string;
}

export const KeyValueTargetingExpression: Schema.Schema<KeyValueTargetingExpression> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyValueTargetingExpression" }) as any as Schema.Schema<KeyValueTargetingExpression>;

export interface Size {
  /** ID of this size. This is a read-only, auto-generated field. */
  id?: string;
  /** Width of this size. Acceptable values are 0 to 32767, inclusive. */
  width?: number;
  /** Height of this size. Acceptable values are 0 to 32767, inclusive. */
  height?: number;
  /** IAB standard size. This is a read-only, auto-generated field. */
  iab?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#size". */
  kind?: string;
}

export const Size: Schema.Schema<Size> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  iab: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Size" }) as any as Schema.Schema<Size>;

export interface Language {
  /** Language ID of this language. This is the ID used for targeting and generating reports. */
  id?: string;
  /** Name of this language. */
  name?: string;
  /** Format of language code is an ISO 639 two-letter language code optionally followed by an underscore followed by an ISO 3166 code. Examples are "en" for English or "zh_CN" for Simplified Chinese. */
  languageCode?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#language". */
  kind?: string;
}

export const Language: Schema.Schema<Language> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Language" }) as any as Schema.Schema<Language>;

export interface LanguageTargeting {
  /** Languages that this ad targets. For each language only languageId is required. The other fields are populated automatically when the ad is inserted or updated. */
  languages?: Array<Language>;
}

export const LanguageTargeting: Schema.Schema<LanguageTargeting> = Schema.suspend(() => Schema.Struct({
  languages: Schema.optional(Schema.Array(Language)),
})).annotate({ identifier: "LanguageTargeting" }) as any as Schema.Schema<LanguageTargeting>;

export interface ContextualKeyword {
  /** The keyword that can be targeted by ads. */
  keyword?: string;
}

export const ContextualKeyword: Schema.Schema<ContextualKeyword> = Schema.suspend(() => Schema.Struct({
  keyword: Schema.optional(Schema.String),
})).annotate({ identifier: "ContextualKeyword" }) as any as Schema.Schema<ContextualKeyword>;

export interface ContextualKeywordTargeting {
  /** Contextual keywords that this ad targets */
  keywords?: Array<ContextualKeyword>;
}

export const ContextualKeywordTargeting: Schema.Schema<ContextualKeywordTargeting> = Schema.suspend(() => Schema.Struct({
  keywords: Schema.optional(Schema.Array(ContextualKeyword)),
})).annotate({ identifier: "ContextualKeywordTargeting" }) as any as Schema.Schema<ContextualKeywordTargeting>;

export interface Ad {
  /** ID of this ad. This is a read-only, auto-generated field. */
  id?: string;
  /** Campaign ID of this ad. This is a required field on insertion. */
  campaignId?: string;
  /** Advertiser ID of this ad. This is a required field on insertion. */
  advertiserId?: string;
  /** Subaccount ID of this ad. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Account ID of this ad. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Name of this ad. This is a required field and must be less than 256 characters long. */
  name?: string;
  /** Whether this ad is active. When true, archived must be false. */
  active?: boolean;
  /** Whether this ad is archived. When true, active must be false. */
  archived?: boolean;
  /** Comments for this ad. */
  comments?: string;
  startTime?: string;
  endTime?: string;
  /** Placement assignments for this ad. */
  placementAssignments?: Array<PlacementAssignment>;
  /** Event tag overrides for this ad. */
  eventTagOverrides?: Array<EventTagOverride>;
  /** Click-through URL suffix properties for this ad. Applies to the URL in the ad or (if overriding ad properties) the URL in the creative. */
  clickThroughUrlSuffixProperties?: ClickThroughUrlSuffixProperties;
  /** Default click-through event tag properties for this ad. */
  defaultClickThroughEventTagProperties?: DefaultClickThroughEventTagProperties;
  /** Information about the creation of this ad. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Information about the most recent modification of this ad. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
  /** Whether this ad requires ssl. This is a read-only field that is auto-generated when the ad is inserted or updated. */
  sslRequired?: boolean;
  /** Whether this ad is ssl compliant. This is a read-only field that is auto-generated when the ad is inserted or updated. */
  sslCompliant?: boolean;
  /** Type of ad. This is a required field on insertion. Note that default ads ( AD_SERVING_DEFAULT_AD) cannot be created directly (see Creative resource). */
  type?: "AD_SERVING_STANDARD_AD" | "AD_SERVING_DEFAULT_AD" | "AD_SERVING_CLICK_TRACKER" | "AD_SERVING_TRACKING" | "AD_SERVING_BRAND_SAFE_AD" | (string & {});
  /** Geographical targeting information for this ad. This field must be left blank if the ad is using a targeting template. Applicable when type is AD_SERVING_STANDARD_AD. */
  geoTargeting?: GeoTargeting;
  /** Technology platform targeting information for this ad. This field must be left blank if the ad is using a targeting template. Applicable when type is AD_SERVING_STANDARD_AD. */
  technologyTargeting?: TechnologyTargeting;
  /** Time and day targeting information for this ad. This field must be left blank if the ad is using a targeting template. Applicable when type is AD_SERVING_STANDARD_AD. */
  dayPartTargeting?: DayPartTargeting;
  /** Delivery schedule information for this ad. Applicable when type is AD_SERVING_STANDARD_AD or AD_SERVING_TRACKING. This field along with subfields priority and impressionRatio are required on insertion when type is AD_SERVING_STANDARD_AD. */
  deliverySchedule?: DeliverySchedule;
  /** Creative rotation for this ad. Applicable when type is AD_SERVING_DEFAULT_AD, AD_SERVING_STANDARD_AD, or AD_SERVING_TRACKING. When type is AD_SERVING_DEFAULT_AD, this field should have exactly one creativeAssignment . */
  creativeRotation?: CreativeRotation;
  /** Remarketing list targeting expression for this ad. This field must be left blank if the ad is using a targeting template. Applicable when type is AD_SERVING_STANDARD_AD. */
  remarketingListExpression?: ListTargetingExpression;
  /** Audience segment ID that is being targeted for this ad. Applicable when type is AD_SERVING_STANDARD_AD. */
  audienceSegmentId?: string;
  /** Key-value targeting information for this ad. This field must be left blank if the ad is using a targeting template. Applicable when type is AD_SERVING_STANDARD_AD. */
  keyValueTargetingExpression?: KeyValueTargetingExpression;
  /** Click-through URL for this ad. This is a required field on insertion. Applicable when type is AD_SERVING_CLICK_TRACKER. */
  clickThroughUrl?: ClickThroughUrl;
  /** Creative group assignments for this ad. Applicable when type is AD_SERVING_CLICK_TRACKER. Only one assignment per creative group number is allowed for a maximum of two assignments. */
  creativeGroupAssignments?: Array<CreativeGroupAssignment>;
  /** Size of this ad. Applicable when type is AD_SERVING_DEFAULT_AD. */
  size?: Size;
  /** Compatibility of this ad. Applicable when type is AD_SERVING_DEFAULT_AD. DISPLAY and DISPLAY_INTERSTITIAL refer to either rendering on desktop or on mobile devices or in mobile apps for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are only used for existing default ads. New mobile placements must be assigned DISPLAY or DISPLAY_INTERSTITIAL and default ads created for those placements will be limited to those compatibility types. IN_STREAM_VIDEO refers to rendering in-stream video ads developed with the VAST standard. */
  compatibility?: "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO" | (string & {});
  /** Dimension value for the ID of this ad. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the campaign. This is a read-only, auto-generated field. */
  campaignIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Whether this ad is a dynamic click tracker. Applicable when type is AD_SERVING_CLICK_TRACKER. This is a required field on insert, and is read-only after insert. */
  dynamicClickTracker?: boolean;
  /** Language targeting information for this ad. This field must be left blank if the ad is using a targeting template. Applicable when type is AD_SERVING_STANDARD_AD. */
  languageTargeting?: LanguageTargeting;
  /** Targeting template ID, used to apply preconfigured targeting information to this ad. This cannot be set while any of dayPartTargeting, geoTargeting, keyValueTargetingExpression, languageTargeting, remarketingListExpression, or technologyTargeting are set. Applicable when type is AD_SERVING_STANDARD_AD. */
  targetingTemplateId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#ad". */
  kind?: string;
  /** Optional. Contextual keyword targeting information for this ad. */
  contextualKeywordTargeting?: ContextualKeywordTargeting;
}

export const Ad: Schema.Schema<Ad> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  archived: Schema.optional(Schema.Boolean),
  comments: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  placementAssignments: Schema.optional(Schema.Array(PlacementAssignment)),
  eventTagOverrides: Schema.optional(Schema.Array(EventTagOverride)),
  clickThroughUrlSuffixProperties: Schema.optional(ClickThroughUrlSuffixProperties),
  defaultClickThroughEventTagProperties: Schema.optional(DefaultClickThroughEventTagProperties),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
  sslRequired: Schema.optional(Schema.Boolean),
  sslCompliant: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  geoTargeting: Schema.optional(GeoTargeting),
  technologyTargeting: Schema.optional(TechnologyTargeting),
  dayPartTargeting: Schema.optional(DayPartTargeting),
  deliverySchedule: Schema.optional(DeliverySchedule),
  creativeRotation: Schema.optional(CreativeRotation),
  remarketingListExpression: Schema.optional(ListTargetingExpression),
  audienceSegmentId: Schema.optional(Schema.String),
  keyValueTargetingExpression: Schema.optional(KeyValueTargetingExpression),
  clickThroughUrl: Schema.optional(ClickThroughUrl),
  creativeGroupAssignments: Schema.optional(Schema.Array(CreativeGroupAssignment)),
  size: Schema.optional(Size),
  compatibility: Schema.optional(Schema.String),
  idDimensionValue: Schema.optional(DimensionValue),
  campaignIdDimensionValue: Schema.optional(DimensionValue),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  dynamicClickTracker: Schema.optional(Schema.Boolean),
  languageTargeting: Schema.optional(LanguageTargeting),
  targetingTemplateId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  contextualKeywordTargeting: Schema.optional(ContextualKeywordTargeting),
})).annotate({ identifier: "Ad" }) as any as Schema.Schema<Ad>;

export interface AdsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#adsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Ad collection. */
  ads?: Array<Ad>;
}

export const AdsListResponse: Schema.Schema<AdsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  ads: Schema.optional(Schema.Array(Ad)),
})).annotate({ identifier: "AdsListResponse" }) as any as Schema.Schema<AdsListResponse>;

export interface AdvertiserGroup {
  /** ID of this advertiser group. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this advertiser group. This is a required field and must be less than 256 characters long and unique among advertiser groups of the same account. */
  name?: string;
  /** Account ID of this advertiser group. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#advertiserGroup". */
  kind?: string;
}

export const AdvertiserGroup: Schema.Schema<AdvertiserGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvertiserGroup" }) as any as Schema.Schema<AdvertiserGroup>;

export interface AdvertiserGroupsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#advertiserGroupsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Advertiser group collection. */
  advertiserGroups?: Array<AdvertiserGroup>;
}

export const AdvertiserGroupsListResponse: Schema.Schema<AdvertiserGroupsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  advertiserGroups: Schema.optional(Schema.Array(AdvertiserGroup)),
})).annotate({ identifier: "AdvertiserGroupsListResponse" }) as any as Schema.Schema<AdvertiserGroupsListResponse>;

export interface MeasurementPartnerAdvertiserLink {
  /** Measurement partner used for tag wrapping. */
  measurementPartner?: "NONE" | "INTEGRAL_AD_SCIENCE" | "DOUBLE_VERIFY" | (string & {});
  /** Status of the partner link. */
  linkStatus?: "MEASUREMENT_PARTNER_UNLINKED" | "MEASUREMENT_PARTNER_LINKED" | "MEASUREMENT_PARTNER_LINK_PENDING" | "MEASUREMENT_PARTNER_LINK_FAILURE" | "MEASUREMENT_PARTNER_LINK_OPT_OUT" | "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING" | "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING" | "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING" | "MEASUREMENT_PARTNER_UNLINK_PENDING" | (string & {});
  /** partner Advertiser Id. */
  partnerAdvertiserId?: string;
}

export const MeasurementPartnerAdvertiserLink: Schema.Schema<MeasurementPartnerAdvertiserLink> = Schema.suspend(() => Schema.Struct({
  measurementPartner: Schema.optional(Schema.String),
  linkStatus: Schema.optional(Schema.String),
  partnerAdvertiserId: Schema.optional(Schema.String),
})).annotate({ identifier: "MeasurementPartnerAdvertiserLink" }) as any as Schema.Schema<MeasurementPartnerAdvertiserLink>;

export interface Advertiser {
  /** ID of this advertiser. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this advertiser. This is a required field and must be less than 256 characters long and unique among advertisers of the same account. */
  name?: string;
  /** Account ID of this advertiser.This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this advertiser.This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Floodlight configuration ID of this advertiser. The floodlight configuration ID will be created automatically, so on insert this field should be left blank. This field can be set to another advertiser's floodlight configuration ID in order to share that advertiser's floodlight configuration with this advertiser, so long as: - This advertiser's original floodlight configuration is not already associated with floodlight activities or floodlight activity groups. - This advertiser's original floodlight configuration is not already shared with another advertiser. */
  floodlightConfigurationId?: string;
  /** ID of the advertiser group this advertiser belongs to. You can group advertisers for reporting purposes, allowing you to see aggregated information for all advertisers in each group. */
  advertiserGroupId?: string;
  /** Status of this advertiser. */
  status?: "APPROVED" | "ON_HOLD" | (string & {});
  /** Default email address used in sender field for tag emails. */
  defaultEmail?: string;
  /** Suffix added to click-through URL of ad creative associations under this advertiser. Must be less than 129 characters long. */
  clickThroughUrlSuffix?: string;
  /** ID of the click-through event tag to apply by default to the landing pages of this advertiser's campaigns. */
  defaultClickThroughEventTagId?: string;
  /** Dimension value for the ID of this advertiser. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the floodlight configuration. This is a read-only, auto-generated field. */
  floodlightConfigurationIdDimensionValue?: DimensionValue;
  /** Original floodlight configuration before any sharing occurred. Set the floodlightConfigurationId of this advertiser to originalFloodlightConfigurationId to unshare the advertiser's current floodlight configuration. You cannot unshare an advertiser's floodlight configuration if the shared configuration has activities associated with any campaign or placement. */
  originalFloodlightConfigurationId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#advertiser". */
  kind?: string;
  /** Suspension status of this advertiser. */
  suspended?: boolean;
  /** Measurement partner advertiser link for tag wrapping. */
  measurementPartnerLink?: MeasurementPartnerAdvertiserLink;
  /** Optional. Whether the advertiser plans to serve EU political ads. */
  euPoliticalAdsDeclaration?: "ADVERTISER_PLANS_TO_SERVE_EU_POLITICAL_ADS" | "ADVERTISER_DOES_NOT_PLAN_TO_SERVE_EU_POLITICAL_ADS" | (string & {});
}

export const Advertiser: Schema.Schema<Advertiser> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  floodlightConfigurationId: Schema.optional(Schema.String),
  advertiserGroupId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  defaultEmail: Schema.optional(Schema.String),
  clickThroughUrlSuffix: Schema.optional(Schema.String),
  defaultClickThroughEventTagId: Schema.optional(Schema.String),
  idDimensionValue: Schema.optional(DimensionValue),
  floodlightConfigurationIdDimensionValue: Schema.optional(DimensionValue),
  originalFloodlightConfigurationId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  suspended: Schema.optional(Schema.Boolean),
  measurementPartnerLink: Schema.optional(MeasurementPartnerAdvertiserLink),
  euPoliticalAdsDeclaration: Schema.optional(Schema.String),
})).annotate({ identifier: "Advertiser" }) as any as Schema.Schema<Advertiser>;

export interface AdvertisersListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#advertisersListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Advertiser collection. */
  advertisers?: Array<Advertiser>;
}

export const AdvertisersListResponse: Schema.Schema<AdvertisersListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  advertisers: Schema.optional(Schema.Array(Advertiser)),
})).annotate({ identifier: "AdvertisersListResponse" }) as any as Schema.Schema<AdvertisersListResponse>;

export interface BillingAssignment {
  /** ID of the account associated with the billing assignment.This is a read-only, auto-generated field. */
  accountId?: string;
  /** ID of the subaccount associated with the billing assignment.Wildcard (*) means this assignment is not limited to a single subaccountThis is a read-only, auto-generated field. */
  subaccountId?: string;
  /** ID of the advertiser associated with the billing assignment.Wildcard (*) means this assignment is not limited to a single advertiser */
  advertiserId?: string;
  /** ID of the campaign associated with the billing assignment. Wildcard (*) means this assignment is not limited to a single campaign */
  campaignId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingAssignment". */
  kind?: string;
}

export const BillingAssignment: Schema.Schema<BillingAssignment> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "BillingAssignment" }) as any as Schema.Schema<BillingAssignment>;

export interface BillingAssignmentsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingAssignmentsListResponse". */
  kind?: string;
  /** Billing assignments collection. */
  billingAssignments?: Array<BillingAssignment>;
}

export const BillingAssignmentsListResponse: Schema.Schema<BillingAssignmentsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  billingAssignments: Schema.optional(Schema.Array(BillingAssignment)),
})).annotate({ identifier: "BillingAssignmentsListResponse" }) as any as Schema.Schema<BillingAssignmentsListResponse>;

export interface BillingProfile {
  /** ID of this billing profile. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this billing profile. This is a required field and must be less than 256 characters long and must be unique among billing profile in the same account. */
  name?: string;
  /** Status of this billing profile.This is a read-only field. */
  status?: "UNDER_REVIEW" | "ACTIVE" | "ARCHIVED" | (string & {});
  /** Country code of this billing profile.This is a read-only field. */
  countryCode?: string;
  /** Billing currency code in ISO 4217 format.This is a read-only field. */
  currencyCode?: string;
  /** Purchase order (PO) for this billing profile. This PO number is used in the invoices for all of the advertisers in this billing profile. */
  purchaseOrder?: string;
  /** Invoice level for this billing profile. Used to group fees into separate invoices by account, advertiser, or campaign. */
  invoiceLevel?: "ACCOUNT_LEVEL" | "ADVERTISER_LEVEL" | "CAMPAIGN_LEVEL" | (string & {});
  /** Consolidated invoice option for this billing profile. Used to get a single, consolidated invoice across the chosen invoice level. */
  consolidatedInvoice?: boolean;
  /** The ID of the payment account the billing profile belongs to. This is a read-only field. */
  paymentsAccountId?: string;
  /** The ID of the payment customer the billing profile belongs to. This is a read-only field. */
  paymentsCustomerId?: string;
  /** The ID of the secondary payment customer the billing profile belongs to. This is a read-only field. */
  secondaryPaymentsCustomerId?: string;
  /** True if the billing profile is the account default profile. This is a read-only field. */
  isDefault?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingProfile". */
  kind?: string;
}

export const BillingProfile: Schema.Schema<BillingProfile> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  purchaseOrder: Schema.optional(Schema.String),
  invoiceLevel: Schema.optional(Schema.String),
  consolidatedInvoice: Schema.optional(Schema.Boolean),
  paymentsAccountId: Schema.optional(Schema.String),
  paymentsCustomerId: Schema.optional(Schema.String),
  secondaryPaymentsCustomerId: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "BillingProfile" }) as any as Schema.Schema<BillingProfile>;

export interface BillingProfilesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingProfilesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Billing profiles collection. */
  billingProfiles?: Array<BillingProfile>;
}

export const BillingProfilesListResponse: Schema.Schema<BillingProfilesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  billingProfiles: Schema.optional(Schema.Array(BillingProfile)),
})).annotate({ identifier: "BillingProfilesListResponse" }) as any as Schema.Schema<BillingProfilesListResponse>;

export interface BillingRateTieredRate {
  /** The minimum for this tier range. */
  lowValue?: string;
  /** The maximum for this tier range. */
  highValue?: string;
  /** Rate in micros for this tier. */
  rateInMicros?: string;
}

export const BillingRateTieredRate: Schema.Schema<BillingRateTieredRate> = Schema.suspend(() => Schema.Struct({
  lowValue: Schema.optional(Schema.String),
  highValue: Schema.optional(Schema.String),
  rateInMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "BillingRateTieredRate" }) as any as Schema.Schema<BillingRateTieredRate>;

export interface BillingRate {
  /** ID of this billing rate. */
  id?: string;
  /** Name of this billing rate. This must be less than 256 characters long. */
  name?: string;
  /** Type of this billing rate. */
  type?: "AD_SERVING" | "CLICKS" | "MINIMUM_SERVICE" | "PATH_TO_CONVERSION" | "RICH_MEDIA_INPAGE" | "RICH_MEDIA_EXPANDING" | "RICH_MEDIA_FLOATING" | "RICH_MEDIA_VIDEO" | "RICH_MEDIA_TEASER" | "RICH_MEDIA_VPAID" | "INSTREAM_VIDEO" | "PIXEL" | "TRACKING" | "TRAFFICKING_FEATURE" | "CUSTOM_REPORTS" | "EXPOSURE_TO_CONVERSION" | "DATA_TRANSFER" | "DATA_TRANSFER_SETUP" | "STARTUP" | "STATEMENT_OF_WORK" | "PROVIDED_LIST" | "PROVIDED_LIST_SETUP" | "ENHANCED_FORMATS" | "TRACKING_AD_IMPRESSIONS" | "TRACKING_AD_CLICKS" | "NIELSEN_DIGITAL_AD_RATINGS_FEE" | "INSTREAM_VIDEO_REDIRECT" | "INSTREAM_VIDEO_VPAID" | "DISPLAY_AD_SERVING" | "VIDEO_AD_SERVING" | "AUDIO_AD_SERVING" | "ADVANCED_DISPLAY_AD_SERVING" | (string & {});
  /** Start date of this billing rate. */
  startDate?: string;
  /** End date of this billing rate. */
  endDate?: string;
  /** Billing currency code in ISO 4217 format. */
  currencyCode?: string;
  /** Unit of measure for this billing rate. */
  unitOfMeasure?: "CPM" | "CPC" | "EA" | "P2C" | (string & {});
  /** Flat rate in micros of this billing rate. This cannot co-exist with tiered rate. */
  rateInMicros?: string;
  /** Tiered rate of this billing rate. This cannot co-exist with flat rate. */
  tieredRates?: Array<BillingRateTieredRate>;
}

export const BillingRate: Schema.Schema<BillingRate> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  unitOfMeasure: Schema.optional(Schema.String),
  rateInMicros: Schema.optional(Schema.String),
  tieredRates: Schema.optional(Schema.Array(BillingRateTieredRate)),
})).annotate({ identifier: "BillingRate" }) as any as Schema.Schema<BillingRate>;

export interface BillingRatesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#billingRatesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Billing rates collection. */
  billingRates?: Array<BillingRate>;
}

export const BillingRatesListResponse: Schema.Schema<BillingRatesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  billingRates: Schema.optional(Schema.Array(BillingRate)),
})).annotate({ identifier: "BillingRatesListResponse" }) as any as Schema.Schema<BillingRatesListResponse>;

export interface BrowsersListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#browsersListResponse". */
  kind?: string;
  /** Browser collection. */
  browsers?: Array<Browser>;
}

export const BrowsersListResponse: Schema.Schema<BrowsersListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  browsers: Schema.optional(Schema.Array(Browser)),
})).annotate({ identifier: "BrowsersListResponse" }) as any as Schema.Schema<BrowsersListResponse>;

export interface CampaignCreativeAssociation {
  /** ID of the creative associated with the campaign. This is a required field. */
  creativeId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#campaignCreativeAssociation". */
  kind?: string;
}

export const CampaignCreativeAssociation: Schema.Schema<CampaignCreativeAssociation> = Schema.suspend(() => Schema.Struct({
  creativeId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CampaignCreativeAssociation" }) as any as Schema.Schema<CampaignCreativeAssociation>;

export interface CampaignCreativeAssociationsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#campaignCreativeAssociationsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Campaign creative association collection */
  campaignCreativeAssociations?: Array<CampaignCreativeAssociation>;
}

export const CampaignCreativeAssociationsListResponse: Schema.Schema<CampaignCreativeAssociationsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  campaignCreativeAssociations: Schema.optional(Schema.Array(CampaignCreativeAssociation)),
})).annotate({ identifier: "CampaignCreativeAssociationsListResponse" }) as any as Schema.Schema<CampaignCreativeAssociationsListResponse>;

export interface AudienceSegment {
  /** ID of this audience segment. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this audience segment. This is a required field and must be less than 65 characters long. */
  name?: string;
  /** Weight allocated to this segment. The weight assigned will be understood in proportion to the weights assigned to other segments in the same segment group. Acceptable values are 1 to 1000, inclusive. */
  allocation?: number;
}

export const AudienceSegment: Schema.Schema<AudienceSegment> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  allocation: Schema.optional(Schema.Number),
})).annotate({ identifier: "AudienceSegment" }) as any as Schema.Schema<AudienceSegment>;

export interface AudienceSegmentGroup {
  /** ID of this audience segment group. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this audience segment group. This is a required field and must be less than 65 characters long. */
  name?: string;
  /** Audience segments assigned to this group. The number of segments must be between 2 and 100. */
  audienceSegments?: Array<AudienceSegment>;
}

export const AudienceSegmentGroup: Schema.Schema<AudienceSegmentGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  audienceSegments: Schema.optional(Schema.Array(AudienceSegment)),
})).annotate({ identifier: "AudienceSegmentGroup" }) as any as Schema.Schema<AudienceSegmentGroup>;

export interface OptimizationActivity {
  /** Floodlight activity ID of this optimization activity. This is a required field. */
  floodlightActivityId?: string;
  /** Weight associated with this optimization. The weight assigned will be understood in proportion to the weights assigned to the other optimization activities. Value must be greater than or equal to 1. */
  weight?: number;
  /** Dimension value for the ID of the floodlight activity. This is a read-only, auto-generated field. */
  floodlightActivityIdDimensionValue?: DimensionValue;
}

export const OptimizationActivity: Schema.Schema<OptimizationActivity> = Schema.suspend(() => Schema.Struct({
  floodlightActivityId: Schema.optional(Schema.String),
  weight: Schema.optional(Schema.Number),
  floodlightActivityIdDimensionValue: Schema.optional(DimensionValue),
})).annotate({ identifier: "OptimizationActivity" }) as any as Schema.Schema<OptimizationActivity>;

export interface CreativeOptimizationConfiguration {
  /** Optimization model for this configuration. */
  optimizationModel?: "CLICK" | "POST_CLICK" | "POST_IMPRESSION" | "POST_CLICK_AND_IMPRESSION" | "VIDEO_COMPLETION" | (string & {});
  /** List of optimization activities associated with this configuration. */
  optimizationActivitys?: Array<OptimizationActivity>;
  /** ID of this creative optimization config. This field is auto-generated when the campaign is inserted or updated. It can be null for existing campaigns. */
  id?: string;
  /** Name of this creative optimization config. This is a required field and must be less than 129 characters long. */
  name?: string;
}

export const CreativeOptimizationConfiguration: Schema.Schema<CreativeOptimizationConfiguration> = Schema.suspend(() => Schema.Struct({
  optimizationModel: Schema.optional(Schema.String),
  optimizationActivitys: Schema.optional(Schema.Array(OptimizationActivity)),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeOptimizationConfiguration" }) as any as Schema.Schema<CreativeOptimizationConfiguration>;

export interface AdBlockingConfiguration {
  /** Whether this campaign has enabled ad blocking. When true, ad blocking is enabled for placements in the campaign, but this may be overridden by site and placement settings. When false, ad blocking is disabled for all placements under the campaign, regardless of site and placement settings. */
  enabled?: boolean;
}

export const AdBlockingConfiguration: Schema.Schema<AdBlockingConfiguration> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdBlockingConfiguration" }) as any as Schema.Schema<AdBlockingConfiguration>;

export interface MeasurementPartnerCampaignLink {
  /** Measurement partner used for tag wrapping. */
  measurementPartner?: "NONE" | "INTEGRAL_AD_SCIENCE" | "DOUBLE_VERIFY" | (string & {});
  /** . */
  linkStatus?: "MEASUREMENT_PARTNER_UNLINKED" | "MEASUREMENT_PARTNER_LINKED" | "MEASUREMENT_PARTNER_LINK_PENDING" | "MEASUREMENT_PARTNER_LINK_FAILURE" | "MEASUREMENT_PARTNER_LINK_OPT_OUT" | "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING" | "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING" | "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING" | "MEASUREMENT_PARTNER_UNLINK_PENDING" | (string & {});
  /** Partner campaign ID needed for establishing linking with Measurement partner. */
  partnerCampaignId?: string;
}

export const MeasurementPartnerCampaignLink: Schema.Schema<MeasurementPartnerCampaignLink> = Schema.suspend(() => Schema.Struct({
  measurementPartner: Schema.optional(Schema.String),
  linkStatus: Schema.optional(Schema.String),
  partnerCampaignId: Schema.optional(Schema.String),
})).annotate({ identifier: "MeasurementPartnerCampaignLink" }) as any as Schema.Schema<MeasurementPartnerCampaignLink>;

export interface Campaign {
  /** ID of this campaign. This is a read-only auto-generated field. */
  id?: string;
  /** Account ID of this campaign. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this campaign. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of this campaign. This is a required field. */
  advertiserId?: string;
  /** Advertiser group ID of the associated advertiser. */
  advertiserGroupId?: string;
  /** Name of this campaign. This is a required field and must be less than 512 characters long and unique among campaigns of the same advertiser. */
  name?: string;
  /** Whether this campaign has been archived. */
  archived?: boolean;
  startDate?: string;
  endDate?: string;
  /** Arbitrary comments about this campaign. Must be less than 256 characters long. */
  comment?: string;
  /** Billing invoice code included in the Campaign Manager client billing invoices associated with the campaign. */
  billingInvoiceCode?: string;
  /** Audience segment groups assigned to this campaign. Cannot have more than 300 segment groups. */
  audienceSegmentGroups?: Array<AudienceSegmentGroup>;
  /** Overrides that can be used to activate or deactivate advertiser event tags. */
  eventTagOverrides?: Array<EventTagOverride>;
  /** Click-through URL suffix override properties for this campaign. */
  clickThroughUrlSuffixProperties?: ClickThroughUrlSuffixProperties;
  /** Click-through event tag ID override properties for this campaign. */
  defaultClickThroughEventTagProperties?: DefaultClickThroughEventTagProperties;
  /** List of creative group IDs that are assigned to the campaign. */
  creativeGroupIds?: Array<string>;
  /** Creative optimization configuration for the campaign. */
  creativeOptimizationConfiguration?: CreativeOptimizationConfiguration;
  /** Additional creative optimization configurations for the campaign. */
  additionalCreativeOptimizationConfigurations?: Array<CreativeOptimizationConfiguration>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#campaign". */
  kind?: string;
  /** Information about the creation of this campaign. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Information about the most recent modification of this campaign. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
  /** Dimension value for the ID of this campaign. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the advertiser ID of this campaign. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** External ID for this campaign. */
  externalId?: string;
  /** Ad blocking settings for this campaign. */
  adBlockingConfiguration?: AdBlockingConfiguration;
  /** The default landing page ID for this campaign. */
  defaultLandingPageId?: string;
  /** Measurement partner campaign link for tag wrapping. */
  measurementPartnerLink?: MeasurementPartnerCampaignLink;
  /** Optional. Whether the campaign has EU political ads. Campaign Manager 360 doesn't allow campaigns with EU political ads to serve in the EU. They can still serve in other regions. */
  euPoliticalAdsDeclaration?: "CONTAINS_EU_POLITICAL_ADS" | "DOES_NOT_CONTAIN_EU_POLITICAL_ADS" | (string & {});
}

export const Campaign: Schema.Schema<Campaign> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  advertiserGroupId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  archived: Schema.optional(Schema.Boolean),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  comment: Schema.optional(Schema.String),
  billingInvoiceCode: Schema.optional(Schema.String),
  audienceSegmentGroups: Schema.optional(Schema.Array(AudienceSegmentGroup)),
  eventTagOverrides: Schema.optional(Schema.Array(EventTagOverride)),
  clickThroughUrlSuffixProperties: Schema.optional(ClickThroughUrlSuffixProperties),
  defaultClickThroughEventTagProperties: Schema.optional(DefaultClickThroughEventTagProperties),
  creativeGroupIds: Schema.optional(Schema.Array(Schema.String)),
  creativeOptimizationConfiguration: Schema.optional(CreativeOptimizationConfiguration),
  additionalCreativeOptimizationConfigurations: Schema.optional(Schema.Array(CreativeOptimizationConfiguration)),
  kind: Schema.optional(Schema.String),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
  idDimensionValue: Schema.optional(DimensionValue),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  externalId: Schema.optional(Schema.String),
  adBlockingConfiguration: Schema.optional(AdBlockingConfiguration),
  defaultLandingPageId: Schema.optional(Schema.String),
  measurementPartnerLink: Schema.optional(MeasurementPartnerCampaignLink),
  euPoliticalAdsDeclaration: Schema.optional(Schema.String),
})).annotate({ identifier: "Campaign" }) as any as Schema.Schema<Campaign>;

export interface CampaignsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#campaignsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Campaign collection. */
  campaigns?: Array<Campaign>;
}

export const CampaignsListResponse: Schema.Schema<CampaignsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  campaigns: Schema.optional(Schema.Array(Campaign)),
})).annotate({ identifier: "CampaignsListResponse" }) as any as Schema.Schema<CampaignsListResponse>;

export interface ChangeLog {
  /** ID of this change log. */
  id?: string;
  /** ID of the object of this change log. The object could be a campaign, placement, ad, or other type. */
  objectId?: string;
  /** Transaction ID of this change log. When a single API call results in many changes, each change will have a separate ID in the change log but will share the same transactionId. */
  transactionId?: string;
  /** ID of the user who modified the object. */
  userProfileId?: string;
  /** Account ID of the modified object. */
  accountId?: string;
  /** Subaccount ID of the modified object. */
  subaccountId?: string;
  /** User profile name of the user who modified the object. */
  userProfileName?: string;
  changeTime?: string;
  /** Old value of the object field. */
  oldValue?: string;
  /** New value of the object field. */
  newValue?: string;
  /** Action which caused the change. */
  action?: string;
  /** Field name of the object which changed. */
  fieldName?: string;
  /** Object type of the change log. */
  objectType?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#changeLog". */
  kind?: string;
}

export const ChangeLog: Schema.Schema<ChangeLog> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  objectId: Schema.optional(Schema.String),
  transactionId: Schema.optional(Schema.String),
  userProfileId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  userProfileName: Schema.optional(Schema.String),
  changeTime: Schema.optional(Schema.String),
  oldValue: Schema.optional(Schema.String),
  newValue: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  fieldName: Schema.optional(Schema.String),
  objectType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ChangeLog" }) as any as Schema.Schema<ChangeLog>;

export interface ChangeLogsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#changeLogsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Change log collection. */
  changeLogs?: Array<ChangeLog>;
}

export const ChangeLogsListResponse: Schema.Schema<ChangeLogsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  changeLogs: Schema.optional(Schema.Array(ChangeLog)),
})).annotate({ identifier: "ChangeLogsListResponse" }) as any as Schema.Schema<ChangeLogsListResponse>;

export interface CitiesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#citiesListResponse". */
  kind?: string;
  /** City collection. */
  cities?: Array<City>;
}

export const CitiesListResponse: Schema.Schema<CitiesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  cities: Schema.optional(Schema.Array(City)),
})).annotate({ identifier: "CitiesListResponse" }) as any as Schema.Schema<CitiesListResponse>;

export interface ConnectionTypesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#connectionTypesListResponse". */
  kind?: string;
  /** Collection of connection types such as broadband and mobile. */
  connectionTypes?: Array<ConnectionType>;
}

export const ConnectionTypesListResponse: Schema.Schema<ConnectionTypesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  connectionTypes: Schema.optional(Schema.Array(ConnectionType)),
})).annotate({ identifier: "ConnectionTypesListResponse" }) as any as Schema.Schema<ConnectionTypesListResponse>;

export interface ContentCategory {
  /** ID of this content category. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this content category. This is a required field and must be less than 256 characters long and unique among content categories of the same account. */
  name?: string;
  /** Account ID of this content category. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#contentCategory". */
  kind?: string;
}

export const ContentCategory: Schema.Schema<ContentCategory> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ContentCategory" }) as any as Schema.Schema<ContentCategory>;

export interface ContentCategoriesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#contentCategoriesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Content category collection. */
  contentCategories?: Array<ContentCategory>;
}

export const ContentCategoriesListResponse: Schema.Schema<ContentCategoriesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  contentCategories: Schema.optional(Schema.Array(ContentCategory)),
})).annotate({ identifier: "ContentCategoriesListResponse" }) as any as Schema.Schema<ContentCategoriesListResponse>;

export interface CustomFloodlightVariable {
  /** The type of custom floodlight variable to supply a value for. These map to the "u[1-100]=" in the tags. */
  type?: "U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9" | "U10" | "U11" | "U12" | "U13" | "U14" | "U15" | "U16" | "U17" | "U18" | "U19" | "U20" | "U21" | "U22" | "U23" | "U24" | "U25" | "U26" | "U27" | "U28" | "U29" | "U30" | "U31" | "U32" | "U33" | "U34" | "U35" | "U36" | "U37" | "U38" | "U39" | "U40" | "U41" | "U42" | "U43" | "U44" | "U45" | "U46" | "U47" | "U48" | "U49" | "U50" | "U51" | "U52" | "U53" | "U54" | "U55" | "U56" | "U57" | "U58" | "U59" | "U60" | "U61" | "U62" | "U63" | "U64" | "U65" | "U66" | "U67" | "U68" | "U69" | "U70" | "U71" | "U72" | "U73" | "U74" | "U75" | "U76" | "U77" | "U78" | "U79" | "U80" | "U81" | "U82" | "U83" | "U84" | "U85" | "U86" | "U87" | "U88" | "U89" | "U90" | "U91" | "U92" | "U93" | "U94" | "U95" | "U96" | "U97" | "U98" | "U99" | "U100" | (string & {});
  /** The value of the custom floodlight variable. The length of string must not exceed 100 characters. */
  value?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#customFloodlightVariable". */
  kind?: string;
}

export const CustomFloodlightVariable: Schema.Schema<CustomFloodlightVariable> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomFloodlightVariable" }) as any as Schema.Schema<CustomFloodlightVariable>;

export interface OfflineUserAddressInfo {
  /** First name of the user, which is hashed as SHA-256 after normalized (Lowercase all characters; Remove any extra spaces before, after, and in between). */
  hashedFirstName?: string;
  /** Last name of the user, which is hashed as SHA-256 after normalized (lower case only and no punctuation). */
  hashedLastName?: string;
  /** City of the address. */
  city?: string;
  /** State code of the address. */
  state?: string;
  /** 2-letter country code in ISO-3166-1 alpha-2 of the user's address. */
  countryCode?: string;
  /** Postal code of the user's address. */
  postalCode?: string;
  /** The street address of the user hashed using SHA-256 hash function after normalization (lower case only). */
  hashedStreetAddress?: string;
}

export const OfflineUserAddressInfo: Schema.Schema<OfflineUserAddressInfo> = Schema.suspend(() => Schema.Struct({
  hashedFirstName: Schema.optional(Schema.String),
  hashedLastName: Schema.optional(Schema.String),
  city: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  hashedStreetAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "OfflineUserAddressInfo" }) as any as Schema.Schema<OfflineUserAddressInfo>;

export interface UserIdentifier {
  /** Hashed email address using SHA-256 hash function after normalization. */
  hashedEmail?: string;
  /** Hashed phone number using SHA-256 hash function after normalization (E164 standard). */
  hashedPhoneNumber?: string;
  /** Address information. */
  addressInfo?: OfflineUserAddressInfo;
}

export const UserIdentifier: Schema.Schema<UserIdentifier> = Schema.suspend(() => Schema.Struct({
  hashedEmail: Schema.optional(Schema.String),
  hashedPhoneNumber: Schema.optional(Schema.String),
  addressInfo: Schema.optional(OfflineUserAddressInfo),
})).annotate({ identifier: "UserIdentifier" }) as any as Schema.Schema<UserIdentifier>;

export interface CartDataItem {
  /** The shopping id of the item. Must be equal to the Merchant Center product identifier. This is a required field. */
  itemId?: string;
  /** Number of items sold. This is a required field. */
  quantity?: number;
  /** Unit price excluding tax, shipping, and any transaction level discounts. Interpreted in CM360 Floodlight config parent advertiser's currency code. This is a required field. */
  unitPrice?: number;
}

export const CartDataItem: Schema.Schema<CartDataItem> = Schema.suspend(() => Schema.Struct({
  itemId: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.Number),
  unitPrice: Schema.optional(Schema.Number),
})).annotate({ identifier: "CartDataItem" }) as any as Schema.Schema<CartDataItem>;

export interface CartData {
  /** The Merchant Center ID where the items are uploaded. Providing Merchant Center ID reduces ambiguity in identifying the right offer details. */
  merchantId?: string;
  /** The feed labels associated with the feed where your items are uploaded. For more information, please refer to ​​ https://support.google.com/merchants/answer/12453549. Providing the feed label reduces ambiguity in identifying the right offer details. */
  merchantFeedLabel?: string;
  /** The language associated with the feed where your items are uploaded. Use ISO 639-1 language codes. Providing the feed language reduces ambiguity in identifying the right offer details. */
  merchantFeedLanguage?: string;
  /** Data of the items purchased. */
  items?: Array<CartDataItem>;
}

export const CartData: Schema.Schema<CartData> = Schema.suspend(() => Schema.Struct({
  merchantId: Schema.optional(Schema.String),
  merchantFeedLabel: Schema.optional(Schema.String),
  merchantFeedLanguage: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(CartDataItem)),
})).annotate({ identifier: "CartData" }) as any as Schema.Schema<CartData>;

export interface Conversion {
  /** Floodlight Configuration ID of this conversion. This is a required field. */
  floodlightConfigurationId?: string;
  /** Floodlight Activity ID of this conversion. This is a required field. */
  floodlightActivityId?: string;
  /** The alphanumeric encrypted user ID. When set, encryptionInfo should also be specified. This field is mutually exclusive with encryptedUserIdCandidates[], matchId, mobileDeviceId, gclid, dclid, and impressionId. This or encryptedUserIdCandidates[] or matchId or mobileDeviceId or gclid or dclid or impressionId is a required field. */
  encryptedUserId?: string;
  /** The mobile device ID. This field is mutually exclusive with encryptedUserId, encryptedUserIdCandidates[], matchId, gclid, dclid, and impressionId. This or encryptedUserId or encryptedUserIdCandidates[] or matchId or gclid or dclid or impressionId is a required field. */
  mobileDeviceId?: string;
  /** The timestamp of conversion, in Unix epoch micros. This is a required field. */
  timestampMicros?: string;
  /** The value of the conversion. Interpreted in CM360 Floodlight config parent advertiser's currency code. This is a required field. */
  value?: number;
  /** The quantity of the conversion. This is a required field. */
  quantity?: string;
  /** The ordinal of the conversion. Use this field to control how conversions of the same user and day are de-duplicated. This is a required field. */
  ordinal?: string;
  /** Custom floodlight variables. */
  customVariables?: Array<CustomFloodlightVariable>;
  /** Whether Limit Ad Tracking is enabled. When set to true, the conversion will be used for reporting but not targeting. This will prevent remarketing. */
  limitAdTracking?: boolean;
  /** Whether this particular request may come from a user under the age of 13, under COPPA compliance. */
  childDirectedTreatment?: boolean;
  /** A list of the alphanumeric encrypted user IDs. Any user ID with exposure prior to the conversion timestamp will be used in the inserted conversion. If no such user ID is found then the conversion will be rejected with INVALID_ARGUMENT error. When set, encryptionInfo should also be specified. This field may only be used when calling batchinsert; it is not supported by batchupdate. This field is mutually exclusive with encryptedUserId, matchId, mobileDeviceId, gclid dclid, and impressionId. This or encryptedUserId or matchId or mobileDeviceId or gclid or dclid or impressionId is a required field. */
  encryptedUserIdCandidates?: Array<string>;
  /** The Google click ID. This field is mutually exclusive with encryptedUserId, encryptedUserIdCandidates[], matchId, mobileDeviceId, dclid, and impressionId. This or encryptedUserId or encryptedUserIdCandidates[] or matchId or mobileDeviceId or dclid or impressionId is a required field. */
  gclid?: string;
  /** Whether the conversion was for a non personalized ad. */
  nonPersonalizedAd?: boolean;
  /** Whether this particular request may come from a user under the age of 16 (may differ by country), under compliance with the European Union's General Data Protection Regulation (GDPR). */
  treatmentForUnderage?: boolean;
  /** The match ID field. A match ID is your own first-party identifier that has been synced with Google using the match ID feature in Floodlight. This field is mutually exclusive with encryptedUserId, encryptedUserIdCandidates[],mobileDeviceId, gclid, dclid, and impressionId. This or encryptedUserId orencryptedUserIdCandidates[] or mobileDeviceId or gclid or dclid or impressionIdis a required field. */
  matchId?: string;
  /** The display click ID. This field is mutually exclusive with encryptedUserId, encryptedUserIdCandidates[], matchId, mobileDeviceId, gclid, and impressionId. This or encryptedUserId or encryptedUserIdCandidates[] or matchId or mobileDeviceId or gclid or impressionId is a required field. */
  dclid?: string;
  /** The impression ID. This field is mutually exclusive with encryptedUserId, encryptedUserIdCandidates[], matchId, mobileDeviceId, and gclid. One of these identifiers must be set. */
  impressionId?: string;
  /** The user identifiers to enhance the conversion. The maximum number of user identifiers for each conversion is 5. */
  userIdentifiers?: Array<UserIdentifier>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversion". */
  kind?: string;
  /** This represents consent for ad user data. */
  adUserDataConsent?: "GRANTED" | "DENIED" | (string & {});
  /** The cart data associated with this conversion. */
  cartData?: CartData;
  /** Session attributes for the conversion, encoded as based64 bytes. This field may only be used when calling batchinsert; it is not supported by batchupdate. */
  sessionAttributesEncoded?: string;
}

export const Conversion: Schema.Schema<Conversion> = Schema.suspend(() => Schema.Struct({
  floodlightConfigurationId: Schema.optional(Schema.String),
  floodlightActivityId: Schema.optional(Schema.String),
  encryptedUserId: Schema.optional(Schema.String),
  mobileDeviceId: Schema.optional(Schema.String),
  timestampMicros: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
  quantity: Schema.optional(Schema.String),
  ordinal: Schema.optional(Schema.String),
  customVariables: Schema.optional(Schema.Array(CustomFloodlightVariable)),
  limitAdTracking: Schema.optional(Schema.Boolean),
  childDirectedTreatment: Schema.optional(Schema.Boolean),
  encryptedUserIdCandidates: Schema.optional(Schema.Array(Schema.String)),
  gclid: Schema.optional(Schema.String),
  nonPersonalizedAd: Schema.optional(Schema.Boolean),
  treatmentForUnderage: Schema.optional(Schema.Boolean),
  matchId: Schema.optional(Schema.String),
  dclid: Schema.optional(Schema.String),
  impressionId: Schema.optional(Schema.String),
  userIdentifiers: Schema.optional(Schema.Array(UserIdentifier)),
  kind: Schema.optional(Schema.String),
  adUserDataConsent: Schema.optional(Schema.String),
  cartData: Schema.optional(CartData),
  sessionAttributesEncoded: Schema.optional(Schema.String),
})).annotate({ identifier: "Conversion" }) as any as Schema.Schema<Conversion>;

export interface EncryptionInfo {
  /** The encryption entity type. This should match the encryption configuration for ad serving or Data Transfer. */
  encryptionEntityType?: "ENCRYPTION_ENTITY_TYPE_UNKNOWN" | "DCM_ACCOUNT" | "DCM_ADVERTISER" | "DBM_PARTNER" | "DBM_ADVERTISER" | "ADWORDS_CUSTOMER" | "DFP_NETWORK_CODE" | (string & {});
  /** The encryption entity ID. This should match the encryption configuration for ad serving or Data Transfer. */
  encryptionEntityId?: string;
  /** Describes whether the encrypted cookie was received from ad serving (the %m macro) or from Data Transfer. */
  encryptionSource?: "ENCRYPTION_SCOPE_UNKNOWN" | "AD_SERVING" | "DATA_TRANSFER" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#encryptionInfo". */
  kind?: string;
}

export const EncryptionInfo: Schema.Schema<EncryptionInfo> = Schema.suspend(() => Schema.Struct({
  encryptionEntityType: Schema.optional(Schema.String),
  encryptionEntityId: Schema.optional(Schema.String),
  encryptionSource: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionInfo" }) as any as Schema.Schema<EncryptionInfo>;

export interface ConversionsBatchInsertRequest {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversionsBatchInsertRequest". */
  kind?: string;
  /** The set of conversions to insert. */
  conversions?: Array<Conversion>;
  /** Describes how encryptedUserId or encryptedUserIdCandidates[] is encrypted. This is a required field if encryptedUserId or encryptedUserIdCandidates[] is used. */
  encryptionInfo?: EncryptionInfo;
}

export const ConversionsBatchInsertRequest: Schema.Schema<ConversionsBatchInsertRequest> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  conversions: Schema.optional(Schema.Array(Conversion)),
  encryptionInfo: Schema.optional(EncryptionInfo),
})).annotate({ identifier: "ConversionsBatchInsertRequest" }) as any as Schema.Schema<ConversionsBatchInsertRequest>;

export interface ConversionError {
  /** The error code. */
  code?: "INVALID_ARGUMENT" | "INTERNAL" | "PERMISSION_DENIED" | "NOT_FOUND" | (string & {});
  /** A description of the error. */
  message?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversionError". */
  kind?: string;
}

export const ConversionError: Schema.Schema<ConversionError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionError" }) as any as Schema.Schema<ConversionError>;

export interface ConversionStatus {
  /** The original conversion that was inserted or updated. */
  conversion?: Conversion;
  /** A list of errors related to this conversion. */
  errors?: Array<ConversionError>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversionStatus". */
  kind?: string;
}

export const ConversionStatus: Schema.Schema<ConversionStatus> = Schema.suspend(() => Schema.Struct({
  conversion: Schema.optional(Conversion),
  errors: Schema.optional(Schema.Array(ConversionError)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionStatus" }) as any as Schema.Schema<ConversionStatus>;

export interface ConversionsBatchInsertResponse {
  /** Indicates that some or all conversions failed to insert. */
  hasFailures?: boolean;
  /** The insert status of each conversion. Statuses are returned in the same order that conversions are inserted. */
  status?: Array<ConversionStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversionsBatchInsertResponse". */
  kind?: string;
}

export const ConversionsBatchInsertResponse: Schema.Schema<ConversionsBatchInsertResponse> = Schema.suspend(() => Schema.Struct({
  hasFailures: Schema.optional(Schema.Boolean),
  status: Schema.optional(Schema.Array(ConversionStatus)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionsBatchInsertResponse" }) as any as Schema.Schema<ConversionsBatchInsertResponse>;

export interface ConversionsBatchUpdateRequest {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversionsBatchUpdateRequest". */
  kind?: string;
  /** The set of conversions to update. */
  conversions?: Array<Conversion>;
  /** Describes how encryptedUserId is encrypted. This is a required field if encryptedUserId is used. */
  encryptionInfo?: EncryptionInfo;
}

export const ConversionsBatchUpdateRequest: Schema.Schema<ConversionsBatchUpdateRequest> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  conversions: Schema.optional(Schema.Array(Conversion)),
  encryptionInfo: Schema.optional(EncryptionInfo),
})).annotate({ identifier: "ConversionsBatchUpdateRequest" }) as any as Schema.Schema<ConversionsBatchUpdateRequest>;

export interface ConversionsBatchUpdateResponse {
  /** Indicates that some or all conversions failed to update. */
  hasFailures?: boolean;
  /** The update status of each conversion. Statuses are returned in the same order that conversions are updated. */
  status?: Array<ConversionStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#conversionsBatchUpdateResponse". */
  kind?: string;
}

export const ConversionsBatchUpdateResponse: Schema.Schema<ConversionsBatchUpdateResponse> = Schema.suspend(() => Schema.Struct({
  hasFailures: Schema.optional(Schema.Boolean),
  status: Schema.optional(Schema.Array(ConversionStatus)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionsBatchUpdateResponse" }) as any as Schema.Schema<ConversionsBatchUpdateResponse>;

export interface CountriesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#countriesListResponse". */
  kind?: string;
  /** Country collection. */
  countries?: Array<Country>;
}

export const CountriesListResponse: Schema.Schema<CountriesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  countries: Schema.optional(Schema.Array(Country)),
})).annotate({ identifier: "CountriesListResponse" }) as any as Schema.Schema<CountriesListResponse>;

export interface CreativeAssetId {
  /** Type of asset to upload. This is a required field. FLASH and IMAGE are no longer supported for new uploads. All image assets should use HTML_IMAGE. */
  type?: "IMAGE" | "FLASH" | "VIDEO" | "HTML" | "HTML_IMAGE" | "AUDIO" | (string & {});
  /** Name of the creative asset. This is a required field while inserting an asset. After insertion, this assetIdentifier is used to identify the uploaded asset. Characters in the name must be alphanumeric or one of the following: ".-_ ". Spaces are allowed. */
  name?: string;
}

export const CreativeAssetId: Schema.Schema<CreativeAssetId> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeAssetId" }) as any as Schema.Schema<CreativeAssetId>;

export interface CreativeClickThroughUrl {
  /** ID of the landing page for the click-through URL. */
  landingPageId?: string;
  /** Custom click-through URL. Applicable if the landingPageId field is left unset. */
  customClickThroughUrl?: string;
  /** Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field. */
  computedClickThroughUrl?: string;
}

export const CreativeClickThroughUrl: Schema.Schema<CreativeClickThroughUrl> = Schema.suspend(() => Schema.Struct({
  landingPageId: Schema.optional(Schema.String),
  customClickThroughUrl: Schema.optional(Schema.String),
  computedClickThroughUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeClickThroughUrl" }) as any as Schema.Schema<CreativeClickThroughUrl>;

export interface ClickTag {
  /** Parameter name for the specified click tag. For DISPLAY_IMAGE_GALLERY creative assets, this field must match the value of the creative asset's creativeAssetId.name field. */
  name?: string;
  /** Advertiser event name associated with the click tag. This field is used by DISPLAY_IMAGE_GALLERY and HTML5_BANNER creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  eventName?: string;
  /** Parameter value for the specified click tag. This field contains a click-through url. */
  clickThroughUrl?: CreativeClickThroughUrl;
}

export const ClickTag: Schema.Schema<ClickTag> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  eventName: Schema.optional(Schema.String),
  clickThroughUrl: Schema.optional(CreativeClickThroughUrl),
})).annotate({ identifier: "ClickTag" }) as any as Schema.Schema<ClickTag>;

export interface OffsetPosition {
  /** Offset distance from top side of an asset or a window. */
  top?: number;
  /** Offset distance from left side of an asset or a window. */
  left?: number;
}

export const OffsetPosition: Schema.Schema<OffsetPosition> = Schema.suspend(() => Schema.Struct({
  top: Schema.optional(Schema.Number),
  left: Schema.optional(Schema.Number),
})).annotate({ identifier: "OffsetPosition" }) as any as Schema.Schema<OffsetPosition>;

export interface PopupWindowProperties {
  /** Upper-left corner coordinates of the popup window. Applicable if positionType is COORDINATES. */
  offset?: OffsetPosition;
  /** Whether to display the browser scroll bar. */
  showScrollBar?: boolean;
  /** Whether to display the browser tool bar. */
  showToolBar?: boolean;
  /** Whether to display the browser menu bar. */
  showMenuBar?: boolean;
  /** Whether to display the browser address bar. */
  showAddressBar?: boolean;
  /** Whether to display the browser status bar. */
  showStatusBar?: boolean;
  /** Popup window position either centered or at specific coordinate. */
  positionType?: "CENTER" | "COORDINATES" | (string & {});
  /** Popup dimension for a creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA and all VPAID */
  dimension?: Size;
  /** Title of popup window. */
  title?: string;
}

export const PopupWindowProperties: Schema.Schema<PopupWindowProperties> = Schema.suspend(() => Schema.Struct({
  offset: Schema.optional(OffsetPosition),
  showScrollBar: Schema.optional(Schema.Boolean),
  showToolBar: Schema.optional(Schema.Boolean),
  showMenuBar: Schema.optional(Schema.Boolean),
  showAddressBar: Schema.optional(Schema.Boolean),
  showStatusBar: Schema.optional(Schema.Boolean),
  positionType: Schema.optional(Schema.String),
  dimension: Schema.optional(Size),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "PopupWindowProperties" }) as any as Schema.Schema<PopupWindowProperties>;

export interface CreativeCustomEvent {
  /** Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion. */
  artworkLabel?: string;
  /** ID of this event. This is a required field and should not be modified after insertion. */
  id?: string;
  /** Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field. */
  videoReportingId?: string;
  /** Artwork type used by the creative.This is a read-only field. */
  artworkType?: "ARTWORK_TYPE_FLASH" | "ARTWORK_TYPE_HTML5" | "ARTWORK_TYPE_MIXED" | "ARTWORK_TYPE_IMAGE" | (string & {});
  /** User-entered name for the event. */
  advertiserCustomEventName?: string;
  /** Target type used by the event. */
  targetType?: "TARGET_BLANK" | "TARGET_TOP" | "TARGET_SELF" | "TARGET_PARENT" | "TARGET_POPUP" | (string & {});
  /** Type of the event. This is a read-only field. */
  advertiserCustomEventType?: "ADVERTISER_EVENT_TIMER" | "ADVERTISER_EVENT_EXIT" | "ADVERTISER_EVENT_COUNTER" | (string & {});
  /** Properties for rich media popup windows. This field is used only for exit events. */
  popupWindowProperties?: PopupWindowProperties;
  /** Unique ID of this event used by Reporting and Data Transfer. This is a read-only field. */
  advertiserCustomEventId?: string;
  /** Exit click-through URL for the event. This field is used only for exit events. */
  exitClickThroughUrl?: CreativeClickThroughUrl;
}

export const CreativeCustomEvent: Schema.Schema<CreativeCustomEvent> = Schema.suspend(() => Schema.Struct({
  artworkLabel: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  videoReportingId: Schema.optional(Schema.String),
  artworkType: Schema.optional(Schema.String),
  advertiserCustomEventName: Schema.optional(Schema.String),
  targetType: Schema.optional(Schema.String),
  advertiserCustomEventType: Schema.optional(Schema.String),
  popupWindowProperties: Schema.optional(PopupWindowProperties),
  advertiserCustomEventId: Schema.optional(Schema.String),
  exitClickThroughUrl: Schema.optional(CreativeClickThroughUrl),
})).annotate({ identifier: "CreativeCustomEvent" }) as any as Schema.Schema<CreativeCustomEvent>;

export interface CreativeAssetMetadata {
  /** ID of the creative asset. This is a required field. */
  assetIdentifier?: CreativeAssetId;
  /** List of feature dependencies for the creative asset that are detected by Campaign Manager. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative correctly. This is a read-only, auto-generated field. */
  detectedFeatures?: Array<"CSS_FONT_FACE" | "CSS_BACKGROUND_SIZE" | "CSS_BORDER_IMAGE" | "CSS_BORDER_RADIUS" | "CSS_BOX_SHADOW" | "CSS_FLEX_BOX" | "CSS_HSLA" | "CSS_MULTIPLE_BGS" | "CSS_OPACITY" | "CSS_RGBA" | "CSS_TEXT_SHADOW" | "CSS_ANIMATIONS" | "CSS_COLUMNS" | "CSS_GENERATED_CONTENT" | "CSS_GRADIENTS" | "CSS_REFLECTIONS" | "CSS_TRANSFORMS" | "CSS_TRANSFORMS3D" | "CSS_TRANSITIONS" | "APPLICATION_CACHE" | "CANVAS" | "CANVAS_TEXT" | "DRAG_AND_DROP" | "HASH_CHANGE" | "HISTORY" | "AUDIO" | "VIDEO" | "INDEXED_DB" | "INPUT_ATTR_AUTOCOMPLETE" | "INPUT_ATTR_AUTOFOCUS" | "INPUT_ATTR_LIST" | "INPUT_ATTR_PLACEHOLDER" | "INPUT_ATTR_MAX" | "INPUT_ATTR_MIN" | "INPUT_ATTR_MULTIPLE" | "INPUT_ATTR_PATTERN" | "INPUT_ATTR_REQUIRED" | "INPUT_ATTR_STEP" | "INPUT_TYPE_SEARCH" | "INPUT_TYPE_TEL" | "INPUT_TYPE_URL" | "INPUT_TYPE_EMAIL" | "INPUT_TYPE_DATETIME" | "INPUT_TYPE_DATE" | "INPUT_TYPE_MONTH" | "INPUT_TYPE_WEEK" | "INPUT_TYPE_TIME" | "INPUT_TYPE_DATETIME_LOCAL" | "INPUT_TYPE_NUMBER" | "INPUT_TYPE_RANGE" | "INPUT_TYPE_COLOR" | "LOCAL_STORAGE" | "POST_MESSAGE" | "SESSION_STORAGE" | "WEB_SOCKETS" | "WEB_SQL_DATABASE" | "WEB_WORKERS" | "GEO_LOCATION" | "INLINE_SVG" | "SMIL" | "SVG_HREF" | "SVG_CLIP_PATHS" | "TOUCH" | "WEBGL" | "SVG_FILTERS" | "SVG_FE_IMAGE" | (string & {})>;
  /** Rules validated during code generation that generated a warning. This is a read-only, auto-generated field. Possible values are: - "ADMOB_REFERENCED" - "ASSET_FORMAT_UNSUPPORTED_DCM" - "ASSET_INVALID" - "CLICK_TAG_HARD_CODED" - "CLICK_TAG_INVALID" - "CLICK_TAG_IN_GWD" - "CLICK_TAG_MISSING" - "CLICK_TAG_MORE_THAN_ONE" - "CLICK_TAG_NON_TOP_LEVEL" - "COMPONENT_UNSUPPORTED_DCM" - "ENABLER_UNSUPPORTED_METHOD_DCM" - "EXTERNAL_FILE_REFERENCED" - "FILE_DETAIL_EMPTY" - "FILE_TYPE_INVALID" - "GWD_PROPERTIES_INVALID" - "HTML5_FEATURE_UNSUPPORTED" - "LINKED_FILE_NOT_FOUND" - "MAX_FLASH_VERSION_11" - "MRAID_REFERENCED" - "NOT_SSL_COMPLIANT" - "ORPHANED_ASSET" - "PRIMARY_HTML_MISSING" - "SVG_INVALID" - "ZIP_INVALID" */
  warnedValidationRules?: Array<"CLICK_TAG_NON_TOP_LEVEL" | "CLICK_TAG_MISSING" | "CLICK_TAG_MORE_THAN_ONE" | "CLICK_TAG_INVALID" | "ORPHANED_ASSET" | "PRIMARY_HTML_MISSING" | "EXTERNAL_FILE_REFERENCED" | "MRAID_REFERENCED" | "ADMOB_REFERENCED" | "FILE_TYPE_INVALID" | "ZIP_INVALID" | "LINKED_FILE_NOT_FOUND" | "MAX_FLASH_VERSION_11" | "NOT_SSL_COMPLIANT" | "FILE_DETAIL_EMPTY" | "ASSET_INVALID" | "GWD_PROPERTIES_INVALID" | "ENABLER_UNSUPPORTED_METHOD_DCM" | "ASSET_FORMAT_UNSUPPORTED_DCM" | "COMPONENT_UNSUPPORTED_DCM" | "HTML5_FEATURE_UNSUPPORTED" | "CLICK_TAG_IN_GWD" | "CLICK_TAG_HARD_CODED" | "SVG_INVALID" | "CLICK_TAG_IN_RICH_MEDIA" | "MISSING_ENABLER_REFERENCE" | (string & {})>;
  /** List of detected click tags for assets. This is a read-only, auto-generated field. This field is empty for a rich media asset. */
  clickTags?: Array<ClickTag>;
  /** Numeric ID of the asset. This is a read-only, auto-generated field. */
  id?: string;
  /** Dimension value for the numeric ID of the asset. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** True if the uploaded asset is a rich media asset. This is a read-only, auto-generated field. */
  richMedia?: boolean;
  /** List of counter events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
  counterCustomEvents?: Array<CreativeCustomEvent>;
  /** List of exit events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
  exitCustomEvents?: Array<CreativeCustomEvent>;
  /** List of timer events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
  timerCustomEvents?: Array<CreativeCustomEvent>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeAssetMetadata". */
  kind?: string;
}

export const CreativeAssetMetadata: Schema.Schema<CreativeAssetMetadata> = Schema.suspend(() => Schema.Struct({
  assetIdentifier: Schema.optional(CreativeAssetId),
  detectedFeatures: Schema.optional(Schema.Array(Schema.String)),
  warnedValidationRules: Schema.optional(Schema.Array(Schema.String)),
  clickTags: Schema.optional(Schema.Array(ClickTag)),
  id: Schema.optional(Schema.String),
  idDimensionValue: Schema.optional(DimensionValue),
  richMedia: Schema.optional(Schema.Boolean),
  counterCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
  exitCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
  timerCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeAssetMetadata" }) as any as Schema.Schema<CreativeAssetMetadata>;

export interface CreativeField {
  /** ID of this creative field. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this creative field. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this creative field. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of this creative field. This is a required field on insertion. */
  advertiserId?: string;
  /** Name of this creative field. This is a required field and must be less than 256 characters long and unique among creative fields of the same advertiser. */
  name?: string;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeField". */
  kind?: string;
}

export const CreativeField: Schema.Schema<CreativeField> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeField" }) as any as Schema.Schema<CreativeField>;

export interface CreativeFieldsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeFieldsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Creative field collection. */
  creativeFields?: Array<CreativeField>;
}

export const CreativeFieldsListResponse: Schema.Schema<CreativeFieldsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  creativeFields: Schema.optional(Schema.Array(CreativeField)),
})).annotate({ identifier: "CreativeFieldsListResponse" }) as any as Schema.Schema<CreativeFieldsListResponse>;

export interface CreativeFieldValue {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeFieldValue". */
  kind?: string;
  /** ID of this creative field value. This is a read-only, auto-generated field. */
  id?: string;
  /** Value of this creative field value. It needs to be less than 256 characters in length and unique per creative field. */
  value?: string;
}

export const CreativeFieldValue: Schema.Schema<CreativeFieldValue> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeFieldValue" }) as any as Schema.Schema<CreativeFieldValue>;

export interface CreativeFieldValuesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeFieldValuesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Creative field value collection. */
  creativeFieldValues?: Array<CreativeFieldValue>;
}

export const CreativeFieldValuesListResponse: Schema.Schema<CreativeFieldValuesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  creativeFieldValues: Schema.optional(Schema.Array(CreativeFieldValue)),
})).annotate({ identifier: "CreativeFieldValuesListResponse" }) as any as Schema.Schema<CreativeFieldValuesListResponse>;

export interface CreativeGroup {
  /** ID of this creative group. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this creative group. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this creative group. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of this creative group. This is a required field on insertion. */
  advertiserId?: string;
  /** Name of this creative group. This is a required field and must be less than 256 characters long and unique among creative groups of the same advertiser. */
  name?: string;
  /** Subgroup of the creative group. Assign your creative groups to a subgroup in order to filter or manage them more easily. This field is required on insertion and is read-only after insertion. Acceptable values are 1 to 2, inclusive. */
  groupNumber?: number;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeGroup". */
  kind?: string;
}

export const CreativeGroup: Schema.Schema<CreativeGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  groupNumber: Schema.optional(Schema.Number),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeGroup" }) as any as Schema.Schema<CreativeGroup>;

export interface CreativeGroupsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeGroupsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Creative group collection. */
  creativeGroups?: Array<CreativeGroup>;
}

export const CreativeGroupsListResponse: Schema.Schema<CreativeGroupsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  creativeGroups: Schema.optional(Schema.Array(CreativeGroup)),
})).annotate({ identifier: "CreativeGroupsListResponse" }) as any as Schema.Schema<CreativeGroupsListResponse>;

export interface CreativeFieldAssignment {
  /** ID of the creative field. */
  creativeFieldId?: string;
  /** ID of the creative field value. */
  creativeFieldValueId?: string;
}

export const CreativeFieldAssignment: Schema.Schema<CreativeFieldAssignment> = Schema.suspend(() => Schema.Struct({
  creativeFieldId: Schema.optional(Schema.String),
  creativeFieldValueId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeFieldAssignment" }) as any as Schema.Schema<CreativeFieldAssignment>;

export interface CreativeAsset {
  /** Numeric ID of this creative asset. This is a required field and should not be modified. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. */
  id?: string;
  /** Identifier of this asset. This is the same identifier returned during creative asset insert operation. This is a required field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. */
  assetIdentifier?: CreativeAssetId;
  /** Whether the asset is SSL-compliant. This is a read-only field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. */
  sslCompliant?: boolean;
  /** Size associated with this creative asset. This is a required field when applicable; however for IMAGE and FLASH_INPAGE, creatives if left blank, this field will be automatically set using the actual size of the associated image asset. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER, IMAGE, and all RICH_MEDIA. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  size?: Size;
  /** File size associated with this creative asset. This is a read-only field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. */
  fileSize?: string;
  /** Flash version of the asset. This is a read-only field. Applicable to the following creative types: FLASH_INPAGE, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  flashVersion?: number;
  /** Whether ActionScript3 is enabled for the flash asset. This is a read-only field. Applicable to the following creative type: FLASH_INPAGE. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  actionScript3?: boolean;
  /** File name of zip file. This is a read-only field. Applicable to the following creative types: HTML5_BANNER. */
  zipFilename?: string;
  /** Size of zip file. This is a read-only field. Applicable to the following creative types: HTML5_BANNER. */
  zipFilesize?: string;
  /** List of feature dependencies for the creative asset that are detected by Campaign Manager. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative correctly. This is a read-only, auto-generated field. Applicable to the following creative types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  detectedFeatures?: Array<"CSS_FONT_FACE" | "CSS_BACKGROUND_SIZE" | "CSS_BORDER_IMAGE" | "CSS_BORDER_RADIUS" | "CSS_BOX_SHADOW" | "CSS_FLEX_BOX" | "CSS_HSLA" | "CSS_MULTIPLE_BGS" | "CSS_OPACITY" | "CSS_RGBA" | "CSS_TEXT_SHADOW" | "CSS_ANIMATIONS" | "CSS_COLUMNS" | "CSS_GENERATED_CONTENT" | "CSS_GRADIENTS" | "CSS_REFLECTIONS" | "CSS_TRANSFORMS" | "CSS_TRANSFORMS3D" | "CSS_TRANSITIONS" | "APPLICATION_CACHE" | "CANVAS" | "CANVAS_TEXT" | "DRAG_AND_DROP" | "HASH_CHANGE" | "HISTORY" | "AUDIO" | "VIDEO" | "INDEXED_DB" | "INPUT_ATTR_AUTOCOMPLETE" | "INPUT_ATTR_AUTOFOCUS" | "INPUT_ATTR_LIST" | "INPUT_ATTR_PLACEHOLDER" | "INPUT_ATTR_MAX" | "INPUT_ATTR_MIN" | "INPUT_ATTR_MULTIPLE" | "INPUT_ATTR_PATTERN" | "INPUT_ATTR_REQUIRED" | "INPUT_ATTR_STEP" | "INPUT_TYPE_SEARCH" | "INPUT_TYPE_TEL" | "INPUT_TYPE_URL" | "INPUT_TYPE_EMAIL" | "INPUT_TYPE_DATETIME" | "INPUT_TYPE_DATE" | "INPUT_TYPE_MONTH" | "INPUT_TYPE_WEEK" | "INPUT_TYPE_TIME" | "INPUT_TYPE_DATETIME_LOCAL" | "INPUT_TYPE_NUMBER" | "INPUT_TYPE_RANGE" | "INPUT_TYPE_COLOR" | "LOCAL_STORAGE" | "POST_MESSAGE" | "SESSION_STORAGE" | "WEB_SOCKETS" | "WEB_SQL_DATABASE" | "WEB_WORKERS" | "GEO_LOCATION" | "INLINE_SVG" | "SMIL" | "SVG_HREF" | "SVG_CLIP_PATHS" | "TOUCH" | "WEBGL" | "SVG_FILTERS" | "SVG_FE_IMAGE" | (string & {})>;
  /** Type of rich media asset. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA. */
  displayType?: "ASSET_DISPLAY_TYPE_INPAGE" | "ASSET_DISPLAY_TYPE_FLOATING" | "ASSET_DISPLAY_TYPE_OVERLAY" | "ASSET_DISPLAY_TYPE_EXPANDING" | "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH" | "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH_EXPANDING" | "ASSET_DISPLAY_TYPE_PEEL_DOWN" | "ASSET_DISPLAY_TYPE_VPAID_LINEAR" | "ASSET_DISPLAY_TYPE_VPAID_NON_LINEAR" | "ASSET_DISPLAY_TYPE_BACKDROP" | (string & {});
  /** Artwork type of rich media creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA. */
  artworkType?: "ARTWORK_TYPE_FLASH" | "ARTWORK_TYPE_HTML5" | "ARTWORK_TYPE_MIXED" | "ARTWORK_TYPE_IMAGE" | (string & {});
  /** Size of an asset when collapsed. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA and all VPAID. Additionally, applicable to assets whose displayType is ASSET_DISPLAY_TYPE_EXPANDING or ASSET_DISPLAY_TYPE_PEEL_DOWN. */
  collapsedSize?: Size;
  /** Offset position for an asset in collapsed mode. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA and all VPAID. Additionally, only applicable to assets whose displayType is ASSET_DISPLAY_TYPE_EXPANDING or ASSET_DISPLAY_TYPE_PEEL_DOWN. */
  offset?: OffsetPosition;
  /** zIndex value of an asset. Applicable to the following creative types: all RICH_MEDIA.Additionally, only applicable to assets whose displayType is NOT one of the following types: ASSET_DISPLAY_TYPE_INPAGE or ASSET_DISPLAY_TYPE_OVERLAY. Acceptable values are -999999999 to 999999999, inclusive. */
  zIndex?: number;
  /** Window mode options for flash assets. Applicable to the following creative types: FLASH_INPAGE, RICH_MEDIA_DISPLAY_EXPANDING, RICH_MEDIA_IM_EXPAND, RICH_MEDIA_DISPLAY_BANNER, and RICH_MEDIA_INPAGE_FLOATING. */
  windowMode?: "OPAQUE" | "WINDOW" | "TRANSPARENT" | (string & {});
  /** Whether the asset is transparent. Applicable to the following creative types: all RICH_MEDIA. Additionally, only applicable to HTML5 assets. */
  transparency?: boolean;
  /** Whether the asset pushes down other content. Applicable to the following creative types: all RICH_MEDIA. Additionally, only applicable when the asset offsets are 0, the collapsedSize.width matches size.width, and the collapsedSize.height is less than size.height. */
  pushdown?: boolean;
  /** Pushdown duration in seconds for an asset. Applicable to the following creative types: all RICH_MEDIA.Additionally, only applicable when the asset pushdown field is true, the offsets are 0, the collapsedSize.width matches size.width, and the collapsedSize.height is less than size.height. Acceptable values are 0 to 9.99, inclusive. */
  pushdownDuration?: number;
  /** Offset position for an asset. Applicable to the following creative types: all RICH_MEDIA. */
  position?: OffsetPosition;
  /** Offset top unit for an asset. This is a read-only field if the asset displayType is ASSET_DISPLAY_TYPE_OVERLAY. Applicable to the following creative types: all RICH_MEDIA. */
  positionTopUnit?: "OFFSET_UNIT_PIXEL" | "OFFSET_UNIT_PERCENT" | "OFFSET_UNIT_PIXEL_FROM_CENTER" | (string & {});
  /** Offset left unit for an asset. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA. */
  positionLeftUnit?: "OFFSET_UNIT_PIXEL" | "OFFSET_UNIT_PERCENT" | "OFFSET_UNIT_PIXEL_FROM_CENTER" | (string & {});
  /** Whether the asset is vertically locked. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA. */
  verticallyLocked?: boolean;
  /** Whether the asset is horizontally locked. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA. */
  horizontallyLocked?: boolean;
  /** Initial wait time type before making the asset visible. Applicable to the following creative types: all RICH_MEDIA. */
  startTimeType?: "ASSET_START_TIME_TYPE_NONE" | "ASSET_START_TIME_TYPE_CUSTOM" | (string & {});
  /** Custom start time in seconds for making the asset visible. Applicable to the following creative types: all RICH_MEDIA. Value must be greater than or equal to 0. */
  customStartTimeValue?: number;
  /** Duration type for which an asset will be displayed. Applicable to the following creative types: all RICH_MEDIA. */
  durationType?: "ASSET_DURATION_TYPE_AUTO" | "ASSET_DURATION_TYPE_NONE" | "ASSET_DURATION_TYPE_CUSTOM" | (string & {});
  /** Duration in seconds for which an asset will be displayed. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and VPAID_LINEAR_VIDEO. Value must be greater than or equal to 1. */
  duration?: number;
  /** Whether to hide Flash objects flag for an asset. Applicable to the following creative types: all RICH_MEDIA. */
  hideFlashObjects?: boolean;
  /** Whether to hide selection boxes flag for an asset. Applicable to the following creative types: all RICH_MEDIA. */
  hideSelectionBoxes?: boolean;
  /** Possible alignments for an asset. This is a read-only field. Applicable to the following creative types: RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL . */
  alignment?: "ALIGNMENT_TOP" | "ALIGNMENT_RIGHT" | "ALIGNMENT_BOTTOM" | "ALIGNMENT_LEFT" | (string & {});
  /** Rich media child asset type. This is a read-only field. Applicable to the following creative types: all VPAID. */
  childAssetType?: "CHILD_ASSET_TYPE_FLASH" | "CHILD_ASSET_TYPE_VIDEO" | "CHILD_ASSET_TYPE_IMAGE" | "CHILD_ASSET_TYPE_DATA" | (string & {});
  /** Whether the backup asset is original or changed by the user in Campaign Manager. Applicable to the following creative types: all RICH_MEDIA. */
  originalBackup?: boolean;
  /** Detected bit-rate for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID. */
  bitRate?: number;
  /** Detected MIME type for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID. */
  mimeType?: string;
  /** Whether the video or audio asset is active. This is a read-only field for VPAID_NON_LINEAR_VIDEO assets. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID. */
  active?: boolean;
  /** Progressive URL for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID. */
  progressiveServingUrl?: string;
  /** Streaming URL for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID. */
  streamingServingUrl?: string;
  /** Detected duration for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID. */
  mediaDuration?: number;
  /** Detected expanded dimension for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID. */
  expandedDimension?: Size;
  /** Role of the asset in relation to creative. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. This is a required field. PRIMARY applies to DISPLAY, FLASH_INPAGE, HTML5_BANNER, IMAGE, DISPLAY_IMAGE_GALLERY, all RICH_MEDIA (which may contain multiple primary assets), and all VPAID creatives. BACKUP_IMAGE applies to FLASH_INPAGE, HTML5_BANNER, all RICH_MEDIA, and all VPAID creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. ADDITIONAL_IMAGE and ADDITIONAL_FLASH apply to FLASH_INPAGE creatives. OTHER refers to assets from sources other than Campaign Manager, such as Studio uploaded assets, applicable to all RICH_MEDIA and all VPAID creatives. PARENT_VIDEO refers to videos uploaded by the user in Campaign Manager and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO creatives. TRANSCODED_VIDEO refers to videos transcoded by Campaign Manager from PARENT_VIDEO assets and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO creatives. ALTERNATE_VIDEO refers to the Campaign Manager representation of child asset videos from Studio, and is applicable to VPAID_LINEAR_VIDEO creatives. These cannot be added or removed within Campaign Manager. For VPAID_LINEAR_VIDEO creatives, PARENT_VIDEO, TRANSCODED_VIDEO and ALTERNATE_VIDEO assets that are marked active serve as backup in case the VPAID creative cannot be served. Only PARENT_VIDEO assets can be added or removed for an INSTREAM_VIDEO or VPAID_LINEAR_VIDEO creative. PARENT_AUDIO refers to audios uploaded by the user in Campaign Manager and is applicable to INSTREAM_AUDIO creatives. TRANSCODED_AUDIO refers to audios transcoded by Campaign Manager from PARENT_AUDIO assets and is applicable to INSTREAM_AUDIO creatives. */
  role?: "PRIMARY" | "BACKUP_IMAGE" | "ADDITIONAL_IMAGE" | "ADDITIONAL_FLASH" | "PARENT_VIDEO" | "TRANSCODED_VIDEO" | "OTHER" | "ALTERNATE_VIDEO" | "PARENT_AUDIO" | "TRANSCODED_AUDIO" | (string & {});
  /** Exit event configured for the backup image. Applicable to the following creative types: all RICH_MEDIA. */
  backupImageExit?: CreativeCustomEvent;
  /** List of companion creatives assigned to an in-stream video creative asset. Acceptable values include IDs of existing flash and image creatives. Applicable to INSTREAM_VIDEO creative type with dynamicAssetSelection set to true. */
  companionCreativeIds?: Array<string>;
  /** Dimension value for the ID of the asset. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Orientation of video asset. This is a read-only, auto-generated field. */
  orientation?: "LANDSCAPE" | "PORTRAIT" | "SQUARE" | (string & {});
  /** Additional sizes associated with this creative asset. HTML5 asset generated by compatible software such as GWD will be able to support more sizes this creative asset can render. */
  additionalSizes?: Array<Size>;
  /** Audio stream bit rate in kbps. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID. */
  audioBitRate?: number;
  /** Audio sample bit rate in hertz. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID. */
  audioSampleRate?: number;
  /** Video frame rate for video asset in frames per second. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID. */
  frameRate?: number;
  /** Whether this asset is used as a polite load asset. */
  politeLoad?: boolean;
}

export const CreativeAsset: Schema.Schema<CreativeAsset> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  assetIdentifier: Schema.optional(CreativeAssetId),
  sslCompliant: Schema.optional(Schema.Boolean),
  size: Schema.optional(Size),
  fileSize: Schema.optional(Schema.String),
  flashVersion: Schema.optional(Schema.Number),
  actionScript3: Schema.optional(Schema.Boolean),
  zipFilename: Schema.optional(Schema.String),
  zipFilesize: Schema.optional(Schema.String),
  detectedFeatures: Schema.optional(Schema.Array(Schema.String)),
  displayType: Schema.optional(Schema.String),
  artworkType: Schema.optional(Schema.String),
  collapsedSize: Schema.optional(Size),
  offset: Schema.optional(OffsetPosition),
  zIndex: Schema.optional(Schema.Number),
  windowMode: Schema.optional(Schema.String),
  transparency: Schema.optional(Schema.Boolean),
  pushdown: Schema.optional(Schema.Boolean),
  pushdownDuration: Schema.optional(Schema.Number),
  position: Schema.optional(OffsetPosition),
  positionTopUnit: Schema.optional(Schema.String),
  positionLeftUnit: Schema.optional(Schema.String),
  verticallyLocked: Schema.optional(Schema.Boolean),
  horizontallyLocked: Schema.optional(Schema.Boolean),
  startTimeType: Schema.optional(Schema.String),
  customStartTimeValue: Schema.optional(Schema.Number),
  durationType: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.Number),
  hideFlashObjects: Schema.optional(Schema.Boolean),
  hideSelectionBoxes: Schema.optional(Schema.Boolean),
  alignment: Schema.optional(Schema.String),
  childAssetType: Schema.optional(Schema.String),
  originalBackup: Schema.optional(Schema.Boolean),
  bitRate: Schema.optional(Schema.Number),
  mimeType: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  progressiveServingUrl: Schema.optional(Schema.String),
  streamingServingUrl: Schema.optional(Schema.String),
  mediaDuration: Schema.optional(Schema.Number),
  expandedDimension: Schema.optional(Size),
  role: Schema.optional(Schema.String),
  backupImageExit: Schema.optional(CreativeCustomEvent),
  companionCreativeIds: Schema.optional(Schema.Array(Schema.String)),
  idDimensionValue: Schema.optional(DimensionValue),
  orientation: Schema.optional(Schema.String),
  additionalSizes: Schema.optional(Schema.Array(Size)),
  audioBitRate: Schema.optional(Schema.Number),
  audioSampleRate: Schema.optional(Schema.Number),
  frameRate: Schema.optional(Schema.Number),
  politeLoad: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CreativeAsset" }) as any as Schema.Schema<CreativeAsset>;

export interface FsCommand {
  /** Position in the browser where the window will open. */
  positionOption?: "CENTERED" | "DISTANCE_FROM_TOP_LEFT_CORNER" | (string & {});
  /** Distance from the top of the browser. Applicable when positionOption is DISTANCE_FROM_TOP_LEFT_CORNER. */
  top?: number;
  /** Distance from the left of the browser.Applicable when positionOption is DISTANCE_FROM_TOP_LEFT_CORNER. */
  left?: number;
  /** Width of the window. */
  windowWidth?: number;
  /** Height of the window. */
  windowHeight?: number;
}

export const FsCommand: Schema.Schema<FsCommand> = Schema.suspend(() => Schema.Struct({
  positionOption: Schema.optional(Schema.String),
  top: Schema.optional(Schema.Number),
  left: Schema.optional(Schema.Number),
  windowWidth: Schema.optional(Schema.Number),
  windowHeight: Schema.optional(Schema.Number),
})).annotate({ identifier: "FsCommand" }) as any as Schema.Schema<FsCommand>;

export interface TargetWindow {
  /** Type of browser window for which the backup image of the flash creative can be displayed. */
  targetWindowOption?: "NEW_WINDOW" | "CURRENT_WINDOW" | "CUSTOM" | (string & {});
  /** User-entered value. */
  customHtml?: string;
}

export const TargetWindow: Schema.Schema<TargetWindow> = Schema.suspend(() => Schema.Struct({
  targetWindowOption: Schema.optional(Schema.String),
  customHtml: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetWindow" }) as any as Schema.Schema<TargetWindow>;

export interface ThirdPartyTrackingUrl {
  /** Third-party URL type for in-stream video and in-stream audio creatives. */
  thirdPartyUrlType?: "IMPRESSION" | "CLICK_TRACKING" | "VIDEO_START" | "VIDEO_FIRST_QUARTILE" | "VIDEO_MIDPOINT" | "VIDEO_THIRD_QUARTILE" | "VIDEO_COMPLETE" | "VIDEO_MUTE" | "VIDEO_PAUSE" | "VIDEO_REWIND" | "VIDEO_FULLSCREEN" | "VIDEO_STOP" | "VIDEO_CUSTOM" | "SURVEY" | "RICH_MEDIA_IMPRESSION" | "RICH_MEDIA_RM_IMPRESSION" | "RICH_MEDIA_BACKUP_IMPRESSION" | "VIDEO_SKIP" | "VIDEO_PROGRESS" | (string & {});
  /** URL for the specified third-party URL type. */
  url?: string;
}

export const ThirdPartyTrackingUrl: Schema.Schema<ThirdPartyTrackingUrl> = Schema.suspend(() => Schema.Struct({
  thirdPartyUrlType: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "ThirdPartyTrackingUrl" }) as any as Schema.Schema<ThirdPartyTrackingUrl>;

export interface VideoOffset {
  /** Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive. */
  offsetSeconds?: number;
  /** Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive. */
  offsetPercentage?: number;
}

export const VideoOffset: Schema.Schema<VideoOffset> = Schema.suspend(() => Schema.Struct({
  offsetSeconds: Schema.optional(Schema.Number),
  offsetPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "VideoOffset" }) as any as Schema.Schema<VideoOffset>;

export interface ObaIcon {
  /** OBA icon resource URL. Campaign Manager only supports image and JavaScript icons. Learn more */
  resourceUrl?: string;
  /** OBA icon x coordinate position. Accepted values are left or right. */
  xPosition?: string;
  /** OBA icon y coordinate position. Accepted values are top or bottom. */
  yPosition?: string;
  /** OBA icon size. */
  size?: Size;
  /** Identifies the industry initiative that the icon supports. For example, AdChoices. */
  program?: string;
  /** URL to redirect to when an OBA icon is clicked. */
  iconClickThroughUrl?: string;
  /** URL to track click when an OBA icon is clicked. */
  iconClickTrackingUrl?: string;
  /** URL to track view when an OBA icon is clicked. */
  iconViewTrackingUrl?: string;
}

export const ObaIcon: Schema.Schema<ObaIcon> = Schema.suspend(() => Schema.Struct({
  resourceUrl: Schema.optional(Schema.String),
  xPosition: Schema.optional(Schema.String),
  yPosition: Schema.optional(Schema.String),
  size: Schema.optional(Size),
  program: Schema.optional(Schema.String),
  iconClickThroughUrl: Schema.optional(Schema.String),
  iconClickTrackingUrl: Schema.optional(Schema.String),
  iconViewTrackingUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ObaIcon" }) as any as Schema.Schema<ObaIcon>;

export interface UniversalAdId {
  /** Registry used for the Ad ID value. */
  registry?: "OTHER" | "AD_ID_OFFICIAL" | "CLEARCAST" | "DCM" | "ARPP" | "CUSV" | (string & {});
  /** ID value for this creative. Only alphanumeric characters and the following symbols are valid: "_/\-". Maximum length is 64 characters. Read only when registry is DCM. */
  value?: string;
}

export const UniversalAdId: Schema.Schema<UniversalAdId> = Schema.suspend(() => Schema.Struct({
  registry: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UniversalAdId" }) as any as Schema.Schema<UniversalAdId>;

export interface Creative {
  /** ID of this creative. This is a read-only, auto-generated field. Applicable to all creative types. */
  id?: string;
  /** Required. Name of the creative. This must be less than 256 characters long. Applicable to all creative types. */
  name?: string;
  /** ID of current rendering version. This is a read-only field. Applicable to all creative types. */
  renderingId?: string;
  /** Required. Advertiser ID of this creative. This is a required field. Applicable to all creative types. */
  advertiserId?: string;
  /** Account ID of this creative. This field, if left unset, will be auto-generated for both insert and update operations. Applicable to all creative types. */
  accountId?: string;
  /** Subaccount ID of this creative. This field, if left unset, will be auto-generated for both insert and update operations. Applicable to all creative types. */
  subaccountId?: string;
  /** Whether the creative is active. Applicable to all creative types. */
  active?: boolean;
  /** Whether the creative is archived. Applicable to all creative types. */
  archived?: boolean;
  /** The version number helps you keep track of multiple versions of your creative in your reports. The version number will always be auto-generated during insert operations to start at 1. For tracking creatives the version cannot be incremented and will always remain at 1. For all other creative types the version can be incremented only by 1 during update operations. In addition, the version will be automatically incremented by 1 when undergoing Rich Media creative merging. Applicable to all creative types. */
  version?: number;
  /** Size associated with this creative. When inserting or updating a creative either the size ID field or size width and height fields can be used. This is a required field when applicable; however for IMAGE, FLASH_INPAGE creatives, and for DISPLAY creatives with a primary asset of type HTML_IMAGE, if left blank, this field will be automatically set using the actual size of the associated image assets. Applicable to the following creative types: DISPLAY, DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER, IMAGE, and all RICH_MEDIA. */
  size?: Size;
  /** Creative field assignments for this creative. Applicable to all creative types. */
  creativeFieldAssignments?: Array<CreativeFieldAssignment>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creative". */
  kind?: string;
  /** Creative last modification information. This is a read-only field. Applicable to all creative types. */
  lastModifiedInfo?: LastModifiedInfo;
  /** Whether the creative is SSL-compliant. This is a read-only field. Applicable to all creative types. */
  sslCompliant?: boolean;
  /** Compatibilities associated with this creative. This is a read-only field. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on mobile devices or in mobile apps for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are for rendering in mobile apps. Only pre-existing creatives may have these compatibilities since new creatives will either be assigned DISPLAY or DISPLAY_INTERSTITIAL instead. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. IN_STREAM_AUDIO refers to rendering in in-stream audio ads developed with the VAST standard. Applicable to all creative types. Acceptable values are: - "APP" - "APP_INTERSTITIAL" - "IN_STREAM_VIDEO" - "IN_STREAM_AUDIO" - "DISPLAY" - "DISPLAY_INTERSTITIAL" */
  compatibility?: Array<"DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO" | (string & {})>;
  /** Required. Type of this creative. Applicable to all creative types. *Note:* FLASH_INPAGE, HTML5_BANNER, and IMAGE are only used for existing creatives. New creatives should use DISPLAY as a replacement for these types. */
  type?: "IMAGE" | "DISPLAY_REDIRECT" | "CUSTOM_DISPLAY" | "INTERNAL_REDIRECT" | "CUSTOM_DISPLAY_INTERSTITIAL" | "INTERSTITIAL_INTERNAL_REDIRECT" | "TRACKING_TEXT" | "RICH_MEDIA_DISPLAY_BANNER" | "RICH_MEDIA_INPAGE_FLOATING" | "RICH_MEDIA_IM_EXPAND" | "RICH_MEDIA_DISPLAY_EXPANDING" | "RICH_MEDIA_DISPLAY_INTERSTITIAL" | "RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL" | "RICH_MEDIA_MOBILE_IN_APP" | "FLASH_INPAGE" | "INSTREAM_VIDEO" | "VPAID_LINEAR_VIDEO" | "VPAID_NON_LINEAR_VIDEO" | "INSTREAM_VIDEO_REDIRECT" | "RICH_MEDIA_PEEL_DOWN" | "HTML5_BANNER" | "DISPLAY" | "DISPLAY_IMAGE_GALLERY" | "BRAND_SAFE_DEFAULT_INSTREAM_VIDEO" | "INSTREAM_AUDIO" | (string & {});
  /** Assets associated with a creative. Applicable to all but the following creative types: INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and REDIRECT */
  creativeAssets?: Array<CreativeAsset>;
  /** URL of hosted image or hosted video or another ad tag. For INSTREAM_VIDEO_REDIRECT creatives this is the in-stream video redirect URL. The standard for a VAST (Video Ad Serving Template) ad response allows for a redirect link to another VAST 2.0 or 3.0 call. This is a required field when applicable. Applicable to the following creative types: DISPLAY_REDIRECT, INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO_REDIRECT */
  redirectUrl?: string;
  /** HTML code for the creative. This is a required field when applicable. This field is ignored if htmlCodeLocked is true. Applicable to the following creative types: all CUSTOM, FLASH_INPAGE, and HTML5_BANNER, and all RICH_MEDIA. */
  htmlCode?: string;
  /** Whether HTML code is generated by Campaign Manager or manually entered. Set to true to ignore changes to htmlCode. Applicable to the following creative types: FLASH_INPAGE and HTML5_BANNER. */
  htmlCodeLocked?: boolean;
  /** The 6-character HTML color code, beginning with #, for the background of the window area where the Flash file is displayed. Default is white. Applicable to the following creative types: FLASH_INPAGE. */
  backgroundColor?: string;
  /** Whether script access is allowed for this creative. This is a read-only and deprecated field which will automatically be set to true on update. Applicable to the following creative types: FLASH_INPAGE. */
  allowScriptAccess?: boolean;
  /** OpenWindow FSCommand of this creative. This lets the SWF file communicate with either Flash Player or the program hosting Flash Player, such as a web browser. This is only triggered if allowScriptAccess field is true. Applicable to the following creative types: FLASH_INPAGE. */
  fsCommand?: FsCommand;
  /** Target window for backup image. Applicable to the following creative types: FLASH_INPAGE and HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  backupImageTargetWindow?: TargetWindow;
  /** Click tags of the creative. For DISPLAY, FLASH_INPAGE, and HTML5_BANNER creatives, this is a subset of detected click tags for the assets associated with this creative. After creating a flash asset, detected click tags will be returned in the creativeAssetMetadata. When inserting the creative, populate the creative clickTags field using the creativeAssetMetadata.clickTags field. For DISPLAY_IMAGE_GALLERY creatives, there should be exactly one entry in this list for each image creative asset. A click tag is matched with a corresponding creative asset by matching the clickTag.name field with the creativeAsset.assetIdentifier.name field. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  clickTags?: Array<ClickTag>;
  /** List of feature dependencies that will cause a backup image to be served if the browser that serves the ad does not support them. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative asset correctly. This field is initially auto-generated to contain all features detected by Campaign Manager for all the assets of this creative and can then be modified by the client. To reset this field, copy over all the creativeAssets' detected features. Applicable to the following creative types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  backupImageFeatures?: Array<"CSS_FONT_FACE" | "CSS_BACKGROUND_SIZE" | "CSS_BORDER_IMAGE" | "CSS_BORDER_RADIUS" | "CSS_BOX_SHADOW" | "CSS_FLEX_BOX" | "CSS_HSLA" | "CSS_MULTIPLE_BGS" | "CSS_OPACITY" | "CSS_RGBA" | "CSS_TEXT_SHADOW" | "CSS_ANIMATIONS" | "CSS_COLUMNS" | "CSS_GENERATED_CONTENT" | "CSS_GRADIENTS" | "CSS_REFLECTIONS" | "CSS_TRANSFORMS" | "CSS_TRANSFORMS3D" | "CSS_TRANSITIONS" | "APPLICATION_CACHE" | "CANVAS" | "CANVAS_TEXT" | "DRAG_AND_DROP" | "HASH_CHANGE" | "HISTORY" | "AUDIO" | "VIDEO" | "INDEXED_DB" | "INPUT_ATTR_AUTOCOMPLETE" | "INPUT_ATTR_AUTOFOCUS" | "INPUT_ATTR_LIST" | "INPUT_ATTR_PLACEHOLDER" | "INPUT_ATTR_MAX" | "INPUT_ATTR_MIN" | "INPUT_ATTR_MULTIPLE" | "INPUT_ATTR_PATTERN" | "INPUT_ATTR_REQUIRED" | "INPUT_ATTR_STEP" | "INPUT_TYPE_SEARCH" | "INPUT_TYPE_TEL" | "INPUT_TYPE_URL" | "INPUT_TYPE_EMAIL" | "INPUT_TYPE_DATETIME" | "INPUT_TYPE_DATE" | "INPUT_TYPE_MONTH" | "INPUT_TYPE_WEEK" | "INPUT_TYPE_TIME" | "INPUT_TYPE_DATETIME_LOCAL" | "INPUT_TYPE_NUMBER" | "INPUT_TYPE_RANGE" | "INPUT_TYPE_COLOR" | "LOCAL_STORAGE" | "POST_MESSAGE" | "SESSION_STORAGE" | "WEB_SOCKETS" | "WEB_SQL_DATABASE" | "WEB_WORKERS" | "GEO_LOCATION" | "INLINE_SVG" | "SMIL" | "SVG_HREF" | "SVG_CLIP_PATHS" | "TOUCH" | "WEBGL" | "SVG_FILTERS" | "SVG_FE_IMAGE" | (string & {})>;
  /** Authoring tool for HTML5 banner creatives. This is a read-only field. Applicable to the following creative types: HTML5_BANNER. */
  authoringTool?: "NINJA" | "SWIFFY" | (string & {});
  /** The minimum required Flash plugin version for this creative. For example, 11.2.202.235. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  requiredFlashPluginVersion?: string;
  /** Keywords for a Rich Media creative. Keywords let you customize the creative settings of a Rich Media ad running on your site without having to contact the advertiser. You can use keywords to dynamically change the look or functionality of a creative. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  adTagKeys?: Array<string>;
  /** Custom key-values for a Rich Media creative. Key-values let you customize the creative settings of a Rich Media ad running on your site without having to contact the advertiser. You can use key-values to dynamically change the look or functionality of a creative. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  customKeyValues?: Array<string>;
  /** List of counter events configured for the creative. For DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. */
  counterCustomEvents?: Array<CreativeCustomEvent>;
  /** List of exit events configured for the creative. For DISPLAY and DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags, For DISPLAY, an event is also created from the backupImageReportingLabel. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  exitCustomEvents?: Array<CreativeCustomEvent>;
  /** List of timer events configured for the creative. For DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset is not HTML_IMAGE. */
  timerCustomEvents?: Array<CreativeCustomEvent>;
  /** Type of artwork used for the creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  artworkType?: "ARTWORK_TYPE_FLASH" | "ARTWORK_TYPE_HTML5" | "ARTWORK_TYPE_MIXED" | "ARTWORK_TYPE_IMAGE" | (string & {});
  /** The internal Flash version for this creative as calculated by Studio. This is a read-only field. Applicable to the following creative types: FLASH_INPAGE all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  requiredFlashVersion?: number;
  /** Third-party URL used to record backup image impressions. Applicable to the following creative types: all RICH_MEDIA. */
  thirdPartyBackupImageImpressionsUrl?: string;
  /** Third-party URL used to record rich media impressions. Applicable to the following creative types: all RICH_MEDIA. */
  thirdPartyRichMediaImpressionsUrl?: string;
  /** Combined size of all creative assets. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  totalFileSize?: string;
  /** Creative audio or video duration in seconds. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO, INSTREAM_AUDIO, all RICH_MEDIA, and all VPAID. */
  mediaDuration?: number;
  /** Industry standard ID assigned to creative for reach and frequency. Applicable to INSTREAM_VIDEO_REDIRECT creatives. */
  commercialId?: string;
  /** List of companion creatives assigned to an in-Stream video creative. Acceptable values include IDs of existing flash and image creatives. Applicable to the following creative types: all VPAID, all INSTREAM_AUDIO and all INSTREAM_VIDEO with dynamicAssetSelection set to false. */
  companionCreatives?: Array<string>;
  /** Description of the audio or video ad. Applicable to the following creative types: all INSTREAM_VIDEO, INSTREAM_AUDIO, and all VPAID. */
  mediaDescription?: string;
  /** Whether the user can choose to skip the creative. Applicable to the following creative types: all INSTREAM_VIDEO and all VPAID. */
  skippable?: boolean;
  /** Third-party URLs for tracking in-stream creative events. Applicable to the following creative types: all INSTREAM_VIDEO, all INSTREAM_AUDIO, and all VPAID. */
  thirdPartyUrls?: Array<ThirdPartyTrackingUrl>;
  /** Ad parameters user for VPAID creative. This is a read-only field. Applicable to the following creative types: all VPAID. */
  adParameters?: string;
  /** Override CSS value for rich media creatives. Applicable to the following creative types: all RICH_MEDIA. */
  overrideCss?: string;
  /** Studio creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  studioCreativeId?: string;
  /** Studio trafficked creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  studioTraffickedCreativeId?: string;
  /** Latest Studio trafficked creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  latestTraffickedCreativeId?: string;
  /** Studio advertiser ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID. */
  studioAdvertiserId?: string;
  /** Whether images are automatically advanced for image gallery creatives. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY. */
  autoAdvanceImages?: boolean;
  /** Reporting label used for HTML5 banner backup image. Applicable to the following creative types: DISPLAY when the primary asset type is not HTML_IMAGE. */
  backupImageReportingLabel?: string;
  /** Whether Flash assets associated with the creative need to be automatically converted to HTML5. This flag is enabled by default and users can choose to disable it if they don't want the system to generate and use HTML5 asset for this creative. Applicable to the following creative type: FLASH_INPAGE. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  convertFlashToHtml5?: boolean;
  /** Dimension value for the ID of this creative. This is a read-only field. Applicable to all creative types. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the rendering ID of this creative. This is a read-only field. Applicable to all creative types. */
  renderingIdDimensionValue?: DimensionValue;
  /** Whether creative should be treated as SSL compliant even if the system scan shows it's not. Applicable to all creative types. */
  sslOverride?: boolean;
  /** Amount of time to play the video before the skip button appears. Applicable to the following creative types: all INSTREAM_VIDEO. */
  skipOffset?: VideoOffset;
  /** Amount of time to play the video before counting a view. Applicable to the following creative types: all INSTREAM_VIDEO. */
  progressOffset?: VideoOffset;
  /** Online behavioral advertising icon to be added to the creative. Applicable to the following creative types: all INSTREAM_VIDEO. */
  obaIcon?: ObaIcon;
  /** Source application where creative was authored. Presently, only DBM authored creatives will have this field set. Applicable to all creative types. */
  authoringSource?: "CREATIVE_AUTHORING_SOURCE_DCM" | "CREATIVE_AUTHORING_SOURCE_DBM" | "CREATIVE_AUTHORING_SOURCE_STUDIO" | "CREATIVE_AUTHORING_SOURCE_GWD" | "CREATIVE_AUTHORING_SOURCE_ACS" | "CREATIVE_AUTHORING_SOURCE_ADOBE" | "CREATIVE_AUTHORING_SOURCE_TYPEFACE_AI" | "CREATIVE_AUTHORING_SOURCE_REMBRAND" | "CREATIVE_AUTHORING_SOURCE_TRACKTO_STUDIO" | "CREATIVE_AUTHORING_SOURCE_BORNLOGIC" | (string & {});
  /** A Universal Ad ID as per the VAST 4.0 spec. Applicable to the following creative types: INSTREAM_AUDIO and INSTREAM_VIDEO and VPAID. */
  universalAdId?: UniversalAdId;
  /** Click-through URL for backup image. Applicable to ENHANCED_BANNER when the primary asset type is not HTML_IMAGE. */
  backupImageClickThroughUrl?: CreativeClickThroughUrl;
  /** Additional sizes associated with a responsive creative. When inserting or updating a creative either the size ID field or size width and height fields can be used. Applicable to DISPLAY creatives when the primary asset type is HTML_IMAGE. */
  additionalSizes?: Array<Size>;
}

export const Creative: Schema.Schema<Creative> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  renderingId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  archived: Schema.optional(Schema.Boolean),
  version: Schema.optional(Schema.Number),
  size: Schema.optional(Size),
  creativeFieldAssignments: Schema.optional(Schema.Array(CreativeFieldAssignment)),
  kind: Schema.optional(Schema.String),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
  sslCompliant: Schema.optional(Schema.Boolean),
  compatibility: Schema.optional(Schema.Array(Schema.String)),
  type: Schema.optional(Schema.String),
  creativeAssets: Schema.optional(Schema.Array(CreativeAsset)),
  redirectUrl: Schema.optional(Schema.String),
  htmlCode: Schema.optional(Schema.String),
  htmlCodeLocked: Schema.optional(Schema.Boolean),
  backgroundColor: Schema.optional(Schema.String),
  allowScriptAccess: Schema.optional(Schema.Boolean),
  fsCommand: Schema.optional(FsCommand),
  backupImageTargetWindow: Schema.optional(TargetWindow),
  clickTags: Schema.optional(Schema.Array(ClickTag)),
  backupImageFeatures: Schema.optional(Schema.Array(Schema.String)),
  authoringTool: Schema.optional(Schema.String),
  requiredFlashPluginVersion: Schema.optional(Schema.String),
  adTagKeys: Schema.optional(Schema.Array(Schema.String)),
  customKeyValues: Schema.optional(Schema.Array(Schema.String)),
  counterCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
  exitCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
  timerCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
  artworkType: Schema.optional(Schema.String),
  requiredFlashVersion: Schema.optional(Schema.Number),
  thirdPartyBackupImageImpressionsUrl: Schema.optional(Schema.String),
  thirdPartyRichMediaImpressionsUrl: Schema.optional(Schema.String),
  totalFileSize: Schema.optional(Schema.String),
  mediaDuration: Schema.optional(Schema.Number),
  commercialId: Schema.optional(Schema.String),
  companionCreatives: Schema.optional(Schema.Array(Schema.String)),
  mediaDescription: Schema.optional(Schema.String),
  skippable: Schema.optional(Schema.Boolean),
  thirdPartyUrls: Schema.optional(Schema.Array(ThirdPartyTrackingUrl)),
  adParameters: Schema.optional(Schema.String),
  overrideCss: Schema.optional(Schema.String),
  studioCreativeId: Schema.optional(Schema.String),
  studioTraffickedCreativeId: Schema.optional(Schema.String),
  latestTraffickedCreativeId: Schema.optional(Schema.String),
  studioAdvertiserId: Schema.optional(Schema.String),
  autoAdvanceImages: Schema.optional(Schema.Boolean),
  backupImageReportingLabel: Schema.optional(Schema.String),
  convertFlashToHtml5: Schema.optional(Schema.Boolean),
  idDimensionValue: Schema.optional(DimensionValue),
  renderingIdDimensionValue: Schema.optional(DimensionValue),
  sslOverride: Schema.optional(Schema.Boolean),
  skipOffset: Schema.optional(VideoOffset),
  progressOffset: Schema.optional(VideoOffset),
  obaIcon: Schema.optional(ObaIcon),
  authoringSource: Schema.optional(Schema.String),
  universalAdId: Schema.optional(UniversalAdId),
  backupImageClickThroughUrl: Schema.optional(CreativeClickThroughUrl),
  additionalSizes: Schema.optional(Schema.Array(Size)),
})).annotate({ identifier: "Creative" }) as any as Schema.Schema<Creative>;

export interface CreativesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Creative collection. */
  creatives?: Array<Creative>;
}

export const CreativesListResponse: Schema.Schema<CreativesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  creatives: Schema.optional(Schema.Array(Creative)),
})).annotate({ identifier: "CreativesListResponse" }) as any as Schema.Schema<CreativesListResponse>;

export interface DimensionFilter {
  /** The name of the dimension to filter. */
  dimensionName?: string;
  /** The value of the dimension to filter. */
  value?: string;
  /** The kind of resource this is, in this case dfareporting#dimensionFilter. */
  kind?: string;
}

export const DimensionFilter: Schema.Schema<DimensionFilter> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionFilter" }) as any as Schema.Schema<DimensionFilter>;

export interface DimensionValueRequest {
  /** The name of the dimension for which values should be requested. */
  dimensionName?: string;
  /** The list of filters by which to filter values. The filters are ANDed. */
  filters?: Array<DimensionFilter>;
  startDate?: string;
  endDate?: string;
  /** The kind of request this is, in this case dfareporting#dimensionValueRequest . */
  kind?: string;
}

export const DimensionValueRequest: Schema.Schema<DimensionValueRequest> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
  filters: Schema.optional(Schema.Array(DimensionFilter)),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionValueRequest" }) as any as Schema.Schema<DimensionValueRequest>;

export interface DimensionValueList {
  /** The dimension values returned in this response. */
  items?: Array<DimensionValue>;
  /** The kind of list this is, in this case dfareporting#dimensionValueList. */
  kind?: string;
  /** The eTag of this response for caching purposes. */
  etag?: string;
  /** Continuation token used to page through dimension values. To retrieve the next page of results, set the next request's "pageToken" to the value of this field. The page token is only valid for a limited amount of time and should not be persisted. */
  nextPageToken?: string;
}

export const DimensionValueList: Schema.Schema<DimensionValueList> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(DimensionValue)),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "DimensionValueList" }) as any as Schema.Schema<DimensionValueList>;

export interface DfpSettings {
  /** Ad Manager network code for this directory site. */
  dfpNetworkCode?: string;
  /** Ad Manager network name for this directory site. */
  dfpNetworkName?: string;
  /** Whether this directory site accepts publisher-paid tags. */
  pubPaidPlacementAccepted?: boolean;
  /** Whether this directory site is available only via Publisher Portal. */
  publisherPortalOnly?: boolean;
  /** Whether this directory site accepts programmatic placements. */
  programmaticPlacementAccepted?: boolean;
}

export const DfpSettings: Schema.Schema<DfpSettings> = Schema.suspend(() => Schema.Struct({
  dfpNetworkCode: Schema.optional(Schema.String),
  dfpNetworkName: Schema.optional(Schema.String),
  pubPaidPlacementAccepted: Schema.optional(Schema.Boolean),
  publisherPortalOnly: Schema.optional(Schema.Boolean),
  programmaticPlacementAccepted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DfpSettings" }) as any as Schema.Schema<DfpSettings>;

export interface DirectorySiteSettings {
  /** Whether this site accepts interstitial ads. */
  interstitialPlacementAccepted?: boolean;
  /** Whether this site accepts in-stream video ads. */
  instreamVideoPlacementAccepted?: boolean;
  /** Directory site Ad Manager settings. */
  dfpSettings?: DfpSettings;
  /** Whether this directory site has disabled active view creatives. */
  activeViewOptOut?: boolean;
}

export const DirectorySiteSettings: Schema.Schema<DirectorySiteSettings> = Schema.suspend(() => Schema.Struct({
  interstitialPlacementAccepted: Schema.optional(Schema.Boolean),
  instreamVideoPlacementAccepted: Schema.optional(Schema.Boolean),
  dfpSettings: Schema.optional(DfpSettings),
  activeViewOptOut: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DirectorySiteSettings" }) as any as Schema.Schema<DirectorySiteSettings>;

export interface DirectorySite {
  /** ID of this directory site. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this directory site. */
  name?: string;
  /** URL of this directory site. */
  url?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#directorySite". */
  kind?: string;
  /** Directory site settings. */
  settings?: DirectorySiteSettings;
  /** Tag types for regular placements. Acceptable values are: - "STANDARD" - "IFRAME_JAVASCRIPT_INPAGE" - "INTERNAL_REDIRECT_INPAGE" - "JAVASCRIPT_INPAGE" */
  inpageTagFormats?: Array<"STANDARD" | "IFRAME_JAVASCRIPT_INPAGE" | "INTERNAL_REDIRECT_INPAGE" | "JAVASCRIPT_INPAGE" | (string & {})>;
  /** Tag types for interstitial placements. Acceptable values are: - "IFRAME_JAVASCRIPT_INTERSTITIAL" - "INTERNAL_REDIRECT_INTERSTITIAL" - "JAVASCRIPT_INTERSTITIAL" */
  interstitialTagFormats?: Array<"IFRAME_JAVASCRIPT_INTERSTITIAL" | "INTERNAL_REDIRECT_INTERSTITIAL" | "JAVASCRIPT_INTERSTITIAL" | (string & {})>;
  /** Dimension value for the ID of this directory site. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Output only. Default publisher specification ID of video placements under this directory site. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max */
  publisherSpecificationId?: string;
}

export const DirectorySite: Schema.Schema<DirectorySite> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  settings: Schema.optional(DirectorySiteSettings),
  inpageTagFormats: Schema.optional(Schema.Array(Schema.String)),
  interstitialTagFormats: Schema.optional(Schema.Array(Schema.String)),
  idDimensionValue: Schema.optional(DimensionValue),
  publisherSpecificationId: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectorySite" }) as any as Schema.Schema<DirectorySite>;

export interface DirectorySitesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#directorySitesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Directory site collection. */
  directorySites?: Array<DirectorySite>;
}

export const DirectorySitesListResponse: Schema.Schema<DirectorySitesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  directorySites: Schema.optional(Schema.Array(DirectorySite)),
})).annotate({ identifier: "DirectorySitesListResponse" }) as any as Schema.Schema<DirectorySitesListResponse>;

export interface ContentSourceMetaData {
  /** Output only. The charset of the content source. */
  charset?: string;
  /** Output only. The separator of the content source. */
  separator?: string;
  /** Output only. The list of column names in the content source. */
  fieldNames?: Array<string>;
  /** Output only. The number of rows in the content source. */
  rowNumber?: number;
}

export const ContentSourceMetaData: Schema.Schema<ContentSourceMetaData> = Schema.suspend(() => Schema.Struct({
  charset: Schema.optional(Schema.String),
  separator: Schema.optional(Schema.String),
  fieldNames: Schema.optional(Schema.Array(Schema.String)),
  rowNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "ContentSourceMetaData" }) as any as Schema.Schema<ContentSourceMetaData>;

export interface ContentSource {
  /** Optional. The name of the content source. It is defaulted to content source file name if not provided. */
  contentSourceName?: string;
  /** Required. The link to the file of the content source. */
  resourceLink?: string;
  /** Required. The resource type of the content source. */
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "RESOURCE_TYPE_GOOGLE_SPREADSHEET" | "RESOURCE_TYPE_REMOTE_FILE" | (string & {});
  /** Output only. Metadata of the content source. It contains the number of rows and the column names from resource link. This is a read-only field. */
  metaData?: ContentSourceMetaData;
  /** Output only. The creation timestamp of the content source. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Output only. The last modified timestamp of the content source. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
}

export const ContentSource: Schema.Schema<ContentSource> = Schema.suspend(() => Schema.Struct({
  contentSourceName: Schema.optional(Schema.String),
  resourceLink: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  metaData: Schema.optional(ContentSourceMetaData),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
})).annotate({ identifier: "ContentSource" }) as any as Schema.Schema<ContentSource>;

export interface FeedField {
  /** Required. The ID of the field. The ID is based on the column index starting from 0, and it should match the column index in the resource link. */
  id?: number;
  /** Required. The name of the field. */
  name?: string;
  /** Required. The type of the field. */
  type?: "TYPE_UNKNOWN" | "STRING" | "LONG" | "GPA_SERVED_IMAGE_URL" | "GPA_SERVED_ASSET_URL" | "COUNTRY_CODE_ISO" | "FLOAT" | "CM360_KEYWORD" | "CM360_SITE_ID" | "BOOL" | "EXIT_URL" | "DATETIME" | "CM360_CREATIVE_ID" | "CM360_PLACEMENT_ID" | "CM360_AD_ID" | "CM360_ADVERTISER_ID" | "CM360_CAMPAIGN_ID" | "CITY" | "REGION" | "POSTAL_CODE" | "METRO" | "CUSTOM_VALUE" | "REMARKETING_VALUE" | "GEO_CANONICAL" | "WEIGHT" | "STRING_LIST" | "CREATIVE_DIMENSION" | "USERLIST_ID" | "ASSET_LIBRARY_DIRECTORY_HANDLE" | "ASSET_LIBRARY_VIDEO_HANDLE" | "ASSET_LIBRARY_HANDLE" | "THIRD_PARTY_SERVED_URL" | "CM360_DYNAMIC_TARGETING_KEY" | "DV360_LINE_ITEM_ID" | (string & {});
  /** Optional. The default value of the field. */
  defaultValue?: string;
  /** Optional. Whether the field is filterable. Could be set as true when the field type is any of the following and is not renderable: - STRING - BOOL - COUNTRY_CODE_ISO - CM360_SITE_ID - CM360_KEYWORD - CM360_CREATIVE_ID - CM360_PLACEMENT_ID - CM360_AD_ID - CM360_ADVERTISER_ID - CM360_CAMPAIGN_ID - CITY - REGION - POSTAL_CODE - METRO - CUSTOM_VALUE - REMARKETING_VALUE - GEO_CANONICAL - STRING_LIST - CREATIVE_DIMENSION - USERLIST_ID - CM360_DYNAMIC_TARGETING_KEY - DV360_LINE_ITEM_ID */
  filterable?: boolean;
  /** Optional. Whether the field is required and should not be empty in the feed. Could be set as true when the field type is any of the following: - GPA_SERVED_IMAGE_URL - GPA_SERVED_ASSET_URL - ASSET_LIBRARY_HANDLE - ASSET_LIBRARY_VIDEO_HANDLE - ASSET_LIBRARY_DIRECTORY_HANDLE */
  required?: boolean;
  /** Optional. Whether the field is able to display. Could be set as true when the field type is not in any of the following and the field is not filterable: - COUNTRY_CODE_ISO - CITY - REGION - POSTAL_CODE - METRO - GEO_CANONICAL - USERLIST_ID - CONTEXTUAL_KEYWORD - CM360_DYNAMIC_TARGETING_KEY - WEIGHT */
  renderable?: boolean;
}

export const FeedField: Schema.Schema<FeedField> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  filterable: Schema.optional(Schema.Boolean),
  required: Schema.optional(Schema.Boolean),
  renderable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FeedField" }) as any as Schema.Schema<FeedField>;

export interface Element {
  /** Optional. The name of the element. It is defaulted to resource file name if not provided. */
  elementName?: string;
  /** Required. The list of fields of the element. The field order and name should match the meta data in the content source source. */
  feedFields?: Array<FeedField>;
  /** Required. The field ID to specify the field used for uniquely identifying the feed row. This is a required field. */
  externalIdFieldId?: number;
  /** Required. The field ID to specify the field used for dynamic reporting in Campaign Manager 360. */
  reportingLabelFieldId?: number;
  /** Optional. The field ID to specify the field that represents the default field in the feed. */
  defaultFieldId?: number;
  /** Optional. The field ID to specify the field that represents the start timestamp. Only applicable if you're planning to use scheduling in your dynamic creative. */
  startTimestampFieldId?: number;
  /** Optional. The field ID to specify the field that represents the end timestamp. Only applicable if you're planning to use scheduling in your dynamic creative. */
  endTimestampFieldId?: number;
  /** Optional. Whether the start and end timestamp is local timestamp. The default value is false which means start and end timestamp is in UTC. */
  isLocalTimestamp?: boolean;
  /** Optional. The field ID that specify field used for proximity targeting. */
  proximityTargetingFieldId?: number;
  /** Optional. The field ID to specify the active field in the feed. */
  activeFieldId?: number;
  /** Output only. The creation timestamp of the element. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Output only. The last modified timestamp of the element. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
}

export const Element: Schema.Schema<Element> = Schema.suspend(() => Schema.Struct({
  elementName: Schema.optional(Schema.String),
  feedFields: Schema.optional(Schema.Array(FeedField)),
  externalIdFieldId: Schema.optional(Schema.Number),
  reportingLabelFieldId: Schema.optional(Schema.Number),
  defaultFieldId: Schema.optional(Schema.Number),
  startTimestampFieldId: Schema.optional(Schema.Number),
  endTimestampFieldId: Schema.optional(Schema.Number),
  isLocalTimestamp: Schema.optional(Schema.Boolean),
  proximityTargetingFieldId: Schema.optional(Schema.Number),
  activeFieldId: Schema.optional(Schema.Number),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
})).annotate({ identifier: "Element" }) as any as Schema.Schema<Element>;

export interface FeedSchedule {
  /** Optional. Whether the schedule is enabled. */
  scheduleEnabled?: boolean;
  /** Optional. The number of times the feed retransforms within one day. This is a required field if the schedule is enabled. Acceptable values are between 1 to 6, inclusive. */
  repeatValue?: string;
  /** Optional. The hour of the day to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0. */
  startHour?: string;
  /** Optional. The minute of the hour to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0. */
  startMinute?: string;
  /** Optional. The time zone to schedule the feed. It is applicable if the repeat value is equal to 1. Default value is "America/Los_Angeles". */
  timeZone?: string;
}

export const FeedSchedule: Schema.Schema<FeedSchedule> = Schema.suspend(() => Schema.Struct({
  scheduleEnabled: Schema.optional(Schema.Boolean),
  repeatValue: Schema.optional(Schema.String),
  startHour: Schema.optional(Schema.String),
  startMinute: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "FeedSchedule" }) as any as Schema.Schema<FeedSchedule>;

export interface IngestionStatus {
  /** Output only. The number of rows processed in the feed. */
  numRowsProcessed?: string;
  /** Output only. The total number of rows in the feed. */
  numRowsTotal?: string;
  /** Output only. The number of rows with errors in the feed. */
  numRowsWithErrors?: string;
  /** Output only. The total number of warnings in the feed. */
  numWarningsTotal?: string;
  /** Output only. The number of active rows in the feed. */
  numActiveRows?: string;
}

export const IngestionStatus: Schema.Schema<IngestionStatus> = Schema.suspend(() => Schema.Struct({
  numRowsProcessed: Schema.optional(Schema.String),
  numRowsTotal: Schema.optional(Schema.String),
  numRowsWithErrors: Schema.optional(Schema.String),
  numWarningsTotal: Schema.optional(Schema.String),
  numActiveRows: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestionStatus" }) as any as Schema.Schema<IngestionStatus>;

export interface FieldError {
  /** Output only. The ID of the field. */
  fieldId?: number;
  /** Output only. The name of the field. */
  fieldName?: string;
  /** Output only. The list of values of the field. */
  fieldValues?: Array<string>;
  /** Output only. The ingestion error of the field. */
  ingestionError?: "UNKNOWN_PARSING_ERROR" | "MISSING_ID" | "MISSING_REPORTING_LABEL" | "EMPTY_VALUE" | "ASSET_DOWNLOAD_ERROR" | "ID_TOO_LONG" | "DUPLICATE_ID" | "PARSING_ERROR" | "COUNTRY_PARSING_ERROR" | "LONG_PARSING_ERROR" | "BOOL_PARSING_ERROR" | "EXPANDED_URL_PARSING_ERROR" | "FLOAT_PARSING_ERROR" | "DATETIME_PARSING_ERROR" | "INVALID_PREFERENCE_VALUE" | "GEO_NOT_FOUND_ERROR" | "GEO_PARSING_ERROR" | "GEO_PROXIMITY_TARGETING_MULTIPLE_LOCATION_ERROR" | "POSTAL_CODE_PARSING_ERROR" | "METRO_CODE_PARSING_ERROR" | "DATETIME_WITHOUT_TIMEZONE_PARSING_ERROR" | "WEIGHT_PARSING_ERROR" | "CREATIVE_DIMENSION_PARSING_ERROR" | "MULTIVALUE_ID" | "ENDTIME_BEFORE_STARTTIME" | "INVALID_ASSET_LIBRARY_HANDLE" | "INVALID_ASSET_LIBRARY_VIDEO_HANDLE" | "INVALID_ASSET_LIBRARY_DIRECTORY_HANDLE" | "DYNAMIC_TARGETING_KEY_NOT_DEFINED_FOR_ADVERTISER" | "USERLIST_ID_NOT_ACCESSIBLE_FOR_ADVERTISER" | "ENDTIME_PASSED" | "ENDTIME_TOO_SOON" | "TEXT_ASSET_REFERENCE" | "IMAGE_ASSET_SCS_REFERENCE" | "AIRPORT_GEO_TARGET" | "CANONICAL_NAME_QUERY_MISMATCH" | "NO_DEFAULT_ROW" | "NO_ACTIVE_DEFAULT_ROW" | "NO_DEFAULT_ROW_IN_DATE_RANGE" | "NO_ACTIVE_DEFAULT_ROW_IN_DATE_RANGE" | "PAYLOAD_LIMIT_EXCEEDED" | "SSL_NOT_COMPLIANT" | (string & {});
  /** Output only. Incidcates whether the field has error or warning. */
  isError?: boolean;
}

export const FieldError: Schema.Schema<FieldError> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.Number),
  fieldName: Schema.optional(Schema.String),
  fieldValues: Schema.optional(Schema.Array(Schema.String)),
  ingestionError: Schema.optional(Schema.String),
  isError: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FieldError" }) as any as Schema.Schema<FieldError>;

export interface IngestionErrorRecord {
  /** Output only. The record ID of the ingestion error record. */
  recordId?: string;
  /** Output only. The list of field errors of the ingestion error record. */
  errors?: Array<FieldError>;
}

export const IngestionErrorRecord: Schema.Schema<IngestionErrorRecord> = Schema.suspend(() => Schema.Struct({
  recordId: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(FieldError)),
})).annotate({ identifier: "IngestionErrorRecord" }) as any as Schema.Schema<IngestionErrorRecord>;

export interface FeedIngestionStatus {
  /** Output only. The processing state of the feed. */
  state?: "FEED_PROCESSING_STATE_UNKNOWN" | "CANCELLED" | "INGESTING_QUEUED" | "INGESTING" | "INGESTED_SUCCESS" | "INGESTED_FAILURE" | "REQUEST_TO_PUBLISH" | "PUBLISHING" | "PUBLISHED_SUCCESS" | "PUBLISHED_FAILURE" | (string & {});
  /** Output only. The ingestion status of the feed. */
  ingestionStatus?: IngestionStatus;
  /** Output only. The ingestion error records of the feed. */
  ingestionErrorRecords?: Array<IngestionErrorRecord>;
}

export const FeedIngestionStatus: Schema.Schema<FeedIngestionStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  ingestionStatus: Schema.optional(IngestionStatus),
  ingestionErrorRecords: Schema.optional(Schema.Array(IngestionErrorRecord)),
})).annotate({ identifier: "FeedIngestionStatus" }) as any as Schema.Schema<FeedIngestionStatus>;

export interface DynamicFeed {
  /** Output only. Unique ID of this dynamic feed. This is a read-only, auto-generated field. */
  dynamicFeedId?: string;
  /** Required. Advertiser ID of this dynamic feed. This is a required field. */
  studioAdvertiserId?: string;
  /** Optional. Name of this dynamic feed. It is defaulted to content source file name if not provided. */
  dynamicFeedName?: string;
  /** Required. The content source of the dynamic feed. This is a required field. */
  contentSource?: ContentSource;
  /** Required. The element of the dynamic feed that is to specify the schema of the feed. This is a required field. */
  element?: Element;
  /** Output only. Indicates whether the dynamic feed has a published version. This is a read-only field. */
  hasPublished?: boolean;
  /** Output only. The status of the feed. It is a read-only field that depends on the the feed ingestion status. The default value is INACTIVE, and it will be updated to ACTIVE once the feed is ingested successfully. */
  status?: "STATUS_UNKNOWN" | "ACTIVE" | "INACTIVE" | "DELETED" | (string & {});
  /** Optional. The schedule of the dynamic feed. It can be set if the feed is published. */
  feedSchedule?: FeedSchedule;
  /** Output only. The ingestion status of the dynamic feed. This is a read-only field. */
  feedIngestionStatus?: FeedIngestionStatus;
  /** Output only. The creation timestamp of the dynamic feed. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Output only. The last modified timestamp of the dynamic feed. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
}

export const DynamicFeed: Schema.Schema<DynamicFeed> = Schema.suspend(() => Schema.Struct({
  dynamicFeedId: Schema.optional(Schema.String),
  studioAdvertiserId: Schema.optional(Schema.String),
  dynamicFeedName: Schema.optional(Schema.String),
  contentSource: Schema.optional(ContentSource),
  element: Schema.optional(Element),
  hasPublished: Schema.optional(Schema.Boolean),
  status: Schema.optional(Schema.String),
  feedSchedule: Schema.optional(FeedSchedule),
  feedIngestionStatus: Schema.optional(FeedIngestionStatus),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
})).annotate({ identifier: "DynamicFeed" }) as any as Schema.Schema<DynamicFeed>;

export interface DynamicFeedsInsertRequest {
  /** Required. Dynamic profile ID of the inserted dynamic feed. */
  dynamicProfileId?: string;
  /** Required. Dynamic feed to insert. */
  dynamicFeed?: DynamicFeed;
}

export const DynamicFeedsInsertRequest: Schema.Schema<DynamicFeedsInsertRequest> = Schema.suspend(() => Schema.Struct({
  dynamicProfileId: Schema.optional(Schema.String),
  dynamicFeed: Schema.optional(DynamicFeed),
})).annotate({ identifier: "DynamicFeedsInsertRequest" }) as any as Schema.Schema<DynamicFeedsInsertRequest>;

export interface RequestValue {
  /** Optional. Custom key in the request. Used only when the field type is CUSTOM_VALUE. */
  key?: string;
  /** Optional. User attribute IDs in the request. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID. */
  userAttributeIds?: Array<string>;
  /** Optional. User attribute IDs in the request that should be excluded. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID. */
  excludeFromUserAttributeIds?: Array<string>;
}

export const RequestValue: Schema.Schema<RequestValue> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  userAttributeIds: Schema.optional(Schema.Array(Schema.String)),
  excludeFromUserAttributeIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RequestValue" }) as any as Schema.Schema<RequestValue>;

export interface DependentFieldValue {
  /** Optional. The ID of the element that value's field will match against. */
  elementId?: string;
  /** Optional. The field id of the dependent field. */
  fieldId?: number;
}

export const DependentFieldValue: Schema.Schema<DependentFieldValue> = Schema.suspend(() => Schema.Struct({
  elementId: Schema.optional(Schema.String),
  fieldId: Schema.optional(Schema.Number),
})).annotate({ identifier: "DependentFieldValue" }) as any as Schema.Schema<DependentFieldValue>;

export interface FieldFilter {
  /** Optional. The field ID on the left hand side of the expression. */
  fieldId?: number;
  /** Optional. Left hand side of the expression match type. */
  matchType?: "LHS_MATCH_TYPE_UNKNOWN" | "EQUALS_OR_UNRESTRICTED" | "EQUALS" | "UNRESTRICTED" | "NOT_EQUALS" | (string & {});
  /** Optional. Right hand side of the expression. */
  valueType?: "RHS_VALUE_TYPE_UNKNOWN" | "STRING" | "REQUEST" | "BOOL" | "DEPENDENT" | (string & {});
  /** Optional. The string value, only applicable when rhs_value_type is STRING. */
  stringValue?: string;
  /** Optional. The boolean values, only applicable when rhs_value_type is BOOL. */
  boolValue?: boolean;
  /** Optional. The request value, only applicable when rhs_value_type is REQUEST. */
  requestValue?: RequestValue;
  /** Optional. The dependent values, only applicable when rhs_value_type is DEPENDENT. */
  dependentFieldValue?: DependentFieldValue;
}

export const FieldFilter: Schema.Schema<FieldFilter> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.Number),
  matchType: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
  requestValue: Schema.optional(RequestValue),
  dependentFieldValue: Schema.optional(DependentFieldValue),
})).annotate({ identifier: "FieldFilter" }) as any as Schema.Schema<FieldFilter>;

export interface RuleBlock {
  /** Optional. A list of non-auto field filters */
  fieldFilter?: Array<FieldFilter>;
}

export const RuleBlock: Schema.Schema<RuleBlock> = Schema.suspend(() => Schema.Struct({
  fieldFilter: Schema.optional(Schema.Array(FieldFilter)),
})).annotate({ identifier: "RuleBlock" }) as any as Schema.Schema<RuleBlock>;

export interface CustomRule {
  /** Optional. Priority of the custom rule. */
  priority?: number;
  /** Optional. Name of this custom rule. */
  name?: string;
  /** Optional. A list of field filter, the custom rule will apply. */
  ruleBlocks?: Array<RuleBlock>;
}

export const CustomRule: Schema.Schema<CustomRule> = Schema.suspend(() => Schema.Struct({
  priority: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  ruleBlocks: Schema.optional(Schema.Array(RuleBlock)),
})).annotate({ identifier: "CustomRule" }) as any as Schema.Schema<CustomRule>;

export interface ProximityFilter {
  /** Optional. Field ID in the element. */
  fieldId?: number;
  /** Optional. Radius length in units defined by radius_units. */
  radiusValue?: number;
  /** Optional. The units of the radius value */
  radiusUnitType?: "RADIUS_UNIT_TYPE_UNKNOWN" | "KILOMETERS" | "MILES" | (string & {});
  /** Optional. The radius bucket type of the proximity filter */
  radiusBucketType?: "RADIUS_BUCKET_TYPE_UNKNOWN" | "SMALL" | "MEDIUM" | "LARGE" | "MULTI_REGIONAL" | "NATIONAL" | (string & {});
}

export const ProximityFilter: Schema.Schema<ProximityFilter> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.Number),
  radiusValue: Schema.optional(Schema.Number),
  radiusUnitType: Schema.optional(Schema.String),
  radiusBucketType: Schema.optional(Schema.String),
})).annotate({ identifier: "ProximityFilter" }) as any as Schema.Schema<ProximityFilter>;

export interface CustomValueField {
  /** Optional. Field ID in the element. */
  fieldId?: number;
  /** Optional. Custom key used to match for auto filtering. */
  requestKey?: string;
}

export const CustomValueField: Schema.Schema<CustomValueField> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.Number),
  requestKey: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomValueField" }) as any as Schema.Schema<CustomValueField>;

export interface RemarketingValueAttribute {
  /** Optional. Field ID in the element. */
  fieldId?: number;
  /** Optional. Remarketing user attribute IDs for auto filtering. */
  userAttributeIds?: Array<string>;
}

export const RemarketingValueAttribute: Schema.Schema<RemarketingValueAttribute> = Schema.suspend(() => Schema.Struct({
  fieldId: Schema.optional(Schema.Number),
  userAttributeIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemarketingValueAttribute" }) as any as Schema.Schema<RemarketingValueAttribute>;

export interface DynamicRules {
  /** Optional. The type of the rule, the default value is OPEN. */
  ruleType?: "RULE_SET_TYPE_UNKNOWN" | "OPEN" | "AUTO" | "CUSTOM" | "PROXIMITY_TARGETING" | (string & {});
  /** Optional. The rotation type to select from eligible rows. Rotation type only apply when the filtering rule results in more than one eligible rows. */
  rotationType?: "ROTATION_TYPE_UNKNOWN" | "RANDOM" | "OPTIMIZED" | "WEIGHTED" | (string & {});
  /** Optional. The custom rules of the dynamic feed, only applicable when rule type is CUSTOM. */
  customRules?: Array<CustomRule>;
  /** Optional. The proximity targeting rules of the dynamic feed, only applicable when rule type is PROXIMITY_TARGETING. */
  proximityFilter?: ProximityFilter;
  /** Optional. The field ID for the feed that will be used for weighted rotation, only applicable when rotation type is WEIGHTED. */
  weightFieldId?: number;
  /** Optional. List of field IDs in this element that should be auto-targeted. Applicable when rule type is AUTO. */
  autoTargetedFieldIds?: Array<number>;
  /** Optional. Mapping between field ID and custom key that are used to match for auto filtering. */
  customValueFields?: Array<CustomValueField>;
  /** Optional. The link between an element field ID and a list of user attribute IDs. */
  remarketingValueAttributes?: Array<RemarketingValueAttribute>;
}

export const DynamicRules: Schema.Schema<DynamicRules> = Schema.suspend(() => Schema.Struct({
  ruleType: Schema.optional(Schema.String),
  rotationType: Schema.optional(Schema.String),
  customRules: Schema.optional(Schema.Array(CustomRule)),
  proximityFilter: Schema.optional(ProximityFilter),
  weightFieldId: Schema.optional(Schema.Number),
  autoTargetedFieldIds: Schema.optional(Schema.Array(Schema.Number)),
  customValueFields: Schema.optional(Schema.Array(CustomValueField)),
  remarketingValueAttributes: Schema.optional(Schema.Array(RemarketingValueAttribute)),
})).annotate({ identifier: "DynamicRules" }) as any as Schema.Schema<DynamicRules>;

export interface DynamicProfileFeedSettings {
  /** Optional. Dynamic feed ID associated with dynamic profile version. */
  dynamicFeedId?: string;
  /** Optional. The number of this dynamic feed rows needed by the dynamic profile, default value is 1. Acceptable values are between 1 to 99, inclusive. */
  quantity?: number;
  /** Optional. Dynamic rules for row selection for the given dynamic feed in the given dynamic profile. */
  dynamicRules?: DynamicRules;
}

export const DynamicProfileFeedSettings: Schema.Schema<DynamicProfileFeedSettings> = Schema.suspend(() => Schema.Struct({
  dynamicFeedId: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.Number),
  dynamicRules: Schema.optional(DynamicRules),
})).annotate({ identifier: "DynamicProfileFeedSettings" }) as any as Schema.Schema<DynamicProfileFeedSettings>;

export interface DynamicProfileVersion {
  /** Output only. Version ID of this dynamic profile version. This is a read-only, auto-generated field. -1 for draft version, 0+ for published versions. */
  versionId?: string;
  /** Optional. Associated dynamic feeds and their settings (including dynamic rules) for this dynamic profile version. */
  dynamicProfileFeedSettings?: Array<DynamicProfileFeedSettings>;
}

export const DynamicProfileVersion: Schema.Schema<DynamicProfileVersion> = Schema.suspend(() => Schema.Struct({
  versionId: Schema.optional(Schema.String),
  dynamicProfileFeedSettings: Schema.optional(Schema.Array(DynamicProfileFeedSettings)),
})).annotate({ identifier: "DynamicProfileVersion" }) as any as Schema.Schema<DynamicProfileVersion>;

export interface DynamicProfile {
  /** Output only. Unique ID of this dynamic profile. This is a read-only, auto-generated field. */
  dynamicProfileId?: string;
  /** Required. Advertiser ID of this dynamic profile. This is a required field on insertion. */
  studioAdvertiserId?: string;
  /** Required. Identifier. Name of this dynamic profile. This is a required field and must be less than 256 characters long. */
  name?: string;
  /** Optional. Description of this dynamic profile. */
  description?: string;
  /** Optional. Status of this dynamic profile. */
  status?: "STATUS_UNKNOWN" | "ACTIVE" | "INACTIVE" | "DELETED" | (string & {});
  /** Optional. Archive status of this dynamic profile. */
  archiveStatus?: "ARCHIVE_STATUS_UNKNOWN" | "UNARCHIVED" | "ARCHIVED" | (string & {});
  /** Output only. The creation timestamp of the dynamic profile. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Output only. The last modified timestamp of the dynamic profile. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
  /** Optional. Draft version of the dynamic profile. */
  draft?: DynamicProfileVersion;
  /** Optional. Active version of the dynamic profile. */
  active?: DynamicProfileVersion;
  /** Output only. Identifies what kind of resource this is. Value: the fixed string "dfareporting#dynamicProfile". */
  kind?: string;
}

export const DynamicProfile: Schema.Schema<DynamicProfile> = Schema.suspend(() => Schema.Struct({
  dynamicProfileId: Schema.optional(Schema.String),
  studioAdvertiserId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  archiveStatus: Schema.optional(Schema.String),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
  draft: Schema.optional(DynamicProfileVersion),
  active: Schema.optional(DynamicProfileVersion),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicProfile" }) as any as Schema.Schema<DynamicProfile>;

export interface DynamicProfileGenerateCodeResponse {
  /** Generated code for the dynamic profile. The code will need to be unescaped. */
  code?: string;
}

export const DynamicProfileGenerateCodeResponse: Schema.Schema<DynamicProfileGenerateCodeResponse> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicProfileGenerateCodeResponse" }) as any as Schema.Schema<DynamicProfileGenerateCodeResponse>;

export interface DynamicTargetingKey {
  /** Name of this dynamic targeting key. This is a required field. Must be less than 256 characters long and cannot contain commas. All characters are converted to lowercase. */
  name?: string;
  /** Type of the object of this dynamic targeting key. This is a required field. */
  objectType?: "OBJECT_ADVERTISER" | "OBJECT_AD" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT" | (string & {});
  /** ID of the object of this dynamic targeting key. This is a required field. */
  objectId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#dynamicTargetingKey". */
  kind?: string;
}

export const DynamicTargetingKey: Schema.Schema<DynamicTargetingKey> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  objectType: Schema.optional(Schema.String),
  objectId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicTargetingKey" }) as any as Schema.Schema<DynamicTargetingKey>;

export interface DynamicTargetingKeysListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#dynamicTargetingKeysListResponse". */
  kind?: string;
  /** Dynamic targeting key collection. */
  dynamicTargetingKeys?: Array<DynamicTargetingKey>;
}

export const DynamicTargetingKeysListResponse: Schema.Schema<DynamicTargetingKeysListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  dynamicTargetingKeys: Schema.optional(Schema.Array(DynamicTargetingKey)),
})).annotate({ identifier: "DynamicTargetingKeysListResponse" }) as any as Schema.Schema<DynamicTargetingKeysListResponse>;

export interface EventTag {
  /** ID of this event tag. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this event tag. This is a required field and must be less than 256 characters long. */
  name?: string;
  /** Account ID of this event tag. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this event tag. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of this event tag. This field or the campaignId field is required on insertion. */
  advertiserId?: string;
  /** Campaign ID of this event tag. This field or the advertiserId field is required on insertion. */
  campaignId?: string;
  /** Event tag type. Can be used to specify whether to use a third-party pixel, a third-party JavaScript URL, or a third-party click-through URL for either impression or click tracking. This is a required field. */
  type?: "IMPRESSION_IMAGE_EVENT_TAG" | "IMPRESSION_JAVASCRIPT_EVENT_TAG" | "CLICK_THROUGH_EVENT_TAG" | (string & {});
  /** Payload URL for this event tag. The URL on a click-through event tag should have a landing page URL appended to the end of it. This field is required on insertion. */
  url?: string;
  /** Filter list of site IDs associated with this event tag. The siteFilterType determines whether this is a allowlist or blocklist filter. */
  siteIds?: Array<string>;
  /** Site filter type for this event tag. If no type is specified then the event tag will be applied to all sites. */
  siteFilterType?: "ALLOWLIST" | "BLOCKLIST" | (string & {});
  /** Whether this event tag should be automatically enabled for all of the advertiser's campaigns and ads. */
  enabledByDefault?: boolean;
  /** Status of this event tag. Must be ENABLED for this event tag to fire. This is a required field. */
  status?: "ENABLED" | "DISABLED" | (string & {});
  /** Number of times the landing page URL should be URL-escaped before being appended to the click-through event tag URL. Only applies to click-through event tags as specified by the event tag type. */
  urlEscapeLevels?: number;
  /** Whether this tag is SSL-compliant or not. This is a read-only field. */
  sslCompliant?: boolean;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the campaign. This is a read-only, auto-generated field. */
  campaignIdDimensionValue?: DimensionValue;
  /** Whether to remove this event tag from ads that are trafficked through Display & Video 360 to Ad Exchange. This may be useful if the event tag uses a pixel that is unapproved for Ad Exchange bids on one or more networks, such as the Google Display Network. */
  excludeFromAdxRequests?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#eventTag". */
  kind?: string;
}

export const EventTag: Schema.Schema<EventTag> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  siteIds: Schema.optional(Schema.Array(Schema.String)),
  siteFilterType: Schema.optional(Schema.String),
  enabledByDefault: Schema.optional(Schema.Boolean),
  status: Schema.optional(Schema.String),
  urlEscapeLevels: Schema.optional(Schema.Number),
  sslCompliant: Schema.optional(Schema.Boolean),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  campaignIdDimensionValue: Schema.optional(DimensionValue),
  excludeFromAdxRequests: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "EventTag" }) as any as Schema.Schema<EventTag>;

export interface EventTagsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#eventTagsListResponse". */
  kind?: string;
  /** Event tag collection. */
  eventTags?: Array<EventTag>;
}

export const EventTagsListResponse: Schema.Schema<EventTagsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  eventTags: Schema.optional(Schema.Array(EventTag)),
})).annotate({ identifier: "EventTagsListResponse" }) as any as Schema.Schema<EventTagsListResponse>;

export interface DateRange {
  startDate?: string;
  endDate?: string;
  /** The date range relative to the date of when the report is run. */
  relativeDateRange?: "TODAY" | "YESTERDAY" | "WEEK_TO_DATE" | "MONTH_TO_DATE" | "QUARTER_TO_DATE" | "YEAR_TO_DATE" | "PREVIOUS_WEEK" | "PREVIOUS_MONTH" | "PREVIOUS_QUARTER" | "PREVIOUS_YEAR" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_90_DAYS" | "LAST_365_DAYS" | "LAST_24_MONTHS" | "LAST_14_DAYS" | "LAST_60_DAYS" | (string & {});
  /** The kind of resource this is, in this case dfareporting#dateRange. */
  kind?: string;
}

export const DateRange: Schema.Schema<DateRange> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  relativeDateRange: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DateRange" }) as any as Schema.Schema<DateRange>;

export interface File {
  /** The unique ID of this report file. */
  id?: string;
  /** The ID of the report this file was generated from. */
  reportId?: string;
  /** Etag of this resource. */
  etag?: string;
  /** The status of the report file. */
  status?: "PROCESSING" | "REPORT_AVAILABLE" | "FAILED" | "CANCELLED" | "QUEUED" | (string & {});
  /** The filename of the file. */
  fileName?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#file". */
  kind?: string;
  /** The date range for which the file has report data. The date range will always be the absolute date range for which the report is run. */
  dateRange?: DateRange;
  /** The output format of the report. Only available once the file is available. */
  format?: "CSV" | "EXCEL" | (string & {});
  /** The timestamp in milliseconds since epoch when this file was last modified. */
  lastModifiedTime?: string;
  /** The URLs where the completed report file can be downloaded. */
  urls?: { browserUrl?: string; apiUrl?: string };
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  reportId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  fileName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  dateRange: Schema.optional(DateRange),
  format: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  urls: Schema.optional(Schema.Struct({ browserUrl: Schema.optional(Schema.String), apiUrl: Schema.optional(Schema.String) })),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface FileList {
  /** Continuation token used to page through files. To retrieve the next page of results, set the next request's "pageToken" to the value of this field. The page token is only valid for a limited amount of time and should not be persisted. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#fileList". */
  kind?: string;
  /** Etag of this resource. */
  etag?: string;
  /** The files returned in this response. */
  items?: Array<File>;
}

export const FileList: Schema.Schema<FileList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(File)),
})).annotate({ identifier: "FileList" }) as any as Schema.Schema<FileList>;

export interface FloodlightActivityGroup {
  /** ID of this floodlight activity group. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this floodlight activity group. This is a required field. Must be less than 65 characters long and cannot contain quotes. */
  name?: string;
  /** Value of the type= parameter in the floodlight tag, which the ad servers use to identify the activity group that the activity belongs to. This is optional: if empty, a new tag string will be generated for you. This string must be 1 to 8 characters long, with valid characters being a-z0-9[ _ ]. This tag string must also be unique among activity groups of the same floodlight configuration. This field is read-only after insertion. */
  tagString?: string;
  /** Type of the floodlight activity group. This is a required field that is read-only after insertion. */
  type?: "COUNTER" | "SALE" | (string & {});
  /** Floodlight configuration ID of this floodlight activity group. This is a required field. */
  floodlightConfigurationId?: string;
  /** Advertiser ID of this floodlight activity group. If this field is left blank, the value will be copied over either from the floodlight configuration's advertiser or from the existing activity group's advertiser. */
  advertiserId?: string;
  /** Subaccount ID of this floodlight activity group. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Account ID of this floodlight activity group. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Dimension value for the ID of the floodlight configuration. This is a read-only, auto-generated field. */
  floodlightConfigurationIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of this floodlight activity group. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightActivityGroup". */
  kind?: string;
}

export const FloodlightActivityGroup: Schema.Schema<FloodlightActivityGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  tagString: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  floodlightConfigurationId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  floodlightConfigurationIdDimensionValue: Schema.optional(DimensionValue),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  idDimensionValue: Schema.optional(DimensionValue),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "FloodlightActivityGroup" }) as any as Schema.Schema<FloodlightActivityGroup>;

export interface FloodlightActivityGroupsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightActivityGroupsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Floodlight activity group collection. */
  floodlightActivityGroups?: Array<FloodlightActivityGroup>;
}

export const FloodlightActivityGroupsListResponse: Schema.Schema<FloodlightActivityGroupsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  floodlightActivityGroups: Schema.optional(Schema.Array(FloodlightActivityGroup)),
})).annotate({ identifier: "FloodlightActivityGroupsListResponse" }) as any as Schema.Schema<FloodlightActivityGroupsListResponse>;

export interface FloodlightActivitiesGenerateTagResponse {
  /** Generated tag for this Floodlight activity. For Google tags, this is the event snippet. */
  floodlightActivityTag?: string;
  /** The global snippet section of a Google tag. The Google tag sets new cookies on your domain, which will store a unique identifier for a user or the ad click that brought the user to your site. Learn more. */
  globalSiteTagGlobalSnippet?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightActivitiesGenerateTagResponse". */
  kind?: string;
}

export const FloodlightActivitiesGenerateTagResponse: Schema.Schema<FloodlightActivitiesGenerateTagResponse> = Schema.suspend(() => Schema.Struct({
  floodlightActivityTag: Schema.optional(Schema.String),
  globalSiteTagGlobalSnippet: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "FloodlightActivitiesGenerateTagResponse" }) as any as Schema.Schema<FloodlightActivitiesGenerateTagResponse>;

export interface FloodlightActivityDynamicTag {
  /** ID of this dynamic tag. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this tag. */
  name?: string;
  /** Tag code. */
  tag?: string;
}

export const FloodlightActivityDynamicTag: Schema.Schema<FloodlightActivityDynamicTag> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "FloodlightActivityDynamicTag" }) as any as Schema.Schema<FloodlightActivityDynamicTag>;

export interface FloodlightActivityPublisherDynamicTag {
  /** Dynamic floodlight tag. */
  dynamicTag?: FloodlightActivityDynamicTag;
  /** Site ID of this dynamic tag. */
  siteId?: string;
  /** Directory site ID of this dynamic tag. This is a write-only field that can be used as an alternative to the siteId field. When this resource is retrieved, only the siteId field will be populated. */
  directorySiteId?: string;
  /** Whether this tag is applicable only for click-throughs. */
  clickThrough?: boolean;
  /** Whether this tag is applicable only for view-throughs. */
  viewThrough?: boolean;
  /** Dimension value for the ID of the site. This is a read-only, auto-generated field. */
  siteIdDimensionValue?: DimensionValue;
}

export const FloodlightActivityPublisherDynamicTag: Schema.Schema<FloodlightActivityPublisherDynamicTag> = Schema.suspend(() => Schema.Struct({
  dynamicTag: Schema.optional(FloodlightActivityDynamicTag),
  siteId: Schema.optional(Schema.String),
  directorySiteId: Schema.optional(Schema.String),
  clickThrough: Schema.optional(Schema.Boolean),
  viewThrough: Schema.optional(Schema.Boolean),
  siteIdDimensionValue: Schema.optional(DimensionValue),
})).annotate({ identifier: "FloodlightActivityPublisherDynamicTag" }) as any as Schema.Schema<FloodlightActivityPublisherDynamicTag>;

export interface FloodlightActivity {
  /** ID of this floodlight activity. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this floodlight activity. This is a required field. Must be less than 129 characters long and cannot contain quotes. */
  name?: string;
  /** Value of the cat= parameter in the floodlight tag, which the ad servers use to identify the activity. This is optional: if empty, a new tag string will be generated for you. This string must be 1 to 8 characters long, with valid characters being a-z0-9[ _ ]. This tag string must also be unique among activities of the same activity group. This field is read-only after insertion. */
  tagString?: string;
  /** URL where this tag will be deployed. If specified, must be less than 256 characters long. */
  expectedUrl?: string;
  /** Whether this tag should use SSL. */
  secure?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightActivity". */
  kind?: string;
  /** Counting method for conversions for this floodlight activity. This is a required field. */
  countingMethod?: "STANDARD_COUNTING" | "UNIQUE_COUNTING" | "SESSION_COUNTING" | "TRANSACTIONS_COUNTING" | "ITEMS_SOLD_COUNTING" | (string & {});
  /** Tag format type for the floodlight activity. If left blank, the tag format will default to HTML. */
  tagFormat?: "HTML" | "XHTML" | (string & {});
  /** Code type used for cache busting in the generated tag. Applicable only when floodlightActivityGroupType is COUNTER and countingMethod is STANDARD_COUNTING or UNIQUE_COUNTING. */
  cacheBustingType?: "JAVASCRIPT" | "ACTIVE_SERVER_PAGE" | "JSP" | "PHP" | "COLD_FUSION" | (string & {});
  /** List of the user-defined variables used by this conversion tag. These map to the "u[1-100]=" in the tags. Each of these can have a user defined type. Acceptable values are U1 to U100, inclusive. */
  userDefinedVariableTypes?: Array<"U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9" | "U10" | "U11" | "U12" | "U13" | "U14" | "U15" | "U16" | "U17" | "U18" | "U19" | "U20" | "U21" | "U22" | "U23" | "U24" | "U25" | "U26" | "U27" | "U28" | "U29" | "U30" | "U31" | "U32" | "U33" | "U34" | "U35" | "U36" | "U37" | "U38" | "U39" | "U40" | "U41" | "U42" | "U43" | "U44" | "U45" | "U46" | "U47" | "U48" | "U49" | "U50" | "U51" | "U52" | "U53" | "U54" | "U55" | "U56" | "U57" | "U58" | "U59" | "U60" | "U61" | "U62" | "U63" | "U64" | "U65" | "U66" | "U67" | "U68" | "U69" | "U70" | "U71" | "U72" | "U73" | "U74" | "U75" | "U76" | "U77" | "U78" | "U79" | "U80" | "U81" | "U82" | "U83" | "U84" | "U85" | "U86" | "U87" | "U88" | "U89" | "U90" | "U91" | "U92" | "U93" | "U94" | "U95" | "U96" | "U97" | "U98" | "U99" | "U100" | (string & {})>;
  /** General notes or implementation instructions for the tag. */
  notes?: string;
  /** Dynamic floodlight tags. */
  defaultTags?: Array<FloodlightActivityDynamicTag>;
  /** Publisher dynamic floodlight tags. */
  publisherTags?: Array<FloodlightActivityPublisherDynamicTag>;
  /** Floodlight activity group ID of this floodlight activity. This is a required field. */
  floodlightActivityGroupId?: string;
  /** Floodlight configuration ID of this floodlight activity. If this field is left blank, the value will be copied over either from the activity group's floodlight configuration or from the existing activity's floodlight configuration. */
  floodlightConfigurationId?: string;
  /** Advertiser ID of this floodlight activity. If this field is left blank, the value will be copied over either from the activity group's advertiser or the existing activity's advertiser. */
  advertiserId?: string;
  /** Subaccount ID of this floodlight activity. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Account ID of this floodlight activity. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Type of the associated floodlight activity group. This is a read-only field. */
  floodlightActivityGroupType?: "COUNTER" | "SALE" | (string & {});
  /** Tag string of the associated floodlight activity group. This is a read-only field. */
  floodlightActivityGroupTagString?: string;
  /** Name of the associated floodlight activity group. This is a read-only field. */
  floodlightActivityGroupName?: string;
  /** Whether the floodlight activity is SSL-compliant. This is a read-only field, its value detected by the system from the floodlight tags. */
  sslCompliant?: boolean;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the floodlight configuration. This is a read-only, auto-generated field. */
  floodlightConfigurationIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of this floodlight activity. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Whether this floodlight activity must be SSL-compliant. */
  sslRequired?: boolean;
  /** The type of Floodlight tag this activity will generate. This is a required field. */
  floodlightTagType?: "IFRAME" | "IMAGE" | "GLOBAL_SITE_TAG" | (string & {});
  /** The status of the activity. This can only be set to ACTIVE or ARCHIVED_AND_DISABLED. The ARCHIVED status is no longer supported and cannot be set for Floodlight activities. The DISABLED_POLICY status indicates that a Floodlight activity is violating Google policy. Contact your account manager for more information. */
  status?: "ACTIVE" | "ARCHIVED_AND_DISABLED" | "ARCHIVED" | "DISABLED_POLICY" | (string & {});
  /** Whether the activity is enabled for attribution. */
  attributionEnabled?: boolean;
  /** Required. The conversion category of the activity. */
  conversionCategory?: "CONVERSION_CATEGORY_DEFAULT" | "CONVERSION_CATEGORY_PURCHASE" | "CONVERSION_CATEGORY_SIGNUP" | "CONVERSION_CATEGORY_PAGE_VIEW" | "CONVERSION_CATEGORY_DOWNLOAD" | "CONVERSION_CATEGORY_BOOM_EVENT" | "CONVERSION_CATEGORY_ADD_TO_CART" | "CONVERSION_CATEGORY_BEGIN_CHECKOUT" | "CONVERSION_CATEGORY_SUBSCRIBE_PAID" | "CONVERSION_CATEGORY_SUBSCRIBE_FREE" | "CONVERSION_CATEGORY_PHONE_CALL_LEAD" | "CONVERSION_CATEGORY_IMPORTED_LEAD" | "CONVERSION_CATEGORY_SUBMIT_LEAD_FORM" | "CONVERSION_CATEGORY_BOOK_APPOINTMENT" | "CONVERSION_CATEGORY_REQUEST_QUOTE" | "CONVERSION_CATEGORY_GET_DIRECTIONS" | "CONVERSION_CATEGORY_OUTBOUND_CLICK" | "CONVERSION_CATEGORY_CONTACT" | "CONVERSION_CATEGORY_VIEW_KEY_PAGE" | "CONVERSION_CATEGORY_ENGAGEMENT" | "CONVERSION_CATEGORY_STORE_VISIT" | "CONVERSION_CATEGORY_STORE_SALE" | "CONVERSION_CATEGORY_QUALIFIED_LEAD" | "CONVERSION_CATEGORY_CONVERTED_LEAD" | "CONVERSION_CATEGORY_IN_APP_AD_REVENUE" | "CONVERSION_CATEGORY_MESSAGE_LEAD" | (string & {});
}

export const FloodlightActivity: Schema.Schema<FloodlightActivity> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  tagString: Schema.optional(Schema.String),
  expectedUrl: Schema.optional(Schema.String),
  secure: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  countingMethod: Schema.optional(Schema.String),
  tagFormat: Schema.optional(Schema.String),
  cacheBustingType: Schema.optional(Schema.String),
  userDefinedVariableTypes: Schema.optional(Schema.Array(Schema.String)),
  notes: Schema.optional(Schema.String),
  defaultTags: Schema.optional(Schema.Array(FloodlightActivityDynamicTag)),
  publisherTags: Schema.optional(Schema.Array(FloodlightActivityPublisherDynamicTag)),
  floodlightActivityGroupId: Schema.optional(Schema.String),
  floodlightConfigurationId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  floodlightActivityGroupType: Schema.optional(Schema.String),
  floodlightActivityGroupTagString: Schema.optional(Schema.String),
  floodlightActivityGroupName: Schema.optional(Schema.String),
  sslCompliant: Schema.optional(Schema.Boolean),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  floodlightConfigurationIdDimensionValue: Schema.optional(DimensionValue),
  idDimensionValue: Schema.optional(DimensionValue),
  sslRequired: Schema.optional(Schema.Boolean),
  floodlightTagType: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  attributionEnabled: Schema.optional(Schema.Boolean),
  conversionCategory: Schema.optional(Schema.String),
})).annotate({ identifier: "FloodlightActivity" }) as any as Schema.Schema<FloodlightActivity>;

export interface FloodlightActivitiesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightActivitiesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Floodlight activity collection. */
  floodlightActivities?: Array<FloodlightActivity>;
}

export const FloodlightActivitiesListResponse: Schema.Schema<FloodlightActivitiesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  floodlightActivities: Schema.optional(Schema.Array(FloodlightActivity)),
})).annotate({ identifier: "FloodlightActivitiesListResponse" }) as any as Schema.Schema<FloodlightActivitiesListResponse>;

export interface OmnitureSettings {
  /** Whether Omniture integration is enabled. This property can be enabled only when the "Advanced Ad Serving" account setting is enabled. */
  omnitureIntegrationEnabled?: boolean;
  /** Whether placement cost data will be sent to Omniture. This property can be enabled only if omnitureIntegrationEnabled is true. */
  omnitureCostDataEnabled?: boolean;
}

export const OmnitureSettings: Schema.Schema<OmnitureSettings> = Schema.suspend(() => Schema.Struct({
  omnitureIntegrationEnabled: Schema.optional(Schema.Boolean),
  omnitureCostDataEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OmnitureSettings" }) as any as Schema.Schema<OmnitureSettings>;

export interface TagSettings {
  /** Whether dynamic floodlight tags are enabled. */
  dynamicTagEnabled?: boolean;
  /** Whether image tags are enabled. */
  imageTagEnabled?: boolean;
}

export const TagSettings: Schema.Schema<TagSettings> = Schema.suspend(() => Schema.Struct({
  dynamicTagEnabled: Schema.optional(Schema.Boolean),
  imageTagEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TagSettings" }) as any as Schema.Schema<TagSettings>;

export interface UserDefinedVariableConfiguration {
  /** Variable name in the tag. This is a required field. */
  variableType?: "U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9" | "U10" | "U11" | "U12" | "U13" | "U14" | "U15" | "U16" | "U17" | "U18" | "U19" | "U20" | "U21" | "U22" | "U23" | "U24" | "U25" | "U26" | "U27" | "U28" | "U29" | "U30" | "U31" | "U32" | "U33" | "U34" | "U35" | "U36" | "U37" | "U38" | "U39" | "U40" | "U41" | "U42" | "U43" | "U44" | "U45" | "U46" | "U47" | "U48" | "U49" | "U50" | "U51" | "U52" | "U53" | "U54" | "U55" | "U56" | "U57" | "U58" | "U59" | "U60" | "U61" | "U62" | "U63" | "U64" | "U65" | "U66" | "U67" | "U68" | "U69" | "U70" | "U71" | "U72" | "U73" | "U74" | "U75" | "U76" | "U77" | "U78" | "U79" | "U80" | "U81" | "U82" | "U83" | "U84" | "U85" | "U86" | "U87" | "U88" | "U89" | "U90" | "U91" | "U92" | "U93" | "U94" | "U95" | "U96" | "U97" | "U98" | "U99" | "U100" | (string & {});
  /** Data type for the variable. This is a required field. */
  dataType?: "STRING" | "NUMBER" | (string & {});
  /** User-friendly name for the variable which will appear in reports. This is a required field, must be less than 64 characters long, and cannot contain the following characters: ""<>". */
  reportName?: string;
}

export const UserDefinedVariableConfiguration: Schema.Schema<UserDefinedVariableConfiguration> = Schema.suspend(() => Schema.Struct({
  variableType: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
  reportName: Schema.optional(Schema.String),
})).annotate({ identifier: "UserDefinedVariableConfiguration" }) as any as Schema.Schema<UserDefinedVariableConfiguration>;

export interface ThirdPartyAuthenticationToken {
  /** Name of the third-party authentication token. */
  name?: string;
  /** Value of the third-party authentication token. This is a read-only, auto-generated field. */
  value?: string;
}

export const ThirdPartyAuthenticationToken: Schema.Schema<ThirdPartyAuthenticationToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "ThirdPartyAuthenticationToken" }) as any as Schema.Schema<ThirdPartyAuthenticationToken>;

export interface CustomViewabilityMetricConfiguration {
  /** The percentage of video that must be on screen for the Custom Viewability Metric to count an impression. */
  viewabilityPercent?: number;
  /** Whether the video must be audible to count an impression. */
  audible?: boolean;
  /** The time in milliseconds the video must play for the Custom Viewability Metric to count an impression. If both this and timePercent are specified, the earlier of the two will be used. */
  timeMillis?: number;
  /** The percentage of video that must play for the Custom Viewability Metric to count an impression. If both this and timeMillis are specified, the earlier of the two will be used. */
  timePercent?: number;
}

export const CustomViewabilityMetricConfiguration: Schema.Schema<CustomViewabilityMetricConfiguration> = Schema.suspend(() => Schema.Struct({
  viewabilityPercent: Schema.optional(Schema.Number),
  audible: Schema.optional(Schema.Boolean),
  timeMillis: Schema.optional(Schema.Number),
  timePercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "CustomViewabilityMetricConfiguration" }) as any as Schema.Schema<CustomViewabilityMetricConfiguration>;

export interface CustomViewabilityMetric {
  /** ID of the custom viewability metric. */
  id?: string;
  /** Name of the custom viewability metric. */
  name?: string;
  /** Configuration of the custom viewability metric. */
  configuration?: CustomViewabilityMetricConfiguration;
}

export const CustomViewabilityMetric: Schema.Schema<CustomViewabilityMetric> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  configuration: Schema.optional(CustomViewabilityMetricConfiguration),
})).annotate({ identifier: "CustomViewabilityMetric" }) as any as Schema.Schema<CustomViewabilityMetric>;

export interface FloodlightConfiguration {
  /** ID of this floodlight configuration. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this floodlight configuration. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this floodlight configuration. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of the parent advertiser of this floodlight configuration. */
  advertiserId?: string;
  firstDayOfWeek?: "SUNDAY" | "MONDAY" | (string & {});
  /** Lookback window settings for this floodlight configuration. */
  lookbackConfiguration?: LookbackConfiguration;
  /** Types of attribution options for natural search conversions. */
  naturalSearchConversionAttributionOption?: "EXCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION" | "INCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION" | "INCLUDE_NATURAL_SEARCH_TIERED_CONVERSION_ATTRIBUTION" | (string & {});
  /** Settings for Campaign Manager Omniture integration. */
  omnitureSettings?: OmnitureSettings;
  /** Whether the exposure-to-conversion report is enabled. This report shows detailed pathway information on up to 10 of the most recent ad exposures seen by a user before converting. */
  exposureToConversionEnabled?: boolean;
  /** Configuration settings for dynamic and image floodlight tags. */
  tagSettings?: TagSettings;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightConfiguration". */
  kind?: string;
  /** List of user defined variables enabled for this configuration. */
  userDefinedVariableConfigurations?: Array<UserDefinedVariableConfiguration>;
  /** Whether advertiser data is shared with Google Analytics. */
  analyticsDataSharingEnabled?: boolean;
  /** Dimension value for the ID of this floodlight configuration. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Whether in-app attribution tracking is enabled. */
  inAppAttributionTrackingEnabled?: boolean;
  /** List of third-party authentication tokens enabled for this configuration. */
  thirdPartyAuthenticationTokens?: Array<ThirdPartyAuthenticationToken>;
  /** Custom Viewability metric for the floodlight configuration. */
  customViewabilityMetric?: CustomViewabilityMetric;
}

export const FloodlightConfiguration: Schema.Schema<FloodlightConfiguration> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  firstDayOfWeek: Schema.optional(Schema.String),
  lookbackConfiguration: Schema.optional(LookbackConfiguration),
  naturalSearchConversionAttributionOption: Schema.optional(Schema.String),
  omnitureSettings: Schema.optional(OmnitureSettings),
  exposureToConversionEnabled: Schema.optional(Schema.Boolean),
  tagSettings: Schema.optional(TagSettings),
  kind: Schema.optional(Schema.String),
  userDefinedVariableConfigurations: Schema.optional(Schema.Array(UserDefinedVariableConfiguration)),
  analyticsDataSharingEnabled: Schema.optional(Schema.Boolean),
  idDimensionValue: Schema.optional(DimensionValue),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  inAppAttributionTrackingEnabled: Schema.optional(Schema.Boolean),
  thirdPartyAuthenticationTokens: Schema.optional(Schema.Array(ThirdPartyAuthenticationToken)),
  customViewabilityMetric: Schema.optional(CustomViewabilityMetric),
})).annotate({ identifier: "FloodlightConfiguration" }) as any as Schema.Schema<FloodlightConfiguration>;

export interface FloodlightConfigurationsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightConfigurationsListResponse". */
  kind?: string;
  /** Floodlight configuration collection. */
  floodlightConfigurations?: Array<FloodlightConfiguration>;
}

export const FloodlightConfigurationsListResponse: Schema.Schema<FloodlightConfigurationsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  floodlightConfigurations: Schema.optional(Schema.Array(FloodlightConfiguration)),
})).annotate({ identifier: "FloodlightConfigurationsListResponse" }) as any as Schema.Schema<FloodlightConfigurationsListResponse>;

export interface CampaignSummary {
  /** Campaign ID. */
  campaignId?: string;
  /** Campaign billing invoice code. */
  billingInvoiceCode?: string;
  /** The pre-tax amount for this campaign, in micros of the invoice's currency. */
  preTaxAmountMicros?: string;
  /** The tax amount for this campaign, in micros of the invoice's currency. */
  taxAmountMicros?: string;
  /** The total amount of charges for this campaign, in micros of the invoice's currency. */
  totalAmountMicros?: string;
}

export const CampaignSummary: Schema.Schema<CampaignSummary> = Schema.suspend(() => Schema.Struct({
  campaignId: Schema.optional(Schema.String),
  billingInvoiceCode: Schema.optional(Schema.String),
  preTaxAmountMicros: Schema.optional(Schema.String),
  taxAmountMicros: Schema.optional(Schema.String),
  totalAmountMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "CampaignSummary" }) as any as Schema.Schema<CampaignSummary>;

export interface Invoice {
  /** ID of this invoice. */
  id?: string;
  /** The ID of the payments profile the invoice belongs to. Appears on the invoice PDF as *Billing ID*. */
  paymentsProfileId?: string;
  /** The ID of the payments account the invoice belongs to. Appears on the invoice PDF as *Billing Account Number*. */
  paymentsAccountId?: string;
  /** The date when the invoice was issued. */
  issueDate?: string;
  /** The invoice due date. */
  dueDate?: string;
  /** The invoice service start date. */
  serviceStartDate?: string;
  /** The invoice service end date. */
  serviceEndDate?: string;
  /** Invoice currency code in ISO 4217 format. */
  currencyCode?: string;
  /** The pre-tax subtotal amount, in micros of the invoice's currency. */
  subtotalAmountMicros?: string;
  /** The sum of all taxes in invoice, in micros of the invoice's currency. */
  totalTaxAmountMicros?: string;
  /** The invoice total amount, in micros of the invoice's currency. */
  totalAmountMicros?: string;
  /** Purchase order number associated with the invoice. */
  purchaseOrderNumber?: string;
  /** The type of invoice document. */
  invoiceType?: "INVOICE_TYPE_UNSPECIFIED" | "INVOICE_TYPE_CREDIT" | "INVOICE_TYPE_INVOICE" | (string & {});
  /** The originally issued invoice that is being adjusted by this invoice, if applicable. May appear on invoice PDF as *Reference invoice number*. */
  correctedInvoiceId?: string;
  /** The originally issued invoice(s) that is being cancelled by this invoice, if applicable. May appear on invoice PDF as *Replaced invoice numbers*. Note: There may be multiple replaced invoices due to consolidation of multiple invoices into a single invoice. */
  replacedInvoiceIds?: Array<string>;
  /** The URL to download a PDF copy of the invoice. Note that this URL is user specific and requires a valid OAuth 2.0 access token to access. The access token must be provided in an *Authorization: Bearer* HTTP header. The URL will only be usable for 7 days from when the api is called. */
  pdfUrl?: string;
  /** The list of summarized campaign information associated with this invoice. */
  campaign_summaries?: Array<CampaignSummary>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#invoice". */
  kind?: string;
}

export const Invoice: Schema.Schema<Invoice> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  paymentsProfileId: Schema.optional(Schema.String),
  paymentsAccountId: Schema.optional(Schema.String),
  issueDate: Schema.optional(Schema.String),
  dueDate: Schema.optional(Schema.String),
  serviceStartDate: Schema.optional(Schema.String),
  serviceEndDate: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  subtotalAmountMicros: Schema.optional(Schema.String),
  totalTaxAmountMicros: Schema.optional(Schema.String),
  totalAmountMicros: Schema.optional(Schema.String),
  purchaseOrderNumber: Schema.optional(Schema.String),
  invoiceType: Schema.optional(Schema.String),
  correctedInvoiceId: Schema.optional(Schema.String),
  replacedInvoiceIds: Schema.optional(Schema.Array(Schema.String)),
  pdfUrl: Schema.optional(Schema.String),
  campaign_summaries: Schema.optional(Schema.Array(CampaignSummary)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Invoice" }) as any as Schema.Schema<Invoice>;

export interface AdvertiserInvoicesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#advertiserInvoicesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Invoice collection */
  invoices?: Array<Invoice>;
}

export const AdvertiserInvoicesListResponse: Schema.Schema<AdvertiserInvoicesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  invoices: Schema.optional(Schema.Array(Invoice)),
})).annotate({ identifier: "AdvertiserInvoicesListResponse" }) as any as Schema.Schema<AdvertiserInvoicesListResponse>;

export interface MobileApp {
  /** ID of this mobile app. */
  id?: string;
  /** Title of this mobile app. */
  title?: string;
  /** Mobile app directory. */
  directory?: "UNKNOWN" | "APPLE_APP_STORE" | "GOOGLE_PLAY_STORE" | "ROKU_APP_STORE" | "AMAZON_FIRETV_APP_STORE" | "PLAYSTATION_APP_STORE" | "APPLE_TV_APP_STORE" | "XBOX_APP_STORE" | "SAMSUNG_TV_APP_STORE" | "ANDROID_TV_APP_STORE" | "GENERIC_CTV_APP_STORE" | (string & {});
  /** Publisher name. */
  publisherName?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileApp". */
  kind?: string;
}

export const MobileApp: Schema.Schema<MobileApp> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  directory: Schema.optional(Schema.String),
  publisherName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileApp" }) as any as Schema.Schema<MobileApp>;

export interface DeepLink {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#deepLink". */
  kind?: string;
  /** The URL of the mobile app being linked to. */
  appUrl?: string;
  /** The fallback URL. This URL will be served to users who do not have the mobile app installed. */
  fallbackUrl?: string;
  /** Ads served to users on these remarketing lists will use this deep link. Applicable when mobileApp.directory is APPLE_APP_STORE. */
  remarketingListIds?: Array<string>;
  /** The mobile app targeted by this deep link. */
  mobileApp?: MobileApp;
}

export const DeepLink: Schema.Schema<DeepLink> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  appUrl: Schema.optional(Schema.String),
  fallbackUrl: Schema.optional(Schema.String),
  remarketingListIds: Schema.optional(Schema.Array(Schema.String)),
  mobileApp: Schema.optional(MobileApp),
})).annotate({ identifier: "DeepLink" }) as any as Schema.Schema<DeepLink>;

export interface LandingPage {
  /** ID of this landing page. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this landing page. This is a required field. It must be less than 256 characters long. */
  name?: string;
  /** URL of this landing page. This is a required field. */
  url?: string;
  /** Whether this landing page has been archived. */
  archived?: boolean;
  /** Advertiser ID of this landing page. This is a required field. */
  advertiserId?: string;
  /** Links that will direct the user to a mobile app, if installed. */
  deepLinks?: Array<DeepLink>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#landingPage". */
  kind?: string;
}

export const LandingPage: Schema.Schema<LandingPage> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  archived: Schema.optional(Schema.Boolean),
  advertiserId: Schema.optional(Schema.String),
  deepLinks: Schema.optional(Schema.Array(DeepLink)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LandingPage" }) as any as Schema.Schema<LandingPage>;

export interface AdvertiserLandingPagesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#advertiserLandingPagesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Landing page collection */
  landingPages?: Array<LandingPage>;
}

export const AdvertiserLandingPagesListResponse: Schema.Schema<AdvertiserLandingPagesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  landingPages: Schema.optional(Schema.Array(LandingPage)),
})).annotate({ identifier: "AdvertiserLandingPagesListResponse" }) as any as Schema.Schema<AdvertiserLandingPagesListResponse>;

export interface LanguagesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#languagesListResponse". */
  kind?: string;
  /** Language collection. */
  languages?: Array<Language>;
}

export const LanguagesListResponse: Schema.Schema<LanguagesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  languages: Schema.optional(Schema.Array(Language)),
})).annotate({ identifier: "LanguagesListResponse" }) as any as Schema.Schema<LanguagesListResponse>;

export interface MetrosListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#metrosListResponse". */
  kind?: string;
  /** Metro collection. */
  metros?: Array<Metro>;
}

export const MetrosListResponse: Schema.Schema<MetrosListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  metros: Schema.optional(Schema.Array(Metro)),
})).annotate({ identifier: "MetrosListResponse" }) as any as Schema.Schema<MetrosListResponse>;

export interface MobileAppsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileAppsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Mobile apps collection. */
  mobileApps?: Array<MobileApp>;
}

export const MobileAppsListResponse: Schema.Schema<MobileAppsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  mobileApps: Schema.optional(Schema.Array(MobileApp)),
})).annotate({ identifier: "MobileAppsListResponse" }) as any as Schema.Schema<MobileAppsListResponse>;

export interface MobileCarriersListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileCarriersListResponse". */
  kind?: string;
  /** Mobile carrier collection. */
  mobileCarriers?: Array<MobileCarrier>;
}

export const MobileCarriersListResponse: Schema.Schema<MobileCarriersListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  mobileCarriers: Schema.optional(Schema.Array(MobileCarrier)),
})).annotate({ identifier: "MobileCarriersListResponse" }) as any as Schema.Schema<MobileCarriersListResponse>;

export interface OperatingSystemsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemsListResponse". */
  kind?: string;
  /** Operating system collection. */
  operatingSystems?: Array<OperatingSystem>;
}

export const OperatingSystemsListResponse: Schema.Schema<OperatingSystemsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  operatingSystems: Schema.optional(Schema.Array(OperatingSystem)),
})).annotate({ identifier: "OperatingSystemsListResponse" }) as any as Schema.Schema<OperatingSystemsListResponse>;

export interface OperatingSystemVersionsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemVersionsListResponse". */
  kind?: string;
  /** Operating system version collection. */
  operatingSystemVersions?: Array<OperatingSystemVersion>;
}

export const OperatingSystemVersionsListResponse: Schema.Schema<OperatingSystemVersionsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  operatingSystemVersions: Schema.optional(Schema.Array(OperatingSystemVersion)),
})).annotate({ identifier: "OperatingSystemVersionsListResponse" }) as any as Schema.Schema<OperatingSystemVersionsListResponse>;

export interface ListPopulationTerm {
  /** Name of the variable (U1, U2, etc.) being compared in this term. This field is only relevant when type is set to null, CUSTOM_VARIABLE_TERM or REFERRER_TERM. */
  variableName?: string;
  /** Friendly name of this term's variable. This is a read-only, auto-generated field. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM. */
  variableFriendlyName?: string;
  /** Comparison operator of this term. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM. */
  operator?: "NUM_EQUALS" | "NUM_LESS_THAN" | "NUM_LESS_THAN_EQUAL" | "NUM_GREATER_THAN" | "NUM_GREATER_THAN_EQUAL" | "STRING_EQUALS" | "STRING_CONTAINS" | (string & {});
  /** Literal to compare the variable to. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM. */
  value?: string;
  /** Whether to negate the comparison result of this term during rule evaluation. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM. */
  negation?: boolean;
  /** ID of the list in question. This field is only relevant when type is set to LIST_MEMBERSHIP_TERM. */
  remarketingListId?: string;
  /** Will be true if the term should check if the user is in the list and false if the term should check if the user is not in the list. This field is only relevant when type is set to LIST_MEMBERSHIP_TERM. False by default. */
  contains?: boolean;
  /** List population term type determines the applicable fields in this object. If left unset or set to CUSTOM_VARIABLE_TERM, then variableName, variableFriendlyName, operator, value, and negation are applicable. If set to LIST_MEMBERSHIP_TERM then remarketingListId and contains are applicable. If set to REFERRER_TERM then operator, value, and negation are applicable. */
  type?: "CUSTOM_VARIABLE_TERM" | "LIST_MEMBERSHIP_TERM" | "REFERRER_TERM" | (string & {});
}

export const ListPopulationTerm: Schema.Schema<ListPopulationTerm> = Schema.suspend(() => Schema.Struct({
  variableName: Schema.optional(Schema.String),
  variableFriendlyName: Schema.optional(Schema.String),
  operator: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  negation: Schema.optional(Schema.Boolean),
  remarketingListId: Schema.optional(Schema.String),
  contains: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPopulationTerm" }) as any as Schema.Schema<ListPopulationTerm>;

export interface ListPopulationClause {
  /** Terms of this list population clause. Each clause is made up of list population terms representing constraints and are joined by ORs. */
  terms?: Array<ListPopulationTerm>;
}

export const ListPopulationClause: Schema.Schema<ListPopulationClause> = Schema.suspend(() => Schema.Struct({
  terms: Schema.optional(Schema.Array(ListPopulationTerm)),
})).annotate({ identifier: "ListPopulationClause" }) as any as Schema.Schema<ListPopulationClause>;

export interface ListPopulationRule {
  /** Floodlight activity ID associated with this rule. This field can be left blank. */
  floodlightActivityId?: string;
  /** Name of floodlight activity associated with this rule. This is a read-only, auto-generated field. */
  floodlightActivityName?: string;
  /** Clauses that make up this list population rule. Clauses are joined by ANDs, and the clauses themselves are made up of list population terms which are joined by ORs. */
  listPopulationClauses?: Array<ListPopulationClause>;
}

export const ListPopulationRule: Schema.Schema<ListPopulationRule> = Schema.suspend(() => Schema.Struct({
  floodlightActivityId: Schema.optional(Schema.String),
  floodlightActivityName: Schema.optional(Schema.String),
  listPopulationClauses: Schema.optional(Schema.Array(ListPopulationClause)),
})).annotate({ identifier: "ListPopulationRule" }) as any as Schema.Schema<ListPopulationRule>;

export interface RemarketingList {
  /** Remarketing list ID. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests. */
  accountId?: string;
  /** Subaccount ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests. */
  subaccountId?: string;
  /** Dimension value for the advertiser ID that owns this remarketing list. This is a required field. */
  advertiserId?: string;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Name of the remarketing list. This is a required field. Must be no greater than 128 characters long. */
  name?: string;
  /** Remarketing list description. */
  description?: string;
  /** Whether this remarketing list is active. */
  active?: boolean;
  /** Number of users currently in the list. This is a read-only field. */
  listSize?: string;
  /** Number of days that a user should remain in the remarketing list without an impression. Acceptable values are 1 to 540, inclusive. */
  lifeSpan?: string;
  /** Rule used to populate the remarketing list with users. */
  listPopulationRule?: ListPopulationRule;
  /** Product from which this remarketing list was originated. */
  listSource?: "REMARKETING_LIST_SOURCE_OTHER" | "REMARKETING_LIST_SOURCE_ADX" | "REMARKETING_LIST_SOURCE_DFP" | "REMARKETING_LIST_SOURCE_XFP" | "REMARKETING_LIST_SOURCE_DFA" | "REMARKETING_LIST_SOURCE_GA" | "REMARKETING_LIST_SOURCE_YOUTUBE" | "REMARKETING_LIST_SOURCE_DBM" | "REMARKETING_LIST_SOURCE_GPLUS" | "REMARKETING_LIST_SOURCE_DMP" | "REMARKETING_LIST_SOURCE_PLAY_STORE" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#remarketingList". */
  kind?: string;
}

export const RemarketingList: Schema.Schema<RemarketingList> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  listSize: Schema.optional(Schema.String),
  lifeSpan: Schema.optional(Schema.String),
  listPopulationRule: Schema.optional(ListPopulationRule),
  listSource: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RemarketingList" }) as any as Schema.Schema<RemarketingList>;

export interface RemarketingListShare {
  /** Remarketing list ID. This is a read-only, auto-generated field. */
  remarketingListId?: string;
  /** Accounts that the remarketing list is shared with. */
  sharedAccountIds?: Array<string>;
  /** Advertisers that the remarketing list is shared with. */
  sharedAdvertiserIds?: Array<string>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#remarketingListShare". */
  kind?: string;
}

export const RemarketingListShare: Schema.Schema<RemarketingListShare> = Schema.suspend(() => Schema.Struct({
  remarketingListId: Schema.optional(Schema.String),
  sharedAccountIds: Schema.optional(Schema.Array(Schema.String)),
  sharedAdvertiserIds: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RemarketingListShare" }) as any as Schema.Schema<RemarketingListShare>;

export interface TagSetting {
  /** Additional key-values to be included in tags. Each key-value pair must be of the form key=value, and pairs must be separated by a semicolon (;). Keys and values must not contain commas. For example, id=2;color=red is a valid value for this field. */
  additionalKeyValues?: string;
  /** Whether click-tracking string should be included in the tags. */
  includeClickTracking?: boolean;
  /** Whether static landing page URLs should be included in the tags. New placements will default to the value set on their site. */
  includeClickThroughUrls?: boolean;
  /** Option specifying how keywords are embedded in ad tags. This setting can be used to specify whether keyword placeholders are inserted in placement tags for this site. Publishers can then add keywords to those placeholders. */
  keywordOption?: "PLACEHOLDER_WITH_LIST_OF_KEYWORDS" | "IGNORE" | "GENERATE_SEPARATE_TAG_FOR_EACH_KEYWORD" | (string & {});
  /** Optional. Indicates that the unescapedlpurl macro should be included in the tag for the static landing page. New placements will default to the value set on their site. */
  includeUnescapedlpurlMacro?: boolean;
}

export const TagSetting: Schema.Schema<TagSetting> = Schema.suspend(() => Schema.Struct({
  additionalKeyValues: Schema.optional(Schema.String),
  includeClickTracking: Schema.optional(Schema.Boolean),
  includeClickThroughUrls: Schema.optional(Schema.Boolean),
  keywordOption: Schema.optional(Schema.String),
  includeUnescapedlpurlMacro: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TagSetting" }) as any as Schema.Schema<TagSetting>;

export interface SiteSettings {
  /** Whether new cookies are disabled for this site. */
  disableNewCookie?: boolean;
  /** Configuration settings for dynamic and image floodlight tags. */
  tagSetting?: TagSetting;
  /** Whether active view creatives are disabled for this site. */
  activeViewOptOut?: boolean;
  /** Whether this site opts out of ad blocking. When true, ad blocking is disabled for all placements under the site, regardless of the individual placement settings. When false, the campaign and placement settings take effect. */
  adBlockingOptOut?: boolean;
  /** Whether Verification and ActiveView for in-stream video creatives are disabled by default for new placements created under this site. This value will be used to populate the placement.videoActiveViewOptOut field, when no value is specified for the new placement. */
  videoActiveViewOptOutTemplate?: boolean;
  /** Default VPAID adapter setting for new placements created under this site. This value will be used to populate the placements.vpaidAdapterChoice field, when no value is specified for the new placement. Controls which VPAID format the measurement adapter will use for in-stream video creatives assigned to the placement. The publisher's specifications will typically determine this setting. For VPAID creatives, the adapter format will match the VPAID format (HTML5 VPAID creatives use the HTML5 adapter). *Note:* Flash is no longer supported. This field now defaults to HTML5 when the following values are provided: FLASH, BOTH. */
  vpaidAdapterChoiceTemplate?: "DEFAULT" | "FLASH" | "HTML5" | "BOTH" | (string & {});
}

export const SiteSettings: Schema.Schema<SiteSettings> = Schema.suspend(() => Schema.Struct({
  disableNewCookie: Schema.optional(Schema.Boolean),
  tagSetting: Schema.optional(TagSetting),
  activeViewOptOut: Schema.optional(Schema.Boolean),
  adBlockingOptOut: Schema.optional(Schema.Boolean),
  videoActiveViewOptOutTemplate: Schema.optional(Schema.Boolean),
  vpaidAdapterChoiceTemplate: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteSettings" }) as any as Schema.Schema<SiteSettings>;

export interface SiteContact {
  /** ID of this site contact. This is a read-only, auto-generated field. */
  id?: string;
  /** Site contact type. */
  contactType?: "SALES_PERSON" | "TRAFFICKER" | (string & {});
  /** Email address of this site contact. This is a required field. */
  email?: string;
  /** First name of this site contact. */
  firstName?: string;
  /** Last name of this site contact. */
  lastName?: string;
  /** Title or designation of this site contact. */
  title?: string;
  /** Address of this site contact. */
  address?: string;
  /** Primary phone number of this site contact. */
  phone?: string;
}

export const SiteContact: Schema.Schema<SiteContact> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  contactType: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  firstName: Schema.optional(Schema.String),
  lastName: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  phone: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteContact" }) as any as Schema.Schema<SiteContact>;

export interface SiteCompanionSetting {
  /** Whether companions are disabled for this site template. */
  companionsDisabled?: boolean;
  /** Allowlist of companion sizes to be served via this site template. Set this list to null or empty to serve all companion sizes. */
  enabledSizes?: Array<Size>;
  /** Whether to serve only static images as companions. */
  imageOnly?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteCompanionSetting". */
  kind?: string;
}

export const SiteCompanionSetting: Schema.Schema<SiteCompanionSetting> = Schema.suspend(() => Schema.Struct({
  companionsDisabled: Schema.optional(Schema.Boolean),
  enabledSizes: Schema.optional(Schema.Array(Size)),
  imageOnly: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteCompanionSetting" }) as any as Schema.Schema<SiteCompanionSetting>;

export interface SiteTranscodeSetting {
  /** Allowlist of video formats to be served to this site template. Set this list to null or empty to serve all video formats. */
  enabledVideoFormats?: Array<number>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteTranscodeSetting". */
  kind?: string;
}

export const SiteTranscodeSetting: Schema.Schema<SiteTranscodeSetting> = Schema.suspend(() => Schema.Struct({
  enabledVideoFormats: Schema.optional(Schema.Array(Schema.Number)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteTranscodeSetting" }) as any as Schema.Schema<SiteTranscodeSetting>;

export interface SiteSkippableSetting {
  /** Whether the user can skip creatives served to this site. This will act as default for new placements created under this site. */
  skippable?: boolean;
  /** Amount of time to play videos served to this site before the skip button should appear. Applicable when skippable is true. */
  skipOffset?: VideoOffset;
  /** Amount of time to play videos served to this site template before counting a view. Applicable when skippable is true. */
  progressOffset?: VideoOffset;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteSkippableSetting". */
  kind?: string;
}

export const SiteSkippableSetting: Schema.Schema<SiteSkippableSetting> = Schema.suspend(() => Schema.Struct({
  skippable: Schema.optional(Schema.Boolean),
  skipOffset: Schema.optional(VideoOffset),
  progressOffset: Schema.optional(VideoOffset),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteSkippableSetting" }) as any as Schema.Schema<SiteSkippableSetting>;

export interface SiteVideoSettings {
  /** Settings for the companion creatives of video creatives served to this site. */
  companionSettings?: SiteCompanionSetting;
  /** Settings for the transcodes of video creatives served to this site. This will act as default for new placements created under this site. */
  transcodeSettings?: SiteTranscodeSetting;
  /** Settings for the skippability of video creatives served to this site. This will act as default for new placements created under this site. */
  skippableSettings?: SiteSkippableSetting;
  /** Orientation of a site template used for video. This will act as default for new placements created under this site. */
  orientation?: "ANY" | "LANDSCAPE" | "PORTRAIT" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteVideoSettings". */
  kind?: string;
  /** Settings for the OBA icon of video creatives served to this site. This will act as default for new placements created under this site. */
  obaSettings?: ObaIcon;
  /** Whether OBA icons are enabled for this placement. */
  obaEnabled?: boolean;
  /** Publisher specification ID used to identify site-associated publisher requirements and automatically populate transcode settings. If publisher specification ID is specified, it will take precedence over transcode settings. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max */
  publisherSpecificationId?: string;
}

export const SiteVideoSettings: Schema.Schema<SiteVideoSettings> = Schema.suspend(() => Schema.Struct({
  companionSettings: Schema.optional(SiteCompanionSetting),
  transcodeSettings: Schema.optional(SiteTranscodeSetting),
  skippableSettings: Schema.optional(SiteSkippableSetting),
  orientation: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  obaSettings: Schema.optional(ObaIcon),
  obaEnabled: Schema.optional(Schema.Boolean),
  publisherSpecificationId: Schema.optional(Schema.String),
})).annotate({ identifier: "SiteVideoSettings" }) as any as Schema.Schema<SiteVideoSettings>;

export interface Site {
  /** ID of this site. This is a read-only, auto-generated field. */
  id?: string;
  /** Key name of this site. This is a read-only, auto-generated field. */
  keyName?: string;
  /** Name of this site.This is a required field. Must be less than 128 characters long. If this site is under a subaccount, the name must be unique among sites of the same subaccount. Otherwise, this site is a top-level site, and the name must be unique among top-level sites of the same account. */
  name?: string;
  /** Account ID of this site. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this site. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Whether this site is approved. */
  approved?: boolean;
  /** Site-wide settings. */
  siteSettings?: SiteSettings;
  /** Site contacts. */
  siteContacts?: Array<SiteContact>;
  /** Directory site associated with this site. This is a required field that is read-only after insertion. */
  directorySiteId?: string;
  /** Dimension value for the ID of this site. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the directory site. This is a read-only, auto-generated field. */
  directorySiteIdDimensionValue?: DimensionValue;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#site". */
  kind?: string;
  /** Default video settings for new placements created under this site. This value will be used to populate the placements.videoSettings field, when no value is specified for the new placement. */
  videoSettings?: SiteVideoSettings;
  /** Optional. Ad serving platform ID to identify the ad serving platform used by the site. Measurement partners can use this field to add ad-server specific macros. If set, this value acts as the default during placement creation. Possible values are: * `1`, Adelphic * `2`, Adform * `3`, Adobe * `4`, Amobee * `5`, Basis (Centro) * `6`, Beeswax * `7`, Amazon * `8`, DV360 (DBM) * `9`, Innovid * `10`, MediaMath * `11`, Roku OneView DSP * `12`, TabMo Hawk * `13`, The Trade Desk * `14`, Xandr Invest DSP * `15`, Yahoo DSP * `16`, Zeta Global * `17`, Scaleout * `18`, Bidtellect * `19`, Unicorn * `20`, Teads * `21`, Quantcast * `22`, Cognitiv * `23`, AdTheorent * `24`, DeepIntent * `25`, Pulsepoint */
  adServingPlatformId?: string;
}

export const Site: Schema.Schema<Site> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  keyName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  approved: Schema.optional(Schema.Boolean),
  siteSettings: Schema.optional(SiteSettings),
  siteContacts: Schema.optional(Schema.Array(SiteContact)),
  directorySiteId: Schema.optional(Schema.String),
  idDimensionValue: Schema.optional(DimensionValue),
  directorySiteIdDimensionValue: Schema.optional(DimensionValue),
  kind: Schema.optional(Schema.String),
  videoSettings: Schema.optional(SiteVideoSettings),
  adServingPlatformId: Schema.optional(Schema.String),
})).annotate({ identifier: "Site" }) as any as Schema.Schema<Site>;

export interface Subaccount {
  /** ID of this subaccount. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this subaccount. This is a required field. Must be less than 128 characters long and be unique among subaccounts of the same account. */
  name?: string;
  /** ID of the account that contains this subaccount. This is a read-only field that can be left blank. */
  accountId?: string;
  /** IDs of the available user role permissions for this subaccount. */
  availablePermissionIds?: Array<string>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#subaccount". */
  kind?: string;
}

export const Subaccount: Schema.Schema<Subaccount> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  availablePermissionIds: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Subaccount" }) as any as Schema.Schema<Subaccount>;

export interface UserRolePermission {
  /** ID of this user role permission. */
  id?: string;
  /** Name of this user role permission. */
  name?: string;
  /** ID of the permission group that this user role permission belongs to. */
  permissionGroupId?: string;
  /** Levels of availability for a user role permission. */
  availability?: "NOT_AVAILABLE_BY_DEFAULT" | "ACCOUNT_BY_DEFAULT" | "SUBACCOUNT_AND_ACCOUNT_BY_DEFAULT" | "ACCOUNT_ALWAYS" | "SUBACCOUNT_AND_ACCOUNT_ALWAYS" | "USER_PROFILE_ONLY" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userRolePermission". */
  kind?: string;
}

export const UserRolePermission: Schema.Schema<UserRolePermission> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  permissionGroupId: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRolePermission" }) as any as Schema.Schema<UserRolePermission>;

export interface UserRole {
  /** ID of this user role. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this user role. This is a required field. Must be less than 256 characters long. If this user role is under a subaccount, the name must be unique among sites of the same subaccount. Otherwise, this user role is a top-level user role, and the name must be unique among top-level user roles of the same account. */
  name?: string;
  /** Account ID of this user role. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this user role. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** ID of the user role that this user role is based on or copied from. This is a required field. */
  parentUserRoleId?: string;
  /** List of permissions associated with this user role. */
  permissions?: Array<UserRolePermission>;
  /** Whether this is a default user role. Default user roles are created by the system for the account/subaccount and cannot be modified or deleted. Each default user role comes with a basic set of preassigned permissions. */
  defaultUserRole?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userRole". */
  kind?: string;
}

export const UserRole: Schema.Schema<UserRole> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  parentUserRoleId: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(UserRolePermission)),
  defaultUserRole: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRole" }) as any as Schema.Schema<UserRole>;

export interface TargetingTemplate {
  /** ID of this targeting template. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this targeting template. This field, if left unset, will be auto-generated on insert and is read-only after insert. */
  accountId?: string;
  /** Subaccount ID of this targeting template. This field, if left unset, will be auto-generated on insert and is read-only after insert. */
  subaccountId?: string;
  /** Advertiser ID of this targeting template. This is a required field on insert and is read-only after insert. */
  advertiserId?: string;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Name of this targeting template. This field is required. It must be less than 256 characters long and unique within an advertiser. */
  name?: string;
  /** Geographical targeting criteria. */
  geoTargeting?: GeoTargeting;
  /** Technology platform targeting criteria. */
  technologyTargeting?: TechnologyTargeting;
  /** Time and day targeting criteria. */
  dayPartTargeting?: DayPartTargeting;
  /** Key-value targeting criteria. */
  keyValueTargetingExpression?: KeyValueTargetingExpression;
  /** Language targeting criteria. */
  languageTargeting?: LanguageTargeting;
  /** Remarketing list targeting criteria. */
  listTargetingExpression?: ListTargetingExpression;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#targetingTemplate". */
  kind?: string;
  /** Optional. Contextual keyword targeting criteria. */
  contextualKeywordTargeting?: ContextualKeywordTargeting;
}

export const TargetingTemplate: Schema.Schema<TargetingTemplate> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  name: Schema.optional(Schema.String),
  geoTargeting: Schema.optional(GeoTargeting),
  technologyTargeting: Schema.optional(TechnologyTargeting),
  dayPartTargeting: Schema.optional(DayPartTargeting),
  keyValueTargetingExpression: Schema.optional(KeyValueTargetingExpression),
  languageTargeting: Schema.optional(LanguageTargeting),
  listTargetingExpression: Schema.optional(ListTargetingExpression),
  kind: Schema.optional(Schema.String),
  contextualKeywordTargeting: Schema.optional(ContextualKeywordTargeting),
})).annotate({ identifier: "TargetingTemplate" }) as any as Schema.Schema<TargetingTemplate>;

export interface PricingSchedulePricingPeriod {
  startDate?: string;
  endDate?: string;
  /** Units of this pricing period. Acceptable values are 0 to 10000000000, inclusive. */
  units?: string;
  /** Rate or cost of this pricing period in nanos (i.e., multiplied by 1000000000). Acceptable values are 0 to 1000000000000000000, inclusive. */
  rateOrCostNanos?: string;
  /** Comments for this pricing period. */
  pricingComment?: string;
}

export const PricingSchedulePricingPeriod: Schema.Schema<PricingSchedulePricingPeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  rateOrCostNanos: Schema.optional(Schema.String),
  pricingComment: Schema.optional(Schema.String),
})).annotate({ identifier: "PricingSchedulePricingPeriod" }) as any as Schema.Schema<PricingSchedulePricingPeriod>;

export interface PricingSchedule {
  testingStartDate?: string;
  startDate?: string;
  endDate?: string;
  /** Placement pricing type. This field is required on insertion. */
  pricingType?: "PRICING_TYPE_CPM" | "PRICING_TYPE_CPC" | "PRICING_TYPE_CPA" | "PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PRICING_TYPE_FLAT_RATE_CLICKS" | "PRICING_TYPE_CPM_ACTIVEVIEW" | (string & {});
  /** Placement cap cost option. */
  capCostOption?: "CAP_COST_NONE" | "CAP_COST_MONTHLY" | "CAP_COST_CUMULATIVE" | (string & {});
  /** Whether this placement is flighted. If true, pricing periods will be computed automatically. */
  flighted?: boolean;
  /** Pricing periods for this placement. */
  pricingPeriods?: Array<PricingSchedulePricingPeriod>;
  /** Floodlight activity ID associated with this placement. This field should be set when placement pricing type is set to PRICING_TYPE_CPA. */
  floodlightActivityId?: string;
}

export const PricingSchedule: Schema.Schema<PricingSchedule> = Schema.suspend(() => Schema.Struct({
  testingStartDate: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  pricingType: Schema.optional(Schema.String),
  capCostOption: Schema.optional(Schema.String),
  flighted: Schema.optional(Schema.Boolean),
  pricingPeriods: Schema.optional(Schema.Array(PricingSchedulePricingPeriod)),
  floodlightActivityId: Schema.optional(Schema.String),
})).annotate({ identifier: "PricingSchedule" }) as any as Schema.Schema<PricingSchedule>;

export interface CompanionSetting {
  /** Whether companions are disabled for this placement. */
  companionsDisabled?: boolean;
  /** Allowlist of companion sizes to be served to this placement. Set this list to null or empty to serve all companion sizes. */
  enabledSizes?: Array<Size>;
  /** Whether to serve only static images as companions. */
  imageOnly?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#companionSetting". */
  kind?: string;
}

export const CompanionSetting: Schema.Schema<CompanionSetting> = Schema.suspend(() => Schema.Struct({
  companionsDisabled: Schema.optional(Schema.Boolean),
  enabledSizes: Schema.optional(Schema.Array(Size)),
  imageOnly: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CompanionSetting" }) as any as Schema.Schema<CompanionSetting>;

export interface TranscodeSetting {
  /** Allowlist of video formats to be served to this placement. Set this list to null or empty to serve all video formats. */
  enabledVideoFormats?: Array<number>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#transcodeSetting". */
  kind?: string;
}

export const TranscodeSetting: Schema.Schema<TranscodeSetting> = Schema.suspend(() => Schema.Struct({
  enabledVideoFormats: Schema.optional(Schema.Array(Schema.Number)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "TranscodeSetting" }) as any as Schema.Schema<TranscodeSetting>;

export interface SkippableSetting {
  /** Whether the user can skip creatives served to this placement. */
  skippable?: boolean;
  /** Amount of time to play videos served to this placement before the skip button should appear. Applicable when skippable is true. */
  skipOffset?: VideoOffset;
  /** Amount of time to play videos served to this placement before counting a view. Applicable when skippable is true. */
  progressOffset?: VideoOffset;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#skippableSetting". */
  kind?: string;
}

export const SkippableSetting: Schema.Schema<SkippableSetting> = Schema.suspend(() => Schema.Struct({
  skippable: Schema.optional(Schema.Boolean),
  skipOffset: Schema.optional(VideoOffset),
  progressOffset: Schema.optional(VideoOffset),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SkippableSetting" }) as any as Schema.Schema<SkippableSetting>;

export interface VideoSettings {
  /** Settings for the companion creatives of video creatives served to this placement. */
  companionSettings?: CompanionSetting;
  /** Settings for the transcodes of video creatives served to this placement. If this object is provided, the creative-level transcode settings will be overridden. */
  transcodeSettings?: TranscodeSetting;
  /** Settings for the skippability of video creatives served to this placement. If this object is provided, the creative-level skippable settings will be overridden. */
  skippableSettings?: SkippableSetting;
  /** Orientation of a video placement. If this value is set, placement will return assets matching the specified orientation. */
  orientation?: "ANY" | "LANDSCAPE" | "PORTRAIT" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#videoSettings". */
  kind?: string;
  /** Settings for the OBA icon of video creatives served to this placement. If this object is provided, the creative-level OBA settings will be overridden. */
  obaSettings?: ObaIcon;
  /** Whether OBA icons are enabled for this placement. */
  obaEnabled?: boolean;
  /** Duration of a video placement in seconds. */
  durationSeconds?: number;
  /** Publisher specification ID of a video placement. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max */
  publisherSpecificationId?: string;
}

export const VideoSettings: Schema.Schema<VideoSettings> = Schema.suspend(() => Schema.Struct({
  companionSettings: Schema.optional(CompanionSetting),
  transcodeSettings: Schema.optional(TranscodeSetting),
  skippableSettings: Schema.optional(SkippableSetting),
  orientation: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  obaSettings: Schema.optional(ObaIcon),
  obaEnabled: Schema.optional(Schema.Boolean),
  durationSeconds: Schema.optional(Schema.Number),
  publisherSpecificationId: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoSettings" }) as any as Schema.Schema<VideoSettings>;

export interface MeasurementPartnerWrappingData {
  /** Measurement partner used for wrapping the placement. */
  measurementPartner?: "NONE" | "INTEGRAL_AD_SCIENCE" | "DOUBLE_VERIFY" | (string & {});
  /** Placement wrapping status. */
  linkStatus?: "MEASUREMENT_PARTNER_UNLINKED" | "MEASUREMENT_PARTNER_LINKED" | "MEASUREMENT_PARTNER_LINK_PENDING" | "MEASUREMENT_PARTNER_LINK_FAILURE" | "MEASUREMENT_PARTNER_LINK_OPT_OUT" | "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING" | "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING" | "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING" | "MEASUREMENT_PARTNER_UNLINK_PENDING" | (string & {});
  /** Tag provided by the measurement partner during wrapping. */
  wrappedTag?: string;
  /** Measurement mode for the wrapped placement. */
  tagWrappingMode?: "NONE" | "BLOCKING" | "MONITORING" | "MONITORING_READ_ONLY" | "VIDEO_PIXEL_MONITORING" | "TRACKING" | "VPAID_MONITORING" | "VPAID_BLOCKING" | "NON_VPAID_MONITORING" | "VPAID_ONLY_MONITORING" | "VPAID_ONLY_BLOCKING" | "VPAID_ONLY_FILTERING" | "VPAID_FILTERING" | "NON_VPAID_FILTERING" | "BLOCKING_FILTERING_VPAID" | "BLOCKING_FILTERING_VPAID_ONLY" | (string & {});
}

export const MeasurementPartnerWrappingData: Schema.Schema<MeasurementPartnerWrappingData> = Schema.suspend(() => Schema.Struct({
  measurementPartner: Schema.optional(Schema.String),
  linkStatus: Schema.optional(Schema.String),
  wrappedTag: Schema.optional(Schema.String),
  tagWrappingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "MeasurementPartnerWrappingData" }) as any as Schema.Schema<MeasurementPartnerWrappingData>;

export interface PlacementSingleConversionDomain {
  conversionDomainId?: string;
  conversionDomainValue?: string;
}

export const PlacementSingleConversionDomain: Schema.Schema<PlacementSingleConversionDomain> = Schema.suspend(() => Schema.Struct({
  conversionDomainId: Schema.optional(Schema.String),
  conversionDomainValue: Schema.optional(Schema.String),
})).annotate({ identifier: "PlacementSingleConversionDomain" }) as any as Schema.Schema<PlacementSingleConversionDomain>;

export interface PlacementConversionDomainOverride {
  conversionDomains?: Array<PlacementSingleConversionDomain>;
}

export const PlacementConversionDomainOverride: Schema.Schema<PlacementConversionDomainOverride> = Schema.suspend(() => Schema.Struct({
  conversionDomains: Schema.optional(Schema.Array(PlacementSingleConversionDomain)),
})).annotate({ identifier: "PlacementConversionDomainOverride" }) as any as Schema.Schema<PlacementConversionDomainOverride>;

export interface YoutubeSettings {
  /** Optional. The business name. */
  businessName?: string;
  /** Optional. The IDs of the creatives to use for the business logo. Currently only one creative is supported. */
  businessLogoCreativeIds?: Array<string>;
  /** Optional. The long headlines. Currently only one long headline is supported. */
  longHeadlines?: Array<string>;
  /** Optional. The descriptions. Currently only one description is supported. */
  descriptions?: Array<string>;
  /** Optional. The call to actions. Currently only one call to action is supported. */
  callToActions?: Array<"CALL_TO_ACTION_UNKNOWN" | "CALL_TO_ACTION_LEARN_MORE" | "CALL_TO_ACTION_GET_QUOTE" | "CALL_TO_ACTION_APPLY_NOW" | "CALL_TO_ACTION_SIGN_UP" | "CALL_TO_ACTION_CONTACT_US" | "CALL_TO_ACTION_SUBSCRIBE" | "CALL_TO_ACTION_DOWNLOAD" | "CALL_TO_ACTION_BOOK_NOW" | "CALL_TO_ACTION_GET_OFFER" | "CALL_TO_ACTION_SHOP_NOW" | "CALL_TO_ACTION_VISIT_STORE" | "CALL_TO_ACTION_CALL_NOW" | "CALL_TO_ACTION_VIEW_MENU" | "CALL_TO_ACTION_TEST_DRIVE" | "CALL_TO_ACTION_SCHEDULE_NOW" | "CALL_TO_ACTION_BUY_NOW" | "CALL_TO_ACTION_DONATE_NOW" | "CALL_TO_ACTION_ORDER_NOW" | "CALL_TO_ACTION_PLAY_NOW" | "CALL_TO_ACTION_SEE_MORE" | "CALL_TO_ACTION_START_NOW" | "CALL_TO_ACTION_VISIT_SITE" | "CALL_TO_ACTION_WATCH_NOW" | (string & {})>;
  /** Optional. The headlines associated with the call to actions. Currently only one headline is supported. */
  headlines?: Array<string>;
}

export const YoutubeSettings: Schema.Schema<YoutubeSettings> = Schema.suspend(() => Schema.Struct({
  businessName: Schema.optional(Schema.String),
  businessLogoCreativeIds: Schema.optional(Schema.Array(Schema.String)),
  longHeadlines: Schema.optional(Schema.Array(Schema.String)),
  descriptions: Schema.optional(Schema.Array(Schema.String)),
  callToActions: Schema.optional(Schema.Array(Schema.String)),
  headlines: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "YoutubeSettings" }) as any as Schema.Schema<YoutubeSettings>;

export interface Placement {
  /** ID of this placement. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this placement. This field can be left blank. */
  accountId?: string;
  /** Subaccount ID of this placement. This field can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of this placement. This field can be left blank. */
  advertiserId?: string;
  /** Campaign ID of this placement. This field is a required field on insertion. */
  campaignId?: string;
  /** Name of this placement.This is a required field and must be less than or equal to 512 characters long. */
  name?: string;
  /** Site ID associated with this placement. On insert, you must set either this field or the directorySiteId field to specify the site associated with this placement. This is a required field that is read-only after insertion. */
  siteId?: string;
  /** Key name of this placement. This is a read-only, auto-generated field. */
  keyName?: string;
  /** Directory site ID of this placement. On insert, you must set either this field or the siteId field to specify the site associated with this placement. This is a required field that is read-only after insertion. */
  directorySiteId?: string;
  /** Payment source for this placement. This is a required field that is read-only after insertion. */
  paymentSource?: "PLACEMENT_AGENCY_PAID" | "PLACEMENT_PUBLISHER_PAID" | (string & {});
  /** Placement compatibility. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering on desktop, on mobile devices or in mobile apps for regular or interstitial ads respectively. APP and APP_INTERSTITIAL are no longer allowed for new placement insertions. Instead, use DISPLAY or DISPLAY_INTERSTITIAL. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. This field is required on insertion. */
  compatibility?: "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO" | (string & {});
  /** Size associated with this placement. When inserting or updating a placement, only the size ID field is used. This field is required on insertion. */
  size?: Size;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placement". */
  kind?: string;
  /** Whether payment was approved for this placement. This is a read-only field relevant only to publisher-paid placements. */
  paymentApproved?: boolean;
  /** Pricing schedule of this placement. This field is required on insertion, specifically subfields startDate, endDate and pricingType. */
  pricingSchedule?: PricingSchedule;
  /** ID of this placement's group, if applicable. */
  placementGroupId?: string;
  /** Whether this placement is the primary placement of a roadblock (placement group). You cannot change this field from true to false. Setting this field to true will automatically set the primary field on the original primary placement of the roadblock to false, and it will automatically set the roadblock's primaryPlacementId field to the ID of this placement. */
  primary?: boolean;
  /** Tag settings for this placement. */
  tagSetting?: TagSetting;
  /** Tag formats to generate for this placement. This field is required on insertion. Acceptable values are: - "PLACEMENT_TAG_STANDARD" - "PLACEMENT_TAG_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_IFRAME_ILAYER" - "PLACEMENT_TAG_INTERNAL_REDIRECT" - "PLACEMENT_TAG_JAVASCRIPT" - "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" - "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" - "PLACEMENT_TAG_CLICK_COMMANDS" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" - "PLACEMENT_TAG_TRACKING" - "PLACEMENT_TAG_TRACKING_IFRAME" - "PLACEMENT_TAG_TRACKING_JAVASCRIPT" */
  tagFormats?: Array<"PLACEMENT_TAG_STANDARD" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_IFRAME_ILAYER" | "PLACEMENT_TAG_INTERNAL_REDIRECT" | "PLACEMENT_TAG_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" | "PLACEMENT_TAG_CLICK_COMMANDS" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" | "PLACEMENT_TAG_TRACKING" | "PLACEMENT_TAG_TRACKING_IFRAME" | "PLACEMENT_TAG_TRACKING_JAVASCRIPT" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" | "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT" | (string & {})>;
  /** ID of the content category assigned to this placement. */
  contentCategoryId?: string;
  /** ID of the placement strategy assigned to this placement. */
  placementStrategyId?: string;
  /** Lookback window settings for this placement. */
  lookbackConfiguration?: LookbackConfiguration;
  /** Comments for this placement. */
  comment?: string;
  /** Third-party placement status. */
  status?: "PENDING_REVIEW" | "PAYMENT_ACCEPTED" | "PAYMENT_REJECTED" | "ACKNOWLEDGE_REJECTION" | "ACKNOWLEDGE_ACCEPTANCE" | "DRAFT" | (string & {});
  /** Information about the last publisher update. This is a read-only field. */
  publisherUpdateInfo?: LastModifiedInfo;
  /** Information about the most recent modification of this placement. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
  /** Whether creatives assigned to this placement must be SSL-compliant. */
  sslRequired?: boolean;
  /** Dimension value for the ID of this placement. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the campaign. This is a read-only, auto-generated field. */
  campaignIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the site. This is a read-only, auto-generated field. */
  siteIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the directory site. This is a read-only, auto-generated field. */
  directorySiteIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the placement group. This is a read-only, auto-generated field. */
  placementGroupIdDimensionValue?: DimensionValue;
  /** External ID for this placement. */
  externalId?: string;
  /** Information about the creation of this placement. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** A collection of settings which affect video creatives served through this placement. Applicable to placements with IN_STREAM_VIDEO compatibility. */
  videoSettings?: VideoSettings;
  /** Whether Verification and ActiveView are disabled for in-stream video creatives for this placement. The same setting videoActiveViewOptOut exists on the site level -- the opt out occurs if either of these settings are true. These settings are distinct from DirectorySites.settings.activeViewOptOut or Sites.siteSettings.activeViewOptOut which only apply to display ads. However, Accounts.activeViewOptOut opts out both video traffic, as well as display ads, from Verification and ActiveView. */
  videoActiveViewOptOut?: boolean;
  /** VPAID adapter setting for this placement. Controls which VPAID format the measurement adapter will use for in-stream video creatives assigned to this placement. *Note:* Flash is no longer supported. This field now defaults to HTML5 when the following values are provided: FLASH, BOTH. */
  vpaidAdapterChoice?: "DEFAULT" | "FLASH" | "HTML5" | "BOTH" | (string & {});
  /** Whether this placement opts out of ad blocking. When true, ad blocking is disabled for this placement. When false, the campaign and site settings take effect. */
  adBlockingOptOut?: boolean;
  /** Additional sizes associated with this placement. When inserting or updating a placement, only the size ID field is used. */
  additionalSizes?: Array<Size>;
  /** Whether this placement opts out of tag wrapping. */
  wrappingOptOut?: boolean;
  /** Measurement partner provided settings for a wrapped placement. */
  partnerWrappingData?: MeasurementPartnerWrappingData;
  /** Whether this placement is active, inactive, archived or permanently archived. */
  activeStatus?: "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED" | (string & {});
  /** Optional. Conversion domain overrides for a placement. */
  conversionDomainOverride?: PlacementConversionDomainOverride;
  /** Optional. Ad serving platform ID to identify the ad serving platform used by the placement. Measurement partners can use this field to add ad-server specific macros. Possible values are: * `1`, Adelphic * `2`, Adform * `3`, Adobe * `4`, Amobee * `5`, Basis (Centro) * `6`, Beeswax * `7`, Amazon * `8`, DV360 (DBM) * `9`, Innovid * `10`, MediaMath * `11`, Roku OneView DSP * `12`, TabMo Hawk * `13`, The Trade Desk * `14`, Xandr Invest DSP * `15`, Yahoo DSP * `16`, Zeta Global * `17`, Scaleout * `18`, Bidtellect * `19`, Unicorn * `20`, Teads * `21`, Quantcast * `22`, Cognitiv * `23`, AdTheorent * `24`, DeepIntent * `25`, Pulsepoint */
  adServingPlatformId?: string;
  /** Optional. Whether the ads in the placement are served by another platform and CM is only used for tracking or they are served by CM. A false value indicates the ad is served by CM. */
  siteServed?: boolean;
  /** Optional. Whether the placement is enabled for YouTube integration. */
  allowOnYoutube?: boolean;
  /** Optional. YouTube settings for the placement. The placement must be enabled for YouTube to use this field. */
  youtubeSettings?: YoutubeSettings;
}

export const Placement: Schema.Schema<Placement> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  siteId: Schema.optional(Schema.String),
  keyName: Schema.optional(Schema.String),
  directorySiteId: Schema.optional(Schema.String),
  paymentSource: Schema.optional(Schema.String),
  compatibility: Schema.optional(Schema.String),
  size: Schema.optional(Size),
  kind: Schema.optional(Schema.String),
  paymentApproved: Schema.optional(Schema.Boolean),
  pricingSchedule: Schema.optional(PricingSchedule),
  placementGroupId: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  tagSetting: Schema.optional(TagSetting),
  tagFormats: Schema.optional(Schema.Array(Schema.String)),
  contentCategoryId: Schema.optional(Schema.String),
  placementStrategyId: Schema.optional(Schema.String),
  lookbackConfiguration: Schema.optional(LookbackConfiguration),
  comment: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  publisherUpdateInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
  sslRequired: Schema.optional(Schema.Boolean),
  idDimensionValue: Schema.optional(DimensionValue),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  campaignIdDimensionValue: Schema.optional(DimensionValue),
  siteIdDimensionValue: Schema.optional(DimensionValue),
  directorySiteIdDimensionValue: Schema.optional(DimensionValue),
  placementGroupIdDimensionValue: Schema.optional(DimensionValue),
  externalId: Schema.optional(Schema.String),
  createInfo: Schema.optional(LastModifiedInfo),
  videoSettings: Schema.optional(VideoSettings),
  videoActiveViewOptOut: Schema.optional(Schema.Boolean),
  vpaidAdapterChoice: Schema.optional(Schema.String),
  adBlockingOptOut: Schema.optional(Schema.Boolean),
  additionalSizes: Schema.optional(Schema.Array(Size)),
  wrappingOptOut: Schema.optional(Schema.Boolean),
  partnerWrappingData: Schema.optional(MeasurementPartnerWrappingData),
  activeStatus: Schema.optional(Schema.String),
  conversionDomainOverride: Schema.optional(PlacementConversionDomainOverride),
  adServingPlatformId: Schema.optional(Schema.String),
  siteServed: Schema.optional(Schema.Boolean),
  allowOnYoutube: Schema.optional(Schema.Boolean),
  youtubeSettings: Schema.optional(YoutubeSettings),
})).annotate({ identifier: "Placement" }) as any as Schema.Schema<Placement>;

export interface PlacementGroup {
  /** ID of this placement group. This is a read-only, auto-generated field. */
  id?: string;
  /** Account ID of this placement group. This is a read-only field that can be left blank. */
  accountId?: string;
  /** Subaccount ID of this placement group. This is a read-only field that can be left blank. */
  subaccountId?: string;
  /** Advertiser ID of this placement group. This is a required field on insertion. */
  advertiserId?: string;
  /** Campaign ID of this placement group. This field is required on insertion. */
  campaignId?: string;
  /** Name of this placement group. This is a required field and must be less than 256 characters long. */
  name?: string;
  /** Site ID associated with this placement group. On insert, you must set either this field or the directorySiteId field to specify the site associated with this placement group. This is a required field that is read-only after insertion. */
  siteId?: string;
  /** Directory site ID associated with this placement group. On insert, you must set either this field or the site_id field to specify the site associated with this placement group. This is a required field that is read-only after insertion. */
  directorySiteId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placementGroup". */
  kind?: string;
  /** Pricing schedule of this placement group. This field is required on insertion. */
  pricingSchedule?: PricingSchedule;
  /** Type of this placement group. A package is a simple group of placements that acts as a single pricing point for a group of tags. A roadblock is a group of placements that not only acts as a single pricing point, but also assumes that all the tags in it will be served at the same time. A roadblock requires one of its assigned placements to be marked as primary for reporting. This field is required on insertion. */
  placementGroupType?: "PLACEMENT_PACKAGE" | "PLACEMENT_ROADBLOCK" | (string & {});
  /** ID of the content category assigned to this placement group. */
  contentCategoryId?: string;
  /** ID of the placement strategy assigned to this placement group. */
  placementStrategyId?: string;
  /** Comments for this placement group. */
  comment?: string;
  /** IDs of placements which are assigned to this placement group. This is a read-only, auto-generated field. */
  childPlacementIds?: Array<string>;
  /** ID of the primary placement, used to calculate the media cost of a roadblock (placement group). Modifying this field will automatically modify the primary field on all affected roadblock child placements. */
  primaryPlacementId?: string;
  /** Information about the most recent modification of this placement group. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
  /** Dimension value for the ID of this placement group. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the advertiser. This is a read-only, auto-generated field. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the campaign. This is a read-only, auto-generated field. */
  campaignIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the site. This is a read-only, auto-generated field. */
  siteIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the directory site. This is a read-only, auto-generated field. */
  directorySiteIdDimensionValue?: DimensionValue;
  /** Dimension value for the ID of the primary placement. This is a read-only, auto-generated field. */
  primaryPlacementIdDimensionValue?: DimensionValue;
  /** External ID for this placement. */
  externalId?: string;
  /** Information about the creation of this placement group. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Whether this placement group is active, inactive, archived or permanently archived. */
  activeStatus?: "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED" | (string & {});
}

export const PlacementGroup: Schema.Schema<PlacementGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  campaignId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  siteId: Schema.optional(Schema.String),
  directorySiteId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  pricingSchedule: Schema.optional(PricingSchedule),
  placementGroupType: Schema.optional(Schema.String),
  contentCategoryId: Schema.optional(Schema.String),
  placementStrategyId: Schema.optional(Schema.String),
  comment: Schema.optional(Schema.String),
  childPlacementIds: Schema.optional(Schema.Array(Schema.String)),
  primaryPlacementId: Schema.optional(Schema.String),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
  idDimensionValue: Schema.optional(DimensionValue),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  campaignIdDimensionValue: Schema.optional(DimensionValue),
  siteIdDimensionValue: Schema.optional(DimensionValue),
  directorySiteIdDimensionValue: Schema.optional(DimensionValue),
  primaryPlacementIdDimensionValue: Schema.optional(DimensionValue),
  externalId: Schema.optional(Schema.String),
  createInfo: Schema.optional(LastModifiedInfo),
  activeStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "PlacementGroup" }) as any as Schema.Schema<PlacementGroup>;

export interface PlacementStrategy {
  /** ID of this placement strategy. This is a read-only, auto-generated field. */
  id?: string;
  /** Name of this placement strategy. This is a required field. It must be less than 256 characters long and unique among placement strategies of the same account. */
  name?: string;
  /** Account ID of this placement strategy.This is a read-only field that can be left blank. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placementStrategy". */
  kind?: string;
}

export const PlacementStrategy: Schema.Schema<PlacementStrategy> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PlacementStrategy" }) as any as Schema.Schema<PlacementStrategy>;

export interface PlacementGroupsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placementGroupsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Placement group collection. */
  placementGroups?: Array<PlacementGroup>;
}

export const PlacementGroupsListResponse: Schema.Schema<PlacementGroupsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  placementGroups: Schema.optional(Schema.Array(PlacementGroup)),
})).annotate({ identifier: "PlacementGroupsListResponse" }) as any as Schema.Schema<PlacementGroupsListResponse>;

export interface TagData {
  /** TagData tag format of this tag. */
  format?: "PLACEMENT_TAG_STANDARD" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_IFRAME_ILAYER" | "PLACEMENT_TAG_INTERNAL_REDIRECT" | "PLACEMENT_TAG_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" | "PLACEMENT_TAG_CLICK_COMMANDS" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" | "PLACEMENT_TAG_TRACKING" | "PLACEMENT_TAG_TRACKING_IFRAME" | "PLACEMENT_TAG_TRACKING_JAVASCRIPT" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" | "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT" | (string & {});
  /** Tag string for serving an ad. */
  impressionTag?: string;
  /** Tag string to record a click. */
  clickTag?: string;
  /** Ad associated with this placement tag. Applicable only when format is PLACEMENT_TAG_TRACKING. */
  adId?: string;
  /** Creative associated with this placement tag. Applicable only when format is PLACEMENT_TAG_TRACKING. */
  creativeId?: string;
}

export const TagData: Schema.Schema<TagData> = Schema.suspend(() => Schema.Struct({
  format: Schema.optional(Schema.String),
  impressionTag: Schema.optional(Schema.String),
  clickTag: Schema.optional(Schema.String),
  adId: Schema.optional(Schema.String),
  creativeId: Schema.optional(Schema.String),
})).annotate({ identifier: "TagData" }) as any as Schema.Schema<TagData>;

export interface PlacementTag {
  /** Placement ID */
  placementId?: string;
  /** Tags generated for this placement. */
  tagDatas?: Array<TagData>;
}

export const PlacementTag: Schema.Schema<PlacementTag> = Schema.suspend(() => Schema.Struct({
  placementId: Schema.optional(Schema.String),
  tagDatas: Schema.optional(Schema.Array(TagData)),
})).annotate({ identifier: "PlacementTag" }) as any as Schema.Schema<PlacementTag>;

export interface PlacementsGenerateTagsResponse {
  /** Set of generated tags for the specified placements. */
  placementTags?: Array<PlacementTag>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placementsGenerateTagsResponse". */
  kind?: string;
}

export const PlacementsGenerateTagsResponse: Schema.Schema<PlacementsGenerateTagsResponse> = Schema.suspend(() => Schema.Struct({
  placementTags: Schema.optional(Schema.Array(PlacementTag)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PlacementsGenerateTagsResponse" }) as any as Schema.Schema<PlacementsGenerateTagsResponse>;

export interface PlacementsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placementsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Placement collection. */
  placements?: Array<Placement>;
}

export const PlacementsListResponse: Schema.Schema<PlacementsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  placements: Schema.optional(Schema.Array(Placement)),
})).annotate({ identifier: "PlacementsListResponse" }) as any as Schema.Schema<PlacementsListResponse>;

export interface PlacementStrategiesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#placementStrategiesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Placement strategy collection. */
  placementStrategies?: Array<PlacementStrategy>;
}

export const PlacementStrategiesListResponse: Schema.Schema<PlacementStrategiesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  placementStrategies: Schema.optional(Schema.Array(PlacementStrategy)),
})).annotate({ identifier: "PlacementStrategiesListResponse" }) as any as Schema.Schema<PlacementStrategiesListResponse>;

export interface PlatformTypesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#platformTypesListResponse". */
  kind?: string;
  /** Platform type collection. */
  platformTypes?: Array<PlatformType>;
}

export const PlatformTypesListResponse: Schema.Schema<PlatformTypesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  platformTypes: Schema.optional(Schema.Array(PlatformType)),
})).annotate({ identifier: "PlatformTypesListResponse" }) as any as Schema.Schema<PlatformTypesListResponse>;

export interface PostalCodesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#postalCodesListResponse". */
  kind?: string;
  /** Postal code collection. */
  postalCodes?: Array<PostalCode>;
}

export const PostalCodesListResponse: Schema.Schema<PostalCodesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  postalCodes: Schema.optional(Schema.Array(PostalCode)),
})).annotate({ identifier: "PostalCodesListResponse" }) as any as Schema.Schema<PostalCodesListResponse>;

export interface RegionsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#regionsListResponse". */
  kind?: string;
  /** Region collection. */
  regions?: Array<Region>;
}

export const RegionsListResponse: Schema.Schema<RegionsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  regions: Schema.optional(Schema.Array(Region)),
})).annotate({ identifier: "RegionsListResponse" }) as any as Schema.Schema<RegionsListResponse>;

export interface RemarketingListsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#remarketingListsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Remarketing list collection. */
  remarketingLists?: Array<RemarketingList>;
}

export const RemarketingListsListResponse: Schema.Schema<RemarketingListsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  remarketingLists: Schema.optional(Schema.Array(RemarketingList)),
})).annotate({ identifier: "RemarketingListsListResponse" }) as any as Schema.Schema<RemarketingListsListResponse>;

export interface TargetableRemarketingList {
  /** Targetable remarketing list ID. */
  id?: string;
  /** Account ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests. */
  accountId?: string;
  /** Subaccount ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests. */
  subaccountId?: string;
  /** Dimension value for the advertiser ID that owns this targetable remarketing list. */
  advertiserId?: string;
  /** Dimension value for the ID of the advertiser. */
  advertiserIdDimensionValue?: DimensionValue;
  /** Name of the targetable remarketing list. Is no greater than 128 characters long. */
  name?: string;
  /** Targetable remarketing list description. */
  description?: string;
  /** Whether this targetable remarketing list is active. */
  active?: boolean;
  /** Number of users currently in the list. This is a read-only field. */
  listSize?: string;
  /** Number of days that a user should remain in the targetable remarketing list without an impression. */
  lifeSpan?: string;
  /** Product from which this targetable remarketing list was originated. */
  listSource?: "REMARKETING_LIST_SOURCE_OTHER" | "REMARKETING_LIST_SOURCE_ADX" | "REMARKETING_LIST_SOURCE_DFP" | "REMARKETING_LIST_SOURCE_XFP" | "REMARKETING_LIST_SOURCE_DFA" | "REMARKETING_LIST_SOURCE_GA" | "REMARKETING_LIST_SOURCE_YOUTUBE" | "REMARKETING_LIST_SOURCE_DBM" | "REMARKETING_LIST_SOURCE_GPLUS" | "REMARKETING_LIST_SOURCE_DMP" | "REMARKETING_LIST_SOURCE_PLAY_STORE" | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#targetableRemarketingList". */
  kind?: string;
}

export const TargetableRemarketingList: Schema.Schema<TargetableRemarketingList> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subaccountId: Schema.optional(Schema.String),
  advertiserId: Schema.optional(Schema.String),
  advertiserIdDimensionValue: Schema.optional(DimensionValue),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  listSize: Schema.optional(Schema.String),
  lifeSpan: Schema.optional(Schema.String),
  listSource: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetableRemarketingList" }) as any as Schema.Schema<TargetableRemarketingList>;

export interface TargetableRemarketingListsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#targetableRemarketingListsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Targetable remarketing list collection. */
  targetableRemarketingLists?: Array<TargetableRemarketingList>;
}

export const TargetableRemarketingListsListResponse: Schema.Schema<TargetableRemarketingListsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  targetableRemarketingLists: Schema.optional(Schema.Array(TargetableRemarketingList)),
})).annotate({ identifier: "TargetableRemarketingListsListResponse" }) as any as Schema.Schema<TargetableRemarketingListsListResponse>;

export interface SortedDimension {
  /** The name of the dimension. */
  name?: string;
  /** An optional sort order for the dimension column. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
  /** The kind of resource this is, in this case dfareporting#sortedDimension. */
  kind?: string;
}

export const SortedDimension: Schema.Schema<SortedDimension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sortOrder: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SortedDimension" }) as any as Schema.Schema<SortedDimension>;

export interface Activities {
  /** List of activity filters. The dimension values need to be all either of type "dfa:activity" or "dfa:activityGroup". */
  filters?: Array<DimensionValue>;
  /** List of names of floodlight activity metrics. */
  metricNames?: Array<string>;
  /** The kind of resource this is, in this case dfareporting#activities. */
  kind?: string;
}

export const Activities: Schema.Schema<Activities> = Schema.suspend(() => Schema.Struct({
  filters: Schema.optional(Schema.Array(DimensionValue)),
  metricNames: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Activities" }) as any as Schema.Schema<Activities>;

export interface CustomRichMediaEvents {
  /** List of custom rich media event IDs. Dimension values must be all of type dfa:richMediaEventTypeIdAndName. */
  filteredEventIds?: Array<DimensionValue>;
  /** The kind of resource this is, in this case dfareporting#customRichMediaEvents. */
  kind?: string;
}

export const CustomRichMediaEvents: Schema.Schema<CustomRichMediaEvents> = Schema.suspend(() => Schema.Struct({
  filteredEventIds: Schema.optional(Schema.Array(DimensionValue)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomRichMediaEvents" }) as any as Schema.Schema<CustomRichMediaEvents>;

export interface Recipient {
  /** The email address of the recipient. */
  email?: string;
  /** The delivery type for the recipient. */
  deliveryType?: "LINK" | "ATTACHMENT" | (string & {});
  /** The kind of resource this is, in this case dfareporting#recipient. */
  kind?: string;
}

export const Recipient: Schema.Schema<Recipient> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  deliveryType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Recipient" }) as any as Schema.Schema<Recipient>;

export interface Report {
  /** The unique ID identifying this report resource. */
  id?: string;
  /** The user profile id of the owner of this report. */
  ownerProfileId?: string;
  /** The account ID to which this report belongs. */
  accountId?: string;
  /** The subaccount ID to which this report belongs if applicable. */
  subAccountId?: string;
  /** The name of the report. */
  name?: string;
  /** The filename used when generating report files for this report. */
  fileName?: string;
  /** The kind of resource this is, in this case dfareporting#report. */
  kind?: string;
  /** The type of the report. */
  type?: "STANDARD" | "REACH" | "PATH_TO_CONVERSION" | "FLOODLIGHT" | "CROSS_MEDIA_REACH" | (string & {});
  /** The eTag of this response for caching purposes. */
  etag?: string;
  /** The timestamp (in milliseconds since epoch) of when this report was last modified. */
  lastModifiedTime?: string;
  /** The output format of the report. If not specified, default format is "CSV". Note that the actual format in the completed report file might differ if for instance the report's size exceeds the format's capabilities. "CSV" will then be the fallback format. */
  format?: "CSV" | "EXCEL" | (string & {});
  /** The report criteria for a report of type "STANDARD". */
  criteria?: { dateRange?: DateRange; dimensions?: Array<SortedDimension>; metricNames?: Array<string>; dimensionFilters?: Array<DimensionValue>; activities?: Activities; customRichMediaEvents?: CustomRichMediaEvents };
  /** The report's schedule. Can only be set if the report's 'dateRange' is a relative date range and the relative date range is not "TODAY". */
  schedule?: { active?: boolean; repeats?: string; repeatsOnWeekDays?: Array<"SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | (string & {})>; every?: number; startDate?: string; expirationDate?: string; runsOnDayOfMonth?: "DAY_OF_MONTH" | "WEEK_OF_MONTH" | (string & {}); timezone?: string };
  /** The report criteria for a report of type "REACH". */
  reachCriteria?: { dateRange?: DateRange; dimensions?: Array<SortedDimension>; metricNames?: Array<string>; dimensionFilters?: Array<DimensionValue>; activities?: Activities; customRichMediaEvents?: CustomRichMediaEvents; reachByFrequencyMetricNames?: Array<string> };
  /** The report criteria for a report of type "PATH_TO_CONVERSION". */
  pathToConversionCriteria?: { dateRange?: DateRange; floodlightConfigId?: DimensionValue; activityFilters?: Array<DimensionValue>; conversionDimensions?: Array<SortedDimension>; perInteractionDimensions?: Array<SortedDimension>; metricNames?: Array<string>; customFloodlightVariables?: Array<SortedDimension>; customRichMediaEvents?: Array<DimensionValue>; reportProperties?: { clicksLookbackWindow?: number; impressionsLookbackWindow?: number; maximumInteractionGap?: number; maximumClickInteractions?: number; maximumImpressionInteractions?: number; pivotOnInteractionPath?: boolean; includeAttributedIPConversions?: boolean; includeUnattributedCookieConversions?: boolean; includeUnattributedIPConversions?: boolean } };
  /** The report criteria for a report of type "FLOODLIGHT". */
  floodlightCriteria?: { dateRange?: DateRange; floodlightConfigId?: DimensionValue; dimensionFilters?: Array<DimensionValue>; dimensions?: Array<SortedDimension>; metricNames?: Array<string>; customRichMediaEvents?: Array<DimensionValue>; reportProperties?: { includeAttributedIPConversions?: boolean; includeUnattributedCookieConversions?: boolean; includeUnattributedIPConversions?: boolean } };
  /** The report's email delivery settings. */
  delivery?: { emailOwner?: boolean; emailOwnerDeliveryType?: "LINK" | "ATTACHMENT" | (string & {}); message?: string; recipients?: Array<Recipient> };
  /** Optional. The report criteria for a report of type "CROSS_MEDIA_REACH". */
  crossMediaReachCriteria?: { dateRange?: DateRange; dimensions?: Array<SortedDimension>; dimensionFilters?: Array<DimensionValue>; metricNames?: Array<string> };
}

export const Report: Schema.Schema<Report> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  ownerProfileId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  subAccountId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  fileName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  criteria: Schema.optional(Schema.Struct({ dateRange: Schema.optional(DateRange), dimensions: Schema.optional(Schema.Array(SortedDimension)), metricNames: Schema.optional(Schema.Array(Schema.String)), dimensionFilters: Schema.optional(Schema.Array(DimensionValue)), activities: Schema.optional(Activities), customRichMediaEvents: Schema.optional(CustomRichMediaEvents) })),
  schedule: Schema.optional(Schema.Struct({ active: Schema.optional(Schema.Boolean), repeats: Schema.optional(Schema.String), repeatsOnWeekDays: Schema.optional(Schema.Array(Schema.String)), every: Schema.optional(Schema.Number), startDate: Schema.optional(Schema.String), expirationDate: Schema.optional(Schema.String), runsOnDayOfMonth: Schema.optional(Schema.String), timezone: Schema.optional(Schema.String) })),
  reachCriteria: Schema.optional(Schema.Struct({ dateRange: Schema.optional(DateRange), dimensions: Schema.optional(Schema.Array(SortedDimension)), metricNames: Schema.optional(Schema.Array(Schema.String)), dimensionFilters: Schema.optional(Schema.Array(DimensionValue)), activities: Schema.optional(Activities), customRichMediaEvents: Schema.optional(CustomRichMediaEvents), reachByFrequencyMetricNames: Schema.optional(Schema.Array(Schema.String)) })),
  pathToConversionCriteria: Schema.optional(Schema.Struct({ dateRange: Schema.optional(DateRange), floodlightConfigId: Schema.optional(DimensionValue), activityFilters: Schema.optional(Schema.Array(DimensionValue)), conversionDimensions: Schema.optional(Schema.Array(SortedDimension)), perInteractionDimensions: Schema.optional(Schema.Array(SortedDimension)), metricNames: Schema.optional(Schema.Array(Schema.String)), customFloodlightVariables: Schema.optional(Schema.Array(SortedDimension)), customRichMediaEvents: Schema.optional(Schema.Array(DimensionValue)), reportProperties: Schema.optional(Schema.Struct({ clicksLookbackWindow: Schema.optional(Schema.Number), impressionsLookbackWindow: Schema.optional(Schema.Number), maximumInteractionGap: Schema.optional(Schema.Number), maximumClickInteractions: Schema.optional(Schema.Number), maximumImpressionInteractions: Schema.optional(Schema.Number), pivotOnInteractionPath: Schema.optional(Schema.Boolean), includeAttributedIPConversions: Schema.optional(Schema.Boolean), includeUnattributedCookieConversions: Schema.optional(Schema.Boolean), includeUnattributedIPConversions: Schema.optional(Schema.Boolean) })) })),
  floodlightCriteria: Schema.optional(Schema.Struct({ dateRange: Schema.optional(DateRange), floodlightConfigId: Schema.optional(DimensionValue), dimensionFilters: Schema.optional(Schema.Array(DimensionValue)), dimensions: Schema.optional(Schema.Array(SortedDimension)), metricNames: Schema.optional(Schema.Array(Schema.String)), customRichMediaEvents: Schema.optional(Schema.Array(DimensionValue)), reportProperties: Schema.optional(Schema.Struct({ includeAttributedIPConversions: Schema.optional(Schema.Boolean), includeUnattributedCookieConversions: Schema.optional(Schema.Boolean), includeUnattributedIPConversions: Schema.optional(Schema.Boolean) })) })),
  delivery: Schema.optional(Schema.Struct({ emailOwner: Schema.optional(Schema.Boolean), emailOwnerDeliveryType: Schema.optional(Schema.String), message: Schema.optional(Schema.String), recipients: Schema.optional(Schema.Array(Recipient)) })),
  crossMediaReachCriteria: Schema.optional(Schema.Struct({ dateRange: Schema.optional(DateRange), dimensions: Schema.optional(Schema.Array(SortedDimension)), dimensionFilters: Schema.optional(Schema.Array(DimensionValue)), metricNames: Schema.optional(Schema.Array(Schema.String)) })),
})).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface ReportList {
  /** The kind of list this is, in this case dfareporting#reportList. */
  kind?: string;
  /** The eTag of this response for caching purposes. */
  etag?: string;
  /** The reports returned in this response. */
  items?: Array<Report>;
  /** Continuation token used to page through reports. To retrieve the next page of results, set the next request's "pageToken" to the value of this field. The page token is only valid for a limited amount of time and should not be persisted. */
  nextPageToken?: string;
}

export const ReportList: Schema.Schema<ReportList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Report)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportList" }) as any as Schema.Schema<ReportList>;

export interface Dimension {
  /** The dimension name, e.g. advertiser */
  name?: string;
  /** The kind of resource this is, in this case dfareporting#dimension. */
  kind?: string;
}

export const Dimension: Schema.Schema<Dimension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Dimension" }) as any as Schema.Schema<Dimension>;

export interface Metric {
  /** The metric name, e.g. impressions */
  name?: string;
  /** The kind of resource this is, in this case dfareporting#metric. */
  kind?: string;
}

export const Metric: Schema.Schema<Metric> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Metric" }) as any as Schema.Schema<Metric>;

export interface ReportCompatibleFields {
  /** Dimensions which are compatible to be selected in the "dimensions" section of the report. */
  dimensions?: Array<Dimension>;
  /** Metrics which are compatible to be selected in the "metricNames" section of the report. */
  metrics?: Array<Metric>;
  /** Dimensions which are compatible to be selected in the "dimensionFilters" section of the report. */
  dimensionFilters?: Array<Dimension>;
  /** Metrics which are compatible to be selected as activity metrics to pivot on in the "activities" section of the report. */
  pivotedActivityMetrics?: Array<Metric>;
  /** The kind of resource this is, in this case dfareporting#reportCompatibleFields. */
  kind?: string;
}

export const ReportCompatibleFields: Schema.Schema<ReportCompatibleFields> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  dimensionFilters: Schema.optional(Schema.Array(Dimension)),
  pivotedActivityMetrics: Schema.optional(Schema.Array(Metric)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportCompatibleFields" }) as any as Schema.Schema<ReportCompatibleFields>;

export interface CrossMediaReachReportCompatibleFields {
  /** Dimensions which are compatible to be selected in the "dimensions" section of the report. */
  dimensions?: Array<Dimension>;
  /** Metrics which are compatible to be selected in the "metricNames" section of the report. */
  metrics?: Array<Metric>;
  /** Dimensions which are compatible to be selected in the "dimensionFilters" section of the report. */
  dimensionFilters?: Array<Dimension>;
  /** The kind of resource this is, in this case dfareporting#crossMediaReachReportCompatibleFields. */
  kind?: string;
}

export const CrossMediaReachReportCompatibleFields: Schema.Schema<CrossMediaReachReportCompatibleFields> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  dimensionFilters: Schema.optional(Schema.Array(Dimension)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CrossMediaReachReportCompatibleFields" }) as any as Schema.Schema<CrossMediaReachReportCompatibleFields>;

export interface ReachReportCompatibleFields {
  /** Dimensions which are compatible to be selected in the "dimensions" section of the report. */
  dimensions?: Array<Dimension>;
  /** Metrics which are compatible to be selected in the "metricNames" section of the report. */
  metrics?: Array<Metric>;
  /** Metrics which are compatible to be selected in the "reachByFrequencyMetricNames" section of the report. */
  reachByFrequencyMetrics?: Array<Metric>;
  /** Dimensions which are compatible to be selected in the "dimensionFilters" section of the report. */
  dimensionFilters?: Array<Dimension>;
  /** Metrics which are compatible to be selected as activity metrics to pivot on in the "activities" section of the report. */
  pivotedActivityMetrics?: Array<Metric>;
  /** The kind of resource this is, in this case dfareporting#reachReportCompatibleFields. */
  kind?: string;
}

export const ReachReportCompatibleFields: Schema.Schema<ReachReportCompatibleFields> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  reachByFrequencyMetrics: Schema.optional(Schema.Array(Metric)),
  dimensionFilters: Schema.optional(Schema.Array(Dimension)),
  pivotedActivityMetrics: Schema.optional(Schema.Array(Metric)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ReachReportCompatibleFields" }) as any as Schema.Schema<ReachReportCompatibleFields>;

export interface PathToConversionReportCompatibleFields {
  /** Conversion dimensions which are compatible to be selected in the "conversionDimensions" section of the report. */
  conversionDimensions?: Array<Dimension>;
  /** Per-interaction dimensions which are compatible to be selected in the "perInteractionDimensions" section of the report. */
  perInteractionDimensions?: Array<Dimension>;
  /** Metrics which are compatible to be selected in the "metricNames" section of the report. */
  metrics?: Array<Metric>;
  /** Custom floodlight variables which are compatible to be selected in the "customFloodlightVariables" section of the report. */
  customFloodlightVariables?: Array<Dimension>;
  /** The kind of resource this is, in this case dfareporting#pathToConversionReportCompatibleFields. */
  kind?: string;
}

export const PathToConversionReportCompatibleFields: Schema.Schema<PathToConversionReportCompatibleFields> = Schema.suspend(() => Schema.Struct({
  conversionDimensions: Schema.optional(Schema.Array(Dimension)),
  perInteractionDimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  customFloodlightVariables: Schema.optional(Schema.Array(Dimension)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PathToConversionReportCompatibleFields" }) as any as Schema.Schema<PathToConversionReportCompatibleFields>;

export interface CrossDimensionReachReportCompatibleFields {
  /** Dimensions which are compatible to be selected in the "dimensionFilters" section of the report. */
  dimensionFilters?: Array<Dimension>;
  /** Dimensions which are compatible to be selected in the "breakdown" section of the report. */
  breakdown?: Array<Dimension>;
  /** Metrics which are compatible to be selected in the "metricNames" section of the report. */
  metrics?: Array<Metric>;
  /** Metrics which are compatible to be selected in the "overlapMetricNames" section of the report. */
  overlapMetrics?: Array<Metric>;
  /** The kind of resource this is, in this case dfareporting#crossDimensionReachReportCompatibleFields. */
  kind?: string;
}

export const CrossDimensionReachReportCompatibleFields: Schema.Schema<CrossDimensionReachReportCompatibleFields> = Schema.suspend(() => Schema.Struct({
  dimensionFilters: Schema.optional(Schema.Array(Dimension)),
  breakdown: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  overlapMetrics: Schema.optional(Schema.Array(Metric)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CrossDimensionReachReportCompatibleFields" }) as any as Schema.Schema<CrossDimensionReachReportCompatibleFields>;

export interface FloodlightReportCompatibleFields {
  /** Dimensions which are compatible to be selected in the "dimensionFilters" section of the report. */
  dimensionFilters?: Array<Dimension>;
  /** Dimensions which are compatible to be selected in the "dimensions" section of the report. */
  dimensions?: Array<Dimension>;
  /** Metrics which are compatible to be selected in the "metricNames" section of the report. */
  metrics?: Array<Metric>;
  /** The kind of resource this is, in this case dfareporting#floodlightReportCompatibleFields. */
  kind?: string;
}

export const FloodlightReportCompatibleFields: Schema.Schema<FloodlightReportCompatibleFields> = Schema.suspend(() => Schema.Struct({
  dimensionFilters: Schema.optional(Schema.Array(Dimension)),
  dimensions: Schema.optional(Schema.Array(Dimension)),
  metrics: Schema.optional(Schema.Array(Metric)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "FloodlightReportCompatibleFields" }) as any as Schema.Schema<FloodlightReportCompatibleFields>;

export interface CompatibleFields {
  /** Contains items that are compatible to be selected for a report of type "STANDARD". */
  reportCompatibleFields?: ReportCompatibleFields;
  /** Contains items that are compatible to be selected for a report of type "CROSS_MEDIA_REACH". */
  crossMediaReachReportCompatibleFields?: CrossMediaReachReportCompatibleFields;
  /** Contains items that are compatible to be selected for a report of type "REACH". */
  reachReportCompatibleFields?: ReachReportCompatibleFields;
  /** Contains items that are compatible to be selected for a report of type "PATH_TO_CONVERSION". */
  pathToConversionReportCompatibleFields?: PathToConversionReportCompatibleFields;
  /** Contains items that are compatible to be selected for a report of type "CROSS_DIMENSION_REACH". */
  crossDimensionReachReportCompatibleFields?: CrossDimensionReachReportCompatibleFields;
  /** Contains items that are compatible to be selected for a report of type "FLOODLIGHT". */
  floodlightReportCompatibleFields?: FloodlightReportCompatibleFields;
  /** The kind of resource this is, in this case dfareporting#compatibleFields. */
  kind?: string;
}

export const CompatibleFields: Schema.Schema<CompatibleFields> = Schema.suspend(() => Schema.Struct({
  reportCompatibleFields: Schema.optional(ReportCompatibleFields),
  crossMediaReachReportCompatibleFields: Schema.optional(CrossMediaReachReportCompatibleFields),
  reachReportCompatibleFields: Schema.optional(ReachReportCompatibleFields),
  pathToConversionReportCompatibleFields: Schema.optional(PathToConversionReportCompatibleFields),
  crossDimensionReachReportCompatibleFields: Schema.optional(CrossDimensionReachReportCompatibleFields),
  floodlightReportCompatibleFields: Schema.optional(FloodlightReportCompatibleFields),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "CompatibleFields" }) as any as Schema.Schema<CompatibleFields>;

export interface SitesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#sitesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Site collection. */
  sites?: Array<Site>;
}

export const SitesListResponse: Schema.Schema<SitesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  sites: Schema.optional(Schema.Array(Site)),
})).annotate({ identifier: "SitesListResponse" }) as any as Schema.Schema<SitesListResponse>;

export interface SizesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#sizesListResponse". */
  kind?: string;
  /** Size collection. */
  sizes?: Array<Size>;
}

export const SizesListResponse: Schema.Schema<SizesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  sizes: Schema.optional(Schema.Array(Size)),
})).annotate({ identifier: "SizesListResponse" }) as any as Schema.Schema<SizesListResponse>;

export interface DfareportingStudioCreativeAssetsInsertRequest {
  /** Required. Studio advertiser ID of the studio creative asset. It is a required field on insertion. */
  studioAdvertiserId?: string;
  /** Optional. Studio account ID of the studio creative asset. It is a optional. */
  studioAccountId?: string;
  /** Optional. Studio creative ID of the studio creative asset. It is a optional field. If it is set, the asset will be associated to the creative. */
  studioCreativeId?: string;
}

export const DfareportingStudioCreativeAssetsInsertRequest: Schema.Schema<DfareportingStudioCreativeAssetsInsertRequest> = Schema.suspend(() => Schema.Struct({
  studioAdvertiserId: Schema.optional(Schema.String),
  studioAccountId: Schema.optional(Schema.String),
  studioCreativeId: Schema.optional(Schema.String),
})).annotate({ identifier: "DfareportingStudioCreativeAssetsInsertRequest" }) as any as Schema.Schema<DfareportingStudioCreativeAssetsInsertRequest>;

export interface VideoProcessingData {
  /** Output only. The processing state of the studio creative asset. */
  processingState?: "UNKNOWN" | "PROCESSING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** For a FAILED processing state, the error reason discovered. */
  errorReason?: string;
}

export const VideoProcessingData: Schema.Schema<VideoProcessingData> = Schema.suspend(() => Schema.Struct({
  processingState: Schema.optional(Schema.String),
  errorReason: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoProcessingData" }) as any as Schema.Schema<VideoProcessingData>;

export interface StudioCreativeAsset {
  /** Output only. Unique ID of this studio creative asset. This is a read-only, auto-generated field. */
  id?: string;
  /** Studio account ID of this studio creative asset. This field, if left unset, will be auto-populated.. */
  studioAccountId?: string;
  /** Studio advertiser ID of this studio creative asset. This is a required field on insertion. */
  studioAdvertiserId?: string;
  /** Studio creative ID of this studio creative asset. The asset will be associated to the creative if creative id is set. */
  studioCreativeId?: string;
  /** The type of the studio creative asset. It is a auto-generated, read-only field. */
  type?: "UNKNOWN_TYPE" | "HTML" | "VIDEO" | "IMAGE" | "FONT" | (string & {});
  /** The filename of the studio creative asset. It is default to the original filename of the asset. */
  filename?: string;
  /** The filesize of the studio creative asset. This is a read-only field. */
  filesize?: string;
  /** The processing data of the studio creative asset. This is a read-only field. */
  videoProcessingData?: VideoProcessingData;
  /** Output only. The creation timestamp of the studio creative asset. This is a read-only field. */
  createInfo?: LastModifiedInfo;
  /** Output only. The last modified timestamp of the studio creative asset. This is a read-only field. */
  lastModifiedInfo?: LastModifiedInfo;
}

export const StudioCreativeAsset: Schema.Schema<StudioCreativeAsset> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  studioAccountId: Schema.optional(Schema.String),
  studioAdvertiserId: Schema.optional(Schema.String),
  studioCreativeId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  filename: Schema.optional(Schema.String),
  filesize: Schema.optional(Schema.String),
  videoProcessingData: Schema.optional(VideoProcessingData),
  createInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
})).annotate({ identifier: "StudioCreativeAsset" }) as any as Schema.Schema<StudioCreativeAsset>;

export interface StudioCreativeAssetsResponse {
  /** The list of studio creative assets. */
  assets?: Array<StudioCreativeAsset>;
}

export const StudioCreativeAssetsResponse: Schema.Schema<StudioCreativeAssetsResponse> = Schema.suspend(() => Schema.Struct({
  assets: Schema.optional(Schema.Array(StudioCreativeAsset)),
})).annotate({ identifier: "StudioCreativeAssetsResponse" }) as any as Schema.Schema<StudioCreativeAssetsResponse>;

export interface StudioCreativeDimension {
  /** Width of the studio creative. */
  width?: number;
  /** Height of the studio creative. */
  height?: number;
}

export const StudioCreativeDimension: Schema.Schema<StudioCreativeDimension> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "StudioCreativeDimension" }) as any as Schema.Schema<StudioCreativeDimension>;

export interface StudioCreative {
  /** Output only. Unique ID of this studio creative. This is a read-only, auto-generated field. */
  id?: string;
  /** Studio account ID of this creative. This field, if left unset, will be auto-populated. */
  studioAccountId?: string;
  /** Studio advertiser ID of this studio creative. This is a required field on insertion. */
  studioAdvertiserId?: string;
  /** Studio campaign ID of this studio creative. This is a required field on insertion. */
  studioCampaignId?: string;
  /** Identifier. Name of this studio creative. This is a required field on insertion. */
  name?: string;
  /** Format of this studio creative. This is a required field on insertion. */
  format?: "UNKNOWN" | "BANNER" | "EXPANDING" | "INTERSTITIAL" | "VPAID_LINEAR_VIDEO" | (string & {});
  /** Dimension of this studio creative. This is a required field on insertion if format is BANNER or EXPANDING. */
  dimension?: StudioCreativeDimension;
  /** Output only. Status of this studio creative. It is a read-only field. */
  status?: "UNKNOWN_STATUS" | "IN_DEVELOPMENT" | "PUBLISHED" | "QA_REJECTED" | "QA_APPROVED" | "TRAFFICKED" | (string & {});
  /** Dynamic profile ID of this studio creative. */
  dynamicProfileId?: string;
  /** Backup image asset ID of this studio creative. It is a required field on insertion. */
  backupImageAssetId?: string;
  /** List of assets associated with this studio creative. It is a required field on insertion. */
  assetIds?: Array<string>;
  /** The timestamp when the studio creative was created. This is a read-only, auto-generated field. */
  createdInfo?: LastModifiedInfo;
  /** The timestamp when the studio creative was last modified. This is a read-only, auto-generated field. */
  lastModifiedInfo?: LastModifiedInfo;
}

export const StudioCreative: Schema.Schema<StudioCreative> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  studioAccountId: Schema.optional(Schema.String),
  studioAdvertiserId: Schema.optional(Schema.String),
  studioCampaignId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  dimension: Schema.optional(StudioCreativeDimension),
  status: Schema.optional(Schema.String),
  dynamicProfileId: Schema.optional(Schema.String),
  backupImageAssetId: Schema.optional(Schema.String),
  assetIds: Schema.optional(Schema.Array(Schema.String)),
  createdInfo: Schema.optional(LastModifiedInfo),
  lastModifiedInfo: Schema.optional(LastModifiedInfo),
})).annotate({ identifier: "StudioCreative" }) as any as Schema.Schema<StudioCreative>;

export interface SubaccountsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#subaccountsListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Subaccount collection. */
  subaccounts?: Array<Subaccount>;
}

export const SubaccountsListResponse: Schema.Schema<SubaccountsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  subaccounts: Schema.optional(Schema.Array(Subaccount)),
})).annotate({ identifier: "SubaccountsListResponse" }) as any as Schema.Schema<SubaccountsListResponse>;

export interface TargetingTemplatesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#targetingTemplatesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** Targeting template collection. */
  targetingTemplates?: Array<TargetingTemplate>;
}

export const TargetingTemplatesListResponse: Schema.Schema<TargetingTemplatesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  targetingTemplates: Schema.optional(Schema.Array(TargetingTemplate)),
})).annotate({ identifier: "TargetingTemplatesListResponse" }) as any as Schema.Schema<TargetingTemplatesListResponse>;

export interface TvCampaignTimepoint {
  /** The start date of the timepoint. A string in the format of "yyyy-MM-dd". */
  startDate?: string;
  /** The date window of the timepoint. */
  dateWindow?: "WEEKS_UNSPECIFIED" | "WEEKS_ONE" | "WEEKS_FOUR" | "WEEKS_EIGHT" | "WEEKS_TWELVE" | (string & {});
  /** The spend within the time range of the timepoint. */
  spend?: number;
}

export const TvCampaignTimepoint: Schema.Schema<TvCampaignTimepoint> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Schema.String),
  dateWindow: Schema.optional(Schema.String),
  spend: Schema.optional(Schema.Number),
})).annotate({ identifier: "TvCampaignTimepoint" }) as any as Schema.Schema<TvCampaignTimepoint>;

export interface TvCampaignDetail {
  /** ID of this TV campaign. */
  id?: string;
  /** The timepoints of the TV campaign. */
  timepoints?: Array<TvCampaignTimepoint>;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#tvCampaignSummary". */
  kind?: string;
}

export const TvCampaignDetail: Schema.Schema<TvCampaignDetail> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  timepoints: Schema.optional(Schema.Array(TvCampaignTimepoint)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "TvCampaignDetail" }) as any as Schema.Schema<TvCampaignDetail>;

export interface TvCampaignSummary {
  /** ID of this TV campaign. */
  id?: string;
  /** Identifier. Name of this TV campaign. */
  name?: string;
  /** "CampaignComponentType" of this TV campaign. */
  type?: "CAMPAIGN_COMPONENT_TYPE_UNSPECIFIED" | "COMPANY" | "BRAND" | "PRODUCT" | "CAMPAIGN" | (string & {});
  /** Spend across the entire TV campaign. */
  spend?: number;
  /** Impressions across the entire TV campaign. */
  impressions?: string;
  /** GRP of this TV campaign. */
  grp?: string;
  /** The start date of the TV campaign, inclusive. A string of the format: "yyyy-MM-dd". */
  startDate?: string;
  /** The end date of the TV campaign, inclusive. A string of the format: "yyyy-MM-dd". */
  endDate?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#tvCampaignSummary". */
  kind?: string;
}

export const TvCampaignSummary: Schema.Schema<TvCampaignSummary> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  spend: Schema.optional(Schema.Number),
  impressions: Schema.optional(Schema.String),
  grp: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "TvCampaignSummary" }) as any as Schema.Schema<TvCampaignSummary>;

export interface TvCampaignSummariesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#tvCampaignSummariesListResponse". */
  kind?: string;
  /** List of TV campaign summaries. */
  tvCampaignSummaries?: Array<TvCampaignSummary>;
}

export const TvCampaignSummariesListResponse: Schema.Schema<TvCampaignSummariesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  tvCampaignSummaries: Schema.optional(Schema.Array(TvCampaignSummary)),
})).annotate({ identifier: "TvCampaignSummariesListResponse" }) as any as Schema.Schema<TvCampaignSummariesListResponse>;

export interface UserProfile {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userProfile". */
  kind?: string;
  /** The unique ID of the user profile. */
  profileId?: string;
  /** The user name. */
  userName?: string;
  /** The account ID to which this profile belongs. */
  accountId?: string;
  /** The account name this profile belongs to. */
  accountName?: string;
  /** The sub account ID this profile belongs to if applicable. */
  subAccountId?: string;
  /** The sub account name this profile belongs to if applicable. */
  subAccountName?: string;
  /** Etag of this resource. */
  etag?: string;
}

export const UserProfile: Schema.Schema<UserProfile> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  profileId: Schema.optional(Schema.String),
  userName: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  accountName: Schema.optional(Schema.String),
  subAccountId: Schema.optional(Schema.String),
  subAccountName: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "UserProfile" }) as any as Schema.Schema<UserProfile>;

export interface UserProfileList {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userProfileList". */
  kind?: string;
  /** Etag of this resource. */
  etag?: string;
  /** The user profiles returned in this response. */
  items?: Array<UserProfile>;
}

export const UserProfileList: Schema.Schema<UserProfileList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(UserProfile)),
})).annotate({ identifier: "UserProfileList" }) as any as Schema.Schema<UserProfileList>;

export interface UserRolePermissionGroup {
  /** ID of this user role permission. */
  id?: string;
  /** Name of this user role permission group. */
  name?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userRolePermissionGroup". */
  kind?: string;
}

export const UserRolePermissionGroup: Schema.Schema<UserRolePermissionGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRolePermissionGroup" }) as any as Schema.Schema<UserRolePermissionGroup>;

export interface UserRolePermissionGroupsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userRolePermissionGroupsListResponse". */
  kind?: string;
  /** User role permission group collection. */
  userRolePermissionGroups?: Array<UserRolePermissionGroup>;
}

export const UserRolePermissionGroupsListResponse: Schema.Schema<UserRolePermissionGroupsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  userRolePermissionGroups: Schema.optional(Schema.Array(UserRolePermissionGroup)),
})).annotate({ identifier: "UserRolePermissionGroupsListResponse" }) as any as Schema.Schema<UserRolePermissionGroupsListResponse>;

export interface UserRolePermissionsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userRolePermissionsListResponse". */
  kind?: string;
  /** User role permission collection. */
  userRolePermissions?: Array<UserRolePermission>;
}

export const UserRolePermissionsListResponse: Schema.Schema<UserRolePermissionsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  userRolePermissions: Schema.optional(Schema.Array(UserRolePermission)),
})).annotate({ identifier: "UserRolePermissionsListResponse" }) as any as Schema.Schema<UserRolePermissionsListResponse>;

export interface UserRolesListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#userRolesListResponse". */
  kind?: string;
  /** Pagination token to be used for the next list operation. */
  nextPageToken?: string;
  /** User role collection. */
  userRoles?: Array<UserRole>;
}

export const UserRolesListResponse: Schema.Schema<UserRolesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  userRoles: Schema.optional(Schema.Array(UserRole)),
})).annotate({ identifier: "UserRolesListResponse" }) as any as Schema.Schema<UserRolesListResponse>;

export interface VideoFormat {
  /** ID of the video format. */
  id?: number;
  /** File type of the video format. */
  fileType?: "FLV" | "THREEGPP" | "MP4" | "WEBM" | "M3U8" | (string & {});
  /** The target bit rate of this video format. */
  targetBitRate?: number;
  /** The resolution of this video format. */
  resolution?: Size;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#videoFormat". */
  kind?: string;
}

export const VideoFormat: Schema.Schema<VideoFormat> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.Number),
  fileType: Schema.optional(Schema.String),
  targetBitRate: Schema.optional(Schema.Number),
  resolution: Schema.optional(Size),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "VideoFormat" }) as any as Schema.Schema<VideoFormat>;

export interface VideoFormatsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#videoFormatsListResponse". */
  kind?: string;
  /** Video format collection. */
  videoFormats?: Array<VideoFormat>;
}

export const VideoFormatsListResponse: Schema.Schema<VideoFormatsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  videoFormats: Schema.optional(Schema.Array(VideoFormat)),
})).annotate({ identifier: "VideoFormatsListResponse" }) as any as Schema.Schema<VideoFormatsListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets one account permission group by ID. */
export interface GetAccountPermissionGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Account permission group ID. */
  id: string;
}

export const GetAccountPermissionGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accountPermissionGroups/{accountPermissionGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountPermissionGroupsRequest>;

export type GetAccountPermissionGroupsResponse = AccountPermissionGroup;
export const GetAccountPermissionGroupsResponse = AccountPermissionGroup;

export type GetAccountPermissionGroupsError = CommonErrors;

export const getAccountPermissionGroups: API.OperationMethod<GetAccountPermissionGroupsRequest, GetAccountPermissionGroupsResponse, GetAccountPermissionGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountPermissionGroupsRequest,
  output: GetAccountPermissionGroupsResponse,
  errors: [],
}));

/** Retrieves the list of account permission groups. */
export interface ListAccountPermissionGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListAccountPermissionGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accountPermissionGroups" }),
  svc,
) as unknown as Schema.Schema<ListAccountPermissionGroupsRequest>;

export type ListAccountPermissionGroupsResponse = AccountPermissionGroupsListResponse;
export const ListAccountPermissionGroupsResponse = AccountPermissionGroupsListResponse;

export type ListAccountPermissionGroupsError = CommonErrors;

export const listAccountPermissionGroups: API.OperationMethod<ListAccountPermissionGroupsRequest, ListAccountPermissionGroupsResponse, ListAccountPermissionGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccountPermissionGroupsRequest,
  output: ListAccountPermissionGroupsResponse,
  errors: [],
}));

/** Gets one account permission by ID. */
export interface GetAccountPermissionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Account permission ID. */
  id: string;
}

export const GetAccountPermissionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accountPermissions/{accountPermissionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountPermissionsRequest>;

export type GetAccountPermissionsResponse = AccountPermission;
export const GetAccountPermissionsResponse = AccountPermission;

export type GetAccountPermissionsError = CommonErrors;

export const getAccountPermissions: API.OperationMethod<GetAccountPermissionsRequest, GetAccountPermissionsResponse, GetAccountPermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountPermissionsRequest,
  output: GetAccountPermissionsResponse,
  errors: [],
}));

/** Retrieves the list of account permissions. */
export interface ListAccountPermissionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListAccountPermissionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accountPermissions" }),
  svc,
) as unknown as Schema.Schema<ListAccountPermissionsRequest>;

export type ListAccountPermissionsResponse = AccountPermissionsListResponse;
export const ListAccountPermissionsResponse = AccountPermissionsListResponse;

export type ListAccountPermissionsError = CommonErrors;

export const listAccountPermissions: API.OperationMethod<ListAccountPermissionsRequest, ListAccountPermissionsResponse, ListAccountPermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccountPermissionsRequest,
  output: ListAccountPermissionsResponse,
  errors: [],
}));

/** Gets one account by ID. */
export interface GetAccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Account ID. */
  id: string;
}

export const GetAccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Retrieves the list of accounts, possibly filtered. This method supports paging. */
export interface ListAccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only accounts with these IDs. */
  ids?: string[];
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "account*2015" will return objects with names like "account June 2015", "account April 2015", or simply "account 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "account" will match objects with name "my account", "account 2015", or simply "account". */
  searchString?: string;
  /** Select only active accounts. Don't set this field to select both active and non-active accounts. */
  active?: boolean;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListAccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = AccountsListResponse;
export const ListAccountsResponse = AccountsListResponse;

export type ListAccountsError = CommonErrors;

export const listAccounts = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing account. */
export interface UpdateAccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Account;
}

export const UpdateAccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsRequest>;

export type UpdateAccountsResponse = Account;
export const UpdateAccountsResponse = Account;

export type UpdateAccountsError = CommonErrors;

export const updateAccounts: API.OperationMethod<UpdateAccountsRequest, UpdateAccountsResponse, UpdateAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsRequest,
  output: UpdateAccountsResponse,
  errors: [],
}));

/** Updates an existing account. This method supports patch semantics. */
export interface PatchAccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Account ID. */
  id: string;
  /** Request body */
  body?: Account;
}

export const PatchAccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRequest>;

export type PatchAccountsResponse = Account;
export const PatchAccountsResponse = Account;

export type PatchAccountsError = CommonErrors;

export const patchAccounts: API.OperationMethod<PatchAccountsRequest, PatchAccountsResponse, PatchAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsRequest,
  output: PatchAccountsResponse,
  errors: [],
}));

/** Gets the account's active ad summary by account ID. */
export interface GetAccountActiveAdSummariesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Account ID. */
  summaryAccountId: string;
}

export const GetAccountActiveAdSummariesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  summaryAccountId: Schema.String.pipe(T.HttpPath("summaryAccountId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accountActiveAdSummaries/{accountActiveAdSummariesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountActiveAdSummariesRequest>;

export type GetAccountActiveAdSummariesResponse = AccountActiveAdSummary;
export const GetAccountActiveAdSummariesResponse = AccountActiveAdSummary;

export type GetAccountActiveAdSummariesError = CommonErrors;

export const getAccountActiveAdSummaries: API.OperationMethod<GetAccountActiveAdSummariesRequest, GetAccountActiveAdSummariesResponse, GetAccountActiveAdSummariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountActiveAdSummariesRequest,
  output: GetAccountActiveAdSummariesResponse,
  errors: [],
}));

/** Gets one account user profile by ID. */
export interface GetAccountUserProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** User profile ID. */
  id: string;
}

export const GetAccountUserProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}/accountUserProfiles/{accountUserProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountUserProfilesRequest>;

export type GetAccountUserProfilesResponse = AccountUserProfile;
export const GetAccountUserProfilesResponse = AccountUserProfile;

export type GetAccountUserProfilesError = CommonErrors;

export const getAccountUserProfiles: API.OperationMethod<GetAccountUserProfilesRequest, GetAccountUserProfilesResponse, GetAccountUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountUserProfilesRequest,
  output: GetAccountUserProfilesResponse,
  errors: [],
}));

/** Inserts a new account user profile. */
export interface InsertAccountUserProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: AccountUserProfile;
}

export const InsertAccountUserProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(AccountUserProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/accountUserProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAccountUserProfilesRequest>;

export type InsertAccountUserProfilesResponse = AccountUserProfile;
export const InsertAccountUserProfilesResponse = AccountUserProfile;

export type InsertAccountUserProfilesError = CommonErrors;

export const insertAccountUserProfiles: API.OperationMethod<InsertAccountUserProfilesRequest, InsertAccountUserProfilesResponse, InsertAccountUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAccountUserProfilesRequest,
  output: InsertAccountUserProfilesResponse,
  errors: [],
}));

/** Retrieves a list of account user profiles, possibly filtered. This method supports paging. */
export interface ListAccountUserProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only user profiles with these IDs. */
  ids?: string[];
  /** Select only user profiles with the specified user role ID. */
  userRoleId?: string;
  /** Select only user profiles with the specified subaccount ID. */
  subaccountId?: string;
  /** Select only active user profiles. */
  active?: boolean;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name, ID or email. Wildcards (*) are allowed. For example, "user profile*2015" will return objects with names like "user profile June 2015", "user profile April 2015", or simply "user profile 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "user profile" will match objects with name "my user profile", "user profile 2015", or simply "user profile". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListAccountUserProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  userRoleId: Schema.optional(Schema.String).pipe(T.HttpQuery("userRoleId")),
  subaccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("subaccountId")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/accountUserProfiles" }),
  svc,
) as unknown as Schema.Schema<ListAccountUserProfilesRequest>;

export type ListAccountUserProfilesResponse = AccountUserProfilesListResponse;
export const ListAccountUserProfilesResponse = AccountUserProfilesListResponse;

export type ListAccountUserProfilesError = CommonErrors;

export const listAccountUserProfiles = API.makePaginated(() => ({
  input: ListAccountUserProfilesRequest,
  output: ListAccountUserProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing account user profile. */
export interface UpdateAccountUserProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: AccountUserProfile;
}

export const UpdateAccountUserProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(AccountUserProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/accountUserProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountUserProfilesRequest>;

export type UpdateAccountUserProfilesResponse = AccountUserProfile;
export const UpdateAccountUserProfilesResponse = AccountUserProfile;

export type UpdateAccountUserProfilesError = CommonErrors;

export const updateAccountUserProfiles: API.OperationMethod<UpdateAccountUserProfilesRequest, UpdateAccountUserProfilesResponse, UpdateAccountUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountUserProfilesRequest,
  output: UpdateAccountUserProfilesResponse,
  errors: [],
}));

/** Updates an existing account user profile. This method supports patch semantics. */
export interface PatchAccountUserProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. AccountUserProfile ID. */
  id: string;
  /** Request body */
  body?: AccountUserProfile;
}

export const PatchAccountUserProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(AccountUserProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/accountUserProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountUserProfilesRequest>;

export type PatchAccountUserProfilesResponse = AccountUserProfile;
export const PatchAccountUserProfilesResponse = AccountUserProfile;

export type PatchAccountUserProfilesError = CommonErrors;

export const patchAccountUserProfiles: API.OperationMethod<PatchAccountUserProfilesRequest, PatchAccountUserProfilesResponse, PatchAccountUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountUserProfilesRequest,
  output: PatchAccountUserProfilesResponse,
  errors: [],
}));

/** Gets one ad by ID. */
export interface GetAdsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Ad ID. */
  id: string;
}

export const GetAdsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/ads/{adsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdsRequest>;

export type GetAdsResponse = Ad;
export const GetAdsResponse = Ad;

export type GetAdsError = CommonErrors;

export const getAds: API.OperationMethod<GetAdsRequest, GetAdsResponse, GetAdsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdsRequest,
  output: GetAdsResponse,
  errors: [],
}));

/** Inserts a new ad. */
export interface InsertAdsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Ad;
}

export const InsertAdsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Ad).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/ads", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAdsRequest>;

export type InsertAdsResponse = Ad;
export const InsertAdsResponse = Ad;

export type InsertAdsError = CommonErrors;

export const insertAds: API.OperationMethod<InsertAdsRequest, InsertAdsResponse, InsertAdsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAdsRequest,
  output: InsertAdsResponse,
  errors: [],
}));

/** Retrieves a list of ads, possibly filtered. This method supports paging. */
export interface ListAdsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only ads with these IDs. */
  ids?: string[];
  /** Select only active ads. */
  active?: boolean;
  /** Select only archived ads. */
  archived?: boolean;
  /** Select only ads with these campaign IDs. */
  campaignIds?: string[];
  /** Select only ads with this advertiser ID. */
  advertiserId?: string;
  /** Select only ads with these types. */
  type?: "AD_SERVING_STANDARD_AD" | "AD_SERVING_DEFAULT_AD" | "AD_SERVING_CLICK_TRACKER" | "AD_SERVING_TRACKING" | "AD_SERVING_BRAND_SAFE_AD" | (string & {})[];
  /** Select only dynamic click trackers. Applicable when type is AD_SERVING_CLICK_TRACKER. If true, select dynamic click trackers. If false, select static click trackers. Leave unset to select both. */
  dynamicClickTracker?: boolean;
  /** Select default ads with the specified compatibility. Applicable when type is AD_SERVING_DEFAULT_AD. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on mobile devices for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are for rendering in mobile apps. IN_STREAM_VIDEO refers to rendering an in-stream video ads developed with the VAST standard. */
  compatibility?: "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO" | (string & {});
  /** Select only ads with these size IDs. */
  sizeIds?: string[];
  /** Select only ads with these landing page IDs. */
  landingPageIds?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only ads with these creative IDs assigned. */
  creativeIds?: string[];
  /** Select only ads with these placement IDs assigned. */
  placementIds?: string[];
  /** Select only ads whose list targeting expression use these remarketing list IDs. */
  remarketingListIds?: string[];
  /** Select only ads with these audience segment IDs. */
  audienceSegmentIds?: string[];
  /** Select only ads with this event tag override ID. */
  overriddenEventTagId?: string;
  /** Select only ads that require SSL. */
  sslRequired?: boolean;
  /** Select only ads that are SSL-compliant. */
  sslCompliant?: boolean;
  /** Select only ads with these creative optimization configuration IDs. */
  creativeOptimizationConfigurationIds?: string[];
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "ad*2015" will return objects with names like "ad June 2015", "ad April 2015", or simply "ad 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "ad" will match objects with name "my ad", "ad 2015", or simply "ad". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListAdsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  archived: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("archived")),
  campaignIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("campaignIds")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  type: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("type")),
  dynamicClickTracker: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dynamicClickTracker")),
  compatibility: Schema.optional(Schema.String).pipe(T.HttpQuery("compatibility")),
  sizeIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sizeIds")),
  landingPageIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("landingPageIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  creativeIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("creativeIds")),
  placementIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("placementIds")),
  remarketingListIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("remarketingListIds")),
  audienceSegmentIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("audienceSegmentIds")),
  overriddenEventTagId: Schema.optional(Schema.String).pipe(T.HttpQuery("overriddenEventTagId")),
  sslRequired: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sslRequired")),
  sslCompliant: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sslCompliant")),
  creativeOptimizationConfigurationIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("creativeOptimizationConfigurationIds")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/ads" }),
  svc,
) as unknown as Schema.Schema<ListAdsRequest>;

export type ListAdsResponse = AdsListResponse;
export const ListAdsResponse = AdsListResponse;

export type ListAdsError = CommonErrors;

export const listAds = API.makePaginated(() => ({
  input: ListAdsRequest,
  output: ListAdsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing ad. */
export interface UpdateAdsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Ad;
}

export const UpdateAdsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Ad).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/ads", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAdsRequest>;

export type UpdateAdsResponse = Ad;
export const UpdateAdsResponse = Ad;

export type UpdateAdsError = CommonErrors;

export const updateAds: API.OperationMethod<UpdateAdsRequest, UpdateAdsResponse, UpdateAdsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAdsRequest,
  output: UpdateAdsResponse,
  errors: [],
}));

/** Updates an existing ad. This method supports patch semantics. */
export interface PatchAdsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. RemarketingList ID. */
  id: string;
  /** Request body */
  body?: Ad;
}

export const PatchAdsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Ad).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/ads", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdsRequest>;

export type PatchAdsResponse = Ad;
export const PatchAdsResponse = Ad;

export type PatchAdsError = CommonErrors;

export const patchAds: API.OperationMethod<PatchAdsRequest, PatchAdsResponse, PatchAdsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdsRequest,
  output: PatchAdsResponse,
  errors: [],
}));

/** Deletes an existing advertiser group. */
export interface DeleteAdvertiserGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Advertiser group ID. */
  id: string;
}

export const DeleteAdvertiserGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/advertiserGroups/{advertiserGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdvertiserGroupsRequest>;

export interface DeleteAdvertiserGroupsResponse {}
export const DeleteAdvertiserGroupsResponse: Schema.Schema<DeleteAdvertiserGroupsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAdvertiserGroupsResponse>;

export type DeleteAdvertiserGroupsError = CommonErrors;

export const deleteAdvertiserGroups: API.OperationMethod<DeleteAdvertiserGroupsRequest, DeleteAdvertiserGroupsResponse, DeleteAdvertiserGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdvertiserGroupsRequest,
  output: DeleteAdvertiserGroupsResponse,
  errors: [],
}));

/** Gets one advertiser group by ID. */
export interface GetAdvertiserGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Advertiser group ID. */
  id: string;
}

export const GetAdvertiserGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertiserGroups/{advertiserGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertiserGroupsRequest>;

export type GetAdvertiserGroupsResponse = AdvertiserGroup;
export const GetAdvertiserGroupsResponse = AdvertiserGroup;

export type GetAdvertiserGroupsError = CommonErrors;

export const getAdvertiserGroups: API.OperationMethod<GetAdvertiserGroupsRequest, GetAdvertiserGroupsResponse, GetAdvertiserGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertiserGroupsRequest,
  output: GetAdvertiserGroupsResponse,
  errors: [],
}));

/** Inserts a new advertiser group. */
export interface InsertAdvertiserGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: AdvertiserGroup;
}

export const InsertAdvertiserGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(AdvertiserGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/advertiserGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAdvertiserGroupsRequest>;

export type InsertAdvertiserGroupsResponse = AdvertiserGroup;
export const InsertAdvertiserGroupsResponse = AdvertiserGroup;

export type InsertAdvertiserGroupsError = CommonErrors;

export const insertAdvertiserGroups: API.OperationMethod<InsertAdvertiserGroupsRequest, InsertAdvertiserGroupsResponse, InsertAdvertiserGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAdvertiserGroupsRequest,
  output: InsertAdvertiserGroupsResponse,
  errors: [],
}));

/** Retrieves a list of advertiser groups, possibly filtered. This method supports paging. */
export interface ListAdvertiserGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only advertiser groups with these IDs. */
  ids?: string[];
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "advertiser*2015" will return objects with names like "advertiser group June 2015", "advertiser group April 2015", or simply "advertiser group 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "advertisergroup" will match objects with name "my advertisergroup", "advertisergroup 2015", or simply "advertisergroup". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListAdvertiserGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertiserGroups" }),
  svc,
) as unknown as Schema.Schema<ListAdvertiserGroupsRequest>;

export type ListAdvertiserGroupsResponse = AdvertiserGroupsListResponse;
export const ListAdvertiserGroupsResponse = AdvertiserGroupsListResponse;

export type ListAdvertiserGroupsError = CommonErrors;

export const listAdvertiserGroups = API.makePaginated(() => ({
  input: ListAdvertiserGroupsRequest,
  output: ListAdvertiserGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing advertiser group. */
export interface UpdateAdvertiserGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: AdvertiserGroup;
}

export const UpdateAdvertiserGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(AdvertiserGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/advertiserGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAdvertiserGroupsRequest>;

export type UpdateAdvertiserGroupsResponse = AdvertiserGroup;
export const UpdateAdvertiserGroupsResponse = AdvertiserGroup;

export type UpdateAdvertiserGroupsError = CommonErrors;

export const updateAdvertiserGroups: API.OperationMethod<UpdateAdvertiserGroupsRequest, UpdateAdvertiserGroupsResponse, UpdateAdvertiserGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAdvertiserGroupsRequest,
  output: UpdateAdvertiserGroupsResponse,
  errors: [],
}));

/** Updates an existing advertiser group. This method supports patch semantics. */
export interface PatchAdvertiserGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Advertiser Group ID. */
  id: string;
  /** Request body */
  body?: AdvertiserGroup;
}

export const PatchAdvertiserGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(AdvertiserGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/advertiserGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertiserGroupsRequest>;

export type PatchAdvertiserGroupsResponse = AdvertiserGroup;
export const PatchAdvertiserGroupsResponse = AdvertiserGroup;

export type PatchAdvertiserGroupsError = CommonErrors;

export const patchAdvertiserGroups: API.OperationMethod<PatchAdvertiserGroupsRequest, PatchAdvertiserGroupsResponse, PatchAdvertiserGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertiserGroupsRequest,
  output: PatchAdvertiserGroupsResponse,
  errors: [],
}));

/** Gets one advertiser by ID. */
export interface GetAdvertisersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Advertiser ID. */
  id: string;
}

export const GetAdvertisersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertisers/{advertisersId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertisersRequest>;

export type GetAdvertisersResponse = Advertiser;
export const GetAdvertisersResponse = Advertiser;

export type GetAdvertisersError = CommonErrors;

export const getAdvertisers: API.OperationMethod<GetAdvertisersRequest, GetAdvertisersResponse, GetAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertisersRequest,
  output: GetAdvertisersResponse,
  errors: [],
}));

/** Inserts a new advertiser. */
export interface InsertAdvertisersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Advertiser;
}

export const InsertAdvertisersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Advertiser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/advertisers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAdvertisersRequest>;

export type InsertAdvertisersResponse = Advertiser;
export const InsertAdvertisersResponse = Advertiser;

export type InsertAdvertisersError = CommonErrors;

export const insertAdvertisers: API.OperationMethod<InsertAdvertisersRequest, InsertAdvertisersResponse, InsertAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAdvertisersRequest,
  output: InsertAdvertisersResponse,
  errors: [],
}));

/** Retrieves a list of advertisers, possibly filtered. This method supports paging. */
export interface ListAdvertisersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only advertisers with these subaccount IDs. */
  subaccountId?: string;
  /** Select only advertisers with the specified status. */
  status?: "APPROVED" | "ON_HOLD" | (string & {});
  /** Select only advertisers with these advertiser group IDs. */
  advertiserGroupIds?: string[];
  /** Select only advertisers with these floodlight configuration IDs. */
  floodlightConfigurationIds?: string[];
  /** Select only advertisers which do not belong to any advertiser group. */
  includeAdvertisersWithoutGroupsOnly?: boolean;
  /** Select only advertisers which use another advertiser's floodlight configuration. */
  onlyParent?: boolean;
  /** Select only advertisers with these IDs. */
  ids?: string[];
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "advertiser*2015" will return objects with names like "advertiser June 2015", "advertiser April 2015", or simply "advertiser 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "advertiser" will match objects with name "my advertiser", "advertiser 2015", or simply "advertiser" . */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListAdvertisersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  subaccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("subaccountId")),
  status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
  advertiserGroupIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserGroupIds")),
  floodlightConfigurationIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("floodlightConfigurationIds")),
  includeAdvertisersWithoutGroupsOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeAdvertisersWithoutGroupsOnly")),
  onlyParent: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("onlyParent")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertisers" }),
  svc,
) as unknown as Schema.Schema<ListAdvertisersRequest>;

export type ListAdvertisersResponse = AdvertisersListResponse;
export const ListAdvertisersResponse = AdvertisersListResponse;

export type ListAdvertisersError = CommonErrors;

export const listAdvertisers = API.makePaginated(() => ({
  input: ListAdvertisersRequest,
  output: ListAdvertisersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing advertiser. */
export interface UpdateAdvertisersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Advertiser;
}

export const UpdateAdvertisersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Advertiser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/advertisers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAdvertisersRequest>;

export type UpdateAdvertisersResponse = Advertiser;
export const UpdateAdvertisersResponse = Advertiser;

export type UpdateAdvertisersError = CommonErrors;

export const updateAdvertisers: API.OperationMethod<UpdateAdvertisersRequest, UpdateAdvertisersResponse, UpdateAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAdvertisersRequest,
  output: UpdateAdvertisersResponse,
  errors: [],
}));

/** Updates an existing advertiser. This method supports patch semantics. */
export interface PatchAdvertisersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Advertiser ID. */
  id: string;
  /** Request body */
  body?: Advertiser;
}

export const PatchAdvertisersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Advertiser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/advertisers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertisersRequest>;

export type PatchAdvertisersResponse = Advertiser;
export const PatchAdvertisersResponse = Advertiser;

export type PatchAdvertisersError = CommonErrors;

export const patchAdvertisers: API.OperationMethod<PatchAdvertisersRequest, PatchAdvertisersResponse, PatchAdvertisersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertisersRequest,
  output: PatchAdvertisersResponse,
  errors: [],
}));

/** Inserts a new billing assignment and returns the new assignment. Only one of advertiser_id or campaign_id is support per request. If the new assignment has no effect (assigning a campaign to the parent advertiser billing profile or assigning an advertiser to the account billing profile), no assignment will be returned. */
export interface InsertBillingAssignmentsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Billing profile ID of this billing assignment. */
  billingProfileId: string;
  /** Request body */
  body?: BillingAssignment;
}

export const InsertBillingAssignmentsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  billingProfileId: Schema.String.pipe(T.HttpPath("billingProfileId")),
  body: Schema.optional(BillingAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/billingProfiles/{billingProfilesId}/billingAssignments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertBillingAssignmentsRequest>;

export type InsertBillingAssignmentsResponse = BillingAssignment;
export const InsertBillingAssignmentsResponse = BillingAssignment;

export type InsertBillingAssignmentsError = CommonErrors;

export const insertBillingAssignments: API.OperationMethod<InsertBillingAssignmentsRequest, InsertBillingAssignmentsResponse, InsertBillingAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertBillingAssignmentsRequest,
  output: InsertBillingAssignmentsResponse,
  errors: [],
}));

/** Retrieves a list of billing assignments. */
export interface ListBillingAssignmentsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Billing profile ID of this billing assignment. */
  billingProfileId: string;
}

export const ListBillingAssignmentsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  billingProfileId: Schema.String.pipe(T.HttpPath("billingProfileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/billingProfiles/{billingProfilesId}/billingAssignments" }),
  svc,
) as unknown as Schema.Schema<ListBillingAssignmentsRequest>;

export type ListBillingAssignmentsResponse = BillingAssignmentsListResponse;
export const ListBillingAssignmentsResponse = BillingAssignmentsListResponse;

export type ListBillingAssignmentsError = CommonErrors;

export const listBillingAssignments: API.OperationMethod<ListBillingAssignmentsRequest, ListBillingAssignmentsResponse, ListBillingAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListBillingAssignmentsRequest,
  output: ListBillingAssignmentsResponse,
  errors: [],
}));

/** Gets one billing profile by ID. */
export interface GetBillingProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Billing Profile ID. */
  id: string;
}

export const GetBillingProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/billingProfiles/{billingProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingProfilesRequest>;

export type GetBillingProfilesResponse = BillingProfile;
export const GetBillingProfilesResponse = BillingProfile;

export type GetBillingProfilesError = CommonErrors;

export const getBillingProfiles: API.OperationMethod<GetBillingProfilesRequest, GetBillingProfilesResponse, GetBillingProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingProfilesRequest,
  output: GetBillingProfilesResponse,
  errors: [],
}));

/** Retrieves a list of billing profiles, possibly filtered. This method supports paging. */
export interface ListBillingProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only billing profile with currency. */
  currency_code?: string;
  /** Select only billing profile with the specified subaccount.When only_suggestion is true, only a single subaccount_id is supported. */
  subaccountIds?: string[];
  /** Select only billing profile with the specified status. */
  status?: "UNDER_REVIEW" | "ACTIVE" | "ARCHIVED" | (string & {})[];
  /** Select only billing profile which is suggested for the currency_code & subaccount_id using the Billing Suggestion API. */
  onlySuggestion?: boolean;
  /** Select only billing profile with these IDs. */
  ids?: string[];
  /** Allows searching for billing profiles by name. Wildcards (*) are allowed. For example, "profile*2020" will return objects with names like "profile June 2020", "profile April 2020", or simply "profile 2020". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "profile" will match objects with name "my profile", "profile 2021", or simply "profile". */
  name?: string;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListBillingProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  currency_code: Schema.optional(Schema.String).pipe(T.HttpQuery("currency_code")),
  subaccountIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("subaccountIds")),
  status: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("status")),
  onlySuggestion: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("onlySuggestion")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/billingProfiles" }),
  svc,
) as unknown as Schema.Schema<ListBillingProfilesRequest>;

export type ListBillingProfilesResponse = BillingProfilesListResponse;
export const ListBillingProfilesResponse = BillingProfilesListResponse;

export type ListBillingProfilesError = CommonErrors;

export const listBillingProfiles = API.makePaginated(() => ({
  input: ListBillingProfilesRequest,
  output: ListBillingProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing billing profile. */
export interface UpdateBillingProfilesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: BillingProfile;
}

export const UpdateBillingProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(BillingProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/billingProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBillingProfilesRequest>;

export type UpdateBillingProfilesResponse = BillingProfile;
export const UpdateBillingProfilesResponse = BillingProfile;

export type UpdateBillingProfilesError = CommonErrors;

export const updateBillingProfiles: API.OperationMethod<UpdateBillingProfilesRequest, UpdateBillingProfilesResponse, UpdateBillingProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBillingProfilesRequest,
  output: UpdateBillingProfilesResponse,
  errors: [],
}));

/** Retrieves a list of billing rates. This method supports paging. */
export interface ListBillingRatesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Billing profile ID of this billing rate. */
  billingProfileId: string;
}

export const ListBillingRatesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  billingProfileId: Schema.String.pipe(T.HttpPath("billingProfileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/billingProfiles/{billingProfilesId}/billingRates" }),
  svc,
) as unknown as Schema.Schema<ListBillingRatesRequest>;

export type ListBillingRatesResponse = BillingRatesListResponse;
export const ListBillingRatesResponse = BillingRatesListResponse;

export type ListBillingRatesError = CommonErrors;

export const listBillingRates: API.OperationMethod<ListBillingRatesRequest, ListBillingRatesResponse, ListBillingRatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListBillingRatesRequest,
  output: ListBillingRatesResponse,
  errors: [],
}));

/** Retrieves a list of browsers. */
export interface ListBrowsersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListBrowsersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/browsers" }),
  svc,
) as unknown as Schema.Schema<ListBrowsersRequest>;

export type ListBrowsersResponse = BrowsersListResponse;
export const ListBrowsersResponse = BrowsersListResponse;

export type ListBrowsersError = CommonErrors;

export const listBrowsers: API.OperationMethod<ListBrowsersRequest, ListBrowsersResponse, ListBrowsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListBrowsersRequest,
  output: ListBrowsersResponse,
  errors: [],
}));

/** Associates a creative with the specified campaign. This method creates a default ad with dimensions matching the creative in the campaign if such a default ad does not exist already. */
export interface InsertCampaignCreativeAssociationsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Campaign ID in this association. */
  campaignId: string;
  /** Request body */
  body?: CampaignCreativeAssociation;
}

export const InsertCampaignCreativeAssociationsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
  body: Schema.optional(CampaignCreativeAssociation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/campaigns/{campaignsId}/campaignCreativeAssociations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCampaignCreativeAssociationsRequest>;

export type InsertCampaignCreativeAssociationsResponse = CampaignCreativeAssociation;
export const InsertCampaignCreativeAssociationsResponse = CampaignCreativeAssociation;

export type InsertCampaignCreativeAssociationsError = CommonErrors;

export const insertCampaignCreativeAssociations: API.OperationMethod<InsertCampaignCreativeAssociationsRequest, InsertCampaignCreativeAssociationsResponse, InsertCampaignCreativeAssociationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCampaignCreativeAssociationsRequest,
  output: InsertCampaignCreativeAssociationsResponse,
  errors: [],
}));

/** Retrieves the list of creative IDs associated with the specified campaign. This method supports paging. */
export interface ListCampaignCreativeAssociationsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Campaign ID in this association. */
  campaignId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListCampaignCreativeAssociationsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  campaignId: Schema.String.pipe(T.HttpPath("campaignId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/campaigns/{campaignsId}/campaignCreativeAssociations" }),
  svc,
) as unknown as Schema.Schema<ListCampaignCreativeAssociationsRequest>;

export type ListCampaignCreativeAssociationsResponse = CampaignCreativeAssociationsListResponse;
export const ListCampaignCreativeAssociationsResponse = CampaignCreativeAssociationsListResponse;

export type ListCampaignCreativeAssociationsError = CommonErrors;

export const listCampaignCreativeAssociations = API.makePaginated(() => ({
  input: ListCampaignCreativeAssociationsRequest,
  output: ListCampaignCreativeAssociationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets one campaign by ID. */
export interface GetCampaignsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Campaign ID. */
  id: string;
}

export const GetCampaignsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/campaigns/{campaignsId}" }),
  svc,
) as unknown as Schema.Schema<GetCampaignsRequest>;

export type GetCampaignsResponse = Campaign;
export const GetCampaignsResponse = Campaign;

export type GetCampaignsError = CommonErrors;

export const getCampaigns: API.OperationMethod<GetCampaignsRequest, GetCampaignsResponse, GetCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCampaignsRequest,
  output: GetCampaignsResponse,
  errors: [],
}));

/** Inserts a new campaign. */
export interface InsertCampaignsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Campaign;
}

export const InsertCampaignsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Campaign).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/campaigns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCampaignsRequest>;

export type InsertCampaignsResponse = Campaign;
export const InsertCampaignsResponse = Campaign;

export type InsertCampaignsError = CommonErrors;

export const insertCampaigns: API.OperationMethod<InsertCampaignsRequest, InsertCampaignsResponse, InsertCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCampaignsRequest,
  output: InsertCampaignsResponse,
  errors: [],
}));

/** Retrieves a list of campaigns, possibly filtered. This method supports paging. */
export interface ListCampaignsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only campaigns with these IDs. */
  ids?: string[];
  /** Select only campaigns that belong to these advertisers. */
  advertiserIds?: string[];
  /** Select only campaigns whose advertisers belong to these advertiser groups. */
  advertiserGroupIds?: string[];
  /** Select only archived campaigns. Don't set this field to select both archived and non-archived campaigns. */
  archived?: boolean;
  /** Select only campaigns that have overridden this event tag ID. */
  overriddenEventTagId?: string;
  /** Select only campaigns that belong to this subaccount. */
  subaccountId?: string;
  /** Select only campaigns that have at least one optimization activity. */
  atLeastOneOptimizationActivity?: boolean;
  /** Allows searching for campaigns by name or ID. Wildcards (*) are allowed. For example, "campaign*2015" will return campaigns with names like "campaign June 2015", "campaign April 2015", or simply "campaign 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "campaign" will match campaigns with name "my campaign", "campaign 2015", or simply "campaign". */
  searchString?: string;
  /** Exclude campaigns with these IDs. */
  excludedIds?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListCampaignsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserIds")),
  advertiserGroupIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserGroupIds")),
  archived: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("archived")),
  overriddenEventTagId: Schema.optional(Schema.String).pipe(T.HttpQuery("overriddenEventTagId")),
  subaccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("subaccountId")),
  atLeastOneOptimizationActivity: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("atLeastOneOptimizationActivity")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  excludedIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("excludedIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/campaigns" }),
  svc,
) as unknown as Schema.Schema<ListCampaignsRequest>;

export type ListCampaignsResponse = CampaignsListResponse;
export const ListCampaignsResponse = CampaignsListResponse;

export type ListCampaignsError = CommonErrors;

export const listCampaigns = API.makePaginated(() => ({
  input: ListCampaignsRequest,
  output: ListCampaignsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing campaign. */
export interface UpdateCampaignsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Campaign;
}

export const UpdateCampaignsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Campaign).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/campaigns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCampaignsRequest>;

export type UpdateCampaignsResponse = Campaign;
export const UpdateCampaignsResponse = Campaign;

export type UpdateCampaignsError = CommonErrors;

export const updateCampaigns: API.OperationMethod<UpdateCampaignsRequest, UpdateCampaignsResponse, UpdateCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCampaignsRequest,
  output: UpdateCampaignsResponse,
  errors: [],
}));

/** Updates an existing campaign. This method supports patch semantics. */
export interface PatchCampaignsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Campaign ID. */
  id: string;
  /** Request body */
  body?: Campaign;
}

export const PatchCampaignsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Campaign).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/campaigns", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCampaignsRequest>;

export type PatchCampaignsResponse = Campaign;
export const PatchCampaignsResponse = Campaign;

export type PatchCampaignsError = CommonErrors;

export const patchCampaigns: API.OperationMethod<PatchCampaignsRequest, PatchCampaignsResponse, PatchCampaignsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCampaignsRequest,
  output: PatchCampaignsResponse,
  errors: [],
}));

/** Gets one change log by ID. */
export interface GetChangeLogsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Change log ID. */
  id: string;
}

export const GetChangeLogsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/changeLogs/{changeLogsId}" }),
  svc,
) as unknown as Schema.Schema<GetChangeLogsRequest>;

export type GetChangeLogsResponse = ChangeLog;
export const GetChangeLogsResponse = ChangeLog;

export type GetChangeLogsError = CommonErrors;

export const getChangeLogs: API.OperationMethod<GetChangeLogsRequest, GetChangeLogsResponse, GetChangeLogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetChangeLogsRequest,
  output: GetChangeLogsResponse,
  errors: [],
}));

/** Retrieves a list of change logs. This method supports paging. */
export interface ListChangeLogsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only change logs with these IDs. */
  ids?: string[];
  /** Select only change logs with these user profile IDs. */
  userProfileIds?: string[];
  /** Select only change logs whose object ID, user name, old or new values match the search string. */
  searchString?: string;
  /** Select only change logs with the specified object type. */
  objectType?: "OBJECT_ADVERTISER" | "OBJECT_FLOODLIGHT_CONFIGURATION" | "OBJECT_AD" | "OBJECT_FLOODLIGHT_ACTVITY" | "OBJECT_CAMPAIGN" | "OBJECT_FLOODLIGHT_ACTIVITY_GROUP" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT" | "OBJECT_DFA_SITE" | "OBJECT_USER_ROLE" | "OBJECT_USER_PROFILE" | "OBJECT_ADVERTISER_GROUP" | "OBJECT_ACCOUNT" | "OBJECT_SUBACCOUNT" | "OBJECT_RICHMEDIA_CREATIVE" | "OBJECT_INSTREAM_CREATIVE" | "OBJECT_MEDIA_ORDER" | "OBJECT_CONTENT_CATEGORY" | "OBJECT_PLACEMENT_STRATEGY" | "OBJECT_SD_SITE" | "OBJECT_SIZE" | "OBJECT_CREATIVE_GROUP" | "OBJECT_CREATIVE_ASSET" | "OBJECT_USER_PROFILE_FILTER" | "OBJECT_LANDING_PAGE" | "OBJECT_CREATIVE_FIELD" | "OBJECT_REMARKETING_LIST" | "OBJECT_PROVIDED_LIST_CLIENT" | "OBJECT_EVENT_TAG" | "OBJECT_CREATIVE_BUNDLE" | "OBJECT_BILLING_ACCOUNT_GROUP" | "OBJECT_BILLING_FEATURE" | "OBJECT_RATE_CARD" | "OBJECT_ACCOUNT_BILLING_FEATURE" | "OBJECT_BILLING_MINIMUM_FEE" | "OBJECT_BILLING_PROFILE" | "OBJECT_PLAYSTORE_LINK" | "OBJECT_TARGETING_TEMPLATE" | "OBJECT_SEARCH_LIFT_STUDY" | "OBJECT_FLOODLIGHT_DV360_LINK" | "OBJECT_ADVERTISER_CUSTOMER_LINK" | "OBJECT_CONVERSION_DOMAIN" | "OBJECT_ACCOUNT_CONVERSION_DOMAIN" | (string & {});
  /** Select only change logs with the specified action. */
  action?: "ACTION_CREATE" | "ACTION_UPDATE" | "ACTION_DELETE" | "ACTION_ENABLE" | "ACTION_DISABLE" | "ACTION_ADD" | "ACTION_REMOVE" | "ACTION_MARK_AS_DEFAULT" | "ACTION_ASSOCIATE" | "ACTION_ASSIGN" | "ACTION_UNASSIGN" | "ACTION_SEND" | "ACTION_LINK" | "ACTION_UNLINK" | "ACTION_PUSH" | "ACTION_EMAIL_TAGS" | "ACTION_SHARE" | (string & {});
  /** Select only change logs whose change time is after the specified minChangeTime.The time should be formatted as an RFC3339 date/time string. For example, for 10:54 PM on July 18th, 2015, in the America/New York time zone, the format is "2015-07-18T22:54:00-04:00". In other words, the year, month, day, the letter T, the hour (24-hour clock system), minute, second, and then the time zone offset. */
  minChangeTime?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only change logs whose change time is before the specified maxChangeTime.The time should be formatted as an RFC3339 date/time string. For example, for 10:54 PM on July 18th, 2015, in the America/New York time zone, the format is "2015-07-18T22:54:00-04:00". In other words, the year, month, day, the letter T, the hour (24-hour clock system), minute, second, and then the time zone offset. */
  maxChangeTime?: string;
  /** Select only change logs with these object IDs. */
  objectIds?: string[];
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
}

export const ListChangeLogsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  userProfileIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("userProfileIds")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  objectType: Schema.optional(Schema.String).pipe(T.HttpQuery("objectType")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
  minChangeTime: Schema.optional(Schema.String).pipe(T.HttpQuery("minChangeTime")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  maxChangeTime: Schema.optional(Schema.String).pipe(T.HttpQuery("maxChangeTime")),
  objectIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("objectIds")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/changeLogs" }),
  svc,
) as unknown as Schema.Schema<ListChangeLogsRequest>;

export type ListChangeLogsResponse = ChangeLogsListResponse;
export const ListChangeLogsResponse = ChangeLogsListResponse;

export type ListChangeLogsError = CommonErrors;

export const listChangeLogs = API.makePaginated(() => ({
  input: ListChangeLogsRequest,
  output: ListChangeLogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a list of cities, possibly filtered. */
export interface ListCitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only cities with names starting with this prefix. */
  namePrefix?: string;
  /** Select only cities from these countries. */
  countryDartIds?: string[];
  /** Select only cities with these DART IDs. */
  dartIds?: string[];
  /** Select only cities from these regions. */
  regionDartIds?: string[];
}

export const ListCitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  namePrefix: Schema.optional(Schema.String).pipe(T.HttpQuery("namePrefix")),
  countryDartIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("countryDartIds")),
  dartIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("dartIds")),
  regionDartIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("regionDartIds")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/cities" }),
  svc,
) as unknown as Schema.Schema<ListCitiesRequest>;

export type ListCitiesResponse = CitiesListResponse;
export const ListCitiesResponse = CitiesListResponse;

export type ListCitiesError = CommonErrors;

export const listCities: API.OperationMethod<ListCitiesRequest, ListCitiesResponse, ListCitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCitiesRequest,
  output: ListCitiesResponse,
  errors: [],
}));

/** Gets one connection type by ID. */
export interface GetConnectionTypesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Connection type ID. */
  id: string;
}

export const GetConnectionTypesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/connectionTypes/{connectionTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetConnectionTypesRequest>;

export type GetConnectionTypesResponse = ConnectionType;
export const GetConnectionTypesResponse = ConnectionType;

export type GetConnectionTypesError = CommonErrors;

export const getConnectionTypes: API.OperationMethod<GetConnectionTypesRequest, GetConnectionTypesResponse, GetConnectionTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConnectionTypesRequest,
  output: GetConnectionTypesResponse,
  errors: [],
}));

/** Retrieves a list of connection types. */
export interface ListConnectionTypesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListConnectionTypesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/connectionTypes" }),
  svc,
) as unknown as Schema.Schema<ListConnectionTypesRequest>;

export type ListConnectionTypesResponse = ConnectionTypesListResponse;
export const ListConnectionTypesResponse = ConnectionTypesListResponse;

export type ListConnectionTypesError = CommonErrors;

export const listConnectionTypes: API.OperationMethod<ListConnectionTypesRequest, ListConnectionTypesResponse, ListConnectionTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListConnectionTypesRequest,
  output: ListConnectionTypesResponse,
  errors: [],
}));

/** Deletes an existing content category. */
export interface DeleteContentCategoriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Content category ID. */
  id: string;
}

export const DeleteContentCategoriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/contentCategories/{contentCategoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteContentCategoriesRequest>;

export interface DeleteContentCategoriesResponse {}
export const DeleteContentCategoriesResponse: Schema.Schema<DeleteContentCategoriesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteContentCategoriesResponse>;

export type DeleteContentCategoriesError = CommonErrors;

export const deleteContentCategories: API.OperationMethod<DeleteContentCategoriesRequest, DeleteContentCategoriesResponse, DeleteContentCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteContentCategoriesRequest,
  output: DeleteContentCategoriesResponse,
  errors: [],
}));

/** Gets one content category by ID. */
export interface GetContentCategoriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Content category ID. */
  id: string;
}

export const GetContentCategoriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/contentCategories/{contentCategoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetContentCategoriesRequest>;

export type GetContentCategoriesResponse = ContentCategory;
export const GetContentCategoriesResponse = ContentCategory;

export type GetContentCategoriesError = CommonErrors;

export const getContentCategories: API.OperationMethod<GetContentCategoriesRequest, GetContentCategoriesResponse, GetContentCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetContentCategoriesRequest,
  output: GetContentCategoriesResponse,
  errors: [],
}));

/** Inserts a new content category. */
export interface InsertContentCategoriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: ContentCategory;
}

export const InsertContentCategoriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(ContentCategory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/contentCategories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertContentCategoriesRequest>;

export type InsertContentCategoriesResponse = ContentCategory;
export const InsertContentCategoriesResponse = ContentCategory;

export type InsertContentCategoriesError = CommonErrors;

export const insertContentCategories: API.OperationMethod<InsertContentCategoriesRequest, InsertContentCategoriesResponse, InsertContentCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertContentCategoriesRequest,
  output: InsertContentCategoriesResponse,
  errors: [],
}));

/** Retrieves a list of content categories, possibly filtered. This method supports paging. */
export interface ListContentCategoriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only content categories with these IDs. */
  ids?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "contentcategory*2015" will return objects with names like "contentcategory June 2015", "contentcategory April 2015", or simply "contentcategory 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "contentcategory" will match objects with name "my contentcategory", "contentcategory 2015", or simply "contentcategory". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListContentCategoriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/contentCategories" }),
  svc,
) as unknown as Schema.Schema<ListContentCategoriesRequest>;

export type ListContentCategoriesResponse = ContentCategoriesListResponse;
export const ListContentCategoriesResponse = ContentCategoriesListResponse;

export type ListContentCategoriesError = CommonErrors;

export const listContentCategories = API.makePaginated(() => ({
  input: ListContentCategoriesRequest,
  output: ListContentCategoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing content category. */
export interface UpdateContentCategoriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: ContentCategory;
}

export const UpdateContentCategoriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(ContentCategory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/contentCategories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateContentCategoriesRequest>;

export type UpdateContentCategoriesResponse = ContentCategory;
export const UpdateContentCategoriesResponse = ContentCategory;

export type UpdateContentCategoriesError = CommonErrors;

export const updateContentCategories: API.OperationMethod<UpdateContentCategoriesRequest, UpdateContentCategoriesResponse, UpdateContentCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateContentCategoriesRequest,
  output: UpdateContentCategoriesResponse,
  errors: [],
}));

/** Updates an existing content category. This method supports patch semantics. */
export interface PatchContentCategoriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. ContentCategory ID. */
  id: string;
  /** Request body */
  body?: ContentCategory;
}

export const PatchContentCategoriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(ContentCategory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/contentCategories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchContentCategoriesRequest>;

export type PatchContentCategoriesResponse = ContentCategory;
export const PatchContentCategoriesResponse = ContentCategory;

export type PatchContentCategoriesError = CommonErrors;

export const patchContentCategories: API.OperationMethod<PatchContentCategoriesRequest, PatchContentCategoriesResponse, PatchContentCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchContentCategoriesRequest,
  output: PatchContentCategoriesResponse,
  errors: [],
}));

/** Inserts conversions. */
export interface BatchinsertConversionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: ConversionsBatchInsertRequest;
}

export const BatchinsertConversionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(ConversionsBatchInsertRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{profileId}/conversions/batchinsert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchinsertConversionsRequest>;

export type BatchinsertConversionsResponse = ConversionsBatchInsertResponse;
export const BatchinsertConversionsResponse = ConversionsBatchInsertResponse;

export type BatchinsertConversionsError = CommonErrors;

export const batchinsertConversions: API.OperationMethod<BatchinsertConversionsRequest, BatchinsertConversionsResponse, BatchinsertConversionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchinsertConversionsRequest,
  output: BatchinsertConversionsResponse,
  errors: [],
}));

/** Updates existing conversions. */
export interface BatchupdateConversionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: ConversionsBatchUpdateRequest;
}

export const BatchupdateConversionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(ConversionsBatchUpdateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{profileId}/conversions/batchupdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchupdateConversionsRequest>;

export type BatchupdateConversionsResponse = ConversionsBatchUpdateResponse;
export const BatchupdateConversionsResponse = ConversionsBatchUpdateResponse;

export type BatchupdateConversionsError = CommonErrors;

export const batchupdateConversions: API.OperationMethod<BatchupdateConversionsRequest, BatchupdateConversionsResponse, BatchupdateConversionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchupdateConversionsRequest,
  output: BatchupdateConversionsResponse,
  errors: [],
}));

/** Gets one country by ID. */
export interface GetCountriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Country DART ID. */
  dartId: string;
}

export const GetCountriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  dartId: Schema.String.pipe(T.HttpPath("dartId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/countries/{countriesId}" }),
  svc,
) as unknown as Schema.Schema<GetCountriesRequest>;

export type GetCountriesResponse = Country;
export const GetCountriesResponse = Country;

export type GetCountriesError = CommonErrors;

export const getCountries: API.OperationMethod<GetCountriesRequest, GetCountriesResponse, GetCountriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCountriesRequest,
  output: GetCountriesResponse,
  errors: [],
}));

/** Retrieves a list of countries. */
export interface ListCountriesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListCountriesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/countries" }),
  svc,
) as unknown as Schema.Schema<ListCountriesRequest>;

export type ListCountriesResponse = CountriesListResponse;
export const ListCountriesResponse = CountriesListResponse;

export type ListCountriesError = CommonErrors;

export const listCountries: API.OperationMethod<ListCountriesRequest, ListCountriesResponse, ListCountriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCountriesRequest,
  output: ListCountriesResponse,
  errors: [],
}));

/** Inserts a new creative asset. */
export interface InsertCreativeAssetsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Advertiser ID of this creative. This is a required field. */
  advertiserId: string;
  /** Request body */
  body?: CreativeAssetMetadata;
}

export const InsertCreativeAssetsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  body: Schema.optional(CreativeAssetMetadata).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/creativeAssets/{creativeAssetsId}/creativeAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCreativeAssetsRequest>;

export type InsertCreativeAssetsResponse = CreativeAssetMetadata;
export const InsertCreativeAssetsResponse = CreativeAssetMetadata;

export type InsertCreativeAssetsError = CommonErrors;

export const insertCreativeAssets: API.OperationMethod<InsertCreativeAssetsRequest, InsertCreativeAssetsResponse, InsertCreativeAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCreativeAssetsRequest,
  output: InsertCreativeAssetsResponse,
  errors: [],
}));

/** Deletes an existing creative field. */
export interface DeleteCreativeFieldsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative Field ID */
  id: string;
}

export const DeleteCreativeFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCreativeFieldsRequest>;

export interface DeleteCreativeFieldsResponse {}
export const DeleteCreativeFieldsResponse: Schema.Schema<DeleteCreativeFieldsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCreativeFieldsResponse>;

export type DeleteCreativeFieldsError = CommonErrors;

export const deleteCreativeFields: API.OperationMethod<DeleteCreativeFieldsRequest, DeleteCreativeFieldsResponse, DeleteCreativeFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCreativeFieldsRequest,
  output: DeleteCreativeFieldsResponse,
  errors: [],
}));

/** Gets one creative field by ID. */
export interface GetCreativeFieldsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative Field ID */
  id: string;
}

export const GetCreativeFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}" }),
  svc,
) as unknown as Schema.Schema<GetCreativeFieldsRequest>;

export type GetCreativeFieldsResponse = CreativeField;
export const GetCreativeFieldsResponse = CreativeField;

export type GetCreativeFieldsError = CommonErrors;

export const getCreativeFields: API.OperationMethod<GetCreativeFieldsRequest, GetCreativeFieldsResponse, GetCreativeFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCreativeFieldsRequest,
  output: GetCreativeFieldsResponse,
  errors: [],
}));

/** Inserts a new creative field. */
export interface InsertCreativeFieldsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: CreativeField;
}

export const InsertCreativeFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(CreativeField).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/creativeFields", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCreativeFieldsRequest>;

export type InsertCreativeFieldsResponse = CreativeField;
export const InsertCreativeFieldsResponse = CreativeField;

export type InsertCreativeFieldsError = CommonErrors;

export const insertCreativeFields: API.OperationMethod<InsertCreativeFieldsRequest, InsertCreativeFieldsResponse, InsertCreativeFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCreativeFieldsRequest,
  output: InsertCreativeFieldsResponse,
  errors: [],
}));

/** Retrieves a list of creative fields, possibly filtered. This method supports paging. */
export interface ListCreativeFieldsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only creative fields with these IDs. */
  ids?: string[];
  /** Allows searching for creative fields by name or ID. Wildcards (*) are allowed. For example, "creativefield*2015" will return creative fields with names like "creativefield June 2015", "creativefield April 2015", or simply "creativefield 2015". Most of the searches also add wild-cards implicitly at the start and the end of the search string. For example, a search string of "creativefield" will match creative fields with the name "my creativefield", "creativefield 2015", or simply "creativefield". */
  searchString?: string;
  /** Select only creative fields that belong to these advertisers. */
  advertiserIds?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListCreativeFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creativeFields" }),
  svc,
) as unknown as Schema.Schema<ListCreativeFieldsRequest>;

export type ListCreativeFieldsResponse = CreativeFieldsListResponse;
export const ListCreativeFieldsResponse = CreativeFieldsListResponse;

export type ListCreativeFieldsError = CommonErrors;

export const listCreativeFields = API.makePaginated(() => ({
  input: ListCreativeFieldsRequest,
  output: ListCreativeFieldsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing creative field. */
export interface UpdateCreativeFieldsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: CreativeField;
}

export const UpdateCreativeFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(CreativeField).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/creativeFields", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCreativeFieldsRequest>;

export type UpdateCreativeFieldsResponse = CreativeField;
export const UpdateCreativeFieldsResponse = CreativeField;

export type UpdateCreativeFieldsError = CommonErrors;

export const updateCreativeFields: API.OperationMethod<UpdateCreativeFieldsRequest, UpdateCreativeFieldsResponse, UpdateCreativeFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCreativeFieldsRequest,
  output: UpdateCreativeFieldsResponse,
  errors: [],
}));

/** Updates an existing creative field. This method supports patch semantics. */
export interface PatchCreativeFieldsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** CreativeField ID. */
  id: string;
  /** Request body */
  body?: CreativeField;
}

export const PatchCreativeFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(CreativeField).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/creativeFields", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCreativeFieldsRequest>;

export type PatchCreativeFieldsResponse = CreativeField;
export const PatchCreativeFieldsResponse = CreativeField;

export type PatchCreativeFieldsError = CommonErrors;

export const patchCreativeFields: API.OperationMethod<PatchCreativeFieldsRequest, PatchCreativeFieldsResponse, PatchCreativeFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCreativeFieldsRequest,
  output: PatchCreativeFieldsResponse,
  errors: [],
}));

/** Deletes an existing creative field value. */
export interface DeleteCreativeFieldValuesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative field ID for this creative field value. */
  creativeFieldId: string;
  /** Creative Field Value ID */
  id: string;
}

export const DeleteCreativeFieldValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  creativeFieldId: Schema.String.pipe(T.HttpPath("creativeFieldId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}/creativeFieldValues/{creativeFieldValuesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCreativeFieldValuesRequest>;

export interface DeleteCreativeFieldValuesResponse {}
export const DeleteCreativeFieldValuesResponse: Schema.Schema<DeleteCreativeFieldValuesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCreativeFieldValuesResponse>;

export type DeleteCreativeFieldValuesError = CommonErrors;

export const deleteCreativeFieldValues: API.OperationMethod<DeleteCreativeFieldValuesRequest, DeleteCreativeFieldValuesResponse, DeleteCreativeFieldValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCreativeFieldValuesRequest,
  output: DeleteCreativeFieldValuesResponse,
  errors: [],
}));

/** Gets one creative field value by ID. */
export interface GetCreativeFieldValuesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative field ID for this creative field value. */
  creativeFieldId: string;
  /** Creative Field Value ID */
  id: string;
}

export const GetCreativeFieldValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  creativeFieldId: Schema.String.pipe(T.HttpPath("creativeFieldId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}/creativeFieldValues/{creativeFieldValuesId}" }),
  svc,
) as unknown as Schema.Schema<GetCreativeFieldValuesRequest>;

export type GetCreativeFieldValuesResponse = CreativeFieldValue;
export const GetCreativeFieldValuesResponse = CreativeFieldValue;

export type GetCreativeFieldValuesError = CommonErrors;

export const getCreativeFieldValues: API.OperationMethod<GetCreativeFieldValuesRequest, GetCreativeFieldValuesResponse, GetCreativeFieldValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCreativeFieldValuesRequest,
  output: GetCreativeFieldValuesResponse,
  errors: [],
}));

/** Inserts a new creative field value. */
export interface InsertCreativeFieldValuesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative field ID for this creative field value. */
  creativeFieldId: string;
  /** Request body */
  body?: CreativeFieldValue;
}

export const InsertCreativeFieldValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  creativeFieldId: Schema.String.pipe(T.HttpPath("creativeFieldId")),
  body: Schema.optional(CreativeFieldValue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}/creativeFieldValues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCreativeFieldValuesRequest>;

export type InsertCreativeFieldValuesResponse = CreativeFieldValue;
export const InsertCreativeFieldValuesResponse = CreativeFieldValue;

export type InsertCreativeFieldValuesError = CommonErrors;

export const insertCreativeFieldValues: API.OperationMethod<InsertCreativeFieldValuesRequest, InsertCreativeFieldValuesResponse, InsertCreativeFieldValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCreativeFieldValuesRequest,
  output: InsertCreativeFieldValuesResponse,
  errors: [],
}));

/** Retrieves a list of creative field values, possibly filtered. This method supports paging. */
export interface ListCreativeFieldValuesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative field ID for this creative field value. */
  creativeFieldId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Allows searching for creative field values by their values. Wildcards (e.g. *) are not allowed. */
  searchString?: string;
  /** Select only creative field values with these IDs. */
  ids?: string[];
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "VALUE" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListCreativeFieldValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  creativeFieldId: Schema.String.pipe(T.HttpPath("creativeFieldId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}/creativeFieldValues" }),
  svc,
) as unknown as Schema.Schema<ListCreativeFieldValuesRequest>;

export type ListCreativeFieldValuesResponse = CreativeFieldValuesListResponse;
export const ListCreativeFieldValuesResponse = CreativeFieldValuesListResponse;

export type ListCreativeFieldValuesError = CommonErrors;

export const listCreativeFieldValues = API.makePaginated(() => ({
  input: ListCreativeFieldValuesRequest,
  output: ListCreativeFieldValuesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing creative field value. */
export interface UpdateCreativeFieldValuesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative field ID for this creative field value. */
  creativeFieldId: string;
  /** Request body */
  body?: CreativeFieldValue;
}

export const UpdateCreativeFieldValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  creativeFieldId: Schema.String.pipe(T.HttpPath("creativeFieldId")),
  body: Schema.optional(CreativeFieldValue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}/creativeFieldValues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCreativeFieldValuesRequest>;

export type UpdateCreativeFieldValuesResponse = CreativeFieldValue;
export const UpdateCreativeFieldValuesResponse = CreativeFieldValue;

export type UpdateCreativeFieldValuesError = CommonErrors;

export const updateCreativeFieldValues: API.OperationMethod<UpdateCreativeFieldValuesRequest, UpdateCreativeFieldValuesResponse, UpdateCreativeFieldValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCreativeFieldValuesRequest,
  output: UpdateCreativeFieldValuesResponse,
  errors: [],
}));

/** Updates an existing creative field value. This method supports patch semantics. */
export interface PatchCreativeFieldValuesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** CreativeField ID. */
  creativeFieldId: string;
  /** CreativeFieldValue ID. */
  id: string;
  /** Request body */
  body?: CreativeFieldValue;
}

export const PatchCreativeFieldValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  creativeFieldId: Schema.String.pipe(T.HttpPath("creativeFieldId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(CreativeFieldValue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/creativeFields/{creativeFieldsId}/creativeFieldValues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCreativeFieldValuesRequest>;

export type PatchCreativeFieldValuesResponse = CreativeFieldValue;
export const PatchCreativeFieldValuesResponse = CreativeFieldValue;

export type PatchCreativeFieldValuesError = CommonErrors;

export const patchCreativeFieldValues: API.OperationMethod<PatchCreativeFieldValuesRequest, PatchCreativeFieldValuesResponse, PatchCreativeFieldValuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCreativeFieldValuesRequest,
  output: PatchCreativeFieldValuesResponse,
  errors: [],
}));

/** Gets one creative group by ID. */
export interface GetCreativeGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative group ID. */
  id: string;
}

export const GetCreativeGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creativeGroups/{creativeGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetCreativeGroupsRequest>;

export type GetCreativeGroupsResponse = CreativeGroup;
export const GetCreativeGroupsResponse = CreativeGroup;

export type GetCreativeGroupsError = CommonErrors;

export const getCreativeGroups: API.OperationMethod<GetCreativeGroupsRequest, GetCreativeGroupsResponse, GetCreativeGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCreativeGroupsRequest,
  output: GetCreativeGroupsResponse,
  errors: [],
}));

/** Inserts a new creative group. */
export interface InsertCreativeGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: CreativeGroup;
}

export const InsertCreativeGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(CreativeGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/creativeGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCreativeGroupsRequest>;

export type InsertCreativeGroupsResponse = CreativeGroup;
export const InsertCreativeGroupsResponse = CreativeGroup;

export type InsertCreativeGroupsError = CommonErrors;

export const insertCreativeGroups: API.OperationMethod<InsertCreativeGroupsRequest, InsertCreativeGroupsResponse, InsertCreativeGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCreativeGroupsRequest,
  output: InsertCreativeGroupsResponse,
  errors: [],
}));

/** Retrieves a list of creative groups, possibly filtered. This method supports paging. */
export interface ListCreativeGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only creative groups with these IDs. */
  ids?: string[];
  /** Select only creative groups that belong to this subgroup. */
  groupNumber?: number;
  /** Allows searching for creative groups by name or ID. Wildcards (*) are allowed. For example, "creativegroup*2015" will return creative groups with names like "creativegroup June 2015", "creativegroup April 2015", or simply "creativegroup 2015". Most of the searches also add wild-cards implicitly at the start and the end of the search string. For example, a search string of "creativegroup" will match creative groups with the name "my creativegroup", "creativegroup 2015", or simply "creativegroup". */
  searchString?: string;
  /** Select only creative groups that belong to these advertisers. */
  advertiserIds?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListCreativeGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  groupNumber: Schema.optional(Schema.Number).pipe(T.HttpQuery("groupNumber")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creativeGroups" }),
  svc,
) as unknown as Schema.Schema<ListCreativeGroupsRequest>;

export type ListCreativeGroupsResponse = CreativeGroupsListResponse;
export const ListCreativeGroupsResponse = CreativeGroupsListResponse;

export type ListCreativeGroupsError = CommonErrors;

export const listCreativeGroups = API.makePaginated(() => ({
  input: ListCreativeGroupsRequest,
  output: ListCreativeGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing creative group. */
export interface UpdateCreativeGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: CreativeGroup;
}

export const UpdateCreativeGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(CreativeGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/creativeGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCreativeGroupsRequest>;

export type UpdateCreativeGroupsResponse = CreativeGroup;
export const UpdateCreativeGroupsResponse = CreativeGroup;

export type UpdateCreativeGroupsError = CommonErrors;

export const updateCreativeGroups: API.OperationMethod<UpdateCreativeGroupsRequest, UpdateCreativeGroupsResponse, UpdateCreativeGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCreativeGroupsRequest,
  output: UpdateCreativeGroupsResponse,
  errors: [],
}));

/** Updates an existing creative group. This method supports patch semantics. */
export interface PatchCreativeGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Creative Group ID. */
  id: string;
  /** Request body */
  body?: CreativeGroup;
}

export const PatchCreativeGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(CreativeGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/creativeGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCreativeGroupsRequest>;

export type PatchCreativeGroupsResponse = CreativeGroup;
export const PatchCreativeGroupsResponse = CreativeGroup;

export type PatchCreativeGroupsError = CommonErrors;

export const patchCreativeGroups: API.OperationMethod<PatchCreativeGroupsRequest, PatchCreativeGroupsResponse, PatchCreativeGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCreativeGroupsRequest,
  output: PatchCreativeGroupsResponse,
  errors: [],
}));

/** Gets one creative by ID. */
export interface GetCreativesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Creative ID. */
  id: string;
}

export const GetCreativesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creatives/{creativesId}" }),
  svc,
) as unknown as Schema.Schema<GetCreativesRequest>;

export type GetCreativesResponse = Creative;
export const GetCreativesResponse = Creative;

export type GetCreativesError = CommonErrors;

export const getCreatives: API.OperationMethod<GetCreativesRequest, GetCreativesResponse, GetCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCreativesRequest,
  output: GetCreativesResponse,
  errors: [],
}));

/** Inserts a new creative. */
export interface InsertCreativesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Creative;
}

export const InsertCreativesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCreativesRequest>;

export type InsertCreativesResponse = Creative;
export const InsertCreativesResponse = Creative;

export type InsertCreativesError = CommonErrors;

export const insertCreatives: API.OperationMethod<InsertCreativesRequest, InsertCreativesResponse, InsertCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCreativesRequest,
  output: InsertCreativesResponse,
  errors: [],
}));

/** Retrieves a list of creatives, possibly filtered. This method supports paging. */
export interface ListCreativesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only creatives with these IDs. */
  ids?: string[];
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "creative*2015" will return objects with names like "creative June 2015", "creative April 2015", or simply "creative 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "creative" will match objects with name "my creative", "creative 2015", or simply "creative". */
  searchString?: string;
  /** Select only active creatives. Leave blank to select active and inactive creatives. */
  active?: boolean;
  /** Select only archived creatives. Leave blank to select archived and unarchived creatives. */
  archived?: boolean;
  /** Select only creatives with these size IDs. */
  sizeIds?: string[];
  /** Select only creatives with these creative types. */
  types?: "IMAGE" | "DISPLAY_REDIRECT" | "CUSTOM_DISPLAY" | "INTERNAL_REDIRECT" | "CUSTOM_DISPLAY_INTERSTITIAL" | "INTERSTITIAL_INTERNAL_REDIRECT" | "TRACKING_TEXT" | "RICH_MEDIA_DISPLAY_BANNER" | "RICH_MEDIA_INPAGE_FLOATING" | "RICH_MEDIA_IM_EXPAND" | "RICH_MEDIA_DISPLAY_EXPANDING" | "RICH_MEDIA_DISPLAY_INTERSTITIAL" | "RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL" | "RICH_MEDIA_MOBILE_IN_APP" | "FLASH_INPAGE" | "INSTREAM_VIDEO" | "VPAID_LINEAR_VIDEO" | "VPAID_NON_LINEAR_VIDEO" | "INSTREAM_VIDEO_REDIRECT" | "RICH_MEDIA_PEEL_DOWN" | "HTML5_BANNER" | "DISPLAY" | "DISPLAY_IMAGE_GALLERY" | "BRAND_SAFE_DEFAULT_INSTREAM_VIDEO" | "INSTREAM_AUDIO" | (string & {})[];
  /** Select only creatives with this campaign ID. */
  campaignId?: string;
  /** Select only creatives corresponding to this Studio creative ID. */
  studioCreativeId?: string;
  /** Select only creatives with these creative field IDs. */
  creativeFieldIds?: string[];
  /** Select only creatives with these rendering IDs. */
  renderingIds?: string[];
  /** Select only in-stream video creatives with these companion IDs. */
  companionCreativeIds?: string[];
  /** Select only creatives with this advertiser ID. */
  advertiserId?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListCreativesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  archived: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("archived")),
  sizeIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sizeIds")),
  types: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("types")),
  campaignId: Schema.optional(Schema.String).pipe(T.HttpQuery("campaignId")),
  studioCreativeId: Schema.optional(Schema.String).pipe(T.HttpQuery("studioCreativeId")),
  creativeFieldIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("creativeFieldIds")),
  renderingIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("renderingIds")),
  companionCreativeIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("companionCreativeIds")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/creatives" }),
  svc,
) as unknown as Schema.Schema<ListCreativesRequest>;

export type ListCreativesResponse = CreativesListResponse;
export const ListCreativesResponse = CreativesListResponse;

export type ListCreativesError = CommonErrors;

export const listCreatives = API.makePaginated(() => ({
  input: ListCreativesRequest,
  output: ListCreativesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing creative. */
export interface UpdateCreativesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Creative;
}

export const UpdateCreativesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCreativesRequest>;

export type UpdateCreativesResponse = Creative;
export const UpdateCreativesResponse = Creative;

export type UpdateCreativesError = CommonErrors;

export const updateCreatives: API.OperationMethod<UpdateCreativesRequest, UpdateCreativesResponse, UpdateCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCreativesRequest,
  output: UpdateCreativesResponse,
  errors: [],
}));

/** Updates an existing creative. This method supports patch semantics. */
export interface PatchCreativesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Creative ID. */
  id: string;
  /** Request body */
  body?: Creative;
}

export const PatchCreativesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Creative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCreativesRequest>;

export type PatchCreativesResponse = Creative;
export const PatchCreativesResponse = Creative;

export type PatchCreativesError = CommonErrors;

export const patchCreatives: API.OperationMethod<PatchCreativesRequest, PatchCreativesResponse, PatchCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCreativesRequest,
  output: PatchCreativesResponse,
  errors: [],
}));

/** Retrieves list of report dimension values for a list of filters. */
export interface QueryDimensionValuesRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The value of the nextToken from the previous result page. */
  pageToken?: string;
  /** Request body */
  body?: DimensionValueRequest;
}

export const QueryDimensionValuesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  body: Schema.optional(DimensionValueRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{profileId}/dimensionvalues/query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryDimensionValuesRequest>;

export type QueryDimensionValuesResponse = DimensionValueList;
export const QueryDimensionValuesResponse = DimensionValueList;

export type QueryDimensionValuesError = CommonErrors;

export const queryDimensionValues = API.makePaginated(() => ({
  input: QueryDimensionValuesRequest,
  output: QueryDimensionValuesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Gets one directory site by ID. */
export interface GetDirectorySitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Directory site ID. */
  id: string;
}

export const GetDirectorySitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/directorySites/{directorySitesId}" }),
  svc,
) as unknown as Schema.Schema<GetDirectorySitesRequest>;

export type GetDirectorySitesResponse = DirectorySite;
export const GetDirectorySitesResponse = DirectorySite;

export type GetDirectorySitesError = CommonErrors;

export const getDirectorySites: API.OperationMethod<GetDirectorySitesRequest, GetDirectorySitesResponse, GetDirectorySitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDirectorySitesRequest,
  output: GetDirectorySitesResponse,
  errors: [],
}));

/** Inserts a new directory site. */
export interface InsertDirectorySitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: DirectorySite;
}

export const InsertDirectorySitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(DirectorySite).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/directorySites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDirectorySitesRequest>;

export type InsertDirectorySitesResponse = DirectorySite;
export const InsertDirectorySitesResponse = DirectorySite;

export type InsertDirectorySitesError = CommonErrors;

export const insertDirectorySites: API.OperationMethod<InsertDirectorySitesRequest, InsertDirectorySitesResponse, InsertDirectorySitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDirectorySitesRequest,
  output: InsertDirectorySitesResponse,
  errors: [],
}));

/** Retrieves a list of directory sites, possibly filtered. This method supports paging. */
export interface ListDirectorySitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only directory sites with these IDs. */
  ids?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only active directory sites. Leave blank to retrieve both active and inactive directory sites. */
  active?: boolean;
  /** This search filter is no longer supported and will have no effect on the results returned. */
  acceptsInterstitialPlacements?: boolean;
  /** Select only directory sites that accept publisher paid placements. This field can be left blank. */
  acceptsPublisherPaidPlacements?: boolean;
  /** This search filter is no longer supported and will have no effect on the results returned. */
  acceptsInStreamVideoPlacements?: boolean;
  /** Select only directory sites with this Ad Manager network code. */
  dfpNetworkCode?: string;
  /** Allows searching for objects by name, ID or URL. Wildcards (*) are allowed. For example, "directory site*2015" will return objects with names like "directory site June 2015", "directory site April 2015", or simply "directory site 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "directory site" will match objects with name "my directory site", "directory site 2015" or simply, "directory site". */
  searchString?: string;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListDirectorySitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  acceptsInterstitialPlacements: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acceptsInterstitialPlacements")),
  acceptsPublisherPaidPlacements: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acceptsPublisherPaidPlacements")),
  acceptsInStreamVideoPlacements: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acceptsInStreamVideoPlacements")),
  dfpNetworkCode: Schema.optional(Schema.String).pipe(T.HttpQuery("dfpNetworkCode")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/directorySites" }),
  svc,
) as unknown as Schema.Schema<ListDirectorySitesRequest>;

export type ListDirectorySitesResponse = DirectorySitesListResponse;
export const ListDirectorySitesResponse = DirectorySitesListResponse;

export type ListDirectorySitesError = CommonErrors;

export const listDirectorySites = API.makePaginated(() => ({
  input: ListDirectorySitesRequest,
  output: ListDirectorySitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a dynamic feed by ID. */
export interface GetDynamicFeedsRequest {
  /** Required. Dynamic feed ID. */
  dynamicFeedId: string;
}

export const GetDynamicFeedsRequest = Schema.Struct({
  dynamicFeedId: Schema.String.pipe(T.HttpPath("dynamicFeedId")),
}).pipe(
  T.Http({ method: "GET", path: "studio/dynamicFeeds/{dynamicFeedsId}" }),
  svc,
) as unknown as Schema.Schema<GetDynamicFeedsRequest>;

export type GetDynamicFeedsResponse = DynamicFeed;
export const GetDynamicFeedsResponse = DynamicFeed;

export type GetDynamicFeedsError = CommonErrors;

export const getDynamicFeeds: API.OperationMethod<GetDynamicFeedsRequest, GetDynamicFeedsResponse, GetDynamicFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDynamicFeedsRequest,
  output: GetDynamicFeedsResponse,
  errors: [],
}));

/** Inserts a new dynamic feed. */
export interface InsertDynamicFeedsRequest {
  /** Request body */
  body?: DynamicFeedsInsertRequest;
}

export const InsertDynamicFeedsRequest = Schema.Struct({
  body: Schema.optional(DynamicFeedsInsertRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "studio/dynamicFeeds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDynamicFeedsRequest>;

export type InsertDynamicFeedsResponse = DynamicFeed;
export const InsertDynamicFeedsResponse = DynamicFeed;

export type InsertDynamicFeedsError = CommonErrors;

export const insertDynamicFeeds: API.OperationMethod<InsertDynamicFeedsRequest, InsertDynamicFeedsResponse, InsertDynamicFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDynamicFeedsRequest,
  output: InsertDynamicFeedsResponse,
  errors: [],
}));

/** Updates a new dynamic feed. For draft feeds, only Element can be updated. For published feeds, only FeedSchedule can be updated. Other fields will be ignored. */
export interface UpdateDynamicFeedsRequest {
  /** Request body */
  body?: DynamicFeed;
}

export const UpdateDynamicFeedsRequest = Schema.Struct({
  body: Schema.optional(DynamicFeed).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "studio/dynamicFeeds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDynamicFeedsRequest>;

export type UpdateDynamicFeedsResponse = DynamicFeed;
export const UpdateDynamicFeedsResponse = DynamicFeed;

export type UpdateDynamicFeedsError = CommonErrors;

export const updateDynamicFeeds: API.OperationMethod<UpdateDynamicFeedsRequest, UpdateDynamicFeedsResponse, UpdateDynamicFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDynamicFeedsRequest,
  output: UpdateDynamicFeedsResponse,
  errors: [],
}));

/** Retransforms a dynamic feed. Only draft feeds can be retransformed (i.e. the feed has not been published). */
export interface RetransformDynamicFeedsRequest {
  /** Required. Dynamic feed ID. */
  dynamicFeedId: string;
}

export const RetransformDynamicFeedsRequest = Schema.Struct({
  dynamicFeedId: Schema.String.pipe(T.HttpPath("dynamicFeedId")),
}).pipe(
  T.Http({ method: "POST", path: "studio/dynamicFeeds/{dynamicFeedsId}/retransform", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RetransformDynamicFeedsRequest>;

export type RetransformDynamicFeedsResponse = DynamicFeed;
export const RetransformDynamicFeedsResponse = DynamicFeed;

export type RetransformDynamicFeedsError = CommonErrors;

export const retransformDynamicFeeds: API.OperationMethod<RetransformDynamicFeedsRequest, RetransformDynamicFeedsResponse, RetransformDynamicFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetransformDynamicFeedsRequest,
  output: RetransformDynamicFeedsResponse,
  errors: [],
}));

/** Gets a dynamic profile by ID. */
export interface GetDynamicProfilesRequest {
  /** Required. Dynamic profile ID. */
  dynamicProfileId: string;
}

export const GetDynamicProfilesRequest = Schema.Struct({
  dynamicProfileId: Schema.String.pipe(T.HttpPath("dynamicProfileId")),
}).pipe(
  T.Http({ method: "GET", path: "studio/dynamicProfiles/{dynamicProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetDynamicProfilesRequest>;

export type GetDynamicProfilesResponse = DynamicProfile;
export const GetDynamicProfilesResponse = DynamicProfile;

export type GetDynamicProfilesError = CommonErrors;

export const getDynamicProfiles: API.OperationMethod<GetDynamicProfilesRequest, GetDynamicProfilesResponse, GetDynamicProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDynamicProfilesRequest,
  output: GetDynamicProfilesResponse,
  errors: [],
}));

/** Inserts a new dynamic profile. */
export interface InsertDynamicProfilesRequest {
  /** Request body */
  body?: DynamicProfile;
}

export const InsertDynamicProfilesRequest = Schema.Struct({
  body: Schema.optional(DynamicProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "studio/dynamicProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDynamicProfilesRequest>;

export type InsertDynamicProfilesResponse = DynamicProfile;
export const InsertDynamicProfilesResponse = DynamicProfile;

export type InsertDynamicProfilesError = CommonErrors;

export const insertDynamicProfiles: API.OperationMethod<InsertDynamicProfilesRequest, InsertDynamicProfilesResponse, InsertDynamicProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDynamicProfilesRequest,
  output: InsertDynamicProfilesResponse,
  errors: [],
}));

/** Updates an existing dynamic profile. */
export interface UpdateDynamicProfilesRequest {
  /** Request body */
  body?: DynamicProfile;
}

export const UpdateDynamicProfilesRequest = Schema.Struct({
  body: Schema.optional(DynamicProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "studio/dynamicProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDynamicProfilesRequest>;

export type UpdateDynamicProfilesResponse = DynamicProfile;
export const UpdateDynamicProfilesResponse = DynamicProfile;

export type UpdateDynamicProfilesError = CommonErrors;

export const updateDynamicProfiles: API.OperationMethod<UpdateDynamicProfilesRequest, UpdateDynamicProfilesResponse, UpdateDynamicProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDynamicProfilesRequest,
  output: UpdateDynamicProfilesResponse,
  errors: [],
}));

/** Generates code for a dynamic profile, which will need unescaping. */
export interface GenerateCodeDynamicProfilesRequest {
  /** Required. Dynamic profile ID. */
  dynamicProfileId: string;
}

export const GenerateCodeDynamicProfilesRequest = Schema.Struct({
  dynamicProfileId: Schema.String.pipe(T.HttpPath("dynamicProfileId")),
}).pipe(
  T.Http({ method: "GET", path: "studio/dynamicProfiles/{dynamicProfilesId}/generateCode" }),
  svc,
) as unknown as Schema.Schema<GenerateCodeDynamicProfilesRequest>;

export type GenerateCodeDynamicProfilesResponse = DynamicProfileGenerateCodeResponse;
export const GenerateCodeDynamicProfilesResponse = DynamicProfileGenerateCodeResponse;

export type GenerateCodeDynamicProfilesError = CommonErrors;

export const generateCodeDynamicProfiles: API.OperationMethod<GenerateCodeDynamicProfilesRequest, GenerateCodeDynamicProfilesResponse, GenerateCodeDynamicProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateCodeDynamicProfilesRequest,
  output: GenerateCodeDynamicProfilesResponse,
  errors: [],
}));

/** Publish for a dynamic profile. */
export interface PublishDynamicProfilesRequest {
  /** Required. Dynamic profile ID. */
  dynamicProfileId: string;
}

export const PublishDynamicProfilesRequest = Schema.Struct({
  dynamicProfileId: Schema.String.pipe(T.HttpPath("dynamicProfileId")),
}).pipe(
  T.Http({ method: "POST", path: "studio/dynamicProfiles/{dynamicProfilesId}/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishDynamicProfilesRequest>;

export interface PublishDynamicProfilesResponse {}
export const PublishDynamicProfilesResponse: Schema.Schema<PublishDynamicProfilesResponse> = Schema.Struct({}) as any as Schema.Schema<PublishDynamicProfilesResponse>;

export type PublishDynamicProfilesError = CommonErrors;

export const publishDynamicProfiles: API.OperationMethod<PublishDynamicProfilesRequest, PublishDynamicProfilesResponse, PublishDynamicProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishDynamicProfilesRequest,
  output: PublishDynamicProfilesResponse,
  errors: [],
}));

/** Deletes an existing dynamic targeting key. */
export interface DeleteDynamicTargetingKeysRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** ID of the object of this dynamic targeting key. This is a required field. */
  objectId: string;
  /** Required. Name of this dynamic targeting key. This is a required field. Must be less than 256 characters long and cannot contain commas. All characters are converted to lowercase. */
  name: string;
  /** Required. Type of the object of this dynamic targeting key. This is a required field. */
  objectType: "OBJECT_ADVERTISER" | "OBJECT_AD" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT" | (string & {});
}

export const DeleteDynamicTargetingKeysRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  objectId: Schema.String.pipe(T.HttpPath("objectId")),
  name: Schema.String.pipe(T.HttpQuery("name")),
  objectType: Schema.String.pipe(T.HttpQuery("objectType")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/dynamicTargetingKeys/{dynamicTargetingKeysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDynamicTargetingKeysRequest>;

export interface DeleteDynamicTargetingKeysResponse {}
export const DeleteDynamicTargetingKeysResponse: Schema.Schema<DeleteDynamicTargetingKeysResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDynamicTargetingKeysResponse>;

export type DeleteDynamicTargetingKeysError = CommonErrors;

export const deleteDynamicTargetingKeys: API.OperationMethod<DeleteDynamicTargetingKeysRequest, DeleteDynamicTargetingKeysResponse, DeleteDynamicTargetingKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDynamicTargetingKeysRequest,
  output: DeleteDynamicTargetingKeysResponse,
  errors: [],
}));

/** Inserts a new dynamic targeting key. Keys must be created at the advertiser level before being assigned to the advertiser's ads, creatives, or placements. There is a maximum of 1000 keys per advertiser, out of which a maximum of 20 keys can be assigned per ad, creative, or placement. */
export interface InsertDynamicTargetingKeysRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: DynamicTargetingKey;
}

export const InsertDynamicTargetingKeysRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(DynamicTargetingKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/dynamicTargetingKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDynamicTargetingKeysRequest>;

export type InsertDynamicTargetingKeysResponse = DynamicTargetingKey;
export const InsertDynamicTargetingKeysResponse = DynamicTargetingKey;

export type InsertDynamicTargetingKeysError = CommonErrors;

export const insertDynamicTargetingKeys: API.OperationMethod<InsertDynamicTargetingKeysRequest, InsertDynamicTargetingKeysResponse, InsertDynamicTargetingKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDynamicTargetingKeysRequest,
  output: InsertDynamicTargetingKeysResponse,
  errors: [],
}));

/** Retrieves a list of dynamic targeting keys. */
export interface ListDynamicTargetingKeysRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only dynamic targeting keys exactly matching these names. */
  names?: string[];
  /** Select only dynamic targeting keys with this object type. */
  objectType?: "OBJECT_ADVERTISER" | "OBJECT_AD" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT" | (string & {});
  /** Select only dynamic targeting keys with this object ID. */
  objectId?: string;
  /** Select only dynamic targeting keys whose object has this advertiser ID. */
  advertiserId?: string;
}

export const ListDynamicTargetingKeysRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
  objectType: Schema.optional(Schema.String).pipe(T.HttpQuery("objectType")),
  objectId: Schema.optional(Schema.String).pipe(T.HttpQuery("objectId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/dynamicTargetingKeys" }),
  svc,
) as unknown as Schema.Schema<ListDynamicTargetingKeysRequest>;

export type ListDynamicTargetingKeysResponse = DynamicTargetingKeysListResponse;
export const ListDynamicTargetingKeysResponse = DynamicTargetingKeysListResponse;

export type ListDynamicTargetingKeysError = CommonErrors;

export const listDynamicTargetingKeys: API.OperationMethod<ListDynamicTargetingKeysRequest, ListDynamicTargetingKeysResponse, ListDynamicTargetingKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListDynamicTargetingKeysRequest,
  output: ListDynamicTargetingKeysResponse,
  errors: [],
}));

/** Deletes an existing event tag. */
export interface DeleteEventTagsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Event tag ID. */
  id: string;
}

export const DeleteEventTagsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/eventTags/{eventTagsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEventTagsRequest>;

export interface DeleteEventTagsResponse {}
export const DeleteEventTagsResponse: Schema.Schema<DeleteEventTagsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteEventTagsResponse>;

export type DeleteEventTagsError = CommonErrors;

export const deleteEventTags: API.OperationMethod<DeleteEventTagsRequest, DeleteEventTagsResponse, DeleteEventTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEventTagsRequest,
  output: DeleteEventTagsResponse,
  errors: [],
}));

/** Gets one event tag by ID. */
export interface GetEventTagsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Event tag ID. */
  id: string;
}

export const GetEventTagsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/eventTags/{eventTagsId}" }),
  svc,
) as unknown as Schema.Schema<GetEventTagsRequest>;

export type GetEventTagsResponse = EventTag;
export const GetEventTagsResponse = EventTag;

export type GetEventTagsError = CommonErrors;

export const getEventTags: API.OperationMethod<GetEventTagsRequest, GetEventTagsResponse, GetEventTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEventTagsRequest,
  output: GetEventTagsResponse,
  errors: [],
}));

/** Inserts a new event tag. */
export interface InsertEventTagsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: EventTag;
}

export const InsertEventTagsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(EventTag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/eventTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertEventTagsRequest>;

export type InsertEventTagsResponse = EventTag;
export const InsertEventTagsResponse = EventTag;

export type InsertEventTagsError = CommonErrors;

export const insertEventTags: API.OperationMethod<InsertEventTagsRequest, InsertEventTagsResponse, InsertEventTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertEventTagsRequest,
  output: InsertEventTagsResponse,
  errors: [],
}));

/** Retrieves a list of event tags, possibly filtered. */
export interface ListEventTagsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only event tags with these IDs. */
  ids?: string[];
  /** Select only event tags that belong to this advertiser. */
  advertiserId?: string;
  /** Select only event tags that belong to this campaign. */
  campaignId?: string;
  /** Select only event tags that belong to this ad. */
  adId?: string;
  /** Select only enabled event tags. What is considered enabled or disabled depends on the definitionsOnly parameter. When definitionsOnly is set to true, only the specified advertiser or campaign's event tags' enabledByDefault field is examined. When definitionsOnly is set to false, the specified ad or specified campaign's parent advertiser's or parent campaign's event tags' enabledByDefault and status fields are examined as well. */
  enabled?: boolean;
  /** Examine only the specified campaign or advertiser's event tags for matching selector criteria. When set to false, the parent advertiser and parent campaign of the specified ad or campaign is examined as well. In addition, when set to false, the status field is examined as well, along with the enabledByDefault field. This parameter can not be set to true when adId is specified as ads do not define their own even tags. */
  definitionsOnly?: boolean;
  /** Select only event tags with the specified event tag types. Event tag types can be used to specify whether to use a third-party pixel, a third-party JavaScript URL, or a third-party click-through URL for either impression or click tracking. */
  eventTagTypes?: "IMPRESSION_IMAGE_EVENT_TAG" | "IMPRESSION_JAVASCRIPT_EVENT_TAG" | "CLICK_THROUGH_EVENT_TAG" | (string & {})[];
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "eventtag*2015" will return objects with names like "eventtag June 2015", "eventtag April 2015", or simply "eventtag 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "eventtag" will match objects with name "my eventtag", "eventtag 2015", or simply "eventtag". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListEventTagsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  campaignId: Schema.optional(Schema.String).pipe(T.HttpQuery("campaignId")),
  adId: Schema.optional(Schema.String).pipe(T.HttpQuery("adId")),
  enabled: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enabled")),
  definitionsOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("definitionsOnly")),
  eventTagTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("eventTagTypes")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/eventTags" }),
  svc,
) as unknown as Schema.Schema<ListEventTagsRequest>;

export type ListEventTagsResponse = EventTagsListResponse;
export const ListEventTagsResponse = EventTagsListResponse;

export type ListEventTagsError = CommonErrors;

export const listEventTags: API.OperationMethod<ListEventTagsRequest, ListEventTagsResponse, ListEventTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEventTagsRequest,
  output: ListEventTagsResponse,
  errors: [],
}));

/** Updates an existing event tag. */
export interface UpdateEventTagsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: EventTag;
}

export const UpdateEventTagsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(EventTag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/eventTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEventTagsRequest>;

export type UpdateEventTagsResponse = EventTag;
export const UpdateEventTagsResponse = EventTag;

export type UpdateEventTagsError = CommonErrors;

export const updateEventTags: API.OperationMethod<UpdateEventTagsRequest, UpdateEventTagsResponse, UpdateEventTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEventTagsRequest,
  output: UpdateEventTagsResponse,
  errors: [],
}));

/** Updates an existing event tag. This method supports patch semantics. */
export interface PatchEventTagsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. EventTag ID. */
  id: string;
  /** Request body */
  body?: EventTag;
}

export const PatchEventTagsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(EventTag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/eventTags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEventTagsRequest>;

export type PatchEventTagsResponse = EventTag;
export const PatchEventTagsResponse = EventTag;

export type PatchEventTagsError = CommonErrors;

export const patchEventTags: API.OperationMethod<PatchEventTagsRequest, PatchEventTagsResponse, PatchEventTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEventTagsRequest,
  output: PatchEventTagsResponse,
  errors: [],
}));

/** Retrieves a report file by its report ID and file ID. This method supports media download. */
export interface GetFilesRequest {
  /** The ID of the report. */
  reportId: string;
  /** The ID of the report file. */
  fileId: string;
}

export const GetFilesRequest = Schema.Struct({
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "GET", path: "reports/{reportId}/files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<GetFilesRequest>;

export type GetFilesResponse = File;
export const GetFilesResponse = File;

export type GetFilesError = CommonErrors;

export const getFiles: API.OperationMethod<GetFilesRequest, GetFilesResponse, GetFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFilesRequest,
  output: GetFilesResponse,
  errors: [],
}));

/** Lists files for a user profile. */
export interface ListFilesRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The value of the nextToken from the previous result page. */
  pageToken?: string;
  /** The scope that defines which results are returned. */
  scope?: "ALL" | "MINE" | "SHARED_WITH_ME" | (string & {});
  /** The field by which to sort the list. */
  sortField?: "ID" | "LAST_MODIFIED_TIME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListFilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}/files" }),
  svc,
) as unknown as Schema.Schema<ListFilesRequest>;

export type ListFilesResponse = FileList;
export const ListFilesResponse = FileList;

export type ListFilesError = CommonErrors;

export const listFiles = API.makePaginated(() => ({
  input: ListFilesRequest,
  output: ListFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Gets one floodlight activity group by ID. */
export interface GetFloodlightActivityGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Floodlight activity Group ID. */
  id: string;
}

export const GetFloodlightActivityGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/floodlightActivityGroups/{floodlightActivityGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetFloodlightActivityGroupsRequest>;

export type GetFloodlightActivityGroupsResponse = FloodlightActivityGroup;
export const GetFloodlightActivityGroupsResponse = FloodlightActivityGroup;

export type GetFloodlightActivityGroupsError = CommonErrors;

export const getFloodlightActivityGroups: API.OperationMethod<GetFloodlightActivityGroupsRequest, GetFloodlightActivityGroupsResponse, GetFloodlightActivityGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFloodlightActivityGroupsRequest,
  output: GetFloodlightActivityGroupsResponse,
  errors: [],
}));

/** Inserts a new floodlight activity group. */
export interface InsertFloodlightActivityGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: FloodlightActivityGroup;
}

export const InsertFloodlightActivityGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(FloodlightActivityGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/floodlightActivityGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertFloodlightActivityGroupsRequest>;

export type InsertFloodlightActivityGroupsResponse = FloodlightActivityGroup;
export const InsertFloodlightActivityGroupsResponse = FloodlightActivityGroup;

export type InsertFloodlightActivityGroupsError = CommonErrors;

export const insertFloodlightActivityGroups: API.OperationMethod<InsertFloodlightActivityGroupsRequest, InsertFloodlightActivityGroupsResponse, InsertFloodlightActivityGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertFloodlightActivityGroupsRequest,
  output: InsertFloodlightActivityGroupsResponse,
  errors: [],
}));

/** Retrieves a list of floodlight activity groups, possibly filtered. This method supports paging. */
export interface ListFloodlightActivityGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only floodlight activity groups with the specified IDs. Must specify either advertiserId or floodlightConfigurationId for a non-empty result. */
  ids?: string[];
  /** Select only floodlight activity groups with the specified floodlight activity group type. */
  type?: "COUNTER" | "SALE" | (string & {});
  /** Select only floodlight activity groups with the specified advertiser ID. Must specify either advertiserId or floodlightConfigurationId for a non-empty result. */
  advertiserId?: string;
  /** Select only floodlight activity groups with the specified floodlight configuration ID. Must specify either advertiserId, or floodlightConfigurationId for a non-empty result. */
  floodlightConfigurationId?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "floodlightactivitygroup*2015" will return objects with names like "floodlightactivitygroup June 2015", "floodlightactivitygroup April 2015", or simply "floodlightactivitygroup 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "floodlightactivitygroup" will match objects with name "my floodlightactivitygroup activity", "floodlightactivitygroup 2015", or simply "floodlightactivitygroup". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListFloodlightActivityGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  floodlightConfigurationId: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightConfigurationId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/floodlightActivityGroups" }),
  svc,
) as unknown as Schema.Schema<ListFloodlightActivityGroupsRequest>;

export type ListFloodlightActivityGroupsResponse = FloodlightActivityGroupsListResponse;
export const ListFloodlightActivityGroupsResponse = FloodlightActivityGroupsListResponse;

export type ListFloodlightActivityGroupsError = CommonErrors;

export const listFloodlightActivityGroups = API.makePaginated(() => ({
  input: ListFloodlightActivityGroupsRequest,
  output: ListFloodlightActivityGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing floodlight activity group. */
export interface UpdateFloodlightActivityGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: FloodlightActivityGroup;
}

export const UpdateFloodlightActivityGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(FloodlightActivityGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/floodlightActivityGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFloodlightActivityGroupsRequest>;

export type UpdateFloodlightActivityGroupsResponse = FloodlightActivityGroup;
export const UpdateFloodlightActivityGroupsResponse = FloodlightActivityGroup;

export type UpdateFloodlightActivityGroupsError = CommonErrors;

export const updateFloodlightActivityGroups: API.OperationMethod<UpdateFloodlightActivityGroupsRequest, UpdateFloodlightActivityGroupsResponse, UpdateFloodlightActivityGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFloodlightActivityGroupsRequest,
  output: UpdateFloodlightActivityGroupsResponse,
  errors: [],
}));

/** Updates an existing floodlight activity group. This method supports patch semantics. */
export interface PatchFloodlightActivityGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. EventTag ID. */
  id: string;
  /** Request body */
  body?: FloodlightActivityGroup;
}

export const PatchFloodlightActivityGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(FloodlightActivityGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/floodlightActivityGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFloodlightActivityGroupsRequest>;

export type PatchFloodlightActivityGroupsResponse = FloodlightActivityGroup;
export const PatchFloodlightActivityGroupsResponse = FloodlightActivityGroup;

export type PatchFloodlightActivityGroupsError = CommonErrors;

export const patchFloodlightActivityGroups: API.OperationMethod<PatchFloodlightActivityGroupsRequest, PatchFloodlightActivityGroupsResponse, PatchFloodlightActivityGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFloodlightActivityGroupsRequest,
  output: PatchFloodlightActivityGroupsResponse,
  errors: [],
}));

/** Deletes an existing floodlight activity. */
export interface DeleteFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Floodlight activity ID. */
  id: string;
}

export const DeleteFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/floodlightActivities/{floodlightActivitiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFloodlightActivitiesRequest>;

export interface DeleteFloodlightActivitiesResponse {}
export const DeleteFloodlightActivitiesResponse: Schema.Schema<DeleteFloodlightActivitiesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteFloodlightActivitiesResponse>;

export type DeleteFloodlightActivitiesError = CommonErrors;

export const deleteFloodlightActivities: API.OperationMethod<DeleteFloodlightActivitiesRequest, DeleteFloodlightActivitiesResponse, DeleteFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFloodlightActivitiesRequest,
  output: DeleteFloodlightActivitiesResponse,
  errors: [],
}));

/** Generates a tag for a floodlight activity. */
export interface GeneratetagFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Floodlight activity ID for which we want to generate a tag. */
  floodlightActivityId?: string;
}

export const GeneratetagFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  floodlightActivityId: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightActivityId")),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/floodlightActivities/generatetag", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GeneratetagFloodlightActivitiesRequest>;

export type GeneratetagFloodlightActivitiesResponse = FloodlightActivitiesGenerateTagResponse;
export const GeneratetagFloodlightActivitiesResponse = FloodlightActivitiesGenerateTagResponse;

export type GeneratetagFloodlightActivitiesError = CommonErrors;

export const generatetagFloodlightActivities: API.OperationMethod<GeneratetagFloodlightActivitiesRequest, GeneratetagFloodlightActivitiesResponse, GeneratetagFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GeneratetagFloodlightActivitiesRequest,
  output: GeneratetagFloodlightActivitiesResponse,
  errors: [],
}));

/** Gets one floodlight activity by ID. */
export interface GetFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Floodlight activity ID. */
  id: string;
}

export const GetFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/floodlightActivities/{floodlightActivitiesId}" }),
  svc,
) as unknown as Schema.Schema<GetFloodlightActivitiesRequest>;

export type GetFloodlightActivitiesResponse = FloodlightActivity;
export const GetFloodlightActivitiesResponse = FloodlightActivity;

export type GetFloodlightActivitiesError = CommonErrors;

export const getFloodlightActivities: API.OperationMethod<GetFloodlightActivitiesRequest, GetFloodlightActivitiesResponse, GetFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFloodlightActivitiesRequest,
  output: GetFloodlightActivitiesResponse,
  errors: [],
}));

/** Inserts a new floodlight activity. */
export interface InsertFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: FloodlightActivity;
}

export const InsertFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(FloodlightActivity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/floodlightActivities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertFloodlightActivitiesRequest>;

export type InsertFloodlightActivitiesResponse = FloodlightActivity;
export const InsertFloodlightActivitiesResponse = FloodlightActivity;

export type InsertFloodlightActivitiesError = CommonErrors;

export const insertFloodlightActivities: API.OperationMethod<InsertFloodlightActivitiesRequest, InsertFloodlightActivitiesResponse, InsertFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertFloodlightActivitiesRequest,
  output: InsertFloodlightActivitiesResponse,
  errors: [],
}));

/** Retrieves a list of floodlight activities, possibly filtered. This method supports paging. */
export interface ListFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only floodlight activities with the specified IDs. Must specify either ids, advertiserId, or floodlightConfigurationId for a non-empty result. */
  ids?: string[];
  /** Select only floodlight activities with the specified floodlight activity group IDs. */
  floodlightActivityGroupIds?: string[];
  /** Select only floodlight activities for the specified floodlight configuration ID. Must specify either ids, advertiserId, or floodlightConfigurationId for a non-empty result. */
  floodlightConfigurationId?: string;
  /** Select only floodlight activities for the specified advertiser ID. Must specify either ids, advertiserId, or floodlightConfigurationId for a non-empty result. */
  advertiserId?: string;
  /** Select only floodlight activities with the specified tag string. */
  tagString?: string;
  /** Select only floodlight activities with the specified floodlight activity group type. */
  floodlightActivityGroupType?: "COUNTER" | "SALE" | (string & {});
  /** Select only floodlight activities with the specified floodlight activity group tag string. */
  floodlightActivityGroupTagString?: string;
  /** Select only floodlight activities with the specified floodlight activity group name. */
  floodlightActivityGroupName?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "floodlightactivity*2015" will return objects with names like "floodlightactivity June 2015", "floodlightactivity April 2015", or simply "floodlightactivity 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "floodlightactivity" will match objects with name "my floodlightactivity activity", "floodlightactivity 2015", or simply "floodlightactivity". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  floodlightActivityGroupIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("floodlightActivityGroupIds")),
  floodlightConfigurationId: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightConfigurationId")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  tagString: Schema.optional(Schema.String).pipe(T.HttpQuery("tagString")),
  floodlightActivityGroupType: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightActivityGroupType")),
  floodlightActivityGroupTagString: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightActivityGroupTagString")),
  floodlightActivityGroupName: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightActivityGroupName")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/floodlightActivities" }),
  svc,
) as unknown as Schema.Schema<ListFloodlightActivitiesRequest>;

export type ListFloodlightActivitiesResponse = FloodlightActivitiesListResponse;
export const ListFloodlightActivitiesResponse = FloodlightActivitiesListResponse;

export type ListFloodlightActivitiesError = CommonErrors;

export const listFloodlightActivities = API.makePaginated(() => ({
  input: ListFloodlightActivitiesRequest,
  output: ListFloodlightActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing floodlight activity. */
export interface UpdateFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: FloodlightActivity;
}

export const UpdateFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(FloodlightActivity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/floodlightActivities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFloodlightActivitiesRequest>;

export type UpdateFloodlightActivitiesResponse = FloodlightActivity;
export const UpdateFloodlightActivitiesResponse = FloodlightActivity;

export type UpdateFloodlightActivitiesError = CommonErrors;

export const updateFloodlightActivities: API.OperationMethod<UpdateFloodlightActivitiesRequest, UpdateFloodlightActivitiesResponse, UpdateFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFloodlightActivitiesRequest,
  output: UpdateFloodlightActivitiesResponse,
  errors: [],
}));

/** Updates an existing floodlight activity. This method supports patch semantics. */
export interface PatchFloodlightActivitiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. EventTag ID. */
  id: string;
  /** Request body */
  body?: FloodlightActivity;
}

export const PatchFloodlightActivitiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(FloodlightActivity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/floodlightActivities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFloodlightActivitiesRequest>;

export type PatchFloodlightActivitiesResponse = FloodlightActivity;
export const PatchFloodlightActivitiesResponse = FloodlightActivity;

export type PatchFloodlightActivitiesError = CommonErrors;

export const patchFloodlightActivities: API.OperationMethod<PatchFloodlightActivitiesRequest, PatchFloodlightActivitiesResponse, PatchFloodlightActivitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFloodlightActivitiesRequest,
  output: PatchFloodlightActivitiesResponse,
  errors: [],
}));

/** Gets one floodlight configuration by ID. */
export interface GetFloodlightConfigurationsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Floodlight configuration ID. */
  id: string;
}

export const GetFloodlightConfigurationsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/floodlightConfigurations/{floodlightConfigurationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFloodlightConfigurationsRequest>;

export type GetFloodlightConfigurationsResponse = FloodlightConfiguration;
export const GetFloodlightConfigurationsResponse = FloodlightConfiguration;

export type GetFloodlightConfigurationsError = CommonErrors;

export const getFloodlightConfigurations: API.OperationMethod<GetFloodlightConfigurationsRequest, GetFloodlightConfigurationsResponse, GetFloodlightConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFloodlightConfigurationsRequest,
  output: GetFloodlightConfigurationsResponse,
  errors: [],
}));

/** Retrieves a list of floodlight configurations, possibly filtered. */
export interface ListFloodlightConfigurationsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Set of IDs of floodlight configurations to retrieve. Required field; otherwise an empty list will be returned. */
  ids?: string[];
}

export const ListFloodlightConfigurationsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/floodlightConfigurations" }),
  svc,
) as unknown as Schema.Schema<ListFloodlightConfigurationsRequest>;

export type ListFloodlightConfigurationsResponse = FloodlightConfigurationsListResponse;
export const ListFloodlightConfigurationsResponse = FloodlightConfigurationsListResponse;

export type ListFloodlightConfigurationsError = CommonErrors;

export const listFloodlightConfigurations: API.OperationMethod<ListFloodlightConfigurationsRequest, ListFloodlightConfigurationsResponse, ListFloodlightConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListFloodlightConfigurationsRequest,
  output: ListFloodlightConfigurationsResponse,
  errors: [],
}));

/** Updates an existing floodlight configuration. */
export interface UpdateFloodlightConfigurationsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: FloodlightConfiguration;
}

export const UpdateFloodlightConfigurationsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(FloodlightConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/floodlightConfigurations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFloodlightConfigurationsRequest>;

export type UpdateFloodlightConfigurationsResponse = FloodlightConfiguration;
export const UpdateFloodlightConfigurationsResponse = FloodlightConfiguration;

export type UpdateFloodlightConfigurationsError = CommonErrors;

export const updateFloodlightConfigurations: API.OperationMethod<UpdateFloodlightConfigurationsRequest, UpdateFloodlightConfigurationsResponse, UpdateFloodlightConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFloodlightConfigurationsRequest,
  output: UpdateFloodlightConfigurationsResponse,
  errors: [],
}));

/** Updates an existing floodlight configuration. This method supports patch semantics. */
export interface PatchFloodlightConfigurationsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. EventTag ID. */
  id: string;
  /** Request body */
  body?: FloodlightConfiguration;
}

export const PatchFloodlightConfigurationsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(FloodlightConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/floodlightConfigurations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFloodlightConfigurationsRequest>;

export type PatchFloodlightConfigurationsResponse = FloodlightConfiguration;
export const PatchFloodlightConfigurationsResponse = FloodlightConfiguration;

export type PatchFloodlightConfigurationsError = CommonErrors;

export const patchFloodlightConfigurations: API.OperationMethod<PatchFloodlightConfigurationsRequest, PatchFloodlightConfigurationsResponse, PatchFloodlightConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFloodlightConfigurationsRequest,
  output: PatchFloodlightConfigurationsResponse,
  errors: [],
}));

/** Retrieves a list of invoices for a particular issue month. The api only works if the billing profile invoice level is set to either advertiser or campaign non-consolidated invoice level. */
export interface ListAdvertiserInvoicesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Advertiser ID of this invoice. */
  advertiserId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Month for which invoices are needed in the format YYYYMM. Required field */
  issueMonth?: string;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
}

export const ListAdvertiserInvoicesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  issueMonth: Schema.optional(Schema.String).pipe(T.HttpQuery("issueMonth")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertisers/{advertisersId}/invoices" }),
  svc,
) as unknown as Schema.Schema<ListAdvertiserInvoicesRequest>;

export type ListAdvertiserInvoicesResponse = AdvertiserInvoicesListResponse;
export const ListAdvertiserInvoicesResponse = AdvertiserInvoicesListResponse;

export type ListAdvertiserInvoicesError = CommonErrors;

export const listAdvertiserInvoices = API.makePaginated(() => ({
  input: ListAdvertiserInvoicesRequest,
  output: ListAdvertiserInvoicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets one landing page by ID. */
export interface GetAdvertiserLandingPagesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Landing page ID. */
  id: string;
}

export const GetAdvertiserLandingPagesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertiserLandingPages/{advertiserLandingPagesId}" }),
  svc,
) as unknown as Schema.Schema<GetAdvertiserLandingPagesRequest>;

export type GetAdvertiserLandingPagesResponse = LandingPage;
export const GetAdvertiserLandingPagesResponse = LandingPage;

export type GetAdvertiserLandingPagesError = CommonErrors;

export const getAdvertiserLandingPages: API.OperationMethod<GetAdvertiserLandingPagesRequest, GetAdvertiserLandingPagesResponse, GetAdvertiserLandingPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdvertiserLandingPagesRequest,
  output: GetAdvertiserLandingPagesResponse,
  errors: [],
}));

/** Inserts a new landing page. */
export interface InsertAdvertiserLandingPagesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: LandingPage;
}

export const InsertAdvertiserLandingPagesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(LandingPage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/advertiserLandingPages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAdvertiserLandingPagesRequest>;

export type InsertAdvertiserLandingPagesResponse = LandingPage;
export const InsertAdvertiserLandingPagesResponse = LandingPage;

export type InsertAdvertiserLandingPagesError = CommonErrors;

export const insertAdvertiserLandingPages: API.OperationMethod<InsertAdvertiserLandingPagesRequest, InsertAdvertiserLandingPagesResponse, InsertAdvertiserLandingPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAdvertiserLandingPagesRequest,
  output: InsertAdvertiserLandingPagesResponse,
  errors: [],
}));

/** Retrieves a list of landing pages. */
export interface ListAdvertiserLandingPagesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only landing pages with these IDs. */
  ids?: string[];
  /** Select only landing pages that belong to these advertisers. */
  advertiserIds?: string[];
  /** Select only archived landing pages. Don't set this field to select both archived and non-archived landing pages. */
  archived?: boolean;
  /** Select only landing pages that belong to this subaccount. */
  subaccountId?: string;
  /** Allows searching for landing pages by name or ID. Wildcards (*) are allowed. For example, "landingpage*2017" will return landing pages with names like "landingpage July 2017", "landingpage March 2017", or simply "landingpage 2017". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "landingpage" will match campaigns with name "my landingpage", "landingpage 2015", or simply "landingpage". */
  searchString?: string;
  /** Select only landing pages that are associated with these campaigns. */
  campaignIds?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListAdvertiserLandingPagesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserIds")),
  archived: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("archived")),
  subaccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("subaccountId")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  campaignIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("campaignIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/advertiserLandingPages" }),
  svc,
) as unknown as Schema.Schema<ListAdvertiserLandingPagesRequest>;

export type ListAdvertiserLandingPagesResponse = AdvertiserLandingPagesListResponse;
export const ListAdvertiserLandingPagesResponse = AdvertiserLandingPagesListResponse;

export type ListAdvertiserLandingPagesError = CommonErrors;

export const listAdvertiserLandingPages = API.makePaginated(() => ({
  input: ListAdvertiserLandingPagesRequest,
  output: ListAdvertiserLandingPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing landing page. */
export interface UpdateAdvertiserLandingPagesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: LandingPage;
}

export const UpdateAdvertiserLandingPagesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(LandingPage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/advertiserLandingPages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAdvertiserLandingPagesRequest>;

export type UpdateAdvertiserLandingPagesResponse = LandingPage;
export const UpdateAdvertiserLandingPagesResponse = LandingPage;

export type UpdateAdvertiserLandingPagesError = CommonErrors;

export const updateAdvertiserLandingPages: API.OperationMethod<UpdateAdvertiserLandingPagesRequest, UpdateAdvertiserLandingPagesResponse, UpdateAdvertiserLandingPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAdvertiserLandingPagesRequest,
  output: UpdateAdvertiserLandingPagesResponse,
  errors: [],
}));

/** Updates an existing landing page. This method supports patch semantics. */
export interface PatchAdvertiserLandingPagesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Landing Page ID. */
  id: string;
  /** Request body */
  body?: LandingPage;
}

export const PatchAdvertiserLandingPagesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(LandingPage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/advertiserLandingPages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdvertiserLandingPagesRequest>;

export type PatchAdvertiserLandingPagesResponse = LandingPage;
export const PatchAdvertiserLandingPagesResponse = LandingPage;

export type PatchAdvertiserLandingPagesError = CommonErrors;

export const patchAdvertiserLandingPages: API.OperationMethod<PatchAdvertiserLandingPagesRequest, PatchAdvertiserLandingPagesResponse, PatchAdvertiserLandingPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdvertiserLandingPagesRequest,
  output: PatchAdvertiserLandingPagesResponse,
  errors: [],
}));

/** Retrieves a list of languages. */
export interface ListLanguagesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListLanguagesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/languages" }),
  svc,
) as unknown as Schema.Schema<ListLanguagesRequest>;

export type ListLanguagesResponse = LanguagesListResponse;
export const ListLanguagesResponse = LanguagesListResponse;

export type ListLanguagesError = CommonErrors;

export const listLanguages: API.OperationMethod<ListLanguagesRequest, ListLanguagesResponse, ListLanguagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListLanguagesRequest,
  output: ListLanguagesResponse,
  errors: [],
}));

/** Retrieves a list of metros. */
export interface ListMetrosRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListMetrosRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/metros" }),
  svc,
) as unknown as Schema.Schema<ListMetrosRequest>;

export type ListMetrosResponse = MetrosListResponse;
export const ListMetrosResponse = MetrosListResponse;

export type ListMetrosError = CommonErrors;

export const listMetros: API.OperationMethod<ListMetrosRequest, ListMetrosResponse, ListMetrosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListMetrosRequest,
  output: ListMetrosResponse,
  errors: [],
}));

/** Gets one mobile app by ID. */
export interface GetMobileAppsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Mobile app ID. */
  id: string;
}

export const GetMobileAppsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/mobileApps/{mobileAppsId}" }),
  svc,
) as unknown as Schema.Schema<GetMobileAppsRequest>;

export type GetMobileAppsResponse = MobileApp;
export const GetMobileAppsResponse = MobileApp;

export type GetMobileAppsError = CommonErrors;

export const getMobileApps: API.OperationMethod<GetMobileAppsRequest, GetMobileAppsResponse, GetMobileAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMobileAppsRequest,
  output: GetMobileAppsResponse,
  errors: [],
}));

/** Retrieves list of available mobile apps. */
export interface ListMobileAppsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only apps with these IDs. */
  ids?: string[];
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "app*2015" will return objects with names like "app Jan 2018", "app Jan 2018", or simply "app 2018". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "app" will match objects with name "my app", "app 2018", or simply "app". */
  searchString?: string;
  /** Select only apps from these directories. */
  directories?: "UNKNOWN" | "APPLE_APP_STORE" | "GOOGLE_PLAY_STORE" | "ROKU_APP_STORE" | "AMAZON_FIRETV_APP_STORE" | "PLAYSTATION_APP_STORE" | "APPLE_TV_APP_STORE" | "XBOX_APP_STORE" | "SAMSUNG_TV_APP_STORE" | "ANDROID_TV_APP_STORE" | "GENERIC_CTV_APP_STORE" | (string & {})[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
}

export const ListMobileAppsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  directories: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("directories")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/mobileApps" }),
  svc,
) as unknown as Schema.Schema<ListMobileAppsRequest>;

export type ListMobileAppsResponse = MobileAppsListResponse;
export const ListMobileAppsResponse = MobileAppsListResponse;

export type ListMobileAppsError = CommonErrors;

export const listMobileApps = API.makePaginated(() => ({
  input: ListMobileAppsRequest,
  output: ListMobileAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets one mobile carrier by ID. */
export interface GetMobileCarriersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Mobile carrier ID. */
  id: string;
}

export const GetMobileCarriersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/mobileCarriers/{mobileCarriersId}" }),
  svc,
) as unknown as Schema.Schema<GetMobileCarriersRequest>;

export type GetMobileCarriersResponse = MobileCarrier;
export const GetMobileCarriersResponse = MobileCarrier;

export type GetMobileCarriersError = CommonErrors;

export const getMobileCarriers: API.OperationMethod<GetMobileCarriersRequest, GetMobileCarriersResponse, GetMobileCarriersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMobileCarriersRequest,
  output: GetMobileCarriersResponse,
  errors: [],
}));

/** Retrieves a list of mobile carriers. */
export interface ListMobileCarriersRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListMobileCarriersRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/mobileCarriers" }),
  svc,
) as unknown as Schema.Schema<ListMobileCarriersRequest>;

export type ListMobileCarriersResponse = MobileCarriersListResponse;
export const ListMobileCarriersResponse = MobileCarriersListResponse;

export type ListMobileCarriersError = CommonErrors;

export const listMobileCarriers: API.OperationMethod<ListMobileCarriersRequest, ListMobileCarriersResponse, ListMobileCarriersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListMobileCarriersRequest,
  output: ListMobileCarriersResponse,
  errors: [],
}));

/** Gets one operating system by DART ID. */
export interface GetOperatingSystemsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Operating system DART ID. */
  dartId: string;
}

export const GetOperatingSystemsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  dartId: Schema.String.pipe(T.HttpPath("dartId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/operatingSystems/{operatingSystemsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperatingSystemsRequest>;

export type GetOperatingSystemsResponse = OperatingSystem;
export const GetOperatingSystemsResponse = OperatingSystem;

export type GetOperatingSystemsError = CommonErrors;

export const getOperatingSystems: API.OperationMethod<GetOperatingSystemsRequest, GetOperatingSystemsResponse, GetOperatingSystemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperatingSystemsRequest,
  output: GetOperatingSystemsResponse,
  errors: [],
}));

/** Retrieves a list of operating systems. */
export interface ListOperatingSystemsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListOperatingSystemsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/operatingSystems" }),
  svc,
) as unknown as Schema.Schema<ListOperatingSystemsRequest>;

export type ListOperatingSystemsResponse = OperatingSystemsListResponse;
export const ListOperatingSystemsResponse = OperatingSystemsListResponse;

export type ListOperatingSystemsError = CommonErrors;

export const listOperatingSystems: API.OperationMethod<ListOperatingSystemsRequest, ListOperatingSystemsResponse, ListOperatingSystemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOperatingSystemsRequest,
  output: ListOperatingSystemsResponse,
  errors: [],
}));

/** Gets one operating system version by ID. */
export interface GetOperatingSystemVersionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Operating system version ID. */
  id: string;
}

export const GetOperatingSystemVersionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/operatingSystemVersions/{operatingSystemVersionsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperatingSystemVersionsRequest>;

export type GetOperatingSystemVersionsResponse = OperatingSystemVersion;
export const GetOperatingSystemVersionsResponse = OperatingSystemVersion;

export type GetOperatingSystemVersionsError = CommonErrors;

export const getOperatingSystemVersions: API.OperationMethod<GetOperatingSystemVersionsRequest, GetOperatingSystemVersionsResponse, GetOperatingSystemVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperatingSystemVersionsRequest,
  output: GetOperatingSystemVersionsResponse,
  errors: [],
}));

/** Retrieves a list of operating system versions. */
export interface ListOperatingSystemVersionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListOperatingSystemVersionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/operatingSystemVersions" }),
  svc,
) as unknown as Schema.Schema<ListOperatingSystemVersionsRequest>;

export type ListOperatingSystemVersionsResponse = OperatingSystemVersionsListResponse;
export const ListOperatingSystemVersionsResponse = OperatingSystemVersionsListResponse;

export type ListOperatingSystemVersionsError = CommonErrors;

export const listOperatingSystemVersions: API.OperationMethod<ListOperatingSystemVersionsRequest, ListOperatingSystemVersionsResponse, ListOperatingSystemVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOperatingSystemVersionsRequest,
  output: ListOperatingSystemVersionsResponse,
  errors: [],
}));

/** Updates an existing remarketing list. This method supports patch semantics. */
export interface PatchRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. RemarketingList ID. */
  id: string;
  /** Request body */
  body?: RemarketingList;
}

export const PatchRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(RemarketingList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/remarketingLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchRemarketingListsRequest>;

export type PatchRemarketingListsResponse = RemarketingList;
export const PatchRemarketingListsResponse = RemarketingList;

export type PatchRemarketingListsError = CommonErrors;

export const patchRemarketingLists: API.OperationMethod<PatchRemarketingListsRequest, PatchRemarketingListsResponse, PatchRemarketingListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchRemarketingListsRequest,
  output: PatchRemarketingListsResponse,
  errors: [],
}));

/** Gets one remarketing list by ID. */
export interface GetRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Remarketing list ID. */
  id: string;
}

export const GetRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/remarketingLists/{remarketingListsId}" }),
  svc,
) as unknown as Schema.Schema<GetRemarketingListsRequest>;

export type GetRemarketingListsResponse = RemarketingList;
export const GetRemarketingListsResponse = RemarketingList;

export type GetRemarketingListsError = CommonErrors;

export const getRemarketingLists: API.OperationMethod<GetRemarketingListsRequest, GetRemarketingListsResponse, GetRemarketingListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRemarketingListsRequest,
  output: GetRemarketingListsResponse,
  errors: [],
}));

/** Inserts a new remarketing list. */
export interface InsertRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: RemarketingList;
}

export const InsertRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(RemarketingList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/remarketingLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRemarketingListsRequest>;

export type InsertRemarketingListsResponse = RemarketingList;
export const InsertRemarketingListsResponse = RemarketingList;

export type InsertRemarketingListsError = CommonErrors;

export const insertRemarketingLists: API.OperationMethod<InsertRemarketingListsRequest, InsertRemarketingListsResponse, InsertRemarketingListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRemarketingListsRequest,
  output: InsertRemarketingListsResponse,
  errors: [],
}));

/** Retrieves a list of remarketing lists, possibly filtered. This method supports paging. */
export interface ListRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Select only remarketing lists owned by this advertiser. */
  advertiserId: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "remarketing list*2015" will return objects with names like "remarketing list June 2015", "remarketing list April 2015", or simply "remarketing list 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "remarketing list" will match objects with name "my remarketing list", "remarketing list 2015", or simply "remarketing list". */
  name?: string;
  /** Select only active or only inactive remarketing lists. */
  active?: boolean;
  /** Select only remarketing lists that have this floodlight activity ID. */
  floodlightActivityId?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  advertiserId: Schema.String.pipe(T.HttpQuery("advertiserId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  floodlightActivityId: Schema.optional(Schema.String).pipe(T.HttpQuery("floodlightActivityId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/remarketingLists" }),
  svc,
) as unknown as Schema.Schema<ListRemarketingListsRequest>;

export type ListRemarketingListsResponse = RemarketingListsListResponse;
export const ListRemarketingListsResponse = RemarketingListsListResponse;

export type ListRemarketingListsError = CommonErrors;

export const listRemarketingLists = API.makePaginated(() => ({
  input: ListRemarketingListsRequest,
  output: ListRemarketingListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing remarketing list. */
export interface UpdateRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: RemarketingList;
}

export const UpdateRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(RemarketingList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/remarketingLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRemarketingListsRequest>;

export type UpdateRemarketingListsResponse = RemarketingList;
export const UpdateRemarketingListsResponse = RemarketingList;

export type UpdateRemarketingListsError = CommonErrors;

export const updateRemarketingLists: API.OperationMethod<UpdateRemarketingListsRequest, UpdateRemarketingListsResponse, UpdateRemarketingListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRemarketingListsRequest,
  output: UpdateRemarketingListsResponse,
  errors: [],
}));

/** Updates an existing remarketing list share. This method supports patch semantics. */
export interface PatchRemarketingListSharesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. RemarketingList ID. */
  id: string;
  /** Request body */
  body?: RemarketingListShare;
}

export const PatchRemarketingListSharesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(RemarketingListShare).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/remarketingListShares", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchRemarketingListSharesRequest>;

export type PatchRemarketingListSharesResponse = RemarketingListShare;
export const PatchRemarketingListSharesResponse = RemarketingListShare;

export type PatchRemarketingListSharesError = CommonErrors;

export const patchRemarketingListShares: API.OperationMethod<PatchRemarketingListSharesRequest, PatchRemarketingListSharesResponse, PatchRemarketingListSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchRemarketingListSharesRequest,
  output: PatchRemarketingListSharesResponse,
  errors: [],
}));

/** Gets one remarketing list share by remarketing list ID. */
export interface GetRemarketingListSharesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Remarketing list ID. */
  remarketingListId: string;
}

export const GetRemarketingListSharesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  remarketingListId: Schema.String.pipe(T.HttpPath("remarketingListId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/remarketingListShares/{remarketingListSharesId}" }),
  svc,
) as unknown as Schema.Schema<GetRemarketingListSharesRequest>;

export type GetRemarketingListSharesResponse = RemarketingListShare;
export const GetRemarketingListSharesResponse = RemarketingListShare;

export type GetRemarketingListSharesError = CommonErrors;

export const getRemarketingListShares: API.OperationMethod<GetRemarketingListSharesRequest, GetRemarketingListSharesResponse, GetRemarketingListSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRemarketingListSharesRequest,
  output: GetRemarketingListSharesResponse,
  errors: [],
}));

/** Updates an existing remarketing list share. */
export interface UpdateRemarketingListSharesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: RemarketingListShare;
}

export const UpdateRemarketingListSharesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(RemarketingListShare).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/remarketingListShares", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRemarketingListSharesRequest>;

export type UpdateRemarketingListSharesResponse = RemarketingListShare;
export const UpdateRemarketingListSharesResponse = RemarketingListShare;

export type UpdateRemarketingListSharesError = CommonErrors;

export const updateRemarketingListShares: API.OperationMethod<UpdateRemarketingListSharesRequest, UpdateRemarketingListSharesResponse, UpdateRemarketingListSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRemarketingListSharesRequest,
  output: UpdateRemarketingListSharesResponse,
  errors: [],
}));

/** Updates an existing site. This method supports patch semantics. */
export interface PatchSitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Site ID. */
  id: string;
  /** Request body */
  body?: Site;
}

export const PatchSitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Site).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/sites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSitesRequest>;

export type PatchSitesResponse = Site;
export const PatchSitesResponse = Site;

export type PatchSitesError = CommonErrors;

export const patchSites: API.OperationMethod<PatchSitesRequest, PatchSitesResponse, PatchSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSitesRequest,
  output: PatchSitesResponse,
  errors: [],
}));

/** Gets one site by ID. */
export interface GetSitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Site ID. */
  id: string;
}

export const GetSitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/sites/{sitesId}" }),
  svc,
) as unknown as Schema.Schema<GetSitesRequest>;

export type GetSitesResponse = Site;
export const GetSitesResponse = Site;

export type GetSitesError = CommonErrors;

export const getSites: API.OperationMethod<GetSitesRequest, GetSitesResponse, GetSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSitesRequest,
  output: GetSitesResponse,
  errors: [],
}));

/** Inserts a new site. */
export interface InsertSitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Site;
}

export const InsertSitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Site).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/sites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertSitesRequest>;

export type InsertSitesResponse = Site;
export const InsertSitesResponse = Site;

export type InsertSitesError = CommonErrors;

export const insertSites: API.OperationMethod<InsertSitesRequest, InsertSitesResponse, InsertSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertSitesRequest,
  output: InsertSitesResponse,
  errors: [],
}));

/** Retrieves a list of sites, possibly filtered. This method supports paging. */
export interface ListSitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only sites with these IDs. */
  ids?: string[];
  /** Select only sites with these directory site IDs. */
  directorySiteIds?: string[];
  /** Select only sites with this subaccount ID. */
  subaccountId?: string;
  /** Select only approved sites. */
  approved?: boolean;
  /** This search filter is no longer supported and will have no effect on the results returned. */
  acceptsInterstitialPlacements?: boolean;
  /** Select only sites that accept publisher paid placements. */
  acceptsPublisherPaidPlacements?: boolean;
  /** This search filter is no longer supported and will have no effect on the results returned. */
  acceptsInStreamVideoPlacements?: boolean;
  /** Select only AdWords sites. */
  adWordsSite?: boolean;
  /** Select only sites that have not been mapped to a directory site. */
  unmappedSite?: boolean;
  /** Select only sites with these campaign IDs. */
  campaignIds?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name, ID or keyName. Wildcards (*) are allowed. For example, "site*2015" will return objects with names like "site June 2015", "site April 2015", or simply "site 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "site" will match objects with name "my site", "site 2015", or simply "site". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListSitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  directorySiteIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("directorySiteIds")),
  subaccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("subaccountId")),
  approved: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("approved")),
  acceptsInterstitialPlacements: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acceptsInterstitialPlacements")),
  acceptsPublisherPaidPlacements: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acceptsPublisherPaidPlacements")),
  acceptsInStreamVideoPlacements: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acceptsInStreamVideoPlacements")),
  adWordsSite: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("adWordsSite")),
  unmappedSite: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("unmappedSite")),
  campaignIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("campaignIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/sites" }),
  svc,
) as unknown as Schema.Schema<ListSitesRequest>;

export type ListSitesResponse = SitesListResponse;
export const ListSitesResponse = SitesListResponse;

export type ListSitesError = CommonErrors;

export const listSites = API.makePaginated(() => ({
  input: ListSitesRequest,
  output: ListSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing site. */
export interface UpdateSitesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Site;
}

export const UpdateSitesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Site).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/sites", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSitesRequest>;

export type UpdateSitesResponse = Site;
export const UpdateSitesResponse = Site;

export type UpdateSitesError = CommonErrors;

export const updateSites: API.OperationMethod<UpdateSitesRequest, UpdateSitesResponse, UpdateSitesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSitesRequest,
  output: UpdateSitesResponse,
  errors: [],
}));

/** Updates an existing subaccount. This method supports patch semantics. */
export interface PatchSubaccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Subaccount ID. */
  id: string;
  /** Request body */
  body?: Subaccount;
}

export const PatchSubaccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Subaccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/subaccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSubaccountsRequest>;

export type PatchSubaccountsResponse = Subaccount;
export const PatchSubaccountsResponse = Subaccount;

export type PatchSubaccountsError = CommonErrors;

export const patchSubaccounts: API.OperationMethod<PatchSubaccountsRequest, PatchSubaccountsResponse, PatchSubaccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSubaccountsRequest,
  output: PatchSubaccountsResponse,
  errors: [],
}));

/** Gets one subaccount by ID. */
export interface GetSubaccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Subaccount ID. */
  id: string;
}

export const GetSubaccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/subaccounts/{subaccountsId}" }),
  svc,
) as unknown as Schema.Schema<GetSubaccountsRequest>;

export type GetSubaccountsResponse = Subaccount;
export const GetSubaccountsResponse = Subaccount;

export type GetSubaccountsError = CommonErrors;

export const getSubaccounts: API.OperationMethod<GetSubaccountsRequest, GetSubaccountsResponse, GetSubaccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSubaccountsRequest,
  output: GetSubaccountsResponse,
  errors: [],
}));

/** Inserts a new subaccount. */
export interface InsertSubaccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Subaccount;
}

export const InsertSubaccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Subaccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/subaccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertSubaccountsRequest>;

export type InsertSubaccountsResponse = Subaccount;
export const InsertSubaccountsResponse = Subaccount;

export type InsertSubaccountsError = CommonErrors;

export const insertSubaccounts: API.OperationMethod<InsertSubaccountsRequest, InsertSubaccountsResponse, InsertSubaccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertSubaccountsRequest,
  output: InsertSubaccountsResponse,
  errors: [],
}));

/** Gets a list of subaccounts, possibly filtered. This method supports paging. */
export interface ListSubaccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only subaccounts with these IDs. */
  ids?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "subaccount*2015" will return objects with names like "subaccount June 2015", "subaccount April 2015", or simply "subaccount 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "subaccount" will match objects with name "my subaccount", "subaccount 2015", or simply "subaccount" . */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListSubaccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/subaccounts" }),
  svc,
) as unknown as Schema.Schema<ListSubaccountsRequest>;

export type ListSubaccountsResponse = SubaccountsListResponse;
export const ListSubaccountsResponse = SubaccountsListResponse;

export type ListSubaccountsError = CommonErrors;

export const listSubaccounts = API.makePaginated(() => ({
  input: ListSubaccountsRequest,
  output: ListSubaccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing subaccount. */
export interface UpdateSubaccountsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Subaccount;
}

export const UpdateSubaccountsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Subaccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/subaccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSubaccountsRequest>;

export type UpdateSubaccountsResponse = Subaccount;
export const UpdateSubaccountsResponse = Subaccount;

export type UpdateSubaccountsError = CommonErrors;

export const updateSubaccounts: API.OperationMethod<UpdateSubaccountsRequest, UpdateSubaccountsResponse, UpdateSubaccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSubaccountsRequest,
  output: UpdateSubaccountsResponse,
  errors: [],
}));

/** Updates an existing user role. This method supports patch semantics. */
export interface PatchUserRolesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. UserRole ID. */
  id: string;
  /** Request body */
  body?: UserRole;
}

export const PatchUserRolesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(UserRole).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/userRoles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUserRolesRequest>;

export type PatchUserRolesResponse = UserRole;
export const PatchUserRolesResponse = UserRole;

export type PatchUserRolesError = CommonErrors;

export const patchUserRoles: API.OperationMethod<PatchUserRolesRequest, PatchUserRolesResponse, PatchUserRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUserRolesRequest,
  output: PatchUserRolesResponse,
  errors: [],
}));

/** Gets one user role by ID. */
export interface GetUserRolesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** User role ID. */
  id: string;
}

export const GetUserRolesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/userRoles/{userRolesId}" }),
  svc,
) as unknown as Schema.Schema<GetUserRolesRequest>;

export type GetUserRolesResponse = UserRole;
export const GetUserRolesResponse = UserRole;

export type GetUserRolesError = CommonErrors;

export const getUserRoles: API.OperationMethod<GetUserRolesRequest, GetUserRolesResponse, GetUserRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserRolesRequest,
  output: GetUserRolesResponse,
  errors: [],
}));

/** Inserts a new user role. */
export interface InsertUserRolesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: UserRole;
}

export const InsertUserRolesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(UserRole).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/userRoles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertUserRolesRequest>;

export type InsertUserRolesResponse = UserRole;
export const InsertUserRolesResponse = UserRole;

export type InsertUserRolesError = CommonErrors;

export const insertUserRoles: API.OperationMethod<InsertUserRolesRequest, InsertUserRolesResponse, InsertUserRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertUserRolesRequest,
  output: InsertUserRolesResponse,
  errors: [],
}));

/** Retrieves a list of user roles, possibly filtered. This method supports paging. */
export interface ListUserRolesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only user roles with the specified IDs. */
  ids?: string[];
  /** Select only user roles that belong to this subaccount. */
  subaccountId?: string;
  /** Select only account level user roles not associated with any specific subaccount. */
  accountUserRoleOnly?: boolean;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "userrole*2015" will return objects with names like "userrole June 2015", "userrole April 2015", or simply "userrole 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "userrole" will match objects with name "my userrole", "userrole 2015", or simply "userrole". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListUserRolesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  subaccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("subaccountId")),
  accountUserRoleOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("accountUserRoleOnly")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/userRoles" }),
  svc,
) as unknown as Schema.Schema<ListUserRolesRequest>;

export type ListUserRolesResponse = UserRolesListResponse;
export const ListUserRolesResponse = UserRolesListResponse;

export type ListUserRolesError = CommonErrors;

export const listUserRoles = API.makePaginated(() => ({
  input: ListUserRolesRequest,
  output: ListUserRolesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing user role. */
export interface UpdateUserRolesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: UserRole;
}

export const UpdateUserRolesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(UserRole).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/userRoles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUserRolesRequest>;

export type UpdateUserRolesResponse = UserRole;
export const UpdateUserRolesResponse = UserRole;

export type UpdateUserRolesError = CommonErrors;

export const updateUserRoles: API.OperationMethod<UpdateUserRolesRequest, UpdateUserRolesResponse, UpdateUserRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUserRolesRequest,
  output: UpdateUserRolesResponse,
  errors: [],
}));

/** Deletes an existing user role. */
export interface DeleteUserRolesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** User role ID. */
  id: string;
}

export const DeleteUserRolesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/userRoles/{userRolesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUserRolesRequest>;

export interface DeleteUserRolesResponse {}
export const DeleteUserRolesResponse: Schema.Schema<DeleteUserRolesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUserRolesResponse>;

export type DeleteUserRolesError = CommonErrors;

export const deleteUserRoles: API.OperationMethod<DeleteUserRolesRequest, DeleteUserRolesResponse, DeleteUserRolesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUserRolesRequest,
  output: DeleteUserRolesResponse,
  errors: [],
}));

/** Updates an existing targeting template. This method supports patch semantics. */
export interface PatchTargetingTemplatesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. RemarketingList ID. */
  id: string;
  /** Request body */
  body?: TargetingTemplate;
}

export const PatchTargetingTemplatesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(TargetingTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/targetingTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTargetingTemplatesRequest>;

export type PatchTargetingTemplatesResponse = TargetingTemplate;
export const PatchTargetingTemplatesResponse = TargetingTemplate;

export type PatchTargetingTemplatesError = CommonErrors;

export const patchTargetingTemplates: API.OperationMethod<PatchTargetingTemplatesRequest, PatchTargetingTemplatesResponse, PatchTargetingTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTargetingTemplatesRequest,
  output: PatchTargetingTemplatesResponse,
  errors: [],
}));

/** Gets one targeting template by ID. */
export interface GetTargetingTemplatesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Targeting template ID. */
  id: string;
}

export const GetTargetingTemplatesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/targetingTemplates/{targetingTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetTargetingTemplatesRequest>;

export type GetTargetingTemplatesResponse = TargetingTemplate;
export const GetTargetingTemplatesResponse = TargetingTemplate;

export type GetTargetingTemplatesError = CommonErrors;

export const getTargetingTemplates: API.OperationMethod<GetTargetingTemplatesRequest, GetTargetingTemplatesResponse, GetTargetingTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTargetingTemplatesRequest,
  output: GetTargetingTemplatesResponse,
  errors: [],
}));

/** Inserts a new targeting template. */
export interface InsertTargetingTemplatesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: TargetingTemplate;
}

export const InsertTargetingTemplatesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(TargetingTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/targetingTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertTargetingTemplatesRequest>;

export type InsertTargetingTemplatesResponse = TargetingTemplate;
export const InsertTargetingTemplatesResponse = TargetingTemplate;

export type InsertTargetingTemplatesError = CommonErrors;

export const insertTargetingTemplates: API.OperationMethod<InsertTargetingTemplatesRequest, InsertTargetingTemplatesResponse, InsertTargetingTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertTargetingTemplatesRequest,
  output: InsertTargetingTemplatesResponse,
  errors: [],
}));

/** Retrieves a list of targeting templates, optionally filtered. This method supports paging. */
export interface ListTargetingTemplatesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only targeting templates with these IDs. */
  ids?: string[];
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "template*2015" will return objects with names like "template June 2015", "template April 2015", or simply "template 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "template" will match objects with name "my template", "template 2015", or simply "template". */
  searchString?: string;
  /** Select only targeting templates with this advertiser ID. */
  advertiserId?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListTargetingTemplatesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  advertiserId: Schema.optional(Schema.String).pipe(T.HttpQuery("advertiserId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/targetingTemplates" }),
  svc,
) as unknown as Schema.Schema<ListTargetingTemplatesRequest>;

export type ListTargetingTemplatesResponse = TargetingTemplatesListResponse;
export const ListTargetingTemplatesResponse = TargetingTemplatesListResponse;

export type ListTargetingTemplatesError = CommonErrors;

export const listTargetingTemplates = API.makePaginated(() => ({
  input: ListTargetingTemplatesRequest,
  output: ListTargetingTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing targeting template. */
export interface UpdateTargetingTemplatesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: TargetingTemplate;
}

export const UpdateTargetingTemplatesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(TargetingTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/targetingTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateTargetingTemplatesRequest>;

export type UpdateTargetingTemplatesResponse = TargetingTemplate;
export const UpdateTargetingTemplatesResponse = TargetingTemplate;

export type UpdateTargetingTemplatesError = CommonErrors;

export const updateTargetingTemplates: API.OperationMethod<UpdateTargetingTemplatesRequest, UpdateTargetingTemplatesResponse, UpdateTargetingTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateTargetingTemplatesRequest,
  output: UpdateTargetingTemplatesResponse,
  errors: [],
}));

/** Updates an existing placement. This method supports patch semantics. */
export interface PatchPlacementsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Placement ID. */
  id: string;
  /** Request body */
  body?: Placement;
}

export const PatchPlacementsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(Placement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/placements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPlacementsRequest>;

export type PatchPlacementsResponse = Placement;
export const PatchPlacementsResponse = Placement;

export type PatchPlacementsError = CommonErrors;

export const patchPlacements: API.OperationMethod<PatchPlacementsRequest, PatchPlacementsResponse, PatchPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPlacementsRequest,
  output: PatchPlacementsResponse,
  errors: [],
}));

/** Generates tags for a placement. */
export interface GeneratetagsPlacementsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Generate tags for these placements. */
  placementIds?: string[];
  /** Generate placements belonging to this campaign. This is a required field. */
  campaignId?: string;
  /** Tag formats to generate for these placements. *Note:* PLACEMENT_TAG_STANDARD can only be generated for 1x1 placements. */
  tagFormats?: "PLACEMENT_TAG_STANDARD" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_IFRAME_ILAYER" | "PLACEMENT_TAG_INTERNAL_REDIRECT" | "PLACEMENT_TAG_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" | "PLACEMENT_TAG_CLICK_COMMANDS" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" | "PLACEMENT_TAG_TRACKING" | "PLACEMENT_TAG_TRACKING_IFRAME" | "PLACEMENT_TAG_TRACKING_JAVASCRIPT" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" | "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT" | (string & {})[];
}

export const GeneratetagsPlacementsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  placementIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("placementIds")),
  campaignId: Schema.optional(Schema.String).pipe(T.HttpQuery("campaignId")),
  tagFormats: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("tagFormats")),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/placements/generatetags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GeneratetagsPlacementsRequest>;

export type GeneratetagsPlacementsResponse = PlacementsGenerateTagsResponse;
export const GeneratetagsPlacementsResponse = PlacementsGenerateTagsResponse;

export type GeneratetagsPlacementsError = CommonErrors;

export const generatetagsPlacements: API.OperationMethod<GeneratetagsPlacementsRequest, GeneratetagsPlacementsResponse, GeneratetagsPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GeneratetagsPlacementsRequest,
  output: GeneratetagsPlacementsResponse,
  errors: [],
}));

/** Gets one placement by ID. */
export interface GetPlacementsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Placement ID. */
  id: string;
}

export const GetPlacementsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/placements/{placementsId}" }),
  svc,
) as unknown as Schema.Schema<GetPlacementsRequest>;

export type GetPlacementsResponse = Placement;
export const GetPlacementsResponse = Placement;

export type GetPlacementsError = CommonErrors;

export const getPlacements: API.OperationMethod<GetPlacementsRequest, GetPlacementsResponse, GetPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPlacementsRequest,
  output: GetPlacementsResponse,
  errors: [],
}));

/** Inserts a new placement. */
export interface InsertPlacementsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Placement;
}

export const InsertPlacementsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Placement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/placements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPlacementsRequest>;

export type InsertPlacementsResponse = Placement;
export const InsertPlacementsResponse = Placement;

export type InsertPlacementsError = CommonErrors;

export const insertPlacements: API.OperationMethod<InsertPlacementsRequest, InsertPlacementsResponse, InsertPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPlacementsRequest,
  output: InsertPlacementsResponse,
  errors: [],
}));

/** Retrieves a list of placements, possibly filtered. This method supports paging. */
export interface ListPlacementsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only placements with these IDs. */
  ids?: string[];
  /** Select only placements that belong to these advertisers. */
  advertiserIds?: string[];
  /** Select only placements that belong to these campaigns. */
  campaignIds?: string[];
  /** Select only placements that are associated with these sites. */
  siteIds?: string[];
  /** Select only placements that are associated with these directory sites. */
  directorySiteIds?: string[];
  /** Select only placements that are associated with these placement strategies. */
  placementStrategyIds?: string[];
  /** Select only placements that are associated with these content categories. */
  contentCategoryIds?: string[];
  /** Select only placements that are associated with these compatibilities. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on mobile devices for regular or interstitial ads respectively. APP and APP_INTERSTITIAL are for rendering in mobile apps. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. */
  compatibilities?: "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO" | (string & {})[];
  /** Select only placements that are associated with these sizes. */
  sizeIds?: string[];
  /** Select only placements with these pricing types. */
  pricingTypes?: "PRICING_TYPE_CPM" | "PRICING_TYPE_CPC" | "PRICING_TYPE_CPA" | "PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PRICING_TYPE_FLAT_RATE_CLICKS" | "PRICING_TYPE_CPM_ACTIVEVIEW" | (string & {})[];
  /** Select only placements that belong to these placement groups. */
  groupIds?: string[];
  /** Select only placements with this payment source. */
  paymentSource?: "PLACEMENT_AGENCY_PAID" | "PLACEMENT_PUBLISHER_PAID" | (string & {});
  /** Allows searching for placements by name or ID. Wildcards (*) are allowed. For example, "placement*2015" will return placements with names like "placement June 2015", "placement May 2015", or simply "placements 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "placement" will match placements with name "my placement", "placement 2015", or simply "placement" . */
  searchString?: string;
  /** Select only placements or placement groups whose end date is on or before the specified maxEndDate. The date should be formatted as "yyyy-MM-dd". */
  maxEndDate?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only placements with these active statuses. */
  activeStatus?: "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED" | (string & {})[];
  /** Select only placements or placement groups whose start date is on or before the specified maxStartDate. The date should be formatted as "yyyy-MM-dd". */
  maxStartDate?: string;
  /** Select only placements or placement groups whose end date is on or after the specified minEndDate. The date should be formatted as "yyyy-MM-dd". */
  minEndDate?: string;
  /** Select only placements or placement groups whose start date is on or after the specified minStartDate. The date should be formatted as "yyyy-MM-dd". */
  minStartDate?: string;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListPlacementsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserIds")),
  campaignIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("campaignIds")),
  siteIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("siteIds")),
  directorySiteIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("directorySiteIds")),
  placementStrategyIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("placementStrategyIds")),
  contentCategoryIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("contentCategoryIds")),
  compatibilities: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("compatibilities")),
  sizeIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sizeIds")),
  pricingTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("pricingTypes")),
  groupIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("groupIds")),
  paymentSource: Schema.optional(Schema.String).pipe(T.HttpQuery("paymentSource")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  maxEndDate: Schema.optional(Schema.String).pipe(T.HttpQuery("maxEndDate")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  activeStatus: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("activeStatus")),
  maxStartDate: Schema.optional(Schema.String).pipe(T.HttpQuery("maxStartDate")),
  minEndDate: Schema.optional(Schema.String).pipe(T.HttpQuery("minEndDate")),
  minStartDate: Schema.optional(Schema.String).pipe(T.HttpQuery("minStartDate")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/placements" }),
  svc,
) as unknown as Schema.Schema<ListPlacementsRequest>;

export type ListPlacementsResponse = PlacementsListResponse;
export const ListPlacementsResponse = PlacementsListResponse;

export type ListPlacementsError = CommonErrors;

export const listPlacements = API.makePaginated(() => ({
  input: ListPlacementsRequest,
  output: ListPlacementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing placement. */
export interface UpdatePlacementsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Placement;
}

export const UpdatePlacementsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Placement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/placements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePlacementsRequest>;

export type UpdatePlacementsResponse = Placement;
export const UpdatePlacementsResponse = Placement;

export type UpdatePlacementsError = CommonErrors;

export const updatePlacements: API.OperationMethod<UpdatePlacementsRequest, UpdatePlacementsResponse, UpdatePlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePlacementsRequest,
  output: UpdatePlacementsResponse,
  errors: [],
}));

/** Updates an existing placement group. This method supports patch semantics. */
export interface PatchPlacementGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Placement ID. */
  id: string;
  /** Request body */
  body?: PlacementGroup;
}

export const PatchPlacementGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(PlacementGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/placementGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPlacementGroupsRequest>;

export type PatchPlacementGroupsResponse = PlacementGroup;
export const PatchPlacementGroupsResponse = PlacementGroup;

export type PatchPlacementGroupsError = CommonErrors;

export const patchPlacementGroups: API.OperationMethod<PatchPlacementGroupsRequest, PatchPlacementGroupsResponse, PatchPlacementGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPlacementGroupsRequest,
  output: PatchPlacementGroupsResponse,
  errors: [],
}));

/** Gets one placement group by ID. */
export interface GetPlacementGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Placement group ID. */
  id: string;
}

export const GetPlacementGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/placementGroups/{placementGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetPlacementGroupsRequest>;

export type GetPlacementGroupsResponse = PlacementGroup;
export const GetPlacementGroupsResponse = PlacementGroup;

export type GetPlacementGroupsError = CommonErrors;

export const getPlacementGroups: API.OperationMethod<GetPlacementGroupsRequest, GetPlacementGroupsResponse, GetPlacementGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPlacementGroupsRequest,
  output: GetPlacementGroupsResponse,
  errors: [],
}));

/** Inserts a new placement group. */
export interface InsertPlacementGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: PlacementGroup;
}

export const InsertPlacementGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(PlacementGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/placementGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPlacementGroupsRequest>;

export type InsertPlacementGroupsResponse = PlacementGroup;
export const InsertPlacementGroupsResponse = PlacementGroup;

export type InsertPlacementGroupsError = CommonErrors;

export const insertPlacementGroups: API.OperationMethod<InsertPlacementGroupsRequest, InsertPlacementGroupsResponse, InsertPlacementGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPlacementGroupsRequest,
  output: InsertPlacementGroupsResponse,
  errors: [],
}));

/** Retrieves a list of placement groups, possibly filtered. This method supports paging. */
export interface ListPlacementGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only placement groups with these IDs. */
  ids?: string[];
  /** Select only placement groups that belong to these campaigns. */
  campaignIds?: string[];
  /** Select only placement groups that are associated with these sites. */
  siteIds?: string[];
  /** Select only placement groups that are associated with these directory sites. */
  directorySiteIds?: string[];
  /** Select only placement groups that are associated with these placement strategies. */
  placementStrategyIds?: string[];
  /** Select only placement groups that are associated with these content categories. */
  contentCategoryIds?: string[];
  /** Select only placement groups with these pricing types. */
  pricingTypes?: "PRICING_TYPE_CPM" | "PRICING_TYPE_CPC" | "PRICING_TYPE_CPA" | "PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PRICING_TYPE_FLAT_RATE_CLICKS" | "PRICING_TYPE_CPM_ACTIVEVIEW" | (string & {})[];
  /** Select only placement groups that belong to these advertisers. */
  advertiserIds?: string[];
  /** Select only placement groups belonging with this group type. A package is a simple group of placements that acts as a single pricing point for a group of tags. A roadblock is a group of placements that not only acts as a single pricing point but also assumes that all the tags in it will be served at the same time. A roadblock requires one of its assigned placements to be marked as primary for reporting. */
  placementGroupType?: "PLACEMENT_PACKAGE" | "PLACEMENT_ROADBLOCK" | (string & {});
  /** Allows searching for placement groups by name or ID. Wildcards (*) are allowed. For example, "placement*2015" will return placement groups with names like "placement group June 2015", "placement group May 2015", or simply "placements 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "placementgroup" will match placement groups with name "my placementgroup", "placementgroup 2015", or simply "placementgroup". */
  searchString?: string;
  /** Select only placements or placement groups whose end date is on or before the specified maxEndDate. The date should be formatted as "yyyy-MM-dd". */
  maxEndDate?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Select only placements with these active statuses. */
  activeStatus?: "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED" | (string & {})[];
  /** Select only placements or placement groups whose start date is on or before the specified maxStartDate. The date should be formatted as "yyyy-MM-dd". */
  maxStartDate?: string;
  /** Select only placements or placement groups whose end date is on or after the specified minEndDate. The date should be formatted as "yyyy-MM-dd". */
  minEndDate?: string;
  /** Select only placements or placement groups whose start date is on or after the specified minStartDate. The date should be formatted as "yyyy-MM-dd". */
  minStartDate?: string;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListPlacementGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  campaignIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("campaignIds")),
  siteIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("siteIds")),
  directorySiteIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("directorySiteIds")),
  placementStrategyIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("placementStrategyIds")),
  contentCategoryIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("contentCategoryIds")),
  pricingTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("pricingTypes")),
  advertiserIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("advertiserIds")),
  placementGroupType: Schema.optional(Schema.String).pipe(T.HttpQuery("placementGroupType")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  maxEndDate: Schema.optional(Schema.String).pipe(T.HttpQuery("maxEndDate")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  activeStatus: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("activeStatus")),
  maxStartDate: Schema.optional(Schema.String).pipe(T.HttpQuery("maxStartDate")),
  minEndDate: Schema.optional(Schema.String).pipe(T.HttpQuery("minEndDate")),
  minStartDate: Schema.optional(Schema.String).pipe(T.HttpQuery("minStartDate")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/placementGroups" }),
  svc,
) as unknown as Schema.Schema<ListPlacementGroupsRequest>;

export type ListPlacementGroupsResponse = PlacementGroupsListResponse;
export const ListPlacementGroupsResponse = PlacementGroupsListResponse;

export type ListPlacementGroupsError = CommonErrors;

export const listPlacementGroups = API.makePaginated(() => ({
  input: ListPlacementGroupsRequest,
  output: ListPlacementGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing placement group. */
export interface UpdatePlacementGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: PlacementGroup;
}

export const UpdatePlacementGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(PlacementGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/placementGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePlacementGroupsRequest>;

export type UpdatePlacementGroupsResponse = PlacementGroup;
export const UpdatePlacementGroupsResponse = PlacementGroup;

export type UpdatePlacementGroupsError = CommonErrors;

export const updatePlacementGroups: API.OperationMethod<UpdatePlacementGroupsRequest, UpdatePlacementGroupsResponse, UpdatePlacementGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePlacementGroupsRequest,
  output: UpdatePlacementGroupsResponse,
  errors: [],
}));

/** Updates an existing placement strategy. This method supports patch semantics. */
export interface PatchPlacementStrategiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. PlacementStrategy ID. */
  id: string;
  /** Request body */
  body?: PlacementStrategy;
}

export const PatchPlacementStrategiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpQuery("id")),
  body: Schema.optional(PlacementStrategy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "userprofiles/{userprofilesId}/placementStrategies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPlacementStrategiesRequest>;

export type PatchPlacementStrategiesResponse = PlacementStrategy;
export const PatchPlacementStrategiesResponse = PlacementStrategy;

export type PatchPlacementStrategiesError = CommonErrors;

export const patchPlacementStrategies: API.OperationMethod<PatchPlacementStrategiesRequest, PatchPlacementStrategiesResponse, PatchPlacementStrategiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPlacementStrategiesRequest,
  output: PatchPlacementStrategiesResponse,
  errors: [],
}));

/** Deletes an existing placement strategy. */
export interface DeletePlacementStrategiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Placement strategy ID. */
  id: string;
}

export const DeletePlacementStrategiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{userprofilesId}/placementStrategies/{placementStrategiesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePlacementStrategiesRequest>;

export interface DeletePlacementStrategiesResponse {}
export const DeletePlacementStrategiesResponse: Schema.Schema<DeletePlacementStrategiesResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePlacementStrategiesResponse>;

export type DeletePlacementStrategiesError = CommonErrors;

export const deletePlacementStrategies: API.OperationMethod<DeletePlacementStrategiesRequest, DeletePlacementStrategiesResponse, DeletePlacementStrategiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePlacementStrategiesRequest,
  output: DeletePlacementStrategiesResponse,
  errors: [],
}));

/** Gets one placement strategy by ID. */
export interface GetPlacementStrategiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Placement strategy ID. */
  id: string;
}

export const GetPlacementStrategiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/placementStrategies/{placementStrategiesId}" }),
  svc,
) as unknown as Schema.Schema<GetPlacementStrategiesRequest>;

export type GetPlacementStrategiesResponse = PlacementStrategy;
export const GetPlacementStrategiesResponse = PlacementStrategy;

export type GetPlacementStrategiesError = CommonErrors;

export const getPlacementStrategies: API.OperationMethod<GetPlacementStrategiesRequest, GetPlacementStrategiesResponse, GetPlacementStrategiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPlacementStrategiesRequest,
  output: GetPlacementStrategiesResponse,
  errors: [],
}));

/** Inserts a new placement strategy. */
export interface InsertPlacementStrategiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: PlacementStrategy;
}

export const InsertPlacementStrategiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(PlacementStrategy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/placementStrategies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPlacementStrategiesRequest>;

export type InsertPlacementStrategiesResponse = PlacementStrategy;
export const InsertPlacementStrategiesResponse = PlacementStrategy;

export type InsertPlacementStrategiesError = CommonErrors;

export const insertPlacementStrategies: API.OperationMethod<InsertPlacementStrategiesRequest, InsertPlacementStrategiesResponse, InsertPlacementStrategiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPlacementStrategiesRequest,
  output: InsertPlacementStrategiesResponse,
  errors: [],
}));

/** Retrieves a list of placement strategies, possibly filtered. This method supports paging. */
export interface ListPlacementStrategiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only placement strategies with these IDs. */
  ids?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "placementstrategy*2015" will return objects with names like "placementstrategy June 2015", "placementstrategy April 2015", or simply "placementstrategy 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "placementstrategy" will match objects with name "my placementstrategy", "placementstrategy 2015", or simply "placementstrategy". */
  searchString?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListPlacementStrategiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  searchString: Schema.optional(Schema.String).pipe(T.HttpQuery("searchString")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/placementStrategies" }),
  svc,
) as unknown as Schema.Schema<ListPlacementStrategiesRequest>;

export type ListPlacementStrategiesResponse = PlacementStrategiesListResponse;
export const ListPlacementStrategiesResponse = PlacementStrategiesListResponse;

export type ListPlacementStrategiesError = CommonErrors;

export const listPlacementStrategies = API.makePaginated(() => ({
  input: ListPlacementStrategiesRequest,
  output: ListPlacementStrategiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing placement strategy. */
export interface UpdatePlacementStrategiesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: PlacementStrategy;
}

export const UpdatePlacementStrategiesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(PlacementStrategy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{userprofilesId}/placementStrategies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePlacementStrategiesRequest>;

export type UpdatePlacementStrategiesResponse = PlacementStrategy;
export const UpdatePlacementStrategiesResponse = PlacementStrategy;

export type UpdatePlacementStrategiesError = CommonErrors;

export const updatePlacementStrategies: API.OperationMethod<UpdatePlacementStrategiesRequest, UpdatePlacementStrategiesResponse, UpdatePlacementStrategiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePlacementStrategiesRequest,
  output: UpdatePlacementStrategiesResponse,
  errors: [],
}));

/** Gets one platform type by ID. */
export interface GetPlatformTypesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Platform type ID. */
  id: string;
}

export const GetPlatformTypesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/platformTypes/{platformTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetPlatformTypesRequest>;

export type GetPlatformTypesResponse = PlatformType;
export const GetPlatformTypesResponse = PlatformType;

export type GetPlatformTypesError = CommonErrors;

export const getPlatformTypes: API.OperationMethod<GetPlatformTypesRequest, GetPlatformTypesResponse, GetPlatformTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPlatformTypesRequest,
  output: GetPlatformTypesResponse,
  errors: [],
}));

/** Retrieves a list of platform types. */
export interface ListPlatformTypesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListPlatformTypesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/platformTypes" }),
  svc,
) as unknown as Schema.Schema<ListPlatformTypesRequest>;

export type ListPlatformTypesResponse = PlatformTypesListResponse;
export const ListPlatformTypesResponse = PlatformTypesListResponse;

export type ListPlatformTypesError = CommonErrors;

export const listPlatformTypes: API.OperationMethod<ListPlatformTypesRequest, ListPlatformTypesResponse, ListPlatformTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListPlatformTypesRequest,
  output: ListPlatformTypesResponse,
  errors: [],
}));

/** Gets one postal code by ID. */
export interface GetPostalCodesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Postal code ID. */
  code: string;
}

export const GetPostalCodesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  code: Schema.String.pipe(T.HttpPath("code")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/postalCodes/{postalCodesId}" }),
  svc,
) as unknown as Schema.Schema<GetPostalCodesRequest>;

export type GetPostalCodesResponse = PostalCode;
export const GetPostalCodesResponse = PostalCode;

export type GetPostalCodesError = CommonErrors;

export const getPostalCodes: API.OperationMethod<GetPostalCodesRequest, GetPostalCodesResponse, GetPostalCodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPostalCodesRequest,
  output: GetPostalCodesResponse,
  errors: [],
}));

/** Retrieves a list of postal codes. */
export interface ListPostalCodesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListPostalCodesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/postalCodes" }),
  svc,
) as unknown as Schema.Schema<ListPostalCodesRequest>;

export type ListPostalCodesResponse = PostalCodesListResponse;
export const ListPostalCodesResponse = PostalCodesListResponse;

export type ListPostalCodesError = CommonErrors;

export const listPostalCodes: API.OperationMethod<ListPostalCodesRequest, ListPostalCodesResponse, ListPostalCodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListPostalCodesRequest,
  output: ListPostalCodesResponse,
  errors: [],
}));

/** Retrieves a list of regions. */
export interface ListRegionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListRegionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/regions" }),
  svc,
) as unknown as Schema.Schema<ListRegionsRequest>;

export type ListRegionsResponse = RegionsListResponse;
export const ListRegionsResponse = RegionsListResponse;

export type ListRegionsError = CommonErrors;

export const listRegions: API.OperationMethod<ListRegionsRequest, ListRegionsResponse, ListRegionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse,
  errors: [],
}));

/** Gets one remarketing list by ID. */
export interface GetTargetableRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Remarketing list ID. */
  id: string;
}

export const GetTargetableRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/targetableRemarketingLists/{targetableRemarketingListsId}" }),
  svc,
) as unknown as Schema.Schema<GetTargetableRemarketingListsRequest>;

export type GetTargetableRemarketingListsResponse = TargetableRemarketingList;
export const GetTargetableRemarketingListsResponse = TargetableRemarketingList;

export type GetTargetableRemarketingListsError = CommonErrors;

export const getTargetableRemarketingLists: API.OperationMethod<GetTargetableRemarketingListsRequest, GetTargetableRemarketingListsResponse, GetTargetableRemarketingListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTargetableRemarketingListsRequest,
  output: GetTargetableRemarketingListsResponse,
  errors: [],
}));

/** Retrieves a list of targetable remarketing lists, possibly filtered. This method supports paging. */
export interface ListTargetableRemarketingListsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Required. Select only targetable remarketing lists targetable by these advertisers. */
  advertiserId: string;
  /** Select only active or only inactive targetable remarketing lists. */
  active?: boolean;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "remarketing list*2015" will return objects with names like "remarketing list June 2015", "remarketing list April 2015", or simply "remarketing list 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "remarketing list" will match objects with name "my remarketing list", "remarketing list 2015", or simply "remarketing list". */
  name?: string;
  /** Value of the nextPageToken from the previous result page. */
  pageToken?: string;
  /** Field by which to sort the list. */
  sortField?: "ID" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListTargetableRemarketingListsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  advertiserId: Schema.String.pipe(T.HttpQuery("advertiserId")),
  active: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("active")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/targetableRemarketingLists" }),
  svc,
) as unknown as Schema.Schema<ListTargetableRemarketingListsRequest>;

export type ListTargetableRemarketingListsResponse = TargetableRemarketingListsListResponse;
export const ListTargetableRemarketingListsResponse = TargetableRemarketingListsListResponse;

export type ListTargetableRemarketingListsError = CommonErrors;

export const listTargetableRemarketingLists = API.makePaginated(() => ({
  input: ListTargetableRemarketingListsRequest,
  output: ListTargetableRemarketingListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a report by its ID. */
export interface DeleteReportsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** The ID of the report. */
  reportId: string;
}

export const DeleteReportsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
}).pipe(
  T.Http({ method: "DELETE", path: "userprofiles/{profileId}/reports/{reportId}" }),
  svc,
) as unknown as Schema.Schema<DeleteReportsRequest>;

export interface DeleteReportsResponse {}
export const DeleteReportsResponse: Schema.Schema<DeleteReportsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteReportsResponse>;

export type DeleteReportsError = CommonErrors;

export const deleteReports: API.OperationMethod<DeleteReportsRequest, DeleteReportsResponse, DeleteReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteReportsRequest,
  output: DeleteReportsResponse,
  errors: [],
}));

/** Retrieves a report by its ID. */
export interface GetReportsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** The ID of the report. */
  reportId: string;
}

export const GetReportsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}/reports/{reportId}" }),
  svc,
) as unknown as Schema.Schema<GetReportsRequest>;

export type GetReportsResponse = Report;
export const GetReportsResponse = Report;

export type GetReportsError = CommonErrors;

export const getReports: API.OperationMethod<GetReportsRequest, GetReportsResponse, GetReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetReportsRequest,
  output: GetReportsResponse,
  errors: [],
}));

/** Creates a report. */
export interface InsertReportsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** Request body */
  body?: Report;
}

export const InsertReportsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Report).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{profileId}/reports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertReportsRequest>;

export type InsertReportsResponse = Report;
export const InsertReportsResponse = Report;

export type InsertReportsError = CommonErrors;

export const insertReports: API.OperationMethod<InsertReportsRequest, InsertReportsResponse, InsertReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertReportsRequest,
  output: InsertReportsResponse,
  errors: [],
}));

/** Retrieves list of reports. */
export interface ListReportsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The value of the nextToken from the previous result page. */
  pageToken?: string;
  /** The scope that defines which results are returned. */
  scope?: "ALL" | "MINE" | (string & {});
  /** The field by which to sort the list. */
  sortField?: "ID" | "LAST_MODIFIED_TIME" | "NAME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListReportsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListReportsRequest>;

export type ListReportsResponse = ReportList;
export const ListReportsResponse = ReportList;

export type ListReportsError = CommonErrors;

export const listReports = API.makePaginated(() => ({
  input: ListReportsRequest,
  output: ListReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Runs a report. */
export interface RunReportsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** The ID of the report. */
  reportId: string;
  /** If set and true, tries to run the report synchronously. */
  synchronous?: boolean;
}

export const RunReportsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  synchronous: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("synchronous")),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{profileId}/reports/{reportId}/run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunReportsRequest>;

export type RunReportsResponse = File;
export const RunReportsResponse = File;

export type RunReportsError = CommonErrors;

export const runReports: API.OperationMethod<RunReportsRequest, RunReportsResponse, RunReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunReportsRequest,
  output: RunReportsResponse,
  errors: [],
}));

/** Updates a report. */
export interface UpdateReportsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** The ID of the report. */
  reportId: string;
  /** Request body */
  body?: Report;
}

export const UpdateReportsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  body: Schema.optional(Report).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "userprofiles/{profileId}/reports/{reportId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateReportsRequest>;

export type UpdateReportsResponse = Report;
export const UpdateReportsResponse = Report;

export type UpdateReportsError = CommonErrors;

export const updateReports: API.OperationMethod<UpdateReportsRequest, UpdateReportsResponse, UpdateReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateReportsRequest,
  output: UpdateReportsResponse,
  errors: [],
}));

/** Retrieves a report file by its report ID and file ID. This method supports media download. */
export interface GetReportsFilesRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** The ID of the report. */
  reportId: string;
  /** The ID of the report file. */
  fileId: string;
}

export const GetReportsFilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  fileId: Schema.String.pipe(T.HttpPath("fileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}/reports/{reportId}/files/{fileId}" }),
  svc,
) as unknown as Schema.Schema<GetReportsFilesRequest>;

export type GetReportsFilesResponse = File;
export const GetReportsFilesResponse = File;

export type GetReportsFilesError = CommonErrors;

export const getReportsFiles: API.OperationMethod<GetReportsFilesRequest, GetReportsFilesResponse, GetReportsFilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetReportsFilesRequest,
  output: GetReportsFilesResponse,
  errors: [],
}));

/** Lists files for a report. */
export interface ListReportsFilesRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** The ID of the parent report. */
  reportId: string;
  /** The field by which to sort the list. */
  sortField?: "ID" | "LAST_MODIFIED_TIME" | (string & {});
  /** Order of sorted results. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The value of the nextToken from the previous result page. */
  pageToken?: string;
}

export const ListReportsFilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  reportId: Schema.String.pipe(T.HttpPath("reportId")),
  sortField: Schema.optional(Schema.String).pipe(T.HttpQuery("sortField")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}/reports/{reportId}/files" }),
  svc,
) as unknown as Schema.Schema<ListReportsFilesRequest>;

export type ListReportsFilesResponse = FileList;
export const ListReportsFilesResponse = FileList;

export type ListReportsFilesError = CommonErrors;

export const listReportsFiles = API.makePaginated(() => ({
  input: ListReportsFilesRequest,
  output: ListReportsFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Returns the fields that are compatible to be selected in the respective sections of a report criteria, given the fields already selected in the input report and user permissions. */
export interface QueryReportsCompatibleFieldsRequest {
  /** The Campaign Manager 360 user profile ID. */
  profileId: string;
  /** Request body */
  body?: Report;
}

export const QueryReportsCompatibleFieldsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Report).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{profileId}/reports/compatiblefields/query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryReportsCompatibleFieldsRequest>;

export type QueryReportsCompatibleFieldsResponse = CompatibleFields;
export const QueryReportsCompatibleFieldsResponse = CompatibleFields;

export type QueryReportsCompatibleFieldsError = CommonErrors;

export const queryReportsCompatibleFields: API.OperationMethod<QueryReportsCompatibleFieldsRequest, QueryReportsCompatibleFieldsResponse, QueryReportsCompatibleFieldsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryReportsCompatibleFieldsRequest,
  output: QueryReportsCompatibleFieldsResponse,
  errors: [],
}));

/** Gets one size by ID. */
export interface GetSizesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Size ID. */
  id: string;
}

export const GetSizesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/sizes/{sizesId}" }),
  svc,
) as unknown as Schema.Schema<GetSizesRequest>;

export type GetSizesResponse = Size;
export const GetSizesResponse = Size;

export type GetSizesError = CommonErrors;

export const getSizes: API.OperationMethod<GetSizesRequest, GetSizesResponse, GetSizesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSizesRequest,
  output: GetSizesResponse,
  errors: [],
}));

/** Inserts a new size. */
export interface InsertSizesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: Size;
}

export const InsertSizesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Size).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userprofiles/{userprofilesId}/sizes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertSizesRequest>;

export type InsertSizesResponse = Size;
export const InsertSizesResponse = Size;

export type InsertSizesError = CommonErrors;

export const insertSizes: API.OperationMethod<InsertSizesRequest, InsertSizesResponse, InsertSizesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertSizesRequest,
  output: InsertSizesResponse,
  errors: [],
}));

/** Retrieves a list of sizes, possibly filtered. Retrieved sizes are globally unique and may include values not currently in use by your account. Due to this, the list of sizes returned by this method may differ from the list seen in the Trafficking UI. */
export interface ListSizesRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only sizes with these IDs. */
  ids?: string[];
  /** Select only sizes with this height. */
  height?: number;
  /** Select only IAB standard sizes. */
  iabStandard?: boolean;
  /** Select only sizes with this width. */
  width?: number;
}

export const ListSizesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
  height: Schema.optional(Schema.Number).pipe(T.HttpQuery("height")),
  iabStandard: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("iabStandard")),
  width: Schema.optional(Schema.Number).pipe(T.HttpQuery("width")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/sizes" }),
  svc,
) as unknown as Schema.Schema<ListSizesRequest>;

export type ListSizesResponse = SizesListResponse;
export const ListSizesResponse = SizesListResponse;

export type ListSizesError = CommonErrors;

export const listSizes: API.OperationMethod<ListSizesRequest, ListSizesResponse, ListSizesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListSizesRequest,
  output: ListSizesResponse,
  errors: [],
}));

/** Inserts a new studio creative asset. */
export interface InsertStudioCreativeAssetsRequest {
  /** Request body */
  body?: DfareportingStudioCreativeAssetsInsertRequest;
}

export const InsertStudioCreativeAssetsRequest = Schema.Struct({
  body: Schema.optional(DfareportingStudioCreativeAssetsInsertRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "studio/creativeAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertStudioCreativeAssetsRequest>;

export type InsertStudioCreativeAssetsResponse = StudioCreativeAssetsResponse;
export const InsertStudioCreativeAssetsResponse = StudioCreativeAssetsResponse;

export type InsertStudioCreativeAssetsError = CommonErrors;

export const insertStudioCreativeAssets: API.OperationMethod<InsertStudioCreativeAssetsRequest, InsertStudioCreativeAssetsResponse, InsertStudioCreativeAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertStudioCreativeAssetsRequest,
  output: InsertStudioCreativeAssetsResponse,
  errors: [],
}));

/** Gets a studio creative by ID. */
export interface GetStudioCreativesRequest {
  /** Required. Studio creative ID. */
  studioCreativeId: string;
}

export const GetStudioCreativesRequest = Schema.Struct({
  studioCreativeId: Schema.String.pipe(T.HttpPath("studioCreativeId")),
}).pipe(
  T.Http({ method: "GET", path: "studio/creatives/{creativesId}" }),
  svc,
) as unknown as Schema.Schema<GetStudioCreativesRequest>;

export type GetStudioCreativesResponse = StudioCreative;
export const GetStudioCreativesResponse = StudioCreative;

export type GetStudioCreativesError = CommonErrors;

export const getStudioCreatives: API.OperationMethod<GetStudioCreativesRequest, GetStudioCreativesResponse, GetStudioCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStudioCreativesRequest,
  output: GetStudioCreativesResponse,
  errors: [],
}));

/** Inserts a new studio creative. */
export interface InsertStudioCreativesRequest {
  /** Request body */
  body?: StudioCreative;
}

export const InsertStudioCreativesRequest = Schema.Struct({
  body: Schema.optional(StudioCreative).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "studio/creatives", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertStudioCreativesRequest>;

export type InsertStudioCreativesResponse = StudioCreative;
export const InsertStudioCreativesResponse = StudioCreative;

export type InsertStudioCreativesError = CommonErrors;

export const insertStudioCreatives: API.OperationMethod<InsertStudioCreativesRequest, InsertStudioCreativesResponse, InsertStudioCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertStudioCreativesRequest,
  output: InsertStudioCreativesResponse,
  errors: [],
}));

/** Publish for a studio creative. */
export interface PublishStudioCreativesRequest {
  /** Required. Studio creative ID. */
  studioCreativeId: string;
}

export const PublishStudioCreativesRequest = Schema.Struct({
  studioCreativeId: Schema.String.pipe(T.HttpPath("studioCreativeId")),
}).pipe(
  T.Http({ method: "POST", path: "studio/creatives/{creativesId}/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishStudioCreativesRequest>;

export interface PublishStudioCreativesResponse {}
export const PublishStudioCreativesResponse: Schema.Schema<PublishStudioCreativesResponse> = Schema.Struct({}) as any as Schema.Schema<PublishStudioCreativesResponse>;

export type PublishStudioCreativesError = CommonErrors;

export const publishStudioCreatives: API.OperationMethod<PublishStudioCreativesRequest, PublishStudioCreativesResponse, PublishStudioCreativesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishStudioCreativesRequest,
  output: PublishStudioCreativesResponse,
  errors: [],
}));

/** Gets one TvCampaignDetail by ID. */
export interface GetTvCampaignDetailsRequest {
  /** Required. User profile ID associated with this request. */
  profileId: string;
  /** Required. TV Campaign ID. */
  id: string;
  /** Required. Account ID associated with this request. */
  accountId?: string;
  /** Optional. Country Dart ID. If not specified, defaults to 256 (US). */
  countryDartId?: string;
  /** Optional. TV data provider. If not specified, defaults to `COMSCORE_NATIONAL_US`. */
  tvDataProvider?: "INVALID_TV_DATA_PROVIDER" | "IBOPE_AR" | "IBOPE_BR" | "IBOPE_CL" | "IBOPE_CO" | "TNS_VN" | "COMSCORE_NATIONAL_US" | "COMSCORE_CA" | "SAMBA_AU" | (string & {});
}

export const GetTvCampaignDetailsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
  accountId: Schema.optional(Schema.String).pipe(T.HttpQuery("accountId")),
  countryDartId: Schema.optional(Schema.String).pipe(T.HttpQuery("countryDartId")),
  tvDataProvider: Schema.optional(Schema.String).pipe(T.HttpQuery("tvDataProvider")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/tvCampaignDetails/{tvCampaignDetailsId}" }),
  svc,
) as unknown as Schema.Schema<GetTvCampaignDetailsRequest>;

export type GetTvCampaignDetailsResponse = TvCampaignDetail;
export const GetTvCampaignDetailsResponse = TvCampaignDetail;

export type GetTvCampaignDetailsError = CommonErrors;

export const getTvCampaignDetails: API.OperationMethod<GetTvCampaignDetailsRequest, GetTvCampaignDetailsResponse, GetTvCampaignDetailsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTvCampaignDetailsRequest,
  output: GetTvCampaignDetailsResponse,
  errors: [],
}));

/** Retrieves a list of TV campaign summaries. */
export interface ListTvCampaignSummariesRequest {
  /** Required. User profile ID associated with this request. */
  profileId: string;
  /** Required. Account ID associated with this request. */
  accountId?: string;
  /** Required. Search string to filter the list of TV campaign summaries. Matches any substring. Required field. */
  name?: string;
  /** Optional. Country Dart ID. If not specified, defaults to 256 (US). */
  countryDartId?: string;
  /** Optional. TV data provider. If not specified, defaults to `COMSCORE_NATIONAL_US`. */
  tvDataProvider?: "INVALID_TV_DATA_PROVIDER" | "IBOPE_AR" | "IBOPE_BR" | "IBOPE_CL" | "IBOPE_CO" | "TNS_VN" | "COMSCORE_NATIONAL_US" | "COMSCORE_CA" | "SAMBA_AU" | (string & {});
}

export const ListTvCampaignSummariesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.optional(Schema.String).pipe(T.HttpQuery("accountId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  countryDartId: Schema.optional(Schema.String).pipe(T.HttpQuery("countryDartId")),
  tvDataProvider: Schema.optional(Schema.String).pipe(T.HttpQuery("tvDataProvider")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/tvCampaignSummaries" }),
  svc,
) as unknown as Schema.Schema<ListTvCampaignSummariesRequest>;

export type ListTvCampaignSummariesResponse = TvCampaignSummariesListResponse;
export const ListTvCampaignSummariesResponse = TvCampaignSummariesListResponse;

export type ListTvCampaignSummariesError = CommonErrors;

export const listTvCampaignSummaries: API.OperationMethod<ListTvCampaignSummariesRequest, ListTvCampaignSummariesResponse, ListTvCampaignSummariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListTvCampaignSummariesRequest,
  output: ListTvCampaignSummariesResponse,
  errors: [],
}));

/** Gets one user profile by ID. */
export interface GetUserProfilesRequest {
  /** The user profile ID. */
  profileId: string;
}

export const GetUserProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{profileId}" }),
  svc,
) as unknown as Schema.Schema<GetUserProfilesRequest>;

export type GetUserProfilesResponse = UserProfile;
export const GetUserProfilesResponse = UserProfile;

export type GetUserProfilesError = CommonErrors;

export const getUserProfiles: API.OperationMethod<GetUserProfilesRequest, GetUserProfilesResponse, GetUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserProfilesRequest,
  output: GetUserProfilesResponse,
  errors: [],
}));

/** Retrieves list of user profiles for a user. */
export interface ListUserProfilesRequest {
}

export const ListUserProfilesRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "userprofiles" }),
  svc,
) as unknown as Schema.Schema<ListUserProfilesRequest>;

export type ListUserProfilesResponse = UserProfileList;
export const ListUserProfilesResponse = UserProfileList;

export type ListUserProfilesError = CommonErrors;

export const listUserProfiles: API.OperationMethod<ListUserProfilesRequest, ListUserProfilesResponse, ListUserProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListUserProfilesRequest,
  output: ListUserProfilesResponse,
  errors: [],
}));

/** Gets one user role permission group by ID. */
export interface GetUserRolePermissionGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** User role permission group ID. */
  id: string;
}

export const GetUserRolePermissionGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/userRolePermissionGroups/{userRolePermissionGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetUserRolePermissionGroupsRequest>;

export type GetUserRolePermissionGroupsResponse = UserRolePermissionGroup;
export const GetUserRolePermissionGroupsResponse = UserRolePermissionGroup;

export type GetUserRolePermissionGroupsError = CommonErrors;

export const getUserRolePermissionGroups: API.OperationMethod<GetUserRolePermissionGroupsRequest, GetUserRolePermissionGroupsResponse, GetUserRolePermissionGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserRolePermissionGroupsRequest,
  output: GetUserRolePermissionGroupsResponse,
  errors: [],
}));

/** Gets a list of all supported user role permission groups. */
export interface ListUserRolePermissionGroupsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListUserRolePermissionGroupsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/userRolePermissionGroups" }),
  svc,
) as unknown as Schema.Schema<ListUserRolePermissionGroupsRequest>;

export type ListUserRolePermissionGroupsResponse = UserRolePermissionGroupsListResponse;
export const ListUserRolePermissionGroupsResponse = UserRolePermissionGroupsListResponse;

export type ListUserRolePermissionGroupsError = CommonErrors;

export const listUserRolePermissionGroups: API.OperationMethod<ListUserRolePermissionGroupsRequest, ListUserRolePermissionGroupsResponse, ListUserRolePermissionGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListUserRolePermissionGroupsRequest,
  output: ListUserRolePermissionGroupsResponse,
  errors: [],
}));

/** Gets one user role permission by ID. */
export interface GetUserRolePermissionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** User role permission ID. */
  id: string;
}

export const GetUserRolePermissionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/userRolePermissions/{userRolePermissionsId}" }),
  svc,
) as unknown as Schema.Schema<GetUserRolePermissionsRequest>;

export type GetUserRolePermissionsResponse = UserRolePermission;
export const GetUserRolePermissionsResponse = UserRolePermission;

export type GetUserRolePermissionsError = CommonErrors;

export const getUserRolePermissions: API.OperationMethod<GetUserRolePermissionsRequest, GetUserRolePermissionsResponse, GetUserRolePermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserRolePermissionsRequest,
  output: GetUserRolePermissionsResponse,
  errors: [],
}));

/** Gets a list of user role permissions, possibly filtered. */
export interface ListUserRolePermissionsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Select only user role permissions with these IDs. */
  ids?: string[];
}

export const ListUserRolePermissionsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  ids: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("ids")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/userRolePermissions" }),
  svc,
) as unknown as Schema.Schema<ListUserRolePermissionsRequest>;

export type ListUserRolePermissionsResponse = UserRolePermissionsListResponse;
export const ListUserRolePermissionsResponse = UserRolePermissionsListResponse;

export type ListUserRolePermissionsError = CommonErrors;

export const listUserRolePermissions: API.OperationMethod<ListUserRolePermissionsRequest, ListUserRolePermissionsResponse, ListUserRolePermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListUserRolePermissionsRequest,
  output: ListUserRolePermissionsResponse,
  errors: [],
}));

/** Gets one video format by ID. */
export interface GetVideoFormatsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
  /** Video format ID. */
  id: number;
}

export const GetVideoFormatsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  id: Schema.Number.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/videoFormats/{videoFormatsId}" }),
  svc,
) as unknown as Schema.Schema<GetVideoFormatsRequest>;

export type GetVideoFormatsResponse = VideoFormat;
export const GetVideoFormatsResponse = VideoFormat;

export type GetVideoFormatsError = CommonErrors;

export const getVideoFormats: API.OperationMethod<GetVideoFormatsRequest, GetVideoFormatsResponse, GetVideoFormatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVideoFormatsRequest,
  output: GetVideoFormatsResponse,
  errors: [],
}));

/** Lists available video formats. */
export interface ListVideoFormatsRequest {
  /** User profile ID associated with this request. */
  profileId: string;
}

export const ListVideoFormatsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({ method: "GET", path: "userprofiles/{userprofilesId}/videoFormats" }),
  svc,
) as unknown as Schema.Schema<ListVideoFormatsRequest>;

export type ListVideoFormatsResponse = VideoFormatsListResponse;
export const ListVideoFormatsResponse = VideoFormatsListResponse;

export type ListVideoFormatsError = CommonErrors;

export const listVideoFormats: API.OperationMethod<ListVideoFormatsRequest, ListVideoFormatsResponse, ListVideoFormatsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVideoFormatsRequest,
  output: ListVideoFormatsResponse,
  errors: [],
}));

