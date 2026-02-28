// ==========================================================================
// Google Analytics API (analytics v3)
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
  name: "analytics",
  version: "v3",
  rootUrl: "https://analytics.googleapis.com/",
  servicePath: "analytics/v3/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Account {
  /** Child link for an account entry. Points to the list of web properties for this account. */
  childLink?: { href?: string; type?: string };
  /** Time the account was created. */
  created?: string;
  /** Account ID. */
  id?: string;
  /** Resource type for Analytics account. */
  kind?: string;
  /** Account name. */
  name?: string;
  /** Permissions the user has for this account. */
  permissions?: { effective?: Array<string> };
  /** Link for this account. */
  selfLink?: string;
  /** Indicates whether this account is starred or not. */
  starred?: boolean;
  /** Time the account was last modified. */
  updated?: string;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  childLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  created: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Struct({ effective: Schema.optional(Schema.Array(Schema.String)) })),
  selfLink: Schema.optional(Schema.String),
  starred: Schema.optional(Schema.Boolean),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface AccountRef {
  /** Link for this account. */
  href?: string;
  /** Account ID. */
  id?: string;
  /** Analytics account reference. */
  kind?: string;
  /** Account name. */
  name?: string;
}

export const AccountRef: Schema.Schema<AccountRef> = Schema.suspend(() => Schema.Struct({
  href: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountRef" }) as any as Schema.Schema<AccountRef>;

export interface ProfileSummary {
  /** View (profile) ID. */
  id?: string;
  /** Resource type for Analytics ProfileSummary. */
  kind?: string;
  /** View (profile) name. */
  name?: string;
  /** Indicates whether this view (profile) is starred or not. */
  starred?: boolean;
  /** View (Profile) type. Supported types: WEB or APP. */
  type?: string;
}

export const ProfileSummary: Schema.Schema<ProfileSummary> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  starred: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ProfileSummary" }) as any as Schema.Schema<ProfileSummary>;

export interface WebPropertySummary {
  /** Web property ID of the form UA-XXXXX-YY. */
  id?: string;
  /** Internal ID for this web property. */
  internalWebPropertyId?: string;
  /** Resource type for Analytics WebPropertySummary. */
  kind?: string;
  /** Level for this web property. Possible values are STANDARD or PREMIUM. */
  level?: string;
  /** Web property name. */
  name?: string;
  /** List of profiles under this web property. */
  profiles?: Array<ProfileSummary>;
  /** Indicates whether this web property is starred or not. */
  starred?: boolean;
  /** Website url for this web property. */
  websiteUrl?: string;
}

export const WebPropertySummary: Schema.Schema<WebPropertySummary> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  profiles: Schema.optional(Schema.Array(ProfileSummary)),
  starred: Schema.optional(Schema.Boolean),
  websiteUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "WebPropertySummary" }) as any as Schema.Schema<WebPropertySummary>;

export interface AccountSummary {
  /** Account ID. */
  id?: string;
  /** Resource type for Analytics AccountSummary. */
  kind?: string;
  /** Account name. */
  name?: string;
  /** Indicates whether this account is starred or not. */
  starred?: boolean;
  /** List of web properties under this account. */
  webProperties?: Array<WebPropertySummary>;
}

export const AccountSummary: Schema.Schema<AccountSummary> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  starred: Schema.optional(Schema.Boolean),
  webProperties: Schema.optional(Schema.Array(WebPropertySummary)),
})).annotate({ identifier: "AccountSummary" }) as any as Schema.Schema<AccountSummary>;

export interface AccountSummaries {
  /** A list of AccountSummaries. */
  items?: Array<AccountSummary>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this AccountSummary collection. */
  nextLink?: string;
  /** Link to previous page for this AccountSummary collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const AccountSummaries: Schema.Schema<AccountSummaries> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(AccountSummary)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountSummaries" }) as any as Schema.Schema<AccountSummaries>;

export interface Profile {
  /** Account ID to which this view (profile) belongs. */
  accountId?: string;
  /** Indicates whether bot filtering is enabled for this view (profile). */
  botFilteringEnabled?: boolean;
  /** Child link for this view (profile). Points to the list of goals for this view (profile). */
  childLink?: { href?: string; type?: string };
  /** Time this view (profile) was created. */
  created?: string;
  /** The currency type associated with this view (profile), defaults to USD. The supported values are: USD, JPY, EUR, GBP, AUD, KRW, BRL, CNY, DKK, RUB, SEK, NOK, PLN, TRY, TWD, HKD, THB, IDR, ARS, MXN, VND, PHP, INR, CHF, CAD, CZK, NZD, HUF, BGN, LTL, ZAR, UAH, AED, BOB, CLP, COP, EGP, HRK, ILS, MAD, MYR, PEN, PKR, RON, RSD, SAR, SGD, VEF, LVL */
  currency?: string;
  /** Default page for this view (profile). */
  defaultPage?: string;
  /** Indicates whether ecommerce tracking is enabled for this view (profile). */
  eCommerceTracking?: boolean;
  /** Indicates whether enhanced ecommerce tracking is enabled for this view (profile). This property can only be enabled if ecommerce tracking is enabled. */
  enhancedECommerceTracking?: boolean;
  /** The query parameters that are excluded from this view (profile). */
  excludeQueryParameters?: string;
  /** View (Profile) ID. */
  id?: string;
  /** Internal ID for the web property to which this view (profile) belongs. */
  internalWebPropertyId?: string;
  /** Resource type for Analytics view (profile). */
  kind?: string;
  /** Name of this view (profile). */
  name?: string;
  /** Parent link for this view (profile). Points to the web property to which this view (profile) belongs. */
  parentLink?: { href?: string; type?: string };
  /** Permissions the user has for this view (profile). */
  permissions?: { effective?: Array<string> };
  /** Link for this view (profile). */
  selfLink?: string;
  /** Site search category parameters for this view (profile). */
  siteSearchCategoryParameters?: string;
  /** The site search query parameters for this view (profile). */
  siteSearchQueryParameters?: string;
  /** Indicates whether this view (profile) is starred or not. */
  starred?: boolean;
  /** Whether or not Analytics will strip search category parameters from the URLs in your reports. */
  stripSiteSearchCategoryParameters?: boolean;
  /** Whether or not Analytics will strip search query parameters from the URLs in your reports. */
  stripSiteSearchQueryParameters?: boolean;
  /** Time zone for which this view (profile) has been configured. Time zones are identified by strings from the TZ database. */
  timezone?: string;
  /** View (Profile) type. Supported types: WEB or APP. */
  type?: string;
  /** Time this view (profile) was last modified. */
  updated?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs. */
  webPropertyId?: string;
  /** Website URL for this view (profile). */
  websiteUrl?: string;
}

export const Profile: Schema.Schema<Profile> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  botFilteringEnabled: Schema.optional(Schema.Boolean),
  childLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  created: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  defaultPage: Schema.optional(Schema.String),
  eCommerceTracking: Schema.optional(Schema.Boolean),
  enhancedECommerceTracking: Schema.optional(Schema.Boolean),
  excludeQueryParameters: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  permissions: Schema.optional(Schema.Struct({ effective: Schema.optional(Schema.Array(Schema.String)) })),
  selfLink: Schema.optional(Schema.String),
  siteSearchCategoryParameters: Schema.optional(Schema.String),
  siteSearchQueryParameters: Schema.optional(Schema.String),
  starred: Schema.optional(Schema.Boolean),
  stripSiteSearchCategoryParameters: Schema.optional(Schema.Boolean),
  stripSiteSearchQueryParameters: Schema.optional(Schema.Boolean),
  timezone: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
  websiteUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Profile" }) as any as Schema.Schema<Profile>;

export interface Webproperty {
  /** Account ID to which this web property belongs. */
  accountId?: string;
  /** Child link for this web property. Points to the list of views (profiles) for this web property. */
  childLink?: { href?: string; type?: string };
  /** Time this web property was created. */
  created?: string;
  /** Set to true to reset the retention period of the user identifier with each new event from that user (thus setting the expiration date to current time plus retention period). Set to false to delete data associated with the user identifier automatically after the rentention period. This property cannot be set on insert. */
  dataRetentionResetOnNewActivity?: boolean;
  /** The length of time for which user and event data is retained. This property cannot be set on insert. */
  dataRetentionTtl?: string;
  /** Default view (profile) ID. */
  defaultProfileId?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  id?: string;
  /** The industry vertical/category selected for this web property. */
  industryVertical?: string;
  /** Internal ID for this web property. */
  internalWebPropertyId?: string;
  /** Resource type for Analytics WebProperty. */
  kind?: string;
  /** Level for this web property. Possible values are STANDARD or PREMIUM. */
  level?: string;
  /** Name of this web property. */
  name?: string;
  /** Parent link for this web property. Points to the account to which this web property belongs. */
  parentLink?: { href?: string; type?: string };
  /** Permissions the user has for this web property. */
  permissions?: { effective?: Array<string> };
  /** View (Profile) count for this web property. */
  profileCount?: number;
  /** Link for this web property. */
  selfLink?: string;
  /** Indicates whether this web property is starred or not. */
  starred?: boolean;
  /** Time this web property was last modified. */
  updated?: string;
  /** Website url for this web property. */
  websiteUrl?: string;
}

export const Webproperty: Schema.Schema<Webproperty> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  childLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  created: Schema.optional(Schema.String),
  dataRetentionResetOnNewActivity: Schema.optional(Schema.Boolean),
  dataRetentionTtl: Schema.optional(Schema.String),
  defaultProfileId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  industryVertical: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  level: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  permissions: Schema.optional(Schema.Struct({ effective: Schema.optional(Schema.Array(Schema.String)) })),
  profileCount: Schema.optional(Schema.Number),
  selfLink: Schema.optional(Schema.String),
  starred: Schema.optional(Schema.Boolean),
  updated: Schema.optional(Schema.String),
  websiteUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Webproperty" }) as any as Schema.Schema<Webproperty>;

export interface AccountTicket {
  /** Account for this ticket. */
  account?: Account;
  /** Account ticket ID used to access the account ticket. */
  id?: string;
  /** Resource type for account ticket. */
  kind?: string;
  /** View (Profile) for the account. */
  profile?: Profile;
  /** Redirect URI where the user will be sent after accepting Terms of Service. Must be configured in APIs console as a callback URL. */
  redirectUri?: string;
  /** Web property for the account. */
  webproperty?: Webproperty;
}

export const AccountTicket: Schema.Schema<AccountTicket> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(Account),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  profile: Schema.optional(Profile),
  redirectUri: Schema.optional(Schema.String),
  webproperty: Schema.optional(Webproperty),
})).annotate({ identifier: "AccountTicket" }) as any as Schema.Schema<AccountTicket>;

export interface AccountTreeRequest {
  accountName?: string;
  /** Resource type for account ticket. */
  kind?: string;
  profileName?: string;
  timezone?: string;
  webpropertyName?: string;
  websiteUrl?: string;
}

export const AccountTreeRequest: Schema.Schema<AccountTreeRequest> = Schema.suspend(() => Schema.Struct({
  accountName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  profileName: Schema.optional(Schema.String),
  timezone: Schema.optional(Schema.String),
  webpropertyName: Schema.optional(Schema.String),
  websiteUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountTreeRequest" }) as any as Schema.Schema<AccountTreeRequest>;

export interface AccountTreeResponse {
  /** The account created. */
  account?: Account;
  /** Resource type for account ticket. */
  kind?: string;
  /** View (Profile) for the account. */
  profile?: Profile;
  /** Web property for the account. */
  webproperty?: Webproperty;
}

export const AccountTreeResponse: Schema.Schema<AccountTreeResponse> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(Account),
  kind: Schema.optional(Schema.String),
  profile: Schema.optional(Profile),
  webproperty: Schema.optional(Webproperty),
})).annotate({ identifier: "AccountTreeResponse" }) as any as Schema.Schema<AccountTreeResponse>;

export interface Accounts {
  /** A list of accounts. */
  items?: Array<Account>;
  /** The maximum number of entries the response can contain, regardless of the actual number of entries returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Next link for this account collection. */
  nextLink?: string;
  /** Previous link for this account collection. */
  previousLink?: string;
  /** The starting index of the entries, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Accounts: Schema.Schema<Accounts> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Account)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Accounts" }) as any as Schema.Schema<Accounts>;

export interface AdWordsAccount {
  /** True if auto-tagging is enabled on the Google Ads account. Read-only after the insert operation. */
  autoTaggingEnabled?: boolean;
  /** Customer ID. This field is required when creating a Google Ads link. */
  customerId?: string;
  /** Resource type for Google Ads account. */
  kind?: string;
}

