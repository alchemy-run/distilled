// ==========================================================================
// My Business Verifications API (mybusinessverifications v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "mybusinessverifications",
  version: "v1",
  rootUrl: "https://mybusinessverifications.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PostalAddress {
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. The name of the organization at the address. */
  organization?: string;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
}

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() =>
  Schema.Struct({
    locality: Schema.optional(Schema.String),
    organization: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    languageCode: Schema.optional(Schema.String),
    recipients: Schema.optional(Schema.Array(Schema.String)),
    postalCode: Schema.optional(Schema.String),
    sublocality: Schema.optional(Schema.String),
    addressLines: Schema.optional(Schema.Array(Schema.String)),
    revision: Schema.optional(Schema.Number),
    sortingCode: Schema.optional(Schema.String),
    administrativeArea: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "PostalAddress",
}) as any as Schema.Schema<PostalAddress>;

export interface ServiceBusinessContext {
  /** The verification address of the location. It is used to either enable more verification options or send a postcard. */
  address?: PostalAddress;
}

export const ServiceBusinessContext: Schema.Schema<ServiceBusinessContext> =
  Schema.suspend(() =>
    Schema.Struct({
      address: Schema.optional(PostalAddress),
    }),
  ).annotate({
    identifier: "ServiceBusinessContext",
  }) as any as Schema.Schema<ServiceBusinessContext>;

export interface VerificationToken {
  /** The token string. */
  tokenString?: string;
}

export const VerificationToken: Schema.Schema<VerificationToken> =
  Schema.suspend(() =>
    Schema.Struct({
      tokenString: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerificationToken",
  }) as any as Schema.Schema<VerificationToken>;

export interface VerifyLocationRequest {
  /** Optional. The input for ADDRESS method. Contact name the mail should be sent to. */
  mailerContact?: string;
  /** Optional. Extra context information for the verification of service businesses. It is only required for the locations whose business type is CUSTOMER_LOCATION_ONLY. For ADDRESS verification, the address will be used to send out postcard. For other methods, it should be the same as the one that is passed to GetVerificationOptions. INVALID_ARGUMENT will be thrown if it is set for other types of business locations. */
  context?: ServiceBusinessContext;
  /** Required. Verification method. */
  method?:
    | "VERIFICATION_METHOD_UNSPECIFIED"
    | "ADDRESS"
    | "EMAIL"
    | "PHONE_CALL"
    | "SMS"
    | "AUTO"
    | "VETTED_PARTNER"
    | "TRUSTED_PARTNER"
    | (string & {});
  /** Optional. The BCP 47 language code representing the language that is to be used for the verification process. */
  languageCode?: string;
  /** The input for TRUSTED_PARTNER method The verification token that is associated to the location. */
  trustedPartnerToken?: string;
  /** Optional. The input for VETTED_PARTNER method available to select [partners.](https://support.google.com/business/answer/7674102) The input is not needed for a vetted account. Token that is associated to the location. Token that is associated to the location. */
  token?: VerificationToken;
  /** Optional. The input for EMAIL method. Email address where the PIN should be sent to. An email address is accepted only if it is one of the addresses provided by FetchVerificationOptions. If the EmailVerificationData has is_user_name_editable set to true, the client may specify a different user name (local-part) but must match the domain name. */
  emailAddress?: string;
  /** Optional. The input for PHONE_CALL/SMS method The phone number that should be called or be sent SMS to. It must be one of the phone numbers in the eligible options. */
  phoneNumber?: string;
}

export const VerifyLocationRequest: Schema.Schema<VerifyLocationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      mailerContact: Schema.optional(Schema.String),
      context: Schema.optional(ServiceBusinessContext),
      method: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      trustedPartnerToken: Schema.optional(Schema.String),
      token: Schema.optional(VerificationToken),
      emailAddress: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerifyLocationRequest",
  }) as any as Schema.Schema<VerifyLocationRequest>;

export interface LocationData {
  /** Immutable. Name should reflect your business's real-world name, as used consistently on your storefront, website, and stationery, and as known to customers. Any additional information, when relevant, can be included in other fields of the resource (for example, `Address`, `Categories`). Don't add unnecessary information to your name (for example, prefer "Google" over "Google Inc. - Mountain View Corporate Headquarters"). Don't include marketing taglines, store codes, special characters, hours or closed/open status, phone numbers, website URLs, service/product information, location/address or directions, or containment information (for example, "Chase ATM in Duane Reade"). */
  name?: string;
  /** Immutable. A precise, accurate address to describe your business location. PO boxes or mailboxes located at remote locations are not acceptable. At this time, you can specify a maximum of five `address_lines` values in the address. */
  address?: PostalAddress;
}

