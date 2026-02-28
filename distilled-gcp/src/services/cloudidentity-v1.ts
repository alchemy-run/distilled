// ==========================================================================
// Cloud Identity API (cloudidentity v1)
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
  name: "cloudidentity",
  version: "v1",
  rootUrl: "https://cloudidentity.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAppsCloudidentityDevicesV1AndroidAttributes {
  /** Whether applications from unknown sources can be installed on device. */
  enabledUnknownSources?: boolean;
  /** Whether device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy. */
  supportsWorkProfile?: boolean;
  /** Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles. */
  ownerProfileAccount?: boolean;
  /** Ownership privileges on device. */
  ownershipPrivilege?: "OWNERSHIP_PRIVILEGE_UNSPECIFIED" | "DEVICE_ADMINISTRATOR" | "PROFILE_OWNER" | "DEVICE_OWNER" | (string & {});
  /** Whether Android verified boot status is GREEN. */
  verifiedBoot?: boolean;
  /** Whether the device passes Android CTS compliance. */
  ctsProfileMatch?: boolean;
  /** Whether Google Play Protect Verify Apps is enabled. */
  verifyAppsEnabled?: boolean;
  /** Whether any potentially harmful apps were detected on the device. */
  hasPotentiallyHarmfulApps?: boolean;
}

