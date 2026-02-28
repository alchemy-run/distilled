// ==========================================================================
// Data Manager API (datamanager v1)
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
  name: "datamanager",
  version: "v1",
  rootUrl: "https://datamanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ProductAccount {
  /** Deprecated. Use `account_type` instead. */
  product?: "PRODUCT_UNSPECIFIED" | "GOOGLE_ADS" | "DISPLAY_VIDEO_PARTNER" | "DISPLAY_VIDEO_ADVERTISER" | "DATA_PARTNER" | (string & {});
  /** Required. The ID of the account. For example, your Google Ads account ID. */
  accountId?: string;
  /** Optional. The type of the account. For example, `GOOGLE_ADS`. Either `account_type` or the deprecated `product` is required. If both are set, the values must match. */
  accountType?: "ACCOUNT_TYPE_UNSPECIFIED" | "GOOGLE_ADS" | "DISPLAY_VIDEO_PARTNER" | "DISPLAY_VIDEO_ADVERTISER" | "DATA_PARTNER" | "GOOGLE_ANALYTICS_PROPERTY" | "GOOGLE_AD_MANAGER_AUDIENCE_LINK" | (string & {});
}

export const ProductAccount: Schema.Schema<ProductAccount> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  accountType: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductAccount" }) as any as Schema.Schema<ProductAccount>;

export interface Destination {
  /** Optional. ID for this `Destination` resource, unique within the request. Use to reference this `Destination` in the IngestEventsRequest and IngestAudienceMembersRequest. */
  reference?: string;
  /** Optional. The account used to make this API call. To add or remove data from the `operating_account`, this `login_account` must have write access to the `operating_account`. For example, a manager account of the `operating_account`, or an account with an established link to the `operating_account`. */
  loginAccount?: ProductAccount;
  /** Optional. An account that the calling user's `login_account` has access to, through an established account link. For example, a data partner's `login_account` might have access to a client's `linked_account`. The partner might use this field to send data from the `linked_account` to another `operating_account`. */
  linkedAccount?: ProductAccount;
  /** Required. The account to send the data to or remove the data from. */
  operatingAccount?: ProductAccount;
  /** Required. The object within the product account to ingest into. For example, a Google Ads audience ID, a Display & Video 360 audience ID or a Google Ads conversion action ID. */
  productDestinationId?: string;
}

export const Destination: Schema.Schema<Destination> = Schema.suspend(() => Schema.Struct({
  reference: Schema.optional(Schema.String),
  loginAccount: Schema.optional(ProductAccount),
  linkedAccount: Schema.optional(ProductAccount),
  operatingAccount: Schema.optional(ProductAccount),
  productDestinationId: Schema.optional(Schema.String),
})).annotate({ identifier: "Destination" }) as any as Schema.Schema<Destination>;

export interface AddressInfo {
  /** Required. Given (first) name of the user, all lowercase, with no punctuation, no leading or trailing whitespace, and hashed as SHA-256. */
  givenName?: string;
  /** Required. Family (last) name of the user, all lowercase, with no punctuation, no leading or trailing whitespace, and hashed as SHA-256. */
  familyName?: string;
  /** Required. The 2-letter region code in ISO-3166-1 alpha-2 of the user's address. */
  regionCode?: string;
  /** Required. The postal code of the user's address. */
  postalCode?: string;
}

export const AddressInfo: Schema.Schema<AddressInfo> = Schema.suspend(() => Schema.Struct({
  givenName: Schema.optional(Schema.String),
  familyName: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
})).annotate({ identifier: "AddressInfo" }) as any as Schema.Schema<AddressInfo>;

export interface UserIdentifier {
  /** Hashed email address using SHA-256 hash function after normalization. */
  emailAddress?: string;
  /** Hashed phone number using SHA-256 hash function after normalization (E164 standard). */
  phoneNumber?: string;
  /** The known components of a user's address. Holds a grouping of identifiers that are matched all at once. */
  address?: AddressInfo;
}

export const UserIdentifier: Schema.Schema<UserIdentifier> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  address: Schema.optional(AddressInfo),
})).annotate({ identifier: "UserIdentifier" }) as any as Schema.Schema<UserIdentifier>;

export interface UserData {
  /** Required. The identifiers for the user. It's possible to provide multiple instances of the same type of data (for example, multiple email addresses). To increase the likelihood of a match, provide as many identifiers as possible. At most 10 `userIdentifiers` can be provided in a single AudienceMember or Event. */
  userIdentifiers?: Array<UserIdentifier>;
}

export const UserData: Schema.Schema<UserData> = Schema.suspend(() => Schema.Struct({
  userIdentifiers: Schema.optional(Schema.Array(UserIdentifier)),
})).annotate({ identifier: "UserData" }) as any as Schema.Schema<UserData>;

export interface PairData {
  /** Required. Cleanroom-provided PII data, hashed with SHA256, and encrypted with an EC commutative cipher using publisher key for the [PAIR]((//support.google.com/admanager/answer/15067908)) user list. At most 10 `pairIds` can be provided in a single AudienceMember. */
  pairIds?: Array<string>;
}