export const AdWordsAccount: Schema.Schema<AdWordsAccount> = Schema.suspend(() => Schema.Struct({
  autoTaggingEnabled: Schema.optional(Schema.Boolean),
  customerId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AdWordsAccount" }) as any as Schema.Schema<AdWordsAccount>;

export interface AnalyticsDataimportDeleteUploadDataRequest {
  /** A list of upload UIDs. */
  customDataImportUids?: Array<string>;
}

export const AnalyticsDataimportDeleteUploadDataRequest: Schema.Schema<AnalyticsDataimportDeleteUploadDataRequest> = Schema.suspend(() => Schema.Struct({
  customDataImportUids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AnalyticsDataimportDeleteUploadDataRequest" }) as any as Schema.Schema<AnalyticsDataimportDeleteUploadDataRequest>;

export interface Column {
  /** Map of attribute name and value for this column. */
  attributes?: Record<string, string>;
  /** Column id. */
  id?: string;
  /** Resource type for Analytics column. */
  kind?: string;
}

export const Column: Schema.Schema<Column> = Schema.suspend(() => Schema.Struct({
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Column" }) as any as Schema.Schema<Column>;

export interface Columns {
  /** List of attributes names returned by columns. */
  attributeNames?: Array<string>;
  /** Etag of collection. This etag can be compared with the last response etag to check if response has changed. */
  etag?: string;
  /** List of columns for a report type. */
  items?: Array<Column>;
  /** Collection type. */
  kind?: string;
  /** Total number of columns returned in the response. */
  totalResults?: number;
}

export const Columns: Schema.Schema<Columns> = Schema.suspend(() => Schema.Struct({
  attributeNames: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Column)),
  kind: Schema.optional(Schema.String),
  totalResults: Schema.optional(Schema.Number),
})).annotate({ identifier: "Columns" }) as any as Schema.Schema<Columns>;

export interface CustomDataSource {
  /** Account ID to which this custom data source belongs. */
  accountId?: string;
  childLink?: { href?: string; type?: string };
  /** Time this custom data source was created. */
  created?: string;
  /** Description of custom data source. */
  description?: string;
  /** Custom data source ID. */
  id?: string;
  importBehavior?: string;
  /** Resource type for Analytics custom data source. */
  kind?: string;
  /** Name of this custom data source. */
  name?: string;
  /** Parent link for this custom data source. Points to the web property to which this custom data source belongs. */
  parentLink?: { href?: string; type?: string };
  /** IDs of views (profiles) linked to the custom data source. */
  profilesLinked?: Array<string>;
  /** Collection of schema headers of the custom data source. */
  schema?: Array<string>;
  /** Link for this Analytics custom data source. */
  selfLink?: string;
  /** Type of the custom data source. */
  type?: string;
  /** Time this custom data source was last modified. */
  updated?: string;
  /** Upload type of the custom data source. */
  uploadType?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this custom data source belongs. */
  webPropertyId?: string;
}

export const CustomDataSource: Schema.Schema<CustomDataSource> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  childLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  created: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  importBehavior: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  profilesLinked: Schema.optional(Schema.Array(Schema.String)),
  schema: Schema.optional(Schema.Array(Schema.String)),
  selfLink: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  uploadType: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomDataSource" }) as any as Schema.Schema<CustomDataSource>;

export interface CustomDataSources {
  /** Collection of custom data sources. */
  items?: Array<CustomDataSource>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this custom data source collection. */
  nextLink?: string;
  /** Link to previous page for this custom data source collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const CustomDataSources: Schema.Schema<CustomDataSources> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(CustomDataSource)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomDataSources" }) as any as Schema.Schema<CustomDataSources>;

export interface CustomDimension {
  /** Account ID. */
  accountId?: string;
  /** Boolean indicating whether the custom dimension is active. */
  active?: boolean;
  /** Time the custom dimension was created. */
  created?: string;
  /** Custom dimension ID. */
  id?: string;
  /** Index of the custom dimension. */
  index?: number;
  /** Kind value for a custom dimension. Set to "analytics#customDimension". It is a read-only field. */
  kind?: string;
  /** Name of the custom dimension. */
  name?: string;
  /** Parent link for the custom dimension. Points to the property to which the custom dimension belongs. */
  parentLink?: { href?: string; type?: string };
  /** Scope of the custom dimension: HIT, SESSION, USER or PRODUCT. */
  scope?: string;
  /** Link for the custom dimension */
  selfLink?: string;
  /** Time the custom dimension was last modified. */
  updated?: string;
  /** Property ID. */
  webPropertyId?: string;
}

export const CustomDimension: Schema.Schema<CustomDimension> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  index: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  scope: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomDimension" }) as any as Schema.Schema<CustomDimension>;

export interface CustomDimensions {
  /** Collection of custom dimensions. */
  items?: Array<CustomDimension>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this custom dimension collection. */
  nextLink?: string;
  /** Link to previous page for this custom dimension collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const CustomDimensions: Schema.Schema<CustomDimensions> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(CustomDimension)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomDimensions" }) as any as Schema.Schema<CustomDimensions>;

export interface CustomMetric {
  /** Account ID. */
  accountId?: string;
  /** Boolean indicating whether the custom metric is active. */
  active?: boolean;
  /** Time the custom metric was created. */
  created?: string;
  /** Custom metric ID. */
  id?: string;
  /** Index of the custom metric. */
  index?: number;
  /** Kind value for a custom metric. Set to "analytics#customMetric". It is a read-only field. */
  kind?: string;
  /** Max value of custom metric. */
  max_value?: string;
  /** Min value of custom metric. */
  min_value?: string;
  /** Name of the custom metric. */
  name?: string;
  /** Parent link for the custom metric. Points to the property to which the custom metric belongs. */
  parentLink?: { href?: string; type?: string };
  /** Scope of the custom metric: HIT or PRODUCT. */
  scope?: string;
  /** Link for the custom metric */
  selfLink?: string;
  /** Data type of custom metric. */
  type?: string;
  /** Time the custom metric was last modified. */
  updated?: string;
  /** Property ID. */
  webPropertyId?: string;
}

export const CustomMetric: Schema.Schema<CustomMetric> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  index: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  max_value: Schema.optional(Schema.String),
  min_value: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  scope: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomMetric" }) as any as Schema.Schema<CustomMetric>;

export interface CustomMetrics {
  /** Collection of custom metrics. */
  items?: Array<CustomMetric>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this custom metric collection. */
  nextLink?: string;
  /** Link to previous page for this custom metric collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const CustomMetrics: Schema.Schema<CustomMetrics> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(CustomMetric)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomMetrics" }) as any as Schema.Schema<CustomMetrics>;

export interface WebPropertyRef {
  /** Account ID to which this web property belongs. */
  accountId?: string;
  /** Link for this web property. */
  href?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  id?: string;
  /** Internal ID for this web property. */
  internalWebPropertyId?: string;
  /** Analytics web property reference. */
  kind?: string;
  /** Name of this web property. */
  name?: string;
}

export const WebPropertyRef: Schema.Schema<WebPropertyRef> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  href: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "WebPropertyRef" }) as any as Schema.Schema<WebPropertyRef>;

export interface EntityAdWordsLink {
  /** A list of Google Ads client accounts. These cannot be MCC accounts. This field is required when creating a Google Ads link. It cannot be empty. */
  adWordsAccounts?: Array<AdWordsAccount>;
  /** Web property being linked. */
  entity?: { webPropertyRef?: WebPropertyRef };
  /** Entity Google Ads link ID */
  id?: string;
  /** Resource type for entity Google Ads link. */
  kind?: string;
  /** Name of the link. This field is required when creating a Google Ads link. */
  name?: string;
  /** IDs of linked Views (Profiles) represented as strings. */
  profileIds?: Array<string>;
  /** URL link for this Google Analytics - Google Ads link. */
  selfLink?: string;
}

export const EntityAdWordsLink: Schema.Schema<EntityAdWordsLink> = Schema.suspend(() => Schema.Struct({
  adWordsAccounts: Schema.optional(Schema.Array(AdWordsAccount)),
  entity: Schema.optional(Schema.Struct({ webPropertyRef: Schema.optional(WebPropertyRef) })),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  profileIds: Schema.optional(Schema.Array(Schema.String)),
  selfLink: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityAdWordsLink" }) as any as Schema.Schema<EntityAdWordsLink>;

export interface EntityAdWordsLinks {
  /** A list of entity Google Ads links. */
  items?: Array<EntityAdWordsLink>;
  /** The maximum number of entries the response can contain, regardless of the actual number of entries returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Next link for this Google Ads link collection. */
  nextLink?: string;
  /** Previous link for this Google Ads link collection. */
  previousLink?: string;
  /** The starting index of the entries, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
}

export const EntityAdWordsLinks: Schema.Schema<EntityAdWordsLinks> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(EntityAdWordsLink)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
})).annotate({ identifier: "EntityAdWordsLinks" }) as any as Schema.Schema<EntityAdWordsLinks>;

export interface ProfileRef {
  /** Account ID to which this view (profile) belongs. */
  accountId?: string;
  /** Link for this view (profile). */
  href?: string;
  /** View (Profile) ID. */
  id?: string;
  /** Internal ID for the web property to which this view (profile) belongs. */
  internalWebPropertyId?: string;
  /** Analytics view (profile) reference. */
  kind?: string;
  /** Name of this view (profile). */
  name?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs. */
  webPropertyId?: string;
}

export const ProfileRef: Schema.Schema<ProfileRef> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  href: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "ProfileRef" }) as any as Schema.Schema<ProfileRef>;

export interface UserRef {
  /** Email ID of this user. */
  email?: string;
  /** User ID. */
  id?: string;
  kind?: string;
}

export const UserRef: Schema.Schema<UserRef> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRef" }) as any as Schema.Schema<UserRef>;

export interface EntityUserLink {
  /** Entity for this link. It can be an account, a web property, or a view (profile). */
  entity?: { accountRef?: AccountRef; profileRef?: ProfileRef; webPropertyRef?: WebPropertyRef };
  /** Entity user link ID */
  id?: string;
  /** Resource type for entity user link. */
  kind?: string;
  /** Permissions the user has for this entity. */
  permissions?: { effective?: Array<string>; local?: Array<string> };
  /** Self link for this resource. */
  selfLink?: string;
  /** User reference. */
  userRef?: UserRef;
}

export const EntityUserLink: Schema.Schema<EntityUserLink> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(Schema.Struct({ accountRef: Schema.optional(AccountRef), profileRef: Schema.optional(ProfileRef), webPropertyRef: Schema.optional(WebPropertyRef) })),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Struct({ effective: Schema.optional(Schema.Array(Schema.String)), local: Schema.optional(Schema.Array(Schema.String)) })),
  selfLink: Schema.optional(Schema.String),
  userRef: Schema.optional(UserRef),
})).annotate({ identifier: "EntityUserLink" }) as any as Schema.Schema<EntityUserLink>;

export interface EntityUserLinks {
  /** A list of entity user links. */
  items?: Array<EntityUserLink>;
  /** The maximum number of entries the response can contain, regardless of the actual number of entries returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Next link for this account collection. */
  nextLink?: string;
  /** Previous link for this account collection. */
  previousLink?: string;
  /** The starting index of the entries, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
}

export const EntityUserLinks: Schema.Schema<EntityUserLinks> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(EntityUserLink)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
})).annotate({ identifier: "EntityUserLinks" }) as any as Schema.Schema<EntityUserLinks>;

export interface Experiment {
  /** Account ID to which this experiment belongs. This field is read-only. */
  accountId?: string;
  /** Time the experiment was created. This field is read-only. */
  created?: string;
  /** Notes about this experiment. */
  description?: string;
  /** If true, the end user will be able to edit the experiment via the Google Analytics user interface. */
  editableInGaUi?: boolean;
  /** The ending time of the experiment (the time the status changed from RUNNING to ENDED). This field is present only if the experiment has ended. This field is read-only. */
  endTime?: string;
  /** Boolean specifying whether to distribute traffic evenly across all variations. If the value is False, content experiments follows the default behavior of adjusting traffic dynamically based on variation performance. Optional -- defaults to False. This field may not be changed for an experiment whose status is ENDED. */
  equalWeighting?: boolean;
  /** Experiment ID. Required for patch and update. Disallowed for create. */
  id?: string;
  /** Internal ID for the web property to which this experiment belongs. This field is read-only. */
  internalWebPropertyId?: string;
  /** Resource type for an Analytics experiment. This field is read-only. */
  kind?: string;
  /** An integer number in [3, 90]. Specifies the minimum length of the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED. */
  minimumExperimentLengthInDays?: number;
  /** Experiment name. This field may not be changed for an experiment whose status is ENDED. This field is required when creating an experiment. */
  name?: string;
  /** The metric that the experiment is optimizing. Valid values: "ga:goal(n)Completions", "ga:adsenseAdsClicks", "ga:adsenseAdsViewed", "ga:adsenseRevenue", "ga:bounces", "ga:pageviews", "ga:sessionDuration", "ga:transactions", "ga:transactionRevenue". This field is required if status is "RUNNING" and servingFramework is one of "REDIRECT" or "API". */
  objectiveMetric?: string;
  /** Whether the objectiveMetric should be minimized or maximized. Possible values: "MAXIMUM", "MINIMUM". Optional--defaults to "MAXIMUM". Cannot be specified without objectiveMetric. Cannot be modified when status is "RUNNING" or "ENDED". */
  optimizationType?: string;
  /** Parent link for an experiment. Points to the view (profile) to which this experiment belongs. */
  parentLink?: { href?: string; type?: string };
  /** View (Profile) ID to which this experiment belongs. This field is read-only. */
  profileId?: string;
  /** Why the experiment ended. Possible values: "STOPPED_BY_USER", "WINNER_FOUND", "EXPERIMENT_EXPIRED", "ENDED_WITH_NO_WINNER", "GOAL_OBJECTIVE_CHANGED". "ENDED_WITH_NO_WINNER" means that the experiment didn't expire but no winner was projected to be found. If the experiment status is changed via the API to ENDED this field is set to STOPPED_BY_USER. This field is read-only. */
  reasonExperimentEnded?: string;
  /** Boolean specifying whether variations URLS are rewritten to match those of the original. This field may not be changed for an experiments whose status is ENDED. */
  rewriteVariationUrlsAsOriginal?: boolean;
  /** Link for this experiment. This field is read-only. */
  selfLink?: string;
  /** The framework used to serve the experiment variations and evaluate the results. One of: - REDIRECT: Google Analytics redirects traffic to different variation pages, reports the chosen variation and evaluates the results. - API: Google Analytics chooses and reports the variation to serve and evaluates the results; the caller is responsible for serving the selected variation. - EXTERNAL: The variations will be served externally and the chosen variation reported to Google Analytics. The caller is responsible for serving the selected variation and evaluating the results. */
  servingFramework?: string;
  /** The snippet of code to include on the control page(s). This field is read-only. */
  snippet?: string;
  /** The starting time of the experiment (the time the status changed from READY_TO_RUN to RUNNING). This field is present only if the experiment has started. This field is read-only. */
  startTime?: string;
  /** Experiment status. Possible values: "DRAFT", "READY_TO_RUN", "RUNNING", "ENDED". Experiments can be created in the "DRAFT", "READY_TO_RUN" or "RUNNING" state. This field is required when creating an experiment. */
  status?: string;
  /** A floating-point number in (0, 1]. Specifies the fraction of the traffic that participates in the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED. */
  trafficCoverage?: number;
  /** Time the experiment was last modified. This field is read-only. */
  updated?: string;
  /** Array of variations. The first variation in the array is the original. The number of variations may not change once an experiment is in the RUNNING state. At least two variations are required before status can be set to RUNNING. */
  variations?: Array<{ name?: string; status?: string; url?: string; weight?: number; won?: boolean }>;
  /** Web property ID to which this experiment belongs. The web property ID is of the form UA-XXXXX-YY. This field is read-only. */
  webPropertyId?: string;
  /** A floating-point number in (0, 1). Specifies the necessary confidence level to choose a winner. This field may not be changed for an experiments whose status is ENDED. */
  winnerConfidenceLevel?: number;
  /** Boolean specifying whether a winner has been found for this experiment. This field is read-only. */
  winnerFound?: boolean;
}

export const Experiment: Schema.Schema<Experiment> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  editableInGaUi: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
  equalWeighting: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  minimumExperimentLengthInDays: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  objectiveMetric: Schema.optional(Schema.String),
  optimizationType: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  profileId: Schema.optional(Schema.String),
  reasonExperimentEnded: Schema.optional(Schema.String),
  rewriteVariationUrlsAsOriginal: Schema.optional(Schema.Boolean),
  selfLink: Schema.optional(Schema.String),
  servingFramework: Schema.optional(Schema.String),
  snippet: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  trafficCoverage: Schema.optional(Schema.Number),
  updated: Schema.optional(Schema.String),
  variations: Schema.optional(Schema.Array(Schema.Struct({ name: Schema.optional(Schema.String), status: Schema.optional(Schema.String), url: Schema.optional(Schema.String), weight: Schema.optional(Schema.Number), won: Schema.optional(Schema.Boolean) }))),
  webPropertyId: Schema.optional(Schema.String),
  winnerConfidenceLevel: Schema.optional(Schema.Number),
  winnerFound: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Experiment" }) as any as Schema.Schema<Experiment>;

export interface Experiments {
  /** A list of experiments. */
  items?: Array<Experiment>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this experiment collection. */
  nextLink?: string;
  /** Link to previous page for this experiment collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Experiments: Schema.Schema<Experiments> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Experiment)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Experiments" }) as any as Schema.Schema<Experiments>;

export interface FilterExpression {
  /** Determines if the filter is case sensitive. */
  caseSensitive?: boolean;
  /** Filter expression value */
  expressionValue?: string;
  /** Field to filter. Possible values: - Content and Traffic - PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, - COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, - INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP, - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, - CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, - TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, - TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, - Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, - PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, - JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), - GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, - GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, - EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, - USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME, - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY, - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), - MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, - MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, - Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom dimension - CUSTOM_DIMENSION (See accompanying field index), */
  field?: string;
  /** The Index of the custom dimension. Set only if the field is a is CUSTOM_DIMENSION. */
  fieldIndex?: number;
  /** Kind value for filter expression */
  kind?: string;
  /** Match type for this filter. Possible values are BEGINS_WITH, EQUAL, ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS, PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all other filters must use MATCHES. */
  matchType?: string;
}

export const FilterExpression: Schema.Schema<FilterExpression> = Schema.suspend(() => Schema.Struct({
  caseSensitive: Schema.optional(Schema.Boolean),
  expressionValue: Schema.optional(Schema.String),
  field: Schema.optional(Schema.String),
  fieldIndex: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  matchType: Schema.optional(Schema.String),
})).annotate({ identifier: "FilterExpression" }) as any as Schema.Schema<FilterExpression>;

export interface Filter {
  /** Account ID to which this filter belongs. */
  accountId?: string;
  /** Details for the filter of the type ADVANCED. */
  advancedDetails?: { caseSensitive?: boolean; extractA?: string; extractB?: string; fieldA?: string; fieldAIndex?: number; fieldARequired?: boolean; fieldB?: string; fieldBIndex?: number; fieldBRequired?: boolean; outputConstructor?: string; outputToField?: string; outputToFieldIndex?: number; overrideOutputField?: boolean };
  /** Time this filter was created. */
  created?: string;
  /** Details for the filter of the type EXCLUDE. */
  excludeDetails?: FilterExpression;
  /** Filter ID. */
  id?: string;
  /** Details for the filter of the type INCLUDE. */
  includeDetails?: FilterExpression;
  /** Resource type for Analytics filter. */
  kind?: string;
  /** Details for the filter of the type LOWER. */
  lowercaseDetails?: { field?: string; fieldIndex?: number };
  /** Name of this filter. */
  name?: string;
  /** Parent link for this filter. Points to the account to which this filter belongs. */
  parentLink?: { href?: string; type?: string };
  /** Details for the filter of the type SEARCH_AND_REPLACE. */
  searchAndReplaceDetails?: { caseSensitive?: boolean; field?: string; fieldIndex?: number; replaceString?: string; searchString?: string };
  /** Link for this filter. */
  selfLink?: string;
  /** Type of this filter. Possible values are INCLUDE, EXCLUDE, LOWERCASE, UPPERCASE, SEARCH_AND_REPLACE and ADVANCED. */
  type?: string;
  /** Time this filter was last modified. */
  updated?: string;
  /** Details for the filter of the type UPPER. */
  uppercaseDetails?: { field?: string; fieldIndex?: number };
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  advancedDetails: Schema.optional(Schema.Struct({ caseSensitive: Schema.optional(Schema.Boolean), extractA: Schema.optional(Schema.String), extractB: Schema.optional(Schema.String), fieldA: Schema.optional(Schema.String), fieldAIndex: Schema.optional(Schema.Number), fieldARequired: Schema.optional(Schema.Boolean), fieldB: Schema.optional(Schema.String), fieldBIndex: Schema.optional(Schema.Number), fieldBRequired: Schema.optional(Schema.Boolean), outputConstructor: Schema.optional(Schema.String), outputToField: Schema.optional(Schema.String), outputToFieldIndex: Schema.optional(Schema.Number), overrideOutputField: Schema.optional(Schema.Boolean) })),
  created: Schema.optional(Schema.String),
  excludeDetails: Schema.optional(FilterExpression),
  id: Schema.optional(Schema.String),
  includeDetails: Schema.optional(FilterExpression),
  kind: Schema.optional(Schema.String),
  lowercaseDetails: Schema.optional(Schema.Struct({ field: Schema.optional(Schema.String), fieldIndex: Schema.optional(Schema.Number) })),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  searchAndReplaceDetails: Schema.optional(Schema.Struct({ caseSensitive: Schema.optional(Schema.Boolean), field: Schema.optional(Schema.String), fieldIndex: Schema.optional(Schema.Number), replaceString: Schema.optional(Schema.String), searchString: Schema.optional(Schema.String) })),
  selfLink: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  uppercaseDetails: Schema.optional(Schema.Struct({ field: Schema.optional(Schema.String), fieldIndex: Schema.optional(Schema.Number) })),
})).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface FilterRef {
  /** Account ID to which this filter belongs. */
  accountId?: string;
  /** Link for this filter. */
  href?: string;
  /** Filter ID. */
  id?: string;
  /** Kind value for filter reference. */
  kind?: string;
  /** Name of this filter. */
  name?: string;
}

export const FilterRef: Schema.Schema<FilterRef> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  href: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "FilterRef" }) as any as Schema.Schema<FilterRef>;

