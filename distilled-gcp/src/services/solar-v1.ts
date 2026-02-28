// ==========================================================================
// Solar API (solar v1)
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
  name: "solar",
  version: "v1",
  rootUrl: "https://solar.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface LatLngBox {
  /** The southwest corner of the box. */
  sw?: LatLng;
  /** The northeast corner of the box. */
  ne?: LatLng;
}

export const LatLngBox: Schema.Schema<LatLngBox> = Schema.suspend(() => Schema.Struct({
  sw: Schema.optional(LatLng),
  ne: Schema.optional(LatLng),
})).annotate({ identifier: "LatLngBox" }) as any as Schema.Schema<LatLngBox>;

export interface Solar_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Solar_Date: Schema.Schema<Solar_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Solar_Date" }) as any as Schema.Schema<Solar_Date>;

export interface SizeAndSunshineStats {
  /** The area of the roof or roof segment, in m^2. This is the roof area (accounting for tilt), not the ground footprint area. */
  areaMeters2?: number;
  /** Quantiles of the pointwise sunniness across the area. If there are N values here, this represents the (N-1)-iles. For example, if there are 5 values, then they would be the quartiles (min, 25%, 50%, 75%, max). Values are in annual kWh/kW like max_sunshine_hours_per_year. */
  sunshineQuantiles?: Array<number>;
  /** The ground footprint area covered by the roof or roof segment, in m^2. */
  groundAreaMeters2?: number;
}

export const SizeAndSunshineStats: Schema.Schema<SizeAndSunshineStats> = Schema.suspend(() => Schema.Struct({
  areaMeters2: Schema.optional(Schema.Number),
  sunshineQuantiles: Schema.optional(Schema.Array(Schema.Number)),
  groundAreaMeters2: Schema.optional(Schema.Number),
})).annotate({ identifier: "SizeAndSunshineStats" }) as any as Schema.Schema<SizeAndSunshineStats>;

export interface RoofSegmentSizeAndSunshineStats {
  /** Angle of the roof segment relative to the theoretical ground plane. 0 = parallel to the ground, 90 = perpendicular to the ground. */
  pitchDegrees?: number;
  /** Compass direction the roof segment is pointing in. 0 = North, 90 = East, 180 = South. For a "flat" roof segment (`pitch_degrees` very near 0), azimuth is not well defined, so for consistency, we define it arbitrarily to be 0 (North). */
  azimuthDegrees?: number;
  /** Total size and sunlight quantiles for the roof segment. */
  stats?: SizeAndSunshineStats;
  /** A point near the center of the roof segment. */
  center?: LatLng;
  /** The bounding box of the roof segment. */
  boundingBox?: LatLngBox;
  /** The height of the roof segment plane, in meters above sea level, at the point designated by `center`. Together with the pitch, azimuth, and center location, this fully defines the roof segment plane. */
  planeHeightAtCenterMeters?: number;
}

export const RoofSegmentSizeAndSunshineStats: Schema.Schema<RoofSegmentSizeAndSunshineStats> = Schema.suspend(() => Schema.Struct({
  pitchDegrees: Schema.optional(Schema.Number),
  azimuthDegrees: Schema.optional(Schema.Number),
  stats: Schema.optional(SizeAndSunshineStats),
  center: Schema.optional(LatLng),
  boundingBox: Schema.optional(LatLngBox),
  planeHeightAtCenterMeters: Schema.optional(Schema.Number),
})).annotate({ identifier: "RoofSegmentSizeAndSunshineStats" }) as any as Schema.Schema<RoofSegmentSizeAndSunshineStats>;

export interface SolarPanel {
  /** The centre of the panel. */
  center?: LatLng;
  /** The orientation of the panel. */
  orientation?: "SOLAR_PANEL_ORIENTATION_UNSPECIFIED" | "LANDSCAPE" | "PORTRAIT" | (string & {});
  /** How much sunlight energy this layout captures over the course of a year, in DC kWh. */
  yearlyEnergyDcKwh?: number;
  /** Index in roof_segment_stats of the `RoofSegmentSizeAndSunshineStats` which corresponds to the roof segment that this panel is placed on. */
  segmentIndex?: number;
}

