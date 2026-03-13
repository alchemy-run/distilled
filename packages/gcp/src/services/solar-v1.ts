// ==========================================================================
// Solar API (solar v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
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

export const LatLng: Schema.Schema<LatLng> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      latitude: Schema.optional(Schema.Number),
      longitude: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface LatLngBox {
  /** The southwest corner of the box. */
  sw?: LatLng;
  /** The northeast corner of the box. */
  ne?: LatLng;
}

export const LatLngBox: Schema.Schema<LatLngBox> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sw: Schema.optional(LatLng),
      ne: Schema.optional(LatLng),
    }),
  ).annotate({ identifier: "LatLngBox" }) as any as Schema.Schema<LatLngBox>;

export interface SizeAndSunshineStats {
  /** Quantiles of the pointwise sunniness across the area. If there are N values here, this represents the (N-1)-iles. For example, if there are 5 values, then they would be the quartiles (min, 25%, 50%, 75%, max). Values are in annual kWh/kW like max_sunshine_hours_per_year. */
  sunshineQuantiles?: Array<number>;
  /** The ground footprint area covered by the roof or roof segment, in m^2. */
  groundAreaMeters2?: number;
  /** The area of the roof or roof segment, in m^2. This is the roof area (accounting for tilt), not the ground footprint area. */
  areaMeters2?: number;
}

export const SizeAndSunshineStats: Schema.Schema<SizeAndSunshineStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sunshineQuantiles: Schema.optional(Schema.Array(Schema.Number)),
      groundAreaMeters2: Schema.optional(Schema.Number),
      areaMeters2: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SizeAndSunshineStats",
  }) as any as Schema.Schema<SizeAndSunshineStats>;

export interface RoofSegmentSizeAndSunshineStats {
  /** Compass direction the roof segment is pointing in. 0 = North, 90 = East, 180 = South. For a "flat" roof segment (`pitch_degrees` very near 0), azimuth is not well defined, so for consistency, we define it arbitrarily to be 0 (North). */
  azimuthDegrees?: number;
  /** The bounding box of the roof segment. */
  boundingBox?: LatLngBox;
  /** A point near the center of the roof segment. */
  center?: LatLng;
  /** The height of the roof segment plane, in meters above sea level, at the point designated by `center`. Together with the pitch, azimuth, and center location, this fully defines the roof segment plane. */
  planeHeightAtCenterMeters?: number;
  /** Angle of the roof segment relative to the theoretical ground plane. 0 = parallel to the ground, 90 = perpendicular to the ground. */
  pitchDegrees?: number;
  /** Total size and sunlight quantiles for the roof segment. */
  stats?: SizeAndSunshineStats;
}

export const RoofSegmentSizeAndSunshineStats: Schema.Schema<RoofSegmentSizeAndSunshineStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      azimuthDegrees: Schema.optional(Schema.Number),
      boundingBox: Schema.optional(LatLngBox),
      center: Schema.optional(LatLng),
      planeHeightAtCenterMeters: Schema.optional(Schema.Number),
      pitchDegrees: Schema.optional(Schema.Number),
      stats: Schema.optional(SizeAndSunshineStats),
    }),
  ).annotate({
    identifier: "RoofSegmentSizeAndSunshineStats",
  }) as any as Schema.Schema<RoofSegmentSizeAndSunshineStats>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
}

export const Money: Schema.Schema<Money> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currencyCode: Schema.optional(Schema.String),
      nanos: Schema.optional(Schema.Number),
      units: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentType: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
      extensions: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface Solar_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Solar_Date: Schema.Schema<Solar_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Solar_Date" }) as any as Schema.Schema<Solar_Date>;

export interface SolarPanel {
  /** Index in roof_segment_stats of the `RoofSegmentSizeAndSunshineStats` which corresponds to the roof segment that this panel is placed on. */
  segmentIndex?: number;
  /** How much sunlight energy this layout captures over the course of a year, in DC kWh. */
  yearlyEnergyDcKwh?: number;
  /** The centre of the panel. */
  center?: LatLng;
  /** The orientation of the panel. */
  orientation?:
    | "SOLAR_PANEL_ORIENTATION_UNSPECIFIED"
    | "LANDSCAPE"
    | "PORTRAIT"
    | (string & {});
}

