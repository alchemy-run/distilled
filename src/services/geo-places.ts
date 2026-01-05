import { HttpClient } from "@effect/platform";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import * as API from "../api.ts";
import {
  Credentials,
  Region as Rgn,
  Traits as T,
  ErrorCategory,
  Errors,
} from "../index.ts";
const svc = T.AwsApiService({
  sdkId: "Geo Places",
  serviceShapeName: "PlacesService",
});
const auth = T.AwsAuthSigv4({ name: "geo-places" });
const ver = T.ServiceVersion("2020-11-19");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointRuleSet({
  version: "1.0",
  parameters: {
    UseDualStack: {
      builtIn: "AWS::UseDualStack",
      required: true,
      default: false,
      documentation:
        "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
      type: "boolean",
    },
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "string",
    },
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "string",
    },
  },
  rules: [
    {
      conditions: [{ fn: "isSet", argv: [{ ref: "Endpoint" }] }],
      rules: [
        {
          conditions: [
            { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
          ],
          error:
            "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: "error",
        },
        {
          conditions: [],
          rules: [
            {
              conditions: [
                { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
              ],
              error:
                "Invalid Configuration: Dualstack and custom endpoint are not supported",
              type: "error",
            },
            {
              conditions: [],
              endpoint: {
                url: { ref: "Endpoint" },
                properties: {},
                headers: {},
              },
              type: "endpoint",
            },
          ],
          type: "tree",
        },
      ],
      type: "tree",
    },
    {
      conditions: [],
      rules: [
        {
          conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
          rules: [
            {
              conditions: [
                {
                  fn: "aws.partition",
                  argv: [{ ref: "Region" }],
                  assign: "PartitionResult",
                },
              ],
              rules: [
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo.{Region}.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo-fips.{Region}.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo-fips.{Region}.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo.{Region}.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo.{Region}.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo-fips.{Region}.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo-fips.{Region}.{PartitionResult#dnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    {
                      fn: "stringEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "name"],
                        },
                        "aws-us-gov",
                      ],
                    },
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  endpoint: {
                    url: "https://places.geo.{Region}.{PartitionResult#dualStackDnsSuffix}/v2",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsFIPS",
                              ],
                            },
                          ],
                        },
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsDualStack",
                              ],
                            },
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://geo-places-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                      type: "tree",
                    },
                    {
                      conditions: [],
                      error:
                        "FIPS and DualStack are enabled, but this partition does not support one or both",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, false],
                    },
                  ],
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsFIPS",
                              ],
                            },
                            true,
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://geo-places-fips.{Region}.{PartitionResult#dnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                      type: "tree",
                    },
                    {
                      conditions: [],
                      error:
                        "FIPS is enabled but this partition does not support FIPS",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
                  ],
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsDualStack",
                              ],
                            },
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://geo-places.{Region}.{PartitionResult#dualStackDnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                      type: "tree",
                    },
                    {
                      conditions: [],
                      error:
                        "DualStack is enabled but this partition does not support DualStack",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [],
                  endpoint: {
                    url: "https://geo-places.{Region}.{PartitionResult#dnsSuffix}",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
              type: "tree",
            },
          ],
          type: "tree",
        },
        {
          conditions: [],
          error: "Invalid Configuration: Missing Region",
          type: "error",
        },
      ],
      type: "tree",
    },
  ],
});

//# Newtypes
export type SensitiveString = string;
export type PostalCodeMode = string;
export type AutocompleteAdditionalFeature = string;
export type LanguageTag = string;
export type CountryCode = string;
export type AutocompleteIntendedUse = string;
export type ApiKey = string;
export type GeocodeAdditionalFeature = string;
export type GeocodeIntendedUse = string;
export type GetPlaceAdditionalFeature = string;
export type GetPlaceIntendedUse = string;
export type DistanceMeters = number;
export type ReverseGeocodeAdditionalFeature = string;
export type ReverseGeocodeIntendedUse = string;
export type Heading = number;
export type SearchNearbyAdditionalFeature = string;
export type SearchNearbyIntendedUse = string;
export type Token = string;
export type SearchTextAdditionalFeature = string;
export type SearchTextIntendedUse = string;
export type SuggestAdditionalFeature = string;
export type SuggestIntendedUse = string;
export type AutocompleteFilterPlaceType = string;
export type GeocodeFilterPlaceType = string;
export type ReverseGeocodeFilterPlaceType = string;
export type PlaceType = string;
export type CountryCode3 = string;
export type IntersectionStreet = string;
export type PostalAuthority = string;
export type PostalCodeType = string;
export type OpeningHoursDisplay = string;
export type DurationSeconds = number;
export type CountryCode2 = string;
export type TypePlacement = string;
export type TypeSeparator = string;
export type ZipClassificationCode = string;
export type RecordTypeCode = string;
export type SuggestResultItemType = string;
export type MatchScore = number;
export type QueryType = string;
export type ValidationExceptionReason = string;

