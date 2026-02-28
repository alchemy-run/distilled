// ==========================================================================
// Android Device Provisioning Partner API (androiddeviceprovisioning v1)
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
  name: "androiddeviceprovisioning",
  version: "v1",
  rootUrl: "https://androiddeviceprovisioning.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** This field will contain a `DevicesLongRunningOperationMetadata` object if the operation is created by `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** This field will always be not set if the operation is created by `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`. In this case, error information for each device is set in `response.perDeviceStatus.result.status`. */
  error?: Status;
  /** This field will contain a `DevicesLongRunningOperationResponse` object if the operation is created by `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface GoogleWorkspaceAccount {
  /** Required. The customer ID. */
  customerId?: string;
  /** Output only. The pre-provisioning tokens previously used to claim devices. */
  preProvisioningTokens?: Array<string>;
}

export const GoogleWorkspaceAccount: Schema.Schema<GoogleWorkspaceAccount> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
  preProvisioningTokens: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleWorkspaceAccount" }) as any as Schema.Schema<GoogleWorkspaceAccount>;

export interface Company {
  /** Output only. The API resource name of the company. The resource name is one of the following formats: * `partners/[PARTNER_ID]/customers/[CUSTOMER_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]/customers/[CUSTOMER_ID]` Assigned by the server. */
  name?: string;
  /** Output only. The ID of the company. Assigned by the server. */
  companyId?: string;
  /** Required. The name of the company. For example _XYZ Corp_. Displayed to the company's employees in the zero-touch enrollment portal. */
  companyName?: string;
  /** Required. Input only. Email address of customer's users in the owner role. At least one `owner_email` is required. Owners share the same access as admins but can also add, delete, and edit your organization's portal users. */
  ownerEmails?: Array<string>;
  /** Optional. Email address of customer's users in the admin role. Each email address must be associated with a Google Account. */
  adminEmails?: Array<string>;
  /** Output only. Whether any user from the company has accepted the latest Terms of Service (ToS). See TermsStatus. */
  termsStatus?: "TERMS_STATUS_UNSPECIFIED" | "TERMS_STATUS_NOT_ACCEPTED" | "TERMS_STATUS_ACCEPTED" | "TERMS_STATUS_STALE" | (string & {});
  /** Input only. If set to true, welcome email will not be sent to the customer. It is recommended to skip the welcome email if devices will be claimed with additional DEVICE_PROTECTION service, as the customer will receive separate emails at device claim time. This field is ignored if this is not a Zero-touch customer. */
  skipWelcomeEmail?: boolean;
  /** Input only. The preferred locale of the customer represented as a BCP47 language code. This field is validated on input and requests containing unsupported language codes will be rejected. Supported language codes: Arabic (ar) Chinese (Hong Kong) (zh-HK) Chinese (Simplified) (zh-CN) Chinese (Traditional) (zh-TW) Czech (cs) Danish (da) Dutch (nl) English (UK) (en-GB) English (US) (en-US) Filipino (fil) Finnish (fi) French (fr) German (de) Hebrew (iw) Hindi (hi) Hungarian (hu) Indonesian (id) Italian (it) Japanese (ja) Korean (ko) Norwegian (Bokmal) (no) Polish (pl) Portuguese (Brazil) (pt-BR) Portuguese (Portugal) (pt-PT) Russian (ru) Spanish (es) Spanish (Latin America) (es-419) Swedish (sv) Thai (th) Turkish (tr) Ukrainian (uk) Vietnamese (vi) */
  languageCode?: string;
  /** Output only. The Google Workspace account associated with this customer. Only used for customer Companies. */
  googleWorkspaceAccount?: GoogleWorkspaceAccount;
}

export const Company: Schema.Schema<Company> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  companyId: Schema.optional(Schema.String),
  companyName: Schema.optional(Schema.String),
  ownerEmails: Schema.optional(Schema.Array(Schema.String)),
  adminEmails: Schema.optional(Schema.Array(Schema.String)),
  termsStatus: Schema.optional(Schema.String),
  skipWelcomeEmail: Schema.optional(Schema.Boolean),
  languageCode: Schema.optional(Schema.String),
  googleWorkspaceAccount: Schema.optional(GoogleWorkspaceAccount),
})).annotate({ identifier: "Company" }) as any as Schema.Schema<Company>;

export interface ListVendorsResponse {
  /** List of vendors of the reseller partner. Fields `name`, `companyId` and `companyName` are populated to the Company object. */
  vendors?: Array<Company>;
  /** A token to retrieve the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
  /** The total count of items in the list irrespective of pagination. */
  totalSize?: number;
}

