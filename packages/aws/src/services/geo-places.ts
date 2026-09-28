import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Geo Places",
  target: "PlacesService",
  version: "2020-11-19",
  sigv4: "geo-places",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://geo-places-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://geo-places-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo-places.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://geo-places.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    {
      status: 400,
      renames: { Message: "message", Reason: "reason", FieldList: "fieldList" },
    },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly FieldList: ValidationExceptionField[];
  }> {}
export type SensitiveString = string | redacted.Redacted<string>;
export type Position = number[];
export type BoundingBox = number[];
export type DistanceMeters = number;
export interface FilterCircle {
  Center: number[];
  Radius: number;
}
export type CountryCode = string | redacted.Redacted<string>;
export type CountryCodeList = (string | redacted.Redacted<string>)[];
export type AutocompleteFilterPlaceType =
  | "Locality"
  | "PostalCode"
  | "Street"
  | "Intersection"
  | "PointAddress"
  | "InterpolatedAddress"
  | "Country"
  | "Region"
  | (string & {});
export type AutocompleteFilterPlaceTypeList = AutocompleteFilterPlaceType[];
export interface AutocompleteFilter {
  BoundingBox?: number[];
  Circle?: FilterCircle;
  IncludeCountries?: (string | redacted.Redacted<string>)[];
  IncludePlaceTypes?: AutocompleteFilterPlaceType[];
}
export type PostalCodeMode =
  | "MergeAllSpannedLocalities"
  | "EnumerateSpannedLocalities"
  | "EnumerateSpannedDistricts"
  | (string & {});
export type AutocompleteAdditionalFeature = "Core" | (string & {});
export type AutocompleteAdditionalFeatureList = AutocompleteAdditionalFeature[];
export type LanguageTag = string;
export type AutocompleteIntendedUse = "SingleUse" | (string & {});
export type ApiKey = string | redacted.Redacted<string>;
export interface AutocompleteRequest {
  QueryText: string | redacted.Redacted<string>;
  MaxResults?: number;
  BiasPosition?: number[];
  Filter?: AutocompleteFilter;
  PostalCodeMode?: PostalCodeMode;
  AdditionalFeatures?: AutocompleteAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: AutocompleteIntendedUse;
  Key?: string | redacted.Redacted<string>;
}
export type PlaceType =
  | "Country"
  | "Region"
  | "SubRegion"
  | "Locality"
  | "District"
  | "SubDistrict"
  | "PostalCode"
  | "Block"
  | "SubBlock"
  | "Intersection"
  | "Street"
  | "PointOfInterest"
  | "PointAddress"
  | "InterpolatedAddress"
  | "SecondaryAddress"
  | "InferredSecondaryAddress"
  | (string & {});
