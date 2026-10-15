import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Geo Places",
  serviceShapeName: "PlacesService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "geo-places" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-11-19");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      if (UseDualStack === true) {
        return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
            return e(`https://places.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return e(`https://places.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://geo-places.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://geo-places.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://places.geo.{R}.{D}","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: /*@__PURE__*/ S.suspend(() => __S(33, __c1, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
const Region = /*@__PURE__*/ __L.at(__c4, 3) as any as S.Schema<Region>;
export interface SubRegion {
  Code?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
const SubRegion = Region as any as S.Schema<SubRegion>;
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
export type GeocodeAddressNamesMode = "Matched" | "Administrative" | (string & {});
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
export type ZipClassificationCode = "Military" | "PostOfficeBoxes" | "Unique" | (string & {});
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
export type SecondaryAddressComponentMatchScoreList = SecondaryAddressComponentMatchScore[];
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
export type ParsedQuerySecondaryAddressComponentList = ParsedQuerySecondaryAddressComponent[];
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
export type ReverseGeocodeAdditionalFeatureList = ReverseGeocodeAdditionalFeature[];
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
  input: __S(65, __c2, 1) as any as S.Schema<AutocompleteRequest>,
  output: __S(72, __c2, 8) as any as S.Schema<AutocompleteResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Autocomplete",
}));

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
  input: __S(226, __c7, 2) as any as S.Schema<GeocodeRequest>,
  output: __S(245, __c7, 21) as any as S.Schema<GeocodeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Geocode",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<GetPlaceRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<GetPlaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlace",
}));

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
  input: __S(481, __c15, 1) as any as S.Schema<ReverseGeocodeRequest>,
  output: __S(484, __c15, 4) as any as S.Schema<ReverseGeocodeResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReverseGeocode",
}));

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
  input: __S(513, __c16, 1) as any as S.Schema<SearchNearbyRequest>,
  output: __S(546, __c17, 2) as any as S.Schema<SearchNearbyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchNearby",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<SearchTextRequest>,
  output: __S(546, __c17, 2) as any as S.Schema<SearchTextResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchText",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<SuggestRequest>,
  output: __S(9, __c0, 9) as any as S.Schema<SuggestResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Suggest",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryText: SensitiveString,
          MaxResults: S.optional(S.Number),
          MaxQueryRefinements: S.optional(S.Number),
          BiasPosition: S.optional(__S(128, __c4, 0)),
          Filter: S.optional(__S(608, __c19, 0)),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          IntendedUse: S.optional(S.String),
          TravelMode: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/suggest" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SuggestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PlaceId: S.optional(SensitiveString),
          PlaceType: S.optional(S.String),
          Address: S.optional(__S(137, __c4, 9)),
          Position: S.optional(__S(128, __c4, 0)),
          Distance: S.optional(S.Number),
          MapView: S.optional(__S(128, __c4, 0)),
          Categories: S.optional(__S(321, __c10, 1)),
          FoodTypes: S.optional(__S(323, __c10, 3)),
          BusinessChains: S.optional(__S(449, __c14, 1)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
          AccessRestrictions: S.optional(__S(451, __c14, 3)),
          TimeZone: S.optional(__S(326, __c10, 6)),
          PoliticalView: S.optional(SensitiveString),
          Phonemes: S.optional(__S(455, __c14, 7)),
          PlaceAttributes: S.optional(__S(129, __c4, 1)),
          CrossReferences: S.optional(__S(457, __c14, 9)),
        }),
      ).annotate({ identifier: "SuggestPlaceResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({ QueryId: S.optional(SensitiveString), QueryType: S.optional(S.String) }),
      ).annotate({ identifier: "SuggestQueryResult" });
    case 3:
      return S.suspend(() => S.Struct({ Label: S.optional(__S(97, __c3, 1)) })).annotate({
        identifier: "SuggestAddressHighlights",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ Title: S.optional(__S(97, __c3, 1)), Address: S.optional(__S(3, __c0, 3)) }),
      ).annotate({ identifier: "SuggestHighlights" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Title: SensitiveString,
          SuggestResultItemType: S.String,
          Place: S.optional(__S(1, __c0, 1)),
          Query: S.optional(__S(2, __c0, 2)),
          Highlights: S.optional(__S(4, __c0, 4)),
        }),
      ).annotate({ identifier: "SuggestResultItem" });
    case 6:
      return S.Array(__S(5, __c0, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          RefinedTerm: SensitiveString,
          OriginalTerm: SensitiveString,
          StartIndex: S.Number,
          EndIndex: S.Number,
        }),
      ).annotate({ identifier: "QueryRefinement" });
    case 8:
      return S.Array(__S(7, __c0, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          ResultItems: S.optional(__S(6, __c0, 6)),
          QueryRefinements: S.optional(__S(8, __c0, 8)),
        }),
      ).annotate({ identifier: "SuggestResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Message: S.String }).pipe(
          S.encodeKeys({ Name: "name", Message: "message" }),
        ),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(32, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: S.optional(__S(128, __c4, 0)),
          Circle: S.optional(__S(192, __c6, 0)),
          IncludeCountries: S.optional(__S(160, __c5, 0)),
          IncludePlaceTypes: S.optional(__S(129, __c4, 1)),
        }),
      ).annotate({ identifier: "AutocompleteFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryText: SensitiveString,
          MaxResults: S.optional(S.Number),
          BiasPosition: S.optional(__S(128, __c4, 0)),
          Filter: S.optional(__S(64, __c2, 0)),
          PostalCodeMode: S.optional(S.String),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          IntendedUse: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/autocomplete" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AutocompleteRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(__S(97, __c3, 1)), Name: S.optional(__S(97, __c3, 1)) }),
      ).annotate({ identifier: "CountryHighlights" });
    case 3:
      return S.Array(__S(97, __c3, 1));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Label: S.optional(__S(97, __c3, 1)),
          Country: S.optional(__S(66, __c2, 2)),
          Region: S.optional(__S(66, __c2, 2)),
          SubRegion: S.optional(__S(66, __c2, 2)),
          Locality: S.optional(__S(97, __c3, 1)),
          District: S.optional(__S(97, __c3, 1)),
          SubDistrict: S.optional(__S(97, __c3, 1)),
          Street: S.optional(__S(97, __c3, 1)),
          Block: S.optional(__S(97, __c3, 1)),
          SubBlock: S.optional(__S(97, __c3, 1)),
          Intersection: S.optional(__S(67, __c2, 3)),
          PostalCode: S.optional(__S(97, __c3, 1)),
          AddressNumber: S.optional(__S(97, __c3, 1)),
          Building: S.optional(__S(97, __c3, 1)),
        }),
      ).annotate({ identifier: "AutocompleteAddressHighlights" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Title: S.optional(__S(97, __c3, 1)), Address: S.optional(__S(68, __c2, 4)) }),
      ).annotate({ identifier: "AutocompleteHighlights" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          PlaceType: S.String,
          Title: SensitiveString,
          Address: S.optional(__S(137, __c4, 9)),
          Distance: S.optional(S.Number),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          Highlights: S.optional(__S(69, __c2, 5)),
          EstimatedPointAddress: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AutocompleteResultItem" });
    case 7:
      return S.Array(__S(70, __c2, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          ResultItems: S.optional(__S(71, __c2, 7)),
        }),
      ).annotate({ identifier: "AutocompleteResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartIndex: S.optional(S.Number),
          EndIndex: S.optional(S.Number),
          Value: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Highlight" });
    case 1:
      return S.Array(__S(96, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Code2: S.optional(SensitiveString),
          Code3: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Country" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(SensitiveString), Name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Region" });
    case 4:
      return S.Array(S.String);
    case 5:
      return S.suspend(() =>
        S.Struct({
          BaseName: S.optional(SensitiveString),
          Type: S.optional(SensitiveString),
          TypePlacement: S.optional(S.String),
          TypeSeparator: S.optional(S.String),
          Prefix: S.optional(SensitiveString),
          Suffix: S.optional(SensitiveString),
          Direction: S.optional(SensitiveString),
          Language: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreetComponents" });
    case 6:
      return S.Array(__S(133, __c4, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ Number: SensitiveString, Designator: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SecondaryAddressComponent" });
    case 8:
      return S.Array(__S(135, __c4, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Label: S.optional(SensitiveString),
          Country: S.optional(__S(130, __c4, 2)),
          Region: S.optional(Region),
          SubRegion: S.optional(SubRegion),
          Locality: S.optional(SensitiveString),
          District: S.optional(SensitiveString),
          SubDistrict: S.optional(SensitiveString),
          PostalCode: S.optional(SensitiveString),
          Block: S.optional(SensitiveString),
          SubBlock: S.optional(SensitiveString),
          Intersection: S.optional(__S(132, __c4, 4)),
          Street: S.optional(SensitiveString),
          StreetComponents: S.optional(__S(134, __c4, 6)),
          AddressNumber: S.optional(SensitiveString),
          Building: S.optional(SensitiveString),
          SecondaryAddressComponents: S.optional(__S(136, __c4, 8)),
        }),
      ).annotate({ identifier: "Address" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Center: __S(128, __c4, 0), Radius: S.Number })).annotate({
        identifier: "FilterCircle",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Country: S.optional(SensitiveString),
          Region: S.optional(SensitiveString),
          SubRegion: S.optional(SensitiveString),
          Locality: S.optional(SensitiveString),
          District: S.optional(SensitiveString),
          Street: S.optional(SensitiveString),
          AddressNumber: S.optional(SensitiveString),
          PostalCode: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "GeocodeQueryComponents" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IncludeCountries: S.optional(__S(160, __c5, 0)),
          IncludePlaceTypes: S.optional(__S(129, __c4, 1)),
        }),
      ).annotate({ identifier: "GeocodeFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          QueryText: S.optional(SensitiveString),
          QueryComponents: S.optional(__S(224, __c7, 0)),
          MaxResults: S.optional(S.Number),
          BiasPosition: S.optional(__S(128, __c4, 0)),
          Filter: S.optional(__S(225, __c7, 1)),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          IntendedUse: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          PostalCodeMode: S.optional(S.String),
          AddressTranslations: S.optional(__S(129, __c4, 1)),
          AddressNamesMode: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/geocode" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GeocodeRequest" });
    case 3:
      return S.suspend(() => S.Struct({ Number: S.optional(S.Number) })).annotate({
        identifier: "SecondaryAddressComponentMatchScore",
      });
    case 4:
      return S.Array(__S(227, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Country: S.optional(S.Number),
          Region: S.optional(S.Number),
          SubRegion: S.optional(S.Number),
          Locality: S.optional(S.Number),
          District: S.optional(S.Number),
          SubDistrict: S.optional(S.Number),
          PostalCode: S.optional(S.Number),
          Block: S.optional(S.Number),
          SubBlock: S.optional(S.Number),
          Intersection: S.optional(__S(128, __c4, 0)),
          AddressNumber: S.optional(S.Number),
          Building: S.optional(S.Number),
          SecondaryAddressComponents: S.optional(__S(228, __c7, 4)),
        }),
      ).annotate({ identifier: "AddressComponentMatchScores" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Title: S.optional(S.Number), Address: S.optional(__S(229, __c7, 5)) }),
      ).annotate({ identifier: "ComponentMatchScores" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Overall: S.optional(S.Number), Components: S.optional(__S(230, __c7, 6)) }),
      ).annotate({ identifier: "MatchScoreDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          StartIndex: S.optional(S.Number),
          EndIndex: S.optional(S.Number),
          Value: S.optional(SensitiveString),
          QueryComponent: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ParsedQueryComponent" });
    case 9:
      return S.Array(__S(232, __c7, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          StartIndex: S.Number,
          EndIndex: S.Number,
          Value: SensitiveString,
          Number: SensitiveString,
          Designator: SensitiveString,
        }),
      ).annotate({ identifier: "ParsedQuerySecondaryAddressComponent" });
    case 11:
      return S.Array(__S(234, __c7, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Country: S.optional(__S(233, __c7, 9)),
          Region: S.optional(__S(233, __c7, 9)),
          SubRegion: S.optional(__S(233, __c7, 9)),
          Locality: S.optional(__S(233, __c7, 9)),
          District: S.optional(__S(233, __c7, 9)),
          SubDistrict: S.optional(__S(233, __c7, 9)),
          PostalCode: S.optional(__S(233, __c7, 9)),
          Block: S.optional(__S(233, __c7, 9)),
          SubBlock: S.optional(__S(233, __c7, 9)),
          Street: S.optional(__S(233, __c7, 9)),
          AddressNumber: S.optional(__S(233, __c7, 9)),
          Building: S.optional(__S(233, __c7, 9)),
          SecondaryAddressComponents: S.optional(__S(235, __c7, 11)),
          OtherComponents: S.optional(__S(233, __c7, 9)),
        }),
      ).annotate({ identifier: "GeocodeParsedQueryAddressComponents" });
    case 13:
      return S.suspend(() =>
        S.Struct({ Title: S.optional(__S(233, __c7, 9)), Address: S.optional(__S(236, __c7, 12)) }),
      ).annotate({ identifier: "GeocodeParsedQuery" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Value: SensitiveString,
          Language: S.optional(S.String),
          Type: S.String,
          Primary: S.optional(S.Boolean),
          Transliterated: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TranslationName" });
    case 15:
      return S.Array(__S(238, __c7, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ Names: __S(239, __c7, 15), Preference: S.optional(S.String) }),
      ).annotate({ identifier: "AdminNames" });
    case 17:
      return S.Array(__S(240, __c7, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Locality: S.optional(__S(241, __c7, 17)),
          Region: S.optional(__S(241, __c7, 17)),
          District: S.optional(__S(241, __c7, 17)),
          SubRegion: S.optional(__S(241, __c7, 17)),
        }),
      ).annotate({ identifier: "TranslationDetails" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          PlaceType: S.String,
          Title: SensitiveString,
          Address: S.optional(__S(137, __c4, 9)),
          AddressNumberCorrected: S.optional(S.Boolean),
          PostalCodeDetails: S.optional(__S(291, __c9, 3)),
          Position: S.optional(__S(128, __c4, 0)),
          Distance: S.optional(S.Number),
          MapView: S.optional(__S(128, __c4, 0)),
          Categories: S.optional(__S(321, __c10, 1)),
          FoodTypes: S.optional(__S(323, __c10, 3)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
          TimeZone: S.optional(__S(326, __c10, 6)),
          PoliticalView: S.optional(SensitiveString),
          MatchScores: S.optional(__S(231, __c7, 7)),
          ParsedQuery: S.optional(__S(237, __c7, 13)),
          Intersections: S.optional(__S(353, __c11, 1)),
          MainAddress: S.optional(__S(292, __c9, 4)),
          SecondaryAddresses: S.optional(__S(256, __c8, 0)),
          Translations: S.optional(__S(242, __c7, 18)),
          EstimatedPointAddress: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GeocodeResultItem" });
    case 20:
      return S.Array(__S(243, __c7, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          ResultItems: S.optional(__S(244, __c7, 20)),
        }),
      ).annotate({ identifier: "GeocodeResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(292, __c9, 4));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ZipClassificationCode: S.optional(S.String) })).annotate({
        identifier: "UspsZip",
      });
    case 1:
      return S.suspend(() => S.Struct({ RecordTypeCode: S.optional(S.String) })).annotate({
        identifier: "UspsZipPlus4",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PostalCode: S.optional(SensitiveString),
          PostalAuthority: S.optional(S.String),
          PostalCodeType: S.optional(S.String),
          UspsZip: S.optional(__S(288, __c9, 0)),
          UspsZipPlus4: S.optional(__S(289, __c9, 1)),
        }),
      ).annotate({ identifier: "PostalCodeDetails" });
    case 3:
      return S.Array(__S(290, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          PlaceType: S.String,
          Title: SensitiveString,
          Address: S.optional(__S(137, __c4, 9)),
          Position: S.optional(__S(128, __c4, 0)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
        }),
      ).annotate({ identifier: "RelatedPlace" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: SensitiveString,
          Name: SensitiveString,
          LocalizedName: S.optional(SensitiveString),
          Primary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Category" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LocalizedName: SensitiveString,
          Id: S.optional(SensitiveString),
          Primary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FoodType" });
    case 3:
      return S.Array(__S(322, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Position: S.optional(__S(128, __c4, 0)),
          Type: S.optional(S.String),
          Primary: S.optional(S.Boolean),
          Label: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AccessPoint" });
    case 5:
      return S.Array(__S(324, __c10, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: SensitiveString,
          Offset: S.optional(SensitiveString),
          OffsetSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TimeZone" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          Title: SensitiveString,
          Address: S.optional(__S(137, __c4, 9)),
          Position: S.optional(__S(128, __c4, 0)),
          Distance: S.optional(S.Number),
          RouteDistance: S.optional(S.Number),
          MapView: S.optional(__S(128, __c4, 0)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
        }),
      ).annotate({ identifier: "Intersection" });
    case 1:
      return S.Array(__S(352, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString.pipe(T.HttpLabel("PlaceId")),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)).pipe(
            T.HttpQuery("additional-features"),
          ),
          Language: S.optional(S.String).pipe(T.HttpQuery("language")),
          PoliticalView: S.optional(SensitiveString).pipe(T.HttpQuery("political-view")),
          IntendedUse: S.optional(S.String).pipe(T.HttpQuery("intended-use")),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          AddressNamesMode: S.optional(S.String).pipe(T.HttpQuery("address-names-mode")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/place/{PlaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPlaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          PlaceType: S.String,
          Title: SensitiveString,
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          Address: S.optional(__S(137, __c4, 9)),
          AddressNumberCorrected: S.optional(S.Boolean),
          PostalCodeDetails: S.optional(__S(291, __c9, 3)),
          Position: S.optional(__S(128, __c4, 0)),
          MapView: S.optional(__S(128, __c4, 0)),
          Categories: S.optional(__S(321, __c10, 1)),
          FoodTypes: S.optional(__S(323, __c10, 3)),
          BusinessChains: S.optional(__S(449, __c14, 1)),
          Contacts: S.optional(__S(418, __c13, 2)),
          OpeningHours: S.optional(__S(422, __c13, 6)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
          AccessRestrictions: S.optional(__S(451, __c14, 3)),
          TimeZone: S.optional(__S(326, __c10, 6)),
          PoliticalView: S.optional(SensitiveString),
          Phonemes: S.optional(__S(455, __c14, 7)),
          MainAddress: S.optional(__S(292, __c9, 4)),
          SecondaryAddresses: S.optional(__S(256, __c8, 0)),
          PlaceAttributes: S.optional(__S(129, __c4, 1)),
          EstimatedPointAddress: S.optional(S.Boolean),
          CrossReferences: S.optional(__S(457, __c14, 9)),
        }),
      ).annotate({ identifier: "GetPlaceResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Label: S.optional(SensitiveString),
          Value: S.optional(SensitiveString),
          Categories: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "ContactDetails" });
    case 1:
      return S.Array(__S(416, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Phones: S.optional(__S(417, __c13, 1)),
          Faxes: S.optional(__S(417, __c13, 1)),
          Websites: S.optional(__S(417, __c13, 1)),
          Emails: S.optional(__S(417, __c13, 1)),
        }),
      ).annotate({ identifier: "Contacts" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          OpenTime: S.optional(SensitiveString),
          OpenDuration: S.optional(SensitiveString),
          Recurrence: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "OpeningHoursComponents" });
    case 4:
      return S.Array(__S(419, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Display: S.optional(__S(160, __c5, 0)),
          OpenNow: S.optional(S.Boolean),
          Components: S.optional(__S(420, __c13, 4)),
          Categories: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "OpeningHours" });
    case 6:
      return S.Array(__S(421, __c13, 5));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(SensitiveString), Id: S.optional(SensitiveString) }),
      ).annotate({ identifier: "BusinessChain" });
    case 1:
      return S.Array(__S(448, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Restricted: S.optional(S.Boolean), Categories: S.optional(__S(321, __c10, 1)) }),
      ).annotate({ identifier: "AccessRestriction" });
    case 3:
      return S.Array(__S(450, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(SensitiveString),
          Language: S.optional(S.String),
          Preferred: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PhonemeTranscription" });
    case 5:
      return S.Array(__S(452, __c14, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Country: S.optional(__S(453, __c14, 5)),
          Region: S.optional(__S(453, __c14, 5)),
          SubRegion: S.optional(__S(453, __c14, 5)),
          Locality: S.optional(__S(453, __c14, 5)),
          District: S.optional(__S(453, __c14, 5)),
          SubDistrict: S.optional(__S(453, __c14, 5)),
          Block: S.optional(__S(453, __c14, 5)),
          SubBlock: S.optional(__S(453, __c14, 5)),
          Street: S.optional(__S(453, __c14, 5)),
        }),
      ).annotate({ identifier: "AddressComponentPhonemes" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(__S(453, __c14, 5)),
          Address: S.optional(__S(454, __c14, 6)),
        }),
      ).annotate({ identifier: "PhonemeDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Source: SensitiveString,
          SourcePlaceId: SensitiveString,
          SourceCategories: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "CrossReference" });
    case 9:
      return S.Array(__S(456, __c14, 8));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IncludePlaceTypes: S.optional(__S(129, __c4, 1)) }),
      ).annotate({ identifier: "ReverseGeocodeFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryPosition: __S(128, __c4, 0),
          QueryRadius: S.optional(S.Number),
          MaxResults: S.optional(S.Number),
          Filter: S.optional(__S(480, __c15, 0)),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          IntendedUse: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
          Heading: S.optional(S.Number),
          AddressNamesMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/reverse-geocode" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ReverseGeocodeRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          PlaceType: S.String,
          Title: SensitiveString,
          Address: S.optional(__S(137, __c4, 9)),
          AddressNumberCorrected: S.optional(S.Boolean),
          PostalCodeDetails: S.optional(__S(291, __c9, 3)),
          Position: S.optional(__S(128, __c4, 0)),
          Distance: S.optional(S.Number),
          MapView: S.optional(__S(128, __c4, 0)),
          Categories: S.optional(__S(321, __c10, 1)),
          FoodTypes: S.optional(__S(323, __c10, 3)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
          TimeZone: S.optional(__S(326, __c10, 6)),
          PoliticalView: S.optional(SensitiveString),
          Intersections: S.optional(__S(353, __c11, 1)),
          MainAddress: S.optional(__S(292, __c9, 4)),
          EstimatedPointAddress: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ReverseGeocodeResultItem" });
    case 3:
      return S.Array(__S(482, __c15, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          ResultItems: S.optional(__S(483, __c15, 3)),
        }),
      ).annotate({ identifier: "ReverseGeocodeResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: S.optional(__S(128, __c4, 0)),
          IncludeCountries: S.optional(__S(160, __c5, 0)),
          IncludeCategories: S.optional(__S(160, __c5, 0)),
          ExcludeCategories: S.optional(__S(160, __c5, 0)),
          IncludeBusinessChains: S.optional(__S(160, __c5, 0)),
          ExcludeBusinessChains: S.optional(__S(160, __c5, 0)),
          IncludeFoodTypes: S.optional(__S(160, __c5, 0)),
          ExcludeFoodTypes: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "SearchNearbyFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryPosition: __S(128, __c4, 0),
          QueryRadius: S.optional(S.Number),
          MaxResults: S.optional(S.Number),
          Filter: S.optional(__S(512, __c16, 0)),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          IntendedUse: S.optional(S.String),
          NextToken: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/search-nearby" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchNearbyRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PlaceId: SensitiveString,
          PlaceType: S.String,
          Title: SensitiveString,
          Address: S.optional(__S(137, __c4, 9)),
          AddressNumberCorrected: S.optional(S.Boolean),
          Position: S.optional(__S(128, __c4, 0)),
          Distance: S.optional(S.Number),
          MapView: S.optional(__S(128, __c4, 0)),
          Categories: S.optional(__S(321, __c10, 1)),
          FoodTypes: S.optional(__S(323, __c10, 3)),
          BusinessChains: S.optional(__S(449, __c14, 1)),
          Contacts: S.optional(__S(418, __c13, 2)),
          OpeningHours: S.optional(__S(422, __c13, 6)),
          AccessPoints: S.optional(__S(325, __c10, 5)),
          AccessRestrictions: S.optional(__S(451, __c14, 3)),
          TimeZone: S.optional(__S(326, __c10, 6)),
          PoliticalView: S.optional(SensitiveString),
          Phonemes: S.optional(__S(455, __c14, 7)),
          PlaceAttributes: S.optional(__S(129, __c4, 1)),
          CrossReferences: S.optional(__S(457, __c14, 9)),
        }),
      ).annotate({ identifier: "SearchNearbyResultItem" });
    case 1:
      return S.Array(__S(544, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
          ResultItems: S.optional(__S(545, __c17, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchNearbyResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryText: S.optional(SensitiveString),
          QueryId: S.optional(SensitiveString),
          MaxResults: S.optional(S.Number),
          BiasPosition: S.optional(__S(128, __c4, 0)),
          Filter: S.optional(__S(608, __c19, 0)),
          AdditionalFeatures: S.optional(__S(129, __c4, 1)),
          Language: S.optional(S.String),
          PoliticalView: S.optional(SensitiveString),
          IntendedUse: S.optional(S.String),
          NextToken: S.optional(S.String),
          TravelMode: S.optional(S.String),
          Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/search-text" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchTextRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BoundingBox: S.optional(__S(128, __c4, 0)),
          Circle: S.optional(__S(192, __c6, 0)),
          IncludeCountries: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "SearchTextFilter" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