export const LocationData: Schema.Schema<LocationData> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    address: Schema.optional(PostalAddress),
  }),
).annotate({
  identifier: "LocationData",
}) as any as Schema.Schema<LocationData>;

export interface GenerateInstantVerificationTokenRequest {
  /** The location identifier associated with an unverified listing. This is the location id generated at the time that the listing was originally created. It is the final portion of a location resource name as generated by the Google My Business API. Note: the caller must be an owner or manager of this listing in order to generate a verification token. See the [location resource](/my-business/reference/rest/v4/accounts.locations) documentation for more information. */
  locationId?: string;
  /** Immutable. The address and other details of the location to generate an instant verification token for. */
  locationData?: LocationData;
}

export const GenerateInstantVerificationTokenRequest: Schema.Schema<GenerateInstantVerificationTokenRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      locationId: Schema.optional(Schema.String),
      locationData: Schema.optional(LocationData),
    }),
  ).annotate({
    identifier: "GenerateInstantVerificationTokenRequest",
  }) as any as Schema.Schema<GenerateInstantVerificationTokenRequest>;

export interface EmailVerificationData {
  /** Domain name in the email address. e.g. "gmail.com" in foo@gmail.com */
  domain?: string;
  /** User name in the email address. e.g. "foo" in foo@gmail.com */
  user?: string;
  /** Whether client is allowed to provide a different user name. */
  isUserNameEditable?: boolean;
}

export const EmailVerificationData: Schema.Schema<EmailVerificationData> =
  Schema.suspend(() =>
    Schema.Struct({
      domain: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
      isUserNameEditable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "EmailVerificationData",
  }) as any as Schema.Schema<EmailVerificationData>;

export interface AddressVerificationData {
  /** Merchant's business name. */
  business?: string;
  /** Expected number of days it takes to deliver a postcard to the address's region. */
  expectedDeliveryDaysRegion?: number;
  /** Address that a postcard can be sent to. */
  address?: PostalAddress;
}

export const AddressVerificationData: Schema.Schema<AddressVerificationData> =
  Schema.suspend(() =>
    Schema.Struct({
      business: Schema.optional(Schema.String),
      expectedDeliveryDaysRegion: Schema.optional(Schema.Number),
      address: Schema.optional(PostalAddress),
    }),
  ).annotate({
    identifier: "AddressVerificationData",
  }) as any as Schema.Schema<AddressVerificationData>;

export interface VerificationOption {
  /** Set only if the method is VETTED_PARTNER. */
  announcement?: string;
  /** Set only if the method is EMAIL. */
  emailData?: EmailVerificationData;
  /** Set only if the method is PHONE_CALL or SMS. Phone number that the PIN will be sent to. */
  phoneNumber?: string;
  /** Set only if the method is MAIL. */
  addressData?: AddressVerificationData;
  /** Method to verify the location. */
  verificationMethod?:
    | "VERIFICATION_METHOD_UNSPECIFIED"
    | "ADDRESS"
    | "EMAIL"
    | "PHONE_CALL"
    | "SMS"
    | "AUTO"
    | "VETTED_PARTNER"
    | "TRUSTED_PARTNER"
    | (string & {});
}

export const VerificationOption: Schema.Schema<VerificationOption> =
  Schema.suspend(() =>
    Schema.Struct({
      announcement: Schema.optional(Schema.String),
      emailData: Schema.optional(EmailVerificationData),
      phoneNumber: Schema.optional(Schema.String),
      addressData: Schema.optional(AddressVerificationData),
      verificationMethod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VerificationOption",
  }) as any as Schema.Schema<VerificationOption>;

export interface ComplyWithGuidelines {
  /** The reason why the location is being recommended to comply with guidelines. */
  recommendationReason?:
    | "RECOMMENDATION_REASON_UNSPECIFIED"
    | "BUSINESS_LOCATION_SUSPENDED"
    | "BUSINESS_LOCATION_DISABLED"
    | (string & {});
}

export const ComplyWithGuidelines: Schema.Schema<ComplyWithGuidelines> =
  Schema.suspend(() =>
    Schema.Struct({
      recommendationReason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComplyWithGuidelines",
  }) as any as Schema.Schema<ComplyWithGuidelines>;

export interface Verification {
  /** The timestamp when the verification is requested. */
  createTime?: string;
  /** Resource name of the verification. */
  name?: string;
  /** Optional. Response announcement set only if the method is VETTED_PARTNER. */
  announcement?: string;
  /** The method of the verification. */
  method?:
    | "VERIFICATION_METHOD_UNSPECIFIED"
    | "ADDRESS"
    | "EMAIL"
    | "PHONE_CALL"
    | "SMS"
    | "AUTO"
    | "VETTED_PARTNER"
    | "TRUSTED_PARTNER"
    | (string & {});
  /** The state of the verification. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | (string & {});
}

export const Verification: Schema.Schema<Verification> = Schema.suspend(() =>
  Schema.Struct({
    createTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    announcement: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Verification",
}) as any as Schema.Schema<Verification>;

export interface VerifyLocationResponse {
  /** The created verification request. */
  verification?: Verification;
}

export const VerifyLocationResponse: Schema.Schema<VerifyLocationResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      verification: Schema.optional(Verification),
    }),
  ).annotate({
    identifier: "VerifyLocationResponse",
  }) as any as Schema.Schema<VerifyLocationResponse>;