export interface Filters {
  /** A list of filters. */
  items?: Array<Filter>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this filter collection. */
  nextLink?: string;
  /** Link to previous page for this filter collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Filters: Schema.Schema<Filters> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Filter)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Filters" }) as any as Schema.Schema<Filters>;

export interface GaData {
  /** Column headers that list dimension names followed by the metric names. The order of dimensions and metrics is same as specified in the request. */
  columnHeaders?: Array<{ columnType?: string; dataType?: string; name?: string }>;
  /** Determines if Analytics data contains samples. */
  containsSampledData?: boolean;
  /** The last refreshed time in seconds for Analytics data. */
  dataLastRefreshed?: string;
  dataTable?: { cols?: Array<{ id?: string; label?: string; type?: string }>; rows?: Array<{ c?: Array<{ v?: string }> }> };
  /** Unique ID for this data response. */
  id?: string;
  /** The maximum number of rows the response can contain, regardless of the actual number of rows returned. Its value ranges from 1 to 10,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Resource type. */
  kind?: string;
  /** Link to next page for this Analytics data query. */
  nextLink?: string;
  /** Link to previous page for this Analytics data query. */
  previousLink?: string;
  /** Information for the view (profile), for which the Analytics data was requested. */
  profileInfo?: { accountId?: string; internalWebPropertyId?: string; profileId?: string; profileName?: string; tableId?: string; webPropertyId?: string };
  /** Analytics data request query parameters. */
  query?: { dimensions?: string; "end-date"?: string; filters?: string; ids?: string; "max-results"?: number; metrics?: Array<string>; samplingLevel?: string; segment?: string; sort?: Array<string>; "start-date"?: string; "start-index"?: number };
  /** Analytics data rows, where each row contains a list of dimension values followed by the metric values. The order of dimensions and metrics is same as specified in the request. */
  rows?: Array<Array<string>>;
  /** The number of samples used to calculate the result. */
  sampleSize?: string;
  /** Total size of the sample space from which the samples were selected. */
  sampleSpace?: string;
  /** Link to this page. */
  selfLink?: string;
  /** The total number of rows for the query, regardless of the number of rows in the response. */
  totalResults?: number;
  /** Total values for the requested metrics over all the results, not just the results returned in this response. The order of the metric totals is same as the metric order specified in the request. */
  totalsForAllResults?: Record<string, string>;
}

export const GaData: Schema.Schema<GaData> = Schema.suspend(() => Schema.Struct({
  columnHeaders: Schema.optional(Schema.Array(Schema.Struct({ columnType: Schema.optional(Schema.String), dataType: Schema.optional(Schema.String), name: Schema.optional(Schema.String) }))),
  containsSampledData: Schema.optional(Schema.Boolean),
  dataLastRefreshed: Schema.optional(Schema.String),
  dataTable: Schema.optional(Schema.Struct({ cols: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), label: Schema.optional(Schema.String), type: Schema.optional(Schema.String) }))), rows: Schema.optional(Schema.Array(Schema.Struct({ c: Schema.optional(Schema.Array(Schema.Struct({ v: Schema.optional(Schema.String) }))) }))) })),
  id: Schema.optional(Schema.String),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  profileInfo: Schema.optional(Schema.Struct({ accountId: Schema.optional(Schema.String), internalWebPropertyId: Schema.optional(Schema.String), profileId: Schema.optional(Schema.String), profileName: Schema.optional(Schema.String), tableId: Schema.optional(Schema.String), webPropertyId: Schema.optional(Schema.String) })),
  query: Schema.optional(Schema.Struct({ dimensions: Schema.optional(Schema.String), "end-date": Schema.optional(Schema.String), filters: Schema.optional(Schema.String), ids: Schema.optional(Schema.String), "max-results": Schema.optional(Schema.Number), metrics: Schema.optional(Schema.Array(Schema.String)), samplingLevel: Schema.optional(Schema.String), segment: Schema.optional(Schema.String), sort: Schema.optional(Schema.Array(Schema.String)), "start-date": Schema.optional(Schema.String), "start-index": Schema.optional(Schema.Number) })),
  rows: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
  sampleSize: Schema.optional(Schema.String),
  sampleSpace: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  totalResults: Schema.optional(Schema.Number),
  totalsForAllResults: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GaData" }) as any as Schema.Schema<GaData>;

export interface Goal {
  /** Account ID to which this goal belongs. */
  accountId?: string;
  /** Determines whether this goal is active. */
  active?: boolean;
  /** Time this goal was created. */
  created?: string;
  /** Details for the goal of the type EVENT. */
  eventDetails?: { eventConditions?: Array<{ comparisonType?: string; comparisonValue?: string; expression?: string; matchType?: string; type?: string }>; useEventValue?: boolean };
  /** Goal ID. */
  id?: string;
  /** Internal ID for the web property to which this goal belongs. */
  internalWebPropertyId?: string;
  /** Resource type for an Analytics goal. */
  kind?: string;
  /** Goal name. */
  name?: string;
  /** Parent link for a goal. Points to the view (profile) to which this goal belongs. */
  parentLink?: { href?: string; type?: string };
  /** View (Profile) ID to which this goal belongs. */
  profileId?: string;
  /** Link for this goal. */
  selfLink?: string;
  /** Goal type. Possible values are URL_DESTINATION, VISIT_TIME_ON_SITE, VISIT_NUM_PAGES, AND EVENT. */
  type?: string;
  /** Time this goal was last modified. */
  updated?: string;
  /** Details for the goal of the type URL_DESTINATION. */
  urlDestinationDetails?: { caseSensitive?: boolean; firstStepRequired?: boolean; matchType?: string; steps?: Array<{ name?: string; number?: number; url?: string }>; url?: string };
  /** Goal value. */
  value?: number;
  /** Details for the goal of the type VISIT_NUM_PAGES. */
  visitNumPagesDetails?: { comparisonType?: string; comparisonValue?: string };
  /** Details for the goal of the type VISIT_TIME_ON_SITE. */
  visitTimeOnSiteDetails?: { comparisonType?: string; comparisonValue?: string };
  /** Web property ID to which this goal belongs. The web property ID is of the form UA-XXXXX-YY. */
  webPropertyId?: string;
}

export const Goal: Schema.Schema<Goal> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  active: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  eventDetails: Schema.optional(Schema.Struct({ eventConditions: Schema.optional(Schema.Array(Schema.Struct({ comparisonType: Schema.optional(Schema.String), comparisonValue: Schema.optional(Schema.String), expression: Schema.optional(Schema.String), matchType: Schema.optional(Schema.String), type: Schema.optional(Schema.String) }))), useEventValue: Schema.optional(Schema.Boolean) })),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentLink: Schema.optional(Schema.Struct({ href: Schema.optional(Schema.String), type: Schema.optional(Schema.String) })),
  profileId: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  urlDestinationDetails: Schema.optional(Schema.Struct({ caseSensitive: Schema.optional(Schema.Boolean), firstStepRequired: Schema.optional(Schema.Boolean), matchType: Schema.optional(Schema.String), steps: Schema.optional(Schema.Array(Schema.Struct({ name: Schema.optional(Schema.String), number: Schema.optional(Schema.Number), url: Schema.optional(Schema.String) }))), url: Schema.optional(Schema.String) })),
  value: Schema.optional(Schema.Number),
  visitNumPagesDetails: Schema.optional(Schema.Struct({ comparisonType: Schema.optional(Schema.String), comparisonValue: Schema.optional(Schema.String) })),
  visitTimeOnSiteDetails: Schema.optional(Schema.Struct({ comparisonType: Schema.optional(Schema.String), comparisonValue: Schema.optional(Schema.String) })),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "Goal" }) as any as Schema.Schema<Goal>;

export interface Goals {
  /** A list of goals. */
  items?: Array<Goal>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this goal collection. */
  nextLink?: string;
  /** Link to previous page for this goal collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Goals: Schema.Schema<Goals> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Goal)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Goals" }) as any as Schema.Schema<Goals>;

export interface HashClientIdRequest {
  clientId?: string;
  kind?: string;
  webPropertyId?: string;
}

export const HashClientIdRequest: Schema.Schema<HashClientIdRequest> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "HashClientIdRequest" }) as any as Schema.Schema<HashClientIdRequest>;

export interface HashClientIdResponse {
  clientId?: string;
  hashedClientId?: string;
  kind?: string;
  webPropertyId?: string;
}

export const HashClientIdResponse: Schema.Schema<HashClientIdResponse> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  hashedClientId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "HashClientIdResponse" }) as any as Schema.Schema<HashClientIdResponse>;

export interface IncludeConditions {
  /** The look-back window lets you specify a time frame for evaluating the behavior that qualifies users for your audience. For example, if your filters include users from Central Asia, and Transactions Greater than 2, and you set the look-back window to 14 days, then any user from Central Asia whose cumulative transactions exceed 2 during the last 14 days is added to the audience. */
  daysToLookBack?: number;
  /** Boolean indicating whether this segment is a smart list. https://support.google.com/analytics/answer/4628577 */
  isSmartList?: boolean;
  /** Resource type for include conditions. */
  kind?: string;
  /** Number of days (in the range 1 to 540) a user remains in the audience. */
  membershipDurationDays?: number;
  /** The segment condition that will cause a user to be added to an audience. */
  segment?: string;
}

export const IncludeConditions: Schema.Schema<IncludeConditions> = Schema.suspend(() => Schema.Struct({
  daysToLookBack: Schema.optional(Schema.Number),
  isSmartList: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  membershipDurationDays: Schema.optional(Schema.Number),
  segment: Schema.optional(Schema.String),
})).annotate({ identifier: "IncludeConditions" }) as any as Schema.Schema<IncludeConditions>;

export interface LinkedForeignAccount {
  /** Account ID to which this linked foreign account belongs. */
  accountId?: string;
  /** Boolean indicating whether this is eligible for search. */
  eligibleForSearch?: boolean;
  /** Entity ad account link ID. */
  id?: string;
  /** Internal ID for the web property to which this linked foreign account belongs. */
  internalWebPropertyId?: string;
  /** Resource type for linked foreign account. */
  kind?: string;
  /** The foreign account ID. For example the an Google Ads `linkedAccountId` has the following format XXX-XXX-XXXX. */
  linkedAccountId?: string;
  /** Remarketing audience ID to which this linked foreign account belongs. */
  remarketingAudienceId?: string;
  /** The status of this foreign account link. */
  status?: string;
  /** The type of the foreign account. For example, `ADWORDS_LINKS`, `DBM_LINKS`, `MCC_LINKS` or `OPTIMIZE`. */
  type?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this linked foreign account belongs. */
  webPropertyId?: string;
}

export const LinkedForeignAccount: Schema.Schema<LinkedForeignAccount> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  eligibleForSearch: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  linkedAccountId: Schema.optional(Schema.String),
  remarketingAudienceId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkedForeignAccount" }) as any as Schema.Schema<LinkedForeignAccount>;

export interface McfData {
  /** Column headers that list dimension names followed by the metric names. The order of dimensions and metrics is same as specified in the request. */
  columnHeaders?: Array<{ columnType?: string; dataType?: string; name?: string }>;
  /** Determines if the Analytics data contains sampled data. */
  containsSampledData?: boolean;
  /** Unique ID for this data response. */
  id?: string;
  /** The maximum number of rows the response can contain, regardless of the actual number of rows returned. Its value ranges from 1 to 10,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Resource type. */
  kind?: string;
  /** Link to next page for this Analytics data query. */
  nextLink?: string;
  /** Link to previous page for this Analytics data query. */
  previousLink?: string;
  /** Information for the view (profile), for which the Analytics data was requested. */
  profileInfo?: { accountId?: string; internalWebPropertyId?: string; profileId?: string; profileName?: string; tableId?: string; webPropertyId?: string };
  /** Analytics data request query parameters. */
  query?: { dimensions?: string; "end-date"?: string; filters?: string; ids?: string; "max-results"?: number; metrics?: Array<string>; samplingLevel?: string; segment?: string; sort?: Array<string>; "start-date"?: string; "start-index"?: number };
  /** Analytics data rows, where each row contains a list of dimension values followed by the metric values. The order of dimensions and metrics is same as specified in the request. */
  rows?: Array<Array<{ conversionPathValue?: Array<{ interactionType?: string; nodeValue?: string }>; primitiveValue?: string }>>;
  /** The number of samples used to calculate the result. */
  sampleSize?: string;
  /** Total size of the sample space from which the samples were selected. */
  sampleSpace?: string;
  /** Link to this page. */
  selfLink?: string;
  /** The total number of rows for the query, regardless of the number of rows in the response. */
  totalResults?: number;
  /** Total values for the requested metrics over all the results, not just the results returned in this response. The order of the metric totals is same as the metric order specified in the request. */
  totalsForAllResults?: Record<string, string>;
}