export type CountryCode2 = string | redacted.Redacted<string>;
export type CountryCode3 = string | redacted.Redacted<string>;
export interface Country {
  Code2?: string | redacted.Redacted<string>;
  Code3?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export interface Region {
  Code?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export interface SubRegion {
  Code?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export type IntersectionStreet = string;
export type IntersectionStreetList = string[];
export type TypePlacement = "BeforeBaseName" | "AfterBaseName" | (string & {});
export type TypeSeparator = string;
export interface StreetComponents {
  BaseName?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  TypePlacement?: TypePlacement;
  TypeSeparator?: string;
  Prefix?: string | redacted.Redacted<string>;
  Suffix?: string | redacted.Redacted<string>;
  Direction?: string | redacted.Redacted<string>;
  Language?: string;
}
export type StreetComponentsList = StreetComponents[];
export interface SecondaryAddressComponent {
  Number: string | redacted.Redacted<string>;
  Designator?: string | redacted.Redacted<string>;
}
export type SecondaryAddressComponentList = SecondaryAddressComponent[];
export interface Address {
  Label?: string | redacted.Redacted<string>;
  Country?: Country;
  Region?: Region;
  SubRegion?: SubRegion;
  Locality?: string | redacted.Redacted<string>;
  District?: string | redacted.Redacted<string>;
  SubDistrict?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  Block?: string | redacted.Redacted<string>;
  SubBlock?: string | redacted.Redacted<string>;
  Intersection?: string[];
  Street?: string | redacted.Redacted<string>;
  StreetComponents?: StreetComponents[];
  AddressNumber?: string | redacted.Redacted<string>;
  Building?: string | redacted.Redacted<string>;
  SecondaryAddressComponents?: SecondaryAddressComponent[];
}
export interface Highlight {
  StartIndex?: number;
  EndIndex?: number;
  Value?: string | redacted.Redacted<string>;
}
export type HighlightList = Highlight[];
export interface CountryHighlights {
  Code?: Highlight[];
  Name?: Highlight[];
}
export interface RegionHighlights {
  Code?: Highlight[];
  Name?: Highlight[];
}
export interface SubRegionHighlights {
  Code?: Highlight[];
  Name?: Highlight[];
}
export type IntersectionHighlightsList = Highlight[][];
export interface AutocompleteAddressHighlights {
  Label?: Highlight[];
  Country?: CountryHighlights;
  Region?: RegionHighlights;
  SubRegion?: SubRegionHighlights;
  Locality?: Highlight[];
  District?: Highlight[];
  SubDistrict?: Highlight[];
  Street?: Highlight[];
  Block?: Highlight[];
  SubBlock?: Highlight[];
  Intersection?: Highlight[][];
  PostalCode?: Highlight[];
  AddressNumber?: Highlight[];
  Building?: Highlight[];
}
export interface AutocompleteHighlights {
  Title?: Highlight[];
  Address?: AutocompleteAddressHighlights;
}
export type SensitiveBoolean = boolean;
export interface AutocompleteResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  Distance?: number;
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  Highlights?: AutocompleteHighlights;
  EstimatedPointAddress?: boolean;
}
export type AutocompleteResultItemList = AutocompleteResultItem[];
export interface AutocompleteResponse {
  PricingBucket: string;
  ResultItems?: AutocompleteResultItem[];
}
export interface GeocodeQueryComponents {
  Country?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  SubRegion?: string | redacted.Redacted<string>;
  Locality?: string | redacted.Redacted<string>;
  District?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  AddressNumber?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
}
export type GeocodeFilterPlaceType =
  | "Locality"
  | "PostalCode"
  | "Intersection"
  | "Street"
  | "PointAddress"
  | "InterpolatedAddress"
  | "SecondaryAddress"
  | "PointOfInterest"
  | "Country"
  | "Region"
  | (string & {});
export type GeocodeFilterPlaceTypeList = GeocodeFilterPlaceType[];
export interface GeocodeFilter {
  IncludeCountries?: (string | redacted.Redacted<string>)[];
  IncludePlaceTypes?: GeocodeFilterPlaceType[];
}
export type GeocodeAdditionalFeature =
  | "TimeZone"
  | "Access"
  | "SecondaryAddresses"
  | "Intersections"
  | (string & {});
export type GeocodeAdditionalFeatureList = GeocodeAdditionalFeature[];
export type GeocodeIntendedUse = "SingleUse" | "Storage" | (string & {});
export type AddressTranslationComponent =
  | "District"
  | "Locality"
  | "Region"
  | "SubRegion"
  | (string & {});
export type AddressTranslationComponentList = AddressTranslationComponent[];
export type GeocodeAddressNamesMode =
  | "Matched"
  | "Administrative"
  | (string & {});
export interface GeocodeRequest {
  QueryText?: string | redacted.Redacted<string>;
  QueryComponents?: GeocodeQueryComponents;
  MaxResults?: number;
  BiasPosition?: number[];
  Filter?: GeocodeFilter;
  AdditionalFeatures?: GeocodeAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: GeocodeIntendedUse;
  Key?: string | redacted.Redacted<string>;
  PostalCodeMode?: PostalCodeMode;
  AddressTranslations?: AddressTranslationComponent[];
  AddressNamesMode?: GeocodeAddressNamesMode;
}
export type PostalAuthority = "Usps" | (string & {});
export type PostalCodeType = "UspsZip" | "UspsZipPlus4" | (string & {});
export type ZipClassificationCode =
  | "Military"
  | "PostOfficeBoxes"
  | "Unique"
  | (string & {});
export interface UspsZip {
  ZipClassificationCode?: ZipClassificationCode;
}
export type RecordTypeCode =
  | "Firm"
  | "General"
  | "HighRise"
  | "PostOfficeBox"
  | "Rural"
  | "Street"
  | (string & {});
export interface UspsZipPlus4 {
  RecordTypeCode?: RecordTypeCode;
}
export interface PostalCodeDetails {
  PostalCode?: string | redacted.Redacted<string>;
  PostalAuthority?: PostalAuthority;
  PostalCodeType?: PostalCodeType;
  UspsZip?: UspsZip;
  UspsZipPlus4?: UspsZipPlus4;
}
export type PostalCodeDetailsList = PostalCodeDetails[];
export interface Category {
  Id: string | redacted.Redacted<string>;
  Name: string | redacted.Redacted<string>;
  LocalizedName?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type CategoryList = Category[];
export interface FoodType {
  LocalizedName: string | redacted.Redacted<string>;
  Id?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export type FoodTypeList = FoodType[];
export type AccessPointType =
  | "Delivery"
  | "Emergency"
  | "Entrance"
  | "Loading"
  | "Other"
  | "Parking"
  | "Taxi"
  | (string & {});
export interface AccessPoint {
  Position?: number[];
  Type?: AccessPointType;
  Primary?: boolean;
  Label?: string | redacted.Redacted<string>;
}
export type AccessPointList = AccessPoint[];
export type DurationSeconds = number;
export interface TimeZone {
  Name: string | redacted.Redacted<string>;
  Offset?: string | redacted.Redacted<string>;
  OffsetSeconds?: number;
}
export type MatchScore = number;
export type MatchScoreList = number[];
export interface SecondaryAddressComponentMatchScore {
  Number?: number;
}
export type SecondaryAddressComponentMatchScoreList =
  SecondaryAddressComponentMatchScore[];
export interface AddressComponentMatchScores {
  Country?: number;
  Region?: number;
  SubRegion?: number;
  Locality?: number;
  District?: number;
  SubDistrict?: number;
  PostalCode?: number;
  Block?: number;
  SubBlock?: number;
  Intersection?: number[];
  AddressNumber?: number;
  Building?: number;
  SecondaryAddressComponents?: SecondaryAddressComponentMatchScore[];
}
export interface ComponentMatchScores {
  Title?: number;
  Address?: AddressComponentMatchScores;
}
export interface MatchScoreDetails {
  Overall?: number;
  Components?: ComponentMatchScores;
}
export interface ParsedQueryComponent {
  StartIndex?: number;
  EndIndex?: number;
  Value?: string | redacted.Redacted<string>;
  QueryComponent?: string | redacted.Redacted<string>;
}
export type ParsedQueryComponentList = ParsedQueryComponent[];
export interface ParsedQuerySecondaryAddressComponent {
  StartIndex: number;
  EndIndex: number;
  Value: string | redacted.Redacted<string>;
  Number: string | redacted.Redacted<string>;
  Designator: string | redacted.Redacted<string>;
}
export type ParsedQuerySecondaryAddressComponentList =
  ParsedQuerySecondaryAddressComponent[];
export interface GeocodeParsedQueryAddressComponents {
  Country?: ParsedQueryComponent[];
  Region?: ParsedQueryComponent[];
  SubRegion?: ParsedQueryComponent[];
  Locality?: ParsedQueryComponent[];
  District?: ParsedQueryComponent[];
  SubDistrict?: ParsedQueryComponent[];
  PostalCode?: ParsedQueryComponent[];
  Block?: ParsedQueryComponent[];
  SubBlock?: ParsedQueryComponent[];
  Street?: ParsedQueryComponent[];
  AddressNumber?: ParsedQueryComponent[];
  Building?: ParsedQueryComponent[];
  SecondaryAddressComponents?: ParsedQuerySecondaryAddressComponent[];
  OtherComponents?: ParsedQueryComponent[];
}
export interface GeocodeParsedQuery {
  Title?: ParsedQueryComponent[];
  Address?: GeocodeParsedQueryAddressComponents;
}
export interface Intersection {
  PlaceId: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  Position?: number[];
  Distance?: number;
  RouteDistance?: number;
  MapView?: number[];
  AccessPoints?: AccessPoint[];
}
export type IntersectionList = Intersection[];
export interface RelatedPlace {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  Position?: number[];
  AccessPoints?: AccessPoint[];
}
export type RelatedPlaceList = RelatedPlace[];
export type TranslationNameType =
  | "Abbreviation"
  | "AreaCode"
  | "BaseName"
  | "Exonym"
  | "Shortened"
  | "Synonym"
  | (string & {});
export interface TranslationName {
  Value: string | redacted.Redacted<string>;
  Language?: string;
  Type: TranslationNameType;
  Primary?: boolean;
  Transliterated?: boolean;
}
export type TranslationNameList = TranslationName[];
export type AdminNamesPreference = "Alternative" | "Primary" | (string & {});
export interface AdminNames {
  Names: TranslationName[];
  Preference?: AdminNamesPreference;
}
export type AdminNamesList = AdminNames[];
export interface TranslationDetails {
  Locality?: AdminNames[];
  Region?: AdminNames[];
  District?: AdminNames[];
  SubRegion?: AdminNames[];
}
export interface GeocodeResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetails[];
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  AccessPoints?: AccessPoint[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  MatchScores?: MatchScoreDetails;
  ParsedQuery?: GeocodeParsedQuery;
  Intersections?: Intersection[];
  MainAddress?: RelatedPlace;
  SecondaryAddresses?: RelatedPlace[];
  Translations?: TranslationDetails;
  EstimatedPointAddress?: boolean;
}
export type GeocodeResultItemList = GeocodeResultItem[];
export interface GeocodeResponse {
  PricingBucket: string;
  ResultItems?: GeocodeResultItem[];
}
export type GetPlaceAdditionalFeature =
  | "TimeZone"
  | "Phonemes"
  | "Access"
  | "Contact"
  | "SecondaryAddresses"
  | "CrossReferences"
  | (string & {});
export type GetPlaceAdditionalFeatureList = GetPlaceAdditionalFeature[];
export type GetPlaceIntendedUse = "SingleUse" | "Storage" | (string & {});
export type GetPlaceAddressNamesMode = "Administrative" | (string & {});
export interface GetPlaceRequest {
  PlaceId: string | redacted.Redacted<string>;
  AdditionalFeatures?: GetPlaceAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: GetPlaceIntendedUse;
  Key?: string | redacted.Redacted<string>;
  AddressNamesMode?: GetPlaceAddressNamesMode;
}
export interface BusinessChain {
  Name?: string | redacted.Redacted<string>;
  Id?: string | redacted.Redacted<string>;
}
export type BusinessChainList = BusinessChain[];
export interface ContactDetails {
  Label?: string | redacted.Redacted<string>;
  Value?: string | redacted.Redacted<string>;
  Categories?: Category[];
}
export type ContactDetailsList = ContactDetails[];
export interface Contacts {
  Phones?: ContactDetails[];
  Faxes?: ContactDetails[];
  Websites?: ContactDetails[];
  Emails?: ContactDetails[];
}
export type OpeningHoursDisplay = string | redacted.Redacted<string>;
export type OpeningHoursDisplayList = (string | redacted.Redacted<string>)[];
export interface OpeningHoursComponents {
  OpenTime?: string | redacted.Redacted<string>;
  OpenDuration?: string | redacted.Redacted<string>;
  Recurrence?: string | redacted.Redacted<string>;
}
export type OpeningHoursComponentsList = OpeningHoursComponents[];
export interface OpeningHours {
  Display?: (string | redacted.Redacted<string>)[];
  OpenNow?: boolean;
  Components?: OpeningHoursComponents[];
  Categories?: Category[];
}
export type OpeningHoursList = OpeningHours[];
export interface AccessRestriction {
  Restricted?: boolean;
  Categories?: Category[];
}
export type AccessRestrictionList = AccessRestriction[];
export interface PhonemeTranscription {
  Value?: string | redacted.Redacted<string>;
  Language?: string;
  Preferred?: boolean;
}
export type PhonemeTranscriptionList = PhonemeTranscription[];
export interface AddressComponentPhonemes {
  Country?: PhonemeTranscription[];
  Region?: PhonemeTranscription[];
  SubRegion?: PhonemeTranscription[];
  Locality?: PhonemeTranscription[];
  District?: PhonemeTranscription[];
  SubDistrict?: PhonemeTranscription[];
  Block?: PhonemeTranscription[];
  SubBlock?: PhonemeTranscription[];
  Street?: PhonemeTranscription[];
}
export interface PhonemeDetails {
  Title?: PhonemeTranscription[];
  Address?: AddressComponentPhonemes;
}
export type PlaceAttribute = "DriveThrough" | (string & {});
export type PlaceAttributeList = PlaceAttribute[];
export interface CrossReference {
  Source: string | redacted.Redacted<string>;
  SourcePlaceId: string | redacted.Redacted<string>;
  SourceCategories?: Category[];
}
export type CrossReferenceList = CrossReference[];
export interface GetPlaceResponse {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  PricingBucket: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetails[];
  Position?: number[];
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  Contacts?: Contacts;
  OpeningHours?: OpeningHours[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
  MainAddress?: RelatedPlace;
  SecondaryAddresses?: RelatedPlace[];
  PlaceAttributes?: PlaceAttribute[];
  EstimatedPointAddress?: boolean;
  CrossReferences?: CrossReference[];
}
export type ReverseGeocodeFilterPlaceType =
  | "Locality"
  | "Intersection"
  | "Street"
  | "PointAddress"
  | "InterpolatedAddress"
  | "SecondaryAddress"
  | "PointOfInterest"
  | (string & {});
export type ReverseGeocodeFilterPlaceTypeList = ReverseGeocodeFilterPlaceType[];
export interface ReverseGeocodeFilter {
  IncludePlaceTypes?: ReverseGeocodeFilterPlaceType[];
}
export type ReverseGeocodeAdditionalFeature =
  | "TimeZone"
  | "Access"
  | "Intersections"
  | (string & {});
export type ReverseGeocodeAdditionalFeatureList =
  ReverseGeocodeAdditionalFeature[];
export type ReverseGeocodeIntendedUse = "SingleUse" | "Storage" | (string & {});
export type Heading = number;
export type ReverseGeocodeAddressNamesMode = "Administrative" | (string & {});
export interface ReverseGeocodeRequest {
  QueryPosition: number[];
  QueryRadius?: number;
  MaxResults?: number;
  Filter?: ReverseGeocodeFilter;
  AdditionalFeatures?: ReverseGeocodeAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: ReverseGeocodeIntendedUse;
  Key?: string | redacted.Redacted<string>;
  Heading?: number;
  AddressNamesMode?: ReverseGeocodeAddressNamesMode;
}
export interface ReverseGeocodeResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetails[];
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  AccessPoints?: AccessPoint[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Intersections?: Intersection[];
  MainAddress?: RelatedPlace;
  EstimatedPointAddress?: boolean;
}
export type ReverseGeocodeResultItemList = ReverseGeocodeResultItem[];
export interface ReverseGeocodeResponse {
  PricingBucket: string;
  ResultItems?: ReverseGeocodeResultItem[];
}
export type FilterCategoryList = (string | redacted.Redacted<string>)[];
export type FilterBusinessChainList = (string | redacted.Redacted<string>)[];
export type FilterFoodTypeList = (string | redacted.Redacted<string>)[];
export interface SearchNearbyFilter {
  BoundingBox?: number[];
  IncludeCountries?: (string | redacted.Redacted<string>)[];
  IncludeCategories?: (string | redacted.Redacted<string>)[];
  ExcludeCategories?: (string | redacted.Redacted<string>)[];
  IncludeBusinessChains?: (string | redacted.Redacted<string>)[];
  ExcludeBusinessChains?: (string | redacted.Redacted<string>)[];
  IncludeFoodTypes?: (string | redacted.Redacted<string>)[];
  ExcludeFoodTypes?: (string | redacted.Redacted<string>)[];
}
export type SearchNearbyAdditionalFeature =
  | "TimeZone"
  | "Phonemes"
  | "Access"
  | "Contact"
  | "CrossReferences"
  | (string & {});
export type SearchNearbyAdditionalFeatureList = SearchNearbyAdditionalFeature[];
export type SearchNearbyIntendedUse = "SingleUse" | "Storage" | (string & {});
export type Token = string;
export interface SearchNearbyRequest {
  QueryPosition: number[];
  QueryRadius?: number;
  MaxResults?: number;
  Filter?: SearchNearbyFilter;
  AdditionalFeatures?: SearchNearbyAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: SearchNearbyIntendedUse;
  NextToken?: string;
  Key?: string | redacted.Redacted<string>;
}
export interface SearchNearbyResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  Contacts?: Contacts;
  OpeningHours?: OpeningHours[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
  PlaceAttributes?: PlaceAttribute[];
  CrossReferences?: CrossReference[];
}
export type SearchNearbyResultItemList = SearchNearbyResultItem[];
export interface SearchNearbyResponse {
  PricingBucket: string;
  ResultItems?: SearchNearbyResultItem[];
  NextToken?: string;
}
export interface SearchTextFilter {
  BoundingBox?: number[];
  Circle?: FilterCircle;
  IncludeCountries?: (string | redacted.Redacted<string>)[];
}
export type SearchTextAdditionalFeature =
  | "TimeZone"
  | "Phonemes"
  | "Access"
  | "Contact"
  | "CrossReferences"
  | (string & {});
export type SearchTextAdditionalFeatureList = SearchTextAdditionalFeature[];
export type SearchTextIntendedUse = "SingleUse" | "Storage" | (string & {});
export type SearchTextTravelMode = "Car" | "Scooter" | "Truck" | (string & {});
export interface SearchTextRequest {
  QueryText?: string | redacted.Redacted<string>;
  QueryId?: string | redacted.Redacted<string>;
  MaxResults?: number;
  BiasPosition?: number[];
  Filter?: SearchTextFilter;
  AdditionalFeatures?: SearchTextAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: SearchTextIntendedUse;
  NextToken?: string;
  TravelMode?: SearchTextTravelMode;
  Key?: string | redacted.Redacted<string>;
}
export interface SearchTextResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: PlaceType;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  Contacts?: Contacts;
  OpeningHours?: OpeningHours[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
  PlaceAttributes?: PlaceAttribute[];
  CrossReferences?: CrossReference[];
}
export type SearchTextResultItemList = SearchTextResultItem[];
export interface SearchTextResponse {
  PricingBucket: string;
  ResultItems?: SearchTextResultItem[];
  NextToken?: string;
}
export interface SuggestFilter {
  BoundingBox?: number[];
  Circle?: FilterCircle;
  IncludeCountries?: (string | redacted.Redacted<string>)[];
}
export type SuggestAdditionalFeature =
  | "Core"
  | "TimeZone"
  | "Phonemes"
  | "Access"
  | "CrossReferences"
  | (string & {});
export type SuggestAdditionalFeatureList = SuggestAdditionalFeature[];
export type SuggestIntendedUse = "SingleUse" | (string & {});
export type SuggestTravelMode = "Car" | "Scooter" | "Truck" | (string & {});
export interface SuggestRequest {
  QueryText: string | redacted.Redacted<string>;
  MaxResults?: number;
  MaxQueryRefinements?: number;
  BiasPosition?: number[];
  Filter?: SuggestFilter;
  AdditionalFeatures?: SuggestAdditionalFeature[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: SuggestIntendedUse;
  TravelMode?: SuggestTravelMode;
  Key?: string | redacted.Redacted<string>;
}
export type SuggestResultItemType = "Place" | "Query" | (string & {});
export interface SuggestPlaceResult {
  PlaceId?: string | redacted.Redacted<string>;
  PlaceType?: PlaceType;
  Address?: Address;
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
  PlaceAttributes?: PlaceAttribute[];
  CrossReferences?: CrossReference[];
}
export type QueryType = "Category" | "BusinessChain" | (string & {});
export interface SuggestQueryResult {
  QueryId?: string | redacted.Redacted<string>;
  QueryType?: QueryType;
}
export interface SuggestAddressHighlights {
  Label?: Highlight[];
}
export interface SuggestHighlights {
  Title?: Highlight[];
  Address?: SuggestAddressHighlights;
}
export interface SuggestResultItem {
  Title: string | redacted.Redacted<string>;
  SuggestResultItemType: SuggestResultItemType;
  Place?: SuggestPlaceResult;
  Query?: SuggestQueryResult;
  Highlights?: SuggestHighlights;
}
export type SuggestResultItemList = SuggestResultItem[];
export interface QueryRefinement {
  RefinedTerm: string | redacted.Redacted<string>;
  OriginalTerm: string | redacted.Redacted<string>;
  StartIndex: number;
  EndIndex: number;
}
export type QueryRefinementList = QueryRefinement[];
export interface SuggestResponse {
  PricingBucket: string;
  ResultItems?: SuggestResultItem[];
  QueryRefinements?: QueryRefinement[];
}
export type ValidationExceptionReason =
  | "UnknownOperation"
  | "Missing"
  | "CannotParse"
  | "FieldValidationFailed"
  | "Other"
  | "UnknownField"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AutocompleteError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `Autocomplete` completes potential places and addresses as the user types, based on the partial input. The API enhances the efficiency and accuracy of address by completing query based on a few entered keystrokes. It helps you by completing partial queries with valid address completion. Also, the API supports the filtering of results based on geographic location, country, or specific place types, and can be tailored using optional parameters like language and political views. Not supported in `ap-southeast-1` and `ap-southeast-5` regions for GrabMaps customers.
 *
 * For more information, see Autocomplete in the *Amazon Location Service Developer Guide*.
 */
export const autocomplete: API.OperationMethod<
  AutocompleteRequest,
  AutocompleteResponse,
  AutocompleteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/autocomplete",
    input: {
      QueryText: 0,
      MaxResults: 0,
      BiasPosition: 0,
      Filter: {
        BoundingBox: 0,
        Circle: i_FilterCircle,
        IncludeCountries: 0,
        IncludePlaceTypes: 0,
      },
      PostalCodeMode: 0,
      AdditionalFeatures: 0,
      Language: 0,
      PoliticalView: 0,
      IntendedUse: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      ResultItems: D.list({
        PlaceId: D.secret,
        PlaceType: D.secret,
        Title: D.secret,
        Address: o_Address,
        PoliticalView: D.secret,
        Highlights: {
          Title: D.list(o_Highlight),
          Address: {
            Label: D.list(o_Highlight),
            Country: { Code: D.list(o_Highlight), Name: D.list(o_Highlight) },
            Region: { Code: D.list(o_Highlight), Name: D.list(o_Highlight) },
            SubRegion: { Code: D.list(o_Highlight), Name: D.list(o_Highlight) },
            Locality: D.list(o_Highlight),
            District: D.list(o_Highlight),
            SubDistrict: D.list(o_Highlight),
            Street: D.list(o_Highlight),
            Block: D.list(o_Highlight),
            SubBlock: D.list(o_Highlight),
            Intersection: D.list(D.list(o_Highlight)),
            PostalCode: D.list(o_Highlight),
            AddressNumber: D.list(o_Highlight),
            Building: D.list(o_Highlight),
          },
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Autocomplete",
})) as any;

export type GeocodeError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `Geocode` converts a textual address or place into geographic coordinates. You can obtain geographic coordinates, address component, and other related information. It supports flexible queries, including free-form text or structured queries with components like street names, postal codes, and regions. The Geocode API can also provide additional features such as time zone information and the inclusion of political views. Not supported in `ap-southeast-1` and `ap-southeast-5` regions for GrabMaps customers.
 *
 * For more information, see Geocode in the *Amazon Location Service Developer Guide*.
 */
export const geocode: API.OperationMethod<
  GeocodeRequest,
  GeocodeResponse,
  GeocodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/geocode",
    input: {
      QueryText: 0,
      QueryComponents: {
        Country: 0,
        Region: 0,
        SubRegion: 0,
        Locality: 0,
        District: 0,
        Street: 0,
        AddressNumber: 0,
        PostalCode: 0,
      },
      MaxResults: 0,
      BiasPosition: 0,
      Filter: { IncludeCountries: 0, IncludePlaceTypes: 0 },
      AdditionalFeatures: 0,
      Language: 0,
      PoliticalView: 0,
      IntendedUse: 0,
      Key: D.m({ query: "key" }),
      PostalCodeMode: 0,
      AddressTranslations: 0,
      AddressNamesMode: 0,
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      ResultItems: D.list({
        PlaceId: D.secret,
        PlaceType: D.secret,
        Title: D.secret,
        Address: o_Address,
        PostalCodeDetails: D.list(o_PostalCodeDetails),
        Categories: D.list(o_Category),
        FoodTypes: D.list(o_FoodType),
        AccessPoints: D.list(o_AccessPoint),
        TimeZone: o_TimeZone,
        PoliticalView: D.secret,
        ParsedQuery: {
          Title: D.list(o_ParsedQueryComponent),
          Address: {
            Country: D.list(o_ParsedQueryComponent),
            Region: D.list(o_ParsedQueryComponent),
            SubRegion: D.list(o_ParsedQueryComponent),
            Locality: D.list(o_ParsedQueryComponent),
            District: D.list(o_ParsedQueryComponent),
            SubDistrict: D.list(o_ParsedQueryComponent),
            PostalCode: D.list(o_ParsedQueryComponent),
            Block: D.list(o_ParsedQueryComponent),
            SubBlock: D.list(o_ParsedQueryComponent),
            Street: D.list(o_ParsedQueryComponent),
            AddressNumber: D.list(o_ParsedQueryComponent),
            Building: D.list(o_ParsedQueryComponent),
            SecondaryAddressComponents: D.list({
              Value: D.secret,
              Number: D.secret,
              Designator: D.secret,
            }),
            OtherComponents: D.list(o_ParsedQueryComponent),
          },
        },
        Intersections: D.list(o_Intersection),
        MainAddress: o_RelatedPlace,
        SecondaryAddresses: D.list(o_RelatedPlace),
        Translations: {
          Locality: D.list(o_AdminNames),
          Region: D.list(o_AdminNames),
          District: D.list(o_AdminNames),
          SubRegion: D.list(o_AdminNames),
        },
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Geocode",
})) as any;

export type GetPlaceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetPlace` finds a place by its unique ID. A `PlaceId` is returned by other place operations.
 *
 * For more information, see GetPlace in the *Amazon Location Service Developer Guide*.
 */
export const getPlace: API.OperationMethod<
  GetPlaceRequest,
  GetPlaceResponse,
  GetPlaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/place/{PlaceId}",
    input: {
      PlaceId: 0,
      AdditionalFeatures: D.m({ query: "additional-features" }),
      Language: D.m({ query: "language" }),
      PoliticalView: D.m({ query: "political-view" }),
      IntendedUse: D.m({ query: "intended-use" }),
      Key: D.m({ query: "key" }),
      AddressNamesMode: D.m({ query: "address-names-mode" }),
    },
    output: {
      PlaceId: D.secret,
      PlaceType: D.secret,
      Title: D.secret,
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      Address: o_Address,
      PostalCodeDetails: D.list(o_PostalCodeDetails),
      Categories: D.list(o_Category),
      FoodTypes: D.list(o_FoodType),
      BusinessChains: D.list(o_BusinessChain),
      Contacts: o_Contacts,
      OpeningHours: D.list(o_OpeningHours),
      AccessPoints: D.list(o_AccessPoint),
      AccessRestrictions: D.list(o_AccessRestriction),
      TimeZone: o_TimeZone,
      PoliticalView: D.secret,
      Phonemes: o_PhonemeDetails,
      MainAddress: o_RelatedPlace,
      SecondaryAddresses: D.list(o_RelatedPlace),
      PlaceAttributes: D.list(D.secret),
      CrossReferences: D.list(o_CrossReference),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlace",
})) as any;

export type ReverseGeocodeError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `ReverseGeocode` converts geographic coordinates into a human-readable address or place. You can obtain address component, and other related information such as place type, category, street information. The Reverse Geocode API supports filtering to on place type so that you can refine result based on your need. Also, The Reverse Geocode API can also provide additional features such as time zone information and the inclusion of political views.
 *
 * For more information, see Reverse Geocode in the *Amazon Location Service Developer Guide*.
 */
export const reverseGeocode: API.OperationMethod<
  ReverseGeocodeRequest,
  ReverseGeocodeResponse,
  ReverseGeocodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/reverse-geocode",
    input: {
      QueryPosition: 0,
      QueryRadius: 0,
      MaxResults: 0,
      Filter: { IncludePlaceTypes: 0 },
      AdditionalFeatures: 0,
      Language: 0,
      PoliticalView: 0,
      IntendedUse: 0,
      Key: D.m({ query: "key" }),
      Heading: 0,
      AddressNamesMode: 0,
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      ResultItems: D.list({
        PlaceId: D.secret,
        PlaceType: D.secret,
        Title: D.secret,
        Address: o_Address,
        PostalCodeDetails: D.list(o_PostalCodeDetails),
        Categories: D.list(o_Category),
        FoodTypes: D.list(o_FoodType),
        AccessPoints: D.list(o_AccessPoint),
        TimeZone: o_TimeZone,
        PoliticalView: D.secret,
        Intersections: D.list(o_Intersection),
        MainAddress: o_RelatedPlace,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReverseGeocode",
})) as any;

export type SearchNearbyError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `SearchNearby` queries for points of interest within a radius from a central coordinates, returning place results with optional filters such as categories, business chains, food types and more. The API returns details such as a place name, address, phone, category, food type, contact, opening hours. Also, the API can return phonemes, time zones and more based on requested parameters. Not supported in `ap-southeast-1` and `ap-southeast-5` regions for GrabMaps customers.
 *
 * For more information, see Search Nearby in the *Amazon Location Service Developer Guide*.
 */
export const searchNearby: API.OperationMethod<
  SearchNearbyRequest,
  SearchNearbyResponse,
  SearchNearbyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/search-nearby",
    input: {
      QueryPosition: 0,
      QueryRadius: 0,
      MaxResults: 0,
      Filter: {
        BoundingBox: 0,
        IncludeCountries: 0,
        IncludeCategories: 0,
        ExcludeCategories: 0,
        IncludeBusinessChains: 0,
        ExcludeBusinessChains: 0,
        IncludeFoodTypes: 0,
        ExcludeFoodTypes: 0,
      },
      AdditionalFeatures: 0,
      Language: 0,
      PoliticalView: 0,
      IntendedUse: 0,
      NextToken: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      ResultItems: D.list({
        PlaceId: D.secret,
        PlaceType: D.secret,
        Title: D.secret,
        Address: o_Address,
        Categories: D.list(o_Category),
        FoodTypes: D.list(o_FoodType),
        BusinessChains: D.list(o_BusinessChain),
        Contacts: o_Contacts,
        OpeningHours: D.list(o_OpeningHours),
        AccessPoints: D.list(o_AccessPoint),
        AccessRestrictions: D.list(o_AccessRestriction),
        TimeZone: o_TimeZone,
        PoliticalView: D.secret,
        Phonemes: o_PhonemeDetails,
        PlaceAttributes: D.list(D.secret),
        CrossReferences: D.list(o_CrossReference),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchNearby",
})) as any;

export type SearchTextError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `SearchText` searches for geocode and place information. You can then complete a follow-up query suggested from the `Suggest` API via a query id.
 *
 * For more information, see Search Text in the *Amazon Location Service Developer Guide*.
 */
export const searchText: API.OperationMethod<
  SearchTextRequest,
  SearchTextResponse,
  SearchTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/search-text",
    input: {
      QueryText: 0,
      QueryId: 0,
      MaxResults: 0,
      BiasPosition: 0,
      Filter: { BoundingBox: 0, Circle: i_FilterCircle, IncludeCountries: 0 },
      AdditionalFeatures: 0,
      Language: 0,
      PoliticalView: 0,
      IntendedUse: 0,
      NextToken: 0,
      TravelMode: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      ResultItems: D.list({
        PlaceId: D.secret,
        PlaceType: D.secret,
        Title: D.secret,
        Address: o_Address,
        Categories: D.list(o_Category),
        FoodTypes: D.list(o_FoodType),
        BusinessChains: D.list(o_BusinessChain),
        Contacts: o_Contacts,
        OpeningHours: D.list(o_OpeningHours),
        AccessPoints: D.list(o_AccessPoint),
        AccessRestrictions: D.list(o_AccessRestriction),
        TimeZone: o_TimeZone,
        PoliticalView: D.secret,
        Phonemes: o_PhonemeDetails,
        PlaceAttributes: D.list(D.secret),
        CrossReferences: D.list(o_CrossReference),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchText",
})) as any;

export type SuggestError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `Suggest` provides intelligent predictions or recommendations based on the user's input or context, such as relevant places, points of interest, query terms or search category. It is designed to help users find places or point of interests candidates or identify a follow on query based on incomplete or misspelled queries. It returns a list of possible matches or refinements that can be used to formulate a more accurate query. Users can select the most appropriate suggestion and use it for further searching. The API provides options for filtering results by location and other attributes, and allows for additional features like phonemes and timezones. The response includes refined query terms and detailed place information.
 *
 * For more information, see Suggest in the *Amazon Location Service Developer Guide*.
 */
export const suggest: API.OperationMethod<
  SuggestRequest,
  SuggestResponse,
  SuggestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/suggest",
    input: {
      QueryText: 0,
      MaxResults: 0,
      MaxQueryRefinements: 0,
      BiasPosition: 0,
      Filter: { BoundingBox: 0, Circle: i_FilterCircle, IncludeCountries: 0 },
      AdditionalFeatures: 0,
      Language: 0,
      PoliticalView: 0,
      IntendedUse: 0,
      TravelMode: 0,
      Key: D.m({ query: "key" }),
    },
    output: {
      PricingBucket: D.m({ header: "x-amz-geo-pricing-bucket" }),
      ResultItems: D.list({
        Title: D.secret,
        Place: {
          PlaceId: D.secret,
          PlaceType: D.secret,
          Address: o_Address,
          Categories: D.list(o_Category),
          FoodTypes: D.list(o_FoodType),
          BusinessChains: D.list(o_BusinessChain),
          AccessPoints: D.list(o_AccessPoint),
          AccessRestrictions: D.list(o_AccessRestriction),
          TimeZone: o_TimeZone,
          PoliticalView: D.secret,
          Phonemes: o_PhonemeDetails,
          PlaceAttributes: D.list(D.secret),
          CrossReferences: D.list(o_CrossReference),
        },
        Query: { QueryId: D.secret },
        Highlights: {
          Title: D.list(o_Highlight),
          Address: { Label: D.list(o_Highlight) },
        },
      }),
      QueryRefinements: D.list({
        RefinedTerm: D.secret,
        OriginalTerm: D.secret,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Suggest",
})) as any;

const i_FilterCircle: D.LazyStruct = () => ({ Center: 0, Radius: 0 });
const o_AccessPoint: D.LazyStruct = () => ({ Label: D.secret });
const o_AccessRestriction: D.LazyStruct = () => ({
  Categories: D.list(o_Category),
});
const o_Address: D.LazyStruct = () => ({
  Label: D.secret,
  Country: { Code2: D.secret, Code3: D.secret, Name: D.secret },
  Region: { Code: D.secret, Name: D.secret },
  SubRegion: { Code: D.secret, Name: D.secret },
  Locality: D.secret,
  District: D.secret,
  SubDistrict: D.secret,
  PostalCode: D.secret,
  Block: D.secret,
  SubBlock: D.secret,
  Street: D.secret,
  StreetComponents: D.list({
    BaseName: D.secret,
    Type: D.secret,
    Prefix: D.secret,
    Suffix: D.secret,
    Direction: D.secret,
  }),
  AddressNumber: D.secret,
  Building: D.secret,
  SecondaryAddressComponents: D.list({
    Number: D.secret,
    Designator: D.secret,
  }),
});
const o_AdminNames: D.LazyStruct = () => ({
  Names: D.list({ Value: D.secret }),
});
const o_BusinessChain: D.LazyStruct = () => ({ Name: D.secret, Id: D.secret });
const o_Category: D.LazyStruct = () => ({
  Id: D.secret,
  Name: D.secret,
  LocalizedName: D.secret,
});
const o_Contacts: D.LazyStruct = () => ({
  Phones: D.list(o_ContactDetails),
  Faxes: D.list(o_ContactDetails),
  Websites: D.list(o_ContactDetails),
  Emails: D.list(o_ContactDetails),
});
const o_CrossReference: D.LazyStruct = () => ({
  Source: D.secret,
  SourcePlaceId: D.secret,
  SourceCategories: D.list(o_Category),
});
const o_FoodType: D.LazyStruct = () => ({
  LocalizedName: D.secret,
  Id: D.secret,
});
const o_Highlight: D.LazyStruct = () => ({ Value: D.secret });
const o_Intersection: D.LazyStruct = () => ({
  PlaceId: D.secret,
  Title: D.secret,
  Address: o_Address,
  AccessPoints: D.list(o_AccessPoint),
});
const o_OpeningHours: D.LazyStruct = () => ({
  Display: D.list(D.secret),
  Components: D.list({
    OpenTime: D.secret,
    OpenDuration: D.secret,
    Recurrence: D.secret,
  }),
  Categories: D.list(o_Category),
});
const o_ParsedQueryComponent: D.LazyStruct = () => ({
  Value: D.secret,
  QueryComponent: D.secret,
});
const o_PhonemeDetails: D.LazyStruct = () => ({
  Title: D.list(o_PhonemeTranscription),
  Address: {
    Country: D.list(o_PhonemeTranscription),
    Region: D.list(o_PhonemeTranscription),
    SubRegion: D.list(o_PhonemeTranscription),
    Locality: D.list(o_PhonemeTranscription),
    District: D.list(o_PhonemeTranscription),
    SubDistrict: D.list(o_PhonemeTranscription),
    Block: D.list(o_PhonemeTranscription),
    SubBlock: D.list(o_PhonemeTranscription),
    Street: D.list(o_PhonemeTranscription),
  },
});
const o_PostalCodeDetails: D.LazyStruct = () => ({
  PostalCode: D.secret,
  PostalAuthority: D.secret,
  PostalCodeType: D.secret,
  UspsZip: { ZipClassificationCode: D.secret },
  UspsZipPlus4: { RecordTypeCode: D.secret },
});
const o_RelatedPlace: D.LazyStruct = () => ({
  PlaceId: D.secret,
  PlaceType: D.secret,
  Title: D.secret,
  Address: o_Address,
  AccessPoints: D.list(o_AccessPoint),
});
const o_TimeZone: D.LazyStruct = () => ({ Name: D.secret, Offset: D.secret });
const o_ContactDetails: D.LazyStruct = () => ({
  Label: D.secret,
  Value: D.secret,
  Categories: D.list(o_Category),
});
const o_PhonemeTranscription: D.LazyStruct = () => ({ Value: D.secret });
