// ==========================================================================
// Google Analytics API (analytics v3)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "analytics",
  version: "v3",
  rootUrl: "https://analytics.googleapis.com/",
  servicePath: "analytics/v3/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Segment {
  /** Type for a segment. Possible values are "BUILT_IN" or "CUSTOM". */
  type?: string;
  /** Resource type for Analytics segment. */
  kind?: string;
  /** Time the segment was last modified. */
  updated?: string;
  /** Link for this segment. */
  selfLink?: string;
  /** Segment definition. */
  definition?: string;
  /** Segment ID. Can be used with the 'segment' parameter in Core Reporting API. */
  segmentId?: string;
  /** Time the segment was created. */
  created?: string;
  /** Segment name. */
  name?: string;
  /** Segment ID. */
  id?: string;
}

export const Segment: Schema.Schema<Segment> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    definition: Schema.optional(Schema.String),
    segmentId: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Segment" }) as any as Schema.Schema<Segment>;

export interface Segments {
  /** A list of segments. */
  items?: Array<Segment>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Link to next page for this segment collection. */
  nextLink?: string;
  /** Link to previous page for this segment collection. */
  previousLink?: string;
  /** Collection type for segments. */
  kind?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Segments: Schema.Schema<Segments> = Schema.suspend(() =>
  Schema.Struct({
    items: Schema.optional(Schema.Array(Segment)),
    totalResults: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    username: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Segments" }) as any as Schema.Schema<Segments>;

export interface Upload {
  /** Upload status. Possible values: PENDING, COMPLETED, FAILED, DELETING, DELETED. */
  status?: string;
  /** A unique ID for this upload. */
  id?: string;
  /** Time this file is uploaded. */
  uploadTime?: string;
  /** Account Id to which this upload belongs. */
  accountId?: string;
  /** Resource type for Analytics upload. */
  kind?: string;
  /** Custom data source Id to which this data import belongs. */
  customDataSourceId?: string;
  /** Data import errors collection. */
  errors?: Array<string>;
}

export const Upload: Schema.Schema<Upload> = Schema.suspend(() =>
  Schema.Struct({
    status: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    uploadTime: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    customDataSourceId: Schema.optional(Schema.String),
    errors: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Upload" }) as any as Schema.Schema<Upload>;

export interface Uploads {
  /** Collection type. */
  kind?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** A list of uploads. */
  items?: Array<Upload>;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** Link to next page for this upload collection. */
  nextLink?: string;
  /** Link to previous page for this upload collection. */
  previousLink?: string;
}

export const Uploads: Schema.Schema<Uploads> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    items: Schema.optional(Schema.Array(Upload)),
    totalResults: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Uploads" }) as any as Schema.Schema<Uploads>;

export interface Webproperty {
  /** Internal ID for this web property. */
  internalWebPropertyId?: string;
  /** Resource type for Analytics WebProperty. */
  kind?: string;
  /** Permissions the user has for this web property. */
  permissions?: { effective?: Array<string> };
  /** Website url for this web property. */
  websiteUrl?: string;
  /** Parent link for this web property. Points to the account to which this web property belongs. */
  parentLink?: { href?: string; type?: string };
  /** Time this web property was created. */
  created?: string;
  /** Name of this web property. */
  name?: string;
  /** Default view (profile) ID. */
  defaultProfileId?: string;
  /** The industry vertical/category selected for this web property. */
  industryVertical?: string;
  /** Child link for this web property. Points to the list of views (profiles) for this web property. */
  childLink?: { href?: string; type?: string };
  /** The length of time for which user and event data is retained. This property cannot be set on insert. */
  dataRetentionTtl?: string;
  /** View (Profile) count for this web property. */
  profileCount?: number;
  /** Indicates whether this web property is starred or not. */
  starred?: boolean;
  /** Link for this web property. */
  selfLink?: string;
  /** Level for this web property. Possible values are STANDARD or PREMIUM. */
  level?: string;
  /** Time this web property was last modified. */
  updated?: string;
  /** Account ID to which this web property belongs. */
  accountId?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  id?: string;
  /** Set to true to reset the retention period of the user identifier with each new event from that user (thus setting the expiration date to current time plus retention period). Set to false to delete data associated with the user identifier automatically after the rentention period. This property cannot be set on insert. */
  dataRetentionResetOnNewActivity?: boolean;
}

export const Webproperty: Schema.Schema<Webproperty> = Schema.suspend(() =>
  Schema.Struct({
    internalWebPropertyId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    permissions: Schema.optional(
      Schema.Struct({
        effective: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    websiteUrl: Schema.optional(Schema.String),
    parentLink: Schema.optional(
      Schema.Struct({
        href: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    created: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    defaultProfileId: Schema.optional(Schema.String),
    industryVertical: Schema.optional(Schema.String),
    childLink: Schema.optional(
      Schema.Struct({
        href: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    dataRetentionTtl: Schema.optional(Schema.String),
    profileCount: Schema.optional(Schema.Number),
    starred: Schema.optional(Schema.Boolean),
    selfLink: Schema.optional(Schema.String),
    level: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    dataRetentionResetOnNewActivity: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Webproperty" }) as any as Schema.Schema<Webproperty>;

export interface Account {
  /** Time the account was created. */
  created?: string;
  /** Account name. */
  name?: string;
  /** Account ID. */
  id?: string;
  /** Child link for an account entry. Points to the list of web properties for this account. */
  childLink?: { type?: string; href?: string };
  /** Link for this account. */
  selfLink?: string;
  /** Permissions the user has for this account. */
  permissions?: { effective?: Array<string> };
  /** Time the account was last modified. */
  updated?: string;
  /** Indicates whether this account is starred or not. */
  starred?: boolean;
  /** Resource type for Analytics account. */
  kind?: string;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() =>
  Schema.Struct({
    created: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    childLink: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        href: Schema.optional(Schema.String),
      }),
    ),
    selfLink: Schema.optional(Schema.String),
    permissions: Schema.optional(
      Schema.Struct({
        effective: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    updated: Schema.optional(Schema.String),
    starred: Schema.optional(Schema.Boolean),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface Profile {
  /** Account ID to which this view (profile) belongs. */
  accountId?: string;
  /** Time this view (profile) was last modified. */
  updated?: string;
  /** Indicates whether ecommerce tracking is enabled for this view (profile). */
  eCommerceTracking?: boolean;
  /** The site search query parameters for this view (profile). */
  siteSearchQueryParameters?: string;
  /** Link for this view (profile). */
  selfLink?: string;
  /** Site search category parameters for this view (profile). */
  siteSearchCategoryParameters?: string;
  /** Indicates whether this view (profile) is starred or not. */
  starred?: boolean;
  /** The query parameters that are excluded from this view (profile). */
  excludeQueryParameters?: string;
  /** Child link for this view (profile). Points to the list of goals for this view (profile). */
  childLink?: { type?: string; href?: string };
  /** Default page for this view (profile). */
  defaultPage?: string;
  /** Time zone for which this view (profile) has been configured. Time zones are identified by strings from the TZ database. */
  timezone?: string;
  /** Time this view (profile) was created. */
  created?: string;
  /** The currency type associated with this view (profile), defaults to USD. The supported values are: USD, JPY, EUR, GBP, AUD, KRW, BRL, CNY, DKK, RUB, SEK, NOK, PLN, TRY, TWD, HKD, THB, IDR, ARS, MXN, VND, PHP, INR, CHF, CAD, CZK, NZD, HUF, BGN, LTL, ZAR, UAH, AED, BOB, CLP, COP, EGP, HRK, ILS, MAD, MYR, PEN, PKR, RON, RSD, SAR, SGD, VEF, LVL */
  currency?: string;
  /** Permissions the user has for this view (profile). */
  permissions?: { effective?: Array<string> };
  /** Resource type for Analytics view (profile). */
  kind?: string;
  /** View (Profile) ID. */
  id?: string;
  /** Indicates whether enhanced ecommerce tracking is enabled for this view (profile). This property can only be enabled if ecommerce tracking is enabled. */
  enhancedECommerceTracking?: boolean;
  /** Indicates whether bot filtering is enabled for this view (profile). */
  botFilteringEnabled?: boolean;
  /** View (Profile) type. Supported types: WEB or APP. */
  type?: string;
  /** Whether or not Analytics will strip search category parameters from the URLs in your reports. */
  stripSiteSearchCategoryParameters?: boolean;
  /** Whether or not Analytics will strip search query parameters from the URLs in your reports. */
  stripSiteSearchQueryParameters?: boolean;
  /** Name of this view (profile). */
  name?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs. */
  webPropertyId?: string;
  /** Parent link for this view (profile). Points to the web property to which this view (profile) belongs. */
  parentLink?: { href?: string; type?: string };
  /** Website URL for this view (profile). */
  websiteUrl?: string;
  /** Internal ID for the web property to which this view (profile) belongs. */
  internalWebPropertyId?: string;
}

export const Profile: Schema.Schema<Profile> = Schema.suspend(() =>
  Schema.Struct({
    accountId: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    eCommerceTracking: Schema.optional(Schema.Boolean),
    siteSearchQueryParameters: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    siteSearchCategoryParameters: Schema.optional(Schema.String),
    starred: Schema.optional(Schema.Boolean),
    excludeQueryParameters: Schema.optional(Schema.String),
    childLink: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        href: Schema.optional(Schema.String),
      }),
    ),
    defaultPage: Schema.optional(Schema.String),
    timezone: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    currency: Schema.optional(Schema.String),
    permissions: Schema.optional(
      Schema.Struct({
        effective: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    enhancedECommerceTracking: Schema.optional(Schema.Boolean),
    botFilteringEnabled: Schema.optional(Schema.Boolean),
    type: Schema.optional(Schema.String),
    stripSiteSearchCategoryParameters: Schema.optional(Schema.Boolean),
    stripSiteSearchQueryParameters: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    webPropertyId: Schema.optional(Schema.String),
    parentLink: Schema.optional(
      Schema.Struct({
        href: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    websiteUrl: Schema.optional(Schema.String),
    internalWebPropertyId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Profile" }) as any as Schema.Schema<Profile>;

export interface AccountTicket {
  /** Redirect URI where the user will be sent after accepting Terms of Service. Must be configured in APIs console as a callback URL. */
  redirectUri?: string;
  /** Resource type for account ticket. */
  kind?: string;
  /** Web property for the account. */
  webproperty?: Webproperty;
  /** Account for this ticket. */
  account?: Account;
  /** Account ticket ID used to access the account ticket. */
  id?: string;
  /** View (Profile) for the account. */
  profile?: Profile;
}

export const AccountTicket: Schema.Schema<AccountTicket> = Schema.suspend(() =>
  Schema.Struct({
    redirectUri: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    webproperty: Schema.optional(Webproperty),
    account: Schema.optional(Account),
    id: Schema.optional(Schema.String),
    profile: Schema.optional(Profile),
  }),
).annotate({
  identifier: "AccountTicket",
}) as any as Schema.Schema<AccountTicket>;

export interface CustomMetric {
  /** Link for the custom metric */
  selfLink?: string;
  /** Time the custom metric was last modified. */
  updated?: string;
  /** Data type of custom metric. */
  type?: string;
  /** Custom metric ID. */
  id?: string;
  /** Boolean indicating whether the custom metric is active. */
  active?: boolean;
  /** Scope of the custom metric: HIT or PRODUCT. */
  scope?: string;
  /** Account ID. */
  accountId?: string;
  /** Min value of custom metric. */
  min_value?: string;
  /** Parent link for the custom metric. Points to the property to which the custom metric belongs. */
  parentLink?: { type?: string; href?: string };
  /** Index of the custom metric. */
  index?: number;
  /** Kind value for a custom metric. Set to "analytics#customMetric". It is a read-only field. */
  kind?: string;
  /** Time the custom metric was created. */
  created?: string;
  /** Name of the custom metric. */
  name?: string;
  /** Max value of custom metric. */
  max_value?: string;
  /** Property ID. */
  webPropertyId?: string;
}

export const CustomMetric: Schema.Schema<CustomMetric> = Schema.suspend(() =>
  Schema.Struct({
    selfLink: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    active: Schema.optional(Schema.Boolean),
    scope: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    min_value: Schema.optional(Schema.String),
    parentLink: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        href: Schema.optional(Schema.String),
      }),
    ),
    index: Schema.optional(Schema.Number),
    kind: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    max_value: Schema.optional(Schema.String),
    webPropertyId: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "CustomMetric",
}) as any as Schema.Schema<CustomMetric>;

export interface CustomMetrics {
  /** Link to next page for this custom metric collection. */
  nextLink?: string;
  /** Link to previous page for this custom metric collection. */
  previousLink?: string;
  /** Collection of custom metrics. */
  items?: Array<CustomMetric>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Collection type. */
  kind?: string;
}

export const CustomMetrics: Schema.Schema<CustomMetrics> = Schema.suspend(() =>
  Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(CustomMetric)),
    totalResults: Schema.optional(Schema.Number),
    username: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    kind: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "CustomMetrics",
}) as any as Schema.Schema<CustomMetrics>;

export interface FilterExpression {
  /** The Index of the custom dimension. Set only if the field is a is CUSTOM_DIMENSION. */
  fieldIndex?: number;
  /** Filter expression value */
  expressionValue?: string;
  /** Determines if the filter is case sensitive. */
  caseSensitive?: boolean;
  /** Field to filter. Possible values: - Content and Traffic - PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, - COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, - INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP, - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, - CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, - TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, - TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, - Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, - PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, - JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), - GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, - GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, - EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, - USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME, - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY, - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), - MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, - MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, - Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom dimension - CUSTOM_DIMENSION (See accompanying field index), */
  field?: string;
  /** Kind value for filter expression */
  kind?: string;
  /** Match type for this filter. Possible values are BEGINS_WITH, EQUAL, ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS, PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all other filters must use MATCHES. */
  matchType?: string;
}

export const FilterExpression: Schema.Schema<FilterExpression> = Schema.suspend(
  () =>
    Schema.Struct({
      fieldIndex: Schema.optional(Schema.Number),
      expressionValue: Schema.optional(Schema.String),
      caseSensitive: Schema.optional(Schema.Boolean),
      field: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      matchType: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FilterExpression",
}) as any as Schema.Schema<FilterExpression>;

export interface Filter {
  /** Details for the filter of the type EXCLUDE. */
  excludeDetails?: FilterExpression;
  /** Account ID to which this filter belongs. */
  accountId?: string;
  /** Filter ID. */
  id?: string;
  /** Details for the filter of the type SEARCH_AND_REPLACE. */
  searchAndReplaceDetails?: {
    fieldIndex?: number;
    replaceString?: string;
    caseSensitive?: boolean;
    field?: string;
    searchString?: string;
  };
  /** Type of this filter. Possible values are INCLUDE, EXCLUDE, LOWERCASE, UPPERCASE, SEARCH_AND_REPLACE and ADVANCED. */
  type?: string;
  /** Details for the filter of the type ADVANCED. */
  advancedDetails?: {
    caseSensitive?: boolean;
    outputToField?: string;
    overrideOutputField?: boolean;
    extractB?: string;
    fieldBIndex?: number;
    fieldB?: string;
    outputToFieldIndex?: number;
    fieldA?: string;
    fieldARequired?: boolean;
    extractA?: string;
    fieldAIndex?: number;
    fieldBRequired?: boolean;
    outputConstructor?: string;
  };
  /** Link for this filter. */
  selfLink?: string;
  /** Time this filter was last modified. */
  updated?: string;
  /** Details for the filter of the type INCLUDE. */
  includeDetails?: FilterExpression;
  /** Details for the filter of the type LOWER. */
  lowercaseDetails?: { field?: string; fieldIndex?: number };
  /** Time this filter was created. */
  created?: string;
  /** Name of this filter. */
  name?: string;
  /** Resource type for Analytics filter. */
  kind?: string;
  /** Parent link for this filter. Points to the account to which this filter belongs. */
  parentLink?: { type?: string; href?: string };
  /** Details for the filter of the type UPPER. */
  uppercaseDetails?: { field?: string; fieldIndex?: number };
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() =>
  Schema.Struct({
    excludeDetails: Schema.optional(FilterExpression),
    accountId: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    searchAndReplaceDetails: Schema.optional(
      Schema.Struct({
        fieldIndex: Schema.optional(Schema.Number),
        replaceString: Schema.optional(Schema.String),
        caseSensitive: Schema.optional(Schema.Boolean),
        field: Schema.optional(Schema.String),
        searchString: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
    advancedDetails: Schema.optional(
      Schema.Struct({
        caseSensitive: Schema.optional(Schema.Boolean),
        outputToField: Schema.optional(Schema.String),
        overrideOutputField: Schema.optional(Schema.Boolean),
        extractB: Schema.optional(Schema.String),
        fieldBIndex: Schema.optional(Schema.Number),
        fieldB: Schema.optional(Schema.String),
        outputToFieldIndex: Schema.optional(Schema.Number),
        fieldA: Schema.optional(Schema.String),
        fieldARequired: Schema.optional(Schema.Boolean),
        extractA: Schema.optional(Schema.String),
        fieldAIndex: Schema.optional(Schema.Number),
        fieldBRequired: Schema.optional(Schema.Boolean),
        outputConstructor: Schema.optional(Schema.String),
      }),
    ),
    selfLink: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    includeDetails: Schema.optional(FilterExpression),
    lowercaseDetails: Schema.optional(
      Schema.Struct({
        field: Schema.optional(Schema.String),
        fieldIndex: Schema.optional(Schema.Number),
      }),
    ),
    created: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    parentLink: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        href: Schema.optional(Schema.String),
      }),
    ),
    uppercaseDetails: Schema.optional(
      Schema.Struct({
        field: Schema.optional(Schema.String),
        fieldIndex: Schema.optional(Schema.Number),
      }),
    ),
  }),
).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface Filters {
  /** Link to next page for this filter collection. */
  nextLink?: string;
  /** Link to previous page for this filter collection. */
  previousLink?: string;
  /** A list of filters. */
  items?: Array<Filter>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Collection type. */
  kind?: string;
}

export const Filters: Schema.Schema<Filters> = Schema.suspend(() =>
  Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(Filter)),
    totalResults: Schema.optional(Schema.Number),
    username: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Filters" }) as any as Schema.Schema<Filters>;

export interface ProfileRef {
  /** Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs. */
  webPropertyId?: string;
  /** Account ID to which this view (profile) belongs. */
  accountId?: string;
  /** Internal ID for the web property to which this view (profile) belongs. */
  internalWebPropertyId?: string;
  /** Analytics view (profile) reference. */
  kind?: string;
  /** View (Profile) ID. */
  id?: string;
  /** Name of this view (profile). */
  name?: string;
  /** Link for this view (profile). */
  href?: string;
}

export const ProfileRef: Schema.Schema<ProfileRef> = Schema.suspend(() =>
  Schema.Struct({
    webPropertyId: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    internalWebPropertyId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    href: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ProfileRef" }) as any as Schema.Schema<ProfileRef>;

export interface FilterRef {
  /** Filter ID. */
  id?: string;
  /** Name of this filter. */
  name?: string;
  /** Link for this filter. */
  href?: string;
  /** Account ID to which this filter belongs. */
  accountId?: string;
  /** Kind value for filter reference. */
  kind?: string;
}

export const FilterRef: Schema.Schema<FilterRef> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    href: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "FilterRef" }) as any as Schema.Schema<FilterRef>;

export interface ProfileFilterLink {
  /** Link for this profile filter link. */
  selfLink?: string;
  /** Profile filter link ID. */
  id?: string;
  /** View (Profile) for this link. */
  profileRef?: ProfileRef;
  /** Filter for this link. */
  filterRef?: FilterRef;
  /** Resource type for Analytics filter. */
  kind?: string;
  /** The rank of this profile filter link relative to the other filters linked to the same profile. For readonly (i.e., list and get) operations, the rank always starts at 1. For write (i.e., create, update, or delete) operations, you may specify a value between 0 and 255 inclusively, [0, 255]. In order to insert a link at the end of the list, either don't specify a rank or set a rank to a number greater than the largest rank in the list. In order to insert a link to the beginning of the list specify a rank that is less than or equal to 1. The new link will move all existing filters with the same or lower rank down the list. After the link is inserted/updated/deleted all profile filter links will be renumbered starting at 1. */
  rank?: number;
}

export const ProfileFilterLink: Schema.Schema<ProfileFilterLink> =
  Schema.suspend(() =>
    Schema.Struct({
      selfLink: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      profileRef: Schema.optional(ProfileRef),
      filterRef: Schema.optional(FilterRef),
      kind: Schema.optional(Schema.String),
      rank: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ProfileFilterLink",
  }) as any as Schema.Schema<ProfileFilterLink>;

export interface HashClientIdResponse {
  webPropertyId?: string;
  clientId?: string;
  hashedClientId?: string;
  kind?: string;
}

export const HashClientIdResponse: Schema.Schema<HashClientIdResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      webPropertyId: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      hashedClientId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HashClientIdResponse",
  }) as any as Schema.Schema<HashClientIdResponse>;

export interface AccountTreeResponse {
  /** The account created. */
  account?: Account;
  /** View (Profile) for the account. */
  profile?: Profile;
  /** Resource type for account ticket. */
  kind?: string;
  /** Web property for the account. */
  webproperty?: Webproperty;
}

export const AccountTreeResponse: Schema.Schema<AccountTreeResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      account: Schema.optional(Account),
      profile: Schema.optional(Profile),
      kind: Schema.optional(Schema.String),
      webproperty: Schema.optional(Webproperty),
    }),
  ).annotate({
    identifier: "AccountTreeResponse",
  }) as any as Schema.Schema<AccountTreeResponse>;

export interface Column {
  /** Resource type for Analytics column. */
  kind?: string;
  /** Map of attribute name and value for this column. */
  attributes?: Record<string, string>;
  /** Column id. */
  id?: string;
}

export const Column: Schema.Schema<Column> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Column" }) as any as Schema.Schema<Column>;

export interface UnsampledReport {
  /** Resource type for an Analytics unsampled report. */
  kind?: string;
  /** The dimensions for the unsampled report. */
  dimensions?: string;
  /** View (Profile) ID to which this unsampled report belongs. */
  profileId?: string;
  /** The metrics for the unsampled report. */
  metrics?: string;
  /** The segment for the unsampled report. */
  segment?: string;
  /** Download details for a file stored in Google Drive. */
  driveDownloadDetails?: { documentId?: string };
  /** Web property ID to which this unsampled report belongs. The web property ID is of the form UA-XXXXX-YY. */
  webPropertyId?: string;
  /** The type of download you need to use for the report data file. Possible values include `GOOGLE_DRIVE` and `GOOGLE_CLOUD_STORAGE`. If the value is `GOOGLE_DRIVE`, see the `driveDownloadDetails` field. If the value is `GOOGLE_CLOUD_STORAGE`, see the `cloudStorageDownloadDetails` field. */
  downloadType?: string;
  /** Time this unsampled report was created. */
  created?: string;
  /** The start date for the unsampled report. */
  "start-date"?: string;
  /** Time this unsampled report was last modified. */
  updated?: string;
  /** Status of this unsampled report. Possible values are PENDING, COMPLETED, or FAILED. */
  status?: string;
  /** Link for this unsampled report. */
  selfLink?: string;
  /** Account ID to which this unsampled report belongs. */
  accountId?: string;
  /** Download details for a file stored in Google Cloud Storage. */
  cloudStorageDownloadDetails?: { bucketId?: string; objectId?: string };
  /** The end date for the unsampled report. */
  "end-date"?: string;
  /** Unsampled report ID. */
  id?: string;
  /** Title of the unsampled report. */
  title?: string;
  /** The filters for the unsampled report. */
  filters?: string;
}

export const UnsampledReport: Schema.Schema<UnsampledReport> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      dimensions: Schema.optional(Schema.String),
      profileId: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.String),
      segment: Schema.optional(Schema.String),
      driveDownloadDetails: Schema.optional(
        Schema.Struct({ documentId: Schema.optional(Schema.String) }),
      ),
      webPropertyId: Schema.optional(Schema.String),
      downloadType: Schema.optional(Schema.String),
      created: Schema.optional(Schema.String),
      "start-date": Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      cloudStorageDownloadDetails: Schema.optional(
        Schema.Struct({
          bucketId: Schema.optional(Schema.String),
          objectId: Schema.optional(Schema.String),
        }),
      ),
      "end-date": Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      filters: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "UnsampledReport",
}) as any as Schema.Schema<UnsampledReport>;

export interface UnsampledReports {
  /** Collection type. */
  kind?: string;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** A list of unsampled reports. */
  items?: Array<UnsampledReport>;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** Link to next page for this unsampled report collection. */
  nextLink?: string;
  /** Link to previous page for this unsampled report collection. */
  previousLink?: string;
}

export const UnsampledReports: Schema.Schema<UnsampledReports> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      items: Schema.optional(Schema.Array(UnsampledReport)),
      totalResults: Schema.optional(Schema.Number),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "UnsampledReports",
}) as any as Schema.Schema<UnsampledReports>;

export interface LinkedForeignAccount {
  /** The foreign account ID. For example the an Google Ads `linkedAccountId` has the following format XXX-XXX-XXXX. */
  linkedAccountId?: string;
  /** The type of the foreign account. For example, `ADWORDS_LINKS`, `DBM_LINKS`, `MCC_LINKS` or `OPTIMIZE`. */
  type?: string;
  /** Internal ID for the web property to which this linked foreign account belongs. */
  internalWebPropertyId?: string;
  /** Resource type for linked foreign account. */
  kind?: string;
  /** Remarketing audience ID to which this linked foreign account belongs. */
  remarketingAudienceId?: string;
  /** The status of this foreign account link. */
  status?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this linked foreign account belongs. */
  webPropertyId?: string;
  /** Account ID to which this linked foreign account belongs. */
  accountId?: string;
  /** Boolean indicating whether this is eligible for search. */
  eligibleForSearch?: boolean;
  /** Entity ad account link ID. */
  id?: string;
}

export const LinkedForeignAccount: Schema.Schema<LinkedForeignAccount> =
  Schema.suspend(() =>
    Schema.Struct({
      linkedAccountId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      internalWebPropertyId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      remarketingAudienceId: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      webPropertyId: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      eligibleForSearch: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LinkedForeignAccount",
  }) as any as Schema.Schema<LinkedForeignAccount>;

export interface IncludeConditions {
  /** Number of days (in the range 1 to 540) a user remains in the audience. */
  membershipDurationDays?: number;
  /** Boolean indicating whether this segment is a smart list. https://support.google.com/analytics/answer/4628577 */
  isSmartList?: boolean;
  /** The segment condition that will cause a user to be added to an audience. */
  segment?: string;
  /** The look-back window lets you specify a time frame for evaluating the behavior that qualifies users for your audience. For example, if your filters include users from Central Asia, and Transactions Greater than 2, and you set the look-back window to 14 days, then any user from Central Asia whose cumulative transactions exceed 2 during the last 14 days is added to the audience. */
  daysToLookBack?: number;
  /** Resource type for include conditions. */
  kind?: string;
}

export const IncludeConditions: Schema.Schema<IncludeConditions> =
  Schema.suspend(() =>
    Schema.Struct({
      membershipDurationDays: Schema.optional(Schema.Number),
      isSmartList: Schema.optional(Schema.Boolean),
      segment: Schema.optional(Schema.String),
      daysToLookBack: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IncludeConditions",
  }) as any as Schema.Schema<IncludeConditions>;

export interface RemarketingAudience {
  /** Internal ID for the web property to which this remarketing audience belongs. */
  internalWebPropertyId?: string;
  /** Collection type. */
  kind?: string;
  /** The type of audience, either SIMPLE or STATE_BASED. */
  audienceType?: string;
  /** Time this remarketing audience was created. */
  created?: string;
  /** The name of this remarketing audience. */
  name?: string;
  /** The linked ad accounts associated with this remarketing audience. A remarketing audience can have only one linkedAdAccount currently. */
  linkedAdAccounts?: Array<LinkedForeignAccount>;
  /** Web property ID of the form UA-XXXXX-YY to which this remarketing audience belongs. */
  webPropertyId?: string;
  /** The views (profiles) that this remarketing audience is linked to. */
  linkedViews?: Array<string>;
  /** The simple audience definition that will cause a user to be added to an audience. */
  audienceDefinition?: { includeConditions?: IncludeConditions };
  /** Time this remarketing audience was last modified. */
  updated?: string;
  /** A state based audience definition that will cause a user to be added or removed from an audience. */
  stateBasedAudienceDefinition?: {
    excludeConditions?: { exclusionDuration?: string; segment?: string };
    includeConditions?: IncludeConditions;
  };
  /** The description of this remarketing audience. */
  description?: string;
  /** Remarketing Audience ID. */
  id?: string;
  /** Account ID to which this remarketing audience belongs. */
  accountId?: string;
}

export const RemarketingAudience: Schema.Schema<RemarketingAudience> =
  Schema.suspend(() =>
    Schema.Struct({
      internalWebPropertyId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      audienceType: Schema.optional(Schema.String),
      created: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      linkedAdAccounts: Schema.optional(Schema.Array(LinkedForeignAccount)),
      webPropertyId: Schema.optional(Schema.String),
      linkedViews: Schema.optional(Schema.Array(Schema.String)),
      audienceDefinition: Schema.optional(
        Schema.Struct({
          includeConditions: Schema.optional(IncludeConditions),
        }),
      ),
      updated: Schema.optional(Schema.String),
      stateBasedAudienceDefinition: Schema.optional(
        Schema.Struct({
          excludeConditions: Schema.optional(
            Schema.Struct({
              exclusionDuration: Schema.optional(Schema.String),
              segment: Schema.optional(Schema.String),
            }),
          ),
          includeConditions: Schema.optional(IncludeConditions),
        }),
      ),
      description: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RemarketingAudience",
  }) as any as Schema.Schema<RemarketingAudience>;

export interface AdWordsAccount {
  /** Customer ID. This field is required when creating a Google Ads link. */
  customerId?: string;
  /** Resource type for Google Ads account. */
  kind?: string;
  /** True if auto-tagging is enabled on the Google Ads account. Read-only after the insert operation. */
  autoTaggingEnabled?: boolean;
}

export const AdWordsAccount: Schema.Schema<AdWordsAccount> = Schema.suspend(
  () =>
    Schema.Struct({
      customerId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      autoTaggingEnabled: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "AdWordsAccount",
}) as any as Schema.Schema<AdWordsAccount>;

export interface CustomDataSource {
  /** Upload type of the custom data source. */
  uploadType?: string;
  /** Account ID to which this custom data source belongs. */
  accountId?: string;
  /** Custom data source ID. */
  id?: string;
  /** Description of custom data source. */
  description?: string;
  /** Type of the custom data source. */
  type?: string;
  /** Link for this Analytics custom data source. */
  selfLink?: string;
  /** IDs of views (profiles) linked to the custom data source. */
  profilesLinked?: Array<string>;
  /** Time this custom data source was last modified. */
  updated?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this custom data source belongs. */
  webPropertyId?: string;
  /** Time this custom data source was created. */
  created?: string;
  /** Name of this custom data source. */
  name?: string;
  childLink?: { type?: string; href?: string };
  importBehavior?: string;
  /** Resource type for Analytics custom data source. */
  kind?: string;
  /** Collection of schema headers of the custom data source. */
  schema?: Array<string>;
  /** Parent link for this custom data source. Points to the web property to which this custom data source belongs. */
  parentLink?: { href?: string; type?: string };
}

export const CustomDataSource: Schema.Schema<CustomDataSource> = Schema.suspend(
  () =>
    Schema.Struct({
      uploadType: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      profilesLinked: Schema.optional(Schema.Array(Schema.String)),
      updated: Schema.optional(Schema.String),
      webPropertyId: Schema.optional(Schema.String),
      created: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      childLink: Schema.optional(
        Schema.Struct({
          type: Schema.optional(Schema.String),
          href: Schema.optional(Schema.String),
        }),
      ),
      importBehavior: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      schema: Schema.optional(Schema.Array(Schema.String)),
      parentLink: Schema.optional(
        Schema.Struct({
          href: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    }),
).annotate({
  identifier: "CustomDataSource",
}) as any as Schema.Schema<CustomDataSource>;

export interface CustomDataSources {
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this custom data source collection. */
  nextLink?: string;
  /** Link to previous page for this custom data source collection. */
  previousLink?: string;
  /** Collection of custom data sources. */
  items?: Array<CustomDataSource>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
}

export const CustomDataSources: Schema.Schema<CustomDataSources> =
  Schema.suspend(() =>
    Schema.Struct({
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(CustomDataSource)),
      totalResults: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "CustomDataSources",
  }) as any as Schema.Schema<CustomDataSources>;

export interface Experiment {
  /** The framework used to serve the experiment variations and evaluate the results. One of: - REDIRECT: Google Analytics redirects traffic to different variation pages, reports the chosen variation and evaluates the results. - API: Google Analytics chooses and reports the variation to serve and evaluates the results; the caller is responsible for serving the selected variation. - EXTERNAL: The variations will be served externally and the chosen variation reported to Google Analytics. The caller is responsible for serving the selected variation and evaluating the results. */
  servingFramework?: string;
  /** Link for this experiment. This field is read-only. */
  selfLink?: string;
  /** The metric that the experiment is optimizing. Valid values: "ga:goal(n)Completions", "ga:adsenseAdsClicks", "ga:adsenseAdsViewed", "ga:adsenseRevenue", "ga:bounces", "ga:pageviews", "ga:sessionDuration", "ga:transactions", "ga:transactionRevenue". This field is required if status is "RUNNING" and servingFramework is one of "REDIRECT" or "API". */
  objectiveMetric?: string;
  /** Time the experiment was last modified. This field is read-only. */
  updated?: string;
  /** Array of variations. The first variation in the array is the original. The number of variations may not change once an experiment is in the RUNNING state. At least two variations are required before status can be set to RUNNING. */
  variations?: Array<{
    name?: string;
    url?: string;
    weight?: number;
    status?: string;
    won?: boolean;
  }>;
  /** A floating-point number in (0, 1). Specifies the necessary confidence level to choose a winner. This field may not be changed for an experiments whose status is ENDED. */
  winnerConfidenceLevel?: number;
  /** If true, the end user will be able to edit the experiment via the Google Analytics user interface. */
  editableInGaUi?: boolean;
  /** Boolean specifying whether a winner has been found for this experiment. This field is read-only. */
  winnerFound?: boolean;
  /** Account ID to which this experiment belongs. This field is read-only. */
  accountId?: string;
  /** An integer number in [3, 90]. Specifies the minimum length of the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED. */
  minimumExperimentLengthInDays?: number;
  /** View (Profile) ID to which this experiment belongs. This field is read-only. */
  profileId?: string;
  /** Resource type for an Analytics experiment. This field is read-only. */
  kind?: string;
  /** A floating-point number in (0, 1]. Specifies the fraction of the traffic that participates in the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED. */
  trafficCoverage?: number;
  /** The ending time of the experiment (the time the status changed from RUNNING to ENDED). This field is present only if the experiment has ended. This field is read-only. */
  endTime?: string;
  /** Time the experiment was created. This field is read-only. */
  created?: string;
  /** The starting time of the experiment (the time the status changed from READY_TO_RUN to RUNNING). This field is present only if the experiment has started. This field is read-only. */
  startTime?: string;
  /** Experiment status. Possible values: "DRAFT", "READY_TO_RUN", "RUNNING", "ENDED". Experiments can be created in the "DRAFT", "READY_TO_RUN" or "RUNNING" state. This field is required when creating an experiment. */
  status?: string;
  /** Whether the objectiveMetric should be minimized or maximized. Possible values: "MAXIMUM", "MINIMUM". Optional--defaults to "MAXIMUM". Cannot be specified without objectiveMetric. Cannot be modified when status is "RUNNING" or "ENDED". */
  optimizationType?: string;
  /** Why the experiment ended. Possible values: "STOPPED_BY_USER", "WINNER_FOUND", "EXPERIMENT_EXPIRED", "ENDED_WITH_NO_WINNER", "GOAL_OBJECTIVE_CHANGED". "ENDED_WITH_NO_WINNER" means that the experiment didn't expire but no winner was projected to be found. If the experiment status is changed via the API to ENDED this field is set to STOPPED_BY_USER. This field is read-only. */
  reasonExperimentEnded?: string;
  /** Experiment ID. Required for patch and update. Disallowed for create. */
  id?: string;
  /** Notes about this experiment. */
  description?: string;
  /** Internal ID for the web property to which this experiment belongs. This field is read-only. */
  internalWebPropertyId?: string;
  /** Parent link for an experiment. Points to the view (profile) to which this experiment belongs. */
  parentLink?: { type?: string; href?: string };
  /** The snippet of code to include on the control page(s). This field is read-only. */
  snippet?: string;
  /** Web property ID to which this experiment belongs. The web property ID is of the form UA-XXXXX-YY. This field is read-only. */
  webPropertyId?: string;
  /** Boolean specifying whether to distribute traffic evenly across all variations. If the value is False, content experiments follows the default behavior of adjusting traffic dynamically based on variation performance. Optional -- defaults to False. This field may not be changed for an experiment whose status is ENDED. */
  equalWeighting?: boolean;
  /** Experiment name. This field may not be changed for an experiment whose status is ENDED. This field is required when creating an experiment. */
  name?: string;
  /** Boolean specifying whether variations URLS are rewritten to match those of the original. This field may not be changed for an experiments whose status is ENDED. */
  rewriteVariationUrlsAsOriginal?: boolean;
}

export const Experiment: Schema.Schema<Experiment> = Schema.suspend(() =>
  Schema.Struct({
    servingFramework: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    objectiveMetric: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    variations: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          url: Schema.optional(Schema.String),
          weight: Schema.optional(Schema.Number),
          status: Schema.optional(Schema.String),
          won: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    winnerConfidenceLevel: Schema.optional(Schema.Number),
    editableInGaUi: Schema.optional(Schema.Boolean),
    winnerFound: Schema.optional(Schema.Boolean),
    accountId: Schema.optional(Schema.String),
    minimumExperimentLengthInDays: Schema.optional(Schema.Number),
    profileId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    trafficCoverage: Schema.optional(Schema.Number),
    endTime: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    optimizationType: Schema.optional(Schema.String),
    reasonExperimentEnded: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    internalWebPropertyId: Schema.optional(Schema.String),
    parentLink: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        href: Schema.optional(Schema.String),
      }),
    ),
    snippet: Schema.optional(Schema.String),
    webPropertyId: Schema.optional(Schema.String),
    equalWeighting: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    rewriteVariationUrlsAsOriginal: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Experiment" }) as any as Schema.Schema<Experiment>;

export interface Experiments {
  /** Collection type. */
  kind?: string;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** A list of experiments. */
  items?: Array<Experiment>;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** Link to next page for this experiment collection. */
  nextLink?: string;
  /** Link to previous page for this experiment collection. */
  previousLink?: string;
}

export const Experiments: Schema.Schema<Experiments> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    username: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    items: Schema.optional(Schema.Array(Experiment)),
    totalResults: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Experiments" }) as any as Schema.Schema<Experiments>;

export interface WebPropertyRef {
  /** Account ID to which this web property belongs. */
  accountId?: string;
  /** Internal ID for this web property. */
  internalWebPropertyId?: string;
  /** Analytics web property reference. */
  kind?: string;
  /** Link for this web property. */
  href?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  id?: string;
  /** Name of this web property. */
  name?: string;
}

export const WebPropertyRef: Schema.Schema<WebPropertyRef> = Schema.suspend(
  () =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      internalWebPropertyId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      href: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "WebPropertyRef",
}) as any as Schema.Schema<WebPropertyRef>;

export interface EntityAdWordsLink {
  /** A list of Google Ads client accounts. These cannot be MCC accounts. This field is required when creating a Google Ads link. It cannot be empty. */
  adWordsAccounts?: Array<AdWordsAccount>;
  /** Name of the link. This field is required when creating a Google Ads link. */
  name?: string;
  /** URL link for this Google Analytics - Google Ads link. */
  selfLink?: string;
  /** Entity Google Ads link ID */
  id?: string;
  /** Web property being linked. */
  entity?: { webPropertyRef?: WebPropertyRef };
  /** IDs of linked Views (Profiles) represented as strings. */
  profileIds?: Array<string>;
  /** Resource type for entity Google Ads link. */
  kind?: string;
}

export const EntityAdWordsLink: Schema.Schema<EntityAdWordsLink> =
  Schema.suspend(() =>
    Schema.Struct({
      adWordsAccounts: Schema.optional(Schema.Array(AdWordsAccount)),
      name: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      entity: Schema.optional(
        Schema.Struct({ webPropertyRef: Schema.optional(WebPropertyRef) }),
      ),
      profileIds: Schema.optional(Schema.Array(Schema.String)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EntityAdWordsLink",
  }) as any as Schema.Schema<EntityAdWordsLink>;

export interface RealtimeData {
  /** Information for the view (profile), for which the real time data was requested. */
  profileInfo?: {
    accountId?: string;
    internalWebPropertyId?: string;
    profileId?: string;
    webPropertyId?: string;
    profileName?: string;
    tableId?: string;
  };
  /** The total number of rows for the query, regardless of the number of rows in the response. */
  totalResults?: number;
  /** Real time data rows, where each row contains a list of dimension values followed by the metric values. The order of dimensions and metrics is same as specified in the request. */
  rows?: Array<Array<string>>;
  /** Link to this page. */
  selfLink?: string;
  /** Resource type. */
  kind?: string;
  /** Total values for the requested metrics over all the results, not just the results returned in this response. The order of the metric totals is same as the metric order specified in the request. */
  totalsForAllResults?: Record<string, string>;
  /** Column headers that list dimension names followed by the metric names. The order of dimensions and metrics is same as specified in the request. */
  columnHeaders?: Array<{
    dataType?: string;
    name?: string;
    columnType?: string;
  }>;
  /** Unique ID for this data response. */
  id?: string;
  /** Real time data request query parameters. */
  query?: {
    dimensions?: string;
    "max-results"?: number;
    ids?: string;
    metrics?: Array<string>;
    filters?: string;
    sort?: Array<string>;
  };
}

export const RealtimeData: Schema.Schema<RealtimeData> = Schema.suspend(() =>
  Schema.Struct({
    profileInfo: Schema.optional(
      Schema.Struct({
        accountId: Schema.optional(Schema.String),
        internalWebPropertyId: Schema.optional(Schema.String),
        profileId: Schema.optional(Schema.String),
        webPropertyId: Schema.optional(Schema.String),
        profileName: Schema.optional(Schema.String),
        tableId: Schema.optional(Schema.String),
      }),
    ),
    totalResults: Schema.optional(Schema.Number),
    rows: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
    selfLink: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    totalsForAllResults: Schema.optional(
      Schema.Record(Schema.String, Schema.String),
    ),
    columnHeaders: Schema.optional(
      Schema.Array(
        Schema.Struct({
          dataType: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          columnType: Schema.optional(Schema.String),
        }),
      ),
    ),
    id: Schema.optional(Schema.String),
    query: Schema.optional(
      Schema.Struct({
        dimensions: Schema.optional(Schema.String),
        "max-results": Schema.optional(Schema.Number),
        ids: Schema.optional(Schema.String),
        metrics: Schema.optional(Schema.Array(Schema.String)),
        filters: Schema.optional(Schema.String),
        sort: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  }),
).annotate({
  identifier: "RealtimeData",
}) as any as Schema.Schema<RealtimeData>;

export interface EntityAdWordsLinks {
  /** A list of entity Google Ads links. */
  items?: Array<EntityAdWordsLink>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Next link for this Google Ads link collection. */
  nextLink?: string;
  /** Previous link for this Google Ads link collection. */
  previousLink?: string;
  /** Collection type. */
  kind?: string;
  /** The maximum number of entries the response can contain, regardless of the actual number of entries returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the entries, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
}

export const EntityAdWordsLinks: Schema.Schema<EntityAdWordsLinks> =
  Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(EntityAdWordsLink)),
      totalResults: Schema.optional(Schema.Number),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EntityAdWordsLinks",
  }) as any as Schema.Schema<EntityAdWordsLinks>;

export interface Webproperties {
  /** Link to next page for this web property collection. */
  nextLink?: string;
  /** Link to previous page for this web property collection. */
  previousLink?: string;
  /** A list of web properties. */
  items?: Array<Webproperty>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Collection type. */
  kind?: string;
}

export const Webproperties: Schema.Schema<Webproperties> = Schema.suspend(() =>
  Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(Webproperty)),
    totalResults: Schema.optional(Schema.Number),
    username: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    kind: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Webproperties",
}) as any as Schema.Schema<Webproperties>;

export interface Goal {
  /** Goal value. */
  value?: number;
  /** Details for the goal of the type VISIT_TIME_ON_SITE. */
  visitTimeOnSiteDetails?: {
    comparisonType?: string;
    comparisonValue?: string;
  };
  /** View (Profile) ID to which this goal belongs. */
  profileId?: string;
  /** Internal ID for the web property to which this goal belongs. */
  internalWebPropertyId?: string;
  /** Resource type for an Analytics goal. */
  kind?: string;
  /** Parent link for a goal. Points to the view (profile) to which this goal belongs. */
  parentLink?: { type?: string; href?: string };
  /** Web property ID to which this goal belongs. The web property ID is of the form UA-XXXXX-YY. */
  webPropertyId?: string;
  /** Details for the goal of the type VISIT_NUM_PAGES. */
  visitNumPagesDetails?: { comparisonType?: string; comparisonValue?: string };
  /** Time this goal was created. */
  created?: string;
  /** Goal name. */
  name?: string;
  /** Goal type. Possible values are URL_DESTINATION, VISIT_TIME_ON_SITE, VISIT_NUM_PAGES, AND EVENT. */
  type?: string;
  /** Link for this goal. */
  selfLink?: string;
  /** Time this goal was last modified. */
  updated?: string;
  /** Details for the goal of the type EVENT. */
  eventDetails?: {
    eventConditions?: Array<{
      comparisonValue?: string;
      matchType?: string;
      comparisonType?: string;
      expression?: string;
      type?: string;
    }>;
    useEventValue?: boolean;
  };
  /** Details for the goal of the type URL_DESTINATION. */
  urlDestinationDetails?: {
    caseSensitive?: boolean;
    url?: string;
    matchType?: string;
    firstStepRequired?: boolean;
    steps?: Array<{ name?: string; number?: number; url?: string }>;
  };
  /** Account ID to which this goal belongs. */
  accountId?: string;
  /** Goal ID. */
  id?: string;
  /** Determines whether this goal is active. */
  active?: boolean;
}

export const Goal: Schema.Schema<Goal> = Schema.suspend(() =>
  Schema.Struct({
    value: Schema.optional(Schema.Number),
    visitTimeOnSiteDetails: Schema.optional(
      Schema.Struct({
        comparisonType: Schema.optional(Schema.String),
        comparisonValue: Schema.optional(Schema.String),
      }),
    ),
    profileId: Schema.optional(Schema.String),
    internalWebPropertyId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    parentLink: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        href: Schema.optional(Schema.String),
      }),
    ),
    webPropertyId: Schema.optional(Schema.String),
    visitNumPagesDetails: Schema.optional(
      Schema.Struct({
        comparisonType: Schema.optional(Schema.String),
        comparisonValue: Schema.optional(Schema.String),
      }),
    ),
    created: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    updated: Schema.optional(Schema.String),
    eventDetails: Schema.optional(
      Schema.Struct({
        eventConditions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              comparisonValue: Schema.optional(Schema.String),
              matchType: Schema.optional(Schema.String),
              comparisonType: Schema.optional(Schema.String),
              expression: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        useEventValue: Schema.optional(Schema.Boolean),
      }),
    ),
    urlDestinationDetails: Schema.optional(
      Schema.Struct({
        caseSensitive: Schema.optional(Schema.Boolean),
        url: Schema.optional(Schema.String),
        matchType: Schema.optional(Schema.String),
        firstStepRequired: Schema.optional(Schema.Boolean),
        steps: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              number: Schema.optional(Schema.Number),
              url: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    accountId: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    active: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Goal" }) as any as Schema.Schema<Goal>;

export interface Goals {
  /** Link to next page for this goal collection. */
  nextLink?: string;
  /** Link to previous page for this goal collection. */
  previousLink?: string;
  /** A list of goals. */
  items?: Array<Goal>;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** Collection type. */
  kind?: string;
}

export const Goals: Schema.Schema<Goals> = Schema.suspend(() =>
  Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(Goal)),
    totalResults: Schema.optional(Schema.Number),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    username: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Goals" }) as any as Schema.Schema<Goals>;

export interface UserRef {
  /** User ID. */
  id?: string;
  /** Email ID of this user. */
  email?: string;
  kind?: string;
}

export const UserRef: Schema.Schema<UserRef> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    email: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "UserRef" }) as any as Schema.Schema<UserRef>;

export interface AccountRef {
  /** Account name. */
  name?: string;
  /** Account ID. */
  id?: string;
  /** Link for this account. */
  href?: string;
  /** Analytics account reference. */
  kind?: string;
}

export const AccountRef: Schema.Schema<AccountRef> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    href: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AccountRef" }) as any as Schema.Schema<AccountRef>;

export interface EntityUserLink {
  /** User reference. */
  userRef?: UserRef;
  /** Resource type for entity user link. */
  kind?: string;
  /** Entity user link ID */
  id?: string;
  /** Permissions the user has for this entity. */
  permissions?: { effective?: Array<string>; local?: Array<string> };
  /** Self link for this resource. */
  selfLink?: string;
  /** Entity for this link. It can be an account, a web property, or a view (profile). */
  entity?: {
    webPropertyRef?: WebPropertyRef;
    accountRef?: AccountRef;
    profileRef?: ProfileRef;
  };
}

export const EntityUserLink: Schema.Schema<EntityUserLink> = Schema.suspend(
  () =>
    Schema.Struct({
      userRef: Schema.optional(UserRef),
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      permissions: Schema.optional(
        Schema.Struct({
          effective: Schema.optional(Schema.Array(Schema.String)),
          local: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
      selfLink: Schema.optional(Schema.String),
      entity: Schema.optional(
        Schema.Struct({
          webPropertyRef: Schema.optional(WebPropertyRef),
          accountRef: Schema.optional(AccountRef),
          profileRef: Schema.optional(ProfileRef),
        }),
      ),
    }),
).annotate({
  identifier: "EntityUserLink",
}) as any as Schema.Schema<EntityUserLink>;

export interface AccountTreeRequest {
  profileName?: string;
  webpropertyName?: string;
  timezone?: string;
  websiteUrl?: string;
  accountName?: string;
  /** Resource type for account ticket. */
  kind?: string;
}

export const AccountTreeRequest: Schema.Schema<AccountTreeRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      profileName: Schema.optional(Schema.String),
      webpropertyName: Schema.optional(Schema.String),
      timezone: Schema.optional(Schema.String),
      websiteUrl: Schema.optional(Schema.String),
      accountName: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountTreeRequest",
  }) as any as Schema.Schema<AccountTreeRequest>;

export interface UserDeletionRequest {
  /** Firebase Project Id */
  firebaseProjectId?: string;
  /** This marks the point in time for which all user data before should be deleted */
  deletionRequestTime?: string;
  /** User ID. */
  id?: { type?: string; userId?: string };
  /** Property ID */
  propertyId?: string;
  /** Value is "analytics#userDeletionRequest". */
  kind?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  webPropertyId?: string;
}

export const UserDeletionRequest: Schema.Schema<UserDeletionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      firebaseProjectId: Schema.optional(Schema.String),
      deletionRequestTime: Schema.optional(Schema.String),
      id: Schema.optional(
        Schema.Struct({
          type: Schema.optional(Schema.String),
          userId: Schema.optional(Schema.String),
        }),
      ),
      propertyId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      webPropertyId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UserDeletionRequest",
  }) as any as Schema.Schema<UserDeletionRequest>;

export interface ProfileSummary {
  /** Resource type for Analytics ProfileSummary. */
  kind?: string;
  /** Indicates whether this view (profile) is starred or not. */
  starred?: boolean;
  /** View (Profile) type. Supported types: WEB or APP. */
  type?: string;
  /** View (profile) ID. */
  id?: string;
  /** View (profile) name. */
  name?: string;
}

export const ProfileSummary: Schema.Schema<ProfileSummary> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      starred: Schema.optional(Schema.Boolean),
      type: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ProfileSummary",
}) as any as Schema.Schema<ProfileSummary>;

export interface WebPropertySummary {
  /** List of profiles under this web property. */
  profiles?: Array<ProfileSummary>;
  /** Level for this web property. Possible values are STANDARD or PREMIUM. */
  level?: string;
  /** Web property name. */
  name?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  id?: string;
  /** Website url for this web property. */
  websiteUrl?: string;
  /** Indicates whether this web property is starred or not. */
  starred?: boolean;
  /** Internal ID for this web property. */
  internalWebPropertyId?: string;
  /** Resource type for Analytics WebPropertySummary. */
  kind?: string;
}

export const WebPropertySummary: Schema.Schema<WebPropertySummary> =
  Schema.suspend(() =>
    Schema.Struct({
      profiles: Schema.optional(Schema.Array(ProfileSummary)),
      level: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      websiteUrl: Schema.optional(Schema.String),
      starred: Schema.optional(Schema.Boolean),
      internalWebPropertyId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WebPropertySummary",
  }) as any as Schema.Schema<WebPropertySummary>;

export interface AccountSummary {
  /** Resource type for Analytics AccountSummary. */
  kind?: string;
  /** List of web properties under this account. */
  webProperties?: Array<WebPropertySummary>;
  /** Indicates whether this account is starred or not. */
  starred?: boolean;
  /** Account ID. */
  id?: string;
  /** Account name. */
  name?: string;
}

export const AccountSummary: Schema.Schema<AccountSummary> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      webProperties: Schema.optional(Schema.Array(WebPropertySummary)),
      starred: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AccountSummary",
}) as any as Schema.Schema<AccountSummary>;

export interface AccountSummaries {
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this AccountSummary collection. */
  nextLink?: string;
  /** Link to previous page for this AccountSummary collection. */
  previousLink?: string;
  /** A list of AccountSummaries. */
  items?: Array<AccountSummary>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
}

export const AccountSummaries: Schema.Schema<AccountSummaries> = Schema.suspend(
  () =>
    Schema.Struct({
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(AccountSummary)),
      totalResults: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "AccountSummaries",
}) as any as Schema.Schema<AccountSummaries>;

export interface Accounts {
  /** Collection type. */
  kind?: string;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of entries the response can contain, regardless of the actual number of entries returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the entries, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** A list of accounts. */
  items?: Array<Account>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Next link for this account collection. */
  nextLink?: string;
  /** Previous link for this account collection. */
  previousLink?: string;
}

export const Accounts: Schema.Schema<Accounts> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    username: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    items: Schema.optional(Schema.Array(Account)),
    totalResults: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Accounts" }) as any as Schema.Schema<Accounts>;

export interface McfData {
  /** Information for the view (profile), for which the Analytics data was requested. */
  profileInfo?: {
    profileName?: string;
    tableId?: string;
    accountId?: string;
    internalWebPropertyId?: string;
    profileId?: string;
    webPropertyId?: string;
  };
  /** The total number of rows for the query, regardless of the number of rows in the response. */
  totalResults?: number;
  /** Link to this page. */
  selfLink?: string;
  /** Total values for the requested metrics over all the results, not just the results returned in this response. The order of the metric totals is same as the metric order specified in the request. */
  totalsForAllResults?: Record<string, string>;
  /** Determines if the Analytics data contains sampled data. */
  containsSampledData?: boolean;
  /** Column headers that list dimension names followed by the metric names. The order of dimensions and metrics is same as specified in the request. */
  columnHeaders?: Array<{
    dataType?: string;
    name?: string;
    columnType?: string;
  }>;
  /** Unique ID for this data response. */
  id?: string;
  /** The number of samples used to calculate the result. */
  sampleSize?: string;
  /** Total size of the sample space from which the samples were selected. */
  sampleSpace?: string;
  /** The maximum number of rows the response can contain, regardless of the actual number of rows returned. Its value ranges from 1 to 10,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Analytics data rows, where each row contains a list of dimension values followed by the metric values. The order of dimensions and metrics is same as specified in the request. */
  rows?: Array<
    Array<{
      conversionPathValue?: Array<{
        nodeValue?: string;
        interactionType?: string;
      }>;
      primitiveValue?: string;
    }>
  >;
  /** Resource type. */
  kind?: string;
  /** Link to next page for this Analytics data query. */
  nextLink?: string;
  /** Link to previous page for this Analytics data query. */
  previousLink?: string;
  /** Analytics data request query parameters. */
  query?: {
    "max-results"?: number;
    "start-index"?: number;
    ids?: string;
    "end-date"?: string;
    sort?: Array<string>;
    filters?: string;
    dimensions?: string;
    "start-date"?: string;
    metrics?: Array<string>;
    segment?: string;
    samplingLevel?: string;
  };
}

export const McfData: Schema.Schema<McfData> = Schema.suspend(() =>
  Schema.Struct({
    profileInfo: Schema.optional(
      Schema.Struct({
        profileName: Schema.optional(Schema.String),
        tableId: Schema.optional(Schema.String),
        accountId: Schema.optional(Schema.String),
        internalWebPropertyId: Schema.optional(Schema.String),
        profileId: Schema.optional(Schema.String),
        webPropertyId: Schema.optional(Schema.String),
      }),
    ),
    totalResults: Schema.optional(Schema.Number),
    selfLink: Schema.optional(Schema.String),
    totalsForAllResults: Schema.optional(
      Schema.Record(Schema.String, Schema.String),
    ),
    containsSampledData: Schema.optional(Schema.Boolean),
    columnHeaders: Schema.optional(
      Schema.Array(
        Schema.Struct({
          dataType: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          columnType: Schema.optional(Schema.String),
        }),
      ),
    ),
    id: Schema.optional(Schema.String),
    sampleSize: Schema.optional(Schema.String),
    sampleSpace: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    rows: Schema.optional(
      Schema.Array(
        Schema.Array(
          Schema.Struct({
            conversionPathValue: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  nodeValue: Schema.optional(Schema.String),
                  interactionType: Schema.optional(Schema.String),
                }),
              ),
            ),
            primitiveValue: Schema.optional(Schema.String),
          }),
        ),
      ),
    ),
    kind: Schema.optional(Schema.String),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    query: Schema.optional(
      Schema.Struct({
        "max-results": Schema.optional(Schema.Number),
        "start-index": Schema.optional(Schema.Number),
        ids: Schema.optional(Schema.String),
        "end-date": Schema.optional(Schema.String),
        sort: Schema.optional(Schema.Array(Schema.String)),
        filters: Schema.optional(Schema.String),
        dimensions: Schema.optional(Schema.String),
        "start-date": Schema.optional(Schema.String),
        metrics: Schema.optional(Schema.Array(Schema.String)),
        segment: Schema.optional(Schema.String),
        samplingLevel: Schema.optional(Schema.String),
      }),
    ),
  }),
).annotate({ identifier: "McfData" }) as any as Schema.Schema<McfData>;

export interface EntityUserLinks {
  /** The maximum number of entries the response can contain, regardless of the actual number of entries returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the entries, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Collection type. */
  kind?: string;
  /** Next link for this account collection. */
  nextLink?: string;
  /** Previous link for this account collection. */
  previousLink?: string;
  /** A list of entity user links. */
  items?: Array<EntityUserLink>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
}

export const EntityUserLinks: Schema.Schema<EntityUserLinks> = Schema.suspend(
  () =>
    Schema.Struct({
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(EntityUserLink)),
      totalResults: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "EntityUserLinks",
}) as any as Schema.Schema<EntityUserLinks>;

export interface GaData {
  /** Determines if Analytics data contains samples. */
  containsSampledData?: boolean;
  /** Column headers that list dimension names followed by the metric names. The order of dimensions and metrics is same as specified in the request. */
  columnHeaders?: Array<{
    dataType?: string;
    name?: string;
    columnType?: string;
  }>;
  /** Unique ID for this data response. */
  id?: string;
  /** The maximum number of rows the response can contain, regardless of the actual number of rows returned. Its value ranges from 1 to 10,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The number of samples used to calculate the result. */
  sampleSize?: string;
  /** Total size of the sample space from which the samples were selected. */
  sampleSpace?: string;
  /** Link to this page. */
  selfLink?: string;
  /** Information for the view (profile), for which the Analytics data was requested. */
  profileInfo?: {
    webPropertyId?: string;
    profileId?: string;
    accountId?: string;
    internalWebPropertyId?: string;
    tableId?: string;
    profileName?: string;
  };
  /** The total number of rows for the query, regardless of the number of rows in the response. */
  totalResults?: number;
  /** Total values for the requested metrics over all the results, not just the results returned in this response. The order of the metric totals is same as the metric order specified in the request. */
  totalsForAllResults?: Record<string, string>;
  dataTable?: {
    cols?: Array<{ id?: string; label?: string; type?: string }>;
    rows?: Array<{ c?: Array<{ v?: string }> }>;
  };
  /** Link to next page for this Analytics data query. */
  nextLink?: string;
  /** Link to previous page for this Analytics data query. */
  previousLink?: string;
  /** Analytics data request query parameters. */
  query?: {
    filters?: string;
    sort?: Array<string>;
    "end-date"?: string;
    ids?: string;
    "max-results"?: number;
    "start-index"?: number;
    samplingLevel?: string;
    metrics?: Array<string>;
    segment?: string;
    dimensions?: string;
    "start-date"?: string;
  };
  /** Analytics data rows, where each row contains a list of dimension values followed by the metric values. The order of dimensions and metrics is same as specified in the request. */
  rows?: Array<Array<string>>;
  /** The last refreshed time in seconds for Analytics data. */
  dataLastRefreshed?: string;
  /** Resource type. */
  kind?: string;
}

export const GaData: Schema.Schema<GaData> = Schema.suspend(() =>
  Schema.Struct({
    containsSampledData: Schema.optional(Schema.Boolean),
    columnHeaders: Schema.optional(
      Schema.Array(
        Schema.Struct({
          dataType: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          columnType: Schema.optional(Schema.String),
        }),
      ),
    ),
    id: Schema.optional(Schema.String),
    itemsPerPage: Schema.optional(Schema.Number),
    sampleSize: Schema.optional(Schema.String),
    sampleSpace: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    profileInfo: Schema.optional(
      Schema.Struct({
        webPropertyId: Schema.optional(Schema.String),
        profileId: Schema.optional(Schema.String),
        accountId: Schema.optional(Schema.String),
        internalWebPropertyId: Schema.optional(Schema.String),
        tableId: Schema.optional(Schema.String),
        profileName: Schema.optional(Schema.String),
      }),
    ),
    totalResults: Schema.optional(Schema.Number),
    totalsForAllResults: Schema.optional(
      Schema.Record(Schema.String, Schema.String),
    ),
    dataTable: Schema.optional(
      Schema.Struct({
        cols: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              label: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
            }),
          ),
        ),
        rows: Schema.optional(
          Schema.Array(
            Schema.Struct({
              c: Schema.optional(
                Schema.Array(
                  Schema.Struct({ v: Schema.optional(Schema.String) }),
                ),
              ),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    query: Schema.optional(
      Schema.Struct({
        filters: Schema.optional(Schema.String),
        sort: Schema.optional(Schema.Array(Schema.String)),
        "end-date": Schema.optional(Schema.String),
        ids: Schema.optional(Schema.String),
        "max-results": Schema.optional(Schema.Number),
        "start-index": Schema.optional(Schema.Number),
        samplingLevel: Schema.optional(Schema.String),
        metrics: Schema.optional(Schema.Array(Schema.String)),
        segment: Schema.optional(Schema.String),
        dimensions: Schema.optional(Schema.String),
        "start-date": Schema.optional(Schema.String),
      }),
    ),
    rows: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
    dataLastRefreshed: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "GaData" }) as any as Schema.Schema<GaData>;

export interface ProfileFilterLinks {
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this profile filter link collection. */
  nextLink?: string;
  /** Link to previous page for this profile filter link collection. */
  previousLink?: string;
  /** A list of profile filter links. */
  items?: Array<ProfileFilterLink>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
}

export const ProfileFilterLinks: Schema.Schema<ProfileFilterLinks> =
  Schema.suspend(() =>
    Schema.Struct({
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(ProfileFilterLink)),
      totalResults: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ProfileFilterLinks",
  }) as any as Schema.Schema<ProfileFilterLinks>;

export interface Columns {
  /** List of columns for a report type. */
  items?: Array<Column>;
  /** Total number of columns returned in the response. */
  totalResults?: number;
  /** List of attributes names returned by columns. */
  attributeNames?: Array<string>;
  /** Etag of collection. This etag can be compared with the last response etag to check if response has changed. */
  etag?: string;
  /** Collection type. */
  kind?: string;
}

export const Columns: Schema.Schema<Columns> = Schema.suspend(() =>
  Schema.Struct({
    items: Schema.optional(Schema.Array(Column)),
    totalResults: Schema.optional(Schema.Number),
    attributeNames: Schema.optional(Schema.Array(Schema.String)),
    etag: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Columns" }) as any as Schema.Schema<Columns>;

export interface Profiles {
  /** Link to next page for this view (profile) collection. */
  nextLink?: string;
  /** Link to previous page for this view (profile) collection. */
  previousLink?: string;
  /** A list of views (profiles). */
  items?: Array<Profile>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** Collection type. */
  kind?: string;
}

export const Profiles: Schema.Schema<Profiles> = Schema.suspend(() =>
  Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
    items: Schema.optional(Schema.Array(Profile)),
    totalResults: Schema.optional(Schema.Number),
    itemsPerPage: Schema.optional(Schema.Number),
    startIndex: Schema.optional(Schema.Number),
    username: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Profiles" }) as any as Schema.Schema<Profiles>;

export interface AnalyticsDataimportDeleteUploadDataRequest {
  /** A list of upload UIDs. */
  customDataImportUids?: Array<string>;
}

export const AnalyticsDataimportDeleteUploadDataRequest: Schema.Schema<AnalyticsDataimportDeleteUploadDataRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      customDataImportUids: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AnalyticsDataimportDeleteUploadDataRequest",
  }) as any as Schema.Schema<AnalyticsDataimportDeleteUploadDataRequest>;

export interface CustomDimension {
  /** Kind value for a custom dimension. Set to "analytics#customDimension". It is a read-only field. */
  kind?: string;
  /** Index of the custom dimension. */
  index?: number;
  /** Time the custom dimension was last modified. */
  updated?: string;
  /** Parent link for the custom dimension. Points to the property to which the custom dimension belongs. */
  parentLink?: { type?: string; href?: string };
  /** Link for the custom dimension */
  selfLink?: string;
  /** Account ID. */
  accountId?: string;
  /** Scope of the custom dimension: HIT, SESSION, USER or PRODUCT. */
  scope?: string;
  /** Property ID. */
  webPropertyId?: string;
  /** Boolean indicating whether the custom dimension is active. */
  active?: boolean;
  /** Custom dimension ID. */
  id?: string;
  /** Time the custom dimension was created. */
  created?: string;
  /** Name of the custom dimension. */
  name?: string;
}

export const CustomDimension: Schema.Schema<CustomDimension> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      index: Schema.optional(Schema.Number),
      updated: Schema.optional(Schema.String),
      parentLink: Schema.optional(
        Schema.Struct({
          type: Schema.optional(Schema.String),
          href: Schema.optional(Schema.String),
        }),
      ),
      selfLink: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.String),
      webPropertyId: Schema.optional(Schema.String),
      active: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      created: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CustomDimension",
}) as any as Schema.Schema<CustomDimension>;

export interface CustomDimensions {
  /** Collection type. */
  kind?: string;
  /** Email ID of the authenticated user */
  username?: string;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Collection of custom dimensions. */
  items?: Array<CustomDimension>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Link to next page for this custom dimension collection. */
  nextLink?: string;
  /** Link to previous page for this custom dimension collection. */
  previousLink?: string;
}

export const CustomDimensions: Schema.Schema<CustomDimensions> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      items: Schema.optional(Schema.Array(CustomDimension)),
      totalResults: Schema.optional(Schema.Number),
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CustomDimensions",
}) as any as Schema.Schema<CustomDimensions>;

export interface HashClientIdRequest {
  kind?: string;
  webPropertyId?: string;
  clientId?: string;
}

export const HashClientIdRequest: Schema.Schema<HashClientIdRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      webPropertyId: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HashClientIdRequest",
  }) as any as Schema.Schema<HashClientIdRequest>;

export interface RemarketingAudiences {
  /** Link to next page for this remarketing audience collection. */
  nextLink?: string;
  /** Link to previous page for this view (profile) collection. */
  previousLink?: string;
  /** A list of remarketing audiences. */
  items?: Array<RemarketingAudience>;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** Email ID of the authenticated user */
  username?: string;
  /** Collection type. */
  kind?: string;
}

export const RemarketingAudiences: Schema.Schema<RemarketingAudiences> =
  Schema.suspend(() =>
    Schema.Struct({
      nextLink: Schema.optional(Schema.String),
      previousLink: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(RemarketingAudience)),
      totalResults: Schema.optional(Schema.Number),
      itemsPerPage: Schema.optional(Schema.Number),
      startIndex: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RemarketingAudiences",
  }) as any as Schema.Schema<RemarketingAudiences>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetDataMcfRequest {
  /** End date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo. */
  "end-date": string;
  /** A comma-separated list of dimension or metric filters to be applied to the Analytics data. */
  filters?: string;
  /** A comma-separated list of dimensions or metrics that determine the sort order for the Analytics data. */
  sort?: string;
  /** The maximum number of entries to include in this feed. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID. */
  ids: string;
  /** The desired sampling level. */
  samplingLevel?: "DEFAULT" | "FASTER" | "HIGHER_PRECISION" | (string & {});
  /** A comma-separated list of Multi-Channel Funnels dimensions. E.g., 'mcf:source,mcf:medium'. */
  dimensions?: string;
  /** Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo. */
  "start-date": string;
  /** A comma-separated list of Multi-Channel Funnels metrics. E.g., 'mcf:totalConversions,mcf:totalConversionValue'. At least one metric must be specified. */
  metrics: string;
}

export const GetDataMcfRequest = Schema.Struct({
  "end-date": Schema.String.pipe(T.HttpQuery("end-date")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  ids: Schema.String.pipe(T.HttpQuery("ids")),
  samplingLevel: Schema.optional(Schema.String).pipe(
    T.HttpQuery("samplingLevel"),
  ),
  dimensions: Schema.optional(Schema.String).pipe(T.HttpQuery("dimensions")),
  "start-date": Schema.String.pipe(T.HttpQuery("start-date")),
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
}).pipe(
  T.Http({ method: "GET", path: "data/mcf" }),
  svc,
) as unknown as Schema.Schema<GetDataMcfRequest>;

export type GetDataMcfResponse = McfData;
export const GetDataMcfResponse = McfData;

export type GetDataMcfError = DefaultErrors;

/** Returns Analytics Multi-Channel Funnels data for a view (profile). */
export const getDataMcf: API.OperationMethod<
  GetDataMcfRequest,
  GetDataMcfResponse,
  GetDataMcfError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDataMcfRequest,
  output: GetDataMcfResponse,
  errors: [],
}));

export interface GetDataGaRequest {
  /** A comma-separated list of Analytics metrics. E.g., 'ga:sessions,ga:pageviews'. At least one metric must be specified. */
  metrics: string;
  /** An Analytics segment to be applied to data. */
  segment?: string;
  /** A comma-separated list of Analytics dimensions. E.g., 'ga:browser,ga:city'. */
  dimensions?: string;
  /** The desired sampling level. */
  samplingLevel?: "DEFAULT" | "FASTER" | "HIGHER_PRECISION" | (string & {});
  /** The selected format for the response. Default format is JSON. */
  output?: "dataTable" | "json" | (string & {});
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo. */
  "start-date": string;
  /** The response will include empty rows if this parameter is set to true, the default is true */
  "include-empty-rows"?: boolean;
  /** Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID. */
  ids: string;
  /** The maximum number of entries to include in this feed. */
  "max-results"?: number;
  /** A comma-separated list of dimension or metric filters to be applied to Analytics data. */
  filters?: string;
  /** A comma-separated list of dimensions or metrics that determine the sort order for Analytics data. */
  sort?: string;
  /** End date for fetching Analytics data. Request can should specify an end date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is yesterday. */
  "end-date": string;
}

export const GetDataGaRequest = Schema.Struct({
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
  segment: Schema.optional(Schema.String).pipe(T.HttpQuery("segment")),
  dimensions: Schema.optional(Schema.String).pipe(T.HttpQuery("dimensions")),
  samplingLevel: Schema.optional(Schema.String).pipe(
    T.HttpQuery("samplingLevel"),
  ),
  output: Schema.optional(Schema.String).pipe(T.HttpQuery("output")),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  "start-date": Schema.String.pipe(T.HttpQuery("start-date")),
  "include-empty-rows": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include-empty-rows"),
  ),
  ids: Schema.String.pipe(T.HttpQuery("ids")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  "end-date": Schema.String.pipe(T.HttpQuery("end-date")),
}).pipe(
  T.Http({ method: "GET", path: "data/ga" }),
  svc,
) as unknown as Schema.Schema<GetDataGaRequest>;

export type GetDataGaResponse = GaData;
export const GetDataGaResponse = GaData;

export type GetDataGaError = DefaultErrors;

/** Returns Analytics data for a view (profile). */
export const getDataGa: API.OperationMethod<
  GetDataGaRequest,
  GetDataGaResponse,
  GetDataGaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDataGaRequest,
  output: GetDataGaResponse,
  errors: [],
}));

export interface GetDataRealtimeRequest {
  /** A comma-separated list of dimension or metric filters to be applied to real time data. */
  filters?: string;
  /** A comma-separated list of dimensions or metrics that determine the sort order for real time data. */
  sort?: string;
  /** Unique table ID for retrieving real time data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID. */
  ids: string;
  /** A comma-separated list of real time metrics. E.g., 'rt:activeUsers'. At least one metric must be specified. */
  metrics: string;
  /** A comma-separated list of real time dimensions. E.g., 'rt:medium,rt:city'. */
  dimensions?: string;
  /** The maximum number of entries to include in this feed. */
  "max-results"?: number;
}

export const GetDataRealtimeRequest = Schema.Struct({
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  ids: Schema.String.pipe(T.HttpQuery("ids")),
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
  dimensions: Schema.optional(Schema.String).pipe(T.HttpQuery("dimensions")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "data/realtime" }),
  svc,
) as unknown as Schema.Schema<GetDataRealtimeRequest>;

export type GetDataRealtimeResponse = RealtimeData;
export const GetDataRealtimeResponse = RealtimeData;

export type GetDataRealtimeError = DefaultErrors;

/** Returns real time data for a view (profile). */
export const getDataRealtime: API.OperationMethod<
  GetDataRealtimeRequest,
  GetDataRealtimeResponse,
  GetDataRealtimeError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDataRealtimeRequest,
  output: GetDataRealtimeResponse,
  errors: [],
}));

export interface GetManagementGoalsRequest {
  /** Account ID to retrieve the goal for. */
  accountId: string;
  /** Goal ID to retrieve the goal for. */
  goalId: string;
  /** View (Profile) ID to retrieve the goal for. */
  profileId: string;
  /** Web property ID to retrieve the goal for. */
  webPropertyId: string;
}

export const GetManagementGoalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  goalId: Schema.String.pipe(T.HttpPath("goalId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementGoalsRequest>;

export type GetManagementGoalsResponse = Goal;
export const GetManagementGoalsResponse = Goal;

export type GetManagementGoalsError = DefaultErrors;

/** Gets a goal to which the user has access. */
export const getManagementGoals: API.OperationMethod<
  GetManagementGoalsRequest,
  GetManagementGoalsResponse,
  GetManagementGoalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementGoalsRequest,
  output: GetManagementGoalsResponse,
  errors: [],
}));

export interface ListManagementGoalsRequest {
  /** Web property ID to retrieve goals for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
  /** The maximum number of goals to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve goals for. Can either be a specific view (profile) ID or '~all', which refers to all the views (profiles) that user has access to. */
  profileId: string;
  /** An index of the first goal to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID to retrieve goals for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to. */
  accountId: string;
}

export const ListManagementGoalsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementGoalsRequest>;

export type ListManagementGoalsResponse = Goals;
export const ListManagementGoalsResponse = Goals;

export type ListManagementGoalsError = DefaultErrors;

/** Lists goals to which the user has access. */
export const listManagementGoals: API.OperationMethod<
  ListManagementGoalsRequest,
  ListManagementGoalsResponse,
  ListManagementGoalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementGoalsRequest,
  output: ListManagementGoalsResponse,
  errors: [],
}));

export interface InsertManagementGoalsRequest {
  /** Web property ID to create the goal for. */
  webPropertyId: string;
  /** View (Profile) ID to create the goal for. */
  profileId: string;
  /** Account ID to create the goal for. */
  accountId: string;
  /** Request body */
  body?: Goal;
}

export const InsertManagementGoalsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Goal).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementGoalsRequest>;

export type InsertManagementGoalsResponse = Goal;
export const InsertManagementGoalsResponse = Goal;

export type InsertManagementGoalsError = DefaultErrors;

/** Create a new goal. */
export const insertManagementGoals: API.OperationMethod<
  InsertManagementGoalsRequest,
  InsertManagementGoalsResponse,
  InsertManagementGoalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementGoalsRequest,
  output: InsertManagementGoalsResponse,
  errors: [],
}));

export interface PatchManagementGoalsRequest {
  /** Web property ID to update the goal. */
  webPropertyId: string;
  /** Index of the goal to be updated. */
  goalId: string;
  /** View (Profile) ID to update the goal. */
  profileId: string;
  /** Account ID to update the goal. */
  accountId: string;
  /** Request body */
  body?: Goal;
}

export const PatchManagementGoalsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  goalId: Schema.String.pipe(T.HttpPath("goalId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Goal).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementGoalsRequest>;

export type PatchManagementGoalsResponse = Goal;
export const PatchManagementGoalsResponse = Goal;

export type PatchManagementGoalsError = DefaultErrors;

/** Updates an existing goal. This method supports patch semantics. */
export const patchManagementGoals: API.OperationMethod<
  PatchManagementGoalsRequest,
  PatchManagementGoalsResponse,
  PatchManagementGoalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementGoalsRequest,
  output: PatchManagementGoalsResponse,
  errors: [],
}));

export interface UpdateManagementGoalsRequest {
  /** Index of the goal to be updated. */
  goalId: string;
  /** View (Profile) ID to update the goal. */
  profileId: string;
  /** Account ID to update the goal. */
  accountId: string;
  /** Web property ID to update the goal. */
  webPropertyId: string;
  /** Request body */
  body?: Goal;
}

export const UpdateManagementGoalsRequest = Schema.Struct({
  goalId: Schema.String.pipe(T.HttpPath("goalId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Goal).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementGoalsRequest>;

export type UpdateManagementGoalsResponse = Goal;
export const UpdateManagementGoalsResponse = Goal;

export type UpdateManagementGoalsError = DefaultErrors;

/** Updates an existing goal. */
export const updateManagementGoals: API.OperationMethod<
  UpdateManagementGoalsRequest,
  UpdateManagementGoalsResponse,
  UpdateManagementGoalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementGoalsRequest,
  output: UpdateManagementGoalsResponse,
  errors: [],
}));

export interface ListManagementWebPropertyAdWordsLinksRequest {
  /** Web property ID to retrieve the Google Ads links for. */
  webPropertyId: string;
  /** ID of the account which the given web property belongs to. */
  accountId: string;
  /** The maximum number of webProperty-Google Ads links to include in this response. */
  "max-results"?: number;
  /** An index of the first webProperty-Google Ads link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementWebPropertyAdWordsLinksRequest>;

export type ListManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLinks;
export const ListManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLinks;

export type ListManagementWebPropertyAdWordsLinksError = DefaultErrors;

/** Lists webProperty-Google Ads links for a given web property. */
export const listManagementWebPropertyAdWordsLinks: API.OperationMethod<
  ListManagementWebPropertyAdWordsLinksRequest,
  ListManagementWebPropertyAdWordsLinksResponse,
  ListManagementWebPropertyAdWordsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementWebPropertyAdWordsLinksRequest,
  output: ListManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

export interface UpdateManagementWebPropertyAdWordsLinksRequest {
  /** ID of the account which the given web property belongs to. */
  accountId: string;
  /** Web property-Google Ads link ID. */
  webPropertyAdWordsLinkId: string;
  /** Web property ID to retrieve the Google Ads link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityAdWordsLink;
}

export const UpdateManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyAdWordsLinkId: Schema.String.pipe(
    T.HttpPath("webPropertyAdWordsLinkId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityAdWordsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementWebPropertyAdWordsLinksRequest>;

export type UpdateManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const UpdateManagementWebPropertyAdWordsLinksResponse =
  EntityAdWordsLink;

export type UpdateManagementWebPropertyAdWordsLinksError = DefaultErrors;

/** Updates an existing webProperty-Google Ads link. */
export const updateManagementWebPropertyAdWordsLinks: API.OperationMethod<
  UpdateManagementWebPropertyAdWordsLinksRequest,
  UpdateManagementWebPropertyAdWordsLinksResponse,
  UpdateManagementWebPropertyAdWordsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementWebPropertyAdWordsLinksRequest,
  output: UpdateManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

export interface InsertManagementWebPropertyAdWordsLinksRequest {
  /** ID of the Google Analytics account to create the link for. */
  accountId: string;
  /** Web property ID to create the link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityAdWordsLink;
}

export const InsertManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityAdWordsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementWebPropertyAdWordsLinksRequest>;

export type InsertManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const InsertManagementWebPropertyAdWordsLinksResponse =
  EntityAdWordsLink;

export type InsertManagementWebPropertyAdWordsLinksError = DefaultErrors;

/** Creates a webProperty-Google Ads link. */
export const insertManagementWebPropertyAdWordsLinks: API.OperationMethod<
  InsertManagementWebPropertyAdWordsLinksRequest,
  InsertManagementWebPropertyAdWordsLinksResponse,
  InsertManagementWebPropertyAdWordsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementWebPropertyAdWordsLinksRequest,
  output: InsertManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

export interface PatchManagementWebPropertyAdWordsLinksRequest {
  /** ID of the account which the given web property belongs to. */
  accountId: string;
  /** Web property-Google Ads link ID. */
  webPropertyAdWordsLinkId: string;
  /** Web property ID to retrieve the Google Ads link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityAdWordsLink;
}

export const PatchManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyAdWordsLinkId: Schema.String.pipe(
    T.HttpPath("webPropertyAdWordsLinkId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityAdWordsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementWebPropertyAdWordsLinksRequest>;

export type PatchManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const PatchManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;

export type PatchManagementWebPropertyAdWordsLinksError = DefaultErrors;

/** Updates an existing webProperty-Google Ads link. This method supports patch semantics. */
export const patchManagementWebPropertyAdWordsLinks: API.OperationMethod<
  PatchManagementWebPropertyAdWordsLinksRequest,
  PatchManagementWebPropertyAdWordsLinksResponse,
  PatchManagementWebPropertyAdWordsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementWebPropertyAdWordsLinksRequest,
  output: PatchManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

export interface GetManagementWebPropertyAdWordsLinksRequest {
  /** ID of the account which the given web property belongs to. */
  accountId: string;
  /** Web property-Google Ads link ID. */
  webPropertyAdWordsLinkId: string;
  /** Web property ID to retrieve the Google Ads link for. */
  webPropertyId: string;
}

export const GetManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyAdWordsLinkId: Schema.String.pipe(
    T.HttpPath("webPropertyAdWordsLinkId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementWebPropertyAdWordsLinksRequest>;

export type GetManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const GetManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;

export type GetManagementWebPropertyAdWordsLinksError = DefaultErrors;

/** Returns a web property-Google Ads link to which the user has access. */
export const getManagementWebPropertyAdWordsLinks: API.OperationMethod<
  GetManagementWebPropertyAdWordsLinksRequest,
  GetManagementWebPropertyAdWordsLinksResponse,
  GetManagementWebPropertyAdWordsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementWebPropertyAdWordsLinksRequest,
  output: GetManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

export interface DeleteManagementWebPropertyAdWordsLinksRequest {
  /** Web property Google Ads link ID. */
  webPropertyAdWordsLinkId: string;
  /** Web property ID to delete the Google Ads link for. */
  webPropertyId: string;
  /** ID of the account which the given web property belongs to. */
  accountId: string;
}

export const DeleteManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  webPropertyAdWordsLinkId: Schema.String.pipe(
    T.HttpPath("webPropertyAdWordsLinkId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementWebPropertyAdWordsLinksRequest>;

export interface DeleteManagementWebPropertyAdWordsLinksResponse {}
export const DeleteManagementWebPropertyAdWordsLinksResponse: Schema.Schema<DeleteManagementWebPropertyAdWordsLinksResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementWebPropertyAdWordsLinksResponse>;

export type DeleteManagementWebPropertyAdWordsLinksError = DefaultErrors;

/** Deletes a web property-Google Ads link. */
export const deleteManagementWebPropertyAdWordsLinks: API.OperationMethod<
  DeleteManagementWebPropertyAdWordsLinksRequest,
  DeleteManagementWebPropertyAdWordsLinksResponse,
  DeleteManagementWebPropertyAdWordsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementWebPropertyAdWordsLinksRequest,
  output: DeleteManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

export interface ListManagementCustomMetricsRequest {
  /** The maximum number of custom metrics to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID for the custom metrics to retrieve. */
  accountId: string;
  /** Web property ID for the custom metrics to retrieve. */
  webPropertyId: string;
}

export const ListManagementCustomMetricsRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementCustomMetricsRequest>;

export type ListManagementCustomMetricsResponse = CustomMetrics;
export const ListManagementCustomMetricsResponse = CustomMetrics;

export type ListManagementCustomMetricsError = DefaultErrors;

/** Lists custom metrics to which the user has access. */
export const listManagementCustomMetrics: API.OperationMethod<
  ListManagementCustomMetricsRequest,
  ListManagementCustomMetricsResponse,
  ListManagementCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementCustomMetricsRequest,
  output: ListManagementCustomMetricsResponse,
  errors: [],
}));

export interface UpdateManagementCustomMetricsRequest {
  /** Web property ID for the custom metric to update. */
  webPropertyId: string;
  /** Account ID for the custom metric to update. */
  accountId: string;
  /** Force the update and ignore any warnings related to the custom metric being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Custom metric ID for the custom metric to update. */
  customMetricId: string;
  /** Request body */
  body?: CustomMetric;
}

export const UpdateManagementCustomMetricsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreCustomDataSourceLinks"),
  ),
  customMetricId: Schema.String.pipe(T.HttpPath("customMetricId")),
  body: Schema.optional(CustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementCustomMetricsRequest>;

export type UpdateManagementCustomMetricsResponse = CustomMetric;
export const UpdateManagementCustomMetricsResponse = CustomMetric;

export type UpdateManagementCustomMetricsError = DefaultErrors;

/** Updates an existing custom metric. */
export const updateManagementCustomMetrics: API.OperationMethod<
  UpdateManagementCustomMetricsRequest,
  UpdateManagementCustomMetricsResponse,
  UpdateManagementCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementCustomMetricsRequest,
  output: UpdateManagementCustomMetricsResponse,
  errors: [],
}));

export interface InsertManagementCustomMetricsRequest {
  /** Web property ID for the custom dimension to create. */
  webPropertyId: string;
  /** Account ID for the custom metric to create. */
  accountId: string;
  /** Request body */
  body?: CustomMetric;
}

export const InsertManagementCustomMetricsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(CustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementCustomMetricsRequest>;

export type InsertManagementCustomMetricsResponse = CustomMetric;
export const InsertManagementCustomMetricsResponse = CustomMetric;

export type InsertManagementCustomMetricsError = DefaultErrors;

/** Create a new custom metric. */
export const insertManagementCustomMetrics: API.OperationMethod<
  InsertManagementCustomMetricsRequest,
  InsertManagementCustomMetricsResponse,
  InsertManagementCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementCustomMetricsRequest,
  output: InsertManagementCustomMetricsResponse,
  errors: [],
}));

export interface PatchManagementCustomMetricsRequest {
  /** Custom metric ID for the custom metric to update. */
  customMetricId: string;
  /** Account ID for the custom metric to update. */
  accountId: string;
  /** Force the update and ignore any warnings related to the custom metric being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Web property ID for the custom metric to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomMetric;
}

export const PatchManagementCustomMetricsRequest = Schema.Struct({
  customMetricId: Schema.String.pipe(T.HttpPath("customMetricId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreCustomDataSourceLinks"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementCustomMetricsRequest>;

export type PatchManagementCustomMetricsResponse = CustomMetric;
export const PatchManagementCustomMetricsResponse = CustomMetric;

export type PatchManagementCustomMetricsError = DefaultErrors;

/** Updates an existing custom metric. This method supports patch semantics. */
export const patchManagementCustomMetrics: API.OperationMethod<
  PatchManagementCustomMetricsRequest,
  PatchManagementCustomMetricsResponse,
  PatchManagementCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementCustomMetricsRequest,
  output: PatchManagementCustomMetricsResponse,
  errors: [],
}));