export const McfData: Schema.Schema<McfData> = Schema.suspend(() => Schema.Struct({
  columnHeaders: Schema.optional(Schema.Array(Schema.Struct({ columnType: Schema.optional(Schema.String), dataType: Schema.optional(Schema.String), name: Schema.optional(Schema.String) }))),
  containsSampledData: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  profileInfo: Schema.optional(Schema.Struct({ accountId: Schema.optional(Schema.String), internalWebPropertyId: Schema.optional(Schema.String), profileId: Schema.optional(Schema.String), profileName: Schema.optional(Schema.String), tableId: Schema.optional(Schema.String), webPropertyId: Schema.optional(Schema.String) })),
  query: Schema.optional(Schema.Struct({ dimensions: Schema.optional(Schema.String), "end-date": Schema.optional(Schema.String), filters: Schema.optional(Schema.String), ids: Schema.optional(Schema.String), "max-results": Schema.optional(Schema.Number), metrics: Schema.optional(Schema.Array(Schema.String)), samplingLevel: Schema.optional(Schema.String), segment: Schema.optional(Schema.String), sort: Schema.optional(Schema.Array(Schema.String)), "start-date": Schema.optional(Schema.String), "start-index": Schema.optional(Schema.Number) })),
  rows: Schema.optional(Schema.Array(Schema.Array(Schema.Struct({ conversionPathValue: Schema.optional(Schema.Array(Schema.Struct({ interactionType: Schema.optional(Schema.String), nodeValue: Schema.optional(Schema.String) }))), primitiveValue: Schema.optional(Schema.String) })))),
  sampleSize: Schema.optional(Schema.String),
  sampleSpace: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  totalResults: Schema.optional(Schema.Number),
  totalsForAllResults: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "McfData" }) as any as Schema.Schema<McfData>;

export interface ProfileFilterLink {
  /** Filter for this link. */
  filterRef?: FilterRef;
  /** Profile filter link ID. */
  id?: string;
  /** Resource type for Analytics filter. */
  kind?: string;
  /** View (Profile) for this link. */
  profileRef?: ProfileRef;
  /** The rank of this profile filter link relative to the other filters linked to the same profile. For readonly (i.e., list and get) operations, the rank always starts at 1. For write (i.e., create, update, or delete) operations, you may specify a value between 0 and 255 inclusively, [0, 255]. In order to insert a link at the end of the list, either don't specify a rank or set a rank to a number greater than the largest rank in the list. In order to insert a link to the beginning of the list specify a rank that is less than or equal to 1. The new link will move all existing filters with the same or lower rank down the list. After the link is inserted/updated/deleted all profile filter links will be renumbered starting at 1. */
  rank?: number;
  /** Link for this profile filter link. */
  selfLink?: string;
}

export const ProfileFilterLink: Schema.Schema<ProfileFilterLink> = Schema.suspend(() => Schema.Struct({
  filterRef: Schema.optional(FilterRef),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  profileRef: Schema.optional(ProfileRef),
  rank: Schema.optional(Schema.Number),
  selfLink: Schema.optional(Schema.String),
})).annotate({ identifier: "ProfileFilterLink" }) as any as Schema.Schema<ProfileFilterLink>;

export interface ProfileFilterLinks {
  /** A list of profile filter links. */
  items?: Array<ProfileFilterLink>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1,000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this profile filter link collection. */
  nextLink?: string;
  /** Link to previous page for this profile filter link collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const ProfileFilterLinks: Schema.Schema<ProfileFilterLinks> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(ProfileFilterLink)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "ProfileFilterLinks" }) as any as Schema.Schema<ProfileFilterLinks>;

export interface Profiles {
  /** A list of views (profiles). */
  items?: Array<Profile>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this view (profile) collection. */
  nextLink?: string;
  /** Link to previous page for this view (profile) collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Profiles: Schema.Schema<Profiles> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Profile)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Profiles" }) as any as Schema.Schema<Profiles>;

export interface RealtimeData {
  /** Column headers that list dimension names followed by the metric names. The order of dimensions and metrics is same as specified in the request. */
  columnHeaders?: Array<{ columnType?: string; dataType?: string; name?: string }>;
  /** Unique ID for this data response. */
  id?: string;
  /** Resource type. */
  kind?: string;
  /** Information for the view (profile), for which the real time data was requested. */
  profileInfo?: { accountId?: string; internalWebPropertyId?: string; profileId?: string; profileName?: string; tableId?: string; webPropertyId?: string };
  /** Real time data request query parameters. */
  query?: { dimensions?: string; filters?: string; ids?: string; "max-results"?: number; metrics?: Array<string>; sort?: Array<string> };
  /** Real time data rows, where each row contains a list of dimension values followed by the metric values. The order of dimensions and metrics is same as specified in the request. */
  rows?: Array<Array<string>>;
  /** Link to this page. */
  selfLink?: string;
  /** The total number of rows for the query, regardless of the number of rows in the response. */
  totalResults?: number;
  /** Total values for the requested metrics over all the results, not just the results returned in this response. The order of the metric totals is same as the metric order specified in the request. */
  totalsForAllResults?: Record<string, string>;
}

export const RealtimeData: Schema.Schema<RealtimeData> = Schema.suspend(() => Schema.Struct({
  columnHeaders: Schema.optional(Schema.Array(Schema.Struct({ columnType: Schema.optional(Schema.String), dataType: Schema.optional(Schema.String), name: Schema.optional(Schema.String) }))),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  profileInfo: Schema.optional(Schema.Struct({ accountId: Schema.optional(Schema.String), internalWebPropertyId: Schema.optional(Schema.String), profileId: Schema.optional(Schema.String), profileName: Schema.optional(Schema.String), tableId: Schema.optional(Schema.String), webPropertyId: Schema.optional(Schema.String) })),
  query: Schema.optional(Schema.Struct({ dimensions: Schema.optional(Schema.String), filters: Schema.optional(Schema.String), ids: Schema.optional(Schema.String), "max-results": Schema.optional(Schema.Number), metrics: Schema.optional(Schema.Array(Schema.String)), sort: Schema.optional(Schema.Array(Schema.String)) })),
  rows: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
  selfLink: Schema.optional(Schema.String),
  totalResults: Schema.optional(Schema.Number),
  totalsForAllResults: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "RealtimeData" }) as any as Schema.Schema<RealtimeData>;

export interface RemarketingAudience {
  /** Account ID to which this remarketing audience belongs. */
  accountId?: string;
  /** The simple audience definition that will cause a user to be added to an audience. */
  audienceDefinition?: { includeConditions?: IncludeConditions };
  /** The type of audience, either SIMPLE or STATE_BASED. */
  audienceType?: string;
  /** Time this remarketing audience was created. */
  created?: string;
  /** The description of this remarketing audience. */
  description?: string;
  /** Remarketing Audience ID. */
  id?: string;
  /** Internal ID for the web property to which this remarketing audience belongs. */
  internalWebPropertyId?: string;
  /** Collection type. */
  kind?: string;
  /** The linked ad accounts associated with this remarketing audience. A remarketing audience can have only one linkedAdAccount currently. */
  linkedAdAccounts?: Array<LinkedForeignAccount>;
  /** The views (profiles) that this remarketing audience is linked to. */
  linkedViews?: Array<string>;
  /** The name of this remarketing audience. */
  name?: string;
  /** A state based audience definition that will cause a user to be added or removed from an audience. */
  stateBasedAudienceDefinition?: { excludeConditions?: { exclusionDuration?: string; segment?: string }; includeConditions?: IncludeConditions };
  /** Time this remarketing audience was last modified. */
  updated?: string;
  /** Web property ID of the form UA-XXXXX-YY to which this remarketing audience belongs. */
  webPropertyId?: string;
}

export const RemarketingAudience: Schema.Schema<RemarketingAudience> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  audienceDefinition: Schema.optional(Schema.Struct({ includeConditions: Schema.optional(IncludeConditions) })),
  audienceType: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  internalWebPropertyId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  linkedAdAccounts: Schema.optional(Schema.Array(LinkedForeignAccount)),
  linkedViews: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  stateBasedAudienceDefinition: Schema.optional(Schema.Struct({ excludeConditions: Schema.optional(Schema.Struct({ exclusionDuration: Schema.optional(Schema.String), segment: Schema.optional(Schema.String) })), includeConditions: Schema.optional(IncludeConditions) })),
  updated: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemarketingAudience" }) as any as Schema.Schema<RemarketingAudience>;

export interface RemarketingAudiences {
  /** A list of remarketing audiences. */
  items?: Array<RemarketingAudience>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this remarketing audience collection. */
  nextLink?: string;
  /** Link to previous page for this view (profile) collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const RemarketingAudiences: Schema.Schema<RemarketingAudiences> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(RemarketingAudience)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "RemarketingAudiences" }) as any as Schema.Schema<RemarketingAudiences>;

export interface Segment {
  /** Time the segment was created. */
  created?: string;
  /** Segment definition. */
  definition?: string;
  /** Segment ID. */
  id?: string;
  /** Resource type for Analytics segment. */
  kind?: string;
  /** Segment name. */
  name?: string;
  /** Segment ID. Can be used with the 'segment' parameter in Core Reporting API. */
  segmentId?: string;
  /** Link for this segment. */
  selfLink?: string;
  /** Type for a segment. Possible values are "BUILT_IN" or "CUSTOM". */
  type?: string;
  /** Time the segment was last modified. */
  updated?: string;
}

export const Segment: Schema.Schema<Segment> = Schema.suspend(() => Schema.Struct({
  created: Schema.optional(Schema.String),
  definition: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  segmentId: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "Segment" }) as any as Schema.Schema<Segment>;

export interface Segments {
  /** A list of segments. */
  items?: Array<Segment>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type for segments. */
  kind?: string;
  /** Link to next page for this segment collection. */
  nextLink?: string;
  /** Link to previous page for this segment collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Segments: Schema.Schema<Segments> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Segment)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Segments" }) as any as Schema.Schema<Segments>;

export interface UnsampledReport {
  /** Account ID to which this unsampled report belongs. */
  accountId?: string;
  /** Download details for a file stored in Google Cloud Storage. */
  cloudStorageDownloadDetails?: { bucketId?: string; objectId?: string };
  /** Time this unsampled report was created. */
  created?: string;
  /** The dimensions for the unsampled report. */
  dimensions?: string;
  /** The type of download you need to use for the report data file. Possible values include `GOOGLE_DRIVE` and `GOOGLE_CLOUD_STORAGE`. If the value is `GOOGLE_DRIVE`, see the `driveDownloadDetails` field. If the value is `GOOGLE_CLOUD_STORAGE`, see the `cloudStorageDownloadDetails` field. */
  downloadType?: string;
  /** Download details for a file stored in Google Drive. */
  driveDownloadDetails?: { documentId?: string };
  /** The end date for the unsampled report. */
  "end-date"?: string;
  /** The filters for the unsampled report. */
  filters?: string;
  /** Unsampled report ID. */
  id?: string;
  /** Resource type for an Analytics unsampled report. */
  kind?: string;
  /** The metrics for the unsampled report. */
  metrics?: string;
  /** View (Profile) ID to which this unsampled report belongs. */
  profileId?: string;
  /** The segment for the unsampled report. */
  segment?: string;
  /** Link for this unsampled report. */
  selfLink?: string;
  /** The start date for the unsampled report. */
  "start-date"?: string;
  /** Status of this unsampled report. Possible values are PENDING, COMPLETED, or FAILED. */
  status?: string;
  /** Title of the unsampled report. */
  title?: string;
  /** Time this unsampled report was last modified. */
  updated?: string;
  /** Web property ID to which this unsampled report belongs. The web property ID is of the form UA-XXXXX-YY. */
  webPropertyId?: string;
}

export const UnsampledReport: Schema.Schema<UnsampledReport> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  cloudStorageDownloadDetails: Schema.optional(Schema.Struct({ bucketId: Schema.optional(Schema.String), objectId: Schema.optional(Schema.String) })),
  created: Schema.optional(Schema.String),
  dimensions: Schema.optional(Schema.String),
  downloadType: Schema.optional(Schema.String),
  driveDownloadDetails: Schema.optional(Schema.Struct({ documentId: Schema.optional(Schema.String) })),
  "end-date": Schema.optional(Schema.String),
  filters: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.String),
  profileId: Schema.optional(Schema.String),
  segment: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  "start-date": Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "UnsampledReport" }) as any as Schema.Schema<UnsampledReport>;

export interface UnsampledReports {
  /** A list of unsampled reports. */
  items?: Array<UnsampledReport>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this unsampled report collection. */
  nextLink?: string;
  /** Link to previous page for this unsampled report collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const UnsampledReports: Schema.Schema<UnsampledReports> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(UnsampledReport)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "UnsampledReports" }) as any as Schema.Schema<UnsampledReports>;

export interface Upload {
  /** Account Id to which this upload belongs. */
  accountId?: string;
  /** Custom data source Id to which this data import belongs. */
  customDataSourceId?: string;
  /** Data import errors collection. */
  errors?: Array<string>;
  /** A unique ID for this upload. */
  id?: string;
  /** Resource type for Analytics upload. */
  kind?: string;
  /** Upload status. Possible values: PENDING, COMPLETED, FAILED, DELETING, DELETED. */
  status?: string;
  /** Time this file is uploaded. */
  uploadTime?: string;
}

export const Upload: Schema.Schema<Upload> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  customDataSourceId: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  uploadTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Upload" }) as any as Schema.Schema<Upload>;

export interface Uploads {
  /** A list of uploads. */
  items?: Array<Upload>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this upload collection. */
  nextLink?: string;
  /** Link to previous page for this upload collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of resources in the result. */
  totalResults?: number;
}

export const Uploads: Schema.Schema<Uploads> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Upload)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
})).annotate({ identifier: "Uploads" }) as any as Schema.Schema<Uploads>;

export interface UserDeletionRequest {
  /** This marks the point in time for which all user data before should be deleted */
  deletionRequestTime?: string;
  /** Firebase Project Id */
  firebaseProjectId?: string;
  /** User ID. */
  id?: { type?: string; userId?: string };
  /** Value is "analytics#userDeletionRequest". */
  kind?: string;
  /** Property ID */
  propertyId?: string;
  /** Web property ID of the form UA-XXXXX-YY. */
  webPropertyId?: string;
}

export const UserDeletionRequest: Schema.Schema<UserDeletionRequest> = Schema.suspend(() => Schema.Struct({
  deletionRequestTime: Schema.optional(Schema.String),
  firebaseProjectId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.Struct({ type: Schema.optional(Schema.String), userId: Schema.optional(Schema.String) })),
  kind: Schema.optional(Schema.String),
  propertyId: Schema.optional(Schema.String),
  webPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "UserDeletionRequest" }) as any as Schema.Schema<UserDeletionRequest>;

export interface Webproperties {
  /** A list of web properties. */
  items?: Array<Webproperty>;
  /** The maximum number of resources the response can contain, regardless of the actual number of resources returned. Its value ranges from 1 to 1000 with a value of 1000 by default, or otherwise specified by the max-results query parameter. */
  itemsPerPage?: number;
  /** Collection type. */
  kind?: string;
  /** Link to next page for this web property collection. */
  nextLink?: string;
  /** Link to previous page for this web property collection. */
  previousLink?: string;
  /** The starting index of the resources, which is 1 by default or otherwise specified by the start-index query parameter. */
  startIndex?: number;
  /** The total number of results for the query, regardless of the number of results in the response. */
  totalResults?: number;
  /** Email ID of the authenticated user */
  username?: string;
}

export const Webproperties: Schema.Schema<Webproperties> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Webproperty)),
  itemsPerPage: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  nextLink: Schema.optional(Schema.String),
  previousLink: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.Number),
  totalResults: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "Webproperties" }) as any as Schema.Schema<Webproperties>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns Analytics data for a view (profile). */
export interface GetDataGaRequest {
  /** A comma-separated list of Analytics dimensions. E.g., 'ga:browser,ga:city'. */
  dimensions?: string;
  /** End date for fetching Analytics data. Request can should specify an end date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is yesterday. */
  "end-date": string;
  /** A comma-separated list of dimension or metric filters to be applied to Analytics data. */
  filters?: string;
  /** Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID. */
  ids: string;
  /** The response will include empty rows if this parameter is set to true, the default is true */
  "include-empty-rows"?: boolean;
  /** The maximum number of entries to include in this feed. */
  "max-results"?: number;
  /** A comma-separated list of Analytics metrics. E.g., 'ga:sessions,ga:pageviews'. At least one metric must be specified. */
  metrics: string;
  /** The selected format for the response. Default format is JSON. */
  output?: "dataTable" | "json" | (string & {});
  /** The desired sampling level. */
  samplingLevel?: "DEFAULT" | "FASTER" | "HIGHER_PRECISION" | (string & {});
  /** An Analytics segment to be applied to data. */
  segment?: string;
  /** A comma-separated list of dimensions or metrics that determine the sort order for Analytics data. */
  sort?: string;
  /** Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo. */
  "start-date": string;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const GetDataGaRequest = Schema.Struct({
  dimensions: Schema.optional(Schema.String).pipe(T.HttpQuery("dimensions")),
  "end-date": Schema.String.pipe(T.HttpQuery("end-date")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  ids: Schema.String.pipe(T.HttpQuery("ids")),
  "include-empty-rows": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("include-empty-rows")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
  output: Schema.optional(Schema.String).pipe(T.HttpQuery("output")),
  samplingLevel: Schema.optional(Schema.String).pipe(T.HttpQuery("samplingLevel")),
  segment: Schema.optional(Schema.String).pipe(T.HttpQuery("segment")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  "start-date": Schema.String.pipe(T.HttpQuery("start-date")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "data/ga" }),
  svc,
) as unknown as Schema.Schema<GetDataGaRequest>;

export type GetDataGaResponse = GaData;
export const GetDataGaResponse = GaData;

export type GetDataGaError = CommonErrors;

export const getDataGa: API.OperationMethod<GetDataGaRequest, GetDataGaResponse, GetDataGaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDataGaRequest,
  output: GetDataGaResponse,
  errors: [],
}));

/** Returns Analytics Multi-Channel Funnels data for a view (profile). */
export interface GetDataMcfRequest {
  /** A comma-separated list of Multi-Channel Funnels dimensions. E.g., 'mcf:source,mcf:medium'. */
  dimensions?: string;
  /** End date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo. */
  "end-date": string;
  /** A comma-separated list of dimension or metric filters to be applied to the Analytics data. */
  filters?: string;
  /** Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID. */
  ids: string;
  /** The maximum number of entries to include in this feed. */
  "max-results"?: number;
  /** A comma-separated list of Multi-Channel Funnels metrics. E.g., 'mcf:totalConversions,mcf:totalConversionValue'. At least one metric must be specified. */
  metrics: string;
  /** The desired sampling level. */
  samplingLevel?: "DEFAULT" | "FASTER" | "HIGHER_PRECISION" | (string & {});
  /** A comma-separated list of dimensions or metrics that determine the sort order for the Analytics data. */
  sort?: string;
  /** Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo. */
  "start-date": string;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const GetDataMcfRequest = Schema.Struct({
  dimensions: Schema.optional(Schema.String).pipe(T.HttpQuery("dimensions")),
  "end-date": Schema.String.pipe(T.HttpQuery("end-date")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  ids: Schema.String.pipe(T.HttpQuery("ids")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
  samplingLevel: Schema.optional(Schema.String).pipe(T.HttpQuery("samplingLevel")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
  "start-date": Schema.String.pipe(T.HttpQuery("start-date")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "data/mcf" }),
  svc,
) as unknown as Schema.Schema<GetDataMcfRequest>;

export type GetDataMcfResponse = McfData;
export const GetDataMcfResponse = McfData;

export type GetDataMcfError = CommonErrors;

export const getDataMcf: API.OperationMethod<GetDataMcfRequest, GetDataMcfResponse, GetDataMcfError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDataMcfRequest,
  output: GetDataMcfResponse,
  errors: [],
}));

/** Returns real time data for a view (profile). */
export interface GetDataRealtimeRequest {
  /** A comma-separated list of real time dimensions. E.g., 'rt:medium,rt:city'. */
  dimensions?: string;
  /** A comma-separated list of dimension or metric filters to be applied to real time data. */
  filters?: string;
  /** Unique table ID for retrieving real time data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID. */
  ids: string;
  /** The maximum number of entries to include in this feed. */
  "max-results"?: number;
  /** A comma-separated list of real time metrics. E.g., 'rt:activeUsers'. At least one metric must be specified. */
  metrics: string;
  /** A comma-separated list of dimensions or metrics that determine the sort order for real time data. */
  sort?: string;
}

export const GetDataRealtimeRequest = Schema.Struct({
  dimensions: Schema.optional(Schema.String).pipe(T.HttpQuery("dimensions")),
  filters: Schema.optional(Schema.String).pipe(T.HttpQuery("filters")),
  ids: Schema.String.pipe(T.HttpQuery("ids")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  metrics: Schema.String.pipe(T.HttpQuery("metrics")),
  sort: Schema.optional(Schema.String).pipe(T.HttpQuery("sort")),
}).pipe(
  T.Http({ method: "GET", path: "data/realtime" }),
  svc,
) as unknown as Schema.Schema<GetDataRealtimeRequest>;

export type GetDataRealtimeResponse = RealtimeData;
export const GetDataRealtimeResponse = RealtimeData;

export type GetDataRealtimeError = CommonErrors;

export const getDataRealtime: API.OperationMethod<GetDataRealtimeRequest, GetDataRealtimeResponse, GetDataRealtimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDataRealtimeRequest,
  output: GetDataRealtimeResponse,
  errors: [],
}));

/** Lists account summaries (lightweight tree comprised of accounts/properties/profiles) to which the user has access. */
export interface ListManagementAccountSummariesRequest {
  /** The maximum number of account summaries to include in this response, where the largest acceptable value is 1000. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementAccountSummariesRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "management/accountSummaries" }),
  svc,
) as unknown as Schema.Schema<ListManagementAccountSummariesRequest>;

export type ListManagementAccountSummariesResponse = AccountSummaries;
export const ListManagementAccountSummariesResponse = AccountSummaries;

export type ListManagementAccountSummariesError = CommonErrors;

export const listManagementAccountSummaries: API.OperationMethod<ListManagementAccountSummariesRequest, ListManagementAccountSummariesResponse, ListManagementAccountSummariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementAccountSummariesRequest,
  output: ListManagementAccountSummariesResponse,
  errors: [],
}));

/** Removes a user from the given account. */
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
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/entityUserLinks/{linkId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementAccountUserLinksRequest>;

export interface DeleteManagementAccountUserLinksResponse {}
export const DeleteManagementAccountUserLinksResponse: Schema.Schema<DeleteManagementAccountUserLinksResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementAccountUserLinksResponse>;

export type DeleteManagementAccountUserLinksError = CommonErrors;

export const deleteManagementAccountUserLinks: API.OperationMethod<DeleteManagementAccountUserLinksRequest, DeleteManagementAccountUserLinksResponse, DeleteManagementAccountUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementAccountUserLinksRequest,
  output: DeleteManagementAccountUserLinksResponse,
  errors: [],
}));

