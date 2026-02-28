// ==========================================================================
// Authorized Buyers Marketplace API (authorizedbuyersmarketplace v1)
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
  name: "authorizedbuyersmarketplace",
  version: "v1",
  rootUrl: "https://authorizedbuyersmarketplace.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface MediaPlanner {
  /** Output only. Account ID of the media planner. */
  accountId?: string;
  /** Identifier. The unique resource name of the media planner. Format: `mediaPlanners/{mediaPlannerAccountId}` Can be used to filter the response of the mediaPlanners.list method. */
  name?: string;
  /** Output only. The display name of the media planner. Can be used to filter the response of the mediaPlanners.list method. */
  displayName?: string;
  /** Output only. The ancestor names of the media planner. Format: `mediaPlanners/{mediaPlannerAccountId}` Can be used to filter the response of the mediaPlanners.list method. */
  ancestorNames?: Array<string>;
}

export const MediaPlanner: Schema.Schema<MediaPlanner> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  ancestorNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MediaPlanner" }) as any as Schema.Schema<MediaPlanner>;

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

export interface AuctionPackage {
  /** Immutable. The unique identifier for the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}` The auction_package_id part of name is sent in the BidRequest to all RTB bidders and is returned as deal_id by the bidder in the BidResponse. */
  name?: string;
  /** Output only. The buyer that created this auction package. Format: `buyers/{buyerAccountId}` */
  creator?: string;
  /** The display_name assigned to the auction package. */
  displayName?: string;
  /** Output only. A description of the auction package. */
  description?: string;
  /** Output only. Time the auction package was created. */
  createTime?: string;
  /** Output only. Time the auction package was last updated. This value is only increased when this auction package is updated but never when a buyer subscribed. */
  updateTime?: string;
  /** Output only. When calling as a buyer, the list of clients of the current buyer that are subscribed to the AuctionPackage. When calling as a bidder, the list of clients that are subscribed to the AuctionPackage owned by the bidder or its buyers. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}` */
  subscribedClients?: Array<string>;
  /** Output only. The list of buyers that are subscribed to the AuctionPackage. This field is only populated when calling as a bidder. Format: `buyers/{buyerAccountId}` */
  subscribedBuyers?: Array<string>;
  /** Output only. The list of media planners that are subscribed to the AuctionPackage. This field is only populated when calling as a bidder. */
  subscribedMediaPlanners?: Array<MediaPlanner>;
  /** Output only. If set, this field identifies a seat that the media planner selected as the owner of this auction package. This is a seat ID in the DSP's namespace that was provided to the media planner. */
  eligibleSeatIds?: Array<string>;
  /** Output only. If set, this field contains the DSP specific seat id set by the media planner account that is considered the owner of this deal. The seat ID is in the calling DSP's namespace. */
  dealOwnerSeatId?: string;
  /** Output only. The minimum price a buyer has to bid to compete in this auction package. If this is field is not populated, there is no floor price. */
  floorPriceCpm?: Money;
}

export const AuctionPackage: Schema.Schema<AuctionPackage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  subscribedClients: Schema.optional(Schema.Array(Schema.String)),
  subscribedBuyers: Schema.optional(Schema.Array(Schema.String)),
  subscribedMediaPlanners: Schema.optional(Schema.Array(MediaPlanner)),
  eligibleSeatIds: Schema.optional(Schema.Array(Schema.String)),
  dealOwnerSeatId: Schema.optional(Schema.String),
  floorPriceCpm: Schema.optional(Money),
})).annotate({ identifier: "AuctionPackage" }) as any as Schema.Schema<AuctionPackage>;

export interface ListAuctionPackagesResponse {
  /** The list of auction packages. */
  auctionPackages?: Array<AuctionPackage>;
  /** Continuation token for fetching the next page of results. Pass this value in the ListAuctionPackagesRequest.pageToken field in the subsequent call to the `ListAuctionPackages` method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListAuctionPackagesResponse: Schema.Schema<ListAuctionPackagesResponse> = Schema.suspend(() => Schema.Struct({
  auctionPackages: Schema.optional(Schema.Array(AuctionPackage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAuctionPackagesResponse" }) as any as Schema.Schema<ListAuctionPackagesResponse>;

export interface SubscribeAuctionPackageRequest {
}

export const SubscribeAuctionPackageRequest: Schema.Schema<SubscribeAuctionPackageRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SubscribeAuctionPackageRequest" }) as any as Schema.Schema<SubscribeAuctionPackageRequest>;

export interface UnsubscribeAuctionPackageRequest {
}

export const UnsubscribeAuctionPackageRequest: Schema.Schema<UnsubscribeAuctionPackageRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UnsubscribeAuctionPackageRequest" }) as any as Schema.Schema<UnsubscribeAuctionPackageRequest>;

export interface SubscribeClientsRequest {
  /** Optional. A list of client buyers to subscribe to the auction package, with client buyer in the format `buyers/{accountId}/clients/{clientAccountId}`. The current buyer will be subscribed to the auction package regardless of the list contents if not already. */
  clients?: Array<string>;
}