export const SolarPanel: Schema.Schema<SolarPanel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      segmentIndex: Schema.optional(Schema.Number),
      yearlyEnergyDcKwh: Schema.optional(Schema.Number),
      center: Schema.optional(LatLng),
      orientation: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SolarPanel" }) as any as Schema.Schema<SolarPanel>;

export interface FinancialDetails {
  /** Amount of money available from federal incentives; this applies if the user buys (with or without a loan) the panels. */
  federalIncentive?: Money;
  /** Percentage (0-100) of the user's power supplied by solar. Valid for the first year but approximately correct for future years. */
  solarPercentage?: number;
  /** Amount of money available from state incentives; this applies if the user buys (with or without a loan) the panels. */
  stateIncentive?: Money;
  /** Amount of money the user will receive from Solar Renewable Energy Credits over the panel lifetime; this applies if the user buys (with or without a loan) the panels. */
  lifetimeSrecTotal?: Money;
  /** The percentage (0-100) of solar electricity production we assumed was exported to the grid, based on the first quarter of production. This affects the calculations if net metering is not allowed. */
  percentageExportedToGrid?: number;
  /** Total cost of electricity the user would have paid over the lifetime period if they didn't install solar. */
  costOfElectricityWithoutSolar?: Money;
  /** Amount of money available from utility incentives; this applies if the user buys (with or without a loan) the panels. */
  utilityIncentive?: Money;
  /** How many AC kWh we think the solar panels will generate in their first year. */
  initialAcKwhPerYear?: number;
  /** Utility bill for electricity not produced by solar, for the lifetime of the panels. */
  remainingLifetimeUtilityBill?: Money;
  /** Whether net metering is allowed. */
  netMeteringAllowed?: boolean;
}

export const FinancialDetails: Schema.Schema<FinancialDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      federalIncentive: Schema.optional(Money),
      solarPercentage: Schema.optional(Schema.Number),
      stateIncentive: Schema.optional(Money),
      lifetimeSrecTotal: Schema.optional(Money),
      percentageExportedToGrid: Schema.optional(Schema.Number),
      costOfElectricityWithoutSolar: Schema.optional(Money),
      utilityIncentive: Schema.optional(Money),
      initialAcKwhPerYear: Schema.optional(Schema.Number),
      remainingLifetimeUtilityBill: Schema.optional(Money),
      netMeteringAllowed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "FinancialDetails",
  }) as any as Schema.Schema<FinancialDetails>;

export interface SavingsOverTime {
  /** Savings in the entire panel lifetime. */
  savingsLifetime?: Money;
  /** Using the assumed discount rate, what is the present value of the cumulative lifetime savings? */
  presentValueOfSavingsLifetime?: Money;
  /** Savings in the first year after panel installation. */
  savingsYear1?: Money;
  /** Indicates whether this scenario is financially viable. Will be false for scenarios with poor financial viability (e.g., money-losing). */
  financiallyViable?: boolean;
  /** Using the assumed discount rate, what is the present value of the cumulative 20-year savings? */
  presentValueOfSavingsYear20?: Money;
  /** Savings in the first twenty years after panel installation. */
  savingsYear20?: Money;
}

export const SavingsOverTime: Schema.Schema<SavingsOverTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      savingsLifetime: Schema.optional(Money),
      presentValueOfSavingsLifetime: Schema.optional(Money),
      savingsYear1: Schema.optional(Money),
      financiallyViable: Schema.optional(Schema.Boolean),
      presentValueOfSavingsYear20: Schema.optional(Money),
      savingsYear20: Schema.optional(Money),
    }),
  ).annotate({
    identifier: "SavingsOverTime",
  }) as any as Schema.Schema<SavingsOverTime>;

