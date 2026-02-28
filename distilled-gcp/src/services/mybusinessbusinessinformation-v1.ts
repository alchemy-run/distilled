// ==========================================================================
// My Business Business Information API (mybusinessbusinessinformation v1)
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
  name: "mybusinessbusinessinformation",
  version: "v1",
  rootUrl: "https://mybusinessbusinessinformation.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AttributeValueMetadata {
  /** The attribute value. */
  value?: unknown;
  /** The display name for this value, localized where available; otherwise, in English. The value display name is intended to be used in context with the attribute display name. For example, for a "WiFi" enum attribute, this could contain "Paid" to represent paid Wi-Fi. */
  displayName?: string;
}

export const AttributeValueMetadata: Schema.Schema<AttributeValueMetadata> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AttributeValueMetadata" }) as any as Schema.Schema<AttributeValueMetadata>;

export interface AttributeMetadata {
  /** The unique identifier for the attribute. */
  parent?: string;
  /** The value type for the attribute. Values set and retrieved should be expected to be of this type. */
  valueType?: "ATTRIBUTE_VALUE_TYPE_UNSPECIFIED" | "BOOL" | "ENUM" | "URL" | "REPEATED_ENUM" | (string & {});
  /** The localized display name for the attribute, if available; otherwise, the English display name. */
  displayName?: string;
  /** The localized display name of the group that contains this attribute, if available; otherwise, the English group name. Related attributes are collected into a group and should be displayed together under the heading given here. */
  groupDisplayName?: string;
  /** If true, the attribute supports multiple values. If false, only a single value should be provided. */
  repeatable?: boolean;
  /** For some types of attributes (for example, enums), a list of supported values and corresponding display names for those values is provided. */
  valueMetadata?: Array<AttributeValueMetadata>;
  /** If true, the attribute is deprecated and should no longer be used. If deprecated, updating this attribute will not result in an error, but updates will not be saved. At some point after being deprecated, the attribute will be removed entirely and it will become an error. */
  deprecated?: boolean;
}

export const AttributeMetadata: Schema.Schema<AttributeMetadata> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  groupDisplayName: Schema.optional(Schema.String),
  repeatable: Schema.optional(Schema.Boolean),
  valueMetadata: Schema.optional(Schema.Array(AttributeValueMetadata)),
  deprecated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AttributeMetadata" }) as any as Schema.Schema<AttributeMetadata>;

export interface ListAttributeMetadataResponse {
  /** A collection of attribute metadata for the available attributes. */
  attributeMetadata?: Array<AttributeMetadata>;
  /** If the number of attributes exceeded the requested page size, this field will be populated with a token to fetch the next page of attributes on a subsequent call to `attributes.list`. If there are no more attributes, this field will not be present in the response. */
  nextPageToken?: string;
}

export const ListAttributeMetadataResponse: Schema.Schema<ListAttributeMetadataResponse> = Schema.suspend(() => Schema.Struct({
  attributeMetadata: Schema.optional(Schema.Array(AttributeMetadata)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAttributeMetadataResponse" }) as any as Schema.Schema<ListAttributeMetadataResponse>;

export interface RepeatedEnumAttributeValue {
  /** Enum values that are set. */
  setValues?: Array<string>;
  /** Enum values that are unset. */
  unsetValues?: Array<string>;
}

export const RepeatedEnumAttributeValue: Schema.Schema<RepeatedEnumAttributeValue> = Schema.suspend(() => Schema.Struct({
  setValues: Schema.optional(Schema.Array(Schema.String)),
  unsetValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RepeatedEnumAttributeValue" }) as any as Schema.Schema<RepeatedEnumAttributeValue>;

export interface UriAttributeValue {
  /** Required. The proposed URI value for this attribute. */
  uri?: string;
}

export const UriAttributeValue: Schema.Schema<UriAttributeValue> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "UriAttributeValue" }) as any as Schema.Schema<UriAttributeValue>;

export interface Attribute {
  /** Required. The resource name for this attribute. */
  name?: string;
  /** Output only. The type of value that this attribute contains. This should be used to determine how to interpret the value. */
  valueType?: "ATTRIBUTE_VALUE_TYPE_UNSPECIFIED" | "BOOL" | "ENUM" | "URL" | "REPEATED_ENUM" | (string & {});
  /** The values for this attribute. The type of the values supplied must match that expected for that attribute. This is a repeated field where multiple attribute values may be provided. Attribute types only support one value. */
  values?: Array<unknown>;
  /** When the attribute value type is REPEATED_ENUM, this contains the attribute value, and the other values fields must be empty. */
  repeatedEnumValue?: RepeatedEnumAttributeValue;
  /** When the attribute value type is URL, this field contains the value(s) for this attribute, and the other values fields must be empty. */
  uriValues?: Array<UriAttributeValue>;
}

export const Attribute: Schema.Schema<Attribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  valueType: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.Unknown)),
  repeatedEnumValue: Schema.optional(RepeatedEnumAttributeValue),
  uriValues: Schema.optional(Schema.Array(UriAttributeValue)),
})).annotate({ identifier: "Attribute" }) as any as Schema.Schema<Attribute>;

export interface Attributes {
  /** Required. Google identifier for this location in the form of `locations/{location_id}/attributes`. */
  name?: string;
  /** A collection of attributes that need to be updated. */
  attributes?: Array<Attribute>;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(Attribute)),
})).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface ServiceType {
  /** Output only. A stable ID (provided by Google) for this service type. */
  serviceTypeId?: string;
  /** Output only. The human-readable display name for the service type. */
  displayName?: string;
}