//# Schemas
export type Position = number[];
export const Position = S.Array(S.Number);
export type AutocompleteAdditionalFeatureList = string[];
export const AutocompleteAdditionalFeatureList = S.Array(S.String);
export type GeocodeAdditionalFeatureList = string[];
export const GeocodeAdditionalFeatureList = S.Array(S.String);
export type GetPlaceAdditionalFeatureList = string[];
export const GetPlaceAdditionalFeatureList = S.Array(S.String);
export type ReverseGeocodeAdditionalFeatureList = string[];
export const ReverseGeocodeAdditionalFeatureList = S.Array(S.String);
export type SearchNearbyAdditionalFeatureList = string[];
export const SearchNearbyAdditionalFeatureList = S.Array(S.String);
export type SearchTextAdditionalFeatureList = string[];
export const SearchTextAdditionalFeatureList = S.Array(S.String);
export type SuggestAdditionalFeatureList = string[];
export const SuggestAdditionalFeatureList = S.Array(S.String);
export interface GetPlaceRequest {
  PlaceId: string;
  AdditionalFeatures?: GetPlaceAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  Key?: string;
}
export const GetPlaceRequest = S.suspend(() =>
  S.Struct({
    PlaceId: S.String.pipe(T.HttpLabel("PlaceId")),
    AdditionalFeatures: S.optional(GetPlaceAdditionalFeatureList).pipe(
      T.HttpQuery("additional-features"),
    ),
    Language: S.optional(S.String).pipe(T.HttpQuery("language")),
    PoliticalView: S.optional(S.String).pipe(T.HttpQuery("political-view")),
    IntendedUse: S.optional(S.String).pipe(T.HttpQuery("intended-use")),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/place/{PlaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetPlaceRequest",
}) as any as S.Schema<GetPlaceRequest>;
export type BoundingBox = number[];
export const BoundingBox = S.Array(S.Number);
export type CountryCodeList = string[];
export const CountryCodeList = S.Array(S.String);
export type AutocompleteFilterPlaceTypeList = string[];
export const AutocompleteFilterPlaceTypeList = S.Array(S.String);
export type GeocodeFilterPlaceTypeList = string[];
export const GeocodeFilterPlaceTypeList = S.Array(S.String);
export type ReverseGeocodeFilterPlaceTypeList = string[];
export const ReverseGeocodeFilterPlaceTypeList = S.Array(S.String);
export type FilterCategoryList = string[];
export const FilterCategoryList = S.Array(S.String);
export type FilterBusinessChainList = string[];
export const FilterBusinessChainList = S.Array(S.String);
export type FilterFoodTypeList = string[];
export const FilterFoodTypeList = S.Array(S.String);
export interface GeocodeQueryComponents {
  Country?: string;
  Region?: string;
  SubRegion?: string;
  Locality?: string;
  District?: string;
  Street?: string;
  AddressNumber?: string;
  PostalCode?: string;
}
export const GeocodeQueryComponents = S.suspend(() =>
  S.Struct({
    Country: S.optional(S.String),
    Region: S.optional(S.String),
    SubRegion: S.optional(S.String),
    Locality: S.optional(S.String),
    District: S.optional(S.String),
    Street: S.optional(S.String),
    AddressNumber: S.optional(S.String),
    PostalCode: S.optional(S.String),
  }),
).annotations({
  identifier: "GeocodeQueryComponents",
}) as any as S.Schema<GeocodeQueryComponents>;
export interface GeocodeFilter {
  IncludeCountries?: CountryCodeList;
  IncludePlaceTypes?: GeocodeFilterPlaceTypeList;
}
export const GeocodeFilter = S.suspend(() =>
  S.Struct({
    IncludeCountries: S.optional(CountryCodeList),
    IncludePlaceTypes: S.optional(GeocodeFilterPlaceTypeList),
  }),
).annotations({
  identifier: "GeocodeFilter",
}) as any as S.Schema<GeocodeFilter>;
export interface Country {
  Code2?: string;
  Code3?: string;
  Name?: string;
}
export const Country = S.suspend(() =>
  S.Struct({
    Code2: S.optional(S.String),
    Code3: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotations({ identifier: "Country" }) as any as S.Schema<Country>;
export interface Region {
  Code?: string;
  Name?: string;
}
export const Region = S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Name: S.optional(S.String) }),
).annotations({ identifier: "Region" }) as any as S.Schema<Region>;
export interface SubRegion {
  Code?: string;
  Name?: string;
}
export const SubRegion = S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Name: S.optional(S.String) }),
).annotations({ identifier: "SubRegion" }) as any as S.Schema<SubRegion>;
export type IntersectionStreetList = string[];
export const IntersectionStreetList = S.Array(S.String);
export interface StreetComponents {
  BaseName?: string;
  Type?: string;
  TypePlacement?: string;
  TypeSeparator?: string;
  Prefix?: string;
  Suffix?: string;
  Direction?: string;
  Language?: string;
}
export const StreetComponents = S.suspend(() =>
  S.Struct({
    BaseName: S.optional(S.String),
    Type: S.optional(S.String),
    TypePlacement: S.optional(S.String),
    TypeSeparator: S.optional(S.String),
    Prefix: S.optional(S.String),
    Suffix: S.optional(S.String),
    Direction: S.optional(S.String),
    Language: S.optional(S.String),
  }),
).annotations({
  identifier: "StreetComponents",
}) as any as S.Schema<StreetComponents>;
export type StreetComponentsList = StreetComponents[];
export const StreetComponentsList = S.Array(StreetComponents);
export interface SecondaryAddressComponent {
  Number: string;
  Designator?: string;
}
export const SecondaryAddressComponent = S.suspend(() =>
  S.Struct({ Number: S.String, Designator: S.optional(S.String) }),
).annotations({
  identifier: "SecondaryAddressComponent",
}) as any as S.Schema<SecondaryAddressComponent>;
export type SecondaryAddressComponentList = SecondaryAddressComponent[];
export const SecondaryAddressComponentList = S.Array(SecondaryAddressComponent);
export interface Address {
  Label?: string;
  Country?: Country;
  Region?: Region;
  SubRegion?: SubRegion;
  Locality?: string;
  District?: string;
  SubDistrict?: string;
  PostalCode?: string;
  Block?: string;
  SubBlock?: string;
  Intersection?: IntersectionStreetList;
  Street?: string;
  StreetComponents?: StreetComponentsList;
  AddressNumber?: string;
  Building?: string;
  SecondaryAddressComponents?: SecondaryAddressComponentList;
}
export const Address = S.suspend(() =>
  S.Struct({
    Label: S.optional(S.String),
    Country: S.optional(Country),
    Region: S.optional(Region),
    SubRegion: S.optional(SubRegion),
    Locality: S.optional(S.String),
    District: S.optional(S.String),
    SubDistrict: S.optional(S.String),
    PostalCode: S.optional(S.String),
    Block: S.optional(S.String),
    SubBlock: S.optional(S.String),
    Intersection: S.optional(IntersectionStreetList),
    Street: S.optional(S.String),
    StreetComponents: S.optional(StreetComponentsList),
    AddressNumber: S.optional(S.String),
    Building: S.optional(S.String),
    SecondaryAddressComponents: S.optional(SecondaryAddressComponentList),
  }),
).annotations({ identifier: "Address" }) as any as S.Schema<Address>;
export interface AccessPoint {
  Position?: Position;
}
export const AccessPoint = S.suspend(() =>
  S.Struct({ Position: S.optional(Position) }),
).annotations({ identifier: "AccessPoint" }) as any as S.Schema<AccessPoint>;
export type AccessPointList = AccessPoint[];
export const AccessPointList = S.Array(AccessPoint);
export interface RelatedPlace {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  Address?: Address;
  Position?: Position;
  AccessPoints?: AccessPointList;
}
export const RelatedPlace = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    Address: S.optional(Address),
    Position: S.optional(Position),
    AccessPoints: S.optional(AccessPointList),
  }),
).annotations({ identifier: "RelatedPlace" }) as any as S.Schema<RelatedPlace>;
export type RelatedPlaceList = RelatedPlace[];
export const RelatedPlaceList = S.Array(RelatedPlace);
export interface ReverseGeocodeFilter {
  IncludePlaceTypes?: ReverseGeocodeFilterPlaceTypeList;
}
export const ReverseGeocodeFilter = S.suspend(() =>
  S.Struct({
    IncludePlaceTypes: S.optional(ReverseGeocodeFilterPlaceTypeList),
  }),
).annotations({
  identifier: "ReverseGeocodeFilter",
}) as any as S.Schema<ReverseGeocodeFilter>;
export interface SearchNearbyFilter {
  BoundingBox?: BoundingBox;
  IncludeCountries?: CountryCodeList;
  IncludeCategories?: FilterCategoryList;
  ExcludeCategories?: FilterCategoryList;
  IncludeBusinessChains?: FilterBusinessChainList;
  ExcludeBusinessChains?: FilterBusinessChainList;
  IncludeFoodTypes?: FilterFoodTypeList;
  ExcludeFoodTypes?: FilterFoodTypeList;
}
export const SearchNearbyFilter = S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    IncludeCountries: S.optional(CountryCodeList),
    IncludeCategories: S.optional(FilterCategoryList),
    ExcludeCategories: S.optional(FilterCategoryList),
    IncludeBusinessChains: S.optional(FilterBusinessChainList),
    ExcludeBusinessChains: S.optional(FilterBusinessChainList),
    IncludeFoodTypes: S.optional(FilterFoodTypeList),
    ExcludeFoodTypes: S.optional(FilterFoodTypeList),
  }),
).annotations({
  identifier: "SearchNearbyFilter",
}) as any as S.Schema<SearchNearbyFilter>;
export interface FilterCircle {
  Center: Position;
  Radius: number;
}
export const FilterCircle = S.suspend(() =>
  S.Struct({ Center: Position, Radius: S.Number }),
).annotations({ identifier: "FilterCircle" }) as any as S.Schema<FilterCircle>;
export interface SearchTextFilter {
  BoundingBox?: BoundingBox;
  Circle?: FilterCircle;
  IncludeCountries?: CountryCodeList;
}
export const SearchTextFilter = S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Circle: S.optional(FilterCircle),
    IncludeCountries: S.optional(CountryCodeList),
  }),
).annotations({
  identifier: "SearchTextFilter",
}) as any as S.Schema<SearchTextFilter>;
export interface SuggestFilter {
  BoundingBox?: BoundingBox;
  Circle?: FilterCircle;
  IncludeCountries?: CountryCodeList;
}
export const SuggestFilter = S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Circle: S.optional(FilterCircle),
    IncludeCountries: S.optional(CountryCodeList),
  }),
).annotations({
  identifier: "SuggestFilter",
}) as any as S.Schema<SuggestFilter>;
export interface GeocodeRequest {
  QueryText?: string;
  QueryComponents?: GeocodeQueryComponents;
  MaxResults?: number;
  BiasPosition?: Position;
  Filter?: GeocodeFilter;
  AdditionalFeatures?: GeocodeAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  Key?: string;
}
export const GeocodeRequest = S.suspend(() =>
  S.Struct({
    QueryText: S.optional(S.String),
    QueryComponents: S.optional(GeocodeQueryComponents),
    MaxResults: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(GeocodeFilter),
    AdditionalFeatures: S.optional(GeocodeAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    IntendedUse: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/geocode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GeocodeRequest",
}) as any as S.Schema<GeocodeRequest>;
export interface ReverseGeocodeRequest {
  QueryPosition: Position;
  QueryRadius?: number;
  MaxResults?: number;
  Filter?: ReverseGeocodeFilter;
  AdditionalFeatures?: ReverseGeocodeAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  Key?: string;
  Heading?: number;
}
export const ReverseGeocodeRequest = S.suspend(() =>
  S.Struct({
    QueryPosition: Position,
    QueryRadius: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(ReverseGeocodeFilter),
    AdditionalFeatures: S.optional(ReverseGeocodeAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    IntendedUse: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
    Heading: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reverse-geocode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ReverseGeocodeRequest",
}) as any as S.Schema<ReverseGeocodeRequest>;
export interface SearchNearbyRequest {
  QueryPosition: Position;
  QueryRadius?: number;
  MaxResults?: number;
  Filter?: SearchNearbyFilter;
  AdditionalFeatures?: SearchNearbyAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  NextToken?: string;
  Key?: string;
}
export const SearchNearbyRequest = S.suspend(() =>
  S.Struct({
    QueryPosition: Position,
    QueryRadius: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(SearchNearbyFilter),
    AdditionalFeatures: S.optional(SearchNearbyAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    IntendedUse: S.optional(S.String),
    NextToken: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/search-nearby" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SearchNearbyRequest",
}) as any as S.Schema<SearchNearbyRequest>;
export interface SearchTextRequest {
  QueryText?: string;
  QueryId?: string;
  MaxResults?: number;
  BiasPosition?: Position;
  Filter?: SearchTextFilter;
  AdditionalFeatures?: SearchTextAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  NextToken?: string;
  Key?: string;
}
export const SearchTextRequest = S.suspend(() =>
  S.Struct({
    QueryText: S.optional(S.String),
    QueryId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(SearchTextFilter),
    AdditionalFeatures: S.optional(SearchTextAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    IntendedUse: S.optional(S.String),
    NextToken: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/search-text" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SearchTextRequest",
}) as any as S.Schema<SearchTextRequest>;
export interface SuggestRequest {
  QueryText: string;
  MaxResults?: number;
  MaxQueryRefinements?: number;
  BiasPosition?: Position;
  Filter?: SuggestFilter;
  AdditionalFeatures?: SuggestAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  Key?: string;
}
export const SuggestRequest = S.suspend(() =>
  S.Struct({
    QueryText: S.String,
    MaxResults: S.optional(S.Number),
    MaxQueryRefinements: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(SuggestFilter),
    AdditionalFeatures: S.optional(SuggestAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    IntendedUse: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/suggest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SuggestRequest",
}) as any as S.Schema<SuggestRequest>;
export type OpeningHoursDisplayList = string[];
export const OpeningHoursDisplayList = S.Array(S.String);
export interface AutocompleteFilter {
  BoundingBox?: BoundingBox;
  Circle?: FilterCircle;
  IncludeCountries?: CountryCodeList;
  IncludePlaceTypes?: AutocompleteFilterPlaceTypeList;
}
export const AutocompleteFilter = S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Circle: S.optional(FilterCircle),
    IncludeCountries: S.optional(CountryCodeList),
    IncludePlaceTypes: S.optional(AutocompleteFilterPlaceTypeList),
  }),
).annotations({
  identifier: "AutocompleteFilter",
}) as any as S.Schema<AutocompleteFilter>;
export interface Category {
  Id: string;
  Name: string;
  LocalizedName?: string;
  Primary?: boolean;
}
export const Category = S.suspend(() =>
  S.Struct({
    Id: S.String,
    Name: S.String,
    LocalizedName: S.optional(S.String),
    Primary: S.optional(S.Boolean),
  }),
).annotations({ identifier: "Category" }) as any as S.Schema<Category>;
export type CategoryList = Category[];
export const CategoryList = S.Array(Category);
export interface FoodType {
  LocalizedName: string;
  Id?: string;
  Primary?: boolean;
}
export const FoodType = S.suspend(() =>
  S.Struct({
    LocalizedName: S.String,
    Id: S.optional(S.String),
    Primary: S.optional(S.Boolean),
  }),
).annotations({ identifier: "FoodType" }) as any as S.Schema<FoodType>;
export type FoodTypeList = FoodType[];
export const FoodTypeList = S.Array(FoodType);
export interface BusinessChain {
  Name?: string;
  Id?: string;
}
export const BusinessChain = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Id: S.optional(S.String) }),
).annotations({
  identifier: "BusinessChain",
}) as any as S.Schema<BusinessChain>;
export type BusinessChainList = BusinessChain[];
export const BusinessChainList = S.Array(BusinessChain);
export interface AccessRestriction {
  Restricted?: boolean;
  Categories?: CategoryList;
}
export const AccessRestriction = S.suspend(() =>
  S.Struct({
    Restricted: S.optional(S.Boolean),
    Categories: S.optional(CategoryList),
  }),
).annotations({
  identifier: "AccessRestriction",
}) as any as S.Schema<AccessRestriction>;
export type AccessRestrictionList = AccessRestriction[];
export const AccessRestrictionList = S.Array(AccessRestriction);
export interface TimeZone {
  Name: string;
  Offset?: string;
  OffsetSeconds?: number;
}
export const TimeZone = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Offset: S.optional(S.String),
    OffsetSeconds: S.optional(S.Number),
  }),
).annotations({ identifier: "TimeZone" }) as any as S.Schema<TimeZone>;
export interface AutocompleteRequest {
  QueryText: string;
  MaxResults?: number;
  BiasPosition?: Position;
  Filter?: AutocompleteFilter;
  PostalCodeMode?: string;
  AdditionalFeatures?: AutocompleteAdditionalFeatureList;
  Language?: string;
  PoliticalView?: string;
  IntendedUse?: string;
  Key?: string;
}
export const AutocompleteRequest = S.suspend(() =>
  S.Struct({
    QueryText: S.String,
    MaxResults: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(AutocompleteFilter),
    PostalCodeMode: S.optional(S.String),
    AdditionalFeatures: S.optional(AutocompleteAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    IntendedUse: S.optional(S.String),
    Key: S.optional(S.String).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/autocomplete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "AutocompleteRequest",
}) as any as S.Schema<AutocompleteRequest>;
export interface UspsZip {
  ZipClassificationCode?: string;
}
export const UspsZip = S.suspend(() =>
  S.Struct({ ZipClassificationCode: S.optional(S.String) }),
).annotations({ identifier: "UspsZip" }) as any as S.Schema<UspsZip>;
export interface UspsZipPlus4 {
  RecordTypeCode?: string;
}
export const UspsZipPlus4 = S.suspend(() =>
  S.Struct({ RecordTypeCode: S.optional(S.String) }),
).annotations({ identifier: "UspsZipPlus4" }) as any as S.Schema<UspsZipPlus4>;
export interface ContactDetails {
  Label?: string;
  Value?: string;
  Categories?: CategoryList;
}
export const ContactDetails = S.suspend(() =>
  S.Struct({
    Label: S.optional(S.String),
    Value: S.optional(S.String),
    Categories: S.optional(CategoryList),
  }),
).annotations({
  identifier: "ContactDetails",
}) as any as S.Schema<ContactDetails>;
export type ContactDetailsList = ContactDetails[];
export const ContactDetailsList = S.Array(ContactDetails);
export interface OpeningHoursComponents {
  OpenTime?: string;
  OpenDuration?: string;
  Recurrence?: string;
}
export const OpeningHoursComponents = S.suspend(() =>
  S.Struct({
    OpenTime: S.optional(S.String),
    OpenDuration: S.optional(S.String),
    Recurrence: S.optional(S.String),
  }),
).annotations({
  identifier: "OpeningHoursComponents",
}) as any as S.Schema<OpeningHoursComponents>;
export type OpeningHoursComponentsList = OpeningHoursComponents[];
export const OpeningHoursComponentsList = S.Array(OpeningHoursComponents);
export interface PhonemeTranscription {
  Value?: string;
  Language?: string;
  Preferred?: boolean;
}
export const PhonemeTranscription = S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Language: S.optional(S.String),
    Preferred: S.optional(S.Boolean),
  }),
).annotations({
  identifier: "PhonemeTranscription",
}) as any as S.Schema<PhonemeTranscription>;
export type PhonemeTranscriptionList = PhonemeTranscription[];
export const PhonemeTranscriptionList = S.Array(PhonemeTranscription);
export interface AddressComponentPhonemes {
  Country?: PhonemeTranscriptionList;
  Region?: PhonemeTranscriptionList;
  SubRegion?: PhonemeTranscriptionList;
  Locality?: PhonemeTranscriptionList;
  District?: PhonemeTranscriptionList;
  SubDistrict?: PhonemeTranscriptionList;
  Block?: PhonemeTranscriptionList;
  SubBlock?: PhonemeTranscriptionList;
  Street?: PhonemeTranscriptionList;
}
export const AddressComponentPhonemes = S.suspend(() =>
  S.Struct({
    Country: S.optional(PhonemeTranscriptionList),
    Region: S.optional(PhonemeTranscriptionList),
    SubRegion: S.optional(PhonemeTranscriptionList),
    Locality: S.optional(PhonemeTranscriptionList),
    District: S.optional(PhonemeTranscriptionList),
    SubDistrict: S.optional(PhonemeTranscriptionList),
    Block: S.optional(PhonemeTranscriptionList),
    SubBlock: S.optional(PhonemeTranscriptionList),
    Street: S.optional(PhonemeTranscriptionList),
  }),
).annotations({
  identifier: "AddressComponentPhonemes",
}) as any as S.Schema<AddressComponentPhonemes>;
export interface PostalCodeDetails {
  PostalCode?: string;
  PostalAuthority?: string;
  PostalCodeType?: string;
  UspsZip?: UspsZip;
  UspsZipPlus4?: UspsZipPlus4;
}
export const PostalCodeDetails = S.suspend(() =>
  S.Struct({
    PostalCode: S.optional(S.String),
    PostalAuthority: S.optional(S.String),
    PostalCodeType: S.optional(S.String),
    UspsZip: S.optional(UspsZip),
    UspsZipPlus4: S.optional(UspsZipPlus4),
  }),
).annotations({
  identifier: "PostalCodeDetails",
}) as any as S.Schema<PostalCodeDetails>;
export type PostalCodeDetailsList = PostalCodeDetails[];
export const PostalCodeDetailsList = S.Array(PostalCodeDetails);
export interface Contacts {
  Phones?: ContactDetailsList;
  Faxes?: ContactDetailsList;
  Websites?: ContactDetailsList;
  Emails?: ContactDetailsList;
}
export const Contacts = S.suspend(() =>
  S.Struct({
    Phones: S.optional(ContactDetailsList),
    Faxes: S.optional(ContactDetailsList),
    Websites: S.optional(ContactDetailsList),
    Emails: S.optional(ContactDetailsList),
  }),
).annotations({ identifier: "Contacts" }) as any as S.Schema<Contacts>;
export interface OpeningHours {
  Display?: OpeningHoursDisplayList;
  OpenNow?: boolean;
  Components?: OpeningHoursComponentsList;
  Categories?: CategoryList;
}
export const OpeningHours = S.suspend(() =>
  S.Struct({
    Display: S.optional(OpeningHoursDisplayList),
    OpenNow: S.optional(S.Boolean),
    Components: S.optional(OpeningHoursComponentsList),
    Categories: S.optional(CategoryList),
  }),
).annotations({ identifier: "OpeningHours" }) as any as S.Schema<OpeningHours>;
export type OpeningHoursList = OpeningHours[];
export const OpeningHoursList = S.Array(OpeningHours);
export interface PhonemeDetails {
  Title?: PhonemeTranscriptionList;
  Address?: AddressComponentPhonemes;
}
export const PhonemeDetails = S.suspend(() =>
  S.Struct({
    Title: S.optional(PhonemeTranscriptionList),
    Address: S.optional(AddressComponentPhonemes),
  }),
).annotations({
  identifier: "PhonemeDetails",
}) as any as S.Schema<PhonemeDetails>;
export interface Intersection {
  PlaceId: string;
  Title: string;
  Address?: Address;
  Position?: Position;
  Distance?: number;
  RouteDistance?: number;
  MapView?: BoundingBox;
  AccessPoints?: AccessPointList;
}
export const Intersection = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    Title: S.String,
    Address: S.optional(Address),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    RouteDistance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    AccessPoints: S.optional(AccessPointList),
  }),
).annotations({ identifier: "Intersection" }) as any as S.Schema<Intersection>;
export type IntersectionList = Intersection[];
export const IntersectionList = S.Array(Intersection);
export interface ReverseGeocodeResultItem {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetailsList;
  Position?: Position;
  Distance?: number;
  MapView?: BoundingBox;
  Categories?: CategoryList;
  FoodTypes?: FoodTypeList;
  AccessPoints?: AccessPointList;
  TimeZone?: TimeZone;
  PoliticalView?: string;
  Intersections?: IntersectionList;
}
export const ReverseGeocodeResultItem = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    PostalCodeDetails: S.optional(PostalCodeDetailsList),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    AccessPoints: S.optional(AccessPointList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(S.String),
    Intersections: S.optional(IntersectionList),
  }),
).annotations({
  identifier: "ReverseGeocodeResultItem",
}) as any as S.Schema<ReverseGeocodeResultItem>;
export type ReverseGeocodeResultItemList = ReverseGeocodeResultItem[];
export const ReverseGeocodeResultItemList = S.Array(ReverseGeocodeResultItem);
export interface SearchNearbyResultItem {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  Position?: Position;
  Distance?: number;
  MapView?: BoundingBox;
  Categories?: CategoryList;
  FoodTypes?: FoodTypeList;
  BusinessChains?: BusinessChainList;
  Contacts?: Contacts;
  OpeningHours?: OpeningHoursList;
  AccessPoints?: AccessPointList;
  AccessRestrictions?: AccessRestrictionList;
  TimeZone?: TimeZone;
  PoliticalView?: string;
  Phonemes?: PhonemeDetails;
}
export const SearchNearbyResultItem = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    Contacts: S.optional(Contacts),
    OpeningHours: S.optional(OpeningHoursList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(S.String),
    Phonemes: S.optional(PhonemeDetails),
  }),
).annotations({
  identifier: "SearchNearbyResultItem",
}) as any as S.Schema<SearchNearbyResultItem>;
export type SearchNearbyResultItemList = SearchNearbyResultItem[];
export const SearchNearbyResultItemList = S.Array(SearchNearbyResultItem);
export interface SearchTextResultItem {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  Position?: Position;
  Distance?: number;
  MapView?: BoundingBox;
  Categories?: CategoryList;
  FoodTypes?: FoodTypeList;
  BusinessChains?: BusinessChainList;
  Contacts?: Contacts;
  OpeningHours?: OpeningHoursList;
  AccessPoints?: AccessPointList;
  AccessRestrictions?: AccessRestrictionList;
  TimeZone?: TimeZone;
  PoliticalView?: string;
  Phonemes?: PhonemeDetails;
}
export const SearchTextResultItem = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    Contacts: S.optional(Contacts),
    OpeningHours: S.optional(OpeningHoursList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(S.String),
    Phonemes: S.optional(PhonemeDetails),
  }),
).annotations({
  identifier: "SearchTextResultItem",
}) as any as S.Schema<SearchTextResultItem>;
export type SearchTextResultItemList = SearchTextResultItem[];
export const SearchTextResultItemList = S.Array(SearchTextResultItem);
export interface QueryRefinement {
  RefinedTerm: string;
  OriginalTerm: string;
  StartIndex: number;
  EndIndex: number;
}
export const QueryRefinement = S.suspend(() =>
  S.Struct({
    RefinedTerm: S.String,
    OriginalTerm: S.String,
    StartIndex: S.Number,
    EndIndex: S.Number,
  }),
).annotations({
  identifier: "QueryRefinement",
}) as any as S.Schema<QueryRefinement>;
export type QueryRefinementList = QueryRefinement[];
export const QueryRefinementList = S.Array(QueryRefinement);
export interface GetPlaceResponse {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  PricingBucket: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetailsList;
  Position?: Position;
  MapView?: BoundingBox;
  Categories?: CategoryList;
  FoodTypes?: FoodTypeList;
  BusinessChains?: BusinessChainList;
  Contacts?: Contacts;
  OpeningHours?: OpeningHoursList;
  AccessPoints?: AccessPointList;
  AccessRestrictions?: AccessRestrictionList;
  TimeZone?: TimeZone;
  PoliticalView?: string;
  Phonemes?: PhonemeDetails;
  MainAddress?: RelatedPlace;
  SecondaryAddresses?: RelatedPlaceList;
}
export const GetPlaceResponse = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    PostalCodeDetails: S.optional(PostalCodeDetailsList),
    Position: S.optional(Position),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    Contacts: S.optional(Contacts),
    OpeningHours: S.optional(OpeningHoursList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(S.String),
    Phonemes: S.optional(PhonemeDetails),
    MainAddress: S.optional(RelatedPlace),
    SecondaryAddresses: S.optional(RelatedPlaceList),
  }),
).annotations({
  identifier: "GetPlaceResponse",
}) as any as S.Schema<GetPlaceResponse>;
export interface ReverseGeocodeResponse {
  PricingBucket: string;
  ResultItems?: ReverseGeocodeResultItemList;
}
export const ReverseGeocodeResponse = S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(ReverseGeocodeResultItemList),
  }),
).annotations({
  identifier: "ReverseGeocodeResponse",
}) as any as S.Schema<ReverseGeocodeResponse>;
export interface SearchNearbyResponse {
  PricingBucket: string;
  ResultItems?: SearchNearbyResultItemList;
  NextToken?: string;
}
export const SearchNearbyResponse = S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(SearchNearbyResultItemList),
    NextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "SearchNearbyResponse",
}) as any as S.Schema<SearchNearbyResponse>;
export interface SearchTextResponse {
  PricingBucket: string;
  ResultItems?: SearchTextResultItemList;
  NextToken?: string;
}
export const SearchTextResponse = S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(SearchTextResultItemList),
    NextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "SearchTextResponse",
}) as any as S.Schema<SearchTextResponse>;
export interface SuggestPlaceResult {
  PlaceId?: string;
  PlaceType?: string;
  Address?: Address;
  Position?: Position;
  Distance?: number;
  MapView?: BoundingBox;
  Categories?: CategoryList;
  FoodTypes?: FoodTypeList;
  BusinessChains?: BusinessChainList;
  AccessPoints?: AccessPointList;
  AccessRestrictions?: AccessRestrictionList;
  TimeZone?: TimeZone;
  PoliticalView?: string;
  Phonemes?: PhonemeDetails;
}
export const SuggestPlaceResult = S.suspend(() =>
  S.Struct({
    PlaceId: S.optional(S.String),
    PlaceType: S.optional(S.String),
    Address: S.optional(Address),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(S.String),
    Phonemes: S.optional(PhonemeDetails),
  }),
).annotations({
  identifier: "SuggestPlaceResult",
}) as any as S.Schema<SuggestPlaceResult>;
export interface SuggestQueryResult {
  QueryId?: string;
  QueryType?: string;
}
export const SuggestQueryResult = S.suspend(() =>
  S.Struct({ QueryId: S.optional(S.String), QueryType: S.optional(S.String) }),
).annotations({
  identifier: "SuggestQueryResult",
}) as any as S.Schema<SuggestQueryResult>;
export interface ParsedQueryComponent {
  StartIndex?: number;
  EndIndex?: number;
  Value?: string;
  QueryComponent?: string;
}
export const ParsedQueryComponent = S.suspend(() =>
  S.Struct({
    StartIndex: S.optional(S.Number),
    EndIndex: S.optional(S.Number),
    Value: S.optional(S.String),
    QueryComponent: S.optional(S.String),
  }),
).annotations({
  identifier: "ParsedQueryComponent",
}) as any as S.Schema<ParsedQueryComponent>;
export type ParsedQueryComponentList = ParsedQueryComponent[];
export const ParsedQueryComponentList = S.Array(ParsedQueryComponent);
export interface Highlight {
  StartIndex?: number;
  EndIndex?: number;
  Value?: string;
}
export const Highlight = S.suspend(() =>
  S.Struct({
    StartIndex: S.optional(S.Number),
    EndIndex: S.optional(S.Number),
    Value: S.optional(S.String),
  }),
).annotations({ identifier: "Highlight" }) as any as S.Schema<Highlight>;
export type HighlightList = Highlight[];
export const HighlightList = S.Array(Highlight);
export interface SuggestAddressHighlights {
  Label?: HighlightList;
}
export const SuggestAddressHighlights = S.suspend(() =>
  S.Struct({ Label: S.optional(HighlightList) }),
).annotations({
  identifier: "SuggestAddressHighlights",
}) as any as S.Schema<SuggestAddressHighlights>;
export type MatchScoreList = number[];
export const MatchScoreList = S.Array(S.Number);
export interface SuggestHighlights {
  Title?: HighlightList;
  Address?: SuggestAddressHighlights;
}
export const SuggestHighlights = S.suspend(() =>
  S.Struct({
    Title: S.optional(HighlightList),
    Address: S.optional(SuggestAddressHighlights),
  }),
).annotations({
  identifier: "SuggestHighlights",
}) as any as S.Schema<SuggestHighlights>;
export type IntersectionHighlightsList = HighlightList[];
export const IntersectionHighlightsList = S.Array(HighlightList);
export interface ParsedQuerySecondaryAddressComponent {
  StartIndex: number;
  EndIndex: number;
  Value: string;
  Number: string;
  Designator: string;
}
export const ParsedQuerySecondaryAddressComponent = S.suspend(() =>
  S.Struct({
    StartIndex: S.Number,
    EndIndex: S.Number,
    Value: S.String,
    Number: S.String,
    Designator: S.String,
  }),
).annotations({
  identifier: "ParsedQuerySecondaryAddressComponent",
}) as any as S.Schema<ParsedQuerySecondaryAddressComponent>;
export type ParsedQuerySecondaryAddressComponentList =
  ParsedQuerySecondaryAddressComponent[];
