// ==========================================================================
// Merchant API (merchantapi accounts_v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "merchantapi",
  version: "accounts_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AutofeedSettings {
  /** Required. Enables or disables product crawling through the autofeed for the given account. Autofeed accounts must meet [certain conditions](https://support.google.com/merchants/answer/7538732#Configure_automated_feeds_Standard_Experience), which can be checked through the `eligible` field. The account must **not** be a marketplace. When the autofeed is enabled for the first time, the products usually appear instantly. When re-enabling, it might take up to 24 hours for products to appear. */
  enableProducts?: boolean;
  /** Output only. Determines whether the business is eligible for being enrolled into an autofeed. */
  eligible?: boolean;
  /** Identifier. The resource name of the autofeed settings. Format: `accounts/{account}/autofeedSettings`. */
  name?: string;
}

export const AutofeedSettings: Schema.Schema<AutofeedSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      enableProducts: Schema.optional(Schema.Boolean),
      eligible: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AutofeedSettings",
}) as any as Schema.Schema<AutofeedSettings>;

export interface Distance {
  /** Integer value of distance. */
  value?: string;
  /** Unit can differ based on country, it is parameterized to include miles and kilometers. */
  unit?: "UNIT_UNSPECIFIED" | "MILES" | "KILOMETERS" | (string & {});
}