export const ServiceType: Schema.Schema<ServiceType> = Schema.suspend(() => Schema.Struct({
  serviceTypeId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceType" }) as any as Schema.Schema<ServiceType>;

export interface MoreHoursType {
  /** Output only. A stable ID provided by Google for this hours type. */
  hoursTypeId?: string;
  /** Output only. The human-readable English display name for the hours type. */
  displayName?: string;
  /** Output only. The human-readable localized display name for the hours type. */
  localizedDisplayName?: string;
}

export const MoreHoursType: Schema.Schema<MoreHoursType> = Schema.suspend(() => Schema.Struct({
  hoursTypeId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  localizedDisplayName: Schema.optional(Schema.String),
})).annotate({ identifier: "MoreHoursType" }) as any as Schema.Schema<MoreHoursType>;

export interface Category {
  /** Required. A stable ID (provided by Google) for this category. The value must be specified when modifying the category (when creating or updating a location). */
  name?: string;
  /** Output only. The human-readable name of the category. This is set when reading the location. When modifying the location, `category_id` must be set. */
  displayName?: string;
  /** Output only. A list of all the service types that are available for this business category. */
  serviceTypes?: Array<ServiceType>;
  /** Output only. More hours types that are available for this business category. */
  moreHoursTypes?: Array<MoreHoursType>;
}

export const Category: Schema.Schema<Category> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  serviceTypes: Schema.optional(Schema.Array(ServiceType)),
  moreHoursTypes: Schema.optional(Schema.Array(MoreHoursType)),
})).annotate({ identifier: "Category" }) as any as Schema.Schema<Category>;

export interface ListCategoriesResponse {
  /** The matching categories based on the requested parameters. */
  categories?: Array<Category>;
  /** If the number of categories exceeded the requested page size, this field will be populated with a token to fetch the next page of categories on a subsequent call to `ListCategories`. */
  nextPageToken?: string;
}