export const ParsedQuerySecondaryAddressComponentList = S.Array(
  ParsedQuerySecondaryAddressComponent,
);
export interface SuggestResultItem {
  Title: string;
  SuggestResultItemType: string;
  Place?: SuggestPlaceResult;
  Query?: SuggestQueryResult;
  Highlights?: SuggestHighlights;
}
export const SuggestResultItem = S.suspend(() =>
  S.Struct({
    Title: S.String,
    SuggestResultItemType: S.String,
    Place: S.optional(SuggestPlaceResult),
    Query: S.optional(SuggestQueryResult),
    Highlights: S.optional(SuggestHighlights),
  }),
).annotations({
  identifier: "SuggestResultItem",
}) as any as S.Schema<SuggestResultItem>;
export type SuggestResultItemList = SuggestResultItem[];
export const SuggestResultItemList = S.Array(SuggestResultItem);
export interface GeocodeParsedQueryAddressComponents {
  Country?: ParsedQueryComponentList;
  Region?: ParsedQueryComponentList;
  SubRegion?: ParsedQueryComponentList;
  Locality?: ParsedQueryComponentList;
  District?: ParsedQueryComponentList;
  SubDistrict?: ParsedQueryComponentList;
  PostalCode?: ParsedQueryComponentList;
  Block?: ParsedQueryComponentList;
  SubBlock?: ParsedQueryComponentList;
  Street?: ParsedQueryComponentList;
  AddressNumber?: ParsedQueryComponentList;
  Building?: ParsedQueryComponentList;
  SecondaryAddressComponents?: ParsedQuerySecondaryAddressComponentList;
}
export const GeocodeParsedQueryAddressComponents = S.suspend(() =>
  S.Struct({
    Country: S.optional(ParsedQueryComponentList),
    Region: S.optional(ParsedQueryComponentList),
    SubRegion: S.optional(ParsedQueryComponentList),
    Locality: S.optional(ParsedQueryComponentList),
    District: S.optional(ParsedQueryComponentList),
    SubDistrict: S.optional(ParsedQueryComponentList),
    PostalCode: S.optional(ParsedQueryComponentList),
    Block: S.optional(ParsedQueryComponentList),
    SubBlock: S.optional(ParsedQueryComponentList),
    Street: S.optional(ParsedQueryComponentList),
    AddressNumber: S.optional(ParsedQueryComponentList),
    Building: S.optional(ParsedQueryComponentList),
    SecondaryAddressComponents: S.optional(
      ParsedQuerySecondaryAddressComponentList,
    ),
  }),
).annotations({
  identifier: "GeocodeParsedQueryAddressComponents",
}) as any as S.Schema<GeocodeParsedQueryAddressComponents>;
export interface SecondaryAddressComponentMatchScore {
  Number?: number;
}
export const SecondaryAddressComponentMatchScore = S.suspend(() =>
  S.Struct({ Number: S.optional(S.Number) }),
).annotations({
  identifier: "SecondaryAddressComponentMatchScore",
}) as any as S.Schema<SecondaryAddressComponentMatchScore>;
export type SecondaryAddressComponentMatchScoreList =
  SecondaryAddressComponentMatchScore[];