export const Distance: Schema.Schema<Distance> = Schema.suspend(() =>
  Schema.Struct({
    value: Schema.optional(Schema.String),
    unit: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Distance" }) as any as Schema.Schema<Distance>;

export interface LocalCutoffTime {
  /** Hour local delivery orders must be placed by to process the same day. */
  hour?: string;
  /** Minute local delivery orders must be placed by to process the same day. */
  minute?: string;
}

export const LocalCutoffTime: Schema.Schema<LocalCutoffTime> = Schema.suspend(
  () =>
    Schema.Struct({
      hour: Schema.optional(Schema.String),
      minute: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LocalCutoffTime",
}) as any as Schema.Schema<LocalCutoffTime>;

export interface CutoffConfig {
  /** Only valid with local delivery fulfillment. Represents cutoff time as the number of hours before store closing. Mutually exclusive with `local_cutoff_time`. */
  storeCloseOffsetHours?: string;
  /** Time that local delivery ends for the day. */
  localCutoffTime?: LocalCutoffTime;
  /** Businesses can opt-out of showing n+1 day local delivery when they have a shipping service configured to n day local delivery. For example, if the shipping service defines same-day delivery, and it's past the cut-off, setting this field to `true` results in the calculated shipping service rate returning `NO_DELIVERY_POST_CUTOFF`. In the same example, setting this field to `false` results in the calculated shipping time being one day. This is only for local delivery. */
  noDeliveryPostCutoff?: boolean;
}

export const CutoffConfig: Schema.Schema<CutoffConfig> = Schema.suspend(() =>
  Schema.Struct({
    storeCloseOffsetHours: Schema.optional(Schema.String),
    localCutoffTime: Schema.optional(LocalCutoffTime),
    noDeliveryPostCutoff: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "CutoffConfig",
}) as any as Schema.Schema<CutoffConfig>;

export interface StoreConfig {
  /** Maximum delivery radius. This is only required for the local delivery shipment type. */
  serviceRadius?: Distance;
  /** Optional. A list of store codes that provide local delivery. If empty, then `all_stores` must be true. */
  storeCodes?: Array<string>;
  /** Indicates whether all stores, or selected stores, listed by this business provide local delivery. */
  storeServiceType?:
    | "STORE_SERVICE_TYPE_UNSPECIFIED"
    | "ALL_STORES"
    | "SELECTED_STORES"
    | (string & {});
  /** Configs related to local delivery ends for the day. */
  cutoffConfig?: CutoffConfig;
}

export const StoreConfig: Schema.Schema<StoreConfig> = Schema.suspend(() =>
  Schema.Struct({
    serviceRadius: Schema.optional(Distance),
    storeCodes: Schema.optional(Schema.Array(Schema.String)),
    storeServiceType: Schema.optional(Schema.String),
    cutoffConfig: Schema.optional(CutoffConfig),
  }),
).annotate({ identifier: "StoreConfig" }) as any as Schema.Schema<StoreConfig>;

export interface Price {
  /** The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros). */
  amountMicros?: string;
  /** The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217). */
  currencyCode?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() =>
  Schema.Struct({
    amountMicros: Schema.optional(Schema.String),
    currencyCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface StoreCodeSetWithMov {
  /** Optional. A list of unique store codes or empty for the catch all. */
  storeCodes?: Array<string>;
  /** The minimum order value for the given stores. */
  value?: Price;
}

export const StoreCodeSetWithMov: Schema.Schema<StoreCodeSetWithMov> =
  Schema.suspend(() =>
    Schema.Struct({
      storeCodes: Schema.optional(Schema.Array(Schema.String)),
      value: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "StoreCodeSetWithMov",
  }) as any as Schema.Schema<StoreCodeSetWithMov>;

export interface MinimumOrderValueTable {
  /** Required. A list of store code sets sharing the same minimum order value (MOV). At least two sets are required and the last one must be empty, which signifies 'MOV for all other stores'. Each store code can only appear once across all the sets. All prices within a service must have the same currency. */
  storeCodeSetWithMovs?: Array<StoreCodeSetWithMov>;
}

export const MinimumOrderValueTable: Schema.Schema<MinimumOrderValueTable> =
  Schema.suspend(() =>
    Schema.Struct({
      storeCodeSetWithMovs: Schema.optional(Schema.Array(StoreCodeSetWithMov)),
    }),
  ).annotate({
    identifier: "MinimumOrderValueTable",
  }) as any as Schema.Schema<MinimumOrderValueTable>;

export interface LoyaltyProgramTiers {
  /** The tier label [tier_label] sub-attribute differentiates offer level benefits between each tier. This value is also set in your program settings in Merchant Center, and is required for data source changes even if your loyalty program only has 1 tier. */
  tierLabel?: string;
}

export const LoyaltyProgramTiers: Schema.Schema<LoyaltyProgramTiers> =
  Schema.suspend(() =>
    Schema.Struct({
      tierLabel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LoyaltyProgramTiers",
  }) as any as Schema.Schema<LoyaltyProgramTiers>;

export interface LoyaltyProgram {
  /** Optional. Loyalty program tier of this shipping service. */
  loyaltyProgramTiers?: Array<LoyaltyProgramTiers>;
  /** This is the loyalty program label set in your loyalty program settings in Merchant Center. This sub-attribute allows Google to map your loyalty program to eligible offers. */
  programLabel?: string;
}

export const LoyaltyProgram: Schema.Schema<LoyaltyProgram> = Schema.suspend(
  () =>
    Schema.Struct({
      loyaltyProgramTiers: Schema.optional(Schema.Array(LoyaltyProgramTiers)),
      programLabel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LoyaltyProgram",
}) as any as Schema.Schema<LoyaltyProgram>;

export interface Value {
  /** The name of a subtable. Can only be set in table cells (For example, not for single values), and only if all other fields are not set. */
  subtable?: string;
  /** A percentage of the price represented as a number in decimal notation (For example, `"5.4"`). Can only be set if all other fields are not set. */
  pricePercentage?: string;
  /** The name of a carrier rate referring to a carrier rate defined in the same rate group. Can only be set if all other fields are not set. */
  carrierRate?: string;
  /** If true, then the product can't be shipped. Must be true when set, can only be set if all other fields are not set. */
  noShipping?: boolean;
  /** A flat rate. Can only be set if all other fields are not set. */
  flatRate?: Price;
}

export const Value: Schema.Schema<Value> = Schema.suspend(() =>
  Schema.Struct({
    subtable: Schema.optional(Schema.String),
    pricePercentage: Schema.optional(Schema.String),
    carrierRate: Schema.optional(Schema.String),
    noShipping: Schema.optional(Schema.Boolean),
    flatRate: Schema.optional(Price),
  }),
).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface Row {
  /** Required. The list of cells that constitute the row. Must have the same length as `columnHeaders` for two-dimensional tables, a length of 1 for one-dimensional tables. */
  cells?: Array<Value>;
}

export const Row: Schema.Schema<Row> = Schema.suspend(() =>
  Schema.Struct({
    cells: Schema.optional(Schema.Array(Value)),
  }),
).annotate({ identifier: "Row" }) as any as Schema.Schema<Row>;

export interface Weight {
  /** Required. The weight represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 kg = 1000000 micros). This field can also be set as infinity by setting to -1. This field only support -1 and positive value. */
  amountMicros?: string;
  /** Required. The weight unit. Acceptable values are: kg and lb */
  unit?: "WEIGHT_UNIT_UNSPECIFIED" | "POUND" | "KILOGRAM" | (string & {});
}

export const Weight: Schema.Schema<Weight> = Schema.suspend(() =>
  Schema.Struct({
    amountMicros: Schema.optional(Schema.String),
    unit: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Weight" }) as any as Schema.Schema<Weight>;

export interface LocationIdSet {
  /** Required. A non-empty list of [location IDs](https://developers.google.com/adwords/api/docs/appendix/geotargeting). They must all be of the same location type (For example, state). */
  locationIds?: Array<string>;
}

export const LocationIdSet: Schema.Schema<LocationIdSet> = Schema.suspend(() =>
  Schema.Struct({
    locationIds: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "LocationIdSet",
}) as any as Schema.Schema<LocationIdSet>;

export interface Headers {
  /** Required. A list of inclusive order weight upper bounds. The last weight's value can be infinity by setting price amount_micros = -1. For example `[{"amount_micros": 10000000, "unit": "kg"}, {"amount_micros": 50000000, "unit": "kg"}, {"amount_micros": -1, "unit": "kg"}]` represents the headers "<= 10kg", "<= 50kg", and "> 50kg". All weights within a service must have the same unit. Must be non-empty. Must be positive except -1. Can only be set if all other fields are not set. */
  weights?: Array<Weight>;
  /** Required. A list of inclusive order price upper bounds. The last price's value can be infinity by setting price amount_micros = -1. For example `[{"amount_micros": 10000000, "currency_code": "USD"}, {"amount_micros": 500000000, "currency_code": "USD"}, {"amount_micros": -1, "currency_code": "USD"}]` represents the headers "<= $10", "<= $500", and "> $500". All prices within a service must have the same currency. Must be non-empty. Must be positive except -1. Can only be set if all other fields are not set. */
  prices?: Array<Price>;
  /** Required. A list of inclusive number of items upper bounds. The last value can be `"infinity"`. For example `["10", "50", "infinity"]` represents the headers "<= 10 items", "<= 50 items", and "> 50 items". Must be non-empty. Can only be set if all other fields are not set. */
  numberOfItems?: Array<string>;
  /** Required. A list of location ID sets. Must be non-empty. Can only be set if all other fields are not set. */
  locations?: Array<LocationIdSet>;
  /** Required. A list of postal group names. The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service. Must be non-empty. Can only be set if all other fields are not set. */
  postalCodeGroupNames?: Array<string>;
}

export const Headers: Schema.Schema<Headers> = Schema.suspend(() =>
  Schema.Struct({
    weights: Schema.optional(Schema.Array(Weight)),
    prices: Schema.optional(Schema.Array(Price)),
    numberOfItems: Schema.optional(Schema.Array(Schema.String)),
    locations: Schema.optional(Schema.Array(LocationIdSet)),
    postalCodeGroupNames: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Headers" }) as any as Schema.Schema<Headers>;

export interface Table {
  /** Name of the table. Required for subtables, ignored for the main table. */
  name?: string;
  /** Required. The list of rows that constitute the table. Must have the same length as `row_headers`. */
  rows?: Array<Row>;
  /** Required. Headers of the table's rows. */
  rowHeaders?: Headers;
  /** Headers of the table's columns. Optional: if not set then the table has only one dimension. */
  columnHeaders?: Headers;
}

export const Table: Schema.Schema<Table> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    rows: Schema.optional(Schema.Array(Row)),
    rowHeaders: Schema.optional(Headers),
    columnHeaders: Schema.optional(Headers),
  }),
).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface CarrierRate {
  /** Required. Carrier service, such as `"ground"` or `"2 days"`. */
  carrierService?: string;
  /** Optional. Additive shipping rate modifier. Can be negative. For example `{ "amount_micros": 1, "currency_code" : "USD" }` adds $1 to the rate, `{ "amount_micros": -3, "currency_code" : "USD" }` removes $3 from the rate. */
  flatAdjustment?: Price;
  /** Optional. Multiplicative shipping rate modifier as a number in decimal notation. Can be negative. For example `"5.4"` increases the rate by 5.4%, `"-3"` decreases the rate by 3%. */
  percentageAdjustment?: string;
  /** Required. Name of the carrier rate. Must be unique per rate group. */
  name?: string;
  /** Required. Carrier service, such as `"UPS"` or `"Fedex"`. */
  carrier?: string;
  /** Required. Shipping origin for this carrier rate. */
  originPostalCode?: string;
}

export const CarrierRate: Schema.Schema<CarrierRate> = Schema.suspend(() =>
  Schema.Struct({
    carrierService: Schema.optional(Schema.String),
    flatAdjustment: Schema.optional(Price),
    percentageAdjustment: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    carrier: Schema.optional(Schema.String),
    originPostalCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CarrierRate" }) as any as Schema.Schema<CarrierRate>;

export interface RateGroup {
  /** Required. A list of [shipping labels](https://support.google.com/merchants/answer/6324504) defining the products to which this rate group applies to. This is a disjunction: only one of the labels has to match for the rate group to apply. May only be empty for the last rate group of a service. */
  applicableShippingLabels?: Array<string>;
  /** Optional. A list of subtables referred to by `main_table`. Can only be set if `main_table` is set. */
  subtables?: Array<Table>;
  /** Optional. Name of the rate group. If set has to be unique within shipping service. */
  name?: string;
  /** Optional. A list of carrier rates that can be referred to by `main_table` or `single_value`. */
  carrierRates?: Array<CarrierRate>;
  /** The value of the rate group (For example flat rate $10). Can only be set if `main_table` and `subtables` are not set. */
  singleValue?: Value;
  /** A table defining the rate group, when `single_value` is not expressive enough. Can only be set if `single_value` is not set. */
  mainTable?: Table;
}

export const RateGroup: Schema.Schema<RateGroup> = Schema.suspend(() =>
  Schema.Struct({
    applicableShippingLabels: Schema.optional(Schema.Array(Schema.String)),
    subtables: Schema.optional(Schema.Array(Table)),
    name: Schema.optional(Schema.String),
    carrierRates: Schema.optional(Schema.Array(CarrierRate)),
    singleValue: Schema.optional(Value),
    mainTable: Schema.optional(Table),
  }),
).annotate({ identifier: "RateGroup" }) as any as Schema.Schema<RateGroup>;

export interface BusinessDayConfig {
  /** Required. Regular business days. May not be empty. */
  businessDays?: Array<
    | "WEEKDAY_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {})
  >;
}

export const BusinessDayConfig: Schema.Schema<BusinessDayConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      businessDays: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BusinessDayConfig",
  }) as any as Schema.Schema<BusinessDayConfig>;

export interface WarehouseBasedDeliveryTime {
  /** Required. Carrier service, such as `"ground"` or `"2 days"`. The name of the service must be in the eddSupportedServices list. */
  carrierService?: string;
  /** Required. Carrier, such as `"UPS"` or `"Fedex"`. [supported carriers](https://support.google.com/merchants/answer/7050921#zippy=%2Ccarrier-rates-au-de-uk-and-us-only) */
  carrier?: string;
  /** Required. Warehouse name. This should match warehouse. */
  warehouse?: string;
}

export const WarehouseBasedDeliveryTime: Schema.Schema<WarehouseBasedDeliveryTime> =
  Schema.suspend(() =>
    Schema.Struct({
      carrierService: Schema.optional(Schema.String),
      carrier: Schema.optional(Schema.String),
      warehouse: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WarehouseBasedDeliveryTime",
  }) as any as Schema.Schema<WarehouseBasedDeliveryTime>;

export interface TransitTimeValue {
  /** Must be greater than or equal to `min_transit_days`. */
  maxTransitDays?: number;
  /** Minimum transit time range in business days. 0 means same day delivery, 1 means next day delivery. */
  minTransitDays?: number;
}

export const TransitTimeValue: Schema.Schema<TransitTimeValue> = Schema.suspend(
  () =>
    Schema.Struct({
      maxTransitDays: Schema.optional(Schema.Number),
      minTransitDays: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "TransitTimeValue",
}) as any as Schema.Schema<TransitTimeValue>;

export interface TransitTimeRow {
  /** Required. Transit time range (min-max) in business days. */
  values?: Array<TransitTimeValue>;
}

export const TransitTimeRow: Schema.Schema<TransitTimeRow> = Schema.suspend(
  () =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(TransitTimeValue)),
    }),
).annotate({
  identifier: "TransitTimeRow",
}) as any as Schema.Schema<TransitTimeRow>;

export interface TransitTable {
  /** Required. A list of region names Region.name . The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service. */
  postalCodeGroupNames?: Array<string>;
  /** Required. A list of transit time labels. The last value can be `"all other labels"`. Example: `["food", "electronics", "all other labels"]`. */
  transitTimeLabels?: Array<string>;
  /** Required. If there's only one dimension set of `postal_code_group_names` or `transit_time_labels`, there are multiple rows each with one value for that dimension. If there are two dimensions, each row corresponds to a `postal_code_group_names`, and columns (values) to a `transit_time_labels`. */
  rows?: Array<TransitTimeRow>;
}

export const TransitTable: Schema.Schema<TransitTable> = Schema.suspend(() =>
  Schema.Struct({
    postalCodeGroupNames: Schema.optional(Schema.Array(Schema.String)),
    transitTimeLabels: Schema.optional(Schema.Array(Schema.String)),
    rows: Schema.optional(Schema.Array(TransitTimeRow)),
  }),
).annotate({
  identifier: "TransitTable",
}) as any as Schema.Schema<TransitTable>;

export interface CutoffTime {
  /** Required. Hour of the cutoff time until which an order has to be placed to be processed in the same day. */
  hour?: number;
  /** Required. Minute of the cutoff time until which an order has to be placed to be processed in the same day. */
  minute?: number;
  /** Required. [Timezone identifier](https://developers.google.com/adwords/api/docs/appendix/codes-formats#timezone-ids) For example "Europe/Zurich". */
  timeZone?: string;
}

export const CutoffTime: Schema.Schema<CutoffTime> = Schema.suspend(() =>
  Schema.Struct({
    hour: Schema.optional(Schema.Number),
    minute: Schema.optional(Schema.Number),
    timeZone: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CutoffTime" }) as any as Schema.Schema<CutoffTime>;

export interface DeliveryTime {
  /** Maximum number of business days that is spent in transit. 0 means same day delivery, 1 means next day delivery. Must be greater than or equal to `min_transit_days`. */
  maxTransitDays?: number;
  /** The business days during which orders can be handled. If not provided, Monday to Friday business days will be assumed. */
  handlingBusinessDayConfig?: BusinessDayConfig;
  /** The business days during which orders can be in-transit. If not provided, Monday to Friday business days will be assumed. */
  transitBusinessDayConfig?: BusinessDayConfig;
  /** Optional. Indicates that the delivery time should be calculated per warehouse (shipping origin location) based on the settings of the selected carrier. When set, no other transit time related field in delivery time should be set. */
  warehouseBasedDeliveryTimes?: Array<WarehouseBasedDeliveryTime>;
  /** Transit time table, number of business days spent in transit based on row and column dimensions. Either `min_transit_days`, `max_transit_days` or `transit_time_table` can be set, but not both. */
  transitTimeTable?: TransitTable;
  /** Minimum number of business days that is spent in transit. 0 means same day delivery, 1 means next day delivery. Either `min_transit_days`, `max_transit_days` or `transit_time_table` must be set, but not both. */
  minTransitDays?: number;
  /** Maximum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. Must be greater than or equal to `min_handling_days`. 'min_handling_days' and 'max_handling_days' should be either set or not set at the same time. */
  maxHandlingDays?: number;
  /** Business days cutoff time definition. If not configured the cutoff time will be defaulted to 8AM PST. */
  cutoffTime?: CutoffTime;
  /** Minimum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. 'min_handling_days' and 'max_handling_days' should be either set or not set at the same time. */
  minHandlingDays?: number;
}

export const DeliveryTime: Schema.Schema<DeliveryTime> = Schema.suspend(() =>
  Schema.Struct({
    maxTransitDays: Schema.optional(Schema.Number),
    handlingBusinessDayConfig: Schema.optional(BusinessDayConfig),
    transitBusinessDayConfig: Schema.optional(BusinessDayConfig),
    warehouseBasedDeliveryTimes: Schema.optional(
      Schema.Array(WarehouseBasedDeliveryTime),
    ),
    transitTimeTable: Schema.optional(TransitTable),
    minTransitDays: Schema.optional(Schema.Number),
    maxHandlingDays: Schema.optional(Schema.Number),
    cutoffTime: Schema.optional(CutoffTime),
    minHandlingDays: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "DeliveryTime",
}) as any as Schema.Schema<DeliveryTime>;

export interface Service {
  /** A list of stores your products are delivered from. This is only valid for the local delivery shipment type. */
  storeConfig?: StoreConfig;
  /** Optional. Type of locations this service ships orders to. */
  shipmentType?:
    | "SHIPMENT_TYPE_UNSPECIFIED"
    | "DELIVERY"
    | "LOCAL_DELIVERY"
    | "COLLECTION_POINT"
    | (string & {});
  /** Optional. Table of per store minimum order values for the pickup fulfillment type. Cannot be set together with `minimum_order_value`. */
  minimumOrderValueTable?: MinimumOrderValueTable;
  /** Optional. Loyalty programs that this shipping service is limited to. */
  loyaltyPrograms?: Array<LoyaltyProgram>;
  /** Required. Free-form name of the service. Must be unique within target account. */
  serviceName?: string;
  /** Required. A boolean exposing the active status of the shipping service. */
  active?: boolean;
  /** Required. The CLDR territory code of the countries to which the service applies. */
  deliveryCountries?: Array<string>;
  /** Optional. Shipping rate group definitions. Only the last one is allowed to have an empty `applicable_shipping_labels`, which means "everything else". The other `applicable_shipping_labels` must not overlap. */
  rateGroups?: Array<RateGroup>;
  /** Optional. Minimum order value for this service. If set, indicates that customers will have to spend at least this amount. All prices within a service must have the same currency. Cannot be set together with `minimum_order_value_table`. */
  minimumOrderValue?: Price;
  /** Required. The CLDR code of the currency to which this service applies. Must match that of the prices in rate groups. */
  currencyCode?: string;
  /** Required. Time spent in various aspects from order to the delivery of the product. */
  deliveryTime?: DeliveryTime;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() =>
  Schema.Struct({
    storeConfig: Schema.optional(StoreConfig),
    shipmentType: Schema.optional(Schema.String),
    minimumOrderValueTable: Schema.optional(MinimumOrderValueTable),
    loyaltyPrograms: Schema.optional(Schema.Array(LoyaltyProgram)),
    serviceName: Schema.optional(Schema.String),
    active: Schema.optional(Schema.Boolean),
    deliveryCountries: Schema.optional(Schema.Array(Schema.String)),
    rateGroups: Schema.optional(Schema.Array(RateGroup)),
    minimumOrderValue: Schema.optional(Price),
    currencyCode: Schema.optional(Schema.String),
    deliveryTime: Schema.optional(DeliveryTime),
  }),
).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface WarehouseCutoffTime {
  /** Required. Hour of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Hour is based on the timezone of warehouse. */
  hour?: number;
  /** Required. Minute of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Minute is based on the timezone of warehouse. */
  minute?: number;
}

export const WarehouseCutoffTime: Schema.Schema<WarehouseCutoffTime> =
  Schema.suspend(() =>
    Schema.Struct({
      hour: Schema.optional(Schema.Number),
      minute: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "WarehouseCutoffTime",
  }) as any as Schema.Schema<WarehouseCutoffTime>;

export interface Address {
  /** Required. Postal code or ZIP (For example "94043"). */
  postalCode?: string;
  /** Street-level part of the address. For example: `111w 31st Street`. */
  streetAddress?: string;
  /** Required. [CLDR country code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) (For example "US"). */
  regionCode?: string;
  /** Required. City, town or commune. May also include dependent localities or sublocalities (For example neighborhoods or suburbs). */
  city?: string;
  /** Required. Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC"). */
  administrativeArea?: string;
}

export const Address: Schema.Schema<Address> = Schema.suspend(() =>
  Schema.Struct({
    postalCode: Schema.optional(Schema.String),
    streetAddress: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    city: Schema.optional(Schema.String),
    administrativeArea: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface Warehouse {
  /** Required. The latest time of day that an order can be accepted and begin processing. Later orders will be processed in the next day. The time is based on the warehouse postal code. */
  cutoffTime?: WarehouseCutoffTime;
  /** Required. The name of the warehouse. Must be unique within account. */
  name?: string;
  /** Required. Shipping address of the warehouse. */
  shippingAddress?: Address;
  /** Business days of the warehouse. If not set, will be Monday to Friday by default. */
  businessDayConfig?: BusinessDayConfig;
  /** Required. The number of days it takes for this warehouse to pack up and ship an item. This is on the warehouse level, but can be overridden on the offer level based on the attributes of an item. */
  handlingDays?: string;
}

export const Warehouse: Schema.Schema<Warehouse> = Schema.suspend(() =>
  Schema.Struct({
    cutoffTime: Schema.optional(WarehouseCutoffTime),
    name: Schema.optional(Schema.String),
    shippingAddress: Schema.optional(Address),
    businessDayConfig: Schema.optional(BusinessDayConfig),
    handlingDays: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Warehouse" }) as any as Schema.Schema<Warehouse>;

export interface ShippingSettings {
  /** Identifier. The resource name of the shipping settings. Format: `accounts/{account}/shippingSettings`. For example, `accounts/123456/shippingSettings`. */
  name?: string;
  /** Optional. The target account's list of services. */
  services?: Array<Service>;
  /** Optional. A list of warehouses which can be referred to in `services`. */
  warehouses?: Array<Warehouse>;
  /** Required. This field helps avoid async issues. It ensures that the shipping setting data doesn't change between the `get` call and the `insert` call. The user should follow these steps: 1. Set the etag field as an empty string for the initial shipping setting creation. 2. After the initial creation, call the `get` method to obtain an etag and the current shipping setting data before calling `insert`. 3. Modify the shipping setting information. 4. Call the `insert` method with the shipping setting information and the etag obtained in step 2. 5. If the shipping setting data changes between step 2 and step 4, the insert request will fail because the etag changes every time the shipping setting data changes. In this case, the user should repeat steps 2-4 with the new etag. */
  etag?: string;
}

export const ShippingSettings: Schema.Schema<ShippingSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      services: Schema.optional(Schema.Array(Service)),
      warehouses: Schema.optional(Schema.Array(Warehouse)),
      etag: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ShippingSettings",
}) as any as Schema.Schema<ShippingSettings>;

export interface PostalCodeRange {
  /** Optional. A postal code or a pattern of the form `prefix*` denoting the inclusive upper bound of the range defining the area. It must have the same length as postalCodeRangeBegin: if postalCodeRangeBegin is a postal code then postalCodeRangeEnd must be a postal code too; if postalCodeRangeBegin is a pattern then postalCodeRangeEnd must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching postalCodeRangeBegin. */
  end?: string;
  /** Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: `94108`, `9410*`, `9*`. */
  begin?: string;
}

export const PostalCodeRange: Schema.Schema<PostalCodeRange> = Schema.suspend(
  () =>
    Schema.Struct({
      end: Schema.optional(Schema.String),
      begin: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PostalCodeRange",
}) as any as Schema.Schema<PostalCodeRange>;

export interface PostalCodeArea {
  /** Required. [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) or the country the postal code group applies to. */
  regionCode?: string;
  /** Required. A range of postal codes. */
  postalCodes?: Array<PostalCodeRange>;
}

export const PostalCodeArea: Schema.Schema<PostalCodeArea> = Schema.suspend(
  () =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
      postalCodes: Schema.optional(Schema.Array(PostalCodeRange)),
    }),
).annotate({
  identifier: "PostalCodeArea",
}) as any as Schema.Schema<PostalCodeArea>;

export interface ItemUpdatesAccountLevelSettings {
  /** If condition updates are enabled, Google always updates item condition with the condition detected from the details of your product. */
  allowConditionUpdates?: boolean;
  /** If price updates are enabled, Google always updates the active price with the crawled information. */
  allowPriceUpdates?: boolean;
  /** If `allow_availability_updates` is enabled, items are automatically updated in all your Shopping target countries. By default, availability updates will only be applied to items that are 'out of stock' on your website but 'in stock' on Shopping. Set this to true to also update items that are 'in stock' on your website, but 'out of stock' on Google Shopping. In order for this field to have an effect, you must also set `allow_availability_updates`. */
  allowStrictAvailabilityUpdates?: boolean;
  /** If availability updates are enabled, any previous availability values get overwritten if Google finds an out-of-stock annotation on the offer's page. If additionally `allow_strict_availability_updates` field is set to true, values get overwritten if Google finds an in-stock annotation on the offer’s page. */
  allowAvailabilityUpdates?: boolean;
}

export const ItemUpdatesAccountLevelSettings: Schema.Schema<ItemUpdatesAccountLevelSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      allowConditionUpdates: Schema.optional(Schema.Boolean),
      allowPriceUpdates: Schema.optional(Schema.Boolean),
      allowStrictAvailabilityUpdates: Schema.optional(Schema.Boolean),
      allowAvailabilityUpdates: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ItemUpdatesAccountLevelSettings",
  }) as any as Schema.Schema<ItemUpdatesAccountLevelSettings>;

export interface AutomaticItemUpdates {
  /** Output only. The effective value of allow_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. The default value is true if no settings are present. Read-only. */
  effectiveAllowAvailabilityUpdates?: boolean;
  /** Output only. The effective value of allow_condition_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. The default value is true if no settings are present. Read-only. */
  effectiveAllowConditionUpdates?: boolean;
  /** Optional. Determines which attributes of the items should be automatically updated. If this field is not present and provided in the update mask, then the settings will be deleted. If there are no settings for subaccount, they are inherited from aggregator. */
  accountItemUpdatesSettings?: ItemUpdatesAccountLevelSettings;
  /** Output only. The effective value of allow_price_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. The default value is true if no settings are present. Read-only. */
  effectiveAllowPriceUpdates?: boolean;
  /** Output only. The effective value of allow_strict_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. The default value is true if no settings are present. Read-only. */
  effectiveAllowStrictAvailabilityUpdates?: boolean;
}

export const AutomaticItemUpdates: Schema.Schema<AutomaticItemUpdates> =
  Schema.suspend(() =>
    Schema.Struct({
      effectiveAllowAvailabilityUpdates: Schema.optional(Schema.Boolean),
      effectiveAllowConditionUpdates: Schema.optional(Schema.Boolean),
      accountItemUpdatesSettings: Schema.optional(
        ItemUpdatesAccountLevelSettings,
      ),
      effectiveAllowPriceUpdates: Schema.optional(Schema.Boolean),
      effectiveAllowStrictAvailabilityUpdates: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AutomaticItemUpdates",
  }) as any as Schema.Schema<AutomaticItemUpdates>;

export interface Requirement {
  /** Output only. The regions that are currently affected by this requirement not being met. Region codes are defined by [CLDR](https://cldr.unicode.org/). This is either a country where the program applies specifically to that country or `001` when the program applies globally. */
  affectedRegionCodes?: Array<string>;
  /** Output only. Name of the requirement. */
  title?: string;
  /** Output only. The URL of a help page describing the requirement. */
  documentationUri?: string;
}

export const Requirement: Schema.Schema<Requirement> = Schema.suspend(() =>
  Schema.Struct({
    affectedRegionCodes: Schema.optional(Schema.Array(Schema.String)),
    title: Schema.optional(Schema.String),
    documentationUri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Requirement" }) as any as Schema.Schema<Requirement>;

export interface LinkGbpAccountRequest {
  /** Required. The email address of the Business Profile account. */
  gbpEmail?: string;
}

export const LinkGbpAccountRequest: Schema.Schema<LinkGbpAccountRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      gbpEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LinkGbpAccountRequest",
  }) as any as Schema.Schema<LinkGbpAccountRequest>;

export interface IdentityAttribute {
  /** Required. The declaration of identity for this attribute. */
  identityDeclaration?:
    | "IDENTITY_DECLARATION_UNSPECIFIED"
    | "SELF_IDENTIFIES_AS"
    | "DOES_NOT_SELF_IDENTIFY_AS"
    | (string & {});
}

export const IdentityAttribute: Schema.Schema<IdentityAttribute> =
  Schema.suspend(() =>
    Schema.Struct({
      identityDeclaration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IdentityAttribute",
  }) as any as Schema.Schema<IdentityAttribute>;

export interface BusinessIdentity {
  /** Required. Whether the identity attributes may be used for promotions. */
  promotionsConsent?:
    | "PROMOTIONS_CONSENT_UNSPECIFIED"
    | "PROMOTIONS_CONSENT_GIVEN"
    | "PROMOTIONS_CONSENT_DENIED"
    | (string & {});
  /** Optional. Specifies whether the business identifies itself as being women-owned. This optional field will only be available for businesses with a business country set to `US`. It is also not applicable for marketplaces or marketplace sellers. */
  womenOwned?: IdentityAttribute;
  /** Optional. Specifies whether the business identifies itself as being veteran-owned. This optional field will only be available for businesses with a business country set to `US`. It is also not applicable for marketplaces or marketplace sellers. */
  veteranOwned?: IdentityAttribute;
  /** Optional. Specifies whether the business identifies itself as being latino-owned. This optional field will only be available for businesses with the business country set to `US`. It is also not applicable for marketplaces or marketplace sellers. */
  latinoOwned?: IdentityAttribute;
  /** Identifier. The resource name of the business identity. Format: `accounts/{account}/businessIdentity` */
  name?: string;
  /** Optional. Specifies whether the business identifies itself as being black-owned. This optional field will only be available for businesses with the business country set to `US`. It is also not applicable for marketplaces or marketplace sellers. */
  blackOwned?: IdentityAttribute;
  /** Optional. Specifies whether the business identifies itself as a small business. This optional field will only be available for businesses with a business country set to `US`. It is also not applicable for marketplaces. */
  smallBusiness?: IdentityAttribute;
}

export const BusinessIdentity: Schema.Schema<BusinessIdentity> = Schema.suspend(
  () =>
    Schema.Struct({
      promotionsConsent: Schema.optional(Schema.String),
      womenOwned: Schema.optional(IdentityAttribute),
      veteranOwned: Schema.optional(IdentityAttribute),
      latinoOwned: Schema.optional(IdentityAttribute),
      name: Schema.optional(Schema.String),
      blackOwned: Schema.optional(IdentityAttribute),
      smallBusiness: Schema.optional(IdentityAttribute),
    }),
).annotate({
  identifier: "BusinessIdentity",
}) as any as Schema.Schema<BusinessIdentity>;

export interface ImageImprovementsAccountLevelSettings {
  /** Enables automatic image improvements. */
  allowAutomaticImageImprovements?: boolean;
}

export const ImageImprovementsAccountLevelSettings: Schema.Schema<ImageImprovementsAccountLevelSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      allowAutomaticImageImprovements: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ImageImprovementsAccountLevelSettings",
  }) as any as Schema.Schema<ImageImprovementsAccountLevelSettings>;

export interface AutomaticImageImprovements {
  /** Output only. The effective value of allow_automatic_image_improvements. If account_image_improvements_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowAutomaticImageImprovements?: boolean;
  /** Optional. Determines how the images should be automatically updated. If this field is not present and provided in the update mask, then the settings will be deleted. If there are no settings for subaccount, they are inherited from aggregator. */
  accountImageImprovementsSettings?: ImageImprovementsAccountLevelSettings;
}

export const AutomaticImageImprovements: Schema.Schema<AutomaticImageImprovements> =
  Schema.suspend(() =>
    Schema.Struct({
      effectiveAllowAutomaticImageImprovements: Schema.optional(Schema.Boolean),
      accountImageImprovementsSettings: Schema.optional(
        ImageImprovementsAccountLevelSettings,
      ),
    }),
  ).annotate({
    identifier: "AutomaticImageImprovements",
  }) as any as Schema.Schema<AutomaticImageImprovements>;

export interface AutomaticShippingImprovements {
  /** Enables automatic shipping improvements. */
  allowShippingImprovements?: boolean;
}

export const AutomaticShippingImprovements: Schema.Schema<AutomaticShippingImprovements> =
  Schema.suspend(() =>
    Schema.Struct({
      allowShippingImprovements: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AutomaticShippingImprovements",
  }) as any as Schema.Schema<AutomaticShippingImprovements>;

export interface AutomaticImprovements {
  /** Identifier. The resource name of the automatic improvements. Format: `accounts/{account}/automaticImprovements`. */
  name?: string;
  /** Turning on [item updates](https://support.google.com/merchants/answer/3246284) allows Google to automatically update items for you. When item updates are on, Google uses the structured data markup on the website and advanced data extractors to update the price and availability of the items. When the item updates are off, items with mismatched data aren't shown. This field is only updated (cleared) if provided in the update mask. */
  itemUpdates?: AutomaticItemUpdates;
  /** This improvement will attempt to automatically correct submitted images if they don't meet the [image requirements](https://support.google.com/merchants/answer/6324350), for example, removing overlays. If successful, the image will be replaced and approved. This improvement is only applied to images of disapproved offers. For more information see: [Automatic image improvements](https://support.google.com/merchants/answer/9242973) This field is only updated (cleared) if provided in the update mask. */
  imageImprovements?: AutomaticImageImprovements;
  /** Not available for [advanced accounts](https://support.google.com/merchants/answer/188487). By turning on [automatic shipping improvements](https://support.google.com/merchants/answer/10027038), you are allowing Google to improve the accuracy of your delivery times shown to shoppers using Google. More accurate delivery times, especially when faster, typically lead to better conversion rates. Google will improve your estimated delivery times based on various factors: * Delivery address of an order * Current handling time and shipping time settings * Estimated weekdays or business days * Parcel tracking data This field is only updated (cleared) if provided in the update mask. */
  shippingImprovements?: AutomaticShippingImprovements;
}

export const AutomaticImprovements: Schema.Schema<AutomaticImprovements> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      itemUpdates: Schema.optional(AutomaticItemUpdates),
      imageImprovements: Schema.optional(AutomaticImageImprovements),
      shippingImprovements: Schema.optional(AutomaticShippingImprovements),
    }),
  ).annotate({
    identifier: "AutomaticImprovements",
  }) as any as Schema.Schema<AutomaticImprovements>;

export interface About {
  /** Required. The about page URI. */
  uri?: string;
  /** Output only. The state of the URI. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "FAILED"
    | "RUNNING"
    | "ACTION_REQUIRED"
    | (string & {});
}

export const About: Schema.Schema<About> = Schema.suspend(() =>
  Schema.Struct({
    uri: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "About" }) as any as Schema.Schema<About>;

export interface RequestInventoryVerificationRequest {}

export const RequestInventoryVerificationRequest: Schema.Schema<RequestInventoryVerificationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RequestInventoryVerificationRequest",
  }) as any as Schema.Schema<RequestInventoryVerificationRequest>;

export interface Policy {
  /** Policy type. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "NUMBER_OF_DAYS_AFTER_DELIVERY"
    | "NO_RETURNS"
    | "LIFETIME_RETURNS"
    | (string & {});
  /** The number of days items can be returned after delivery, where one day is defined as 24 hours after the delivery timestamp. Required for `NUMBER_OF_DAYS_AFTER_DELIVERY` returns. */
  days?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    days: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ShortCode {
  /** Required. The BCP-47 region code of the location where calls to this short code can be made, such as "US" and "BB". Reference(s): - http://www.unicode.org/reports/tr35/#unicode_region_subtag */
  regionCode?: string;
  /** Required. The short code digits, without a leading plus ('+') or country calling code. For example "611". */
  number?: string;
}

export const ShortCode: Schema.Schema<ShortCode> = Schema.suspend(() =>
  Schema.Struct({
    regionCode: Schema.optional(Schema.String),
    number: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ShortCode" }) as any as Schema.Schema<ShortCode>;

export interface PhoneNumber {
  /** The phone number's extension. The extension is not standardized in ITU recommendations, except for being defined as a series of numbers with a maximum length of 40 digits. Other than digits, some other dialing characters such as ',' (indicating a wait) or '#' may be stored here. Note that no regions currently use extensions with short codes, so this field is normally only set in conjunction with an E.164 number. It is held separately from the E.164 number to allow for short code extensions in the future. */
  extension?: string;
  /** The phone number, represented as a leading plus sign ('+'), followed by a phone number that uses a relaxed ITU E.164 format consisting of the country calling code (1 to 3 digits) and the subscriber number, with no additional spaces or formatting. For example: - correct: "+15552220123" - incorrect: "+1 (555) 222-01234 x123" The ITU E.164 format limits the latter to 12 digits, but in practice not all countries respect that, so we relax that restriction here. National-only numbers are not allowed. References: - https://www.itu.int/rec/T-REC-E.164-201011-I - https://en.wikipedia.org/wiki/E.164. - https://en.wikipedia.org/wiki/List_of_country_calling_codes */
  e164Number?: string;
  /** A short code. Reference(s): - https://wikipedia.org/wiki/Short_code */
  shortCode?: ShortCode;
}

export const PhoneNumber: Schema.Schema<PhoneNumber> = Schema.suspend(() =>
  Schema.Struct({
    extension: Schema.optional(Schema.String),
    e164Number: Schema.optional(Schema.String),
    shortCode: Schema.optional(ShortCode),
  }),
).annotate({ identifier: "PhoneNumber" }) as any as Schema.Schema<PhoneNumber>;

export interface SetAliasForRelationship {
  /** Required. The unique ID of this account in the provider's system. The value must be unique across all accounts on the platform for this provider. */
  accountIdAlias?: string;
  /** Required. The provider of the service. This is a reference to an account such as `providers/123` or `accounts/123`. The same provider must be specified in at least one of the `service` fields. */
  provider?: string;
}

export const SetAliasForRelationship: Schema.Schema<SetAliasForRelationship> =
  Schema.suspend(() =>
    Schema.Struct({
      accountIdAlias: Schema.optional(Schema.String),
      provider: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetAliasForRelationship",
  }) as any as Schema.Schema<SetAliasForRelationship>;

export interface GeoTargetArea {
  /** Required. A non-empty list of [location IDs](https://developers.google.com/adwords/api/docs/appendix/geotargeting). They must all be of the same location type (for example, state). */
  geotargetCriteriaIds?: Array<string>;
}

export const GeoTargetArea: Schema.Schema<GeoTargetArea> = Schema.suspend(() =>
  Schema.Struct({
    geotargetCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "GeoTargetArea",
}) as any as Schema.Schema<GeoTargetArea>;

export interface LatLng {
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() =>
  Schema.Struct({
    longitude: Schema.optional(Schema.Number),
    latitude: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface RadiusArea {
  /** Required. The radius distance of the area. */
  radius?: number;
  /** Required. [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) or the country the radius area applies to. */
  regionCode?: string;
  /** Optional. The unit of the radius. */
  radiusUnits?:
    | "RADIUS_UNITS_UNSPECIFIED"
    | "MILES"
    | "KILOMETERS"
    | (string & {});
  /** Required. The center of the radius area. It represents a latitude/longitude pair in decimal degrees format. */
  latLng?: LatLng;
}

export const RadiusArea: Schema.Schema<RadiusArea> = Schema.suspend(() =>
  Schema.Struct({
    radius: Schema.optional(Schema.Number),
    regionCode: Schema.optional(Schema.String),
    radiusUnits: Schema.optional(Schema.String),
    latLng: Schema.optional(LatLng),
  }),
).annotate({ identifier: "RadiusArea" }) as any as Schema.Schema<RadiusArea>;

export interface Region {
  /** Optional. A list of geotargets that defines the region area. */
  geotargetArea?: GeoTargetArea;
  /** Output only. Indicates if the region is eligible for use in the Shipping Services configuration. */
  shippingEligible?: boolean;
  /** Optional. The display name of the region. */
  displayName?: string;
  /** Optional. A list of postal codes that defines the region area. */
  postalCodeArea?: PostalCodeArea;
  /** Optional. A radius area that defines the region area. */
  radiusArea?: RadiusArea;
  /** Identifier. The resource name of the region. Format: `accounts/{account}/regions/{region}` */
  name?: string;
  /** Output only. Indicates if the region is eligible for use in the Regional Inventory configuration. */
  regionalInventoryEligible?: boolean;
}

export const Region: Schema.Schema<Region> = Schema.suspend(() =>
  Schema.Struct({
    geotargetArea: Schema.optional(GeoTargetArea),
    shippingEligible: Schema.optional(Schema.Boolean),
    displayName: Schema.optional(Schema.String),
    postalCodeArea: Schema.optional(PostalCodeArea),
    radiusArea: Schema.optional(RadiusArea),
    name: Schema.optional(Schema.String),
    regionalInventoryEligible: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Region" }) as any as Schema.Schema<Region>;

export interface ListRegionsResponse {
  /** The regions from the specified business. */
  regions?: Array<Region>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListRegionsResponse: Schema.Schema<ListRegionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(Schema.Array(Region)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRegionsResponse",
  }) as any as Schema.Schema<ListRegionsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface LinkGbpAccountResponse {
  /** Empty response. */
  response?: Empty;
}

export const LinkGbpAccountResponse: Schema.Schema<LinkGbpAccountResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Empty),
    }),
  ).annotate({
    identifier: "LinkGbpAccountResponse",
  }) as any as Schema.Schema<LinkGbpAccountResponse>;

export interface Merchantapi_Date {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
}

export const Merchantapi_Date: Schema.Schema<Merchantapi_Date> = Schema.suspend(
  () =>
    Schema.Struct({
      day: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "Merchantapi_Date",
}) as any as Schema.Schema<Merchantapi_Date>;

export interface Accepted {
  /** Required. The account where the acceptance was recorded. This can be the account itself or, in the case of subaccounts, the advanced account. */
  acceptedBy?: string;
  /** Optional. When set, it states that the accepted `TermsOfService` is only valid until the end of this date (in UTC). A new one must be accepted before then. The information of the required `TermsOfService` is found in the `Required` message. */
  validUntil?: Merchantapi_Date;
  /** Required. The accepted termsOfService. */
  termsOfService?: string;
}

export const Accepted: Schema.Schema<Accepted> = Schema.suspend(() =>
  Schema.Struct({
    acceptedBy: Schema.optional(Schema.String),
    validUntil: Schema.optional(Merchantapi_Date),
    termsOfService: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Accepted" }) as any as Schema.Schema<Accepted>;

export interface CampaignsManagement {}

export const CampaignsManagement: Schema.Schema<CampaignsManagement> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CampaignsManagement",
  }) as any as Schema.Schema<CampaignsManagement>;

export interface Program {
  /** Output only. The requirements that the account has not yet satisfied that are affecting participation in the program. */
  unmetRequirements?: Array<Requirement>;
  /** Output only. The participation state of the account in the program. */
  state?:
    | "STATE_UNSPECIFIED"
    | "NOT_ELIGIBLE"
    | "ELIGIBLE"
    | "ENABLED"
    | (string & {});
  /** Output only. The regions in which the account is actively participating in the program. Active regions are defined as those where all program requirements affecting the regions have been met. Region codes are defined by [CLDR](https://cldr.unicode.org/). This is either a country where the program applies specifically to that country or `001` when the program applies globally. */
  activeRegionCodes?: Array<string>;
  /** Output only. The URL of a Merchant Center help page describing the program. */
  documentationUri?: string;
  /** Identifier. The resource name of the program. Format: `accounts/{account}/programs/{program}` */
  name?: string;
}

export const Program: Schema.Schema<Program> = Schema.suspend(() =>
  Schema.Struct({
    unmetRequirements: Schema.optional(Schema.Array(Requirement)),
    state: Schema.optional(Schema.String),
    activeRegionCodes: Schema.optional(Schema.Array(Schema.String)),
    documentationUri: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Program" }) as any as Schema.Schema<Program>;

export interface ListProgramsResponse {
  /** The programs for the given account. */
  programs?: Array<Program>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListProgramsResponse: Schema.Schema<ListProgramsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      programs: Schema.optional(Schema.Array(Program)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListProgramsResponse",
  }) as any as Schema.Schema<ListProgramsResponse>;

export interface LocalListingManagement {}

export const LocalListingManagement: Schema.Schema<LocalListingManagement> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "LocalListingManagement",
  }) as any as Schema.Schema<LocalListingManagement>;

export interface TimeZone {
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface Account {
  /** Required. The account's [BCP-47 language code](https://tools.ietf.org/html/bcp47), such as `en-US` or `sr-Latn`. */
  languageCode?: string;
  /** Required. A human-readable name of the account. Don't use punctuation, capitalization, or non-alphanumeric symbols such as the "/" or "_" symbols. See [Adding a business name](https://support.google.com/merchants/answer/12159159) for more information. */
  accountName?: string;
  /** Output only. Whether this is a test account. */
  testAccount?: boolean;
  /** Optional. Whether this account contains adult content. */
  adultContent?: boolean;
  /** Required. The time zone of the account. On writes, `time_zone` sets both the `reporting_time_zone` and the `display_time_zone`. For reads, `time_zone` always returns the `display_time_zone`. If `display_time_zone` doesn't exist for your account, `time_zone` is empty. The `version` field is not supported, won't be set in responses and will be silently ignored if specified in requests. */
  timeZone?: TimeZone;
  /** Identifier. The resource name of the account. Format: `accounts/{account}` */
  name?: string;
  /** Output only. The ID of the account. */
  accountId?: string;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() =>
  Schema.Struct({
    languageCode: Schema.optional(Schema.String),
    accountName: Schema.optional(Schema.String),
    testAccount: Schema.optional(Schema.Boolean),
    adultContent: Schema.optional(Schema.Boolean),
    timeZone: Schema.optional(TimeZone),
    name: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListSubAccountsResponse {
  /** The accounts for which the given parent account is an aggregator. */
  accounts?: Array<Account>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSubAccountsResponse: Schema.Schema<ListSubAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accounts: Schema.optional(Schema.Array(Account)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSubAccountsResponse",
  }) as any as Schema.Schema<ListSubAccountsResponse>;

export interface GetAccountForGcpRegistrationResponse {
  /** The name of the merchant account id that the GCP is registered with. */
  name?: string;
}

export const GetAccountForGcpRegistrationResponse: Schema.Schema<GetAccountForGcpRegistrationResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GetAccountForGcpRegistrationResponse",
  }) as any as Schema.Schema<GetAccountForGcpRegistrationResponse>;

export interface RegisterGcpRequest {
  /** Immutable. If the developer email provided is associated with a user in the merchant account provided, the user will be updated to have "API developer" access type and the email preference corresponding to that user will be updated to have the new "API notifications" preference. If the developer email provided is not associated with any user we will just add it as a contact. The email preference corresponding to that contact will have the new "API notifications" preference. Make sure the email used is associated with a Google Account (Google Workspace account or Gmail account) and is not a service account as service accounts can't receive emails. */
  developerEmail?: string;
}

export const RegisterGcpRequest: Schema.Schema<RegisterGcpRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      developerEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RegisterGcpRequest",
  }) as any as Schema.Schema<RegisterGcpRequest>;

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
  /** Reporting contexts that have the change (if applicable). Currently this field supports only (`SHOPPING_ADS`, `LOCAL_INVENTORY_ADS`, `YOUTUBE_SHOPPING`, `YOUTUBE_CHECKOUT`, `YOUTUBE_AFFILIATE`) from the enum value [ReportingContextEnum](/merchant/api/reference/rest/Shared.Types/ReportingContextEnum) */
  reportingContext?:
    | "REPORTING_CONTEXT_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISCOVERY_ADS"
    | "DEMAND_GEN_ADS"
    | "DEMAND_GEN_ADS_DISCOVER_SURFACE"
    | "VIDEO_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "VEHICLE_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LISTINGS_UCP_CHECKOUT"
    | "FREE_LOCAL_LISTINGS"
    | "FREE_LOCAL_VEHICLE_LISTINGS"
    | "YOUTUBE_AFFILIATE"
    | "YOUTUBE_SHOPPING"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | "PRODUCT_REVIEWS"
    | "MERCHANT_REVIEWS"
    | "YOUTUBE_CHECKOUT"
    | (string & {});
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    oldValue: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
    newValue: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The product id. */
  resourceId?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      managingAccount: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      eventTime: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface PostalAddress {
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. The name of the organization at the address. */
  organization?: string;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
}

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() =>
  Schema.Struct({
    administrativeArea: Schema.optional(Schema.String),
    languageCode: Schema.optional(Schema.String),
    sortingCode: Schema.optional(Schema.String),
    revision: Schema.optional(Schema.Number),
    locality: Schema.optional(Schema.String),
    recipients: Schema.optional(Schema.Array(Schema.String)),
    organization: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    addressLines: Schema.optional(Schema.Array(Schema.String)),
    sublocality: Schema.optional(Schema.String),
    postalCode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "PostalAddress",
}) as any as Schema.Schema<PostalAddress>;

export interface CustomerService {
  /** Optional. The phone number where customer service may be called. */
  phone?: PhoneNumber;
  /** Optional. The email address where customer service may be reached. */
  email?: string;
  /** Optional. The URI where customer service may be found. */
  uri?: string;
}

export const CustomerService: Schema.Schema<CustomerService> = Schema.suspend(
  () =>
    Schema.Struct({
      phone: Schema.optional(PhoneNumber),
      email: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CustomerService",
}) as any as Schema.Schema<CustomerService>;

export interface BusinessInfo {
  /** Optional. The address of the business. Only `region_code`, `address_lines`, `postal_code`, `administrative_area` and `locality` fields are supported. All other fields are ignored. */
  address?: PostalAddress;
  /** Output only. The phone number of the business. */
  phone?: PhoneNumber;
  /** Optional. The customer service of the business. */
  customerService?: CustomerService;
  /** Output only. The phone verification state of the business. */
  phoneVerificationState?:
    | "PHONE_VERIFICATION_STATE_UNSPECIFIED"
    | "PHONE_VERIFICATION_STATE_VERIFIED"
    | "PHONE_VERIFICATION_STATE_UNVERIFIED"
    | (string & {});
  /** Identifier. The resource name of the business info. Format: `accounts/{account}/businessInfo` */
  name?: string;
  /** Optional. The 10-digit [Korean business registration number](https://support.google.com/merchants/answer/9037766) separated with dashes in the format: XXX-XX-XXXXX. */
  koreanBusinessRegistrationNumber?: string;
}

export const BusinessInfo: Schema.Schema<BusinessInfo> = Schema.suspend(() =>
  Schema.Struct({
    address: Schema.optional(PostalAddress),
    phone: Schema.optional(PhoneNumber),
    customerService: Schema.optional(CustomerService),
    phoneVerificationState: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    koreanBusinessRegistrationNumber: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "BusinessInfo",
}) as any as Schema.Schema<BusinessInfo>;

export interface GbpAccount {
  /** Number of listings under this account. */
  listingCount?: string;
  /** The id of the GBP account. */
  gbpAccountId?: string;
  /** The type of the Business Profile. */
  type?: "TYPE_UNSPECIFIED" | "USER" | "BUSINESS_ACCOUNT" | (string & {});
  /** The name of the Business Profile. For personal accounts: Email id of the owner. For Business accounts: Name of the Business Account. */
  gbpAccountName?: string;
  /** Identifier. The resource name of the GBP account. Format: `accounts/{account}/gbpAccount/{gbp_account}` */
  name?: string;
}

export const GbpAccount: Schema.Schema<GbpAccount> = Schema.suspend(() =>
  Schema.Struct({
    listingCount: Schema.optional(Schema.String),
    gbpAccountId: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    gbpAccountName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "GbpAccount" }) as any as Schema.Schema<GbpAccount>;

export interface LinkLfpProviderResponse {
  /** Empty response. */
  response?: Empty;
}

export const LinkLfpProviderResponse: Schema.Schema<LinkLfpProviderResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Empty),
    }),
  ).annotate({
    identifier: "LinkLfpProviderResponse",
  }) as any as Schema.Schema<LinkLfpProviderResponse>;

export interface ComparisonShopping {}

export const ComparisonShopping: Schema.Schema<ComparisonShopping> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ComparisonShopping",
  }) as any as Schema.Schema<ComparisonShopping>;

export interface User {
  /** Identifier. The resource name of the user. Format: `accounts/{account}/user/{email}` Use `me` to refer to your own email address, for example `accounts/{account}/users/me`. */
  name?: string;
  /** Output only. The state of the user. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "VERIFIED" | (string & {});
  /** Required. The [access rights](https://support.google.com/merchants/answer/12160472?sjid=6789834943175119429-EU#accesstypes) the user has. */
  accessRights?: Array<
    | "ACCESS_RIGHT_UNSPECIFIED"
    | "STANDARD"
    | "READ_ONLY"
    | "ADMIN"
    | "PERFORMANCE_REPORTING"
    | "API_DEVELOPER"
    | (string & {})
  >;
}

export const User: Schema.Schema<User> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    accessRights: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface ListUsersResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The users from the specified account. */
  users?: Array<User>;
}

export const ListUsersResponse: Schema.Schema<ListUsersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      users: Schema.optional(Schema.Array(User)),
    }),
  ).annotate({
    identifier: "ListUsersResponse",
  }) as any as Schema.Schema<ListUsersResponse>;

export interface VerifySelfRequest {}

export const VerifySelfRequest: Schema.Schema<VerifySelfRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "VerifySelfRequest",
  }) as any as Schema.Schema<VerifySelfRequest>;

export interface AccountRelationship {
  /** Identifier. The resource name of the account relationship. Format: `accounts/{account}/relationships/{relationship}`. For example, `accounts/123456/relationships/567890`. */
  name?: string;
  /** Immutable. The provider of the service. Either the reference to an account such as `providers/123` or a well-known service provider (one of `providers/GOOGLE_ADS` or `providers/GOOGLE_BUSINESS_PROFILE`). */
  provider?: string;
  /** Optional. An optional alias you can assign to this account relationship. This alias acts as a convenient identifier for your own reference and management. It must be unique among all your account relationships with the same provider. For example, you might use `account_id_alias` to assign a friendly name to this relationship for easier identification in your systems. */
  accountIdAlias?: string;
  /** Output only. The human-readable display name of the provider account. */
  providerDisplayName?: string;
}

export const AccountRelationship: Schema.Schema<AccountRelationship> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      provider: Schema.optional(Schema.String),
      accountIdAlias: Schema.optional(Schema.String),
      providerDisplayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountRelationship",
  }) as any as Schema.Schema<AccountRelationship>;

export interface Impact {
  /** The [CLDR region code](https://cldr.unicode.org/) where this issue applies. */
  regionCode?: string;
  /** The severity of the issue on the destination and region. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "CRITICAL"
    | "ERROR"
    | "SUGGESTION"
    | (string & {});
}

export const Impact: Schema.Schema<Impact> = Schema.suspend(() =>
  Schema.Struct({
    regionCode: Schema.optional(Schema.String),
    severity: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Impact" }) as any as Schema.Schema<Impact>;

export interface ImpactedDestination {
  /** The impacted reporting context. */
  reportingContext?:
    | "REPORTING_CONTEXT_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISCOVERY_ADS"
    | "DEMAND_GEN_ADS"
    | "DEMAND_GEN_ADS_DISCOVER_SURFACE"
    | "VIDEO_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "VEHICLE_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LISTINGS_UCP_CHECKOUT"
    | "FREE_LOCAL_LISTINGS"
    | "FREE_LOCAL_VEHICLE_LISTINGS"
    | "YOUTUBE_AFFILIATE"
    | "YOUTUBE_SHOPPING"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | "PRODUCT_REVIEWS"
    | "MERCHANT_REVIEWS"
    | "YOUTUBE_CHECKOUT"
    | (string & {});
  /** The (negative) impact for various regions on the given destination. */
  impacts?: Array<Impact>;
}

export const ImpactedDestination: Schema.Schema<ImpactedDestination> =
  Schema.suspend(() =>
    Schema.Struct({
      reportingContext: Schema.optional(Schema.String),
      impacts: Schema.optional(Schema.Array(Impact)),
    }),
  ).annotate({
    identifier: "ImpactedDestination",
  }) as any as Schema.Schema<ImpactedDestination>;

export interface AccountIssue {
  /** The overall severity of the issue. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "CRITICAL"
    | "ERROR"
    | "SUGGESTION"
    | (string & {});
  /** Identifier. The resource name of the account issue. Format: `accounts/{account}/issues/{id}`. For example, `accounts/123456/issues/misrepresentation-of-self-or-products-unacceptable-business-practice-policy`. */
  name?: string;
  /** Link to Merchant Center Help Center providing further information about the issue and how to fix it. */
  documentationUri?: string;
  /** Further localized details about the issue. */
  detail?: string;
  /** The localized title of the issue. */
  title?: string;
  /** The impact this issue has on various destinations. */
  impactedDestinations?: Array<ImpactedDestination>;
}

export const AccountIssue: Schema.Schema<AccountIssue> = Schema.suspend(() =>
  Schema.Struct({
    severity: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    documentationUri: Schema.optional(Schema.String),
    detail: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    impactedDestinations: Schema.optional(Schema.Array(ImpactedDestination)),
  }),
).annotate({
  identifier: "AccountIssue",
}) as any as Schema.Schema<AccountIssue>;

export interface RestockingFee {
  /** Percent of total price in micros. 15,000,000 means 15% of the total price would be charged. */
  microPercent?: number;
  /** Fixed restocking fee. */
  fixedFee?: Price;
}

export const RestockingFee: Schema.Schema<RestockingFee> = Schema.suspend(() =>
  Schema.Struct({
    microPercent: Schema.optional(Schema.Number),
    fixedFee: Schema.optional(Price),
  }),
).annotate({
  identifier: "RestockingFee",
}) as any as Schema.Schema<RestockingFee>;

export interface VerificationMailSettings {
  /** Optional. Mode of the verification mail. If not set, the default is `SEND_VERIFICATION_MAIL`. */
  verificationMailMode?:
    | "VERIFICATION_MAIL_MODE_UNSPECIFIED"
    | "SEND_VERIFICATION_MAIL"
    | "SUPPRESS_VERIFICATION_MAIL"
    | (string & {});
}

export const VerificationMailSettings: Schema.Schema<VerificationMailSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      verificationMailMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerificationMailSettings",
  }) as any as Schema.Schema<VerificationMailSettings>;

export interface AddUser {
  /** Optional. Details about the user to be added. At the moment, only access rights may be specified. */
  user?: User;
  /** Optional. Settings related to configuring the verification email that is sent after adding a user. */
  verificationMailSettings?: VerificationMailSettings;
  /** Required. The email address of the user (for example, `john.doe@gmail.com`). */
  userId?: string;
}

export const AddUser: Schema.Schema<AddUser> = Schema.suspend(() =>
  Schema.Struct({
    user: Schema.optional(User),
    verificationMailSettings: Schema.optional(VerificationMailSettings),
    userId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AddUser" }) as any as Schema.Schema<AddUser>;

export interface OnDisplayToOrder {
  /** Required. The on display to order (ODO) policy URI. */
  uri?: string;
  /** Output only. The state of the URI. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "FAILED"
    | "RUNNING"
    | "ACTION_REQUIRED"
    | (string & {});
}

export const OnDisplayToOrder: Schema.Schema<OnDisplayToOrder> = Schema.suspend(
  () =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "OnDisplayToOrder",
}) as any as Schema.Schema<OnDisplayToOrder>;

export interface AccountAggregation {}

export const AccountAggregation: Schema.Schema<AccountAggregation> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AccountAggregation",
  }) as any as Schema.Schema<AccountAggregation>;

export interface AccountManagement {}

export const AccountManagement: Schema.Schema<AccountManagement> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AccountManagement",
  }) as any as Schema.Schema<AccountManagement>;

export interface ProductsManagement {}

export const ProductsManagement: Schema.Schema<ProductsManagement> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ProductsManagement",
  }) as any as Schema.Schema<ProductsManagement>;

export interface AddAccountService {
  /** The provider manages campaigns for this account. Payload for service type campaigns management. */
  campaignsManagement?: CampaignsManagement;
  /** The provider is an [aggregator](https://support.google.com/merchants/answer/188487) for the account. Payload for service type Account Aggregation. */
  accountAggregation?: AccountAggregation;
  /** Required. The provider of the service. Either the reference to an account such as `providers/123` or a well-known service provider (one of `providers/GOOGLE_ADS` or `providers/GOOGLE_BUSINESS_PROFILE`). */
  provider?: string;
  /** The provider is a CSS (Comparison Shopping Service) of this account. Payload for service type Comparison Shopping. */
  comparisonShopping?: ComparisonShopping;
  /** Immutable. An optional, immutable identifier that Google uses to refer to this account when communicating with the provider. This should be the unique account ID within the provider's system (for example, your shop ID in Shopify). If you have multiple accounts with the same provider - for instance, different accounts for various regions — the `external_account_id` differentiates between them, ensuring accurate linking and integration between Google and the provider. The external account ID must be specified for the campaigns management service type. The external account ID must not be specified for the account aggregation service type. The external account ID is optional / may be specified for all other service types. */
  externalAccountId?: string;
  /** The provider manages this account. Payload for service type Account Management. */
  accountManagement?: AccountManagement;
  /** The provider manages products for this account. Payload for service type products management. */
  productsManagement?: ProductsManagement;
}

export const AddAccountService: Schema.Schema<AddAccountService> =
  Schema.suspend(() =>
    Schema.Struct({
      campaignsManagement: Schema.optional(CampaignsManagement),
      accountAggregation: Schema.optional(AccountAggregation),
      provider: Schema.optional(Schema.String),
      comparisonShopping: Schema.optional(ComparisonShopping),
      externalAccountId: Schema.optional(Schema.String),
      accountManagement: Schema.optional(AccountManagement),
      productsManagement: Schema.optional(ProductsManagement),
    }),
  ).annotate({
    identifier: "AddAccountService",
  }) as any as Schema.Schema<AddAccountService>;

export interface CreateUserRequest {
  /** Required. The email address of the user (for example, `john.doe@gmail.com`). */
  userId?: string;
  /** Required. The resource name of the account for which a user will be created. Format: `accounts/{account}` */
  parent?: string;
  /** Optional. The user to create. */
  user?: User;
}

export const CreateUserRequest: Schema.Schema<CreateUserRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      userId: Schema.optional(Schema.String),
      parent: Schema.optional(Schema.String),
      user: Schema.optional(User),
    }),
  ).annotate({
    identifier: "CreateUserRequest",
  }) as any as Schema.Schema<CreateUserRequest>;

export interface CreateAndConfigureAccountRequest {
  /** Optional. Users to be added to the account. */
  user?: Array<AddUser>;
  /** Required. The account to be created. */
  account?: Account;
  /** Optional. If a relationship is created with a provider, you can set an alias for it with this field. The calling user must be an admin on the provider to be able to set an alias. */
  setAlias?: Array<SetAliasForRelationship>;
  /** Required. An account service between the account to be created and the provider account is initialized as part of the creation. At least one such service needs to be provided. Currently exactly one of these needs to be `account_aggregation` and `accounts.createAndConfigure` method can be used to create a sub-account under an existing advanced account through this method. Additional `account_management` or `products_management` services may be provided. */
  service?: Array<AddAccountService>;
  /** Optional. Users to be added to the account. This field is deprecated and will not exist after the API evolves out of beta. Use the `user` field instead. */
  users?: Array<CreateUserRequest>;
}

export const CreateAndConfigureAccountRequest: Schema.Schema<CreateAndConfigureAccountRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      user: Schema.optional(Schema.Array(AddUser)),
      account: Schema.optional(Account),
      setAlias: Schema.optional(Schema.Array(SetAliasForRelationship)),
      service: Schema.optional(Schema.Array(AddAccountService)),
      users: Schema.optional(Schema.Array(CreateUserRequest)),
    }),
  ).annotate({
    identifier: "CreateAndConfigureAccountRequest",
  }) as any as Schema.Schema<CreateAndConfigureAccountRequest>;

export interface ListAccountIssuesResponse {
  /** The issues from the specified account. */
  accountIssues?: Array<AccountIssue>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountIssuesResponse: Schema.Schema<ListAccountIssuesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accountIssues: Schema.optional(Schema.Array(AccountIssue)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountIssuesResponse",
  }) as any as Schema.Schema<ListAccountIssuesResponse>;

export interface SeasonalOverride {
  /** Required. Defines the date range when this seasonal override applies. Both start_date and end_date are inclusive. The dates of the seasonal overrides should not overlap. */
  startDate?: Merchantapi_Date;
  /** Fixed end date until which the product can be returned. */
  returnUntilDate?: Merchantapi_Date;
  /** Number of days (from the delivery date) that the product can be returned. */
  returnDays?: number;
  /** Required. seasonal override end date (inclusive). */
  endDate?: Merchantapi_Date;
  /** Required. Display name of this seasonal override in Merchant Center. */
  label?: string;
}

export const SeasonalOverride: Schema.Schema<SeasonalOverride> = Schema.suspend(
  () =>
    Schema.Struct({
      startDate: Schema.optional(Merchantapi_Date),
      returnUntilDate: Schema.optional(Merchantapi_Date),
      returnDays: Schema.optional(Schema.Number),
      endDate: Schema.optional(Merchantapi_Date),
      label: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SeasonalOverride",
}) as any as Schema.Schema<SeasonalOverride>;

export interface ListGbpAccountsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The GBP accounts from the specified merchant in the specified country. */
  gbpAccounts?: Array<GbpAccount>;
}

export const ListGbpAccountsResponse: Schema.Schema<ListGbpAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      gbpAccounts: Schema.optional(Schema.Array(GbpAccount)),
    }),
  ).annotate({
    identifier: "ListGbpAccountsResponse",
  }) as any as Schema.Schema<ListGbpAccountsResponse>;

export interface ListAccountRelationshipsResponse {
  /** The account relationships that match your filter. */
  accountRelationships?: Array<AccountRelationship>;
  /** A page token. You can send the `page_token` to get the next page. Only included in the `list` response if there are more pages. */
  nextPageToken?: string;
}

export const ListAccountRelationshipsResponse: Schema.Schema<ListAccountRelationshipsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accountRelationships: Schema.optional(Schema.Array(AccountRelationship)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountRelationshipsResponse",
  }) as any as Schema.Schema<ListAccountRelationshipsResponse>;

export interface DisableProgramRequest {}

export const DisableProgramRequest: Schema.Schema<DisableProgramRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisableProgramRequest",
  }) as any as Schema.Schema<DisableProgramRequest>;

export interface LfpProvider {
  /** The display name of the LFP provider. */
  displayName?: string;
  /** Identifier. The resource name of the LFP provider. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}/lfpProviders/{lfp_provider}` */
  name?: string;
  /** Output only. Region code defined by [CLDR](https://cldr.unicode.org/). */
  regionCode?: string;
}

export const LfpProvider: Schema.Schema<LfpProvider> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LfpProvider" }) as any as Schema.Schema<LfpProvider>;

export interface EmailPreferences {
  /** Optional. Updates on new features, tips and best practices. */
  newsAndTips?:
    | "OPT_IN_STATE_UNSPECIFIED"
    | "OPTED_OUT"
    | "OPTED_IN"
    | "UNCONFIRMED"
    | (string & {});
  /** Identifier. The name of the EmailPreferences. The endpoint is only supported for the authenticated user. */
  name?: string;
}

export const EmailPreferences: Schema.Schema<EmailPreferences> = Schema.suspend(
  () =>
    Schema.Struct({
      newsAndTips: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EmailPreferences",
}) as any as Schema.Schema<EmailPreferences>;

export interface Handshake {
  /** Output only. The approval state of this handshake. */
  approvalState?:
    | "APPROVAL_STATE_UNSPECIFIED"
    | "PENDING"
    | "ESTABLISHED"
    | "REJECTED"
    | (string & {});
  /** Output only. The most recent account to modify the account service's `approval_status`. */
  actor?: "ACTOR_UNSPECIFIED" | "ACCOUNT" | "OTHER_PARTY" | (string & {});
}

export const Handshake: Schema.Schema<Handshake> = Schema.suspend(() =>
  Schema.Struct({
    approvalState: Schema.optional(Schema.String),
    actor: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Handshake" }) as any as Schema.Schema<Handshake>;

export interface AccountService {
  /** Output only. Information about the state of the service in terms of establishing it (e.g. is it pending approval or approved). */
  handshake?: Handshake;
  /** Service type for account management. Enables the provider to perform administrative actions on the business's account, such as configuring account settings, managing users, or updating business information. */
  accountManagement?: AccountManagement;
  /** Service type for comparison shopping. The provider is a CSS (Comparison Shopping Service) managing the account. See https://support.google.com/merchants/answer/12653197 */
  comparisonShopping?: ComparisonShopping;
  /** Identifier. The resource name of the account service. Format: `accounts/{account}/services/{service}` */
  name?: string;
  /** Service type for local listings management. The business group associated with the external account id will be used to provide local inventory to this Merchant Center account. */
  localListingManagement?: LocalListingManagement;
  /** Immutable. An optional, immutable identifier that Google uses to refer to this account when communicating with the provider. This should be the unique account ID within the provider's system (for example, your shop ID in Shopify). If you have multiple accounts with the same provider - for instance, different accounts for various regions — the `external_account_id` differentiates between them, ensuring accurate linking and integration between Google and the provider. */
  externalAccountId?: string;
  /** Service type for managing products. This allows the provider to handle product data on behalf of the business, including reading and writing product listings. It's commonly used when the provider offers inventory management or catalog synchronization services to keep the business's product information up-to-date across platforms. */
  productsManagement?: ProductsManagement;
  /** Output only. The provider of the service. Either the reference to an account such as `providers/123` or a well-known service provider (one of `providers/GOOGLE_ADS` or `providers/GOOGLE_BUSINESS_PROFILE`). */
  provider?: string;
  /** Service type for managing advertising campaigns. Grants the provider access to create and manage the business's ad campaigns, including setting up campaigns, adjusting bids, and optimizing performance. */
  campaignsManagement?: CampaignsManagement;
  /** Output only. The human-readable display name of the provider account. */
  providerDisplayName?: string;
  /** Service type for account aggregation. This enables the provider, which is an advanced account, to manage multiple sub-accounts (client accounts). Through this service, the advanced account provider can perform administrative and operational tasks across all linked sub-accounts. This is useful for agencies, aggregators, or large retailers that need centralized control over many Merchant Center accounts. */
  accountAggregation?: AccountAggregation;
  /** Output only. Whether the service is mutable (e.g. through Approve / Reject RPCs). A service that was created through another system or API might be immutable. */
  mutability?:
    | "MUTABILITY_UNSPECIFIED"
    | "MUTABLE"
    | "IMMUTABLE"
    | (string & {});
}

export const AccountService: Schema.Schema<AccountService> = Schema.suspend(
  () =>
    Schema.Struct({
      handshake: Schema.optional(Handshake),
      accountManagement: Schema.optional(AccountManagement),
      comparisonShopping: Schema.optional(ComparisonShopping),
      name: Schema.optional(Schema.String),
      localListingManagement: Schema.optional(LocalListingManagement),
      externalAccountId: Schema.optional(Schema.String),
      productsManagement: Schema.optional(ProductsManagement),
      provider: Schema.optional(Schema.String),
      campaignsManagement: Schema.optional(CampaignsManagement),
      providerDisplayName: Schema.optional(Schema.String),
      accountAggregation: Schema.optional(AccountAggregation),
      mutability: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AccountService",
}) as any as Schema.Schema<AccountService>;

export interface ListAccountServicesResponse {
  /** The account services that match your filter. */
  accountServices?: Array<AccountService>;
  /** A page token. You can send the `page_token` to get the next page. Only included in the `list` response if there are more pages. */
  nextPageToken?: string;
}

export const ListAccountServicesResponse: Schema.Schema<ListAccountServicesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accountServices: Schema.optional(Schema.Array(AccountService)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountServicesResponse",
  }) as any as Schema.Schema<ListAccountServicesResponse>;

export interface ProposeAccountServiceRequest {
  /** Required. The provider of the service. Either the reference to an account such as `providers/123` or a well-known service provider (one of `providers/GOOGLE_ADS` or `providers/GOOGLE_BUSINESS_PROFILE`). */
  provider?: string;
  /** Required. The account service to propose. */
  accountService?: AccountService;
}

export const ProposeAccountServiceRequest: Schema.Schema<ProposeAccountServiceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      provider: Schema.optional(Schema.String),
      accountService: Schema.optional(AccountService),
    }),
  ).annotate({
    identifier: "ProposeAccountServiceRequest",
  }) as any as Schema.Schema<ProposeAccountServiceRequest>;

export interface ClaimHomepageRequest {
  /** Optional. When set to `true`, this option removes any existing claim on the requested website from any other account to the account making the request, effectively replacing the previous claim. */
  overwrite?: boolean;
}

export const ClaimHomepageRequest: Schema.Schema<ClaimHomepageRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      overwrite: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ClaimHomepageRequest",
  }) as any as Schema.Schema<ClaimHomepageRequest>;

export interface UriSettings {
  /** Checkout URL template. When the placeholders are expanded will redirect the buyer to the merchant checkout page with the item in the cart. For more details, check the [help center doc](https://support.google.com/merchants/answer/13945960#method1&zippy=%2Cproduct-level-url-formatting%2Caccount-level-url-formatting) */
  checkoutUriTemplate?: string;
  /** Cart URL template. When the placeholders are expanded will redirect the buyer to the cart page on the merchant website with the selected item in cart. For more details, check the [help center doc](https://support.google.com/merchants/answer/13945960#method1&zippy=%2Cproduct-level-url-formatting%2Caccount-level-url-formatting) */
  cartUriTemplate?: string;
}

export const UriSettings: Schema.Schema<UriSettings> = Schema.suspend(() =>
  Schema.Struct({
    checkoutUriTemplate: Schema.optional(Schema.String),
    cartUriTemplate: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "UriSettings" }) as any as Schema.Schema<UriSettings>;

export interface CheckoutSettings {
  /** Output only. Reflects the merchant enrollment state in `Checkout` program. */
  enrollmentState?:
    | "CHECKOUT_ENROLLMENT_STATE_UNSPECIFIED"
    | "INACTIVE"
    | "ENROLLED"
    | "OPTED_OUT"
    | (string & {});
  /** Output only. The effective value of `review_state` for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account (for only marketplace sellers). */
  effectiveReviewState?:
    | "CHECKOUT_REVIEW_STATE_UNSPECIFIED"
    | "IN_REVIEW"
    | "APPROVED"
    | "DISAPPROVED"
    | (string & {});
  /** Output only. The effective value of `uri_settings` for a given merchant. If account level settings are present then this value will be a copy of url settings. Otherwise, it will have the value of the parent account (for only marketplace sellers). */
  effectiveUriSettings?: UriSettings;
  /** Identifier. The resource name of the program configuration settings. Format: `accounts/{account}/programs/{program}/checkoutSettings` */
  name?: string;
  /** URI settings for cart or checkout URL. */
  uriSettings?: UriSettings;
  /** Optional. Required for the create operation. The destinations (also known as [Marketing methods](https://support.google.com/merchants/answer/15130232)) to which the checkout program applies. Valid destination values are `SHOPPING_ADS` and `FREE_LISTINGS`. */
  eligibleDestinations?: Array<
    | "DESTINATION_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LOCAL_LISTINGS"
    | "YOUTUBE_SHOPPING"
    | "YOUTUBE_SHOPPING_CHECKOUT"
    | "YOUTUBE_AFFILIATE"
    | "FREE_VEHICLE_LISTINGS"
    | "VEHICLE_ADS"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | (string & {})
  >;
  /** Output only. Reflects the merchant review state in `Checkout` program. This is set based on the data quality reviews of the URL provided by the merchant. A merchant with enrollment state as `ENROLLED` can be in the following review states: `IN_REVIEW`, `APPROVED` or `DISAPPROVED`. A merchant must be in an `enrollment_state` of `ENROLLED` before a review can begin for the merchant.For more details, check the help center doc. */
  reviewState?:
    | "CHECKOUT_REVIEW_STATE_UNSPECIFIED"
    | "IN_REVIEW"
    | "APPROVED"
    | "DISAPPROVED"
    | (string & {});
  /** Output only. The effective value of enrollment_state for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account (for only marketplace sellers). */
  effectiveEnrollmentState?:
    | "CHECKOUT_ENROLLMENT_STATE_UNSPECIFIED"
    | "INACTIVE"
    | "ENROLLED"
    | "OPTED_OUT"
    | (string & {});
}

export const CheckoutSettings: Schema.Schema<CheckoutSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      enrollmentState: Schema.optional(Schema.String),
      effectiveReviewState: Schema.optional(Schema.String),
      effectiveUriSettings: Schema.optional(UriSettings),
      name: Schema.optional(Schema.String),
      uriSettings: Schema.optional(UriSettings),
      eligibleDestinations: Schema.optional(Schema.Array(Schema.String)),
      reviewState: Schema.optional(Schema.String),
      effectiveEnrollmentState: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CheckoutSettings",
}) as any as Schema.Schema<CheckoutSettings>;

export interface Required {
  /** Required. The `TermsOfService` that need to be accepted. */
  termsOfService?: string;
  /** Required. Full URL to the terms of service file. This field is the same as `TermsOfService.file_uri`, it is added here for convenience only. */
  tosFileUri?: string;
}

export const Required: Schema.Schema<Required> = Schema.suspend(() =>
  Schema.Struct({
    termsOfService: Schema.optional(Schema.String),
    tosFileUri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Required" }) as any as Schema.Schema<Required>;

export interface TermsOfServiceAgreementState {
  /** Identifier. The resource name of the terms of service version. Format: `accounts/{account}/termsOfServiceAgreementState/{identifier}` The identifier format is: `{TermsOfServiceKind}-{country}` For example, an identifier could be: `MERCHANT_CENTER-EU` or `MERCHANT_CENTER-US`. */
  name?: string;
  /** Required. Region code as defined by https://cldr.unicode.org/. This is the country the current state applies to. */
  regionCode?: string;
  /** Optional. The accepted terms of service of this kind and for the associated region_code */
  accepted?: Accepted;
  /** Required. Terms of Service kind associated with the particular version. */
  termsOfServiceKind?:
    | "TERMS_OF_SERVICE_KIND_UNSPECIFIED"
    | "MERCHANT_CENTER"
    | (string & {});
  /** Optional. The required terms of service */
  required?: Required;
}

export const TermsOfServiceAgreementState: Schema.Schema<TermsOfServiceAgreementState> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      accepted: Schema.optional(Accepted),
      termsOfServiceKind: Schema.optional(Schema.String),
      required: Schema.optional(Required),
    }),
  ).annotate({
    identifier: "TermsOfServiceAgreementState",
  }) as any as Schema.Schema<TermsOfServiceAgreementState>;

export interface AcceptTermsOfServiceResponse {
  /** The agreement state after accepting the ToS. */
  termsOfServiceAgreementState?: TermsOfServiceAgreementState;
}

export const AcceptTermsOfServiceResponse: Schema.Schema<AcceptTermsOfServiceResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      termsOfServiceAgreementState: Schema.optional(
        TermsOfServiceAgreementState,
      ),
    }),
  ).annotate({
    identifier: "AcceptTermsOfServiceResponse",
  }) as any as Schema.Schema<AcceptTermsOfServiceResponse>;

export interface UnclaimHomepageRequest {}

export const UnclaimHomepageRequest: Schema.Schema<UnclaimHomepageRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UnclaimHomepageRequest",
  }) as any as Schema.Schema<UnclaimHomepageRequest>;

export interface ReturnShippingFee {
  /** Required. Type of return shipping fee. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "FIXED"
    | "CUSTOMER_PAYING_ACTUAL_FEE"
    | (string & {});
  /** Fixed return shipping fee amount. This value is only applicable when type is `FIXED`. We will treat the return shipping fee as free if type is `FIXED` and this value is not set. */
  fixedFee?: Price;
}

export const ReturnShippingFee: Schema.Schema<ReturnShippingFee> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      fixedFee: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "ReturnShippingFee",
  }) as any as Schema.Schema<ReturnShippingFee>;