export const PairData: Schema.Schema<PairData> = Schema.suspend(() => Schema.Struct({
  pairIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PairData" }) as any as Schema.Schema<PairData>;

export interface MobileData {
  /** Required. The list of mobile device IDs (advertising ID/IDFA). At most 10 `mobileIds` can be provided in a single AudienceMember. */
  mobileIds?: Array<string>;
}

export const MobileData: Schema.Schema<MobileData> = Schema.suspend(() => Schema.Struct({
  mobileIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MobileData" }) as any as Schema.Schema<MobileData>;

export interface UserIdData {
  /** Required. A unique identifier for a user, as defined by the advertiser. */
  userId?: string;
}

export const UserIdData: Schema.Schema<UserIdData> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "UserIdData" }) as any as Schema.Schema<UserIdData>;

export interface PpidData {
  /** Required. The list of publisher provided identifiers for a user. */
  ppids?: Array<string>;
}

export const PpidData: Schema.Schema<PpidData> = Schema.suspend(() => Schema.Struct({
  ppids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PpidData" }) as any as Schema.Schema<PpidData>;

export interface Consent {
  /** Optional. Represents if the user consents to ad user data. */
  adUserData?: "CONSENT_STATUS_UNSPECIFIED" | "CONSENT_GRANTED" | "CONSENT_DENIED" | (string & {});
  /** Optional. Represents if the user consents to ad personalization. */
  adPersonalization?: "CONSENT_STATUS_UNSPECIFIED" | "CONSENT_GRANTED" | "CONSENT_DENIED" | (string & {});
}

export const Consent: Schema.Schema<Consent> = Schema.suspend(() => Schema.Struct({
  adUserData: Schema.optional(Schema.String),
  adPersonalization: Schema.optional(Schema.String),
})).annotate({ identifier: "Consent" }) as any as Schema.Schema<Consent>;

export interface AudienceMember {
  /** Optional. Defines which Destination to send the audience member to. */
  destinationReferences?: Array<string>;
  /** User-provided data that identifies the user. */
  userData?: UserData;
  /** [Publisher Advertiser Identity Reconciliation (PAIR) IDs](//support.google.com/admanager/answer/15067908). This feature is only available to data partners. */
  pairData?: PairData;
  /** Data identifying the user's mobile devices. */
  mobileData?: MobileData;
  /** Data related to unique identifiers for a user, as defined by the advertiser. */
  userIdData?: UserIdData;
  /** Data related to publisher provided identifiers. This feature is only available to data partners. */
  ppidData?: PpidData;
  /** Optional. The consent setting for the user. */
  consent?: Consent;
}

export const AudienceMember: Schema.Schema<AudienceMember> = Schema.suspend(() => Schema.Struct({
  destinationReferences: Schema.optional(Schema.Array(Schema.String)),
  userData: Schema.optional(UserData),
  pairData: Schema.optional(PairData),
  mobileData: Schema.optional(MobileData),
  userIdData: Schema.optional(UserIdData),
  ppidData: Schema.optional(PpidData),
  consent: Schema.optional(Consent),
})).annotate({ identifier: "AudienceMember" }) as any as Schema.Schema<AudienceMember>;

export interface GcpWrappedKeyInfo {
  /** Required. The type of algorithm used to encrypt the data. */
  keyType?: "KEY_TYPE_UNSPECIFIED" | "XCHACHA20_POLY1305" | (string & {});
  /** Required. The [Workload Identity](//cloud.google.com/iam/docs/workload-identity-federation) pool provider required to use KEK. */
  wipProvider?: string;
  /** Required. Google Cloud Platform [Cloud Key Management Service resource ID](//cloud.google.com/kms/docs/getting-resource-ids). Should be in the format of `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{key}` or `gcp-kms://projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{key}` */
  kekUri?: string;
  /** Required. The base64 encoded encrypted data encryption key. */
  encryptedDek?: string;
}

export const GcpWrappedKeyInfo: Schema.Schema<GcpWrappedKeyInfo> = Schema.suspend(() => Schema.Struct({
  keyType: Schema.optional(Schema.String),
  wipProvider: Schema.optional(Schema.String),
  kekUri: Schema.optional(Schema.String),
  encryptedDek: Schema.optional(Schema.String),
})).annotate({ identifier: "GcpWrappedKeyInfo" }) as any as Schema.Schema<GcpWrappedKeyInfo>;

export interface AwsWrappedKeyInfo {
  /** Required. The type of algorithm used to encrypt the data. */
  keyType?: "KEY_TYPE_UNSPECIFIED" | "XCHACHA20_POLY1305" | (string & {});
  /** Required. The Amazon Resource Name of the IAM Role to assume for KMS decryption access. Should be in the format of `arn:{partition}:iam::{account_id}:role/{role_name}` */
  roleArn?: string;
  /** Required. The URI of the AWS KMS key used to decrypt the DEK. Should be in the format of `arn:{partition}:kms:{region}:{account_id}:key/{key_id}` or `aws-kms://arn:{partition}:kms:{region}:{account_id}:key/{key_id}` */
  kekUri?: string;
  /** Required. The base64 encoded encrypted data encryption key. */
  encryptedDek?: string;
}

export const AwsWrappedKeyInfo: Schema.Schema<AwsWrappedKeyInfo> = Schema.suspend(() => Schema.Struct({
  keyType: Schema.optional(Schema.String),
  roleArn: Schema.optional(Schema.String),
  kekUri: Schema.optional(Schema.String),
  encryptedDek: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsWrappedKeyInfo" }) as any as Schema.Schema<AwsWrappedKeyInfo>;

export interface EncryptionInfo {
  /** Google Cloud Platform wrapped key information. */
  gcpWrappedKeyInfo?: GcpWrappedKeyInfo;
  /** Amazon Web Services wrapped key information. */
  awsWrappedKeyInfo?: AwsWrappedKeyInfo;
}

export const EncryptionInfo: Schema.Schema<EncryptionInfo> = Schema.suspend(() => Schema.Struct({
  gcpWrappedKeyInfo: Schema.optional(GcpWrappedKeyInfo),
  awsWrappedKeyInfo: Schema.optional(AwsWrappedKeyInfo),
})).annotate({ identifier: "EncryptionInfo" }) as any as Schema.Schema<EncryptionInfo>;

export interface TermsOfService {
  /** Optional. The Customer Match terms of service: https://support.google.com/adspolicy/answer/6299717. This must be accepted when ingesting UserData or MobileData. This field is not required for Partner Match User list. */
  customerMatchTermsOfServiceStatus?: "TERMS_OF_SERVICE_STATUS_UNSPECIFIED" | "ACCEPTED" | "REJECTED" | (string & {});
}

export const TermsOfService: Schema.Schema<TermsOfService> = Schema.suspend(() => Schema.Struct({
  customerMatchTermsOfServiceStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "TermsOfService" }) as any as Schema.Schema<TermsOfService>;

export interface IngestAudienceMembersRequest {
  /** Required. The list of destinations to send the audience members to. */
  destinations?: Array<Destination>;
  /** Required. The list of users to send to the specified destinations. At most 10000 AudienceMember resources can be sent in a single request. */
  audienceMembers?: Array<AudienceMember>;
  /** Optional. Request-level consent to apply to all users in the request. User-level consent overrides request-level consent, and can be specified in each AudienceMember. */
  consent?: Consent;
  /** Optional. For testing purposes. If `true`, the request is validated but not executed. Only errors are returned, not results. */
  validateOnly?: boolean;
  /** Optional. Required for UserData uploads. The encoding type of the user identifiers. For hashed user identifiers, this is the encoding type of the hashed string. For encrypted hashed user identifiers, this is the encoding type of the outer encrypted string, but not necessarily the inner hashed string, meaning the inner hashed string could be encoded in a different way than the outer encrypted string. For non `UserData` uploads, this field is ignored. */
  encoding?: "ENCODING_UNSPECIFIED" | "HEX" | "BASE64" | (string & {});
  /** Optional. Encryption information for UserData uploads. If not set, it's assumed that uploaded identifying information is hashed but not encrypted. For non `UserData` uploads, this field is ignored. */
  encryptionInfo?: EncryptionInfo;
  /** Optional. The terms of service that the user has accepted/rejected. */
  termsOfService?: TermsOfService;
}

export const IngestAudienceMembersRequest: Schema.Schema<IngestAudienceMembersRequest> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Destination)),
  audienceMembers: Schema.optional(Schema.Array(AudienceMember)),
  consent: Schema.optional(Consent),
  validateOnly: Schema.optional(Schema.Boolean),
  encoding: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(EncryptionInfo),
  termsOfService: Schema.optional(TermsOfService),
})).annotate({ identifier: "IngestAudienceMembersRequest" }) as any as Schema.Schema<IngestAudienceMembersRequest>;

export interface IngestAudienceMembersResponse {
  /** The auto-generated ID of the request. */
  requestId?: string;
}

export const IngestAudienceMembersResponse: Schema.Schema<IngestAudienceMembersResponse> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestAudienceMembersResponse" }) as any as Schema.Schema<IngestAudienceMembersResponse>;

export interface RemoveAudienceMembersRequest {
  /** Required. The list of destinations to remove the users from. */
  destinations?: Array<Destination>;
  /** Required. The list of users to remove. */
  audienceMembers?: Array<AudienceMember>;
  /** Optional. For testing purposes. If `true`, the request is validated but not executed. Only errors are returned, not results. */
  validateOnly?: boolean;
  /** Optional. Required for UserData uploads. The encoding type of the user identifiers. Applies to only the outer encoding for encrypted user identifiers. For non `UserData` uploads, this field is ignored. */
  encoding?: "ENCODING_UNSPECIFIED" | "HEX" | "BASE64" | (string & {});
  /** Optional. Encryption information for UserData uploads. If not set, it's assumed that uploaded identifying information is hashed but not encrypted. For non `UserData` uploads, this field is ignored. */
  encryptionInfo?: EncryptionInfo;
}

export const RemoveAudienceMembersRequest: Schema.Schema<RemoveAudienceMembersRequest> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Destination)),
  audienceMembers: Schema.optional(Schema.Array(AudienceMember)),
  validateOnly: Schema.optional(Schema.Boolean),
  encoding: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(EncryptionInfo),
})).annotate({ identifier: "RemoveAudienceMembersRequest" }) as any as Schema.Schema<RemoveAudienceMembersRequest>;

export interface RemoveAudienceMembersResponse {
  /** The auto-generated ID of the request. */
  requestId?: string;
}

export const RemoveAudienceMembersResponse: Schema.Schema<RemoveAudienceMembersResponse> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveAudienceMembersResponse" }) as any as Schema.Schema<RemoveAudienceMembersResponse>;

export interface DeviceInfo {
  /** Optional. The user-agent string of the device for the given context. */
  userAgent?: string;
  /** Optional. The IP address of the device for the given context. **Note:** Google Ads does not support IP address matching for end users in the European Economic Area (EEA), United Kingdom (UK), or Switzerland (CH). Add logic to conditionally exclude sharing IP addresses from users from these regions and ensure that you provide users with clear and comprehensive information about the data you collect on your sites, apps, and other properties and get consent where required by law or any applicable Google policies. See the [About offline conversion imports](https://support.google.com/google-ads/answer/2998031) page for more details. */
  ipAddress?: string;
}

export const DeviceInfo: Schema.Schema<DeviceInfo> = Schema.suspend(() => Schema.Struct({
  userAgent: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceInfo" }) as any as Schema.Schema<DeviceInfo>;

export interface AdIdentifiers {
  /** Optional. Session attributes for event attribution and modeling. */
  sessionAttributes?: string;
  /** Optional. The Google click ID (gclid) associated with this event. */
  gclid?: string;
  /** Optional. The click identifier for clicks associated with app events and originating from iOS devices starting with iOS14. */
  gbraid?: string;
  /** Optional. The click identifier for clicks associated with web events and originating from iOS devices starting with iOS14. */
  wbraid?: string;
  /** Optional. Information gathered about the device being used (if any) at the time of landing onto the advertiser’s site after interacting with the ad. */
  landingPageDeviceInfo?: DeviceInfo;
}

export const AdIdentifiers: Schema.Schema<AdIdentifiers> = Schema.suspend(() => Schema.Struct({
  sessionAttributes: Schema.optional(Schema.String),
  gclid: Schema.optional(Schema.String),
  gbraid: Schema.optional(Schema.String),
  wbraid: Schema.optional(Schema.String),
  landingPageDeviceInfo: Schema.optional(DeviceInfo),
})).annotate({ identifier: "AdIdentifiers" }) as any as Schema.Schema<AdIdentifiers>;

export interface ItemParameter {
  /** Required. The name of the parameter to use. */
  parameterName?: string;
  /** Required. The string representation of the value of the parameter to set. */
  value?: string;
}

export const ItemParameter: Schema.Schema<ItemParameter> = Schema.suspend(() => Schema.Struct({
  parameterName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemParameter" }) as any as Schema.Schema<ItemParameter>;

export interface Item {
  /** Optional. The product ID within the Merchant Center account. */
  merchantProductId?: string;
  /** Optional. The number of this item associated with the event. */
  quantity?: string;
  /** Optional. The unit price excluding tax, shipping, and any transaction level discounts. */
  unitPrice?: number;
  /** Optional. A unique identifier to reference the item. */
  itemId?: string;
  /** Optional. A bucket of any [event parameters related to an item](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) to be included within the event that were not already specified using other structured fields. */
  additionalItemParameters?: Array<ItemParameter>;
}

export const Item: Schema.Schema<Item> = Schema.suspend(() => Schema.Struct({
  merchantProductId: Schema.optional(Schema.String),
  quantity: Schema.optional(Schema.String),
  unitPrice: Schema.optional(Schema.Number),
  itemId: Schema.optional(Schema.String),
  additionalItemParameters: Schema.optional(Schema.Array(ItemParameter)),
})).annotate({ identifier: "Item" }) as any as Schema.Schema<Item>;

export interface CartData {
  /** Optional. The Merchant Center ID associated with the items. */
  merchantId?: string;
  /** Optional. The Merchant Center feed label associated with the feed of the items. */
  merchantFeedLabel?: string;
  /** Optional. The language code in ISO 639-1 associated with the Merchant Center feed of the items.where your items are uploaded. */
  merchantFeedLanguageCode?: string;
  /** Optional. The sum of all discounts associated with the transaction. */
  transactionDiscount?: number;
  /** Optional. The list of items associated with the event. */
  items?: Array<Item>;
}

export const CartData: Schema.Schema<CartData> = Schema.suspend(() => Schema.Struct({
  merchantId: Schema.optional(Schema.String),
  merchantFeedLabel: Schema.optional(Schema.String),
  merchantFeedLanguageCode: Schema.optional(Schema.String),
  transactionDiscount: Schema.optional(Schema.Number),
  items: Schema.optional(Schema.Array(Item)),
})).annotate({ identifier: "CartData" }) as any as Schema.Schema<CartData>;

export interface CustomVariable {
  /** Optional. The name of the custom variable to set. If the variable is not found for the given destination, it will be ignored. */
  variable?: string;
  /** Optional. The value to store for the custom variable. */
  value?: string;
  /** Optional. Reference string used to determine which of the Event.destination_references the custom variable should be sent to. If empty, the Event.destination_references will be used. */
  destinationReferences?: Array<string>;
}

export const CustomVariable: Schema.Schema<CustomVariable> = Schema.suspend(() => Schema.Struct({
  variable: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  destinationReferences: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomVariable" }) as any as Schema.Schema<CustomVariable>;

export interface ExperimentalField {
  /** Optional. The name of the field to use. */
  field?: string;
  /** Optional. The value the field to set. */
  value?: string;
}

export const ExperimentalField: Schema.Schema<ExperimentalField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "ExperimentalField" }) as any as Schema.Schema<ExperimentalField>;

export interface UserProperty {
  /** Required. The name of the user property to use. */
  propertyName?: string;
  /** Required. The string representation of the value of the user property to use. */
  value?: string;
}

export const UserProperty: Schema.Schema<UserProperty> = Schema.suspend(() => Schema.Struct({
  propertyName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserProperty" }) as any as Schema.Schema<UserProperty>;

export interface UserProperties {
  /** Optional. Type of the customer associated with the event. */
  customerType?: "CUSTOMER_TYPE_UNSPECIFIED" | "NEW" | "RETURNING" | "REENGAGED" | (string & {});
  /** Optional. The advertiser-assessed value of the customer. */
  customerValueBucket?: "CUSTOMER_VALUE_BUCKET_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  /** Optional. A bucket of any additional [user properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties) for the user associated with this event. */
  additionalUserProperties?: Array<UserProperty>;
}

export const UserProperties: Schema.Schema<UserProperties> = Schema.suspend(() => Schema.Struct({
  customerType: Schema.optional(Schema.String),
  customerValueBucket: Schema.optional(Schema.String),
  additionalUserProperties: Schema.optional(Schema.Array(UserProperty)),
})).annotate({ identifier: "UserProperties" }) as any as Schema.Schema<UserProperties>;

export interface EventParameter {
  /** Required. The name of the parameter to use. */
  parameterName?: string;
  /** Required. The string representation of the value of the parameter to set. */
  value?: string;
}

export const EventParameter: Schema.Schema<EventParameter> = Schema.suspend(() => Schema.Struct({
  parameterName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "EventParameter" }) as any as Schema.Schema<EventParameter>;

export interface Event {
  /** Optional. Reference string used to determine the destination. If empty, the event will be sent to all destinations in the request. */
  destinationReferences?: Array<string>;
  /** Optional. The unique identifier for this event. Required for conversions using multiple data sources. */
  transactionId?: string;
  /** Required. The time the event occurred. */
  eventTimestamp?: string;
  /** Optional. The last time the event was updated. */
  lastUpdatedTimestamp?: string;
  /** Optional. Pieces of user provided data, representing the user the event is associated with. */
  userData?: UserData;
  /** Optional. Information about whether the associated user has provided different types of consent. */
  consent?: Consent;
  /** Optional. Identifiers and other information used to match the conversion event with other online activity (such as ad clicks). */
  adIdentifiers?: AdIdentifiers;
  /** Optional. The currency code associated with all monetary values within this event. */
  currency?: string;
  /** Optional. The conversion value associated with the event, for value-based conversions. */
  conversionValue?: number;
  /** Optional. Signal for where the event happened (web, app, in-store, etc.). */
  eventSource?: "EVENT_SOURCE_UNSPECIFIED" | "WEB" | "APP" | "IN_STORE" | "PHONE" | "OTHER" | (string & {});
  /** Optional. Information gathered about the device being used (if any) when the event happened. */
  eventDeviceInfo?: DeviceInfo;
  /** Optional. Information about the transaction and items associated with the event. */
  cartData?: CartData;
  /** Optional. Additional key/value pair information to send to the conversion containers (conversion action or FL activity). */
  customVariables?: Array<CustomVariable>;
  /** Optional. A list of key/value pairs for experimental fields that may eventually be promoted to be part of the API. */
  experimentalFields?: Array<ExperimentalField>;
  /** Optional. Advertiser-assessed information about the user at the time that the event happened. */
  userProperties?: UserProperties;
  /** Optional. The name of the event. Required for GA4 events. */
  eventName?: string;
  /** Optional. A unique identifier for the user instance of a web client for this GA4 web stream. */
  clientId?: string;
  /** Optional. A unique identifier for a user, as defined by the advertiser. */
  userId?: string;
  /** Optional. A bucket of any [event parameters](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) to be included within the event that were not already specified using other structured fields. */
  additionalEventParameters?: Array<EventParameter>;
}

export const Event: Schema.Schema<Event> = Schema.suspend(() => Schema.Struct({
  destinationReferences: Schema.optional(Schema.Array(Schema.String)),
  transactionId: Schema.optional(Schema.String),
  eventTimestamp: Schema.optional(Schema.String),
  lastUpdatedTimestamp: Schema.optional(Schema.String),
  userData: Schema.optional(UserData),
  consent: Schema.optional(Consent),
  adIdentifiers: Schema.optional(AdIdentifiers),
  currency: Schema.optional(Schema.String),
  conversionValue: Schema.optional(Schema.Number),
  eventSource: Schema.optional(Schema.String),
  eventDeviceInfo: Schema.optional(DeviceInfo),
  cartData: Schema.optional(CartData),
  customVariables: Schema.optional(Schema.Array(CustomVariable)),
  experimentalFields: Schema.optional(Schema.Array(ExperimentalField)),
  userProperties: Schema.optional(UserProperties),
  eventName: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  additionalEventParameters: Schema.optional(Schema.Array(EventParameter)),
})).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface IngestEventsRequest {
  /** Required. The list of destinations to send the events to. */
  destinations?: Array<Destination>;
  /** Required. The list of events to send to the specified destinations. At most 2000 Event resources can be sent in a single request. */
  events?: Array<Event>;
  /** Optional. Request-level consent to apply to all users in the request. User-level consent overrides request-level consent, and can be specified in each Event. */
  consent?: Consent;
  /** Optional. For testing purposes. If `true`, the request is validated but not executed. Only errors are returned, not results. */
  validateOnly?: boolean;
  /** Optional. Required for UserData uploads. The encoding type of the user identifiers. For hashed user identifiers, this is the encoding type of the hashed string. For encrypted hashed user identifiers, this is the encoding type of the outer encrypted string, but not necessarily the inner hashed string, meaning the inner hashed string could be encoded in a different way than the outer encrypted string. For non `UserData` uploads, this field is ignored. */
  encoding?: "ENCODING_UNSPECIFIED" | "HEX" | "BASE64" | (string & {});
  /** Optional. Encryption information for UserData uploads. If not set, it's assumed that uploaded identifying information is hashed but not encrypted. For non `UserData` uploads, this field is ignored. */
  encryptionInfo?: EncryptionInfo;
}

export const IngestEventsRequest: Schema.Schema<IngestEventsRequest> = Schema.suspend(() => Schema.Struct({
  destinations: Schema.optional(Schema.Array(Destination)),
  events: Schema.optional(Schema.Array(Event)),
  consent: Schema.optional(Consent),
  validateOnly: Schema.optional(Schema.Boolean),
  encoding: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(EncryptionInfo),
})).annotate({ identifier: "IngestEventsRequest" }) as any as Schema.Schema<IngestEventsRequest>;

export interface IngestEventsResponse {
  /** The auto-generated ID of the request. */
  requestId?: string;
}

export const IngestEventsResponse: Schema.Schema<IngestEventsResponse> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestEventsResponse" }) as any as Schema.Schema<IngestEventsResponse>;

export interface ErrorCount {
  /** The count of records that failed to upload for a given reason. */
  recordCount?: string;
  /** The error reason of the failed records. */
  reason?: "PROCESSING_ERROR_REASON_UNSPECIFIED" | "PROCESSING_ERROR_REASON_INVALID_CUSTOM_VARIABLE" | "PROCESSING_ERROR_REASON_CUSTOM_VARIABLE_NOT_ENABLED" | "PROCESSING_ERROR_REASON_EVENT_TOO_OLD" | "PROCESSING_ERROR_REASON_DENIED_CONSENT" | "PROCESSING_ERROR_REASON_NO_CONSENT" | "PROCESSING_ERROR_REASON_UNKNOWN_CONSENT" | "PROCESSING_ERROR_REASON_DUPLICATE_GCLID" | "PROCESSING_ERROR_REASON_DUPLICATE_TRANSACTION_ID" | "PROCESSING_ERROR_REASON_INVALID_GBRAID" | "PROCESSING_ERROR_REASON_INVALID_GCLID" | "PROCESSING_ERROR_REASON_INVALID_MERCHANT_ID" | "PROCESSING_ERROR_REASON_INVALID_WBRAID" | "PROCESSING_ERROR_REASON_INTERNAL_ERROR" | "PROCESSING_ERROR_REASON_DESTINATION_ACCOUNT_ENHANCED_CONVERSIONS_TERMS_NOT_SIGNED" | "PROCESSING_ERROR_REASON_INVALID_EVENT" | "PROCESSING_ERROR_REASON_INSUFFICIENT_MATCHED_TRANSACTIONS" | "PROCESSING_ERROR_REASON_INSUFFICIENT_TRANSACTIONS" | "PROCESSING_ERROR_REASON_INVALID_FORMAT" | "PROCESSING_ERROR_REASON_DECRYPTION_ERROR" | "PROCESSING_ERROR_REASON_DEK_DECRYPTION_ERROR" | "PROCESSING_ERROR_REASON_INVALID_WIP" | "PROCESSING_ERROR_REASON_INVALID_KEK" | "PROCESSING_ERROR_REASON_WIP_AUTH_FAILED" | "PROCESSING_ERROR_REASON_KEK_PERMISSION_DENIED" | "PROCESSING_ERROR_REASON_AWS_AUTH_FAILED" | "PROCESSING_ERROR_REASON_USER_IDENTIFIER_DECRYPTION_ERROR" | "PROCESSING_ERROR_OPERATING_ACCOUNT_MISMATCH_FOR_AD_IDENTIFIER" | (string & {});
}

export const ErrorCount: Schema.Schema<ErrorCount> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorCount" }) as any as Schema.Schema<ErrorCount>;

export interface ErrorInfo {
  /** A list of errors and counts per error reason. May not be populated in all cases. */
  errorCounts?: Array<ErrorCount>;
}

export const ErrorInfo: Schema.Schema<ErrorInfo> = Schema.suspend(() => Schema.Struct({
  errorCounts: Schema.optional(Schema.Array(ErrorCount)),
})).annotate({ identifier: "ErrorInfo" }) as any as Schema.Schema<ErrorInfo>;

export interface WarningCount {
  /** The count of records that have a warning. */
  recordCount?: string;
  /** The warning reason. */
  reason?: "PROCESSING_WARNING_REASON_UNSPECIFIED" | "PROCESSING_WARNING_REASON_KEK_PERMISSION_DENIED" | "PROCESSING_WARNING_REASON_DEK_DECRYPTION_ERROR" | "PROCESSING_WARNING_REASON_DECRYPTION_ERROR" | "PROCESSING_WARNING_REASON_WIP_AUTH_FAILED" | "PROCESSING_WARNING_REASON_INVALID_WIP" | "PROCESSING_WARNING_REASON_INVALID_KEK" | "PROCESSING_WARNING_REASON_USER_IDENTIFIER_DECRYPTION_ERROR" | "PROCESSING_WARNING_REASON_INTERNAL_ERROR" | "PROCESSING_WARNING_REASON_AWS_AUTH_FAILED" | (string & {});
}

export const WarningCount: Schema.Schema<WarningCount> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "WarningCount" }) as any as Schema.Schema<WarningCount>;

export interface WarningInfo {
  /** A list of warnings and counts per warning reason. */
  warningCounts?: Array<WarningCount>;
}

export const WarningInfo: Schema.Schema<WarningInfo> = Schema.suspend(() => Schema.Struct({
  warningCounts: Schema.optional(Schema.Array(WarningCount)),
})).annotate({ identifier: "WarningInfo" }) as any as Schema.Schema<WarningInfo>;

export interface IngestUserDataStatus {
  /** The total count of audience members sent in the upload request for the destination. Includes all audience members in the request, regardless of whether they were successfully ingested or not. */
  recordCount?: string;
  /** The total count of user identifiers sent in the upload request for the destination. Includes all user identifiers in the request, regardless of whether they were successfully ingested or not. */
  userIdentifierCount?: string;
  /** The match rate range of the upload. */
  uploadMatchRateRange?: "MATCH_RATE_RANGE_UNKNOWN" | "MATCH_RATE_RANGE_NOT_ELIGIBLE" | "MATCH_RATE_RANGE_LESS_THAN_20" | "MATCH_RATE_RANGE_20_TO_30" | "MATCH_RATE_RANGE_31_TO_40" | "MATCH_RATE_RANGE_41_TO_50" | "MATCH_RATE_RANGE_51_TO_60" | "MATCH_RATE_RANGE_61_TO_70" | "MATCH_RATE_RANGE_71_TO_80" | "MATCH_RATE_RANGE_81_TO_90" | "MATCH_RATE_RANGE_91_TO_100" | (string & {});
}

export const IngestUserDataStatus: Schema.Schema<IngestUserDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  userIdentifierCount: Schema.optional(Schema.String),
  uploadMatchRateRange: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestUserDataStatus" }) as any as Schema.Schema<IngestUserDataStatus>;

export interface IngestMobileDataStatus {
  /** The total count of audience members sent in the upload request for the destination. Includes all audience members in the request, regardless of whether they were successfully ingested or not. */
  recordCount?: string;
  /** The total count of mobile ids sent in the upload request for the destination. Includes all mobile ids in the request, regardless of whether they were successfully ingested or not. */
  mobileIdCount?: string;
}

export const IngestMobileDataStatus: Schema.Schema<IngestMobileDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  mobileIdCount: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestMobileDataStatus" }) as any as Schema.Schema<IngestMobileDataStatus>;

export interface IngestPairDataStatus {
  /** The total count of audience members sent in the upload request for the destination. Includes all audience members in the request, regardless of whether they were successfully ingested or not. */
  recordCount?: string;
  /** The total count of pair ids sent in the upload request for the destination. Includes all pair ids in the request, regardless of whether they were successfully ingested or not. */
  pairIdCount?: string;
}

export const IngestPairDataStatus: Schema.Schema<IngestPairDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  pairIdCount: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestPairDataStatus" }) as any as Schema.Schema<IngestPairDataStatus>;

export interface IngestUserIdDataStatus {
  /** The total count of audience members sent in the upload request for the destination. Includes all audience members in the request, regardless of whether they were successfully ingested or not. */
  recordCount?: string;
  /** The total count of user ids sent in the upload request for the destination. Includes all user ids in the request, regardless of whether they were successfully ingested or not. */
  userIdCount?: string;
}

export const IngestUserIdDataStatus: Schema.Schema<IngestUserIdDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  userIdCount: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestUserIdDataStatus" }) as any as Schema.Schema<IngestUserIdDataStatus>;

export interface IngestPpidDataStatus {
  /** The total count of audience members sent in the upload request for the destination. Includes all audience members in the request, regardless of whether they were successfully ingested or not. */
  recordCount?: string;
  /** The total count of ppids sent in the upload request for the destination. Includes all ppids in the request, regardless of whether they were successfully ingested or not. */
  ppidCount?: string;
}

export const IngestPpidDataStatus: Schema.Schema<IngestPpidDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  ppidCount: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestPpidDataStatus" }) as any as Schema.Schema<IngestPpidDataStatus>;

export interface IngestAudienceMembersStatus {
  /** The status of the user data ingestion to the destination. */
  userDataIngestionStatus?: IngestUserDataStatus;
  /** The status of the mobile data ingestion to the destination. */
  mobileDataIngestionStatus?: IngestMobileDataStatus;
  /** The status of the pair data ingestion to the destination. */
  pairDataIngestionStatus?: IngestPairDataStatus;
  /** The status of the user id data ingestion to the destination. */
  userIdDataIngestionStatus?: IngestUserIdDataStatus;
  /** The status of the ppid data ingestion to the destination. */
  ppidDataIngestionStatus?: IngestPpidDataStatus;
}

export const IngestAudienceMembersStatus: Schema.Schema<IngestAudienceMembersStatus> = Schema.suspend(() => Schema.Struct({
  userDataIngestionStatus: Schema.optional(IngestUserDataStatus),
  mobileDataIngestionStatus: Schema.optional(IngestMobileDataStatus),
  pairDataIngestionStatus: Schema.optional(IngestPairDataStatus),
  userIdDataIngestionStatus: Schema.optional(IngestUserIdDataStatus),
  ppidDataIngestionStatus: Schema.optional(IngestPpidDataStatus),
})).annotate({ identifier: "IngestAudienceMembersStatus" }) as any as Schema.Schema<IngestAudienceMembersStatus>;

export interface IngestEventsStatus {
  /** The total count of events sent in the upload request. Includes all events in the request, regardless of whether they were successfully ingested or not. */
  recordCount?: string;
}

export const IngestEventsStatus: Schema.Schema<IngestEventsStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestEventsStatus" }) as any as Schema.Schema<IngestEventsStatus>;

export interface RemoveUserDataStatus {
  /** The total count of audience members sent in the removal request. Includes all audience members in the request, regardless of whether they were successfully removed or not. */
  recordCount?: string;
  /** The total count of user identifiers sent in the removal request. Includes all user identifiers in the request, regardless of whether they were successfully removed or not. */
  userIdentifierCount?: string;
}

export const RemoveUserDataStatus: Schema.Schema<RemoveUserDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  userIdentifierCount: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveUserDataStatus" }) as any as Schema.Schema<RemoveUserDataStatus>;

export interface RemoveMobileDataStatus {
  /** The total count of audience members sent in the removal request. Includes all audience members in the request, regardless of whether they were successfully removed or not. */
  recordCount?: string;
  /** The total count of mobile Ids sent in the removal request. Includes all mobile ids in the request, regardless of whether they were successfully removed or not. */
  mobileIdCount?: string;
}

export const RemoveMobileDataStatus: Schema.Schema<RemoveMobileDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  mobileIdCount: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveMobileDataStatus" }) as any as Schema.Schema<RemoveMobileDataStatus>;

export interface RemovePairDataStatus {
  /** The total count of audience members sent in the removal request. Includes all audience members in the request, regardless of whether they were successfully removed or not. */
  recordCount?: string;
  /** The total count of pair ids sent in the removal request. Includes all pair ids in the request, regardless of whether they were successfully removed or not. */
  pairIdCount?: string;
}

export const RemovePairDataStatus: Schema.Schema<RemovePairDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  pairIdCount: Schema.optional(Schema.String),
})).annotate({ identifier: "RemovePairDataStatus" }) as any as Schema.Schema<RemovePairDataStatus>;

export interface RemoveUserIdDataStatus {
  /** The total count of audience members sent in the removal request. Includes all audience members in the request, regardless of whether they were successfully removed or not. */
  recordCount?: string;
  /** The total count of user ids sent in the removal request. Includes all user ids in the request, regardless of whether they were successfully removed or not. */
  userIdCount?: string;
}

export const RemoveUserIdDataStatus: Schema.Schema<RemoveUserIdDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  userIdCount: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveUserIdDataStatus" }) as any as Schema.Schema<RemoveUserIdDataStatus>;

export interface RemovePpidDataStatus {
  /** The total count of audience members sent in the removal request. Includes all audience members in the request, regardless of whether they were successfully removed or not. */
  recordCount?: string;
  /** The total count of ppids sent in the removal request. Includes all ppids in the request, regardless of whether they were successfully removed or not. */
  ppidCount?: string;
}

export const RemovePpidDataStatus: Schema.Schema<RemovePpidDataStatus> = Schema.suspend(() => Schema.Struct({
  recordCount: Schema.optional(Schema.String),
  ppidCount: Schema.optional(Schema.String),
})).annotate({ identifier: "RemovePpidDataStatus" }) as any as Schema.Schema<RemovePpidDataStatus>;

export interface RemoveAudienceMembersStatus {
  /** The status of the user data removal from the destination. */
  userDataRemovalStatus?: RemoveUserDataStatus;
  /** The status of the mobile data removal from the destination. */
  mobileDataRemovalStatus?: RemoveMobileDataStatus;
  /** The status of the pair data removal from the destination. */
  pairDataRemovalStatus?: RemovePairDataStatus;
  /** The status of the user id data removal from the destination. */
  userIdDataRemovalStatus?: RemoveUserIdDataStatus;
  /** The status of the ppid data removal from the destination. */
  ppidDataRemovalStatus?: RemovePpidDataStatus;
}

export const RemoveAudienceMembersStatus: Schema.Schema<RemoveAudienceMembersStatus> = Schema.suspend(() => Schema.Struct({
  userDataRemovalStatus: Schema.optional(RemoveUserDataStatus),
  mobileDataRemovalStatus: Schema.optional(RemoveMobileDataStatus),
  pairDataRemovalStatus: Schema.optional(RemovePairDataStatus),
  userIdDataRemovalStatus: Schema.optional(RemoveUserIdDataStatus),
  ppidDataRemovalStatus: Schema.optional(RemovePpidDataStatus),
})).annotate({ identifier: "RemoveAudienceMembersStatus" }) as any as Schema.Schema<RemoveAudienceMembersStatus>;

export interface RequestStatusPerDestination {
  /** A destination within a DM API request. */
  destination?: Destination;
  /** The request status of the destination. */
  requestStatus?: "REQUEST_STATUS_UNKNOWN" | "SUCCESS" | "PROCESSING" | "FAILED" | "PARTIAL_SUCCESS" | (string & {});
  /** An error info error containing the error reason and error counts related to the upload. */
  errorInfo?: ErrorInfo;
  /** A warning info containing the warning reason and warning counts related to the upload. */
  warningInfo?: WarningInfo;
  /** The status of the ingest audience members request. */
  audienceMembersIngestionStatus?: IngestAudienceMembersStatus;
  /** The status of the ingest events request. */
  eventsIngestionStatus?: IngestEventsStatus;
  /** The status of the remove audience members request. */
  audienceMembersRemovalStatus?: RemoveAudienceMembersStatus;
}

export const RequestStatusPerDestination: Schema.Schema<RequestStatusPerDestination> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Destination),
  requestStatus: Schema.optional(Schema.String),
  errorInfo: Schema.optional(ErrorInfo),
  warningInfo: Schema.optional(WarningInfo),
  audienceMembersIngestionStatus: Schema.optional(IngestAudienceMembersStatus),
  eventsIngestionStatus: Schema.optional(IngestEventsStatus),
  audienceMembersRemovalStatus: Schema.optional(RemoveAudienceMembersStatus),
})).annotate({ identifier: "RequestStatusPerDestination" }) as any as Schema.Schema<RequestStatusPerDestination>;

export interface RetrieveRequestStatusResponse {
  /** A list of request statuses per destination. The order of the statuses matches the order of the destinations in the original request. */
  requestStatusPerDestination?: Array<RequestStatusPerDestination>;
}

export const RetrieveRequestStatusResponse: Schema.Schema<RetrieveRequestStatusResponse> = Schema.suspend(() => Schema.Struct({
  requestStatusPerDestination: Schema.optional(Schema.Array(RequestStatusPerDestination)),
})).annotate({ identifier: "RetrieveRequestStatusResponse" }) as any as Schema.Schema<RetrieveRequestStatusResponse>;

export interface Location {
  /** List of ISO 3166-1 alpha-2 region codes. */
  regionCodes?: Array<string>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  regionCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface Baseline {
  /** The baseline location of the request. Baseline location is an OR-list of the requested regions. */
  baselineLocation?: Location;
  /** If set to true, the service will try to automatically detect the baseline location for insights. */
  locationAutoDetectionEnabled?: boolean;
}

export const Baseline: Schema.Schema<Baseline> = Schema.suspend(() => Schema.Struct({
  baselineLocation: Schema.optional(Location),
  locationAutoDetectionEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Baseline" }) as any as Schema.Schema<Baseline>;

export interface RetrieveInsightsRequest {
  /** Required. Baseline for the insights requested. */
  baseline?: Baseline;
  /** Required. The user list ID for which insights are requested. */
  userListId?: string;
}

export const RetrieveInsightsRequest: Schema.Schema<RetrieveInsightsRequest> = Schema.suspend(() => Schema.Struct({
  baseline: Schema.optional(Baseline),
  userListId: Schema.optional(Schema.String),
})).annotate({ identifier: "RetrieveInsightsRequest" }) as any as Schema.Schema<RetrieveInsightsRequest>;

export interface MarketingDataInsightsAttribute {
  /** The user interest ID. */
  userInterestId?: string;
  /** Measure of lift that the audience has for the attribute value as compared to the baseline. Range [0-1]. */
  lift?: number;
  /** Age range of the audience for which the lift is provided. */
  ageRange?: "AGE_RANGE_UNSPECIFIED" | "AGE_RANGE_UNKNOWN" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_UP" | (string & {});
  /** Gender of the audience for which the lift is provided. */
  gender?: "GENDER_UNSPECIFIED" | "GENDER_UNKNOWN" | "GENDER_MALE" | "GENDER_FEMALE" | (string & {});
}

export const MarketingDataInsightsAttribute: Schema.Schema<MarketingDataInsightsAttribute> = Schema.suspend(() => Schema.Struct({
  userInterestId: Schema.optional(Schema.String),
  lift: Schema.optional(Schema.Number),
  ageRange: Schema.optional(Schema.String),
  gender: Schema.optional(Schema.String),
})).annotate({ identifier: "MarketingDataInsightsAttribute" }) as any as Schema.Schema<MarketingDataInsightsAttribute>;

export interface MarketingDataInsight {
  /** The dimension to which the insight belongs. */
  dimension?: "AUDIENCE_INSIGHTS_DIMENSION_UNSPECIFIED" | "AUDIENCE_INSIGHTS_DIMENSION_UNKNOWN" | "AFFINITY_USER_INTEREST" | "IN_MARKET_USER_INTEREST" | "AGE_RANGE" | "GENDER" | (string & {});
  /** Insights for values of a given dimension. */
  attributes?: Array<MarketingDataInsightsAttribute>;
}

export const MarketingDataInsight: Schema.Schema<MarketingDataInsight> = Schema.suspend(() => Schema.Struct({
  dimension: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(MarketingDataInsightsAttribute)),
})).annotate({ identifier: "MarketingDataInsight" }) as any as Schema.Schema<MarketingDataInsight>;

export interface RetrieveInsightsResponse {
  /** Contains the insights for the marketing data. */
  marketingDataInsights?: Array<MarketingDataInsight>;
}

export const RetrieveInsightsResponse: Schema.Schema<RetrieveInsightsResponse> = Schema.suspend(() => Schema.Struct({
  marketingDataInsights: Schema.optional(Schema.Array(MarketingDataInsight)),
})).annotate({ identifier: "RetrieveInsightsResponse" }) as any as Schema.Schema<RetrieveInsightsResponse>;

export interface PartnerLink {
  /** Identifier. The name of the partner link. Format: accountTypes/{account_type}/accounts/{account}/partnerLinks/{partner_link} */
  name?: string;
  /** Output only. The partner link ID. */
  partnerLinkId?: string;
  /** Required. The owning account granting access to the partner account. */
  owningAccount?: ProductAccount;
  /** Required. The partner account granted access by the owning account. */
  partnerAccount?: ProductAccount;
}

export const PartnerLink: Schema.Schema<PartnerLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  partnerLinkId: Schema.optional(Schema.String),
  owningAccount: Schema.optional(ProductAccount),
  partnerAccount: Schema.optional(ProductAccount),
})).annotate({ identifier: "PartnerLink" }) as any as Schema.Schema<PartnerLink>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SearchPartnerLinksResponse {
  /** The partner links for the given account. */
  partnerLinks?: Array<PartnerLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const SearchPartnerLinksResponse: Schema.Schema<SearchPartnerLinksResponse> = Schema.suspend(() => Schema.Struct({
  partnerLinks: Schema.optional(Schema.Array(PartnerLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchPartnerLinksResponse" }) as any as Schema.Schema<SearchPartnerLinksResponse>;

export interface UserListLicensePricing {
  /** Output only. The ID of this pricing. */
  pricingId?: string;
  /** Optional. The cost associated with the model, in micro units (10^-6), in the currency specified by the currency_code field. For example, 2000000 means $2 if `currency_code` is `USD`. */
  costMicros?: string;
  /** Optional. The currency in which cost and max_cost is specified. Must be a three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** Output only. Start time of the pricing. */
  startTime?: string;
  /** Optional. End time of the pricing. */
  endTime?: string;
  /** Output only. Whether this pricing is active. */
  pricingActive?: boolean;
  /** Output only. The buyer approval state of this pricing. This field is read-only. */
  buyerApprovalState?: "USER_LIST_PRICING_BUYER_APPROVAL_STATE_UNSPECIFIED" | "PENDING" | "APPROVED" | "REJECTED" | (string & {});
  /** Immutable. The cost type of this pricing. Can be set only in the `create` operation. Can't be updated for an existing license. */
  costType?: "USER_LIST_PRICING_COST_TYPE_UNSPECIFIED" | "CPC" | "CPM" | "MEDIA_SHARE" | (string & {});
  /** Optional. The maximum CPM a commerce audience can be charged when the MEDIA_SHARE cost type is used. The value is in micro units (10^-6) and in the currency specified by the currency_code field. For example, 2000000 means $2 if `currency_code` is `USD`. This is only relevant when cost_type is MEDIA_SHARE. When cost_type is not MEDIA_SHARE, and this field is set, a MAX_COST_NOT_ALLOWED error will be returned. If not set or set to`0`, there is no cap. */
  maxCostMicros?: string;
}

export const UserListLicensePricing: Schema.Schema<UserListLicensePricing> = Schema.suspend(() => Schema.Struct({
  pricingId: Schema.optional(Schema.String),
  costMicros: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  pricingActive: Schema.optional(Schema.Boolean),
  buyerApprovalState: Schema.optional(Schema.String),
  costType: Schema.optional(Schema.String),
  maxCostMicros: Schema.optional(Schema.String),
})).annotate({ identifier: "UserListLicensePricing" }) as any as Schema.Schema<UserListLicensePricing>;

export interface UserListLicenseMetrics {
  /** Output only. The number of clicks for the user list license. */
  clickCount?: string;
  /** Output only. The number of impressions for the user list license. */
  impressionCount?: string;
  /** Output only. The revenue for the user list license in USD micros. */
  revenueUsdMicros?: string;
  /** Output only. The start date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `end_date` is used in the filter, `start_date` is also required. If neither `start_date` nor `end_date` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response. */
  startDate?: string;
  /** Output only. The end date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `start_date` is used in the filter, `end_date` is also required. If neither `start_date` nor `end_date` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response. */
  endDate?: string;
}

export const UserListLicenseMetrics: Schema.Schema<UserListLicenseMetrics> = Schema.suspend(() => Schema.Struct({
  clickCount: Schema.optional(Schema.String),
  impressionCount: Schema.optional(Schema.String),
  revenueUsdMicros: Schema.optional(Schema.String),
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
})).annotate({ identifier: "UserListLicenseMetrics" }) as any as Schema.Schema<UserListLicenseMetrics>;

export interface UserListDirectLicense {
  /** Identifier. The resource name of the user list direct license. */
  name?: string;
  /** Immutable. ID of the user list being licensed. */
  userListId?: string;
  /** Output only. Name of the user list being licensed. This field is read-only. */
  userListDisplayName?: string;
  /** Immutable. Account type of client customer which the user list is being licensed to. */
  clientAccountType?: "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_UNKNOWN" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_GOOGLE_ADS" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_DISPLAY_VIDEO_PARTNER" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_DISPLAY_VIDEO_ADVERTISER" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_GOOGLE_AD_MANAGER_AUDIENCE_LINK" | (string & {});
  /** Immutable. ID of client customer which the user list is being licensed to. */
  clientAccountId?: string;
  /** Output only. Name of client customer which the user list is being licensed to. This field is read-only. */
  clientAccountDisplayName?: string;
  /** Optional. Status of UserListDirectLicense - ENABLED or DISABLED. */
  status?: "USER_LIST_LICENSE_STATUS_UNSPECIFIED" | "USER_LIST_LICENSE_STATUS_ENABLED" | "USER_LIST_LICENSE_STATUS_DISABLED" | (string & {});
  /** Optional. UserListDirectLicense pricing. */
  pricing?: UserListLicensePricing;
  /** Output only. Pricing history of this user list license. This field is read-only. */
  historicalPricings?: Array<UserListLicensePricing>;
  /** Output only. Metrics related to this license This field is read-only and only populated if the start and end dates are set in the ListUserListDirectLicenses call */
  metrics?: UserListLicenseMetrics;
}

export const UserListDirectLicense: Schema.Schema<UserListDirectLicense> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userListId: Schema.optional(Schema.String),
  userListDisplayName: Schema.optional(Schema.String),
  clientAccountType: Schema.optional(Schema.String),
  clientAccountId: Schema.optional(Schema.String),
  clientAccountDisplayName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  pricing: Schema.optional(UserListLicensePricing),
  historicalPricings: Schema.optional(Schema.Array(UserListLicensePricing)),
  metrics: Schema.optional(UserListLicenseMetrics),
})).annotate({ identifier: "UserListDirectLicense" }) as any as Schema.Schema<UserListDirectLicense>;

export interface ListUserListDirectLicensesResponse {
  /** The licenses for the given user list in the request. */
  userListDirectLicenses?: Array<UserListDirectLicense>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListUserListDirectLicensesResponse: Schema.Schema<ListUserListDirectLicensesResponse> = Schema.suspend(() => Schema.Struct({
  userListDirectLicenses: Schema.optional(Schema.Array(UserListDirectLicense)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserListDirectLicensesResponse" }) as any as Schema.Schema<ListUserListDirectLicensesResponse>;

export interface UserListGlobalLicense {
  /** Identifier. The resource name of the user list global license. */
  name?: string;
  /** Immutable. ID of the user list being licensed. */
  userListId?: string;
  /** Output only. Name of the user list being licensed. This field is read-only. */
  userListDisplayName?: string;
  /** Immutable. Product type of client customer which the user list is being licensed to. */
  licenseType?: "USER_LIST_GLOBAL_LICENSE_TYPE_UNSPECIFIED" | "USER_LIST_GLOBAL_LICENSE_TYPE_RESELLER" | "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_SELL_SIDE" | "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_BUY_SIDE" | (string & {});
  /** Optional. Status of UserListGlobalLicense - ENABLED or DISABLED. */
  status?: "USER_LIST_LICENSE_STATUS_UNSPECIFIED" | "USER_LIST_LICENSE_STATUS_ENABLED" | "USER_LIST_LICENSE_STATUS_DISABLED" | (string & {});
  /** Optional. UserListGlobalLicense pricing. */
  pricing?: UserListLicensePricing;
  /** Output only. Pricing history of this user list license. This field is read-only. */
  historicalPricings?: Array<UserListLicensePricing>;
  /** Output only. Metrics related to this license This field is read-only and only populated if the start and end dates are set in the ListUserListGlobalLicenses call */
  metrics?: UserListLicenseMetrics;
}

export const UserListGlobalLicense: Schema.Schema<UserListGlobalLicense> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userListId: Schema.optional(Schema.String),
  userListDisplayName: Schema.optional(Schema.String),
  licenseType: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  pricing: Schema.optional(UserListLicensePricing),
  historicalPricings: Schema.optional(Schema.Array(UserListLicensePricing)),
  metrics: Schema.optional(UserListLicenseMetrics),
})).annotate({ identifier: "UserListGlobalLicense" }) as any as Schema.Schema<UserListGlobalLicense>;

export interface ListUserListGlobalLicensesResponse {
  /** The licenses for the given user list in the request. */
  userListGlobalLicenses?: Array<UserListGlobalLicense>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListUserListGlobalLicensesResponse: Schema.Schema<ListUserListGlobalLicensesResponse> = Schema.suspend(() => Schema.Struct({
  userListGlobalLicenses: Schema.optional(Schema.Array(UserListGlobalLicense)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserListGlobalLicensesResponse" }) as any as Schema.Schema<ListUserListGlobalLicensesResponse>;

export interface UserListGlobalLicenseCustomerInfo {
  /** Identifier. The resource name of the user list global license customer. */
  name?: string;
  /** Output only. ID of the user list being licensed. */
  userListId?: string;
  /** Output only. Name of the user list being licensed. */
  userListDisplayName?: string;
  /** Output only. Product type of client customer which the user list is being licensed to. */
  licenseType?: "USER_LIST_GLOBAL_LICENSE_TYPE_UNSPECIFIED" | "USER_LIST_GLOBAL_LICENSE_TYPE_RESELLER" | "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_SELL_SIDE" | "USER_LIST_GLOBAL_LICENSE_TYPE_DATA_MART_BUY_SIDE" | (string & {});
  /** Output only. Status of UserListDirectLicense - ENABLED or DISABLED. */
  status?: "USER_LIST_LICENSE_STATUS_UNSPECIFIED" | "USER_LIST_LICENSE_STATUS_ENABLED" | "USER_LIST_LICENSE_STATUS_DISABLED" | (string & {});
  /** Output only. UserListDirectLicense pricing. */
  pricing?: UserListLicensePricing;
  /** Output only. Product type of client customer which the user list is being licensed to. */
  clientAccountType?: "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_UNKNOWN" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_GOOGLE_ADS" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_DISPLAY_VIDEO_PARTNER" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_DISPLAY_VIDEO_ADVERTISER" | "USER_LIST_LICENSE_CLIENT_ACCOUNT_TYPE_GOOGLE_AD_MANAGER_AUDIENCE_LINK" | (string & {});
  /** Output only. ID of client customer which the user list is being licensed to. */
  clientAccountId?: string;
  /** Output only. Name of client customer which the user list is being licensed to. */
  clientAccountDisplayName?: string;
  /** Output only. Pricing history of this user list license. */
  historicalPricings?: Array<UserListLicensePricing>;
  /** Output only. Metrics related to this license This field is only populated if the start and end dates are set in the ListUserListGlobalLicenseCustomerInfos call. */
  metrics?: UserListLicenseMetrics;
}

export const UserListGlobalLicenseCustomerInfo: Schema.Schema<UserListGlobalLicenseCustomerInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userListId: Schema.optional(Schema.String),
  userListDisplayName: Schema.optional(Schema.String),
  licenseType: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  pricing: Schema.optional(UserListLicensePricing),
  clientAccountType: Schema.optional(Schema.String),
  clientAccountId: Schema.optional(Schema.String),
  clientAccountDisplayName: Schema.optional(Schema.String),
  historicalPricings: Schema.optional(Schema.Array(UserListLicensePricing)),
  metrics: Schema.optional(UserListLicenseMetrics),
})).annotate({ identifier: "UserListGlobalLicenseCustomerInfo" }) as any as Schema.Schema<UserListGlobalLicenseCustomerInfo>;

export interface ListUserListGlobalLicenseCustomerInfosResponse {
  /** The customer information for the given license in the request. */
  userListGlobalLicenseCustomerInfos?: Array<UserListGlobalLicenseCustomerInfo>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListUserListGlobalLicenseCustomerInfosResponse: Schema.Schema<ListUserListGlobalLicenseCustomerInfosResponse> = Schema.suspend(() => Schema.Struct({
  userListGlobalLicenseCustomerInfos: Schema.optional(Schema.Array(UserListGlobalLicenseCustomerInfo)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserListGlobalLicenseCustomerInfosResponse" }) as any as Schema.Schema<ListUserListGlobalLicenseCustomerInfosResponse>;

export interface SizeInfo {
  /** Output only. Estimated number of members in this user list, on the Google Display Network. */
  displayNetworkMembersCount?: string;
  /** Output only. Estimated number of members in this user list in the google.com domain. These are the members available for targeting in Search campaigns. */
  searchNetworkMembersCount?: string;
}

export const SizeInfo: Schema.Schema<SizeInfo> = Schema.suspend(() => Schema.Struct({
  displayNetworkMembersCount: Schema.optional(Schema.String),
  searchNetworkMembersCount: Schema.optional(Schema.String),
})).annotate({ identifier: "SizeInfo" }) as any as Schema.Schema<SizeInfo>;

export interface TargetNetworkInfo {
  /** Output only. Indicates this user list is eligible for Google Display Network. */
  eligibleForDisplay?: boolean;
  /** Optional. Indicates if this user list is eligible for Google Search Network. */
  eligibleForSearch?: boolean;
}

export const TargetNetworkInfo: Schema.Schema<TargetNetworkInfo> = Schema.suspend(() => Schema.Struct({
  eligibleForDisplay: Schema.optional(Schema.Boolean),
  eligibleForSearch: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TargetNetworkInfo" }) as any as Schema.Schema<TargetNetworkInfo>;

export interface ContactIdInfo {
  /** Optional. Immutable. Source of the upload data */
  dataSourceType?: "DATA_SOURCE_TYPE_UNSPECIFIED" | "DATA_SOURCE_TYPE_FIRST_PARTY" | "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU" | "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE" | "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA" | (string & {});
  /** Output only. Match rate for customer match user lists. */
  matchRatePercentage?: number;
}

export const ContactIdInfo: Schema.Schema<ContactIdInfo> = Schema.suspend(() => Schema.Struct({
  dataSourceType: Schema.optional(Schema.String),
  matchRatePercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "ContactIdInfo" }) as any as Schema.Schema<ContactIdInfo>;

export interface MobileIdInfo {
  /** Optional. Immutable. Source of the upload data. */
  dataSourceType?: "DATA_SOURCE_TYPE_UNSPECIFIED" | "DATA_SOURCE_TYPE_FIRST_PARTY" | "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU" | "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE" | "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA" | (string & {});
  /** Required. Immutable. The key space of mobile IDs. */
  keySpace?: "KEY_SPACE_UNSPECIFIED" | "IOS" | "ANDROID" | (string & {});
  /** Required. Immutable. A string that uniquely identifies a mobile application from which the data was collected. */
  appId?: string;
}

export const MobileIdInfo: Schema.Schema<MobileIdInfo> = Schema.suspend(() => Schema.Struct({
  dataSourceType: Schema.optional(Schema.String),
  keySpace: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileIdInfo" }) as any as Schema.Schema<MobileIdInfo>;

export interface UserIdInfo {
  /** Optional. Immutable. Source of the upload data. */
  dataSourceType?: "DATA_SOURCE_TYPE_UNSPECIFIED" | "DATA_SOURCE_TYPE_FIRST_PARTY" | "DATA_SOURCE_TYPE_THIRD_PARTY_CREDIT_BUREAU" | "DATA_SOURCE_TYPE_THIRD_PARTY_VOTER_FILE" | "DATA_SOURCE_TYPE_THIRD_PARTY_PARTNER_DATA" | (string & {});
}

export const UserIdInfo: Schema.Schema<UserIdInfo> = Schema.suspend(() => Schema.Struct({
  dataSourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "UserIdInfo" }) as any as Schema.Schema<UserIdInfo>;

export interface PairIdInfo {
  /** Required. Immutable. Identifies the publisher that the Publisher Advertiser Identity Reconciliation user list is reconciled with. This field is provided by the cleanroom provider and is only unique in the scope of that cleanroom. This cannot be used as a global identifier across multiple cleanrooms. */
  publisherId?: string;
  /** Required. Descriptive name of the publisher to be displayed in the UI for a better targeting experience. */
  publisherName?: string;
  /** Optional. This field denotes the percentage of membership match of this user list with the corresponding publisher's first party data. Must be between 0 and 100 inclusive. */
  matchRatePercentage?: number;
  /** Optional. The count of the advertiser's first party data records that have been uploaded to a clean room provider. This does not signify the size of a PAIR user list. */
  advertiserIdentifierCount?: string;
  /** Required. Immutable. Identifies a unique advertiser to publisher relationship with one clean room provider or across multiple clean room providers. */
  cleanRoomIdentifier?: string;
}

export const PairIdInfo: Schema.Schema<PairIdInfo> = Schema.suspend(() => Schema.Struct({
  publisherId: Schema.optional(Schema.String),
  publisherName: Schema.optional(Schema.String),
  matchRatePercentage: Schema.optional(Schema.Number),
  advertiserIdentifierCount: Schema.optional(Schema.String),
  cleanRoomIdentifier: Schema.optional(Schema.String),
})).annotate({ identifier: "PairIdInfo" }) as any as Schema.Schema<PairIdInfo>;

export interface PseudonymousIdInfo {
  /** Output only. Sync status of the user list. */
  syncStatus?: "SYNC_STATUS_UNSPECIFIED" | "CREATED" | "READY_FOR_USE" | "FAILED" | (string & {});
  /** Optional. Immutable. The number of billable records (e.g. uploaded or matched). */
  billableRecordCount?: string;
}

export const PseudonymousIdInfo: Schema.Schema<PseudonymousIdInfo> = Schema.suspend(() => Schema.Struct({
  syncStatus: Schema.optional(Schema.String),
  billableRecordCount: Schema.optional(Schema.String),
})).annotate({ identifier: "PseudonymousIdInfo" }) as any as Schema.Schema<PseudonymousIdInfo>;

export interface PartnerAudienceInfo {
  /** Required. Immutable. The source of the partner audience. */
  partnerAudienceSource?: "PARTNER_AUDIENCE_SOURCE_UNSPECIFIED" | "COMMERCE_AUDIENCE" | "LINEAR_TV_AUDIENCE" | "AGENCY_PROVIDER_AUDIENCE" | (string & {});
  /** Optional. The commerce partner name. Only allowed if `partner_audience_source` is `COMMERCE_AUDIENCE`. */
  commercePartner?: string;
}

export const PartnerAudienceInfo: Schema.Schema<PartnerAudienceInfo> = Schema.suspend(() => Schema.Struct({
  partnerAudienceSource: Schema.optional(Schema.String),
  commercePartner: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerAudienceInfo" }) as any as Schema.Schema<PartnerAudienceInfo>;

export interface IngestedUserListInfo {
  /** Required. Immutable. Upload key types of this user list. */
  uploadKeyTypes?: Array<"UPLOAD_KEY_TYPE_UNSPECIFIED" | "CONTACT_ID" | "MOBILE_ID" | "USER_ID" | "PAIR_ID" | "PSEUDONYMOUS_ID" | (string & {})>;
  /** Optional. Additional information when `CONTACT_ID` is one of the `upload_key_types`. */
  contactIdInfo?: ContactIdInfo;
  /** Optional. Additional information when `MOBILE_ID` is one of the `upload_key_types`. */
  mobileIdInfo?: MobileIdInfo;
  /** Optional. Additional information when `USER_ID` is one of the `upload_key_types`. */
  userIdInfo?: UserIdInfo;
  /** Optional. Additional information when `PAIR_ID` is one of the `upload_key_types`. This feature is only available to data partners. */
  pairIdInfo?: PairIdInfo;
  /** Optional. Additional information for `PSEUDONYMOUS_ID` is one of the `upload_key_types`. */
  pseudonymousIdInfo?: PseudonymousIdInfo;
  /** Optional. Additional information for partner audiences. This feature is only available to data partners. */
  partnerAudienceInfo?: PartnerAudienceInfo;
}

export const IngestedUserListInfo: Schema.Schema<IngestedUserListInfo> = Schema.suspend(() => Schema.Struct({
  uploadKeyTypes: Schema.optional(Schema.Array(Schema.String)),
  contactIdInfo: Schema.optional(ContactIdInfo),
  mobileIdInfo: Schema.optional(MobileIdInfo),
  userIdInfo: Schema.optional(UserIdInfo),
  pairIdInfo: Schema.optional(PairIdInfo),
  pseudonymousIdInfo: Schema.optional(PseudonymousIdInfo),
  partnerAudienceInfo: Schema.optional(PartnerAudienceInfo),
})).annotate({ identifier: "IngestedUserListInfo" }) as any as Schema.Schema<IngestedUserListInfo>;

export interface UserList {
  /** Identifier. The resource name of the user list. Format: accountTypes/{account_type}/accounts/{account}/userLists/{user_list} */
  name?: string;
  /** Output only. The unique ID of the user list. */
  id?: string;
  /** Output only. An option that indicates if a user may edit a list. */
  readOnly?: boolean;
  /** Required. The display name of the user list. */
  displayName?: string;
  /** Optional. A description of the user list. */
  description?: string;
  /** Optional. Membership status of this user list. */
  membershipStatus?: "MEMBERSHIP_STATUS_UNSPECIFIED" | "OPEN" | "CLOSED" | (string & {});
  /** Optional. An ID from external system. It is used by user list sellers to correlate IDs on their systems. */
  integrationCode?: string;
  /** Optional. The duration a user remains in the user list. Valid durations are exact multiples of 24 hours (86400 seconds). Providing a value that is not an exact multiple of 24 hours will result in an INVALID_ARGUMENT error. */
  membershipDuration?: string;
  /** Output only. The reason why this user list membership status is closed. */
  closingReason?: "CLOSING_REASON_UNSPECIFIED" | "UNUSED" | (string & {});
  /** Output only. The reason this account has been granted access to the list. */
  accessReason?: "ACCESS_REASON_UNSPECIFIED" | "OWNED" | "SHARED" | "LICENSED" | "SUBSCRIBED" | "AFFILIATED" | (string & {});
  /** Optional. Indicates if this share is still enabled. When a user list is shared with the account this field is set to `ENABLED`. Later the user list owner can decide to revoke the share and make it `DISABLED`. */
  accountAccessStatus?: "ACCESS_STATUS_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
  /** Output only. Estimated number of members in this user list in different target networks. */
  sizeInfo?: SizeInfo;
  /** Optional. Eligibility information for different target networks. */
  targetNetworkInfo?: TargetNetworkInfo;
  /** Optional. Represents a user list that is populated by user ingested data. */
  ingestedUserListInfo?: IngestedUserListInfo;
}

export const UserList: Schema.Schema<UserList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  readOnly: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  membershipStatus: Schema.optional(Schema.String),
  integrationCode: Schema.optional(Schema.String),
  membershipDuration: Schema.optional(Schema.String),
  closingReason: Schema.optional(Schema.String),
  accessReason: Schema.optional(Schema.String),
  accountAccessStatus: Schema.optional(Schema.String),
  sizeInfo: Schema.optional(SizeInfo),
  targetNetworkInfo: Schema.optional(TargetNetworkInfo),
  ingestedUserListInfo: Schema.optional(IngestedUserListInfo),
})).annotate({ identifier: "UserList" }) as any as Schema.Schema<UserList>;

export interface ListUserListsResponse {
  /** The user lists from the specified account. */
  userLists?: Array<UserList>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListUserListsResponse: Schema.Schema<ListUserListsResponse> = Schema.suspend(() => Schema.Struct({
  userLists: Schema.optional(Schema.Array(UserList)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserListsResponse" }) as any as Schema.Schema<ListUserListsResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

// ==========================================================================
// Operations
// ==========================================================================

/** Uploads a list of AudienceMember resources to the provided Destination. */
export interface IngestAudienceMembersRequest_Op {
  /** Request body */
  body?: IngestAudienceMembersRequest;
}

export const IngestAudienceMembersRequest_Op = Schema.Struct({
  body: Schema.optional(IngestAudienceMembersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/audienceMembers:ingest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IngestAudienceMembersRequest_Op>;

export type IngestAudienceMembersResponse_Op = IngestAudienceMembersResponse;
export const IngestAudienceMembersResponse_Op = IngestAudienceMembersResponse;

export type IngestAudienceMembersError = CommonErrors;

export const ingestAudienceMembers: API.OperationMethod<IngestAudienceMembersRequest_Op, IngestAudienceMembersResponse_Op, IngestAudienceMembersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IngestAudienceMembersRequest_Op,
  output: IngestAudienceMembersResponse_Op,
  errors: [],
}));

/** Removes a list of AudienceMember resources from the provided Destination. */
export interface RemoveAudienceMembersRequest_Op {
  /** Request body */
  body?: RemoveAudienceMembersRequest;
}

export const RemoveAudienceMembersRequest_Op = Schema.Struct({
  body: Schema.optional(RemoveAudienceMembersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/audienceMembers:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveAudienceMembersRequest_Op>;

export type RemoveAudienceMembersResponse_Op = RemoveAudienceMembersResponse;
export const RemoveAudienceMembersResponse_Op = RemoveAudienceMembersResponse;

export type RemoveAudienceMembersError = CommonErrors;

export const removeAudienceMembers: API.OperationMethod<RemoveAudienceMembersRequest_Op, RemoveAudienceMembersResponse_Op, RemoveAudienceMembersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveAudienceMembersRequest_Op,
  output: RemoveAudienceMembersResponse_Op,
  errors: [],
}));

/** Uploads a list of Event resources from the provided Destination. */
export interface IngestEventsRequest_Op {
  /** Request body */
  body?: IngestEventsRequest;
}

export const IngestEventsRequest_Op = Schema.Struct({
  body: Schema.optional(IngestEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/events:ingest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IngestEventsRequest_Op>;

export type IngestEventsResponse_Op = IngestEventsResponse;
export const IngestEventsResponse_Op = IngestEventsResponse;

export type IngestEventsError = CommonErrors;

export const ingestEvents: API.OperationMethod<IngestEventsRequest_Op, IngestEventsResponse_Op, IngestEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IngestEventsRequest_Op,
  output: IngestEventsResponse_Op,
  errors: [],
}));

/** Gets the status of a request given request id. */
export interface RetrieveRequestStatusRequest {
  /** Required. Required. The request ID of the Data Manager API request. */
  requestId?: string;
}

export const RetrieveRequestStatusRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/requestStatus:retrieve" }),
  svc,
) as unknown as Schema.Schema<RetrieveRequestStatusRequest>;

export type RetrieveRequestStatusResponse_Op = RetrieveRequestStatusResponse;
export const RetrieveRequestStatusResponse_Op = RetrieveRequestStatusResponse;

export type RetrieveRequestStatusError = CommonErrors;

export const retrieveRequestStatus: API.OperationMethod<RetrieveRequestStatusRequest, RetrieveRequestStatusResponse_Op, RetrieveRequestStatusError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveRequestStatusRequest,
  output: RetrieveRequestStatusResponse_Op,
  errors: [],
}));

/** Retrieves marketing data insights for a given user list. This feature is only available to data partners. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface RetrieveAccountTypesAccountsInsightsRequest {
  /** Required. The parent account that owns the user list. Format: `accountTypes/{account_type}/accounts/{account}` */
  parent: string;
  /** Request body */
  body?: RetrieveInsightsRequest;
}

export const RetrieveAccountTypesAccountsInsightsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RetrieveInsightsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/insights:retrieve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RetrieveAccountTypesAccountsInsightsRequest>;

export type RetrieveAccountTypesAccountsInsightsResponse = RetrieveInsightsResponse;
export const RetrieveAccountTypesAccountsInsightsResponse = RetrieveInsightsResponse;

export type RetrieveAccountTypesAccountsInsightsError = CommonErrors;

export const retrieveAccountTypesAccountsInsights: API.OperationMethod<RetrieveAccountTypesAccountsInsightsRequest, RetrieveAccountTypesAccountsInsightsResponse, RetrieveAccountTypesAccountsInsightsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveAccountTypesAccountsInsightsRequest,
  output: RetrieveAccountTypesAccountsInsightsResponse,
  errors: [],
}));

/** Creates a partner link for the given account. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface CreateAccountTypesAccountsPartnerLinksRequest {
  /** Required. The parent, which owns this collection of partner links. Format: accountTypes/{account_type}/accounts/{account} */
  parent: string;
  /** Request body */
  body?: PartnerLink;
}

export const CreateAccountTypesAccountsPartnerLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PartnerLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/partnerLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountTypesAccountsPartnerLinksRequest>;

export type CreateAccountTypesAccountsPartnerLinksResponse = PartnerLink;
export const CreateAccountTypesAccountsPartnerLinksResponse = PartnerLink;

export type CreateAccountTypesAccountsPartnerLinksError = CommonErrors;

export const createAccountTypesAccountsPartnerLinks: API.OperationMethod<CreateAccountTypesAccountsPartnerLinksRequest, CreateAccountTypesAccountsPartnerLinksResponse, CreateAccountTypesAccountsPartnerLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountTypesAccountsPartnerLinksRequest,
  output: CreateAccountTypesAccountsPartnerLinksResponse,
  errors: [],
}));

/** Deletes a partner link for the given account. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface DeleteAccountTypesAccountsPartnerLinksRequest {
  /** Required. The resource name of the partner link to delete. Format: accountTypes/{account_type}/accounts/{account}/partnerLinks/{partner_link} */
  name: string;
}

export const DeleteAccountTypesAccountsPartnerLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/partnerLinks/{partnerLinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountTypesAccountsPartnerLinksRequest>;

export type DeleteAccountTypesAccountsPartnerLinksResponse = Empty;
export const DeleteAccountTypesAccountsPartnerLinksResponse = Empty;

export type DeleteAccountTypesAccountsPartnerLinksError = CommonErrors;

export const deleteAccountTypesAccountsPartnerLinks: API.OperationMethod<DeleteAccountTypesAccountsPartnerLinksRequest, DeleteAccountTypesAccountsPartnerLinksResponse, DeleteAccountTypesAccountsPartnerLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountTypesAccountsPartnerLinksRequest,
  output: DeleteAccountTypesAccountsPartnerLinksResponse,
  errors: [],
}));

/** Searches for all partner links to and from a given account. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface SearchAccountTypesAccountsPartnerLinksRequest {
  /** Required. Account to search for partner links. If no `filter` is specified, all partner links where this account is either the `owning_account` or `partner_account` are returned. Format: `accountTypes/{account_type}/accounts/{account}` */
  parent: string;
  /** The maximum number of partner links to return. The service may return fewer than this value. If unspecified, at most 10 partner links will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A page token, received from a previous `SearchPartnerLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchPartnerLinks` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A [filter string](//google.aip.dev/160). All fields need to be on the left hand side of each condition (for example: `partner_link_id = 123456789`). Supported operations: - `AND` - `=` - `!=` Supported fields: - `partner_link_id` - `owning_account.account_type` - `owning_account.account_id` - `partner_account.account_type` - `partner_account.account_id` Example: `owning_account.account_type = "GOOGLE_ADS" AND partner_account.account_id = 987654321` */
  filter?: string;
}

export const SearchAccountTypesAccountsPartnerLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/partnerLinks:search" }),
  svc,
) as unknown as Schema.Schema<SearchAccountTypesAccountsPartnerLinksRequest>;

export type SearchAccountTypesAccountsPartnerLinksResponse = SearchPartnerLinksResponse;
export const SearchAccountTypesAccountsPartnerLinksResponse = SearchPartnerLinksResponse;

export type SearchAccountTypesAccountsPartnerLinksError = CommonErrors;

export const searchAccountTypesAccountsPartnerLinks = API.makePaginated(() => ({
  input: SearchAccountTypesAccountsPartnerLinksRequest,
  output: SearchAccountTypesAccountsPartnerLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a user list direct license. This feature is only available to data partners. */
export interface CreateAccountTypesAccountsUserListDirectLicensesRequest {
  /** Required. The account that owns the user list being licensed. Should be in the format accountTypes/{ACCOUNT_TYPE}/accounts/{ACCOUNT_ID} */
  parent: string;
  /** Request body */
  body?: UserListDirectLicense;
}

export const CreateAccountTypesAccountsUserListDirectLicensesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserListDirectLicense).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListDirectLicenses", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountTypesAccountsUserListDirectLicensesRequest>;

export type CreateAccountTypesAccountsUserListDirectLicensesResponse = UserListDirectLicense;
export const CreateAccountTypesAccountsUserListDirectLicensesResponse = UserListDirectLicense;

export type CreateAccountTypesAccountsUserListDirectLicensesError = CommonErrors;

export const createAccountTypesAccountsUserListDirectLicenses: API.OperationMethod<CreateAccountTypesAccountsUserListDirectLicensesRequest, CreateAccountTypesAccountsUserListDirectLicensesResponse, CreateAccountTypesAccountsUserListDirectLicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountTypesAccountsUserListDirectLicensesRequest,
  output: CreateAccountTypesAccountsUserListDirectLicensesResponse,
  errors: [],
}));

/** Retrieves a user list direct license. This feature is only available to data partners. */
export interface GetAccountTypesAccountsUserListDirectLicensesRequest {
  /** Required. The resource name of the user list direct license. */
  name: string;
}

export const GetAccountTypesAccountsUserListDirectLicensesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListDirectLicenses/{userListDirectLicensesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountTypesAccountsUserListDirectLicensesRequest>;

export type GetAccountTypesAccountsUserListDirectLicensesResponse = UserListDirectLicense;
export const GetAccountTypesAccountsUserListDirectLicensesResponse = UserListDirectLicense;

export type GetAccountTypesAccountsUserListDirectLicensesError = CommonErrors;

export const getAccountTypesAccountsUserListDirectLicenses: API.OperationMethod<GetAccountTypesAccountsUserListDirectLicensesRequest, GetAccountTypesAccountsUserListDirectLicensesResponse, GetAccountTypesAccountsUserListDirectLicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountTypesAccountsUserListDirectLicensesRequest,
  output: GetAccountTypesAccountsUserListDirectLicensesResponse,
  errors: [],
}));

/** Updates a user list direct license. This feature is only available to data partners. */
export interface PatchAccountTypesAccountsUserListDirectLicensesRequest {
  /** Identifier. The resource name of the user list direct license. */
  name: string;
  /** Optional. The list of fields to update. The special character `*` is not supported and an `INVALID_UPDATE_MASK` error will be thrown if used. */
  updateMask?: string;
  /** Request body */
  body?: UserListDirectLicense;
}

export const PatchAccountTypesAccountsUserListDirectLicensesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(UserListDirectLicense).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListDirectLicenses/{userListDirectLicensesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountTypesAccountsUserListDirectLicensesRequest>;

export type PatchAccountTypesAccountsUserListDirectLicensesResponse = UserListDirectLicense;
export const PatchAccountTypesAccountsUserListDirectLicensesResponse = UserListDirectLicense;

export type PatchAccountTypesAccountsUserListDirectLicensesError = CommonErrors;

export const patchAccountTypesAccountsUserListDirectLicenses: API.OperationMethod<PatchAccountTypesAccountsUserListDirectLicensesRequest, PatchAccountTypesAccountsUserListDirectLicensesResponse, PatchAccountTypesAccountsUserListDirectLicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountTypesAccountsUserListDirectLicensesRequest,
  output: PatchAccountTypesAccountsUserListDirectLicensesResponse,
  errors: [],
}));

/** Lists all user list direct licenses owned by the parent account. This feature is only available to data partners. */
export interface ListAccountTypesAccountsUserListDirectLicensesRequest {
  /** Required. The account whose licenses are being queried. Should be in the format accountTypes/{ACCOUNT_TYPE}/accounts/{ACCOUNT_ID} */
  parent: string;
  /** Optional. Filters to apply to the list request. All fields need to be on the left hand side of each condition (for example: user_list_id = 123). **Supported Operations:** - `AND` - `=` - `!=` - `>` - `>=` - `<` - `<=` **Unsupported Fields:** - `name` (use get method instead) - `historical_pricings` and all its subfields - `pricing.start_time` - `pricing.end_time` */
  filter?: string;
  /** Optional. The maximum number of licenses to return per page. The service may return fewer than this value. If unspecified, at most 50 licenses will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListUserListDirectLicense` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUserListDirectLicense` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountTypesAccountsUserListDirectLicensesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListDirectLicenses" }),
  svc,
) as unknown as Schema.Schema<ListAccountTypesAccountsUserListDirectLicensesRequest>;

export type ListAccountTypesAccountsUserListDirectLicensesResponse = ListUserListDirectLicensesResponse;
export const ListAccountTypesAccountsUserListDirectLicensesResponse = ListUserListDirectLicensesResponse;

export type ListAccountTypesAccountsUserListDirectLicensesError = CommonErrors;

export const listAccountTypesAccountsUserListDirectLicenses = API.makePaginated(() => ({
  input: ListAccountTypesAccountsUserListDirectLicensesRequest,
  output: ListAccountTypesAccountsUserListDirectLicensesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a user list global license. This feature is only available to data partners. */
export interface CreateAccountTypesAccountsUserListGlobalLicensesRequest {
  /** Required. The account that owns the user list being licensed. Should be in the format accountTypes/{ACCOUNT_TYPE}/accounts/{ACCOUNT_ID} */
  parent: string;
  /** Request body */
  body?: UserListGlobalLicense;
}

export const CreateAccountTypesAccountsUserListGlobalLicensesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserListGlobalLicense).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListGlobalLicenses", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountTypesAccountsUserListGlobalLicensesRequest>;

export type CreateAccountTypesAccountsUserListGlobalLicensesResponse = UserListGlobalLicense;
export const CreateAccountTypesAccountsUserListGlobalLicensesResponse = UserListGlobalLicense;

export type CreateAccountTypesAccountsUserListGlobalLicensesError = CommonErrors;

export const createAccountTypesAccountsUserListGlobalLicenses: API.OperationMethod<CreateAccountTypesAccountsUserListGlobalLicensesRequest, CreateAccountTypesAccountsUserListGlobalLicensesResponse, CreateAccountTypesAccountsUserListGlobalLicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountTypesAccountsUserListGlobalLicensesRequest,
  output: CreateAccountTypesAccountsUserListGlobalLicensesResponse,
  errors: [],
}));

/** Updates a user list global license. This feature is only available to data partners. */
export interface PatchAccountTypesAccountsUserListGlobalLicensesRequest {
  /** Identifier. The resource name of the user list global license. */
  name: string;
  /** Optional. The list of fields to update. The special character `*` is not supported and an `INVALID_UPDATE_MASK` error will be thrown if used. */
  updateMask?: string;
  /** Request body */
  body?: UserListGlobalLicense;
}

export const PatchAccountTypesAccountsUserListGlobalLicensesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(UserListGlobalLicense).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListGlobalLicenses/{userListGlobalLicensesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountTypesAccountsUserListGlobalLicensesRequest>;

export type PatchAccountTypesAccountsUserListGlobalLicensesResponse = UserListGlobalLicense;
export const PatchAccountTypesAccountsUserListGlobalLicensesResponse = UserListGlobalLicense;

export type PatchAccountTypesAccountsUserListGlobalLicensesError = CommonErrors;

export const patchAccountTypesAccountsUserListGlobalLicenses: API.OperationMethod<PatchAccountTypesAccountsUserListGlobalLicensesRequest, PatchAccountTypesAccountsUserListGlobalLicensesResponse, PatchAccountTypesAccountsUserListGlobalLicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountTypesAccountsUserListGlobalLicensesRequest,
  output: PatchAccountTypesAccountsUserListGlobalLicensesResponse,
  errors: [],
}));

/** Retrieves a user list global license. This feature is only available to data partners. */
export interface GetAccountTypesAccountsUserListGlobalLicensesRequest {
  /** Required. The resource name of the user list global license. */
  name: string;
}

export const GetAccountTypesAccountsUserListGlobalLicensesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListGlobalLicenses/{userListGlobalLicensesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountTypesAccountsUserListGlobalLicensesRequest>;

export type GetAccountTypesAccountsUserListGlobalLicensesResponse = UserListGlobalLicense;
export const GetAccountTypesAccountsUserListGlobalLicensesResponse = UserListGlobalLicense;

export type GetAccountTypesAccountsUserListGlobalLicensesError = CommonErrors;

export const getAccountTypesAccountsUserListGlobalLicenses: API.OperationMethod<GetAccountTypesAccountsUserListGlobalLicensesRequest, GetAccountTypesAccountsUserListGlobalLicensesResponse, GetAccountTypesAccountsUserListGlobalLicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountTypesAccountsUserListGlobalLicensesRequest,
  output: GetAccountTypesAccountsUserListGlobalLicensesResponse,
  errors: [],
}));