export const ListVendorsResponse: Schema.Schema<ListVendorsResponse> = Schema.suspend(() => Schema.Struct({
  vendors: Schema.optional(Schema.Array(Company)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListVendorsResponse" }) as any as Schema.Schema<ListVendorsResponse>;

export interface ListVendorCustomersResponse {
  /** List of customers of the vendor. */
  customers?: Array<Company>;
  /** A token to retrieve the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
  /** The total count of items in the list irrespective of pagination. */
  totalSize?: number;
}

export const ListVendorCustomersResponse: Schema.Schema<ListVendorCustomersResponse> = Schema.suspend(() => Schema.Struct({
  customers: Schema.optional(Schema.Array(Company)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListVendorCustomersResponse" }) as any as Schema.Schema<ListVendorCustomersResponse>;

export interface CreateCustomerRequest {
  /** Required. The company data to populate the new customer. Must contain a value for `companyName` and at least one `owner_email` that's associated with a Google Account. The values for `companyId` and `name` must be empty. */
  customer?: Company;
}

export const CreateCustomerRequest: Schema.Schema<CreateCustomerRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Company),
})).annotate({ identifier: "CreateCustomerRequest" }) as any as Schema.Schema<CreateCustomerRequest>;

export interface ListCustomersResponse {
  /** List of customers related to this reseller partner. */
  customers?: Array<Company>;
  /** A token to retrieve the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
  /** The total count of items in the list irrespective of pagination. */
  totalSize?: number;
}

export const ListCustomersResponse: Schema.Schema<ListCustomersResponse> = Schema.suspend(() => Schema.Struct({
  customers: Schema.optional(Schema.Array(Company)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListCustomersResponse" }) as any as Schema.Schema<ListCustomersResponse>;

export interface DeviceIdentifier {
  /** The device’s IMEI number. Validated on input. */
  imei?: string;
  /** The device’s MEID number. */
  meid?: string;
  /** The device’s second IMEI number. */
  imei2?: string;
  /** The device’s second MEID number. */
  meid2?: string;
  /** The manufacturer's serial number for the device. This value might not be unique across different device models. */
  serialNumber?: string;
  /** The device manufacturer’s name. Matches the device's built-in value returned from `android.os.Build.MANUFACTURER`. Allowed values are listed in [Android manufacturers](/zero-touch/resources/manufacturer-names#manufacturers-names). */
  manufacturer?: string;
  /** The device model's name. Allowed values are listed in [Android models](/zero-touch/resources/manufacturer-names#model-names) and [Chrome OS models](https://support.google.com/chrome/a/answer/10130175#identify_compatible). */
  model?: string;
  /** The type of the device */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "DEVICE_TYPE_ANDROID" | "DEVICE_TYPE_CHROME_OS" | (string & {});
  /** An identifier provided by OEMs, carried through the production and sales process. Only applicable to Chrome OS devices. */
  chromeOsAttestedDeviceId?: string;
}

export const DeviceIdentifier: Schema.Schema<DeviceIdentifier> = Schema.suspend(() => Schema.Struct({
  imei: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  imei2: Schema.optional(Schema.String),
  meid2: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  chromeOsAttestedDeviceId: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceIdentifier" }) as any as Schema.Schema<DeviceIdentifier>;

export interface DeviceMetadata {
  /** Metadata entries recorded as key-value pairs. */
  entries?: Record<string, string>;
}

export const DeviceMetadata: Schema.Schema<DeviceMetadata> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "DeviceMetadata" }) as any as Schema.Schema<DeviceMetadata>;

export interface ClaimDeviceRequest {
  /** Required. Required. The device identifier of the device to claim. */
  deviceIdentifier?: DeviceIdentifier;
  /** Required. The section type of the device's provisioning record. */
  sectionType?: "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH" | (string & {});
  /** The ID of the customer for whom the device is being claimed. */
  customerId?: string;
  /** The Google Workspace customer ID. */
  googleWorkspaceCustomerId?: string;
  /** Optional. The metadata to attach to the device. */
  deviceMetadata?: DeviceMetadata;
  /** Optional. Must and can only be set for Chrome OS devices. */
  preProvisioningToken?: string;
  /** Optional. Must and can only be set when DeviceProvisioningSectionType is SECTION_TYPE_SIM_LOCK. The unique identifier of the SimLock profile. */
  simlockProfileId?: string;
  /** Optional. The ID of the configuration applied to the device section. */
  configurationId?: string;
}

export const ClaimDeviceRequest: Schema.Schema<ClaimDeviceRequest> = Schema.suspend(() => Schema.Struct({
  deviceIdentifier: Schema.optional(DeviceIdentifier),
  sectionType: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  googleWorkspaceCustomerId: Schema.optional(Schema.String),
  deviceMetadata: Schema.optional(DeviceMetadata),
  preProvisioningToken: Schema.optional(Schema.String),
  simlockProfileId: Schema.optional(Schema.String),
  configurationId: Schema.optional(Schema.String),
})).annotate({ identifier: "ClaimDeviceRequest" }) as any as Schema.Schema<ClaimDeviceRequest>;

export interface ClaimDeviceResponse {
  /** The device ID of the claimed device. */
  deviceId?: string;
  /** The resource name of the device in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`. */
  deviceName?: string;
}

export const ClaimDeviceResponse: Schema.Schema<ClaimDeviceResponse> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  deviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "ClaimDeviceResponse" }) as any as Schema.Schema<ClaimDeviceResponse>;

export interface UnclaimDeviceRequest {
  /** Required. The device ID returned by `ClaimDevice`. */
  deviceId?: string;
  /** Required. The device identifier you used when you claimed this device. */
  deviceIdentifier?: DeviceIdentifier;
  /** Required. The section type of the device's provisioning record. */
  sectionType?: "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH" | (string & {});
  /** The duration of the vacation unlock starting from when the request is processed. (1 day is treated as 24 hours) */
  vacationModeDays?: number;
  /** The expiration time of the vacation unlock. */
  vacationModeExpireTime?: string;
}

export const UnclaimDeviceRequest: Schema.Schema<UnclaimDeviceRequest> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  deviceIdentifier: Schema.optional(DeviceIdentifier),
  sectionType: Schema.optional(Schema.String),
  vacationModeDays: Schema.optional(Schema.Number),
  vacationModeExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UnclaimDeviceRequest" }) as any as Schema.Schema<UnclaimDeviceRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface FindDevicesByDeviceIdentifierRequest {
  /** A token specifying which result page to return. */
  pageToken?: string;
  /** Required. The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive. */
  limit?: string;
  /** Required. Required. The device identifier to search for. If serial number is provided then case insensitive serial number matches are allowed. */
  deviceIdentifier?: DeviceIdentifier;
}

export const FindDevicesByDeviceIdentifierRequest: Schema.Schema<FindDevicesByDeviceIdentifierRequest> = Schema.suspend(() => Schema.Struct({
  pageToken: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
  deviceIdentifier: Schema.optional(DeviceIdentifier),
})).annotate({ identifier: "FindDevicesByDeviceIdentifierRequest" }) as any as Schema.Schema<FindDevicesByDeviceIdentifierRequest>;

export interface DeviceClaim {
  /** Output only. The type of claim made on the device. */
  sectionType?: "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH" | (string & {});
  /** The ID of the Customer that purchased the device. */
  ownerCompanyId?: string;
  /** The ID of the Google Workspace account that owns the Chrome OS device. */
  googleWorkspaceCustomerId?: string;
  /** The ID of the reseller that claimed the device. */
  resellerId?: string;
  /** The timestamp when the device was put into ‘vacation mode’. This value is present iff the device is in 'vacation mode'. */
  vacationModeStartTime?: string;
  /** The timestamp when the device will exit ‘vacation mode’. This value is present iff the device is in 'vacation mode'. */
  vacationModeExpireTime?: string;
  /** The Additional service registered for the device. */
  additionalService?: "ADDITIONAL_SERVICE_UNSPECIFIED" | "DEVICE_PROTECTION" | (string & {});
}

export const DeviceClaim: Schema.Schema<DeviceClaim> = Schema.suspend(() => Schema.Struct({
  sectionType: Schema.optional(Schema.String),
  ownerCompanyId: Schema.optional(Schema.String),
  googleWorkspaceCustomerId: Schema.optional(Schema.String),
  resellerId: Schema.optional(Schema.String),
  vacationModeStartTime: Schema.optional(Schema.String),
  vacationModeExpireTime: Schema.optional(Schema.String),
  additionalService: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceClaim" }) as any as Schema.Schema<DeviceClaim>;

export interface Device {
  /** Output only. The ID of the device. Assigned by the server. */
  deviceId?: string;
  /** The hardware IDs that identify a manufactured device. To learn more, read [Identifiers](https://developers.google.com/zero-touch/guides/identifiers). */
  deviceIdentifier?: DeviceIdentifier;
  /** Output only. The API resource name in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`. Assigned by the server. */
  name?: string;
  /** The metadata attached to the device. Structured as key-value pairs. To learn more, read [Device metadata](https://developers.google.com/zero-touch/guides/metadata). */
  deviceMetadata?: DeviceMetadata;
  /** Output only. The provisioning claims for a device. Devices claimed for zero-touch enrollment have a claim with the type `SECTION_TYPE_ZERO_TOUCH`. Call `partners.devices.unclaim` or `partners.devices.unclaimAsync` to remove the device from zero-touch enrollment. */
  claims?: Array<DeviceClaim>;
  /** Not available to resellers. */
  configuration?: string;
}

export const Device: Schema.Schema<Device> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  deviceIdentifier: Schema.optional(DeviceIdentifier),
  name: Schema.optional(Schema.String),
  deviceMetadata: Schema.optional(DeviceMetadata),
  claims: Schema.optional(Schema.Array(DeviceClaim)),
  configuration: Schema.optional(Schema.String),
})).annotate({ identifier: "Device" }) as any as Schema.Schema<Device>;

export interface FindDevicesByDeviceIdentifierResponse {
  /** Found devices. */
  devices?: Array<Device>;
  /** A token used to access the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
  /** The total count of items in the list irrespective of pagination. */
  totalSize?: number;
}

export const FindDevicesByDeviceIdentifierResponse: Schema.Schema<FindDevicesByDeviceIdentifierResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(Device)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "FindDevicesByDeviceIdentifierResponse" }) as any as Schema.Schema<FindDevicesByDeviceIdentifierResponse>;

export interface FindDevicesByOwnerRequest {
  /** A token specifying which result page to return. */
  pageToken?: string;
  /** Required. The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive. */
  limit?: string;
  /** Required. The section type of the device's provisioning record. */
  sectionType?: "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH" | (string & {});
  /** The list of customer IDs to search for. */
  customerId?: Array<string>;
  /** The list of IDs of Google Workspace accounts to search for. */
  googleWorkspaceCustomerId?: Array<string>;
}

export const FindDevicesByOwnerRequest: Schema.Schema<FindDevicesByOwnerRequest> = Schema.suspend(() => Schema.Struct({
  pageToken: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.String),
  sectionType: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.Array(Schema.String)),
  googleWorkspaceCustomerId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "FindDevicesByOwnerRequest" }) as any as Schema.Schema<FindDevicesByOwnerRequest>;

export interface FindDevicesByOwnerResponse {
  /** The customer's devices. */
  devices?: Array<Device>;
  /** A token used to access the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
  /** The total count of items in the list irrespective of pagination. */
  totalSize?: number;
}

export const FindDevicesByOwnerResponse: Schema.Schema<FindDevicesByOwnerResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(Device)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "FindDevicesByOwnerResponse" }) as any as Schema.Schema<FindDevicesByOwnerResponse>;

export interface GetDeviceSimLockStateRequest {
  /** Required. Required. The device identifier to search for. */
  deviceIdentifier?: DeviceIdentifier;
}

export const GetDeviceSimLockStateRequest: Schema.Schema<GetDeviceSimLockStateRequest> = Schema.suspend(() => Schema.Struct({
  deviceIdentifier: Schema.optional(DeviceIdentifier),
})).annotate({ identifier: "GetDeviceSimLockStateRequest" }) as any as Schema.Schema<GetDeviceSimLockStateRequest>;

export interface GetDeviceSimLockStateResponse {
  simLockState?: "SIM_LOCK_STATE_UNSPECIFIED" | "UNLOCKED" | "LOCKED_TO_PARTNER" | "LOCKED_TO_OTHER_PARTNER" | (string & {});
}

export const GetDeviceSimLockStateResponse: Schema.Schema<GetDeviceSimLockStateResponse> = Schema.suspend(() => Schema.Struct({
  simLockState: Schema.optional(Schema.String),
})).annotate({ identifier: "GetDeviceSimLockStateResponse" }) as any as Schema.Schema<GetDeviceSimLockStateResponse>;

export interface UpdateDeviceMetadataRequest {
  /** Required. The metadata to attach to the device. */
  deviceMetadata?: DeviceMetadata;
}

export const UpdateDeviceMetadataRequest: Schema.Schema<UpdateDeviceMetadataRequest> = Schema.suspend(() => Schema.Struct({
  deviceMetadata: Schema.optional(DeviceMetadata),
})).annotate({ identifier: "UpdateDeviceMetadataRequest" }) as any as Schema.Schema<UpdateDeviceMetadataRequest>;

export interface PartnerClaim {
  /** Required. Required. Device identifier of the device. */
  deviceIdentifier?: DeviceIdentifier;
  /** Required. The section type of the device's provisioning record. */
  sectionType?: "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH" | (string & {});
  /** The ID of the customer for whom the device is being claimed. */
  customerId?: string;
  /** The Google Workspace customer ID. */
  googleWorkspaceCustomerId?: string;
  /** Required. The metadata to attach to the device at claim. */
  deviceMetadata?: DeviceMetadata;
  /** Optional. Must and can only be set for Chrome OS devices. */
  preProvisioningToken?: string;
  /** Optional. Must and can only be set when DeviceProvisioningSectionType is SECTION_TYPE_SIM_LOCK. The unique identifier of the SimLock profile. */
  simlockProfileId?: string;
  /** Optional. The ID of the configuration applied to the device section. */
  configurationId?: string;
}

export const PartnerClaim: Schema.Schema<PartnerClaim> = Schema.suspend(() => Schema.Struct({
  deviceIdentifier: Schema.optional(DeviceIdentifier),
  sectionType: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  googleWorkspaceCustomerId: Schema.optional(Schema.String),
  deviceMetadata: Schema.optional(DeviceMetadata),
  preProvisioningToken: Schema.optional(Schema.String),
  simlockProfileId: Schema.optional(Schema.String),
  configurationId: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerClaim" }) as any as Schema.Schema<PartnerClaim>;

export interface ClaimDevicesRequest {
  /** Required. A list of device claims. */
  claims?: Array<PartnerClaim>;
}

export const ClaimDevicesRequest: Schema.Schema<ClaimDevicesRequest> = Schema.suspend(() => Schema.Struct({
  claims: Schema.optional(Schema.Array(PartnerClaim)),
})).annotate({ identifier: "ClaimDevicesRequest" }) as any as Schema.Schema<ClaimDevicesRequest>;

export interface PartnerUnclaim {
  /** Required. Device identifier of the device. */
  deviceIdentifier?: DeviceIdentifier;
  /** Required. Device ID of the device. */
  deviceId?: string;
  /** Required. The section type of the device's provisioning record. */
  sectionType?: "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH" | (string & {});
  /** Optional. The duration of the vacation unlock starting from when the request is processed. (1 day is treated as 24 hours) */
  vacationModeDays?: number;
  /** Optional. The expiration time of the vacation unlock. */
  vacationModeExpireTime?: string;
}

export const PartnerUnclaim: Schema.Schema<PartnerUnclaim> = Schema.suspend(() => Schema.Struct({
  deviceIdentifier: Schema.optional(DeviceIdentifier),
  deviceId: Schema.optional(Schema.String),
  sectionType: Schema.optional(Schema.String),
  vacationModeDays: Schema.optional(Schema.Number),
  vacationModeExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PartnerUnclaim" }) as any as Schema.Schema<PartnerUnclaim>;

export interface UnclaimDevicesRequest {
  /** Required. The list of devices to unclaim. */
  unclaims?: Array<PartnerUnclaim>;
}

export const UnclaimDevicesRequest: Schema.Schema<UnclaimDevicesRequest> = Schema.suspend(() => Schema.Struct({
  unclaims: Schema.optional(Schema.Array(PartnerUnclaim)),
})).annotate({ identifier: "UnclaimDevicesRequest" }) as any as Schema.Schema<UnclaimDevicesRequest>;

export interface UpdateMetadataArguments {
  /** Required. Device identifier. */
  deviceIdentifier?: DeviceIdentifier;
  /** Required. Device ID of the device. */
  deviceId?: string;
  /** Required. The metadata to update. */
  deviceMetadata?: DeviceMetadata;
}

export const UpdateMetadataArguments: Schema.Schema<UpdateMetadataArguments> = Schema.suspend(() => Schema.Struct({
  deviceIdentifier: Schema.optional(DeviceIdentifier),
  deviceId: Schema.optional(Schema.String),
  deviceMetadata: Schema.optional(DeviceMetadata),
})).annotate({ identifier: "UpdateMetadataArguments" }) as any as Schema.Schema<UpdateMetadataArguments>;

export interface UpdateDeviceMetadataInBatchRequest {
  /** Required. The list of metadata updates. */
  updates?: Array<UpdateMetadataArguments>;
}

export const UpdateDeviceMetadataInBatchRequest: Schema.Schema<UpdateDeviceMetadataInBatchRequest> = Schema.suspend(() => Schema.Struct({
  updates: Schema.optional(Schema.Array(UpdateMetadataArguments)),
})).annotate({ identifier: "UpdateDeviceMetadataInBatchRequest" }) as any as Schema.Schema<UpdateDeviceMetadataInBatchRequest>;

export interface CustomerListCustomersResponse {
  /** The customer accounts the calling user is a member of. */
  customers?: Array<Company>;
  /** A token used to access the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
}

export const CustomerListCustomersResponse: Schema.Schema<CustomerListCustomersResponse> = Schema.suspend(() => Schema.Struct({
  customers: Schema.optional(Schema.Array(Company)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerListCustomersResponse" }) as any as Schema.Schema<CustomerListCustomersResponse>;

export interface Configuration {
  /** Output only. The API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by the server. */
  name?: string;
  /** Output only. The ID of the configuration. Assigned by the server. */
  configurationId?: string;
  /** Required. A short name that describes the configuration's purpose. For example, _Sales team_ or _Temporary employees_. The zero-touch enrollment portal displays this name to IT admins. */
  configurationName?: string;
  /** Required. The resource name of the selected DPC (device policy controller) in the format `customers/[CUSTOMER_ID]/dpcs/*`. To list the supported DPCs, call `customers.dpcs.list`. */
  dpcResourcePath?: string;
  /** The JSON-formatted EMM provisioning extras that are passed to the DPC. */
  dpcExtras?: string;
  /** Required. The name of the organization. Zero-touch enrollment shows this organization name to device users during device provisioning. */
  companyName?: string;
  /** Required. The email address that device users can contact to get help. Zero-touch enrollment shows this email address to device users before device provisioning. The value is validated on input. */
  contactEmail?: string;
  /** Required. The telephone number that device users can call, using another device, to get help. Zero-touch enrollment shows this number to device users before device provisioning. Accepts numerals, spaces, the plus sign, hyphens, and parentheses. */
  contactPhone?: string;
  /** A message, containing one or two sentences, to help device users get help or give them more details about what’s happening to their device. Zero-touch enrollment shows this message before the device is provisioned. */
  customMessage?: string;
  /** Required. Whether this is the default configuration that zero-touch enrollment applies to any new devices the organization purchases in the future. Only one customer configuration can be the default. Setting this value to `true`, changes the previous default configuration's `isDefault` value to `false`. */
  isDefault?: boolean;
  /** Optional. The timeout before forcing factory reset the device if the device doesn't go through provisioning in the setup wizard, usually due to lack of network connectivity during setup wizard. Ranges from 0-6 hours, with 2 hours being the default if unset. */
  forcedResetTime?: string;
}

export const Configuration: Schema.Schema<Configuration> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  configurationId: Schema.optional(Schema.String),
  configurationName: Schema.optional(Schema.String),
  dpcResourcePath: Schema.optional(Schema.String),
  dpcExtras: Schema.optional(Schema.String),
  companyName: Schema.optional(Schema.String),
  contactEmail: Schema.optional(Schema.String),
  contactPhone: Schema.optional(Schema.String),
  customMessage: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
  forcedResetTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Configuration" }) as any as Schema.Schema<Configuration>;

export interface CustomerListConfigurationsResponse {
  /** The configurations. */
  configurations?: Array<Configuration>;
}

export const CustomerListConfigurationsResponse: Schema.Schema<CustomerListConfigurationsResponse> = Schema.suspend(() => Schema.Struct({
  configurations: Schema.optional(Schema.Array(Configuration)),
})).annotate({ identifier: "CustomerListConfigurationsResponse" }) as any as Schema.Schema<CustomerListConfigurationsResponse>;

export interface Dpc {
  /** Output only. The API resource name in the format `customers/[CUSTOMER_ID]/dpcs/[DPC_ID]`. Assigned by the server. To maintain a reference to a DPC across customer accounts, persist and match the last path component (`DPC_ID`). */
  name?: string;
  /** Output only. The DPC's Android application ID that looks like a Java package name. Zero-touch enrollment installs the DPC app onto a device using this identifier. */
  packageName?: string;
  /** Output only. The title of the DPC app in Google Play. For example, _Google Apps Device Policy_. Useful in an application's user interface. */
  dpcName?: string;
}

export const Dpc: Schema.Schema<Dpc> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  dpcName: Schema.optional(Schema.String),
})).annotate({ identifier: "Dpc" }) as any as Schema.Schema<Dpc>;

export interface CustomerListDpcsResponse {
  /** The list of DPCs available to the customer that support zero-touch enrollment. */
  dpcs?: Array<Dpc>;
}

export const CustomerListDpcsResponse: Schema.Schema<CustomerListDpcsResponse> = Schema.suspend(() => Schema.Struct({
  dpcs: Schema.optional(Schema.Array(Dpc)),
})).annotate({ identifier: "CustomerListDpcsResponse" }) as any as Schema.Schema<CustomerListDpcsResponse>;

export interface CustomerListDevicesResponse {
  /** The customer's devices. */
  devices?: Array<Device>;
  /** A token used to access the next page of results. Omitted if no further results are available. */
  nextPageToken?: string;
}

export const CustomerListDevicesResponse: Schema.Schema<CustomerListDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(Device)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerListDevicesResponse" }) as any as Schema.Schema<CustomerListDevicesResponse>;

export interface DeviceReference {
  /** The ID of the device. */
  deviceId?: string;
  /** The hardware IDs of the device. */
  deviceIdentifier?: DeviceIdentifier;
}

export const DeviceReference: Schema.Schema<DeviceReference> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  deviceIdentifier: Schema.optional(DeviceIdentifier),
})).annotate({ identifier: "DeviceReference" }) as any as Schema.Schema<DeviceReference>;

export interface CustomerUnclaimDeviceRequest {
  /** Required. The device to unclaim. There are custom validations in UnclaimDeviceRequestValidator. */
  device?: DeviceReference;
}

export const CustomerUnclaimDeviceRequest: Schema.Schema<CustomerUnclaimDeviceRequest> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(DeviceReference),
})).annotate({ identifier: "CustomerUnclaimDeviceRequest" }) as any as Schema.Schema<CustomerUnclaimDeviceRequest>;