export const ListCategoriesResponse: Schema.Schema<ListCategoriesResponse> = Schema.suspend(() => Schema.Struct({
  categories: Schema.optional(Schema.Array(Category)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCategoriesResponse" }) as any as Schema.Schema<ListCategoriesResponse>;

export interface BatchGetCategoriesResponse {
  /** Categories that match the GConcept ids provided in the request. They will not come in the same order as category ids in the request. */
  categories?: Array<Category>;
}

export const BatchGetCategoriesResponse: Schema.Schema<BatchGetCategoriesResponse> = Schema.suspend(() => Schema.Struct({
  categories: Schema.optional(Schema.Array(Category)),
})).annotate({ identifier: "BatchGetCategoriesResponse" }) as any as Schema.Schema<BatchGetCategoriesResponse>;

export interface ChainName {
  /** The display name for this chain. */
  displayName?: string;
  /** The BCP 47 code of language of the name. */
  languageCode?: string;
}

export const ChainName: Schema.Schema<ChainName> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ChainName" }) as any as Schema.Schema<ChainName>;

export interface ChainUri {
  /** The uri for this chain. */
  uri?: string;
}

export const ChainUri: Schema.Schema<ChainUri> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ChainUri" }) as any as Schema.Schema<ChainUri>;

export interface Chain {
  /** Required. The chain's resource name, in the format `chains/{chain_id}`. */
  name?: string;
  /** Names of the chain. */
  chainNames?: Array<ChainName>;
  /** Websites of the chain. */
  websites?: Array<ChainUri>;
  /** Number of locations that are part of this chain. */
  locationCount?: number;
}

export const Chain: Schema.Schema<Chain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  chainNames: Schema.optional(Schema.Array(ChainName)),
  websites: Schema.optional(Schema.Array(ChainUri)),
  locationCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Chain" }) as any as Schema.Schema<Chain>;

export interface SearchChainsResponse {
  /** Chains that match the queried chain_display_name in SearchChainsRequest. If there are no matches, this field will be empty. Results are listed in order of relevance. */
  chains?: Array<Chain>;
}

export const SearchChainsResponse: Schema.Schema<SearchChainsResponse> = Schema.suspend(() => Schema.Struct({
  chains: Schema.optional(Schema.Array(Chain)),
})).annotate({ identifier: "SearchChainsResponse" }) as any as Schema.Schema<SearchChainsResponse>;

export interface PhoneNumbers {
  /** Required. A phone number that connects to your individual business location as directly as possible. Use a local phone number instead of a central, call center helpline number whenever possible. */
  primaryPhone?: string;
  /** Optional. Up to two phone numbers (mobile or landline, no fax) at which your business can be called, in addition to your primary phone number. */
  additionalPhones?: Array<string>;
}

export const PhoneNumbers: Schema.Schema<PhoneNumbers> = Schema.suspend(() => Schema.Struct({
  primaryPhone: Schema.optional(Schema.String),
  additionalPhones: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PhoneNumbers" }) as any as Schema.Schema<PhoneNumbers>;

export interface Categories {
  /** Required. Category that best describes the core business this location engages in. */
  primaryCategory?: Category;
  /** Optional. Additional categories to describe your business. Categories help your customers find accurate, specific results for services they're interested in. To keep your business information accurate and live, make sure that you use as few categories as possible to describe your overall core business. Choose categories that are as specific as possible, but representative of your main business. */
  additionalCategories?: Array<Category>;
}

export const Categories: Schema.Schema<Categories> = Schema.suspend(() => Schema.Struct({
  primaryCategory: Schema.optional(Category),
  additionalCategories: Schema.optional(Schema.Array(Category)),
})).annotate({ identifier: "Categories" }) as any as Schema.Schema<Categories>;

export interface PostalAddress {
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. The name of the organization at the address. */
  organization?: string;
}

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.Number),
  regionCode: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  sortingCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  sublocality: Schema.optional(Schema.String),
  addressLines: Schema.optional(Schema.Array(Schema.String)),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
})).annotate({ identifier: "PostalAddress" }) as any as Schema.Schema<PostalAddress>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface TimePeriod {
  /** Required. Indicates the day of the week this period starts on. */
  openDay?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. Valid values are 00:00-24:00, where 24:00 represents midnight at the end of the specified day field. */
  openTime?: TimeOfDay;
  /** Required. Indicates the day of the week this period ends on. */
  closeDay?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Required. Valid values are 00:00-24:00, where 24:00 represents midnight at the end of the specified day field. */
  closeTime?: TimeOfDay;
}

export const TimePeriod: Schema.Schema<TimePeriod> = Schema.suspend(() => Schema.Struct({
  openDay: Schema.optional(Schema.String),
  openTime: Schema.optional(TimeOfDay),
  closeDay: Schema.optional(Schema.String),
  closeTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "TimePeriod" }) as any as Schema.Schema<TimePeriod>;

export interface BusinessHours {
  /** Required. A collection of times that this location is open for business. Each period represents a range of hours when the location is open during the week. */
  periods?: Array<TimePeriod>;
}

export const BusinessHours: Schema.Schema<BusinessHours> = Schema.suspend(() => Schema.Struct({
  periods: Schema.optional(Schema.Array(TimePeriod)),
})).annotate({ identifier: "BusinessHours" }) as any as Schema.Schema<BusinessHours>;

export interface Mybusinessbusinessinformation_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Mybusinessbusinessinformation_Date: Schema.Schema<Mybusinessbusinessinformation_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Mybusinessbusinessinformation_Date" }) as any as Schema.Schema<Mybusinessbusinessinformation_Date>;

export interface SpecialHourPeriod {
  /** Required. The calendar date this special hour period starts on. */
  startDate?: Mybusinessbusinessinformation_Date;
  /** Optional. Valid values are 00:00-24:00 where 24:00 represents midnight at the end of the specified day field. Must be specified if `closed` is false. */
  openTime?: TimeOfDay;
  /** Optional. The calendar date this special hour period ends on. If `end_date` field is not set, default to the date specified in `start_date`. If set, this field must be equal to or at most 1 day after `start_date`. */
  endDate?: Mybusinessbusinessinformation_Date;
  /** Optional. Valid values are 00:00-24:00, where 24:00 represents midnight at the end of the specified day field. Must be specified if `closed` is false. */
  closeTime?: TimeOfDay;
  /** Optional. If true, `end_date`, `open_time`, and `close_time` are ignored, and the date specified in `start_date` is treated as the location being closed for the entire day. */
  closed?: boolean;
}

export const SpecialHourPeriod: Schema.Schema<SpecialHourPeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Mybusinessbusinessinformation_Date),
  openTime: Schema.optional(TimeOfDay),
  endDate: Schema.optional(Mybusinessbusinessinformation_Date),
  closeTime: Schema.optional(TimeOfDay),
  closed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SpecialHourPeriod" }) as any as Schema.Schema<SpecialHourPeriod>;

export interface SpecialHours {
  /** Required. A list of exceptions to the business's regular hours. */
  specialHourPeriods?: Array<SpecialHourPeriod>;
}

export const SpecialHours: Schema.Schema<SpecialHours> = Schema.suspend(() => Schema.Struct({
  specialHourPeriods: Schema.optional(Schema.Array(SpecialHourPeriod)),
})).annotate({ identifier: "SpecialHours" }) as any as Schema.Schema<SpecialHours>;

export interface PlaceInfo {
  /** Required. The localized name of the place. For example, `Scottsdale, AZ`. */
  placeName?: string;
  /** Required. The ID of the place. Must correspond to a region. (https://developers.google.com/places/web-service/supported_types#table3) */
  placeId?: string;
}

export const PlaceInfo: Schema.Schema<PlaceInfo> = Schema.suspend(() => Schema.Struct({
  placeName: Schema.optional(Schema.String),
  placeId: Schema.optional(Schema.String),
})).annotate({ identifier: "PlaceInfo" }) as any as Schema.Schema<PlaceInfo>;

export interface Places {
  /** The areas represented by place IDs. Limited to a maximum of 20 places. */
  placeInfos?: Array<PlaceInfo>;
}

export const Places: Schema.Schema<Places> = Schema.suspend(() => Schema.Struct({
  placeInfos: Schema.optional(Schema.Array(PlaceInfo)),
})).annotate({ identifier: "Places" }) as any as Schema.Schema<Places>;

export interface ServiceAreaBusiness {
  /** Required. Indicates the type of the service area business. */
  businessType?: "BUSINESS_TYPE_UNSPECIFIED" | "CUSTOMER_LOCATION_ONLY" | "CUSTOMER_AND_BUSINESS_LOCATION" | (string & {});
  /** The area that this business serves defined through a set of places. */
  places?: Places;
  /** Immutable. CLDR region code of the country/region that this service area business is based in. See http://cldr.unicode.org/ and http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. This field is required for CUSTOMER_LOCATION_ONLY businesses, and is ignored otherwise. The region specified here can be different from regions for the areas that this business serves (e.g. service area businesses that provide services in regions other than the one that they are based in). If this location requires verification after creation, the address provided for verification purposes *must* be located within this region, and the business owner or their authorized representative *must* be able to receive postal mail at the provided verification address. */
  regionCode?: string;
}

export const ServiceAreaBusiness: Schema.Schema<ServiceAreaBusiness> = Schema.suspend(() => Schema.Struct({
  businessType: Schema.optional(Schema.String),
  places: Schema.optional(Places),
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceAreaBusiness" }) as any as Schema.Schema<ServiceAreaBusiness>;

export interface AdWordsLocationExtensions {
  /** Required. An alternate phone number to display on AdWords location extensions instead of the location's primary phone number. */
  adPhone?: string;
}

export const AdWordsLocationExtensions: Schema.Schema<AdWordsLocationExtensions> = Schema.suspend(() => Schema.Struct({
  adPhone: Schema.optional(Schema.String),
})).annotate({ identifier: "AdWordsLocationExtensions" }) as any as Schema.Schema<AdWordsLocationExtensions>;

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface OpenInfo {
  /** Required. Indicates whether or not the Location is currently open for business. All locations are open by default, unless updated to be closed. */
  status?: "OPEN_FOR_BUSINESS_UNSPECIFIED" | "OPEN" | "CLOSED_PERMANENTLY" | "CLOSED_TEMPORARILY" | (string & {});
  /** Output only. Indicates whether this business is eligible for re-open. */
  canReopen?: boolean;
  /** Optional. The date on which the location first opened. If the exact day is not known, month and year only can be provided. The date must be in the past or be no more than one year in the future. */
  openingDate?: Mybusinessbusinessinformation_Date;
}

export const OpenInfo: Schema.Schema<OpenInfo> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  canReopen: Schema.optional(Schema.Boolean),
  openingDate: Schema.optional(Mybusinessbusinessinformation_Date),
})).annotate({ identifier: "OpenInfo" }) as any as Schema.Schema<OpenInfo>;

export interface Metadata {
  /** Output only. Indicates whether the place ID associated with this location has updates that need to be updated or rejected by the client. If this boolean is set, you should call the `getGoogleUpdated` method to lookup information that's needs to be verified. */
  hasGoogleUpdated?: boolean;
  /** Output only. Indicates whether any of this Location's properties are in the edit pending state. */
  hasPendingEdits?: boolean;
  /** Output only. Indicates whether the location can be deleted using the API. */
  canDelete?: boolean;
  /** Output only. Indicates if the listing can manage local posts. Deprecated: This field is no longer populated and will be removed in a future version. */
  canOperateLocalPost?: boolean;
  /** Output only. Indicates if the listing can modify the service list. */
  canModifyServiceList?: boolean;
  /** Output only. Indicates if the listing is eligible for food menu. */
  canHaveFoodMenus?: boolean;
  /** Output only. Indicates whether the location can operate on Health data. */
  canOperateHealthData?: boolean;
  /** Output only. Indicates whether the location can operate on Lodging data. */
  canOperateLodgingData?: boolean;
  /** Output only. If this locationappears on Google Maps, this field is populated with the place ID for the location. This ID can be used in various Places APIs. This field can be set during Create calls, but not for Update. */
  placeId?: string;
  /** Output only. The location resource that this location duplicates. */
  duplicateLocation?: string;
  /** Output only. A link to the location on Maps. */
  mapsUri?: string;
  /** Output only. A link to the page on Google Search where a customer can leave a review for the location. */
  newReviewUri?: string;
  /** Output only. Indicates if the listing is eligible for business calls. */
  canHaveBusinessCalls?: boolean;
  /** Output only. Indicates if the listing has Voice of Merchant. If this boolean is false, you should call the locations.getVoiceOfMerchantState API to get details as to why they do not have Voice of Merchant. */
  hasVoiceOfMerchant?: boolean;
  /** Output only. */
  isParticularlyPersonalPlace?: boolean;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  hasGoogleUpdated: Schema.optional(Schema.Boolean),
  hasPendingEdits: Schema.optional(Schema.Boolean),
  canDelete: Schema.optional(Schema.Boolean),
  canOperateLocalPost: Schema.optional(Schema.Boolean),
  canModifyServiceList: Schema.optional(Schema.Boolean),
  canHaveFoodMenus: Schema.optional(Schema.Boolean),
  canOperateHealthData: Schema.optional(Schema.Boolean),
  canOperateLodgingData: Schema.optional(Schema.Boolean),
  placeId: Schema.optional(Schema.String),
  duplicateLocation: Schema.optional(Schema.String),
  mapsUri: Schema.optional(Schema.String),
  newReviewUri: Schema.optional(Schema.String),
  canHaveBusinessCalls: Schema.optional(Schema.Boolean),
  hasVoiceOfMerchant: Schema.optional(Schema.Boolean),
  isParticularlyPersonalPlace: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface Profile {
  /** Required. Description of the location in your own voice, not editable by anyone else. */
  description?: string;
}

export const Profile: Schema.Schema<Profile> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Profile" }) as any as Schema.Schema<Profile>;

export interface RelevantLocation {
  /** Required. Specify the location that is on the other side of the relation by its placeID. */
  placeId?: string;
  /** Required. The type of the relationship. */
  relationType?: "RELATION_TYPE_UNSPECIFIED" | "DEPARTMENT_OF" | "INDEPENDENT_ESTABLISHMENT_IN" | (string & {});
}

export const RelevantLocation: Schema.Schema<RelevantLocation> = Schema.suspend(() => Schema.Struct({
  placeId: Schema.optional(Schema.String),
  relationType: Schema.optional(Schema.String),
})).annotate({ identifier: "RelevantLocation" }) as any as Schema.Schema<RelevantLocation>;

export interface RelationshipData {
  /** The parent location that this location has relations with. */
  parentLocation?: RelevantLocation;
  /** The list of children locations that this location has relations with. */
  childrenLocations?: Array<RelevantLocation>;
  /** The resource name of the Chain that this location is member of. How to find Chain ID */
  parentChain?: string;
}

export const RelationshipData: Schema.Schema<RelationshipData> = Schema.suspend(() => Schema.Struct({
  parentLocation: Schema.optional(RelevantLocation),
  childrenLocations: Schema.optional(Schema.Array(RelevantLocation)),
  parentChain: Schema.optional(Schema.String),
})).annotate({ identifier: "RelationshipData" }) as any as Schema.Schema<RelationshipData>;

export interface MoreHours {
  /** Required. Type of hours. Clients should call {#link businessCategories:BatchGet} to get supported hours types for categories of their locations. */
  hoursTypeId?: string;
  /** Required. A collection of times that this location is open. Each period represents a range of hours when the location is open during the week. */
  periods?: Array<TimePeriod>;
}

export const MoreHours: Schema.Schema<MoreHours> = Schema.suspend(() => Schema.Struct({
  hoursTypeId: Schema.optional(Schema.String),
  periods: Schema.optional(Schema.Array(TimePeriod)),
})).annotate({ identifier: "MoreHours" }) as any as Schema.Schema<MoreHours>;

export interface StructuredServiceItem {
  /** Required. The `service_type_id` field is a Google provided unique ID that can be found in `ServiceType`. This information is provided by `BatchGetCategories` rpc service. */
  serviceTypeId?: string;
  /** Optional. Description of structured service item. The character limit is 300. */
  description?: string;
}

export const StructuredServiceItem: Schema.Schema<StructuredServiceItem> = Schema.suspend(() => Schema.Struct({
  serviceTypeId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "StructuredServiceItem" }) as any as Schema.Schema<StructuredServiceItem>;

export interface Label {
  /** Required. Display name for the price list, section, or item. */
  displayName?: string;
  /** Optional. Description of the price list, section, or item. */
  description?: string;
  /** Optional. The BCP-47 language code that these strings apply for. Only one set of labels may be set per language. */
  languageCode?: string;
}

export const Label: Schema.Schema<Label> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface FreeFormServiceItem {
  /** Required. This field represents the category name (i.e. the category's stable ID). The `category` and `service_type_id` should match the possible combinations provided in the `Category` message. */
  category?: string;
  /** Required. Language-tagged labels for the item. We recommend that item names be 140 characters or less, and descriptions 250 characters or less. This field should only be set if the input is a custom service item. Standardized service types should be updated via service_type_id. */
  label?: Label;
}

export const FreeFormServiceItem: Schema.Schema<FreeFormServiceItem> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  label: Schema.optional(Label),
})).annotate({ identifier: "FreeFormServiceItem" }) as any as Schema.Schema<FreeFormServiceItem>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface ServiceItem {
  /** Optional. This field will be set case of structured services data. */
  structuredServiceItem?: StructuredServiceItem;
  /** Optional. This field will be set case of free-form services data. */
  freeFormServiceItem?: FreeFormServiceItem;
  /** Optional. Represents the monetary price of the service item. We recommend that currency_code and units should be set when including a price. This will be treated as a fixed price for the service item. */
  price?: Money;
}

export const ServiceItem: Schema.Schema<ServiceItem> = Schema.suspend(() => Schema.Struct({
  structuredServiceItem: Schema.optional(StructuredServiceItem),
  freeFormServiceItem: Schema.optional(FreeFormServiceItem),
  price: Schema.optional(Money),
})).annotate({ identifier: "ServiceItem" }) as any as Schema.Schema<ServiceItem>;

export interface Location {
  /** Google identifier for this location in the form: `locations/{location_id}`. */
  name?: string;
  /** Immutable. The language of the location. Set during creation and not updateable. */
  languageCode?: string;
  /** Optional. External identifier for this location, which must be unique within a given account. This is a means of associating the location with your own records. */
  storeCode?: string;
  /** Required. Location name should reflect your business's real-world name, as used consistently on your storefront, website, and stationery, and as known to customers. Any additional information, when relevant, can be included in other fields of the resource (for example, `Address`, `Categories`). Don't add unnecessary information to your name (for example, prefer "Google" over "Google Inc. - Mountain View Corporate Headquarters"). Don't include marketing taglines, store codes, special characters, hours or closed/open status, phone numbers, website URLs, service/product information, location/address or directions, or containment information (for example, "Chase ATM in Duane Reade"). */
  title?: string;
  /** Optional. The different phone numbers that customers can use to get in touch with the business. */
  phoneNumbers?: PhoneNumbers;
  /** Optional. The different categories that describe the business. */
  categories?: Categories;
  /** Optional. A precise, accurate address to describe your business location. PO boxes or mailboxes located at remote locations are not acceptable. At this time, you can specify a maximum of five `address_lines` values in the address. This field should only be set for businesses that have a storefront. This field should not be set for locations of type `CUSTOMER_LOCATION_ONLY` but if set, any value provided will be discarded. */
  storefrontAddress?: PostalAddress;
  /** Optional. A URL for this business. If possible, use a URL that represents this individual business location instead of a generic website/URL that represents all locations, or the brand. */
  websiteUri?: string;
  /** Optional. Operating hours for the business. */
  regularHours?: BusinessHours;
  /** Optional. Special hours for the business. This typically includes holiday hours, and other times outside of regular operating hours. These override regular business hours. This field cannot be set without regular hours. */
  specialHours?: SpecialHours;
  /** Optional. Service area businesses provide their service at the customer's location. If this business is a service area business, this field describes the area(s) serviced by the business. */
  serviceArea?: ServiceAreaBusiness;
  /** Optional. A collection of free-form strings to allow you to tag your business. These labels are NOT user facing; only you can see them. Must be between 1-255 characters per label. */
  labels?: Array<string>;
  /** Optional. Additional information that is surfaced in AdWords. */
  adWordsLocationExtensions?: AdWordsLocationExtensions;
  /** Optional. User-provided latitude and longitude. When creating a location, this field is ignored if the provided address geocodes successfully. This field is only returned on get requests if the user-provided `latlng` value was accepted during create, or the `latlng` value was updated through the Google Business Profile website. This field can only be updated by approved clients. */
  latlng?: LatLng;
  /** Optional. A flag that indicates whether the location is currently open for business. */
  openInfo?: OpenInfo;
  /** Output only. Additional non-user-editable information. */
  metadata?: Metadata;
  /** Optional. Describes your business in your own voice and shares with users the unique story of your business and offerings. This field is required for all categories except lodging categories (e.g. hotels, motels, inns). */
  profile?: Profile;
  /** Optional. All locations and chain related to this one. */
  relationshipData?: RelationshipData;
  /** Optional. More hours for a business's different departments or specific customers. */
  moreHours?: Array<MoreHours>;
  /** Optional. List of services supported by merchants. A service can be haircut, install water heater, etc. Duplicated service items will be removed automatically. */
  serviceItems?: Array<ServiceItem>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  phoneNumbers: Schema.optional(PhoneNumbers),
  categories: Schema.optional(Categories),
  storefrontAddress: Schema.optional(PostalAddress),
  websiteUri: Schema.optional(Schema.String),
  regularHours: Schema.optional(BusinessHours),
  specialHours: Schema.optional(SpecialHours),
  serviceArea: Schema.optional(ServiceAreaBusiness),
  labels: Schema.optional(Schema.Array(Schema.String)),
  adWordsLocationExtensions: Schema.optional(AdWordsLocationExtensions),
  latlng: Schema.optional(LatLng),
  openInfo: Schema.optional(OpenInfo),
  metadata: Schema.optional(Metadata),
  profile: Schema.optional(Profile),
  relationshipData: Schema.optional(RelationshipData),
  moreHours: Schema.optional(Schema.Array(MoreHours)),
  serviceItems: Schema.optional(Schema.Array(ServiceItem)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface SearchGoogleLocationsRequest {
  /** Location to search for. If provided, will find locations which match the provided location details, which must include a value for the title. */
  location?: Location;
  /** Text query to search for. The search results from a query string will be less accurate than if providing an exact location, but can provide more inexact matches. */
  query?: string;
  /** The number of matches to return. The default value is 3, with a maximum of 10. Note that latency may increase if more are requested. There is no pagination. */
  pageSize?: number;
}

export const SearchGoogleLocationsRequest: Schema.Schema<SearchGoogleLocationsRequest> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Location),
  query: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "SearchGoogleLocationsRequest" }) as any as Schema.Schema<SearchGoogleLocationsRequest>;

export interface GoogleLocation {
  /** Resource name of this GoogleLocation, in the format `googleLocations/{googleLocationId}`. */
  name?: string;
  /** The sparsely populated Location information. This field can be re-used in CreateLocation if it is not currently claimed by a user. */
  location?: Location;
  /** A URL that will redirect the user to the request admin rights UI. This field is only present if the location has already been claimed by any user, including the current user. */
  requestAdminRightsUri?: string;
}

export const GoogleLocation: Schema.Schema<GoogleLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  location: Schema.optional(Location),
  requestAdminRightsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLocation" }) as any as Schema.Schema<GoogleLocation>;

export interface SearchGoogleLocationsResponse {
  /** A collection of GoogleLocations that are potential matches to the specified request, listed in order from most to least accuracy. */
  googleLocations?: Array<GoogleLocation>;
}

export const SearchGoogleLocationsResponse: Schema.Schema<SearchGoogleLocationsResponse> = Schema.suspend(() => Schema.Struct({
  googleLocations: Schema.optional(Schema.Array(GoogleLocation)),
})).annotate({ identifier: "SearchGoogleLocationsResponse" }) as any as Schema.Schema<SearchGoogleLocationsResponse>;

export interface ListLocationsResponse {
  /** The locations. */
  locations?: Array<Location>;
  /** If the number of locations exceeded the requested page size, this field is populated with a token to fetch the next page of locations on a subsequent call to `ListLocations`. If there are no more locations, this field is not present in the response. */
  nextPageToken?: string;
  /** The approximate number of Locations in the list irrespective of pagination. This field will only be returned if `filter` is used as a query parameter. */
  totalSize?: number;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface GoogleUpdatedLocation {
  /** The Google-updated version of this location. */
  location?: Location;
  /** The fields that Google updated. */
  diffMask?: string;
  /** The fields that have pending edits that haven't yet been pushed to Maps and Search. */
  pendingMask?: string;
}

export const GoogleUpdatedLocation: Schema.Schema<GoogleUpdatedLocation> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Location),
  diffMask: Schema.optional(Schema.String),
  pendingMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleUpdatedLocation" }) as any as Schema.Schema<GoogleUpdatedLocation>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns the list of attributes that would be available for a location with the given primary category and country. */
export interface ListAttributesRequest {
  /** Resource name of the location to look up available attributes. If this field is set, category_name, region_code, language_code and show_all are not required and must not be set. */
  parent?: string;
  /** The primary category stable ID to find available attributes. Must be of the format categories/{category_id}. */
  categoryName?: string;
  /** The ISO 3166-1 alpha-2 country code to find available attributes. */
  regionCode?: string;
  /** The BCP 47 code of language to get attribute display names in. If this language is not available, they will be provided in English. */
  languageCode?: string;
  /** Metadata for all available attributes are returned when this field is set to true, disregarding parent and category_name fields. language_code and region_code are required when show_all is set to true. */
  showAll?: boolean;
  /** How many attributes to include per page. Default is 200, minimum is 1. */
  pageSize?: number;
  /** If specified, the next page of attribute metadata is retrieved. */
  pageToken?: string;
}

export const ListAttributesRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  categoryName: Schema.optional(Schema.String).pipe(T.HttpQuery("categoryName")),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  showAll: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showAll")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/attributes" }),
  svc,
) as unknown as Schema.Schema<ListAttributesRequest>;