export const GoogleAppsCloudidentityDevicesV1AndroidAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1AndroidAttributes> = Schema.suspend(() => Schema.Struct({
  enabledUnknownSources: Schema.optional(Schema.Boolean),
  supportsWorkProfile: Schema.optional(Schema.Boolean),
  ownerProfileAccount: Schema.optional(Schema.Boolean),
  ownershipPrivilege: Schema.optional(Schema.String),
  verifiedBoot: Schema.optional(Schema.Boolean),
  ctsProfileMatch: Schema.optional(Schema.Boolean),
  verifyAppsEnabled: Schema.optional(Schema.Boolean),
  hasPotentiallyHarmfulApps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1AndroidAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1AndroidAttributes>;

export interface GoogleAppsCloudidentityDevicesV1CertificateTemplate {
  /** The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047". */
  id?: string;
  /** The Major version of the template. Example: 100. */
  majorVersion?: number;
  /** The minor version of the template. Example: 12. */
  minorVersion?: number;
}

export const GoogleAppsCloudidentityDevicesV1CertificateTemplate: Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateTemplate> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  majorVersion: Schema.optional(Schema.Number),
  minorVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CertificateTemplate" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateTemplate>;

export interface GoogleAppsCloudidentityDevicesV1CertificateAttributes {
  /** The encoded certificate fingerprint. */
  fingerprint?: string;
  /** The certificate thumbprint. */
  thumbprint?: string;
  /** Output only. Validation state of this certificate. */
  validationState?: "CERTIFICATE_VALIDATION_STATE_UNSPECIFIED" | "VALIDATION_SUCCESSFUL" | "VALIDATION_FAILED" | (string & {});
  /** Serial number of the certificate, Example: "123456789". */
  serialNumber?: string;
  /** Certificate not valid before this timestamp. */
  validityStartTime?: string;
  /** Certificate not valid at or after this timestamp. */
  validityExpirationTime?: string;
  /** The name of the issuer of this certificate. */
  issuer?: string;
  /** The subject name of this certificate. */
  subject?: string;
  /** The X.509 extension for CertificateTemplate. */
  certificateTemplate?: GoogleAppsCloudidentityDevicesV1CertificateTemplate;
}

export const GoogleAppsCloudidentityDevicesV1CertificateAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateAttributes> = Schema.suspend(() => Schema.Struct({
  fingerprint: Schema.optional(Schema.String),
  thumbprint: Schema.optional(Schema.String),
  validationState: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  validityStartTime: Schema.optional(Schema.String),
  validityExpirationTime: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  certificateTemplate: Schema.optional(GoogleAppsCloudidentityDevicesV1CertificateTemplate),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CertificateAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateAttributes>;

export interface GoogleAppsCloudidentityDevicesV1BrowserInfo {
  /** Version of the request initiating browser. E.g. `91.0.4442.4`. */
  browserVersion?: string;
  /** Output only. Browser's management state. */
  browserManagementState?: "UNSPECIFIED" | "UNMANAGED" | "MANAGED_BY_OTHER_DOMAIN" | "PROFILE_MANAGED" | "BROWSER_MANAGED" | (string & {});
  /** Current state of [file upload analysis](https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isFileUploadAnalysisEnabled?: boolean;
  /** Current state of [file download analysis](https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isFileDownloadAnalysisEnabled?: boolean;
  /** Current state of [bulk data analysis](https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isBulkDataEntryAnalysisEnabled?: boolean;
  /** Current state of [security event analysis](https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isSecurityEventAnalysisEnabled?: boolean;
  /** Current state of [real-time URL check](https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty. */
  isRealtimeUrlCheckEnabled?: boolean;
  /** Current state of [Safe Browsing protection level](https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel). */
  safeBrowsingProtectionLevel?: "SAFE_BROWSING_LEVEL_UNSPECIFIED" | "DISABLED" | "STANDARD" | "ENHANCED" | (string & {});
  /** Current state of [site isolation](https://chromeenterprise.google/policies/?policy=IsolateOrigins). */
  isSiteIsolationEnabled?: boolean;
  /** Current state of [built-in DNS client](https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled). */
  isBuiltInDnsClientEnabled?: boolean;
  /** Current state of [password protection trigger](https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger). */
  passwordProtectionWarningTrigger?: "PASSWORD_PROTECTION_TRIGGER_UNSPECIFIED" | "PROTECTION_OFF" | "PASSWORD_REUSE" | "PHISHING_REUSE" | (string & {});
  /** Current state of [Chrome Remote Desktop app](https://chromeenterprise.google/policies/#URLBlocklist). */
  isChromeRemoteDesktopAppBlocked?: boolean;
  /** Deprecated: This field is not used for Chrome version 118 and later. Current state of [Chrome Cleanup](https://chromeenterprise.google/policies/#ChromeCleanupEnabled). */
  isChromeCleanupEnabled?: boolean;
  /** Current state of [third-party blocking](https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled). */
  isThirdPartyBlockingEnabled?: boolean;
}

export const GoogleAppsCloudidentityDevicesV1BrowserInfo: Schema.Schema<GoogleAppsCloudidentityDevicesV1BrowserInfo> = Schema.suspend(() => Schema.Struct({
  browserVersion: Schema.optional(Schema.String),
  browserManagementState: Schema.optional(Schema.String),
  isFileUploadAnalysisEnabled: Schema.optional(Schema.Boolean),
  isFileDownloadAnalysisEnabled: Schema.optional(Schema.Boolean),
  isBulkDataEntryAnalysisEnabled: Schema.optional(Schema.Boolean),
  isSecurityEventAnalysisEnabled: Schema.optional(Schema.Boolean),
  isRealtimeUrlCheckEnabled: Schema.optional(Schema.Boolean),
  safeBrowsingProtectionLevel: Schema.optional(Schema.String),
  isSiteIsolationEnabled: Schema.optional(Schema.Boolean),
  isBuiltInDnsClientEnabled: Schema.optional(Schema.Boolean),
  passwordProtectionWarningTrigger: Schema.optional(Schema.String),
  isChromeRemoteDesktopAppBlocked: Schema.optional(Schema.Boolean),
  isChromeCleanupEnabled: Schema.optional(Schema.Boolean),
  isThirdPartyBlockingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BrowserInfo" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BrowserInfo>;

export interface GoogleAppsCloudidentityDevicesV1BrowserAttributes {
  /** Timestamp in milliseconds since the Unix epoch when the profile/gcm id was last synced. */
  lastProfileSyncTime?: string;
  /** Represents the current state of the [Chrome browser attributes](https://cloud.google.com/access-context-manager/docs/browser-attributes) sent by the [Endpoint Verification extension](https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1). */
  chromeBrowserInfo?: GoogleAppsCloudidentityDevicesV1BrowserInfo;
  /** Chrome profile ID that is exposed by the Chrome API. It is unique for each device. */
  chromeProfileId?: string;
}

export const GoogleAppsCloudidentityDevicesV1BrowserAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1BrowserAttributes> = Schema.suspend(() => Schema.Struct({
  lastProfileSyncTime: Schema.optional(Schema.String),
  chromeBrowserInfo: Schema.optional(GoogleAppsCloudidentityDevicesV1BrowserInfo),
  chromeProfileId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BrowserAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BrowserAttributes>;

export interface GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes {
  /** Details of certificates. */
  certificateAttributes?: Array<GoogleAppsCloudidentityDevicesV1CertificateAttributes>;
  /** Details of browser profiles reported by Endpoint Verification. */
  browserAttributes?: Array<GoogleAppsCloudidentityDevicesV1BrowserAttributes>;
  /** [Additional signals](https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: * Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. * [Configurable attributes](https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist. */
  additionalSignals?: Record<string, unknown>;
}

export const GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes> = Schema.suspend(() => Schema.Struct({
  certificateAttributes: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1CertificateAttributes)),
  browserAttributes: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1BrowserAttributes)),
  additionalSignals: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes>;

export interface GoogleAppsCloudidentityDevicesV1Device {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique id assigned to the Device. Important: Device API scopes require that you use domain-wide delegation to access the API. For more information, see [Set up the Devices API](https://cloud.google.com/identity/docs/how-to/setup-devices). */
  name?: string;
  /** Output only. When the Company-Owned device was imported. This field is empty for BYOD devices. */
  createTime?: string;
  /** Most recent time when device synced with this service. */
  lastSyncTime?: string;
  /** Output only. Whether the device is owned by the company or an individual */
  ownerType?: "DEVICE_OWNERSHIP_UNSPECIFIED" | "COMPANY" | "BYOD" | (string & {});
  /** Output only. Model name of device. Example: Pixel 3. */
  model?: string;
  /** Output only. OS version of the device. Example: Android 8.1.0. */
  osVersion?: string;
  /** Output only. Type of device. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "GOOGLE_SYNC" | "WINDOWS" | "MAC_OS" | "LINUX" | "CHROME_OS" | (string & {});
  /** Serial Number of device. Example: HT82V1A01076. */
  serialNumber?: string;
  /** Asset tag of the device. */
  assetTag?: string;
  /** Output only. IMEI number of device if GSM device; empty otherwise. */
  imei?: string;
  /** Output only. MEID number of device if CDMA device; empty otherwise. */
  meid?: string;
  /** WiFi MAC addresses of device. */
  wifiMacAddresses?: Array<string>;
  /** Output only. Mobile or network operator of device, if available. */
  networkOperator?: string;
  /** Output only. Device manufacturer. Example: Motorola. */
  manufacturer?: string;
  /** Output only. OS release version. Example: 6.0. */
  releaseVersion?: string;
  /** Output only. Device brand. Example: Samsung. */
  brand?: string;
  /** Output only. Build number of the device. */
  buildNumber?: string;
  /** Output only. Kernel version of the device. */
  kernelVersion?: string;
  /** Output only. Baseband version of the device. */
  basebandVersion?: string;
  /** Output only. Whether developer options is enabled on device. */
  enabledDeveloperOptions?: boolean;
  /** Output only. Domain name for Google accounts on device. Type for other accounts on device. On Android, will only be populated if |ownership_privilege| is |PROFILE_OWNER| or |DEVICE_OWNER|. Does not include the account signed in to the device policy app if that account's domain has only one account. Examples: "com.example", "xyz.com". */
  otherAccounts?: Array<string>;
  /** Output only. Whether USB debugging is enabled on device. */
  enabledUsbDebugging?: boolean;
  /** Output only. OS security patch update time on device. */
  securityPatchTime?: string;
  /** Output only. Device bootloader version. Example: 0.6.7. */
  bootloaderVersion?: string;
  /** Output only. Device encryption state. */
  encryptionState?: "ENCRYPTION_STATE_UNSPECIFIED" | "UNSUPPORTED_BY_DEVICE" | "ENCRYPTED" | "NOT_ENCRYPTED" | (string & {});
  /** Output only. Attributes specific to Android devices. */
  androidSpecificAttributes?: GoogleAppsCloudidentityDevicesV1AndroidAttributes;
  /** Output only. Management state of the device */
  managementState?: "MANAGEMENT_STATE_UNSPECIFIED" | "APPROVED" | "BLOCKED" | "PENDING" | "UNPROVISIONED" | "WIPING" | "WIPED" | (string & {});
  /** Output only. Represents whether the Device is compromised. */
  compromisedState?: "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "UNCOMPROMISED" | (string & {});
  /** Unique identifier for the device. */
  deviceId?: string;
  /** Output only. Unified device id of the device. */
  unifiedDeviceId?: string;
  /** Output only. Attributes specific to [Endpoint Verification](https://cloud.google.com/endpoint-verification/docs/overview) devices. */
  endpointVerificationSpecificAttributes?: GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes;
  /** Host name of the device. */
  hostname?: string;
}

export const GoogleAppsCloudidentityDevicesV1Device: Schema.Schema<GoogleAppsCloudidentityDevicesV1Device> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastSyncTime: Schema.optional(Schema.String),
  ownerType: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  assetTag: Schema.optional(Schema.String),
  imei: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  wifiMacAddresses: Schema.optional(Schema.Array(Schema.String)),
  networkOperator: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  releaseVersion: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  buildNumber: Schema.optional(Schema.String),
  kernelVersion: Schema.optional(Schema.String),
  basebandVersion: Schema.optional(Schema.String),
  enabledDeveloperOptions: Schema.optional(Schema.Boolean),
  otherAccounts: Schema.optional(Schema.Array(Schema.String)),
  enabledUsbDebugging: Schema.optional(Schema.Boolean),
  securityPatchTime: Schema.optional(Schema.String),
  bootloaderVersion: Schema.optional(Schema.String),
  encryptionState: Schema.optional(Schema.String),
  androidSpecificAttributes: Schema.optional(GoogleAppsCloudidentityDevicesV1AndroidAttributes),
  managementState: Schema.optional(Schema.String),
  compromisedState: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  unifiedDeviceId: Schema.optional(Schema.String),
  endpointVerificationSpecificAttributes: Schema.optional(GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes),
  hostname: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1Device" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1Device>;

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
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface GoogleAppsCloudidentityDevicesV1ListDevicesResponse {
  /** Devices meeting the list restrictions. */
  devices?: Array<GoogleAppsCloudidentityDevicesV1Device>;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const GoogleAppsCloudidentityDevicesV1ListDevicesResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1ListDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1Device)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ListDevicesResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ListDevicesResponse>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. Specifies if a user is able to factory reset a device after a Device Wipe. On iOS, this is called "Activation Lock", while on Android, this is known as "Factory Reset Protection". If true, this protection will be removed from the device, so that a user can successfully factory reset. If false, the setting is untouched on the device. */
  removeResetLock?: boolean;
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceRequest: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  removeResetLock: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceRequest" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceRequest>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest>;

export interface GoogleAppsCloudidentityDevicesV1DeviceUser {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the DeviceUser in format: `devices/{device}/deviceUsers/{device_user}`, where `device_user` uniquely identifies a user's use of a device. */
  name?: string;
  /** Email address of the user registered on the device. */
  userEmail?: string;
  /** Output only. Management state of the user on the device. */
  managementState?: "MANAGEMENT_STATE_UNSPECIFIED" | "WIPING" | "WIPED" | "APPROVED" | "BLOCKED" | "PENDING_APPROVAL" | "UNENROLLED" | (string & {});
  /** Output only. Most recent time when user registered with this service. */
  firstSyncTime?: string;
  /** Output only. Last time when user synced with policies. */
  lastSyncTime?: string;
  /** Output only. User agent on the device for this specific user */
  userAgent?: string;
  /** Output only. Default locale used on device, in IETF BCP-47 format. */
  languageCode?: string;
  /** Compromised State of the DeviceUser object */
  compromisedState?: "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "NOT_COMPROMISED" | (string & {});
  /** Password state of the DeviceUser object */
  passwordState?: "PASSWORD_STATE_UNSPECIFIED" | "PASSWORD_SET" | "PASSWORD_NOT_SET" | (string & {});
  /** When the user first signed in to the device */
  createTime?: string;
}

export const GoogleAppsCloudidentityDevicesV1DeviceUser: Schema.Schema<GoogleAppsCloudidentityDevicesV1DeviceUser> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  managementState: Schema.optional(Schema.String),
  firstSyncTime: Schema.optional(Schema.String),
  lastSyncTime: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  compromisedState: Schema.optional(Schema.String),
  passwordState: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1DeviceUser" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1DeviceUser>;

export interface GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse {
  /** Devices meeting the list restrictions. */
  deviceUsers?: Array<GoogleAppsCloudidentityDevicesV1DeviceUser>;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse> = Schema.suspend(() => Schema.Struct({
  deviceUsers: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1DeviceUser)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse>;

export interface GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse {
  /** [Resource names](https://cloud.google.com/apis/design/resource_names) of the DeviceUsers in the format: `devices/{device}/deviceUsers/{user_resource}`, where device is the unique ID assigned to a Device and user_resource is the unique user ID */
  names?: Array<string>;
  /** The customer resource name that may be passed back to other Devices API methods such as List, Get, etc. */
  customer?: string;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  customer: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse>;

export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest: Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest>;

export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest: Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest>;

export interface GoogleAppsCloudidentityDevicesV1CustomAttributeValue {
  /** Represents a double value. */
  numberValue?: number;
  /** Represents a string value. */
  stringValue?: string;
  /** Represents a boolean value. */
  boolValue?: boolean;
}

export const GoogleAppsCloudidentityDevicesV1CustomAttributeValue: Schema.Schema<GoogleAppsCloudidentityDevicesV1CustomAttributeValue> = Schema.suspend(() => Schema.Struct({
  numberValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CustomAttributeValue" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CustomAttributeValue>;

export interface GoogleAppsCloudidentityDevicesV1ClientState {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the "BeyondCorp Alliance", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C') */
  name?: string;
  /** Output only. The time the client state data was created. */
  createTime?: string;
  /** Output only. The time the client state data was last updated. */
  lastUpdateTime?: string;
  /** The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest */
  etag?: string;
  /** This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field. */
  customId?: string;
  /** The caller can specify asset tags for this resource */
  assetTags?: Array<string>;
  /** The Health score of the resource. The Health score is the callers specification of the condition of the device from a usability point of view. For example, a third-party device management provider may specify a health score based on its compliance with organizational policies. */
  healthScore?: "HEALTH_SCORE_UNSPECIFIED" | "VERY_POOR" | "POOR" | "NEUTRAL" | "GOOD" | "VERY_GOOD" | (string & {});
  /** A descriptive cause of the health score. */
  scoreReason?: string;
  /** The management state of the resource as specified by the API client. */
  managed?: "MANAGED_STATE_UNSPECIFIED" | "MANAGED" | "UNMANAGED" | (string & {});
  /** The compliance state of the resource as specified by the API client. */
  complianceState?: "COMPLIANCE_STATE_UNSPECIFIED" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
  /** The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map. */
  keyValuePairs?: Record<string, GoogleAppsCloudidentityDevicesV1CustomAttributeValue>;
  /** Output only. The owner of the ClientState */
  ownerType?: "OWNER_TYPE_UNSPECIFIED" | "OWNER_TYPE_CUSTOMER" | "OWNER_TYPE_PARTNER" | (string & {});
}

export const GoogleAppsCloudidentityDevicesV1ClientState: Schema.Schema<GoogleAppsCloudidentityDevicesV1ClientState> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  customId: Schema.optional(Schema.String),
  assetTags: Schema.optional(Schema.Array(Schema.String)),
  healthScore: Schema.optional(Schema.String),
  scoreReason: Schema.optional(Schema.String),
  managed: Schema.optional(Schema.String),
  complianceState: Schema.optional(Schema.String),
  keyValuePairs: Schema.optional(Schema.Record(Schema.String, GoogleAppsCloudidentityDevicesV1CustomAttributeValue)),
  ownerType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ClientState" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ClientState>;

export interface GoogleAppsCloudidentityDevicesV1ListClientStatesResponse {
  /** Client states meeting the list restrictions. */
  clientStates?: Array<GoogleAppsCloudidentityDevicesV1ClientState>;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const GoogleAppsCloudidentityDevicesV1ListClientStatesResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1ListClientStatesResponse> = Schema.suspend(() => Schema.Struct({
  clientStates: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1ClientState)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ListClientStatesResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ListClientStatesResponse>;

export interface EntityKey {
  /** The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. */
  id?: string;
  /** The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`. */
  namespace?: string;
}

export const EntityKey: Schema.Schema<EntityKey> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityKey" }) as any as Schema.Schema<EntityKey>;

export interface DynamicGroupQuery {
  /** Resource type for the Dynamic Group Query */
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "USER" | (string & {});
  /** Query that determines the memberships of the dynamic group. Examples: All users with at least one `organizations.department` of engineering. `user.organizations.exists(org, org.department=='engineering')` All users with at least one location that has `area` of `foo` and `building_id` of `bar`. `user.locations.exists(loc, loc.area=='foo' && loc.building_id=='bar')` All users with any variation of the name John Doe (case-insensitive queries add `equalsIgnoreCase()` to the value being queried). `user.name.value.equalsIgnoreCase('jOhn DoE')` */
  query?: string;
}

export const DynamicGroupQuery: Schema.Schema<DynamicGroupQuery> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicGroupQuery" }) as any as Schema.Schema<DynamicGroupQuery>;

export interface DynamicGroupStatus {
  /** Status of the dynamic group. */
  status?: "STATUS_UNSPECIFIED" | "UP_TO_DATE" | "UPDATING_MEMBERSHIPS" | "INVALID_QUERY" | (string & {});
  /** The latest time at which the dynamic group is guaranteed to be in the given status. If status is `UP_TO_DATE`, the latest time at which the dynamic group was confirmed to be up-to-date. If status is `UPDATING_MEMBERSHIPS`, the time at which dynamic group was created. */
  statusTime?: string;
}

export const DynamicGroupStatus: Schema.Schema<DynamicGroupStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  statusTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicGroupStatus" }) as any as Schema.Schema<DynamicGroupStatus>;

export interface DynamicGroupMetadata {
  /** Memberships will be the union of all queries. Only one entry with USER resource is currently supported. Customers can create up to 500 dynamic groups. */
  queries?: Array<DynamicGroupQuery>;
  /** Output only. Status of the dynamic group. */
  status?: DynamicGroupStatus;
}

export const DynamicGroupMetadata: Schema.Schema<DynamicGroupMetadata> = Schema.suspend(() => Schema.Struct({
  queries: Schema.optional(Schema.Array(DynamicGroupQuery)),
  status: Schema.optional(DynamicGroupStatus),
})).annotate({ identifier: "DynamicGroupMetadata" }) as any as Schema.Schema<DynamicGroupMetadata>;

export interface Group {
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group}`. */
  name?: string;
  /** Required. The `EntityKey` of the `Group`. */
  groupKey?: EntityKey;
  /** Output only. Additional group keys associated with the Group. */
  additionalGroupKeys?: Array<EntityKey>;
  /** Required. Immutable. The resource name of the entity under which this `Group` resides in the Cloud Identity resource hierarchy. Must be of the form `identitysources/{identity_source}` for external [identity-mapped groups](https://support.google.com/a/answer/9039510) or `customers/{customer_id}` for Google Groups. The `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your customer ID.] (https://support.google.com/cloudidentity/answer/10070793) */
  parent?: string;
  /** The display name of the `Group`. */
  displayName?: string;
  /** An extended description to help users determine the purpose of a `Group`. Must not be longer than 4,096 characters. */
  description?: string;
  /** Output only. The time when the `Group` was created. */
  createTime?: string;
  /** Output only. The time when the `Group` was last updated. */
  updateTime?: string;
  /** Required. One or more label entries that apply to the Group. Labels contain a key with an empty value. Google Groups are the default type of group and have a label with a key of `cloudidentity.googleapis.com/groups.discussion_forum` and an empty value. Existing Google Groups can have an additional label with a key of `cloudidentity.googleapis.com/groups.security` and an empty value added to them. **This is an immutable change and the security label cannot be removed once added.** Dynamic groups have a label with a key of `cloudidentity.googleapis.com/groups.dynamic`. Identity-mapped groups for Cloud Search have a label with a key of `system/groups/external` and an empty value. Google Groups can be [locked](https://support.google.com/a?p=locked-groups). To lock a group, add a label with a key of `cloudidentity.googleapis.com/groups.locked` and an empty value. Doing so locks the group. To unlock the group, remove this label. */
  labels?: Record<string, string>;
  /** Optional. Dynamic group metadata like queries and status. */
  dynamicGroupMetadata?: DynamicGroupMetadata;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  groupKey: Schema.optional(EntityKey),
  additionalGroupKeys: Schema.optional(Schema.Array(EntityKey)),
  parent: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  dynamicGroupMetadata: Schema.optional(DynamicGroupMetadata),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface RestrictionEvaluation {
  /** Output only. The current state of the restriction */
  state?: "STATE_UNSPECIFIED" | "EVALUATING" | "COMPLIANT" | "FORWARD_COMPLIANT" | "NON_COMPLIANT" | (string & {});
}

export const RestrictionEvaluation: Schema.Schema<RestrictionEvaluation> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "RestrictionEvaluation" }) as any as Schema.Schema<RestrictionEvaluation>;

export interface MemberRestriction {
  /** Member Restriction as defined by CEL expression. Supported restrictions are: `member.customer_id` and `member.type`. Valid values for `member.type` are `1`, `2` and `3`. They correspond to USER, SERVICE_ACCOUNT, and GROUP respectively. The value for `member.customer_id` only supports `groupCustomerId()` currently which means the customer id of the group will be used for restriction. Supported operators are `&&`, `||` and `==`, corresponding to AND, OR, and EQUAL. Examples: Allow only service accounts of given customer to be members. `member.type == 2 && member.customer_id == groupCustomerId()` Allow only users or groups to be members. `member.type == 1 || member.type == 3` */
  query?: string;
  /** The evaluated state of this restriction on a group. */
  evaluation?: RestrictionEvaluation;
}

export const MemberRestriction: Schema.Schema<MemberRestriction> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  evaluation: Schema.optional(RestrictionEvaluation),
})).annotate({ identifier: "MemberRestriction" }) as any as Schema.Schema<MemberRestriction>;

export interface SecuritySettings {
  /** Output only. The resource name of the security settings. Shall be of the form `groups/{group_id}/securitySettings`. */
  name?: string;
  /** The Member Restriction value */
  memberRestriction?: MemberRestriction;
}

export const SecuritySettings: Schema.Schema<SecuritySettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  memberRestriction: Schema.optional(MemberRestriction),
})).annotate({ identifier: "SecuritySettings" }) as any as Schema.Schema<SecuritySettings>;

export interface LookupGroupNameResponse {
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the looked-up `Group`. */
  name?: string;
}

export const LookupGroupNameResponse: Schema.Schema<LookupGroupNameResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupGroupNameResponse" }) as any as Schema.Schema<LookupGroupNameResponse>;

export interface SearchGroupsResponse {
  /** The `Group` resources that match the search query. */
  groups?: Array<Group>;
  /** A continuation token to retrieve the next page of results, or empty if there are no more results available. */
  nextPageToken?: string;
}

export const SearchGroupsResponse: Schema.Schema<SearchGroupsResponse> = Schema.suspend(() => Schema.Struct({
  groups: Schema.optional(Schema.Array(Group)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchGroupsResponse" }) as any as Schema.Schema<SearchGroupsResponse>;

export interface ListGroupsResponse {
  /** Groups returned in response to list request. The results are not sorted. */
  groups?: Array<Group>;
  /** Token to retrieve the next page of results, or empty if there are no more results available for listing. */
  nextPageToken?: string;
}

export const ListGroupsResponse: Schema.Schema<ListGroupsResponse> = Schema.suspend(() => Schema.Struct({
  groups: Schema.optional(Schema.Array(Group)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGroupsResponse" }) as any as Schema.Schema<ListGroupsResponse>;

export interface ExpiryDetail {
  /** The time at which the `MembershipRole` will expire. */
  expireTime?: string;
}

export const ExpiryDetail: Schema.Schema<ExpiryDetail> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ExpiryDetail" }) as any as Schema.Schema<ExpiryDetail>;

export interface MembershipRoleRestrictionEvaluation {
  /** Output only. The current state of the restriction */
  state?: "STATE_UNSPECIFIED" | "COMPLIANT" | "FORWARD_COMPLIANT" | "NON_COMPLIANT" | "EVALUATING" | (string & {});
}

export const MembershipRoleRestrictionEvaluation: Schema.Schema<MembershipRoleRestrictionEvaluation> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "MembershipRoleRestrictionEvaluation" }) as any as Schema.Schema<MembershipRoleRestrictionEvaluation>;

export interface RestrictionEvaluations {
  /** Evaluation of the member restriction applied to this membership. Empty if the user lacks permission to view the restriction evaluation. */
  memberRestrictionEvaluation?: MembershipRoleRestrictionEvaluation;
}

export const RestrictionEvaluations: Schema.Schema<RestrictionEvaluations> = Schema.suspend(() => Schema.Struct({
  memberRestrictionEvaluation: Schema.optional(MembershipRoleRestrictionEvaluation),
})).annotate({ identifier: "RestrictionEvaluations" }) as any as Schema.Schema<RestrictionEvaluations>;

export interface MembershipRole {
  /** The name of the `MembershipRole`. Must be one of `OWNER`, `MANAGER`, `MEMBER`. */
  name?: string;
  /** The expiry details of the `MembershipRole`. Expiry details are only supported for `MEMBER` `MembershipRoles`. May be set if `name` is `MEMBER`. Must not be set if `name` is any other value. */
  expiryDetail?: ExpiryDetail;
  /** Evaluations of restrictions applied to parent group on this membership. */
  restrictionEvaluations?: RestrictionEvaluations;
}

export const MembershipRole: Schema.Schema<MembershipRole> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  expiryDetail: Schema.optional(ExpiryDetail),
  restrictionEvaluations: Schema.optional(RestrictionEvaluations),
})).annotate({ identifier: "MembershipRole" }) as any as Schema.Schema<MembershipRole>;

export interface Membership {
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group}/memberships/{membership}`. */
  name?: string;
  /** Required. Immutable. The `EntityKey` of the member. */
  preferredMemberKey?: EntityKey;
  /** Output only. The time when the `Membership` was created. */
  createTime?: string;
  /** Output only. The time when the `Membership` was last updated. */
  updateTime?: string;
  /** The `MembershipRole`s that apply to the `Membership`. If unspecified, defaults to a single `MembershipRole` with `name` `MEMBER`. Must not contain duplicate `MembershipRole`s with the same `name`. */
  roles?: Array<MembershipRole>;
  /** Output only. The type of the membership. */
  type?: "TYPE_UNSPECIFIED" | "USER" | "SERVICE_ACCOUNT" | "GROUP" | "SHARED_DRIVE" | "CBCM_BROWSER" | "OTHER" | (string & {});
  /** Output only. Delivery setting associated with the membership. */
  deliverySetting?: "DELIVERY_SETTING_UNSPECIFIED" | "ALL_MAIL" | "DIGEST" | "DAILY" | "NONE" | "DISABLED" | (string & {});
}

export const Membership: Schema.Schema<Membership> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  preferredMemberKey: Schema.optional(EntityKey),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(MembershipRole)),
  type: Schema.optional(Schema.String),
  deliverySetting: Schema.optional(Schema.String),
})).annotate({ identifier: "Membership" }) as any as Schema.Schema<Membership>;

export interface LookupMembershipNameResponse {
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the looked-up `Membership`. Must be of the form `groups/{group}/memberships/{membership}`. */
  name?: string;
}

export const LookupMembershipNameResponse: Schema.Schema<LookupMembershipNameResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupMembershipNameResponse" }) as any as Schema.Schema<LookupMembershipNameResponse>;

export interface ListMembershipsResponse {
  /** The `Membership`s under the specified `parent`. */
  memberships?: Array<Membership>;
  /** A continuation token to retrieve the next page of results, or empty if there are no more results available. */
  nextPageToken?: string;
}

export const ListMembershipsResponse: Schema.Schema<ListMembershipsResponse> = Schema.suspend(() => Schema.Struct({
  memberships: Schema.optional(Schema.Array(Membership)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMembershipsResponse" }) as any as Schema.Schema<ListMembershipsResponse>;

export interface UpdateMembershipRolesParams {
  /** The fully-qualified names of fields to update. May only contain the field `expiry_detail.expire_time`. */
  fieldMask?: string;
  /** The `MembershipRole`s to be updated. Only `MEMBER` `MembershipRole` can currently be updated. */
  membershipRole?: MembershipRole;
}

export const UpdateMembershipRolesParams: Schema.Schema<UpdateMembershipRolesParams> = Schema.suspend(() => Schema.Struct({
  fieldMask: Schema.optional(Schema.String),
  membershipRole: Schema.optional(MembershipRole),
})).annotate({ identifier: "UpdateMembershipRolesParams" }) as any as Schema.Schema<UpdateMembershipRolesParams>;

export interface ModifyMembershipRolesRequest {
  /** The `MembershipRole`s to be added. Adding or removing roles in the same request as updating roles is not supported. Must not be set if `update_roles_params` is set. */
  addRoles?: Array<MembershipRole>;
  /** The `name`s of the `MembershipRole`s to be removed. Adding or removing roles in the same request as updating roles is not supported. It is not possible to remove the `MEMBER` `MembershipRole`. If you wish to delete a `Membership`, call MembershipsService.DeleteMembership instead. Must not contain `MEMBER`. Must not be set if `update_roles_params` is set. */
  removeRoles?: Array<string>;
  /** The `MembershipRole`s to be updated. Updating roles in the same request as adding or removing roles is not supported. Must not be set if either `add_roles` or `remove_roles` is set. */
  updateRolesParams?: Array<UpdateMembershipRolesParams>;
}

export const ModifyMembershipRolesRequest: Schema.Schema<ModifyMembershipRolesRequest> = Schema.suspend(() => Schema.Struct({
  addRoles: Schema.optional(Schema.Array(MembershipRole)),
  removeRoles: Schema.optional(Schema.Array(Schema.String)),
  updateRolesParams: Schema.optional(Schema.Array(UpdateMembershipRolesParams)),
})).annotate({ identifier: "ModifyMembershipRolesRequest" }) as any as Schema.Schema<ModifyMembershipRolesRequest>;

export interface ModifyMembershipRolesResponse {
  /** The `Membership` resource after modifying its `MembershipRole`s. */
  membership?: Membership;
}

export const ModifyMembershipRolesResponse: Schema.Schema<ModifyMembershipRolesResponse> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Membership),
})).annotate({ identifier: "ModifyMembershipRolesResponse" }) as any as Schema.Schema<ModifyMembershipRolesResponse>;

export interface TransitiveMembershipRole {
  /** TransitiveMembershipRole in string format. Currently supported TransitiveMembershipRoles: `"MEMBER"`, `"OWNER"`, and `"MANAGER"`. */
  role?: string;
}

export const TransitiveMembershipRole: Schema.Schema<TransitiveMembershipRole> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "TransitiveMembershipRole" }) as any as Schema.Schema<TransitiveMembershipRole>;

export interface MemberRelation {
  /** Entity key has an id and a namespace. In case of discussion forums, the id will be an email address without a namespace. */
  preferredMemberKey?: Array<EntityKey>;
  /** Resource name for this member. */
  member?: string;
  /** The membership role details (i.e name of role and expiry time). */
  roles?: Array<TransitiveMembershipRole>;
  /** The relation between the group and the transitive member. */
  relationType?: "RELATION_TYPE_UNSPECIFIED" | "DIRECT" | "INDIRECT" | "DIRECT_AND_INDIRECT" | (string & {});
}

export const MemberRelation: Schema.Schema<MemberRelation> = Schema.suspend(() => Schema.Struct({
  preferredMemberKey: Schema.optional(Schema.Array(EntityKey)),
  member: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(TransitiveMembershipRole)),
  relationType: Schema.optional(Schema.String),
})).annotate({ identifier: "MemberRelation" }) as any as Schema.Schema<MemberRelation>;

export interface SearchTransitiveMembershipsResponse {
  /** List of transitive members satisfying the query. */
  memberships?: Array<MemberRelation>;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
}

export const SearchTransitiveMembershipsResponse: Schema.Schema<SearchTransitiveMembershipsResponse> = Schema.suspend(() => Schema.Struct({
  memberships: Schema.optional(Schema.Array(MemberRelation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchTransitiveMembershipsResponse" }) as any as Schema.Schema<SearchTransitiveMembershipsResponse>;

export interface GroupRelation {
  /** Entity key has an id and a namespace. In case of discussion forums, the id will be an email address without a namespace. */
  groupKey?: EntityKey;
  /** Resource name for this group. */
  group?: string;
  /** Display name for this group. */
  displayName?: string;
  /** Membership roles of the member for the group. */
  roles?: Array<TransitiveMembershipRole>;
  /** The relation between the member and the transitive group. */
  relationType?: "RELATION_TYPE_UNSPECIFIED" | "DIRECT" | "INDIRECT" | "DIRECT_AND_INDIRECT" | (string & {});
  /** Labels for Group resource. */
  labels?: Record<string, string>;
}

export const GroupRelation: Schema.Schema<GroupRelation> = Schema.suspend(() => Schema.Struct({
  groupKey: Schema.optional(EntityKey),
  group: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(TransitiveMembershipRole)),
  relationType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GroupRelation" }) as any as Schema.Schema<GroupRelation>;

export interface SearchTransitiveGroupsResponse {
  /** List of transitive groups satisfying the query. */
  memberships?: Array<GroupRelation>;
  /** Token to retrieve the next page of results, or empty if there are no more results available for listing. */
  nextPageToken?: string;
}

export const SearchTransitiveGroupsResponse: Schema.Schema<SearchTransitiveGroupsResponse> = Schema.suspend(() => Schema.Struct({
  memberships: Schema.optional(Schema.Array(GroupRelation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchTransitiveGroupsResponse" }) as any as Schema.Schema<SearchTransitiveGroupsResponse>;

export interface CheckTransitiveMembershipResponse {
  /** Response does not include the possible roles of a member since the behavior of this rpc is not all-or-nothing unlike the other rpcs. So, it may not be possible to list all the roles definitively, due to possible lack of authorization in some of the paths. */
  hasMembership?: boolean;
}

export const CheckTransitiveMembershipResponse: Schema.Schema<CheckTransitiveMembershipResponse> = Schema.suspend(() => Schema.Struct({
  hasMembership: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckTransitiveMembershipResponse" }) as any as Schema.Schema<CheckTransitiveMembershipResponse>;

export interface MembershipRelation {
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group_id}/memberships/{membership_id}`. */
  membership?: string;
  /** The `MembershipRole`s that apply to the `Membership`. */
  roles?: Array<MembershipRole>;
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group_id}`. */
  group?: string;
  /** The `EntityKey` of the `Group`. */
  groupKey?: EntityKey;
  /** The display name of the `Group`. */
  displayName?: string;
  /** One or more label entries that apply to the Group. Currently supported labels contain a key with an empty value. */
  labels?: Record<string, string>;
  /** An extended description to help users determine the purpose of a `Group`. */
  description?: string;
}

export const MembershipRelation: Schema.Schema<MembershipRelation> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(MembershipRole)),
  group: Schema.optional(Schema.String),
  groupKey: Schema.optional(EntityKey),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "MembershipRelation" }) as any as Schema.Schema<MembershipRelation>;

export interface SearchDirectGroupsResponse {
  /** List of direct groups satisfying the query. */
  memberships?: Array<MembershipRelation>;
  /** Token to retrieve the next page of results, or empty if there are no more results available for listing. */
  nextPageToken?: string;
}

export const SearchDirectGroupsResponse: Schema.Schema<SearchDirectGroupsResponse> = Schema.suspend(() => Schema.Struct({
  memberships: Schema.optional(Schema.Array(MembershipRelation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchDirectGroupsResponse" }) as any as Schema.Schema<SearchDirectGroupsResponse>;

export interface SamlIdpConfig {
  /** Required. The SAML **Entity ID** of the identity provider. */
  entityId?: string;
  /** Required. The `SingleSignOnService` endpoint location (sign-in page URL) of the identity provider. This is the URL where the `AuthnRequest` will be sent. Must use `HTTPS`. Assumed to accept the `HTTP-Redirect` binding. */
  singleSignOnServiceUri?: string;
  /** The **Logout Redirect URL** (sign-out page URL) of the identity provider. When a user clicks the sign-out link on a Google page, they will be redirected to this URL. This is a pure redirect with no attached SAML `LogoutRequest` i.e. SAML single logout is not supported. Must use `HTTPS`. */
  logoutRedirectUri?: string;
  /** The **Change Password URL** of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`. */
  changePasswordUri?: string;
}

export const SamlIdpConfig: Schema.Schema<SamlIdpConfig> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  singleSignOnServiceUri: Schema.optional(Schema.String),
  logoutRedirectUri: Schema.optional(Schema.String),
  changePasswordUri: Schema.optional(Schema.String),
})).annotate({ identifier: "SamlIdpConfig" }) as any as Schema.Schema<SamlIdpConfig>;

export interface SamlSpConfig {
  /** Output only. The SAML **Entity ID** for this service provider. */
  entityId?: string;
  /** Output only. The SAML **Assertion Consumer Service (ACS) URL** to be used for the IDP-initiated login. Assumed to accept response messages via the `HTTP-POST` binding. */
  assertionConsumerServiceUri?: string;
}

export const SamlSpConfig: Schema.Schema<SamlSpConfig> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  assertionConsumerServiceUri: Schema.optional(Schema.String),
})).annotate({ identifier: "SamlSpConfig" }) as any as Schema.Schema<SamlSpConfig>;

export interface InboundSamlSsoProfile {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the SAML SSO profile. */
  name?: string;
  /** Immutable. The customer. For example: `customers/C0123abc`. */
  customer?: string;
  /** Human-readable name of the SAML SSO profile. */
  displayName?: string;
  /** SAML identity provider configuration. */
  idpConfig?: SamlIdpConfig;
  /** SAML service provider configuration for this SAML SSO profile. These are the service provider details provided by Google that should be configured on the corresponding identity provider. */
  spConfig?: SamlSpConfig;
}

export const InboundSamlSsoProfile: Schema.Schema<InboundSamlSsoProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  idpConfig: Schema.optional(SamlIdpConfig),
  spConfig: Schema.optional(SamlSpConfig),
})).annotate({ identifier: "InboundSamlSsoProfile" }) as any as Schema.Schema<InboundSamlSsoProfile>;

export interface ListInboundSamlSsoProfilesResponse {
  /** List of InboundSamlSsoProfiles. */
  inboundSamlSsoProfiles?: Array<InboundSamlSsoProfile>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListInboundSamlSsoProfilesResponse: Schema.Schema<ListInboundSamlSsoProfilesResponse> = Schema.suspend(() => Schema.Struct({
  inboundSamlSsoProfiles: Schema.optional(Schema.Array(InboundSamlSsoProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInboundSamlSsoProfilesResponse" }) as any as Schema.Schema<ListInboundSamlSsoProfilesResponse>;

export interface RsaPublicKeyInfo {
  /** Key size in bits (size of the modulus). */
  keySize?: number;
}

export const RsaPublicKeyInfo: Schema.Schema<RsaPublicKeyInfo> = Schema.suspend(() => Schema.Struct({
  keySize: Schema.optional(Schema.Number),
})).annotate({ identifier: "RsaPublicKeyInfo" }) as any as Schema.Schema<RsaPublicKeyInfo>;

export interface DsaPublicKeyInfo {
  /** Key size in bits (size of parameter P). */
  keySize?: number;
}

export const DsaPublicKeyInfo: Schema.Schema<DsaPublicKeyInfo> = Schema.suspend(() => Schema.Struct({
  keySize: Schema.optional(Schema.Number),
})).annotate({ identifier: "DsaPublicKeyInfo" }) as any as Schema.Schema<DsaPublicKeyInfo>;

export interface IdpCredential {
  /** Output only. Information of a RSA public key. */
  rsaKeyInfo?: RsaPublicKeyInfo;
  /** Output only. Information of a DSA public key. */
  dsaKeyInfo?: DsaPublicKeyInfo;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the credential. */
  name?: string;
  /** Output only. Time when the `IdpCredential` was last updated. */
  updateTime?: string;
}

export const IdpCredential: Schema.Schema<IdpCredential> = Schema.suspend(() => Schema.Struct({
  rsaKeyInfo: Schema.optional(RsaPublicKeyInfo),
  dsaKeyInfo: Schema.optional(DsaPublicKeyInfo),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "IdpCredential" }) as any as Schema.Schema<IdpCredential>;

export interface ListIdpCredentialsResponse {
  /** The IdpCredentials from the specified InboundSamlSsoProfile. */
  idpCredentials?: Array<IdpCredential>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListIdpCredentialsResponse: Schema.Schema<ListIdpCredentialsResponse> = Schema.suspend(() => Schema.Struct({
  idpCredentials: Schema.optional(Schema.Array(IdpCredential)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListIdpCredentialsResponse" }) as any as Schema.Schema<ListIdpCredentialsResponse>;

export interface AddIdpCredentialRequest {
  /** PEM encoded x509 certificate containing the public key for verifying IdP signatures. */
  pemData?: string;
}

export const AddIdpCredentialRequest: Schema.Schema<AddIdpCredentialRequest> = Schema.suspend(() => Schema.Struct({
  pemData: Schema.optional(Schema.String),
})).annotate({ identifier: "AddIdpCredentialRequest" }) as any as Schema.Schema<AddIdpCredentialRequest>;

export interface OidcIdpConfig {
  /** Required. The Issuer identifier for the IdP. Must be a URL. The discovery URL will be derived from this as described in Section 4 of [the OIDC specification](https://openid.net/specs/openid-connect-discovery-1_0.html). */
  issuerUri?: string;
  /** The **Change Password URL** of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`. */
  changePasswordUri?: string;
}

export const OidcIdpConfig: Schema.Schema<OidcIdpConfig> = Schema.suspend(() => Schema.Struct({
  issuerUri: Schema.optional(Schema.String),
  changePasswordUri: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcIdpConfig" }) as any as Schema.Schema<OidcIdpConfig>;

export interface OidcRpConfig {
  /** OAuth2 client ID for OIDC. */
  clientId?: string;
  /** Input only. OAuth2 client secret for OIDC. */
  clientSecret?: string;
  /** Output only. The URL(s) that this client may use in authentication requests. */
  redirectUris?: Array<string>;
}

export const OidcRpConfig: Schema.Schema<OidcRpConfig> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  redirectUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OidcRpConfig" }) as any as Schema.Schema<OidcRpConfig>;

export interface InboundOidcSsoProfile {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the OIDC SSO profile. */
  name?: string;
  /** Immutable. The customer. For example: `customers/C0123abc`. */
  customer?: string;
  /** Human-readable name of the OIDC SSO profile. */
  displayName?: string;
  /** OIDC identity provider configuration. */
  idpConfig?: OidcIdpConfig;
  /** OIDC relying party (RP) configuration for this OIDC SSO profile. These are the RP details provided by Google that should be configured on the corresponding identity provider. */
  rpConfig?: OidcRpConfig;
}

export const InboundOidcSsoProfile: Schema.Schema<InboundOidcSsoProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  idpConfig: Schema.optional(OidcIdpConfig),
  rpConfig: Schema.optional(OidcRpConfig),
})).annotate({ identifier: "InboundOidcSsoProfile" }) as any as Schema.Schema<InboundOidcSsoProfile>;

export interface ListInboundOidcSsoProfilesResponse {
  /** List of InboundOidcSsoProfiles. */
  inboundOidcSsoProfiles?: Array<InboundOidcSsoProfile>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListInboundOidcSsoProfilesResponse: Schema.Schema<ListInboundOidcSsoProfilesResponse> = Schema.suspend(() => Schema.Struct({
  inboundOidcSsoProfiles: Schema.optional(Schema.Array(InboundOidcSsoProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInboundOidcSsoProfilesResponse" }) as any as Schema.Schema<ListInboundOidcSsoProfilesResponse>;

export interface SamlSsoInfo {
  /** Required. Name of the `InboundSamlSsoProfile` to use. Must be of the form `inboundSamlSsoProfiles/{inbound_saml_sso_profile}`. */
  inboundSamlSsoProfile?: string;
}

export const SamlSsoInfo: Schema.Schema<SamlSsoInfo> = Schema.suspend(() => Schema.Struct({
  inboundSamlSsoProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "SamlSsoInfo" }) as any as Schema.Schema<SamlSsoInfo>;

export interface OidcSsoInfo {
  /** Required. Name of the `InboundOidcSsoProfile` to use. Must be of the form `inboundOidcSsoProfiles/{inbound_oidc_sso_profile}`. */
  inboundOidcSsoProfile?: string;
}

export const OidcSsoInfo: Schema.Schema<OidcSsoInfo> = Schema.suspend(() => Schema.Struct({
  inboundOidcSsoProfile: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcSsoInfo" }) as any as Schema.Schema<OidcSsoInfo>;

export interface SignInBehavior {
  /** When to redirect sign-ins to the IdP. */
  redirectCondition?: "REDIRECT_CONDITION_UNSPECIFIED" | "NEVER" | (string & {});
}

export const SignInBehavior: Schema.Schema<SignInBehavior> = Schema.suspend(() => Schema.Struct({
  redirectCondition: Schema.optional(Schema.String),
})).annotate({ identifier: "SignInBehavior" }) as any as Schema.Schema<SignInBehavior>;

export interface InboundSsoAssignment {
  /** Immutable. Must be of the form `groups/{group}`. */
  targetGroup?: string;
  /** Immutable. Must be of the form `orgUnits/{org_unit}`. */
  targetOrgUnit?: string;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Inbound SSO Assignment. */
  name?: string;
  /** Immutable. The customer. For example: `customers/C0123abc`. */
  customer?: string;
  /** Must be zero (which is the default value so it can be omitted) for assignments with `target_org_unit` set and must be greater-than-or-equal-to one for assignments with `target_group` set. */
  rank?: number;
  /** Inbound SSO behavior. */
  ssoMode?: "SSO_MODE_UNSPECIFIED" | "SSO_OFF" | "SAML_SSO" | "OIDC_SSO" | "DOMAIN_WIDE_SAML_IF_ENABLED" | (string & {});
  /** SAML SSO details. Must be set if and only if `sso_mode` is set to `SAML_SSO`. */
  samlSsoInfo?: SamlSsoInfo;
  /** OpenID Connect SSO details. Must be set if and only if `sso_mode` is set to `OIDC_SSO`. */
  oidcSsoInfo?: OidcSsoInfo;
  /** Assertions about users assigned to an IdP will always be accepted from that IdP. This controls whether/when Google should redirect a user to the IdP. Unset (defaults) is the recommended configuration. */
  signInBehavior?: SignInBehavior;
}

export const InboundSsoAssignment: Schema.Schema<InboundSsoAssignment> = Schema.suspend(() => Schema.Struct({
  targetGroup: Schema.optional(Schema.String),
  targetOrgUnit: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  rank: Schema.optional(Schema.Number),
  ssoMode: Schema.optional(Schema.String),
  samlSsoInfo: Schema.optional(SamlSsoInfo),
  oidcSsoInfo: Schema.optional(OidcSsoInfo),
  signInBehavior: Schema.optional(SignInBehavior),
})).annotate({ identifier: "InboundSsoAssignment" }) as any as Schema.Schema<InboundSsoAssignment>;

export interface ListInboundSsoAssignmentsResponse {
  /** The assignments. */
  inboundSsoAssignments?: Array<InboundSsoAssignment>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListInboundSsoAssignmentsResponse: Schema.Schema<ListInboundSsoAssignmentsResponse> = Schema.suspend(() => Schema.Struct({
  inboundSsoAssignments: Schema.optional(Schema.Array(InboundSsoAssignment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInboundSsoAssignmentsResponse" }) as any as Schema.Schema<ListInboundSsoAssignmentsResponse>;

export interface PolicyQuery {
  /** Immutable. The CEL query that defines which entities the Policy applies to (ex. a User entity). For details about CEL see https://opensource.google.com/projects/cel. The OrgUnits the Policy applies to are represented by a clause like so: entity.org_units.exists(org_unit, org_unit.org_unit_id == orgUnitId('{orgUnitId}')) The Group the Policy applies to are represented by a clause like so: entity.groups.exists(group, group.group_id == groupId('{groupId}')) The Licenses the Policy applies to are represented by a clause like so: entity.licenses.exists(license, license in ['/product/{productId}/sku/{skuId}']) The above clauses can be present in any combination, and used in conjunction with the &&, || and ! operators. The org_unit and group fields below are helper fields that contain the corresponding value(s) as the query to make the query easier to use. */
  query?: string;
  /** Required. Immutable. Non-empty default. The OrgUnit the query applies to. This field is only set if there is a single value for org_unit that satisfies all clauses of the query. */
  orgUnit?: string;
  /** Immutable. The group that the query applies to. This field is only set if there is a single value for group that satisfies all clauses of the query. If no group applies, this will be the empty string. */
  group?: string;
  /** Output only. The decimal sort order of this PolicyQuery. The value is relative to all other policies with the same setting type for the customer. (There are no duplicates within this set). */
  sortOrder?: number;
}

export const PolicyQuery: Schema.Schema<PolicyQuery> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  orgUnit: Schema.optional(Schema.String),
  group: Schema.optional(Schema.String),
  sortOrder: Schema.optional(Schema.Number),
})).annotate({ identifier: "PolicyQuery" }) as any as Schema.Schema<PolicyQuery>;

export interface Setting {
  /** Required. Immutable. The type of the Setting. . */
  type?: string;
  /** Required. The value of the Setting. */
  value?: Record<string, unknown>;
}

export const Setting: Schema.Schema<Setting> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Setting" }) as any as Schema.Schema<Setting>;

export interface Policy {
  /** Output only. Identifier. The [resource name](https://cloud.google.com/apis/design/resource_names) of the Policy. Format: policies/{policy}. */
  name?: string;
  /** Immutable. Customer that the Policy belongs to. The value is in the format 'customers/{customerId}'. The `customerId` must begin with "C" To find your customer ID in Admin Console see https://support.google.com/a/answer/10070793. */
  customer?: string;
  /** Required. The PolicyQuery the Setting applies to. */
  policyQuery?: PolicyQuery;
  /** Required. The Setting configured by this Policy. */
  setting?: Setting;
  /** Output only. The type of the policy. */
  type?: "POLICY_TYPE_UNSPECIFIED" | "SYSTEM" | "ADMIN" | (string & {});
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  policyQuery: Schema.optional(PolicyQuery),
  setting: Schema.optional(Setting),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ListPoliciesResponse {
  /** The results */
  policies?: Array<Policy>;
  /** The pagination token to retrieve the next page of results. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPoliciesResponse: Schema.Schema<ListPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(Policy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPoliciesResponse" }) as any as Schema.Schema<ListPoliciesResponse>;

export interface UserInvitation {
  /** Shall be of the form `customers/{customer}/userinvitations/{user_email_address}`. */
  name?: string;
  /** State of the `UserInvitation`. */
  state?: "STATE_UNSPECIFIED" | "NOT_YET_SENT" | "INVITED" | "ACCEPTED" | "DECLINED" | (string & {});
  /** Number of invitation emails sent to the user. */
  mailsSentCount?: string;
  /** Time when the `UserInvitation` was last updated. */
  updateTime?: string;
}

export const UserInvitation: Schema.Schema<UserInvitation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  mailsSentCount: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UserInvitation" }) as any as Schema.Schema<UserInvitation>;

export interface ListUserInvitationsResponse {
  /** The list of UserInvitation resources. */
  userInvitations?: Array<UserInvitation>;
  /** The token for the next page. If not empty, indicates that there may be more `UserInvitation` resources that match the listing request; this value can be used in a subsequent ListUserInvitationsRequest to get continued results with the current list call. */
  nextPageToken?: string;
}

export const ListUserInvitationsResponse: Schema.Schema<ListUserInvitationsResponse> = Schema.suspend(() => Schema.Struct({
  userInvitations: Schema.optional(Schema.Array(UserInvitation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserInvitationsResponse" }) as any as Schema.Schema<ListUserInvitationsResponse>;

export interface SendUserInvitationRequest {
}

export const SendUserInvitationRequest: Schema.Schema<SendUserInvitationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SendUserInvitationRequest" }) as any as Schema.Schema<SendUserInvitationRequest>;

export interface CancelUserInvitationRequest {
}

export const CancelUserInvitationRequest: Schema.Schema<CancelUserInvitationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelUserInvitationRequest" }) as any as Schema.Schema<CancelUserInvitationRequest>;

export interface IsInvitableUserResponse {
  /** Returns true if the email address is invitable. */
  isInvitableUser?: boolean;
}

export const IsInvitableUserResponse: Schema.Schema<IsInvitableUserResponse> = Schema.suspend(() => Schema.Struct({
  isInvitableUser: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IsInvitableUserResponse" }) as any as Schema.Schema<IsInvitableUserResponse>;

export interface MembershipAdjacencyList {
  /** Resource name of the group that the members belong to. */
  group?: string;
  /** Each edge contains information about the member that belongs to this group. Note: Fields returned here will help identify the specific Membership resource (e.g `name`, `preferred_member_key` and `role`), but may not be a comprehensive list of all fields. */
  edges?: Array<Membership>;
}

export const MembershipAdjacencyList: Schema.Schema<MembershipAdjacencyList> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  edges: Schema.optional(Schema.Array(Membership)),
})).annotate({ identifier: "MembershipAdjacencyList" }) as any as Schema.Schema<MembershipAdjacencyList>;

export interface GetMembershipGraphResponse {
  /** The membership graph's path information represented as an adjacency list. */
  adjacencyList?: Array<MembershipAdjacencyList>;
  /** The resources representing each group in the adjacency list. Each group in this list can be correlated to a 'group' of the MembershipAdjacencyList using the 'name' of the Group resource. */
  groups?: Array<Group>;
}

export const GetMembershipGraphResponse: Schema.Schema<GetMembershipGraphResponse> = Schema.suspend(() => Schema.Struct({
  adjacencyList: Schema.optional(Schema.Array(MembershipAdjacencyList)),
  groups: Schema.optional(Schema.Array(Group)),
})).annotate({ identifier: "GetMembershipGraphResponse" }) as any as Schema.Schema<GetMembershipGraphResponse>;

export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse>;

export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceResponse {
  /** Resultant Device object for the action. Note that asset tags will not be returned in the device object. */
  device?: GoogleAppsCloudidentityDevicesV1Device;
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(GoogleAppsCloudidentityDevicesV1Device),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceResponse>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse {
  /** Resultant Device object for the action. Note that asset tags will not be returned in the device object. */
  device?: GoogleAppsCloudidentityDevicesV1Device;
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(GoogleAppsCloudidentityDevicesV1Device),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse>;

export interface GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata {
}

export const GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata>;

export interface GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata {
}

export const GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata>;

export interface CreateGroupMetadata {
}

export const CreateGroupMetadata: Schema.Schema<CreateGroupMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateGroupMetadata" }) as any as Schema.Schema<CreateGroupMetadata>;

export interface DeleteGroupMetadata {
}

export const DeleteGroupMetadata: Schema.Schema<DeleteGroupMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteGroupMetadata" }) as any as Schema.Schema<DeleteGroupMetadata>;

export interface UpdateGroupMetadata {
}

export const UpdateGroupMetadata: Schema.Schema<UpdateGroupMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateGroupMetadata" }) as any as Schema.Schema<UpdateGroupMetadata>;

export interface CreateMembershipMetadata {
}

export const CreateMembershipMetadata: Schema.Schema<CreateMembershipMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateMembershipMetadata" }) as any as Schema.Schema<CreateMembershipMetadata>;

export interface DeleteMembershipMetadata {
}

export const DeleteMembershipMetadata: Schema.Schema<DeleteMembershipMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteMembershipMetadata" }) as any as Schema.Schema<DeleteMembershipMetadata>;

export interface UpdateMembershipMetadata {
}

export const UpdateMembershipMetadata: Schema.Schema<UpdateMembershipMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateMembershipMetadata" }) as any as Schema.Schema<UpdateMembershipMetadata>;

export interface GetMembershipGraphMetadata {
}

export const GetMembershipGraphMetadata: Schema.Schema<GetMembershipGraphMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GetMembershipGraphMetadata" }) as any as Schema.Schema<GetMembershipGraphMetadata>;

export interface AddIdpCredentialOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const AddIdpCredentialOperationMetadata: Schema.Schema<AddIdpCredentialOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "AddIdpCredentialOperationMetadata" }) as any as Schema.Schema<AddIdpCredentialOperationMetadata>;

export interface CreateInboundSamlSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const CreateInboundSamlSsoProfileOperationMetadata: Schema.Schema<CreateInboundSamlSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInboundSamlSsoProfileOperationMetadata" }) as any as Schema.Schema<CreateInboundSamlSsoProfileOperationMetadata>;

export interface DeleteIdpCredentialOperationMetadata {
}

export const DeleteIdpCredentialOperationMetadata: Schema.Schema<DeleteIdpCredentialOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteIdpCredentialOperationMetadata" }) as any as Schema.Schema<DeleteIdpCredentialOperationMetadata>;

export interface DeleteInboundSamlSsoProfileOperationMetadata {
}

export const DeleteInboundSamlSsoProfileOperationMetadata: Schema.Schema<DeleteInboundSamlSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteInboundSamlSsoProfileOperationMetadata" }) as any as Schema.Schema<DeleteInboundSamlSsoProfileOperationMetadata>;

export interface UpdateInboundSamlSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const UpdateInboundSamlSsoProfileOperationMetadata: Schema.Schema<UpdateInboundSamlSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInboundSamlSsoProfileOperationMetadata" }) as any as Schema.Schema<UpdateInboundSamlSsoProfileOperationMetadata>;

export interface CreateInboundOidcSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const CreateInboundOidcSsoProfileOperationMetadata: Schema.Schema<CreateInboundOidcSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInboundOidcSsoProfileOperationMetadata" }) as any as Schema.Schema<CreateInboundOidcSsoProfileOperationMetadata>;

export interface UpdateInboundOidcSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const UpdateInboundOidcSsoProfileOperationMetadata: Schema.Schema<UpdateInboundOidcSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInboundOidcSsoProfileOperationMetadata" }) as any as Schema.Schema<UpdateInboundOidcSsoProfileOperationMetadata>;

export interface DeleteInboundOidcSsoProfileOperationMetadata {
}

export const DeleteInboundOidcSsoProfileOperationMetadata: Schema.Schema<DeleteInboundOidcSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteInboundOidcSsoProfileOperationMetadata" }) as any as Schema.Schema<DeleteInboundOidcSsoProfileOperationMetadata>;

export interface CreateInboundSsoAssignmentOperationMetadata {
}

export const CreateInboundSsoAssignmentOperationMetadata: Schema.Schema<CreateInboundSsoAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateInboundSsoAssignmentOperationMetadata" }) as any as Schema.Schema<CreateInboundSsoAssignmentOperationMetadata>;

export interface DeleteInboundSsoAssignmentOperationMetadata {
}

export const DeleteInboundSsoAssignmentOperationMetadata: Schema.Schema<DeleteInboundSsoAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteInboundSsoAssignmentOperationMetadata" }) as any as Schema.Schema<DeleteInboundSsoAssignmentOperationMetadata>;

export interface UpdateInboundSsoAssignmentOperationMetadata {
}

export const UpdateInboundSsoAssignmentOperationMetadata: Schema.Schema<UpdateInboundSsoAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateInboundSsoAssignmentOperationMetadata" }) as any as Schema.Schema<UpdateInboundSsoAssignmentOperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a device. Only company-owned device may be created. **Note**: This method is available only to customers who have one of the following SKUs: Enterprise Standard, Enterprise Plus, Enterprise for Education, and Cloud Identity Premium */
export interface CreateDevicesRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1Device;
}

export const CreateDevicesRequest = Schema.Struct({
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1Device).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateDevicesRequest>;

export type CreateDevicesResponse = Operation;
export const CreateDevicesResponse = Operation;

export type CreateDevicesError = CommonErrors;

export const createDevices: API.OperationMethod<CreateDevicesRequest, CreateDevicesResponse, CreateDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateDevicesRequest,
  output: CreateDevicesResponse,
  errors: [],
}));

/** Retrieves the specified device. */
export interface GetDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in the format: `devices/{device}`, where device is the unique ID assigned to the Device. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Customer in the format: `customers/{customer}`, where customer is the customer to whom the device belongs. If you're using this API for your own organization, use `customers/my_customer`. If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GetDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesRequest>;

export type GetDevicesResponse = GoogleAppsCloudidentityDevicesV1Device;
export const GetDevicesResponse = GoogleAppsCloudidentityDevicesV1Device;

export type GetDevicesError = CommonErrors;

export const getDevices: API.OperationMethod<GetDevicesRequest, GetDevicesResponse, GetDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesRequest,
  output: GetDevicesResponse,
  errors: [],
}));

/** Lists/Searches devices. */
export interface ListDevicesRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer in the format: `customers/{customer}`, where customer is the customer to whom the device belongs. If you're using this API for your own organization, use `customers/my_customer`. If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. Additional restrictions when fetching list of devices. For a list of search fields, refer to [Mobile device search fields](https://developers.google.com/admin-sdk/directory/v1/search-operators). Multiple search fields are separated by the space character. */
  filter?: string;
  /** Optional. The maximum number of Devices to return. If unspecified, at most 20 Devices will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDevices` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDevices` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Order specification for devices in the response. Only one of the following field names may be used to specify the order: `create_time`, `last_sync_time`, `model`, `os_version`, `device_type` and `serial_number`. `desc` may be specified optionally at the end to specify results to be sorted in descending order. Default order is ascending. */
  orderBy?: string;
  /** Optional. The view to use for the List request. */
  view?: "VIEW_UNSPECIFIED" | "COMPANY_INVENTORY" | "USER_ASSIGNED_DEVICES" | (string & {});
}

export const ListDevicesRequest = Schema.Struct({
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices" }),
  svc,
) as unknown as Schema.Schema<ListDevicesRequest>;

export type ListDevicesResponse = GoogleAppsCloudidentityDevicesV1ListDevicesResponse;
export const ListDevicesResponse = GoogleAppsCloudidentityDevicesV1ListDevicesResponse;

export type ListDevicesError = CommonErrors;

export const listDevices = API.makePaginated(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the specified device. */
export interface DeleteDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique ID assigned to the Device. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const DeleteDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDevicesRequest>;

export type DeleteDevicesResponse = Operation;
export const DeleteDevicesResponse = Operation;

export type DeleteDevicesError = CommonErrors;

export const deleteDevices: API.OperationMethod<DeleteDevicesRequest, DeleteDevicesResponse, DeleteDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDevicesRequest,
  output: DeleteDevicesResponse,
  errors: [],
}));

/** Wipes all data on the specified device. */
export interface WipeDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1WipeDeviceRequest;
}

export const WipeDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1WipeDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices/{devicesId}:wipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WipeDevicesRequest>;

export type WipeDevicesResponse = Operation;
export const WipeDevicesResponse = Operation;

export type WipeDevicesError = CommonErrors;

export const wipeDevices: API.OperationMethod<WipeDevicesRequest, WipeDevicesResponse, WipeDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WipeDevicesRequest,
  output: WipeDevicesResponse,
  errors: [],
}));

/** Cancels an unfinished device wipe. This operation can be used to cancel device wipe in the gap between the wipe operation returning success and the device being wiped. This operation is possible when the device is in a "pending wipe" state. The device enters the "pending wipe" state when a wipe device command is issued, but has not yet been sent to the device. The cancel wipe will fail if the wipe command has already been issued to the device. */
export interface CancelWipeDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique ID assigned to the Device. */
  name: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest;
}

export const CancelWipeDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices/{devicesId}:cancelWipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelWipeDevicesRequest>;

export type CancelWipeDevicesResponse = Operation;
export const CancelWipeDevicesResponse = Operation;

export type CancelWipeDevicesError = CommonErrors;

export const cancelWipeDevices: API.OperationMethod<CancelWipeDevicesRequest, CancelWipeDevicesResponse, CancelWipeDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelWipeDevicesRequest,
  output: CancelWipeDevicesResponse,
  errors: [],
}));

/** Retrieves the specified DeviceUser */
export interface GetDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GetDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesDeviceUsersRequest>;

export type GetDevicesDeviceUsersResponse = GoogleAppsCloudidentityDevicesV1DeviceUser;
export const GetDevicesDeviceUsersResponse = GoogleAppsCloudidentityDevicesV1DeviceUser;

export type GetDevicesDeviceUsersError = CommonErrors;

export const getDevicesDeviceUsers: API.OperationMethod<GetDevicesDeviceUsersRequest, GetDevicesDeviceUsersResponse, GetDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesDeviceUsersRequest,
  output: GetDevicesDeviceUsersResponse,
  errors: [],
}));

/** Lists/Searches DeviceUsers. */
export interface ListDevicesDeviceUsersRequest {
  /** Required. To list all DeviceUsers, set this to "devices/-". To list all DeviceUsers owned by a device, set this to the resource name of the device. Format: devices/{device} */
  parent: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. Additional restrictions when fetching list of devices. For a list of search fields, refer to [Mobile device search fields](https://developers.google.com/admin-sdk/directory/v1/search-operators). Multiple search fields are separated by the space character. */
  filter?: string;
  /** Optional. The maximum number of DeviceUsers to return. If unspecified, at most 5 DeviceUsers will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDeviceUsers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBooks` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Order specification for devices in the response. */
  orderBy?: string;
}

export const ListDevicesDeviceUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices/{devicesId}/deviceUsers" }),
  svc,
) as unknown as Schema.Schema<ListDevicesDeviceUsersRequest>;

export type ListDevicesDeviceUsersResponse = GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse;
export const ListDevicesDeviceUsersResponse = GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse;

export type ListDevicesDeviceUsersError = CommonErrors;

export const listDevicesDeviceUsers = API.makePaginated(() => ({
  input: ListDevicesDeviceUsersRequest,
  output: ListDevicesDeviceUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the specified DeviceUser. This also revokes the user's access to device data. */
export interface DeleteDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const DeleteDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDevicesDeviceUsersRequest>;

export type DeleteDevicesDeviceUsersResponse = Operation;
export const DeleteDevicesDeviceUsersResponse = Operation;

export type DeleteDevicesDeviceUsersError = CommonErrors;

export const deleteDevicesDeviceUsers: API.OperationMethod<DeleteDevicesDeviceUsersRequest, DeleteDevicesDeviceUsersResponse, DeleteDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDevicesDeviceUsersRequest,
  output: DeleteDevicesDeviceUsersResponse,
  errors: [],
}));

/** Looks up resource names of the DeviceUsers associated with the caller's credentials, as well as the properties provided in the request. This method must be called with end-user credentials with the scope: https://www.googleapis.com/auth/cloud-identity.devices.lookup If multiple properties are provided, only DeviceUsers having all of these properties are considered as matches - i.e. the query behaves like an AND. Different platforms require different amounts of information from the caller to ensure that the DeviceUser is uniquely identified. - iOS: If either the `partner` or `ios_device_id` field is provided, then both fields are required. - Android: Specifying the `android_id` field is required. - Desktop: Specifying the `raw_resource_id` field is required. */
export interface LookupDevicesDeviceUsersRequest {
  /** Must be set to "devices/-/deviceUsers" to search across all DeviceUser belonging to the user. */
  parent: string;
  /** The maximum number of DeviceUsers to return. If unspecified, at most 20 DeviceUsers will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** A page token, received from a previous `LookupDeviceUsers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `LookupDeviceUsers` must match the call that provided the page token. */
  pageToken?: string;
  /** Android Id returned by [Settings.Secure#ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID). */
  androidId?: string;
  /** Raw Resource Id used by Google Endpoint Verification. If the user is enrolled into Google Endpoint Verification, this id will be saved as the 'device_resource_id' field in the following platform dependent files. Mac: ~/.secureConnect/context_aware_config.json Windows: C:\Users\%USERPROFILE%\.secureConnect\context_aware_config.json Linux: ~/.secureConnect/context_aware_config.json */
  rawResourceId?: string;
  /** The user whose DeviceUser's resource name will be fetched. Must be set to 'me' to fetch the DeviceUser's resource name for the calling user. */
  userId?: string;
  /** Optional. The partner ID of the calling iOS app. This string must match the value of the partner key within the app configuration dictionary provided to Google Workspace apps. */
  partner?: string;
  /** Optional. The partner-specified device identifier assigned to the iOS device that initiated the Lookup API call. This string must match the value of the iosDeviceId key in the app config dictionary provided to Google Workspace apps. */
  iosDeviceId?: string;
}

export const LookupDevicesDeviceUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
  rawResourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("rawResourceId")),
  userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
  partner: Schema.optional(Schema.String).pipe(T.HttpQuery("partner")),
  iosDeviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("iosDeviceId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices/{devicesId}/deviceUsers:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupDevicesDeviceUsersRequest>;

export type LookupDevicesDeviceUsersResponse = GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse;
export const LookupDevicesDeviceUsersResponse = GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse;

export type LookupDevicesDeviceUsersError = CommonErrors;

export const lookupDevicesDeviceUsers = API.makePaginated(() => ({
  input: LookupDevicesDeviceUsersRequest,
  output: LookupDevicesDeviceUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Approves device to access user data. */
export interface ApproveDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest;
}

export const ApproveDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveDevicesDeviceUsersRequest>;

export type ApproveDevicesDeviceUsersResponse = Operation;
export const ApproveDevicesDeviceUsersResponse = Operation;

export type ApproveDevicesDeviceUsersError = CommonErrors;

export const approveDevicesDeviceUsers: API.OperationMethod<ApproveDevicesDeviceUsersRequest, ApproveDevicesDeviceUsersResponse, ApproveDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveDevicesDeviceUsersRequest,
  output: ApproveDevicesDeviceUsersResponse,
  errors: [],
}));

/** Blocks device from accessing user data */
export interface BlockDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest;
}

export const BlockDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}:block", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BlockDevicesDeviceUsersRequest>;

export type BlockDevicesDeviceUsersResponse = Operation;
export const BlockDevicesDeviceUsersResponse = Operation;

export type BlockDevicesDeviceUsersError = CommonErrors;

export const blockDevicesDeviceUsers: API.OperationMethod<BlockDevicesDeviceUsersRequest, BlockDevicesDeviceUsersResponse, BlockDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BlockDevicesDeviceUsersRequest,
  output: BlockDevicesDeviceUsersResponse,
  errors: [],
}));

/** Wipes the user's account on a device. Other data on the device that is not associated with the user's work account is not affected. For example, if a Gmail app is installed on a device that is used for personal and work purposes, and the user is logged in to the Gmail app with their personal account as well as their work account, wiping the "deviceUser" by their work administrator will not affect their personal account within Gmail or other apps such as Photos. */
export interface WipeDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest;
}

export const WipeDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}:wipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WipeDevicesDeviceUsersRequest>;

export type WipeDevicesDeviceUsersResponse = Operation;
export const WipeDevicesDeviceUsersResponse = Operation;

export type WipeDevicesDeviceUsersError = CommonErrors;

export const wipeDevicesDeviceUsers: API.OperationMethod<WipeDevicesDeviceUsersRequest, WipeDevicesDeviceUsersResponse, WipeDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WipeDevicesDeviceUsersRequest,
  output: WipeDevicesDeviceUsersResponse,
  errors: [],
}));

/** Cancels an unfinished user account wipe. This operation can be used to cancel device wipe in the gap between the wipe operation returning success and the device being wiped. */
export interface CancelWipeDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest;
}

export const CancelWipeDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}:cancelWipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelWipeDevicesDeviceUsersRequest>;

export type CancelWipeDevicesDeviceUsersResponse = Operation;
export const CancelWipeDevicesDeviceUsersResponse = Operation;

export type CancelWipeDevicesDeviceUsersError = CommonErrors;

export const cancelWipeDevicesDeviceUsers: API.OperationMethod<CancelWipeDevicesDeviceUsersRequest, CancelWipeDevicesDeviceUsersResponse, CancelWipeDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelWipeDevicesDeviceUsersRequest,
  output: CancelWipeDevicesDeviceUsersResponse,
  errors: [],
}));

/** Gets the client state for the device user */
export interface GetDevicesDeviceUsersClientStatesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientStates/{partner}`, where `device` is the unique ID assigned to the Device, `device_user` is the unique ID assigned to the User and `partner` identifies the partner storing the data. To get the client state for devices belonging to your own organization, the `partnerId` is in the format: `customerId-*anystring*`. Where the `customerId` is your organization's customer ID and `anystring` is any suffix. This suffix is used in setting up Custom Access Levels in Context-Aware Access. You may use `my_customer` instead of the customer ID for devices managed by your own organization. You may specify `-` in place of the `{device}`, so the ClientState resource name can be: `devices/-/deviceUsers/{device_user_resource}/clientStates/{partner}`. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
}

export const GetDevicesDeviceUsersClientStatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}/clientStates/{clientStatesId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesDeviceUsersClientStatesRequest>;

export type GetDevicesDeviceUsersClientStatesResponse = GoogleAppsCloudidentityDevicesV1ClientState;
export const GetDevicesDeviceUsersClientStatesResponse = GoogleAppsCloudidentityDevicesV1ClientState;

export type GetDevicesDeviceUsersClientStatesError = CommonErrors;

export const getDevicesDeviceUsersClientStates: API.OperationMethod<GetDevicesDeviceUsersClientStatesRequest, GetDevicesDeviceUsersClientStatesResponse, GetDevicesDeviceUsersClientStatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesDeviceUsersClientStatesRequest,
  output: GetDevicesDeviceUsersClientStatesResponse,
  errors: [],
}));

/** Lists the client states for the given search query. */
export interface ListDevicesDeviceUsersClientStatesRequest {
  /** Required. To list all ClientStates, set this to "devices/-/deviceUsers/-". To list all ClientStates owned by a DeviceUser, set this to the resource name of the DeviceUser. Format: devices/{device}/deviceUsers/{deviceUser} */
  parent: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. Additional restrictions when fetching list of client states. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListClientStates` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListClientStates` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Order specification for client states in the response. */
  orderBy?: string;
}

export const ListDevicesDeviceUsersClientStatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}/clientStates" }),
  svc,
) as unknown as Schema.Schema<ListDevicesDeviceUsersClientStatesRequest>;

export type ListDevicesDeviceUsersClientStatesResponse = GoogleAppsCloudidentityDevicesV1ListClientStatesResponse;
export const ListDevicesDeviceUsersClientStatesResponse = GoogleAppsCloudidentityDevicesV1ListClientStatesResponse;

export type ListDevicesDeviceUsersClientStatesError = CommonErrors;

export const listDevicesDeviceUsersClientStates = API.makePaginated(() => ({
  input: ListDevicesDeviceUsersClientStatesRequest,
  output: ListDevicesDeviceUsersClientStatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the client state for the device user **Note**: This method is available only to customers who have one of the following SKUs: Enterprise Standard, Enterprise Plus, Enterprise for Education, and Cloud Identity Premium */
export interface PatchDevicesDeviceUsersClientStatesRequest {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the "BeyondCorp Alliance", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C') */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. Comma-separated list of fully qualified names of fields to be updated. If not specified, all updatable fields in ClientState are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAppsCloudidentityDevicesV1ClientState;
}

export const PatchDevicesDeviceUsersClientStatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAppsCloudidentityDevicesV1ClientState).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/devices/{devicesId}/deviceUsers/{deviceUsersId}/clientStates/{clientStatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchDevicesDeviceUsersClientStatesRequest>;

export type PatchDevicesDeviceUsersClientStatesResponse = Operation;
export const PatchDevicesDeviceUsersClientStatesResponse = Operation;

export type PatchDevicesDeviceUsersClientStatesError = CommonErrors;

export const patchDevicesDeviceUsersClientStates: API.OperationMethod<PatchDevicesDeviceUsersClientStatesRequest, PatchDevicesDeviceUsersClientStatesResponse, PatchDevicesDeviceUsersClientStatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchDevicesDeviceUsersClientStatesRequest,
  output: PatchDevicesDeviceUsersClientStatesResponse,
  errors: [],
}));

/** Creates a Group. */
export interface CreateGroupsRequest {
  /** Optional. The initial configuration option for the `Group`. */
  initialGroupConfig?: "INITIAL_GROUP_CONFIG_UNSPECIFIED" | "WITH_INITIAL_OWNER" | "EMPTY" | (string & {});
  /** Request body */
  body?: Group;
}

export const CreateGroupsRequest = Schema.Struct({
  initialGroupConfig: Schema.optional(Schema.String).pipe(T.HttpQuery("initialGroupConfig")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/groups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGroupsRequest>;

export type CreateGroupsResponse = Operation;
export const CreateGroupsResponse = Operation;

export type CreateGroupsError = CommonErrors;

export const createGroups: API.OperationMethod<CreateGroupsRequest, CreateGroupsResponse, CreateGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGroupsRequest,
  output: CreateGroupsResponse,
  errors: [],
}));

/** Retrieves a `Group`. */
export interface GetGroupsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group` to retrieve. Must be of the form `groups/{group}`. */
  name: string;
}

export const GetGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetGroupsRequest>;

export type GetGroupsResponse = Group;
export const GetGroupsResponse = Group;

export type GetGroupsError = CommonErrors;

export const getGroups: API.OperationMethod<GetGroupsRequest, GetGroupsResponse, GetGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGroupsRequest,
  output: GetGroupsResponse,
  errors: [],
}));

