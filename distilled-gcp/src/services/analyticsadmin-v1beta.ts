// ==========================================================================
// Google Analytics Admin API (analyticsadmin v1beta)
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
  name: "analyticsadmin",
  version: "v1beta",
  rootUrl: "https://analyticsadmin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAnalyticsAdminV1betaAccount {
  /** Output only. Resource name of this account. Format: accounts/{account} Example: "accounts/100" */
  name?: string;
  /** Output only. Time when this account was originally created. */
  createTime?: string;
  /** Output only. Time when account payload fields were last updated. */
  updateTime?: string;
  /** Required. Human-readable display name for this account. */
  displayName?: string;
  /** Country of business. Must be a Unicode CLDR region code. */
  regionCode?: string;
  /** Output only. Indicates whether this Account is soft-deleted or not. Deleted accounts are excluded from List results unless specifically requested. */
  deleted?: boolean;
  /** Output only. The URI for a Google Marketing Platform organization resource. Only set when this account is connected to a GMP organization. Format: marketingplatformadmin.googleapis.com/organizations/{org_id} */
  gmpOrganization?: string;
}

export const GoogleAnalyticsAdminV1betaAccount: Schema.Schema<GoogleAnalyticsAdminV1betaAccount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  gmpOrganization: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccount" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccount>;