export interface GetManagementCustomMetricsRequest {
  /** The ID of the custom metric to retrieve. */
  customMetricId: string;
  /** Account ID for the custom metric to retrieve. */
  accountId: string;
  /** Web property ID for the custom metric to retrieve. */
  webPropertyId: string;
}

export const GetManagementCustomMetricsRequest = Schema.Struct({
  customMetricId: Schema.String.pipe(T.HttpPath("customMetricId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementCustomMetricsRequest>;

export type GetManagementCustomMetricsResponse = CustomMetric;
export const GetManagementCustomMetricsResponse = CustomMetric;

export type GetManagementCustomMetricsError = DefaultErrors;

/** Get a custom metric to which the user has access. */
export const getManagementCustomMetrics: API.OperationMethod<
  GetManagementCustomMetricsRequest,
  GetManagementCustomMetricsResponse,
  GetManagementCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementCustomMetricsRequest,
  output: GetManagementCustomMetricsResponse,
  errors: [],
}));

export interface DeleteManagementProfileFilterLinksRequest {
  /** ID of the profile filter link to delete. */
  linkId: string;
  /** Profile ID to which the filter link belongs. */
  profileId: string;
  /** Account ID to which the profile filter link belongs. */
  accountId: string;
  /** Web property Id to which the profile filter link belongs. */
  webPropertyId: string;
}

export const DeleteManagementProfileFilterLinksRequest = Schema.Struct({
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementProfileFilterLinksRequest>;

export interface DeleteManagementProfileFilterLinksResponse {}
export const DeleteManagementProfileFilterLinksResponse: Schema.Schema<DeleteManagementProfileFilterLinksResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementProfileFilterLinksResponse>;

export type DeleteManagementProfileFilterLinksError = DefaultErrors;

/** Delete a profile filter link. */
export const deleteManagementProfileFilterLinks: API.OperationMethod<
  DeleteManagementProfileFilterLinksRequest,
  DeleteManagementProfileFilterLinksResponse,
  DeleteManagementProfileFilterLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementProfileFilterLinksRequest,
  output: DeleteManagementProfileFilterLinksResponse,
  errors: [],
}));