/** Get Security Settings */
export interface GetSecuritySettingsGroupsRequest {
  /** Required. The security settings to retrieve. Format: `groups/{group_id}/securitySettings` */
  name: string;
  /** Field-level read mask of which fields to return. "*" returns all fields. If not specified, all fields will be returned. May only contain the following field: `member_restriction`. */
  readMask?: string;
}

export const GetSecuritySettingsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/securitySettings" }),
  svc,
) as unknown as Schema.Schema<GetSecuritySettingsGroupsRequest>;

export type GetSecuritySettingsGroupsResponse = SecuritySettings;
export const GetSecuritySettingsGroupsResponse = SecuritySettings;

export type GetSecuritySettingsGroupsError = CommonErrors;

export const getSecuritySettingsGroups: API.OperationMethod<GetSecuritySettingsGroupsRequest, GetSecuritySettingsGroupsResponse, GetSecuritySettingsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSecuritySettingsGroupsRequest,
  output: GetSecuritySettingsGroupsResponse,
  errors: [],
}));

/** Updates a `Group`. */
export interface PatchGroupsRequest {
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group}`. */
  name: string;
  /** Required. The names of fields to update. May only contain the following field names: `display_name`, `description`, `labels`. */
  updateMask?: string;
  /** Request body */
  body?: Group;
}

export const PatchGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchGroupsRequest>;

export type PatchGroupsResponse = Operation;
export const PatchGroupsResponse = Operation;

export type PatchGroupsError = CommonErrors;

export const patchGroups: API.OperationMethod<PatchGroupsRequest, PatchGroupsResponse, PatchGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchGroupsRequest,
  output: PatchGroupsResponse,
  errors: [],
}));

/** Update Security Settings */
export interface UpdateSecuritySettingsGroupsRequest {
  /** Output only. The resource name of the security settings. Shall be of the form `groups/{group_id}/securitySettings`. */
  name: string;
  /** Required. The fully-qualified names of fields to update. May only contain the following field: `member_restriction.query`. */
  updateMask?: string;
  /** Request body */
  body?: SecuritySettings;
}

export const UpdateSecuritySettingsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/groups/{groupsId}/securitySettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecuritySettingsGroupsRequest>;

export type UpdateSecuritySettingsGroupsResponse = Operation;
export const UpdateSecuritySettingsGroupsResponse = Operation;

export type UpdateSecuritySettingsGroupsError = CommonErrors;

export const updateSecuritySettingsGroups: API.OperationMethod<UpdateSecuritySettingsGroupsRequest, UpdateSecuritySettingsGroupsResponse, UpdateSecuritySettingsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecuritySettingsGroupsRequest,
  output: UpdateSecuritySettingsGroupsResponse,
  errors: [],
}));

/** Deletes a `Group`. */
export interface DeleteGroupsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group` to retrieve. Must be of the form `groups/{group}`. */
  name: string;
}