export interface GoogleAnalyticsAdminV1betaListAccountsResponse {
  /** Results that were accessible to the caller. */
  accounts?: Array<GoogleAnalyticsAdminV1betaAccount>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListAccountsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListAccountsResponse> = Schema.suspend(() => Schema.Struct({
  accounts: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccount)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListAccountsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListAccountsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest {
  /** The account to create. */
  account?: GoogleAnalyticsAdminV1betaAccount;
  /** Redirect URI where the user will be sent after accepting Terms of Service. Must be configured in Cloud Console as a Redirect URI. */
  redirectUri?: string;
}

export const GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest: Schema.Schema<GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(GoogleAnalyticsAdminV1betaAccount),
  redirectUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest>;

export interface GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse {
  /** The param to be passed in the ToS link. */
  accountTicketId?: string;
}

export const GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse: Schema.Schema<GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse> = Schema.suspend(() => Schema.Struct({
  accountTicketId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse>;

export interface GoogleAnalyticsAdminV1betaPropertySummary {
  /** Resource name of property referred to by this property summary Format: properties/{property_id} Example: "properties/1000" */
  property?: string;
  /** Display name for the property referred to in this property summary. */
  displayName?: string;
  /** The property's property type. */
  propertyType?: "PROPERTY_TYPE_UNSPECIFIED" | "PROPERTY_TYPE_ORDINARY" | "PROPERTY_TYPE_SUBPROPERTY" | "PROPERTY_TYPE_ROLLUP" | (string & {});
  /** Resource name of this property's logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/200" */
  parent?: string;
}

export const GoogleAnalyticsAdminV1betaPropertySummary: Schema.Schema<GoogleAnalyticsAdminV1betaPropertySummary> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  propertyType: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaPropertySummary" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaPropertySummary>;

export interface GoogleAnalyticsAdminV1betaAccountSummary {
  /** Resource name for this account summary. Format: accountSummaries/{account_id} Example: "accountSummaries/1000" */
  name?: string;
  /** Resource name of account referred to by this account summary Format: accounts/{account_id} Example: "accounts/1000" */
  account?: string;
  /** Display name for the account referred to in this account summary. */
  displayName?: string;
  /** List of summaries for child accounts of this account. */
  propertySummaries?: Array<GoogleAnalyticsAdminV1betaPropertySummary>;
}

export const GoogleAnalyticsAdminV1betaAccountSummary: Schema.Schema<GoogleAnalyticsAdminV1betaAccountSummary> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  propertySummaries: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaPropertySummary)),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccountSummary" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccountSummary>;

export interface GoogleAnalyticsAdminV1betaListAccountSummariesResponse {
  /** Account summaries of all accounts the caller has access to. */
  accountSummaries?: Array<GoogleAnalyticsAdminV1betaAccountSummary>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListAccountSummariesResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListAccountSummariesResponse> = Schema.suspend(() => Schema.Struct({
  accountSummaries: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccountSummary)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListAccountSummariesResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListAccountSummariesResponse>;

export interface GoogleAnalyticsAdminV1betaProperty {
  /** Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000" */
  name?: string;
  /** Immutable. The property type for this Property resource. When creating a property, if the type is "PROPERTY_TYPE_UNSPECIFIED", then "ORDINARY_PROPERTY" will be implied. */
  propertyType?: "PROPERTY_TYPE_UNSPECIFIED" | "PROPERTY_TYPE_ORDINARY" | "PROPERTY_TYPE_SUBPROPERTY" | "PROPERTY_TYPE_ROLLUP" | (string & {});
  /** Output only. Time when the entity was originally created. */
  createTime?: string;
  /** Output only. Time when entity payload fields were last updated. */
  updateTime?: string;
  /** Immutable. Resource name of this property's logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/101" */
  parent?: string;
  /** Required. Human-readable display name for this property. The max allowed display name length is 100 UTF-16 code units. */
  displayName?: string;
  /** Industry associated with this property Example: AUTOMOTIVE, FOOD_AND_DRINK */
  industryCategory?: "INDUSTRY_CATEGORY_UNSPECIFIED" | "AUTOMOTIVE" | "BUSINESS_AND_INDUSTRIAL_MARKETS" | "FINANCE" | "HEALTHCARE" | "TECHNOLOGY" | "TRAVEL" | "OTHER" | "ARTS_AND_ENTERTAINMENT" | "BEAUTY_AND_FITNESS" | "BOOKS_AND_LITERATURE" | "FOOD_AND_DRINK" | "GAMES" | "HOBBIES_AND_LEISURE" | "HOME_AND_GARDEN" | "INTERNET_AND_TELECOM" | "LAW_AND_GOVERNMENT" | "NEWS" | "ONLINE_COMMUNITIES" | "PEOPLE_AND_SOCIETY" | "PETS_AND_ANIMALS" | "REAL_ESTATE" | "REFERENCE" | "SCIENCE" | "SPORTS" | "JOBS_AND_EDUCATION" | "SHOPPING" | (string & {});
  /** Required. Reporting Time Zone, used as the day boundary for reports, regardless of where the data originates. If the time zone honors DST, Analytics will automatically adjust for the changes. NOTE: Changing the time zone only affects data going forward, and is not applied retroactively. Format: https://www.iana.org/time-zones Example: "America/Los_Angeles" */
  timeZone?: string;
  /** The currency type used in reports involving monetary values. Format: https://en.wikipedia.org/wiki/ISO_4217 Examples: "USD", "EUR", "JPY" */
  currencyCode?: string;
  /** Output only. The Google Analytics service level that applies to this property. */
  serviceLevel?: "SERVICE_LEVEL_UNSPECIFIED" | "GOOGLE_ANALYTICS_STANDARD" | "GOOGLE_ANALYTICS_360" | (string & {});
  /** Output only. If set, the time at which this property was trashed. If not set, then this property is not currently in the trash can. */
  deleteTime?: string;
  /** Output only. If set, the time at which this trashed property will be permanently deleted. If not set, then this property is not currently in the trash can and is not slated to be deleted. */
  expireTime?: string;
  /** Immutable. The resource name of the parent account Format: accounts/{account_id} Example: "accounts/123" */
  account?: string;
}

export const GoogleAnalyticsAdminV1betaProperty: Schema.Schema<GoogleAnalyticsAdminV1betaProperty> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  propertyType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  industryCategory: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  serviceLevel: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaProperty" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaProperty>;

export interface GoogleAnalyticsAdminV1betaListPropertiesResponse {
  /** Results that matched the filter criteria and were accessible to the caller. */
  properties?: Array<GoogleAnalyticsAdminV1betaProperty>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListPropertiesResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListPropertiesResponse> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaProperty)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListPropertiesResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListPropertiesResponse>;

export interface GoogleAnalyticsAdminV1betaFirebaseLink {
  /** Output only. Example format: properties/1234/firebaseLinks/5678 */
  name?: string;
  /** Immutable. Firebase project resource name. When creating a FirebaseLink, you may provide this resource name using either a project number or project ID. Once this resource has been created, returned FirebaseLinks will always have a project_name that contains a project number. Format: 'projects/{project number}' Example: 'projects/1234' */
  project?: string;
  /** Output only. Time when this FirebaseLink was originally created. */
  createTime?: string;
}

export const GoogleAnalyticsAdminV1betaFirebaseLink: Schema.Schema<GoogleAnalyticsAdminV1betaFirebaseLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaFirebaseLink" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaFirebaseLink>;

export interface GoogleAnalyticsAdminV1betaListFirebaseLinksResponse {
  /** List of FirebaseLinks. This will have at most one value. */
  firebaseLinks?: Array<GoogleAnalyticsAdminV1betaFirebaseLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. Currently, Google Analytics supports only one FirebaseLink per property, so this will never be populated. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListFirebaseLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListFirebaseLinksResponse> = Schema.suspend(() => Schema.Struct({
  firebaseLinks: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaFirebaseLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListFirebaseLinksResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListFirebaseLinksResponse>;

export interface GoogleAnalyticsAdminV1betaGoogleAdsLink {
  /** Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID. */
  name?: string;
  /** Immutable. Google Ads customer ID. */
  customerId?: string;
  /** Output only. If true, this link is for a Google Ads manager account. */
  canManageClients?: boolean;
  /** Enable personalized advertising features with this integration. Automatically publish my Google Analytics audience lists and Google Analytics remarketing events/parameters to the linked Google Ads account. If this field is not set on create/update, it will be defaulted to true. */
  adsPersonalizationEnabled?: boolean;
  /** Output only. Time when this link was originally created. */
  createTime?: string;
  /** Output only. Time when this link was last updated. */
  updateTime?: string;
  /** Output only. Email address of the user that created the link. An empty string will be returned if the email address can't be retrieved. */
  creatorEmailAddress?: string;
}

export const GoogleAnalyticsAdminV1betaGoogleAdsLink: Schema.Schema<GoogleAnalyticsAdminV1betaGoogleAdsLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  canManageClients: Schema.optional(Schema.Boolean),
  adsPersonalizationEnabled: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  creatorEmailAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaGoogleAdsLink" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaGoogleAdsLink>;

export interface GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse {
  /** List of GoogleAdsLinks. */
  googleAdsLinks?: Array<GoogleAnalyticsAdminV1betaGoogleAdsLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse> = Schema.suspend(() => Schema.Struct({
  googleAdsLinks: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaGoogleAdsLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse>;

export interface GoogleAnalyticsAdminV1betaDataSharingSettings {
  /** Output only. Resource name. Format: accounts/{account}/dataSharingSettings Example: "accounts/1000/dataSharingSettings" */
  name?: string;
  /** Allows Google technical support representatives access to your Google Analytics data and account when necessary to provide service and find solutions to technical issues. This field maps to the "Technical support" field in the Google Analytics Admin UI. */
  sharingWithGoogleSupportEnabled?: boolean;
  /** Allows Google access to your Google Analytics account data, including account usage and configuration data, product spending, and users associated with your Google Analytics account, so that Google can help you make the most of Google products, providing you with insights, offers, recommendations, and optimization tips across Google Analytics and other Google products for business. This field maps to the "Recommendations for your business" field in the Google Analytics Admin UI. */
  sharingWithGoogleAssignedSalesEnabled?: boolean;
  /** Deprecated. This field is no longer used and always returns false. */
  sharingWithGoogleAnySalesEnabled?: boolean;
  /** Allows Google to use the data to improve other Google products or services. This fields maps to the "Google products & services" field in the Google Analytics Admin UI. */
  sharingWithGoogleProductsEnabled?: boolean;
  /** Enable features like predictions, modeled data, and benchmarking that can provide you with richer business insights when you contribute aggregated measurement data. The data you share (including information about the property from which it is shared) is aggregated and de-identified before being used to generate business insights. This field maps to the "Modeling contributions & business insights" field in the Google Analytics Admin UI. */
  sharingWithOthersEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1betaDataSharingSettings: Schema.Schema<GoogleAnalyticsAdminV1betaDataSharingSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sharingWithGoogleSupportEnabled: Schema.optional(Schema.Boolean),
  sharingWithGoogleAssignedSalesEnabled: Schema.optional(Schema.Boolean),
  sharingWithGoogleAnySalesEnabled: Schema.optional(Schema.Boolean),
  sharingWithGoogleProductsEnabled: Schema.optional(Schema.Boolean),
  sharingWithOthersEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaDataSharingSettings" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaDataSharingSettings>;

export interface GoogleAnalyticsAdminV1betaMeasurementProtocolSecret {
  /** Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name?: string;
  /** Required. Human-readable display name for this secret. */
  displayName?: string;
  /** Output only. The measurement protocol secret value. Pass this value to the api_secret field of the Measurement Protocol API when sending hits to this secret's parent property. */
  secretValue?: string;
}

export const GoogleAnalyticsAdminV1betaMeasurementProtocolSecret: Schema.Schema<GoogleAnalyticsAdminV1betaMeasurementProtocolSecret> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  secretValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaMeasurementProtocolSecret" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaMeasurementProtocolSecret>;

export interface GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse {
  /** A list of secrets for the parent stream specified in the request. */
  measurementProtocolSecrets?: Array<GoogleAnalyticsAdminV1betaMeasurementProtocolSecret>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse> = Schema.suspend(() => Schema.Struct({
  measurementProtocolSecrets: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaMeasurementProtocolSecret)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse>;

export interface GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest {
  /** Required. An acknowledgement that the caller of this method understands the terms of user data collection. This field must contain the exact value: "I acknowledge that I have the necessary privacy disclosures and rights from my end users for the collection and processing of their data, including the association of such data with the visitation information Google Analytics collects from my site and/or app property." */
  acknowledgement?: string;
}

export const GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest: Schema.Schema<GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest> = Schema.suspend(() => Schema.Struct({
  acknowledgement: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest>;

export interface GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse {
}

export const GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse: Schema.Schema<GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse>;

export interface GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest {
  /** Optional. Resource name for a child property. If set, only return changes made to this property or its child resources. Format: properties/{propertyId} Example: `properties/100` */
  property?: string;
  /** Optional. If set, only return changes if they are for a resource that matches at least one of these types. */
  resourceType?: Array<"CHANGE_HISTORY_RESOURCE_TYPE_UNSPECIFIED" | "ACCOUNT" | "PROPERTY" | "FIREBASE_LINK" | "GOOGLE_ADS_LINK" | "GOOGLE_SIGNALS_SETTINGS" | "CONVERSION_EVENT" | "MEASUREMENT_PROTOCOL_SECRET" | "CUSTOM_DIMENSION" | "CUSTOM_METRIC" | "DATA_RETENTION_SETTINGS" | "DISPLAY_VIDEO_360_ADVERTISER_LINK" | "DISPLAY_VIDEO_360_ADVERTISER_LINK_PROPOSAL" | "DATA_STREAM" | "ATTRIBUTION_SETTINGS" | (string & {})>;
  /** Optional. If set, only return changes that match one or more of these types of actions. */
  action?: Array<"ACTION_TYPE_UNSPECIFIED" | "CREATED" | "UPDATED" | "DELETED" | (string & {})>;
  /** Optional. If set, only return changes if they are made by a user in this list. */
  actorEmail?: Array<string>;
  /** Optional. If set, only return changes made after this time (inclusive). */
  earliestChangeTime?: string;
  /** Optional. If set, only return changes made before this time (inclusive). */
  latestChangeTime?: string;
  /** Optional. The maximum number of ChangeHistoryEvent items to return. If unspecified, at most 50 items will be returned. The maximum value is 200 (higher values will be coerced to the maximum). Note that the service may return a page with fewer items than this value specifies (potentially even zero), and that there still may be additional pages. If you want a particular number of items, you'll need to continue requesting additional pages using `page_token` until you get the needed number. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `SearchChangeHistoryEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchChangeHistoryEvents` must match the call that provided the page token. */
  pageToken?: string;
}

export const GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest: Schema.Schema<GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.Array(Schema.String)),
  action: Schema.optional(Schema.Array(Schema.String)),
  actorEmail: Schema.optional(Schema.Array(Schema.String)),
  earliestChangeTime: Schema.optional(Schema.String),
  latestChangeTime: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest>;

export interface GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue {
  /** This value will be used to populate the value for all conversions of the specified event_name where the event "value" parameter is unset. */
  value?: number;
  /** When a conversion event for this event_name has no set currency, this currency will be applied as the default. Must be in ISO 4217 currency code format. See https://en.wikipedia.org/wiki/ISO_4217 for more information. */
  currencyCode?: string;
}

export const GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue: Schema.Schema<GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue>;

export interface GoogleAnalyticsAdminV1betaConversionEvent {
  /** Output only. Resource name of this conversion event. Format: properties/{property}/conversionEvents/{conversion_event} */
  name?: string;
  /** Immutable. The event name for this conversion event. Examples: 'click', 'purchase' */
  eventName?: string;
  /** Output only. Time when this conversion event was created in the property. */
  createTime?: string;
  /** Output only. If set, this event can currently be deleted with DeleteConversionEvent. */
  deletable?: boolean;
  /** Output only. If set to true, this conversion event refers to a custom event. If set to false, this conversion event refers to a default event in GA. Default events typically have special meaning in GA. Default events are usually created for you by the GA system, but in some cases can be created by property admins. Custom events count towards the maximum number of custom conversion events that may be created per property. */
  custom?: boolean;
  /** Optional. The method by which conversions will be counted across multiple events within a session. If this value is not provided, it will be set to `ONCE_PER_EVENT`. */
  countingMethod?: "CONVERSION_COUNTING_METHOD_UNSPECIFIED" | "ONCE_PER_EVENT" | "ONCE_PER_SESSION" | (string & {});
  /** Optional. Defines a default value/currency for a conversion event. */
  defaultConversionValue?: GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue;
}

export const GoogleAnalyticsAdminV1betaConversionEvent: Schema.Schema<GoogleAnalyticsAdminV1betaConversionEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  eventName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  deletable: Schema.optional(Schema.Boolean),
  custom: Schema.optional(Schema.Boolean),
  countingMethod: Schema.optional(Schema.String),
  defaultConversionValue: Schema.optional(GoogleAnalyticsAdminV1betaConversionEventDefaultConversionValue),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaConversionEvent" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaConversionEvent>;

export interface GoogleAnalyticsAdminV1betaDataRetentionSettings {
  /** Output only. Resource name for this DataRetentionSetting resource. Format: properties/{property}/dataRetentionSettings */
  name?: string;
  /** Required. The length of time that event-level data is retained. */
  eventDataRetention?: "RETENTION_DURATION_UNSPECIFIED" | "TWO_MONTHS" | "FOURTEEN_MONTHS" | "TWENTY_SIX_MONTHS" | "THIRTY_EIGHT_MONTHS" | "FIFTY_MONTHS" | (string & {});
  /** Required. The length of time that user-level data is retained. */
  userDataRetention?: "RETENTION_DURATION_UNSPECIFIED" | "TWO_MONTHS" | "FOURTEEN_MONTHS" | "TWENTY_SIX_MONTHS" | "THIRTY_EIGHT_MONTHS" | "FIFTY_MONTHS" | (string & {});
  /** If true, reset the retention period for the user identifier with every event from that user. */
  resetUserDataOnNewActivity?: boolean;
}

export const GoogleAnalyticsAdminV1betaDataRetentionSettings: Schema.Schema<GoogleAnalyticsAdminV1betaDataRetentionSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  eventDataRetention: Schema.optional(Schema.String),
  userDataRetention: Schema.optional(Schema.String),
  resetUserDataOnNewActivity: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaDataRetentionSettings" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaDataRetentionSettings>;

export interface GoogleAnalyticsAdminV1betaDataStreamWebStreamData {
  /** Output only. Analytics Measurement ID. Example: "G-1A2BCD345E" */
  measurementId?: string;
  /** Output only. ID of the corresponding web app in Firebase, if any. This ID can change if the web app is deleted and recreated. */
  firebaseAppId?: string;
  /** Domain name of the web app being measured, or empty. Example: "http://www.google.com", "https://www.google.com" */
  defaultUri?: string;
}

export const GoogleAnalyticsAdminV1betaDataStreamWebStreamData: Schema.Schema<GoogleAnalyticsAdminV1betaDataStreamWebStreamData> = Schema.suspend(() => Schema.Struct({
  measurementId: Schema.optional(Schema.String),
  firebaseAppId: Schema.optional(Schema.String),
  defaultUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaDataStreamWebStreamData" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaDataStreamWebStreamData>;

export interface GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData {
  /** Output only. ID of the corresponding Android app in Firebase, if any. This ID can change if the Android app is deleted and recreated. */
  firebaseAppId?: string;
  /** Immutable. The package name for the app being measured. Example: "com.example.myandroidapp" */
  packageName?: string;
}

export const GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData: Schema.Schema<GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData> = Schema.suspend(() => Schema.Struct({
  firebaseAppId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData>;

export interface GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData {
  /** Output only. ID of the corresponding iOS app in Firebase, if any. This ID can change if the iOS app is deleted and recreated. */
  firebaseAppId?: string;
  /** Required. Immutable. The Apple App Store Bundle ID for the app Example: "com.example.myiosapp" */
  bundleId?: string;
}

export const GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData: Schema.Schema<GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData> = Schema.suspend(() => Schema.Struct({
  firebaseAppId: Schema.optional(Schema.String),
  bundleId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData>;

export interface GoogleAnalyticsAdminV1betaDataStream {
  /** Data specific to web streams. Must be populated if type is WEB_DATA_STREAM. */
  webStreamData?: GoogleAnalyticsAdminV1betaDataStreamWebStreamData;
  /** Data specific to Android app streams. Must be populated if type is ANDROID_APP_DATA_STREAM. */
  androidAppStreamData?: GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData;
  /** Data specific to iOS app streams. Must be populated if type is IOS_APP_DATA_STREAM. */
  iosAppStreamData?: GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData;
  /** Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000" */
  name?: string;
  /** Required. Immutable. The type of this DataStream resource. */
  type?: "DATA_STREAM_TYPE_UNSPECIFIED" | "WEB_DATA_STREAM" | "ANDROID_APP_DATA_STREAM" | "IOS_APP_DATA_STREAM" | (string & {});
  /** Human-readable display name for the Data Stream. Required for web data streams. The max allowed display name length is 255 UTF-16 code units. */
  displayName?: string;
  /** Output only. Time when this stream was originally created. */
  createTime?: string;
  /** Output only. Time when stream payload fields were last updated. */
  updateTime?: string;
}

export const GoogleAnalyticsAdminV1betaDataStream: Schema.Schema<GoogleAnalyticsAdminV1betaDataStream> = Schema.suspend(() => Schema.Struct({
  webStreamData: Schema.optional(GoogleAnalyticsAdminV1betaDataStreamWebStreamData),
  androidAppStreamData: Schema.optional(GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData),
  iosAppStreamData: Schema.optional(GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaDataStream" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaDataStream>;

export interface GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource {
  /** A snapshot of an Account resource in change history. */
  account?: GoogleAnalyticsAdminV1betaAccount;
  /** A snapshot of a Property resource in change history. */
  property?: GoogleAnalyticsAdminV1betaProperty;
  /** A snapshot of a FirebaseLink resource in change history. */
  firebaseLink?: GoogleAnalyticsAdminV1betaFirebaseLink;
  /** A snapshot of a GoogleAdsLink resource in change history. */
  googleAdsLink?: GoogleAnalyticsAdminV1betaGoogleAdsLink;
  /** A snapshot of a ConversionEvent resource in change history. */
  conversionEvent?: GoogleAnalyticsAdminV1betaConversionEvent;
  /** A snapshot of a MeasurementProtocolSecret resource in change history. */
  measurementProtocolSecret?: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
  /** A snapshot of a data retention settings resource in change history. */
  dataRetentionSettings?: GoogleAnalyticsAdminV1betaDataRetentionSettings;
  /** A snapshot of a DataStream resource in change history. */
  dataStream?: GoogleAnalyticsAdminV1betaDataStream;
}

export const GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource: Schema.Schema<GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(GoogleAnalyticsAdminV1betaAccount),
  property: Schema.optional(GoogleAnalyticsAdminV1betaProperty),
  firebaseLink: Schema.optional(GoogleAnalyticsAdminV1betaFirebaseLink),
  googleAdsLink: Schema.optional(GoogleAnalyticsAdminV1betaGoogleAdsLink),
  conversionEvent: Schema.optional(GoogleAnalyticsAdminV1betaConversionEvent),
  measurementProtocolSecret: Schema.optional(GoogleAnalyticsAdminV1betaMeasurementProtocolSecret),
  dataRetentionSettings: Schema.optional(GoogleAnalyticsAdminV1betaDataRetentionSettings),
  dataStream: Schema.optional(GoogleAnalyticsAdminV1betaDataStream),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource>;

export interface GoogleAnalyticsAdminV1betaChangeHistoryChange {
  /** Resource name of the resource whose changes are described by this entry. */
  resource?: string;
  /** The type of action that changed this resource. */
  action?: "ACTION_TYPE_UNSPECIFIED" | "CREATED" | "UPDATED" | "DELETED" | (string & {});
  /** Resource contents from before the change was made. If this resource was created in this change, this field will be missing. */
  resourceBeforeChange?: GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource;
  /** Resource contents from after the change was made. If this resource was deleted in this change, this field will be missing. */
  resourceAfterChange?: GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource;
}

export const GoogleAnalyticsAdminV1betaChangeHistoryChange: Schema.Schema<GoogleAnalyticsAdminV1betaChangeHistoryChange> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  resourceBeforeChange: Schema.optional(GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource),
  resourceAfterChange: Schema.optional(GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaChangeHistoryChange" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaChangeHistoryChange>;

export interface GoogleAnalyticsAdminV1betaChangeHistoryEvent {
  /** ID of this change history event. This ID is unique across Google Analytics. */
  id?: string;
  /** Time when change was made. */
  changeTime?: string;
  /** The type of actor that made this change. */
  actorType?: "ACTOR_TYPE_UNSPECIFIED" | "USER" | "SYSTEM" | "SUPPORT" | (string & {});
  /** Email address of the Google account that made the change. This will be a valid email address if the actor field is set to USER, and empty otherwise. Google accounts that have been deleted will cause an error. */
  userActorEmail?: string;
  /** If true, then the list of changes returned was filtered, and does not represent all changes that occurred in this event. */
  changesFiltered?: boolean;
  /** A list of changes made in this change history event that fit the filters specified in SearchChangeHistoryEventsRequest. */
  changes?: Array<GoogleAnalyticsAdminV1betaChangeHistoryChange>;
}

export const GoogleAnalyticsAdminV1betaChangeHistoryEvent: Schema.Schema<GoogleAnalyticsAdminV1betaChangeHistoryEvent> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  changeTime: Schema.optional(Schema.String),
  actorType: Schema.optional(Schema.String),
  userActorEmail: Schema.optional(Schema.String),
  changesFiltered: Schema.optional(Schema.Boolean),
  changes: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaChangeHistoryChange)),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaChangeHistoryEvent" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaChangeHistoryEvent>;

export interface GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse {
  /** Results that were accessible to the caller. */
  changeHistoryEvents?: Array<GoogleAnalyticsAdminV1betaChangeHistoryEvent>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse> = Schema.suspend(() => Schema.Struct({
  changeHistoryEvents: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaChangeHistoryEvent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse>;

export interface GoogleAnalyticsAdminV1betaListConversionEventsResponse {
  /** The requested conversion events */
  conversionEvents?: Array<GoogleAnalyticsAdminV1betaConversionEvent>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListConversionEventsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListConversionEventsResponse> = Schema.suspend(() => Schema.Struct({
  conversionEvents: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaConversionEvent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListConversionEventsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListConversionEventsResponse>;

export interface GoogleAnalyticsAdminV1betaKeyEventDefaultValue {
  /** Required. This will be used to populate the "value" parameter for all occurrences of this Key Event (specified by event_name) where that parameter is unset. */
  numericValue?: number;
  /** Required. When an occurrence of this Key Event (specified by event_name) has no set currency this currency will be applied as the default. Must be in ISO 4217 currency code format. See https://en.wikipedia.org/wiki/ISO_4217 for more information. */
  currencyCode?: string;
}

export const GoogleAnalyticsAdminV1betaKeyEventDefaultValue: Schema.Schema<GoogleAnalyticsAdminV1betaKeyEventDefaultValue> = Schema.suspend(() => Schema.Struct({
  numericValue: Schema.optional(Schema.Number),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaKeyEventDefaultValue" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaKeyEventDefaultValue>;

export interface GoogleAnalyticsAdminV1betaKeyEvent {
  /** Output only. Resource name of this key event. Format: properties/{property}/keyEvents/{key_event} */
  name?: string;
  /** Immutable. The event name for this key event. Examples: 'click', 'purchase' */
  eventName?: string;
  /** Output only. Time when this key event was created in the property. */
  createTime?: string;
  /** Output only. If set to true, this event can be deleted. */
  deletable?: boolean;
  /** Output only. If set to true, this key event refers to a custom event. If set to false, this key event refers to a default event in GA. Default events typically have special meaning in GA. Default events are usually created for you by the GA system, but in some cases can be created by property admins. Custom events count towards the maximum number of custom key events that may be created per property. */
  custom?: boolean;
  /** Required. The method by which Key Events will be counted across multiple events within a session. */
  countingMethod?: "COUNTING_METHOD_UNSPECIFIED" | "ONCE_PER_EVENT" | "ONCE_PER_SESSION" | (string & {});
  /** Optional. Defines a default value/currency for a key event. */
  defaultValue?: GoogleAnalyticsAdminV1betaKeyEventDefaultValue;
}

export const GoogleAnalyticsAdminV1betaKeyEvent: Schema.Schema<GoogleAnalyticsAdminV1betaKeyEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  eventName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  deletable: Schema.optional(Schema.Boolean),
  custom: Schema.optional(Schema.Boolean),
  countingMethod: Schema.optional(Schema.String),
  defaultValue: Schema.optional(GoogleAnalyticsAdminV1betaKeyEventDefaultValue),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaKeyEvent" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaKeyEvent>;

export interface GoogleAnalyticsAdminV1betaListKeyEventsResponse {
  /** The requested Key Events */
  keyEvents?: Array<GoogleAnalyticsAdminV1betaKeyEvent>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListKeyEventsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListKeyEventsResponse> = Schema.suspend(() => Schema.Struct({
  keyEvents: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaKeyEvent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListKeyEventsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListKeyEventsResponse>;

export interface GoogleAnalyticsAdminV1betaCustomDimension {
  /** Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension} */
  name?: string;
  /** Required. Immutable. Tagging parameter name for this custom dimension. If this is a user-scoped dimension, then this is the user property name. If this is an event-scoped dimension, then this is the event parameter name. If this is an item-scoped dimension, then this is the parameter name found in the eCommerce items array. May only contain alphanumeric and underscore characters, starting with a letter. Max length of 24 characters for user-scoped dimensions, 40 characters for event-scoped dimensions. */
  parameterName?: string;
  /** Required. Display name for this custom dimension as shown in the Analytics UI. Max length of 82 characters, alphanumeric plus space and underscore starting with a letter. Legacy system-generated display names may contain square brackets, but updates to this field will never permit square brackets. */
  displayName?: string;
  /** Optional. Description for this custom dimension. Max length of 150 characters. */
  description?: string;
  /** Required. Immutable. The scope of this dimension. */
  scope?: "DIMENSION_SCOPE_UNSPECIFIED" | "EVENT" | "USER" | "ITEM" | (string & {});
  /** Optional. If set to true, sets this dimension as NPA and excludes it from ads personalization. This is currently only supported by user-scoped custom dimensions. */
  disallowAdsPersonalization?: boolean;
}

export const GoogleAnalyticsAdminV1betaCustomDimension: Schema.Schema<GoogleAnalyticsAdminV1betaCustomDimension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameterName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  disallowAdsPersonalization: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaCustomDimension" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaCustomDimension>;

export interface GoogleAnalyticsAdminV1betaListCustomDimensionsResponse {
  /** List of CustomDimensions. */
  customDimensions?: Array<GoogleAnalyticsAdminV1betaCustomDimension>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListCustomDimensionsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListCustomDimensionsResponse> = Schema.suspend(() => Schema.Struct({
  customDimensions: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaCustomDimension)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListCustomDimensionsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListCustomDimensionsResponse>;

export interface GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest {
}

export const GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest: Schema.Schema<GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest>;

export interface GoogleAnalyticsAdminV1betaCustomMetric {
  /** Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric} */
  name?: string;
  /** Required. Immutable. Tagging name for this custom metric. If this is an event-scoped metric, then this is the event parameter name. May only contain alphanumeric and underscore charactes, starting with a letter. Max length of 40 characters for event-scoped metrics. */
  parameterName?: string;
  /** Required. Display name for this custom metric as shown in the Analytics UI. Max length of 82 characters, alphanumeric plus space and underscore starting with a letter. Legacy system-generated display names may contain square brackets, but updates to this field will never permit square brackets. */
  displayName?: string;
  /** Optional. Description for this custom dimension. Max length of 150 characters. */
  description?: string;
  /** Required. The type for the custom metric's value. */
  measurementUnit?: "MEASUREMENT_UNIT_UNSPECIFIED" | "STANDARD" | "CURRENCY" | "FEET" | "METERS" | "KILOMETERS" | "MILES" | "MILLISECONDS" | "SECONDS" | "MINUTES" | "HOURS" | (string & {});
  /** Required. Immutable. The scope of this custom metric. */
  scope?: "METRIC_SCOPE_UNSPECIFIED" | "EVENT" | (string & {});
  /** Optional. Types of restricted data that this metric may contain. Required for metrics with CURRENCY measurement unit. Must be empty for metrics with a non-CURRENCY measurement unit. */
  restrictedMetricType?: Array<"RESTRICTED_METRIC_TYPE_UNSPECIFIED" | "COST_DATA" | "REVENUE_DATA" | (string & {})>;
}

export const GoogleAnalyticsAdminV1betaCustomMetric: Schema.Schema<GoogleAnalyticsAdminV1betaCustomMetric> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameterName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  measurementUnit: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  restrictedMetricType: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaCustomMetric" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaCustomMetric>;

export interface GoogleAnalyticsAdminV1betaListCustomMetricsResponse {
  /** List of CustomMetrics. */
  customMetrics?: Array<GoogleAnalyticsAdminV1betaCustomMetric>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListCustomMetricsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListCustomMetricsResponse> = Schema.suspend(() => Schema.Struct({
  customMetrics: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaCustomMetric)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListCustomMetricsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListCustomMetricsResponse>;

export interface GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest {
}

export const GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest: Schema.Schema<GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest>;

export interface GoogleAnalyticsAdminV1betaListDataStreamsResponse {
  /** List of DataStreams. */
  dataStreams?: Array<GoogleAnalyticsAdminV1betaDataStream>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1betaListDataStreamsResponse: Schema.Schema<GoogleAnalyticsAdminV1betaListDataStreamsResponse> = Schema.suspend(() => Schema.Struct({
  dataStreams: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaDataStream)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaListDataStreamsResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaListDataStreamsResponse>;

export interface GoogleAnalyticsAdminV1betaAccessDimension {
  /** The API name of the dimension. See [Data Access Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema) for the list of dimensions supported in this API. Dimensions are referenced by name in `dimensionFilter` and `orderBys`. */
  dimensionName?: string;
}

export const GoogleAnalyticsAdminV1betaAccessDimension: Schema.Schema<GoogleAnalyticsAdminV1betaAccessDimension> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessDimension" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessDimension>;

export interface GoogleAnalyticsAdminV1betaAccessMetric {
  /** The API name of the metric. See [Data Access Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema) for the list of metrics supported in this API. Metrics are referenced by name in `metricFilter` & `orderBys`. */
  metricName?: string;
}

export const GoogleAnalyticsAdminV1betaAccessMetric: Schema.Schema<GoogleAnalyticsAdminV1betaAccessMetric> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessMetric" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessMetric>;

export interface GoogleAnalyticsAdminV1betaAccessDateRange {
  /** The inclusive start date for the query in the format `YYYY-MM-DD`. Cannot be after `endDate`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the current time in the request's time zone. */
  startDate?: string;
  /** The inclusive end date for the query in the format `YYYY-MM-DD`. Cannot be before `startDate`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the current time in the request's time zone. */
  endDate?: string;
}

export const GoogleAnalyticsAdminV1betaAccessDateRange: Schema.Schema<GoogleAnalyticsAdminV1betaAccessDateRange> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessDateRange" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessDateRange>;

export interface GoogleAnalyticsAdminV1betaAccessFilterExpressionList {
  /** A list of filter expressions. */
  expressions?: Array<GoogleAnalyticsAdminV1betaAccessFilterExpression>;
}

export const GoogleAnalyticsAdminV1betaAccessFilterExpressionList: Schema.Schema<GoogleAnalyticsAdminV1betaAccessFilterExpressionList> = Schema.suspend(() => Schema.Struct({
  expressions: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessFilterExpression)),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessFilterExpressionList" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessFilterExpressionList>;

export interface GoogleAnalyticsAdminV1betaAccessStringFilter {
  /** The match type for this filter. */
  matchType?: "MATCH_TYPE_UNSPECIFIED" | "EXACT" | "BEGINS_WITH" | "ENDS_WITH" | "CONTAINS" | "FULL_REGEXP" | "PARTIAL_REGEXP" | (string & {});
  /** The string value used for the matching. */
  value?: string;
  /** If true, the string value is case sensitive. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1betaAccessStringFilter: Schema.Schema<GoogleAnalyticsAdminV1betaAccessStringFilter> = Schema.suspend(() => Schema.Struct({
  matchType: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  caseSensitive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessStringFilter" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessStringFilter>;

export interface GoogleAnalyticsAdminV1betaAccessInListFilter {
  /** The list of string values. Must be non-empty. */
  values?: Array<string>;
  /** If true, the string value is case sensitive. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1betaAccessInListFilter: Schema.Schema<GoogleAnalyticsAdminV1betaAccessInListFilter> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
  caseSensitive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessInListFilter" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessInListFilter>;

export interface GoogleAnalyticsAdminV1betaNumericValue {
  /** Integer value */
  int64Value?: string;
  /** Double value */
  doubleValue?: number;
}

export const GoogleAnalyticsAdminV1betaNumericValue: Schema.Schema<GoogleAnalyticsAdminV1betaNumericValue> = Schema.suspend(() => Schema.Struct({
  int64Value: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaNumericValue" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaNumericValue>;

export interface GoogleAnalyticsAdminV1betaAccessNumericFilter {
  /** The operation type for this filter. */
  operation?: "OPERATION_UNSPECIFIED" | "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL" | (string & {});
  /** A numeric value or a date value. */
  value?: GoogleAnalyticsAdminV1betaNumericValue;
}

export const GoogleAnalyticsAdminV1betaAccessNumericFilter: Schema.Schema<GoogleAnalyticsAdminV1betaAccessNumericFilter> = Schema.suspend(() => Schema.Struct({
  operation: Schema.optional(Schema.String),
  value: Schema.optional(GoogleAnalyticsAdminV1betaNumericValue),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessNumericFilter" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessNumericFilter>;

export interface GoogleAnalyticsAdminV1betaAccessBetweenFilter {
  /** Begins with this number. */
  fromValue?: GoogleAnalyticsAdminV1betaNumericValue;
  /** Ends with this number. */
  toValue?: GoogleAnalyticsAdminV1betaNumericValue;
}

export const GoogleAnalyticsAdminV1betaAccessBetweenFilter: Schema.Schema<GoogleAnalyticsAdminV1betaAccessBetweenFilter> = Schema.suspend(() => Schema.Struct({
  fromValue: Schema.optional(GoogleAnalyticsAdminV1betaNumericValue),
  toValue: Schema.optional(GoogleAnalyticsAdminV1betaNumericValue),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessBetweenFilter" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessBetweenFilter>;

export interface GoogleAnalyticsAdminV1betaAccessFilter {
  /** Strings related filter. */
  stringFilter?: GoogleAnalyticsAdminV1betaAccessStringFilter;
  /** A filter for in list values. */
  inListFilter?: GoogleAnalyticsAdminV1betaAccessInListFilter;
  /** A filter for numeric or date values. */
  numericFilter?: GoogleAnalyticsAdminV1betaAccessNumericFilter;
  /** A filter for two values. */
  betweenFilter?: GoogleAnalyticsAdminV1betaAccessBetweenFilter;
  /** The dimension name or metric name. */
  fieldName?: string;
}

export const GoogleAnalyticsAdminV1betaAccessFilter: Schema.Schema<GoogleAnalyticsAdminV1betaAccessFilter> = Schema.suspend(() => Schema.Struct({
  stringFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessStringFilter),
  inListFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessInListFilter),
  numericFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessNumericFilter),
  betweenFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessBetweenFilter),
  fieldName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessFilter" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessFilter>;

export interface GoogleAnalyticsAdminV1betaAccessFilterExpression {
  /** Each of the FilterExpressions in the and_group has an AND relationship. */
  andGroup?: GoogleAnalyticsAdminV1betaAccessFilterExpressionList;
  /** Each of the FilterExpressions in the or_group has an OR relationship. */
  orGroup?: GoogleAnalyticsAdminV1betaAccessFilterExpressionList;
  /** The FilterExpression is NOT of not_expression. */
  notExpression?: GoogleAnalyticsAdminV1betaAccessFilterExpression;
  /** A primitive filter. In the same FilterExpression, all of the filter's field names need to be either all dimensions or all metrics. */
  accessFilter?: GoogleAnalyticsAdminV1betaAccessFilter;
}

export const GoogleAnalyticsAdminV1betaAccessFilterExpression: Schema.Schema<GoogleAnalyticsAdminV1betaAccessFilterExpression> = Schema.suspend(() => Schema.Struct({
  andGroup: Schema.optional(GoogleAnalyticsAdminV1betaAccessFilterExpressionList),
  orGroup: Schema.optional(GoogleAnalyticsAdminV1betaAccessFilterExpressionList),
  notExpression: Schema.optional(GoogleAnalyticsAdminV1betaAccessFilterExpression),
  accessFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessFilter),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessFilterExpression" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessFilterExpression>;

export interface GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy {
  /** A metric name in the request to order by. */
  metricName?: string;
}

export const GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy: Schema.Schema<GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy>;

export interface GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy {
  /** A dimension name in the request to order by. */
  dimensionName?: string;
  /** Controls the rule for dimension value ordering. */
  orderType?: "ORDER_TYPE_UNSPECIFIED" | "ALPHANUMERIC" | "CASE_INSENSITIVE_ALPHANUMERIC" | "NUMERIC" | (string & {});
}

export const GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy: Schema.Schema<GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
  orderType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy>;

export interface GoogleAnalyticsAdminV1betaAccessOrderBy {
  /** Sorts results by a metric's values. */
  metric?: GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy;
  /** Sorts results by a dimension's values. */
  dimension?: GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy;
  /** If true, sorts by descending order. If false or unspecified, sorts in ascending order. */
  desc?: boolean;
}

export const GoogleAnalyticsAdminV1betaAccessOrderBy: Schema.Schema<GoogleAnalyticsAdminV1betaAccessOrderBy> = Schema.suspend(() => Schema.Struct({
  metric: Schema.optional(GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy),
  dimension: Schema.optional(GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy),
  desc: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessOrderBy" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessOrderBy>;

export interface GoogleAnalyticsAdminV1betaRunAccessReportRequest {
  /** The dimensions requested and displayed in the response. Requests are allowed up to 9 dimensions. */
  dimensions?: Array<GoogleAnalyticsAdminV1betaAccessDimension>;
  /** The metrics requested and displayed in the response. Requests are allowed up to 10 metrics. */
  metrics?: Array<GoogleAnalyticsAdminV1betaAccessMetric>;
  /** Date ranges of access records to read. If multiple date ranges are requested, each response row will contain a zero based date range index. If two date ranges overlap, the access records for the overlapping days is included in the response rows for both date ranges. Requests are allowed up to 2 date ranges. */
  dateRanges?: Array<GoogleAnalyticsAdminV1betaAccessDateRange>;
  /** Dimension filters let you restrict report response to specific dimension values which match the filter. For example, filtering on access records of a single user. To learn more, see [Fundamentals of Dimension Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters) for examples. Metrics cannot be used in this filter. */
  dimensionFilter?: GoogleAnalyticsAdminV1betaAccessFilterExpression;
  /** Metric filters allow you to restrict report response to specific metric values which match the filter. Metric filters are applied after aggregating the report's rows, similar to SQL having-clause. Dimensions cannot be used in this filter. */
  metricFilter?: GoogleAnalyticsAdminV1betaAccessFilterExpression;
  /** The row count of the start row. The first row is counted as row 0. If offset is unspecified, it is treated as 0. If offset is zero, then this method will return the first page of results with `limit` entries. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  offset?: string;
  /** The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 100,000 rows per request, no matter how many you ask for. `limit` must be positive. The API may return fewer rows than the requested `limit`, if there aren't as many remaining rows as the `limit`. For instance, there are fewer than 300 possible values for the dimension `country`, so when reporting on only `country`, you can't get more than 300 rows, even if you set `limit` to a higher value. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  limit?: string;
  /** This request's time zone if specified. If unspecified, the property's time zone is used. The request's time zone is used to interpret the start & end dates of the report. Formatted as strings from the IANA Time Zone database (https://www.iana.org/time-zones); for example "America/New_York" or "Asia/Tokyo". */
  timeZone?: string;
  /** Specifies how rows are ordered in the response. */
  orderBys?: Array<GoogleAnalyticsAdminV1betaAccessOrderBy>;
  /** Toggles whether to return the current state of this Analytics Property's quota. Quota is returned in [AccessQuota](#AccessQuota). For account-level requests, this field must be false. */
  returnEntityQuota?: boolean;
  /** Optional. Determines whether to include users who have never made an API call in the response. If true, all users with access to the specified property or account are included in the response, regardless of whether they have made an API call or not. If false, only the users who have made an API call will be included. */
  includeAllUsers?: boolean;
  /** Optional. Decides whether to return the users within user groups. This field works only when include_all_users is set to true. If true, it will return all users with access to the specified property or account. If false, only the users with direct access will be returned. */
  expandGroups?: boolean;
}

export const GoogleAnalyticsAdminV1betaRunAccessReportRequest: Schema.Schema<GoogleAnalyticsAdminV1betaRunAccessReportRequest> = Schema.suspend(() => Schema.Struct({
  dimensions: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessDimension)),
  metrics: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessMetric)),
  dateRanges: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessDateRange)),
  dimensionFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessFilterExpression),
  metricFilter: Schema.optional(GoogleAnalyticsAdminV1betaAccessFilterExpression),
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  orderBys: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessOrderBy)),
  returnEntityQuota: Schema.optional(Schema.Boolean),
  includeAllUsers: Schema.optional(Schema.Boolean),
  expandGroups: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaRunAccessReportRequest" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaRunAccessReportRequest>;

export interface GoogleAnalyticsAdminV1betaAccessDimensionHeader {
  /** The dimension's name; for example 'userEmail'. */
  dimensionName?: string;
}

export const GoogleAnalyticsAdminV1betaAccessDimensionHeader: Schema.Schema<GoogleAnalyticsAdminV1betaAccessDimensionHeader> = Schema.suspend(() => Schema.Struct({
  dimensionName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessDimensionHeader" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessDimensionHeader>;

export interface GoogleAnalyticsAdminV1betaAccessMetricHeader {
  /** The metric's name; for example 'accessCount'. */
  metricName?: string;
}

export const GoogleAnalyticsAdminV1betaAccessMetricHeader: Schema.Schema<GoogleAnalyticsAdminV1betaAccessMetricHeader> = Schema.suspend(() => Schema.Struct({
  metricName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessMetricHeader" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessMetricHeader>;

export interface GoogleAnalyticsAdminV1betaAccessDimensionValue {
  /** The dimension value. For example, this value may be 'France' for the 'country' dimension. */
  value?: string;
}

export const GoogleAnalyticsAdminV1betaAccessDimensionValue: Schema.Schema<GoogleAnalyticsAdminV1betaAccessDimensionValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessDimensionValue" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessDimensionValue>;

export interface GoogleAnalyticsAdminV1betaAccessMetricValue {
  /** The measurement value. For example, this value may be '13'. */
  value?: string;
}

export const GoogleAnalyticsAdminV1betaAccessMetricValue: Schema.Schema<GoogleAnalyticsAdminV1betaAccessMetricValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessMetricValue" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessMetricValue>;

export interface GoogleAnalyticsAdminV1betaAccessRow {
  /** List of dimension values. These values are in the same order as specified in the request. */
  dimensionValues?: Array<GoogleAnalyticsAdminV1betaAccessDimensionValue>;
  /** List of metric values. These values are in the same order as specified in the request. */
  metricValues?: Array<GoogleAnalyticsAdminV1betaAccessMetricValue>;
}

export const GoogleAnalyticsAdminV1betaAccessRow: Schema.Schema<GoogleAnalyticsAdminV1betaAccessRow> = Schema.suspend(() => Schema.Struct({
  dimensionValues: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessDimensionValue)),
  metricValues: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessMetricValue)),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessRow" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessRow>;

export interface GoogleAnalyticsAdminV1betaAccessQuotaStatus {
  /** Quota consumed by this request. */
  consumed?: number;
  /** Quota remaining after this request. */
  remaining?: number;
}

export const GoogleAnalyticsAdminV1betaAccessQuotaStatus: Schema.Schema<GoogleAnalyticsAdminV1betaAccessQuotaStatus> = Schema.suspend(() => Schema.Struct({
  consumed: Schema.optional(Schema.Number),
  remaining: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessQuotaStatus" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessQuotaStatus>;

export interface GoogleAnalyticsAdminV1betaAccessQuota {
  /** Properties can use 250,000 tokens per day. Most requests consume fewer than 10 tokens. */
  tokensPerDay?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /** Properties can use 50,000 tokens per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. */
  tokensPerHour?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /** Properties can use up to 50 concurrent requests. */
  concurrentRequests?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /** Properties and cloud project pairs can have up to 50 server errors per hour. */
  serverErrorsPerProjectPerHour?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /** Properties can use up to 25% of their tokens per project per hour. This amounts to Analytics 360 Properties can use 12,500 tokens per project per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. */
  tokensPerProjectPerHour?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
}

export const GoogleAnalyticsAdminV1betaAccessQuota: Schema.Schema<GoogleAnalyticsAdminV1betaAccessQuota> = Schema.suspend(() => Schema.Struct({
  tokensPerDay: Schema.optional(GoogleAnalyticsAdminV1betaAccessQuotaStatus),
  tokensPerHour: Schema.optional(GoogleAnalyticsAdminV1betaAccessQuotaStatus),
  concurrentRequests: Schema.optional(GoogleAnalyticsAdminV1betaAccessQuotaStatus),
  serverErrorsPerProjectPerHour: Schema.optional(GoogleAnalyticsAdminV1betaAccessQuotaStatus),
  tokensPerProjectPerHour: Schema.optional(GoogleAnalyticsAdminV1betaAccessQuotaStatus),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaAccessQuota" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaAccessQuota>;

export interface GoogleAnalyticsAdminV1betaRunAccessReportResponse {
  /** The header for a column in the report that corresponds to a specific dimension. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows. */
  dimensionHeaders?: Array<GoogleAnalyticsAdminV1betaAccessDimensionHeader>;
  /** The header for a column in the report that corresponds to a specific metric. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows. */
  metricHeaders?: Array<GoogleAnalyticsAdminV1betaAccessMetricHeader>;
  /** Rows of dimension value combinations and metric values in the report. */
  rows?: Array<GoogleAnalyticsAdminV1betaAccessRow>;
  /** The total number of rows in the query result. `rowCount` is independent of the number of rows returned in the response, the `limit` request parameter, and the `offset` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  rowCount?: number;
  /** The quota state for this Analytics property including this request. This field doesn't work with account-level requests. */
  quota?: GoogleAnalyticsAdminV1betaAccessQuota;
}

export const GoogleAnalyticsAdminV1betaRunAccessReportResponse: Schema.Schema<GoogleAnalyticsAdminV1betaRunAccessReportResponse> = Schema.suspend(() => Schema.Struct({
  dimensionHeaders: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessDimensionHeader)),
  metricHeaders: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessMetricHeader)),
  rows: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1betaAccessRow)),
  rowCount: Schema.optional(Schema.Number),
  quota: Schema.optional(GoogleAnalyticsAdminV1betaAccessQuota),
})).annotate({ identifier: "GoogleAnalyticsAdminV1betaRunAccessReportResponse" }) as any as Schema.Schema<GoogleAnalyticsAdminV1betaRunAccessReportResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lookup for a single Account. */
export interface GetAccountsRequest {
  /** Required. The name of the account to lookup. Format: accounts/{account} Example: "accounts/100" */
  name: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = GoogleAnalyticsAdminV1betaAccount;
export const GetAccountsResponse = GoogleAnalyticsAdminV1betaAccount;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Returns all accounts accessible by the caller. Note that these accounts might not currently have GA properties. Soft-deleted (ie: "trashed") accounts are excluded by default. Returns an empty list if no relevant accounts are found. */
export interface ListAccountsRequest {
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListAccounts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccounts` must match the call that provided the page token. */
  pageToken?: string;
  /** Whether to include soft-deleted (ie: "trashed") Accounts in the results. Accounts can be inspected to determine whether they are deleted or not. */
  showDeleted?: boolean;
}

export const ListAccountsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = GoogleAnalyticsAdminV1betaListAccountsResponse;
export const ListAccountsResponse = GoogleAnalyticsAdminV1betaListAccountsResponse;

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

/** Marks target Account as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted accounts. However, they can be restored using the Trash Can UI. If the accounts are not restored before the expiration time, the account and all child resources (eg: Properties, GoogleAdsLinks, Streams, AccessBindings) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found. */
export interface DeleteAccountsRequest {
  /** Required. The name of the Account to soft-delete. Format: accounts/{account} Example: "accounts/100" */
  name: string;
}

export const DeleteAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRequest>;

export type DeleteAccountsResponse = GoogleProtobufEmpty;
export const DeleteAccountsResponse = GoogleProtobufEmpty;

export type DeleteAccountsError = CommonErrors;

export const deleteAccounts: API.OperationMethod<DeleteAccountsRequest, DeleteAccountsResponse, DeleteAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsRequest,
  output: DeleteAccountsResponse,
  errors: [],
}));

/** Updates an account. */
export interface PatchAccountsRequest {
  /** Output only. Resource name of this account. Format: accounts/{account} Example: "accounts/100" */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (for example, "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaAccount;
}

export const PatchAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/accounts/{accountsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRequest>;

export type PatchAccountsResponse = GoogleAnalyticsAdminV1betaAccount;
export const PatchAccountsResponse = GoogleAnalyticsAdminV1betaAccount;

export type PatchAccountsError = CommonErrors;

export const patchAccounts: API.OperationMethod<PatchAccountsRequest, PatchAccountsResponse, PatchAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsRequest,
  output: PatchAccountsResponse,
  errors: [],
}));

/** Requests a ticket for creating an account. */
export interface ProvisionAccountTicketAccountsRequest {
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest;
}

export const ProvisionAccountTicketAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/accounts:provisionAccountTicket", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionAccountTicketAccountsRequest>;

export type ProvisionAccountTicketAccountsResponse = GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse;
export const ProvisionAccountTicketAccountsResponse = GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse;

export type ProvisionAccountTicketAccountsError = CommonErrors;

export const provisionAccountTicketAccounts: API.OperationMethod<ProvisionAccountTicketAccountsRequest, ProvisionAccountTicketAccountsResponse, ProvisionAccountTicketAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionAccountTicketAccountsRequest,
  output: ProvisionAccountTicketAccountsResponse,
  errors: [],
}));

/** Get data sharing settings on an account. Data sharing settings are singletons. */
export interface GetDataSharingSettingsAccountsRequest {
  /** Required. The name of the settings to lookup. Format: accounts/{account}/dataSharingSettings Example: `accounts/1000/dataSharingSettings` */
  name: string;
}

export const GetDataSharingSettingsAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accounts/{accountsId}/dataSharingSettings" }),
  svc,
) as unknown as Schema.Schema<GetDataSharingSettingsAccountsRequest>;

export type GetDataSharingSettingsAccountsResponse = GoogleAnalyticsAdminV1betaDataSharingSettings;
export const GetDataSharingSettingsAccountsResponse = GoogleAnalyticsAdminV1betaDataSharingSettings;

export type GetDataSharingSettingsAccountsError = CommonErrors;

export const getDataSharingSettingsAccounts: API.OperationMethod<GetDataSharingSettingsAccountsRequest, GetDataSharingSettingsAccountsResponse, GetDataSharingSettingsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDataSharingSettingsAccountsRequest,
  output: GetDataSharingSettingsAccountsResponse,
  errors: [],
}));

/** Searches through all changes to an account or its children given the specified set of filters. Only returns the subset of changes supported by the API. The UI may return additional changes. */
export interface SearchChangeHistoryEventsAccountsRequest {
  /** Required. The account resource for which to return change history resources. Format: accounts/{account} Example: `accounts/100` */
  account: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest;
}

export const SearchChangeHistoryEventsAccountsRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/accounts/{accountsId}:searchChangeHistoryEvents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchChangeHistoryEventsAccountsRequest>;

export type SearchChangeHistoryEventsAccountsResponse = GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse;
export const SearchChangeHistoryEventsAccountsResponse = GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse;

export type SearchChangeHistoryEventsAccountsError = CommonErrors;

export const searchChangeHistoryEventsAccounts: API.OperationMethod<SearchChangeHistoryEventsAccountsRequest, SearchChangeHistoryEventsAccountsResponse, SearchChangeHistoryEventsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchChangeHistoryEventsAccountsRequest,
  output: SearchChangeHistoryEventsAccountsResponse,
  errors: [],
}));

/** Returns a customized report of data access records. The report provides records of each time a user reads Google Analytics reporting data. Access records are retained for up to 2 years. Data Access Reports can be requested for a property. Reports may be requested for any property, but dimensions that aren't related to quota can only be requested on Google Analytics 360 properties. This method is only available to Administrators. These data access records include GA UI Reporting, GA UI Explorations, GA Data API, and other products like Firebase & Admob that can retrieve data from Google Analytics through a linkage. These records don't include property configuration changes like adding a stream or changing a property's time zone. For configuration change history, see [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents). To give your feedback on this API, complete the [Google Analytics Access Reports feedback](https://docs.google.com/forms/d/e/1FAIpQLSdmEBUrMzAEdiEKk5TV5dEHvDUZDRlgWYdQdAeSdtR4hVjEhw/viewform) form. */
export interface RunAccessReportAccountsRequest {
  /** The Data Access Report supports requesting at the property level or account level. If requested at the account level, Data Access Reports include all access for all properties under that account. To request at the property level, entity should be for example 'properties/123' if "123" is your Google Analytics property ID. To request at the account level, entity should be for example 'accounts/1234' if "1234" is your Google Analytics Account ID. */
  entity: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaRunAccessReportRequest;
}

export const RunAccessReportAccountsRequest = Schema.Struct({
  entity: Schema.String.pipe(T.HttpPath("entity")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaRunAccessReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/accounts/{accountsId}:runAccessReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunAccessReportAccountsRequest>;

export type RunAccessReportAccountsResponse = GoogleAnalyticsAdminV1betaRunAccessReportResponse;
export const RunAccessReportAccountsResponse = GoogleAnalyticsAdminV1betaRunAccessReportResponse;

export type RunAccessReportAccountsError = CommonErrors;

export const runAccessReportAccounts: API.OperationMethod<RunAccessReportAccountsRequest, RunAccessReportAccountsResponse, RunAccessReportAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunAccessReportAccountsRequest,
  output: RunAccessReportAccountsResponse,
  errors: [],
}));

/** Returns summaries of all accounts accessible by the caller. */
export interface ListAccountSummariesRequest {
  /** The maximum number of AccountSummary resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListAccountSummaries` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountSummaries` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountSummariesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/accountSummaries" }),
  svc,
) as unknown as Schema.Schema<ListAccountSummariesRequest>;

export type ListAccountSummariesResponse = GoogleAnalyticsAdminV1betaListAccountSummariesResponse;
export const ListAccountSummariesResponse = GoogleAnalyticsAdminV1betaListAccountSummariesResponse;

export type ListAccountSummariesError = CommonErrors;

export const listAccountSummaries = API.makePaginated(() => ({
  input: ListAccountSummariesRequest,
  output: ListAccountSummariesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lookup for a single GA Property. */
export interface GetPropertiesRequest {
  /** Required. The name of the property to lookup. Format: properties/{property_id} Example: "properties/1000" */
  name: string;
}

export const GetPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesRequest>;

export type GetPropertiesResponse = GoogleAnalyticsAdminV1betaProperty;
export const GetPropertiesResponse = GoogleAnalyticsAdminV1betaProperty;

export type GetPropertiesError = CommonErrors;

export const getProperties: API.OperationMethod<GetPropertiesRequest, GetPropertiesResponse, GetPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesRequest,
  output: GetPropertiesResponse,
  errors: [],
}));

/** Returns child Properties under the specified parent Account. Properties will be excluded if the caller does not have access. Soft-deleted (ie: "trashed") properties are excluded by default. Returns an empty list if no relevant properties are found. */
export interface ListPropertiesRequest {
  /** Required. An expression for filtering the results of the request. Fields eligible for filtering are: `parent:`(The resource name of the parent account/property) or `ancestor:`(The resource name of the parent account) or `firebase_project:`(The id or number of the linked firebase project). Some examples of filters: ``` | Filter | Description | |-----------------------------|-------------------------------------------| | parent:accounts/123 | The account with account id: 123. | | parent:properties/123 | The property with property id: 123. | | ancestor:accounts/123 | The account with account id: 123. | | firebase_project:project-id | The firebase project with id: project-id. | | firebase_project:123 | The firebase project with number: 123. | ``` */
  filter?: string;
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListProperties` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListProperties` must match the call that provided the page token. */
  pageToken?: string;
  /** Whether to include soft-deleted (ie: "trashed") Properties in the results. Properties can be inspected to determine whether they are deleted or not. */
  showDeleted?: boolean;
}

export const ListPropertiesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesRequest>;

export type ListPropertiesResponse = GoogleAnalyticsAdminV1betaListPropertiesResponse;
export const ListPropertiesResponse = GoogleAnalyticsAdminV1betaListPropertiesResponse;

export type ListPropertiesError = CommonErrors;

export const listProperties = API.makePaginated(() => ({
  input: ListPropertiesRequest,
  output: ListPropertiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a Google Analytics property with the specified location and attributes. */
export interface CreatePropertiesRequest {
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaProperty;
}

export const CreatePropertiesRequest = Schema.Struct({
  body: Schema.optional(GoogleAnalyticsAdminV1betaProperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesRequest>;

export type CreatePropertiesResponse = GoogleAnalyticsAdminV1betaProperty;
export const CreatePropertiesResponse = GoogleAnalyticsAdminV1betaProperty;

export type CreatePropertiesError = CommonErrors;

export const createProperties: API.OperationMethod<CreatePropertiesRequest, CreatePropertiesResponse, CreatePropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesRequest,
  output: CreatePropertiesResponse,
  errors: [],
}));

/** Marks target Property as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted properties. However, they can be restored using the Trash Can UI. If the properties are not restored before the expiration time, the Property and all child resources (eg: GoogleAdsLinks, Streams, AccessBindings) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found. */
export interface DeletePropertiesRequest {
  /** Required. The name of the Property to soft-delete. Format: properties/{property_id} Example: "properties/1000" */
  name: string;
}

export const DeletePropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesRequest>;

export type DeletePropertiesResponse = GoogleAnalyticsAdminV1betaProperty;
export const DeletePropertiesResponse = GoogleAnalyticsAdminV1betaProperty;

export type DeletePropertiesError = CommonErrors;

export const deleteProperties: API.OperationMethod<DeletePropertiesRequest, DeletePropertiesResponse, DeletePropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesRequest,
  output: DeletePropertiesResponse,
  errors: [],
}));

/** Updates a property. */
export interface PatchPropertiesRequest {
  /** Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000" */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaProperty;
}

export const PatchPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaProperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesRequest>;

export type PatchPropertiesResponse = GoogleAnalyticsAdminV1betaProperty;
export const PatchPropertiesResponse = GoogleAnalyticsAdminV1betaProperty;

export type PatchPropertiesError = CommonErrors;

export const patchProperties: API.OperationMethod<PatchPropertiesRequest, PatchPropertiesResponse, PatchPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesRequest,
  output: PatchPropertiesResponse,
  errors: [],
}));

/** Acknowledges the terms of user data collection for the specified property. This acknowledgement must be completed (either in the Google Analytics UI or through this API) before MeasurementProtocolSecret resources may be created. */
export interface AcknowledgeUserDataCollectionPropertiesRequest {
  /** Required. The property for which to acknowledge user data collection. */
  property: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest;
}

export const AcknowledgeUserDataCollectionPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:acknowledgeUserDataCollection", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcknowledgeUserDataCollectionPropertiesRequest>;

export type AcknowledgeUserDataCollectionPropertiesResponse = GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse;
export const AcknowledgeUserDataCollectionPropertiesResponse = GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse;

export type AcknowledgeUserDataCollectionPropertiesError = CommonErrors;

export const acknowledgeUserDataCollectionProperties: API.OperationMethod<AcknowledgeUserDataCollectionPropertiesRequest, AcknowledgeUserDataCollectionPropertiesResponse, AcknowledgeUserDataCollectionPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcknowledgeUserDataCollectionPropertiesRequest,
  output: AcknowledgeUserDataCollectionPropertiesResponse,
  errors: [],
}));

/** Returns the singleton data retention settings for this property. */
export interface GetDataRetentionSettingsPropertiesRequest {
  /** Required. The name of the settings to lookup. Format: properties/{property}/dataRetentionSettings Example: "properties/1000/dataRetentionSettings" */
  name: string;
}

export const GetDataRetentionSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/dataRetentionSettings" }),
  svc,
) as unknown as Schema.Schema<GetDataRetentionSettingsPropertiesRequest>;

export type GetDataRetentionSettingsPropertiesResponse = GoogleAnalyticsAdminV1betaDataRetentionSettings;
export const GetDataRetentionSettingsPropertiesResponse = GoogleAnalyticsAdminV1betaDataRetentionSettings;

export type GetDataRetentionSettingsPropertiesError = CommonErrors;

export const getDataRetentionSettingsProperties: API.OperationMethod<GetDataRetentionSettingsPropertiesRequest, GetDataRetentionSettingsPropertiesResponse, GetDataRetentionSettingsPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDataRetentionSettingsPropertiesRequest,
  output: GetDataRetentionSettingsPropertiesResponse,
  errors: [],
}));

/** Updates the singleton data retention settings for this property. */
export interface UpdateDataRetentionSettingsPropertiesRequest {
  /** Output only. Resource name for this DataRetentionSetting resource. Format: properties/{property}/dataRetentionSettings */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaDataRetentionSettings;
}

export const UpdateDataRetentionSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaDataRetentionSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/dataRetentionSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDataRetentionSettingsPropertiesRequest>;

export type UpdateDataRetentionSettingsPropertiesResponse = GoogleAnalyticsAdminV1betaDataRetentionSettings;
export const UpdateDataRetentionSettingsPropertiesResponse = GoogleAnalyticsAdminV1betaDataRetentionSettings;

export type UpdateDataRetentionSettingsPropertiesError = CommonErrors;

export const updateDataRetentionSettingsProperties: API.OperationMethod<UpdateDataRetentionSettingsPropertiesRequest, UpdateDataRetentionSettingsPropertiesResponse, UpdateDataRetentionSettingsPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDataRetentionSettingsPropertiesRequest,
  output: UpdateDataRetentionSettingsPropertiesResponse,
  errors: [],
}));

/** Returns a customized report of data access records. The report provides records of each time a user reads Google Analytics reporting data. Access records are retained for up to 2 years. Data Access Reports can be requested for a property. Reports may be requested for any property, but dimensions that aren't related to quota can only be requested on Google Analytics 360 properties. This method is only available to Administrators. These data access records include GA UI Reporting, GA UI Explorations, GA Data API, and other products like Firebase & Admob that can retrieve data from Google Analytics through a linkage. These records don't include property configuration changes like adding a stream or changing a property's time zone. For configuration change history, see [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents). To give your feedback on this API, complete the [Google Analytics Access Reports feedback](https://docs.google.com/forms/d/e/1FAIpQLSdmEBUrMzAEdiEKk5TV5dEHvDUZDRlgWYdQdAeSdtR4hVjEhw/viewform) form. */
export interface RunAccessReportPropertiesRequest {
  /** The Data Access Report supports requesting at the property level or account level. If requested at the account level, Data Access Reports include all access for all properties under that account. To request at the property level, entity should be for example 'properties/123' if "123" is your Google Analytics property ID. To request at the account level, entity should be for example 'accounts/1234' if "1234" is your Google Analytics Account ID. */
  entity: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaRunAccessReportRequest;
}

export const RunAccessReportPropertiesRequest = Schema.Struct({
  entity: Schema.String.pipe(T.HttpPath("entity")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaRunAccessReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}:runAccessReport", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunAccessReportPropertiesRequest>;

export type RunAccessReportPropertiesResponse = GoogleAnalyticsAdminV1betaRunAccessReportResponse;
export const RunAccessReportPropertiesResponse = GoogleAnalyticsAdminV1betaRunAccessReportResponse;

export type RunAccessReportPropertiesError = CommonErrors;

export const runAccessReportProperties: API.OperationMethod<RunAccessReportPropertiesRequest, RunAccessReportPropertiesResponse, RunAccessReportPropertiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunAccessReportPropertiesRequest,
  output: RunAccessReportPropertiesResponse,
  errors: [],
}));

/** Creates a FirebaseLink. Properties can have at most one FirebaseLink. */
export interface CreatePropertiesFirebaseLinksRequest {
  /** Required. Format: properties/{property_id} Example: `properties/1234` */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaFirebaseLink;
}

export const CreatePropertiesFirebaseLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaFirebaseLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/firebaseLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesFirebaseLinksRequest>;

export type CreatePropertiesFirebaseLinksResponse = GoogleAnalyticsAdminV1betaFirebaseLink;
export const CreatePropertiesFirebaseLinksResponse = GoogleAnalyticsAdminV1betaFirebaseLink;

export type CreatePropertiesFirebaseLinksError = CommonErrors;

export const createPropertiesFirebaseLinks: API.OperationMethod<CreatePropertiesFirebaseLinksRequest, CreatePropertiesFirebaseLinksResponse, CreatePropertiesFirebaseLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesFirebaseLinksRequest,
  output: CreatePropertiesFirebaseLinksResponse,
  errors: [],
}));

/** Deletes a FirebaseLink on a property */
export interface DeletePropertiesFirebaseLinksRequest {
  /** Required. Format: properties/{property_id}/firebaseLinks/{firebase_link_id} Example: `properties/1234/firebaseLinks/5678` */
  name: string;
}

export const DeletePropertiesFirebaseLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}/firebaseLinks/{firebaseLinksId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesFirebaseLinksRequest>;

export type DeletePropertiesFirebaseLinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesFirebaseLinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesFirebaseLinksError = CommonErrors;

export const deletePropertiesFirebaseLinks: API.OperationMethod<DeletePropertiesFirebaseLinksRequest, DeletePropertiesFirebaseLinksResponse, DeletePropertiesFirebaseLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesFirebaseLinksRequest,
  output: DeletePropertiesFirebaseLinksResponse,
  errors: [],
}));

/** Lists FirebaseLinks on a property. Properties can have at most one FirebaseLink. */
export interface ListPropertiesFirebaseLinksRequest {
  /** Required. Format: properties/{property_id} Example: `properties/1234` */
  parent: string;
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListFirebaseLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFirebaseLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesFirebaseLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/firebaseLinks" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesFirebaseLinksRequest>;

export type ListPropertiesFirebaseLinksResponse = GoogleAnalyticsAdminV1betaListFirebaseLinksResponse;
export const ListPropertiesFirebaseLinksResponse = GoogleAnalyticsAdminV1betaListFirebaseLinksResponse;

export type ListPropertiesFirebaseLinksError = CommonErrors;

export const listPropertiesFirebaseLinks = API.makePaginated(() => ({
  input: ListPropertiesFirebaseLinksRequest,
  output: ListPropertiesFirebaseLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a GoogleAdsLink. */
export interface CreatePropertiesGoogleAdsLinksRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaGoogleAdsLink;
}

export const CreatePropertiesGoogleAdsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaGoogleAdsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/googleAdsLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesGoogleAdsLinksRequest>;

export type CreatePropertiesGoogleAdsLinksResponse = GoogleAnalyticsAdminV1betaGoogleAdsLink;
export const CreatePropertiesGoogleAdsLinksResponse = GoogleAnalyticsAdminV1betaGoogleAdsLink;

export type CreatePropertiesGoogleAdsLinksError = CommonErrors;

export const createPropertiesGoogleAdsLinks: API.OperationMethod<CreatePropertiesGoogleAdsLinksRequest, CreatePropertiesGoogleAdsLinksResponse, CreatePropertiesGoogleAdsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesGoogleAdsLinksRequest,
  output: CreatePropertiesGoogleAdsLinksResponse,
  errors: [],
}));

/** Updates a GoogleAdsLink on a property */
export interface PatchPropertiesGoogleAdsLinksRequest {
  /** Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID. */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaGoogleAdsLink;
}

export const PatchPropertiesGoogleAdsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaGoogleAdsLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/googleAdsLinks/{googleAdsLinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesGoogleAdsLinksRequest>;

export type PatchPropertiesGoogleAdsLinksResponse = GoogleAnalyticsAdminV1betaGoogleAdsLink;
export const PatchPropertiesGoogleAdsLinksResponse = GoogleAnalyticsAdminV1betaGoogleAdsLink;

export type PatchPropertiesGoogleAdsLinksError = CommonErrors;

export const patchPropertiesGoogleAdsLinks: API.OperationMethod<PatchPropertiesGoogleAdsLinksRequest, PatchPropertiesGoogleAdsLinksResponse, PatchPropertiesGoogleAdsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesGoogleAdsLinksRequest,
  output: PatchPropertiesGoogleAdsLinksResponse,
  errors: [],
}));

/** Deletes a GoogleAdsLink on a property */
export interface DeletePropertiesGoogleAdsLinksRequest {
  /** Required. Example format: properties/1234/googleAdsLinks/5678 */
  name: string;
}

export const DeletePropertiesGoogleAdsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}/googleAdsLinks/{googleAdsLinksId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesGoogleAdsLinksRequest>;

export type DeletePropertiesGoogleAdsLinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesGoogleAdsLinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesGoogleAdsLinksError = CommonErrors;

export const deletePropertiesGoogleAdsLinks: API.OperationMethod<DeletePropertiesGoogleAdsLinksRequest, DeletePropertiesGoogleAdsLinksResponse, DeletePropertiesGoogleAdsLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesGoogleAdsLinksRequest,
  output: DeletePropertiesGoogleAdsLinksResponse,
  errors: [],
}));

/** Lists GoogleAdsLinks on a property. */
export interface ListPropertiesGoogleAdsLinksRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** A page token, received from a previous `ListGoogleAdsLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGoogleAdsLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesGoogleAdsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/googleAdsLinks" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesGoogleAdsLinksRequest>;

export type ListPropertiesGoogleAdsLinksResponse = GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse;
export const ListPropertiesGoogleAdsLinksResponse = GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse;

export type ListPropertiesGoogleAdsLinksError = CommonErrors;

export const listPropertiesGoogleAdsLinks = API.makePaginated(() => ({
  input: ListPropertiesGoogleAdsLinksRequest,
  output: ListPropertiesGoogleAdsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deprecated: Use `CreateKeyEvent` instead. Creates a conversion event with the specified attributes. */
export interface CreatePropertiesConversionEventsRequest {
  /** Required. The resource name of the parent property where this conversion event will be created. Format: properties/123 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaConversionEvent;
}

export const CreatePropertiesConversionEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaConversionEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/conversionEvents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesConversionEventsRequest>;

export type CreatePropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaConversionEvent;
export const CreatePropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaConversionEvent;

export type CreatePropertiesConversionEventsError = CommonErrors;

export const createPropertiesConversionEvents: API.OperationMethod<CreatePropertiesConversionEventsRequest, CreatePropertiesConversionEventsResponse, CreatePropertiesConversionEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesConversionEventsRequest,
  output: CreatePropertiesConversionEventsResponse,
  errors: [],
}));

/** Deprecated: Use `UpdateKeyEvent` instead. Updates a conversion event with the specified attributes. */
export interface PatchPropertiesConversionEventsRequest {
  /** Output only. Resource name of this conversion event. Format: properties/{property}/conversionEvents/{conversion_event} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaConversionEvent;
}

export const PatchPropertiesConversionEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaConversionEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/conversionEvents/{conversionEventsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesConversionEventsRequest>;

export type PatchPropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaConversionEvent;
export const PatchPropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaConversionEvent;

export type PatchPropertiesConversionEventsError = CommonErrors;

export const patchPropertiesConversionEvents: API.OperationMethod<PatchPropertiesConversionEventsRequest, PatchPropertiesConversionEventsResponse, PatchPropertiesConversionEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesConversionEventsRequest,
  output: PatchPropertiesConversionEventsResponse,
  errors: [],
}));

/** Deprecated: Use `GetKeyEvent` instead. Retrieve a single conversion event. */
export interface GetPropertiesConversionEventsRequest {
  /** Required. The resource name of the conversion event to retrieve. Format: properties/{property}/conversionEvents/{conversion_event} Example: "properties/123/conversionEvents/456" */
  name: string;
}

export const GetPropertiesConversionEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/conversionEvents/{conversionEventsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesConversionEventsRequest>;

export type GetPropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaConversionEvent;
export const GetPropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaConversionEvent;

export type GetPropertiesConversionEventsError = CommonErrors;

export const getPropertiesConversionEvents: API.OperationMethod<GetPropertiesConversionEventsRequest, GetPropertiesConversionEventsResponse, GetPropertiesConversionEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesConversionEventsRequest,
  output: GetPropertiesConversionEventsResponse,
  errors: [],
}));

/** Deprecated: Use `DeleteKeyEvent` instead. Deletes a conversion event in a property. */
export interface DeletePropertiesConversionEventsRequest {
  /** Required. The resource name of the conversion event to delete. Format: properties/{property}/conversionEvents/{conversion_event} Example: "properties/123/conversionEvents/456" */
  name: string;
}

export const DeletePropertiesConversionEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}/conversionEvents/{conversionEventsId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesConversionEventsRequest>;

export type DeletePropertiesConversionEventsResponse = GoogleProtobufEmpty;
export const DeletePropertiesConversionEventsResponse = GoogleProtobufEmpty;

export type DeletePropertiesConversionEventsError = CommonErrors;

export const deletePropertiesConversionEvents: API.OperationMethod<DeletePropertiesConversionEventsRequest, DeletePropertiesConversionEventsResponse, DeletePropertiesConversionEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesConversionEventsRequest,
  output: DeletePropertiesConversionEventsResponse,
  errors: [],
}));

/** Deprecated: Use `ListKeyEvents` instead. Returns a list of conversion events in the specified parent property. Returns an empty list if no conversion events are found. */
export interface ListPropertiesConversionEventsRequest {
  /** Required. The resource name of the parent property. Example: 'properties/123' */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListConversionEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConversionEvents` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesConversionEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/conversionEvents" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesConversionEventsRequest>;

export type ListPropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaListConversionEventsResponse;
export const ListPropertiesConversionEventsResponse = GoogleAnalyticsAdminV1betaListConversionEventsResponse;

export type ListPropertiesConversionEventsError = CommonErrors;

export const listPropertiesConversionEvents = API.makePaginated(() => ({
  input: ListPropertiesConversionEventsRequest,
  output: ListPropertiesConversionEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a Key Event. */
export interface CreatePropertiesKeyEventsRequest {
  /** Required. The resource name of the parent property where this Key Event will be created. Format: properties/123 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaKeyEvent;
}

export const CreatePropertiesKeyEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaKeyEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/keyEvents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesKeyEventsRequest>;

export type CreatePropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaKeyEvent;
export const CreatePropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaKeyEvent;

export type CreatePropertiesKeyEventsError = CommonErrors;

export const createPropertiesKeyEvents: API.OperationMethod<CreatePropertiesKeyEventsRequest, CreatePropertiesKeyEventsResponse, CreatePropertiesKeyEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesKeyEventsRequest,
  output: CreatePropertiesKeyEventsResponse,
  errors: [],
}));

/** Updates a Key Event. */
export interface PatchPropertiesKeyEventsRequest {
  /** Output only. Resource name of this key event. Format: properties/{property}/keyEvents/{key_event} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaKeyEvent;
}

export const PatchPropertiesKeyEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaKeyEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/keyEvents/{keyEventsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesKeyEventsRequest>;

export type PatchPropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaKeyEvent;
export const PatchPropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaKeyEvent;

export type PatchPropertiesKeyEventsError = CommonErrors;

export const patchPropertiesKeyEvents: API.OperationMethod<PatchPropertiesKeyEventsRequest, PatchPropertiesKeyEventsResponse, PatchPropertiesKeyEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesKeyEventsRequest,
  output: PatchPropertiesKeyEventsResponse,
  errors: [],
}));

/** Retrieve a single Key Event. */
export interface GetPropertiesKeyEventsRequest {
  /** Required. The resource name of the Key Event to retrieve. Format: properties/{property}/keyEvents/{key_event} Example: "properties/123/keyEvents/456" */
  name: string;
}

export const GetPropertiesKeyEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/keyEvents/{keyEventsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesKeyEventsRequest>;

export type GetPropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaKeyEvent;
export const GetPropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaKeyEvent;

export type GetPropertiesKeyEventsError = CommonErrors;

export const getPropertiesKeyEvents: API.OperationMethod<GetPropertiesKeyEventsRequest, GetPropertiesKeyEventsResponse, GetPropertiesKeyEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesKeyEventsRequest,
  output: GetPropertiesKeyEventsResponse,
  errors: [],
}));

/** Deletes a Key Event. */
export interface DeletePropertiesKeyEventsRequest {
  /** Required. The resource name of the Key Event to delete. Format: properties/{property}/keyEvents/{key_event} Example: "properties/123/keyEvents/456" */
  name: string;
}

export const DeletePropertiesKeyEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}/keyEvents/{keyEventsId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesKeyEventsRequest>;

export type DeletePropertiesKeyEventsResponse = GoogleProtobufEmpty;
export const DeletePropertiesKeyEventsResponse = GoogleProtobufEmpty;

export type DeletePropertiesKeyEventsError = CommonErrors;

export const deletePropertiesKeyEvents: API.OperationMethod<DeletePropertiesKeyEventsRequest, DeletePropertiesKeyEventsResponse, DeletePropertiesKeyEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesKeyEventsRequest,
  output: DeletePropertiesKeyEventsResponse,
  errors: [],
}));

/** Returns a list of Key Events in the specified parent property. Returns an empty list if no Key Events are found. */
export interface ListPropertiesKeyEventsRequest {
  /** Required. The resource name of the parent property. Example: 'properties/123' */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListKeyEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListKeyEvents` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesKeyEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/keyEvents" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesKeyEventsRequest>;

export type ListPropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaListKeyEventsResponse;
export const ListPropertiesKeyEventsResponse = GoogleAnalyticsAdminV1betaListKeyEventsResponse;

export type ListPropertiesKeyEventsError = CommonErrors;

export const listPropertiesKeyEvents = API.makePaginated(() => ({
  input: ListPropertiesKeyEventsRequest,
  output: ListPropertiesKeyEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a CustomDimension. */
export interface CreatePropertiesCustomDimensionsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaCustomDimension;
}

export const CreatePropertiesCustomDimensionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaCustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/customDimensions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesCustomDimensionsRequest>;

export type CreatePropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaCustomDimension;
export const CreatePropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaCustomDimension;

export type CreatePropertiesCustomDimensionsError = CommonErrors;

export const createPropertiesCustomDimensions: API.OperationMethod<CreatePropertiesCustomDimensionsRequest, CreatePropertiesCustomDimensionsResponse, CreatePropertiesCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesCustomDimensionsRequest,
  output: CreatePropertiesCustomDimensionsResponse,
  errors: [],
}));

/** Updates a CustomDimension on a property. */
export interface PatchPropertiesCustomDimensionsRequest {
  /** Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension} */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaCustomDimension;
}

export const PatchPropertiesCustomDimensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaCustomDimension).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/customDimensions/{customDimensionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesCustomDimensionsRequest>;

export type PatchPropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaCustomDimension;
export const PatchPropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaCustomDimension;

export type PatchPropertiesCustomDimensionsError = CommonErrors;

export const patchPropertiesCustomDimensions: API.OperationMethod<PatchPropertiesCustomDimensionsRequest, PatchPropertiesCustomDimensionsResponse, PatchPropertiesCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesCustomDimensionsRequest,
  output: PatchPropertiesCustomDimensionsResponse,
  errors: [],
}));

/** Lists CustomDimensions on a property. */
export interface ListPropertiesCustomDimensionsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** A page token, received from a previous `ListCustomDimensions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCustomDimensions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesCustomDimensionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/customDimensions" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesCustomDimensionsRequest>;

export type ListPropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaListCustomDimensionsResponse;
export const ListPropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaListCustomDimensionsResponse;

export type ListPropertiesCustomDimensionsError = CommonErrors;

export const listPropertiesCustomDimensions = API.makePaginated(() => ({
  input: ListPropertiesCustomDimensionsRequest,
  output: ListPropertiesCustomDimensionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Archives a CustomDimension on a property. */
export interface ArchivePropertiesCustomDimensionsRequest {
  /** Required. The name of the CustomDimension to archive. Example format: properties/1234/customDimensions/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest;
}

export const ArchivePropertiesCustomDimensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/customDimensions/{customDimensionsId}:archive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ArchivePropertiesCustomDimensionsRequest>;

export type ArchivePropertiesCustomDimensionsResponse = GoogleProtobufEmpty;
export const ArchivePropertiesCustomDimensionsResponse = GoogleProtobufEmpty;

export type ArchivePropertiesCustomDimensionsError = CommonErrors;

export const archivePropertiesCustomDimensions: API.OperationMethod<ArchivePropertiesCustomDimensionsRequest, ArchivePropertiesCustomDimensionsResponse, ArchivePropertiesCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ArchivePropertiesCustomDimensionsRequest,
  output: ArchivePropertiesCustomDimensionsResponse,
  errors: [],
}));

/** Lookup for a single CustomDimension. */
export interface GetPropertiesCustomDimensionsRequest {
  /** Required. The name of the CustomDimension to get. Example format: properties/1234/customDimensions/5678 */
  name: string;
}

export const GetPropertiesCustomDimensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/customDimensions/{customDimensionsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesCustomDimensionsRequest>;

export type GetPropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaCustomDimension;
export const GetPropertiesCustomDimensionsResponse = GoogleAnalyticsAdminV1betaCustomDimension;

export type GetPropertiesCustomDimensionsError = CommonErrors;

export const getPropertiesCustomDimensions: API.OperationMethod<GetPropertiesCustomDimensionsRequest, GetPropertiesCustomDimensionsResponse, GetPropertiesCustomDimensionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesCustomDimensionsRequest,
  output: GetPropertiesCustomDimensionsResponse,
  errors: [],
}));

/** Creates a CustomMetric. */
export interface CreatePropertiesCustomMetricsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaCustomMetric;
}

export const CreatePropertiesCustomMetricsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaCustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/customMetrics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesCustomMetricsRequest>;

export type CreatePropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaCustomMetric;
export const CreatePropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaCustomMetric;

export type CreatePropertiesCustomMetricsError = CommonErrors;

export const createPropertiesCustomMetrics: API.OperationMethod<CreatePropertiesCustomMetricsRequest, CreatePropertiesCustomMetricsResponse, CreatePropertiesCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesCustomMetricsRequest,
  output: CreatePropertiesCustomMetricsResponse,
  errors: [],
}));

/** Updates a CustomMetric on a property. */
export interface PatchPropertiesCustomMetricsRequest {
  /** Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric} */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaCustomMetric;
}

export const PatchPropertiesCustomMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaCustomMetric).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/customMetrics/{customMetricsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesCustomMetricsRequest>;

export type PatchPropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaCustomMetric;
export const PatchPropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaCustomMetric;

export type PatchPropertiesCustomMetricsError = CommonErrors;

export const patchPropertiesCustomMetrics: API.OperationMethod<PatchPropertiesCustomMetricsRequest, PatchPropertiesCustomMetricsResponse, PatchPropertiesCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesCustomMetricsRequest,
  output: PatchPropertiesCustomMetricsResponse,
  errors: [],
}));

/** Lists CustomMetrics on a property. */
export interface ListPropertiesCustomMetricsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** A page token, received from a previous `ListCustomMetrics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCustomMetrics` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesCustomMetricsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/customMetrics" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesCustomMetricsRequest>;

export type ListPropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaListCustomMetricsResponse;
export const ListPropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaListCustomMetricsResponse;

export type ListPropertiesCustomMetricsError = CommonErrors;

export const listPropertiesCustomMetrics = API.makePaginated(() => ({
  input: ListPropertiesCustomMetricsRequest,
  output: ListPropertiesCustomMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Archives a CustomMetric on a property. */
export interface ArchivePropertiesCustomMetricsRequest {
  /** Required. The name of the CustomMetric to archive. Example format: properties/1234/customMetrics/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest;
}

export const ArchivePropertiesCustomMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/customMetrics/{customMetricsId}:archive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ArchivePropertiesCustomMetricsRequest>;

export type ArchivePropertiesCustomMetricsResponse = GoogleProtobufEmpty;
export const ArchivePropertiesCustomMetricsResponse = GoogleProtobufEmpty;

export type ArchivePropertiesCustomMetricsError = CommonErrors;

export const archivePropertiesCustomMetrics: API.OperationMethod<ArchivePropertiesCustomMetricsRequest, ArchivePropertiesCustomMetricsResponse, ArchivePropertiesCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ArchivePropertiesCustomMetricsRequest,
  output: ArchivePropertiesCustomMetricsResponse,
  errors: [],
}));

/** Lookup for a single CustomMetric. */
export interface GetPropertiesCustomMetricsRequest {
  /** Required. The name of the CustomMetric to get. Example format: properties/1234/customMetrics/5678 */
  name: string;
}

export const GetPropertiesCustomMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/customMetrics/{customMetricsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesCustomMetricsRequest>;

export type GetPropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaCustomMetric;
export const GetPropertiesCustomMetricsResponse = GoogleAnalyticsAdminV1betaCustomMetric;

export type GetPropertiesCustomMetricsError = CommonErrors;

export const getPropertiesCustomMetrics: API.OperationMethod<GetPropertiesCustomMetricsRequest, GetPropertiesCustomMetricsResponse, GetPropertiesCustomMetricsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesCustomMetricsRequest,
  output: GetPropertiesCustomMetricsResponse,
  errors: [],
}));

/** Creates a DataStream. */
export interface CreatePropertiesDataStreamsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaDataStream;
}

export const CreatePropertiesDataStreamsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaDataStream).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/dataStreams", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesDataStreamsRequest>;

export type CreatePropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaDataStream;
export const CreatePropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaDataStream;

export type CreatePropertiesDataStreamsError = CommonErrors;

export const createPropertiesDataStreams: API.OperationMethod<CreatePropertiesDataStreamsRequest, CreatePropertiesDataStreamsResponse, CreatePropertiesDataStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesDataStreamsRequest,
  output: CreatePropertiesDataStreamsResponse,
  errors: [],
}));

/** Deletes a DataStream on a property. */
export interface DeletePropertiesDataStreamsRequest {
  /** Required. The name of the DataStream to delete. Example format: properties/1234/dataStreams/5678 */
  name: string;
}

export const DeletePropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesDataStreamsRequest>;

export type DeletePropertiesDataStreamsResponse = GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsResponse = GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsError = CommonErrors;

export const deletePropertiesDataStreams: API.OperationMethod<DeletePropertiesDataStreamsRequest, DeletePropertiesDataStreamsResponse, DeletePropertiesDataStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesDataStreamsRequest,
  output: DeletePropertiesDataStreamsResponse,
  errors: [],
}));

/** Updates a DataStream on a property. */
export interface PatchPropertiesDataStreamsRequest {
  /** Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000" */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaDataStream;
}

export const PatchPropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaDataStream).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesDataStreamsRequest>;

export type PatchPropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaDataStream;
export const PatchPropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaDataStream;

export type PatchPropertiesDataStreamsError = CommonErrors;

export const patchPropertiesDataStreams: API.OperationMethod<PatchPropertiesDataStreamsRequest, PatchPropertiesDataStreamsResponse, PatchPropertiesDataStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesDataStreamsRequest,
  output: PatchPropertiesDataStreamsResponse,
  errors: [],
}));

/** Lists DataStreams on a property. */
export interface ListPropertiesDataStreamsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** A page token, received from a previous `ListDataStreams` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDataStreams` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesDataStreamsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/dataStreams" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesDataStreamsRequest>;

export type ListPropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaListDataStreamsResponse;
export const ListPropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaListDataStreamsResponse;

export type ListPropertiesDataStreamsError = CommonErrors;

export const listPropertiesDataStreams = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsRequest,
  output: ListPropertiesDataStreamsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lookup for a single DataStream. */
export interface GetPropertiesDataStreamsRequest {
  /** Required. The name of the DataStream to get. Example format: properties/1234/dataStreams/5678 */
  name: string;
}

export const GetPropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesDataStreamsRequest>;

export type GetPropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaDataStream;
export const GetPropertiesDataStreamsResponse = GoogleAnalyticsAdminV1betaDataStream;

export type GetPropertiesDataStreamsError = CommonErrors;

export const getPropertiesDataStreams: API.OperationMethod<GetPropertiesDataStreamsRequest, GetPropertiesDataStreamsResponse, GetPropertiesDataStreamsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesDataStreamsRequest,
  output: GetPropertiesDataStreamsResponse,
  errors: [],
}));

/** Lookup for a single MeasurementProtocolSecret. */
export interface GetPropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The name of the measurement protocol secret to lookup. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name: string;
}

export const GetPropertiesDataStreamsMeasurementProtocolSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets/{measurementProtocolSecretsId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type GetPropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
export const GetPropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;

export type GetPropertiesDataStreamsMeasurementProtocolSecretsError = CommonErrors;

export const getPropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<GetPropertiesDataStreamsMeasurementProtocolSecretsRequest, GetPropertiesDataStreamsMeasurementProtocolSecretsResponse, GetPropertiesDataStreamsMeasurementProtocolSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: GetPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

/** Returns child MeasurementProtocolSecrets under the specified parent Property. */
export interface ListPropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The resource name of the parent stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets */
  parent: string;
  /** The maximum number of resources to return. If unspecified, at most 10 resources will be returned. The maximum value is 10. Higher values will be coerced to the maximum. */
  pageSize?: number;
  /** A page token, received from a previous `ListMeasurementProtocolSecrets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMeasurementProtocolSecrets` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesDataStreamsMeasurementProtocolSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type ListPropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse;
export const ListPropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse;

export type ListPropertiesDataStreamsMeasurementProtocolSecretsError = CommonErrors;

export const listPropertiesDataStreamsMeasurementProtocolSecrets = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: ListPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a measurement protocol secret. */
export interface CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The parent resource where this secret will be created. Format: properties/{property}/dataStreams/{dataStream} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
}

export const CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaMeasurementProtocolSecret).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
export const CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;

export type CreatePropertiesDataStreamsMeasurementProtocolSecretsError = CommonErrors;

export const createPropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest, CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse, CreatePropertiesDataStreamsMeasurementProtocolSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

/** Deletes target MeasurementProtocolSecret. */
export interface DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The name of the MeasurementProtocolSecret to delete. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name: string;
}

export const DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets/{measurementProtocolSecretsId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsMeasurementProtocolSecretsError = CommonErrors;

export const deletePropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest, DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse, DeletePropertiesDataStreamsMeasurementProtocolSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

/** Updates a measurement protocol secret. */
export interface PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
}

export const PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1betaMeasurementProtocolSecret).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets/{measurementProtocolSecretsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
export const PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse = GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;

export type PatchPropertiesDataStreamsMeasurementProtocolSecretsError = CommonErrors;

export const patchPropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest, PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse, PatchPropertiesDataStreamsMeasurementProtocolSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