export const SubscribeClientsRequest: Schema.Schema<SubscribeClientsRequest> = Schema.suspend(() => Schema.Struct({
  clients: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SubscribeClientsRequest" }) as any as Schema.Schema<SubscribeClientsRequest>;

export interface UnsubscribeClientsRequest {
  /** Optional. A list of client buyers to unsubscribe from the auction package, with client buyer in the format `buyers/{accountId}/clients/{clientAccountId}`. */
  clients?: Array<string>;
}

export const UnsubscribeClientsRequest: Schema.Schema<UnsubscribeClientsRequest> = Schema.suspend(() => Schema.Struct({
  clients: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UnsubscribeClientsRequest" }) as any as Schema.Schema<UnsubscribeClientsRequest>;

export interface ClientUser {
  /** Output only. The resource name of the client user. Format: `buyers/{accountId}/clients/{clientAccountId}/users/{userId}` */
  name?: string;
  /** Output only. The state of the client user. */
  state?: "STATE_UNSPECIFIED" | "INVITED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** Required. The client user's email address that has to be unique across all users for the same client. */
  email?: string;
}

export const ClientUser: Schema.Schema<ClientUser> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientUser" }) as any as Schema.Schema<ClientUser>;

export interface ListClientUsersResponse {
  /** The returned list of client users. */
  clientUsers?: Array<ClientUser>;
  /** A token to retrieve the next page of results. Pass this value in the ListClientUsersRequest.pageToken field in the subsequent call to the list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListClientUsersResponse: Schema.Schema<ListClientUsersResponse> = Schema.suspend(() => Schema.Struct({
  clientUsers: Schema.optional(Schema.Array(ClientUser)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientUsersResponse" }) as any as Schema.Schema<ListClientUsersResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ActivateClientUserRequest {
}

export const ActivateClientUserRequest: Schema.Schema<ActivateClientUserRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ActivateClientUserRequest" }) as any as Schema.Schema<ActivateClientUserRequest>;

export interface DeactivateClientUserRequest {
}

export const DeactivateClientUserRequest: Schema.Schema<DeactivateClientUserRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeactivateClientUserRequest" }) as any as Schema.Schema<DeactivateClientUserRequest>;

export interface Client {
  /** Output only. The resource name of the client. Format: `buyers/{accountId}/clients/{clientAccountId}` */
  name?: string;
  /** Required. The role assigned to the client. Each role implies a set of permissions granted to the client. */
  role?: "CLIENT_ROLE_UNSPECIFIED" | "CLIENT_DEAL_VIEWER" | "CLIENT_DEAL_NEGOTIATOR" | "CLIENT_DEAL_APPROVER" | (string & {});
  /** Output only. The state of the client. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** Required. Display name shown to publishers. Must be unique for clients without partnerClientId specified. Maximum length of 255 characters is allowed. */
  displayName?: string;
  /** Whether the client will be visible to sellers. */
  sellerVisible?: boolean;
  /** Arbitrary unique identifier provided by the buyer. This field can be used to associate a client with an identifier in the namespace of the buyer, lookup clients by that identifier and verify whether an Authorized Buyers account of the client already exists. If present, must be unique across all the clients. */
  partnerClientId?: string;
}

export const Client: Schema.Schema<Client> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  sellerVisible: Schema.optional(Schema.Boolean),
  partnerClientId: Schema.optional(Schema.String),
})).annotate({ identifier: "Client" }) as any as Schema.Schema<Client>;

export interface ListClientsResponse {
  /** The returned list of clients. */
  clients?: Array<Client>;
  /** A token to retrieve the next page of results. Pass this value in the ListClientsRequest.pageToken field in the subsequent call to the list method to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListClientsResponse: Schema.Schema<ListClientsResponse> = Schema.suspend(() => Schema.Struct({
  clients: Schema.optional(Schema.Array(Client)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientsResponse" }) as any as Schema.Schema<ListClientsResponse>;

export interface ActivateClientRequest {
}

export const ActivateClientRequest: Schema.Schema<ActivateClientRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ActivateClientRequest" }) as any as Schema.Schema<ActivateClientRequest>;

export interface DeactivateClientRequest {
}

export const DeactivateClientRequest: Schema.Schema<DeactivateClientRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeactivateClientRequest" }) as any as Schema.Schema<DeactivateClientRequest>;

export interface Price {
  /** The pricing type for the deal. */
  type?: "TYPE_UNSPECIFIED" | "CPM" | "CPD" | (string & {});
  /** The actual price with currency specified. */
  amount?: Money;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  amount: Schema.optional(Money),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface ProgrammaticGuaranteedTerms {
  /** Count of guaranteed looks. For CPD deals, buyer changes to guaranteed_looks will be ignored. */
  guaranteedLooks?: string;
  /** Fixed price for the deal. */
  fixedPrice?: Price;
  /** Daily minimum looks for CPD deal types. For CPD deals, buyer should negotiate on this field instead of guaranteed_looks. */
  minimumDailyLooks?: string;
  /** The reservation type for a Programmatic Guaranteed deal. This indicates whether the number of impressions is fixed, or a percent of available impressions. If not specified, the default reservation type is STANDARD. */
  reservationType?: "RESERVATION_TYPE_UNSPECIFIED" | "STANDARD" | "SPONSORSHIP" | (string & {});
  /** The lifetime impression cap for CPM Sponsorship deals. Deal will stop serving when cap is reached. */
  impressionCap?: string;
  /** For sponsorship deals, this is the percentage of the seller's eligible impressions that the deal will serve until the cap is reached. Valid value is within range 0~100. */
  percentShareOfVoice?: string;
}

export const ProgrammaticGuaranteedTerms: Schema.Schema<ProgrammaticGuaranteedTerms> = Schema.suspend(() => Schema.Struct({
  guaranteedLooks: Schema.optional(Schema.String),
  fixedPrice: Schema.optional(Price),
  minimumDailyLooks: Schema.optional(Schema.String),
  reservationType: Schema.optional(Schema.String),
  impressionCap: Schema.optional(Schema.String),
  percentShareOfVoice: Schema.optional(Schema.String),
})).annotate({ identifier: "ProgrammaticGuaranteedTerms" }) as any as Schema.Schema<ProgrammaticGuaranteedTerms>;

export interface PreferredDealTerms {
  /** Fixed price for the deal. */
  fixedPrice?: Price;
}

export const PreferredDealTerms: Schema.Schema<PreferredDealTerms> = Schema.suspend(() => Schema.Struct({
  fixedPrice: Schema.optional(Price),
})).annotate({ identifier: "PreferredDealTerms" }) as any as Schema.Schema<PreferredDealTerms>;

export interface PrivateAuctionTerms {
  /** The minimum price buyer has to bid to compete in the private auction. */
  floorPrice?: Price;
  /** Output only. True if open auction buyers are allowed to compete with invited buyers in this private auction. */
  openAuctionAllowed?: boolean;
}

export const PrivateAuctionTerms: Schema.Schema<PrivateAuctionTerms> = Schema.suspend(() => Schema.Struct({
  floorPrice: Schema.optional(Price),
  openAuctionAllowed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PrivateAuctionTerms" }) as any as Schema.Schema<PrivateAuctionTerms>;

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

export interface CriteriaTargeting {
  /** A list of numeric IDs to be included. */
  targetedCriteriaIds?: Array<string>;
  /** A list of numeric IDs to be excluded. */
  excludedCriteriaIds?: Array<string>;
}

export const CriteriaTargeting: Schema.Schema<CriteriaTargeting> = Schema.suspend(() => Schema.Struct({
  targetedCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
  excludedCriteriaIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CriteriaTargeting" }) as any as Schema.Schema<CriteriaTargeting>;

export interface AdSize {
  /** The width of the ad slot in pixels. This field will be present only when size type is `PIXEL`. */
  width?: string;
  /** The height of the ad slot in pixels. This field will be present only when size type is `PIXEL`. */
  height?: string;
  /** The type of the ad slot size. */
  type?: "TYPE_UNSPECIFIED" | "PIXEL" | "INTERSTITIAL" | "NATIVE" | "FLUID" | (string & {});
}

export const AdSize: Schema.Schema<AdSize> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.String),
  height: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "AdSize" }) as any as Schema.Schema<AdSize>;

export interface InventorySizeTargeting {
  /** A list of inventory sizes to be included. */
  targetedInventorySizes?: Array<AdSize>;
  /** A list of inventory sizes to be excluded. */
  excludedInventorySizes?: Array<AdSize>;
}

export const InventorySizeTargeting: Schema.Schema<InventorySizeTargeting> = Schema.suspend(() => Schema.Struct({
  targetedInventorySizes: Schema.optional(Schema.Array(AdSize)),
  excludedInventorySizes: Schema.optional(Schema.Array(AdSize)),
})).annotate({ identifier: "InventorySizeTargeting" }) as any as Schema.Schema<InventorySizeTargeting>;

export interface OperatingSystemTargeting {
  /** IDs of operating systems to be included/excluded. */
  operatingSystemCriteria?: CriteriaTargeting;
  /** IDs of operating system versions to be included/excluded. */
  operatingSystemVersionCriteria?: CriteriaTargeting;
}

export const OperatingSystemTargeting: Schema.Schema<OperatingSystemTargeting> = Schema.suspend(() => Schema.Struct({
  operatingSystemCriteria: Schema.optional(CriteriaTargeting),
  operatingSystemVersionCriteria: Schema.optional(CriteriaTargeting),
})).annotate({ identifier: "OperatingSystemTargeting" }) as any as Schema.Schema<OperatingSystemTargeting>;

export interface TechnologyTargeting {
  /** IDs of device categories to be included/excluded. */
  deviceCategoryTargeting?: CriteriaTargeting;
  /** IDs of device capabilities to be included/excluded. */
  deviceCapabilityTargeting?: CriteriaTargeting;
  /** Operating system related targeting information. */
  operatingSystemTargeting?: OperatingSystemTargeting;
}

export const TechnologyTargeting: Schema.Schema<TechnologyTargeting> = Schema.suspend(() => Schema.Struct({
  deviceCategoryTargeting: Schema.optional(CriteriaTargeting),
  deviceCapabilityTargeting: Schema.optional(CriteriaTargeting),
  operatingSystemTargeting: Schema.optional(OperatingSystemTargeting),
})).annotate({ identifier: "TechnologyTargeting" }) as any as Schema.Schema<TechnologyTargeting>;

export interface UriTargeting {
  /** A list of URLs to be included. */
  targetedUris?: Array<string>;
  /** A list of URLs to be excluded. */
  excludedUris?: Array<string>;
}

export const UriTargeting: Schema.Schema<UriTargeting> = Schema.suspend(() => Schema.Struct({
  targetedUris: Schema.optional(Schema.Array(Schema.String)),
  excludedUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UriTargeting" }) as any as Schema.Schema<UriTargeting>;

export interface FirstPartyMobileApplicationTargeting {
  /** A list of application IDs to be included. */
  targetedAppIds?: Array<string>;
  /** A list of application IDs to be excluded. */
  excludedAppIds?: Array<string>;
}

export const FirstPartyMobileApplicationTargeting: Schema.Schema<FirstPartyMobileApplicationTargeting> = Schema.suspend(() => Schema.Struct({
  targetedAppIds: Schema.optional(Schema.Array(Schema.String)),
  excludedAppIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FirstPartyMobileApplicationTargeting" }) as any as Schema.Schema<FirstPartyMobileApplicationTargeting>;

export interface MobileApplicationTargeting {
  /** Publisher owned apps to be targeted or excluded by the publisher to display the ads in. */
  firstPartyTargeting?: FirstPartyMobileApplicationTargeting;
}

export const MobileApplicationTargeting: Schema.Schema<MobileApplicationTargeting> = Schema.suspend(() => Schema.Struct({
  firstPartyTargeting: Schema.optional(FirstPartyMobileApplicationTargeting),
})).annotate({ identifier: "MobileApplicationTargeting" }) as any as Schema.Schema<MobileApplicationTargeting>;

export interface PlacementTargeting {
  /** URLs to be included/excluded. */
  uriTargeting?: UriTargeting;
  /** Mobile application targeting information in a deal. This doesn't apply to Auction Packages. */
  mobileApplicationTargeting?: MobileApplicationTargeting;
}

export const PlacementTargeting: Schema.Schema<PlacementTargeting> = Schema.suspend(() => Schema.Struct({
  uriTargeting: Schema.optional(UriTargeting),
  mobileApplicationTargeting: Schema.optional(MobileApplicationTargeting),
})).annotate({ identifier: "PlacementTargeting" }) as any as Schema.Schema<PlacementTargeting>;

export interface VideoTargeting {
  /** A list of video positions to be included. When this field is populated, the excluded_position_types field must be empty. */
  targetedPositionTypes?: Array<"POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL" | (string & {})>;
  /** A list of video positions to be excluded. When this field is populated, the targeted_position_types field must be empty. */
  excludedPositionTypes?: Array<"POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL" | (string & {})>;
}

export const VideoTargeting: Schema.Schema<VideoTargeting> = Schema.suspend(() => Schema.Struct({
  targetedPositionTypes: Schema.optional(Schema.Array(Schema.String)),
  excludedPositionTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VideoTargeting" }) as any as Schema.Schema<VideoTargeting>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface DayPart {
  /** Day of week for the period. */
  dayOfWeek?: "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | (string & {});
  /** Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically equivalent to 0, but is supported since in some cases there may need to be differentiation made between midnight on one day and midnight on the next day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only acceptable minute value for hour 24. Seconds and nanos are ignored. */
  startTime?: TimeOfDay;
  /** Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically equivalent to 0, but is supported since in some cases there may need to be differentiation made between midnight on one day and midnight on the next day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only acceptable minute value for hour 24. Seconds and nanos are ignored. */
  endTime?: TimeOfDay;
}

export const DayPart: Schema.Schema<DayPart> = Schema.suspend(() => Schema.Struct({
  dayOfWeek: Schema.optional(Schema.String),
  startTime: Schema.optional(TimeOfDay),
  endTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "DayPart" }) as any as Schema.Schema<DayPart>;

export interface DayPartTargeting {
  /** The time zone type of the day parts */
  timeZoneType?: "TIME_ZONE_TYPE_UNSPECIFIED" | "SELLER" | "USER" | (string & {});
  /** The targeted weekdays and times */
  dayParts?: Array<DayPart>;
}

export const DayPartTargeting: Schema.Schema<DayPartTargeting> = Schema.suspend(() => Schema.Struct({
  timeZoneType: Schema.optional(Schema.String),
  dayParts: Schema.optional(Schema.Array(DayPart)),
})).annotate({ identifier: "DayPartTargeting" }) as any as Schema.Schema<DayPartTargeting>;

export interface InventoryTypeTargeting {
  /** The list of targeted inventory types for the bid request. */
  inventoryTypes?: Array<"INVENTORY_TYPE_UNSPECIFIED" | "BROWSER" | "MOBILE_APP" | "VIDEO_PLAYER" | (string & {})>;
}

export const InventoryTypeTargeting: Schema.Schema<InventoryTypeTargeting> = Schema.suspend(() => Schema.Struct({
  inventoryTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InventoryTypeTargeting" }) as any as Schema.Schema<InventoryTypeTargeting>;

export interface MarketplaceTargeting {
  /** Output only. Geo criteria IDs to be included/excluded. */
  geoTargeting?: CriteriaTargeting;
  /** Output only. Inventory sizes to be included/excluded. */
  inventorySizeTargeting?: InventorySizeTargeting;
  /** Output only. Technology targeting information, for example, operating system, device category. */
  technologyTargeting?: TechnologyTargeting;
  /** Output only. Placement targeting information, for example, URL, mobile applications. */
  placementTargeting?: PlacementTargeting;
  /** Output only. Video targeting information. */
  videoTargeting?: VideoTargeting;
  /** Buyer user list targeting information. User lists can be uploaded using https://developers.google.com/authorized-buyers/rtb/bulk-uploader. */
  userListTargeting?: CriteriaTargeting;
  /** Daypart targeting information. */
  daypartTargeting?: DayPartTargeting;
  /** Output only. Inventory type targeting information. */
  inventoryTypeTargeting?: InventoryTypeTargeting;
  /** Output only. The verticals included or excluded as defined in https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals */
  verticalTargeting?: CriteriaTargeting;
  /** Output only. The sensitive content category label IDs excluded. Refer to this file https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for category IDs. */
  excludedSensitiveCategoryIds?: Array<string>;
}

export const MarketplaceTargeting: Schema.Schema<MarketplaceTargeting> = Schema.suspend(() => Schema.Struct({
  geoTargeting: Schema.optional(CriteriaTargeting),
  inventorySizeTargeting: Schema.optional(InventorySizeTargeting),
  technologyTargeting: Schema.optional(TechnologyTargeting),
  placementTargeting: Schema.optional(PlacementTargeting),
  videoTargeting: Schema.optional(VideoTargeting),
  userListTargeting: Schema.optional(CriteriaTargeting),
  daypartTargeting: Schema.optional(DayPartTargeting),
  inventoryTypeTargeting: Schema.optional(InventoryTypeTargeting),
  verticalTargeting: Schema.optional(CriteriaTargeting),
  excludedSensitiveCategoryIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MarketplaceTargeting" }) as any as Schema.Schema<MarketplaceTargeting>;

export interface CreativeRequirements {
  /** Output only. Specifies the creative pre-approval policy. */
  creativePreApprovalPolicy?: "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED" | "SELLER_PRE_APPROVAL_REQUIRED" | "SELLER_PRE_APPROVAL_NOT_REQUIRED" | (string & {});
  /** Output only. Specifies whether the creative is safeFrame compatible. */
  creativeSafeFrameCompatibility?: "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE" | (string & {});
  /** Output only. Specifies the creative source for programmatic deals. PUBLISHER means creative is provided by seller and ADVERTISER means creative is provided by the buyer. */
  programmaticCreativeSource?: "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED" | "ADVERTISER" | "PUBLISHER" | (string & {});
  /** Output only. The format of the creative, only applicable for programmatic guaranteed and preferred deals. */
  creativeFormat?: "CREATIVE_FORMAT_UNSPECIFIED" | "DISPLAY" | "VIDEO" | "AUDIO" | (string & {});
  /** Output only. Skippable video ads allow viewers to skip ads after 5 seconds. Only applicable for deals with video creatives. */
  skippableAdType?: "SKIPPABLE_AD_TYPE_UNSPECIFIED" | "SKIPPABLE" | "INSTREAM_SELECT" | "NOT_SKIPPABLE" | "ANY" | (string & {});
  /** Output only. The max duration of the video creative in milliseconds. only applicable for deals with video creatives. */
  maxAdDurationMs?: string;
}

export const CreativeRequirements: Schema.Schema<CreativeRequirements> = Schema.suspend(() => Schema.Struct({
  creativePreApprovalPolicy: Schema.optional(Schema.String),
  creativeSafeFrameCompatibility: Schema.optional(Schema.String),
  programmaticCreativeSource: Schema.optional(Schema.String),
  creativeFormat: Schema.optional(Schema.String),
  skippableAdType: Schema.optional(Schema.String),
  maxAdDurationMs: Schema.optional(Schema.String),
})).annotate({ identifier: "CreativeRequirements" }) as any as Schema.Schema<CreativeRequirements>;

export interface FrequencyCap {
  /** The maximum number of impressions that can be served to a user within the specified time period. */
  maxImpressions?: number;
  /** The amount of time, in the units specified by time_unit_type. Defines the amount of time over which impressions per user are counted and capped. */
  timeUnitsCount?: number;
  /** The time unit. Along with num_time_units defines the amount of time over which impressions per user are counted and capped. */
  timeUnitType?: "TIME_UNIT_TYPE_UNSPECIFIED" | "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "LIFETIME" | "POD" | "STREAM" | (string & {});
}

export const FrequencyCap: Schema.Schema<FrequencyCap> = Schema.suspend(() => Schema.Struct({
  maxImpressions: Schema.optional(Schema.Number),
  timeUnitsCount: Schema.optional(Schema.Number),
  timeUnitType: Schema.optional(Schema.String),
})).annotate({ identifier: "FrequencyCap" }) as any as Schema.Schema<FrequencyCap>;

export interface DeliveryControl {
  /** Output only. Specifies how the impression delivery will be paced. */
  deliveryRateType?: "DELIVERY_RATE_TYPE_UNSPECIFIED" | "EVENLY" | "FRONT_LOADED" | "AS_FAST_AS_POSSIBLE" | (string & {});
  /** Output only. Specifies any frequency caps. Cannot be filtered within ListDealsRequest. */
  frequencyCap?: Array<FrequencyCap>;
  /** Output only. Specifies the roadblocking type in display creatives. */
  roadblockingType?: "ROADBLOCKING_TYPE_UNSPECIFIED" | "ONLY_ONE" | "ONE_OR_MORE" | "AS_MANY_AS_POSSIBLE" | "ALL_ROADBLOCK" | "CREATIVE_SET" | (string & {});
  /** Output only. Specifies roadblocking in a main companion lineitem. */
  companionDeliveryType?: "COMPANION_DELIVERY_TYPE_UNSPECIFIED" | "DELIVERY_OPTIONAL" | "DELIVERY_AT_LEAST_ONE" | "DELIVERY_ALL" | (string & {});
  /** Output only. Specifies strategy to use for selecting a creative when multiple creatives of the same size are available. */
  creativeRotationType?: "CREATIVE_ROTATION_TYPE_UNSPECIFIED" | "ROTATION_EVEN" | "ROTATION_OPTIMIZED" | "ROTATION_MANUAL" | "ROTATION_SEQUENTIAL" | (string & {});
}

export const DeliveryControl: Schema.Schema<DeliveryControl> = Schema.suspend(() => Schema.Struct({
  deliveryRateType: Schema.optional(Schema.String),
  frequencyCap: Schema.optional(Schema.Array(FrequencyCap)),
  roadblockingType: Schema.optional(Schema.String),
  companionDeliveryType: Schema.optional(Schema.String),
  creativeRotationType: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryControl" }) as any as Schema.Schema<DeliveryControl>;

export interface Deal {
  /** Output only. Refers to a buyer in Real-time Bidding API's Buyer resource. Format: `buyers/{buyerAccountId}` */
  buyer?: string;
  /** Output only. Refers to a Client. Format: `buyers/{buyerAccountId}/clients/{clientAccountid}` */
  client?: string;
  /** Output only. Refers to a buyer in Real-time Bidding API's Buyer resource. This field represents a media planner (For example, agency or big advertiser). */
  mediaPlanner?: MediaPlanner;
  /** The terms for programmatic guaranteed deals. */
  programmaticGuaranteedTerms?: ProgrammaticGuaranteedTerms;
  /** The terms for preferred deals. */
  preferredDealTerms?: PreferredDealTerms;
  /** The terms for private auction deals. */
  privateAuctionTerms?: PrivateAuctionTerms;
  /** Immutable. The unique identifier of the deal. Auto-generated by the server when a deal is created. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId} */
  name?: string;
  /** Output only. The time of the deal creation. */
  createTime?: string;
  /** Output only. The time when the deal was last updated. */
  updateTime?: string;
  /** Output only. The revision number for the proposal and is the same value as proposal.proposal_revision. Each update to deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made. */
  proposalRevision?: string;
  /** Output only. The name of the deal. Maximum length of 255 unicode characters is allowed. Control characters are not allowed. Buyers cannot update this field. Note: Not to be confused with name, which is a unique identifier of the deal. */
  displayName?: string;
  /** Output only. When the client field is populated, this field refers to the buyer who creates and manages the client buyer and gets billed on behalf of the client buyer; when the buyer field is populated, this field is the same value as buyer; when the deal belongs to a media planner account, this field will be empty. Format : `buyers/{buyerAccountId}` */
  billedBuyer?: string;
  /** Immutable. Reference to the seller on the deal. Format: `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}` */
  publisherProfile?: string;
  /** Output only. Type of deal. */
  dealType?: "DEAL_TYPE_UNSPECIFIED" | "PREFERRED_DEAL" | "PRIVATE_AUCTION" | "PROGRAMMATIC_GUARANTEED" | (string & {});
  /** Specified by buyers in request for proposal (RFP) to notify publisher the total estimated spend for the proposal. Publishers will receive this information and send back proposed deals accordingly. */
  estimatedGrossSpend?: Money;
  /** Output only. Time zone of the seller used to mark the boundaries of a day for daypart targeting and CPD billing. */
  sellerTimeZone?: TimeZone;
  /** Output only. Free text description for the deal terms. */
  description?: string;
  /** Proposed flight start time of the deal. This will generally be stored in the granularity of one second since deal serving starts at seconds boundary. Any time specified with more granularity (for example, in milliseconds) will be truncated towards the start of time in seconds. */
  flightStartTime?: string;
  /** Proposed flight end time of the deal. This will generally be stored in a granularity of a second. A value is not necessary for Private Auction deals. */
  flightEndTime?: string;
  /** Specifies the subset of inventory targeted by the deal. Can be updated by the buyer before the deal is finalized. */
  targeting?: MarketplaceTargeting;
  /** Output only. Metadata about the creatives of this deal. */
  creativeRequirements?: CreativeRequirements;
  /** Output only. Specifies the pacing set by the publisher. */
  deliveryControl?: DeliveryControl;
  /** Output only. If set, this field contains the list of DSP specific seat ids set by media planners that are eligible to transact on this deal. The seat ID is in the calling DSP's namespace. */
  eligibleSeatIds?: Array<string>;
  /** Output only. The buyer permission type of the deal. */
  buyerPermissionType?: "BUYER_PERMISSION_TYPE_UNSPECIFIED" | "NEGOTIATOR_ONLY" | "BIDDER" | (string & {});
}

export const Deal: Schema.Schema<Deal> = Schema.suspend(() => Schema.Struct({
  buyer: Schema.optional(Schema.String),
  client: Schema.optional(Schema.String),
  mediaPlanner: Schema.optional(MediaPlanner),
  programmaticGuaranteedTerms: Schema.optional(ProgrammaticGuaranteedTerms),
  preferredDealTerms: Schema.optional(PreferredDealTerms),
  privateAuctionTerms: Schema.optional(PrivateAuctionTerms),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  proposalRevision: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  billedBuyer: Schema.optional(Schema.String),
  publisherProfile: Schema.optional(Schema.String),
  dealType: Schema.optional(Schema.String),
  estimatedGrossSpend: Schema.optional(Money),
  sellerTimeZone: Schema.optional(TimeZone),
  description: Schema.optional(Schema.String),
  flightStartTime: Schema.optional(Schema.String),
  flightEndTime: Schema.optional(Schema.String),
  targeting: Schema.optional(MarketplaceTargeting),
  creativeRequirements: Schema.optional(CreativeRequirements),
  deliveryControl: Schema.optional(DeliveryControl),
  eligibleSeatIds: Schema.optional(Schema.Array(Schema.String)),
  buyerPermissionType: Schema.optional(Schema.String),
})).annotate({ identifier: "Deal" }) as any as Schema.Schema<Deal>;

export interface UpdateDealRequest {
  /** Required. The deal to update. The deal's `name` field is used to identify the deal to be updated. Note: proposal_revision will have to be provided within the resource or else an error will be thrown. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId} */
  deal?: Deal;
  /** List of fields to be updated. If empty or unspecified, the service will update all fields populated in the update request excluding the output only fields and primitive fields with default value. Note that explicit field mask is required in order to reset a primitive field back to its default value, for example, false for boolean fields, 0 for integer fields. A special field mask consisting of a single path "*" can be used to indicate full replacement(the equivalent of PUT method), updatable fields unset or unspecified in the input will be cleared or set to default value. Output only fields will be ignored regardless of the value of updateMask. */
  updateMask?: string;
}

export const UpdateDealRequest: Schema.Schema<UpdateDealRequest> = Schema.suspend(() => Schema.Struct({
  deal: Schema.optional(Deal),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateDealRequest" }) as any as Schema.Schema<UpdateDealRequest>;

export interface BatchUpdateDealsRequest {
  /** Required. List of request messages to update deals. */
  requests?: Array<UpdateDealRequest>;
}

export const BatchUpdateDealsRequest: Schema.Schema<BatchUpdateDealsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateDealRequest)),
})).annotate({ identifier: "BatchUpdateDealsRequest" }) as any as Schema.Schema<BatchUpdateDealsRequest>;

export interface BatchUpdateDealsResponse {
  /** Deals updated. */
  deals?: Array<Deal>;
}

export const BatchUpdateDealsResponse: Schema.Schema<BatchUpdateDealsResponse> = Schema.suspend(() => Schema.Struct({
  deals: Schema.optional(Schema.Array(Deal)),
})).annotate({ identifier: "BatchUpdateDealsResponse" }) as any as Schema.Schema<BatchUpdateDealsResponse>;

export interface ListDealsResponse {
  /** The list of deals. */
  deals?: Array<Deal>;
  /** Token to fetch the next page of results. */
  nextPageToken?: string;
}

export const ListDealsResponse: Schema.Schema<ListDealsResponse> = Schema.suspend(() => Schema.Struct({
  deals: Schema.optional(Schema.Array(Deal)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDealsResponse" }) as any as Schema.Schema<ListDealsResponse>;

export interface DealPausingInfo {
  /** Whether pausing is consented between buyer and seller for the deal. */
  pausingConsented?: boolean;
  /** The party that first paused the deal; unspecified for active deals. */
  pauseRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** The reason for the pausing of the deal; empty for active deals. */
  pauseReason?: string;
}

export const DealPausingInfo: Schema.Schema<DealPausingInfo> = Schema.suspend(() => Schema.Struct({
  pausingConsented: Schema.optional(Schema.Boolean),
  pauseRole: Schema.optional(Schema.String),
  pauseReason: Schema.optional(Schema.String),
})).annotate({ identifier: "DealPausingInfo" }) as any as Schema.Schema<DealPausingInfo>;

export interface RtbMetrics {
  /** Bid requests in last 7 days. */
  bidRequests7Days?: string;
  /** Bids in last 7 days. */
  bids7Days?: string;
  /** Ad impressions in last 7 days. */
  adImpressions7Days?: string;
  /** Bid rate in last 7 days, calculated by (bids / bid requests). */
  bidRate7Days?: number;
  /** Filtered bid rate in last 7 days, calculated by (filtered bids / bids). */
  filteredBidRate7Days?: number;
  /** Must bid rate for current month. */
  mustBidRateCurrentMonth?: number;
}

export const RtbMetrics: Schema.Schema<RtbMetrics> = Schema.suspend(() => Schema.Struct({
  bidRequests7Days: Schema.optional(Schema.String),
  bids7Days: Schema.optional(Schema.String),
  adImpressions7Days: Schema.optional(Schema.String),
  bidRate7Days: Schema.optional(Schema.Number),
  filteredBidRate7Days: Schema.optional(Schema.Number),
  mustBidRateCurrentMonth: Schema.optional(Schema.Number),
})).annotate({ identifier: "RtbMetrics" }) as any as Schema.Schema<RtbMetrics>;

export interface FinalizedDeal {
  /** The resource name of the finalized deal. Format: `buyers/{accountId}/finalizedDeals/{finalizedDealId}` */
  name?: string;
  /** A copy of the Deal made upon finalization. During renegotiation, this will reflect the last finalized deal before renegotiation was initiated. */
  deal?: Deal;
  /** Serving status of the deal. */
  dealServingStatus?: "DEAL_SERVING_STATUS_UNSPECIFIED" | "ACTIVE" | "ENDED" | "PAUSED_BY_BUYER" | "PAUSED_BY_SELLER" | (string & {});
  /** Information related to deal pausing for the deal. */
  dealPausingInfo?: DealPausingInfo;
  /** Real-time bidding metrics for this deal. */
  rtbMetrics?: RtbMetrics;
  /** Whether the Programmatic Guaranteed deal is ready for serving. */
  readyToServe?: boolean;
}

export const FinalizedDeal: Schema.Schema<FinalizedDeal> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  deal: Schema.optional(Deal),
  dealServingStatus: Schema.optional(Schema.String),
  dealPausingInfo: Schema.optional(DealPausingInfo),
  rtbMetrics: Schema.optional(RtbMetrics),
  readyToServe: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FinalizedDeal" }) as any as Schema.Schema<FinalizedDeal>;

export interface ListFinalizedDealsResponse {
  /** The list of finalized deals. */
  finalizedDeals?: Array<FinalizedDeal>;
  /** Token to fetch the next page of results. */
  nextPageToken?: string;
}

export const ListFinalizedDealsResponse: Schema.Schema<ListFinalizedDealsResponse> = Schema.suspend(() => Schema.Struct({
  finalizedDeals: Schema.optional(Schema.Array(FinalizedDeal)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFinalizedDealsResponse" }) as any as Schema.Schema<ListFinalizedDealsResponse>;

export interface PauseFinalizedDealRequest {
  /** The reason to pause the finalized deal, will be displayed to the seller. Maximum length is 1000 characters. */
  reason?: string;
}

export const PauseFinalizedDealRequest: Schema.Schema<PauseFinalizedDealRequest> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "PauseFinalizedDealRequest" }) as any as Schema.Schema<PauseFinalizedDealRequest>;

export interface ResumeFinalizedDealRequest {
}

export const ResumeFinalizedDealRequest: Schema.Schema<ResumeFinalizedDealRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeFinalizedDealRequest" }) as any as Schema.Schema<ResumeFinalizedDealRequest>;

export interface AddCreativeRequest {
  /** Name of the creative to add to the finalized deal, in the format `buyers/{buyerAccountId}/creatives/{creativeId}`. See creative.name. */
  creative?: string;
}

export const AddCreativeRequest: Schema.Schema<AddCreativeRequest> = Schema.suspend(() => Schema.Struct({
  creative: Schema.optional(Schema.String),
})).annotate({ identifier: "AddCreativeRequest" }) as any as Schema.Schema<AddCreativeRequest>;

export interface SetReadyToServeRequest {
}

export const SetReadyToServeRequest: Schema.Schema<SetReadyToServeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SetReadyToServeRequest" }) as any as Schema.Schema<SetReadyToServeRequest>;

export interface PrivateData {
  /** A buyer specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units). */
  referenceId?: string;
}

export const PrivateData: Schema.Schema<PrivateData> = Schema.suspend(() => Schema.Struct({
  referenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateData" }) as any as Schema.Schema<PrivateData>;

export interface Contact {
  /** Email address for the contact. */
  email?: string;
  /** The display_name of the contact. */
  displayName?: string;
}

export const Contact: Schema.Schema<Contact> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Contact" }) as any as Schema.Schema<Contact>;

export interface Note {
  /** Output only. When this note was created. */
  createTime?: string;
  /** Output only. The role who created the note. */
  creatorRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** The text of the note. Maximum length is 1024 characters. */
  note?: string;
}

export const Note: Schema.Schema<Note> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  creatorRole: Schema.optional(Schema.String),
  note: Schema.optional(Schema.String),
})).annotate({ identifier: "Note" }) as any as Schema.Schema<Note>;

export interface Proposal {
  /** Output only. Refers to a buyer in The Realtime-bidding API. Format: `buyers/{buyerAccountId}` */
  buyer?: string;
  /** Output only. Refers to a Client. Format: `buyers/{buyerAccountId}/clients/{clientAccountid}` */
  client?: string;
  /** Immutable. The name of the proposal serving as a unique identifier. Format: buyers/{accountId}/proposals/{proposalId} */
  name?: string;
  /** Output only. The time when the proposal was last revised. */
  updateTime?: string;
  /** Output only. The revision number for the proposal. Each update to the proposal or deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made. */
  proposalRevision?: string;
  /** Output only. Type of deal the proposal contains. */
  dealType?: "DEAL_TYPE_UNSPECIFIED" | "PREFERRED_DEAL" | "PRIVATE_AUCTION" | "PROGRAMMATIC_GUARANTEED" | (string & {});
  /** Output only. The descriptive name for the proposal. Maximum length of 255 unicode characters is allowed. Control characters are not allowed. Buyers cannot update this field. Note: Not to be confused with name, which is a unique identifier of the proposal. */
  displayName?: string;
  /** Output only. Indicates the state of the proposal. */
  state?: "STATE_UNSPECIFIED" | "BUYER_REVIEW_REQUESTED" | "SELLER_REVIEW_REQUESTED" | "BUYER_ACCEPTANCE_REQUESTED" | "FINALIZED" | "TERMINATED" | (string & {});
  /** Output only. True if the proposal was previously finalized and is now being renegotiated. */
  isRenegotiating?: boolean;
  /** Output only. Indicates whether the buyer/seller created the proposal. */
  originatorRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** Immutable. Reference to the seller on the proposal. Format: `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}` Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error. */
  publisherProfile?: string;
  /** Buyer private data (hidden from seller). */
  buyerPrivateData?: PrivateData;
  /** Output only. When the client field is populated, this field refers to the buyer who creates and manages the client buyer and gets billed on behalf of the client buyer; when the buyer field is populated, this field is the same value as buyer. Format : `buyers/{buyerAccountId}` */
  billedBuyer?: string;
  /** Output only. Contact information for the seller. */
  sellerContacts?: Array<Contact>;
  /** Contact information for the buyer. */
  buyerContacts?: Array<Contact>;
  /** Output only. The role of the last user that either updated the proposal or left a comment. */
  lastUpdaterOrCommentorRole?: "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER" | (string & {});
  /** Output only. The terms and conditions associated with this proposal. Accepting a proposal implies acceptance of this field. This is created by the seller, the buyer can only view it. */
  termsAndConditions?: string;
  /** Whether pausing is allowed for the proposal. This is a negotiable term between buyers and publishers. */
  pausingConsented?: boolean;
  /** A list of notes from the buyer and the seller attached to this proposal. */
  notes?: Array<Note>;
}

export const Proposal: Schema.Schema<Proposal> = Schema.suspend(() => Schema.Struct({
  buyer: Schema.optional(Schema.String),
  client: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  proposalRevision: Schema.optional(Schema.String),
  dealType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  isRenegotiating: Schema.optional(Schema.Boolean),
  originatorRole: Schema.optional(Schema.String),
  publisherProfile: Schema.optional(Schema.String),
  buyerPrivateData: Schema.optional(PrivateData),
  billedBuyer: Schema.optional(Schema.String),
  sellerContacts: Schema.optional(Schema.Array(Contact)),
  buyerContacts: Schema.optional(Schema.Array(Contact)),
  lastUpdaterOrCommentorRole: Schema.optional(Schema.String),
  termsAndConditions: Schema.optional(Schema.String),
  pausingConsented: Schema.optional(Schema.Boolean),
  notes: Schema.optional(Schema.Array(Note)),
})).annotate({ identifier: "Proposal" }) as any as Schema.Schema<Proposal>;

export interface ListProposalsResponse {
  /** The list of proposals. */
  proposals?: Array<Proposal>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListProposalsResponse: Schema.Schema<ListProposalsResponse> = Schema.suspend(() => Schema.Struct({
  proposals: Schema.optional(Schema.Array(Proposal)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProposalsResponse" }) as any as Schema.Schema<ListProposalsResponse>;

export interface CancelNegotiationRequest {
}

export const CancelNegotiationRequest: Schema.Schema<CancelNegotiationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelNegotiationRequest" }) as any as Schema.Schema<CancelNegotiationRequest>;

export interface AcceptProposalRequest {
  /** The last known client revision number of the proposal. */
  proposalRevision?: string;
}

export const AcceptProposalRequest: Schema.Schema<AcceptProposalRequest> = Schema.suspend(() => Schema.Struct({
  proposalRevision: Schema.optional(Schema.String),
})).annotate({ identifier: "AcceptProposalRequest" }) as any as Schema.Schema<AcceptProposalRequest>;

export interface AddNoteRequest {
  /** The note to add. */
  note?: Note;
}

export const AddNoteRequest: Schema.Schema<AddNoteRequest> = Schema.suspend(() => Schema.Struct({
  note: Schema.optional(Note),
})).annotate({ identifier: "AddNoteRequest" }) as any as Schema.Schema<AddNoteRequest>;

export interface SendRfpRequest {
  /** The terms for programmatic guaranteed deals. */
  programmaticGuaranteedTerms?: ProgrammaticGuaranteedTerms;
  /** The terms for preferred deals. */
  preferredDealTerms?: PreferredDealTerms;
  /** Required. The display name of the proposal being created by this RFP. */
  displayName?: string;
  /** If the current buyer is sending the RFP on behalf of its client, use this field to specify the name of the client in the format: `buyers/{accountId}/clients/{clientAccountid}`. */
  client?: string;
  /** Required. The profile of the publisher who will receive this RFP in the format: `buyers/{accountId}/publisherProfiles/{publisherProfileId}`. */
  publisherProfile?: string;
  /** Contact information for the buyer. */
  buyerContacts?: Array<Contact>;
  /** A message that is sent to the publisher. Maximum length is 1024 characters. */
  note?: string;
  /** Geo criteria IDs to be targeted. Refer to Geo tables. */
  geoTargeting?: CriteriaTargeting;
  /** Inventory sizes to be targeted. Only PIXEL inventory size type is supported. */
  inventorySizeTargeting?: InventorySizeTargeting;
  /** Specified by buyers in request for proposal (RFP) to notify publisher the total estimated spend for the proposal. Publishers will receive this information and send back proposed deals accordingly. */
  estimatedGrossSpend?: Money;
  /** Required. Proposed flight start time of the RFP. A timestamp in RFC3339 UTC "Zulu" format. Note that the specified value will be truncated to a granularity of one second. */
  flightStartTime?: string;
  /** Required. Proposed flight end time of the RFP. A timestamp in RFC3339 UTC "Zulu" format. Note that the specified value will be truncated to a granularity of one second. */
  flightEndTime?: string;
}

export const SendRfpRequest: Schema.Schema<SendRfpRequest> = Schema.suspend(() => Schema.Struct({
  programmaticGuaranteedTerms: Schema.optional(ProgrammaticGuaranteedTerms),
  preferredDealTerms: Schema.optional(PreferredDealTerms),
  displayName: Schema.optional(Schema.String),
  client: Schema.optional(Schema.String),
  publisherProfile: Schema.optional(Schema.String),
  buyerContacts: Schema.optional(Schema.Array(Contact)),
  note: Schema.optional(Schema.String),
  geoTargeting: Schema.optional(CriteriaTargeting),
  inventorySizeTargeting: Schema.optional(InventorySizeTargeting),
  estimatedGrossSpend: Schema.optional(Money),
  flightStartTime: Schema.optional(Schema.String),
  flightEndTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SendRfpRequest" }) as any as Schema.Schema<SendRfpRequest>;

export interface PublisherProfileMobileApplication {
  /** The external ID for the app from its app store. Can be used to filter the response of the publisherProfiles.list method. */
  externalAppId?: string;
  /** The name of the app. */
  name?: string;
  /** The app store the app belongs to. Can be used to filter the response of the publisherProfiles.list method. */
  appStore?: "APP_STORE_TYPE_UNSPECIFIED" | "APPLE_ITUNES" | "GOOGLE_PLAY" | "ROKU" | "AMAZON_FIRE_TV" | "PLAYSTATION" | "XBOX" | "SAMSUNG_TV" | "AMAZON" | "OPPO" | "SAMSUNG" | "VIVO" | "XIAOMI" | "LG_TV" | (string & {});
}

export const PublisherProfileMobileApplication: Schema.Schema<PublisherProfileMobileApplication> = Schema.suspend(() => Schema.Struct({
  externalAppId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  appStore: Schema.optional(Schema.String),
})).annotate({ identifier: "PublisherProfileMobileApplication" }) as any as Schema.Schema<PublisherProfileMobileApplication>;

export interface PublisherProfile {
  /** Name of the publisher profile. Format: `buyers/{buyer}/publisherProfiles/{publisher_profile}` */
  name?: string;
  /** Display name of the publisher profile. Can be used to filter the response of the publisherProfiles.list method. */
  displayName?: string;
  /** The list of domains represented in this publisher profile. Empty if this is a parent profile. These are top private domains, meaning that these will not contain a string like "photos.google.co.uk/123", but will instead contain "google.co.uk". Can be used to filter the response of the publisherProfiles.list method. */
  domains?: Array<string>;
  /** The list of apps represented in this publisher profile. Empty if this is a parent profile. */
  mobileApps?: Array<PublisherProfileMobileApplication>;
  /** A Google public URL to the logo for this publisher profile. The logo is stored as a PNG, JPG, or GIF image. */
  logoUrl?: string;
  /** Contact information for direct reservation deals. This is free text entered by the publisher and may include information like names, phone numbers and email addresses. */
  directDealsContact?: string;
  /** Contact information for programmatic deals. This is free text entered by the publisher and may include information like names, phone numbers and email addresses. */
  programmaticDealsContact?: string;
  /** URL to additional marketing and sales materials. */
  mediaKitUrl?: string;
  /** URL to a sample content page. */
  samplePageUrl?: string;
  /** Overview of the publisher. */
  overview?: string;
  /** Statement explaining what's unique about publisher's business, and why buyers should partner with the publisher. */
  pitchStatement?: string;
  /** Up to three key metrics and rankings. For example, "#1 Mobile News Site for 20 Straight Months". */
  topHeadlines?: Array<string>;
  /** Description on the publisher's audience. */
  audienceDescription?: string;
  /** Indicates if this profile is the parent profile of the seller. A parent profile represents all the inventory from the seller, as opposed to child profile that is created to brand a portion of inventory. One seller has only one parent publisher profile, and can have multiple child profiles. See https://support.google.com/admanager/answer/6035806 for details. Can be used to filter the response of the publisherProfiles.list method by setting the filter to "is_parent: true". */
  isParent?: boolean;
  /** A unique identifying code for the seller. This value is the same for all of the seller's parent and child publisher profiles. Can be used to filter the response of the publisherProfiles.list method. */
  publisherCode?: string;
}

export const PublisherProfile: Schema.Schema<PublisherProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  domains: Schema.optional(Schema.Array(Schema.String)),
  mobileApps: Schema.optional(Schema.Array(PublisherProfileMobileApplication)),
  logoUrl: Schema.optional(Schema.String),
  directDealsContact: Schema.optional(Schema.String),
  programmaticDealsContact: Schema.optional(Schema.String),
  mediaKitUrl: Schema.optional(Schema.String),
  samplePageUrl: Schema.optional(Schema.String),
  overview: Schema.optional(Schema.String),
  pitchStatement: Schema.optional(Schema.String),
  topHeadlines: Schema.optional(Schema.Array(Schema.String)),
  audienceDescription: Schema.optional(Schema.String),
  isParent: Schema.optional(Schema.Boolean),
  publisherCode: Schema.optional(Schema.String),
})).annotate({ identifier: "PublisherProfile" }) as any as Schema.Schema<PublisherProfile>;

export interface ListPublisherProfilesResponse {
  /** The list of matching publisher profiles. */
  publisherProfiles?: Array<PublisherProfile>;
  /** Token to fetch the next page of results. */
  nextPageToken?: string;
}

export const ListPublisherProfilesResponse: Schema.Schema<ListPublisherProfilesResponse> = Schema.suspend(() => Schema.Struct({
  publisherProfiles: Schema.optional(Schema.Array(PublisherProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPublisherProfilesResponse" }) as any as Schema.Schema<ListPublisherProfilesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets an auction package given its name. */
export interface GetBuyersAuctionPackagesRequest {
  /** Required. Name of auction package to get. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}` */
  name: string;
}

export const GetBuyersAuctionPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/auctionPackages/{auctionPackagesId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersAuctionPackagesRequest>;

export type GetBuyersAuctionPackagesResponse = AuctionPackage;
export const GetBuyersAuctionPackagesResponse = AuctionPackage;

export type GetBuyersAuctionPackagesError = CommonErrors;

export const getBuyersAuctionPackages: API.OperationMethod<GetBuyersAuctionPackagesRequest, GetBuyersAuctionPackagesResponse, GetBuyersAuctionPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersAuctionPackagesRequest,
  output: GetBuyersAuctionPackagesResponse,
  errors: [],
}));

/** List the auction packages. Buyers can use the URL path "/v1/buyers/{accountId}/auctionPackages" to list auction packages for the current buyer and its clients. Bidders can use the URL path "/v1/bidders/{accountId}/auctionPackages" to list auction packages for the bidder, its media planners, its buyers, and all their clients. */
export interface ListBuyersAuctionPackagesRequest {
  /** Required. Name of the parent buyer that can access the auction package. Format: `buyers/{accountId}`. When used with a bidder account, the auction packages that the bidder, its media planners, its buyers and clients are subscribed to will be listed, in the format `bidders/{accountId}`. */
  parent: string;
  /** Requested page size. The server may return fewer results than requested. Max allowed page size is 500. */
  pageSize?: number;
  /** The page token as returned. ListAuctionPackagesResponse.nextPageToken */
  pageToken?: string;
  /** Optional. Optional query string using the [Cloud API list filtering syntax](/authorized-buyers/apis/guides/list-filters). Only supported when parent is bidder. Supported columns for filtering are: * displayName * createTime * updateTime * eligibleSeatIds */
  filter?: string;
  /** Optional. An optional query string to sort auction packages using the [Cloud API sorting syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order). If no sort order is specified, results will be returned in an arbitrary order. Only supported when parent is bidder. Supported columns for sorting are: * displayName * createTime * updateTime */
  orderBy?: string;
}

export const ListBuyersAuctionPackagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/auctionPackages" }),
  svc,
) as unknown as Schema.Schema<ListBuyersAuctionPackagesRequest>;

export type ListBuyersAuctionPackagesResponse = ListAuctionPackagesResponse;
export const ListBuyersAuctionPackagesResponse = ListAuctionPackagesResponse;

export type ListBuyersAuctionPackagesError = CommonErrors;

export const listBuyersAuctionPackages = API.makePaginated(() => ({
  input: ListBuyersAuctionPackagesRequest,
  output: ListBuyersAuctionPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Subscribe to the auction package for the specified buyer. Once subscribed, the bidder will receive a call out for inventory matching the auction package targeting criteria with the auction package deal ID and the specified buyer. */
export interface SubscribeBuyersAuctionPackagesRequest {
  /** Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}` */
  name: string;
  /** Request body */
  body?: SubscribeAuctionPackageRequest;
}

export const SubscribeBuyersAuctionPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SubscribeAuctionPackageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/auctionPackages/{auctionPackagesId}:subscribe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubscribeBuyersAuctionPackagesRequest>;

export type SubscribeBuyersAuctionPackagesResponse = AuctionPackage;
export const SubscribeBuyersAuctionPackagesResponse = AuctionPackage;

export type SubscribeBuyersAuctionPackagesError = CommonErrors;

export const subscribeBuyersAuctionPackages: API.OperationMethod<SubscribeBuyersAuctionPackagesRequest, SubscribeBuyersAuctionPackagesResponse, SubscribeBuyersAuctionPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeBuyersAuctionPackagesRequest,
  output: SubscribeBuyersAuctionPackagesResponse,
  errors: [],
}));

/** Unsubscribe from the auction package for the specified buyer. Once unsubscribed, the bidder will no longer receive a call out for the auction package deal ID and the specified buyer. */
export interface UnsubscribeBuyersAuctionPackagesRequest {
  /** Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}` */
  name: string;
  /** Request body */
  body?: UnsubscribeAuctionPackageRequest;
}

export const UnsubscribeBuyersAuctionPackagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UnsubscribeAuctionPackageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/auctionPackages/{auctionPackagesId}:unsubscribe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnsubscribeBuyersAuctionPackagesRequest>;

export type UnsubscribeBuyersAuctionPackagesResponse = AuctionPackage;
export const UnsubscribeBuyersAuctionPackagesResponse = AuctionPackage;

export type UnsubscribeBuyersAuctionPackagesError = CommonErrors;

export const unsubscribeBuyersAuctionPackages: API.OperationMethod<UnsubscribeBuyersAuctionPackagesRequest, UnsubscribeBuyersAuctionPackagesResponse, UnsubscribeBuyersAuctionPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnsubscribeBuyersAuctionPackagesRequest,
  output: UnsubscribeBuyersAuctionPackagesResponse,
  errors: [],
}));

/** Subscribe the specified clients of the buyer to the auction package. If a client in the list does not belong to the buyer, an error response will be returned, and all of the following clients in the list will not be subscribed. Subscribing an already subscribed client will have no effect. */
export interface SubscribeClientsBuyersAuctionPackagesRequest {
  /** Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}` */
  auctionPackage: string;
  /** Request body */
  body?: SubscribeClientsRequest;
}

export const SubscribeClientsBuyersAuctionPackagesRequest = Schema.Struct({
  auctionPackage: Schema.String.pipe(T.HttpPath("auctionPackage")),
  body: Schema.optional(SubscribeClientsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/auctionPackages/{auctionPackagesId}:subscribeClients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubscribeClientsBuyersAuctionPackagesRequest>;

export type SubscribeClientsBuyersAuctionPackagesResponse = AuctionPackage;
export const SubscribeClientsBuyersAuctionPackagesResponse = AuctionPackage;

export type SubscribeClientsBuyersAuctionPackagesError = CommonErrors;

export const subscribeClientsBuyersAuctionPackages: API.OperationMethod<SubscribeClientsBuyersAuctionPackagesRequest, SubscribeClientsBuyersAuctionPackagesResponse, SubscribeClientsBuyersAuctionPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeClientsBuyersAuctionPackagesRequest,
  output: SubscribeClientsBuyersAuctionPackagesResponse,
  errors: [],
}));

/** Unsubscribe from the auction package for the specified clients of the buyer. Unsubscribing a client that is not subscribed will have no effect. */
export interface UnsubscribeClientsBuyersAuctionPackagesRequest {
  /** Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}` */
  auctionPackage: string;
  /** Request body */
  body?: UnsubscribeClientsRequest;
}

export const UnsubscribeClientsBuyersAuctionPackagesRequest = Schema.Struct({
  auctionPackage: Schema.String.pipe(T.HttpPath("auctionPackage")),
  body: Schema.optional(UnsubscribeClientsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/auctionPackages/{auctionPackagesId}:unsubscribeClients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnsubscribeClientsBuyersAuctionPackagesRequest>;

export type UnsubscribeClientsBuyersAuctionPackagesResponse = AuctionPackage;
export const UnsubscribeClientsBuyersAuctionPackagesResponse = AuctionPackage;

export type UnsubscribeClientsBuyersAuctionPackagesError = CommonErrors;

export const unsubscribeClientsBuyersAuctionPackages: API.OperationMethod<UnsubscribeClientsBuyersAuctionPackagesRequest, UnsubscribeClientsBuyersAuctionPackagesResponse, UnsubscribeClientsBuyersAuctionPackagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnsubscribeClientsBuyersAuctionPackagesRequest,
  output: UnsubscribeClientsBuyersAuctionPackagesResponse,
  errors: [],
}));

/** Gets a client with a given resource name. */
export interface GetBuyersClientsRequest {
  /** Required. Format: `buyers/{accountId}/clients/{clientAccountId}` */
  name: string;
}

export const GetBuyersClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/clients/{clientsId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersClientsRequest>;

export type GetBuyersClientsResponse = Client;
export const GetBuyersClientsResponse = Client;

export type GetBuyersClientsError = CommonErrors;

export const getBuyersClients: API.OperationMethod<GetBuyersClientsRequest, GetBuyersClientsResponse, GetBuyersClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersClientsRequest,
  output: GetBuyersClientsResponse,
  errors: [],
}));

/** Lists all the clients for the current buyer. */
export interface ListBuyersClientsRequest {
  /** Required. The name of the buyer. Format: `buyers/{accountId}` */
  parent: string;
  /** Requested page size. If left blank, a default page size of 500 will be applied. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListClientsResponse.nextPageToken returned from the previous call to the list method. */
  pageToken?: string;
  /** Query string using the [Filtering Syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) Supported fields for filtering are: * partnerClientId Use this field to filter the clients by the partnerClientId. For example, if the partnerClientId of the client is "1234", the value of this field should be `partnerClientId = "1234"`, in order to get only the client whose partnerClientId is "1234" in the response. */
  filter?: string;
}

export const ListBuyersClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/clients" }),
  svc,
) as unknown as Schema.Schema<ListBuyersClientsRequest>;

export type ListBuyersClientsResponse = ListClientsResponse;
export const ListBuyersClientsResponse = ListClientsResponse;

export type ListBuyersClientsError = CommonErrors;

export const listBuyersClients = API.makePaginated(() => ({
  input: ListBuyersClientsRequest,
  output: ListBuyersClientsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new client. */
export interface CreateBuyersClientsRequest {
  /** Required. The name of the buyer. Format: `buyers/{accountId}` */
  parent: string;
  /** Request body */
  body?: Client;
}

export const CreateBuyersClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Client).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/clients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBuyersClientsRequest>;

export type CreateBuyersClientsResponse = Client;
export const CreateBuyersClientsResponse = Client;

export type CreateBuyersClientsError = CommonErrors;

export const createBuyersClients: API.OperationMethod<CreateBuyersClientsRequest, CreateBuyersClientsResponse, CreateBuyersClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBuyersClientsRequest,
  output: CreateBuyersClientsResponse,
  errors: [],
}));

/** Updates an existing client. */
export interface PatchBuyersClientsRequest {
  /** Output only. The resource name of the client. Format: `buyers/{accountId}/clients/{clientAccountId}` */
  name: string;
  /** List of fields to be updated. If empty or unspecified, the service will update all fields populated in the update request excluding the output only fields and primitive fields with default value. Note that explicit field mask is required in order to reset a primitive field back to its default value, for example, false for boolean fields, 0 for integer fields. A special field mask consisting of a single path "*" can be used to indicate full replacement(the equivalent of PUT method), updatable fields unset or unspecified in the input will be cleared or set to default value. Output only fields will be ignored regardless of the value of updateMask. */
  updateMask?: string;
  /** Request body */
  body?: Client;
}

export const PatchBuyersClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Client).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/buyers/{buyersId}/clients/{clientsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBuyersClientsRequest>;

export type PatchBuyersClientsResponse = Client;
export const PatchBuyersClientsResponse = Client;

export type PatchBuyersClientsError = CommonErrors;

export const patchBuyersClients: API.OperationMethod<PatchBuyersClientsRequest, PatchBuyersClientsResponse, PatchBuyersClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBuyersClientsRequest,
  output: PatchBuyersClientsResponse,
  errors: [],
}));

/** Activates an existing client. The state of the client will be updated to "ACTIVE". This method has no effect if the client is already in "ACTIVE" state. */
export interface ActivateBuyersClientsRequest {
  /** Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}` */
  name: string;
  /** Request body */
  body?: ActivateClientRequest;
}

export const ActivateBuyersClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ActivateClientRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/clients/{clientsId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateBuyersClientsRequest>;

export type ActivateBuyersClientsResponse = Client;
export const ActivateBuyersClientsResponse = Client;

export type ActivateBuyersClientsError = CommonErrors;

export const activateBuyersClients: API.OperationMethod<ActivateBuyersClientsRequest, ActivateBuyersClientsResponse, ActivateBuyersClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateBuyersClientsRequest,
  output: ActivateBuyersClientsResponse,
  errors: [],
}));

/** Deactivates an existing client. The state of the client will be updated to "INACTIVE". This method has no effect if the client is already in "INACTIVE" state. */
export interface DeactivateBuyersClientsRequest {
  /** Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}` */
  name: string;
  /** Request body */
  body?: DeactivateClientRequest;
}

export const DeactivateBuyersClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeactivateClientRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/clients/{clientsId}:deactivate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeactivateBuyersClientsRequest>;

export type DeactivateBuyersClientsResponse = Client;
export const DeactivateBuyersClientsResponse = Client;

export type DeactivateBuyersClientsError = CommonErrors;

export const deactivateBuyersClients: API.OperationMethod<DeactivateBuyersClientsRequest, DeactivateBuyersClientsResponse, DeactivateBuyersClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeactivateBuyersClientsRequest,
  output: DeactivateBuyersClientsResponse,
  errors: [],
}));

/** Retrieves an existing client user. */
export interface GetBuyersClientsUsersRequest {
  /** Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}` */
  name: string;
}

export const GetBuyersClientsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/clients/{clientsId}/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersClientsUsersRequest>;

export type GetBuyersClientsUsersResponse = ClientUser;
export const GetBuyersClientsUsersResponse = ClientUser;

export type GetBuyersClientsUsersError = CommonErrors;

export const getBuyersClientsUsers: API.OperationMethod<GetBuyersClientsUsersRequest, GetBuyersClientsUsersResponse, GetBuyersClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersClientsUsersRequest,
  output: GetBuyersClientsUsersResponse,
  errors: [],
}));

/** Lists all client users for a specified client. */
export interface ListBuyersClientsUsersRequest {
  /** Required. The name of the client. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}` */
  parent: string;
  /** Requested page size. If left blank, a default page size of 500 will be applied. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. Typically, this is the value of ListClientUsersResponse.nextPageToken returned from the previous call to the list method. */
  pageToken?: string;
}

export const ListBuyersClientsUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/clients/{clientsId}/users" }),
  svc,
) as unknown as Schema.Schema<ListBuyersClientsUsersRequest>;

export type ListBuyersClientsUsersResponse = ListClientUsersResponse;
export const ListBuyersClientsUsersResponse = ListClientUsersResponse;

export type ListBuyersClientsUsersError = CommonErrors;

export const listBuyersClientsUsers = API.makePaginated(() => ({
  input: ListBuyersClientsUsersRequest,
  output: ListBuyersClientsUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new client user in "INVITED" state. An email invitation will be sent to the new user, once accepted the user will become active. */
export interface CreateBuyersClientsUsersRequest {
  /** Required. The name of the client. Format: `buyers/{accountId}/clients/{clientAccountId}` */
  parent: string;
  /** Request body */
  body?: ClientUser;
}

export const CreateBuyersClientsUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ClientUser).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/clients/{clientsId}/users", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBuyersClientsUsersRequest>;

export type CreateBuyersClientsUsersResponse = ClientUser;
export const CreateBuyersClientsUsersResponse = ClientUser;

export type CreateBuyersClientsUsersError = CommonErrors;

export const createBuyersClientsUsers: API.OperationMethod<CreateBuyersClientsUsersRequest, CreateBuyersClientsUsersResponse, CreateBuyersClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBuyersClientsUsersRequest,
  output: CreateBuyersClientsUsersResponse,
  errors: [],
}));

/** Deletes an existing client user. The client user will lose access to the Authorized Buyers UI. Note that if a client user is deleted, the user's access to the UI can't be restored unless a new client user is created and activated. */
export interface DeleteBuyersClientsUsersRequest {
  /** Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}` */
  name: string;
}

export const DeleteBuyersClientsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/buyers/{buyersId}/clients/{clientsId}/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteBuyersClientsUsersRequest>;

export type DeleteBuyersClientsUsersResponse = Empty;
export const DeleteBuyersClientsUsersResponse = Empty;

export type DeleteBuyersClientsUsersError = CommonErrors;

export const deleteBuyersClientsUsers: API.OperationMethod<DeleteBuyersClientsUsersRequest, DeleteBuyersClientsUsersResponse, DeleteBuyersClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBuyersClientsUsersRequest,
  output: DeleteBuyersClientsUsersResponse,
  errors: [],
}));

/** Activates an existing client user. The state of the client user will be updated from "INACTIVE" to "ACTIVE". This method has no effect if the client user is already in "ACTIVE" state. An error will be returned if the client user to activate is still in "INVITED" state. */
export interface ActivateBuyersClientsUsersRequest {
  /** Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}` */
  name: string;
  /** Request body */
  body?: ActivateClientUserRequest;
}

export const ActivateBuyersClientsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ActivateClientUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/clients/{clientsId}/users/{usersId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateBuyersClientsUsersRequest>;

export type ActivateBuyersClientsUsersResponse = ClientUser;
export const ActivateBuyersClientsUsersResponse = ClientUser;

export type ActivateBuyersClientsUsersError = CommonErrors;

export const activateBuyersClientsUsers: API.OperationMethod<ActivateBuyersClientsUsersRequest, ActivateBuyersClientsUsersResponse, ActivateBuyersClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateBuyersClientsUsersRequest,
  output: ActivateBuyersClientsUsersResponse,
  errors: [],
}));

/** Deactivates an existing client user. The state of the client user will be updated from "ACTIVE" to "INACTIVE". This method has no effect if the client user is already in "INACTIVE" state. An error will be returned if the client user to deactivate is still in "INVITED" state. */
export interface DeactivateBuyersClientsUsersRequest {
  /** Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}` */
  name: string;
  /** Request body */
  body?: DeactivateClientUserRequest;
}

export const DeactivateBuyersClientsUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeactivateClientUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/clients/{clientsId}/users/{usersId}:deactivate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeactivateBuyersClientsUsersRequest>;

export type DeactivateBuyersClientsUsersResponse = ClientUser;
export const DeactivateBuyersClientsUsersResponse = ClientUser;

export type DeactivateBuyersClientsUsersError = CommonErrors;

export const deactivateBuyersClientsUsers: API.OperationMethod<DeactivateBuyersClientsUsersRequest, DeactivateBuyersClientsUsersResponse, DeactivateBuyersClientsUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeactivateBuyersClientsUsersRequest,
  output: DeactivateBuyersClientsUsersResponse,
  errors: [],
}));

/** Gets a finalized deal given its name. */
export interface GetBuyersFinalizedDealsRequest {
  /** Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}` */
  name: string;
}

export const GetBuyersFinalizedDealsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/finalizedDeals/{finalizedDealsId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersFinalizedDealsRequest>;

export type GetBuyersFinalizedDealsResponse = FinalizedDeal;
export const GetBuyersFinalizedDealsResponse = FinalizedDeal;

export type GetBuyersFinalizedDealsError = CommonErrors;

export const getBuyersFinalizedDeals: API.OperationMethod<GetBuyersFinalizedDealsRequest, GetBuyersFinalizedDealsResponse, GetBuyersFinalizedDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersFinalizedDealsRequest,
  output: GetBuyersFinalizedDealsResponse,
  errors: [],
}));

/** Lists finalized deals. Use the URL path "/v1/buyers/{accountId}/finalizedDeals" to list finalized deals for the current buyer and its clients. Bidders can use the URL path "/v1/bidders/{accountId}/finalizedDeals" to list finalized deals for the bidder, its buyers and all their clients. */
export interface ListBuyersFinalizedDealsRequest {
  /** Required. The buyer to list the finalized deals for, in the format: `buyers/{accountId}`. When used to list finalized deals for a bidder, its buyers and clients, in the format `bidders/{accountId}`. */
  parent: string;
  /** Optional query string using the [Cloud API list filtering syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) Supported columns for filtering are: * deal.displayName * deal.dealType * deal.createTime * deal.updateTime * deal.flightStartTime * deal.flightEndTime * deal.eligibleSeatIds * dealServingStatus */
  filter?: string;
  /** An optional query string to sort finalized deals using the [Cloud API sorting syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order). If no sort order is specified, results will be returned in an arbitrary order. Supported columns for sorting are: * deal.displayName * deal.createTime * deal.updateTime * deal.flightStartTime * deal.flightEndTime * rtbMetrics.bidRequests7Days * rtbMetrics.bids7Days * rtbMetrics.adImpressions7Days * rtbMetrics.bidRate7Days * rtbMetrics.filteredBidRate7Days * rtbMetrics.mustBidRateCurrentMonth */
  orderBy?: string;
  /** Requested page size. The server may return fewer results than requested. If requested more than 500, the server will return 500 results per page. If unspecified, the server will pick a default page size of 100. */
  pageSize?: number;
  /** The page token as returned from ListFinalizedDealsResponse. */
  pageToken?: string;
}

export const ListBuyersFinalizedDealsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/finalizedDeals" }),
  svc,
) as unknown as Schema.Schema<ListBuyersFinalizedDealsRequest>;

export type ListBuyersFinalizedDealsResponse = ListFinalizedDealsResponse;
export const ListBuyersFinalizedDealsResponse = ListFinalizedDealsResponse;

export type ListBuyersFinalizedDealsError = CommonErrors;

export const listBuyersFinalizedDeals = API.makePaginated(() => ({
  input: ListBuyersFinalizedDealsRequest,
  output: ListBuyersFinalizedDealsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Pauses serving of the given finalized deal. This call only pauses the serving status, and does not affect other fields of the finalized deal. Calling this method for an already paused deal has no effect. This method only applies to programmatic guaranteed deals and preferred deals. */
export interface PauseBuyersFinalizedDealsRequest {
  /** Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}` */
  name: string;
  /** Request body */
  body?: PauseFinalizedDealRequest;
}

export const PauseBuyersFinalizedDealsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseFinalizedDealRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/finalizedDeals/{finalizedDealsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseBuyersFinalizedDealsRequest>;

export type PauseBuyersFinalizedDealsResponse = FinalizedDeal;
export const PauseBuyersFinalizedDealsResponse = FinalizedDeal;

export type PauseBuyersFinalizedDealsError = CommonErrors;

export const pauseBuyersFinalizedDeals: API.OperationMethod<PauseBuyersFinalizedDealsRequest, PauseBuyersFinalizedDealsResponse, PauseBuyersFinalizedDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseBuyersFinalizedDealsRequest,
  output: PauseBuyersFinalizedDealsResponse,
  errors: [],
}));

/** Resumes serving of the given finalized deal. Calling this method for an running deal has no effect. If a deal is initially paused by the seller, calling this method will not resume serving of the deal until the seller also resumes the deal. This method only applies to programmatic guaranteed deals and preferred deals. */
export interface ResumeBuyersFinalizedDealsRequest {
  /** Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}` */
  name: string;
  /** Request body */
  body?: ResumeFinalizedDealRequest;
}

export const ResumeBuyersFinalizedDealsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeFinalizedDealRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/finalizedDeals/{finalizedDealsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeBuyersFinalizedDealsRequest>;

export type ResumeBuyersFinalizedDealsResponse = FinalizedDeal;
export const ResumeBuyersFinalizedDealsResponse = FinalizedDeal;

export type ResumeBuyersFinalizedDealsError = CommonErrors;

export const resumeBuyersFinalizedDeals: API.OperationMethod<ResumeBuyersFinalizedDealsRequest, ResumeBuyersFinalizedDealsResponse, ResumeBuyersFinalizedDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeBuyersFinalizedDealsRequest,
  output: ResumeBuyersFinalizedDealsResponse,
  errors: [],
}));

/** Add creative to be used in the bidding process for a finalized deal. For programmatic guaranteed deals, it's recommended that you associate at least one approved creative with the deal before calling SetReadyToServe, to help reduce the number of bid responses filtered because they don't contain approved creatives. Creatives successfully added to a deal can be found in the Realtime-bidding Creatives API creative.deal_ids. This method only applies to programmatic guaranteed deals. Maximum number of 1000 creatives can be added to a finalized deal. */
export interface AddCreativeBuyersFinalizedDealsRequest {
  /** Required. Name of the finalized deal in the format of: `buyers/{accountId}/finalizedDeals/{dealId}` */
  deal: string;
  /** Request body */
  body?: AddCreativeRequest;
}

export const AddCreativeBuyersFinalizedDealsRequest = Schema.Struct({
  deal: Schema.String.pipe(T.HttpPath("deal")),
  body: Schema.optional(AddCreativeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/finalizedDeals/{finalizedDealsId}:addCreative", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddCreativeBuyersFinalizedDealsRequest>;

export type AddCreativeBuyersFinalizedDealsResponse = FinalizedDeal;
export const AddCreativeBuyersFinalizedDealsResponse = FinalizedDeal;

export type AddCreativeBuyersFinalizedDealsError = CommonErrors;

export const addCreativeBuyersFinalizedDeals: API.OperationMethod<AddCreativeBuyersFinalizedDealsRequest, AddCreativeBuyersFinalizedDealsResponse, AddCreativeBuyersFinalizedDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddCreativeBuyersFinalizedDealsRequest,
  output: AddCreativeBuyersFinalizedDealsResponse,
  errors: [],
}));

/** Sets the given finalized deal as ready to serve. By default, deals are set as ready to serve as soon as they're finalized. If you want to opt out of the default behavior, and manually indicate that deals are ready to serve, ask your Technical Account Manager to add you to the allowlist. If you choose to use this method, finalized deals belonging to the bidder and its child seats don't start serving until after you call `setReadyToServe`, and after the deals become active. For example, you can use this method to delay receiving bid requests until your creative is ready. In addition, bidders can use the URL path "/v1/bidders/{accountId}/finalizedDeals/{dealId}" to set ready to serve for the finalized deals belong to itself, its child seats and all their clients. This method only applies to programmatic guaranteed deals. */
export interface SetReadyToServeBuyersFinalizedDealsRequest {
  /** Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}` or `bidders/{accountId}/finalizedDeals/{dealId}` */
  deal: string;
  /** Request body */
  body?: SetReadyToServeRequest;
}

export const SetReadyToServeBuyersFinalizedDealsRequest = Schema.Struct({
  deal: Schema.String.pipe(T.HttpPath("deal")),
  body: Schema.optional(SetReadyToServeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/finalizedDeals/{finalizedDealsId}:setReadyToServe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetReadyToServeBuyersFinalizedDealsRequest>;

export type SetReadyToServeBuyersFinalizedDealsResponse = FinalizedDeal;
export const SetReadyToServeBuyersFinalizedDealsResponse = FinalizedDeal;

export type SetReadyToServeBuyersFinalizedDealsError = CommonErrors;

export const setReadyToServeBuyersFinalizedDeals: API.OperationMethod<SetReadyToServeBuyersFinalizedDealsRequest, SetReadyToServeBuyersFinalizedDealsResponse, SetReadyToServeBuyersFinalizedDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetReadyToServeBuyersFinalizedDealsRequest,
  output: SetReadyToServeBuyersFinalizedDealsResponse,
  errors: [],
}));

/** Gets a proposal using its resource name. The proposal is returned at the latest revision. */
export interface GetBuyersProposalsRequest {
  /** Required. Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}` */
  name: string;
}

export const GetBuyersProposalsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/proposals/{proposalsId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersProposalsRequest>;

export type GetBuyersProposalsResponse = Proposal;
export const GetBuyersProposalsResponse = Proposal;

export type GetBuyersProposalsError = CommonErrors;

export const getBuyersProposals: API.OperationMethod<GetBuyersProposalsRequest, GetBuyersProposalsResponse, GetBuyersProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersProposalsRequest,
  output: GetBuyersProposalsResponse,
  errors: [],
}));

/** Updates the proposal at the given revision number. If the revision number in the request is behind the latest one kept in the server, an error message will be returned. See FieldMask for how to use FieldMask. Only fields specified in the UpdateProposalRequest.update_mask will be updated; Fields noted as 'Immutable' or 'Output only' yet specified in the UpdateProposalRequest.update_mask will be ignored and left unchanged. Updating a private auction proposal is only allowed for buyer private data, all other fields are immutable. */
export interface PatchBuyersProposalsRequest {
  /** Immutable. The name of the proposal serving as a unique identifier. Format: buyers/{accountId}/proposals/{proposalId} */
  name: string;
  /** List of fields to be updated. If empty or unspecified, the service will update all fields populated in the update request excluding the output only fields and primitive fields with default value. Note that explicit field mask is required in order to reset a primitive field back to its default value, for example, false for boolean fields, 0 for integer fields. A special field mask consisting of a single path "*" can be used to indicate full replacement(the equivalent of PUT method), updatable fields unset or unspecified in the input will be cleared or set to default value. Output only fields will be ignored regardless of the value of updateMask. */
  updateMask?: string;
  /** Request body */
  body?: Proposal;
}

export const PatchBuyersProposalsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Proposal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/buyers/{buyersId}/proposals/{proposalsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBuyersProposalsRequest>;

export type PatchBuyersProposalsResponse = Proposal;
export const PatchBuyersProposalsResponse = Proposal;

export type PatchBuyersProposalsError = CommonErrors;

export const patchBuyersProposals: API.OperationMethod<PatchBuyersProposalsRequest, PatchBuyersProposalsResponse, PatchBuyersProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBuyersProposalsRequest,
  output: PatchBuyersProposalsResponse,
  errors: [],
}));