export interface GetManagementProfileFilterLinksRequest {
  /** Web property Id to retrieve profile filter link for. */
  webPropertyId: string;
  /** Account ID to retrieve profile filter link for. */
  accountId: string;
  /** ID of the profile filter link. */
  linkId: string;
  /** Profile ID to retrieve filter link for. */
  profileId: string;
}

export const GetManagementProfileFilterLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementProfileFilterLinksRequest>;

export type GetManagementProfileFilterLinksResponse = ProfileFilterLink;
export const GetManagementProfileFilterLinksResponse = ProfileFilterLink;

export type GetManagementProfileFilterLinksError = DefaultErrors;

/** Returns a single profile filter link. */
export const getManagementProfileFilterLinks: API.OperationMethod<
  GetManagementProfileFilterLinksRequest,
  GetManagementProfileFilterLinksResponse,
  GetManagementProfileFilterLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementProfileFilterLinksRequest,
  output: GetManagementProfileFilterLinksResponse,
  errors: [],
}));

export interface UpdateManagementProfileFilterLinksRequest {
  /** Account ID to which profile filter link belongs. */
  accountId: string;
  /** ID of the profile filter link to be updated. */
  linkId: string;
  /** Profile ID to which filter link belongs */
  profileId: string;
  /** Web property Id to which profile filter link belongs */
  webPropertyId: string;
  /** Request body */
  body?: ProfileFilterLink;
}

export const UpdateManagementProfileFilterLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(ProfileFilterLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementProfileFilterLinksRequest>;

export type UpdateManagementProfileFilterLinksResponse = ProfileFilterLink;
export const UpdateManagementProfileFilterLinksResponse = ProfileFilterLink;

export type UpdateManagementProfileFilterLinksError = DefaultErrors;

/** Update an existing profile filter link. */
export const updateManagementProfileFilterLinks: API.OperationMethod<
  UpdateManagementProfileFilterLinksRequest,
  UpdateManagementProfileFilterLinksResponse,
  UpdateManagementProfileFilterLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementProfileFilterLinksRequest,
  output: UpdateManagementProfileFilterLinksResponse,
  errors: [],
}));

export interface InsertManagementProfileFilterLinksRequest {
  /** Web property Id to create profile filter link for. */
  webPropertyId: string;
  /** Profile ID to create filter link for. */
  profileId: string;
  /** Account ID to create profile filter link for. */
  accountId: string;
  /** Request body */
  body?: ProfileFilterLink;
}

export const InsertManagementProfileFilterLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(ProfileFilterLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementProfileFilterLinksRequest>;

export type InsertManagementProfileFilterLinksResponse = ProfileFilterLink;
export const InsertManagementProfileFilterLinksResponse = ProfileFilterLink;

export type InsertManagementProfileFilterLinksError = DefaultErrors;

/** Create a new profile filter link. */
export const insertManagementProfileFilterLinks: API.OperationMethod<
  InsertManagementProfileFilterLinksRequest,
  InsertManagementProfileFilterLinksResponse,
  InsertManagementProfileFilterLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementProfileFilterLinksRequest,
  output: InsertManagementProfileFilterLinksResponse,
  errors: [],
}));