export interface CustomerApplyConfigurationRequest {
  /** Required. The device the configuration is applied to. There are custom validations in ApplyConfigurationRequestValidator */
  device?: DeviceReference;
  /** Required. The configuration applied to the device in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. */
  configuration?: string;
}

export const CustomerApplyConfigurationRequest: Schema.Schema<CustomerApplyConfigurationRequest> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(DeviceReference),
  configuration: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerApplyConfigurationRequest" }) as any as Schema.Schema<CustomerApplyConfigurationRequest>;

export interface CustomerRemoveConfigurationRequest {
  /** Required. The device to remove the configuration from. There are custom validations in RemoveConfigurationRequestValidator */
  device?: DeviceReference;
}

export const CustomerRemoveConfigurationRequest: Schema.Schema<CustomerRemoveConfigurationRequest> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(DeviceReference),
})).annotate({ identifier: "CustomerRemoveConfigurationRequest" }) as any as Schema.Schema<CustomerRemoveConfigurationRequest>;

export interface DevicesLongRunningOperationMetadata {
  /** The processing status of the operation. */
  processingStatus?: "BATCH_PROCESS_STATUS_UNSPECIFIED" | "BATCH_PROCESS_PENDING" | "BATCH_PROCESS_IN_PROGRESS" | "BATCH_PROCESS_PROCESSED" | (string & {});
  /** The processing progress of the operation. Measured as a number from 0 to 100. A value of 10O doesn't always mean the operation completed—check for the inclusion of a `done` field. */
  progress?: number;
  /** The number of metadata updates in the operation. This might be different from the number of updates in the request if the API can't parse some of the updates. */
  devicesCount?: number;
}