/** Lists proposals. A filter expression using [Cloud API list filtering syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) may be specified to filter the results. */
export interface ListBuyersProposalsRequest {
  /** Required. Parent that owns the collection of proposals Format: `buyers/{accountId}` */
  parent: string;
  /** Optional query string using the [Cloud API list filtering syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) Supported columns for filtering are: * displayName * dealType * updateTime * state */
  filter?: string;
  /** Requested page size. The server may return fewer results than requested. If unspecified, the server will put a size of 500. */
  pageSize?: number;
  /** The page token as returned from ListProposalsResponse. */
  pageToken?: string;
}

export const ListBuyersProposalsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/proposals" }),
  svc,
) as unknown as Schema.Schema<ListBuyersProposalsRequest>;

export type ListBuyersProposalsResponse = ListProposalsResponse;
export const ListBuyersProposalsResponse = ListProposalsResponse;

export type ListBuyersProposalsError = CommonErrors;

export const listBuyersProposals = API.makePaginated(() => ({
  input: ListBuyersProposalsRequest,
  output: ListBuyersProposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Cancels an ongoing negotiation on a proposal. This does not cancel or end serving for the deals if the proposal has been finalized. If the proposal has not been finalized before, calling this method will set the Proposal.state to `TERMINATED` and increment the Proposal.proposal_revision. If the proposal has been finalized before and is under renegotiation now, calling this method will reset the Proposal.state to `FINALIZED` and increment the Proposal.proposal_revision. This method does not support private auction proposals whose Proposal.deal_type is 'PRIVATE_AUCTION'. */
export interface CancelNegotiationBuyersProposalsRequest {
  /** Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}` */
  proposal: string;
  /** Request body */
  body?: CancelNegotiationRequest;
}

export const CancelNegotiationBuyersProposalsRequest = Schema.Struct({
  proposal: Schema.String.pipe(T.HttpPath("proposal")),
  body: Schema.optional(CancelNegotiationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/proposals/{proposalsId}:cancelNegotiation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelNegotiationBuyersProposalsRequest>;

export type CancelNegotiationBuyersProposalsResponse = Proposal;
export const CancelNegotiationBuyersProposalsResponse = Proposal;

export type CancelNegotiationBuyersProposalsError = CommonErrors;

export const cancelNegotiationBuyersProposals: API.OperationMethod<CancelNegotiationBuyersProposalsRequest, CancelNegotiationBuyersProposalsResponse, CancelNegotiationBuyersProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelNegotiationBuyersProposalsRequest,
  output: CancelNegotiationBuyersProposalsResponse,
  errors: [],
}));

/** Accepts the proposal at the given revision number. If the revision number in the request is behind the latest from the server, an error message will be returned. This call updates the Proposal.state from `BUYER_ACCEPTANCE_REQUESTED` to `FINALIZED`; it has no side effect if the Proposal.state is already `FINALIZED` and throws exception if the Proposal.state is not either `BUYER_ACCEPTANCE_REQUESTED` or `FINALIZED`. Accepting a proposal means the buyer understands and accepts the Proposal.terms_and_conditions proposed by the seller. */
export interface AcceptBuyersProposalsRequest {
  /** Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}` */
  name: string;
  /** Request body */
  body?: AcceptProposalRequest;
}

export const AcceptBuyersProposalsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AcceptProposalRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/proposals/{proposalsId}:accept", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptBuyersProposalsRequest>;

export type AcceptBuyersProposalsResponse = Proposal;
export const AcceptBuyersProposalsResponse = Proposal;

export type AcceptBuyersProposalsError = CommonErrors;

export const acceptBuyersProposals: API.OperationMethod<AcceptBuyersProposalsRequest, AcceptBuyersProposalsResponse, AcceptBuyersProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptBuyersProposalsRequest,
  output: AcceptBuyersProposalsResponse,
  errors: [],
}));