export interface OnlineReturnPolicy {
  /** Optional. This field specifies if business allows customers to exchange products. */
  acceptExchange?: boolean;
  /** Optional. The item conditions accepted for returns must not be empty unless the type of return policy is 'noReturns'. */
  itemConditions?: Array<
    "ITEM_CONDITION_UNSPECIFIED" | "NEW" | "USED" | (string & {})
  >;
  /** Optional. The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns. */
  returnMethods?: Array<
    | "RETURN_METHOD_UNSPECIFIED"
    | "BY_MAIL"
    | "IN_STORE"
    | "AT_A_KIOSK"
    | (string & {})
  >;
  /** Required. Immutable. The countries of sale where the return policy applies. The values must be a valid 2 letter ISO 3166 code. */
  countries?: Array<string>;
  /** Optional. Immutable. This field represents the unique user-defined label of the return policy for the given country. It is important to note that the same label cannot be used in different return policies for the same country. If not given, policies will be automatically treated as the 'default' for the country. When using label, you are creating an exception policy in that country to assign a custom return policy to certain product groups, follow the instructions provided in the [Return policy label] (https://support.google.com/merchants/answer/9445425). The label can contain up to 50 characters. */
  label?: string;
  /** Optional. Overrides to the general policy for orders placed during a specific set of time intervals. */
  seasonalOverrides?: Array<SeasonalOverride>;
  /** Required. The return policy uri. This can used by Google to do a sanity check for the policy. It must be a valid URL. */
  returnPolicyUri?: string;
  /** Optional. The restocking fee that applies to all return reason categories. This would be treated as a free restocking fee if the value is not set. */
  restockingFee?: RestockingFee;
  /** Optional. The return shipping fee. Should be set only when customer need to download and print the return label. */
  returnShippingFee?: ReturnShippingFee;
  /** Output only. Return policy ID generated by Google. */
  returnPolicyId?: string;
  /** Optional. The field specifies the number of days it takes for business to process refunds. */
  processRefundDays?: number;
  /** Identifier. The name of the `OnlineReturnPolicy` resource. Format: `accounts/{account}/onlineReturnPolicies/{return_policy}` */
  name?: string;
  /** Optional. The return policy. */
  policy?: Policy;
  /** Optional. The field specifies the return label source. */
  returnLabelSource?:
    | "RETURN_LABEL_SOURCE_UNSPECIFIED"
    | "DOWNLOAD_AND_PRINT"
    | "IN_THE_PACKAGE"
    | "CUSTOMER_RESPONSIBILITY"
    | (string & {});
  /** Optional. This field specifies if business only accepts defective products for returns. */
  acceptDefectiveOnly?: boolean;
}