/** Adds a new user to the given account. */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/entityUserLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementAccountUserLinksRequest>;

export type InsertManagementAccountUserLinksResponse = EntityUserLink;
export const InsertManagementAccountUserLinksResponse = EntityUserLink;

export type InsertManagementAccountUserLinksError = CommonErrors;

export const insertManagementAccountUserLinks: API.OperationMethod<InsertManagementAccountUserLinksRequest, InsertManagementAccountUserLinksResponse, InsertManagementAccountUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementAccountUserLinksRequest,
  output: InsertManagementAccountUserLinksResponse,
  errors: [],
}));

/** Lists account-user links for a given account. */
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
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/entityUserLinks" }),
  svc,
) as unknown as Schema.Schema<ListManagementAccountUserLinksRequest>;

export type ListManagementAccountUserLinksResponse = EntityUserLinks;
export const ListManagementAccountUserLinksResponse = EntityUserLinks;

export type ListManagementAccountUserLinksError = CommonErrors;

export const listManagementAccountUserLinks: API.OperationMethod<ListManagementAccountUserLinksRequest, ListManagementAccountUserLinksResponse, ListManagementAccountUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementAccountUserLinksRequest,
  output: ListManagementAccountUserLinksResponse,
  errors: [],
}));

/** Updates permissions for an existing user on the given account. */
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
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/entityUserLinks/{linkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementAccountUserLinksRequest>;

export type UpdateManagementAccountUserLinksResponse = EntityUserLink;
export const UpdateManagementAccountUserLinksResponse = EntityUserLink;

export type UpdateManagementAccountUserLinksError = CommonErrors;

export const updateManagementAccountUserLinks: API.OperationMethod<UpdateManagementAccountUserLinksRequest, UpdateManagementAccountUserLinksResponse, UpdateManagementAccountUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementAccountUserLinksRequest,
  output: UpdateManagementAccountUserLinksResponse,
  errors: [],
}));

/** Lists all accounts to which the user has access. */
export interface ListManagementAccountsRequest {
  /** The maximum number of accounts to include in this response. */
  "max-results"?: number;
  /** An index of the first account to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementAccountsRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts" }),
  svc,
) as unknown as Schema.Schema<ListManagementAccountsRequest>;

export type ListManagementAccountsResponse = Accounts;
export const ListManagementAccountsResponse = Accounts;

export type ListManagementAccountsError = CommonErrors;

export const listManagementAccounts: API.OperationMethod<ListManagementAccountsRequest, ListManagementAccountsResponse, ListManagementAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementAccountsRequest,
  output: ListManagementAccountsResponse,
  errors: [],
}));

/** Hashes the given Client ID. */
export interface HashClientIdManagementClientIdRequest {
  /** Request body */
  body?: HashClientIdRequest;
}

export const HashClientIdManagementClientIdRequest = Schema.Struct({
  body: Schema.optional(HashClientIdRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/clientId:hashClientId", hasBody: true }),
  svc,
) as unknown as Schema.Schema<HashClientIdManagementClientIdRequest>;

export type HashClientIdManagementClientIdResponse = HashClientIdResponse;
export const HashClientIdManagementClientIdResponse = HashClientIdResponse;

export type HashClientIdManagementClientIdError = CommonErrors;

export const hashClientIdManagementClientId: API.OperationMethod<HashClientIdManagementClientIdRequest, HashClientIdManagementClientIdResponse, HashClientIdManagementClientIdError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: HashClientIdManagementClientIdRequest,
  output: HashClientIdManagementClientIdResponse,
  errors: [],
}));

/** List custom data sources to which the user has access. */
export interface ListManagementCustomDataSourcesRequest {
  /** Account Id for the custom data sources to retrieve. */
  accountId: string;
  /** The maximum number of custom data sources to include in this response. */
  "max-results"?: number;
  /** A 1-based index of the first custom data source to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property Id for the custom data sources to retrieve. */
  webPropertyId: string;
}

export const ListManagementCustomDataSourcesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources" }),
  svc,
) as unknown as Schema.Schema<ListManagementCustomDataSourcesRequest>;

export type ListManagementCustomDataSourcesResponse = CustomDataSources;
export const ListManagementCustomDataSourcesResponse = CustomDataSources;

export type ListManagementCustomDataSourcesError = CommonErrors;

export const listManagementCustomDataSources: API.OperationMethod<ListManagementCustomDataSourcesRequest, ListManagementCustomDataSourcesResponse, ListManagementCustomDataSourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementCustomDataSourcesRequest,
  output: ListManagementCustomDataSourcesResponse,
  errors: [],
}));

/** Get a custom dimension to which the user has access. */
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
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementCustomDimensionsRequest>;

export type GetManagementCustomDimensionsResponse = CustomDimension;
export const GetManagementCustomDimensionsResponse = CustomDimension;

export type GetManagementCustomDimensionsError = CommonErrors;

export const getManagementCustomDimensions: API.OperationMethod<GetManagementCustomDimensionsRequest, GetManagementCustomDimensionsResponse, GetManagementCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementCustomDimensionsRequest,
  output: GetManagementCustomDimensionsResponse,
  errors: [],
}));

/** Create a new custom dimension. */
export interface InsertManagementCustomDimensionsRequest {
  /** Account ID for the custom dimension to create. */
  accountId: string;
  /** Web property ID for the custom dimension to create. */
  webPropertyId: string;
  /** Request body */
  body?: CustomDimension;
}

export const InsertManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementCustomDimensionsRequest>;

export type InsertManagementCustomDimensionsResponse = CustomDimension;
export const InsertManagementCustomDimensionsResponse = CustomDimension;

export type InsertManagementCustomDimensionsError = CommonErrors;

export const insertManagementCustomDimensions: API.OperationMethod<InsertManagementCustomDimensionsRequest, InsertManagementCustomDimensionsResponse, InsertManagementCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementCustomDimensionsRequest,
  output: InsertManagementCustomDimensionsResponse,
  errors: [],
}));

/** Lists custom dimensions to which the user has access. */
export interface ListManagementCustomDimensionsRequest {
  /** Account ID for the custom dimensions to retrieve. */
  accountId: string;
  /** The maximum number of custom dimensions to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID for the custom dimensions to retrieve. */
  webPropertyId: string;
}

export const ListManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions" }),
  svc,
) as unknown as Schema.Schema<ListManagementCustomDimensionsRequest>;

export type ListManagementCustomDimensionsResponse = CustomDimensions;
export const ListManagementCustomDimensionsResponse = CustomDimensions;

export type ListManagementCustomDimensionsError = CommonErrors;

export const listManagementCustomDimensions: API.OperationMethod<ListManagementCustomDimensionsRequest, ListManagementCustomDimensionsResponse, ListManagementCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementCustomDimensionsRequest,
  output: ListManagementCustomDimensionsResponse,
  errors: [],
}));

/** Updates an existing custom dimension. This method supports patch semantics. */
export interface PatchManagementCustomDimensionsRequest {
  /** Account ID for the custom dimension to update. */
  accountId: string;
  /** Custom dimension ID for the custom dimension to update. */
  customDimensionId: string;
  /** Force the update and ignore any warnings related to the custom dimension being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Web property ID for the custom dimension to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomDimension;
}

export const PatchManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDimensionId: Schema.String.pipe(T.HttpPath("customDimensionId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreCustomDataSourceLinks")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementCustomDimensionsRequest>;

export type PatchManagementCustomDimensionsResponse = CustomDimension;
export const PatchManagementCustomDimensionsResponse = CustomDimension;

export type PatchManagementCustomDimensionsError = CommonErrors;

export const patchManagementCustomDimensions: API.OperationMethod<PatchManagementCustomDimensionsRequest, PatchManagementCustomDimensionsResponse, PatchManagementCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementCustomDimensionsRequest,
  output: PatchManagementCustomDimensionsResponse,
  errors: [],
}));

/** Updates an existing custom dimension. */
export interface UpdateManagementCustomDimensionsRequest {
  /** Account ID for the custom dimension to update. */
  accountId: string;
  /** Custom dimension ID for the custom dimension to update. */
  customDimensionId: string;
  /** Force the update and ignore any warnings related to the custom dimension being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Web property ID for the custom dimension to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomDimension;
}

export const UpdateManagementCustomDimensionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDimensionId: Schema.String.pipe(T.HttpPath("customDimensionId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreCustomDataSourceLinks")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementCustomDimensionsRequest>;

export type UpdateManagementCustomDimensionsResponse = CustomDimension;
export const UpdateManagementCustomDimensionsResponse = CustomDimension;

export type UpdateManagementCustomDimensionsError = CommonErrors;

export const updateManagementCustomDimensions: API.OperationMethod<UpdateManagementCustomDimensionsRequest, UpdateManagementCustomDimensionsResponse, UpdateManagementCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementCustomDimensionsRequest,
  output: UpdateManagementCustomDimensionsResponse,
  errors: [],
}));

/** Get a custom metric to which the user has access. */
export interface GetManagementCustomMetricsRequest {
  /** Account ID for the custom metric to retrieve. */
  accountId: string;
  /** The ID of the custom metric to retrieve. */
  customMetricId: string;
  /** Web property ID for the custom metric to retrieve. */
  webPropertyId: string;
}

export const GetManagementCustomMetricsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customMetricId: Schema.String.pipe(T.HttpPath("customMetricId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementCustomMetricsRequest>;

export type GetManagementCustomMetricsResponse = CustomMetric;
export const GetManagementCustomMetricsResponse = CustomMetric;

export type GetManagementCustomMetricsError = CommonErrors;

export const getManagementCustomMetrics: API.OperationMethod<GetManagementCustomMetricsRequest, GetManagementCustomMetricsResponse, GetManagementCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementCustomMetricsRequest,
  output: GetManagementCustomMetricsResponse,
  errors: [],
}));

/** Create a new custom metric. */
export interface InsertManagementCustomMetricsRequest {
  /** Account ID for the custom metric to create. */
  accountId: string;
  /** Web property ID for the custom dimension to create. */
  webPropertyId: string;
  /** Request body */
  body?: CustomMetric;
}

export const InsertManagementCustomMetricsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementCustomMetricsRequest>;

export type InsertManagementCustomMetricsResponse = CustomMetric;
export const InsertManagementCustomMetricsResponse = CustomMetric;

export type InsertManagementCustomMetricsError = CommonErrors;

export const insertManagementCustomMetrics: API.OperationMethod<InsertManagementCustomMetricsRequest, InsertManagementCustomMetricsResponse, InsertManagementCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementCustomMetricsRequest,
  output: InsertManagementCustomMetricsResponse,
  errors: [],
}));

/** Lists custom metrics to which the user has access. */
export interface ListManagementCustomMetricsRequest {
  /** Account ID for the custom metrics to retrieve. */
  accountId: string;
  /** The maximum number of custom metrics to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID for the custom metrics to retrieve. */
  webPropertyId: string;
}

export const ListManagementCustomMetricsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics" }),
  svc,
) as unknown as Schema.Schema<ListManagementCustomMetricsRequest>;

export type ListManagementCustomMetricsResponse = CustomMetrics;
export const ListManagementCustomMetricsResponse = CustomMetrics;

export type ListManagementCustomMetricsError = CommonErrors;

export const listManagementCustomMetrics: API.OperationMethod<ListManagementCustomMetricsRequest, ListManagementCustomMetricsResponse, ListManagementCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementCustomMetricsRequest,
  output: ListManagementCustomMetricsResponse,
  errors: [],
}));

/** Updates an existing custom metric. This method supports patch semantics. */
export interface PatchManagementCustomMetricsRequest {
  /** Account ID for the custom metric to update. */
  accountId: string;
  /** Custom metric ID for the custom metric to update. */
  customMetricId: string;
  /** Force the update and ignore any warnings related to the custom metric being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Web property ID for the custom metric to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomMetric;
}

export const PatchManagementCustomMetricsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customMetricId: Schema.String.pipe(T.HttpPath("customMetricId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreCustomDataSourceLinks")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementCustomMetricsRequest>;

export type PatchManagementCustomMetricsResponse = CustomMetric;
export const PatchManagementCustomMetricsResponse = CustomMetric;

export type PatchManagementCustomMetricsError = CommonErrors;

export const patchManagementCustomMetrics: API.OperationMethod<PatchManagementCustomMetricsRequest, PatchManagementCustomMetricsResponse, PatchManagementCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementCustomMetricsRequest,
  output: PatchManagementCustomMetricsResponse,
  errors: [],
}));

/** Updates an existing custom metric. */
export interface UpdateManagementCustomMetricsRequest {
  /** Account ID for the custom metric to update. */
  accountId: string;
  /** Custom metric ID for the custom metric to update. */
  customMetricId: string;
  /** Force the update and ignore any warnings related to the custom metric being linked to a custom data source / data set. */
  ignoreCustomDataSourceLinks?: boolean;
  /** Web property ID for the custom metric to update. */
  webPropertyId: string;
  /** Request body */
  body?: CustomMetric;
}

export const UpdateManagementCustomMetricsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customMetricId: Schema.String.pipe(T.HttpPath("customMetricId")),
  ignoreCustomDataSourceLinks: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreCustomDataSourceLinks")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(CustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementCustomMetricsRequest>;

export type UpdateManagementCustomMetricsResponse = CustomMetric;
export const UpdateManagementCustomMetricsResponse = CustomMetric;

export type UpdateManagementCustomMetricsError = CommonErrors;

export const updateManagementCustomMetrics: API.OperationMethod<UpdateManagementCustomMetricsRequest, UpdateManagementCustomMetricsResponse, UpdateManagementCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementCustomMetricsRequest,
  output: UpdateManagementCustomMetricsResponse,
  errors: [],
}));

/** Delete an experiment. */
export interface DeleteManagementExperimentsRequest {
  /** Account ID to which the experiment belongs */
  accountId: string;
  /** ID of the experiment to delete */
  experimentId: string;
  /** View (Profile) ID to which the experiment belongs */
  profileId: string;
  /** Web property ID to which the experiment belongs */
  webPropertyId: string;
}

export const DeleteManagementExperimentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementExperimentsRequest>;

export interface DeleteManagementExperimentsResponse {}
export const DeleteManagementExperimentsResponse: Schema.Schema<DeleteManagementExperimentsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementExperimentsResponse>;

export type DeleteManagementExperimentsError = CommonErrors;

export const deleteManagementExperiments: API.OperationMethod<DeleteManagementExperimentsRequest, DeleteManagementExperimentsResponse, DeleteManagementExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementExperimentsRequest,
  output: DeleteManagementExperimentsResponse,
  errors: [],
}));

/** Returns an experiment to which the user has access. */
export interface GetManagementExperimentsRequest {
  /** Account ID to retrieve the experiment for. */
  accountId: string;
  /** Experiment ID to retrieve the experiment for. */
  experimentId: string;
  /** View (Profile) ID to retrieve the experiment for. */
  profileId: string;
  /** Web property ID to retrieve the experiment for. */
  webPropertyId: string;
}

export const GetManagementExperimentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementExperimentsRequest>;

export type GetManagementExperimentsResponse = Experiment;
export const GetManagementExperimentsResponse = Experiment;

export type GetManagementExperimentsError = CommonErrors;

export const getManagementExperiments: API.OperationMethod<GetManagementExperimentsRequest, GetManagementExperimentsResponse, GetManagementExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementExperimentsRequest,
  output: GetManagementExperimentsResponse,
  errors: [],
}));

/** Create a new experiment. */
export interface InsertManagementExperimentsRequest {
  /** Account ID to create the experiment for. */
  accountId: string;
  /** View (Profile) ID to create the experiment for. */
  profileId: string;
  /** Web property ID to create the experiment for. */
  webPropertyId: string;
  /** Request body */
  body?: Experiment;
}

export const InsertManagementExperimentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementExperimentsRequest>;

export type InsertManagementExperimentsResponse = Experiment;
export const InsertManagementExperimentsResponse = Experiment;

export type InsertManagementExperimentsError = CommonErrors;

export const insertManagementExperiments: API.OperationMethod<InsertManagementExperimentsRequest, InsertManagementExperimentsResponse, InsertManagementExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementExperimentsRequest,
  output: InsertManagementExperimentsResponse,
  errors: [],
}));

/** Lists experiments to which the user has access. */
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
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments" }),
  svc,
) as unknown as Schema.Schema<ListManagementExperimentsRequest>;

export type ListManagementExperimentsResponse = Experiments;
export const ListManagementExperimentsResponse = Experiments;

export type ListManagementExperimentsError = CommonErrors;

export const listManagementExperiments: API.OperationMethod<ListManagementExperimentsRequest, ListManagementExperimentsResponse, ListManagementExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementExperimentsRequest,
  output: ListManagementExperimentsResponse,
  errors: [],
}));