/** Creates a note for this proposal and sends to the seller. This method is not supported for proposals with DealType set to 'PRIVATE_AUCTION'. */
export interface AddNoteBuyersProposalsRequest {
  /** Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}` */
  proposal: string;
  /** Request body */
  body?: AddNoteRequest;
}

export const AddNoteBuyersProposalsRequest = Schema.Struct({
  proposal: Schema.String.pipe(T.HttpPath("proposal")),
  body: Schema.optional(AddNoteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/proposals/{proposalsId}:addNote", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddNoteBuyersProposalsRequest>;

export type AddNoteBuyersProposalsResponse = Proposal;
export const AddNoteBuyersProposalsResponse = Proposal;

export type AddNoteBuyersProposalsError = CommonErrors;

export const addNoteBuyersProposals: API.OperationMethod<AddNoteBuyersProposalsRequest, AddNoteBuyersProposalsResponse, AddNoteBuyersProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddNoteBuyersProposalsRequest,
  output: AddNoteBuyersProposalsResponse,
  errors: [],
}));

/** Sends a request for proposal (RFP) to a publisher to initiate the negotiation regarding certain inventory. In the RFP, buyers can specify the deal type, deal terms, start and end dates, targeting, and a message to the publisher. Once the RFP is sent, a proposal in `SELLER_REVIEW_REQUESTED` state will be created and returned in the response. The publisher may review your request and respond with detailed deals in the proposal. */
export interface SendRfpBuyersProposalsRequest {
  /** Required. The current buyer who is sending the RFP in the format: `buyers/{accountId}`. */
  buyer: string;
  /** Request body */
  body?: SendRfpRequest;
}