export const DevicesLongRunningOperationMetadata: Schema.Schema<DevicesLongRunningOperationMetadata> = Schema.suspend(() => Schema.Struct({
  processingStatus: Schema.optional(Schema.String),
  progress: Schema.optional(Schema.Number),
  devicesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "DevicesLongRunningOperationMetadata" }) as any as Schema.Schema<DevicesLongRunningOperationMetadata>;

export interface PerDeviceStatusInBatch {
  /** The result status of the device after processing. */
  status?: "SINGLE_DEVICE_STATUS_UNSPECIFIED" | "SINGLE_DEVICE_STATUS_UNKNOWN_ERROR" | "SINGLE_DEVICE_STATUS_OTHER_ERROR" | "SINGLE_DEVICE_STATUS_SUCCESS" | "SINGLE_DEVICE_STATUS_PERMISSION_DENIED" | "SINGLE_DEVICE_STATUS_INVALID_DEVICE_IDENTIFIER" | "SINGLE_DEVICE_STATUS_INVALID_SECTION_TYPE" | "SINGLE_DEVICE_STATUS_SECTION_NOT_YOURS" | "SINGLE_DEVICE_STATUS_INVALID_TOKEN" | "SINGLE_DEVICE_STATUS_REVOKED_TOKEN" | "SINGLE_DEVICE_STATUS_DEVICE_LIMIT_EXCEEDED" | (string & {});
  /** If processing succeeds, the device ID of the device. */
  deviceId?: string;
  /** If processing fails, a developer message explaining what went wrong. */
  errorMessage?: string;
  /** If processing fails, the error type. */
  errorIdentifier?: string;
}

export const PerDeviceStatusInBatch: Schema.Schema<PerDeviceStatusInBatch> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  errorIdentifier: Schema.optional(Schema.String),
})).annotate({ identifier: "PerDeviceStatusInBatch" }) as any as Schema.Schema<PerDeviceStatusInBatch>;