export interface PatchManagementProfileFilterLinksRequest {
  /** Web property Id to which profile filter link belongs */
  webPropertyId: string;
  /** Account ID to which profile filter link belongs. */
  accountId: string;
  /** ID of the profile filter link to be updated. */
  linkId: string;
  /** Profile ID to which filter link belongs */
  profileId: string;
  /** Request body */
  body?: ProfileFilterLink;
}

export const PatchManagementProfileFilterLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(ProfileFilterLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementProfileFilterLinksRequest>;

export type PatchManagementProfileFilterLinksResponse = ProfileFilterLink;
export const PatchManagementProfileFilterLinksResponse = ProfileFilterLink;

export type PatchManagementProfileFilterLinksError = DefaultErrors;

/** Update an existing profile filter link. This method supports patch semantics. */
export const patchManagementProfileFilterLinks: API.OperationMethod<
  PatchManagementProfileFilterLinksRequest,
  PatchManagementProfileFilterLinksResponse,
  PatchManagementProfileFilterLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementProfileFilterLinksRequest,
  output: PatchManagementProfileFilterLinksResponse,
  errors: [],
}));

export interface ListManagementProfileFilterLinksRequest {
  /** Web property Id for profile filter links for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
  /** The maximum number of profile filter links to include in this response. */
  "max-results"?: number;
  /** Profile ID to retrieve filter links for. Can either be a specific profile ID or '~all', which refers to all the profiles that user has access to. */
  profileId: string;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID to retrieve profile filter links for. */
  accountId: string;
}

export const ListManagementProfileFilterLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementProfileFilterLinksRequest>;

export type ListManagementProfileFilterLinksResponse = ProfileFilterLinks;
export const ListManagementProfileFilterLinksResponse = ProfileFilterLinks;