export interface LeasingSavings {
  /** How much is saved (or not) over the lifetime period. */
  savings?: SavingsOverTime;
  /** Whether leases are allowed in this juristiction (leases are not allowed in some states). If this field is false, then the values in this message should probably be ignored. */
  leasesAllowed?: boolean;
  /** Whether leases are supported in this juristiction by the financial calculation engine. If this field is false, then the values in this message should probably be ignored. This is independent of `leases_allowed`: in some areas leases are allowed, but under conditions that aren't handled by the financial models. */
  leasesSupported?: boolean;
  /** Estimated annual leasing cost. */
  annualLeasingCost?: Money;
}

export const LeasingSavings: Schema.Schema<LeasingSavings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      savings: Schema.optional(SavingsOverTime),
      leasesAllowed: Schema.optional(Schema.Boolean),
      leasesSupported: Schema.optional(Schema.Boolean),
      annualLeasingCost: Schema.optional(Money),
    }),
  ).annotate({
    identifier: "LeasingSavings",
  }) as any as Schema.Schema<LeasingSavings>;

export interface FinancedPurchaseSavings {
  /** The value of all tax rebates (including Federal Investment Tax Credit (ITC)). */
  rebateValue?: Money;
  /** The interest rate on loans assumed in this set of calculations. */
  loanInterestRate?: number;
  /** Annual loan payments. */
  annualLoanPayment?: Money;
  /** How much is saved (or not) over the lifetime period. */
  savings?: SavingsOverTime;
}

export const FinancedPurchaseSavings: Schema.Schema<FinancedPurchaseSavings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rebateValue: Schema.optional(Money),
      loanInterestRate: Schema.optional(Schema.Number),
      annualLoanPayment: Schema.optional(Money),
      savings: Schema.optional(SavingsOverTime),
    }),
  ).annotate({
    identifier: "FinancedPurchaseSavings",
  }) as any as Schema.Schema<FinancedPurchaseSavings>;

export interface CashPurchaseSavings {
  /** Initial cost after tax incentives: it's the amount that must be paid during first year. Contrast with `out_of_pocket_cost`, which is before tax incentives. */
  upfrontCost?: Money;
  /** Number of years until payback occurs. A negative value means payback never occurs within the lifetime period. */
  paybackYears?: number;
  /** Initial cost before tax incentives: the amount that must be paid out-of-pocket. Contrast with `upfront_cost`, which is after tax incentives. */
  outOfPocketCost?: Money;
  /** How much is saved (or not) over the lifetime period. */
  savings?: SavingsOverTime;
  /** The value of all tax rebates. */
  rebateValue?: Money;
}

export const CashPurchaseSavings: Schema.Schema<CashPurchaseSavings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      upfrontCost: Schema.optional(Money),
      paybackYears: Schema.optional(Schema.Number),
      outOfPocketCost: Schema.optional(Money),
      savings: Schema.optional(SavingsOverTime),
      rebateValue: Schema.optional(Money),
    }),
  ).annotate({
    identifier: "CashPurchaseSavings",
  }) as any as Schema.Schema<CashPurchaseSavings>;

export interface FinancialAnalysis {
  /** Financial information that applies regardless of the financing method used. */
  financialDetails?: FinancialDetails;
  /** The monthly electric bill this analysis assumes. */
  monthlyBill?: Money;
  /** Cost and benefit of leasing the solar panels. */
  leasingSavings?: LeasingSavings;
  /** How much electricity the house uses in an average month, based on the bill size and the local electricity rates. */
  averageKwhPerMonth?: number;
  /** Cost and benefit of buying the solar panels by financing the purchase. */
  financedPurchaseSavings?: FinancedPurchaseSavings;
  /** Whether this is the bill size selected to be the default bill for the area this building is in. Exactly one `FinancialAnalysis` in `BuildingSolarPotential` should have `default_bill` set. */
  defaultBill?: boolean;
  /** Index in solar_panel_configs of the optimum solar layout for this bill size. This can be -1 indicating that there is no layout. In this case, the remaining submessages will be omitted. */
  panelConfigIndex?: number;
  /** Cost and benefit of buying the solar panels with cash. */
  cashPurchaseSavings?: CashPurchaseSavings;
}