export interface OperationPerDevice {
  /** A copy of the original device-claim request received by the server. */
  claim?: PartnerClaim;
  /** A copy of the original device-unclaim request received by the server. */
  unclaim?: PartnerUnclaim;
  /** A copy of the original metadata-update request received by the server. */
  updateMetadata?: UpdateMetadataArguments;
  /** The processing result for each device. */
  result?: PerDeviceStatusInBatch;
}

export const OperationPerDevice: Schema.Schema<OperationPerDevice> = Schema.suspend(() => Schema.Struct({
  claim: Schema.optional(PartnerClaim),
  unclaim: Schema.optional(PartnerUnclaim),
  updateMetadata: Schema.optional(UpdateMetadataArguments),
  result: Schema.optional(PerDeviceStatusInBatch),
})).annotate({ identifier: "OperationPerDevice" }) as any as Schema.Schema<OperationPerDevice>;

export interface DevicesLongRunningOperationResponse {
  /** A summary of how many items in the operation the server processed successfully. Updated as the operation progresses. */
  successCount?: number;
  /** The processing status for each device in the operation. One `PerDeviceStatus` per device. The list order matches the items in the original request. */
  perDeviceStatus?: Array<OperationPerDevice>;
}

export const DevicesLongRunningOperationResponse: Schema.Schema<DevicesLongRunningOperationResponse> = Schema.suspend(() => Schema.Struct({
  successCount: Schema.optional(Schema.Number),
  perDeviceStatus: Schema.optional(Schema.Array(OperationPerDevice)),
})).annotate({ identifier: "DevicesLongRunningOperationResponse" }) as any as Schema.Schema<DevicesLongRunningOperationResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Lists the vendors of the partner. */
export interface ListPartnersVendorsRequest {
  /** Required. The resource name in the format `partners/[PARTNER_ID]`. */
  parent: string;
  /** The maximum number of results to be returned. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListPartnersVendorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/partners/{partnersId}/vendors" }),
  svc,
) as unknown as Schema.Schema<ListPartnersVendorsRequest>;

export type ListPartnersVendorsResponse = ListVendorsResponse;
export const ListPartnersVendorsResponse = ListVendorsResponse;

export type ListPartnersVendorsError = CommonErrors;

export const listPartnersVendors = API.makePaginated(() => ({
  input: ListPartnersVendorsRequest,
  output: ListPartnersVendorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the customers of the vendor. */
export interface ListPartnersVendorsCustomersRequest {
  /** Required. The resource name in the format `partners/[PARTNER_ID]/vendors/[VENDOR_ID]`. */
  parent: string;
  /** The maximum number of results to be returned. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListPartnersVendorsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/partners/{partnersId}/vendors/{vendorsId}/customers" }),
  svc,
) as unknown as Schema.Schema<ListPartnersVendorsCustomersRequest>;

export type ListPartnersVendorsCustomersResponse = ListVendorCustomersResponse;
export const ListPartnersVendorsCustomersResponse = ListVendorCustomersResponse;

export type ListPartnersVendorsCustomersError = CommonErrors;

export const listPartnersVendorsCustomers = API.makePaginated(() => ({
  input: ListPartnersVendorsCustomersRequest,
  output: ListPartnersVendorsCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a customer for zero-touch enrollment. After the method returns successfully, admin and owner roles can manage devices and EMM configs by calling API methods or using their zero-touch enrollment portal. The customer receives an email that welcomes them to zero-touch enrollment and explains how to sign into the portal. */
export interface CreatePartnersCustomersRequest {
  /** Required. The parent resource ID in the format `partners/[PARTNER_ID]` that identifies the reseller. */
  parent: string;
  /** Request body */
  body?: CreateCustomerRequest;
}

export const CreatePartnersCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateCustomerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/customers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePartnersCustomersRequest>;

export type CreatePartnersCustomersResponse = Company;
export const CreatePartnersCustomersResponse = Company;

export type CreatePartnersCustomersError = CommonErrors;

export const createPartnersCustomers: API.OperationMethod<CreatePartnersCustomersRequest, CreatePartnersCustomersResponse, CreatePartnersCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePartnersCustomersRequest,
  output: CreatePartnersCustomersResponse,
  errors: [],
}));