export const DeleteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteGroupsRequest>;

export type DeleteGroupsResponse = Operation;
export const DeleteGroupsResponse = Operation;

export type DeleteGroupsError = CommonErrors;

export const deleteGroups: API.OperationMethod<DeleteGroupsRequest, DeleteGroupsResponse, DeleteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGroupsRequest,
  output: DeleteGroupsResponse,
  errors: [],
}));

/** Looks up the [resource name](https://cloud.google.com/apis/design/resource_names) of a `Group` by its `EntityKey`. */
export interface LookupGroupsRequest {
  /** The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. */
  "groupKey.id"?: string;
  /** The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`. */
  "groupKey.namespace"?: string;
}

export const LookupGroupsRequest = Schema.Struct({
  "groupKey.id": Schema.optional(Schema.String).pipe(T.HttpQuery("groupKey.id")),
  "groupKey.namespace": Schema.optional(Schema.String).pipe(T.HttpQuery("groupKey.namespace")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupGroupsRequest>;

export type LookupGroupsResponse = LookupGroupNameResponse;
export const LookupGroupsResponse = LookupGroupNameResponse;

export type LookupGroupsError = CommonErrors;

export const lookupGroups: API.OperationMethod<LookupGroupsRequest, LookupGroupsResponse, LookupGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupGroupsRequest,
  output: LookupGroupsResponse,
  errors: [],
}));