export type ListManagementProfileFilterLinksError = DefaultErrors;

/** Lists all profile filter links for a profile. */
export const listManagementProfileFilterLinks: API.OperationMethod<
  ListManagementProfileFilterLinksRequest,
  ListManagementProfileFilterLinksResponse,
  ListManagementProfileFilterLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementProfileFilterLinksRequest,
  output: ListManagementProfileFilterLinksResponse,
  errors: [],
}));

export interface ListManagementCustomDataSourcesRequest {
  /** The maximum number of custom data sources to include in this response. */
  "max-results"?: number;
  /** A 1-based index of the first custom data source to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account Id for the custom data sources to retrieve. */
  accountId: string;
  /** Web property Id for the custom data sources to retrieve. */
  webPropertyId: string;
}

export const ListManagementCustomDataSourcesRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementCustomDataSourcesRequest>;

export type ListManagementCustomDataSourcesResponse = CustomDataSources;
export const ListManagementCustomDataSourcesResponse = CustomDataSources;

export type ListManagementCustomDataSourcesError = DefaultErrors;

/** List custom data sources to which the user has access. */
export const listManagementCustomDataSources: API.OperationMethod<
  ListManagementCustomDataSourcesRequest,
  ListManagementCustomDataSourcesResponse,
  ListManagementCustomDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementCustomDataSourcesRequest,
  output: ListManagementCustomDataSourcesResponse,
  errors: [],
}));

export interface ListManagementRemarketingAudienceRequest {
  /** The web property ID of the remarketing audiences to retrieve. */
  webPropertyId: string;
  /** The maximum number of remarketing audiences to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  type?: string;
  /** The account ID of the remarketing audiences to retrieve. */
  accountId: string;
}

export const ListManagementRemarketingAudienceRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementRemarketingAudienceRequest>;

export type ListManagementRemarketingAudienceResponse = RemarketingAudiences;
export const ListManagementRemarketingAudienceResponse = RemarketingAudiences;

export type ListManagementRemarketingAudienceError = DefaultErrors;

/** Lists remarketing audiences to which the user has access. */
export const listManagementRemarketingAudience: API.OperationMethod<
  ListManagementRemarketingAudienceRequest,
  ListManagementRemarketingAudienceResponse,
  ListManagementRemarketingAudienceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementRemarketingAudienceRequest,
  output: ListManagementRemarketingAudienceResponse,
  errors: [],
}));

export interface UpdateManagementRemarketingAudienceRequest {
  /** The ID of the remarketing audience to update. */
  remarketingAudienceId: string;
  /** The web property ID of the remarketing audience to update. */
  webPropertyId: string;
  /** The account ID of the remarketing audience to update. */
  accountId: string;
  /** Request body */
  body?: RemarketingAudience;
}

export const UpdateManagementRemarketingAudienceRequest = Schema.Struct({
  remarketingAudienceId: Schema.String.pipe(
    T.HttpPath("remarketingAudienceId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(RemarketingAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementRemarketingAudienceRequest>;

export type UpdateManagementRemarketingAudienceResponse = RemarketingAudience;
export const UpdateManagementRemarketingAudienceResponse = RemarketingAudience;

export type UpdateManagementRemarketingAudienceError = DefaultErrors;

/** Updates an existing remarketing audience. */
export const updateManagementRemarketingAudience: API.OperationMethod<
  UpdateManagementRemarketingAudienceRequest,
  UpdateManagementRemarketingAudienceResponse,
  UpdateManagementRemarketingAudienceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementRemarketingAudienceRequest,
  output: UpdateManagementRemarketingAudienceResponse,
  errors: [],
}));

export interface InsertManagementRemarketingAudienceRequest {
  /** The account ID for which to create the remarketing audience. */
  accountId: string;
  /** Web property ID for which to create the remarketing audience. */
  webPropertyId: string;
  /** Request body */
  body?: RemarketingAudience;
}

export const InsertManagementRemarketingAudienceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(RemarketingAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementRemarketingAudienceRequest>;

export type InsertManagementRemarketingAudienceResponse = RemarketingAudience;
export const InsertManagementRemarketingAudienceResponse = RemarketingAudience;

export type InsertManagementRemarketingAudienceError = DefaultErrors;

/** Creates a new remarketing audience. */
export const insertManagementRemarketingAudience: API.OperationMethod<
  InsertManagementRemarketingAudienceRequest,
  InsertManagementRemarketingAudienceResponse,
  InsertManagementRemarketingAudienceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementRemarketingAudienceRequest,
  output: InsertManagementRemarketingAudienceResponse,
  errors: [],
}));

export interface PatchManagementRemarketingAudienceRequest {
  /** The ID of the remarketing audience to update. */
  remarketingAudienceId: string;
  /** The web property ID of the remarketing audience to update. */
  webPropertyId: string;
  /** The account ID of the remarketing audience to update. */
  accountId: string;
  /** Request body */
  body?: RemarketingAudience;
}

export const PatchManagementRemarketingAudienceRequest = Schema.Struct({
  remarketingAudienceId: Schema.String.pipe(
    T.HttpPath("remarketingAudienceId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(RemarketingAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementRemarketingAudienceRequest>;

export type PatchManagementRemarketingAudienceResponse = RemarketingAudience;
export const PatchManagementRemarketingAudienceResponse = RemarketingAudience;

export type PatchManagementRemarketingAudienceError = DefaultErrors;

/** Updates an existing remarketing audience. This method supports patch semantics. */
export const patchManagementRemarketingAudience: API.OperationMethod<
  PatchManagementRemarketingAudienceRequest,
  PatchManagementRemarketingAudienceResponse,
  PatchManagementRemarketingAudienceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementRemarketingAudienceRequest,
  output: PatchManagementRemarketingAudienceResponse,
  errors: [],
}));

export interface GetManagementRemarketingAudienceRequest {
  /** The account ID of the remarketing audience to retrieve. */
  accountId: string;
  /** The ID of the remarketing audience to retrieve. */
  remarketingAudienceId: string;
  /** The web property ID of the remarketing audience to retrieve. */
  webPropertyId: string;
}

export const GetManagementRemarketingAudienceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  remarketingAudienceId: Schema.String.pipe(
    T.HttpPath("remarketingAudienceId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementRemarketingAudienceRequest>;

export type GetManagementRemarketingAudienceResponse = RemarketingAudience;
export const GetManagementRemarketingAudienceResponse = RemarketingAudience;

export type GetManagementRemarketingAudienceError = DefaultErrors;

/** Gets a remarketing audience to which the user has access. */
export const getManagementRemarketingAudience: API.OperationMethod<
  GetManagementRemarketingAudienceRequest,
  GetManagementRemarketingAudienceResponse,
  GetManagementRemarketingAudienceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementRemarketingAudienceRequest,
  output: GetManagementRemarketingAudienceResponse,
  errors: [],
}));

export interface DeleteManagementRemarketingAudienceRequest {
  /** The ID of the remarketing audience to delete. */
  remarketingAudienceId: string;
  /** Web property ID to which the remarketing audience belongs. */
  webPropertyId: string;
  /** Account ID to which the remarketing audience belongs. */
  accountId: string;
}

export const DeleteManagementRemarketingAudienceRequest = Schema.Struct({
  remarketingAudienceId: Schema.String.pipe(
    T.HttpPath("remarketingAudienceId"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementRemarketingAudienceRequest>;

export interface DeleteManagementRemarketingAudienceResponse {}
export const DeleteManagementRemarketingAudienceResponse: Schema.Schema<DeleteManagementRemarketingAudienceResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementRemarketingAudienceResponse>;

export type DeleteManagementRemarketingAudienceError = DefaultErrors;

/** Delete a remarketing audience. */
export const deleteManagementRemarketingAudience: API.OperationMethod<
  DeleteManagementRemarketingAudienceRequest,
  DeleteManagementRemarketingAudienceResponse,
  DeleteManagementRemarketingAudienceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementRemarketingAudienceRequest,
  output: DeleteManagementRemarketingAudienceResponse,
  errors: [],
}));

export interface GetManagementUnsampledReportsRequest {
  /** ID of the unsampled report to retrieve. */
  unsampledReportId: string;
  /** Web property ID to retrieve unsampled reports for. */
  webPropertyId: string;
  /** Account ID to retrieve unsampled report for. */
  accountId: string;
  /** View (Profile) ID to retrieve unsampled report for. */
  profileId: string;
}

export const GetManagementUnsampledReportsRequest = Schema.Struct({
  unsampledReportId: Schema.String.pipe(T.HttpPath("unsampledReportId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports/{unsampledReportId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementUnsampledReportsRequest>;

export type GetManagementUnsampledReportsResponse = UnsampledReport;
export const GetManagementUnsampledReportsResponse = UnsampledReport;

export type GetManagementUnsampledReportsError = DefaultErrors;

/** Returns a single unsampled report. */
export const getManagementUnsampledReports: API.OperationMethod<
  GetManagementUnsampledReportsRequest,
  GetManagementUnsampledReportsResponse,
  GetManagementUnsampledReportsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementUnsampledReportsRequest,
  output: GetManagementUnsampledReportsResponse,
  errors: [],
}));

export interface ListManagementUnsampledReportsRequest {
  /** Web property ID to retrieve unsampled reports for. Must be a specific web property ID, ~all is not supported. */
  webPropertyId: string;
  /** The maximum number of unsampled reports to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve unsampled reports for. Must be a specific view (profile) ID, ~all is not supported. */
  profileId: string;
  /** An index of the first unsampled report to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID to retrieve unsampled reports for. Must be a specific account ID, ~all is not supported. */
  accountId: string;
}

export const ListManagementUnsampledReportsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementUnsampledReportsRequest>;

export type ListManagementUnsampledReportsResponse = UnsampledReports;
export const ListManagementUnsampledReportsResponse = UnsampledReports;

export type ListManagementUnsampledReportsError = DefaultErrors;

/** Lists unsampled reports to which the user has access. */
export const listManagementUnsampledReports: API.OperationMethod<
  ListManagementUnsampledReportsRequest,
  ListManagementUnsampledReportsResponse,
  ListManagementUnsampledReportsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementUnsampledReportsRequest,
  output: ListManagementUnsampledReportsResponse,
  errors: [],
}));

export interface DeleteManagementUnsampledReportsRequest {
  /** ID of the unsampled report to be deleted. */
  unsampledReportId: string;
  /** Web property ID to delete the unsampled reports for. */
  webPropertyId: string;
  /** Account ID to delete the unsampled report for. */
  accountId: string;
  /** View (Profile) ID to delete the unsampled report for. */
  profileId: string;
}

export const DeleteManagementUnsampledReportsRequest = Schema.Struct({
  unsampledReportId: Schema.String.pipe(T.HttpPath("unsampledReportId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports/{unsampledReportId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementUnsampledReportsRequest>;

export interface DeleteManagementUnsampledReportsResponse {}
export const DeleteManagementUnsampledReportsResponse: Schema.Schema<DeleteManagementUnsampledReportsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementUnsampledReportsResponse>;

export type DeleteManagementUnsampledReportsError = DefaultErrors;

/** Deletes an unsampled report. */
export const deleteManagementUnsampledReports: API.OperationMethod<
  DeleteManagementUnsampledReportsRequest,
  DeleteManagementUnsampledReportsResponse,
  DeleteManagementUnsampledReportsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementUnsampledReportsRequest,
  output: DeleteManagementUnsampledReportsResponse,
  errors: [],
}));

export interface InsertManagementUnsampledReportsRequest {
  /** Web property ID to create the unsampled report for. */
  webPropertyId: string;
  /** View (Profile) ID to create the unsampled report for. */
  profileId: string;
  /** Account ID to create the unsampled report for. */
  accountId: string;
  /** Request body */
  body?: UnsampledReport;
}

export const InsertManagementUnsampledReportsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(UnsampledReport).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementUnsampledReportsRequest>;

export type InsertManagementUnsampledReportsResponse = UnsampledReport;
export const InsertManagementUnsampledReportsResponse = UnsampledReport;

export type InsertManagementUnsampledReportsError = DefaultErrors;

/** Create a new unsampled report. */
export const insertManagementUnsampledReports: API.OperationMethod<
  InsertManagementUnsampledReportsRequest,
  InsertManagementUnsampledReportsResponse,
  InsertManagementUnsampledReportsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementUnsampledReportsRequest,
  output: InsertManagementUnsampledReportsResponse,
  errors: [],
}));

export interface ListManagementFiltersRequest {
  /** The maximum number of filters to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID to retrieve filters for. */
  accountId: string;
}

export const ListManagementFiltersRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/filters" }),
  svc,
) as unknown as Schema.Schema<ListManagementFiltersRequest>;

export type ListManagementFiltersResponse = Filters;
export const ListManagementFiltersResponse = Filters;

export type ListManagementFiltersError = DefaultErrors;

/** Lists all filters for an account */
export const listManagementFilters: API.OperationMethod<
  ListManagementFiltersRequest,
  ListManagementFiltersResponse,
  ListManagementFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementFiltersRequest,
  output: ListManagementFiltersResponse,
  errors: [],
}));

export interface UpdateManagementFiltersRequest {
  /** Account ID to which the filter belongs. */
  accountId: string;
  /** ID of the filter to be updated. */
  filterId: string;
  /** Request body */
  body?: Filter;
}

export const UpdateManagementFiltersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
  body: Schema.optional(Filter).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/filters/{filterId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementFiltersRequest>;

export type UpdateManagementFiltersResponse = Filter;
export const UpdateManagementFiltersResponse = Filter;

export type UpdateManagementFiltersError = DefaultErrors;

/** Updates an existing filter. */
export const updateManagementFilters: API.OperationMethod<
  UpdateManagementFiltersRequest,
  UpdateManagementFiltersResponse,
  UpdateManagementFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementFiltersRequest,
  output: UpdateManagementFiltersResponse,
  errors: [],
}));

export interface InsertManagementFiltersRequest {
  /** Account ID to create filter for. */
  accountId: string;
  /** Request body */
  body?: Filter;
}

export const InsertManagementFiltersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Filter).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/filters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementFiltersRequest>;

export type InsertManagementFiltersResponse = Filter;
export const InsertManagementFiltersResponse = Filter;

export type InsertManagementFiltersError = DefaultErrors;

/** Create a new filter. */
export const insertManagementFilters: API.OperationMethod<
  InsertManagementFiltersRequest,
  InsertManagementFiltersResponse,
  InsertManagementFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementFiltersRequest,
  output: InsertManagementFiltersResponse,
  errors: [],
}));

export interface PatchManagementFiltersRequest {
  /** Account ID to which the filter belongs. */
  accountId: string;
  /** ID of the filter to be updated. */
  filterId: string;
  /** Request body */
  body?: Filter;
}

export const PatchManagementFiltersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
  body: Schema.optional(Filter).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/filters/{filterId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementFiltersRequest>;

export type PatchManagementFiltersResponse = Filter;
export const PatchManagementFiltersResponse = Filter;

export type PatchManagementFiltersError = DefaultErrors;

/** Updates an existing filter. This method supports patch semantics. */
export const patchManagementFilters: API.OperationMethod<
  PatchManagementFiltersRequest,
  PatchManagementFiltersResponse,
  PatchManagementFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementFiltersRequest,
  output: PatchManagementFiltersResponse,
  errors: [],
}));

export interface GetManagementFiltersRequest {
  /** Account ID to retrieve filters for. */
  accountId: string;
  /** Filter ID to retrieve filters for. */
  filterId: string;
}

export const GetManagementFiltersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/filters/{filterId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementFiltersRequest>;

export type GetManagementFiltersResponse = Filter;
export const GetManagementFiltersResponse = Filter;

export type GetManagementFiltersError = DefaultErrors;

/** Returns filters to which the user has access. */
export const getManagementFilters: API.OperationMethod<
  GetManagementFiltersRequest,
  GetManagementFiltersResponse,
  GetManagementFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementFiltersRequest,
  output: GetManagementFiltersResponse,
  errors: [],
}));

export interface DeleteManagementFiltersRequest {
  /** Account ID to delete the filter for. */
  accountId: string;
  /** ID of the filter to be deleted. */
  filterId: string;
}

export const DeleteManagementFiltersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  filterId: Schema.String.pipe(T.HttpPath("filterId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/filters/{filterId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementFiltersRequest>;

export type DeleteManagementFiltersResponse = Filter;
export const DeleteManagementFiltersResponse = Filter;

export type DeleteManagementFiltersError = DefaultErrors;

/** Delete a filter. */
export const deleteManagementFilters: API.OperationMethod<
  DeleteManagementFiltersRequest,
  DeleteManagementFiltersResponse,
  DeleteManagementFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementFiltersRequest,
  output: DeleteManagementFiltersResponse,
  errors: [],
}));

export interface HashClientIdManagementClientIdRequest {
  /** Request body */
  body?: HashClientIdRequest;
}

export const HashClientIdManagementClientIdRequest = Schema.Struct({
  body: Schema.optional(HashClientIdRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/clientId:hashClientId",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<HashClientIdManagementClientIdRequest>;

export type HashClientIdManagementClientIdResponse = HashClientIdResponse;
export const HashClientIdManagementClientIdResponse = HashClientIdResponse;

export type HashClientIdManagementClientIdError = DefaultErrors;

/** Hashes the given Client ID. */
export const hashClientIdManagementClientId: API.OperationMethod<
  HashClientIdManagementClientIdRequest,
  HashClientIdManagementClientIdResponse,
  HashClientIdManagementClientIdError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: HashClientIdManagementClientIdRequest,
  output: HashClientIdManagementClientIdResponse,
  errors: [],
}));

export interface InsertManagementProfilesRequest {
  /** Account ID to create the view (profile) for. */
  accountId: string;
  /** Web property ID to create the view (profile) for. */
  webPropertyId: string;
  /** Request body */
  body?: Profile;
}

export const InsertManagementProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Profile).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementProfilesRequest>;

export type InsertManagementProfilesResponse = Profile;
export const InsertManagementProfilesResponse = Profile;

export type InsertManagementProfilesError = DefaultErrors;

/** Create a new view (profile). */
export const insertManagementProfiles: API.OperationMethod<
  InsertManagementProfilesRequest,
  InsertManagementProfilesResponse,
  InsertManagementProfilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementProfilesRequest,
  output: InsertManagementProfilesResponse,
  errors: [],
}));

export interface PatchManagementProfilesRequest {
  /** ID of the view (profile) to be updated. */
  profileId: string;
  /** Account ID to which the view (profile) belongs */
  accountId: string;
  /** Web property ID to which the view (profile) belongs */
  webPropertyId: string;
  /** Request body */
  body?: Profile;
}

export const PatchManagementProfilesRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Profile).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementProfilesRequest>;

export type PatchManagementProfilesResponse = Profile;
export const PatchManagementProfilesResponse = Profile;

export type PatchManagementProfilesError = DefaultErrors;

/** Updates an existing view (profile). This method supports patch semantics. */
export const patchManagementProfiles: API.OperationMethod<
  PatchManagementProfilesRequest,
  PatchManagementProfilesResponse,
  PatchManagementProfilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementProfilesRequest,
  output: PatchManagementProfilesResponse,
  errors: [],
}));

export interface UpdateManagementProfilesRequest {
  /** Account ID to which the view (profile) belongs */
  accountId: string;
  /** ID of the view (profile) to be updated. */
  profileId: string;
  /** Web property ID to which the view (profile) belongs */
  webPropertyId: string;
  /** Request body */
  body?: Profile;
}