/** Lists the customers that are enrolled to the reseller identified by the `partnerId` argument. This list includes customers that the reseller created and customers that enrolled themselves using the portal. */
export interface ListPartnersCustomersRequest {
  /** Required. The ID of the reseller partner. */
  partnerId: string;
  /** The maximum number of results to be returned. If not specified or 0, all the records are returned. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListPartnersCustomersRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/partners/{partnersId}/customers" }),
  svc,
) as unknown as Schema.Schema<ListPartnersCustomersRequest>;

export type ListPartnersCustomersResponse = ListCustomersResponse;
export const ListPartnersCustomersResponse = ListCustomersResponse;

export type ListPartnersCustomersError = CommonErrors;

export const listPartnersCustomers = API.makePaginated(() => ({
  input: ListPartnersCustomersRequest,
  output: ListPartnersCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Claims a device for a customer and adds it to zero-touch enrollment. If the device is already claimed by another customer, the call returns an error. */
export interface ClaimPartnersDevicesRequest {
  /** Required. The ID of the reseller partner. */
  partnerId: string;
  /** Request body */
  body?: ClaimDeviceRequest;
}

export const ClaimPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(ClaimDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:claim", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClaimPartnersDevicesRequest>;

export type ClaimPartnersDevicesResponse = ClaimDeviceResponse;
export const ClaimPartnersDevicesResponse = ClaimDeviceResponse;

export type ClaimPartnersDevicesError = CommonErrors;

export const claimPartnersDevices: API.OperationMethod<ClaimPartnersDevicesRequest, ClaimPartnersDevicesResponse, ClaimPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClaimPartnersDevicesRequest,
  output: ClaimPartnersDevicesResponse,
  errors: [],
}));

/** Unclaims a device from a customer and removes it from zero-touch enrollment. */
export interface UnclaimPartnersDevicesRequest {
  /** Required. The ID of the reseller partner. */
  partnerId: string;
  /** Request body */
  body?: UnclaimDeviceRequest;
}

export const UnclaimPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(UnclaimDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:unclaim", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnclaimPartnersDevicesRequest>;

export type UnclaimPartnersDevicesResponse = Empty;
export const UnclaimPartnersDevicesResponse = Empty;

export type UnclaimPartnersDevicesError = CommonErrors;

export const unclaimPartnersDevices: API.OperationMethod<UnclaimPartnersDevicesRequest, UnclaimPartnersDevicesResponse, UnclaimPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnclaimPartnersDevicesRequest,
  output: UnclaimPartnersDevicesResponse,
  errors: [],
}));

/** Finds devices by hardware identifiers, such as IMEI. */
export interface FindByIdentifierPartnersDevicesRequest {
  /** Required. The ID of the reseller partner. */
  partnerId: string;
  /** Request body */
  body?: FindDevicesByDeviceIdentifierRequest;
}

export const FindByIdentifierPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(FindDevicesByDeviceIdentifierRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:findByIdentifier", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FindByIdentifierPartnersDevicesRequest>;

export type FindByIdentifierPartnersDevicesResponse = FindDevicesByDeviceIdentifierResponse;
export const FindByIdentifierPartnersDevicesResponse = FindDevicesByDeviceIdentifierResponse;

export type FindByIdentifierPartnersDevicesError = CommonErrors;

export const findByIdentifierPartnersDevices: API.OperationMethod<FindByIdentifierPartnersDevicesRequest, FindByIdentifierPartnersDevicesResponse, FindByIdentifierPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FindByIdentifierPartnersDevicesRequest,
  output: FindByIdentifierPartnersDevicesResponse,
  errors: [],
}));

/** Finds devices claimed for customers. The results only contain devices registered to the reseller that's identified by the `partnerId` argument. The customer's devices purchased from other resellers don't appear in the results. */
export interface FindByOwnerPartnersDevicesRequest {
  /** Required. The ID of the reseller partner. */
  partnerId: string;
  /** Request body */
  body?: FindDevicesByOwnerRequest;
}

export const FindByOwnerPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(FindDevicesByOwnerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:findByOwner", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FindByOwnerPartnersDevicesRequest>;

export type FindByOwnerPartnersDevicesResponse = FindDevicesByOwnerResponse;
export const FindByOwnerPartnersDevicesResponse = FindDevicesByOwnerResponse;

export type FindByOwnerPartnersDevicesError = CommonErrors;

export const findByOwnerPartnersDevices: API.OperationMethod<FindByOwnerPartnersDevicesRequest, FindByOwnerPartnersDevicesResponse, FindByOwnerPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FindByOwnerPartnersDevicesRequest,
  output: FindByOwnerPartnersDevicesResponse,
  errors: [],
}));

/** Gets a device. */
export interface GetPartnersDevicesRequest {
  /** Required. The device API resource name in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`. */
  name: string;
}

export const GetPartnersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/partners/{partnersId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetPartnersDevicesRequest>;

export type GetPartnersDevicesResponse = Device;
export const GetPartnersDevicesResponse = Device;

export type GetPartnersDevicesError = CommonErrors;

export const getPartnersDevices: API.OperationMethod<GetPartnersDevicesRequest, GetPartnersDevicesResponse, GetPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartnersDevicesRequest,
  output: GetPartnersDevicesResponse,
  errors: [],
}));

/** Gets a device's SIM lock state. */
export interface GetSimLockStatePartnersDevicesRequest {
  /** Required. The ID of the partner. */
  partnerId: string;
  /** Request body */
  body?: GetDeviceSimLockStateRequest;
}

export const GetSimLockStatePartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(GetDeviceSimLockStateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:getSimLockState", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetSimLockStatePartnersDevicesRequest>;

export type GetSimLockStatePartnersDevicesResponse = GetDeviceSimLockStateResponse;
export const GetSimLockStatePartnersDevicesResponse = GetDeviceSimLockStateResponse;

export type GetSimLockStatePartnersDevicesError = CommonErrors;

export const getSimLockStatePartnersDevices: API.OperationMethod<GetSimLockStatePartnersDevicesRequest, GetSimLockStatePartnersDevicesResponse, GetSimLockStatePartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSimLockStatePartnersDevicesRequest,
  output: GetSimLockStatePartnersDevicesResponse,
  errors: [],
}));

/** Updates reseller metadata associated with the device. Android devices only. */
export interface MetadataPartnersDevicesRequest {
  /** Required. The owner of the newly set metadata. Set this to the partner ID. */
  metadataOwnerId: string;
  /** Required. The ID of the device. */
  deviceId: string;
  /** Request body */
  body?: UpdateDeviceMetadataRequest;
}