/** Update an existing experiment. This method supports patch semantics. */
export interface PatchManagementExperimentsRequest {
  /** Account ID of the experiment to update. */
  accountId: string;
  /** Experiment ID of the experiment to update. */
  experimentId: string;
  /** View (Profile) ID of the experiment to update. */
  profileId: string;
  /** Web property ID of the experiment to update. */
  webPropertyId: string;
  /** Request body */
  body?: Experiment;
}

export const PatchManagementExperimentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementExperimentsRequest>;

export type PatchManagementExperimentsResponse = Experiment;
export const PatchManagementExperimentsResponse = Experiment;

export type PatchManagementExperimentsError = CommonErrors;

export const patchManagementExperiments: API.OperationMethod<PatchManagementExperimentsRequest, PatchManagementExperimentsResponse, PatchManagementExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementExperimentsRequest,
  output: PatchManagementExperimentsResponse,
  errors: [],
}));

/** Update an existing experiment. */
export interface UpdateManagementExperimentsRequest {
  /** Account ID of the experiment to update. */
  accountId: string;
  /** Experiment ID of the experiment to update. */
  experimentId: string;
  /** View (Profile) ID of the experiment to update. */
  profileId: string;
  /** Web property ID of the experiment to update. */
  webPropertyId: string;
  /** Request body */
  body?: Experiment;
}

export const UpdateManagementExperimentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  experimentId: Schema.String.pipe(T.HttpPath("experimentId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementExperimentsRequest>;

export type UpdateManagementExperimentsResponse = Experiment;
export const UpdateManagementExperimentsResponse = Experiment;

export type UpdateManagementExperimentsError = CommonErrors;

export const updateManagementExperiments: API.OperationMethod<UpdateManagementExperimentsRequest, UpdateManagementExperimentsResponse, UpdateManagementExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementExperimentsRequest,
  output: UpdateManagementExperimentsResponse,
  errors: [],
}));

/** Delete a filter. */
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
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/filters/{filterId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementFiltersRequest>;

export type DeleteManagementFiltersResponse = Filter;
export const DeleteManagementFiltersResponse = Filter;

export type DeleteManagementFiltersError = CommonErrors;

export const deleteManagementFilters: API.OperationMethod<DeleteManagementFiltersRequest, DeleteManagementFiltersResponse, DeleteManagementFiltersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementFiltersRequest,
  output: DeleteManagementFiltersResponse,
  errors: [],
}));

/** Returns filters to which the user has access. */
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
  T.Http({ method: "GET", path: "management/accounts/{accountId}/filters/{filterId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementFiltersRequest>;

export type GetManagementFiltersResponse = Filter;
export const GetManagementFiltersResponse = Filter;

export type GetManagementFiltersError = CommonErrors;

export const getManagementFilters: API.OperationMethod<GetManagementFiltersRequest, GetManagementFiltersResponse, GetManagementFiltersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementFiltersRequest,
  output: GetManagementFiltersResponse,
  errors: [],
}));

/** Create a new filter. */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/filters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementFiltersRequest>;

export type InsertManagementFiltersResponse = Filter;
export const InsertManagementFiltersResponse = Filter;

export type InsertManagementFiltersError = CommonErrors;

export const insertManagementFilters: API.OperationMethod<InsertManagementFiltersRequest, InsertManagementFiltersResponse, InsertManagementFiltersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementFiltersRequest,
  output: InsertManagementFiltersResponse,
  errors: [],
}));

/** Lists all filters for an account */
export interface ListManagementFiltersRequest {
  /** Account ID to retrieve filters for. */
  accountId: string;
  /** The maximum number of filters to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementFiltersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/filters" }),
  svc,
) as unknown as Schema.Schema<ListManagementFiltersRequest>;

export type ListManagementFiltersResponse = Filters;
export const ListManagementFiltersResponse = Filters;

export type ListManagementFiltersError = CommonErrors;

export const listManagementFilters: API.OperationMethod<ListManagementFiltersRequest, ListManagementFiltersResponse, ListManagementFiltersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementFiltersRequest,
  output: ListManagementFiltersResponse,
  errors: [],
}));

/** Updates an existing filter. This method supports patch semantics. */
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
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/filters/{filterId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementFiltersRequest>;

export type PatchManagementFiltersResponse = Filter;
export const PatchManagementFiltersResponse = Filter;

export type PatchManagementFiltersError = CommonErrors;

export const patchManagementFilters: API.OperationMethod<PatchManagementFiltersRequest, PatchManagementFiltersResponse, PatchManagementFiltersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementFiltersRequest,
  output: PatchManagementFiltersResponse,
  errors: [],
}));

/** Updates an existing filter. */
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
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/filters/{filterId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementFiltersRequest>;

export type UpdateManagementFiltersResponse = Filter;
export const UpdateManagementFiltersResponse = Filter;

export type UpdateManagementFiltersError = CommonErrors;

export const updateManagementFilters: API.OperationMethod<UpdateManagementFiltersRequest, UpdateManagementFiltersResponse, UpdateManagementFiltersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementFiltersRequest,
  output: UpdateManagementFiltersResponse,
  errors: [],
}));

/** Gets a goal to which the user has access. */
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
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementGoalsRequest>;

export type GetManagementGoalsResponse = Goal;
export const GetManagementGoalsResponse = Goal;

export type GetManagementGoalsError = CommonErrors;

export const getManagementGoals: API.OperationMethod<GetManagementGoalsRequest, GetManagementGoalsResponse, GetManagementGoalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementGoalsRequest,
  output: GetManagementGoalsResponse,
  errors: [],
}));

/** Create a new goal. */
export interface InsertManagementGoalsRequest {
  /** Account ID to create the goal for. */
  accountId: string;
  /** View (Profile) ID to create the goal for. */
  profileId: string;
  /** Web property ID to create the goal for. */
  webPropertyId: string;
  /** Request body */
  body?: Goal;
}

export const InsertManagementGoalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Goal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementGoalsRequest>;

export type InsertManagementGoalsResponse = Goal;
export const InsertManagementGoalsResponse = Goal;

export type InsertManagementGoalsError = CommonErrors;

export const insertManagementGoals: API.OperationMethod<InsertManagementGoalsRequest, InsertManagementGoalsResponse, InsertManagementGoalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementGoalsRequest,
  output: InsertManagementGoalsResponse,
  errors: [],
}));

/** Lists goals to which the user has access. */
export interface ListManagementGoalsRequest {
  /** Account ID to retrieve goals for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to. */
  accountId: string;
  /** The maximum number of goals to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve goals for. Can either be a specific view (profile) ID or '~all', which refers to all the views (profiles) that user has access to. */
  profileId: string;
  /** An index of the first goal to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID to retrieve goals for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
}

export const ListManagementGoalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals" }),
  svc,
) as unknown as Schema.Schema<ListManagementGoalsRequest>;

export type ListManagementGoalsResponse = Goals;
export const ListManagementGoalsResponse = Goals;

export type ListManagementGoalsError = CommonErrors;

export const listManagementGoals: API.OperationMethod<ListManagementGoalsRequest, ListManagementGoalsResponse, ListManagementGoalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementGoalsRequest,
  output: ListManagementGoalsResponse,
  errors: [],
}));

/** Updates an existing goal. This method supports patch semantics. */
export interface PatchManagementGoalsRequest {
  /** Account ID to update the goal. */
  accountId: string;
  /** Index of the goal to be updated. */
  goalId: string;
  /** View (Profile) ID to update the goal. */
  profileId: string;
  /** Web property ID to update the goal. */
  webPropertyId: string;
  /** Request body */
  body?: Goal;
}

export const PatchManagementGoalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  goalId: Schema.String.pipe(T.HttpPath("goalId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Goal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementGoalsRequest>;

export type PatchManagementGoalsResponse = Goal;
export const PatchManagementGoalsResponse = Goal;

export type PatchManagementGoalsError = CommonErrors;

export const patchManagementGoals: API.OperationMethod<PatchManagementGoalsRequest, PatchManagementGoalsResponse, PatchManagementGoalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementGoalsRequest,
  output: PatchManagementGoalsResponse,
  errors: [],
}));

/** Updates an existing goal. */
export interface UpdateManagementGoalsRequest {
  /** Account ID to update the goal. */
  accountId: string;
  /** Index of the goal to be updated. */
  goalId: string;
  /** View (Profile) ID to update the goal. */
  profileId: string;
  /** Web property ID to update the goal. */
  webPropertyId: string;
  /** Request body */
  body?: Goal;
}

export const UpdateManagementGoalsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  goalId: Schema.String.pipe(T.HttpPath("goalId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Goal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementGoalsRequest>;

export type UpdateManagementGoalsResponse = Goal;
export const UpdateManagementGoalsResponse = Goal;

export type UpdateManagementGoalsError = CommonErrors;

export const updateManagementGoals: API.OperationMethod<UpdateManagementGoalsRequest, UpdateManagementGoalsResponse, UpdateManagementGoalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementGoalsRequest,
  output: UpdateManagementGoalsResponse,
  errors: [],
}));

/** Delete a profile filter link. */
export interface DeleteManagementProfileFilterLinksRequest {
  /** Account ID to which the profile filter link belongs. */
  accountId: string;
  /** ID of the profile filter link to delete. */
  linkId: string;
  /** Profile ID to which the filter link belongs. */
  profileId: string;
  /** Web property Id to which the profile filter link belongs. */
  webPropertyId: string;
}

export const DeleteManagementProfileFilterLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementProfileFilterLinksRequest>;

export interface DeleteManagementProfileFilterLinksResponse {}
export const DeleteManagementProfileFilterLinksResponse: Schema.Schema<DeleteManagementProfileFilterLinksResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementProfileFilterLinksResponse>;

export type DeleteManagementProfileFilterLinksError = CommonErrors;

export const deleteManagementProfileFilterLinks: API.OperationMethod<DeleteManagementProfileFilterLinksRequest, DeleteManagementProfileFilterLinksResponse, DeleteManagementProfileFilterLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementProfileFilterLinksRequest,
  output: DeleteManagementProfileFilterLinksResponse,
  errors: [],
}));

/** Returns a single profile filter link. */
export interface GetManagementProfileFilterLinksRequest {
  /** Account ID to retrieve profile filter link for. */
  accountId: string;
  /** ID of the profile filter link. */
  linkId: string;
  /** Profile ID to retrieve filter link for. */
  profileId: string;
  /** Web property Id to retrieve profile filter link for. */
  webPropertyId: string;
}

export const GetManagementProfileFilterLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementProfileFilterLinksRequest>;

export type GetManagementProfileFilterLinksResponse = ProfileFilterLink;
export const GetManagementProfileFilterLinksResponse = ProfileFilterLink;

export type GetManagementProfileFilterLinksError = CommonErrors;

export const getManagementProfileFilterLinks: API.OperationMethod<GetManagementProfileFilterLinksRequest, GetManagementProfileFilterLinksResponse, GetManagementProfileFilterLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementProfileFilterLinksRequest,
  output: GetManagementProfileFilterLinksResponse,
  errors: [],
}));

/** Create a new profile filter link. */
export interface InsertManagementProfileFilterLinksRequest {
  /** Account ID to create profile filter link for. */
  accountId: string;
  /** Profile ID to create filter link for. */
  profileId: string;
  /** Web property Id to create profile filter link for. */
  webPropertyId: string;
  /** Request body */
  body?: ProfileFilterLink;
}

export const InsertManagementProfileFilterLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(ProfileFilterLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementProfileFilterLinksRequest>;

export type InsertManagementProfileFilterLinksResponse = ProfileFilterLink;
export const InsertManagementProfileFilterLinksResponse = ProfileFilterLink;

export type InsertManagementProfileFilterLinksError = CommonErrors;

export const insertManagementProfileFilterLinks: API.OperationMethod<InsertManagementProfileFilterLinksRequest, InsertManagementProfileFilterLinksResponse, InsertManagementProfileFilterLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementProfileFilterLinksRequest,
  output: InsertManagementProfileFilterLinksResponse,
  errors: [],
}));

/** Lists all profile filter links for a profile. */
export interface ListManagementProfileFilterLinksRequest {
  /** Account ID to retrieve profile filter links for. */
  accountId: string;
  /** The maximum number of profile filter links to include in this response. */
  "max-results"?: number;
  /** Profile ID to retrieve filter links for. Can either be a specific profile ID or '~all', which refers to all the profiles that user has access to. */
  profileId: string;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property Id for profile filter links for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
}

export const ListManagementProfileFilterLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks" }),
  svc,
) as unknown as Schema.Schema<ListManagementProfileFilterLinksRequest>;

export type ListManagementProfileFilterLinksResponse = ProfileFilterLinks;
export const ListManagementProfileFilterLinksResponse = ProfileFilterLinks;

export type ListManagementProfileFilterLinksError = CommonErrors;

export const listManagementProfileFilterLinks: API.OperationMethod<ListManagementProfileFilterLinksRequest, ListManagementProfileFilterLinksResponse, ListManagementProfileFilterLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementProfileFilterLinksRequest,
  output: ListManagementProfileFilterLinksResponse,
  errors: [],
}));

/** Update an existing profile filter link. This method supports patch semantics. */
export interface PatchManagementProfileFilterLinksRequest {
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

export const PatchManagementProfileFilterLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(ProfileFilterLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementProfileFilterLinksRequest>;

export type PatchManagementProfileFilterLinksResponse = ProfileFilterLink;
export const PatchManagementProfileFilterLinksResponse = ProfileFilterLink;

export type PatchManagementProfileFilterLinksError = CommonErrors;

export const patchManagementProfileFilterLinks: API.OperationMethod<PatchManagementProfileFilterLinksRequest, PatchManagementProfileFilterLinksResponse, PatchManagementProfileFilterLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementProfileFilterLinksRequest,
  output: PatchManagementProfileFilterLinksResponse,
  errors: [],
}));

/** Update an existing profile filter link. */
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
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementProfileFilterLinksRequest>;

export type UpdateManagementProfileFilterLinksResponse = ProfileFilterLink;
export const UpdateManagementProfileFilterLinksResponse = ProfileFilterLink;

export type UpdateManagementProfileFilterLinksError = CommonErrors;

export const updateManagementProfileFilterLinks: API.OperationMethod<UpdateManagementProfileFilterLinksRequest, UpdateManagementProfileFilterLinksResponse, UpdateManagementProfileFilterLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementProfileFilterLinksRequest,
  output: UpdateManagementProfileFilterLinksResponse,
  errors: [],
}));

/** Removes a user from the given view (profile). */
export interface DeleteManagementProfileUserLinksRequest {
  /** Account ID to delete the user link for. */
  accountId: string;
  /** Link ID to delete the user link for. */
  linkId: string;
  /** View (Profile) ID to delete the user link for. */
  profileId: string;
  /** Web Property ID to delete the user link for. */
  webPropertyId: string;
}

export const DeleteManagementProfileUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks/{linkId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementProfileUserLinksRequest>;

export interface DeleteManagementProfileUserLinksResponse {}
export const DeleteManagementProfileUserLinksResponse: Schema.Schema<DeleteManagementProfileUserLinksResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementProfileUserLinksResponse>;

export type DeleteManagementProfileUserLinksError = CommonErrors;

export const deleteManagementProfileUserLinks: API.OperationMethod<DeleteManagementProfileUserLinksRequest, DeleteManagementProfileUserLinksResponse, DeleteManagementProfileUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementProfileUserLinksRequest,
  output: DeleteManagementProfileUserLinksResponse,
  errors: [],
}));

/** Adds a new user to the given view (profile). */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementProfileUserLinksRequest>;

export type InsertManagementProfileUserLinksResponse = EntityUserLink;
export const InsertManagementProfileUserLinksResponse = EntityUserLink;

export type InsertManagementProfileUserLinksError = CommonErrors;

export const insertManagementProfileUserLinks: API.OperationMethod<InsertManagementProfileUserLinksRequest, InsertManagementProfileUserLinksResponse, InsertManagementProfileUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementProfileUserLinksRequest,
  output: InsertManagementProfileUserLinksResponse,
  errors: [],
}));

/** Lists profile-user links for a given view (profile). */
export interface ListManagementProfileUserLinksRequest {
  /** Account ID which the given view (profile) belongs to. */
  accountId: string;
  /** The maximum number of profile-user links to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve the profile-user links for. Can either be a specific profile ID or '~all', which refers to all the profiles that user has access to. */
  profileId: string;
  /** An index of the first profile-user link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web Property ID which the given view (profile) belongs to. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
}

export const ListManagementProfileUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks" }),
  svc,
) as unknown as Schema.Schema<ListManagementProfileUserLinksRequest>;

export type ListManagementProfileUserLinksResponse = EntityUserLinks;
export const ListManagementProfileUserLinksResponse = EntityUserLinks;

export type ListManagementProfileUserLinksError = CommonErrors;

export const listManagementProfileUserLinks: API.OperationMethod<ListManagementProfileUserLinksRequest, ListManagementProfileUserLinksResponse, ListManagementProfileUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementProfileUserLinksRequest,
  output: ListManagementProfileUserLinksResponse,
  errors: [],
}));

/** Updates permissions for an existing user on the given view (profile). */
export interface UpdateManagementProfileUserLinksRequest {
  /** Account ID to update the user link for. */
  accountId: string;
  /** Link ID to update the user link for. */
  linkId: string;
  /** View (Profile ID) to update the user link for. */
  profileId: string;
  /** Web Property ID to update the user link for. */
  webPropertyId: string;
  /** Request body */
  body?: EntityUserLink;
}

export const UpdateManagementProfileUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityUserLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/entityUserLinks/{linkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementProfileUserLinksRequest>;

export type UpdateManagementProfileUserLinksResponse = EntityUserLink;
export const UpdateManagementProfileUserLinksResponse = EntityUserLink;

export type UpdateManagementProfileUserLinksError = CommonErrors;

export const updateManagementProfileUserLinks: API.OperationMethod<UpdateManagementProfileUserLinksRequest, UpdateManagementProfileUserLinksResponse, UpdateManagementProfileUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementProfileUserLinksRequest,
  output: UpdateManagementProfileUserLinksResponse,
  errors: [],
}));