export const OnlineReturnPolicy: Schema.Schema<OnlineReturnPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      acceptExchange: Schema.optional(Schema.Boolean),
      itemConditions: Schema.optional(Schema.Array(Schema.String)),
      returnMethods: Schema.optional(Schema.Array(Schema.String)),
      countries: Schema.optional(Schema.Array(Schema.String)),
      label: Schema.optional(Schema.String),
      seasonalOverrides: Schema.optional(Schema.Array(SeasonalOverride)),
      returnPolicyUri: Schema.optional(Schema.String),
      restockingFee: Schema.optional(RestockingFee),
      returnShippingFee: Schema.optional(ReturnShippingFee),
      returnPolicyId: Schema.optional(Schema.String),
      processRefundDays: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      policy: Schema.optional(Policy),
      returnLabelSource: Schema.optional(Schema.String),
      acceptDefectiveOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OnlineReturnPolicy",
  }) as any as Schema.Schema<OnlineReturnPolicy>;

export interface ListOnlineReturnPoliciesResponse {
  /** The retrieved return policies. */
  onlineReturnPolicies?: Array<OnlineReturnPolicy>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListOnlineReturnPoliciesResponse: Schema.Schema<ListOnlineReturnPoliciesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      onlineReturnPolicies: Schema.optional(Schema.Array(OnlineReturnPolicy)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOnlineReturnPoliciesResponse",
  }) as any as Schema.Schema<ListOnlineReturnPoliciesResponse>;