export const MetadataPartnersDevicesRequest = Schema.Struct({
  metadataOwnerId: Schema.String.pipe(T.HttpPath("metadataOwnerId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  body: Schema.optional(UpdateDeviceMetadataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices/{devicesId}/metadata", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MetadataPartnersDevicesRequest>;

export type MetadataPartnersDevicesResponse = DeviceMetadata;
export const MetadataPartnersDevicesResponse = DeviceMetadata;

export type MetadataPartnersDevicesError = CommonErrors;

export const metadataPartnersDevices: API.OperationMethod<MetadataPartnersDevicesRequest, MetadataPartnersDevicesResponse, MetadataPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MetadataPartnersDevicesRequest,
  output: MetadataPartnersDevicesResponse,
  errors: [],
}));

/** Claims a batch of devices for a customer asynchronously. Adds the devices to zero-touch enrollment. To learn more, read [Long‑running batch operations](/zero-touch/guides/how-it-works#operations). */
export interface ClaimAsyncPartnersDevicesRequest {
  /** Required. The ID of the reseller partner. */
  partnerId: string;
  /** Request body */
  body?: ClaimDevicesRequest;
}

export const ClaimAsyncPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(ClaimDevicesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:claimAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClaimAsyncPartnersDevicesRequest>;

export type ClaimAsyncPartnersDevicesResponse = Operation;
export const ClaimAsyncPartnersDevicesResponse = Operation;

export type ClaimAsyncPartnersDevicesError = CommonErrors;

export const claimAsyncPartnersDevices: API.OperationMethod<ClaimAsyncPartnersDevicesRequest, ClaimAsyncPartnersDevicesResponse, ClaimAsyncPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClaimAsyncPartnersDevicesRequest,
  output: ClaimAsyncPartnersDevicesResponse,
  errors: [],
}));

/** Unclaims a batch of devices for a customer asynchronously. Removes the devices from zero-touch enrollment. To learn more, read [Long‑running batch operations](/zero-touch/guides/how-it-works#operations). */
export interface UnclaimAsyncPartnersDevicesRequest {
  /** Required. The reseller partner ID. */
  partnerId: string;
  /** Request body */
  body?: UnclaimDevicesRequest;
}

export const UnclaimAsyncPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(UnclaimDevicesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:unclaimAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnclaimAsyncPartnersDevicesRequest>;

export type UnclaimAsyncPartnersDevicesResponse = Operation;
export const UnclaimAsyncPartnersDevicesResponse = Operation;

export type UnclaimAsyncPartnersDevicesError = CommonErrors;

export const unclaimAsyncPartnersDevices: API.OperationMethod<UnclaimAsyncPartnersDevicesRequest, UnclaimAsyncPartnersDevicesResponse, UnclaimAsyncPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnclaimAsyncPartnersDevicesRequest,
  output: UnclaimAsyncPartnersDevicesResponse,
  errors: [],
}));

/** Updates the reseller metadata attached to a batch of devices. This method updates devices asynchronously and returns an `Operation` that can be used to track progress. Read [Long‑running batch operations](/zero-touch/guides/how-it-works#operations). Android Devices only. */
export interface UpdateMetadataAsyncPartnersDevicesRequest {
  /** Required. The reseller partner ID. */
  partnerId: string;
  /** Request body */
  body?: UpdateDeviceMetadataInBatchRequest;
}

export const UpdateMetadataAsyncPartnersDevicesRequest = Schema.Struct({
  partnerId: Schema.String.pipe(T.HttpPath("partnerId")),
  body: Schema.optional(UpdateDeviceMetadataInBatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/partners/{partnersId}/devices:updateMetadataAsync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateMetadataAsyncPartnersDevicesRequest>;

export type UpdateMetadataAsyncPartnersDevicesResponse = Operation;
export const UpdateMetadataAsyncPartnersDevicesResponse = Operation;

export type UpdateMetadataAsyncPartnersDevicesError = CommonErrors;

export const updateMetadataAsyncPartnersDevices: API.OperationMethod<UpdateMetadataAsyncPartnersDevicesRequest, UpdateMetadataAsyncPartnersDevicesResponse, UpdateMetadataAsyncPartnersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateMetadataAsyncPartnersDevicesRequest,
  output: UpdateMetadataAsyncPartnersDevicesResponse,
  errors: [],
}));

/** Lists the user's customer accounts. */
export interface ListCustomersRequest {
  /** Required. The maximum number of customers to show in a page of results. A number between 1 and 100 (inclusive). */
  pageSize?: number;
  /** A token specifying which result page to return. This field has custom validations in ListCustomersRequestValidator */
  pageToken?: string;
}

export const ListCustomersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers" }),
  svc,
) as unknown as Schema.Schema<ListCustomersRequest>;

export type ListCustomersResponse_Op = CustomerListCustomersResponse;
export const ListCustomersResponse_Op = CustomerListCustomersResponse;

export type ListCustomersError = CommonErrors;

export const listCustomers = API.makePaginated(() => ({
  input: ListCustomersRequest,
  output: ListCustomersResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new configuration. Once created, a customer can apply the configuration to devices. */
export interface CreateCustomersConfigurationsRequest {
  /** Required. The customer that manages the configuration. An API resource name in the format `customers/[CUSTOMER_ID]`. This field has custom validation in CreateConfigurationRequestValidator */
  parent: string;
  /** Request body */
  body?: Configuration;
}

export const CreateCustomersConfigurationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Configuration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/configurations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersConfigurationsRequest>;

export type CreateCustomersConfigurationsResponse = Configuration;
export const CreateCustomersConfigurationsResponse = Configuration;

export type CreateCustomersConfigurationsError = CommonErrors;

export const createCustomersConfigurations: API.OperationMethod<CreateCustomersConfigurationsRequest, CreateCustomersConfigurationsResponse, CreateCustomersConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersConfigurationsRequest,
  output: CreateCustomersConfigurationsResponse,
  errors: [],
}));

/** Gets the details of a configuration. */
export interface GetCustomersConfigurationsRequest {
  /** Required. The configuration to get. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. */
  name: string;
}

export const GetCustomersConfigurationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/configurations/{configurationsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersConfigurationsRequest>;

export type GetCustomersConfigurationsResponse = Configuration;
export const GetCustomersConfigurationsResponse = Configuration;

export type GetCustomersConfigurationsError = CommonErrors;

export const getCustomersConfigurations: API.OperationMethod<GetCustomersConfigurationsRequest, GetCustomersConfigurationsResponse, GetCustomersConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersConfigurationsRequest,
  output: GetCustomersConfigurationsResponse,
  errors: [],
}));

/** Updates a configuration's field values. */
export interface PatchCustomersConfigurationsRequest {
  /** Output only. The API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by the server. */
  name: string;
  /** Required. The field mask applied to the target `Configuration` before updating the fields. To learn more about using field masks, read [FieldMask](/protocol-buffers/docs/reference/google.protobuf#fieldmask) in the Protocol Buffers documentation. */
  updateMask?: string;
  /** Request body */
  body?: Configuration;
}

export const PatchCustomersConfigurationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Configuration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/customers/{customersId}/configurations/{configurationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersConfigurationsRequest>;

export type PatchCustomersConfigurationsResponse = Configuration;
export const PatchCustomersConfigurationsResponse = Configuration;

export type PatchCustomersConfigurationsError = CommonErrors;

export const patchCustomersConfigurations: API.OperationMethod<PatchCustomersConfigurationsRequest, PatchCustomersConfigurationsResponse, PatchCustomersConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersConfigurationsRequest,
  output: PatchCustomersConfigurationsResponse,
  errors: [],
}));