export interface FetchVerificationOptionsResponse {
  /** The available verification options. */
  options?: Array<VerificationOption>;
}

export const FetchVerificationOptionsResponse: Schema.Schema<FetchVerificationOptionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(Schema.Array(VerificationOption)),
    }),
  ).annotate({
    identifier: "FetchVerificationOptionsResponse",
  }) as any as Schema.Schema<FetchVerificationOptionsResponse>;

export interface ResolveOwnershipConflict {}

export const ResolveOwnershipConflict: Schema.Schema<ResolveOwnershipConflict> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ResolveOwnershipConflict",
  }) as any as Schema.Schema<ResolveOwnershipConflict>;

export interface Verify {
  /** Indicates whether a verification process has already started, and can be completed by the location. */
  hasPendingVerification?: boolean;
}

export const Verify: Schema.Schema<Verify> = Schema.suspend(() =>
  Schema.Struct({
    hasPendingVerification: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Verify" }) as any as Schema.Schema<Verify>;

export interface WaitForVoiceOfMerchant {}

export const WaitForVoiceOfMerchant: Schema.Schema<WaitForVoiceOfMerchant> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "WaitForVoiceOfMerchant",
  }) as any as Schema.Schema<WaitForVoiceOfMerchant>;

export interface VoiceOfMerchantState {
  /** Indicates whether the location has the authority (ownership) over the business on Google. If true, another location cannot take over and become the dominant listing on Maps. However, edits will not become live unless Voice of Merchant is gained (i.e. has_voice_of_merchant is true). */
  hasBusinessAuthority?: boolean;
  /** This location duplicates another location that is in good standing. If you have access to the location in good standing, use that location's id to perform operations. Otherwise, request access from the current owner. */
  resolveOwnershipConflict?: ResolveOwnershipConflict;
  /** Indicates whether the location is in good standing and has control over the business on Google. Any edits made to the location will propagate to Maps after passing the review phase. */
  hasVoiceOfMerchant?: boolean;
  /** Start or continue the verification process. */
  verify?: Verify;
  /** Wait to gain Voice of Merchant. The location is under review for quality purposes. */
  waitForVoiceOfMerchant?: WaitForVoiceOfMerchant;
  /** The location fails to comply with our [guidelines](https://support.google.com/business/answer/3038177) and requires additional steps for reinstatement. To fix this issue, consult the [Help Center Article](https://support.google.com/business/answer/4569145). */
  complyWithGuidelines?: ComplyWithGuidelines;
}

export const VoiceOfMerchantState: Schema.Schema<VoiceOfMerchantState> =
  Schema.suspend(() =>
    Schema.Struct({
      hasBusinessAuthority: Schema.optional(Schema.Boolean),
      resolveOwnershipConflict: Schema.optional(ResolveOwnershipConflict),
      hasVoiceOfMerchant: Schema.optional(Schema.Boolean),
      verify: Schema.optional(Verify),
      waitForVoiceOfMerchant: Schema.optional(WaitForVoiceOfMerchant),
      complyWithGuidelines: Schema.optional(ComplyWithGuidelines),
    }),
  ).annotate({
    identifier: "VoiceOfMerchantState",
  }) as any as Schema.Schema<VoiceOfMerchantState>;

export interface CompleteVerificationResponse {
  /** The completed verification. */
  verification?: Verification;
}

export const CompleteVerificationResponse: Schema.Schema<CompleteVerificationResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      verification: Schema.optional(Verification),
    }),
  ).annotate({
    identifier: "CompleteVerificationResponse",
  }) as any as Schema.Schema<CompleteVerificationResponse>;