export const UpdateManagementProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Profile).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementProfilesRequest>;

export type UpdateManagementProfilesResponse = Profile;
export const UpdateManagementProfilesResponse = Profile;

export type UpdateManagementProfilesError = DefaultErrors;

/** Updates an existing view (profile). */
export const updateManagementProfiles: API.OperationMethod<
  UpdateManagementProfilesRequest,
  UpdateManagementProfilesResponse,
  UpdateManagementProfilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementProfilesRequest,
  output: UpdateManagementProfilesResponse,
  errors: [],
}));

export interface ListManagementProfilesRequest {
  /** The maximum number of views (profiles) to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID for the view (profiles) to retrieve. Can either be a specific account ID or '~all', which refers to all the accounts to which the user has access. */
  accountId: string;
  /** Web property ID for the views (profiles) to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties to which the user has access. */
  webPropertyId: string;
}

export const ListManagementProfilesRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementProfilesRequest>;

export type ListManagementProfilesResponse = Profiles;
export const ListManagementProfilesResponse = Profiles;

export type ListManagementProfilesError = DefaultErrors;

/** Lists views (profiles) to which the user has access. */
export const listManagementProfiles: API.OperationMethod<
  ListManagementProfilesRequest,
  ListManagementProfilesResponse,
  ListManagementProfilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementProfilesRequest,
  output: ListManagementProfilesResponse,
  errors: [],
}));

export interface DeleteManagementProfilesRequest {
  /** Web property ID to delete the view (profile) for. */
  webPropertyId: string;
  /** Account ID to delete the view (profile) for. */
  accountId: string;
  /** ID of the view (profile) to be deleted. */
  profileId: string;
}

export const DeleteManagementProfilesRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementProfilesRequest>;

export interface DeleteManagementProfilesResponse {}
export const DeleteManagementProfilesResponse: Schema.Schema<DeleteManagementProfilesResponse> =
  Schema.Struct({}) as any as Schema.Schema<DeleteManagementProfilesResponse>;

export type DeleteManagementProfilesError = DefaultErrors;

/** Deletes a view (profile). */
export const deleteManagementProfiles: API.OperationMethod<
  DeleteManagementProfilesRequest,
  DeleteManagementProfilesResponse,
  DeleteManagementProfilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementProfilesRequest,
  output: DeleteManagementProfilesResponse,
  errors: [],
}));

export interface GetManagementProfilesRequest {
  /** Account ID to retrieve the view (profile) for. */
  accountId: string;
  /** View (Profile) ID to retrieve the view (profile) for. */
  profileId: string;
  /** Web property ID to retrieve the view (profile) for. */
  webPropertyId: string;
}

export const GetManagementProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementProfilesRequest>;

export type GetManagementProfilesResponse = Profile;
export const GetManagementProfilesResponse = Profile;

export type GetManagementProfilesError = DefaultErrors;

/** Gets a view (profile) to which the user has access. */
export const getManagementProfiles: API.OperationMethod<
  GetManagementProfilesRequest,
  GetManagementProfilesResponse,
  GetManagementProfilesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementProfilesRequest,
  output: GetManagementProfilesResponse,
  errors: [],
}));

export interface DeleteManagementExperimentsRequest {
  /** Web property ID to which the experiment belongs */
  webPropertyId: string;
  /** View (Profile) ID to which the experiment belongs */
  profileId: string;
  /** Account ID to which the experiment belongs */
  accountId: string;
  /** ID of the experiment to delete */
  experimentId: string;
}

export const DeleteManagementExperimentsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementExperimentsRequest>;

export interface DeleteManagementExperimentsResponse {}
export const DeleteManagementExperimentsResponse: Schema.Schema<DeleteManagementExperimentsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementExperimentsResponse>;

export type DeleteManagementExperimentsError = DefaultErrors;

/** Delete an experiment. */
export const deleteManagementExperiments: API.OperationMethod<
  DeleteManagementExperimentsRequest,
  DeleteManagementExperimentsResponse,
  DeleteManagementExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementExperimentsRequest,
  output: DeleteManagementExperimentsResponse,
  errors: [],
}));

export interface GetManagementExperimentsRequest {
  /** View (Profile) ID to retrieve the experiment for. */
  profileId: string;
  /** Account ID to retrieve the experiment for. */
  accountId: string;
  /** Experiment ID to retrieve the experiment for. */
  experimentId: string;
  /** Web property ID to retrieve the experiment for. */
  webPropertyId: string;
}

export const GetManagementExperimentsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementExperimentsRequest>;

export type GetManagementExperimentsResponse = Experiment;
export const GetManagementExperimentsResponse = Experiment;

export type GetManagementExperimentsError = DefaultErrors;

/** Returns an experiment to which the user has access. */
export const getManagementExperiments: API.OperationMethod<
  GetManagementExperimentsRequest,
  GetManagementExperimentsResponse,
  GetManagementExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementExperimentsRequest,
  output: GetManagementExperimentsResponse,
  errors: [],
}));

export interface UpdateManagementExperimentsRequest {
  /** View (Profile) ID of the experiment to update. */
  profileId: string;
  /** Account ID of the experiment to update. */
  accountId: string;
  /** Experiment ID of the experiment to update. */
  experimentId: string;
  /** Web property ID of the experiment to update. */
  webPropertyId: string;
  /** Request body */
  body?: Experiment;
}

export const UpdateManagementExperimentsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementExperimentsRequest>;

export type UpdateManagementExperimentsResponse = Experiment;
export const UpdateManagementExperimentsResponse = Experiment;

export type UpdateManagementExperimentsError = DefaultErrors;

/** Update an existing experiment. */
export const updateManagementExperiments: API.OperationMethod<
  UpdateManagementExperimentsRequest,
  UpdateManagementExperimentsResponse,
  UpdateManagementExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementExperimentsRequest,
  output: UpdateManagementExperimentsResponse,
  errors: [],
}));

export interface InsertManagementExperimentsRequest {
  /** Web property ID to create the experiment for. */
  webPropertyId: string;
  /** Account ID to create the experiment for. */
  accountId: string;
  /** View (Profile) ID to create the experiment for. */
  profileId: string;
  /** Request body */
  body?: Experiment;
}

export const InsertManagementExperimentsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementExperimentsRequest>;

export type InsertManagementExperimentsResponse = Experiment;
export const InsertManagementExperimentsResponse = Experiment;

export type InsertManagementExperimentsError = DefaultErrors;

/** Create a new experiment. */
export const insertManagementExperiments: API.OperationMethod<
  InsertManagementExperimentsRequest,
  InsertManagementExperimentsResponse,
  InsertManagementExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementExperimentsRequest,
  output: InsertManagementExperimentsResponse,
  errors: [],
}));

export interface PatchManagementExperimentsRequest {
  /** View (Profile) ID of the experiment to update. */
  profileId: string;
  /** Account ID of the experiment to update. */
  accountId: string;
  /** Experiment ID of the experiment to update. */
  experimentId: string;
  /** Web property ID of the experiment to update. */
  webPropertyId: string;
  /** Request body */
  body?: Experiment;
}

export const PatchManagementExperimentsRequest = Schema.Struct({
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementExperimentsRequest>;

export type PatchManagementExperimentsResponse = Experiment;
export const PatchManagementExperimentsResponse = Experiment;

export type PatchManagementExperimentsError = DefaultErrors;

/** Update an existing experiment. This method supports patch semantics. */
export const patchManagementExperiments: API.OperationMethod<
  PatchManagementExperimentsRequest,
  PatchManagementExperimentsResponse,
  PatchManagementExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementExperimentsRequest,
  output: PatchManagementExperimentsResponse,
  errors: [],
}));

export interface ListManagementExperimentsRequest {
  /** Account ID to retrieve experiments for. */
  accountId: string;
  /** The maximum number of experiments to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve experiments for. */
  profileId: string;
  /** An index of the first experiment to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID to retrieve experiments for. */
  webPropertyId: string;
}

export const ListManagementExperimentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementExperimentsRequest>;

export type ListManagementExperimentsResponse = Experiments;
export const ListManagementExperimentsResponse = Experiments;

export type ListManagementExperimentsError = DefaultErrors;

/** Lists experiments to which the user has access. */
export const listManagementExperiments: API.OperationMethod<
  ListManagementExperimentsRequest,
  ListManagementExperimentsResponse,
  ListManagementExperimentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementExperimentsRequest,
  output: ListManagementExperimentsResponse,
  errors: [],
}));

export interface GetManagementCustomDimensionsRequest {
  /** Account ID for the custom dimension to retrieve. */
  accountId: string;
  /** The ID of the custom dimension to retrieve. */
  customDimensionId: string;
  /** Web property ID for the custom dimension to retrieve. */
  webPropertyId: string;
}

export const GetManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDimensionId: Schema.String.pipe(T.HttpPath("customDimensionId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementCustomDimensionsRequest>;

export type GetManagementCustomDimensionsResponse = CustomDimension;
export const GetManagementCustomDimensionsResponse = CustomDimension;

export type GetManagementCustomDimensionsError = DefaultErrors;

/** Get a custom dimension to which the user has access. */
export const getManagementCustomDimensions: API.OperationMethod<
  GetManagementCustomDimensionsRequest,
  GetManagementCustomDimensionsResponse,
  GetManagementCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementCustomDimensionsRequest,
  output: GetManagementCustomDimensionsResponse,
  errors: [],
}));

export interface ListManagementCustomDimensionsRequest {
  /** Web property ID for the custom dimensions to retrieve. */
  webPropertyId: string;
  /** Account ID for the custom dimensions to retrieve. */
  accountId: string;
  /** The maximum number of custom dimensions to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementCustomDimensionsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementCustomDimensionsRequest>;

export type ListManagementCustomDimensionsResponse = CustomDimensions;
export const ListManagementCustomDimensionsResponse = CustomDimensions;

export type ListManagementCustomDimensionsError = DefaultErrors;

/** Lists custom dimensions to which the user has access. */
export const listManagementCustomDimensions: API.OperationMethod<
  ListManagementCustomDimensionsRequest,
  ListManagementCustomDimensionsResponse,
  ListManagementCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementCustomDimensionsRequest,
  output: ListManagementCustomDimensionsResponse,
  errors: [],
}));

export interface InsertManagementCustomDimensionsRequest {
  /** Web property ID for the custom dimension to create. */
  webPropertyId: string;
  /** Account ID for the custom dimension to create. */
  accountId: string;
  /** Request body */
  body?: CustomDimension;
}

export const InsertManagementCustomDimensionsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(CustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementCustomDimensionsRequest>;

export type InsertManagementCustomDimensionsResponse = CustomDimension;
export const InsertManagementCustomDimensionsResponse = CustomDimension;

export type InsertManagementCustomDimensionsError = DefaultErrors;

/** Create a new custom dimension. */
export const insertManagementCustomDimensions: API.OperationMethod<
  InsertManagementCustomDimensionsRequest,
  InsertManagementCustomDimensionsResponse,
  InsertManagementCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementCustomDimensionsRequest,
  output: InsertManagementCustomDimensionsResponse,
  errors: [],
}));

export interface PatchManagementCustomDimensionsRequest {
  /** Account ID for the custom dimension to update. */
  accountId: string;
  /** Force the update and ignore any warnings related to the custom dimension being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Custom dimension ID for the custom dimension to update. */
  customDimensionId: string;
  /** Web property ID for the custom dimension to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomDimension;
}

export const PatchManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreCustomDataSourceLinks"),
  ),
  customDimensionId: Schema.String.pipe(T.HttpPath("customDimensionId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementCustomDimensionsRequest>;

export type PatchManagementCustomDimensionsResponse = CustomDimension;
export const PatchManagementCustomDimensionsResponse = CustomDimension;

export type PatchManagementCustomDimensionsError = DefaultErrors;

/** Updates an existing custom dimension. This method supports patch semantics. */
export const patchManagementCustomDimensions: API.OperationMethod<
  PatchManagementCustomDimensionsRequest,
  PatchManagementCustomDimensionsResponse,
  PatchManagementCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementCustomDimensionsRequest,
  output: PatchManagementCustomDimensionsResponse,
  errors: [],
}));

export interface UpdateManagementCustomDimensionsRequest {
  /** Account ID for the custom dimension to update. */
  accountId: string;
  /** Force the update and ignore any warnings related to the custom dimension being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Custom dimension ID for the custom dimension to update. */
  customDimensionId: string;
  /** Web property ID for the custom dimension to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomDimension;
}

export const UpdateManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("ignoreCustomDataSourceLinks"),
  ),
  customDimensionId: Schema.String.pipe(T.HttpPath("customDimensionId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementCustomDimensionsRequest>;

export type UpdateManagementCustomDimensionsResponse = CustomDimension;
export const UpdateManagementCustomDimensionsResponse = CustomDimension;

export type UpdateManagementCustomDimensionsError = DefaultErrors;

/** Updates an existing custom dimension. */
export const updateManagementCustomDimensions: API.OperationMethod<
  UpdateManagementCustomDimensionsRequest,
  UpdateManagementCustomDimensionsResponse,
  UpdateManagementCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementCustomDimensionsRequest,
  output: UpdateManagementCustomDimensionsResponse,
  errors: [],
}));

export interface ListManagementProfileUserLinksRequest {
  /** Web Property ID which the given view (profile) belongs to. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
  /** The maximum number of profile-user links to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve the profile-user links for. Can either be a specific profile ID or '~all', which refers to all the profiles that user has access to. */
  profileId: string;
  /** An index of the first profile-user link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID which the given view (profile) belongs to. */
  accountId: string;
}

export const ListManagementProfileUserLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementProfileUserLinksRequest>;

export type ListManagementProfileUserLinksResponse = EntityUserLinks;
export const ListManagementProfileUserLinksResponse = EntityUserLinks;

export type ListManagementProfileUserLinksError = DefaultErrors;

/** Lists profile-user links for a given view (profile). */
export const listManagementProfileUserLinks: API.OperationMethod<
  ListManagementProfileUserLinksRequest,
  ListManagementProfileUserLinksResponse,
  ListManagementProfileUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementProfileUserLinksRequest,
  output: ListManagementProfileUserLinksResponse,
  errors: [],
}));

export interface InsertManagementProfileUserLinksRequest {
  /** Account ID to create the user link for. */
  accountId: string;
  /** View (Profile) ID to create the user link for. */
  profileId: string;
  /** Web Property ID to create the user link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const InsertManagementProfileUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementProfileUserLinksRequest>;

export type InsertManagementProfileUserLinksResponse = EntityUserLink;
export const InsertManagementProfileUserLinksResponse = EntityUserLink;

export type InsertManagementProfileUserLinksError = DefaultErrors;

/** Adds a new user to the given view (profile). */
export const insertManagementProfileUserLinks: API.OperationMethod<
  InsertManagementProfileUserLinksRequest,
  InsertManagementProfileUserLinksResponse,
  InsertManagementProfileUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementProfileUserLinksRequest,
  output: InsertManagementProfileUserLinksResponse,
  errors: [],
}));

export interface DeleteManagementProfileUserLinksRequest {
  /** Link ID to delete the user link for. */
  linkId: string;
  /** View (Profile) ID to delete the user link for. */
  profileId: string;
  /** Account ID to delete the user link for. */
  accountId: string;
  /** Web Property ID to delete the user link for. */
  webPropertyId: string;
}

export const DeleteManagementProfileUserLinksRequest = Schema.Struct({
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks/{linkId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementProfileUserLinksRequest>;

export interface DeleteManagementProfileUserLinksResponse {}
export const DeleteManagementProfileUserLinksResponse: Schema.Schema<DeleteManagementProfileUserLinksResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementProfileUserLinksResponse>;

export type DeleteManagementProfileUserLinksError = DefaultErrors;

/** Removes a user from the given view (profile). */
export const deleteManagementProfileUserLinks: API.OperationMethod<
  DeleteManagementProfileUserLinksRequest,
  DeleteManagementProfileUserLinksResponse,
  DeleteManagementProfileUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementProfileUserLinksRequest,
  output: DeleteManagementProfileUserLinksResponse,
  errors: [],
}));

export interface UpdateManagementProfileUserLinksRequest {
  /** Web Property ID to update the user link for. */
  webPropertyId: string;
  /** Link ID to update the user link for. */
  linkId: string;
  /** View (Profile ID) to update the user link for. */
  profileId: string;
  /** Account ID to update the user link for. */
  accountId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const UpdateManagementProfileUserLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks/{linkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementProfileUserLinksRequest>;

export type UpdateManagementProfileUserLinksResponse = EntityUserLink;
export const UpdateManagementProfileUserLinksResponse = EntityUserLink;

export type UpdateManagementProfileUserLinksError = DefaultErrors;

/** Updates permissions for an existing user on the given view (profile). */
export const updateManagementProfileUserLinks: API.OperationMethod<
  UpdateManagementProfileUserLinksRequest,
  UpdateManagementProfileUserLinksResponse,
  UpdateManagementProfileUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementProfileUserLinksRequest,
  output: UpdateManagementProfileUserLinksResponse,
  errors: [],
}));

export interface ListManagementWebpropertyUserLinksRequest {
  /** Web Property ID for the webProperty-user links to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
  /** The maximum number of webProperty-user Links to include in this response. */
  "max-results"?: number;
  /** An index of the first webProperty-user link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID which the given web property belongs to. */
  accountId: string;
}

export const ListManagementWebpropertyUserLinksRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementWebpropertyUserLinksRequest>;

export type ListManagementWebpropertyUserLinksResponse = EntityUserLinks;
export const ListManagementWebpropertyUserLinksResponse = EntityUserLinks;

export type ListManagementWebpropertyUserLinksError = DefaultErrors;

/** Lists webProperty-user links for a given web property. */
export const listManagementWebpropertyUserLinks: API.OperationMethod<
  ListManagementWebpropertyUserLinksRequest,
  ListManagementWebpropertyUserLinksResponse,
  ListManagementWebpropertyUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementWebpropertyUserLinksRequest,
  output: ListManagementWebpropertyUserLinksResponse,
  errors: [],
}));

export interface DeleteManagementWebpropertyUserLinksRequest {
  /** Link ID to delete the user link for. */
  linkId: string;
  /** Account ID to delete the user link for. */
  accountId: string;
  /** Web Property ID to delete the user link for. */
  webPropertyId: string;
}

export const DeleteManagementWebpropertyUserLinksRequest = Schema.Struct({
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks/{linkId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementWebpropertyUserLinksRequest>;

export interface DeleteManagementWebpropertyUserLinksResponse {}
export const DeleteManagementWebpropertyUserLinksResponse: Schema.Schema<DeleteManagementWebpropertyUserLinksResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementWebpropertyUserLinksResponse>;

export type DeleteManagementWebpropertyUserLinksError = DefaultErrors;

/** Removes a user from the given web property. */
export const deleteManagementWebpropertyUserLinks: API.OperationMethod<
  DeleteManagementWebpropertyUserLinksRequest,
  DeleteManagementWebpropertyUserLinksResponse,
  DeleteManagementWebpropertyUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementWebpropertyUserLinksRequest,
  output: DeleteManagementWebpropertyUserLinksResponse,
  errors: [],
}));