export const FinancialAnalysis: Schema.Schema<FinancialAnalysis> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      financialDetails: Schema.optional(FinancialDetails),
      monthlyBill: Schema.optional(Money),
      leasingSavings: Schema.optional(LeasingSavings),
      averageKwhPerMonth: Schema.optional(Schema.Number),
      financedPurchaseSavings: Schema.optional(FinancedPurchaseSavings),
      defaultBill: Schema.optional(Schema.Boolean),
      panelConfigIndex: Schema.optional(Schema.Number),
      cashPurchaseSavings: Schema.optional(CashPurchaseSavings),
    }),
  ).annotate({
    identifier: "FinancialAnalysis",
  }) as any as Schema.Schema<FinancialAnalysis>;

export interface RoofSegmentSummary {
  /** Angle of the roof segment relative to the theoretical ground plane. 0 = parallel to the ground, 90 = perpendicular to the ground. */
  pitchDegrees?: number;
  /** The total number of panels on this segment. */
  panelsCount?: number;
  /** How much sunlight energy this part of the layout captures over the course of a year, in DC kWh, assuming the panels described above. */
  yearlyEnergyDcKwh?: number;
  /** Compass direction the roof segment is pointing in. 0 = North, 90 = East, 180 = South. For a "flat" roof segment (`pitch_degrees` very near 0), azimuth is not well defined, so for consistency, we define it arbitrarily to be 0 (North). */
  azimuthDegrees?: number;
  /** Index in roof_segment_stats of the corresponding `RoofSegmentSizeAndSunshineStats`. */
  segmentIndex?: number;
}

export const RoofSegmentSummary: Schema.Schema<RoofSegmentSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pitchDegrees: Schema.optional(Schema.Number),
      panelsCount: Schema.optional(Schema.Number),
      yearlyEnergyDcKwh: Schema.optional(Schema.Number),
      azimuthDegrees: Schema.optional(Schema.Number),
      segmentIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "RoofSegmentSummary",
  }) as any as Schema.Schema<RoofSegmentSummary>;

export interface SolarPanelConfig {
  /** Information about the production of each roof segment that is carrying at least one panel in this layout. `roof_segment_summaries[i]` describes the i-th roof segment, including its size, expected production and orientation. */
  roofSegmentSummaries?: Array<RoofSegmentSummary>;
  /** Total number of panels. Note that this is redundant to (the sum of) the corresponding fields in roof_segment_summaries. */
  panelsCount?: number;
  /** How much sunlight energy this layout captures over the course of a year, in DC kWh, assuming the panels described above. */
  yearlyEnergyDcKwh?: number;
}

export const SolarPanelConfig: Schema.Schema<SolarPanelConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      roofSegmentSummaries: Schema.optional(Schema.Array(RoofSegmentSummary)),
      panelsCount: Schema.optional(Schema.Number),
      yearlyEnergyDcKwh: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SolarPanelConfig",
  }) as any as Schema.Schema<SolarPanelConfig>;