export interface LinkLfpProviderRequest {
  /** Required. The external account ID by which this merchant is known to the LFP provider. */
  externalAccountId?: string;
}

export const LinkLfpProviderRequest: Schema.Schema<LinkLfpProviderRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      externalAccountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LinkLfpProviderRequest",
  }) as any as Schema.Schema<LinkLfpProviderRequest>;

export interface InventoryVerification {
  /** Output only. The state of the inventory verification process. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTION_REQUIRED"
    | "INACTIVE"
    | "RUNNING"
    | "SUCCEEDED"
    | "SUSPENDED"
    | (string & {});
  /** Required. The name of the contact for the inventory verification process. */
  contact?: string;
  /** Required. The email address of the contact for the inventory verification process. */
  contactEmail?: string;
  /** Output only. The state of the contact verification. */
  contactState?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "FAILED"
    | "RUNNING"
    | "ACTION_REQUIRED"
    | (string & {});
}

export const InventoryVerification: Schema.Schema<InventoryVerification> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      contact: Schema.optional(Schema.String),
      contactEmail: Schema.optional(Schema.String),
      contactState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryVerification",
  }) as any as Schema.Schema<InventoryVerification>;

export interface LfpLink {
  /** Required. The account ID by which this merchant is known to the LFP provider. */
  externalAccountId?: string;
  /** Required. The resource name of the LFP provider. Format: `lfpProviders/{lfp_provider}` */
  lfpProvider?: string;
  /** Output only. The state of the LFP link. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "FAILED"
    | "RUNNING"
    | "ACTION_REQUIRED"
    | (string & {});
}

export const LfpLink: Schema.Schema<LfpLink> = Schema.suspend(() =>
  Schema.Struct({
    externalAccountId: Schema.optional(Schema.String),
    lfpProvider: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LfpLink" }) as any as Schema.Schema<LfpLink>;

export interface FindLfpProvidersResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The LFP providers from the specified merchant in the specified country. */
  lfpProviders?: Array<LfpProvider>;
}

export const FindLfpProvidersResponse: Schema.Schema<FindLfpProvidersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      lfpProviders: Schema.optional(Schema.Array(LfpProvider)),
    }),
  ).annotate({
    identifier: "FindLfpProvidersResponse",
  }) as any as Schema.Schema<FindLfpProvidersResponse>;

export interface InStock {
  /** Optional. Product landing page URI. It is only used for the review of MHLSF in-stock serving. This URI domain should match with the business's homepage. Required to be empty if the lsf_type is GHLSF, and required when the lsf_type is MHLSF_FULL or MHLSF_BASIC. */
  uri?: string;
  /** Output only. The state of the in-stock serving. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "FAILED"
    | "RUNNING"
    | "ACTION_REQUIRED"
    | (string & {});
}

export const InStock: Schema.Schema<InStock> = Schema.suspend(() =>
  Schema.Struct({
    uri: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "InStock" }) as any as Schema.Schema<InStock>;

export interface Pickup {
  /** Required. Pickup product page URI. It is only used for the review of pickup serving. This URI domain should match with the business's homepage. */
  uri?: string;
  /** Output only. The state of the pickup serving. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "FAILED"
    | "RUNNING"
    | "ACTION_REQUIRED"
    | (string & {});
}

export const Pickup: Schema.Schema<Pickup> = Schema.suspend(() =>
  Schema.Struct({
    uri: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Pickup" }) as any as Schema.Schema<Pickup>;

export interface OmnichannelSetting {
  /** Optional. The InStock URI and state for this country. */
  inStock?: InStock;
  /** Output only. The established link to a LFP provider. */
  lfpLink?: LfpLink;
  /** Optional. The On Display to Order (ODO) policy URI and state for this country. */
  odo?: OnDisplayToOrder;
  /** Optional. The about page URI and state for this country. */
  about?: About;
  /** Identifier. The resource name of the omnichannel setting. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}` */
  name?: string;
  /** Required. Immutable. Region code defined by [CLDR](https://cldr.unicode.org/). Must be provided in the Create method, and is immutable. */
  regionCode?: string;
  /** Required. The Local Store Front type for this country. */
  lsfType?:
    | "LSF_TYPE_UNSPECIFIED"
    | "GHLSF"
    | "MHLSF_BASIC"
    | "MHLSF_FULL"
    | (string & {});
  /** Optional. The Pickup URI and state for this country. */
  pickup?: Pickup;
  /** Optional. The inventory verification contact and state for this country. */
  inventoryVerification?: InventoryVerification;
}

export const OmnichannelSetting: Schema.Schema<OmnichannelSetting> =
  Schema.suspend(() =>
    Schema.Struct({
      inStock: Schema.optional(InStock),
      lfpLink: Schema.optional(LfpLink),
      odo: Schema.optional(OnDisplayToOrder),
      about: Schema.optional(About),
      name: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      lsfType: Schema.optional(Schema.String),
      pickup: Schema.optional(Pickup),
      inventoryVerification: Schema.optional(InventoryVerification),
    }),
  ).annotate({
    identifier: "OmnichannelSetting",
  }) as any as Schema.Schema<OmnichannelSetting>;

export interface ListOmnichannelSettingsResponse {
  /** The omnichannel settings from the specified merchant. */
  omnichannelSettings?: Array<OmnichannelSetting>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListOmnichannelSettingsResponse: Schema.Schema<ListOmnichannelSettingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      omnichannelSettings: Schema.optional(Schema.Array(OmnichannelSetting)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOmnichannelSettingsResponse",
  }) as any as Schema.Schema<ListOmnichannelSettingsResponse>;

export interface DeveloperRegistration {
  /** Output only. The GCP ids attached to this developer registration */
  gcpIds?: Array<string>;
  /** Identifier. The `name` (ID) of the developer registration. Generated by the Content API upon creation of a new `DeveloperRegistration`. The `account` represents the merchant ID of the merchant that owns the registration. */
  name?: string;
}

export const DeveloperRegistration: Schema.Schema<DeveloperRegistration> =
  Schema.suspend(() =>
    Schema.Struct({
      gcpIds: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeveloperRegistration",
  }) as any as Schema.Schema<DeveloperRegistration>;

export interface ListAccountsResponse {
  /** The accounts matching the `ListAccountsRequest`. */
  accounts?: Array<Account>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accounts: Schema.optional(Schema.Array(Account)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountsResponse",
  }) as any as Schema.Schema<ListAccountsResponse>;

export interface RejectAccountServiceRequest {}

export const RejectAccountServiceRequest: Schema.Schema<RejectAccountServiceRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RejectAccountServiceRequest",
  }) as any as Schema.Schema<RejectAccountServiceRequest>;

export interface TermsOfService {
  /** Identifier. The resource name of the terms of service version. Format: `termsOfService/{version}` */
  name?: string;
  /** Region code as defined by [CLDR](https://cldr.unicode.org/). This is either a country where the ToS applies specifically to that country or `001` when the same `TermsOfService` can be signed in any country. However note that when signing a ToS that applies globally we still expect that a specific country is provided (this should be merchant business country or program country of participation). */
  regionCode?: string;
  /** The Kind this terms of service version applies to. */
  kind?:
    | "TERMS_OF_SERVICE_KIND_UNSPECIFIED"
    | "MERCHANT_CENTER"
    | (string & {});
  /** Whether this terms of service version is external. External terms of service versions can only be agreed through external processes and not directly by the merchant through UI or API. */
  external?: boolean;
  /** URI for terms of service file that needs to be displayed to signing users. */
  fileUri?: string;
}

export const TermsOfService: Schema.Schema<TermsOfService> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      external: Schema.optional(Schema.Boolean),
      fileUri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TermsOfService",
}) as any as Schema.Schema<TermsOfService>;

export interface Homepage {
  /** Output only. Whether the homepage is claimed. See https://support.google.com/merchants/answer/176793. */
  claimed?: boolean;
  /** Identifier. The resource name of the store's homepage. Format: `accounts/{account}/homepage` */
  name?: string;
  /** Required. The URI (typically a URL) of the store's homepage. */
  uri?: string;
}

export const Homepage: Schema.Schema<Homepage> = Schema.suspend(() =>
  Schema.Struct({
    claimed: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Homepage" }) as any as Schema.Schema<Homepage>;

export interface ApproveAccountServiceRequest {}

export const ApproveAccountServiceRequest: Schema.Schema<ApproveAccountServiceRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ApproveAccountServiceRequest",
  }) as any as Schema.Schema<ApproveAccountServiceRequest>;

export interface RequestInventoryVerificationResponse {
  /** The omnichannel setting that was updated. */
  omnichannelSetting?: OmnichannelSetting;
}

export const RequestInventoryVerificationResponse: Schema.Schema<RequestInventoryVerificationResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      omnichannelSetting: Schema.optional(OmnichannelSetting),
    }),
  ).annotate({
    identifier: "RequestInventoryVerificationResponse",
  }) as any as Schema.Schema<RequestInventoryVerificationResponse>;

export interface UnregisterGcpRequest {}

export const UnregisterGcpRequest: Schema.Schema<UnregisterGcpRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UnregisterGcpRequest",
  }) as any as Schema.Schema<UnregisterGcpRequest>;

export interface EnableProgramRequest {}

export const EnableProgramRequest: Schema.Schema<EnableProgramRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "EnableProgramRequest",
  }) as any as Schema.Schema<EnableProgramRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetTermsOfServiceRequest {
  /** Required. The resource name of the terms of service version. Format: `termsOfService/{version}` */
  name: string;
}

export const GetTermsOfServiceRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/termsOfService/{termsOfServiceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetTermsOfServiceRequest>;

export type GetTermsOfServiceResponse = TermsOfService;
export const GetTermsOfServiceResponse = TermsOfService;

export type GetTermsOfServiceError = DefaultErrors;

/** Retrieves the `TermsOfService` associated with the provided version. */
export const getTermsOfService: API.OperationMethod<
  GetTermsOfServiceRequest,
  GetTermsOfServiceResponse,
  GetTermsOfServiceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTermsOfServiceRequest,
  output: GetTermsOfServiceResponse,
  errors: [],
}));

export interface AcceptTermsOfServiceRequest {
  /** Required. The resource name of the terms of service version. Format: `termsOfService/{version}` */
  name: string;
  /** Required. Region code as defined by [CLDR](https://cldr.unicode.org/). This is either a country when the ToS applies specifically to that country or 001 when it applies globally. */
  regionCode?: string;
  /** Required. The account for which to accept the ToS. Format: `accounts/{account}` */
  account?: string;
}

export const AcceptTermsOfServiceRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  account: Schema.optional(Schema.String).pipe(T.HttpQuery("account")),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/termsOfService/{termsOfServiceId}:accept",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AcceptTermsOfServiceRequest>;

export type AcceptTermsOfServiceResponse_Op = AcceptTermsOfServiceResponse;
export const AcceptTermsOfServiceResponse_Op = AcceptTermsOfServiceResponse;

export type AcceptTermsOfServiceError = DefaultErrors;

/** Accepts a `TermsOfService`. Executing this method requires admin access. */
export const acceptTermsOfService: API.OperationMethod<
  AcceptTermsOfServiceRequest,
  AcceptTermsOfServiceResponse_Op,
  AcceptTermsOfServiceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AcceptTermsOfServiceRequest,
  output: AcceptTermsOfServiceResponse_Op,
  errors: [],
}));

export interface RetrieveLatestTermsOfServiceRequest {
  /** Required. Region code as defined by [CLDR](https://cldr.unicode.org/). This is either a country when the ToS applies specifically to that country or 001 when it applies globally. */
  regionCode?: string;
  /** Required. The Kind this terms of service version applies to. */
  kind?:
    | "TERMS_OF_SERVICE_KIND_UNSPECIFIED"
    | "MERCHANT_CENTER"
    | (string & {});
}

export const RetrieveLatestTermsOfServiceRequest = Schema.Struct({
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/termsOfService:retrieveLatest",
  }),
  svc,
) as unknown as Schema.Schema<RetrieveLatestTermsOfServiceRequest>;

export type RetrieveLatestTermsOfServiceResponse = TermsOfService;
export const RetrieveLatestTermsOfServiceResponse = TermsOfService;

export type RetrieveLatestTermsOfServiceError = DefaultErrors;

/** Retrieves the latest version of the `TermsOfService` for a given `kind` and `region_code`. */
export const retrieveLatestTermsOfService: API.OperationMethod<
  RetrieveLatestTermsOfServiceRequest,
  RetrieveLatestTermsOfServiceResponse,
  RetrieveLatestTermsOfServiceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RetrieveLatestTermsOfServiceRequest,
  output: RetrieveLatestTermsOfServiceResponse,
  errors: [],
}));

export interface DeleteAccountsRequest {
  /** Optional. If set to `true`, the account is deleted even if it provides services to other accounts or has processed offers. */
  force?: boolean;
  /** Required. The name of the account to delete. Format: `accounts/{account}` */
  name: string;
}

export const DeleteAccountsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "accounts/v1beta/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRequest>;

export type DeleteAccountsResponse = Empty;
export const DeleteAccountsResponse = Empty;

export type DeleteAccountsError = DefaultErrors;

/** Deletes the specified account regardless of its type: standalone, advanced account or sub-account. Deleting an advanced account leads to the deletion of all of its sub-accounts. This also deletes the account's [developer registration entity](/merchant/api/reference/rest/accounts_v1beta/accounts.developerRegistration) and any associated GCP project to the account. Executing this method requires admin access. The deletion succeeds only if the account does not provide services to any other account and has no processed offers. You can use the `force` parameter to override this. */
export const deleteAccounts: API.OperationMethod<
  DeleteAccountsRequest,
  DeleteAccountsResponse,
  DeleteAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsRequest,
  output: DeleteAccountsResponse,
  errors: [],
}));

export interface PatchAccountsRequest {
  /** Identifier. The resource name of the account. Format: `accounts/{account}` */
  name: string;
  /** Optional. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `account_name` - `adult_content` - `language_code` - `time_zone` */
  updateMask?: string;
  /** Request body */
  body?: Account;
}

export const PatchAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRequest>;

export type PatchAccountsResponse = Account;
export const PatchAccountsResponse = Account;

export type PatchAccountsError = DefaultErrors;

/** Updates an account regardless of its type: standalone, advanced account or sub-account. Executing this method requires admin access. */
export const patchAccounts: API.OperationMethod<
  PatchAccountsRequest,
  PatchAccountsResponse,
  PatchAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsRequest,
  output: PatchAccountsResponse,
  errors: [],
}));

export interface CreateAndConfigureAccountsRequest {
  /** Request body */
  body?: CreateAndConfigureAccountRequest;
}

export const CreateAndConfigureAccountsRequest = Schema.Struct({
  body: Schema.optional(CreateAndConfigureAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts:createAndConfigure",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAndConfigureAccountsRequest>;

export type CreateAndConfigureAccountsResponse = Account;
export const CreateAndConfigureAccountsResponse = Account;

export type CreateAndConfigureAccountsError = DefaultErrors;

/** Creates a Merchant Center account with additional configuration. Adds the user that makes the request as an admin for the new account. */
export const createAndConfigureAccounts: API.OperationMethod<
  CreateAndConfigureAccountsRequest,
  CreateAndConfigureAccountsResponse,
  CreateAndConfigureAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAndConfigureAccountsRequest,
  output: CreateAndConfigureAccountsResponse,
  errors: [],
}));

export interface GetAccountsRequest {
  /** Required. The name of the account to retrieve. Format: `accounts/{account}` */
  name: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "accounts/v1beta/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = DefaultErrors;

/** Retrieves an account from your Merchant Center account. After inserting, updating, or deleting an account, it may take several minutes before changes take effect. */
export const getAccounts: API.OperationMethod<
  GetAccountsRequest,
  GetAccountsResponse,
  GetAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

export interface ListAccountsRequest {
  /** Optional. A page token, received from a previous `accounts.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided in the `accounts.list` request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of accounts to return. The service may return fewer than this value. If unspecified, at most 250 accounts are returned. The maximum value is 500; values above 500 are coerced to 500. */
  pageSize?: number;
  /** Optional. Returns only accounts that match the [filter](https://developers.google.com/merchant/api/guides/accounts/filter). For more details, see the [filter syntax reference](https://developers.google.com/merchant/api/guides/accounts/filter-syntax). */
  filter?: string;
}

export const ListAccountsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "accounts/v1beta/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse_Op = ListAccountsResponse;
export const ListAccountsResponse_Op = ListAccountsResponse;

export type ListAccountsError = DefaultErrors;

/** Note: For the `accounts.list` method, quota and limits usage are charged for each user, and not for the Merchant Center ID or the advanced account ID. To list several sub-accounts, you should use the `accounts.listSubaccounts` method, which is more suitable for advanced accounts use case. */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse_Op,
  ListAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListSubaccountsAccountsRequest {
  /** Optional. A page token, received from a previous `accounts.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided in the `accounts.list` request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of accounts to return. The service may return fewer than this value. If unspecified, at most 250 accounts are returned. The maximum value is 500; values above 500 are coerced to 500. */
  pageSize?: number;
  /** Required. The aggregation service provider. Format: `accounts/{accountId}` */
  provider: string;
}

export const ListSubaccountsAccountsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  provider: Schema.String.pipe(T.HttpPath("provider")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}:listSubaccounts",
  }),
  svc,
) as unknown as Schema.Schema<ListSubaccountsAccountsRequest>;

export type ListSubaccountsAccountsResponse = ListSubAccountsResponse;
export const ListSubaccountsAccountsResponse = ListSubAccountsResponse;

export type ListSubaccountsAccountsError = DefaultErrors;

/** List all sub-accounts for a given advanced account. This is a convenience wrapper for the more powerful `accounts.list` method. This method will produce the same results as calling `ListsAccounts` with the following filter: `relationship(providerId={parent} AND service(type="ACCOUNT_AGGREGATION"))` */
export const listSubaccountsAccounts: API.PaginatedOperationMethod<
  ListSubaccountsAccountsRequest,
  ListSubaccountsAccountsResponse,
  ListSubaccountsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListSubaccountsAccountsRequest,
  output: ListSubaccountsAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsTermsOfServiceAgreementStatesRequest {
  /** Required. The resource name of the terms of service version. Format: `accounts/{account}/termsOfServiceAgreementStates/{identifier}` The identifier format is: `{TermsOfServiceKind}-{country}` */
  name: string;
}

export const GetAccountsTermsOfServiceAgreementStatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/termsOfServiceAgreementStates/{termsOfServiceAgreementStatesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsTermsOfServiceAgreementStatesRequest>;

export type GetAccountsTermsOfServiceAgreementStatesResponse =
  TermsOfServiceAgreementState;
export const GetAccountsTermsOfServiceAgreementStatesResponse =
  TermsOfServiceAgreementState;

export type GetAccountsTermsOfServiceAgreementStatesError = DefaultErrors;

/** Returns the state of a terms of service agreement. */
export const getAccountsTermsOfServiceAgreementStates: API.OperationMethod<
  GetAccountsTermsOfServiceAgreementStatesRequest,
  GetAccountsTermsOfServiceAgreementStatesResponse,
  GetAccountsTermsOfServiceAgreementStatesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsTermsOfServiceAgreementStatesRequest,
  output: GetAccountsTermsOfServiceAgreementStatesResponse,
  errors: [],
}));

export interface RetrieveForApplicationAccountsTermsOfServiceAgreementStatesRequest {
  /** Required. The account for which to get a TermsOfServiceAgreementState Format: `accounts/{account}` */
  parent: string;
}

export const RetrieveForApplicationAccountsTermsOfServiceAgreementStatesRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "accounts/v1beta/accounts/{accountsId}/termsOfServiceAgreementStates:retrieveForApplication",
    }),
    svc,
  ) as unknown as Schema.Schema<RetrieveForApplicationAccountsTermsOfServiceAgreementStatesRequest>;

export type RetrieveForApplicationAccountsTermsOfServiceAgreementStatesResponse =
  TermsOfServiceAgreementState;
export const RetrieveForApplicationAccountsTermsOfServiceAgreementStatesResponse =
  TermsOfServiceAgreementState;

export type RetrieveForApplicationAccountsTermsOfServiceAgreementStatesError =
  DefaultErrors;

/** Retrieves the state of the agreement for the application terms of service. Application terms of service covers permissions related to the usage of data provided through Merchant Center, CSS Center, Manufacturer Center, and more. */
export const retrieveForApplicationAccountsTermsOfServiceAgreementStates: API.OperationMethod<
  RetrieveForApplicationAccountsTermsOfServiceAgreementStatesRequest,
  RetrieveForApplicationAccountsTermsOfServiceAgreementStatesResponse,
  RetrieveForApplicationAccountsTermsOfServiceAgreementStatesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RetrieveForApplicationAccountsTermsOfServiceAgreementStatesRequest,
  output: RetrieveForApplicationAccountsTermsOfServiceAgreementStatesResponse,
  errors: [],
}));