export const SecondaryAddressComponentMatchScoreList = S.Array(
  SecondaryAddressComponentMatchScore,
);
export interface SuggestResponse {
  PricingBucket: string;
  ResultItems?: SuggestResultItemList;
  QueryRefinements?: QueryRefinementList;
}
export const SuggestResponse = S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(SuggestResultItemList),
    QueryRefinements: S.optional(QueryRefinementList),
  }),
).annotations({
  identifier: "SuggestResponse",
}) as any as S.Schema<SuggestResponse>;
export interface GeocodeParsedQuery {
  Title?: ParsedQueryComponentList;
  Address?: GeocodeParsedQueryAddressComponents;
}
export const GeocodeParsedQuery = S.suspend(() =>
  S.Struct({
    Title: S.optional(ParsedQueryComponentList),
    Address: S.optional(GeocodeParsedQueryAddressComponents),
  }),
).annotations({
  identifier: "GeocodeParsedQuery",
}) as any as S.Schema<GeocodeParsedQuery>;
export interface CountryHighlights {
  Code?: HighlightList;
  Name?: HighlightList;
}
export const CountryHighlights = S.suspend(() =>
  S.Struct({
    Code: S.optional(HighlightList),
    Name: S.optional(HighlightList),
  }),
).annotations({
  identifier: "CountryHighlights",
}) as any as S.Schema<CountryHighlights>;
export interface RegionHighlights {
  Code?: HighlightList;
  Name?: HighlightList;
}
export const RegionHighlights = S.suspend(() =>
  S.Struct({
    Code: S.optional(HighlightList),
    Name: S.optional(HighlightList),
  }),
).annotations({
  identifier: "RegionHighlights",
}) as any as S.Schema<RegionHighlights>;
export interface SubRegionHighlights {
  Code?: HighlightList;
  Name?: HighlightList;
}
export const SubRegionHighlights = S.suspend(() =>
  S.Struct({
    Code: S.optional(HighlightList),
    Name: S.optional(HighlightList),
  }),
).annotations({
  identifier: "SubRegionHighlights",
}) as any as S.Schema<SubRegionHighlights>;
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
  Intersection?: MatchScoreList;
  AddressNumber?: number;
  Building?: number;
  SecondaryAddressComponents?: SecondaryAddressComponentMatchScoreList;
}
export const AddressComponentMatchScores = S.suspend(() =>
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
    Intersection: S.optional(MatchScoreList),
    AddressNumber: S.optional(S.Number),
    Building: S.optional(S.Number),
    SecondaryAddressComponents: S.optional(
      SecondaryAddressComponentMatchScoreList,
    ),
  }),
).annotations({
  identifier: "AddressComponentMatchScores",
}) as any as S.Schema<AddressComponentMatchScores>;
export interface AutocompleteAddressHighlights {
  Label?: HighlightList;
  Country?: CountryHighlights;
  Region?: RegionHighlights;
  SubRegion?: SubRegionHighlights;
  Locality?: HighlightList;
  District?: HighlightList;
  SubDistrict?: HighlightList;
  Street?: HighlightList;
  Block?: HighlightList;
  SubBlock?: HighlightList;
  Intersection?: IntersectionHighlightsList;
  PostalCode?: HighlightList;
  AddressNumber?: HighlightList;
  Building?: HighlightList;
}
export const AutocompleteAddressHighlights = S.suspend(() =>
  S.Struct({
    Label: S.optional(HighlightList),
    Country: S.optional(CountryHighlights),
    Region: S.optional(RegionHighlights),
    SubRegion: S.optional(SubRegionHighlights),
    Locality: S.optional(HighlightList),
    District: S.optional(HighlightList),
    SubDistrict: S.optional(HighlightList),
    Street: S.optional(HighlightList),
    Block: S.optional(HighlightList),
    SubBlock: S.optional(HighlightList),
    Intersection: S.optional(IntersectionHighlightsList),
    PostalCode: S.optional(HighlightList),
    AddressNumber: S.optional(HighlightList),
    Building: S.optional(HighlightList),
  }),
).annotations({
  identifier: "AutocompleteAddressHighlights",
}) as any as S.Schema<AutocompleteAddressHighlights>;
export interface ComponentMatchScores {
  Title?: number;
  Address?: AddressComponentMatchScores;
}
export const ComponentMatchScores = S.suspend(() =>
  S.Struct({
    Title: S.optional(S.Number),
    Address: S.optional(AddressComponentMatchScores),
  }),
).annotations({
  identifier: "ComponentMatchScores",
}) as any as S.Schema<ComponentMatchScores>;
export interface AutocompleteHighlights {
  Title?: HighlightList;
  Address?: AutocompleteAddressHighlights;
}
export const AutocompleteHighlights = S.suspend(() =>
  S.Struct({
    Title: S.optional(HighlightList),
    Address: S.optional(AutocompleteAddressHighlights),
  }),
).annotations({
  identifier: "AutocompleteHighlights",
}) as any as S.Schema<AutocompleteHighlights>;
export interface MatchScoreDetails {
  Overall?: number;
  Components?: ComponentMatchScores;
}
export const MatchScoreDetails = S.suspend(() =>
  S.Struct({
    Overall: S.optional(S.Number),
    Components: S.optional(ComponentMatchScores),
  }),
).annotations({
  identifier: "MatchScoreDetails",
}) as any as S.Schema<MatchScoreDetails>;
export interface AutocompleteResultItem {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  Address?: Address;
  Distance?: number;
  Language?: string;
  PoliticalView?: string;
  Highlights?: AutocompleteHighlights;
}
export const AutocompleteResultItem = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    Address: S.optional(Address),
    Distance: S.optional(S.Number),
    Language: S.optional(S.String),
    PoliticalView: S.optional(S.String),
    Highlights: S.optional(AutocompleteHighlights),
  }),
).annotations({
  identifier: "AutocompleteResultItem",
}) as any as S.Schema<AutocompleteResultItem>;
export type AutocompleteResultItemList = AutocompleteResultItem[];
export const AutocompleteResultItemList = S.Array(AutocompleteResultItem);
export interface GeocodeResultItem {
  PlaceId: string;
  PlaceType: string;
  Title: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetailsList;
  Position?: Position;
  Distance?: number;
  MapView?: BoundingBox;
  Categories?: CategoryList;
  FoodTypes?: FoodTypeList;
  AccessPoints?: AccessPointList;
  TimeZone?: TimeZone;
  PoliticalView?: string;
  MatchScores?: MatchScoreDetails;
  ParsedQuery?: GeocodeParsedQuery;
  Intersections?: IntersectionList;
  MainAddress?: RelatedPlace;
  SecondaryAddresses?: RelatedPlaceList;
}
export const GeocodeResultItem = S.suspend(() =>
  S.Struct({
    PlaceId: S.String,
    PlaceType: S.String,
    Title: S.String,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    PostalCodeDetails: S.optional(PostalCodeDetailsList),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    AccessPoints: S.optional(AccessPointList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(S.String),
    MatchScores: S.optional(MatchScoreDetails),
    ParsedQuery: S.optional(GeocodeParsedQuery),
    Intersections: S.optional(IntersectionList),
    MainAddress: S.optional(RelatedPlace),
    SecondaryAddresses: S.optional(RelatedPlaceList),
  }),
).annotations({
  identifier: "GeocodeResultItem",
}) as any as S.Schema<GeocodeResultItem>;
export type GeocodeResultItemList = GeocodeResultItem[];
export const GeocodeResultItemList = S.Array(GeocodeResultItem);
export interface AutocompleteResponse {
  PricingBucket: string;
  ResultItems?: AutocompleteResultItemList;
}
export const AutocompleteResponse = S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(AutocompleteResultItemList),
  }),
).annotations({
  identifier: "AutocompleteResponse",
}) as any as S.Schema<AutocompleteResponse>;
export interface GeocodeResponse {
  PricingBucket: string;
  ResultItems?: GeocodeResultItemList;
}
export const GeocodeResponse = S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(GeocodeResultItemList),
  }),
).annotations({
  identifier: "GeocodeResponse",
}) as any as S.Schema<GeocodeResponse>;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.JsonName("name")),
    Message: S.String.pipe(T.JsonName("message")),
  }),
).annotations({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);

//# Errors
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.String.pipe(T.JsonName("message")) },
) {}
export class InternalServerException extends S.TaggedError<InternalServerException>()(
  "InternalServerException",
  { Message: S.String.pipe(T.JsonName("message")) },
  T.Retryable(),
).pipe(
  ErrorCategory.withCategory(ErrorCategory.ERROR_CATEGORIES.SERVER_ERROR),
) {}
export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.String.pipe(T.JsonName("message")) },
  T.Retryable(),
).pipe(
  ErrorCategory.withCategory(ErrorCategory.ERROR_CATEGORIES.THROTTLING_ERROR),
) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  {
    Message: S.String.pipe(T.JsonName("message")),
    Reason: S.String.pipe(T.JsonName("reason")),
    FieldList: ValidationExceptionFieldList.pipe(T.JsonName("fieldList")),
  },
) {}