export interface SolarPotential {
  /** Each SolarPanel describes a single solar panel. They are listed in the order that the panel layout algorithm placed this. This is usually, though not always, in decreasing order of annual energy production. */
  solarPanels?: Array<SolarPanel>;
  /** Total size and sunlight quantiles for the part of the roof that was assigned to some roof segment. Despite the name, this may not include the entire building. See building_stats. */
  wholeRoofStats?: SizeAndSunshineStats;
  /** A FinancialAnalysis gives the savings from going solar assuming a given monthly bill and a given electricity provider. They are in order of increasing order of monthly bill amount. This field will be empty for buildings in areas for which the Solar API does not have enough information to perform financial computations. */
  financialAnalyses?: Array<FinancialAnalysis>;
  /** Height, in meters in portrait orientation, of the panel used in the calculations. */
  panelHeightMeters?: number;
  /** Width, in meters in portrait orientation, of the panel used in the calculations. */
  panelWidthMeters?: number;
  /** Size, in square meters, of the maximum array. */
  maxArrayAreaMeters2?: number;
  /** Equivalent amount of CO2 produced per MWh of grid electricity. This is a measure of the carbon intensity of grid electricity displaced by solar electricity. */
  carbonOffsetFactorKgPerMwh?: number;
  /** Size and sunlight quantiles for the entire building, including parts of the roof that were not assigned to some roof segment. Because the orientations of these parts are not well characterised, the roof area estimate is unreliable, but the ground area estimate is reliable. It may be that a more reliable whole building roof area can be obtained by scaling the roof area from whole_roof_stats by the ratio of the ground areas of `building_stats` and `whole_roof_stats`. */
  buildingStats?: SizeAndSunshineStats;
  /** Size and sunlight quantiles for each roof segment. */
  roofSegmentStats?: Array<RoofSegmentSizeAndSunshineStats>;
  /** Size of the maximum array - that is, the maximum number of panels that can fit on the roof. */
  maxArrayPanelsCount?: number;
  /** The expected lifetime, in years, of the solar panels. This is used in the financial calculations. */
  panelLifetimeYears?: number;
  /** Capacity, in watts, of the panel used in the calculations. */
  panelCapacityWatts?: number;
  /** Maximum number of sunshine hours received per year, by any point on the roof. Sunshine hours are a measure of the total amount of insolation (energy) received per year. 1 sunshine hour = 1 kWh per kW (where kW refers to kW of capacity under Standard Testing Conditions). */
  maxSunshineHoursPerYear?: number;
  /** Each SolarPanelConfig describes a different arrangement of solar panels on the roof. They are in order of increasing number of panels. The `SolarPanelConfig` with panels_count=N is based on the first N panels in the `solar_panels` list. This field is only populated if at least 4 panels can fit on a roof. */
  solarPanelConfigs?: Array<SolarPanelConfig>;
}

export const SolarPotential: Schema.Schema<SolarPotential> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      solarPanels: Schema.optional(Schema.Array(SolarPanel)),
      wholeRoofStats: Schema.optional(SizeAndSunshineStats),
      financialAnalyses: Schema.optional(Schema.Array(FinancialAnalysis)),
      panelHeightMeters: Schema.optional(Schema.Number),
      panelWidthMeters: Schema.optional(Schema.Number),
      maxArrayAreaMeters2: Schema.optional(Schema.Number),
      carbonOffsetFactorKgPerMwh: Schema.optional(Schema.Number),
      buildingStats: Schema.optional(SizeAndSunshineStats),
      roofSegmentStats: Schema.optional(
        Schema.Array(RoofSegmentSizeAndSunshineStats),
      ),
      maxArrayPanelsCount: Schema.optional(Schema.Number),
      panelLifetimeYears: Schema.optional(Schema.Number),
      panelCapacityWatts: Schema.optional(Schema.Number),
      maxSunshineHoursPerYear: Schema.optional(Schema.Number),
      solarPanelConfigs: Schema.optional(Schema.Array(SolarPanelConfig)),
    }),
  ).annotate({
    identifier: "SolarPotential",
  }) as any as Schema.Schema<SolarPotential>;

export interface BuildingInsights {
  /** Postal code (e.g., US zip code) this building is contained by. */
  postalCode?: string;
  /** The resource name for the building, of the format `buildings/{place_id}`. */
  name?: string;
  /** Date that the underlying imagery was acquired. This is approximate. */
  imageryDate?: Solar_Date;
  /** When processing was completed on this imagery. */
  imageryProcessedDate?: Solar_Date;
  /** Region code for the country (or region) this building is in. */
  regionCode?: string;
  /** Solar potential of the building. */
  solarPotential?: SolarPotential;
  /** The quality of the imagery used to compute the data for this building. */
  imageryQuality?:
    | "IMAGERY_QUALITY_UNSPECIFIED"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "BASE"
    | (string & {});
  /** A point near the center of the building. */
  center?: LatLng;
  /** Administrative area 1 (e.g., in the US, the state) that contains this building. For example, in the US, the abbreviation might be "MA" or "CA." */
  administrativeArea?: string;
  /** The bounding box of the building. */
  boundingBox?: LatLngBox;
  /** Statistical area (e.g., US census tract) this building is in. */
  statisticalArea?: string;
}