export const SolarPanel: Schema.Schema<SolarPanel> = Schema.suspend(() => Schema.Struct({
  center: Schema.optional(LatLng),
  orientation: Schema.optional(Schema.String),
  yearlyEnergyDcKwh: Schema.optional(Schema.Number),
  segmentIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "SolarPanel" }) as any as Schema.Schema<SolarPanel>;

export interface RoofSegmentSummary {
  /** Angle of the roof segment relative to the theoretical ground plane. 0 = parallel to the ground, 90 = perpendicular to the ground. */
  pitchDegrees?: number;
  /** Compass direction the roof segment is pointing in. 0 = North, 90 = East, 180 = South. For a "flat" roof segment (`pitch_degrees` very near 0), azimuth is not well defined, so for consistency, we define it arbitrarily to be 0 (North). */
  azimuthDegrees?: number;
  /** The total number of panels on this segment. */
  panelsCount?: number;
  /** How much sunlight energy this part of the layout captures over the course of a year, in DC kWh, assuming the panels described above. */
  yearlyEnergyDcKwh?: number;
  /** Index in roof_segment_stats of the corresponding `RoofSegmentSizeAndSunshineStats`. */
  segmentIndex?: number;
}

export const RoofSegmentSummary: Schema.Schema<RoofSegmentSummary> = Schema.suspend(() => Schema.Struct({
  pitchDegrees: Schema.optional(Schema.Number),
  azimuthDegrees: Schema.optional(Schema.Number),
  panelsCount: Schema.optional(Schema.Number),
  yearlyEnergyDcKwh: Schema.optional(Schema.Number),
  segmentIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "RoofSegmentSummary" }) as any as Schema.Schema<RoofSegmentSummary>;

export interface SolarPanelConfig {
  /** Total number of panels. Note that this is redundant to (the sum of) the corresponding fields in roof_segment_summaries. */
  panelsCount?: number;
  /** How much sunlight energy this layout captures over the course of a year, in DC kWh, assuming the panels described above. */
  yearlyEnergyDcKwh?: number;
  /** Information about the production of each roof segment that is carrying at least one panel in this layout. `roof_segment_summaries[i]` describes the i-th roof segment, including its size, expected production and orientation. */
  roofSegmentSummaries?: Array<RoofSegmentSummary>;
}

export const SolarPanelConfig: Schema.Schema<SolarPanelConfig> = Schema.suspend(() => Schema.Struct({
  panelsCount: Schema.optional(Schema.Number),
  yearlyEnergyDcKwh: Schema.optional(Schema.Number),
  roofSegmentSummaries: Schema.optional(Schema.Array(RoofSegmentSummary)),
})).annotate({ identifier: "SolarPanelConfig" }) as any as Schema.Schema<SolarPanelConfig>;

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

export interface FinancialDetails {
  /** How many AC kWh we think the solar panels will generate in their first year. */
  initialAcKwhPerYear?: number;
  /** Utility bill for electricity not produced by solar, for the lifetime of the panels. */
  remainingLifetimeUtilityBill?: Money;
  /** Amount of money available from federal incentives; this applies if the user buys (with or without a loan) the panels. */
  federalIncentive?: Money;
  /** Amount of money available from state incentives; this applies if the user buys (with or without a loan) the panels. */
  stateIncentive?: Money;
  /** Amount of money available from utility incentives; this applies if the user buys (with or without a loan) the panels. */
  utilityIncentive?: Money;
  /** Amount of money the user will receive from Solar Renewable Energy Credits over the panel lifetime; this applies if the user buys (with or without a loan) the panels. */
  lifetimeSrecTotal?: Money;
  /** Total cost of electricity the user would have paid over the lifetime period if they didn't install solar. */
  costOfElectricityWithoutSolar?: Money;
  /** Whether net metering is allowed. */
  netMeteringAllowed?: boolean;
  /** Percentage (0-100) of the user's power supplied by solar. Valid for the first year but approximately correct for future years. */
  solarPercentage?: number;
  /** The percentage (0-100) of solar electricity production we assumed was exported to the grid, based on the first quarter of production. This affects the calculations if net metering is not allowed. */
  percentageExportedToGrid?: number;
}

export const FinancialDetails: Schema.Schema<FinancialDetails> = Schema.suspend(() => Schema.Struct({
  initialAcKwhPerYear: Schema.optional(Schema.Number),
  remainingLifetimeUtilityBill: Schema.optional(Money),
  federalIncentive: Schema.optional(Money),
  stateIncentive: Schema.optional(Money),
  utilityIncentive: Schema.optional(Money),
  lifetimeSrecTotal: Schema.optional(Money),
  costOfElectricityWithoutSolar: Schema.optional(Money),
  netMeteringAllowed: Schema.optional(Schema.Boolean),
  solarPercentage: Schema.optional(Schema.Number),
  percentageExportedToGrid: Schema.optional(Schema.Number),
})).annotate({ identifier: "FinancialDetails" }) as any as Schema.Schema<FinancialDetails>;

export interface SavingsOverTime {
  /** Savings in the first year after panel installation. */
  savingsYear1?: Money;
  /** Savings in the first twenty years after panel installation. */
  savingsYear20?: Money;
  /** Using the assumed discount rate, what is the present value of the cumulative 20-year savings? */
  presentValueOfSavingsYear20?: Money;
  /** Savings in the entire panel lifetime. */
  savingsLifetime?: Money;
  /** Using the assumed discount rate, what is the present value of the cumulative lifetime savings? */
  presentValueOfSavingsLifetime?: Money;
  /** Indicates whether this scenario is financially viable. Will be false for scenarios with poor financial viability (e.g., money-losing). */
  financiallyViable?: boolean;
}

export const SavingsOverTime: Schema.Schema<SavingsOverTime> = Schema.suspend(() => Schema.Struct({
  savingsYear1: Schema.optional(Money),
  savingsYear20: Schema.optional(Money),
  presentValueOfSavingsYear20: Schema.optional(Money),
  savingsLifetime: Schema.optional(Money),
  presentValueOfSavingsLifetime: Schema.optional(Money),
  financiallyViable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SavingsOverTime" }) as any as Schema.Schema<SavingsOverTime>;

export interface LeasingSavings {
  /** Whether leases are allowed in this juristiction (leases are not allowed in some states). If this field is false, then the values in this message should probably be ignored. */
  leasesAllowed?: boolean;
  /** Whether leases are supported in this juristiction by the financial calculation engine. If this field is false, then the values in this message should probably be ignored. This is independent of `leases_allowed`: in some areas leases are allowed, but under conditions that aren't handled by the financial models. */
  leasesSupported?: boolean;
  /** Estimated annual leasing cost. */
  annualLeasingCost?: Money;
  /** How much is saved (or not) over the lifetime period. */
  savings?: SavingsOverTime;
}

export const LeasingSavings: Schema.Schema<LeasingSavings> = Schema.suspend(() => Schema.Struct({
  leasesAllowed: Schema.optional(Schema.Boolean),
  leasesSupported: Schema.optional(Schema.Boolean),
  annualLeasingCost: Schema.optional(Money),
  savings: Schema.optional(SavingsOverTime),
})).annotate({ identifier: "LeasingSavings" }) as any as Schema.Schema<LeasingSavings>;

export interface CashPurchaseSavings {
  /** Initial cost before tax incentives: the amount that must be paid out-of-pocket. Contrast with `upfront_cost`, which is after tax incentives. */
  outOfPocketCost?: Money;
  /** Initial cost after tax incentives: it's the amount that must be paid during first year. Contrast with `out_of_pocket_cost`, which is before tax incentives. */
  upfrontCost?: Money;
  /** The value of all tax rebates. */
  rebateValue?: Money;
  /** Number of years until payback occurs. A negative value means payback never occurs within the lifetime period. */
  paybackYears?: number;
  /** How much is saved (or not) over the lifetime period. */
  savings?: SavingsOverTime;
}

export const CashPurchaseSavings: Schema.Schema<CashPurchaseSavings> = Schema.suspend(() => Schema.Struct({
  outOfPocketCost: Schema.optional(Money),
  upfrontCost: Schema.optional(Money),
  rebateValue: Schema.optional(Money),
  paybackYears: Schema.optional(Schema.Number),
  savings: Schema.optional(SavingsOverTime),
})).annotate({ identifier: "CashPurchaseSavings" }) as any as Schema.Schema<CashPurchaseSavings>;

export interface FinancedPurchaseSavings {
  /** Annual loan payments. */
  annualLoanPayment?: Money;
  /** The value of all tax rebates (including Federal Investment Tax Credit (ITC)). */
  rebateValue?: Money;
  /** The interest rate on loans assumed in this set of calculations. */
  loanInterestRate?: number;
  /** How much is saved (or not) over the lifetime period. */
  savings?: SavingsOverTime;
}

export const FinancedPurchaseSavings: Schema.Schema<FinancedPurchaseSavings> = Schema.suspend(() => Schema.Struct({
  annualLoanPayment: Schema.optional(Money),
  rebateValue: Schema.optional(Money),
  loanInterestRate: Schema.optional(Schema.Number),
  savings: Schema.optional(SavingsOverTime),
})).annotate({ identifier: "FinancedPurchaseSavings" }) as any as Schema.Schema<FinancedPurchaseSavings>;

export interface FinancialAnalysis {
  /** The monthly electric bill this analysis assumes. */
  monthlyBill?: Money;
  /** Whether this is the bill size selected to be the default bill for the area this building is in. Exactly one `FinancialAnalysis` in `BuildingSolarPotential` should have `default_bill` set. */
  defaultBill?: boolean;
  /** How much electricity the house uses in an average month, based on the bill size and the local electricity rates. */
  averageKwhPerMonth?: number;
  /** Index in solar_panel_configs of the optimum solar layout for this bill size. This can be -1 indicating that there is no layout. In this case, the remaining submessages will be omitted. */
  panelConfigIndex?: number;
  /** Financial information that applies regardless of the financing method used. */
  financialDetails?: FinancialDetails;
  /** Cost and benefit of leasing the solar panels. */
  leasingSavings?: LeasingSavings;
  /** Cost and benefit of buying the solar panels with cash. */
  cashPurchaseSavings?: CashPurchaseSavings;
  /** Cost and benefit of buying the solar panels by financing the purchase. */
  financedPurchaseSavings?: FinancedPurchaseSavings;
}

export const FinancialAnalysis: Schema.Schema<FinancialAnalysis> = Schema.suspend(() => Schema.Struct({
  monthlyBill: Schema.optional(Money),
  defaultBill: Schema.optional(Schema.Boolean),
  averageKwhPerMonth: Schema.optional(Schema.Number),
  panelConfigIndex: Schema.optional(Schema.Number),
  financialDetails: Schema.optional(FinancialDetails),
  leasingSavings: Schema.optional(LeasingSavings),
  cashPurchaseSavings: Schema.optional(CashPurchaseSavings),
  financedPurchaseSavings: Schema.optional(FinancedPurchaseSavings),
})).annotate({ identifier: "FinancialAnalysis" }) as any as Schema.Schema<FinancialAnalysis>;

export interface SolarPotential {
  /** Size of the maximum array - that is, the maximum number of panels that can fit on the roof. */
  maxArrayPanelsCount?: number;
  /** Capacity, in watts, of the panel used in the calculations. */
  panelCapacityWatts?: number;
  /** Height, in meters in portrait orientation, of the panel used in the calculations. */
  panelHeightMeters?: number;
  /** Width, in meters in portrait orientation, of the panel used in the calculations. */
  panelWidthMeters?: number;
  /** The expected lifetime, in years, of the solar panels. This is used in the financial calculations. */
  panelLifetimeYears?: number;
  /** Size, in square meters, of the maximum array. */
  maxArrayAreaMeters2?: number;
  /** Maximum number of sunshine hours received per year, by any point on the roof. Sunshine hours are a measure of the total amount of insolation (energy) received per year. 1 sunshine hour = 1 kWh per kW (where kW refers to kW of capacity under Standard Testing Conditions). */
  maxSunshineHoursPerYear?: number;
  /** Equivalent amount of CO2 produced per MWh of grid electricity. This is a measure of the carbon intensity of grid electricity displaced by solar electricity. */
  carbonOffsetFactorKgPerMwh?: number;
  /** Total size and sunlight quantiles for the part of the roof that was assigned to some roof segment. Despite the name, this may not include the entire building. See building_stats. */
  wholeRoofStats?: SizeAndSunshineStats;
  /** Size and sunlight quantiles for the entire building, including parts of the roof that were not assigned to some roof segment. Because the orientations of these parts are not well characterised, the roof area estimate is unreliable, but the ground area estimate is reliable. It may be that a more reliable whole building roof area can be obtained by scaling the roof area from whole_roof_stats by the ratio of the ground areas of `building_stats` and `whole_roof_stats`. */
  buildingStats?: SizeAndSunshineStats;
  /** Size and sunlight quantiles for each roof segment. */
  roofSegmentStats?: Array<RoofSegmentSizeAndSunshineStats>;
  /** Each SolarPanel describes a single solar panel. They are listed in the order that the panel layout algorithm placed this. This is usually, though not always, in decreasing order of annual energy production. */
  solarPanels?: Array<SolarPanel>;
  /** Each SolarPanelConfig describes a different arrangement of solar panels on the roof. They are in order of increasing number of panels. The `SolarPanelConfig` with panels_count=N is based on the first N panels in the `solar_panels` list. This field is only populated if at least 4 panels can fit on a roof. */
  solarPanelConfigs?: Array<SolarPanelConfig>;
  /** A FinancialAnalysis gives the savings from going solar assuming a given monthly bill and a given electricity provider. They are in order of increasing order of monthly bill amount. This field will be empty for buildings in areas for which the Solar API does not have enough information to perform financial computations. */
  financialAnalyses?: Array<FinancialAnalysis>;
}

export const SolarPotential: Schema.Schema<SolarPotential> = Schema.suspend(() => Schema.Struct({
  maxArrayPanelsCount: Schema.optional(Schema.Number),
  panelCapacityWatts: Schema.optional(Schema.Number),
  panelHeightMeters: Schema.optional(Schema.Number),
  panelWidthMeters: Schema.optional(Schema.Number),
  panelLifetimeYears: Schema.optional(Schema.Number),
  maxArrayAreaMeters2: Schema.optional(Schema.Number),
  maxSunshineHoursPerYear: Schema.optional(Schema.Number),
  carbonOffsetFactorKgPerMwh: Schema.optional(Schema.Number),
  wholeRoofStats: Schema.optional(SizeAndSunshineStats),
  buildingStats: Schema.optional(SizeAndSunshineStats),
  roofSegmentStats: Schema.optional(Schema.Array(RoofSegmentSizeAndSunshineStats)),
  solarPanels: Schema.optional(Schema.Array(SolarPanel)),
  solarPanelConfigs: Schema.optional(Schema.Array(SolarPanelConfig)),
  financialAnalyses: Schema.optional(Schema.Array(FinancialAnalysis)),
})).annotate({ identifier: "SolarPotential" }) as any as Schema.Schema<SolarPotential>;

export interface BuildingInsights {
  /** The resource name for the building, of the format `buildings/{place_id}`. */
  name?: string;
  /** A point near the center of the building. */
  center?: LatLng;
  /** The bounding box of the building. */
  boundingBox?: LatLngBox;
  /** Date that the underlying imagery was acquired. This is approximate. */
  imageryDate?: Solar_Date;
  /** When processing was completed on this imagery. */
  imageryProcessedDate?: Solar_Date;
  /** Postal code (e.g., US zip code) this building is contained by. */
  postalCode?: string;
  /** Administrative area 1 (e.g., in the US, the state) that contains this building. For example, in the US, the abbreviation might be "MA" or "CA." */
  administrativeArea?: string;
  /** Statistical area (e.g., US census tract) this building is in. */
  statisticalArea?: string;
  /** Region code for the country (or region) this building is in. */
  regionCode?: string;
  /** Solar potential of the building. */
  solarPotential?: SolarPotential;
  /** The quality of the imagery used to compute the data for this building. */
  imageryQuality?: "IMAGERY_QUALITY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BASE" | (string & {});
}

export const BuildingInsights: Schema.Schema<BuildingInsights> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  center: Schema.optional(LatLng),
  boundingBox: Schema.optional(LatLngBox),
  imageryDate: Schema.optional(Solar_Date),
  imageryProcessedDate: Schema.optional(Solar_Date),
  postalCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  statisticalArea: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  solarPotential: Schema.optional(SolarPotential),
  imageryQuality: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildingInsights" }) as any as Schema.Schema<BuildingInsights>;

export interface DataLayers {
  /** When the source imagery (from which all the other data are derived) in this region was taken. It is necessarily somewhat approximate, as the images may have been taken over more than one day. */
  imageryDate?: Solar_Date;
  /** When processing was completed on this imagery. */
  imageryProcessedDate?: Solar_Date;
  /** The URL for an image of the DSM (Digital Surface Model) of the region. Values are in meters above EGM96 geoid (i.e., sea level). Invalid locations (where we don't have data) are stored as -9999. */
  dsmUrl?: string;
  /** The URL for an image of RGB data (aerial or satellite photo) of the region. */
  rgbUrl?: string;
  /** The URL for the building mask image: one bit per pixel saying whether that pixel is considered to be part of a rooftop or not. */
  maskUrl?: string;
  /** The URL for the annual flux map (annual sunlight on roofs) of the region. Values are kWh/kW/year. This is *unmasked flux*: flux is computed for every location, not just building rooftops. Invalid locations are stored as -9999: locations outside our coverage area will be invalid, and a few locations inside the coverage area, where we were unable to calculate flux, will also be invalid. */
  annualFluxUrl?: string;
  /** The URL for the monthly flux map (sunlight on roofs, broken down by month) of the region. Values are kWh/kW/year. The GeoTIFF pointed to by this URL will contain twelve bands, corresponding to January...December, in order. */
  monthlyFluxUrl?: string;
  /** Twelve URLs for hourly shade, corresponding to January...December, in order. Each GeoTIFF will contain 24 bands, corresponding to the 24 hours of the day. Each pixel is a 32 bit integer, corresponding to the (up to) 31 days of that month; a 1 bit means that the corresponding location is able to see the sun at that day, of that hour, of that month. Invalid locations are stored as -9999 (since this is negative, it has bit 31 set, and no valid value could have bit 31 set as that would correspond to the 32nd day of the month). An example may be useful. If you want to know whether a point (at pixel location (x, y)) saw sun at 4pm on the 22nd of June you would: 1. fetch the sixth URL in this list (corresponding to June). 1. look up the 17th channel (corresponding to 4pm). 1. read the 32-bit value at (x, y). 1. read bit 21 of the value (corresponding to the 22nd of the month). 1. if that bit is a 1, then that spot saw the sun at 4pm 22 June. More formally: Given `month` (1-12), `day` (1...month max; February has 28 days) and `hour` (0-23), the shade/sun for that month/day/hour at a position `(x, y)` is the bit ``` (hourly_shade[month - 1])(x, y)[hour] & (1 << (day - 1)) ``` where `(x, y)` is spatial indexing, `[month - 1]` refers to fetching the `month - 1`st URL (indexing from zero), `[hour]` is indexing into the channels, and a final non-zero result means "sunny". There are no leap days, and DST doesn't exist (all days are 24 hours long; noon is always "standard time" noon). */
  hourlyShadeUrls?: Array<string>;
  /** The quality of the result's imagery. */
  imageryQuality?: "IMAGERY_QUALITY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BASE" | (string & {});
}

export const DataLayers: Schema.Schema<DataLayers> = Schema.suspend(() => Schema.Struct({
  imageryDate: Schema.optional(Solar_Date),
  imageryProcessedDate: Schema.optional(Solar_Date),
  dsmUrl: Schema.optional(Schema.String),
  rgbUrl: Schema.optional(Schema.String),
  maskUrl: Schema.optional(Schema.String),
  annualFluxUrl: Schema.optional(Schema.String),
  monthlyFluxUrl: Schema.optional(Schema.String),
  hourlyShadeUrls: Schema.optional(Schema.Array(Schema.String)),
  imageryQuality: Schema.optional(Schema.String),
})).annotate({ identifier: "DataLayers" }) as any as Schema.Schema<DataLayers>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

// ==========================================================================
// Operations
// ==========================================================================

/** Locates the building whose centroid is closest to a query point. Returns an error with code `NOT_FOUND` if there are no buildings within approximately 50m of the query point. */
export interface FindClosestBuildingInsightsRequest {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  "location.latitude"?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  "location.longitude"?: number;
  /** Optional. The minimum quality level allowed in the results. No result with lower quality than this will be returned. Not specifying this is equivalent to restricting to HIGH quality only. */
  requiredQuality?: "IMAGERY_QUALITY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BASE" | (string & {});
  /** Optional. Whether to require exact quality of the imagery. If set to false, the `required_quality` field is interpreted as the minimum required quality, such that HIGH quality imagery may be returned when `required_quality` is set to MEDIUM. If set to true, `required_quality` is interpreted as the exact required quality and only `MEDIUM` quality imagery is returned if `required_quality` is set to `MEDIUM`. */
  exactQualityRequired?: boolean;
  /** Optional. Specifies the pre-GA experiments to enable. Requests using this field are classified as a pre-GA offering under the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). See [launch stage descriptions](https://cloud.google.com/maps-platform/terms/launch-stages) for more details. */
  experiments?: "EXPERIMENT_UNSPECIFIED" | "EXPANDED_COVERAGE" | (string & {})[];
}

export const FindClosestBuildingInsightsRequest = Schema.Struct({
  "location.latitude": Schema.optional(Schema.Number).pipe(T.HttpQuery("location.latitude")),
  "location.longitude": Schema.optional(Schema.Number).pipe(T.HttpQuery("location.longitude")),
  requiredQuality: Schema.optional(Schema.String).pipe(T.HttpQuery("requiredQuality")),
  exactQualityRequired: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("exactQualityRequired")),
  experiments: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("experiments")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buildingInsights:findClosest" }),
  svc,
) as unknown as Schema.Schema<FindClosestBuildingInsightsRequest>;

export type FindClosestBuildingInsightsResponse = BuildingInsights;
export const FindClosestBuildingInsightsResponse = BuildingInsights;

export type FindClosestBuildingInsightsError = CommonErrors;

export const findClosestBuildingInsights: API.OperationMethod<FindClosestBuildingInsightsRequest, FindClosestBuildingInsightsResponse, FindClosestBuildingInsightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FindClosestBuildingInsightsRequest,
  output: FindClosestBuildingInsightsResponse,
  errors: [],
}));

/** Gets solar information for a region surrounding a location. Returns an error with code `NOT_FOUND` if the location is outside the coverage area. */
export interface GetDataLayersRequest {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  "location.latitude"?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  "location.longitude"?: number;
  /** Required. The radius, in meters, defining the region surrounding that centre point for which data should be returned. The limitations on this value are: * Any value up to 100m can always be specified. * Values over 100m can be specified, as long as `radius_meters` <= `pixel_size_meters * 1000`. * However, for values over 175m, the `DataLayerView` in the request must not include monthly flux or hourly shade. */
  radiusMeters?: number;
  /** Optional. The desired subset of the data to return. */
  view?: "DATA_LAYER_VIEW_UNSPECIFIED" | "DSM_LAYER" | "IMAGERY_LAYERS" | "IMAGERY_AND_ANNUAL_FLUX_LAYERS" | "IMAGERY_AND_ALL_FLUX_LAYERS" | "FULL_LAYERS" | (string & {});
  /** Optional. The minimum quality level allowed in the results. No result with lower quality than this will be returned. Not specifying this is equivalent to restricting to HIGH quality only. */
  requiredQuality?: "IMAGERY_QUALITY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BASE" | (string & {});
  /** Optional. The minimum scale, in meters per pixel, of the data to return. Values of 0.1 (the default, if this field is not set explicitly), 0.25, 0.5, and 1.0 are supported. Imagery components whose normal resolution is less than `pixel_size_meters` will be returned at the resolution specified by `pixel_size_meters`; imagery components whose normal resolution is equal to or greater than `pixel_size_meters` will be returned at that normal resolution. */
  pixelSizeMeters?: number;
  /** Optional. Whether to require exact quality of the imagery. If set to false, the `required_quality` field is interpreted as the minimum required quality, such that HIGH quality imagery may be returned when `required_quality` is set to MEDIUM. If set to true, `required_quality` is interpreted as the exact required quality and only `MEDIUM` quality imagery is returned if `required_quality` is set to `MEDIUM`. */
  exactQualityRequired?: boolean;
  /** Optional. Specifies the pre-GA experiments to enable. Requests using this field are classified as a pre-GA offering under the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). See [launch stage descriptions]( https://cloud.google.com/maps-platform/terms/launch-stages) for more details. */
  experiments?: "EXPERIMENT_UNSPECIFIED" | "EXPANDED_COVERAGE" | (string & {})[];
}

export const GetDataLayersRequest = Schema.Struct({
  "location.latitude": Schema.optional(Schema.Number).pipe(T.HttpQuery("location.latitude")),
  "location.longitude": Schema.optional(Schema.Number).pipe(T.HttpQuery("location.longitude")),
  radiusMeters: Schema.optional(Schema.Number).pipe(T.HttpQuery("radiusMeters")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  requiredQuality: Schema.optional(Schema.String).pipe(T.HttpQuery("requiredQuality")),
  pixelSizeMeters: Schema.optional(Schema.Number).pipe(T.HttpQuery("pixelSizeMeters")),
  exactQualityRequired: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("exactQualityRequired")),
  experiments: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("experiments")),
}).pipe(
  T.Http({ method: "GET", path: "v1/dataLayers:get" }),
  svc,
) as unknown as Schema.Schema<GetDataLayersRequest>;

export type GetDataLayersResponse = DataLayers;
export const GetDataLayersResponse = DataLayers;

export type GetDataLayersError = CommonErrors;

export const getDataLayers: API.OperationMethod<GetDataLayersRequest, GetDataLayersResponse, GetDataLayersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDataLayersRequest,
  output: GetDataLayersResponse,
  errors: [],
}));

/** Returns an image by its ID. */
export interface GetGeoTiffRequest {
  /** Required. The ID of the asset being requested. */
  id?: string;
}

export const GetGeoTiffRequest = Schema.Struct({
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/geoTiff:get" }),
  svc,
) as unknown as Schema.Schema<GetGeoTiffRequest>;

export type GetGeoTiffResponse = HttpBody;
export const GetGeoTiffResponse = HttpBody;

export type GetGeoTiffError = CommonErrors;

export const getGeoTiff: API.OperationMethod<GetGeoTiffRequest, GetGeoTiffResponse, GetGeoTiffError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGeoTiffRequest,
  output: GetGeoTiffResponse,
  errors: [],
}));