export const SendRfpBuyersProposalsRequest = Schema.Struct({
  buyer: Schema.String.pipe(T.HttpPath("buyer")),
  body: Schema.optional(SendRfpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/proposals:sendRfp", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendRfpBuyersProposalsRequest>;

export type SendRfpBuyersProposalsResponse = Proposal;
export const SendRfpBuyersProposalsResponse = Proposal;

export type SendRfpBuyersProposalsError = CommonErrors;

export const sendRfpBuyersProposals: API.OperationMethod<SendRfpBuyersProposalsRequest, SendRfpBuyersProposalsResponse, SendRfpBuyersProposalsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendRfpBuyersProposalsRequest,
  output: SendRfpBuyersProposalsResponse,
  errors: [],
}));

/** Gets a deal given its name. The deal is returned at its head revision. */
export interface GetBuyersProposalsDealsRequest {
  /** Required. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId} */
  name: string;
}

export const GetBuyersProposalsDealsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/proposals/{proposalsId}/deals/{dealsId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersProposalsDealsRequest>;

export type GetBuyersProposalsDealsResponse = Deal;
export const GetBuyersProposalsDealsResponse = Deal;

export type GetBuyersProposalsDealsError = CommonErrors;

export const getBuyersProposalsDeals: API.OperationMethod<GetBuyersProposalsDealsRequest, GetBuyersProposalsDealsResponse, GetBuyersProposalsDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersProposalsDealsRequest,
  output: GetBuyersProposalsDealsResponse,
  errors: [],
}));