export const BuildingInsights: Schema.Schema<BuildingInsights> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postalCode: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      imageryDate: Schema.optional(Solar_Date),
      imageryProcessedDate: Schema.optional(Solar_Date),
      regionCode: Schema.optional(Schema.String),
      solarPotential: Schema.optional(SolarPotential),
      imageryQuality: Schema.optional(Schema.String),
      center: Schema.optional(LatLng),
      administrativeArea: Schema.optional(Schema.String),
      boundingBox: Schema.optional(LatLngBox),
      statisticalArea: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BuildingInsights",
  }) as any as Schema.Schema<BuildingInsights>;

export interface DataLayers {
  /** When processing was completed on this imagery. */
  imageryProcessedDate?: Solar_Date;
  /** The URL for the building mask image: one bit per pixel saying whether that pixel is considered to be part of a rooftop or not. */
  maskUrl?: string;
  /** The URL for the monthly flux map (sunlight on roofs, broken down by month) of the region. Values are kWh/kW/year. The GeoTIFF pointed to by this URL will contain twelve bands, corresponding to January...December, in order. */
  monthlyFluxUrl?: string;
  /** The URL for an image of RGB data (aerial or satellite photo) of the region. */
  rgbUrl?: string;
  /** Twelve URLs for hourly shade, corresponding to January...December, in order. Each GeoTIFF will contain 24 bands, corresponding to the 24 hours of the day. Each pixel is a 32 bit integer, corresponding to the (up to) 31 days of that month; a 1 bit means that the corresponding location is able to see the sun at that day, of that hour, of that month. Invalid locations are stored as -9999 (since this is negative, it has bit 31 set, and no valid value could have bit 31 set as that would correspond to the 32nd day of the month). An example may be useful. If you want to know whether a point (at pixel location (x, y)) saw sun at 4pm on the 22nd of June you would: 1. fetch the sixth URL in this list (corresponding to June). 1. look up the 17th channel (corresponding to 4pm). 1. read the 32-bit value at (x, y). 1. read bit 21 of the value (corresponding to the 22nd of the month). 1. if that bit is a 1, then that spot saw the sun at 4pm 22 June. More formally: Given `month` (1-12), `day` (1...month max; February has 28 days) and `hour` (0-23), the shade/sun for that month/day/hour at a position `(x, y)` is the bit ``` (hourly_shade[month - 1])(x, y)[hour] & (1 << (day - 1)) ``` where `(x, y)` is spatial indexing, `[month - 1]` refers to fetching the `month - 1`st URL (indexing from zero), `[hour]` is indexing into the channels, and a final non-zero result means "sunny". There are no leap days, and DST doesn't exist (all days are 24 hours long; noon is always "standard time" noon). */
  hourlyShadeUrls?: Array<string>;
  /** When the source imagery (from which all the other data are derived) in this region was taken. It is necessarily somewhat approximate, as the images may have been taken over more than one day. */
  imageryDate?: Solar_Date;
  /** The URL for the annual flux map (annual sunlight on roofs) of the region. Values are kWh/kW/year. This is *unmasked flux*: flux is computed for every location, not just building rooftops. Invalid locations are stored as -9999: locations outside our coverage area will be invalid, and a few locations inside the coverage area, where we were unable to calculate flux, will also be invalid. */
  annualFluxUrl?: string;
  /** The URL for an image of the DSM (Digital Surface Model) of the region. Values are in meters above EGM96 geoid (i.e., sea level). Invalid locations (where we don't have data) are stored as -9999. */
  dsmUrl?: string;
  /** The quality of the result's imagery. */
  imageryQuality?:
    | "IMAGERY_QUALITY_UNSPECIFIED"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "BASE"
    | (string & {});
}

