// ==========================================================================
// Travel Impact Model API (travelimpactmodel v1)
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
  name: "travelimpactmodel",
  version: "v1",
  rootUrl: "https://travelimpactmodel.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Travelimpactmodel_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Travelimpactmodel_Date: Schema.Schema<Travelimpactmodel_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Travelimpactmodel_Date" }) as any as Schema.Schema<Travelimpactmodel_Date>;

export interface Flight {
  /** Required. IATA airport code for flight origin, e.g. "LHR". */
  origin?: string;
  /** Required. IATA airport code for flight destination, e.g. "JFK". */
  destination?: string;
  /** Required. IATA carrier code, e.g. "AA". */
  operatingCarrierCode?: string;
  /** Required. Flight number, e.g. 324. */
  flightNumber?: number;
  /** Required. Date of the flight in the time zone of the origin airport. Must be a date in the present or future. */
  departureDate?: Travelimpactmodel_Date;
}

export const Flight: Schema.Schema<Flight> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  operatingCarrierCode: Schema.optional(Schema.String),
  flightNumber: Schema.optional(Schema.Number),
  departureDate: Schema.optional(Travelimpactmodel_Date),
})).annotate({ identifier: "Flight" }) as any as Schema.Schema<Flight>;

export interface ComputeFlightEmissionsRequest {
  /** Required. Direct flights to return emission estimates for. */
  flights?: Array<Flight>;
}

export const ComputeFlightEmissionsRequest: Schema.Schema<ComputeFlightEmissionsRequest> = Schema.suspend(() => Schema.Struct({
  flights: Schema.optional(Schema.Array(Flight)),
})).annotate({ identifier: "ComputeFlightEmissionsRequest" }) as any as Schema.Schema<ComputeFlightEmissionsRequest>;

export interface EmissionsGramsPerPax {
  /** Emissions for one passenger in first class in grams. This field is always computed and populated, regardless of whether the aircraft has first class seats or not. */
  first?: number;
  /** Emissions for one passenger in business class in grams. This field is always computed and populated, regardless of whether the aircraft has business class seats or not. */
  business?: number;
  /** Emissions for one passenger in premium economy class in grams. This field is always computed and populated, regardless of whether the aircraft has premium economy class seats or not. */
  premiumEconomy?: number;
  /** Emissions for one passenger in economy class in grams. This field is always computed and populated, regardless of whether the aircraft has economy class seats or not. */
  economy?: number;
}

export const EmissionsGramsPerPax: Schema.Schema<EmissionsGramsPerPax> = Schema.suspend(() => Schema.Struct({
  first: Schema.optional(Schema.Number),
  business: Schema.optional(Schema.Number),
  premiumEconomy: Schema.optional(Schema.Number),
  economy: Schema.optional(Schema.Number),
})).annotate({ identifier: "EmissionsGramsPerPax" }) as any as Schema.Schema<EmissionsGramsPerPax>;

export interface EasaLabelMetadata {
  /** The date when the label was issued. */
  labelIssueDate?: Travelimpactmodel_Date;
  /** The date when the label expires. The label can be displayed until the end of this date. */
  labelExpiryDate?: Travelimpactmodel_Date;
  /** Version of the label. */
  labelVersion?: string;
  /** Sustainable Aviation Fuel (SAF) emissions discount percentage applied to the label. It is a percentage as a decimal. The values are in the interval [0,1]. For example, 0.0021 means 0.21%. This discount and reduction in emissions are reported by the EASA label but they are not included in the CO2e estimates distributed by this API. */
  safDiscountPercentage?: number;
}