/** Deletes an unused configuration. The API call fails if the customer has devices with the configuration applied. */
export interface DeleteCustomersConfigurationsRequest {
  /** Required. The configuration to delete. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. If the configuration is applied to any devices, the API call fails. */
  name: string;
}

export const DeleteCustomersConfigurationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/customers/{customersId}/configurations/{configurationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersConfigurationsRequest>;

export type DeleteCustomersConfigurationsResponse = Empty;
export const DeleteCustomersConfigurationsResponse = Empty;

export type DeleteCustomersConfigurationsError = CommonErrors;

export const deleteCustomersConfigurations: API.OperationMethod<DeleteCustomersConfigurationsRequest, DeleteCustomersConfigurationsResponse, DeleteCustomersConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersConfigurationsRequest,
  output: DeleteCustomersConfigurationsResponse,
  errors: [],
}));

/** Lists a customer's configurations. */
export interface ListCustomersConfigurationsRequest {
  /** Required. The customer that manages the listed configurations. An API resource name in the format `customers/[CUSTOMER_ID]`. */
  parent: string;
}

export const ListCustomersConfigurationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/configurations" }),
  svc,
) as unknown as Schema.Schema<ListCustomersConfigurationsRequest>;

export type ListCustomersConfigurationsResponse = CustomerListConfigurationsResponse;
export const ListCustomersConfigurationsResponse = CustomerListConfigurationsResponse;

export type ListCustomersConfigurationsError = CommonErrors;

export const listCustomersConfigurations: API.OperationMethod<ListCustomersConfigurationsRequest, ListCustomersConfigurationsResponse, ListCustomersConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCustomersConfigurationsRequest,
  output: ListCustomersConfigurationsResponse,
  errors: [],
}));

/** Lists the DPCs (device policy controllers) that support zero-touch enrollment. */
export interface ListCustomersDpcsRequest {
  /** Required. The customer that can use the DPCs in configurations. An API resource name in the format `customers/[CUSTOMER_ID]`. */
  parent: string;
}

export const ListCustomersDpcsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/dpcs" }),
  svc,
) as unknown as Schema.Schema<ListCustomersDpcsRequest>;

export type ListCustomersDpcsResponse = CustomerListDpcsResponse;
export const ListCustomersDpcsResponse = CustomerListDpcsResponse;

export type ListCustomersDpcsError = CommonErrors;

export const listCustomersDpcs: API.OperationMethod<ListCustomersDpcsRequest, ListCustomersDpcsResponse, ListCustomersDpcsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCustomersDpcsRequest,
  output: ListCustomersDpcsResponse,
  errors: [],
}));

/** Lists a customer's devices. */
export interface ListCustomersDevicesRequest {
  /** Required. The customer managing the devices. An API resource name in the format `customers/[CUSTOMER_ID]`. */
  parent: string;
  /** Required. The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive. */
  pageSize?: string;
  /** A token specifying which result page to return. */
  pageToken?: string;
}

export const ListCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.String).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListCustomersDevicesRequest>;

export type ListCustomersDevicesResponse = CustomerListDevicesResponse;
export const ListCustomersDevicesResponse = CustomerListDevicesResponse;

export type ListCustomersDevicesError = CommonErrors;

export const listCustomersDevices = API.makePaginated(() => ({
  input: ListCustomersDevicesRequest,
  output: ListCustomersDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the details of a device. */
export interface GetCustomersDevicesRequest {
  /** Required. The device to get. An API resource name in the format `customers/[CUSTOMER_ID]/devices/[DEVICE_ID]`. */
  name: string;
}

export const GetCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersDevicesRequest>;

export type GetCustomersDevicesResponse = Device;
export const GetCustomersDevicesResponse = Device;

export type GetCustomersDevicesError = CommonErrors;

export const getCustomersDevices: API.OperationMethod<GetCustomersDevicesRequest, GetCustomersDevicesResponse, GetCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersDevicesRequest,
  output: GetCustomersDevicesResponse,
  errors: [],
}));

/** Unclaims a device from a customer and removes it from zero-touch enrollment. After removing a device, a customer must contact their reseller to register the device into zero-touch enrollment again. */
export interface UnclaimCustomersDevicesRequest {
  /** Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`. */
  parent: string;
  /** Request body */
  body?: CustomerUnclaimDeviceRequest;
}

export const UnclaimCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CustomerUnclaimDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/devices:unclaim", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnclaimCustomersDevicesRequest>;

export type UnclaimCustomersDevicesResponse = Empty;
export const UnclaimCustomersDevicesResponse = Empty;

export type UnclaimCustomersDevicesError = CommonErrors;

export const unclaimCustomersDevices: API.OperationMethod<UnclaimCustomersDevicesRequest, UnclaimCustomersDevicesResponse, UnclaimCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnclaimCustomersDevicesRequest,
  output: UnclaimCustomersDevicesResponse,
  errors: [],
}));

/** Applies a Configuration to the device to register the device for zero-touch enrollment. After applying a configuration to a device, the device automatically provisions itself on first boot, or next factory reset. */
export interface ApplyConfigurationCustomersDevicesRequest {
  /** Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`. */
  parent: string;
  /** Request body */
  body?: CustomerApplyConfigurationRequest;
}

export const ApplyConfigurationCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CustomerApplyConfigurationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/devices:applyConfiguration", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApplyConfigurationCustomersDevicesRequest>;

export type ApplyConfigurationCustomersDevicesResponse = Empty;
export const ApplyConfigurationCustomersDevicesResponse = Empty;

export type ApplyConfigurationCustomersDevicesError = CommonErrors;

export const applyConfigurationCustomersDevices: API.OperationMethod<ApplyConfigurationCustomersDevicesRequest, ApplyConfigurationCustomersDevicesResponse, ApplyConfigurationCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApplyConfigurationCustomersDevicesRequest,
  output: ApplyConfigurationCustomersDevicesResponse,
  errors: [],
}));

/** Removes a configuration from device. */
export interface RemoveConfigurationCustomersDevicesRequest {
  /** Required. The customer managing the device in the format `customers/[CUSTOMER_ID]`. */
  parent: string;
  /** Request body */
  body?: CustomerRemoveConfigurationRequest;
}

export const RemoveConfigurationCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CustomerRemoveConfigurationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/devices:removeConfiguration", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveConfigurationCustomersDevicesRequest>;

export type RemoveConfigurationCustomersDevicesResponse = Empty;
export const RemoveConfigurationCustomersDevicesResponse = Empty;

export type RemoveConfigurationCustomersDevicesError = CommonErrors;

export const removeConfigurationCustomersDevices: API.OperationMethod<RemoveConfigurationCustomersDevicesRequest, RemoveConfigurationCustomersDevicesResponse, RemoveConfigurationCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveConfigurationCustomersDevicesRequest,
  output: RemoveConfigurationCustomersDevicesResponse,
  errors: [],
}));