export interface GetAutomaticImprovementsAccountsAutomaticImprovementsRequest {
  /** Required. The resource name of the automatic improvements. Format: `accounts/{account}/automaticImprovements` */
  name: string;
}

export const GetAutomaticImprovementsAccountsAutomaticImprovementsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "accounts/v1beta/accounts/{accountsId}/automaticImprovements",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAutomaticImprovementsAccountsAutomaticImprovementsRequest>;

export type GetAutomaticImprovementsAccountsAutomaticImprovementsResponse =
  AutomaticImprovements;
export const GetAutomaticImprovementsAccountsAutomaticImprovementsResponse =
  AutomaticImprovements;

export type GetAutomaticImprovementsAccountsAutomaticImprovementsError =
  DefaultErrors;

/** Retrieves the automatic improvements of an account. */
export const getAutomaticImprovementsAccountsAutomaticImprovements: API.OperationMethod<
  GetAutomaticImprovementsAccountsAutomaticImprovementsRequest,
  GetAutomaticImprovementsAccountsAutomaticImprovementsResponse,
  GetAutomaticImprovementsAccountsAutomaticImprovementsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAutomaticImprovementsAccountsAutomaticImprovementsRequest,
  output: GetAutomaticImprovementsAccountsAutomaticImprovementsResponse,
  errors: [],
}));

export interface UpdateAutomaticImprovementsAccountsAutomaticImprovementsRequest {
  /** Identifier. The resource name of the automatic improvements. Format: `accounts/{account}/automaticImprovements`. */
  name: string;
  /** Required. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `item_updates` - `item_updates.account_level_settings` - `image_improvements` - `image_improvements.account_level_settings` - `shipping_improvements` - `shipping_improvements.allow_shipping_improvements` */
  updateMask?: string;
  /** Request body */
  body?: AutomaticImprovements;
}

export const UpdateAutomaticImprovementsAccountsAutomaticImprovementsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(AutomaticImprovements).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/v1beta/accounts/{accountsId}/automaticImprovements",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateAutomaticImprovementsAccountsAutomaticImprovementsRequest>;

export type UpdateAutomaticImprovementsAccountsAutomaticImprovementsResponse =
  AutomaticImprovements;
export const UpdateAutomaticImprovementsAccountsAutomaticImprovementsResponse =
  AutomaticImprovements;

export type UpdateAutomaticImprovementsAccountsAutomaticImprovementsError =
  DefaultErrors;

/** Updates the automatic improvements of an account. */
export const updateAutomaticImprovementsAccountsAutomaticImprovements: API.OperationMethod<
  UpdateAutomaticImprovementsAccountsAutomaticImprovementsRequest,
  UpdateAutomaticImprovementsAccountsAutomaticImprovementsResponse,
  UpdateAutomaticImprovementsAccountsAutomaticImprovementsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAutomaticImprovementsAccountsAutomaticImprovementsRequest,
  output: UpdateAutomaticImprovementsAccountsAutomaticImprovementsResponse,
  errors: [],
}));

export interface CreateAccountsRegionsRequest {
  /** Required. The account to create a region for. Format: `accounts/{account}` */
  parent: string;
  /** Required. The identifier for the region, unique over all regions of the same account. */
  regionId?: string;
  /** Request body */
  body?: Region;
}

export const CreateAccountsRegionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  regionId: Schema.optional(Schema.String).pipe(T.HttpQuery("regionId")),
  body: Schema.optional(Region).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/regions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsRegionsRequest>;

export type CreateAccountsRegionsResponse = Region;
export const CreateAccountsRegionsResponse = Region;

export type CreateAccountsRegionsError = DefaultErrors;

/** Creates a region definition in your Merchant Center account. Executing this method requires admin access. */
export const createAccountsRegions: API.OperationMethod<
  CreateAccountsRegionsRequest,
  CreateAccountsRegionsResponse,
  CreateAccountsRegionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsRegionsRequest,
  output: CreateAccountsRegionsResponse,
  errors: [],
}));

export interface PatchAccountsRegionsRequest {
  /** Identifier. The resource name of the region. Format: `accounts/{account}/regions/{region}` */
  name: string;
  /** Optional. The comma-separated field mask indicating the fields to update. Example: `"displayName,postalCodeArea.regionCode"`. */
  updateMask?: string;
  /** Request body */
  body?: Region;
}

export const PatchAccountsRegionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Region).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/regions/{regionsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRegionsRequest>;

export type PatchAccountsRegionsResponse = Region;
export const PatchAccountsRegionsResponse = Region;

export type PatchAccountsRegionsError = DefaultErrors;

/** Updates a region definition in your Merchant Center account. Executing this method requires admin access. */
export const patchAccountsRegions: API.OperationMethod<
  PatchAccountsRegionsRequest,
  PatchAccountsRegionsResponse,
  PatchAccountsRegionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsRegionsRequest,
  output: PatchAccountsRegionsResponse,
  errors: [],
}));

export interface DeleteAccountsRegionsRequest {
  /** Required. The name of the region to delete. Format: `accounts/{account}/regions/{region}` */
  name: string;
}

export const DeleteAccountsRegionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "accounts/v1beta/accounts/{accountsId}/regions/{regionsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRegionsRequest>;

export type DeleteAccountsRegionsResponse = Empty;
export const DeleteAccountsRegionsResponse = Empty;

export type DeleteAccountsRegionsError = DefaultErrors;

/** Deletes a region definition from your Merchant Center account. Executing this method requires admin access. */
export const deleteAccountsRegions: API.OperationMethod<
  DeleteAccountsRegionsRequest,
  DeleteAccountsRegionsResponse,
  DeleteAccountsRegionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsRegionsRequest,
  output: DeleteAccountsRegionsResponse,
  errors: [],
}));

export interface ListAccountsRegionsRequest {
  /** Optional. A page token, received from a previous `ListRegions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRegions` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The account to list regions for. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of regions to return. The service may return fewer than this value. If unspecified, at most 50 regions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListAccountsRegionsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/regions",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsRegionsRequest>;

export type ListAccountsRegionsResponse = ListRegionsResponse;
export const ListAccountsRegionsResponse = ListRegionsResponse;

export type ListAccountsRegionsError = DefaultErrors;

/** Lists the regions in your Merchant Center account. */
export const listAccountsRegions: API.PaginatedOperationMethod<
  ListAccountsRegionsRequest,
  ListAccountsRegionsResponse,
  ListAccountsRegionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsRegionsRequest,
  output: ListAccountsRegionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsRegionsRequest {
  /** Required. The name of the region to retrieve. Format: `accounts/{account}/regions/{region}` */
  name: string;
}

export const GetAccountsRegionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/regions/{regionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsRegionsRequest>;

export type GetAccountsRegionsResponse = Region;
export const GetAccountsRegionsResponse = Region;

export type GetAccountsRegionsError = DefaultErrors;

/** Retrieves a region defined in your Merchant Center account. */
export const getAccountsRegions: API.OperationMethod<
  GetAccountsRegionsRequest,
  GetAccountsRegionsResponse,
  GetAccountsRegionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsRegionsRequest,
  output: GetAccountsRegionsResponse,
  errors: [],
}));

export interface ListAccountsGbpAccountsRequest {
  /** Optional. A page token, received from a previous `ListGbpAccounts` call. Provide the page token to retrieve the subsequent page. When paginating, all other parameters provided to `ListGbpAccounts` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The name of the parent resource under which the GBP accounts are listed. Format: `accounts/{account}`. */
  parent: string;
  /** Optional. The maximum number of `GbpAccount` resources to return. The service returns fewer than this value if the number of gbp accounts is less that than the `pageSize`. The default value is 50. The maximum value is 1000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum. */
  pageSize?: number;
}

export const ListAccountsGbpAccountsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/gbpAccounts",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsGbpAccountsRequest>;

export type ListAccountsGbpAccountsResponse = ListGbpAccountsResponse;
export const ListAccountsGbpAccountsResponse = ListGbpAccountsResponse;

export type ListAccountsGbpAccountsError = DefaultErrors;

/** List the GBP accounts for a given merchant. */
export const listAccountsGbpAccounts: API.PaginatedOperationMethod<
  ListAccountsGbpAccountsRequest,
  ListAccountsGbpAccountsResponse,
  ListAccountsGbpAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsGbpAccountsRequest,
  output: ListAccountsGbpAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LinkGbpAccountAccountsGbpAccountsRequest {
  /** Required. The name of the parent resource to which the GBP account is linked. Format: `accounts/{account}`. */
  parent: string;
  /** Request body */
  body?: LinkGbpAccountRequest;
}

export const LinkGbpAccountAccountsGbpAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(LinkGbpAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/gbpAccounts:linkGbpAccount",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<LinkGbpAccountAccountsGbpAccountsRequest>;

export type LinkGbpAccountAccountsGbpAccountsResponse = LinkGbpAccountResponse;
export const LinkGbpAccountAccountsGbpAccountsResponse = LinkGbpAccountResponse;

export type LinkGbpAccountAccountsGbpAccountsError = DefaultErrors;

/** Link the specified merchant to a GBP account for all countries. To run this method, you must have admin access to the Merchant Center account. If you don't have admin access, the request fails with the error message `User is not an administrator of account {ACCOUNT_ID}`. */
export const linkGbpAccountAccountsGbpAccounts: API.OperationMethod<
  LinkGbpAccountAccountsGbpAccountsRequest,
  LinkGbpAccountAccountsGbpAccountsResponse,
  LinkGbpAccountAccountsGbpAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LinkGbpAccountAccountsGbpAccountsRequest,
  output: LinkGbpAccountAccountsGbpAccountsResponse,
  errors: [],
}));

export interface UpdateAutofeedSettingsAccountsAutofeedSettingsRequest {
  /** Identifier. The resource name of the autofeed settings. Format: `accounts/{account}/autofeedSettings`. */
  name: string;
  /** Required. List of fields being updated. */
  updateMask?: string;
  /** Request body */
  body?: AutofeedSettings;
}

export const UpdateAutofeedSettingsAccountsAutofeedSettingsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(AutofeedSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/v1beta/accounts/{accountsId}/autofeedSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateAutofeedSettingsAccountsAutofeedSettingsRequest>;

export type UpdateAutofeedSettingsAccountsAutofeedSettingsResponse =
  AutofeedSettings;
export const UpdateAutofeedSettingsAccountsAutofeedSettingsResponse =
  AutofeedSettings;

export type UpdateAutofeedSettingsAccountsAutofeedSettingsError = DefaultErrors;

/** Updates the autofeed settings of an account. */
export const updateAutofeedSettingsAccountsAutofeedSettings: API.OperationMethod<
  UpdateAutofeedSettingsAccountsAutofeedSettingsRequest,
  UpdateAutofeedSettingsAccountsAutofeedSettingsResponse,
  UpdateAutofeedSettingsAccountsAutofeedSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAutofeedSettingsAccountsAutofeedSettingsRequest,
  output: UpdateAutofeedSettingsAccountsAutofeedSettingsResponse,
  errors: [],
}));

export interface GetAutofeedSettingsAccountsAutofeedSettingsRequest {
  /** Required. The resource name of the autofeed settings. Format: `accounts/{account}/autofeedSettings` */
  name: string;
}

export const GetAutofeedSettingsAccountsAutofeedSettingsRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/autofeedSettings",
  }),
  svc,
) as unknown as Schema.Schema<GetAutofeedSettingsAccountsAutofeedSettingsRequest>;

export type GetAutofeedSettingsAccountsAutofeedSettingsResponse =
  AutofeedSettings;
export const GetAutofeedSettingsAccountsAutofeedSettingsResponse =
  AutofeedSettings;

export type GetAutofeedSettingsAccountsAutofeedSettingsError = DefaultErrors;

/** Retrieves the autofeed settings of an account. */
export const getAutofeedSettingsAccountsAutofeedSettings: API.OperationMethod<
  GetAutofeedSettingsAccountsAutofeedSettingsRequest,
  GetAutofeedSettingsAccountsAutofeedSettingsResponse,
  GetAutofeedSettingsAccountsAutofeedSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAutofeedSettingsAccountsAutofeedSettingsRequest,
  output: GetAutofeedSettingsAccountsAutofeedSettingsResponse,
  errors: [],
}));

export interface UnclaimAccountsHomepageRequest {
  /** Required. The name of the homepage to unclaim. Format: `accounts/{account}/homepage` */
  name: string;
  /** Request body */
  body?: UnclaimHomepageRequest;
}

export const UnclaimAccountsHomepageRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnclaimHomepageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/homepage:unclaim",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UnclaimAccountsHomepageRequest>;

export type UnclaimAccountsHomepageResponse = Homepage;
export const UnclaimAccountsHomepageResponse = Homepage;

export type UnclaimAccountsHomepageError = DefaultErrors;

/** Unclaims a store's homepage. Executing this method requires admin access. */
export const unclaimAccountsHomepage: API.OperationMethod<
  UnclaimAccountsHomepageRequest,
  UnclaimAccountsHomepageResponse,
  UnclaimAccountsHomepageError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnclaimAccountsHomepageRequest,
  output: UnclaimAccountsHomepageResponse,
  errors: [],
}));

export interface ClaimAccountsHomepageRequest {
  /** Required. The name of the homepage to claim. Format: `accounts/{account}/homepage` */
  name: string;
  /** Request body */
  body?: ClaimHomepageRequest;
}

export const ClaimAccountsHomepageRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ClaimHomepageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/homepage:claim",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ClaimAccountsHomepageRequest>;

export type ClaimAccountsHomepageResponse = Homepage;
export const ClaimAccountsHomepageResponse = Homepage;

export type ClaimAccountsHomepageError = DefaultErrors;

/** Claims a store's homepage. Executing this method requires admin access. If the homepage is already claimed, this will recheck the verification (unless the business is exempted from claiming, which also exempts from verification) and return a successful response. If ownership can no longer be verified, it will return an error, but it won't clear the claim. In case of failure, a canonical error message is returned: * PERMISSION_DENIED: User doesn't have the necessary permissions on this Merchant Center account. * FAILED_PRECONDITION: - The account is not a Merchant Center account. - Merchant Center account doesn't have a homepage. - Claiming failed (in this case the error message contains more details). */
export const claimAccountsHomepage: API.OperationMethod<
  ClaimAccountsHomepageRequest,
  ClaimAccountsHomepageResponse,
  ClaimAccountsHomepageError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ClaimAccountsHomepageRequest,
  output: ClaimAccountsHomepageResponse,
  errors: [],
}));

export interface UpdateHomepageAccountsHomepageRequest {
  /** Identifier. The resource name of the store's homepage. Format: `accounts/{account}/homepage` */
  name: string;
  /** Optional. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `uri` */
  updateMask?: string;
  /** Request body */
  body?: Homepage;
}

export const UpdateHomepageAccountsHomepageRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Homepage).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/homepage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateHomepageAccountsHomepageRequest>;

export type UpdateHomepageAccountsHomepageResponse = Homepage;
export const UpdateHomepageAccountsHomepageResponse = Homepage;

export type UpdateHomepageAccountsHomepageError = DefaultErrors;

/** Updates a store's homepage. Executing this method requires admin access. */
export const updateHomepageAccountsHomepage: API.OperationMethod<
  UpdateHomepageAccountsHomepageRequest,
  UpdateHomepageAccountsHomepageResponse,
  UpdateHomepageAccountsHomepageError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateHomepageAccountsHomepageRequest,
  output: UpdateHomepageAccountsHomepageResponse,
  errors: [],
}));

export interface GetHomepageAccountsHomepageRequest {
  /** Required. The name of the homepage to retrieve. Format: `accounts/{account}/homepage` */
  name: string;
}

export const GetHomepageAccountsHomepageRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/homepage",
  }),
  svc,
) as unknown as Schema.Schema<GetHomepageAccountsHomepageRequest>;

export type GetHomepageAccountsHomepageResponse = Homepage;
export const GetHomepageAccountsHomepageResponse = Homepage;

export type GetHomepageAccountsHomepageError = DefaultErrors;

/** Retrieves a store's homepage. */
export const getHomepageAccountsHomepage: API.OperationMethod<
  GetHomepageAccountsHomepageRequest,
  GetHomepageAccountsHomepageResponse,
  GetHomepageAccountsHomepageError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetHomepageAccountsHomepageRequest,
  output: GetHomepageAccountsHomepageResponse,
  errors: [],
}));

export interface GetBusinessIdentityAccountsBusinessIdentityRequest {
  /** Required. The resource name of the business identity. Format: `accounts/{account}/businessIdentity`. For example, `accounts/123456/businessIdentity`. */
  name: string;
}

export const GetBusinessIdentityAccountsBusinessIdentityRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/businessIdentity",
  }),
  svc,
) as unknown as Schema.Schema<GetBusinessIdentityAccountsBusinessIdentityRequest>;

export type GetBusinessIdentityAccountsBusinessIdentityResponse =
  BusinessIdentity;
export const GetBusinessIdentityAccountsBusinessIdentityResponse =
  BusinessIdentity;

export type GetBusinessIdentityAccountsBusinessIdentityError = DefaultErrors;

/** Retrieves the business identity of an account. */
export const getBusinessIdentityAccountsBusinessIdentity: API.OperationMethod<
  GetBusinessIdentityAccountsBusinessIdentityRequest,
  GetBusinessIdentityAccountsBusinessIdentityResponse,
  GetBusinessIdentityAccountsBusinessIdentityError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBusinessIdentityAccountsBusinessIdentityRequest,
  output: GetBusinessIdentityAccountsBusinessIdentityResponse,
  errors: [],
}));

export interface UpdateBusinessIdentityAccountsBusinessIdentityRequest {
  /** Identifier. The resource name of the business identity. Format: `accounts/{account}/businessIdentity` */
  name: string;
  /** Optional. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `black_owned` - `latino_owned` - `promotions_consent` - `small_business` - `veteran_owned` - `women_owned` */
  updateMask?: string;
  /** Request body */
  body?: BusinessIdentity;
}

export const UpdateBusinessIdentityAccountsBusinessIdentityRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(BusinessIdentity).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/v1beta/accounts/{accountsId}/businessIdentity",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateBusinessIdentityAccountsBusinessIdentityRequest>;

export type UpdateBusinessIdentityAccountsBusinessIdentityResponse =
  BusinessIdentity;
export const UpdateBusinessIdentityAccountsBusinessIdentityResponse =
  BusinessIdentity;

export type UpdateBusinessIdentityAccountsBusinessIdentityError = DefaultErrors;

/** Updates the business identity of an account. Executing this method requires admin access. */
export const updateBusinessIdentityAccountsBusinessIdentity: API.OperationMethod<
  UpdateBusinessIdentityAccountsBusinessIdentityRequest,
  UpdateBusinessIdentityAccountsBusinessIdentityResponse,
  UpdateBusinessIdentityAccountsBusinessIdentityError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateBusinessIdentityAccountsBusinessIdentityRequest,
  output: UpdateBusinessIdentityAccountsBusinessIdentityResponse,
  errors: [],
}));

export interface ListAccountsRelationshipsRequest {
  /** Optional. The token returned by the previous `list` request. */
  pageToken?: string;
  /** Required. The parent account of the account relationship to filter by. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of elements to return in the response. Use for paging. If no `page_size` is specified, `100` is used as the default value. The maximum allowed value is `1000`. */
  pageSize?: number;
}

export const ListAccountsRelationshipsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/relationships",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsRelationshipsRequest>;

export type ListAccountsRelationshipsResponse =
  ListAccountRelationshipsResponse;
export const ListAccountsRelationshipsResponse =
  ListAccountRelationshipsResponse;

export type ListAccountsRelationshipsError = DefaultErrors;

/** List account relationships for the specified account. */
export const listAccountsRelationships: API.PaginatedOperationMethod<
  ListAccountsRelationshipsRequest,
  ListAccountsRelationshipsResponse,
  ListAccountsRelationshipsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsRelationshipsRequest,
  output: ListAccountsRelationshipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchAccountsRelationshipsRequest {
  /** Identifier. The resource name of the account relationship. Format: `accounts/{account}/relationships/{relationship}`. For example, `accounts/123456/relationships/567890`. */
  name: string;
  /** Optional. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `account_id_alias` */
  updateMask?: string;
  /** Request body */
  body?: AccountRelationship;
}

export const PatchAccountsRelationshipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AccountRelationship).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/relationships/{relationshipsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRelationshipsRequest>;

export type PatchAccountsRelationshipsResponse = AccountRelationship;
export const PatchAccountsRelationshipsResponse = AccountRelationship;

export type PatchAccountsRelationshipsError = DefaultErrors;

/** Updates the account relationship. Executing this method requires admin access. */
export const patchAccountsRelationships: API.OperationMethod<
  PatchAccountsRelationshipsRequest,
  PatchAccountsRelationshipsResponse,
  PatchAccountsRelationshipsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsRelationshipsRequest,
  output: PatchAccountsRelationshipsResponse,
  errors: [],
}));

export interface GetAccountsRelationshipsRequest {
  /** Required. The resource name of the account relationship to get. Format: `accounts/{account}/relationships/{relationship}`. For example, `accounts/123456/relationships/567890`. */
  name: string;
}

export const GetAccountsRelationshipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/relationships/{relationshipsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsRelationshipsRequest>;

export type GetAccountsRelationshipsResponse = AccountRelationship;
export const GetAccountsRelationshipsResponse = AccountRelationship;

export type GetAccountsRelationshipsError = DefaultErrors;

/** Retrieve an account relationship. */
export const getAccountsRelationships: API.OperationMethod<
  GetAccountsRelationshipsRequest,
  GetAccountsRelationshipsResponse,
  GetAccountsRelationshipsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsRelationshipsRequest,
  output: GetAccountsRelationshipsResponse,
  errors: [],
}));

export interface GetShippingSettingsAccountsShippingSettingsRequest {
  /** Required. The name of the shipping setting to retrieve. Format: `accounts/{account}/shippingsettings` */
  name: string;
}