/** Searches for `Group` resources matching a specified query. */
export interface SearchGroupsRequest {
  /** Required. The search query. * Must be specified in [Common Expression Language](https://opensource.google/projects/cel). * Must contain equality operators on the parent, e.g. `parent == 'customers/{customer_id}'`. The `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your customer ID.] (https://support.google.com/cloudidentity/answer/10070793) * Can contain optional inclusion operators on `labels` such as `'cloudidentity.googleapis.com/groups.discussion_forum' in labels`). * Can contain an optional equality operator on `domain_name`. e.g. `domain_name == 'examplepetstore.com'` * Can contain optional `startsWith/contains/equality` operators on `group_key`, e.g. `group_key.startsWith('dev')`, `group_key.contains('dev'), group_key == 'dev@examplepetstore.com'` * Can contain optional `startsWith/contains/equality` operators on `display_name`, such as `display_name.startsWith('dev')` , `display_name.contains('dev')`, `display_name == 'dev'` */
  query?: string;
  /** The level of detail to be returned. If unspecified, defaults to `View.BASIC`. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The maximum number of results to return. Note that the number of results returned may be less than this value even if there are more available results. To fetch all results, clients must continue calling this method repeatedly until the response no longer contains a `next_page_token`. If unspecified, defaults to 200 for `GroupView.BASIC` and 50 for `GroupView.FULL`. Must not be greater than 1000 for `GroupView.BASIC` or 500 for `GroupView.FULL`. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous search request, if any. */
  pageToken?: string;
}