export type ListAttributesResponse = ListAttributeMetadataResponse;
export const ListAttributesResponse = ListAttributeMetadataResponse;

export type ListAttributesError = CommonErrors;

export const listAttributes = API.makePaginated(() => ({
  input: ListAttributesRequest,
  output: ListAttributesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update attributes for a given location. */
export interface UpdateAttributesLocationsRequest {
  /** Required. Google identifier for this location in the form of `locations/{location_id}/attributes`. */
  name: string;
  /** Required. Attribute name of attributes that you'd like to update. Represented by `attributes/{attribute}`. Updates: All attributes provided in the attributes field that you would like to update must be set in the `attribute_mask`. Attributes set in the above list but not in the `attribute_mask` will be ignored. Deletes: If you'd like to delete certain attributes, they must be specified in the `attribute_mask` with no matching entry in the attributes list. If you'd like to delete all attributes set on a location, you should look up all the applicable attributes for the location and then add them to the `attribute_mask` with an empty attributes field. */
  attributeMask?: string;
  /** Request body */
  body?: Attributes;
}

export const UpdateAttributesLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  attributeMask: Schema.optional(Schema.String).pipe(T.HttpQuery("attributeMask")),
  body: Schema.optional(Attributes).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/locations/{locationsId}/attributes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAttributesLocationsRequest>;

export type UpdateAttributesLocationsResponse = Attributes;
export const UpdateAttributesLocationsResponse = Attributes;

export type UpdateAttributesLocationsError = CommonErrors;

export const updateAttributesLocations: API.OperationMethod<UpdateAttributesLocationsRequest, UpdateAttributesLocationsResponse, UpdateAttributesLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAttributesLocationsRequest,
  output: UpdateAttributesLocationsResponse,
  errors: [],
}));