/** Lists all user list global licenses owned by the parent account. This feature is only available to data partners. */
export interface ListAccountTypesAccountsUserListGlobalLicensesRequest {
  /** Required. The account whose licenses are being queried. Should be in the format accountTypes/{ACCOUNT_TYPE}/accounts/{ACCOUNT_ID} */
  parent: string;
  /** Optional. Filters to apply to the list request. All fields need to be on the left hand side of each condition (for example: user_list_id = 123). **Supported Operations:** - `AND` - `=` - `!=` - `>` - `>=` - `<` - `<=` **Unsupported Fields:** - `name` (use get method instead) - `historical_pricings` and all its subfields - `pricing.start_time` - `pricing.end_time` */
  filter?: string;
  /** Optional. The maximum number of licenses to return. The service may return fewer than this value. If unspecified, at most 50 licenses will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListUserListGlobalLicense` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUserListDirectLicense` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountTypesAccountsUserListGlobalLicensesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListGlobalLicenses" }),
  svc,
) as unknown as Schema.Schema<ListAccountTypesAccountsUserListGlobalLicensesRequest>;

export type ListAccountTypesAccountsUserListGlobalLicensesResponse = ListUserListGlobalLicensesResponse;
export const ListAccountTypesAccountsUserListGlobalLicensesResponse = ListUserListGlobalLicensesResponse;

export type ListAccountTypesAccountsUserListGlobalLicensesError = CommonErrors;

export const listAccountTypesAccountsUserListGlobalLicenses = API.makePaginated(() => ({
  input: ListAccountTypesAccountsUserListGlobalLicensesRequest,
  output: ListAccountTypesAccountsUserListGlobalLicensesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all customer info for a user list global license. This feature is only available to data partners. */
export interface ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosRequest {
  /** Required. The global license whose customer info are being queried. Should be in the format `accountTypes/{ACCOUNT_TYPE}/accounts/{ACCOUNT_ID}/userListGlobalLicenses/{USER_LIST_GLOBAL_LICENSE_ID}`. To list all global license customer info under an account, replace the user list global license id with a '-' (for example, `accountTypes/DATA_PARTNER/accounts/123/userListGlobalLicenses/-`) */
  parent: string;
  /** Optional. Filters to apply to the list request. All fields need to be on the left hand side of each condition (for example: user_list_id = 123). **Supported Operations:** - `AND` - `=` - `!=` - `>` - `>=` - `<` - `<=` **Unsupported Fields:** - `name` (use get method instead) - `historical_pricings` and all its subfields - `pricing.start_time` - `pricing.end_time` */
  filter?: string;
  /** Optional. The maximum number of licenses to return. The service may return fewer than this value. If unspecified, at most 50 licenses will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListUserListDirectLicense` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUserListDirectLicense` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userListGlobalLicenses/{userListGlobalLicensesId}/userListGlobalLicenseCustomerInfos" }),
  svc,
) as unknown as Schema.Schema<ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosRequest>;

export type ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosResponse = ListUserListGlobalLicenseCustomerInfosResponse;
export const ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosResponse = ListUserListGlobalLicenseCustomerInfosResponse;

export type ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosError = CommonErrors;

export const listAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfos = API.makePaginated(() => ({
  input: ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosRequest,
  output: ListAccountTypesAccountsUserListGlobalLicensesUserListGlobalLicenseCustomerInfosResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a UserList. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface GetAccountTypesAccountsUserListsRequest {
  /** Required. The resource name of the UserList to retrieve. Format: accountTypes/{account_type}/accounts/{account}/userLists/{user_list} */
  name: string;
}

export const GetAccountTypesAccountsUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userLists/{userListsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountTypesAccountsUserListsRequest>;

export type GetAccountTypesAccountsUserListsResponse = UserList;
export const GetAccountTypesAccountsUserListsResponse = UserList;

export type GetAccountTypesAccountsUserListsError = CommonErrors;

export const getAccountTypesAccountsUserLists: API.OperationMethod<GetAccountTypesAccountsUserListsRequest, GetAccountTypesAccountsUserListsResponse, GetAccountTypesAccountsUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountTypesAccountsUserListsRequest,
  output: GetAccountTypesAccountsUserListsResponse,
  errors: [],
}));