//# Operations
/**
 * `GetPlace` finds a place by its unique ID. A `PlaceId` is returned by other place operations.
 *
 * For more information, see GetPlace in the *Amazon Location Service Developer Guide*.
 */
export const getPlace: (
  input: GetPlaceRequest,
) => Effect.Effect<
  GetPlaceResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPlaceRequest,
  output: GetPlaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `Suggest` provides intelligent predictions or recommendations based on the user's input or context, such as relevant places, points of interest, query terms or search category. It is designed to help users find places or point of interests candidates or identify a follow on query based on incomplete or misspelled queries. It returns a list of possible matches or refinements that can be used to formulate a more accurate query. Users can select the most appropriate suggestion and use it for further searching. The API provides options for filtering results by location and other attributes, and allows for additional features like phonemes and timezones. The response includes refined query terms and detailed place information.
 *
 * For more information, see Suggest in the *Amazon Location Service Developer Guide*.
 */
export const suggest: (
  input: SuggestRequest,
) => Effect.Effect<
  SuggestResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SuggestRequest,
  output: SuggestResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `ReverseGeocode` converts geographic coordinates into a human-readable address or place. You can obtain address component, and other related information such as place type, category, street information. The Reverse Geocode API supports filtering to on place type so that you can refine result based on your need. Also, The Reverse Geocode API can also provide additional features such as time zone information and the inclusion of political views.
 *
 * For more information, see Reverse Geocode in the *Amazon Location Service Developer Guide*.
 */