export const DataLayers: Schema.Schema<DataLayers> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageryProcessedDate: Schema.optional(Solar_Date),
      maskUrl: Schema.optional(Schema.String),
      monthlyFluxUrl: Schema.optional(Schema.String),
      rgbUrl: Schema.optional(Schema.String),
      hourlyShadeUrls: Schema.optional(Schema.Array(Schema.String)),
      imageryDate: Schema.optional(Solar_Date),
      annualFluxUrl: Schema.optional(Schema.String),
      dsmUrl: Schema.optional(Schema.String),
      imageryQuality: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DataLayers" }) as any as Schema.Schema<DataLayers>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetGeoTiffRequest {
  /** Required. The ID of the asset being requested. */
  id?: string;
}

export const GetGeoTiffRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
}).pipe(
  T.Http({ method: "GET", path: "v1/geoTiff:get" }),
  svc,
) as unknown as Schema.Schema<GetGeoTiffRequest>;

export type GetGeoTiffResponse = HttpBody;
export const GetGeoTiffResponse = /*@__PURE__*/ /*#__PURE__*/ HttpBody;

export type GetGeoTiffError = DefaultErrors;

/** Returns an image by its ID. */
export const getGeoTiff: API.OperationMethod<
  GetGeoTiffRequest,
  GetGeoTiffResponse,
  GetGeoTiffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGeoTiffRequest,
  output: GetGeoTiffResponse,
  errors: [],
}));

export interface FindClosestBuildingInsightsRequest {
  /** Optional. The minimum quality level allowed in the results. No result with lower quality than this will be returned. Not specifying this is equivalent to restricting to HIGH quality only. */
  requiredQuality?:
    | "IMAGERY_QUALITY_UNSPECIFIED"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "BASE"
    | (string & {});
  /** Optional. Whether to require exact quality of the imagery. If set to false, the `required_quality` field is interpreted as the minimum required quality, such that HIGH quality imagery may be returned when `required_quality` is set to MEDIUM. If set to true, `required_quality` is interpreted as the exact required quality and only `MEDIUM` quality imagery is returned if `required_quality` is set to `MEDIUM`. */
  exactQualityRequired?: boolean;
  /** Optional. Specifies the pre-GA experiments to enable. Requests using this field are classified as a pre-GA offering under the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). See [launch stage descriptions](https://cloud.google.com/maps-platform/terms/launch-stages) for more details. */
  experiments?:
    | "EXPERIMENT_UNSPECIFIED"
    | "EXPANDED_COVERAGE"
    | (string & {})[];
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  "location.longitude"?: number;
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  "location.latitude"?: number;
}

export const FindClosestBuildingInsightsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requiredQuality: Schema.optional(Schema.String).pipe(
      T.HttpQuery("requiredQuality"),
    ),
    exactQualityRequired: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("exactQualityRequired"),
    ),
    experiments: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("experiments"),
    ),
    "location.longitude": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("location.longitude"),
    ),
    "location.latitude": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("location.latitude"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1/buildingInsights:findClosest" }),
    svc,
  ) as unknown as Schema.Schema<FindClosestBuildingInsightsRequest>;

export type FindClosestBuildingInsightsResponse = BuildingInsights;
export const FindClosestBuildingInsightsResponse =
  /*@__PURE__*/ /*#__PURE__*/ BuildingInsights;

export type FindClosestBuildingInsightsError = DefaultErrors;

/** Locates the building whose centroid is closest to a query point. Returns an error with code `NOT_FOUND` if there are no buildings within approximately 50m of the query point. */
export const findClosestBuildingInsights: API.OperationMethod<
  FindClosestBuildingInsightsRequest,
  FindClosestBuildingInsightsResponse,
  FindClosestBuildingInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FindClosestBuildingInsightsRequest,
  output: FindClosestBuildingInsightsResponse,
  errors: [],
}));