/** Looks up all the attributes set for a given location. */
export interface GetAttributesLocationsRequest {
  /** Required. Google identifier for this location in the form of `locations/{location_id}/attributes`. */
  name: string;
}

export const GetAttributesLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/attributes" }),
  svc,
) as unknown as Schema.Schema<GetAttributesLocationsRequest>;

export type GetAttributesLocationsResponse = Attributes;
export const GetAttributesLocationsResponse = Attributes;

export type GetAttributesLocationsError = CommonErrors;

export const getAttributesLocations: API.OperationMethod<GetAttributesLocationsRequest, GetAttributesLocationsResponse, GetAttributesLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAttributesLocationsRequest,
  output: GetAttributesLocationsResponse,
  errors: [],
}));

/** Returns the specified location. */
export interface GetLocationsRequest {
  /** Required. The name of the location to fetch. */
  name: string;
  /** Required. Read mask to specify what fields will be returned in the response. */
  readMask?: string;
}

export const GetLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsRequest>;

export type GetLocationsResponse = Location;
export const GetLocationsResponse = Location;

export type GetLocationsError = CommonErrors;

export const getLocations: API.OperationMethod<GetLocationsRequest, GetLocationsResponse, GetLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsRequest,
  output: GetLocationsResponse,
  errors: [],
}));

