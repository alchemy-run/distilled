// ==========================================================================
// Content API for Shopping (content v2.1)
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
  name: "content",
  version: "v2.1",
  rootUrl: "https://shoppingcontent.googleapis.com/",
  servicePath: "content/v2.1/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LiaOmnichannelExperience {
  /** The CLDR country code (for example, "US"). */
  country?: string;
  /** The Local Store Front (LSF) type for this country. Acceptable values are: - "`ghlsf`" (Google-Hosted Local Store Front) - "`mhlsfBasic`" (Merchant-Hosted Local Store Front Basic) - "`mhlsfFull`" (Merchant-Hosted Local Store Front Full) More details about these types can be found here. */
  lsfType?: string;
  /** The Pickup types for this country. Acceptable values are: - "`pickupToday`" - "`pickupLater`" */
  pickupTypes?: Array<string>;
}

export const LiaOmnichannelExperience: Schema.Schema<LiaOmnichannelExperience> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      country: Schema.optional(Schema.String),
      lsfType: Schema.optional(Schema.String),
      pickupTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "LiaOmnichannelExperience",
  }) as any as Schema.Schema<LiaOmnichannelExperience>;

export interface LiaAboutPageSettings {
  /** The status of the verification process for the About page. Supported values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
  /** The URL for the About page. */
  url?: string;
}

export const LiaAboutPageSettings: Schema.Schema<LiaAboutPageSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiaAboutPageSettings",
  }) as any as Schema.Schema<LiaAboutPageSettings>;

export interface LiaInventorySettings {
  /** The email of the contact for the inventory verification process. */
  inventoryVerificationContactEmail?: string;
  /** The status of the verification contact. Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  inventoryVerificationContactStatus?: string;
  /** The name of the contact for the inventory verification process. */
  inventoryVerificationContactName?: string;
  /** The status of the inventory verification process. Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
}

export const LiaInventorySettings: Schema.Schema<LiaInventorySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventoryVerificationContactEmail: Schema.optional(Schema.String),
      inventoryVerificationContactStatus: Schema.optional(Schema.String),
      inventoryVerificationContactName: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiaInventorySettings",
  }) as any as Schema.Schema<LiaInventorySettings>;

export interface LiaOnDisplayToOrderSettings {
  /** The status of the ?On display to order? feature. Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
  /** Shipping cost and policy URL. */
  shippingCostPolicyUrl?: string;
}

export const LiaOnDisplayToOrderSettings: Schema.Schema<LiaOnDisplayToOrderSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      shippingCostPolicyUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiaOnDisplayToOrderSettings",
  }) as any as Schema.Schema<LiaOnDisplayToOrderSettings>;

export interface LiaPosDataProvider {
  /** The ID of the POS data provider. */
  posDataProviderId?: string;
  /** The account ID by which this merchant is known to the POS data provider. */
  posExternalAccountId?: string;
}

export const LiaPosDataProvider: Schema.Schema<LiaPosDataProvider> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      posDataProviderId: Schema.optional(Schema.String),
      posExternalAccountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiaPosDataProvider",
  }) as any as Schema.Schema<LiaPosDataProvider>;

export interface LiaCountrySettings {
  /** The settings for the About page. */
  about?: LiaAboutPageSettings;
  /** The omnichannel experience configured for this country. */
  omnichannelExperience?: LiaOmnichannelExperience;
  /** LIA inventory verification settings. */
  inventory?: LiaInventorySettings;
  /** LIA "On Display To Order" settings. */
  onDisplayToOrder?: LiaOnDisplayToOrderSettings;
  /** The status of the "Store pickup" feature. */
  storePickupActive?: boolean;
  /** The POS data provider linked with this country. */
  posDataProvider?: LiaPosDataProvider;
  /** The status of the "Merchant hosted local storefront" feature. */
  hostedLocalStorefrontActive?: boolean;
  /** Required. CLDR country code (for example, "US"). */
  country?: string;
}

export const LiaCountrySettings: Schema.Schema<LiaCountrySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      about: Schema.optional(LiaAboutPageSettings),
      omnichannelExperience: Schema.optional(LiaOmnichannelExperience),
      inventory: Schema.optional(LiaInventorySettings),
      onDisplayToOrder: Schema.optional(LiaOnDisplayToOrderSettings),
      storePickupActive: Schema.optional(Schema.Boolean),
      posDataProvider: Schema.optional(LiaPosDataProvider),
      hostedLocalStorefrontActive: Schema.optional(Schema.Boolean),
      country: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiaCountrySettings",
  }) as any as Schema.Schema<LiaCountrySettings>;

export interface LiaSettings {
  /** The ID of the account to which these LIA settings belong. Ignored upon update, always present in get request responses. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liaSettings`" */
  kind?: string;
  /** The LIA settings for each country. */
  countrySettings?: Array<LiaCountrySettings>;
}

export const LiaSettings: Schema.Schema<LiaSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      countrySettings: Schema.optional(Schema.Array(LiaCountrySettings)),
    }),
  ).annotate({
    identifier: "LiaSettings",
  }) as any as Schema.Schema<LiaSettings>;

export interface LiasettingsCustomBatchRequestEntry {
  /** The ID of POS data provider. Required only for SetPosProvider. */
  posDataProviderId?: string;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The omnichannel experience for a country. Required only for SetOmnichannelExperience. */
  omnichannelExperience?: LiaOmnichannelExperience;
  /** The account Lia settings to update. Only defined if the method is `update`. */
  liaSettings?: LiaSettings;
  /** Inventory validation contact email. Required only for SetInventoryValidationContact. */
  contactEmail?: string;
  /** The country code. Required only for RequestInventoryVerification. */
  country?: string;
  /** The Business Profile. Required only for RequestGmbAccess. */
  gmbEmail?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" - "`getAccessibleGmbAccounts`" - "`requestGmbAccess`" - "`requestInventoryVerification`" - "`setInventoryVerificationContact`" - "`update`" */
  method?: string;
  /** The ID of the account for which to get/update account LIA settings. */
  accountId?: string;
  /** The account ID by which this merchant is known to the POS provider. */
  posExternalAccountId?: string;
  /** Inventory validation contact name. Required only for SetInventoryValidationContact. */
  contactName?: string;
}

export const LiasettingsCustomBatchRequestEntry: Schema.Schema<LiasettingsCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      posDataProviderId: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      omnichannelExperience: Schema.optional(LiaOmnichannelExperience),
      liaSettings: Schema.optional(LiaSettings),
      contactEmail: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      gmbEmail: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      posExternalAccountId: Schema.optional(Schema.String),
      contactName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsCustomBatchRequestEntry",
  }) as any as Schema.Schema<LiasettingsCustomBatchRequestEntry>;

export interface LiasettingsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<LiasettingsCustomBatchRequestEntry>;
}

export const LiasettingsCustomBatchRequest: Schema.Schema<LiasettingsCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(LiasettingsCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "LiasettingsCustomBatchRequest",
  }) as any as Schema.Schema<LiasettingsCustomBatchRequest>;

export interface CustomAttribute {
  /** The value of the attribute. */
  value?: string;
  /** The name of the attribute. Underscores will be replaced by spaces upon insertion. */
  name?: string;
  /** Subattributes within this attribute group. Exactly one of value or groupValues must be provided. */
  groupValues?: Array<CustomAttribute>;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      groupValues: Schema.optional(Schema.Array(CustomAttribute)),
    }),
  ).annotate({
    identifier: "CustomAttribute",
  }) as any as Schema.Schema<CustomAttribute>;

export interface Content_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Content_Date: Schema.Schema<Content_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Content_Date",
  }) as any as Schema.Schema<Content_Date>;

export interface Address {
  /** Required. City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs). */
  city?: string;
  /** Required. [CLDR country code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) (for example, "US"). */
  country?: string;
  /** Street-level part of the address. Use `\n` to add a second line. */
  streetAddress?: string;
  /** Required. Postal code or ZIP (for example, "94043"). */
  postalCode?: string;
  /** Required. Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC"). */
  administrativeArea?: string;
}

export const Address: Schema.Schema<Address> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      city: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      streetAddress: Schema.optional(Schema.String),
      postalCode: Schema.optional(Schema.String),
      administrativeArea: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface TimeZone {
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
}

export const TimeZone: Schema.Schema<TimeZone> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface DateTime {
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Time zone. */
  timeZone?: TimeZone;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
}

export const DateTime: Schema.Schema<DateTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      day: Schema.optional(Schema.Number),
      minutes: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      seconds: Schema.optional(Schema.Number),
      nanos: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
      hours: Schema.optional(Schema.Number),
      timeZone: Schema.optional(TimeZone),
      utcOffset: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DateTime" }) as any as Schema.Schema<DateTime>;

export interface OrderTrackingSignalShippingInfo {
  /** The tracking ID of the shipment. This field is required if one of the following fields is absent: earliest_delivery_promise_time, latest_delivery_promise_time, and actual_delivery_time. */
  trackingId?: string;
  /** The origin postal code, as a continuous string without spaces or dashes, e.g. "95016". This field will be anonymized in returned OrderTrackingSignal creation response. */
  originPostalCode?: string;
  /** The latest delivery promised time. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  latestDeliveryPromiseTime?: DateTime;
  /** The time when the shipment was actually delivered. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  actualDeliveryTime?: DateTime;
  /** The status of the shipment. */
  shippingStatus?:
    | "SHIPPING_STATE_UNSPECIFIED"
    | "SHIPPED"
    | "DELIVERED"
    | (string & {});
  /** Required. The shipment ID. This field will be hashed in returned OrderTrackingSignal creation response. */
  shipmentId?: string;
  /** The service type for fulfillment, e.g., GROUND, FIRST_CLASS, etc. */
  carrierServiceName?: string;
  /** The time when the shipment was shipped. Include the year and timezone string, if available. */
  shippedTime?: DateTime;
  /** The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the shipping origin. */
  originRegionCode?: string;
  /** The earliest delivery promised time. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  earliestDeliveryPromiseTime?: DateTime;
  /** The name of the shipping carrier for the delivery. This field is required if one of the following fields is absent: earliest_delivery_promise_time, latest_delivery_promise_time, and actual_delivery_time. */
  carrierName?: string;
}

export const OrderTrackingSignalShippingInfo: Schema.Schema<OrderTrackingSignalShippingInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trackingId: Schema.optional(Schema.String),
      originPostalCode: Schema.optional(Schema.String),
      latestDeliveryPromiseTime: Schema.optional(DateTime),
      actualDeliveryTime: Schema.optional(DateTime),
      shippingStatus: Schema.optional(Schema.String),
      shipmentId: Schema.optional(Schema.String),
      carrierServiceName: Schema.optional(Schema.String),
      shippedTime: Schema.optional(DateTime),
      originRegionCode: Schema.optional(Schema.String),
      earliestDeliveryPromiseTime: Schema.optional(DateTime),
      carrierName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrderTrackingSignalShippingInfo",
  }) as any as Schema.Schema<OrderTrackingSignalShippingInfo>;

export interface DeliveryAreaPostalCodeRange {
  /** Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`. */
  firstPostalCode?: string;
  /** A postal code or a pattern of the form prefix* denoting the inclusive upper bound of the range defining the area (for example [070* - 078*] results in the range [07000 - 07899]). It must have the same length as `firstPostalCode`: if `firstPostalCode` is a postal code then `lastPostalCode` must be a postal code too; if firstPostalCode is a pattern then `lastPostalCode` must be a pattern with the same prefix length. Ignored if not set, then the area is defined as being all the postal codes matching `firstPostalCode`. */
  lastPostalCode?: string;
}

export const DeliveryAreaPostalCodeRange: Schema.Schema<DeliveryAreaPostalCodeRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      firstPostalCode: Schema.optional(Schema.String),
      lastPostalCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeliveryAreaPostalCodeRange",
  }) as any as Schema.Schema<DeliveryAreaPostalCodeRange>;

export interface DeliveryArea {
  /** A postal code, postal code range or postal code prefix that defines this area. Limited to US and AUS. */
  postalCodeRange?: DeliveryAreaPostalCodeRange;
  /** A state, territory, or prefecture. This is supported for the United States, Australia, and Japan. Provide a subdivision code from the ISO 3166-2 code tables ([US](https://en.wikipedia.org/wiki/ISO_3166-2:US), [AU](https://en.wikipedia.org/wiki/ISO_3166-2:AU), or [JP](https://en.wikipedia.org/wiki/ISO_3166-2:JP)) without country prefix (for example, `"NY"`, `"NSW"`, `"03"`). */
  regionCode?: string;
  /** Required. The country that the product can be delivered to. Submit a [unicode CLDR region](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) such as `US` or `CH`. */
  countryCode?: string;
}

export const DeliveryArea: Schema.Schema<DeliveryArea> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postalCodeRange: Schema.optional(DeliveryAreaPostalCodeRange),
      regionCode: Schema.optional(Schema.String),
      countryCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeliveryArea",
  }) as any as Schema.Schema<DeliveryArea>;

export interface InputValueCheckboxInputValue {
  /** Required. True if the merchant checked the box field. False otherwise. */
  value?: boolean;
}

export const InputValueCheckboxInputValue: Schema.Schema<InputValueCheckboxInputValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "InputValueCheckboxInputValue",
  }) as any as Schema.Schema<InputValueCheckboxInputValue>;

export interface InputValueTextInputValue {
  /** Required. Text provided by the merchant. */
  value?: string;
}

export const InputValueTextInputValue: Schema.Schema<InputValueTextInputValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InputValueTextInputValue",
  }) as any as Schema.Schema<InputValueTextInputValue>;

export interface InputValueChoiceInputValue {
  /** Required. Id of the option that was selected by the merchant. */
  choiceInputOptionId?: string;
}

export const InputValueChoiceInputValue: Schema.Schema<InputValueChoiceInputValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      choiceInputOptionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InputValueChoiceInputValue",
  }) as any as Schema.Schema<InputValueChoiceInputValue>;

export interface InputValue {
  /** Required. Id of the corresponding input field. */
  inputFieldId?: string;
  /** Value for checkbox input field. */
  checkboxInputValue?: InputValueCheckboxInputValue;
  /** Value for text input field. */
  textInputValue?: InputValueTextInputValue;
  /** Value for choice input field. */
  choiceInputValue?: InputValueChoiceInputValue;
}

export const InputValue: Schema.Schema<InputValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputFieldId: Schema.optional(Schema.String),
      checkboxInputValue: Schema.optional(InputValueCheckboxInputValue),
      textInputValue: Schema.optional(InputValueTextInputValue),
      choiceInputValue: Schema.optional(InputValueChoiceInputValue),
    }),
  ).annotate({ identifier: "InputValue" }) as any as Schema.Schema<InputValue>;

export interface ActionInput {
  /** Required. Values for input fields. */
  inputValues?: Array<InputValue>;
  /** Required. Id of the selected action flow. */
  actionFlowId?: string;
}

export const ActionInput: Schema.Schema<ActionInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputValues: Schema.optional(Schema.Array(InputValue)),
      actionFlowId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActionInput",
  }) as any as Schema.Schema<ActionInput>;

export interface TriggerActionPayload {
  /** Required. The context from the selected action. The value is obtained from rendered issues and needs to be sent back to identify the action that is being triggered. */
  actionContext?: string;
  /** Required. Input provided by the merchant. */
  actionInput?: ActionInput;
}

export const TriggerActionPayload: Schema.Schema<TriggerActionPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionContext: Schema.optional(Schema.String),
      actionInput: Schema.optional(ActionInput),
    }),
  ).annotate({
    identifier: "TriggerActionPayload",
  }) as any as Schema.Schema<TriggerActionPayload>;

export interface CollectionStatusDestinationStatus {
  /** Country codes (ISO 3166-1 alpha-2) where the collection is disapproved. */
  disapprovedCountries?: Array<string>;
  /** Country codes (ISO 3166-1 alpha-2) where the collection is approved. */
  approvedCountries?: Array<string>;
  /** Country codes (ISO 3166-1 alpha-2) where the collection is pending approval. */
  pendingCountries?: Array<string>;
  /** The status for the specified destination in the collections target country. */
  status?: string;
  /** The name of the destination */
  destination?: string;
}

export const CollectionStatusDestinationStatus: Schema.Schema<CollectionStatusDestinationStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
      approvedCountries: Schema.optional(Schema.Array(Schema.String)),
      pendingCountries: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.String),
      destination: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CollectionStatusDestinationStatus",
  }) as any as Schema.Schema<CollectionStatusDestinationStatus>;

export interface CollectionStatusItemLevelIssue {
  /** A detailed issue description in English. */
  detail?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** A short issue description in English. */
  description?: string;
  /** The destination the issue applies to. */
  destination?: string;
  /** The error code of the issue. */
  code?: string;
  /** Country codes (ISO 3166-1 alpha-2) where issue applies to the offer. */
  applicableCountries?: Array<string>;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** How this issue affects the serving of the collection. */
  servability?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attributeName?: string;
}

export const CollectionStatusItemLevelIssue: Schema.Schema<CollectionStatusItemLevelIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      detail: Schema.optional(Schema.String),
      documentation: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      destination: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      applicableCountries: Schema.optional(Schema.Array(Schema.String)),
      resolution: Schema.optional(Schema.String),
      servability: Schema.optional(Schema.String),
      attributeName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CollectionStatusItemLevelIssue",
  }) as any as Schema.Schema<CollectionStatusItemLevelIssue>;

export interface CollectionStatus {
  /** The intended destinations for the collection. */
  destinationStatuses?: Array<CollectionStatusDestinationStatus>;
  /** Date on which the collection has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  creationDate?: string;
  /** Required. The ID of the collection for which status is reported. */
  id?: string;
  /** Date on which the collection has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  lastUpdateDate?: string;
  /** A list of all issues associated with the collection. */
  collectionLevelIssuses?: Array<CollectionStatusItemLevelIssue>;
}

export const CollectionStatus: Schema.Schema<CollectionStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destinationStatuses: Schema.optional(
        Schema.Array(CollectionStatusDestinationStatus),
      ),
      creationDate: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      lastUpdateDate: Schema.optional(Schema.String),
      collectionLevelIssuses: Schema.optional(
        Schema.Array(CollectionStatusItemLevelIssue),
      ),
    }),
  ).annotate({
    identifier: "CollectionStatus",
  }) as any as Schema.Schema<CollectionStatus>;

export interface ListCollectionStatusesResponse {
  /** The collectionstatuses listed. */
  resources?: Array<CollectionStatus>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCollectionStatusesResponse: Schema.Schema<ListCollectionStatusesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(CollectionStatus)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCollectionStatusesResponse",
  }) as any as Schema.Schema<ListCollectionStatusesResponse>;

export interface AttributionSettingsConversionType {
  /** Output only. Conversion event name, as it'll be reported by the client. */
  name?: string;
  /** Output only. Option indicating if the type should be included in Merchant Center reporting. */
  includeInReporting?: boolean;
}

export const AttributionSettingsConversionType: Schema.Schema<AttributionSettingsConversionType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      includeInReporting: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AttributionSettingsConversionType",
  }) as any as Schema.Schema<AttributionSettingsConversionType>;

export interface AttributionSettings {
  /** Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40. */
  attributionLookbackWindowInDays?: number;
  /** Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time. */
  conversionType?: Array<AttributionSettingsConversionType>;
  attributionModel?:
    | "ATTRIBUTION_MODEL_UNSPECIFIED"
    | "CROSS_CHANNEL_LAST_CLICK"
    | "ADS_PREFERRED_LAST_CLICK"
    | "CROSS_CHANNEL_DATA_DRIVEN"
    | "CROSS_CHANNEL_FIRST_CLICK"
    | "CROSS_CHANNEL_LINEAR"
    | "CROSS_CHANNEL_POSITION_BASED"
    | "CROSS_CHANNEL_TIME_DECAY"
    | (string & {});
}

export const AttributionSettings: Schema.Schema<AttributionSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attributionLookbackWindowInDays: Schema.optional(Schema.Number),
      conversionType: Schema.optional(
        Schema.Array(AttributionSettingsConversionType),
      ),
      attributionModel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AttributionSettings",
  }) as any as Schema.Schema<AttributionSettings>;

export interface UrlSettings {
  /** URL template when the placeholders are expanded will redirect the buyer to the merchant checkout page with the item in the cart. */
  checkoutUriTemplate?: string;
  /** URL template when the placeholders are expanded will redirect the buyer to the cart page on the merchant website with the selected item in cart. */
  cartUriTemplate?: string;
}

export const UrlSettings: Schema.Schema<UrlSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      checkoutUriTemplate: Schema.optional(Schema.String),
      cartUriTemplate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UrlSettings",
  }) as any as Schema.Schema<UrlSettings>;

export interface AccountIdentifier {
  /** The aggregator ID, set for aggregators and subaccounts (in that case, it represents the aggregator of the subaccount). */
  aggregatorId?: string;
  /** The merchant account ID, set for individual accounts and subaccounts. */
  merchantId?: string;
}

export const AccountIdentifier: Schema.Schema<AccountIdentifier> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      aggregatorId: Schema.optional(Schema.String),
      merchantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountIdentifier",
  }) as any as Schema.Schema<AccountIdentifier>;

export interface AccountsAuthInfoResponse {
  /** The account identifiers corresponding to the authenticated user. - For an individual account: only the merchant ID is defined - For an aggregator: only the aggregator ID is defined - For a subaccount of an MCA: both the merchant ID and the aggregator ID are defined. */
  accountIdentifiers?: Array<AccountIdentifier>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsAuthInfoResponse`". */
  kind?: string;
}

export const AccountsAuthInfoResponse: Schema.Schema<AccountsAuthInfoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountIdentifiers: Schema.optional(Schema.Array(AccountIdentifier)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsAuthInfoResponse",
  }) as any as Schema.Schema<AccountsAuthInfoResponse>;

export interface Price {
  /** The price represented as a number. */
  value?: string;
  /** The currency of the price. */
  currency?: string;
}

export const Price: Schema.Schema<Price> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      currency: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface MinimumOrderValueTableStoreCodeSetWithMov {
  /** A list of unique store codes or empty for the catch all. */
  storeCodes?: Array<string>;
  /** The minimum order value for the given stores. */
  value?: Price;
}

export const MinimumOrderValueTableStoreCodeSetWithMov: Schema.Schema<MinimumOrderValueTableStoreCodeSetWithMov> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeCodes: Schema.optional(Schema.Array(Schema.String)),
      value: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "MinimumOrderValueTableStoreCodeSetWithMov",
  }) as any as Schema.Schema<MinimumOrderValueTableStoreCodeSetWithMov>;

export interface DatafeedFormat {
  /** Character encoding scheme of the data feed. If not specified, the encoding will be auto-detected. Acceptable values are: - "`latin-1`" - "`utf-16be`" - "`utf-16le`" - "`utf-8`" - "`windows-1252`" */
  fileEncoding?: string;
  /** Specifies how double quotes are interpreted. If not specified, the mode will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`normal character`" - "`value quoting`" */
  quotingMode?: string;
  /** Delimiter for the separation of values in a delimiter-separated values feed. If not specified, the delimiter will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`pipe`" - "`tab`" - "`tilde`" */
  columnDelimiter?: string;
}

export const DatafeedFormat: Schema.Schema<DatafeedFormat> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileEncoding: Schema.optional(Schema.String),
      quotingMode: Schema.optional(Schema.String),
      columnDelimiter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedFormat",
  }) as any as Schema.Schema<DatafeedFormat>;

export interface DatafeedFetchSchedule {
  /** The day of the month the feed file should be fetched (1-31). */
  dayOfMonth?: number;
  /** An optional user name for fetch_url. */
  username?: string;
  /** An optional password for fetch_url. */
  password?: string;
  /** The hour of the day the feed file should be fetched (0-23). */
  hour?: number;
  /** Time zone used for schedule. UTC by default. For example, "America/Los_Angeles". */
  timeZone?: string;
  /** The day of the week the feed file should be fetched. Acceptable values are: - "`monday`" - "`tuesday`" - "`wednesday`" - "`thursday`" - "`friday`" - "`saturday`" - "`sunday`" */
  weekday?: string;
  /** The minute of the hour the feed file should be fetched (0-59). Read-only. */
  minuteOfHour?: number;
  /** Whether the scheduled fetch is paused or not. */
  paused?: boolean;
  /** The URL where the feed file can be fetched. Google Merchant Center will support automatic scheduled uploads using the HTTP, HTTPS, FTP, or SFTP protocols, so the value will need to be a valid link using one of those four protocols. */
  fetchUrl?: string;
}

export const DatafeedFetchSchedule: Schema.Schema<DatafeedFetchSchedule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dayOfMonth: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
      hour: Schema.optional(Schema.Number),
      timeZone: Schema.optional(Schema.String),
      weekday: Schema.optional(Schema.String),
      minuteOfHour: Schema.optional(Schema.Number),
      paused: Schema.optional(Schema.Boolean),
      fetchUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedFetchSchedule",
  }) as any as Schema.Schema<DatafeedFetchSchedule>;

export interface DatafeedTarget {
  /** Feed label for the DatafeedTarget. Either `country` or `feedLabel` is required. If both `feedLabel` and `country` is specified, the values must match. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). */
  feedLabel?: string;
  /** Deprecated. Use `feedLabel` instead. The country where the items in the feed will be included in the search index, represented as a CLDR territory code. */
  country?: string;
  /** The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted. */
  excludedDestinations?: Array<string>;
  /** The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`. */
  includedDestinations?: Array<string>;
  /** The two-letter ISO 639-1 language of the items in the feed. Must be a valid language for `targets[].country`. */
  language?: string;
  /** The countries where the items may be displayed. Represented as a CLDR territory code. Will be ignored for "product inventory" feeds. */
  targetCountries?: Array<string>;
}

export const DatafeedTarget: Schema.Schema<DatafeedTarget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      feedLabel: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      excludedDestinations: Schema.optional(Schema.Array(Schema.String)),
      includedDestinations: Schema.optional(Schema.Array(Schema.String)),
      language: Schema.optional(Schema.String),
      targetCountries: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DatafeedTarget",
  }) as any as Schema.Schema<DatafeedTarget>;

export interface Datafeed {
  /** Required. The filename of the feed. All feeds must have a unique file name. */
  fileName?: string;
  /** Format of the feed file. */
  format?: DatafeedFormat;
  /** The two-letter ISO 639-1 language in which the attributes are defined in the data feed. */
  attributeLanguage?: string;
  /** Fetch schedule for the feed file. */
  fetchSchedule?: DatafeedFetchSchedule;
  /** The targets this feed should apply to (country, language, destinations). */
  targets?: Array<DatafeedTarget>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeed`" */
  kind?: string;
  /** Required. The type of data feed. For product inventory feeds, only feeds for local stores, not online stores, are supported. Acceptable values are: - "`local products`" - "`product inventory`" - "`products`" */
  contentType?: string;
  /** Required for insert. A descriptive name of the data feed. */
  name?: string;
  /** Required for update. The ID of the data feed. */
  id?: string;
}

export const Datafeed: Schema.Schema<Datafeed> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileName: Schema.optional(Schema.String),
      format: Schema.optional(DatafeedFormat),
      attributeLanguage: Schema.optional(Schema.String),
      fetchSchedule: Schema.optional(DatafeedFetchSchedule),
      targets: Schema.optional(Schema.Array(DatafeedTarget)),
      kind: Schema.optional(Schema.String),
      contentType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Datafeed" }) as any as Schema.Schema<Datafeed>;

export interface DatafeedsCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`delete`" - "`fetchNow`" - "`get`" - "`insert`" - "`update`" */
  method?: string;
  /** The ID of the data feed to get, delete or fetch. */
  datafeedId?: string;
  /** The data feed to insert. */
  datafeed?: Datafeed;
}

export const DatafeedsCustomBatchRequestEntry: Schema.Schema<DatafeedsCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      datafeedId: Schema.optional(Schema.String),
      datafeed: Schema.optional(Datafeed),
    }),
  ).annotate({
    identifier: "DatafeedsCustomBatchRequestEntry",
  }) as any as Schema.Schema<DatafeedsCustomBatchRequestEntry>;

export interface DatafeedsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<DatafeedsCustomBatchRequestEntry>;
}

export const DatafeedsCustomBatchRequest: Schema.Schema<DatafeedsCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(DatafeedsCustomBatchRequestEntry)),
    }),
  ).annotate({
    identifier: "DatafeedsCustomBatchRequest",
  }) as any as Schema.Schema<DatafeedsCustomBatchRequest>;

export interface ProductId {
  /** The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`. */
  productId?: string;
}

export const ProductId: Schema.Schema<ProductId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      productId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ProductId" }) as any as Schema.Schema<ProductId>;

export interface ProductDeliveryTimeAreaDeliveryTimeDeliveryTime {
  /** Required. The minimum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0. */
  minHandlingTimeDays?: number;
  /** Required. The maximum number of business days (inclusive) between when the product ships and when the product is delivered. */
  maxTransitTimeDays?: number;
  /** Required. The maximum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0. */
  maxHandlingTimeDays?: number;
  /** Required. The minimum number of business days (inclusive) between when the product ships and when the product is delivered. */
  minTransitTimeDays?: number;
}

export const ProductDeliveryTimeAreaDeliveryTimeDeliveryTime: Schema.Schema<ProductDeliveryTimeAreaDeliveryTimeDeliveryTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minHandlingTimeDays: Schema.optional(Schema.Number),
      maxTransitTimeDays: Schema.optional(Schema.Number),
      maxHandlingTimeDays: Schema.optional(Schema.Number),
      minTransitTimeDays: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ProductDeliveryTimeAreaDeliveryTimeDeliveryTime",
  }) as any as Schema.Schema<ProductDeliveryTimeAreaDeliveryTimeDeliveryTime>;

export interface ProductDeliveryTimeAreaDeliveryTime {
  /** Required. The delivery time associated with `deliveryArea` for this product. */
  deliveryTime?: ProductDeliveryTimeAreaDeliveryTimeDeliveryTime;
  /** Required. The delivery area associated with `deliveryTime` for this product. */
  deliveryArea?: DeliveryArea;
}

export const ProductDeliveryTimeAreaDeliveryTime: Schema.Schema<ProductDeliveryTimeAreaDeliveryTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deliveryTime: Schema.optional(
        ProductDeliveryTimeAreaDeliveryTimeDeliveryTime,
      ),
      deliveryArea: Schema.optional(DeliveryArea),
    }),
  ).annotate({
    identifier: "ProductDeliveryTimeAreaDeliveryTime",
  }) as any as Schema.Schema<ProductDeliveryTimeAreaDeliveryTime>;

export interface ProductDeliveryTime {
  /** Required. The `id` of the product. */
  productId?: ProductId;
  /** Required. A set of associations between `DeliveryArea` and `DeliveryTime` entries. The total number of `areaDeliveryTimes` can be at most 100. */
  areaDeliveryTimes?: Array<ProductDeliveryTimeAreaDeliveryTime>;
}

export const ProductDeliveryTime: Schema.Schema<ProductDeliveryTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      productId: Schema.optional(ProductId),
      areaDeliveryTimes: Schema.optional(
        Schema.Array(ProductDeliveryTimeAreaDeliveryTime),
      ),
    }),
  ).annotate({
    identifier: "ProductDeliveryTime",
  }) as any as Schema.Schema<ProductDeliveryTime>;

export interface PosSaleResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posSaleResponse`". */
  kind?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** A unique ID to group items from the same sale event. */
  saleId?: string;
  /** Required. The price of the item. */
  price?: Price;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Global Trade Item Number. */
  gtin?: string;
}

export const PosSaleResponse: Schema.Schema<PosSaleResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.String),
      targetCountry: Schema.optional(Schema.String),
      saleId: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      contentLanguage: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosSaleResponse",
  }) as any as Schema.Schema<PosSaleResponse>;

export interface MerchantCenterDestination {
  /** Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. Limited to 64 characters. */
  displayName?: string;
  /** Required. Three-letter currency code (ISO 4217). The currency code defines in which currency the conversions sent to this destination will be reported in Merchant Center. */
  currencyCode?: string;
  /** Required. Attribution settings being used for the Merchant Center Destination. */
  attributionSettings?: AttributionSettings;
  /** Output only. Merchant Center Destination ID. */
  destinationId?: string;
}

export const MerchantCenterDestination: Schema.Schema<MerchantCenterDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      attributionSettings: Schema.optional(AttributionSettings),
      destinationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MerchantCenterDestination",
  }) as any as Schema.Schema<MerchantCenterDestination>;

export interface AccountIdentityType {
  /** Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions. */
  selfIdentified?: boolean;
}

export const AccountIdentityType: Schema.Schema<AccountIdentityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selfIdentified: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountIdentityType",
  }) as any as Schema.Schema<AccountIdentityType>;

export interface DatafeedStatusExample {
  /** Line number in the data feed where the example is found. */
  lineNumber?: string;
  /** The ID of the example item. */
  itemId?: string;
  /** The problematic value. */
  value?: string;
}

export const DatafeedStatusExample: Schema.Schema<DatafeedStatusExample> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineNumber: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedStatusExample",
  }) as any as Schema.Schema<DatafeedStatusExample>;

export interface DatafeedStatusError {
  /** The error message, for example, "Invalid price". */
  message?: string;
  /** The number of occurrences of the error in the feed. */
  count?: string;
  /** The code of the error, for example, "validation/invalid_value". */
  code?: string;
  /** A list of example occurrences of the error, grouped by product. */
  examples?: Array<DatafeedStatusExample>;
}

export const DatafeedStatusError: Schema.Schema<DatafeedStatusError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      count: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      examples: Schema.optional(Schema.Array(DatafeedStatusExample)),
    }),
  ).annotate({
    identifier: "DatafeedStatusError",
  }) as any as Schema.Schema<DatafeedStatusError>;

export interface DatafeedStatus {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedStatus`" */
  kind?: string;
  /** The country for which the status is reported, represented as a CLDR territory code. */
  country?: string;
  /** The two-letter ISO 639-1 language for which the status is reported. */
  language?: string;
  /** The list of errors occurring in the feed. */
  errors?: Array<DatafeedStatusError>;
  /** The list of errors occurring in the feed. */
  warnings?: Array<DatafeedStatusError>;
  /** The feed label status is reported for. */
  feedLabel?: string;
  /** The ID of the feed for which the status is reported. */
  datafeedId?: string;
  /** The number of items in the feed that were valid. */
  itemsValid?: string;
  /** The processing status of the feed. Acceptable values are: - "`"`failure`": The feed could not be processed or all items had errors.`" - "`in progress`": The feed is being processed. - "`none`": The feed has not yet been processed. For example, a feed that has never been uploaded will have this processing status. - "`success`": The feed was processed successfully, though some items might have had errors. */
  processingStatus?: string;
  /** The number of items in the feed that were processed. */
  itemsTotal?: string;
  /** The last date at which the feed was uploaded. */
  lastUploadDate?: string;
}

export const DatafeedStatus: Schema.Schema<DatafeedStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      language: Schema.optional(Schema.String),
      errors: Schema.optional(Schema.Array(DatafeedStatusError)),
      warnings: Schema.optional(Schema.Array(DatafeedStatusError)),
      feedLabel: Schema.optional(Schema.String),
      datafeedId: Schema.optional(Schema.String),
      itemsValid: Schema.optional(Schema.String),
      processingStatus: Schema.optional(Schema.String),
      itemsTotal: Schema.optional(Schema.String),
      lastUploadDate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedStatus",
  }) as any as Schema.Schema<DatafeedStatus>;

export interface Content_Error {
  /** The error code. */
  reason?: string;
  /** The domain of the error. */
  domain?: string;
  /** A description of the error. */
  message?: string;
}

export const Content_Error: Schema.Schema<Content_Error> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      domain: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Content_Error",
  }) as any as Schema.Schema<Content_Error>;

export interface Errors {
  /** The HTTP status of the first error in `errors`. */
  code?: number;
  /** The message of the first error in `errors`. */
  message?: string;
  /** A list of errors. */
  errors?: Array<Content_Error>;
}

export const Errors: Schema.Schema<Errors> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      errors: Schema.optional(Schema.Array(Content_Error)),
    }),
  ).annotate({ identifier: "Errors" }) as any as Schema.Schema<Errors>;

export interface DatafeedstatusesCustomBatchResponseEntry {
  /** The requested data feed status. Defined if and only if the request was successful. */
  datafeedStatus?: DatafeedStatus;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
}

export const DatafeedstatusesCustomBatchResponseEntry: Schema.Schema<DatafeedstatusesCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      datafeedStatus: Schema.optional(DatafeedStatus),
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DatafeedstatusesCustomBatchResponseEntry",
  }) as any as Schema.Schema<DatafeedstatusesCustomBatchResponseEntry>;

export interface DatafeedstatusesCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<DatafeedstatusesCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedstatusesCustomBatchResponse`". */
  kind?: string;
}

export const DatafeedstatusesCustomBatchResponse: Schema.Schema<DatafeedstatusesCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(DatafeedstatusesCustomBatchResponseEntry),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedstatusesCustomBatchResponse",
  }) as any as Schema.Schema<DatafeedstatusesCustomBatchResponse>;

export interface CollectionFeaturedProduct {
  /** Required. X-coordinate of the product callout on the Shoppable Image. */
  x?: number;
  /** The unique identifier for the product item. */
  offerId?: string;
  /** Required. Y-coordinate of the product callout on the Shoppable Image. */
  y?: number;
}

export const CollectionFeaturedProduct: Schema.Schema<CollectionFeaturedProduct> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      x: Schema.optional(Schema.Number),
      offerId: Schema.optional(Schema.String),
      y: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "CollectionFeaturedProduct",
  }) as any as Schema.Schema<CollectionFeaturedProduct>;

export interface Collection {
  /** This identifies one or more products associated with the collection. Used as a lookup to the corresponding product ID in your product feeds. Provide a maximum of 100 featuredProduct (for collections). Provide up to 10 featuredProduct (for Shoppable Images only) with ID and X and Y coordinates. [featured_product attribute](https://support.google.com/merchants/answer/9703736) */
  featuredProduct?: Array<CollectionFeaturedProduct>;
  /** A collection’s mobile-optimized landing page when you have a different URL for mobile and desktop traffic. [mobile_link attribute](https://support.google.com/merchants/answer/9646123) */
  mobileLink?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel1?: string;
  /** A collection’s landing page. URL directly linking to your collection's page on your website. [link attribute](https://support.google.com/merchants/answer/9673983) */
  link?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel3?: string;
  /** The language of a collection and the language of any featured products linked to the collection. [language attribute](https://support.google.com/merchants/answer/9673781) */
  language?: string;
  /** [product_country attribute](https://support.google.com/merchants/answer/9674155) */
  productCountry?: string;
  /** The URL of a collection’s image. [image_link attribute](https://support.google.com/merchants/answer/9703236) */
  imageLink?: Array<string>;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel2?: string;
  /** Required. The REST ID of the collection. Content API methods that operate on collections take this as their collectionId parameter. The REST ID for a collection is of the form collectionId. [id attribute](https://support.google.com/merchants/answer/9649290) */
  id?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel4?: string;
  /** Your collection's name. [headline attribute](https://support.google.com/merchants/answer/9673580) */
  headline?: Array<string>;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. [Custom label](https://support.google.com/merchants/answer/9674217) */
  customLabel0?: string;
}

export const Collection: Schema.Schema<Collection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      featuredProduct: Schema.optional(Schema.Array(CollectionFeaturedProduct)),
      mobileLink: Schema.optional(Schema.String),
      customLabel1: Schema.optional(Schema.String),
      link: Schema.optional(Schema.String),
      customLabel3: Schema.optional(Schema.String),
      language: Schema.optional(Schema.String),
      productCountry: Schema.optional(Schema.String),
      imageLink: Schema.optional(Schema.Array(Schema.String)),
      customLabel2: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      customLabel4: Schema.optional(Schema.String),
      headline: Schema.optional(Schema.Array(Schema.String)),
      customLabel0: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Collection" }) as any as Schema.Schema<Collection>;

export interface ListCollectionsResponse {
  /** The collections listed. */
  resources?: Array<Collection>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCollectionsResponse: Schema.Schema<ListCollectionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(Collection)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCollectionsResponse",
  }) as any as Schema.Schema<ListCollectionsResponse>;

export interface TextWithTooltip {
  /** Value of the tooltip as a simple text. */
  simpleTooltipValue?: string;
  /** Value of the message as a simple text. */
  simpleValue?: string;
  /** The suggested type of an icon for tooltip, if a tooltip is present. */
  tooltipIconStyle?:
    | "TOOLTIP_ICON_STYLE_UNSPECIFIED"
    | "INFO"
    | "QUESTION"
    | (string & {});
}

export const TextWithTooltip: Schema.Schema<TextWithTooltip> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      simpleTooltipValue: Schema.optional(Schema.String),
      simpleValue: Schema.optional(Schema.String),
      tooltipIconStyle: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TextWithTooltip",
  }) as any as Schema.Schema<TextWithTooltip>;

export interface InputFieldTextInput {
  /** Additional info regarding the field to be displayed to merchant. For example, warning to not include personal identifiable information. There may be more information to be shown in a tooltip. */
  additionalInfo?: TextWithTooltip;
  /** Information about the required format. If present, it should be shown close to the input field to help merchants to provide a correct value. For example: "VAT numbers should be in a format similar to SK9999999999" */
  formatInfo?: string;
  /** Text to be used as the [aria-label](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) for the input. */
  ariaLabel?: string;
  /** Type of the text input */
  type?:
    | "TEXT_INPUT_TYPE_UNSPECIFIED"
    | "GENERIC_SHORT_TEXT"
    | "GENERIC_LONG_TEXT"
    | (string & {});
}

export const InputFieldTextInput: Schema.Schema<InputFieldTextInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      additionalInfo: Schema.optional(TextWithTooltip),
      formatInfo: Schema.optional(Schema.String),
      ariaLabel: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InputFieldTextInput",
  }) as any as Schema.Schema<InputFieldTextInput>;

export interface CarrierRate {
  /** Carrier service, such as `"ground"` or `"2 days"`. The list of supported services for a carrier can be retrieved through the `getSupportedCarriers` method. Required. */
  carrierService?: string;
  /** Multiplicative shipping rate modifier as a number in decimal notation. Can be negative. For example `"5.4"` increases the rate by 5.4%, `"-3"` decreases the rate by 3%. Optional. */
  percentageAdjustment?: string;
  /** Shipping origin for this carrier rate. Required. */
  originPostalCode?: string;
  /** Additive shipping rate modifier. Can be negative. For example `{ "value": "1", "currency" : "USD" }` adds $1 to the rate, `{ "value": "-3", "currency" : "USD" }` removes $3 from the rate. Optional. */
  flatAdjustment?: Price;
  /** Name of the carrier rate. Must be unique per rate group. Required. */
  name?: string;
  /** Carrier service, such as `"UPS"` or `"Fedex"`. The list of supported carriers can be retrieved through the `getSupportedCarriers` method. Required. */
  carrierName?: string;
}

export const CarrierRate: Schema.Schema<CarrierRate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      carrierService: Schema.optional(Schema.String),
      percentageAdjustment: Schema.optional(Schema.String),
      originPostalCode: Schema.optional(Schema.String),
      flatAdjustment: Schema.optional(Price),
      name: Schema.optional(Schema.String),
      carrierName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CarrierRate",
  }) as any as Schema.Schema<CarrierRate>;

export interface AccountItemUpdatesSettings {
  /** If price updates are enabled, Google always updates the active price with the crawled information. */
  allowPriceUpdates?: boolean;
  /** If allow_availability_updates is enabled, items are automatically updated in all your Shopping target countries. By default, availability updates will only be applied to items that are 'out of stock' on your website but 'in stock' on Shopping. Set this to true to also update items that are 'in stock' on your website, but 'out of stock' on Google Shopping. In order for this field to have an effect, you must also allow availability updates. */
  allowStrictAvailabilityUpdates?: boolean;
  /** If condition updates are enabled, Google always updates item condition with the condition detected from the details of your product. */
  allowConditionUpdates?: boolean;
  /** If availability updates are enabled, any previous availability values get overwritten if Google finds an out-of-stock annotation on the offer's page. If additionally `allow_availability_updates` field is set to true, values get overwritten if Google finds an in-stock annotation on the offer’s page. */
  allowAvailabilityUpdates?: boolean;
}

export const AccountItemUpdatesSettings: Schema.Schema<AccountItemUpdatesSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowPriceUpdates: Schema.optional(Schema.Boolean),
      allowStrictAvailabilityUpdates: Schema.optional(Schema.Boolean),
      allowConditionUpdates: Schema.optional(Schema.Boolean),
      allowAvailabilityUpdates: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountItemUpdatesSettings",
  }) as any as Schema.Schema<AccountItemUpdatesSettings>;

export interface PaymentServiceProviderLinkInfo {
  /** The business country of the merchant account as identified by the third party service provider. */
  externalAccountBusinessCountry?: string;
  /** The id used by the third party service provider to identify the merchant. */
  externalAccountId?: string;
}

export const PaymentServiceProviderLinkInfo: Schema.Schema<PaymentServiceProviderLinkInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      externalAccountBusinessCountry: Schema.optional(Schema.String),
      externalAccountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PaymentServiceProviderLinkInfo",
  }) as any as Schema.Schema<PaymentServiceProviderLinkInfo>;

export interface ECommercePlatformLinkInfo {
  /** The id used by the third party service provider to identify the merchant. */
  externalAccountId?: string;
}

export const ECommercePlatformLinkInfo: Schema.Schema<ECommercePlatformLinkInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      externalAccountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ECommercePlatformLinkInfo",
  }) as any as Schema.Schema<ECommercePlatformLinkInfo>;

export interface AccountsLinkRequest {
  /** Type of the link between the two accounts. Acceptable values are: - "`channelPartner`" - "`eCommercePlatform`" - "`paymentServiceProvider`" */
  linkType?: string;
  /** Acceptable values are: - "`shoppingAdsProductManagement`" - "`shoppingActionsProductManagement`" - "`shoppingActionsOrderManagement`" - "`paymentProcessing`" */
  services?: Array<string>;
  /** Action to perform for this link. The `"request"` action is only available to select merchants. Acceptable values are: - "`approve`" - "`remove`" - "`request`" */
  action?: string;
  /** The ID of the linked account. */
  linkedAccountId?: string;
  /** Additional information required for `paymentServiceProvider` link type. */
  paymentServiceProviderLinkInfo?: PaymentServiceProviderLinkInfo;
  /** Additional information required for `eCommercePlatform` link type. */
  eCommercePlatformLinkInfo?: ECommercePlatformLinkInfo;
}

export const AccountsLinkRequest: Schema.Schema<AccountsLinkRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      linkType: Schema.optional(Schema.String),
      services: Schema.optional(Schema.Array(Schema.String)),
      action: Schema.optional(Schema.String),
      linkedAccountId: Schema.optional(Schema.String),
      paymentServiceProviderLinkInfo: Schema.optional(
        PaymentServiceProviderLinkInfo,
      ),
      eCommercePlatformLinkInfo: Schema.optional(ECommercePlatformLinkInfo),
    }),
  ).annotate({
    identifier: "AccountsLinkRequest",
  }) as any as Schema.Schema<AccountsLinkRequest>;

export interface BestSellers {
  /** Report date. The value of this field can only be one of the following: * The first day of the week (Monday) for weekly reports. * The first day of the month for monthly reports. If a `WHERE` condition on `best_sellers.report_date` is not specified in the query, the latest available weekly or monthly report is returned. */
  reportDate?: Content_Date;
  /** Estimated demand in relation to the item with the highest popularity rank in the same category and country in the previous week or month. */
  previousRelativeDemand?:
    | "RELATIVE_DEMAND_UNSPECIFIED"
    | "VERY_LOW"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "VERY_HIGH"
    | (string & {});
  /** Estimated demand in relation to the item with the highest popularity rank in the same category and country. */
  relativeDemand?:
    | "RELATIVE_DEMAND_UNSPECIFIED"
    | "VERY_LOW"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "VERY_HIGH"
    | (string & {});
  /** Country where the ranking is calculated. A `WHERE` condition on `best_sellers.country_code` is required in the query. */
  countryCode?: string;
  /** Popularity rank in the previous week or month. */
  previousRank?: string;
  /** Change in the estimated demand. Whether it rose, sank or remained flat. */
  relativeDemandChange?:
    | "RELATIVE_DEMAND_CHANGE_TYPE_UNSPECIFIED"
    | "SINKER"
    | "FLAT"
    | "RISER"
    | (string & {});
  /** Google product category ID to calculate the ranking for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). If a `WHERE` condition on `best_sellers.category_id` is not specified in the query, rankings for all top-level categories are returned. */
  categoryId?: string;
  /** Granularity of the report. The ranking can be done over a week or a month timeframe. A `WHERE` condition on `best_sellers.report_granularity` is required in the query. */
  reportGranularity?:
    | "REPORT_GRANULARITY_UNSPECIFIED"
    | "WEEKLY"
    | "MONTHLY"
    | (string & {});
  /** Popularity on Shopping ads and free listings, in the selected category and country, based on the estimated number of units sold. */
  rank?: string;
}

export const BestSellers: Schema.Schema<BestSellers> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reportDate: Schema.optional(Content_Date),
      previousRelativeDemand: Schema.optional(Schema.String),
      relativeDemand: Schema.optional(Schema.String),
      countryCode: Schema.optional(Schema.String),
      previousRank: Schema.optional(Schema.String),
      relativeDemandChange: Schema.optional(Schema.String),
      categoryId: Schema.optional(Schema.String),
      reportGranularity: Schema.optional(Schema.String),
      rank: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BestSellers",
  }) as any as Schema.Schema<BestSellers>;

export interface SearchRequest {
  /** Required. Query that defines performance metrics to retrieve and dimensions according to which the metrics are to be segmented. For details on how to construct your query, see the [Query Language guide](https://developers.google.com/shopping-content/guides/reports/query-language/overview). */
  query?: string;
  /** Number of ReportRows to retrieve in a single page. Defaults to 1000. Values above 5000 are coerced to 5000. */
  pageSize?: number;
  /** Token of the page to retrieve. If not specified, the first page of results is returned. In order to request the next page of results, the value obtained from `next_page_token` in the previous response should be used. */
  pageToken?: string;
}

export const SearchRequest: Schema.Schema<SearchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      query: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchRequest",
  }) as any as Schema.Schema<SearchRequest>;

export interface BreakdownRegion {
  /** The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) */
  code?: string;
  /** The localized name of the region. For region with code='001' the value is 'All countries' or the equivalent in other languages. */
  name?: string;
}

export const BreakdownRegion: Schema.Schema<BreakdownRegion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BreakdownRegion",
  }) as any as Schema.Schema<BreakdownRegion>;

export interface Breakdown {
  /** Lists of regions. Should be rendered as a title for this group of details. The full list should be shown to merchant. If the list is too long, it is recommended to make it expandable. */
  regions?: Array<BreakdownRegion>;
  /** Human readable, localized description of issue's effect on different targets. Should be rendered as a list. For example: * "Products not showing in ads" * "Products not showing organically" */
  details?: Array<string>;
}

export const Breakdown: Schema.Schema<Breakdown> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(Schema.Array(BreakdownRegion)),
      details: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Breakdown" }) as any as Schema.Schema<Breakdown>;

export interface RequestPhoneVerificationRequest {
  /** Phone number to be verified. */
  phoneNumber?: string;
  /** Verification method to receive verification code. */
  phoneVerificationMethod?:
    | "PHONE_VERIFICATION_METHOD_UNSPECIFIED"
    | "SMS"
    | "PHONE_CALL"
    | (string & {});
  /** Required. Two letter country code for the phone number, for example `CA` for Canadian numbers. See the [ISO 3166-1 alpha-2](https://wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) officially assigned codes. */
  phoneRegionCode?: string;
  /** Language code [IETF BCP 47 syntax](https://tools.ietf.org/html/bcp47) (for example, en-US). Language code is used to provide localized `SMS` and `PHONE_CALL`. Default language used is en-US if not provided. */
  languageCode?: string;
}

export const RequestPhoneVerificationRequest: Schema.Schema<RequestPhoneVerificationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
      phoneVerificationMethod: Schema.optional(Schema.String),
      phoneRegionCode: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RequestPhoneVerificationRequest",
  }) as any as Schema.Schema<RequestPhoneVerificationRequest>;

export interface InputFieldCheckboxInput {}

export const InputFieldCheckboxInput: Schema.Schema<InputFieldCheckboxInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "InputFieldCheckboxInput",
  }) as any as Schema.Schema<InputFieldCheckboxInput>;

export interface InputFieldChoiceInputChoiceInputOption {
  /** Input that should be displayed when this option is selected. The additional input will not contain a `ChoiceInput`. */
  additionalInput?: InputField;
  /** Not for display but need to be sent back for the selected choice option. */
  id?: string;
  /** Short description of the choice option. There may be more information to be shown as a tooltip. */
  label?: TextWithTooltip;
}

export const InputFieldChoiceInputChoiceInputOption: Schema.Schema<InputFieldChoiceInputChoiceInputOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      additionalInput: Schema.optional(InputField),
      id: Schema.optional(Schema.String),
      label: Schema.optional(TextWithTooltip),
    }),
  ).annotate({
    identifier: "InputFieldChoiceInputChoiceInputOption",
  }) as any as Schema.Schema<InputFieldChoiceInputChoiceInputOption>;

export interface InputFieldChoiceInput {
  /** A list of choices. Only one option can be selected. */
  options?: Array<InputFieldChoiceInputChoiceInputOption>;
}

export const InputFieldChoiceInput: Schema.Schema<InputFieldChoiceInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(
        Schema.Array(InputFieldChoiceInputChoiceInputOption),
      ),
    }),
  ).annotate({
    identifier: "InputFieldChoiceInput",
  }) as any as Schema.Schema<InputFieldChoiceInput>;

export interface InputField {
  /** Input field label. There may be more information to be shown in a tooltip. */
  label?: TextWithTooltip;
  /** Not for display but need to be sent back for the given input field. */
  id?: string;
  /** Input field to provide text information. Corresponds to the [html input type=text](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.text.html#input.text) or [html textarea](https://www.w3.org/TR/2012/WD-html-markup-20121025/textarea.html#textarea). */
  textInput?: InputFieldTextInput;
  /** Whether the field is required. The action button needs to stay disabled till values for all required fields are provided. */
  required?: boolean;
  /** Input field to select one of the offered choices. Corresponds to the [html input type=radio](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.radio.html#input.radio). */
  choiceInput?: InputFieldChoiceInput;
  /** Input field to provide a boolean value. Corresponds to the [html input type=checkbox](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.checkbox.html#input.checkbox). */
  checkboxInput?: InputFieldCheckboxInput;
}

export const InputField: Schema.Schema<InputField> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      label: Schema.optional(TextWithTooltip),
      id: Schema.optional(Schema.String),
      textInput: Schema.optional(InputFieldTextInput),
      required: Schema.optional(Schema.Boolean),
      choiceInput: Schema.optional(InputFieldChoiceInput),
      checkboxInput: Schema.optional(InputFieldCheckboxInput),
    }),
  ).annotate({ identifier: "InputField" }) as any as Schema.Schema<InputField>;

export interface Callout {
  /** Can be used to render messages with different severity in different styles. Snippets off all types contain important information that should be displayed to merchants. */
  styleHint?:
    | "CALLOUT_STYLE_HINT_UNSPECIFIED"
    | "ERROR"
    | "WARNING"
    | "INFO"
    | (string & {});
  /** A full message that needs to be shown to the merchant. */
  fullMessage?: TextWithTooltip;
}

export const Callout: Schema.Schema<Callout> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      styleHint: Schema.optional(Schema.String),
      fullMessage: Schema.optional(TextWithTooltip),
    }),
  ).annotate({ identifier: "Callout" }) as any as Schema.Schema<Callout>;

export interface ActionFlow {
  /** A list of input fields. */
  inputs?: Array<InputField>;
  /** Label for the button to trigger the action from the action dialog. For example: "Request review" */
  dialogButtonLabel?: string;
  /** Message displayed in the request dialog. For example: "Make sure you've fixed all your country-specific issues. If not, you may have to wait 7 days to request another review". There may be an more information to be shown in a tooltip. */
  dialogMessage?: TextWithTooltip;
  /** Important message to be highlighted in the request dialog. For example: "You can only request a review for disagreeing with this issue once. If it's not approved, you'll need to fix the issue and wait a few days before you can request another review." */
  dialogCallout?: Callout;
  /** Text value describing the intent for the action flow. It can be used as an input label if merchant needs to pick one of multiple flows. For example: "I disagree with the issue" */
  label?: string;
  /** Title of the request dialog. For example: "Before you request a review" */
  dialogTitle?: string;
  /** Not for display but need to be sent back for the selected action flow. */
  id?: string;
}

export const ActionFlow: Schema.Schema<ActionFlow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputs: Schema.optional(Schema.Array(InputField)),
      dialogButtonLabel: Schema.optional(Schema.String),
      dialogMessage: Schema.optional(TextWithTooltip),
      dialogCallout: Schema.optional(Callout),
      label: Schema.optional(Schema.String),
      dialogTitle: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ActionFlow" }) as any as Schema.Schema<ActionFlow>;

export interface BuiltInUserInputAction {
  /** Internal details. Not for display but need to be sent back when triggering the action. */
  actionContext?: string;
  /** Actions may provide multiple different flows. Merchant selects one that fits best to their intent. Selecting the flow is the first step in user's interaction with the action. It affects what input fields will be available and required and also how the request will be processed. */
  flows?: Array<ActionFlow>;
}

export const BuiltInUserInputAction: Schema.Schema<BuiltInUserInputAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionContext: Schema.optional(Schema.String),
      flows: Schema.optional(Schema.Array(ActionFlow)),
    }),
  ).annotate({
    identifier: "BuiltInUserInputAction",
  }) as any as Schema.Schema<BuiltInUserInputAction>;

export interface BuiltInSimpleActionAdditionalContent {
  /** Title of the additional content; */
  title?: string;
  /** Long text organized into paragraphs. */
  paragraphs?: Array<string>;
}

export const BuiltInSimpleActionAdditionalContent: Schema.Schema<BuiltInSimpleActionAdditionalContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      paragraphs: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BuiltInSimpleActionAdditionalContent",
  }) as any as Schema.Schema<BuiltInSimpleActionAdditionalContent>;

export interface BuiltInSimpleAction {
  /** The attribute that needs to be updated. Present when the type is `EDIT_ITEM_ATTRIBUTE`. This field contains a code for attribute, represented in snake_case. You can find a list of product's attributes, with their codes [here](https://support.google.com/merchants/answer/7052112). */
  attributeCode?: string;
  /** Long text from an external source that should be available to the merchant. Present when the type is `SHOW_ADDITIONAL_CONTENT`. */
  additionalContent?: BuiltInSimpleActionAdditionalContent;
  /** The type of action that represents a functionality that is expected to be available in third-party application. */
  type?:
    | "BUILT_IN_SIMPLE_ACTION_TYPE_UNSPECIFIED"
    | "VERIFY_PHONE"
    | "CLAIM_WEBSITE"
    | "ADD_PRODUCTS"
    | "ADD_CONTACT_INFO"
    | "LINK_ADS_ACCOUNT"
    | "ADD_BUSINESS_REGISTRATION_NUMBER"
    | "EDIT_ITEM_ATTRIBUTE"
    | "FIX_ACCOUNT_ISSUE"
    | "SHOW_ADDITIONAL_CONTENT"
    | (string & {});
}

export const BuiltInSimpleAction: Schema.Schema<BuiltInSimpleAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attributeCode: Schema.optional(Schema.String),
      additionalContent: Schema.optional(BuiltInSimpleActionAdditionalContent),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BuiltInSimpleAction",
  }) as any as Schema.Schema<BuiltInSimpleAction>;

export interface ActionReason {
  /** Messages summarizing the reason, why the action is not available. For example: "Review requested on Jan 03. Review requests can take a few days to complete." */
  message?: string;
  /** Detailed explanation of the reason. Should be displayed as a hint if present. */
  detail?: string;
  /** Optional. An action that needs to be performed to solve the problem represented by this reason. This action will always be available. Should be rendered as a link or button next to the summarizing message. For example, the review may be available only once merchant configure all required attributes. In such a situation this action can be a link to the form, where they can fill the missing attribute to unblock the main action. */
  action?: Action;
}

export const ActionReason: Schema.Schema<ActionReason> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      action: Schema.optional(Action),
    }),
  ).annotate({
    identifier: "ActionReason",
  }) as any as Schema.Schema<ActionReason>;

export interface ExternalAction {
  /** URL to external system, for example Merchant Center, where the merchant can perform the action. */
  uri?: string;
  /** The type of external action. */
  type?:
    | "EXTERNAL_ACTION_TYPE_UNSPECIFIED"
    | "REVIEW_PRODUCT_ISSUE_IN_MERCHANT_CENTER"
    | "REVIEW_ACCOUNT_ISSUE_IN_MERCHANT_CENTER"
    | "LEGAL_APPEAL_IN_HELP_CENTER"
    | "VERIFY_IDENTITY_IN_MERCHANT_CENTER"
    | (string & {});
}

export const ExternalAction: Schema.Schema<ExternalAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExternalAction",
  }) as any as Schema.Schema<ExternalAction>;

export interface Action {
  /** Action implemented and performed in (your) third-party application. The application needs to show an additional content and input form to the merchant as specified for given action. They can trigger the action only when they provided all required inputs. */
  builtinUserInputAction?: BuiltInUserInputAction;
  /** Action implemented and performed in (your) third-party application. The application should point the merchant to the place, where they can access the corresponding functionality or provide instructions, if the specific functionality is not available. */
  builtinSimpleAction?: BuiltInSimpleAction;
  /** List of reasons why the action is not available. The list of reasons is empty if the action is available. If there is only one reason, it can be displayed next to the disabled button. If there are more reasons, all of them should be displayed, for example in a pop-up dialog. */
  reasons?: Array<ActionReason>;
  /** Controlling whether the button is active or disabled. The value is 'false' when the action was already requested or is not available. If the action is not available then a reason will be present. If (your) third-party application shows a disabled button for action that is not available, then it should also show reasons. */
  isAvailable?: boolean;
  /** Action that is implemented and performed outside of (your) third-party application. The application needs to redirect the merchant to the external location where they can perform the action. */
  externalAction?: ExternalAction;
  /** Label of the action button. */
  buttonLabel?: string;
}

export const Action: Schema.Schema<Action> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      builtinUserInputAction: Schema.optional(BuiltInUserInputAction),
      builtinSimpleAction: Schema.optional(BuiltInSimpleAction),
      reasons: Schema.optional(Schema.Array(ActionReason)),
      isAvailable: Schema.optional(Schema.Boolean),
      externalAction: Schema.optional(ExternalAction),
      buttonLabel: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface ProductIssueImpact {
  /** Optional. Message summarizing the overall impact of the issue. If present, it should be rendered to the merchant. For example: "Limits visibility in France" */
  message?: string;
  /** Detailed impact breakdown. Explains the types of restriction the issue has in different shopping destinations and territory. If present, it should be rendered to the merchant. Can be shown as a mouse over dropdown or a dialog. Each breakdown item represents a group of regions with the same impact details. */
  breakdowns?: Array<Breakdown>;
  /** The severity of the issue. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "ERROR"
    | "WARNING"
    | "INFO"
    | (string & {});
}

export const ProductIssueImpact: Schema.Schema<ProductIssueImpact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      breakdowns: Schema.optional(Schema.Array(Breakdown)),
      severity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductIssueImpact",
  }) as any as Schema.Schema<ProductIssueImpact>;

export interface ProductIssue {
  /** Title of the issue. */
  title?: string;
  /** A list of actionable steps that can be executed to solve the issue. An example is requesting a re-review or providing arguments when merchant disagrees with the issue. Actions that are supported in (your) third-party application can be rendered as buttons and should be available to merchant when they expand the issue. */
  actions?: Array<Action>;
  /** Details of the issue as a pre-rendered HTML. HTML elements contain CSS classes that can be used to customize the style of the content. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `issue-detail` - top level container for the detail of the issue * `callout-banners` - section of the `issue-detail` with callout banners * `callout-banner` - single callout banner, inside `callout-banners` * `callout-banner-info` - callout with important information (default) * `callout-banner-warning` - callout with a warning * `callout-banner-error` - callout informing about an error (most severe) * `issue-content` - section of the `issue-detail`, contains multiple `content-element` * `content-element` - content element such as a list, link or paragraph, inside `issue-content` * `root-causes` - unordered list with items describing root causes of the issue, inside `issue-content` * `root-causes-intro` - intro text before the `root-causes` list, inside `issue-content` * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. * `content-moderation` - marks the paragraph that explains how the issue was identified. * `list-intro` - marks the paragraph that contains an intro for a list. This paragraph will be always followed by a list. * `new-element` - Present for new elements added to the pre-rendered content in the future. To make sure that a new content element does not break your style, you can hide everything with this class. */
  prerenderedContent?: string;
  /** Pre-rendered HTML that contains a link to the external location where the ODS can be requested and instructions for how to request it. HTML elements contain CSS classes that can be used to customize the style of this snippet. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `ods-section`* - wrapper around the out-of-court dispute resolution section * `ods-description`* - intro text for the out-of-court dispute resolution. It may contain multiple segments and a link. * `ods-param`* - wrapper around the header-value pair for parameters that merchant may need to provide during the ODS process. * `ods-routing-id`* - ods param for the Routing ID. * `ods-reference-id`* - ods param for the Routing ID. * `ods-param-header`* - header for the ODS parameter * `ods-param-value`* - value of the ODS parameter. This value should be rendered in a way that it is easy for merchants to identify and copy. * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. */
  prerenderedOutOfCourtDisputeSettlement?: string;
  /** Clarifies the severity of the issue. The summarizing message, if present, should be shown right under the title for each issue. It helps merchants to quickly understand the impact of the issue. The detailed breakdown helps the merchant to fully understand the impact of the issue. It can be rendered as dialog that opens when the merchant mouse over the summarized impact statement. Issues with different severity can be styled differently. They may use a different color or icon to signal the difference between `ERROR`, `WARNING` and `INFO`. */
  impact?: ProductIssueImpact;
}

export const ProductIssue: Schema.Schema<ProductIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      actions: Schema.optional(Schema.Array(Action)),
      prerenderedContent: Schema.optional(Schema.String),
      prerenderedOutOfCourtDisputeSettlement: Schema.optional(Schema.String),
      impact: Schema.optional(ProductIssueImpact),
    }),
  ).annotate({
    identifier: "ProductIssue",
  }) as any as Schema.Schema<ProductIssue>;

export interface GoogleAnalyticsLink {
  /** Required. Immutable. ID of the Google Analytics property the merchant is linked to. */
  propertyId?: string;
  /** Output only. Name of the Google Analytics property the merchant is linked to. */
  propertyName?: string;
  /** Output only. Attribution settings for the linked Google Analytics property. */
  attributionSettings?: AttributionSettings;
}

export const GoogleAnalyticsLink: Schema.Schema<GoogleAnalyticsLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      propertyId: Schema.optional(Schema.String),
      propertyName: Schema.optional(Schema.String),
      attributionSettings: Schema.optional(AttributionSettings),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsLink",
  }) as any as Schema.Schema<GoogleAnalyticsLink>;

export interface ConversionSource {
  /** Conversion Source of type "Merchant Center Tag Destination". */
  merchantCenterDestination?: MerchantCenterDestination;
  /** Output only. The time when an archived conversion source becomes permanently deleted and is no longer available to undelete. */
  expireTime?: string;
  /** Output only. Current state of this conversion source. Can't be edited through the API. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "ARCHIVED"
    | "PENDING"
    | (string & {});
  /** Immutable. Conversion Source of type "Link to Google Analytics Property". */
  googleAnalyticsLink?: GoogleAnalyticsLink;
  /** Output only. Generated by the Content API upon creation of a new `ConversionSource`. Format: [a-z]{4}:.+ The four characters before the colon represent the type of conversio source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: - galk: For GoogleAnalyticsLink sources. - mcdn: For MerchantCenterDestination sources. */
  conversionSourceId?: string;
}

export const ConversionSource: Schema.Schema<ConversionSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      merchantCenterDestination: Schema.optional(MerchantCenterDestination),
      expireTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      googleAnalyticsLink: Schema.optional(GoogleAnalyticsLink),
      conversionSourceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConversionSource",
  }) as any as Schema.Schema<ConversionSource>;

export interface ListConversionSourcesResponse {
  /** Token to be used to fetch the next results page. */
  nextPageToken?: string;
  /** List of conversion sources. */
  conversionSources?: Array<ConversionSource>;
}

export const ListConversionSourcesResponse: Schema.Schema<ListConversionSourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      conversionSources: Schema.optional(Schema.Array(ConversionSource)),
    }),
  ).annotate({
    identifier: "ListConversionSourcesResponse",
  }) as any as Schema.Schema<ListConversionSourcesResponse>;

export interface ShoppingAdsProgramStatusReviewIneligibilityReasonDetails {
  /** This timestamp represents end of cooldown period for review ineligbility reason `IN_COOLDOWN_PERIOD`. */
  cooldownTime?: string;
}

export const ShoppingAdsProgramStatusReviewIneligibilityReasonDetails: Schema.Schema<ShoppingAdsProgramStatusReviewIneligibilityReasonDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cooldownTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShoppingAdsProgramStatusReviewIneligibilityReasonDetails",
  }) as any as Schema.Schema<ShoppingAdsProgramStatusReviewIneligibilityReasonDetails>;

export interface ShoppingAdsProgramStatusRegionStatus {
  /** Review ineligibility reason if account is not eligible for review. */
  reviewIneligibilityReason?:
    | "REVIEW_INELIGIBILITY_REASON_UNSPECIFIED"
    | "ONBOARDING_ISSUES"
    | "NOT_ENOUGH_OFFERS"
    | "IN_COOLDOWN_PERIOD"
    | "ALREADY_UNDER_REVIEW"
    | "NO_REVIEW_REQUIRED"
    | "WILL_BE_REVIEWED_AUTOMATICALLY"
    | "IS_RETIRED"
    | "ALREADY_REVIEWED"
    | (string & {});
  /** Reason a program in a specific region isn’t eligible for review. Only visible if `reviewEligibilityStatus` is `INELIGIBLE`. */
  reviewIneligibilityReasonDescription?: string;
  /** Issues that must be fixed to be eligible for review. */
  onboardingIssues?: Array<string>;
  /** Date by which eligibilityStatus will go from `WARNING` to `DISAPPROVED`. Only visible when your eligibilityStatus is WARNING. In [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DD`. */
  disapprovalDate?: string;
  /** If a program is eligible for review in a specific region. Only visible if `eligibilityStatus` is `DISAPPROVED`. */
  reviewEligibilityStatus?:
    | "REVIEW_ELIGIBILITY_UNSPECIFIED"
    | "ELIGIBLE"
    | "INELIGIBLE"
    | (string & {});
  /** Eligibility status of the Shopping Ads program. */
  eligibilityStatus?:
    | "STATE_UNSPECIFIED"
    | "APPROVED"
    | "DISAPPROVED"
    | "WARNING"
    | "UNDER_REVIEW"
    | "PENDING_REVIEW"
    | "ONBOARDING"
    | (string & {});
  /** Additional information for ineligibility. If `reviewIneligibilityReason` is `IN_COOLDOWN_PERIOD`, a timestamp for the end of the cooldown period is provided. */
  reviewIneligibilityReasonDetails?: ShoppingAdsProgramStatusReviewIneligibilityReasonDetails;
  /** Issues evaluated in the review process. Fix all issues before requesting a review. */
  reviewIssues?: Array<string>;
  /** The two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for all the regions with the same `eligibilityStatus` and `reviewEligibility`. */
  regionCodes?: Array<string>;
}

export const ShoppingAdsProgramStatusRegionStatus: Schema.Schema<ShoppingAdsProgramStatusRegionStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reviewIneligibilityReason: Schema.optional(Schema.String),
      reviewIneligibilityReasonDescription: Schema.optional(Schema.String),
      onboardingIssues: Schema.optional(Schema.Array(Schema.String)),
      disapprovalDate: Schema.optional(Schema.String),
      reviewEligibilityStatus: Schema.optional(Schema.String),
      eligibilityStatus: Schema.optional(Schema.String),
      reviewIneligibilityReasonDetails: Schema.optional(
        ShoppingAdsProgramStatusReviewIneligibilityReasonDetails,
      ),
      reviewIssues: Schema.optional(Schema.Array(Schema.String)),
      regionCodes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ShoppingAdsProgramStatusRegionStatus",
  }) as any as Schema.Schema<ShoppingAdsProgramStatusRegionStatus>;

export interface CompetitiveVisibility {
  /** Higher position rate shows how often a competitor’s offer got placed in a higher position on the page than your offer. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  higherPositionRate?: number;
  /** True if this row contains data for your domain. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  isYourDomain?: boolean;
  /** [Ads / organic ratio] (https://support.google.com/merchants/answer/11366442#zippy=%2Cadsfree-ratio) shows how often a merchant receives impressions from Shopping ads compared to organic traffic. The number is rounded and bucketed. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  adsOrganicRatio?: number;
  /** Type of impression listing. Required in the `SELECT` clause. Cannot be filtered on in the 'WHERE' clause. */
  trafficSource?: "UNKNOWN" | "ORGANIC" | "ADS" | "ALL" | (string & {});
  /** Page overlap rate describes how frequently competing retailers’ offers are shown together with your offers on the same page. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  pageOverlapRate?: number;
  /** Google product category ID to calculate the report for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. A `WHERE` condition on `competitive_visibility.category_id` is required in the query. */
  categoryId?: string;
  /** Date of this row. Available only in `CompetitiveVisibilityBenchmarkView` and `CompetitiveVisibilityCompetitorView`. Required in the `SELECT` clause for `CompetitiveVisibilityMarketBenchmarkView`. */
  date?: Content_Date;
  /** Change in visibility based on impressions for your domain with respect to the start of the selected time range (or first day with non-zero impressions). Available only in `CompetitiveVisibilityBenchmarkView`. Cannot be filtered on in the 'WHERE' clause. */
  yourDomainVisibilityTrend?: number;
  /** Relative visibility shows how often your competitors’ offers are shown compared to your offers. In other words, this is the number of displayed impressions of a competitor retailer divided by the number of your displayed impressions during a selected time range for a selected product category and country. Available only in `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  relativeVisibility?: number;
  /** Domain of your competitor or your domain, if 'is_your_domain' is true. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Required in the `SELECT` clause for `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  domain?: string;
  /** The country where impression appeared. Required in the `SELECT` clause. A `WHERE` condition on `competitive_visibility.country_code` is required in the query. */
  countryCode?: string;
  /** Change in visibility based on impressions with respect to the start of the selected time range (or first day with non-zero impressions) for a combined set of merchants with highest visibility approximating the market. Available only in `CompetitiveVisibilityBenchmarkView`. Cannot be filtered on in the 'WHERE' clause. */
  categoryBenchmarkVisibilityTrend?: number;
  /** Position of the domain in the top merchants ranking for the selected keys (`date`, `category_id`, `country_code`, `listing_type`) based on impressions. 1 is the highest. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  rank?: string;
}

export const CompetitiveVisibility: Schema.Schema<CompetitiveVisibility> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      higherPositionRate: Schema.optional(Schema.Number),
      isYourDomain: Schema.optional(Schema.Boolean),
      adsOrganicRatio: Schema.optional(Schema.Number),
      trafficSource: Schema.optional(Schema.String),
      pageOverlapRate: Schema.optional(Schema.Number),
      categoryId: Schema.optional(Schema.String),
      date: Schema.optional(Content_Date),
      yourDomainVisibilityTrend: Schema.optional(Schema.Number),
      relativeVisibility: Schema.optional(Schema.Number),
      domain: Schema.optional(Schema.String),
      countryCode: Schema.optional(Schema.String),
      categoryBenchmarkVisibilityTrend: Schema.optional(Schema.Number),
      rank: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompetitiveVisibility",
  }) as any as Schema.Schema<CompetitiveVisibility>;

export interface CheckoutSettings {
  /** The effective value of `url_settings` for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account. */
  effectiveUriSettings?: UrlSettings;
  /** Required. The ID of the account. */
  merchantId?: string;
  /** URL settings for cart or checkout URL. */
  uriSettings?: UrlSettings;
  /** Output only. The effective value of enrollment state for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account. */
  effectiveEnrollmentState?:
    | "CHECKOUT_ON_MERCHANT_ENROLLMENT_STATE_UNSPECIFIED"
    | "INACTIVE"
    | "ENROLLED"
    | "OPT_OUT"
    | (string & {});
  /** Output only. Reflects the merchant review state in `Checkout` feature. This is set based on the data quality reviews of the URL provided by the merchant. A merchant with enrollment state as `ENROLLED` can be in the following review states: `IN_REVIEW`, `APPROVED` or `DISAPPROVED`. A merchant must be in an enrollment_state of `ENROLLED` before a review can begin for the merchant. */
  reviewState?:
    | "CHECKOUT_ON_MERCHANT_REVIEW_STATE_UNSPECIFIED"
    | "IN_REVIEW"
    | "APPROVED"
    | "DISAPPROVED"
    | (string & {});
  /** Output only. The effective value of review state for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account. */
  effectiveReviewState?:
    | "CHECKOUT_ON_MERCHANT_REVIEW_STATE_UNSPECIFIED"
    | "IN_REVIEW"
    | "APPROVED"
    | "DISAPPROVED"
    | (string & {});
  /** Output only. Reflects the merchant enrollment state in `Checkout` feature. */
  enrollmentState?:
    | "CHECKOUT_ON_MERCHANT_ENROLLMENT_STATE_UNSPECIFIED"
    | "INACTIVE"
    | "ENROLLED"
    | "OPT_OUT"
    | (string & {});
}

export const CheckoutSettings: Schema.Schema<CheckoutSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      effectiveUriSettings: Schema.optional(UrlSettings),
      merchantId: Schema.optional(Schema.String),
      uriSettings: Schema.optional(UrlSettings),
      effectiveEnrollmentState: Schema.optional(Schema.String),
      reviewState: Schema.optional(Schema.String),
      effectiveReviewState: Schema.optional(Schema.String),
      enrollmentState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CheckoutSettings",
  }) as any as Schema.Schema<CheckoutSettings>;

export interface DatafeedstatusesListResponse {
  /** The token for the retrieval of the next page of datafeed statuses. */
  nextPageToken?: string;
  resources?: Array<DatafeedStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedstatusesListResponse`". */
  kind?: string;
}

export const DatafeedstatusesListResponse: Schema.Schema<DatafeedstatusesListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(DatafeedStatus)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedstatusesListResponse",
  }) as any as Schema.Schema<DatafeedstatusesListResponse>;

export interface AccountIssueImpact {
  /** The severity of the issue. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "ERROR"
    | "WARNING"
    | "INFO"
    | (string & {});
  /** Optional. Message summarizing the overall impact of the issue. If present, it should be rendered to the merchant. For example: "Disapproves 90k offers in 25 countries" */
  message?: string;
  /** Detailed impact breakdown. Explains the types of restriction the issue has in different shopping destinations and territory. If present, it should be rendered to the merchant. Can be shown as a mouse over dropdown or a dialog. Each breakdown item represents a group of regions with the same impact details. */
  breakdowns?: Array<Breakdown>;
}

export const AccountIssueImpact: Schema.Schema<AccountIssueImpact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      severity: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
      breakdowns: Schema.optional(Schema.Array(Breakdown)),
    }),
  ).annotate({
    identifier: "AccountIssueImpact",
  }) as any as Schema.Schema<AccountIssueImpact>;

export interface LocalInventory {
  /** The supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the local product inventory feed specification. */
  pickupMethod?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#localInventory`" */
  kind?: string;
  /** The availability of the product. For accepted attribute values, see the local product inventory feed specification. */
  availability?: string;
  /** The expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the local product inventory feed specification. */
  pickupSla?: string;
  /** A date range represented by a pair of ISO 8601 dates separated by a space, comma, or slash. Both dates may be specified as 'null' if undecided. */
  salePriceEffectiveDate?: string;
  /** The in-store product location. */
  instoreProductLocation?: string;
  /** A list of custom (merchant-provided) attributes. Can also be used to submit any attribute of the feed specification in its generic form, for example, `{ "name": "size type", "value": "regular" }`. */
  customAttributes?: Array<CustomAttribute>;
  /** The price of the product. */
  price?: Price;
  /** The sale price of the product. Mandatory if `sale_price_effective_date` is defined. */
  salePrice?: Price;
  /** The quantity of the product. Must be nonnegative. */
  quantity?: number;
  /** Required. The store code of this local inventory resource. */
  storeCode?: string;
}

export const LocalInventory: Schema.Schema<LocalInventory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pickupMethod: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      availability: Schema.optional(Schema.String),
      pickupSla: Schema.optional(Schema.String),
      salePriceEffectiveDate: Schema.optional(Schema.String),
      instoreProductLocation: Schema.optional(Schema.String),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
      price: Schema.optional(Price),
      salePrice: Schema.optional(Price),
      quantity: Schema.optional(Schema.Number),
      storeCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocalInventory",
  }) as any as Schema.Schema<LocalInventory>;

export interface LocalinventoryCustomBatchRequestEntry {
  /** Method of the batch request entry. Acceptable values are: - "`insert`" */
  method?: string;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** Local inventory of the product. */
  localInventory?: LocalInventory;
  /** The ID of the product for which to update local inventory. */
  productId?: string;
}

export const LocalinventoryCustomBatchRequestEntry: Schema.Schema<LocalinventoryCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      localInventory: Schema.optional(LocalInventory),
      productId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocalinventoryCustomBatchRequestEntry",
  }) as any as Schema.Schema<LocalinventoryCustomBatchRequestEntry>;

export interface AccountAdsLink {
  /** Customer ID of the Ads account. */
  adsId?: string;
  /** Status of the link between this Merchant Center account and the Ads account. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in Google Ads or `pending` if it's pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it's still pending or with status `pending` when it's already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending. Acceptable values are: - "`active`" - "`pending`" */
  status?: string;
}

export const AccountAdsLink: Schema.Schema<AccountAdsLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adsId: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountAdsLink",
  }) as any as Schema.Schema<AccountAdsLink>;

export interface AccountConversionSettings {
  /** When enabled, free listing URLs have a parameter to enable conversion tracking for products owned by the current merchant account. See [auto-tagging](https://support.google.com/merchants/answer/11127659). */
  freeListingsAutoTaggingEnabled?: boolean;
}

export const AccountConversionSettings: Schema.Schema<AccountConversionSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      freeListingsAutoTaggingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountConversionSettings",
  }) as any as Schema.Schema<AccountConversionSettings>;

export interface ProductUnitPricingBaseMeasure {
  /** The denominator of the unit price. */
  value?: string;
  /** The unit of the denominator. */
  unit?: string;
}

export const ProductUnitPricingBaseMeasure: Schema.Schema<ProductUnitPricingBaseMeasure> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductUnitPricingBaseMeasure",
  }) as any as Schema.Schema<ProductUnitPricingBaseMeasure>;

export interface AccountYouTubeChannelLink {
  /** Channel ID. */
  channelId?: string;
  /** Status of the link between this Merchant Center account and the YouTube channel. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in YT Creator Studio or `pending` if it's pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it's still pending or with status `pending` when it's already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending. */
  status?: string;
}

export const AccountYouTubeChannelLink: Schema.Schema<AccountYouTubeChannelLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelId: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountYouTubeChannelLink",
  }) as any as Schema.Schema<AccountYouTubeChannelLink>;

export interface AccountBusinessIdentity {
  /** Required. By setting this field, your business may be included in promotions for all the selected attributes. If you clear this option, it won't affect your identification with any of the attributes. For this field to be set, the merchant must self identify with at least one of the `AccountIdentityType`. If none are included, the request will be considered invalid. */
  includeForPromotions?: boolean;
  /** Specifies whether the business identifies itself as being latino-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  latinoOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as a small business. This optional field is only available for merchants with a business country set to "US". It is also not allowed for marketplaces, but it is allowed to marketplace sellers. */
  smallBusiness?: AccountIdentityType;
  /** Specifies whether the business identifies itself as being black-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  blackOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as being veteran-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  veteranOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as being women-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  womenOwned?: AccountIdentityType;
}

export const AccountBusinessIdentity: Schema.Schema<AccountBusinessIdentity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      includeForPromotions: Schema.optional(Schema.Boolean),
      latinoOwned: Schema.optional(AccountIdentityType),
      smallBusiness: Schema.optional(AccountIdentityType),
      blackOwned: Schema.optional(AccountIdentityType),
      veteranOwned: Schema.optional(AccountIdentityType),
      womenOwned: Schema.optional(AccountIdentityType),
    }),
  ).annotate({
    identifier: "AccountBusinessIdentity",
  }) as any as Schema.Schema<AccountBusinessIdentity>;

export interface AccountGoogleMyBusinessLink {
  /** Status of the link between this Merchant Center account and the Business Profile. Acceptable values are: - "`active`" - "`pending`" */
  status?: string;
  /** The ID of the Business Profile. If this is provided, then `gmbEmail` is ignored. The value of this field should match the `accountId` used by the Business Profile API. */
  gmbAccountId?: string;
  /** The Business Profile email address of a specific account within a Business Profile. A sample account within a Business Profile could be a business account with set of locations, managed under the Business Profile. */
  gmbEmail?: string;
}

export const AccountGoogleMyBusinessLink: Schema.Schema<AccountGoogleMyBusinessLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      gmbAccountId: Schema.optional(Schema.String),
      gmbEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountGoogleMyBusinessLink",
  }) as any as Schema.Schema<AccountGoogleMyBusinessLink>;

export interface AccountUser {
  /** Whether user is a reporting manager. This role is equivalent to the Performance and insights role in Merchant Center. */
  reportingManager?: boolean;
  /** Optional. Whether user has standard read-only access. */
  readOnly?: boolean;
  /** This role is deprecated and can no longer be assigned. Any value set will be ignored. */
  paymentsAnalyst?: boolean;
  /** This role is deprecated and can no longer be assigned. Any value set will be ignored. */
  orderManager?: boolean;
  /** User's email address. */
  emailAddress?: string;
  /** This role is deprecated and can no longer be assigned. Any value set will be ignored. */
  paymentsManager?: boolean;
  /** Whether user is an admin. */
  admin?: boolean;
}

export const AccountUser: Schema.Schema<AccountUser> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reportingManager: Schema.optional(Schema.Boolean),
      readOnly: Schema.optional(Schema.Boolean),
      paymentsAnalyst: Schema.optional(Schema.Boolean),
      orderManager: Schema.optional(Schema.Boolean),
      emailAddress: Schema.optional(Schema.String),
      paymentsManager: Schema.optional(Schema.Boolean),
      admin: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountUser",
  }) as any as Schema.Schema<AccountUser>;

export interface AccountItemUpdates {
  /** Determines which attributes of the items should be automatically updated. If this field is not present, then the settings will be deleted. If there are no settings for subaccount, they are inherited from aggregator. */
  accountItemUpdatesSettings?: AccountItemUpdatesSettings;
  /** Output only. The effective value of allow_price_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowPriceUpdates?: boolean;
  /** Output only. The effective value of allow_condition_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowConditionUpdates?: boolean;
  /** Output only. The effective value of allow_strict_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowStrictAvailabilityUpdates?: boolean;
  /** Output only. The effective value of allow_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowAvailabilityUpdates?: boolean;
}

export const AccountItemUpdates: Schema.Schema<AccountItemUpdates> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountItemUpdatesSettings: Schema.optional(AccountItemUpdatesSettings),
      effectiveAllowPriceUpdates: Schema.optional(Schema.Boolean),
      effectiveAllowConditionUpdates: Schema.optional(Schema.Boolean),
      effectiveAllowStrictAvailabilityUpdates: Schema.optional(Schema.Boolean),
      effectiveAllowAvailabilityUpdates: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountItemUpdates",
  }) as any as Schema.Schema<AccountItemUpdates>;

export interface AccountImageImprovementsSettings {
  /** Enables automatic image improvements. */
  allowAutomaticImageImprovements?: boolean;
}

export const AccountImageImprovementsSettings: Schema.Schema<AccountImageImprovementsSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowAutomaticImageImprovements: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountImageImprovementsSettings",
  }) as any as Schema.Schema<AccountImageImprovementsSettings>;

export interface AccountImageImprovements {
  /** Determines how the images should be automatically updated. If this field is not present, then the settings will be deleted. If there are no settings for subaccount, they are inherited from aggregator. */
  accountImageImprovementsSettings?: AccountImageImprovementsSettings;
  /** Output only. The effective value of allow_automatic_image_improvements. If account_image_improvements_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowAutomaticImageImprovements?: boolean;
}

export const AccountImageImprovements: Schema.Schema<AccountImageImprovements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountImageImprovementsSettings: Schema.optional(
        AccountImageImprovementsSettings,
      ),
      effectiveAllowAutomaticImageImprovements: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountImageImprovements",
  }) as any as Schema.Schema<AccountImageImprovements>;

export interface AccountShippingImprovements {
  /** Enables automatic shipping improvements. */
  allowShippingImprovements?: boolean;
}

export const AccountShippingImprovements: Schema.Schema<AccountShippingImprovements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowShippingImprovements: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccountShippingImprovements",
  }) as any as Schema.Schema<AccountShippingImprovements>;

export interface AccountAutomaticImprovements {
  /** Turning on [item updates](https://support.google.com/merchants/answer/3246284) allows Google to automatically update items for you. When item updates are on, Google uses the structured data markup on the website and advanced data extractors to update the price and availability of the items. When the item updates are off, items with mismatched data aren't shown. This field is only updated (cleared) if provided. */
  itemUpdates?: AccountItemUpdates;
  /** This improvement will attempt to automatically correct submitted images if they don't meet the [image requirements](https://support.google.com/merchants/answer/6324350), for example, removing overlays. If successful, the image will be replaced and approved. This improvement is only applied to images of disapproved offers. For more information see: [Automatic image improvements](https://support.google.com/merchants/answer/9242973) This field is only updated (cleared) if provided. */
  imageImprovements?: AccountImageImprovements;
  /** Not available for MCAs [accounts](https://support.google.com/merchants/answer/188487). By turning on [automatic shipping improvements](https://support.google.com/merchants/answer/10027038), you are allowing Google to improve the accuracy of your delivery times shown to shoppers using Google. More accurate delivery times, especially when faster, typically lead to better conversion rates. Google will improve your estimated delivery times based on various factors: - Delivery address of an order - Current handling time and shipping time settings - Estimated weekdays or business days - Parcel tracking data This field is only updated (cleared) if provided. */
  shippingImprovements?: AccountShippingImprovements;
}

export const AccountAutomaticImprovements: Schema.Schema<AccountAutomaticImprovements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      itemUpdates: Schema.optional(AccountItemUpdates),
      imageImprovements: Schema.optional(AccountImageImprovements),
      shippingImprovements: Schema.optional(AccountShippingImprovements),
    }),
  ).annotate({
    identifier: "AccountAutomaticImprovements",
  }) as any as Schema.Schema<AccountAutomaticImprovements>;

export interface AccountCustomerService {
  /** Customer service email. */
  email?: string;
  /** Customer service phone number. */
  phoneNumber?: string;
  /** Customer service URL. */
  url?: string;
}

export const AccountCustomerService: Schema.Schema<AccountCustomerService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountCustomerService",
  }) as any as Schema.Schema<AccountCustomerService>;

export interface AccountAddress {
  /** Street-level part of the address. Use `\n` to add a second line. */
  streetAddress?: string;
  /** Postal code or ZIP (for example, "94043"). */
  postalCode?: string;
  /** Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC"). */
  region?: string;
  /** City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs). */
  locality?: string;
  /** CLDR country code (for example, "US"). All MCA sub-accounts inherit the country of their parent MCA by default, however the country can be updated for individual sub-accounts. */
  country?: string;
}

export const AccountAddress: Schema.Schema<AccountAddress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      streetAddress: Schema.optional(Schema.String),
      postalCode: Schema.optional(Schema.String),
      region: Schema.optional(Schema.String),
      locality: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountAddress",
  }) as any as Schema.Schema<AccountAddress>;

export interface AccountBusinessInformation {
  /** The 10-digit [Korean business registration number](https://support.google.com/merchants/answer/9037766) separated with dashes in the format: XXX-XX-XXXXX. This field will only be updated if explicitly set. */
  koreanBusinessRegistrationNumber?: string;
  /** The customer service information of the business. */
  customerService?: AccountCustomerService;
  /** The address of the business. Use `\n` to add a second address line. */
  address?: AccountAddress;
  /** The phone number of the business in [E.164](https://en.wikipedia.org/wiki/E.164) format. This can only be updated if a verified phone number is not already set. To replace a verified phone number use the `Accounts.requestphoneverification` and `Accounts.verifyphonenumber`. */
  phoneNumber?: string;
  /** Verification status of the phone number of the business. This status is read only and can be updated only by successful phone verification. Acceptable values are: - "`verified`" - "`unverified`" */
  phoneVerificationStatus?: string;
}

export const AccountBusinessInformation: Schema.Schema<AccountBusinessInformation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      koreanBusinessRegistrationNumber: Schema.optional(Schema.String),
      customerService: Schema.optional(AccountCustomerService),
      address: Schema.optional(AccountAddress),
      phoneNumber: Schema.optional(Schema.String),
      phoneVerificationStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountBusinessInformation",
  }) as any as Schema.Schema<AccountBusinessInformation>;

export interface Account {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#account`". */
  kind?: string;
  /** Indicates whether the merchant sells adult content. */
  adultContent?: boolean;
  /** Required. 64-bit Merchant Center account ID. */
  id?: string;
  /** Client-specific, locally-unique, internal ID for the child account. */
  sellerId?: string;
  /** Linked YouTube channels that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected in the YT Creator Studio interface. To delete an active link, or to cancel a link request, remove it from the list. */
  youtubeChannelLinks?: Array<AccountYouTubeChannelLink>;
  /** The business identity attributes can be used to self-declare attributes that let customers know more about your business. */
  businessIdentity?: AccountBusinessIdentity;
  /** The Business Profile which is linked or in the process of being linked with the Merchant Center account. */
  googleMyBusinessLink?: AccountGoogleMyBusinessLink;
  /** ID of CSS the account belongs to. */
  cssId?: string;
  /** Automatically created label IDs that are assigned to the account by CSS Center. */
  automaticLabelIds?: Array<string>;
  /** Manually created label IDs that are assigned to the account by CSS. */
  labelIds?: Array<string>;
  /** Required. Display name for the account. */
  name?: string;
  /** The merchant's website. */
  websiteUrl?: string;
  /** Settings for conversion tracking. */
  conversionSettings?: AccountConversionSettings;
  /** Output only. How the account is managed. Acceptable values are: - "`manual`" - "`automatic`" */
  accountManagement?: string;
  /** Users with access to the account. Every account (except for subaccounts) must have at least one admin user. */
  users?: Array<AccountUser>;
  /** The automatic improvements of the account can be used to automatically update items, improve images and shipping. Each section inside AutomaticImprovements is updated separately. */
  automaticImprovements?: AccountAutomaticImprovements;
  /** The business information of the account. */
  businessInformation?: AccountBusinessInformation;
  /** Linked Ads accounts that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected either in the Ads interface or through the Google Ads API. To delete an active link, or to cancel a link request, remove it from the list. */
  adsLinks?: Array<AccountAdsLink>;
}

export const Account: Schema.Schema<Account> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      adultContent: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      sellerId: Schema.optional(Schema.String),
      youtubeChannelLinks: Schema.optional(
        Schema.Array(AccountYouTubeChannelLink),
      ),
      businessIdentity: Schema.optional(AccountBusinessIdentity),
      googleMyBusinessLink: Schema.optional(AccountGoogleMyBusinessLink),
      cssId: Schema.optional(Schema.String),
      automaticLabelIds: Schema.optional(Schema.Array(Schema.String)),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      websiteUrl: Schema.optional(Schema.String),
      conversionSettings: Schema.optional(AccountConversionSettings),
      accountManagement: Schema.optional(Schema.String),
      users: Schema.optional(Schema.Array(AccountUser)),
      automaticImprovements: Schema.optional(AccountAutomaticImprovements),
      businessInformation: Schema.optional(AccountBusinessInformation),
      adsLinks: Schema.optional(Schema.Array(AccountAdsLink)),
    }),
  ).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface AccountsListResponse {
  resources?: Array<Account>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsListResponse`". */
  kind?: string;
  /** The token for the retrieval of the next page of accounts. */
  nextPageToken?: string;
}

export const AccountsListResponse: Schema.Schema<AccountsListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(Account)),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsListResponse",
  }) as any as Schema.Schema<AccountsListResponse>;

export interface ProductUnitPricingMeasure {
  /** The measure of an item. */
  value?: number;
  /** The unit of the measure. */
  unit?: string;
}

export const ProductUnitPricingMeasure: Schema.Schema<ProductUnitPricingMeasure> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductUnitPricingMeasure",
  }) as any as Schema.Schema<ProductUnitPricingMeasure>;

export interface ProductStatusItemLevelIssue {
  /** A short issue description in English. */
  description?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** The error code of the issue. */
  code?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where issue applies to the offer. */
  applicableCountries?: Array<string>;
  /** The destination the issue applies to. */
  destination?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** How this issue affects serving of the offer. */
  servability?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attributeName?: string;
}

export const ProductStatusItemLevelIssue: Schema.Schema<ProductStatusItemLevelIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      documentation: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      applicableCountries: Schema.optional(Schema.Array(Schema.String)),
      destination: Schema.optional(Schema.String),
      resolution: Schema.optional(Schema.String),
      servability: Schema.optional(Schema.String),
      attributeName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusItemLevelIssue",
  }) as any as Schema.Schema<ProductStatusItemLevelIssue>;

export interface ProductStatusDestinationStatus {
  /** The name of the destination */
  destination?: string;
  /** The channel of the destination. */
  channel?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where the offer is disapproved. */
  disapprovedCountries?: Array<string>;
  /** Deprecated. Destination approval status in `targetCountry` of the offer. */
  status?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where the offer is approved. */
  approvedCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the offer is pending approval. */
  pendingCountries?: Array<string>;
}

export const ProductStatusDestinationStatus: Schema.Schema<ProductStatusDestinationStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
      channel: Schema.optional(Schema.String),
      disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.String),
      approvedCountries: Schema.optional(Schema.Array(Schema.String)),
      pendingCountries: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ProductStatusDestinationStatus",
  }) as any as Schema.Schema<ProductStatusDestinationStatus>;

export interface ProductStatus {
  /** Date on which the item has been created, in ISO 8601 format. */
  creationDate?: string;
  /** The title of the product. */
  title?: string;
  /** A list of all issues associated with the product. */
  itemLevelIssues?: Array<ProductStatusItemLevelIssue>;
  /** Date on which the item has been last updated, in ISO 8601 format. */
  lastUpdateDate?: string;
  /** The link to the product. */
  link?: string;
  /** The ID of the product for which status is reported. */
  productId?: string;
  /** The intended destinations for the product. */
  destinationStatuses?: Array<ProductStatusDestinationStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productStatus`" */
  kind?: string;
  /** Date on which the item expires in Google Shopping, in ISO 8601 format. */
  googleExpirationDate?: string;
}

export const ProductStatus: Schema.Schema<ProductStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creationDate: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      itemLevelIssues: Schema.optional(
        Schema.Array(ProductStatusItemLevelIssue),
      ),
      lastUpdateDate: Schema.optional(Schema.String),
      link: Schema.optional(Schema.String),
      productId: Schema.optional(Schema.String),
      destinationStatuses: Schema.optional(
        Schema.Array(ProductStatusDestinationStatus),
      ),
      kind: Schema.optional(Schema.String),
      googleExpirationDate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatus",
  }) as any as Schema.Schema<ProductStatus>;

export interface ProductstatusesCustomBatchResponseEntry {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productstatusesCustomBatchResponseEntry`" */
  kind?: string;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** The requested product status. Only defined if the request was successful. */
  productStatus?: ProductStatus;
}

export const ProductstatusesCustomBatchResponseEntry: Schema.Schema<ProductstatusesCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
      productStatus: Schema.optional(ProductStatus),
    }),
  ).annotate({
    identifier: "ProductstatusesCustomBatchResponseEntry",
  }) as any as Schema.Schema<ProductstatusesCustomBatchResponseEntry>;

export interface PriceInsights {
  /** The predicted change in impressions as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in impressions. */
  predictedImpressionsChangeFraction?: number;
  /** The predicted change in conversions as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in conversions). */
  predictedConversionsChangeFraction?: number;
  /** *Deprecated*: This field is no longer supported and will start returning 0. The predicted change in gross profit as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in gross profit. */
  predictedGrossProfitChangeFraction?: number;
  /** The predicted change in clicks as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in clicks. */
  predictedClicksChangeFraction?: number;
  /** *Deprecated*: This field is no longer supported and will start returning USD for all requests. The predicted monthly gross profit change currency (ISO 4217 code). */
  predictedMonthlyGrossProfitChangeCurrencyCode?: string;
  /** The latest suggested price in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) for the product. */
  suggestedPriceMicros?: string;
  /** The suggested price currency (ISO 4217 code). */
  suggestedPriceCurrencyCode?: string;
  /** *Deprecated*: This field is no longer supported and will start returning 0. The predicted change in gross profit in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) after introducing the suggested price for a month compared to current active price. */
  predictedMonthlyGrossProfitChangeMicros?: string;
  /** The predicted effectiveness of applying the price suggestion, bucketed. */
  effectiveness?:
    | "EFFECTIVENESS_UNSPECIFIED"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | (string & {});
}

export const PriceInsights: Schema.Schema<PriceInsights> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      predictedImpressionsChangeFraction: Schema.optional(Schema.Number),
      predictedConversionsChangeFraction: Schema.optional(Schema.Number),
      predictedGrossProfitChangeFraction: Schema.optional(Schema.Number),
      predictedClicksChangeFraction: Schema.optional(Schema.Number),
      predictedMonthlyGrossProfitChangeCurrencyCode: Schema.optional(
        Schema.String,
      ),
      suggestedPriceMicros: Schema.optional(Schema.String),
      suggestedPriceCurrencyCode: Schema.optional(Schema.String),
      predictedMonthlyGrossProfitChangeMicros: Schema.optional(Schema.String),
      effectiveness: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PriceInsights",
  }) as any as Schema.Schema<PriceInsights>;

export interface PriceCompetitiveness {
  /** The price benchmark currency (ISO 4217 code). */
  benchmarkPriceCurrencyCode?: string;
  /** The country of the price benchmark (ISO 3166 code). */
  countryCode?: string;
  /** The latest available price benchmark in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) for the product's catalog in the benchmark country. */
  benchmarkPriceMicros?: string;
}

export const PriceCompetitiveness: Schema.Schema<PriceCompetitiveness> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      benchmarkPriceCurrencyCode: Schema.optional(Schema.String),
      countryCode: Schema.optional(Schema.String),
      benchmarkPriceMicros: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PriceCompetitiveness",
  }) as any as Schema.Schema<PriceCompetitiveness>;

export interface ProductViewItemIssueIssueSeverityPerDestination {
  /** List of demoted countries in the destination. */
  demotedCountries?: Array<string>;
  /** Issue destination. */
  destination?: string;
  /** List of disapproved countries in the destination. */
  disapprovedCountries?: Array<string>;
}

export const ProductViewItemIssueIssueSeverityPerDestination: Schema.Schema<ProductViewItemIssueIssueSeverityPerDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      demotedCountries: Schema.optional(Schema.Array(Schema.String)),
      destination: Schema.optional(Schema.String),
      disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ProductViewItemIssueIssueSeverityPerDestination",
  }) as any as Schema.Schema<ProductViewItemIssueIssueSeverityPerDestination>;

export interface ProductViewItemIssueItemIssueSeverity {
  /** Severity of an issue aggregated for destination. */
  aggregatedSeverity?:
    | "AGGREGATED_ISSUE_SEVERITY_UNSPECIFIED"
    | "DISAPPROVED"
    | "DEMOTED"
    | "PENDING"
    | (string & {});
  /** Item issue severity for every destination. */
  severityPerDestination?: Array<ProductViewItemIssueIssueSeverityPerDestination>;
}

export const ProductViewItemIssueItemIssueSeverity: Schema.Schema<ProductViewItemIssueItemIssueSeverity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      aggregatedSeverity: Schema.optional(Schema.String),
      severityPerDestination: Schema.optional(
        Schema.Array(ProductViewItemIssueIssueSeverityPerDestination),
      ),
    }),
  ).annotate({
    identifier: "ProductViewItemIssueItemIssueSeverity",
  }) as any as Schema.Schema<ProductViewItemIssueItemIssueSeverity>;

export interface ProductViewItemIssueItemIssueType {
  /** Canonical attribute name for attribute-specific issues. */
  canonicalAttribute?: string;
  /** Error code of the issue. */
  code?: string;
}

export const ProductViewItemIssueItemIssueType: Schema.Schema<ProductViewItemIssueItemIssueType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canonicalAttribute: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductViewItemIssueItemIssueType",
  }) as any as Schema.Schema<ProductViewItemIssueItemIssueType>;

export interface ProductViewItemIssue {
  /** Item issue severity. */
  severity?: ProductViewItemIssueItemIssueSeverity;
  /** Item issue type. */
  issueType?: ProductViewItemIssueItemIssueType;
  /** Item issue resolution. */
  resolution?:
    | "UNKNOWN"
    | "MERCHANT_ACTION"
    | "PENDING_PROCESSING"
    | (string & {});
}

export const ProductViewItemIssue: Schema.Schema<ProductViewItemIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      severity: Schema.optional(ProductViewItemIssueItemIssueSeverity),
      issueType: Schema.optional(ProductViewItemIssueItemIssueType),
      resolution: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductViewItemIssue",
  }) as any as Schema.Schema<ProductViewItemIssue>;

export interface ProductView {
  /** Item group ID provided by the merchant for grouping variants together. */
  itemGroupId?: string;
  /** Fifth level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL5?: string;
  /** Aggregated destination status. */
  aggregatedDestinationStatus?:
    | "AGGREGATED_STATUS_UNSPECIFIED"
    | "NOT_ELIGIBLE_OR_DISAPPROVED"
    | "PENDING"
    | "ELIGIBLE_LIMITED"
    | "ELIGIBLE"
    | (string & {});
  /** Language code of the product in BCP 47 format. */
  languageCode?: string;
  /** The REST ID of the product, in the form of channel:contentLanguage:targetCountry:offerId. Content API methods that operate on products take this as their productId parameter. Should always be included in the SELECT clause. */
  id?: string;
  /** Normalized click potential of the product. Values range from 1 to 1000, where 1 is the highest click potential and 1000 is the theoretical lowest. */
  clickPotentialRank?: string;
  /** Expiration date for the product. Specified on insertion. */
  expirationDate?: Content_Date;
  /** GTIN of the product. */
  gtin?: Array<string>;
  /** Channel of the product (online versus local). */
  channel?: "CHANNEL_UNSPECIFIED" | "LOCAL" | "ONLINE" | (string & {});
  /** Third level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL3?: string;
  /** Second level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL2?: string;
  /** The time the merchant created the product in timestamp seconds. */
  creationTime?: string;
  /** Third level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL3?: string;
  /** Estimated performance potential compared to highest performing products of the merchant. */
  clickPotential?:
    | "CLICK_POTENTIAL_UNSPECIFIED"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | (string & {});
  /** Title of the product. */
  title?: string;
  /** Availability of the product. */
  availability?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Fifth level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL5?: string;
  /** The normalized shipping label specified in the feed */
  shippingLabel?: string;
  /** Fourth level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL4?: string;
  /** Condition of the product. */
  condition?: string;
  /** First level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL1?: string;
  /** First level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL1?: string;
  /** Second level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL2?: string;
  /** Product price currency code (for example, ISO 4217). Absent if product price is not available. */
  currencyCode?: string;
  /** List of item issues for the product. */
  itemIssues?: Array<ProductViewItemIssue>;
  /** Brand of the product. */
  brand?: string;
  /** Fourth level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL4?: string;
  /** Product price specified as micros (1 millionth of a standard unit, 1 USD = 1000000 micros) in the product currency. Absent in case the information about the price of the product is not available. */
  priceMicros?: string;
}

export const ProductView: Schema.Schema<ProductView> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      itemGroupId: Schema.optional(Schema.String),
      categoryL5: Schema.optional(Schema.String),
      aggregatedDestinationStatus: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      clickPotentialRank: Schema.optional(Schema.String),
      expirationDate: Schema.optional(Content_Date),
      gtin: Schema.optional(Schema.Array(Schema.String)),
      channel: Schema.optional(Schema.String),
      productTypeL3: Schema.optional(Schema.String),
      categoryL2: Schema.optional(Schema.String),
      creationTime: Schema.optional(Schema.String),
      categoryL3: Schema.optional(Schema.String),
      clickPotential: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      availability: Schema.optional(Schema.String),
      offerId: Schema.optional(Schema.String),
      productTypeL5: Schema.optional(Schema.String),
      shippingLabel: Schema.optional(Schema.String),
      productTypeL4: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      productTypeL1: Schema.optional(Schema.String),
      categoryL1: Schema.optional(Schema.String),
      productTypeL2: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      itemIssues: Schema.optional(Schema.Array(ProductViewItemIssue)),
      brand: Schema.optional(Schema.String),
      categoryL4: Schema.optional(Schema.String),
      priceMicros: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductView",
  }) as any as Schema.Schema<ProductView>;

export interface TopicTrends {
  /** Country trends are calculated for. Must be a two-letter country code (ISO 3166-1-alpha-2 code), for example, `“US”`. */
  customerCountryCode?: string;
  /** Google-provided topic trends are calculated for. Only top eight topics are returned. Topic is what shoppers are searching for on Google, grouped by the same concept. */
  topic?: string;
  /** Estimated search interest in the next 7 days, with the same normalization as search_interest. This field is only present for a future date. */
  next7DaysSearchInterest?: number;
  /** Daily search interest, normalized to the time and country to make comparisons easier, with 100 representing peak popularity (from 0 to 100) for the requested time period and location. */
  searchInterest?: number;
  /** Search interest in the last 30 days, with the same normalization as search_interest. This field is only present for a past date. */
  last30DaysSearchInterest?: number;
  /** Search interest in the last 90 days, with the same normalization as search_interest. This field is only present for a past date. */
  last90DaysSearchInterest?: number;
  /** Date the trend score was retrieved. */
  date?: Content_Date;
  /** Search interest in the last 120 days, with the same normalization as search_interest. This field is only present for a past date. */
  last120DaysSearchInterest?: number;
  /** Search interest in the last 7 days, with the same normalization as search_interest. This field is only present for a past date. */
  last7DaysSearchInterest?: number;
}

export const TopicTrends: Schema.Schema<TopicTrends> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customerCountryCode: Schema.optional(Schema.String),
      topic: Schema.optional(Schema.String),
      next7DaysSearchInterest: Schema.optional(Schema.Number),
      searchInterest: Schema.optional(Schema.Number),
      last30DaysSearchInterest: Schema.optional(Schema.Number),
      last90DaysSearchInterest: Schema.optional(Schema.Number),
      date: Schema.optional(Content_Date),
      last120DaysSearchInterest: Schema.optional(Schema.Number),
      last7DaysSearchInterest: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "TopicTrends",
  }) as any as Schema.Schema<TopicTrends>;

export interface Metrics {
  /** Number of times merchant's products are shown. */
  impressions?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items sent back for return, reported on the date when the merchant accepted the return. **This metric cannot be segmented by customer_country_code.** */
  returnedItems?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of fully shipped orders, reported on the last shipment date. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  shippedOrders?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Percentage of shipped items in relation to all finalized items (shipped or rejected by the merchant; unshipped items are not taken into account), reported on the order date. Item fill rate is lowered by merchant rejections. **This metric cannot be segmented by customer_country_code.** */
  itemFillRate?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average number of days between an item being ordered and the item being **This metric cannot be segmented by customer_country_code.** */
  itemDaysToShip?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items not shipped up until the end of the queried day. If a multi-day period is specified in the search query, the returned value is the average number of unshipped items over the days in the queried period. **This metric cannot be segmented by customer_country_code.** */
  unshippedItems?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of orders not shipped or partially shipped up until the end of the queried day. If a multi-day period is specified in the search query, the returned value is the average number of unshipped orders over the days in the queried period. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  unshippedOrders?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of returned items divided by the total price of shipped items, reported on the order date. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  returnRate?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average order size - the average number of items in an order. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  aos?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items canceled by the merchant, reported on the order date. **This metric cannot be segmented by customer_country_code.** */
  rejectedItems?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items. Excludes customer cancellations that happened within 30 minutes of placing the order. **This metric cannot be segmented by customer_country_code.** */
  orderedItems?: string;
  /** Number of clicks. */
  clicks?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average order value in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) - the average value (total price of items) of all placed orders. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  aovMicros?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of shipped items, reported on the shipment date. **This metric cannot be segmented by customer_country_code.** */
  shippedItems?: string;
  /** Click-through rate - the number of clicks merchant's products receive (clicks) divided by the number of times the products are shown (impressions). */
  ctr?: number;
  /** Number of conversions attributed to the product, reported on the conversion date. Depending on the attribution model, a conversion might be distributed across multiple clicks, where each click gets its own credit assigned. This metric is a sum of all such credits. The metric is currently available only for the `FREE_PRODUCT_LISTING` program. */
  conversions?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of placed orders. Excludes customer cancellations that happened within 30 minutes of placing the order. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  orders?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average number of days between an order being placed and the order being fully shipped, reported on the last shipment date. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  daysToShip?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of ordered items sent back for return in micros (1 millionth of a standard unit, 1 USD = 1000000 micros), reported on the date when the merchant accepted the return. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  returnsMicros?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of shipped items in micros (1 millionth of a standard unit, 1 USD = 1000000 micros), reported on the order date. Excludes shipping and taxes (US only). The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  shippedItemSalesMicros?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of ordered items in micros (1 millionth of a standard unit, 1 USD = 1000000 micros). Excludes shipping, taxes (US only), and customer cancellations that happened within 30 minutes of placing the order. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  orderedItemSalesMicros?: string;
  /** Value of conversions in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) attributed to the product, reported on the conversion date. The metric is currently available only for the `FREE_PRODUCT_LISTING` program. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. */
  conversionValueMicros?: string;
  /** Number of conversions divided by the number of clicks, reported on the impression date. The metric is currently available only for the `FREE_PRODUCT_LISTING` program. */
  conversionRate?: number;
}

export const Metrics: Schema.Schema<Metrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      impressions: Schema.optional(Schema.String),
      returnedItems: Schema.optional(Schema.String),
      shippedOrders: Schema.optional(Schema.String),
      itemFillRate: Schema.optional(Schema.Number),
      itemDaysToShip: Schema.optional(Schema.Number),
      unshippedItems: Schema.optional(Schema.Number),
      unshippedOrders: Schema.optional(Schema.Number),
      returnRate: Schema.optional(Schema.Number),
      aos: Schema.optional(Schema.Number),
      rejectedItems: Schema.optional(Schema.String),
      orderedItems: Schema.optional(Schema.String),
      clicks: Schema.optional(Schema.String),
      aovMicros: Schema.optional(Schema.Number),
      shippedItems: Schema.optional(Schema.String),
      ctr: Schema.optional(Schema.Number),
      conversions: Schema.optional(Schema.Number),
      orders: Schema.optional(Schema.String),
      daysToShip: Schema.optional(Schema.Number),
      returnsMicros: Schema.optional(Schema.String),
      shippedItemSalesMicros: Schema.optional(Schema.String),
      orderedItemSalesMicros: Schema.optional(Schema.String),
      conversionValueMicros: Schema.optional(Schema.String),
      conversionRate: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Metrics" }) as any as Schema.Schema<Metrics>;

export interface Segments {
  /** [Product category (5th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL5?: string;
  /** Custom label 4 for custom grouping of products. */
  customLabel4?: string;
  /** Custom label 2 for custom grouping of products. */
  customLabel2?: string;
  /** [Product type (5th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL5?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Custom label 0 for custom grouping of products. */
  customLabel0?: string;
  /** First day of the week (Monday) of the metrics date in the merchant timezone. */
  week?: Content_Date;
  /** [Product type (1st level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL1?: string;
  /** Code of the country where the customer is located at the time of the event. Represented in the ISO 3166 format. If the customer country cannot be determined, a special 'ZZ' code is returned. */
  customerCountryCode?: string;
  /** [Product type (4th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL4?: string;
  /** [Product type (2nd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL2?: string;
  /** [Product category (2nd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL2?: string;
  /** Program to which metrics apply, for example, Free Product Listing. */
  program?:
    | "PROGRAM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "FREE_PRODUCT_LISTING"
    | "FREE_LOCAL_PRODUCT_LISTING"
    | "BUY_ON_GOOGLE_LISTING"
    | (string & {});
  /** [Product type (3rd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL3?: string;
  /** [Product category (1st level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL1?: string;
  /** Custom label 1 for custom grouping of products. */
  customLabel1?: string;
  /** Title of the product. */
  title?: string;
  /** [Product category (4th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL4?: string;
  /** Custom label 3 for custom grouping of products. */
  customLabel3?: string;
  /** Date in the merchant timezone to which metrics apply. */
  date?: Content_Date;
  /** [Product category (3rd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL3?: string;
  /** Currency in which price metrics are represented, for example, if you select `ordered_item_sales_micros`, the returned value will be represented by this currency. */
  currencyCode?: string;
  /** Brand of the product. */
  brand?: string;
}

export const Segments: Schema.Schema<Segments> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      categoryL5: Schema.optional(Schema.String),
      customLabel4: Schema.optional(Schema.String),
      customLabel2: Schema.optional(Schema.String),
      productTypeL5: Schema.optional(Schema.String),
      offerId: Schema.optional(Schema.String),
      customLabel0: Schema.optional(Schema.String),
      week: Schema.optional(Content_Date),
      productTypeL1: Schema.optional(Schema.String),
      customerCountryCode: Schema.optional(Schema.String),
      productTypeL4: Schema.optional(Schema.String),
      productTypeL2: Schema.optional(Schema.String),
      categoryL2: Schema.optional(Schema.String),
      program: Schema.optional(Schema.String),
      productTypeL3: Schema.optional(Schema.String),
      categoryL1: Schema.optional(Schema.String),
      customLabel1: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      categoryL4: Schema.optional(Schema.String),
      customLabel3: Schema.optional(Schema.String),
      date: Schema.optional(Content_Date),
      categoryL3: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      brand: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Segments" }) as any as Schema.Schema<Segments>;

export interface ProductCluster {
  /** GTINs of example variants of the product cluster. */
  variantGtins?: Array<string>;
  /** Product category (1st level) of the product cluster, represented in Google's product taxonomy. */
  categoryL1?: string;
  /** Tells if there is at least one product of the brand currently `IN_STOCK` in your product feed across multiple countries, all products are `OUT_OF_STOCK` in your product feed, or `NOT_IN_INVENTORY`. The field doesn't take the Best Sellers report country filter into account. */
  brandInventoryStatus?:
    | "INVENTORY_STATUS_UNSPECIFIED"
    | "IN_STOCK"
    | "OUT_OF_STOCK"
    | "NOT_IN_INVENTORY"
    | (string & {});
  /** Product category (2nd level) of the product cluster, represented in Google's product taxonomy. */
  categoryL2?: string;
  /** Product category (5th level) of the product cluster, represented in Google's product taxonomy. */
  categoryL5?: string;
  /** Tells whether the product cluster is `IN_STOCK` in your product feed across multiple countries, `OUT_OF_STOCK` in your product feed, or `NOT_IN_INVENTORY` at all. The field doesn't take the Best Sellers report country filter into account. */
  inventoryStatus?:
    | "INVENTORY_STATUS_UNSPECIFIED"
    | "IN_STOCK"
    | "OUT_OF_STOCK"
    | "NOT_IN_INVENTORY"
    | (string & {});
  /** Product category (3rd level) of the product cluster, represented in Google's product taxonomy. */
  categoryL3?: string;
  /** Brand of the product cluster. */
  brand?: string;
  /** Title of the product cluster. */
  title?: string;
  /** Product category (4th level) of the product cluster, represented in Google's product taxonomy. */
  categoryL4?: string;
}

export const ProductCluster: Schema.Schema<ProductCluster> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      variantGtins: Schema.optional(Schema.Array(Schema.String)),
      categoryL1: Schema.optional(Schema.String),
      brandInventoryStatus: Schema.optional(Schema.String),
      categoryL2: Schema.optional(Schema.String),
      categoryL5: Schema.optional(Schema.String),
      inventoryStatus: Schema.optional(Schema.String),
      categoryL3: Schema.optional(Schema.String),
      brand: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      categoryL4: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductCluster",
  }) as any as Schema.Schema<ProductCluster>;

export interface Brand {
  /** Name of the brand. */
  name?: string;
}

export const Brand: Schema.Schema<Brand> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Brand" }) as any as Schema.Schema<Brand>;

export interface ReportRow {
  /** Price insights fields requested by the merchant in the query. Field values are only set if the merchant queries `PriceInsightsProductView`. */
  priceInsights?: PriceInsights;
  /** Competitive visibility fields requested by the merchant in the query. Field values are only set if the merchant queries `CompetitiveVisibilityTopMerchantView`, `CompetitiveVisibilityBenchmarkView` or `CompetitiveVisibilityCompetitorView`. */
  competitiveVisibility?: CompetitiveVisibility;
  /** Price competitiveness fields requested by the merchant in the query. Field values are only set if the merchant queries `PriceCompetitivenessProductView`. */
  priceCompetitiveness?: PriceCompetitiveness;
  /** Best sellers fields requested by the merchant in the query. Field values are only set if the merchant queries `BestSellersProductClusterView` or `BestSellersBrandView`. */
  bestSellers?: BestSellers;
  /** Product fields requested by the merchant in the query. Field values are only set if the merchant queries `ProductView`. */
  productView?: ProductView;
  /** [Topic trends](https://support.google.com/merchants/answer/13542370) fields requested by the merchant in the query. Field values are only set if the merchant queries `TopicTrendsView`. */
  topicTrends?: TopicTrends;
  /** Metrics requested by the merchant in the query. Metric values are only set for metrics requested explicitly in the query. */
  metrics?: Metrics;
  /** Segmentation dimensions requested by the merchant in the query. Dimension values are only set for dimensions requested explicitly in the query. */
  segments?: Segments;
  /** Product cluster fields requested by the merchant in the query. Field values are only set if the merchant queries `BestSellersProductClusterView`. */
  productCluster?: ProductCluster;
  /** Brand fields requested by the merchant in the query. Field values are only set if the merchant queries `BestSellersBrandView`. */
  brand?: Brand;
}

export const ReportRow: Schema.Schema<ReportRow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priceInsights: Schema.optional(PriceInsights),
      competitiveVisibility: Schema.optional(CompetitiveVisibility),
      priceCompetitiveness: Schema.optional(PriceCompetitiveness),
      bestSellers: Schema.optional(BestSellers),
      productView: Schema.optional(ProductView),
      topicTrends: Schema.optional(TopicTrends),
      metrics: Schema.optional(Metrics),
      segments: Schema.optional(Segments),
      productCluster: Schema.optional(ProductCluster),
      brand: Schema.optional(Brand),
    }),
  ).annotate({ identifier: "ReportRow" }) as any as Schema.Schema<ReportRow>;

export interface PosInventoryResponse {
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The available quantity of the item. */
  quantity?: string;
  /** Required. The current price of the item. */
  price?: Price;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posInventoryResponse`". */
  kind?: string;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
}

export const PosInventoryResponse: Schema.Schema<PosInventoryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeCode: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      targetCountry: Schema.optional(Schema.String),
      pickupSla: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      pickupMethod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosInventoryResponse",
  }) as any as Schema.Schema<PosInventoryResponse>;

export interface DatafeedsCustomBatchResponseEntry {
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** The requested data feed. Defined if and only if the request was successful. */
  datafeed?: Datafeed;
}

export const DatafeedsCustomBatchResponseEntry: Schema.Schema<DatafeedsCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
      datafeed: Schema.optional(Datafeed),
    }),
  ).annotate({
    identifier: "DatafeedsCustomBatchResponseEntry",
  }) as any as Schema.Schema<DatafeedsCustomBatchResponseEntry>;

export interface Weight {
  /** Required. The weight represented as a number. The weight can have a maximum precision of four decimal places. */
  value?: string;
  /** Required. The weight unit. Acceptable values are: - "`kg`" - "`lb`" */
  unit?: string;
}

export const Weight: Schema.Schema<Weight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Weight" }) as any as Schema.Schema<Weight>;

export interface LocationIdSet {
  /** A non-empty list of location IDs. They must all be of the same location type (for example, state). */
  locationIds?: Array<string>;
}

export const LocationIdSet: Schema.Schema<LocationIdSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "LocationIdSet",
  }) as any as Schema.Schema<LocationIdSet>;

export interface Headers {
  /** A list of inclusive order price upper bounds. The last price's value can be `"infinity"`. For example `[{"value": "10", "currency": "USD"}, {"value": "500", "currency": "USD"}, {"value": "infinity", "currency": "USD"}]` represents the headers "<= $10", "<= $500", and "> $500". All prices within a service must have the same currency. Must be non-empty. Can only be set if all other fields are not set. */
  prices?: Array<Price>;
  /** A list of inclusive order weight upper bounds. The last weight's value can be `"infinity"`. For example `[{"value": "10", "unit": "kg"}, {"value": "50", "unit": "kg"}, {"value": "infinity", "unit": "kg"}]` represents the headers "<= 10kg", "<= 50kg", and "> 50kg". All weights within a service must have the same unit. Must be non-empty. Can only be set if all other fields are not set. */
  weights?: Array<Weight>;
  /** A list of inclusive number of items upper bounds. The last value can be `"infinity"`. For example `["10", "50", "infinity"]` represents the headers "<= 10 items", "<= 50 items", and "> 50 items". Must be non-empty. Can only be set if all other fields are not set. */
  numberOfItems?: Array<string>;
  /** A list of postal group names. The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service. Must be non-empty. Can only be set if all other fields are not set. */
  postalCodeGroupNames?: Array<string>;
  /** A list of location ID sets. Must be non-empty. Can only be set if all other fields are not set. */
  locations?: Array<LocationIdSet>;
}

export const Headers: Schema.Schema<Headers> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prices: Schema.optional(Schema.Array(Price)),
      weights: Schema.optional(Schema.Array(Weight)),
      numberOfItems: Schema.optional(Schema.Array(Schema.String)),
      postalCodeGroupNames: Schema.optional(Schema.Array(Schema.String)),
      locations: Schema.optional(Schema.Array(LocationIdSet)),
    }),
  ).annotate({ identifier: "Headers" }) as any as Schema.Schema<Headers>;

export interface AccountTaxTaxRule {
  /** Explicit tax rate in percent, represented as a floating point number without the percentage character. Must not be negative. */
  ratePercent?: string;
  /** Country code in which tax is applicable. */
  country?: string;
  /** Whether the tax rate is taken from a global tax table or specified explicitly. */
  useGlobalRate?: boolean;
  /** If true, shipping charges are also taxed. */
  shippingTaxed?: boolean;
  /** Required. State (or province) is which the tax is applicable, described by its location ID (also called criteria ID). */
  locationId?: string;
}

export const AccountTaxTaxRule: Schema.Schema<AccountTaxTaxRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ratePercent: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      useGlobalRate: Schema.optional(Schema.Boolean),
      shippingTaxed: Schema.optional(Schema.Boolean),
      locationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountTaxTaxRule",
  }) as any as Schema.Schema<AccountTaxTaxRule>;

export interface AccountTax {
  /** Required. The ID of the account to which these account tax settings belong. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountTax`". */
  kind?: string;
  /** Tax rules. Updating the tax rules will enable "US" taxes (not reversible). Defining no rules is equivalent to not charging tax at all. */
  rules?: Array<AccountTaxTaxRule>;
}

export const AccountTax: Schema.Schema<AccountTax> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      rules: Schema.optional(Schema.Array(AccountTaxTaxRule)),
    }),
  ).annotate({ identifier: "AccountTax" }) as any as Schema.Schema<AccountTax>;

export interface AccounttaxCustomBatchResponseEntry {
  /** The retrieved or updated account tax settings. */
  accountTax?: AccountTax;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accounttaxCustomBatchResponseEntry`" */
  kind?: string;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
}

export const AccounttaxCustomBatchResponseEntry: Schema.Schema<AccounttaxCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountTax: Schema.optional(AccountTax),
      kind: Schema.optional(Schema.String),
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AccounttaxCustomBatchResponseEntry",
  }) as any as Schema.Schema<AccounttaxCustomBatchResponseEntry>;

export interface BusinessDayConfig {
  /** Regular business days, such as '"monday"'. May not be empty. */
  businessDays?: Array<string>;
}

export const BusinessDayConfig: Schema.Schema<BusinessDayConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      businessDays: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BusinessDayConfig",
  }) as any as Schema.Schema<BusinessDayConfig>;

export interface WarehouseCutoffTime {
  /** Required. Hour (24-hour clock) of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Hour is based on the timezone of warehouse. */
  hour?: number;
  /** Required. Minute of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Minute is based on the timezone of warehouse. */
  minute?: number;
}

export const WarehouseCutoffTime: Schema.Schema<WarehouseCutoffTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hour: Schema.optional(Schema.Number),
      minute: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "WarehouseCutoffTime",
  }) as any as Schema.Schema<WarehouseCutoffTime>;

export interface Warehouse {
  /** Required. The name of the warehouse. Must be unique within account. */
  name?: string;
  /** Required. Shipping address of the warehouse. */
  shippingAddress?: Address;
  /** Business days of the warehouse. If not set, will be Monday to Friday by default. */
  businessDayConfig?: BusinessDayConfig;
  /** Required. The latest time of day that an order can be accepted and begin processing. Later orders will be processed in the next day. The time is based on the warehouse postal code. */
  cutoffTime?: WarehouseCutoffTime;
  /** Required. The number of days it takes for this warehouse to pack up and ship an item. This is on the warehouse level, but can be overridden on the offer level based on the attributes of an item. */
  handlingDays?: string;
}

export const Warehouse: Schema.Schema<Warehouse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      shippingAddress: Schema.optional(Address),
      businessDayConfig: Schema.optional(BusinessDayConfig),
      cutoffTime: Schema.optional(WarehouseCutoffTime),
      handlingDays: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Warehouse" }) as any as Schema.Schema<Warehouse>;

export interface PostalCodeRange {
  /** A postal code or a pattern of the form `prefix*` denoting the inclusive upper bound of the range defining the area. It must have the same length as `postalCodeRangeBegin`: if `postalCodeRangeBegin` is a postal code then `postalCodeRangeEnd` must be a postal code too; if `postalCodeRangeBegin` is a pattern then `postalCodeRangeEnd` must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching `postalCodeRangeBegin`. */
  postalCodeRangeEnd?: string;
  /** A postal code or a pattern of the form `prefix*` denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`. Required. */
  postalCodeRangeBegin?: string;
}

export const PostalCodeRange: Schema.Schema<PostalCodeRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postalCodeRangeEnd: Schema.optional(Schema.String),
      postalCodeRangeBegin: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PostalCodeRange",
  }) as any as Schema.Schema<PostalCodeRange>;

export interface PostalCodeGroup {
  /** The CLDR territory code of the country the postal code group applies to. Required. */
  country?: string;
  /** The name of the postal code group, referred to in headers. Required. */
  name?: string;
  /** A range of postal codes. Required. */
  postalCodeRanges?: Array<PostalCodeRange>;
}

export const PostalCodeGroup: Schema.Schema<PostalCodeGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      country: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      postalCodeRanges: Schema.optional(Schema.Array(PostalCodeRange)),
    }),
  ).annotate({
    identifier: "PostalCodeGroup",
  }) as any as Schema.Schema<PostalCodeGroup>;

export interface PickupCarrierService {
  /** The name of the pickup carrier (for example, `"UPS"`). Required. */
  carrierName?: string;
  /** The name of the pickup service (for example, `"Access point"`). Required. */
  serviceName?: string;
}

export const PickupCarrierService: Schema.Schema<PickupCarrierService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      carrierName: Schema.optional(Schema.String),
      serviceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PickupCarrierService",
  }) as any as Schema.Schema<PickupCarrierService>;

export interface Value {
  /** A flat rate. Can only be set if all other fields are not set. */
  flatRate?: Price;
  /** The name of a carrier rate referring to a carrier rate defined in the same rate group. Can only be set if all other fields are not set. */
  carrierRateName?: string;
  /** If true, then the product can't ship. Must be true when set, can only be set if all other fields are not set. */
  noShipping?: boolean;
  /** A percentage of the price represented as a number in decimal notation (for example, `"5.4"`). Can only be set if all other fields are not set. */
  pricePercentage?: string;
  /** The name of a subtable. Can only be set in table cells (not for single values), and only if all other fields are not set. */
  subtableName?: string;
}

export const Value: Schema.Schema<Value> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flatRate: Schema.optional(Price),
      carrierRateName: Schema.optional(Schema.String),
      noShipping: Schema.optional(Schema.Boolean),
      pricePercentage: Schema.optional(Schema.String),
      subtableName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface Row {
  /** The list of cells that constitute the row. Must have the same length as `columnHeaders` for two-dimensional tables, a length of 1 for one-dimensional tables. Required. */
  cells?: Array<Value>;
}

export const Row: Schema.Schema<Row> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cells: Schema.optional(Schema.Array(Value)),
    }),
  ).annotate({ identifier: "Row" }) as any as Schema.Schema<Row>;

export interface Table {
  /** Headers of the table's rows. Required. */
  rowHeaders?: Headers;
  /** The list of rows that constitute the table. Must have the same length as `rowHeaders`. Required. */
  rows?: Array<Row>;
  /** Headers of the table's columns. Optional: if not set then the table has only one dimension. */
  columnHeaders?: Headers;
  /** Name of the table. Required for subtables, ignored for the main table. */
  name?: string;
}

export const Table: Schema.Schema<Table> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rowHeaders: Schema.optional(Headers),
      rows: Schema.optional(Schema.Array(Row)),
      columnHeaders: Schema.optional(Headers),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface RateGroup {
  /** A list of shipping labels defining the products to which this rate group applies to. This is a disjunction: only one of the labels has to match for the rate group to apply. May only be empty for the last rate group of a service. Required. */
  applicableShippingLabels?: Array<string>;
  /** The value of the rate group (for example, flat rate $10). Can only be set if `mainTable` and `subtables` are not set. */
  singleValue?: Value;
  /** A table defining the rate group, when `singleValue` is not expressive enough. Can only be set if `singleValue` is not set. */
  mainTable?: Table;
  /** A list of carrier rates that can be referred to by `mainTable` or `singleValue`. */
  carrierRates?: Array<CarrierRate>;
  /** Name of the rate group. Optional. If set has to be unique within shipping service. */
  name?: string;
  /** A list of subtables referred to by `mainTable`. Can only be set if `mainTable` is set. */
  subtables?: Array<Table>;
}

export const RateGroup: Schema.Schema<RateGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicableShippingLabels: Schema.optional(Schema.Array(Schema.String)),
      singleValue: Schema.optional(Value),
      mainTable: Schema.optional(Table),
      carrierRates: Schema.optional(Schema.Array(CarrierRate)),
      name: Schema.optional(Schema.String),
      subtables: Schema.optional(Schema.Array(Table)),
    }),
  ).annotate({ identifier: "RateGroup" }) as any as Schema.Schema<RateGroup>;

export interface WarehouseBasedDeliveryTime {
  /** Required. Carrier, such as `"UPS"` or `"Fedex"`. The list of supported carriers can be retrieved through the `listSupportedCarriers` method. */
  carrier?: string;
  /** Shipping origin's country represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). */
  originCountry?: string;
  /** The name of the warehouse. Warehouse name need to be matched with name. If warehouseName is set, the below fields will be ignored. The warehouse info will be read from warehouse. */
  warehouseName?: string;
  /** Shipping origin's state. */
  originAdministrativeArea?: string;
  /** Required. Carrier service, such as `"ground"` or `"2 days"`. The list of supported services for a carrier can be retrieved through the `listSupportedCarriers` method. The name of the service must be in the eddSupportedServices list. */
  carrierService?: string;
  /** Shipping origin. */
  originPostalCode?: string;
  /** Shipping origin's street address. */
  originStreetAddress?: string;
  /** Shipping origin's city. */
  originCity?: string;
}

export const WarehouseBasedDeliveryTime: Schema.Schema<WarehouseBasedDeliveryTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      carrier: Schema.optional(Schema.String),
      originCountry: Schema.optional(Schema.String),
      warehouseName: Schema.optional(Schema.String),
      originAdministrativeArea: Schema.optional(Schema.String),
      carrierService: Schema.optional(Schema.String),
      originPostalCode: Schema.optional(Schema.String),
      originStreetAddress: Schema.optional(Schema.String),
      originCity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WarehouseBasedDeliveryTime",
  }) as any as Schema.Schema<WarehouseBasedDeliveryTime>;

export interface HolidayCutoff {
  /** Unique identifier for the holiday. Required. */
  holidayId?: string;
  /** Date on which the deadline will become visible to consumers in ISO 8601 format. For example, "2016-10-31" for 31st October 2016. Required. */
  visibleFromDate?: string;
  /** Hour of the day on the deadline date until which the order has to be placed to qualify for the delivery guarantee. Possible values are: 0 (midnight), 1, ..., 12 (noon), 13, ..., 23. Required. */
  deadlineHour?: number;
  /** Date of the order deadline, in ISO 8601 format. For example, "2016-11-29" for 29th November 2016. Required. */
  deadlineDate?: string;
  /** Timezone identifier for the deadline hour (for example, "Europe/Zurich"). List of identifiers. Required. */
  deadlineTimezone?: string;
}

export const HolidayCutoff: Schema.Schema<HolidayCutoff> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      holidayId: Schema.optional(Schema.String),
      visibleFromDate: Schema.optional(Schema.String),
      deadlineHour: Schema.optional(Schema.Number),
      deadlineDate: Schema.optional(Schema.String),
      deadlineTimezone: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HolidayCutoff",
  }) as any as Schema.Schema<HolidayCutoff>;

export interface TransitTableTransitTimeRowTransitTimeValue {
  /** Must be greater than or equal to `minTransitTimeInDays`. */
  maxTransitTimeInDays?: number;
  /** Transit time range (min-max) in business days. 0 means same day delivery, 1 means next day delivery. */
  minTransitTimeInDays?: number;
}

export const TransitTableTransitTimeRowTransitTimeValue: Schema.Schema<TransitTableTransitTimeRowTransitTimeValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxTransitTimeInDays: Schema.optional(Schema.Number),
      minTransitTimeInDays: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "TransitTableTransitTimeRowTransitTimeValue",
  }) as any as Schema.Schema<TransitTableTransitTimeRowTransitTimeValue>;

export interface TransitTableTransitTimeRow {
  values?: Array<TransitTableTransitTimeRowTransitTimeValue>;
}

export const TransitTableTransitTimeRow: Schema.Schema<TransitTableTransitTimeRow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(
        Schema.Array(TransitTableTransitTimeRowTransitTimeValue),
      ),
    }),
  ).annotate({
    identifier: "TransitTableTransitTimeRow",
  }) as any as Schema.Schema<TransitTableTransitTimeRow>;

export interface TransitTable {
  /** A list of postal group names. The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service. */
  postalCodeGroupNames?: Array<string>;
  /** A list of transit time labels. The last value can be `"all other labels"`. Example: `["food", "electronics", "all other labels"]`. */
  transitTimeLabels?: Array<string>;
  rows?: Array<TransitTableTransitTimeRow>;
}

export const TransitTable: Schema.Schema<TransitTable> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postalCodeGroupNames: Schema.optional(Schema.Array(Schema.String)),
      transitTimeLabels: Schema.optional(Schema.Array(Schema.String)),
      rows: Schema.optional(Schema.Array(TransitTableTransitTimeRow)),
    }),
  ).annotate({
    identifier: "TransitTable",
  }) as any as Schema.Schema<TransitTable>;

export interface CutoffTime {
  /** Hour of the cutoff time until which an order has to be placed to be processed in the same day. Required. */
  hour?: number;
  /** Timezone identifier for the cutoff time (for example, "Europe/Zurich"). List of identifiers. Required. */
  timezone?: string;
  /** Minute of the cutoff time until which an order has to be placed to be processed in the same day. Required. */
  minute?: number;
}

export const CutoffTime: Schema.Schema<CutoffTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hour: Schema.optional(Schema.Number),
      timezone: Schema.optional(Schema.String),
      minute: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "CutoffTime" }) as any as Schema.Schema<CutoffTime>;

export interface DeliveryTime {
  /** Indicates that the delivery time should be calculated per warehouse (shipping origin location) based on the settings of the selected carrier. When set, no other transit time related field in DeliveryTime should be set. */
  warehouseBasedDeliveryTimes?: Array<WarehouseBasedDeliveryTime>;
  /** Holiday cutoff definitions. If configured, they specify order cutoff times for holiday-specific shipping. */
  holidayCutoffs?: Array<HolidayCutoff>;
  /** The business days during which orders can be in-transit. If not provided, Monday to Friday business days will be assumed. */
  transitBusinessDayConfig?: BusinessDayConfig;
  /** Transit time table, number of business days spent in transit based on row and column dimensions. Either `{min,max}TransitTimeInDays` or `transitTimeTable` can be set, but not both. */
  transitTimeTable?: TransitTable;
  /** Maximum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. Must be greater than or equal to `minHandlingTimeInDays`. */
  maxHandlingTimeInDays?: number;
  /** Minimum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. */
  minHandlingTimeInDays?: number;
  /** Minimum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Either `{min,max}TransitTimeInDays` or `transitTimeTable` must be set, but not both. */
  minTransitTimeInDays?: number;
  /** Maximum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Must be greater than or equal to `minTransitTimeInDays`. */
  maxTransitTimeInDays?: number;
  /** Business days cutoff time definition. If not configured, the cutoff time will be defaulted to 8AM PST. If local delivery, use Service.StoreConfig.CutoffConfig. */
  cutoffTime?: CutoffTime;
  /** The business days during which orders can be handled. If not provided, Monday to Friday business days will be assumed. */
  handlingBusinessDayConfig?: BusinessDayConfig;
}

export const DeliveryTime: Schema.Schema<DeliveryTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      warehouseBasedDeliveryTimes: Schema.optional(
        Schema.Array(WarehouseBasedDeliveryTime),
      ),
      holidayCutoffs: Schema.optional(Schema.Array(HolidayCutoff)),
      transitBusinessDayConfig: Schema.optional(BusinessDayConfig),
      transitTimeTable: Schema.optional(TransitTable),
      maxHandlingTimeInDays: Schema.optional(Schema.Number),
      minHandlingTimeInDays: Schema.optional(Schema.Number),
      minTransitTimeInDays: Schema.optional(Schema.Number),
      maxTransitTimeInDays: Schema.optional(Schema.Number),
      cutoffTime: Schema.optional(CutoffTime),
      handlingBusinessDayConfig: Schema.optional(BusinessDayConfig),
    }),
  ).annotate({
    identifier: "DeliveryTime",
  }) as any as Schema.Schema<DeliveryTime>;

export interface ServiceStoreConfigCutoffConfigLocalCutoffTime {
  /** Hour local delivery orders must be placed by to process the same day. */
  hour?: string;
  /** Minute local delivery orders must be placed by to process the same day. */
  minute?: string;
}

export const ServiceStoreConfigCutoffConfigLocalCutoffTime: Schema.Schema<ServiceStoreConfigCutoffConfigLocalCutoffTime> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hour: Schema.optional(Schema.String),
      minute: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceStoreConfigCutoffConfigLocalCutoffTime",
  }) as any as Schema.Schema<ServiceStoreConfigCutoffConfigLocalCutoffTime>;

export interface ServiceStoreConfigCutoffConfig {
  /** Represents cutoff time as the number of hours before store closing. Mutually exclusive with other fields (hour and minute). */
  storeCloseOffsetHours?: string;
  /** Time in hours and minutes in the local timezone when local delivery ends. */
  localCutoffTime?: ServiceStoreConfigCutoffConfigLocalCutoffTime;
  /** Merchants can opt-out of showing n+1 day local delivery when they have a shipping service configured to n day local delivery. For example, if the shipping service defines same-day delivery, and it's past the cut-off, setting this field to `true` results in the calculated shipping service rate returning `NO_DELIVERY_POST_CUTOFF`. In the same example, setting this field to `false` results in the calculated shipping time being one day. This is only for local delivery. */
  noDeliveryPostCutoff?: boolean;
}

export const ServiceStoreConfigCutoffConfig: Schema.Schema<ServiceStoreConfigCutoffConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeCloseOffsetHours: Schema.optional(Schema.String),
      localCutoffTime: Schema.optional(
        ServiceStoreConfigCutoffConfigLocalCutoffTime,
      ),
      noDeliveryPostCutoff: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ServiceStoreConfigCutoffConfig",
  }) as any as Schema.Schema<ServiceStoreConfigCutoffConfig>;

export interface Distance {
  /** The distance represented as a number. */
  value?: string;
  /** The distance unit. Acceptable values are `None`, `Miles`, and `Kilometers`. */
  unit?: string;
}

export const Distance: Schema.Schema<Distance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Distance" }) as any as Schema.Schema<Distance>;

export interface ServiceStoreConfig {
  /** A list of store codes that provide local delivery. If empty, then `store_service_type` must be `all_stores`, or an error is thrown. If not empty, then `store_service_type` must be `selected_stores`, or an error is thrown. */
  storeCodes?: Array<string>;
  /** Indicates whether all stores listed by this merchant provide local delivery or not. Acceptable values are `all stores` and `selected stores` */
  storeServiceType?: string;
  /** Time local delivery ends for the day. This can be either `local_cutoff_time` or `store_close_offset_hours`, if both are provided an error is thrown. */
  cutoffConfig?: ServiceStoreConfigCutoffConfig;
  /** Maximum delivery radius. Only needed for local delivery fulfillment type. */
  serviceRadius?: Distance;
}

export const ServiceStoreConfig: Schema.Schema<ServiceStoreConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeCodes: Schema.optional(Schema.Array(Schema.String)),
      storeServiceType: Schema.optional(Schema.String),
      cutoffConfig: Schema.optional(ServiceStoreConfigCutoffConfig),
      serviceRadius: Schema.optional(Distance),
    }),
  ).annotate({
    identifier: "ServiceStoreConfig",
  }) as any as Schema.Schema<ServiceStoreConfig>;

export interface MinimumOrderValueTable {
  storeCodeSetWithMovs?: Array<MinimumOrderValueTableStoreCodeSetWithMov>;
}

export const MinimumOrderValueTable: Schema.Schema<MinimumOrderValueTable> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeCodeSetWithMovs: Schema.optional(
        Schema.Array(MinimumOrderValueTableStoreCodeSetWithMov),
      ),
    }),
  ).annotate({
    identifier: "MinimumOrderValueTable",
  }) as any as Schema.Schema<MinimumOrderValueTable>;

export interface Service {
  /** The carrier-service pair delivering items to collection points. The list of supported pickup services can be retrieved through the `getSupportedPickupServices` method. Required if and only if the service delivery type is `pickup`. */
  pickupService?: PickupCarrierService;
  /** Minimum order value for this service. If set, indicates that customers will have to spend at least this amount. All prices within a service must have the same currency. Cannot be set together with minimum_order_value_table. */
  minimumOrderValue?: Price;
  /** Type of locations this service ships orders to. Acceptable values are: - "`delivery`" - "`pickup` (deprecated)" - "`local_delivery`" - "`collection_point`" */
  shipmentType?: string;
  /** Shipping rate group definitions. Only the last one is allowed to have an empty `applicableShippingLabels`, which means "everything else". The other `applicableShippingLabels` must not overlap. */
  rateGroups?: Array<RateGroup>;
  /** Free-form name of the service. Must be unique within target account. Required. */
  name?: string;
  /** A boolean exposing the active status of the shipping service. Required. */
  active?: boolean;
  /** Time spent in various aspects from order to the delivery of the product. Required. */
  deliveryTime?: DeliveryTime;
  /** The CLDR territory code of the country to which the service applies. Required. */
  deliveryCountry?: string;
  /** A list of stores your products are delivered from. This is only available for the local delivery shipment type. */
  storeConfig?: ServiceStoreConfig;
  /** The CLDR code of the currency to which this service applies. Must match that of the prices in rate groups. */
  currency?: string;
  /** Eligibility for this service. Acceptable values are: - "`All scenarios`" - "`All scenarios except Shopping Actions`" - "`Shopping Actions`" */
  eligibility?: string;
  /** Table of per store minimum order values for the pickup fulfillment type. Cannot be set together with minimum_order_value. */
  minimumOrderValueTable?: MinimumOrderValueTable;
}

export const Service: Schema.Schema<Service> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pickupService: Schema.optional(PickupCarrierService),
      minimumOrderValue: Schema.optional(Price),
      shipmentType: Schema.optional(Schema.String),
      rateGroups: Schema.optional(Schema.Array(RateGroup)),
      name: Schema.optional(Schema.String),
      active: Schema.optional(Schema.Boolean),
      deliveryTime: Schema.optional(DeliveryTime),
      deliveryCountry: Schema.optional(Schema.String),
      storeConfig: Schema.optional(ServiceStoreConfig),
      currency: Schema.optional(Schema.String),
      eligibility: Schema.optional(Schema.String),
      minimumOrderValueTable: Schema.optional(MinimumOrderValueTable),
    }),
  ).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ShippingSettings {
  /** Optional. A list of warehouses which can be referred to in `services`. */
  warehouses?: Array<Warehouse>;
  /** A list of postal code groups that can be referred to in `services`. Optional. */
  postalCodeGroups?: Array<PostalCodeGroup>;
  /** The ID of the account to which these account shipping settings belong. Ignored upon update, always present in get request responses. */
  accountId?: string;
  /** The target account's list of services. Optional. */
  services?: Array<Service>;
}

export const ShippingSettings: Schema.Schema<ShippingSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      warehouses: Schema.optional(Schema.Array(Warehouse)),
      postalCodeGroups: Schema.optional(Schema.Array(PostalCodeGroup)),
      accountId: Schema.optional(Schema.String),
      services: Schema.optional(Schema.Array(Service)),
    }),
  ).annotate({
    identifier: "ShippingSettings",
  }) as any as Schema.Schema<ShippingSettings>;

export interface ShippingsettingsCustomBatchRequestEntry {
  /** The account shipping settings to update. Only defined if the method is `update`. */
  shippingSettings?: ShippingSettings;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" - "`update`" */
  method?: string;
  /** The ID of the account for which to get/update account shipping settings. */
  accountId?: string;
}

export const ShippingsettingsCustomBatchRequestEntry: Schema.Schema<ShippingsettingsCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shippingSettings: Schema.optional(ShippingSettings),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShippingsettingsCustomBatchRequestEntry",
  }) as any as Schema.Schema<ShippingsettingsCustomBatchRequestEntry>;

export interface PriceAmount {
  /** The price represented as a number. */
  value?: string;
  /** The currency of the price. */
  currency?: string;
}

export const PriceAmount: Schema.Schema<PriceAmount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      currency: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PriceAmount",
  }) as any as Schema.Schema<PriceAmount>;

export interface TimePeriod {
  /** The starting timestamp. */
  startTime?: string;
  /** The ending timestamp. */
  endTime?: string;
}

export const TimePeriod: Schema.Schema<TimePeriod> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimePeriod" }) as any as Schema.Schema<TimePeriod>;

export interface PromotionPromotionStatusDestinationStatus {
  /** The name of the destination. */
  destination?: string;
  /** The status for the specified destination. */
  status?:
    | "STATE_UNSPECIFIED"
    | "IN_REVIEW"
    | "REJECTED"
    | "LIVE"
    | "STOPPED"
    | "EXPIRED"
    | "PENDING"
    | (string & {});
}

export const PromotionPromotionStatusDestinationStatus: Schema.Schema<PromotionPromotionStatusDestinationStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PromotionPromotionStatusDestinationStatus",
  }) as any as Schema.Schema<PromotionPromotionStatusDestinationStatus>;

export interface PromotionPromotionStatusPromotionIssue {
  /** Code of the issue. */
  code?: string;
  /** Explanation of the issue. */
  detail?: string;
}

export const PromotionPromotionStatusPromotionIssue: Schema.Schema<PromotionPromotionStatusPromotionIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PromotionPromotionStatusPromotionIssue",
  }) as any as Schema.Schema<PromotionPromotionStatusPromotionIssue>;

export interface PromotionPromotionStatus {
  /** The intended destinations for the promotion. */
  destinationStatuses?: Array<PromotionPromotionStatusDestinationStatus>;
  /** Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  creationDate?: string;
  /** Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  lastUpdateDate?: string;
  /** A list of issues associated with the promotion. */
  promotionIssue?: Array<PromotionPromotionStatusPromotionIssue>;
}

export const PromotionPromotionStatus: Schema.Schema<PromotionPromotionStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destinationStatuses: Schema.optional(
        Schema.Array(PromotionPromotionStatusDestinationStatus),
      ),
      creationDate: Schema.optional(Schema.String),
      lastUpdateDate: Schema.optional(Schema.String),
      promotionIssue: Schema.optional(
        Schema.Array(PromotionPromotionStatusPromotionIssue),
      ),
    }),
  ).annotate({
    identifier: "PromotionPromotionStatus",
  }) as any as Schema.Schema<PromotionPromotionStatus>;

export interface Promotion {
  /** Required. Long title for the promotion. */
  longTitle?: string;
  /** Minimum purchase amount for the promotion. */
  minimumPurchaseAmount?: PriceAmount;
  /** Generic redemption code for the promotion. To be used with the `offerType` field. */
  genericRedemptionCode?: string;
  /** The redemption restriction for the promotion. */
  redemptionRestriction?:
    | "REDEMPTION_RESTRICTION_UNSPECIFIED"
    | "SUBSCRIBE_AND_SAVE"
    | "FIRST_ORDER"
    | "SIGN_UP_FOR_EMAIL"
    | "SIGN_UP_FOR_TEXT"
    | "FORMS_OF_PAYMENT"
    | "CUSTOM"
    | (string & {});
  /** The maximum monetary discount a customer can receive for the promotion. This field is only supported with the `Percent off` coupon value type. */
  maxDiscountAmount?: PriceAmount;
  /** String representation of the promotion effective dates. Deprecated. Use `promotion_effective_time_period` instead. */
  promotionEffectiveDates?: string;
  /** Required. Redemption channel for the promotion. At least one channel is required. */
  redemptionChannel?: Array<
    "REDEMPTION_CHANNEL_UNSPECIFIED" | "IN_STORE" | "ONLINE" | (string & {})
  >;
  /** Output only. The REST promotion ID to uniquely identify the promotion. Content API methods that operate on promotions take this as their `promotionId` parameter. The REST ID for a promotion is of the form channel:contentLanguage:targetCountry:promotionId The `channel` field has a value of `"online"`, `"in_store"`, or `"online_in_store"`. */
  id?: string;
  /** `TimePeriod` representation of the promotion's display dates. */
  promotionDisplayTimePeriod?: TimePeriod;
  /** Product filter by item group ID for the promotion. */
  itemGroupId?: Array<string>;
  /** Store codes to exclude for the promotion. */
  storeCodeExclusion?: Array<string>;
  /** Product filter by item group ID exclusion for the promotion. */
  itemGroupIdExclusion?: Array<string>;
  /** Maximum purchase quantity for the promotion. */
  limitQuantity?: number;
  /** Free gift value for the promotion. */
  freeGiftValue?: PriceAmount;
  /** The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set. */
  customRedemptionRestriction?: string;
  /** Required. The target country used as part of the unique identifier. Can be `AU`, `CA`, `DE`, `FR`, `GB`, `IN`, `US`, `BR`, `ES`, `NL`, `JP`, `IT` or `KR`. */
  targetCountry?: string;
  /** Required. Applicability of the promotion to either all products or only specific products. */
  productApplicability?:
    | "PRODUCT_APPLICABILITY_UNSPECIFIED"
    | "ALL_PRODUCTS"
    | "SPECIFIC_PRODUCTS"
    | (string & {});
  /** Product filter by product type for the promotion. */
  productType?: Array<string>;
  /** Free gift item ID for the promotion. */
  freeGiftItemId?: string;
  /** Cost cap for the promotion. */
  moneyBudget?: PriceAmount;
  /** Product filter by item ID exclusion for the promotion. */
  itemIdExclusion?: Array<string>;
  /** Product filter by product type exclusion for the promotion. */
  productTypeExclusion?: Array<string>;
  /** Required. The content language used as part of the unique identifier. `en` content language is available for all target countries. `fr` content language is available for `CA` and `FR` target countries. `de` content language is available for `DE` target country. `nl` content language is available for `NL` target country. `it` content language is available for `IT` target country. `pt` content language is available for `BR` target country. `ja` content language is available for `JP` target country. `ko` content language is available for `KR` target country. */
  contentLanguage?: string;
  /** String representation of the promotion display dates. Deprecated. Use `promotion_display_time_period` instead. */
  promotionDisplayDates?: string;
  /** The number of items discounted in the promotion. */
  getThisQuantityDiscounted?: number;
  /** Output only. The current status of the promotion. */
  promotionStatus?: PromotionPromotionStatus;
  /** Maximum purchase value for the promotion. */
  limitValue?: PriceAmount;
  /** The percentage discount offered in the promotion. */
  percentOff?: number;
  /** Required. `TimePeriod` representation of the promotion's effective dates. */
  promotionEffectiveTimePeriod?: TimePeriod;
  /** Free gift description for the promotion. */
  freeGiftDescription?: string;
  /** Product filter by item ID for the promotion. */
  itemId?: Array<string>;
  /** Required. Coupon value type for the promotion. */
  couponValueType?:
    | "COUPON_VALUE_TYPE_UNSPECIFIED"
    | "MONEY_OFF"
    | "PERCENT_OFF"
    | "BUY_M_GET_N_MONEY_OFF"
    | "BUY_M_GET_N_PERCENT_OFF"
    | "BUY_M_GET_MONEY_OFF"
    | "BUY_M_GET_PERCENT_OFF"
    | "FREE_GIFT"
    | "FREE_GIFT_WITH_VALUE"
    | "FREE_GIFT_WITH_ITEM_ID"
    | "FREE_SHIPPING_STANDARD"
    | "FREE_SHIPPING_OVERNIGHT"
    | "FREE_SHIPPING_TWO_DAY"
    | (string & {});
  /** Minimum purchase quantity for the promotion. */
  minimumPurchaseQuantity?: number;
  /** Store codes to include for the promotion. */
  storeCode?: Array<string>;
  /** Required. Type of the promotion. */
  offerType?:
    | "OFFER_TYPE_UNSPECIFIED"
    | "NO_CODE"
    | "GENERIC_CODE"
    | (string & {});
  /** Product filter by brand for the promotion. */
  brand?: Array<string>;
  /** Order limit for the promotion. */
  orderLimit?: number;
  /** Product filter by brand exclusion for the promotion. */
  brandExclusion?: Array<string>;
  /** Whether the promotion applies to all stores, or only specified stores. Local Inventory ads promotions throw an error if no store applicability is included. An INVALID_ARGUMENT error is thrown if store_applicability is set to ALL_STORES and store_code or score_code_exclusion is set to a value. */
  storeApplicability?:
    | "STORE_APPLICABILITY_UNSPECIFIED"
    | "ALL_STORES"
    | "SPECIFIC_STORES"
    | (string & {});
  /** URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no promo url is included. URL is used to confirm that the promotion is valid and can be redeemed. */
  promotionUrl?: string;
  /** Required. The user provided promotion ID to uniquely identify the promotion. */
  promotionId?: string;
  /** Destination ID for the promotion. */
  promotionDestinationIds?: Array<string>;
  /** Shipping service names for the promotion. */
  shippingServiceNames?: Array<string>;
  /** The money off amount offered in the promotion. */
  moneyOffAmount?: PriceAmount;
}

export const Promotion: Schema.Schema<Promotion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      longTitle: Schema.optional(Schema.String),
      minimumPurchaseAmount: Schema.optional(PriceAmount),
      genericRedemptionCode: Schema.optional(Schema.String),
      redemptionRestriction: Schema.optional(Schema.String),
      maxDiscountAmount: Schema.optional(PriceAmount),
      promotionEffectiveDates: Schema.optional(Schema.String),
      redemptionChannel: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
      promotionDisplayTimePeriod: Schema.optional(TimePeriod),
      itemGroupId: Schema.optional(Schema.Array(Schema.String)),
      storeCodeExclusion: Schema.optional(Schema.Array(Schema.String)),
      itemGroupIdExclusion: Schema.optional(Schema.Array(Schema.String)),
      limitQuantity: Schema.optional(Schema.Number),
      freeGiftValue: Schema.optional(PriceAmount),
      customRedemptionRestriction: Schema.optional(Schema.String),
      targetCountry: Schema.optional(Schema.String),
      productApplicability: Schema.optional(Schema.String),
      productType: Schema.optional(Schema.Array(Schema.String)),
      freeGiftItemId: Schema.optional(Schema.String),
      moneyBudget: Schema.optional(PriceAmount),
      itemIdExclusion: Schema.optional(Schema.Array(Schema.String)),
      productTypeExclusion: Schema.optional(Schema.Array(Schema.String)),
      contentLanguage: Schema.optional(Schema.String),
      promotionDisplayDates: Schema.optional(Schema.String),
      getThisQuantityDiscounted: Schema.optional(Schema.Number),
      promotionStatus: Schema.optional(PromotionPromotionStatus),
      limitValue: Schema.optional(PriceAmount),
      percentOff: Schema.optional(Schema.Number),
      promotionEffectiveTimePeriod: Schema.optional(TimePeriod),
      freeGiftDescription: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.Array(Schema.String)),
      couponValueType: Schema.optional(Schema.String),
      minimumPurchaseQuantity: Schema.optional(Schema.Number),
      storeCode: Schema.optional(Schema.Array(Schema.String)),
      offerType: Schema.optional(Schema.String),
      brand: Schema.optional(Schema.Array(Schema.String)),
      orderLimit: Schema.optional(Schema.Number),
      brandExclusion: Schema.optional(Schema.Array(Schema.String)),
      storeApplicability: Schema.optional(Schema.String),
      promotionUrl: Schema.optional(Schema.String),
      promotionId: Schema.optional(Schema.String),
      promotionDestinationIds: Schema.optional(Schema.Array(Schema.String)),
      shippingServiceNames: Schema.optional(Schema.Array(Schema.String)),
      moneyOffAmount: Schema.optional(PriceAmount),
    }),
  ).annotate({ identifier: "Promotion" }) as any as Schema.Schema<Promotion>;

export interface RegionalInventory {
  /** The ID uniquely identifying each region. */
  regionId?: string;
  /** The price of the product. */
  price?: Price;
  /** The availability of the product. */
  availability?: string;
  /** A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form. */
  customAttributes?: Array<CustomAttribute>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#regionalInventory`". */
  kind?: string;
  /** A date range represented by a pair of ISO 8601 dates separated by a space, comma, or slash. Both dates might be specified as 'null' if undecided. */
  salePriceEffectiveDate?: string;
  /** The sale price of the product. Mandatory if `sale_price_effective_date` is defined. */
  salePrice?: Price;
}

export const RegionalInventory: Schema.Schema<RegionalInventory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionId: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      availability: Schema.optional(Schema.String),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
      kind: Schema.optional(Schema.String),
      salePriceEffectiveDate: Schema.optional(Schema.String),
      salePrice: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "RegionalInventory",
  }) as any as Schema.Schema<RegionalInventory>;

export interface PosStore {
  /** Required. The street address of the store. */
  storeAddress?: string;
  /** The merchant or store name. */
  storeName?: string;
  /** The website url for the store or merchant. */
  websiteUrl?: string;
  /** The store phone number. */
  phoneNumber?: string;
  /** The business type of the store. */
  gcidCategory?: Array<string>;
  /** Output only. The matching status of POS store and Google Business Profile store. Possible values are: - "`matched`": The POS store is successfully matched with the Google Business Profile store. - "`failed`": The POS store is not matched with the Google Business Profile store. See matching_status_hint for further details. Note that there is up to 48 hours propagation delay for changes in Merchant Center (e.g. creation of new account, accounts linking) and Google Business Profile (e.g. store address update) which may affect the matching status. In such cases, after a delay call [pos.list](https://developers.google.com/shopping-content/reference/rest/v2.1/pos/list) to retrieve the updated matching status. */
  matchingStatus?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posStore`" */
  kind?: string;
  /** The Google Place Id of the store location. */
  placeId?: string;
  /** Required. A store identifier that is unique for the given merchant. */
  storeCode?: string;
  /** Output only. The hint of why the matching has failed. This is only set when matching_status=failed. Possible values are: - "`linked-store-not-found`": There aren't any Google Business Profile stores available for matching. Connect your Merchant Center account with the Google Business Profile account. Or add a new Google Business Profile store corresponding to the POS store. - "`store-match-not-found`": The provided POS store couldn't be matched to any of the connected Google Business Profile stores. Merchant Center account is connected correctly and stores are available on Google Business Profile, but POS store location address does not match with Google Business Profile stores' addresses. Update POS store address or Google Business Profile store address to match correctly. - "`store-match-unverified`": The provided POS store couldn't be matched to any of the connected Google Business Profile stores, as the matched Google Business Profile store is unverified. Go through the Google Business Profile verification process to match correctly. */
  matchingStatusHint?: string;
}

export const PosStore: Schema.Schema<PosStore> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeAddress: Schema.optional(Schema.String),
      storeName: Schema.optional(Schema.String),
      websiteUrl: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
      gcidCategory: Schema.optional(Schema.Array(Schema.String)),
      matchingStatus: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      placeId: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      matchingStatusHint: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PosStore" }) as any as Schema.Schema<PosStore>;

export interface PosSale {
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** A unique ID to group items from the same sale event. */
  saleId?: string;
  /** Required. The price of the item. */
  price?: Price;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posSale`" */
  kind?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
}

export const PosSale: Schema.Schema<PosSale> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentLanguage: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
      saleId: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      itemId: Schema.optional(Schema.String),
      targetCountry: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PosSale" }) as any as Schema.Schema<PosSale>;

export interface PosInventory {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posInventory`" */
  kind?: string;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
  /** Required. The current price of the item. */
  price?: Price;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. The available quantity of the item. */
  quantity?: string;
  /** Global Trade Item Number. */
  gtin?: string;
}

export const PosInventory: Schema.Schema<PosInventory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      pickupMethod: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.String),
      targetCountry: Schema.optional(Schema.String),
      pickupSla: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      contentLanguage: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosInventory",
  }) as any as Schema.Schema<PosInventory>;

export interface PosCustomBatchRequestEntry {
  /** The store information to submit. This should be set only if the method is `insert`. */
  store?: PosStore;
  /** The sale information to submit. This should be set only if the method is `sale`. */
  sale?: PosSale;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the POS data provider. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`delete`" - "`get`" - "`insert`" - "`inventory`" - "`sale`" */
  method?: string;
  /** The ID of the account for which to get/submit data. */
  targetMerchantId?: string;
  /** The store code. This should be set only if the method is `delete` or `get`. */
  storeCode?: string;
  /** The inventory to submit. This should be set only if the method is `inventory`. */
  inventory?: PosInventory;
}

export const PosCustomBatchRequestEntry: Schema.Schema<PosCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      store: Schema.optional(PosStore),
      sale: Schema.optional(PosSale),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      targetMerchantId: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      inventory: Schema.optional(PosInventory),
    }),
  ).annotate({
    identifier: "PosCustomBatchRequestEntry",
  }) as any as Schema.Schema<PosCustomBatchRequestEntry>;

export interface RegionalinventoryCustomBatchRequestEntry {
  /** Price and availability of the product. */
  regionalInventory?: RegionalInventory;
  /** The ID of the product for which to update price and availability. */
  productId?: string;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** Method of the batch request entry. Acceptable values are: - "`insert`" */
  method?: string;
}

export const RegionalinventoryCustomBatchRequestEntry: Schema.Schema<RegionalinventoryCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionalInventory: Schema.optional(RegionalInventory),
      productId: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RegionalinventoryCustomBatchRequestEntry",
  }) as any as Schema.Schema<RegionalinventoryCustomBatchRequestEntry>;

export interface RegionalinventoryCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<RegionalinventoryCustomBatchRequestEntry>;
}

export const RegionalinventoryCustomBatchRequest: Schema.Schema<RegionalinventoryCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(RegionalinventoryCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "RegionalinventoryCustomBatchRequest",
  }) as any as Schema.Schema<RegionalinventoryCustomBatchRequest>;

export interface ReturnPolicyOnlineReturnShippingFee {
  /** Type of return shipping fee. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "FIXED"
    | "CUSTOMER_PAYING_ACTUAL_FEE"
    | (string & {});
  /** Fixed return shipping fee amount. This value is only applicable when type is FIXED. We will treat the return shipping fee as free if type is FIXED and this value is not set. */
  fixedFee?: PriceAmount;
}

export const ReturnPolicyOnlineReturnShippingFee: Schema.Schema<ReturnPolicyOnlineReturnShippingFee> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      fixedFee: Schema.optional(PriceAmount),
    }),
  ).annotate({
    identifier: "ReturnPolicyOnlineReturnShippingFee",
  }) as any as Schema.Schema<ReturnPolicyOnlineReturnShippingFee>;

export interface PosDataProvidersPosDataProvider {
  /** The full name of this POS data Provider. */
  fullName?: string;
  /** The display name of Pos data Provider. */
  displayName?: string;
  /** The ID of the account. */
  providerId?: string;
}

export const PosDataProvidersPosDataProvider: Schema.Schema<PosDataProvidersPosDataProvider> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fullName: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      providerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosDataProvidersPosDataProvider",
  }) as any as Schema.Schema<PosDataProvidersPosDataProvider>;

export interface PosDataProviders {
  /** Country code. */
  country?: string;
  /** A list of POS data providers. */
  posDataProviders?: Array<PosDataProvidersPosDataProvider>;
}

export const PosDataProviders: Schema.Schema<PosDataProviders> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      country: Schema.optional(Schema.String),
      posDataProviders: Schema.optional(
        Schema.Array(PosDataProvidersPosDataProvider),
      ),
    }),
  ).annotate({
    identifier: "PosDataProviders",
  }) as any as Schema.Schema<PosDataProviders>;

export interface ReturnPolicyOnlinePolicy {
  /** Policy type. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "NUMBER_OF_DAYS_AFTER_DELIVERY"
    | "NO_RETURNS"
    | "LIFETIME_RETURNS"
    | (string & {});
  /** The number of days items can be returned after delivery, where one day is defined to be 24 hours after the delivery timestamp. Required for `numberOfDaysAfterDelivery` returns. */
  days?: string;
}

export const ReturnPolicyOnlinePolicy: Schema.Schema<ReturnPolicyOnlinePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      days: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReturnPolicyOnlinePolicy",
  }) as any as Schema.Schema<ReturnPolicyOnlinePolicy>;

export interface ReturnPolicyOnlineReturnReasonCategoryInfo {
  /** The corresponding return shipping fee. This is only applicable when returnLabelSource is not the customer's responsibility. */
  returnShippingFee?: ReturnPolicyOnlineReturnShippingFee;
  /** The corresponding return label source. If the `ReturnMethod` field includes `BY_MAIL`, it is required to specify `ReturnLabelSource` for both `BUYER_REMORSE` and `ITEM_DEFECT` return reason categories. */
  returnLabelSource?:
    | "RETURN_LABEL_SOURCE_UNSPECIFIED"
    | "DOWNLOAD_AND_PRINT"
    | "IN_THE_BOX"
    | "CUSTOMER_RESPONSIBILITY"
    | (string & {});
  /** The return reason category. */
  returnReasonCategory?:
    | "RETURN_REASON_CATEGORY_UNSPECIFIED"
    | "BUYER_REMORSE"
    | "ITEM_DEFECT"
    | (string & {});
}

export const ReturnPolicyOnlineReturnReasonCategoryInfo: Schema.Schema<ReturnPolicyOnlineReturnReasonCategoryInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      returnShippingFee: Schema.optional(ReturnPolicyOnlineReturnShippingFee),
      returnLabelSource: Schema.optional(Schema.String),
      returnReasonCategory: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReturnPolicyOnlineReturnReasonCategoryInfo",
  }) as any as Schema.Schema<ReturnPolicyOnlineReturnReasonCategoryInfo>;

export interface ReturnPolicyOnlineRestockingFee {
  /** Fixed restocking fee. */
  fixedFee?: PriceAmount;
  /** Percent of total price in micros. 15,000,000 means 15% of the total price would be charged. */
  microPercent?: number;
}

export const ReturnPolicyOnlineRestockingFee: Schema.Schema<ReturnPolicyOnlineRestockingFee> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fixedFee: Schema.optional(PriceAmount),
      microPercent: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReturnPolicyOnlineRestockingFee",
  }) as any as Schema.Schema<ReturnPolicyOnlineRestockingFee>;

export interface ReturnPolicyOnline {
  /** The countries of sale where the return policy is applicable. The values must be a valid 2 letter ISO 3166 code, e.g. "US". */
  countries?: Array<string>;
  /** Output only. Return policy ID generated by Google. */
  returnPolicyId?: string;
  /** The item conditions that are accepted for returns. This is required to not be empty unless the type of return policy is noReturns. */
  itemConditions?: Array<
    "ITEM_CONDITION_UNSPECIFIED" | "NEW" | "USED" | (string & {})
  >;
  /** The return policy. */
  policy?: ReturnPolicyOnlinePolicy;
  /** The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns. */
  returnMethods?: Array<
    | "RETURN_METHOD_UNSPECIFIED"
    | "BY_MAIL"
    | "IN_STORE"
    | "AT_A_KIOSK"
    | (string & {})
  >;
  /** The return reason category information. This required to not be empty unless the type of return policy is noReturns. */
  returnReasonCategoryInfo?: Array<ReturnPolicyOnlineReturnReasonCategoryInfo>;
  /** The name of the policy as shown in Merchant Center. */
  name?: string;
  /** The return policy uri. This can used by Google to do a sanity check for the policy. */
  returnPolicyUri?: string;
  /** The restocking fee that applies to all return reason categories. This would be treated as a free restocking fee if the value is not set. */
  restockingFee?: ReturnPolicyOnlineRestockingFee;
  /** The unique user-defined label of the return policy. The same label cannot be used in different return policies for the same country. Policies with the label 'default' will apply to all products, unless a product specifies a return_policy_label attribute. */
  label?: string;
}

export const ReturnPolicyOnline: Schema.Schema<ReturnPolicyOnline> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      countries: Schema.optional(Schema.Array(Schema.String)),
      returnPolicyId: Schema.optional(Schema.String),
      itemConditions: Schema.optional(Schema.Array(Schema.String)),
      policy: Schema.optional(ReturnPolicyOnlinePolicy),
      returnMethods: Schema.optional(Schema.Array(Schema.String)),
      returnReasonCategoryInfo: Schema.optional(
        Schema.Array(ReturnPolicyOnlineReturnReasonCategoryInfo),
      ),
      name: Schema.optional(Schema.String),
      returnPolicyUri: Schema.optional(Schema.String),
      restockingFee: Schema.optional(ReturnPolicyOnlineRestockingFee),
      label: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReturnPolicyOnline",
  }) as any as Schema.Schema<ReturnPolicyOnline>;

export interface ListReturnPolicyOnlineResponse {
  /** The retrieved return policies. */
  returnPolicies?: Array<ReturnPolicyOnline>;
}

export const ListReturnPolicyOnlineResponse: Schema.Schema<ListReturnPolicyOnlineResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      returnPolicies: Schema.optional(Schema.Array(ReturnPolicyOnline)),
    }),
  ).annotate({
    identifier: "ListReturnPolicyOnlineResponse",
  }) as any as Schema.Schema<ListReturnPolicyOnlineResponse>;

export interface AccountStatusAccountLevelIssue {
  /** Issue identifier. */
  id?: string;
  /** Severity of the issue. Acceptable values are: - "`critical`" - "`error`" - "`suggestion`" */
  severity?: string;
  /** Additional details about the issue. */
  detail?: string;
  /** Short description of the issue. */
  title?: string;
  /** The URL of a web page to help resolving this issue. */
  documentation?: string;
  /** Country for which this issue is reported. */
  country?: string;
  /** The destination the issue applies to. If this field is empty then the issue applies to all available destinations. */
  destination?: string;
}

export const AccountStatusAccountLevelIssue: Schema.Schema<AccountStatusAccountLevelIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      documentation: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      destination: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountStatusAccountLevelIssue",
  }) as any as Schema.Schema<AccountStatusAccountLevelIssue>;

export interface AccountStatusStatistics {
  /** Number of active offers. */
  active?: string;
  /** Number of disapproved offers. */
  disapproved?: string;
  /** Number of pending offers. */
  pending?: string;
  /** Number of expiring offers. */
  expiring?: string;
}

export const AccountStatusStatistics: Schema.Schema<AccountStatusStatistics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      active: Schema.optional(Schema.String),
      disapproved: Schema.optional(Schema.String),
      pending: Schema.optional(Schema.String),
      expiring: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountStatusStatistics",
  }) as any as Schema.Schema<AccountStatusStatistics>;

export interface AccountStatusItemLevelIssue {
  /** A detailed issue description in English. */
  detail?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** A short issue description in English. */
  description?: string;
  /** Number of items with this issue. */
  numItems?: string;
  /** The error code of the issue. */
  code?: string;
  /** How this issue affects serving of the offer. */
  servability?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attributeName?: string;
}

export const AccountStatusItemLevelIssue: Schema.Schema<AccountStatusItemLevelIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      detail: Schema.optional(Schema.String),
      documentation: Schema.optional(Schema.String),
      resolution: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      numItems: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      servability: Schema.optional(Schema.String),
      attributeName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountStatusItemLevelIssue",
  }) as any as Schema.Schema<AccountStatusItemLevelIssue>;

export interface AccountStatusProducts {
  /** The destination the data applies to. */
  destination?: string;
  /** The country the data applies to. */
  country?: string;
  /** Aggregated product statistics. */
  statistics?: AccountStatusStatistics;
  /** List of item-level issues. */
  itemLevelIssues?: Array<AccountStatusItemLevelIssue>;
  /** The channel the data applies to. Acceptable values are: - "`local`" - "`online`" */
  channel?: string;
}

export const AccountStatusProducts: Schema.Schema<AccountStatusProducts> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      statistics: Schema.optional(AccountStatusStatistics),
      itemLevelIssues: Schema.optional(
        Schema.Array(AccountStatusItemLevelIssue),
      ),
      channel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountStatusProducts",
  }) as any as Schema.Schema<AccountStatusProducts>;

export interface AccountStatus {
  /** Whether the account's website is claimed or not. */
  websiteClaimed?: boolean;
  /** A list of account level issues. */
  accountLevelIssues?: Array<AccountStatusAccountLevelIssue>;
  /** The ID of the account for which the status is reported. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountStatus`" */
  kind?: string;
  /** List of product-related data by channel, destination, and country. Data in this field may be delayed by up to 30 minutes. */
  products?: Array<AccountStatusProducts>;
  /** How the account is managed. Acceptable values are: - "`manual`" - "`automatic`" */
  accountManagement?: string;
}

export const AccountStatus: Schema.Schema<AccountStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      websiteClaimed: Schema.optional(Schema.Boolean),
      accountLevelIssues: Schema.optional(
        Schema.Array(AccountStatusAccountLevelIssue),
      ),
      accountId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      products: Schema.optional(Schema.Array(AccountStatusProducts)),
      accountManagement: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountStatus",
  }) as any as Schema.Schema<AccountStatus>;

export interface AccountstatusesCustomBatchResponseEntry {
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** The requested account status. Defined if and only if the request was successful. */
  accountStatus?: AccountStatus;
}

export const AccountstatusesCustomBatchResponseEntry: Schema.Schema<AccountstatusesCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
      accountStatus: Schema.optional(AccountStatus),
    }),
  ).annotate({
    identifier: "AccountstatusesCustomBatchResponseEntry",
  }) as any as Schema.Schema<AccountstatusesCustomBatchResponseEntry>;

export interface AccounttaxCustomBatchRequestEntry {
  /** The account tax settings to update. Only defined if the method is `update`. */
  accountTax?: AccountTax;
  /** The method of the batch entry. Acceptable values are: - "`get`" - "`update`" */
  method?: string;
  /** The ID of the account for which to get/update account tax settings. */
  accountId?: string;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
}

export const AccounttaxCustomBatchRequestEntry: Schema.Schema<AccounttaxCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountTax: Schema.optional(AccountTax),
      method: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccounttaxCustomBatchRequestEntry",
  }) as any as Schema.Schema<AccounttaxCustomBatchRequestEntry>;

export interface RenderAccountIssuesRequestPayload {
  /** Optional. How actions with user input form should be handled. If not provided, actions will be returned as links that points merchant to Merchant Center where they can request the action. */
  userInputActionOption?:
    | "USER_INPUT_ACTION_RENDERING_OPTION_UNSPECIFIED"
    | "REDIRECT_TO_MERCHANT_CENTER"
    | "BUILT_IN_USER_INPUT_ACTIONS"
    | (string & {});
  /** Optional. How the detailed content should be returned. Default option is to return the content as a pre-rendered HTML text. */
  contentOption?:
    | "CONTENT_OPTION_UNSPECIFIED"
    | "PRE_RENDERED_HTML"
    | (string & {});
}

export const RenderAccountIssuesRequestPayload: Schema.Schema<RenderAccountIssuesRequestPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userInputActionOption: Schema.optional(Schema.String),
      contentOption: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RenderAccountIssuesRequestPayload",
  }) as any as Schema.Schema<RenderAccountIssuesRequestPayload>;

export interface PosListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posListResponse`". */
  kind?: string;
  resources?: Array<PosStore>;
}

export const PosListResponse: Schema.Schema<PosListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(PosStore)),
    }),
  ).annotate({
    identifier: "PosListResponse",
  }) as any as Schema.Schema<PosListResponse>;

export interface ProductShipping {
  /** Maximum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds. */
  maxHandlingTime?: string;
  /** Maximum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds. */
  maxTransitTime?: string;
  /** Minimum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. minHandlingTime can only be present together with maxHandlingTime; but it's not required if maxHandlingTime is present. */
  minHandlingTime?: string;
  /** The CLDR territory code of the country to which an item will ship. */
  country?: string;
  /** Minimum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. minTransitTime can only be present together with maxTransitTime; but it's not required if maxTransitTime is present. */
  minTransitTime?: string;
  /** A free-form description of the service class or delivery speed. */
  service?: string;
  /** The numeric ID of a location that the shipping rate applies to as defined in the Google Ads API. */
  locationId?: string;
  /** The postal code range that the shipping rate applies to, represented by a postal code, a postal code prefix followed by a * wildcard, a range between two postal codes or two postal code prefixes of equal length. */
  postalCode?: string;
  /** The geographic region to which a shipping rate applies. */
  region?: string;
  /** The location where the shipping is applicable, represented by a location group name. */
  locationGroupName?: string;
  /** Fixed shipping price, represented as a number. */
  price?: Price;
}

export const ProductShipping: Schema.Schema<ProductShipping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxHandlingTime: Schema.optional(Schema.String),
      maxTransitTime: Schema.optional(Schema.String),
      minHandlingTime: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      minTransitTime: Schema.optional(Schema.String),
      service: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      postalCode: Schema.optional(Schema.String),
      region: Schema.optional(Schema.String),
      locationGroupName: Schema.optional(Schema.String),
      price: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "ProductShipping",
  }) as any as Schema.Schema<ProductShipping>;

export interface ProductShippingDimension {
  /** The dimension of the product used to calculate the shipping cost of the item. */
  value?: number;
  /** The unit of value. */
  unit?: string;
}

export const ProductShippingDimension: Schema.Schema<ProductShippingDimension> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductShippingDimension",
  }) as any as Schema.Schema<ProductShippingDimension>;

export interface ProductCertification {
  /** The certification code, for eaxample "123456". Maximum length is 2000 characters. */
  certificationCode?: string;
  /** The certification value (also known as class, level or grade), for example "A+", "C", "gold". Maximum length is 2000 characters. */
  certificationValue?: string;
  /** The name of the certification, for example "EPREL". Maximum length is 2000 characters. */
  certificationName?: string;
  /** The certification authority, for example "European_Commission". Maximum length is 2000 characters. */
  certificationAuthority?: string;
}

export const ProductCertification: Schema.Schema<ProductCertification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      certificationCode: Schema.optional(Schema.String),
      certificationValue: Schema.optional(Schema.String),
      certificationName: Schema.optional(Schema.String),
      certificationAuthority: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductCertification",
  }) as any as Schema.Schema<ProductCertification>;

export interface ProductStructuredDescription {
  /** Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`" */
  digitalSourceType?: string;
  /** Required. The description text. Maximum length is 5000 characters. */
  content?: string;
}

export const ProductStructuredDescription: Schema.Schema<ProductStructuredDescription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      digitalSourceType: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStructuredDescription",
  }) as any as Schema.Schema<ProductStructuredDescription>;

export interface ProductStructuredTitle {
  /** Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`" */
  digitalSourceType?: string;
  /** Required. The title text. Maximum length is 150 characters. */
  content?: string;
}

export const ProductStructuredTitle: Schema.Schema<ProductStructuredTitle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      digitalSourceType: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStructuredTitle",
  }) as any as Schema.Schema<ProductStructuredTitle>;

export interface ProductDimension {
  /** Required. The length value represented as a number. The value can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The length units. Acceptable values are: - "`in`" - "`cm`" */
  unit?: string;
}

export const ProductDimension: Schema.Schema<ProductDimension> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductDimension",
  }) as any as Schema.Schema<ProductDimension>;

export interface Installment {
  /** The number of installments the buyer has to pay. */
  months?: string;
  /** Optional. The initial down payment amount the buyer has to pay. */
  downpayment?: Price;
  /** The amount the buyer has to pay per month. */
  amount?: Price;
  /** Optional. Type of installment payments. Supported values are: - "`finance`" - "`lease`" */
  creditType?: string;
}

export const Installment: Schema.Schema<Installment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      months: Schema.optional(Schema.String),
      downpayment: Schema.optional(Price),
      amount: Schema.optional(Price),
      creditType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Installment",
  }) as any as Schema.Schema<Installment>;

export interface ProductSustainabilityIncentive {
  /** Optional. The percentage of the sale price that the incentive is applied to. */
  percentage?: number;
  /** Required. Sustainability incentive program. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "EV_TAX_CREDIT"
    | "EV_PRICE_DISCOUNT"
    | (string & {});
  /** Optional. The fixed amount of the incentive. */
  amount?: Price;
}

export const ProductSustainabilityIncentive: Schema.Schema<ProductSustainabilityIncentive> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      percentage: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.String),
      amount: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "ProductSustainabilityIncentive",
  }) as any as Schema.Schema<ProductSustainabilityIncentive>;

export interface CloudExportAdditionalProperties {
  /** Unit of the given property. For example, "Pixels" for a TV product. Maximum string size is 256 bytes. */
  unitCode?: string;
  /** Minimum float value of the given property. For example for a TV product 1.00. */
  minValue?: number;
  /** Maximum float value of the given property. For example for a TV product 100.00. */
  maxValue?: number;
  /** Integer values of the given property. For example, 1080 for a screen resolution of a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. */
  intValue?: Array<string>;
  /** Float values of the given property. For example for a TV product 1.2345. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. */
  floatValue?: Array<number>;
  /** Boolean value of the given property. For example for a TV product, "True" or "False" if the screen is UHD. */
  boolValue?: boolean;
  /** Name of the given property. For example, "Screen-Resolution" for a TV product. Maximum string size is 256 characters. */
  propertyName?: string;
  /** Text value of the given property. For example, "8K(UHD)" could be a text value for a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. Maximum string size is 256 characters. */
  textValue?: Array<string>;
}

export const CloudExportAdditionalProperties: Schema.Schema<CloudExportAdditionalProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unitCode: Schema.optional(Schema.String),
      minValue: Schema.optional(Schema.Number),
      maxValue: Schema.optional(Schema.Number),
      intValue: Schema.optional(Schema.Array(Schema.String)),
      floatValue: Schema.optional(Schema.Array(Schema.Number)),
      boolValue: Schema.optional(Schema.Boolean),
      propertyName: Schema.optional(Schema.String),
      textValue: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "CloudExportAdditionalProperties",
  }) as any as Schema.Schema<CloudExportAdditionalProperties>;

export interface ProductProductDetail {
  /** The value of the product detail. */
  attributeValue?: string;
  /** The section header used to group a set of product details. */
  sectionName?: string;
  /** The name of the product detail. */
  attributeName?: string;
}

export const ProductProductDetail: Schema.Schema<ProductProductDetail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attributeValue: Schema.optional(Schema.String),
      sectionName: Schema.optional(Schema.String),
      attributeName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductProductDetail",
  }) as any as Schema.Schema<ProductProductDetail>;

export interface FreeShippingThreshold {
  /** Required. The minimum product price for the shipping cost to become free. Represented as a number. */
  priceThreshold?: Price;
  /** Required. The [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the country to which an item will ship. */
  country?: string;
}

export const FreeShippingThreshold: Schema.Schema<FreeShippingThreshold> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priceThreshold: Schema.optional(Price),
      country: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FreeShippingThreshold",
  }) as any as Schema.Schema<FreeShippingThreshold>;

export interface ProductTax {
  /** The country within which the item is taxed, specified as a CLDR territory code. */
  country?: string;
  /** Should be set to true if tax is charged on shipping. */
  taxShip?: boolean;
  /** The percentage of tax rate that applies to the item price. */
  rate?: number;
  /** The numeric ID of a location that the tax rate applies to as defined in the Google Ads API. */
  locationId?: string;
  /** The postal code range that the tax rate applies to, represented by a ZIP code, a ZIP code prefix using * wildcard, a range between two ZIP codes or two ZIP code prefixes of equal length. Examples: 94114, 94*, 94002-95460, 94*-95*. */
  postalCode?: string;
  /** The geographic region to which the tax rate applies. */
  region?: string;
}

export const ProductTax: Schema.Schema<ProductTax> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      country: Schema.optional(Schema.String),
      taxShip: Schema.optional(Schema.Boolean),
      rate: Schema.optional(Schema.Number),
      locationId: Schema.optional(Schema.String),
      postalCode: Schema.optional(Schema.String),
      region: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ProductTax" }) as any as Schema.Schema<ProductTax>;

export interface LoyaltyProgram {
  /** Optional. The price for members of the given tier (instant discount price). Must be smaller or equal to the regular price. */
  price?: Price;
  /** Required. The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a merchant entity and a loyalty program entity. It must be provided so that system can associate the assets below (for example, price and points) with a merchant. The corresponding program must be linked to the merchant account. */
  programLabel?: string;
  /** Required. The label of the tier within the loyalty program. Must match one of the labels within the program. */
  tierLabel?: string;
  /** Optional. The amount of loyalty points earned on a purchase. */
  loyaltyPoints?: string;
  /** Optional. The shipping label for the loyalty program. You can use this label to indicate whether this offer has the loyalty shipping benefit. If not specified, the item is not eligible for loyalty shipping for the given loyalty tier. */
  shippingLabel?: string;
  /** Optional. The cashback that can be used for future purchases. */
  cashbackForFutureUse?: Price;
  /** Optional. A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash. */
  memberPriceEffectiveDate?: string;
}

export const LoyaltyProgram: Schema.Schema<LoyaltyProgram> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      price: Schema.optional(Price),
      programLabel: Schema.optional(Schema.String),
      tierLabel: Schema.optional(Schema.String),
      loyaltyPoints: Schema.optional(Schema.String),
      shippingLabel: Schema.optional(Schema.String),
      cashbackForFutureUse: Schema.optional(Price),
      memberPriceEffectiveDate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LoyaltyProgram",
  }) as any as Schema.Schema<LoyaltyProgram>;

export interface ProductWeight {
  /** Required. The weight represented as a number. The weight can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The weight unit. Acceptable values are: - "`g`" - "`kg`" - "`oz`" - "`lb`" */
  unit?: string;
}

export const ProductWeight: Schema.Schema<ProductWeight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductWeight",
  }) as any as Schema.Schema<ProductWeight>;

export interface ProductShippingWeight {
  /** The weight of the product used to calculate the shipping cost of the item. */
  value?: number;
  /** The unit of value. */
  unit?: string;
}

export const ProductShippingWeight: Schema.Schema<ProductShippingWeight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductShippingWeight",
  }) as any as Schema.Schema<ProductShippingWeight>;

export interface ProductSubscriptionCost {
  /** The type of subscription period. - "`month`" - "`year`" */
  period?: string;
  /** The number of subscription periods the buyer has to pay. */
  periodLength?: string;
  /** The amount the buyer has to pay per subscription period. */
  amount?: Price;
}

export const ProductSubscriptionCost: Schema.Schema<ProductSubscriptionCost> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      period: Schema.optional(Schema.String),
      periodLength: Schema.optional(Schema.String),
      amount: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "ProductSubscriptionCost",
  }) as any as Schema.Schema<ProductSubscriptionCost>;

export interface Product {
  /** Additional cut of the item. Used together with size_type to represent combined size types for apparel items. */
  additionalSizeType?: string;
  /** Shipping rules. */
  shipping?: Array<ProductShipping>;
  /** List of country codes (ISO 3166-1 alpha-2) to exclude the offer from Shopping Ads destination. Countries from this list are removed from countries configured in MC feed settings. */
  shoppingAdsExcludedCountries?: Array<string>;
  /** Date on which the item should expire, as specified upon insertion, in ISO 8601 format. The actual expiration date in Google Shopping is exposed in `productstatuses` as `googleExpirationDate` and might be earlier if `expirationDate` is too far in the future. */
  expirationDate?: string;
  /** Advertiser-specified recommendations. */
  displayAdsSimilarIds?: Array<string>;
  /** Cost of goods sold. Used for gross profit reporting. */
  costOfGoodsSold?: Price;
  /** URL for the canonical version of your item's landing page. */
  canonicalLink?: string;
  /** Description of the item. */
  description?: string;
  /** Width of the item for shipping. */
  shippingWidth?: ProductShippingDimension;
  /** URL for the mobile-optimized version of your item's landing page. */
  mobileLink?: string;
  /** An identifier for an item for dynamic remarketing campaigns. */
  displayAdsId?: string;
  /** The preference of the denominator of the unit price. */
  unitPricingBaseMeasure?: ProductUnitPricingBaseMeasure;
  /** Advertised sale price of the item. */
  salePrice?: Price;
  /** URL of an image of the item. */
  imageLink?: string;
  /** Product [certification](https://support.google.com/merchants/answer/13528839), introduced for EU energy efficiency labeling compliance using the [EU EPREL](https://eprel.ec.europa.eu/screen/home) database. */
  certifications?: Array<ProductCertification>;
  /** Availability status of the item. */
  availability?: string;
  /** Structured description, for algorithmically (AI)-generated descriptions. */
  structuredDescription?: ProductStructuredDescription;
  /** A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google (formerly known as Shopping Actions). */
  customAttributes?: Array<CustomAttribute>;
  /** The date time when an offer becomes visible in search results across Google’s YouTube surfaces, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. See [Disclosure date](https://support.google.com/merchants/answer/13034208) for more information. */
  disclosureDate?: string;
  /** Item store pickup timeline. Acceptable values are: - "`same day`" - "`next day`" - "`2-day`" - "`3-day`" - "`4-day`" - "`5-day`" - "`6-day`" - "`7-day`" - "`multi-week`" */
  pickupSla?: string;
  /** The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted. */
  excludedDestinations?: Array<string>;
  /** The material of which the item is made. */
  material?: string;
  /** The energy efficiency class as defined in EU directive 2010/30/EU. */
  maxEnergyEfficiencyClass?: string;
  /** Structured title, for algorithmically (AI)-generated titles. */
  structuredTitle?: ProductStructuredTitle;
  /** The width of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productWidth?: ProductDimension;
  /** Number and amount of installments to pay for an item. */
  installment?: Installment;
  /** URL directly linking to your item's page on your website. */
  link?: string;
  /** Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same `itemGroupId` value (see size definition). */
  sizes?: Array<string>;
  /** Optional. The list of sustainability incentive programs. */
  sustainabilityIncentives?: Array<ProductSustainabilityIncentive>;
  /** Extra fields to export to the Cloud Retail program. */
  cloudExportAdditionalProperties?: Array<CloudExportAdditionalProperties>;
  /** The transit time label of the product, used to group product in account-level transit time tables. */
  transitTimeLabel?: string;
  /** Required. The item's channel (online or local). Acceptable values are: - "`local`" - "`online`" */
  channel?: string;
  /** Custom label 0 for custom grouping of items in a Shopping campaign. */
  customLabel0?: string;
  /** The unique ID of a promotion. */
  promotionIds?: Array<string>;
  /** Manufacturer Part Number (MPN) of the item. */
  mpn?: string;
  /** URL template for merchant hosted local storefront optimized for mobile devices. */
  mobileLinkTemplate?: string;
  /** Maximum retail price (MRP) of the item. Applicable to India only. */
  maximumRetailPrice?: Price;
  /** The number of identical products in a merchant-defined multipack. */
  multipack?: string;
  /** Custom label 2 for custom grouping of items in a Shopping campaign. */
  customLabel2?: string;
  /** Custom label 4 for custom grouping of items in a Shopping campaign. */
  customLabel4?: string;
  /** The quantity of the product that is available for selling on Google. Supported only for online products. */
  sellOnGoogleQuantity?: string;
  /** Allows advertisers to override the item URL when the product is shown within the context of Product Ads. */
  adsRedirect?: string;
  /** Technical specification or additional product details. */
  productDetails?: Array<ProductProductDetail>;
  /** Required. A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted. See the products feed specification for details. *Note:* Content API methods that operate on products take the REST ID of the product, *not* this identifier. */
  offerId?: string;
  /** Optional. Conditions to be met for a product to have free shipping. */
  freeShippingThreshold?: Array<FreeShippingThreshold>;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required for multi-seller accounts. Use this attribute if you're a marketplace uploading products for various sellers to your multi-seller account. */
  externalSellerId?: string;
  /** A safeguard in the [Automated Discounts](//support.google.com/merchants/answer/10295759) and [Dynamic Promotions](//support.google.com/merchants/answer/13949249) projects, ensuring that discounts on merchants' offers do not fall below this value, thereby preserving the offer's value and profitability. */
  autoPricingMinPrice?: Price;
  /** Bullet points describing the most relevant highlights of a product. */
  productHighlights?: Array<string>;
  /** The cut of the item. Recommended for apparel items. */
  sizeType?: string;
  /** Maximal product handling time (in business days). */
  maxHandlingTime?: string;
  /** URL template for merchant hosted local storefront. */
  linkTemplate?: string;
  /** The pick up option for the item. Acceptable values are: - "`buy`" - "`reserve`" - "`ship to store`" - "`not supported`" */
  pickupMethod?: string;
  /** False when the item does not have unique product identifiers appropriate to its category, such as GTIN, MPN, and brand. Required according to the Unique Product Identifier Rules for all target countries except for Canada. */
  identifierExists?: boolean;
  /** Tax information. */
  taxes?: Array<ProductTax>;
  /** Custom label 3 for custom grouping of items in a Shopping campaign. */
  customLabel3?: string;
  /** The length of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productLength?: ProductDimension;
  /** The REST ID of the product. Content API methods that operate on products take this as their `productId` parameter. The REST ID for a product has one of the 2 forms channel:contentLanguage: targetCountry: offerId or channel:contentLanguage:feedLabel: offerId. */
  id?: string;
  /** Date range during which the item is on sale (see product data specification ). */
  salePriceEffectiveDate?: string;
  /** Offer margin for dynamic remarketing campaigns. */
  displayAdsValue?: number;
  /** Height of the item for shipping. */
  shippingHeight?: ProductShippingDimension;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#product`" */
  kind?: string;
  /** The day a pre-ordered product becomes available for delivery, in ISO 8601 format. */
  availabilityDate?: string;
  /** Categories of the item (formatted as in product data specification). */
  productTypes?: Array<string>;
  /** Optional. A list of loyalty program information that is used to surface loyalty benefits (for example, better pricing, points, etc) to the user of this item. */
  loyaltyPrograms?: Array<LoyaltyProgram>;
  /** Required. The CLDR territory code for the item's country of sale. */
  targetCountry?: string;
  /** The weight of the product in the units provided. The value must be between 0 (exclusive) and 2000 (inclusive). */
  productWeight?: ProductWeight;
  /** Whether the item is a merchant-defined bundle. A bundle is a custom grouping of different products sold by a merchant for a single price. */
  isBundle?: boolean;
  /** Title of the item. */
  title?: string;
  /** Google's category of the item (see [Google product taxonomy](https://support.google.com/merchants/answer/1705911)). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API. */
  googleProductCategory?: string;
  /** Target gender of the item. */
  gender?: string;
  /** System in which the size is specified. Recommended for apparel items. */
  sizeSystem?: string;
  /** Additional URLs of images of the item. */
  additionalImageLinks?: Array<string>;
  /** The item's pattern (for example, polka dots). */
  pattern?: string;
  /** Condition or state of the item. */
  condition?: string;
  /** The energy efficiency class as defined in EU directive 2010/30/EU. */
  minEnergyEfficiencyClass?: string;
  /** Custom label 1 for custom grouping of items in a Shopping campaign. */
  customLabel1?: string;
  /** Additional URLs of lifestyle images of the item. Used to explicitly identify images that showcase your item in a real-world context. See the Help Center article for more information. */
  lifestyleImageLinks?: Array<string>;
  /** Brand of the item. */
  brand?: string;
  /** Price of the item. */
  price?: Price;
  /** Length of the item for shipping. */
  shippingLength?: ProductShippingDimension;
  /** Target age group of the item. */
  ageGroup?: string;
  /** Shared identifier for all variants of the same product. */
  itemGroupId?: string;
  /** The energy efficiency class as defined in EU directive 2010/30/EU. */
  energyEfficiencyClass?: string;
  /** Global Trade Item Number (GTIN) of the item. */
  gtin?: string;
  /** Should be set to true if the item is targeted towards adults. */
  adult?: boolean;
  /** URL of the 3D model of the item to provide more visuals. */
  virtualModelLink?: string;
  /** The height of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productHeight?: ProductDimension;
  /** URL directly to your item's landing page for dynamic remarketing campaigns. */
  displayAdsLink?: string;
  /** Weight of the item for shipping. */
  shippingWeight?: ProductShippingWeight;
  /** Title of an item for dynamic remarketing campaigns. */
  displayAdsTitle?: string;
  /** Feed label for the item. Either `targetCountry` or `feedLabel` is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). */
  feedLabel?: string;
  /** Number of periods (months or years) and amount of payment per period for an item with an associated subscription contract. */
  subscriptionCost?: ProductSubscriptionCost;
  /** Output only. The source of the offer, that is, how the offer was created. Acceptable values are: - "`api`" - "`crawl`" - "`feed`" */
  source?: string;
  /** Color of the item. */
  color?: string;
  /** The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`. */
  includedDestinations?: Array<string>;
  /** Loyalty program information that is used to surface loyalty benefits ( for example, better pricing, points, etc) to the user of this item. This signular field points to the latest uploaded loyalty program info. This field will be deprecated in the coming weeks and should not be used in favor of the plural 'LoyaltyProgram' field below. */
  loyaltyProgram?: LoyaltyProgram;
  /** Similar to ads_grouping, but only works on CPC. */
  adsLabels?: Array<string>;
  /** The shipping label of the product, used to group product in account-level shipping rules. */
  shippingLabel?: string;
  /** Minimal product handling time (in business days). */
  minHandlingTime?: string;
  /** The tax category of the product, used to configure detailed tax nexus in account-level tax settings. */
  taxCategory?: string;
  /** Publication of this item should be temporarily paused. Acceptable values are: - "`ads`" */
  pause?: string;
  /** The measure and dimension of an item. */
  unitPricingMeasure?: ProductUnitPricingMeasure;
  /** Used to group items in an arbitrary way. Only for CPA%, discouraged otherwise. */
  adsGrouping?: string;
}

export const Product: Schema.Schema<Product> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      additionalSizeType: Schema.optional(Schema.String),
      shipping: Schema.optional(Schema.Array(ProductShipping)),
      shoppingAdsExcludedCountries: Schema.optional(
        Schema.Array(Schema.String),
      ),
      expirationDate: Schema.optional(Schema.String),
      displayAdsSimilarIds: Schema.optional(Schema.Array(Schema.String)),
      costOfGoodsSold: Schema.optional(Price),
      canonicalLink: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      shippingWidth: Schema.optional(ProductShippingDimension),
      mobileLink: Schema.optional(Schema.String),
      displayAdsId: Schema.optional(Schema.String),
      unitPricingBaseMeasure: Schema.optional(ProductUnitPricingBaseMeasure),
      salePrice: Schema.optional(Price),
      imageLink: Schema.optional(Schema.String),
      certifications: Schema.optional(Schema.Array(ProductCertification)),
      availability: Schema.optional(Schema.String),
      structuredDescription: Schema.optional(ProductStructuredDescription),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
      disclosureDate: Schema.optional(Schema.String),
      pickupSla: Schema.optional(Schema.String),
      excludedDestinations: Schema.optional(Schema.Array(Schema.String)),
      material: Schema.optional(Schema.String),
      maxEnergyEfficiencyClass: Schema.optional(Schema.String),
      structuredTitle: Schema.optional(ProductStructuredTitle),
      productWidth: Schema.optional(ProductDimension),
      installment: Schema.optional(Installment),
      link: Schema.optional(Schema.String),
      sizes: Schema.optional(Schema.Array(Schema.String)),
      sustainabilityIncentives: Schema.optional(
        Schema.Array(ProductSustainabilityIncentive),
      ),
      cloudExportAdditionalProperties: Schema.optional(
        Schema.Array(CloudExportAdditionalProperties),
      ),
      transitTimeLabel: Schema.optional(Schema.String),
      channel: Schema.optional(Schema.String),
      customLabel0: Schema.optional(Schema.String),
      promotionIds: Schema.optional(Schema.Array(Schema.String)),
      mpn: Schema.optional(Schema.String),
      mobileLinkTemplate: Schema.optional(Schema.String),
      maximumRetailPrice: Schema.optional(Price),
      multipack: Schema.optional(Schema.String),
      customLabel2: Schema.optional(Schema.String),
      customLabel4: Schema.optional(Schema.String),
      sellOnGoogleQuantity: Schema.optional(Schema.String),
      adsRedirect: Schema.optional(Schema.String),
      productDetails: Schema.optional(Schema.Array(ProductProductDetail)),
      offerId: Schema.optional(Schema.String),
      freeShippingThreshold: Schema.optional(
        Schema.Array(FreeShippingThreshold),
      ),
      contentLanguage: Schema.optional(Schema.String),
      externalSellerId: Schema.optional(Schema.String),
      autoPricingMinPrice: Schema.optional(Price),
      productHighlights: Schema.optional(Schema.Array(Schema.String)),
      sizeType: Schema.optional(Schema.String),
      maxHandlingTime: Schema.optional(Schema.String),
      linkTemplate: Schema.optional(Schema.String),
      pickupMethod: Schema.optional(Schema.String),
      identifierExists: Schema.optional(Schema.Boolean),
      taxes: Schema.optional(Schema.Array(ProductTax)),
      customLabel3: Schema.optional(Schema.String),
      productLength: Schema.optional(ProductDimension),
      id: Schema.optional(Schema.String),
      salePriceEffectiveDate: Schema.optional(Schema.String),
      displayAdsValue: Schema.optional(Schema.Number),
      shippingHeight: Schema.optional(ProductShippingDimension),
      kind: Schema.optional(Schema.String),
      availabilityDate: Schema.optional(Schema.String),
      productTypes: Schema.optional(Schema.Array(Schema.String)),
      loyaltyPrograms: Schema.optional(Schema.Array(LoyaltyProgram)),
      targetCountry: Schema.optional(Schema.String),
      productWeight: Schema.optional(ProductWeight),
      isBundle: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
      googleProductCategory: Schema.optional(Schema.String),
      gender: Schema.optional(Schema.String),
      sizeSystem: Schema.optional(Schema.String),
      additionalImageLinks: Schema.optional(Schema.Array(Schema.String)),
      pattern: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      minEnergyEfficiencyClass: Schema.optional(Schema.String),
      customLabel1: Schema.optional(Schema.String),
      lifestyleImageLinks: Schema.optional(Schema.Array(Schema.String)),
      brand: Schema.optional(Schema.String),
      price: Schema.optional(Price),
      shippingLength: Schema.optional(ProductShippingDimension),
      ageGroup: Schema.optional(Schema.String),
      itemGroupId: Schema.optional(Schema.String),
      energyEfficiencyClass: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
      adult: Schema.optional(Schema.Boolean),
      virtualModelLink: Schema.optional(Schema.String),
      productHeight: Schema.optional(ProductDimension),
      displayAdsLink: Schema.optional(Schema.String),
      shippingWeight: Schema.optional(ProductShippingWeight),
      displayAdsTitle: Schema.optional(Schema.String),
      feedLabel: Schema.optional(Schema.String),
      subscriptionCost: Schema.optional(ProductSubscriptionCost),
      source: Schema.optional(Schema.String),
      color: Schema.optional(Schema.String),
      includedDestinations: Schema.optional(Schema.Array(Schema.String)),
      loyaltyProgram: Schema.optional(LoyaltyProgram),
      adsLabels: Schema.optional(Schema.Array(Schema.String)),
      shippingLabel: Schema.optional(Schema.String),
      minHandlingTime: Schema.optional(Schema.String),
      taxCategory: Schema.optional(Schema.String),
      pause: Schema.optional(Schema.String),
      unitPricingMeasure: Schema.optional(ProductUnitPricingMeasure),
      adsGrouping: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface ProductsCustomBatchResponseEntry {
  /** The inserted product. Only defined if the method is `insert` and if the request was successful. */
  product?: Product;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productsCustomBatchResponseEntry`" */
  kind?: string;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
}

export const ProductsCustomBatchResponseEntry: Schema.Schema<ProductsCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      product: Schema.optional(Product),
      kind: Schema.optional(Schema.String),
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ProductsCustomBatchResponseEntry",
  }) as any as Schema.Schema<ProductsCustomBatchResponseEntry>;

export interface ProductsCustomBatchResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productsCustomBatchResponse`". */
  kind?: string;
  /** The result of the execution of the batch requests. */
  entries?: Array<ProductsCustomBatchResponseEntry>;
}

export const ProductsCustomBatchResponse: Schema.Schema<ProductsCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      entries: Schema.optional(Schema.Array(ProductsCustomBatchResponseEntry)),
    }),
  ).annotate({
    identifier: "ProductsCustomBatchResponse",
  }) as any as Schema.Schema<ProductsCustomBatchResponse>;

export interface AccountstatusesListResponse {
  /** The token for the retrieval of the next page of account statuses. */
  nextPageToken?: string;
  resources?: Array<AccountStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountstatusesListResponse`". */
  kind?: string;
}

export const AccountstatusesListResponse: Schema.Schema<AccountstatusesListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(AccountStatus)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountstatusesListResponse",
  }) as any as Schema.Schema<AccountstatusesListResponse>;

export interface ShippingsettingsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<ShippingsettingsCustomBatchRequestEntry>;
}

export const ShippingsettingsCustomBatchRequest: Schema.Schema<ShippingsettingsCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(ShippingsettingsCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "ShippingsettingsCustomBatchRequest",
  }) as any as Schema.Schema<ShippingsettingsCustomBatchRequest>;

export interface AccountsUpdateLabelsRequest {
  /** The IDs of labels that should be assigned to the account. */
  labelIds?: Array<string>;
}

export const AccountsUpdateLabelsRequest: Schema.Schema<AccountsUpdateLabelsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AccountsUpdateLabelsRequest",
  }) as any as Schema.Schema<AccountsUpdateLabelsRequest>;

export interface RegionalinventoryCustomBatchResponseEntry {
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#regionalinventoryCustomBatchResponseEntry`". */
  kind?: string;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** Price and availability of the product. */
  regionalInventory?: RegionalInventory;
}

export const RegionalinventoryCustomBatchResponseEntry: Schema.Schema<RegionalinventoryCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Errors),
      kind: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      regionalInventory: Schema.optional(RegionalInventory),
    }),
  ).annotate({
    identifier: "RegionalinventoryCustomBatchResponseEntry",
  }) as any as Schema.Schema<RegionalinventoryCustomBatchResponseEntry>;

export interface RegionalinventoryCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<RegionalinventoryCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#regionalinventoryCustomBatchResponse`". */
  kind?: string;
}

export const RegionalinventoryCustomBatchResponse: Schema.Schema<RegionalinventoryCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(RegionalinventoryCustomBatchResponseEntry),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RegionalinventoryCustomBatchResponse",
  }) as any as Schema.Schema<RegionalinventoryCustomBatchResponse>;

export interface PickupServicesPickupService {
  /** The name of the carrier (for example, `"UPS"`). Always present. */
  carrierName?: string;
  /** The CLDR country code of the carrier (for example, "US"). Always present. */
  country?: string;
  /** The name of the pickup service (for example, `"Access point"`). Always present. */
  serviceName?: string;
}

export const PickupServicesPickupService: Schema.Schema<PickupServicesPickupService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      carrierName: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      serviceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PickupServicesPickupService",
  }) as any as Schema.Schema<PickupServicesPickupService>;

export interface ShippingsettingsGetSupportedPickupServicesResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsGetSupportedPickupServicesResponse`". */
  kind?: string;
  /** A list of supported pickup services. May be empty. */
  pickupServices?: Array<PickupServicesPickupService>;
}

export const ShippingsettingsGetSupportedPickupServicesResponse: Schema.Schema<ShippingsettingsGetSupportedPickupServicesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      pickupServices: Schema.optional(
        Schema.Array(PickupServicesPickupService),
      ),
    }),
  ).annotate({
    identifier: "ShippingsettingsGetSupportedPickupServicesResponse",
  }) as any as Schema.Schema<ShippingsettingsGetSupportedPickupServicesResponse>;

export interface VerifyPhoneNumberResponse {
  /** Verified phone number if verification is successful. This phone number can only be replaced by another verified phone number. */
  verifiedPhoneNumber?: string;
}

export const VerifyPhoneNumberResponse: Schema.Schema<VerifyPhoneNumberResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verifiedPhoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerifyPhoneNumberResponse",
  }) as any as Schema.Schema<VerifyPhoneNumberResponse>;

export interface Css {
  /** Output only. Immutable. The ID of the CSS group this CSS domain is affiliated with. Only populated for CSS group users. */
  cssGroupId?: string;
  /** A list of label IDs that are assigned to this CSS domain by its CSS group. Only populated for CSS group users. */
  labelIds?: Array<string>;
  /** Output only. Immutable. The CSS domain's full name. */
  fullName?: string;
  /** Output only. Immutable. The CSS domain ID. */
  cssDomainId?: string;
  /** Output only. Immutable. The CSS domain's display name, used when space is constrained. */
  displayName?: string;
  /** Output only. Immutable. The CSS domain's homepage. */
  homepageUri?: string;
}

export const Css: Schema.Schema<Css> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cssGroupId: Schema.optional(Schema.String),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      fullName: Schema.optional(Schema.String),
      cssDomainId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      homepageUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Css" }) as any as Schema.Schema<Css>;

export interface ListCssesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The CSS domains affiliated with the specified CSS group. */
  csses?: Array<Css>;
}

export const ListCssesResponse: Schema.Schema<ListCssesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      csses: Schema.optional(Schema.Array(Css)),
    }),
  ).annotate({
    identifier: "ListCssesResponse",
  }) as any as Schema.Schema<ListCssesResponse>;

export interface GmbAccountsGmbAccount {
  /** The type of the Business Profile (User or Business). */
  type?: string;
  /** The name of the Business Profile. */
  name?: string;
  /** The email which identifies the Business Profile. */
  email?: string;
  /** Number of listings under this account. */
  listingCount?: string;
}

export const GmbAccountsGmbAccount: Schema.Schema<GmbAccountsGmbAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      listingCount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GmbAccountsGmbAccount",
  }) as any as Schema.Schema<GmbAccountsGmbAccount>;

export interface GmbAccounts {
  /** The ID of the Merchant Center account. */
  accountId?: string;
  /** A list of Business Profiles which are available to the merchant. */
  gmbAccounts?: Array<GmbAccountsGmbAccount>;
}

export const GmbAccounts: Schema.Schema<GmbAccounts> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      gmbAccounts: Schema.optional(Schema.Array(GmbAccountsGmbAccount)),
    }),
  ).annotate({
    identifier: "GmbAccounts",
  }) as any as Schema.Schema<GmbAccounts>;

export interface LiasettingsCustomBatchResponseEntry {
  /** The retrieved or updated Lia settings. */
  liaSettings?: LiaSettings;
  /** The list of POS data providers. */
  posDataProviders?: Array<PosDataProviders>;
  /** The updated omnichannel experience for a country. */
  omnichannelExperience?: LiaOmnichannelExperience;
  /** The ID of the request entry to which this entry responds. */
  batchId?: number;
  /** A list of errors defined if, and only if, the request failed. */
  errors?: Errors;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsCustomBatchResponseEntry`" */
  kind?: string;
  /** The list of accessible Business Profiles. */
  gmbAccounts?: GmbAccounts;
}

export const LiasettingsCustomBatchResponseEntry: Schema.Schema<LiasettingsCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      liaSettings: Schema.optional(LiaSettings),
      posDataProviders: Schema.optional(Schema.Array(PosDataProviders)),
      omnichannelExperience: Schema.optional(LiaOmnichannelExperience),
      batchId: Schema.optional(Schema.Number),
      errors: Schema.optional(Errors),
      kind: Schema.optional(Schema.String),
      gmbAccounts: Schema.optional(GmbAccounts),
    }),
  ).annotate({
    identifier: "LiasettingsCustomBatchResponseEntry",
  }) as any as Schema.Schema<LiasettingsCustomBatchResponseEntry>;

export interface LiasettingsCustomBatchResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsCustomBatchResponse`". */
  kind?: string;
  /** The result of the execution of the batch requests. */
  entries?: Array<LiasettingsCustomBatchResponseEntry>;
}

export const LiasettingsCustomBatchResponse: Schema.Schema<LiasettingsCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      entries: Schema.optional(
        Schema.Array(LiasettingsCustomBatchResponseEntry),
      ),
    }),
  ).annotate({
    identifier: "LiasettingsCustomBatchResponse",
  }) as any as Schema.Schema<LiasettingsCustomBatchResponse>;

export interface LiasettingsGetAccessibleGmbAccountsResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsGetAccessibleGmbAccountsResponse`". */
  kind?: string;
  /** The ID of the Merchant Center account. */
  accountId?: string;
  /** A list of Business Profiles which are available to the merchant. */
  gmbAccounts?: Array<GmbAccountsGmbAccount>;
}

export const LiasettingsGetAccessibleGmbAccountsResponse: Schema.Schema<LiasettingsGetAccessibleGmbAccountsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      gmbAccounts: Schema.optional(Schema.Array(GmbAccountsGmbAccount)),
    }),
  ).annotate({
    identifier: "LiasettingsGetAccessibleGmbAccountsResponse",
  }) as any as Schema.Schema<LiasettingsGetAccessibleGmbAccountsResponse>;

export interface ProductstatusesCustomBatchResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productstatusesCustomBatchResponse`". */
  kind?: string;
  /** The result of the execution of the batch requests. */
  entries?: Array<ProductstatusesCustomBatchResponseEntry>;
}

export const ProductstatusesCustomBatchResponse: Schema.Schema<ProductstatusesCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      entries: Schema.optional(
        Schema.Array(ProductstatusesCustomBatchResponseEntry),
      ),
    }),
  ).annotate({
    identifier: "ProductstatusesCustomBatchResponse",
  }) as any as Schema.Schema<ProductstatusesCustomBatchResponse>;

export interface ProductstatusesListResponse {
  /** The token for the retrieval of the next page of products statuses. */
  nextPageToken?: string;
  resources?: Array<ProductStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productstatusesListResponse`". */
  kind?: string;
}

export const ProductstatusesListResponse: Schema.Schema<ProductstatusesListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(ProductStatus)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductstatusesListResponse",
  }) as any as Schema.Schema<ProductstatusesListResponse>;

export interface FreeListingsProgramStatusReviewIneligibilityReasonDetails {
  /** This timestamp represents end of cooldown period for review ineligbility reason `IN_COOLDOWN_PERIOD`. */
  cooldownTime?: string;
}

export const FreeListingsProgramStatusReviewIneligibilityReasonDetails: Schema.Schema<FreeListingsProgramStatusReviewIneligibilityReasonDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cooldownTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FreeListingsProgramStatusReviewIneligibilityReasonDetails",
  }) as any as Schema.Schema<FreeListingsProgramStatusReviewIneligibilityReasonDetails>;

export interface AccountsClaimWebsiteResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsClaimWebsiteResponse`". */
  kind?: string;
}

export const AccountsClaimWebsiteResponse: Schema.Schema<AccountsClaimWebsiteResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsClaimWebsiteResponse",
  }) as any as Schema.Schema<AccountsClaimWebsiteResponse>;

export interface RegionGeoTargetArea {
  /** Required. A non-empty list of [location IDs](https://developers.google.com/adwords/api/docs/appendix/geotargeting). They must all be of the same location type (e.g., state). */
  geotargetCriteriaIds?: Array<string>;
}

export const RegionGeoTargetArea: Schema.Schema<RegionGeoTargetArea> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      geotargetCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RegionGeoTargetArea",
  }) as any as Schema.Schema<RegionGeoTargetArea>;

export interface RegionPostalCodeAreaPostalCodeRange {
  /** Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: "94108", "9410*", "9*". */
  begin?: string;
  /** Optional. A postal code or a pattern of the form prefix* denoting the inclusive upper bound of the range defining the area. It must have the same length as postalCodeRangeBegin: if postalCodeRangeBegin is a postal code then postalCodeRangeEnd must be a postal code too; if postalCodeRangeBegin is a pattern then postalCodeRangeEnd must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching postalCodeRangeBegin. */
  end?: string;
}

export const RegionPostalCodeAreaPostalCodeRange: Schema.Schema<RegionPostalCodeAreaPostalCodeRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      begin: Schema.optional(Schema.String),
      end: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RegionPostalCodeAreaPostalCodeRange",
  }) as any as Schema.Schema<RegionPostalCodeAreaPostalCodeRange>;

export interface RegionPostalCodeArea {
  /** Required. CLDR territory code or the country the postal code group applies to. */
  regionCode?: string;
  /** Required. A range of postal codes. */
  postalCodes?: Array<RegionPostalCodeAreaPostalCodeRange>;
}

export const RegionPostalCodeArea: Schema.Schema<RegionPostalCodeArea> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
      postalCodes: Schema.optional(
        Schema.Array(RegionPostalCodeAreaPostalCodeRange),
      ),
    }),
  ).annotate({
    identifier: "RegionPostalCodeArea",
  }) as any as Schema.Schema<RegionPostalCodeArea>;

export interface Region {
  /** Output only. Indicates if the region is eligible to use in the Shipping Services configuration. */
  shippingEligible?: boolean;
  /** The display name of the region. */
  displayName?: string;
  /** Output only. Indicates if the region is eligible to use in the Regional Inventory configuration. */
  regionalInventoryEligible?: boolean;
  /** A list of geotargets that defines the region area. */
  geotargetArea?: RegionGeoTargetArea;
  /** A list of postal codes that defines the region area. */
  postalCodeArea?: RegionPostalCodeArea;
  /** Output only. Immutable. Merchant that owns the region. */
  merchantId?: string;
  /** Output only. Immutable. The ID uniquely identifying each region. */
  regionId?: string;
}

export const Region: Schema.Schema<Region> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shippingEligible: Schema.optional(Schema.Boolean),
      displayName: Schema.optional(Schema.String),
      regionalInventoryEligible: Schema.optional(Schema.Boolean),
      geotargetArea: Schema.optional(RegionGeoTargetArea),
      postalCodeArea: Schema.optional(RegionPostalCodeArea),
      merchantId: Schema.optional(Schema.String),
      regionId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Region" }) as any as Schema.Schema<Region>;

export interface ListRegionsResponse {
  /** The regions from the specified merchant. */
  regions?: Array<Region>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListRegionsResponse: Schema.Schema<ListRegionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regions: Schema.optional(Schema.Array(Region)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRegionsResponse",
  }) as any as Schema.Schema<ListRegionsResponse>;

export interface SearchResponse {
  /** Rows that matched the search query. */
  results?: Array<ReportRow>;
  /** Token which can be sent as `page_token` to retrieve the next page. If omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const SearchResponse: Schema.Schema<SearchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      results: Schema.optional(Schema.Array(ReportRow)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchResponse",
  }) as any as Schema.Schema<SearchResponse>;

export interface ShippingsettingsCustomBatchResponseEntry {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsCustomBatchResponseEntry`" */
  kind?: string;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry to which this entry responds. */
  batchId?: number;
  /** The retrieved or updated account shipping settings. */
  shippingSettings?: ShippingSettings;
}

export const ShippingsettingsCustomBatchResponseEntry: Schema.Schema<ShippingsettingsCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
      shippingSettings: Schema.optional(ShippingSettings),
    }),
  ).annotate({
    identifier: "ShippingsettingsCustomBatchResponseEntry",
  }) as any as Schema.Schema<ShippingsettingsCustomBatchResponseEntry>;

export interface ShippingsettingsCustomBatchResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsCustomBatchResponse`". */
  kind?: string;
  /** The result of the execution of the batch requests. */
  entries?: Array<ShippingsettingsCustomBatchResponseEntry>;
}

export const ShippingsettingsCustomBatchResponse: Schema.Schema<ShippingsettingsCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      entries: Schema.optional(
        Schema.Array(ShippingsettingsCustomBatchResponseEntry),
      ),
    }),
  ).annotate({
    identifier: "ShippingsettingsCustomBatchResponse",
  }) as any as Schema.Schema<ShippingsettingsCustomBatchResponse>;

export interface RecommendationCallToAction {
  /** Output only. Intent of the action. This value describes the intent (for example, `OPEN_CREATE_EMAIL_CAMPAIGN_FLOW`) and can vary from recommendation to recommendation. This value can change over time for the same recommendation. Currently available intent values: - OPEN_CREATE_EMAIL_CAMPAIGN_FLOW: Opens a user journey where they can create a marketing email campaign. (No default URL) - OPEN_CREATE_COLLECTION_TAB: Opens a user journey where they can [create a collection](https://support.google.com/merchants/answer/9703228) for their Merchant account. (No default URL) */
  intent?: string;
  /** Optional. URL of the CTA. This field will only be set for some recommendations where there is a suggested landing URL. Otherwise it will be set to an empty string. We recommend developers to use their own custom landing page according to the description of the intent field above when this uri field is empty. */
  uri?: string;
  /** Output only. Localized text of the CTA. Optional. */
  localizedText?: string;
}

export const RecommendationCallToAction: Schema.Schema<RecommendationCallToAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intent: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      localizedText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RecommendationCallToAction",
  }) as any as Schema.Schema<RecommendationCallToAction>;

export interface RecommendationDescription {
  /** Output only. Type of the description. */
  type?: "DESCRIPTION_TYPE_UNSPECIFIED" | "SHORT" | "LONG" | (string & {});
  /** Output only. Text of the description. */
  text?: string;
}

export const RecommendationDescription: Schema.Schema<RecommendationDescription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RecommendationDescription",
  }) as any as Schema.Schema<RecommendationDescription>;

export interface RecommendationCreative {
  /** URL of the creative. */
  uri?: string;
  /** Type of the creative. */
  type?: "CREATIVE_TYPE_UNSPECIFIED" | "VIDEO" | "PHOTO" | (string & {});
}

export const RecommendationCreative: Schema.Schema<RecommendationCreative> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RecommendationCreative",
  }) as any as Schema.Schema<RecommendationCreative>;

export interface Recommendation {
  /** Optional. Subtype of the recommendations. Only applicable when multiple recommendations can be generated per type, and is used as an identifier of recommendation under the same recommendation type. */
  subType?: string;
  /** Optional. Default CTA of the recommendation. */
  defaultCallToAction?: RecommendationCallToAction;
  /** Output only. Type of the recommendation. List of currently available recommendation types: - OPPORTUNITY_CREATE_NEW_COLLECTION - OPPORTUNITY_CREATE_EMAIL_CAMPAIGN */
  type?: string;
  /** Optional. Localized recommendation description. The localization the {@link `GenerateRecommendationsRequest.language_code`} field in {@link `GenerateRecommendationsRequest`} requests. */
  defaultDescription?: string;
  /** Output only. List of additional localized descriptions for a recommendation. Localication uses the `languageCode` field in `GenerateRecommendations` requests. Not all description types are guaranteed to be present and we recommend to rely on default description. */
  additionalDescriptions?: Array<RecommendationDescription>;
  /** Output only. CTAs of this recommendation. Repeated. */
  additionalCallToAction?: Array<RecommendationCallToAction>;
  /** Optional. Indicates whether a user needs to pay when they complete the user journey suggested by the recommendation. */
  paid?: boolean;
  /** Output only. Any creatives attached to the recommendation. Repeated. */
  creative?: Array<RecommendationCreative>;
  /** Optional. Localized recommendation name. The localization uses the {@link `GenerateRecommendationsRequest.language_code`} field in {@link `GenerateRecommendationsRequest`} requests. */
  recommendationName?: string;
  /** Optional. A numerical score of the impact from the recommendation's description. For example, a recommendation might suggest an upward trend in sales for a certain product. Higher number means larger impact. */
  numericalImpact?: number;
  /** Optional. Localized Recommendation Title. Localization uses the {@link `GenerateRecommendationsRequest.language_code`} field in {@link `GenerateRecommendationsRequest`} requests. */
  title?: string;
}

export const Recommendation: Schema.Schema<Recommendation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subType: Schema.optional(Schema.String),
      defaultCallToAction: Schema.optional(RecommendationCallToAction),
      type: Schema.optional(Schema.String),
      defaultDescription: Schema.optional(Schema.String),
      additionalDescriptions: Schema.optional(
        Schema.Array(RecommendationDescription),
      ),
      additionalCallToAction: Schema.optional(
        Schema.Array(RecommendationCallToAction),
      ),
      paid: Schema.optional(Schema.Boolean),
      creative: Schema.optional(Schema.Array(RecommendationCreative)),
      recommendationName: Schema.optional(Schema.String),
      numericalImpact: Schema.optional(Schema.Number),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Recommendation",
  }) as any as Schema.Schema<Recommendation>;

export interface GenerateRecommendationsResponse {
  /** Output only. Response token is a string created for each `GenerateRecommendationsResponse`. This token doesn't expire, and is globally unique. This token must be used when reporting interactions for recommendations. */
  responseToken?: string;
  /** Recommendations generated for a request. */
  recommendations?: Array<Recommendation>;
}

export const GenerateRecommendationsResponse: Schema.Schema<GenerateRecommendationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseToken: Schema.optional(Schema.String),
      recommendations: Schema.optional(Schema.Array(Recommendation)),
    }),
  ).annotate({
    identifier: "GenerateRecommendationsResponse",
  }) as any as Schema.Schema<GenerateRecommendationsResponse>;

export interface AccountsUpdateLabelsResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsUpdateLabelsResponse`". */
  kind?: string;
}

export const AccountsUpdateLabelsResponse: Schema.Schema<AccountsUpdateLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsUpdateLabelsResponse",
  }) as any as Schema.Schema<AccountsUpdateLabelsResponse>;

export interface DatafeedstatusesCustomBatchRequestEntry {
  /** The language to get the datafeed status for. If this parameter is provided then `country` must also be provided. Note that for multi-target datafeeds this parameter is required. */
  language?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" */
  method?: string;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The ID of the data feed to get. */
  datafeedId?: string;
  /** Deprecated. Use `feedLabel` instead. The country to get the datafeed status for. If this parameter is provided, then `language` must also be provided. Note that for multi-target datafeeds this parameter is required. */
  country?: string;
  /** The feed label to get the datafeed status for. If this parameter is provided, then `language` must also be provided. Note that for multi-target datafeeds this parameter is required. */
  feedLabel?: string;
}

export const DatafeedstatusesCustomBatchRequestEntry: Schema.Schema<DatafeedstatusesCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      language: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      datafeedId: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      feedLabel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedstatusesCustomBatchRequestEntry",
  }) as any as Schema.Schema<DatafeedstatusesCustomBatchRequestEntry>;

export interface DatafeedstatusesCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<DatafeedstatusesCustomBatchRequestEntry>;
}

export const DatafeedstatusesCustomBatchRequest: Schema.Schema<DatafeedstatusesCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(DatafeedstatusesCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "DatafeedstatusesCustomBatchRequest",
  }) as any as Schema.Schema<DatafeedstatusesCustomBatchRequest>;

export interface LocalinventoryCustomBatchResponseEntry {
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#localinventoryCustomBatchResponseEntry`" */
  kind?: string;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
}

export const LocalinventoryCustomBatchResponseEntry: Schema.Schema<LocalinventoryCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Errors),
      kind: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "LocalinventoryCustomBatchResponseEntry",
  }) as any as Schema.Schema<LocalinventoryCustomBatchResponseEntry>;

export interface AccountsCustomBatchResponseEntry {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsCustomBatchResponseEntry`" */
  kind?: string;
  /** The retrieved, created, or updated account. Not defined if the method was `delete`, `claimwebsite` or `link`. */
  account?: Account;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
}

export const AccountsCustomBatchResponseEntry: Schema.Schema<AccountsCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      account: Schema.optional(Account),
      errors: Schema.optional(Errors),
      batchId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AccountsCustomBatchResponseEntry",
  }) as any as Schema.Schema<AccountsCustomBatchResponseEntry>;

export interface DatafeedsCustomBatchResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedsCustomBatchResponse`". */
  kind?: string;
  /** The result of the execution of the batch requests. */
  entries?: Array<DatafeedsCustomBatchResponseEntry>;
}

export const DatafeedsCustomBatchResponse: Schema.Schema<DatafeedsCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      entries: Schema.optional(Schema.Array(DatafeedsCustomBatchResponseEntry)),
    }),
  ).annotate({
    identifier: "DatafeedsCustomBatchResponse",
  }) as any as Schema.Schema<DatafeedsCustomBatchResponse>;

export interface MethodQuota {
  /** Output only. The maximum number of calls allowed per day for the method. */
  quotaLimit?: string;
  /** Output only. The method name, for example `products.list`. Method name does not contain version because quota can be shared between different API versions of the same method. */
  method?: string;
  /** Output only. The maximum number of calls allowed per minute for the method. */
  quotaMinuteLimit?: string;
  /** Output only. The current quota usage, meaning the number of calls already made to the method per day. Usage is reset every day at 12 PM midday UTC. */
  quotaUsage?: string;
}

export const MethodQuota: Schema.Schema<MethodQuota> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      quotaLimit: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      quotaMinuteLimit: Schema.optional(Schema.String),
      quotaUsage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MethodQuota",
  }) as any as Schema.Schema<MethodQuota>;

export interface PosSaleRequest {
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** A unique ID to group items from the same sale event. */
  saleId?: string;
  /** Required. The price of the item. */
  price?: Price;
}

export const PosSaleRequest: Schema.Schema<PosSaleRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      itemId: Schema.optional(Schema.String),
      targetCountry: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      saleId: Schema.optional(Schema.String),
      price: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "PosSaleRequest",
  }) as any as Schema.Schema<PosSaleRequest>;

export interface FreeListingsProgramStatusRegionStatus {
  /** Issues evaluated in the review process. Fix all issues before requesting a review. */
  reviewIssues?: Array<string>;
  /** Eligibility status of the standard free listing program. */
  eligibilityStatus?:
    | "STATE_UNSPECIFIED"
    | "APPROVED"
    | "DISAPPROVED"
    | "WARNING"
    | "UNDER_REVIEW"
    | "PENDING_REVIEW"
    | "ONBOARDING"
    | (string & {});
  /** Additional information for ineligibility. If `reviewIneligibilityReason` is `IN_COOLDOWN_PERIOD`, a timestamp for the end of the cooldown period is provided. */
  reviewIneligibilityReasonDetails?: FreeListingsProgramStatusReviewIneligibilityReasonDetails;
  /** The two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for all the regions with the same `eligibilityStatus` and `reviewEligibility`. */
  regionCodes?: Array<string>;
  /** Reason a program in a specific region isn’t eligible for review. Only visible if `reviewEligibilityStatus` is `INELIGIBLE`. */
  reviewIneligibilityReasonDescription?: string;
  /** Issues that must be fixed to be eligible for review. */
  onboardingIssues?: Array<string>;
  /** Review ineligibility reason if account is not eligible for review. */
  reviewIneligibilityReason?:
    | "REVIEW_INELIGIBILITY_REASON_UNSPECIFIED"
    | "ONBOARDING_ISSUES"
    | "NOT_ENOUGH_OFFERS"
    | "IN_COOLDOWN_PERIOD"
    | "ALREADY_UNDER_REVIEW"
    | "NO_REVIEW_REQUIRED"
    | "WILL_BE_REVIEWED_AUTOMATICALLY"
    | "IS_RETIRED"
    | "ALREADY_REVIEWED"
    | (string & {});
  /** If a program is eligible for review in a specific region. Only visible if `eligibilityStatus` is `DISAPPROVED`. */
  reviewEligibilityStatus?:
    | "REVIEW_ELIGIBILITY_UNSPECIFIED"
    | "ELIGIBLE"
    | "INELIGIBLE"
    | (string & {});
  /** Date by which eligibilityStatus will go from `WARNING` to `DISAPPROVED`. Only visible when your eligibilityStatus is WARNING. In [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DD`. */
  disapprovalDate?: string;
}

export const FreeListingsProgramStatusRegionStatus: Schema.Schema<FreeListingsProgramStatusRegionStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reviewIssues: Schema.optional(Schema.Array(Schema.String)),
      eligibilityStatus: Schema.optional(Schema.String),
      reviewIneligibilityReasonDetails: Schema.optional(
        FreeListingsProgramStatusReviewIneligibilityReasonDetails,
      ),
      regionCodes: Schema.optional(Schema.Array(Schema.String)),
      reviewIneligibilityReasonDescription: Schema.optional(Schema.String),
      onboardingIssues: Schema.optional(Schema.Array(Schema.String)),
      reviewIneligibilityReason: Schema.optional(Schema.String),
      reviewEligibilityStatus: Schema.optional(Schema.String),
      disapprovalDate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FreeListingsProgramStatusRegionStatus",
  }) as any as Schema.Schema<FreeListingsProgramStatusRegionStatus>;

export interface CarriersCarrier {
  /** The CLDR country code of the carrier (for example, "US"). Always present. */
  country?: string;
  /** The name of the carrier (for example, `"UPS"`). Always present. */
  name?: string;
  /** A list of supported services (for example, `"ground"`) for that carrier. Contains at least one service. This is the list of valid values for CarrierRate.carrierService. */
  services?: Array<string>;
  /** A list of services supported for EDD (Estimated Delivery Date) calculation. This is the list of valid values for WarehouseBasedDeliveryTime.carrierService. */
  eddServices?: Array<string>;
}

export const CarriersCarrier: Schema.Schema<CarriersCarrier> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      country: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      services: Schema.optional(Schema.Array(Schema.String)),
      eddServices: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "CarriersCarrier",
  }) as any as Schema.Schema<CarriersCarrier>;

export interface PosCustomBatchResponseEntry {
  /** The updated inventory information. */
  inventory?: PosInventory;
  /** The ID of the request entry to which this entry responds. */
  batchId?: number;
  /** A list of errors defined if, and only if, the request failed. */
  errors?: Errors;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posCustomBatchResponseEntry`" */
  kind?: string;
  /** The retrieved or updated store information. */
  store?: PosStore;
  /** The updated sale information. */
  sale?: PosSale;
}

export const PosCustomBatchResponseEntry: Schema.Schema<PosCustomBatchResponseEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventory: Schema.optional(PosInventory),
      batchId: Schema.optional(Schema.Number),
      errors: Schema.optional(Errors),
      kind: Schema.optional(Schema.String),
      store: Schema.optional(PosStore),
      sale: Schema.optional(PosSale),
    }),
  ).annotate({
    identifier: "PosCustomBatchResponseEntry",
  }) as any as Schema.Schema<PosCustomBatchResponseEntry>;

export interface PosCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<PosCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posCustomBatchResponse`". */
  kind?: string;
}

export const PosCustomBatchResponse: Schema.Schema<PosCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(PosCustomBatchResponseEntry)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosCustomBatchResponse",
  }) as any as Schema.Schema<PosCustomBatchResponse>;

export interface ProductsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productsListResponse`". */
  kind?: string;
  resources?: Array<Product>;
  /** The token for the retrieval of the next page of products. */
  nextPageToken?: string;
}

export const ProductsListResponse: Schema.Schema<ProductsListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(Product)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductsListResponse",
  }) as any as Schema.Schema<ProductsListResponse>;

export interface RequestReviewFreeListingsRequest {
  /** The code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country for which review is to be requested. */
  regionCode?: string;
}

export const RequestReviewFreeListingsRequest: Schema.Schema<RequestReviewFreeListingsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RequestReviewFreeListingsRequest",
  }) as any as Schema.Schema<RequestReviewFreeListingsRequest>;

export interface LiasettingsRequestGmbAccessResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsRequestGmbAccessResponse`". */
  kind?: string;
}

export const LiasettingsRequestGmbAccessResponse: Schema.Schema<LiasettingsRequestGmbAccessResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsRequestGmbAccessResponse",
  }) as any as Schema.Schema<LiasettingsRequestGmbAccessResponse>;

export interface AccountReturnCarrier {
  /** Name of the carrier account. */
  carrierAccountName?: string;
  /** Number of the carrier account. */
  carrierAccountNumber?: string;
  /** The carrier code enum. Accepts the values FEDEX or UPS. */
  carrierCode?: "CARRIER_CODE_UNSPECIFIED" | "FEDEX" | "UPS" | (string & {});
  /** Output only. Immutable. The Google-provided unique carrier ID, used to update the resource. */
  carrierAccountId?: string;
}

export const AccountReturnCarrier: Schema.Schema<AccountReturnCarrier> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      carrierAccountName: Schema.optional(Schema.String),
      carrierAccountNumber: Schema.optional(Schema.String),
      carrierCode: Schema.optional(Schema.String),
      carrierAccountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountReturnCarrier",
  }) as any as Schema.Schema<AccountReturnCarrier>;

export interface AlternateDisputeResolution {
  /** The URL pointing to a page, where merchant can request alternative dispute resolution with an [external body](https://support.google.com/european-union-digital-services-act-redress-options/answer/13535501). */
  uri?: string;
  /** The label for the alternate dispute resolution link. */
  label?: string;
}

export const AlternateDisputeResolution: Schema.Schema<AlternateDisputeResolution> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AlternateDisputeResolution",
  }) as any as Schema.Schema<AlternateDisputeResolution>;

export interface RenderProductIssuesResponse {
  /** List of issues for a given product. This list can be shown with compressed, expandable items. In the compressed form, the title and impact should be shown for each issue. Once the issue is expanded, the detailed content and available actions should be rendered. */
  issues?: Array<ProductIssue>;
  /** Alternate Dispute Resolution (ADR) is deprecated. Use `prerendered_out_of_court_dispute_settlement` instead. */
  alternateDisputeResolution?: AlternateDisputeResolution;
}

export const RenderProductIssuesResponse: Schema.Schema<RenderProductIssuesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      issues: Schema.optional(Schema.Array(ProductIssue)),
      alternateDisputeResolution: Schema.optional(AlternateDisputeResolution),
    }),
  ).annotate({
    identifier: "RenderProductIssuesResponse",
  }) as any as Schema.Schema<RenderProductIssuesResponse>;

export interface UndeleteConversionSourceRequest {}

export const UndeleteConversionSourceRequest: Schema.Schema<UndeleteConversionSourceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UndeleteConversionSourceRequest",
  }) as any as Schema.Schema<UndeleteConversionSourceRequest>;

export interface AccountsCustomBatchRequestEntryLinkRequest {
  /** Provided services. Acceptable values are: - "`shoppingAdsProductManagement`" - "`shoppingActionsProductManagement`" - "`shoppingActionsOrderManagement`" - "`paymentProcessing`" - "`localProductManagement`" */
  services?: Array<string>;
  /** Action to perform for this link. The `"request"` action is only available to select merchants. Acceptable values are: - "`approve`" - "`remove`" - "`request`" */
  action?: string;
  /** The ID of the linked account. */
  linkedAccountId?: string;
  /** Type of the link between the two accounts. Acceptable values are: - "`channelPartner`" - "`eCommercePlatform`" - "`paymentServiceProvider`" - "`localProductManager`" */
  linkType?: string;
}

export const AccountsCustomBatchRequestEntryLinkRequest: Schema.Schema<AccountsCustomBatchRequestEntryLinkRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      services: Schema.optional(Schema.Array(Schema.String)),
      action: Schema.optional(Schema.String),
      linkedAccountId: Schema.optional(Schema.String),
      linkType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsCustomBatchRequestEntryLinkRequest",
  }) as any as Schema.Schema<AccountsCustomBatchRequestEntryLinkRequest>;

export interface AccountsCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** Whether the account should be deleted if the account has offers. Only applicable if the method is `delete`. */
  force?: boolean;
  /** Details about the `link` request. */
  linkRequest?: AccountsCustomBatchRequestEntryLinkRequest;
  /** The account to create or update. Only defined if the method is `insert` or `update`. */
  account?: Account;
  /** Only applicable if the method is `claimwebsite`. Indicates whether or not to take the claim from another account in case there is a conflict. */
  overwrite?: boolean;
  /** The method of the batch entry. Acceptable values are: - "`claimWebsite`" - "`delete`" - "`get`" - "`insert`" - "`link`" - "`update`" */
  method?: string;
  /** The ID of the targeted account. Only defined if the method is not `insert`. */
  accountId?: string;
  /** Label IDs for the 'updatelabels' request. */
  labelIds?: Array<string>;
  /** Controls which fields are visible. Only applicable if the method is 'get'. */
  view?: string;
}

export const AccountsCustomBatchRequestEntry: Schema.Schema<AccountsCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      force: Schema.optional(Schema.Boolean),
      linkRequest: Schema.optional(AccountsCustomBatchRequestEntryLinkRequest),
      account: Schema.optional(Account),
      overwrite: Schema.optional(Schema.Boolean),
      method: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      view: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsCustomBatchRequestEntry",
  }) as any as Schema.Schema<AccountsCustomBatchRequestEntry>;

export interface AccountsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<AccountsCustomBatchRequestEntry>;
}

export const AccountsCustomBatchRequest: Schema.Schema<AccountsCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(AccountsCustomBatchRequestEntry)),
    }),
  ).annotate({
    identifier: "AccountsCustomBatchRequest",
  }) as any as Schema.Schema<AccountsCustomBatchRequest>;

export interface AccountstatusesCustomBatchRequestEntry {
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: Array<string>;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" */
  method?: string;
  /** The ID of the (sub-)account whose status to get. */
  accountId?: string;
}

export const AccountstatusesCustomBatchRequestEntry: Schema.Schema<AccountstatusesCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destinations: Schema.optional(Schema.Array(Schema.String)),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountstatusesCustomBatchRequestEntry",
  }) as any as Schema.Schema<AccountstatusesCustomBatchRequestEntry>;

export interface AccountstatusesCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<AccountstatusesCustomBatchRequestEntry>;
}

export const AccountstatusesCustomBatchRequest: Schema.Schema<AccountstatusesCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(AccountstatusesCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "AccountstatusesCustomBatchRequest",
  }) as any as Schema.Schema<AccountstatusesCustomBatchRequest>;

export interface AccountLabel {
  /** Immutable. The ID of account this label belongs to. */
  accountId?: string;
  /** Output only. The type of this label. */
  labelType?: "LABEL_TYPE_UNSPECIFIED" | "MANUAL" | "AUTOMATIC" | (string & {});
  /** Output only. The ID of the label. */
  labelId?: string;
  /** The display name of this label. */
  name?: string;
  /** The description of this label. */
  description?: string;
}

export const AccountLabel: Schema.Schema<AccountLabel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      labelType: Schema.optional(Schema.String),
      labelId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountLabel",
  }) as any as Schema.Schema<AccountLabel>;

export interface ListAccountLabelsResponse {
  /** The labels from the specified account. */
  accountLabels?: Array<AccountLabel>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountLabelsResponse: Schema.Schema<ListAccountLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountLabels: Schema.optional(Schema.Array(AccountLabel)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountLabelsResponse",
  }) as any as Schema.Schema<ListAccountLabelsResponse>;

export interface OrderTrackingSignalShipmentLineItemMapping {
  /** Required. The line item ID. */
  lineItemId?: string;
  /** Required. The shipment ID. This field will be hashed in returned OrderTrackingSignal creation response. */
  shipmentId?: string;
  /** The line item quantity in the shipment. */
  quantity?: string;
}

export const OrderTrackingSignalShipmentLineItemMapping: Schema.Schema<OrderTrackingSignalShipmentLineItemMapping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineItemId: Schema.optional(Schema.String),
      shipmentId: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrderTrackingSignalShipmentLineItemMapping",
  }) as any as Schema.Schema<OrderTrackingSignalShipmentLineItemMapping>;

export interface AccounttaxCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<AccounttaxCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accounttaxCustomBatchResponse`". */
  kind?: string;
}

export const AccounttaxCustomBatchResponse: Schema.Schema<AccounttaxCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(AccounttaxCustomBatchResponseEntry),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccounttaxCustomBatchResponse",
  }) as any as Schema.Schema<AccounttaxCustomBatchResponse>;

export interface ProductsCustomBatchRequestEntry {
  /** The comma-separated list of product attributes to be updated. Example: `"title,salePrice"`. Attributes specified in the update mask without a value specified in the body will be deleted from the product. *You must specify the update mask to delete attributes.* Only top-level product attributes can be updated. If not defined, product attributes with set values will be updated and other attributes will stay unchanged. Only defined if the method is `update`. */
  updateMask?: string;
  /** The ID of the product to get or mutate. Only defined if the method is `get`, `delete`, or `update`. */
  productId?: string;
  /** The Content API Supplemental Feed ID. If present then product insertion or deletion applies to a supplemental feed instead of primary Content API feed. */
  feedId?: string;
  /** The product to insert or update. Only required if the method is `insert` or `update`. If the `update` method is used with `updateMask` only to delete a field, then this isn't required. For example, setting `salePrice` on the `updateMask` and not providing a `product` will result in an existing sale price on the product specified by `productId` being deleted. */
  product?: Product;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`delete`" - "`get`" - "`insert`" - "`update`" */
  method?: string;
}

export const ProductsCustomBatchRequestEntry: Schema.Schema<ProductsCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateMask: Schema.optional(Schema.String),
      productId: Schema.optional(Schema.String),
      feedId: Schema.optional(Schema.String),
      product: Schema.optional(Product),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductsCustomBatchRequestEntry",
  }) as any as Schema.Schema<ProductsCustomBatchRequestEntry>;

export interface ProductsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<ProductsCustomBatchRequestEntry>;
}

export const ProductsCustomBatchRequest: Schema.Schema<ProductsCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(ProductsCustomBatchRequestEntry)),
    }),
  ).annotate({
    identifier: "ProductsCustomBatchRequest",
  }) as any as Schema.Schema<ProductsCustomBatchRequest>;

export interface LiasettingsListResponse {
  resources?: Array<LiaSettings>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsListResponse`". */
  kind?: string;
  /** The token for the retrieval of the next page of LIA settings. */
  nextPageToken?: string;
}

export const LiasettingsListResponse: Schema.Schema<LiasettingsListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(LiaSettings)),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsListResponse",
  }) as any as Schema.Schema<LiasettingsListResponse>;

export interface ListAccountReturnCarrierResponse {
  /** List of all available account return carriers for the merchant. */
  accountReturnCarriers?: Array<AccountReturnCarrier>;
}

export const ListAccountReturnCarrierResponse: Schema.Schema<ListAccountReturnCarrierResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountReturnCarriers: Schema.optional(
        Schema.Array(AccountReturnCarrier),
      ),
    }),
  ).annotate({
    identifier: "ListAccountReturnCarrierResponse",
  }) as any as Schema.Schema<ListAccountReturnCarrierResponse>;

export interface AccountstatusesCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<AccountstatusesCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountstatusesCustomBatchResponse`". */
  kind?: string;
}

export const AccountstatusesCustomBatchResponse: Schema.Schema<AccountstatusesCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(AccountstatusesCustomBatchResponseEntry),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountstatusesCustomBatchResponse",
  }) as any as Schema.Schema<AccountstatusesCustomBatchResponse>;

export interface HolidaysHoliday {
  /** Date of the holiday, in ISO 8601 format. For example, "2016-12-25" for Christmas 2016. Always present. */
  date?: string;
  /** Date on which the order has to arrive at the customer's, in ISO 8601 format. For example, "2016-12-24" for 24th December 2016. Always present. */
  deliveryGuaranteeDate?: string;
  /** The holiday type. Always present. Acceptable values are: - "`Christmas`" - "`Easter`" - "`Father's Day`" - "`Halloween`" - "`Independence Day (USA)`" - "`Mother's Day`" - "`Thanksgiving`" - "`Valentine's Day`" */
  type?: string;
  /** Hour of the day in the delivery location's timezone on the guaranteed delivery date by which the order has to arrive at the customer's. Possible values are: 0 (midnight), 1, ..., 12 (noon), 13, ..., 23. Always present. */
  deliveryGuaranteeHour?: string;
  /** The CLDR territory code of the country in which the holiday is available. For example, "US", "DE", "GB". A holiday cutoff can only be configured in a shipping settings service with matching delivery country. Always present. */
  countryCode?: string;
  /** Unique identifier for the holiday to be used when configuring holiday cutoffs. Always present. */
  id?: string;
}

export const HolidaysHoliday: Schema.Schema<HolidaysHoliday> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      date: Schema.optional(Schema.String),
      deliveryGuaranteeDate: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      deliveryGuaranteeHour: Schema.optional(Schema.String),
      countryCode: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HolidaysHoliday",
  }) as any as Schema.Schema<HolidaysHoliday>;

export interface InsertCheckoutSettingsRequest {
  /** Required. The `UrlSettings` for the request. The presence of URL settings indicates `Checkout` enrollment. */
  uriSettings?: UrlSettings;
}

export const InsertCheckoutSettingsRequest: Schema.Schema<InsertCheckoutSettingsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uriSettings: Schema.optional(UrlSettings),
    }),
  ).annotate({
    identifier: "InsertCheckoutSettingsRequest",
  }) as any as Schema.Schema<InsertCheckoutSettingsRequest>;

export interface AccountCredentials {
  /** Indicates to Google how Google should use these OAuth tokens. */
  purpose?:
    | "ACCOUNT_CREDENTIALS_PURPOSE_UNSPECIFIED"
    | "SHOPIFY_ORDER_MANAGEMENT"
    | "SHOPIFY_INTEGRATION"
    | (string & {});
  /** An OAuth access token. */
  accessToken?: string;
  /** The amount of time, in seconds, after which the access token is no longer valid. */
  expiresIn?: string;
}

export const AccountCredentials: Schema.Schema<AccountCredentials> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      purpose: Schema.optional(Schema.String),
      accessToken: Schema.optional(Schema.String),
      expiresIn: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountCredentials",
  }) as any as Schema.Schema<AccountCredentials>;

export interface LiasettingsListPosDataProvidersResponse {
  /** The list of POS data providers for each eligible country */
  posDataProviders?: Array<PosDataProviders>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsListPosDataProvidersResponse`". */
  kind?: string;
}

export const LiasettingsListPosDataProvidersResponse: Schema.Schema<LiasettingsListPosDataProvidersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      posDataProviders: Schema.optional(Schema.Array(PosDataProviders)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsListPosDataProvidersResponse",
  }) as any as Schema.Schema<LiasettingsListPosDataProvidersResponse>;

export interface LiasettingsSetInventoryVerificationContactResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsSetInventoryVerificationContactResponse`". */
  kind?: string;
}

export const LiasettingsSetInventoryVerificationContactResponse: Schema.Schema<LiasettingsSetInventoryVerificationContactResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsSetInventoryVerificationContactResponse",
  }) as any as Schema.Schema<LiasettingsSetInventoryVerificationContactResponse>;

export interface PosCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<PosCustomBatchRequestEntry>;
}

export const PosCustomBatchRequest: Schema.Schema<PosCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(PosCustomBatchRequestEntry)),
    }),
  ).annotate({
    identifier: "PosCustomBatchRequest",
  }) as any as Schema.Schema<PosCustomBatchRequest>;

export interface TriggerActionResponse {
  /** The message for merchant. */
  message?: string;
}

export const TriggerActionResponse: Schema.Schema<TriggerActionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TriggerActionResponse",
  }) as any as Schema.Schema<TriggerActionResponse>;

export interface LiasettingsSetPosDataProviderResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsSetPosDataProviderResponse`". */
  kind?: string;
}

export const LiasettingsSetPosDataProviderResponse: Schema.Schema<LiasettingsSetPosDataProviderResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsSetPosDataProviderResponse",
  }) as any as Schema.Schema<LiasettingsSetPosDataProviderResponse>;

export interface ShippingsettingsGetSupportedCarriersResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsGetSupportedCarriersResponse`". */
  kind?: string;
  /** A list of supported carriers. May be empty. */
  carriers?: Array<CarriersCarrier>;
}

export const ShippingsettingsGetSupportedCarriersResponse: Schema.Schema<ShippingsettingsGetSupportedCarriersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      carriers: Schema.optional(Schema.Array(CarriersCarrier)),
    }),
  ).annotate({
    identifier: "ShippingsettingsGetSupportedCarriersResponse",
  }) as any as Schema.Schema<ShippingsettingsGetSupportedCarriersResponse>;

export interface PosInventoryRequest {
  /** Required. The current price of the item. */
  price?: Price;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The available quantity of the item. */
  quantity?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
}

export const PosInventoryRequest: Schema.Schema<PosInventoryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      price: Schema.optional(Price),
      gtin: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      storeCode: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
      pickupMethod: Schema.optional(Schema.String),
      targetCountry: Schema.optional(Schema.String),
      pickupSla: Schema.optional(Schema.String),
      itemId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PosInventoryRequest",
  }) as any as Schema.Schema<PosInventoryRequest>;

export interface LocalinventoryCustomBatchResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#localinventoryCustomBatchResponse`". */
  kind?: string;
  /** The result of the execution of the batch requests. */
  entries?: Array<LocalinventoryCustomBatchResponseEntry>;
}

export const LocalinventoryCustomBatchResponse: Schema.Schema<LocalinventoryCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      entries: Schema.optional(
        Schema.Array(LocalinventoryCustomBatchResponseEntry),
      ),
    }),
  ).annotate({
    identifier: "LocalinventoryCustomBatchResponse",
  }) as any as Schema.Schema<LocalinventoryCustomBatchResponse>;

export interface ListPromotionResponse {
  /** List of all available promotions for the merchant. */
  promotions?: Array<Promotion>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPromotionResponse: Schema.Schema<ListPromotionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      promotions: Schema.optional(Schema.Array(Promotion)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPromotionResponse",
  }) as any as Schema.Schema<ListPromotionResponse>;

export interface AccountIssue {
  /** Title of the issue. */
  title?: string;
  /** A list of actionable steps that can be executed to solve the issue. An example is requesting a re-review or providing arguments when merchant disagrees with the issue. Actions that are supported in (your) third-party application can be rendered as buttons and should be available to merchant when they expand the issue. */
  actions?: Array<Action>;
  /** Details of the issue as a pre-rendered HTML. HTML elements contain CSS classes that can be used to customize the style of the content. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `issue-detail` - top level container for the detail of the issue * `callout-banners` - section of the `issue-detail` with callout banners * `callout-banner` - single callout banner, inside `callout-banners` * `callout-banner-info` - callout with important information (default) * `callout-banner-warning` - callout with a warning * `callout-banner-error` - callout informing about an error (most severe) * `issue-content` - section of the `issue-detail`, contains multiple `content-element` * `content-element` - content element such as a list, link or paragraph, inside `issue-content` * `root-causes` - unordered list with items describing root causes of the issue, inside `issue-content` * `root-causes-intro` - intro text before the `root-causes` list, inside `issue-content` * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. * `content-moderation` - marks the paragraph that explains how the issue was identified. * `new-element` - Present for new elements added to the pre-rendered content in the future. To make sure that a new content element does not break your style, you can hide everything with this class. */
  prerenderedContent?: string;
  /** Pre-rendered HTML that contains a link to the external location where the ODS can be requested and instructions for how to request it. HTML elements contain CSS classes that can be used to customize the style of this snippet. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `ods-section`* - wrapper around the out-of-court dispute resolution section * `ods-description`* - intro text for the out-of-court dispute resolution. It may contain multiple segments and a link. * `ods-param`* - wrapper around the header-value pair for parameters that merchant may need to provide during the ODS process. * `ods-routing-id`* - ods param for the Routing ID. * `ods-reference-id`* - ods param for the Routing ID. * `ods-param-header`* - header for the ODS parameter * `ods-param-value`* - value of the ODS parameter. This value should be rendered in a way that it is easy for merchants to identify and copy. * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. */
  prerenderedOutOfCourtDisputeSettlement?: string;
  /** Clarifies the severity of the issue. The summarizing message, if present, should be shown right under the title for each issue. It helps merchants to quickly understand the impact of the issue. The detailed breakdown helps the merchant to fully understand the impact of the issue. It can be rendered as dialog that opens when the merchant mouse over the summarized impact statement. Issues with different severity can be styled differently. They may use a different color or icon to signal the difference between `ERROR`, `WARNING` and `INFO`. */
  impact?: AccountIssueImpact;
}

export const AccountIssue: Schema.Schema<AccountIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      actions: Schema.optional(Schema.Array(Action)),
      prerenderedContent: Schema.optional(Schema.String),
      prerenderedOutOfCourtDisputeSettlement: Schema.optional(Schema.String),
      impact: Schema.optional(AccountIssueImpact),
    }),
  ).annotate({
    identifier: "AccountIssue",
  }) as any as Schema.Schema<AccountIssue>;

export interface RenderAccountIssuesResponse {
  /** List of account issues for a given account. This list can be shown with compressed, expandable items. In the compressed form, the title and impact should be shown for each issue. Once the issue is expanded, the detailed content and available actions should be rendered. */
  issues?: Array<AccountIssue>;
  /** Alternate Dispute Resolution (ADR) is deprecated. Use `prerendered_out_of_court_dispute_settlement` instead. */
  alternateDisputeResolution?: AlternateDisputeResolution;
}

export const RenderAccountIssuesResponse: Schema.Schema<RenderAccountIssuesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      issues: Schema.optional(Schema.Array(AccountIssue)),
      alternateDisputeResolution: Schema.optional(AlternateDisputeResolution),
    }),
  ).annotate({
    identifier: "RenderAccountIssuesResponse",
  }) as any as Schema.Schema<RenderAccountIssuesResponse>;

export interface LinkService {
  /** Service provided to or by the linked account. Acceptable values are: - "`shoppingActionsOrderManagement`" - "`shoppingActionsProductManagement`" - "`shoppingAdsProductManagement`" - "`paymentProcessing`" */
  service?: string;
  /** Status of the link Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
}

export const LinkService: Schema.Schema<LinkService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LinkService",
  }) as any as Schema.Schema<LinkService>;

export interface AccountsCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<AccountsCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsCustomBatchResponse`". */
  kind?: string;
}

export const AccountsCustomBatchResponse: Schema.Schema<AccountsCustomBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(AccountsCustomBatchResponseEntry)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsCustomBatchResponse",
  }) as any as Schema.Schema<AccountsCustomBatchResponse>;

export interface ShippingsettingsListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsListResponse`". */
  kind?: string;
  resources?: Array<ShippingSettings>;
  /** The token for the retrieval of the next page of shipping settings. */
  nextPageToken?: string;
}

export const ShippingsettingsListResponse: Schema.Schema<ShippingsettingsListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(ShippingSettings)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShippingsettingsListResponse",
  }) as any as Schema.Schema<ShippingsettingsListResponse>;

export interface AccounttaxCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<AccounttaxCustomBatchRequestEntry>;
}

export const AccounttaxCustomBatchRequest: Schema.Schema<AccounttaxCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(AccounttaxCustomBatchRequestEntry)),
    }),
  ).annotate({
    identifier: "AccounttaxCustomBatchRequest",
  }) as any as Schema.Schema<AccounttaxCustomBatchRequest>;

export interface AccounttaxListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accounttaxListResponse`". */
  kind?: string;
  resources?: Array<AccountTax>;
  /** The token for the retrieval of the next page of account tax settings. */
  nextPageToken?: string;
}

export const AccounttaxListResponse: Schema.Schema<AccounttaxListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(AccountTax)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccounttaxListResponse",
  }) as any as Schema.Schema<AccounttaxListResponse>;

export interface ProductstatusesCustomBatchRequestEntry {
  /** The method of the batch entry. Acceptable values are: - "`get`" */
  method?: string;
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** Deprecated: Setting this field has no effect and attributes are never included. */
  includeAttributes?: boolean;
  /** The ID of the product whose status to get. */
  productId?: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: Array<string>;
}

export const ProductstatusesCustomBatchRequestEntry: Schema.Schema<ProductstatusesCustomBatchRequestEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      batchId: Schema.optional(Schema.Number),
      merchantId: Schema.optional(Schema.String),
      includeAttributes: Schema.optional(Schema.Boolean),
      productId: Schema.optional(Schema.String),
      destinations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ProductstatusesCustomBatchRequestEntry",
  }) as any as Schema.Schema<ProductstatusesCustomBatchRequestEntry>;

export interface ProductstatusesCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<ProductstatusesCustomBatchRequestEntry>;
}

export const ProductstatusesCustomBatchRequest: Schema.Schema<ProductstatusesCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(ProductstatusesCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "ProductstatusesCustomBatchRequest",
  }) as any as Schema.Schema<ProductstatusesCustomBatchRequest>;

export interface LocalinventoryCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<LocalinventoryCustomBatchRequestEntry>;
}

export const LocalinventoryCustomBatchRequest: Schema.Schema<LocalinventoryCustomBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(
        Schema.Array(LocalinventoryCustomBatchRequestEntry),
      ),
    }),
  ).annotate({
    identifier: "LocalinventoryCustomBatchRequest",
  }) as any as Schema.Schema<LocalinventoryCustomBatchRequest>;

export interface DatafeedsListResponse {
  /** The token for the retrieval of the next page of datafeeds. */
  nextPageToken?: string;
  resources?: Array<Datafeed>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedsListResponse`". */
  kind?: string;
}

export const DatafeedsListResponse: Schema.Schema<DatafeedsListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(Datafeed)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedsListResponse",
  }) as any as Schema.Schema<DatafeedsListResponse>;

export interface DatafeedsFetchNowResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedsFetchNowResponse`". */
  kind?: string;
}

export const DatafeedsFetchNowResponse: Schema.Schema<DatafeedsFetchNowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatafeedsFetchNowResponse",
  }) as any as Schema.Schema<DatafeedsFetchNowResponse>;

export interface LabelIds {
  /** The list of label IDs. */
  labelIds?: Array<string>;
}

export const LabelIds: Schema.Schema<LabelIds> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "LabelIds" }) as any as Schema.Schema<LabelIds>;

export interface LinkedAccount {
  /** The ID of the linked account. */
  linkedAccountId?: string;
  /** List of provided services. */
  services?: Array<LinkService>;
}

export const LinkedAccount: Schema.Schema<LinkedAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      linkedAccountId: Schema.optional(Schema.String),
      services: Schema.optional(Schema.Array(LinkService)),
    }),
  ).annotate({
    identifier: "LinkedAccount",
  }) as any as Schema.Schema<LinkedAccount>;

export interface AccountsListLinksResponse {
  /** The token for the retrieval of the next page of links. */
  nextPageToken?: string;
  /** The list of available links. */
  links?: Array<LinkedAccount>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsListLinksResponse`". */
  kind?: string;
}

export const AccountsListLinksResponse: Schema.Schema<AccountsListLinksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      links: Schema.optional(Schema.Array(LinkedAccount)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsListLinksResponse",
  }) as any as Schema.Schema<AccountsListLinksResponse>;

export interface PubsubNotificationSettings {
  /** Cloud pub/sub topic to which notifications are sent (read-only). */
  cloudTopicName?: string;
  /** List of event types. Acceptable values are: - "`orderPendingShipment`" */
  registeredEvents?: Array<string>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#pubsubNotificationSettings`" */
  kind?: string;
}

export const PubsubNotificationSettings: Schema.Schema<PubsubNotificationSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cloudTopicName: Schema.optional(Schema.String),
      registeredEvents: Schema.optional(Schema.Array(Schema.String)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PubsubNotificationSettings",
  }) as any as Schema.Schema<PubsubNotificationSettings>;

export interface FreeListingsProgramStatus {
  /** Status of the program in each region. Regions with the same status and review eligibility are grouped together in `regionCodes`. */
  regionStatuses?: Array<FreeListingsProgramStatusRegionStatus>;
  /** State of the program. `ENABLED` if there are offers for at least one region. */
  globalState?:
    | "PROGRAM_STATE_UNSPECIFIED"
    | "NOT_ENABLED"
    | "NO_OFFERS_UPLOADED"
    | "ENABLED"
    | (string & {});
}

export const FreeListingsProgramStatus: Schema.Schema<FreeListingsProgramStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionStatuses: Schema.optional(
        Schema.Array(FreeListingsProgramStatusRegionStatus),
      ),
      globalState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FreeListingsProgramStatus",
  }) as any as Schema.Schema<FreeListingsProgramStatus>;

export interface ShippingsettingsGetSupportedHolidaysResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsGetSupportedHolidaysResponse`". */
  kind?: string;
  /** A list of holidays applicable for delivery guarantees. May be empty. */
  holidays?: Array<HolidaysHoliday>;
}

export const ShippingsettingsGetSupportedHolidaysResponse: Schema.Schema<ShippingsettingsGetSupportedHolidaysResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      holidays: Schema.optional(Schema.Array(HolidaysHoliday)),
    }),
  ).annotate({
    identifier: "ShippingsettingsGetSupportedHolidaysResponse",
  }) as any as Schema.Schema<ShippingsettingsGetSupportedHolidaysResponse>;

export interface VerifyPhoneNumberRequest {
  /** The verification ID returned by `requestphoneverification`. */
  verificationId?: string;
  /** The verification code that was sent to the phone number for validation. */
  verificationCode?: string;
  /** Verification method used to receive verification code. */
  phoneVerificationMethod?:
    | "PHONE_VERIFICATION_METHOD_UNSPECIFIED"
    | "SMS"
    | "PHONE_CALL"
    | (string & {});
}

export const VerifyPhoneNumberRequest: Schema.Schema<VerifyPhoneNumberRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verificationId: Schema.optional(Schema.String),
      verificationCode: Schema.optional(Schema.String),
      phoneVerificationMethod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerifyPhoneNumberRequest",
  }) as any as Schema.Schema<VerifyPhoneNumberRequest>;

export interface RequestPhoneVerificationResponse {
  /** The verification ID to use in subsequent calls to `verifyphonenumber`. */
  verificationId?: string;
}

export const RequestPhoneVerificationResponse: Schema.Schema<RequestPhoneVerificationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verificationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RequestPhoneVerificationResponse",
  }) as any as Schema.Schema<RequestPhoneVerificationResponse>;

export interface RequestReviewShoppingAdsRequest {
  /** The code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country for which review is to be requested. */
  regionCode?: string;
}

export const RequestReviewShoppingAdsRequest: Schema.Schema<RequestReviewShoppingAdsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RequestReviewShoppingAdsRequest",
  }) as any as Schema.Schema<RequestReviewShoppingAdsRequest>;

export interface ShoppingAdsProgramStatus {
  /** Status of the program in each region. Regions with the same status and review eligibility are grouped together in `regionCodes`. */
  regionStatuses?: Array<ShoppingAdsProgramStatusRegionStatus>;
  /** State of the program. `ENABLED` if there are offers for at least one region. */
  globalState?:
    | "PROGRAM_STATE_UNSPECIFIED"
    | "NOT_ENABLED"
    | "NO_OFFERS_UPLOADED"
    | "ENABLED"
    | (string & {});
}

export const ShoppingAdsProgramStatus: Schema.Schema<ShoppingAdsProgramStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionStatuses: Schema.optional(
        Schema.Array(ShoppingAdsProgramStatusRegionStatus),
      ),
      globalState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ShoppingAdsProgramStatus",
  }) as any as Schema.Schema<ShoppingAdsProgramStatus>;

export interface ReportInteractionRequest {
  /** Required. Token of the response when recommendation was returned. */
  responseToken?: string;
  /** Optional. Subtype of the recommendations this interaction happened on. This field must be set only to the value that is returned by {@link `RecommendationsService.GenerateRecommendations`} call. */
  subtype?: string;
  /** Required. Type of the interaction that is reported, for example INTERACTION_CLICK. */
  interactionType?:
    | "INTERACTION_TYPE_UNSPECIFIED"
    | "INTERACTION_DISMISS"
    | "INTERACTION_CLICK"
    | (string & {});
  /** Required. Type of the recommendations on which this interaction happened. This field must be set only to the value that is returned by {@link `GenerateRecommendationsResponse`} call. */
  type?: string;
}

export const ReportInteractionRequest: Schema.Schema<ReportInteractionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseToken: Schema.optional(Schema.String),
      subtype: Schema.optional(Schema.String),
      interactionType: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReportInteractionRequest",
  }) as any as Schema.Schema<ReportInteractionRequest>;

export interface OrderTrackingSignalLineItemDetails {
  /** Plain text title of this product. */
  productTitle?: string;
  /** The manufacturer part number. */
  mpn?: string;
  /** Universal product code for this item (deprecated: Please use GTIN instead). */
  upc?: string;
  /** Brand of the product. */
  brand?: string;
  /** Merchant SKU for this item (deprecated). */
  sku?: string;
  /** The quantity of the line item in the order. */
  quantity?: string;
  /** The Global Trade Item Number. */
  gtin?: string;
  /** Required. The ID for this line item. */
  lineItemId?: string;
  /** Required. The Content API REST ID of the product, in the form channel:contentLanguage:targetCountry:offerId. */
  productId?: string;
  /** Plain text description of this product (deprecated: Please use product_title instead). */
  productDescription?: string;
}

export const OrderTrackingSignalLineItemDetails: Schema.Schema<OrderTrackingSignalLineItemDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      productTitle: Schema.optional(Schema.String),
      mpn: Schema.optional(Schema.String),
      upc: Schema.optional(Schema.String),
      brand: Schema.optional(Schema.String),
      sku: Schema.optional(Schema.String),
      quantity: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
      lineItemId: Schema.optional(Schema.String),
      productId: Schema.optional(Schema.String),
      productDescription: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrderTrackingSignalLineItemDetails",
  }) as any as Schema.Schema<OrderTrackingSignalLineItemDetails>;

export interface OrderTrackingSignal {
  /** Output only. The ID that uniquely identifies this order tracking signal. */
  orderTrackingSignalId?: string;
  /** Information about line items in the order. */
  lineItems?: Array<OrderTrackingSignalLineItemDetails>;
  /** Required. The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the shipping destination. */
  deliveryRegionCode?: string;
  /** Required. The ID of the order on the merchant side. This field will be hashed in returned OrderTrackingSignal creation response. */
  orderId?: string;
  /** The shipping information for the order. */
  shippingInfo?: Array<OrderTrackingSignalShippingInfo>;
  /** The mapping of the line items to the shipment information. */
  shipmentLineItemMapping?: Array<OrderTrackingSignalShipmentLineItemMapping>;
  /** The Google merchant ID of this order tracking signal. This value is optional. If left unset, the caller's merchant ID is used. You must request access in order to provide data on behalf of another merchant. For more information, see [Submitting Order Tracking Signals](/shopping-content/guides/order-tracking-signals). */
  merchantId?: string;
  /** Required. The time when the order was created on the merchant side. Include the year and timezone string, if available. */
  orderCreatedTime?: DateTime;
  /** The shipping fee of the order; this value should be set to zero in the case of free shipping. */
  customerShippingFee?: PriceAmount;
  /** Required. The delivery postal code, as a continuous string without spaces or dashes, e.g. "95016". This field will be anonymized in returned OrderTrackingSignal creation response. */
  deliveryPostalCode?: string;
}

export const OrderTrackingSignal: Schema.Schema<OrderTrackingSignal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      orderTrackingSignalId: Schema.optional(Schema.String),
      lineItems: Schema.optional(
        Schema.Array(OrderTrackingSignalLineItemDetails),
      ),
      deliveryRegionCode: Schema.optional(Schema.String),
      orderId: Schema.optional(Schema.String),
      shippingInfo: Schema.optional(
        Schema.Array(OrderTrackingSignalShippingInfo),
      ),
      shipmentLineItemMapping: Schema.optional(
        Schema.Array(OrderTrackingSignalShipmentLineItemMapping),
      ),
      merchantId: Schema.optional(Schema.String),
      orderCreatedTime: Schema.optional(DateTime),
      customerShippingFee: Schema.optional(PriceAmount),
      deliveryPostalCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrderTrackingSignal",
  }) as any as Schema.Schema<OrderTrackingSignal>;

export interface RenderProductIssuesRequestPayload {
  /** Optional. How the detailed content should be returned. Default option is to return the content as a pre-rendered HTML text. */
  contentOption?:
    | "CONTENT_OPTION_UNSPECIFIED"
    | "PRE_RENDERED_HTML"
    | (string & {});
  /** Optional. How actions with user input form should be handled. If not provided, actions will be returned as links that points merchant to Merchant Center where they can request the action. */
  userInputActionOption?:
    | "USER_INPUT_ACTION_RENDERING_OPTION_UNSPECIFIED"
    | "REDIRECT_TO_MERCHANT_CENTER"
    | "BUILT_IN_USER_INPUT_ACTIONS"
    | (string & {});
}

export const RenderProductIssuesRequestPayload: Schema.Schema<RenderProductIssuesRequestPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentOption: Schema.optional(Schema.String),
      userInputActionOption: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RenderProductIssuesRequestPayload",
  }) as any as Schema.Schema<RenderProductIssuesRequestPayload>;

export interface LiasettingsRequestInventoryVerificationResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsRequestInventoryVerificationResponse`". */
  kind?: string;
}

export const LiasettingsRequestInventoryVerificationResponse: Schema.Schema<LiasettingsRequestInventoryVerificationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiasettingsRequestInventoryVerificationResponse",
  }) as any as Schema.Schema<LiasettingsRequestInventoryVerificationResponse>;

export interface ListMethodQuotasResponse {
  /** The current quota usage and limits per each method. */
  methodQuotas?: Array<MethodQuota>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMethodQuotasResponse: Schema.Schema<ListMethodQuotasResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      methodQuotas: Schema.optional(Schema.Array(MethodQuota)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListMethodQuotasResponse",
  }) as any as Schema.Schema<ListMethodQuotasResponse>;

export interface AccountsLinkResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsLinkResponse`". */
  kind?: string;
}

export const AccountsLinkResponse: Schema.Schema<AccountsLinkResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountsLinkResponse",
  }) as any as Schema.Schema<AccountsLinkResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListCssesRequest {
  /** The maximum number of CSS domains to return. The service may return fewer than this value. If unspecified, at most 50 CSS domains will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListCsses` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCsses` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The CSS group ID of CSS domains to be listed. */
  cssGroupId: string;
}

export const ListCssesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  cssGroupId: Schema.String.pipe(T.HttpPath("cssGroupId")),
}).pipe(
  T.Http({ method: "GET", path: "{cssGroupId}/csses" }),
  svc,
) as unknown as Schema.Schema<ListCssesRequest>;

export type ListCssesResponse_Op = ListCssesResponse;
export const ListCssesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCssesResponse;

export type ListCssesError = DefaultErrors;

/** Lists CSS domains affiliated with a CSS group. */
export const listCsses: API.PaginatedOperationMethod<
  ListCssesRequest,
  ListCssesResponse_Op,
  ListCssesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCssesRequest,
  output: ListCssesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCssesRequest {
  /** Required. The ID of the managing account. If this parameter is not the same as [cssDomainId](#cssDomainId), then this ID must be a CSS group ID and `cssDomainId` must be the ID of a CSS domain affiliated with this group. */
  cssGroupId: string;
  /** Required. The ID of the CSS domain to return. */
  cssDomainId: string;
}

export const GetCssesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  cssGroupId: Schema.String.pipe(T.HttpPath("cssGroupId")),
  cssDomainId: Schema.String.pipe(T.HttpPath("cssDomainId")),
}).pipe(
  T.Http({ method: "GET", path: "{cssGroupId}/csses/{cssDomainId}" }),
  svc,
) as unknown as Schema.Schema<GetCssesRequest>;

export type GetCssesResponse = Css;
export const GetCssesResponse = /*@__PURE__*/ /*#__PURE__*/ Css;

export type GetCssesError = DefaultErrors;

/** Retrieves a single CSS domain by ID. */
export const getCsses: API.OperationMethod<
  GetCssesRequest,
  GetCssesResponse,
  GetCssesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCssesRequest,
  output: GetCssesResponse,
  errors: [],
}));

export interface UpdatelabelsCssesRequest {
  /** Required. The ID of the updated CSS domain. */
  cssDomainId: string;
  /** Required. The CSS group ID of the updated CSS domain. */
  cssGroupId: string;
  /** Request body */
  body?: LabelIds;
}

export const UpdatelabelsCssesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cssDomainId: Schema.String.pipe(T.HttpPath("cssDomainId")),
    cssGroupId: Schema.String.pipe(T.HttpPath("cssGroupId")),
    body: Schema.optional(LabelIds).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{cssGroupId}/csses/{cssDomainId}/updatelabels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatelabelsCssesRequest>;

export type UpdatelabelsCssesResponse = Css;
export const UpdatelabelsCssesResponse = /*@__PURE__*/ /*#__PURE__*/ Css;

export type UpdatelabelsCssesError = DefaultErrors;

/** Updates labels that are assigned to a CSS domain by its CSS group. */
export const updatelabelsCsses: API.OperationMethod<
  UpdatelabelsCssesRequest,
  UpdatelabelsCssesResponse,
  UpdatelabelsCssesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatelabelsCssesRequest,
  output: UpdatelabelsCssesResponse,
  errors: [],
}));

export interface CreateReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Request body */
  body?: ReturnPolicyOnline;
}

export const CreateReturnpolicyonlineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(ReturnPolicyOnline).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/returnpolicyonline",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateReturnpolicyonlineRequest>;

export type CreateReturnpolicyonlineResponse = ReturnPolicyOnline;
export const CreateReturnpolicyonlineResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReturnPolicyOnline;

export type CreateReturnpolicyonlineError = DefaultErrors;

/** Creates a new return policy. */
export const createReturnpolicyonline: API.OperationMethod<
  CreateReturnpolicyonlineRequest,
  CreateReturnpolicyonlineResponse,
  CreateReturnpolicyonlineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateReturnpolicyonlineRequest,
  output: CreateReturnpolicyonlineResponse,
  errors: [],
}));

export interface GetReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Required. The id of the return policy to retrieve. */
  returnPolicyId: string;
}

export const GetReturnpolicyonlineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    returnPolicyId: Schema.String.pipe(T.HttpPath("returnPolicyId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/returnpolicyonline/{returnPolicyId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetReturnpolicyonlineRequest>;

export type GetReturnpolicyonlineResponse = ReturnPolicyOnline;
export const GetReturnpolicyonlineResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReturnPolicyOnline;

export type GetReturnpolicyonlineError = DefaultErrors;

/** Gets an existing return policy. */
export const getReturnpolicyonline: API.OperationMethod<
  GetReturnpolicyonlineRequest,
  GetReturnpolicyonlineResponse,
  GetReturnpolicyonlineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReturnpolicyonlineRequest,
  output: GetReturnpolicyonlineResponse,
  errors: [],
}));

export interface PatchReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Required. The id of the return policy to update. */
  returnPolicyId: string;
  /** Request body */
  body?: ReturnPolicyOnline;
}

export const PatchReturnpolicyonlineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    returnPolicyId: Schema.String.pipe(T.HttpPath("returnPolicyId")),
    body: Schema.optional(ReturnPolicyOnline).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "{merchantId}/returnpolicyonline/{returnPolicyId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchReturnpolicyonlineRequest>;

export type PatchReturnpolicyonlineResponse = ReturnPolicyOnline;
export const PatchReturnpolicyonlineResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReturnPolicyOnline;

export type PatchReturnpolicyonlineError = DefaultErrors;

/** Updates an existing return policy. */
export const patchReturnpolicyonline: API.OperationMethod<
  PatchReturnpolicyonlineRequest,
  PatchReturnpolicyonlineResponse,
  PatchReturnpolicyonlineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchReturnpolicyonlineRequest,
  output: PatchReturnpolicyonlineResponse,
  errors: [],
}));

export interface ListReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
}

export const ListReturnpolicyonlineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/returnpolicyonline" }),
    svc,
  ) as unknown as Schema.Schema<ListReturnpolicyonlineRequest>;

export type ListReturnpolicyonlineResponse = ListReturnPolicyOnlineResponse;
export const ListReturnpolicyonlineResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReturnPolicyOnlineResponse;

export type ListReturnpolicyonlineError = DefaultErrors;

/** Lists all existing return policies. */
export const listReturnpolicyonline: API.OperationMethod<
  ListReturnpolicyonlineRequest,
  ListReturnpolicyonlineResponse,
  ListReturnpolicyonlineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListReturnpolicyonlineRequest,
  output: ListReturnpolicyonlineResponse,
  errors: [],
}));

export interface DeleteReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Required. The id of the return policy to delete. */
  returnPolicyId: string;
}

export const DeleteReturnpolicyonlineRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    returnPolicyId: Schema.String.pipe(T.HttpPath("returnPolicyId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "{merchantId}/returnpolicyonline/{returnPolicyId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteReturnpolicyonlineRequest>;

export interface DeleteReturnpolicyonlineResponse {}
export const DeleteReturnpolicyonlineResponse: Schema.Schema<DeleteReturnpolicyonlineResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteReturnpolicyonlineResponse>;

export type DeleteReturnpolicyonlineError = DefaultErrors;

/** Deletes an existing return policy. */
export const deleteReturnpolicyonline: API.OperationMethod<
  DeleteReturnpolicyonlineRequest,
  DeleteReturnpolicyonlineResponse,
  DeleteReturnpolicyonlineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReturnpolicyonlineRequest,
  output: DeleteReturnpolicyonlineResponse,
  errors: [],
}));

export interface CustombatchDatafeedsRequest {
  /** Request body */
  body?: DatafeedsCustomBatchRequest;
}

export const CustombatchDatafeedsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(DatafeedsCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "datafeeds/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchDatafeedsRequest>;

export type CustombatchDatafeedsResponse = DatafeedsCustomBatchResponse;
export const CustombatchDatafeedsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatafeedsCustomBatchResponse;

export type CustombatchDatafeedsError = DefaultErrors;

/** Deletes, fetches, gets, inserts and updates multiple datafeeds in a single request. */
export const custombatchDatafeeds: API.OperationMethod<
  CustombatchDatafeedsRequest,
  CustombatchDatafeedsResponse,
  CustombatchDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchDatafeedsRequest,
  output: CustombatchDatafeedsResponse,
  errors: [],
}));

export interface ListDatafeedsRequest {
  /** The maximum number of products to return in the response, used for paging. */
  maxResults?: number;
  /** The ID of the account that manages the datafeeds. This account cannot be a multi-client account. */
  merchantId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListDatafeedsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/datafeeds" }),
  svc,
) as unknown as Schema.Schema<ListDatafeedsRequest>;

export type ListDatafeedsResponse = DatafeedsListResponse;
export const ListDatafeedsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatafeedsListResponse;

export type ListDatafeedsError = DefaultErrors;

/** Lists the configurations for datafeeds in your Merchant Center account. */
export const listDatafeeds: API.PaginatedOperationMethod<
  ListDatafeedsRequest,
  ListDatafeedsResponse,
  ListDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatafeedsRequest,
  output: ListDatafeedsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
}

export const DeleteDatafeedsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
  },
).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/datafeeds/{datafeedId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDatafeedsRequest>;

export interface DeleteDatafeedsResponse {}
export const DeleteDatafeedsResponse: Schema.Schema<DeleteDatafeedsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteDatafeedsResponse>;

export type DeleteDatafeedsError = DefaultErrors;

/** Deletes a datafeed configuration from your Merchant Center account. */
export const deleteDatafeeds: API.OperationMethod<
  DeleteDatafeedsRequest,
  DeleteDatafeedsResponse,
  DeleteDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDatafeedsRequest,
  output: DeleteDatafeedsResponse,
  errors: [],
}));

export interface GetDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
}

export const GetDatafeedsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/datafeeds/{datafeedId}" }),
  svc,
) as unknown as Schema.Schema<GetDatafeedsRequest>;

export type GetDatafeedsResponse = Datafeed;
export const GetDatafeedsResponse = /*@__PURE__*/ /*#__PURE__*/ Datafeed;

export type GetDatafeedsError = DefaultErrors;

/** Retrieves a datafeed configuration from your Merchant Center account. */
export const getDatafeeds: API.OperationMethod<
  GetDatafeedsRequest,
  GetDatafeedsResponse,
  GetDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDatafeedsRequest,
  output: GetDatafeedsResponse,
  errors: [],
}));

export interface InsertDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Datafeed;
}

export const InsertDatafeedsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(Datafeed).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({ method: "POST", path: "{merchantId}/datafeeds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDatafeedsRequest>;

export type InsertDatafeedsResponse = Datafeed;
export const InsertDatafeedsResponse = /*@__PURE__*/ /*#__PURE__*/ Datafeed;

export type InsertDatafeedsError = DefaultErrors;

/** Registers a datafeed configuration with your Merchant Center account. */
export const insertDatafeeds: API.OperationMethod<
  InsertDatafeedsRequest,
  InsertDatafeedsResponse,
  InsertDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertDatafeedsRequest,
  output: InsertDatafeedsResponse,
  errors: [],
}));

export interface FetchnowDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed to be fetched. */
  datafeedId: string;
}

export const FetchnowDatafeedsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/datafeeds/{datafeedId}/fetchNow",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<FetchnowDatafeedsRequest>;

export type FetchnowDatafeedsResponse = DatafeedsFetchNowResponse;
export const FetchnowDatafeedsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatafeedsFetchNowResponse;

export type FetchnowDatafeedsError = DefaultErrors;

/** Invokes a fetch for the datafeed in your Merchant Center account. If you need to call this method more than once per day, we recommend you use the [Products service](https://developers.google.com/shopping-content/reference/rest/v2.1/products) to update your product data. */
export const fetchnowDatafeeds: API.OperationMethod<
  FetchnowDatafeedsRequest,
  FetchnowDatafeedsResponse,
  FetchnowDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FetchnowDatafeedsRequest,
  output: FetchnowDatafeedsResponse,
  errors: [],
}));

export interface UpdateDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
  /** Request body */
  body?: Datafeed;
}

export const UpdateDatafeedsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
    body: Schema.optional(Datafeed).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "{merchantId}/datafeeds/{datafeedId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateDatafeedsRequest>;

export type UpdateDatafeedsResponse = Datafeed;
export const UpdateDatafeedsResponse = /*@__PURE__*/ /*#__PURE__*/ Datafeed;

export type UpdateDatafeedsError = DefaultErrors;

/** Updates a datafeed configuration of your Merchant Center account. Any fields that are not provided are deleted from the resource. */
export const updateDatafeeds: API.OperationMethod<
  UpdateDatafeedsRequest,
  UpdateDatafeedsResponse,
  UpdateDatafeedsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDatafeedsRequest,
  output: UpdateDatafeedsResponse,
  errors: [],
}));

export interface GetConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Required. The REST ID of the collection. */
  conversionSourceId: string;
}

export const GetConversionsourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/conversionsources/{conversionSourceId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetConversionsourcesRequest>;

export type GetConversionsourcesResponse = ConversionSource;
export const GetConversionsourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ConversionSource;

export type GetConversionsourcesError = DefaultErrors;

/** Fetches a conversion source. */
export const getConversionsources: API.OperationMethod<
  GetConversionsourcesRequest,
  GetConversionsourcesResponse,
  GetConversionsourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConversionsourcesRequest,
  output: GetConversionsourcesResponse,
  errors: [],
}));

export interface UndeleteConversionsourcesRequest {
  /** Required. The ID of the conversion source to be undeleted. */
  conversionSourceId: string;
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Request body */
  body?: UndeleteConversionSourceRequest;
}

export const UndeleteConversionsourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(UndeleteConversionSourceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/conversionsources/{conversionSourceId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteConversionsourcesRequest>;

export interface UndeleteConversionsourcesResponse {}
export const UndeleteConversionsourcesResponse: Schema.Schema<UndeleteConversionsourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<UndeleteConversionsourcesResponse>;

export type UndeleteConversionsourcesError = DefaultErrors;

/** Re-enables an archived conversion source. */
export const undeleteConversionsources: API.OperationMethod<
  UndeleteConversionsourcesRequest,
  UndeleteConversionsourcesResponse,
  UndeleteConversionsourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UndeleteConversionsourcesRequest,
  output: UndeleteConversionsourcesResponse,
  errors: [],
}));

export interface CreateConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Request body */
  body?: ConversionSource;
}

export const CreateConversionsourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(ConversionSource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/conversionsources",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateConversionsourcesRequest>;

export type CreateConversionsourcesResponse = ConversionSource;
export const CreateConversionsourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ConversionSource;

export type CreateConversionsourcesError = DefaultErrors;

/** Creates a new conversion source. */
export const createConversionsources: API.OperationMethod<
  CreateConversionsourcesRequest,
  CreateConversionsourcesResponse,
  CreateConversionsourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConversionsourcesRequest,
  output: CreateConversionsourcesResponse,
  errors: [],
}));

export interface DeleteConversionsourcesRequest {
  /** Required. The ID of the conversion source to be deleted. */
  conversionSourceId: string;
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
}

export const DeleteConversionsourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "{merchantId}/conversionsources/{conversionSourceId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteConversionsourcesRequest>;

export interface DeleteConversionsourcesResponse {}
export const DeleteConversionsourcesResponse: Schema.Schema<DeleteConversionsourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteConversionsourcesResponse>;

export type DeleteConversionsourcesError = DefaultErrors;

/** Archives an existing conversion source. It will be recoverable for 30 days. This archiving behavior is not typical in the Content API and unique to this service. */
export const deleteConversionsources: API.OperationMethod<
  DeleteConversionsourcesRequest,
  DeleteConversionsourcesResponse,
  DeleteConversionsourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConversionsourcesRequest,
  output: DeleteConversionsourcesResponse,
  errors: [],
}));

export interface PatchConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Optional. List of fields being updated. The following fields can be updated: `attribution_settings`, `display_name`, `currency_code`. */
  updateMask?: string;
  /** Required. The ID of the conversion source to be updated. */
  conversionSourceId: string;
  /** Request body */
  body?: ConversionSource;
}

export const PatchConversionsourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
    body: Schema.optional(ConversionSource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "{merchantId}/conversionsources/{conversionSourceId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchConversionsourcesRequest>;

export type PatchConversionsourcesResponse = ConversionSource;
export const PatchConversionsourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ConversionSource;

export type PatchConversionsourcesError = DefaultErrors;

/** Updates information of an existing conversion source. */
export const patchConversionsources: API.OperationMethod<
  PatchConversionsourcesRequest,
  PatchConversionsourcesResponse,
  PatchConversionsourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchConversionsourcesRequest,
  output: PatchConversionsourcesResponse,
  errors: [],
}));

export interface ListConversionsourcesRequest {
  /** The maximum number of conversion sources to return in a page. If no `page_size` is specified, `100` is used as the default value. The maximum value is `200`. Values above `200` will be coerced to `200`. Regardless of pagination, at most `200` conversion sources are returned in total. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** If true, also returns archived conversion sources. */
  showDeleted?: boolean;
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
}

export const ListConversionsourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/conversionsources" }),
    svc,
  ) as unknown as Schema.Schema<ListConversionsourcesRequest>;

export type ListConversionsourcesResponse = ListConversionSourcesResponse;
export const ListConversionsourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListConversionSourcesResponse;

export type ListConversionsourcesError = DefaultErrors;

/** Retrieves the list of conversion sources the caller has access to. */
export const listConversionsources: API.PaginatedOperationMethod<
  ListConversionsourcesRequest,
  ListConversionsourcesResponse,
  ListConversionsourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConversionsourcesRequest,
  output: ListConversionsourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetPromotionsRequest {
  /** Required. REST ID of the promotion to retrieve. */
  id: string;
  /** Required. The ID of the account that contains the collection. */
  merchantId: string;
}

export const GetPromotionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpPath("id")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/promotions/{id}" }),
  svc,
) as unknown as Schema.Schema<GetPromotionsRequest>;

export type GetPromotionsResponse = Promotion;
export const GetPromotionsResponse = /*@__PURE__*/ /*#__PURE__*/ Promotion;

export type GetPromotionsError = DefaultErrors;

/** Retrieves a promotion from your Merchant Center account. */
export const getPromotions: API.OperationMethod<
  GetPromotionsRequest,
  GetPromotionsResponse,
  GetPromotionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPromotionsRequest,
  output: GetPromotionsResponse,
  errors: [],
}));

export interface CreatePromotionsRequest {
  /** Required. The ID of the account that contains the collection. */
  merchantId: string;
  /** Request body */
  body?: Promotion;
}

export const CreatePromotionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(Promotion).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "{merchantId}/promotions", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreatePromotionsRequest>;

export type CreatePromotionsResponse = Promotion;
export const CreatePromotionsResponse = /*@__PURE__*/ /*#__PURE__*/ Promotion;

export type CreatePromotionsError = DefaultErrors;

/** Inserts a promotion for your Merchant Center account. If the promotion already exists, then it updates the promotion instead. To [end or delete] (https://developers.google.com/shopping-content/guides/promotions#end_a_promotion) a promotion update the time period of the promotion to a time that has already passed. */
export const createPromotions: API.OperationMethod<
  CreatePromotionsRequest,
  CreatePromotionsResponse,
  CreatePromotionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePromotionsRequest,
  output: CreatePromotionsResponse,
  errors: [],
}));

export interface ListPromotionsRequest {
  /** The two-letter ISO 639-1 language code associated with the promotions, used as a filter. */
  languageCode?: string;
  /** The maximum number of promotions to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListPromotion` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPromotion` must match the call that provided the page token. */
  pageToken?: string;
  /** [CLDR country code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) (for example, "US"), used as a filter on promotions target country. */
  countryCode?: string;
  /** Required. The ID of the account that contains the collection. */
  merchantId: string;
}

export const ListPromotionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  countryCode: Schema.optional(Schema.String).pipe(T.HttpQuery("countryCode")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/promotions" }),
  svc,
) as unknown as Schema.Schema<ListPromotionsRequest>;

export type ListPromotionsResponse = ListPromotionResponse;
export const ListPromotionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPromotionResponse;

export type ListPromotionsError = DefaultErrors;

/** List all promotions from your Merchant Center account. */
export const listPromotions: API.PaginatedOperationMethod<
  ListPromotionsRequest,
  ListPromotionsResponse,
  ListPromotionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPromotionsRequest,
  output: ListPromotionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountstatusesRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
  /** The maximum number of account statuses to return in the response, used for paging. */
  maxResults?: number;
  /** If set, only the accounts with the given name (case sensitive) will be returned. */
  name?: string;
}

export const ListAccountstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    destinations: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("destinations"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/accountstatuses" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountstatusesRequest>;

export type ListAccountstatusesResponse = AccountstatusesListResponse;
export const ListAccountstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountstatusesListResponse;

export type ListAccountstatusesError = DefaultErrors;

/** Lists the statuses of the sub-accounts in your Merchant Center account. */
export const listAccountstatuses: API.PaginatedOperationMethod<
  ListAccountstatusesRequest,
  ListAccountstatusesResponse,
  ListAccountstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountstatusesRequest,
  output: ListAccountstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountstatusesRequest {
  /** The ID of the account. */
  accountId: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
}

export const GetAccountstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    destinations: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("destinations"),
    ),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/accountstatuses/{accountId}" }),
    svc,
  ) as unknown as Schema.Schema<GetAccountstatusesRequest>;

export type GetAccountstatusesResponse = AccountStatus;
export const GetAccountstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountStatus;

export type GetAccountstatusesError = DefaultErrors;

/** Retrieves the status of a Merchant Center account. No itemLevelIssues are returned for multi-client accounts. */
export const getAccountstatuses: API.OperationMethod<
  GetAccountstatusesRequest,
  GetAccountstatusesResponse,
  GetAccountstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountstatusesRequest,
  output: GetAccountstatusesResponse,
  errors: [],
}));

export interface CustombatchAccountstatusesRequest {
  /** Request body */
  body?: AccountstatusesCustomBatchRequest;
}

export const CustombatchAccountstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(AccountstatusesCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "accountstatuses/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchAccountstatusesRequest>;

export type CustombatchAccountstatusesResponse =
  AccountstatusesCustomBatchResponse;
export const CustombatchAccountstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountstatusesCustomBatchResponse;

export type CustombatchAccountstatusesError = DefaultErrors;

/** Retrieves multiple Merchant Center account statuses in a single request. */
export const custombatchAccountstatuses: API.OperationMethod<
  CustombatchAccountstatusesRequest,
  CustombatchAccountstatusesResponse,
  CustombatchAccountstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchAccountstatusesRequest,
  output: CustombatchAccountstatusesResponse,
  errors: [],
}));

export interface CreateOrdertrackingsignalsRequest {
  /** The ID of the merchant for which the order signal is created. */
  merchantId: string;
  /** Request body */
  body?: OrderTrackingSignal;
}

export const CreateOrdertrackingsignalsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(OrderTrackingSignal).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/ordertrackingsignals",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateOrdertrackingsignalsRequest>;

export type CreateOrdertrackingsignalsResponse = OrderTrackingSignal;
export const CreateOrdertrackingsignalsResponse =
  /*@__PURE__*/ /*#__PURE__*/ OrderTrackingSignal;

export type CreateOrdertrackingsignalsError = DefaultErrors;

/** Creates new order tracking signal. */
export const createOrdertrackingsignals: API.OperationMethod<
  CreateOrdertrackingsignalsRequest,
  CreateOrdertrackingsignalsResponse,
  CreateOrdertrackingsignalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOrdertrackingsignalsRequest,
  output: CreateOrdertrackingsignalsResponse,
  errors: [],
}));

export interface ListProductstatusesRequest {
  /** The ID of the account that contains the products. This account cannot be a multi-client account. */
  merchantId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
  /** The maximum number of product statuses to return in the response, used for paging. The default value is 25. The maximum value is 250. */
  maxResults?: number;
}

export const ListProductstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    destinations: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("destinations"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/productstatuses" }),
    svc,
  ) as unknown as Schema.Schema<ListProductstatusesRequest>;

export type ListProductstatusesResponse = ProductstatusesListResponse;
export const ListProductstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductstatusesListResponse;

export type ListProductstatusesError = DefaultErrors;

/** Lists the statuses of the products in your Merchant Center account. */
export const listProductstatuses: API.PaginatedOperationMethod<
  ListProductstatusesRequest,
  ListProductstatusesResponse,
  ListProductstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProductstatusesRequest,
  output: ListProductstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CustombatchProductstatusesRequest {
  /** Request body */
  body?: ProductstatusesCustomBatchRequest;
}

export const CustombatchProductstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(ProductstatusesCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "productstatuses/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchProductstatusesRequest>;

export type CustombatchProductstatusesResponse =
  ProductstatusesCustomBatchResponse;
export const CustombatchProductstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductstatusesCustomBatchResponse;

export type CustombatchProductstatusesError = DefaultErrors;

/** Gets the statuses of multiple products in a single request. */
export const custombatchProductstatuses: API.OperationMethod<
  CustombatchProductstatusesRequest,
  CustombatchProductstatusesResponse,
  CustombatchProductstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchProductstatusesRequest,
  output: CustombatchProductstatusesResponse,
  errors: [],
}));

export interface GetProductstatusesRequest {
  /** The REST ID of the product. */
  productId: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
}

export const GetProductstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    productId: Schema.String.pipe(T.HttpPath("productId")),
    destinations: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("destinations"),
    ),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/productstatuses/{productId}" }),
    svc,
  ) as unknown as Schema.Schema<GetProductstatusesRequest>;

export type GetProductstatusesResponse = ProductStatus;
export const GetProductstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductStatus;

export type GetProductstatusesError = DefaultErrors;

/** Gets the status of a product from your Merchant Center account. */
export const getProductstatuses: API.OperationMethod<
  GetProductstatusesRequest,
  GetProductstatusesResponse,
  GetProductstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProductstatusesRequest,
  output: GetProductstatusesResponse,
  errors: [],
}));

export interface ListPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
}

export const ListPosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/pos/{targetMerchantId}/store" }),
  svc,
) as unknown as Schema.Schema<ListPosRequest>;

export type ListPosResponse = PosListResponse;
export const ListPosResponse = /*@__PURE__*/ /*#__PURE__*/ PosListResponse;

export type ListPosError = DefaultErrors;

/** Lists the stores of the target merchant. */
export const listPos: API.OperationMethod<
  ListPosRequest,
  ListPosResponse,
  ListPosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListPosRequest,
  output: ListPosResponse,
  errors: [],
}));

export interface DeletePosRequest {
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** A store code that is unique per merchant. */
  storeCode: string;
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
}

export const DeletePosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  storeCode: Schema.String.pipe(T.HttpPath("storeCode")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "{merchantId}/pos/{targetMerchantId}/store/{storeCode}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePosRequest>;

export interface DeletePosResponse {}
export const DeletePosResponse: Schema.Schema<DeletePosResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePosResponse>;

export type DeletePosError = DefaultErrors;

/** Deletes a store for the given merchant. */
export const deletePos: API.OperationMethod<
  DeletePosRequest,
  DeletePosResponse,
  DeletePosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePosRequest,
  output: DeletePosResponse,
  errors: [],
}));

export interface SalePosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** Request body */
  body?: PosSaleRequest;
}

export const SalePosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  body: Schema.optional(PosSaleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "{merchantId}/pos/{targetMerchantId}/sale",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SalePosRequest>;

export type SalePosResponse = PosSaleResponse;
export const SalePosResponse = /*@__PURE__*/ /*#__PURE__*/ PosSaleResponse;

export type SalePosError = DefaultErrors;

/** Submit a sale event for the given merchant. */
export const salePos: API.OperationMethod<
  SalePosRequest,
  SalePosResponse,
  SalePosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SalePosRequest,
  output: SalePosResponse,
  errors: [],
}));

export interface CustombatchPosRequest {
  /** Request body */
  body?: PosCustomBatchRequest;
}

export const CustombatchPosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(PosCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "pos/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchPosRequest>;

export type CustombatchPosResponse = PosCustomBatchResponse;
export const CustombatchPosResponse =
  /*@__PURE__*/ /*#__PURE__*/ PosCustomBatchResponse;

export type CustombatchPosError = DefaultErrors;

/** Batches multiple POS-related calls in a single request. */
export const custombatchPos: API.OperationMethod<
  CustombatchPosRequest,
  CustombatchPosResponse,
  CustombatchPosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchPosRequest,
  output: CustombatchPosResponse,
  errors: [],
}));

export interface InventoryPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** Request body */
  body?: PosInventoryRequest;
}

export const InventoryPosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  body: Schema.optional(PosInventoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "{merchantId}/pos/{targetMerchantId}/inventory",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InventoryPosRequest>;

export type InventoryPosResponse = PosInventoryResponse;
export const InventoryPosResponse =
  /*@__PURE__*/ /*#__PURE__*/ PosInventoryResponse;

export type InventoryPosError = DefaultErrors;

/** Submit inventory for the given merchant. */
export const inventoryPos: API.OperationMethod<
  InventoryPosRequest,
  InventoryPosResponse,
  InventoryPosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InventoryPosRequest,
  output: InventoryPosResponse,
  errors: [],
}));

export interface GetPosRequest {
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** A store code that is unique per merchant. */
  storeCode: string;
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
}

export const GetPosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  storeCode: Schema.String.pipe(T.HttpPath("storeCode")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "{merchantId}/pos/{targetMerchantId}/store/{storeCode}",
  }),
  svc,
) as unknown as Schema.Schema<GetPosRequest>;

export type GetPosResponse = PosStore;
export const GetPosResponse = /*@__PURE__*/ /*#__PURE__*/ PosStore;

export type GetPosError = DefaultErrors;

/** Retrieves information about the given store. */
export const getPos: API.OperationMethod<
  GetPosRequest,
  GetPosResponse,
  GetPosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPosRequest,
  output: GetPosResponse,
  errors: [],
}));

export interface InsertPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** Request body */
  body?: PosStore;
}

export const InsertPosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  body: Schema.optional(PosStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "{merchantId}/pos/{targetMerchantId}/store",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertPosRequest>;

export type InsertPosResponse = PosStore;
export const InsertPosResponse = /*@__PURE__*/ /*#__PURE__*/ PosStore;

export type InsertPosError = DefaultErrors;

/** Creates a store for the given merchant. */
export const insertPos: API.OperationMethod<
  InsertPosRequest,
  InsertPosResponse,
  InsertPosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertPosRequest,
  output: InsertPosResponse,
  errors: [],
}));

export interface GetAccounttaxRequest {
  /** The ID of the account for which to get/update account tax settings. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
}

export const GetAccounttaxRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounttax/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccounttaxRequest>;

export type GetAccounttaxResponse = AccountTax;
export const GetAccounttaxResponse = /*@__PURE__*/ /*#__PURE__*/ AccountTax;

export type GetAccounttaxError = DefaultErrors;

/** Retrieves the tax settings of the account. */
export const getAccounttax: API.OperationMethod<
  GetAccounttaxRequest,
  GetAccounttaxResponse,
  GetAccounttaxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccounttaxRequest,
  output: GetAccounttaxResponse,
  errors: [],
}));

export interface CustombatchAccounttaxRequest {
  /** Request body */
  body?: AccounttaxCustomBatchRequest;
}

export const CustombatchAccounttaxRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(AccounttaxCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "accounttax/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchAccounttaxRequest>;

export type CustombatchAccounttaxResponse = AccounttaxCustomBatchResponse;
export const CustombatchAccounttaxResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccounttaxCustomBatchResponse;

export type CustombatchAccounttaxError = DefaultErrors;

/** Retrieves and updates tax settings of multiple accounts in a single request. */
export const custombatchAccounttax: API.OperationMethod<
  CustombatchAccounttaxRequest,
  CustombatchAccounttaxResponse,
  CustombatchAccounttaxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchAccounttaxRequest,
  output: CustombatchAccounttaxResponse,
  errors: [],
}));

export interface UpdateAccounttaxRequest {
  /** The ID of the account for which to get/update account tax settings. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Request body */
  body?: AccountTax;
}

export const UpdateAccounttaxRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(AccountTax).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "{merchantId}/accounttax/{accountId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateAccounttaxRequest>;

export type UpdateAccounttaxResponse = AccountTax;
export const UpdateAccounttaxResponse = /*@__PURE__*/ /*#__PURE__*/ AccountTax;

export type UpdateAccounttaxError = DefaultErrors;

/** Updates the tax settings of the account. Any fields that are not provided are deleted from the resource. */
export const updateAccounttax: API.OperationMethod<
  UpdateAccounttaxRequest,
  UpdateAccounttaxResponse,
  UpdateAccounttaxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAccounttaxRequest,
  output: UpdateAccounttaxResponse,
  errors: [],
}));

export interface ListAccounttaxRequest {
  /** The maximum number of tax settings to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
}

export const ListAccounttaxRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounttax" }),
  svc,
) as unknown as Schema.Schema<ListAccounttaxRequest>;

export type ListAccounttaxResponse = AccounttaxListResponse;
export const ListAccounttaxResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccounttaxListResponse;

export type ListAccounttaxError = DefaultErrors;

/** Lists the tax settings of the sub-accounts in your Merchant Center account. */
export const listAccounttax: API.PaginatedOperationMethod<
  ListAccounttaxRequest,
  ListAccounttaxResponse,
  ListAccounttaxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccounttaxRequest,
  output: ListAccounttaxResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateRegionsRequest {
  /** Required. The id of the region to create. */
  regionId?: string;
  /** Required. The id of the merchant for which to create region definition. */
  merchantId: string;
  /** Request body */
  body?: Region;
}

export const CreateRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  regionId: Schema.optional(Schema.String).pipe(T.HttpQuery("regionId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Region).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/regions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateRegionsRequest>;

export type CreateRegionsResponse = Region;
export const CreateRegionsResponse = /*@__PURE__*/ /*#__PURE__*/ Region;

export type CreateRegionsError = DefaultErrors;

/** Creates a region definition in your Merchant Center account. */
export const createRegions: API.OperationMethod<
  CreateRegionsRequest,
  CreateRegionsResponse,
  CreateRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRegionsRequest,
  output: CreateRegionsResponse,
  errors: [],
}));

export interface GetRegionsRequest {
  /** Required. The id of the region to retrieve. */
  regionId: string;
  /** Required. The id of the merchant for which to retrieve region definition. */
  merchantId: string;
}

export const GetRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  regionId: Schema.String.pipe(T.HttpPath("regionId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/regions/{regionId}" }),
  svc,
) as unknown as Schema.Schema<GetRegionsRequest>;

export type GetRegionsResponse = Region;
export const GetRegionsResponse = /*@__PURE__*/ /*#__PURE__*/ Region;

export type GetRegionsError = DefaultErrors;

/** Retrieves a region defined in your Merchant Center account. */
export const getRegions: API.OperationMethod<
  GetRegionsRequest,
  GetRegionsResponse,
  GetRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRegionsRequest,
  output: GetRegionsResponse,
  errors: [],
}));

export interface PatchRegionsRequest {
  /** Required. The id of the region to update. */
  regionId: string;
  /** Required. The id of the merchant for which to update region definition. */
  merchantId: string;
  /** Optional. The comma-separated field mask indicating the fields to update. Example: `"displayName,postalCodeArea.regionCode"`. */
  updateMask?: string;
  /** Request body */
  body?: Region;
}

export const PatchRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  regionId: Schema.String.pipe(T.HttpPath("regionId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Region).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "{merchantId}/regions/{regionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchRegionsRequest>;

export type PatchRegionsResponse = Region;
export const PatchRegionsResponse = /*@__PURE__*/ /*#__PURE__*/ Region;

export type PatchRegionsError = DefaultErrors;

/** Updates a region definition in your Merchant Center account. */
export const patchRegions: API.OperationMethod<
  PatchRegionsRequest,
  PatchRegionsResponse,
  PatchRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchRegionsRequest,
  output: PatchRegionsResponse,
  errors: [],
}));

export interface ListRegionsRequest {
  /** Required. The id of the merchant for which to list region definitions. */
  merchantId: string;
  /** The maximum number of regions to return. The service may return fewer than this value. If unspecified, at most 50 rules will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListRegions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRegions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/regions" }),
  svc,
) as unknown as Schema.Schema<ListRegionsRequest>;

export type ListRegionsResponse_Op = ListRegionsResponse;
export const ListRegionsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListRegionsResponse;

export type ListRegionsError = DefaultErrors;

/** Lists the regions in your Merchant Center account. */
export const listRegions: API.PaginatedOperationMethod<
  ListRegionsRequest,
  ListRegionsResponse_Op,
  ListRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteRegionsRequest {
  /** Required. The id of the region to delete. */
  regionId: string;
  /** Required. The id of the merchant for which to delete region definition. */
  merchantId: string;
}

export const DeleteRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  regionId: Schema.String.pipe(T.HttpPath("regionId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/regions/{regionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRegionsRequest>;

export interface DeleteRegionsResponse {}
export const DeleteRegionsResponse: Schema.Schema<DeleteRegionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteRegionsResponse>;

export type DeleteRegionsError = DefaultErrors;

/** Deletes a region definition from your Merchant Center account. */
export const deleteRegions: API.OperationMethod<
  DeleteRegionsRequest,
  DeleteRegionsResponse,
  DeleteRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRegionsRequest,
  output: DeleteRegionsResponse,
  errors: [],
}));

export interface RequestreviewFreelistingsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: RequestReviewFreeListingsRequest;
}

export const RequestreviewFreelistingsprogramRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(RequestReviewFreeListingsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/freelistingsprogram/requestreview",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestreviewFreelistingsprogramRequest>;

export interface RequestreviewFreelistingsprogramResponse {}
export const RequestreviewFreelistingsprogramResponse: Schema.Schema<RequestreviewFreelistingsprogramResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<RequestreviewFreelistingsprogramResponse>;

export type RequestreviewFreelistingsprogramError = DefaultErrors;

/** Requests a review of free listings in a specific region. This method deprecated. Use the `MerchantSupportService` to view product and account issues and request a review. */
export const requestreviewFreelistingsprogram: API.OperationMethod<
  RequestreviewFreelistingsprogramRequest,
  RequestreviewFreelistingsprogramResponse,
  RequestreviewFreelistingsprogramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestreviewFreelistingsprogramRequest,
  output: RequestreviewFreelistingsprogramResponse,
  errors: [],
}));

export interface GetFreelistingsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const GetFreelistingsprogramRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/freelistingsprogram" }),
    svc,
  ) as unknown as Schema.Schema<GetFreelistingsprogramRequest>;

export type GetFreelistingsprogramResponse = FreeListingsProgramStatus;
export const GetFreelistingsprogramResponse =
  /*@__PURE__*/ /*#__PURE__*/ FreeListingsProgramStatus;

export type GetFreelistingsprogramError = DefaultErrors;

/** Retrieves the status and review eligibility for the free listing program. Returns errors and warnings if they require action to resolve, will become disapprovals, or impact impressions. Use `accountstatuses` to view all issues for an account. */
export const getFreelistingsprogram: API.OperationMethod<
  GetFreelistingsprogramRequest,
  GetFreelistingsprogramResponse,
  GetFreelistingsprogramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFreelistingsprogramRequest,
  output: GetFreelistingsprogramResponse,
  errors: [],
}));

export interface GetFreelistingsprogramCheckoutsettingsRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const GetFreelistingsprogramCheckoutsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/freelistingsprogram/checkoutsettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetFreelistingsprogramCheckoutsettingsRequest>;

export type GetFreelistingsprogramCheckoutsettingsResponse = CheckoutSettings;
export const GetFreelistingsprogramCheckoutsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CheckoutSettings;

export type GetFreelistingsprogramCheckoutsettingsError = DefaultErrors;

/** Gets Checkout settings for the given merchant. This includes information about review state, enrollment state and URL settings. */
export const getFreelistingsprogramCheckoutsettings: API.OperationMethod<
  GetFreelistingsprogramCheckoutsettingsRequest,
  GetFreelistingsprogramCheckoutsettingsResponse,
  GetFreelistingsprogramCheckoutsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFreelistingsprogramCheckoutsettingsRequest,
  output: GetFreelistingsprogramCheckoutsettingsResponse,
  errors: [],
}));

export interface InsertFreelistingsprogramCheckoutsettingsRequest {
  /** Required. The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: InsertCheckoutSettingsRequest;
}

export const InsertFreelistingsprogramCheckoutsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(InsertCheckoutSettingsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/freelistingsprogram/checkoutsettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertFreelistingsprogramCheckoutsettingsRequest>;

export type InsertFreelistingsprogramCheckoutsettingsResponse =
  CheckoutSettings;
export const InsertFreelistingsprogramCheckoutsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CheckoutSettings;

export type InsertFreelistingsprogramCheckoutsettingsError = DefaultErrors;

/** Enrolls merchant in `Checkout` program. */
export const insertFreelistingsprogramCheckoutsettings: API.OperationMethod<
  InsertFreelistingsprogramCheckoutsettingsRequest,
  InsertFreelistingsprogramCheckoutsettingsResponse,
  InsertFreelistingsprogramCheckoutsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertFreelistingsprogramCheckoutsettingsRequest,
  output: InsertFreelistingsprogramCheckoutsettingsResponse,
  errors: [],
}));

export interface DeleteFreelistingsprogramCheckoutsettingsRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const DeleteFreelistingsprogramCheckoutsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "{merchantId}/freelistingsprogram/checkoutsettings",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteFreelistingsprogramCheckoutsettingsRequest>;

export interface DeleteFreelistingsprogramCheckoutsettingsResponse {}
export const DeleteFreelistingsprogramCheckoutsettingsResponse: Schema.Schema<DeleteFreelistingsprogramCheckoutsettingsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteFreelistingsprogramCheckoutsettingsResponse>;

export type DeleteFreelistingsprogramCheckoutsettingsError = DefaultErrors;

/** Deletes `Checkout` settings and unenrolls merchant from `Checkout` program. */
export const deleteFreelistingsprogramCheckoutsettings: API.OperationMethod<
  DeleteFreelistingsprogramCheckoutsettingsRequest,
  DeleteFreelistingsprogramCheckoutsettingsResponse,
  DeleteFreelistingsprogramCheckoutsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFreelistingsprogramCheckoutsettingsRequest,
  output: DeleteFreelistingsprogramCheckoutsettingsResponse,
  errors: [],
}));

export interface UpdatelabelsAccountsRequest {
  /** The ID of the managing account. */
  merchantId: string;
  /** The ID of the account whose labels are updated. */
  accountId: string;
  /** Request body */
  body?: AccountsUpdateLabelsRequest;
}

export const UpdatelabelsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    body: Schema.optional(AccountsUpdateLabelsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/accounts/{accountId}/updatelabels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatelabelsAccountsRequest>;

export type UpdatelabelsAccountsResponse = AccountsUpdateLabelsResponse;
export const UpdatelabelsAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsUpdateLabelsResponse;

export type UpdatelabelsAccountsError = DefaultErrors;

/** Updates labels that are assigned to the Merchant Center account by CSS user. */
export const updatelabelsAccounts: API.OperationMethod<
  UpdatelabelsAccountsRequest,
  UpdatelabelsAccountsResponse,
  UpdatelabelsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatelabelsAccountsRequest,
  output: UpdatelabelsAccountsResponse,
  errors: [],
}));

export interface DeleteAccountsRequest {
  /** The ID of the account. */
  accountId: string;
  /** The ID of the managing account. This must be a multi-client account, and accountId must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Option to delete sub-accounts with products. The default value is false. */
  force?: boolean;
}

export const DeleteAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/accounts/{accountId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRequest>;

export interface DeleteAccountsResponse {}
export const DeleteAccountsResponse: Schema.Schema<DeleteAccountsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsResponse>;

export type DeleteAccountsError = DefaultErrors;

/** Deletes a Merchant Center sub-account. */
export const deleteAccounts: API.OperationMethod<
  DeleteAccountsRequest,
  DeleteAccountsResponse,
  DeleteAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountsRequest,
  output: DeleteAccountsResponse,
  errors: [],
}));

export interface RequestphoneverificationAccountsRequest {
  /** Required. The ID of the account. */
  accountId: string;
  /** Required. The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Request body */
  body?: RequestPhoneVerificationRequest;
}

export const RequestphoneverificationAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(RequestPhoneVerificationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/accounts/{accountId}/requestphoneverification",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestphoneverificationAccountsRequest>;

export type RequestphoneverificationAccountsResponse =
  RequestPhoneVerificationResponse;
export const RequestphoneverificationAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RequestPhoneVerificationResponse;

export type RequestphoneverificationAccountsError = DefaultErrors;

/** Request verification code to start phone verification. */
export const requestphoneverificationAccounts: API.OperationMethod<
  RequestphoneverificationAccountsRequest,
  RequestphoneverificationAccountsResponse,
  RequestphoneverificationAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestphoneverificationAccountsRequest,
  output: RequestphoneverificationAccountsResponse,
  errors: [],
}));

export interface GetAccountsRequest {
  /** The ID of the account. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Controls which fields will be populated. Acceptable values are: "merchant" and "css". The default value is "merchant". */
  view?: "MERCHANT" | "CSS" | (string & {});
}

export const GetAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounts/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = /*@__PURE__*/ /*#__PURE__*/ Account;

export type GetAccountsError = DefaultErrors;

/** Retrieves a Merchant Center account. */
export const getAccounts: API.OperationMethod<
  GetAccountsRequest,
  GetAccountsResponse,
  GetAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

export interface ListAccountsRequest {
  /** Controls which fields will be populated. Acceptable values are: "merchant" and "css". The default value is "merchant". */
  view?: "MERCHANT" | "CSS" | (string & {});
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The maximum number of accounts to return in the response, used for paging. */
  maxResults?: number;
  /** If set, only the accounts with the given name (case sensitive) will be returned. */
  name?: string;
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** If view is set to "css", only return accounts that are assigned label with given ID. */
  label?: string;
}

export const ListAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  label: Schema.optional(Schema.String).pipe(T.HttpQuery("label")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = AccountsListResponse;
export const ListAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsListResponse;

export type ListAccountsError = DefaultErrors;

/** Lists the sub-accounts in your Merchant Center account. */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListlinksAccountsRequest {
  /** The ID of the account for which to list links. */
  accountId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The maximum number of links to return in the response, used for pagination. The minimum allowed value is 5 results per page. If provided value is lower than 5, it will be automatically increased to 5. */
  maxResults?: number;
}

export const ListlinksAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/accounts/{accountId}/listlinks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListlinksAccountsRequest>;

export type ListlinksAccountsResponse = AccountsListLinksResponse;
export const ListlinksAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsListLinksResponse;

export type ListlinksAccountsError = DefaultErrors;

/** Returns the list of accounts linked to your Merchant Center account. */
export const listlinksAccounts: API.PaginatedOperationMethod<
  ListlinksAccountsRequest,
  ListlinksAccountsResponse,
  ListlinksAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListlinksAccountsRequest,
  output: ListlinksAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateAccountsRequest {
  /** The ID of the account. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Request body */
  body?: Account;
}

export const UpdateAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "{merchantId}/accounts/{accountId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsRequest>;

export type UpdateAccountsResponse = Account;
export const UpdateAccountsResponse = /*@__PURE__*/ /*#__PURE__*/ Account;

export type UpdateAccountsError = DefaultErrors;

/** Updates a Merchant Center account. Any fields that are not provided are deleted from the resource. */
export const updateAccounts: API.OperationMethod<
  UpdateAccountsRequest,
  UpdateAccountsResponse,
  UpdateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAccountsRequest,
  output: UpdateAccountsResponse,
  errors: [],
}));

export interface VerifyphonenumberAccountsRequest {
  /** Required. The ID of the account. */
  accountId: string;
  /** Required. The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Request body */
  body?: VerifyPhoneNumberRequest;
}

export const VerifyphonenumberAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(VerifyPhoneNumberRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/accounts/{accountId}/verifyphonenumber",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<VerifyphonenumberAccountsRequest>;

export type VerifyphonenumberAccountsResponse = VerifyPhoneNumberResponse;
export const VerifyphonenumberAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ VerifyPhoneNumberResponse;

export type VerifyphonenumberAccountsError = DefaultErrors;

/** Validates verification code to verify phone number for the account. If successful this will overwrite the value of `accounts.businessinformation.phoneNumber`. Only verified phone number will replace an existing verified phone number. */
export const verifyphonenumberAccounts: API.OperationMethod<
  VerifyphonenumberAccountsRequest,
  VerifyphonenumberAccountsResponse,
  VerifyphonenumberAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VerifyphonenumberAccountsRequest,
  output: VerifyphonenumberAccountsResponse,
  errors: [],
}));

export interface ClaimwebsiteAccountsRequest {
  /** The ID of the account whose website is claimed. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Only available to selected merchants, for example multi-client accounts (MCAs) and their sub-accounts. When set to `True`, this option removes any existing claim on the requested website and replaces it with a claim from the account that makes the request. */
  overwrite?: boolean;
}

export const ClaimwebsiteAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    overwrite: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("overwrite")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/accounts/{accountId}/claimwebsite",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ClaimwebsiteAccountsRequest>;

export type ClaimwebsiteAccountsResponse = AccountsClaimWebsiteResponse;
export const ClaimwebsiteAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsClaimWebsiteResponse;

export type ClaimwebsiteAccountsError = DefaultErrors;

/** Claims the website of a Merchant Center sub-account. Merchant accounts with approved third-party CSSs aren't required to claim a website. */
export const claimwebsiteAccounts: API.OperationMethod<
  ClaimwebsiteAccountsRequest,
  ClaimwebsiteAccountsResponse,
  ClaimwebsiteAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ClaimwebsiteAccountsRequest,
  output: ClaimwebsiteAccountsResponse,
  errors: [],
}));

export interface CustombatchAccountsRequest {
  /** Request body */
  body?: AccountsCustomBatchRequest;
}

export const CustombatchAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(AccountsCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "accounts/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchAccountsRequest>;

export type CustombatchAccountsResponse = AccountsCustomBatchResponse;
export const CustombatchAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsCustomBatchResponse;

export type CustombatchAccountsError = DefaultErrors;

/** Retrieves, inserts, updates, and deletes multiple Merchant Center (sub-)accounts in a single request. */
export const custombatchAccounts: API.OperationMethod<
  CustombatchAccountsRequest,
  CustombatchAccountsResponse,
  CustombatchAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchAccountsRequest,
  output: CustombatchAccountsResponse,
  errors: [],
}));

export interface InsertAccountsRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Account;
}

export const InsertAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAccountsRequest>;

export type InsertAccountsResponse = Account;
export const InsertAccountsResponse = /*@__PURE__*/ /*#__PURE__*/ Account;

export type InsertAccountsError = DefaultErrors;

/** Creates a Merchant Center sub-account. */
export const insertAccounts: API.OperationMethod<
  InsertAccountsRequest,
  InsertAccountsResponse,
  InsertAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertAccountsRequest,
  output: InsertAccountsResponse,
  errors: [],
}));

export interface AuthinfoAccountsRequest {}

export const AuthinfoAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "accounts/authinfo" }),
    svc,
  ) as unknown as Schema.Schema<AuthinfoAccountsRequest>;

export type AuthinfoAccountsResponse = AccountsAuthInfoResponse;
export const AuthinfoAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsAuthInfoResponse;

export type AuthinfoAccountsError = DefaultErrors;

/** Returns information about the authenticated user. */
export const authinfoAccounts: API.OperationMethod<
  AuthinfoAccountsRequest,
  AuthinfoAccountsResponse,
  AuthinfoAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AuthinfoAccountsRequest,
  output: AuthinfoAccountsResponse,
  errors: [],
}));

export interface LinkAccountsRequest {
  /** The ID of the account that should be linked. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Request body */
  body?: AccountsLinkRequest;
}

export const LinkAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(AccountsLinkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "{merchantId}/accounts/{accountId}/link",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<LinkAccountsRequest>;

export type LinkAccountsResponse = AccountsLinkResponse;
export const LinkAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountsLinkResponse;

export type LinkAccountsError = DefaultErrors;

/** Performs an action on a link between two Merchant Center accounts, namely accountId and linkedAccountId. */
export const linkAccounts: API.OperationMethod<
  LinkAccountsRequest,
  LinkAccountsResponse,
  LinkAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LinkAccountsRequest,
  output: LinkAccountsResponse,
  errors: [],
}));

export interface DeleteAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
  /** Required. The Google-provided unique carrier ID, used to update the resource. */
  carrierAccountId: string;
}

export const DeleteAccountsReturncarrierRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    carrierAccountId: Schema.String.pipe(T.HttpPath("carrierAccountId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "accounts/{accountId}/returncarrier/{carrierAccountId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAccountsReturncarrierRequest>;

export interface DeleteAccountsReturncarrierResponse {}
export const DeleteAccountsReturncarrierResponse: Schema.Schema<DeleteAccountsReturncarrierResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsReturncarrierResponse>;

export type DeleteAccountsReturncarrierError = DefaultErrors;

/** Delete a return carrier in the merchant account. */
export const deleteAccountsReturncarrier: API.OperationMethod<
  DeleteAccountsReturncarrierRequest,
  DeleteAccountsReturncarrierResponse,
  DeleteAccountsReturncarrierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountsReturncarrierRequest,
  output: DeleteAccountsReturncarrierResponse,
  errors: [],
}));

export interface CreateAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
  /** Request body */
  body?: AccountReturnCarrier;
}

export const CreateAccountsReturncarrierRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    body: Schema.optional(AccountReturnCarrier).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "accounts/{accountId}/returncarrier",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAccountsReturncarrierRequest>;

export type CreateAccountsReturncarrierResponse = AccountReturnCarrier;
export const CreateAccountsReturncarrierResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountReturnCarrier;

export type CreateAccountsReturncarrierError = DefaultErrors;

/** Links return carrier to a merchant account. */
export const createAccountsReturncarrier: API.OperationMethod<
  CreateAccountsReturncarrierRequest,
  CreateAccountsReturncarrierResponse,
  CreateAccountsReturncarrierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccountsReturncarrierRequest,
  output: CreateAccountsReturncarrierResponse,
  errors: [],
}));

export interface PatchAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
  /** Required. The Google-provided unique carrier ID, used to update the resource. */
  carrierAccountId: string;
  /** Request body */
  body?: AccountReturnCarrier;
}

export const PatchAccountsReturncarrierRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    carrierAccountId: Schema.String.pipe(T.HttpPath("carrierAccountId")),
    body: Schema.optional(AccountReturnCarrier).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/{accountId}/returncarrier/{carrierAccountId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAccountsReturncarrierRequest>;

export type PatchAccountsReturncarrierResponse = AccountReturnCarrier;
export const PatchAccountsReturncarrierResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountReturnCarrier;

export type PatchAccountsReturncarrierError = DefaultErrors;

/** Updates a return carrier in the merchant account. */
export const patchAccountsReturncarrier: API.OperationMethod<
  PatchAccountsReturncarrierRequest,
  PatchAccountsReturncarrierResponse,
  PatchAccountsReturncarrierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccountsReturncarrierRequest,
  output: PatchAccountsReturncarrierResponse,
  errors: [],
}));

export interface ListAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
}

export const ListAccountsReturncarrierRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
  }).pipe(
    T.Http({ method: "GET", path: "accounts/{accountId}/returncarrier" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsReturncarrierRequest>;

export type ListAccountsReturncarrierResponse =
  ListAccountReturnCarrierResponse;
export const ListAccountsReturncarrierResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAccountReturnCarrierResponse;

export type ListAccountsReturncarrierError = DefaultErrors;

/** Lists available return carriers in the merchant account. */
export const listAccountsReturncarrier: API.OperationMethod<
  ListAccountsReturncarrierRequest,
  ListAccountsReturncarrierResponse,
  ListAccountsReturncarrierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAccountsReturncarrierRequest,
  output: ListAccountsReturncarrierResponse,
  errors: [],
}));

export interface CreateAccountsCredentialsRequest {
  /** Required. The merchant id of the account these credentials belong to. */
  accountId: string;
  /** Request body */
  body?: AccountCredentials;
}

export const CreateAccountsCredentialsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    body: Schema.optional(AccountCredentials).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "accounts/{accountId}/credentials",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAccountsCredentialsRequest>;

export type CreateAccountsCredentialsResponse = AccountCredentials;
export const CreateAccountsCredentialsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountCredentials;

export type CreateAccountsCredentialsError = DefaultErrors;

/** Uploads credentials for the Merchant Center account. If credentials already exist for this Merchant Center account and purpose, this method updates them. */
export const createAccountsCredentials: API.OperationMethod<
  CreateAccountsCredentialsRequest,
  CreateAccountsCredentialsResponse,
  CreateAccountsCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccountsCredentialsRequest,
  output: CreateAccountsCredentialsResponse,
  errors: [],
}));

export interface ListAccountsLabelsRequest {
  /** Required. The account id for whose labels are to be listed. */
  accountId: string;
  /** The maximum number of labels to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListAccountLabels` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountLabels` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "accounts/{accountId}/labels" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsLabelsRequest>;

export type ListAccountsLabelsResponse = ListAccountLabelsResponse;
export const ListAccountsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAccountLabelsResponse;

export type ListAccountsLabelsError = DefaultErrors;

/** Lists the labels assigned to an account. */
export const listAccountsLabels: API.PaginatedOperationMethod<
  ListAccountsLabelsRequest,
  ListAccountsLabelsResponse,
  ListAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsLabelsRequest,
  output: ListAccountsLabelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAccountsLabelsRequest {
  /** Required. The id of the account this label belongs to. */
  accountId: string;
  /** Request body */
  body?: AccountLabel;
}

export const CreateAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "accounts/{accountId}/labels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAccountsLabelsRequest>;

export type CreateAccountsLabelsResponse = AccountLabel;
export const CreateAccountsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountLabel;

export type CreateAccountsLabelsError = DefaultErrors;

/** Creates a new label, not assigned to any account. */
export const createAccountsLabels: API.OperationMethod<
  CreateAccountsLabelsRequest,
  CreateAccountsLabelsResponse,
  CreateAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccountsLabelsRequest,
  output: CreateAccountsLabelsResponse,
  errors: [],
}));

export interface PatchAccountsLabelsRequest {
  /** Required. The id of the account this label belongs to. */
  accountId: string;
  /** Required. The id of the label to update. */
  labelId: string;
  /** Request body */
  body?: AccountLabel;
}

export const PatchAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    labelId: Schema.String.pipe(T.HttpPath("labelId")),
    body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "accounts/{accountId}/labels/{labelId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAccountsLabelsRequest>;

export type PatchAccountsLabelsResponse = AccountLabel;
export const PatchAccountsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountLabel;

export type PatchAccountsLabelsError = DefaultErrors;

/** Updates a label. */
export const patchAccountsLabels: API.OperationMethod<
  PatchAccountsLabelsRequest,
  PatchAccountsLabelsResponse,
  PatchAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccountsLabelsRequest,
  output: PatchAccountsLabelsResponse,
  errors: [],
}));

export interface DeleteAccountsLabelsRequest {
  /** Required. The id of the account that owns the label. */
  accountId: string;
  /** Required. The id of the label to delete. */
  labelId: string;
}

export const DeleteAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    labelId: Schema.String.pipe(T.HttpPath("labelId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "accounts/{accountId}/labels/{labelId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteAccountsLabelsRequest>;

export interface DeleteAccountsLabelsResponse {}
export const DeleteAccountsLabelsResponse: Schema.Schema<DeleteAccountsLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsLabelsResponse>;

export type DeleteAccountsLabelsError = DefaultErrors;

/** Deletes a label and removes it from all accounts to which it was assigned. */
export const deleteAccountsLabels: API.OperationMethod<
  DeleteAccountsLabelsRequest,
  DeleteAccountsLabelsResponse,
  DeleteAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountsLabelsRequest,
  output: DeleteAccountsLabelsResponse,
  errors: [],
}));

export interface SearchReportsRequest {
  /** Required. Id of the merchant making the call. Must be a standalone account or an MCA subaccount. */
  merchantId: string;
  /** Request body */
  body?: SearchRequest;
}

export const SearchReportsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(SearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "{merchantId}/reports/search",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SearchReportsRequest>;

export type SearchReportsResponse = SearchResponse;
export const SearchReportsResponse = /*@__PURE__*/ /*#__PURE__*/ SearchResponse;

export type SearchReportsError = DefaultErrors;

/** Retrieves merchant performance metrics matching the search query and optionally segmented by selected dimensions. */
export const searchReports: API.OperationMethod<
  SearchReportsRequest,
  SearchReportsResponse,
  SearchReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchReportsRequest,
  output: SearchReportsResponse,
  errors: [],
}));

export interface GetPubsubnotificationsettingsRequest {
  /** The ID of the account for which to get pubsub notification settings. */
  merchantId: string;
}

export const GetPubsubnotificationsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/pubsubnotificationsettings" }),
    svc,
  ) as unknown as Schema.Schema<GetPubsubnotificationsettingsRequest>;

export type GetPubsubnotificationsettingsResponse = PubsubNotificationSettings;
export const GetPubsubnotificationsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PubsubNotificationSettings;

export type GetPubsubnotificationsettingsError = DefaultErrors;

/** Retrieves a Merchant Center account's pubsub notification settings. */
export const getPubsubnotificationsettings: API.OperationMethod<
  GetPubsubnotificationsettingsRequest,
  GetPubsubnotificationsettingsResponse,
  GetPubsubnotificationsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPubsubnotificationsettingsRequest,
  output: GetPubsubnotificationsettingsResponse,
  errors: [],
}));

export interface UpdatePubsubnotificationsettingsRequest {
  /** The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: PubsubNotificationSettings;
}

export const UpdatePubsubnotificationsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(PubsubNotificationSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "{merchantId}/pubsubnotificationsettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatePubsubnotificationsettingsRequest>;

export type UpdatePubsubnotificationsettingsResponse =
  PubsubNotificationSettings;
export const UpdatePubsubnotificationsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PubsubNotificationSettings;

export type UpdatePubsubnotificationsettingsError = DefaultErrors;

/** Register a Merchant Center account for pubsub notifications. Note that cloud topic name shouldn't be provided as part of the request. */
export const updatePubsubnotificationsettings: API.OperationMethod<
  UpdatePubsubnotificationsettingsRequest,
  UpdatePubsubnotificationsettingsResponse,
  UpdatePubsubnotificationsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePubsubnotificationsettingsRequest,
  output: UpdatePubsubnotificationsettingsResponse,
  errors: [],
}));

export interface DeleteProductdeliverytimeRequest {
  /** Required. The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`. */
  productId: string;
  /** Required. The Google merchant ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
}

export const DeleteProductdeliverytimeRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    productId: Schema.String.pipe(T.HttpPath("productId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "{merchantId}/productdeliverytime/{productId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProductdeliverytimeRequest>;

export interface DeleteProductdeliverytimeResponse {}
export const DeleteProductdeliverytimeResponse: Schema.Schema<DeleteProductdeliverytimeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteProductdeliverytimeResponse>;

export type DeleteProductdeliverytimeError = DefaultErrors;

/** Deletes the delivery time of a product. */
export const deleteProductdeliverytime: API.OperationMethod<
  DeleteProductdeliverytimeRequest,
  DeleteProductdeliverytimeResponse,
  DeleteProductdeliverytimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProductdeliverytimeRequest,
  output: DeleteProductdeliverytimeResponse,
  errors: [],
}));

export interface CreateProductdeliverytimeRequest {
  /** The Google merchant ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: ProductDeliveryTime;
}

export const CreateProductdeliverytimeRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(ProductDeliveryTime).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/productdeliverytime",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProductdeliverytimeRequest>;

export type CreateProductdeliverytimeResponse = ProductDeliveryTime;
export const CreateProductdeliverytimeResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductDeliveryTime;

export type CreateProductdeliverytimeError = DefaultErrors;

/** Creates or updates the delivery time of a product. */
export const createProductdeliverytime: API.OperationMethod<
  CreateProductdeliverytimeRequest,
  CreateProductdeliverytimeResponse,
  CreateProductdeliverytimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProductdeliverytimeRequest,
  output: CreateProductdeliverytimeResponse,
  errors: [],
}));

export interface GetProductdeliverytimeRequest {
  /** Required. The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`. */
  productId: string;
  /** Required. The Google merchant ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
}

export const GetProductdeliverytimeRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    productId: Schema.String.pipe(T.HttpPath("productId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/productdeliverytime/{productId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProductdeliverytimeRequest>;

export type GetProductdeliverytimeResponse = ProductDeliveryTime;
export const GetProductdeliverytimeResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductDeliveryTime;

export type GetProductdeliverytimeError = DefaultErrors;

/** Gets `productDeliveryTime` by `productId`. */
export const getProductdeliverytime: API.OperationMethod<
  GetProductdeliverytimeRequest,
  GetProductdeliverytimeResponse,
  GetProductdeliverytimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProductdeliverytimeRequest,
  output: GetProductdeliverytimeResponse,
  errors: [],
}));

export interface ListCollectionstatusesRequest {
  /** The maximum number of collection statuses to return in the response, used for paging. Defaults to 50; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
}

export const ListCollectionstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/collectionstatuses" }),
    svc,
  ) as unknown as Schema.Schema<ListCollectionstatusesRequest>;

export type ListCollectionstatusesResponse = ListCollectionStatusesResponse;
export const ListCollectionstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCollectionStatusesResponse;

export type ListCollectionstatusesError = DefaultErrors;

/** Lists the statuses of the collections in your Merchant Center account. */
export const listCollectionstatuses: API.PaginatedOperationMethod<
  ListCollectionstatusesRequest,
  ListCollectionstatusesResponse,
  ListCollectionstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCollectionstatusesRequest,
  output: ListCollectionstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCollectionstatusesRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The collectionId of the collection. CollectionId is the same as the REST ID of the collection. */
  collectionId: string;
}

export const GetCollectionstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/collectionstatuses/{collectionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetCollectionstatusesRequest>;

export type GetCollectionstatusesResponse = CollectionStatus;
export const GetCollectionstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CollectionStatus;

export type GetCollectionstatusesError = DefaultErrors;

/** Gets the status of a collection from your Merchant Center account. */
export const getCollectionstatuses: API.OperationMethod<
  GetCollectionstatusesRequest,
  GetCollectionstatusesResponse,
  GetCollectionstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCollectionstatusesRequest,
  output: GetCollectionstatusesResponse,
  errors: [],
}));

export interface UpdateProductsRequest {
  /** The REST ID of the product for which to update. */
  productId: string;
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The comma-separated list of product attributes to be updated. Example: `"title,salePrice"`. Attributes specified in the update mask without a value specified in the body will be deleted from the product. *You must specify the update mask to delete attributes.* Only top-level product attributes can be updated. If not defined, product attributes with set values will be updated and other attributes will stay unchanged. */
  updateMask?: string;
  /** Request body */
  body?: Product;
}

export const UpdateProductsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "{merchantId}/products/{productId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateProductsRequest>;

export type UpdateProductsResponse = Product;
export const UpdateProductsResponse = /*@__PURE__*/ /*#__PURE__*/ Product;

export type UpdateProductsError = DefaultErrors;

/** Updates an existing product in your Merchant Center account. Only updates attributes provided in the request. */
export const updateProducts: API.OperationMethod<
  UpdateProductsRequest,
  UpdateProductsResponse,
  UpdateProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProductsRequest,
  output: UpdateProductsResponse,
  errors: [],
}));

export interface GetProductsRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product. */
  productId: string;
}

export const GetProductsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/products/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetProductsRequest>;

export type GetProductsResponse = Product;
export const GetProductsResponse = /*@__PURE__*/ /*#__PURE__*/ Product;

export type GetProductsError = DefaultErrors;

/** Retrieves a product from your Merchant Center account. */
export const getProducts: API.OperationMethod<
  GetProductsRequest,
  GetProductsResponse,
  GetProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProductsRequest,
  output: GetProductsResponse,
  errors: [],
}));

export interface InsertProductsRequest {
  /** The Content API Supplemental Feed ID. If present then product insertion applies to the data in a supplemental feed. */
  feedId?: string;
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Product;
}

export const InsertProductsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  feedId: Schema.optional(Schema.String).pipe(T.HttpQuery("feedId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/products", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertProductsRequest>;

export type InsertProductsResponse = Product;
export const InsertProductsResponse = /*@__PURE__*/ /*#__PURE__*/ Product;

export type InsertProductsError = DefaultErrors;

/** Uploads a product to your Merchant Center account. If an item with the same channel, contentLanguage, offerId, and targetCountry already exists, this method updates that entry. */
export const insertProducts: API.OperationMethod<
  InsertProductsRequest,
  InsertProductsResponse,
  InsertProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertProductsRequest,
  output: InsertProductsResponse,
  errors: [],
}));

export interface ListProductsRequest {
  /** The ID of the account that contains the products. This account cannot be a multi-client account. */
  merchantId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The maximum number of products to return in the response, used for paging. The default value is 25. The maximum value is 250. */
  maxResults?: number;
}

export const ListProductsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/products" }),
  svc,
) as unknown as Schema.Schema<ListProductsRequest>;

export type ListProductsResponse = ProductsListResponse;
export const ListProductsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductsListResponse;

export type ListProductsError = DefaultErrors;

/** Lists the products in your Merchant Center account. The response might contain fewer items than specified by maxResults. Rely on nextPageToken to determine if there are more items to be requested. */
export const listProducts: API.PaginatedOperationMethod<
  ListProductsRequest,
  ListProductsResponse,
  ListProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProductsRequest,
  output: ListProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProductsRequest {
  /** The REST ID of the product. */
  productId: string;
  /** The Content API Supplemental Feed ID. If present then product deletion applies to the data in a supplemental feed. If absent, entire product will be deleted. */
  feedId?: string;
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
}

export const DeleteProductsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  feedId: Schema.optional(Schema.String).pipe(T.HttpQuery("feedId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/products/{productId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProductsRequest>;

export interface DeleteProductsResponse {}
export const DeleteProductsResponse: Schema.Schema<DeleteProductsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteProductsResponse>;

export type DeleteProductsError = DefaultErrors;

/** Deletes a product from your Merchant Center account. */
export const deleteProducts: API.OperationMethod<
  DeleteProductsRequest,
  DeleteProductsResponse,
  DeleteProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProductsRequest,
  output: DeleteProductsResponse,
  errors: [],
}));

export interface CustombatchProductsRequest {
  /** Request body */
  body?: ProductsCustomBatchRequest;
}

export const CustombatchProductsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(ProductsCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "products/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchProductsRequest>;

export type CustombatchProductsResponse = ProductsCustomBatchResponse;
export const CustombatchProductsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ProductsCustomBatchResponse;

export type CustombatchProductsError = DefaultErrors;

/** Retrieves, inserts, and deletes multiple products in a single request. */
export const custombatchProducts: API.OperationMethod<
  CustombatchProductsRequest,
  CustombatchProductsResponse,
  CustombatchProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchProductsRequest,
  output: CustombatchProductsResponse,
  errors: [],
}));

export interface RenderaccountissuesMerchantsupportRequest {
  /** Optional. The [IETF BCP-47](https://tools.ietf.org/html/bcp47) language code used to localize support content. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Required. The ID of the account to fetch issues for. */
  merchantId: string;
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in support content. For example 'America/Los_Angeles'. If not set, results will use as a default UTC. */
  timeZone?: string;
  /** Request body */
  body?: RenderAccountIssuesRequestPayload;
}

export const RenderaccountissuesMerchantsupportRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
    body: Schema.optional(RenderAccountIssuesRequestPayload).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/merchantsupport/renderaccountissues",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RenderaccountissuesMerchantsupportRequest>;

export type RenderaccountissuesMerchantsupportResponse =
  RenderAccountIssuesResponse;
export const RenderaccountissuesMerchantsupportResponse =
  /*@__PURE__*/ /*#__PURE__*/ RenderAccountIssuesResponse;

export type RenderaccountissuesMerchantsupportError = DefaultErrors;

/** Provide a list of merchant's issues with a support content and available actions. This content and actions are meant to be rendered and shown in third-party applications. */
export const renderaccountissuesMerchantsupport: API.OperationMethod<
  RenderaccountissuesMerchantsupportRequest,
  RenderaccountissuesMerchantsupportResponse,
  RenderaccountissuesMerchantsupportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RenderaccountissuesMerchantsupportRequest,
  output: RenderaccountissuesMerchantsupportResponse,
  errors: [],
}));

export interface RenderproductissuesMerchantsupportRequest {
  /** Optional. The [IETF BCP-47](https://tools.ietf.org/html/bcp47) language code used to localize support content. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Required. The ID of the account that contains the product. */
  merchantId: string;
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in support content. For example 'America/Los_Angeles'. If not set, results will use as a default UTC. */
  timeZone?: string;
  /** Required. The [REST_ID](https://developers.google.com/shopping-content/reference/rest/v2.1/products#Product.FIELDS.id) of the product to fetch issues for. */
  productId: string;
  /** Request body */
  body?: RenderProductIssuesRequestPayload;
}

export const RenderproductissuesMerchantsupportRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
    productId: Schema.String.pipe(T.HttpPath("productId")),
    body: Schema.optional(RenderProductIssuesRequestPayload).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/merchantsupport/renderproductissues/{productId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RenderproductissuesMerchantsupportRequest>;

export type RenderproductissuesMerchantsupportResponse =
  RenderProductIssuesResponse;
export const RenderproductissuesMerchantsupportResponse =
  /*@__PURE__*/ /*#__PURE__*/ RenderProductIssuesResponse;

export type RenderproductissuesMerchantsupportError = DefaultErrors;

/** Provide a list of issues for merchant's product with a support content and available actions. This content and actions are meant to be rendered and shown in third-party applications. */
export const renderproductissuesMerchantsupport: API.OperationMethod<
  RenderproductissuesMerchantsupportRequest,
  RenderproductissuesMerchantsupportResponse,
  RenderproductissuesMerchantsupportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RenderproductissuesMerchantsupportRequest,
  output: RenderproductissuesMerchantsupportResponse,
  errors: [],
}));

export interface TriggeractionMerchantsupportRequest {
  /** Required. The ID of the merchant's account. */
  merchantId: string;
  /** Optional. Language code [IETF BCP 47 syntax](https://tools.ietf.org/html/bcp47) used to localize the response. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Request body */
  body?: TriggerActionPayload;
}

export const TriggeractionMerchantsupportRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(TriggerActionPayload).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/merchantsupport/triggeraction",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TriggeractionMerchantsupportRequest>;

export type TriggeractionMerchantsupportResponse = TriggerActionResponse;
export const TriggeractionMerchantsupportResponse =
  /*@__PURE__*/ /*#__PURE__*/ TriggerActionResponse;

export type TriggeractionMerchantsupportError = DefaultErrors;

/** Start an action. The action can be requested by merchants in third-party application. Before merchants can request the action, the third-party application needs to show them action specific content and display a user input form. You can request access using [Trigger action allowlist form](https://docs.google.com/forms/d/e/1FAIpQLSfeV_sBW9MBQv9BMTV6JZ1g11PGHLdHsrefca-9h0LmpU7CUg/viewform?usp=sharing). The action can be successfully started only once all `required` inputs are provided. If any `required` input is missing, or invalid value was provided, the service will return 400 error. Validation errors will contain Ids for all problematic field together with translated, human readable error messages that can be shown to the user. */
export const triggeractionMerchantsupport: API.OperationMethod<
  TriggeractionMerchantsupportRequest,
  TriggeractionMerchantsupportResponse,
  TriggeractionMerchantsupportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TriggeractionMerchantsupportRequest,
  output: TriggeractionMerchantsupportResponse,
  errors: [],
}));

export interface InsertRegionalinventoryRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product for which to update the regional inventory. */
  productId: string;
  /** Request body */
  body?: RegionalInventory;
}

export const InsertRegionalinventoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    productId: Schema.String.pipe(T.HttpPath("productId")),
    body: Schema.optional(RegionalInventory).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/products/{productId}/regionalinventory",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertRegionalinventoryRequest>;

export type InsertRegionalinventoryResponse = RegionalInventory;
export const InsertRegionalinventoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ RegionalInventory;

export type InsertRegionalinventoryError = DefaultErrors;

/** Updates the regional inventory of a product in your Merchant Center account. If a regional inventory with the same region ID already exists, this method updates that entry. */
export const insertRegionalinventory: API.OperationMethod<
  InsertRegionalinventoryRequest,
  InsertRegionalinventoryResponse,
  InsertRegionalinventoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertRegionalinventoryRequest,
  output: InsertRegionalinventoryResponse,
  errors: [],
}));

export interface CustombatchRegionalinventoryRequest {
  /** Request body */
  body?: RegionalinventoryCustomBatchRequest;
}

export const CustombatchRegionalinventoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(RegionalinventoryCustomBatchRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({ method: "POST", path: "regionalinventory/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchRegionalinventoryRequest>;

export type CustombatchRegionalinventoryResponse =
  RegionalinventoryCustomBatchResponse;
export const CustombatchRegionalinventoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ RegionalinventoryCustomBatchResponse;

export type CustombatchRegionalinventoryError = DefaultErrors;

/** Updates regional inventory for multiple products or regions in a single request. */
export const custombatchRegionalinventory: API.OperationMethod<
  CustombatchRegionalinventoryRequest,
  CustombatchRegionalinventoryResponse,
  CustombatchRegionalinventoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchRegionalinventoryRequest,
  output: CustombatchRegionalinventoryResponse,
  errors: [],
}));

export interface ListQuotasRequest {
  /** Required. The ID of the account that has quota. This account must be an admin. */
  merchantId: string;
  /** The maximum number of quotas to return in the response, used for paging. Defaults to 500; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListQuotasRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/quotas" }),
  svc,
) as unknown as Schema.Schema<ListQuotasRequest>;

export type ListQuotasResponse = ListMethodQuotasResponse;
export const ListQuotasResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMethodQuotasResponse;

export type ListQuotasError = DefaultErrors;

/** Lists the daily call quota and usage per method for your Merchant Center account. */
export const listQuotas: API.PaginatedOperationMethod<
  ListQuotasRequest,
  ListQuotasResponse,
  ListQuotasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListQuotasRequest,
  output: ListQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GenerateRecommendationsRequest {
  /** Required. The ID of the account to fetch recommendations for. */
  merchantId: string;
  /** Optional. List of allowed tags. Tags are a set of predefined strings that describe the category that individual recommendation types belong to. User can specify zero or more tags in this field to indicate what categories of recommendations they want to receive. Current list of supported tags: - TREND */
  allowedTag?: string[];
  /** Optional. Language code of the client. If not set, the result will be in default language (English). This language code affects all fields prefixed with "localized". This should be set to ISO 639-1 country code. List of currently verified supported language code: en, fr, cs, da, de, es, it, nl, no, pl, pt, pt, fi, sv, vi, tr, th, ko, zh-CN, zh-TW, ja, id, hi */
  languageCode?: string;
}

export const GenerateRecommendationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    allowedTag: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("allowedTag"),
    ),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/recommendations/generate" }),
    svc,
  ) as unknown as Schema.Schema<GenerateRecommendationsRequest>;

export type GenerateRecommendationsResponse_Op =
  GenerateRecommendationsResponse;
export const GenerateRecommendationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ GenerateRecommendationsResponse;

export type GenerateRecommendationsError = DefaultErrors;

/** Generates recommendations for a merchant. */
export const generateRecommendations: API.OperationMethod<
  GenerateRecommendationsRequest,
  GenerateRecommendationsResponse_Op,
  GenerateRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateRecommendationsRequest,
  output: GenerateRecommendationsResponse_Op,
  errors: [],
}));

export interface ReportInteractionRecommendationsRequest {
  /** Required. The ID of the account that wants to report an interaction. */
  merchantId: string;
  /** Request body */
  body?: ReportInteractionRequest;
}

export const ReportInteractionRecommendationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(ReportInteractionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/recommendations/reportInteraction",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReportInteractionRecommendationsRequest>;

export interface ReportInteractionRecommendationsResponse {}
export const ReportInteractionRecommendationsResponse: Schema.Schema<ReportInteractionRecommendationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<ReportInteractionRecommendationsResponse>;

export type ReportInteractionRecommendationsError = DefaultErrors;

/** Reports an interaction on a recommendation for a merchant. */
export const reportInteractionRecommendations: API.OperationMethod<
  ReportInteractionRecommendationsRequest,
  ReportInteractionRecommendationsResponse,
  ReportInteractionRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReportInteractionRecommendationsRequest,
  output: ReportInteractionRecommendationsResponse,
  errors: [],
}));

export interface GetShoppingadsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const GetShoppingadsprogramRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/shoppingadsprogram" }),
    svc,
  ) as unknown as Schema.Schema<GetShoppingadsprogramRequest>;

export type GetShoppingadsprogramResponse = ShoppingAdsProgramStatus;
export const GetShoppingadsprogramResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShoppingAdsProgramStatus;

export type GetShoppingadsprogramError = DefaultErrors;

/** Retrieves the status and review eligibility for the Shopping Ads program. Returns errors and warnings if they require action to resolve, will become disapprovals, or impact impressions. Use `accountstatuses` to view all issues for an account. */
export const getShoppingadsprogram: API.OperationMethod<
  GetShoppingadsprogramRequest,
  GetShoppingadsprogramResponse,
  GetShoppingadsprogramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetShoppingadsprogramRequest,
  output: GetShoppingadsprogramResponse,
  errors: [],
}));

export interface RequestreviewShoppingadsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: RequestReviewShoppingAdsRequest;
}

export const RequestreviewShoppingadsprogramRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(RequestReviewShoppingAdsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/shoppingadsprogram/requestreview",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestreviewShoppingadsprogramRequest>;

export interface RequestreviewShoppingadsprogramResponse {}
export const RequestreviewShoppingadsprogramResponse: Schema.Schema<RequestreviewShoppingadsprogramResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<RequestreviewShoppingadsprogramResponse>;

export type RequestreviewShoppingadsprogramError = DefaultErrors;

/** Requests a review of Shopping ads in a specific region. This method deprecated. Use the `MerchantSupportService` to view product and account issues and request a review. */
export const requestreviewShoppingadsprogram: API.OperationMethod<
  RequestreviewShoppingadsprogramRequest,
  RequestreviewShoppingadsprogramResponse,
  RequestreviewShoppingadsprogramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestreviewShoppingadsprogramRequest,
  output: RequestreviewShoppingadsprogramResponse,
  errors: [],
}));

export interface InsertLocalinventoryRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product for which to update local inventory. */
  productId: string;
  /** Request body */
  body?: LocalInventory;
}

export const InsertLocalinventoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    productId: Schema.String.pipe(T.HttpPath("productId")),
    body: Schema.optional(LocalInventory).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/products/{productId}/localinventory",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertLocalinventoryRequest>;

export type InsertLocalinventoryResponse = LocalInventory;
export const InsertLocalinventoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ LocalInventory;

export type InsertLocalinventoryError = DefaultErrors;

/** Updates the local inventory of a product in your Merchant Center account. */
export const insertLocalinventory: API.OperationMethod<
  InsertLocalinventoryRequest,
  InsertLocalinventoryResponse,
  InsertLocalinventoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertLocalinventoryRequest,
  output: InsertLocalinventoryResponse,
  errors: [],
}));

export interface CustombatchLocalinventoryRequest {
  /** Request body */
  body?: LocalinventoryCustomBatchRequest;
}

export const CustombatchLocalinventoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(LocalinventoryCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "localinventory/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchLocalinventoryRequest>;

export type CustombatchLocalinventoryResponse =
  LocalinventoryCustomBatchResponse;
export const CustombatchLocalinventoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ LocalinventoryCustomBatchResponse;

export type CustombatchLocalinventoryError = DefaultErrors;

/** Updates local inventory for multiple products or stores in a single request. */
export const custombatchLocalinventory: API.OperationMethod<
  CustombatchLocalinventoryRequest,
  CustombatchLocalinventoryResponse,
  CustombatchLocalinventoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchLocalinventoryRequest,
  output: CustombatchLocalinventoryResponse,
  errors: [],
}));

export interface ListCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of collections to return in the response, used for paging. Defaults to 50; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListCollectionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "{merchantId}/collections" }),
  svc,
) as unknown as Schema.Schema<ListCollectionsRequest>;

export type ListCollectionsResponse_Op = ListCollectionsResponse;
export const ListCollectionsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCollectionsResponse;

export type ListCollectionsError = DefaultErrors;

/** Lists the collections in your Merchant Center account. The response might contain fewer items than specified by page_size. Rely on next_page_token to determine if there are more items to be requested. */
export const listCollections: API.PaginatedOperationMethod<
  ListCollectionsRequest,
  ListCollectionsResponse_Op,
  ListCollectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCollectionsRequest,
  output: ListCollectionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Collection;
}

export const CreateCollectionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(Collection).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "{merchantId}/collections", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateCollectionsRequest>;

export type CreateCollectionsResponse = Collection;
export const CreateCollectionsResponse = /*@__PURE__*/ /*#__PURE__*/ Collection;

export type CreateCollectionsError = DefaultErrors;

/** Uploads a collection to your Merchant Center account. If a collection with the same collectionId already exists, this method updates that entry. In each update, the collection is completely replaced by the fields in the body of the update request. */
export const createCollections: API.OperationMethod<
  CreateCollectionsRequest,
  CreateCollectionsResponse,
  CreateCollectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCollectionsRequest,
  output: CreateCollectionsResponse,
  errors: [],
}));

export interface DeleteCollectionsRequest {
  /** Required. The collectionId of the collection. CollectionId is the same as the REST ID of the collection. */
  collectionId: string;
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
}

export const DeleteCollectionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "{merchantId}/collections/{collectionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteCollectionsRequest>;

export interface DeleteCollectionsResponse {}
export const DeleteCollectionsResponse: Schema.Schema<DeleteCollectionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteCollectionsResponse>;

export type DeleteCollectionsError = DefaultErrors;

/** Deletes a collection from your Merchant Center account. */
export const deleteCollections: API.OperationMethod<
  DeleteCollectionsRequest,
  DeleteCollectionsResponse,
  DeleteCollectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCollectionsRequest,
  output: DeleteCollectionsResponse,
  errors: [],
}));

export interface GetCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The REST ID of the collection. */
  collectionId: string;
}

export const GetCollectionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/collections/{collectionId}" }),
  svc,
) as unknown as Schema.Schema<GetCollectionsRequest>;

export type GetCollectionsResponse = Collection;
export const GetCollectionsResponse = /*@__PURE__*/ /*#__PURE__*/ Collection;

export type GetCollectionsError = DefaultErrors;

/** Retrieves a collection from your Merchant Center account. */
export const getCollections: API.OperationMethod<
  GetCollectionsRequest,
  GetCollectionsResponse,
  GetCollectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCollectionsRequest,
  output: GetCollectionsResponse,
  errors: [],
}));

export interface GetaccessiblegmbaccountsLiasettingsRequest {
  /** The ID of the account for which to retrieve accessible Business Profiles. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
}

export const GetaccessiblegmbaccountsLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/liasettings/{accountId}/accessiblegmbaccounts",
    }),
    svc,
  ) as unknown as Schema.Schema<GetaccessiblegmbaccountsLiasettingsRequest>;

export type GetaccessiblegmbaccountsLiasettingsResponse =
  LiasettingsGetAccessibleGmbAccountsResponse;
export const GetaccessiblegmbaccountsLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsGetAccessibleGmbAccountsResponse;

export type GetaccessiblegmbaccountsLiasettingsError = DefaultErrors;

/** Retrieves the list of accessible Business Profiles. */
export const getaccessiblegmbaccountsLiasettings: API.OperationMethod<
  GetaccessiblegmbaccountsLiasettingsRequest,
  GetaccessiblegmbaccountsLiasettingsResponse,
  GetaccessiblegmbaccountsLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetaccessiblegmbaccountsLiasettingsRequest,
  output: GetaccessiblegmbaccountsLiasettingsResponse,
  errors: [],
}));

export interface SetinventoryverificationcontactLiasettingsRequest {
  /** The name of the inventory verification contact. */
  contactName: string;
  /** The language for which inventory verification is requested. */
  language: string;
  /** The email of the inventory verification contact. */
  contactEmail: string;
  /** The country for which inventory verification is requested. */
  country: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account that manages the order. This cannot be a multi-client account. */
  accountId: string;
}

export const SetinventoryverificationcontactLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    contactName: Schema.String.pipe(T.HttpQuery("contactName")),
    language: Schema.String.pipe(T.HttpQuery("language")),
    contactEmail: Schema.String.pipe(T.HttpQuery("contactEmail")),
    country: Schema.String.pipe(T.HttpQuery("country")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/liasettings/{accountId}/setinventoryverificationcontact",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetinventoryverificationcontactLiasettingsRequest>;

export type SetinventoryverificationcontactLiasettingsResponse =
  LiasettingsSetInventoryVerificationContactResponse;
export const SetinventoryverificationcontactLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsSetInventoryVerificationContactResponse;

export type SetinventoryverificationcontactLiasettingsError = DefaultErrors;

/** Sets the inventory verification contact for the specified country. */
export const setinventoryverificationcontactLiasettings: API.OperationMethod<
  SetinventoryverificationcontactLiasettingsRequest,
  SetinventoryverificationcontactLiasettingsResponse,
  SetinventoryverificationcontactLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetinventoryverificationcontactLiasettingsRequest,
  output: SetinventoryverificationcontactLiasettingsResponse,
  errors: [],
}));

export interface SetposdataproviderLiasettingsRequest {
  /** The country for which the POS data provider is selected. */
  country: string;
  /** The ID of POS data provider. */
  posDataProviderId?: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The account ID by which this merchant is known to the POS data provider. */
  posExternalAccountId?: string;
  /** The ID of the account for which to retrieve accessible Business Profiles. */
  accountId: string;
}

export const SetposdataproviderLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    country: Schema.String.pipe(T.HttpQuery("country")),
    posDataProviderId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("posDataProviderId"),
    ),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    posExternalAccountId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("posExternalAccountId"),
    ),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/liasettings/{accountId}/setposdataprovider",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetposdataproviderLiasettingsRequest>;

export type SetposdataproviderLiasettingsResponse =
  LiasettingsSetPosDataProviderResponse;
export const SetposdataproviderLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsSetPosDataProviderResponse;

export type SetposdataproviderLiasettingsError = DefaultErrors;

/** Sets the POS data provider for the specified country. */
export const setposdataproviderLiasettings: API.OperationMethod<
  SetposdataproviderLiasettingsRequest,
  SetposdataproviderLiasettingsResponse,
  SetposdataproviderLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetposdataproviderLiasettingsRequest,
  output: SetposdataproviderLiasettingsResponse,
  errors: [],
}));

export interface ListLiasettingsRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The maximum number of LIA settings to return in the response, used for paging. */
  maxResults?: number;
}

export const ListLiasettingsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  },
).pipe(
  T.Http({ method: "GET", path: "{merchantId}/liasettings" }),
  svc,
) as unknown as Schema.Schema<ListLiasettingsRequest>;

export type ListLiasettingsResponse = LiasettingsListResponse;
export const ListLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsListResponse;

export type ListLiasettingsError = DefaultErrors;

/** Lists the LIA settings of the sub-accounts in your Merchant Center account. */
export const listLiasettings: API.PaginatedOperationMethod<
  ListLiasettingsRequest,
  ListLiasettingsResponse,
  ListLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLiasettingsRequest,
  output: ListLiasettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetLiasettingsRequest {
  /** The ID of the account for which to get or update LIA settings. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
}

export const GetLiasettingsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/liasettings/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetLiasettingsRequest>;

export type GetLiasettingsResponse = LiaSettings;
export const GetLiasettingsResponse = /*@__PURE__*/ /*#__PURE__*/ LiaSettings;

export type GetLiasettingsError = DefaultErrors;

/** Retrieves the LIA settings of the account. */
export const getLiasettings: API.OperationMethod<
  GetLiasettingsRequest,
  GetLiasettingsResponse,
  GetLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLiasettingsRequest,
  output: GetLiasettingsResponse,
  errors: [],
}));

export interface CustombatchLiasettingsRequest {
  /** Request body */
  body?: LiasettingsCustomBatchRequest;
}

export const CustombatchLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(LiasettingsCustomBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "liasettings/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchLiasettingsRequest>;

export type CustombatchLiasettingsResponse = LiasettingsCustomBatchResponse;
export const CustombatchLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsCustomBatchResponse;

export type CustombatchLiasettingsError = DefaultErrors;

/** Retrieves and/or updates the LIA settings of multiple accounts in a single request. */
export const custombatchLiasettings: API.OperationMethod<
  CustombatchLiasettingsRequest,
  CustombatchLiasettingsResponse,
  CustombatchLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchLiasettingsRequest,
  output: CustombatchLiasettingsResponse,
  errors: [],
}));

export interface RequestinventoryverificationLiasettingsRequest {
  /** The country for which inventory validation is requested. */
  country: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account that manages the order. This cannot be a multi-client account. */
  accountId: string;
}

export const RequestinventoryverificationLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    country: Schema.String.pipe(T.HttpPath("country")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/liasettings/{accountId}/requestinventoryverification/{country}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestinventoryverificationLiasettingsRequest>;

export type RequestinventoryverificationLiasettingsResponse =
  LiasettingsRequestInventoryVerificationResponse;
export const RequestinventoryverificationLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsRequestInventoryVerificationResponse;

export type RequestinventoryverificationLiasettingsError = DefaultErrors;

/** Requests inventory validation for the specified country. */
export const requestinventoryverificationLiasettings: API.OperationMethod<
  RequestinventoryverificationLiasettingsRequest,
  RequestinventoryverificationLiasettingsResponse,
  RequestinventoryverificationLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestinventoryverificationLiasettingsRequest,
  output: RequestinventoryverificationLiasettingsResponse,
  errors: [],
}));

export interface SetomnichannelexperienceLiasettingsRequest {
  /** The Pickup types for this country. Acceptable values are: - "`pickupToday`" - "`pickupLater`" */
  pickupTypes?: string[];
  /** The CLDR country code (for example, "US") for which the omnichannel experience is selected. */
  country?: string;
  /** The Local Store Front (LSF) type for this country. Acceptable values are: - "`ghlsf`" (Google-Hosted Local Store Front) - "`mhlsfBasic`" (Merchant-Hosted Local Store Front Basic) - "`mhlsfFull`" (Merchant-Hosted Local Store Front Full) More details about these types can be found here. */
  lsfType?: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to retrieve accessible Business Profiles. */
  accountId: string;
}

export const SetomnichannelexperienceLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pickupTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("pickupTypes"),
    ),
    country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
    lsfType: Schema.optional(Schema.String).pipe(T.HttpQuery("lsfType")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/liasettings/{accountId}/setomnichannelexperience",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetomnichannelexperienceLiasettingsRequest>;

export type SetomnichannelexperienceLiasettingsResponse =
  LiaOmnichannelExperience;
export const SetomnichannelexperienceLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiaOmnichannelExperience;

export type SetomnichannelexperienceLiasettingsError = DefaultErrors;

/** Sets the omnichannel experience for the specified country. Only supported for merchants whose POS data provider is trusted to enable the corresponding experience. For more context, see these help articles [about LFP](https://support.google.com/merchants/answer/7676652) and [how to get started](https://support.google.com/merchants/answer/7676578) with it. */
export const setomnichannelexperienceLiasettings: API.OperationMethod<
  SetomnichannelexperienceLiasettingsRequest,
  SetomnichannelexperienceLiasettingsResponse,
  SetomnichannelexperienceLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetomnichannelexperienceLiasettingsRequest,
  output: SetomnichannelexperienceLiasettingsResponse,
  errors: [],
}));

export interface ListposdataprovidersLiasettingsRequest {}

export const ListposdataprovidersLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "liasettings/posdataproviders" }),
    svc,
  ) as unknown as Schema.Schema<ListposdataprovidersLiasettingsRequest>;

export type ListposdataprovidersLiasettingsResponse =
  LiasettingsListPosDataProvidersResponse;
export const ListposdataprovidersLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsListPosDataProvidersResponse;

export type ListposdataprovidersLiasettingsError = DefaultErrors;

/** Retrieves the list of POS data providers that have active settings for the all eiligible countries. */
export const listposdataprovidersLiasettings: API.OperationMethod<
  ListposdataprovidersLiasettingsRequest,
  ListposdataprovidersLiasettingsResponse,
  ListposdataprovidersLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListposdataprovidersLiasettingsRequest,
  output: ListposdataprovidersLiasettingsResponse,
  errors: [],
}));

export interface UpdateLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get or update LIA settings. */
  accountId: string;
  /** Request body */
  body?: LiaSettings;
}

export const UpdateLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    body: Schema.optional(LiaSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "{merchantId}/liasettings/{accountId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateLiasettingsRequest>;

export type UpdateLiasettingsResponse = LiaSettings;
export const UpdateLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiaSettings;

export type UpdateLiasettingsError = DefaultErrors;

/** Updates the LIA settings of the account. Any fields that are not provided are deleted from the resource. */
export const updateLiasettings: API.OperationMethod<
  UpdateLiasettingsRequest,
  UpdateLiasettingsResponse,
  UpdateLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLiasettingsRequest,
  output: UpdateLiasettingsResponse,
  errors: [],
}));

export interface RequestgmbaccessLiasettingsRequest {
  /** The email of the Business Profile. */
  gmbEmail: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which Business Profile access is requested. */
  accountId: string;
}

export const RequestgmbaccessLiasettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    gmbEmail: Schema.String.pipe(T.HttpQuery("gmbEmail")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "{merchantId}/liasettings/{accountId}/requestgmbaccess",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestgmbaccessLiasettingsRequest>;

export type RequestgmbaccessLiasettingsResponse =
  LiasettingsRequestGmbAccessResponse;
export const RequestgmbaccessLiasettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiasettingsRequestGmbAccessResponse;

export type RequestgmbaccessLiasettingsError = DefaultErrors;

/** Requests access to a specified Business Profile. */
export const requestgmbaccessLiasettings: API.OperationMethod<
  RequestgmbaccessLiasettingsRequest,
  RequestgmbaccessLiasettingsResponse,
  RequestgmbaccessLiasettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestgmbaccessLiasettingsRequest,
  output: RequestgmbaccessLiasettingsResponse,
  errors: [],
}));

export interface ListDatafeedstatusesRequest {
  /** The maximum number of products to return in the response, used for paging. */
  maxResults?: number;
  /** The ID of the account that manages the datafeeds. This account cannot be a multi-client account. */
  merchantId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListDatafeedstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/datafeedstatuses" }),
    svc,
  ) as unknown as Schema.Schema<ListDatafeedstatusesRequest>;

export type ListDatafeedstatusesResponse = DatafeedstatusesListResponse;
export const ListDatafeedstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatafeedstatusesListResponse;

export type ListDatafeedstatusesError = DefaultErrors;

/** Lists the statuses of the datafeeds in your Merchant Center account. */
export const listDatafeedstatuses: API.PaginatedOperationMethod<
  ListDatafeedstatusesRequest,
  ListDatafeedstatusesResponse,
  ListDatafeedstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatafeedstatusesRequest,
  output: ListDatafeedstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetDatafeedstatusesRequest {
  /** The language to get the datafeed status for. If this parameter is provided then `country` must also be provided. Note that this parameter is required for feeds targeting multiple countries and languages, since a feed may have a different status for each target. */
  language?: string;
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The feed label to get the datafeed status for. If this parameter is provided then `language` must also be provided. Note that this parameter is required for feeds targeting multiple countries and languages, since a feed may have a different status for each target. */
  feedLabel?: string;
  /** The ID of the datafeed. */
  datafeedId: string;
  /** Deprecated. Use `feedLabel` instead. The country to get the datafeed status for. If this parameter is provided then `language` must also be provided. Note that this parameter is required for feeds targeting multiple countries and languages, since a feed may have a different status for each target. */
  country?: string;
}

export const GetDatafeedstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    feedLabel: Schema.optional(Schema.String).pipe(T.HttpQuery("feedLabel")),
    datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
    country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/datafeedstatuses/{datafeedId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetDatafeedstatusesRequest>;

export type GetDatafeedstatusesResponse = DatafeedStatus;
export const GetDatafeedstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatafeedStatus;

export type GetDatafeedstatusesError = DefaultErrors;

/** Retrieves the status of a datafeed from your Merchant Center account. */
export const getDatafeedstatuses: API.OperationMethod<
  GetDatafeedstatusesRequest,
  GetDatafeedstatusesResponse,
  GetDatafeedstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDatafeedstatusesRequest,
  output: GetDatafeedstatusesResponse,
  errors: [],
}));

export interface CustombatchDatafeedstatusesRequest {
  /** Request body */
  body?: DatafeedstatusesCustomBatchRequest;
}

export const CustombatchDatafeedstatusesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(DatafeedstatusesCustomBatchRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({ method: "POST", path: "datafeedstatuses/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchDatafeedstatusesRequest>;

export type CustombatchDatafeedstatusesResponse =
  DatafeedstatusesCustomBatchResponse;
export const CustombatchDatafeedstatusesResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatafeedstatusesCustomBatchResponse;

export type CustombatchDatafeedstatusesError = DefaultErrors;

/** Gets multiple Merchant Center datafeed statuses in a single request. */
export const custombatchDatafeedstatuses: API.OperationMethod<
  CustombatchDatafeedstatusesRequest,
  CustombatchDatafeedstatusesResponse,
  CustombatchDatafeedstatusesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchDatafeedstatusesRequest,
  output: CustombatchDatafeedstatusesResponse,
  errors: [],
}));

export interface GetShippingsettingsRequest {
  /** The ID of the account for which to get/update shipping settings. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
}

export const GetShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "{merchantId}/shippingsettings/{accountId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetShippingsettingsRequest>;

export type GetShippingsettingsResponse = ShippingSettings;
export const GetShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingSettings;

export type GetShippingsettingsError = DefaultErrors;

/** Retrieves the shipping settings of the account. */
export const getShippingsettings: API.OperationMethod<
  GetShippingsettingsRequest,
  GetShippingsettingsResponse,
  GetShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetShippingsettingsRequest,
  output: GetShippingsettingsResponse,
  errors: [],
}));

export interface GetsupportedcarriersShippingsettingsRequest {
  /** The ID of the account for which to retrieve the supported carriers. */
  merchantId: string;
}

export const GetsupportedcarriersShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/supportedCarriers" }),
    svc,
  ) as unknown as Schema.Schema<GetsupportedcarriersShippingsettingsRequest>;

export type GetsupportedcarriersShippingsettingsResponse =
  ShippingsettingsGetSupportedCarriersResponse;
export const GetsupportedcarriersShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingsettingsGetSupportedCarriersResponse;

export type GetsupportedcarriersShippingsettingsError = DefaultErrors;

/** Retrieves supported carriers and carrier services for an account. */
export const getsupportedcarriersShippingsettings: API.OperationMethod<
  GetsupportedcarriersShippingsettingsRequest,
  GetsupportedcarriersShippingsettingsResponse,
  GetsupportedcarriersShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetsupportedcarriersShippingsettingsRequest,
  output: GetsupportedcarriersShippingsettingsResponse,
  errors: [],
}));

export interface UpdateShippingsettingsRequest {
  /** The ID of the account for which to get/update shipping settings. */
  accountId: string;
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Request body */
  body?: ShippingSettings;
}

export const UpdateShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
    body: Schema.optional(ShippingSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "{merchantId}/shippingsettings/{accountId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateShippingsettingsRequest>;

export type UpdateShippingsettingsResponse = ShippingSettings;
export const UpdateShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingSettings;

export type UpdateShippingsettingsError = DefaultErrors;

/** Updates the shipping settings of the account. Any fields that are not provided are deleted from the resource. */
export const updateShippingsettings: API.OperationMethod<
  UpdateShippingsettingsRequest,
  UpdateShippingsettingsResponse,
  UpdateShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateShippingsettingsRequest,
  output: UpdateShippingsettingsResponse,
  errors: [],
}));

export interface GetsupportedholidaysShippingsettingsRequest {
  /** The ID of the account for which to retrieve the supported holidays. */
  merchantId: string;
}

export const GetsupportedholidaysShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/supportedHolidays" }),
    svc,
  ) as unknown as Schema.Schema<GetsupportedholidaysShippingsettingsRequest>;

export type GetsupportedholidaysShippingsettingsResponse =
  ShippingsettingsGetSupportedHolidaysResponse;
export const GetsupportedholidaysShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingsettingsGetSupportedHolidaysResponse;

export type GetsupportedholidaysShippingsettingsError = DefaultErrors;

/** Retrieves supported holidays for an account. */
export const getsupportedholidaysShippingsettings: API.OperationMethod<
  GetsupportedholidaysShippingsettingsRequest,
  GetsupportedholidaysShippingsettingsResponse,
  GetsupportedholidaysShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetsupportedholidaysShippingsettingsRequest,
  output: GetsupportedholidaysShippingsettingsResponse,
  errors: [],
}));

export interface CustombatchShippingsettingsRequest {
  /** Request body */
  body?: ShippingsettingsCustomBatchRequest;
}

export const CustombatchShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(ShippingsettingsCustomBatchRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({ method: "POST", path: "shippingsettings/batch", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CustombatchShippingsettingsRequest>;

export type CustombatchShippingsettingsResponse =
  ShippingsettingsCustomBatchResponse;
export const CustombatchShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingsettingsCustomBatchResponse;

export type CustombatchShippingsettingsError = DefaultErrors;

/** Retrieves and updates the shipping settings of multiple accounts in a single request. */
export const custombatchShippingsettings: API.OperationMethod<
  CustombatchShippingsettingsRequest,
  CustombatchShippingsettingsResponse,
  CustombatchShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CustombatchShippingsettingsRequest,
  output: CustombatchShippingsettingsResponse,
  errors: [],
}));

export interface GetsupportedpickupservicesShippingsettingsRequest {
  /** The ID of the account for which to retrieve the supported pickup services. */
  merchantId: string;
}

export const GetsupportedpickupservicesShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/supportedPickupServices" }),
    svc,
  ) as unknown as Schema.Schema<GetsupportedpickupservicesShippingsettingsRequest>;

export type GetsupportedpickupservicesShippingsettingsResponse =
  ShippingsettingsGetSupportedPickupServicesResponse;
export const GetsupportedpickupservicesShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingsettingsGetSupportedPickupServicesResponse;

export type GetsupportedpickupservicesShippingsettingsError = DefaultErrors;

/** Retrieves supported pickup services for an account. */
export const getsupportedpickupservicesShippingsettings: API.OperationMethod<
  GetsupportedpickupservicesShippingsettingsRequest,
  GetsupportedpickupservicesShippingsettingsResponse,
  GetsupportedpickupservicesShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetsupportedpickupservicesShippingsettingsRequest,
  output: GetsupportedpickupservicesShippingsettingsResponse,
  errors: [],
}));

export interface ListShippingsettingsRequest {
  /** The maximum number of shipping settings to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
}

export const ListShippingsettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  }).pipe(
    T.Http({ method: "GET", path: "{merchantId}/shippingsettings" }),
    svc,
  ) as unknown as Schema.Schema<ListShippingsettingsRequest>;

export type ListShippingsettingsResponse = ShippingsettingsListResponse;
export const ListShippingsettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ShippingsettingsListResponse;

export type ListShippingsettingsError = DefaultErrors;

/** Lists the shipping settings of the sub-accounts in your Merchant Center account. */
export const listShippingsettings: API.PaginatedOperationMethod<
  ListShippingsettingsRequest,
  ListShippingsettingsResponse,
  ListShippingsettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListShippingsettingsRequest,
  output: ListShippingsettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
