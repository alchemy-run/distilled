// ==========================================================================
// Cloud Billing API (cloudbilling v1beta)
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
  name: "cloudbilling",
  version: "v1beta",
  rootUrl: "https://cloudbilling.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Decimal {
  /** The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string **should** be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services **should** normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services **may** perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services **may** preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` **should not** be supported regardless of locale. Additionally, thousand separators **should not** be supported. If a service does support them, values **must** be normalized. The ENBF grammar is: DecimalString = '' | [Sign] Significand [Exponent]; Sign = '+' | '-'; Significand = Digits '.' | [Digits] '.' Digits; Exponent = ('e' | 'E') [Sign] Digits; Digits = { '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' }; Services **should** clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services **may** choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and **should** round the value to fit the supported scale. Alternatively, the service **may** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services **should** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. */
  value?: string;
}

export const Decimal: Schema.Schema<Decimal> = Schema.suspend(() =>
  Schema.Struct({
    value: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Decimal" }) as any as Schema.Schema<Decimal>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() =>
  Schema.Struct({
    currencyCode: Schema.optional(Schema.String),
    units: Schema.optional(Schema.String),
    nanos: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface GoogleCloudBillingBillingaccountpricesV1betaRateTier {
  /** Lower bound amount for a tier. Tiers 0-100, 100-200 will be represented with two tiers with `start_amount` 0 and 100. */
  startAmount?: Decimal;
  /** List price of one tier. */
  listPrice?: Money;
  /** Negotiated contract price specific for a billing account. */
  contractPrice?: Money;
  /** Percentage of effective discount calculated using the current list price per pricing tier. Formula used: effective_discount_percent = (list_price - contract_price) / list_price × 100 If list_price and contract_price are zero, this field is the same as `discount_percent` of FixedDiscount and FloatingDiscount. If your contract does NOT have the feature LIST_PRICE_AS_CEILING enabled, the effective_discount_percent can be negative if the SKU has a FixedDiscount and the current list price is lower than the list price on the date of the contract agreement. See the `FixedDiscount.fix_time` on when the discount was set. If you have questions regarding pricing per SKU, contact your Account team for more details. */
  effectiveDiscountPercent?: Decimal;
}

export const GoogleCloudBillingBillingaccountpricesV1betaRateTier: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaRateTier> =
  Schema.suspend(() =>
    Schema.Struct({
      startAmount: Schema.optional(Decimal),
      listPrice: Schema.optional(Money),
      contractPrice: Schema.optional(Money),
      effectiveDiscountPercent: Schema.optional(Decimal),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaRateTier",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaRateTier>;

export interface GoogleCloudBillingBillingaccountpricesV1betaUnitInfo {
  /** Shorthand for the unit. Example: GiBy.mo. */
  unit?: string;
  /** Human-readable description of the unit. Example: gibibyte month. */
  unitDescription?: string;
  /** Unit quantity for the tier. Example: if the RateTier price is $1 per 1000000 Bytes, then `unit_quantity` is set to 1000000. */
  unitQuantity?: Decimal;
}

export const GoogleCloudBillingBillingaccountpricesV1betaUnitInfo: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaUnitInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      unit: Schema.optional(Schema.String),
      unitDescription: Schema.optional(Schema.String),
      unitQuantity: Schema.optional(Decimal),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaUnitInfo",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaUnitInfo>;

export interface GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo {
  /** Level at which usage is aggregated to compute cost. Example: "ACCOUNT" level indicates that usage is aggregated across all projects in a single account. */
  level?:
    | "LEVEL_UNSPECIFIED"
    | "LEVEL_ACCOUNT"
    | "LEVEL_PROJECT"
    | (string & {});
  /** Interval at which usage is aggregated to compute cost. Example: "MONTHLY" interval indicates that usage is aggregated every month. */
  interval?:
    | "INTERVAL_UNSPECIFIED"
    | "INTERVAL_MONTHLY"
    | "INTERVAL_DAILY"
    | (string & {});
}

export const GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      level: Schema.optional(Schema.String),
      interval: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo>;

export interface GoogleCloudBillingBillingaccountpricesV1betaRate {
  /** All tiers associated with the `Rate` price. */
  tiers?: Array<GoogleCloudBillingBillingaccountpricesV1betaRateTier>;
  /** Unit info such as name and quantity. */
  unitInfo?: GoogleCloudBillingBillingaccountpricesV1betaUnitInfo;
  /** Aggregation info for tiers such as aggregation level and interval. */
  aggregationInfo?: GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo;
}

export const GoogleCloudBillingBillingaccountpricesV1betaRate: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaRate> =
  Schema.suspend(() =>
    Schema.Struct({
      tiers: Schema.optional(
        Schema.Array(GoogleCloudBillingBillingaccountpricesV1betaRateTier),
      ),
      unitInfo: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaUnitInfo,
      ),
      aggregationInfo: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaRate",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaRate>;

export interface GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice {}

export const GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice>;

export interface GoogleCloudBillingBillingaccountpricesV1betaFixedPrice {}

export const GoogleCloudBillingBillingaccountpricesV1betaFixedPrice: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaFixedPrice> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaFixedPrice",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaFixedPrice>;

export interface GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount {
  /** SKU group where the fixed discount comes from. */
  skuGroup?: string;
  /** Percentage of the fixed discount. */
  discountPercent?: Decimal;
  /** Time that the fixed discount is anchored to. */
  fixTime?: string;
  /** Type of the fixed discount scope which indicates the source of the discount. It can have values such as 'unspecified' and 'sku-group'. */
  discountScopeType?: string;
}

export const GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount> =
  Schema.suspend(() =>
    Schema.Struct({
      skuGroup: Schema.optional(Schema.String),
      discountPercent: Schema.optional(Decimal),
      fixTime: Schema.optional(Schema.String),
      discountScopeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount>;

export interface GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount {
  /** SKU group where the floating discount comes from. */
  skuGroup?: string;
  /** Percentage of the floating discount. */
  discountPercent?: Decimal;
  /** Type of the floating discount scope which indicates the source of the discount. It can have values such as 'unspecified' and 'sku-group'. */
  discountScopeType?: string;
}

export const GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount> =
  Schema.suspend(() =>
    Schema.Struct({
      skuGroup: Schema.optional(Schema.String),
      discountPercent: Schema.optional(Decimal),
      discountScopeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount>;

export interface GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice {
  /** Source SKU where the discount is migrated from. Format: billingAccounts/{billing_account}/skus/{sku} */
  sourceSku?: string;
}

export const GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice> =
  Schema.suspend(() =>
    Schema.Struct({
      sourceSku: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice>;

export interface GoogleCloudBillingBillingaccountpricesV1betaMergedPrice {}

export const GoogleCloudBillingBillingaccountpricesV1betaMergedPrice: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaMergedPrice> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaMergedPrice",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaMergedPrice>;

export interface GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling {}

export const GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling>;

export interface GoogleCloudBillingBillingaccountpricesV1betaPriceReason {
  /** Default price which is the current list price. */
  defaultPrice?: GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice;
  /** Fixed price applicable during the terms of a contract agreement. */
  fixedPrice?: GoogleCloudBillingBillingaccountpricesV1betaFixedPrice;
  /** Discount off the list price, anchored to the list price as of a fixed time. */
  fixedDiscount?: GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount;
  /** Discount off the current list price, not anchored to any list price as of a fixed time. */
  floatingDiscount?: GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount;
  /** Price migrated from other SKUs. */
  migratedPrice?: GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice;
  /** Price after merging from multiple sources. */
  mergedPrice?: GoogleCloudBillingBillingaccountpricesV1betaMergedPrice;
  /** Contract feature that the list price (DefaultPrice) will be used for the price if the current list price drops lower than the custom fixed price. Available to new contracts after March 21, 2022. Applies to all fixed price SKUs in the contract, including FixedPrice, FixedDiscount, MigratedPrice, and MergedPrice. */
  listPriceAsCeiling?: GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling;
  /** Type of the price reason. It can have values such as 'unspecified', 'default-price', 'fixed-price', 'fixed-discount', 'floating-discount', 'migrated-price', 'merged-price', 'list-price-as-ceiling'. */
  type?: string;
}

export const GoogleCloudBillingBillingaccountpricesV1betaPriceReason: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaPriceReason> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultPrice: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice,
      ),
      fixedPrice: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaFixedPrice,
      ),
      fixedDiscount: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount,
      ),
      floatingDiscount: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount,
      ),
      migratedPrice: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice,
      ),
      mergedPrice: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaMergedPrice,
      ),
      listPriceAsCeiling: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling,
      ),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountpricesV1betaPriceReason",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaPriceReason>;

export interface GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice {
  /** Rate price metadata. Billing account SKUs with `Rate` price are offered by pricing tiers. The price can have 1 or more rate pricing tiers. */
  rate?: GoogleCloudBillingBillingaccountpricesV1betaRate;
  /** Resource name for the latest billing account price. */
  name?: string;
  /** ISO-4217 currency code for the price. */
  currencyCode?: string;
  /** Type of the price. The possible values are: ["unspecified", "rate"]. */
  valueType?: string;
  /** Background information on the origin of the price. */
  priceReason?: GoogleCloudBillingBillingaccountpricesV1betaPriceReason;
}

export const GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice> =
  Schema.suspend(() =>
    Schema.Struct({
      rate: Schema.optional(GoogleCloudBillingBillingaccountpricesV1betaRate),
      name: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      valueType: Schema.optional(Schema.String),
      priceReason: Schema.optional(
        GoogleCloudBillingBillingaccountpricesV1betaPriceReason,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice>;

export interface GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse {
  /** The returned billing account prices. */
  billingAccountPrices?: Array<GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse: Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      billingAccountPrices: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse>;

export interface GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService {
  /** Resource name for the BillingAccountService. Example: "billingAccounts/012345-567890-ABCDEF/services/DA34-426B-A397". */
  name?: string;
  /** Identifier for the service. It is the string after the collection identifier "services/". Example: "DA34-426B-A397". */
  serviceId?: string;
  /** Description of the BillingAccountService. Example: "BigQuery", "Compute Engine". */
  displayName?: string;
}

export const GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService: Schema.Schema<GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      serviceId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService>;

export interface GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse {
  /** The returned billing account services. */
  billingAccountServices?: Array<GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse: Schema.Schema<GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      billingAccountServices: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse>;

export interface GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup {
  /** Resource name for the BillingAccountSkuGroup. Example: "billingAccounts/012345-567890-ABCDEF/skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301". */
  name?: string;
  /** Description of the BillingAccountSkuGroup. Example: "A2 VMs (1 Year CUD)". */
  displayName?: string;
}

export const GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup: Schema.Schema<GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup>;

export interface GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse {
  /** The returned publicly listed billing account SKU groups. */
  billingAccountSkuGroups?: Array<GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse: Schema.Schema<GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      billingAccountSkuGroups: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory {
  /** Name of the product category. */
  category?: string;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory> =
  Schema.suspend(() =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy {
  /** All product categories that the billing account SKU group SKU belong to. */
  taxonomyCategories?: Array<GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory>;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy> =
  Schema.suspend(() =>
    Schema.Struct({
      taxonomyCategories: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal {}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion {
  /** Description of a Google Cloud region. Example: "us-west2". */
  region?: string;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion> =
  Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional {
  /** Google Cloud region associated with the regional geographic taxonomy. */
  region?: GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional> =
  Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(
        GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional {
  /** Google Cloud regions associated with the multi-regional geographic taxonomy. */
  regions?: Array<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion>;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional> =
  Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy {
  /** Global geographic metadata with no regions. */
  globalMetadata?: GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal;
  /** Regional geographic metadata with 1 region. */
  regionalMetadata?: GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional;
  /** Multi-regional geographic metadata with 2 or more regions. */
  multiRegionalMetadata?: GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional;
  /** Type of geographic taxonomy associated with the billing account SKU group SKU. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_GLOBAL"
    | "TYPE_REGIONAL"
    | "TYPE_MULTI_REGIONAL"
    | (string & {});
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy> =
  Schema.suspend(() =>
    Schema.Struct({
      globalMetadata: Schema.optional(
        GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal,
      ),
      regionalMetadata: Schema.optional(
        GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional,
      ),
      multiRegionalMetadata: Schema.optional(
        GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional,
      ),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku {
  /** Resource name for the BillingAccountSkuGroupSku. Example: "billingAccounts/012345-567890-ABCDEF/skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301/skus/AA95-CD31-42FE". */
  name?: string;
  /** Unique identifier for the SKU. It is the string after the collection identifier "skus/" Example: "AA95-CD31-42FE". */
  skuId?: string;
  /** Description of the BillingAccountSkuGroupSku. Example: "A2 Instance Core running in Hong Kong". */
  displayName?: string;
  /** BillingAccountService that the BillingAccountSkuGroupSku belongs to. */
  billingAccountService?: string;
  /** List of product categories that apply to the BillingAccountSkuGroupSku. */
  productTaxonomy?: GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy;
  /** Geographic metadata that applies to the BillingAccountSkuGroupSku. */
  geoTaxonomy?: GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      skuId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      billingAccountService: Schema.optional(Schema.String),
      productTaxonomy: Schema.optional(
        GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy,
      ),
      geoTaxonomy: Schema.optional(
        GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku>;

export interface GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse {
  /** The returned billing account SKU group SKUs. */
  billingAccountSkuGroupSkus?: Array<GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse: Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      billingAccountSkuGroupSkus: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse>;

export interface GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory {
  /** Name of the product category. */
  category?: string;
}

export const GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory> =
  Schema.suspend(() =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory>;

export interface GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy {
  /** All product categories that the billing account SKU belong to. */
  taxonomyCategories?: Array<GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory>;
}

export const GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy> =
  Schema.suspend(() =>
    Schema.Struct({
      taxonomyCategories: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy>;

export interface GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal {}

export const GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal>;

export interface GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion {
  /** Description of a Google Cloud region. Example: "us-west2". */
  region?: string;
}

export const GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion> =
  Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion>;

export interface GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional {
  /** Google Cloud region associated with the regional geographic taxonomy. */
  region?: GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion;
}

export const GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional> =
  Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(
        GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional>;

export interface GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional {
  /** Google Cloud regions associated with the multi-regional geographic taxonomy. */
  regions?: Array<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion>;
}

export const GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional> =
  Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional>;

export interface GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy {
  /** Global geographic metadata with no regions. */
  globalMetadata?: GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal;
  /** Regional geographic metadata with 1 region. */
  regionalMetadata?: GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional;
  /** Multi-regional geographic metadata with 2 or more regions. */
  multiRegionalMetadata?: GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional;
  /** Type of geographic taxonomy associated with the billing account SKU. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_GLOBAL"
    | "TYPE_REGIONAL"
    | "TYPE_MULTI_REGIONAL"
    | (string & {});
}

export const GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy> =
  Schema.suspend(() =>
    Schema.Struct({
      globalMetadata: Schema.optional(
        GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal,
      ),
      regionalMetadata: Schema.optional(
        GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional,
      ),
      multiRegionalMetadata: Schema.optional(
        GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional,
      ),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy>;

export interface GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku {
  /** Resource name for the BillingAccountSku. Example: "billingAccounts/012345-567890-ABCDEF/skus/AA95-CD31-42FE". */
  name?: string;
  /** Unique identifier for the SKU. It is the string after the collection identifier "skus/" Example: "AA95-CD31-42FE". */
  skuId?: string;
  /** Description of the BillingAccountSku. Example: "A2 Instance Core running in Hong Kong". */
  displayName?: string;
  /** BillingAccountService that the BillingAccountSku belongs to. */
  billingAccountService?: string;
  /** List of product categories that apply to the BillingAccountSku. */
  productTaxonomy?: GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy;
  /** Geographic metadata that applies to the BillingAccountSku. */
  geoTaxonomy?: GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy;
}

export const GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      skuId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      billingAccountService: Schema.optional(Schema.String),
      productTaxonomy: Schema.optional(
        GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy,
      ),
      geoTaxonomy: Schema.optional(
        GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku>;

export interface GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse {
  /** The returned billing account SKUs. */
  billingAccountSkus?: Array<GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse: Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      billingAccountSkus: Schema.optional(
        Schema.Array(
          GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse",
  }) as any as Schema.Schema<GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse>;

export interface GoogleCloudBillingPricesV1betaRateTier {
  /** Lower bound amount for a tier. Tiers 0-100, 100-200 will be represented with two tiers with `start_amount` 0 and 100. */
  startAmount?: Decimal;
  /** List price of one tier. */
  listPrice?: Money;
}

export const GoogleCloudBillingPricesV1betaRateTier: Schema.Schema<GoogleCloudBillingPricesV1betaRateTier> =
  Schema.suspend(() =>
    Schema.Struct({
      startAmount: Schema.optional(Decimal),
      listPrice: Schema.optional(Money),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingPricesV1betaRateTier",
  }) as any as Schema.Schema<GoogleCloudBillingPricesV1betaRateTier>;

export interface GoogleCloudBillingPricesV1betaUnitInfo {
  /** Shorthand for the unit. Example: GiBy.mo. */
  unit?: string;
  /** Human-readable description of the unit. Example: gibibyte month. */
  unitDescription?: string;
  /** Unit quantity for the tier. Example: if the RateTier price is $1 per 1000000 Bytes, then `unit_quantity` is set to 1000000. */
  unitQuantity?: Decimal;
}

export const GoogleCloudBillingPricesV1betaUnitInfo: Schema.Schema<GoogleCloudBillingPricesV1betaUnitInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      unit: Schema.optional(Schema.String),
      unitDescription: Schema.optional(Schema.String),
      unitQuantity: Schema.optional(Decimal),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingPricesV1betaUnitInfo",
  }) as any as Schema.Schema<GoogleCloudBillingPricesV1betaUnitInfo>;

export interface GoogleCloudBillingPricesV1betaAggregationInfo {
  /** Level at which usage is aggregated to compute cost. Example: "ACCOUNT" level indicates that usage is aggregated across all projects in a single account. */
  level?:
    | "LEVEL_UNSPECIFIED"
    | "LEVEL_ACCOUNT"
    | "LEVEL_PROJECT"
    | (string & {});
  /** Interval at which usage is aggregated to compute cost. Example: "MONTHLY" interval indicates that usage is aggregated every month. */
  interval?:
    | "INTERVAL_UNSPECIFIED"
    | "INTERVAL_MONTHLY"
    | "INTERVAL_DAILY"
    | (string & {});
}

export const GoogleCloudBillingPricesV1betaAggregationInfo: Schema.Schema<GoogleCloudBillingPricesV1betaAggregationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      level: Schema.optional(Schema.String),
      interval: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingPricesV1betaAggregationInfo",
  }) as any as Schema.Schema<GoogleCloudBillingPricesV1betaAggregationInfo>;

export interface GoogleCloudBillingPricesV1betaRate {
  /** All tiers associated with the `Rate` price. */
  tiers?: Array<GoogleCloudBillingPricesV1betaRateTier>;
  /** Unit info such as name and quantity. */
  unitInfo?: GoogleCloudBillingPricesV1betaUnitInfo;
  /** Aggregation info for tiers such as aggregation level and interval. */
  aggregationInfo?: GoogleCloudBillingPricesV1betaAggregationInfo;
}

export const GoogleCloudBillingPricesV1betaRate: Schema.Schema<GoogleCloudBillingPricesV1betaRate> =
  Schema.suspend(() =>
    Schema.Struct({
      tiers: Schema.optional(
        Schema.Array(GoogleCloudBillingPricesV1betaRateTier),
      ),
      unitInfo: Schema.optional(GoogleCloudBillingPricesV1betaUnitInfo),
      aggregationInfo: Schema.optional(
        GoogleCloudBillingPricesV1betaAggregationInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingPricesV1betaRate",
  }) as any as Schema.Schema<GoogleCloudBillingPricesV1betaRate>;

export interface GoogleCloudBillingPricesV1betaPrice {
  /** Rate price metadata. SKUs with `Rate` price are offered by pricing tiers. The price can have 1 or more rate pricing tiers. */
  rate?: GoogleCloudBillingPricesV1betaRate;
  /** Resource name for the latest price. */
  name?: string;
  /** ISO-4217 currency code for the price. */
  currencyCode?: string;
  /** Type of the price. It can have values: ["unspecified", "rate"]. */
  valueType?: string;
}

export const GoogleCloudBillingPricesV1betaPrice: Schema.Schema<GoogleCloudBillingPricesV1betaPrice> =
  Schema.suspend(() =>
    Schema.Struct({
      rate: Schema.optional(GoogleCloudBillingPricesV1betaRate),
      name: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      valueType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingPricesV1betaPrice",
  }) as any as Schema.Schema<GoogleCloudBillingPricesV1betaPrice>;

export interface GoogleCloudBillingPricesV1betaListPricesResponse {
  /** The returned publicly listed prices. */
  prices?: Array<GoogleCloudBillingPricesV1betaPrice>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingPricesV1betaListPricesResponse: Schema.Schema<GoogleCloudBillingPricesV1betaListPricesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      prices: Schema.optional(
        Schema.Array(GoogleCloudBillingPricesV1betaPrice),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingPricesV1betaListPricesResponse",
  }) as any as Schema.Schema<GoogleCloudBillingPricesV1betaListPricesResponse>;

export interface GoogleCloudBillingSkugroupsV1betaSkuGroup {
  /** Resource name for the SKU group. Example: "skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301". */
  name?: string;
  /** Description of the SKU group. Example: "A2 VMs (1 Year CUD)". */
  displayName?: string;
}

export const GoogleCloudBillingSkugroupsV1betaSkuGroup: Schema.Schema<GoogleCloudBillingSkugroupsV1betaSkuGroup> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupsV1betaSkuGroup",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupsV1betaSkuGroup>;

export interface GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse {
  /** The returned publicly listed SKU groups. */
  skuGroups?: Array<GoogleCloudBillingSkugroupsV1betaSkuGroup>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse: Schema.Schema<GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      skuGroups: Schema.optional(
        Schema.Array(GoogleCloudBillingSkugroupsV1betaSkuGroup),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse>;

export interface GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory {
  /** Name of the product category. */
  category?: string;
}

export const GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory> =
  Schema.suspend(() =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory>;

export interface GoogleCloudBillingSkugroupskusV1betaProductTaxonomy {
  /** All product categories that the SKU group SKU belongs to. */
  taxonomyCategories?: Array<GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory>;
}

export const GoogleCloudBillingSkugroupskusV1betaProductTaxonomy: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaProductTaxonomy> =
  Schema.suspend(() =>
    Schema.Struct({
      taxonomyCategories: Schema.optional(
        Schema.Array(GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaProductTaxonomy",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaProductTaxonomy>;

export interface GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal {}

export const GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal>;

export interface GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion {
  /** Description of a Google Cloud region. Example: "us-west2". */
  region?: string;
}

export const GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion> =
  Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion>;

export interface GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional {
  /** Google Cloud region associated with the regional geographic taxonomy. */
  region?: GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion;
}

export const GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional> =
  Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(
        GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional>;

export interface GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional {
  /** Google Cloud regions associated with the multi-regional geographic taxonomy. */
  regions?: Array<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion>;
}

export const GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional> =
  Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(
        Schema.Array(GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional>;

export interface GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy {
  /** Global geographic metadata with no regions. */
  globalMetadata?: GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal;
  /** Regional geographic metadata with 1 region. */
  regionalMetadata?: GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional;
  /** Multi-regional geographic metadata with 2 or more regions. */
  multiRegionalMetadata?: GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional;
  /** Type of geographic taxonomy associated with the SKU group SKU. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_GLOBAL"
    | "TYPE_REGIONAL"
    | "TYPE_MULTI_REGIONAL"
    | (string & {});
}

export const GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy> =
  Schema.suspend(() =>
    Schema.Struct({
      globalMetadata: Schema.optional(
        GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal,
      ),
      regionalMetadata: Schema.optional(
        GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional,
      ),
      multiRegionalMetadata: Schema.optional(
        GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional,
      ),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy>;

export interface GoogleCloudBillingSkugroupskusV1betaSkuGroupSku {
  /** Resource name for the SkuGroupSku. Example: "skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301/skus/AA95-CD31-42FE". */
  name?: string;
  /** Unique identifier for the SKU. It is the string after the collection identifier "skus/" Example: "AA95-CD31-42FE". */
  skuId?: string;
  /** Description of the SkuGroupSku. Example: "A2 Instance Core running in Hong Kong". */
  displayName?: string;
  /** Service that the SkuGroupSku belongs to. */
  service?: string;
  /** List of product categories that apply to the SkuGroupSku. */
  productTaxonomy?: GoogleCloudBillingSkugroupskusV1betaProductTaxonomy;
  /** Geographic metadata that applies to the SkuGroupSku. */
  geoTaxonomy?: GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy;
}

export const GoogleCloudBillingSkugroupskusV1betaSkuGroupSku: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaSkuGroupSku> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      skuId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      service: Schema.optional(Schema.String),
      productTaxonomy: Schema.optional(
        GoogleCloudBillingSkugroupskusV1betaProductTaxonomy,
      ),
      geoTaxonomy: Schema.optional(
        GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaSkuGroupSku",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaSkuGroupSku>;

export interface GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse {
  /** The returned SKU group SKUs. */
  skuGroupSkus?: Array<GoogleCloudBillingSkugroupskusV1betaSkuGroupSku>;
  /** Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse: Schema.Schema<GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      skuGroupSkus: Schema.optional(
        Schema.Array(GoogleCloudBillingSkugroupskusV1betaSkuGroupSku),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse",
  }) as any as Schema.Schema<GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListBillingAccountsServicesRequest {
  /** Required. The billing account to list billing account service from. Format: billingAccounts/{billing_account} */
  parent: string;
  /** Maximum number of billing account service to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Page token received from a previous ListBillingAccountServices call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListBillingAccountsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/services",
  }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsServicesRequest>;

export type ListBillingAccountsServicesResponse =
  GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse;
export const ListBillingAccountsServicesResponse =
  GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse;

export type ListBillingAccountsServicesError = DefaultErrors;

/** Lists services visible to a billing account. */
export const listBillingAccountsServices: API.PaginatedOperationMethod<
  ListBillingAccountsServicesRequest,
  ListBillingAccountsServicesResponse,
  ListBillingAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListBillingAccountsServicesRequest,
  output: ListBillingAccountsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetBillingAccountsServicesRequest {
  /** Required. The name of the billing account service to retrieve. Format: billingAccounts/{billing_account}/services/{service} */
  name: string;
}

export const GetBillingAccountsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/services/{servicesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsServicesRequest>;

export type GetBillingAccountsServicesResponse =
  GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService;
export const GetBillingAccountsServicesResponse =
  GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService;

export type GetBillingAccountsServicesError = DefaultErrors;

/** Gets a Google Cloud service visible to a billing account. */
export const getBillingAccountsServices: API.OperationMethod<
  GetBillingAccountsServicesRequest,
  GetBillingAccountsServicesResponse,
  GetBillingAccountsServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBillingAccountsServicesRequest,
  output: GetBillingAccountsServicesResponse,
  errors: [],
}));

export interface ListBillingAccountsSkuGroupsRequest {
  /** Required. The billing account to list billing account SKU groups from. Format: billingAccounts/{billing_account} */
  parent: string;
  /** Maximum number of billing account SKU groups to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Page token received from a previous ListBillingAccountSkuGroups call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListBillingAccountsSkuGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skuGroups",
  }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsSkuGroupsRequest>;

export type ListBillingAccountsSkuGroupsResponse =
  GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse;
export const ListBillingAccountsSkuGroupsResponse =
  GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse;

export type ListBillingAccountsSkuGroupsError = DefaultErrors;

/** Lists SKU groups visible to a billing account. */
export const listBillingAccountsSkuGroups: API.PaginatedOperationMethod<
  ListBillingAccountsSkuGroupsRequest,
  ListBillingAccountsSkuGroupsResponse,
  ListBillingAccountsSkuGroupsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListBillingAccountsSkuGroupsRequest,
  output: ListBillingAccountsSkuGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetBillingAccountsSkuGroupsRequest {
  /** Required. The name of the BillingAccountSkuGroup to retrieve. Format: billingAccounts/{billing_account}/skuGroups/{sku_group} */
  name: string;
}

export const GetBillingAccountsSkuGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skuGroups/{skuGroupsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsSkuGroupsRequest>;

export type GetBillingAccountsSkuGroupsResponse =
  GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup;
export const GetBillingAccountsSkuGroupsResponse =
  GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup;

export type GetBillingAccountsSkuGroupsError = DefaultErrors;

/** Gets a SKU group visible to a billing account. */
export const getBillingAccountsSkuGroups: API.OperationMethod<
  GetBillingAccountsSkuGroupsRequest,
  GetBillingAccountsSkuGroupsResponse,
  GetBillingAccountsSkuGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBillingAccountsSkuGroupsRequest,
  output: GetBillingAccountsSkuGroupsResponse,
  errors: [],
}));

export interface ListBillingAccountsSkuGroupsSkusRequest {
  /** Required. The billing account SKU group to list billing account SKU group SKUs from. Format: billingAccounts/{billing_account}/skuGroups/{sku_group} */
  parent: string;
  /** Maximum number of billing account SKU group SKUs to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Page token received from a previous ListBillingAccountSkuGroupSkus call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListBillingAccountsSkuGroupsSkusRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skuGroups/{skuGroupsId}/skus",
  }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsSkuGroupsSkusRequest>;

export type ListBillingAccountsSkuGroupsSkusResponse =
  GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse;
export const ListBillingAccountsSkuGroupsSkusResponse =
  GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse;

export type ListBillingAccountsSkuGroupsSkusError = DefaultErrors;

/** Lists SKUs that is part of billing account SKU groups. */
export const listBillingAccountsSkuGroupsSkus: API.PaginatedOperationMethod<
  ListBillingAccountsSkuGroupsSkusRequest,
  ListBillingAccountsSkuGroupsSkusResponse,
  ListBillingAccountsSkuGroupsSkusError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListBillingAccountsSkuGroupsSkusRequest,
  output: ListBillingAccountsSkuGroupsSkusResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetBillingAccountsSkuGroupsSkusRequest {
  /** Required. The name of the billing account SKU group SKU to retrieve. Format: billingAccounts/{billing_account}/skuGroups/{sku_group}/skus/{sku} */
  name: string;
}

export const GetBillingAccountsSkuGroupsSkusRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skuGroups/{skuGroupsId}/skus/{skusId}",
  }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsSkuGroupsSkusRequest>;

export type GetBillingAccountsSkuGroupsSkusResponse =
  GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku;
export const GetBillingAccountsSkuGroupsSkusResponse =
  GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku;

export type GetBillingAccountsSkuGroupsSkusError = DefaultErrors;

/** Gets a SKU that is part of a billing account SKU group. */
export const getBillingAccountsSkuGroupsSkus: API.OperationMethod<
  GetBillingAccountsSkuGroupsSkusRequest,
  GetBillingAccountsSkuGroupsSkusResponse,
  GetBillingAccountsSkuGroupsSkusError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBillingAccountsSkuGroupsSkusRequest,
  output: GetBillingAccountsSkuGroupsSkusResponse,
  errors: [],
}));

export interface ListBillingAccountsSkusRequest {
  /** Required. The billing account to list billing account SKU from. Format: billingAccounts/{billing_account} */
  parent: string;
  /** Options for how to filter the billing account SKUs. Currently, only filter on `billing_account_service` is supported. Only !=, = operators are supported. Examples: - billing_account_service = "billingAccounts/012345-567890-ABCDEF/services/DA34-426B-A397" */
  filter?: string;
  /** Maximum number of billing account SKUs to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Page token received from a previous ListBillingAccountSkus call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListBillingAccountsSkusRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skus",
  }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsSkusRequest>;

export type ListBillingAccountsSkusResponse =
  GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse;
export const ListBillingAccountsSkusResponse =
  GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse;

export type ListBillingAccountsSkusError = DefaultErrors;

/** Lists SKUs visible to a billing account. */
export const listBillingAccountsSkus: API.PaginatedOperationMethod<
  ListBillingAccountsSkusRequest,
  ListBillingAccountsSkusResponse,
  ListBillingAccountsSkusError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListBillingAccountsSkusRequest,
  output: ListBillingAccountsSkusResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetBillingAccountsSkusRequest {
  /** Required. The name of the billing account SKU to retrieve. Format: billingAccounts/{billing_account}/skus/{sku} */
  name: string;
}

export const GetBillingAccountsSkusRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skus/{skusId}",
  }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsSkusRequest>;

export type GetBillingAccountsSkusResponse =
  GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku;
export const GetBillingAccountsSkusResponse =
  GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku;

export type GetBillingAccountsSkusError = DefaultErrors;

/** Gets a SKU visible to a billing account. */
export const getBillingAccountsSkus: API.OperationMethod<
  GetBillingAccountsSkusRequest,
  GetBillingAccountsSkusResponse,
  GetBillingAccountsSkusError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBillingAccountsSkusRequest,
  output: GetBillingAccountsSkusResponse,
  errors: [],
}));

export interface GetBillingAccountsSkusPriceRequest {
  /** Required. Name of the billing account price to retrieve. Format: billingAccounts/{billing_account}/skus/{sku}/price */
  name: string;
  /** Optional. ISO-4217 currency code for the price. If not specified, the currency of the billing account is used. */
  currencyCode?: string;
}

export const GetBillingAccountsSkusPriceRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  currencyCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("currencyCode"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skus/{skusId}/price",
  }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsSkusPriceRequest>;

export type GetBillingAccountsSkusPriceResponse =
  GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice;
export const GetBillingAccountsSkusPriceResponse =
  GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice;

export type GetBillingAccountsSkusPriceError = DefaultErrors;

/** Gets the latest price for SKUs available to your Cloud Billing account. */
export const getBillingAccountsSkusPrice: API.OperationMethod<
  GetBillingAccountsSkusPriceRequest,
  GetBillingAccountsSkusPriceResponse,
  GetBillingAccountsSkusPriceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBillingAccountsSkusPriceRequest,
  output: GetBillingAccountsSkusPriceResponse,
  errors: [],
}));

export interface ListBillingAccountsSkusPricesRequest {
  /** Required. To list all Billing Account SKUs, use `-` as the SKU ID. Format: `billingAccounts/{billing_account}/skus/-` Note: Specifying an actual SKU resource id will return a collection of one Billing Account Price. */
  parent: string;
  /** Optional. ISO-4217 currency code for the price. If not specified, currency of billing account will be used. */
  currencyCode?: string;
  /** Optional. Maximum number of billing account price to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Optional. Page token received from a previous ListBillingAccountPrices call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListBillingAccountsSkusPricesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  currencyCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("currencyCode"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/billingAccounts/{billingAccountsId}/skus/{skusId}/prices",
  }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsSkusPricesRequest>;

export type ListBillingAccountsSkusPricesResponse =
  GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse;
export const ListBillingAccountsSkusPricesResponse =
  GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse;

export type ListBillingAccountsSkusPricesError = DefaultErrors;

/** Lists the latest prices for SKUs available to your Cloud Billing account. */
export const listBillingAccountsSkusPrices: API.PaginatedOperationMethod<
  ListBillingAccountsSkusPricesRequest,
  ListBillingAccountsSkusPricesResponse,
  ListBillingAccountsSkusPricesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListBillingAccountsSkusPricesRequest,
  output: ListBillingAccountsSkusPricesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSkusPriceRequest {
  /** Required. Name of the latest price to retrieve. Format: skus/{sku}/price */
  name: string;
  /** Optional. ISO-4217 currency code for the price. If not specified, USD will be used. */
  currencyCode?: string;
}

export const GetSkusPriceRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  currencyCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("currencyCode"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/skus/{skusId}/price" }),
  svc,
) as unknown as Schema.Schema<GetSkusPriceRequest>;

export type GetSkusPriceResponse = GoogleCloudBillingPricesV1betaPrice;
export const GetSkusPriceResponse = GoogleCloudBillingPricesV1betaPrice;

export type GetSkusPriceError = DefaultErrors;

/** Gets the latest price for the given SKU. */
export const getSkusPrice: API.OperationMethod<
  GetSkusPriceRequest,
  GetSkusPriceResponse,
  GetSkusPriceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSkusPriceRequest,
  output: GetSkusPriceResponse,
  errors: [],
}));

export interface ListSkusPricesRequest {
  /** Required. To list the prices for all SKUs, use `-` as the SKU ID. Format: `skus/-` Specifying a specific SKU ID returns a collection with one Price object for the SKU. */
  parent: string;
  /** Optional. Maximum number of prices to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Optional. Page token received from a previous ListPrices call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
  /** Optional. ISO-4217 currency code for the price. If not specified, USD will be used. */
  currencyCode?: string;
}

export const ListSkusPricesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  currencyCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("currencyCode"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/skus/{skusId}/prices" }),
  svc,
) as unknown as Schema.Schema<ListSkusPricesRequest>;

export type ListSkusPricesResponse =
  GoogleCloudBillingPricesV1betaListPricesResponse;
export const ListSkusPricesResponse =
  GoogleCloudBillingPricesV1betaListPricesResponse;

export type ListSkusPricesError = DefaultErrors;

/** Lists the latest prices for all SKUs. */
export const listSkusPrices: API.PaginatedOperationMethod<
  ListSkusPricesRequest,
  ListSkusPricesResponse,
  ListSkusPricesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListSkusPricesRequest,
  output: ListSkusPricesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListSkuGroupsRequest {
  /** Maximum number of SKU groups to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Page token received from a previous ListSkuGroups call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListSkuGroupsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/skuGroups" }),
  svc,
) as unknown as Schema.Schema<ListSkuGroupsRequest>;

export type ListSkuGroupsResponse =
  GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse;
export const ListSkuGroupsResponse =
  GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse;

export type ListSkuGroupsError = DefaultErrors;

/** Lists all publicly listed SKU groups. */
export const listSkuGroups: API.PaginatedOperationMethod<
  ListSkuGroupsRequest,
  ListSkuGroupsResponse,
  ListSkuGroupsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListSkuGroupsRequest,
  output: ListSkuGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSkuGroupsRequest {
  /** Required. The name of the SKU group to retrieve. Format: skuGroups/{sku_group} */
  name: string;
}

export const GetSkuGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/skuGroups/{skuGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetSkuGroupsRequest>;

export type GetSkuGroupsResponse = GoogleCloudBillingSkugroupsV1betaSkuGroup;
export const GetSkuGroupsResponse = GoogleCloudBillingSkugroupsV1betaSkuGroup;

export type GetSkuGroupsError = DefaultErrors;

/** Gets a publicly listed SKU group. */
export const getSkuGroups: API.OperationMethod<
  GetSkuGroupsRequest,
  GetSkuGroupsResponse,
  GetSkuGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSkuGroupsRequest,
  output: GetSkuGroupsResponse,
  errors: [],
}));

export interface ListSkuGroupsSkusRequest {
  /** Required. The SkuGroup to list SkuGroupSku from. Format: skuGroups/{sku_group} */
  parent: string;
  /** Maximum number of SKU group SKUs to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. */
  pageSize?: number;
  /** Page token received from a previous ListSkuGroupSkus call to retrieve the next page of results. If this field is empty, the first page is returned. */
  pageToken?: string;
}

export const ListSkuGroupsSkusRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/skuGroups/{skuGroupsId}/skus" }),
  svc,
) as unknown as Schema.Schema<ListSkuGroupsSkusRequest>;

export type ListSkuGroupsSkusResponse =
  GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse;
export const ListSkuGroupsSkusResponse =
  GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse;

export type ListSkuGroupsSkusError = DefaultErrors;

/** Lists all publicly listed SKUs contained by a publicly listed SKU group. */
export const listSkuGroupsSkus: API.PaginatedOperationMethod<
  ListSkuGroupsSkusRequest,
  ListSkuGroupsSkusResponse,
  ListSkuGroupsSkusError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListSkuGroupsSkusRequest,
  output: ListSkuGroupsSkusResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSkuGroupsSkusRequest {
  /** Required. The name of the SKU group SKU to retrieve. Format: skuGroups/{sku_group}/skus/{sku} */
  name: string;
}

export const GetSkuGroupsSkusRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/skuGroups/{skuGroupsId}/skus/{skusId}",
  }),
  svc,
) as unknown as Schema.Schema<GetSkuGroupsSkusRequest>;

export type GetSkuGroupsSkusResponse =
  GoogleCloudBillingSkugroupskusV1betaSkuGroupSku;
export const GetSkuGroupsSkusResponse =
  GoogleCloudBillingSkugroupskusV1betaSkuGroupSku;

export type GetSkuGroupsSkusError = DefaultErrors;

/** Gets a publicly listed SKU that is part of a publicly listed SKU group. */
export const getSkuGroupsSkus: API.OperationMethod<
  GetSkuGroupsSkusRequest,
  GetSkuGroupsSkusResponse,
  GetSkuGroupsSkusError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSkuGroupsSkusRequest,
  output: GetSkuGroupsSkusResponse,
  errors: [],
}));