/** Gets the Google-updated version of the specified location. */
export interface GetGoogleUpdatedLocationsRequest {
  /** Required. The name of the location to fetch. */
  name: string;
  /** Required. Read mask to specify what fields will be returned in the response. */
  readMask?: string;
}

export const GetGoogleUpdatedLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}:getGoogleUpdated" }),
  svc,
) as unknown as Schema.Schema<GetGoogleUpdatedLocationsRequest>;

export type GetGoogleUpdatedLocationsResponse = GoogleUpdatedLocation;
export const GetGoogleUpdatedLocationsResponse = GoogleUpdatedLocation;

export type GetGoogleUpdatedLocationsError = CommonErrors;

export const getGoogleUpdatedLocations: API.OperationMethod<GetGoogleUpdatedLocationsRequest, GetGoogleUpdatedLocationsResponse, GetGoogleUpdatedLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGoogleUpdatedLocationsRequest,
  output: GetGoogleUpdatedLocationsResponse,
  errors: [],
}));

/** Updates the specified location. */
export interface PatchLocationsRequest {
  /** Google identifier for this location in the form: `locations/{location_id}`. */
  name: string;
  /** Required. The specific fields to update. */
  updateMask?: string;
  /** Optional. If true, the request is validated without actually updating the location. When this field is set, we will only return validation errors if there were any. The response will be empty if no errors were found. */
  validateOnly?: boolean;
  /** Request body */
  body?: Location;
}

