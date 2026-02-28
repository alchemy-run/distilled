// ==========================================================================
// Content API for Shopping (content v2.1)
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
  name: "content",
  version: "v2.1",
  rootUrl: "https://shoppingcontent.googleapis.com/",
  servicePath: "content/v2.1/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AccountIdentifier {
  /** The aggregator ID, set for aggregators and subaccounts (in that case, it represents the aggregator of the subaccount). */
  aggregatorId?: string;
  /** The merchant account ID, set for individual accounts and subaccounts. */
  merchantId?: string;
}

export const AccountIdentifier: Schema.Schema<AccountIdentifier> = Schema.suspend(() => Schema.Struct({
  aggregatorId: Schema.optional(Schema.String),
  merchantId: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountIdentifier" }) as any as Schema.Schema<AccountIdentifier>;

export interface AccountsAuthInfoResponse {
  /** The account identifiers corresponding to the authenticated user. - For an individual account: only the merchant ID is defined - For an aggregator: only the aggregator ID is defined - For a subaccount of an MCA: both the merchant ID and the aggregator ID are defined. */
  accountIdentifiers?: Array<AccountIdentifier>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsAuthInfoResponse`". */
  kind?: string;
}

export const AccountsAuthInfoResponse: Schema.Schema<AccountsAuthInfoResponse> = Schema.suspend(() => Schema.Struct({
  accountIdentifiers: Schema.optional(Schema.Array(AccountIdentifier)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountsAuthInfoResponse" }) as any as Schema.Schema<AccountsAuthInfoResponse>;

export interface AccountsClaimWebsiteResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsClaimWebsiteResponse`". */
  kind?: string;
}

export const AccountsClaimWebsiteResponse: Schema.Schema<AccountsClaimWebsiteResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountsClaimWebsiteResponse" }) as any as Schema.Schema<AccountsClaimWebsiteResponse>;

export interface AccountUser {
  /** User's email address. */
  emailAddress?: string;
  /** Whether user is an admin. */
  admin?: boolean;
  /** This role is deprecated and can no longer be assigned. Any value set will be ignored. */
  orderManager?: boolean;
  /** This role is deprecated and can no longer be assigned. Any value set will be ignored. */
  paymentsManager?: boolean;
  /** This role is deprecated and can no longer be assigned. Any value set will be ignored. */
  paymentsAnalyst?: boolean;
  /** Whether user is a reporting manager. This role is equivalent to the Performance and insights role in Merchant Center. */
  reportingManager?: boolean;
  /** Optional. Whether user has standard read-only access. */
  readOnly?: boolean;
}

export const AccountUser: Schema.Schema<AccountUser> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  admin: Schema.optional(Schema.Boolean),
  orderManager: Schema.optional(Schema.Boolean),
  paymentsManager: Schema.optional(Schema.Boolean),
  paymentsAnalyst: Schema.optional(Schema.Boolean),
  reportingManager: Schema.optional(Schema.Boolean),
  readOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountUser" }) as any as Schema.Schema<AccountUser>;

export interface AccountYouTubeChannelLink {
  /** Channel ID. */
  channelId?: string;
  /** Status of the link between this Merchant Center account and the YouTube channel. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in YT Creator Studio or `pending` if it's pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it's still pending or with status `pending` when it's already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending. */
  status?: string;
}

export const AccountYouTubeChannelLink: Schema.Schema<AccountYouTubeChannelLink> = Schema.suspend(() => Schema.Struct({
  channelId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountYouTubeChannelLink" }) as any as Schema.Schema<AccountYouTubeChannelLink>;

export interface AccountGoogleMyBusinessLink {
  /** The Business Profile email address of a specific account within a Business Profile. A sample account within a Business Profile could be a business account with set of locations, managed under the Business Profile. */
  gmbEmail?: string;
  /** Status of the link between this Merchant Center account and the Business Profile. Acceptable values are: - "`active`" - "`pending`" */
  status?: string;
  /** The ID of the Business Profile. If this is provided, then `gmbEmail` is ignored. The value of this field should match the `accountId` used by the Business Profile API. */
  gmbAccountId?: string;
}

export const AccountGoogleMyBusinessLink: Schema.Schema<AccountGoogleMyBusinessLink> = Schema.suspend(() => Schema.Struct({
  gmbEmail: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  gmbAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountGoogleMyBusinessLink" }) as any as Schema.Schema<AccountGoogleMyBusinessLink>;

export interface AccountAddress {
  /** Street-level part of the address. Use `\n` to add a second line. */
  streetAddress?: string;
  /** City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs). */
  locality?: string;
  /** Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC"). */
  region?: string;
  /** Postal code or ZIP (for example, "94043"). */
  postalCode?: string;
  /** CLDR country code (for example, "US"). All MCA sub-accounts inherit the country of their parent MCA by default, however the country can be updated for individual sub-accounts. */
  country?: string;
}

export const AccountAddress: Schema.Schema<AccountAddress> = Schema.suspend(() => Schema.Struct({
  streetAddress: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountAddress" }) as any as Schema.Schema<AccountAddress>;

export interface AccountCustomerService {
  /** Customer service URL. */
  url?: string;
  /** Customer service email. */
  email?: string;
  /** Customer service phone number. */
  phoneNumber?: string;
}

export const AccountCustomerService: Schema.Schema<AccountCustomerService> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountCustomerService" }) as any as Schema.Schema<AccountCustomerService>;

export interface AccountBusinessInformation {
  /** The address of the business. Use `\n` to add a second address line. */
  address?: AccountAddress;
  /** The phone number of the business in [E.164](https://en.wikipedia.org/wiki/E.164) format. This can only be updated if a verified phone number is not already set. To replace a verified phone number use the `Accounts.requestphoneverification` and `Accounts.verifyphonenumber`. */
  phoneNumber?: string;
  /** Verification status of the phone number of the business. This status is read only and can be updated only by successful phone verification. Acceptable values are: - "`verified`" - "`unverified`" */
  phoneVerificationStatus?: string;
  /** The customer service information of the business. */
  customerService?: AccountCustomerService;
  /** The 10-digit [Korean business registration number](https://support.google.com/merchants/answer/9037766) separated with dashes in the format: XXX-XX-XXXXX. This field will only be updated if explicitly set. */
  koreanBusinessRegistrationNumber?: string;
}

export const AccountBusinessInformation: Schema.Schema<AccountBusinessInformation> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(AccountAddress),
  phoneNumber: Schema.optional(Schema.String),
  phoneVerificationStatus: Schema.optional(Schema.String),
  customerService: Schema.optional(AccountCustomerService),
  koreanBusinessRegistrationNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountBusinessInformation" }) as any as Schema.Schema<AccountBusinessInformation>;

export interface AccountIdentityType {
  /** Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions. */
  selfIdentified?: boolean;
}

export const AccountIdentityType: Schema.Schema<AccountIdentityType> = Schema.suspend(() => Schema.Struct({
  selfIdentified: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountIdentityType" }) as any as Schema.Schema<AccountIdentityType>;

export interface AccountBusinessIdentity {
  /** Specifies whether the business identifies itself as being black-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  blackOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as being women-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  womenOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as being veteran-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  veteranOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as being latino-owned. This optional field is only available for merchants with a business country set to "US". This field is not allowed for marketplaces or marketplace sellers. */
  latinoOwned?: AccountIdentityType;
  /** Specifies whether the business identifies itself as a small business. This optional field is only available for merchants with a business country set to "US". It is also not allowed for marketplaces, but it is allowed to marketplace sellers. */
  smallBusiness?: AccountIdentityType;
  /** Required. By setting this field, your business may be included in promotions for all the selected attributes. If you clear this option, it won't affect your identification with any of the attributes. For this field to be set, the merchant must self identify with at least one of the `AccountIdentityType`. If none are included, the request will be considered invalid. */
  includeForPromotions?: boolean;
}

export const AccountBusinessIdentity: Schema.Schema<AccountBusinessIdentity> = Schema.suspend(() => Schema.Struct({
  blackOwned: Schema.optional(AccountIdentityType),
  womenOwned: Schema.optional(AccountIdentityType),
  veteranOwned: Schema.optional(AccountIdentityType),
  latinoOwned: Schema.optional(AccountIdentityType),
  smallBusiness: Schema.optional(AccountIdentityType),
  includeForPromotions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountBusinessIdentity" }) as any as Schema.Schema<AccountBusinessIdentity>;

export interface AccountItemUpdatesSettings {
  /** If price updates are enabled, Google always updates the active price with the crawled information. */
  allowPriceUpdates?: boolean;
  /** If availability updates are enabled, any previous availability values get overwritten if Google finds an out-of-stock annotation on the offer's page. If additionally `allow_availability_updates` field is set to true, values get overwritten if Google finds an in-stock annotation on the offer’s page. */
  allowAvailabilityUpdates?: boolean;
  /** If allow_availability_updates is enabled, items are automatically updated in all your Shopping target countries. By default, availability updates will only be applied to items that are 'out of stock' on your website but 'in stock' on Shopping. Set this to true to also update items that are 'in stock' on your website, but 'out of stock' on Google Shopping. In order for this field to have an effect, you must also allow availability updates. */
  allowStrictAvailabilityUpdates?: boolean;
  /** If condition updates are enabled, Google always updates item condition with the condition detected from the details of your product. */
  allowConditionUpdates?: boolean;
}

export const AccountItemUpdatesSettings: Schema.Schema<AccountItemUpdatesSettings> = Schema.suspend(() => Schema.Struct({
  allowPriceUpdates: Schema.optional(Schema.Boolean),
  allowAvailabilityUpdates: Schema.optional(Schema.Boolean),
  allowStrictAvailabilityUpdates: Schema.optional(Schema.Boolean),
  allowConditionUpdates: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountItemUpdatesSettings" }) as any as Schema.Schema<AccountItemUpdatesSettings>;

export interface AccountItemUpdates {
  /** Determines which attributes of the items should be automatically updated. If this field is not present, then the settings will be deleted. If there are no settings for subaccount, they are inherited from aggregator. */
  accountItemUpdatesSettings?: AccountItemUpdatesSettings;
  /** Output only. The effective value of allow_price_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowPriceUpdates?: boolean;
  /** Output only. The effective value of allow_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowAvailabilityUpdates?: boolean;
  /** Output only. The effective value of allow_strict_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowStrictAvailabilityUpdates?: boolean;
  /** Output only. The effective value of allow_condition_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowConditionUpdates?: boolean;
}

export const AccountItemUpdates: Schema.Schema<AccountItemUpdates> = Schema.suspend(() => Schema.Struct({
  accountItemUpdatesSettings: Schema.optional(AccountItemUpdatesSettings),
  effectiveAllowPriceUpdates: Schema.optional(Schema.Boolean),
  effectiveAllowAvailabilityUpdates: Schema.optional(Schema.Boolean),
  effectiveAllowStrictAvailabilityUpdates: Schema.optional(Schema.Boolean),
  effectiveAllowConditionUpdates: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountItemUpdates" }) as any as Schema.Schema<AccountItemUpdates>;

export interface AccountImageImprovementsSettings {
  /** Enables automatic image improvements. */
  allowAutomaticImageImprovements?: boolean;
}

export const AccountImageImprovementsSettings: Schema.Schema<AccountImageImprovementsSettings> = Schema.suspend(() => Schema.Struct({
  allowAutomaticImageImprovements: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountImageImprovementsSettings" }) as any as Schema.Schema<AccountImageImprovementsSettings>;

export interface AccountImageImprovements {
  /** Determines how the images should be automatically updated. If this field is not present, then the settings will be deleted. If there are no settings for subaccount, they are inherited from aggregator. */
  accountImageImprovementsSettings?: AccountImageImprovementsSettings;
  /** Output only. The effective value of allow_automatic_image_improvements. If account_image_improvements_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only. */
  effectiveAllowAutomaticImageImprovements?: boolean;
}

export const AccountImageImprovements: Schema.Schema<AccountImageImprovements> = Schema.suspend(() => Schema.Struct({
  accountImageImprovementsSettings: Schema.optional(AccountImageImprovementsSettings),
  effectiveAllowAutomaticImageImprovements: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountImageImprovements" }) as any as Schema.Schema<AccountImageImprovements>;

export interface AccountShippingImprovements {
  /** Enables automatic shipping improvements. */
  allowShippingImprovements?: boolean;
}

export const AccountShippingImprovements: Schema.Schema<AccountShippingImprovements> = Schema.suspend(() => Schema.Struct({
  allowShippingImprovements: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountShippingImprovements" }) as any as Schema.Schema<AccountShippingImprovements>;

export interface AccountAutomaticImprovements {
  /** Turning on [item updates](https://support.google.com/merchants/answer/3246284) allows Google to automatically update items for you. When item updates are on, Google uses the structured data markup on the website and advanced data extractors to update the price and availability of the items. When the item updates are off, items with mismatched data aren't shown. This field is only updated (cleared) if provided. */
  itemUpdates?: AccountItemUpdates;
  /** This improvement will attempt to automatically correct submitted images if they don't meet the [image requirements](https://support.google.com/merchants/answer/6324350), for example, removing overlays. If successful, the image will be replaced and approved. This improvement is only applied to images of disapproved offers. For more information see: [Automatic image improvements](https://support.google.com/merchants/answer/9242973) This field is only updated (cleared) if provided. */
  imageImprovements?: AccountImageImprovements;
  /** Not available for MCAs [accounts](https://support.google.com/merchants/answer/188487). By turning on [automatic shipping improvements](https://support.google.com/merchants/answer/10027038), you are allowing Google to improve the accuracy of your delivery times shown to shoppers using Google. More accurate delivery times, especially when faster, typically lead to better conversion rates. Google will improve your estimated delivery times based on various factors: - Delivery address of an order - Current handling time and shipping time settings - Estimated weekdays or business days - Parcel tracking data This field is only updated (cleared) if provided. */
  shippingImprovements?: AccountShippingImprovements;
}

export const AccountAutomaticImprovements: Schema.Schema<AccountAutomaticImprovements> = Schema.suspend(() => Schema.Struct({
  itemUpdates: Schema.optional(AccountItemUpdates),
  imageImprovements: Schema.optional(AccountImageImprovements),
  shippingImprovements: Schema.optional(AccountShippingImprovements),
})).annotate({ identifier: "AccountAutomaticImprovements" }) as any as Schema.Schema<AccountAutomaticImprovements>;

export interface AccountAdsLink {
  /** Customer ID of the Ads account. */
  adsId?: string;
  /** Status of the link between this Merchant Center account and the Ads account. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in Google Ads or `pending` if it's pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it's still pending or with status `pending` when it's already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending. Acceptable values are: - "`active`" - "`pending`" */
  status?: string;
}

export const AccountAdsLink: Schema.Schema<AccountAdsLink> = Schema.suspend(() => Schema.Struct({
  adsId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountAdsLink" }) as any as Schema.Schema<AccountAdsLink>;

export interface AccountConversionSettings {
  /** When enabled, free listing URLs have a parameter to enable conversion tracking for products owned by the current merchant account. See [auto-tagging](https://support.google.com/merchants/answer/11127659). */
  freeListingsAutoTaggingEnabled?: boolean;
}

export const AccountConversionSettings: Schema.Schema<AccountConversionSettings> = Schema.suspend(() => Schema.Struct({
  freeListingsAutoTaggingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountConversionSettings" }) as any as Schema.Schema<AccountConversionSettings>;

export interface Account {
  /** Required. Display name for the account. */
  name?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#account`". */
  kind?: string;
  /** The merchant's website. */
  websiteUrl?: string;
  /** Indicates whether the merchant sells adult content. */
  adultContent?: boolean;
  /** Client-specific, locally-unique, internal ID for the child account. */
  sellerId?: string;
  /** Users with access to the account. Every account (except for subaccounts) must have at least one admin user. */
  users?: Array<AccountUser>;
  /** Required. 64-bit Merchant Center account ID. */
  id?: string;
  /** Linked YouTube channels that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected in the YT Creator Studio interface. To delete an active link, or to cancel a link request, remove it from the list. */
  youtubeChannelLinks?: Array<AccountYouTubeChannelLink>;
  /** The Business Profile which is linked or in the process of being linked with the Merchant Center account. */
  googleMyBusinessLink?: AccountGoogleMyBusinessLink;
  /** The business information of the account. */
  businessInformation?: AccountBusinessInformation;
  /** The business identity attributes can be used to self-declare attributes that let customers know more about your business. */
  businessIdentity?: AccountBusinessIdentity;
  /** The automatic improvements of the account can be used to automatically update items, improve images and shipping. Each section inside AutomaticImprovements is updated separately. */
  automaticImprovements?: AccountAutomaticImprovements;
  /** Linked Ads accounts that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected either in the Ads interface or through the Google Ads API. To delete an active link, or to cancel a link request, remove it from the list. */
  adsLinks?: Array<AccountAdsLink>;
  /** ID of CSS the account belongs to. */
  cssId?: string;
  /** Manually created label IDs that are assigned to the account by CSS. */
  labelIds?: Array<string>;
  /** Output only. How the account is managed. Acceptable values are: - "`manual`" - "`automatic`" */
  accountManagement?: string;
  /** Automatically created label IDs that are assigned to the account by CSS Center. */
  automaticLabelIds?: Array<string>;
  /** Settings for conversion tracking. */
  conversionSettings?: AccountConversionSettings;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  websiteUrl: Schema.optional(Schema.String),
  adultContent: Schema.optional(Schema.Boolean),
  sellerId: Schema.optional(Schema.String),
  users: Schema.optional(Schema.Array(AccountUser)),
  id: Schema.optional(Schema.String),
  youtubeChannelLinks: Schema.optional(Schema.Array(AccountYouTubeChannelLink)),
  googleMyBusinessLink: Schema.optional(AccountGoogleMyBusinessLink),
  businessInformation: Schema.optional(AccountBusinessInformation),
  businessIdentity: Schema.optional(AccountBusinessIdentity),
  automaticImprovements: Schema.optional(AccountAutomaticImprovements),
  adsLinks: Schema.optional(Schema.Array(AccountAdsLink)),
  cssId: Schema.optional(Schema.String),
  labelIds: Schema.optional(Schema.Array(Schema.String)),
  accountManagement: Schema.optional(Schema.String),
  automaticLabelIds: Schema.optional(Schema.Array(Schema.String)),
  conversionSettings: Schema.optional(AccountConversionSettings),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface AccountsCustomBatchRequestEntryLinkRequest {
  /** Action to perform for this link. The `"request"` action is only available to select merchants. Acceptable values are: - "`approve`" - "`remove`" - "`request`" */
  action?: string;
  /** The ID of the linked account. */
  linkedAccountId?: string;
  /** Type of the link between the two accounts. Acceptable values are: - "`channelPartner`" - "`eCommercePlatform`" - "`paymentServiceProvider`" - "`localProductManager`" */
  linkType?: string;
  /** Provided services. Acceptable values are: - "`shoppingAdsProductManagement`" - "`shoppingActionsProductManagement`" - "`shoppingActionsOrderManagement`" - "`paymentProcessing`" - "`localProductManagement`" */
  services?: Array<string>;
}

export const AccountsCustomBatchRequestEntryLinkRequest: Schema.Schema<AccountsCustomBatchRequestEntryLinkRequest> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  linkedAccountId: Schema.optional(Schema.String),
  linkType: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccountsCustomBatchRequestEntryLinkRequest" }) as any as Schema.Schema<AccountsCustomBatchRequestEntryLinkRequest>;

export interface AccountsCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`claimWebsite`" - "`delete`" - "`get`" - "`insert`" - "`link`" - "`update`" */
  method?: string;
  /** The ID of the targeted account. Only defined if the method is not `insert`. */
  accountId?: string;
  /** The account to create or update. Only defined if the method is `insert` or `update`. */
  account?: Account;
  /** Only applicable if the method is `claimwebsite`. Indicates whether or not to take the claim from another account in case there is a conflict. */
  overwrite?: boolean;
  /** Whether the account should be deleted if the account has offers. Only applicable if the method is `delete`. */
  force?: boolean;
  /** Details about the `link` request. */
  linkRequest?: AccountsCustomBatchRequestEntryLinkRequest;
  /** Controls which fields are visible. Only applicable if the method is 'get'. */
  view?: string;
  /** Label IDs for the 'updatelabels' request. */
  labelIds?: Array<string>;
}

export const AccountsCustomBatchRequestEntry: Schema.Schema<AccountsCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  account: Schema.optional(Account),
  overwrite: Schema.optional(Schema.Boolean),
  force: Schema.optional(Schema.Boolean),
  linkRequest: Schema.optional(AccountsCustomBatchRequestEntryLinkRequest),
  view: Schema.optional(Schema.String),
  labelIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccountsCustomBatchRequestEntry" }) as any as Schema.Schema<AccountsCustomBatchRequestEntry>;

export interface AccountsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<AccountsCustomBatchRequestEntry>;
}

export const AccountsCustomBatchRequest: Schema.Schema<AccountsCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(AccountsCustomBatchRequestEntry)),
})).annotate({ identifier: "AccountsCustomBatchRequest" }) as any as Schema.Schema<AccountsCustomBatchRequest>;

export interface Content_Error {
  /** The domain of the error. */
  domain?: string;
  /** The error code. */
  reason?: string;
  /** A description of the error. */
  message?: string;
}

export const Content_Error: Schema.Schema<Content_Error> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Content_Error" }) as any as Schema.Schema<Content_Error>;

export interface Errors {
  /** A list of errors. */
  errors?: Array<Content_Error>;
  /** The HTTP status of the first error in `errors`. */
  code?: number;
  /** The message of the first error in `errors`. */
  message?: string;
}

export const Errors: Schema.Schema<Errors> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(Content_Error)),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Errors" }) as any as Schema.Schema<Errors>;

export interface AccountsCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsCustomBatchResponseEntry`" */
  kind?: string;
  /** The retrieved, created, or updated account. Not defined if the method was `delete`, `claimwebsite` or `link`. */
  account?: Account;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const AccountsCustomBatchResponseEntry: Schema.Schema<AccountsCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  account: Schema.optional(Account),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "AccountsCustomBatchResponseEntry" }) as any as Schema.Schema<AccountsCustomBatchResponseEntry>;

export interface AccountsCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<AccountsCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsCustomBatchResponse`". */
  kind?: string;
}

export const AccountsCustomBatchResponse: Schema.Schema<AccountsCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(AccountsCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountsCustomBatchResponse" }) as any as Schema.Schema<AccountsCustomBatchResponse>;

export interface PaymentServiceProviderLinkInfo {
  /** The id used by the third party service provider to identify the merchant. */
  externalAccountId?: string;
  /** The business country of the merchant account as identified by the third party service provider. */
  externalAccountBusinessCountry?: string;
}

export const PaymentServiceProviderLinkInfo: Schema.Schema<PaymentServiceProviderLinkInfo> = Schema.suspend(() => Schema.Struct({
  externalAccountId: Schema.optional(Schema.String),
  externalAccountBusinessCountry: Schema.optional(Schema.String),
})).annotate({ identifier: "PaymentServiceProviderLinkInfo" }) as any as Schema.Schema<PaymentServiceProviderLinkInfo>;

export interface ECommercePlatformLinkInfo {
  /** The id used by the third party service provider to identify the merchant. */
  externalAccountId?: string;
}

export const ECommercePlatformLinkInfo: Schema.Schema<ECommercePlatformLinkInfo> = Schema.suspend(() => Schema.Struct({
  externalAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "ECommercePlatformLinkInfo" }) as any as Schema.Schema<ECommercePlatformLinkInfo>;

export interface AccountsLinkRequest {
  /** Action to perform for this link. The `"request"` action is only available to select merchants. Acceptable values are: - "`approve`" - "`remove`" - "`request`" */
  action?: string;
  /** The ID of the linked account. */
  linkedAccountId?: string;
  /** Type of the link between the two accounts. Acceptable values are: - "`channelPartner`" - "`eCommercePlatform`" - "`paymentServiceProvider`" */
  linkType?: string;
  /** Acceptable values are: - "`shoppingAdsProductManagement`" - "`shoppingActionsProductManagement`" - "`shoppingActionsOrderManagement`" - "`paymentProcessing`" */
  services?: Array<string>;
  /** Additional information required for `paymentServiceProvider` link type. */
  paymentServiceProviderLinkInfo?: PaymentServiceProviderLinkInfo;
  /** Additional information required for `eCommercePlatform` link type. */
  eCommercePlatformLinkInfo?: ECommercePlatformLinkInfo;
}

export const AccountsLinkRequest: Schema.Schema<AccountsLinkRequest> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  linkedAccountId: Schema.optional(Schema.String),
  linkType: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(Schema.String)),
  paymentServiceProviderLinkInfo: Schema.optional(PaymentServiceProviderLinkInfo),
  eCommercePlatformLinkInfo: Schema.optional(ECommercePlatformLinkInfo),
})).annotate({ identifier: "AccountsLinkRequest" }) as any as Schema.Schema<AccountsLinkRequest>;

export interface AccountsLinkResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsLinkResponse`". */
  kind?: string;
}

export const AccountsLinkResponse: Schema.Schema<AccountsLinkResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountsLinkResponse" }) as any as Schema.Schema<AccountsLinkResponse>;

export interface AccountsListResponse {
  /** The token for the retrieval of the next page of accounts. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsListResponse`". */
  kind?: string;
  resources?: Array<Account>;
}

export const AccountsListResponse: Schema.Schema<AccountsListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(Account)),
})).annotate({ identifier: "AccountsListResponse" }) as any as Schema.Schema<AccountsListResponse>;

export interface LinkService {
  /** Service provided to or by the linked account. Acceptable values are: - "`shoppingActionsOrderManagement`" - "`shoppingActionsProductManagement`" - "`shoppingAdsProductManagement`" - "`paymentProcessing`" */
  service?: string;
  /** Status of the link Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
}

export const LinkService: Schema.Schema<LinkService> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkService" }) as any as Schema.Schema<LinkService>;

export interface LinkedAccount {
  /** The ID of the linked account. */
  linkedAccountId?: string;
  /** List of provided services. */
  services?: Array<LinkService>;
}

export const LinkedAccount: Schema.Schema<LinkedAccount> = Schema.suspend(() => Schema.Struct({
  linkedAccountId: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(LinkService)),
})).annotate({ identifier: "LinkedAccount" }) as any as Schema.Schema<LinkedAccount>;

export interface AccountsListLinksResponse {
  /** The token for the retrieval of the next page of links. */
  nextPageToken?: string;
  /** The list of available links. */
  links?: Array<LinkedAccount>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsListLinksResponse`". */
  kind?: string;
}

export const AccountsListLinksResponse: Schema.Schema<AccountsListLinksResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  links: Schema.optional(Schema.Array(LinkedAccount)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountsListLinksResponse" }) as any as Schema.Schema<AccountsListLinksResponse>;

export interface AccountsUpdateLabelsRequest {
  /** The IDs of labels that should be assigned to the account. */
  labelIds?: Array<string>;
}

export const AccountsUpdateLabelsRequest: Schema.Schema<AccountsUpdateLabelsRequest> = Schema.suspend(() => Schema.Struct({
  labelIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccountsUpdateLabelsRequest" }) as any as Schema.Schema<AccountsUpdateLabelsRequest>;

export interface AccountsUpdateLabelsResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountsUpdateLabelsResponse`". */
  kind?: string;
}

export const AccountsUpdateLabelsResponse: Schema.Schema<AccountsUpdateLabelsResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountsUpdateLabelsResponse" }) as any as Schema.Schema<AccountsUpdateLabelsResponse>;

export interface AccountstatusesCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" */
  method?: string;
  /** The ID of the (sub-)account whose status to get. */
  accountId?: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: Array<string>;
}

export const AccountstatusesCustomBatchRequestEntry: Schema.Schema<AccountstatusesCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  destinations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccountstatusesCustomBatchRequestEntry" }) as any as Schema.Schema<AccountstatusesCustomBatchRequestEntry>;

export interface AccountstatusesCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<AccountstatusesCustomBatchRequestEntry>;
}

export const AccountstatusesCustomBatchRequest: Schema.Schema<AccountstatusesCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(AccountstatusesCustomBatchRequestEntry)),
})).annotate({ identifier: "AccountstatusesCustomBatchRequest" }) as any as Schema.Schema<AccountstatusesCustomBatchRequest>;

export interface AccountStatusAccountLevelIssue {
  /** Issue identifier. */
  id?: string;
  /** Short description of the issue. */
  title?: string;
  /** Country for which this issue is reported. */
  country?: string;
  /** Severity of the issue. Acceptable values are: - "`critical`" - "`error`" - "`suggestion`" */
  severity?: string;
  /** Additional details about the issue. */
  detail?: string;
  /** The destination the issue applies to. If this field is empty then the issue applies to all available destinations. */
  destination?: string;
  /** The URL of a web page to help resolving this issue. */
  documentation?: string;
}

export const AccountStatusAccountLevelIssue: Schema.Schema<AccountStatusAccountLevelIssue> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountStatusAccountLevelIssue" }) as any as Schema.Schema<AccountStatusAccountLevelIssue>;

export interface AccountStatusStatistics {
  /** Number of active offers. */
  active?: string;
  /** Number of pending offers. */
  pending?: string;
  /** Number of disapproved offers. */
  disapproved?: string;
  /** Number of expiring offers. */
  expiring?: string;
}

export const AccountStatusStatistics: Schema.Schema<AccountStatusStatistics> = Schema.suspend(() => Schema.Struct({
  active: Schema.optional(Schema.String),
  pending: Schema.optional(Schema.String),
  disapproved: Schema.optional(Schema.String),
  expiring: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountStatusStatistics" }) as any as Schema.Schema<AccountStatusStatistics>;

export interface AccountStatusItemLevelIssue {
  /** The error code of the issue. */
  code?: string;
  /** How this issue affects serving of the offer. */
  servability?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attributeName?: string;
  /** A short issue description in English. */
  description?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** Number of items with this issue. */
  numItems?: string;
}

export const AccountStatusItemLevelIssue: Schema.Schema<AccountStatusItemLevelIssue> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  servability: Schema.optional(Schema.String),
  resolution: Schema.optional(Schema.String),
  attributeName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  numItems: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountStatusItemLevelIssue" }) as any as Schema.Schema<AccountStatusItemLevelIssue>;

export interface AccountStatusProducts {
  /** The channel the data applies to. Acceptable values are: - "`local`" - "`online`" */
  channel?: string;
  /** The destination the data applies to. */
  destination?: string;
  /** The country the data applies to. */
  country?: string;
  /** Aggregated product statistics. */
  statistics?: AccountStatusStatistics;
  /** List of item-level issues. */
  itemLevelIssues?: Array<AccountStatusItemLevelIssue>;
}

export const AccountStatusProducts: Schema.Schema<AccountStatusProducts> = Schema.suspend(() => Schema.Struct({
  channel: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  statistics: Schema.optional(AccountStatusStatistics),
  itemLevelIssues: Schema.optional(Schema.Array(AccountStatusItemLevelIssue)),
})).annotate({ identifier: "AccountStatusProducts" }) as any as Schema.Schema<AccountStatusProducts>;

export interface AccountStatus {
  /** The ID of the account for which the status is reported. */
  accountId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountStatus`" */
  kind?: string;
  /** Whether the account's website is claimed or not. */
  websiteClaimed?: boolean;
  /** A list of account level issues. */
  accountLevelIssues?: Array<AccountStatusAccountLevelIssue>;
  /** List of product-related data by channel, destination, and country. Data in this field may be delayed by up to 30 minutes. */
  products?: Array<AccountStatusProducts>;
  /** How the account is managed. Acceptable values are: - "`manual`" - "`automatic`" */
  accountManagement?: string;
}

export const AccountStatus: Schema.Schema<AccountStatus> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  websiteClaimed: Schema.optional(Schema.Boolean),
  accountLevelIssues: Schema.optional(Schema.Array(AccountStatusAccountLevelIssue)),
  products: Schema.optional(Schema.Array(AccountStatusProducts)),
  accountManagement: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountStatus" }) as any as Schema.Schema<AccountStatus>;

export interface AccountstatusesCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** The requested account status. Defined if and only if the request was successful. */
  accountStatus?: AccountStatus;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const AccountstatusesCustomBatchResponseEntry: Schema.Schema<AccountstatusesCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  accountStatus: Schema.optional(AccountStatus),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "AccountstatusesCustomBatchResponseEntry" }) as any as Schema.Schema<AccountstatusesCustomBatchResponseEntry>;

export interface AccountstatusesCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<AccountstatusesCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountstatusesCustomBatchResponse`". */
  kind?: string;
}

export const AccountstatusesCustomBatchResponse: Schema.Schema<AccountstatusesCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(AccountstatusesCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountstatusesCustomBatchResponse" }) as any as Schema.Schema<AccountstatusesCustomBatchResponse>;

export interface AccountstatusesListResponse {
  /** The token for the retrieval of the next page of account statuses. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountstatusesListResponse`". */
  kind?: string;
  resources?: Array<AccountStatus>;
}

export const AccountstatusesListResponse: Schema.Schema<AccountstatusesListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(AccountStatus)),
})).annotate({ identifier: "AccountstatusesListResponse" }) as any as Schema.Schema<AccountstatusesListResponse>;

export interface AccountTaxTaxRule {
  /** Country code in which tax is applicable. */
  country?: string;
  /** Required. State (or province) is which the tax is applicable, described by its location ID (also called criteria ID). */
  locationId?: string;
  /** Whether the tax rate is taken from a global tax table or specified explicitly. */
  useGlobalRate?: boolean;
  /** Explicit tax rate in percent, represented as a floating point number without the percentage character. Must not be negative. */
  ratePercent?: string;
  /** If true, shipping charges are also taxed. */
  shippingTaxed?: boolean;
}

export const AccountTaxTaxRule: Schema.Schema<AccountTaxTaxRule> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  useGlobalRate: Schema.optional(Schema.Boolean),
  ratePercent: Schema.optional(Schema.String),
  shippingTaxed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountTaxTaxRule" }) as any as Schema.Schema<AccountTaxTaxRule>;

export interface AccountTax {
  /** Required. The ID of the account to which these account tax settings belong. */
  accountId?: string;
  /** Tax rules. Updating the tax rules will enable "US" taxes (not reversible). Defining no rules is equivalent to not charging tax at all. */
  rules?: Array<AccountTaxTaxRule>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accountTax`". */
  kind?: string;
}

export const AccountTax: Schema.Schema<AccountTax> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(AccountTaxTaxRule)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountTax" }) as any as Schema.Schema<AccountTax>;

export interface AccounttaxCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" - "`update`" */
  method?: string;
  /** The ID of the account for which to get/update account tax settings. */
  accountId?: string;
  /** The account tax settings to update. Only defined if the method is `update`. */
  accountTax?: AccountTax;
}

export const AccounttaxCustomBatchRequestEntry: Schema.Schema<AccounttaxCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  accountTax: Schema.optional(AccountTax),
})).annotate({ identifier: "AccounttaxCustomBatchRequestEntry" }) as any as Schema.Schema<AccounttaxCustomBatchRequestEntry>;

export interface AccounttaxCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<AccounttaxCustomBatchRequestEntry>;
}

export const AccounttaxCustomBatchRequest: Schema.Schema<AccounttaxCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(AccounttaxCustomBatchRequestEntry)),
})).annotate({ identifier: "AccounttaxCustomBatchRequest" }) as any as Schema.Schema<AccounttaxCustomBatchRequest>;

export interface AccounttaxCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accounttaxCustomBatchResponseEntry`" */
  kind?: string;
  /** The retrieved or updated account tax settings. */
  accountTax?: AccountTax;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const AccounttaxCustomBatchResponseEntry: Schema.Schema<AccounttaxCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  accountTax: Schema.optional(AccountTax),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "AccounttaxCustomBatchResponseEntry" }) as any as Schema.Schema<AccounttaxCustomBatchResponseEntry>;

export interface AccounttaxCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<AccounttaxCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accounttaxCustomBatchResponse`". */
  kind?: string;
}

export const AccounttaxCustomBatchResponse: Schema.Schema<AccounttaxCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(AccounttaxCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AccounttaxCustomBatchResponse" }) as any as Schema.Schema<AccounttaxCustomBatchResponse>;

export interface AccounttaxListResponse {
  /** The token for the retrieval of the next page of account tax settings. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#accounttaxListResponse`". */
  kind?: string;
  resources?: Array<AccountTax>;
}

export const AccounttaxListResponse: Schema.Schema<AccounttaxListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(AccountTax)),
})).annotate({ identifier: "AccounttaxListResponse" }) as any as Schema.Schema<AccounttaxListResponse>;

export interface DatafeedFetchSchedule {
  /** The day of the month the feed file should be fetched (1-31). */
  dayOfMonth?: number;
  /** The day of the week the feed file should be fetched. Acceptable values are: - "`monday`" - "`tuesday`" - "`wednesday`" - "`thursday`" - "`friday`" - "`saturday`" - "`sunday`" */
  weekday?: string;
  /** The hour of the day the feed file should be fetched (0-23). */
  hour?: number;
  /** Time zone used for schedule. UTC by default. For example, "America/Los_Angeles". */
  timeZone?: string;
  /** The URL where the feed file can be fetched. Google Merchant Center will support automatic scheduled uploads using the HTTP, HTTPS, FTP, or SFTP protocols, so the value will need to be a valid link using one of those four protocols. */
  fetchUrl?: string;
  /** An optional user name for fetch_url. */
  username?: string;
  /** An optional password for fetch_url. */
  password?: string;
  /** The minute of the hour the feed file should be fetched (0-59). Read-only. */
  minuteOfHour?: number;
  /** Whether the scheduled fetch is paused or not. */
  paused?: boolean;
}

export const DatafeedFetchSchedule: Schema.Schema<DatafeedFetchSchedule> = Schema.suspend(() => Schema.Struct({
  dayOfMonth: Schema.optional(Schema.Number),
  weekday: Schema.optional(Schema.String),
  hour: Schema.optional(Schema.Number),
  timeZone: Schema.optional(Schema.String),
  fetchUrl: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  minuteOfHour: Schema.optional(Schema.Number),
  paused: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DatafeedFetchSchedule" }) as any as Schema.Schema<DatafeedFetchSchedule>;

export interface DatafeedFormat {
  /** Character encoding scheme of the data feed. If not specified, the encoding will be auto-detected. Acceptable values are: - "`latin-1`" - "`utf-16be`" - "`utf-16le`" - "`utf-8`" - "`windows-1252`" */
  fileEncoding?: string;
  /** Delimiter for the separation of values in a delimiter-separated values feed. If not specified, the delimiter will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`pipe`" - "`tab`" - "`tilde`" */
  columnDelimiter?: string;
  /** Specifies how double quotes are interpreted. If not specified, the mode will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`normal character`" - "`value quoting`" */
  quotingMode?: string;
}

export const DatafeedFormat: Schema.Schema<DatafeedFormat> = Schema.suspend(() => Schema.Struct({
  fileEncoding: Schema.optional(Schema.String),
  columnDelimiter: Schema.optional(Schema.String),
  quotingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedFormat" }) as any as Schema.Schema<DatafeedFormat>;

export interface DatafeedTarget {
  /** Deprecated. Use `feedLabel` instead. The country where the items in the feed will be included in the search index, represented as a CLDR territory code. */
  country?: string;
  /** Feed label for the DatafeedTarget. Either `country` or `feedLabel` is required. If both `feedLabel` and `country` is specified, the values must match. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). */
  feedLabel?: string;
  /** The countries where the items may be displayed. Represented as a CLDR territory code. Will be ignored for "product inventory" feeds. */
  targetCountries?: Array<string>;
  /** The two-letter ISO 639-1 language of the items in the feed. Must be a valid language for `targets[].country`. */
  language?: string;
  /** The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`. */
  includedDestinations?: Array<string>;
  /** The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted. */
  excludedDestinations?: Array<string>;
}

export const DatafeedTarget: Schema.Schema<DatafeedTarget> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  targetCountries: Schema.optional(Schema.Array(Schema.String)),
  language: Schema.optional(Schema.String),
  includedDestinations: Schema.optional(Schema.Array(Schema.String)),
  excludedDestinations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DatafeedTarget" }) as any as Schema.Schema<DatafeedTarget>;

export interface Datafeed {
  /** Required for update. The ID of the data feed. */
  id?: string;
  /** Required for insert. A descriptive name of the data feed. */
  name?: string;
  /** Required. The type of data feed. For product inventory feeds, only feeds for local stores, not online stores, are supported. Acceptable values are: - "`local products`" - "`product inventory`" - "`products`" */
  contentType?: string;
  /** The two-letter ISO 639-1 language in which the attributes are defined in the data feed. */
  attributeLanguage?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeed`" */
  kind?: string;
  /** Required. The filename of the feed. All feeds must have a unique file name. */
  fileName?: string;
  /** Fetch schedule for the feed file. */
  fetchSchedule?: DatafeedFetchSchedule;
  /** Format of the feed file. */
  format?: DatafeedFormat;
  /** The targets this feed should apply to (country, language, destinations). */
  targets?: Array<DatafeedTarget>;
}

export const Datafeed: Schema.Schema<Datafeed> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  contentType: Schema.optional(Schema.String),
  attributeLanguage: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  fileName: Schema.optional(Schema.String),
  fetchSchedule: Schema.optional(DatafeedFetchSchedule),
  format: Schema.optional(DatafeedFormat),
  targets: Schema.optional(Schema.Array(DatafeedTarget)),
})).annotate({ identifier: "Datafeed" }) as any as Schema.Schema<Datafeed>;

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

export const DatafeedsCustomBatchRequestEntry: Schema.Schema<DatafeedsCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  datafeedId: Schema.optional(Schema.String),
  datafeed: Schema.optional(Datafeed),
})).annotate({ identifier: "DatafeedsCustomBatchRequestEntry" }) as any as Schema.Schema<DatafeedsCustomBatchRequestEntry>;

export interface DatafeedsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<DatafeedsCustomBatchRequestEntry>;
}

export const DatafeedsCustomBatchRequest: Schema.Schema<DatafeedsCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(DatafeedsCustomBatchRequestEntry)),
})).annotate({ identifier: "DatafeedsCustomBatchRequest" }) as any as Schema.Schema<DatafeedsCustomBatchRequest>;

export interface DatafeedsCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** The requested data feed. Defined if and only if the request was successful. */
  datafeed?: Datafeed;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const DatafeedsCustomBatchResponseEntry: Schema.Schema<DatafeedsCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  datafeed: Schema.optional(Datafeed),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "DatafeedsCustomBatchResponseEntry" }) as any as Schema.Schema<DatafeedsCustomBatchResponseEntry>;

export interface DatafeedsCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<DatafeedsCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedsCustomBatchResponse`". */
  kind?: string;
}

export const DatafeedsCustomBatchResponse: Schema.Schema<DatafeedsCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(DatafeedsCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedsCustomBatchResponse" }) as any as Schema.Schema<DatafeedsCustomBatchResponse>;

export interface DatafeedsFetchNowResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedsFetchNowResponse`". */
  kind?: string;
}

export const DatafeedsFetchNowResponse: Schema.Schema<DatafeedsFetchNowResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedsFetchNowResponse" }) as any as Schema.Schema<DatafeedsFetchNowResponse>;

export interface DatafeedsListResponse {
  /** The token for the retrieval of the next page of datafeeds. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedsListResponse`". */
  kind?: string;
  resources?: Array<Datafeed>;
}

export const DatafeedsListResponse: Schema.Schema<DatafeedsListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(Datafeed)),
})).annotate({ identifier: "DatafeedsListResponse" }) as any as Schema.Schema<DatafeedsListResponse>;

export interface DatafeedstatusesCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" */
  method?: string;
  /** The ID of the data feed to get. */
  datafeedId?: string;
  /** Deprecated. Use `feedLabel` instead. The country to get the datafeed status for. If this parameter is provided, then `language` must also be provided. Note that for multi-target datafeeds this parameter is required. */
  country?: string;
  /** The feed label to get the datafeed status for. If this parameter is provided, then `language` must also be provided. Note that for multi-target datafeeds this parameter is required. */
  feedLabel?: string;
  /** The language to get the datafeed status for. If this parameter is provided then `country` must also be provided. Note that for multi-target datafeeds this parameter is required. */
  language?: string;
}

export const DatafeedstatusesCustomBatchRequestEntry: Schema.Schema<DatafeedstatusesCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  datafeedId: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedstatusesCustomBatchRequestEntry" }) as any as Schema.Schema<DatafeedstatusesCustomBatchRequestEntry>;

export interface DatafeedstatusesCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<DatafeedstatusesCustomBatchRequestEntry>;
}

export const DatafeedstatusesCustomBatchRequest: Schema.Schema<DatafeedstatusesCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(DatafeedstatusesCustomBatchRequestEntry)),
})).annotate({ identifier: "DatafeedstatusesCustomBatchRequest" }) as any as Schema.Schema<DatafeedstatusesCustomBatchRequest>;

export interface DatafeedStatusExample {
  /** Line number in the data feed where the example is found. */
  lineNumber?: string;
  /** The ID of the example item. */
  itemId?: string;
  /** The problematic value. */
  value?: string;
}

export const DatafeedStatusExample: Schema.Schema<DatafeedStatusExample> = Schema.suspend(() => Schema.Struct({
  lineNumber: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedStatusExample" }) as any as Schema.Schema<DatafeedStatusExample>;

export interface DatafeedStatusError {
  /** The code of the error, for example, "validation/invalid_value". */
  code?: string;
  /** The number of occurrences of the error in the feed. */
  count?: string;
  /** The error message, for example, "Invalid price". */
  message?: string;
  /** A list of example occurrences of the error, grouped by product. */
  examples?: Array<DatafeedStatusExample>;
}

export const DatafeedStatusError: Schema.Schema<DatafeedStatusError> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  examples: Schema.optional(Schema.Array(DatafeedStatusExample)),
})).annotate({ identifier: "DatafeedStatusError" }) as any as Schema.Schema<DatafeedStatusError>;

export interface DatafeedStatus {
  /** The ID of the feed for which the status is reported. */
  datafeedId?: string;
  /** The processing status of the feed. Acceptable values are: - "`"`failure`": The feed could not be processed or all items had errors.`" - "`in progress`": The feed is being processed. - "`none`": The feed has not yet been processed. For example, a feed that has never been uploaded will have this processing status. - "`success`": The feed was processed successfully, though some items might have had errors. */
  processingStatus?: string;
  /** The list of errors occurring in the feed. */
  errors?: Array<DatafeedStatusError>;
  /** The list of errors occurring in the feed. */
  warnings?: Array<DatafeedStatusError>;
  /** The number of items in the feed that were processed. */
  itemsTotal?: string;
  /** The number of items in the feed that were valid. */
  itemsValid?: string;
  /** The last date at which the feed was uploaded. */
  lastUploadDate?: string;
  /** The country for which the status is reported, represented as a CLDR territory code. */
  country?: string;
  /** The feed label status is reported for. */
  feedLabel?: string;
  /** The two-letter ISO 639-1 language for which the status is reported. */
  language?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedStatus`" */
  kind?: string;
}

export const DatafeedStatus: Schema.Schema<DatafeedStatus> = Schema.suspend(() => Schema.Struct({
  datafeedId: Schema.optional(Schema.String),
  processingStatus: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(DatafeedStatusError)),
  warnings: Schema.optional(Schema.Array(DatafeedStatusError)),
  itemsTotal: Schema.optional(Schema.String),
  itemsValid: Schema.optional(Schema.String),
  lastUploadDate: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedStatus" }) as any as Schema.Schema<DatafeedStatus>;

export interface DatafeedstatusesCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** The requested data feed status. Defined if and only if the request was successful. */
  datafeedStatus?: DatafeedStatus;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const DatafeedstatusesCustomBatchResponseEntry: Schema.Schema<DatafeedstatusesCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  datafeedStatus: Schema.optional(DatafeedStatus),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "DatafeedstatusesCustomBatchResponseEntry" }) as any as Schema.Schema<DatafeedstatusesCustomBatchResponseEntry>;

export interface DatafeedstatusesCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<DatafeedstatusesCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedstatusesCustomBatchResponse`". */
  kind?: string;
}

export const DatafeedstatusesCustomBatchResponse: Schema.Schema<DatafeedstatusesCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(DatafeedstatusesCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DatafeedstatusesCustomBatchResponse" }) as any as Schema.Schema<DatafeedstatusesCustomBatchResponse>;

export interface DatafeedstatusesListResponse {
  /** The token for the retrieval of the next page of datafeed statuses. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#datafeedstatusesListResponse`". */
  kind?: string;
  resources?: Array<DatafeedStatus>;
}

export const DatafeedstatusesListResponse: Schema.Schema<DatafeedstatusesListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(DatafeedStatus)),
})).annotate({ identifier: "DatafeedstatusesListResponse" }) as any as Schema.Schema<DatafeedstatusesListResponse>;

export interface LiaInventorySettings {
  /** The status of the inventory verification process. Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
  /** The name of the contact for the inventory verification process. */
  inventoryVerificationContactName?: string;
  /** The email of the contact for the inventory verification process. */
  inventoryVerificationContactEmail?: string;
  /** The status of the verification contact. Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  inventoryVerificationContactStatus?: string;
}

export const LiaInventorySettings: Schema.Schema<LiaInventorySettings> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  inventoryVerificationContactName: Schema.optional(Schema.String),
  inventoryVerificationContactEmail: Schema.optional(Schema.String),
  inventoryVerificationContactStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "LiaInventorySettings" }) as any as Schema.Schema<LiaInventorySettings>;

export interface LiaOnDisplayToOrderSettings {
  /** The status of the ?On display to order? feature. Acceptable values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
  /** Shipping cost and policy URL. */
  shippingCostPolicyUrl?: string;
}

export const LiaOnDisplayToOrderSettings: Schema.Schema<LiaOnDisplayToOrderSettings> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  shippingCostPolicyUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "LiaOnDisplayToOrderSettings" }) as any as Schema.Schema<LiaOnDisplayToOrderSettings>;

export interface LiaAboutPageSettings {
  /** The status of the verification process for the About page. Supported values are: - "`active`" - "`inactive`" - "`pending`" */
  status?: string;
  /** The URL for the About page. */
  url?: string;
}

export const LiaAboutPageSettings: Schema.Schema<LiaAboutPageSettings> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "LiaAboutPageSettings" }) as any as Schema.Schema<LiaAboutPageSettings>;

export interface LiaPosDataProvider {
  /** The ID of the POS data provider. */
  posDataProviderId?: string;
  /** The account ID by which this merchant is known to the POS data provider. */
  posExternalAccountId?: string;
}

export const LiaPosDataProvider: Schema.Schema<LiaPosDataProvider> = Schema.suspend(() => Schema.Struct({
  posDataProviderId: Schema.optional(Schema.String),
  posExternalAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "LiaPosDataProvider" }) as any as Schema.Schema<LiaPosDataProvider>;

export interface LiaOmnichannelExperience {
  /** The CLDR country code (for example, "US"). */
  country?: string;
  /** The Local Store Front (LSF) type for this country. Acceptable values are: - "`ghlsf`" (Google-Hosted Local Store Front) - "`mhlsfBasic`" (Merchant-Hosted Local Store Front Basic) - "`mhlsfFull`" (Merchant-Hosted Local Store Front Full) More details about these types can be found here. */
  lsfType?: string;
  /** The Pickup types for this country. Acceptable values are: - "`pickupToday`" - "`pickupLater`" */
  pickupTypes?: Array<string>;
}

export const LiaOmnichannelExperience: Schema.Schema<LiaOmnichannelExperience> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  lsfType: Schema.optional(Schema.String),
  pickupTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LiaOmnichannelExperience" }) as any as Schema.Schema<LiaOmnichannelExperience>;

export interface LiaCountrySettings {
  /** Required. CLDR country code (for example, "US"). */
  country?: string;
  /** LIA inventory verification settings. */
  inventory?: LiaInventorySettings;
  /** LIA "On Display To Order" settings. */
  onDisplayToOrder?: LiaOnDisplayToOrderSettings;
  /** The status of the "Merchant hosted local storefront" feature. */
  hostedLocalStorefrontActive?: boolean;
  /** The status of the "Store pickup" feature. */
  storePickupActive?: boolean;
  /** The settings for the About page. */
  about?: LiaAboutPageSettings;
  /** The POS data provider linked with this country. */
  posDataProvider?: LiaPosDataProvider;
  /** The omnichannel experience configured for this country. */
  omnichannelExperience?: LiaOmnichannelExperience;
}

export const LiaCountrySettings: Schema.Schema<LiaCountrySettings> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  inventory: Schema.optional(LiaInventorySettings),
  onDisplayToOrder: Schema.optional(LiaOnDisplayToOrderSettings),
  hostedLocalStorefrontActive: Schema.optional(Schema.Boolean),
  storePickupActive: Schema.optional(Schema.Boolean),
  about: Schema.optional(LiaAboutPageSettings),
  posDataProvider: Schema.optional(LiaPosDataProvider),
  omnichannelExperience: Schema.optional(LiaOmnichannelExperience),
})).annotate({ identifier: "LiaCountrySettings" }) as any as Schema.Schema<LiaCountrySettings>;

export interface LiaSettings {
  /** The ID of the account to which these LIA settings belong. Ignored upon update, always present in get request responses. */
  accountId?: string;
  /** The LIA settings for each country. */
  countrySettings?: Array<LiaCountrySettings>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liaSettings`" */
  kind?: string;
}

export const LiaSettings: Schema.Schema<LiaSettings> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  countrySettings: Schema.optional(Schema.Array(LiaCountrySettings)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiaSettings" }) as any as Schema.Schema<LiaSettings>;

export interface LiasettingsCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" - "`getAccessibleGmbAccounts`" - "`requestGmbAccess`" - "`requestInventoryVerification`" - "`setInventoryVerificationContact`" - "`update`" */
  method?: string;
  /** The ID of the account for which to get/update account LIA settings. */
  accountId?: string;
  /** The country code. Required only for RequestInventoryVerification. */
  country?: string;
  /** The account Lia settings to update. Only defined if the method is `update`. */
  liaSettings?: LiaSettings;
  /** The Business Profile. Required only for RequestGmbAccess. */
  gmbEmail?: string;
  /** Inventory validation contact name. Required only for SetInventoryValidationContact. */
  contactName?: string;
  /** Inventory validation contact email. Required only for SetInventoryValidationContact. */
  contactEmail?: string;
  /** The ID of POS data provider. Required only for SetPosProvider. */
  posDataProviderId?: string;
  /** The account ID by which this merchant is known to the POS provider. */
  posExternalAccountId?: string;
  /** The omnichannel experience for a country. Required only for SetOmnichannelExperience. */
  omnichannelExperience?: LiaOmnichannelExperience;
}

export const LiasettingsCustomBatchRequestEntry: Schema.Schema<LiasettingsCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  liaSettings: Schema.optional(LiaSettings),
  gmbEmail: Schema.optional(Schema.String),
  contactName: Schema.optional(Schema.String),
  contactEmail: Schema.optional(Schema.String),
  posDataProviderId: Schema.optional(Schema.String),
  posExternalAccountId: Schema.optional(Schema.String),
  omnichannelExperience: Schema.optional(LiaOmnichannelExperience),
})).annotate({ identifier: "LiasettingsCustomBatchRequestEntry" }) as any as Schema.Schema<LiasettingsCustomBatchRequestEntry>;

export interface LiasettingsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<LiasettingsCustomBatchRequestEntry>;
}

export const LiasettingsCustomBatchRequest: Schema.Schema<LiasettingsCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(LiasettingsCustomBatchRequestEntry)),
})).annotate({ identifier: "LiasettingsCustomBatchRequest" }) as any as Schema.Schema<LiasettingsCustomBatchRequest>;

export interface GmbAccountsGmbAccount {
  /** The type of the Business Profile (User or Business). */
  type?: string;
  /** The email which identifies the Business Profile. */
  email?: string;
  /** The name of the Business Profile. */
  name?: string;
  /** Number of listings under this account. */
  listingCount?: string;
}

export const GmbAccountsGmbAccount: Schema.Schema<GmbAccountsGmbAccount> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  listingCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GmbAccountsGmbAccount" }) as any as Schema.Schema<GmbAccountsGmbAccount>;

export interface GmbAccounts {
  /** The ID of the Merchant Center account. */
  accountId?: string;
  /** A list of Business Profiles which are available to the merchant. */
  gmbAccounts?: Array<GmbAccountsGmbAccount>;
}

export const GmbAccounts: Schema.Schema<GmbAccounts> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  gmbAccounts: Schema.optional(Schema.Array(GmbAccountsGmbAccount)),
})).annotate({ identifier: "GmbAccounts" }) as any as Schema.Schema<GmbAccounts>;

export interface PosDataProvidersPosDataProvider {
  /** The ID of the account. */
  providerId?: string;
  /** The display name of Pos data Provider. */
  displayName?: string;
  /** The full name of this POS data Provider. */
  fullName?: string;
}

export const PosDataProvidersPosDataProvider: Schema.Schema<PosDataProvidersPosDataProvider> = Schema.suspend(() => Schema.Struct({
  providerId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
})).annotate({ identifier: "PosDataProvidersPosDataProvider" }) as any as Schema.Schema<PosDataProvidersPosDataProvider>;

export interface PosDataProviders {
  /** Country code. */
  country?: string;
  /** A list of POS data providers. */
  posDataProviders?: Array<PosDataProvidersPosDataProvider>;
}

export const PosDataProviders: Schema.Schema<PosDataProviders> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  posDataProviders: Schema.optional(Schema.Array(PosDataProvidersPosDataProvider)),
})).annotate({ identifier: "PosDataProviders" }) as any as Schema.Schema<PosDataProviders>;

export interface LiasettingsCustomBatchResponseEntry {
  /** The ID of the request entry to which this entry responds. */
  batchId?: number;
  /** The retrieved or updated Lia settings. */
  liaSettings?: LiaSettings;
  /** A list of errors defined if, and only if, the request failed. */
  errors?: Errors;
  /** The list of accessible Business Profiles. */
  gmbAccounts?: GmbAccounts;
  /** The list of POS data providers. */
  posDataProviders?: Array<PosDataProviders>;
  /** The updated omnichannel experience for a country. */
  omnichannelExperience?: LiaOmnichannelExperience;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsCustomBatchResponseEntry`" */
  kind?: string;
}

export const LiasettingsCustomBatchResponseEntry: Schema.Schema<LiasettingsCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  liaSettings: Schema.optional(LiaSettings),
  errors: Schema.optional(Errors),
  gmbAccounts: Schema.optional(GmbAccounts),
  posDataProviders: Schema.optional(Schema.Array(PosDataProviders)),
  omnichannelExperience: Schema.optional(LiaOmnichannelExperience),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsCustomBatchResponseEntry" }) as any as Schema.Schema<LiasettingsCustomBatchResponseEntry>;

export interface LiasettingsCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<LiasettingsCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsCustomBatchResponse`". */
  kind?: string;
}

export const LiasettingsCustomBatchResponse: Schema.Schema<LiasettingsCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(LiasettingsCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsCustomBatchResponse" }) as any as Schema.Schema<LiasettingsCustomBatchResponse>;

export interface LiasettingsGetAccessibleGmbAccountsResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsGetAccessibleGmbAccountsResponse`". */
  kind?: string;
  /** The ID of the Merchant Center account. */
  accountId?: string;
  /** A list of Business Profiles which are available to the merchant. */
  gmbAccounts?: Array<GmbAccountsGmbAccount>;
}

export const LiasettingsGetAccessibleGmbAccountsResponse: Schema.Schema<LiasettingsGetAccessibleGmbAccountsResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  gmbAccounts: Schema.optional(Schema.Array(GmbAccountsGmbAccount)),
})).annotate({ identifier: "LiasettingsGetAccessibleGmbAccountsResponse" }) as any as Schema.Schema<LiasettingsGetAccessibleGmbAccountsResponse>;

export interface LiasettingsListResponse {
  /** The token for the retrieval of the next page of LIA settings. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsListResponse`". */
  kind?: string;
  resources?: Array<LiaSettings>;
}

export const LiasettingsListResponse: Schema.Schema<LiasettingsListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(LiaSettings)),
})).annotate({ identifier: "LiasettingsListResponse" }) as any as Schema.Schema<LiasettingsListResponse>;

export interface LiasettingsListPosDataProvidersResponse {
  /** The list of POS data providers for each eligible country */
  posDataProviders?: Array<PosDataProviders>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsListPosDataProvidersResponse`". */
  kind?: string;
}

export const LiasettingsListPosDataProvidersResponse: Schema.Schema<LiasettingsListPosDataProvidersResponse> = Schema.suspend(() => Schema.Struct({
  posDataProviders: Schema.optional(Schema.Array(PosDataProviders)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsListPosDataProvidersResponse" }) as any as Schema.Schema<LiasettingsListPosDataProvidersResponse>;

export interface LiasettingsRequestGmbAccessResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsRequestGmbAccessResponse`". */
  kind?: string;
}

export const LiasettingsRequestGmbAccessResponse: Schema.Schema<LiasettingsRequestGmbAccessResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsRequestGmbAccessResponse" }) as any as Schema.Schema<LiasettingsRequestGmbAccessResponse>;

export interface LiasettingsRequestInventoryVerificationResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsRequestInventoryVerificationResponse`". */
  kind?: string;
}

export const LiasettingsRequestInventoryVerificationResponse: Schema.Schema<LiasettingsRequestInventoryVerificationResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsRequestInventoryVerificationResponse" }) as any as Schema.Schema<LiasettingsRequestInventoryVerificationResponse>;

export interface LiasettingsSetInventoryVerificationContactResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsSetInventoryVerificationContactResponse`". */
  kind?: string;
}

export const LiasettingsSetInventoryVerificationContactResponse: Schema.Schema<LiasettingsSetInventoryVerificationContactResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsSetInventoryVerificationContactResponse" }) as any as Schema.Schema<LiasettingsSetInventoryVerificationContactResponse>;

export interface LiasettingsSetPosDataProviderResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#liasettingsSetPosDataProviderResponse`". */
  kind?: string;
}

export const LiasettingsSetPosDataProviderResponse: Schema.Schema<LiasettingsSetPosDataProviderResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LiasettingsSetPosDataProviderResponse" }) as any as Schema.Schema<LiasettingsSetPosDataProviderResponse>;

export interface Price {
  /** The price represented as a number. */
  value?: string;
  /** The currency of the price. */
  currency?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface CustomAttribute {
  /** The name of the attribute. Underscores will be replaced by spaces upon insertion. */
  name?: string;
  /** The value of the attribute. */
  value?: string;
  /** Subattributes within this attribute group. Exactly one of value or groupValues must be provided. */
  groupValues?: Array<CustomAttribute>;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  groupValues: Schema.optional(Schema.Array(CustomAttribute)),
})).annotate({ identifier: "CustomAttribute" }) as any as Schema.Schema<CustomAttribute>;

export interface LocalInventory {
  /** Required. The store code of this local inventory resource. */
  storeCode?: string;
  /** The price of the product. */
  price?: Price;
  /** The sale price of the product. Mandatory if `sale_price_effective_date` is defined. */
  salePrice?: Price;
  /** A date range represented by a pair of ISO 8601 dates separated by a space, comma, or slash. Both dates may be specified as 'null' if undecided. */
  salePriceEffectiveDate?: string;
  /** The availability of the product. For accepted attribute values, see the local product inventory feed specification. */
  availability?: string;
  /** The quantity of the product. Must be nonnegative. */
  quantity?: number;
  /** The supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the local product inventory feed specification. */
  pickupMethod?: string;
  /** The expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the local product inventory feed specification. */
  pickupSla?: string;
  /** The in-store product location. */
  instoreProductLocation?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#localInventory`" */
  kind?: string;
  /** A list of custom (merchant-provided) attributes. Can also be used to submit any attribute of the feed specification in its generic form, for example, `{ "name": "size type", "value": "regular" }`. */
  customAttributes?: Array<CustomAttribute>;
}

export const LocalInventory: Schema.Schema<LocalInventory> = Schema.suspend(() => Schema.Struct({
  storeCode: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  salePrice: Schema.optional(Price),
  salePriceEffectiveDate: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.Number),
  pickupMethod: Schema.optional(Schema.String),
  pickupSla: Schema.optional(Schema.String),
  instoreProductLocation: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
})).annotate({ identifier: "LocalInventory" }) as any as Schema.Schema<LocalInventory>;

export interface LocalinventoryCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** Method of the batch request entry. Acceptable values are: - "`insert`" */
  method?: string;
  /** The ID of the product for which to update local inventory. */
  productId?: string;
  /** Local inventory of the product. */
  localInventory?: LocalInventory;
}

export const LocalinventoryCustomBatchRequestEntry: Schema.Schema<LocalinventoryCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  localInventory: Schema.optional(LocalInventory),
})).annotate({ identifier: "LocalinventoryCustomBatchRequestEntry" }) as any as Schema.Schema<LocalinventoryCustomBatchRequestEntry>;

export interface LocalinventoryCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<LocalinventoryCustomBatchRequestEntry>;
}

export const LocalinventoryCustomBatchRequest: Schema.Schema<LocalinventoryCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(LocalinventoryCustomBatchRequestEntry)),
})).annotate({ identifier: "LocalinventoryCustomBatchRequest" }) as any as Schema.Schema<LocalinventoryCustomBatchRequest>;

export interface LocalinventoryCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#localinventoryCustomBatchResponseEntry`" */
  kind?: string;
}

export const LocalinventoryCustomBatchResponseEntry: Schema.Schema<LocalinventoryCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  errors: Schema.optional(Errors),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalinventoryCustomBatchResponseEntry" }) as any as Schema.Schema<LocalinventoryCustomBatchResponseEntry>;

export interface LocalinventoryCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<LocalinventoryCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#localinventoryCustomBatchResponse`". */
  kind?: string;
}

export const LocalinventoryCustomBatchResponse: Schema.Schema<LocalinventoryCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(LocalinventoryCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalinventoryCustomBatchResponse" }) as any as Schema.Schema<LocalinventoryCustomBatchResponse>;

export interface PosStore {
  /** Required. A store identifier that is unique for the given merchant. */
  storeCode?: string;
  /** Required. The street address of the store. */
  storeAddress?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posStore`" */
  kind?: string;
  /** The merchant or store name. */
  storeName?: string;
  /** The store phone number. */
  phoneNumber?: string;
  /** The website url for the store or merchant. */
  websiteUrl?: string;
  /** The business type of the store. */
  gcidCategory?: Array<string>;
  /** The Google Place Id of the store location. */
  placeId?: string;
  /** Output only. The matching status of POS store and Google Business Profile store. Possible values are: - "`matched`": The POS store is successfully matched with the Google Business Profile store. - "`failed`": The POS store is not matched with the Google Business Profile store. See matching_status_hint for further details. Note that there is up to 48 hours propagation delay for changes in Merchant Center (e.g. creation of new account, accounts linking) and Google Business Profile (e.g. store address update) which may affect the matching status. In such cases, after a delay call [pos.list](https://developers.google.com/shopping-content/reference/rest/v2.1/pos/list) to retrieve the updated matching status. */
  matchingStatus?: string;
  /** Output only. The hint of why the matching has failed. This is only set when matching_status=failed. Possible values are: - "`linked-store-not-found`": There aren't any Google Business Profile stores available for matching. Connect your Merchant Center account with the Google Business Profile account. Or add a new Google Business Profile store corresponding to the POS store. - "`store-match-not-found`": The provided POS store couldn't be matched to any of the connected Google Business Profile stores. Merchant Center account is connected correctly and stores are available on Google Business Profile, but POS store location address does not match with Google Business Profile stores' addresses. Update POS store address or Google Business Profile store address to match correctly. - "`store-match-unverified`": The provided POS store couldn't be matched to any of the connected Google Business Profile stores, as the matched Google Business Profile store is unverified. Go through the Google Business Profile verification process to match correctly. */
  matchingStatusHint?: string;
}

export const PosStore: Schema.Schema<PosStore> = Schema.suspend(() => Schema.Struct({
  storeCode: Schema.optional(Schema.String),
  storeAddress: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  storeName: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  websiteUrl: Schema.optional(Schema.String),
  gcidCategory: Schema.optional(Schema.Array(Schema.String)),
  placeId: Schema.optional(Schema.String),
  matchingStatus: Schema.optional(Schema.String),
  matchingStatusHint: Schema.optional(Schema.String),
})).annotate({ identifier: "PosStore" }) as any as Schema.Schema<PosStore>;

export interface PosInventory {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posInventory`" */
  kind?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The current price of the item. */
  price?: Price;
  /** Required. The available quantity of the item. */
  quantity?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
}

export const PosInventory: Schema.Schema<PosInventory> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  quantity: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  pickupMethod: Schema.optional(Schema.String),
  pickupSla: Schema.optional(Schema.String),
})).annotate({ identifier: "PosInventory" }) as any as Schema.Schema<PosInventory>;

export interface PosSale {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posSale`" */
  kind?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The price of the item. */
  price?: Price;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** A unique ID to group items from the same sale event. */
  saleId?: string;
}

export const PosSale: Schema.Schema<PosSale> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  quantity: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  saleId: Schema.optional(Schema.String),
})).annotate({ identifier: "PosSale" }) as any as Schema.Schema<PosSale>;

export interface PosCustomBatchRequestEntry {
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
  /** The store information to submit. This should be set only if the method is `insert`. */
  store?: PosStore;
  /** The inventory to submit. This should be set only if the method is `inventory`. */
  inventory?: PosInventory;
  /** The sale information to submit. This should be set only if the method is `sale`. */
  sale?: PosSale;
}

export const PosCustomBatchRequestEntry: Schema.Schema<PosCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  targetMerchantId: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.String),
  store: Schema.optional(PosStore),
  inventory: Schema.optional(PosInventory),
  sale: Schema.optional(PosSale),
})).annotate({ identifier: "PosCustomBatchRequestEntry" }) as any as Schema.Schema<PosCustomBatchRequestEntry>;

export interface PosCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<PosCustomBatchRequestEntry>;
}

export const PosCustomBatchRequest: Schema.Schema<PosCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(PosCustomBatchRequestEntry)),
})).annotate({ identifier: "PosCustomBatchRequest" }) as any as Schema.Schema<PosCustomBatchRequest>;

export interface PosCustomBatchResponseEntry {
  /** The ID of the request entry to which this entry responds. */
  batchId?: number;
  /** The retrieved or updated store information. */
  store?: PosStore;
  /** A list of errors defined if, and only if, the request failed. */
  errors?: Errors;
  /** The updated inventory information. */
  inventory?: PosInventory;
  /** The updated sale information. */
  sale?: PosSale;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posCustomBatchResponseEntry`" */
  kind?: string;
}

export const PosCustomBatchResponseEntry: Schema.Schema<PosCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  store: Schema.optional(PosStore),
  errors: Schema.optional(Errors),
  inventory: Schema.optional(PosInventory),
  sale: Schema.optional(PosSale),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PosCustomBatchResponseEntry" }) as any as Schema.Schema<PosCustomBatchResponseEntry>;

export interface PosCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<PosCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posCustomBatchResponse`". */
  kind?: string;
}

export const PosCustomBatchResponse: Schema.Schema<PosCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(PosCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PosCustomBatchResponse" }) as any as Schema.Schema<PosCustomBatchResponse>;

export interface PosInventoryRequest {
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The current price of the item. */
  price?: Price;
  /** Required. The available quantity of the item. */
  quantity?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
}

export const PosInventoryRequest: Schema.Schema<PosInventoryRequest> = Schema.suspend(() => Schema.Struct({
  storeCode: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  quantity: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  pickupMethod: Schema.optional(Schema.String),
  pickupSla: Schema.optional(Schema.String),
})).annotate({ identifier: "PosInventoryRequest" }) as any as Schema.Schema<PosInventoryRequest>;

export interface PosInventoryResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posInventoryResponse`". */
  kind?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The current price of the item. */
  price?: Price;
  /** Required. The available quantity of the item. */
  quantity?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** Optional. Supported pickup method for this offer. Unless the value is "not supported", this field must be submitted together with `pickupSla`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupMethod?: string;
  /** Optional. Expected date that an order will be ready for pickup relative to the order date. Must be submitted together with `pickupMethod`. For accepted attribute values, see the [local product inventory feed specification](https://support.google.com/merchants/answer/3061342). */
  pickupSla?: string;
}

export const PosInventoryResponse: Schema.Schema<PosInventoryResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  quantity: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  pickupMethod: Schema.optional(Schema.String),
  pickupSla: Schema.optional(Schema.String),
})).annotate({ identifier: "PosInventoryResponse" }) as any as Schema.Schema<PosInventoryResponse>;

export interface PosListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posListResponse`". */
  kind?: string;
  resources?: Array<PosStore>;
}

export const PosListResponse: Schema.Schema<PosListResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(PosStore)),
})).annotate({ identifier: "PosListResponse" }) as any as Schema.Schema<PosListResponse>;

export interface PosSaleRequest {
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The price of the item. */
  price?: Price;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** A unique ID to group items from the same sale event. */
  saleId?: string;
}

export const PosSaleRequest: Schema.Schema<PosSaleRequest> = Schema.suspend(() => Schema.Struct({
  storeCode: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  quantity: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  saleId: Schema.optional(Schema.String),
})).annotate({ identifier: "PosSaleRequest" }) as any as Schema.Schema<PosSaleRequest>;

export interface PosSaleResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#posSaleResponse`". */
  kind?: string;
  /** Required. The identifier of the merchant's store. Either a `storeCode` inserted through the API or the code of the store in a Business Profile. */
  storeCode?: string;
  /** Required. A unique identifier for the item. */
  itemId?: string;
  /** Required. The CLDR territory code for the item. */
  targetCountry?: string;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Global Trade Item Number. */
  gtin?: string;
  /** Required. The price of the item. */
  price?: Price;
  /** Required. The relative change of the available quantity. Negative for items returned. */
  quantity?: string;
  /** Required. The inventory timestamp, in ISO 8601 format. */
  timestamp?: string;
  /** A unique ID to group items from the same sale event. */
  saleId?: string;
}

export const PosSaleResponse: Schema.Schema<PosSaleResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.String),
  itemId: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  quantity: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  saleId: Schema.optional(Schema.String),
})).annotate({ identifier: "PosSaleResponse" }) as any as Schema.Schema<PosSaleResponse>;

export interface ProductDimension {
  /** Required. The length value represented as a number. The value can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The length units. Acceptable values are: - "`in`" - "`cm`" */
  unit?: string;
}

export const ProductDimension: Schema.Schema<ProductDimension> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductDimension" }) as any as Schema.Schema<ProductDimension>;

export interface ProductWeight {
  /** Required. The weight represented as a number. The weight can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The weight unit. Acceptable values are: - "`g`" - "`kg`" - "`oz`" - "`lb`" */
  unit?: string;
}

export const ProductWeight: Schema.Schema<ProductWeight> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductWeight" }) as any as Schema.Schema<ProductWeight>;

export interface ProductShipping {
  /** Fixed shipping price, represented as a number. */
  price?: Price;
  /** The CLDR territory code of the country to which an item will ship. */
  country?: string;
  /** The geographic region to which a shipping rate applies. */
  region?: string;
  /** A free-form description of the service class or delivery speed. */
  service?: string;
  /** The numeric ID of a location that the shipping rate applies to as defined in the Google Ads API. */
  locationId?: string;
  /** The location where the shipping is applicable, represented by a location group name. */
  locationGroupName?: string;
  /** The postal code range that the shipping rate applies to, represented by a postal code, a postal code prefix followed by a * wildcard, a range between two postal codes or two postal code prefixes of equal length. */
  postalCode?: string;
  /** Minimum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. minHandlingTime can only be present together with maxHandlingTime; but it's not required if maxHandlingTime is present. */
  minHandlingTime?: string;
  /** Maximum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds. */
  maxHandlingTime?: string;
  /** Minimum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. minTransitTime can only be present together with maxTransitTime; but it's not required if maxTransitTime is present. */
  minTransitTime?: string;
  /** Maximum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds. */
  maxTransitTime?: string;
}

export const ProductShipping: Schema.Schema<ProductShipping> = Schema.suspend(() => Schema.Struct({
  price: Schema.optional(Price),
  country: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  locationGroupName: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  minHandlingTime: Schema.optional(Schema.String),
  maxHandlingTime: Schema.optional(Schema.String),
  minTransitTime: Schema.optional(Schema.String),
  maxTransitTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductShipping" }) as any as Schema.Schema<ProductShipping>;

export interface FreeShippingThreshold {
  /** Required. The [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the country to which an item will ship. */
  country?: string;
  /** Required. The minimum product price for the shipping cost to become free. Represented as a number. */
  priceThreshold?: Price;
}

export const FreeShippingThreshold: Schema.Schema<FreeShippingThreshold> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  priceThreshold: Schema.optional(Price),
})).annotate({ identifier: "FreeShippingThreshold" }) as any as Schema.Schema<FreeShippingThreshold>;

export interface ProductShippingWeight {
  /** The weight of the product used to calculate the shipping cost of the item. */
  value?: number;
  /** The unit of value. */
  unit?: string;
}

export const ProductShippingWeight: Schema.Schema<ProductShippingWeight> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductShippingWeight" }) as any as Schema.Schema<ProductShippingWeight>;

export interface ProductTax {
  /** The percentage of tax rate that applies to the item price. */
  rate?: number;
  /** The country within which the item is taxed, specified as a CLDR territory code. */
  country?: string;
  /** The geographic region to which the tax rate applies. */
  region?: string;
  /** Should be set to true if tax is charged on shipping. */
  taxShip?: boolean;
  /** The numeric ID of a location that the tax rate applies to as defined in the Google Ads API. */
  locationId?: string;
  /** The postal code range that the tax rate applies to, represented by a ZIP code, a ZIP code prefix using * wildcard, a range between two ZIP codes or two ZIP code prefixes of equal length. Examples: 94114, 94*, 94002-95460, 94*-95*. */
  postalCode?: string;
}

export const ProductTax: Schema.Schema<ProductTax> = Schema.suspend(() => Schema.Struct({
  rate: Schema.optional(Schema.Number),
  country: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  taxShip: Schema.optional(Schema.Boolean),
  locationId: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductTax" }) as any as Schema.Schema<ProductTax>;

export interface Installment {
  /** The number of installments the buyer has to pay. */
  months?: string;
  /** The amount the buyer has to pay per month. */
  amount?: Price;
  /** Optional. The initial down payment amount the buyer has to pay. */
  downpayment?: Price;
  /** Optional. Type of installment payments. Supported values are: - "`finance`" - "`lease`" */
  creditType?: string;
}

export const Installment: Schema.Schema<Installment> = Schema.suspend(() => Schema.Struct({
  months: Schema.optional(Schema.String),
  amount: Schema.optional(Price),
  downpayment: Schema.optional(Price),
  creditType: Schema.optional(Schema.String),
})).annotate({ identifier: "Installment" }) as any as Schema.Schema<Installment>;

export interface LoyaltyProgram {
  /** Required. The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a merchant entity and a loyalty program entity. It must be provided so that system can associate the assets below (for example, price and points) with a merchant. The corresponding program must be linked to the merchant account. */
  programLabel?: string;
  /** Required. The label of the tier within the loyalty program. Must match one of the labels within the program. */
  tierLabel?: string;
  /** Optional. The price for members of the given tier (instant discount price). Must be smaller or equal to the regular price. */
  price?: Price;
  /** Optional. The cashback that can be used for future purchases. */
  cashbackForFutureUse?: Price;
  /** Optional. The amount of loyalty points earned on a purchase. */
  loyaltyPoints?: string;
  /** Optional. A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash. */
  memberPriceEffectiveDate?: string;
  /** Optional. The shipping label for the loyalty program. You can use this label to indicate whether this offer has the loyalty shipping benefit. If not specified, the item is not eligible for loyalty shipping for the given loyalty tier. */
  shippingLabel?: string;
}

export const LoyaltyProgram: Schema.Schema<LoyaltyProgram> = Schema.suspend(() => Schema.Struct({
  programLabel: Schema.optional(Schema.String),
  tierLabel: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  cashbackForFutureUse: Schema.optional(Price),
  loyaltyPoints: Schema.optional(Schema.String),
  memberPriceEffectiveDate: Schema.optional(Schema.String),
  shippingLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "LoyaltyProgram" }) as any as Schema.Schema<LoyaltyProgram>;

export interface ProductUnitPricingMeasure {
  /** The measure of an item. */
  value?: number;
  /** The unit of the measure. */
  unit?: string;
}

export const ProductUnitPricingMeasure: Schema.Schema<ProductUnitPricingMeasure> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductUnitPricingMeasure" }) as any as Schema.Schema<ProductUnitPricingMeasure>;

export interface ProductUnitPricingBaseMeasure {
  /** The denominator of the unit price. */
  value?: string;
  /** The unit of the denominator. */
  unit?: string;
}

export const ProductUnitPricingBaseMeasure: Schema.Schema<ProductUnitPricingBaseMeasure> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductUnitPricingBaseMeasure" }) as any as Schema.Schema<ProductUnitPricingBaseMeasure>;

export interface ProductShippingDimension {
  /** The dimension of the product used to calculate the shipping cost of the item. */
  value?: number;
  /** The unit of value. */
  unit?: string;
}

export const ProductShippingDimension: Schema.Schema<ProductShippingDimension> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductShippingDimension" }) as any as Schema.Schema<ProductShippingDimension>;

export interface ProductProductDetail {
  /** The section header used to group a set of product details. */
  sectionName?: string;
  /** The name of the product detail. */
  attributeName?: string;
  /** The value of the product detail. */
  attributeValue?: string;
}

export const ProductProductDetail: Schema.Schema<ProductProductDetail> = Schema.suspend(() => Schema.Struct({
  sectionName: Schema.optional(Schema.String),
  attributeName: Schema.optional(Schema.String),
  attributeValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductProductDetail" }) as any as Schema.Schema<ProductProductDetail>;

export interface ProductSubscriptionCost {
  /** The type of subscription period. - "`month`" - "`year`" */
  period?: string;
  /** The number of subscription periods the buyer has to pay. */
  periodLength?: string;
  /** The amount the buyer has to pay per subscription period. */
  amount?: Price;
}

export const ProductSubscriptionCost: Schema.Schema<ProductSubscriptionCost> = Schema.suspend(() => Schema.Struct({
  period: Schema.optional(Schema.String),
  periodLength: Schema.optional(Schema.String),
  amount: Schema.optional(Price),
})).annotate({ identifier: "ProductSubscriptionCost" }) as any as Schema.Schema<ProductSubscriptionCost>;

export interface CloudExportAdditionalProperties {
  /** Name of the given property. For example, "Screen-Resolution" for a TV product. Maximum string size is 256 characters. */
  propertyName?: string;
  /** Text value of the given property. For example, "8K(UHD)" could be a text value for a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. Maximum string size is 256 characters. */
  textValue?: Array<string>;
  /** Boolean value of the given property. For example for a TV product, "True" or "False" if the screen is UHD. */
  boolValue?: boolean;
  /** Integer values of the given property. For example, 1080 for a screen resolution of a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. */
  intValue?: Array<string>;
  /** Float values of the given property. For example for a TV product 1.2345. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. */
  floatValue?: Array<number>;
  /** Minimum float value of the given property. For example for a TV product 1.00. */
  minValue?: number;
  /** Maximum float value of the given property. For example for a TV product 100.00. */
  maxValue?: number;
  /** Unit of the given property. For example, "Pixels" for a TV product. Maximum string size is 256 bytes. */
  unitCode?: string;
}

export const CloudExportAdditionalProperties: Schema.Schema<CloudExportAdditionalProperties> = Schema.suspend(() => Schema.Struct({
  propertyName: Schema.optional(Schema.String),
  textValue: Schema.optional(Schema.Array(Schema.String)),
  boolValue: Schema.optional(Schema.Boolean),
  intValue: Schema.optional(Schema.Array(Schema.String)),
  floatValue: Schema.optional(Schema.Array(Schema.Number)),
  minValue: Schema.optional(Schema.Number),
  maxValue: Schema.optional(Schema.Number),
  unitCode: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudExportAdditionalProperties" }) as any as Schema.Schema<CloudExportAdditionalProperties>;

export interface ProductCertification {
  /** The certification authority, for example "European_Commission". Maximum length is 2000 characters. */
  certificationAuthority?: string;
  /** The name of the certification, for example "EPREL". Maximum length is 2000 characters. */
  certificationName?: string;
  /** The certification code, for eaxample "123456". Maximum length is 2000 characters. */
  certificationCode?: string;
  /** The certification value (also known as class, level or grade), for example "A+", "C", "gold". Maximum length is 2000 characters. */
  certificationValue?: string;
}

export const ProductCertification: Schema.Schema<ProductCertification> = Schema.suspend(() => Schema.Struct({
  certificationAuthority: Schema.optional(Schema.String),
  certificationName: Schema.optional(Schema.String),
  certificationCode: Schema.optional(Schema.String),
  certificationValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductCertification" }) as any as Schema.Schema<ProductCertification>;

export interface ProductStructuredTitle {
  /** Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`" */
  digitalSourceType?: string;
  /** Required. The title text. Maximum length is 150 characters. */
  content?: string;
}

export const ProductStructuredTitle: Schema.Schema<ProductStructuredTitle> = Schema.suspend(() => Schema.Struct({
  digitalSourceType: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductStructuredTitle" }) as any as Schema.Schema<ProductStructuredTitle>;

export interface ProductStructuredDescription {
  /** Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`" */
  digitalSourceType?: string;
  /** Required. The description text. Maximum length is 5000 characters. */
  content?: string;
}

export const ProductStructuredDescription: Schema.Schema<ProductStructuredDescription> = Schema.suspend(() => Schema.Struct({
  digitalSourceType: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductStructuredDescription" }) as any as Schema.Schema<ProductStructuredDescription>;

export interface ProductSustainabilityIncentive {
  /** Required. Sustainability incentive program. */
  type?: "TYPE_UNSPECIFIED" | "EV_TAX_CREDIT" | "EV_PRICE_DISCOUNT" | (string & {});
  /** Optional. The fixed amount of the incentive. */
  amount?: Price;
  /** Optional. The percentage of the sale price that the incentive is applied to. */
  percentage?: number;
}

export const ProductSustainabilityIncentive: Schema.Schema<ProductSustainabilityIncentive> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  amount: Schema.optional(Price),
  percentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProductSustainabilityIncentive" }) as any as Schema.Schema<ProductSustainabilityIncentive>;

export interface Product {
  /** The REST ID of the product. Content API methods that operate on products take this as their `productId` parameter. The REST ID for a product has one of the 2 forms channel:contentLanguage: targetCountry: offerId or channel:contentLanguage:feedLabel: offerId. */
  id?: string;
  /** Required. A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted. See the products feed specification for details. *Note:* Content API methods that operate on products take the REST ID of the product, *not* this identifier. */
  offerId?: string;
  /** Title of the item. */
  title?: string;
  /** Description of the item. */
  description?: string;
  /** URL directly linking to your item's page on your website. */
  link?: string;
  /** URL of an image of the item. */
  imageLink?: string;
  /** Additional URLs of images of the item. */
  additionalImageLinks?: Array<string>;
  /** Additional URLs of lifestyle images of the item. Used to explicitly identify images that showcase your item in a real-world context. See the Help Center article for more information. */
  lifestyleImageLinks?: Array<string>;
  /** Required. The two-letter ISO 639-1 language code for the item. */
  contentLanguage?: string;
  /** Required. The CLDR territory code for the item's country of sale. */
  targetCountry?: string;
  /** Feed label for the item. Either `targetCountry` or `feedLabel` is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). */
  feedLabel?: string;
  /** Required. The item's channel (online or local). Acceptable values are: - "`local`" - "`online`" */
  channel?: string;
  /** Date on which the item should expire, as specified upon insertion, in ISO 8601 format. The actual expiration date in Google Shopping is exposed in `productstatuses` as `googleExpirationDate` and might be earlier if `expirationDate` is too far in the future. */
  expirationDate?: string;
  /** The date time when an offer becomes visible in search results across Google’s YouTube surfaces, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. See [Disclosure date](https://support.google.com/merchants/answer/13034208) for more information. */
  disclosureDate?: string;
  /** Should be set to true if the item is targeted towards adults. */
  adult?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#product`" */
  kind?: string;
  /** Brand of the item. */
  brand?: string;
  /** Color of the item. */
  color?: string;
  /** Google's category of the item (see [Google product taxonomy](https://support.google.com/merchants/answer/1705911)). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API. */
  googleProductCategory?: string;
  /** Global Trade Item Number (GTIN) of the item. */
  gtin?: string;
  /** Shared identifier for all variants of the same product. */
  itemGroupId?: string;
  /** The material of which the item is made. */
  material?: string;
  /** Manufacturer Part Number (MPN) of the item. */
  mpn?: string;
  /** The item's pattern (for example, polka dots). */
  pattern?: string;
  /** Price of the item. */
  price?: Price;
  /** Maximum retail price (MRP) of the item. Applicable to India only. */
  maximumRetailPrice?: Price;
  /** Advertised sale price of the item. */
  salePrice?: Price;
  /** Date range during which the item is on sale (see product data specification ). */
  salePriceEffectiveDate?: string;
  /** The height of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productHeight?: ProductDimension;
  /** The length of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productLength?: ProductDimension;
  /** The width of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productWidth?: ProductDimension;
  /** The weight of the product in the units provided. The value must be between 0 (exclusive) and 2000 (inclusive). */
  productWeight?: ProductWeight;
  /** Shipping rules. */
  shipping?: Array<ProductShipping>;
  /** Optional. Conditions to be met for a product to have free shipping. */
  freeShippingThreshold?: Array<FreeShippingThreshold>;
  /** Weight of the item for shipping. */
  shippingWeight?: ProductShippingWeight;
  /** Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same `itemGroupId` value (see size definition). */
  sizes?: Array<string>;
  /** Tax information. */
  taxes?: Array<ProductTax>;
  /** A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google (formerly known as Shopping Actions). */
  customAttributes?: Array<CustomAttribute>;
  /** False when the item does not have unique product identifiers appropriate to its category, such as GTIN, MPN, and brand. Required according to the Unique Product Identifier Rules for all target countries except for Canada. */
  identifierExists?: boolean;
  /** Number and amount of installments to pay for an item. */
  installment?: Installment;
  /** Loyalty program information that is used to surface loyalty benefits ( for example, better pricing, points, etc) to the user of this item. This signular field points to the latest uploaded loyalty program info. This field will be deprecated in the coming weeks and should not be used in favor of the plural 'LoyaltyProgram' field below. */
  loyaltyProgram?: LoyaltyProgram;
  /** Optional. A list of loyalty program information that is used to surface loyalty benefits (for example, better pricing, points, etc) to the user of this item. */
  loyaltyPrograms?: Array<LoyaltyProgram>;
  /** The number of identical products in a merchant-defined multipack. */
  multipack?: string;
  /** Custom label 0 for custom grouping of items in a Shopping campaign. */
  customLabel0?: string;
  /** Custom label 1 for custom grouping of items in a Shopping campaign. */
  customLabel1?: string;
  /** Custom label 2 for custom grouping of items in a Shopping campaign. */
  customLabel2?: string;
  /** Custom label 3 for custom grouping of items in a Shopping campaign. */
  customLabel3?: string;
  /** Custom label 4 for custom grouping of items in a Shopping campaign. */
  customLabel4?: string;
  /** Whether the item is a merchant-defined bundle. A bundle is a custom grouping of different products sold by a merchant for a single price. */
  isBundle?: boolean;
  /** URL for the mobile-optimized version of your item's landing page. */
  mobileLink?: string;
  /** The day a pre-ordered product becomes available for delivery, in ISO 8601 format. */
  availabilityDate?: string;
  /** The shipping label of the product, used to group product in account-level shipping rules. */
  shippingLabel?: string;
  /** The measure and dimension of an item. */
  unitPricingMeasure?: ProductUnitPricingMeasure;
  /** The preference of the denominator of the unit price. */
  unitPricingBaseMeasure?: ProductUnitPricingBaseMeasure;
  /** Length of the item for shipping. */
  shippingLength?: ProductShippingDimension;
  /** Width of the item for shipping. */
  shippingWidth?: ProductShippingDimension;
  /** Height of the item for shipping. */
  shippingHeight?: ProductShippingDimension;
  /** An identifier for an item for dynamic remarketing campaigns. */
  displayAdsId?: string;
  /** Advertiser-specified recommendations. */
  displayAdsSimilarIds?: Array<string>;
  /** Title of an item for dynamic remarketing campaigns. */
  displayAdsTitle?: string;
  /** URL directly to your item's landing page for dynamic remarketing campaigns. */
  displayAdsLink?: string;
  /** Offer margin for dynamic remarketing campaigns. */
  displayAdsValue?: number;
  /** The quantity of the product that is available for selling on Google. Supported only for online products. */
  sellOnGoogleQuantity?: string;
  /** The unique ID of a promotion. */
  promotionIds?: Array<string>;
  /** Maximal product handling time (in business days). */
  maxHandlingTime?: string;
  /** Minimal product handling time (in business days). */
  minHandlingTime?: string;
  /** Cost of goods sold. Used for gross profit reporting. */
  costOfGoodsSold?: Price;
  /** A safeguard in the [Automated Discounts](//support.google.com/merchants/answer/10295759) and [Dynamic Promotions](//support.google.com/merchants/answer/13949249) projects, ensuring that discounts on merchants' offers do not fall below this value, thereby preserving the offer's value and profitability. */
  autoPricingMinPrice?: Price;
  /** Output only. The source of the offer, that is, how the offer was created. Acceptable values are: - "`api`" - "`crawl`" - "`feed`" */
  source?: string;
  /** The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`. */
  includedDestinations?: Array<string>;
  /** The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted. */
  excludedDestinations?: Array<string>;
  /** Used to group items in an arbitrary way. Only for CPA%, discouraged otherwise. */
  adsGrouping?: string;
  /** Similar to ads_grouping, but only works on CPC. */
  adsLabels?: Array<string>;
  /** Allows advertisers to override the item URL when the product is shown within the context of Product Ads. */
  adsRedirect?: string;
  /** Categories of the item (formatted as in product data specification). */
  productTypes?: Array<string>;
  /** Target age group of the item. */
  ageGroup?: string;
  /** Availability status of the item. */
  availability?: string;
  /** Condition or state of the item. */
  condition?: string;
  /** Target gender of the item. */
  gender?: string;
  /** System in which the size is specified. Recommended for apparel items. */
  sizeSystem?: string;
  /** The cut of the item. Recommended for apparel items. */
  sizeType?: string;
  /** Additional cut of the item. Used together with size_type to represent combined size types for apparel items. */
  additionalSizeType?: string;
  /** The energy efficiency class as defined in EU directive 2010/30/EU. */
  energyEfficiencyClass?: string;
  /** The energy efficiency class as defined in EU directive 2010/30/EU. */
  minEnergyEfficiencyClass?: string;
  /** The energy efficiency class as defined in EU directive 2010/30/EU. */
  maxEnergyEfficiencyClass?: string;
  /** The tax category of the product, used to configure detailed tax nexus in account-level tax settings. */
  taxCategory?: string;
  /** The transit time label of the product, used to group product in account-level transit time tables. */
  transitTimeLabel?: string;
  /** List of country codes (ISO 3166-1 alpha-2) to exclude the offer from Shopping Ads destination. Countries from this list are removed from countries configured in MC feed settings. */
  shoppingAdsExcludedCountries?: Array<string>;
  /** The pick up option for the item. Acceptable values are: - "`buy`" - "`reserve`" - "`ship to store`" - "`not supported`" */
  pickupMethod?: string;
  /** Item store pickup timeline. Acceptable values are: - "`same day`" - "`next day`" - "`2-day`" - "`3-day`" - "`4-day`" - "`5-day`" - "`6-day`" - "`7-day`" - "`multi-week`" */
  pickupSla?: string;
  /** URL template for merchant hosted local storefront. */
  linkTemplate?: string;
  /** URL template for merchant hosted local storefront optimized for mobile devices. */
  mobileLinkTemplate?: string;
  /** Technical specification or additional product details. */
  productDetails?: Array<ProductProductDetail>;
  /** Bullet points describing the most relevant highlights of a product. */
  productHighlights?: Array<string>;
  /** Number of periods (months or years) and amount of payment per period for an item with an associated subscription contract. */
  subscriptionCost?: ProductSubscriptionCost;
  /** URL for the canonical version of your item's landing page. */
  canonicalLink?: string;
  /** Required for multi-seller accounts. Use this attribute if you're a marketplace uploading products for various sellers to your multi-seller account. */
  externalSellerId?: string;
  /** Publication of this item should be temporarily paused. Acceptable values are: - "`ads`" */
  pause?: string;
  /** URL of the 3D model of the item to provide more visuals. */
  virtualModelLink?: string;
  /** Extra fields to export to the Cloud Retail program. */
  cloudExportAdditionalProperties?: Array<CloudExportAdditionalProperties>;
  /** Product [certification](https://support.google.com/merchants/answer/13528839), introduced for EU energy efficiency labeling compliance using the [EU EPREL](https://eprel.ec.europa.eu/screen/home) database. */
  certifications?: Array<ProductCertification>;
  /** Structured title, for algorithmically (AI)-generated titles. */
  structuredTitle?: ProductStructuredTitle;
  /** Structured description, for algorithmically (AI)-generated descriptions. */
  structuredDescription?: ProductStructuredDescription;
  /** Optional. The list of sustainability incentive programs. */
  sustainabilityIncentives?: Array<ProductSustainabilityIncentive>;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  link: Schema.optional(Schema.String),
  imageLink: Schema.optional(Schema.String),
  additionalImageLinks: Schema.optional(Schema.Array(Schema.String)),
  lifestyleImageLinks: Schema.optional(Schema.Array(Schema.String)),
  contentLanguage: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  expirationDate: Schema.optional(Schema.String),
  disclosureDate: Schema.optional(Schema.String),
  adult: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  color: Schema.optional(Schema.String),
  googleProductCategory: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  itemGroupId: Schema.optional(Schema.String),
  material: Schema.optional(Schema.String),
  mpn: Schema.optional(Schema.String),
  pattern: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  maximumRetailPrice: Schema.optional(Price),
  salePrice: Schema.optional(Price),
  salePriceEffectiveDate: Schema.optional(Schema.String),
  productHeight: Schema.optional(ProductDimension),
  productLength: Schema.optional(ProductDimension),
  productWidth: Schema.optional(ProductDimension),
  productWeight: Schema.optional(ProductWeight),
  shipping: Schema.optional(Schema.Array(ProductShipping)),
  freeShippingThreshold: Schema.optional(Schema.Array(FreeShippingThreshold)),
  shippingWeight: Schema.optional(ProductShippingWeight),
  sizes: Schema.optional(Schema.Array(Schema.String)),
  taxes: Schema.optional(Schema.Array(ProductTax)),
  customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
  identifierExists: Schema.optional(Schema.Boolean),
  installment: Schema.optional(Installment),
  loyaltyProgram: Schema.optional(LoyaltyProgram),
  loyaltyPrograms: Schema.optional(Schema.Array(LoyaltyProgram)),
  multipack: Schema.optional(Schema.String),
  customLabel0: Schema.optional(Schema.String),
  customLabel1: Schema.optional(Schema.String),
  customLabel2: Schema.optional(Schema.String),
  customLabel3: Schema.optional(Schema.String),
  customLabel4: Schema.optional(Schema.String),
  isBundle: Schema.optional(Schema.Boolean),
  mobileLink: Schema.optional(Schema.String),
  availabilityDate: Schema.optional(Schema.String),
  shippingLabel: Schema.optional(Schema.String),
  unitPricingMeasure: Schema.optional(ProductUnitPricingMeasure),
  unitPricingBaseMeasure: Schema.optional(ProductUnitPricingBaseMeasure),
  shippingLength: Schema.optional(ProductShippingDimension),
  shippingWidth: Schema.optional(ProductShippingDimension),
  shippingHeight: Schema.optional(ProductShippingDimension),
  displayAdsId: Schema.optional(Schema.String),
  displayAdsSimilarIds: Schema.optional(Schema.Array(Schema.String)),
  displayAdsTitle: Schema.optional(Schema.String),
  displayAdsLink: Schema.optional(Schema.String),
  displayAdsValue: Schema.optional(Schema.Number),
  sellOnGoogleQuantity: Schema.optional(Schema.String),
  promotionIds: Schema.optional(Schema.Array(Schema.String)),
  maxHandlingTime: Schema.optional(Schema.String),
  minHandlingTime: Schema.optional(Schema.String),
  costOfGoodsSold: Schema.optional(Price),
  autoPricingMinPrice: Schema.optional(Price),
  source: Schema.optional(Schema.String),
  includedDestinations: Schema.optional(Schema.Array(Schema.String)),
  excludedDestinations: Schema.optional(Schema.Array(Schema.String)),
  adsGrouping: Schema.optional(Schema.String),
  adsLabels: Schema.optional(Schema.Array(Schema.String)),
  adsRedirect: Schema.optional(Schema.String),
  productTypes: Schema.optional(Schema.Array(Schema.String)),
  ageGroup: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  gender: Schema.optional(Schema.String),
  sizeSystem: Schema.optional(Schema.String),
  sizeType: Schema.optional(Schema.String),
  additionalSizeType: Schema.optional(Schema.String),
  energyEfficiencyClass: Schema.optional(Schema.String),
  minEnergyEfficiencyClass: Schema.optional(Schema.String),
  maxEnergyEfficiencyClass: Schema.optional(Schema.String),
  taxCategory: Schema.optional(Schema.String),
  transitTimeLabel: Schema.optional(Schema.String),
  shoppingAdsExcludedCountries: Schema.optional(Schema.Array(Schema.String)),
  pickupMethod: Schema.optional(Schema.String),
  pickupSla: Schema.optional(Schema.String),
  linkTemplate: Schema.optional(Schema.String),
  mobileLinkTemplate: Schema.optional(Schema.String),
  productDetails: Schema.optional(Schema.Array(ProductProductDetail)),
  productHighlights: Schema.optional(Schema.Array(Schema.String)),
  subscriptionCost: Schema.optional(ProductSubscriptionCost),
  canonicalLink: Schema.optional(Schema.String),
  externalSellerId: Schema.optional(Schema.String),
  pause: Schema.optional(Schema.String),
  virtualModelLink: Schema.optional(Schema.String),
  cloudExportAdditionalProperties: Schema.optional(Schema.Array(CloudExportAdditionalProperties)),
  certifications: Schema.optional(Schema.Array(ProductCertification)),
  structuredTitle: Schema.optional(ProductStructuredTitle),
  structuredDescription: Schema.optional(ProductStructuredDescription),
  sustainabilityIncentives: Schema.optional(Schema.Array(ProductSustainabilityIncentive)),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface ProductsCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`delete`" - "`get`" - "`insert`" - "`update`" */
  method?: string;
  /** The ID of the product to get or mutate. Only defined if the method is `get`, `delete`, or `update`. */
  productId?: string;
  /** The product to insert or update. Only required if the method is `insert` or `update`. If the `update` method is used with `updateMask` only to delete a field, then this isn't required. For example, setting `salePrice` on the `updateMask` and not providing a `product` will result in an existing sale price on the product specified by `productId` being deleted. */
  product?: Product;
  /** The Content API Supplemental Feed ID. If present then product insertion or deletion applies to a supplemental feed instead of primary Content API feed. */
  feedId?: string;
  /** The comma-separated list of product attributes to be updated. Example: `"title,salePrice"`. Attributes specified in the update mask without a value specified in the body will be deleted from the product. *You must specify the update mask to delete attributes.* Only top-level product attributes can be updated. If not defined, product attributes with set values will be updated and other attributes will stay unchanged. Only defined if the method is `update`. */
  updateMask?: string;
}

export const ProductsCustomBatchRequestEntry: Schema.Schema<ProductsCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  product: Schema.optional(Product),
  feedId: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductsCustomBatchRequestEntry" }) as any as Schema.Schema<ProductsCustomBatchRequestEntry>;

export interface ProductsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<ProductsCustomBatchRequestEntry>;
}

export const ProductsCustomBatchRequest: Schema.Schema<ProductsCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(ProductsCustomBatchRequestEntry)),
})).annotate({ identifier: "ProductsCustomBatchRequest" }) as any as Schema.Schema<ProductsCustomBatchRequest>;

export interface ProductsCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productsCustomBatchResponseEntry`" */
  kind?: string;
  /** The inserted product. Only defined if the method is `insert` and if the request was successful. */
  product?: Product;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const ProductsCustomBatchResponseEntry: Schema.Schema<ProductsCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  product: Schema.optional(Product),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "ProductsCustomBatchResponseEntry" }) as any as Schema.Schema<ProductsCustomBatchResponseEntry>;

export interface ProductsCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<ProductsCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productsCustomBatchResponse`". */
  kind?: string;
}

export const ProductsCustomBatchResponse: Schema.Schema<ProductsCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(ProductsCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductsCustomBatchResponse" }) as any as Schema.Schema<ProductsCustomBatchResponse>;

export interface ProductsListResponse {
  /** The token for the retrieval of the next page of products. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productsListResponse`". */
  kind?: string;
  resources?: Array<Product>;
}

export const ProductsListResponse: Schema.Schema<ProductsListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(Product)),
})).annotate({ identifier: "ProductsListResponse" }) as any as Schema.Schema<ProductsListResponse>;

export interface ProductstatusesCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" */
  method?: string;
  /** The ID of the product whose status to get. */
  productId?: string;
  /** Deprecated: Setting this field has no effect and attributes are never included. */
  includeAttributes?: boolean;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: Array<string>;
}

export const ProductstatusesCustomBatchRequestEntry: Schema.Schema<ProductstatusesCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  includeAttributes: Schema.optional(Schema.Boolean),
  destinations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProductstatusesCustomBatchRequestEntry" }) as any as Schema.Schema<ProductstatusesCustomBatchRequestEntry>;

export interface ProductstatusesCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<ProductstatusesCustomBatchRequestEntry>;
}

export const ProductstatusesCustomBatchRequest: Schema.Schema<ProductstatusesCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(ProductstatusesCustomBatchRequestEntry)),
})).annotate({ identifier: "ProductstatusesCustomBatchRequest" }) as any as Schema.Schema<ProductstatusesCustomBatchRequest>;

export interface ProductStatusDestinationStatus {
  /** The name of the destination */
  destination?: string;
  /** The channel of the destination. */
  channel?: string;
  /** Deprecated. Destination approval status in `targetCountry` of the offer. */
  status?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where the offer is approved. */
  approvedCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the offer is pending approval. */
  pendingCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the offer is disapproved. */
  disapprovedCountries?: Array<string>;
}

export const ProductStatusDestinationStatus: Schema.Schema<ProductStatusDestinationStatus> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  approvedCountries: Schema.optional(Schema.Array(Schema.String)),
  pendingCountries: Schema.optional(Schema.Array(Schema.String)),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProductStatusDestinationStatus" }) as any as Schema.Schema<ProductStatusDestinationStatus>;

export interface ProductStatusItemLevelIssue {
  /** The error code of the issue. */
  code?: string;
  /** How this issue affects serving of the offer. */
  servability?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attributeName?: string;
  /** The destination the issue applies to. */
  destination?: string;
  /** A short issue description in English. */
  description?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where issue applies to the offer. */
  applicableCountries?: Array<string>;
}

export const ProductStatusItemLevelIssue: Schema.Schema<ProductStatusItemLevelIssue> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  servability: Schema.optional(Schema.String),
  resolution: Schema.optional(Schema.String),
  attributeName: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  applicableCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProductStatusItemLevelIssue" }) as any as Schema.Schema<ProductStatusItemLevelIssue>;

export interface ProductStatus {
  /** The ID of the product for which status is reported. */
  productId?: string;
  /** The title of the product. */
  title?: string;
  /** The link to the product. */
  link?: string;
  /** The intended destinations for the product. */
  destinationStatuses?: Array<ProductStatusDestinationStatus>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productStatus`" */
  kind?: string;
  /** Date on which the item has been created, in ISO 8601 format. */
  creationDate?: string;
  /** Date on which the item has been last updated, in ISO 8601 format. */
  lastUpdateDate?: string;
  /** Date on which the item expires in Google Shopping, in ISO 8601 format. */
  googleExpirationDate?: string;
  /** A list of all issues associated with the product. */
  itemLevelIssues?: Array<ProductStatusItemLevelIssue>;
}

export const ProductStatus: Schema.Schema<ProductStatus> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  link: Schema.optional(Schema.String),
  destinationStatuses: Schema.optional(Schema.Array(ProductStatusDestinationStatus)),
  kind: Schema.optional(Schema.String),
  creationDate: Schema.optional(Schema.String),
  lastUpdateDate: Schema.optional(Schema.String),
  googleExpirationDate: Schema.optional(Schema.String),
  itemLevelIssues: Schema.optional(Schema.Array(ProductStatusItemLevelIssue)),
})).annotate({ identifier: "ProductStatus" }) as any as Schema.Schema<ProductStatus>;

export interface ProductstatusesCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productstatusesCustomBatchResponseEntry`" */
  kind?: string;
  /** The requested product status. Only defined if the request was successful. */
  productStatus?: ProductStatus;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const ProductstatusesCustomBatchResponseEntry: Schema.Schema<ProductstatusesCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  productStatus: Schema.optional(ProductStatus),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "ProductstatusesCustomBatchResponseEntry" }) as any as Schema.Schema<ProductstatusesCustomBatchResponseEntry>;

export interface ProductstatusesCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<ProductstatusesCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productstatusesCustomBatchResponse`". */
  kind?: string;
}

export const ProductstatusesCustomBatchResponse: Schema.Schema<ProductstatusesCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(ProductstatusesCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductstatusesCustomBatchResponse" }) as any as Schema.Schema<ProductstatusesCustomBatchResponse>;

export interface ProductstatusesListResponse {
  /** The token for the retrieval of the next page of products statuses. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#productstatusesListResponse`". */
  kind?: string;
  resources?: Array<ProductStatus>;
}

export const ProductstatusesListResponse: Schema.Schema<ProductstatusesListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(ProductStatus)),
})).annotate({ identifier: "ProductstatusesListResponse" }) as any as Schema.Schema<ProductstatusesListResponse>;

export interface PubsubNotificationSettings {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#pubsubNotificationSettings`" */
  kind?: string;
  /** Cloud pub/sub topic to which notifications are sent (read-only). */
  cloudTopicName?: string;
  /** List of event types. Acceptable values are: - "`orderPendingShipment`" */
  registeredEvents?: Array<string>;
}

export const PubsubNotificationSettings: Schema.Schema<PubsubNotificationSettings> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  cloudTopicName: Schema.optional(Schema.String),
  registeredEvents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PubsubNotificationSettings" }) as any as Schema.Schema<PubsubNotificationSettings>;

export interface RegionalInventory {
  /** The ID uniquely identifying each region. */
  regionId?: string;
  /** The price of the product. */
  price?: Price;
  /** The sale price of the product. Mandatory if `sale_price_effective_date` is defined. */
  salePrice?: Price;
  /** A date range represented by a pair of ISO 8601 dates separated by a space, comma, or slash. Both dates might be specified as 'null' if undecided. */
  salePriceEffectiveDate?: string;
  /** The availability of the product. */
  availability?: string;
  /** A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form. */
  customAttributes?: Array<CustomAttribute>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#regionalInventory`". */
  kind?: string;
}

export const RegionalInventory: Schema.Schema<RegionalInventory> = Schema.suspend(() => Schema.Struct({
  regionId: Schema.optional(Schema.String),
  price: Schema.optional(Price),
  salePrice: Schema.optional(Price),
  salePriceEffectiveDate: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalInventory" }) as any as Schema.Schema<RegionalInventory>;

export interface RegionalinventoryCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** Method of the batch request entry. Acceptable values are: - "`insert`" */
  method?: string;
  /** The ID of the product for which to update price and availability. */
  productId?: string;
  /** Price and availability of the product. */
  regionalInventory?: RegionalInventory;
}

export const RegionalinventoryCustomBatchRequestEntry: Schema.Schema<RegionalinventoryCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  regionalInventory: Schema.optional(RegionalInventory),
})).annotate({ identifier: "RegionalinventoryCustomBatchRequestEntry" }) as any as Schema.Schema<RegionalinventoryCustomBatchRequestEntry>;

export interface RegionalinventoryCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<RegionalinventoryCustomBatchRequestEntry>;
}

export const RegionalinventoryCustomBatchRequest: Schema.Schema<RegionalinventoryCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(RegionalinventoryCustomBatchRequestEntry)),
})).annotate({ identifier: "RegionalinventoryCustomBatchRequest" }) as any as Schema.Schema<RegionalinventoryCustomBatchRequest>;

export interface RegionalinventoryCustomBatchResponseEntry {
  /** The ID of the request entry this entry responds to. */
  batchId?: number;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
  /** Price and availability of the product. */
  regionalInventory?: RegionalInventory;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#regionalinventoryCustomBatchResponseEntry`". */
  kind?: string;
}

export const RegionalinventoryCustomBatchResponseEntry: Schema.Schema<RegionalinventoryCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  errors: Schema.optional(Errors),
  regionalInventory: Schema.optional(RegionalInventory),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalinventoryCustomBatchResponseEntry" }) as any as Schema.Schema<RegionalinventoryCustomBatchResponseEntry>;

export interface RegionalinventoryCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<RegionalinventoryCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#regionalinventoryCustomBatchResponse`". */
  kind?: string;
}

export const RegionalinventoryCustomBatchResponse: Schema.Schema<RegionalinventoryCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(RegionalinventoryCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionalinventoryCustomBatchResponse" }) as any as Schema.Schema<RegionalinventoryCustomBatchResponse>;

export interface HolidayCutoff {
  /** Unique identifier for the holiday. Required. */
  holidayId?: string;
  /** Date of the order deadline, in ISO 8601 format. For example, "2016-11-29" for 29th November 2016. Required. */
  deadlineDate?: string;
  /** Hour of the day on the deadline date until which the order has to be placed to qualify for the delivery guarantee. Possible values are: 0 (midnight), 1, ..., 12 (noon), 13, ..., 23. Required. */
  deadlineHour?: number;
  /** Timezone identifier for the deadline hour (for example, "Europe/Zurich"). List of identifiers. Required. */
  deadlineTimezone?: string;
  /** Date on which the deadline will become visible to consumers in ISO 8601 format. For example, "2016-10-31" for 31st October 2016. Required. */
  visibleFromDate?: string;
}

export const HolidayCutoff: Schema.Schema<HolidayCutoff> = Schema.suspend(() => Schema.Struct({
  holidayId: Schema.optional(Schema.String),
  deadlineDate: Schema.optional(Schema.String),
  deadlineHour: Schema.optional(Schema.Number),
  deadlineTimezone: Schema.optional(Schema.String),
  visibleFromDate: Schema.optional(Schema.String),
})).annotate({ identifier: "HolidayCutoff" }) as any as Schema.Schema<HolidayCutoff>;

export interface CutoffTime {
  /** Hour of the cutoff time until which an order has to be placed to be processed in the same day. Required. */
  hour?: number;
  /** Minute of the cutoff time until which an order has to be placed to be processed in the same day. Required. */
  minute?: number;
  /** Timezone identifier for the cutoff time (for example, "Europe/Zurich"). List of identifiers. Required. */
  timezone?: string;
}

export const CutoffTime: Schema.Schema<CutoffTime> = Schema.suspend(() => Schema.Struct({
  hour: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
  timezone: Schema.optional(Schema.String),
})).annotate({ identifier: "CutoffTime" }) as any as Schema.Schema<CutoffTime>;

export interface TransitTableTransitTimeRowTransitTimeValue {
  /** Transit time range (min-max) in business days. 0 means same day delivery, 1 means next day delivery. */
  minTransitTimeInDays?: number;
  /** Must be greater than or equal to `minTransitTimeInDays`. */
  maxTransitTimeInDays?: number;
}

export const TransitTableTransitTimeRowTransitTimeValue: Schema.Schema<TransitTableTransitTimeRowTransitTimeValue> = Schema.suspend(() => Schema.Struct({
  minTransitTimeInDays: Schema.optional(Schema.Number),
  maxTransitTimeInDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "TransitTableTransitTimeRowTransitTimeValue" }) as any as Schema.Schema<TransitTableTransitTimeRowTransitTimeValue>;

export interface TransitTableTransitTimeRow {
  values?: Array<TransitTableTransitTimeRowTransitTimeValue>;
}

export const TransitTableTransitTimeRow: Schema.Schema<TransitTableTransitTimeRow> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(TransitTableTransitTimeRowTransitTimeValue)),
})).annotate({ identifier: "TransitTableTransitTimeRow" }) as any as Schema.Schema<TransitTableTransitTimeRow>;

export interface TransitTable {
  /** A list of postal group names. The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service. */
  postalCodeGroupNames?: Array<string>;
  /** A list of transit time labels. The last value can be `"all other labels"`. Example: `["food", "electronics", "all other labels"]`. */
  transitTimeLabels?: Array<string>;
  rows?: Array<TransitTableTransitTimeRow>;
}

export const TransitTable: Schema.Schema<TransitTable> = Schema.suspend(() => Schema.Struct({
  postalCodeGroupNames: Schema.optional(Schema.Array(Schema.String)),
  transitTimeLabels: Schema.optional(Schema.Array(Schema.String)),
  rows: Schema.optional(Schema.Array(TransitTableTransitTimeRow)),
})).annotate({ identifier: "TransitTable" }) as any as Schema.Schema<TransitTable>;

export interface BusinessDayConfig {
  /** Regular business days, such as '"monday"'. May not be empty. */
  businessDays?: Array<string>;
}

export const BusinessDayConfig: Schema.Schema<BusinessDayConfig> = Schema.suspend(() => Schema.Struct({
  businessDays: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BusinessDayConfig" }) as any as Schema.Schema<BusinessDayConfig>;

export interface WarehouseBasedDeliveryTime {
  /** Required. Carrier, such as `"UPS"` or `"Fedex"`. The list of supported carriers can be retrieved through the `listSupportedCarriers` method. */
  carrier?: string;
  /** Required. Carrier service, such as `"ground"` or `"2 days"`. The list of supported services for a carrier can be retrieved through the `listSupportedCarriers` method. The name of the service must be in the eddSupportedServices list. */
  carrierService?: string;
  /** The name of the warehouse. Warehouse name need to be matched with name. If warehouseName is set, the below fields will be ignored. The warehouse info will be read from warehouse. */
  warehouseName?: string;
  /** Shipping origin. */
  originPostalCode?: string;
  /** Shipping origin's street address. */
  originStreetAddress?: string;
  /** Shipping origin's city. */
  originCity?: string;
  /** Shipping origin's state. */
  originAdministrativeArea?: string;
  /** Shipping origin's country represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). */
  originCountry?: string;
}

export const WarehouseBasedDeliveryTime: Schema.Schema<WarehouseBasedDeliveryTime> = Schema.suspend(() => Schema.Struct({
  carrier: Schema.optional(Schema.String),
  carrierService: Schema.optional(Schema.String),
  warehouseName: Schema.optional(Schema.String),
  originPostalCode: Schema.optional(Schema.String),
  originStreetAddress: Schema.optional(Schema.String),
  originCity: Schema.optional(Schema.String),
  originAdministrativeArea: Schema.optional(Schema.String),
  originCountry: Schema.optional(Schema.String),
})).annotate({ identifier: "WarehouseBasedDeliveryTime" }) as any as Schema.Schema<WarehouseBasedDeliveryTime>;

export interface DeliveryTime {
  /** Minimum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Either `{min,max}TransitTimeInDays` or `transitTimeTable` must be set, but not both. */
  minTransitTimeInDays?: number;
  /** Maximum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Must be greater than or equal to `minTransitTimeInDays`. */
  maxTransitTimeInDays?: number;
  /** Holiday cutoff definitions. If configured, they specify order cutoff times for holiday-specific shipping. */
  holidayCutoffs?: Array<HolidayCutoff>;
  /** Business days cutoff time definition. If not configured, the cutoff time will be defaulted to 8AM PST. If local delivery, use Service.StoreConfig.CutoffConfig. */
  cutoffTime?: CutoffTime;
  /** Minimum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. */
  minHandlingTimeInDays?: number;
  /** Maximum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. Must be greater than or equal to `minHandlingTimeInDays`. */
  maxHandlingTimeInDays?: number;
  /** Transit time table, number of business days spent in transit based on row and column dimensions. Either `{min,max}TransitTimeInDays` or `transitTimeTable` can be set, but not both. */
  transitTimeTable?: TransitTable;
  /** The business days during which orders can be handled. If not provided, Monday to Friday business days will be assumed. */
  handlingBusinessDayConfig?: BusinessDayConfig;
  /** The business days during which orders can be in-transit. If not provided, Monday to Friday business days will be assumed. */
  transitBusinessDayConfig?: BusinessDayConfig;
  /** Indicates that the delivery time should be calculated per warehouse (shipping origin location) based on the settings of the selected carrier. When set, no other transit time related field in DeliveryTime should be set. */
  warehouseBasedDeliveryTimes?: Array<WarehouseBasedDeliveryTime>;
}

export const DeliveryTime: Schema.Schema<DeliveryTime> = Schema.suspend(() => Schema.Struct({
  minTransitTimeInDays: Schema.optional(Schema.Number),
  maxTransitTimeInDays: Schema.optional(Schema.Number),
  holidayCutoffs: Schema.optional(Schema.Array(HolidayCutoff)),
  cutoffTime: Schema.optional(CutoffTime),
  minHandlingTimeInDays: Schema.optional(Schema.Number),
  maxHandlingTimeInDays: Schema.optional(Schema.Number),
  transitTimeTable: Schema.optional(TransitTable),
  handlingBusinessDayConfig: Schema.optional(BusinessDayConfig),
  transitBusinessDayConfig: Schema.optional(BusinessDayConfig),
  warehouseBasedDeliveryTimes: Schema.optional(Schema.Array(WarehouseBasedDeliveryTime)),
})).annotate({ identifier: "DeliveryTime" }) as any as Schema.Schema<DeliveryTime>;

export interface Value {
  /** If true, then the product can't ship. Must be true when set, can only be set if all other fields are not set. */
  noShipping?: boolean;
  /** A flat rate. Can only be set if all other fields are not set. */
  flatRate?: Price;
  /** A percentage of the price represented as a number in decimal notation (for example, `"5.4"`). Can only be set if all other fields are not set. */
  pricePercentage?: string;
  /** The name of a carrier rate referring to a carrier rate defined in the same rate group. Can only be set if all other fields are not set. */
  carrierRateName?: string;
  /** The name of a subtable. Can only be set in table cells (not for single values), and only if all other fields are not set. */
  subtableName?: string;
}

export const Value: Schema.Schema<Value> = Schema.suspend(() => Schema.Struct({
  noShipping: Schema.optional(Schema.Boolean),
  flatRate: Schema.optional(Price),
  pricePercentage: Schema.optional(Schema.String),
  carrierRateName: Schema.optional(Schema.String),
  subtableName: Schema.optional(Schema.String),
})).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface Weight {
  /** Required. The weight represented as a number. The weight can have a maximum precision of four decimal places. */
  value?: string;
  /** Required. The weight unit. Acceptable values are: - "`kg`" - "`lb`" */
  unit?: string;
}

export const Weight: Schema.Schema<Weight> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "Weight" }) as any as Schema.Schema<Weight>;

export interface LocationIdSet {
  /** A non-empty list of location IDs. They must all be of the same location type (for example, state). */
  locationIds?: Array<string>;
}

export const LocationIdSet: Schema.Schema<LocationIdSet> = Schema.suspend(() => Schema.Struct({
  locationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LocationIdSet" }) as any as Schema.Schema<LocationIdSet>;

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

export const Headers: Schema.Schema<Headers> = Schema.suspend(() => Schema.Struct({
  prices: Schema.optional(Schema.Array(Price)),
  weights: Schema.optional(Schema.Array(Weight)),
  numberOfItems: Schema.optional(Schema.Array(Schema.String)),
  postalCodeGroupNames: Schema.optional(Schema.Array(Schema.String)),
  locations: Schema.optional(Schema.Array(LocationIdSet)),
})).annotate({ identifier: "Headers" }) as any as Schema.Schema<Headers>;

export interface Row {
  /** The list of cells that constitute the row. Must have the same length as `columnHeaders` for two-dimensional tables, a length of 1 for one-dimensional tables. Required. */
  cells?: Array<Value>;
}

export const Row: Schema.Schema<Row> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(Value)),
})).annotate({ identifier: "Row" }) as any as Schema.Schema<Row>;

export interface Table {
  /** Name of the table. Required for subtables, ignored for the main table. */
  name?: string;
  /** Headers of the table's rows. Required. */
  rowHeaders?: Headers;
  /** Headers of the table's columns. Optional: if not set then the table has only one dimension. */
  columnHeaders?: Headers;
  /** The list of rows that constitute the table. Must have the same length as `rowHeaders`. Required. */
  rows?: Array<Row>;
}

export const Table: Schema.Schema<Table> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  rowHeaders: Schema.optional(Headers),
  columnHeaders: Schema.optional(Headers),
  rows: Schema.optional(Schema.Array(Row)),
})).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface CarrierRate {
  /** Name of the carrier rate. Must be unique per rate group. Required. */
  name?: string;
  /** Carrier service, such as `"UPS"` or `"Fedex"`. The list of supported carriers can be retrieved through the `getSupportedCarriers` method. Required. */
  carrierName?: string;
  /** Carrier service, such as `"ground"` or `"2 days"`. The list of supported services for a carrier can be retrieved through the `getSupportedCarriers` method. Required. */
  carrierService?: string;
  /** Shipping origin for this carrier rate. Required. */
  originPostalCode?: string;
  /** Multiplicative shipping rate modifier as a number in decimal notation. Can be negative. For example `"5.4"` increases the rate by 5.4%, `"-3"` decreases the rate by 3%. Optional. */
  percentageAdjustment?: string;
  /** Additive shipping rate modifier. Can be negative. For example `{ "value": "1", "currency" : "USD" }` adds $1 to the rate, `{ "value": "-3", "currency" : "USD" }` removes $3 from the rate. Optional. */
  flatAdjustment?: Price;
}

export const CarrierRate: Schema.Schema<CarrierRate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  carrierName: Schema.optional(Schema.String),
  carrierService: Schema.optional(Schema.String),
  originPostalCode: Schema.optional(Schema.String),
  percentageAdjustment: Schema.optional(Schema.String),
  flatAdjustment: Schema.optional(Price),
})).annotate({ identifier: "CarrierRate" }) as any as Schema.Schema<CarrierRate>;

export interface RateGroup {
  /** A list of shipping labels defining the products to which this rate group applies to. This is a disjunction: only one of the labels has to match for the rate group to apply. May only be empty for the last rate group of a service. Required. */
  applicableShippingLabels?: Array<string>;
  /** The value of the rate group (for example, flat rate $10). Can only be set if `mainTable` and `subtables` are not set. */
  singleValue?: Value;
  /** A table defining the rate group, when `singleValue` is not expressive enough. Can only be set if `singleValue` is not set. */
  mainTable?: Table;
  /** A list of subtables referred to by `mainTable`. Can only be set if `mainTable` is set. */
  subtables?: Array<Table>;
  /** A list of carrier rates that can be referred to by `mainTable` or `singleValue`. */
  carrierRates?: Array<CarrierRate>;
  /** Name of the rate group. Optional. If set has to be unique within shipping service. */
  name?: string;
}

export const RateGroup: Schema.Schema<RateGroup> = Schema.suspend(() => Schema.Struct({
  applicableShippingLabels: Schema.optional(Schema.Array(Schema.String)),
  singleValue: Schema.optional(Value),
  mainTable: Schema.optional(Table),
  subtables: Schema.optional(Schema.Array(Table)),
  carrierRates: Schema.optional(Schema.Array(CarrierRate)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "RateGroup" }) as any as Schema.Schema<RateGroup>;

export interface PickupCarrierService {
  /** The name of the pickup carrier (for example, `"UPS"`). Required. */
  carrierName?: string;
  /** The name of the pickup service (for example, `"Access point"`). Required. */
  serviceName?: string;
}

export const PickupCarrierService: Schema.Schema<PickupCarrierService> = Schema.suspend(() => Schema.Struct({
  carrierName: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "PickupCarrierService" }) as any as Schema.Schema<PickupCarrierService>;

export interface MinimumOrderValueTableStoreCodeSetWithMov {
  /** A list of unique store codes or empty for the catch all. */
  storeCodes?: Array<string>;
  /** The minimum order value for the given stores. */
  value?: Price;
}

export const MinimumOrderValueTableStoreCodeSetWithMov: Schema.Schema<MinimumOrderValueTableStoreCodeSetWithMov> = Schema.suspend(() => Schema.Struct({
  storeCodes: Schema.optional(Schema.Array(Schema.String)),
  value: Schema.optional(Price),
})).annotate({ identifier: "MinimumOrderValueTableStoreCodeSetWithMov" }) as any as Schema.Schema<MinimumOrderValueTableStoreCodeSetWithMov>;

export interface MinimumOrderValueTable {
  storeCodeSetWithMovs?: Array<MinimumOrderValueTableStoreCodeSetWithMov>;
}

export const MinimumOrderValueTable: Schema.Schema<MinimumOrderValueTable> = Schema.suspend(() => Schema.Struct({
  storeCodeSetWithMovs: Schema.optional(Schema.Array(MinimumOrderValueTableStoreCodeSetWithMov)),
})).annotate({ identifier: "MinimumOrderValueTable" }) as any as Schema.Schema<MinimumOrderValueTable>;

export interface ServiceStoreConfigCutoffConfigLocalCutoffTime {
  /** Hour local delivery orders must be placed by to process the same day. */
  hour?: string;
  /** Minute local delivery orders must be placed by to process the same day. */
  minute?: string;
}

export const ServiceStoreConfigCutoffConfigLocalCutoffTime: Schema.Schema<ServiceStoreConfigCutoffConfigLocalCutoffTime> = Schema.suspend(() => Schema.Struct({
  hour: Schema.optional(Schema.String),
  minute: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceStoreConfigCutoffConfigLocalCutoffTime" }) as any as Schema.Schema<ServiceStoreConfigCutoffConfigLocalCutoffTime>;

export interface ServiceStoreConfigCutoffConfig {
  /** Time in hours and minutes in the local timezone when local delivery ends. */
  localCutoffTime?: ServiceStoreConfigCutoffConfigLocalCutoffTime;
  /** Represents cutoff time as the number of hours before store closing. Mutually exclusive with other fields (hour and minute). */
  storeCloseOffsetHours?: string;
  /** Merchants can opt-out of showing n+1 day local delivery when they have a shipping service configured to n day local delivery. For example, if the shipping service defines same-day delivery, and it's past the cut-off, setting this field to `true` results in the calculated shipping service rate returning `NO_DELIVERY_POST_CUTOFF`. In the same example, setting this field to `false` results in the calculated shipping time being one day. This is only for local delivery. */
  noDeliveryPostCutoff?: boolean;
}

export const ServiceStoreConfigCutoffConfig: Schema.Schema<ServiceStoreConfigCutoffConfig> = Schema.suspend(() => Schema.Struct({
  localCutoffTime: Schema.optional(ServiceStoreConfigCutoffConfigLocalCutoffTime),
  storeCloseOffsetHours: Schema.optional(Schema.String),
  noDeliveryPostCutoff: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ServiceStoreConfigCutoffConfig" }) as any as Schema.Schema<ServiceStoreConfigCutoffConfig>;

export interface Distance {
  /** The distance represented as a number. */
  value?: string;
  /** The distance unit. Acceptable values are `None`, `Miles`, and `Kilometers`. */
  unit?: string;
}

export const Distance: Schema.Schema<Distance> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "Distance" }) as any as Schema.Schema<Distance>;

export interface ServiceStoreConfig {
  /** Indicates whether all stores listed by this merchant provide local delivery or not. Acceptable values are `all stores` and `selected stores` */
  storeServiceType?: string;
  /** A list of store codes that provide local delivery. If empty, then `store_service_type` must be `all_stores`, or an error is thrown. If not empty, then `store_service_type` must be `selected_stores`, or an error is thrown. */
  storeCodes?: Array<string>;
  /** Time local delivery ends for the day. This can be either `local_cutoff_time` or `store_close_offset_hours`, if both are provided an error is thrown. */
  cutoffConfig?: ServiceStoreConfigCutoffConfig;
  /** Maximum delivery radius. Only needed for local delivery fulfillment type. */
  serviceRadius?: Distance;
}

export const ServiceStoreConfig: Schema.Schema<ServiceStoreConfig> = Schema.suspend(() => Schema.Struct({
  storeServiceType: Schema.optional(Schema.String),
  storeCodes: Schema.optional(Schema.Array(Schema.String)),
  cutoffConfig: Schema.optional(ServiceStoreConfigCutoffConfig),
  serviceRadius: Schema.optional(Distance),
})).annotate({ identifier: "ServiceStoreConfig" }) as any as Schema.Schema<ServiceStoreConfig>;

export interface Service {
  /** Free-form name of the service. Must be unique within target account. Required. */
  name?: string;
  /** The CLDR territory code of the country to which the service applies. Required. */
  deliveryCountry?: string;
  /** The CLDR code of the currency to which this service applies. Must match that of the prices in rate groups. */
  currency?: string;
  /** Time spent in various aspects from order to the delivery of the product. Required. */
  deliveryTime?: DeliveryTime;
  /** Shipping rate group definitions. Only the last one is allowed to have an empty `applicableShippingLabels`, which means "everything else". The other `applicableShippingLabels` must not overlap. */
  rateGroups?: Array<RateGroup>;
  /** A boolean exposing the active status of the shipping service. Required. */
  active?: boolean;
  /** Minimum order value for this service. If set, indicates that customers will have to spend at least this amount. All prices within a service must have the same currency. Cannot be set together with minimum_order_value_table. */
  minimumOrderValue?: Price;
  /** Eligibility for this service. Acceptable values are: - "`All scenarios`" - "`All scenarios except Shopping Actions`" - "`Shopping Actions`" */
  eligibility?: string;
  /** Type of locations this service ships orders to. Acceptable values are: - "`delivery`" - "`pickup` (deprecated)" - "`local_delivery`" - "`collection_point`" */
  shipmentType?: string;
  /** The carrier-service pair delivering items to collection points. The list of supported pickup services can be retrieved through the `getSupportedPickupServices` method. Required if and only if the service delivery type is `pickup`. */
  pickupService?: PickupCarrierService;
  /** Table of per store minimum order values for the pickup fulfillment type. Cannot be set together with minimum_order_value. */
  minimumOrderValueTable?: MinimumOrderValueTable;
  /** A list of stores your products are delivered from. This is only available for the local delivery shipment type. */
  storeConfig?: ServiceStoreConfig;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  deliveryCountry: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  deliveryTime: Schema.optional(DeliveryTime),
  rateGroups: Schema.optional(Schema.Array(RateGroup)),
  active: Schema.optional(Schema.Boolean),
  minimumOrderValue: Schema.optional(Price),
  eligibility: Schema.optional(Schema.String),
  shipmentType: Schema.optional(Schema.String),
  pickupService: Schema.optional(PickupCarrierService),
  minimumOrderValueTable: Schema.optional(MinimumOrderValueTable),
  storeConfig: Schema.optional(ServiceStoreConfig),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface PostalCodeRange {
  /** A postal code or a pattern of the form `prefix*` denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`. Required. */
  postalCodeRangeBegin?: string;
  /** A postal code or a pattern of the form `prefix*` denoting the inclusive upper bound of the range defining the area. It must have the same length as `postalCodeRangeBegin`: if `postalCodeRangeBegin` is a postal code then `postalCodeRangeEnd` must be a postal code too; if `postalCodeRangeBegin` is a pattern then `postalCodeRangeEnd` must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching `postalCodeRangeBegin`. */
  postalCodeRangeEnd?: string;
}

export const PostalCodeRange: Schema.Schema<PostalCodeRange> = Schema.suspend(() => Schema.Struct({
  postalCodeRangeBegin: Schema.optional(Schema.String),
  postalCodeRangeEnd: Schema.optional(Schema.String),
})).annotate({ identifier: "PostalCodeRange" }) as any as Schema.Schema<PostalCodeRange>;

export interface PostalCodeGroup {
  /** The name of the postal code group, referred to in headers. Required. */
  name?: string;
  /** The CLDR territory code of the country the postal code group applies to. Required. */
  country?: string;
  /** A range of postal codes. Required. */
  postalCodeRanges?: Array<PostalCodeRange>;
}

export const PostalCodeGroup: Schema.Schema<PostalCodeGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  postalCodeRanges: Schema.optional(Schema.Array(PostalCodeRange)),
})).annotate({ identifier: "PostalCodeGroup" }) as any as Schema.Schema<PostalCodeGroup>;

export interface Address {
  /** Street-level part of the address. Use `\n` to add a second line. */
  streetAddress?: string;
  /** Required. City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs). */
  city?: string;
  /** Required. Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC"). */
  administrativeArea?: string;
  /** Required. Postal code or ZIP (for example, "94043"). */
  postalCode?: string;
  /** Required. [CLDR country code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) (for example, "US"). */
  country?: string;
}

export const Address: Schema.Schema<Address> = Schema.suspend(() => Schema.Struct({
  streetAddress: Schema.optional(Schema.String),
  city: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
})).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface WarehouseCutoffTime {
  /** Required. Hour (24-hour clock) of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Hour is based on the timezone of warehouse. */
  hour?: number;
  /** Required. Minute of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Minute is based on the timezone of warehouse. */
  minute?: number;
}

export const WarehouseCutoffTime: Schema.Schema<WarehouseCutoffTime> = Schema.suspend(() => Schema.Struct({
  hour: Schema.optional(Schema.Number),
  minute: Schema.optional(Schema.Number),
})).annotate({ identifier: "WarehouseCutoffTime" }) as any as Schema.Schema<WarehouseCutoffTime>;

export interface Warehouse {
  /** Required. The name of the warehouse. Must be unique within account. */
  name?: string;
  /** Required. Shipping address of the warehouse. */
  shippingAddress?: Address;
  /** Required. The latest time of day that an order can be accepted and begin processing. Later orders will be processed in the next day. The time is based on the warehouse postal code. */
  cutoffTime?: WarehouseCutoffTime;
  /** Required. The number of days it takes for this warehouse to pack up and ship an item. This is on the warehouse level, but can be overridden on the offer level based on the attributes of an item. */
  handlingDays?: string;
  /** Business days of the warehouse. If not set, will be Monday to Friday by default. */
  businessDayConfig?: BusinessDayConfig;
}

export const Warehouse: Schema.Schema<Warehouse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  shippingAddress: Schema.optional(Address),
  cutoffTime: Schema.optional(WarehouseCutoffTime),
  handlingDays: Schema.optional(Schema.String),
  businessDayConfig: Schema.optional(BusinessDayConfig),
})).annotate({ identifier: "Warehouse" }) as any as Schema.Schema<Warehouse>;

export interface ShippingSettings {
  /** The ID of the account to which these account shipping settings belong. Ignored upon update, always present in get request responses. */
  accountId?: string;
  /** The target account's list of services. Optional. */
  services?: Array<Service>;
  /** A list of postal code groups that can be referred to in `services`. Optional. */
  postalCodeGroups?: Array<PostalCodeGroup>;
  /** Optional. A list of warehouses which can be referred to in `services`. */
  warehouses?: Array<Warehouse>;
}

export const ShippingSettings: Schema.Schema<ShippingSettings> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(Service)),
  postalCodeGroups: Schema.optional(Schema.Array(PostalCodeGroup)),
  warehouses: Schema.optional(Schema.Array(Warehouse)),
})).annotate({ identifier: "ShippingSettings" }) as any as Schema.Schema<ShippingSettings>;

export interface ShippingsettingsCustomBatchRequestEntry {
  /** An entry ID, unique within the batch request. */
  batchId?: number;
  /** The ID of the managing account. */
  merchantId?: string;
  /** The method of the batch entry. Acceptable values are: - "`get`" - "`update`" */
  method?: string;
  /** The ID of the account for which to get/update account shipping settings. */
  accountId?: string;
  /** The account shipping settings to update. Only defined if the method is `update`. */
  shippingSettings?: ShippingSettings;
}

export const ShippingsettingsCustomBatchRequestEntry: Schema.Schema<ShippingsettingsCustomBatchRequestEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  merchantId: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  shippingSettings: Schema.optional(ShippingSettings),
})).annotate({ identifier: "ShippingsettingsCustomBatchRequestEntry" }) as any as Schema.Schema<ShippingsettingsCustomBatchRequestEntry>;

export interface ShippingsettingsCustomBatchRequest {
  /** The request entries to be processed in the batch. */
  entries?: Array<ShippingsettingsCustomBatchRequestEntry>;
}

export const ShippingsettingsCustomBatchRequest: Schema.Schema<ShippingsettingsCustomBatchRequest> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(ShippingsettingsCustomBatchRequestEntry)),
})).annotate({ identifier: "ShippingsettingsCustomBatchRequest" }) as any as Schema.Schema<ShippingsettingsCustomBatchRequest>;

export interface ShippingsettingsCustomBatchResponseEntry {
  /** The ID of the request entry to which this entry responds. */
  batchId?: number;
  /** The retrieved or updated account shipping settings. */
  shippingSettings?: ShippingSettings;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsCustomBatchResponseEntry`" */
  kind?: string;
  /** A list of errors for failed custombatch entries. *Note:* Schema errors fail the whole request. */
  errors?: Errors;
}

export const ShippingsettingsCustomBatchResponseEntry: Schema.Schema<ShippingsettingsCustomBatchResponseEntry> = Schema.suspend(() => Schema.Struct({
  batchId: Schema.optional(Schema.Number),
  shippingSettings: Schema.optional(ShippingSettings),
  kind: Schema.optional(Schema.String),
  errors: Schema.optional(Errors),
})).annotate({ identifier: "ShippingsettingsCustomBatchResponseEntry" }) as any as Schema.Schema<ShippingsettingsCustomBatchResponseEntry>;

export interface ShippingsettingsCustomBatchResponse {
  /** The result of the execution of the batch requests. */
  entries?: Array<ShippingsettingsCustomBatchResponseEntry>;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsCustomBatchResponse`". */
  kind?: string;
}

export const ShippingsettingsCustomBatchResponse: Schema.Schema<ShippingsettingsCustomBatchResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(ShippingsettingsCustomBatchResponseEntry)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ShippingsettingsCustomBatchResponse" }) as any as Schema.Schema<ShippingsettingsCustomBatchResponse>;

export interface CarriersCarrier {
  /** The name of the carrier (for example, `"UPS"`). Always present. */
  name?: string;
  /** The CLDR country code of the carrier (for example, "US"). Always present. */
  country?: string;
  /** A list of supported services (for example, `"ground"`) for that carrier. Contains at least one service. This is the list of valid values for CarrierRate.carrierService. */
  services?: Array<string>;
  /** A list of services supported for EDD (Estimated Delivery Date) calculation. This is the list of valid values for WarehouseBasedDeliveryTime.carrierService. */
  eddServices?: Array<string>;
}

export const CarriersCarrier: Schema.Schema<CarriersCarrier> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(Schema.String)),
  eddServices: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CarriersCarrier" }) as any as Schema.Schema<CarriersCarrier>;

export interface ShippingsettingsGetSupportedCarriersResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsGetSupportedCarriersResponse`". */
  kind?: string;
  /** A list of supported carriers. May be empty. */
  carriers?: Array<CarriersCarrier>;
}

export const ShippingsettingsGetSupportedCarriersResponse: Schema.Schema<ShippingsettingsGetSupportedCarriersResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  carriers: Schema.optional(Schema.Array(CarriersCarrier)),
})).annotate({ identifier: "ShippingsettingsGetSupportedCarriersResponse" }) as any as Schema.Schema<ShippingsettingsGetSupportedCarriersResponse>;

export interface HolidaysHoliday {
  /** Unique identifier for the holiday to be used when configuring holiday cutoffs. Always present. */
  id?: string;
  /** The CLDR territory code of the country in which the holiday is available. For example, "US", "DE", "GB". A holiday cutoff can only be configured in a shipping settings service with matching delivery country. Always present. */
  countryCode?: string;
  /** The holiday type. Always present. Acceptable values are: - "`Christmas`" - "`Easter`" - "`Father's Day`" - "`Halloween`" - "`Independence Day (USA)`" - "`Mother's Day`" - "`Thanksgiving`" - "`Valentine's Day`" */
  type?: string;
  /** Date of the holiday, in ISO 8601 format. For example, "2016-12-25" for Christmas 2016. Always present. */
  date?: string;
  /** Date on which the order has to arrive at the customer's, in ISO 8601 format. For example, "2016-12-24" for 24th December 2016. Always present. */
  deliveryGuaranteeDate?: string;
  /** Hour of the day in the delivery location's timezone on the guaranteed delivery date by which the order has to arrive at the customer's. Possible values are: 0 (midnight), 1, ..., 12 (noon), 13, ..., 23. Always present. */
  deliveryGuaranteeHour?: string;
}

export const HolidaysHoliday: Schema.Schema<HolidaysHoliday> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  date: Schema.optional(Schema.String),
  deliveryGuaranteeDate: Schema.optional(Schema.String),
  deliveryGuaranteeHour: Schema.optional(Schema.String),
})).annotate({ identifier: "HolidaysHoliday" }) as any as Schema.Schema<HolidaysHoliday>;

export interface ShippingsettingsGetSupportedHolidaysResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsGetSupportedHolidaysResponse`". */
  kind?: string;
  /** A list of holidays applicable for delivery guarantees. May be empty. */
  holidays?: Array<HolidaysHoliday>;
}

export const ShippingsettingsGetSupportedHolidaysResponse: Schema.Schema<ShippingsettingsGetSupportedHolidaysResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  holidays: Schema.optional(Schema.Array(HolidaysHoliday)),
})).annotate({ identifier: "ShippingsettingsGetSupportedHolidaysResponse" }) as any as Schema.Schema<ShippingsettingsGetSupportedHolidaysResponse>;

export interface PickupServicesPickupService {
  /** The CLDR country code of the carrier (for example, "US"). Always present. */
  country?: string;
  /** The name of the carrier (for example, `"UPS"`). Always present. */
  carrierName?: string;
  /** The name of the pickup service (for example, `"Access point"`). Always present. */
  serviceName?: string;
}

export const PickupServicesPickupService: Schema.Schema<PickupServicesPickupService> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  carrierName: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "PickupServicesPickupService" }) as any as Schema.Schema<PickupServicesPickupService>;

export interface ShippingsettingsGetSupportedPickupServicesResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsGetSupportedPickupServicesResponse`". */
  kind?: string;
  /** A list of supported pickup services. May be empty. */
  pickupServices?: Array<PickupServicesPickupService>;
}

export const ShippingsettingsGetSupportedPickupServicesResponse: Schema.Schema<ShippingsettingsGetSupportedPickupServicesResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  pickupServices: Schema.optional(Schema.Array(PickupServicesPickupService)),
})).annotate({ identifier: "ShippingsettingsGetSupportedPickupServicesResponse" }) as any as Schema.Schema<ShippingsettingsGetSupportedPickupServicesResponse>;

export interface ShippingsettingsListResponse {
  /** The token for the retrieval of the next page of shipping settings. */
  nextPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "`content#shippingsettingsListResponse`". */
  kind?: string;
  resources?: Array<ShippingSettings>;
}

export const ShippingsettingsListResponse: Schema.Schema<ShippingsettingsListResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(ShippingSettings)),
})).annotate({ identifier: "ShippingsettingsListResponse" }) as any as Schema.Schema<ShippingsettingsListResponse>;

export interface AccountCredentials {
  /** Indicates to Google how Google should use these OAuth tokens. */
  purpose?: "ACCOUNT_CREDENTIALS_PURPOSE_UNSPECIFIED" | "SHOPIFY_ORDER_MANAGEMENT" | "SHOPIFY_INTEGRATION" | (string & {});
  /** An OAuth access token. */
  accessToken?: string;
  /** The amount of time, in seconds, after which the access token is no longer valid. */
  expiresIn?: string;
}

export const AccountCredentials: Schema.Schema<AccountCredentials> = Schema.suspend(() => Schema.Struct({
  purpose: Schema.optional(Schema.String),
  accessToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountCredentials" }) as any as Schema.Schema<AccountCredentials>;

export interface RequestPhoneVerificationRequest {
  /** Required. Two letter country code for the phone number, for example `CA` for Canadian numbers. See the [ISO 3166-1 alpha-2](https://wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) officially assigned codes. */
  phoneRegionCode?: string;
  /** Phone number to be verified. */
  phoneNumber?: string;
  /** Verification method to receive verification code. */
  phoneVerificationMethod?: "PHONE_VERIFICATION_METHOD_UNSPECIFIED" | "SMS" | "PHONE_CALL" | (string & {});
  /** Language code [IETF BCP 47 syntax](https://tools.ietf.org/html/bcp47) (for example, en-US). Language code is used to provide localized `SMS` and `PHONE_CALL`. Default language used is en-US if not provided. */
  languageCode?: string;
}

export const RequestPhoneVerificationRequest: Schema.Schema<RequestPhoneVerificationRequest> = Schema.suspend(() => Schema.Struct({
  phoneRegionCode: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  phoneVerificationMethod: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestPhoneVerificationRequest" }) as any as Schema.Schema<RequestPhoneVerificationRequest>;

export interface RequestPhoneVerificationResponse {
  /** The verification ID to use in subsequent calls to `verifyphonenumber`. */
  verificationId?: string;
}

export const RequestPhoneVerificationResponse: Schema.Schema<RequestPhoneVerificationResponse> = Schema.suspend(() => Schema.Struct({
  verificationId: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestPhoneVerificationResponse" }) as any as Schema.Schema<RequestPhoneVerificationResponse>;

export interface VerifyPhoneNumberRequest {
  /** The verification ID returned by `requestphoneverification`. */
  verificationId?: string;
  /** The verification code that was sent to the phone number for validation. */
  verificationCode?: string;
  /** Verification method used to receive verification code. */
  phoneVerificationMethod?: "PHONE_VERIFICATION_METHOD_UNSPECIFIED" | "SMS" | "PHONE_CALL" | (string & {});
}

export const VerifyPhoneNumberRequest: Schema.Schema<VerifyPhoneNumberRequest> = Schema.suspend(() => Schema.Struct({
  verificationId: Schema.optional(Schema.String),
  verificationCode: Schema.optional(Schema.String),
  phoneVerificationMethod: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyPhoneNumberRequest" }) as any as Schema.Schema<VerifyPhoneNumberRequest>;

export interface VerifyPhoneNumberResponse {
  /** Verified phone number if verification is successful. This phone number can only be replaced by another verified phone number. */
  verifiedPhoneNumber?: string;
}

export const VerifyPhoneNumberResponse: Schema.Schema<VerifyPhoneNumberResponse> = Schema.suspend(() => Schema.Struct({
  verifiedPhoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyPhoneNumberResponse" }) as any as Schema.Schema<VerifyPhoneNumberResponse>;

export interface AccountLabel {
  /** Output only. The ID of the label. */
  labelId?: string;
  /** Immutable. The ID of account this label belongs to. */
  accountId?: string;
  /** The display name of this label. */
  name?: string;
  /** The description of this label. */
  description?: string;
  /** Output only. The type of this label. */
  labelType?: "LABEL_TYPE_UNSPECIFIED" | "MANUAL" | "AUTOMATIC" | (string & {});
}

export const AccountLabel: Schema.Schema<AccountLabel> = Schema.suspend(() => Schema.Struct({
  labelId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labelType: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountLabel" }) as any as Schema.Schema<AccountLabel>;

export interface ListAccountLabelsResponse {
  /** The labels from the specified account. */
  accountLabels?: Array<AccountLabel>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountLabelsResponse: Schema.Schema<ListAccountLabelsResponse> = Schema.suspend(() => Schema.Struct({
  accountLabels: Schema.optional(Schema.Array(AccountLabel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccountLabelsResponse" }) as any as Schema.Schema<ListAccountLabelsResponse>;

export interface CollectionFeaturedProduct {
  /** The unique identifier for the product item. */
  offerId?: string;
  /** Required. X-coordinate of the product callout on the Shoppable Image. */
  x?: number;
  /** Required. Y-coordinate of the product callout on the Shoppable Image. */
  y?: number;
}

export const CollectionFeaturedProduct: Schema.Schema<CollectionFeaturedProduct> = Schema.suspend(() => Schema.Struct({
  offerId: Schema.optional(Schema.String),
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "CollectionFeaturedProduct" }) as any as Schema.Schema<CollectionFeaturedProduct>;

export interface Collection {
  /** Required. The REST ID of the collection. Content API methods that operate on collections take this as their collectionId parameter. The REST ID for a collection is of the form collectionId. [id attribute](https://support.google.com/merchants/answer/9649290) */
  id?: string;
  /** The language of a collection and the language of any featured products linked to the collection. [language attribute](https://support.google.com/merchants/answer/9673781) */
  language?: string;
  /** [product_country attribute](https://support.google.com/merchants/answer/9674155) */
  productCountry?: string;
  /** The URL of a collection’s image. [image_link attribute](https://support.google.com/merchants/answer/9703236) */
  imageLink?: Array<string>;
  /** This identifies one or more products associated with the collection. Used as a lookup to the corresponding product ID in your product feeds. Provide a maximum of 100 featuredProduct (for collections). Provide up to 10 featuredProduct (for Shoppable Images only) with ID and X and Y coordinates. [featured_product attribute](https://support.google.com/merchants/answer/9703736) */
  featuredProduct?: Array<CollectionFeaturedProduct>;
  /** A collection’s landing page. URL directly linking to your collection's page on your website. [link attribute](https://support.google.com/merchants/answer/9673983) */
  link?: string;
  /** A collection’s mobile-optimized landing page when you have a different URL for mobile and desktop traffic. [mobile_link attribute](https://support.google.com/merchants/answer/9646123) */
  mobileLink?: string;
  /** Your collection's name. [headline attribute](https://support.google.com/merchants/answer/9673580) */
  headline?: Array<string>;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. [Custom label](https://support.google.com/merchants/answer/9674217) */
  customLabel0?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel1?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel2?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel3?: string;
  /** Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. */
  customLabel4?: string;
}

export const Collection: Schema.Schema<Collection> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  productCountry: Schema.optional(Schema.String),
  imageLink: Schema.optional(Schema.Array(Schema.String)),
  featuredProduct: Schema.optional(Schema.Array(CollectionFeaturedProduct)),
  link: Schema.optional(Schema.String),
  mobileLink: Schema.optional(Schema.String),
  headline: Schema.optional(Schema.Array(Schema.String)),
  customLabel0: Schema.optional(Schema.String),
  customLabel1: Schema.optional(Schema.String),
  customLabel2: Schema.optional(Schema.String),
  customLabel3: Schema.optional(Schema.String),
  customLabel4: Schema.optional(Schema.String),
})).annotate({ identifier: "Collection" }) as any as Schema.Schema<Collection>;

export interface ListCollectionsResponse {
  /** The collections listed. */
  resources?: Array<Collection>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCollectionsResponse: Schema.Schema<ListCollectionsResponse> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Collection)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCollectionsResponse" }) as any as Schema.Schema<ListCollectionsResponse>;

export interface MethodQuota {
  /** Output only. The method name, for example `products.list`. Method name does not contain version because quota can be shared between different API versions of the same method. */
  method?: string;
  /** Output only. The current quota usage, meaning the number of calls already made to the method per day. Usage is reset every day at 12 PM midday UTC. */
  quotaUsage?: string;
  /** Output only. The maximum number of calls allowed per day for the method. */
  quotaLimit?: string;
  /** Output only. The maximum number of calls allowed per minute for the method. */
  quotaMinuteLimit?: string;
}

export const MethodQuota: Schema.Schema<MethodQuota> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  quotaUsage: Schema.optional(Schema.String),
  quotaLimit: Schema.optional(Schema.String),
  quotaMinuteLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "MethodQuota" }) as any as Schema.Schema<MethodQuota>;

export interface ListMethodQuotasResponse {
  /** The current quota usage and limits per each method. */
  methodQuotas?: Array<MethodQuota>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMethodQuotasResponse: Schema.Schema<ListMethodQuotasResponse> = Schema.suspend(() => Schema.Struct({
  methodQuotas: Schema.optional(Schema.Array(MethodQuota)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMethodQuotasResponse" }) as any as Schema.Schema<ListMethodQuotasResponse>;

export interface CollectionStatusDestinationStatus {
  /** The name of the destination */
  destination?: string;
  /** The status for the specified destination in the collections target country. */
  status?: string;
  /** Country codes (ISO 3166-1 alpha-2) where the collection is approved. */
  approvedCountries?: Array<string>;
  /** Country codes (ISO 3166-1 alpha-2) where the collection is pending approval. */
  pendingCountries?: Array<string>;
  /** Country codes (ISO 3166-1 alpha-2) where the collection is disapproved. */
  disapprovedCountries?: Array<string>;
}

export const CollectionStatusDestinationStatus: Schema.Schema<CollectionStatusDestinationStatus> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  approvedCountries: Schema.optional(Schema.Array(Schema.String)),
  pendingCountries: Schema.optional(Schema.Array(Schema.String)),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CollectionStatusDestinationStatus" }) as any as Schema.Schema<CollectionStatusDestinationStatus>;

export interface CollectionStatusItemLevelIssue {
  /** The error code of the issue. */
  code?: string;
  /** How this issue affects the serving of the collection. */
  servability?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attributeName?: string;
  /** The destination the issue applies to. */
  destination?: string;
  /** A short issue description in English. */
  description?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** Country codes (ISO 3166-1 alpha-2) where issue applies to the offer. */
  applicableCountries?: Array<string>;
}

export const CollectionStatusItemLevelIssue: Schema.Schema<CollectionStatusItemLevelIssue> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  servability: Schema.optional(Schema.String),
  resolution: Schema.optional(Schema.String),
  attributeName: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  applicableCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CollectionStatusItemLevelIssue" }) as any as Schema.Schema<CollectionStatusItemLevelIssue>;

export interface CollectionStatus {
  /** Required. The ID of the collection for which status is reported. */
  id?: string;
  /** The intended destinations for the collection. */
  destinationStatuses?: Array<CollectionStatusDestinationStatus>;
  /** Date on which the collection has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  creationDate?: string;
  /** Date on which the collection has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  lastUpdateDate?: string;
  /** A list of all issues associated with the collection. */
  collectionLevelIssuses?: Array<CollectionStatusItemLevelIssue>;
}

export const CollectionStatus: Schema.Schema<CollectionStatus> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  destinationStatuses: Schema.optional(Schema.Array(CollectionStatusDestinationStatus)),
  creationDate: Schema.optional(Schema.String),
  lastUpdateDate: Schema.optional(Schema.String),
  collectionLevelIssuses: Schema.optional(Schema.Array(CollectionStatusItemLevelIssue)),
})).annotate({ identifier: "CollectionStatus" }) as any as Schema.Schema<CollectionStatus>;

export interface ListCollectionStatusesResponse {
  /** The collectionstatuses listed. */
  resources?: Array<CollectionStatus>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCollectionStatusesResponse: Schema.Schema<ListCollectionStatusesResponse> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(CollectionStatus)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCollectionStatusesResponse" }) as any as Schema.Schema<ListCollectionStatusesResponse>;

export interface AttributionSettingsConversionType {
  /** Output only. Conversion event name, as it'll be reported by the client. */
  name?: string;
  /** Output only. Option indicating if the type should be included in Merchant Center reporting. */
  includeInReporting?: boolean;
}

export const AttributionSettingsConversionType: Schema.Schema<AttributionSettingsConversionType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  includeInReporting: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AttributionSettingsConversionType" }) as any as Schema.Schema<AttributionSettingsConversionType>;

export interface AttributionSettings {
  /** Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40. */
  attributionLookbackWindowInDays?: number;
  attributionModel?: "ATTRIBUTION_MODEL_UNSPECIFIED" | "CROSS_CHANNEL_LAST_CLICK" | "ADS_PREFERRED_LAST_CLICK" | "CROSS_CHANNEL_DATA_DRIVEN" | "CROSS_CHANNEL_FIRST_CLICK" | "CROSS_CHANNEL_LINEAR" | "CROSS_CHANNEL_POSITION_BASED" | "CROSS_CHANNEL_TIME_DECAY" | (string & {});
  /** Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time. */
  conversionType?: Array<AttributionSettingsConversionType>;
}

export const AttributionSettings: Schema.Schema<AttributionSettings> = Schema.suspend(() => Schema.Struct({
  attributionLookbackWindowInDays: Schema.optional(Schema.Number),
  attributionModel: Schema.optional(Schema.String),
  conversionType: Schema.optional(Schema.Array(AttributionSettingsConversionType)),
})).annotate({ identifier: "AttributionSettings" }) as any as Schema.Schema<AttributionSettings>;

export interface GoogleAnalyticsLink {
  /** Required. Immutable. ID of the Google Analytics property the merchant is linked to. */
  propertyId?: string;
  /** Output only. Attribution settings for the linked Google Analytics property. */
  attributionSettings?: AttributionSettings;
  /** Output only. Name of the Google Analytics property the merchant is linked to. */
  propertyName?: string;
}

export const GoogleAnalyticsLink: Schema.Schema<GoogleAnalyticsLink> = Schema.suspend(() => Schema.Struct({
  propertyId: Schema.optional(Schema.String),
  attributionSettings: Schema.optional(AttributionSettings),
  propertyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAnalyticsLink" }) as any as Schema.Schema<GoogleAnalyticsLink>;

export interface MerchantCenterDestination {
  /** Output only. Merchant Center Destination ID. */
  destinationId?: string;
  /** Required. Attribution settings being used for the Merchant Center Destination. */
  attributionSettings?: AttributionSettings;
  /** Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. Limited to 64 characters. */
  displayName?: string;
  /** Required. Three-letter currency code (ISO 4217). The currency code defines in which currency the conversions sent to this destination will be reported in Merchant Center. */
  currencyCode?: string;
}

export const MerchantCenterDestination: Schema.Schema<MerchantCenterDestination> = Schema.suspend(() => Schema.Struct({
  destinationId: Schema.optional(Schema.String),
  attributionSettings: Schema.optional(AttributionSettings),
  displayName: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "MerchantCenterDestination" }) as any as Schema.Schema<MerchantCenterDestination>;

export interface ConversionSource {
  /** Output only. Generated by the Content API upon creation of a new `ConversionSource`. Format: [a-z]{4}:.+ The four characters before the colon represent the type of conversio source. Content after the colon represents the ID of the conversion source within that type. The ID of two different conversion sources might be the same across different types. The following type prefixes are supported: - galk: For GoogleAnalyticsLink sources. - mcdn: For MerchantCenterDestination sources. */
  conversionSourceId?: string;
  /** Immutable. Conversion Source of type "Link to Google Analytics Property". */
  googleAnalyticsLink?: GoogleAnalyticsLink;
  /** Conversion Source of type "Merchant Center Tag Destination". */
  merchantCenterDestination?: MerchantCenterDestination;
  /** Output only. Current state of this conversion source. Can't be edited through the API. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PENDING" | (string & {});
  /** Output only. The time when an archived conversion source becomes permanently deleted and is no longer available to undelete. */
  expireTime?: string;
}

export const ConversionSource: Schema.Schema<ConversionSource> = Schema.suspend(() => Schema.Struct({
  conversionSourceId: Schema.optional(Schema.String),
  googleAnalyticsLink: Schema.optional(GoogleAnalyticsLink),
  merchantCenterDestination: Schema.optional(MerchantCenterDestination),
  state: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ConversionSource" }) as any as Schema.Schema<ConversionSource>;

export interface UndeleteConversionSourceRequest {
}

export const UndeleteConversionSourceRequest: Schema.Schema<UndeleteConversionSourceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteConversionSourceRequest" }) as any as Schema.Schema<UndeleteConversionSourceRequest>;

export interface ListConversionSourcesResponse {
  /** List of conversion sources. */
  conversionSources?: Array<ConversionSource>;
  /** Token to be used to fetch the next results page. */
  nextPageToken?: string;
}

export const ListConversionSourcesResponse: Schema.Schema<ListConversionSourcesResponse> = Schema.suspend(() => Schema.Struct({
  conversionSources: Schema.optional(Schema.Array(ConversionSource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConversionSourcesResponse" }) as any as Schema.Schema<ListConversionSourcesResponse>;

export interface FreeListingsProgramStatusReviewIneligibilityReasonDetails {
  /** This timestamp represents end of cooldown period for review ineligbility reason `IN_COOLDOWN_PERIOD`. */
  cooldownTime?: string;
}

export const FreeListingsProgramStatusReviewIneligibilityReasonDetails: Schema.Schema<FreeListingsProgramStatusReviewIneligibilityReasonDetails> = Schema.suspend(() => Schema.Struct({
  cooldownTime: Schema.optional(Schema.String),
})).annotate({ identifier: "FreeListingsProgramStatusReviewIneligibilityReasonDetails" }) as any as Schema.Schema<FreeListingsProgramStatusReviewIneligibilityReasonDetails>;

export interface FreeListingsProgramStatusRegionStatus {
  /** The two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for all the regions with the same `eligibilityStatus` and `reviewEligibility`. */
  regionCodes?: Array<string>;
  /** Eligibility status of the standard free listing program. */
  eligibilityStatus?: "STATE_UNSPECIFIED" | "APPROVED" | "DISAPPROVED" | "WARNING" | "UNDER_REVIEW" | "PENDING_REVIEW" | "ONBOARDING" | (string & {});
  /** Date by which eligibilityStatus will go from `WARNING` to `DISAPPROVED`. Only visible when your eligibilityStatus is WARNING. In [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DD`. */
  disapprovalDate?: string;
  /** If a program is eligible for review in a specific region. Only visible if `eligibilityStatus` is `DISAPPROVED`. */
  reviewEligibilityStatus?: "REVIEW_ELIGIBILITY_UNSPECIFIED" | "ELIGIBLE" | "INELIGIBLE" | (string & {});
  /** Review ineligibility reason if account is not eligible for review. */
  reviewIneligibilityReason?: "REVIEW_INELIGIBILITY_REASON_UNSPECIFIED" | "ONBOARDING_ISSUES" | "NOT_ENOUGH_OFFERS" | "IN_COOLDOWN_PERIOD" | "ALREADY_UNDER_REVIEW" | "NO_REVIEW_REQUIRED" | "WILL_BE_REVIEWED_AUTOMATICALLY" | "IS_RETIRED" | "ALREADY_REVIEWED" | (string & {});
  /** Reason a program in a specific region isn’t eligible for review. Only visible if `reviewEligibilityStatus` is `INELIGIBLE`. */
  reviewIneligibilityReasonDescription?: string;
  /** Issues evaluated in the review process. Fix all issues before requesting a review. */
  reviewIssues?: Array<string>;
  /** Issues that must be fixed to be eligible for review. */
  onboardingIssues?: Array<string>;
  /** Additional information for ineligibility. If `reviewIneligibilityReason` is `IN_COOLDOWN_PERIOD`, a timestamp for the end of the cooldown period is provided. */
  reviewIneligibilityReasonDetails?: FreeListingsProgramStatusReviewIneligibilityReasonDetails;
}

export const FreeListingsProgramStatusRegionStatus: Schema.Schema<FreeListingsProgramStatusRegionStatus> = Schema.suspend(() => Schema.Struct({
  regionCodes: Schema.optional(Schema.Array(Schema.String)),
  eligibilityStatus: Schema.optional(Schema.String),
  disapprovalDate: Schema.optional(Schema.String),
  reviewEligibilityStatus: Schema.optional(Schema.String),
  reviewIneligibilityReason: Schema.optional(Schema.String),
  reviewIneligibilityReasonDescription: Schema.optional(Schema.String),
  reviewIssues: Schema.optional(Schema.Array(Schema.String)),
  onboardingIssues: Schema.optional(Schema.Array(Schema.String)),
  reviewIneligibilityReasonDetails: Schema.optional(FreeListingsProgramStatusReviewIneligibilityReasonDetails),
})).annotate({ identifier: "FreeListingsProgramStatusRegionStatus" }) as any as Schema.Schema<FreeListingsProgramStatusRegionStatus>;

export interface FreeListingsProgramStatus {
  /** State of the program. `ENABLED` if there are offers for at least one region. */
  globalState?: "PROGRAM_STATE_UNSPECIFIED" | "NOT_ENABLED" | "NO_OFFERS_UPLOADED" | "ENABLED" | (string & {});
  /** Status of the program in each region. Regions with the same status and review eligibility are grouped together in `regionCodes`. */
  regionStatuses?: Array<FreeListingsProgramStatusRegionStatus>;
}

export const FreeListingsProgramStatus: Schema.Schema<FreeListingsProgramStatus> = Schema.suspend(() => Schema.Struct({
  globalState: Schema.optional(Schema.String),
  regionStatuses: Schema.optional(Schema.Array(FreeListingsProgramStatusRegionStatus)),
})).annotate({ identifier: "FreeListingsProgramStatus" }) as any as Schema.Schema<FreeListingsProgramStatus>;

export interface UrlSettings {
  /** URL template when the placeholders are expanded will redirect the buyer to the merchant checkout page with the item in the cart. */
  checkoutUriTemplate?: string;
  /** URL template when the placeholders are expanded will redirect the buyer to the cart page on the merchant website with the selected item in cart. */
  cartUriTemplate?: string;
}

export const UrlSettings: Schema.Schema<UrlSettings> = Schema.suspend(() => Schema.Struct({
  checkoutUriTemplate: Schema.optional(Schema.String),
  cartUriTemplate: Schema.optional(Schema.String),
})).annotate({ identifier: "UrlSettings" }) as any as Schema.Schema<UrlSettings>;

export interface CheckoutSettings {
  /** Required. The ID of the account. */
  merchantId?: string;
  /** URL settings for cart or checkout URL. */
  uriSettings?: UrlSettings;
  /** Output only. Reflects the merchant enrollment state in `Checkout` feature. */
  enrollmentState?: "CHECKOUT_ON_MERCHANT_ENROLLMENT_STATE_UNSPECIFIED" | "INACTIVE" | "ENROLLED" | "OPT_OUT" | (string & {});
  /** Output only. Reflects the merchant review state in `Checkout` feature. This is set based on the data quality reviews of the URL provided by the merchant. A merchant with enrollment state as `ENROLLED` can be in the following review states: `IN_REVIEW`, `APPROVED` or `DISAPPROVED`. A merchant must be in an enrollment_state of `ENROLLED` before a review can begin for the merchant. */
  reviewState?: "CHECKOUT_ON_MERCHANT_REVIEW_STATE_UNSPECIFIED" | "IN_REVIEW" | "APPROVED" | "DISAPPROVED" | (string & {});
  /** The effective value of `url_settings` for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account. */
  effectiveUriSettings?: UrlSettings;
  /** Output only. The effective value of enrollment state for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account. */
  effectiveEnrollmentState?: "CHECKOUT_ON_MERCHANT_ENROLLMENT_STATE_UNSPECIFIED" | "INACTIVE" | "ENROLLED" | "OPT_OUT" | (string & {});
  /** Output only. The effective value of review state for a given merchant ID. If account level settings are present then this value will be a copy of the account level settings. Otherwise, it will have the value of the parent account. */
  effectiveReviewState?: "CHECKOUT_ON_MERCHANT_REVIEW_STATE_UNSPECIFIED" | "IN_REVIEW" | "APPROVED" | "DISAPPROVED" | (string & {});
}

export const CheckoutSettings: Schema.Schema<CheckoutSettings> = Schema.suspend(() => Schema.Struct({
  merchantId: Schema.optional(Schema.String),
  uriSettings: Schema.optional(UrlSettings),
  enrollmentState: Schema.optional(Schema.String),
  reviewState: Schema.optional(Schema.String),
  effectiveUriSettings: Schema.optional(UrlSettings),
  effectiveEnrollmentState: Schema.optional(Schema.String),
  effectiveReviewState: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckoutSettings" }) as any as Schema.Schema<CheckoutSettings>;

export interface InsertCheckoutSettingsRequest {
  /** Required. The `UrlSettings` for the request. The presence of URL settings indicates `Checkout` enrollment. */
  uriSettings?: UrlSettings;
}

export const InsertCheckoutSettingsRequest: Schema.Schema<InsertCheckoutSettingsRequest> = Schema.suspend(() => Schema.Struct({
  uriSettings: Schema.optional(UrlSettings),
})).annotate({ identifier: "InsertCheckoutSettingsRequest" }) as any as Schema.Schema<InsertCheckoutSettingsRequest>;

export interface RequestReviewFreeListingsRequest {
  /** The code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country for which review is to be requested. */
  regionCode?: string;
}

export const RequestReviewFreeListingsRequest: Schema.Schema<RequestReviewFreeListingsRequest> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestReviewFreeListingsRequest" }) as any as Schema.Schema<RequestReviewFreeListingsRequest>;

export interface ShoppingAdsProgramStatusReviewIneligibilityReasonDetails {
  /** This timestamp represents end of cooldown period for review ineligbility reason `IN_COOLDOWN_PERIOD`. */
  cooldownTime?: string;
}

export const ShoppingAdsProgramStatusReviewIneligibilityReasonDetails: Schema.Schema<ShoppingAdsProgramStatusReviewIneligibilityReasonDetails> = Schema.suspend(() => Schema.Struct({
  cooldownTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ShoppingAdsProgramStatusReviewIneligibilityReasonDetails" }) as any as Schema.Schema<ShoppingAdsProgramStatusReviewIneligibilityReasonDetails>;

export interface ShoppingAdsProgramStatusRegionStatus {
  /** The two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for all the regions with the same `eligibilityStatus` and `reviewEligibility`. */
  regionCodes?: Array<string>;
  /** Eligibility status of the Shopping Ads program. */
  eligibilityStatus?: "STATE_UNSPECIFIED" | "APPROVED" | "DISAPPROVED" | "WARNING" | "UNDER_REVIEW" | "PENDING_REVIEW" | "ONBOARDING" | (string & {});
  /** Date by which eligibilityStatus will go from `WARNING` to `DISAPPROVED`. Only visible when your eligibilityStatus is WARNING. In [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DD`. */
  disapprovalDate?: string;
  /** If a program is eligible for review in a specific region. Only visible if `eligibilityStatus` is `DISAPPROVED`. */
  reviewEligibilityStatus?: "REVIEW_ELIGIBILITY_UNSPECIFIED" | "ELIGIBLE" | "INELIGIBLE" | (string & {});
  /** Review ineligibility reason if account is not eligible for review. */
  reviewIneligibilityReason?: "REVIEW_INELIGIBILITY_REASON_UNSPECIFIED" | "ONBOARDING_ISSUES" | "NOT_ENOUGH_OFFERS" | "IN_COOLDOWN_PERIOD" | "ALREADY_UNDER_REVIEW" | "NO_REVIEW_REQUIRED" | "WILL_BE_REVIEWED_AUTOMATICALLY" | "IS_RETIRED" | "ALREADY_REVIEWED" | (string & {});
  /** Reason a program in a specific region isn’t eligible for review. Only visible if `reviewEligibilityStatus` is `INELIGIBLE`. */
  reviewIneligibilityReasonDescription?: string;
  /** Issues evaluated in the review process. Fix all issues before requesting a review. */
  reviewIssues?: Array<string>;
  /** Issues that must be fixed to be eligible for review. */
  onboardingIssues?: Array<string>;
  /** Additional information for ineligibility. If `reviewIneligibilityReason` is `IN_COOLDOWN_PERIOD`, a timestamp for the end of the cooldown period is provided. */
  reviewIneligibilityReasonDetails?: ShoppingAdsProgramStatusReviewIneligibilityReasonDetails;
}

export const ShoppingAdsProgramStatusRegionStatus: Schema.Schema<ShoppingAdsProgramStatusRegionStatus> = Schema.suspend(() => Schema.Struct({
  regionCodes: Schema.optional(Schema.Array(Schema.String)),
  eligibilityStatus: Schema.optional(Schema.String),
  disapprovalDate: Schema.optional(Schema.String),
  reviewEligibilityStatus: Schema.optional(Schema.String),
  reviewIneligibilityReason: Schema.optional(Schema.String),
  reviewIneligibilityReasonDescription: Schema.optional(Schema.String),
  reviewIssues: Schema.optional(Schema.Array(Schema.String)),
  onboardingIssues: Schema.optional(Schema.Array(Schema.String)),
  reviewIneligibilityReasonDetails: Schema.optional(ShoppingAdsProgramStatusReviewIneligibilityReasonDetails),
})).annotate({ identifier: "ShoppingAdsProgramStatusRegionStatus" }) as any as Schema.Schema<ShoppingAdsProgramStatusRegionStatus>;

export interface ShoppingAdsProgramStatus {
  /** State of the program. `ENABLED` if there are offers for at least one region. */
  globalState?: "PROGRAM_STATE_UNSPECIFIED" | "NOT_ENABLED" | "NO_OFFERS_UPLOADED" | "ENABLED" | (string & {});
  /** Status of the program in each region. Regions with the same status and review eligibility are grouped together in `regionCodes`. */
  regionStatuses?: Array<ShoppingAdsProgramStatusRegionStatus>;
}

export const ShoppingAdsProgramStatus: Schema.Schema<ShoppingAdsProgramStatus> = Schema.suspend(() => Schema.Struct({
  globalState: Schema.optional(Schema.String),
  regionStatuses: Schema.optional(Schema.Array(ShoppingAdsProgramStatusRegionStatus)),
})).annotate({ identifier: "ShoppingAdsProgramStatus" }) as any as Schema.Schema<ShoppingAdsProgramStatus>;

export interface RequestReviewShoppingAdsRequest {
  /** The code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country for which review is to be requested. */
  regionCode?: string;
}

export const RequestReviewShoppingAdsRequest: Schema.Schema<RequestReviewShoppingAdsRequest> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestReviewShoppingAdsRequest" }) as any as Schema.Schema<RequestReviewShoppingAdsRequest>;

export interface Css {
  /** Output only. Immutable. The CSS domain ID. */
  cssDomainId?: string;
  /** Output only. Immutable. The CSS domain's full name. */
  fullName?: string;
  /** Output only. Immutable. The CSS domain's display name, used when space is constrained. */
  displayName?: string;
  /** Output only. Immutable. The CSS domain's homepage. */
  homepageUri?: string;
  /** Output only. Immutable. The ID of the CSS group this CSS domain is affiliated with. Only populated for CSS group users. */
  cssGroupId?: string;
  /** A list of label IDs that are assigned to this CSS domain by its CSS group. Only populated for CSS group users. */
  labelIds?: Array<string>;
}

export const Css: Schema.Schema<Css> = Schema.suspend(() => Schema.Struct({
  cssDomainId: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  homepageUri: Schema.optional(Schema.String),
  cssGroupId: Schema.optional(Schema.String),
  labelIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Css" }) as any as Schema.Schema<Css>;

export interface ListCssesResponse {
  /** The CSS domains affiliated with the specified CSS group. */
  csses?: Array<Css>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCssesResponse: Schema.Schema<ListCssesResponse> = Schema.suspend(() => Schema.Struct({
  csses: Schema.optional(Schema.Array(Css)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCssesResponse" }) as any as Schema.Schema<ListCssesResponse>;

export interface LabelIds {
  /** The list of label IDs. */
  labelIds?: Array<string>;
}

export const LabelIds: Schema.Schema<LabelIds> = Schema.suspend(() => Schema.Struct({
  labelIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "LabelIds" }) as any as Schema.Schema<LabelIds>;

export interface AccountReturnCarrier {
  /** Output only. Immutable. The Google-provided unique carrier ID, used to update the resource. */
  carrierAccountId?: string;
  /** Number of the carrier account. */
  carrierAccountNumber?: string;
  /** Name of the carrier account. */
  carrierAccountName?: string;
  /** The carrier code enum. Accepts the values FEDEX or UPS. */
  carrierCode?: "CARRIER_CODE_UNSPECIFIED" | "FEDEX" | "UPS" | (string & {});
}

export const AccountReturnCarrier: Schema.Schema<AccountReturnCarrier> = Schema.suspend(() => Schema.Struct({
  carrierAccountId: Schema.optional(Schema.String),
  carrierAccountNumber: Schema.optional(Schema.String),
  carrierAccountName: Schema.optional(Schema.String),
  carrierCode: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountReturnCarrier" }) as any as Schema.Schema<AccountReturnCarrier>;

export interface ListAccountReturnCarrierResponse {
  /** List of all available account return carriers for the merchant. */
  accountReturnCarriers?: Array<AccountReturnCarrier>;
}

export const ListAccountReturnCarrierResponse: Schema.Schema<ListAccountReturnCarrierResponse> = Schema.suspend(() => Schema.Struct({
  accountReturnCarriers: Schema.optional(Schema.Array(AccountReturnCarrier)),
})).annotate({ identifier: "ListAccountReturnCarrierResponse" }) as any as Schema.Schema<ListAccountReturnCarrierResponse>;

export interface SearchRequest {
  /** Required. Query that defines performance metrics to retrieve and dimensions according to which the metrics are to be segmented. For details on how to construct your query, see the [Query Language guide](https://developers.google.com/shopping-content/guides/reports/query-language/overview). */
  query?: string;
  /** Number of ReportRows to retrieve in a single page. Defaults to 1000. Values above 5000 are coerced to 5000. */
  pageSize?: number;
  /** Token of the page to retrieve. If not specified, the first page of results is returned. In order to request the next page of results, the value obtained from `next_page_token` in the previous response should be used. */
  pageToken?: string;
}

export const SearchRequest: Schema.Schema<SearchRequest> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchRequest" }) as any as Schema.Schema<SearchRequest>;

export interface Content_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Content_Date: Schema.Schema<Content_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Content_Date" }) as any as Schema.Schema<Content_Date>;

export interface Segments {
  /** Program to which metrics apply, for example, Free Product Listing. */
  program?: "PROGRAM_UNSPECIFIED" | "SHOPPING_ADS" | "FREE_PRODUCT_LISTING" | "FREE_LOCAL_PRODUCT_LISTING" | "BUY_ON_GOOGLE_LISTING" | (string & {});
  /** Date in the merchant timezone to which metrics apply. */
  date?: Content_Date;
  /** First day of the week (Monday) of the metrics date in the merchant timezone. */
  week?: Content_Date;
  /** Code of the country where the customer is located at the time of the event. Represented in the ISO 3166 format. If the customer country cannot be determined, a special 'ZZ' code is returned. */
  customerCountryCode?: string;
  /** Currency in which price metrics are represented, for example, if you select `ordered_item_sales_micros`, the returned value will be represented by this currency. */
  currencyCode?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Title of the product. */
  title?: string;
  /** Brand of the product. */
  brand?: string;
  /** [Product category (1st level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL1?: string;
  /** [Product category (2nd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL2?: string;
  /** [Product category (3rd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL3?: string;
  /** [Product category (4th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL4?: string;
  /** [Product category (5th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in Google's product taxonomy. */
  categoryL5?: string;
  /** [Product type (1st level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL1?: string;
  /** [Product type (2nd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL2?: string;
  /** [Product type (3rd level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL3?: string;
  /** [Product type (4th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL4?: string;
  /** [Product type (5th level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type) in merchant's own product taxonomy. */
  productTypeL5?: string;
  /** Custom label 0 for custom grouping of products. */
  customLabel0?: string;
  /** Custom label 1 for custom grouping of products. */
  customLabel1?: string;
  /** Custom label 2 for custom grouping of products. */
  customLabel2?: string;
  /** Custom label 3 for custom grouping of products. */
  customLabel3?: string;
  /** Custom label 4 for custom grouping of products. */
  customLabel4?: string;
}

export const Segments: Schema.Schema<Segments> = Schema.suspend(() => Schema.Struct({
  program: Schema.optional(Schema.String),
  date: Schema.optional(Content_Date),
  week: Schema.optional(Content_Date),
  customerCountryCode: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  categoryL1: Schema.optional(Schema.String),
  categoryL2: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  productTypeL1: Schema.optional(Schema.String),
  productTypeL2: Schema.optional(Schema.String),
  productTypeL3: Schema.optional(Schema.String),
  productTypeL4: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  customLabel0: Schema.optional(Schema.String),
  customLabel1: Schema.optional(Schema.String),
  customLabel2: Schema.optional(Schema.String),
  customLabel3: Schema.optional(Schema.String),
  customLabel4: Schema.optional(Schema.String),
})).annotate({ identifier: "Segments" }) as any as Schema.Schema<Segments>;

export interface Metrics {
  /** Number of clicks. */
  clicks?: string;
  /** Number of times merchant's products are shown. */
  impressions?: string;
  /** Click-through rate - the number of clicks merchant's products receive (clicks) divided by the number of times the products are shown (impressions). */
  ctr?: number;
  /** Number of conversions attributed to the product, reported on the conversion date. Depending on the attribution model, a conversion might be distributed across multiple clicks, where each click gets its own credit assigned. This metric is a sum of all such credits. The metric is currently available only for the `FREE_PRODUCT_LISTING` program. */
  conversions?: number;
  /** Value of conversions in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) attributed to the product, reported on the conversion date. The metric is currently available only for the `FREE_PRODUCT_LISTING` program. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. */
  conversionValueMicros?: string;
  /** Number of conversions divided by the number of clicks, reported on the impression date. The metric is currently available only for the `FREE_PRODUCT_LISTING` program. */
  conversionRate?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of placed orders. Excludes customer cancellations that happened within 30 minutes of placing the order. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  orders?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of fully shipped orders, reported on the last shipment date. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  shippedOrders?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of orders not shipped or partially shipped up until the end of the queried day. If a multi-day period is specified in the search query, the returned value is the average number of unshipped orders over the days in the queried period. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  unshippedOrders?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average number of days between an order being placed and the order being fully shipped, reported on the last shipment date. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  daysToShip?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average order size - the average number of items in an order. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  aos?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average order value in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) - the average value (total price of items) of all placed orders. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by product dimensions and customer_country_code.** */
  aovMicros?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items. Excludes customer cancellations that happened within 30 minutes of placing the order. **This metric cannot be segmented by customer_country_code.** */
  orderedItems?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of ordered items in micros (1 millionth of a standard unit, 1 USD = 1000000 micros). Excludes shipping, taxes (US only), and customer cancellations that happened within 30 minutes of placing the order. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  orderedItemSalesMicros?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of shipped items, reported on the shipment date. **This metric cannot be segmented by customer_country_code.** */
  shippedItems?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items not shipped up until the end of the queried day. If a multi-day period is specified in the search query, the returned value is the average number of unshipped items over the days in the queried period. **This metric cannot be segmented by customer_country_code.** */
  unshippedItems?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of shipped items in micros (1 millionth of a standard unit, 1 USD = 1000000 micros), reported on the order date. Excludes shipping and taxes (US only). The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  shippedItemSalesMicros?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items canceled by the merchant, reported on the order date. **This metric cannot be segmented by customer_country_code.** */
  rejectedItems?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Average number of days between an item being ordered and the item being **This metric cannot be segmented by customer_country_code.** */
  itemDaysToShip?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Percentage of shipped items in relation to all finalized items (shipped or rejected by the merchant; unshipped items are not taken into account), reported on the order date. Item fill rate is lowered by merchant rejections. **This metric cannot be segmented by customer_country_code.** */
  itemFillRate?: number;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Number of ordered items sent back for return, reported on the date when the merchant accepted the return. **This metric cannot be segmented by customer_country_code.** */
  returnedItems?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of ordered items sent back for return in micros (1 millionth of a standard unit, 1 USD = 1000000 micros), reported on the date when the merchant accepted the return. The currency of the returned value is stored in the currency_code segment. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  returnsMicros?: string;
  /** *Deprecated*: This field is no longer supported and retrieving it returns 0 starting from May 2024. Total price of returned items divided by the total price of shipped items, reported on the order date. If this metric is selected, 'segments.currency_code' is automatically added to the SELECT clause in the search query (unless it is explicitly selected by the user) and the currency_code segment is populated in the response. **This metric cannot be segmented by customer_country_code.** */
  returnRate?: number;
}

export const Metrics: Schema.Schema<Metrics> = Schema.suspend(() => Schema.Struct({
  clicks: Schema.optional(Schema.String),
  impressions: Schema.optional(Schema.String),
  ctr: Schema.optional(Schema.Number),
  conversions: Schema.optional(Schema.Number),
  conversionValueMicros: Schema.optional(Schema.String),
  conversionRate: Schema.optional(Schema.Number),
  orders: Schema.optional(Schema.String),
  shippedOrders: Schema.optional(Schema.String),
  unshippedOrders: Schema.optional(Schema.Number),
  daysToShip: Schema.optional(Schema.Number),
  aos: Schema.optional(Schema.Number),
  aovMicros: Schema.optional(Schema.Number),
  orderedItems: Schema.optional(Schema.String),
  orderedItemSalesMicros: Schema.optional(Schema.String),
  shippedItems: Schema.optional(Schema.String),
  unshippedItems: Schema.optional(Schema.Number),
  shippedItemSalesMicros: Schema.optional(Schema.String),
  rejectedItems: Schema.optional(Schema.String),
  itemDaysToShip: Schema.optional(Schema.Number),
  itemFillRate: Schema.optional(Schema.Number),
  returnedItems: Schema.optional(Schema.String),
  returnsMicros: Schema.optional(Schema.String),
  returnRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "Metrics" }) as any as Schema.Schema<Metrics>;

export interface ProductViewItemIssueItemIssueType {
  /** Canonical attribute name for attribute-specific issues. */
  canonicalAttribute?: string;
  /** Error code of the issue. */
  code?: string;
}

export const ProductViewItemIssueItemIssueType: Schema.Schema<ProductViewItemIssueItemIssueType> = Schema.suspend(() => Schema.Struct({
  canonicalAttribute: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductViewItemIssueItemIssueType" }) as any as Schema.Schema<ProductViewItemIssueItemIssueType>;

export interface ProductViewItemIssueIssueSeverityPerDestination {
  /** Issue destination. */
  destination?: string;
  /** List of disapproved countries in the destination. */
  disapprovedCountries?: Array<string>;
  /** List of demoted countries in the destination. */
  demotedCountries?: Array<string>;
}

export const ProductViewItemIssueIssueSeverityPerDestination: Schema.Schema<ProductViewItemIssueIssueSeverityPerDestination> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
  demotedCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProductViewItemIssueIssueSeverityPerDestination" }) as any as Schema.Schema<ProductViewItemIssueIssueSeverityPerDestination>;

export interface ProductViewItemIssueItemIssueSeverity {
  /** Item issue severity for every destination. */
  severityPerDestination?: Array<ProductViewItemIssueIssueSeverityPerDestination>;
  /** Severity of an issue aggregated for destination. */
  aggregatedSeverity?: "AGGREGATED_ISSUE_SEVERITY_UNSPECIFIED" | "DISAPPROVED" | "DEMOTED" | "PENDING" | (string & {});
}

export const ProductViewItemIssueItemIssueSeverity: Schema.Schema<ProductViewItemIssueItemIssueSeverity> = Schema.suspend(() => Schema.Struct({
  severityPerDestination: Schema.optional(Schema.Array(ProductViewItemIssueIssueSeverityPerDestination)),
  aggregatedSeverity: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductViewItemIssueItemIssueSeverity" }) as any as Schema.Schema<ProductViewItemIssueItemIssueSeverity>;

export interface ProductViewItemIssue {
  /** Item issue type. */
  issueType?: ProductViewItemIssueItemIssueType;
  /** Item issue severity. */
  severity?: ProductViewItemIssueItemIssueSeverity;
  /** Item issue resolution. */
  resolution?: "UNKNOWN" | "MERCHANT_ACTION" | "PENDING_PROCESSING" | (string & {});
}

export const ProductViewItemIssue: Schema.Schema<ProductViewItemIssue> = Schema.suspend(() => Schema.Struct({
  issueType: Schema.optional(ProductViewItemIssueItemIssueType),
  severity: Schema.optional(ProductViewItemIssueItemIssueSeverity),
  resolution: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductViewItemIssue" }) as any as Schema.Schema<ProductViewItemIssue>;

export interface ProductView {
  /** The REST ID of the product, in the form of channel:contentLanguage:targetCountry:offerId. Content API methods that operate on products take this as their productId parameter. Should always be included in the SELECT clause. */
  id?: string;
  /** Merchant-provided id of the product. */
  offerId?: string;
  /** Title of the product. */
  title?: string;
  /** Brand of the product. */
  brand?: string;
  /** First level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL1?: string;
  /** Second level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL2?: string;
  /** Third level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL3?: string;
  /** Fourth level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL4?: string;
  /** Fifth level of the product category in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). */
  categoryL5?: string;
  /** First level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL1?: string;
  /** Second level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL2?: string;
  /** Third level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL3?: string;
  /** Fourth level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL4?: string;
  /** Fifth level of the product type in merchant's own [product taxonomy](https://support.google.com/merchants/answer/6324436). */
  productTypeL5?: string;
  /** Product price currency code (for example, ISO 4217). Absent if product price is not available. */
  currencyCode?: string;
  /** Product price specified as micros (1 millionth of a standard unit, 1 USD = 1000000 micros) in the product currency. Absent in case the information about the price of the product is not available. */
  priceMicros?: string;
  /** Language code of the product in BCP 47 format. */
  languageCode?: string;
  /** Condition of the product. */
  condition?: string;
  /** Channel of the product (online versus local). */
  channel?: "CHANNEL_UNSPECIFIED" | "LOCAL" | "ONLINE" | (string & {});
  /** Availability of the product. */
  availability?: string;
  /** The normalized shipping label specified in the feed */
  shippingLabel?: string;
  /** GTIN of the product. */
  gtin?: Array<string>;
  /** Item group ID provided by the merchant for grouping variants together. */
  itemGroupId?: string;
  /** The time the merchant created the product in timestamp seconds. */
  creationTime?: string;
  /** Expiration date for the product. Specified on insertion. */
  expirationDate?: Content_Date;
  /** Aggregated destination status. */
  aggregatedDestinationStatus?: "AGGREGATED_STATUS_UNSPECIFIED" | "NOT_ELIGIBLE_OR_DISAPPROVED" | "PENDING" | "ELIGIBLE_LIMITED" | "ELIGIBLE" | (string & {});
  /** List of item issues for the product. */
  itemIssues?: Array<ProductViewItemIssue>;
  /** Estimated performance potential compared to highest performing products of the merchant. */
  clickPotential?: "CLICK_POTENTIAL_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  /** Normalized click potential of the product. Values range from 1 to 1000, where 1 is the highest click potential and 1000 is the theoretical lowest. */
  clickPotentialRank?: string;
}

export const ProductView: Schema.Schema<ProductView> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  categoryL1: Schema.optional(Schema.String),
  categoryL2: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  productTypeL1: Schema.optional(Schema.String),
  productTypeL2: Schema.optional(Schema.String),
  productTypeL3: Schema.optional(Schema.String),
  productTypeL4: Schema.optional(Schema.String),
  productTypeL5: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  priceMicros: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  shippingLabel: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.Array(Schema.String)),
  itemGroupId: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  expirationDate: Schema.optional(Content_Date),
  aggregatedDestinationStatus: Schema.optional(Schema.String),
  itemIssues: Schema.optional(Schema.Array(ProductViewItemIssue)),
  clickPotential: Schema.optional(Schema.String),
  clickPotentialRank: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductView" }) as any as Schema.Schema<ProductView>;

export interface ProductCluster {
  /** Title of the product cluster. */
  title?: string;
  /** Brand of the product cluster. */
  brand?: string;
  /** Product category (1st level) of the product cluster, represented in Google's product taxonomy. */
  categoryL1?: string;
  /** Product category (2nd level) of the product cluster, represented in Google's product taxonomy. */
  categoryL2?: string;
  /** Product category (3rd level) of the product cluster, represented in Google's product taxonomy. */
  categoryL3?: string;
  /** Product category (4th level) of the product cluster, represented in Google's product taxonomy. */
  categoryL4?: string;
  /** Product category (5th level) of the product cluster, represented in Google's product taxonomy. */
  categoryL5?: string;
  /** GTINs of example variants of the product cluster. */
  variantGtins?: Array<string>;
  /** Tells whether the product cluster is `IN_STOCK` in your product feed across multiple countries, `OUT_OF_STOCK` in your product feed, or `NOT_IN_INVENTORY` at all. The field doesn't take the Best Sellers report country filter into account. */
  inventoryStatus?: "INVENTORY_STATUS_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "NOT_IN_INVENTORY" | (string & {});
  /** Tells if there is at least one product of the brand currently `IN_STOCK` in your product feed across multiple countries, all products are `OUT_OF_STOCK` in your product feed, or `NOT_IN_INVENTORY`. The field doesn't take the Best Sellers report country filter into account. */
  brandInventoryStatus?: "INVENTORY_STATUS_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "NOT_IN_INVENTORY" | (string & {});
}

export const ProductCluster: Schema.Schema<ProductCluster> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  categoryL1: Schema.optional(Schema.String),
  categoryL2: Schema.optional(Schema.String),
  categoryL3: Schema.optional(Schema.String),
  categoryL4: Schema.optional(Schema.String),
  categoryL5: Schema.optional(Schema.String),
  variantGtins: Schema.optional(Schema.Array(Schema.String)),
  inventoryStatus: Schema.optional(Schema.String),
  brandInventoryStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductCluster" }) as any as Schema.Schema<ProductCluster>;

export interface Brand {
  /** Name of the brand. */
  name?: string;
}

export const Brand: Schema.Schema<Brand> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Brand" }) as any as Schema.Schema<Brand>;

export interface BestSellers {
  /** Report date. The value of this field can only be one of the following: * The first day of the week (Monday) for weekly reports. * The first day of the month for monthly reports. If a `WHERE` condition on `best_sellers.report_date` is not specified in the query, the latest available weekly or monthly report is returned. */
  reportDate?: Content_Date;
  /** Granularity of the report. The ranking can be done over a week or a month timeframe. A `WHERE` condition on `best_sellers.report_granularity` is required in the query. */
  reportGranularity?: "REPORT_GRANULARITY_UNSPECIFIED" | "WEEKLY" | "MONTHLY" | (string & {});
  /** Country where the ranking is calculated. A `WHERE` condition on `best_sellers.country_code` is required in the query. */
  countryCode?: string;
  /** Google product category ID to calculate the ranking for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). If a `WHERE` condition on `best_sellers.category_id` is not specified in the query, rankings for all top-level categories are returned. */
  categoryId?: string;
  /** Popularity on Shopping ads and free listings, in the selected category and country, based on the estimated number of units sold. */
  rank?: string;
  /** Popularity rank in the previous week or month. */
  previousRank?: string;
  /** Estimated demand in relation to the item with the highest popularity rank in the same category and country. */
  relativeDemand?: "RELATIVE_DEMAND_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
  /** Estimated demand in relation to the item with the highest popularity rank in the same category and country in the previous week or month. */
  previousRelativeDemand?: "RELATIVE_DEMAND_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
  /** Change in the estimated demand. Whether it rose, sank or remained flat. */
  relativeDemandChange?: "RELATIVE_DEMAND_CHANGE_TYPE_UNSPECIFIED" | "SINKER" | "FLAT" | "RISER" | (string & {});
}

export const BestSellers: Schema.Schema<BestSellers> = Schema.suspend(() => Schema.Struct({
  reportDate: Schema.optional(Content_Date),
  reportGranularity: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  categoryId: Schema.optional(Schema.String),
  rank: Schema.optional(Schema.String),
  previousRank: Schema.optional(Schema.String),
  relativeDemand: Schema.optional(Schema.String),
  previousRelativeDemand: Schema.optional(Schema.String),
  relativeDemandChange: Schema.optional(Schema.String),
})).annotate({ identifier: "BestSellers" }) as any as Schema.Schema<BestSellers>;

export interface PriceCompetitiveness {
  /** The country of the price benchmark (ISO 3166 code). */
  countryCode?: string;
  /** The latest available price benchmark in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) for the product's catalog in the benchmark country. */
  benchmarkPriceMicros?: string;
  /** The price benchmark currency (ISO 4217 code). */
  benchmarkPriceCurrencyCode?: string;
}

export const PriceCompetitiveness: Schema.Schema<PriceCompetitiveness> = Schema.suspend(() => Schema.Struct({
  countryCode: Schema.optional(Schema.String),
  benchmarkPriceMicros: Schema.optional(Schema.String),
  benchmarkPriceCurrencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "PriceCompetitiveness" }) as any as Schema.Schema<PriceCompetitiveness>;

export interface PriceInsights {
  /** The latest suggested price in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) for the product. */
  suggestedPriceMicros?: string;
  /** The suggested price currency (ISO 4217 code). */
  suggestedPriceCurrencyCode?: string;
  /** The predicted change in impressions as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in impressions. */
  predictedImpressionsChangeFraction?: number;
  /** The predicted change in clicks as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in clicks. */
  predictedClicksChangeFraction?: number;
  /** The predicted change in conversions as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in conversions). */
  predictedConversionsChangeFraction?: number;
  /** *Deprecated*: This field is no longer supported and will start returning 0. The predicted change in gross profit as a fraction after introducing the suggested price compared to current active price. For example, 0.05 is a 5% predicted increase in gross profit. */
  predictedGrossProfitChangeFraction?: number;
  /** *Deprecated*: This field is no longer supported and will start returning 0. The predicted change in gross profit in micros (1 millionth of a standard unit, 1 USD = 1000000 micros) after introducing the suggested price for a month compared to current active price. */
  predictedMonthlyGrossProfitChangeMicros?: string;
  /** *Deprecated*: This field is no longer supported and will start returning USD for all requests. The predicted monthly gross profit change currency (ISO 4217 code). */
  predictedMonthlyGrossProfitChangeCurrencyCode?: string;
  /** The predicted effectiveness of applying the price suggestion, bucketed. */
  effectiveness?: "EFFECTIVENESS_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
}

export const PriceInsights: Schema.Schema<PriceInsights> = Schema.suspend(() => Schema.Struct({
  suggestedPriceMicros: Schema.optional(Schema.String),
  suggestedPriceCurrencyCode: Schema.optional(Schema.String),
  predictedImpressionsChangeFraction: Schema.optional(Schema.Number),
  predictedClicksChangeFraction: Schema.optional(Schema.Number),
  predictedConversionsChangeFraction: Schema.optional(Schema.Number),
  predictedGrossProfitChangeFraction: Schema.optional(Schema.Number),
  predictedMonthlyGrossProfitChangeMicros: Schema.optional(Schema.String),
  predictedMonthlyGrossProfitChangeCurrencyCode: Schema.optional(Schema.String),
  effectiveness: Schema.optional(Schema.String),
})).annotate({ identifier: "PriceInsights" }) as any as Schema.Schema<PriceInsights>;

export interface CompetitiveVisibility {
  /** Date of this row. Available only in `CompetitiveVisibilityBenchmarkView` and `CompetitiveVisibilityCompetitorView`. Required in the `SELECT` clause for `CompetitiveVisibilityMarketBenchmarkView`. */
  date?: Content_Date;
  /** Domain of your competitor or your domain, if 'is_your_domain' is true. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Required in the `SELECT` clause for `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  domain?: string;
  /** True if this row contains data for your domain. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  isYourDomain?: boolean;
  /** The country where impression appeared. Required in the `SELECT` clause. A `WHERE` condition on `competitive_visibility.country_code` is required in the query. */
  countryCode?: string;
  /** Google product category ID to calculate the report for, represented in [Google's product taxonomy](https://support.google.com/merchants/answer/6324436). Required in the `SELECT` clause. A `WHERE` condition on `competitive_visibility.category_id` is required in the query. */
  categoryId?: string;
  /** Type of impression listing. Required in the `SELECT` clause. Cannot be filtered on in the 'WHERE' clause. */
  trafficSource?: "UNKNOWN" | "ORGANIC" | "ADS" | "ALL" | (string & {});
  /** Position of the domain in the top merchants ranking for the selected keys (`date`, `category_id`, `country_code`, `listing_type`) based on impressions. 1 is the highest. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  rank?: string;
  /** [Ads / organic ratio] (https://support.google.com/merchants/answer/11366442#zippy=%2Cadsfree-ratio) shows how often a merchant receives impressions from Shopping ads compared to organic traffic. The number is rounded and bucketed. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  adsOrganicRatio?: number;
  /** Page overlap rate describes how frequently competing retailers’ offers are shown together with your offers on the same page. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  pageOverlapRate?: number;
  /** Higher position rate shows how often a competitor’s offer got placed in a higher position on the page than your offer. Available only in `CompetitiveVisibilityTopMerchantView` and `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  higherPositionRate?: number;
  /** Relative visibility shows how often your competitors’ offers are shown compared to your offers. In other words, this is the number of displayed impressions of a competitor retailer divided by the number of your displayed impressions during a selected time range for a selected product category and country. Available only in `CompetitiveVisibilityCompetitorView`. Cannot be filtered on in the 'WHERE' clause. */
  relativeVisibility?: number;
  /** Change in visibility based on impressions for your domain with respect to the start of the selected time range (or first day with non-zero impressions). Available only in `CompetitiveVisibilityBenchmarkView`. Cannot be filtered on in the 'WHERE' clause. */
  yourDomainVisibilityTrend?: number;
  /** Change in visibility based on impressions with respect to the start of the selected time range (or first day with non-zero impressions) for a combined set of merchants with highest visibility approximating the market. Available only in `CompetitiveVisibilityBenchmarkView`. Cannot be filtered on in the 'WHERE' clause. */
  categoryBenchmarkVisibilityTrend?: number;
}

export const CompetitiveVisibility: Schema.Schema<CompetitiveVisibility> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Content_Date),
  domain: Schema.optional(Schema.String),
  isYourDomain: Schema.optional(Schema.Boolean),
  countryCode: Schema.optional(Schema.String),
  categoryId: Schema.optional(Schema.String),
  trafficSource: Schema.optional(Schema.String),
  rank: Schema.optional(Schema.String),
  adsOrganicRatio: Schema.optional(Schema.Number),
  pageOverlapRate: Schema.optional(Schema.Number),
  higherPositionRate: Schema.optional(Schema.Number),
  relativeVisibility: Schema.optional(Schema.Number),
  yourDomainVisibilityTrend: Schema.optional(Schema.Number),
  categoryBenchmarkVisibilityTrend: Schema.optional(Schema.Number),
})).annotate({ identifier: "CompetitiveVisibility" }) as any as Schema.Schema<CompetitiveVisibility>;

export interface TopicTrends {
  /** Country trends are calculated for. Must be a two-letter country code (ISO 3166-1-alpha-2 code), for example, `“US”`. */
  customerCountryCode?: string;
  /** Google-provided topic trends are calculated for. Only top eight topics are returned. Topic is what shoppers are searching for on Google, grouped by the same concept. */
  topic?: string;
  /** Date the trend score was retrieved. */
  date?: Content_Date;
  /** Daily search interest, normalized to the time and country to make comparisons easier, with 100 representing peak popularity (from 0 to 100) for the requested time period and location. */
  searchInterest?: number;
  /** Search interest in the last 7 days, with the same normalization as search_interest. This field is only present for a past date. */
  last7DaysSearchInterest?: number;
  /** Search interest in the last 30 days, with the same normalization as search_interest. This field is only present for a past date. */
  last30DaysSearchInterest?: number;
  /** Search interest in the last 90 days, with the same normalization as search_interest. This field is only present for a past date. */
  last90DaysSearchInterest?: number;
  /** Search interest in the last 120 days, with the same normalization as search_interest. This field is only present for a past date. */
  last120DaysSearchInterest?: number;
  /** Estimated search interest in the next 7 days, with the same normalization as search_interest. This field is only present for a future date. */
  next7DaysSearchInterest?: number;
}

export const TopicTrends: Schema.Schema<TopicTrends> = Schema.suspend(() => Schema.Struct({
  customerCountryCode: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.String),
  date: Schema.optional(Content_Date),
  searchInterest: Schema.optional(Schema.Number),
  last7DaysSearchInterest: Schema.optional(Schema.Number),
  last30DaysSearchInterest: Schema.optional(Schema.Number),
  last90DaysSearchInterest: Schema.optional(Schema.Number),
  last120DaysSearchInterest: Schema.optional(Schema.Number),
  next7DaysSearchInterest: Schema.optional(Schema.Number),
})).annotate({ identifier: "TopicTrends" }) as any as Schema.Schema<TopicTrends>;

export interface ReportRow {
  /** Segmentation dimensions requested by the merchant in the query. Dimension values are only set for dimensions requested explicitly in the query. */
  segments?: Segments;
  /** Metrics requested by the merchant in the query. Metric values are only set for metrics requested explicitly in the query. */
  metrics?: Metrics;
  /** Product fields requested by the merchant in the query. Field values are only set if the merchant queries `ProductView`. */
  productView?: ProductView;
  /** Product cluster fields requested by the merchant in the query. Field values are only set if the merchant queries `BestSellersProductClusterView`. */
  productCluster?: ProductCluster;
  /** Brand fields requested by the merchant in the query. Field values are only set if the merchant queries `BestSellersBrandView`. */
  brand?: Brand;
  /** Best sellers fields requested by the merchant in the query. Field values are only set if the merchant queries `BestSellersProductClusterView` or `BestSellersBrandView`. */
  bestSellers?: BestSellers;
  /** Price competitiveness fields requested by the merchant in the query. Field values are only set if the merchant queries `PriceCompetitivenessProductView`. */
  priceCompetitiveness?: PriceCompetitiveness;
  /** Price insights fields requested by the merchant in the query. Field values are only set if the merchant queries `PriceInsightsProductView`. */
  priceInsights?: PriceInsights;
  /** Competitive visibility fields requested by the merchant in the query. Field values are only set if the merchant queries `CompetitiveVisibilityTopMerchantView`, `CompetitiveVisibilityBenchmarkView` or `CompetitiveVisibilityCompetitorView`. */
  competitiveVisibility?: CompetitiveVisibility;
  /** [Topic trends](https://support.google.com/merchants/answer/13542370) fields requested by the merchant in the query. Field values are only set if the merchant queries `TopicTrendsView`. */
  topicTrends?: TopicTrends;
}

export const ReportRow: Schema.Schema<ReportRow> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Segments),
  metrics: Schema.optional(Metrics),
  productView: Schema.optional(ProductView),
  productCluster: Schema.optional(ProductCluster),
  brand: Schema.optional(Brand),
  bestSellers: Schema.optional(BestSellers),
  priceCompetitiveness: Schema.optional(PriceCompetitiveness),
  priceInsights: Schema.optional(PriceInsights),
  competitiveVisibility: Schema.optional(CompetitiveVisibility),
  topicTrends: Schema.optional(TopicTrends),
})).annotate({ identifier: "ReportRow" }) as any as Schema.Schema<ReportRow>;

export interface SearchResponse {
  /** Rows that matched the search query. */
  results?: Array<ReportRow>;
  /** Token which can be sent as `page_token` to retrieve the next page. If omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const SearchResponse: Schema.Schema<SearchResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(ReportRow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchResponse" }) as any as Schema.Schema<SearchResponse>;

export interface RenderAccountIssuesRequestPayload {
  /** Optional. How the detailed content should be returned. Default option is to return the content as a pre-rendered HTML text. */
  contentOption?: "CONTENT_OPTION_UNSPECIFIED" | "PRE_RENDERED_HTML" | (string & {});
  /** Optional. How actions with user input form should be handled. If not provided, actions will be returned as links that points merchant to Merchant Center where they can request the action. */
  userInputActionOption?: "USER_INPUT_ACTION_RENDERING_OPTION_UNSPECIFIED" | "REDIRECT_TO_MERCHANT_CENTER" | "BUILT_IN_USER_INPUT_ACTIONS" | (string & {});
}

export const RenderAccountIssuesRequestPayload: Schema.Schema<RenderAccountIssuesRequestPayload> = Schema.suspend(() => Schema.Struct({
  contentOption: Schema.optional(Schema.String),
  userInputActionOption: Schema.optional(Schema.String),
})).annotate({ identifier: "RenderAccountIssuesRequestPayload" }) as any as Schema.Schema<RenderAccountIssuesRequestPayload>;

export interface BreakdownRegion {
  /** The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) */
  code?: string;
  /** The localized name of the region. For region with code='001' the value is 'All countries' or the equivalent in other languages. */
  name?: string;
}

export const BreakdownRegion: Schema.Schema<BreakdownRegion> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "BreakdownRegion" }) as any as Schema.Schema<BreakdownRegion>;

export interface Breakdown {
  /** Lists of regions. Should be rendered as a title for this group of details. The full list should be shown to merchant. If the list is too long, it is recommended to make it expandable. */
  regions?: Array<BreakdownRegion>;
  /** Human readable, localized description of issue's effect on different targets. Should be rendered as a list. For example: * "Products not showing in ads" * "Products not showing organically" */
  details?: Array<string>;
}

export const Breakdown: Schema.Schema<Breakdown> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(BreakdownRegion)),
  details: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Breakdown" }) as any as Schema.Schema<Breakdown>;

export interface AccountIssueImpact {
  /** Optional. Message summarizing the overall impact of the issue. If present, it should be rendered to the merchant. For example: "Disapproves 90k offers in 25 countries" */
  message?: string;
  /** The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** Detailed impact breakdown. Explains the types of restriction the issue has in different shopping destinations and territory. If present, it should be rendered to the merchant. Can be shown as a mouse over dropdown or a dialog. Each breakdown item represents a group of regions with the same impact details. */
  breakdowns?: Array<Breakdown>;
}

export const AccountIssueImpact: Schema.Schema<AccountIssueImpact> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  breakdowns: Schema.optional(Schema.Array(Breakdown)),
})).annotate({ identifier: "AccountIssueImpact" }) as any as Schema.Schema<AccountIssueImpact>;

export interface BuiltInSimpleActionAdditionalContent {
  /** Title of the additional content; */
  title?: string;
  /** Long text organized into paragraphs. */
  paragraphs?: Array<string>;
}

export const BuiltInSimpleActionAdditionalContent: Schema.Schema<BuiltInSimpleActionAdditionalContent> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  paragraphs: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BuiltInSimpleActionAdditionalContent" }) as any as Schema.Schema<BuiltInSimpleActionAdditionalContent>;

export interface BuiltInSimpleAction {
  /** The type of action that represents a functionality that is expected to be available in third-party application. */
  type?: "BUILT_IN_SIMPLE_ACTION_TYPE_UNSPECIFIED" | "VERIFY_PHONE" | "CLAIM_WEBSITE" | "ADD_PRODUCTS" | "ADD_CONTACT_INFO" | "LINK_ADS_ACCOUNT" | "ADD_BUSINESS_REGISTRATION_NUMBER" | "EDIT_ITEM_ATTRIBUTE" | "FIX_ACCOUNT_ISSUE" | "SHOW_ADDITIONAL_CONTENT" | (string & {});
  /** The attribute that needs to be updated. Present when the type is `EDIT_ITEM_ATTRIBUTE`. This field contains a code for attribute, represented in snake_case. You can find a list of product's attributes, with their codes [here](https://support.google.com/merchants/answer/7052112). */
  attributeCode?: string;
  /** Long text from an external source that should be available to the merchant. Present when the type is `SHOW_ADDITIONAL_CONTENT`. */
  additionalContent?: BuiltInSimpleActionAdditionalContent;
}

export const BuiltInSimpleAction: Schema.Schema<BuiltInSimpleAction> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  attributeCode: Schema.optional(Schema.String),
  additionalContent: Schema.optional(BuiltInSimpleActionAdditionalContent),
})).annotate({ identifier: "BuiltInSimpleAction" }) as any as Schema.Schema<BuiltInSimpleAction>;

export interface ExternalAction {
  /** The type of external action. */
  type?: "EXTERNAL_ACTION_TYPE_UNSPECIFIED" | "REVIEW_PRODUCT_ISSUE_IN_MERCHANT_CENTER" | "REVIEW_ACCOUNT_ISSUE_IN_MERCHANT_CENTER" | "LEGAL_APPEAL_IN_HELP_CENTER" | "VERIFY_IDENTITY_IN_MERCHANT_CENTER" | (string & {});
  /** URL to external system, for example Merchant Center, where the merchant can perform the action. */
  uri?: string;
}

export const ExternalAction: Schema.Schema<ExternalAction> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalAction" }) as any as Schema.Schema<ExternalAction>;

export interface TextWithTooltip {
  /** Value of the message as a simple text. */
  simpleValue?: string;
  /** Value of the tooltip as a simple text. */
  simpleTooltipValue?: string;
  /** The suggested type of an icon for tooltip, if a tooltip is present. */
  tooltipIconStyle?: "TOOLTIP_ICON_STYLE_UNSPECIFIED" | "INFO" | "QUESTION" | (string & {});
}

export const TextWithTooltip: Schema.Schema<TextWithTooltip> = Schema.suspend(() => Schema.Struct({
  simpleValue: Schema.optional(Schema.String),
  simpleTooltipValue: Schema.optional(Schema.String),
  tooltipIconStyle: Schema.optional(Schema.String),
})).annotate({ identifier: "TextWithTooltip" }) as any as Schema.Schema<TextWithTooltip>;

export interface InputFieldTextInput {
  /** Type of the text input */
  type?: "TEXT_INPUT_TYPE_UNSPECIFIED" | "GENERIC_SHORT_TEXT" | "GENERIC_LONG_TEXT" | (string & {});
  /** Additional info regarding the field to be displayed to merchant. For example, warning to not include personal identifiable information. There may be more information to be shown in a tooltip. */
  additionalInfo?: TextWithTooltip;
  /** Information about the required format. If present, it should be shown close to the input field to help merchants to provide a correct value. For example: "VAT numbers should be in a format similar to SK9999999999" */
  formatInfo?: string;
  /** Text to be used as the [aria-label](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) for the input. */
  ariaLabel?: string;
}

export const InputFieldTextInput: Schema.Schema<InputFieldTextInput> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  additionalInfo: Schema.optional(TextWithTooltip),
  formatInfo: Schema.optional(Schema.String),
  ariaLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "InputFieldTextInput" }) as any as Schema.Schema<InputFieldTextInput>;

export interface InputFieldChoiceInputChoiceInputOption {
  /** Not for display but need to be sent back for the selected choice option. */
  id?: string;
  /** Short description of the choice option. There may be more information to be shown as a tooltip. */
  label?: TextWithTooltip;
  /** Input that should be displayed when this option is selected. The additional input will not contain a `ChoiceInput`. */
  additionalInput?: InputField;
}

export const InputFieldChoiceInputChoiceInputOption: Schema.Schema<InputFieldChoiceInputChoiceInputOption> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  label: Schema.optional(TextWithTooltip),
  additionalInput: Schema.optional(InputField),
})).annotate({ identifier: "InputFieldChoiceInputChoiceInputOption" }) as any as Schema.Schema<InputFieldChoiceInputChoiceInputOption>;

export interface InputFieldChoiceInput {
  /** A list of choices. Only one option can be selected. */
  options?: Array<InputFieldChoiceInputChoiceInputOption>;
}

export const InputFieldChoiceInput: Schema.Schema<InputFieldChoiceInput> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(Schema.Array(InputFieldChoiceInputChoiceInputOption)),
})).annotate({ identifier: "InputFieldChoiceInput" }) as any as Schema.Schema<InputFieldChoiceInput>;

export interface InputFieldCheckboxInput {
}

export const InputFieldCheckboxInput: Schema.Schema<InputFieldCheckboxInput> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "InputFieldCheckboxInput" }) as any as Schema.Schema<InputFieldCheckboxInput>;

export interface InputField {
  /** Not for display but need to be sent back for the given input field. */
  id?: string;
  /** Input field label. There may be more information to be shown in a tooltip. */
  label?: TextWithTooltip;
  /** Whether the field is required. The action button needs to stay disabled till values for all required fields are provided. */
  required?: boolean;
  /** Input field to provide text information. Corresponds to the [html input type=text](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.text.html#input.text) or [html textarea](https://www.w3.org/TR/2012/WD-html-markup-20121025/textarea.html#textarea). */
  textInput?: InputFieldTextInput;
  /** Input field to select one of the offered choices. Corresponds to the [html input type=radio](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.radio.html#input.radio). */
  choiceInput?: InputFieldChoiceInput;
  /** Input field to provide a boolean value. Corresponds to the [html input type=checkbox](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.checkbox.html#input.checkbox). */
  checkboxInput?: InputFieldCheckboxInput;
}

export const InputField: Schema.Schema<InputField> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  label: Schema.optional(TextWithTooltip),
  required: Schema.optional(Schema.Boolean),
  textInput: Schema.optional(InputFieldTextInput),
  choiceInput: Schema.optional(InputFieldChoiceInput),
  checkboxInput: Schema.optional(InputFieldCheckboxInput),
})).annotate({ identifier: "InputField" }) as any as Schema.Schema<InputField>;

export interface Callout {
  /** Can be used to render messages with different severity in different styles. Snippets off all types contain important information that should be displayed to merchants. */
  styleHint?: "CALLOUT_STYLE_HINT_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** A full message that needs to be shown to the merchant. */
  fullMessage?: TextWithTooltip;
}

export const Callout: Schema.Schema<Callout> = Schema.suspend(() => Schema.Struct({
  styleHint: Schema.optional(Schema.String),
  fullMessage: Schema.optional(TextWithTooltip),
})).annotate({ identifier: "Callout" }) as any as Schema.Schema<Callout>;

export interface ActionFlow {
  /** Not for display but need to be sent back for the selected action flow. */
  id?: string;
  /** Text value describing the intent for the action flow. It can be used as an input label if merchant needs to pick one of multiple flows. For example: "I disagree with the issue" */
  label?: string;
  /** A list of input fields. */
  inputs?: Array<InputField>;
  /** Title of the request dialog. For example: "Before you request a review" */
  dialogTitle?: string;
  /** Message displayed in the request dialog. For example: "Make sure you've fixed all your country-specific issues. If not, you may have to wait 7 days to request another review". There may be an more information to be shown in a tooltip. */
  dialogMessage?: TextWithTooltip;
  /** Important message to be highlighted in the request dialog. For example: "You can only request a review for disagreeing with this issue once. If it's not approved, you'll need to fix the issue and wait a few days before you can request another review." */
  dialogCallout?: Callout;
  /** Label for the button to trigger the action from the action dialog. For example: "Request review" */
  dialogButtonLabel?: string;
}

export const ActionFlow: Schema.Schema<ActionFlow> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  inputs: Schema.optional(Schema.Array(InputField)),
  dialogTitle: Schema.optional(Schema.String),
  dialogMessage: Schema.optional(TextWithTooltip),
  dialogCallout: Schema.optional(Callout),
  dialogButtonLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "ActionFlow" }) as any as Schema.Schema<ActionFlow>;

export interface BuiltInUserInputAction {
  /** Internal details. Not for display but need to be sent back when triggering the action. */
  actionContext?: string;
  /** Actions may provide multiple different flows. Merchant selects one that fits best to their intent. Selecting the flow is the first step in user's interaction with the action. It affects what input fields will be available and required and also how the request will be processed. */
  flows?: Array<ActionFlow>;
}

export const BuiltInUserInputAction: Schema.Schema<BuiltInUserInputAction> = Schema.suspend(() => Schema.Struct({
  actionContext: Schema.optional(Schema.String),
  flows: Schema.optional(Schema.Array(ActionFlow)),
})).annotate({ identifier: "BuiltInUserInputAction" }) as any as Schema.Schema<BuiltInUserInputAction>;

export interface ActionReason {
  /** Messages summarizing the reason, why the action is not available. For example: "Review requested on Jan 03. Review requests can take a few days to complete." */
  message?: string;
  /** Detailed explanation of the reason. Should be displayed as a hint if present. */
  detail?: string;
  /** Optional. An action that needs to be performed to solve the problem represented by this reason. This action will always be available. Should be rendered as a link or button next to the summarizing message. For example, the review may be available only once merchant configure all required attributes. In such a situation this action can be a link to the form, where they can fill the missing attribute to unblock the main action. */
  action?: Action;
}

export const ActionReason: Schema.Schema<ActionReason> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  action: Schema.optional(Action),
})).annotate({ identifier: "ActionReason" }) as any as Schema.Schema<ActionReason>;

export interface Action {
  /** Action implemented and performed in (your) third-party application. The application should point the merchant to the place, where they can access the corresponding functionality or provide instructions, if the specific functionality is not available. */
  builtinSimpleAction?: BuiltInSimpleAction;
  /** Action that is implemented and performed outside of (your) third-party application. The application needs to redirect the merchant to the external location where they can perform the action. */
  externalAction?: ExternalAction;
  /** Action implemented and performed in (your) third-party application. The application needs to show an additional content and input form to the merchant as specified for given action. They can trigger the action only when they provided all required inputs. */
  builtinUserInputAction?: BuiltInUserInputAction;
  /** Label of the action button. */
  buttonLabel?: string;
  /** Controlling whether the button is active or disabled. The value is 'false' when the action was already requested or is not available. If the action is not available then a reason will be present. If (your) third-party application shows a disabled button for action that is not available, then it should also show reasons. */
  isAvailable?: boolean;
  /** List of reasons why the action is not available. The list of reasons is empty if the action is available. If there is only one reason, it can be displayed next to the disabled button. If there are more reasons, all of them should be displayed, for example in a pop-up dialog. */
  reasons?: Array<ActionReason>;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() => Schema.Struct({
  builtinSimpleAction: Schema.optional(BuiltInSimpleAction),
  externalAction: Schema.optional(ExternalAction),
  builtinUserInputAction: Schema.optional(BuiltInUserInputAction),
  buttonLabel: Schema.optional(Schema.String),
  isAvailable: Schema.optional(Schema.Boolean),
  reasons: Schema.optional(Schema.Array(ActionReason)),
})).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface AccountIssue {
  /** Title of the issue. */
  title?: string;
  /** Clarifies the severity of the issue. The summarizing message, if present, should be shown right under the title for each issue. It helps merchants to quickly understand the impact of the issue. The detailed breakdown helps the merchant to fully understand the impact of the issue. It can be rendered as dialog that opens when the merchant mouse over the summarized impact statement. Issues with different severity can be styled differently. They may use a different color or icon to signal the difference between `ERROR`, `WARNING` and `INFO`. */
  impact?: AccountIssueImpact;
  /** Details of the issue as a pre-rendered HTML. HTML elements contain CSS classes that can be used to customize the style of the content. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `issue-detail` - top level container for the detail of the issue * `callout-banners` - section of the `issue-detail` with callout banners * `callout-banner` - single callout banner, inside `callout-banners` * `callout-banner-info` - callout with important information (default) * `callout-banner-warning` - callout with a warning * `callout-banner-error` - callout informing about an error (most severe) * `issue-content` - section of the `issue-detail`, contains multiple `content-element` * `content-element` - content element such as a list, link or paragraph, inside `issue-content` * `root-causes` - unordered list with items describing root causes of the issue, inside `issue-content` * `root-causes-intro` - intro text before the `root-causes` list, inside `issue-content` * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. * `content-moderation` - marks the paragraph that explains how the issue was identified. * `new-element` - Present for new elements added to the pre-rendered content in the future. To make sure that a new content element does not break your style, you can hide everything with this class. */
  prerenderedContent?: string;
  /** A list of actionable steps that can be executed to solve the issue. An example is requesting a re-review or providing arguments when merchant disagrees with the issue. Actions that are supported in (your) third-party application can be rendered as buttons and should be available to merchant when they expand the issue. */
  actions?: Array<Action>;
  /** Pre-rendered HTML that contains a link to the external location where the ODS can be requested and instructions for how to request it. HTML elements contain CSS classes that can be used to customize the style of this snippet. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `ods-section`* - wrapper around the out-of-court dispute resolution section * `ods-description`* - intro text for the out-of-court dispute resolution. It may contain multiple segments and a link. * `ods-param`* - wrapper around the header-value pair for parameters that merchant may need to provide during the ODS process. * `ods-routing-id`* - ods param for the Routing ID. * `ods-reference-id`* - ods param for the Routing ID. * `ods-param-header`* - header for the ODS parameter * `ods-param-value`* - value of the ODS parameter. This value should be rendered in a way that it is easy for merchants to identify and copy. * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. */
  prerenderedOutOfCourtDisputeSettlement?: string;
}

export const AccountIssue: Schema.Schema<AccountIssue> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  impact: Schema.optional(AccountIssueImpact),
  prerenderedContent: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(Action)),
  prerenderedOutOfCourtDisputeSettlement: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountIssue" }) as any as Schema.Schema<AccountIssue>;

export interface AlternateDisputeResolution {
  /** The URL pointing to a page, where merchant can request alternative dispute resolution with an [external body](https://support.google.com/european-union-digital-services-act-redress-options/answer/13535501). */
  uri?: string;
  /** The label for the alternate dispute resolution link. */
  label?: string;
}

export const AlternateDisputeResolution: Schema.Schema<AlternateDisputeResolution> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "AlternateDisputeResolution" }) as any as Schema.Schema<AlternateDisputeResolution>;

export interface RenderAccountIssuesResponse {
  /** List of account issues for a given account. This list can be shown with compressed, expandable items. In the compressed form, the title and impact should be shown for each issue. Once the issue is expanded, the detailed content and available actions should be rendered. */
  issues?: Array<AccountIssue>;
  /** Alternate Dispute Resolution (ADR) is deprecated. Use `prerendered_out_of_court_dispute_settlement` instead. */
  alternateDisputeResolution?: AlternateDisputeResolution;
}

export const RenderAccountIssuesResponse: Schema.Schema<RenderAccountIssuesResponse> = Schema.suspend(() => Schema.Struct({
  issues: Schema.optional(Schema.Array(AccountIssue)),
  alternateDisputeResolution: Schema.optional(AlternateDisputeResolution),
})).annotate({ identifier: "RenderAccountIssuesResponse" }) as any as Schema.Schema<RenderAccountIssuesResponse>;

export interface RenderProductIssuesRequestPayload {
  /** Optional. How the detailed content should be returned. Default option is to return the content as a pre-rendered HTML text. */
  contentOption?: "CONTENT_OPTION_UNSPECIFIED" | "PRE_RENDERED_HTML" | (string & {});
  /** Optional. How actions with user input form should be handled. If not provided, actions will be returned as links that points merchant to Merchant Center where they can request the action. */
  userInputActionOption?: "USER_INPUT_ACTION_RENDERING_OPTION_UNSPECIFIED" | "REDIRECT_TO_MERCHANT_CENTER" | "BUILT_IN_USER_INPUT_ACTIONS" | (string & {});
}

export const RenderProductIssuesRequestPayload: Schema.Schema<RenderProductIssuesRequestPayload> = Schema.suspend(() => Schema.Struct({
  contentOption: Schema.optional(Schema.String),
  userInputActionOption: Schema.optional(Schema.String),
})).annotate({ identifier: "RenderProductIssuesRequestPayload" }) as any as Schema.Schema<RenderProductIssuesRequestPayload>;

export interface ProductIssueImpact {
  /** Optional. Message summarizing the overall impact of the issue. If present, it should be rendered to the merchant. For example: "Limits visibility in France" */
  message?: string;
  /** The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** Detailed impact breakdown. Explains the types of restriction the issue has in different shopping destinations and territory. If present, it should be rendered to the merchant. Can be shown as a mouse over dropdown or a dialog. Each breakdown item represents a group of regions with the same impact details. */
  breakdowns?: Array<Breakdown>;
}

export const ProductIssueImpact: Schema.Schema<ProductIssueImpact> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  breakdowns: Schema.optional(Schema.Array(Breakdown)),
})).annotate({ identifier: "ProductIssueImpact" }) as any as Schema.Schema<ProductIssueImpact>;

export interface ProductIssue {
  /** Title of the issue. */
  title?: string;
  /** Clarifies the severity of the issue. The summarizing message, if present, should be shown right under the title for each issue. It helps merchants to quickly understand the impact of the issue. The detailed breakdown helps the merchant to fully understand the impact of the issue. It can be rendered as dialog that opens when the merchant mouse over the summarized impact statement. Issues with different severity can be styled differently. They may use a different color or icon to signal the difference between `ERROR`, `WARNING` and `INFO`. */
  impact?: ProductIssueImpact;
  /** Details of the issue as a pre-rendered HTML. HTML elements contain CSS classes that can be used to customize the style of the content. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `issue-detail` - top level container for the detail of the issue * `callout-banners` - section of the `issue-detail` with callout banners * `callout-banner` - single callout banner, inside `callout-banners` * `callout-banner-info` - callout with important information (default) * `callout-banner-warning` - callout with a warning * `callout-banner-error` - callout informing about an error (most severe) * `issue-content` - section of the `issue-detail`, contains multiple `content-element` * `content-element` - content element such as a list, link or paragraph, inside `issue-content` * `root-causes` - unordered list with items describing root causes of the issue, inside `issue-content` * `root-causes-intro` - intro text before the `root-causes` list, inside `issue-content` * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. * `content-moderation` - marks the paragraph that explains how the issue was identified. * `list-intro` - marks the paragraph that contains an intro for a list. This paragraph will be always followed by a list. * `new-element` - Present for new elements added to the pre-rendered content in the future. To make sure that a new content element does not break your style, you can hide everything with this class. */
  prerenderedContent?: string;
  /** A list of actionable steps that can be executed to solve the issue. An example is requesting a re-review or providing arguments when merchant disagrees with the issue. Actions that are supported in (your) third-party application can be rendered as buttons and should be available to merchant when they expand the issue. */
  actions?: Array<Action>;
  /** Pre-rendered HTML that contains a link to the external location where the ODS can be requested and instructions for how to request it. HTML elements contain CSS classes that can be used to customize the style of this snippet. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `ods-section`* - wrapper around the out-of-court dispute resolution section * `ods-description`* - intro text for the out-of-court dispute resolution. It may contain multiple segments and a link. * `ods-param`* - wrapper around the header-value pair for parameters that merchant may need to provide during the ODS process. * `ods-routing-id`* - ods param for the Routing ID. * `ods-reference-id`* - ods param for the Routing ID. * `ods-param-header`* - header for the ODS parameter * `ods-param-value`* - value of the ODS parameter. This value should be rendered in a way that it is easy for merchants to identify and copy. * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. */
  prerenderedOutOfCourtDisputeSettlement?: string;
}

export const ProductIssue: Schema.Schema<ProductIssue> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  impact: Schema.optional(ProductIssueImpact),
  prerenderedContent: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(Action)),
  prerenderedOutOfCourtDisputeSettlement: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductIssue" }) as any as Schema.Schema<ProductIssue>;

export interface RenderProductIssuesResponse {
  /** List of issues for a given product. This list can be shown with compressed, expandable items. In the compressed form, the title and impact should be shown for each issue. Once the issue is expanded, the detailed content and available actions should be rendered. */
  issues?: Array<ProductIssue>;
  /** Alternate Dispute Resolution (ADR) is deprecated. Use `prerendered_out_of_court_dispute_settlement` instead. */
  alternateDisputeResolution?: AlternateDisputeResolution;
}

export const RenderProductIssuesResponse: Schema.Schema<RenderProductIssuesResponse> = Schema.suspend(() => Schema.Struct({
  issues: Schema.optional(Schema.Array(ProductIssue)),
  alternateDisputeResolution: Schema.optional(AlternateDisputeResolution),
})).annotate({ identifier: "RenderProductIssuesResponse" }) as any as Schema.Schema<RenderProductIssuesResponse>;

export interface InputValueTextInputValue {
  /** Required. Text provided by the merchant. */
  value?: string;
}

export const InputValueTextInputValue: Schema.Schema<InputValueTextInputValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "InputValueTextInputValue" }) as any as Schema.Schema<InputValueTextInputValue>;

export interface InputValueChoiceInputValue {
  /** Required. Id of the option that was selected by the merchant. */
  choiceInputOptionId?: string;
}

export const InputValueChoiceInputValue: Schema.Schema<InputValueChoiceInputValue> = Schema.suspend(() => Schema.Struct({
  choiceInputOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "InputValueChoiceInputValue" }) as any as Schema.Schema<InputValueChoiceInputValue>;

export interface InputValueCheckboxInputValue {
  /** Required. True if the merchant checked the box field. False otherwise. */
  value?: boolean;
}

export const InputValueCheckboxInputValue: Schema.Schema<InputValueCheckboxInputValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "InputValueCheckboxInputValue" }) as any as Schema.Schema<InputValueCheckboxInputValue>;

export interface InputValue {
  /** Required. Id of the corresponding input field. */
  inputFieldId?: string;
  /** Value for text input field. */
  textInputValue?: InputValueTextInputValue;
  /** Value for choice input field. */
  choiceInputValue?: InputValueChoiceInputValue;
  /** Value for checkbox input field. */
  checkboxInputValue?: InputValueCheckboxInputValue;
}

export const InputValue: Schema.Schema<InputValue> = Schema.suspend(() => Schema.Struct({
  inputFieldId: Schema.optional(Schema.String),
  textInputValue: Schema.optional(InputValueTextInputValue),
  choiceInputValue: Schema.optional(InputValueChoiceInputValue),
  checkboxInputValue: Schema.optional(InputValueCheckboxInputValue),
})).annotate({ identifier: "InputValue" }) as any as Schema.Schema<InputValue>;

export interface ActionInput {
  /** Required. Id of the selected action flow. */
  actionFlowId?: string;
  /** Required. Values for input fields. */
  inputValues?: Array<InputValue>;
}

export const ActionInput: Schema.Schema<ActionInput> = Schema.suspend(() => Schema.Struct({
  actionFlowId: Schema.optional(Schema.String),
  inputValues: Schema.optional(Schema.Array(InputValue)),
})).annotate({ identifier: "ActionInput" }) as any as Schema.Schema<ActionInput>;

export interface TriggerActionPayload {
  /** Required. The context from the selected action. The value is obtained from rendered issues and needs to be sent back to identify the action that is being triggered. */
  actionContext?: string;
  /** Required. Input provided by the merchant. */
  actionInput?: ActionInput;
}

export const TriggerActionPayload: Schema.Schema<TriggerActionPayload> = Schema.suspend(() => Schema.Struct({
  actionContext: Schema.optional(Schema.String),
  actionInput: Schema.optional(ActionInput),
})).annotate({ identifier: "TriggerActionPayload" }) as any as Schema.Schema<TriggerActionPayload>;

export interface TriggerActionResponse {
  /** The message for merchant. */
  message?: string;
}

export const TriggerActionResponse: Schema.Schema<TriggerActionResponse> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "TriggerActionResponse" }) as any as Schema.Schema<TriggerActionResponse>;

export interface RegionPostalCodeAreaPostalCodeRange {
  /** Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: "94108", "9410*", "9*". */
  begin?: string;
  /** Optional. A postal code or a pattern of the form prefix* denoting the inclusive upper bound of the range defining the area. It must have the same length as postalCodeRangeBegin: if postalCodeRangeBegin is a postal code then postalCodeRangeEnd must be a postal code too; if postalCodeRangeBegin is a pattern then postalCodeRangeEnd must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching postalCodeRangeBegin. */
  end?: string;
}

export const RegionPostalCodeAreaPostalCodeRange: Schema.Schema<RegionPostalCodeAreaPostalCodeRange> = Schema.suspend(() => Schema.Struct({
  begin: Schema.optional(Schema.String),
  end: Schema.optional(Schema.String),
})).annotate({ identifier: "RegionPostalCodeAreaPostalCodeRange" }) as any as Schema.Schema<RegionPostalCodeAreaPostalCodeRange>;

export interface RegionPostalCodeArea {
  /** Required. CLDR territory code or the country the postal code group applies to. */
  regionCode?: string;
  /** Required. A range of postal codes. */
  postalCodes?: Array<RegionPostalCodeAreaPostalCodeRange>;
}

export const RegionPostalCodeArea: Schema.Schema<RegionPostalCodeArea> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  postalCodes: Schema.optional(Schema.Array(RegionPostalCodeAreaPostalCodeRange)),
})).annotate({ identifier: "RegionPostalCodeArea" }) as any as Schema.Schema<RegionPostalCodeArea>;

export interface RegionGeoTargetArea {
  /** Required. A non-empty list of [location IDs](https://developers.google.com/adwords/api/docs/appendix/geotargeting). They must all be of the same location type (e.g., state). */
  geotargetCriteriaIds?: Array<string>;
}

export const RegionGeoTargetArea: Schema.Schema<RegionGeoTargetArea> = Schema.suspend(() => Schema.Struct({
  geotargetCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RegionGeoTargetArea" }) as any as Schema.Schema<RegionGeoTargetArea>;

export interface Region {
  /** Output only. Immutable. The ID uniquely identifying each region. */
  regionId?: string;
  /** Output only. Immutable. Merchant that owns the region. */
  merchantId?: string;
  /** The display name of the region. */
  displayName?: string;
  /** A list of postal codes that defines the region area. */
  postalCodeArea?: RegionPostalCodeArea;
  /** A list of geotargets that defines the region area. */
  geotargetArea?: RegionGeoTargetArea;
  /** Output only. Indicates if the region is eligible to use in the Regional Inventory configuration. */
  regionalInventoryEligible?: boolean;
  /** Output only. Indicates if the region is eligible to use in the Shipping Services configuration. */
  shippingEligible?: boolean;
}

export const Region: Schema.Schema<Region> = Schema.suspend(() => Schema.Struct({
  regionId: Schema.optional(Schema.String),
  merchantId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  postalCodeArea: Schema.optional(RegionPostalCodeArea),
  geotargetArea: Schema.optional(RegionGeoTargetArea),
  regionalInventoryEligible: Schema.optional(Schema.Boolean),
  shippingEligible: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Region" }) as any as Schema.Schema<Region>;

export interface ListRegionsResponse {
  /** The regions from the specified merchant. */
  regions?: Array<Region>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListRegionsResponse: Schema.Schema<ListRegionsResponse> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(Region)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRegionsResponse" }) as any as Schema.Schema<ListRegionsResponse>;

export interface PriceAmount {
  /** The price represented as a number. */
  value?: string;
  /** The currency of the price. */
  currency?: string;
}

export const PriceAmount: Schema.Schema<PriceAmount> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
})).annotate({ identifier: "PriceAmount" }) as any as Schema.Schema<PriceAmount>;

export interface TimePeriod {
  /** The starting timestamp. */
  startTime?: string;
  /** The ending timestamp. */
  endTime?: string;
}

export const TimePeriod: Schema.Schema<TimePeriod> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimePeriod" }) as any as Schema.Schema<TimePeriod>;

export interface PromotionPromotionStatusDestinationStatus {
  /** The name of the destination. */
  destination?: string;
  /** The status for the specified destination. */
  status?: "STATE_UNSPECIFIED" | "IN_REVIEW" | "REJECTED" | "LIVE" | "STOPPED" | "EXPIRED" | "PENDING" | (string & {});
}

export const PromotionPromotionStatusDestinationStatus: Schema.Schema<PromotionPromotionStatusDestinationStatus> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "PromotionPromotionStatusDestinationStatus" }) as any as Schema.Schema<PromotionPromotionStatusDestinationStatus>;

export interface PromotionPromotionStatusPromotionIssue {
  /** Code of the issue. */
  code?: string;
  /** Explanation of the issue. */
  detail?: string;
}

export const PromotionPromotionStatusPromotionIssue: Schema.Schema<PromotionPromotionStatusPromotionIssue> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "PromotionPromotionStatusPromotionIssue" }) as any as Schema.Schema<PromotionPromotionStatusPromotionIssue>;

export interface PromotionPromotionStatus {
  /** The intended destinations for the promotion. */
  destinationStatuses?: Array<PromotionPromotionStatusDestinationStatus>;
  /** A list of issues associated with the promotion. */
  promotionIssue?: Array<PromotionPromotionStatusPromotionIssue>;
  /** Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  creationDate?: string;
  /** Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z" */
  lastUpdateDate?: string;
}

export const PromotionPromotionStatus: Schema.Schema<PromotionPromotionStatus> = Schema.suspend(() => Schema.Struct({
  destinationStatuses: Schema.optional(Schema.Array(PromotionPromotionStatusDestinationStatus)),
  promotionIssue: Schema.optional(Schema.Array(PromotionPromotionStatusPromotionIssue)),
  creationDate: Schema.optional(Schema.String),
  lastUpdateDate: Schema.optional(Schema.String),
})).annotate({ identifier: "PromotionPromotionStatus" }) as any as Schema.Schema<PromotionPromotionStatus>;

export interface Promotion {
  /** Output only. The REST promotion ID to uniquely identify the promotion. Content API methods that operate on promotions take this as their `promotionId` parameter. The REST ID for a promotion is of the form channel:contentLanguage:targetCountry:promotionId The `channel` field has a value of `"online"`, `"in_store"`, or `"online_in_store"`. */
  id?: string;
  /** Required. The target country used as part of the unique identifier. Can be `AU`, `CA`, `DE`, `FR`, `GB`, `IN`, `US`, `BR`, `ES`, `NL`, `JP`, `IT` or `KR`. */
  targetCountry?: string;
  /** Required. The content language used as part of the unique identifier. `en` content language is available for all target countries. `fr` content language is available for `CA` and `FR` target countries. `de` content language is available for `DE` target country. `nl` content language is available for `NL` target country. `it` content language is available for `IT` target country. `pt` content language is available for `BR` target country. `ja` content language is available for `JP` target country. `ko` content language is available for `KR` target country. */
  contentLanguage?: string;
  /** Required. The user provided promotion ID to uniquely identify the promotion. */
  promotionId?: string;
  /** Required. Applicability of the promotion to either all products or only specific products. */
  productApplicability?: "PRODUCT_APPLICABILITY_UNSPECIFIED" | "ALL_PRODUCTS" | "SPECIFIC_PRODUCTS" | (string & {});
  /** Required. Type of the promotion. */
  offerType?: "OFFER_TYPE_UNSPECIFIED" | "NO_CODE" | "GENERIC_CODE" | (string & {});
  /** Generic redemption code for the promotion. To be used with the `offerType` field. */
  genericRedemptionCode?: string;
  /** Required. Long title for the promotion. */
  longTitle?: string;
  /** String representation of the promotion effective dates. Deprecated. Use `promotion_effective_time_period` instead. */
  promotionEffectiveDates?: string;
  /** String representation of the promotion display dates. Deprecated. Use `promotion_display_time_period` instead. */
  promotionDisplayDates?: string;
  /** Required. Redemption channel for the promotion. At least one channel is required. */
  redemptionChannel?: Array<"REDEMPTION_CHANNEL_UNSPECIFIED" | "IN_STORE" | "ONLINE" | (string & {})>;
  /** Required. Coupon value type for the promotion. */
  couponValueType?: "COUPON_VALUE_TYPE_UNSPECIFIED" | "MONEY_OFF" | "PERCENT_OFF" | "BUY_M_GET_N_MONEY_OFF" | "BUY_M_GET_N_PERCENT_OFF" | "BUY_M_GET_MONEY_OFF" | "BUY_M_GET_PERCENT_OFF" | "FREE_GIFT" | "FREE_GIFT_WITH_VALUE" | "FREE_GIFT_WITH_ITEM_ID" | "FREE_SHIPPING_STANDARD" | "FREE_SHIPPING_OVERNIGHT" | "FREE_SHIPPING_TWO_DAY" | (string & {});
  /** Destination ID for the promotion. */
  promotionDestinationIds?: Array<string>;
  /** Product filter by item ID for the promotion. */
  itemId?: Array<string>;
  /** Product filter by brand for the promotion. */
  brand?: Array<string>;
  /** Product filter by item group ID for the promotion. */
  itemGroupId?: Array<string>;
  /** Product filter by product type for the promotion. */
  productType?: Array<string>;
  /** Product filter by item ID exclusion for the promotion. */
  itemIdExclusion?: Array<string>;
  /** Product filter by brand exclusion for the promotion. */
  brandExclusion?: Array<string>;
  /** Product filter by item group ID exclusion for the promotion. */
  itemGroupIdExclusion?: Array<string>;
  /** Product filter by product type exclusion for the promotion. */
  productTypeExclusion?: Array<string>;
  /** Minimum purchase amount for the promotion. */
  minimumPurchaseAmount?: PriceAmount;
  /** Minimum purchase quantity for the promotion. */
  minimumPurchaseQuantity?: number;
  /** Maximum purchase quantity for the promotion. */
  limitQuantity?: number;
  /** Maximum purchase value for the promotion. */
  limitValue?: PriceAmount;
  /** The percentage discount offered in the promotion. */
  percentOff?: number;
  /** The money off amount offered in the promotion. */
  moneyOffAmount?: PriceAmount;
  /** The number of items discounted in the promotion. */
  getThisQuantityDiscounted?: number;
  /** Free gift value for the promotion. */
  freeGiftValue?: PriceAmount;
  /** Free gift description for the promotion. */
  freeGiftDescription?: string;
  /** Free gift item ID for the promotion. */
  freeGiftItemId?: string;
  /** Shipping service names for the promotion. */
  shippingServiceNames?: Array<string>;
  /** Cost cap for the promotion. */
  moneyBudget?: PriceAmount;
  /** Order limit for the promotion. */
  orderLimit?: number;
  /** Required. `TimePeriod` representation of the promotion's effective dates. */
  promotionEffectiveTimePeriod?: TimePeriod;
  /** `TimePeriod` representation of the promotion's display dates. */
  promotionDisplayTimePeriod?: TimePeriod;
  /** Whether the promotion applies to all stores, or only specified stores. Local Inventory ads promotions throw an error if no store applicability is included. An INVALID_ARGUMENT error is thrown if store_applicability is set to ALL_STORES and store_code or score_code_exclusion is set to a value. */
  storeApplicability?: "STORE_APPLICABILITY_UNSPECIFIED" | "ALL_STORES" | "SPECIFIC_STORES" | (string & {});
  /** Store codes to include for the promotion. */
  storeCode?: Array<string>;
  /** Store codes to exclude for the promotion. */
  storeCodeExclusion?: Array<string>;
  /** URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no promo url is included. URL is used to confirm that the promotion is valid and can be redeemed. */
  promotionUrl?: string;
  /** Output only. The current status of the promotion. */
  promotionStatus?: PromotionPromotionStatus;
  /** The redemption restriction for the promotion. */
  redemptionRestriction?: "REDEMPTION_RESTRICTION_UNSPECIFIED" | "SUBSCRIBE_AND_SAVE" | "FIRST_ORDER" | "SIGN_UP_FOR_EMAIL" | "SIGN_UP_FOR_TEXT" | "FORMS_OF_PAYMENT" | "CUSTOM" | (string & {});
  /** The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set. */
  customRedemptionRestriction?: string;
  /** The maximum monetary discount a customer can receive for the promotion. This field is only supported with the `Percent off` coupon value type. */
  maxDiscountAmount?: PriceAmount;
}

export const Promotion: Schema.Schema<Promotion> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  promotionId: Schema.optional(Schema.String),
  productApplicability: Schema.optional(Schema.String),
  offerType: Schema.optional(Schema.String),
  genericRedemptionCode: Schema.optional(Schema.String),
  longTitle: Schema.optional(Schema.String),
  promotionEffectiveDates: Schema.optional(Schema.String),
  promotionDisplayDates: Schema.optional(Schema.String),
  redemptionChannel: Schema.optional(Schema.Array(Schema.String)),
  couponValueType: Schema.optional(Schema.String),
  promotionDestinationIds: Schema.optional(Schema.Array(Schema.String)),
  itemId: Schema.optional(Schema.Array(Schema.String)),
  brand: Schema.optional(Schema.Array(Schema.String)),
  itemGroupId: Schema.optional(Schema.Array(Schema.String)),
  productType: Schema.optional(Schema.Array(Schema.String)),
  itemIdExclusion: Schema.optional(Schema.Array(Schema.String)),
  brandExclusion: Schema.optional(Schema.Array(Schema.String)),
  itemGroupIdExclusion: Schema.optional(Schema.Array(Schema.String)),
  productTypeExclusion: Schema.optional(Schema.Array(Schema.String)),
  minimumPurchaseAmount: Schema.optional(PriceAmount),
  minimumPurchaseQuantity: Schema.optional(Schema.Number),
  limitQuantity: Schema.optional(Schema.Number),
  limitValue: Schema.optional(PriceAmount),
  percentOff: Schema.optional(Schema.Number),
  moneyOffAmount: Schema.optional(PriceAmount),
  getThisQuantityDiscounted: Schema.optional(Schema.Number),
  freeGiftValue: Schema.optional(PriceAmount),
  freeGiftDescription: Schema.optional(Schema.String),
  freeGiftItemId: Schema.optional(Schema.String),
  shippingServiceNames: Schema.optional(Schema.Array(Schema.String)),
  moneyBudget: Schema.optional(PriceAmount),
  orderLimit: Schema.optional(Schema.Number),
  promotionEffectiveTimePeriod: Schema.optional(TimePeriod),
  promotionDisplayTimePeriod: Schema.optional(TimePeriod),
  storeApplicability: Schema.optional(Schema.String),
  storeCode: Schema.optional(Schema.Array(Schema.String)),
  storeCodeExclusion: Schema.optional(Schema.Array(Schema.String)),
  promotionUrl: Schema.optional(Schema.String),
  promotionStatus: Schema.optional(PromotionPromotionStatus),
  redemptionRestriction: Schema.optional(Schema.String),
  customRedemptionRestriction: Schema.optional(Schema.String),
  maxDiscountAmount: Schema.optional(PriceAmount),
})).annotate({ identifier: "Promotion" }) as any as Schema.Schema<Promotion>;

export interface ListPromotionResponse {
  /** List of all available promotions for the merchant. */
  promotions?: Array<Promotion>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPromotionResponse: Schema.Schema<ListPromotionResponse> = Schema.suspend(() => Schema.Struct({
  promotions: Schema.optional(Schema.Array(Promotion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPromotionResponse" }) as any as Schema.Schema<ListPromotionResponse>;

export interface RecommendationDescription {
  /** Output only. Text of the description. */
  text?: string;
  /** Output only. Type of the description. */
  type?: "DESCRIPTION_TYPE_UNSPECIFIED" | "SHORT" | "LONG" | (string & {});
}

export const RecommendationDescription: Schema.Schema<RecommendationDescription> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "RecommendationDescription" }) as any as Schema.Schema<RecommendationDescription>;

export interface RecommendationCallToAction {
  /** Output only. Localized text of the CTA. Optional. */
  localizedText?: string;
  /** Output only. Intent of the action. This value describes the intent (for example, `OPEN_CREATE_EMAIL_CAMPAIGN_FLOW`) and can vary from recommendation to recommendation. This value can change over time for the same recommendation. Currently available intent values: - OPEN_CREATE_EMAIL_CAMPAIGN_FLOW: Opens a user journey where they can create a marketing email campaign. (No default URL) - OPEN_CREATE_COLLECTION_TAB: Opens a user journey where they can [create a collection](https://support.google.com/merchants/answer/9703228) for their Merchant account. (No default URL) */
  intent?: string;
  /** Optional. URL of the CTA. This field will only be set for some recommendations where there is a suggested landing URL. Otherwise it will be set to an empty string. We recommend developers to use their own custom landing page according to the description of the intent field above when this uri field is empty. */
  uri?: string;
}

export const RecommendationCallToAction: Schema.Schema<RecommendationCallToAction> = Schema.suspend(() => Schema.Struct({
  localizedText: Schema.optional(Schema.String),
  intent: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "RecommendationCallToAction" }) as any as Schema.Schema<RecommendationCallToAction>;

export interface RecommendationCreative {
  /** URL of the creative. */
  uri?: string;
  /** Type of the creative. */
  type?: "CREATIVE_TYPE_UNSPECIFIED" | "VIDEO" | "PHOTO" | (string & {});
}

export const RecommendationCreative: Schema.Schema<RecommendationCreative> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "RecommendationCreative" }) as any as Schema.Schema<RecommendationCreative>;

export interface Recommendation {
  /** Output only. Type of the recommendation. List of currently available recommendation types: - OPPORTUNITY_CREATE_NEW_COLLECTION - OPPORTUNITY_CREATE_EMAIL_CAMPAIGN */
  type?: string;
  /** Optional. Subtype of the recommendations. Only applicable when multiple recommendations can be generated per type, and is used as an identifier of recommendation under the same recommendation type. */
  subType?: string;
  /** Optional. Localized recommendation name. The localization uses the {@link `GenerateRecommendationsRequest.language_code`} field in {@link `GenerateRecommendationsRequest`} requests. */
  recommendationName?: string;
  /** Optional. Localized Recommendation Title. Localization uses the {@link `GenerateRecommendationsRequest.language_code`} field in {@link `GenerateRecommendationsRequest`} requests. */
  title?: string;
  /** Optional. Localized recommendation description. The localization the {@link `GenerateRecommendationsRequest.language_code`} field in {@link `GenerateRecommendationsRequest`} requests. */
  defaultDescription?: string;
  /** Output only. List of additional localized descriptions for a recommendation. Localication uses the `languageCode` field in `GenerateRecommendations` requests. Not all description types are guaranteed to be present and we recommend to rely on default description. */
  additionalDescriptions?: Array<RecommendationDescription>;
  /** Optional. Default CTA of the recommendation. */
  defaultCallToAction?: RecommendationCallToAction;
  /** Output only. CTAs of this recommendation. Repeated. */
  additionalCallToAction?: Array<RecommendationCallToAction>;
  /** Optional. Indicates whether a user needs to pay when they complete the user journey suggested by the recommendation. */
  paid?: boolean;
  /** Output only. Any creatives attached to the recommendation. Repeated. */
  creative?: Array<RecommendationCreative>;
  /** Optional. A numerical score of the impact from the recommendation's description. For example, a recommendation might suggest an upward trend in sales for a certain product. Higher number means larger impact. */
  numericalImpact?: number;
}

export const Recommendation: Schema.Schema<Recommendation> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  subType: Schema.optional(Schema.String),
  recommendationName: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  defaultDescription: Schema.optional(Schema.String),
  additionalDescriptions: Schema.optional(Schema.Array(RecommendationDescription)),
  defaultCallToAction: Schema.optional(RecommendationCallToAction),
  additionalCallToAction: Schema.optional(Schema.Array(RecommendationCallToAction)),
  paid: Schema.optional(Schema.Boolean),
  creative: Schema.optional(Schema.Array(RecommendationCreative)),
  numericalImpact: Schema.optional(Schema.Number),
})).annotate({ identifier: "Recommendation" }) as any as Schema.Schema<Recommendation>;

export interface GenerateRecommendationsResponse {
  /** Recommendations generated for a request. */
  recommendations?: Array<Recommendation>;
  /** Output only. Response token is a string created for each `GenerateRecommendationsResponse`. This token doesn't expire, and is globally unique. This token must be used when reporting interactions for recommendations. */
  responseToken?: string;
}

export const GenerateRecommendationsResponse: Schema.Schema<GenerateRecommendationsResponse> = Schema.suspend(() => Schema.Struct({
  recommendations: Schema.optional(Schema.Array(Recommendation)),
  responseToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateRecommendationsResponse" }) as any as Schema.Schema<GenerateRecommendationsResponse>;

export interface ReportInteractionRequest {
  /** Required. Type of the interaction that is reported, for example INTERACTION_CLICK. */
  interactionType?: "INTERACTION_TYPE_UNSPECIFIED" | "INTERACTION_DISMISS" | "INTERACTION_CLICK" | (string & {});
  /** Required. Token of the response when recommendation was returned. */
  responseToken?: string;
  /** Required. Type of the recommendations on which this interaction happened. This field must be set only to the value that is returned by {@link `GenerateRecommendationsResponse`} call. */
  type?: string;
  /** Optional. Subtype of the recommendations this interaction happened on. This field must be set only to the value that is returned by {@link `RecommendationsService.GenerateRecommendations`} call. */
  subtype?: string;
}

export const ReportInteractionRequest: Schema.Schema<ReportInteractionRequest> = Schema.suspend(() => Schema.Struct({
  interactionType: Schema.optional(Schema.String),
  responseToken: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  subtype: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportInteractionRequest" }) as any as Schema.Schema<ReportInteractionRequest>;

export interface ReturnPolicyOnlinePolicy {
  /** Policy type. */
  type?: "TYPE_UNSPECIFIED" | "NUMBER_OF_DAYS_AFTER_DELIVERY" | "NO_RETURNS" | "LIFETIME_RETURNS" | (string & {});
  /** The number of days items can be returned after delivery, where one day is defined to be 24 hours after the delivery timestamp. Required for `numberOfDaysAfterDelivery` returns. */
  days?: string;
}

export const ReturnPolicyOnlinePolicy: Schema.Schema<ReturnPolicyOnlinePolicy> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  days: Schema.optional(Schema.String),
})).annotate({ identifier: "ReturnPolicyOnlinePolicy" }) as any as Schema.Schema<ReturnPolicyOnlinePolicy>;

export interface ReturnPolicyOnlineRestockingFee {
  /** Fixed restocking fee. */
  fixedFee?: PriceAmount;
  /** Percent of total price in micros. 15,000,000 means 15% of the total price would be charged. */
  microPercent?: number;
}

export const ReturnPolicyOnlineRestockingFee: Schema.Schema<ReturnPolicyOnlineRestockingFee> = Schema.suspend(() => Schema.Struct({
  fixedFee: Schema.optional(PriceAmount),
  microPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "ReturnPolicyOnlineRestockingFee" }) as any as Schema.Schema<ReturnPolicyOnlineRestockingFee>;

export interface ReturnPolicyOnlineReturnShippingFee {
  /** Type of return shipping fee. */
  type?: "TYPE_UNSPECIFIED" | "FIXED" | "CUSTOMER_PAYING_ACTUAL_FEE" | (string & {});
  /** Fixed return shipping fee amount. This value is only applicable when type is FIXED. We will treat the return shipping fee as free if type is FIXED and this value is not set. */
  fixedFee?: PriceAmount;
}

export const ReturnPolicyOnlineReturnShippingFee: Schema.Schema<ReturnPolicyOnlineReturnShippingFee> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  fixedFee: Schema.optional(PriceAmount),
})).annotate({ identifier: "ReturnPolicyOnlineReturnShippingFee" }) as any as Schema.Schema<ReturnPolicyOnlineReturnShippingFee>;

export interface ReturnPolicyOnlineReturnReasonCategoryInfo {
  /** The return reason category. */
  returnReasonCategory?: "RETURN_REASON_CATEGORY_UNSPECIFIED" | "BUYER_REMORSE" | "ITEM_DEFECT" | (string & {});
  /** The corresponding return label source. If the `ReturnMethod` field includes `BY_MAIL`, it is required to specify `ReturnLabelSource` for both `BUYER_REMORSE` and `ITEM_DEFECT` return reason categories. */
  returnLabelSource?: "RETURN_LABEL_SOURCE_UNSPECIFIED" | "DOWNLOAD_AND_PRINT" | "IN_THE_BOX" | "CUSTOMER_RESPONSIBILITY" | (string & {});
  /** The corresponding return shipping fee. This is only applicable when returnLabelSource is not the customer's responsibility. */
  returnShippingFee?: ReturnPolicyOnlineReturnShippingFee;
}

export const ReturnPolicyOnlineReturnReasonCategoryInfo: Schema.Schema<ReturnPolicyOnlineReturnReasonCategoryInfo> = Schema.suspend(() => Schema.Struct({
  returnReasonCategory: Schema.optional(Schema.String),
  returnLabelSource: Schema.optional(Schema.String),
  returnShippingFee: Schema.optional(ReturnPolicyOnlineReturnShippingFee),
})).annotate({ identifier: "ReturnPolicyOnlineReturnReasonCategoryInfo" }) as any as Schema.Schema<ReturnPolicyOnlineReturnReasonCategoryInfo>;

export interface ReturnPolicyOnline {
  /** Output only. Return policy ID generated by Google. */
  returnPolicyId?: string;
  /** The unique user-defined label of the return policy. The same label cannot be used in different return policies for the same country. Policies with the label 'default' will apply to all products, unless a product specifies a return_policy_label attribute. */
  label?: string;
  /** The countries of sale where the return policy is applicable. The values must be a valid 2 letter ISO 3166 code, e.g. "US". */
  countries?: Array<string>;
  /** The name of the policy as shown in Merchant Center. */
  name?: string;
  /** The return policy. */
  policy?: ReturnPolicyOnlinePolicy;
  /** The restocking fee that applies to all return reason categories. This would be treated as a free restocking fee if the value is not set. */
  restockingFee?: ReturnPolicyOnlineRestockingFee;
  /** The return methods of how customers can return an item. This value is required to not be empty unless the type of return policy is noReturns. */
  returnMethods?: Array<"RETURN_METHOD_UNSPECIFIED" | "BY_MAIL" | "IN_STORE" | "AT_A_KIOSK" | (string & {})>;
  /** The item conditions that are accepted for returns. This is required to not be empty unless the type of return policy is noReturns. */
  itemConditions?: Array<"ITEM_CONDITION_UNSPECIFIED" | "NEW" | "USED" | (string & {})>;
  /** The return reason category information. This required to not be empty unless the type of return policy is noReturns. */
  returnReasonCategoryInfo?: Array<ReturnPolicyOnlineReturnReasonCategoryInfo>;
  /** The return policy uri. This can used by Google to do a sanity check for the policy. */
  returnPolicyUri?: string;
}

export const ReturnPolicyOnline: Schema.Schema<ReturnPolicyOnline> = Schema.suspend(() => Schema.Struct({
  returnPolicyId: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  countries: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  policy: Schema.optional(ReturnPolicyOnlinePolicy),
  restockingFee: Schema.optional(ReturnPolicyOnlineRestockingFee),
  returnMethods: Schema.optional(Schema.Array(Schema.String)),
  itemConditions: Schema.optional(Schema.Array(Schema.String)),
  returnReasonCategoryInfo: Schema.optional(Schema.Array(ReturnPolicyOnlineReturnReasonCategoryInfo)),
  returnPolicyUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ReturnPolicyOnline" }) as any as Schema.Schema<ReturnPolicyOnline>;

export interface ListReturnPolicyOnlineResponse {
  /** The retrieved return policies. */
  returnPolicies?: Array<ReturnPolicyOnline>;
}

export const ListReturnPolicyOnlineResponse: Schema.Schema<ListReturnPolicyOnlineResponse> = Schema.suspend(() => Schema.Struct({
  returnPolicies: Schema.optional(Schema.Array(ReturnPolicyOnline)),
})).annotate({ identifier: "ListReturnPolicyOnlineResponse" }) as any as Schema.Schema<ListReturnPolicyOnlineResponse>;

export interface TimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface DateTime {
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
  /** Time zone. */
  timeZone?: TimeZone;
}

export const DateTime: Schema.Schema<DateTime> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  utcOffset: Schema.optional(Schema.String),
  timeZone: Schema.optional(TimeZone),
})).annotate({ identifier: "DateTime" }) as any as Schema.Schema<DateTime>;

export interface OrderTrackingSignalShippingInfo {
  /** Required. The shipment ID. This field will be hashed in returned OrderTrackingSignal creation response. */
  shipmentId?: string;
  /** The tracking ID of the shipment. This field is required if one of the following fields is absent: earliest_delivery_promise_time, latest_delivery_promise_time, and actual_delivery_time. */
  trackingId?: string;
  /** The name of the shipping carrier for the delivery. This field is required if one of the following fields is absent: earliest_delivery_promise_time, latest_delivery_promise_time, and actual_delivery_time. */
  carrierName?: string;
  /** The service type for fulfillment, e.g., GROUND, FIRST_CLASS, etc. */
  carrierServiceName?: string;
  /** The time when the shipment was shipped. Include the year and timezone string, if available. */
  shippedTime?: DateTime;
  /** The earliest delivery promised time. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  earliestDeliveryPromiseTime?: DateTime;
  /** The latest delivery promised time. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  latestDeliveryPromiseTime?: DateTime;
  /** The time when the shipment was actually delivered. Include the year and timezone string, if available. This field is required, if one of the following fields is absent: tracking_id or carrier_name. */
  actualDeliveryTime?: DateTime;
  /** The status of the shipment. */
  shippingStatus?: "SHIPPING_STATE_UNSPECIFIED" | "SHIPPED" | "DELIVERED" | (string & {});
  /** The origin postal code, as a continuous string without spaces or dashes, e.g. "95016". This field will be anonymized in returned OrderTrackingSignal creation response. */
  originPostalCode?: string;
  /** The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the shipping origin. */
  originRegionCode?: string;
}

export const OrderTrackingSignalShippingInfo: Schema.Schema<OrderTrackingSignalShippingInfo> = Schema.suspend(() => Schema.Struct({
  shipmentId: Schema.optional(Schema.String),
  trackingId: Schema.optional(Schema.String),
  carrierName: Schema.optional(Schema.String),
  carrierServiceName: Schema.optional(Schema.String),
  shippedTime: Schema.optional(DateTime),
  earliestDeliveryPromiseTime: Schema.optional(DateTime),
  latestDeliveryPromiseTime: Schema.optional(DateTime),
  actualDeliveryTime: Schema.optional(DateTime),
  shippingStatus: Schema.optional(Schema.String),
  originPostalCode: Schema.optional(Schema.String),
  originRegionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "OrderTrackingSignalShippingInfo" }) as any as Schema.Schema<OrderTrackingSignalShippingInfo>;

export interface OrderTrackingSignalLineItemDetails {
  /** Required. The ID for this line item. */
  lineItemId?: string;
  /** Required. The Content API REST ID of the product, in the form channel:contentLanguage:targetCountry:offerId. */
  productId?: string;
  /** The Global Trade Item Number. */
  gtin?: string;
  /** The manufacturer part number. */
  mpn?: string;
  /** Universal product code for this item (deprecated: Please use GTIN instead). */
  upc?: string;
  /** Merchant SKU for this item (deprecated). */
  sku?: string;
  /** Plain text description of this product (deprecated: Please use product_title instead). */
  productDescription?: string;
  /** Plain text title of this product. */
  productTitle?: string;
  /** Brand of the product. */
  brand?: string;
  /** The quantity of the line item in the order. */
  quantity?: string;
}

export const OrderTrackingSignalLineItemDetails: Schema.Schema<OrderTrackingSignalLineItemDetails> = Schema.suspend(() => Schema.Struct({
  lineItemId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  mpn: Schema.optional(Schema.String),
  upc: Schema.optional(Schema.String),
  sku: Schema.optional(Schema.String),
  productDescription: Schema.optional(Schema.String),
  productTitle: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.String),
})).annotate({ identifier: "OrderTrackingSignalLineItemDetails" }) as any as Schema.Schema<OrderTrackingSignalLineItemDetails>;

export interface OrderTrackingSignalShipmentLineItemMapping {
  /** Required. The shipment ID. This field will be hashed in returned OrderTrackingSignal creation response. */
  shipmentId?: string;
  /** Required. The line item ID. */
  lineItemId?: string;
  /** The line item quantity in the shipment. */
  quantity?: string;
}

export const OrderTrackingSignalShipmentLineItemMapping: Schema.Schema<OrderTrackingSignalShipmentLineItemMapping> = Schema.suspend(() => Schema.Struct({
  shipmentId: Schema.optional(Schema.String),
  lineItemId: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.String),
})).annotate({ identifier: "OrderTrackingSignalShipmentLineItemMapping" }) as any as Schema.Schema<OrderTrackingSignalShipmentLineItemMapping>;

export interface OrderTrackingSignal {
  /** Output only. The ID that uniquely identifies this order tracking signal. */
  orderTrackingSignalId?: string;
  /** The Google merchant ID of this order tracking signal. This value is optional. If left unset, the caller's merchant ID is used. You must request access in order to provide data on behalf of another merchant. For more information, see [Submitting Order Tracking Signals](/shopping-content/guides/order-tracking-signals). */
  merchantId?: string;
  /** Required. The time when the order was created on the merchant side. Include the year and timezone string, if available. */
  orderCreatedTime?: DateTime;
  /** Required. The ID of the order on the merchant side. This field will be hashed in returned OrderTrackingSignal creation response. */
  orderId?: string;
  /** The shipping information for the order. */
  shippingInfo?: Array<OrderTrackingSignalShippingInfo>;
  /** Information about line items in the order. */
  lineItems?: Array<OrderTrackingSignalLineItemDetails>;
  /** The mapping of the line items to the shipment information. */
  shipmentLineItemMapping?: Array<OrderTrackingSignalShipmentLineItemMapping>;
  /** The shipping fee of the order; this value should be set to zero in the case of free shipping. */
  customerShippingFee?: PriceAmount;
  /** Required. The delivery postal code, as a continuous string without spaces or dashes, e.g. "95016". This field will be anonymized in returned OrderTrackingSignal creation response. */
  deliveryPostalCode?: string;
  /** Required. The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the shipping destination. */
  deliveryRegionCode?: string;
}

export const OrderTrackingSignal: Schema.Schema<OrderTrackingSignal> = Schema.suspend(() => Schema.Struct({
  orderTrackingSignalId: Schema.optional(Schema.String),
  merchantId: Schema.optional(Schema.String),
  orderCreatedTime: Schema.optional(DateTime),
  orderId: Schema.optional(Schema.String),
  shippingInfo: Schema.optional(Schema.Array(OrderTrackingSignalShippingInfo)),
  lineItems: Schema.optional(Schema.Array(OrderTrackingSignalLineItemDetails)),
  shipmentLineItemMapping: Schema.optional(Schema.Array(OrderTrackingSignalShipmentLineItemMapping)),
  customerShippingFee: Schema.optional(PriceAmount),
  deliveryPostalCode: Schema.optional(Schema.String),
  deliveryRegionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "OrderTrackingSignal" }) as any as Schema.Schema<OrderTrackingSignal>;

export interface ProductId {
  /** The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`. */
  productId?: string;
}

export const ProductId: Schema.Schema<ProductId> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductId" }) as any as Schema.Schema<ProductId>;

export interface DeliveryAreaPostalCodeRange {
  /** Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`. */
  firstPostalCode?: string;
  /** A postal code or a pattern of the form prefix* denoting the inclusive upper bound of the range defining the area (for example [070* - 078*] results in the range [07000 - 07899]). It must have the same length as `firstPostalCode`: if `firstPostalCode` is a postal code then `lastPostalCode` must be a postal code too; if firstPostalCode is a pattern then `lastPostalCode` must be a pattern with the same prefix length. Ignored if not set, then the area is defined as being all the postal codes matching `firstPostalCode`. */
  lastPostalCode?: string;
}

export const DeliveryAreaPostalCodeRange: Schema.Schema<DeliveryAreaPostalCodeRange> = Schema.suspend(() => Schema.Struct({
  firstPostalCode: Schema.optional(Schema.String),
  lastPostalCode: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryAreaPostalCodeRange" }) as any as Schema.Schema<DeliveryAreaPostalCodeRange>;

export interface DeliveryArea {
  /** Required. The country that the product can be delivered to. Submit a [unicode CLDR region](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) such as `US` or `CH`. */
  countryCode?: string;
  /** A postal code, postal code range or postal code prefix that defines this area. Limited to US and AUS. */
  postalCodeRange?: DeliveryAreaPostalCodeRange;
  /** A state, territory, or prefecture. This is supported for the United States, Australia, and Japan. Provide a subdivision code from the ISO 3166-2 code tables ([US](https://en.wikipedia.org/wiki/ISO_3166-2:US), [AU](https://en.wikipedia.org/wiki/ISO_3166-2:AU), or [JP](https://en.wikipedia.org/wiki/ISO_3166-2:JP)) without country prefix (for example, `"NY"`, `"NSW"`, `"03"`). */
  regionCode?: string;
}

export const DeliveryArea: Schema.Schema<DeliveryArea> = Schema.suspend(() => Schema.Struct({
  countryCode: Schema.optional(Schema.String),
  postalCodeRange: Schema.optional(DeliveryAreaPostalCodeRange),
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryArea" }) as any as Schema.Schema<DeliveryArea>;

export interface ProductDeliveryTimeAreaDeliveryTimeDeliveryTime {
  /** Required. The minimum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0. */
  minHandlingTimeDays?: number;
  /** Required. The maximum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0. */
  maxHandlingTimeDays?: number;
  /** Required. The minimum number of business days (inclusive) between when the product ships and when the product is delivered. */
  minTransitTimeDays?: number;
  /** Required. The maximum number of business days (inclusive) between when the product ships and when the product is delivered. */
  maxTransitTimeDays?: number;
}

export const ProductDeliveryTimeAreaDeliveryTimeDeliveryTime: Schema.Schema<ProductDeliveryTimeAreaDeliveryTimeDeliveryTime> = Schema.suspend(() => Schema.Struct({
  minHandlingTimeDays: Schema.optional(Schema.Number),
  maxHandlingTimeDays: Schema.optional(Schema.Number),
  minTransitTimeDays: Schema.optional(Schema.Number),
  maxTransitTimeDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProductDeliveryTimeAreaDeliveryTimeDeliveryTime" }) as any as Schema.Schema<ProductDeliveryTimeAreaDeliveryTimeDeliveryTime>;

export interface ProductDeliveryTimeAreaDeliveryTime {
  /** Required. The delivery area associated with `deliveryTime` for this product. */
  deliveryArea?: DeliveryArea;
  /** Required. The delivery time associated with `deliveryArea` for this product. */
  deliveryTime?: ProductDeliveryTimeAreaDeliveryTimeDeliveryTime;
}

export const ProductDeliveryTimeAreaDeliveryTime: Schema.Schema<ProductDeliveryTimeAreaDeliveryTime> = Schema.suspend(() => Schema.Struct({
  deliveryArea: Schema.optional(DeliveryArea),
  deliveryTime: Schema.optional(ProductDeliveryTimeAreaDeliveryTimeDeliveryTime),
})).annotate({ identifier: "ProductDeliveryTimeAreaDeliveryTime" }) as any as Schema.Schema<ProductDeliveryTimeAreaDeliveryTime>;

export interface ProductDeliveryTime {
  /** Required. The `id` of the product. */
  productId?: ProductId;
  /** Required. A set of associations between `DeliveryArea` and `DeliveryTime` entries. The total number of `areaDeliveryTimes` can be at most 100. */
  areaDeliveryTimes?: Array<ProductDeliveryTimeAreaDeliveryTime>;
}

export const ProductDeliveryTime: Schema.Schema<ProductDeliveryTime> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(ProductId),
  areaDeliveryTimes: Schema.optional(Schema.Array(ProductDeliveryTimeAreaDeliveryTime)),
})).annotate({ identifier: "ProductDeliveryTime" }) as any as Schema.Schema<ProductDeliveryTime>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns information about the authenticated user. */
export interface AuthinfoAccountsRequest {
}

export const AuthinfoAccountsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "accounts/authinfo" }),
  svc,
) as unknown as Schema.Schema<AuthinfoAccountsRequest>;

export type AuthinfoAccountsResponse = AccountsAuthInfoResponse;
export const AuthinfoAccountsResponse = AccountsAuthInfoResponse;

export type AuthinfoAccountsError = CommonErrors;

export const authinfoAccounts: API.OperationMethod<AuthinfoAccountsRequest, AuthinfoAccountsResponse, AuthinfoAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AuthinfoAccountsRequest,
  output: AuthinfoAccountsResponse,
  errors: [],
}));

/** Claims the website of a Merchant Center sub-account. Merchant accounts with approved third-party CSSs aren't required to claim a website. */
export interface ClaimwebsiteAccountsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account whose website is claimed. */
  accountId: string;
  /** Only available to selected merchants, for example multi-client accounts (MCAs) and their sub-accounts. When set to `True`, this option removes any existing claim on the requested website and replaces it with a claim from the account that makes the request. */
  overwrite?: boolean;
}

export const ClaimwebsiteAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  overwrite: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("overwrite")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts/{accountId}/claimwebsite", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClaimwebsiteAccountsRequest>;

export type ClaimwebsiteAccountsResponse = AccountsClaimWebsiteResponse;
export const ClaimwebsiteAccountsResponse = AccountsClaimWebsiteResponse;

export type ClaimwebsiteAccountsError = CommonErrors;

export const claimwebsiteAccounts: API.OperationMethod<ClaimwebsiteAccountsRequest, ClaimwebsiteAccountsResponse, ClaimwebsiteAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClaimwebsiteAccountsRequest,
  output: ClaimwebsiteAccountsResponse,
  errors: [],
}));

/** Retrieves, inserts, updates, and deletes multiple Merchant Center (sub-)accounts in a single request. */
export interface CustombatchAccountsRequest {
  /** Request body */
  body?: AccountsCustomBatchRequest;
}

export const CustombatchAccountsRequest = Schema.Struct({
  body: Schema.optional(AccountsCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "accounts/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchAccountsRequest>;

export type CustombatchAccountsResponse = AccountsCustomBatchResponse;
export const CustombatchAccountsResponse = AccountsCustomBatchResponse;

export type CustombatchAccountsError = CommonErrors;

export const custombatchAccounts: API.OperationMethod<CustombatchAccountsRequest, CustombatchAccountsResponse, CustombatchAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchAccountsRequest,
  output: CustombatchAccountsResponse,
  errors: [],
}));

/** Deletes a Merchant Center sub-account. */
export interface DeleteAccountsRequest {
  /** The ID of the managing account. This must be a multi-client account, and accountId must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account. */
  accountId: string;
  /** Option to delete sub-accounts with products. The default value is false. */
  force?: boolean;
}

export const DeleteAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/accounts/{accountId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRequest>;

export interface DeleteAccountsResponse {}
export const DeleteAccountsResponse: Schema.Schema<DeleteAccountsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsResponse>;

export type DeleteAccountsError = CommonErrors;

export const deleteAccounts: API.OperationMethod<DeleteAccountsRequest, DeleteAccountsResponse, DeleteAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsRequest,
  output: DeleteAccountsResponse,
  errors: [],
}));

/** Retrieves a Merchant Center account. */
export interface GetAccountsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account. */
  accountId: string;
  /** Controls which fields will be populated. Acceptable values are: "merchant" and "css". The default value is "merchant". */
  view?: "MERCHANT" | "CSS" | (string & {});
}

export const GetAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounts/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Creates a Merchant Center sub-account. */
export interface InsertAccountsRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Account;
}

export const InsertAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAccountsRequest>;

export type InsertAccountsResponse = Account;
export const InsertAccountsResponse = Account;

export type InsertAccountsError = CommonErrors;

export const insertAccounts: API.OperationMethod<InsertAccountsRequest, InsertAccountsResponse, InsertAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAccountsRequest,
  output: InsertAccountsResponse,
  errors: [],
}));

/** Performs an action on a link between two Merchant Center accounts, namely accountId and linkedAccountId. */
export interface LinkAccountsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account that should be linked. */
  accountId: string;
  /** Request body */
  body?: AccountsLinkRequest;
}

export const LinkAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AccountsLinkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts/{accountId}/link", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LinkAccountsRequest>;

export type LinkAccountsResponse = AccountsLinkResponse;
export const LinkAccountsResponse = AccountsLinkResponse;

export type LinkAccountsError = CommonErrors;

export const linkAccounts: API.OperationMethod<LinkAccountsRequest, LinkAccountsResponse, LinkAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LinkAccountsRequest,
  output: LinkAccountsResponse,
  errors: [],
}));

/** Lists the sub-accounts in your Merchant Center account. */
export interface ListAccountsRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The maximum number of accounts to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** Controls which fields will be populated. Acceptable values are: "merchant" and "css". The default value is "merchant". */
  view?: "MERCHANT" | "CSS" | (string & {});
  /** If view is set to "css", only return accounts that are assigned label with given ID. */
  label?: string;
  /** If set, only the accounts with the given name (case sensitive) will be returned. */
  name?: string;
}

export const ListAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  label: Schema.optional(Schema.String).pipe(T.HttpQuery("label")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = AccountsListResponse;
export const ListAccountsResponse = AccountsListResponse;

export type ListAccountsError = CommonErrors;

export const listAccounts = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the list of accounts linked to your Merchant Center account. */
export interface ListlinksAccountsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to list links. */
  accountId: string;
  /** The maximum number of links to return in the response, used for pagination. The minimum allowed value is 5 results per page. If provided value is lower than 5, it will be automatically increased to 5. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListlinksAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounts/{accountId}/listlinks" }),
  svc,
) as unknown as Schema.Schema<ListlinksAccountsRequest>;

export type ListlinksAccountsResponse = AccountsListLinksResponse;
export const ListlinksAccountsResponse = AccountsListLinksResponse;

export type ListlinksAccountsError = CommonErrors;

export const listlinksAccounts = API.makePaginated(() => ({
  input: ListlinksAccountsRequest,
  output: ListlinksAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a Merchant Center account. Any fields that are not provided are deleted from the resource. */
export interface UpdateAccountsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account. */
  accountId: string;
  /** Request body */
  body?: Account;
}

export const UpdateAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{merchantId}/accounts/{accountId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsRequest>;

export type UpdateAccountsResponse = Account;
export const UpdateAccountsResponse = Account;

export type UpdateAccountsError = CommonErrors;

export const updateAccounts: API.OperationMethod<UpdateAccountsRequest, UpdateAccountsResponse, UpdateAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsRequest,
  output: UpdateAccountsResponse,
  errors: [],
}));

/** Updates labels that are assigned to the Merchant Center account by CSS user. */
export interface UpdatelabelsAccountsRequest {
  /** The ID of the managing account. */
  merchantId: string;
  /** The ID of the account whose labels are updated. */
  accountId: string;
  /** Request body */
  body?: AccountsUpdateLabelsRequest;
}

export const UpdatelabelsAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AccountsUpdateLabelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts/{accountId}/updatelabels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatelabelsAccountsRequest>;

export type UpdatelabelsAccountsResponse = AccountsUpdateLabelsResponse;
export const UpdatelabelsAccountsResponse = AccountsUpdateLabelsResponse;

export type UpdatelabelsAccountsError = CommonErrors;

export const updatelabelsAccounts: API.OperationMethod<UpdatelabelsAccountsRequest, UpdatelabelsAccountsResponse, UpdatelabelsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatelabelsAccountsRequest,
  output: UpdatelabelsAccountsResponse,
  errors: [],
}));

/** Request verification code to start phone verification. */
export interface RequestphoneverificationAccountsRequest {
  /** Required. The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Required. The ID of the account. */
  accountId: string;
  /** Request body */
  body?: RequestPhoneVerificationRequest;
}

export const RequestphoneverificationAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(RequestPhoneVerificationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts/{accountId}/requestphoneverification", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestphoneverificationAccountsRequest>;

export type RequestphoneverificationAccountsResponse = RequestPhoneVerificationResponse;
export const RequestphoneverificationAccountsResponse = RequestPhoneVerificationResponse;

export type RequestphoneverificationAccountsError = CommonErrors;

export const requestphoneverificationAccounts: API.OperationMethod<RequestphoneverificationAccountsRequest, RequestphoneverificationAccountsResponse, RequestphoneverificationAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestphoneverificationAccountsRequest,
  output: RequestphoneverificationAccountsResponse,
  errors: [],
}));

/** Validates verification code to verify phone number for the account. If successful this will overwrite the value of `accounts.businessinformation.phoneNumber`. Only verified phone number will replace an existing verified phone number. */
export interface VerifyphonenumberAccountsRequest {
  /** Required. The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account. */
  merchantId: string;
  /** Required. The ID of the account. */
  accountId: string;
  /** Request body */
  body?: VerifyPhoneNumberRequest;
}

export const VerifyphonenumberAccountsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(VerifyPhoneNumberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/accounts/{accountId}/verifyphonenumber", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyphonenumberAccountsRequest>;

export type VerifyphonenumberAccountsResponse = VerifyPhoneNumberResponse;
export const VerifyphonenumberAccountsResponse = VerifyPhoneNumberResponse;

export type VerifyphonenumberAccountsError = CommonErrors;

export const verifyphonenumberAccounts: API.OperationMethod<VerifyphonenumberAccountsRequest, VerifyphonenumberAccountsResponse, VerifyphonenumberAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyphonenumberAccountsRequest,
  output: VerifyphonenumberAccountsResponse,
  errors: [],
}));

/** Uploads credentials for the Merchant Center account. If credentials already exist for this Merchant Center account and purpose, this method updates them. */
export interface CreateAccountsCredentialsRequest {
  /** Required. The merchant id of the account these credentials belong to. */
  accountId: string;
  /** Request body */
  body?: AccountCredentials;
}

export const CreateAccountsCredentialsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AccountCredentials).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "accounts/{accountId}/credentials", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsCredentialsRequest>;

export type CreateAccountsCredentialsResponse = AccountCredentials;
export const CreateAccountsCredentialsResponse = AccountCredentials;

export type CreateAccountsCredentialsError = CommonErrors;

export const createAccountsCredentials: API.OperationMethod<CreateAccountsCredentialsRequest, CreateAccountsCredentialsResponse, CreateAccountsCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsCredentialsRequest,
  output: CreateAccountsCredentialsResponse,
  errors: [],
}));

/** Lists the labels assigned to an account. */
export interface ListAccountsLabelsRequest {
  /** Required. The account id for whose labels are to be listed. */
  accountId: string;
  /** The maximum number of labels to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListAccountLabels` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountLabels` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsLabelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "accounts/{accountId}/labels" }),
  svc,
) as unknown as Schema.Schema<ListAccountsLabelsRequest>;

export type ListAccountsLabelsResponse = ListAccountLabelsResponse;
export const ListAccountsLabelsResponse = ListAccountLabelsResponse;

export type ListAccountsLabelsError = CommonErrors;

export const listAccountsLabels = API.makePaginated(() => ({
  input: ListAccountsLabelsRequest,
  output: ListAccountsLabelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new label, not assigned to any account. */
export interface CreateAccountsLabelsRequest {
  /** Required. The id of the account this label belongs to. */
  accountId: string;
  /** Request body */
  body?: AccountLabel;
}

export const CreateAccountsLabelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "accounts/{accountId}/labels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsLabelsRequest>;

export type CreateAccountsLabelsResponse = AccountLabel;
export const CreateAccountsLabelsResponse = AccountLabel;

export type CreateAccountsLabelsError = CommonErrors;

export const createAccountsLabels: API.OperationMethod<CreateAccountsLabelsRequest, CreateAccountsLabelsResponse, CreateAccountsLabelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsLabelsRequest,
  output: CreateAccountsLabelsResponse,
  errors: [],
}));

/** Updates a label. */
export interface PatchAccountsLabelsRequest {
  /** Required. The id of the account this label belongs to. */
  accountId: string;
  /** Required. The id of the label to update. */
  labelId: string;
  /** Request body */
  body?: AccountLabel;
}

export const PatchAccountsLabelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  labelId: Schema.String.pipe(T.HttpPath("labelId")),
  body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "accounts/{accountId}/labels/{labelId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsLabelsRequest>;

export type PatchAccountsLabelsResponse = AccountLabel;
export const PatchAccountsLabelsResponse = AccountLabel;

export type PatchAccountsLabelsError = CommonErrors;

export const patchAccountsLabels: API.OperationMethod<PatchAccountsLabelsRequest, PatchAccountsLabelsResponse, PatchAccountsLabelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsLabelsRequest,
  output: PatchAccountsLabelsResponse,
  errors: [],
}));

/** Deletes a label and removes it from all accounts to which it was assigned. */
export interface DeleteAccountsLabelsRequest {
  /** Required. The id of the account that owns the label. */
  accountId: string;
  /** Required. The id of the label to delete. */
  labelId: string;
}

export const DeleteAccountsLabelsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  labelId: Schema.String.pipe(T.HttpPath("labelId")),
}).pipe(
  T.Http({ method: "DELETE", path: "accounts/{accountId}/labels/{labelId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsLabelsRequest>;

export interface DeleteAccountsLabelsResponse {}
export const DeleteAccountsLabelsResponse: Schema.Schema<DeleteAccountsLabelsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsLabelsResponse>;

export type DeleteAccountsLabelsError = CommonErrors;

export const deleteAccountsLabels: API.OperationMethod<DeleteAccountsLabelsRequest, DeleteAccountsLabelsResponse, DeleteAccountsLabelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsLabelsRequest,
  output: DeleteAccountsLabelsResponse,
  errors: [],
}));

/** Links return carrier to a merchant account. */
export interface CreateAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
  /** Request body */
  body?: AccountReturnCarrier;
}

export const CreateAccountsReturncarrierRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AccountReturnCarrier).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "accounts/{accountId}/returncarrier", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsReturncarrierRequest>;

export type CreateAccountsReturncarrierResponse = AccountReturnCarrier;
export const CreateAccountsReturncarrierResponse = AccountReturnCarrier;

export type CreateAccountsReturncarrierError = CommonErrors;

export const createAccountsReturncarrier: API.OperationMethod<CreateAccountsReturncarrierRequest, CreateAccountsReturncarrierResponse, CreateAccountsReturncarrierError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsReturncarrierRequest,
  output: CreateAccountsReturncarrierResponse,
  errors: [],
}));

/** Updates a return carrier in the merchant account. */
export interface PatchAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
  /** Required. The Google-provided unique carrier ID, used to update the resource. */
  carrierAccountId: string;
  /** Request body */
  body?: AccountReturnCarrier;
}

export const PatchAccountsReturncarrierRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  carrierAccountId: Schema.String.pipe(T.HttpPath("carrierAccountId")),
  body: Schema.optional(AccountReturnCarrier).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "accounts/{accountId}/returncarrier/{carrierAccountId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsReturncarrierRequest>;

export type PatchAccountsReturncarrierResponse = AccountReturnCarrier;
export const PatchAccountsReturncarrierResponse = AccountReturnCarrier;

export type PatchAccountsReturncarrierError = CommonErrors;

export const patchAccountsReturncarrier: API.OperationMethod<PatchAccountsReturncarrierRequest, PatchAccountsReturncarrierResponse, PatchAccountsReturncarrierError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsReturncarrierRequest,
  output: PatchAccountsReturncarrierResponse,
  errors: [],
}));

/** Delete a return carrier in the merchant account. */
export interface DeleteAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
  /** Required. The Google-provided unique carrier ID, used to update the resource. */
  carrierAccountId: string;
}

export const DeleteAccountsReturncarrierRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  carrierAccountId: Schema.String.pipe(T.HttpPath("carrierAccountId")),
}).pipe(
  T.Http({ method: "DELETE", path: "accounts/{accountId}/returncarrier/{carrierAccountId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsReturncarrierRequest>;

export interface DeleteAccountsReturncarrierResponse {}
export const DeleteAccountsReturncarrierResponse: Schema.Schema<DeleteAccountsReturncarrierResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsReturncarrierResponse>;

export type DeleteAccountsReturncarrierError = CommonErrors;

export const deleteAccountsReturncarrier: API.OperationMethod<DeleteAccountsReturncarrierRequest, DeleteAccountsReturncarrierResponse, DeleteAccountsReturncarrierError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsReturncarrierRequest,
  output: DeleteAccountsReturncarrierResponse,
  errors: [],
}));

/** Lists available return carriers in the merchant account. */
export interface ListAccountsReturncarrierRequest {
  /** Required. The Merchant Center Account Id under which the Return Carrier is to be linked. */
  accountId: string;
}

export const ListAccountsReturncarrierRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "accounts/{accountId}/returncarrier" }),
  svc,
) as unknown as Schema.Schema<ListAccountsReturncarrierRequest>;

export type ListAccountsReturncarrierResponse = ListAccountReturnCarrierResponse;
export const ListAccountsReturncarrierResponse = ListAccountReturnCarrierResponse;

export type ListAccountsReturncarrierError = CommonErrors;

export const listAccountsReturncarrier: API.OperationMethod<ListAccountsReturncarrierRequest, ListAccountsReturncarrierResponse, ListAccountsReturncarrierError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccountsReturncarrierRequest,
  output: ListAccountsReturncarrierResponse,
  errors: [],
}));

/** Retrieves multiple Merchant Center account statuses in a single request. */
export interface CustombatchAccountstatusesRequest {
  /** Request body */
  body?: AccountstatusesCustomBatchRequest;
}

export const CustombatchAccountstatusesRequest = Schema.Struct({
  body: Schema.optional(AccountstatusesCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "accountstatuses/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchAccountstatusesRequest>;

export type CustombatchAccountstatusesResponse = AccountstatusesCustomBatchResponse;
export const CustombatchAccountstatusesResponse = AccountstatusesCustomBatchResponse;

export type CustombatchAccountstatusesError = CommonErrors;

export const custombatchAccountstatuses: API.OperationMethod<CustombatchAccountstatusesRequest, CustombatchAccountstatusesResponse, CustombatchAccountstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchAccountstatusesRequest,
  output: CustombatchAccountstatusesResponse,
  errors: [],
}));

/** Retrieves the status of a Merchant Center account. No itemLevelIssues are returned for multi-client accounts. */
export interface GetAccountstatusesRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account. */
  accountId: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
}

export const GetAccountstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  destinations: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("destinations")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accountstatuses/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountstatusesRequest>;

export type GetAccountstatusesResponse = AccountStatus;
export const GetAccountstatusesResponse = AccountStatus;

export type GetAccountstatusesError = CommonErrors;

export const getAccountstatuses: API.OperationMethod<GetAccountstatusesRequest, GetAccountstatusesResponse, GetAccountstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountstatusesRequest,
  output: GetAccountstatusesResponse,
  errors: [],
}));

/** Lists the statuses of the sub-accounts in your Merchant Center account. */
export interface ListAccountstatusesRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The maximum number of account statuses to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
  /** If set, only the accounts with the given name (case sensitive) will be returned. */
  name?: string;
}

export const ListAccountstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  destinations: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("destinations")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accountstatuses" }),
  svc,
) as unknown as Schema.Schema<ListAccountstatusesRequest>;

export type ListAccountstatusesResponse = AccountstatusesListResponse;
export const ListAccountstatusesResponse = AccountstatusesListResponse;

export type ListAccountstatusesError = CommonErrors;

export const listAccountstatuses = API.makePaginated(() => ({
  input: ListAccountstatusesRequest,
  output: ListAccountstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves and updates tax settings of multiple accounts in a single request. */
export interface CustombatchAccounttaxRequest {
  /** Request body */
  body?: AccounttaxCustomBatchRequest;
}

export const CustombatchAccounttaxRequest = Schema.Struct({
  body: Schema.optional(AccounttaxCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "accounttax/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchAccounttaxRequest>;

export type CustombatchAccounttaxResponse = AccounttaxCustomBatchResponse;
export const CustombatchAccounttaxResponse = AccounttaxCustomBatchResponse;

export type CustombatchAccounttaxError = CommonErrors;

export const custombatchAccounttax: API.OperationMethod<CustombatchAccounttaxRequest, CustombatchAccounttaxResponse, CustombatchAccounttaxError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchAccounttaxRequest,
  output: CustombatchAccounttaxResponse,
  errors: [],
}));

/** Retrieves the tax settings of the account. */
export interface GetAccounttaxRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get/update account tax settings. */
  accountId: string;
}

export const GetAccounttaxRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounttax/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccounttaxRequest>;

export type GetAccounttaxResponse = AccountTax;
export const GetAccounttaxResponse = AccountTax;

export type GetAccounttaxError = CommonErrors;

export const getAccounttax: API.OperationMethod<GetAccounttaxRequest, GetAccounttaxResponse, GetAccounttaxError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccounttaxRequest,
  output: GetAccounttaxResponse,
  errors: [],
}));

/** Lists the tax settings of the sub-accounts in your Merchant Center account. */
export interface ListAccounttaxRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The maximum number of tax settings to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListAccounttaxRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/accounttax" }),
  svc,
) as unknown as Schema.Schema<ListAccounttaxRequest>;

export type ListAccounttaxResponse = AccounttaxListResponse;
export const ListAccounttaxResponse = AccounttaxListResponse;

export type ListAccounttaxError = CommonErrors;

export const listAccounttax = API.makePaginated(() => ({
  input: ListAccounttaxRequest,
  output: ListAccounttaxResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the tax settings of the account. Any fields that are not provided are deleted from the resource. */
export interface UpdateAccounttaxRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get/update account tax settings. */
  accountId: string;
  /** Request body */
  body?: AccountTax;
}

export const UpdateAccounttaxRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(AccountTax).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{merchantId}/accounttax/{accountId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccounttaxRequest>;

export type UpdateAccounttaxResponse = AccountTax;
export const UpdateAccounttaxResponse = AccountTax;

export type UpdateAccounttaxError = CommonErrors;

export const updateAccounttax: API.OperationMethod<UpdateAccounttaxRequest, UpdateAccounttaxResponse, UpdateAccounttaxError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccounttaxRequest,
  output: UpdateAccounttaxResponse,
  errors: [],
}));

/** Deletes, fetches, gets, inserts and updates multiple datafeeds in a single request. */
export interface CustombatchDatafeedsRequest {
  /** Request body */
  body?: DatafeedsCustomBatchRequest;
}

export const CustombatchDatafeedsRequest = Schema.Struct({
  body: Schema.optional(DatafeedsCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "datafeeds/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchDatafeedsRequest>;

export type CustombatchDatafeedsResponse = DatafeedsCustomBatchResponse;
export const CustombatchDatafeedsResponse = DatafeedsCustomBatchResponse;

export type CustombatchDatafeedsError = CommonErrors;

export const custombatchDatafeeds: API.OperationMethod<CustombatchDatafeedsRequest, CustombatchDatafeedsResponse, CustombatchDatafeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchDatafeedsRequest,
  output: CustombatchDatafeedsResponse,
  errors: [],
}));

/** Deletes a datafeed configuration from your Merchant Center account. */
export interface DeleteDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
}

export const DeleteDatafeedsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/datafeeds/{datafeedId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDatafeedsRequest>;

export interface DeleteDatafeedsResponse {}
export const DeleteDatafeedsResponse: Schema.Schema<DeleteDatafeedsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDatafeedsResponse>;

export type DeleteDatafeedsError = CommonErrors;

export const deleteDatafeeds: API.OperationMethod<DeleteDatafeedsRequest, DeleteDatafeedsResponse, DeleteDatafeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDatafeedsRequest,
  output: DeleteDatafeedsResponse,
  errors: [],
}));

/** Invokes a fetch for the datafeed in your Merchant Center account. If you need to call this method more than once per day, we recommend you use the [Products service](https://developers.google.com/shopping-content/reference/rest/v2.1/products) to update your product data. */
export interface FetchnowDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed to be fetched. */
  datafeedId: string;
}

export const FetchnowDatafeedsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/datafeeds/{datafeedId}/fetchNow", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchnowDatafeedsRequest>;

export type FetchnowDatafeedsResponse = DatafeedsFetchNowResponse;
export const FetchnowDatafeedsResponse = DatafeedsFetchNowResponse;

export type FetchnowDatafeedsError = CommonErrors;

export const fetchnowDatafeeds: API.OperationMethod<FetchnowDatafeedsRequest, FetchnowDatafeedsResponse, FetchnowDatafeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchnowDatafeedsRequest,
  output: FetchnowDatafeedsResponse,
  errors: [],
}));

/** Retrieves a datafeed configuration from your Merchant Center account. */
export interface GetDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
}

export const GetDatafeedsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/datafeeds/{datafeedId}" }),
  svc,
) as unknown as Schema.Schema<GetDatafeedsRequest>;

export type GetDatafeedsResponse = Datafeed;
export const GetDatafeedsResponse = Datafeed;

export type GetDatafeedsError = CommonErrors;

export const getDatafeeds: API.OperationMethod<GetDatafeedsRequest, GetDatafeedsResponse, GetDatafeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDatafeedsRequest,
  output: GetDatafeedsResponse,
  errors: [],
}));

/** Registers a datafeed configuration with your Merchant Center account. */
export interface InsertDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Datafeed;
}

export const InsertDatafeedsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Datafeed).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/datafeeds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDatafeedsRequest>;

export type InsertDatafeedsResponse = Datafeed;
export const InsertDatafeedsResponse = Datafeed;

export type InsertDatafeedsError = CommonErrors;

export const insertDatafeeds: API.OperationMethod<InsertDatafeedsRequest, InsertDatafeedsResponse, InsertDatafeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDatafeedsRequest,
  output: InsertDatafeedsResponse,
  errors: [],
}));

/** Lists the configurations for datafeeds in your Merchant Center account. */
export interface ListDatafeedsRequest {
  /** The ID of the account that manages the datafeeds. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of products to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListDatafeedsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/datafeeds" }),
  svc,
) as unknown as Schema.Schema<ListDatafeedsRequest>;

export type ListDatafeedsResponse = DatafeedsListResponse;
export const ListDatafeedsResponse = DatafeedsListResponse;

export type ListDatafeedsError = CommonErrors;

export const listDatafeeds = API.makePaginated(() => ({
  input: ListDatafeedsRequest,
  output: ListDatafeedsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a datafeed configuration of your Merchant Center account. Any fields that are not provided are deleted from the resource. */
export interface UpdateDatafeedsRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
  /** Request body */
  body?: Datafeed;
}

export const UpdateDatafeedsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
  body: Schema.optional(Datafeed).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{merchantId}/datafeeds/{datafeedId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDatafeedsRequest>;

export type UpdateDatafeedsResponse = Datafeed;
export const UpdateDatafeedsResponse = Datafeed;

export type UpdateDatafeedsError = CommonErrors;

export const updateDatafeeds: API.OperationMethod<UpdateDatafeedsRequest, UpdateDatafeedsResponse, UpdateDatafeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDatafeedsRequest,
  output: UpdateDatafeedsResponse,
  errors: [],
}));

/** Gets multiple Merchant Center datafeed statuses in a single request. */
export interface CustombatchDatafeedstatusesRequest {
  /** Request body */
  body?: DatafeedstatusesCustomBatchRequest;
}

export const CustombatchDatafeedstatusesRequest = Schema.Struct({
  body: Schema.optional(DatafeedstatusesCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "datafeedstatuses/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchDatafeedstatusesRequest>;

export type CustombatchDatafeedstatusesResponse = DatafeedstatusesCustomBatchResponse;
export const CustombatchDatafeedstatusesResponse = DatafeedstatusesCustomBatchResponse;

export type CustombatchDatafeedstatusesError = CommonErrors;

export const custombatchDatafeedstatuses: API.OperationMethod<CustombatchDatafeedstatusesRequest, CustombatchDatafeedstatusesResponse, CustombatchDatafeedstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchDatafeedstatusesRequest,
  output: CustombatchDatafeedstatusesResponse,
  errors: [],
}));

/** Retrieves the status of a datafeed from your Merchant Center account. */
export interface GetDatafeedstatusesRequest {
  /** The ID of the account that manages the datafeed. This account cannot be a multi-client account. */
  merchantId: string;
  /** The ID of the datafeed. */
  datafeedId: string;
  /** Deprecated. Use `feedLabel` instead. The country to get the datafeed status for. If this parameter is provided then `language` must also be provided. Note that this parameter is required for feeds targeting multiple countries and languages, since a feed may have a different status for each target. */
  country?: string;
  /** The feed label to get the datafeed status for. If this parameter is provided then `language` must also be provided. Note that this parameter is required for feeds targeting multiple countries and languages, since a feed may have a different status for each target. */
  feedLabel?: string;
  /** The language to get the datafeed status for. If this parameter is provided then `country` must also be provided. Note that this parameter is required for feeds targeting multiple countries and languages, since a feed may have a different status for each target. */
  language?: string;
}

export const GetDatafeedstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  datafeedId: Schema.String.pipe(T.HttpPath("datafeedId")),
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  feedLabel: Schema.optional(Schema.String).pipe(T.HttpQuery("feedLabel")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/datafeedstatuses/{datafeedId}" }),
  svc,
) as unknown as Schema.Schema<GetDatafeedstatusesRequest>;

export type GetDatafeedstatusesResponse = DatafeedStatus;
export const GetDatafeedstatusesResponse = DatafeedStatus;

export type GetDatafeedstatusesError = CommonErrors;

export const getDatafeedstatuses: API.OperationMethod<GetDatafeedstatusesRequest, GetDatafeedstatusesResponse, GetDatafeedstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDatafeedstatusesRequest,
  output: GetDatafeedstatusesResponse,
  errors: [],
}));

/** Lists the statuses of the datafeeds in your Merchant Center account. */
export interface ListDatafeedstatusesRequest {
  /** The ID of the account that manages the datafeeds. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of products to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListDatafeedstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/datafeedstatuses" }),
  svc,
) as unknown as Schema.Schema<ListDatafeedstatusesRequest>;

export type ListDatafeedstatusesResponse = DatafeedstatusesListResponse;
export const ListDatafeedstatusesResponse = DatafeedstatusesListResponse;

export type ListDatafeedstatusesError = CommonErrors;

export const listDatafeedstatuses = API.makePaginated(() => ({
  input: ListDatafeedstatusesRequest,
  output: ListDatafeedstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves and/or updates the LIA settings of multiple accounts in a single request. */
export interface CustombatchLiasettingsRequest {
  /** Request body */
  body?: LiasettingsCustomBatchRequest;
}

export const CustombatchLiasettingsRequest = Schema.Struct({
  body: Schema.optional(LiasettingsCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "liasettings/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchLiasettingsRequest>;

export type CustombatchLiasettingsResponse = LiasettingsCustomBatchResponse;
export const CustombatchLiasettingsResponse = LiasettingsCustomBatchResponse;

export type CustombatchLiasettingsError = CommonErrors;

export const custombatchLiasettings: API.OperationMethod<CustombatchLiasettingsRequest, CustombatchLiasettingsResponse, CustombatchLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchLiasettingsRequest,
  output: CustombatchLiasettingsResponse,
  errors: [],
}));

/** Retrieves the LIA settings of the account. */
export interface GetLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get or update LIA settings. */
  accountId: string;
}

export const GetLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/liasettings/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetLiasettingsRequest>;

export type GetLiasettingsResponse = LiaSettings;
export const GetLiasettingsResponse = LiaSettings;

export type GetLiasettingsError = CommonErrors;

export const getLiasettings: API.OperationMethod<GetLiasettingsRequest, GetLiasettingsResponse, GetLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLiasettingsRequest,
  output: GetLiasettingsResponse,
  errors: [],
}));

/** Retrieves the list of accessible Business Profiles. */
export interface GetaccessiblegmbaccountsLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to retrieve accessible Business Profiles. */
  accountId: string;
}

export const GetaccessiblegmbaccountsLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/liasettings/{accountId}/accessiblegmbaccounts" }),
  svc,
) as unknown as Schema.Schema<GetaccessiblegmbaccountsLiasettingsRequest>;

export type GetaccessiblegmbaccountsLiasettingsResponse = LiasettingsGetAccessibleGmbAccountsResponse;
export const GetaccessiblegmbaccountsLiasettingsResponse = LiasettingsGetAccessibleGmbAccountsResponse;

export type GetaccessiblegmbaccountsLiasettingsError = CommonErrors;

export const getaccessiblegmbaccountsLiasettings: API.OperationMethod<GetaccessiblegmbaccountsLiasettingsRequest, GetaccessiblegmbaccountsLiasettingsResponse, GetaccessiblegmbaccountsLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetaccessiblegmbaccountsLiasettingsRequest,
  output: GetaccessiblegmbaccountsLiasettingsResponse,
  errors: [],
}));

/** Lists the LIA settings of the sub-accounts in your Merchant Center account. */
export interface ListLiasettingsRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The maximum number of LIA settings to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/liasettings" }),
  svc,
) as unknown as Schema.Schema<ListLiasettingsRequest>;

export type ListLiasettingsResponse = LiasettingsListResponse;
export const ListLiasettingsResponse = LiasettingsListResponse;

export type ListLiasettingsError = CommonErrors;

export const listLiasettings = API.makePaginated(() => ({
  input: ListLiasettingsRequest,
  output: ListLiasettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves the list of POS data providers that have active settings for the all eiligible countries. */
export interface ListposdataprovidersLiasettingsRequest {
}

export const ListposdataprovidersLiasettingsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "liasettings/posdataproviders" }),
  svc,
) as unknown as Schema.Schema<ListposdataprovidersLiasettingsRequest>;

export type ListposdataprovidersLiasettingsResponse = LiasettingsListPosDataProvidersResponse;
export const ListposdataprovidersLiasettingsResponse = LiasettingsListPosDataProvidersResponse;

export type ListposdataprovidersLiasettingsError = CommonErrors;

export const listposdataprovidersLiasettings: API.OperationMethod<ListposdataprovidersLiasettingsRequest, ListposdataprovidersLiasettingsResponse, ListposdataprovidersLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListposdataprovidersLiasettingsRequest,
  output: ListposdataprovidersLiasettingsResponse,
  errors: [],
}));

/** Requests access to a specified Business Profile. */
export interface RequestgmbaccessLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which Business Profile access is requested. */
  accountId: string;
  /** The email of the Business Profile. */
  gmbEmail: string;
}

export const RequestgmbaccessLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  gmbEmail: Schema.String.pipe(T.HttpQuery("gmbEmail")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/liasettings/{accountId}/requestgmbaccess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestgmbaccessLiasettingsRequest>;

export type RequestgmbaccessLiasettingsResponse = LiasettingsRequestGmbAccessResponse;
export const RequestgmbaccessLiasettingsResponse = LiasettingsRequestGmbAccessResponse;

export type RequestgmbaccessLiasettingsError = CommonErrors;

export const requestgmbaccessLiasettings: API.OperationMethod<RequestgmbaccessLiasettingsRequest, RequestgmbaccessLiasettingsResponse, RequestgmbaccessLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestgmbaccessLiasettingsRequest,
  output: RequestgmbaccessLiasettingsResponse,
  errors: [],
}));

/** Requests inventory validation for the specified country. */
export interface RequestinventoryverificationLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account that manages the order. This cannot be a multi-client account. */
  accountId: string;
  /** The country for which inventory validation is requested. */
  country: string;
}

export const RequestinventoryverificationLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  country: Schema.String.pipe(T.HttpPath("country")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/liasettings/{accountId}/requestinventoryverification/{country}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestinventoryverificationLiasettingsRequest>;

export type RequestinventoryverificationLiasettingsResponse = LiasettingsRequestInventoryVerificationResponse;
export const RequestinventoryverificationLiasettingsResponse = LiasettingsRequestInventoryVerificationResponse;

export type RequestinventoryverificationLiasettingsError = CommonErrors;

export const requestinventoryverificationLiasettings: API.OperationMethod<RequestinventoryverificationLiasettingsRequest, RequestinventoryverificationLiasettingsResponse, RequestinventoryverificationLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestinventoryverificationLiasettingsRequest,
  output: RequestinventoryverificationLiasettingsResponse,
  errors: [],
}));

/** Sets the inventory verification contact for the specified country. */
export interface SetinventoryverificationcontactLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account that manages the order. This cannot be a multi-client account. */
  accountId: string;
  /** The country for which inventory verification is requested. */
  country: string;
  /** The language for which inventory verification is requested. */
  language: string;
  /** The name of the inventory verification contact. */
  contactName: string;
  /** The email of the inventory verification contact. */
  contactEmail: string;
}

export const SetinventoryverificationcontactLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  country: Schema.String.pipe(T.HttpQuery("country")),
  language: Schema.String.pipe(T.HttpQuery("language")),
  contactName: Schema.String.pipe(T.HttpQuery("contactName")),
  contactEmail: Schema.String.pipe(T.HttpQuery("contactEmail")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/liasettings/{accountId}/setinventoryverificationcontact", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetinventoryverificationcontactLiasettingsRequest>;

export type SetinventoryverificationcontactLiasettingsResponse = LiasettingsSetInventoryVerificationContactResponse;
export const SetinventoryverificationcontactLiasettingsResponse = LiasettingsSetInventoryVerificationContactResponse;

export type SetinventoryverificationcontactLiasettingsError = CommonErrors;

export const setinventoryverificationcontactLiasettings: API.OperationMethod<SetinventoryverificationcontactLiasettingsRequest, SetinventoryverificationcontactLiasettingsResponse, SetinventoryverificationcontactLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetinventoryverificationcontactLiasettingsRequest,
  output: SetinventoryverificationcontactLiasettingsResponse,
  errors: [],
}));

/** Sets the omnichannel experience for the specified country. Only supported for merchants whose POS data provider is trusted to enable the corresponding experience. For more context, see these help articles [about LFP](https://support.google.com/merchants/answer/7676652) and [how to get started](https://support.google.com/merchants/answer/7676578) with it. */
export interface SetomnichannelexperienceLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to retrieve accessible Business Profiles. */
  accountId: string;
  /** The CLDR country code (for example, "US") for which the omnichannel experience is selected. */
  country?: string;
  /** The Local Store Front (LSF) type for this country. Acceptable values are: - "`ghlsf`" (Google-Hosted Local Store Front) - "`mhlsfBasic`" (Merchant-Hosted Local Store Front Basic) - "`mhlsfFull`" (Merchant-Hosted Local Store Front Full) More details about these types can be found here. */
  lsfType?: string;
  /** The Pickup types for this country. Acceptable values are: - "`pickupToday`" - "`pickupLater`" */
  pickupTypes?: string[];
}

export const SetomnichannelexperienceLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  lsfType: Schema.optional(Schema.String).pipe(T.HttpQuery("lsfType")),
  pickupTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("pickupTypes")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/liasettings/{accountId}/setomnichannelexperience", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetomnichannelexperienceLiasettingsRequest>;

export type SetomnichannelexperienceLiasettingsResponse = LiaOmnichannelExperience;
export const SetomnichannelexperienceLiasettingsResponse = LiaOmnichannelExperience;

export type SetomnichannelexperienceLiasettingsError = CommonErrors;

export const setomnichannelexperienceLiasettings: API.OperationMethod<SetomnichannelexperienceLiasettingsRequest, SetomnichannelexperienceLiasettingsResponse, SetomnichannelexperienceLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetomnichannelexperienceLiasettingsRequest,
  output: SetomnichannelexperienceLiasettingsResponse,
  errors: [],
}));

/** Sets the POS data provider for the specified country. */
export interface SetposdataproviderLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to retrieve accessible Business Profiles. */
  accountId: string;
  /** The country for which the POS data provider is selected. */
  country: string;
  /** The ID of POS data provider. */
  posDataProviderId?: string;
  /** The account ID by which this merchant is known to the POS data provider. */
  posExternalAccountId?: string;
}

export const SetposdataproviderLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  country: Schema.String.pipe(T.HttpQuery("country")),
  posDataProviderId: Schema.optional(Schema.String).pipe(T.HttpQuery("posDataProviderId")),
  posExternalAccountId: Schema.optional(Schema.String).pipe(T.HttpQuery("posExternalAccountId")),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/liasettings/{accountId}/setposdataprovider", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetposdataproviderLiasettingsRequest>;

export type SetposdataproviderLiasettingsResponse = LiasettingsSetPosDataProviderResponse;
export const SetposdataproviderLiasettingsResponse = LiasettingsSetPosDataProviderResponse;

export type SetposdataproviderLiasettingsError = CommonErrors;

export const setposdataproviderLiasettings: API.OperationMethod<SetposdataproviderLiasettingsRequest, SetposdataproviderLiasettingsResponse, SetposdataproviderLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetposdataproviderLiasettingsRequest,
  output: SetposdataproviderLiasettingsResponse,
  errors: [],
}));

/** Updates the LIA settings of the account. Any fields that are not provided are deleted from the resource. */
export interface UpdateLiasettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get or update LIA settings. */
  accountId: string;
  /** Request body */
  body?: LiaSettings;
}

export const UpdateLiasettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(LiaSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{merchantId}/liasettings/{accountId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateLiasettingsRequest>;

export type UpdateLiasettingsResponse = LiaSettings;
export const UpdateLiasettingsResponse = LiaSettings;

export type UpdateLiasettingsError = CommonErrors;

export const updateLiasettings: API.OperationMethod<UpdateLiasettingsRequest, UpdateLiasettingsResponse, UpdateLiasettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateLiasettingsRequest,
  output: UpdateLiasettingsResponse,
  errors: [],
}));

/** Updates local inventory for multiple products or stores in a single request. */
export interface CustombatchLocalinventoryRequest {
  /** Request body */
  body?: LocalinventoryCustomBatchRequest;
}

export const CustombatchLocalinventoryRequest = Schema.Struct({
  body: Schema.optional(LocalinventoryCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "localinventory/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchLocalinventoryRequest>;

export type CustombatchLocalinventoryResponse = LocalinventoryCustomBatchResponse;
export const CustombatchLocalinventoryResponse = LocalinventoryCustomBatchResponse;

export type CustombatchLocalinventoryError = CommonErrors;

export const custombatchLocalinventory: API.OperationMethod<CustombatchLocalinventoryRequest, CustombatchLocalinventoryResponse, CustombatchLocalinventoryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchLocalinventoryRequest,
  output: CustombatchLocalinventoryResponse,
  errors: [],
}));

/** Updates the local inventory of a product in your Merchant Center account. */
export interface InsertLocalinventoryRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product for which to update local inventory. */
  productId: string;
  /** Request body */
  body?: LocalInventory;
}

export const InsertLocalinventoryRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(LocalInventory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/products/{productId}/localinventory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertLocalinventoryRequest>;

export type InsertLocalinventoryResponse = LocalInventory;
export const InsertLocalinventoryResponse = LocalInventory;

export type InsertLocalinventoryError = CommonErrors;

export const insertLocalinventory: API.OperationMethod<InsertLocalinventoryRequest, InsertLocalinventoryResponse, InsertLocalinventoryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertLocalinventoryRequest,
  output: InsertLocalinventoryResponse,
  errors: [],
}));

/** Batches multiple POS-related calls in a single request. */
export interface CustombatchPosRequest {
  /** Request body */
  body?: PosCustomBatchRequest;
}

export const CustombatchPosRequest = Schema.Struct({
  body: Schema.optional(PosCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "pos/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchPosRequest>;

export type CustombatchPosResponse = PosCustomBatchResponse;
export const CustombatchPosResponse = PosCustomBatchResponse;

export type CustombatchPosError = CommonErrors;

export const custombatchPos: API.OperationMethod<CustombatchPosRequest, CustombatchPosResponse, CustombatchPosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchPosRequest,
  output: CustombatchPosResponse,
  errors: [],
}));

/** Deletes a store for the given merchant. */
export interface DeletePosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** A store code that is unique per merchant. */
  storeCode: string;
}

export const DeletePosRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  storeCode: Schema.String.pipe(T.HttpPath("storeCode")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/pos/{targetMerchantId}/store/{storeCode}" }),
  svc,
) as unknown as Schema.Schema<DeletePosRequest>;

export interface DeletePosResponse {}
export const DeletePosResponse: Schema.Schema<DeletePosResponse> = Schema.Struct({}) as any as Schema.Schema<DeletePosResponse>;

export type DeletePosError = CommonErrors;

export const deletePos: API.OperationMethod<DeletePosRequest, DeletePosResponse, DeletePosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePosRequest,
  output: DeletePosResponse,
  errors: [],
}));

/** Retrieves information about the given store. */
export interface GetPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** A store code that is unique per merchant. */
  storeCode: string;
}

export const GetPosRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  storeCode: Schema.String.pipe(T.HttpPath("storeCode")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/pos/{targetMerchantId}/store/{storeCode}" }),
  svc,
) as unknown as Schema.Schema<GetPosRequest>;

export type GetPosResponse = PosStore;
export const GetPosResponse = PosStore;

export type GetPosError = CommonErrors;

export const getPos: API.OperationMethod<GetPosRequest, GetPosResponse, GetPosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPosRequest,
  output: GetPosResponse,
  errors: [],
}));

/** Creates a store for the given merchant. */
export interface InsertPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** Request body */
  body?: PosStore;
}

export const InsertPosRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  body: Schema.optional(PosStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/pos/{targetMerchantId}/store", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPosRequest>;

export type InsertPosResponse = PosStore;
export const InsertPosResponse = PosStore;

export type InsertPosError = CommonErrors;

export const insertPos: API.OperationMethod<InsertPosRequest, InsertPosResponse, InsertPosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertPosRequest,
  output: InsertPosResponse,
  errors: [],
}));

/** Submit inventory for the given merchant. */
export interface InventoryPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** Request body */
  body?: PosInventoryRequest;
}

export const InventoryPosRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  body: Schema.optional(PosInventoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/pos/{targetMerchantId}/inventory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InventoryPosRequest>;

export type InventoryPosResponse = PosInventoryResponse;
export const InventoryPosResponse = PosInventoryResponse;

export type InventoryPosError = CommonErrors;

export const inventoryPos: API.OperationMethod<InventoryPosRequest, InventoryPosResponse, InventoryPosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InventoryPosRequest,
  output: InventoryPosResponse,
  errors: [],
}));

/** Lists the stores of the target merchant. */
export interface ListPosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
}

export const ListPosRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/pos/{targetMerchantId}/store" }),
  svc,
) as unknown as Schema.Schema<ListPosRequest>;

export type ListPosResponse = PosListResponse;
export const ListPosResponse = PosListResponse;

export type ListPosError = CommonErrors;

export const listPos: API.OperationMethod<ListPosRequest, ListPosResponse, ListPosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListPosRequest,
  output: ListPosResponse,
  errors: [],
}));

/** Submit a sale event for the given merchant. */
export interface SalePosRequest {
  /** The ID of the POS or inventory data provider. */
  merchantId: string;
  /** The ID of the target merchant. */
  targetMerchantId: string;
  /** Request body */
  body?: PosSaleRequest;
}

export const SalePosRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  targetMerchantId: Schema.String.pipe(T.HttpPath("targetMerchantId")),
  body: Schema.optional(PosSaleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/pos/{targetMerchantId}/sale", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SalePosRequest>;

export type SalePosResponse = PosSaleResponse;
export const SalePosResponse = PosSaleResponse;

export type SalePosError = CommonErrors;

export const salePos: API.OperationMethod<SalePosRequest, SalePosResponse, SalePosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SalePosRequest,
  output: SalePosResponse,
  errors: [],
}));

/** Retrieves, inserts, and deletes multiple products in a single request. */
export interface CustombatchProductsRequest {
  /** Request body */
  body?: ProductsCustomBatchRequest;
}

export const CustombatchProductsRequest = Schema.Struct({
  body: Schema.optional(ProductsCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "products/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchProductsRequest>;

export type CustombatchProductsResponse = ProductsCustomBatchResponse;
export const CustombatchProductsResponse = ProductsCustomBatchResponse;

export type CustombatchProductsError = CommonErrors;

export const custombatchProducts: API.OperationMethod<CustombatchProductsRequest, CustombatchProductsResponse, CustombatchProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchProductsRequest,
  output: CustombatchProductsResponse,
  errors: [],
}));

/** Deletes a product from your Merchant Center account. */
export interface DeleteProductsRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product. */
  productId: string;
  /** The Content API Supplemental Feed ID. If present then product deletion applies to the data in a supplemental feed. If absent, entire product will be deleted. */
  feedId?: string;
}

export const DeleteProductsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  feedId: Schema.optional(Schema.String).pipe(T.HttpQuery("feedId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/products/{productId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProductsRequest>;

export interface DeleteProductsResponse {}
export const DeleteProductsResponse: Schema.Schema<DeleteProductsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteProductsResponse>;

export type DeleteProductsError = CommonErrors;

export const deleteProducts: API.OperationMethod<DeleteProductsRequest, DeleteProductsResponse, DeleteProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProductsRequest,
  output: DeleteProductsResponse,
  errors: [],
}));

/** Retrieves a product from your Merchant Center account. */
export interface GetProductsRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product. */
  productId: string;
}

export const GetProductsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/products/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetProductsRequest>;

export type GetProductsResponse = Product;
export const GetProductsResponse = Product;

export type GetProductsError = CommonErrors;

export const getProducts: API.OperationMethod<GetProductsRequest, GetProductsResponse, GetProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProductsRequest,
  output: GetProductsResponse,
  errors: [],
}));

/** Uploads a product to your Merchant Center account. If an item with the same channel, contentLanguage, offerId, and targetCountry already exists, this method updates that entry. */
export interface InsertProductsRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The Content API Supplemental Feed ID. If present then product insertion applies to the data in a supplemental feed. */
  feedId?: string;
  /** Request body */
  body?: Product;
}

export const InsertProductsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  feedId: Schema.optional(Schema.String).pipe(T.HttpQuery("feedId")),
  body: Schema.optional(Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/products", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertProductsRequest>;

export type InsertProductsResponse = Product;
export const InsertProductsResponse = Product;

export type InsertProductsError = CommonErrors;

export const insertProducts: API.OperationMethod<InsertProductsRequest, InsertProductsResponse, InsertProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertProductsRequest,
  output: InsertProductsResponse,
  errors: [],
}));

/** Updates an existing product in your Merchant Center account. Only updates attributes provided in the request. */
export interface UpdateProductsRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product for which to update. */
  productId: string;
  /** The comma-separated list of product attributes to be updated. Example: `"title,salePrice"`. Attributes specified in the update mask without a value specified in the body will be deleted from the product. *You must specify the update mask to delete attributes.* Only top-level product attributes can be updated. If not defined, product attributes with set values will be updated and other attributes will stay unchanged. */
  updateMask?: string;
  /** Request body */
  body?: Product;
}

export const UpdateProductsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "{merchantId}/products/{productId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProductsRequest>;

export type UpdateProductsResponse = Product;
export const UpdateProductsResponse = Product;

export type UpdateProductsError = CommonErrors;

export const updateProducts: API.OperationMethod<UpdateProductsRequest, UpdateProductsResponse, UpdateProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProductsRequest,
  output: UpdateProductsResponse,
  errors: [],
}));

/** Lists the products in your Merchant Center account. The response might contain fewer items than specified by maxResults. Rely on nextPageToken to determine if there are more items to be requested. */
export interface ListProductsRequest {
  /** The ID of the account that contains the products. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of products to return in the response, used for paging. The default value is 25. The maximum value is 250. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListProductsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/products" }),
  svc,
) as unknown as Schema.Schema<ListProductsRequest>;

export type ListProductsResponse = ProductsListResponse;
export const ListProductsResponse = ProductsListResponse;

export type ListProductsError = CommonErrors;

export const listProducts = API.makePaginated(() => ({
  input: ListProductsRequest,
  output: ListProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the statuses of multiple products in a single request. */
export interface CustombatchProductstatusesRequest {
  /** Request body */
  body?: ProductstatusesCustomBatchRequest;
}

export const CustombatchProductstatusesRequest = Schema.Struct({
  body: Schema.optional(ProductstatusesCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "productstatuses/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchProductstatusesRequest>;

export type CustombatchProductstatusesResponse = ProductstatusesCustomBatchResponse;
export const CustombatchProductstatusesResponse = ProductstatusesCustomBatchResponse;

export type CustombatchProductstatusesError = CommonErrors;

export const custombatchProductstatuses: API.OperationMethod<CustombatchProductstatusesRequest, CustombatchProductstatusesResponse, CustombatchProductstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchProductstatusesRequest,
  output: CustombatchProductstatusesResponse,
  errors: [],
}));

/** Gets the status of a product from your Merchant Center account. */
export interface GetProductstatusesRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product. */
  productId: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
}

export const GetProductstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  destinations: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("destinations")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/productstatuses/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetProductstatusesRequest>;

export type GetProductstatusesResponse = ProductStatus;
export const GetProductstatusesResponse = ProductStatus;

export type GetProductstatusesError = CommonErrors;

export const getProductstatuses: API.OperationMethod<GetProductstatusesRequest, GetProductstatusesResponse, GetProductstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProductstatusesRequest,
  output: GetProductstatusesResponse,
  errors: [],
}));

/** Lists the statuses of the products in your Merchant Center account. */
export interface ListProductstatusesRequest {
  /** The ID of the account that contains the products. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of product statuses to return in the response, used for paging. The default value is 25. The maximum value is 250. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** If set, only issues for the specified destinations are returned, otherwise only issues for the Shopping destination. */
  destinations?: string[];
}

export const ListProductstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  destinations: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("destinations")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/productstatuses" }),
  svc,
) as unknown as Schema.Schema<ListProductstatusesRequest>;

export type ListProductstatusesResponse = ProductstatusesListResponse;
export const ListProductstatusesResponse = ProductstatusesListResponse;

export type ListProductstatusesError = CommonErrors;

export const listProductstatuses = API.makePaginated(() => ({
  input: ListProductstatusesRequest,
  output: ListProductstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a Merchant Center account's pubsub notification settings. */
export interface GetPubsubnotificationsettingsRequest {
  /** The ID of the account for which to get pubsub notification settings. */
  merchantId: string;
}

export const GetPubsubnotificationsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/pubsubnotificationsettings" }),
  svc,
) as unknown as Schema.Schema<GetPubsubnotificationsettingsRequest>;

export type GetPubsubnotificationsettingsResponse = PubsubNotificationSettings;
export const GetPubsubnotificationsettingsResponse = PubsubNotificationSettings;

export type GetPubsubnotificationsettingsError = CommonErrors;

export const getPubsubnotificationsettings: API.OperationMethod<GetPubsubnotificationsettingsRequest, GetPubsubnotificationsettingsResponse, GetPubsubnotificationsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPubsubnotificationsettingsRequest,
  output: GetPubsubnotificationsettingsResponse,
  errors: [],
}));

/** Register a Merchant Center account for pubsub notifications. Note that cloud topic name shouldn't be provided as part of the request. */
export interface UpdatePubsubnotificationsettingsRequest {
  /** The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: PubsubNotificationSettings;
}

export const UpdatePubsubnotificationsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(PubsubNotificationSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{merchantId}/pubsubnotificationsettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePubsubnotificationsettingsRequest>;

export type UpdatePubsubnotificationsettingsResponse = PubsubNotificationSettings;
export const UpdatePubsubnotificationsettingsResponse = PubsubNotificationSettings;

export type UpdatePubsubnotificationsettingsError = CommonErrors;

export const updatePubsubnotificationsettings: API.OperationMethod<UpdatePubsubnotificationsettingsRequest, UpdatePubsubnotificationsettingsResponse, UpdatePubsubnotificationsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatePubsubnotificationsettingsRequest,
  output: UpdatePubsubnotificationsettingsResponse,
  errors: [],
}));

/** Updates regional inventory for multiple products or regions in a single request. */
export interface CustombatchRegionalinventoryRequest {
  /** Request body */
  body?: RegionalinventoryCustomBatchRequest;
}

export const CustombatchRegionalinventoryRequest = Schema.Struct({
  body: Schema.optional(RegionalinventoryCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "regionalinventory/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchRegionalinventoryRequest>;

export type CustombatchRegionalinventoryResponse = RegionalinventoryCustomBatchResponse;
export const CustombatchRegionalinventoryResponse = RegionalinventoryCustomBatchResponse;

export type CustombatchRegionalinventoryError = CommonErrors;

export const custombatchRegionalinventory: API.OperationMethod<CustombatchRegionalinventoryRequest, CustombatchRegionalinventoryResponse, CustombatchRegionalinventoryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchRegionalinventoryRequest,
  output: CustombatchRegionalinventoryResponse,
  errors: [],
}));

/** Updates the regional inventory of a product in your Merchant Center account. If a regional inventory with the same region ID already exists, this method updates that entry. */
export interface InsertRegionalinventoryRequest {
  /** The ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** The REST ID of the product for which to update the regional inventory. */
  productId: string;
  /** Request body */
  body?: RegionalInventory;
}

export const InsertRegionalinventoryRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(RegionalInventory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/products/{productId}/regionalinventory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRegionalinventoryRequest>;

export type InsertRegionalinventoryResponse = RegionalInventory;
export const InsertRegionalinventoryResponse = RegionalInventory;

export type InsertRegionalinventoryError = CommonErrors;

export const insertRegionalinventory: API.OperationMethod<InsertRegionalinventoryRequest, InsertRegionalinventoryResponse, InsertRegionalinventoryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRegionalinventoryRequest,
  output: InsertRegionalinventoryResponse,
  errors: [],
}));

/** Retrieves and updates the shipping settings of multiple accounts in a single request. */
export interface CustombatchShippingsettingsRequest {
  /** Request body */
  body?: ShippingsettingsCustomBatchRequest;
}

export const CustombatchShippingsettingsRequest = Schema.Struct({
  body: Schema.optional(ShippingsettingsCustomBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "shippingsettings/batch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CustombatchShippingsettingsRequest>;

export type CustombatchShippingsettingsResponse = ShippingsettingsCustomBatchResponse;
export const CustombatchShippingsettingsResponse = ShippingsettingsCustomBatchResponse;

export type CustombatchShippingsettingsError = CommonErrors;

export const custombatchShippingsettings: API.OperationMethod<CustombatchShippingsettingsRequest, CustombatchShippingsettingsResponse, CustombatchShippingsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CustombatchShippingsettingsRequest,
  output: CustombatchShippingsettingsResponse,
  errors: [],
}));

/** Retrieves the shipping settings of the account. */
export interface GetShippingsettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get/update shipping settings. */
  accountId: string;
}

export const GetShippingsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/shippingsettings/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetShippingsettingsRequest>;

export type GetShippingsettingsResponse = ShippingSettings;
export const GetShippingsettingsResponse = ShippingSettings;

export type GetShippingsettingsError = CommonErrors;

export const getShippingsettings: API.OperationMethod<GetShippingsettingsRequest, GetShippingsettingsResponse, GetShippingsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetShippingsettingsRequest,
  output: GetShippingsettingsResponse,
  errors: [],
}));

/** Retrieves supported carriers and carrier services for an account. */
export interface GetsupportedcarriersShippingsettingsRequest {
  /** The ID of the account for which to retrieve the supported carriers. */
  merchantId: string;
}

export const GetsupportedcarriersShippingsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/supportedCarriers" }),
  svc,
) as unknown as Schema.Schema<GetsupportedcarriersShippingsettingsRequest>;

export type GetsupportedcarriersShippingsettingsResponse = ShippingsettingsGetSupportedCarriersResponse;
export const GetsupportedcarriersShippingsettingsResponse = ShippingsettingsGetSupportedCarriersResponse;

export type GetsupportedcarriersShippingsettingsError = CommonErrors;

export const getsupportedcarriersShippingsettings: API.OperationMethod<GetsupportedcarriersShippingsettingsRequest, GetsupportedcarriersShippingsettingsResponse, GetsupportedcarriersShippingsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetsupportedcarriersShippingsettingsRequest,
  output: GetsupportedcarriersShippingsettingsResponse,
  errors: [],
}));

/** Retrieves supported holidays for an account. */
export interface GetsupportedholidaysShippingsettingsRequest {
  /** The ID of the account for which to retrieve the supported holidays. */
  merchantId: string;
}

export const GetsupportedholidaysShippingsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/supportedHolidays" }),
  svc,
) as unknown as Schema.Schema<GetsupportedholidaysShippingsettingsRequest>;

export type GetsupportedholidaysShippingsettingsResponse = ShippingsettingsGetSupportedHolidaysResponse;
export const GetsupportedholidaysShippingsettingsResponse = ShippingsettingsGetSupportedHolidaysResponse;

export type GetsupportedholidaysShippingsettingsError = CommonErrors;

export const getsupportedholidaysShippingsettings: API.OperationMethod<GetsupportedholidaysShippingsettingsRequest, GetsupportedholidaysShippingsettingsResponse, GetsupportedholidaysShippingsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetsupportedholidaysShippingsettingsRequest,
  output: GetsupportedholidaysShippingsettingsResponse,
  errors: [],
}));

/** Retrieves supported pickup services for an account. */
export interface GetsupportedpickupservicesShippingsettingsRequest {
  /** The ID of the account for which to retrieve the supported pickup services. */
  merchantId: string;
}

export const GetsupportedpickupservicesShippingsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/supportedPickupServices" }),
  svc,
) as unknown as Schema.Schema<GetsupportedpickupservicesShippingsettingsRequest>;

export type GetsupportedpickupservicesShippingsettingsResponse = ShippingsettingsGetSupportedPickupServicesResponse;
export const GetsupportedpickupservicesShippingsettingsResponse = ShippingsettingsGetSupportedPickupServicesResponse;

export type GetsupportedpickupservicesShippingsettingsError = CommonErrors;

export const getsupportedpickupservicesShippingsettings: API.OperationMethod<GetsupportedpickupservicesShippingsettingsRequest, GetsupportedpickupservicesShippingsettingsResponse, GetsupportedpickupservicesShippingsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetsupportedpickupservicesShippingsettingsRequest,
  output: GetsupportedpickupservicesShippingsettingsResponse,
  errors: [],
}));

/** Lists the shipping settings of the sub-accounts in your Merchant Center account. */
export interface ListShippingsettingsRequest {
  /** The ID of the managing account. This must be a multi-client account. */
  merchantId: string;
  /** The maximum number of shipping settings to return in the response, used for paging. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListShippingsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/shippingsettings" }),
  svc,
) as unknown as Schema.Schema<ListShippingsettingsRequest>;

export type ListShippingsettingsResponse = ShippingsettingsListResponse;
export const ListShippingsettingsResponse = ShippingsettingsListResponse;

export type ListShippingsettingsError = CommonErrors;

export const listShippingsettings = API.makePaginated(() => ({
  input: ListShippingsettingsRequest,
  output: ListShippingsettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the shipping settings of the account. Any fields that are not provided are deleted from the resource. */
export interface UpdateShippingsettingsRequest {
  /** The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account. */
  merchantId: string;
  /** The ID of the account for which to get/update shipping settings. */
  accountId: string;
  /** Request body */
  body?: ShippingSettings;
}

export const UpdateShippingsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(ShippingSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "{merchantId}/shippingsettings/{accountId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateShippingsettingsRequest>;

export type UpdateShippingsettingsResponse = ShippingSettings;
export const UpdateShippingsettingsResponse = ShippingSettings;

export type UpdateShippingsettingsError = CommonErrors;

export const updateShippingsettings: API.OperationMethod<UpdateShippingsettingsRequest, UpdateShippingsettingsResponse, UpdateShippingsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateShippingsettingsRequest,
  output: UpdateShippingsettingsResponse,
  errors: [],
}));

/** Retrieves a collection from your Merchant Center account. */
export interface GetCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The REST ID of the collection. */
  collectionId: string;
}

export const GetCollectionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/collections/{collectionId}" }),
  svc,
) as unknown as Schema.Schema<GetCollectionsRequest>;

export type GetCollectionsResponse = Collection;
export const GetCollectionsResponse = Collection;

export type GetCollectionsError = CommonErrors;

export const getCollections: API.OperationMethod<GetCollectionsRequest, GetCollectionsResponse, GetCollectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCollectionsRequest,
  output: GetCollectionsResponse,
  errors: [],
}));

/** Lists the collections in your Merchant Center account. The response might contain fewer items than specified by page_size. Rely on next_page_token to determine if there are more items to be requested. */
export interface ListCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of collections to return in the response, used for paging. Defaults to 50; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListCollectionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/collections" }),
  svc,
) as unknown as Schema.Schema<ListCollectionsRequest>;

export type ListCollectionsResponse_Op = ListCollectionsResponse;
export const ListCollectionsResponse_Op = ListCollectionsResponse;

export type ListCollectionsError = CommonErrors;

export const listCollections = API.makePaginated(() => ({
  input: ListCollectionsRequest,
  output: ListCollectionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Uploads a collection to your Merchant Center account. If a collection with the same collectionId already exists, this method updates that entry. In each update, the collection is completely replaced by the fields in the body of the update request. */
export interface CreateCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: Collection;
}

export const CreateCollectionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Collection).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/collections", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCollectionsRequest>;

export type CreateCollectionsResponse = Collection;
export const CreateCollectionsResponse = Collection;

export type CreateCollectionsError = CommonErrors;

export const createCollections: API.OperationMethod<CreateCollectionsRequest, CreateCollectionsResponse, CreateCollectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCollectionsRequest,
  output: CreateCollectionsResponse,
  errors: [],
}));

/** Deletes a collection from your Merchant Center account. */
export interface DeleteCollectionsRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The collectionId of the collection. CollectionId is the same as the REST ID of the collection. */
  collectionId: string;
}

export const DeleteCollectionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/collections/{collectionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCollectionsRequest>;

export interface DeleteCollectionsResponse {}
export const DeleteCollectionsResponse: Schema.Schema<DeleteCollectionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteCollectionsResponse>;

export type DeleteCollectionsError = CommonErrors;

export const deleteCollections: API.OperationMethod<DeleteCollectionsRequest, DeleteCollectionsResponse, DeleteCollectionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCollectionsRequest,
  output: DeleteCollectionsResponse,
  errors: [],
}));

/** Lists the daily call quota and usage per method for your Merchant Center account. */
export interface ListQuotasRequest {
  /** Required. The ID of the account that has quota. This account must be an admin. */
  merchantId: string;
  /** The maximum number of quotas to return in the response, used for paging. Defaults to 500; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListQuotasRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/quotas" }),
  svc,
) as unknown as Schema.Schema<ListQuotasRequest>;

export type ListQuotasResponse = ListMethodQuotasResponse;
export const ListQuotasResponse = ListMethodQuotasResponse;

export type ListQuotasError = CommonErrors;

export const listQuotas = API.makePaginated(() => ({
  input: ListQuotasRequest,
  output: ListQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the status of a collection from your Merchant Center account. */
export interface GetCollectionstatusesRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The collectionId of the collection. CollectionId is the same as the REST ID of the collection. */
  collectionId: string;
}

export const GetCollectionstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/collectionstatuses/{collectionId}" }),
  svc,
) as unknown as Schema.Schema<GetCollectionstatusesRequest>;

export type GetCollectionstatusesResponse = CollectionStatus;
export const GetCollectionstatusesResponse = CollectionStatus;

export type GetCollectionstatusesError = CommonErrors;

export const getCollectionstatuses: API.OperationMethod<GetCollectionstatusesRequest, GetCollectionstatusesResponse, GetCollectionstatusesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCollectionstatusesRequest,
  output: GetCollectionstatusesResponse,
  errors: [],
}));

/** Lists the statuses of the collections in your Merchant Center account. */
export interface ListCollectionstatusesRequest {
  /** Required. The ID of the account that contains the collection. This account cannot be a multi-client account. */
  merchantId: string;
  /** The maximum number of collection statuses to return in the response, used for paging. Defaults to 50; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListCollectionstatusesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/collectionstatuses" }),
  svc,
) as unknown as Schema.Schema<ListCollectionstatusesRequest>;

export type ListCollectionstatusesResponse = ListCollectionStatusesResponse;
export const ListCollectionstatusesResponse = ListCollectionStatusesResponse;

export type ListCollectionstatusesError = CommonErrors;

export const listCollectionstatuses = API.makePaginated(() => ({
  input: ListCollectionstatusesRequest,
  output: ListCollectionstatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new conversion source. */
export interface CreateConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Request body */
  body?: ConversionSource;
}

export const CreateConversionsourcesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(ConversionSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/conversionsources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateConversionsourcesRequest>;

export type CreateConversionsourcesResponse = ConversionSource;
export const CreateConversionsourcesResponse = ConversionSource;

export type CreateConversionsourcesError = CommonErrors;

export const createConversionsources: API.OperationMethod<CreateConversionsourcesRequest, CreateConversionsourcesResponse, CreateConversionsourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateConversionsourcesRequest,
  output: CreateConversionsourcesResponse,
  errors: [],
}));

/** Updates information of an existing conversion source. */
export interface PatchConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Required. The ID of the conversion source to be updated. */
  conversionSourceId: string;
  /** Optional. List of fields being updated. The following fields can be updated: `attribution_settings`, `display_name`, `currency_code`. */
  updateMask?: string;
  /** Request body */
  body?: ConversionSource;
}

export const PatchConversionsourcesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ConversionSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "{merchantId}/conversionsources/{conversionSourceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchConversionsourcesRequest>;

export type PatchConversionsourcesResponse = ConversionSource;
export const PatchConversionsourcesResponse = ConversionSource;

export type PatchConversionsourcesError = CommonErrors;

export const patchConversionsources: API.OperationMethod<PatchConversionsourcesRequest, PatchConversionsourcesResponse, PatchConversionsourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchConversionsourcesRequest,
  output: PatchConversionsourcesResponse,
  errors: [],
}));

/** Archives an existing conversion source. It will be recoverable for 30 days. This archiving behavior is not typical in the Content API and unique to this service. */
export interface DeleteConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Required. The ID of the conversion source to be deleted. */
  conversionSourceId: string;
}

export const DeleteConversionsourcesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/conversionsources/{conversionSourceId}" }),
  svc,
) as unknown as Schema.Schema<DeleteConversionsourcesRequest>;

export interface DeleteConversionsourcesResponse {}
export const DeleteConversionsourcesResponse: Schema.Schema<DeleteConversionsourcesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteConversionsourcesResponse>;

export type DeleteConversionsourcesError = CommonErrors;

export const deleteConversionsources: API.OperationMethod<DeleteConversionsourcesRequest, DeleteConversionsourcesResponse, DeleteConversionsourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteConversionsourcesRequest,
  output: DeleteConversionsourcesResponse,
  errors: [],
}));

/** Re-enables an archived conversion source. */
export interface UndeleteConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Required. The ID of the conversion source to be undeleted. */
  conversionSourceId: string;
  /** Request body */
  body?: UndeleteConversionSourceRequest;
}

export const UndeleteConversionsourcesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
  body: Schema.optional(UndeleteConversionSourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/conversionsources/{conversionSourceId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteConversionsourcesRequest>;

export interface UndeleteConversionsourcesResponse {}
export const UndeleteConversionsourcesResponse: Schema.Schema<UndeleteConversionsourcesResponse> = Schema.Struct({}) as any as Schema.Schema<UndeleteConversionsourcesResponse>;

export type UndeleteConversionsourcesError = CommonErrors;

export const undeleteConversionsources: API.OperationMethod<UndeleteConversionsourcesRequest, UndeleteConversionsourcesResponse, UndeleteConversionsourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteConversionsourcesRequest,
  output: UndeleteConversionsourcesResponse,
  errors: [],
}));

/** Fetches a conversion source. */
export interface GetConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** Required. The REST ID of the collection. */
  conversionSourceId: string;
}

export const GetConversionsourcesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  conversionSourceId: Schema.String.pipe(T.HttpPath("conversionSourceId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/conversionsources/{conversionSourceId}" }),
  svc,
) as unknown as Schema.Schema<GetConversionsourcesRequest>;

export type GetConversionsourcesResponse = ConversionSource;
export const GetConversionsourcesResponse = ConversionSource;

export type GetConversionsourcesError = CommonErrors;

export const getConversionsources: API.OperationMethod<GetConversionsourcesRequest, GetConversionsourcesResponse, GetConversionsourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConversionsourcesRequest,
  output: GetConversionsourcesResponse,
  errors: [],
}));

/** Retrieves the list of conversion sources the caller has access to. */
export interface ListConversionsourcesRequest {
  /** Required. The ID of the account that owns the new conversion source. */
  merchantId: string;
  /** The maximum number of conversion sources to return in a page. If no `page_size` is specified, `100` is used as the default value. The maximum value is `200`. Values above `200` will be coerced to `200`. Regardless of pagination, at most `200` conversion sources are returned in total. */
  pageSize?: number;
  /** Page token. */
  pageToken?: string;
  /** If true, also returns archived conversion sources. */
  showDeleted?: boolean;
}

export const ListConversionsourcesRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/conversionsources" }),
  svc,
) as unknown as Schema.Schema<ListConversionsourcesRequest>;

export type ListConversionsourcesResponse = ListConversionSourcesResponse;
export const ListConversionsourcesResponse = ListConversionSourcesResponse;

export type ListConversionsourcesError = CommonErrors;

export const listConversionsources = API.makePaginated(() => ({
  input: ListConversionsourcesRequest,
  output: ListConversionsourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves the status and review eligibility for the free listing program. Returns errors and warnings if they require action to resolve, will become disapprovals, or impact impressions. Use `accountstatuses` to view all issues for an account. */
export interface GetFreelistingsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const GetFreelistingsprogramRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/freelistingsprogram" }),
  svc,
) as unknown as Schema.Schema<GetFreelistingsprogramRequest>;

export type GetFreelistingsprogramResponse = FreeListingsProgramStatus;
export const GetFreelistingsprogramResponse = FreeListingsProgramStatus;

export type GetFreelistingsprogramError = CommonErrors;

export const getFreelistingsprogram: API.OperationMethod<GetFreelistingsprogramRequest, GetFreelistingsprogramResponse, GetFreelistingsprogramError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFreelistingsprogramRequest,
  output: GetFreelistingsprogramResponse,
  errors: [],
}));

/** Requests a review of free listings in a specific region. This method deprecated. Use the `MerchantSupportService` to view product and account issues and request a review. */
export interface RequestreviewFreelistingsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: RequestReviewFreeListingsRequest;
}

export const RequestreviewFreelistingsprogramRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(RequestReviewFreeListingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/freelistingsprogram/requestreview", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestreviewFreelistingsprogramRequest>;

export interface RequestreviewFreelistingsprogramResponse {}
export const RequestreviewFreelistingsprogramResponse: Schema.Schema<RequestreviewFreelistingsprogramResponse> = Schema.Struct({}) as any as Schema.Schema<RequestreviewFreelistingsprogramResponse>;

export type RequestreviewFreelistingsprogramError = CommonErrors;

export const requestreviewFreelistingsprogram: API.OperationMethod<RequestreviewFreelistingsprogramRequest, RequestreviewFreelistingsprogramResponse, RequestreviewFreelistingsprogramError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestreviewFreelistingsprogramRequest,
  output: RequestreviewFreelistingsprogramResponse,
  errors: [],
}));

/** Gets Checkout settings for the given merchant. This includes information about review state, enrollment state and URL settings. */
export interface GetFreelistingsprogramCheckoutsettingsRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const GetFreelistingsprogramCheckoutsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/freelistingsprogram/checkoutsettings" }),
  svc,
) as unknown as Schema.Schema<GetFreelistingsprogramCheckoutsettingsRequest>;

export type GetFreelistingsprogramCheckoutsettingsResponse = CheckoutSettings;
export const GetFreelistingsprogramCheckoutsettingsResponse = CheckoutSettings;

export type GetFreelistingsprogramCheckoutsettingsError = CommonErrors;

export const getFreelistingsprogramCheckoutsettings: API.OperationMethod<GetFreelistingsprogramCheckoutsettingsRequest, GetFreelistingsprogramCheckoutsettingsResponse, GetFreelistingsprogramCheckoutsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFreelistingsprogramCheckoutsettingsRequest,
  output: GetFreelistingsprogramCheckoutsettingsResponse,
  errors: [],
}));

/** Enrolls merchant in `Checkout` program. */
export interface InsertFreelistingsprogramCheckoutsettingsRequest {
  /** Required. The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: InsertCheckoutSettingsRequest;
}

export const InsertFreelistingsprogramCheckoutsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(InsertCheckoutSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/freelistingsprogram/checkoutsettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertFreelistingsprogramCheckoutsettingsRequest>;

export type InsertFreelistingsprogramCheckoutsettingsResponse = CheckoutSettings;
export const InsertFreelistingsprogramCheckoutsettingsResponse = CheckoutSettings;

export type InsertFreelistingsprogramCheckoutsettingsError = CommonErrors;

export const insertFreelistingsprogramCheckoutsettings: API.OperationMethod<InsertFreelistingsprogramCheckoutsettingsRequest, InsertFreelistingsprogramCheckoutsettingsResponse, InsertFreelistingsprogramCheckoutsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertFreelistingsprogramCheckoutsettingsRequest,
  output: InsertFreelistingsprogramCheckoutsettingsResponse,
  errors: [],
}));

/** Deletes `Checkout` settings and unenrolls merchant from `Checkout` program. */
export interface DeleteFreelistingsprogramCheckoutsettingsRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const DeleteFreelistingsprogramCheckoutsettingsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/freelistingsprogram/checkoutsettings" }),
  svc,
) as unknown as Schema.Schema<DeleteFreelistingsprogramCheckoutsettingsRequest>;

export interface DeleteFreelistingsprogramCheckoutsettingsResponse {}
export const DeleteFreelistingsprogramCheckoutsettingsResponse: Schema.Schema<DeleteFreelistingsprogramCheckoutsettingsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteFreelistingsprogramCheckoutsettingsResponse>;

export type DeleteFreelistingsprogramCheckoutsettingsError = CommonErrors;

export const deleteFreelistingsprogramCheckoutsettings: API.OperationMethod<DeleteFreelistingsprogramCheckoutsettingsRequest, DeleteFreelistingsprogramCheckoutsettingsResponse, DeleteFreelistingsprogramCheckoutsettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFreelistingsprogramCheckoutsettingsRequest,
  output: DeleteFreelistingsprogramCheckoutsettingsResponse,
  errors: [],
}));

/** Retrieves the status and review eligibility for the Shopping Ads program. Returns errors and warnings if they require action to resolve, will become disapprovals, or impact impressions. Use `accountstatuses` to view all issues for an account. */
export interface GetShoppingadsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
}

export const GetShoppingadsprogramRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/shoppingadsprogram" }),
  svc,
) as unknown as Schema.Schema<GetShoppingadsprogramRequest>;

export type GetShoppingadsprogramResponse = ShoppingAdsProgramStatus;
export const GetShoppingadsprogramResponse = ShoppingAdsProgramStatus;

export type GetShoppingadsprogramError = CommonErrors;

export const getShoppingadsprogram: API.OperationMethod<GetShoppingadsprogramRequest, GetShoppingadsprogramResponse, GetShoppingadsprogramError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetShoppingadsprogramRequest,
  output: GetShoppingadsprogramResponse,
  errors: [],
}));

/** Requests a review of Shopping ads in a specific region. This method deprecated. Use the `MerchantSupportService` to view product and account issues and request a review. */
export interface RequestreviewShoppingadsprogramRequest {
  /** Required. The ID of the account. */
  merchantId: string;
  /** Request body */
  body?: RequestReviewShoppingAdsRequest;
}

export const RequestreviewShoppingadsprogramRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(RequestReviewShoppingAdsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/shoppingadsprogram/requestreview", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestreviewShoppingadsprogramRequest>;

export interface RequestreviewShoppingadsprogramResponse {}
export const RequestreviewShoppingadsprogramResponse: Schema.Schema<RequestreviewShoppingadsprogramResponse> = Schema.Struct({}) as any as Schema.Schema<RequestreviewShoppingadsprogramResponse>;

export type RequestreviewShoppingadsprogramError = CommonErrors;

export const requestreviewShoppingadsprogram: API.OperationMethod<RequestreviewShoppingadsprogramRequest, RequestreviewShoppingadsprogramResponse, RequestreviewShoppingadsprogramError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestreviewShoppingadsprogramRequest,
  output: RequestreviewShoppingadsprogramResponse,
  errors: [],
}));

/** Lists CSS domains affiliated with a CSS group. */
export interface ListCssesRequest {
  /** Required. The CSS group ID of CSS domains to be listed. */
  cssGroupId: string;
  /** The maximum number of CSS domains to return. The service may return fewer than this value. If unspecified, at most 50 CSS domains will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListCsses` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCsses` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCssesRequest = Schema.Struct({
  cssGroupId: Schema.String.pipe(T.HttpPath("cssGroupId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{cssGroupId}/csses" }),
  svc,
) as unknown as Schema.Schema<ListCssesRequest>;

export type ListCssesResponse_Op = ListCssesResponse;
export const ListCssesResponse_Op = ListCssesResponse;

export type ListCssesError = CommonErrors;

export const listCsses = API.makePaginated(() => ({
  input: ListCssesRequest,
  output: ListCssesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a single CSS domain by ID. */
export interface GetCssesRequest {
  /** Required. The ID of the managing account. If this parameter is not the same as [cssDomainId](#cssDomainId), then this ID must be a CSS group ID and `cssDomainId` must be the ID of a CSS domain affiliated with this group. */
  cssGroupId: string;
  /** Required. The ID of the CSS domain to return. */
  cssDomainId: string;
}

export const GetCssesRequest = Schema.Struct({
  cssGroupId: Schema.String.pipe(T.HttpPath("cssGroupId")),
  cssDomainId: Schema.String.pipe(T.HttpPath("cssDomainId")),
}).pipe(
  T.Http({ method: "GET", path: "{cssGroupId}/csses/{cssDomainId}" }),
  svc,
) as unknown as Schema.Schema<GetCssesRequest>;

export type GetCssesResponse = Css;
export const GetCssesResponse = Css;

export type GetCssesError = CommonErrors;

export const getCsses: API.OperationMethod<GetCssesRequest, GetCssesResponse, GetCssesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCssesRequest,
  output: GetCssesResponse,
  errors: [],
}));

/** Updates labels that are assigned to a CSS domain by its CSS group. */
export interface UpdatelabelsCssesRequest {
  /** Required. The CSS group ID of the updated CSS domain. */
  cssGroupId: string;
  /** Required. The ID of the updated CSS domain. */
  cssDomainId: string;
  /** Request body */
  body?: LabelIds;
}

export const UpdatelabelsCssesRequest = Schema.Struct({
  cssGroupId: Schema.String.pipe(T.HttpPath("cssGroupId")),
  cssDomainId: Schema.String.pipe(T.HttpPath("cssDomainId")),
  body: Schema.optional(LabelIds).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{cssGroupId}/csses/{cssDomainId}/updatelabels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatelabelsCssesRequest>;

export type UpdatelabelsCssesResponse = Css;
export const UpdatelabelsCssesResponse = Css;

export type UpdatelabelsCssesError = CommonErrors;

export const updatelabelsCsses: API.OperationMethod<UpdatelabelsCssesRequest, UpdatelabelsCssesResponse, UpdatelabelsCssesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdatelabelsCssesRequest,
  output: UpdatelabelsCssesResponse,
  errors: [],
}));

/** Retrieves merchant performance metrics matching the search query and optionally segmented by selected dimensions. */
export interface SearchReportsRequest {
  /** Required. Id of the merchant making the call. Must be a standalone account or an MCA subaccount. */
  merchantId: string;
  /** Request body */
  body?: SearchRequest;
}

export const SearchReportsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(SearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/reports/search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchReportsRequest>;

export type SearchReportsResponse = SearchResponse;
export const SearchReportsResponse = SearchResponse;

export type SearchReportsError = CommonErrors;

export const searchReports: API.OperationMethod<SearchReportsRequest, SearchReportsResponse, SearchReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchReportsRequest,
  output: SearchReportsResponse,
  errors: [],
}));

/** Provide a list of merchant's issues with a support content and available actions. This content and actions are meant to be rendered and shown in third-party applications. */
export interface RenderaccountissuesMerchantsupportRequest {
  /** Required. The ID of the account to fetch issues for. */
  merchantId: string;
  /** Optional. The [IETF BCP-47](https://tools.ietf.org/html/bcp47) language code used to localize support content. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in support content. For example 'America/Los_Angeles'. If not set, results will use as a default UTC. */
  timeZone?: string;
  /** Request body */
  body?: RenderAccountIssuesRequestPayload;
}

export const RenderaccountissuesMerchantsupportRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  body: Schema.optional(RenderAccountIssuesRequestPayload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/merchantsupport/renderaccountissues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenderaccountissuesMerchantsupportRequest>;

export type RenderaccountissuesMerchantsupportResponse = RenderAccountIssuesResponse;
export const RenderaccountissuesMerchantsupportResponse = RenderAccountIssuesResponse;

export type RenderaccountissuesMerchantsupportError = CommonErrors;

export const renderaccountissuesMerchantsupport: API.OperationMethod<RenderaccountissuesMerchantsupportRequest, RenderaccountissuesMerchantsupportResponse, RenderaccountissuesMerchantsupportError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenderaccountissuesMerchantsupportRequest,
  output: RenderaccountissuesMerchantsupportResponse,
  errors: [],
}));

/** Provide a list of issues for merchant's product with a support content and available actions. This content and actions are meant to be rendered and shown in third-party applications. */
export interface RenderproductissuesMerchantsupportRequest {
  /** Required. The ID of the account that contains the product. */
  merchantId: string;
  /** Required. The [REST_ID](https://developers.google.com/shopping-content/reference/rest/v2.1/products#Product.FIELDS.id) of the product to fetch issues for. */
  productId: string;
  /** Optional. The [IETF BCP-47](https://tools.ietf.org/html/bcp47) language code used to localize support content. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in support content. For example 'America/Los_Angeles'. If not set, results will use as a default UTC. */
  timeZone?: string;
  /** Request body */
  body?: RenderProductIssuesRequestPayload;
}

export const RenderproductissuesMerchantsupportRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  body: Schema.optional(RenderProductIssuesRequestPayload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/merchantsupport/renderproductissues/{productId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenderproductissuesMerchantsupportRequest>;

export type RenderproductissuesMerchantsupportResponse = RenderProductIssuesResponse;
export const RenderproductissuesMerchantsupportResponse = RenderProductIssuesResponse;

export type RenderproductissuesMerchantsupportError = CommonErrors;

export const renderproductissuesMerchantsupport: API.OperationMethod<RenderproductissuesMerchantsupportRequest, RenderproductissuesMerchantsupportResponse, RenderproductissuesMerchantsupportError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenderproductissuesMerchantsupportRequest,
  output: RenderproductissuesMerchantsupportResponse,
  errors: [],
}));

/** Start an action. The action can be requested by merchants in third-party application. Before merchants can request the action, the third-party application needs to show them action specific content and display a user input form. You can request access using [Trigger action allowlist form](https://docs.google.com/forms/d/e/1FAIpQLSfeV_sBW9MBQv9BMTV6JZ1g11PGHLdHsrefca-9h0LmpU7CUg/viewform?usp=sharing). The action can be successfully started only once all `required` inputs are provided. If any `required` input is missing, or invalid value was provided, the service will return 400 error. Validation errors will contain Ids for all problematic field together with translated, human readable error messages that can be shown to the user. */
export interface TriggeractionMerchantsupportRequest {
  /** Required. The ID of the merchant's account. */
  merchantId: string;
  /** Optional. Language code [IETF BCP 47 syntax](https://tools.ietf.org/html/bcp47) used to localize the response. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Request body */
  body?: TriggerActionPayload;
}

export const TriggeractionMerchantsupportRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(TriggerActionPayload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/merchantsupport/triggeraction", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TriggeractionMerchantsupportRequest>;

export type TriggeractionMerchantsupportResponse = TriggerActionResponse;
export const TriggeractionMerchantsupportResponse = TriggerActionResponse;

export type TriggeractionMerchantsupportError = CommonErrors;

export const triggeractionMerchantsupport: API.OperationMethod<TriggeractionMerchantsupportRequest, TriggeractionMerchantsupportResponse, TriggeractionMerchantsupportError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TriggeractionMerchantsupportRequest,
  output: TriggeractionMerchantsupportResponse,
  errors: [],
}));

/** Retrieves a region defined in your Merchant Center account. */
export interface GetRegionsRequest {
  /** Required. The id of the merchant for which to retrieve region definition. */
  merchantId: string;
  /** Required. The id of the region to retrieve. */
  regionId: string;
}

export const GetRegionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  regionId: Schema.String.pipe(T.HttpPath("regionId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/regions/{regionId}" }),
  svc,
) as unknown as Schema.Schema<GetRegionsRequest>;

export type GetRegionsResponse = Region;
export const GetRegionsResponse = Region;

export type GetRegionsError = CommonErrors;

export const getRegions: API.OperationMethod<GetRegionsRequest, GetRegionsResponse, GetRegionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRegionsRequest,
  output: GetRegionsResponse,
  errors: [],
}));

/** Creates a region definition in your Merchant Center account. */
export interface CreateRegionsRequest {
  /** Required. The id of the merchant for which to create region definition. */
  merchantId: string;
  /** Required. The id of the region to create. */
  regionId?: string;
  /** Request body */
  body?: Region;
}

export const CreateRegionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  regionId: Schema.optional(Schema.String).pipe(T.HttpQuery("regionId")),
  body: Schema.optional(Region).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/regions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateRegionsRequest>;

export type CreateRegionsResponse = Region;
export const CreateRegionsResponse = Region;

export type CreateRegionsError = CommonErrors;

export const createRegions: API.OperationMethod<CreateRegionsRequest, CreateRegionsResponse, CreateRegionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateRegionsRequest,
  output: CreateRegionsResponse,
  errors: [],
}));

/** Updates a region definition in your Merchant Center account. */
export interface PatchRegionsRequest {
  /** Required. The id of the merchant for which to update region definition. */
  merchantId: string;
  /** Required. The id of the region to update. */
  regionId: string;
  /** Optional. The comma-separated field mask indicating the fields to update. Example: `"displayName,postalCodeArea.regionCode"`. */
  updateMask?: string;
  /** Request body */
  body?: Region;
}

export const PatchRegionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  regionId: Schema.String.pipe(T.HttpPath("regionId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Region).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "{merchantId}/regions/{regionId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchRegionsRequest>;

export type PatchRegionsResponse = Region;
export const PatchRegionsResponse = Region;

export type PatchRegionsError = CommonErrors;

export const patchRegions: API.OperationMethod<PatchRegionsRequest, PatchRegionsResponse, PatchRegionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchRegionsRequest,
  output: PatchRegionsResponse,
  errors: [],
}));

/** Deletes a region definition from your Merchant Center account. */
export interface DeleteRegionsRequest {
  /** Required. The id of the merchant for which to delete region definition. */
  merchantId: string;
  /** Required. The id of the region to delete. */
  regionId: string;
}

export const DeleteRegionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  regionId: Schema.String.pipe(T.HttpPath("regionId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/regions/{regionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRegionsRequest>;

export interface DeleteRegionsResponse {}
export const DeleteRegionsResponse: Schema.Schema<DeleteRegionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRegionsResponse>;

export type DeleteRegionsError = CommonErrors;

export const deleteRegions: API.OperationMethod<DeleteRegionsRequest, DeleteRegionsResponse, DeleteRegionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRegionsRequest,
  output: DeleteRegionsResponse,
  errors: [],
}));

/** Lists the regions in your Merchant Center account. */
export interface ListRegionsRequest {
  /** Required. The id of the merchant for which to list region definitions. */
  merchantId: string;
  /** The maximum number of regions to return. The service may return fewer than this value. If unspecified, at most 50 rules will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListRegions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRegions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListRegionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/regions" }),
  svc,
) as unknown as Schema.Schema<ListRegionsRequest>;

export type ListRegionsResponse_Op = ListRegionsResponse;
export const ListRegionsResponse_Op = ListRegionsResponse;

export type ListRegionsError = CommonErrors;

export const listRegions = API.makePaginated(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Inserts a promotion for your Merchant Center account. If the promotion already exists, then it updates the promotion instead. To [end or delete] (https://developers.google.com/shopping-content/guides/promotions#end_a_promotion) a promotion update the time period of the promotion to a time that has already passed. */
export interface CreatePromotionsRequest {
  /** Required. The ID of the account that contains the collection. */
  merchantId: string;
  /** Request body */
  body?: Promotion;
}

export const CreatePromotionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(Promotion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/promotions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePromotionsRequest>;

export type CreatePromotionsResponse = Promotion;
export const CreatePromotionsResponse = Promotion;

export type CreatePromotionsError = CommonErrors;

export const createPromotions: API.OperationMethod<CreatePromotionsRequest, CreatePromotionsResponse, CreatePromotionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePromotionsRequest,
  output: CreatePromotionsResponse,
  errors: [],
}));

/** Retrieves a promotion from your Merchant Center account. */
export interface GetPromotionsRequest {
  /** Required. The ID of the account that contains the collection. */
  merchantId: string;
  /** Required. REST ID of the promotion to retrieve. */
  id: string;
}

export const GetPromotionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/promotions/{id}" }),
  svc,
) as unknown as Schema.Schema<GetPromotionsRequest>;

export type GetPromotionsResponse = Promotion;
export const GetPromotionsResponse = Promotion;

export type GetPromotionsError = CommonErrors;

export const getPromotions: API.OperationMethod<GetPromotionsRequest, GetPromotionsResponse, GetPromotionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPromotionsRequest,
  output: GetPromotionsResponse,
  errors: [],
}));

/** List all promotions from your Merchant Center account. */
export interface ListPromotionsRequest {
  /** Required. The ID of the account that contains the collection. */
  merchantId: string;
  /** The maximum number of promotions to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListPromotion` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPromotion` must match the call that provided the page token. */
  pageToken?: string;
  /** [CLDR country code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) (for example, "US"), used as a filter on promotions target country. */
  countryCode?: string;
  /** The two-letter ISO 639-1 language code associated with the promotions, used as a filter. */
  languageCode?: string;
}

export const ListPromotionsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  countryCode: Schema.optional(Schema.String).pipe(T.HttpQuery("countryCode")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/promotions" }),
  svc,
) as unknown as Schema.Schema<ListPromotionsRequest>;

export type ListPromotionsResponse = ListPromotionResponse;
export const ListPromotionsResponse = ListPromotionResponse;

export type ListPromotionsError = CommonErrors;

export const listPromotions = API.makePaginated(() => ({
  input: ListPromotionsRequest,
  output: ListPromotionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generates recommendations for a merchant. */
export interface GenerateRecommendationsRequest {
  /** Required. The ID of the account to fetch recommendations for. */
  merchantId: string;
  /** Optional. Language code of the client. If not set, the result will be in default language (English). This language code affects all fields prefixed with "localized". This should be set to ISO 639-1 country code. List of currently verified supported language code: en, fr, cs, da, de, es, it, nl, no, pl, pt, pt, fi, sv, vi, tr, th, ko, zh-CN, zh-TW, ja, id, hi */
  languageCode?: string;
  /** Optional. List of allowed tags. Tags are a set of predefined strings that describe the category that individual recommendation types belong to. User can specify zero or more tags in this field to indicate what categories of recommendations they want to receive. Current list of supported tags: - TREND */
  allowedTag?: string[];
}

export const GenerateRecommendationsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  allowedTag: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("allowedTag")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/recommendations/generate" }),
  svc,
) as unknown as Schema.Schema<GenerateRecommendationsRequest>;

export type GenerateRecommendationsResponse_Op = GenerateRecommendationsResponse;
export const GenerateRecommendationsResponse_Op = GenerateRecommendationsResponse;

export type GenerateRecommendationsError = CommonErrors;

export const generateRecommendations: API.OperationMethod<GenerateRecommendationsRequest, GenerateRecommendationsResponse_Op, GenerateRecommendationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateRecommendationsRequest,
  output: GenerateRecommendationsResponse_Op,
  errors: [],
}));

/** Reports an interaction on a recommendation for a merchant. */
export interface ReportInteractionRecommendationsRequest {
  /** Required. The ID of the account that wants to report an interaction. */
  merchantId: string;
  /** Request body */
  body?: ReportInteractionRequest;
}

export const ReportInteractionRecommendationsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(ReportInteractionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/recommendations/reportInteraction", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportInteractionRecommendationsRequest>;

export interface ReportInteractionRecommendationsResponse {}
export const ReportInteractionRecommendationsResponse: Schema.Schema<ReportInteractionRecommendationsResponse> = Schema.Struct({}) as any as Schema.Schema<ReportInteractionRecommendationsResponse>;

export type ReportInteractionRecommendationsError = CommonErrors;

export const reportInteractionRecommendations: API.OperationMethod<ReportInteractionRecommendationsRequest, ReportInteractionRecommendationsResponse, ReportInteractionRecommendationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReportInteractionRecommendationsRequest,
  output: ReportInteractionRecommendationsResponse,
  errors: [],
}));

/** Gets an existing return policy. */
export interface GetReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Required. The id of the return policy to retrieve. */
  returnPolicyId: string;
}

export const GetReturnpolicyonlineRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  returnPolicyId: Schema.String.pipe(T.HttpPath("returnPolicyId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/returnpolicyonline/{returnPolicyId}" }),
  svc,
) as unknown as Schema.Schema<GetReturnpolicyonlineRequest>;

export type GetReturnpolicyonlineResponse = ReturnPolicyOnline;
export const GetReturnpolicyonlineResponse = ReturnPolicyOnline;

export type GetReturnpolicyonlineError = CommonErrors;

export const getReturnpolicyonline: API.OperationMethod<GetReturnpolicyonlineRequest, GetReturnpolicyonlineResponse, GetReturnpolicyonlineError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetReturnpolicyonlineRequest,
  output: GetReturnpolicyonlineResponse,
  errors: [],
}));

/** Creates a new return policy. */
export interface CreateReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Request body */
  body?: ReturnPolicyOnline;
}

export const CreateReturnpolicyonlineRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(ReturnPolicyOnline).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/returnpolicyonline", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateReturnpolicyonlineRequest>;

export type CreateReturnpolicyonlineResponse = ReturnPolicyOnline;
export const CreateReturnpolicyonlineResponse = ReturnPolicyOnline;

export type CreateReturnpolicyonlineError = CommonErrors;

export const createReturnpolicyonline: API.OperationMethod<CreateReturnpolicyonlineRequest, CreateReturnpolicyonlineResponse, CreateReturnpolicyonlineError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateReturnpolicyonlineRequest,
  output: CreateReturnpolicyonlineResponse,
  errors: [],
}));

/** Deletes an existing return policy. */
export interface DeleteReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Required. The id of the return policy to delete. */
  returnPolicyId: string;
}

export const DeleteReturnpolicyonlineRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  returnPolicyId: Schema.String.pipe(T.HttpPath("returnPolicyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/returnpolicyonline/{returnPolicyId}" }),
  svc,
) as unknown as Schema.Schema<DeleteReturnpolicyonlineRequest>;

export interface DeleteReturnpolicyonlineResponse {}
export const DeleteReturnpolicyonlineResponse: Schema.Schema<DeleteReturnpolicyonlineResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteReturnpolicyonlineResponse>;

export type DeleteReturnpolicyonlineError = CommonErrors;

export const deleteReturnpolicyonline: API.OperationMethod<DeleteReturnpolicyonlineRequest, DeleteReturnpolicyonlineResponse, DeleteReturnpolicyonlineError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteReturnpolicyonlineRequest,
  output: DeleteReturnpolicyonlineResponse,
  errors: [],
}));

/** Updates an existing return policy. */
export interface PatchReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
  /** Required. The id of the return policy to update. */
  returnPolicyId: string;
  /** Request body */
  body?: ReturnPolicyOnline;
}

export const PatchReturnpolicyonlineRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  returnPolicyId: Schema.String.pipe(T.HttpPath("returnPolicyId")),
  body: Schema.optional(ReturnPolicyOnline).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "{merchantId}/returnpolicyonline/{returnPolicyId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchReturnpolicyonlineRequest>;

export type PatchReturnpolicyonlineResponse = ReturnPolicyOnline;
export const PatchReturnpolicyonlineResponse = ReturnPolicyOnline;

export type PatchReturnpolicyonlineError = CommonErrors;

export const patchReturnpolicyonline: API.OperationMethod<PatchReturnpolicyonlineRequest, PatchReturnpolicyonlineResponse, PatchReturnpolicyonlineError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchReturnpolicyonlineRequest,
  output: PatchReturnpolicyonlineResponse,
  errors: [],
}));

/** Lists all existing return policies. */
export interface ListReturnpolicyonlineRequest {
  /** Required. The id of the merchant for which to retrieve the return policy online object. */
  merchantId: string;
}

export const ListReturnpolicyonlineRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/returnpolicyonline" }),
  svc,
) as unknown as Schema.Schema<ListReturnpolicyonlineRequest>;

export type ListReturnpolicyonlineResponse = ListReturnPolicyOnlineResponse;
export const ListReturnpolicyonlineResponse = ListReturnPolicyOnlineResponse;

export type ListReturnpolicyonlineError = CommonErrors;

export const listReturnpolicyonline: API.OperationMethod<ListReturnpolicyonlineRequest, ListReturnpolicyonlineResponse, ListReturnpolicyonlineError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListReturnpolicyonlineRequest,
  output: ListReturnpolicyonlineResponse,
  errors: [],
}));

/** Creates new order tracking signal. */
export interface CreateOrdertrackingsignalsRequest {
  /** The ID of the merchant for which the order signal is created. */
  merchantId: string;
  /** Request body */
  body?: OrderTrackingSignal;
}

export const CreateOrdertrackingsignalsRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(OrderTrackingSignal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/ordertrackingsignals", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrdertrackingsignalsRequest>;

export type CreateOrdertrackingsignalsResponse = OrderTrackingSignal;
export const CreateOrdertrackingsignalsResponse = OrderTrackingSignal;

export type CreateOrdertrackingsignalsError = CommonErrors;

export const createOrdertrackingsignals: API.OperationMethod<CreateOrdertrackingsignalsRequest, CreateOrdertrackingsignalsResponse, CreateOrdertrackingsignalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrdertrackingsignalsRequest,
  output: CreateOrdertrackingsignalsResponse,
  errors: [],
}));

/** Creates or updates the delivery time of a product. */
export interface CreateProductdeliverytimeRequest {
  /** The Google merchant ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** Request body */
  body?: ProductDeliveryTime;
}

export const CreateProductdeliverytimeRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  body: Schema.optional(ProductDeliveryTime).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "{merchantId}/productdeliverytime", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProductdeliverytimeRequest>;

export type CreateProductdeliverytimeResponse = ProductDeliveryTime;
export const CreateProductdeliverytimeResponse = ProductDeliveryTime;

export type CreateProductdeliverytimeError = CommonErrors;

export const createProductdeliverytime: API.OperationMethod<CreateProductdeliverytimeRequest, CreateProductdeliverytimeResponse, CreateProductdeliverytimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProductdeliverytimeRequest,
  output: CreateProductdeliverytimeResponse,
  errors: [],
}));

/** Gets `productDeliveryTime` by `productId`. */
export interface GetProductdeliverytimeRequest {
  /** Required. The Google merchant ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`. */
  productId: string;
}

export const GetProductdeliverytimeRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "{merchantId}/productdeliverytime/{productId}" }),
  svc,
) as unknown as Schema.Schema<GetProductdeliverytimeRequest>;

export type GetProductdeliverytimeResponse = ProductDeliveryTime;
export const GetProductdeliverytimeResponse = ProductDeliveryTime;

export type GetProductdeliverytimeError = CommonErrors;

export const getProductdeliverytime: API.OperationMethod<GetProductdeliverytimeRequest, GetProductdeliverytimeResponse, GetProductdeliverytimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProductdeliverytimeRequest,
  output: GetProductdeliverytimeResponse,
  errors: [],
}));

/** Deletes the delivery time of a product. */
export interface DeleteProductdeliverytimeRequest {
  /** Required. The Google merchant ID of the account that contains the product. This account cannot be a multi-client account. */
  merchantId: string;
  /** Required. The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`. */
  productId: string;
}

export const DeleteProductdeliverytimeRequest = Schema.Struct({
  merchantId: Schema.String.pipe(T.HttpPath("merchantId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "DELETE", path: "{merchantId}/productdeliverytime/{productId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProductdeliverytimeRequest>;

export interface DeleteProductdeliverytimeResponse {}
export const DeleteProductdeliverytimeResponse: Schema.Schema<DeleteProductdeliverytimeResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteProductdeliverytimeResponse>;

export type DeleteProductdeliverytimeError = CommonErrors;

export const deleteProductdeliverytime: API.OperationMethod<DeleteProductdeliverytimeRequest, DeleteProductdeliverytimeResponse, DeleteProductdeliverytimeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProductdeliverytimeRequest,
  output: DeleteProductdeliverytimeResponse,
  errors: [],
}));