export interface UpdateManagementWebpropertyUserLinksRequest {
  /** Account ID to update the account-user link for. */
  accountId: string;
  /** Link ID to update the account-user link for. */
  linkId: string;
  /** Web property ID to update the account-user link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const UpdateManagementWebpropertyUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks/{linkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementWebpropertyUserLinksRequest>;

export type UpdateManagementWebpropertyUserLinksResponse = EntityUserLink;
export const UpdateManagementWebpropertyUserLinksResponse = EntityUserLink;

export type UpdateManagementWebpropertyUserLinksError = DefaultErrors;

/** Updates permissions for an existing user on the given web property. */
export const updateManagementWebpropertyUserLinks: API.OperationMethod<
  UpdateManagementWebpropertyUserLinksRequest,
  UpdateManagementWebpropertyUserLinksResponse,
  UpdateManagementWebpropertyUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementWebpropertyUserLinksRequest,
  output: UpdateManagementWebpropertyUserLinksResponse,
  errors: [],
}));

export interface InsertManagementWebpropertyUserLinksRequest {
  /** Account ID to create the user link for. */
  accountId: string;
  /** Web Property ID to create the user link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const InsertManagementWebpropertyUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementWebpropertyUserLinksRequest>;

export type InsertManagementWebpropertyUserLinksResponse = EntityUserLink;
export const InsertManagementWebpropertyUserLinksResponse = EntityUserLink;

export type InsertManagementWebpropertyUserLinksError = DefaultErrors;

/** Adds a new user to the given web property. */
export const insertManagementWebpropertyUserLinks: API.OperationMethod<
  InsertManagementWebpropertyUserLinksRequest,
  InsertManagementWebpropertyUserLinksResponse,
  InsertManagementWebpropertyUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementWebpropertyUserLinksRequest,
  output: InsertManagementWebpropertyUserLinksResponse,
  errors: [],
}));

export interface DeleteManagementAccountUserLinksRequest {
  /** Account ID to delete the user link for. */
  accountId: string;
  /** Link ID to delete the user link for. */
  linkId: string;
}

export const DeleteManagementAccountUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "management/accounts/{accountId}/entityUserLinks/{linkId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteManagementAccountUserLinksRequest>;

export interface DeleteManagementAccountUserLinksResponse {}
export const DeleteManagementAccountUserLinksResponse: Schema.Schema<DeleteManagementAccountUserLinksResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteManagementAccountUserLinksResponse>;

export type DeleteManagementAccountUserLinksError = DefaultErrors;

/** Removes a user from the given account. */
export const deleteManagementAccountUserLinks: API.OperationMethod<
  DeleteManagementAccountUserLinksRequest,
  DeleteManagementAccountUserLinksResponse,
  DeleteManagementAccountUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteManagementAccountUserLinksRequest,
  output: DeleteManagementAccountUserLinksResponse,
  errors: [],
}));

export interface UpdateManagementAccountUserLinksRequest {
  /** Account ID to update the account-user link for. */
  accountId: string;
  /** Link ID to update the account-user link for. */
  linkId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const UpdateManagementAccountUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/entityUserLinks/{linkId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementAccountUserLinksRequest>;

export type UpdateManagementAccountUserLinksResponse = EntityUserLink;
export const UpdateManagementAccountUserLinksResponse = EntityUserLink;

export type UpdateManagementAccountUserLinksError = DefaultErrors;

/** Updates permissions for an existing user on the given account. */
export const updateManagementAccountUserLinks: API.OperationMethod<
  UpdateManagementAccountUserLinksRequest,
  UpdateManagementAccountUserLinksResponse,
  UpdateManagementAccountUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementAccountUserLinksRequest,
  output: UpdateManagementAccountUserLinksResponse,
  errors: [],
}));

export interface InsertManagementAccountUserLinksRequest {
  /** Account ID to create the user link for. */
  accountId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const InsertManagementAccountUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/entityUserLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementAccountUserLinksRequest>;

export type InsertManagementAccountUserLinksResponse = EntityUserLink;
export const InsertManagementAccountUserLinksResponse = EntityUserLink;

export type InsertManagementAccountUserLinksError = DefaultErrors;

/** Adds a new user to the given account. */
export const insertManagementAccountUserLinks: API.OperationMethod<
  InsertManagementAccountUserLinksRequest,
  InsertManagementAccountUserLinksResponse,
  InsertManagementAccountUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementAccountUserLinksRequest,
  output: InsertManagementAccountUserLinksResponse,
  errors: [],
}));

export interface ListManagementAccountUserLinksRequest {
  /** Account ID to retrieve the user links for. */
  accountId: string;
  /** The maximum number of account-user links to include in this response. */
  "max-results"?: number;
  /** An index of the first account-user link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementAccountUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/entityUserLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementAccountUserLinksRequest>;

export type ListManagementAccountUserLinksResponse = EntityUserLinks;
export const ListManagementAccountUserLinksResponse = EntityUserLinks;

export type ListManagementAccountUserLinksError = DefaultErrors;

/** Lists account-user links for a given account. */
export const listManagementAccountUserLinks: API.OperationMethod<
  ListManagementAccountUserLinksRequest,
  ListManagementAccountUserLinksResponse,
  ListManagementAccountUserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementAccountUserLinksRequest,
  output: ListManagementAccountUserLinksResponse,
  errors: [],
}));

export interface GetManagementWebpropertiesRequest {
  /** Account ID to retrieve the web property for. */
  accountId: string;
  /** ID to retrieve the web property for. */
  webPropertyId: string;
}

export const GetManagementWebpropertiesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementWebpropertiesRequest>;

export type GetManagementWebpropertiesResponse = Webproperty;
export const GetManagementWebpropertiesResponse = Webproperty;

export type GetManagementWebpropertiesError = DefaultErrors;

/** Gets a web property to which the user has access. */
export const getManagementWebproperties: API.OperationMethod<
  GetManagementWebpropertiesRequest,
  GetManagementWebpropertiesResponse,
  GetManagementWebpropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementWebpropertiesRequest,
  output: GetManagementWebpropertiesResponse,
  errors: [],
}));

export interface ListManagementWebpropertiesRequest {
  /** The maximum number of web properties to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Account ID to retrieve web properties for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to. */
  accountId: string;
}

export const ListManagementWebpropertiesRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementWebpropertiesRequest>;

export type ListManagementWebpropertiesResponse = Webproperties;
export const ListManagementWebpropertiesResponse = Webproperties;

export type ListManagementWebpropertiesError = DefaultErrors;

/** Lists web properties to which the user has access. */
export const listManagementWebproperties: API.OperationMethod<
  ListManagementWebpropertiesRequest,
  ListManagementWebpropertiesResponse,
  ListManagementWebpropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementWebpropertiesRequest,
  output: ListManagementWebpropertiesResponse,
  errors: [],
}));

export interface UpdateManagementWebpropertiesRequest {
  /** Web property ID */
  webPropertyId: string;
  /** Account ID to which the web property belongs */
  accountId: string;
  /** Request body */
  body?: Webproperty;
}

export const UpdateManagementWebpropertiesRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Webproperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateManagementWebpropertiesRequest>;

export type UpdateManagementWebpropertiesResponse = Webproperty;
export const UpdateManagementWebpropertiesResponse = Webproperty;

export type UpdateManagementWebpropertiesError = DefaultErrors;

/** Updates an existing web property. */
export const updateManagementWebproperties: API.OperationMethod<
  UpdateManagementWebpropertiesRequest,
  UpdateManagementWebpropertiesResponse,
  UpdateManagementWebpropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateManagementWebpropertiesRequest,
  output: UpdateManagementWebpropertiesResponse,
  errors: [],
}));

export interface InsertManagementWebpropertiesRequest {
  /** Account ID to create the web property for. */
  accountId: string;
  /** Request body */
  body?: Webproperty;
}

export const InsertManagementWebpropertiesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Webproperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertManagementWebpropertiesRequest>;

export type InsertManagementWebpropertiesResponse = Webproperty;
export const InsertManagementWebpropertiesResponse = Webproperty;

export type InsertManagementWebpropertiesError = DefaultErrors;

/** Create a new property if the account has fewer than 20 properties. Web properties are visible in the Google Analytics interface only if they have at least one profile. */
export const insertManagementWebproperties: API.OperationMethod<
  InsertManagementWebpropertiesRequest,
  InsertManagementWebpropertiesResponse,
  InsertManagementWebpropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertManagementWebpropertiesRequest,
  output: InsertManagementWebpropertiesResponse,
  errors: [],
}));

export interface PatchManagementWebpropertiesRequest {
  /** Web property ID */
  webPropertyId: string;
  /** Account ID to which the web property belongs */
  accountId: string;
  /** Request body */
  body?: Webproperty;
}

export const PatchManagementWebpropertiesRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Webproperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchManagementWebpropertiesRequest>;

export type PatchManagementWebpropertiesResponse = Webproperty;
export const PatchManagementWebpropertiesResponse = Webproperty;

export type PatchManagementWebpropertiesError = DefaultErrors;

/** Updates an existing web property. This method supports patch semantics. */
export const patchManagementWebproperties: API.OperationMethod<
  PatchManagementWebpropertiesRequest,
  PatchManagementWebpropertiesResponse,
  PatchManagementWebpropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchManagementWebpropertiesRequest,
  output: PatchManagementWebpropertiesResponse,
  errors: [],
}));

export interface ListManagementAccountSummariesRequest {
  /** The maximum number of account summaries to include in this response, where the largest acceptable value is 1000. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementAccountSummariesRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "management/accountSummaries" }),
  svc,
) as unknown as Schema.Schema<ListManagementAccountSummariesRequest>;

export type ListManagementAccountSummariesResponse = AccountSummaries;
export const ListManagementAccountSummariesResponse = AccountSummaries;

export type ListManagementAccountSummariesError = DefaultErrors;

/** Lists account summaries (lightweight tree comprised of accounts/properties/profiles) to which the user has access. */
export const listManagementAccountSummaries: API.OperationMethod<
  ListManagementAccountSummariesRequest,
  ListManagementAccountSummariesResponse,
  ListManagementAccountSummariesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementAccountSummariesRequest,
  output: ListManagementAccountSummariesResponse,
  errors: [],
}));

export interface ListManagementAccountsRequest {
  /** The maximum number of accounts to include in this response. */
  "max-results"?: number;
  /** An index of the first account to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementAccountsRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts" }),
  svc,
) as unknown as Schema.Schema<ListManagementAccountsRequest>;

export type ListManagementAccountsResponse = Accounts;
export const ListManagementAccountsResponse = Accounts;

export type ListManagementAccountsError = DefaultErrors;

/** Lists all accounts to which the user has access. */
export const listManagementAccounts: API.OperationMethod<
  ListManagementAccountsRequest,
  ListManagementAccountsResponse,
  ListManagementAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementAccountsRequest,
  output: ListManagementAccountsResponse,
  errors: [],
}));

export interface ListManagementSegmentsRequest {
  /** The maximum number of segments to include in this response. */
  "max-results"?: number;
  /** An index of the first segment to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementSegmentsRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "management/segments" }),
  svc,
) as unknown as Schema.Schema<ListManagementSegmentsRequest>;

export type ListManagementSegmentsResponse = Segments;
export const ListManagementSegmentsResponse = Segments;

export type ListManagementSegmentsError = DefaultErrors;

/** Lists segments to which the user has access. */
export const listManagementSegments: API.OperationMethod<
  ListManagementSegmentsRequest,
  ListManagementSegmentsResponse,
  ListManagementSegmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementSegmentsRequest,
  output: ListManagementSegmentsResponse,
  errors: [],
}));

export interface DeleteUploadDataManagementUploadsRequest {
  /** Custom data source Id for the uploads to be deleted. */
  customDataSourceId: string;
  /** Web property Id for the uploads to be deleted. */
  webPropertyId: string;
  /** Account Id for the uploads to be deleted. */
  accountId: string;
  /** Request body */
  body?: AnalyticsDataimportDeleteUploadDataRequest;
}

export const DeleteUploadDataManagementUploadsRequest = Schema.Struct({
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AnalyticsDataimportDeleteUploadDataRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/deleteUploadData",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DeleteUploadDataManagementUploadsRequest>;

export interface DeleteUploadDataManagementUploadsResponse {}
export const DeleteUploadDataManagementUploadsResponse: Schema.Schema<DeleteUploadDataManagementUploadsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUploadDataManagementUploadsResponse>;

export type DeleteUploadDataManagementUploadsError = DefaultErrors;

/** Delete data associated with a previous upload. */
export const deleteUploadDataManagementUploads: API.OperationMethod<
  DeleteUploadDataManagementUploadsRequest,
  DeleteUploadDataManagementUploadsResponse,
  DeleteUploadDataManagementUploadsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteUploadDataManagementUploadsRequest,
  output: DeleteUploadDataManagementUploadsResponse,
  errors: [],
}));

export interface GetManagementUploadsRequest {
  /** Web property Id for the upload to retrieve. */
  webPropertyId: string;
  /** Custom data source Id for upload to retrieve. */
  customDataSourceId: string;
  /** Upload Id to retrieve. */
  uploadId: string;
  /** Account Id for the upload to retrieve. */
  accountId: string;
}

export const GetManagementUploadsRequest = Schema.Struct({
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  uploadId: Schema.String.pipe(T.HttpPath("uploadId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads/{uploadId}",
  }),
  svc,
) as unknown as Schema.Schema<GetManagementUploadsRequest>;

export type GetManagementUploadsResponse = Upload;
export const GetManagementUploadsResponse = Upload;

export type GetManagementUploadsError = DefaultErrors;

/** List uploads to which the user has access. */
export const getManagementUploads: API.OperationMethod<
  GetManagementUploadsRequest,
  GetManagementUploadsResponse,
  GetManagementUploadsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManagementUploadsRequest,
  output: GetManagementUploadsResponse,
  errors: [],
}));

export interface ListManagementUploadsRequest {
  /** Account Id for the uploads to retrieve. */
  accountId: string;
  /** The maximum number of uploads to include in this response. */
  "max-results"?: number;
  /** A 1-based index of the first upload to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Custom data source Id for uploads to retrieve. */
  customDataSourceId: string;
  /** Web property Id for the uploads to retrieve. */
  webPropertyId: string;
}

export const ListManagementUploadsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("max-results"),
  ),
  "start-index": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("start-index"),
  ),
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads",
  }),
  svc,
) as unknown as Schema.Schema<ListManagementUploadsRequest>;

export type ListManagementUploadsResponse = Uploads;
export const ListManagementUploadsResponse = Uploads;

export type ListManagementUploadsError = DefaultErrors;

/** List uploads to which the user has access. */
export const listManagementUploads: API.OperationMethod<
  ListManagementUploadsRequest,
  ListManagementUploadsResponse,
  ListManagementUploadsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListManagementUploadsRequest,
  output: ListManagementUploadsResponse,
  errors: [],
}));

export interface UploadDataManagementUploadsRequest {
  /** Custom data source Id to which the data being uploaded belongs. */
  customDataSourceId: string;
  /** Web property UA-string associated with the upload. */
  webPropertyId: string;
  /** Account Id associated with the upload. */
  accountId: string;
}

export const UploadDataManagementUploadsRequest = Schema.Struct({
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UploadDataManagementUploadsRequest>;

export type UploadDataManagementUploadsResponse = Upload;
export const UploadDataManagementUploadsResponse = Upload;

export type UploadDataManagementUploadsError = DefaultErrors;

/** Upload data for a custom data source. */
export const uploadDataManagementUploads: API.OperationMethod<
  UploadDataManagementUploadsRequest,
  UploadDataManagementUploadsResponse,
  UploadDataManagementUploadsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UploadDataManagementUploadsRequest,
  output: UploadDataManagementUploadsResponse,
  errors: [],
}));

export interface CreateAccountTreeProvisioningRequest {
  /** Request body */
  body?: AccountTreeRequest;
}

export const CreateAccountTreeProvisioningRequest = Schema.Struct({
  body: Schema.optional(AccountTreeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "provisioning/createAccountTree",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountTreeProvisioningRequest>;

export type CreateAccountTreeProvisioningResponse = AccountTreeResponse;
export const CreateAccountTreeProvisioningResponse = AccountTreeResponse;

export type CreateAccountTreeProvisioningError = DefaultErrors;

/** Provision account. */
export const createAccountTreeProvisioning: API.OperationMethod<
  CreateAccountTreeProvisioningRequest,
  CreateAccountTreeProvisioningResponse,
  CreateAccountTreeProvisioningError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountTreeProvisioningRequest,
  output: CreateAccountTreeProvisioningResponse,
  errors: [],
}));

export interface CreateAccountTicketProvisioningRequest {
  /** Request body */
  body?: AccountTicket;
}

export const CreateAccountTicketProvisioningRequest = Schema.Struct({
  body: Schema.optional(AccountTicket).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "provisioning/createAccountTicket",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountTicketProvisioningRequest>;

export type CreateAccountTicketProvisioningResponse = AccountTicket;
export const CreateAccountTicketProvisioningResponse = AccountTicket;

export type CreateAccountTicketProvisioningError = DefaultErrors;

/** Creates an account ticket. */
export const createAccountTicketProvisioning: API.OperationMethod<
  CreateAccountTicketProvisioningRequest,
  CreateAccountTicketProvisioningResponse,
  CreateAccountTicketProvisioningError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountTicketProvisioningRequest,
  output: CreateAccountTicketProvisioningResponse,
  errors: [],
}));

export interface ListMetadataColumnsRequest {
  /** Report type. Allowed Values: 'ga'. Where 'ga' corresponds to the Core Reporting API */
  reportType: string;
}

export const ListMetadataColumnsRequest = Schema.Struct({
  reportType: Schema.String.pipe(T.HttpPath("reportType")),
}).pipe(
  T.Http({ method: "GET", path: "metadata/{reportType}/columns" }),
  svc,
) as unknown as Schema.Schema<ListMetadataColumnsRequest>;

export type ListMetadataColumnsResponse = Columns;
export const ListMetadataColumnsResponse = Columns;

export type ListMetadataColumnsError = DefaultErrors;

/** Lists all columns for a report type */
export const listMetadataColumns: API.OperationMethod<
  ListMetadataColumnsRequest,
  ListMetadataColumnsResponse,
  ListMetadataColumnsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMetadataColumnsRequest,
  output: ListMetadataColumnsResponse,
  errors: [],
}));

export interface UpsertUserDeletionUserDeletionRequestRequest {
  /** Request body */
  body?: UserDeletionRequest;
}

export const UpsertUserDeletionUserDeletionRequestRequest = Schema.Struct({
  body: Schema.optional(UserDeletionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "userDeletion/userDeletionRequests:upsert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpsertUserDeletionUserDeletionRequestRequest>;

export type UpsertUserDeletionUserDeletionRequestResponse = UserDeletionRequest;
export const UpsertUserDeletionUserDeletionRequestResponse =
  UserDeletionRequest;

export type UpsertUserDeletionUserDeletionRequestError = DefaultErrors;

/** Insert or update a user deletion requests. */
export const upsertUserDeletionUserDeletionRequest: API.OperationMethod<
  UpsertUserDeletionUserDeletionRequestRequest,
  UpsertUserDeletionUserDeletionRequestResponse,
  UpsertUserDeletionUserDeletionRequestError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpsertUserDeletionUserDeletionRequestRequest,
  output: UpsertUserDeletionUserDeletionRequestResponse,
  errors: [],
}));
