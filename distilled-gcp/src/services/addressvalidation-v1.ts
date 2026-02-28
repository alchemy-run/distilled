// ==========================================================================
// Address Validation API (addressvalidation v1)
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
  name: "addressvalidation",
  version: "v1",
  rootUrl: "https://addressvalidation.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface GoogleMapsAddressvalidationV1LanguageOptions {
  /** Preview: Return a [google.maps.addressvalidation.v1.Address] in English. See [google.maps.addressvalidation.v1.ValidationResult.english_latin_address] for details. */
  returnEnglishLatinAddress?: boolean;
}

export const GoogleMapsAddressvalidationV1LanguageOptions: Schema.Schema<GoogleMapsAddressvalidationV1LanguageOptions> = Schema.suspend(() => Schema.Struct({
  returnEnglishLatinAddress: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1LanguageOptions" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1LanguageOptions>;

export interface GoogleMapsAddressvalidationV1ValidateAddressRequest {
  /** Required. The address being validated. Unformatted addresses should be submitted via `address_lines`. The total length of the fields in this input must not exceed 280 characters. Supported regions can be found [here](https://developers.google.com/maps/documentation/address-validation/coverage). The language_code value in the input address is reserved for future uses and is ignored today. The validated address result will be populated based on the preferred language for the given address, as identified by the system. The Address Validation API ignores the values in recipients and organization. Any values in those fields will be discarded and not returned. Please do not set them. */
  address?: GoogleTypePostalAddress;
  /** This field must be empty for the first address validation request. If more requests are necessary to fully validate a single address (for example if the changes the user makes after the initial validation need to be re-validated), then each followup request must populate this field with the response_id from the very first response in the validation sequence. */
  previousResponseId?: string;
  /** Enables USPS CASS compatible mode. This affects _only_ the [google.maps.addressvalidation.v1.ValidationResult.usps_data] field of [google.maps.addressvalidation.v1.ValidationResult]. Note: for USPS CASS enabled requests for addresses in Puerto Rico, a [google.type.PostalAddress.region_code] of the `address` must be provided as "PR", or an [google.type.PostalAddress.administrative_area] of the `address` must be provided as "Puerto Rico" (case-insensitive) or "PR". It's recommended to use a componentized `address`, or alternatively specify at least two [google.type.PostalAddress.address_lines] where the first line contains the street number and name and the second line contains the city, state, and zip code. */
  enableUspsCass?: boolean;
  /** Optional. Preview: This feature is in Preview (pre-GA). Pre-GA products and features might have limited support, and changes to pre-GA products and features might not be compatible with other pre-GA versions. Pre-GA Offerings are covered by the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). For more information, see the [launch stage descriptions](https://developers.google.com/maps/launch-stages). Enables the Address Validation API to include additional information in the response. */
  languageOptions?: GoogleMapsAddressvalidationV1LanguageOptions;
  /** Optional. A string which identifies an Autocomplete session for billing purposes. Must be a URL and filename safe base64 string with at most 36 ASCII characters in length. Otherwise an INVALID_ARGUMENT error is returned. The session begins when the user makes an Autocomplete query, and concludes when they select a place and a call to Place Details or Address Validation is made. Each session can have multiple Autocomplete queries, followed by one Place Details or Address Validation request. The credentials used for each request within a session must belong to the same Google Cloud Console project. Once a session has concluded, the token is no longer valid; your app must generate a fresh token for each session. If the `sessionToken` parameter is omitted, or if you reuse a session token, the session is charged as if no session token was provided (each request is billed separately). Note: Address Validation can only be used in sessions with the Autocomplete (New) API, not the Autocomplete API. See https://developers.google.com/maps/documentation/places/web-service/session-pricing for more details. */
  sessionToken?: string;
}

export const GoogleMapsAddressvalidationV1ValidateAddressRequest: Schema.Schema<GoogleMapsAddressvalidationV1ValidateAddressRequest> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(GoogleTypePostalAddress),
  previousResponseId: Schema.optional(Schema.String),
  enableUspsCass: Schema.optional(Schema.Boolean),
  languageOptions: Schema.optional(GoogleMapsAddressvalidationV1LanguageOptions),
  sessionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1ValidateAddressRequest" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1ValidateAddressRequest>;

export interface GoogleMapsAddressvalidationV1Verdict {
  /** The granularity of the **input** address. This is the result of parsing the input address and does not give any validation signals. For validation signals, refer to `validation_granularity` below. For example, if the input address includes a specific apartment number, then the `input_granularity` here will be `SUB_PREMISE`. If the address validation service cannot match the apartment number in the databases or the apartment number is invalid, the `validation_granularity` will likely be `PREMISE` or more coarse. */
  inputGranularity?: "GRANULARITY_UNSPECIFIED" | "SUB_PREMISE" | "PREMISE" | "PREMISE_PROXIMITY" | "BLOCK" | "ROUTE" | "OTHER" | (string & {});
  /** The level of granularity for the post-processed address that the API can fully validate. For example, a `validation_granularity` of `PREMISE` indicates all address components at the level of `PREMISE` or more coarse can be validated. Per address component validation result can be found in [google.maps.addressvalidation.v1.Address.address_components]. */
  validationGranularity?: "GRANULARITY_UNSPECIFIED" | "SUB_PREMISE" | "PREMISE" | "PREMISE_PROXIMITY" | "BLOCK" | "ROUTE" | "OTHER" | (string & {});
  /** Information about the granularity of the `geocode`. This can be understood as the semantic meaning of how coarse or fine the geocoded location is. This can differ from the `validation_granularity` above occasionally. For example, our database might record the existence of an apartment number but do not have a precise location for the apartment within a big apartment complex. In that case, the `validation_granularity` will be `SUB_PREMISE` but the `geocode_granularity` will be `PREMISE`. */
  geocodeGranularity?: "GRANULARITY_UNSPECIFIED" | "SUB_PREMISE" | "PREMISE" | "PREMISE_PROXIMITY" | "BLOCK" | "ROUTE" | "OTHER" | (string & {});
  /** The post-processed address is considered complete if there are no unresolved tokens, no unexpected or missing address components. If unset, indicates that the value is `false`. See `missing_component_types`, `unresolved_tokens` or `unexpected` fields for more details. */
  addressComplete?: boolean;
  /** At least one address component cannot be categorized or validated, see [google.maps.addressvalidation.v1.Address.address_components] for details. */
  hasUnconfirmedComponents?: boolean;
  /** At least one address component was inferred (added) that wasn't in the input, see [google.maps.addressvalidation.v1.Address.address_components] for details. */
  hasInferredComponents?: boolean;
  /** At least one address component was replaced, see [google.maps.addressvalidation.v1.Address.address_components] for details. */
  hasReplacedComponents?: boolean;
  /** Preview: This feature is in Preview (pre-GA). Pre-GA products and features might have limited support, and changes to pre-GA products and features might not be compatible with other pre-GA versions. Pre-GA Offerings are covered by the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). For more information, see the [launch stage descriptions](https://developers.google.com/maps/launch-stages). Offers an interpretive summary of the API response, intended to assist in determining a potential subsequent action to take. This field is derived from other fields in the API response and should not be considered as a guarantee of address accuracy or deliverability. See [Build your validation logic](https://developers.google.com/maps/documentation/address-validation/build-validation-logic) for more details. */
  possibleNextAction?: "POSSIBLE_NEXT_ACTION_UNSPECIFIED" | "FIX" | "CONFIRM_ADD_SUBPREMISES" | "CONFIRM" | "ACCEPT" | (string & {});
  /** At least one address component was spell-corrected, see [google.maps.addressvalidation.v1.Address.address_components] for details. */
  hasSpellCorrectedComponents?: boolean;
}

export const GoogleMapsAddressvalidationV1Verdict: Schema.Schema<GoogleMapsAddressvalidationV1Verdict> = Schema.suspend(() => Schema.Struct({
  inputGranularity: Schema.optional(Schema.String),
  validationGranularity: Schema.optional(Schema.String),
  geocodeGranularity: Schema.optional(Schema.String),
  addressComplete: Schema.optional(Schema.Boolean),
  hasUnconfirmedComponents: Schema.optional(Schema.Boolean),
  hasInferredComponents: Schema.optional(Schema.Boolean),
  hasReplacedComponents: Schema.optional(Schema.Boolean),
  possibleNextAction: Schema.optional(Schema.String),
  hasSpellCorrectedComponents: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1Verdict" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1Verdict>;

export interface GoogleMapsAddressvalidationV1ComponentName {
  /** The name text. For example, "5th Avenue" for a street name or "1253" for a street number. */
  text?: string;
  /** The BCP-47 language code. This will not be present if the component name is not associated with a language, such as a street number. */
  languageCode?: string;
}

export const GoogleMapsAddressvalidationV1ComponentName: Schema.Schema<GoogleMapsAddressvalidationV1ComponentName> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1ComponentName" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1ComponentName>;

export interface GoogleMapsAddressvalidationV1AddressComponent {
  /** The name for this component. */
  componentName?: GoogleMapsAddressvalidationV1ComponentName;
  /** The type of the address component. See [Table 2: Additional types returned by the Places service](https://developers.google.com/places/web-service/supported_types#table2) for a list of possible types. */
  componentType?: string;
  /** Indicates the level of certainty that we have that the component is correct. */
  confirmationLevel?: "CONFIRMATION_LEVEL_UNSPECIFIED" | "CONFIRMED" | "UNCONFIRMED_BUT_PLAUSIBLE" | "UNCONFIRMED_AND_SUSPICIOUS" | (string & {});
  /** Indicates that the component was not part of the input, but we inferred it for the address location and believe it should be provided for a complete address. */
  inferred?: boolean;
  /** Indicates a correction to a misspelling in the component name. The API does not always flag changes from one spelling variant to another, such as when changing "centre" to "center". It also does not always flag common misspellings, such as when changing "Amphitheater Pkwy" to "Amphitheatre Pkwy". */
  spellCorrected?: boolean;
  /** Indicates the name of the component was replaced with a completely different one, for example a wrong postal code being replaced with one that is correct for the address. This is not a cosmetic change, the input component has been changed to a different one. */
  replaced?: boolean;
  /** Indicates an address component that is not expected to be present in a postal address for the given region. We have retained it only because it was part of the input. */
  unexpected?: boolean;
}

export const GoogleMapsAddressvalidationV1AddressComponent: Schema.Schema<GoogleMapsAddressvalidationV1AddressComponent> = Schema.suspend(() => Schema.Struct({
  componentName: Schema.optional(GoogleMapsAddressvalidationV1ComponentName),
  componentType: Schema.optional(Schema.String),
  confirmationLevel: Schema.optional(Schema.String),
  inferred: Schema.optional(Schema.Boolean),
  spellCorrected: Schema.optional(Schema.Boolean),
  replaced: Schema.optional(Schema.Boolean),
  unexpected: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1AddressComponent" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1AddressComponent>;

export interface GoogleMapsAddressvalidationV1Address {
  /** The post-processed address, formatted as a single-line address following the address formatting rules of the region where the address is located. Note: the format of this address may not match the format of the address in the `postal_address` field. For example, the `postal_address` always represents the country as a 2 letter `region_code`, such as "US" or "NZ". By contrast, this field uses a longer form of the country name, such as "USA" or "New Zealand". */
  formattedAddress?: string;
  /** The post-processed address represented as a postal address. */
  postalAddress?: GoogleTypePostalAddress;
  /** Unordered list. The individual address components of the formatted and corrected address, along with validation information. This provides information on the validation status of the individual components. Address components are not ordered in a particular way. Do not make any assumptions on the ordering of the address components in the list. */
  addressComponents?: Array<GoogleMapsAddressvalidationV1AddressComponent>;
  /** The types of components that were expected to be present in a correctly formatted mailing address but were not found in the input AND could not be inferred. An example might be `['street_number', 'route']` for an input like "Boulder, Colorado, 80301, USA". The list of possible types can be found [here](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#Types). **Note: you might see a missing component type when you think you've already supplied the missing component.** For example, this can happen when the input address contains the building name, but not the premise number. In the address "渋谷区渋谷３丁目 Shibuya Stream", the building name "Shibuya Stream" has the component type `premise`, but the premise number is missing, so `missing_component_types` will contain `premise`. */
  missingComponentTypes?: Array<string>;
  /** The types of the components that are present in the `address_components` but could not be confirmed to be correct. This field is provided for the sake of convenience: its contents are equivalent to iterating through the `address_components` to find the types of all the components where the confirmation_level is not CONFIRMED or the inferred flag is not set to `true`. The list of possible types can be found [here](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#Types). */
  unconfirmedComponentTypes?: Array<string>;
  /** Any tokens in the input that could not be resolved. This might be an input that was not recognized as a valid part of an address. For example, for an input such as "Parcel 0000123123 & 0000456456 Str # Guthrie Center IA 50115 US", the unresolved tokens might look like `["Parcel", "0000123123", "&", "0000456456"]`. */
  unresolvedTokens?: Array<string>;
}

export const GoogleMapsAddressvalidationV1Address: Schema.Schema<GoogleMapsAddressvalidationV1Address> = Schema.suspend(() => Schema.Struct({
  formattedAddress: Schema.optional(Schema.String),
  postalAddress: Schema.optional(GoogleTypePostalAddress),
  addressComponents: Schema.optional(Schema.Array(GoogleMapsAddressvalidationV1AddressComponent)),
  missingComponentTypes: Schema.optional(Schema.Array(Schema.String)),
  unconfirmedComponentTypes: Schema.optional(Schema.Array(Schema.String)),
  unresolvedTokens: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1Address" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1Address>;

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

export interface GoogleMapsAddressvalidationV1PlusCode {
  /** Place's global (full) code, such as "9FWM33GV+HQ", representing an 1/8000 by 1/8000 degree area (~14 by 14 meters). */
  globalCode?: string;
  /** Place's compound code, such as "33GV+HQ, Ramberg, Norway", containing the suffix of the global code and replacing the prefix with a formatted name of a reference entity. */
  compoundCode?: string;
}

export const GoogleMapsAddressvalidationV1PlusCode: Schema.Schema<GoogleMapsAddressvalidationV1PlusCode> = Schema.suspend(() => Schema.Struct({
  globalCode: Schema.optional(Schema.String),
  compoundCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1PlusCode" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1PlusCode>;

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

export interface GoogleMapsAddressvalidationV1Geocode {
  /** The geocoded location of the input. Using place IDs is preferred over using addresses, latitude/longitude coordinates, or plus codes. Using coordinates when routing or calculating driving directions will always result in the point being snapped to the road nearest to those coordinates. This may not be a road that will quickly or safely lead to the destination and may not be near an access point to the property. Additionally, when a location is reverse geocoded, there is no guarantee that the returned address will match the original. */
  location?: GoogleTypeLatLng;
  /** The plus code corresponding to the `location`. */
  plusCode?: GoogleMapsAddressvalidationV1PlusCode;
  /** The bounds of the geocoded place. */
  bounds?: GoogleGeoTypeViewport;
  /** The size of the geocoded place, in meters. This is another measure of the coarseness of the geocoded location, but in physical size rather than in semantic meaning. */
  featureSizeMeters?: number;
  /** The PlaceID of the place this input geocodes to. For more information about Place IDs see [here](https://developers.google.com/maps/documentation/places/web-service/place-id). */
  placeId?: string;
  /** The type(s) of place that the input geocoded to. For example, `['locality', 'political']`. The full list of types can be found [here](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#Types). */
  placeTypes?: Array<string>;
}

export const GoogleMapsAddressvalidationV1Geocode: Schema.Schema<GoogleMapsAddressvalidationV1Geocode> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(GoogleTypeLatLng),
  plusCode: Schema.optional(GoogleMapsAddressvalidationV1PlusCode),
  bounds: Schema.optional(GoogleGeoTypeViewport),
  featureSizeMeters: Schema.optional(Schema.Number),
  placeId: Schema.optional(Schema.String),
  placeTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1Geocode" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1Geocode>;

export interface GoogleMapsAddressvalidationV1AddressMetadata {
  /** Indicates that this is the address of a business. If unset, indicates that the value is unknown. */
  business?: boolean;
  /** Indicates that the address of a PO box. If unset, indicates that the value is unknown. */
  poBox?: boolean;
  /** Indicates that this is the address of a residence. If unset, indicates that the value is unknown. */
  residential?: boolean;
}

export const GoogleMapsAddressvalidationV1AddressMetadata: Schema.Schema<GoogleMapsAddressvalidationV1AddressMetadata> = Schema.suspend(() => Schema.Struct({
  business: Schema.optional(Schema.Boolean),
  poBox: Schema.optional(Schema.Boolean),
  residential: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1AddressMetadata" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1AddressMetadata>;

export interface GoogleMapsAddressvalidationV1UspsAddress {
  /** First address line. */
  firstAddressLine?: string;
  /** Firm name. */
  firm?: string;
  /** Second address line. */
  secondAddressLine?: string;
  /** Puerto Rican urbanization name. */
  urbanization?: string;
  /** City + state + postal code. */
  cityStateZipAddressLine?: string;
  /** City name. */
  city?: string;
  /** 2 letter state code. */
  state?: string;
  /** Postal code e.g. 10009. */
  zipCode?: string;
  /** 4-digit postal code extension e.g. 5023. */
  zipCodeExtension?: string;
}

export const GoogleMapsAddressvalidationV1UspsAddress: Schema.Schema<GoogleMapsAddressvalidationV1UspsAddress> = Schema.suspend(() => Schema.Struct({
  firstAddressLine: Schema.optional(Schema.String),
  firm: Schema.optional(Schema.String),
  secondAddressLine: Schema.optional(Schema.String),
  urbanization: Schema.optional(Schema.String),
  cityStateZipAddressLine: Schema.optional(Schema.String),
  city: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  zipCode: Schema.optional(Schema.String),
  zipCodeExtension: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1UspsAddress" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1UspsAddress>;

export interface GoogleMapsAddressvalidationV1UspsData {
  /** USPS standardized address. */
  standardizedAddress?: GoogleMapsAddressvalidationV1UspsAddress;
  /** 2 digit delivery point code */
  deliveryPointCode?: string;
  /** The delivery point check digit. This number is added to the end of the delivery_point_barcode for mechanically scanned mail. Adding all the digits of the delivery_point_barcode, delivery_point_check_digit, postal code, and ZIP+4 together should yield a number divisible by 10. */
  deliveryPointCheckDigit?: string;
  /** The possible values for DPV confirmation. Returns a single character or returns no value. * `N`: Primary and any secondary number information failed to DPV confirm. * `D`: Address was DPV confirmed for the primary number only, and the secondary number information was missing. * `S`: Address was DPV confirmed for the primary number only, and the secondary number information was present but not confirmed. * `Y`: Address was DPV confirmed for primary and any secondary numbers. * Empty: If the response does not contain a `dpv_confirmation` value, the address was not submitted for DPV confirmation. */
  dpvConfirmation?: string;
  /** The footnotes from delivery point validation. Multiple footnotes may be strung together in the same string. * `AA`: Input address matched to the ZIP+4 file * `A1`: Input address was not matched to the ZIP+4 file * `BB`: Matched to DPV (all components) * `CC`: Secondary number not matched and not required * `C1`: Secondary number not matched but required * `N1`: High-rise address missing secondary number * `M1`: Primary number missing * `M3`: Primary number invalid * `P1`: Input address PO, RR or HC box number missing * `P3`: Input address PO, RR, or HC Box number invalid * `F1`: Input address matched to a military address * `G1`: Input address matched to a general delivery address * `U1`: Input address matched to a unique ZIP code * `PB`: Input address matched to PBSA record * `RR`: DPV confirmed address with PMB information * `R1`: DPV confirmed address without PMB information * `R7`: Carrier Route R777 or R779 record * `IA`: Informed Address identified * `TA`: Primary number matched by dropping a trailing alpha */
  dpvFootnote?: string;
  /** Indicates if the address is a CMRA (Commercial Mail Receiving Agency)--a private business receiving mail for clients. Returns a single character. * `Y`: The address is a CMRA * `N`: The address is not a CMRA */
  dpvCmra?: string;
  /** Is this place vacant? Returns a single character. * `Y`: The address is vacant * `N`: The address is not vacant */
  dpvVacant?: string;
  /** Is this a no stat address or an active address? No stat addresses are ones which are not continuously occupied or addresses that the USPS does not service. Returns a single character. * `Y`: The address is not active * `N`: The address is active */
  dpvNoStat?: string;
  /** Indicates the NoStat type. Returns a reason code as int. * `1`: IDA (Internal Drop Address) – Addresses that do not receive mail directly from the USPS but are delivered to a drop address that services them. * `2`: CDS - Addresses that have not yet become deliverable. For example, a new subdivision where lots and primary numbers have been determined, but no structure exists yet for occupancy. * `3`: Collision - Addresses that do not actually DPV confirm. * `4`: CMZ (College, Military and Other Types) - ZIP + 4 records USPS has incorporated into the data. * `5`: Regular - Indicates addresses not receiving delivery and the addresses are not counted as possible deliveries. * `6`: Secondary Required - The address requires secondary information. */
  dpvNoStatReasonCode?: number;
  /** Flag indicates mail is delivered to a single receptable at a site. Returns a single character. * `Y`: The mail is delivered to a single receptable at a site. * `N`: The mail is not delivered to a single receptable at a site. */
  dpvDrop?: string;
  /** Indicates that mail is not delivered to the street address. Returns a single character. * `Y`: The mail is not delivered to the street address. * `N`: The mail is delivered to the street address. */
  dpvThrowback?: string;
  /** Flag indicates mail delivery is not performed every day of the week. Returns a single character. * `Y`: The mail delivery is not performed every day of the week. * `N`: No indication the mail delivery is not performed every day of the week. */
  dpvNonDeliveryDays?: string;
  /** Integer identifying non-delivery days. It can be interrogated using bit flags: 0x40 – Sunday is a non-delivery day 0x20 – Monday is a non-delivery day 0x10 – Tuesday is a non-delivery day 0x08 – Wednesday is a non-delivery day 0x04 – Thursday is a non-delivery day 0x02 – Friday is a non-delivery day 0x01 – Saturday is a non-delivery day */
  dpvNonDeliveryDaysValues?: number;
  /** Flag indicates door is accessible, but package will not be left due to security concerns. Returns a single character. * `Y`: The package will not be left due to security concerns. * `N`: No indication the package will not be left due to security concerns. */
  dpvNoSecureLocation?: string;
  /** Indicates the address was matched to PBSA record. Returns a single character. * `Y`: The address was matched to PBSA record. * `N`: The address was not matched to PBSA record. */
  dpvPbsa?: string;
  /** Flag indicates addresses where USPS cannot knock on a door to deliver mail. Returns a single character. * `Y`: The door is not accessible. * `N`: No indication the door is not accessible. */
  dpvDoorNotAccessible?: string;
  /** Indicates that more than one DPV return code is valid for the address. Returns a single character. * `Y`: Address was DPV confirmed for primary and any secondary numbers. * `N`: Primary and any secondary number information failed to DPV confirm. * `S`: Address was DPV confirmed for the primary number only, and the secondary number information was present but not confirmed, or a single trailing alpha on a primary number was dropped to make a DPV match and secondary information required. * `D`: Address was DPV confirmed for the primary number only, and the secondary number information was missing. * `R`: Address confirmed but assigned to phantom route R777 and R779 and USPS delivery is not provided. */
  dpvEnhancedDeliveryCode?: string;
  /** The carrier route code. A four character code consisting of a one letter prefix and a three digit route designator. Prefixes: * `C`: Carrier route (or city route) * `R`: Rural route * `H`: Highway Contract Route * `B`: Post Office Box Section * `G`: General delivery unit */
  carrierRoute?: string;
  /** Carrier route rate sort indicator. */
  carrierRouteIndicator?: string;
  /** The delivery address is matchable, but the EWS file indicates that an exact match will be available soon. */
  ewsNoMatch?: boolean;
  /** Main post office city. */
  postOfficeCity?: string;
  /** Main post office state. */
  postOfficeState?: string;
  /** Abbreviated city. */
  abbreviatedCity?: string;
  /** FIPS county code. */
  fipsCountyCode?: string;
  /** County name. */
  county?: string;
  /** Enhanced Line of Travel (eLOT) number. */
  elotNumber?: string;
  /** eLOT Ascending/Descending Flag (A/D). */
  elotFlag?: string;
  /** LACSLink return code. */
  lacsLinkReturnCode?: string;
  /** LACSLink indicator. */
  lacsLinkIndicator?: string;
  /** PO Box only postal code. */
  poBoxOnlyPostalCode?: boolean;
  /** Footnotes from matching a street or highrise record to suite information. If business name match is found, the secondary number is returned. * `A`: SuiteLink record match, business address improved. * `00`: No match, business address is not improved. */
  suitelinkFootnote?: string;
  /** PMB (Private Mail Box) unit designator. */
  pmbDesignator?: string;
  /** PMB (Private Mail Box) number; */
  pmbNumber?: string;
  /** Type of the address record that matches the input address. * `F`: FIRM. This is a match to a Firm Record, which is the finest level of match available for an address. * `G`: GENERAL DELIVERY. This is a match to a General Delivery record. * `H`: BUILDING / APARTMENT. This is a match to a Building or Apartment record. * `P`: POST OFFICE BOX. This is a match to a Post Office Box. * `R`: RURAL ROUTE or HIGHWAY CONTRACT: This is a match to either a Rural Route or a Highway Contract record, both of which may have associated Box Number ranges. * `S`: STREET RECORD: This is a match to a Street record containing a valid primary number range. */
  addressRecordType?: string;
  /** Indicator that a default address was found, but more specific addresses exists. */
  defaultAddress?: boolean;
  /** Error message for USPS data retrieval. This is populated when USPS processing is suspended because of the detection of artificially created addresses. The USPS data fields might not be populated when this error is present. */
  errorMessage?: string;
  /** Indicator that the request has been CASS processed. */
  cassProcessed?: boolean;
}

export const GoogleMapsAddressvalidationV1UspsData: Schema.Schema<GoogleMapsAddressvalidationV1UspsData> = Schema.suspend(() => Schema.Struct({
  standardizedAddress: Schema.optional(GoogleMapsAddressvalidationV1UspsAddress),
  deliveryPointCode: Schema.optional(Schema.String),
  deliveryPointCheckDigit: Schema.optional(Schema.String),
  dpvConfirmation: Schema.optional(Schema.String),
  dpvFootnote: Schema.optional(Schema.String),
  dpvCmra: Schema.optional(Schema.String),
  dpvVacant: Schema.optional(Schema.String),
  dpvNoStat: Schema.optional(Schema.String),
  dpvNoStatReasonCode: Schema.optional(Schema.Number),
  dpvDrop: Schema.optional(Schema.String),
  dpvThrowback: Schema.optional(Schema.String),
  dpvNonDeliveryDays: Schema.optional(Schema.String),
  dpvNonDeliveryDaysValues: Schema.optional(Schema.Number),
  dpvNoSecureLocation: Schema.optional(Schema.String),
  dpvPbsa: Schema.optional(Schema.String),
  dpvDoorNotAccessible: Schema.optional(Schema.String),
  dpvEnhancedDeliveryCode: Schema.optional(Schema.String),
  carrierRoute: Schema.optional(Schema.String),
  carrierRouteIndicator: Schema.optional(Schema.String),
  ewsNoMatch: Schema.optional(Schema.Boolean),
  postOfficeCity: Schema.optional(Schema.String),
  postOfficeState: Schema.optional(Schema.String),
  abbreviatedCity: Schema.optional(Schema.String),
  fipsCountyCode: Schema.optional(Schema.String),
  county: Schema.optional(Schema.String),
  elotNumber: Schema.optional(Schema.String),
  elotFlag: Schema.optional(Schema.String),
  lacsLinkReturnCode: Schema.optional(Schema.String),
  lacsLinkIndicator: Schema.optional(Schema.String),
  poBoxOnlyPostalCode: Schema.optional(Schema.Boolean),
  suitelinkFootnote: Schema.optional(Schema.String),
  pmbDesignator: Schema.optional(Schema.String),
  pmbNumber: Schema.optional(Schema.String),
  addressRecordType: Schema.optional(Schema.String),
  defaultAddress: Schema.optional(Schema.Boolean),
  errorMessage: Schema.optional(Schema.String),
  cassProcessed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1UspsData" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1UspsData>;

export interface GoogleMapsAddressvalidationV1ValidationResult {
  /** Overall verdict flags */
  verdict?: GoogleMapsAddressvalidationV1Verdict;
  /** Information about the address itself as opposed to the geocode. */
  address?: GoogleMapsAddressvalidationV1Address;
  /** Information about the location and place that the address geocoded to. */
  geocode?: GoogleMapsAddressvalidationV1Geocode;
  /** Other information relevant to deliverability. `metadata` is not guaranteed to be fully populated for every address sent to the Address Validation API. */
  metadata?: GoogleMapsAddressvalidationV1AddressMetadata;
  /** Extra deliverability flags provided by USPS. Only provided in region `US` and `PR`. */
  uspsData?: GoogleMapsAddressvalidationV1UspsData;
  /** Preview: This feature is in Preview (pre-GA). Pre-GA products and features might have limited support, and changes to pre-GA products and features might not be compatible with other pre-GA versions. Pre-GA Offerings are covered by the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). For more information, see the [launch stage descriptions](https://developers.google.com/maps/launch-stages). The address translated to English. Translated addresses are not reusable as API input. The service provides them so that the user can use their native language to confirm or deny the validation of the originally-provided address. If part of the address doesn't have an English translation, the service returns that part in an alternate language that uses a Latin script. See [here](https://developers.google.com/maps/documentation/address-validation/convert-addresses-english) for an explanation of how the alternate language is selected. If part of the address doesn't have any translations or transliterations in a language that uses a Latin script, the service returns that part in the local language associated with the address. Enable this output by using the [google.maps.addressvalidation.v1.LanguageOptions.return_english_latin_address] flag. Note: the [google.maps.addressvalidation.v1.Address.unconfirmed_component_types] field in the `english_latin_address` and the [google.maps.addressvalidation.v1.AddressComponent.confirmation_level] fields in `english_latin_address.address_components` are not populated. */
  englishLatinAddress?: GoogleMapsAddressvalidationV1Address;
}

export const GoogleMapsAddressvalidationV1ValidationResult: Schema.Schema<GoogleMapsAddressvalidationV1ValidationResult> = Schema.suspend(() => Schema.Struct({
  verdict: Schema.optional(GoogleMapsAddressvalidationV1Verdict),
  address: Schema.optional(GoogleMapsAddressvalidationV1Address),
  geocode: Schema.optional(GoogleMapsAddressvalidationV1Geocode),
  metadata: Schema.optional(GoogleMapsAddressvalidationV1AddressMetadata),
  uspsData: Schema.optional(GoogleMapsAddressvalidationV1UspsData),
  englishLatinAddress: Schema.optional(GoogleMapsAddressvalidationV1Address),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1ValidationResult" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1ValidationResult>;

export interface GoogleMapsAddressvalidationV1ValidateAddressResponse {
  /** The result of the address validation. */
  result?: GoogleMapsAddressvalidationV1ValidationResult;
  /** The UUID that identifies this response. If the address needs to be re-validated, this UUID *must* accompany the new request. */
  responseId?: string;
}

export const GoogleMapsAddressvalidationV1ValidateAddressResponse: Schema.Schema<GoogleMapsAddressvalidationV1ValidateAddressResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(GoogleMapsAddressvalidationV1ValidationResult),
  responseId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1ValidateAddressResponse" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1ValidateAddressResponse>;

export interface GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest {
  /** Required. The outcome of the sequence of validation attempts. If this field is set to `VALIDATION_CONCLUSION_UNSPECIFIED`, an `INVALID_ARGUMENT` error will be returned. */
  conclusion?: "VALIDATION_CONCLUSION_UNSPECIFIED" | "VALIDATED_VERSION_USED" | "USER_VERSION_USED" | "UNVALIDATED_VERSION_USED" | "UNUSED" | (string & {});
  /** Required. The ID of the response that this feedback is for. This should be the response_id from the first response in a series of address validation attempts. */
  responseId?: string;
}

export const GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest: Schema.Schema<GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest> = Schema.suspend(() => Schema.Struct({
  conclusion: Schema.optional(Schema.String),
  responseId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest>;

export interface GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse {
}

export const GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse: Schema.Schema<GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse" }) as any as Schema.Schema<GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Validates an address. */
export interface ValidateAddressV1Request {
  /** Request body */
  body?: GoogleMapsAddressvalidationV1ValidateAddressRequest;
}

export const ValidateAddressV1Request = Schema.Struct({
  body: Schema.optional(GoogleMapsAddressvalidationV1ValidateAddressRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1:validateAddress", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateAddressV1Request>;

export type ValidateAddressV1Response = GoogleMapsAddressvalidationV1ValidateAddressResponse;
export const ValidateAddressV1Response = GoogleMapsAddressvalidationV1ValidateAddressResponse;

export type ValidateAddressV1Error = CommonErrors;

export const validateAddressV1: API.OperationMethod<ValidateAddressV1Request, ValidateAddressV1Response, ValidateAddressV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateAddressV1Request,
  output: ValidateAddressV1Response,
  errors: [],
}));

/** Feedback about the outcome of the sequence of validation attempts. This should be the last call made after a sequence of validation calls for the same address, and should be called once the transaction is concluded. This should only be sent once for the sequence of `ValidateAddress` requests needed to validate an address fully. */
export interface ProvideValidationFeedbackV1Request {
  /** Request body */
  body?: GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest;
}

export const ProvideValidationFeedbackV1Request = Schema.Struct({
  body: Schema.optional(GoogleMapsAddressvalidationV1ProvideValidationFeedbackRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1:provideValidationFeedback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvideValidationFeedbackV1Request>;

export type ProvideValidationFeedbackV1Response = GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse;
export const ProvideValidationFeedbackV1Response = GoogleMapsAddressvalidationV1ProvideValidationFeedbackResponse;

export type ProvideValidationFeedbackV1Error = CommonErrors;

export const provideValidationFeedbackV1: API.OperationMethod<ProvideValidationFeedbackV1Request, ProvideValidationFeedbackV1Response, ProvideValidationFeedbackV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvideValidationFeedbackV1Request,
  output: ProvideValidationFeedbackV1Response,
  errors: [],
}));