export const SearchGroupsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups:search" }),
  svc,
) as unknown as Schema.Schema<SearchGroupsRequest>;

export type SearchGroupsResponse_Op = SearchGroupsResponse;
export const SearchGroupsResponse_Op = SearchGroupsResponse;

export type SearchGroupsError = CommonErrors;

export const searchGroups = API.makePaginated(() => ({
  input: SearchGroupsRequest,
  output: SearchGroupsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the `Group` resources under a customer or namespace. */
export interface ListGroupsRequest {
  /** Required. The parent resource under which to list all `Group` resources. Must be of the form `identitysources/{identity_source}` for external- identity-mapped groups or `customers/{customer_id}` for Google Groups. The `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your customer ID.] (https://support.google.com/cloudidentity/answer/10070793) */
  parent?: string;
  /** The level of detail to be returned. If unspecified, defaults to `View.BASIC`. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The maximum number of results to return. Note that the number of results returned may be less than this value even if there are more available results. To fetch all results, clients must continue calling this method repeatedly until the response no longer contains a `next_page_token`. If unspecified, defaults to 200 for `View.BASIC` and to 50 for `View.FULL`. Must not be greater than 1000 for `View.BASIC` or 500 for `View.FULL`. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListGroupsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups" }),
  svc,
) as unknown as Schema.Schema<ListGroupsRequest>;

export type ListGroupsResponse_Op = ListGroupsResponse;
export const ListGroupsResponse_Op = ListGroupsResponse;

export type ListGroupsError = CommonErrors;

export const listGroups = API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a `Membership`. */
export interface CreateGroupsMembershipsRequest {
  /** Required. The parent `Group` resource under which to create the `Membership`. Must be of the form `groups/{group}`. */
  parent: string;
  /** Request body */
  body?: Membership;
}

export const CreateGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Membership).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/groups/{groupsId}/memberships", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGroupsMembershipsRequest>;

export type CreateGroupsMembershipsResponse = Operation;
export const CreateGroupsMembershipsResponse = Operation;

export type CreateGroupsMembershipsError = CommonErrors;

export const createGroupsMemberships: API.OperationMethod<CreateGroupsMembershipsRequest, CreateGroupsMembershipsResponse, CreateGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGroupsMembershipsRequest,
  output: CreateGroupsMembershipsResponse,
  errors: [],
}));

/** Retrieves a `Membership`. */
export interface GetGroupsMembershipsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` to retrieve. Must be of the form `groups/{group}/memberships/{membership}`. */
  name: string;
}

export const GetGroupsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships/{membershipsId}" }),
  svc,
) as unknown as Schema.Schema<GetGroupsMembershipsRequest>;

export type GetGroupsMembershipsResponse = Membership;
export const GetGroupsMembershipsResponse = Membership;

export type GetGroupsMembershipsError = CommonErrors;

export const getGroupsMemberships: API.OperationMethod<GetGroupsMembershipsRequest, GetGroupsMembershipsResponse, GetGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGroupsMembershipsRequest,
  output: GetGroupsMembershipsResponse,
  errors: [],
}));

/** Deletes a `Membership`. */
export interface DeleteGroupsMembershipsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` to delete. Must be of the form `groups/{group}/memberships/{membership}` */
  name: string;
}

export const DeleteGroupsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/groups/{groupsId}/memberships/{membershipsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteGroupsMembershipsRequest>;

export type DeleteGroupsMembershipsResponse = Operation;
export const DeleteGroupsMembershipsResponse = Operation;

export type DeleteGroupsMembershipsError = CommonErrors;

export const deleteGroupsMemberships: API.OperationMethod<DeleteGroupsMembershipsRequest, DeleteGroupsMembershipsResponse, DeleteGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGroupsMembershipsRequest,
  output: DeleteGroupsMembershipsResponse,
  errors: [],
}));

/** Looks up the [resource name](https://cloud.google.com/apis/design/resource_names) of a `Membership` by its `EntityKey`. */
export interface LookupGroupsMembershipsRequest {
  /** Required. The parent `Group` resource under which to lookup the `Membership` name. Must be of the form `groups/{group}`. */
  parent: string;
  /** The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. */
  "memberKey.id"?: string;
  /** The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`. */
  "memberKey.namespace"?: string;
}

export const LookupGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "memberKey.id": Schema.optional(Schema.String).pipe(T.HttpQuery("memberKey.id")),
  "memberKey.namespace": Schema.optional(Schema.String).pipe(T.HttpQuery("memberKey.namespace")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupGroupsMembershipsRequest>;

export type LookupGroupsMembershipsResponse = LookupMembershipNameResponse;
export const LookupGroupsMembershipsResponse = LookupMembershipNameResponse;

export type LookupGroupsMembershipsError = CommonErrors;

export const lookupGroupsMemberships: API.OperationMethod<LookupGroupsMembershipsRequest, LookupGroupsMembershipsResponse, LookupGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupGroupsMembershipsRequest,
  output: LookupGroupsMembershipsResponse,
  errors: [],
}));

/** Lists the `Membership`s within a `Group`. */
export interface ListGroupsMembershipsRequest {
  /** Required. The parent `Group` resource under which to lookup the `Membership` name. Must be of the form `groups/{group}`. */
  parent: string;
  /** The level of detail to be returned. If unspecified, defaults to `View.BASIC`. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The maximum number of results to return. Note that the number of results returned may be less than this value even if there are more available results. To fetch all results, clients must continue calling this method repeatedly until the response no longer contains a `next_page_token`. If unspecified, defaults to 200 for `GroupView.BASIC` and to 50 for `GroupView.FULL`. Must not be greater than 1000 for `GroupView.BASIC` or 500 for `GroupView.FULL`. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous search request, if any. */
  pageToken?: string;
}

export const ListGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships" }),
  svc,
) as unknown as Schema.Schema<ListGroupsMembershipsRequest>;

export type ListGroupsMembershipsResponse = ListMembershipsResponse;
export const ListGroupsMembershipsResponse = ListMembershipsResponse;

export type ListGroupsMembershipsError = CommonErrors;