/** Updates the given deal at the buyer known revision number. If the server revision has advanced since the passed-in proposal.proposal_revision an ABORTED error message will be returned. The revision number is incremented by the server whenever the proposal or its constituent deals are updated. Note: The revision number is kept at a proposal level. The buyer of the API is expected to keep track of the revision number after the last update operation and send it in as part of the next update request. This way, if there are further changes on the server (for example, seller making new updates), then the server can detect conflicts and reject the proposed changes. */
export interface PatchBuyersProposalsDealsRequest {
  /** Immutable. The unique identifier of the deal. Auto-generated by the server when a deal is created. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId} */
  name: string;
  /** List of fields to be updated. If empty or unspecified, the service will update all fields populated in the update request excluding the output only fields and primitive fields with default value. Note that explicit field mask is required in order to reset a primitive field back to its default value, for example, false for boolean fields, 0 for integer fields. A special field mask consisting of a single path "*" can be used to indicate full replacement(the equivalent of PUT method), updatable fields unset or unspecified in the input will be cleared or set to default value. Output only fields will be ignored regardless of the value of updateMask. */
  updateMask?: string;
  /** Request body */
  body?: Deal;
}

export const PatchBuyersProposalsDealsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Deal).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/buyers/{buyersId}/proposals/{proposalsId}/deals/{dealsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBuyersProposalsDealsRequest>;

export type PatchBuyersProposalsDealsResponse = Deal;
export const PatchBuyersProposalsDealsResponse = Deal;

export type PatchBuyersProposalsDealsError = CommonErrors;

export const patchBuyersProposalsDeals: API.OperationMethod<PatchBuyersProposalsDealsRequest, PatchBuyersProposalsDealsResponse, PatchBuyersProposalsDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBuyersProposalsDealsRequest,
  output: PatchBuyersProposalsDealsResponse,
  errors: [],
}));