export const GetShippingSettingsAccountsShippingSettingsRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/shippingSettings",
  }),
  svc,
) as unknown as Schema.Schema<GetShippingSettingsAccountsShippingSettingsRequest>;

export type GetShippingSettingsAccountsShippingSettingsResponse =
  ShippingSettings;
export const GetShippingSettingsAccountsShippingSettingsResponse =
  ShippingSettings;

export type GetShippingSettingsAccountsShippingSettingsError = DefaultErrors;

/** Retrieve shipping setting information. */
export const getShippingSettingsAccountsShippingSettings: API.OperationMethod<
  GetShippingSettingsAccountsShippingSettingsRequest,
  GetShippingSettingsAccountsShippingSettingsResponse,
  GetShippingSettingsAccountsShippingSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetShippingSettingsAccountsShippingSettingsRequest,
  output: GetShippingSettingsAccountsShippingSettingsResponse,
  errors: [],
}));

export interface InsertAccountsShippingSettingsRequest {
  /** Required. The account for which this shipping setting will be inserted. If you are using an advanced account, you must specify the unique identifier of the sub-account for which you want to insert the shipping setting. Format: `accounts/{ACCOUNT_ID}` */
  parent: string;
  /** Request body */
  body?: ShippingSettings;
}

export const InsertAccountsShippingSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ShippingSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/shippingSettings:insert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAccountsShippingSettingsRequest>;

export type InsertAccountsShippingSettingsResponse = ShippingSettings;
export const InsertAccountsShippingSettingsResponse = ShippingSettings;

export type InsertAccountsShippingSettingsError = DefaultErrors;

/** Replace the shipping setting of a business with the request shipping setting. Executing this method requires admin access. */
export const insertAccountsShippingSettings: API.OperationMethod<
  InsertAccountsShippingSettingsRequest,
  InsertAccountsShippingSettingsResponse,
  InsertAccountsShippingSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAccountsShippingSettingsRequest,
  output: InsertAccountsShippingSettingsResponse,
  errors: [],
}));

export interface ProposeAccountsServicesRequest {
  /** Required. The resource name of the parent account for the service. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: ProposeAccountServiceRequest;
}

export const ProposeAccountsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ProposeAccountServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/services:propose",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ProposeAccountsServicesRequest>;

export type ProposeAccountsServicesResponse = AccountService;
export const ProposeAccountsServicesResponse = AccountService;

export type ProposeAccountsServicesError = DefaultErrors;

/** Propose an account service. */
export const proposeAccountsServices: API.OperationMethod<
  ProposeAccountsServicesRequest,
  ProposeAccountsServicesResponse,
  ProposeAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ProposeAccountsServicesRequest,
  output: ProposeAccountsServicesResponse,
  errors: [],
}));

export interface RejectAccountsServicesRequest {
  /** Required. The resource name of the account service to reject. Format: `accounts/{account}/services/{service}` */
  name: string;
  /** Request body */
  body?: RejectAccountServiceRequest;
}

export const RejectAccountsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectAccountServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/services/{servicesId}:reject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RejectAccountsServicesRequest>;

export type RejectAccountsServicesResponse = Empty;
export const RejectAccountsServicesResponse = Empty;

export type RejectAccountsServicesError = DefaultErrors;

/** Reject an account service (both proposed and approve services can be rejected). */
export const rejectAccountsServices: API.OperationMethod<
  RejectAccountsServicesRequest,
  RejectAccountsServicesResponse,
  RejectAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RejectAccountsServicesRequest,
  output: RejectAccountsServicesResponse,
  errors: [],
}));

export interface ListAccountsServicesRequest {
  /** Optional. The token returned by the previous `list` request. */
  pageToken?: string;
  /** Required. The parent account of the account service to filter by. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of elements to return in the response. Use for paging. If no `page_size` is specified, `100` is used as the default value. The maximum allowed value is `1000`. */
  pageSize?: number;
}

export const ListAccountsServicesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/services",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsServicesRequest>;

export type ListAccountsServicesResponse = ListAccountServicesResponse;
export const ListAccountsServicesResponse = ListAccountServicesResponse;

export type ListAccountsServicesError = DefaultErrors;

/** List account services for the specified accounts. Supports filtering. */
export const listAccountsServices: API.PaginatedOperationMethod<
  ListAccountsServicesRequest,
  ListAccountsServicesResponse,
  ListAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsServicesRequest,
  output: ListAccountsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ApproveAccountsServicesRequest {
  /** Required. The resource name of the account service to approve. Format: `accounts/{account}/services/{service}` */
  name: string;
  /** Request body */
  body?: ApproveAccountServiceRequest;
}

export const ApproveAccountsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveAccountServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/services/{servicesId}:approve",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ApproveAccountsServicesRequest>;

export type ApproveAccountsServicesResponse = AccountService;
export const ApproveAccountsServicesResponse = AccountService;

export type ApproveAccountsServicesError = DefaultErrors;

/** Approve an account service proposal. */
export const approveAccountsServices: API.OperationMethod<
  ApproveAccountsServicesRequest,
  ApproveAccountsServicesResponse,
  ApproveAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ApproveAccountsServicesRequest,
  output: ApproveAccountsServicesResponse,
  errors: [],
}));

export interface GetAccountsServicesRequest {
  /** Required. The resource name of the account service to get. Format: `accounts/{account}/services/{service}` */
  name: string;
}

export const GetAccountsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/services/{servicesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsServicesRequest>;

export type GetAccountsServicesResponse = AccountService;
export const GetAccountsServicesResponse = AccountService;

export type GetAccountsServicesError = DefaultErrors;

/** Retrieve an account service. */
export const getAccountsServices: API.OperationMethod<
  GetAccountsServicesRequest,
  GetAccountsServicesResponse,
  GetAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsServicesRequest,
  output: GetAccountsServicesResponse,
  errors: [],
}));

export interface RegisterGcpAccountsDeveloperRegistrationRequest {
  /** Required. The name of the developer registration to be created for the merchant account that the GCP will be registered with. Format: `accounts/{account}/developerRegistration` */
  name: string;
  /** Request body */
  body?: RegisterGcpRequest;
}

export const RegisterGcpAccountsDeveloperRegistrationRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RegisterGcpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/developerRegistration:registerGcp",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RegisterGcpAccountsDeveloperRegistrationRequest>;

export type RegisterGcpAccountsDeveloperRegistrationResponse =
  DeveloperRegistration;
export const RegisterGcpAccountsDeveloperRegistrationResponse =
  DeveloperRegistration;

export type RegisterGcpAccountsDeveloperRegistrationError = DefaultErrors;

/** Registers the GCP used for the API call to the shopping account passed in the request. Will create a user with an "API developer" and add the "developer_email" as a contact with "API notifications" email preference on. */
export const registerGcpAccountsDeveloperRegistration: API.OperationMethod<
  RegisterGcpAccountsDeveloperRegistrationRequest,
  RegisterGcpAccountsDeveloperRegistrationResponse,
  RegisterGcpAccountsDeveloperRegistrationError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RegisterGcpAccountsDeveloperRegistrationRequest,
  output: RegisterGcpAccountsDeveloperRegistrationResponse,
  errors: [],
}));

export interface GetDeveloperRegistrationAccountsDeveloperRegistrationRequest {
  /** Required. The `name` (ID) of the developer registration. */
  name: string;
}

export const GetDeveloperRegistrationAccountsDeveloperRegistrationRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "accounts/v1beta/accounts/{accountsId}/developerRegistration",
    }),
    svc,
  ) as unknown as Schema.Schema<GetDeveloperRegistrationAccountsDeveloperRegistrationRequest>;

export type GetDeveloperRegistrationAccountsDeveloperRegistrationResponse =
  DeveloperRegistration;
export const GetDeveloperRegistrationAccountsDeveloperRegistrationResponse =
  DeveloperRegistration;

export type GetDeveloperRegistrationAccountsDeveloperRegistrationError =
  DefaultErrors;

/** Retrieves a developer registration for a merchant. */
export const getDeveloperRegistrationAccountsDeveloperRegistration: API.OperationMethod<
  GetDeveloperRegistrationAccountsDeveloperRegistrationRequest,
  GetDeveloperRegistrationAccountsDeveloperRegistrationResponse,
  GetDeveloperRegistrationAccountsDeveloperRegistrationError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeveloperRegistrationAccountsDeveloperRegistrationRequest,
  output: GetDeveloperRegistrationAccountsDeveloperRegistrationResponse,
  errors: [],
}));

export interface UnregisterGcpAccountsDeveloperRegistrationRequest {
  /** Required. The name of the developer registration to be created for the merchant account that the GCP will be registered with. Format: `accounts/{account}/developerRegistration` */
  name: string;
  /** Request body */
  body?: UnregisterGcpRequest;
}

export const UnregisterGcpAccountsDeveloperRegistrationRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnregisterGcpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/developerRegistration:unregisterGcp",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UnregisterGcpAccountsDeveloperRegistrationRequest>;

export type UnregisterGcpAccountsDeveloperRegistrationResponse = Empty;
export const UnregisterGcpAccountsDeveloperRegistrationResponse = Empty;

export type UnregisterGcpAccountsDeveloperRegistrationError = DefaultErrors;

/** Unregister the calling GCP from the calling shopping account. Note that the GCP will still be able to access the API for at most 1 day from the unregister succussful call. */
export const unregisterGcpAccountsDeveloperRegistration: API.OperationMethod<
  UnregisterGcpAccountsDeveloperRegistrationRequest,
  UnregisterGcpAccountsDeveloperRegistrationResponse,
  UnregisterGcpAccountsDeveloperRegistrationError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UnregisterGcpAccountsDeveloperRegistrationRequest,
  output: UnregisterGcpAccountsDeveloperRegistrationResponse,
  errors: [],
}));

export interface GetAccountForGcpRegistrationAccountsDeveloperRegistrationRequest {}

export const GetAccountForGcpRegistrationAccountsDeveloperRegistrationRequest =
  Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "accounts/v1beta/accounts:getAccountForGcpRegistration",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAccountForGcpRegistrationAccountsDeveloperRegistrationRequest>;

export type GetAccountForGcpRegistrationAccountsDeveloperRegistrationResponse =
  GetAccountForGcpRegistrationResponse;
export const GetAccountForGcpRegistrationAccountsDeveloperRegistrationResponse =
  GetAccountForGcpRegistrationResponse;

export type GetAccountForGcpRegistrationAccountsDeveloperRegistrationError =
  DefaultErrors;

/** Retrieves the merchant account that the calling GCP is registered with. */
export const getAccountForGcpRegistrationAccountsDeveloperRegistration: API.OperationMethod<
  GetAccountForGcpRegistrationAccountsDeveloperRegistrationRequest,
  GetAccountForGcpRegistrationAccountsDeveloperRegistrationResponse,
  GetAccountForGcpRegistrationAccountsDeveloperRegistrationError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountForGcpRegistrationAccountsDeveloperRegistrationRequest,
  output: GetAccountForGcpRegistrationAccountsDeveloperRegistrationResponse,
  errors: [],
}));

export interface GetBusinessInfoAccountsBusinessInfoRequest {
  /** Required. The resource name of the business info. Format: `accounts/{account}/businessInfo`. For example, `accounts/123456/businessInfo`. */
  name: string;
}

export const GetBusinessInfoAccountsBusinessInfoRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/businessInfo",
  }),
  svc,
) as unknown as Schema.Schema<GetBusinessInfoAccountsBusinessInfoRequest>;

export type GetBusinessInfoAccountsBusinessInfoResponse = BusinessInfo;
export const GetBusinessInfoAccountsBusinessInfoResponse = BusinessInfo;

export type GetBusinessInfoAccountsBusinessInfoError = DefaultErrors;

/** Retrieves the business info of an account. */
export const getBusinessInfoAccountsBusinessInfo: API.OperationMethod<
  GetBusinessInfoAccountsBusinessInfoRequest,
  GetBusinessInfoAccountsBusinessInfoResponse,
  GetBusinessInfoAccountsBusinessInfoError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBusinessInfoAccountsBusinessInfoRequest,
  output: GetBusinessInfoAccountsBusinessInfoResponse,
  errors: [],
}));

export interface UpdateBusinessInfoAccountsBusinessInfoRequest {
  /** Identifier. The resource name of the business info. Format: `accounts/{account}/businessInfo` */
  name: string;
  /** Optional. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `address` - `customer_service` - `korean_business_registration_number` */
  updateMask?: string;
  /** Request body */
  body?: BusinessInfo;
}

export const UpdateBusinessInfoAccountsBusinessInfoRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BusinessInfo).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/businessInfo",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateBusinessInfoAccountsBusinessInfoRequest>;

export type UpdateBusinessInfoAccountsBusinessInfoResponse = BusinessInfo;
export const UpdateBusinessInfoAccountsBusinessInfoResponse = BusinessInfo;

export type UpdateBusinessInfoAccountsBusinessInfoError = DefaultErrors;

/** Updates the business info of an account. Executing this method requires admin access. */
export const updateBusinessInfoAccountsBusinessInfo: API.OperationMethod<
  UpdateBusinessInfoAccountsBusinessInfoRequest,
  UpdateBusinessInfoAccountsBusinessInfoResponse,
  UpdateBusinessInfoAccountsBusinessInfoError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateBusinessInfoAccountsBusinessInfoRequest,
  output: UpdateBusinessInfoAccountsBusinessInfoResponse,
  errors: [],
}));

export interface ListAccountsIssuesRequest {
  /** Optional. A page token, received from a previous `ListAccountIssues` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountIssues` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The issues in the response will have human-readable fields in the given language. The format is [BCP-47](https://tools.ietf.org/html/bcp47), such as `en-US` or `sr-Latn`. If not value is provided, `en-US` will be used. */
  languageCode?: string;
  /** Required. The parent, which owns this collection of issues. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in human-readable fields. For example 'America/Los_Angeles'. If not set, 'America/Los_Angeles' will be used. */
  timeZone?: string;
  /** Optional. The maximum number of issues to return. The service may return fewer than this value. If unspecified, at most 50 issues will be returned. The maximum value is 100; values above 100 will be coerced to 100 */
  pageSize?: number;
}

export const ListAccountsIssuesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/issues",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsIssuesRequest>;

export type ListAccountsIssuesResponse = ListAccountIssuesResponse;
export const ListAccountsIssuesResponse = ListAccountIssuesResponse;

export type ListAccountsIssuesError = DefaultErrors;

/** Lists all account issues of a Merchant Center account. When called on a multi-client account, this method only returns issues belonging to that account, not its sub-accounts. To retrieve issues for sub-accounts, you must first call the accounts.listSubaccounts method to obtain a list of sub-accounts, and then call `accounts.issues.list` for each sub-account individually. */
export const listAccountsIssues: API.PaginatedOperationMethod<
  ListAccountsIssuesRequest,
  ListAccountsIssuesResponse,
  ListAccountsIssuesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsIssuesRequest,
  output: ListAccountsIssuesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetEmailPreferencesAccountsEmailPreferencesRequest {
  /** Required. The name of the `EmailPreferences` resource. Format: `accounts/{account}/users/{email}/emailPreferences` */
  name: string;
}

export const GetEmailPreferencesAccountsEmailPreferencesRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/users/{usersId}/emailPreferences",
  }),
  svc,
) as unknown as Schema.Schema<GetEmailPreferencesAccountsEmailPreferencesRequest>;

export type GetEmailPreferencesAccountsEmailPreferencesResponse =
  EmailPreferences;
export const GetEmailPreferencesAccountsEmailPreferencesResponse =
  EmailPreferences;

export type GetEmailPreferencesAccountsEmailPreferencesError = DefaultErrors;

/** Returns the email preferences for a Merchant Center account user. This service only permits retrieving and updating email preferences for the authenticated user. Use the name=accounts/* /users/me/emailPreferences alias to get preferences for the authenticated user. */
export const getEmailPreferencesAccountsEmailPreferences: API.OperationMethod<
  GetEmailPreferencesAccountsEmailPreferencesRequest,
  GetEmailPreferencesAccountsEmailPreferencesResponse,
  GetEmailPreferencesAccountsEmailPreferencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEmailPreferencesAccountsEmailPreferencesRequest,
  output: GetEmailPreferencesAccountsEmailPreferencesResponse,
  errors: [],
}));

export interface UpdateEmailPreferencesAccountsEmailPreferencesRequest {
  /** Identifier. The name of the EmailPreferences. The endpoint is only supported for the authenticated user. */
  name: string;
  /** Required. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `news_and_tips` */
  updateMask?: string;
  /** Request body */
  body?: EmailPreferences;
}

export const UpdateEmailPreferencesAccountsEmailPreferencesRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(EmailPreferences).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/v1beta/accounts/{accountsId}/users/{usersId}/emailPreferences",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateEmailPreferencesAccountsEmailPreferencesRequest>;

export type UpdateEmailPreferencesAccountsEmailPreferencesResponse =
  EmailPreferences;
export const UpdateEmailPreferencesAccountsEmailPreferencesResponse =
  EmailPreferences;

export type UpdateEmailPreferencesAccountsEmailPreferencesError = DefaultErrors;

/** Updates the email preferences for a Merchant Center account user. Advanced account users should specify the advanced account rather than a sub-account of the advanced account. Preferences which are not explicitly selected in the update mask will not be updated. It is invalid for updates to specify an UNCONFIRMED opt-in status value. Use the name=accounts/* /users/me/emailPreferences alias to update preferences for the authenticated user. */
export const updateEmailPreferencesAccountsEmailPreferences: API.OperationMethod<
  UpdateEmailPreferencesAccountsEmailPreferencesRequest,
  UpdateEmailPreferencesAccountsEmailPreferencesResponse,
  UpdateEmailPreferencesAccountsEmailPreferencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEmailPreferencesAccountsEmailPreferencesRequest,
  output: UpdateEmailPreferencesAccountsEmailPreferencesResponse,
  errors: [],
}));

export interface ListAccountsProgramsRequest {
  /** Required. The name of the account for which to retrieve all programs. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of programs to return in a single response. If unspecified (or 0), a default size of 1000 is used. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A continuation token, received from a previous `ListPrograms` call. Provide this to retrieve the next page. */
  pageToken?: string;
}

export const ListAccountsProgramsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/programs",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsProgramsRequest>;

export type ListAccountsProgramsResponse = ListProgramsResponse;
export const ListAccountsProgramsResponse = ListProgramsResponse;

export type ListAccountsProgramsError = DefaultErrors;

/** Retrieves all programs for the account. */
export const listAccountsPrograms: API.PaginatedOperationMethod<
  ListAccountsProgramsRequest,
  ListAccountsProgramsResponse,
  ListAccountsProgramsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsProgramsRequest,
  output: ListAccountsProgramsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface EnableAccountsProgramsRequest {
  /** Required. The name of the program for which to enable participation for the given account. Format: `accounts/{account}/programs/{program}`. For example, `accounts/123456/programs/free-listings`. */
  name: string;
  /** Request body */
  body?: EnableProgramRequest;
}

export const EnableAccountsProgramsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableProgramRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}:enable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnableAccountsProgramsRequest>;

export type EnableAccountsProgramsResponse = Program;
export const EnableAccountsProgramsResponse = Program;

export type EnableAccountsProgramsError = DefaultErrors;

/** Enable participation in the specified program for the account. */
export const enableAccountsPrograms: API.OperationMethod<
  EnableAccountsProgramsRequest,
  EnableAccountsProgramsResponse,
  EnableAccountsProgramsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableAccountsProgramsRequest,
  output: EnableAccountsProgramsResponse,
  errors: [],
}));

export interface DisableAccountsProgramsRequest {
  /** Required. The name of the program for which to disable participation for the given account. Format: `accounts/{account}/programs/{program}`. For example, `accounts/123456/programs/free-listings`. */
  name: string;
  /** Request body */
  body?: DisableProgramRequest;
}

export const DisableAccountsProgramsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableProgramRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}:disable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DisableAccountsProgramsRequest>;

export type DisableAccountsProgramsResponse = Program;
export const DisableAccountsProgramsResponse = Program;

export type DisableAccountsProgramsError = DefaultErrors;

/** Disable participation in the specified program for the account. */
export const disableAccountsPrograms: API.OperationMethod<
  DisableAccountsProgramsRequest,
  DisableAccountsProgramsResponse,
  DisableAccountsProgramsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableAccountsProgramsRequest,
  output: DisableAccountsProgramsResponse,
  errors: [],
}));

export interface GetAccountsProgramsRequest {
  /** Required. The name of the program to retrieve. Format: `accounts/{account}/programs/{program}`. For example, `accounts/123456/programs/free-listings`. */
  name: string;
}

export const GetAccountsProgramsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsProgramsRequest>;

export type GetAccountsProgramsResponse = Program;
export const GetAccountsProgramsResponse = Program;

export type GetAccountsProgramsError = DefaultErrors;

/** Retrieves the specified program for the account. */
export const getAccountsPrograms: API.OperationMethod<
  GetAccountsProgramsRequest,
  GetAccountsProgramsResponse,
  GetAccountsProgramsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsProgramsRequest,
  output: GetAccountsProgramsResponse,
  errors: [],
}));

export interface GetCheckoutSettingsAccountsProgramsCheckoutSettingsRequest {
  /** Required. The name/identifier of the merchant account. Format: `accounts/{account}/programs/{program}/checkoutSettings` */
  name: string;
}

export const GetCheckoutSettingsAccountsProgramsCheckoutSettingsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}/checkoutSettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCheckoutSettingsAccountsProgramsCheckoutSettingsRequest>;

export type GetCheckoutSettingsAccountsProgramsCheckoutSettingsResponse =
  CheckoutSettings;
export const GetCheckoutSettingsAccountsProgramsCheckoutSettingsResponse =
  CheckoutSettings;

export type GetCheckoutSettingsAccountsProgramsCheckoutSettingsError =
  DefaultErrors;