export const listGroupsMemberships = API.makePaginated(() => ({
  input: ListGroupsMembershipsRequest,
  output: ListGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Modifies the `MembershipRole`s of a `Membership`. */
export interface ModifyMembershipRolesGroupsMembershipsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` whose roles are to be modified. Must be of the form `groups/{group}/memberships/{membership}`. */
  name: string;
  /** Request body */
  body?: ModifyMembershipRolesRequest;
}

export const ModifyMembershipRolesGroupsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ModifyMembershipRolesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/groups/{groupsId}/memberships/{membershipsId}:modifyMembershipRoles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyMembershipRolesGroupsMembershipsRequest>;

export type ModifyMembershipRolesGroupsMembershipsResponse = ModifyMembershipRolesResponse;
export const ModifyMembershipRolesGroupsMembershipsResponse = ModifyMembershipRolesResponse;

export type ModifyMembershipRolesGroupsMembershipsError = CommonErrors;

export const modifyMembershipRolesGroupsMemberships: API.OperationMethod<ModifyMembershipRolesGroupsMembershipsRequest, ModifyMembershipRolesGroupsMembershipsResponse, ModifyMembershipRolesGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyMembershipRolesGroupsMembershipsRequest,
  output: ModifyMembershipRolesGroupsMembershipsResponse,
  errors: [],
}));

/** Search transitive memberships of a group. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. If the account of the group is not one of these, a 403 (PERMISSION_DENIED) HTTP status code will be returned. A transitive membership is any direct or indirect membership of a group. Actor must have view permissions to all transitive memberships. */
export interface SearchTransitiveMembershipsGroupsMembershipsRequest {
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group}`, where `group` is the unique ID assigned to the Group. */
  parent: string;
  /** The default page size is 200 (max 1000). */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous list request, if any. */
  pageToken?: string;
}

export const SearchTransitiveMembershipsGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships:searchTransitiveMemberships" }),
  svc,
) as unknown as Schema.Schema<SearchTransitiveMembershipsGroupsMembershipsRequest>;

export type SearchTransitiveMembershipsGroupsMembershipsResponse = SearchTransitiveMembershipsResponse;
export const SearchTransitiveMembershipsGroupsMembershipsResponse = SearchTransitiveMembershipsResponse;

export type SearchTransitiveMembershipsGroupsMembershipsError = CommonErrors;

export const searchTransitiveMembershipsGroupsMemberships = API.makePaginated(() => ({
  input: SearchTransitiveMembershipsGroupsMembershipsRequest,
  output: SearchTransitiveMembershipsGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Search transitive groups of a member. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. If the account of the member is not one of these, a 403 (PERMISSION_DENIED) HTTP status code will be returned. A transitive group is any group that has a direct or indirect membership to the member. Actor must have view permissions all transitive groups. */
export interface SearchTransitiveGroupsGroupsMembershipsRequest {
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group}`, where `group` is always '-' as this API will search across all groups for a given member. */
  parent: string;
  /** Required. A CEL expression that MUST include member specification AND label(s). This is a `required` field. Users can search on label attributes of groups. CONTAINS match ('in') is supported on labels. Identity-mapped groups are uniquely identified by both a `member_key_id` and a `member_key_namespace`, which requires an additional query input: `member_key_namespace`. Example query: `member_key_id == 'member_key_id_value' && in labels` Query may optionally contain equality operators on the parent of the group restricting the search within a particular customer, e.g. `parent == 'customers/{customer_id}'`. The `customer_id` must begin with "C" (for example, 'C046psxkn'). This filtering is only supported for Admins with groups read permissions on the input customer. Example query: `member_key_id == 'member_key_id_value' && in labels && parent == 'customers/C046psxkn'` */
  query?: string;
  /** The default page size is 200 (max 1000). */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous list request, if any. */
  pageToken?: string;
}

export const SearchTransitiveGroupsGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships:searchTransitiveGroups" }),
  svc,
) as unknown as Schema.Schema<SearchTransitiveGroupsGroupsMembershipsRequest>;

export type SearchTransitiveGroupsGroupsMembershipsResponse = SearchTransitiveGroupsResponse;
export const SearchTransitiveGroupsGroupsMembershipsResponse = SearchTransitiveGroupsResponse;

export type SearchTransitiveGroupsGroupsMembershipsError = CommonErrors;

export const searchTransitiveGroupsGroupsMemberships = API.makePaginated(() => ({
  input: SearchTransitiveGroupsGroupsMembershipsRequest,
  output: SearchTransitiveGroupsGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Check a potential member for membership in a group. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. If the account of the member is not one of these, a 403 (PERMISSION_DENIED) HTTP status code will be returned. A member has membership to a group as long as there is a single viewable transitive membership between the group and the member. The actor must have view permissions to at least one transitive membership between the member and group. */
export interface CheckTransitiveMembershipGroupsMembershipsRequest {
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to check the transitive membership in. Format: `groups/{group}`, where `group` is the unique id assigned to the Group to which the Membership belongs to. */
  parent: string;
  /** Required. A CEL expression that MUST include member specification. This is a `required` field. Certain groups are uniquely identified by both a 'member_key_id' and a 'member_key_namespace', which requires an additional query input: 'member_key_namespace'. Example query: `member_key_id == 'member_key_id_value'` */
  query?: string;
}

export const CheckTransitiveMembershipGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships:checkTransitiveMembership" }),
  svc,
) as unknown as Schema.Schema<CheckTransitiveMembershipGroupsMembershipsRequest>;

export type CheckTransitiveMembershipGroupsMembershipsResponse = CheckTransitiveMembershipResponse;
export const CheckTransitiveMembershipGroupsMembershipsResponse = CheckTransitiveMembershipResponse;

export type CheckTransitiveMembershipGroupsMembershipsError = CommonErrors;

export const checkTransitiveMembershipGroupsMemberships: API.OperationMethod<CheckTransitiveMembershipGroupsMembershipsRequest, CheckTransitiveMembershipGroupsMembershipsResponse, CheckTransitiveMembershipGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckTransitiveMembershipGroupsMembershipsRequest,
  output: CheckTransitiveMembershipGroupsMembershipsResponse,
  errors: [],
}));

/** Get a membership graph of just a member or both a member and a group. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. If the account of the member is not one of these, a 403 (PERMISSION_DENIED) HTTP status code will be returned. Given a member, the response will contain all membership paths from the member. Given both a group and a member, the response will contain all membership paths between the group and the member. */
export interface GetMembershipGraphGroupsMembershipsRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group}`, where `group` is the unique ID assigned to the Group to which the Membership belongs to. group can be a wildcard collection id "-". When a group is specified, the membership graph will be constrained to paths between the member (defined in the query) and the parent. If a wildcard collection is provided, all membership paths connected to the member will be returned. */
  parent: string;
  /** Required. A CEL expression that MUST include member specification AND label(s). Certain groups are uniquely identified by both a 'member_key_id' and a 'member_key_namespace', which requires an additional query input: 'member_key_namespace'. Example query: `member_key_id == 'member_key_id_value' && in labels` */
  query?: string;
}

export const GetMembershipGraphGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships:getMembershipGraph" }),
  svc,
) as unknown as Schema.Schema<GetMembershipGraphGroupsMembershipsRequest>;

export type GetMembershipGraphGroupsMembershipsResponse = Operation;
export const GetMembershipGraphGroupsMembershipsResponse = Operation;

export type GetMembershipGraphGroupsMembershipsError = CommonErrors;

export const getMembershipGraphGroupsMemberships: API.OperationMethod<GetMembershipGraphGroupsMembershipsRequest, GetMembershipGraphGroupsMembershipsResponse, GetMembershipGraphGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMembershipGraphGroupsMembershipsRequest,
  output: GetMembershipGraphGroupsMembershipsResponse,
  errors: [],
}));

/** Searches direct groups of a member. */
export interface SearchDirectGroupsGroupsMembershipsRequest {
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: groups/{group_id}, where group_id is always '-' as this API will search across all groups for a given member. */
  parent: string;
  /** Required. A CEL expression that MUST include member specification AND label(s). Users can search on label attributes of groups. CONTAINS match ('in') is supported on labels. Identity-mapped groups are uniquely identified by both a `member_key_id` and a `member_key_namespace`, which requires an additional query input: `member_key_namespace`. Example query: `member_key_id == 'member_key_id_value' && 'label_value' in labels` */
  query?: string;
  /** The default page size is 200 (max 1000). */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous list request, if any */
  pageToken?: string;
  /** The ordering of membership relation for the display name or email in the response. The syntax for this field can be found at https://cloud.google.com/apis/design/design_patterns#sorting_order. Example: Sort by the ascending display name: order_by="group_name" or order_by="group_name asc". Sort by the descending display name: order_by="group_name desc". Sort by the ascending group key: order_by="group_key" or order_by="group_key asc". Sort by the descending group key: order_by="group_key desc". */
  orderBy?: string;
}

export const SearchDirectGroupsGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/groups/{groupsId}/memberships:searchDirectGroups" }),
  svc,
) as unknown as Schema.Schema<SearchDirectGroupsGroupsMembershipsRequest>;

export type SearchDirectGroupsGroupsMembershipsResponse = SearchDirectGroupsResponse;
export const SearchDirectGroupsGroupsMembershipsResponse = SearchDirectGroupsResponse;

export type SearchDirectGroupsGroupsMembershipsError = CommonErrors;

export const searchDirectGroupsGroupsMemberships = API.makePaginated(() => ({
  input: SearchDirectGroupsGroupsMembershipsRequest,
  output: SearchDirectGroupsGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an InboundSamlSsoProfile for a customer. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export interface CreateInboundSamlSsoProfilesRequest {
  /** Request body */
  body?: InboundSamlSsoProfile;
}

export const CreateInboundSamlSsoProfilesRequest = Schema.Struct({
  body: Schema.optional(InboundSamlSsoProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/inboundSamlSsoProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInboundSamlSsoProfilesRequest>;

export type CreateInboundSamlSsoProfilesResponse = Operation;
export const CreateInboundSamlSsoProfilesResponse = Operation;

export type CreateInboundSamlSsoProfilesError = CommonErrors;

export const createInboundSamlSsoProfiles: API.OperationMethod<CreateInboundSamlSsoProfilesRequest, CreateInboundSamlSsoProfilesResponse, CreateInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInboundSamlSsoProfilesRequest,
  output: CreateInboundSamlSsoProfilesResponse,
  errors: [],
}));

/** Updates an InboundSamlSsoProfile. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export interface PatchInboundSamlSsoProfilesRequest {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the SAML SSO profile. */
  name: string;
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: InboundSamlSsoProfile;
}

export const PatchInboundSamlSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InboundSamlSsoProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInboundSamlSsoProfilesRequest>;

export type PatchInboundSamlSsoProfilesResponse = Operation;
export const PatchInboundSamlSsoProfilesResponse = Operation;

export type PatchInboundSamlSsoProfilesError = CommonErrors;

export const patchInboundSamlSsoProfiles: API.OperationMethod<PatchInboundSamlSsoProfilesRequest, PatchInboundSamlSsoProfilesResponse, PatchInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInboundSamlSsoProfilesRequest,
  output: PatchInboundSamlSsoProfilesResponse,
  errors: [],
}));

/** Deletes an InboundSamlSsoProfile. */
export interface DeleteInboundSamlSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSamlSsoProfile to delete. Format: `inboundSamlSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const DeleteInboundSamlSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundSamlSsoProfilesRequest>;

export type DeleteInboundSamlSsoProfilesResponse = Operation;
export const DeleteInboundSamlSsoProfilesResponse = Operation;

export type DeleteInboundSamlSsoProfilesError = CommonErrors;

export const deleteInboundSamlSsoProfiles: API.OperationMethod<DeleteInboundSamlSsoProfilesRequest, DeleteInboundSamlSsoProfilesResponse, DeleteInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundSamlSsoProfilesRequest,
  output: DeleteInboundSamlSsoProfilesResponse,
  errors: [],
}));

/** Gets an InboundSamlSsoProfile. */
export interface GetInboundSamlSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSamlSsoProfile to get. Format: `inboundSamlSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const GetInboundSamlSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundSamlSsoProfilesRequest>;

export type GetInboundSamlSsoProfilesResponse = InboundSamlSsoProfile;
export const GetInboundSamlSsoProfilesResponse = InboundSamlSsoProfile;

export type GetInboundSamlSsoProfilesError = CommonErrors;

export const getInboundSamlSsoProfiles: API.OperationMethod<GetInboundSamlSsoProfilesRequest, GetInboundSamlSsoProfilesResponse, GetInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundSamlSsoProfilesRequest,
  output: GetInboundSamlSsoProfilesResponse,
  errors: [],
}));

/** Lists InboundSamlSsoProfiles for a customer. */
export interface ListInboundSamlSsoProfilesRequest {
  /** A [Common Expression Language](https://github.com/google/cel-spec) expression to filter the results. The only supported filter is filtering by customer. For example: `customer=="customers/C0123abc"`. Omitting the filter or specifying a filter of `customer=="customers/my_customer"` will return the profiles for the customer that the caller (authenticated user) belongs to. */
  filter?: string;
  /** The maximum number of InboundSamlSsoProfiles to return. The service may return fewer than this value. If omitted (or defaulted to zero) the server will use a sensible default. This default may change over time. The maximum allowed value is 100. Requests with page_size greater than that will be silently interpreted as having this maximum value. */
  pageSize?: number;
  /** A page token, received from a previous `ListInboundSamlSsoProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInboundSamlSsoProfiles` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListInboundSamlSsoProfilesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundSamlSsoProfiles" }),
  svc,
) as unknown as Schema.Schema<ListInboundSamlSsoProfilesRequest>;

export type ListInboundSamlSsoProfilesResponse_Op = ListInboundSamlSsoProfilesResponse;
export const ListInboundSamlSsoProfilesResponse_Op = ListInboundSamlSsoProfilesResponse;

export type ListInboundSamlSsoProfilesError = CommonErrors;

export const listInboundSamlSsoProfiles = API.makePaginated(() => ({
  input: ListInboundSamlSsoProfilesRequest,
  output: ListInboundSamlSsoProfilesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an IdpCredential. */
export interface DeleteInboundSamlSsoProfilesIdpCredentialsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the IdpCredential to delete. Format: `inboundSamlSsoProfiles/{sso_profile_id}/idpCredentials/{idp_credential_id}` */
  name: string;
}

export const DeleteInboundSamlSsoProfilesIdpCredentialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials/{idpCredentialsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundSamlSsoProfilesIdpCredentialsRequest>;

export type DeleteInboundSamlSsoProfilesIdpCredentialsResponse = Operation;
export const DeleteInboundSamlSsoProfilesIdpCredentialsResponse = Operation;

export type DeleteInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

export const deleteInboundSamlSsoProfilesIdpCredentials: API.OperationMethod<DeleteInboundSamlSsoProfilesIdpCredentialsRequest, DeleteInboundSamlSsoProfilesIdpCredentialsResponse, DeleteInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundSamlSsoProfilesIdpCredentialsRequest,
  output: DeleteInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
}));

/** Gets an IdpCredential. */
export interface GetInboundSamlSsoProfilesIdpCredentialsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the IdpCredential to retrieve. Format: `inboundSamlSsoProfiles/{sso_profile_id}/idpCredentials/{idp_credential_id}` */
  name: string;
}

export const GetInboundSamlSsoProfilesIdpCredentialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials/{idpCredentialsId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundSamlSsoProfilesIdpCredentialsRequest>;

export type GetInboundSamlSsoProfilesIdpCredentialsResponse = IdpCredential;
export const GetInboundSamlSsoProfilesIdpCredentialsResponse = IdpCredential;

export type GetInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

export const getInboundSamlSsoProfilesIdpCredentials: API.OperationMethod<GetInboundSamlSsoProfilesIdpCredentialsRequest, GetInboundSamlSsoProfilesIdpCredentialsResponse, GetInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundSamlSsoProfilesIdpCredentialsRequest,
  output: GetInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
}));

/** Returns a list of IdpCredentials in an InboundSamlSsoProfile. */
export interface ListInboundSamlSsoProfilesIdpCredentialsRequest {
  /** Required. The parent, which owns this collection of `IdpCredential`s. Format: `inboundSamlSsoProfiles/{sso_profile_id}` */
  parent: string;
  /** The maximum number of `IdpCredential`s to return. The service may return fewer than this value. */
  pageSize?: number;
  /** A page token, received from a previous `ListIdpCredentials` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIdpCredentials` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListInboundSamlSsoProfilesIdpCredentialsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials" }),
  svc,
) as unknown as Schema.Schema<ListInboundSamlSsoProfilesIdpCredentialsRequest>;

export type ListInboundSamlSsoProfilesIdpCredentialsResponse = ListIdpCredentialsResponse;
export const ListInboundSamlSsoProfilesIdpCredentialsResponse = ListIdpCredentialsResponse;

export type ListInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

export const listInboundSamlSsoProfilesIdpCredentials = API.makePaginated(() => ({
  input: ListInboundSamlSsoProfilesIdpCredentialsRequest,
  output: ListInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Adds an IdpCredential. Up to 2 credentials are allowed. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export interface AddInboundSamlSsoProfilesIdpCredentialsRequest {
  /** Required. The InboundSamlSsoProfile that owns the IdpCredential. Format: `inboundSamlSsoProfiles/{sso_profile_id}` */
  parent: string;
  /** Request body */
  body?: AddIdpCredentialRequest;
}

export const AddInboundSamlSsoProfilesIdpCredentialsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddIdpCredentialRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials:add", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddInboundSamlSsoProfilesIdpCredentialsRequest>;

export type AddInboundSamlSsoProfilesIdpCredentialsResponse = Operation;
export const AddInboundSamlSsoProfilesIdpCredentialsResponse = Operation;

export type AddInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

export const addInboundSamlSsoProfilesIdpCredentials: API.OperationMethod<AddInboundSamlSsoProfilesIdpCredentialsRequest, AddInboundSamlSsoProfilesIdpCredentialsResponse, AddInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddInboundSamlSsoProfilesIdpCredentialsRequest,
  output: AddInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
}));

/** Creates an InboundOidcSsoProfile for a customer. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export interface CreateInboundOidcSsoProfilesRequest {
  /** Request body */
  body?: InboundOidcSsoProfile;
}

export const CreateInboundOidcSsoProfilesRequest = Schema.Struct({
  body: Schema.optional(InboundOidcSsoProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/inboundOidcSsoProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInboundOidcSsoProfilesRequest>;

export type CreateInboundOidcSsoProfilesResponse = Operation;
export const CreateInboundOidcSsoProfilesResponse = Operation;

export type CreateInboundOidcSsoProfilesError = CommonErrors;

export const createInboundOidcSsoProfiles: API.OperationMethod<CreateInboundOidcSsoProfilesRequest, CreateInboundOidcSsoProfilesResponse, CreateInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInboundOidcSsoProfilesRequest,
  output: CreateInboundOidcSsoProfilesResponse,
  errors: [],
}));

/** Updates an InboundOidcSsoProfile. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export interface PatchInboundOidcSsoProfilesRequest {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the OIDC SSO profile. */
  name: string;
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: InboundOidcSsoProfile;
}