export const reverseGeocode: (
  input: ReverseGeocodeRequest,
) => Effect.Effect<
  ReverseGeocodeResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReverseGeocodeRequest,
  output: ReverseGeocodeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `SearchNearby` queries for points of interest within a radius from a central coordinates, returning place results with optional filters such as categories, business chains, food types and more. The API returns details such as a place name, address, phone, category, food type, contact, opening hours. Also, the API can return phonemes, time zones and more based on requested parameters.
 *
 * For more information, see Search Nearby in the *Amazon Location Service Developer Guide*.
 */
export const searchNearby: (
  input: SearchNearbyRequest,
) => Effect.Effect<
  SearchNearbyResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchNearbyRequest,
  output: SearchNearbyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `SearchText` searches for geocode and place information. You can then complete a follow-up query suggested from the `Suggest` API via a query id.
 *
 * For more information, see Search Text in the *Amazon Location Service Developer Guide*.
 */
export const searchText: (
  input: SearchTextRequest,
) => Effect.Effect<
  SearchTextResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchTextRequest,
  output: SearchTextResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `Autocomplete` completes potential places and addresses as the user types, based on the partial input. The API enhances the efficiency and accuracy of address by completing query based on a few entered keystrokes. It helps you by completing partial queries with valid address completion. Also, the API supports the filtering of results based on geographic location, country, or specific place types, and can be tailored using optional parameters like language and political views.
 *
 * For more information, see Autocomplete in the *Amazon Location Service Developer Guide*.
 */
export const autocomplete: (
  input: AutocompleteRequest,
) => Effect.Effect<
  AutocompleteResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AutocompleteRequest,
  output: AutocompleteResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * `Geocode` converts a textual address or place into geographic coordinates. You can obtain geographic coordinates, address component, and other related information. It supports flexible queries, including free-form text or structured queries with components like street names, postal codes, and regions. The Geocode API can also provide additional features such as time zone information and the inclusion of political views.
 *
 * For more information, see Geocode in the *Amazon Location Service Developer Guide*.
 */
export const geocode: (
  input: GeocodeRequest,
) => Effect.Effect<
  GeocodeResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | Errors.CommonErrors,
  Credentials.Credentials | Rgn.Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GeocodeRequest,
  output: GeocodeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