export const EasaLabelMetadata: Schema.Schema<EasaLabelMetadata> = Schema.suspend(() => Schema.Struct({
  labelIssueDate: Schema.optional(Travelimpactmodel_Date),
  labelExpiryDate: Schema.optional(Travelimpactmodel_Date),
  labelVersion: Schema.optional(Schema.String),
  safDiscountPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "EasaLabelMetadata" }) as any as Schema.Schema<EasaLabelMetadata>;

export interface FlightWithEmissions {
  /** Required. Matches the flight identifiers in the request. Note: all IATA codes are capitalized. */
  flight?: Flight;
  /** Optional. The source of the emissions data. */
  source?: "SOURCE_UNSPECIFIED" | "TIM" | "EASA" | (string & {});
  /** Optional. Per-passenger emission estimate numbers. Will not be present if emissions could not be computed. For the list of reasons why emissions could not be computed, see ComputeFlightEmissions. */
  emissionsGramsPerPax?: EmissionsGramsPerPax;
  /** Optional. Metadata about the EASA Flight Emissions Label. Only set when the emissions data source is EASA. */
  easaLabelMetadata?: EasaLabelMetadata;
  /** Optional. The significance of contrails warming impact compared to the total CO2e emissions impact. */
  contrailsImpactBucket?: "CONTRAILS_IMPACT_UNSPECIFIED" | "CONTRAILS_IMPACT_NEGLIGIBLE" | "CONTRAILS_IMPACT_MODERATE" | "CONTRAILS_IMPACT_SEVERE" | (string & {});
}

export const FlightWithEmissions: Schema.Schema<FlightWithEmissions> = Schema.suspend(() => Schema.Struct({
  flight: Schema.optional(Flight),
  source: Schema.optional(Schema.String),
  emissionsGramsPerPax: Schema.optional(EmissionsGramsPerPax),
  easaLabelMetadata: Schema.optional(EasaLabelMetadata),
  contrailsImpactBucket: Schema.optional(Schema.String),
})).annotate({ identifier: "FlightWithEmissions" }) as any as Schema.Schema<FlightWithEmissions>;

export interface ModelVersion {
  /** Major versions: Major changes to methodology (e.g. adding new data sources to the model that lead to major output changes). Such changes will be infrequent and announced well in advance. Might involve API version changes, which will respect [Google Cloud API guidelines](https://cloud.google.com/endpoints/docs/openapi/versioning-an-api#backwards-incompatible) */
  major?: number;
  /** Minor versions: Changes to the model that, while being consistent across schema versions, change the model parameters or implementation. */
  minor?: number;
  /** Patch versions: Implementation changes meant to address bugs or inaccuracies in the model implementation. */
  patch?: number;
  /** Dated versions: Model datasets are recreated with refreshed input data but no change to the algorithms regularly. */
  dated?: string;
}

export const ModelVersion: Schema.Schema<ModelVersion> = Schema.suspend(() => Schema.Struct({
  major: Schema.optional(Schema.Number),
  minor: Schema.optional(Schema.Number),
  patch: Schema.optional(Schema.Number),
  dated: Schema.optional(Schema.String),
})).annotate({ identifier: "ModelVersion" }) as any as Schema.Schema<ModelVersion>;

export interface ComputeFlightEmissionsResponse {
  /** List of flight legs with emission estimates. */
  flightEmissions?: Array<FlightWithEmissions>;
  /** The model version under which emission estimates for all flights in this response were computed. */
  modelVersion?: ModelVersion;
}

export const ComputeFlightEmissionsResponse: Schema.Schema<ComputeFlightEmissionsResponse> = Schema.suspend(() => Schema.Struct({
  flightEmissions: Schema.optional(Schema.Array(FlightWithEmissions)),
  modelVersion: Schema.optional(ModelVersion),
})).annotate({ identifier: "ComputeFlightEmissionsResponse" }) as any as Schema.Schema<ComputeFlightEmissionsResponse>;

export interface Market {
  /** Required. IATA airport code for flight origin, e.g. "LHR". */
  origin?: string;
  /** Required. IATA airport code for flight destination, e.g. "JFK". */
  destination?: string;
}

export const Market: Schema.Schema<Market> = Schema.suspend(() => Schema.Struct({
  origin: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "Market" }) as any as Schema.Schema<Market>;

export interface ComputeTypicalFlightEmissionsRequest {
  /** Required. Request the typical flight emissions estimates for this market pair. A maximum of 1000 markets can be requested. */
  markets?: Array<Market>;
}

export const ComputeTypicalFlightEmissionsRequest: Schema.Schema<ComputeTypicalFlightEmissionsRequest> = Schema.suspend(() => Schema.Struct({
  markets: Schema.optional(Schema.Array(Market)),
})).annotate({ identifier: "ComputeTypicalFlightEmissionsRequest" }) as any as Schema.Schema<ComputeTypicalFlightEmissionsRequest>;

export interface TypicalFlightEmissions {
  /** Required. Matches the flight identifiers in the request. Note: all IATA codes are capitalized. */
  market?: Market;
  /** Optional. Typical flight emissions per passenger for requested market. Will not be present if a typical emissions could not be computed. For the list of reasons why typical flight emissions could not be computed, see [GitHub](https://github.com/google/travel-impact-model/blob/main/projects/typical_flight_emissions.md#step-7-validate-dataset). */
  emissionsGramsPerPax?: EmissionsGramsPerPax;
}

export const TypicalFlightEmissions: Schema.Schema<TypicalFlightEmissions> = Schema.suspend(() => Schema.Struct({
  market: Schema.optional(Market),
  emissionsGramsPerPax: Schema.optional(EmissionsGramsPerPax),
})).annotate({ identifier: "TypicalFlightEmissions" }) as any as Schema.Schema<TypicalFlightEmissions>;

export interface ComputeTypicalFlightEmissionsResponse {
  /** Market's Typical Flight Emissions requested. */
  typicalFlightEmissions?: Array<TypicalFlightEmissions>;
  /** The model version under which typical flight emission estimates for all flights in this response were computed. */
  modelVersion?: ModelVersion;
}

export const ComputeTypicalFlightEmissionsResponse: Schema.Schema<ComputeTypicalFlightEmissionsResponse> = Schema.suspend(() => Schema.Struct({
  typicalFlightEmissions: Schema.optional(Schema.Array(TypicalFlightEmissions)),
  modelVersion: Schema.optional(ModelVersion),
})).annotate({ identifier: "ComputeTypicalFlightEmissionsResponse" }) as any as Schema.Schema<ComputeTypicalFlightEmissionsResponse>;

export interface Scope3FlightSegment {
  /** Required. Date of the flight in the time zone of the origin airport. Only year is required for typical flight and distance-based emissions models (month and day values are ignored and therefore, can be either omitted, set to 0, or set to a valid date for those cases). Correspondingly, if a specific date is not provided for TIM emissions, we will fallback to typical flight (or distance-based) emissions. */
  departureDate?: Travelimpactmodel_Date;
  /** Required. The cabin class of the flight. */
  cabinClass?: "CABIN_CLASS_UNSPECIFIED" | "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST" | (string & {});
  /** Optional. 3-character [IATA airport code](https://www.iata.org/en/publications/directories/code-search/) for flight origin, e.g. `YVR`. This is used to match specific flight if provided alongside destination, carrier, and flight number. If there is no match, we will first try to match the flight to a typical flight between the provided origin and destination airports. Otherwise, we will use the distance-based emissions model if the flight distance is provided. */
  origin?: string;
  /** Optional. 3-character [IATA airport code](https://www.iata.org/en/publications/directories/code-search/) for flight destination, e.g. `ICN`. This is used to match specific flight if provided alongside origin, carrier, and flight number. If there is no match, we will first try to match the flight to a typical flight between the provided origin and destination airports. Otherwise, we will use the distance-based emissions model if the flight distance is provided. */
  destination?: string;
  /** Optional. 2-character [IATA carrier code](https://www.iata.org/en/publications/directories/code-search/), e.g. `KE`. This is required if specific flight matching is desired. Otherwise, this is unused for typical flight and distance-based emissions models. This could be both operating and marketing carrier code (i.e. codeshare is covered). */
  carrierCode?: string;
  /** Optional. Up to 4-digit [flight number](https://en.wikipedia.org/wiki/Flight_number), e.g. `71`, from [1, 9999]. This is first used to match a specific flight if a flight number is specified alongside origin, destination, and carrier. If a flight number is not specified, we will first try to match the flight to a typical flight between the provided origin and destination airports. If that fails and/or origin & destination are not provided, we will use the distance-based emissions model based on the flight distance provided. */
  flightNumber?: number;
  /** Optional. Distance in kilometers, e.g. `2423`, from [1, 2.5e16) km. This is used to match a flight to distance-based emissions when origin and destination are not provided or there are no matching typical flights. */
  distanceKm?: string;
}

export const Scope3FlightSegment: Schema.Schema<Scope3FlightSegment> = Schema.suspend(() => Schema.Struct({
  departureDate: Schema.optional(Travelimpactmodel_Date),
  cabinClass: Schema.optional(Schema.String),
  origin: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  carrierCode: Schema.optional(Schema.String),
  flightNumber: Schema.optional(Schema.Number),
  distanceKm: Schema.optional(Schema.String),
})).annotate({ identifier: "Scope3FlightSegment" }) as any as Schema.Schema<Scope3FlightSegment>;

export interface ComputeScope3FlightEmissionsRequest {
  /** Required. Flights to return emission estimates for. */
  flights?: Array<Scope3FlightSegment>;
  /** Optional. The model version under which emission estimates for all flights in this request were computed. */
  modelVersion?: ModelVersion;
}

export const ComputeScope3FlightEmissionsRequest: Schema.Schema<ComputeScope3FlightEmissionsRequest> = Schema.suspend(() => Schema.Struct({
  flights: Schema.optional(Schema.Array(Scope3FlightSegment)),
  modelVersion: Schema.optional(ModelVersion),
})).annotate({ identifier: "ComputeScope3FlightEmissionsRequest" }) as any as Schema.Schema<ComputeScope3FlightEmissionsRequest>;

export interface Scope3FlightEmissions {
  /** Required. Matches the flight identifiers in the request. */
  flight?: Scope3FlightSegment;
  /** Optional. Total flight emissions (sum of well-to-tank and tank-to-wake) per passenger based on the requested info. This is the total emissions and unless you have specific reasons for using TTW or WTT emissions, you should use this number. */
  wtwEmissionsGramsPerPax?: string;
  /** Optional. Tank-to-wake flight emissions per passenger based on the requested info. */
  ttwEmissionsGramsPerPax?: string;
  /** Optional. Well-to-tank flight emissions per passenger based on the requested info. */
  wttEmissionsGramsPerPax?: string;
  /** Optional. The source of the emissions data. */
  source?: "SCOPE3_DATA_TYPE_UNSPECIFIED" | "TIM_EMISSIONS" | "TYPICAL_FLIGHT_EMISSIONS" | "DISTANCE_BASED_EMISSIONS" | (string & {});
}

export const Scope3FlightEmissions: Schema.Schema<Scope3FlightEmissions> = Schema.suspend(() => Schema.Struct({
  flight: Schema.optional(Scope3FlightSegment),
  wtwEmissionsGramsPerPax: Schema.optional(Schema.String),
  ttwEmissionsGramsPerPax: Schema.optional(Schema.String),
  wttEmissionsGramsPerPax: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "Scope3FlightEmissions" }) as any as Schema.Schema<Scope3FlightEmissions>;

export interface ComputeScope3FlightEmissionsResponse {
  /** List of flight segments with emission estimates. */
  flightEmissions?: Array<Scope3FlightEmissions>;
  /** The model version under which emission estimates for all flights in this response were computed. */
  modelVersion?: ModelVersion;
}

export const ComputeScope3FlightEmissionsResponse: Schema.Schema<ComputeScope3FlightEmissionsResponse> = Schema.suspend(() => Schema.Struct({
  flightEmissions: Schema.optional(Schema.Array(Scope3FlightEmissions)),
  modelVersion: Schema.optional(ModelVersion),
})).annotate({ identifier: "ComputeScope3FlightEmissionsResponse" }) as any as Schema.Schema<ComputeScope3FlightEmissionsResponse>;

export interface McpToolDataHandlingProfile {
  /** // The data access level of the tool's inputs. */
  inputDataAccessLevel?: "DATA_ACCESS_LEVEL_UNSPECIFIED" | "DATA_ACCESS_LEVEL_PUBLIC" | "DATA_ACCESS_LEVEL_CONFIDENTIAL" | "DATA_ACCESS_LEVEL_NEED_TO_KNOW" | "DATA_ACCESS_LEVEL_PII" | "DATA_ACCESS_LEVEL_USER" | "DATA_ACCESS_LEVEL_NO_DATA_ACCESS" | (string & {});
  /** The data access level of the tool's outputs. */
  outputDataAccessLevel?: "DATA_ACCESS_LEVEL_UNSPECIFIED" | "DATA_ACCESS_LEVEL_PUBLIC" | "DATA_ACCESS_LEVEL_CONFIDENTIAL" | "DATA_ACCESS_LEVEL_NEED_TO_KNOW" | "DATA_ACCESS_LEVEL_PII" | "DATA_ACCESS_LEVEL_USER" | "DATA_ACCESS_LEVEL_NO_DATA_ACCESS" | (string & {});
}

export const McpToolDataHandlingProfile: Schema.Schema<McpToolDataHandlingProfile> = Schema.suspend(() => Schema.Struct({
  inputDataAccessLevel: Schema.optional(Schema.String),
  outputDataAccessLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "McpToolDataHandlingProfile" }) as any as Schema.Schema<McpToolDataHandlingProfile>;

export interface McpToolLifecycleProfile {
  /** Output only. The current launch state of the MCP tool. */
  launchState?: "LAUNCH_STATE_UNSPECIFIED" | "LAUNCH_STATE_DEVELOPMENT" | "LAUNCH_STATE_PRODUCTION_PREVIEW" | "LAUNCH_STATE_GENERAL_AVAILABILITY" | (string & {});
}

export const McpToolLifecycleProfile: Schema.Schema<McpToolLifecycleProfile> = Schema.suspend(() => Schema.Struct({
  launchState: Schema.optional(Schema.String),
})).annotate({ identifier: "McpToolLifecycleProfile" }) as any as Schema.Schema<McpToolLifecycleProfile>;

// ==========================================================================
// Operations
// ==========================================================================

/** Stateless method to retrieve emission estimates. Details on how emission estimates are computed are in [GitHub](https://github.com/google/travel-impact-model) The response will contain all entries that match the input flight legs, in the same order. If there are no estimates available for a certain flight leg, the response will return the flight leg object with empty emission fields. The request will still be considered successful. Reasons for missing emission estimates include: * The flight is unknown to the server. * The input flight leg is missing one or more identifiers. * The flight date is in the past. * The aircraft type is not supported by the model. * Missing seat configuration. The request can contain up to 1000 flight legs. If the request has more than 1000 direct flights, if will fail with an INVALID_ARGUMENT error. */
export interface ComputeFlightEmissionsFlightsRequest {
  /** Request body */
  body?: ComputeFlightEmissionsRequest;
}

export const ComputeFlightEmissionsFlightsRequest = Schema.Struct({
  body: Schema.optional(ComputeFlightEmissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/flights:computeFlightEmissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeFlightEmissionsFlightsRequest>;

export type ComputeFlightEmissionsFlightsResponse = ComputeFlightEmissionsResponse;
export const ComputeFlightEmissionsFlightsResponse = ComputeFlightEmissionsResponse;

export type ComputeFlightEmissionsFlightsError = CommonErrors;

export const computeFlightEmissionsFlights: API.OperationMethod<ComputeFlightEmissionsFlightsRequest, ComputeFlightEmissionsFlightsResponse, ComputeFlightEmissionsFlightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeFlightEmissionsFlightsRequest,
  output: ComputeFlightEmissionsFlightsResponse,
  errors: [],
}));

/** Retrieves typical flight emissions estimates between two airports, also known as a market. If there are no estimates available for a certain market, the response will return the market object with empty emission fields. The request will still be considered successful. Details on how the typical emissions estimates are computed are on [GitHub](https://github.com/google/travel-impact-model/blob/main/projects/typical_flight_emissions.md). The request can contain up to 1000 markets. If the request has more than 1000 markets, it will fail with an INVALID_ARGUMENT error. */
export interface ComputeTypicalFlightEmissionsFlightsRequest {
  /** Request body */
  body?: ComputeTypicalFlightEmissionsRequest;
}

export const ComputeTypicalFlightEmissionsFlightsRequest = Schema.Struct({
  body: Schema.optional(ComputeTypicalFlightEmissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/flights:computeTypicalFlightEmissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeTypicalFlightEmissionsFlightsRequest>;

export type ComputeTypicalFlightEmissionsFlightsResponse = ComputeTypicalFlightEmissionsResponse;
export const ComputeTypicalFlightEmissionsFlightsResponse = ComputeTypicalFlightEmissionsResponse;

export type ComputeTypicalFlightEmissionsFlightsError = CommonErrors;

export const computeTypicalFlightEmissionsFlights: API.OperationMethod<ComputeTypicalFlightEmissionsFlightsRequest, ComputeTypicalFlightEmissionsFlightsResponse, ComputeTypicalFlightEmissionsFlightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeTypicalFlightEmissionsFlightsRequest,
  output: ComputeTypicalFlightEmissionsFlightsResponse,
  errors: [],
}));

/** Stateless method to retrieve GHG emissions estimates for a set of flight segments for Scope 3 reporting. The response will contain all entries that match the input Scope3FlightSegment flight segments, in the same order provided. The estimates will be computed using the following cascading logic (using the first one that is available): 1. TIM-based emissions given origin, destination, carrier, flightNumber, departureDate, and cabinClass. 2. Typical flight emissions given origin, destination, year in departureDate, and cabinClass. 3. Distance-based emissions calculated using distanceKm, year in departureDate, and cabinClass. If there is a future flight requested in this calendar year, we do not support Tier 1 emissions and will fallback to Tier 2 or 3 emissions. If the requested future flight is in not in this calendar year, we will return an empty response. We recommend that for future flights, computeFlightEmissions API is used instead. If there are no estimates available for a certain flight with any of the three methods, the response will return a Scope3FlightEmissions object with empty emission fields. The request will still be considered successful. Generally, missing emissions estimates occur when the flight is unknown to the server (e.g. no specific flight exists, or typical flight emissions are not available for the requested pair). The request will fail with an `INVALID_ARGUMENT` error if: * The request contains more than 1,000 flight legs. * The input flight leg is missing one or more identifiers. For example, missing origin/destination without a valid distance for TIM_EMISSIONS or TYPICAL_FLIGHT_EMISSIONS type matching, or missing distance for a DISTANCE_BASED_EMISSIONS type matching (if you want to fallback to distance-based emissions or want a distance-based emissions estimate, you need to specify a distance). * The flight date is before 2019 (Scope 3 data is only available for 2019 and after). * The flight distance is 0 or lower. * Missing cabin class. Because the request is processed with fallback logic, it is possible that misconfigured requests return valid emissions estimates using fallback methods. For example, if a request has the wrong flight number but specifies the origin and destination, the request will still succeed, but the returned emissions will be based solely on the typical flight emissions. Similarly, if a request is missing the origin for a typical flight emissions request, but specifies a valid distance, the request could succeed based solely on the distance-based emissions. Consequently, one should check the source of the returned emissions (source) to confirm the results are as expected. */
export interface ComputeScope3FlightEmissionsFlightsRequest {
  /** Request body */
  body?: ComputeScope3FlightEmissionsRequest;
}

export const ComputeScope3FlightEmissionsFlightsRequest = Schema.Struct({
  body: Schema.optional(ComputeScope3FlightEmissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/flights:computeScope3FlightEmissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeScope3FlightEmissionsFlightsRequest>;

export type ComputeScope3FlightEmissionsFlightsResponse = ComputeScope3FlightEmissionsResponse;
export const ComputeScope3FlightEmissionsFlightsResponse = ComputeScope3FlightEmissionsResponse;

export type ComputeScope3FlightEmissionsFlightsError = CommonErrors;

export const computeScope3FlightEmissionsFlights: API.OperationMethod<ComputeScope3FlightEmissionsFlightsRequest, ComputeScope3FlightEmissionsFlightsResponse, ComputeScope3FlightEmissionsFlightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeScope3FlightEmissionsFlightsRequest,
  output: ComputeScope3FlightEmissionsFlightsResponse,
  errors: [],
}));

