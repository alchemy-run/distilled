// ==========================================================================
// Google Play Android Developer API (androidpublisher v3)
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
  name: "androidpublisher",
  version: "v3",
  rootUrl: "https://androidpublisher.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Abi {
  /** Alias for an abi. */
  alias?: "UNSPECIFIED_CPU_ARCHITECTURE" | "ARMEABI" | "ARMEABI_V7A" | "ARM64_V8A" | "X86" | "X86_64" | "RISCV64" | (string & {});
}

export const Abi: Schema.Schema<Abi> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
})).annotate({ identifier: "Abi" }) as any as Schema.Schema<Abi>;

export interface MultiAbi {
  /** A list of targeted ABIs, as represented by the Android Platform */
  abi?: Array<Abi>;
}

export const MultiAbi: Schema.Schema<MultiAbi> = Schema.suspend(() => Schema.Struct({
  abi: Schema.optional(Schema.Array(Abi)),
})).annotate({ identifier: "MultiAbi" }) as any as Schema.Schema<MultiAbi>;

export interface MultiAbiTargeting {
  /** Value of a multi abi. */
  value?: Array<MultiAbi>;
  /** Targeting of other sibling directories that were in the Bundle. For main splits this is targeting of other main splits. */
  alternatives?: Array<MultiAbi>;
}

export const MultiAbiTargeting: Schema.Schema<MultiAbiTargeting> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(MultiAbi)),
  alternatives: Schema.optional(Schema.Array(MultiAbi)),
})).annotate({ identifier: "MultiAbiTargeting" }) as any as Schema.Schema<MultiAbiTargeting>;

export interface ScreenDensity {
  /** Alias for a screen density. */
  densityAlias?: "DENSITY_UNSPECIFIED" | "NODPI" | "LDPI" | "MDPI" | "TVDPI" | "HDPI" | "XHDPI" | "XXHDPI" | "XXXHDPI" | (string & {});
  /** Value for density dpi. */
  densityDpi?: number;
}

export const ScreenDensity: Schema.Schema<ScreenDensity> = Schema.suspend(() => Schema.Struct({
  densityAlias: Schema.optional(Schema.String),
  densityDpi: Schema.optional(Schema.Number),
})).annotate({ identifier: "ScreenDensity" }) as any as Schema.Schema<ScreenDensity>;

export interface ScreenDensityTargeting {
  /** Value of a screen density. */
  value?: Array<ScreenDensity>;
  /** Targeting of other sibling directories that were in the Bundle. For main splits this is targeting of other main splits. */
  alternatives?: Array<ScreenDensity>;
}

export const ScreenDensityTargeting: Schema.Schema<ScreenDensityTargeting> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(ScreenDensity)),
  alternatives: Schema.optional(Schema.Array(ScreenDensity)),
})).annotate({ identifier: "ScreenDensityTargeting" }) as any as Schema.Schema<ScreenDensityTargeting>;

export interface ActivatePurchaseOptionRequest {
  /** Required. The purchase option ID of the purchase option to activate. */
  purchaseOptionId?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent app (package name) of the purchase option to activate. */
  packageName?: string;
  /** Required. The parent one-time product (ID) of the purchase option to activate. */
  productId?: string;
}

export const ActivatePurchaseOptionRequest: Schema.Schema<ActivatePurchaseOptionRequest> = Schema.suspend(() => Schema.Struct({
  purchaseOptionId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivatePurchaseOptionRequest" }) as any as Schema.Schema<ActivatePurchaseOptionRequest>;

export interface OtherRegionsSubscriptionOfferConfig {
  /** Whether the subscription offer in any new locations Play may launch in the future. If not specified, this will default to false. */
  otherRegionsNewSubscriberAvailability?: boolean;
}

export const OtherRegionsSubscriptionOfferConfig: Schema.Schema<OtherRegionsSubscriptionOfferConfig> = Schema.suspend(() => Schema.Struct({
  otherRegionsNewSubscriberAvailability: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OtherRegionsSubscriptionOfferConfig" }) as any as Schema.Schema<OtherRegionsSubscriptionOfferConfig>;

export interface ApkBinary {
  /** A sha256 hash of the APK payload, encoded as a hex string and matching the output of the sha256sum command. */
  sha256?: string;
  /** A sha1 hash of the APK payload, encoded as a hex string and matching the output of the sha1sum command. */
  sha1?: string;
}

export const ApkBinary: Schema.Schema<ApkBinary> = Schema.suspend(() => Schema.Struct({
  sha256: Schema.optional(Schema.String),
  sha1: Schema.optional(Schema.String),
})).annotate({ identifier: "ApkBinary" }) as any as Schema.Schema<ApkBinary>;

export interface Apk {
  /** The version code of the APK, as specified in the manifest file. */
  versionCode?: number;
  /** Information about the binary payload of this APK. */
  binary?: ApkBinary;
}

export const Apk: Schema.Schema<Apk> = Schema.suspend(() => Schema.Struct({
  versionCode: Schema.optional(Schema.Number),
  binary: Schema.optional(ApkBinary),
})).annotate({ identifier: "Apk" }) as any as Schema.Schema<Apk>;

export interface SubscriptionDeferralInfo {
  /** The expected expiry time for the subscription. If the current expiry time for the subscription is not the value specified here, the deferral will not occur. */
  expectedExpiryTimeMillis?: string;
  /** The desired next expiry time to assign to the subscription, in milliseconds since the Epoch. The given time must be later/greater than the current expiry time for the subscription. */
  desiredExpiryTimeMillis?: string;
}

export const SubscriptionDeferralInfo: Schema.Schema<SubscriptionDeferralInfo> = Schema.suspend(() => Schema.Struct({
  expectedExpiryTimeMillis: Schema.optional(Schema.String),
  desiredExpiryTimeMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionDeferralInfo" }) as any as Schema.Schema<SubscriptionDeferralInfo>;

export interface FullRefund {
}

export const FullRefund: Schema.Schema<FullRefund> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FullRefund" }) as any as Schema.Schema<FullRefund>;

export interface Price {
  /** Price in 1/million of the currency base unit, represented as a string. */
  priceMicros?: string;
  /** 3 letter Currency code, as defined by ISO 4217. See java/com/google/common/money/CurrencyCode.java */
  currency?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  priceMicros: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface PartialRefund {
  /** Required. The pre-tax amount of the partial refund. Should be less than the remaining pre-tax amount of the transaction. */
  refundPreTaxAmount?: Price;
  /** Required. A unique id distinguishing this partial refund. If the refund is successful, subsequent refunds with the same id will fail. Must be unique across refunds for one individual transaction. */
  refundId?: string;
}

export const PartialRefund: Schema.Schema<PartialRefund> = Schema.suspend(() => Schema.Struct({
  refundPreTaxAmount: Schema.optional(Price),
  refundId: Schema.optional(Schema.String),
})).annotate({ identifier: "PartialRefund" }) as any as Schema.Schema<PartialRefund>;

export interface RefundExternalTransactionRequest {
  /** A full-amount refund. */
  fullRefund?: FullRefund;
  /** A partial refund. */
  partialRefund?: PartialRefund;
  /** Required. The time that the transaction was refunded. */
  refundTime?: string;
}

export const RefundExternalTransactionRequest: Schema.Schema<RefundExternalTransactionRequest> = Schema.suspend(() => Schema.Struct({
  fullRefund: Schema.optional(FullRefund),
  partialRefund: Schema.optional(PartialRefund),
  refundTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RefundExternalTransactionRequest" }) as any as Schema.Schema<RefundExternalTransactionRequest>;

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

export interface ConvertedOtherRegionsPrice {
  /** Price in EUR to use for the "Other regions" location exclusive of taxes. */
  eurPrice?: Money;
  /** Price in USD to use for the "Other regions" location exclusive of taxes. */
  usdPrice?: Money;
}

export const ConvertedOtherRegionsPrice: Schema.Schema<ConvertedOtherRegionsPrice> = Schema.suspend(() => Schema.Struct({
  eurPrice: Schema.optional(Money),
  usdPrice: Schema.optional(Money),
})).annotate({ identifier: "ConvertedOtherRegionsPrice" }) as any as Schema.Schema<ConvertedOtherRegionsPrice>;

export interface OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig {
  /** The price of the purchase option in the specified region. Must be set in the currency that is linked to the specified region. */
  price?: Money;
  /** Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g., "US". */
  regionCode?: string;
  /** The availability of the purchase option. */
  availability?: "AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "NO_LONGER_AVAILABLE" | "AVAILABLE_IF_RELEASED" | "AVAILABLE_FOR_OFFERS_ONLY" | (string & {});
}

export const OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig: Schema.Schema<OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig> = Schema.suspend(() => Schema.Struct({
  price: Schema.optional(Money),
  regionCode: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig" }) as any as Schema.Schema<OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig>;

export interface PurchaseOptionTaxAndComplianceSettings {
  /** Optional. Digital content or service classification for products distributed to users in eligible regions. If unset, it defaults to `WITHDRAWAL_RIGHT_DIGITAL_CONTENT`. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information. */
  withdrawalRightType?: "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED" | "WITHDRAWAL_RIGHT_DIGITAL_CONTENT" | "WITHDRAWAL_RIGHT_SERVICE" | (string & {});
}

export const PurchaseOptionTaxAndComplianceSettings: Schema.Schema<PurchaseOptionTaxAndComplianceSettings> = Schema.suspend(() => Schema.Struct({
  withdrawalRightType: Schema.optional(Schema.String),
})).annotate({ identifier: "PurchaseOptionTaxAndComplianceSettings" }) as any as Schema.Schema<PurchaseOptionTaxAndComplianceSettings>;

export interface OneTimeProductBuyPurchaseOption {
  /** Optional. Whether this purchase option will be available in legacy PBL flows that do not support one-time products model. Up to one "buy" purchase option can be marked as backwards compatible. */
  legacyCompatible?: boolean;
  /** Optional. Whether this purchase option allows multi-quantity. Multi-quantity allows buyer to purchase more than one item in a single checkout. */
  multiQuantityEnabled?: boolean;
}

export const OneTimeProductBuyPurchaseOption: Schema.Schema<OneTimeProductBuyPurchaseOption> = Schema.suspend(() => Schema.Struct({
  legacyCompatible: Schema.optional(Schema.Boolean),
  multiQuantityEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OneTimeProductBuyPurchaseOption" }) as any as Schema.Schema<OneTimeProductBuyPurchaseOption>;

export interface OneTimeProductPurchaseOptionNewRegionsConfig {
  /** Required. Price in USD to use for any new regions Play may launch in. */
  usdPrice?: Money;
  /** Required. The regional availability for the new regions config. When set to AVAILABLE, the pricing information will be used for any new regions Play may launch in the future. */
  availability?: "AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "NO_LONGER_AVAILABLE" | (string & {});
  /** Required. Price in EUR to use for any new regions Play may launch in. */
  eurPrice?: Money;
}

export const OneTimeProductPurchaseOptionNewRegionsConfig: Schema.Schema<OneTimeProductPurchaseOptionNewRegionsConfig> = Schema.suspend(() => Schema.Struct({
  usdPrice: Schema.optional(Money),
  availability: Schema.optional(Schema.String),
  eurPrice: Schema.optional(Money),
})).annotate({ identifier: "OneTimeProductPurchaseOptionNewRegionsConfig" }) as any as Schema.Schema<OneTimeProductPurchaseOptionNewRegionsConfig>;

export interface OneTimeProductRentPurchaseOption {
  /** Optional. The amount of time the user has after starting consuming the entitlement before it is revoked. Specified in ISO 8601 format. */
  expirationPeriod?: string;
  /** Required. The amount of time a user has the entitlement for. Starts at purchase flow completion. Specified in ISO 8601 format. */
  rentalPeriod?: string;
}

export const OneTimeProductRentPurchaseOption: Schema.Schema<OneTimeProductRentPurchaseOption> = Schema.suspend(() => Schema.Struct({
  expirationPeriod: Schema.optional(Schema.String),
  rentalPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeProductRentPurchaseOption" }) as any as Schema.Schema<OneTimeProductRentPurchaseOption>;

export interface OfferTag {
  /** Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters. */
  tag?: string;
}

export const OfferTag: Schema.Schema<OfferTag> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "OfferTag" }) as any as Schema.Schema<OfferTag>;

export interface OneTimeProductPurchaseOption {
  /** Regional pricing and availability information for this purchase option. */
  regionalPricingAndAvailabilityConfigs?: Array<OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig>;
  /** Optional. Details about taxes and legal compliance. */
  taxAndComplianceSettings?: PurchaseOptionTaxAndComplianceSettings;
  /** A purchase option that can be bought. */
  buyOption?: OneTimeProductBuyPurchaseOption;
  /** Pricing information for any new locations Play may launch in the future. If omitted, the purchase option will not be automatically available in any new locations Play may launch in the future. */
  newRegionsConfig?: OneTimeProductPurchaseOptionNewRegionsConfig;
  /** Output only. The state of the purchase option, i.e., whether it's active. This field cannot be changed by updating the resource. Use the dedicated endpoints instead. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "INACTIVE" | "INACTIVE_PUBLISHED" | (string & {});
  /** A purchase option that can be rented. */
  rentOption?: OneTimeProductRentPurchaseOption;
  /** Required. Immutable. The unique identifier of this purchase option. Must be unique within the one-time product. It must start with a number or lower-case letter, and can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-). The maximum length is 63 characters. */
  purchaseOptionId?: string;
  /** Optional. List of up to 20 custom tags specified for this purchase option, and returned to the app through the billing library. Offers for this purchase option will also receive these tags in the billing library. */
  offerTags?: Array<OfferTag>;
}

export const OneTimeProductPurchaseOption: Schema.Schema<OneTimeProductPurchaseOption> = Schema.suspend(() => Schema.Struct({
  regionalPricingAndAvailabilityConfigs: Schema.optional(Schema.Array(OneTimeProductPurchaseOptionRegionalPricingAndAvailabilityConfig)),
  taxAndComplianceSettings: Schema.optional(PurchaseOptionTaxAndComplianceSettings),
  buyOption: Schema.optional(OneTimeProductBuyPurchaseOption),
  newRegionsConfig: Schema.optional(OneTimeProductPurchaseOptionNewRegionsConfig),
  state: Schema.optional(Schema.String),
  rentOption: Schema.optional(OneTimeProductRentPurchaseOption),
  purchaseOptionId: Schema.optional(Schema.String),
  offerTags: Schema.optional(Schema.Array(OfferTag)),
})).annotate({ identifier: "OneTimeProductPurchaseOption" }) as any as Schema.Schema<OneTimeProductPurchaseOption>;

export interface TrackConfig {
  /** Required. Form factor of the new track. Defaults to the default track. */
  formFactor?: "FORM_FACTOR_UNSPECIFIED" | "DEFAULT" | "WEAR" | "AUTOMOTIVE" | (string & {});
  /** Required. Identifier of the new track. For default tracks, this field consists of the track alias only. Form factor tracks have a special prefix as an identifier, for example `wear:production`, `automotive:production`. This prefix must match the value of the `form_factor` field, if it is not a default track. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name) */
  track?: string;
  /** Required. Type of the new track. Currently, the only supported value is closedTesting. */
  type?: "TRACK_TYPE_UNSPECIFIED" | "CLOSED_TESTING" | (string & {});
}

export const TrackConfig: Schema.Schema<TrackConfig> = Schema.suspend(() => Schema.Struct({
  formFactor: Schema.optional(Schema.String),
  track: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "TrackConfig" }) as any as Schema.Schema<TrackConfig>;

export interface GeneratedAssetPackSlice {
  /** Name of the module that this asset slice belongs to. */
  moduleName?: string;
  /** Asset module version. */
  version?: string;
  /** Asset slice ID. */
  sliceId?: string;
  /** Download ID, which uniquely identifies the APK to download. Should be supplied to `generatedapks.download` method. */
  downloadId?: string;
}

export const GeneratedAssetPackSlice: Schema.Schema<GeneratedAssetPackSlice> = Schema.suspend(() => Schema.Struct({
  moduleName: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  sliceId: Schema.optional(Schema.String),
  downloadId: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedAssetPackSlice" }) as any as Schema.Schema<GeneratedAssetPackSlice>;

export interface ItemExpiryTimeDetails {
  /** The product ID of the subscription item (for example, 'premium_plan'). */
  productId?: string;
  /** The new expiry time for this subscription item. */
  expiryTime?: string;
}

export const ItemExpiryTimeDetails: Schema.Schema<ItemExpiryTimeDetails> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  expiryTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemExpiryTimeDetails" }) as any as Schema.Schema<ItemExpiryTimeDetails>;

export interface Grant {
  /** Required. Resource name for this grant, following the pattern "developers/{developer}/users/{email}/grants/{package_name}". If this grant is for a draft app, the app ID will be used in this resource name instead of the package name. */
  name?: string;
  /** Immutable. The package name of the app. This will be empty for draft apps. */
  packageName?: string;
  /** The permissions granted to the user for this app. */
  appLevelPermissions?: Array<"APP_LEVEL_PERMISSION_UNSPECIFIED" | "CAN_ACCESS_APP" | "CAN_VIEW_FINANCIAL_DATA" | "CAN_MANAGE_PERMISSIONS" | "CAN_REPLY_TO_REVIEWS" | "CAN_MANAGE_PUBLIC_APKS" | "CAN_MANAGE_TRACK_APKS" | "CAN_MANAGE_TRACK_USERS" | "CAN_MANAGE_PUBLIC_LISTING" | "CAN_MANAGE_DRAFT_APPS" | "CAN_MANAGE_ORDERS" | "CAN_MANAGE_APP_CONTENT" | "CAN_VIEW_NON_FINANCIAL_DATA" | "CAN_VIEW_APP_QUALITY" | "CAN_MANAGE_DEEPLINKS" | (string & {})>;
}

export const Grant: Schema.Schema<Grant> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  appLevelPermissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Grant" }) as any as Schema.Schema<Grant>;

export interface User {
  /** The time at which the user's access expires, if set. When setting this value, it must always be in the future. */
  expirationTime?: string;
  /** Permissions for the user which apply across the developer account. */
  developerAccountPermissions?: Array<"DEVELOPER_LEVEL_PERMISSION_UNSPECIFIED" | "CAN_SEE_ALL_APPS" | "CAN_VIEW_FINANCIAL_DATA_GLOBAL" | "CAN_MANAGE_PERMISSIONS_GLOBAL" | "CAN_EDIT_GAMES_GLOBAL" | "CAN_PUBLISH_GAMES_GLOBAL" | "CAN_REPLY_TO_REVIEWS_GLOBAL" | "CAN_MANAGE_PUBLIC_APKS_GLOBAL" | "CAN_MANAGE_TRACK_APKS_GLOBAL" | "CAN_MANAGE_TRACK_USERS_GLOBAL" | "CAN_MANAGE_PUBLIC_LISTING_GLOBAL" | "CAN_MANAGE_DRAFT_APPS_GLOBAL" | "CAN_CREATE_MANAGED_PLAY_APPS_GLOBAL" | "CAN_CHANGE_MANAGED_PLAY_SETTING_GLOBAL" | "CAN_MANAGE_ORDERS_GLOBAL" | "CAN_MANAGE_APP_CONTENT_GLOBAL" | "CAN_VIEW_NON_FINANCIAL_DATA_GLOBAL" | "CAN_VIEW_APP_QUALITY_GLOBAL" | "CAN_MANAGE_DEEPLINKS_GLOBAL" | (string & {})>;
  /** Output only. The state of the user's access to the Play Console. */
  accessState?: "ACCESS_STATE_UNSPECIFIED" | "INVITED" | "INVITATION_EXPIRED" | "ACCESS_GRANTED" | "ACCESS_EXPIRED" | (string & {});
  /** Immutable. The user's email address. */
  email?: string;
  /** Required. Resource name for this user, following the pattern "developers/{developer}/users/{email}". */
  name?: string;
  /** Output only. Whether there are more permissions for the user that are not represented here. This can happen if the caller does not have permission to manage all apps in the account. This is also `true` if this user is the account owner. If this field is `true`, it should be taken as a signal that this user cannot be fully managed via the API. That is, the API caller is not be able to manage all of the permissions this user holds, either because it doesn't know about them or because the user is the account owner. */
  partial?: boolean;
  /** Output only. Per-app permissions for the user. */
  grants?: Array<Grant>;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  expirationTime: Schema.optional(Schema.String),
  developerAccountPermissions: Schema.optional(Schema.Array(Schema.String)),
  accessState: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  partial: Schema.optional(Schema.Boolean),
  grants: Schema.optional(Schema.Array(Grant)),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface ListUsersResponse {
  /** The resulting users. */
  users?: Array<User>;
  /** A token to pass to subsequent calls in order to retrieve subsequent results. This will not be set if there are no more results to return. */
  nextPageToken?: string;
}

export const ListUsersResponse: Schema.Schema<ListUsersResponse> = Schema.suspend(() => Schema.Struct({
  users: Schema.optional(Schema.Array(User)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUsersResponse" }) as any as Schema.Schema<ListUsersResponse>;

export interface OrderDetails {
  /** Indicates whether the listed price was tax inclusive or not. */
  taxInclusive?: boolean;
}

export const OrderDetails: Schema.Schema<OrderDetails> = Schema.suspend(() => Schema.Struct({
  taxInclusive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OrderDetails" }) as any as Schema.Schema<OrderDetails>;

export interface RegionalTaxConfig {
  /** To collect communications or amusement taxes in the United States, choose the appropriate tax category. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498#streaming_tax). */
  streamingTaxType?: "STREAMING_TAX_TYPE_UNSPECIFIED" | "STREAMING_TAX_TYPE_TELCO_VIDEO_RENTAL" | "STREAMING_TAX_TYPE_TELCO_VIDEO_SALES" | "STREAMING_TAX_TYPE_TELCO_VIDEO_MULTI_CHANNEL" | "STREAMING_TAX_TYPE_TELCO_AUDIO_RENTAL" | "STREAMING_TAX_TYPE_TELCO_AUDIO_SALES" | "STREAMING_TAX_TYPE_TELCO_AUDIO_MULTI_CHANNEL" | (string & {});
  /** Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US". */
  regionCode?: string;
  /** Tax tier to specify reduced tax rate. Developers who sell digital news, magazines, newspapers, books, or audiobooks in various regions may be eligible for reduced tax rates. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498). */
  taxTier?: "TAX_TIER_UNSPECIFIED" | "TAX_TIER_BOOKS_1" | "TAX_TIER_NEWS_1" | "TAX_TIER_NEWS_2" | "TAX_TIER_MUSIC_OR_AUDIO_1" | "TAX_TIER_LIVE_OR_BROADCAST_1" | (string & {});
  /** You must tell us if your app contains streaming products to correctly charge US state and local sales tax. Field only supported in the United States. */
  eligibleForStreamingServiceTaxRate?: boolean;
}

export const RegionalTaxConfig: Schema.Schema<RegionalTaxConfig> = Schema.suspend(() => Schema.Struct({
  streamingTaxType: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  taxTier: Schema.optional(Schema.String),
  eligibleForStreamingServiceTaxRate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RegionalTaxConfig" }) as any as Schema.Schema<RegionalTaxConfig>;

export interface DeletePurchaseOptionRequest {
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent one-time product (ID) of the purchase option to delete. */
  productId?: string;
  /** Optional. This field has no effect for purchase options with no offers under them. For purchase options with associated offers: * If `force` is set to false (default), an error will be returned. * If `force` is set to true, any associated offers under the purchase option will be deleted. */
  force?: boolean;
  /** Required. The parent app (package name) of the purchase option to delete. */
  packageName?: string;
  /** Required. The purchase option ID of the purchase option to delete. */
  purchaseOptionId?: string;
}

export const DeletePurchaseOptionRequest: Schema.Schema<DeletePurchaseOptionRequest> = Schema.suspend(() => Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
  packageName: Schema.optional(Schema.String),
  purchaseOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeletePurchaseOptionRequest" }) as any as Schema.Schema<DeletePurchaseOptionRequest>;

export interface GetSubscriptionOfferRequest {
  /** Required. The parent app (package name) of the offer to get. */
  packageName?: string;
  /** Required. The parent base plan (ID) of the offer to get. */
  basePlanId?: string;
  /** Required. The parent subscription (ID) of the offer to get. */
  productId?: string;
  /** Required. The unique offer ID of the offer to get. */
  offerId?: string;
}

export const GetSubscriptionOfferRequest: Schema.Schema<GetSubscriptionOfferRequest> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  basePlanId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
})).annotate({ identifier: "GetSubscriptionOfferRequest" }) as any as Schema.Schema<GetSubscriptionOfferRequest>;

export interface BatchGetSubscriptionOffersRequest {
  /** Required. A list of update requests of up to 100 elements. All requests must update different subscriptions. */
  requests?: Array<GetSubscriptionOfferRequest>;
}

export const BatchGetSubscriptionOffersRequest: Schema.Schema<BatchGetSubscriptionOffersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GetSubscriptionOfferRequest)),
})).annotate({ identifier: "BatchGetSubscriptionOffersRequest" }) as any as Schema.Schema<BatchGetSubscriptionOffersRequest>;

export interface DeviceId {
  /** Value of Build.DEVICE. */
  buildDevice?: string;
  /** Value of Build.BRAND. */
  buildBrand?: string;
}

export const DeviceId: Schema.Schema<DeviceId> = Schema.suspend(() => Schema.Struct({
  buildDevice: Schema.optional(Schema.String),
  buildBrand: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceId" }) as any as Schema.Schema<DeviceId>;

export interface SystemOnChip {
  /** Required. The designer of the SoC, eg. "Google" Value of build property "ro.soc.manufacturer" https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER Required. */
  manufacturer?: string;
  /** Required. The model of the SoC, eg. "Tensor" Value of build property "ro.soc.model" https://developer.android.com/reference/android/os/Build#SOC_MODEL Required. */
  model?: string;
}

export const SystemOnChip: Schema.Schema<SystemOnChip> = Schema.suspend(() => Schema.Struct({
  manufacturer: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemOnChip" }) as any as Schema.Schema<SystemOnChip>;

export interface SystemFeature {
  /** The name of the feature. */
  name?: string;
}

export const SystemFeature: Schema.Schema<SystemFeature> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemFeature" }) as any as Schema.Schema<SystemFeature>;

export interface DeviceRam {
  /** Minimum RAM in bytes (bound included). */
  minBytes?: string;
  /** Maximum RAM in bytes (bound excluded). */
  maxBytes?: string;
}

export const DeviceRam: Schema.Schema<DeviceRam> = Schema.suspend(() => Schema.Struct({
  minBytes: Schema.optional(Schema.String),
  maxBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceRam" }) as any as Schema.Schema<DeviceRam>;

export interface DeviceSelector {
  /** Device models excluded by this selector, even if they match all other conditions. */
  excludedDeviceIds?: Array<DeviceId>;
  /** Optional. The SoCs included by this selector. Only works for Android S+ devices. */
  systemOnChips?: Array<SystemOnChip>;
  /** A device that has any of these system features is excluded by this selector, even if it matches all other conditions. */
  forbiddenSystemFeatures?: Array<SystemFeature>;
  /** Device models included by this selector. */
  includedDeviceIds?: Array<DeviceId>;
  /** A device needs to have all these system features to be included by the selector. */
  requiredSystemFeatures?: Array<SystemFeature>;
  /** Conditions on the device's RAM. */
  deviceRam?: DeviceRam;
}

export const DeviceSelector: Schema.Schema<DeviceSelector> = Schema.suspend(() => Schema.Struct({
  excludedDeviceIds: Schema.optional(Schema.Array(DeviceId)),
  systemOnChips: Schema.optional(Schema.Array(SystemOnChip)),
  forbiddenSystemFeatures: Schema.optional(Schema.Array(SystemFeature)),
  includedDeviceIds: Schema.optional(Schema.Array(DeviceId)),
  requiredSystemFeatures: Schema.optional(Schema.Array(SystemFeature)),
  deviceRam: Schema.optional(DeviceRam),
})).annotate({ identifier: "DeviceSelector" }) as any as Schema.Schema<DeviceSelector>;

export interface DeviceGroup {
  /** Device selectors for this group. A device matching any of the selectors is included in this group. */
  deviceSelectors?: Array<DeviceSelector>;
  /** The name of the group. */
  name?: string;
}

export const DeviceGroup: Schema.Schema<DeviceGroup> = Schema.suspend(() => Schema.Struct({
  deviceSelectors: Schema.optional(Schema.Array(DeviceSelector)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceGroup" }) as any as Schema.Schema<DeviceGroup>;

export interface OneTimeCode {
}

export const OneTimeCode: Schema.Schema<OneTimeCode> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OneTimeCode" }) as any as Schema.Schema<OneTimeCode>;

export interface Image {
  /** A URL that will serve a preview of the image. */
  url?: string;
  /** A sha1 hash of the image. */
  sha1?: string;
  /** A sha256 hash of the image. */
  sha256?: string;
  /** A unique id representing this image. */
  id?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  sha1: Schema.optional(Schema.String),
  sha256: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface ImagesUploadResponse {
  /** The uploaded image. */
  image?: Image;
}

export const ImagesUploadResponse: Schema.Schema<ImagesUploadResponse> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Image),
})).annotate({ identifier: "ImagesUploadResponse" }) as any as Schema.Schema<ImagesUploadResponse>;

export interface RegionsVersion {
  /** Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available. */
  version?: string;
}

export const RegionsVersion: Schema.Schema<RegionsVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionsVersion" }) as any as Schema.Schema<RegionsVersion>;

export interface OneTimeProductListing {
  /** Required. The language of this listing, as defined by BCP-47, e.g., "en-US". */
  languageCode?: string;
  /** Required. The description of this product in the language of this listing. The maximum length is 200 characters. */
  description?: string;
  /** Required. The title of this product in the language of this listing. The maximum length is 55 characters. */
  title?: string;
}

export const OneTimeProductListing: Schema.Schema<OneTimeProductListing> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeProductListing" }) as any as Schema.Schema<OneTimeProductListing>;

export interface RegionalProductAgeRatingInfo {
  /** Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US". */
  regionCode?: string;
  /** The age rating tier of a product for the given region. */
  productAgeRatingTier?: "PRODUCT_AGE_RATING_TIER_UNKNOWN" | "PRODUCT_AGE_RATING_TIER_EVERYONE" | "PRODUCT_AGE_RATING_TIER_THIRTEEN_AND_ABOVE" | "PRODUCT_AGE_RATING_TIER_SIXTEEN_AND_ABOVE" | "PRODUCT_AGE_RATING_TIER_EIGHTEEN_AND_ABOVE" | (string & {});
}

export const RegionalProductAgeRatingInfo: Schema.Schema<RegionalProductAgeRatingInfo> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  productAgeRatingTier: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalProductAgeRatingInfo" }) as any as Schema.Schema<RegionalProductAgeRatingInfo>;

export interface OneTimeProductTaxAndComplianceSettings {
  /** Regional age rating information. Currently this field is only supported for region code `US`. */
  regionalProductAgeRatingInfos?: Array<RegionalProductAgeRatingInfo>;
  /** Whether this one-time product is declared as a product representing a tokenized digital asset. */
  isTokenizedDigitalAsset?: boolean;
  /** Product tax category code to assign to the one-time product. Product tax category determines the transaction tax rates applied to the product. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information. */
  productTaxCategoryCode?: string;
  /** Regional tax configuration. */
  regionalTaxConfigs?: Array<RegionalTaxConfig>;
}

export const OneTimeProductTaxAndComplianceSettings: Schema.Schema<OneTimeProductTaxAndComplianceSettings> = Schema.suspend(() => Schema.Struct({
  regionalProductAgeRatingInfos: Schema.optional(Schema.Array(RegionalProductAgeRatingInfo)),
  isTokenizedDigitalAsset: Schema.optional(Schema.Boolean),
  productTaxCategoryCode: Schema.optional(Schema.String),
  regionalTaxConfigs: Schema.optional(Schema.Array(RegionalTaxConfig)),
})).annotate({ identifier: "OneTimeProductTaxAndComplianceSettings" }) as any as Schema.Schema<OneTimeProductTaxAndComplianceSettings>;

export interface RestrictedPaymentCountries {
  /** Required. Region codes to impose payment restrictions on, as defined by ISO 3166-2, e.g. "US". */
  regionCodes?: Array<string>;
}

export const RestrictedPaymentCountries: Schema.Schema<RestrictedPaymentCountries> = Schema.suspend(() => Schema.Struct({
  regionCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RestrictedPaymentCountries" }) as any as Schema.Schema<RestrictedPaymentCountries>;

export interface OneTimeProduct {
  /** Optional. List of up to 20 custom tags specified for this one-time product, and returned to the app through the billing library. Purchase options and offers for this product will also receive these tags in the billing library. */
  offerTags?: Array<OfferTag>;
  /** Output only. The version of the regions configuration that was used to generate the one-time product. */
  regionsVersion?: RegionsVersion;
  /** Required. Immutable. Package name of the parent app. */
  packageName?: string;
  /** Required. Set of localized title and description data. Must not have duplicate entries with the same language_code. */
  listings?: Array<OneTimeProductListing>;
  /** Required. The set of purchase options for this one-time product. */
  purchaseOptions?: Array<OneTimeProductPurchaseOption>;
  /** Required. Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must start with a number or lowercase letter, and can contain numbers (0-9), lowercase letters (a-z), underscores (_), and periods (.). */
  productId?: string;
  /** Details about taxes and legal compliance. */
  taxAndComplianceSettings?: OneTimeProductTaxAndComplianceSettings;
  /** Optional. Countries where the purchase of this one-time product is restricted to payment methods registered in the same country. If empty, no payment location restrictions are imposed. */
  restrictedPaymentCountries?: RestrictedPaymentCountries;
}

export const OneTimeProduct: Schema.Schema<OneTimeProduct> = Schema.suspend(() => Schema.Struct({
  offerTags: Schema.optional(Schema.Array(OfferTag)),
  regionsVersion: Schema.optional(RegionsVersion),
  packageName: Schema.optional(Schema.String),
  listings: Schema.optional(Schema.Array(OneTimeProductListing)),
  purchaseOptions: Schema.optional(Schema.Array(OneTimeProductPurchaseOption)),
  productId: Schema.optional(Schema.String),
  taxAndComplianceSettings: Schema.optional(OneTimeProductTaxAndComplianceSettings),
  restrictedPaymentCountries: Schema.optional(RestrictedPaymentCountries),
})).annotate({ identifier: "OneTimeProduct" }) as any as Schema.Schema<OneTimeProduct>;

export interface UpdateOneTimeProductRequest {
  /** Required. The version of the available regions being used for the one-time product. */
  regionsVersion?: RegionsVersion;
  /** Optional. If set to true, and the one-time product with the given package_name and product_id doesn't exist, the one-time product will be created. If a new one-time product is created, update_mask is ignored. */
  allowMissing?: boolean;
  /** Optional. The latency tolerance for the propagation of this product upsert. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Required. The one-time product to upsert. */
  oneTimeProduct?: OneTimeProduct;
}

export const UpdateOneTimeProductRequest: Schema.Schema<UpdateOneTimeProductRequest> = Schema.suspend(() => Schema.Struct({
  regionsVersion: Schema.optional(RegionsVersion),
  allowMissing: Schema.optional(Schema.Boolean),
  latencyTolerance: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  oneTimeProduct: Schema.optional(OneTimeProduct),
})).annotate({ identifier: "UpdateOneTimeProductRequest" }) as any as Schema.Schema<UpdateOneTimeProductRequest>;

export interface BatchUpdateOneTimeProductsRequest {
  /** Required. A list of update requests of up to 100 elements. All requests must update different one-time products. */
  requests?: Array<UpdateOneTimeProductRequest>;
}

export const BatchUpdateOneTimeProductsRequest: Schema.Schema<BatchUpdateOneTimeProductsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateOneTimeProductRequest)),
})).annotate({ identifier: "BatchUpdateOneTimeProductsRequest" }) as any as Schema.Schema<BatchUpdateOneTimeProductsRequest>;

export interface ApksListResponse {
  /** The kind of this response ("androidpublisher#apksListResponse"). */
  kind?: string;
  /** All APKs. */
  apks?: Array<Apk>;
}

export const ApksListResponse: Schema.Schema<ApksListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  apks: Schema.optional(Schema.Array(Apk)),
})).annotate({ identifier: "ApksListResponse" }) as any as Schema.Schema<ApksListResponse>;

export interface BatchDeletePurchaseOptionsRequest {
  /** Required. A list of delete requests of up to 100 elements. All requests must delete purchase options from different one-time products. */
  requests?: Array<DeletePurchaseOptionRequest>;
}

export const BatchDeletePurchaseOptionsRequest: Schema.Schema<BatchDeletePurchaseOptionsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(DeletePurchaseOptionRequest)),
})).annotate({ identifier: "BatchDeletePurchaseOptionsRequest" }) as any as Schema.Schema<BatchDeletePurchaseOptionsRequest>;

export interface RegionalSubscriptionOfferPhaseFreePriceOverride {
}

export const RegionalSubscriptionOfferPhaseFreePriceOverride: Schema.Schema<RegionalSubscriptionOfferPhaseFreePriceOverride> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RegionalSubscriptionOfferPhaseFreePriceOverride" }) as any as Schema.Schema<RegionalSubscriptionOfferPhaseFreePriceOverride>;

export interface RegionalSubscriptionOfferPhaseConfig {
  /** The absolute amount of money subtracted from the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a $1 absolute discount for a phase of a duration of 3 months would correspond to a price of $2. The resulting price may not be smaller than the minimum price allowed for this region. */
  absoluteDiscount?: Money;
  /** The absolute price the user pays for this offer phase. The price must not be smaller than the minimum price allowed for this region. */
  price?: Money;
  /** The fraction of the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a 50% discount for a phase of a duration of 3 months would correspond to a price of $1.50. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in this region. */
  relativeDiscount?: number;
  /** Set to specify this offer is free to obtain. */
  free?: RegionalSubscriptionOfferPhaseFreePriceOverride;
  /** Required. Immutable. The region to which this config applies. */
  regionCode?: string;
}

export const RegionalSubscriptionOfferPhaseConfig: Schema.Schema<RegionalSubscriptionOfferPhaseConfig> = Schema.suspend(() => Schema.Struct({
  absoluteDiscount: Schema.optional(Money),
  price: Schema.optional(Money),
  relativeDiscount: Schema.optional(Schema.Number),
  free: Schema.optional(RegionalSubscriptionOfferPhaseFreePriceOverride),
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalSubscriptionOfferPhaseConfig" }) as any as Schema.Schema<RegionalSubscriptionOfferPhaseConfig>;

export interface OtherRegionsSubscriptionOfferPhasePrices {
  /** Required. Price in EUR to use for any new locations Play may launch in. */
  eurPrice?: Money;
  /** Required. Price in USD to use for any new locations Play may launch in. */
  usdPrice?: Money;
}

export const OtherRegionsSubscriptionOfferPhasePrices: Schema.Schema<OtherRegionsSubscriptionOfferPhasePrices> = Schema.suspend(() => Schema.Struct({
  eurPrice: Schema.optional(Money),
  usdPrice: Schema.optional(Money),
})).annotate({ identifier: "OtherRegionsSubscriptionOfferPhasePrices" }) as any as Schema.Schema<OtherRegionsSubscriptionOfferPhasePrices>;

export interface OtherRegionsSubscriptionOfferPhaseFreePriceOverride {
}

export const OtherRegionsSubscriptionOfferPhaseFreePriceOverride: Schema.Schema<OtherRegionsSubscriptionOfferPhaseFreePriceOverride> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OtherRegionsSubscriptionOfferPhaseFreePriceOverride" }) as any as Schema.Schema<OtherRegionsSubscriptionOfferPhaseFreePriceOverride>;

export interface OtherRegionsSubscriptionOfferPhaseConfig {
  /** The fraction of the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a 50% discount for a phase of a duration of 3 months would correspond to a price of $1.50. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in any new locations Play may launch in. */
  relativeDiscount?: number;
  /** The absolute price the user pays for this offer phase. The price must not be smaller than the minimum price allowed for any new locations Play may launch in. */
  otherRegionsPrices?: OtherRegionsSubscriptionOfferPhasePrices;
  /** The absolute amount of money subtracted from the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a $1 absolute discount for a phase of a duration of 3 months would correspond to a price of $2. The resulting price may not be smaller than the minimum price allowed for any new locations Play may launch in. */
  absoluteDiscounts?: OtherRegionsSubscriptionOfferPhasePrices;
  /** Set to specify this offer is free to obtain. */
  free?: OtherRegionsSubscriptionOfferPhaseFreePriceOverride;
}

export const OtherRegionsSubscriptionOfferPhaseConfig: Schema.Schema<OtherRegionsSubscriptionOfferPhaseConfig> = Schema.suspend(() => Schema.Struct({
  relativeDiscount: Schema.optional(Schema.Number),
  otherRegionsPrices: Schema.optional(OtherRegionsSubscriptionOfferPhasePrices),
  absoluteDiscounts: Schema.optional(OtherRegionsSubscriptionOfferPhasePrices),
  free: Schema.optional(OtherRegionsSubscriptionOfferPhaseFreePriceOverride),
})).annotate({ identifier: "OtherRegionsSubscriptionOfferPhaseConfig" }) as any as Schema.Schema<OtherRegionsSubscriptionOfferPhaseConfig>;

export interface SubscriptionOfferPhase {
  /** Required. The number of times this phase repeats. If this offer phase is not free, each recurrence charges the user the price of this offer phase. */
  recurrenceCount?: number;
  /** Required. The region-specific configuration of this offer phase. This list must contain exactly one entry for each region for which the subscription offer has a regional config. */
  regionalConfigs?: Array<RegionalSubscriptionOfferPhaseConfig>;
  /** Pricing information for any new locations Play may launch in. */
  otherRegionsConfig?: OtherRegionsSubscriptionOfferPhaseConfig;
  /** Required. The duration of a single recurrence of this phase. Specified in ISO 8601 format. */
  duration?: string;
}

export const SubscriptionOfferPhase: Schema.Schema<SubscriptionOfferPhase> = Schema.suspend(() => Schema.Struct({
  recurrenceCount: Schema.optional(Schema.Number),
  regionalConfigs: Schema.optional(Schema.Array(RegionalSubscriptionOfferPhaseConfig)),
  otherRegionsConfig: Schema.optional(OtherRegionsSubscriptionOfferPhaseConfig),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionOfferPhase" }) as any as Schema.Schema<SubscriptionOfferPhase>;

export interface TargetingRuleScopeAnySubscriptionInApp {
}

export const TargetingRuleScopeAnySubscriptionInApp: Schema.Schema<TargetingRuleScopeAnySubscriptionInApp> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TargetingRuleScopeAnySubscriptionInApp" }) as any as Schema.Schema<TargetingRuleScopeAnySubscriptionInApp>;

export interface RegionalTaxRateInfo {
  /** To collect communications or amusement taxes in the United States, choose the appropriate tax category. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498#streaming_tax). */
  streamingTaxType?: "STREAMING_TAX_TYPE_UNSPECIFIED" | "STREAMING_TAX_TYPE_TELCO_VIDEO_RENTAL" | "STREAMING_TAX_TYPE_TELCO_VIDEO_SALES" | "STREAMING_TAX_TYPE_TELCO_VIDEO_MULTI_CHANNEL" | "STREAMING_TAX_TYPE_TELCO_AUDIO_RENTAL" | "STREAMING_TAX_TYPE_TELCO_AUDIO_SALES" | "STREAMING_TAX_TYPE_TELCO_AUDIO_MULTI_CHANNEL" | (string & {});
  /** Tax tier to specify reduced tax rate. Developers who sell digital news, magazines, newspapers, books, or audiobooks in various regions may be eligible for reduced tax rates. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498). */
  taxTier?: "TAX_TIER_UNSPECIFIED" | "TAX_TIER_BOOKS_1" | "TAX_TIER_NEWS_1" | "TAX_TIER_NEWS_2" | "TAX_TIER_MUSIC_OR_AUDIO_1" | "TAX_TIER_LIVE_OR_BROADCAST_1" | (string & {});
  /** You must tell us if your app contains streaming products to correctly charge US state and local sales tax. Field only supported in the United States. */
  eligibleForStreamingServiceTaxRate?: boolean;
}

export const RegionalTaxRateInfo: Schema.Schema<RegionalTaxRateInfo> = Schema.suspend(() => Schema.Struct({
  streamingTaxType: Schema.optional(Schema.String),
  taxTier: Schema.optional(Schema.String),
  eligibleForStreamingServiceTaxRate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RegionalTaxRateInfo" }) as any as Schema.Schema<RegionalTaxRateInfo>;

export interface ManagedProductTaxAndComplianceSettings {
  /** A mapping from region code to tax rate details. The keys are region codes as defined by Unicode's "CLDR". */
  taxRateInfoByRegionCode?: Record<string, RegionalTaxRateInfo>;
  /** Regional age rating information. Currently this field is only supported for region code `US`. */
  regionalProductAgeRatingInfos?: Array<RegionalProductAgeRatingInfo>;
  /** Digital content or service classification for products distributed to users in the European Economic Area (EEA). The withdrawal regime under EEA consumer laws depends on this classification. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information. */
  eeaWithdrawalRightType?: "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED" | "WITHDRAWAL_RIGHT_DIGITAL_CONTENT" | "WITHDRAWAL_RIGHT_SERVICE" | (string & {});
  /** Whether this in-app product is declared as a product representing a tokenized digital asset. */
  isTokenizedDigitalAsset?: boolean;
  /** Product tax category code to assign to the in-app product. Product tax category determines the transaction tax rates applied to the product. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information. */
  productTaxCategoryCode?: string;
}

export const ManagedProductTaxAndComplianceSettings: Schema.Schema<ManagedProductTaxAndComplianceSettings> = Schema.suspend(() => Schema.Struct({
  taxRateInfoByRegionCode: Schema.optional(Schema.Record(Schema.String, RegionalTaxRateInfo)),
  regionalProductAgeRatingInfos: Schema.optional(Schema.Array(RegionalProductAgeRatingInfo)),
  eeaWithdrawalRightType: Schema.optional(Schema.String),
  isTokenizedDigitalAsset: Schema.optional(Schema.Boolean),
  productTaxCategoryCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedProductTaxAndComplianceSettings" }) as any as Schema.Schema<ManagedProductTaxAndComplianceSettings>;

export interface SubscriptionTaxAndComplianceSettings {
  /** Digital content or service classification for products distributed to users in the European Economic Area (EEA). The withdrawal regime under EEA consumer laws depends on this classification. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information. */
  eeaWithdrawalRightType?: "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED" | "WITHDRAWAL_RIGHT_DIGITAL_CONTENT" | "WITHDRAWAL_RIGHT_SERVICE" | (string & {});
  /** Whether this subscription is declared as a product representing a tokenized digital asset. */
  isTokenizedDigitalAsset?: boolean;
  /** Regional age rating information. Currently this field is only supported for region code `US`. */
  regionalProductAgeRatingInfos?: Array<RegionalProductAgeRatingInfo>;
  /** Product tax category code to assign to the subscription. Product tax category determines the transaction tax rates applied to the subscription. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information. */
  productTaxCategoryCode?: string;
  /** A mapping from region code to tax rate details. The keys are region codes as defined by Unicode's "CLDR". */
  taxRateInfoByRegionCode?: Record<string, RegionalTaxRateInfo>;
}

export const SubscriptionTaxAndComplianceSettings: Schema.Schema<SubscriptionTaxAndComplianceSettings> = Schema.suspend(() => Schema.Struct({
  eeaWithdrawalRightType: Schema.optional(Schema.String),
  isTokenizedDigitalAsset: Schema.optional(Schema.Boolean),
  regionalProductAgeRatingInfos: Schema.optional(Schema.Array(RegionalProductAgeRatingInfo)),
  productTaxCategoryCode: Schema.optional(Schema.String),
  taxRateInfoByRegionCode: Schema.optional(Schema.Record(Schema.String, RegionalTaxRateInfo)),
})).annotate({ identifier: "SubscriptionTaxAndComplianceSettings" }) as any as Schema.Schema<SubscriptionTaxAndComplianceSettings>;

export interface InAppProductListing {
  /** Title for the store listing. */
  title?: string;
  /** Localized entitlement benefits for a subscription. */
  benefits?: Array<string>;
  /** Description for the store listing. */
  description?: string;
}

export const InAppProductListing: Schema.Schema<InAppProductListing> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  benefits: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "InAppProductListing" }) as any as Schema.Schema<InAppProductListing>;

export interface InAppProduct {
  /** Details about taxes and legal compliance. Only applicable to managed products. */
  managedProductTaxesAndComplianceSettings?: ManagedProductTaxAndComplianceSettings;
  /** Details about taxes and legal compliance. Only applicable to subscription products. */
  subscriptionTaxesAndComplianceSettings?: SubscriptionTaxAndComplianceSettings;
  /** The status of the product, e.g. whether it's active. */
  status?: "statusUnspecified" | "active" | "inactive" | (string & {});
  /** Grace period of the subscription, specified in ISO 8601 format. Allows developers to give their subscribers a grace period when the payment for the new recurrence period is declined. Acceptable values are P0D (zero days), P3D (three days), P7D (seven days), P14D (14 days), and P30D (30 days). */
  gracePeriod?: string;
  /** Default price. Cannot be zero, as in-app products are never free. Always in the developer's Checkout merchant currency. */
  defaultPrice?: Price;
  /** Default language of the localized data, as defined by BCP-47. e.g. "en-US". */
  defaultLanguage?: string;
  /** List of localized title and description data. Map key is the language of the localized data, as defined by BCP-47, e.g. "en-US". */
  listings?: Record<string, InAppProductListing>;
  /** Stock-keeping-unit (SKU) of the product, unique within an app. */
  sku?: string;
  /** The type of the product, e.g. a recurring subscription. */
  purchaseType?: "purchaseTypeUnspecified" | "managedUser" | "subscription" | (string & {});
  /** Trial period, specified in ISO 8601 format. Acceptable values are anything between P7D (seven days) and P999D (999 days). */
  trialPeriod?: string;
  /** Package name of the parent app. */
  packageName?: string;
  /** Subscription period, specified in ISO 8601 format. Acceptable values are P1W (one week), P1M (one month), P3M (three months), P6M (six months), and P1Y (one year). */
  subscriptionPeriod?: string;
  /** Prices per buyer region. None of these can be zero, as in-app products are never free. Map key is region code, as defined by ISO 3166-2. */
  prices?: Record<string, Price>;
}

export const InAppProduct: Schema.Schema<InAppProduct> = Schema.suspend(() => Schema.Struct({
  managedProductTaxesAndComplianceSettings: Schema.optional(ManagedProductTaxAndComplianceSettings),
  subscriptionTaxesAndComplianceSettings: Schema.optional(SubscriptionTaxAndComplianceSettings),
  status: Schema.optional(Schema.String),
  gracePeriod: Schema.optional(Schema.String),
  defaultPrice: Schema.optional(Price),
  defaultLanguage: Schema.optional(Schema.String),
  listings: Schema.optional(Schema.Record(Schema.String, InAppProductListing)),
  sku: Schema.optional(Schema.String),
  purchaseType: Schema.optional(Schema.String),
  trialPeriod: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  subscriptionPeriod: Schema.optional(Schema.String),
  prices: Schema.optional(Schema.Record(Schema.String, Price)),
})).annotate({ identifier: "InAppProduct" }) as any as Schema.Schema<InAppProduct>;

export interface InappproductsUpdateRequest {
  /** Unique identifier for the in-app product. */
  sku?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** The new in-app product. */
  inappproduct?: InAppProduct;
  /** If set to true, and the in-app product with the given package_name and sku doesn't exist, the in-app product will be created. */
  allowMissing?: boolean;
  /** Package name of the app. */
  packageName?: string;
  /** If true the prices for all regions targeted by the parent app that don't have a price specified for this in-app product will be auto converted to the target currency based on the default price. Defaults to false. */
  autoConvertMissingPrices?: boolean;
}

export const InappproductsUpdateRequest: Schema.Schema<InappproductsUpdateRequest> = Schema.suspend(() => Schema.Struct({
  sku: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  inappproduct: Schema.optional(InAppProduct),
  allowMissing: Schema.optional(Schema.Boolean),
  packageName: Schema.optional(Schema.String),
  autoConvertMissingPrices: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "InappproductsUpdateRequest" }) as any as Schema.Schema<InappproductsUpdateRequest>;

export interface InappproductsBatchUpdateRequest {
  /** Required. Individual update requests. At least one request is required. Can contain up to 100 requests. All requests must correspond to different in-app products. */
  requests?: Array<InappproductsUpdateRequest>;
}

export const InappproductsBatchUpdateRequest: Schema.Schema<InappproductsBatchUpdateRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(InappproductsUpdateRequest)),
})).annotate({ identifier: "InappproductsBatchUpdateRequest" }) as any as Schema.Schema<InappproductsBatchUpdateRequest>;

export interface PrepaidPlan {
  /** If present, this is the time after which top up purchases are allowed for the prepaid plan. Will not be present for expired prepaid plans. */
  allowExtendAfterTime?: string;
}

export const PrepaidPlan: Schema.Schema<PrepaidPlan> = Schema.suspend(() => Schema.Struct({
  allowExtendAfterTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PrepaidPlan" }) as any as Schema.Schema<PrepaidPlan>;

export interface PointsDetails {
  /** The monetary value of a Play Points coupon. This is the discount the coupon provides, which may not be the total amount. Only set when Play Points coupons have been used. E.g. for a 100 points for $2 coupon, this is $2. */
  pointsCouponValue?: Money;
  /** The percentage rate which the Play Points promotion reduces the cost by. E.g. for a 100 points for $2 coupon, this is 500,000. Since $2 has an estimate of 200 points, but the actual Points required, 100, is 50% of this, and 50% in micros is 500,000. Between 0 and 1,000,000. */
  pointsDiscountRateMicros?: string;
  /** The number of Play Points applied in this order. E.g. for a 100 points for $2 coupon, this is 100. For coupon stacked with base offer, this is the total points spent across both. */
  pointsSpent?: string;
  /** ID unique to the play points offer in use for this order. */
  pointsOfferId?: string;
}

export const PointsDetails: Schema.Schema<PointsDetails> = Schema.suspend(() => Schema.Struct({
  pointsCouponValue: Schema.optional(Money),
  pointsDiscountRateMicros: Schema.optional(Schema.String),
  pointsSpent: Schema.optional(Schema.String),
  pointsOfferId: Schema.optional(Schema.String),
})).annotate({ identifier: "PointsDetails" }) as any as Schema.Schema<PointsDetails>;

export interface ActivateSubscriptionOfferRequest {
  /** Required. The parent subscription (ID) of the offer to activate. */
  productId?: string;
  /** Required. The parent app (package name) of the offer to activate. */
  packageName?: string;
  /** Required. The parent base plan (ID) of the offer to activate. */
  basePlanId?: string;
  /** Required. The unique offer ID of the offer to activate. */
  offerId?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
}

export const ActivateSubscriptionOfferRequest: Schema.Schema<ActivateSubscriptionOfferRequest> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  basePlanId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivateSubscriptionOfferRequest" }) as any as Schema.Schema<ActivateSubscriptionOfferRequest>;

export interface ReplacementCancellation {
}

export const ReplacementCancellation: Schema.Schema<ReplacementCancellation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReplacementCancellation" }) as any as Schema.Schema<ReplacementCancellation>;

export interface ProrationPeriodOfferPhase {
  /** The original offer phase type before the proration period. Only set when the proration period is updated from an existing offer phase. */
  originalOfferPhaseType?: "ORIGINAL_OFFER_PHASE_TYPE_UNSPECIFIED" | "BASE" | "INTRODUCTORY" | "FREE_TRIAL" | (string & {});
}

export const ProrationPeriodOfferPhase: Schema.Schema<ProrationPeriodOfferPhase> = Schema.suspend(() => Schema.Struct({
  originalOfferPhaseType: Schema.optional(Schema.String),
})).annotate({ identifier: "ProrationPeriodOfferPhase" }) as any as Schema.Schema<ProrationPeriodOfferPhase>;

export interface FreeTrialOfferPhase {
}

export const FreeTrialOfferPhase: Schema.Schema<FreeTrialOfferPhase> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FreeTrialOfferPhase" }) as any as Schema.Schema<FreeTrialOfferPhase>;

export interface IntroductoryPriceOfferPhase {
}

export const IntroductoryPriceOfferPhase: Schema.Schema<IntroductoryPriceOfferPhase> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IntroductoryPriceOfferPhase" }) as any as Schema.Schema<IntroductoryPriceOfferPhase>;

export interface BasePriceOfferPhase {
}

export const BasePriceOfferPhase: Schema.Schema<BasePriceOfferPhase> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "BasePriceOfferPhase" }) as any as Schema.Schema<BasePriceOfferPhase>;

export interface OfferPhase {
  /** Set when the offer phase is a proration period. */
  prorationPeriod?: ProrationPeriodOfferPhase;
  /** Set when the offer phase is a free trial. */
  freeTrial?: FreeTrialOfferPhase;
  /** Set when the offer phase is an introductory price offer phase. */
  introductoryPrice?: IntroductoryPriceOfferPhase;
  /** Set when the offer phase is a base plan pricing phase. */
  basePrice?: BasePriceOfferPhase;
}

export const OfferPhase: Schema.Schema<OfferPhase> = Schema.suspend(() => Schema.Struct({
  prorationPeriod: Schema.optional(ProrationPeriodOfferPhase),
  freeTrial: Schema.optional(FreeTrialOfferPhase),
  introductoryPrice: Schema.optional(IntroductoryPriceOfferPhase),
  basePrice: Schema.optional(BasePriceOfferPhase),
})).annotate({ identifier: "OfferPhase" }) as any as Schema.Schema<OfferPhase>;

export interface Regions {
  /** Regions targeted by the recovery action. Region codes are ISO 3166 Alpha-2 country codes. For example, US stands for United States of America. See https://www.iso.org/iso-3166-country-codes.html for the complete list of country codes. */
  regionCode?: Array<string>;
}

export const Regions: Schema.Schema<Regions> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Regions" }) as any as Schema.Schema<Regions>;

export interface AndroidSdks {
  /** Android api levels of devices targeted by recovery action. See https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels for different api levels in android. */
  sdkLevels?: Array<string>;
}

export const AndroidSdks: Schema.Schema<AndroidSdks> = Schema.suspend(() => Schema.Struct({
  sdkLevels: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AndroidSdks" }) as any as Schema.Schema<AndroidSdks>;

export interface AllUsers {
  /** Required. Set to true if all set of users are needed. */
  isAllUsersRequested?: boolean;
}

export const AllUsers: Schema.Schema<AllUsers> = Schema.suspend(() => Schema.Struct({
  isAllUsersRequested: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AllUsers" }) as any as Schema.Schema<AllUsers>;

export interface TargetingUpdate {
  /** Additional regions are targeted by the recovery action. */
  regions?: Regions;
  /** Additional android sdk levels are targeted by the recovery action. */
  androidSdks?: AndroidSdks;
  /** All users are targeted. */
  allUsers?: AllUsers;
}

export const TargetingUpdate: Schema.Schema<TargetingUpdate> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Regions),
  androidSdks: Schema.optional(AndroidSdks),
  allUsers: Schema.optional(AllUsers),
})).annotate({ identifier: "TargetingUpdate" }) as any as Schema.Schema<TargetingUpdate>;

export interface ExternalAccountIds {
  /** Optional. Specifies an optional obfuscated string that is uniquely associated with the purchaser's user account in your app. If you pass this value, Google Play can use it to detect irregular activity. Do not use this field to store any Personally Identifiable Information (PII) such as emails in cleartext. Attempting to store PII in this field will result in purchases being blocked. Google Play recommends that you use either encryption or a one-way hash to generate an obfuscated identifier to send to Google Play. This identifier is limited to 64 characters. This field can only be set for resubscription purchases. See https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid to set this field for purchases made using the standard in-app billing flow. */
  obfuscatedAccountId?: string;
  /** Optional. Specifies an optional obfuscated string that is uniquely associated with the purchaser's user profile in your app. If you pass this value, Google Play can use it to detect irregular activity. Do not use this field to store any Personally Identifiable Information (PII) such as emails in cleartext. Attempting to store PII in this field will result in purchases being blocked. Google Play recommends that you use either encryption or a one-way hash to generate an obfuscated identifier to send to Google Play. This identifier is limited to 64 characters. This field can only be set for resubscription purchases. See https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid to set this field for purchases made using the standard in-app billing flow. */
  obfuscatedProfileId?: string;
}

export const ExternalAccountIds: Schema.Schema<ExternalAccountIds> = Schema.suspend(() => Schema.Struct({
  obfuscatedAccountId: Schema.optional(Schema.String),
  obfuscatedProfileId: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalAccountIds" }) as any as Schema.Schema<ExternalAccountIds>;

export interface RefundDetails {
  /** The total amount refunded, including tax. */
  total?: Money;
  /** The amount of tax refunded. */
  tax?: Money;
}

export const RefundDetails: Schema.Schema<RefundDetails> = Schema.suspend(() => Schema.Struct({
  total: Schema.optional(Money),
  tax: Schema.optional(Money),
})).annotate({ identifier: "RefundDetails" }) as any as Schema.Schema<RefundDetails>;

export interface PartialRefundEvent {
  /** The time when the partial refund was processed. */
  processTime?: string;
  /** The state of the partial refund. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "PROCESSED_SUCCESSFULLY" | (string & {});
  /** Details for the partial refund. */
  refundDetails?: RefundDetails;
  /** The time when the partial refund was created. */
  createTime?: string;
}

export const PartialRefundEvent: Schema.Schema<PartialRefundEvent> = Schema.suspend(() => Schema.Struct({
  processTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  refundDetails: Schema.optional(RefundDetails),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PartialRefundEvent" }) as any as Schema.Schema<PartialRefundEvent>;

export interface BaseDetails {
}

export const BaseDetails: Schema.Schema<BaseDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "BaseDetails" }) as any as Schema.Schema<BaseDetails>;

export interface FreeTrialDetails {
}

export const FreeTrialDetails: Schema.Schema<FreeTrialDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "FreeTrialDetails" }) as any as Schema.Schema<FreeTrialDetails>;

export interface IntroductoryPriceDetails {
}

export const IntroductoryPriceDetails: Schema.Schema<IntroductoryPriceDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IntroductoryPriceDetails" }) as any as Schema.Schema<IntroductoryPriceDetails>;

export interface ProrationPeriodDetails {
  /** Represent the original offer phase from the purchased the line item if the proration period contains any of them. For example, a proration period from CHARGE_FULL_PRICE plan change may merge the 1st offer phase of the subscription offer of the new product user purchased. In this case, the original offer phase will be set here. */
  originalOfferPhase?: "OFFER_PHASE_UNSPECIFIED" | "BASE" | "INTRODUCTORY" | "FREE_TRIAL" | (string & {});
}

export const ProrationPeriodDetails: Schema.Schema<ProrationPeriodDetails> = Schema.suspend(() => Schema.Struct({
  originalOfferPhase: Schema.optional(Schema.String),
})).annotate({ identifier: "ProrationPeriodDetails" }) as any as Schema.Schema<ProrationPeriodDetails>;

export interface OfferPhaseDetails {
  /** The order funds a base price period. */
  baseDetails?: BaseDetails;
  /** The order funds a free trial period. */
  freeTrialDetails?: FreeTrialDetails;
  /** The order funds an introductory pricing period. */
  introductoryPriceDetails?: IntroductoryPriceDetails;
  /** The order funds a proration period. */
  prorationPeriodDetails?: ProrationPeriodDetails;
}

export const OfferPhaseDetails: Schema.Schema<OfferPhaseDetails> = Schema.suspend(() => Schema.Struct({
  baseDetails: Schema.optional(BaseDetails),
  freeTrialDetails: Schema.optional(FreeTrialDetails),
  introductoryPriceDetails: Schema.optional(IntroductoryPriceDetails),
  prorationPeriodDetails: Schema.optional(ProrationPeriodDetails),
})).annotate({ identifier: "OfferPhaseDetails" }) as any as Schema.Schema<OfferPhaseDetails>;

export interface DeveloperInitiatedCancellation {
}

export const DeveloperInitiatedCancellation: Schema.Schema<DeveloperInitiatedCancellation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeveloperInitiatedCancellation" }) as any as Schema.Schema<DeveloperInitiatedCancellation>;

export interface CancelAppRecoveryResponse {
}

export const CancelAppRecoveryResponse: Schema.Schema<CancelAppRecoveryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelAppRecoveryResponse" }) as any as Schema.Schema<CancelAppRecoveryResponse>;

export interface DeactivateBasePlanRequest {
  /** Required. The unique base plan ID of the base plan to deactivate. */
  basePlanId?: string;
  /** Required. The parent subscription (ID) of the base plan to deactivate. */
  productId?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent app (package name) of the base plan to deactivate. */
  packageName?: string;
}

export const DeactivateBasePlanRequest: Schema.Schema<DeactivateBasePlanRequest> = Schema.suspend(() => Schema.Struct({
  basePlanId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "DeactivateBasePlanRequest" }) as any as Schema.Schema<DeactivateBasePlanRequest>;

export interface ActivateBasePlanRequest {
  /** Required. The parent app (package name) of the base plan to activate. */
  packageName?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent subscription (ID) of the base plan to activate. */
  productId?: string;
  /** Required. The unique base plan ID of the base plan to activate. */
  basePlanId?: string;
}

export const ActivateBasePlanRequest: Schema.Schema<ActivateBasePlanRequest> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  basePlanId: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivateBasePlanRequest" }) as any as Schema.Schema<ActivateBasePlanRequest>;

export interface UpdateBasePlanStateRequest {
  /** Deactivates a base plan. Once deactivated, the base plan will become unavailable to new subscribers, but existing subscribers will maintain their subscription */
  deactivateBasePlanRequest?: DeactivateBasePlanRequest;
  /** Activates a base plan. Once activated, base plans will be available to new subscribers. */
  activateBasePlanRequest?: ActivateBasePlanRequest;
}

export const UpdateBasePlanStateRequest: Schema.Schema<UpdateBasePlanStateRequest> = Schema.suspend(() => Schema.Struct({
  deactivateBasePlanRequest: Schema.optional(DeactivateBasePlanRequest),
  activateBasePlanRequest: Schema.optional(ActivateBasePlanRequest),
})).annotate({ identifier: "UpdateBasePlanStateRequest" }) as any as Schema.Schema<UpdateBasePlanStateRequest>;

export interface BatchUpdateBasePlanStatesRequest {
  /** Required. The update request list of up to 100 elements. All requests must update different base plans. */
  requests?: Array<UpdateBasePlanStateRequest>;
}

export const BatchUpdateBasePlanStatesRequest: Schema.Schema<BatchUpdateBasePlanStatesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateBasePlanStateRequest)),
})).annotate({ identifier: "BatchUpdateBasePlanStatesRequest" }) as any as Schema.Schema<BatchUpdateBasePlanStatesRequest>;

export interface AddTargetingResponse {
}

export const AddTargetingResponse: Schema.Schema<AddTargetingResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AddTargetingResponse" }) as any as Schema.Schema<AddTargetingResponse>;

export interface DeviceFeature {
  /** Name of the feature. */
  featureName?: string;
  /** The feature version specified by android:glEsVersion or android:version in in the AndroidManifest. */
  featureVersion?: number;
}

export const DeviceFeature: Schema.Schema<DeviceFeature> = Schema.suspend(() => Schema.Struct({
  featureName: Schema.optional(Schema.String),
  featureVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeviceFeature" }) as any as Schema.Schema<DeviceFeature>;

export interface DeviceFeatureTargeting {
  /** Feature of the device. */
  requiredFeature?: DeviceFeature;
}

export const DeviceFeatureTargeting: Schema.Schema<DeviceFeatureTargeting> = Schema.suspend(() => Schema.Struct({
  requiredFeature: Schema.optional(DeviceFeature),
})).annotate({ identifier: "DeviceFeatureTargeting" }) as any as Schema.Schema<DeviceFeatureTargeting>;

export interface ExternalAccountIdentifiers {
  /** User account identifier in the third-party service. Only present if account linking happened as part of the subscription purchase flow. */
  externalAccountId?: string;
  /** An obfuscated version of the id that is uniquely associated with the user's profile in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid when the purchase was made. */
  obfuscatedExternalProfileId?: string;
  /** An obfuscated version of the id that is uniquely associated with the user's account in your app. Present for the following purchases: * If account linking happened as part of the subscription purchase flow. * It was specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid when the purchase was made. */
  obfuscatedExternalAccountId?: string;
}

export const ExternalAccountIdentifiers: Schema.Schema<ExternalAccountIdentifiers> = Schema.suspend(() => Schema.Struct({
  externalAccountId: Schema.optional(Schema.String),
  obfuscatedExternalProfileId: Schema.optional(Schema.String),
  obfuscatedExternalAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalAccountIdentifiers" }) as any as Schema.Schema<ExternalAccountIdentifiers>;

export interface BuyerAddress {
  /** Top-level administrative subdivision of the buyer address country. When Google is the Merchant of Record for the order, this information is not included. */
  buyerState?: string;
  /** Two letter country code based on ISO-3166-1 Alpha-2 (UN country codes). */
  buyerCountry?: string;
  /** Postal code of an address. When Google is the Merchant of Record for the order, this information is not included. */
  buyerPostcode?: string;
}

export const BuyerAddress: Schema.Schema<BuyerAddress> = Schema.suspend(() => Schema.Struct({
  buyerState: Schema.optional(Schema.String),
  buyerCountry: Schema.optional(Schema.String),
  buyerPostcode: Schema.optional(Schema.String),
})).annotate({ identifier: "BuyerAddress" }) as any as Schema.Schema<BuyerAddress>;

export interface ExternalOfferDetails {
  /** Optional. The type of content being reported by this transaction. Required when reporting app downloads or purchased digital content offers made in app installed through Google Play. */
  linkType?: "EXTERNAL_OFFER_LINK_TYPE_UNSPECIFIED" | "LINK_TO_DIGITAL_CONTENT_OFFER" | "LINK_TO_APP_DOWNLOAD" | (string & {});
  /** Optional. The package name of the app downloaded through this transaction. Required when link_type is LINK_TO_APP_DOWNLOAD. */
  installedAppPackage?: string;
  /** Optional. The category of the downloaded app though this transaction. This must match the category provided in Play Console during the external app verification process. Only required for app downloads. */
  installedAppCategory?: "EXTERNAL_OFFER_APP_CATEGORY_UNSPECIFIED" | "APP" | "GAME" | (string & {});
  /** Optional. The external transaction id associated with the app download event through an external link. Required when reporting transactions made in externally installed apps. */
  appDownloadEventExternalTransactionId?: string;
}

export const ExternalOfferDetails: Schema.Schema<ExternalOfferDetails> = Schema.suspend(() => Schema.Struct({
  linkType: Schema.optional(Schema.String),
  installedAppPackage: Schema.optional(Schema.String),
  installedAppCategory: Schema.optional(Schema.String),
  appDownloadEventExternalTransactionId: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalOfferDetails" }) as any as Schema.Schema<ExternalOfferDetails>;

export interface DeactivatePurchaseOptionRequest {
  /** Required. The parent one-time product (ID) of the purchase option to deactivate. */
  productId?: string;
  /** Required. The purchase option ID of the purchase option to deactivate. */
  purchaseOptionId?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent app (package name) of the purchase option to deactivate. */
  packageName?: string;
}

export const DeactivatePurchaseOptionRequest: Schema.Schema<DeactivatePurchaseOptionRequest> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  purchaseOptionId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "DeactivatePurchaseOptionRequest" }) as any as Schema.Schema<DeactivatePurchaseOptionRequest>;

export interface UpdatePurchaseOptionStateRequest {
  /** Activates a purchase option. Once activated, the purchase option will be available. */
  activatePurchaseOptionRequest?: ActivatePurchaseOptionRequest;
  /** Deactivates a purchase option. Once deactivated, the purchase option will become unavailable. */
  deactivatePurchaseOptionRequest?: DeactivatePurchaseOptionRequest;
}

export const UpdatePurchaseOptionStateRequest: Schema.Schema<UpdatePurchaseOptionStateRequest> = Schema.suspend(() => Schema.Struct({
  activatePurchaseOptionRequest: Schema.optional(ActivatePurchaseOptionRequest),
  deactivatePurchaseOptionRequest: Schema.optional(DeactivatePurchaseOptionRequest),
})).annotate({ identifier: "UpdatePurchaseOptionStateRequest" }) as any as Schema.Schema<UpdatePurchaseOptionStateRequest>;

export interface BatchUpdatePurchaseOptionStatesRequest {
  /** Required. The update request list of up to 100 elements. All requests must update different purchase options. */
  requests?: Array<UpdatePurchaseOptionStateRequest>;
}

export const BatchUpdatePurchaseOptionStatesRequest: Schema.Schema<BatchUpdatePurchaseOptionStatesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdatePurchaseOptionStateRequest)),
})).annotate({ identifier: "BatchUpdatePurchaseOptionStatesRequest" }) as any as Schema.Schema<BatchUpdatePurchaseOptionStatesRequest>;

export interface TrackTargetedCountry {
  /** The country that can be targeted, as a two-letter CLDR code. */
  countryCode?: string;
}

export const TrackTargetedCountry: Schema.Schema<TrackTargetedCountry> = Schema.suspend(() => Schema.Struct({
  countryCode: Schema.optional(Schema.String),
})).annotate({ identifier: "TrackTargetedCountry" }) as any as Schema.Schema<TrackTargetedCountry>;

export interface DeployAppRecoveryRequest {
}

export const DeployAppRecoveryRequest: Schema.Schema<DeployAppRecoveryRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeployAppRecoveryRequest" }) as any as Schema.Schema<DeployAppRecoveryRequest>;

export interface UserCountrySet {
  /** List of country codes representing countries. A Country code is represented in ISO 3166 alpha-2 format. For Example:- "IT" for Italy, "GE" for Georgia. */
  countryCodes?: Array<string>;
  /** Country set name. */
  name?: string;
}

export const UserCountrySet: Schema.Schema<UserCountrySet> = Schema.suspend(() => Schema.Struct({
  countryCodes: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "UserCountrySet" }) as any as Schema.Schema<UserCountrySet>;

export interface OneTimeProductPreOrderOffer {
  /** Required. Immutable. Specifies how price changes affect pre-existing pre-orders. */
  priceChangeBehavior?: "PRE_ORDER_PRICE_CHANGE_BEHAVIOR_UNSPECIFIED" | "PRE_ORDER_PRICE_CHANGE_BEHAVIOR_TWO_POINT_LOWEST" | "PRE_ORDER_PRICE_CHANGE_BEHAVIOR_NEW_ORDERS_ONLY" | (string & {});
  /** Required. Time when the pre-order will start being available. */
  startTime?: string;
  /** Required. Time when the pre-order will stop being available. */
  endTime?: string;
  /** Required. Time on which the product associated with the pre-order will be released and the pre-order orders fulfilled. */
  releaseTime?: string;
}

export const OneTimeProductPreOrderOffer: Schema.Schema<OneTimeProductPreOrderOffer> = Schema.suspend(() => Schema.Struct({
  priceChangeBehavior: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  releaseTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeProductPreOrderOffer" }) as any as Schema.Schema<OneTimeProductPreOrderOffer>;

export interface PageInfo {
  /** Total number of results available on the backend ! The total number of results in the result set. */
  totalResults?: number;
  /** Maximum number of results returned in one page. ! The number of results included in the API response. */
  resultPerPage?: number;
  /** Index of the first result returned in the current page. */
  startIndex?: number;
}

export const PageInfo: Schema.Schema<PageInfo> = Schema.suspend(() => Schema.Struct({
  totalResults: Schema.optional(Schema.Number),
  resultPerPage: Schema.optional(Schema.Number),
  startIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "PageInfo" }) as any as Schema.Schema<PageInfo>;

export interface TokenPagination {
  /** Tokens to pass to the standard list field 'page_token'. Whenever available, tokens are preferred over manipulating start_index. */
  nextPageToken?: string;
  previousPageToken?: string;
}

export const TokenPagination: Schema.Schema<TokenPagination> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  previousPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "TokenPagination" }) as any as Schema.Schema<TokenPagination>;

export interface InappproductsListResponse {
  /** The kind of this response ("androidpublisher#inappproductsListResponse"). */
  kind?: string;
  /** All in-app products. */
  inappproduct?: Array<InAppProduct>;
  /** Deprecated and unset. */
  pageInfo?: PageInfo;
  /** Pagination token, to handle a number of products that is over one page. */
  tokenPagination?: TokenPagination;
}

export const InappproductsListResponse: Schema.Schema<InappproductsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  inappproduct: Schema.optional(Schema.Array(InAppProduct)),
  pageInfo: Schema.optional(PageInfo),
  tokenPagination: Schema.optional(TokenPagination),
})).annotate({ identifier: "InappproductsListResponse" }) as any as Schema.Schema<InappproductsListResponse>;

export interface SubscriptionItemPriceChangeDetails {
  /** New recurring price for the subscription item. */
  newPrice?: Money;
  /** State the price change is currently in. */
  priceChangeState?: "PRICE_CHANGE_STATE_UNSPECIFIED" | "OUTSTANDING" | "CONFIRMED" | "APPLIED" | "CANCELED" | (string & {});
  /** Price change mode specifies how the subscription item price is changing. */
  priceChangeMode?: "PRICE_CHANGE_MODE_UNSPECIFIED" | "PRICE_DECREASE" | "PRICE_INCREASE" | "OPT_OUT_PRICE_INCREASE" | (string & {});
  /** The renewal time at which the price change will become effective for the user. This is subject to change(to a future time) due to cases where the renewal time shifts like pause. This field is only populated if the price change has not taken effect. */
  expectedNewPriceChargeTime?: string;
}

export const SubscriptionItemPriceChangeDetails: Schema.Schema<SubscriptionItemPriceChangeDetails> = Schema.suspend(() => Schema.Struct({
  newPrice: Schema.optional(Money),
  priceChangeState: Schema.optional(Schema.String),
  priceChangeMode: Schema.optional(Schema.String),
  expectedNewPriceChargeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionItemPriceChangeDetails" }) as any as Schema.Schema<SubscriptionItemPriceChangeDetails>;

export interface OneTimeProductDiscountedOffer {
  /** Optional. The number of times this offer can be redeemed. If unset or set to 0, allows for unlimited offer redemptions. Otherwise must be a number between 1 and 50 inclusive. */
  redemptionLimit?: string;
  /** Time when the offer will start being available. */
  startTime?: string;
  /** Time when the offer will stop being available. */
  endTime?: string;
}

export const OneTimeProductDiscountedOffer: Schema.Schema<OneTimeProductDiscountedOffer> = Schema.suspend(() => Schema.Struct({
  redemptionLimit: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeProductDiscountedOffer" }) as any as Schema.Schema<OneTimeProductDiscountedOffer>;

export interface OneTimeProductOfferNoPriceOverrideOptions {
}

export const OneTimeProductOfferNoPriceOverrideOptions: Schema.Schema<OneTimeProductOfferNoPriceOverrideOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OneTimeProductOfferNoPriceOverrideOptions" }) as any as Schema.Schema<OneTimeProductOfferNoPriceOverrideOptions>;

export interface OneTimeProductOfferRegionalPricingAndAvailabilityConfig {
  /** Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g., "US". */
  regionCode?: string;
  /** Required. The availability for this region. */
  availability?: "AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "NO_LONGER_AVAILABLE" | (string & {});
  /** The absolute value of the discount that is subtracted from the purchase option price. It should be between 0 and the purchase option price. */
  absoluteDiscount?: Money;
  /** The fraction of the purchase option price that the user pays for this offer. For example, if the purchase option price for this region is $12, then a 50% discount would correspond to a price of $6. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in this region. */
  relativeDiscount?: number;
  /** The price defined in the purchase option for this region will be used. */
  noOverride?: OneTimeProductOfferNoPriceOverrideOptions;
}

export const OneTimeProductOfferRegionalPricingAndAvailabilityConfig: Schema.Schema<OneTimeProductOfferRegionalPricingAndAvailabilityConfig> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  absoluteDiscount: Schema.optional(Money),
  relativeDiscount: Schema.optional(Schema.Number),
  noOverride: Schema.optional(OneTimeProductOfferNoPriceOverrideOptions),
})).annotate({ identifier: "OneTimeProductOfferRegionalPricingAndAvailabilityConfig" }) as any as Schema.Schema<OneTimeProductOfferRegionalPricingAndAvailabilityConfig>;

export interface OneTimeProductOffer {
  /** Optional. List of up to 20 custom tags specified for this offer, and returned to the app through the billing library. */
  offerTags?: Array<OfferTag>;
  /** Required. Immutable. The package name of the app the parent product belongs to. */
  packageName?: string;
  /** A discounted offer. */
  discountedOffer?: OneTimeProductDiscountedOffer;
  /** A pre-order offer. */
  preOrderOffer?: OneTimeProductPreOrderOffer;
  /** Required. Immutable. The ID of this product offer. Must be unique within the purchase option. It must start with a number or lower-case letter, and can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-). The maximum length is 63 characters. */
  offerId?: string;
  /** Set of regional pricing and availability information for this offer. Must not have duplicate entries with the same region_code. */
  regionalPricingAndAvailabilityConfigs?: Array<OneTimeProductOfferRegionalPricingAndAvailabilityConfig>;
  /** Required. Immutable. The ID of the purchase option to which this offer is an extension. */
  purchaseOptionId?: string;
  /** Output only. The version of the regions configuration that was used to generate the one-time product offer. */
  regionsVersion?: RegionsVersion;
  /** Output only. The current state of this offer. This field cannot be changed by updating the resource. Use the dedicated endpoints instead. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "CANCELLED" | "INACTIVE" | (string & {});
  /** Required. Immutable. The ID of the parent product this offer belongs to. */
  productId?: string;
}

export const OneTimeProductOffer: Schema.Schema<OneTimeProductOffer> = Schema.suspend(() => Schema.Struct({
  offerTags: Schema.optional(Schema.Array(OfferTag)),
  packageName: Schema.optional(Schema.String),
  discountedOffer: Schema.optional(OneTimeProductDiscountedOffer),
  preOrderOffer: Schema.optional(OneTimeProductPreOrderOffer),
  offerId: Schema.optional(Schema.String),
  regionalPricingAndAvailabilityConfigs: Schema.optional(Schema.Array(OneTimeProductOfferRegionalPricingAndAvailabilityConfig)),
  purchaseOptionId: Schema.optional(Schema.String),
  regionsVersion: Schema.optional(RegionsVersion),
  state: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeProductOffer" }) as any as Schema.Schema<OneTimeProductOffer>;

export interface UpdateOneTimeProductOfferRequest {
  /** Optional. The latency tolerance for the propagation of this offer update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Required. The one-time product offer to update. */
  oneTimeProductOffer?: OneTimeProductOffer;
  /** Required. The version of the available regions being used for the offer. */
  regionsVersion?: RegionsVersion;
  /** Optional. If set to true, and the offer with the given package_name, product_id, purchase_option_id and offer_id doesn't exist, an offer will be created. If a new offer is created, the update_mask is ignored. */
  allowMissing?: boolean;
}

export const UpdateOneTimeProductOfferRequest: Schema.Schema<UpdateOneTimeProductOfferRequest> = Schema.suspend(() => Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  oneTimeProductOffer: Schema.optional(OneTimeProductOffer),
  regionsVersion: Schema.optional(RegionsVersion),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UpdateOneTimeProductOfferRequest" }) as any as Schema.Schema<UpdateOneTimeProductOfferRequest>;

export interface PreorderDetails {
}

export const PreorderDetails: Schema.Schema<PreorderDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PreorderDetails" }) as any as Schema.Schema<PreorderDetails>;

export interface RentalDetails {
}

export const RentalDetails: Schema.Schema<RentalDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RentalDetails" }) as any as Schema.Schema<RentalDetails>;

export interface OneTimePurchaseDetails {
  /** The details of a pre-order purchase. Only set if it is a pre-order purchase. Note that this field will be set even after pre-order is fulfilled. */
  preorderDetails?: PreorderDetails;
  /** The offer ID of the one-time purchase offer. */
  offerId?: string;
  /** ID of the purchase option. This field is set for both purchase options and variant offers. For purchase options, this ID identifies the purchase option itself. For variant offers, this ID refers to the associated purchase option, and in conjunction with offer_id it identifies the variant offer. */
  purchaseOptionId?: string;
  /** The number of items purchased (for multi-quantity item purchases). */
  quantity?: number;
  /** The details of a rent purchase. Only set if it is a rent purchase. */
  rentalDetails?: RentalDetails;
}

export const OneTimePurchaseDetails: Schema.Schema<OneTimePurchaseDetails> = Schema.suspend(() => Schema.Struct({
  preorderDetails: Schema.optional(PreorderDetails),
  offerId: Schema.optional(Schema.String),
  purchaseOptionId: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.Number),
  rentalDetails: Schema.optional(RentalDetails),
})).annotate({ identifier: "OneTimePurchaseDetails" }) as any as Schema.Schema<OneTimePurchaseDetails>;

export interface PaidAppDetails {
}

export const PaidAppDetails: Schema.Schema<PaidAppDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PaidAppDetails" }) as any as Schema.Schema<PaidAppDetails>;

export interface SubscriptionDetails {
  /** The base plan ID of the subscription. */
  basePlanId?: string;
  /** The start of the billing period funded by this order. This is a snapshot of the billing/service period start time at the moment the order was processed, and should be used only for accounting. */
  servicePeriodStartTime?: string;
  /** The offer ID for the current subscription offer. */
  offerId?: string;
  /** The pricing phase for the billing period funded by this order. Deprecated. Use offer_phase_details instead. */
  offerPhase?: "OFFER_PHASE_UNSPECIFIED" | "BASE" | "INTRODUCTORY" | "FREE_TRIAL" | (string & {});
  /** The pricing phase details for the entitlement period funded by this order. */
  offerPhaseDetails?: OfferPhaseDetails;
  /** The end of the billing period funded by this order. This is a snapshot of the billing/service period end time at the moment the order was processed, and should be used only for accounting. To get the current end time of the subscription service period, use purchases.subscriptionsv2.get. */
  servicePeriodEndTime?: string;
}

export const SubscriptionDetails: Schema.Schema<SubscriptionDetails> = Schema.suspend(() => Schema.Struct({
  basePlanId: Schema.optional(Schema.String),
  servicePeriodStartTime: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  offerPhase: Schema.optional(Schema.String),
  offerPhaseDetails: Schema.optional(OfferPhaseDetails),
  servicePeriodEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionDetails" }) as any as Schema.Schema<SubscriptionDetails>;

export interface LineItem {
  /** Details of a one-time purchase. */
  oneTimePurchaseDetails?: OneTimePurchaseDetails;
  /** Details of a paid app purchase. */
  paidAppDetails?: PaidAppDetails;
  /** The tax paid for this line item. */
  tax?: Money;
  /** Developer-specified name of the product. Displayed in buyer's locale. Example: coins, monthly subscription, etc. */
  productTitle?: string;
  /** The purchased product ID or in-app SKU (for example, 'monthly001' or 'com.some.thing.inapp1'). */
  productId?: string;
  /** The total amount paid by the user for this line item, taking into account discounts and tax. */
  total?: Money;
  /** Details of a subscription purchase. */
  subscriptionDetails?: SubscriptionDetails;
  /** Item's listed price on Play Store, this may or may not include tax. Excludes Google-funded discounts only. */
  listingPrice?: Money;
}

export const LineItem: Schema.Schema<LineItem> = Schema.suspend(() => Schema.Struct({
  oneTimePurchaseDetails: Schema.optional(OneTimePurchaseDetails),
  paidAppDetails: Schema.optional(PaidAppDetails),
  tax: Schema.optional(Money),
  productTitle: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  total: Schema.optional(Money),
  subscriptionDetails: Schema.optional(SubscriptionDetails),
  listingPrice: Schema.optional(Money),
})).annotate({ identifier: "LineItem" }) as any as Schema.Schema<LineItem>;

export interface ProcessedEvent {
  /** The time when the order was processed. */
  eventTime?: string;
}

export const ProcessedEvent: Schema.Schema<ProcessedEvent> = Schema.suspend(() => Schema.Struct({
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ProcessedEvent" }) as any as Schema.Schema<ProcessedEvent>;

export interface CancellationEvent {
  /** The time when the order was canceled. */
  eventTime?: string;
}

export const CancellationEvent: Schema.Schema<CancellationEvent> = Schema.suspend(() => Schema.Struct({
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CancellationEvent" }) as any as Schema.Schema<CancellationEvent>;

export interface RefundEvent {
  /** Details for the full refund. */
  refundDetails?: RefundDetails;
  /** The time when the order was fully refunded. */
  eventTime?: string;
  /** The reason the order was refunded. */
  refundReason?: "REFUND_REASON_UNSPECIFIED" | "OTHER" | "CHARGEBACK" | (string & {});
}

export const RefundEvent: Schema.Schema<RefundEvent> = Schema.suspend(() => Schema.Struct({
  refundDetails: Schema.optional(RefundDetails),
  eventTime: Schema.optional(Schema.String),
  refundReason: Schema.optional(Schema.String),
})).annotate({ identifier: "RefundEvent" }) as any as Schema.Schema<RefundEvent>;

export interface OrderHistory {
  /** Details of when the order was processed. */
  processedEvent?: ProcessedEvent;
  /** Details of the partial refund events for this order. */
  partialRefundEvents?: Array<PartialRefundEvent>;
  /** Details of when the order was canceled. */
  cancellationEvent?: CancellationEvent;
  /** Details of when the order was fully refunded. */
  refundEvent?: RefundEvent;
}

export const OrderHistory: Schema.Schema<OrderHistory> = Schema.suspend(() => Schema.Struct({
  processedEvent: Schema.optional(ProcessedEvent),
  partialRefundEvents: Schema.optional(Schema.Array(PartialRefundEvent)),
  cancellationEvent: Schema.optional(CancellationEvent),
  refundEvent: Schema.optional(RefundEvent),
})).annotate({ identifier: "OrderHistory" }) as any as Schema.Schema<OrderHistory>;

export interface Order {
  /** The token provided to the user's device when the subscription or item was purchased. */
  purchaseToken?: string;
  /** The originating sales channel of the order. */
  salesChannel?: "SALES_CHANNEL_UNSPECIFIED" | "IN_APP" | "PC_EMULATOR" | "NATIVE_PC" | "PLAY_STORE" | "OUTSIDE_PLAY_STORE" | (string & {});
  /** The individual line items making up this order. */
  lineItems?: Array<LineItem>;
  /** Play points applied to the order, including offer information, discount rate and point values. */
  pointsDetails?: PointsDetails;
  /** The time when the order was created. */
  createTime?: string;
  /** Detailed information about the order at creation time. */
  orderDetails?: OrderDetails;
  /** The final amount paid by the customer, taking into account discounts and taxes. */
  total?: Money;
  /** Details about events which modified the order. */
  orderHistory?: OrderHistory;
  /** Your revenue for this order in the buyer's currency, including deductions of partial refunds, taxes and fees. Google deducts standard transaction and third party fees from each sale, including VAT in some regions. */
  developerRevenueInBuyerCurrency?: Money;
  /** The state of the order. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "PROCESSED" | "CANCELED" | "PENDING_REFUND" | "PARTIALLY_REFUNDED" | "REFUNDED" | (string & {});
  /** The time of the last event that occurred on the order. */
  lastEventTime?: string;
  /** The total tax paid as a part of this order. */
  tax?: Money;
  /** Address information for the customer, for use in tax computation. When Google is the Merchant of Record for the order, only country is shown. */
  buyerAddress?: BuyerAddress;
  /** The order ID. */
  orderId?: string;
}

export const Order: Schema.Schema<Order> = Schema.suspend(() => Schema.Struct({
  purchaseToken: Schema.optional(Schema.String),
  salesChannel: Schema.optional(Schema.String),
  lineItems: Schema.optional(Schema.Array(LineItem)),
  pointsDetails: Schema.optional(PointsDetails),
  createTime: Schema.optional(Schema.String),
  orderDetails: Schema.optional(OrderDetails),
  total: Schema.optional(Money),
  orderHistory: Schema.optional(OrderHistory),
  developerRevenueInBuyerCurrency: Schema.optional(Money),
  state: Schema.optional(Schema.String),
  lastEventTime: Schema.optional(Schema.String),
  tax: Schema.optional(Money),
  buyerAddress: Schema.optional(BuyerAddress),
  orderId: Schema.optional(Schema.String),
})).annotate({ identifier: "Order" }) as any as Schema.Schema<Order>;

export interface AbiTargeting {
  /** Targeting of other sibling directories that were in the Bundle. For main splits this is targeting of other main splits. */
  alternatives?: Array<Abi>;
  /** Value of an abi. */
  value?: Array<Abi>;
}

export const AbiTargeting: Schema.Schema<AbiTargeting> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(Abi)),
  value: Schema.optional(Schema.Array(Abi)),
})).annotate({ identifier: "AbiTargeting" }) as any as Schema.Schema<AbiTargeting>;

export interface DeviceSpec {
  /** Screen dpi. */
  screenDensity?: number;
  /** Supported ABI architectures in the order of preference. The values should be the string as reported by the platform, e.g. "armeabi-v7a", "x86_64". */
  supportedAbis?: Array<string>;
  /** All installed locales represented as BCP-47 strings, e.g. "en-US". */
  supportedLocales?: Array<string>;
}

export const DeviceSpec: Schema.Schema<DeviceSpec> = Schema.suspend(() => Schema.Struct({
  screenDensity: Schema.optional(Schema.Number),
  supportedAbis: Schema.optional(Schema.Array(Schema.String)),
  supportedLocales: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeviceSpec" }) as any as Schema.Schema<DeviceSpec>;

export interface CancelSurveyResult {
  /** Only set for CANCEL_SURVEY_REASON_OTHERS. This is the user's freeform response to the survey. */
  reasonUserInput?: string;
  /** The reason the user selected in the cancel survey. */
  reason?: "CANCEL_SURVEY_REASON_UNSPECIFIED" | "CANCEL_SURVEY_REASON_NOT_ENOUGH_USAGE" | "CANCEL_SURVEY_REASON_TECHNICAL_ISSUES" | "CANCEL_SURVEY_REASON_COST_RELATED" | "CANCEL_SURVEY_REASON_FOUND_BETTER_APP" | "CANCEL_SURVEY_REASON_OTHERS" | (string & {});
}

export const CancelSurveyResult: Schema.Schema<CancelSurveyResult> = Schema.suspend(() => Schema.Struct({
  reasonUserInput: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "CancelSurveyResult" }) as any as Schema.Schema<CancelSurveyResult>;

export interface UserInitiatedCancellation {
  /** Information provided by the user when they complete the subscription cancellation flow (cancellation reason survey). */
  cancelSurveyResult?: CancelSurveyResult;
  /** The time at which the subscription was canceled by the user. The user might still have access to the subscription after this time. Use line_items.expiry_time to determine if a user still has access. */
  cancelTime?: string;
}

export const UserInitiatedCancellation: Schema.Schema<UserInitiatedCancellation> = Schema.suspend(() => Schema.Struct({
  cancelSurveyResult: Schema.optional(CancelSurveyResult),
  cancelTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UserInitiatedCancellation" }) as any as Schema.Schema<UserInitiatedCancellation>;

export interface DeferredItemRemoval {
}

export const DeferredItemRemoval: Schema.Schema<DeferredItemRemoval> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeferredItemRemoval" }) as any as Schema.Schema<DeferredItemRemoval>;

export interface DeferredItemReplacement {
  /** The product_id going to replace the existing product_id. */
  productId?: string;
}

export const DeferredItemReplacement: Schema.Schema<DeferredItemReplacement> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeferredItemReplacement" }) as any as Schema.Schema<DeferredItemReplacement>;

export interface OfferDetails {
  /** The base plan ID. Present for all base plan and offers. */
  basePlanId?: string;
  /** The offer ID. Only present for discounted offers. */
  offerId?: string;
  /** The latest offer tags associated with the offer. It includes tags inherited from the base plan. */
  offerTags?: Array<string>;
}

export const OfferDetails: Schema.Schema<OfferDetails> = Schema.suspend(() => Schema.Struct({
  basePlanId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  offerTags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OfferDetails" }) as any as Schema.Schema<OfferDetails>;

export interface PriceStepUpConsentDetails {
  /** Output only. The state of the price step-up consent. */
  state?: "CONSENT_STATE_UNSPECIFIED" | "PENDING" | "CONFIRMED" | "COMPLETED" | (string & {});
  /** The deadline by which the user must provide consent. If consent is not provided by this time, the subscription will be canceled. */
  consentDeadlineTime?: string;
  /** The new price which requires user consent. */
  newPrice?: Money;
}

export const PriceStepUpConsentDetails: Schema.Schema<PriceStepUpConsentDetails> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  consentDeadlineTime: Schema.optional(Schema.String),
  newPrice: Schema.optional(Money),
})).annotate({ identifier: "PriceStepUpConsentDetails" }) as any as Schema.Schema<PriceStepUpConsentDetails>;

export interface PendingCancellation {
}

export const PendingCancellation: Schema.Schema<PendingCancellation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PendingCancellation" }) as any as Schema.Schema<PendingCancellation>;

export interface InstallmentPlan {
  /** Total number of payments the user will be committed for after each commitment period. Empty means the installment plan will fall back to a normal auto-renew subscription after initial commitment. */
  subsequentCommittedPaymentsCount?: number;
  /** Total number of payments the user is initially committed for. */
  initialCommittedPaymentsCount?: number;
  /** If present, this installment plan is pending to be canceled. The cancellation will happen only after the user finished all committed payments. */
  pendingCancellation?: PendingCancellation;
  /** Total number of committed payments remaining to be paid for in this renewal cycle. */
  remainingCommittedPaymentsCount?: number;
}

export const InstallmentPlan: Schema.Schema<InstallmentPlan> = Schema.suspend(() => Schema.Struct({
  subsequentCommittedPaymentsCount: Schema.optional(Schema.Number),
  initialCommittedPaymentsCount: Schema.optional(Schema.Number),
  pendingCancellation: Schema.optional(PendingCancellation),
  remainingCommittedPaymentsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "InstallmentPlan" }) as any as Schema.Schema<InstallmentPlan>;

export interface AutoRenewingPlan {
  /** If the subscription is currently set to auto-renew, e.g. the user has not canceled the subscription */
  autoRenewEnabled?: boolean;
  /** The current recurring price of the auto renewing plan. Note that the price does not take into account discounts and does not include taxes for tax-exclusive pricing, please call orders.get API instead if transaction details are needed. */
  recurringPrice?: Money;
  /** The information of the latest price step-up consent. */
  priceStepUpConsentDetails?: PriceStepUpConsentDetails;
  /** The information of the last price change for the item since subscription signup. */
  priceChangeDetails?: SubscriptionItemPriceChangeDetails;
  /** The installment plan commitment and state related info for the auto renewing plan. */
  installmentDetails?: InstallmentPlan;
}

export const AutoRenewingPlan: Schema.Schema<AutoRenewingPlan> = Schema.suspend(() => Schema.Struct({
  autoRenewEnabled: Schema.optional(Schema.Boolean),
  recurringPrice: Schema.optional(Money),
  priceStepUpConsentDetails: Schema.optional(PriceStepUpConsentDetails),
  priceChangeDetails: Schema.optional(SubscriptionItemPriceChangeDetails),
  installmentDetails: Schema.optional(InstallmentPlan),
})).annotate({ identifier: "AutoRenewingPlan" }) as any as Schema.Schema<AutoRenewingPlan>;

export interface ItemReplacement {
  /** The replacement mode applied during the purchase. */
  replacementMode?: "REPLACEMENT_MODE_UNSPECIFIED" | "WITH_TIME_PRORATION" | "CHARGE_PRORATED_PRICE" | "WITHOUT_PRORATION" | "CHARGE_FULL_PRICE" | "DEFERRED" | "KEEP_EXISTING" | (string & {});
  /** The product ID of the subscription line item being replaced. */
  productId?: string;
  /** The offer ID of the subscription line item being replaced, if applicable. */
  offerId?: string;
  /** The base plan ID of the subscription line item being replaced. */
  basePlanId?: string;
}

export const ItemReplacement: Schema.Schema<ItemReplacement> = Schema.suspend(() => Schema.Struct({
  replacementMode: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  basePlanId: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemReplacement" }) as any as Schema.Schema<ItemReplacement>;

export interface VanityCode {
  /** The promotion code. */
  promotionCode?: string;
}

export const VanityCode: Schema.Schema<VanityCode> = Schema.suspend(() => Schema.Struct({
  promotionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "VanityCode" }) as any as Schema.Schema<VanityCode>;

export interface SignupPromotion {
  /** A one-time code was applied. */
  oneTimeCode?: OneTimeCode;
  /** A vanity code was applied. */
  vanityCode?: VanityCode;
}

export const SignupPromotion: Schema.Schema<SignupPromotion> = Schema.suspend(() => Schema.Struct({
  oneTimeCode: Schema.optional(OneTimeCode),
  vanityCode: Schema.optional(VanityCode),
})).annotate({ identifier: "SignupPromotion" }) as any as Schema.Schema<SignupPromotion>;

export interface SubscriptionPurchaseLineItem {
  /** Information for deferred item removal. */
  deferredItemRemoval?: DeferredItemRemoval;
  /** Information for deferred item replacement. */
  deferredItemReplacement?: DeferredItemReplacement;
  /** The offer details for this item. */
  offerDetails?: OfferDetails;
  /** The item is auto renewing. */
  autoRenewingPlan?: AutoRenewingPlan;
  /** The order id of the latest successful order associated with this item. Not present if the item is not owned by the user yet (e.g. the item being deferred replaced to). */
  latestSuccessfulOrderId?: string;
  /** Current offer phase details for this item. */
  offerPhase?: OfferPhase;
  /** The purchased product ID (for example, 'monthly001'). */
  productId?: string;
  /** The item is prepaid. */
  prepaidPlan?: PrepaidPlan;
  /** Details of the item being replaced. This field is only populated if this item replaced another item in a previous subscription and is only available for 60 days after the purchase time. */
  itemReplacement?: ItemReplacement;
  /** Time at which the subscription expired or will expire unless the access is extended (ex. renews). */
  expiryTime?: string;
  /** Promotion details about this item. Only set if a promotion was applied during signup. */
  signupPromotion?: SignupPromotion;
}

export const SubscriptionPurchaseLineItem: Schema.Schema<SubscriptionPurchaseLineItem> = Schema.suspend(() => Schema.Struct({
  deferredItemRemoval: Schema.optional(DeferredItemRemoval),
  deferredItemReplacement: Schema.optional(DeferredItemReplacement),
  offerDetails: Schema.optional(OfferDetails),
  autoRenewingPlan: Schema.optional(AutoRenewingPlan),
  latestSuccessfulOrderId: Schema.optional(Schema.String),
  offerPhase: Schema.optional(OfferPhase),
  productId: Schema.optional(Schema.String),
  prepaidPlan: Schema.optional(PrepaidPlan),
  itemReplacement: Schema.optional(ItemReplacement),
  expiryTime: Schema.optional(Schema.String),
  signupPromotion: Schema.optional(SignupPromotion),
})).annotate({ identifier: "SubscriptionPurchaseLineItem" }) as any as Schema.Schema<SubscriptionPurchaseLineItem>;

export interface RentOfferDetails {
}

export const RentOfferDetails: Schema.Schema<RentOfferDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RentOfferDetails" }) as any as Schema.Schema<RentOfferDetails>;

export interface PreorderOfferDetails {
  /** The time when a preordered item is released for a preorder purchase. */
  preorderReleaseTime?: string;
}

export const PreorderOfferDetails: Schema.Schema<PreorderOfferDetails> = Schema.suspend(() => Schema.Struct({
  preorderReleaseTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PreorderOfferDetails" }) as any as Schema.Schema<PreorderOfferDetails>;

export interface ProductOfferDetails {
  /** The offer ID. Only present for offers. */
  offerId?: string;
  /** Output only. The consumption state of the purchase. */
  consumptionState?: "CONSUMPTION_STATE_UNSPECIFIED" | "CONSUMPTION_STATE_YET_TO_BE_CONSUMED" | "CONSUMPTION_STATE_CONSUMED" | (string & {});
  /** Offer details about rent offers. This will only be set for rental line items. */
  rentOfferDetails?: RentOfferDetails;
  /** Offer details for a preorder offer. This will only be set for preorders. */
  preorderOfferDetails?: PreorderOfferDetails;
  /** The latest offer tags associated with the offer. It includes tags inherited from the purchase option. */
  offerTags?: Array<string>;
  /** The per-transaction offer token used to make this purchase line item. */
  offerToken?: string;
  /** The quantity eligible for refund, i.e. quantity that hasn't been refunded. The value reflects quantity-based partial refunds and full refunds. */
  refundableQuantity?: number;
  /** The quantity associated with the purchase of the inapp product. */
  quantity?: number;
  /** The purchase option ID. */
  purchaseOptionId?: string;
}

export const ProductOfferDetails: Schema.Schema<ProductOfferDetails> = Schema.suspend(() => Schema.Struct({
  offerId: Schema.optional(Schema.String),
  consumptionState: Schema.optional(Schema.String),
  rentOfferDetails: Schema.optional(RentOfferDetails),
  preorderOfferDetails: Schema.optional(PreorderOfferDetails),
  offerTags: Schema.optional(Schema.Array(Schema.String)),
  offerToken: Schema.optional(Schema.String),
  refundableQuantity: Schema.optional(Schema.Number),
  quantity: Schema.optional(Schema.Number),
  purchaseOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductOfferDetails" }) as any as Schema.Schema<ProductOfferDetails>;

export interface ProductLineItem {
  /** The purchased product ID (for example, 'monthly001'). */
  productId?: string;
  /** The offer details for this item. */
  productOfferDetails?: ProductOfferDetails;
}

export const ProductLineItem: Schema.Schema<ProductLineItem> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  productOfferDetails: Schema.optional(ProductOfferDetails),
})).annotate({ identifier: "ProductLineItem" }) as any as Schema.Schema<ProductLineItem>;

export interface PurchaseStateContext {
  /** Output only. The purchase state of the purchase. */
  purchaseState?: "PURCHASE_STATE_UNSPECIFIED" | "PURCHASED" | "CANCELLED" | "PENDING" | (string & {});
}

export const PurchaseStateContext: Schema.Schema<PurchaseStateContext> = Schema.suspend(() => Schema.Struct({
  purchaseState: Schema.optional(Schema.String),
})).annotate({ identifier: "PurchaseStateContext" }) as any as Schema.Schema<PurchaseStateContext>;

export interface TestPurchaseContext {
  /** The fop type of the test purchase. */
  fopType?: "FOP_TYPE_UNSPECIFIED" | "TEST" | (string & {});
}

export const TestPurchaseContext: Schema.Schema<TestPurchaseContext> = Schema.suspend(() => Schema.Struct({
  fopType: Schema.optional(Schema.String),
})).annotate({ identifier: "TestPurchaseContext" }) as any as Schema.Schema<TestPurchaseContext>;

export interface ProductPurchaseV2 {
  /** An obfuscated version of the id that is uniquely associated with the user's account in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid when the purchase was made. */
  obfuscatedExternalAccountId?: string;
  /** Contains item-level info for a ProductPurchaseV2. */
  productLineItem?: Array<ProductLineItem>;
  /** Information about the purchase state of the purchase. */
  purchaseStateContext?: PurchaseStateContext;
  /** The order id associated with the purchase of the inapp product. May not be set if there is no order associated with the purchase. */
  orderId?: string;
  /** ISO 3166-1 alpha-2 billing region code of the user at the time the product was granted. */
  regionCode?: string;
  /** Information related to test purchases. This will only be set for test purchases. */
  testPurchaseContext?: TestPurchaseContext;
  /** The time when the purchase was successful, i.e., when the PurchaseState has changed to PURCHASED. This field will not be present until the payment is complete. For example, if the user initiated a pending transaction (https://developer.android.com/google/play/billing/integrate#pending), this field will not be populated until the user successfully completes the steps required to complete the transaction. */
  purchaseCompletionTime?: string;
  /** Output only. The acknowledgement state of the purchase. */
  acknowledgementState?: "ACKNOWLEDGEMENT_STATE_UNSPECIFIED" | "ACKNOWLEDGEMENT_STATE_PENDING" | "ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED" | (string & {});
  /** An obfuscated version of the id that is uniquely associated with the user's profile in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid when the purchase was made. */
  obfuscatedExternalProfileId?: string;
  /** This kind represents a ProductPurchaseV2 object in the androidpublisher service. */
  kind?: string;
}

export const ProductPurchaseV2: Schema.Schema<ProductPurchaseV2> = Schema.suspend(() => Schema.Struct({
  obfuscatedExternalAccountId: Schema.optional(Schema.String),
  productLineItem: Schema.optional(Schema.Array(ProductLineItem)),
  purchaseStateContext: Schema.optional(PurchaseStateContext),
  orderId: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  testPurchaseContext: Schema.optional(TestPurchaseContext),
  purchaseCompletionTime: Schema.optional(Schema.String),
  acknowledgementState: Schema.optional(Schema.String),
  obfuscatedExternalProfileId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductPurchaseV2" }) as any as Schema.Schema<ProductPurchaseV2>;

export interface RevocationContextProratedRefund {
}

export const RevocationContextProratedRefund: Schema.Schema<RevocationContextProratedRefund> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RevocationContextProratedRefund" }) as any as Schema.Schema<RevocationContextProratedRefund>;

export interface RevocationContextFullRefund {
}

export const RevocationContextFullRefund: Schema.Schema<RevocationContextFullRefund> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RevocationContextFullRefund" }) as any as Schema.Schema<RevocationContextFullRefund>;

export interface RevocationContextItemBasedRefund {
  /** Required. If the subscription is a subscription with add-ons, the product id of the subscription item to revoke. */
  productId?: string;
}

export const RevocationContextItemBasedRefund: Schema.Schema<RevocationContextItemBasedRefund> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "RevocationContextItemBasedRefund" }) as any as Schema.Schema<RevocationContextItemBasedRefund>;

export interface RevocationContext {
  /** Optional. Used when users should be refunded a prorated amount they paid for their subscription based on the amount of time remaining in a subscription. */
  proratedRefund?: RevocationContextProratedRefund;
  /** Optional. Used when users should be refunded the full amount of latest charge on each item in the subscription. */
  fullRefund?: RevocationContextFullRefund;
  /** Optional. Used when a specific item should be refunded in a subscription with add-on items. */
  itemBasedRefund?: RevocationContextItemBasedRefund;
}

export const RevocationContext: Schema.Schema<RevocationContext> = Schema.suspend(() => Schema.Struct({
  proratedRefund: Schema.optional(RevocationContextProratedRefund),
  fullRefund: Schema.optional(RevocationContextFullRefund),
  itemBasedRefund: Schema.optional(RevocationContextItemBasedRefund),
})).annotate({ identifier: "RevocationContext" }) as any as Schema.Schema<RevocationContext>;

export interface TextureCompressionFormat {
  /** Alias for texture compression format. */
  alias?: "UNSPECIFIED_TEXTURE_COMPRESSION_FORMAT" | "ETC1_RGB8" | "PALETTED" | "THREE_DC" | "ATC" | "LATC" | "DXT1" | "S3TC" | "PVRTC" | "ASTC" | "ETC2" | (string & {});
}

export const TextureCompressionFormat: Schema.Schema<TextureCompressionFormat> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
})).annotate({ identifier: "TextureCompressionFormat" }) as any as Schema.Schema<TextureCompressionFormat>;

export interface ProductPurchasesAcknowledgeRequest {
  /** Payload to attach to the purchase. */
  developerPayload?: string;
}

export const ProductPurchasesAcknowledgeRequest: Schema.Schema<ProductPurchasesAcknowledgeRequest> = Schema.suspend(() => Schema.Struct({
  developerPayload: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductPurchasesAcknowledgeRequest" }) as any as Schema.Schema<ProductPurchasesAcknowledgeRequest>;

export interface AssetModuleMetadata {
  /** Module name. */
  name?: string;
  /** Indicates the delivery type for persistent install. */
  deliveryType?: "UNKNOWN_DELIVERY_TYPE" | "INSTALL_TIME" | "ON_DEMAND" | "FAST_FOLLOW" | (string & {});
}

export const AssetModuleMetadata: Schema.Schema<AssetModuleMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  deliveryType: Schema.optional(Schema.String),
})).annotate({ identifier: "AssetModuleMetadata" }) as any as Schema.Schema<AssetModuleMetadata>;

export interface StandaloneApkMetadata {
  /** Names of the modules fused in this standalone APK. */
  fusedModuleName?: Array<string>;
}

export const StandaloneApkMetadata: Schema.Schema<StandaloneApkMetadata> = Schema.suspend(() => Schema.Struct({
  fusedModuleName: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StandaloneApkMetadata" }) as any as Schema.Schema<StandaloneApkMetadata>;

export interface SplitApkMetadata {
  /** Indicates whether this APK is the main split of the module. */
  isMasterSplit?: boolean;
  /** Id of the split. */
  splitId?: string;
}

export const SplitApkMetadata: Schema.Schema<SplitApkMetadata> = Schema.suspend(() => Schema.Struct({
  isMasterSplit: Schema.optional(Schema.Boolean),
  splitId: Schema.optional(Schema.String),
})).annotate({ identifier: "SplitApkMetadata" }) as any as Schema.Schema<SplitApkMetadata>;

export interface LanguageTargeting {
  /** ISO-639: 2 or 3 letter language code. */
  value?: Array<string>;
  /** Alternative languages. */
  alternatives?: Array<string>;
}

export const LanguageTargeting: Schema.Schema<LanguageTargeting> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.String)),
  alternatives: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LanguageTargeting" }) as any as Schema.Schema<LanguageTargeting>;

export interface SdkVersion {
  /** Inclusive minimum value of an sdk version. */
  min?: number;
}

export const SdkVersion: Schema.Schema<SdkVersion> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
})).annotate({ identifier: "SdkVersion" }) as any as Schema.Schema<SdkVersion>;

export interface SdkVersionTargeting {
  /** Targeting of other sibling directories that were in the Bundle. For main splits this is targeting of other main splits. */
  alternatives?: Array<SdkVersion>;
  /** Value of an sdk version. */
  value?: Array<SdkVersion>;
}

export const SdkVersionTargeting: Schema.Schema<SdkVersionTargeting> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(SdkVersion)),
  value: Schema.optional(Schema.Array(SdkVersion)),
})).annotate({ identifier: "SdkVersionTargeting" }) as any as Schema.Schema<SdkVersionTargeting>;

export interface TextureCompressionFormatTargeting {
  /** The list of targeted TCFs. Should not be empty. */
  value?: Array<TextureCompressionFormat>;
  /** List of alternative TCFs (TCFs targeted by the sibling splits). */
  alternatives?: Array<TextureCompressionFormat>;
}

export const TextureCompressionFormatTargeting: Schema.Schema<TextureCompressionFormatTargeting> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Array(TextureCompressionFormat)),
  alternatives: Schema.optional(Schema.Array(TextureCompressionFormat)),
})).annotate({ identifier: "TextureCompressionFormatTargeting" }) as any as Schema.Schema<TextureCompressionFormatTargeting>;

export interface ApkTargeting {
  /** The abi that the apk targets */
  abiTargeting?: AbiTargeting;
  /** The language that the apk targets */
  languageTargeting?: LanguageTargeting;
  /** The sdk version that the apk targets */
  sdkVersionTargeting?: SdkVersionTargeting;
  /** Texture-compression-format-level targeting */
  textureCompressionFormatTargeting?: TextureCompressionFormatTargeting;
  /** The screen density that this apk supports. */
  screenDensityTargeting?: ScreenDensityTargeting;
  /** Multi-api-level targeting. */
  multiAbiTargeting?: MultiAbiTargeting;
}

export const ApkTargeting: Schema.Schema<ApkTargeting> = Schema.suspend(() => Schema.Struct({
  abiTargeting: Schema.optional(AbiTargeting),
  languageTargeting: Schema.optional(LanguageTargeting),
  sdkVersionTargeting: Schema.optional(SdkVersionTargeting),
  textureCompressionFormatTargeting: Schema.optional(TextureCompressionFormatTargeting),
  screenDensityTargeting: Schema.optional(ScreenDensityTargeting),
  multiAbiTargeting: Schema.optional(MultiAbiTargeting),
})).annotate({ identifier: "ApkTargeting" }) as any as Schema.Schema<ApkTargeting>;

export interface ApkDescription {
  /** Path of the Apk, will be in the following format: .apk where DownloadId is the ID used to download the apk using GeneratedApks.Download API. */
  path?: string;
  /** Set only for standalone APKs. */
  standaloneApkMetadata?: StandaloneApkMetadata;
  /** Set only for Instant split APKs. */
  instantApkMetadata?: SplitApkMetadata;
  /** Apk-level targeting. */
  targeting?: ApkTargeting;
  /** Set only for Split APKs. */
  splitApkMetadata?: SplitApkMetadata;
  /** Set only for asset slices. */
  assetSliceMetadata?: SplitApkMetadata;
}

export const ApkDescription: Schema.Schema<ApkDescription> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  standaloneApkMetadata: Schema.optional(StandaloneApkMetadata),
  instantApkMetadata: Schema.optional(SplitApkMetadata),
  targeting: Schema.optional(ApkTargeting),
  splitApkMetadata: Schema.optional(SplitApkMetadata),
  assetSliceMetadata: Schema.optional(SplitApkMetadata),
})).annotate({ identifier: "ApkDescription" }) as any as Schema.Schema<ApkDescription>;

export interface AssetSliceSet {
  /** Module level metadata. */
  assetModuleMetadata?: AssetModuleMetadata;
  /** Asset slices. */
  apkDescription?: Array<ApkDescription>;
}

export const AssetSliceSet: Schema.Schema<AssetSliceSet> = Schema.suspend(() => Schema.Struct({
  assetModuleMetadata: Schema.optional(AssetModuleMetadata),
  apkDescription: Schema.optional(Schema.Array(ApkDescription)),
})).annotate({ identifier: "AssetSliceSet" }) as any as Schema.Schema<AssetSliceSet>;

export interface VariantTargeting {
  /** Multi-api-level targeting */
  multiAbiTargeting?: MultiAbiTargeting;
  /** The screen densities that this variant supports */
  screenDensityTargeting?: ScreenDensityTargeting;
  /** Texture-compression-format-level targeting */
  textureCompressionFormatTargeting?: TextureCompressionFormatTargeting;
  /** The sdk version that the variant targets */
  sdkVersionTargeting?: SdkVersionTargeting;
  /** The abi that the variant targets */
  abiTargeting?: AbiTargeting;
}

export const VariantTargeting: Schema.Schema<VariantTargeting> = Schema.suspend(() => Schema.Struct({
  multiAbiTargeting: Schema.optional(MultiAbiTargeting),
  screenDensityTargeting: Schema.optional(ScreenDensityTargeting),
  textureCompressionFormatTargeting: Schema.optional(TextureCompressionFormatTargeting),
  sdkVersionTargeting: Schema.optional(SdkVersionTargeting),
  abiTargeting: Schema.optional(AbiTargeting),
})).annotate({ identifier: "VariantTargeting" }) as any as Schema.Schema<VariantTargeting>;

export interface UserCountriesTargeting {
  /** List of country codes in the two-letter CLDR territory format. */
  countryCodes?: Array<string>;
  /** Indicates if the list above is exclusive. */
  exclude?: boolean;
}

export const UserCountriesTargeting: Schema.Schema<UserCountriesTargeting> = Schema.suspend(() => Schema.Struct({
  countryCodes: Schema.optional(Schema.Array(Schema.String)),
  exclude: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UserCountriesTargeting" }) as any as Schema.Schema<UserCountriesTargeting>;

export interface ModuleTargeting {
  /** Countries-level targeting */
  userCountriesTargeting?: UserCountriesTargeting;
  /** The sdk version that the variant targets */
  sdkVersionTargeting?: SdkVersionTargeting;
  /** Targeting for device features. */
  deviceFeatureTargeting?: Array<DeviceFeatureTargeting>;
}

export const ModuleTargeting: Schema.Schema<ModuleTargeting> = Schema.suspend(() => Schema.Struct({
  userCountriesTargeting: Schema.optional(UserCountriesTargeting),
  sdkVersionTargeting: Schema.optional(SdkVersionTargeting),
  deviceFeatureTargeting: Schema.optional(Schema.Array(DeviceFeatureTargeting)),
})).annotate({ identifier: "ModuleTargeting" }) as any as Schema.Schema<ModuleTargeting>;

export interface ModuleMetadata {
  /** Indicates the delivery type (e.g. on-demand) of the module. */
  deliveryType?: "UNKNOWN_DELIVERY_TYPE" | "INSTALL_TIME" | "ON_DEMAND" | "FAST_FOLLOW" | (string & {});
  /** Indicates the type of this feature module. */
  moduleType?: "UNKNOWN_MODULE_TYPE" | "FEATURE_MODULE" | (string & {});
  /** Names of the modules that this module directly depends on. Each module implicitly depends on the base module. */
  dependencies?: Array<string>;
  /** The targeting that makes a conditional module installed. Relevant only for Split APKs. */
  targeting?: ModuleTargeting;
  /** Module name. */
  name?: string;
}

export const ModuleMetadata: Schema.Schema<ModuleMetadata> = Schema.suspend(() => Schema.Struct({
  deliveryType: Schema.optional(Schema.String),
  moduleType: Schema.optional(Schema.String),
  dependencies: Schema.optional(Schema.Array(Schema.String)),
  targeting: Schema.optional(ModuleTargeting),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ModuleMetadata" }) as any as Schema.Schema<ModuleMetadata>;

export interface ApkSet {
  /** Metadata about the module represented by this ApkSet */
  moduleMetadata?: ModuleMetadata;
  /** Description of the generated apks. */
  apkDescription?: Array<ApkDescription>;
}

export const ApkSet: Schema.Schema<ApkSet> = Schema.suspend(() => Schema.Struct({
  moduleMetadata: Schema.optional(ModuleMetadata),
  apkDescription: Schema.optional(Schema.Array(ApkDescription)),
})).annotate({ identifier: "ApkSet" }) as any as Schema.Schema<ApkSet>;

export interface SplitApkVariant {
  /** Variant-level targeting. */
  targeting?: VariantTargeting;
  /** Set of APKs, one set per module. */
  apkSet?: Array<ApkSet>;
  /** Number of the variant, starting at 0 (unless overridden). A device will receive APKs from the first variant that matches the device configuration, with higher variant numbers having priority over lower variant numbers. */
  variantNumber?: number;
}

export const SplitApkVariant: Schema.Schema<SplitApkVariant> = Schema.suspend(() => Schema.Struct({
  targeting: Schema.optional(VariantTargeting),
  apkSet: Schema.optional(Schema.Array(ApkSet)),
  variantNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "SplitApkVariant" }) as any as Schema.Schema<SplitApkVariant>;

export interface TargetingInfo {
  /** List of created asset slices. */
  assetSliceSet?: Array<AssetSliceSet>;
  /** The package name of this app. */
  packageName?: string;
  /** List of the created variants. */
  variant?: Array<SplitApkVariant>;
}

export const TargetingInfo: Schema.Schema<TargetingInfo> = Schema.suspend(() => Schema.Struct({
  assetSliceSet: Schema.optional(Schema.Array(AssetSliceSet)),
  packageName: Schema.optional(Schema.String),
  variant: Schema.optional(Schema.Array(SplitApkVariant)),
})).annotate({ identifier: "TargetingInfo" }) as any as Schema.Schema<TargetingInfo>;

export interface GeneratedRecoveryApk {
  /** ID of the recovery action. */
  recoveryId?: string;
  /** The status of the recovery action corresponding to the recovery apk. */
  recoveryStatus?: "RECOVERY_STATUS_UNSPECIFIED" | "RECOVERY_STATUS_ACTIVE" | "RECOVERY_STATUS_CANCELED" | "RECOVERY_STATUS_DRAFT" | "RECOVERY_STATUS_GENERATION_IN_PROGRESS" | "RECOVERY_STATUS_GENERATION_FAILED" | (string & {});
  /** Download ID, which uniquely identifies the APK to download. Should be supplied to `generatedapks.download` method. */
  downloadId?: string;
  /** Name of the module which recovery apk belongs to. */
  moduleName?: string;
}

export const GeneratedRecoveryApk: Schema.Schema<GeneratedRecoveryApk> = Schema.suspend(() => Schema.Struct({
  recoveryId: Schema.optional(Schema.String),
  recoveryStatus: Schema.optional(Schema.String),
  downloadId: Schema.optional(Schema.String),
  moduleName: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedRecoveryApk" }) as any as Schema.Schema<GeneratedRecoveryApk>;

export interface GeneratedStandaloneApk {
  /** ID of the generated variant. */
  variantId?: number;
  /** Download ID, which uniquely identifies the APK to download. Should be supplied to `generatedapks.download` method. */
  downloadId?: string;
}

export const GeneratedStandaloneApk: Schema.Schema<GeneratedStandaloneApk> = Schema.suspend(() => Schema.Struct({
  variantId: Schema.optional(Schema.Number),
  downloadId: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedStandaloneApk" }) as any as Schema.Schema<GeneratedStandaloneApk>;

export interface GeneratedSplitApk {
  /** Download ID, which uniquely identifies the APK to download. Should be supplied to `generatedapks.download` method. */
  downloadId?: string;
  /** ID of the generated variant. */
  variantId?: number;
  /** Split ID. Empty for the main split of the base module. */
  splitId?: string;
  /** Name of the module that this APK belongs to. */
  moduleName?: string;
}

export const GeneratedSplitApk: Schema.Schema<GeneratedSplitApk> = Schema.suspend(() => Schema.Struct({
  downloadId: Schema.optional(Schema.String),
  variantId: Schema.optional(Schema.Number),
  splitId: Schema.optional(Schema.String),
  moduleName: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedSplitApk" }) as any as Schema.Schema<GeneratedSplitApk>;

export interface GeneratedUniversalApk {
  /** Download ID, which uniquely identifies the APK to download. Should be supplied to `generatedapks.download` method. */
  downloadId?: string;
}

export const GeneratedUniversalApk: Schema.Schema<GeneratedUniversalApk> = Schema.suspend(() => Schema.Struct({
  downloadId: Schema.optional(Schema.String),
})).annotate({ identifier: "GeneratedUniversalApk" }) as any as Schema.Schema<GeneratedUniversalApk>;

export interface GeneratedApksPerSigningKey {
  /** Contains targeting information about the generated apks. */
  targetingInfo?: TargetingInfo;
  /** Generated recovery apks for recovery actions signed with a key corresponding to certificate_sha256_hash. This includes all generated recovery APKs, also those in draft or cancelled state. This field is not set if no recovery actions were created for this signing key. */
  generatedRecoveryModules?: Array<GeneratedRecoveryApk>;
  /** List of generated standalone APKs, signed with a key corresponding to certificate_sha256_hash. */
  generatedStandaloneApks?: Array<GeneratedStandaloneApk>;
  /** List of generated split APKs, signed with a key corresponding to certificate_sha256_hash. */
  generatedSplitApks?: Array<GeneratedSplitApk>;
  /** SHA256 hash of the APK signing public key certificate. */
  certificateSha256Hash?: string;
  /** List of asset pack slices which will be served for this app bundle, signed with a key corresponding to certificate_sha256_hash. */
  generatedAssetPackSlices?: Array<GeneratedAssetPackSlice>;
  /** Generated universal APK, signed with a key corresponding to certificate_sha256_hash. This field is not set if no universal APK was generated for this signing key. */
  generatedUniversalApk?: GeneratedUniversalApk;
}

export const GeneratedApksPerSigningKey: Schema.Schema<GeneratedApksPerSigningKey> = Schema.suspend(() => Schema.Struct({
  targetingInfo: Schema.optional(TargetingInfo),
  generatedRecoveryModules: Schema.optional(Schema.Array(GeneratedRecoveryApk)),
  generatedStandaloneApks: Schema.optional(Schema.Array(GeneratedStandaloneApk)),
  generatedSplitApks: Schema.optional(Schema.Array(GeneratedSplitApk)),
  certificateSha256Hash: Schema.optional(Schema.String),
  generatedAssetPackSlices: Schema.optional(Schema.Array(GeneratedAssetPackSlice)),
  generatedUniversalApk: Schema.optional(GeneratedUniversalApk),
})).annotate({ identifier: "GeneratedApksPerSigningKey" }) as any as Schema.Schema<GeneratedApksPerSigningKey>;

export interface GeneratedApksListResponse {
  /** All generated APKs, grouped by the APK signing key. */
  generatedApks?: Array<GeneratedApksPerSigningKey>;
}

export const GeneratedApksListResponse: Schema.Schema<GeneratedApksListResponse> = Schema.suspend(() => Schema.Struct({
  generatedApks: Schema.optional(Schema.Array(GeneratedApksPerSigningKey)),
})).annotate({ identifier: "GeneratedApksListResponse" }) as any as Schema.Schema<GeneratedApksListResponse>;

export interface TrackCountryAvailability {
  /** Whether this track's availability is synced with the default production track. See https://support.google.com/googleplay/android-developer/answer/7550024 for more information on syncing country availability with production. Note that if this is true, the returned "countries" and "rest_of_world" fields will reflect the values for the default production track. */
  syncWithProduction?: boolean;
  /** Whether artifacts in this track are available to "rest of the world" countries. */
  restOfWorld?: boolean;
  /** A list of one or more countries where artifacts in this track are available. This list includes all countries that are targeted by the track, even if only specific carriers are targeted in that country. */
  countries?: Array<TrackTargetedCountry>;
}

export const TrackCountryAvailability: Schema.Schema<TrackCountryAvailability> = Schema.suspend(() => Schema.Struct({
  syncWithProduction: Schema.optional(Schema.Boolean),
  restOfWorld: Schema.optional(Schema.Boolean),
  countries: Schema.optional(Schema.Array(TrackTargetedCountry)),
})).annotate({ identifier: "TrackCountryAvailability" }) as any as Schema.Schema<TrackCountryAvailability>;

export interface SubscribeWithGoogleInfo {
  /** The email address of the user when the subscription was purchased. */
  emailAddress?: string;
  /** The profile name of the user when the subscription was purchased. */
  profileName?: string;
  /** The Google profile id of the user when the subscription was purchased. */
  profileId?: string;
  /** The given name of the user when the subscription was purchased. */
  givenName?: string;
  /** The family name of the user when the subscription was purchased. */
  familyName?: string;
}

export const SubscribeWithGoogleInfo: Schema.Schema<SubscribeWithGoogleInfo> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  profileName: Schema.optional(Schema.String),
  profileId: Schema.optional(Schema.String),
  givenName: Schema.optional(Schema.String),
  familyName: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscribeWithGoogleInfo" }) as any as Schema.Schema<SubscribeWithGoogleInfo>;

export interface OutOfAppPurchaseContext {
  /** User account identifier from the last expired subscription for this SKU. */
  expiredExternalAccountIdentifiers?: ExternalAccountIdentifiers;
  /** The purchase token of the last expired subscription. This purchase token must only be used to help identify the user if the link between the purchaseToken and user is stored in your database. This cannot be used to call the Google Developer API if it has been more than 60 days since expiry. */
  expiredPurchaseToken?: string;
}

export const OutOfAppPurchaseContext: Schema.Schema<OutOfAppPurchaseContext> = Schema.suspend(() => Schema.Struct({
  expiredExternalAccountIdentifiers: Schema.optional(ExternalAccountIdentifiers),
  expiredPurchaseToken: Schema.optional(Schema.String),
})).annotate({ identifier: "OutOfAppPurchaseContext" }) as any as Schema.Schema<OutOfAppPurchaseContext>;

export interface TestPurchase {
}

export const TestPurchase: Schema.Schema<TestPurchase> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TestPurchase" }) as any as Schema.Schema<TestPurchase>;

export interface SystemInitiatedCancellation {
}

export const SystemInitiatedCancellation: Schema.Schema<SystemInitiatedCancellation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SystemInitiatedCancellation" }) as any as Schema.Schema<SystemInitiatedCancellation>;

export interface CanceledStateContext {
  /** Subscription was canceled by user. */
  userInitiatedCancellation?: UserInitiatedCancellation;
  /** Subscription was canceled by the developer. */
  developerInitiatedCancellation?: DeveloperInitiatedCancellation;
  /** Subscription was replaced by a new subscription. */
  replacementCancellation?: ReplacementCancellation;
  /** Subscription was canceled by the system, for example because of a billing problem. */
  systemInitiatedCancellation?: SystemInitiatedCancellation;
}

export const CanceledStateContext: Schema.Schema<CanceledStateContext> = Schema.suspend(() => Schema.Struct({
  userInitiatedCancellation: Schema.optional(UserInitiatedCancellation),
  developerInitiatedCancellation: Schema.optional(DeveloperInitiatedCancellation),
  replacementCancellation: Schema.optional(ReplacementCancellation),
  systemInitiatedCancellation: Schema.optional(SystemInitiatedCancellation),
})).annotate({ identifier: "CanceledStateContext" }) as any as Schema.Schema<CanceledStateContext>;

export interface PausedStateContext {
  /** Time at which the subscription will be automatically resumed. */
  autoResumeTime?: string;
}

export const PausedStateContext: Schema.Schema<PausedStateContext> = Schema.suspend(() => Schema.Struct({
  autoResumeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PausedStateContext" }) as any as Schema.Schema<PausedStateContext>;

export interface SubscriptionPurchaseV2 {
  /** Time at which the subscription was granted. Not set for pending subscriptions (subscription was created but awaiting payment during signup). */
  startTime?: string;
  /** User account identifier in the third-party service. */
  externalAccountIdentifiers?: ExternalAccountIdentifiers;
  /** ISO 3166-1 alpha-2 billing country/region code of the user at the time the subscription was granted. */
  regionCode?: string;
  /** The current state of the subscription. */
  subscriptionState?: "SUBSCRIPTION_STATE_UNSPECIFIED" | "SUBSCRIPTION_STATE_PENDING" | "SUBSCRIPTION_STATE_ACTIVE" | "SUBSCRIPTION_STATE_PAUSED" | "SUBSCRIPTION_STATE_IN_GRACE_PERIOD" | "SUBSCRIPTION_STATE_ON_HOLD" | "SUBSCRIPTION_STATE_CANCELED" | "SUBSCRIPTION_STATE_EXPIRED" | "SUBSCRIPTION_STATE_PENDING_PURCHASE_CANCELED" | (string & {});
  /** The acknowledgement state of the subscription. */
  acknowledgementState?: "ACKNOWLEDGEMENT_STATE_UNSPECIFIED" | "ACKNOWLEDGEMENT_STATE_PENDING" | "ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED" | (string & {});
  /** The purchase token of the old subscription if this subscription is one of the following: * Re-signup of a canceled but non-lapsed subscription * Upgrade/downgrade from a previous subscription. * Convert from prepaid to auto renewing subscription. * Convert from an auto renewing subscription to prepaid. * Topup a prepaid subscription. */
  linkedPurchaseToken?: string;
  /** User profile associated with purchases made with 'Subscribe with Google'. */
  subscribeWithGoogleInfo?: SubscribeWithGoogleInfo;
  /** Item-level info for a subscription purchase. The items in the same purchase should be either all with AutoRenewingPlan or all with PrepaidPlan. */
  lineItems?: Array<SubscriptionPurchaseLineItem>;
  /** Additional context for out of app purchases. This information is only present for re-subscription purchases (subscription purchases made after the previous subscription of the same product has expired) made through the Google Play subscriptions center. This field will be removed after you acknowledge the subscription. */
  outOfAppPurchaseContext?: OutOfAppPurchaseContext;
  /** Deprecated: Use line_items.latest_successful_order_id instead. The order id of the latest order associated with the purchase of the subscription. For autoRenewing subscription, this is the order id of signup order if it is not renewed yet, or the last recurring order id (success, pending, or declined order). For prepaid subscription, this is the order id associated with the queried purchase token. */
  latestOrderId?: string;
  /** Only present if this subscription purchase is a test purchase. */
  testPurchase?: TestPurchase;
  /** Entity tag representing the current state of the subscription. The developer will provide this etag for subscription actions. This etag is always present for auto-renewing and prepaid subscriptions. */
  etag?: string;
  /** Additional context around canceled subscriptions. Only present if the subscription currently has subscription_state SUBSCRIPTION_STATE_CANCELED or SUBSCRIPTION_STATE_EXPIRED. */
  canceledStateContext?: CanceledStateContext;
  /** Additional context around paused subscriptions. Only present if the subscription currently has subscription_state SUBSCRIPTION_STATE_PAUSED. */
  pausedStateContext?: PausedStateContext;
  /** This kind represents a SubscriptionPurchaseV2 object in the androidpublisher service. */
  kind?: string;
}

export const SubscriptionPurchaseV2: Schema.Schema<SubscriptionPurchaseV2> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  externalAccountIdentifiers: Schema.optional(ExternalAccountIdentifiers),
  regionCode: Schema.optional(Schema.String),
  subscriptionState: Schema.optional(Schema.String),
  acknowledgementState: Schema.optional(Schema.String),
  linkedPurchaseToken: Schema.optional(Schema.String),
  subscribeWithGoogleInfo: Schema.optional(SubscribeWithGoogleInfo),
  lineItems: Schema.optional(Schema.Array(SubscriptionPurchaseLineItem)),
  outOfAppPurchaseContext: Schema.optional(OutOfAppPurchaseContext),
  latestOrderId: Schema.optional(Schema.String),
  testPurchase: Schema.optional(TestPurchase),
  etag: Schema.optional(Schema.String),
  canceledStateContext: Schema.optional(CanceledStateContext),
  pausedStateContext: Schema.optional(PausedStateContext),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionPurchaseV2" }) as any as Schema.Schema<SubscriptionPurchaseV2>;

export interface RevokeSubscriptionPurchaseResponse {
}

export const RevokeSubscriptionPurchaseResponse: Schema.Schema<RevokeSubscriptionPurchaseResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RevokeSubscriptionPurchaseResponse" }) as any as Schema.Schema<RevokeSubscriptionPurchaseResponse>;

export interface InappproductsDeleteRequest {
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Package name of the app. */
  packageName?: string;
  /** Unique identifier for the in-app product. */
  sku?: string;
}

export const InappproductsDeleteRequest: Schema.Schema<InappproductsDeleteRequest> = Schema.suspend(() => Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  sku: Schema.optional(Schema.String),
})).annotate({ identifier: "InappproductsDeleteRequest" }) as any as Schema.Schema<InappproductsDeleteRequest>;

export interface InappproductsBatchDeleteRequest {
  /** Individual delete requests. At least one request is required. Can contain up to 100 requests. All requests must correspond to different in-app products. */
  requests?: Array<InappproductsDeleteRequest>;
}

export const InappproductsBatchDeleteRequest: Schema.Schema<InappproductsBatchDeleteRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(InappproductsDeleteRequest)),
})).annotate({ identifier: "InappproductsBatchDeleteRequest" }) as any as Schema.Schema<InappproductsBatchDeleteRequest>;

export interface SystemApkOptions {
  /** Whether system APK was generated with uncompressed dex files. */
  uncompressedDexFiles?: boolean;
  /** Whether system APK was generated with uncompressed native libraries. */
  uncompressedNativeLibraries?: boolean;
  /** Whether to use the rotated key for signing the system APK. */
  rotated?: boolean;
}

export const SystemApkOptions: Schema.Schema<SystemApkOptions> = Schema.suspend(() => Schema.Struct({
  uncompressedDexFiles: Schema.optional(Schema.Boolean),
  uncompressedNativeLibraries: Schema.optional(Schema.Boolean),
  rotated: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SystemApkOptions" }) as any as Schema.Schema<SystemApkOptions>;

export interface Timestamp {
  /** Represents seconds of UTC time since Unix epoch. */
  seconds?: string;
  /** Non-negative fractions of a second at nanosecond resolution. Must be from 0 to 999,999,999 inclusive. */
  nanos?: number;
}

export const Timestamp: Schema.Schema<Timestamp> = Schema.suspend(() => Schema.Struct({
  seconds: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Timestamp" }) as any as Schema.Schema<Timestamp>;

export interface ReviewReplyResult {
  /** The time at which the reply took effect. */
  lastEdited?: Timestamp;
  /** The reply text that was applied. */
  replyText?: string;
}

export const ReviewReplyResult: Schema.Schema<ReviewReplyResult> = Schema.suspend(() => Schema.Struct({
  lastEdited: Schema.optional(Timestamp),
  replyText: Schema.optional(Schema.String),
})).annotate({ identifier: "ReviewReplyResult" }) as any as Schema.Schema<ReviewReplyResult>;

export interface TargetingRuleScopeThisSubscription {
}

export const TargetingRuleScopeThisSubscription: Schema.Schema<TargetingRuleScopeThisSubscription> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TargetingRuleScopeThisSubscription" }) as any as Schema.Schema<TargetingRuleScopeThisSubscription>;

export interface TargetingRuleScope {
  /** The scope of the current targeting rule is the subscription with the specified subscription ID. Must be a subscription within the same parent app. */
  specificSubscriptionInApp?: string;
  /** The scope of the current targeting rule is the subscription in which this offer is defined. */
  thisSubscription?: TargetingRuleScopeThisSubscription;
  /** The scope of the current targeting rule is any subscription in the parent app. */
  anySubscriptionInApp?: TargetingRuleScopeAnySubscriptionInApp;
}

export const TargetingRuleScope: Schema.Schema<TargetingRuleScope> = Schema.suspend(() => Schema.Struct({
  specificSubscriptionInApp: Schema.optional(Schema.String),
  thisSubscription: Schema.optional(TargetingRuleScopeThisSubscription),
  anySubscriptionInApp: Schema.optional(TargetingRuleScopeAnySubscriptionInApp),
})).annotate({ identifier: "TargetingRuleScope" }) as any as Schema.Schema<TargetingRuleScope>;

export interface UpgradeTargetingRule {
  /** Limit this offer to only once per user. If set to true, a user can never be eligible for this offer again if they ever subscribed to this offer. */
  oncePerUser?: boolean;
  /** Required. The scope of subscriptions this rule considers. Only allows "this subscription" and "specific subscription in app". */
  scope?: TargetingRuleScope;
  /** The specific billing period duration, specified in ISO 8601 format, that a user must be currently subscribed to to be eligible for this rule. If not specified, users subscribed to any billing period are matched. */
  billingPeriodDuration?: string;
}

export const UpgradeTargetingRule: Schema.Schema<UpgradeTargetingRule> = Schema.suspend(() => Schema.Struct({
  oncePerUser: Schema.optional(Schema.Boolean),
  scope: Schema.optional(TargetingRuleScope),
  billingPeriodDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "UpgradeTargetingRule" }) as any as Schema.Schema<UpgradeTargetingRule>;

export interface ActivateOneTimeProductOfferRequest {
  /** Required. The offer ID of the offer to activate. */
  offerId?: string;
  /** Optional. The latency tolerance for the propagation of this update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent one-time product (ID) of the offer to activate. */
  productId?: string;
  /** Required. The parent purchase option (ID) of the offer to activate. */
  purchaseOptionId?: string;
  /** Required. The parent app (package name) of the offer to activate. */
  packageName?: string;
}

export const ActivateOneTimeProductOfferRequest: Schema.Schema<ActivateOneTimeProductOfferRequest> = Schema.suspend(() => Schema.Struct({
  offerId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  purchaseOptionId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivateOneTimeProductOfferRequest" }) as any as Schema.Schema<ActivateOneTimeProductOfferRequest>;

export interface CancelOneTimeProductOfferRequest {
  /** Required. The parent app (package name) of the offer to cancel. */
  packageName?: string;
  /** Required. The parent purchase option (ID) of the offer to cancel. */
  purchaseOptionId?: string;
  /** Required. The parent one-time product (ID) of the offer to cancel. */
  productId?: string;
  /** Optional. The latency tolerance for the propagation of this update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The offer ID of the offer to cancel. */
  offerId?: string;
}

export const CancelOneTimeProductOfferRequest: Schema.Schema<CancelOneTimeProductOfferRequest> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  purchaseOptionId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
})).annotate({ identifier: "CancelOneTimeProductOfferRequest" }) as any as Schema.Schema<CancelOneTimeProductOfferRequest>;

export interface DeactivateOneTimeProductOfferRequest {
  /** Required. The parent purchase option (ID) of the offer to deactivate. */
  purchaseOptionId?: string;
  /** Required. The parent app (package name) of the offer to deactivate. */
  packageName?: string;
  /** Required. The parent one-time product (ID) of the offer to deactivate. */
  productId?: string;
  /** Optional. The latency tolerance for the propagation of this update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The offer ID of the offer to deactivate. */
  offerId?: string;
}

export const DeactivateOneTimeProductOfferRequest: Schema.Schema<DeactivateOneTimeProductOfferRequest> = Schema.suspend(() => Schema.Struct({
  purchaseOptionId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeactivateOneTimeProductOfferRequest" }) as any as Schema.Schema<DeactivateOneTimeProductOfferRequest>;

export interface UpdateOneTimeProductOfferStateRequest {
  /** Activates an offer. Once activated, the offer is available to users, as long as its conditions are met. */
  activateOneTimeProductOfferRequest?: ActivateOneTimeProductOfferRequest;
  /** Cancels an offer. Once cancelled, the offer is not available to users. Any pending orders related to this offer will be cancelled. This state transition is specific to pre-orders. */
  cancelOneTimeProductOfferRequest?: CancelOneTimeProductOfferRequest;
  /** Deactivates an offer. Once deactivated, the offer is no longer available to users. This state transition is specific to discounted offers. */
  deactivateOneTimeProductOfferRequest?: DeactivateOneTimeProductOfferRequest;
}

export const UpdateOneTimeProductOfferStateRequest: Schema.Schema<UpdateOneTimeProductOfferStateRequest> = Schema.suspend(() => Schema.Struct({
  activateOneTimeProductOfferRequest: Schema.optional(ActivateOneTimeProductOfferRequest),
  cancelOneTimeProductOfferRequest: Schema.optional(CancelOneTimeProductOfferRequest),
  deactivateOneTimeProductOfferRequest: Schema.optional(DeactivateOneTimeProductOfferRequest),
})).annotate({ identifier: "UpdateOneTimeProductOfferStateRequest" }) as any as Schema.Schema<UpdateOneTimeProductOfferStateRequest>;

export interface BatchUpdateOneTimeProductOfferStatesRequest {
  /** Required. The update request list of up to 100 elements. All requests must update different offers. */
  requests?: Array<UpdateOneTimeProductOfferStateRequest>;
}

export const BatchUpdateOneTimeProductOfferStatesRequest: Schema.Schema<BatchUpdateOneTimeProductOfferStatesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateOneTimeProductOfferStateRequest)),
})).annotate({ identifier: "BatchUpdateOneTimeProductOfferStatesRequest" }) as any as Schema.Schema<BatchUpdateOneTimeProductOfferStatesRequest>;

export interface AppVersionRange {
  /** Lowest app version in the range, inclusive. */
  versionCodeStart?: string;
  /** Highest app version in the range, inclusive. */
  versionCodeEnd?: string;
}

export const AppVersionRange: Schema.Schema<AppVersionRange> = Schema.suspend(() => Schema.Struct({
  versionCodeStart: Schema.optional(Schema.String),
  versionCodeEnd: Schema.optional(Schema.String),
})).annotate({ identifier: "AppVersionRange" }) as any as Schema.Schema<AppVersionRange>;

export interface AppVersionList {
  /** List of app version codes. */
  versionCodes?: Array<string>;
}

export const AppVersionList: Schema.Schema<AppVersionList> = Schema.suspend(() => Schema.Struct({
  versionCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AppVersionList" }) as any as Schema.Schema<AppVersionList>;

export interface Targeting {
  /** All users are targeted. */
  allUsers?: AllUsers;
  /** Targeting is based on the user account region. */
  regions?: Regions;
  /** Target version codes as a range. */
  versionRange?: AppVersionRange;
  /** Targeting is based on android api levels of devices. */
  androidSdks?: AndroidSdks;
  /** Target version codes as a list. */
  versionList?: AppVersionList;
}

export const Targeting: Schema.Schema<Targeting> = Schema.suspend(() => Schema.Struct({
  allUsers: Schema.optional(AllUsers),
  regions: Schema.optional(Regions),
  versionRange: Schema.optional(AppVersionRange),
  androidSdks: Schema.optional(AndroidSdks),
  versionList: Schema.optional(AppVersionList),
})).annotate({ identifier: "Targeting" }) as any as Schema.Schema<Targeting>;

export interface RemoteInAppUpdateDataPerBundle {
  /** Total number of devices affected by this recovery action associated with bundle of the app. */
  totalDeviceCount?: string;
  /** Version Code corresponding to the target bundle. */
  versionCode?: string;
  /** Total number of devices which have been rescued. */
  recoveredDeviceCount?: string;
}

export const RemoteInAppUpdateDataPerBundle: Schema.Schema<RemoteInAppUpdateDataPerBundle> = Schema.suspend(() => Schema.Struct({
  totalDeviceCount: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.String),
  recoveredDeviceCount: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoteInAppUpdateDataPerBundle" }) as any as Schema.Schema<RemoteInAppUpdateDataPerBundle>;

export interface RemoteInAppUpdateData {
  /** Data related to the recovery action at bundle level. */
  remoteAppUpdateDataPerBundle?: Array<RemoteInAppUpdateDataPerBundle>;
}

export const RemoteInAppUpdateData: Schema.Schema<RemoteInAppUpdateData> = Schema.suspend(() => Schema.Struct({
  remoteAppUpdateDataPerBundle: Schema.optional(Schema.Array(RemoteInAppUpdateDataPerBundle)),
})).annotate({ identifier: "RemoteInAppUpdateData" }) as any as Schema.Schema<RemoteInAppUpdateData>;

export interface AppRecoveryAction {
  /** Timestamp of when the app recovery action is deployed to the users. Only set if the recovery action has been deployed. */
  deployTime?: string;
  /** Specifies targeting criteria for the recovery action such as regions, android sdk versions, app versions etc. */
  targeting?: Targeting;
  /** Timestamp of when the developer last updated recovery action. In case the action is cancelled, it corresponds to cancellation time. It is always set after creation of the recovery action. */
  lastUpdateTime?: string;
  /** ID corresponding to the app recovery action. */
  appRecoveryId?: string;
  /** Data about the remote in-app update action such as such as recovered user base, recoverable user base etc. Set only if the recovery action type is Remote In-App Update. */
  remoteInAppUpdateData?: RemoteInAppUpdateData;
  /** The status of the recovery action. */
  status?: "RECOVERY_STATUS_UNSPECIFIED" | "RECOVERY_STATUS_ACTIVE" | "RECOVERY_STATUS_CANCELED" | "RECOVERY_STATUS_DRAFT" | "RECOVERY_STATUS_GENERATION_IN_PROGRESS" | "RECOVERY_STATUS_GENERATION_FAILED" | (string & {});
  /** Timestamp of when the app recovery action is created by the developer. It is always set after creation of the recovery action. */
  createTime?: string;
  /** Timestamp of when the app recovery action is canceled by the developer. Only set if the recovery action has been canceled. */
  cancelTime?: string;
}

export const AppRecoveryAction: Schema.Schema<AppRecoveryAction> = Schema.suspend(() => Schema.Struct({
  deployTime: Schema.optional(Schema.String),
  targeting: Schema.optional(Targeting),
  lastUpdateTime: Schema.optional(Schema.String),
  appRecoveryId: Schema.optional(Schema.String),
  remoteInAppUpdateData: Schema.optional(RemoteInAppUpdateData),
  status: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  cancelTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AppRecoveryAction" }) as any as Schema.Schema<AppRecoveryAction>;

export interface ListAppRecoveriesResponse {
  /** List of recovery actions associated with the requested package name. */
  recoveryActions?: Array<AppRecoveryAction>;
}

export const ListAppRecoveriesResponse: Schema.Schema<ListAppRecoveriesResponse> = Schema.suspend(() => Schema.Struct({
  recoveryActions: Schema.optional(Schema.Array(AppRecoveryAction)),
})).annotate({ identifier: "ListAppRecoveriesResponse" }) as any as Schema.Schema<ListAppRecoveriesResponse>;

export interface ConvertedRegionPrice {
  /** The region code of the region. */
  regionCode?: string;
  /** The tax amount of the converted price. */
  taxAmount?: Money;
  /** The converted price tax inclusive. */
  price?: Money;
}

export const ConvertedRegionPrice: Schema.Schema<ConvertedRegionPrice> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  taxAmount: Schema.optional(Money),
  price: Schema.optional(Money),
})).annotate({ identifier: "ConvertedRegionPrice" }) as any as Schema.Schema<ConvertedRegionPrice>;

export interface DeobfuscationFile {
  /** The type of the deobfuscation file. */
  symbolType?: "deobfuscationFileTypeUnspecified" | "proguard" | "nativeCode" | (string & {});
}

export const DeobfuscationFile: Schema.Schema<DeobfuscationFile> = Schema.suspend(() => Schema.Struct({
  symbolType: Schema.optional(Schema.String),
})).annotate({ identifier: "DeobfuscationFile" }) as any as Schema.Schema<DeobfuscationFile>;

export interface DeobfuscationFilesUploadResponse {
  /** The uploaded Deobfuscation File configuration. */
  deobfuscationFile?: DeobfuscationFile;
}

export const DeobfuscationFilesUploadResponse: Schema.Schema<DeobfuscationFilesUploadResponse> = Schema.suspend(() => Schema.Struct({
  deobfuscationFile: Schema.optional(DeobfuscationFile),
})).annotate({ identifier: "DeobfuscationFilesUploadResponse" }) as any as Schema.Schema<DeobfuscationFilesUploadResponse>;

export interface SafetyLabelsUpdateResponse {
}

export const SafetyLabelsUpdateResponse: Schema.Schema<SafetyLabelsUpdateResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SafetyLabelsUpdateResponse" }) as any as Schema.Schema<SafetyLabelsUpdateResponse>;

export interface DeviceMetadata {
  /** OpenGL version */
  glEsVersion?: number;
  /** Device model name (e.g. Droid) */
  productName?: string;
  /** Device manufacturer (e.g. Motorola) */
  manufacturer?: string;
  /** Comma separated list of native platforms (e.g. "arm", "arm7") */
  nativePlatform?: string;
  /** Screen density in DPI */
  screenDensityDpi?: number;
  /** Device CPU make, e.g. "Qualcomm" */
  cpuMake?: string;
  /** Device RAM in Megabytes, e.g. "2048" */
  ramMb?: number;
  /** Screen height in pixels */
  screenHeightPx?: number;
  /** Device CPU model, e.g. "MSM8974" */
  cpuModel?: string;
  /** Device class (e.g. tablet) */
  deviceClass?: string;
  /** Screen width in pixels */
  screenWidthPx?: number;
}

export const DeviceMetadata: Schema.Schema<DeviceMetadata> = Schema.suspend(() => Schema.Struct({
  glEsVersion: Schema.optional(Schema.Number),
  productName: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  nativePlatform: Schema.optional(Schema.String),
  screenDensityDpi: Schema.optional(Schema.Number),
  cpuMake: Schema.optional(Schema.String),
  ramMb: Schema.optional(Schema.Number),
  screenHeightPx: Schema.optional(Schema.Number),
  cpuModel: Schema.optional(Schema.String),
  deviceClass: Schema.optional(Schema.String),
  screenWidthPx: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeviceMetadata" }) as any as Schema.Schema<DeviceMetadata>;

export interface UserComment {
  /** String version name of the app as installed at the time the review was written. May be absent. */
  appVersionName?: string;
  /** Number of users who have given this review a thumbs down. */
  thumbsDownCount?: number;
  /** Information about the characteristics of the user's device. */
  deviceMetadata?: DeviceMetadata;
  /** The star rating associated with the review, from 1 to 5. */
  starRating?: number;
  /** Language code for the reviewer. This is taken from the device settings so is not guaranteed to match the language the review is written in. May be absent. */
  reviewerLanguage?: string;
  /** The last time at which this comment was updated. */
  lastModified?: Timestamp;
  /** Integer Android SDK version of the user's device at the time the review was written, e.g. 23 is Marshmallow. May be absent. */
  androidOsVersion?: number;
  /** The content of the comment, i.e. review body. In some cases users have been able to write a review with separate title and body; in those cases the title and body are concatenated and separated by a tab character. */
  text?: string;
  /** Number of users who have given this review a thumbs up. */
  thumbsUpCount?: number;
  /** Codename for the reviewer's device, e.g. klte, flounder. May be absent. */
  device?: string;
  /** Integer version code of the app as installed at the time the review was written. May be absent. */
  appVersionCode?: number;
  /** Untranslated text of the review, where the review was translated. If the review was not translated this is left blank. */
  originalText?: string;
}

export const UserComment: Schema.Schema<UserComment> = Schema.suspend(() => Schema.Struct({
  appVersionName: Schema.optional(Schema.String),
  thumbsDownCount: Schema.optional(Schema.Number),
  deviceMetadata: Schema.optional(DeviceMetadata),
  starRating: Schema.optional(Schema.Number),
  reviewerLanguage: Schema.optional(Schema.String),
  lastModified: Schema.optional(Timestamp),
  androidOsVersion: Schema.optional(Schema.Number),
  text: Schema.optional(Schema.String),
  thumbsUpCount: Schema.optional(Schema.Number),
  device: Schema.optional(Schema.String),
  appVersionCode: Schema.optional(Schema.Number),
  originalText: Schema.optional(Schema.String),
})).annotate({ identifier: "UserComment" }) as any as Schema.Schema<UserComment>;

export interface DeveloperComment {
  /** The content of the comment, i.e. reply body. */
  text?: string;
  /** The last time at which this comment was updated. */
  lastModified?: Timestamp;
}

export const DeveloperComment: Schema.Schema<DeveloperComment> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  lastModified: Schema.optional(Timestamp),
})).annotate({ identifier: "DeveloperComment" }) as any as Schema.Schema<DeveloperComment>;

export interface Comment {
  /** A comment from a user. */
  userComment?: UserComment;
  /** A comment from a developer. */
  developerComment?: DeveloperComment;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  userComment: Schema.optional(UserComment),
  developerComment: Schema.optional(DeveloperComment),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface DeleteOneTimeProductRequest {
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent app (package name) of the one-time product to delete. */
  packageName?: string;
  /** Required. The one-time product ID of the one-time product to delete. */
  productId?: string;
}

export const DeleteOneTimeProductRequest: Schema.Schema<DeleteOneTimeProductRequest> = Schema.suspend(() => Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteOneTimeProductRequest" }) as any as Schema.Schema<DeleteOneTimeProductRequest>;

export interface RegionalBasePlanConfig {
  /** Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US". */
  regionCode?: string;
  /** Whether the base plan in the specified region is available for new subscribers. Existing subscribers will not have their subscription canceled if this value is set to false. If not specified, this will default to false. */
  newSubscriberAvailability?: boolean;
  /** The price of the base plan in the specified region. Must be set if the base plan is available to new subscribers. Must be set in the currency that is linked to the specified region. */
  price?: Money;
}

export const RegionalBasePlanConfig: Schema.Schema<RegionalBasePlanConfig> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  newSubscriberAvailability: Schema.optional(Schema.Boolean),
  price: Schema.optional(Money),
})).annotate({ identifier: "RegionalBasePlanConfig" }) as any as Schema.Schema<RegionalBasePlanConfig>;

export interface InstallmentsBasePlanType {
  /** The proration mode for the base plan determines what happens when a user switches to this plan from another base plan. If unspecified, defaults to CHARGE_ON_NEXT_BILLING_DATE. */
  prorationMode?: "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED" | "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE" | "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY" | (string & {});
  /** Grace period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and the lesser of 30D and base plan billing period. If not specified, a default value will be used based on the billing period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive. */
  gracePeriodDuration?: string;
  /** Required. Immutable. Installments base plan renewal type. Determines the behavior at the end of the initial commitment. The renewal type is immutable after the base plan is created. */
  renewalType?: "RENEWAL_TYPE_UNSPECIFIED" | "RENEWAL_TYPE_RENEWS_WITHOUT_COMMITMENT" | "RENEWAL_TYPE_RENEWS_WITH_COMMITMENT" | (string & {});
  /** Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created. */
  billingPeriodDuration?: string;
  /** Whether users should be able to resubscribe to this base plan in Google Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified. */
  resubscribeState?: "RESUBSCRIBE_STATE_UNSPECIFIED" | "RESUBSCRIBE_STATE_ACTIVE" | "RESUBSCRIBE_STATE_INACTIVE" | (string & {});
  /** Required. Immutable. The number of payments the user is committed to. It is immutable after the base plan is created. */
  committedPaymentsCount?: number;
  /** Optional. Custom account hold period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and P60D. An empty field represents a recommended account hold, calculated as 60 days minus grace period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive. */
  accountHoldDuration?: string;
}

export const InstallmentsBasePlanType: Schema.Schema<InstallmentsBasePlanType> = Schema.suspend(() => Schema.Struct({
  prorationMode: Schema.optional(Schema.String),
  gracePeriodDuration: Schema.optional(Schema.String),
  renewalType: Schema.optional(Schema.String),
  billingPeriodDuration: Schema.optional(Schema.String),
  resubscribeState: Schema.optional(Schema.String),
  committedPaymentsCount: Schema.optional(Schema.Number),
  accountHoldDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "InstallmentsBasePlanType" }) as any as Schema.Schema<InstallmentsBasePlanType>;

export interface AutoRenewingBasePlanType {
  /** Optional. Custom account hold period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and P60D. An empty field represents a recommended account hold, calculated as 60 days minus grace period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive. */
  accountHoldDuration?: string;
  /** Whether the renewing base plan is backward compatible. The backward compatible base plan is returned by the Google Play Billing Library deprecated method querySkuDetailsAsync(). Only one renewing base plan can be marked as legacy compatible for a given subscription. */
  legacyCompatible?: boolean;
  /** Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created. */
  billingPeriodDuration?: string;
  /** Whether users should be able to resubscribe to this base plan in Google Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified. */
  resubscribeState?: "RESUBSCRIBE_STATE_UNSPECIFIED" | "RESUBSCRIBE_STATE_ACTIVE" | "RESUBSCRIBE_STATE_INACTIVE" | (string & {});
  /** Grace period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and the lesser of 30D and base plan billing period. If not specified, a default value will be used based on the billing period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive. */
  gracePeriodDuration?: string;
  /** Subscription offer id which is legacy compatible. The backward compatible subscription offer is returned by the Google Play Billing Library deprecated method querySkuDetailsAsync(). Only one subscription offer can be marked as legacy compatible for a given renewing base plan. To have no Subscription offer as legacy compatible set this field as empty string. */
  legacyCompatibleSubscriptionOfferId?: string;
  /** The proration mode for the base plan determines what happens when a user switches to this plan from another base plan. If unspecified, defaults to CHARGE_ON_NEXT_BILLING_DATE. */
  prorationMode?: "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED" | "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE" | "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY" | (string & {});
}

export const AutoRenewingBasePlanType: Schema.Schema<AutoRenewingBasePlanType> = Schema.suspend(() => Schema.Struct({
  accountHoldDuration: Schema.optional(Schema.String),
  legacyCompatible: Schema.optional(Schema.Boolean),
  billingPeriodDuration: Schema.optional(Schema.String),
  resubscribeState: Schema.optional(Schema.String),
  gracePeriodDuration: Schema.optional(Schema.String),
  legacyCompatibleSubscriptionOfferId: Schema.optional(Schema.String),
  prorationMode: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoRenewingBasePlanType" }) as any as Schema.Schema<AutoRenewingBasePlanType>;

export interface OtherRegionsBasePlanConfig {
  /** Required. Price in USD to use for any new locations Play may launch in. */
  usdPrice?: Money;
  /** Whether the base plan is available for new subscribers in any new locations Play may launch in. If not specified, this will default to false. */
  newSubscriberAvailability?: boolean;
  /** Required. Price in EUR to use for any new locations Play may launch in. */
  eurPrice?: Money;
}

export const OtherRegionsBasePlanConfig: Schema.Schema<OtherRegionsBasePlanConfig> = Schema.suspend(() => Schema.Struct({
  usdPrice: Schema.optional(Money),
  newSubscriberAvailability: Schema.optional(Schema.Boolean),
  eurPrice: Schema.optional(Money),
})).annotate({ identifier: "OtherRegionsBasePlanConfig" }) as any as Schema.Schema<OtherRegionsBasePlanConfig>;

export interface PrepaidBasePlanType {
  /** Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created. */
  billingPeriodDuration?: string;
  /** Whether users should be able to extend this prepaid base plan in Google Play surfaces. Defaults to TIME_EXTENSION_ACTIVE if not specified. */
  timeExtension?: "TIME_EXTENSION_UNSPECIFIED" | "TIME_EXTENSION_ACTIVE" | "TIME_EXTENSION_INACTIVE" | (string & {});
}

export const PrepaidBasePlanType: Schema.Schema<PrepaidBasePlanType> = Schema.suspend(() => Schema.Struct({
  billingPeriodDuration: Schema.optional(Schema.String),
  timeExtension: Schema.optional(Schema.String),
})).annotate({ identifier: "PrepaidBasePlanType" }) as any as Schema.Schema<PrepaidBasePlanType>;

export interface BasePlan {
  /** Output only. The state of the base plan, i.e. whether it's active. Draft and inactive base plans can be activated or deleted. Active base plans can be made inactive. Inactive base plans can be canceled. This field cannot be changed by updating the resource. Use the dedicated endpoints instead. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "INACTIVE" | (string & {});
  /** Region-specific information for this base plan. */
  regionalConfigs?: Array<RegionalBasePlanConfig>;
  /** Set for installments base plans where a user is committed to a specified number of payments. */
  installmentsBasePlanType?: InstallmentsBasePlanType;
  /** List of up to 20 custom tags specified for this base plan, and returned to the app through the billing library. Subscription offers for this base plan will also receive these offer tags in the billing library. */
  offerTags?: Array<OfferTag>;
  /** Required. Immutable. The unique identifier of this base plan. Must be unique within the subscription, and conform with RFC-1034. That is, this ID can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 63 characters. */
  basePlanId?: string;
  /** Set when the base plan automatically renews at a regular interval. */
  autoRenewingBasePlanType?: AutoRenewingBasePlanType;
  /** Pricing information for any new locations Play may launch in the future. If omitted, the BasePlan will not be automatically available any new locations Play may launch in the future. */
  otherRegionsConfig?: OtherRegionsBasePlanConfig;
  /** Set when the base plan does not automatically renew at the end of the billing period. */
  prepaidBasePlanType?: PrepaidBasePlanType;
}

export const BasePlan: Schema.Schema<BasePlan> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  regionalConfigs: Schema.optional(Schema.Array(RegionalBasePlanConfig)),
  installmentsBasePlanType: Schema.optional(InstallmentsBasePlanType),
  offerTags: Schema.optional(Schema.Array(OfferTag)),
  basePlanId: Schema.optional(Schema.String),
  autoRenewingBasePlanType: Schema.optional(AutoRenewingBasePlanType),
  otherRegionsConfig: Schema.optional(OtherRegionsBasePlanConfig),
  prepaidBasePlanType: Schema.optional(PrepaidBasePlanType),
})).annotate({ identifier: "BasePlan" }) as any as Schema.Schema<BasePlan>;

export interface SubscriptionListing {
  /** The description of this subscription in the language of this listing. Maximum length - 80 characters. Plain text. */
  description?: string;
  /** Required. The language of this listing, as defined by BCP-47, e.g. "en-US". */
  languageCode?: string;
  /** Required. The title of this subscription in the language of this listing. Plain text. */
  title?: string;
  /** A list of benefits shown to the user on platforms such as the Play Store and in restoration flows in the language of this listing. Plain text. Ordered list of at most four benefits. */
  benefits?: Array<string>;
}

export const SubscriptionListing: Schema.Schema<SubscriptionListing> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  benefits: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SubscriptionListing" }) as any as Schema.Schema<SubscriptionListing>;

export interface Subscription {
  /** Optional. Countries where the purchase of this subscription is restricted to payment methods registered in the same country. If empty, no payment location restrictions are imposed. */
  restrictedPaymentCountries?: RestrictedPaymentCountries;
  /** Output only. Deprecated: subscription archiving is not supported. */
  archived?: boolean;
  /** The set of base plans for this subscription. Represents the prices and duration of the subscription if no other offers apply. */
  basePlans?: Array<BasePlan>;
  /** Details about taxes and legal compliance. */
  taxAndComplianceSettings?: SubscriptionTaxAndComplianceSettings;
  /** Required. List of localized listings for this subscription. Must contain at least an entry for the default language of the parent app. */
  listings?: Array<SubscriptionListing>;
  /** Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must be composed of lower-case letters (a-z), numbers (0-9), underscores (_) and dots (.). It must start with a lower-case letter or number, and be between 1 and 40 (inclusive) characters in length. */
  productId?: string;
  /** Immutable. Package name of the parent app. */
  packageName?: string;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  restrictedPaymentCountries: Schema.optional(RestrictedPaymentCountries),
  archived: Schema.optional(Schema.Boolean),
  basePlans: Schema.optional(Schema.Array(BasePlan)),
  taxAndComplianceSettings: Schema.optional(SubscriptionTaxAndComplianceSettings),
  listings: Schema.optional(Schema.Array(SubscriptionListing)),
  productId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface BatchGetSubscriptionsResponse {
  /** The list of requested subscriptions, in the same order as the request. */
  subscriptions?: Array<Subscription>;
}

export const BatchGetSubscriptionsResponse: Schema.Schema<BatchGetSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Subscription)),
})).annotate({ identifier: "BatchGetSubscriptionsResponse" }) as any as Schema.Schema<BatchGetSubscriptionsResponse>;

export interface UsesPermission {
  /** The name of the permission requested. */
  name?: string;
  /** Optionally, the maximum SDK version for which the permission is required. */
  maxSdkVersion?: number;
}

export const UsesPermission: Schema.Schema<UsesPermission> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  maxSdkVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "UsesPermission" }) as any as Schema.Schema<UsesPermission>;

export interface ExternallyHostedApk {
  /** The features required by this APK (optional). */
  usesFeatures?: Array<string>;
  /** The native code environments supported by this APK (optional). */
  nativeCodes?: Array<string>;
  /** The sha256 checksum of this APK, represented as a base64 encoded byte array. */
  fileSha256Base64?: string;
  /** The maximum SDK supported by this APK (optional). */
  maximumSdk?: number;
  /** The package name. */
  packageName?: string;
  /** A certificate (or array of certificates if a certificate-chain is used) used to sign this APK, represented as a base64 encoded byte array. */
  certificateBase64s?: Array<string>;
  /** The version code of this APK. */
  versionCode?: number;
  /** The application label. */
  applicationLabel?: string;
  /** The version name of this APK. */
  versionName?: string;
  /** The minimum SDK targeted by this APK. */
  minimumSdk?: number;
  /** The permissions requested by this APK. */
  usesPermissions?: Array<UsesPermission>;
  /** The file size in bytes of this APK. */
  fileSize?: string;
  /** The sha1 checksum of this APK, represented as a base64 encoded byte array. */
  fileSha1Base64?: string;
  /** The URL at which the APK is hosted. This must be an https URL. */
  externallyHostedUrl?: string;
  /** The icon image from the APK, as a base64 encoded byte array. */
  iconBase64?: string;
}

export const ExternallyHostedApk: Schema.Schema<ExternallyHostedApk> = Schema.suspend(() => Schema.Struct({
  usesFeatures: Schema.optional(Schema.Array(Schema.String)),
  nativeCodes: Schema.optional(Schema.Array(Schema.String)),
  fileSha256Base64: Schema.optional(Schema.String),
  maximumSdk: Schema.optional(Schema.Number),
  packageName: Schema.optional(Schema.String),
  certificateBase64s: Schema.optional(Schema.Array(Schema.String)),
  versionCode: Schema.optional(Schema.Number),
  applicationLabel: Schema.optional(Schema.String),
  versionName: Schema.optional(Schema.String),
  minimumSdk: Schema.optional(Schema.Number),
  usesPermissions: Schema.optional(Schema.Array(UsesPermission)),
  fileSize: Schema.optional(Schema.String),
  fileSha1Base64: Schema.optional(Schema.String),
  externallyHostedUrl: Schema.optional(Schema.String),
  iconBase64: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternallyHostedApk" }) as any as Schema.Schema<ExternallyHostedApk>;

export interface SubscriptionPriceChange {
  /** The new price the subscription will renew with if the price change is accepted by the user. */
  newPrice?: Price;
  /** The current state of the price change. Possible values are: 0. Outstanding: State for a pending price change waiting for the user to agree. In this state, you can optionally seek confirmation from the user using the In-App API. 1. Accepted: State for an accepted price change that the subscription will renew with unless it's canceled. The price change takes effect on a future date when the subscription renews. Note that the change might not occur when the subscription is renewed next. */
  state?: number;
}

export const SubscriptionPriceChange: Schema.Schema<SubscriptionPriceChange> = Schema.suspend(() => Schema.Struct({
  newPrice: Schema.optional(Price),
  state: Schema.optional(Schema.Number),
})).annotate({ identifier: "SubscriptionPriceChange" }) as any as Schema.Schema<SubscriptionPriceChange>;

export interface OtherRecurringProduct {
}

export const OtherRecurringProduct: Schema.Schema<OtherRecurringProduct> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OtherRecurringProduct" }) as any as Schema.Schema<OtherRecurringProduct>;

export interface ExternalSubscription {
  /** Required. The type of the external subscription. */
  subscriptionType?: "SUBSCRIPTION_TYPE_UNSPECIFIED" | "RECURRING" | "PREPAID" | (string & {});
}

export const ExternalSubscription: Schema.Schema<ExternalSubscription> = Schema.suspend(() => Schema.Struct({
  subscriptionType: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalSubscription" }) as any as Schema.Schema<ExternalSubscription>;

export interface RecurringExternalTransaction {
  /** The external transaction id of the first transaction of this recurring series of transactions. For example, for a subscription this would be the transaction id of the first payment. Required when creating recurring external transactions. */
  initialExternalTransactionId?: string;
  /** Input only. Provided during the call to Create. Must only be used when migrating a subscription from manual monthly reporting to automated reporting. */
  migratedTransactionProgram?: "EXTERNAL_TRANSACTION_PROGRAM_UNSPECIFIED" | "USER_CHOICE_BILLING" | "ALTERNATIVE_BILLING_ONLY" | (string & {});
  /** Details of a recurring external transaction product which doesn't belong to any other specific category. */
  otherRecurringProduct?: OtherRecurringProduct;
  /** Input only. Provided during the call to Create. Retrieved from the client when the alternative billing flow is launched. Required only for the initial purchase. */
  externalTransactionToken?: string;
  /** Details of an external subscription. */
  externalSubscription?: ExternalSubscription;
}

export const RecurringExternalTransaction: Schema.Schema<RecurringExternalTransaction> = Schema.suspend(() => Schema.Struct({
  initialExternalTransactionId: Schema.optional(Schema.String),
  migratedTransactionProgram: Schema.optional(Schema.String),
  otherRecurringProduct: Schema.optional(OtherRecurringProduct),
  externalTransactionToken: Schema.optional(Schema.String),
  externalSubscription: Schema.optional(ExternalSubscription),
})).annotate({ identifier: "RecurringExternalTransaction" }) as any as Schema.Schema<RecurringExternalTransaction>;

export interface RegionalPriceMigrationConfig {
  /** Required. Subscribers in all legacy price cohorts before this time will be migrated to the current price. Subscribers in any newer price cohorts are unaffected. Affected subscribers will receive one or more notifications from Google Play about the price change. Price decreases occur at the subscriber's next billing date. Price increases occur at the subscriber's next billing date following a notification period that varies by region and price increase type. */
  oldestAllowedPriceVersionTime?: string;
  /** Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US". */
  regionCode?: string;
  /** Optional. The requested type of price increase */
  priceIncreaseType?: "PRICE_INCREASE_TYPE_UNSPECIFIED" | "PRICE_INCREASE_TYPE_OPT_IN" | "PRICE_INCREASE_TYPE_OPT_OUT" | (string & {});
}

export const RegionalPriceMigrationConfig: Schema.Schema<RegionalPriceMigrationConfig> = Schema.suspend(() => Schema.Struct({
  oldestAllowedPriceVersionTime: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  priceIncreaseType: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalPriceMigrationConfig" }) as any as Schema.Schema<RegionalPriceMigrationConfig>;

export interface MigrateBasePlanPricesRequest {
  /** Required. The unique base plan ID of the base plan to update prices on. */
  basePlanId?: string;
  /** Required. The regional prices to update. */
  regionalPriceMigrations?: Array<RegionalPriceMigrationConfig>;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The ID of the subscription to update. Must be equal to the product_id field on the Subscription resource. */
  productId?: string;
  /** Required. Package name of the parent app. Must be equal to the package_name field on the Subscription resource. */
  packageName?: string;
  /** Required. The version of the available regions being used for the regional_price_migrations. */
  regionsVersion?: RegionsVersion;
}

export const MigrateBasePlanPricesRequest: Schema.Schema<MigrateBasePlanPricesRequest> = Schema.suspend(() => Schema.Struct({
  basePlanId: Schema.optional(Schema.String),
  regionalPriceMigrations: Schema.optional(Schema.Array(RegionalPriceMigrationConfig)),
  latencyTolerance: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  regionsVersion: Schema.optional(RegionsVersion),
})).annotate({ identifier: "MigrateBasePlanPricesRequest" }) as any as Schema.Schema<MigrateBasePlanPricesRequest>;

export interface ArchiveSubscriptionRequest {
}

export const ArchiveSubscriptionRequest: Schema.Schema<ArchiveSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ArchiveSubscriptionRequest" }) as any as Schema.Schema<ArchiveSubscriptionRequest>;

export interface SubscriptionPurchasesDeferRequest {
  /** The information about the new desired expiry time for the subscription. */
  deferralInfo?: SubscriptionDeferralInfo;
}

export const SubscriptionPurchasesDeferRequest: Schema.Schema<SubscriptionPurchasesDeferRequest> = Schema.suspend(() => Schema.Struct({
  deferralInfo: Schema.optional(SubscriptionDeferralInfo),
})).annotate({ identifier: "SubscriptionPurchasesDeferRequest" }) as any as Schema.Schema<SubscriptionPurchasesDeferRequest>;

export interface BatchUpdateBasePlanStatesResponse {
  /** The list of updated subscriptions. This list will match the requests one to one, in the same order. */
  subscriptions?: Array<Subscription>;
}

export const BatchUpdateBasePlanStatesResponse: Schema.Schema<BatchUpdateBasePlanStatesResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Subscription)),
})).annotate({ identifier: "BatchUpdateBasePlanStatesResponse" }) as any as Schema.Schema<BatchUpdateBasePlanStatesResponse>;

export interface DeviceTier {
  /** Groups of devices included in this tier. These groups must be defined explicitly under device_groups in this configuration. */
  deviceGroupNames?: Array<string>;
  /** The priority level of the tier. Tiers are evaluated in descending order of level: the highest level tier has the highest priority. The highest tier matching a given device is selected for that device. You should use a contiguous range of levels for your tiers in a tier set; tier levels in a tier set must be unique. For instance, if your tier set has 4 tiers (including the global fallback), you should define tiers 1, 2 and 3 in this configuration. Note: tier 0 is implicitly defined as a global fallback and selected for devices that don't match any of the tiers explicitly defined here. You mustn't define level 0 explicitly in this configuration. */
  level?: number;
}

export const DeviceTier: Schema.Schema<DeviceTier> = Schema.suspend(() => Schema.Struct({
  deviceGroupNames: Schema.optional(Schema.Array(Schema.String)),
  level: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeviceTier" }) as any as Schema.Schema<DeviceTier>;

export interface DeviceTierSet {
  /** Device tiers belonging to the set. */
  deviceTiers?: Array<DeviceTier>;
}

export const DeviceTierSet: Schema.Schema<DeviceTierSet> = Schema.suspend(() => Schema.Struct({
  deviceTiers: Schema.optional(Schema.Array(DeviceTier)),
})).annotate({ identifier: "DeviceTierSet" }) as any as Schema.Schema<DeviceTierSet>;

export interface ConvertRegionPricesResponse {
  /** The region version at which the prices were generated. */
  regionVersion?: RegionsVersion;
  /** Map from region code to converted region price. */
  convertedRegionPrices?: Record<string, ConvertedRegionPrice>;
  /** Converted other regions prices in USD and EUR, to use for countries where Play doesn't support a country's local currency. */
  convertedOtherRegionsPrice?: ConvertedOtherRegionsPrice;
}

export const ConvertRegionPricesResponse: Schema.Schema<ConvertRegionPricesResponse> = Schema.suspend(() => Schema.Struct({
  regionVersion: Schema.optional(RegionsVersion),
  convertedRegionPrices: Schema.optional(Schema.Record(Schema.String, ConvertedRegionPrice)),
  convertedOtherRegionsPrice: Schema.optional(ConvertedOtherRegionsPrice),
})).annotate({ identifier: "ConvertRegionPricesResponse" }) as any as Schema.Schema<ConvertRegionPricesResponse>;

export interface CountryTargeting {
  /** Include "rest of world" as well as explicitly targeted countries. */
  includeRestOfWorld?: boolean;
  /** Countries to target, specified as two letter [CLDR codes](https://unicode.org/cldr/charts/latest/supplemental/territory_containment_un_m_49.html). */
  countries?: Array<string>;
}

export const CountryTargeting: Schema.Schema<CountryTargeting> = Schema.suspend(() => Schema.Struct({
  includeRestOfWorld: Schema.optional(Schema.Boolean),
  countries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CountryTargeting" }) as any as Schema.Schema<CountryTargeting>;

export interface AppEdit {
  /** Output only. Identifier of the edit. Can be used in subsequent API calls. */
  id?: string;
  /** Output only. The time (as seconds since Epoch) at which the edit will expire and will be no longer valid for use. */
  expiryTimeSeconds?: string;
}

export const AppEdit: Schema.Schema<AppEdit> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  expiryTimeSeconds: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEdit" }) as any as Schema.Schema<AppEdit>;

export interface AcquisitionTargetingRule {
  /** Required. The scope of subscriptions this rule considers. Only allows "this subscription" and "any subscription in app". */
  scope?: TargetingRuleScope;
}

export const AcquisitionTargetingRule: Schema.Schema<AcquisitionTargetingRule> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(TargetingRuleScope),
})).annotate({ identifier: "AcquisitionTargetingRule" }) as any as Schema.Schema<AcquisitionTargetingRule>;

export interface SubscriptionOfferTargeting {
  /** Offer targeting rule for new user acquisition. */
  acquisitionRule?: AcquisitionTargetingRule;
  /** Offer targeting rule for upgrading users' existing plans. */
  upgradeRule?: UpgradeTargetingRule;
}

export const SubscriptionOfferTargeting: Schema.Schema<SubscriptionOfferTargeting> = Schema.suspend(() => Schema.Struct({
  acquisitionRule: Schema.optional(AcquisitionTargetingRule),
  upgradeRule: Schema.optional(UpgradeTargetingRule),
})).annotate({ identifier: "SubscriptionOfferTargeting" }) as any as Schema.Schema<SubscriptionOfferTargeting>;

export interface RegionalSubscriptionOfferConfig {
  /** Required. Immutable. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US". */
  regionCode?: string;
  /** Whether the subscription offer in the specified region is available for new subscribers. Existing subscribers will not have their subscription cancelled if this value is set to false. If not specified, this will default to false. */
  newSubscriberAvailability?: boolean;
}

export const RegionalSubscriptionOfferConfig: Schema.Schema<RegionalSubscriptionOfferConfig> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  newSubscriberAvailability: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RegionalSubscriptionOfferConfig" }) as any as Schema.Schema<RegionalSubscriptionOfferConfig>;

export interface SubscriptionOffer {
  /** Required. Immutable. The ID of the base plan to which this offer is an extension. */
  basePlanId?: string;
  /** The configuration for any new locations Play may launch in the future. */
  otherRegionsConfig?: OtherRegionsSubscriptionOfferConfig;
  /** Required. Immutable. The ID of the parent subscription this offer belongs to. */
  productId?: string;
  /** Output only. The current state of this offer. Can be changed using Activate and Deactivate actions. NB: the base plan state supersedes this state, so an active offer may not be available if the base plan is not active. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "INACTIVE" | (string & {});
  /** The requirements that users need to fulfil to be eligible for this offer. Represents the requirements that Play will evaluate to decide whether an offer should be returned. Developers may further filter these offers themselves. */
  targeting?: SubscriptionOfferTargeting;
  /** Required. Immutable. Unique ID of this subscription offer. Must be unique within the base plan. */
  offerId?: string;
  /** Required. The phases of this subscription offer. Must contain at least one and at most two entries. Users will always receive all these phases in the specified order. */
  phases?: Array<SubscriptionOfferPhase>;
  /** Required. The region-specific configuration of this offer. Must contain at least one entry. */
  regionalConfigs?: Array<RegionalSubscriptionOfferConfig>;
  /** Required. Immutable. The package name of the app the parent subscription belongs to. */
  packageName?: string;
  /** List of up to 20 custom tags specified for this offer, and returned to the app through the billing library. */
  offerTags?: Array<OfferTag>;
}

export const SubscriptionOffer: Schema.Schema<SubscriptionOffer> = Schema.suspend(() => Schema.Struct({
  basePlanId: Schema.optional(Schema.String),
  otherRegionsConfig: Schema.optional(OtherRegionsSubscriptionOfferConfig),
  productId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  targeting: Schema.optional(SubscriptionOfferTargeting),
  offerId: Schema.optional(Schema.String),
  phases: Schema.optional(Schema.Array(SubscriptionOfferPhase)),
  regionalConfigs: Schema.optional(Schema.Array(RegionalSubscriptionOfferConfig)),
  packageName: Schema.optional(Schema.String),
  offerTags: Schema.optional(Schema.Array(OfferTag)),
})).annotate({ identifier: "SubscriptionOffer" }) as any as Schema.Schema<SubscriptionOffer>;

export interface BatchUpdateSubscriptionOfferStatesResponse {
  /** The updated subscription offers list. */
  subscriptionOffers?: Array<SubscriptionOffer>;
}

export const BatchUpdateSubscriptionOfferStatesResponse: Schema.Schema<BatchUpdateSubscriptionOfferStatesResponse> = Schema.suspend(() => Schema.Struct({
  subscriptionOffers: Schema.optional(Schema.Array(SubscriptionOffer)),
})).annotate({ identifier: "BatchUpdateSubscriptionOfferStatesResponse" }) as any as Schema.Schema<BatchUpdateSubscriptionOfferStatesResponse>;

export interface Review {
  /** Unique identifier for this review. */
  reviewId?: string;
  /** A repeated field containing comments for the review. */
  comments?: Array<Comment>;
  /** The name of the user who wrote the review. */
  authorName?: string;
}

export const Review: Schema.Schema<Review> = Schema.suspend(() => Schema.Struct({
  reviewId: Schema.optional(Schema.String),
  comments: Schema.optional(Schema.Array(Comment)),
  authorName: Schema.optional(Schema.String),
})).annotate({ identifier: "Review" }) as any as Schema.Schema<Review>;

export interface UpdateSubscriptionRequest {
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Required. The subscription to update. */
  subscription?: Subscription;
  /** Required. The version of the available regions being used for the subscription. */
  regionsVersion?: RegionsVersion;
  /** Optional. If set to true, and the subscription with the given package_name and product_id doesn't exist, the subscription will be created. If a new subscription is created, update_mask is ignored. */
  allowMissing?: boolean;
}

export const UpdateSubscriptionRequest: Schema.Schema<UpdateSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  subscription: Schema.optional(Subscription),
  regionsVersion: Schema.optional(RegionsVersion),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UpdateSubscriptionRequest" }) as any as Schema.Schema<UpdateSubscriptionRequest>;

export interface BatchUpdateSubscriptionsRequest {
  /** Required. A list of update requests of up to 100 elements. All requests must update different subscriptions. */
  requests?: Array<UpdateSubscriptionRequest>;
}

export const BatchUpdateSubscriptionsRequest: Schema.Schema<BatchUpdateSubscriptionsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateSubscriptionRequest)),
})).annotate({ identifier: "BatchUpdateSubscriptionsRequest" }) as any as Schema.Schema<BatchUpdateSubscriptionsRequest>;

export interface DeactivateSubscriptionOfferRequest {
  /** Required. The parent subscription (ID) of the offer to deactivate. */
  productId?: string;
  /** Required. The parent app (package name) of the offer to deactivate. */
  packageName?: string;
  /** Required. The parent base plan (ID) of the offer to deactivate. */
  basePlanId?: string;
  /** Required. The unique offer ID of the offer to deactivate. */
  offerId?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
}

export const DeactivateSubscriptionOfferRequest: Schema.Schema<DeactivateSubscriptionOfferRequest> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  basePlanId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
})).annotate({ identifier: "DeactivateSubscriptionOfferRequest" }) as any as Schema.Schema<DeactivateSubscriptionOfferRequest>;

export interface RevokeSubscriptionPurchaseRequest {
  /** Required. Additional details around the subscription revocation. */
  revocationContext?: RevocationContext;
}

export const RevokeSubscriptionPurchaseRequest: Schema.Schema<RevokeSubscriptionPurchaseRequest> = Schema.suspend(() => Schema.Struct({
  revocationContext: Schema.optional(RevocationContext),
})).annotate({ identifier: "RevokeSubscriptionPurchaseRequest" }) as any as Schema.Schema<RevokeSubscriptionPurchaseRequest>;

export interface Testers {
  /** All testing Google Groups, as email addresses. */
  googleGroups?: Array<string>;
}

export const Testers: Schema.Schema<Testers> = Schema.suspend(() => Schema.Struct({
  googleGroups: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Testers" }) as any as Schema.Schema<Testers>;

export interface MigrateBasePlanPricesResponse {
}

export const MigrateBasePlanPricesResponse: Schema.Schema<MigrateBasePlanPricesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MigrateBasePlanPricesResponse" }) as any as Schema.Schema<MigrateBasePlanPricesResponse>;

export interface BatchMigrateBasePlanPricesResponse {
  /** Contains one response per requested price migration, in the same order as the request. */
  responses?: Array<MigrateBasePlanPricesResponse>;
}

export const BatchMigrateBasePlanPricesResponse: Schema.Schema<BatchMigrateBasePlanPricesResponse> = Schema.suspend(() => Schema.Struct({
  responses: Schema.optional(Schema.Array(MigrateBasePlanPricesResponse)),
})).annotate({ identifier: "BatchMigrateBasePlanPricesResponse" }) as any as Schema.Schema<BatchMigrateBasePlanPricesResponse>;

export interface UpdateSubscriptionOfferStateRequest {
  /** Activates an offer. Once activated, the offer will be available to new subscribers. */
  activateSubscriptionOfferRequest?: ActivateSubscriptionOfferRequest;
  /** Deactivates an offer. Once deactivated, the offer will become unavailable to new subscribers, but existing subscribers will maintain their subscription */
  deactivateSubscriptionOfferRequest?: DeactivateSubscriptionOfferRequest;
}

export const UpdateSubscriptionOfferStateRequest: Schema.Schema<UpdateSubscriptionOfferStateRequest> = Schema.suspend(() => Schema.Struct({
  activateSubscriptionOfferRequest: Schema.optional(ActivateSubscriptionOfferRequest),
  deactivateSubscriptionOfferRequest: Schema.optional(DeactivateSubscriptionOfferRequest),
})).annotate({ identifier: "UpdateSubscriptionOfferStateRequest" }) as any as Schema.Schema<UpdateSubscriptionOfferStateRequest>;

export interface BatchUpdateSubscriptionOfferStatesRequest {
  /** Required. The update request list of up to 100 elements. All requests must update different offers. */
  requests?: Array<UpdateSubscriptionOfferStateRequest>;
}

export const BatchUpdateSubscriptionOfferStatesRequest: Schema.Schema<BatchUpdateSubscriptionOfferStatesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateSubscriptionOfferStateRequest)),
})).annotate({ identifier: "BatchUpdateSubscriptionOfferStatesRequest" }) as any as Schema.Schema<BatchUpdateSubscriptionOfferStatesRequest>;

export interface ApksAddExternallyHostedResponse {
  /** The definition of the externally-hosted APK and where it is located. */
  externallyHostedApk?: ExternallyHostedApk;
}

export const ApksAddExternallyHostedResponse: Schema.Schema<ApksAddExternallyHostedResponse> = Schema.suspend(() => Schema.Struct({
  externallyHostedApk: Schema.optional(ExternallyHostedApk),
})).annotate({ identifier: "ApksAddExternallyHostedResponse" }) as any as Schema.Schema<ApksAddExternallyHostedResponse>;

export interface BatchUpdateOneTimeProductsResponse {
  /** The list of updated one-time products list, in the same order as the request. */
  oneTimeProducts?: Array<OneTimeProduct>;
}

export const BatchUpdateOneTimeProductsResponse: Schema.Schema<BatchUpdateOneTimeProductsResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProducts: Schema.optional(Schema.Array(OneTimeProduct)),
})).annotate({ identifier: "BatchUpdateOneTimeProductsResponse" }) as any as Schema.Schema<BatchUpdateOneTimeProductsResponse>;

export interface SubscriptionCancelSurveyResult {
  /** The cancellation reason the user chose in the survey. Possible values are: 0. Other 1. I don't use this service enough 2. Technical issues 3. Cost-related reasons 4. I found a better app */
  cancelSurveyReason?: number;
  /** The customized input cancel reason from the user. Only present when cancelReason is 0. */
  userInputCancelReason?: string;
}

export const SubscriptionCancelSurveyResult: Schema.Schema<SubscriptionCancelSurveyResult> = Schema.suspend(() => Schema.Struct({
  cancelSurveyReason: Schema.optional(Schema.Number),
  userInputCancelReason: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionCancelSurveyResult" }) as any as Schema.Schema<SubscriptionCancelSurveyResult>;

export interface UpdateSubscriptionOfferRequest {
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Optional. If set to true, and the subscription offer with the given package_name, product_id, base_plan_id and offer_id doesn't exist, an offer will be created. If a new offer is created, update_mask is ignored. */
  allowMissing?: boolean;
  /** Required. The subscription offer to update. */
  subscriptionOffer?: SubscriptionOffer;
  /** Required. The version of the available regions being used for the subscription_offer. */
  regionsVersion?: RegionsVersion;
}

export const UpdateSubscriptionOfferRequest: Schema.Schema<UpdateSubscriptionOfferRequest> = Schema.suspend(() => Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  allowMissing: Schema.optional(Schema.Boolean),
  subscriptionOffer: Schema.optional(SubscriptionOffer),
  regionsVersion: Schema.optional(RegionsVersion),
})).annotate({ identifier: "UpdateSubscriptionOfferRequest" }) as any as Schema.Schema<UpdateSubscriptionOfferRequest>;

export interface BatchUpdateSubscriptionOffersRequest {
  /** Required. A list of update requests of up to 100 elements. All requests must update different subscription offers. */
  requests?: Array<UpdateSubscriptionOfferRequest>;
}

export const BatchUpdateSubscriptionOffersRequest: Schema.Schema<BatchUpdateSubscriptionOffersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateSubscriptionOfferRequest)),
})).annotate({ identifier: "BatchUpdateSubscriptionOffersRequest" }) as any as Schema.Schema<BatchUpdateSubscriptionOffersRequest>;

export interface OneTimeExternalTransaction {
  /** Input only. Provided during the call to Create. Retrieved from the client when the alternative billing flow is launched. */
  externalTransactionToken?: string;
}

export const OneTimeExternalTransaction: Schema.Schema<OneTimeExternalTransaction> = Schema.suspend(() => Schema.Struct({
  externalTransactionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "OneTimeExternalTransaction" }) as any as Schema.Schema<OneTimeExternalTransaction>;

export interface VoidedPurchase {
  /** The time at which the purchase was made, in milliseconds since the epoch (Jan 1, 1970). */
  purchaseTimeMillis?: string;
  /** The reason why the purchase was voided, possible values are: 0. Other 1. Remorse 2. Not_received 3. Defective 4. Accidental_purchase 5. Fraud 6. Friendly_fraud 7. Chargeback 8. Unacknowledged_purchase */
  voidedReason?: number;
  /** The time at which the purchase was canceled/refunded/charged-back, in milliseconds since the epoch (Jan 1, 1970). */
  voidedTimeMillis?: string;
  /** The initiator of voided purchase, possible values are: 0. User 1. Developer 2. Google */
  voidedSource?: number;
  /** The order id which uniquely identifies a one-time purchase, subscription purchase, or subscription renewal. */
  orderId?: string;
  /** The token which uniquely identifies a one-time purchase or subscription. To uniquely identify subscription renewals use order_id (available starting from version 3 of the API). */
  purchaseToken?: string;
  /** The voided quantity as the result of a quantity-based partial refund. Voided purchases of quantity-based partial refunds may only be returned when includeQuantityBasedPartialRefund is set to true. */
  voidedQuantity?: number;
  /** This kind represents a voided purchase object in the androidpublisher service. */
  kind?: string;
}

export const VoidedPurchase: Schema.Schema<VoidedPurchase> = Schema.suspend(() => Schema.Struct({
  purchaseTimeMillis: Schema.optional(Schema.String),
  voidedReason: Schema.optional(Schema.Number),
  voidedTimeMillis: Schema.optional(Schema.String),
  voidedSource: Schema.optional(Schema.Number),
  orderId: Schema.optional(Schema.String),
  purchaseToken: Schema.optional(Schema.String),
  voidedQuantity: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "VoidedPurchase" }) as any as Schema.Schema<VoidedPurchase>;

export interface VoidedPurchasesListResponse {
  /** Pagination information for token pagination. */
  tokenPagination?: TokenPagination;
  /** General pagination information. */
  pageInfo?: PageInfo;
  voidedPurchases?: Array<VoidedPurchase>;
}

export const VoidedPurchasesListResponse: Schema.Schema<VoidedPurchasesListResponse> = Schema.suspend(() => Schema.Struct({
  tokenPagination: Schema.optional(TokenPagination),
  pageInfo: Schema.optional(PageInfo),
  voidedPurchases: Schema.optional(Schema.Array(VoidedPurchase)),
})).annotate({ identifier: "VoidedPurchasesListResponse" }) as any as Schema.Schema<VoidedPurchasesListResponse>;

export interface DeviceTierConfig {
  /** Output only. The device tier config ID. */
  deviceTierConfigId?: string;
  /** Definition of device groups for the app. */
  deviceGroups?: Array<DeviceGroup>;
  /** Definition of user country sets for the app. */
  userCountrySets?: Array<UserCountrySet>;
  /** Definition of the set of device tiers for the app. */
  deviceTierSet?: DeviceTierSet;
}

export const DeviceTierConfig: Schema.Schema<DeviceTierConfig> = Schema.suspend(() => Schema.Struct({
  deviceTierConfigId: Schema.optional(Schema.String),
  deviceGroups: Schema.optional(Schema.Array(DeviceGroup)),
  userCountrySets: Schema.optional(Schema.Array(UserCountrySet)),
  deviceTierSet: Schema.optional(DeviceTierSet),
})).annotate({ identifier: "DeviceTierConfig" }) as any as Schema.Schema<DeviceTierConfig>;

export interface CancellationContext {
  /** Required. The type of cancellation for the purchased subscription. */
  cancellationType?: "CANCELLATION_TYPE_UNSPECIFIED" | "USER_REQUESTED_STOP_RENEWALS" | "DEVELOPER_REQUESTED_STOP_PAYMENTS" | (string & {});
}

export const CancellationContext: Schema.Schema<CancellationContext> = Schema.suspend(() => Schema.Struct({
  cancellationType: Schema.optional(Schema.String),
})).annotate({ identifier: "CancellationContext" }) as any as Schema.Schema<CancellationContext>;

export interface CancelSubscriptionPurchaseRequest {
  /** Required. Additional details around the subscription revocation. */
  cancellationContext?: CancellationContext;
}

export const CancelSubscriptionPurchaseRequest: Schema.Schema<CancelSubscriptionPurchaseRequest> = Schema.suspend(() => Schema.Struct({
  cancellationContext: Schema.optional(CancellationContext),
})).annotate({ identifier: "CancelSubscriptionPurchaseRequest" }) as any as Schema.Schema<CancelSubscriptionPurchaseRequest>;

export interface ListOneTimeProductOffersResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The one_time_product offers from the specified request. */
  oneTimeProductOffers?: Array<OneTimeProductOffer>;
}

export const ListOneTimeProductOffersResponse: Schema.Schema<ListOneTimeProductOffersResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  oneTimeProductOffers: Schema.optional(Schema.Array(OneTimeProductOffer)),
})).annotate({ identifier: "ListOneTimeProductOffersResponse" }) as any as Schema.Schema<ListOneTimeProductOffersResponse>;

export interface BatchGetOneTimeProductOffersResponse {
  /** The list of updated one-time product offers, in the same order as the request. */
  oneTimeProductOffers?: Array<OneTimeProductOffer>;
}

export const BatchGetOneTimeProductOffersResponse: Schema.Schema<BatchGetOneTimeProductOffersResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProductOffers: Schema.optional(Schema.Array(OneTimeProductOffer)),
})).annotate({ identifier: "BatchGetOneTimeProductOffersResponse" }) as any as Schema.Schema<BatchGetOneTimeProductOffersResponse>;

export interface BatchUpdateOneTimeProductOfferStatesResponse {
  /** The updated one-time product offers list, in the same order as the request. */
  oneTimeProductOffers?: Array<OneTimeProductOffer>;
}

export const BatchUpdateOneTimeProductOfferStatesResponse: Schema.Schema<BatchUpdateOneTimeProductOfferStatesResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProductOffers: Schema.optional(Schema.Array(OneTimeProductOffer)),
})).annotate({ identifier: "BatchUpdateOneTimeProductOfferStatesResponse" }) as any as Schema.Schema<BatchUpdateOneTimeProductOfferStatesResponse>;

export interface BatchUpdateSubscriptionsResponse {
  /** The updated subscriptions list. */
  subscriptions?: Array<Subscription>;
}

export const BatchUpdateSubscriptionsResponse: Schema.Schema<BatchUpdateSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Subscription)),
})).annotate({ identifier: "BatchUpdateSubscriptionsResponse" }) as any as Schema.Schema<BatchUpdateSubscriptionsResponse>;

export interface ExternalTransactionAddress {
  /** Required. Two letter region code based on ISO-3166-1 Alpha-2 (UN region codes). */
  regionCode?: string;
  /** Optional. Top-level administrative subdivision of the country/region. Only required for transactions in India. Valid values are "ANDAMAN AND NICOBAR ISLANDS", "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHANDIGARH", "CHHATTISGARH", "DADRA AND NAGAR HAVELI", "DADRA AND NAGAR HAVELI AND DAMAN AND DIU", "DAMAN AND DIU", "DELHI", "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JAMMU AND KASHMIR", "JHARKHAND", "KARNATAKA", "KERALA", "LADAKH", "LAKSHADWEEP", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM", "NAGALAND", "ODISHA", "PUDUCHERRY", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", and "WEST BENGAL". */
  administrativeArea?: string;
}

export const ExternalTransactionAddress: Schema.Schema<ExternalTransactionAddress> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalTransactionAddress" }) as any as Schema.Schema<ExternalTransactionAddress>;

export interface ExternalTransactionTestPurchase {
}

export const ExternalTransactionTestPurchase: Schema.Schema<ExternalTransactionTestPurchase> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExternalTransactionTestPurchase" }) as any as Schema.Schema<ExternalTransactionTestPurchase>;

export interface ExternalTransaction {
  /** This transaction is part of a recurring series of transactions. */
  recurringTransaction?: RecurringExternalTransaction;
  /** Output only. The current tax amount. This represents the current tax amount including any refunds that may have been applied to this transaction. */
  currentTaxAmount?: Price;
  /** Output only. The current transaction amount before tax. This represents the current pre-tax amount including any refunds that may have been applied to this transaction. */
  currentPreTaxAmount?: Price;
  /** Output only. The id of this transaction. All transaction ids under the same package name must be unique. Set when creating the external transaction. */
  externalTransactionId?: string;
  /** Required. The original tax amount. This represents the tax amount originally notified to Google before any refunds were applied. */
  originalTaxAmount?: Price;
  /** Required. User address for tax computation. */
  userTaxAddress?: ExternalTransactionAddress;
  /** This is a one-time transaction and not part of a subscription. */
  oneTimeTransaction?: OneTimeExternalTransaction;
  /** Optional. The transaction program code, used to help determine service fee for eligible apps participating in partner programs. Developers participating in the Play Media Experience Program (https://play.google.com/console/about/programs/mediaprogram/) must provide the program code when reporting alternative billing transactions. If you are an eligible developer, please contact your BDM for more information on how to set this field. Note: this field can not be used for external offers transactions. */
  transactionProgramCode?: number;
  /** Output only. The time when this transaction was created. This is the time when Google was notified of the transaction. */
  createTime?: string;
  /** Output only. The resource name of the external transaction. The package name of the application the inapp products were sold (for example, 'com.some.app'). */
  packageName?: string;
  /** Output only. If set, this transaction was a test purchase. Google will not charge for a test transaction. */
  testPurchase?: ExternalTransactionTestPurchase;
  /** Required. The time when the transaction was completed. */
  transactionTime?: string;
  /** Output only. The current state of the transaction. */
  transactionState?: "TRANSACTION_STATE_UNSPECIFIED" | "TRANSACTION_REPORTED" | "TRANSACTION_CANCELED" | (string & {});
  /** Optional. Details necessary to accurately report external offers transactions. */
  externalOfferDetails?: ExternalOfferDetails;
  /** Required. The original transaction amount before taxes. This represents the pre-tax amount originally notified to Google before any refunds were applied. */
  originalPreTaxAmount?: Price;
}

export const ExternalTransaction: Schema.Schema<ExternalTransaction> = Schema.suspend(() => Schema.Struct({
  recurringTransaction: Schema.optional(RecurringExternalTransaction),
  currentTaxAmount: Schema.optional(Price),
  currentPreTaxAmount: Schema.optional(Price),
  externalTransactionId: Schema.optional(Schema.String),
  originalTaxAmount: Schema.optional(Price),
  userTaxAddress: Schema.optional(ExternalTransactionAddress),
  oneTimeTransaction: Schema.optional(OneTimeExternalTransaction),
  transactionProgramCode: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  testPurchase: Schema.optional(ExternalTransactionTestPurchase),
  transactionTime: Schema.optional(Schema.String),
  transactionState: Schema.optional(Schema.String),
  externalOfferDetails: Schema.optional(ExternalOfferDetails),
  originalPreTaxAmount: Schema.optional(Price),
})).annotate({ identifier: "ExternalTransaction" }) as any as Schema.Schema<ExternalTransaction>;

export interface ConvertRegionPricesRequest {
  /** The intital price to convert other regions from. Tax exclusive. */
  price?: Money;
  /** Optional. Product tax category code in context. Product tax category determines the transaction tax rates applied to the product that will be factored into the price calculation. If not set, tax rates for the default product tax category will be used. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information. */
  productTaxCategoryCode?: string;
}

export const ConvertRegionPricesRequest: Schema.Schema<ConvertRegionPricesRequest> = Schema.suspend(() => Schema.Struct({
  price: Schema.optional(Money),
  productTaxCategoryCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ConvertRegionPricesRequest" }) as any as Schema.Schema<ConvertRegionPricesRequest>;

export interface DeferSubscriptionPurchaseResponse {
  /** The new expiry time for each subscription items. */
  itemExpiryTimeDetails?: Array<ItemExpiryTimeDetails>;
}

export const DeferSubscriptionPurchaseResponse: Schema.Schema<DeferSubscriptionPurchaseResponse> = Schema.suspend(() => Schema.Struct({
  itemExpiryTimeDetails: Schema.optional(Schema.Array(ItemExpiryTimeDetails)),
})).annotate({ identifier: "DeferSubscriptionPurchaseResponse" }) as any as Schema.Schema<DeferSubscriptionPurchaseResponse>;

export interface DeleteOneTimeProductOfferRequest {
  /** Required. The unique offer ID of the offer to delete. */
  offerId?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent one-time product (ID) of the offer to delete. */
  productId?: string;
  /** Required. The parent app (package name) of the offer to delete. */
  packageName?: string;
  /** Required. The parent purchase option (ID) of the offer to delete. */
  purchaseOptionId?: string;
}

export const DeleteOneTimeProductOfferRequest: Schema.Schema<DeleteOneTimeProductOfferRequest> = Schema.suspend(() => Schema.Struct({
  offerId: Schema.optional(Schema.String),
  latencyTolerance: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  purchaseOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteOneTimeProductOfferRequest" }) as any as Schema.Schema<DeleteOneTimeProductOfferRequest>;

export interface ListSubscriptionOffersResponse {
  /** The subscription offers from the specified subscription. */
  subscriptionOffers?: Array<SubscriptionOffer>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSubscriptionOffersResponse: Schema.Schema<ListSubscriptionOffersResponse> = Schema.suspend(() => Schema.Struct({
  subscriptionOffers: Schema.optional(Schema.Array(SubscriptionOffer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSubscriptionOffersResponse" }) as any as Schema.Schema<ListSubscriptionOffersResponse>;

export interface ApksAddExternallyHostedRequest {
  /** The definition of the externally-hosted APK and where it is located. */
  externallyHostedApk?: ExternallyHostedApk;
}

export const ApksAddExternallyHostedRequest: Schema.Schema<ApksAddExternallyHostedRequest> = Schema.suspend(() => Schema.Struct({
  externallyHostedApk: Schema.optional(ExternallyHostedApk),
})).annotate({ identifier: "ApksAddExternallyHostedRequest" }) as any as Schema.Schema<ApksAddExternallyHostedRequest>;

export interface ProductPurchase {
  /** ISO 3166-1 alpha-2 billing region code of the user at the time the product was granted. */
  regionCode?: string;
  /** An obfuscated version of the id that is uniquely associated with the user's account in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid when the purchase was made. */
  obfuscatedExternalAccountId?: string;
  /** The inapp product SKU. May not be present. */
  productId?: string;
  /** The purchase token generated to identify this purchase. May not be present. */
  purchaseToken?: string;
  /** The quantity associated with the purchase of the inapp product. If not present, the quantity is 1. */
  quantity?: number;
  /** An obfuscated version of the id that is uniquely associated with the user's profile in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid when the purchase was made. */
  obfuscatedExternalProfileId?: string;
  /** The time the product was purchased, in milliseconds since the epoch (Jan 1, 1970). */
  purchaseTimeMillis?: string;
  /** The acknowledgement state of the inapp product. Possible values are: 0. Yet to be acknowledged 1. Acknowledged */
  acknowledgementState?: number;
  /** The purchase state of the order. Possible values are: 0. Purchased 1. Canceled 2. Pending */
  purchaseState?: number;
  /** The order id associated with the purchase of the inapp product. */
  orderId?: string;
  /** The consumption state of the inapp product. Possible values are: 0. Yet to be consumed 1. Consumed */
  consumptionState?: number;
  /** This kind represents an inappPurchase object in the androidpublisher service. */
  kind?: string;
  /** A developer-specified string that contains supplemental information about an order. */
  developerPayload?: string;
  /** The type of purchase of the inapp product. This field is only set if this purchase was not made using the standard in-app billing flow. Possible values are: 0. Test (i.e. purchased from a license testing account) 1. Promo (i.e. purchased using a promo code). Does not include Play Points purchases. 2. Rewarded (i.e. from watching a video ad instead of paying) */
  purchaseType?: number;
  /** The quantity eligible for refund, i.e. quantity that hasn't been refunded. The value reflects quantity-based partial refunds and full refunds. */
  refundableQuantity?: number;
}

export const ProductPurchase: Schema.Schema<ProductPurchase> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  obfuscatedExternalAccountId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  purchaseToken: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.Number),
  obfuscatedExternalProfileId: Schema.optional(Schema.String),
  purchaseTimeMillis: Schema.optional(Schema.String),
  acknowledgementState: Schema.optional(Schema.Number),
  purchaseState: Schema.optional(Schema.Number),
  orderId: Schema.optional(Schema.String),
  consumptionState: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  developerPayload: Schema.optional(Schema.String),
  purchaseType: Schema.optional(Schema.Number),
  refundableQuantity: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProductPurchase" }) as any as Schema.Schema<ProductPurchase>;

export interface Listing {
  /** Full description of the app. */
  fullDescription?: string;
  /** Localized title of the app. */
  title?: string;
  /** URL of a promotional YouTube video for the app. */
  video?: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language?: string;
  /** Short description of the app. */
  shortDescription?: string;
}

export const Listing: Schema.Schema<Listing> = Schema.suspend(() => Schema.Struct({
  fullDescription: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  video: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  shortDescription: Schema.optional(Schema.String),
})).annotate({ identifier: "Listing" }) as any as Schema.Schema<Listing>;

export interface ListingsListResponse {
  /** The kind of this response ("androidpublisher#listingsListResponse"). */
  kind?: string;
  /** All localized listings. */
  listings?: Array<Listing>;
}

export const ListingsListResponse: Schema.Schema<ListingsListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  listings: Schema.optional(Schema.Array(Listing)),
})).annotate({ identifier: "ListingsListResponse" }) as any as Schema.Schema<ListingsListResponse>;

export interface BatchUpdateOneTimeProductOffersRequest {
  /** Required. A list of update requests of up to 100 elements. All requests must update different offers. */
  requests?: Array<UpdateOneTimeProductOfferRequest>;
}

export const BatchUpdateOneTimeProductOffersRequest: Schema.Schema<BatchUpdateOneTimeProductOffersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateOneTimeProductOfferRequest)),
})).annotate({ identifier: "BatchUpdateOneTimeProductOffersRequest" }) as any as Schema.Schema<BatchUpdateOneTimeProductOffersRequest>;

export interface CancelSubscriptionPurchaseResponse {
}

export const CancelSubscriptionPurchaseResponse: Schema.Schema<CancelSubscriptionPurchaseResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelSubscriptionPurchaseResponse" }) as any as Schema.Schema<CancelSubscriptionPurchaseResponse>;

export interface RemoteInAppUpdate {
  /** Required. Set to true if Remote In-App Update action type is needed. */
  isRemoteInAppUpdateRequested?: boolean;
}

export const RemoteInAppUpdate: Schema.Schema<RemoteInAppUpdate> = Schema.suspend(() => Schema.Struct({
  isRemoteInAppUpdateRequested: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemoteInAppUpdate" }) as any as Schema.Schema<RemoteInAppUpdate>;

export interface CreateDraftAppRecoveryRequest {
  /** Action type is remote in-app update. As a consequence of this action, a downloadable recovery module is also created for testing purposes. */
  remoteInAppUpdate?: RemoteInAppUpdate;
  /** Specifies targeting criteria for the recovery action such as regions, android sdk versions, app versions etc. */
  targeting?: Targeting;
}

export const CreateDraftAppRecoveryRequest: Schema.Schema<CreateDraftAppRecoveryRequest> = Schema.suspend(() => Schema.Struct({
  remoteInAppUpdate: Schema.optional(RemoteInAppUpdate),
  targeting: Schema.optional(Targeting),
})).annotate({ identifier: "CreateDraftAppRecoveryRequest" }) as any as Schema.Schema<CreateDraftAppRecoveryRequest>;

export interface ReviewsListResponse {
  /** List of reviews. */
  reviews?: Array<Review>;
  /** Pagination token, to handle a number of products that is over one page. */
  tokenPagination?: TokenPagination;
  /** Information about the current page. */
  pageInfo?: PageInfo;
}

export const ReviewsListResponse: Schema.Schema<ReviewsListResponse> = Schema.suspend(() => Schema.Struct({
  reviews: Schema.optional(Schema.Array(Review)),
  tokenPagination: Schema.optional(TokenPagination),
  pageInfo: Schema.optional(PageInfo),
})).annotate({ identifier: "ReviewsListResponse" }) as any as Schema.Schema<ReviewsListResponse>;

export interface IntroductoryPriceInfo {
  /** ISO 4217 currency code for the introductory subscription price. For example, if the price is specified in British pounds sterling, price_currency_code is "GBP". */
  introductoryPriceCurrencyCode?: string;
  /** Introductory price of the subscription, not including tax. The currency is the same as price_currency_code. Price is expressed in micro-units, where 1,000,000 micro-units represents one unit of the currency. For example, if the subscription price is €1.99, price_amount_micros is 1990000. */
  introductoryPriceAmountMicros?: string;
  /** Introductory price period, specified in ISO 8601 format. Common values are (but not limited to) "P1W" (one week), "P1M" (one month), "P3M" (three months), "P6M" (six months), and "P1Y" (one year). */
  introductoryPricePeriod?: string;
  /** The number of billing period to offer introductory pricing. */
  introductoryPriceCycles?: number;
}

export const IntroductoryPriceInfo: Schema.Schema<IntroductoryPriceInfo> = Schema.suspend(() => Schema.Struct({
  introductoryPriceCurrencyCode: Schema.optional(Schema.String),
  introductoryPriceAmountMicros: Schema.optional(Schema.String),
  introductoryPricePeriod: Schema.optional(Schema.String),
  introductoryPriceCycles: Schema.optional(Schema.Number),
})).annotate({ identifier: "IntroductoryPriceInfo" }) as any as Schema.Schema<IntroductoryPriceInfo>;

export interface SubscriptionPurchase {
  /** The type of promotion applied on this purchase. This field is only set if a promotion is applied when the subscription was purchased. Possible values are: 0. One time code 1. Vanity code */
  promotionType?: number;
  /** An obfuscated version of the id that is uniquely associated with the user's profile in your app. Only present if specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid when the purchase was made. */
  obfuscatedExternalProfileId?: string;
  /** The time at which the subscription was canceled by the user, in milliseconds since the epoch. Only present if cancelReason is 0. */
  userCancellationTimeMillis?: string;
  /** ISO 3166-1 alpha-2 billing country/region code of the user at the time the subscription was granted. */
  countryCode?: string;
  /** Introductory price information of the subscription. This is only present when the subscription was purchased with an introductory price. This field does not indicate the subscription is currently in introductory price period. */
  introductoryPriceInfo?: IntroductoryPriceInfo;
  /** The promotion code applied on this purchase. This field is only set if a vanity code promotion is applied when the subscription was purchased. */
  promotionCode?: string;
  /** Whether the subscription will automatically be renewed when it reaches its current expiry time. */
  autoRenewing?: boolean;
  /** Time at which the subscription will expire, in milliseconds since the Epoch. */
  expiryTimeMillis?: string;
  /** Price of the subscription, For tax exclusive countries, the price doesn't include tax. For tax inclusive countries, the price includes tax. Price is expressed in micro-units, where 1,000,000 micro-units represents one unit of the currency. For example, if the subscription price is €1.99, price_amount_micros is 1990000. */
  priceAmountMicros?: string;
  /** Time at which the subscription will be automatically resumed, in milliseconds since the Epoch. Only present if the user has requested to pause the subscription. */
  autoResumeTimeMillis?: string;
  /** The order id of the latest recurring order associated with the purchase of the subscription. If the subscription was canceled because payment was declined, this will be the order id from the payment declined order. */
  orderId?: string;
  /** The payment state of the subscription. Possible values are: 0. Payment pending 1. Payment received 2. Free trial 3. Pending deferred upgrade/downgrade Not present for canceled, expired subscriptions. */
  paymentState?: number;
  /** The latest price change information available. This is present only when there is an upcoming price change for the subscription yet to be applied. Once the subscription renews with the new price or the subscription is canceled, no price change information will be returned. */
  priceChange?: SubscriptionPriceChange;
  /** The purchase token of the originating purchase if this subscription is one of the following: 0. Re-signup of a canceled but non-lapsed subscription 1. Upgrade/downgrade from a previous subscription For example, suppose a user originally signs up and you receive purchase token X, then the user cancels and goes through the resignup flow (before their subscription lapses) and you receive purchase token Y, and finally the user upgrades their subscription and you receive purchase token Z. If you call this API with purchase token Z, this field will be set to Y. If you call this API with purchase token Y, this field will be set to X. If you call this API with purchase token X, this field will not be set. */
  linkedPurchaseToken?: string;
  /** Time at which the subscription was granted, in milliseconds since the Epoch. */
  startTimeMillis?: string;
  /** The acknowledgement state of the subscription product. Possible values are: 0. Yet to be acknowledged 1. Acknowledged */
  acknowledgementState?: number;
  /** ISO 4217 currency code for the subscription price. For example, if the price is specified in British pounds sterling, price_currency_code is "GBP". */
  priceCurrencyCode?: string;
  /** An obfuscated version of the id that is uniquely associated with the user's account in your app. Present for the following purchases: * If account linking happened as part of the subscription purchase flow. * It was specified using https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid when the purchase was made. */
  obfuscatedExternalAccountId?: string;
  /** The email address of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'. */
  emailAddress?: string;
  /** User account identifier in the third-party service. Only present if account linking happened as part of the subscription purchase flow. */
  externalAccountId?: string;
  /** This kind represents a subscriptionPurchase object in the androidpublisher service. */
  kind?: string;
  /** A developer-specified string that contains supplemental information about an order. */
  developerPayload?: string;
  /** The given name of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'. */
  givenName?: string;
  /** The Google profile id of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'. */
  profileId?: string;
  /** The profile name of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'. */
  profileName?: string;
  /** The type of purchase of the subscription. This field is only set if this purchase was not made using the standard in-app billing flow. Possible values are: 0. Test (i.e. purchased from a license testing account) 1. Promo (i.e. purchased using a promo code) */
  purchaseType?: number;
  /** The reason why a subscription was canceled or is not auto-renewing. Possible values are: 0. User canceled the subscription 1. Subscription was canceled by the system, for example because of a billing problem 2. Subscription was replaced with a new subscription 3. Subscription was canceled by the developer */
  cancelReason?: number;
  /** The family name of the user when the subscription was purchased. Only present for purchases made with 'Subscribe with Google'. */
  familyName?: string;
  /** Information provided by the user when they complete the subscription cancellation flow (cancellation reason survey). */
  cancelSurveyResult?: SubscriptionCancelSurveyResult;
}

export const SubscriptionPurchase: Schema.Schema<SubscriptionPurchase> = Schema.suspend(() => Schema.Struct({
  promotionType: Schema.optional(Schema.Number),
  obfuscatedExternalProfileId: Schema.optional(Schema.String),
  userCancellationTimeMillis: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  introductoryPriceInfo: Schema.optional(IntroductoryPriceInfo),
  promotionCode: Schema.optional(Schema.String),
  autoRenewing: Schema.optional(Schema.Boolean),
  expiryTimeMillis: Schema.optional(Schema.String),
  priceAmountMicros: Schema.optional(Schema.String),
  autoResumeTimeMillis: Schema.optional(Schema.String),
  orderId: Schema.optional(Schema.String),
  paymentState: Schema.optional(Schema.Number),
  priceChange: Schema.optional(SubscriptionPriceChange),
  linkedPurchaseToken: Schema.optional(Schema.String),
  startTimeMillis: Schema.optional(Schema.String),
  acknowledgementState: Schema.optional(Schema.Number),
  priceCurrencyCode: Schema.optional(Schema.String),
  obfuscatedExternalAccountId: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
  externalAccountId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  developerPayload: Schema.optional(Schema.String),
  givenName: Schema.optional(Schema.String),
  profileId: Schema.optional(Schema.String),
  profileName: Schema.optional(Schema.String),
  purchaseType: Schema.optional(Schema.Number),
  cancelReason: Schema.optional(Schema.Number),
  familyName: Schema.optional(Schema.String),
  cancelSurveyResult: Schema.optional(SubscriptionCancelSurveyResult),
})).annotate({ identifier: "SubscriptionPurchase" }) as any as Schema.Schema<SubscriptionPurchase>;

export interface Bundle {
  /** The version code of the Android App Bundle, as specified in the Android App Bundle's base module APK manifest file. */
  versionCode?: number;
  /** A sha1 hash of the upload payload, encoded as a hex string and matching the output of the sha1sum command. */
  sha1?: string;
  /** A sha256 hash of the upload payload, encoded as a hex string and matching the output of the sha256sum command. */
  sha256?: string;
}

export const Bundle: Schema.Schema<Bundle> = Schema.suspend(() => Schema.Struct({
  versionCode: Schema.optional(Schema.Number),
  sha1: Schema.optional(Schema.String),
  sha256: Schema.optional(Schema.String),
})).annotate({ identifier: "Bundle" }) as any as Schema.Schema<Bundle>;

export interface InternalAppSharingArtifact {
  /** The download URL generated for the uploaded artifact. Users that are authorized to download can follow the link to the Play Store app to install it. */
  downloadUrl?: string;
  /** The sha256 fingerprint of the certificate used to sign the generated artifact. */
  certificateFingerprint?: string;
  /** The sha256 hash of the artifact represented as a lowercase hexadecimal number, matching the output of the sha256sum command. */
  sha256?: string;
}

export const InternalAppSharingArtifact: Schema.Schema<InternalAppSharingArtifact> = Schema.suspend(() => Schema.Struct({
  downloadUrl: Schema.optional(Schema.String),
  certificateFingerprint: Schema.optional(Schema.String),
  sha256: Schema.optional(Schema.String),
})).annotate({ identifier: "InternalAppSharingArtifact" }) as any as Schema.Schema<InternalAppSharingArtifact>;

export interface BatchDeleteOneTimeProductOffersRequest {
  /** Required. A list of update requests of up to 100 elements. All requests must correspond to different offers. */
  requests?: Array<DeleteOneTimeProductOfferRequest>;
}

export const BatchDeleteOneTimeProductOffersRequest: Schema.Schema<BatchDeleteOneTimeProductOffersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(DeleteOneTimeProductOfferRequest)),
})).annotate({ identifier: "BatchDeleteOneTimeProductOffersRequest" }) as any as Schema.Schema<BatchDeleteOneTimeProductOffersRequest>;

export interface AddTargetingRequest {
  /** Specifies targeting updates such as regions, android sdk versions etc. */
  targetingUpdate?: TargetingUpdate;
}

export const AddTargetingRequest: Schema.Schema<AddTargetingRequest> = Schema.suspend(() => Schema.Struct({
  targetingUpdate: Schema.optional(TargetingUpdate),
})).annotate({ identifier: "AddTargetingRequest" }) as any as Schema.Schema<AddTargetingRequest>;

export interface SubscriptionPurchasesDeferResponse {
  /** The new expiry time for the subscription in milliseconds since the Epoch. */
  newExpiryTimeMillis?: string;
}

export const SubscriptionPurchasesDeferResponse: Schema.Schema<SubscriptionPurchasesDeferResponse> = Schema.suspend(() => Schema.Struct({
  newExpiryTimeMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscriptionPurchasesDeferResponse" }) as any as Schema.Schema<SubscriptionPurchasesDeferResponse>;

export interface InappproductsBatchGetResponse {
  /** The list of requested in-app products, in the same order as the request. */
  inappproduct?: Array<InAppProduct>;
}

export const InappproductsBatchGetResponse: Schema.Schema<InappproductsBatchGetResponse> = Schema.suspend(() => Schema.Struct({
  inappproduct: Schema.optional(Schema.Array(InAppProduct)),
})).annotate({ identifier: "InappproductsBatchGetResponse" }) as any as Schema.Schema<InappproductsBatchGetResponse>;

export interface BatchGetSubscriptionOffersResponse {
  subscriptionOffers?: Array<SubscriptionOffer>;
}

export const BatchGetSubscriptionOffersResponse: Schema.Schema<BatchGetSubscriptionOffersResponse> = Schema.suspend(() => Schema.Struct({
  subscriptionOffers: Schema.optional(Schema.Array(SubscriptionOffer)),
})).annotate({ identifier: "BatchGetSubscriptionOffersResponse" }) as any as Schema.Schema<BatchGetSubscriptionOffersResponse>;

export interface BatchUpdatePurchaseOptionStatesResponse {
  /** The list of updated one-time products. This list will match the requests one to one, in the same order. */
  oneTimeProducts?: Array<OneTimeProduct>;
}

export const BatchUpdatePurchaseOptionStatesResponse: Schema.Schema<BatchUpdatePurchaseOptionStatesResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProducts: Schema.optional(Schema.Array(OneTimeProduct)),
})).annotate({ identifier: "BatchUpdatePurchaseOptionStatesResponse" }) as any as Schema.Schema<BatchUpdatePurchaseOptionStatesResponse>;

export interface Variant {
  /** Output only. The ID of a previously created system APK variant. */
  variantId?: number;
  /** The device spec used to generate the APK. */
  deviceSpec?: DeviceSpec;
  /** Optional. Options applied to the generated APK. */
  options?: SystemApkOptions;
}

export const Variant: Schema.Schema<Variant> = Schema.suspend(() => Schema.Struct({
  variantId: Schema.optional(Schema.Number),
  deviceSpec: Schema.optional(DeviceSpec),
  options: Schema.optional(SystemApkOptions),
})).annotate({ identifier: "Variant" }) as any as Schema.Schema<Variant>;

export interface SystemApksListResponse {
  /** All system APK variants created. */
  variants?: Array<Variant>;
}

export const SystemApksListResponse: Schema.Schema<SystemApksListResponse> = Schema.suspend(() => Schema.Struct({
  variants: Schema.optional(Schema.Array(Variant)),
})).annotate({ identifier: "SystemApksListResponse" }) as any as Schema.Schema<SystemApksListResponse>;

export interface ExpansionFile {
  /** If set, this APK's expansion file references another APK's expansion file. The file_size field will not be set. */
  referencesVersion?: number;
  /** If set, this field indicates that this APK has an expansion file uploaded to it: this APK does not reference another APK's expansion file. The field's value is the size of the uploaded expansion file in bytes. */
  fileSize?: string;
}

export const ExpansionFile: Schema.Schema<ExpansionFile> = Schema.suspend(() => Schema.Struct({
  referencesVersion: Schema.optional(Schema.Number),
  fileSize: Schema.optional(Schema.String),
})).annotate({ identifier: "ExpansionFile" }) as any as Schema.Schema<ExpansionFile>;

export interface ExpansionFilesUploadResponse {
  /** The uploaded expansion file configuration. */
  expansionFile?: ExpansionFile;
}

export const ExpansionFilesUploadResponse: Schema.Schema<ExpansionFilesUploadResponse> = Schema.suspend(() => Schema.Struct({
  expansionFile: Schema.optional(ExpansionFile),
})).annotate({ identifier: "ExpansionFilesUploadResponse" }) as any as Schema.Schema<ExpansionFilesUploadResponse>;

export interface InappproductsBatchUpdateResponse {
  /** The updated or inserted in-app products. */
  inappproducts?: Array<InAppProduct>;
}

export const InappproductsBatchUpdateResponse: Schema.Schema<InappproductsBatchUpdateResponse> = Schema.suspend(() => Schema.Struct({
  inappproducts: Schema.optional(Schema.Array(InAppProduct)),
})).annotate({ identifier: "InappproductsBatchUpdateResponse" }) as any as Schema.Schema<InappproductsBatchUpdateResponse>;

export interface ImagesListResponse {
  /** All listed Images. */
  images?: Array<Image>;
}

export const ImagesListResponse: Schema.Schema<ImagesListResponse> = Schema.suspend(() => Schema.Struct({
  images: Schema.optional(Schema.Array(Image)),
})).annotate({ identifier: "ImagesListResponse" }) as any as Schema.Schema<ImagesListResponse>;

export interface GetOneTimeProductOfferRequest {
  /** Required. The parent purchase option (ID) of the offer to get. */
  purchaseOptionId?: string;
  /** Required. The parent app (package name) of the offer to get. */
  packageName?: string;
  /** Required. The parent one-time product (ID) of the offer to get. */
  productId?: string;
  /** Required. The unique offer ID of the offer to get. */
  offerId?: string;
}

export const GetOneTimeProductOfferRequest: Schema.Schema<GetOneTimeProductOfferRequest> = Schema.suspend(() => Schema.Struct({
  purchaseOptionId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
})).annotate({ identifier: "GetOneTimeProductOfferRequest" }) as any as Schema.Schema<GetOneTimeProductOfferRequest>;

export interface ImagesDeleteAllResponse {
  /** The deleted images. */
  deleted?: Array<Image>;
}

export const ImagesDeleteAllResponse: Schema.Schema<ImagesDeleteAllResponse> = Schema.suspend(() => Schema.Struct({
  deleted: Schema.optional(Schema.Array(Image)),
})).annotate({ identifier: "ImagesDeleteAllResponse" }) as any as Schema.Schema<ImagesDeleteAllResponse>;

export interface SafetyLabelsUpdateRequest {
  /** Required. Contents of the CSV file containing Data Safety responses. For the format of this file, see the Help Center documentation at https://support.google.com/googleplay/android-developer/answer/10787469?#zippy=%2Cunderstand-the-csv-format To download an up to date template, follow the steps at https://support.google.com/googleplay/android-developer/answer/10787469?#zippy=%2Cexport-to-a-csv-file */
  safetyLabels?: string;
}

export const SafetyLabelsUpdateRequest: Schema.Schema<SafetyLabelsUpdateRequest> = Schema.suspend(() => Schema.Struct({
  safetyLabels: Schema.optional(Schema.String),
})).annotate({ identifier: "SafetyLabelsUpdateRequest" }) as any as Schema.Schema<SafetyLabelsUpdateRequest>;

export interface DeferralContext {
  /** If set to "true", the request is a dry run to validate the effect of Defer, the subscription would not be impacted. */
  validateOnly?: boolean;
  /** Required. The API will fail if the etag does not match the latest etag for this subscription. The etag is retrieved from purchases.subscriptionsv2.get: https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptionsv2/get */
  etag?: string;
  /** Required. The duration by which all subscription items should be deferred. */
  deferDuration?: string;
}

export const DeferralContext: Schema.Schema<DeferralContext> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  deferDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "DeferralContext" }) as any as Schema.Schema<DeferralContext>;

export interface DeferSubscriptionPurchaseRequest {
  /** Required. Details about the subscription deferral. */
  deferralContext?: DeferralContext;
}

export const DeferSubscriptionPurchaseRequest: Schema.Schema<DeferSubscriptionPurchaseRequest> = Schema.suspend(() => Schema.Struct({
  deferralContext: Schema.optional(DeferralContext),
})).annotate({ identifier: "DeferSubscriptionPurchaseRequest" }) as any as Schema.Schema<DeferSubscriptionPurchaseRequest>;

export interface BatchDeleteOneTimeProductsRequest {
  /** Required. A list of delete requests of up to 100 elements. All requests must delete different one-time products. */
  requests?: Array<DeleteOneTimeProductRequest>;
}

export const BatchDeleteOneTimeProductsRequest: Schema.Schema<BatchDeleteOneTimeProductsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(DeleteOneTimeProductRequest)),
})).annotate({ identifier: "BatchDeleteOneTimeProductsRequest" }) as any as Schema.Schema<BatchDeleteOneTimeProductsRequest>;

export interface LocalizedText {
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language?: string;
  /** The text in the given language. */
  text?: string;
}

export const LocalizedText: Schema.Schema<LocalizedText> = Schema.suspend(() => Schema.Struct({
  language: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalizedText" }) as any as Schema.Schema<LocalizedText>;

export interface TrackRelease {
  /** Version codes of all APKs in the release. Must include version codes to retain from previous releases. */
  versionCodes?: Array<string>;
  /** Restricts a release to a specific set of countries. Note this is only allowed to be set for inProgress releases in the production track. */
  countryTargeting?: CountryTargeting;
  /** Fraction of users who are eligible for a staged release. 0 < fraction < 1. Can only be set when status is "inProgress" or "halted". */
  userFraction?: number;
  /** In-app update priority of the release. All newly added APKs in the release will be considered at this priority. Can take values in the range [0, 5], with 5 the highest priority. Defaults to 0. in_app_update_priority can not be updated once the release is rolled out. See https://developer.android.com/guide/playcore/in-app-updates. */
  inAppUpdatePriority?: number;
  /** The release name. Not required to be unique. If not set, the name is generated from the APK's version_name. If the release contains multiple APKs, the name is generated from the date. */
  name?: string;
  /** A description of what is new in this release. */
  releaseNotes?: Array<LocalizedText>;
  /** The status of the release. */
  status?: "statusUnspecified" | "draft" | "inProgress" | "halted" | "completed" | (string & {});
}

export const TrackRelease: Schema.Schema<TrackRelease> = Schema.suspend(() => Schema.Struct({
  versionCodes: Schema.optional(Schema.Array(Schema.String)),
  countryTargeting: Schema.optional(CountryTargeting),
  userFraction: Schema.optional(Schema.Number),
  inAppUpdatePriority: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  releaseNotes: Schema.optional(Schema.Array(LocalizedText)),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "TrackRelease" }) as any as Schema.Schema<TrackRelease>;

export interface Track {
  /** Identifier of the track. Form factor tracks have a special prefix as an identifier, for example `wear:production`, `automotive:production`. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name) */
  track?: string;
  /** In a read request, represents all active releases in the track. In an update request, represents desired changes. */
  releases?: Array<TrackRelease>;
}

export const Track: Schema.Schema<Track> = Schema.suspend(() => Schema.Struct({
  track: Schema.optional(Schema.String),
  releases: Schema.optional(Schema.Array(TrackRelease)),
})).annotate({ identifier: "Track" }) as any as Schema.Schema<Track>;

export interface TracksListResponse {
  /** All tracks (including tracks with no releases). */
  tracks?: Array<Track>;
  /** The kind of this response ("androidpublisher#tracksListResponse"). */
  kind?: string;
}

export const TracksListResponse: Schema.Schema<TracksListResponse> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(Track)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "TracksListResponse" }) as any as Schema.Schema<TracksListResponse>;

export interface BatchUpdateSubscriptionOffersResponse {
  /** The updated subscription offers list. */
  subscriptionOffers?: Array<SubscriptionOffer>;
}

export const BatchUpdateSubscriptionOffersResponse: Schema.Schema<BatchUpdateSubscriptionOffersResponse> = Schema.suspend(() => Schema.Struct({
  subscriptionOffers: Schema.optional(Schema.Array(SubscriptionOffer)),
})).annotate({ identifier: "BatchUpdateSubscriptionOffersResponse" }) as any as Schema.Schema<BatchUpdateSubscriptionOffersResponse>;

export interface ReviewsReplyResponse {
  /** The result of replying/updating a reply to review. */
  result?: ReviewReplyResult;
}

export const ReviewsReplyResponse: Schema.Schema<ReviewsReplyResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(ReviewReplyResult),
})).annotate({ identifier: "ReviewsReplyResponse" }) as any as Schema.Schema<ReviewsReplyResponse>;

export interface DeployAppRecoveryResponse {
}

export const DeployAppRecoveryResponse: Schema.Schema<DeployAppRecoveryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeployAppRecoveryResponse" }) as any as Schema.Schema<DeployAppRecoveryResponse>;

export interface AppDetails {
  /** The user-visible website for this app. */
  contactWebsite?: string;
  /** Default language code, in BCP 47 format (eg "en-US"). */
  defaultLanguage?: string;
  /** The user-visible support email for this app. */
  contactEmail?: string;
  /** The user-visible support telephone number for this app. */
  contactPhone?: string;
}

export const AppDetails: Schema.Schema<AppDetails> = Schema.suspend(() => Schema.Struct({
  contactWebsite: Schema.optional(Schema.String),
  defaultLanguage: Schema.optional(Schema.String),
  contactEmail: Schema.optional(Schema.String),
  contactPhone: Schema.optional(Schema.String),
})).annotate({ identifier: "AppDetails" }) as any as Schema.Schema<AppDetails>;

export interface SubscriptionPurchasesAcknowledgeRequest {
  /** Payload to attach to the purchase. */
  developerPayload?: string;
  /** Optional. User account identifier in your app. */
  externalAccountIds?: ExternalAccountIds;
}

export const SubscriptionPurchasesAcknowledgeRequest: Schema.Schema<SubscriptionPurchasesAcknowledgeRequest> = Schema.suspend(() => Schema.Struct({
  developerPayload: Schema.optional(Schema.String),
  externalAccountIds: Schema.optional(ExternalAccountIds),
})).annotate({ identifier: "SubscriptionPurchasesAcknowledgeRequest" }) as any as Schema.Schema<SubscriptionPurchasesAcknowledgeRequest>;

export interface BundlesListResponse {
  /** The kind of this response ("androidpublisher#bundlesListResponse"). */
  kind?: string;
  /** All app bundles. */
  bundles?: Array<Bundle>;
}

export const BundlesListResponse: Schema.Schema<BundlesListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  bundles: Schema.optional(Schema.Array(Bundle)),
})).annotate({ identifier: "BundlesListResponse" }) as any as Schema.Schema<BundlesListResponse>;

export interface BatchGetOrdersResponse {
  /** Details for the requested order IDs. */
  orders?: Array<Order>;
}

export const BatchGetOrdersResponse: Schema.Schema<BatchGetOrdersResponse> = Schema.suspend(() => Schema.Struct({
  orders: Schema.optional(Schema.Array(Order)),
})).annotate({ identifier: "BatchGetOrdersResponse" }) as any as Schema.Schema<BatchGetOrdersResponse>;

export interface BatchUpdateOneTimeProductOffersResponse {
  /** The list of updated one-time product offers, in the same order as the request. */
  oneTimeProductOffers?: Array<OneTimeProductOffer>;
}

export const BatchUpdateOneTimeProductOffersResponse: Schema.Schema<BatchUpdateOneTimeProductOffersResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProductOffers: Schema.optional(Schema.Array(OneTimeProductOffer)),
})).annotate({ identifier: "BatchUpdateOneTimeProductOffersResponse" }) as any as Schema.Schema<BatchUpdateOneTimeProductOffersResponse>;

export interface BatchGetOneTimeProductOffersRequest {
  /** Required. A list of get requests of up to 100 elements. All requests must retrieve different offers. */
  requests?: Array<GetOneTimeProductOfferRequest>;
}

export const BatchGetOneTimeProductOffersRequest: Schema.Schema<BatchGetOneTimeProductOffersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GetOneTimeProductOfferRequest)),
})).annotate({ identifier: "BatchGetOneTimeProductOffersRequest" }) as any as Schema.Schema<BatchGetOneTimeProductOffersRequest>;

export interface BatchGetOneTimeProductsResponse {
  /** The list of requested one-time products, in the same order as the request. */
  oneTimeProducts?: Array<OneTimeProduct>;
}

export const BatchGetOneTimeProductsResponse: Schema.Schema<BatchGetOneTimeProductsResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProducts: Schema.optional(Schema.Array(OneTimeProduct)),
})).annotate({ identifier: "BatchGetOneTimeProductsResponse" }) as any as Schema.Schema<BatchGetOneTimeProductsResponse>;

export interface BatchMigrateBasePlanPricesRequest {
  /** Required. Up to 100 price migration requests. All requests must update different base plans. */
  requests?: Array<MigrateBasePlanPricesRequest>;
}

export const BatchMigrateBasePlanPricesRequest: Schema.Schema<BatchMigrateBasePlanPricesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(MigrateBasePlanPricesRequest)),
})).annotate({ identifier: "BatchMigrateBasePlanPricesRequest" }) as any as Schema.Schema<BatchMigrateBasePlanPricesRequest>;

export interface ReviewsReplyRequest {
  /** The text to set as the reply. Replies of more than approximately 350 characters will be rejected. HTML tags will be stripped. */
  replyText?: string;
}

export const ReviewsReplyRequest: Schema.Schema<ReviewsReplyRequest> = Schema.suspend(() => Schema.Struct({
  replyText: Schema.optional(Schema.String),
})).annotate({ identifier: "ReviewsReplyRequest" }) as any as Schema.Schema<ReviewsReplyRequest>;

export interface ListOneTimeProductsResponse {
  /** The one-time products from the specified app. */
  oneTimeProducts?: Array<OneTimeProduct>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListOneTimeProductsResponse: Schema.Schema<ListOneTimeProductsResponse> = Schema.suspend(() => Schema.Struct({
  oneTimeProducts: Schema.optional(Schema.Array(OneTimeProduct)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOneTimeProductsResponse" }) as any as Schema.Schema<ListOneTimeProductsResponse>;

export interface ListDeviceTierConfigsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Device tier configs created by the developer. */
  deviceTierConfigs?: Array<DeviceTierConfig>;
}

export const ListDeviceTierConfigsResponse: Schema.Schema<ListDeviceTierConfigsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  deviceTierConfigs: Schema.optional(Schema.Array(DeviceTierConfig)),
})).annotate({ identifier: "ListDeviceTierConfigsResponse" }) as any as Schema.Schema<ListDeviceTierConfigsResponse>;

export interface CancelAppRecoveryRequest {
}

export const CancelAppRecoveryRequest: Schema.Schema<CancelAppRecoveryRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelAppRecoveryRequest" }) as any as Schema.Schema<CancelAppRecoveryRequest>;

export interface ListSubscriptionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The subscriptions from the specified app. */
  subscriptions?: Array<Subscription>;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  subscriptions: Schema.optional(Schema.Array(Subscription)),
})).annotate({ identifier: "ListSubscriptionsResponse" }) as any as Schema.Schema<ListSubscriptionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListGeneratedapksRequest {
  /** Package name of the app. */
  packageName: string;
  /** Version code of the app bundle. */
  versionCode: number;
}

export const ListGeneratedapksRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  versionCode: Schema.Number.pipe(T.HttpPath("versionCode")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/generatedApks/{versionCode}" }),
  svc,
) as unknown as Schema.Schema<ListGeneratedapksRequest>;

export type ListGeneratedapksResponse = GeneratedApksListResponse;
export const ListGeneratedapksResponse = GeneratedApksListResponse;

export type ListGeneratedapksError = CommonErrors;

/** Returns download metadata for all APKs that were generated from a given app bundle. */
export const listGeneratedapks: API.OperationMethod<ListGeneratedapksRequest, ListGeneratedapksResponse, ListGeneratedapksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListGeneratedapksRequest,
  output: ListGeneratedapksResponse,
  errors: [],
}));

export interface DownloadGeneratedapksRequest {
  /** Package name of the app. */
  packageName: string;
  /** Download ID, which uniquely identifies the APK to download. Can be obtained from the response of `generatedapks.list` method. */
  downloadId: string;
  /** Version code of the app bundle. */
  versionCode: number;
}

export const DownloadGeneratedapksRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  downloadId: Schema.String.pipe(T.HttpPath("downloadId")),
  versionCode: Schema.Number.pipe(T.HttpPath("versionCode")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/generatedApks/{versionCode}/downloads/{downloadId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadGeneratedapksRequest>;

export interface DownloadGeneratedapksResponse {}
export const DownloadGeneratedapksResponse: Schema.Schema<DownloadGeneratedapksResponse> = Schema.Struct({}) as any as Schema.Schema<DownloadGeneratedapksResponse>;

export type DownloadGeneratedapksError = CommonErrors;

/** Downloads a single signed APK generated from an app bundle. */
export const downloadGeneratedapks: API.OperationMethod<DownloadGeneratedapksRequest, DownloadGeneratedapksResponse, DownloadGeneratedapksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadGeneratedapksRequest,
  output: DownloadGeneratedapksResponse,
  errors: [],
}));

export interface CreateUsersRequest {
  /** Required. The developer account to add the user to. Format: developers/{developer} */
  parent: string;
  /** Request body */
  body?: User;
}

export const CreateUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/developers/{developersId}/users", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateUsersRequest>;

export type CreateUsersResponse = User;
export const CreateUsersResponse = User;

export type CreateUsersError = CommonErrors;

/** Grant access for a user to the given developer account. */
export const createUsers: API.OperationMethod<CreateUsersRequest, CreateUsersResponse, CreateUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateUsersRequest,
  output: CreateUsersResponse,
  errors: [],
}));

export interface DeleteUsersRequest {
  /** Required. The name of the user to delete. Format: developers/{developer}/users/{email} */
  name: string;
}

export const DeleteUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/developers/{developersId}/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersRequest>;

export interface DeleteUsersResponse {}
export const DeleteUsersResponse: Schema.Schema<DeleteUsersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersResponse>;

export type DeleteUsersError = CommonErrors;

/** Removes all access for the user to the given developer account. */
export const deleteUsers: API.OperationMethod<DeleteUsersRequest, DeleteUsersResponse, DeleteUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersRequest,
  output: DeleteUsersResponse,
  errors: [],
}));

export interface PatchUsersRequest {
  /** Required. Resource name for this user, following the pattern "developers/{developer}/users/{email}". */
  name: string;
  /** Optional. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: User;
}

export const PatchUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/developers/{developersId}/users/{usersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersRequest>;

export type PatchUsersResponse = User;
export const PatchUsersResponse = User;

export type PatchUsersError = CommonErrors;

/** Updates access for the user to the developer account. */
export const patchUsers: API.OperationMethod<PatchUsersRequest, PatchUsersResponse, PatchUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersRequest,
  output: PatchUsersResponse,
  errors: [],
}));

export interface ListUsersRequest {
  /** Required. The developer account to fetch users from. Format: developers/{developer} */
  parent: string;
  /** The maximum number of results to return. This must be set to -1 to disable pagination. */
  pageSize?: number;
  /** A token received from a previous call to this method, in order to retrieve further results. */
  pageToken?: string;
}

export const ListUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/developers/{developersId}/users" }),
  svc,
) as unknown as Schema.Schema<ListUsersRequest>;

export type ListUsersResponse_Op = ListUsersResponse;
export const ListUsersResponse_Op = ListUsersResponse;

export type ListUsersError = CommonErrors;

/** Lists all users with access to a developer account. */
export const listUsers: API.PaginatedOperationMethod<ListUsersRequest, ListUsersResponse_Op, ListUsersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateexternaltransactionExternaltransactionsRequest {
  /** Required. The id to use for the external transaction. Must be unique across all other transactions for the app. This value should be 1-63 characters and valid characters are /a-zA-Z0-9_-/. Do not use this field to store any Personally Identifiable Information (PII) such as emails. Attempting to store PII in this field may result in requests being blocked. */
  externalTransactionId?: string;
  /** Required. The parent resource where this external transaction will be created. Format: applications/{package_name} */
  parent: string;
  /** Request body */
  body?: ExternalTransaction;
}

export const CreateexternaltransactionExternaltransactionsRequest = Schema.Struct({
  externalTransactionId: Schema.optional(Schema.String).pipe(T.HttpQuery("externalTransactionId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExternalTransaction).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{applicationsId}/externalTransactions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateexternaltransactionExternaltransactionsRequest>;

export type CreateexternaltransactionExternaltransactionsResponse = ExternalTransaction;
export const CreateexternaltransactionExternaltransactionsResponse = ExternalTransaction;

export type CreateexternaltransactionExternaltransactionsError = CommonErrors;

/** Creates a new external transaction. */
export const createexternaltransactionExternaltransactions: API.OperationMethod<CreateexternaltransactionExternaltransactionsRequest, CreateexternaltransactionExternaltransactionsResponse, CreateexternaltransactionExternaltransactionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateexternaltransactionExternaltransactionsRequest,
  output: CreateexternaltransactionExternaltransactionsResponse,
  errors: [],
}));

export interface GetexternaltransactionExternaltransactionsRequest {
  /** Required. The name of the external transaction to retrieve. Format: applications/{package_name}/externalTransactions/{external_transaction} */
  name: string;
}

export const GetexternaltransactionExternaltransactionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{applicationsId}/externalTransactions/{externalTransactionsId}" }),
  svc,
) as unknown as Schema.Schema<GetexternaltransactionExternaltransactionsRequest>;

export type GetexternaltransactionExternaltransactionsResponse = ExternalTransaction;
export const GetexternaltransactionExternaltransactionsResponse = ExternalTransaction;

export type GetexternaltransactionExternaltransactionsError = CommonErrors;

/** Gets an existing external transaction. */
export const getexternaltransactionExternaltransactions: API.OperationMethod<GetexternaltransactionExternaltransactionsRequest, GetexternaltransactionExternaltransactionsResponse, GetexternaltransactionExternaltransactionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetexternaltransactionExternaltransactionsRequest,
  output: GetexternaltransactionExternaltransactionsResponse,
  errors: [],
}));

export interface RefundexternaltransactionExternaltransactionsRequest {
  /** Required. The name of the external transaction that will be refunded. Format: applications/{package_name}/externalTransactions/{external_transaction} */
  name: string;
  /** Request body */
  body?: RefundExternalTransactionRequest;
}

export const RefundexternaltransactionExternaltransactionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RefundExternalTransactionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{applicationsId}/externalTransactions/{externalTransactionsId}:refund", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RefundexternaltransactionExternaltransactionsRequest>;

export type RefundexternaltransactionExternaltransactionsResponse = ExternalTransaction;
export const RefundexternaltransactionExternaltransactionsResponse = ExternalTransaction;

export type RefundexternaltransactionExternaltransactionsError = CommonErrors;

/** Refunds or partially refunds an existing external transaction. */
export const refundexternaltransactionExternaltransactions: API.OperationMethod<RefundexternaltransactionExternaltransactionsRequest, RefundexternaltransactionExternaltransactionsResponse, RefundexternaltransactionExternaltransactionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RefundexternaltransactionExternaltransactionsRequest,
  output: RefundexternaltransactionExternaltransactionsResponse,
  errors: [],
}));

export interface RefundOrdersRequest {
  /** The package name of the application for which this subscription or in-app item was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** The order ID provided to the user when the subscription or in-app order was purchased. */
  orderId: string;
  /** Whether to revoke the purchased item. If set to true, access to the subscription or in-app item will be terminated immediately. If the item is a recurring subscription, all future payments will also be terminated. Consumed in-app items need to be handled by developer's app. (optional). */
  revoke?: boolean;
}

export const RefundOrdersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  orderId: Schema.String.pipe(T.HttpPath("orderId")),
  revoke: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("revoke")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/orders/{orderId}:refund", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RefundOrdersRequest>;

export interface RefundOrdersResponse {}
export const RefundOrdersResponse: Schema.Schema<RefundOrdersResponse> = Schema.Struct({}) as any as Schema.Schema<RefundOrdersResponse>;

export type RefundOrdersError = CommonErrors;

/** Refunds a user's subscription or in-app purchase order. Orders older than 3 years cannot be refunded. */
export const refundOrders: API.OperationMethod<RefundOrdersRequest, RefundOrdersResponse, RefundOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RefundOrdersRequest,
  output: RefundOrdersResponse,
  errors: [],
}));

export interface GetOrdersRequest {
  /** Required. The package name of the application for which this subscription or in-app item was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** Required. The order ID provided to the user when the subscription or in-app order was purchased. */
  orderId: string;
}

export const GetOrdersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  orderId: Schema.String.pipe(T.HttpPath("orderId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/orders/{orderId}" }),
  svc,
) as unknown as Schema.Schema<GetOrdersRequest>;

export type GetOrdersResponse = Order;
export const GetOrdersResponse = Order;

export type GetOrdersError = CommonErrors;

/** Get order details for a single order. */
export const getOrders: API.OperationMethod<GetOrdersRequest, GetOrdersResponse, GetOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrdersRequest,
  output: GetOrdersResponse,
  errors: [],
}));

export interface BatchgetOrdersRequest {
  /** Required. The list of order IDs to retrieve order details for. There must be between 1 and 1000 (inclusive) order IDs per request. If any order ID is not found or does not match the provided package, the entire request will fail with an error. The order IDs must be distinct. */
  orderIds?: string[];
  /** Required. The package name of the application for which this subscription or in-app item was purchased (for example, 'com.some.thing'). */
  packageName: string;
}

export const BatchgetOrdersRequest = Schema.Struct({
  orderIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("orderIds")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/orders:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchgetOrdersRequest>;

export type BatchgetOrdersResponse = BatchGetOrdersResponse;
export const BatchgetOrdersResponse = BatchGetOrdersResponse;

export type BatchgetOrdersError = CommonErrors;

/** Get order details for a list of orders. */
export const batchgetOrders: API.OperationMethod<BatchgetOrdersRequest, BatchgetOrdersResponse, BatchgetOrdersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchgetOrdersRequest,
  output: BatchgetOrdersResponse,
  errors: [],
}));

export interface ListPurchasesVoidedpurchasesRequest {
  /** The type of voided purchases that you want to see in the response. Possible values are: 0. Only voided in-app product purchases will be returned in the response. This is the default value. 1. Both voided in-app purchases and voided subscription purchases will be returned in the response. Note: Before requesting to receive voided subscription purchases, you must switch to use orderId in the response which uniquely identifies one-time purchases and subscriptions. Otherwise, you will receive multiple subscription orders with the same PurchaseToken, because subscription renewal orders share the same PurchaseToken. */
  type?: number;
  /** The package name of the application for which voided purchases need to be returned (for example, 'com.some.thing'). */
  packageName: string;
  /** Defines how many results the list operation should return. The default number depends on the resource collection. */
  maxResults?: number;
  /** The time, in milliseconds since the Epoch, of the newest voided purchase that you want to see in the response. The value of this parameter cannot be greater than the current time and is ignored if a pagination token is set. Default value is current time. Note: This filter is applied on the time at which the record is seen as voided by our systems and not the actual voided time returned in the response. */
  endTime?: string;
  /** Optional. Whether to include voided purchases of quantity-based partial refunds, which are applicable only to multi-quantity purchases. If true, additional voided purchases may be returned with voidedQuantity that indicates the refund quantity of a quantity-based partial refund. The default value is false. */
  includeQuantityBasedPartialRefund?: boolean;
  /** Defines the token of the page to return, usually taken from TokenPagination. This can only be used if token paging is enabled. */
  token?: string;
  /** Defines the index of the first element to return. This can only be used if indexed paging is enabled. */
  startIndex?: number;
  /** The time, in milliseconds since the Epoch, of the oldest voided purchase that you want to see in the response. The value of this parameter cannot be older than 30 days and is ignored if a pagination token is set. Default value is current time minus 30 days. Note: This filter is applied on the time at which the record is seen as voided by our systems and not the actual voided time returned in the response. */
  startTime?: string;
}

export const ListPurchasesVoidedpurchasesRequest = Schema.Struct({
  type: Schema.optional(Schema.Number).pipe(T.HttpQuery("type")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  includeQuantityBasedPartialRefund: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeQuantityBasedPartialRefund")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/purchases/voidedpurchases" }),
  svc,
) as unknown as Schema.Schema<ListPurchasesVoidedpurchasesRequest>;

export type ListPurchasesVoidedpurchasesResponse = VoidedPurchasesListResponse;
export const ListPurchasesVoidedpurchasesResponse = VoidedPurchasesListResponse;

export type ListPurchasesVoidedpurchasesError = CommonErrors;

/** Lists the purchases that were canceled, refunded or charged-back. */
export const listPurchasesVoidedpurchases: API.OperationMethod<ListPurchasesVoidedpurchasesRequest, ListPurchasesVoidedpurchasesResponse, ListPurchasesVoidedpurchasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListPurchasesVoidedpurchasesRequest,
  output: ListPurchasesVoidedpurchasesResponse,
  errors: [],
}));

export interface DeferPurchasesSubscriptionsRequest {
  /** The purchased subscription ID (for example, 'monthly001'). */
  subscriptionId: string;
  /** The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** The package name of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** Request body */
  body?: SubscriptionPurchasesDeferRequest;
}

export const DeferPurchasesSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(SubscriptionPurchasesDeferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:defer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeferPurchasesSubscriptionsRequest>;

export type DeferPurchasesSubscriptionsResponse = SubscriptionPurchasesDeferResponse;
export const DeferPurchasesSubscriptionsResponse = SubscriptionPurchasesDeferResponse;

export type DeferPurchasesSubscriptionsError = CommonErrors;

/** Defers a user's subscription purchase until a specified future expiration time. */
export const deferPurchasesSubscriptions: API.OperationMethod<DeferPurchasesSubscriptionsRequest, DeferPurchasesSubscriptionsResponse, DeferPurchasesSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeferPurchasesSubscriptionsRequest,
  output: DeferPurchasesSubscriptionsResponse,
  errors: [],
}));

export interface RefundPurchasesSubscriptionsRequest {
  /** The package name of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** "The purchased subscription ID (for example, 'monthly001'). */
  subscriptionId: string;
  /** The token provided to the user's device when the subscription was purchased. */
  token: string;
}

export const RefundPurchasesSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  token: Schema.String.pipe(T.HttpPath("token")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:refund", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RefundPurchasesSubscriptionsRequest>;

export interface RefundPurchasesSubscriptionsResponse {}
export const RefundPurchasesSubscriptionsResponse: Schema.Schema<RefundPurchasesSubscriptionsResponse> = Schema.Struct({}) as any as Schema.Schema<RefundPurchasesSubscriptionsResponse>;

export type RefundPurchasesSubscriptionsError = CommonErrors;

/** Deprecated: Use orders.refund instead. Refunds a user's subscription purchase, but the subscription remains valid until its expiration time and it will continue to recur. */
export const refundPurchasesSubscriptions: API.OperationMethod<RefundPurchasesSubscriptionsRequest, RefundPurchasesSubscriptionsResponse, RefundPurchasesSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RefundPurchasesSubscriptionsRequest,
  output: RefundPurchasesSubscriptionsResponse,
  errors: [],
}));

export interface CancelPurchasesSubscriptionsRequest {
  /** Note: Since May 21, 2025, subscription_id is not required, and not recommended for subscription with add-ons. The purchased subscription ID (for example, 'monthly001'). */
  subscriptionId: string;
  /** The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** The package name of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
}

export const CancelPurchasesSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelPurchasesSubscriptionsRequest>;

export interface CancelPurchasesSubscriptionsResponse {}
export const CancelPurchasesSubscriptionsResponse: Schema.Schema<CancelPurchasesSubscriptionsResponse> = Schema.Struct({}) as any as Schema.Schema<CancelPurchasesSubscriptionsResponse>;

export type CancelPurchasesSubscriptionsError = CommonErrors;

/** Cancels a user's subscription purchase. The subscription remains valid until its expiration time. Newer version is available at purchases.subscriptionsv2.cancel for better client library support. */
export const cancelPurchasesSubscriptions: API.OperationMethod<CancelPurchasesSubscriptionsRequest, CancelPurchasesSubscriptionsResponse, CancelPurchasesSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelPurchasesSubscriptionsRequest,
  output: CancelPurchasesSubscriptionsResponse,
  errors: [],
}));

export interface GetPurchasesSubscriptionsRequest {
  /** The package name of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** The purchased subscription ID (for example, 'monthly001'). */
  subscriptionId: string;
  /** The token provided to the user's device when the subscription was purchased. */
  token: string;
}

export const GetPurchasesSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  token: Schema.String.pipe(T.HttpPath("token")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}" }),
  svc,
) as unknown as Schema.Schema<GetPurchasesSubscriptionsRequest>;

export type GetPurchasesSubscriptionsResponse = SubscriptionPurchase;
export const GetPurchasesSubscriptionsResponse = SubscriptionPurchase;

export type GetPurchasesSubscriptionsError = CommonErrors;

/** Deprecated: Use purchases.subscriptionsv2.get instead. Checks whether a user's subscription purchase is valid and returns its expiry time. */
export const getPurchasesSubscriptions: API.OperationMethod<GetPurchasesSubscriptionsRequest, GetPurchasesSubscriptionsResponse, GetPurchasesSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPurchasesSubscriptionsRequest,
  output: GetPurchasesSubscriptionsResponse,
  errors: [],
}));

export interface AcknowledgePurchasesSubscriptionsRequest {
  /** Note: Since May 21, 2025, subscription_id is not required, and not recommended for subscription with add-ons. The purchased subscription ID (for example, 'monthly001'). */
  subscriptionId: string;
  /** The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** The package name of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** Request body */
  body?: SubscriptionPurchasesAcknowledgeRequest;
}

export const AcknowledgePurchasesSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(SubscriptionPurchasesAcknowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:acknowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcknowledgePurchasesSubscriptionsRequest>;

export interface AcknowledgePurchasesSubscriptionsResponse {}
export const AcknowledgePurchasesSubscriptionsResponse: Schema.Schema<AcknowledgePurchasesSubscriptionsResponse> = Schema.Struct({}) as any as Schema.Schema<AcknowledgePurchasesSubscriptionsResponse>;

export type AcknowledgePurchasesSubscriptionsError = CommonErrors;

/** Acknowledges a subscription purchase. */
export const acknowledgePurchasesSubscriptions: API.OperationMethod<AcknowledgePurchasesSubscriptionsRequest, AcknowledgePurchasesSubscriptionsResponse, AcknowledgePurchasesSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcknowledgePurchasesSubscriptionsRequest,
  output: AcknowledgePurchasesSubscriptionsResponse,
  errors: [],
}));

export interface RevokePurchasesSubscriptionsRequest {
  /** The package name of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** The purchased subscription ID (for example, 'monthly001'). */
  subscriptionId: string;
  /** The token provided to the user's device when the subscription was purchased. */
  token: string;
}

export const RevokePurchasesSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  token: Schema.String.pipe(T.HttpPath("token")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:revoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokePurchasesSubscriptionsRequest>;

export interface RevokePurchasesSubscriptionsResponse {}
export const RevokePurchasesSubscriptionsResponse: Schema.Schema<RevokePurchasesSubscriptionsResponse> = Schema.Struct({}) as any as Schema.Schema<RevokePurchasesSubscriptionsResponse>;

export type RevokePurchasesSubscriptionsError = CommonErrors;

/** Deprecated: Use purchases.subscriptionsv2.revoke instead. Refunds and immediately revokes a user's subscription purchase. Access to the subscription will be terminated immediately and it will stop recurring. */
export const revokePurchasesSubscriptions: API.OperationMethod<RevokePurchasesSubscriptionsRequest, RevokePurchasesSubscriptionsResponse, RevokePurchasesSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokePurchasesSubscriptionsRequest,
  output: RevokePurchasesSubscriptionsResponse,
  errors: [],
}));

export interface CancelPurchasesSubscriptionsv2Request {
  /** Required. The package of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** Required. The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** Request body */
  body?: CancelSubscriptionPurchaseRequest;
}

export const CancelPurchasesSubscriptionsv2Request = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  token: Schema.String.pipe(T.HttpPath("token")),
  body: Schema.optional(CancelSubscriptionPurchaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelPurchasesSubscriptionsv2Request>;

export type CancelPurchasesSubscriptionsv2Response = CancelSubscriptionPurchaseResponse;
export const CancelPurchasesSubscriptionsv2Response = CancelSubscriptionPurchaseResponse;

export type CancelPurchasesSubscriptionsv2Error = CommonErrors;

/** Cancel a subscription purchase for the user. */
export const cancelPurchasesSubscriptionsv2: API.OperationMethod<CancelPurchasesSubscriptionsv2Request, CancelPurchasesSubscriptionsv2Response, CancelPurchasesSubscriptionsv2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelPurchasesSubscriptionsv2Request,
  output: CancelPurchasesSubscriptionsv2Response,
  errors: [],
}));

export interface GetPurchasesSubscriptionsv2Request {
  /** Required. The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** The package of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
}

export const GetPurchasesSubscriptionsv2Request = Schema.Struct({
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}" }),
  svc,
) as unknown as Schema.Schema<GetPurchasesSubscriptionsv2Request>;

export type GetPurchasesSubscriptionsv2Response = SubscriptionPurchaseV2;
export const GetPurchasesSubscriptionsv2Response = SubscriptionPurchaseV2;

export type GetPurchasesSubscriptionsv2Error = CommonErrors;

/** Get metadata about a subscription */
export const getPurchasesSubscriptionsv2: API.OperationMethod<GetPurchasesSubscriptionsv2Request, GetPurchasesSubscriptionsv2Response, GetPurchasesSubscriptionsv2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPurchasesSubscriptionsv2Request,
  output: GetPurchasesSubscriptionsv2Response,
  errors: [],
}));

export interface DeferPurchasesSubscriptionsv2Request {
  /** Required. The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** Required. The package of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** Request body */
  body?: DeferSubscriptionPurchaseRequest;
}

export const DeferPurchasesSubscriptionsv2Request = Schema.Struct({
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(DeferSubscriptionPurchaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}:defer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeferPurchasesSubscriptionsv2Request>;

export type DeferPurchasesSubscriptionsv2Response = DeferSubscriptionPurchaseResponse;
export const DeferPurchasesSubscriptionsv2Response = DeferSubscriptionPurchaseResponse;

export type DeferPurchasesSubscriptionsv2Error = CommonErrors;

/** Defers the renewal of a subscription. */
export const deferPurchasesSubscriptionsv2: API.OperationMethod<DeferPurchasesSubscriptionsv2Request, DeferPurchasesSubscriptionsv2Response, DeferPurchasesSubscriptionsv2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeferPurchasesSubscriptionsv2Request,
  output: DeferPurchasesSubscriptionsv2Response,
  errors: [],
}));

export interface RevokePurchasesSubscriptionsv2Request {
  /** Required. The package of the application for which this subscription was purchased (for example, 'com.some.thing'). */
  packageName: string;
  /** Required. The token provided to the user's device when the subscription was purchased. */
  token: string;
  /** Request body */
  body?: RevokeSubscriptionPurchaseRequest;
}

export const RevokePurchasesSubscriptionsv2Request = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  token: Schema.String.pipe(T.HttpPath("token")),
  body: Schema.optional(RevokeSubscriptionPurchaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}:revoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokePurchasesSubscriptionsv2Request>;

export type RevokePurchasesSubscriptionsv2Response = RevokeSubscriptionPurchaseResponse;
export const RevokePurchasesSubscriptionsv2Response = RevokeSubscriptionPurchaseResponse;

export type RevokePurchasesSubscriptionsv2Error = CommonErrors;

/** Revoke a subscription purchase for the user. */
export const revokePurchasesSubscriptionsv2: API.OperationMethod<RevokePurchasesSubscriptionsv2Request, RevokePurchasesSubscriptionsv2Response, RevokePurchasesSubscriptionsv2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokePurchasesSubscriptionsv2Request,
  output: RevokePurchasesSubscriptionsv2Response,
  errors: [],
}));

export interface Getproductpurchasev2PurchasesProductsv2Request {
  /** The token provided to the user's device when the inapp product was purchased. */
  token: string;
  /** The package name of the application the inapp product was sold in (for example, 'com.some.thing'). */
  packageName: string;
}

export const Getproductpurchasev2PurchasesProductsv2Request = Schema.Struct({
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/purchases/productsv2/tokens/{token}" }),
  svc,
) as unknown as Schema.Schema<Getproductpurchasev2PurchasesProductsv2Request>;

export type Getproductpurchasev2PurchasesProductsv2Response = ProductPurchaseV2;
export const Getproductpurchasev2PurchasesProductsv2Response = ProductPurchaseV2;

export type Getproductpurchasev2PurchasesProductsv2Error = CommonErrors;

/** Checks the purchase and consumption status of an inapp item. */
export const getproductpurchasev2PurchasesProductsv2: API.OperationMethod<Getproductpurchasev2PurchasesProductsv2Request, Getproductpurchasev2PurchasesProductsv2Response, Getproductpurchasev2PurchasesProductsv2Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Getproductpurchasev2PurchasesProductsv2Request,
  output: Getproductpurchasev2PurchasesProductsv2Response,
  errors: [],
}));

export interface GetPurchasesProductsRequest {
  /** The inapp product SKU (for example, 'com.some.thing.inapp1'). */
  productId: string;
  /** The token provided to the user's device when the inapp product was purchased. */
  token: string;
  /** The package name of the application the inapp product was sold in (for example, 'com.some.thing'). */
  packageName: string;
}

export const GetPurchasesProductsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}" }),
  svc,
) as unknown as Schema.Schema<GetPurchasesProductsRequest>;

export type GetPurchasesProductsResponse = ProductPurchase;
export const GetPurchasesProductsResponse = ProductPurchase;

export type GetPurchasesProductsError = CommonErrors;

/** Checks the purchase and consumption status of an inapp item. */
export const getPurchasesProducts: API.OperationMethod<GetPurchasesProductsRequest, GetPurchasesProductsResponse, GetPurchasesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPurchasesProductsRequest,
  output: GetPurchasesProductsResponse,
  errors: [],
}));

export interface AcknowledgePurchasesProductsRequest {
  /** The inapp product SKU (for example, 'com.some.thing.inapp1'). */
  productId: string;
  /** The token provided to the user's device when the inapp product was purchased. */
  token: string;
  /** The package name of the application the inapp product was sold in (for example, 'com.some.thing'). */
  packageName: string;
  /** Request body */
  body?: ProductPurchasesAcknowledgeRequest;
}

export const AcknowledgePurchasesProductsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  token: Schema.String.pipe(T.HttpPath("token")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(ProductPurchasesAcknowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}:acknowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcknowledgePurchasesProductsRequest>;

export interface AcknowledgePurchasesProductsResponse {}
export const AcknowledgePurchasesProductsResponse: Schema.Schema<AcknowledgePurchasesProductsResponse> = Schema.Struct({}) as any as Schema.Schema<AcknowledgePurchasesProductsResponse>;

export type AcknowledgePurchasesProductsError = CommonErrors;

/** Acknowledges a purchase of an inapp item. */
export const acknowledgePurchasesProducts: API.OperationMethod<AcknowledgePurchasesProductsRequest, AcknowledgePurchasesProductsResponse, AcknowledgePurchasesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcknowledgePurchasesProductsRequest,
  output: AcknowledgePurchasesProductsResponse,
  errors: [],
}));

export interface ConsumePurchasesProductsRequest {
  /** The package name of the application the inapp product was sold in (for example, 'com.some.thing'). */
  packageName: string;
  /** The token provided to the user's device when the inapp product was purchased. */
  token: string;
  /** The inapp product SKU (for example, 'com.some.thing.inapp1'). */
  productId: string;
}

export const ConsumePurchasesProductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  token: Schema.String.pipe(T.HttpPath("token")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}:consume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConsumePurchasesProductsRequest>;

export interface ConsumePurchasesProductsResponse {}
export const ConsumePurchasesProductsResponse: Schema.Schema<ConsumePurchasesProductsResponse> = Schema.Struct({}) as any as Schema.Schema<ConsumePurchasesProductsResponse>;

export type ConsumePurchasesProductsError = CommonErrors;

/** Consumes a purchase for an inapp item. */
export const consumePurchasesProducts: API.OperationMethod<ConsumePurchasesProductsRequest, ConsumePurchasesProductsResponse, ConsumePurchasesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConsumePurchasesProductsRequest,
  output: ConsumePurchasesProductsResponse,
  errors: [],
}));

export interface GetSystemapksVariantsRequest {
  /** The version code of the App Bundle. */
  versionCode: string;
  /** Package name of the app. */
  packageName: string;
  /** The ID of a previously created system APK variant. */
  variantId: number;
}

export const GetSystemapksVariantsRequest = Schema.Struct({
  versionCode: Schema.String.pipe(T.HttpPath("versionCode")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  variantId: Schema.Number.pipe(T.HttpPath("variantId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants/{variantId}" }),
  svc,
) as unknown as Schema.Schema<GetSystemapksVariantsRequest>;

export type GetSystemapksVariantsResponse = Variant;
export const GetSystemapksVariantsResponse = Variant;

export type GetSystemapksVariantsError = CommonErrors;

/** Returns a previously created system APK variant. */
export const getSystemapksVariants: API.OperationMethod<GetSystemapksVariantsRequest, GetSystemapksVariantsResponse, GetSystemapksVariantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSystemapksVariantsRequest,
  output: GetSystemapksVariantsResponse,
  errors: [],
}));

export interface CreateSystemapksVariantsRequest {
  /** Package name of the app. */
  packageName: string;
  /** The version code of the App Bundle. */
  versionCode: string;
  /** Request body */
  body?: Variant;
}

export const CreateSystemapksVariantsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  versionCode: Schema.String.pipe(T.HttpPath("versionCode")),
  body: Schema.optional(Variant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSystemapksVariantsRequest>;

export type CreateSystemapksVariantsResponse = Variant;
export const CreateSystemapksVariantsResponse = Variant;

export type CreateSystemapksVariantsError = CommonErrors;

/** Creates an APK which is suitable for inclusion in a system image from an already uploaded Android App Bundle. */
export const createSystemapksVariants: API.OperationMethod<CreateSystemapksVariantsRequest, CreateSystemapksVariantsResponse, CreateSystemapksVariantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSystemapksVariantsRequest,
  output: CreateSystemapksVariantsResponse,
  errors: [],
}));

export interface ListSystemapksVariantsRequest {
  /** Package name of the app. */
  packageName: string;
  /** The version code of the App Bundle. */
  versionCode: string;
}

export const ListSystemapksVariantsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  versionCode: Schema.String.pipe(T.HttpPath("versionCode")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants" }),
  svc,
) as unknown as Schema.Schema<ListSystemapksVariantsRequest>;

export type ListSystemapksVariantsResponse = SystemApksListResponse;
export const ListSystemapksVariantsResponse = SystemApksListResponse;

export type ListSystemapksVariantsError = CommonErrors;

/** Returns the list of previously created system APK variants. */
export const listSystemapksVariants: API.OperationMethod<ListSystemapksVariantsRequest, ListSystemapksVariantsResponse, ListSystemapksVariantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListSystemapksVariantsRequest,
  output: ListSystemapksVariantsResponse,
  errors: [],
}));

export interface DownloadSystemapksVariantsRequest {
  /** The ID of a previously created system APK variant. */
  variantId: number;
  /** Package name of the app. */
  packageName: string;
  /** The version code of the App Bundle. */
  versionCode: string;
}

export const DownloadSystemapksVariantsRequest = Schema.Struct({
  variantId: Schema.Number.pipe(T.HttpPath("variantId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  versionCode: Schema.String.pipe(T.HttpPath("versionCode")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants/{variantId}:download" }),
  svc,
) as unknown as Schema.Schema<DownloadSystemapksVariantsRequest>;

export interface DownloadSystemapksVariantsResponse {}
export const DownloadSystemapksVariantsResponse: Schema.Schema<DownloadSystemapksVariantsResponse> = Schema.Struct({}) as any as Schema.Schema<DownloadSystemapksVariantsResponse>;

export type DownloadSystemapksVariantsError = CommonErrors;

/** Downloads a previously created system APK which is suitable for inclusion in a system image. */
export const downloadSystemapksVariants: API.OperationMethod<DownloadSystemapksVariantsRequest, DownloadSystemapksVariantsResponse, DownloadSystemapksVariantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadSystemapksVariantsRequest,
  output: DownloadSystemapksVariantsResponse,
  errors: [],
}));

export interface ConvertRegionPricesMonetizationRequest {
  /** Required. The app package name. */
  packageName: string;
  /** Request body */
  body?: ConvertRegionPricesRequest;
}

export const ConvertRegionPricesMonetizationRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(ConvertRegionPricesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/pricing:convertRegionPrices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConvertRegionPricesMonetizationRequest>;

export type ConvertRegionPricesMonetizationResponse = ConvertRegionPricesResponse;
export const ConvertRegionPricesMonetizationResponse = ConvertRegionPricesResponse;

export type ConvertRegionPricesMonetizationError = CommonErrors;

/** Calculates the region prices, using today's exchange rate and country-specific pricing patterns, based on the price in the request for a set of regions. */
export const convertRegionPricesMonetization: API.OperationMethod<ConvertRegionPricesMonetizationRequest, ConvertRegionPricesMonetizationResponse, ConvertRegionPricesMonetizationError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConvertRegionPricesMonetizationRequest,
  output: ConvertRegionPricesMonetizationResponse,
  errors: [],
}));

export interface BatchUpdateMonetizationOnetimeproductsRequest {
  /** Required. The parent app (package name) for which the one-time products should be updated. Must be equal to the package_name field on all the OneTimeProduct resources. */
  packageName: string;
  /** Request body */
  body?: BatchUpdateOneTimeProductsRequest;
}

export const BatchUpdateMonetizationOnetimeproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(BatchUpdateOneTimeProductsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateMonetizationOnetimeproductsRequest>;

export type BatchUpdateMonetizationOnetimeproductsResponse = BatchUpdateOneTimeProductsResponse;
export const BatchUpdateMonetizationOnetimeproductsResponse = BatchUpdateOneTimeProductsResponse;

export type BatchUpdateMonetizationOnetimeproductsError = CommonErrors;

/** Creates or updates one or more one-time products. */
export const batchUpdateMonetizationOnetimeproducts: API.OperationMethod<BatchUpdateMonetizationOnetimeproductsRequest, BatchUpdateMonetizationOnetimeproductsResponse, BatchUpdateMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateMonetizationOnetimeproductsRequest,
  output: BatchUpdateMonetizationOnetimeproductsResponse,
  errors: [],
}));

export interface DeleteMonetizationOnetimeproductsRequest {
  /** Required. The one-time product ID of the one-time product to delete. */
  productId: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The parent app (package name) of the one-time product to delete. */
  packageName: string;
}

export const DeleteMonetizationOnetimeproductsRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMonetizationOnetimeproductsRequest>;

export interface DeleteMonetizationOnetimeproductsResponse {}
export const DeleteMonetizationOnetimeproductsResponse: Schema.Schema<DeleteMonetizationOnetimeproductsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteMonetizationOnetimeproductsResponse>;

export type DeleteMonetizationOnetimeproductsError = CommonErrors;

/** Deletes a one-time product. */
export const deleteMonetizationOnetimeproducts: API.OperationMethod<DeleteMonetizationOnetimeproductsRequest, DeleteMonetizationOnetimeproductsResponse, DeleteMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMonetizationOnetimeproductsRequest,
  output: DeleteMonetizationOnetimeproductsResponse,
  errors: [],
}));

export interface PatchMonetizationOnetimeproductsRequest {
  /** Optional. If set to true, and the one-time product with the given package_name and product_id doesn't exist, the one-time product will be created. If a new one-time product is created, update_mask is ignored. */
  allowMissing?: boolean;
  /** Required. Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must start with a number or lowercase letter, and can contain numbers (0-9), lowercase letters (a-z), underscores (_), and periods (.). */
  productId: string;
  /** Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available. */
  "regionsVersion.version"?: string;
  /** Required. Immutable. Package name of the parent app. */
  packageName: string;
  /** Optional. The latency tolerance for the propagation of this product upsert. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: OneTimeProduct;
}

export const PatchMonetizationOnetimeproductsRequest = Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  "regionsVersion.version": Schema.optional(Schema.String).pipe(T.HttpQuery("regionsVersion.version")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(OneTimeProduct).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/onetimeproducts/{productId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchMonetizationOnetimeproductsRequest>;

export type PatchMonetizationOnetimeproductsResponse = OneTimeProduct;
export const PatchMonetizationOnetimeproductsResponse = OneTimeProduct;

export type PatchMonetizationOnetimeproductsError = CommonErrors;

/** Creates or updates a one-time product. */
export const patchMonetizationOnetimeproducts: API.OperationMethod<PatchMonetizationOnetimeproductsRequest, PatchMonetizationOnetimeproductsResponse, PatchMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchMonetizationOnetimeproductsRequest,
  output: PatchMonetizationOnetimeproductsResponse,
  errors: [],
}));

export interface BatchDeleteMonetizationOnetimeproductsRequest {
  /** Required. The parent app (package name) for which the one-time products should be deleted. Must be equal to the package_name field on all the OneTimeProduct resources. */
  packageName: string;
  /** Request body */
  body?: BatchDeleteOneTimeProductsRequest;
}

export const BatchDeleteMonetizationOnetimeproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(BatchDeleteOneTimeProductsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteMonetizationOnetimeproductsRequest>;

export interface BatchDeleteMonetizationOnetimeproductsResponse {}
export const BatchDeleteMonetizationOnetimeproductsResponse: Schema.Schema<BatchDeleteMonetizationOnetimeproductsResponse> = Schema.Struct({}) as any as Schema.Schema<BatchDeleteMonetizationOnetimeproductsResponse>;

export type BatchDeleteMonetizationOnetimeproductsError = CommonErrors;

/** Deletes one or more one-time products. */
export const batchDeleteMonetizationOnetimeproducts: API.OperationMethod<BatchDeleteMonetizationOnetimeproductsRequest, BatchDeleteMonetizationOnetimeproductsResponse, BatchDeleteMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteMonetizationOnetimeproductsRequest,
  output: BatchDeleteMonetizationOnetimeproductsResponse,
  errors: [],
}));

export interface BatchGetMonetizationOnetimeproductsRequest {
  /** Required. The parent app (package name) for which the products should be retrieved. Must be equal to the package_name field on all requests. */
  packageName: string;
  /** Required. A list of up to 100 product IDs to retrieve. All IDs must be different. */
  productIds?: string[];
}

export const BatchGetMonetizationOnetimeproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("productIds")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetMonetizationOnetimeproductsRequest>;

export type BatchGetMonetizationOnetimeproductsResponse = BatchGetOneTimeProductsResponse;
export const BatchGetMonetizationOnetimeproductsResponse = BatchGetOneTimeProductsResponse;

export type BatchGetMonetizationOnetimeproductsError = CommonErrors;

/** Reads one or more one-time products. */
export const batchGetMonetizationOnetimeproducts: API.OperationMethod<BatchGetMonetizationOnetimeproductsRequest, BatchGetMonetizationOnetimeproductsResponse, BatchGetMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetMonetizationOnetimeproductsRequest,
  output: BatchGetMonetizationOnetimeproductsResponse,
  errors: [],
}));

export interface ListMonetizationOnetimeproductsRequest {
  /** Optional. A page token, received from a previous `ListOneTimeProducts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListOneTimeProducts` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent app (package name) for which the one-time product should be read. */
  packageName: string;
  /** Optional. The maximum number of one-time product to return. The service may return fewer than this value. If unspecified, at most 50 one-time products will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListMonetizationOnetimeproductsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts" }),
  svc,
) as unknown as Schema.Schema<ListMonetizationOnetimeproductsRequest>;

export type ListMonetizationOnetimeproductsResponse = ListOneTimeProductsResponse;
export const ListMonetizationOnetimeproductsResponse = ListOneTimeProductsResponse;

export type ListMonetizationOnetimeproductsError = CommonErrors;

/** Lists all one-time products under a given app. */
export const listMonetizationOnetimeproducts: API.PaginatedOperationMethod<ListMonetizationOnetimeproductsRequest, ListMonetizationOnetimeproductsResponse, ListMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMonetizationOnetimeproductsRequest,
  output: ListMonetizationOnetimeproductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetMonetizationOnetimeproductsRequest {
  /** Required. The parent app (package name) of the product to retrieve. */
  packageName: string;
  /** Required. The product ID of the product to retrieve. */
  productId: string;
}

export const GetMonetizationOnetimeproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetMonetizationOnetimeproductsRequest>;

export type GetMonetizationOnetimeproductsResponse = OneTimeProduct;
export const GetMonetizationOnetimeproductsResponse = OneTimeProduct;

export type GetMonetizationOnetimeproductsError = CommonErrors;

/** Reads a single one-time product. */
export const getMonetizationOnetimeproducts: API.OperationMethod<GetMonetizationOnetimeproductsRequest, GetMonetizationOnetimeproductsResponse, GetMonetizationOnetimeproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMonetizationOnetimeproductsRequest,
  output: GetMonetizationOnetimeproductsResponse,
  errors: [],
}));

export interface BatchDeleteMonetizationOnetimeproductsPurchaseOptionsRequest {
  /** Required. The parent app (package name) of the purchase options to delete. */
  packageName: string;
  /** Required. The product ID of the parent one-time product, if all purchase options to delete belong to the same one-time product. If this batch delete spans multiple one-time products, set this field to "-". */
  productId: string;
  /** Request body */
  body?: BatchDeletePurchaseOptionsRequest;
}

export const BatchDeleteMonetizationOnetimeproductsPurchaseOptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchDeletePurchaseOptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsRequest>;

export interface BatchDeleteMonetizationOnetimeproductsPurchaseOptionsResponse {}
export const BatchDeleteMonetizationOnetimeproductsPurchaseOptionsResponse: Schema.Schema<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsResponse> = Schema.Struct({}) as any as Schema.Schema<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsResponse>;

export type BatchDeleteMonetizationOnetimeproductsPurchaseOptionsError = CommonErrors;

/** Deletes purchase options across one or multiple one-time products. By default this operation will fail if there are any existing offers under the deleted purchase options. Use the force parameter to override the default behavior. */
export const batchDeleteMonetizationOnetimeproductsPurchaseOptions: API.OperationMethod<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsRequest, BatchDeleteMonetizationOnetimeproductsPurchaseOptionsResponse, BatchDeleteMonetizationOnetimeproductsPurchaseOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteMonetizationOnetimeproductsPurchaseOptionsRequest,
  output: BatchDeleteMonetizationOnetimeproductsPurchaseOptionsResponse,
  errors: [],
}));

export interface BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsRequest {
  /** Required. The parent app (package name) of the updated purchase options. */
  packageName: string;
  /** Required. The product ID of the parent one-time product, if all updated purchase options belong to the same one-time product. If this batch update spans multiple one-time products, set this field to "-". */
  productId: string;
  /** Request body */
  body?: BatchUpdatePurchaseOptionStatesRequest;
}

export const BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchUpdatePurchaseOptionStatesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions:batchUpdateStates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsRequest>;

export type BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsResponse = BatchUpdatePurchaseOptionStatesResponse;
export const BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsResponse = BatchUpdatePurchaseOptionStatesResponse;

export type BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsError = CommonErrors;

/** Activates or deactivates purchase options across one or multiple one-time products. */
export const batchUpdateStatesMonetizationOnetimeproductsPurchaseOptions: API.OperationMethod<BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsRequest, BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsResponse, BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsRequest,
  output: BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsResponse,
  errors: [],
}));

export interface ActivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent app (package name) of the offer to activate. */
  packageName: string;
  /** Required. The parent purchase option (ID) of the offer to activate. */
  purchaseOptionId: string;
  /** Required. The parent one-time product (ID) of the offer to activate. */
  productId: string;
  /** Required. The offer ID of the offer to activate. */
  offerId: string;
  /** Request body */
  body?: ActivateOneTimeProductOfferRequest;
}

export const ActivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
  body: Schema.optional(ActivateOneTimeProductOfferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers/{offerId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type ActivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse = OneTimeProductOffer;
export const ActivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse = OneTimeProductOffer;

export type ActivateMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Activates a one-time product offer. */
export const activateMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<ActivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest, ActivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse, ActivateMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: ActivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface ListMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent app (package name) for which the offers should be read. */
  packageName: string;
  /** Optional. The maximum number of offers to return. The service may return fewer than this value. If unspecified, at most 50 offers will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent purchase option (ID) for which the offers should be read. May be specified as '-' to read all offers under a one-time product or an app. Must be specified as '-' if product_id is specified as '-'. */
  purchaseOptionId: string;
  /** Required. The parent one-time product (ID) for which the offers should be read. May be specified as '-' to read all offers under an app. */
  productId: string;
  /** Optional. A page token, received from a previous `ListOneTimeProductsOffers` call. Provide this to retrieve the subsequent page. When paginating, product_id, package_name and purchase_option_id provided to `ListOneTimeProductsOffersRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers" }),
  svc,
) as unknown as Schema.Schema<ListMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type ListMonetizationOnetimeproductsPurchaseOptionsOffersResponse = ListOneTimeProductOffersResponse;
export const ListMonetizationOnetimeproductsPurchaseOptionsOffersResponse = ListOneTimeProductOffersResponse;

export type ListMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Lists all offers under a given app, product, or purchase option. */
export const listMonetizationOnetimeproductsPurchaseOptionsOffers: API.PaginatedOperationMethod<ListMonetizationOnetimeproductsPurchaseOptionsOffersRequest, ListMonetizationOnetimeproductsPurchaseOptionsOffersResponse, ListMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: ListMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent purchase option (ID) for which the offers should be updated. May be specified as '-' to update offers from multiple purchase options. */
  purchaseOptionId: string;
  /** Required. The parent app (package name) of the updated offers. Must be equal to the package_name field on all the updated OneTimeProductOffer resources. */
  packageName: string;
  /** Required. The product ID of the parent one-time product, if all updated offers belong to the same product. If this request spans multiple one-time products, set this field to "-". */
  productId: string;
  /** Request body */
  body?: BatchGetOneTimeProductOffersRequest;
}

export const BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchGetOneTimeProductOffersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchGet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersResponse = BatchGetOneTimeProductOffersResponse;
export const BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersResponse = BatchGetOneTimeProductOffersResponse;

export type BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Reads one or more one-time product offers. */
export const batchGetMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersRequest, BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersResponse, BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: BatchGetMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The product ID of the parent one-time product, if all updated offers belong to the same one-time product. If this batch update spans multiple one-time products, set this field to "-". */
  productId: string;
  /** Required. The parent app (package name) of the updated one-time product offers. */
  packageName: string;
  /** Required. The purchase option ID of the parent purchase option, if all updated offers belong to the same purchase option. If this batch update spans multiple purchase options, set this field to "-". */
  purchaseOptionId: string;
  /** Request body */
  body?: BatchUpdateOneTimeProductOfferStatesRequest;
}

export const BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  body: Schema.optional(BatchUpdateOneTimeProductOfferStatesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchUpdateStates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersResponse = BatchUpdateOneTimeProductOfferStatesResponse;
export const BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersResponse = BatchUpdateOneTimeProductOfferStatesResponse;

export type BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Updates a batch of one-time product offer states. */
export const batchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersRequest, BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersResponse, BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: BatchUpdateStatesMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent app (package name) of the offers to delete. Must be equal to the package_name field on all the OneTimeProductOffer resources. */
  packageName: string;
  /** Required. The parent purchase option (ID) for which the offers should be deleted. May be specified as '-' to update offers from multiple purchase options. */
  purchaseOptionId: string;
  /** Required. The product ID of the parent one-time product, if all offers to delete belong to the same product. If this request spans multiple one-time products, set this field to "-". */
  productId: string;
  /** Request body */
  body?: BatchDeleteOneTimeProductOffersRequest;
}

export const BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchDeleteOneTimeProductOffersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export interface BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersResponse {}
export const BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersResponse: Schema.Schema<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersResponse> = Schema.Struct({}) as any as Schema.Schema<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersResponse>;

export type BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Deletes one or more one-time product offers. */
export const batchDeleteMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersRequest, BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersResponse, BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: BatchDeleteMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent one-time product (ID) of the offer to deactivate. */
  productId: string;
  /** Required. The offer ID of the offer to deactivate. */
  offerId: string;
  /** Required. The parent purchase option (ID) of the offer to deactivate. */
  purchaseOptionId: string;
  /** Required. The parent app (package name) of the offer to deactivate. */
  packageName: string;
  /** Request body */
  body?: DeactivateOneTimeProductOfferRequest;
}

export const DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(DeactivateOneTimeProductOfferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers/{offerId}:deactivate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse = OneTimeProductOffer;
export const DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse = OneTimeProductOffer;

export type DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Deactivates a one-time product offer. */
export const deactivateMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest, DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse, DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: DeactivateMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface CancelMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent app (package name) of the offer to cancel. */
  packageName: string;
  /** Required. The parent purchase option (ID) of the offer to cancel. */
  purchaseOptionId: string;
  /** Required. The parent one-time product (ID) of the offer to cancel. */
  productId: string;
  /** Required. The offer ID of the offer to cancel. */
  offerId: string;
  /** Request body */
  body?: CancelOneTimeProductOfferRequest;
}

export const CancelMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
  body: Schema.optional(CancelOneTimeProductOfferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers/{offerId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type CancelMonetizationOnetimeproductsPurchaseOptionsOffersResponse = OneTimeProductOffer;
export const CancelMonetizationOnetimeproductsPurchaseOptionsOffersResponse = OneTimeProductOffer;

export type CancelMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Cancels a one-time product offer. */
export const cancelMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<CancelMonetizationOnetimeproductsPurchaseOptionsOffersRequest, CancelMonetizationOnetimeproductsPurchaseOptionsOffersResponse, CancelMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: CancelMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersRequest {
  /** Required. The parent app (package name) of the updated offers. Must be equal to the package_name field on all the updated OneTimeProductOffer resources. */
  packageName: string;
  /** Required. The parent purchase option (ID) for which the offers should be updated. May be specified as '-' to update offers from multiple purchase options. */
  purchaseOptionId: string;
  /** Required. The product ID of the parent one-time product, if all updated offers belong to the same product. If this request spans multiple one-time products, set this field to "-". */
  productId: string;
  /** Request body */
  body?: BatchUpdateOneTimeProductOffersRequest;
}

export const BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  purchaseOptionId: Schema.String.pipe(T.HttpPath("purchaseOptionId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchUpdateOneTimeProductOffersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersRequest>;

export type BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersResponse = BatchUpdateOneTimeProductOffersResponse;
export const BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersResponse = BatchUpdateOneTimeProductOffersResponse;

export type BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersError = CommonErrors;

/** Creates or updates one or more one-time product offers. */
export const batchUpdateMonetizationOnetimeproductsPurchaseOptionsOffers: API.OperationMethod<BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersRequest, BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersResponse, BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersRequest,
  output: BatchUpdateMonetizationOnetimeproductsPurchaseOptionsOffersResponse,
  errors: [],
}));

export interface ArchiveMonetizationSubscriptionsRequest {
  /** Required. The parent app (package name) of the app of the subscription to delete. */
  packageName: string;
  /** Required. The unique product ID of the subscription to delete. */
  productId: string;
  /** Request body */
  body?: ArchiveSubscriptionRequest;
}

export const ArchiveMonetizationSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(ArchiveSubscriptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}:archive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ArchiveMonetizationSubscriptionsRequest>;

export type ArchiveMonetizationSubscriptionsResponse = Subscription;
export const ArchiveMonetizationSubscriptionsResponse = Subscription;

export type ArchiveMonetizationSubscriptionsError = CommonErrors;

/** Deprecated: subscription archiving is not supported. */
export const archiveMonetizationSubscriptions: API.OperationMethod<ArchiveMonetizationSubscriptionsRequest, ArchiveMonetizationSubscriptionsResponse, ArchiveMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ArchiveMonetizationSubscriptionsRequest,
  output: ArchiveMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface BatchGetMonetizationSubscriptionsRequest {
  /** Required. A list of up to 100 subscription product IDs to retrieve. All the IDs must be different. */
  productIds?: string[];
  /** Required. The parent app (package name) for which the subscriptions should be retrieved. Must be equal to the package_name field on all the requests. */
  packageName: string;
}

export const BatchGetMonetizationSubscriptionsRequest = Schema.Struct({
  productIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("productIds")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/subscriptions:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetMonetizationSubscriptionsRequest>;

export type BatchGetMonetizationSubscriptionsResponse = BatchGetSubscriptionsResponse;
export const BatchGetMonetizationSubscriptionsResponse = BatchGetSubscriptionsResponse;

export type BatchGetMonetizationSubscriptionsError = CommonErrors;

/** Reads one or more subscriptions. */
export const batchGetMonetizationSubscriptions: API.OperationMethod<BatchGetMonetizationSubscriptionsRequest, BatchGetMonetizationSubscriptionsResponse, BatchGetMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetMonetizationSubscriptionsRequest,
  output: BatchGetMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface ListMonetizationSubscriptionsRequest {
  /** A page token, received from a previous `ListSubscriptions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscriptions` must match the call that provided the page token. */
  pageToken?: string;
  /** Deprecated: subscription archiving is not supported. */
  showArchived?: boolean;
  /** Required. The parent app (package name) for which the subscriptions should be read. */
  packageName: string;
  /** The maximum number of subscriptions to return. The service may return fewer than this value. If unspecified, at most 50 subscriptions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListMonetizationSubscriptionsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showArchived: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showArchived")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListMonetizationSubscriptionsRequest>;

export type ListMonetizationSubscriptionsResponse = ListSubscriptionsResponse;
export const ListMonetizationSubscriptionsResponse = ListSubscriptionsResponse;

export type ListMonetizationSubscriptionsError = CommonErrors;

/** Lists all subscriptions under a given app. */
export const listMonetizationSubscriptions: API.PaginatedOperationMethod<ListMonetizationSubscriptionsRequest, ListMonetizationSubscriptionsResponse, ListMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMonetizationSubscriptionsRequest,
  output: ListMonetizationSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetMonetizationSubscriptionsRequest {
  /** Required. The parent app (package name) of the subscription to get. */
  packageName: string;
  /** Required. The unique product ID of the subscription to get. */
  productId: string;
}

export const GetMonetizationSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetMonetizationSubscriptionsRequest>;

export type GetMonetizationSubscriptionsResponse = Subscription;
export const GetMonetizationSubscriptionsResponse = Subscription;

export type GetMonetizationSubscriptionsError = CommonErrors;

/** Reads a single subscription. */
export const getMonetizationSubscriptions: API.OperationMethod<GetMonetizationSubscriptionsRequest, GetMonetizationSubscriptionsResponse, GetMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMonetizationSubscriptionsRequest,
  output: GetMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface BatchUpdateMonetizationSubscriptionsRequest {
  /** Required. The parent app (package name) for which the subscriptions should be updated. Must be equal to the package_name field on all the Subscription resources. */
  packageName: string;
  /** Request body */
  body?: BatchUpdateSubscriptionsRequest;
}

export const BatchUpdateMonetizationSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(BatchUpdateSubscriptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateMonetizationSubscriptionsRequest>;

export type BatchUpdateMonetizationSubscriptionsResponse = BatchUpdateSubscriptionsResponse;
export const BatchUpdateMonetizationSubscriptionsResponse = BatchUpdateSubscriptionsResponse;

export type BatchUpdateMonetizationSubscriptionsError = CommonErrors;

/** Updates a batch of subscriptions. Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. */
export const batchUpdateMonetizationSubscriptions: API.OperationMethod<BatchUpdateMonetizationSubscriptionsRequest, BatchUpdateMonetizationSubscriptionsResponse, BatchUpdateMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateMonetizationSubscriptionsRequest,
  output: BatchUpdateMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface PatchMonetizationSubscriptionsRequest {
  /** Immutable. Package name of the parent app. */
  packageName: string;
  /** Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must be composed of lower-case letters (a-z), numbers (0-9), underscores (_) and dots (.). It must start with a lower-case letter or number, and be between 1 and 40 (inclusive) characters in length. */
  productId: string;
  /** Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available. */
  "regionsVersion.version"?: string;
  /** Optional. If set to true, and the subscription with the given package_name and product_id doesn't exist, the subscription will be created. If a new subscription is created, update_mask is ignored. */
  allowMissing?: boolean;
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Request body */
  body?: Subscription;
}

export const PatchMonetizationSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  "regionsVersion.version": Schema.optional(Schema.String).pipe(T.HttpQuery("regionsVersion.version")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchMonetizationSubscriptionsRequest>;

export type PatchMonetizationSubscriptionsResponse = Subscription;
export const PatchMonetizationSubscriptionsResponse = Subscription;

export type PatchMonetizationSubscriptionsError = CommonErrors;

/** Updates an existing subscription. */
export const patchMonetizationSubscriptions: API.OperationMethod<PatchMonetizationSubscriptionsRequest, PatchMonetizationSubscriptionsResponse, PatchMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchMonetizationSubscriptionsRequest,
  output: PatchMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface CreateMonetizationSubscriptionsRequest {
  /** Required. The parent app (package name) for which the subscription should be created. Must be equal to the package_name field on the Subscription resource. */
  packageName: string;
  /** Required. The ID to use for the subscription. For the requirements on this format, see the documentation of the product_id field on the Subscription resource. */
  productId?: string;
  /** Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available. */
  "regionsVersion.version"?: string;
  /** Request body */
  body?: Subscription;
}

export const CreateMonetizationSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.optional(Schema.String).pipe(T.HttpQuery("productId")),
  "regionsVersion.version": Schema.optional(Schema.String).pipe(T.HttpQuery("regionsVersion.version")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMonetizationSubscriptionsRequest>;

export type CreateMonetizationSubscriptionsResponse = Subscription;
export const CreateMonetizationSubscriptionsResponse = Subscription;

export type CreateMonetizationSubscriptionsError = CommonErrors;

/** Creates a new subscription. Newly added base plans will remain in draft state until activated. */
export const createMonetizationSubscriptions: API.OperationMethod<CreateMonetizationSubscriptionsRequest, CreateMonetizationSubscriptionsResponse, CreateMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMonetizationSubscriptionsRequest,
  output: CreateMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface DeleteMonetizationSubscriptionsRequest {
  /** Required. The parent app (package name) of the app of the subscription to delete. */
  packageName: string;
  /** Required. The unique product ID of the subscription to delete. */
  productId: string;
}

export const DeleteMonetizationSubscriptionsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMonetizationSubscriptionsRequest>;

export interface DeleteMonetizationSubscriptionsResponse {}
export const DeleteMonetizationSubscriptionsResponse: Schema.Schema<DeleteMonetizationSubscriptionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteMonetizationSubscriptionsResponse>;

export type DeleteMonetizationSubscriptionsError = CommonErrors;

/** Deletes a subscription. A subscription can only be deleted if it has never had a base plan published. */
export const deleteMonetizationSubscriptions: API.OperationMethod<DeleteMonetizationSubscriptionsRequest, DeleteMonetizationSubscriptionsResponse, DeleteMonetizationSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMonetizationSubscriptionsRequest,
  output: DeleteMonetizationSubscriptionsResponse,
  errors: [],
}));

export interface MigratePricesMonetizationSubscriptionsBasePlansRequest {
  /** Required. The ID of the subscription to update. Must be equal to the product_id field on the Subscription resource. */
  productId: string;
  /** Required. The unique base plan ID of the base plan to update prices on. */
  basePlanId: string;
  /** Required. Package name of the parent app. Must be equal to the package_name field on the Subscription resource. */
  packageName: string;
  /** Request body */
  body?: MigrateBasePlanPricesRequest;
}

export const MigratePricesMonetizationSubscriptionsBasePlansRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(MigrateBasePlanPricesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}:migratePrices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MigratePricesMonetizationSubscriptionsBasePlansRequest>;

export type MigratePricesMonetizationSubscriptionsBasePlansResponse = MigrateBasePlanPricesResponse;
export const MigratePricesMonetizationSubscriptionsBasePlansResponse = MigrateBasePlanPricesResponse;

export type MigratePricesMonetizationSubscriptionsBasePlansError = CommonErrors;

/** Migrates subscribers from one or more legacy price cohorts to the current price. Requests result in Google Play notifying affected subscribers. Only up to 250 simultaneous legacy price cohorts are supported. */
export const migratePricesMonetizationSubscriptionsBasePlans: API.OperationMethod<MigratePricesMonetizationSubscriptionsBasePlansRequest, MigratePricesMonetizationSubscriptionsBasePlansResponse, MigratePricesMonetizationSubscriptionsBasePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MigratePricesMonetizationSubscriptionsBasePlansRequest,
  output: MigratePricesMonetizationSubscriptionsBasePlansResponse,
  errors: [],
}));

export interface BatchMigratePricesMonetizationSubscriptionsBasePlansRequest {
  /** Required. The parent app (package name) for which the subscriptions should be created or updated. Must be equal to the package_name field on all the Subscription resources. */
  packageName: string;
  /** Required. The product ID of the parent subscription, if all updated offers belong to the same subscription. If this batch update spans multiple subscriptions, set this field to "-". Must be set. */
  productId: string;
  /** Request body */
  body?: BatchMigrateBasePlanPricesRequest;
}

export const BatchMigratePricesMonetizationSubscriptionsBasePlansRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchMigrateBasePlanPricesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans:batchMigratePrices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchMigratePricesMonetizationSubscriptionsBasePlansRequest>;

export type BatchMigratePricesMonetizationSubscriptionsBasePlansResponse = BatchMigrateBasePlanPricesResponse;
export const BatchMigratePricesMonetizationSubscriptionsBasePlansResponse = BatchMigrateBasePlanPricesResponse;

export type BatchMigratePricesMonetizationSubscriptionsBasePlansError = CommonErrors;

/** Batch variant of the MigrateBasePlanPrices endpoint. Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. */
export const batchMigratePricesMonetizationSubscriptionsBasePlans: API.OperationMethod<BatchMigratePricesMonetizationSubscriptionsBasePlansRequest, BatchMigratePricesMonetizationSubscriptionsBasePlansResponse, BatchMigratePricesMonetizationSubscriptionsBasePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchMigratePricesMonetizationSubscriptionsBasePlansRequest,
  output: BatchMigratePricesMonetizationSubscriptionsBasePlansResponse,
  errors: [],
}));

export interface DeleteMonetizationSubscriptionsBasePlansRequest {
  /** Required. The parent subscription (ID) of the base plan to delete. */
  productId: string;
  /** Required. The unique offer ID of the base plan to delete. */
  basePlanId: string;
  /** Required. The parent app (package name) of the base plan to delete. */
  packageName: string;
}

export const DeleteMonetizationSubscriptionsBasePlansRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMonetizationSubscriptionsBasePlansRequest>;

export interface DeleteMonetizationSubscriptionsBasePlansResponse {}
export const DeleteMonetizationSubscriptionsBasePlansResponse: Schema.Schema<DeleteMonetizationSubscriptionsBasePlansResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteMonetizationSubscriptionsBasePlansResponse>;

export type DeleteMonetizationSubscriptionsBasePlansError = CommonErrors;

/** Deletes a base plan. Can only be done for draft base plans. This action is irreversible. */
export const deleteMonetizationSubscriptionsBasePlans: API.OperationMethod<DeleteMonetizationSubscriptionsBasePlansRequest, DeleteMonetizationSubscriptionsBasePlansResponse, DeleteMonetizationSubscriptionsBasePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMonetizationSubscriptionsBasePlansRequest,
  output: DeleteMonetizationSubscriptionsBasePlansResponse,
  errors: [],
}));

export interface DeactivateMonetizationSubscriptionsBasePlansRequest {
  /** Required. The parent app (package name) of the base plan to deactivate. */
  packageName: string;
  /** Required. The parent subscription (ID) of the base plan to deactivate. */
  productId: string;
  /** Required. The unique base plan ID of the base plan to deactivate. */
  basePlanId: string;
  /** Request body */
  body?: DeactivateBasePlanRequest;
}

export const DeactivateMonetizationSubscriptionsBasePlansRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  body: Schema.optional(DeactivateBasePlanRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}:deactivate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeactivateMonetizationSubscriptionsBasePlansRequest>;

export type DeactivateMonetizationSubscriptionsBasePlansResponse = Subscription;
export const DeactivateMonetizationSubscriptionsBasePlansResponse = Subscription;

export type DeactivateMonetizationSubscriptionsBasePlansError = CommonErrors;

/** Deactivates a base plan. Once deactivated, the base plan will become unavailable to new subscribers, but existing subscribers will maintain their subscription */
export const deactivateMonetizationSubscriptionsBasePlans: API.OperationMethod<DeactivateMonetizationSubscriptionsBasePlansRequest, DeactivateMonetizationSubscriptionsBasePlansResponse, DeactivateMonetizationSubscriptionsBasePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeactivateMonetizationSubscriptionsBasePlansRequest,
  output: DeactivateMonetizationSubscriptionsBasePlansResponse,
  errors: [],
}));

export interface BatchUpdateStatesMonetizationSubscriptionsBasePlansRequest {
  /** Required. The parent app (package name) of the updated base plans. */
  packageName: string;
  /** Required. The product ID of the parent subscription, if all updated base plans belong to the same subscription. If this batch update spans multiple subscriptions, set this field to "-". Must be set. */
  productId: string;
  /** Request body */
  body?: BatchUpdateBasePlanStatesRequest;
}

export const BatchUpdateStatesMonetizationSubscriptionsBasePlansRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchUpdateBasePlanStatesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans:batchUpdateStates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateStatesMonetizationSubscriptionsBasePlansRequest>;

export type BatchUpdateStatesMonetizationSubscriptionsBasePlansResponse = BatchUpdateBasePlanStatesResponse;
export const BatchUpdateStatesMonetizationSubscriptionsBasePlansResponse = BatchUpdateBasePlanStatesResponse;

export type BatchUpdateStatesMonetizationSubscriptionsBasePlansError = CommonErrors;

/** Activates or deactivates base plans across one or multiple subscriptions. Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. */
export const batchUpdateStatesMonetizationSubscriptionsBasePlans: API.OperationMethod<BatchUpdateStatesMonetizationSubscriptionsBasePlansRequest, BatchUpdateStatesMonetizationSubscriptionsBasePlansResponse, BatchUpdateStatesMonetizationSubscriptionsBasePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateStatesMonetizationSubscriptionsBasePlansRequest,
  output: BatchUpdateStatesMonetizationSubscriptionsBasePlansResponse,
  errors: [],
}));

export interface ActivateMonetizationSubscriptionsBasePlansRequest {
  /** Required. The parent subscription (ID) of the base plan to activate. */
  productId: string;
  /** Required. The unique base plan ID of the base plan to activate. */
  basePlanId: string;
  /** Required. The parent app (package name) of the base plan to activate. */
  packageName: string;
  /** Request body */
  body?: ActivateBasePlanRequest;
}

export const ActivateMonetizationSubscriptionsBasePlansRequest = Schema.Struct({
  productId: Schema.String.pipe(T.HttpPath("productId")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(ActivateBasePlanRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateMonetizationSubscriptionsBasePlansRequest>;

export type ActivateMonetizationSubscriptionsBasePlansResponse = Subscription;
export const ActivateMonetizationSubscriptionsBasePlansResponse = Subscription;

export type ActivateMonetizationSubscriptionsBasePlansError = CommonErrors;

/** Activates a base plan. Once activated, base plans will be available to new subscribers. */
export const activateMonetizationSubscriptionsBasePlans: API.OperationMethod<ActivateMonetizationSubscriptionsBasePlansRequest, ActivateMonetizationSubscriptionsBasePlansResponse, ActivateMonetizationSubscriptionsBasePlansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateMonetizationSubscriptionsBasePlansRequest,
  output: ActivateMonetizationSubscriptionsBasePlansResponse,
  errors: [],
}));

export interface DeleteMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent app (package name) of the offer to delete. */
  packageName: string;
  /** Required. The parent base plan (ID) of the offer to delete. */
  basePlanId: string;
  /** Required. The parent subscription (ID) of the offer to delete. */
  productId: string;
  /** Required. The unique offer ID of the offer to delete. */
  offerId: string;
}

export const DeleteMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMonetizationSubscriptionsBasePlansOffersRequest>;

export interface DeleteMonetizationSubscriptionsBasePlansOffersResponse {}
export const DeleteMonetizationSubscriptionsBasePlansOffersResponse: Schema.Schema<DeleteMonetizationSubscriptionsBasePlansOffersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteMonetizationSubscriptionsBasePlansOffersResponse>;

export type DeleteMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Deletes a subscription offer. Can only be done for draft offers. This action is irreversible. */
export const deleteMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<DeleteMonetizationSubscriptionsBasePlansOffersRequest, DeleteMonetizationSubscriptionsBasePlansOffersResponse, DeleteMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMonetizationSubscriptionsBasePlansOffersRequest,
  output: DeleteMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface PatchMonetizationSubscriptionsBasePlansOffersRequest {
  /** Optional. If set to true, and the subscription offer with the given package_name, product_id, base_plan_id and offer_id doesn't exist, an offer will be created. If a new offer is created, update_mask is ignored. */
  allowMissing?: boolean;
  /** Required. Immutable. The ID of the parent subscription this offer belongs to. */
  productId: string;
  /** Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available. */
  "regionsVersion.version"?: string;
  /** Required. Immutable. The package name of the app the parent subscription belongs to. */
  packageName: string;
  /** Required. Immutable. The ID of the base plan to which this offer is an extension. */
  basePlanId: string;
  /** Required. Immutable. Unique ID of this subscription offer. Must be unique within the base plan. */
  offerId: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SubscriptionOffer;
}

export const PatchMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  "regionsVersion.version": Schema.optional(Schema.String).pipe(T.HttpQuery("regionsVersion.version")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SubscriptionOffer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchMonetizationSubscriptionsBasePlansOffersRequest>;

export type PatchMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;
export const PatchMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;

export type PatchMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Updates an existing subscription offer. */
export const patchMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<PatchMonetizationSubscriptionsBasePlansOffersRequest, PatchMonetizationSubscriptionsBasePlansOffersResponse, PatchMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchMonetizationSubscriptionsBasePlansOffersRequest,
  output: PatchMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface GetMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent app (package name) of the offer to get. */
  packageName: string;
  /** Required. The parent base plan (ID) of the offer to get. */
  basePlanId: string;
  /** Required. The parent subscription (ID) of the offer to get. */
  productId: string;
  /** Required. The unique offer ID of the offer to get. */
  offerId: string;
}

export const GetMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}" }),
  svc,
) as unknown as Schema.Schema<GetMonetizationSubscriptionsBasePlansOffersRequest>;

export type GetMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;
export const GetMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;

export type GetMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Reads a single offer */
export const getMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<GetMonetizationSubscriptionsBasePlansOffersRequest, GetMonetizationSubscriptionsBasePlansOffersResponse, GetMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMonetizationSubscriptionsBasePlansOffersRequest,
  output: GetMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface BatchGetMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent app (package name) for which the subscriptions should be created or updated. Must be equal to the package_name field on all the requests. */
  packageName: string;
  /** Required. The parent base plan (ID) for which the offers should be read. May be specified as '-' to read offers from multiple base plans. */
  basePlanId: string;
  /** Required. The product ID of the parent subscription, if all updated offers belong to the same subscription. If this request spans multiple subscriptions, set this field to "-". Must be set. */
  productId: string;
  /** Request body */
  body?: BatchGetSubscriptionOffersRequest;
}

export const BatchGetMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(BatchGetSubscriptionOffersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers:batchGet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchGetMonetizationSubscriptionsBasePlansOffersRequest>;

export type BatchGetMonetizationSubscriptionsBasePlansOffersResponse = BatchGetSubscriptionOffersResponse;
export const BatchGetMonetizationSubscriptionsBasePlansOffersResponse = BatchGetSubscriptionOffersResponse;

export type BatchGetMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Reads one or more subscription offers. */
export const batchGetMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<BatchGetMonetizationSubscriptionsBasePlansOffersRequest, BatchGetMonetizationSubscriptionsBasePlansOffersResponse, BatchGetMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetMonetizationSubscriptionsBasePlansOffersRequest,
  output: BatchGetMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface ListMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent base plan (ID) for which the offers should be read. May be specified as '-' to read all offers under a subscription or an app. Must be specified as '-' if product_id is specified as '-'. */
  basePlanId: string;
  /** Required. The parent app (package name) for which the subscriptions should be read. */
  packageName: string;
  /** The maximum number of subscriptions to return. The service may return fewer than this value. If unspecified, at most 50 subscriptions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent subscription (ID) for which the offers should be read. May be specified as '-' to read all offers under an app. */
  productId: string;
  /** A page token, received from a previous `ListSubscriptionsOffers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscriptionOffers` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers" }),
  svc,
) as unknown as Schema.Schema<ListMonetizationSubscriptionsBasePlansOffersRequest>;

export type ListMonetizationSubscriptionsBasePlansOffersResponse = ListSubscriptionOffersResponse;
export const ListMonetizationSubscriptionsBasePlansOffersResponse = ListSubscriptionOffersResponse;

export type ListMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Lists all offers under a given subscription. */
export const listMonetizationSubscriptionsBasePlansOffers: API.PaginatedOperationMethod<ListMonetizationSubscriptionsBasePlansOffersRequest, ListMonetizationSubscriptionsBasePlansOffersResponse, ListMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMonetizationSubscriptionsBasePlansOffersRequest,
  output: ListMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ActivateMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent app (package name) of the offer to activate. */
  packageName: string;
  /** Required. The parent subscription (ID) of the offer to activate. */
  productId: string;
  /** Required. The unique offer ID of the offer to activate. */
  offerId: string;
  /** Required. The parent base plan (ID) of the offer to activate. */
  basePlanId: string;
  /** Request body */
  body?: ActivateSubscriptionOfferRequest;
}

export const ActivateMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  body: Schema.optional(ActivateSubscriptionOfferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateMonetizationSubscriptionsBasePlansOffersRequest>;

export type ActivateMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;
export const ActivateMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;

export type ActivateMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Activates a subscription offer. Once activated, subscription offers will be available to new subscribers. */
export const activateMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<ActivateMonetizationSubscriptionsBasePlansOffersRequest, ActivateMonetizationSubscriptionsBasePlansOffersResponse, ActivateMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateMonetizationSubscriptionsBasePlansOffersRequest,
  output: ActivateMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface CreateMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent base plan (ID) for which the offer should be created. Must be equal to the base_plan_id field on the SubscriptionOffer resource. */
  basePlanId: string;
  /** Required. The ID to use for the offer. For the requirements on this format, see the documentation of the offer_id field on the SubscriptionOffer resource. */
  offerId?: string;
  /** Required. The parent app (package name) for which the offer should be created. Must be equal to the package_name field on the Subscription resource. */
  packageName: string;
  /** Required. The parent subscription (ID) for which the offer should be created. Must be equal to the product_id field on the SubscriptionOffer resource. */
  productId: string;
  /** Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available. */
  "regionsVersion.version"?: string;
  /** Request body */
  body?: SubscriptionOffer;
}

export const CreateMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  offerId: Schema.optional(Schema.String).pipe(T.HttpQuery("offerId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  "regionsVersion.version": Schema.optional(Schema.String).pipe(T.HttpQuery("regionsVersion.version")),
  body: Schema.optional(SubscriptionOffer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateMonetizationSubscriptionsBasePlansOffersRequest>;

export type CreateMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;
export const CreateMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;

export type CreateMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Creates a new subscription offer. Only auto-renewing base plans can have subscription offers. The offer state will be DRAFT until it is activated. */
export const createMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<CreateMonetizationSubscriptionsBasePlansOffersRequest, CreateMonetizationSubscriptionsBasePlansOffersResponse, CreateMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateMonetizationSubscriptionsBasePlansOffersRequest,
  output: CreateMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface DeactivateMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent app (package name) of the offer to deactivate. */
  packageName: string;
  /** Required. The parent base plan (ID) of the offer to deactivate. */
  basePlanId: string;
  /** Required. The parent subscription (ID) of the offer to deactivate. */
  productId: string;
  /** Required. The unique offer ID of the offer to deactivate. */
  offerId: string;
  /** Request body */
  body?: DeactivateSubscriptionOfferRequest;
}

export const DeactivateMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  offerId: Schema.String.pipe(T.HttpPath("offerId")),
  body: Schema.optional(DeactivateSubscriptionOfferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}:deactivate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeactivateMonetizationSubscriptionsBasePlansOffersRequest>;

export type DeactivateMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;
export const DeactivateMonetizationSubscriptionsBasePlansOffersResponse = SubscriptionOffer;

export type DeactivateMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Deactivates a subscription offer. Once deactivated, existing subscribers will maintain their subscription, but the offer will become unavailable to new subscribers. */
export const deactivateMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<DeactivateMonetizationSubscriptionsBasePlansOffersRequest, DeactivateMonetizationSubscriptionsBasePlansOffersResponse, DeactivateMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeactivateMonetizationSubscriptionsBasePlansOffersRequest,
  output: DeactivateMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface BatchUpdateMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent app (package name) of the updated subscription offers. Must be equal to the package_name field on all the updated SubscriptionOffer resources. */
  packageName: string;
  /** Required. The product ID of the parent subscription, if all updated offers belong to the same subscription. If this request spans multiple subscriptions, set this field to "-". Must be set. */
  productId: string;
  /** Required. The parent base plan (ID) for which the offers should be updated. May be specified as '-' to update offers from multiple base plans. */
  basePlanId: string;
  /** Request body */
  body?: BatchUpdateSubscriptionOffersRequest;
}

export const BatchUpdateMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  body: Schema.optional(BatchUpdateSubscriptionOffersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateMonetizationSubscriptionsBasePlansOffersRequest>;

export type BatchUpdateMonetizationSubscriptionsBasePlansOffersResponse = BatchUpdateSubscriptionOffersResponse;
export const BatchUpdateMonetizationSubscriptionsBasePlansOffersResponse = BatchUpdateSubscriptionOffersResponse;

export type BatchUpdateMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Updates a batch of subscription offers. Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. */
export const batchUpdateMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<BatchUpdateMonetizationSubscriptionsBasePlansOffersRequest, BatchUpdateMonetizationSubscriptionsBasePlansOffersResponse, BatchUpdateMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateMonetizationSubscriptionsBasePlansOffersRequest,
  output: BatchUpdateMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersRequest {
  /** Required. The parent base plan (ID) for which the offers should be updated. May be specified as '-' to update offers from multiple base plans. */
  basePlanId: string;
  /** Required. The product ID of the parent subscription, if all updated offers belong to the same subscription. If this request spans multiple subscriptions, set this field to "-". Must be set. */
  productId: string;
  /** Required. The parent app (package name) of the updated subscription offers. Must be equal to the package_name field on all the updated SubscriptionOffer resources. */
  packageName: string;
  /** Request body */
  body?: BatchUpdateSubscriptionOfferStatesRequest;
}

export const BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersRequest = Schema.Struct({
  basePlanId: Schema.String.pipe(T.HttpPath("basePlanId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(BatchUpdateSubscriptionOfferStatesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers:batchUpdateStates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersRequest>;

export type BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersResponse = BatchUpdateSubscriptionOfferStatesResponse;
export const BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersResponse = BatchUpdateSubscriptionOfferStatesResponse;

export type BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersError = CommonErrors;

/** Updates a batch of subscription offer states. Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. */
export const batchUpdateStatesMonetizationSubscriptionsBasePlansOffers: API.OperationMethod<BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersRequest, BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersResponse, BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersRequest,
  output: BatchUpdateStatesMonetizationSubscriptionsBasePlansOffersResponse,
  errors: [],
}));

export interface CreateGrantsRequest {
  /** Required. The user which needs permission. Format: developers/{developer}/users/{user} */
  parent: string;
  /** Request body */
  body?: Grant;
}

export const CreateGrantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Grant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/developers/{developersId}/users/{usersId}/grants", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGrantsRequest>;

export type CreateGrantsResponse = Grant;
export const CreateGrantsResponse = Grant;

export type CreateGrantsError = CommonErrors;

/** Grant access for a user to the given package. */
export const createGrants: API.OperationMethod<CreateGrantsRequest, CreateGrantsResponse, CreateGrantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGrantsRequest,
  output: CreateGrantsResponse,
  errors: [],
}));

export interface DeleteGrantsRequest {
  /** Required. The name of the grant to delete. Format: developers/{developer}/users/{email}/grants/{package_name} */
  name: string;
}

export const DeleteGrantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/developers/{developersId}/users/{usersId}/grants/{grantsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteGrantsRequest>;

export interface DeleteGrantsResponse {}
export const DeleteGrantsResponse: Schema.Schema<DeleteGrantsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteGrantsResponse>;

export type DeleteGrantsError = CommonErrors;

/** Removes all access for the user to the given package or developer account. */
export const deleteGrants: API.OperationMethod<DeleteGrantsRequest, DeleteGrantsResponse, DeleteGrantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGrantsRequest,
  output: DeleteGrantsResponse,
  errors: [],
}));

export interface PatchGrantsRequest {
  /** Required. Resource name for this grant, following the pattern "developers/{developer}/users/{email}/grants/{package_name}". If this grant is for a draft app, the app ID will be used in this resource name instead of the package name. */
  name: string;
  /** Optional. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Grant;
}

export const PatchGrantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Grant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/developers/{developersId}/users/{usersId}/grants/{grantsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchGrantsRequest>;

export type PatchGrantsResponse = Grant;
export const PatchGrantsResponse = Grant;

export type PatchGrantsError = CommonErrors;

/** Updates access for the user to the given package. */
export const patchGrants: API.OperationMethod<PatchGrantsRequest, PatchGrantsResponse, PatchGrantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchGrantsRequest,
  output: PatchGrantsResponse,
  errors: [],
}));

export interface UploadapkInternalappsharingartifactsRequest {
  /** Package name of the app. */
  packageName: string;
}

export const UploadapkInternalappsharingartifactsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/internalappsharing/{packageName}/artifacts/apk", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadapkInternalappsharingartifactsRequest>;

export type UploadapkInternalappsharingartifactsResponse = InternalAppSharingArtifact;
export const UploadapkInternalappsharingartifactsResponse = InternalAppSharingArtifact;

export type UploadapkInternalappsharingartifactsError = CommonErrors;

/** Uploads an APK to internal app sharing. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See [Timeouts and Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors) for an example in java. */
export const uploadapkInternalappsharingartifacts: API.OperationMethod<UploadapkInternalappsharingartifactsRequest, UploadapkInternalappsharingartifactsResponse, UploadapkInternalappsharingartifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadapkInternalappsharingartifactsRequest,
  output: UploadapkInternalappsharingartifactsResponse,
  errors: [],
}));

export interface UploadbundleInternalappsharingartifactsRequest {
  /** Package name of the app. */
  packageName: string;
}

export const UploadbundleInternalappsharingartifactsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/internalappsharing/{packageName}/artifacts/bundle", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadbundleInternalappsharingartifactsRequest>;

export type UploadbundleInternalappsharingartifactsResponse = InternalAppSharingArtifact;
export const UploadbundleInternalappsharingartifactsResponse = InternalAppSharingArtifact;

export type UploadbundleInternalappsharingartifactsError = CommonErrors;

/** Uploads an app bundle to internal app sharing. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See [Timeouts and Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors) for an example in java. */
export const uploadbundleInternalappsharingartifacts: API.OperationMethod<UploadbundleInternalappsharingartifactsRequest, UploadbundleInternalappsharingartifactsResponse, UploadbundleInternalappsharingartifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadbundleInternalappsharingartifactsRequest,
  output: UploadbundleInternalappsharingartifactsResponse,
  errors: [],
}));

export interface ListApprecoveryRequest {
  /** Required. Package name of the app for which list of recovery actions is requested. */
  packageName: string;
  /** Required. Version code targeted by the list of recovery actions. */
  versionCode?: string;
}

export const ListApprecoveryRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  versionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("versionCode")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/appRecoveries" }),
  svc,
) as unknown as Schema.Schema<ListApprecoveryRequest>;

export type ListApprecoveryResponse = ListAppRecoveriesResponse;
export const ListApprecoveryResponse = ListAppRecoveriesResponse;

export type ListApprecoveryError = CommonErrors;

/** List all app recovery action resources associated with a particular package name and app version. */
export const listApprecovery: API.OperationMethod<ListApprecoveryRequest, ListApprecoveryResponse, ListApprecoveryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListApprecoveryRequest,
  output: ListApprecoveryResponse,
  errors: [],
}));

export interface DeployApprecoveryRequest {
  /** Required. Package name of the app for which recovery action is deployed. */
  packageName: string;
  /** Required. ID corresponding to the app recovery action to deploy. */
  appRecoveryId: string;
  /** Request body */
  body?: DeployAppRecoveryRequest;
}

export const DeployApprecoveryRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  appRecoveryId: Schema.String.pipe(T.HttpPath("appRecoveryId")),
  body: Schema.optional(DeployAppRecoveryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/appRecoveries/{appRecoveryId}:deploy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeployApprecoveryRequest>;

export type DeployApprecoveryResponse = DeployAppRecoveryResponse;
export const DeployApprecoveryResponse = DeployAppRecoveryResponse;

export type DeployApprecoveryError = CommonErrors;

/** Deploy an already created app recovery action with recovery status DRAFT. Note that this action activates the recovery action for all targeted users and changes its status to ACTIVE. */
export const deployApprecovery: API.OperationMethod<DeployApprecoveryRequest, DeployApprecoveryResponse, DeployApprecoveryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeployApprecoveryRequest,
  output: DeployApprecoveryResponse,
  errors: [],
}));

export interface AddTargetingApprecoveryRequest {
  /** Required. Package name of the app for which recovery action is to be updated. */
  packageName: string;
  /** Required. ID corresponding to the app recovery action. */
  appRecoveryId: string;
  /** Request body */
  body?: AddTargetingRequest;
}

export const AddTargetingApprecoveryRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  appRecoveryId: Schema.String.pipe(T.HttpPath("appRecoveryId")),
  body: Schema.optional(AddTargetingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/appRecoveries/{appRecoveryId}:addTargeting", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddTargetingApprecoveryRequest>;

export type AddTargetingApprecoveryResponse = AddTargetingResponse;
export const AddTargetingApprecoveryResponse = AddTargetingResponse;

export type AddTargetingApprecoveryError = CommonErrors;

/** Incrementally update targeting for a recovery action. Note that only the criteria selected during the creation of recovery action can be expanded. */
export const addTargetingApprecovery: API.OperationMethod<AddTargetingApprecoveryRequest, AddTargetingApprecoveryResponse, AddTargetingApprecoveryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddTargetingApprecoveryRequest,
  output: AddTargetingApprecoveryResponse,
  errors: [],
}));

export interface CreateApprecoveryRequest {
  /** Required. Package name of the app on which recovery action is performed. */
  packageName: string;
  /** Request body */
  body?: CreateDraftAppRecoveryRequest;
}

export const CreateApprecoveryRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(CreateDraftAppRecoveryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/appRecoveries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateApprecoveryRequest>;

export type CreateApprecoveryResponse = AppRecoveryAction;
export const CreateApprecoveryResponse = AppRecoveryAction;

export type CreateApprecoveryError = CommonErrors;

/** Create an app recovery action with recovery status as DRAFT. Note that this action does not execute the recovery action. */
export const createApprecovery: API.OperationMethod<CreateApprecoveryRequest, CreateApprecoveryResponse, CreateApprecoveryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateApprecoveryRequest,
  output: CreateApprecoveryResponse,
  errors: [],
}));

export interface CancelApprecoveryRequest {
  /** Required. Package name of the app for which recovery action cancellation is requested. */
  packageName: string;
  /** Required. ID corresponding to the app recovery action. */
  appRecoveryId: string;
  /** Request body */
  body?: CancelAppRecoveryRequest;
}

export const CancelApprecoveryRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  appRecoveryId: Schema.String.pipe(T.HttpPath("appRecoveryId")),
  body: Schema.optional(CancelAppRecoveryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/appRecoveries/{appRecoveryId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelApprecoveryRequest>;

export type CancelApprecoveryResponse = CancelAppRecoveryResponse;
export const CancelApprecoveryResponse = CancelAppRecoveryResponse;

export type CancelApprecoveryError = CommonErrors;

/** Cancel an already executing app recovery action. Note that this action changes status of the recovery action to CANCELED. */
export const cancelApprecovery: API.OperationMethod<CancelApprecoveryRequest, CancelApprecoveryResponse, CancelApprecoveryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelApprecoveryRequest,
  output: CancelApprecoveryResponse,
  errors: [],
}));

export interface GetReviewsRequest {
  /** Language localization code. */
  translationLanguage?: string;
  /** Package name of the app. */
  packageName: string;
  /** Unique identifier for a review. */
  reviewId: string;
}

export const GetReviewsRequest = Schema.Struct({
  translationLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("translationLanguage")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  reviewId: Schema.String.pipe(T.HttpPath("reviewId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/reviews/{reviewId}" }),
  svc,
) as unknown as Schema.Schema<GetReviewsRequest>;

export type GetReviewsResponse = Review;
export const GetReviewsResponse = Review;

export type GetReviewsError = CommonErrors;

/** Gets a single review. */
export const getReviews: API.OperationMethod<GetReviewsRequest, GetReviewsResponse, GetReviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetReviewsRequest,
  output: GetReviewsResponse,
  errors: [],
}));

export interface ReplyReviewsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Unique identifier for a review. */
  reviewId: string;
  /** Request body */
  body?: ReviewsReplyRequest;
}

export const ReplyReviewsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  reviewId: Schema.String.pipe(T.HttpPath("reviewId")),
  body: Schema.optional(ReviewsReplyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/reviews/{reviewId}:reply", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplyReviewsRequest>;

export type ReplyReviewsResponse = ReviewsReplyResponse;
export const ReplyReviewsResponse = ReviewsReplyResponse;

export type ReplyReviewsError = CommonErrors;

/** Replies to a single review, or updates an existing reply. */
export const replyReviews: API.OperationMethod<ReplyReviewsRequest, ReplyReviewsResponse, ReplyReviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplyReviewsRequest,
  output: ReplyReviewsResponse,
  errors: [],
}));

export interface ListReviewsRequest {
  /** Package name of the app. */
  packageName: string;
  /** How many results the list operation should return. */
  maxResults?: number;
  /** Language localization code. */
  translationLanguage?: string;
  /** Pagination token. If empty, list starts at the first review. */
  token?: string;
  /** The index of the first element to return. */
  startIndex?: number;
}

export const ListReviewsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  translationLanguage: Schema.optional(Schema.String).pipe(T.HttpQuery("translationLanguage")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/reviews" }),
  svc,
) as unknown as Schema.Schema<ListReviewsRequest>;

export type ListReviewsResponse = ReviewsListResponse;
export const ListReviewsResponse = ReviewsListResponse;

export type ListReviewsError = CommonErrors;

/** Lists all reviews. */
export const listReviews: API.OperationMethod<ListReviewsRequest, ListReviewsResponse, ListReviewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListReviewsRequest,
  output: ListReviewsResponse,
  errors: [],
}));

export interface DataSafetyApplicationsRequest {
  /** Required. Package name of the app. */
  packageName: string;
  /** Request body */
  body?: SafetyLabelsUpdateRequest;
}

export const DataSafetyApplicationsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(SafetyLabelsUpdateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/dataSafety", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DataSafetyApplicationsRequest>;

export type DataSafetyApplicationsResponse = SafetyLabelsUpdateResponse;
export const DataSafetyApplicationsResponse = SafetyLabelsUpdateResponse;

export type DataSafetyApplicationsError = CommonErrors;

/** Writes the Safety Labels declaration of an app. */
export const dataSafetyApplications: API.OperationMethod<DataSafetyApplicationsRequest, DataSafetyApplicationsResponse, DataSafetyApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DataSafetyApplicationsRequest,
  output: DataSafetyApplicationsResponse,
  errors: [],
}));

export interface GetApplicationsDeviceTierConfigsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Required. Id of an existing device tier config. */
  deviceTierConfigId: string;
}

export const GetApplicationsDeviceTierConfigsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  deviceTierConfigId: Schema.String.pipe(T.HttpPath("deviceTierConfigId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/deviceTierConfigs/{deviceTierConfigId}" }),
  svc,
) as unknown as Schema.Schema<GetApplicationsDeviceTierConfigsRequest>;

export type GetApplicationsDeviceTierConfigsResponse = DeviceTierConfig;
export const GetApplicationsDeviceTierConfigsResponse = DeviceTierConfig;

export type GetApplicationsDeviceTierConfigsError = CommonErrors;

/** Returns a particular device tier config. */
export const getApplicationsDeviceTierConfigs: API.OperationMethod<GetApplicationsDeviceTierConfigsRequest, GetApplicationsDeviceTierConfigsResponse, GetApplicationsDeviceTierConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetApplicationsDeviceTierConfigsRequest,
  output: GetApplicationsDeviceTierConfigsResponse,
  errors: [],
}));

export interface CreateApplicationsDeviceTierConfigsRequest {
  /** Whether the service should accept device IDs that are unknown to Play's device catalog. */
  allowUnknownDevices?: boolean;
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: DeviceTierConfig;
}

export const CreateApplicationsDeviceTierConfigsRequest = Schema.Struct({
  allowUnknownDevices: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowUnknownDevices")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(DeviceTierConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/deviceTierConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateApplicationsDeviceTierConfigsRequest>;

export type CreateApplicationsDeviceTierConfigsResponse = DeviceTierConfig;
export const CreateApplicationsDeviceTierConfigsResponse = DeviceTierConfig;

export type CreateApplicationsDeviceTierConfigsError = CommonErrors;

/** Creates a new device tier config for an app. */
export const createApplicationsDeviceTierConfigs: API.OperationMethod<CreateApplicationsDeviceTierConfigsRequest, CreateApplicationsDeviceTierConfigsResponse, CreateApplicationsDeviceTierConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateApplicationsDeviceTierConfigsRequest,
  output: CreateApplicationsDeviceTierConfigsResponse,
  errors: [],
}));

export interface ListApplicationsDeviceTierConfigsRequest {
  /** A page token, received from a previous `ListDeviceTierConfigs` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Package name of the app. */
  packageName: string;
  /** The maximum number of device tier configs to return. The service may return fewer than this value. If unspecified, at most 10 device tier configs will be returned. The maximum value for this field is 100; values above 100 will be coerced to 100. Device tier configs will be ordered by descending creation time. */
  pageSize?: number;
}

export const ListApplicationsDeviceTierConfigsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/deviceTierConfigs" }),
  svc,
) as unknown as Schema.Schema<ListApplicationsDeviceTierConfigsRequest>;

export type ListApplicationsDeviceTierConfigsResponse = ListDeviceTierConfigsResponse;
export const ListApplicationsDeviceTierConfigsResponse = ListDeviceTierConfigsResponse;

export type ListApplicationsDeviceTierConfigsError = CommonErrors;

/** Returns created device tier configs, ordered by descending creation time. */
export const listApplicationsDeviceTierConfigs: API.PaginatedOperationMethod<ListApplicationsDeviceTierConfigsRequest, ListApplicationsDeviceTierConfigsResponse, ListApplicationsDeviceTierConfigsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListApplicationsDeviceTierConfigsRequest,
  output: ListApplicationsDeviceTierConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateInappproductsRequest {
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Unique identifier for the in-app product. */
  sku: string;
  /** If true the prices for all regions targeted by the parent app that don't have a price specified for this in-app product will be auto converted to the target currency based on the default price. Defaults to false. */
  autoConvertMissingPrices?: boolean;
  /** Package name of the app. */
  packageName: string;
  /** If set to true, and the in-app product with the given package_name and sku doesn't exist, the in-app product will be created. */
  allowMissing?: boolean;
  /** Request body */
  body?: InAppProduct;
}

export const UpdateInappproductsRequest = Schema.Struct({
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  sku: Schema.String.pipe(T.HttpPath("sku")),
  autoConvertMissingPrices: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("autoConvertMissingPrices")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(InAppProduct).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateInappproductsRequest>;

export type UpdateInappproductsResponse = InAppProduct;
export const UpdateInappproductsResponse = InAppProduct;

export type UpdateInappproductsError = CommonErrors;

/** Updates an in-app product (a managed product or a subscription). This method should no longer be used to update subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const updateInappproducts: API.OperationMethod<UpdateInappproductsRequest, UpdateInappproductsResponse, UpdateInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateInappproductsRequest,
  output: UpdateInappproductsResponse,
  errors: [],
}));

export interface BatchUpdateInappproductsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: InappproductsBatchUpdateRequest;
}

export const BatchUpdateInappproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(InappproductsBatchUpdateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/inappproducts:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateInappproductsRequest>;

export type BatchUpdateInappproductsResponse = InappproductsBatchUpdateResponse;
export const BatchUpdateInappproductsResponse = InappproductsBatchUpdateResponse;

export type BatchUpdateInappproductsError = CommonErrors;

/** Updates or inserts one or more in-app products (managed products or subscriptions). Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. This method should no longer be used to update subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const batchUpdateInappproducts: API.OperationMethod<BatchUpdateInappproductsRequest, BatchUpdateInappproductsResponse, BatchUpdateInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateInappproductsRequest,
  output: BatchUpdateInappproductsResponse,
  errors: [],
}));

export interface BatchGetInappproductsRequest {
  /** Unique identifier for the in-app products. */
  sku?: string[];
  /** Package name of the app. */
  packageName: string;
}

export const BatchGetInappproductsRequest = Schema.Struct({
  sku: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("sku")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/inappproducts:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetInappproductsRequest>;

export type BatchGetInappproductsResponse = InappproductsBatchGetResponse;
export const BatchGetInappproductsResponse = InappproductsBatchGetResponse;

export type BatchGetInappproductsError = CommonErrors;

/** Reads multiple in-app products, which can be managed products or subscriptions. This method should not be used to retrieve subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const batchGetInappproducts: API.OperationMethod<BatchGetInappproductsRequest, BatchGetInappproductsResponse, BatchGetInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetInappproductsRequest,
  output: BatchGetInappproductsResponse,
  errors: [],
}));

export interface ListInappproductsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Deprecated and ignored. Set the `token` parameter to retrieve the next page. */
  startIndex?: number;
  /** Deprecated and ignored. The page size is determined by the server. */
  maxResults?: number;
  /** Pagination token. If empty, list starts at the first product. */
  token?: string;
}

export const ListInappproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/inappproducts" }),
  svc,
) as unknown as Schema.Schema<ListInappproductsRequest>;

export type ListInappproductsResponse = InappproductsListResponse;
export const ListInappproductsResponse = InappproductsListResponse;

export type ListInappproductsError = CommonErrors;

/** Lists all in-app products - both managed products and subscriptions. If an app has a large number of in-app products, the response may be paginated. In this case the response field `tokenPagination.nextPageToken` will be set and the caller should provide its value as a `token` request parameter to retrieve the next page. This method should no longer be used to retrieve subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const listInappproducts: API.OperationMethod<ListInappproductsRequest, ListInappproductsResponse, ListInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListInappproductsRequest,
  output: ListInappproductsResponse,
  errors: [],
}));

export interface GetInappproductsRequest {
  /** Unique identifier for the in-app product. */
  sku: string;
  /** Package name of the app. */
  packageName: string;
}

export const GetInappproductsRequest = Schema.Struct({
  sku: Schema.String.pipe(T.HttpPath("sku")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}" }),
  svc,
) as unknown as Schema.Schema<GetInappproductsRequest>;

export type GetInappproductsResponse = InAppProduct;
export const GetInappproductsResponse = InAppProduct;

export type GetInappproductsError = CommonErrors;

/** Gets an in-app product, which can be a managed product or a subscription. This method should no longer be used to retrieve subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const getInappproducts: API.OperationMethod<GetInappproductsRequest, GetInappproductsResponse, GetInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInappproductsRequest,
  output: GetInappproductsResponse,
  errors: [],
}));

export interface InsertInappproductsRequest {
  /** Package name of the app. */
  packageName: string;
  /** If true the prices for all regions targeted by the parent app that don't have a price specified for this in-app product will be auto converted to the target currency based on the default price. Defaults to false. */
  autoConvertMissingPrices?: boolean;
  /** Request body */
  body?: InAppProduct;
}

export const InsertInappproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  autoConvertMissingPrices: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("autoConvertMissingPrices")),
  body: Schema.optional(InAppProduct).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/inappproducts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertInappproductsRequest>;

export type InsertInappproductsResponse = InAppProduct;
export const InsertInappproductsResponse = InAppProduct;

export type InsertInappproductsError = CommonErrors;

/** Creates an in-app product (a managed product or a subscription). This method should no longer be used to create subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const insertInappproducts: API.OperationMethod<InsertInappproductsRequest, InsertInappproductsResponse, InsertInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertInappproductsRequest,
  output: InsertInappproductsResponse,
  errors: [],
}));

export interface DeleteInappproductsRequest {
  /** Unique identifier for the in-app product. */
  sku: string;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Package name of the app. */
  packageName: string;
}

export const DeleteInappproductsRequest = Schema.Struct({
  sku: Schema.String.pipe(T.HttpPath("sku")),
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}" }),
  svc,
) as unknown as Schema.Schema<DeleteInappproductsRequest>;

export interface DeleteInappproductsResponse {}
export const DeleteInappproductsResponse: Schema.Schema<DeleteInappproductsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteInappproductsResponse>;

export type DeleteInappproductsError = CommonErrors;

/** Deletes an in-app product (a managed product or a subscription). This method should no longer be used to delete subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const deleteInappproducts: API.OperationMethod<DeleteInappproductsRequest, DeleteInappproductsResponse, DeleteInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInappproductsRequest,
  output: DeleteInappproductsResponse,
  errors: [],
}));

export interface PatchInappproductsRequest {
  /** If true the prices for all regions targeted by the parent app that don't have a price specified for this in-app product will be auto converted to the target currency based on the default price. Defaults to false. */
  autoConvertMissingPrices?: boolean;
  /** Optional. The latency tolerance for the propagation of this product update. Defaults to latency-sensitive. */
  latencyTolerance?: "PRODUCT_UPDATE_LATENCY_TOLERANCE_UNSPECIFIED" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_SENSITIVE" | "PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT" | (string & {});
  /** Package name of the app. */
  packageName: string;
  /** Unique identifier for the in-app product. */
  sku: string;
  /** Request body */
  body?: InAppProduct;
}

export const PatchInappproductsRequest = Schema.Struct({
  autoConvertMissingPrices: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("autoConvertMissingPrices")),
  latencyTolerance: Schema.optional(Schema.String).pipe(T.HttpQuery("latencyTolerance")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  sku: Schema.String.pipe(T.HttpPath("sku")),
  body: Schema.optional(InAppProduct).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInappproductsRequest>;

export type PatchInappproductsResponse = InAppProduct;
export const PatchInappproductsResponse = InAppProduct;

export type PatchInappproductsError = CommonErrors;

/** Patches an in-app product (a managed product or a subscription). This method should no longer be used to update subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const patchInappproducts: API.OperationMethod<PatchInappproductsRequest, PatchInappproductsResponse, PatchInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInappproductsRequest,
  output: PatchInappproductsResponse,
  errors: [],
}));

export interface BatchDeleteInappproductsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: InappproductsBatchDeleteRequest;
}

export const BatchDeleteInappproductsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(InappproductsBatchDeleteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/inappproducts:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteInappproductsRequest>;

export interface BatchDeleteInappproductsResponse {}
export const BatchDeleteInappproductsResponse: Schema.Schema<BatchDeleteInappproductsResponse> = Schema.Struct({}) as any as Schema.Schema<BatchDeleteInappproductsResponse>;

export type BatchDeleteInappproductsError = CommonErrors;

/** Deletes in-app products (managed products or subscriptions). Set the latencyTolerance field on nested requests to PRODUCT_UPDATE_LATENCY_TOLERANCE_LATENCY_TOLERANT to achieve maximum update throughput. This method should not be used to delete subscriptions. See [this article](https://android-developers.googleblog.com/2023/06/changes-to-google-play-developer-api-june-2023.html) for more information. */
export const batchDeleteInappproducts: API.OperationMethod<BatchDeleteInappproductsRequest, BatchDeleteInappproductsResponse, BatchDeleteInappproductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteInappproductsRequest,
  output: BatchDeleteInappproductsResponse,
  errors: [],
}));

export interface GetEditsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
}

export const GetEditsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}" }),
  svc,
) as unknown as Schema.Schema<GetEditsRequest>;

export type GetEditsResponse = AppEdit;
export const GetEditsResponse = AppEdit;

export type GetEditsError = CommonErrors;

/** Gets an app edit. */
export const getEdits: API.OperationMethod<GetEditsRequest, GetEditsResponse, GetEditsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsRequest,
  output: GetEditsResponse,
  errors: [],
}));

export interface DeleteEditsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
}

export const DeleteEditsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEditsRequest>;

export interface DeleteEditsResponse {}
export const DeleteEditsResponse: Schema.Schema<DeleteEditsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteEditsResponse>;

export type DeleteEditsError = CommonErrors;

/** Deletes an app edit. */
export const deleteEdits: API.OperationMethod<DeleteEditsRequest, DeleteEditsResponse, DeleteEditsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEditsRequest,
  output: DeleteEditsResponse,
  errors: [],
}));

export interface ValidateEditsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
}

export const ValidateEditsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateEditsRequest>;

export type ValidateEditsResponse = AppEdit;
export const ValidateEditsResponse = AppEdit;

export type ValidateEditsError = CommonErrors;

/** Validates an app edit. */
export const validateEdits: API.OperationMethod<ValidateEditsRequest, ValidateEditsResponse, ValidateEditsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateEditsRequest,
  output: ValidateEditsResponse,
  errors: [],
}));

export interface InsertEditsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: AppEdit;
}

export const InsertEditsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(AppEdit).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertEditsRequest>;

export type InsertEditsResponse = AppEdit;
export const InsertEditsResponse = AppEdit;

export type InsertEditsError = CommonErrors;

/** Creates a new edit for an app. */
export const insertEdits: API.OperationMethod<InsertEditsRequest, InsertEditsResponse, InsertEditsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertEditsRequest,
  output: InsertEditsResponse,
  errors: [],
}));

export interface CommitEditsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** When a rejection happens, the parameter will make sure that the changes in this edit won't be reviewed until they are explicitly sent for review from within the Google Play Console UI. These changes will be added to any other changes that are not yet sent for review. */
  changesNotSentForReview?: boolean;
}

export const CommitEditsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  changesNotSentForReview: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("changesNotSentForReview")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitEditsRequest>;

export type CommitEditsResponse = AppEdit;
export const CommitEditsResponse = AppEdit;

export type CommitEditsError = CommonErrors;

/** Commits an app edit. */
export const commitEdits: API.OperationMethod<CommitEditsRequest, CommitEditsResponse, CommitEditsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitEditsRequest,
  output: CommitEditsResponse,
  errors: [],
}));

export interface GetEditsTestersRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** The track to read from. */
  track: string;
}

export const GetEditsTestersRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  track: Schema.String.pipe(T.HttpPath("track")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/testers/{track}" }),
  svc,
) as unknown as Schema.Schema<GetEditsTestersRequest>;

export type GetEditsTestersResponse = Testers;
export const GetEditsTestersResponse = Testers;

export type GetEditsTestersError = CommonErrors;

/** Gets testers. Note: Testers resource does not support email lists. */
export const getEditsTesters: API.OperationMethod<GetEditsTestersRequest, GetEditsTestersResponse, GetEditsTestersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsTestersRequest,
  output: GetEditsTestersResponse,
  errors: [],
}));

export interface PatchEditsTestersRequest {
  /** The track to update. */
  track: string;
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Request body */
  body?: Testers;
}

export const PatchEditsTestersRequest = Schema.Struct({
  track: Schema.String.pipe(T.HttpPath("track")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  body: Schema.optional(Testers).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/testers/{track}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEditsTestersRequest>;

export type PatchEditsTestersResponse = Testers;
export const PatchEditsTestersResponse = Testers;

export type PatchEditsTestersError = CommonErrors;

/** Patches testers. Note: Testers resource does not support email lists. */
export const patchEditsTesters: API.OperationMethod<PatchEditsTestersRequest, PatchEditsTestersResponse, PatchEditsTestersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEditsTestersRequest,
  output: PatchEditsTestersResponse,
  errors: [],
}));

export interface UpdateEditsTestersRequest {
  /** The track to update. */
  track: string;
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: Testers;
}

export const UpdateEditsTestersRequest = Schema.Struct({
  track: Schema.String.pipe(T.HttpPath("track")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(Testers).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/testers/{track}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEditsTestersRequest>;

export type UpdateEditsTestersResponse = Testers;
export const UpdateEditsTestersResponse = Testers;

export type UpdateEditsTestersError = CommonErrors;

/** Updates testers. Note: Testers resource does not support email lists. */
export const updateEditsTesters: API.OperationMethod<UpdateEditsTestersRequest, UpdateEditsTestersResponse, UpdateEditsTestersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEditsTestersRequest,
  output: UpdateEditsTestersResponse,
  errors: [],
}));

export interface PatchEditsTracksRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Identifier of the track. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name) */
  track: string;
  /** Request body */
  body?: Track;
}

export const PatchEditsTracksRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  track: Schema.String.pipe(T.HttpPath("track")),
  body: Schema.optional(Track).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks/{track}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEditsTracksRequest>;

export type PatchEditsTracksResponse = Track;
export const PatchEditsTracksResponse = Track;

export type PatchEditsTracksError = CommonErrors;

/** Patches a track. */
export const patchEditsTracks: API.OperationMethod<PatchEditsTracksRequest, PatchEditsTracksResponse, PatchEditsTracksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEditsTracksRequest,
  output: PatchEditsTracksResponse,
  errors: [],
}));

export interface CreateEditsTracksRequest {
  /** Required. Package name of the app. */
  packageName: string;
  /** Required. Identifier of the edit. */
  editId: string;
  /** Request body */
  body?: TrackConfig;
}

export const CreateEditsTracksRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  body: Schema.optional(TrackConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEditsTracksRequest>;

export type CreateEditsTracksResponse = Track;
export const CreateEditsTracksResponse = Track;

export type CreateEditsTracksError = CommonErrors;

/** Creates a new track. */
export const createEditsTracks: API.OperationMethod<CreateEditsTracksRequest, CreateEditsTracksResponse, CreateEditsTracksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEditsTracksRequest,
  output: CreateEditsTracksResponse,
  errors: [],
}));

export interface ListEditsTracksRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
}

export const ListEditsTracksRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks" }),
  svc,
) as unknown as Schema.Schema<ListEditsTracksRequest>;

export type ListEditsTracksResponse = TracksListResponse;
export const ListEditsTracksResponse = TracksListResponse;

export type ListEditsTracksError = CommonErrors;

/** Lists all tracks. */
export const listEditsTracks: API.OperationMethod<ListEditsTracksRequest, ListEditsTracksResponse, ListEditsTracksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEditsTracksRequest,
  output: ListEditsTracksResponse,
  errors: [],
}));

export interface GetEditsTracksRequest {
  /** Identifier of the track. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name) */
  track: string;
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
}

export const GetEditsTracksRequest = Schema.Struct({
  track: Schema.String.pipe(T.HttpPath("track")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks/{track}" }),
  svc,
) as unknown as Schema.Schema<GetEditsTracksRequest>;

export type GetEditsTracksResponse = Track;
export const GetEditsTracksResponse = Track;

export type GetEditsTracksError = CommonErrors;

/** Gets a track. */
export const getEditsTracks: API.OperationMethod<GetEditsTracksRequest, GetEditsTracksResponse, GetEditsTracksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsTracksRequest,
  output: GetEditsTracksResponse,
  errors: [],
}));

export interface UpdateEditsTracksRequest {
  /** Identifier of the track. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name) */
  track: string;
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Request body */
  body?: Track;
}

export const UpdateEditsTracksRequest = Schema.Struct({
  track: Schema.String.pipe(T.HttpPath("track")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  body: Schema.optional(Track).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks/{track}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEditsTracksRequest>;

export type UpdateEditsTracksResponse = Track;
export const UpdateEditsTracksResponse = Track;

export type UpdateEditsTracksError = CommonErrors;

/** Updates a track. */
export const updateEditsTracks: API.OperationMethod<UpdateEditsTracksRequest, UpdateEditsTracksResponse, UpdateEditsTracksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEditsTracksRequest,
  output: UpdateEditsTracksResponse,
  errors: [],
}));

export interface GetEditsCountryavailabilityRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** The track to read from. */
  track: string;
}

export const GetEditsCountryavailabilityRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  track: Schema.String.pipe(T.HttpPath("track")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/countryAvailability/{track}" }),
  svc,
) as unknown as Schema.Schema<GetEditsCountryavailabilityRequest>;

export type GetEditsCountryavailabilityResponse = TrackCountryAvailability;
export const GetEditsCountryavailabilityResponse = TrackCountryAvailability;

export type GetEditsCountryavailabilityError = CommonErrors;

/** Gets country availability. */
export const getEditsCountryavailability: API.OperationMethod<GetEditsCountryavailabilityRequest, GetEditsCountryavailabilityResponse, GetEditsCountryavailabilityError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsCountryavailabilityRequest,
  output: GetEditsCountryavailabilityResponse,
  errors: [],
}));

export interface ListEditsBundlesRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
}

export const ListEditsBundlesRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/bundles" }),
  svc,
) as unknown as Schema.Schema<ListEditsBundlesRequest>;

export type ListEditsBundlesResponse = BundlesListResponse;
export const ListEditsBundlesResponse = BundlesListResponse;

export type ListEditsBundlesError = CommonErrors;

/** Lists all current Android App Bundles of the app and edit. */
export const listEditsBundles: API.OperationMethod<ListEditsBundlesRequest, ListEditsBundlesResponse, ListEditsBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEditsBundlesRequest,
  output: ListEditsBundlesResponse,
  errors: [],
}));

export interface UploadEditsBundlesRequest {
  /** Deprecated. The installation warning has been removed, it's not necessary to set this field anymore. */
  ackBundleInstallationWarning?: boolean;
  /** Package name of the app. */
  packageName: string;
  /** Device tier config (DTC) to be used for generating deliverables (APKs). Contains id of the DTC or "LATEST" for last uploaded DTC. */
  deviceTierConfigId?: string;
  /** Identifier of the edit. */
  editId: string;
}

export const UploadEditsBundlesRequest = Schema.Struct({
  ackBundleInstallationWarning: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ackBundleInstallationWarning")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  deviceTierConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("deviceTierConfigId")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/bundles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadEditsBundlesRequest>;

export type UploadEditsBundlesResponse = Bundle;
export const UploadEditsBundlesResponse = Bundle;

export type UploadEditsBundlesError = CommonErrors;

/** Uploads a new Android App Bundle to this edit. If you are using the Google API client libraries, please increase the timeout of the http request before calling this endpoint (a timeout of 2 minutes is recommended). See [Timeouts and Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors) for an example in java. */
export const uploadEditsBundles: API.OperationMethod<UploadEditsBundlesRequest, UploadEditsBundlesResponse, UploadEditsBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadEditsBundlesRequest,
  output: UploadEditsBundlesResponse,
  errors: [],
}));

export interface UploadEditsDeobfuscationfilesRequest {
  /** The version code of the APK whose Deobfuscation File is being uploaded. */
  apkVersionCode: number;
  /** Unique identifier for the Android app. */
  packageName: string;
  /** Unique identifier for this edit. */
  editId: string;
  /** The type of the deobfuscation file. */
  deobfuscationFileType: "deobfuscationFileTypeUnspecified" | "proguard" | "nativeCode" | (string & {});
}

export const UploadEditsDeobfuscationfilesRequest = Schema.Struct({
  apkVersionCode: Schema.Number.pipe(T.HttpPath("apkVersionCode")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  deobfuscationFileType: Schema.String.pipe(T.HttpPath("deobfuscationFileType")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/deobfuscationFiles/{deobfuscationFileType}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadEditsDeobfuscationfilesRequest>;

export type UploadEditsDeobfuscationfilesResponse = DeobfuscationFilesUploadResponse;
export const UploadEditsDeobfuscationfilesResponse = DeobfuscationFilesUploadResponse;

export type UploadEditsDeobfuscationfilesError = CommonErrors;

/** Uploads a new deobfuscation file and attaches to the specified APK. */
export const uploadEditsDeobfuscationfiles: API.OperationMethod<UploadEditsDeobfuscationfilesRequest, UploadEditsDeobfuscationfilesResponse, UploadEditsDeobfuscationfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadEditsDeobfuscationfilesRequest,
  output: UploadEditsDeobfuscationfilesResponse,
  errors: [],
}));

export interface GetEditsExpansionfilesRequest {
  /** The version code of the APK whose expansion file configuration is being read or modified. */
  apkVersionCode: number;
  /** Package name of the app. */
  packageName: string;
  /** The file type of the file configuration which is being read or modified. */
  expansionFileType: "expansionFileTypeUnspecified" | "main" | "patch" | (string & {});
  /** Identifier of the edit. */
  editId: string;
}

export const GetEditsExpansionfilesRequest = Schema.Struct({
  apkVersionCode: Schema.Number.pipe(T.HttpPath("apkVersionCode")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  expansionFileType: Schema.String.pipe(T.HttpPath("expansionFileType")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}" }),
  svc,
) as unknown as Schema.Schema<GetEditsExpansionfilesRequest>;

export type GetEditsExpansionfilesResponse = ExpansionFile;
export const GetEditsExpansionfilesResponse = ExpansionFile;

export type GetEditsExpansionfilesError = CommonErrors;

/** Fetches the expansion file configuration for the specified APK. */
export const getEditsExpansionfiles: API.OperationMethod<GetEditsExpansionfilesRequest, GetEditsExpansionfilesResponse, GetEditsExpansionfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsExpansionfilesRequest,
  output: GetEditsExpansionfilesResponse,
  errors: [],
}));

export interface PatchEditsExpansionfilesRequest {
  /** The version code of the APK whose expansion file configuration is being read or modified. */
  apkVersionCode: number;
  /** Package name of the app. */
  packageName: string;
  /** The file type of the expansion file configuration which is being updated. */
  expansionFileType: "expansionFileTypeUnspecified" | "main" | "patch" | (string & {});
  /** Identifier of the edit. */
  editId: string;
  /** Request body */
  body?: ExpansionFile;
}

export const PatchEditsExpansionfilesRequest = Schema.Struct({
  apkVersionCode: Schema.Number.pipe(T.HttpPath("apkVersionCode")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  expansionFileType: Schema.String.pipe(T.HttpPath("expansionFileType")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  body: Schema.optional(ExpansionFile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEditsExpansionfilesRequest>;

export type PatchEditsExpansionfilesResponse = ExpansionFile;
export const PatchEditsExpansionfilesResponse = ExpansionFile;

export type PatchEditsExpansionfilesError = CommonErrors;

/** Patches the APK's expansion file configuration to reference another APK's expansion file. To add a new expansion file use the Upload method. */
export const patchEditsExpansionfiles: API.OperationMethod<PatchEditsExpansionfilesRequest, PatchEditsExpansionfilesResponse, PatchEditsExpansionfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEditsExpansionfilesRequest,
  output: PatchEditsExpansionfilesResponse,
  errors: [],
}));

export interface UpdateEditsExpansionfilesRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** The file type of the file configuration which is being read or modified. */
  expansionFileType: "expansionFileTypeUnspecified" | "main" | "patch" | (string & {});
  /** The version code of the APK whose expansion file configuration is being read or modified. */
  apkVersionCode: number;
  /** Request body */
  body?: ExpansionFile;
}

export const UpdateEditsExpansionfilesRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  expansionFileType: Schema.String.pipe(T.HttpPath("expansionFileType")),
  apkVersionCode: Schema.Number.pipe(T.HttpPath("apkVersionCode")),
  body: Schema.optional(ExpansionFile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEditsExpansionfilesRequest>;

export type UpdateEditsExpansionfilesResponse = ExpansionFile;
export const UpdateEditsExpansionfilesResponse = ExpansionFile;

export type UpdateEditsExpansionfilesError = CommonErrors;

/** Updates the APK's expansion file configuration to reference another APK's expansion file. To add a new expansion file use the Upload method. */
export const updateEditsExpansionfiles: API.OperationMethod<UpdateEditsExpansionfilesRequest, UpdateEditsExpansionfilesResponse, UpdateEditsExpansionfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEditsExpansionfilesRequest,
  output: UpdateEditsExpansionfilesResponse,
  errors: [],
}));

export interface UploadEditsExpansionfilesRequest {
  /** The version code of the APK whose expansion file configuration is being read or modified. */
  apkVersionCode: number;
  /** Package name of the app. */
  packageName: string;
  /** The file type of the expansion file configuration which is being updated. */
  expansionFileType: "expansionFileTypeUnspecified" | "main" | "patch" | (string & {});
  /** Identifier of the edit. */
  editId: string;
}

export const UploadEditsExpansionfilesRequest = Schema.Struct({
  apkVersionCode: Schema.Number.pipe(T.HttpPath("apkVersionCode")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  expansionFileType: Schema.String.pipe(T.HttpPath("expansionFileType")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadEditsExpansionfilesRequest>;

export type UploadEditsExpansionfilesResponse = ExpansionFilesUploadResponse;
export const UploadEditsExpansionfilesResponse = ExpansionFilesUploadResponse;

export type UploadEditsExpansionfilesError = CommonErrors;

/** Uploads a new expansion file and attaches to the specified APK. */
export const uploadEditsExpansionfiles: API.OperationMethod<UploadEditsExpansionfilesRequest, UploadEditsExpansionfilesResponse, UploadEditsExpansionfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadEditsExpansionfilesRequest,
  output: UploadEditsExpansionfilesResponse,
  errors: [],
}));

export interface DeleteEditsImagesRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language: string;
  /** Unique identifier an image within the set of images attached to this edit. */
  imageId: string;
  /** Type of the Image. */
  imageType: "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner" | (string & {});
}

export const DeleteEditsImagesRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  imageId: Schema.String.pipe(T.HttpPath("imageId")),
  imageType: Schema.String.pipe(T.HttpPath("imageType")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}/{imageType}/{imageId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEditsImagesRequest>;

export interface DeleteEditsImagesResponse {}
export const DeleteEditsImagesResponse: Schema.Schema<DeleteEditsImagesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteEditsImagesResponse>;

export type DeleteEditsImagesError = CommonErrors;

/** Deletes the image (specified by id) from the edit. */
export const deleteEditsImages: API.OperationMethod<DeleteEditsImagesRequest, DeleteEditsImagesResponse, DeleteEditsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEditsImagesRequest,
  output: DeleteEditsImagesResponse,
  errors: [],
}));

export interface UploadEditsImagesRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). Providing a language that is not supported by the App is a no-op. */
  language: string;
  /** Type of the Image. */
  imageType: "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner" | (string & {});
}

export const UploadEditsImagesRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  imageType: Schema.String.pipe(T.HttpPath("imageType")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}/{imageType}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadEditsImagesRequest>;

export type UploadEditsImagesResponse = ImagesUploadResponse;
export const UploadEditsImagesResponse = ImagesUploadResponse;

export type UploadEditsImagesError = CommonErrors;

/** Uploads an image of the specified language and image type, and adds to the edit. */
export const uploadEditsImages: API.OperationMethod<UploadEditsImagesRequest, UploadEditsImagesResponse, UploadEditsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadEditsImagesRequest,
  output: UploadEditsImagesResponse,
  errors: [],
}));

export interface DeleteallEditsImagesRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). Providing a language that is not supported by the App is a no-op. */
  language: string;
  /** Type of the Image. Providing an image type that refers to no images is a no-op. */
  imageType: "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner" | (string & {});
}

export const DeleteallEditsImagesRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  imageType: Schema.String.pipe(T.HttpPath("imageType")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}/{imageType}" }),
  svc,
) as unknown as Schema.Schema<DeleteallEditsImagesRequest>;

export type DeleteallEditsImagesResponse = ImagesDeleteAllResponse;
export const DeleteallEditsImagesResponse = ImagesDeleteAllResponse;

export type DeleteallEditsImagesError = CommonErrors;

/** Deletes all images for the specified language and image type. Returns an empty response if no images are found. */
export const deleteallEditsImages: API.OperationMethod<DeleteallEditsImagesRequest, DeleteallEditsImagesResponse, DeleteallEditsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteallEditsImagesRequest,
  output: DeleteallEditsImagesResponse,
  errors: [],
}));

export interface ListEditsImagesRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). There must be a store listing for the specified language. */
  language: string;
  /** Type of the Image. Providing an image type that refers to no images will return an empty response. */
  imageType: "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner" | (string & {});
}

export const ListEditsImagesRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  imageType: Schema.String.pipe(T.HttpPath("imageType")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}/{imageType}" }),
  svc,
) as unknown as Schema.Schema<ListEditsImagesRequest>;

export type ListEditsImagesResponse = ImagesListResponse;
export const ListEditsImagesResponse = ImagesListResponse;

export type ListEditsImagesError = CommonErrors;

/** Lists all images. The response may be empty. */
export const listEditsImages: API.OperationMethod<ListEditsImagesRequest, ListEditsImagesResponse, ListEditsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEditsImagesRequest,
  output: ListEditsImagesResponse,
  errors: [],
}));

export interface UpdateEditsDetailsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: AppDetails;
}

export const UpdateEditsDetailsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(AppDetails).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/details", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEditsDetailsRequest>;

export type UpdateEditsDetailsResponse = AppDetails;
export const UpdateEditsDetailsResponse = AppDetails;

export type UpdateEditsDetailsError = CommonErrors;

/** Updates details of an app. */
export const updateEditsDetails: API.OperationMethod<UpdateEditsDetailsRequest, UpdateEditsDetailsResponse, UpdateEditsDetailsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEditsDetailsRequest,
  output: UpdateEditsDetailsResponse,
  errors: [],
}));

export interface GetEditsDetailsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
}

export const GetEditsDetailsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/details" }),
  svc,
) as unknown as Schema.Schema<GetEditsDetailsRequest>;

export type GetEditsDetailsResponse = AppDetails;
export const GetEditsDetailsResponse = AppDetails;

export type GetEditsDetailsError = CommonErrors;

/** Gets details of an app. */
export const getEditsDetails: API.OperationMethod<GetEditsDetailsRequest, GetEditsDetailsResponse, GetEditsDetailsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsDetailsRequest,
  output: GetEditsDetailsResponse,
  errors: [],
}));

export interface PatchEditsDetailsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: AppDetails;
}

export const PatchEditsDetailsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(AppDetails).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/details", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEditsDetailsRequest>;

export type PatchEditsDetailsResponse = AppDetails;
export const PatchEditsDetailsResponse = AppDetails;

export type PatchEditsDetailsError = CommonErrors;

/** Patches details of an app. */
export const patchEditsDetails: API.OperationMethod<PatchEditsDetailsRequest, PatchEditsDetailsResponse, PatchEditsDetailsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEditsDetailsRequest,
  output: PatchEditsDetailsResponse,
  errors: [],
}));

export interface ListEditsListingsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
}

export const ListEditsListingsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings" }),
  svc,
) as unknown as Schema.Schema<ListEditsListingsRequest>;

export type ListEditsListingsResponse = ListingsListResponse;
export const ListEditsListingsResponse = ListingsListResponse;

export type ListEditsListingsError = CommonErrors;

/** Lists all localized store listings. */
export const listEditsListings: API.OperationMethod<ListEditsListingsRequest, ListEditsListingsResponse, ListEditsListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEditsListingsRequest,
  output: ListEditsListingsResponse,
  errors: [],
}));

export interface GetEditsListingsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language: string;
}

export const GetEditsListingsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}" }),
  svc,
) as unknown as Schema.Schema<GetEditsListingsRequest>;

export type GetEditsListingsResponse = Listing;
export const GetEditsListingsResponse = Listing;

export type GetEditsListingsError = CommonErrors;

/** Gets a localized store listing. */
export const getEditsListings: API.OperationMethod<GetEditsListingsRequest, GetEditsListingsResponse, GetEditsListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEditsListingsRequest,
  output: GetEditsListingsResponse,
  errors: [],
}));

export interface DeleteallEditsListingsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
}

export const DeleteallEditsListingsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings" }),
  svc,
) as unknown as Schema.Schema<DeleteallEditsListingsRequest>;

export interface DeleteallEditsListingsResponse {}
export const DeleteallEditsListingsResponse: Schema.Schema<DeleteallEditsListingsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteallEditsListingsResponse>;

export type DeleteallEditsListingsError = CommonErrors;

/** Deletes all store listings. */
export const deleteallEditsListings: API.OperationMethod<DeleteallEditsListingsRequest, DeleteallEditsListingsResponse, DeleteallEditsListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteallEditsListingsRequest,
  output: DeleteallEditsListingsResponse,
  errors: [],
}));

export interface UpdateEditsListingsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language: string;
  /** Package name of the app. */
  packageName: string;
  /** Request body */
  body?: Listing;
}

export const UpdateEditsListingsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  body: Schema.optional(Listing).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEditsListingsRequest>;

export type UpdateEditsListingsResponse = Listing;
export const UpdateEditsListingsResponse = Listing;

export type UpdateEditsListingsError = CommonErrors;

/** Creates or updates a localized store listing. */
export const updateEditsListings: API.OperationMethod<UpdateEditsListingsRequest, UpdateEditsListingsResponse, UpdateEditsListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEditsListingsRequest,
  output: UpdateEditsListingsResponse,
  errors: [],
}));

export interface PatchEditsListingsRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language: string;
  /** Request body */
  body?: Listing;
}

export const PatchEditsListingsRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  body: Schema.optional(Listing).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEditsListingsRequest>;

export type PatchEditsListingsResponse = Listing;
export const PatchEditsListingsResponse = Listing;

export type PatchEditsListingsError = CommonErrors;

/** Patches a localized store listing. */
export const patchEditsListings: API.OperationMethod<PatchEditsListingsRequest, PatchEditsListingsResponse, PatchEditsListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEditsListingsRequest,
  output: PatchEditsListingsResponse,
  errors: [],
}));

export interface DeleteEditsListingsRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). */
  language: string;
  /** Package name of the app. */
  packageName: string;
}

export const DeleteEditsListingsRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  language: Schema.String.pipe(T.HttpPath("language")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}" }),
  svc,
) as unknown as Schema.Schema<DeleteEditsListingsRequest>;

export interface DeleteEditsListingsResponse {}
export const DeleteEditsListingsResponse: Schema.Schema<DeleteEditsListingsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteEditsListingsResponse>;

export type DeleteEditsListingsError = CommonErrors;

/** Deletes a localized store listing. */
export const deleteEditsListings: API.OperationMethod<DeleteEditsListingsRequest, DeleteEditsListingsResponse, DeleteEditsListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEditsListingsRequest,
  output: DeleteEditsListingsResponse,
  errors: [],
}));

export interface ListEditsApksRequest {
  /** Identifier of the edit. */
  editId: string;
  /** Package name of the app. */
  packageName: string;
}

export const ListEditsApksRequest = Schema.Struct({
  editId: Schema.String.pipe(T.HttpPath("editId")),
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
}).pipe(
  T.Http({ method: "GET", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks" }),
  svc,
) as unknown as Schema.Schema<ListEditsApksRequest>;

export type ListEditsApksResponse = ApksListResponse;
export const ListEditsApksResponse = ApksListResponse;

export type ListEditsApksError = CommonErrors;

/** Lists all current APKs of the app and edit. */
export const listEditsApks: API.OperationMethod<ListEditsApksRequest, ListEditsApksResponse, ListEditsApksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEditsApksRequest,
  output: ListEditsApksResponse,
  errors: [],
}));

export interface UploadEditsApksRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
}

export const UploadEditsApksRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadEditsApksRequest>;

export type UploadEditsApksResponse = Apk;
export const UploadEditsApksResponse = Apk;

export type UploadEditsApksError = CommonErrors;

/** Uploads an APK and adds to the current edit. */
export const uploadEditsApks: API.OperationMethod<UploadEditsApksRequest, UploadEditsApksResponse, UploadEditsApksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadEditsApksRequest,
  output: UploadEditsApksResponse,
  errors: [],
}));

export interface AddexternallyhostedEditsApksRequest {
  /** Package name of the app. */
  packageName: string;
  /** Identifier of the edit. */
  editId: string;
  /** Request body */
  body?: ApksAddExternallyHostedRequest;
}

export const AddexternallyhostedEditsApksRequest = Schema.Struct({
  packageName: Schema.String.pipe(T.HttpPath("packageName")),
  editId: Schema.String.pipe(T.HttpPath("editId")),
  body: Schema.optional(ApksAddExternallyHostedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/externallyHosted", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddexternallyhostedEditsApksRequest>;

export type AddexternallyhostedEditsApksResponse = ApksAddExternallyHostedResponse;
export const AddexternallyhostedEditsApksResponse = ApksAddExternallyHostedResponse;

export type AddexternallyhostedEditsApksError = CommonErrors;

/** Creates a new APK without uploading the APK itself to Google Play, instead hosting the APK at a specified URL. This function is only available to organizations using Managed Play whose application is configured to restrict distribution to the organizations. */
export const addexternallyhostedEditsApks: API.OperationMethod<AddexternallyhostedEditsApksRequest, AddexternallyhostedEditsApksResponse, AddexternallyhostedEditsApksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddexternallyhostedEditsApksRequest,
  output: AddexternallyhostedEditsApksResponse,
  errors: [],
}));