/** Gets `CheckoutSettings` for the given merchant. This includes information about review state, enrollment state and URL settings. */
export const getCheckoutSettingsAccountsProgramsCheckoutSettings: API.OperationMethod<
  GetCheckoutSettingsAccountsProgramsCheckoutSettingsRequest,
  GetCheckoutSettingsAccountsProgramsCheckoutSettingsResponse,
  GetCheckoutSettingsAccountsProgramsCheckoutSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCheckoutSettingsAccountsProgramsCheckoutSettingsRequest,
  output: GetCheckoutSettingsAccountsProgramsCheckoutSettingsResponse,
  errors: [],
}));

export interface CreateAccountsProgramsCheckoutSettingsRequest {
  /** Required. The merchant account for which the `CheckoutSettings` will be created. */
  parent: string;
  /** Request body */
  body?: CheckoutSettings;
}

export const CreateAccountsProgramsCheckoutSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CheckoutSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}/checkoutSettings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsProgramsCheckoutSettingsRequest>;

export type CreateAccountsProgramsCheckoutSettingsResponse = CheckoutSettings;
export const CreateAccountsProgramsCheckoutSettingsResponse = CheckoutSettings;

export type CreateAccountsProgramsCheckoutSettingsError = DefaultErrors;

/** Creates `CheckoutSettings` for the given merchant. */
export const createAccountsProgramsCheckoutSettings: API.OperationMethod<
  CreateAccountsProgramsCheckoutSettingsRequest,
  CreateAccountsProgramsCheckoutSettingsResponse,
  CreateAccountsProgramsCheckoutSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsProgramsCheckoutSettingsRequest,
  output: CreateAccountsProgramsCheckoutSettingsResponse,
  errors: [],
}));

export interface UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsRequest {
  /** Identifier. The resource name of the program configuration settings. Format: `accounts/{account}/programs/{program}/checkoutSettings` */
  name: string;
  /** Required. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `eligible_destinations` - `uri_settings` */
  updateMask?: string;
  /** Request body */
  body?: CheckoutSettings;
}

export const UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(CheckoutSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}/checkoutSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsRequest>;

export type UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsResponse =
  CheckoutSettings;
export const UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsResponse =
  CheckoutSettings;

export type UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsError =
  DefaultErrors;

/** Updates `CheckoutSettings` for the given merchant. */
export const updateCheckoutSettingsAccountsProgramsCheckoutSettings: API.OperationMethod<
  UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsRequest,
  UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsResponse,
  UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsRequest,
  output: UpdateCheckoutSettingsAccountsProgramsCheckoutSettingsResponse,
  errors: [],
}));

export interface DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsRequest {
  /** Required. The name/identifier of the merchant account. Format: `accounts/{account}/programs/{program}/checkoutSettings` */
  name: string;
}

export const DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "accounts/v1beta/accounts/{accountsId}/programs/{programsId}/checkoutSettings",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsRequest>;

export type DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsResponse =
  Empty;
export const DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsResponse =
  Empty;

export type DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsError =
  DefaultErrors;

/** Deletes `CheckoutSettings` and unenrolls merchant from `Checkout` program. */
export const deleteCheckoutSettingsAccountsProgramsCheckoutSettings: API.OperationMethod<
  DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsRequest,
  DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsResponse,
  DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsRequest,
  output: DeleteCheckoutSettingsAccountsProgramsCheckoutSettingsResponse,
  errors: [],
}));

export interface GetAccountsOmnichannelSettingsRequest {
  /** Required. The name of the omnichannel setting to retrieve. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}` */
  name: string;
}

export const GetAccountsOmnichannelSettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings/{omnichannelSettingsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsOmnichannelSettingsRequest>;

export type GetAccountsOmnichannelSettingsResponse = OmnichannelSetting;
export const GetAccountsOmnichannelSettingsResponse = OmnichannelSetting;

export type GetAccountsOmnichannelSettingsError = DefaultErrors;

/** Get the omnichannel settings for a given merchant. */
export const getAccountsOmnichannelSettings: API.OperationMethod<
  GetAccountsOmnichannelSettingsRequest,
  GetAccountsOmnichannelSettingsResponse,
  GetAccountsOmnichannelSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsOmnichannelSettingsRequest,
  output: GetAccountsOmnichannelSettingsResponse,
  errors: [],
}));

export interface RequestInventoryVerificationAccountsOmnichannelSettingsRequest {
  /** Required. The name of the omnichannel setting to request inventory verification. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}` */
  name: string;
  /** Request body */
  body?: RequestInventoryVerificationRequest;
}

export const RequestInventoryVerificationAccountsOmnichannelSettingsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RequestInventoryVerificationRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings/{omnichannelSettingsId}:requestInventoryVerification",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestInventoryVerificationAccountsOmnichannelSettingsRequest>;

export type RequestInventoryVerificationAccountsOmnichannelSettingsResponse =
  RequestInventoryVerificationResponse;
export const RequestInventoryVerificationAccountsOmnichannelSettingsResponse =
  RequestInventoryVerificationResponse;

export type RequestInventoryVerificationAccountsOmnichannelSettingsError =
  DefaultErrors;

/** Requests inventory verification for a given merchant in a given country. */
export const requestInventoryVerificationAccountsOmnichannelSettings: API.OperationMethod<
  RequestInventoryVerificationAccountsOmnichannelSettingsRequest,
  RequestInventoryVerificationAccountsOmnichannelSettingsResponse,
  RequestInventoryVerificationAccountsOmnichannelSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RequestInventoryVerificationAccountsOmnichannelSettingsRequest,
  output: RequestInventoryVerificationAccountsOmnichannelSettingsResponse,
  errors: [],
}));

export interface ListAccountsOmnichannelSettingsRequest {
  /** Required. The parent, which owns this collection of omnichannel settings. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of omnichannel settings to return. The service may return fewer than this value. If unspecified, at most 50 omnichannel settings will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListOmnichannelSettings` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListOmnichannelSettings` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsOmnichannelSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsOmnichannelSettingsRequest>;

export type ListAccountsOmnichannelSettingsResponse =
  ListOmnichannelSettingsResponse;
export const ListAccountsOmnichannelSettingsResponse =
  ListOmnichannelSettingsResponse;

export type ListAccountsOmnichannelSettingsError = DefaultErrors;

/** List all the omnichannel settings for a given merchant. */
export const listAccountsOmnichannelSettings: API.PaginatedOperationMethod<
  ListAccountsOmnichannelSettingsRequest,
  ListAccountsOmnichannelSettingsResponse,
  ListAccountsOmnichannelSettingsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsOmnichannelSettingsRequest,
  output: ListAccountsOmnichannelSettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAccountsOmnichannelSettingsRequest {
  /** Required. The parent resource where this omnichannel setting will be created. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: OmnichannelSetting;
}

export const CreateAccountsOmnichannelSettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(OmnichannelSetting).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsOmnichannelSettingsRequest>;

export type CreateAccountsOmnichannelSettingsResponse = OmnichannelSetting;
export const CreateAccountsOmnichannelSettingsResponse = OmnichannelSetting;

export type CreateAccountsOmnichannelSettingsError = DefaultErrors;

/** Create the omnichannel settings for a given merchant. */
export const createAccountsOmnichannelSettings: API.OperationMethod<
  CreateAccountsOmnichannelSettingsRequest,
  CreateAccountsOmnichannelSettingsResponse,
  CreateAccountsOmnichannelSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsOmnichannelSettingsRequest,
  output: CreateAccountsOmnichannelSettingsResponse,
  errors: [],
}));

export interface PatchAccountsOmnichannelSettingsRequest {
  /** Identifier. The resource name of the omnichannel setting. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}` */
  name: string;
  /** Required. The list of fields to be updated. The following fields are supported in snake_case only: - `lsf_type` - `in_stock` - `pickup` - `odo` - `about` - `inventory_verification` Full replacement with wildcard `*`is supported, while empty/implied update mask is not. */
  updateMask?: string;
  /** Request body */
  body?: OmnichannelSetting;
}

export const PatchAccountsOmnichannelSettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(OmnichannelSetting).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings/{omnichannelSettingsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsOmnichannelSettingsRequest>;

export type PatchAccountsOmnichannelSettingsResponse = OmnichannelSetting;
export const PatchAccountsOmnichannelSettingsResponse = OmnichannelSetting;

export type PatchAccountsOmnichannelSettingsError = DefaultErrors;

/** Update the omnichannel setting for a given merchant in a given country. */
export const patchAccountsOmnichannelSettings: API.OperationMethod<
  PatchAccountsOmnichannelSettingsRequest,
  PatchAccountsOmnichannelSettingsResponse,
  PatchAccountsOmnichannelSettingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsOmnichannelSettingsRequest,
  output: PatchAccountsOmnichannelSettingsResponse,
  errors: [],
}));

export interface FindAccountsOmnichannelSettingsLfpProvidersRequest {
  /** Required. The name of the parent resource under which the LFP providers are found. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}`. */
  parent: string;
  /** Optional. The maximum number of `LfpProvider` resources to return. The service returns fewer than this value if the number of lfp providers is less that than the `pageSize`. The default value is 50. The maximum value is 1000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `FindLfpProviders` call. Provide the page token to retrieve the subsequent page. When paginating, all other parameters provided to `FindLfpProviders` must match the call that provided the page token. */
  pageToken?: string;
}

export const FindAccountsOmnichannelSettingsLfpProvidersRequest = Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings/{omnichannelSettingsId}/lfpProviders:find",
  }),
  svc,
) as unknown as Schema.Schema<FindAccountsOmnichannelSettingsLfpProvidersRequest>;

export type FindAccountsOmnichannelSettingsLfpProvidersResponse =
  FindLfpProvidersResponse;
export const FindAccountsOmnichannelSettingsLfpProvidersResponse =
  FindLfpProvidersResponse;

export type FindAccountsOmnichannelSettingsLfpProvidersError = DefaultErrors;

/** Find the LFP provider candidates in a given country. */
export const findAccountsOmnichannelSettingsLfpProviders: API.PaginatedOperationMethod<
  FindAccountsOmnichannelSettingsLfpProvidersRequest,
  FindAccountsOmnichannelSettingsLfpProvidersResponse,
  FindAccountsOmnichannelSettingsLfpProvidersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: FindAccountsOmnichannelSettingsLfpProvidersRequest,
  output: FindAccountsOmnichannelSettingsLfpProvidersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersRequest {
  /** Required. The name of the LFP provider resource to link. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}/lfpProviders/{lfp_provider}`. The `lfp_provider` is the LFP provider ID. */
  name: string;
  /** Request body */
  body?: LinkLfpProviderRequest;
}

export const LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(LinkLfpProviderRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "accounts/v1beta/accounts/{accountsId}/omnichannelSettings/{omnichannelSettingsId}/lfpProviders/{lfpProvidersId}:linkLfpProvider",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersRequest>;

export type LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersResponse =
  LinkLfpProviderResponse;
export const LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersResponse =
  LinkLfpProviderResponse;

export type LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersError =
  DefaultErrors;

/** Link the specified merchant to a LFP provider for the specified country. */
export const linkLfpProviderAccountsOmnichannelSettingsLfpProviders: API.OperationMethod<
  LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersRequest,
  LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersResponse,
  LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersRequest,
  output: LinkLfpProviderAccountsOmnichannelSettingsLfpProvidersResponse,
  errors: [],
}));

export interface GetAccountsOnlineReturnPoliciesRequest {
  /** Required. The name of the return policy to retrieve. Format: `accounts/{account}/onlineReturnPolicies/{return_policy}` */
  name: string;
}

export const GetAccountsOnlineReturnPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/onlineReturnPolicies/{onlineReturnPoliciesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsOnlineReturnPoliciesRequest>;

export type GetAccountsOnlineReturnPoliciesResponse = OnlineReturnPolicy;
export const GetAccountsOnlineReturnPoliciesResponse = OnlineReturnPolicy;

export type GetAccountsOnlineReturnPoliciesError = DefaultErrors;

/** Gets an existing return policy for a given business. */
export const getAccountsOnlineReturnPolicies: API.OperationMethod<
  GetAccountsOnlineReturnPoliciesRequest,
  GetAccountsOnlineReturnPoliciesResponse,
  GetAccountsOnlineReturnPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsOnlineReturnPoliciesRequest,
  output: GetAccountsOnlineReturnPoliciesResponse,
  errors: [],
}));

export interface ListAccountsOnlineReturnPoliciesRequest {
  /** Required. The Merchant Center account for which to list return policies. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of `OnlineReturnPolicy` resources to return. The service returns fewer than this value if the number of return policies for the given business is less that than the `pageSize`. The default value is 10. The maximum value is 100; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListOnlineReturnPolicies` call. Provide the page token to retrieve the subsequent page. When paginating, all other parameters provided to `ListOnlineReturnPolicies` must match the call that provided the page token. The token returned as nextPageToken in the response to the previous request. */
  pageToken?: string;
}

export const ListAccountsOnlineReturnPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/onlineReturnPolicies",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsOnlineReturnPoliciesRequest>;

export type ListAccountsOnlineReturnPoliciesResponse =
  ListOnlineReturnPoliciesResponse;
export const ListAccountsOnlineReturnPoliciesResponse =
  ListOnlineReturnPoliciesResponse;

export type ListAccountsOnlineReturnPoliciesError = DefaultErrors;

/** Lists all existing return policies for a given business. */
export const listAccountsOnlineReturnPolicies: API.PaginatedOperationMethod<
  ListAccountsOnlineReturnPoliciesRequest,
  ListAccountsOnlineReturnPoliciesResponse,
  ListAccountsOnlineReturnPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsOnlineReturnPoliciesRequest,
  output: ListAccountsOnlineReturnPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteAccountsOnlineReturnPoliciesRequest {
  /** Required. The name of the return policy to delete. Format: `accounts/{account}/onlineReturnPolicies/{return_policy}` */
  name: string;
}

export const DeleteAccountsOnlineReturnPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "accounts/v1beta/accounts/{accountsId}/onlineReturnPolicies/{onlineReturnPoliciesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsOnlineReturnPoliciesRequest>;

export type DeleteAccountsOnlineReturnPoliciesResponse = Empty;
export const DeleteAccountsOnlineReturnPoliciesResponse = Empty;

export type DeleteAccountsOnlineReturnPoliciesError = DefaultErrors;

/** Deletes an existing return policy. */
export const deleteAccountsOnlineReturnPolicies: API.OperationMethod<
  DeleteAccountsOnlineReturnPoliciesRequest,
  DeleteAccountsOnlineReturnPoliciesResponse,
  DeleteAccountsOnlineReturnPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsOnlineReturnPoliciesRequest,
  output: DeleteAccountsOnlineReturnPoliciesResponse,
  errors: [],
}));

export interface CreateAccountsOnlineReturnPoliciesRequest {
  /** Required. The Merchant Center account for which the return policy will be created. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: OnlineReturnPolicy;
}

export const CreateAccountsOnlineReturnPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(OnlineReturnPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/onlineReturnPolicies",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsOnlineReturnPoliciesRequest>;

export type CreateAccountsOnlineReturnPoliciesResponse = OnlineReturnPolicy;
export const CreateAccountsOnlineReturnPoliciesResponse = OnlineReturnPolicy;

export type CreateAccountsOnlineReturnPoliciesError = DefaultErrors;

/** Creates a new return policy for a given business. */
export const createAccountsOnlineReturnPolicies: API.OperationMethod<
  CreateAccountsOnlineReturnPoliciesRequest,
  CreateAccountsOnlineReturnPoliciesResponse,
  CreateAccountsOnlineReturnPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsOnlineReturnPoliciesRequest,
  output: CreateAccountsOnlineReturnPoliciesResponse,
  errors: [],
}));

export interface PatchAccountsOnlineReturnPoliciesRequest {
  /** Identifier. The name of the `OnlineReturnPolicy` resource. Format: `accounts/{account}/onlineReturnPolicies/{return_policy}` */
  name: string;
  /** Optional. Only support updating the entire OnlineReturnPolicy message. For update_mask, always use `*`. */
  updateMask?: string;
  /** Request body */
  body?: OnlineReturnPolicy;
}

export const PatchAccountsOnlineReturnPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(OnlineReturnPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/onlineReturnPolicies/{onlineReturnPoliciesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsOnlineReturnPoliciesRequest>;

export type PatchAccountsOnlineReturnPoliciesResponse = OnlineReturnPolicy;
export const PatchAccountsOnlineReturnPoliciesResponse = OnlineReturnPolicy;

export type PatchAccountsOnlineReturnPoliciesError = DefaultErrors;

/** Updates an existing return policy for a given business. */
export const patchAccountsOnlineReturnPolicies: API.OperationMethod<
  PatchAccountsOnlineReturnPoliciesRequest,
  PatchAccountsOnlineReturnPoliciesResponse,
  PatchAccountsOnlineReturnPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsOnlineReturnPoliciesRequest,
  output: PatchAccountsOnlineReturnPoliciesResponse,
  errors: [],
}));

export interface ListAccountsUsersRequest {
  /** Required. The parent, which owns this collection of users. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of users to return. The service may return fewer than this value. If unspecified, at most 50 users will be returned. The maximum value is 100; values above 100 will be coerced to 100 */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListUsers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUsers` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/users",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsUsersRequest>;

export type ListAccountsUsersResponse = ListUsersResponse;
export const ListAccountsUsersResponse = ListUsersResponse;

export type ListAccountsUsersError = DefaultErrors;

/** Lists all users of a Merchant Center account. */
export const listAccountsUsers: API.PaginatedOperationMethod<
  ListAccountsUsersRequest,
  ListAccountsUsersResponse,
  ListAccountsUsersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsUsersRequest,
  output: ListAccountsUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsUsersRequest {
  /** Required. The name of the user to retrieve. Format: `accounts/{account}/users/{email}` It is also possible to retrieve the user corresponding to the caller by using `me` rather than an email address as in `accounts/{account}/users/me`. */
  name: string;
}

export const GetAccountsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "accounts/v1beta/accounts/{accountsId}/users/{usersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsUsersRequest>;

export type GetAccountsUsersResponse = User;
export const GetAccountsUsersResponse = User;

export type GetAccountsUsersError = DefaultErrors;

/** Retrieves a Merchant Center account user. */
export const getAccountsUsers: API.OperationMethod<
  GetAccountsUsersRequest,
  GetAccountsUsersResponse,
  GetAccountsUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsUsersRequest,
  output: GetAccountsUsersResponse,
  errors: [],
}));

export interface CreateAccountsUsersRequest {
  /** Required. The resource name of the account for which a user will be created. Format: `accounts/{account}` */
  parent: string;
  /** Required. The email address of the user (for example, `john.doe@gmail.com`). */
  userId?: string;
  /** Request body */
  body?: User;
}

export const CreateAccountsUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "accounts/v1beta/accounts/{accountsId}/users",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsUsersRequest>;

export type CreateAccountsUsersResponse = User;
export const CreateAccountsUsersResponse = User;

export type CreateAccountsUsersError = DefaultErrors;

/** Creates a Merchant Center account user. Executing this method requires admin access. */
export const createAccountsUsers: API.OperationMethod<
  CreateAccountsUsersRequest,
  CreateAccountsUsersResponse,
  CreateAccountsUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsUsersRequest,
  output: CreateAccountsUsersResponse,
  errors: [],
}));

export interface PatchAccountsUsersRequest {
  /** Identifier. The resource name of the user. Format: `accounts/{account}/user/{email}` Use `me` to refer to your own email address, for example `accounts/{account}/users/me`. */
  name: string;
  /** Optional. List of fields being updated. The following fields are supported (in both `snake_case` and `lowerCamelCase`): - `access_rights` */
  updateMask?: string;
  /** Request body */
  body?: User;
}

export const PatchAccountsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/users/{usersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsUsersRequest>;

export type PatchAccountsUsersResponse = User;
export const PatchAccountsUsersResponse = User;

export type PatchAccountsUsersError = DefaultErrors;

/** Updates a Merchant Center account user. Executing this method requires admin access. */
export const patchAccountsUsers: API.OperationMethod<
  PatchAccountsUsersRequest,
  PatchAccountsUsersResponse,
  PatchAccountsUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsUsersRequest,
  output: PatchAccountsUsersResponse,
  errors: [],
}));

export interface DeleteAccountsUsersRequest {
  /** Required. The name of the user to delete. Format: `accounts/{account}/users/{email}` It is also possible to delete the user corresponding to the caller by using `me` rather than an email address as in `accounts/{account}/users/me`. */
  name: string;
}

export const DeleteAccountsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "accounts/v1beta/accounts/{accountsId}/users/{usersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsUsersRequest>;

export type DeleteAccountsUsersResponse = Empty;
export const DeleteAccountsUsersResponse = Empty;

export type DeleteAccountsUsersError = DefaultErrors;

/** Deletes a Merchant Center account user. Executing this method requires admin access. The user to be deleted can't be the last admin user of that account. Also a user is protected from deletion if it is managed by Business Manager" */
export const deleteAccountsUsers: API.OperationMethod<
  DeleteAccountsUsersRequest,
  DeleteAccountsUsersResponse,
  DeleteAccountsUsersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsUsersRequest,
  output: DeleteAccountsUsersResponse,
  errors: [],
}));

export interface VerifySelfAccountsUsersMeRequest {
  /** Required. The name of the account under which the caller is a user. Format: `accounts/{account}` */
  account: string;
  /** Request body */
  body?: VerifySelfRequest;
}

export const VerifySelfAccountsUsersMeRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  body: Schema.optional(VerifySelfRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "accounts/v1beta/accounts/{accountsId}/users/me:verifySelf",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<VerifySelfAccountsUsersMeRequest>;

export type VerifySelfAccountsUsersMeResponse = User;
export const VerifySelfAccountsUsersMeResponse = User;

export type VerifySelfAccountsUsersMeError = DefaultErrors;

/** Updates the user that is represented by the caller from pending to verified. */
export const verifySelfAccountsUsersMe: API.OperationMethod<
  VerifySelfAccountsUsersMeRequest,
  VerifySelfAccountsUsersMeResponse,
  VerifySelfAccountsUsersMeError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: VerifySelfAccountsUsersMeRequest,
  output: VerifySelfAccountsUsersMeResponse,
  errors: [],
}));