/** Deletes a view (profile). */
export interface DeleteManagementProfilesRequest {
  /** Account ID to delete the view (profile) for. */
  accountId: string;
  /** ID of the view (profile) to be deleted. */
  profileId: string;
  /** Web property ID to delete the view (profile) for. */
  webPropertyId: string;
}

export const DeleteManagementProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementProfilesRequest>;

export interface DeleteManagementProfilesResponse {}
export const DeleteManagementProfilesResponse: Schema.Schema<DeleteManagementProfilesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementProfilesResponse>;

export type DeleteManagementProfilesError = CommonErrors;

export const deleteManagementProfiles: API.OperationMethod<DeleteManagementProfilesRequest, DeleteManagementProfilesResponse, DeleteManagementProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementProfilesRequest,
  output: DeleteManagementProfilesResponse,
  errors: [],
}));

/** Gets a view (profile) to which the user has access. */
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
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementProfilesRequest>;

export type GetManagementProfilesResponse = Profile;
export const GetManagementProfilesResponse = Profile;

export type GetManagementProfilesError = CommonErrors;

export const getManagementProfiles: API.OperationMethod<GetManagementProfilesRequest, GetManagementProfilesResponse, GetManagementProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementProfilesRequest,
  output: GetManagementProfilesResponse,
  errors: [],
}));

/** Create a new view (profile). */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementProfilesRequest>;

export type InsertManagementProfilesResponse = Profile;
export const InsertManagementProfilesResponse = Profile;

export type InsertManagementProfilesError = CommonErrors;

export const insertManagementProfiles: API.OperationMethod<InsertManagementProfilesRequest, InsertManagementProfilesResponse, InsertManagementProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementProfilesRequest,
  output: InsertManagementProfilesResponse,
  errors: [],
}));

/** Lists views (profiles) to which the user has access. */
export interface ListManagementProfilesRequest {
  /** Account ID for the view (profiles) to retrieve. Can either be a specific account ID or '~all', which refers to all the accounts to which the user has access. */
  accountId: string;
  /** The maximum number of views (profiles) to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID for the views (profiles) to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties to which the user has access. */
  webPropertyId: string;
}

export const ListManagementProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles" }),
  svc,
) as unknown as Schema.Schema<ListManagementProfilesRequest>;

export type ListManagementProfilesResponse = Profiles;
export const ListManagementProfilesResponse = Profiles;

export type ListManagementProfilesError = CommonErrors;

export const listManagementProfiles: API.OperationMethod<ListManagementProfilesRequest, ListManagementProfilesResponse, ListManagementProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementProfilesRequest,
  output: ListManagementProfilesResponse,
  errors: [],
}));

/** Updates an existing view (profile). This method supports patch semantics. */
export interface PatchManagementProfilesRequest {
  /** Account ID to which the view (profile) belongs */
  accountId: string;
  /** ID of the view (profile) to be updated. */
  profileId: string;
  /** Web property ID to which the view (profile) belongs */
  webPropertyId: string;
  /** Request body */
  body?: Profile;
}

export const PatchManagementProfilesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Profile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementProfilesRequest>;

export type PatchManagementProfilesResponse = Profile;
export const PatchManagementProfilesResponse = Profile;

export type PatchManagementProfilesError = CommonErrors;

export const patchManagementProfiles: API.OperationMethod<PatchManagementProfilesRequest, PatchManagementProfilesResponse, PatchManagementProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementProfilesRequest,
  output: PatchManagementProfilesResponse,
  errors: [],
}));

/** Updates an existing view (profile). */
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
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementProfilesRequest>;

export type UpdateManagementProfilesResponse = Profile;
export const UpdateManagementProfilesResponse = Profile;

export type UpdateManagementProfilesError = CommonErrors;

export const updateManagementProfiles: API.OperationMethod<UpdateManagementProfilesRequest, UpdateManagementProfilesResponse, UpdateManagementProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementProfilesRequest,
  output: UpdateManagementProfilesResponse,
  errors: [],
}));

/** Delete a remarketing audience. */
export interface DeleteManagementRemarketingAudienceRequest {
  /** Account ID to which the remarketing audience belongs. */
  accountId: string;
  /** The ID of the remarketing audience to delete. */
  remarketingAudienceId: string;
  /** Web property ID to which the remarketing audience belongs. */
  webPropertyId: string;
}

export const DeleteManagementRemarketingAudienceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  remarketingAudienceId: Schema.String.pipe(T.HttpPath("remarketingAudienceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementRemarketingAudienceRequest>;

export interface DeleteManagementRemarketingAudienceResponse {}
export const DeleteManagementRemarketingAudienceResponse: Schema.Schema<DeleteManagementRemarketingAudienceResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementRemarketingAudienceResponse>;

export type DeleteManagementRemarketingAudienceError = CommonErrors;

export const deleteManagementRemarketingAudience: API.OperationMethod<DeleteManagementRemarketingAudienceRequest, DeleteManagementRemarketingAudienceResponse, DeleteManagementRemarketingAudienceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementRemarketingAudienceRequest,
  output: DeleteManagementRemarketingAudienceResponse,
  errors: [],
}));

/** Gets a remarketing audience to which the user has access. */
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
  remarketingAudienceId: Schema.String.pipe(T.HttpPath("remarketingAudienceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementRemarketingAudienceRequest>;

export type GetManagementRemarketingAudienceResponse = RemarketingAudience;
export const GetManagementRemarketingAudienceResponse = RemarketingAudience;

export type GetManagementRemarketingAudienceError = CommonErrors;

export const getManagementRemarketingAudience: API.OperationMethod<GetManagementRemarketingAudienceRequest, GetManagementRemarketingAudienceResponse, GetManagementRemarketingAudienceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementRemarketingAudienceRequest,
  output: GetManagementRemarketingAudienceResponse,
  errors: [],
}));

/** Creates a new remarketing audience. */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementRemarketingAudienceRequest>;

export type InsertManagementRemarketingAudienceResponse = RemarketingAudience;
export const InsertManagementRemarketingAudienceResponse = RemarketingAudience;

export type InsertManagementRemarketingAudienceError = CommonErrors;

export const insertManagementRemarketingAudience: API.OperationMethod<InsertManagementRemarketingAudienceRequest, InsertManagementRemarketingAudienceResponse, InsertManagementRemarketingAudienceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementRemarketingAudienceRequest,
  output: InsertManagementRemarketingAudienceResponse,
  errors: [],
}));

/** Lists remarketing audiences to which the user has access. */
export interface ListManagementRemarketingAudienceRequest {
  /** The account ID of the remarketing audiences to retrieve. */
  accountId: string;
  /** The maximum number of remarketing audiences to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  type?: string;
  /** The web property ID of the remarketing audiences to retrieve. */
  webPropertyId: string;
}

export const ListManagementRemarketingAudienceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences" }),
  svc,
) as unknown as Schema.Schema<ListManagementRemarketingAudienceRequest>;

export type ListManagementRemarketingAudienceResponse = RemarketingAudiences;
export const ListManagementRemarketingAudienceResponse = RemarketingAudiences;

export type ListManagementRemarketingAudienceError = CommonErrors;

export const listManagementRemarketingAudience: API.OperationMethod<ListManagementRemarketingAudienceRequest, ListManagementRemarketingAudienceResponse, ListManagementRemarketingAudienceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementRemarketingAudienceRequest,
  output: ListManagementRemarketingAudienceResponse,
  errors: [],
}));

/** Updates an existing remarketing audience. This method supports patch semantics. */
export interface PatchManagementRemarketingAudienceRequest {
  /** The account ID of the remarketing audience to update. */
  accountId: string;
  /** The ID of the remarketing audience to update. */
  remarketingAudienceId: string;
  /** The web property ID of the remarketing audience to update. */
  webPropertyId: string;
  /** Request body */
  body?: RemarketingAudience;
}

export const PatchManagementRemarketingAudienceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  remarketingAudienceId: Schema.String.pipe(T.HttpPath("remarketingAudienceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(RemarketingAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementRemarketingAudienceRequest>;

export type PatchManagementRemarketingAudienceResponse = RemarketingAudience;
export const PatchManagementRemarketingAudienceResponse = RemarketingAudience;

export type PatchManagementRemarketingAudienceError = CommonErrors;

export const patchManagementRemarketingAudience: API.OperationMethod<PatchManagementRemarketingAudienceRequest, PatchManagementRemarketingAudienceResponse, PatchManagementRemarketingAudienceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementRemarketingAudienceRequest,
  output: PatchManagementRemarketingAudienceResponse,
  errors: [],
}));

/** Updates an existing remarketing audience. */
export interface UpdateManagementRemarketingAudienceRequest {
  /** The account ID of the remarketing audience to update. */
  accountId: string;
  /** The ID of the remarketing audience to update. */
  remarketingAudienceId: string;
  /** The web property ID of the remarketing audience to update. */
  webPropertyId: string;
  /** Request body */
  body?: RemarketingAudience;
}

export const UpdateManagementRemarketingAudienceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  remarketingAudienceId: Schema.String.pipe(T.HttpPath("remarketingAudienceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(RemarketingAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementRemarketingAudienceRequest>;

export type UpdateManagementRemarketingAudienceResponse = RemarketingAudience;
export const UpdateManagementRemarketingAudienceResponse = RemarketingAudience;

export type UpdateManagementRemarketingAudienceError = CommonErrors;

export const updateManagementRemarketingAudience: API.OperationMethod<UpdateManagementRemarketingAudienceRequest, UpdateManagementRemarketingAudienceResponse, UpdateManagementRemarketingAudienceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementRemarketingAudienceRequest,
  output: UpdateManagementRemarketingAudienceResponse,
  errors: [],
}));

/** Lists segments to which the user has access. */
export interface ListManagementSegmentsRequest {
  /** The maximum number of segments to include in this response. */
  "max-results"?: number;
  /** An index of the first segment to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementSegmentsRequest = Schema.Struct({
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "management/segments" }),
  svc,
) as unknown as Schema.Schema<ListManagementSegmentsRequest>;

export type ListManagementSegmentsResponse = Segments;
export const ListManagementSegmentsResponse = Segments;

export type ListManagementSegmentsError = CommonErrors;

export const listManagementSegments: API.OperationMethod<ListManagementSegmentsRequest, ListManagementSegmentsResponse, ListManagementSegmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementSegmentsRequest,
  output: ListManagementSegmentsResponse,
  errors: [],
}));

/** Deletes an unsampled report. */
export interface DeleteManagementUnsampledReportsRequest {
  /** Account ID to delete the unsampled report for. */
  accountId: string;
  /** View (Profile) ID to delete the unsampled report for. */
  profileId: string;
  /** ID of the unsampled report to be deleted. */
  unsampledReportId: string;
  /** Web property ID to delete the unsampled reports for. */
  webPropertyId: string;
}

export const DeleteManagementUnsampledReportsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  unsampledReportId: Schema.String.pipe(T.HttpPath("unsampledReportId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports/{unsampledReportId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementUnsampledReportsRequest>;

export interface DeleteManagementUnsampledReportsResponse {}
export const DeleteManagementUnsampledReportsResponse: Schema.Schema<DeleteManagementUnsampledReportsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementUnsampledReportsResponse>;

export type DeleteManagementUnsampledReportsError = CommonErrors;

export const deleteManagementUnsampledReports: API.OperationMethod<DeleteManagementUnsampledReportsRequest, DeleteManagementUnsampledReportsResponse, DeleteManagementUnsampledReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementUnsampledReportsRequest,
  output: DeleteManagementUnsampledReportsResponse,
  errors: [],
}));

/** Returns a single unsampled report. */
export interface GetManagementUnsampledReportsRequest {
  /** Account ID to retrieve unsampled report for. */
  accountId: string;
  /** View (Profile) ID to retrieve unsampled report for. */
  profileId: string;
  /** ID of the unsampled report to retrieve. */
  unsampledReportId: string;
  /** Web property ID to retrieve unsampled reports for. */
  webPropertyId: string;
}

export const GetManagementUnsampledReportsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  unsampledReportId: Schema.String.pipe(T.HttpPath("unsampledReportId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports/{unsampledReportId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementUnsampledReportsRequest>;

export type GetManagementUnsampledReportsResponse = UnsampledReport;
export const GetManagementUnsampledReportsResponse = UnsampledReport;

export type GetManagementUnsampledReportsError = CommonErrors;

export const getManagementUnsampledReports: API.OperationMethod<GetManagementUnsampledReportsRequest, GetManagementUnsampledReportsResponse, GetManagementUnsampledReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementUnsampledReportsRequest,
  output: GetManagementUnsampledReportsResponse,
  errors: [],
}));

/** Create a new unsampled report. */
export interface InsertManagementUnsampledReportsRequest {
  /** Account ID to create the unsampled report for. */
  accountId: string;
  /** View (Profile) ID to create the unsampled report for. */
  profileId: string;
  /** Web property ID to create the unsampled report for. */
  webPropertyId: string;
  /** Request body */
  body?: UnsampledReport;
}

export const InsertManagementUnsampledReportsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(UnsampledReport).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementUnsampledReportsRequest>;

export type InsertManagementUnsampledReportsResponse = UnsampledReport;
export const InsertManagementUnsampledReportsResponse = UnsampledReport;

export type InsertManagementUnsampledReportsError = CommonErrors;

export const insertManagementUnsampledReports: API.OperationMethod<InsertManagementUnsampledReportsRequest, InsertManagementUnsampledReportsResponse, InsertManagementUnsampledReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementUnsampledReportsRequest,
  output: InsertManagementUnsampledReportsResponse,
  errors: [],
}));

/** Lists unsampled reports to which the user has access. */
export interface ListManagementUnsampledReportsRequest {
  /** Account ID to retrieve unsampled reports for. Must be a specific account ID, ~all is not supported. */
  accountId: string;
  /** The maximum number of unsampled reports to include in this response. */
  "max-results"?: number;
  /** View (Profile) ID to retrieve unsampled reports for. Must be a specific view (profile) ID, ~all is not supported. */
  profileId: string;
  /** An index of the first unsampled report to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID to retrieve unsampled reports for. Must be a specific web property ID, ~all is not supported. */
  webPropertyId: string;
}

export const ListManagementUnsampledReportsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports" }),
  svc,
) as unknown as Schema.Schema<ListManagementUnsampledReportsRequest>;

export type ListManagementUnsampledReportsResponse = UnsampledReports;
export const ListManagementUnsampledReportsResponse = UnsampledReports;

export type ListManagementUnsampledReportsError = CommonErrors;

export const listManagementUnsampledReports: API.OperationMethod<ListManagementUnsampledReportsRequest, ListManagementUnsampledReportsResponse, ListManagementUnsampledReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementUnsampledReportsRequest,
  output: ListManagementUnsampledReportsResponse,
  errors: [],
}));

/** Delete data associated with a previous upload. */
export interface DeleteUploadDataManagementUploadsRequest {
  /** Account Id for the uploads to be deleted. */
  accountId: string;
  /** Custom data source Id for the uploads to be deleted. */
  customDataSourceId: string;
  /** Web property Id for the uploads to be deleted. */
  webPropertyId: string;
  /** Request body */
  body?: AnalyticsDataimportDeleteUploadDataRequest;
}

export const DeleteUploadDataManagementUploadsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(AnalyticsDataimportDeleteUploadDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/deleteUploadData", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteUploadDataManagementUploadsRequest>;

export interface DeleteUploadDataManagementUploadsResponse {}
export const DeleteUploadDataManagementUploadsResponse: Schema.Schema<DeleteUploadDataManagementUploadsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUploadDataManagementUploadsResponse>;

export type DeleteUploadDataManagementUploadsError = CommonErrors;

export const deleteUploadDataManagementUploads: API.OperationMethod<DeleteUploadDataManagementUploadsRequest, DeleteUploadDataManagementUploadsResponse, DeleteUploadDataManagementUploadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUploadDataManagementUploadsRequest,
  output: DeleteUploadDataManagementUploadsResponse,
  errors: [],
}));

/** List uploads to which the user has access. */
export interface GetManagementUploadsRequest {
  /** Account Id for the upload to retrieve. */
  accountId: string;
  /** Custom data source Id for upload to retrieve. */
  customDataSourceId: string;
  /** Upload Id to retrieve. */
  uploadId: string;
  /** Web property Id for the upload to retrieve. */
  webPropertyId: string;
}

export const GetManagementUploadsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  uploadId: Schema.String.pipe(T.HttpPath("uploadId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads/{uploadId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementUploadsRequest>;

export type GetManagementUploadsResponse = Upload;
export const GetManagementUploadsResponse = Upload;

export type GetManagementUploadsError = CommonErrors;

export const getManagementUploads: API.OperationMethod<GetManagementUploadsRequest, GetManagementUploadsResponse, GetManagementUploadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementUploadsRequest,
  output: GetManagementUploadsResponse,
  errors: [],
}));