export const PatchInboundOidcSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InboundOidcSsoProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/inboundOidcSsoProfiles/{inboundOidcSsoProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInboundOidcSsoProfilesRequest>;

export type PatchInboundOidcSsoProfilesResponse = Operation;
export const PatchInboundOidcSsoProfilesResponse = Operation;

export type PatchInboundOidcSsoProfilesError = CommonErrors;

export const patchInboundOidcSsoProfiles: API.OperationMethod<PatchInboundOidcSsoProfilesRequest, PatchInboundOidcSsoProfilesResponse, PatchInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInboundOidcSsoProfilesRequest,
  output: PatchInboundOidcSsoProfilesResponse,
  errors: [],
}));

/** Deletes an InboundOidcSsoProfile. */
export interface DeleteInboundOidcSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundOidcSsoProfile to delete. Format: `inboundOidcSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const DeleteInboundOidcSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/inboundOidcSsoProfiles/{inboundOidcSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundOidcSsoProfilesRequest>;

export type DeleteInboundOidcSsoProfilesResponse = Operation;
export const DeleteInboundOidcSsoProfilesResponse = Operation;

export type DeleteInboundOidcSsoProfilesError = CommonErrors;

export const deleteInboundOidcSsoProfiles: API.OperationMethod<DeleteInboundOidcSsoProfilesRequest, DeleteInboundOidcSsoProfilesResponse, DeleteInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundOidcSsoProfilesRequest,
  output: DeleteInboundOidcSsoProfilesResponse,
  errors: [],
}));

/** Gets an InboundOidcSsoProfile. */
export interface GetInboundOidcSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundOidcSsoProfile to get. Format: `inboundOidcSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const GetInboundOidcSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundOidcSsoProfiles/{inboundOidcSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundOidcSsoProfilesRequest>;

export type GetInboundOidcSsoProfilesResponse = InboundOidcSsoProfile;
export const GetInboundOidcSsoProfilesResponse = InboundOidcSsoProfile;

export type GetInboundOidcSsoProfilesError = CommonErrors;

export const getInboundOidcSsoProfiles: API.OperationMethod<GetInboundOidcSsoProfilesRequest, GetInboundOidcSsoProfilesResponse, GetInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundOidcSsoProfilesRequest,
  output: GetInboundOidcSsoProfilesResponse,
  errors: [],
}));

/** Lists InboundOidcSsoProfile objects for a Google enterprise customer. */
export interface ListInboundOidcSsoProfilesRequest {
  /** A [Common Expression Language](https://github.com/google/cel-spec) expression to filter the results. The only supported filter is filtering by customer. For example: `customer=="customers/C0123abc"`. Omitting the filter or specifying a filter of `customer=="customers/my_customer"` will return the profiles for the customer that the caller (authenticated user) belongs to. Specifying a filter of `customer==""` will return the global shared OIDC profiles. */
  filter?: string;
  /** The maximum number of InboundOidcSsoProfiles to return. The service may return fewer than this value. If omitted (or defaulted to zero) the server will use a sensible default. This default may change over time. The maximum allowed value is 100. Requests with page_size greater than that will be silently interpreted as having this maximum value. */
  pageSize?: number;
  /** A page token, received from a previous `ListInboundOidcSsoProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInboundOidcSsoProfiles` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListInboundOidcSsoProfilesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundOidcSsoProfiles" }),
  svc,
) as unknown as Schema.Schema<ListInboundOidcSsoProfilesRequest>;

export type ListInboundOidcSsoProfilesResponse_Op = ListInboundOidcSsoProfilesResponse;
export const ListInboundOidcSsoProfilesResponse_Op = ListInboundOidcSsoProfilesResponse;

export type ListInboundOidcSsoProfilesError = CommonErrors;

export const listInboundOidcSsoProfiles = API.makePaginated(() => ({
  input: ListInboundOidcSsoProfilesRequest,
  output: ListInboundOidcSsoProfilesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an InboundSsoAssignment. */
export interface GetInboundSsoAssignmentsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSsoAssignment to fetch. Format: `inboundSsoAssignments/{assignment}` */
  name: string;
}

export const GetInboundSsoAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundSsoAssignments/{inboundSsoAssignmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundSsoAssignmentsRequest>;

export type GetInboundSsoAssignmentsResponse = InboundSsoAssignment;
export const GetInboundSsoAssignmentsResponse = InboundSsoAssignment;

export type GetInboundSsoAssignmentsError = CommonErrors;

export const getInboundSsoAssignments: API.OperationMethod<GetInboundSsoAssignmentsRequest, GetInboundSsoAssignmentsResponse, GetInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundSsoAssignmentsRequest,
  output: GetInboundSsoAssignmentsResponse,
  errors: [],
}));

/** Creates an InboundSsoAssignment for users and devices in a `Customer` under a given `Group` or `OrgUnit`. */
export interface CreateInboundSsoAssignmentsRequest {
  /** Request body */
  body?: InboundSsoAssignment;
}

export const CreateInboundSsoAssignmentsRequest = Schema.Struct({
  body: Schema.optional(InboundSsoAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/inboundSsoAssignments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInboundSsoAssignmentsRequest>;

export type CreateInboundSsoAssignmentsResponse = Operation;
export const CreateInboundSsoAssignmentsResponse = Operation;

export type CreateInboundSsoAssignmentsError = CommonErrors;

export const createInboundSsoAssignments: API.OperationMethod<CreateInboundSsoAssignmentsRequest, CreateInboundSsoAssignmentsResponse, CreateInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInboundSsoAssignmentsRequest,
  output: CreateInboundSsoAssignmentsResponse,
  errors: [],
}));

/** Updates an InboundSsoAssignment. The body of this request is the `inbound_sso_assignment` field and the `update_mask` is relative to that. For example: a PATCH to `/v1/inboundSsoAssignments/0abcdefg1234567&update_mask=rank` with a body of `{ "rank": 1 }` moves that (presumably group-targeted) SSO assignment to the highest priority and shifts any other group-targeted assignments down in priority. */
export interface PatchInboundSsoAssignmentsRequest {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Inbound SSO Assignment. */
  name: string;
  /** Required. The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: InboundSsoAssignment;
}

export const PatchInboundSsoAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(InboundSsoAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/inboundSsoAssignments/{inboundSsoAssignmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInboundSsoAssignmentsRequest>;

export type PatchInboundSsoAssignmentsResponse = Operation;
export const PatchInboundSsoAssignmentsResponse = Operation;

export type PatchInboundSsoAssignmentsError = CommonErrors;

export const patchInboundSsoAssignments: API.OperationMethod<PatchInboundSsoAssignmentsRequest, PatchInboundSsoAssignmentsResponse, PatchInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInboundSsoAssignmentsRequest,
  output: PatchInboundSsoAssignmentsResponse,
  errors: [],
}));

/** Deletes an InboundSsoAssignment. To disable SSO, Create (or Update) an assignment that has `sso_mode` == `SSO_OFF`. */
export interface DeleteInboundSsoAssignmentsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSsoAssignment to delete. Format: `inboundSsoAssignments/{assignment}` */
  name: string;
}

export const DeleteInboundSsoAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/inboundSsoAssignments/{inboundSsoAssignmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundSsoAssignmentsRequest>;

export type DeleteInboundSsoAssignmentsResponse = Operation;
export const DeleteInboundSsoAssignmentsResponse = Operation;

export type DeleteInboundSsoAssignmentsError = CommonErrors;

export const deleteInboundSsoAssignments: API.OperationMethod<DeleteInboundSsoAssignmentsRequest, DeleteInboundSsoAssignmentsResponse, DeleteInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundSsoAssignmentsRequest,
  output: DeleteInboundSsoAssignmentsResponse,
  errors: [],
}));

/** Lists the InboundSsoAssignments for a `Customer`. */
export interface ListInboundSsoAssignmentsRequest {
  /** A CEL expression to filter the results. The only supported filter is filtering by customer. For example: `customer==customers/C0123abc`. Omitting the filter or specifying a filter of `customer==customers/my_customer` will return the assignments for the customer that the caller (authenticated user) belongs to. */
  filter?: string;
  /** The maximum number of assignments to return. The service may return fewer than this value. If omitted (or defaulted to zero) the server will use a sensible default. This default may change over time. The maximum allowed value is 100, though requests with page_size greater than that will be silently interpreted as having this maximum value. This may increase in the futue. */
  pageSize?: number;
  /** A page token, received from a previous `ListInboundSsoAssignments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInboundSsoAssignments` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListInboundSsoAssignmentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/inboundSsoAssignments" }),
  svc,
) as unknown as Schema.Schema<ListInboundSsoAssignmentsRequest>;

export type ListInboundSsoAssignmentsResponse_Op = ListInboundSsoAssignmentsResponse;
export const ListInboundSsoAssignmentsResponse_Op = ListInboundSsoAssignmentsResponse;

export type ListInboundSsoAssignmentsError = CommonErrors;

export const listInboundSsoAssignments = API.makePaginated(() => ({
  input: ListInboundSsoAssignmentsRequest,
  output: ListInboundSsoAssignmentsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a policy. */
export interface GetPoliciesRequest {
  /** Required. The name of the policy to retrieve. Format: `policies/{policy}`. */
  name: string;
}

export const GetPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetPoliciesRequest>;

export type GetPoliciesResponse = Policy;
export const GetPoliciesResponse = Policy;

export type GetPoliciesError = CommonErrors;

export const getPolicies: API.OperationMethod<GetPoliciesRequest, GetPoliciesResponse, GetPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPoliciesRequest,
  output: GetPoliciesResponse,
  errors: [],
}));

/** List policies. */
export interface ListPoliciesRequest {
  /** Optional. The maximum number of results to return. The service can return fewer than this number. If omitted or set to 0, the default is 50 results per page. The maximum allowed value is 100. `page_size` values greater than 100 default to 100. */
  pageSize?: number;
  /** Optional. The pagination token received from a prior call to PoliciesService.ListPolicies to retrieve the next page of results. When paginating, all other parameters provided to `ListPoliciesRequest` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A CEL expression for filtering the results. Policies can be filtered by application with this expression: setting.type.matches('^settings/gmail\\..*$') Policies can be filtered by setting type with this expression: setting.type.matches('^.*\\.service_status$') A maximum of one of the above setting.type clauses can be used. Policies can be filtered by customer with this expression: customer == "customers/{customer}" Where `customer` is the `id` from the [Admin SDK `Customer` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). You may use `customers/my_customer` to specify your own organization. When no customer is mentioned it will be default to customers/my_customer. A maximum of one customer clause can be used. The above clauses can only be combined together in a single filter expression with the `&&` operator. */
  filter?: string;
}

export const ListPoliciesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/policies" }),
  svc,
) as unknown as Schema.Schema<ListPoliciesRequest>;

export type ListPoliciesResponse_Op = ListPoliciesResponse;
export const ListPoliciesResponse_Op = ListPoliciesResponse;

export type ListPoliciesError = CommonErrors;

export const listPolicies = API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a UserInvitation resource. **Note:** New consumer accounts with the customer's verified domain created within the previous 48 hours will not appear in the result. This delay also applies to newly-verified domains. */
export interface GetCustomersUserinvitationsRequest {
  /** Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}` */
  name: string;
}

export const GetCustomersUserinvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/userinvitations/{userinvitationsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersUserinvitationsRequest>;

export type GetCustomersUserinvitationsResponse = UserInvitation;
export const GetCustomersUserinvitationsResponse = UserInvitation;

export type GetCustomersUserinvitationsError = CommonErrors;

export const getCustomersUserinvitations: API.OperationMethod<GetCustomersUserinvitationsRequest, GetCustomersUserinvitationsResponse, GetCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersUserinvitationsRequest,
  output: GetCustomersUserinvitationsResponse,
  errors: [],
}));

/** Retrieves a list of UserInvitation resources. **Note:** New consumer accounts with the customer's verified domain created within the previous 48 hours will not appear in the result. This delay also applies to newly-verified domains. */
export interface ListCustomersUserinvitationsRequest {
  /** Required. The customer ID of the Google Workspace or Cloud Identity account the UserInvitation resources are associated with. */
  parent: string;
  /** Optional. The maximum number of UserInvitation resources to return. If unspecified, at most 100 resources will be returned. The maximum value is 200; values above 200 will be set to 200. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListUserInvitations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBooks` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A query string for filtering `UserInvitation` results by their current state, in the format: `"state=='invited'"`. */
  filter?: string;
  /** Optional. The sort order of the list results. You can sort the results in descending order based on either email or last update timestamp but not both, using `order_by="email desc"`. Currently, sorting is supported for `update_time asc`, `update_time desc`, `email asc`, and `email desc`. If not specified, results will be returned based on `email asc` order. */
  orderBy?: string;
}

export const ListCustomersUserinvitationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/userinvitations" }),
  svc,
) as unknown as Schema.Schema<ListCustomersUserinvitationsRequest>;

export type ListCustomersUserinvitationsResponse = ListUserInvitationsResponse;
export const ListCustomersUserinvitationsResponse = ListUserInvitationsResponse;

export type ListCustomersUserinvitationsError = CommonErrors;

export const listCustomersUserinvitations = API.makePaginated(() => ({
  input: ListCustomersUserinvitationsRequest,
  output: ListCustomersUserinvitationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sends a UserInvitation to email. If the `UserInvitation` does not exist for this request and it is a valid request, the request creates a `UserInvitation`. **Note:** The `get` and `list` methods have a 48-hour delay where newly-created consumer accounts will not appear in the results. You can still send a `UserInvitation` to those accounts if you know the unmanaged email address and IsInvitableUser==True. */
export interface SendCustomersUserinvitationsRequest {
  /** Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}` */
  name: string;
  /** Request body */
  body?: SendUserInvitationRequest;
}

export const SendCustomersUserinvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SendUserInvitationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/userinvitations/{userinvitationsId}:send", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendCustomersUserinvitationsRequest>;

export type SendCustomersUserinvitationsResponse = Operation;
export const SendCustomersUserinvitationsResponse = Operation;

export type SendCustomersUserinvitationsError = CommonErrors;

export const sendCustomersUserinvitations: API.OperationMethod<SendCustomersUserinvitationsRequest, SendCustomersUserinvitationsResponse, SendCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendCustomersUserinvitationsRequest,
  output: SendCustomersUserinvitationsResponse,
  errors: [],
}));

/** Cancels a UserInvitation that was already sent. */
export interface CancelCustomersUserinvitationsRequest {
  /** Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}` */
  name: string;
  /** Request body */
  body?: CancelUserInvitationRequest;
}

export const CancelCustomersUserinvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelUserInvitationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/userinvitations/{userinvitationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelCustomersUserinvitationsRequest>;

export type CancelCustomersUserinvitationsResponse = Operation;
export const CancelCustomersUserinvitationsResponse = Operation;

export type CancelCustomersUserinvitationsError = CommonErrors;

export const cancelCustomersUserinvitations: API.OperationMethod<CancelCustomersUserinvitationsRequest, CancelCustomersUserinvitationsResponse, CancelCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelCustomersUserinvitationsRequest,
  output: CancelCustomersUserinvitationsResponse,
  errors: [],
}));

/** Verifies whether a user account is eligible to receive a UserInvitation (is an unmanaged account). Eligibility is based on the following criteria: * the email address is a consumer account and it's the primary email address of the account, and * the domain of the email address matches an existing verified Google Workspace or Cloud Identity domain If both conditions are met, the user is eligible. **Note:** This method is not supported for Workspace Essentials customers. */
export interface IsInvitableUserCustomersUserinvitationsRequest {
  /** Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}` */
  name: string;
}

export const IsInvitableUserCustomersUserinvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/userinvitations/{userinvitationsId}:isInvitableUser" }),
  svc,
) as unknown as Schema.Schema<IsInvitableUserCustomersUserinvitationsRequest>;

export type IsInvitableUserCustomersUserinvitationsResponse = IsInvitableUserResponse;
export const IsInvitableUserCustomersUserinvitationsResponse = IsInvitableUserResponse;

export type IsInvitableUserCustomersUserinvitationsError = CommonErrors;

export const isInvitableUserCustomersUserinvitations: API.OperationMethod<IsInvitableUserCustomersUserinvitationsRequest, IsInvitableUserCustomersUserinvitationsResponse, IsInvitableUserCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IsInvitableUserCustomersUserinvitationsRequest,
  output: IsInvitableUserCustomersUserinvitationsResponse,
  errors: [],
}));