export interface GenerateInstantVerificationTokenResponse {
  /** Output only. The result of the instant verification token generation. */
  result?: "RESULT_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** The generated instant verification token. */
  instantVerificationToken?: string;
}

export const GenerateInstantVerificationTokenResponse: Schema.Schema<GenerateInstantVerificationTokenResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(Schema.String),
      instantVerificationToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateInstantVerificationTokenResponse",
  }) as any as Schema.Schema<GenerateInstantVerificationTokenResponse>;

export interface FetchVerificationOptionsRequest {
  /** Required. The BCP 47 language code representing the language that is to be used for the verification process. Available options vary by language. */
  languageCode?: string;
  /** Optional. Extra context information for the verification of service businesses. Can only be applied to the locations whose business type is CUSTOMER_LOCATION_ONLY. Specifying an accurate address could enable more options. INVALID_ARGUMENT will be thrown if it is set for other business types of locations. */
  context?: ServiceBusinessContext;
}

export const FetchVerificationOptionsRequest: Schema.Schema<FetchVerificationOptionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      languageCode: Schema.optional(Schema.String),
      context: Schema.optional(ServiceBusinessContext),
    }),
  ).annotate({
    identifier: "FetchVerificationOptionsRequest",
  }) as any as Schema.Schema<FetchVerificationOptionsRequest>;

export interface CompleteVerificationRequest {
  /** Required. PIN code received by the merchant to complete the verification. */
  pin?: string;
}

export const CompleteVerificationRequest: Schema.Schema<CompleteVerificationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      pin: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompleteVerificationRequest",
  }) as any as Schema.Schema<CompleteVerificationRequest>;

export interface ListVerificationsResponse {
  /** List of the verifications. */
  verifications?: Array<Verification>;
  /** If the number of verifications exceeded the requested page size, this field will be populated with a token to fetch the next page of verification on a subsequent call. If there are no more attributes, this field will not be present in the response. */
  nextPageToken?: string;
}

export const ListVerificationsResponse: Schema.Schema<ListVerificationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      verifications: Schema.optional(Schema.Array(Verification)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListVerificationsResponse",
  }) as any as Schema.Schema<ListVerificationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface VerifyLocationsRequest {
  /** Required. Resource name of the location to verify. */
  name: string;
  /** Request body */
  body?: VerifyLocationRequest;
}

export const VerifyLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(VerifyLocationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}:verify",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<VerifyLocationsRequest>;

export type VerifyLocationsResponse = VerifyLocationResponse;
export const VerifyLocationsResponse = VerifyLocationResponse;

export type VerifyLocationsError = DefaultErrors;

/** Starts the verification process for a location. */
export const verifyLocations: API.OperationMethod<
  VerifyLocationsRequest,
  VerifyLocationsResponse,
  VerifyLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: VerifyLocationsRequest,
  output: VerifyLocationsResponse,
  errors: [],
}));

export interface FetchVerificationOptionsLocationsRequest {
  /** Required. The location to verify. */
  location: string;
  /** Request body */
  body?: FetchVerificationOptionsRequest;
}

export const FetchVerificationOptionsLocationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(FetchVerificationOptionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}:fetchVerificationOptions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<FetchVerificationOptionsLocationsRequest>;

export type FetchVerificationOptionsLocationsResponse =
  FetchVerificationOptionsResponse;
export const FetchVerificationOptionsLocationsResponse =
  FetchVerificationOptionsResponse;

export type FetchVerificationOptionsLocationsError = DefaultErrors;