/** Lists UserLists. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface ListAccountTypesAccountsUserListsRequest {
  /** Required. The parent account which owns this collection of user lists. Format: accountTypes/{account_type}/accounts/{account} */
  parent: string;
  /** Optional. The maximum number of user lists to return. The service may return fewer than this value. If unspecified, at most 50 user lists will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListUserLists` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUserLists` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A [filter string](//google.aip.dev/160). All fields need to be on the left hand side of each condition (for example: `display_name = "list 1"`). Supported operations: - `AND` - `=` - `!=` - `>` - `>=` - `<` - `<=` - `:` (has) Supported fields: - `id` - `display_name` - `description` - `membership_status` - `integration_code` - `access_reason` - `ingested_user_list_info.upload_key_types` */
  filter?: string;
}

export const ListAccountTypesAccountsUserListsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userLists" }),
  svc,
) as unknown as Schema.Schema<ListAccountTypesAccountsUserListsRequest>;

export type ListAccountTypesAccountsUserListsResponse = ListUserListsResponse;
export const ListAccountTypesAccountsUserListsResponse = ListUserListsResponse;

export type ListAccountTypesAccountsUserListsError = CommonErrors;

export const listAccountTypesAccountsUserLists = API.makePaginated(() => ({
  input: ListAccountTypesAccountsUserListsRequest,
  output: ListAccountTypesAccountsUserListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a UserList. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface CreateAccountTypesAccountsUserListsRequest {
  /** Required. The parent account where this user list will be created. Format: accountTypes/{account_type}/accounts/{account} */
  parent: string;
  /** Optional. If true, the request is validated but not executed. */
  validateOnly?: boolean;
  /** Request body */
  body?: UserList;
}

export const CreateAccountTypesAccountsUserListsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(UserList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userLists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountTypesAccountsUserListsRequest>;

export type CreateAccountTypesAccountsUserListsResponse = UserList;
export const CreateAccountTypesAccountsUserListsResponse = UserList;

export type CreateAccountTypesAccountsUserListsError = CommonErrors;

export const createAccountTypesAccountsUserLists: API.OperationMethod<CreateAccountTypesAccountsUserListsRequest, CreateAccountTypesAccountsUserListsResponse, CreateAccountTypesAccountsUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountTypesAccountsUserListsRequest,
  output: CreateAccountTypesAccountsUserListsResponse,
  errors: [],
}));

/** Updates a UserList. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface PatchAccountTypesAccountsUserListsRequest {
  /** Identifier. The resource name of the user list. Format: accountTypes/{account_type}/accounts/{account}/userLists/{user_list} */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Optional. If true, the request is validated but not executed. */
  validateOnly?: boolean;
  /** Request body */
  body?: UserList;
}

export const PatchAccountTypesAccountsUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(UserList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userLists/{userListsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountTypesAccountsUserListsRequest>;

export type PatchAccountTypesAccountsUserListsResponse = UserList;
export const PatchAccountTypesAccountsUserListsResponse = UserList;

export type PatchAccountTypesAccountsUserListsError = CommonErrors;

export const patchAccountTypesAccountsUserLists: API.OperationMethod<PatchAccountTypesAccountsUserListsRequest, PatchAccountTypesAccountsUserListsResponse, PatchAccountTypesAccountsUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountTypesAccountsUserListsRequest,
  output: PatchAccountTypesAccountsUserListsResponse,
  errors: [],
}));

/** Deletes a UserList. Authorization Headers: This method supports the following optional headers to define how the API authorizes access for the request: * `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}` * `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}` */
export interface DeleteAccountTypesAccountsUserListsRequest {
  /** Required. The name of the user list to delete. Format: accountTypes/{account_type}/accounts/{account}/userLists/{user_list} */
  name: string;
  /** Optional. If true, the request is validated but not executed. */
  validateOnly?: boolean;
}

export const DeleteAccountTypesAccountsUserListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accountTypes/{accountTypesId}/accounts/{accountsId}/userLists/{userListsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountTypesAccountsUserListsRequest>;

export type DeleteAccountTypesAccountsUserListsResponse = Empty;
export const DeleteAccountTypesAccountsUserListsResponse = Empty;

export type DeleteAccountTypesAccountsUserListsError = CommonErrors;

export const deleteAccountTypesAccountsUserLists: API.OperationMethod<DeleteAccountTypesAccountsUserListsRequest, DeleteAccountTypesAccountsUserListsResponse, DeleteAccountTypesAccountsUserListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountTypesAccountsUserListsRequest,
  output: DeleteAccountTypesAccountsUserListsResponse,
  errors: [],
}));