/** List uploads to which the user has access. */
export interface ListManagementUploadsRequest {
  /** Account Id for the uploads to retrieve. */
  accountId: string;
  /** Custom data source Id for uploads to retrieve. */
  customDataSourceId: string;
  /** The maximum number of uploads to include in this response. */
  "max-results"?: number;
  /** A 1-based index of the first upload to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property Id for the uploads to retrieve. */
  webPropertyId: string;
}

export const ListManagementUploadsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads" }),
  svc,
) as unknown as Schema.Schema<ListManagementUploadsRequest>;

export type ListManagementUploadsResponse = Uploads;
export const ListManagementUploadsResponse = Uploads;

export type ListManagementUploadsError = CommonErrors;

export const listManagementUploads: API.OperationMethod<ListManagementUploadsRequest, ListManagementUploadsResponse, ListManagementUploadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementUploadsRequest,
  output: ListManagementUploadsResponse,
  errors: [],
}));

/** Upload data for a custom data source. */
export interface UploadDataManagementUploadsRequest {
  /** Account Id associated with the upload. */
  accountId: string;
  /** Custom data source Id to which the data being uploaded belongs. */
  customDataSourceId: string;
  /** Web property UA-string associated with the upload. */
  webPropertyId: string;
}

export const UploadDataManagementUploadsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  customDataSourceId: Schema.String.pipe(T.HttpPath("customDataSourceId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadDataManagementUploadsRequest>;

export type UploadDataManagementUploadsResponse = Upload;
export const UploadDataManagementUploadsResponse = Upload;

export type UploadDataManagementUploadsError = CommonErrors;

export const uploadDataManagementUploads: API.OperationMethod<UploadDataManagementUploadsRequest, UploadDataManagementUploadsResponse, UploadDataManagementUploadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadDataManagementUploadsRequest,
  output: UploadDataManagementUploadsResponse,
  errors: [],
}));

/** Deletes a web property-Google Ads link. */
export interface DeleteManagementWebPropertyAdWordsLinksRequest {
  /** ID of the account which the given web property belongs to. */
  accountId: string;
  /** Web property Google Ads link ID. */
  webPropertyAdWordsLinkId: string;
  /** Web property ID to delete the Google Ads link for. */
  webPropertyId: string;
}

export const DeleteManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyAdWordsLinkId: Schema.String.pipe(T.HttpPath("webPropertyAdWordsLinkId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementWebPropertyAdWordsLinksRequest>;

export interface DeleteManagementWebPropertyAdWordsLinksResponse {}
export const DeleteManagementWebPropertyAdWordsLinksResponse: Schema.Schema<DeleteManagementWebPropertyAdWordsLinksResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementWebPropertyAdWordsLinksResponse>;

export type DeleteManagementWebPropertyAdWordsLinksError = CommonErrors;

export const deleteManagementWebPropertyAdWordsLinks: API.OperationMethod<DeleteManagementWebPropertyAdWordsLinksRequest, DeleteManagementWebPropertyAdWordsLinksResponse, DeleteManagementWebPropertyAdWordsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementWebPropertyAdWordsLinksRequest,
  output: DeleteManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

/** Returns a web property-Google Ads link to which the user has access. */
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
  webPropertyAdWordsLinkId: Schema.String.pipe(T.HttpPath("webPropertyAdWordsLinkId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementWebPropertyAdWordsLinksRequest>;

export type GetManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const GetManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;

export type GetManagementWebPropertyAdWordsLinksError = CommonErrors;

export const getManagementWebPropertyAdWordsLinks: API.OperationMethod<GetManagementWebPropertyAdWordsLinksRequest, GetManagementWebPropertyAdWordsLinksResponse, GetManagementWebPropertyAdWordsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementWebPropertyAdWordsLinksRequest,
  output: GetManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

/** Creates a webProperty-Google Ads link. */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementWebPropertyAdWordsLinksRequest>;

export type InsertManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const InsertManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;

export type InsertManagementWebPropertyAdWordsLinksError = CommonErrors;

export const insertManagementWebPropertyAdWordsLinks: API.OperationMethod<InsertManagementWebPropertyAdWordsLinksRequest, InsertManagementWebPropertyAdWordsLinksResponse, InsertManagementWebPropertyAdWordsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementWebPropertyAdWordsLinksRequest,
  output: InsertManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

/** Lists webProperty-Google Ads links for a given web property. */
export interface ListManagementWebPropertyAdWordsLinksRequest {
  /** ID of the account which the given web property belongs to. */
  accountId: string;
  /** The maximum number of webProperty-Google Ads links to include in this response. */
  "max-results"?: number;
  /** An index of the first webProperty-Google Ads link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web property ID to retrieve the Google Ads links for. */
  webPropertyId: string;
}

export const ListManagementWebPropertyAdWordsLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks" }),
  svc,
) as unknown as Schema.Schema<ListManagementWebPropertyAdWordsLinksRequest>;

export type ListManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLinks;
export const ListManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLinks;

export type ListManagementWebPropertyAdWordsLinksError = CommonErrors;

export const listManagementWebPropertyAdWordsLinks: API.OperationMethod<ListManagementWebPropertyAdWordsLinksRequest, ListManagementWebPropertyAdWordsLinksResponse, ListManagementWebPropertyAdWordsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementWebPropertyAdWordsLinksRequest,
  output: ListManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

/** Updates an existing webProperty-Google Ads link. This method supports patch semantics. */
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
  webPropertyAdWordsLinkId: Schema.String.pipe(T.HttpPath("webPropertyAdWordsLinkId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityAdWordsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementWebPropertyAdWordsLinksRequest>;

export type PatchManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const PatchManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;

export type PatchManagementWebPropertyAdWordsLinksError = CommonErrors;

export const patchManagementWebPropertyAdWordsLinks: API.OperationMethod<PatchManagementWebPropertyAdWordsLinksRequest, PatchManagementWebPropertyAdWordsLinksResponse, PatchManagementWebPropertyAdWordsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementWebPropertyAdWordsLinksRequest,
  output: PatchManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

/** Updates an existing webProperty-Google Ads link. */
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
  webPropertyAdWordsLinkId: Schema.String.pipe(T.HttpPath("webPropertyAdWordsLinkId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(EntityAdWordsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementWebPropertyAdWordsLinksRequest>;

export type UpdateManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;
export const UpdateManagementWebPropertyAdWordsLinksResponse = EntityAdWordsLink;

export type UpdateManagementWebPropertyAdWordsLinksError = CommonErrors;

export const updateManagementWebPropertyAdWordsLinks: API.OperationMethod<UpdateManagementWebPropertyAdWordsLinksRequest, UpdateManagementWebPropertyAdWordsLinksResponse, UpdateManagementWebPropertyAdWordsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementWebPropertyAdWordsLinksRequest,
  output: UpdateManagementWebPropertyAdWordsLinksResponse,
  errors: [],
}));

/** Gets a web property to which the user has access. */
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
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}" }),
  svc,
) as unknown as Schema.Schema<GetManagementWebpropertiesRequest>;

export type GetManagementWebpropertiesResponse = Webproperty;
export const GetManagementWebpropertiesResponse = Webproperty;

export type GetManagementWebpropertiesError = CommonErrors;

export const getManagementWebproperties: API.OperationMethod<GetManagementWebpropertiesRequest, GetManagementWebpropertiesResponse, GetManagementWebpropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagementWebpropertiesRequest,
  output: GetManagementWebpropertiesResponse,
  errors: [],
}));

/** Create a new property if the account has fewer than 20 properties. Web properties are visible in the Google Analytics interface only if they have at least one profile. */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementWebpropertiesRequest>;

export type InsertManagementWebpropertiesResponse = Webproperty;
export const InsertManagementWebpropertiesResponse = Webproperty;

export type InsertManagementWebpropertiesError = CommonErrors;

export const insertManagementWebproperties: API.OperationMethod<InsertManagementWebpropertiesRequest, InsertManagementWebpropertiesResponse, InsertManagementWebpropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementWebpropertiesRequest,
  output: InsertManagementWebpropertiesResponse,
  errors: [],
}));

/** Lists web properties to which the user has access. */
export interface ListManagementWebpropertiesRequest {
  /** Account ID to retrieve web properties for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to. */
  accountId: string;
  /** The maximum number of web properties to include in this response. */
  "max-results"?: number;
  /** An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
}

export const ListManagementWebpropertiesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties" }),
  svc,
) as unknown as Schema.Schema<ListManagementWebpropertiesRequest>;

export type ListManagementWebpropertiesResponse = Webproperties;
export const ListManagementWebpropertiesResponse = Webproperties;

export type ListManagementWebpropertiesError = CommonErrors;

export const listManagementWebproperties: API.OperationMethod<ListManagementWebpropertiesRequest, ListManagementWebpropertiesResponse, ListManagementWebpropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementWebpropertiesRequest,
  output: ListManagementWebpropertiesResponse,
  errors: [],
}));

/** Updates an existing web property. This method supports patch semantics. */
export interface PatchManagementWebpropertiesRequest {
  /** Account ID to which the web property belongs */
  accountId: string;
  /** Web property ID */
  webPropertyId: string;
  /** Request body */
  body?: Webproperty;
}

export const PatchManagementWebpropertiesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Webproperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "management/accounts/{accountId}/webproperties/{webPropertyId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchManagementWebpropertiesRequest>;

export type PatchManagementWebpropertiesResponse = Webproperty;
export const PatchManagementWebpropertiesResponse = Webproperty;

export type PatchManagementWebpropertiesError = CommonErrors;

export const patchManagementWebproperties: API.OperationMethod<PatchManagementWebpropertiesRequest, PatchManagementWebpropertiesResponse, PatchManagementWebpropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchManagementWebpropertiesRequest,
  output: PatchManagementWebpropertiesResponse,
  errors: [],
}));

/** Updates an existing web property. */
export interface UpdateManagementWebpropertiesRequest {
  /** Account ID to which the web property belongs */
  accountId: string;
  /** Web property ID */
  webPropertyId: string;
  /** Request body */
  body?: Webproperty;
}

export const UpdateManagementWebpropertiesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
  body: Schema.optional(Webproperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementWebpropertiesRequest>;

export type UpdateManagementWebpropertiesResponse = Webproperty;
export const UpdateManagementWebpropertiesResponse = Webproperty;

export type UpdateManagementWebpropertiesError = CommonErrors;

export const updateManagementWebproperties: API.OperationMethod<UpdateManagementWebpropertiesRequest, UpdateManagementWebpropertiesResponse, UpdateManagementWebpropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementWebpropertiesRequest,
  output: UpdateManagementWebpropertiesResponse,
  errors: [],
}));

/** Removes a user from the given web property. */
export interface DeleteManagementWebpropertyUserLinksRequest {
  /** Account ID to delete the user link for. */
  accountId: string;
  /** Link ID to delete the user link for. */
  linkId: string;
  /** Web Property ID to delete the user link for. */
  webPropertyId: string;
}

export const DeleteManagementWebpropertyUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  linkId: Schema.String.pipe(T.HttpPath("linkId")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks/{linkId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagementWebpropertyUserLinksRequest>;

export interface DeleteManagementWebpropertyUserLinksResponse {}
export const DeleteManagementWebpropertyUserLinksResponse: Schema.Schema<DeleteManagementWebpropertyUserLinksResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagementWebpropertyUserLinksResponse>;

export type DeleteManagementWebpropertyUserLinksError = CommonErrors;

export const deleteManagementWebpropertyUserLinks: API.OperationMethod<DeleteManagementWebpropertyUserLinksRequest, DeleteManagementWebpropertyUserLinksResponse, DeleteManagementWebpropertyUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagementWebpropertyUserLinksRequest,
  output: DeleteManagementWebpropertyUserLinksResponse,
  errors: [],
}));

/** Adds a new user to the given web property. */
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
  T.Http({ method: "POST", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertManagementWebpropertyUserLinksRequest>;

export type InsertManagementWebpropertyUserLinksResponse = EntityUserLink;
export const InsertManagementWebpropertyUserLinksResponse = EntityUserLink;

export type InsertManagementWebpropertyUserLinksError = CommonErrors;

export const insertManagementWebpropertyUserLinks: API.OperationMethod<InsertManagementWebpropertyUserLinksRequest, InsertManagementWebpropertyUserLinksResponse, InsertManagementWebpropertyUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertManagementWebpropertyUserLinksRequest,
  output: InsertManagementWebpropertyUserLinksResponse,
  errors: [],
}));

/** Lists webProperty-user links for a given web property. */
export interface ListManagementWebpropertyUserLinksRequest {
  /** Account ID which the given web property belongs to. */
  accountId: string;
  /** The maximum number of webProperty-user Links to include in this response. */
  "max-results"?: number;
  /** An index of the first webProperty-user link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter. */
  "start-index"?: number;
  /** Web Property ID for the webProperty-user links to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to. */
  webPropertyId: string;
}

export const ListManagementWebpropertyUserLinksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  "max-results": Schema.optional(Schema.Number).pipe(T.HttpQuery("max-results")),
  "start-index": Schema.optional(Schema.Number).pipe(T.HttpQuery("start-index")),
  webPropertyId: Schema.String.pipe(T.HttpPath("webPropertyId")),
}).pipe(
  T.Http({ method: "GET", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks" }),
  svc,
) as unknown as Schema.Schema<ListManagementWebpropertyUserLinksRequest>;

export type ListManagementWebpropertyUserLinksResponse = EntityUserLinks;
export const ListManagementWebpropertyUserLinksResponse = EntityUserLinks;

export type ListManagementWebpropertyUserLinksError = CommonErrors;

export const listManagementWebpropertyUserLinks: API.OperationMethod<ListManagementWebpropertyUserLinksRequest, ListManagementWebpropertyUserLinksResponse, ListManagementWebpropertyUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagementWebpropertyUserLinksRequest,
  output: ListManagementWebpropertyUserLinksResponse,
  errors: [],
}));

/** Updates permissions for an existing user on the given web property. */
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
  T.Http({ method: "PUT", path: "management/accounts/{accountId}/webproperties/{webPropertyId}/entityUserLinks/{linkId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagementWebpropertyUserLinksRequest>;

export type UpdateManagementWebpropertyUserLinksResponse = EntityUserLink;
export const UpdateManagementWebpropertyUserLinksResponse = EntityUserLink;

export type UpdateManagementWebpropertyUserLinksError = CommonErrors;

export const updateManagementWebpropertyUserLinks: API.OperationMethod<UpdateManagementWebpropertyUserLinksRequest, UpdateManagementWebpropertyUserLinksResponse, UpdateManagementWebpropertyUserLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagementWebpropertyUserLinksRequest,
  output: UpdateManagementWebpropertyUserLinksResponse,
  errors: [],
}));

/** Lists all columns for a report type */
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

export type ListMetadataColumnsError = CommonErrors;

export const listMetadataColumns: API.OperationMethod<ListMetadataColumnsRequest, ListMetadataColumnsResponse, ListMetadataColumnsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListMetadataColumnsRequest,
  output: ListMetadataColumnsResponse,
  errors: [],
}));

/** Creates an account ticket. */
export interface CreateAccountTicketProvisioningRequest {
  /** Request body */
  body?: AccountTicket;
}

export const CreateAccountTicketProvisioningRequest = Schema.Struct({
  body: Schema.optional(AccountTicket).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "provisioning/createAccountTicket", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountTicketProvisioningRequest>;

export type CreateAccountTicketProvisioningResponse = AccountTicket;
export const CreateAccountTicketProvisioningResponse = AccountTicket;

export type CreateAccountTicketProvisioningError = CommonErrors;

export const createAccountTicketProvisioning: API.OperationMethod<CreateAccountTicketProvisioningRequest, CreateAccountTicketProvisioningResponse, CreateAccountTicketProvisioningError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountTicketProvisioningRequest,
  output: CreateAccountTicketProvisioningResponse,
  errors: [],
}));

/** Provision account. */
export interface CreateAccountTreeProvisioningRequest {
  /** Request body */
  body?: AccountTreeRequest;
}

export const CreateAccountTreeProvisioningRequest = Schema.Struct({
  body: Schema.optional(AccountTreeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "provisioning/createAccountTree", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountTreeProvisioningRequest>;

export type CreateAccountTreeProvisioningResponse = AccountTreeResponse;
export const CreateAccountTreeProvisioningResponse = AccountTreeResponse;

export type CreateAccountTreeProvisioningError = CommonErrors;

export const createAccountTreeProvisioning: API.OperationMethod<CreateAccountTreeProvisioningRequest, CreateAccountTreeProvisioningResponse, CreateAccountTreeProvisioningError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountTreeProvisioningRequest,
  output: CreateAccountTreeProvisioningResponse,
  errors: [],
}));

/** Insert or update a user deletion requests. */
export interface UpsertUserDeletionUserDeletionRequestRequest {
  /** Request body */
  body?: UserDeletionRequest;
}

export const UpsertUserDeletionUserDeletionRequestRequest = Schema.Struct({
  body: Schema.optional(UserDeletionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "userDeletion/userDeletionRequests:upsert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpsertUserDeletionUserDeletionRequestRequest>;

export type UpsertUserDeletionUserDeletionRequestResponse = UserDeletionRequest;
export const UpsertUserDeletionUserDeletionRequestResponse = UserDeletionRequest;

export type UpsertUserDeletionUserDeletionRequestError = CommonErrors;

export const upsertUserDeletionUserDeletionRequest: API.OperationMethod<UpsertUserDeletionUserDeletionRequestRequest, UpsertUserDeletionUserDeletionRequestResponse, UpsertUserDeletionUserDeletionRequestError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpsertUserDeletionUserDeletionRequestRequest,
  output: UpsertUserDeletionUserDeletionRequestResponse,
  errors: [],
}));