/** Reports all eligible verification options for a location in a specific language. */
export const fetchVerificationOptionsLocations: API.OperationMethod<
  FetchVerificationOptionsLocationsRequest,
  FetchVerificationOptionsLocationsResponse,
  FetchVerificationOptionsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: FetchVerificationOptionsLocationsRequest,
  output: FetchVerificationOptionsLocationsResponse,
  errors: [],
}));

export interface GetVoiceOfMerchantStateLocationsRequest {
  /** Required. Resource name of the location. */
  name: string;
}

export const GetVoiceOfMerchantStateLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/VoiceOfMerchantState",
  }),
  svc,
) as unknown as Schema.Schema<GetVoiceOfMerchantStateLocationsRequest>;

export type GetVoiceOfMerchantStateLocationsResponse = VoiceOfMerchantState;
export const GetVoiceOfMerchantStateLocationsResponse = VoiceOfMerchantState;

export type GetVoiceOfMerchantStateLocationsError = DefaultErrors;

/** Gets the VoiceOfMerchant state. */
export const getVoiceOfMerchantStateLocations: API.OperationMethod<
  GetVoiceOfMerchantStateLocationsRequest,
  GetVoiceOfMerchantStateLocationsResponse,
  GetVoiceOfMerchantStateLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVoiceOfMerchantStateLocationsRequest,
  output: GetVoiceOfMerchantStateLocationsResponse,
  errors: [],
}));

export interface CompleteLocationsVerificationsRequest {
  /** Required. Resource name of the verification to complete. */
  name: string;
  /** Request body */
  body?: CompleteVerificationRequest;
}

export const CompleteLocationsVerificationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CompleteVerificationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/verifications/{verificationsId}:complete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CompleteLocationsVerificationsRequest>;

export type CompleteLocationsVerificationsResponse =
  CompleteVerificationResponse;
export const CompleteLocationsVerificationsResponse =
  CompleteVerificationResponse;

export type CompleteLocationsVerificationsError = DefaultErrors;

/** Completes a `PENDING` verification. It is only necessary for non `AUTO` verification methods. `AUTO` verification request is instantly `VERIFIED` upon creation. */
export const completeLocationsVerifications: API.OperationMethod<
  CompleteLocationsVerificationsRequest,
  CompleteLocationsVerificationsResponse,
  CompleteLocationsVerificationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CompleteLocationsVerificationsRequest,
  output: CompleteLocationsVerificationsResponse,
  errors: [],
}));

export interface ListLocationsVerificationsRequest {
  /** How many verification to include per page. Minimum is 1, and the default and maximum page size is 100. */
  pageSize?: number;
  /** If specified, returns the next page of verifications. */
  pageToken?: string;
  /** Required. Resource name of the location that verification requests belong to. */
  parent: string;
}

export const ListLocationsVerificationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/verifications" }),
  svc,
) as unknown as Schema.Schema<ListLocationsVerificationsRequest>;

export type ListLocationsVerificationsResponse = ListVerificationsResponse;
export const ListLocationsVerificationsResponse = ListVerificationsResponse;

export type ListLocationsVerificationsError = DefaultErrors;

/** List verifications of a location, ordered by create time. */
export const listLocationsVerifications: API.PaginatedOperationMethod<
  ListLocationsVerificationsRequest,
  ListLocationsVerificationsResponse,
  ListLocationsVerificationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsVerificationsRequest,
  output: ListLocationsVerificationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GenerateVerificationTokensRequest {
  /** Request body */
  body?: GenerateInstantVerificationTokenRequest;
}

export const GenerateVerificationTokensRequest = Schema.Struct({
  body: Schema.optional(GenerateInstantVerificationTokenRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/verificationTokens:generate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GenerateVerificationTokensRequest>;

export type GenerateVerificationTokensResponse =
  GenerateInstantVerificationTokenResponse;
export const GenerateVerificationTokensResponse =
  GenerateInstantVerificationTokenResponse;

export type GenerateVerificationTokensError = DefaultErrors;

/** Generate a token for the provided location data to verify the location. */
export const generateVerificationTokens: API.OperationMethod<
  GenerateVerificationTokensRequest,
  GenerateVerificationTokensResponse,
  GenerateVerificationTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateVerificationTokensRequest,
  output: GenerateVerificationTokensResponse,
  errors: [],
}));
