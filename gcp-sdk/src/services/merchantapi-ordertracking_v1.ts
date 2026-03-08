// ==========================================================================
// Merchant API (merchantapi ordertracking_v1)
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
  version: "ordertracking_v1",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LineItemDetails {
  /** Optional. Brand of the product. */
  brand?: string;
  /** Optional. Plain text title of this product. */
  productTitle?: string;
  /** Optional. The Global Trade Item Numbers. */
  gtins?: Array<string>;
  /** Required. The ID for this line item. */
  lineItemId?: string;
  /** Required. The quantity of the line item in the order. */
  quantity?: string;
  /** Required. The Content API REST ID of the product, in the form channel:contentLanguage:targetCountry:offerId. */
  productId?: string;
  /** Optional. The manufacturer part number. */
  mpn?: string;
}

export const LineItemDetails: Schema.Schema<LineItemDetails> = Schema.suspend(
  () =>
    Schema.Struct({
      brand: Schema.optional(Schema.String),
      productTitle: Schema.optional(Schema.String),
      gtins: Schema.optional(Schema.Array(Schema.String)),
      lineItemId: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      productId: Schema.optional(Schema.String),
      mpn: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LineItemDetails",
}) as any as Schema.Schema<LineItemDetails>;

export interface TimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
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
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    oldValue: Schema.optional(Schema.String),
    newValue: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The product id. */
  resourceId?: string;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(Schema.String),
      resourceId: Schema.optional(Schema.String),
      eventTime: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      managingAccount: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      resourceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface DateTime {
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Time zone. */
  timeZone?: TimeZone;
}

export const DateTime: Schema.Schema<DateTime> = Schema.suspend(() =>
  Schema.Struct({
    minutes: Schema.optional(Schema.Number),
    nanos: Schema.optional(Schema.Number),
    year: Schema.optional(Schema.Number),
    day: Schema.optional(Schema.Number),
    seconds: Schema.optional(Schema.Number),
    utcOffset: Schema.optional(Schema.String),
    month: Schema.optional(Schema.Number),
    hours: Schema.optional(Schema.Number),
    timeZone: Schema.optional(TimeZone),
  }),
).annotate({ identifier: "DateTime" }) as any as Schema.Schema<DateTime>;

export interface ShippingInfo {
  /** Required. The shipment ID. This field will be hashed in returned OrderTrackingSignal creation response. */
  shipmentId?: string;
  /** Optional. The service type for fulfillment, such as GROUND, FIRST_CLASS, etc. */
  carrierService?: string;
  /** Required. The status of the shipment. */
  shippingStatus?:
    | "SHIPPING_STATE_UNSPECIFIED"
    | "SHIPPED"
    | "DELIVERED"
    | (string & {});
  /** Optional. The tracking ID of the shipment. This field is required if one of the following fields is absent: earliest_delivery_promise_time, latest_delivery_promise_time, and actual_delivery_time. */
  trackingId?: string;
  /** Optional. The name of the shipping carrier for the delivery. This field is required if one of the following fields is absent: earliest_delivery_promise_time, latest_delivery_promise_time, and actual_delivery_time. */
  carrier?: string;
  /** Optional. The earliest delivery promised time. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  earliestDeliveryPromiseTime?: DateTime;
  /** Required. The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the shipping origin. */
  originRegionCode?: string;
  /** Optional. The time when the shipment was actually delivered. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  actualDeliveryTime?: DateTime;
  /** Optional. The latest delivery promised time. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  latestDeliveryPromiseTime?: DateTime;
  /** Optional. The time when the shipment was shipped. Include the year and timezone string, if available. */
  shippedTime?: DateTime;
  /** Required. The origin postal code, as a continuous string without spaces or dashes, for example "95016". This field will be anonymized in returned OrderTrackingSignal creation response. */
  originPostalCode?: string;
}

export const ShippingInfo: Schema.Schema<ShippingInfo> = Schema.suspend(() =>
  Schema.Struct({
    shipmentId: Schema.optional(Schema.String),
    carrierService: Schema.optional(Schema.String),
    shippingStatus: Schema.optional(Schema.String),
    trackingId: Schema.optional(Schema.String),
    carrier: Schema.optional(Schema.String),
    earliestDeliveryPromiseTime: Schema.optional(DateTime),
    originRegionCode: Schema.optional(Schema.String),
    actualDeliveryTime: Schema.optional(DateTime),
    latestDeliveryPromiseTime: Schema.optional(DateTime),
    shippedTime: Schema.optional(DateTime),
    originPostalCode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ShippingInfo",
}) as any as Schema.Schema<ShippingInfo>;

export interface ShipmentLineItemMapping {
  /** Required. The line item ID. */
  lineItemId?: string;
  /** Required. The line item quantity in the shipment. */
  quantity?: string;
  /** Required. The shipment ID. This field will be hashed in returned OrderTrackingSignal creation response. */
  shipmentId?: string;
}

export const ShipmentLineItemMapping: Schema.Schema<ShipmentLineItemMapping> =
  Schema.suspend(() =>
    Schema.Struct({
      lineItemId: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      shipmentId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShipmentLineItemMapping",
  }) as any as Schema.Schema<ShipmentLineItemMapping>;

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

export interface OrderTrackingSignal {
  /** Optional. The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the shipping destination. */
  deliveryRegionCode?: string;
  /** Required. The shipping information for the order. */
  shippingInfo?: Array<ShippingInfo>;
  /** Required. Information about line items in the order. */
  lineItems?: Array<LineItemDetails>;
  /** Optional. The Google Merchant Center ID of this order tracking signal. This value is optional. If left unset, the caller's Merchant Center ID is used. You must request access in order to provide data on behalf of another business. For more information, see [Submitting Order Tracking Signals](/shopping-content/guides/order-tracking-signals). */
  merchantId?: string;
  /** Required. The ID of the order on the businesses side. This field will be hashed in returned OrderTrackingSignal creation response. */
  orderId?: string;
  /** Optional. The mapping of the line items to the shipment information. */
  shipmentLineItemMapping?: Array<ShipmentLineItemMapping>;
  /** Required. The time when the order was created on the businesses side. Include the year and timezone string, if available. */
  orderCreatedTime?: DateTime;
  /** Output only. The ID that uniquely identifies this order tracking signal. */
  orderTrackingSignalId?: string;
  /** Optional. The shipping fee of the order; this value should be set to zero in the case of free shipping. */
  customerShippingFee?: Price;
  /** Optional. The delivery postal code, as a continuous string without spaces or dashes, for example "95016". This field will be anonymized in returned OrderTrackingSignal creation response. */
  deliveryPostalCode?: string;
}

export const OrderTrackingSignal: Schema.Schema<OrderTrackingSignal> =
  Schema.suspend(() =>
    Schema.Struct({
      deliveryRegionCode: Schema.optional(Schema.String),
      shippingInfo: Schema.optional(Schema.Array(ShippingInfo)),
      lineItems: Schema.optional(Schema.Array(LineItemDetails)),
      merchantId: Schema.optional(Schema.String),
      orderId: Schema.optional(Schema.String),
      shipmentLineItemMapping: Schema.optional(
        Schema.Array(ShipmentLineItemMapping),
      ),
      orderCreatedTime: Schema.optional(DateTime),
      orderTrackingSignalId: Schema.optional(Schema.String),
      customerShippingFee: Schema.optional(Price),
      deliveryPostalCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrderTrackingSignal",
  }) as any as Schema.Schema<OrderTrackingSignal>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateAccountsOrderTrackingSignalsRequest {
  /** Required. The account of the business for which the order signal is created. Format: accounts/{account} */
  parent: string;
  /** Output only. The ID that uniquely identifies this order tracking signal. */
  orderTrackingSignalId?: string;
  /** Request body */
  body?: OrderTrackingSignal;
}

export const CreateAccountsOrderTrackingSignalsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderTrackingSignalId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("orderTrackingSignalId"),
  ),
  body: Schema.optional(OrderTrackingSignal).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "ordertracking/v1/accounts/{accountsId}/orderTrackingSignals",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsOrderTrackingSignalsRequest>;

export type CreateAccountsOrderTrackingSignalsResponse = OrderTrackingSignal;
export const CreateAccountsOrderTrackingSignalsResponse = OrderTrackingSignal;

export type CreateAccountsOrderTrackingSignalsError = DefaultErrors;

/** Creates new order tracking signal. */
export const createAccountsOrderTrackingSignals: API.OperationMethod<
  CreateAccountsOrderTrackingSignalsRequest,
  CreateAccountsOrderTrackingSignalsResponse,
  CreateAccountsOrderTrackingSignalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsOrderTrackingSignalsRequest,
  output: CreateAccountsOrderTrackingSignalsResponse,
  errors: [],
}));