export const PatchLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Location).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/locations/{locationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsRequest>;

export type PatchLocationsResponse = Location;
export const PatchLocationsResponse = Location;

export type PatchLocationsError = CommonErrors;

export const patchLocations: API.OperationMethod<PatchLocationsRequest, PatchLocationsResponse, PatchLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsRequest,
  output: PatchLocationsResponse,
  errors: [],
}));

/** Deletes a location. If this location cannot be deleted using the API and it is marked so in the `google.mybusiness.businessinformation.v1.LocationState`, use the [Google Business Profile](https://business.google.com/manage/) website. */
export interface DeleteLocationsRequest {
  /** Required. The name of the location to delete. */
  name: string;
}

export const DeleteLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsRequest>;

export type DeleteLocationsResponse = Empty;
export const DeleteLocationsResponse = Empty;

export type DeleteLocationsError = CommonErrors;

export const deleteLocations: API.OperationMethod<DeleteLocationsRequest, DeleteLocationsResponse, DeleteLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsRequest,
  output: DeleteLocationsResponse,
  errors: [],
}));

/** Gets the Google-updated version of the specified location. */
export interface GetGoogleUpdatedLocationsAttributesRequest {
  /** Required. Google identifier for this location in the form of `locations/{location_id}/attributes`. */
  name: string;
}

export const GetGoogleUpdatedLocationsAttributesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/attributes:getGoogleUpdated" }),
  svc,
) as unknown as Schema.Schema<GetGoogleUpdatedLocationsAttributesRequest>;

export type GetGoogleUpdatedLocationsAttributesResponse = Attributes;
export const GetGoogleUpdatedLocationsAttributesResponse = Attributes;

export type GetGoogleUpdatedLocationsAttributesError = CommonErrors;

export const getGoogleUpdatedLocationsAttributes: API.OperationMethod<GetGoogleUpdatedLocationsAttributesRequest, GetGoogleUpdatedLocationsAttributesResponse, GetGoogleUpdatedLocationsAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGoogleUpdatedLocationsAttributesRequest,
  output: GetGoogleUpdatedLocationsAttributesResponse,
  errors: [],
}));

/** Returns a list of business categories. Search will match the category name but not the category ID. Search only matches the front of a category name (that is, 'food' may return 'Food Court' but not 'Fast Food Restaurant'). */
export interface ListCategoriesRequest {
  /** Required. The ISO 3166-1 alpha-2 country code. */
  regionCode?: string;
  /** Required. The BCP 47 code of language. */
  languageCode?: string;
  /** Optional. Filter string from user. The only field that supported is `displayName`. Eg: `filter=displayName=foo`. */
  filter?: string;
  /** Optional. How many categories to fetch per page. Default is 100, minimum is 1, and maximum page size is 100. */
  pageSize?: number;
  /** Optional. If specified, the next page of categories will be fetched. */
  pageToken?: string;
  /** Required. Specifies which parts to the Category resource should be returned in the response. */
  view?: "CATEGORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListCategoriesRequest = Schema.Struct({
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/categories" }),
  svc,
) as unknown as Schema.Schema<ListCategoriesRequest>;

export type ListCategoriesResponse_Op = ListCategoriesResponse;
export const ListCategoriesResponse_Op = ListCategoriesResponse;

export type ListCategoriesError = CommonErrors;