/** Batch updates multiple deals in the same proposal. */
export interface BatchUpdateBuyersProposalsDealsRequest {
  /** Required. The name of the proposal containing the deals to batch update. Format: buyers/{accountId}/proposals/{proposalId} */
  parent: string;
  /** Request body */
  body?: BatchUpdateDealsRequest;
}

export const BatchUpdateBuyersProposalsDealsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchUpdateDealsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/buyers/{buyersId}/proposals/{proposalsId}/deals:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateBuyersProposalsDealsRequest>;

export type BatchUpdateBuyersProposalsDealsResponse = BatchUpdateDealsResponse;
export const BatchUpdateBuyersProposalsDealsResponse = BatchUpdateDealsResponse;

export type BatchUpdateBuyersProposalsDealsError = CommonErrors;

export const batchUpdateBuyersProposalsDeals: API.OperationMethod<BatchUpdateBuyersProposalsDealsRequest, BatchUpdateBuyersProposalsDealsResponse, BatchUpdateBuyersProposalsDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateBuyersProposalsDealsRequest,
  output: BatchUpdateBuyersProposalsDealsResponse,
  errors: [],
}));

/** Lists all deals in a proposal. To retrieve only the finalized revision deals regardless if a deal is being renegotiated, see the FinalizedDeals resource. */
export interface ListBuyersProposalsDealsRequest {
  /** Required. The name of the proposal containing the deals to retrieve. Format: buyers/{accountId}/proposals/{proposalId} */
  parent: string;
  /** Requested page size. The server may return fewer results than requested. If requested more than 500, the server will return 500 results per page. If unspecified, the server will pick a default page size of 100. */
  pageSize?: number;
  /** The page token as returned from ListDealsResponse. */
  pageToken?: string;
}

export const ListBuyersProposalsDealsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/proposals/{proposalsId}/deals" }),
  svc,
) as unknown as Schema.Schema<ListBuyersProposalsDealsRequest>;

export type ListBuyersProposalsDealsResponse = ListDealsResponse;
export const ListBuyersProposalsDealsResponse = ListDealsResponse;

export type ListBuyersProposalsDealsError = CommonErrors;

export const listBuyersProposalsDeals = API.makePaginated(() => ({
  input: ListBuyersProposalsDealsRequest,
  output: ListBuyersProposalsDealsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the requested publisher profile by name. */
export interface GetBuyersPublisherProfilesRequest {
  /** Required. Name of the publisher profile. Format: `buyers/{buyerId}/publisherProfiles/{publisherProfileId}` */
  name: string;
}

export const GetBuyersPublisherProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/publisherProfiles/{publisherProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetBuyersPublisherProfilesRequest>;

export type GetBuyersPublisherProfilesResponse = PublisherProfile;
export const GetBuyersPublisherProfilesResponse = PublisherProfile;

export type GetBuyersPublisherProfilesError = CommonErrors;

export const getBuyersPublisherProfiles: API.OperationMethod<GetBuyersPublisherProfilesRequest, GetBuyersPublisherProfilesResponse, GetBuyersPublisherProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBuyersPublisherProfilesRequest,
  output: GetBuyersPublisherProfilesResponse,
  errors: [],
}));

/** Lists publisher profiles. The returned publisher profiles aren't in any defined order. The order of the results might change. A new publisher profile can appear in any place in the list of returned results. */
export interface ListBuyersPublisherProfilesRequest {
  /** Required. Parent that owns the collection of publisher profiles Format: `buyers/{buyerId}` */
  parent: string;
  /** Requested page size. The server may return fewer results than requested. If requested more than 500, the server will return 500 results per page. If unspecified, the server will pick a default page size of 100. */
  pageSize?: number;
  /** The page token as returned from a previous ListPublisherProfilesResponse. */
  pageToken?: string;
  /** Optional query string using the [Cloud API list filtering] (https://developers.google.com/authorized-buyers/apis/guides/list-filters) syntax. */
  filter?: string;
}

export const ListBuyersPublisherProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/buyers/{buyersId}/publisherProfiles" }),
  svc,
) as unknown as Schema.Schema<ListBuyersPublisherProfilesRequest>;

export type ListBuyersPublisherProfilesResponse = ListPublisherProfilesResponse;
export const ListBuyersPublisherProfilesResponse = ListPublisherProfilesResponse;

export type ListBuyersPublisherProfilesError = CommonErrors;

export const listBuyersPublisherProfiles = API.makePaginated(() => ({
  input: ListBuyersPublisherProfilesRequest,
  output: ListBuyersPublisherProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List the auction packages. Buyers can use the URL path "/v1/buyers/{accountId}/auctionPackages" to list auction packages for the current buyer and its clients. Bidders can use the URL path "/v1/bidders/{accountId}/auctionPackages" to list auction packages for the bidder, its media planners, its buyers, and all their clients. */
export interface ListBiddersAuctionPackagesRequest {
  /** Required. Name of the parent buyer that can access the auction package. Format: `buyers/{accountId}`. When used with a bidder account, the auction packages that the bidder, its media planners, its buyers and clients are subscribed to will be listed, in the format `bidders/{accountId}`. */
  parent: string;
  /** Requested page size. The server may return fewer results than requested. Max allowed page size is 500. */
  pageSize?: number;
  /** The page token as returned. ListAuctionPackagesResponse.nextPageToken */
  pageToken?: string;
  /** Optional. Optional query string using the [Cloud API list filtering syntax](/authorized-buyers/apis/guides/list-filters). Only supported when parent is bidder. Supported columns for filtering are: * displayName * createTime * updateTime * eligibleSeatIds */
  filter?: string;
  /** Optional. An optional query string to sort auction packages using the [Cloud API sorting syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order). If no sort order is specified, results will be returned in an arbitrary order. Only supported when parent is bidder. Supported columns for sorting are: * displayName * createTime * updateTime */
  orderBy?: string;
}

export const ListBiddersAuctionPackagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/auctionPackages" }),
  svc,
) as unknown as Schema.Schema<ListBiddersAuctionPackagesRequest>;

export type ListBiddersAuctionPackagesResponse = ListAuctionPackagesResponse;
export const ListBiddersAuctionPackagesResponse = ListAuctionPackagesResponse;

export type ListBiddersAuctionPackagesError = CommonErrors;

export const listBiddersAuctionPackages = API.makePaginated(() => ({
  input: ListBiddersAuctionPackagesRequest,
  output: ListBiddersAuctionPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists finalized deals. Use the URL path "/v1/buyers/{accountId}/finalizedDeals" to list finalized deals for the current buyer and its clients. Bidders can use the URL path "/v1/bidders/{accountId}/finalizedDeals" to list finalized deals for the bidder, its buyers and all their clients. */
export interface ListBiddersFinalizedDealsRequest {
  /** Required. The buyer to list the finalized deals for, in the format: `buyers/{accountId}`. When used to list finalized deals for a bidder, its buyers and clients, in the format `bidders/{accountId}`. */
  parent: string;
  /** Optional query string using the [Cloud API list filtering syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) Supported columns for filtering are: * deal.displayName * deal.dealType * deal.createTime * deal.updateTime * deal.flightStartTime * deal.flightEndTime * deal.eligibleSeatIds * dealServingStatus */
  filter?: string;
  /** An optional query string to sort finalized deals using the [Cloud API sorting syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order). If no sort order is specified, results will be returned in an arbitrary order. Supported columns for sorting are: * deal.displayName * deal.createTime * deal.updateTime * deal.flightStartTime * deal.flightEndTime * rtbMetrics.bidRequests7Days * rtbMetrics.bids7Days * rtbMetrics.adImpressions7Days * rtbMetrics.bidRate7Days * rtbMetrics.filteredBidRate7Days * rtbMetrics.mustBidRateCurrentMonth */
  orderBy?: string;
  /** Requested page size. The server may return fewer results than requested. If requested more than 500, the server will return 500 results per page. If unspecified, the server will pick a default page size of 100. */
  pageSize?: number;
  /** The page token as returned from ListFinalizedDealsResponse. */
  pageToken?: string;
}

export const ListBiddersFinalizedDealsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/bidders/{biddersId}/finalizedDeals" }),
  svc,
) as unknown as Schema.Schema<ListBiddersFinalizedDealsRequest>;

export type ListBiddersFinalizedDealsResponse = ListFinalizedDealsResponse;
export const ListBiddersFinalizedDealsResponse = ListFinalizedDealsResponse;

export type ListBiddersFinalizedDealsError = CommonErrors;

export const listBiddersFinalizedDeals = API.makePaginated(() => ({
  input: ListBiddersFinalizedDealsRequest,
  output: ListBiddersFinalizedDealsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the given finalized deal as ready to serve. By default, deals are set as ready to serve as soon as they're finalized. If you want to opt out of the default behavior, and manually indicate that deals are ready to serve, ask your Technical Account Manager to add you to the allowlist. If you choose to use this method, finalized deals belonging to the bidder and its child seats don't start serving until after you call `setReadyToServe`, and after the deals become active. For example, you can use this method to delay receiving bid requests until your creative is ready. In addition, bidders can use the URL path "/v1/bidders/{accountId}/finalizedDeals/{dealId}" to set ready to serve for the finalized deals belong to itself, its child seats and all their clients. This method only applies to programmatic guaranteed deals. */
export interface SetReadyToServeBiddersFinalizedDealsRequest {
  /** Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}` or `bidders/{accountId}/finalizedDeals/{dealId}` */
  deal: string;
  /** Request body */
  body?: SetReadyToServeRequest;
}

export const SetReadyToServeBiddersFinalizedDealsRequest = Schema.Struct({
  deal: Schema.String.pipe(T.HttpPath("deal")),
  body: Schema.optional(SetReadyToServeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/bidders/{biddersId}/finalizedDeals/{finalizedDealsId}:setReadyToServe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetReadyToServeBiddersFinalizedDealsRequest>;

export type SetReadyToServeBiddersFinalizedDealsResponse = FinalizedDeal;
export const SetReadyToServeBiddersFinalizedDealsResponse = FinalizedDeal;

export type SetReadyToServeBiddersFinalizedDealsError = CommonErrors;

export const setReadyToServeBiddersFinalizedDeals: API.OperationMethod<SetReadyToServeBiddersFinalizedDealsRequest, SetReadyToServeBiddersFinalizedDealsResponse, SetReadyToServeBiddersFinalizedDealsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetReadyToServeBiddersFinalizedDealsRequest,
  output: SetReadyToServeBiddersFinalizedDealsResponse,
  errors: [],
}));

