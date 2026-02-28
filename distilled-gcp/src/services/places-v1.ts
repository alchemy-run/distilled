// ==========================================================================
// Places API (New) (places v1)
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
  name: "places",
  version: "v1",
  rootUrl: "https://places.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleTypeLatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const GoogleTypeLatLng: Schema.Schema<GoogleTypeLatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeLatLng" }) as any as Schema.Schema<GoogleTypeLatLng>;

export interface GoogleMapsPlacesV1Circle {
  /** Required. Center latitude and longitude. The range of latitude must be within [-90.0, 90.0]. The range of the longitude must be within [-180.0, 180.0]. */
  center?: GoogleTypeLatLng;
  /** Required. Radius measured in meters. The radius must be within [0.0, 50000.0]. */
  radius?: number;
}

export const GoogleMapsPlacesV1Circle: Schema.Schema<GoogleMapsPlacesV1Circle> = Schema.suspend(() => Schema.Struct({
  center: Schema.optional(GoogleTypeLatLng),
  radius: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMapsPlacesV1Circle" }) as any as Schema.Schema<GoogleMapsPlacesV1Circle>;

export interface GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction {
  /** A circle defined by center point and radius. */
  circle?: GoogleMapsPlacesV1Circle;
}

export const GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction: Schema.Schema<GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction> = Schema.suspend(() => Schema.Struct({
  circle: Schema.optional(GoogleMapsPlacesV1Circle),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction>;

export interface GoogleMapsPlacesV1RouteModifiers {
  /** Optional. When set to true, avoids toll roads where reasonable, giving preference to routes not containing toll roads. Applies only to the `DRIVE` and `TWO_WHEELER` `TravelMode`. */
  avoidTolls?: boolean;
  /** Optional. When set to true, avoids highways where reasonable, giving preference to routes not containing highways. Applies only to the `DRIVE` and `TWO_WHEELER` `TravelMode`. */
  avoidHighways?: boolean;
  /** Optional. When set to true, avoids ferries where reasonable, giving preference to routes not containing ferries. Applies only to the `DRIVE` and `TWO_WHEELER` `TravelMode`. */
  avoidFerries?: boolean;
  /** Optional. When set to true, avoids navigating indoors where reasonable, giving preference to routes not containing indoor navigation. Applies only to the `WALK` `TravelMode`. */
  avoidIndoor?: boolean;
}

export const GoogleMapsPlacesV1RouteModifiers: Schema.Schema<GoogleMapsPlacesV1RouteModifiers> = Schema.suspend(() => Schema.Struct({
  avoidTolls: Schema.optional(Schema.Boolean),
  avoidHighways: Schema.optional(Schema.Boolean),
  avoidFerries: Schema.optional(Schema.Boolean),
  avoidIndoor: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1RouteModifiers" }) as any as Schema.Schema<GoogleMapsPlacesV1RouteModifiers>;

export interface GoogleMapsPlacesV1RoutingParameters {
  /** Optional. An explicit routing origin that overrides the origin defined in the polyline. By default, the polyline origin is used. */
  origin?: GoogleTypeLatLng;
  /** Optional. The travel mode. */
  travelMode?: "TRAVEL_MODE_UNSPECIFIED" | "DRIVE" | "BICYCLE" | "WALK" | "TWO_WHEELER" | (string & {});
  /** Optional. The route modifiers. */
  routeModifiers?: GoogleMapsPlacesV1RouteModifiers;
  /** Optional. Specifies how to compute the routing summaries. The server attempts to use the selected routing preference to compute the route. The traffic aware routing preference is only available for the `DRIVE` or `TWO_WHEELER` `travelMode`. */
  routingPreference?: "ROUTING_PREFERENCE_UNSPECIFIED" | "TRAFFIC_UNAWARE" | "TRAFFIC_AWARE" | "TRAFFIC_AWARE_OPTIMAL" | (string & {});
}

export const GoogleMapsPlacesV1RoutingParameters: Schema.Schema<GoogleMapsPlacesV1RoutingParameters> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(GoogleTypeLatLng),
  travelMode: Schema.optional(Schema.String),
  routeModifiers: Schema.optional(GoogleMapsPlacesV1RouteModifiers),
  routingPreference: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1RoutingParameters" }) as any as Schema.Schema<GoogleMapsPlacesV1RoutingParameters>;

export interface GoogleMapsPlacesV1SearchNearbyRequest {
  /** Place details will be displayed with the preferred language if available. If the language code is unspecified or unrecognized, place details of any language may be returned, with a preference for English if such details exist. Current list of supported languages: https://developers.google.com/maps/faq#languagesupport. */
  languageCode?: string;
  /** The Unicode country/region code (CLDR) of the location where the request is coming from. This parameter is used to display the place details, like region-specific place name, if available. The parameter can affect results based on applicable law. For more information, see https://www.unicode.org/cldr/charts/latest/supplemental/territory_language_information.html. Note that 3-digit region codes are not currently supported. */
  regionCode?: string;
  /** Included Place type (eg, "restaurant" or "gas_station") from https://developers.google.com/maps/documentation/places/web-service/place-types. Up to 50 types from [Table A](https://developers.google.com/maps/documentation/places/web-service/place-types#table-a) may be specified. If there are any conflicting types, i.e. a type appears in both included_types and excluded_types, an INVALID_ARGUMENT error is returned. If a Place type is specified with multiple type restrictions, only places that satisfy all of the restrictions are returned. For example, if we have {included_types = ["restaurant"], excluded_primary_types = ["restaurant"]}, the returned places provide "restaurant" related services but do not operate primarily as "restaurants". */
  includedTypes?: Array<string>;
  /** Excluded Place type (eg, "restaurant" or "gas_station") from https://developers.google.com/maps/documentation/places/web-service/place-types. Up to 50 types from [Table A](https://developers.google.com/maps/documentation/places/web-service/place-types#table-a) may be specified. If the client provides both included_types (e.g. restaurant) and excluded_types (e.g. cafe), then the response should include places that are restaurant but not cafe. The response includes places that match at least one of the included_types and none of the excluded_types. If there are any conflicting types, i.e. a type appears in both included_types and excluded_types, an INVALID_ARGUMENT error is returned. If a Place type is specified with multiple type restrictions, only places that satisfy all of the restrictions are returned. For example, if we have {included_types = ["restaurant"], excluded_primary_types = ["restaurant"]}, the returned places provide "restaurant" related services but do not operate primarily as "restaurants". */
  excludedTypes?: Array<string>;
  /** Included primary Place type (e.g. "restaurant" or "gas_station") from https://developers.google.com/maps/documentation/places/web-service/place-types. A place can only have a single primary type from the supported types table associated with it. Up to 50 types from [Table A](https://developers.google.com/maps/documentation/places/web-service/place-types#table-a) may be specified. If there are any conflicting primary types, i.e. a type appears in both included_primary_types and excluded_primary_types, an INVALID_ARGUMENT error is returned. If a Place type is specified with multiple type restrictions, only places that satisfy all of the restrictions are returned. For example, if we have {included_types = ["restaurant"], excluded_primary_types = ["restaurant"]}, the returned places provide "restaurant" related services but do not operate primarily as "restaurants". */
  includedPrimaryTypes?: Array<string>;
  /** Excluded primary Place type (e.g. "restaurant" or "gas_station") from https://developers.google.com/maps/documentation/places/web-service/place-types. Up to 50 types from [Table A](https://developers.google.com/maps/documentation/places/web-service/place-types#table-a) may be specified. If there are any conflicting primary types, i.e. a type appears in both included_primary_types and excluded_primary_types, an INVALID_ARGUMENT error is returned. If a Place type is specified with multiple type restrictions, only places that satisfy all of the restrictions are returned. For example, if we have {included_types = ["restaurant"], excluded_primary_types = ["restaurant"]}, the returned places provide "restaurant" related services but do not operate primarily as "restaurants". */
  excludedPrimaryTypes?: Array<string>;
  /** Maximum number of results to return. It must be between 1 and 20 (default), inclusively. If the number is unset, it falls back to the upper limit. If the number is set to negative or exceeds the upper limit, an INVALID_ARGUMENT error is returned. */
  maxResultCount?: number;
  /** Required. The region to search. */
  locationRestriction?: GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction;
  /** How results will be ranked in the response. */
  rankPreference?: "RANK_PREFERENCE_UNSPECIFIED" | "DISTANCE" | "POPULARITY" | (string & {});
  /** Optional. Parameters that affect the routing to the search results. */
  routingParameters?: GoogleMapsPlacesV1RoutingParameters;
}

export const GoogleMapsPlacesV1SearchNearbyRequest: Schema.Schema<GoogleMapsPlacesV1SearchNearbyRequest> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  includedTypes: Schema.optional(Schema.Array(Schema.String)),
  excludedTypes: Schema.optional(Schema.Array(Schema.String)),
  includedPrimaryTypes: Schema.optional(Schema.Array(Schema.String)),
  excludedPrimaryTypes: Schema.optional(Schema.Array(Schema.String)),
  maxResultCount: Schema.optional(Schema.Number),
  locationRestriction: Schema.optional(GoogleMapsPlacesV1SearchNearbyRequestLocationRestriction),
  rankPreference: Schema.optional(Schema.String),
  routingParameters: Schema.optional(GoogleMapsPlacesV1RoutingParameters),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchNearbyRequest" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchNearbyRequest>;

export interface GoogleTypeLocalizedText {
  /** Localized string in the language corresponding to language_code below. */
  text?: string;
  /** The text's BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
}

export const GoogleTypeLocalizedText: Schema.Schema<GoogleTypeLocalizedText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeLocalizedText" }) as any as Schema.Schema<GoogleTypeLocalizedText>;

export interface GoogleTypePostalAddress {
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

export const GoogleTypePostalAddress: Schema.Schema<GoogleTypePostalAddress> = Schema.suspend(() => Schema.Struct({
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
})).annotate({ identifier: "GoogleTypePostalAddress" }) as any as Schema.Schema<GoogleTypePostalAddress>;

export interface GoogleMapsPlacesV1PlaceAddressComponent {
  /** The full text description or name of the address component. For example, an address component for the country Australia may have a long_name of "Australia". */
  longText?: string;
  /** An abbreviated textual name for the address component, if available. For example, an address component for the country of Australia may have a short_name of "AU". */
  shortText?: string;
  /** An array indicating the type(s) of the address component. */
  types?: Array<string>;
  /** The language used to format this components, in CLDR notation. */
  languageCode?: string;
}

export const GoogleMapsPlacesV1PlaceAddressComponent: Schema.Schema<GoogleMapsPlacesV1PlaceAddressComponent> = Schema.suspend(() => Schema.Struct({
  longText: Schema.optional(Schema.String),
  shortText: Schema.optional(Schema.String),
  types: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceAddressComponent" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceAddressComponent>;

export interface GoogleMapsPlacesV1PlacePlusCode {
  /** Place's global (full) code, such as "9FWM33GV+HQ", representing an 1/8000 by 1/8000 degree area (~14 by 14 meters). */
  globalCode?: string;
  /** Place's compound code, such as "33GV+HQ, Ramberg, Norway", containing the suffix of the global code and replacing the prefix with a formatted name of a reference entity. */
  compoundCode?: string;
}

export const GoogleMapsPlacesV1PlacePlusCode: Schema.Schema<GoogleMapsPlacesV1PlacePlusCode> = Schema.suspend(() => Schema.Struct({
  globalCode: Schema.optional(Schema.String),
  compoundCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlacePlusCode" }) as any as Schema.Schema<GoogleMapsPlacesV1PlacePlusCode>;

export interface GoogleGeoTypeViewport {
  /** Required. The low point of the viewport. */
  low?: GoogleTypeLatLng;
  /** Required. The high point of the viewport. */
  high?: GoogleTypeLatLng;
}

export const GoogleGeoTypeViewport: Schema.Schema<GoogleGeoTypeViewport> = Schema.suspend(() => Schema.Struct({
  low: Schema.optional(GoogleTypeLatLng),
  high: Schema.optional(GoogleTypeLatLng),
})).annotate({ identifier: "GoogleGeoTypeViewport" }) as any as Schema.Schema<GoogleGeoTypeViewport>;

export interface GoogleMapsPlacesV1AuthorAttribution {
  /** Name of the author of the Photo or Review. */
  displayName?: string;
  /** URI of the author of the Photo or Review. */
  uri?: string;
  /** Profile photo URI of the author of the Photo or Review. */
  photoUri?: string;
}

export const GoogleMapsPlacesV1AuthorAttribution: Schema.Schema<GoogleMapsPlacesV1AuthorAttribution> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  photoUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1AuthorAttribution" }) as any as Schema.Schema<GoogleMapsPlacesV1AuthorAttribution>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleMapsPlacesV1Review {
  /** A reference representing this place review which may be used to look up this place review again (also called the API "resource" name: `places/{place_id}/reviews/{review}`). */
  name?: string;
  /** A string of formatted recent time, expressing the review time relative to the current time in a form appropriate for the language and country. */
  relativePublishTimeDescription?: string;
  /** The localized text of the review. */
  text?: GoogleTypeLocalizedText;
  /** The review text in its original language. */
  originalText?: GoogleTypeLocalizedText;
  /** A number between 1.0 and 5.0, also called the number of stars. */
  rating?: number;
  /** This review's author. */
  authorAttribution?: GoogleMapsPlacesV1AuthorAttribution;
  /** Timestamp for the review. */
  publishTime?: string;
  /** A link where users can flag a problem with the review. */
  flagContentUri?: string;
  /** A link to show the review on Google Maps. */
  googleMapsUri?: string;
  /** The date when the author visited the place. This is truncated to the year and month of the visit. */
  visitDate?: GoogleTypeDate;
}

export const GoogleMapsPlacesV1Review: Schema.Schema<GoogleMapsPlacesV1Review> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  relativePublishTimeDescription: Schema.optional(Schema.String),
  text: Schema.optional(GoogleTypeLocalizedText),
  originalText: Schema.optional(GoogleTypeLocalizedText),
  rating: Schema.optional(Schema.Number),
  authorAttribution: Schema.optional(GoogleMapsPlacesV1AuthorAttribution),
  publishTime: Schema.optional(Schema.String),
  flagContentUri: Schema.optional(Schema.String),
  googleMapsUri: Schema.optional(Schema.String),
  visitDate: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleMapsPlacesV1Review" }) as any as Schema.Schema<GoogleMapsPlacesV1Review>;

export interface GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint {
  /** A day of the week, as an integer in the range 0-6. 0 is Sunday, 1 is Monday, etc. */
  day?: number;
  /** The hour in 24 hour format. Ranges from 0 to 23. */
  hour?: number;
  /** The minute. Ranges from 0 to 59. */
  minute?: number;
  /** Date in the local timezone for the place. */
  date?: GoogleTypeDate;
  /** Whether or not this endpoint was truncated. Truncation occurs when the real hours are outside the times we are willing to return hours between, so we truncate the hours back to these boundaries. This ensures that at most 24 * 7 hours from midnight of the day of the request are returned. */
  truncated?: boolean;
}

export const GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint: Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint> = Schema.suspend(() => Schema.Struct({
  day: Schema.optional(Schema.Number),
  hour: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
  date: Schema.optional(GoogleTypeDate),
  truncated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint>;

export interface GoogleMapsPlacesV1PlaceOpeningHoursPeriod {
  /** The time that the place starts to be open. */
  open?: GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint;
  /** The time that the place starts to be closed. */
  close?: GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint;
}

export const GoogleMapsPlacesV1PlaceOpeningHoursPeriod: Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHoursPeriod> = Schema.suspend(() => Schema.Struct({
  open: Schema.optional(GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint),
  close: Schema.optional(GoogleMapsPlacesV1PlaceOpeningHoursPeriodPoint),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceOpeningHoursPeriod" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHoursPeriod>;

export interface GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay {
  /** The date of this special day. */
  date?: GoogleTypeDate;
}

export const GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay: Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay>;

export interface GoogleMapsPlacesV1PlaceOpeningHours {
  /** Whether the opening hours period is currently active. For regular opening hours and current opening hours, this field means whether the place is open. For secondary opening hours and current secondary opening hours, this field means whether the secondary hours of this place is active. */
  openNow?: boolean;
  /** The periods that this place is open during the week. The periods are in chronological order, in the place-local timezone. An empty (but not absent) value indicates a place that is never open, e.g. because it is closed temporarily for renovations. The starting day of `periods` is NOT fixed and should not be assumed to be Sunday. The API determines the start day based on a variety of factors. For example, for a 24/7 business, the first period may begin on the day of the request. For other businesses, it might be the first day of the week that they are open. NOTE: The ordering of the `periods` array is independent of the ordering of the `weekday_descriptions` array. Do not assume they will begin on the same day. */
  periods?: Array<GoogleMapsPlacesV1PlaceOpeningHoursPeriod>;
  /** Localized strings describing the opening hours of this place, one string for each day of the week. NOTE: The order of the days and the start of the week is determined by the locale (language and region). The ordering of the `periods` array is independent of the ordering of the `weekday_descriptions` array. Do not assume they will begin on the same day. Will be empty if the hours are unknown or could not be converted to localized text. Example: "Sun: 18:00–06:00" */
  weekdayDescriptions?: Array<string>;
  /** A type string used to identify the type of secondary hours. */
  secondaryHoursType?: "SECONDARY_HOURS_TYPE_UNSPECIFIED" | "DRIVE_THROUGH" | "HAPPY_HOUR" | "DELIVERY" | "TAKEOUT" | "KITCHEN" | "BREAKFAST" | "LUNCH" | "DINNER" | "BRUNCH" | "PICKUP" | "ACCESS" | "SENIOR_HOURS" | "ONLINE_SERVICE_HOURS" | (string & {});
  /** Structured information for special days that fall within the period that the returned opening hours cover. Special days are days that could impact the business hours of a place, e.g. Christmas day. Set for current_opening_hours and current_secondary_opening_hours if there are exceptional hours. */
  specialDays?: Array<GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay>;
  /** The next time the current opening hours period starts up to 7 days in the future. This field is only populated if the opening hours period is not active at the time of serving the request. */
  nextOpenTime?: string;
  /** The next time the current opening hours period ends up to 7 days in the future. This field is only populated if the opening hours period is active at the time of serving the request. */
  nextCloseTime?: string;
}

export const GoogleMapsPlacesV1PlaceOpeningHours: Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHours> = Schema.suspend(() => Schema.Struct({
  openNow: Schema.optional(Schema.Boolean),
  periods: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceOpeningHoursPeriod)),
  weekdayDescriptions: Schema.optional(Schema.Array(Schema.String)),
  secondaryHoursType: Schema.optional(Schema.String),
  specialDays: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceOpeningHoursSpecialDay)),
  nextOpenTime: Schema.optional(Schema.String),
  nextCloseTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceOpeningHours" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceOpeningHours>;

export interface GoogleTypeTimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const GoogleTypeTimeZone: Schema.Schema<GoogleTypeTimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeTimeZone" }) as any as Schema.Schema<GoogleTypeTimeZone>;

export interface GoogleMapsPlacesV1Photo {
  /** Identifier. A reference representing this place photo which may be used to look up this place photo again (also called the API "resource" name: `places/{place_id}/photos/{photo}`). */
  name?: string;
  /** The maximum available width, in pixels. */
  widthPx?: number;
  /** The maximum available height, in pixels. */
  heightPx?: number;
  /** This photo's authors. */
  authorAttributions?: Array<GoogleMapsPlacesV1AuthorAttribution>;
  /** A link where users can flag a problem with the photo. */
  flagContentUri?: string;
  /** A link to show the photo on Google Maps. */
  googleMapsUri?: string;
}

export const GoogleMapsPlacesV1Photo: Schema.Schema<GoogleMapsPlacesV1Photo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  widthPx: Schema.optional(Schema.Number),
  heightPx: Schema.optional(Schema.Number),
  authorAttributions: Schema.optional(Schema.Array(GoogleMapsPlacesV1AuthorAttribution)),
  flagContentUri: Schema.optional(Schema.String),
  googleMapsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1Photo" }) as any as Schema.Schema<GoogleMapsPlacesV1Photo>;

export interface GoogleMapsPlacesV1PlaceAttribution {
  /** Name of the Place's data provider. */
  provider?: string;
  /** URI to the Place's data provider. */
  providerUri?: string;
}

export const GoogleMapsPlacesV1PlaceAttribution: Schema.Schema<GoogleMapsPlacesV1PlaceAttribution> = Schema.suspend(() => Schema.Struct({
  provider: Schema.optional(Schema.String),
  providerUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceAttribution" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceAttribution>;

export interface GoogleMapsPlacesV1PlacePaymentOptions {
  /** Place accepts credit cards as payment. */
  acceptsCreditCards?: boolean;
  /** Place accepts debit cards as payment. */
  acceptsDebitCards?: boolean;
  /** Place accepts cash only as payment. Places with this attribute may still accept other payment methods. */
  acceptsCashOnly?: boolean;
  /** Place accepts NFC payments. */
  acceptsNfc?: boolean;
}

export const GoogleMapsPlacesV1PlacePaymentOptions: Schema.Schema<GoogleMapsPlacesV1PlacePaymentOptions> = Schema.suspend(() => Schema.Struct({
  acceptsCreditCards: Schema.optional(Schema.Boolean),
  acceptsDebitCards: Schema.optional(Schema.Boolean),
  acceptsCashOnly: Schema.optional(Schema.Boolean),
  acceptsNfc: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1PlacePaymentOptions" }) as any as Schema.Schema<GoogleMapsPlacesV1PlacePaymentOptions>;

export interface GoogleMapsPlacesV1PlaceParkingOptions {
  /** Place offers free parking lots. */
  freeParkingLot?: boolean;
  /** Place offers paid parking lots. */
  paidParkingLot?: boolean;
  /** Place offers free street parking. */
  freeStreetParking?: boolean;
  /** Place offers paid street parking. */
  paidStreetParking?: boolean;
  /** Place offers valet parking. */
  valetParking?: boolean;
  /** Place offers free garage parking. */
  freeGarageParking?: boolean;
  /** Place offers paid garage parking. */
  paidGarageParking?: boolean;
}

export const GoogleMapsPlacesV1PlaceParkingOptions: Schema.Schema<GoogleMapsPlacesV1PlaceParkingOptions> = Schema.suspend(() => Schema.Struct({
  freeParkingLot: Schema.optional(Schema.Boolean),
  paidParkingLot: Schema.optional(Schema.Boolean),
  freeStreetParking: Schema.optional(Schema.Boolean),
  paidStreetParking: Schema.optional(Schema.Boolean),
  valetParking: Schema.optional(Schema.Boolean),
  freeGarageParking: Schema.optional(Schema.Boolean),
  paidGarageParking: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceParkingOptions" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceParkingOptions>;

export interface GoogleMapsPlacesV1PlaceSubDestination {
  /** The resource name of the sub-destination. */
  name?: string;
  /** The place id of the sub-destination. */
  id?: string;
}

export const GoogleMapsPlacesV1PlaceSubDestination: Schema.Schema<GoogleMapsPlacesV1PlaceSubDestination> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceSubDestination" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceSubDestination>;

export interface GoogleMapsPlacesV1PlaceAccessibilityOptions {
  /** Place offers wheelchair accessible parking. */
  wheelchairAccessibleParking?: boolean;
  /** Places has wheelchair accessible entrance. */
  wheelchairAccessibleEntrance?: boolean;
  /** Place has wheelchair accessible restroom. */
  wheelchairAccessibleRestroom?: boolean;
  /** Place has wheelchair accessible seating. */
  wheelchairAccessibleSeating?: boolean;
}

export const GoogleMapsPlacesV1PlaceAccessibilityOptions: Schema.Schema<GoogleMapsPlacesV1PlaceAccessibilityOptions> = Schema.suspend(() => Schema.Struct({
  wheelchairAccessibleParking: Schema.optional(Schema.Boolean),
  wheelchairAccessibleEntrance: Schema.optional(Schema.Boolean),
  wheelchairAccessibleRestroom: Schema.optional(Schema.Boolean),
  wheelchairAccessibleSeating: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceAccessibilityOptions" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceAccessibilityOptions>;

export interface GoogleTypeMoney {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const GoogleTypeMoney: Schema.Schema<GoogleTypeMoney> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeMoney" }) as any as Schema.Schema<GoogleTypeMoney>;

export interface GoogleMapsPlacesV1FuelOptionsFuelPrice {
  /** The type of fuel. */
  type?: "FUEL_TYPE_UNSPECIFIED" | "DIESEL" | "DIESEL_PLUS" | "REGULAR_UNLEADED" | "MIDGRADE" | "PREMIUM" | "SP91" | "SP91_E10" | "SP92" | "SP95" | "SP95_E10" | "SP98" | "SP99" | "SP100" | "LPG" | "E80" | "E85" | "E100" | "METHANE" | "BIO_DIESEL" | "TRUCK_DIESEL" | (string & {});
  /** The price of the fuel. */
  price?: GoogleTypeMoney;
  /** The time the fuel price was last updated. */
  updateTime?: string;
}

export const GoogleMapsPlacesV1FuelOptionsFuelPrice: Schema.Schema<GoogleMapsPlacesV1FuelOptionsFuelPrice> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  price: Schema.optional(GoogleTypeMoney),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1FuelOptionsFuelPrice" }) as any as Schema.Schema<GoogleMapsPlacesV1FuelOptionsFuelPrice>;

export interface GoogleMapsPlacesV1FuelOptions {
  /** The last known fuel price for each type of fuel this station has. There is one entry per fuel type this station has. Order is not important. */
  fuelPrices?: Array<GoogleMapsPlacesV1FuelOptionsFuelPrice>;
}

export const GoogleMapsPlacesV1FuelOptions: Schema.Schema<GoogleMapsPlacesV1FuelOptions> = Schema.suspend(() => Schema.Struct({
  fuelPrices: Schema.optional(Schema.Array(GoogleMapsPlacesV1FuelOptionsFuelPrice)),
})).annotate({ identifier: "GoogleMapsPlacesV1FuelOptions" }) as any as Schema.Schema<GoogleMapsPlacesV1FuelOptions>;

export interface GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation {
  /** The connector type of this aggregation. */
  type?: "EV_CONNECTOR_TYPE_UNSPECIFIED" | "EV_CONNECTOR_TYPE_OTHER" | "EV_CONNECTOR_TYPE_J1772" | "EV_CONNECTOR_TYPE_TYPE_2" | "EV_CONNECTOR_TYPE_CHADEMO" | "EV_CONNECTOR_TYPE_CCS_COMBO_1" | "EV_CONNECTOR_TYPE_CCS_COMBO_2" | "EV_CONNECTOR_TYPE_TESLA" | "EV_CONNECTOR_TYPE_UNSPECIFIED_GB_T" | "EV_CONNECTOR_TYPE_UNSPECIFIED_WALL_OUTLET" | "EV_CONNECTOR_TYPE_NACS" | (string & {});
  /** The static max charging rate in kw of each connector in the aggregation. */
  maxChargeRateKw?: number;
  /** Number of connectors in this aggregation. */
  count?: number;
  /** Number of connectors in this aggregation that are currently available. */
  availableCount?: number;
  /** Number of connectors in this aggregation that are currently out of service. */
  outOfServiceCount?: number;
  /** The timestamp when the connector availability information in this aggregation was last updated. */
  availabilityLastUpdateTime?: string;
}

export const GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation: Schema.Schema<GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  maxChargeRateKw: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  availableCount: Schema.optional(Schema.Number),
  outOfServiceCount: Schema.optional(Schema.Number),
  availabilityLastUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation" }) as any as Schema.Schema<GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation>;

export interface GoogleMapsPlacesV1EVChargeOptions {
  /** Number of connectors at this station. However, because some ports can have multiple connectors but only be able to charge one car at a time (e.g.) the number of connectors may be greater than the total number of cars which can charge simultaneously. */
  connectorCount?: number;
  /** A list of EV charging connector aggregations that contain connectors of the same type and same charge rate. */
  connectorAggregation?: Array<GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation>;
}

export const GoogleMapsPlacesV1EVChargeOptions: Schema.Schema<GoogleMapsPlacesV1EVChargeOptions> = Schema.suspend(() => Schema.Struct({
  connectorCount: Schema.optional(Schema.Number),
  connectorAggregation: Schema.optional(Schema.Array(GoogleMapsPlacesV1EVChargeOptionsConnectorAggregation)),
})).annotate({ identifier: "GoogleMapsPlacesV1EVChargeOptions" }) as any as Schema.Schema<GoogleMapsPlacesV1EVChargeOptions>;

export interface GoogleMapsPlacesV1PlaceGenerativeSummary {
  /** The overview of the place. */
  overview?: GoogleTypeLocalizedText;
  /** A link where users can flag a problem with the overview summary. */
  overviewFlagContentUri?: string;
  /** The AI disclosure message "Summarized with Gemini" (and its localized variants). This will be in the language specified in the request if available. */
  disclosureText?: GoogleTypeLocalizedText;
}

export const GoogleMapsPlacesV1PlaceGenerativeSummary: Schema.Schema<GoogleMapsPlacesV1PlaceGenerativeSummary> = Schema.suspend(() => Schema.Struct({
  overview: Schema.optional(GoogleTypeLocalizedText),
  overviewFlagContentUri: Schema.optional(Schema.String),
  disclosureText: Schema.optional(GoogleTypeLocalizedText),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceGenerativeSummary" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceGenerativeSummary>;

export interface GoogleMapsPlacesV1PlaceContainingPlace {
  /** The resource name of the place in which this place is located. */
  name?: string;
  /** The place id of the place in which this place is located. */
  id?: string;
}

export const GoogleMapsPlacesV1PlaceContainingPlace: Schema.Schema<GoogleMapsPlacesV1PlaceContainingPlace> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceContainingPlace" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceContainingPlace>;

export interface GoogleMapsPlacesV1AddressDescriptorLandmark {
  /** The landmark's resource name. */
  name?: string;
  /** The landmark's place id. */
  placeId?: string;
  /** The landmark's display name. */
  displayName?: GoogleTypeLocalizedText;
  /** A set of type tags for this landmark. For a complete list of possible values, see https://developers.google.com/maps/documentation/places/web-service/place-types. */
  types?: Array<string>;
  /** Defines the spatial relationship between the target location and the landmark. */
  spatialRelationship?: "NEAR" | "WITHIN" | "BESIDE" | "ACROSS_THE_ROAD" | "DOWN_THE_ROAD" | "AROUND_THE_CORNER" | "BEHIND" | (string & {});
  /** The straight line distance, in meters, between the center point of the target and the center point of the landmark. In some situations, this value can be longer than `travel_distance_meters`. */
  straightLineDistanceMeters?: number;
  /** The travel distance, in meters, along the road network from the target to the landmark, if known. This value does not take into account the mode of transportation, such as walking, driving, or biking. */
  travelDistanceMeters?: number;
}

export const GoogleMapsPlacesV1AddressDescriptorLandmark: Schema.Schema<GoogleMapsPlacesV1AddressDescriptorLandmark> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  placeId: Schema.optional(Schema.String),
  displayName: Schema.optional(GoogleTypeLocalizedText),
  types: Schema.optional(Schema.Array(Schema.String)),
  spatialRelationship: Schema.optional(Schema.String),
  straightLineDistanceMeters: Schema.optional(Schema.Number),
  travelDistanceMeters: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMapsPlacesV1AddressDescriptorLandmark" }) as any as Schema.Schema<GoogleMapsPlacesV1AddressDescriptorLandmark>;

export interface GoogleMapsPlacesV1AddressDescriptorArea {
  /** The area's resource name. */
  name?: string;
  /** The area's place id. */
  placeId?: string;
  /** The area's display name. */
  displayName?: GoogleTypeLocalizedText;
  /** Defines the spatial relationship between the target location and the area. */
  containment?: "CONTAINMENT_UNSPECIFIED" | "WITHIN" | "OUTSKIRTS" | "NEAR" | (string & {});
}

export const GoogleMapsPlacesV1AddressDescriptorArea: Schema.Schema<GoogleMapsPlacesV1AddressDescriptorArea> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  placeId: Schema.optional(Schema.String),
  displayName: Schema.optional(GoogleTypeLocalizedText),
  containment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1AddressDescriptorArea" }) as any as Schema.Schema<GoogleMapsPlacesV1AddressDescriptorArea>;

export interface GoogleMapsPlacesV1AddressDescriptor {
  /** A ranked list of nearby landmarks. The most recognizable and nearby landmarks are ranked first. */
  landmarks?: Array<GoogleMapsPlacesV1AddressDescriptorLandmark>;
  /** A ranked list of containing or adjacent areas. The most recognizable and precise areas are ranked first. */
  areas?: Array<GoogleMapsPlacesV1AddressDescriptorArea>;
}

export const GoogleMapsPlacesV1AddressDescriptor: Schema.Schema<GoogleMapsPlacesV1AddressDescriptor> = Schema.suspend(() => Schema.Struct({
  landmarks: Schema.optional(Schema.Array(GoogleMapsPlacesV1AddressDescriptorLandmark)),
  areas: Schema.optional(Schema.Array(GoogleMapsPlacesV1AddressDescriptorArea)),
})).annotate({ identifier: "GoogleMapsPlacesV1AddressDescriptor" }) as any as Schema.Schema<GoogleMapsPlacesV1AddressDescriptor>;

export interface GoogleMapsPlacesV1PlaceGoogleMapsLinks {
  /** A link to show the directions to the place. The link only populates the destination location and uses the default travel mode `DRIVE`. */
  directionsUri?: string;
  /** A link to show this place. */
  placeUri?: string;
  /** A link to write a review for this place on Google Maps. */
  writeAReviewUri?: string;
  /** A link to show reviews of this place on Google Maps. */
  reviewsUri?: string;
  /** A link to show photos of this place on Google Maps. */
  photosUri?: string;
}

export const GoogleMapsPlacesV1PlaceGoogleMapsLinks: Schema.Schema<GoogleMapsPlacesV1PlaceGoogleMapsLinks> = Schema.suspend(() => Schema.Struct({
  directionsUri: Schema.optional(Schema.String),
  placeUri: Schema.optional(Schema.String),
  writeAReviewUri: Schema.optional(Schema.String),
  reviewsUri: Schema.optional(Schema.String),
  photosUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceGoogleMapsLinks" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceGoogleMapsLinks>;

export interface GoogleMapsPlacesV1PriceRange {
  /** The low end of the price range (inclusive). Price should be at or above this amount. */
  startPrice?: GoogleTypeMoney;
  /** The high end of the price range (exclusive). Price should be lower than this amount. */
  endPrice?: GoogleTypeMoney;
}

export const GoogleMapsPlacesV1PriceRange: Schema.Schema<GoogleMapsPlacesV1PriceRange> = Schema.suspend(() => Schema.Struct({
  startPrice: Schema.optional(GoogleTypeMoney),
  endPrice: Schema.optional(GoogleTypeMoney),
})).annotate({ identifier: "GoogleMapsPlacesV1PriceRange" }) as any as Schema.Schema<GoogleMapsPlacesV1PriceRange>;

export interface GoogleMapsPlacesV1PlaceReviewSummary {
  /** The summary of user reviews. */
  text?: GoogleTypeLocalizedText;
  /** A link where users can flag a problem with the summary. */
  flagContentUri?: string;
  /** The AI disclosure message "Summarized with Gemini" (and its localized variants). This will be in the language specified in the request if available. */
  disclosureText?: GoogleTypeLocalizedText;
  /** A link to show reviews of this place on Google Maps. */
  reviewsUri?: string;
}

export const GoogleMapsPlacesV1PlaceReviewSummary: Schema.Schema<GoogleMapsPlacesV1PlaceReviewSummary> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleTypeLocalizedText),
  flagContentUri: Schema.optional(Schema.String),
  disclosureText: Schema.optional(GoogleTypeLocalizedText),
  reviewsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceReviewSummary" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceReviewSummary>;

export interface GoogleMapsPlacesV1ContentBlock {
  /** Content related to the topic. */
  content?: GoogleTypeLocalizedText;
  /** The list of resource names of the referenced places. This name can be used in other APIs that accept Place resource names. */
  referencedPlaces?: Array<string>;
}

export const GoogleMapsPlacesV1ContentBlock: Schema.Schema<GoogleMapsPlacesV1ContentBlock> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(GoogleTypeLocalizedText),
  referencedPlaces: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleMapsPlacesV1ContentBlock" }) as any as Schema.Schema<GoogleMapsPlacesV1ContentBlock>;

export interface GoogleMapsPlacesV1PlaceEvChargeAmenitySummary {
  /** An overview of the available amenities. This is guaranteed to be provided. */
  overview?: GoogleMapsPlacesV1ContentBlock;
  /** A summary of the nearby coffee options. */
  coffee?: GoogleMapsPlacesV1ContentBlock;
  /** A summary of the nearby restaurants. */
  restaurant?: GoogleMapsPlacesV1ContentBlock;
  /** A summary of the nearby stores. */
  store?: GoogleMapsPlacesV1ContentBlock;
  /** A link where users can flag a problem with the summary. */
  flagContentUri?: string;
  /** The AI disclosure message "Summarized with Gemini" (and its localized variants). This will be in the language specified in the request if available. */
  disclosureText?: GoogleTypeLocalizedText;
}

export const GoogleMapsPlacesV1PlaceEvChargeAmenitySummary: Schema.Schema<GoogleMapsPlacesV1PlaceEvChargeAmenitySummary> = Schema.suspend(() => Schema.Struct({
  overview: Schema.optional(GoogleMapsPlacesV1ContentBlock),
  coffee: Schema.optional(GoogleMapsPlacesV1ContentBlock),
  restaurant: Schema.optional(GoogleMapsPlacesV1ContentBlock),
  store: Schema.optional(GoogleMapsPlacesV1ContentBlock),
  flagContentUri: Schema.optional(Schema.String),
  disclosureText: Schema.optional(GoogleTypeLocalizedText),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceEvChargeAmenitySummary" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceEvChargeAmenitySummary>;

export interface GoogleMapsPlacesV1PlaceNeighborhoodSummary {
  /** An overview summary of the neighborhood. */
  overview?: GoogleMapsPlacesV1ContentBlock;
  /** A detailed description of the neighborhood. */
  description?: GoogleMapsPlacesV1ContentBlock;
  /** A link where users can flag a problem with the summary. */
  flagContentUri?: string;
  /** The AI disclosure message "Summarized with Gemini" (and its localized variants). This will be in the language specified in the request if available. */
  disclosureText?: GoogleTypeLocalizedText;
}

export const GoogleMapsPlacesV1PlaceNeighborhoodSummary: Schema.Schema<GoogleMapsPlacesV1PlaceNeighborhoodSummary> = Schema.suspend(() => Schema.Struct({
  overview: Schema.optional(GoogleMapsPlacesV1ContentBlock),
  description: Schema.optional(GoogleMapsPlacesV1ContentBlock),
  flagContentUri: Schema.optional(Schema.String),
  disclosureText: Schema.optional(GoogleTypeLocalizedText),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceNeighborhoodSummary" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceNeighborhoodSummary>;

export interface GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink {
  /** The title to show for the link. */
  title?: string;
  /** The uri of the link. */
  uri?: string;
}

export const GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink: Schema.Schema<GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink>;

export interface GoogleMapsPlacesV1PlaceConsumerAlertDetails {
  /** The title to show together with the description. */
  title?: string;
  /** The description of the consumer alert message. */
  description?: string;
  /** The link to show together with the description to provide more information. */
  aboutLink?: GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink;
}

export const GoogleMapsPlacesV1PlaceConsumerAlertDetails: Schema.Schema<GoogleMapsPlacesV1PlaceConsumerAlertDetails> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  aboutLink: Schema.optional(GoogleMapsPlacesV1PlaceConsumerAlertDetailsLink),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceConsumerAlertDetails" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceConsumerAlertDetails>;

export interface GoogleMapsPlacesV1PlaceConsumerAlert {
  /** The overview of the consumer alert message. */
  overview?: string;
  /** The details of the consumer alert message. */
  details?: GoogleMapsPlacesV1PlaceConsumerAlertDetails;
  /** The language code of the consumer alert message. This is a BCP 47 language code. */
  languageCode?: string;
}

export const GoogleMapsPlacesV1PlaceConsumerAlert: Schema.Schema<GoogleMapsPlacesV1PlaceConsumerAlert> = Schema.suspend(() => Schema.Struct({
  overview: Schema.optional(Schema.String),
  details: Schema.optional(GoogleMapsPlacesV1PlaceConsumerAlertDetails),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PlaceConsumerAlert" }) as any as Schema.Schema<GoogleMapsPlacesV1PlaceConsumerAlert>;

export interface GoogleMapsPlacesV1Place {
  /** This Place's resource name, in `places/{place_id}` format. Can be used to look up the Place. */
  name?: string;
  /** The unique identifier of a place. */
  id?: string;
  /** The localized name of the place, suitable as a short human-readable description. For example, "Google Sydney", "Starbucks", "Pyrmont", etc. */
  displayName?: GoogleTypeLocalizedText;
  /** A set of type tags for this result. For example, "political" and "locality". For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types */
  types?: Array<string>;
  /** The primary type of the given result. This type must be one of the Places API supported types. For example, "restaurant", "cafe", "airport", etc. A place can only have a single primary type. For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types. The primary type may be missing if the place's primary type is not a supported type. When a primary type is present, it is always one of the types in the `types` field. */
  primaryType?: string;
  /** The display name of the primary type, localized to the request language if applicable. For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types. The primary type may be missing if the place's primary type is not a supported type. */
  primaryTypeDisplayName?: GoogleTypeLocalizedText;
  /** The type label of the place on Google Maps, localized to the request language if applicable, for example, "Restaurant", "Cafe", "Airport", etc. The type label may be different from the primary type display name and may not be a supported type in [Places API Place Types table](https://developers.google.com/maps/documentation/places/web-service/place-types). */
  googleMapsTypeLabel?: GoogleTypeLocalizedText;
  /** A human-readable phone number for the place, in national format. */
  nationalPhoneNumber?: string;
  /** A human-readable phone number for the place, in international format. */
  internationalPhoneNumber?: string;
  /** A full, human-readable address for this place. */
  formattedAddress?: string;
  /** A short, human-readable address for this place. */
  shortFormattedAddress?: string;
  /** The address in postal address format. */
  postalAddress?: GoogleTypePostalAddress;
  /** Repeated components for each locality level. Note the following facts about the address_components[] array: - The array of address components may contain more components than the formatted_address. - The array does not necessarily include all the political entities that contain an address, apart from those included in the formatted_address. To retrieve all the political entities that contain a specific address, you should use reverse geocoding, passing the latitude/longitude of the address as a parameter to the request. - The format of the response is not guaranteed to remain the same between requests. In particular, the number of address_components varies based on the address requested and can change over time for the same address. A component can change position in the array. The type of the component can change. A particular component may be missing in a later response. */
  addressComponents?: Array<GoogleMapsPlacesV1PlaceAddressComponent>;
  /** Plus code of the place location lat/long. */
  plusCode?: GoogleMapsPlacesV1PlacePlusCode;
  /** The position of this place. */
  location?: GoogleTypeLatLng;
  /** A viewport suitable for displaying the place on an average-sized map. This viewport should not be used as the physical boundary or the service area of the business. */
  viewport?: GoogleGeoTypeViewport;
  /** A rating between 1.0 and 5.0, based on user reviews of this place. */
  rating?: number;
  /** A URL providing more information about this place. */
  googleMapsUri?: string;
  /** The authoritative website for this place, e.g. a business' homepage. Note that for places that are part of a chain (e.g. an IKEA store), this will usually be the website for the individual store, not the overall chain. */
  websiteUri?: string;
  /** List of reviews about this place, sorted by relevance. A maximum of 5 reviews can be returned. */
  reviews?: Array<GoogleMapsPlacesV1Review>;
  /** The regular hours of operation. Note that if a place is always open (24 hours), the `close` field will not be set. Clients can rely on always open (24 hours) being represented as an [`open`](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Period) period containing [`day`](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Point) with value `0`, [`hour`](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Point) with value `0`, and [`minute`](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Point) with value `0`. */
  regularOpeningHours?: GoogleMapsPlacesV1PlaceOpeningHours;
  /** Number of minutes this place's timezone is currently offset from UTC. This is expressed in minutes to support timezones that are offset by fractions of an hour, e.g. X hours and 15 minutes. */
  utcOffsetMinutes?: number;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  timeZone?: GoogleTypeTimeZone;
  /** Information (including references) about photos of this place. A maximum of 10 photos can be returned. */
  photos?: Array<GoogleMapsPlacesV1Photo>;
  /** The place's address in adr microformat: http://microformats.org/wiki/adr. */
  adrFormatAddress?: string;
  /** The business status for the place. */
  businessStatus?: "BUSINESS_STATUS_UNSPECIFIED" | "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY" | (string & {});
  /** Price level of the place. */
  priceLevel?: "PRICE_LEVEL_UNSPECIFIED" | "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE" | (string & {});
  /** A set of data provider that must be shown with this result. */
  attributions?: Array<GoogleMapsPlacesV1PlaceAttribution>;
  /** The total number of reviews (with or without text) for this place. */
  userRatingCount?: number;
  /** A truncated URL to an icon mask. User can access different icon type by appending type suffix to the end (eg, ".svg" or ".png"). */
  iconMaskBaseUri?: string;
  /** Background color for icon_mask in hex format, e.g. #909CE1. */
  iconBackgroundColor?: string;
  /** Specifies if the business supports takeout. */
  takeout?: boolean;
  /** Specifies if the business supports delivery. */
  delivery?: boolean;
  /** Specifies if the business supports indoor or outdoor seating options. */
  dineIn?: boolean;
  /** Specifies if the business supports curbside pickup. */
  curbsidePickup?: boolean;
  /** Specifies if the place supports reservations. */
  reservable?: boolean;
  /** Specifies if the place serves breakfast. */
  servesBreakfast?: boolean;
  /** Specifies if the place serves lunch. */
  servesLunch?: boolean;
  /** Specifies if the place serves dinner. */
  servesDinner?: boolean;
  /** Specifies if the place serves beer. */
  servesBeer?: boolean;
  /** Specifies if the place serves wine. */
  servesWine?: boolean;
  /** Specifies if the place serves brunch. */
  servesBrunch?: boolean;
  /** Specifies if the place serves vegetarian food. */
  servesVegetarianFood?: boolean;
  /** The hours of operation for the next seven days (including today). The time period starts at midnight on the date of the request and ends at 11:59 pm six days later. This field includes the special_days subfield of all hours, set for dates that have exceptional hours. */
  currentOpeningHours?: GoogleMapsPlacesV1PlaceOpeningHours;
  /** Contains an array of entries for the next seven days including information about secondary hours of a business. Secondary hours are different from a business's main hours. For example, a restaurant can specify drive through hours or delivery hours as its secondary hours. This field populates the type subfield, which draws from a predefined list of opening hours types (such as DRIVE_THROUGH, PICKUP, or TAKEOUT) based on the types of the place. This field includes the special_days subfield of all hours, set for dates that have exceptional hours. */
  currentSecondaryOpeningHours?: Array<GoogleMapsPlacesV1PlaceOpeningHours>;
  /** Contains an array of entries for information about regular secondary hours of a business. Secondary hours are different from a business's main hours. For example, a restaurant can specify drive through hours or delivery hours as its secondary hours. This field populates the type subfield, which draws from a predefined list of opening hours types (such as DRIVE_THROUGH, PICKUP, or TAKEOUT) based on the types of the place. */
  regularSecondaryOpeningHours?: Array<GoogleMapsPlacesV1PlaceOpeningHours>;
  /** Contains a summary of the place. A summary is comprised of a textual overview, and also includes the language code for these if applicable. Summary text must be presented as-is and can not be modified or altered. */
  editorialSummary?: GoogleTypeLocalizedText;
  /** Place provides outdoor seating. */
  outdoorSeating?: boolean;
  /** Place provides live music. */
  liveMusic?: boolean;
  /** Place has a children's menu. */
  menuForChildren?: boolean;
  /** Place serves cocktails. */
  servesCocktails?: boolean;
  /** Place serves dessert. */
  servesDessert?: boolean;
  /** Place serves coffee. */
  servesCoffee?: boolean;
  /** Place is good for children. */
  goodForChildren?: boolean;
  /** Place allows dogs. */
  allowsDogs?: boolean;
  /** Place has restroom. */
  restroom?: boolean;
  /** Place accommodates groups. */
  goodForGroups?: boolean;
  /** Place is suitable for watching sports. */
  goodForWatchingSports?: boolean;
  /** Payment options the place accepts. If a payment option data is not available, the payment option field will be unset. */
  paymentOptions?: GoogleMapsPlacesV1PlacePaymentOptions;
  /** Options of parking provided by the place. */
  parkingOptions?: GoogleMapsPlacesV1PlaceParkingOptions;
  /** A list of sub-destinations related to the place. */
  subDestinations?: Array<GoogleMapsPlacesV1PlaceSubDestination>;
  /** Information about the accessibility options a place offers. */
  accessibilityOptions?: GoogleMapsPlacesV1PlaceAccessibilityOptions;
  /** The most recent information about fuel options in a gas station. This information is updated regularly. */
  fuelOptions?: GoogleMapsPlacesV1FuelOptions;
  /** Information of ev charging options. */
  evChargeOptions?: GoogleMapsPlacesV1EVChargeOptions;
  /** AI-generated summary of the place. */
  generativeSummary?: GoogleMapsPlacesV1PlaceGenerativeSummary;
  /** List of places in which the current place is located. */
  containingPlaces?: Array<GoogleMapsPlacesV1PlaceContainingPlace>;
  /** Indicates whether the place is a pure service area business. Pure service area business is a business that visits or delivers to customers directly but does not serve customers at their business address. For example, businesses like cleaning services or plumbers. Those businesses may not have a physical address or location on Google Maps. */
  pureServiceAreaBusiness?: boolean;
  /** The address descriptor of the place. Address descriptors include additional information that help describe a location using landmarks and areas. See address descriptor regional coverage in https://developers.google.com/maps/documentation/geocoding/address-descriptors/coverage. */
  addressDescriptor?: GoogleMapsPlacesV1AddressDescriptor;
  /** Links to trigger different Google Maps actions. */
  googleMapsLinks?: GoogleMapsPlacesV1PlaceGoogleMapsLinks;
  /** The price range associated with a Place. */
  priceRange?: GoogleMapsPlacesV1PriceRange;
  /** AI-generated summary of the place using user reviews. */
  reviewSummary?: GoogleMapsPlacesV1PlaceReviewSummary;
  /** The summary of amenities near the EV charging station. */
  evChargeAmenitySummary?: GoogleMapsPlacesV1PlaceEvChargeAmenitySummary;
  /** A summary of points of interest near the place. */
  neighborhoodSummary?: GoogleMapsPlacesV1PlaceNeighborhoodSummary;
  /** The consumer alert message for the place when we detect suspicious review activity on a business or a business violates our policies. */
  consumerAlert?: GoogleMapsPlacesV1PlaceConsumerAlert;
  /** If this Place is permanently closed and has moved to a new Place, this field contains the new Place's resource name, in `places/{place_id}` format. If this Place moved multiple times, this field will represent the first moved place. This field will not be populated if this Place has not moved. */
  movedPlace?: string;
  /** If this Place is permanently closed and has moved to a new Place, this field contains the new Place's place ID. If this Place moved multiple times, this field will represent the first moved Place. This field will not be populated if this Place has not moved. */
  movedPlaceId?: string;
}

export const GoogleMapsPlacesV1Place: Schema.Schema<GoogleMapsPlacesV1Place> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(GoogleTypeLocalizedText),
  types: Schema.optional(Schema.Array(Schema.String)),
  primaryType: Schema.optional(Schema.String),
  primaryTypeDisplayName: Schema.optional(GoogleTypeLocalizedText),
  googleMapsTypeLabel: Schema.optional(GoogleTypeLocalizedText),
  nationalPhoneNumber: Schema.optional(Schema.String),
  internationalPhoneNumber: Schema.optional(Schema.String),
  formattedAddress: Schema.optional(Schema.String),
  shortFormattedAddress: Schema.optional(Schema.String),
  postalAddress: Schema.optional(GoogleTypePostalAddress),
  addressComponents: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceAddressComponent)),
  plusCode: Schema.optional(GoogleMapsPlacesV1PlacePlusCode),
  location: Schema.optional(GoogleTypeLatLng),
  viewport: Schema.optional(GoogleGeoTypeViewport),
  rating: Schema.optional(Schema.Number),
  googleMapsUri: Schema.optional(Schema.String),
  websiteUri: Schema.optional(Schema.String),
  reviews: Schema.optional(Schema.Array(GoogleMapsPlacesV1Review)),
  regularOpeningHours: Schema.optional(GoogleMapsPlacesV1PlaceOpeningHours),
  utcOffsetMinutes: Schema.optional(Schema.Number),
  timeZone: Schema.optional(GoogleTypeTimeZone),
  photos: Schema.optional(Schema.Array(GoogleMapsPlacesV1Photo)),
  adrFormatAddress: Schema.optional(Schema.String),
  businessStatus: Schema.optional(Schema.String),
  priceLevel: Schema.optional(Schema.String),
  attributions: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceAttribution)),
  userRatingCount: Schema.optional(Schema.Number),
  iconMaskBaseUri: Schema.optional(Schema.String),
  iconBackgroundColor: Schema.optional(Schema.String),
  takeout: Schema.optional(Schema.Boolean),
  delivery: Schema.optional(Schema.Boolean),
  dineIn: Schema.optional(Schema.Boolean),
  curbsidePickup: Schema.optional(Schema.Boolean),
  reservable: Schema.optional(Schema.Boolean),
  servesBreakfast: Schema.optional(Schema.Boolean),
  servesLunch: Schema.optional(Schema.Boolean),
  servesDinner: Schema.optional(Schema.Boolean),
  servesBeer: Schema.optional(Schema.Boolean),
  servesWine: Schema.optional(Schema.Boolean),
  servesBrunch: Schema.optional(Schema.Boolean),
  servesVegetarianFood: Schema.optional(Schema.Boolean),
  currentOpeningHours: Schema.optional(GoogleMapsPlacesV1PlaceOpeningHours),
  currentSecondaryOpeningHours: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceOpeningHours)),
  regularSecondaryOpeningHours: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceOpeningHours)),
  editorialSummary: Schema.optional(GoogleTypeLocalizedText),
  outdoorSeating: Schema.optional(Schema.Boolean),
  liveMusic: Schema.optional(Schema.Boolean),
  menuForChildren: Schema.optional(Schema.Boolean),
  servesCocktails: Schema.optional(Schema.Boolean),
  servesDessert: Schema.optional(Schema.Boolean),
  servesCoffee: Schema.optional(Schema.Boolean),
  goodForChildren: Schema.optional(Schema.Boolean),
  allowsDogs: Schema.optional(Schema.Boolean),
  restroom: Schema.optional(Schema.Boolean),
  goodForGroups: Schema.optional(Schema.Boolean),
  goodForWatchingSports: Schema.optional(Schema.Boolean),
  paymentOptions: Schema.optional(GoogleMapsPlacesV1PlacePaymentOptions),
  parkingOptions: Schema.optional(GoogleMapsPlacesV1PlaceParkingOptions),
  subDestinations: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceSubDestination)),
  accessibilityOptions: Schema.optional(GoogleMapsPlacesV1PlaceAccessibilityOptions),
  fuelOptions: Schema.optional(GoogleMapsPlacesV1FuelOptions),
  evChargeOptions: Schema.optional(GoogleMapsPlacesV1EVChargeOptions),
  generativeSummary: Schema.optional(GoogleMapsPlacesV1PlaceGenerativeSummary),
  containingPlaces: Schema.optional(Schema.Array(GoogleMapsPlacesV1PlaceContainingPlace)),
  pureServiceAreaBusiness: Schema.optional(Schema.Boolean),
  addressDescriptor: Schema.optional(GoogleMapsPlacesV1AddressDescriptor),
  googleMapsLinks: Schema.optional(GoogleMapsPlacesV1PlaceGoogleMapsLinks),
  priceRange: Schema.optional(GoogleMapsPlacesV1PriceRange),
  reviewSummary: Schema.optional(GoogleMapsPlacesV1PlaceReviewSummary),
  evChargeAmenitySummary: Schema.optional(GoogleMapsPlacesV1PlaceEvChargeAmenitySummary),
  neighborhoodSummary: Schema.optional(GoogleMapsPlacesV1PlaceNeighborhoodSummary),
  consumerAlert: Schema.optional(GoogleMapsPlacesV1PlaceConsumerAlert),
  movedPlace: Schema.optional(Schema.String),
  movedPlaceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1Place" }) as any as Schema.Schema<GoogleMapsPlacesV1Place>;

export interface GoogleMapsPlacesV1RoutingSummaryLeg {
  /** The time it takes to complete this leg of the trip. */
  duration?: string;
  /** The distance of this leg of the trip. */
  distanceMeters?: number;
}

export const GoogleMapsPlacesV1RoutingSummaryLeg: Schema.Schema<GoogleMapsPlacesV1RoutingSummaryLeg> = Schema.suspend(() => Schema.Struct({
  duration: Schema.optional(Schema.String),
  distanceMeters: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMapsPlacesV1RoutingSummaryLeg" }) as any as Schema.Schema<GoogleMapsPlacesV1RoutingSummaryLeg>;

export interface GoogleMapsPlacesV1RoutingSummary {
  /** The legs of the trip. When you calculate travel duration and distance from a set origin, `legs` contains a single leg containing the duration and distance from the origin to the destination. When you do a search along route, `legs` contains two legs: one from the origin to place, and one from the place to the destination. */
  legs?: Array<GoogleMapsPlacesV1RoutingSummaryLeg>;
  /** A link to show directions on Google Maps using the waypoints from the given routing summary. The route generated by this link is not guaranteed to be the same as the route used to generate the routing summary. The link uses information provided in the request, from fields including `routingParameters` and `searchAlongRouteParameters` when applicable, to generate the directions link. */
  directionsUri?: string;
}

export const GoogleMapsPlacesV1RoutingSummary: Schema.Schema<GoogleMapsPlacesV1RoutingSummary> = Schema.suspend(() => Schema.Struct({
  legs: Schema.optional(Schema.Array(GoogleMapsPlacesV1RoutingSummaryLeg)),
  directionsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1RoutingSummary" }) as any as Schema.Schema<GoogleMapsPlacesV1RoutingSummary>;

export interface GoogleMapsPlacesV1SearchNearbyResponse {
  /** A list of places that meets user's requirements like places types, number of places and specific location restriction. */
  places?: Array<GoogleMapsPlacesV1Place>;
  /** A list of routing summaries where each entry associates to the corresponding place in the same index in the `places` field. If the routing summary is not available for one of the places, it will contain an empty entry. This list should have as many entries as the list of places if requested. */
  routingSummaries?: Array<GoogleMapsPlacesV1RoutingSummary>;
}

export const GoogleMapsPlacesV1SearchNearbyResponse: Schema.Schema<GoogleMapsPlacesV1SearchNearbyResponse> = Schema.suspend(() => Schema.Struct({
  places: Schema.optional(Schema.Array(GoogleMapsPlacesV1Place)),
  routingSummaries: Schema.optional(Schema.Array(GoogleMapsPlacesV1RoutingSummary)),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchNearbyResponse" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchNearbyResponse>;

export interface GoogleMapsPlacesV1SearchTextRequestLocationBias {
  /** A rectangle box defined by northeast and southwest corner. `rectangle.high()` must be the northeast point of the rectangle viewport. `rectangle.low()` must be the southwest point of the rectangle viewport. `rectangle.low().latitude()` cannot be greater than `rectangle.high().latitude()`. This will result in an empty latitude range. A rectangle viewport cannot be wider than 180 degrees. */
  rectangle?: GoogleGeoTypeViewport;
  /** A circle defined by center point and radius. */
  circle?: GoogleMapsPlacesV1Circle;
}

export const GoogleMapsPlacesV1SearchTextRequestLocationBias: Schema.Schema<GoogleMapsPlacesV1SearchTextRequestLocationBias> = Schema.suspend(() => Schema.Struct({
  rectangle: Schema.optional(GoogleGeoTypeViewport),
  circle: Schema.optional(GoogleMapsPlacesV1Circle),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchTextRequestLocationBias" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchTextRequestLocationBias>;

export interface GoogleMapsPlacesV1SearchTextRequestLocationRestriction {
  /** A rectangle box defined by northeast and southwest corner. `rectangle.high()` must be the northeast point of the rectangle viewport. `rectangle.low()` must be the southwest point of the rectangle viewport. `rectangle.low().latitude()` cannot be greater than `rectangle.high().latitude()`. This will result in an empty latitude range. A rectangle viewport cannot be wider than 180 degrees. */
  rectangle?: GoogleGeoTypeViewport;
}

export const GoogleMapsPlacesV1SearchTextRequestLocationRestriction: Schema.Schema<GoogleMapsPlacesV1SearchTextRequestLocationRestriction> = Schema.suspend(() => Schema.Struct({
  rectangle: Schema.optional(GoogleGeoTypeViewport),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchTextRequestLocationRestriction" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchTextRequestLocationRestriction>;

export interface GoogleMapsPlacesV1SearchTextRequestEVOptions {
  /** Optional. Minimum required charging rate in kilowatts. A place with a charging rate less than the specified rate is filtered out. */
  minimumChargingRateKw?: number;
  /** Optional. The list of preferred EV connector types. A place that does not support any of the listed connector types is filtered out. */
  connectorTypes?: Array<"EV_CONNECTOR_TYPE_UNSPECIFIED" | "EV_CONNECTOR_TYPE_OTHER" | "EV_CONNECTOR_TYPE_J1772" | "EV_CONNECTOR_TYPE_TYPE_2" | "EV_CONNECTOR_TYPE_CHADEMO" | "EV_CONNECTOR_TYPE_CCS_COMBO_1" | "EV_CONNECTOR_TYPE_CCS_COMBO_2" | "EV_CONNECTOR_TYPE_TESLA" | "EV_CONNECTOR_TYPE_UNSPECIFIED_GB_T" | "EV_CONNECTOR_TYPE_UNSPECIFIED_WALL_OUTLET" | "EV_CONNECTOR_TYPE_NACS" | (string & {})>;
}

export const GoogleMapsPlacesV1SearchTextRequestEVOptions: Schema.Schema<GoogleMapsPlacesV1SearchTextRequestEVOptions> = Schema.suspend(() => Schema.Struct({
  minimumChargingRateKw: Schema.optional(Schema.Number),
  connectorTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchTextRequestEVOptions" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchTextRequestEVOptions>;

export interface GoogleMapsPlacesV1Polyline {
  /** An [encoded polyline](https://developers.google.com/maps/documentation/utilities/polylinealgorithm), as returned by the [Routes API by default](https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes#polylineencoding). See the [encoder](https://developers.google.com/maps/documentation/utilities/polylineutility) and [decoder](https://developers.google.com/maps/documentation/routes/polylinedecoder) tools. */
  encodedPolyline?: string;
}

export const GoogleMapsPlacesV1Polyline: Schema.Schema<GoogleMapsPlacesV1Polyline> = Schema.suspend(() => Schema.Struct({
  encodedPolyline: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1Polyline" }) as any as Schema.Schema<GoogleMapsPlacesV1Polyline>;

export interface GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters {
  /** Required. The route polyline. */
  polyline?: GoogleMapsPlacesV1Polyline;
}

export const GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters: Schema.Schema<GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters> = Schema.suspend(() => Schema.Struct({
  polyline: Schema.optional(GoogleMapsPlacesV1Polyline),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters>;

export interface GoogleMapsPlacesV1SearchTextRequest {
  /** Required. The text query for textual search. */
  textQuery?: string;
  /** Place details will be displayed with the preferred language if available. If the language code is unspecified or unrecognized, place details of any language may be returned, with a preference for English if such details exist. Current list of supported languages: https://developers.google.com/maps/faq#languagesupport. */
  languageCode?: string;
  /** The Unicode country/region code (CLDR) of the location where the request is coming from. This parameter is used to display the place details, like region-specific place name, if available. The parameter can affect results based on applicable law. For more information, see https://www.unicode.org/cldr/charts/latest/supplemental/territory_language_information.html. Note that 3-digit region codes are not currently supported. */
  regionCode?: string;
  /** How results will be ranked in the response. */
  rankPreference?: "RANK_PREFERENCE_UNSPECIFIED" | "DISTANCE" | "RELEVANCE" | (string & {});
  /** The requested place type. Full list of types supported: https://developers.google.com/maps/documentation/places/web-service/place-types. Only support one included type. */
  includedType?: string;
  /** Used to restrict the search to places that are currently open. The default is false. */
  openNow?: boolean;
  /** Filter out results whose average user rating is strictly less than this limit. A valid value must be a float between 0 and 5 (inclusively) at a 0.5 cadence i.e. [0, 0.5, 1.0, ... , 5.0] inclusively. The input rating will round up to the nearest 0.5(ceiling). For instance, a rating of 0.6 will eliminate all results with a less than 1.0 rating. */
  minRating?: number;
  /** Deprecated: Use `page_size` instead. The maximum number of results per page that can be returned. If the number of available results is larger than `max_result_count`, a `next_page_token` is returned which can be passed to `page_token` to get the next page of results in subsequent requests. If 0 or no value is provided, a default of 20 is used. The maximum value is 20; values above 20 will be coerced to 20. Negative values will return an INVALID_ARGUMENT error. If both `max_result_count` and `page_size` are specified, `max_result_count` will be ignored. */
  maxResultCount?: number;
  /** Optional. The maximum number of results per page that can be returned. If the number of available results is larger than `page_size`, a `next_page_token` is returned which can be passed to `page_token` to get the next page of results in subsequent requests. If 0 or no value is provided, a default of 20 is used. The maximum value is 20; values above 20 will be set to 20. Negative values will return an INVALID_ARGUMENT error. If both `max_result_count` and `page_size` are specified, `max_result_count` will be ignored. */
  pageSize?: number;
  /** Optional. A page token, received from a previous TextSearch call. Provide this to retrieve the subsequent page. When paginating, all parameters other than `page_token`, `page_size`, and `max_result_count` provided to TextSearch must match the initial call that provided the page token. Otherwise an INVALID_ARGUMENT error is returned. */
  pageToken?: string;
  /** Used to restrict the search to places that are marked as certain price levels. Users can choose any combinations of price levels. Default to select all price levels. */
  priceLevels?: Array<"PRICE_LEVEL_UNSPECIFIED" | "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE" | (string & {})>;
  /** Used to set strict type filtering for included_type. If set to true, only results of the same type will be returned. Default to false. */
  strictTypeFiltering?: boolean;
  /** The region to search. This location serves as a bias which means results around given location might be returned. Cannot be set along with location_restriction. */
  locationBias?: GoogleMapsPlacesV1SearchTextRequestLocationBias;
  /** The region to search. This location serves as a restriction which means results outside given location will not be returned. Cannot be set along with location_bias. */
  locationRestriction?: GoogleMapsPlacesV1SearchTextRequestLocationRestriction;
  /** Optional. Set the searchable EV options of a place search request. */
  evOptions?: GoogleMapsPlacesV1SearchTextRequestEVOptions;
  /** Optional. Additional parameters for routing to results. */
  routingParameters?: GoogleMapsPlacesV1RoutingParameters;
  /** Optional. Additional parameters proto for searching along a route. */
  searchAlongRouteParameters?: GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters;
  /** Optional. Include pure service area businesses if the field is set to true. Pure service area business is a business that visits or delivers to customers directly but does not serve customers at their business address. For example, businesses like cleaning services or plumbers. Those businesses do not have a physical address or location on Google Maps. Places will not return fields including `location`, `plus_code`, and other location related fields for these businesses. */
  includePureServiceAreaBusinesses?: boolean;
}

export const GoogleMapsPlacesV1SearchTextRequest: Schema.Schema<GoogleMapsPlacesV1SearchTextRequest> = Schema.suspend(() => Schema.Struct({
  textQuery: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  rankPreference: Schema.optional(Schema.String),
  includedType: Schema.optional(Schema.String),
  openNow: Schema.optional(Schema.Boolean),
  minRating: Schema.optional(Schema.Number),
  maxResultCount: Schema.optional(Schema.Number),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  priceLevels: Schema.optional(Schema.Array(Schema.String)),
  strictTypeFiltering: Schema.optional(Schema.Boolean),
  locationBias: Schema.optional(GoogleMapsPlacesV1SearchTextRequestLocationBias),
  locationRestriction: Schema.optional(GoogleMapsPlacesV1SearchTextRequestLocationRestriction),
  evOptions: Schema.optional(GoogleMapsPlacesV1SearchTextRequestEVOptions),
  routingParameters: Schema.optional(GoogleMapsPlacesV1RoutingParameters),
  searchAlongRouteParameters: Schema.optional(GoogleMapsPlacesV1SearchTextRequestSearchAlongRouteParameters),
  includePureServiceAreaBusinesses: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchTextRequest" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchTextRequest>;

export interface GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange {
  startIndex?: number;
  endIndex?: number;
}

export const GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange: Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange> = Schema.suspend(() => Schema.Struct({
  startIndex: Schema.optional(Schema.Number),
  endIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange" }) as any as Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange>;

export interface GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText {
  text?: string;
  /** The list of the ranges of the highlighted text. */
  highlightedTextRanges?: Array<GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange>;
}

export const GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText: Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  highlightedTextRanges: Schema.optional(Schema.Array(GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedTextHighlightedTextRange)),
})).annotate({ identifier: "GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText" }) as any as Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText>;

export interface GoogleMapsPlacesV1ContextualContentJustificationReviewJustification {
  highlightedText?: GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText;
  /** The review that the highlighted text is generated from. */
  review?: GoogleMapsPlacesV1Review;
}

export const GoogleMapsPlacesV1ContextualContentJustificationReviewJustification: Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationReviewJustification> = Schema.suspend(() => Schema.Struct({
  highlightedText: Schema.optional(GoogleMapsPlacesV1ContextualContentJustificationReviewJustificationHighlightedText),
  review: Schema.optional(GoogleMapsPlacesV1Review),
})).annotate({ identifier: "GoogleMapsPlacesV1ContextualContentJustificationReviewJustification" }) as any as Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationReviewJustification>;

export interface GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification {
  /** If a place provides takeout. */
  takeout?: boolean;
  /** If a place provides delivery. */
  delivery?: boolean;
  /** If a place provides dine-in. */
  dineIn?: boolean;
}

export const GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification: Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification> = Schema.suspend(() => Schema.Struct({
  takeout: Schema.optional(Schema.Boolean),
  delivery: Schema.optional(Schema.Boolean),
  dineIn: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification" }) as any as Schema.Schema<GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification>;

export interface GoogleMapsPlacesV1ContextualContentJustification {
  /** Experimental: See https://developers.google.com/maps/documentation/places/web-service/experimental/places-generative for more details. */
  reviewJustification?: GoogleMapsPlacesV1ContextualContentJustificationReviewJustification;
  /** Experimental: See https://developers.google.com/maps/documentation/places/web-service/experimental/places-generative for more details. */
  businessAvailabilityAttributesJustification?: GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification;
}

export const GoogleMapsPlacesV1ContextualContentJustification: Schema.Schema<GoogleMapsPlacesV1ContextualContentJustification> = Schema.suspend(() => Schema.Struct({
  reviewJustification: Schema.optional(GoogleMapsPlacesV1ContextualContentJustificationReviewJustification),
  businessAvailabilityAttributesJustification: Schema.optional(GoogleMapsPlacesV1ContextualContentJustificationBusinessAvailabilityAttributesJustification),
})).annotate({ identifier: "GoogleMapsPlacesV1ContextualContentJustification" }) as any as Schema.Schema<GoogleMapsPlacesV1ContextualContentJustification>;

export interface GoogleMapsPlacesV1ContextualContent {
  /** List of reviews about this place, contextual to the place query. */
  reviews?: Array<GoogleMapsPlacesV1Review>;
  /** Information (including references) about photos of this place, contextual to the place query. */
  photos?: Array<GoogleMapsPlacesV1Photo>;
  /** Experimental: See https://developers.google.com/maps/documentation/places/web-service/experimental/places-generative for more details. Justifications for the place. */
  justifications?: Array<GoogleMapsPlacesV1ContextualContentJustification>;
}

export const GoogleMapsPlacesV1ContextualContent: Schema.Schema<GoogleMapsPlacesV1ContextualContent> = Schema.suspend(() => Schema.Struct({
  reviews: Schema.optional(Schema.Array(GoogleMapsPlacesV1Review)),
  photos: Schema.optional(Schema.Array(GoogleMapsPlacesV1Photo)),
  justifications: Schema.optional(Schema.Array(GoogleMapsPlacesV1ContextualContentJustification)),
})).annotate({ identifier: "GoogleMapsPlacesV1ContextualContent" }) as any as Schema.Schema<GoogleMapsPlacesV1ContextualContent>;

export interface GoogleMapsPlacesV1SearchTextResponse {
  /** A list of places that meet the user's text search criteria. */
  places?: Array<GoogleMapsPlacesV1Place>;
  /** A list of routing summaries where each entry associates to the corresponding place in the same index in the `places` field. If the routing summary is not available for one of the places, it will contain an empty entry. This list will have as many entries as the list of places if requested. */
  routingSummaries?: Array<GoogleMapsPlacesV1RoutingSummary>;
  /** Experimental: See https://developers.google.com/maps/documentation/places/web-service/experimental/places-generative for more details. A list of contextual contents where each entry associates to the corresponding place in the same index in the places field. The contents that are relevant to the `text_query` in the request are preferred. If the contextual content is not available for one of the places, it will return non-contextual content. It will be empty only when the content is unavailable for this place. This list will have as many entries as the list of places if requested. */
  contextualContents?: Array<GoogleMapsPlacesV1ContextualContent>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted or empty, there are no subsequent pages. */
  nextPageToken?: string;
  /** A link allows the user to search with the same text query as specified in the request on Google Maps. */
  searchUri?: string;
}

export const GoogleMapsPlacesV1SearchTextResponse: Schema.Schema<GoogleMapsPlacesV1SearchTextResponse> = Schema.suspend(() => Schema.Struct({
  places: Schema.optional(Schema.Array(GoogleMapsPlacesV1Place)),
  routingSummaries: Schema.optional(Schema.Array(GoogleMapsPlacesV1RoutingSummary)),
  contextualContents: Schema.optional(Schema.Array(GoogleMapsPlacesV1ContextualContent)),
  nextPageToken: Schema.optional(Schema.String),
  searchUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1SearchTextResponse" }) as any as Schema.Schema<GoogleMapsPlacesV1SearchTextResponse>;

export interface GoogleMapsPlacesV1PhotoMedia {
  /** The resource name of a photo media in the format: `places/{place_id}/photos/{photo_reference}/media`. */
  name?: string;
  /** A short-lived uri that can be used to render the photo. */
  photoUri?: string;
}

export const GoogleMapsPlacesV1PhotoMedia: Schema.Schema<GoogleMapsPlacesV1PhotoMedia> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  photoUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsPlacesV1PhotoMedia" }) as any as Schema.Schema<GoogleMapsPlacesV1PhotoMedia>;

export interface GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias {
  /** A viewport defined by a northeast and a southwest corner. */
  rectangle?: GoogleGeoTypeViewport;
  /** A circle defined by a center point and radius. */
  circle?: GoogleMapsPlacesV1Circle;
}

export const GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias> = Schema.suspend(() => Schema.Struct({
  rectangle: Schema.optional(GoogleGeoTypeViewport),
  circle: Schema.optional(GoogleMapsPlacesV1Circle),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias>;

export interface GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction {
  /** A viewport defined by a northeast and a southwest corner. */
  rectangle?: GoogleGeoTypeViewport;
  /** A circle defined by a center point and radius. */
  circle?: GoogleMapsPlacesV1Circle;
}

export const GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction> = Schema.suspend(() => Schema.Struct({
  rectangle: Schema.optional(GoogleGeoTypeViewport),
  circle: Schema.optional(GoogleMapsPlacesV1Circle),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction>;

export interface GoogleMapsPlacesV1AutocompletePlacesRequest {
  /** Required. The text string on which to search. */
  input?: string;
  /** Optional. Bias results to a specified location. At most one of `location_bias` or `location_restriction` should be set. If neither are set, the results will be biased by IP address, meaning the IP address will be mapped to an imprecise location and used as a biasing signal. */
  locationBias?: GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias;
  /** Optional. Restrict results to a specified location. At most one of `location_bias` or `location_restriction` should be set. If neither are set, the results will be biased by IP address, meaning the IP address will be mapped to an imprecise location and used as a biasing signal. */
  locationRestriction?: GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction;
  /** Optional. Included primary Place type (for example, "restaurant" or "gas_station") in Place Types (https://developers.google.com/maps/documentation/places/web-service/place-types), or only `(regions)`, or only `(cities)`. A Place is only returned if its primary type is included in this list. Up to 5 values can be specified. If no types are specified, all Place types are returned. */
  includedPrimaryTypes?: Array<string>;
  /** Optional. Only include results in the specified regions, specified as up to 15 CLDR two-character region codes. An empty set will not restrict the results. If both `location_restriction` and `included_region_codes` are set, the results will be located in the area of intersection. */
  includedRegionCodes?: Array<string>;
  /** Optional. The language in which to return results. Defaults to en-US. The results may be in mixed languages if the language used in `input` is different from `language_code` or if the returned Place does not have a translation from the local language to `language_code`. */
  languageCode?: string;
  /** Optional. The region code, specified as a CLDR two-character region code. This affects address formatting, result ranking, and may influence what results are returned. This does not restrict results to the specified region. To restrict results to a region, use `region_code_restriction`. */
  regionCode?: string;
  /** Optional. The origin point from which to calculate geodesic distance to the destination (returned as `distance_meters`). If this value is omitted, geodesic distance will not be returned. */
  origin?: GoogleTypeLatLng;
  /** Optional. A zero-based Unicode character offset of `input` indicating the cursor position in `input`. The cursor position may influence what predictions are returned. If empty, defaults to the length of `input`. */
  inputOffset?: number;
  /** Optional. If true, the response will include both Place and query predictions. Otherwise the response will only return Place predictions. */
  includeQueryPredictions?: boolean;
  /** Optional. A string which identifies an Autocomplete session for billing purposes. Must be a URL and filename safe base64 string with at most 36 ASCII characters in length. Otherwise an INVALID_ARGUMENT error is returned. The session begins when the user starts typing a query, and concludes when they select a place and a call to Place Details or Address Validation is made. Each session can have multiple queries, followed by one Place Details or Address Validation request. The credentials used for each request within a session must belong to the same Google Cloud Console project. Once a session has concluded, the token is no longer valid; your app must generate a fresh token for each session. If the `session_token` parameter is omitted, or if you reuse a session token, the session is charged as if no session token was provided (each request is billed separately). We recommend the following guidelines: * Use session tokens for all Place Autocomplete calls. * Generate a fresh token for each session. Using a version 4 UUID is recommended. * Ensure that the credentials used for all Place Autocomplete, Place Details, and Address Validation requests within a session belong to the same Cloud Console project. * Be sure to pass a unique session token for each new session. Using the same token for more than one session will result in each request being billed individually. */
  sessionToken?: string;
  /** Optional. Include pure service area businesses if the field is set to true. Pure service area business is a business that visits or delivers to customers directly but does not serve customers at their business address. For example, businesses like cleaning services or plumbers. Those businesses do not have a physical address or location on Google Maps. Places will not return fields including `location`, `plus_code`, and other location related fields for these businesses. */
  includePureServiceAreaBusinesses?: boolean;
}

export const GoogleMapsPlacesV1AutocompletePlacesRequest: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesRequest> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(Schema.String),
  locationBias: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesRequestLocationBias),
  locationRestriction: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesRequestLocationRestriction),
  includedPrimaryTypes: Schema.optional(Schema.Array(Schema.String)),
  includedRegionCodes: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  origin: Schema.optional(GoogleTypeLatLng),
  inputOffset: Schema.optional(Schema.Number),
  includeQueryPredictions: Schema.optional(Schema.Boolean),
  sessionToken: Schema.optional(Schema.String),
  includePureServiceAreaBusinesses: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesRequest" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesRequest>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange {
  /** Zero-based offset of the first Unicode character of the string (inclusive). */
  startOffset?: number;
  /** Zero-based offset of the last Unicode character (exclusive). */
  endOffset?: number;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange> = Schema.suspend(() => Schema.Struct({
  startOffset: Schema.optional(Schema.Number),
  endOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText {
  /** Text that may be used as is or formatted with `matches`. */
  text?: string;
  /** A list of string ranges identifying where the input request matched in `text`. The ranges can be used to format specific parts of `text`. The substrings may not be exact matches of `input` if the matching was determined by criteria other than string matching (for example, spell corrections or transliterations). These values are Unicode character offsets of `text`. The ranges are guaranteed to be ordered in increasing offset values. */
  matches?: Array<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange>;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  matches: Schema.optional(Schema.Array(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStringRange)),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat {
  /** Represents the name of the Place or query. */
  mainText?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText;
  /** Represents additional disambiguating features (such as a city or region) to further identify the Place or refine the query. */
  secondaryText?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat> = Schema.suspend(() => Schema.Struct({
  mainText: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText),
  secondaryText: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction {
  /** The resource name of the suggested Place. This name can be used in other APIs that accept Place names. */
  place?: string;
  /** The unique identifier of the suggested Place. This identifier can be used in other APIs that accept Place IDs. */
  placeId?: string;
  /** Contains the human-readable name for the returned result. For establishment results, this is usually the business name and address. `text` is recommended for developers who wish to show a single UI element. Developers who wish to show two separate, but related, UI elements may want to use `structured_format` instead. They are two different ways to represent a Place prediction. Users should not try to parse `structured_format` into `text` or vice versa. This text may be different from the `display_name` returned by GetPlace. May be in mixed languages if the request `input` and `language_code` are in different languages or if the Place does not have a translation from the local language to `language_code`. */
  text?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText;
  /** A breakdown of the Place prediction into main text containing the name of the Place and secondary text containing additional disambiguating features (such as a city or region). `structured_format` is recommended for developers who wish to show two separate, but related, UI elements. Developers who wish to show a single UI element may want to use `text` instead. They are two different ways to represent a Place prediction. Users should not try to parse `structured_format` into `text` or vice versa. */
  structuredFormat?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat;
  /** List of types that apply to this Place from Table A or Table B in https://developers.google.com/maps/documentation/places/web-service/place-types. A type is a categorization of a Place. Places with shared types will share similar characteristics. */
  types?: Array<string>;
  /** The length of the geodesic in meters from `origin` if `origin` is specified. Certain predictions such as routes may not populate this field. */
  distanceMeters?: number;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction> = Schema.suspend(() => Schema.Struct({
  place: Schema.optional(Schema.String),
  placeId: Schema.optional(Schema.String),
  text: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText),
  structuredFormat: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat),
  types: Schema.optional(Schema.Array(Schema.String)),
  distanceMeters: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction {
  /** The predicted text. This text does not represent a Place, but rather a text query that could be used in a search endpoint (for example, Text Search). `text` is recommended for developers who wish to show a single UI element. Developers who wish to show two separate, but related, UI elements may want to use `structured_format` instead. They are two different ways to represent a query prediction. Users should not try to parse `structured_format` into `text` or vice versa. May be in mixed languages if the request `input` and `language_code` are in different languages or if part of the query does not have a translation from the local language to `language_code`. */
  text?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText;
  /** A breakdown of the query prediction into main text containing the query and secondary text containing additional disambiguating features (such as a city or region). `structured_format` is recommended for developers who wish to show two separate, but related, UI elements. Developers who wish to show a single UI element may want to use `text` instead. They are two different ways to represent a query prediction. Users should not try to parse `structured_format` into `text` or vice versa. */
  structuredFormat?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionFormattableText),
  structuredFormat: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionStructuredFormat),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion {
  /** A prediction for a Place. */
  placePrediction?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction;
  /** A prediction for a query. */
  queryPrediction?: GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion> = Schema.suspend(() => Schema.Struct({
  placePrediction: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionPlacePrediction),
  queryPrediction: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestionQueryPrediction),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion>;

export interface GoogleMapsPlacesV1AutocompletePlacesResponse {
  /** Contains a list of suggestions, ordered in descending order of relevance. */
  suggestions?: Array<GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion>;
}

export const GoogleMapsPlacesV1AutocompletePlacesResponse: Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponse> = Schema.suspend(() => Schema.Struct({
  suggestions: Schema.optional(Schema.Array(GoogleMapsPlacesV1AutocompletePlacesResponseSuggestion)),
})).annotate({ identifier: "GoogleMapsPlacesV1AutocompletePlacesResponse" }) as any as Schema.Schema<GoogleMapsPlacesV1AutocompletePlacesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Search for places near locations. */
export interface SearchNearbyPlacesRequest {
  /** Request body */
  body?: GoogleMapsPlacesV1SearchNearbyRequest;
}

export const SearchNearbyPlacesRequest = Schema.Struct({
  body: Schema.optional(GoogleMapsPlacesV1SearchNearbyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/places:searchNearby", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchNearbyPlacesRequest>;

export type SearchNearbyPlacesResponse = GoogleMapsPlacesV1SearchNearbyResponse;
export const SearchNearbyPlacesResponse = GoogleMapsPlacesV1SearchNearbyResponse;

export type SearchNearbyPlacesError = CommonErrors;

export const searchNearbyPlaces: API.OperationMethod<SearchNearbyPlacesRequest, SearchNearbyPlacesResponse, SearchNearbyPlacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchNearbyPlacesRequest,
  output: SearchNearbyPlacesResponse,
  errors: [],
}));

/** Text query based place search. */
export interface SearchTextPlacesRequest {
  /** Request body */
  body?: GoogleMapsPlacesV1SearchTextRequest;
}

export const SearchTextPlacesRequest = Schema.Struct({
  body: Schema.optional(GoogleMapsPlacesV1SearchTextRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/places:searchText", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchTextPlacesRequest>;

export type SearchTextPlacesResponse = GoogleMapsPlacesV1SearchTextResponse;
export const SearchTextPlacesResponse = GoogleMapsPlacesV1SearchTextResponse;

export type SearchTextPlacesError = CommonErrors;

export const searchTextPlaces: API.OperationMethod<SearchTextPlacesRequest, SearchTextPlacesResponse, SearchTextPlacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchTextPlacesRequest,
  output: SearchTextPlacesResponse,
  errors: [],
}));

/** Get the details of a place based on its resource name, which is a string in the `places/{place_id}` format. */
export interface GetPlacesRequest {
  /** Required. The resource name of a place, in the `places/{place_id}` format. */
  name: string;
  /** Optional. Place details will be displayed with the preferred language if available. Current list of supported languages: https://developers.google.com/maps/faq#languagesupport. */
  languageCode?: string;
  /** Optional. The Unicode country/region code (CLDR) of the location where the request is coming from. This parameter is used to display the place details, like region-specific place name, if available. The parameter can affect results based on applicable law. For more information, see https://www.unicode.org/cldr/charts/latest/supplemental/territory_language_information.html. Note that 3-digit region codes are not currently supported. */
  regionCode?: string;
  /** Optional. A string which identifies an Autocomplete session for billing purposes. Must be a URL and filename safe base64 string with at most 36 ASCII characters in length. Otherwise an INVALID_ARGUMENT error is returned. The session begins when the user starts typing a query, and concludes when they select a place and a call to Place Details or Address Validation is made. Each session can have multiple queries, followed by one Place Details or Address Validation request. The credentials used for each request within a session must belong to the same Google Cloud Console project. Once a session has concluded, the token is no longer valid; your app must generate a fresh token for each session. If the `session_token` parameter is omitted, or if you reuse a session token, the session is charged as if no session token was provided (each request is billed separately). We recommend the following guidelines: * Use session tokens for all Place Autocomplete calls. * Generate a fresh token for each session. Using a version 4 UUID is recommended. * Ensure that the credentials used for all Place Autocomplete, Place Details, and Address Validation requests within a session belong to the same Cloud Console project. * Be sure to pass a unique session token for each new session. Using the same token for more than one session will result in each request being billed individually. */
  sessionToken?: string;
}

export const GetPlacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  sessionToken: Schema.optional(Schema.String).pipe(T.HttpQuery("sessionToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/places/{placesId}" }),
  svc,
) as unknown as Schema.Schema<GetPlacesRequest>;

export type GetPlacesResponse = GoogleMapsPlacesV1Place;
export const GetPlacesResponse = GoogleMapsPlacesV1Place;

export type GetPlacesError = CommonErrors;

export const getPlaces: API.OperationMethod<GetPlacesRequest, GetPlacesResponse, GetPlacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPlacesRequest,
  output: GetPlacesResponse,
  errors: [],
}));

/** Returns predictions for the given input. */
export interface AutocompletePlacesRequest {
  /** Request body */
  body?: GoogleMapsPlacesV1AutocompletePlacesRequest;
}

export const AutocompletePlacesRequest = Schema.Struct({
  body: Schema.optional(GoogleMapsPlacesV1AutocompletePlacesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/places:autocomplete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AutocompletePlacesRequest>;

export type AutocompletePlacesResponse = GoogleMapsPlacesV1AutocompletePlacesResponse;
export const AutocompletePlacesResponse = GoogleMapsPlacesV1AutocompletePlacesResponse;

export type AutocompletePlacesError = CommonErrors;

export const autocompletePlaces: API.OperationMethod<AutocompletePlacesRequest, AutocompletePlacesResponse, AutocompletePlacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AutocompletePlacesRequest,
  output: AutocompletePlacesResponse,
  errors: [],
}));

/** Get a photo media with a photo reference string. */
export interface GetMediaPlacesPhotosRequest {
  /** Required. The resource name of a photo media in the format: `places/{place_id}/photos/{photo_reference}/media`. The resource name of a photo as returned in a Place object's `photos.name` field comes with the format `places/{place_id}/photos/{photo_reference}`. You need to append `/media` at the end of the photo resource to get the photo media resource name. */
  name: string;
  /** Optional. Specifies the maximum desired width, in pixels, of the image. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the max_height_px and max_width_px properties accept an integer between 1 and 4800, inclusively. If the value is not within the allowed range, an INVALID_ARGUMENT error will be returned. At least one of max_height_px or max_width_px needs to be specified. If neither max_height_px nor max_width_px is specified, an INVALID_ARGUMENT error will be returned. */
  maxWidthPx?: number;
  /** Optional. Specifies the maximum desired height, in pixels, of the image. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the max_height_px and max_width_px properties accept an integer between 1 and 4800, inclusively. If the value is not within the allowed range, an INVALID_ARGUMENT error will be returned. At least one of max_height_px or max_width_px needs to be specified. If neither max_height_px nor max_width_px is specified, an INVALID_ARGUMENT error will be returned. */
  maxHeightPx?: number;
  /** Optional. If set, skip the default HTTP redirect behavior and render a text format (for example, in JSON format for HTTP use case) response. If not set, an HTTP redirect will be issued to redirect the call to the image media. This option is ignored for non-HTTP requests. */
  skipHttpRedirect?: boolean;
}

export const GetMediaPlacesPhotosRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  maxWidthPx: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxWidthPx")),
  maxHeightPx: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxHeightPx")),
  skipHttpRedirect: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("skipHttpRedirect")),
}).pipe(
  T.Http({ method: "GET", path: "v1/places/{placesId}/photos/{photosId}/media" }),
  svc,
) as unknown as Schema.Schema<GetMediaPlacesPhotosRequest>;

export type GetMediaPlacesPhotosResponse = GoogleMapsPlacesV1PhotoMedia;
export const GetMediaPlacesPhotosResponse = GoogleMapsPlacesV1PhotoMedia;

export type GetMediaPlacesPhotosError = CommonErrors;

export const getMediaPlacesPhotos: API.OperationMethod<GetMediaPlacesPhotosRequest, GetMediaPlacesPhotosResponse, GetMediaPlacesPhotosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMediaPlacesPhotosRequest,
  output: GetMediaPlacesPhotosResponse,
  errors: [],
}));