export interface GetDataLayersRequest {
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  "location.longitude"?: number;
  /** Optional. The desired subset of the data to return. */
  view?:
    | "DATA_LAYER_VIEW_UNSPECIFIED"
    | "DSM_LAYER"
    | "IMAGERY_LAYERS"
    | "IMAGERY_AND_ANNUAL_FLUX_LAYERS"
    | "IMAGERY_AND_ALL_FLUX_LAYERS"
    | "FULL_LAYERS"
    | (string & {});
  /** Required. The radius, in meters, defining the region surrounding that centre point for which data should be returned. The limitations on this value are: * Any value up to 100m can always be specified. * Values over 100m can be specified, as long as `radius_meters` <= `pixel_size_meters * 1000`. * However, for values over 175m, the `DataLayerView` in the request must not include monthly flux or hourly shade. */
  radiusMeters?: number;
  /** Optional. The minimum quality level allowed in the results. No result with lower quality than this will be returned. Not specifying this is equivalent to restricting to HIGH quality only. */
  requiredQuality?:
    | "IMAGERY_QUALITY_UNSPECIFIED"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "BASE"
    | (string & {});
  /** Optional. The minimum scale, in meters per pixel, of the data to return. Values of 0.1 (the default, if this field is not set explicitly), 0.25, 0.5, and 1.0 are supported. Imagery components whose normal resolution is less than `pixel_size_meters` will be returned at the resolution specified by `pixel_size_meters`; imagery components whose normal resolution is equal to or greater than `pixel_size_meters` will be returned at that normal resolution. */
  pixelSizeMeters?: number;
  /** Optional. Whether to require exact quality of the imagery. If set to false, the `required_quality` field is interpreted as the minimum required quality, such that HIGH quality imagery may be returned when `required_quality` is set to MEDIUM. If set to true, `required_quality` is interpreted as the exact required quality and only `MEDIUM` quality imagery is returned if `required_quality` is set to `MEDIUM`. */
  exactQualityRequired?: boolean;
  /** Optional. Specifies the pre-GA experiments to enable. Requests using this field are classified as a pre-GA offering under the [Google Maps Platform Service Specific Terms](https://cloud.google.com/maps-platform/terms/maps-service-terms). See [launch stage descriptions]( https://cloud.google.com/maps-platform/terms/launch-stages) for more details. */
  experiments?:
    | "EXPERIMENT_UNSPECIFIED"
    | "EXPANDED_COVERAGE"
    | (string & {})[];
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  "location.latitude"?: number;
}

export const GetDataLayersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "location.longitude": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("location.longitude"),
  ),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  radiusMeters: Schema.optional(Schema.Number).pipe(
    T.HttpQuery("radiusMeters"),
  ),
  requiredQuality: Schema.optional(Schema.String).pipe(
    T.HttpQuery("requiredQuality"),
  ),
  pixelSizeMeters: Schema.optional(Schema.Number).pipe(
    T.HttpQuery("pixelSizeMeters"),
  ),
  exactQualityRequired: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("exactQualityRequired"),
  ),
  experiments: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("experiments"),
  ),
  "location.latitude": Schema.optional(Schema.Number).pipe(
    T.HttpQuery("location.latitude"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/dataLayers:get" }),
  svc,
) as unknown as Schema.Schema<GetDataLayersRequest>;

export type GetDataLayersResponse = DataLayers;
export const GetDataLayersResponse = /*@__PURE__*/ /*#__PURE__*/ DataLayers;

export type GetDataLayersError = DefaultErrors;

/** Gets solar information for a region surrounding a location. Returns an error with code `NOT_FOUND` if the location is outside the coverage area. */
export const getDataLayers: API.OperationMethod<
  GetDataLayersRequest,
  GetDataLayersResponse,
  GetDataLayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDataLayersRequest,
  output: GetDataLayersResponse,
  errors: [],
}));