export const listCategories = API.makePaginated(() => ({
  input: ListCategoriesRequest,
  output: ListCategoriesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a list of business categories for the provided language and GConcept ids. */
export interface BatchGetCategoriesRequest {
  /** Required. At least one name must be set. The GConcept ids the localized category names should be returned for. To return details for more than one category, repeat this parameter in the request. */
  names?: string[];
  /** Required. The BCP 47 code of language that the category names should be returned in. */
  languageCode?: string;
  /** Optional. The ISO 3166-1 alpha-2 country code used to infer non-standard language. */
  regionCode?: string;
  /** Required. Specifies which parts to the Category resource should be returned in the response. */
  view?: "CATEGORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const BatchGetCategoriesRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/categories:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetCategoriesRequest>;

export type BatchGetCategoriesResponse_Op = BatchGetCategoriesResponse;
export const BatchGetCategoriesResponse_Op = BatchGetCategoriesResponse;

export type BatchGetCategoriesError = CommonErrors;

export const batchGetCategories: API.OperationMethod<BatchGetCategoriesRequest, BatchGetCategoriesResponse_Op, BatchGetCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetCategoriesRequest,
  output: BatchGetCategoriesResponse_Op,
  errors: [],
}));

/** Gets the specified chain. Returns `NOT_FOUND` if the chain does not exist. */
export interface GetChainsRequest {
  /** Required. The chain's resource name, in the format `chains/{chain_place_id}`. */
  name: string;
}

export const GetChainsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/chains/{chainsId}" }),
  svc,
) as unknown as Schema.Schema<GetChainsRequest>;

export type GetChainsResponse = Chain;
export const GetChainsResponse = Chain;

export type GetChainsError = CommonErrors;

export const getChains: API.OperationMethod<GetChainsRequest, GetChainsResponse, GetChainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetChainsRequest,
  output: GetChainsResponse,
  errors: [],
}));

/** Searches the chain based on chain name. */
export interface SearchChainsRequest {
  /** Required. Search for a chain by its name. Exact/partial/fuzzy/related queries are supported. Examples: "walmart", "wal-mart", "walmmmart", "沃尔玛" */
  chainName?: string;
  /** The maximum number of matched chains to return from this query. The default is 10. The maximum possible value is 500. */
  pageSize?: number;
}

export const SearchChainsRequest = Schema.Struct({
  chainName: Schema.optional(Schema.String).pipe(T.HttpQuery("chainName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/chains:search" }),
  svc,
) as unknown as Schema.Schema<SearchChainsRequest>;

export type SearchChainsResponse_Op = SearchChainsResponse;
export const SearchChainsResponse_Op = SearchChainsResponse;

export type SearchChainsError = CommonErrors;

export const searchChains: API.OperationMethod<SearchChainsRequest, SearchChainsResponse_Op, SearchChainsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchChainsRequest,
  output: SearchChainsResponse_Op,
  errors: [],
}));

/** Search all of the possible locations that are a match to the specified request. */
export interface SearchGoogleLocationsRequest_Op {
  /** Request body */
  body?: SearchGoogleLocationsRequest;
}

export const SearchGoogleLocationsRequest_Op = Schema.Struct({
  body: Schema.optional(SearchGoogleLocationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/googleLocations:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchGoogleLocationsRequest_Op>;

export type SearchGoogleLocationsResponse_Op = SearchGoogleLocationsResponse;
export const SearchGoogleLocationsResponse_Op = SearchGoogleLocationsResponse;

export type SearchGoogleLocationsError = CommonErrors;

export const searchGoogleLocations: API.OperationMethod<SearchGoogleLocationsRequest_Op, SearchGoogleLocationsResponse_Op, SearchGoogleLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchGoogleLocationsRequest_Op,
  output: SearchGoogleLocationsResponse_Op,
  errors: [],
}));

/** Lists the locations for the specified account. */
export interface ListAccountsLocationsRequest {
  /** Required. The name of the account to fetch locations from. If the parent Account is of AccountType PERSONAL, only Locations that are directly owned by the Account are returned, otherwise it will return all accessible locations from the Account, either directly or indirectly. */
  parent: string;
  /** Optional. How many locations to fetch per page. Default value is 10 if not set. Minimum is 1, and maximum page size is 100. */
  pageSize?: number;
  /** Optional. If specified, it fetches the next `page` of locations. The page token is returned by previous calls to `ListLocations` when there were more locations than could fit in the requested page size. */
  pageToken?: string;
  /** Optional. A filter constraining the locations to return. The response includes only entries that match the filter. If `filter` is empty, then constraints are applied and all locations (paginated) are retrieved for the requested account. For more information about valid fields and example usage, see [Work with Location Data Guide](https://developers.google.com/my-business/content/location-data#filter_results_when_you_list_locations). */
  filter?: string;
  /** Optional. Sorting order for the request. Multiple fields should be comma-separated, following SQL syntax. The default sorting order is ascending. To specify descending order, a suffix " desc" should be added. Valid fields to order_by are title and store_code. For example: "title, store_code desc" or "title" or "store_code desc" */
  orderBy?: string;
  /** Required. Read mask to specify what fields will be returned in the response. */
  readMask?: string;
}

export const ListAccountsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsLocationsRequest>;

export type ListAccountsLocationsResponse = ListLocationsResponse;
export const ListAccountsLocationsResponse = ListLocationsResponse;

export type ListAccountsLocationsError = CommonErrors;

export const listAccountsLocations = API.makePaginated(() => ({
  input: ListAccountsLocationsRequest,
  output: ListAccountsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new Location that will be owned by the logged in user. */
export interface CreateAccountsLocationsRequest {
  /** Required. The name of the account in which to create this location. */
  parent: string;
  /** Optional. If true, the request is validated without actually creating the location. */
  validateOnly?: boolean;
  /** Optional. A unique request ID for the server to detect duplicated requests. We recommend using UUIDs. Max length is 50 characters. */
  requestId?: string;
  /** Request body */
  body?: Location;
}

export const CreateAccountsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Location).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/locations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsLocationsRequest>;

export type CreateAccountsLocationsResponse = Location;
export const CreateAccountsLocationsResponse = Location;

export type CreateAccountsLocationsError = CommonErrors;

export const createAccountsLocations: API.OperationMethod<CreateAccountsLocationsRequest, CreateAccountsLocationsResponse, CreateAccountsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsLocationsRequest,
  output: CreateAccountsLocationsResponse,
  errors: [],
}));

