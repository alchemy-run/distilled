// ==========================================================================
// Cloud Identity API (cloudidentity v1beta1)
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
  version: "v1beta1",
  rootUrl: "https://cloudidentity.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TransitiveMembershipRole {
  /** TransitiveMembershipRole in string format. Currently supported TransitiveMembershipRoles: `"MEMBER"`, `"OWNER"`, and `"MANAGER"`. */
  role?: string;
}

export const TransitiveMembershipRole: Schema.Schema<TransitiveMembershipRole> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "TransitiveMembershipRole" }) as any as Schema.Schema<TransitiveMembershipRole>;

export interface GoogleAppsCloudidentityDevicesV1DeviceUser {
  /** Compromised State of the DeviceUser object */
  compromisedState?: "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "NOT_COMPROMISED" | (string & {});
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the DeviceUser in format: `devices/{device}/deviceUsers/{device_user}`, where `device_user` uniquely identifies a user's use of a device. */
  name?: string;
  /** Output only. Most recent time when user registered with this service. */
  firstSyncTime?: string;
  /** Output only. User agent on the device for this specific user */
  userAgent?: string;
  /** Output only. Last time when user synced with policies. */
  lastSyncTime?: string;
  /** Output only. Management state of the user on the device. */
  managementState?: "MANAGEMENT_STATE_UNSPECIFIED" | "WIPING" | "WIPED" | "APPROVED" | "BLOCKED" | "PENDING_APPROVAL" | "UNENROLLED" | (string & {});
  /** Password state of the DeviceUser object */
  passwordState?: "PASSWORD_STATE_UNSPECIFIED" | "PASSWORD_SET" | "PASSWORD_NOT_SET" | (string & {});
  /** Email address of the user registered on the device. */
  userEmail?: string;
  /** Output only. Default locale used on device, in IETF BCP-47 format. */
  languageCode?: string;
  /** When the user first signed in to the device */
  createTime?: string;
}

export const GoogleAppsCloudidentityDevicesV1DeviceUser: Schema.Schema<GoogleAppsCloudidentityDevicesV1DeviceUser> = Schema.suspend(() => Schema.Struct({
  compromisedState: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  firstSyncTime: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  lastSyncTime: Schema.optional(Schema.String),
  managementState: Schema.optional(Schema.String),
  passwordState: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1DeviceUser" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1DeviceUser>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse>;

export interface BrowserInfo {
  /** Current state of [security event analysis](https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isSecurityEventAnalysisEnabled?: boolean;
  /** Version of the request initiating browser. E.g. `91.0.4442.4`. */
  browserVersion?: string;
  /** Current state of [file download analysis](https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isFileDownloadAnalysisEnabled?: boolean;
  /** Current state of [third-party blocking](https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled). */
  isThirdPartyBlockingEnabled?: boolean;
  /** Current state of [bulk data analysis](https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isBulkDataEntryAnalysisEnabled?: boolean;
  /** Current state of [built-in DNS client](https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled). */
  isBuiltInDnsClientEnabled?: boolean;
  /** Current state of [Safe Browsing protection level](https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel). */
  safeBrowsingProtectionLevel?: "SAFE_BROWSING_LEVEL_UNSPECIFIED" | "DISABLED" | "STANDARD" | "ENHANCED" | (string & {});
  /** Current state of [password protection trigger](https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger). */
  passwordProtectionWarningTrigger?: "PASSWORD_PROTECTION_TRIGGER_UNSPECIFIED" | "PROTECTION_OFF" | "PASSWORD_REUSE" | "PHISHING_REUSE" | (string & {});
  /** Deprecated: This field is not used for Chrome version 118 and later. Current state of [Chrome Cleanup](https://chromeenterprise.google/policies/#ChromeCleanupEnabled). */
  isChromeCleanupEnabled?: boolean;
  /** Current state of [file upload analysis](https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isFileUploadAnalysisEnabled?: boolean;
  /** Current state of [real-time URL check](https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty. */
  isRealtimeUrlCheckEnabled?: boolean;
  /** Current state of [site isolation](https://chromeenterprise.google/policies/?policy=IsolateOrigins). */
  isSiteIsolationEnabled?: boolean;
  /** Current state of [Chrome Remote Desktop app](https://chromeenterprise.google/policies/#URLBlocklist). */
  isChromeRemoteDesktopAppBlocked?: boolean;
  /** Output only. Browser's management state. */
  browserManagementState?: "UNSPECIFIED" | "UNMANAGED" | "MANAGED_BY_OTHER_DOMAIN" | "PROFILE_MANAGED" | "BROWSER_MANAGED" | (string & {});
}

export const BrowserInfo: Schema.Schema<BrowserInfo> = Schema.suspend(() => Schema.Struct({
  isSecurityEventAnalysisEnabled: Schema.optional(Schema.Boolean),
  browserVersion: Schema.optional(Schema.String),
  isFileDownloadAnalysisEnabled: Schema.optional(Schema.Boolean),
  isThirdPartyBlockingEnabled: Schema.optional(Schema.Boolean),
  isBulkDataEntryAnalysisEnabled: Schema.optional(Schema.Boolean),
  isBuiltInDnsClientEnabled: Schema.optional(Schema.Boolean),
  safeBrowsingProtectionLevel: Schema.optional(Schema.String),
  passwordProtectionWarningTrigger: Schema.optional(Schema.String),
  isChromeCleanupEnabled: Schema.optional(Schema.Boolean),
  isFileUploadAnalysisEnabled: Schema.optional(Schema.Boolean),
  isRealtimeUrlCheckEnabled: Schema.optional(Schema.Boolean),
  isSiteIsolationEnabled: Schema.optional(Schema.Boolean),
  isChromeRemoteDesktopAppBlocked: Schema.optional(Schema.Boolean),
  browserManagementState: Schema.optional(Schema.String),
})).annotate({ identifier: "BrowserInfo" }) as any as Schema.Schema<BrowserInfo>;

export interface BrowserAttributes {
  /** Chrome profile ID that is exposed by the Chrome API. It is unique for each device. */
  chromeProfileId?: string;
  /** Timestamp in milliseconds since the Unix epoch when the profile/gcm id was last synced. */
  lastProfileSyncTime?: string;
  /** Represents the current state of the [Chrome browser attributes](https://cloud.google.com/access-context-manager/docs/browser-attributes) sent by the [Endpoint Verification extension](https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1). */
  chromeBrowserInfo?: BrowserInfo;
}

export const BrowserAttributes: Schema.Schema<BrowserAttributes> = Schema.suspend(() => Schema.Struct({
  chromeProfileId: Schema.optional(Schema.String),
  lastProfileSyncTime: Schema.optional(Schema.String),
  chromeBrowserInfo: Schema.optional(BrowserInfo),
})).annotate({ identifier: "BrowserAttributes" }) as any as Schema.Schema<BrowserAttributes>;

export interface CertificateTemplate {
  /** The Major version of the template. Example: 100. */
  majorVersion?: number;
  /** The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047". */
  id?: string;
  /** The minor version of the template. Example: 12. */
  minorVersion?: number;
}

export const CertificateTemplate: Schema.Schema<CertificateTemplate> = Schema.suspend(() => Schema.Struct({
  majorVersion: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
  minorVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "CertificateTemplate" }) as any as Schema.Schema<CertificateTemplate>;

export interface CertificateAttributes {
  /** Serial number of the certificate, Example: "123456789". */
  serialNumber?: string;
  /** The certificate thumbprint. */
  thumbprint?: string;
  /** Validation state of this certificate. */
  validationState?: "CERTIFICATE_VALIDATION_STATE_UNSPECIFIED" | "VALIDATION_SUCCESSFUL" | "VALIDATION_FAILED" | (string & {});
  /** The subject name of this certificate. */
  subject?: string;
  /** The X.509 extension for CertificateTemplate. */
  certificateTemplate?: CertificateTemplate;
  /** The name of the issuer of this certificate. */
  issuer?: string;
  /** Certificate not valid before this timestamp. */
  validityStartTime?: string;
  /** Certificate not valid at or after this timestamp. */
  validityExpirationTime?: string;
  /** The encoded certificate fingerprint. */
  fingerprint?: string;
}

export const CertificateAttributes: Schema.Schema<CertificateAttributes> = Schema.suspend(() => Schema.Struct({
  serialNumber: Schema.optional(Schema.String),
  thumbprint: Schema.optional(Schema.String),
  validationState: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  certificateTemplate: Schema.optional(CertificateTemplate),
  issuer: Schema.optional(Schema.String),
  validityStartTime: Schema.optional(Schema.String),
  validityExpirationTime: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateAttributes" }) as any as Schema.Schema<CertificateAttributes>;

export interface EndpointVerificationSpecificAttributes {
  /** Details of browser profiles reported by Endpoint Verification. */
  browserAttributes?: Array<BrowserAttributes>;
  /** [Additional signals](https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: * Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. * [Configurable attributes](https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist. */
  additionalSignals?: Record<string, unknown>;
  /** Details of certificates. */
  certificateAttributes?: Array<CertificateAttributes>;
}

export const EndpointVerificationSpecificAttributes: Schema.Schema<EndpointVerificationSpecificAttributes> = Schema.suspend(() => Schema.Struct({
  browserAttributes: Schema.optional(Schema.Array(BrowserAttributes)),
  additionalSignals: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  certificateAttributes: Schema.optional(Schema.Array(CertificateAttributes)),
})).annotate({ identifier: "EndpointVerificationSpecificAttributes" }) as any as Schema.Schema<EndpointVerificationSpecificAttributes>;

export interface AndroidAttributes {
  /** Whether device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy. */
  supportsWorkProfile?: boolean;
  /** Whether the device passes Android CTS compliance. */
  ctsProfileMatch?: boolean;
  /** Whether any potentially harmful apps were detected on the device. */
  hasPotentiallyHarmfulApps?: boolean;
  /** Whether applications from unknown sources can be installed on device. */
  enabledUnknownSources?: boolean;
  /** Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles. */
  ownerProfileAccount?: boolean;
  /** Whether Google Play Protect Verify Apps is enabled. */
  verifyAppsEnabled?: boolean;
  /** Ownership privileges on device. */
  ownershipPrivilege?: "OWNERSHIP_PRIVILEGE_UNSPECIFIED" | "DEVICE_ADMINISTRATOR" | "PROFILE_OWNER" | "DEVICE_OWNER" | (string & {});
  /** Whether Android verified boot status is GREEN. */
  verifiedBoot?: boolean;
}

export const AndroidAttributes: Schema.Schema<AndroidAttributes> = Schema.suspend(() => Schema.Struct({
  supportsWorkProfile: Schema.optional(Schema.Boolean),
  ctsProfileMatch: Schema.optional(Schema.Boolean),
  hasPotentiallyHarmfulApps: Schema.optional(Schema.Boolean),
  enabledUnknownSources: Schema.optional(Schema.Boolean),
  ownerProfileAccount: Schema.optional(Schema.Boolean),
  verifyAppsEnabled: Schema.optional(Schema.Boolean),
  ownershipPrivilege: Schema.optional(Schema.String),
  verifiedBoot: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AndroidAttributes" }) as any as Schema.Schema<AndroidAttributes>;

export interface Device {
  /** Output only. Mobile or network operator of device, if available. */
  networkOperator?: string;
  /** Output only. Represents whether the Device is compromised. */
  compromisedState?: "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "UNCOMPROMISED" | (string & {});
  /** WiFi MAC addresses of device. */
  wifiMacAddresses?: Array<string>;
  /** Output only. Device bootloader version. Example: 0.6.7. */
  bootloaderVersion?: string;
  /** Output only. Whether USB debugging is enabled on device. */
  enabledUsbDebugging?: boolean;
  /** Most recent time when device synced with this service. */
  lastSyncTime?: string;
  /** Output only. Type of device. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "GOOGLE_SYNC" | "WINDOWS" | "MAC_OS" | "LINUX" | "CHROME_OS" | (string & {});
  /** Serial Number of device. Example: HT82V1A01076. */
  serialNumber?: string;
  /** Output only. Management state of the device */
  managementState?: "MANAGEMENT_STATE_UNSPECIFIED" | "APPROVED" | "BLOCKED" | "PENDING" | "UNPROVISIONED" | "WIPING" | "WIPED" | (string & {});
  /** Output only. Build number of the device. */
  buildNumber?: string;
  /** Output only. OS security patch update time on device. */
  securityPatchTime?: string;
  /** Output only. Device encryption state. */
  encryptionState?: "ENCRYPTION_STATE_UNSPECIFIED" | "UNSUPPORTED_BY_DEVICE" | "ENCRYPTED" | "NOT_ENCRYPTED" | (string & {});
  /** List of the clients the device is reporting to. */
  clientTypes?: Array<"CLIENT_TYPE_UNSPECIFIED" | "DRIVE_FS" | "FUNDAMENTAL" | "ENDPOINT_VERIFICATION" | "WINDOWS_ADVANCED" | "GOOGLE_CREDENTIALS_PROVIDER_FOR_WINDOWS" | (string & {})>;
  /** Output only. OS release version. Example: 6.0. */
  releaseVersion?: string;
  /** Asset tag of the device. */
  assetTag?: string;
  /** Output only. Kernel version of the device. */
  kernelVersion?: string;
  /** Output only. Unified device id of the device. */
  unifiedDeviceId?: string;
  /** Output only. Domain name for Google accounts on device. Type for other accounts on device. On Android, will only be populated if |ownership_privilege| is |PROFILE_OWNER| or |DEVICE_OWNER|. Does not include the account signed in to the device policy app if that account's domain has only one account. Examples: "com.example", "xyz.com". */
  otherAccounts?: Array<string>;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}`, where device_id is the unique id assigned to the Device. */
  name?: string;
  /** Output only. Baseband version of the device. */
  basebandVersion?: string;
  /** Output only. When the Company-Owned device was imported. This field is empty for BYOD devices. */
  createTime?: string;
  /** Output only. OS version of the device. Example: Android 8.1.0. */
  osVersion?: string;
  /** Output only. Device manufacturer. Example: Motorola. */
  manufacturer?: string;
  /** Output only. Model name of device. Example: Pixel 3. */
  model?: string;
  /** Output only. Whether developer options is enabled on device. */
  enabledDeveloperOptions?: boolean;
  /** Output only. Attributes specific to [Endpoint Verification](https://cloud.google.com/endpoint-verification/docs/overview) devices. */
  endpointVerificationSpecificAttributes?: EndpointVerificationSpecificAttributes;
  /** Output only. MEID number of device if CDMA device; empty otherwise. */
  meid?: string;
  /** Output only. IMEI number of device if GSM device; empty otherwise. */
  imei?: string;
  /** Output only. Device brand. Example: Samsung. */
  brand?: string;
  /** Output only. Whether the device is owned by the company or an individual */
  ownerType?: "DEVICE_OWNERSHIP_UNSPECIFIED" | "COMPANY" | "BYOD" | (string & {});
  /** Host name of the device. */
  hostname?: string;
  /** Unique identifier for the device. */
  deviceId?: string;
  /** Output only. Attributes specific to Android devices. */
  androidSpecificAttributes?: AndroidAttributes;
}

export const Device: Schema.Schema<Device> = Schema.suspend(() => Schema.Struct({
  networkOperator: Schema.optional(Schema.String),
  compromisedState: Schema.optional(Schema.String),
  wifiMacAddresses: Schema.optional(Schema.Array(Schema.String)),
  bootloaderVersion: Schema.optional(Schema.String),
  enabledUsbDebugging: Schema.optional(Schema.Boolean),
  lastSyncTime: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  managementState: Schema.optional(Schema.String),
  buildNumber: Schema.optional(Schema.String),
  securityPatchTime: Schema.optional(Schema.String),
  encryptionState: Schema.optional(Schema.String),
  clientTypes: Schema.optional(Schema.Array(Schema.String)),
  releaseVersion: Schema.optional(Schema.String),
  assetTag: Schema.optional(Schema.String),
  kernelVersion: Schema.optional(Schema.String),
  unifiedDeviceId: Schema.optional(Schema.String),
  otherAccounts: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  basebandVersion: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  enabledDeveloperOptions: Schema.optional(Schema.Boolean),
  endpointVerificationSpecificAttributes: Schema.optional(EndpointVerificationSpecificAttributes),
  meid: Schema.optional(Schema.String),
  imei: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  ownerType: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  androidSpecificAttributes: Schema.optional(AndroidAttributes),
})).annotate({ identifier: "Device" }) as any as Schema.Schema<Device>;

export interface ListDevicesResponse {
  /** Devices meeting the list restrictions. */
  devices?: Array<Device>;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const ListDevicesResponse: Schema.Schema<ListDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(Device)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDevicesResponse" }) as any as Schema.Schema<ListDevicesResponse>;

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

export interface ExpiryDetail {
  /** The time at which the `MembershipRole` will expire. */
  expireTime?: string;
}

export const ExpiryDetail: Schema.Schema<ExpiryDetail> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ExpiryDetail" }) as any as Schema.Schema<ExpiryDetail>;

export interface MembershipRole {
  /** Evaluations of restrictions applied to parent group on this membership. */
  restrictionEvaluations?: RestrictionEvaluations;
  /** The name of the `MembershipRole`. Must be one of `OWNER`, `MANAGER`, `MEMBER`. */
  name?: string;
  /** The expiry details of the `MembershipRole`. Expiry details are only supported for `MEMBER` `MembershipRoles`. May be set if `name` is `MEMBER`. Must not be set if `name` is any other value. */
  expiryDetail?: ExpiryDetail;
}

export const MembershipRole: Schema.Schema<MembershipRole> = Schema.suspend(() => Schema.Struct({
  restrictionEvaluations: Schema.optional(RestrictionEvaluations),
  name: Schema.optional(Schema.String),
  expiryDetail: Schema.optional(ExpiryDetail),
})).annotate({ identifier: "MembershipRole" }) as any as Schema.Schema<MembershipRole>;

export interface UpdateMembershipRolesParams {
  /** The fully-qualified names of fields to update. May only contain the field `expiry_detail.expire_time`. */
  fieldMask?: string;
  /** The `MembershipRole`s to be updated. Only `MEMBER` `MembershipRoles` can currently be updated. May only contain a `MembershipRole` with `name` `MEMBER`. */
  membershipRole?: MembershipRole;
}

export const UpdateMembershipRolesParams: Schema.Schema<UpdateMembershipRolesParams> = Schema.suspend(() => Schema.Struct({
  fieldMask: Schema.optional(Schema.String),
  membershipRole: Schema.optional(MembershipRole),
})).annotate({ identifier: "UpdateMembershipRolesParams" }) as any as Schema.Schema<UpdateMembershipRolesParams>;

export interface ModifyMembershipRolesRequest {
  /** The `name`s of the `MembershipRole`s to be removed. Adding or removing roles in the same request as updating roles is not supported. It is not possible to remove the `MEMBER` `MembershipRole`. If you wish to delete a `Membership`, call MembershipsService.DeleteMembership instead. Must not contain `MEMBER`. Must not be set if `update_roles_params` is set. */
  removeRoles?: Array<string>;
  /** The `MembershipRole`s to be updated. Updating roles in the same request as adding or removing roles is not supported. Must not be set if either `add_roles` or `remove_roles` is set. */
  updateRolesParams?: Array<UpdateMembershipRolesParams>;
  /** The `MembershipRole`s to be added. Adding or removing roles in the same request as updating roles is not supported. Must not be set if `update_roles_params` is set. */
  addRoles?: Array<MembershipRole>;
}

export const ModifyMembershipRolesRequest: Schema.Schema<ModifyMembershipRolesRequest> = Schema.suspend(() => Schema.Struct({
  removeRoles: Schema.optional(Schema.Array(Schema.String)),
  updateRolesParams: Schema.optional(Schema.Array(UpdateMembershipRolesParams)),
  addRoles: Schema.optional(Schema.Array(MembershipRole)),
})).annotate({ identifier: "ModifyMembershipRolesRequest" }) as any as Schema.Schema<ModifyMembershipRolesRequest>;

export interface GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1AndroidAttributes {
  /** Whether applications from unknown sources can be installed on device. */
  enabledUnknownSources?: boolean;
  /** Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles. */
  ownerProfileAccount?: boolean;
  /** Whether device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy. */
  supportsWorkProfile?: boolean;
  /** Whether the device passes Android CTS compliance. */
  ctsProfileMatch?: boolean;
  /** Whether any potentially harmful apps were detected on the device. */
  hasPotentiallyHarmfulApps?: boolean;
  /** Ownership privileges on device. */
  ownershipPrivilege?: "OWNERSHIP_PRIVILEGE_UNSPECIFIED" | "DEVICE_ADMINISTRATOR" | "PROFILE_OWNER" | "DEVICE_OWNER" | (string & {});
  /** Whether Android verified boot status is GREEN. */
  verifiedBoot?: boolean;
  /** Whether Google Play Protect Verify Apps is enabled. */
  verifyAppsEnabled?: boolean;
}

export const GoogleAppsCloudidentityDevicesV1AndroidAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1AndroidAttributes> = Schema.suspend(() => Schema.Struct({
  enabledUnknownSources: Schema.optional(Schema.Boolean),
  ownerProfileAccount: Schema.optional(Schema.Boolean),
  supportsWorkProfile: Schema.optional(Schema.Boolean),
  ctsProfileMatch: Schema.optional(Schema.Boolean),
  hasPotentiallyHarmfulApps: Schema.optional(Schema.Boolean),
  ownershipPrivilege: Schema.optional(Schema.String),
  verifiedBoot: Schema.optional(Schema.Boolean),
  verifyAppsEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1AndroidAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1AndroidAttributes>;

export interface GoogleAppsCloudidentityDevicesV1BrowserInfo {
  /** Version of the request initiating browser. E.g. `91.0.4442.4`. */
  browserVersion?: string;
  /** Current state of [file download analysis](https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isFileDownloadAnalysisEnabled?: boolean;
  /** Current state of [security event analysis](https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isSecurityEventAnalysisEnabled?: boolean;
  /** Current state of [third-party blocking](https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled). */
  isThirdPartyBlockingEnabled?: boolean;
  /** Current state of [bulk data analysis](https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isBulkDataEntryAnalysisEnabled?: boolean;
  /** Current state of [built-in DNS client](https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled). */
  isBuiltInDnsClientEnabled?: boolean;
  /** Current state of [Safe Browsing protection level](https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel). */
  safeBrowsingProtectionLevel?: "SAFE_BROWSING_LEVEL_UNSPECIFIED" | "DISABLED" | "STANDARD" | "ENHANCED" | (string & {});
  /** Deprecated: This field is not used for Chrome version 118 and later. Current state of [Chrome Cleanup](https://chromeenterprise.google/policies/#ChromeCleanupEnabled). */
  isChromeCleanupEnabled?: boolean;
  /** Current state of [password protection trigger](https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger). */
  passwordProtectionWarningTrigger?: "PASSWORD_PROTECTION_TRIGGER_UNSPECIFIED" | "PROTECTION_OFF" | "PASSWORD_REUSE" | "PHISHING_REUSE" | (string & {});
  /** Current state of [site isolation](https://chromeenterprise.google/policies/?policy=IsolateOrigins). */
  isSiteIsolationEnabled?: boolean;
  /** Current state of [Chrome Remote Desktop app](https://chromeenterprise.google/policies/#URLBlocklist). */
  isChromeRemoteDesktopAppBlocked?: boolean;
  /** Current state of [file upload analysis](https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. */
  isFileUploadAnalysisEnabled?: boolean;
  /** Current state of [real-time URL check](https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty. */
  isRealtimeUrlCheckEnabled?: boolean;
  /** Output only. Browser's management state. */
  browserManagementState?: "UNSPECIFIED" | "UNMANAGED" | "MANAGED_BY_OTHER_DOMAIN" | "PROFILE_MANAGED" | "BROWSER_MANAGED" | (string & {});
}

export const GoogleAppsCloudidentityDevicesV1BrowserInfo: Schema.Schema<GoogleAppsCloudidentityDevicesV1BrowserInfo> = Schema.suspend(() => Schema.Struct({
  browserVersion: Schema.optional(Schema.String),
  isFileDownloadAnalysisEnabled: Schema.optional(Schema.Boolean),
  isSecurityEventAnalysisEnabled: Schema.optional(Schema.Boolean),
  isThirdPartyBlockingEnabled: Schema.optional(Schema.Boolean),
  isBulkDataEntryAnalysisEnabled: Schema.optional(Schema.Boolean),
  isBuiltInDnsClientEnabled: Schema.optional(Schema.Boolean),
  safeBrowsingProtectionLevel: Schema.optional(Schema.String),
  isChromeCleanupEnabled: Schema.optional(Schema.Boolean),
  passwordProtectionWarningTrigger: Schema.optional(Schema.String),
  isSiteIsolationEnabled: Schema.optional(Schema.Boolean),
  isChromeRemoteDesktopAppBlocked: Schema.optional(Schema.Boolean),
  isFileUploadAnalysisEnabled: Schema.optional(Schema.Boolean),
  isRealtimeUrlCheckEnabled: Schema.optional(Schema.Boolean),
  browserManagementState: Schema.optional(Schema.String),
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

export interface GoogleAppsCloudidentityDevicesV1CertificateTemplate {
  /** The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047". */
  id?: string;
  /** The minor version of the template. Example: 12. */
  minorVersion?: number;
  /** The Major version of the template. Example: 100. */
  majorVersion?: number;
}

export const GoogleAppsCloudidentityDevicesV1CertificateTemplate: Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateTemplate> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  minorVersion: Schema.optional(Schema.Number),
  majorVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CertificateTemplate" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateTemplate>;

export interface GoogleAppsCloudidentityDevicesV1CertificateAttributes {
  /** The encoded certificate fingerprint. */
  fingerprint?: string;
  /** Certificate not valid at or after this timestamp. */
  validityExpirationTime?: string;
  /** The name of the issuer of this certificate. */
  issuer?: string;
  /** Certificate not valid before this timestamp. */
  validityStartTime?: string;
  /** The certificate thumbprint. */
  thumbprint?: string;
  /** Output only. Validation state of this certificate. */
  validationState?: "CERTIFICATE_VALIDATION_STATE_UNSPECIFIED" | "VALIDATION_SUCCESSFUL" | "VALIDATION_FAILED" | (string & {});
  /** The subject name of this certificate. */
  subject?: string;
  /** The X.509 extension for CertificateTemplate. */
  certificateTemplate?: GoogleAppsCloudidentityDevicesV1CertificateTemplate;
  /** Serial number of the certificate, Example: "123456789". */
  serialNumber?: string;
}

export const GoogleAppsCloudidentityDevicesV1CertificateAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateAttributes> = Schema.suspend(() => Schema.Struct({
  fingerprint: Schema.optional(Schema.String),
  validityExpirationTime: Schema.optional(Schema.String),
  issuer: Schema.optional(Schema.String),
  validityStartTime: Schema.optional(Schema.String),
  thumbprint: Schema.optional(Schema.String),
  validationState: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  certificateTemplate: Schema.optional(GoogleAppsCloudidentityDevicesV1CertificateTemplate),
  serialNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CertificateAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CertificateAttributes>;

export interface GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes {
  /** Details of browser profiles reported by Endpoint Verification. */
  browserAttributes?: Array<GoogleAppsCloudidentityDevicesV1BrowserAttributes>;
  /** [Additional signals](https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: * Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. * [Configurable attributes](https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist. */
  additionalSignals?: Record<string, unknown>;
  /** Details of certificates. */
  certificateAttributes?: Array<GoogleAppsCloudidentityDevicesV1CertificateAttributes>;
}

export const GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes: Schema.Schema<GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes> = Schema.suspend(() => Schema.Struct({
  browserAttributes: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1BrowserAttributes)),
  additionalSignals: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  certificateAttributes: Schema.optional(Schema.Array(GoogleAppsCloudidentityDevicesV1CertificateAttributes)),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes>;

export interface GoogleAppsCloudidentityDevicesV1Device {
  /** Output only. Kernel version of the device. */
  kernelVersion?: string;
  /** Output only. Unified device id of the device. */
  unifiedDeviceId?: string;
  /** Output only. Domain name for Google accounts on device. Type for other accounts on device. On Android, will only be populated if |ownership_privilege| is |PROFILE_OWNER| or |DEVICE_OWNER|. Does not include the account signed in to the device policy app if that account's domain has only one account. Examples: "com.example", "xyz.com". */
  otherAccounts?: Array<string>;
  /** Output only. Build number of the device. */
  buildNumber?: string;
  /** Output only. OS security patch update time on device. */
  securityPatchTime?: string;
  /** Output only. Device encryption state. */
  encryptionState?: "ENCRYPTION_STATE_UNSPECIFIED" | "UNSUPPORTED_BY_DEVICE" | "ENCRYPTED" | "NOT_ENCRYPTED" | (string & {});
  /** Asset tag of the device. */
  assetTag?: string;
  /** Output only. OS release version. Example: 6.0. */
  releaseVersion?: string;
  /** Most recent time when device synced with this service. */
  lastSyncTime?: string;
  /** Output only. Type of device. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "GOOGLE_SYNC" | "WINDOWS" | "MAC_OS" | "LINUX" | "CHROME_OS" | (string & {});
  /** Serial Number of device. Example: HT82V1A01076. */
  serialNumber?: string;
  /** Output only. Management state of the device */
  managementState?: "MANAGEMENT_STATE_UNSPECIFIED" | "APPROVED" | "BLOCKED" | "PENDING" | "UNPROVISIONED" | "WIPING" | "WIPED" | (string & {});
  /** Output only. Whether USB debugging is enabled on device. */
  enabledUsbDebugging?: boolean;
  /** WiFi MAC addresses of device. */
  wifiMacAddresses?: Array<string>;
  /** Output only. Mobile or network operator of device, if available. */
  networkOperator?: string;
  /** Output only. Represents whether the Device is compromised. */
  compromisedState?: "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "UNCOMPROMISED" | (string & {});
  /** Output only. Device bootloader version. Example: 0.6.7. */
  bootloaderVersion?: string;
  /** Output only. IMEI number of device if GSM device; empty otherwise. */
  imei?: string;
  /** Output only. Device brand. Example: Samsung. */
  brand?: string;
  /** Output only. MEID number of device if CDMA device; empty otherwise. */
  meid?: string;
  /** Unique identifier for the device. */
  deviceId?: string;
  /** Output only. Attributes specific to Android devices. */
  androidSpecificAttributes?: GoogleAppsCloudidentityDevicesV1AndroidAttributes;
  /** Output only. Whether the device is owned by the company or an individual */
  ownerType?: "DEVICE_OWNERSHIP_UNSPECIFIED" | "COMPANY" | "BYOD" | (string & {});
  /** Host name of the device. */
  hostname?: string;
  /** Output only. Device manufacturer. Example: Motorola. */
  manufacturer?: string;
  /** Output only. Model name of device. Example: Pixel 3. */
  model?: string;
  /** Output only. Whether developer options is enabled on device. */
  enabledDeveloperOptions?: boolean;
  /** Output only. OS version of the device. Example: Android 8.1.0. */
  osVersion?: string;
  /** Output only. Attributes specific to [Endpoint Verification](https://cloud.google.com/endpoint-verification/docs/overview) devices. */
  endpointVerificationSpecificAttributes?: GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes;
  /** Output only. Baseband version of the device. */
  basebandVersion?: string;
  /** Output only. When the Company-Owned device was imported. This field is empty for BYOD devices. */
  createTime?: string;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique id assigned to the Device. Important: Device API scopes require that you use domain-wide delegation to access the API. For more information, see [Set up the Devices API](https://cloud.google.com/identity/docs/how-to/setup-devices). */
  name?: string;
}

export const GoogleAppsCloudidentityDevicesV1Device: Schema.Schema<GoogleAppsCloudidentityDevicesV1Device> = Schema.suspend(() => Schema.Struct({
  kernelVersion: Schema.optional(Schema.String),
  unifiedDeviceId: Schema.optional(Schema.String),
  otherAccounts: Schema.optional(Schema.Array(Schema.String)),
  buildNumber: Schema.optional(Schema.String),
  securityPatchTime: Schema.optional(Schema.String),
  encryptionState: Schema.optional(Schema.String),
  assetTag: Schema.optional(Schema.String),
  releaseVersion: Schema.optional(Schema.String),
  lastSyncTime: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  managementState: Schema.optional(Schema.String),
  enabledUsbDebugging: Schema.optional(Schema.Boolean),
  wifiMacAddresses: Schema.optional(Schema.Array(Schema.String)),
  networkOperator: Schema.optional(Schema.String),
  compromisedState: Schema.optional(Schema.String),
  bootloaderVersion: Schema.optional(Schema.String),
  imei: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  androidSpecificAttributes: Schema.optional(GoogleAppsCloudidentityDevicesV1AndroidAttributes),
  ownerType: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  enabledDeveloperOptions: Schema.optional(Schema.Boolean),
  osVersion: Schema.optional(Schema.String),
  endpointVerificationSpecificAttributes: Schema.optional(GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes),
  basebandVersion: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1Device" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1Device>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceResponse {
  /** Resultant Device object for the action. Note that asset tags will not be returned in the device object. */
  device?: GoogleAppsCloudidentityDevicesV1Device;
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(GoogleAppsCloudidentityDevicesV1Device),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceResponse>;

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

export interface DeleteInboundOidcSsoProfileOperationMetadata {
}

export const DeleteInboundOidcSsoProfileOperationMetadata: Schema.Schema<DeleteInboundOidcSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteInboundOidcSsoProfileOperationMetadata" }) as any as Schema.Schema<DeleteInboundOidcSsoProfileOperationMetadata>;

export interface EntityKey {
  /** The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source_id}`. */
  namespace?: string;
  /** The ID of the entity. For Google-managed entities, the `id` must be the email address of an existing group or user. For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. */
  id?: string;
}

export const EntityKey: Schema.Schema<EntityKey> = Schema.suspend(() => Schema.Struct({
  namespace: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "EntityKey" }) as any as Schema.Schema<EntityKey>;

export interface MemberRelation {
  /** Resource name for this member. */
  member?: string;
  /** The membership role details (i.e name of role and expiry time). */
  roles?: Array<TransitiveMembershipRole>;
  /** Entity key has an id and a namespace. In case of discussion forums, the id will be an email address without a namespace. */
  preferredMemberKey?: Array<EntityKey>;
  /** The relation between the group and the transitive membership. */
  relationType?: "RELATION_TYPE_UNSPECIFIED" | "DIRECT" | "INDIRECT" | "DIRECT_AND_INDIRECT" | (string & {});
}

export const MemberRelation: Schema.Schema<MemberRelation> = Schema.suspend(() => Schema.Struct({
  member: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(TransitiveMembershipRole)),
  preferredMemberKey: Schema.optional(Schema.Array(EntityKey)),
  relationType: Schema.optional(Schema.String),
})).annotate({ identifier: "MemberRelation" }) as any as Schema.Schema<MemberRelation>;

export interface SearchTransitiveMembershipsResponse {
  /** List of transitive memberships satisfying the query. */
  memberships?: Array<MemberRelation>;
  /** Token to retrieve the next page of results, or empty if there are no more results. */
  nextPageToken?: string;
}

export const SearchTransitiveMembershipsResponse: Schema.Schema<SearchTransitiveMembershipsResponse> = Schema.suspend(() => Schema.Struct({
  memberships: Schema.optional(Schema.Array(MemberRelation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchTransitiveMembershipsResponse" }) as any as Schema.Schema<SearchTransitiveMembershipsResponse>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata>;

export interface SamlIdpConfig {
  /** The **Logout Redirect URL** (sign-out page URL) of the identity provider. When a user clicks the sign-out link on a Google page, they will be redirected to this URL. This is a pure redirect with no attached SAML `LogoutRequest` i.e. SAML single logout is not supported. Must use `HTTPS`. */
  logoutRedirectUri?: string;
  /** Required. The `SingleSignOnService` endpoint location (sign-in page URL) of the identity provider. This is the URL where the `AuthnRequest` will be sent. Must use `HTTPS`. Assumed to accept the `HTTP-Redirect` binding. */
  singleSignOnServiceUri?: string;
  /** The **Change Password URL** of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`. */
  changePasswordUri?: string;
  /** Required. The SAML **Entity ID** of the identity provider. */
  entityId?: string;
}

export const SamlIdpConfig: Schema.Schema<SamlIdpConfig> = Schema.suspend(() => Schema.Struct({
  logoutRedirectUri: Schema.optional(Schema.String),
  singleSignOnServiceUri: Schema.optional(Schema.String),
  changePasswordUri: Schema.optional(Schema.String),
  entityId: Schema.optional(Schema.String),
})).annotate({ identifier: "SamlIdpConfig" }) as any as Schema.Schema<SamlIdpConfig>;

export interface SendUserInvitationRequest {
}

export const SendUserInvitationRequest: Schema.Schema<SendUserInvitationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SendUserInvitationRequest" }) as any as Schema.Schema<SendUserInvitationRequest>;

export interface DeviceUser {
  /** Output only. Management state of the user on the device. */
  managementState?: "MANAGEMENT_STATE_UNSPECIFIED" | "WIPING" | "WIPED" | "APPROVED" | "BLOCKED" | "PENDING_APPROVAL" | "UNENROLLED" | (string & {});
  /** Password state of the DeviceUser object */
  passwordState?: "PASSWORD_STATE_UNSPECIFIED" | "PASSWORD_SET" | "PASSWORD_NOT_SET" | (string & {});
  /** Output only. Last time when user synced with policies. */
  lastSyncTime?: string;
  /** When the user first signed in to the device */
  createTime?: string;
  /** Email address of the user registered on the device. */
  userEmail?: string;
  /** Output only. Default locale used on device, in IETF BCP-47 format. */
  languageCode?: string;
  /** Compromised State of the DeviceUser object */
  compromisedState?: "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "NOT_COMPROMISED" | (string & {});
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the DeviceUser in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where `device_user_id` uniquely identifies a user's use of a device. */
  name?: string;
  /** Output only. Most recent time when user registered with this service. */
  firstSyncTime?: string;
  /** Output only. User agent on the device for this specific user */
  userAgent?: string;
}

export const DeviceUser: Schema.Schema<DeviceUser> = Schema.suspend(() => Schema.Struct({
  managementState: Schema.optional(Schema.String),
  passwordState: Schema.optional(Schema.String),
  lastSyncTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  compromisedState: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  firstSyncTime: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceUser" }) as any as Schema.Schema<DeviceUser>;

export interface ApproveDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: DeviceUser;
}

export const ApproveDeviceUserResponse: Schema.Schema<ApproveDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(DeviceUser),
})).annotate({ identifier: "ApproveDeviceUserResponse" }) as any as Schema.Schema<ApproveDeviceUserResponse>;

export interface WipeDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const WipeDeviceUserRequest: Schema.Schema<WipeDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "WipeDeviceUserRequest" }) as any as Schema.Schema<WipeDeviceUserRequest>;

export interface GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata>;

export interface LookupMembershipNameResponse {
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the looked-up `Membership`. Must be of the form `groups/{group_id}/memberships/{membership_id}`. */
  name?: string;
}

export const LookupMembershipNameResponse: Schema.Schema<LookupMembershipNameResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupMembershipNameResponse" }) as any as Schema.Schema<LookupMembershipNameResponse>;

export interface GroupRelation {
  /** Entity key has an id and a namespace. In case of discussion forums, the id will be an email address without a namespace. */
  groupKey?: EntityKey;
  /** The relation between the member and the transitive group. */
  relationType?: "RELATION_TYPE_UNSPECIFIED" | "DIRECT" | "INDIRECT" | "DIRECT_AND_INDIRECT" | (string & {});
  /** Labels for Group resource. */
  labels?: Record<string, string>;
  /** Resource name for this group. */
  group?: string;
  /** Display name for this group. */
  displayName?: string;
  /** Membership roles of the member for the group. */
  roles?: Array<TransitiveMembershipRole>;
}

export const GroupRelation: Schema.Schema<GroupRelation> = Schema.suspend(() => Schema.Struct({
  groupKey: Schema.optional(EntityKey),
  relationType: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  group: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(TransitiveMembershipRole)),
})).annotate({ identifier: "GroupRelation" }) as any as Schema.Schema<GroupRelation>;

export interface WipeDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: DeviceUser;
}

export const WipeDeviceUserResponse: Schema.Schema<WipeDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(DeviceUser),
})).annotate({ identifier: "WipeDeviceUserResponse" }) as any as Schema.Schema<WipeDeviceUserResponse>;

export interface Membership {
  /** The `MembershipRole`s that apply to the `Membership`. If unspecified, defaults to a single `MembershipRole` with `name` `MEMBER`. Must not contain duplicate `MembershipRole`s with the same `name`. */
  roles?: Array<MembershipRole>;
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group_id}/memberships/{membership_id}`. */
  name?: string;
  /** Output only. The time when the `Membership` was created. */
  createTime?: string;
  /** Output only. The type of the membership. */
  type?: "TYPE_UNSPECIFIED" | "USER" | "SERVICE_ACCOUNT" | "GROUP" | "SHARED_DRIVE" | "CBCM_BROWSER" | "OTHER" | (string & {});
  /** Output only. Delivery setting associated with the membership. */
  deliverySetting?: "DELIVERY_SETTING_UNSPECIFIED" | "ALL_MAIL" | "DIGEST" | "DAILY" | "NONE" | "DISABLED" | (string & {});
  /** Immutable. The `EntityKey` of the member. Either `member_key` or `preferred_member_key` must be set when calling MembershipsService.CreateMembership but not both; both shall be set when returned. */
  memberKey?: EntityKey;
  /** Output only. The time when the `Membership` was last updated. */
  updateTime?: string;
  /** Required. Immutable. The `EntityKey` of the member. Either `member_key` or `preferred_member_key` must be set when calling MembershipsService.CreateMembership but not both; both shall be set when returned. */
  preferredMemberKey?: EntityKey;
}

export const Membership: Schema.Schema<Membership> = Schema.suspend(() => Schema.Struct({
  roles: Schema.optional(Schema.Array(MembershipRole)),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  deliverySetting: Schema.optional(Schema.String),
  memberKey: Schema.optional(EntityKey),
  updateTime: Schema.optional(Schema.String),
  preferredMemberKey: Schema.optional(EntityKey),
})).annotate({ identifier: "Membership" }) as any as Schema.Schema<Membership>;

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

export interface PosixGroup {
  /** Name of the POSIX group. */
  name?: string;
  /** GID of the POSIX group. */
  gid?: string;
  /** System identifier for which group name and gid apply to. If not specified it will default to empty value. */
  systemId?: string;
}

export const PosixGroup: Schema.Schema<PosixGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  gid: Schema.optional(Schema.String),
  systemId: Schema.optional(Schema.String),
})).annotate({ identifier: "PosixGroup" }) as any as Schema.Schema<PosixGroup>;

export interface DynamicGroupQuery {
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "USER" | (string & {});
  /** Query that determines the memberships of the dynamic group. Examples: All users with at least one `organizations.department` of engineering. `user.organizations.exists(org, org.department=='engineering')` All users with at least one location that has `area` of `foo` and `building_id` of `bar`. `user.locations.exists(loc, loc.area=='foo' && loc.building_id=='bar')` All users with any variation of the name John Doe (case-insensitive queries add `equalsIgnoreCase()` to the value being queried). `user.name.value.equalsIgnoreCase('jOhn DoE')` */
  query?: string;
}

export const DynamicGroupQuery: Schema.Schema<DynamicGroupQuery> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "DynamicGroupQuery" }) as any as Schema.Schema<DynamicGroupQuery>;

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
  /** Optional. The POSIX groups associated with the `Group`. */
  posixGroups?: Array<PosixGroup>;
  /** An extended description to help users determine the purpose of a `Group`. Must not be longer than 4,096 characters. */
  description?: string;
  /** Output only. Additional group keys associated with the Group. */
  additionalGroupKeys?: Array<EntityKey>;
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group_id}`. */
  name?: string;
  /** Required. The `EntityKey` of the `Group`. */
  groupKey?: EntityKey;
  /** Output only. The time when the `Group` was last updated. */
  updateTime?: string;
  /** Optional. Dynamic group metadata like queries and status. */
  dynamicGroupMetadata?: DynamicGroupMetadata;
  /** Required. Immutable. The resource name of the entity under which this `Group` resides in the Cloud Identity resource hierarchy. Must be of the form `identitysources/{identity_source}` for external [identity-mapped groups](https://support.google.com/a/answer/9039510) or `customers/{customer_id}` for Google Groups. The `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your customer ID.] (https://support.google.com/cloudidentity/answer/10070793) */
  parent?: string;
  /** Output only. The time when the `Group` was created. */
  createTime?: string;
  /** Required. One or more label entries that apply to the Group. Labels contain a key with an empty value. Google Groups are the default type of group and have a label with a key of `cloudidentity.googleapis.com/groups.discussion_forum` and an empty value. Existing Google Groups can have an additional label with a key of `cloudidentity.googleapis.com/groups.security` and an empty value added to them. **This is an immutable change and the security label cannot be removed once added.** Dynamic groups have a label with a key of `cloudidentity.googleapis.com/groups.dynamic`. Identity-mapped groups for Cloud Search have a label with a key of `system/groups/external` and an empty value. Google Groups can be [locked](https://support.google.com/a?p=locked-groups). To lock a group, add a label with a key of `cloudidentity.googleapis.com/groups.locked` and an empty value. Doing so locks the group. To unlock the group, remove this label. */
  labels?: Record<string, string>;
  /** The display name of the `Group`. */
  displayName?: string;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  posixGroups: Schema.optional(Schema.Array(PosixGroup)),
  description: Schema.optional(Schema.String),
  additionalGroupKeys: Schema.optional(Schema.Array(EntityKey)),
  name: Schema.optional(Schema.String),
  groupKey: Schema.optional(EntityKey),
  updateTime: Schema.optional(Schema.String),
  dynamicGroupMetadata: Schema.optional(DynamicGroupMetadata),
  parent: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

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

export interface CustomAttributeValue {
  /** Represents a boolean value. */
  boolValue?: boolean;
  /** Represents a double value. */
  numberValue?: number;
  /** Represents a string value. */
  stringValue?: string;
}

export const CustomAttributeValue: Schema.Schema<CustomAttributeValue> = Schema.suspend(() => Schema.Struct({
  boolValue: Schema.optional(Schema.Boolean),
  numberValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomAttributeValue" }) as any as Schema.Schema<CustomAttributeValue>;

export interface ClientState {
  /** The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest */
  etag?: string;
  /** A descriptive cause of the health score. */
  scoreReason?: string;
  /** The management state of the resource as specified by the API client. */
  managed?: "MANAGED_STATE_UNSPECIFIED" | "MANAGED" | "UNMANAGED" | (string & {});
  /** Output only. The time the client state data was last updated. */
  lastUpdateTime?: string;
  /** Output only. The owner of the ClientState */
  ownerType?: "OWNER_TYPE_UNSPECIFIED" | "OWNER_TYPE_CUSTOMER" | "OWNER_TYPE_PARTNER" | (string & {});
  /** Output only. The time the client state data was created. */
  createTime?: string;
  /** This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field. */
  customId?: string;
  /** The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map. */
  keyValuePairs?: Record<string, CustomAttributeValue>;
  /** The caller can specify asset tags for this resource */
  assetTags?: Array<string>;
  /** The Health score of the resource */
  healthScore?: "HEALTH_SCORE_UNSPECIFIED" | "VERY_POOR" | "POOR" | "NEUTRAL" | "GOOD" | "VERY_GOOD" | (string & {});
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device_id}/deviceUsers/{device_user_id}/clientState/{partner_id}`, where partner_id corresponds to the partner storing the data. */
  name?: string;
  /** The compliance state of the resource as specified by the API client. */
  complianceState?: "COMPLIANCE_STATE_UNSPECIFIED" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
}

export const ClientState: Schema.Schema<ClientState> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  scoreReason: Schema.optional(Schema.String),
  managed: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  ownerType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  customId: Schema.optional(Schema.String),
  keyValuePairs: Schema.optional(Schema.Record(Schema.String, CustomAttributeValue)),
  assetTags: Schema.optional(Schema.Array(Schema.String)),
  healthScore: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  complianceState: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientState" }) as any as Schema.Schema<ClientState>;

export interface ListClientStatesResponse {
  /** Client states meeting the list restrictions. */
  clientStates?: Array<ClientState>;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const ListClientStatesResponse: Schema.Schema<ListClientStatesResponse> = Schema.suspend(() => Schema.Struct({
  clientStates: Schema.optional(Schema.Array(ClientState)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientStatesResponse" }) as any as Schema.Schema<ListClientStatesResponse>;

export interface CheckTransitiveMembershipResponse {
  /** Response does not include the possible roles of a member since the behavior of this rpc is not all-or-nothing unlike the other rpcs. So, it may not be possible to list all the roles definitively, due to possible lack of authorization in some of the paths. */
  hasMembership?: boolean;
}

export const CheckTransitiveMembershipResponse: Schema.Schema<CheckTransitiveMembershipResponse> = Schema.suspend(() => Schema.Struct({
  hasMembership: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckTransitiveMembershipResponse" }) as any as Schema.Schema<CheckTransitiveMembershipResponse>;

export interface WipeDeviceResponse {
  /** Resultant Device object for the action. Note that asset tags will not be returned in the device object. */
  device?: Device;
}

export const WipeDeviceResponse: Schema.Schema<WipeDeviceResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(Device),
})).annotate({ identifier: "WipeDeviceResponse" }) as any as Schema.Schema<WipeDeviceResponse>;

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

export interface AddIdpCredentialRequest {
  /** PEM encoded x509 certificate containing the public key for verifying IdP signatures. */
  pemData?: string;
}

export const AddIdpCredentialRequest: Schema.Schema<AddIdpCredentialRequest> = Schema.suspend(() => Schema.Struct({
  pemData: Schema.optional(Schema.String),
})).annotate({ identifier: "AddIdpCredentialRequest" }) as any as Schema.Schema<AddIdpCredentialRequest>;

export interface InboundSamlSsoProfile {
  /** Immutable. The customer. For example: `customers/C0123abc`. */
  customer?: string;
  /** SAML identity provider configuration. */
  idpConfig?: SamlIdpConfig;
  /** SAML service provider configuration for this SAML SSO profile. These are the service provider details provided by Google that should be configured on the corresponding identity provider. */
  spConfig?: SamlSpConfig;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the SAML SSO profile. */
  name?: string;
  /** Human-readable name of the SAML SSO profile. */
  displayName?: string;
}

export const InboundSamlSsoProfile: Schema.Schema<InboundSamlSsoProfile> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  idpConfig: Schema.optional(SamlIdpConfig),
  spConfig: Schema.optional(SamlSpConfig),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "InboundSamlSsoProfile" }) as any as Schema.Schema<InboundSamlSsoProfile>;

export interface ListInboundSamlSsoProfilesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** List of InboundSamlSsoProfiles. */
  inboundSamlSsoProfiles?: Array<InboundSamlSsoProfile>;
}

export const ListInboundSamlSsoProfilesResponse: Schema.Schema<ListInboundSamlSsoProfilesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  inboundSamlSsoProfiles: Schema.optional(Schema.Array(InboundSamlSsoProfile)),
})).annotate({ identifier: "ListInboundSamlSsoProfilesResponse" }) as any as Schema.Schema<ListInboundSamlSsoProfilesResponse>;

export interface GoogleAppsCloudidentityDevicesV1CustomAttributeValue {
  /** Represents a boolean value. */
  boolValue?: boolean;
  /** Represents a string value. */
  stringValue?: string;
  /** Represents a double value. */
  numberValue?: number;
}

export const GoogleAppsCloudidentityDevicesV1CustomAttributeValue: Schema.Schema<GoogleAppsCloudidentityDevicesV1CustomAttributeValue> = Schema.suspend(() => Schema.Struct({
  boolValue: Schema.optional(Schema.Boolean),
  stringValue: Schema.optional(Schema.String),
  numberValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CustomAttributeValue" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CustomAttributeValue>;

export interface OidcRpConfig {
  /** Input only. OAuth2 client secret for OIDC. */
  clientSecret?: string;
  /** Output only. The URL(s) that this client may use in authentication requests. */
  redirectUris?: Array<string>;
  /** OAuth2 client ID for OIDC. */
  clientId?: string;
}

export const OidcRpConfig: Schema.Schema<OidcRpConfig> = Schema.suspend(() => Schema.Struct({
  clientSecret: Schema.optional(Schema.String),
  redirectUris: Schema.optional(Schema.Array(Schema.String)),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcRpConfig" }) as any as Schema.Schema<OidcRpConfig>;

export interface OidcIdpConfig {
  /** The **Change Password URL** of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`. */
  changePasswordUri?: string;
  /** Required. The Issuer identifier for the IdP. Must be a URL. The discovery URL will be derived from this as described in Section 4 of [the OIDC specification](https://openid.net/specs/openid-connect-discovery-1_0.html). */
  issuerUri?: string;
}

export const OidcIdpConfig: Schema.Schema<OidcIdpConfig> = Schema.suspend(() => Schema.Struct({
  changePasswordUri: Schema.optional(Schema.String),
  issuerUri: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcIdpConfig" }) as any as Schema.Schema<OidcIdpConfig>;

export interface InboundOidcSsoProfile {
  /** Human-readable name of the OIDC SSO profile. */
  displayName?: string;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the OIDC SSO profile. */
  name?: string;
  /** OIDC relying party (RP) configuration for this OIDC SSO profile. These are the RP details provided by Google that should be configured on the corresponding identity provider. */
  rpConfig?: OidcRpConfig;
  /** Immutable. The customer. For example: `customers/C0123abc`. */
  customer?: string;
  /** OIDC identity provider configuration. */
  idpConfig?: OidcIdpConfig;
}

export const InboundOidcSsoProfile: Schema.Schema<InboundOidcSsoProfile> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  rpConfig: Schema.optional(OidcRpConfig),
  customer: Schema.optional(Schema.String),
  idpConfig: Schema.optional(OidcIdpConfig),
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

export interface GoogleAppsCloudidentityDevicesV1ClientState {
  /** The management state of the resource as specified by the API client. */
  managed?: "MANAGED_STATE_UNSPECIFIED" | "MANAGED" | "UNMANAGED" | (string & {});
  /** A descriptive cause of the health score. */
  scoreReason?: string;
  /** The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest */
  etag?: string;
  /** Output only. The time the client state data was created. */
  createTime?: string;
  /** Output only. The time the client state data was last updated. */
  lastUpdateTime?: string;
  /** Output only. The owner of the ClientState */
  ownerType?: "OWNER_TYPE_UNSPECIFIED" | "OWNER_TYPE_CUSTOMER" | "OWNER_TYPE_PARTNER" | (string & {});
  /** The caller can specify asset tags for this resource */
  assetTags?: Array<string>;
  /** The Health score of the resource. The Health score is the callers specification of the condition of the device from a usability point of view. For example, a third-party device management provider may specify a health score based on its compliance with organizational policies. */
  healthScore?: "HEALTH_SCORE_UNSPECIFIED" | "VERY_POOR" | "POOR" | "NEUTRAL" | "GOOD" | "VERY_GOOD" | (string & {});
  /** The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map. */
  keyValuePairs?: Record<string, GoogleAppsCloudidentityDevicesV1CustomAttributeValue>;
  /** This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field. */
  customId?: string;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the "BeyondCorp Alliance", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C') */
  name?: string;
  /** The compliance state of the resource as specified by the API client. */
  complianceState?: "COMPLIANCE_STATE_UNSPECIFIED" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
}

export const GoogleAppsCloudidentityDevicesV1ClientState: Schema.Schema<GoogleAppsCloudidentityDevicesV1ClientState> = Schema.suspend(() => Schema.Struct({
  managed: Schema.optional(Schema.String),
  scoreReason: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  ownerType: Schema.optional(Schema.String),
  assetTags: Schema.optional(Schema.Array(Schema.String)),
  healthScore: Schema.optional(Schema.String),
  keyValuePairs: Schema.optional(Schema.Record(Schema.String, GoogleAppsCloudidentityDevicesV1CustomAttributeValue)),
  customId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  complianceState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ClientState" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ClientState>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata>;

export interface Setting {
  /** Required. The value of the Setting. */
  value?: Record<string, unknown>;
  /** Required. Immutable. The type of the Setting. . */
  type?: string;
}

export const Setting: Schema.Schema<Setting> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Setting" }) as any as Schema.Schema<Setting>;

export interface GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata {
}

export const GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata>;

export interface DsaPublicKeyInfo {
  /** Key size in bits (size of parameter P). */
  keySize?: number;
}

export const DsaPublicKeyInfo: Schema.Schema<DsaPublicKeyInfo> = Schema.suspend(() => Schema.Struct({
  keySize: Schema.optional(Schema.Number),
})).annotate({ identifier: "DsaPublicKeyInfo" }) as any as Schema.Schema<DsaPublicKeyInfo>;

export interface RsaPublicKeyInfo {
  /** Key size in bits (size of the modulus). */
  keySize?: number;
}

export const RsaPublicKeyInfo: Schema.Schema<RsaPublicKeyInfo> = Schema.suspend(() => Schema.Struct({
  keySize: Schema.optional(Schema.Number),
})).annotate({ identifier: "RsaPublicKeyInfo" }) as any as Schema.Schema<RsaPublicKeyInfo>;

export interface IdpCredential {
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the credential. */
  name?: string;
  /** Output only. Information of a DSA public key. */
  dsaKeyInfo?: DsaPublicKeyInfo;
  /** Output only. Information of a RSA public key. */
  rsaKeyInfo?: RsaPublicKeyInfo;
  /** Output only. Time when the `IdpCredential` was last updated. */
  updateTime?: string;
}

export const IdpCredential: Schema.Schema<IdpCredential> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dsaKeyInfo: Schema.optional(DsaPublicKeyInfo),
  rsaKeyInfo: Schema.optional(RsaPublicKeyInfo),
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

export interface MembershipRelation {
  /** One or more label entries that apply to the Group. Currently supported labels contain a key with an empty value. */
  labels?: Record<string, string>;
  /** An extended description to help users determine the purpose of a `Group`. */
  description?: string;
  /** The `MembershipRole`s that apply to the `Membership`. */
  roles?: Array<MembershipRole>;
  /** The display name of the `Group`. */
  displayName?: string;
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group_id}`. */
  group?: string;
  /** The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group_id}/memberships/{membership_id}`. */
  membership?: string;
  /** The `EntityKey` of the `Group`. */
  groupKey?: EntityKey;
}

export const MembershipRelation: Schema.Schema<MembershipRelation> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(MembershipRole)),
  displayName: Schema.optional(Schema.String),
  group: Schema.optional(Schema.String),
  membership: Schema.optional(Schema.String),
  groupKey: Schema.optional(EntityKey),
})).annotate({ identifier: "MembershipRelation" }) as any as Schema.Schema<MembershipRelation>;

export interface DeleteInboundSamlSsoProfileOperationMetadata {
}

export const DeleteInboundSamlSsoProfileOperationMetadata: Schema.Schema<DeleteInboundSamlSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteInboundSamlSsoProfileOperationMetadata" }) as any as Schema.Schema<DeleteInboundSamlSsoProfileOperationMetadata>;

export interface GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata>;

export interface IsInvitableUserResponse {
  /** Returns true if the email address is invitable. */
  isInvitableUser?: boolean;
}

export const IsInvitableUserResponse: Schema.Schema<IsInvitableUserResponse> = Schema.suspend(() => Schema.Struct({
  isInvitableUser: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IsInvitableUserResponse" }) as any as Schema.Schema<IsInvitableUserResponse>;

export interface CreateInboundSamlSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const CreateInboundSamlSsoProfileOperationMetadata: Schema.Schema<CreateInboundSamlSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInboundSamlSsoProfileOperationMetadata" }) as any as Schema.Schema<CreateInboundSamlSsoProfileOperationMetadata>;

export interface UpdateInboundOidcSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const UpdateInboundOidcSsoProfileOperationMetadata: Schema.Schema<UpdateInboundOidcSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInboundOidcSsoProfileOperationMetadata" }) as any as Schema.Schema<UpdateInboundOidcSsoProfileOperationMetadata>;

export interface UserInvitation {
  /** State of the `UserInvitation`. */
  state?: "STATE_UNSPECIFIED" | "NOT_YET_SENT" | "INVITED" | "ACCEPTED" | "DECLINED" | (string & {});
  /** Number of invitation emails sent to the user. */
  mailsSentCount?: string;
  /** Time when the `UserInvitation` was last updated. */
  updateTime?: string;
  /** Shall be of the form `customers/{customer}/userinvitations/{user_email_address}`. */
  name?: string;
}

export const UserInvitation: Schema.Schema<UserInvitation> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  mailsSentCount: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "UserInvitation" }) as any as Schema.Schema<UserInvitation>;

export interface DeleteIdpCredentialOperationMetadata {
}

export const DeleteIdpCredentialOperationMetadata: Schema.Schema<DeleteIdpCredentialOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteIdpCredentialOperationMetadata" }) as any as Schema.Schema<DeleteIdpCredentialOperationMetadata>;

export interface CreateInboundSsoAssignmentOperationMetadata {
}

export const CreateInboundSsoAssignmentOperationMetadata: Schema.Schema<CreateInboundSsoAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CreateInboundSsoAssignmentOperationMetadata" }) as any as Schema.Schema<CreateInboundSsoAssignmentOperationMetadata>;

export interface CancelWipeDeviceResponse {
  /** Resultant Device object for the action. Note that asset tags will not be returned in the device object. */
  device?: Device;
}

export const CancelWipeDeviceResponse: Schema.Schema<CancelWipeDeviceResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(Device),
})).annotate({ identifier: "CancelWipeDeviceResponse" }) as any as Schema.Schema<CancelWipeDeviceResponse>;

export interface PolicyQuery {
  /** Immutable. The CEL query that defines which entities the Policy applies to (ex. a User entity). For details about CEL see https://opensource.google.com/projects/cel. The OrgUnits the Policy applies to are represented by a clause like so: entity.org_units.exists(org_unit, org_unit.org_unit_id == orgUnitId('{orgUnitId}')) The Group the Policy applies to are represented by a clause like so: entity.groups.exists(group, group.group_id == groupId('{groupId}')) The Licenses the Policy applies to are represented by a clause like so: entity.licenses.exists(license, license in ['/product/{productId}/sku/{skuId}']) The above clauses can be present in any combination, and used in conjunction with the &&, || and ! operators. The org_unit and group fields below are helper fields that contain the corresponding value(s) as the query to make the query easier to use. */
  query?: string;
  /** Required. Immutable. Non-empty default. The OrgUnit the query applies to. This field is only set if there is a single value for org_unit that satisfies all clauses of the query. */
  orgUnit?: string;
  /** Output only. The decimal sort order of this PolicyQuery. The value is relative to all other policies with the same setting type for the customer. (There are no duplicates within this set). */
  sortOrder?: number;
  /** Immutable. The group that the query applies to. This field is only set if there is a single value for group that satisfies all clauses of the query. If no group applies, this will be the empty string. */
  group?: string;
}

export const PolicyQuery: Schema.Schema<PolicyQuery> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  orgUnit: Schema.optional(Schema.String),
  sortOrder: Schema.optional(Schema.Number),
  group: Schema.optional(Schema.String),
})).annotate({ identifier: "PolicyQuery" }) as any as Schema.Schema<PolicyQuery>;

export interface Policy {
  /** Immutable. Customer that the Policy belongs to. The value is in the format 'customers/{customerId}'. The `customerId` must begin with "C" To find your customer ID in Admin Console see https://support.google.com/a/answer/10070793. */
  customer?: string;
  /** Required. The Setting configured by this Policy. */
  setting?: Setting;
  /** Required. The PolicyQuery the Setting applies to. */
  policyQuery?: PolicyQuery;
  /** Output only. The type of the policy. */
  type?: "POLICY_TYPE_UNSPECIFIED" | "SYSTEM" | "ADMIN" | (string & {});
  /** Output only. Identifier. The [resource name](https://cloud.google.com/apis/design/resource_names) of the Policy. Format: policies/{policy}. */
  name?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  setting: Schema.optional(Setting),
  policyQuery: Schema.optional(PolicyQuery),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ListPoliciesResponse {
  /** The pagination token to retrieve the next page of results. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
  /** The results */
  policies?: Array<Policy>;
}

export const ListPoliciesResponse: Schema.Schema<ListPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Policy)),
})).annotate({ identifier: "ListPoliciesResponse" }) as any as Schema.Schema<ListPoliciesResponse>;

export interface BlockDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const BlockDeviceUserRequest: Schema.Schema<BlockDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "BlockDeviceUserRequest" }) as any as Schema.Schema<BlockDeviceUserRequest>;

export interface WipeDeviceRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. Specifies if a user is able to factory reset a device after a Device Wipe. On iOS, this is called "Activation Lock", while on Android, this is known as "Factory Reset Protection". If true, this protection will be removed from the device, so that a user can successfully factory reset. If false, the setting is untouched on the device. */
  removeResetLock?: boolean;
}

export const WipeDeviceRequest: Schema.Schema<WipeDeviceRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  removeResetLock: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WipeDeviceRequest" }) as any as Schema.Schema<WipeDeviceRequest>;

export interface RestrictionEvaluation {
  /** Output only. The current state of the restriction */
  state?: "STATE_UNSPECIFIED" | "EVALUATING" | "COMPLIANT" | "FORWARD_COMPLIANT" | "NON_COMPLIANT" | (string & {});
}

export const RestrictionEvaluation: Schema.Schema<RestrictionEvaluation> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "RestrictionEvaluation" }) as any as Schema.Schema<RestrictionEvaluation>;

export interface MemberRestriction {
  /** The evaluated state of this restriction on a group. */
  evaluation?: RestrictionEvaluation;
  /** Member Restriction as defined by CEL expression. Supported restrictions are: `member.customer_id` and `member.type`. Valid values for `member.type` are `1`, `2` and `3`. They correspond to USER, SERVICE_ACCOUNT, and GROUP respectively. The value for `member.customer_id` only supports `groupCustomerId()` currently which means the customer id of the group will be used for restriction. Supported operators are `&&`, `||` and `==`, corresponding to AND, OR, and EQUAL. Examples: Allow only service accounts of given customer to be members. `member.type == 2 && member.customer_id == groupCustomerId()` Allow only users or groups to be members. `member.type == 1 || member.type == 3` */
  query?: string;
}

export const MemberRestriction: Schema.Schema<MemberRestriction> = Schema.suspend(() => Schema.Struct({
  evaluation: Schema.optional(RestrictionEvaluation),
  query: Schema.optional(Schema.String),
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

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse {
  /** Resultant Device object for the action. Note that asset tags will not be returned in the device object. */
  device?: GoogleAppsCloudidentityDevicesV1Device;
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(GoogleAppsCloudidentityDevicesV1Device),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse>;

export interface LookupSelfDeviceUsersResponse {
  /** [Resource names](https://cloud.google.com/apis/design/resource_names) of the DeviceUsers in the format: `devices/{device_id}/deviceUsers/{user_resource_id}`, where device_id is the unique ID assigned to a Device and user_resource_id is the unique user ID */
  names?: Array<string>;
  /** The customer Id that may be passed back to other Devices API methods such as List, Get, etc. */
  customer?: string;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const LookupSelfDeviceUsersResponse: Schema.Schema<LookupSelfDeviceUsersResponse> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  customer: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupSelfDeviceUsersResponse" }) as any as Schema.Schema<LookupSelfDeviceUsersResponse>;

export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse>;

export interface AddIdpCredentialOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const AddIdpCredentialOperationMetadata: Schema.Schema<AddIdpCredentialOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "AddIdpCredentialOperationMetadata" }) as any as Schema.Schema<AddIdpCredentialOperationMetadata>;

export interface LookupGroupNameResponse {
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the looked-up `Group`. */
  name?: string;
}

export const LookupGroupNameResponse: Schema.Schema<LookupGroupNameResponse> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LookupGroupNameResponse" }) as any as Schema.Schema<LookupGroupNameResponse>;

export interface ModifyMembershipRolesResponse {
  /** The `Membership` resource after modifying its `MembershipRole`s. */
  membership?: Membership;
}

export const ModifyMembershipRolesResponse: Schema.Schema<ModifyMembershipRolesResponse> = Schema.suspend(() => Schema.Struct({
  membership: Schema.optional(Membership),
})).annotate({ identifier: "ModifyMembershipRolesResponse" }) as any as Schema.Schema<ModifyMembershipRolesResponse>;

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
  /** SAML SSO details. Must be set if and only if `sso_mode` is set to `SAML_SSO`. */
  samlSsoInfo?: SamlSsoInfo;
  /** Inbound SSO behavior. */
  ssoMode?: "SSO_MODE_UNSPECIFIED" | "SSO_OFF" | "SAML_SSO" | "OIDC_SSO" | "DOMAIN_WIDE_SAML_IF_ENABLED" | (string & {});
  /** Must be zero (which is the default value so it can be omitted) for assignments with `target_org_unit` set and must be greater-than-or-equal-to one for assignments with `target_group` set. */
  rank?: number;
  /** OpenID Connect SSO details. Must be set if and only if `sso_mode` is set to `OIDC_SSO`. */
  oidcSsoInfo?: OidcSsoInfo;
  /** Immutable. Must be of the form `orgUnits/{org_unit}`. */
  targetOrgUnit?: string;
  /** Assertions about users assigned to an IdP will always be accepted from that IdP. This controls whether/when Google should redirect a user to the IdP. Unset (defaults) is the recommended configuration. */
  signInBehavior?: SignInBehavior;
  /** Immutable. Must be of the form `groups/{group}`. */
  targetGroup?: string;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Inbound SSO Assignment. */
  name?: string;
  /** Immutable. The customer. For example: `customers/C0123abc`. */
  customer?: string;
}

export const InboundSsoAssignment: Schema.Schema<InboundSsoAssignment> = Schema.suspend(() => Schema.Struct({
  samlSsoInfo: Schema.optional(SamlSsoInfo),
  ssoMode: Schema.optional(Schema.String),
  rank: Schema.optional(Schema.Number),
  oidcSsoInfo: Schema.optional(OidcSsoInfo),
  targetOrgUnit: Schema.optional(Schema.String),
  signInBehavior: Schema.optional(SignInBehavior),
  targetGroup: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "InboundSsoAssignment" }) as any as Schema.Schema<InboundSsoAssignment>;

export interface ListInboundSsoAssignmentsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The assignments. */
  inboundSsoAssignments?: Array<InboundSsoAssignment>;
}

export const ListInboundSsoAssignmentsResponse: Schema.Schema<ListInboundSsoAssignmentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  inboundSsoAssignments: Schema.optional(Schema.Array(InboundSsoAssignment)),
})).annotate({ identifier: "ListInboundSsoAssignmentsResponse" }) as any as Schema.Schema<ListInboundSsoAssignmentsResponse>;

export interface CancelWipeDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const CancelWipeDeviceUserRequest: Schema.Schema<CancelWipeDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "CancelWipeDeviceUserRequest" }) as any as Schema.Schema<CancelWipeDeviceUserRequest>;

export interface SearchGroupsResponse {
  /** A continuation token to retrieve the next page of results, or empty if there are no more results available. */
  nextPageToken?: string;
  /** The `Group` resources that match the search query. */
  groups?: Array<Group>;
}

export const SearchGroupsResponse: Schema.Schema<SearchGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Array(Group)),
})).annotate({ identifier: "SearchGroupsResponse" }) as any as Schema.Schema<SearchGroupsResponse>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata>;

export interface ListGroupsResponse {
  /** A continuation token to retrieve the next page of results, or empty if there are no more results available. */
  nextPageToken?: string;
  /** The `Group` resources under the specified `parent`. */
  groups?: Array<Group>;
}

export const ListGroupsResponse: Schema.Schema<ListGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Array(Group)),
})).annotate({ identifier: "ListGroupsResponse" }) as any as Schema.Schema<ListGroupsResponse>;

export interface MoveOrgMembershipRequest {
  /** Required. Immutable. Customer on whose membership change is made. All authorization will happen on the role assignments of this customer. Format: customers/{$customerId} where `$customerId` is the `id` from the [Admin SDK `Customer` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). You may also use `customers/my_customer` to specify your own organization. */
  customer?: string;
  /** Required. Immutable. OrgUnit where the membership will be moved to. Format: orgUnits/{$orgUnitId} where `$orgUnitId` is the `orgUnitId` from the [Admin SDK `OrgUnit` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits). */
  destinationOrgUnit?: string;
}

export const MoveOrgMembershipRequest: Schema.Schema<MoveOrgMembershipRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  destinationOrgUnit: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveOrgMembershipRequest" }) as any as Schema.Schema<MoveOrgMembershipRequest>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse>;

export interface CreateInboundOidcSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const CreateInboundOidcSsoProfileOperationMetadata: Schema.Schema<CreateInboundOidcSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInboundOidcSsoProfileOperationMetadata" }) as any as Schema.Schema<CreateInboundOidcSsoProfileOperationMetadata>;

export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata {
}

export const GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata>;

export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

export const GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse: Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(GoogleAppsCloudidentityDevicesV1DeviceUser),
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse>;

export interface GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata {
}

export const GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata>;

export interface ApproveDeviceUserRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const ApproveDeviceUserRequest: Schema.Schema<ApproveDeviceUserRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "ApproveDeviceUserRequest" }) as any as Schema.Schema<ApproveDeviceUserRequest>;

export interface BlockDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: DeviceUser;
}

export const BlockDeviceUserResponse: Schema.Schema<BlockDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(DeviceUser),
})).annotate({ identifier: "BlockDeviceUserResponse" }) as any as Schema.Schema<BlockDeviceUserResponse>;

export interface OrgMembership {
  /** Uri with which you can read the member. This follows https://aip.dev/122 Format for shared drive resource: https://drive.googleapis.com/drive/v3/drives/{$memberId} where `$memberId` is the `id` from [Drive API (V3) `Drive` resource](https://developers.google.com/drive/api/v3/reference/drives#resource). */
  memberUri?: string;
  /** Immutable. Entity type for the org member. */
  type?: "ENTITY_TYPE_UNSPECIFIED" | "SHARED_DRIVE" | (string & {});
  /** Required. Immutable. The [resource name](https://cloud.google.com/apis/design/resource_names) of the OrgMembership. Format: orgUnits/{$orgUnitId}/memberships/{$membership} The `$orgUnitId` is the `orgUnitId` from the [Admin SDK `OrgUnit` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits). The `$membership` shall be of the form `{$entityType};{$memberId}`, where `$entityType` is the enum value of [OrgMembership.EntityType], and `memberId` is the `id` from [Drive API (V3) `Drive` resource](https://developers.google.com/drive/api/v3/reference/drives#resource) for OrgMembership.EntityType.SHARED_DRIVE. */
  name?: string;
  /** Immutable. Org member id as full resource name. Format for shared drive resource: //drive.googleapis.com/drives/{$memberId} where `$memberId` is the `id` from [Drive API (V3) `Drive` resource](https://developers.google.com/drive/api/v3/reference/drives#resource). */
  member?: string;
}

export const OrgMembership: Schema.Schema<OrgMembership> = Schema.suspend(() => Schema.Struct({
  memberUri: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  member: Schema.optional(Schema.String),
})).annotate({ identifier: "OrgMembership" }) as any as Schema.Schema<OrgMembership>;

export interface ListOrgMembershipsResponse {
  /** The non-vacuous membership in an orgUnit. */
  orgMemberships?: Array<OrgMembership>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListOrgMembershipsResponse: Schema.Schema<ListOrgMembershipsResponse> = Schema.suspend(() => Schema.Struct({
  orgMemberships: Schema.optional(Schema.Array(OrgMembership)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOrgMembershipsResponse" }) as any as Schema.Schema<ListOrgMembershipsResponse>;

export interface UpdateInboundSamlSsoProfileOperationMetadata {
  /** State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448). */
  state?: string;
}

export const UpdateInboundSamlSsoProfileOperationMetadata: Schema.Schema<UpdateInboundSamlSsoProfileOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInboundSamlSsoProfileOperationMetadata" }) as any as Schema.Schema<UpdateInboundSamlSsoProfileOperationMetadata>;

export interface ListUserInvitationsResponse {
  /** The token for the next page. If not empty, indicates that there may be more `UserInvitation` resources that match the listing request; this value can be used in a subsequent ListUserInvitationsRequest to get continued results with the current list call. */
  nextPageToken?: string;
  /** The list of UserInvitation resources. */
  userInvitations?: Array<UserInvitation>;
}

export const ListUserInvitationsResponse: Schema.Schema<ListUserInvitationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  userInvitations: Schema.optional(Schema.Array(UserInvitation)),
})).annotate({ identifier: "ListUserInvitationsResponse" }) as any as Schema.Schema<ListUserInvitationsResponse>;

export interface CreateDeviceRequest {
  /** Required. The device to be created. The name field within this device is ignored in the create method. A new name is created by the method, and returned within the response. Only the fields `device_type`, `serial_number` and `asset_tag` (if present) are used to create the device. All other fields are ignored. The `device_type` and `serial_number` fields are required. */
  device?: Device;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const CreateDeviceRequest: Schema.Schema<CreateDeviceRequest> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(Device),
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateDeviceRequest" }) as any as Schema.Schema<CreateDeviceRequest>;

export interface DeleteInboundSsoAssignmentOperationMetadata {
}

export const DeleteInboundSsoAssignmentOperationMetadata: Schema.Schema<DeleteInboundSsoAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteInboundSsoAssignmentOperationMetadata" }) as any as Schema.Schema<DeleteInboundSsoAssignmentOperationMetadata>;

export interface CancelUserInvitationRequest {
}

export const CancelUserInvitationRequest: Schema.Schema<CancelUserInvitationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelUserInvitationRequest" }) as any as Schema.Schema<CancelUserInvitationRequest>;

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

export interface CancelWipeDeviceUserResponse {
  /** Resultant DeviceUser object for the action. */
  deviceUser?: DeviceUser;
}

export const CancelWipeDeviceUserResponse: Schema.Schema<CancelWipeDeviceUserResponse> = Schema.suspend(() => Schema.Struct({
  deviceUser: Schema.optional(DeviceUser),
})).annotate({ identifier: "CancelWipeDeviceUserResponse" }) as any as Schema.Schema<CancelWipeDeviceUserResponse>;

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

export interface GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata>;

export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata {
}

export const GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata: Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata" }) as any as Schema.Schema<GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata>;

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

export interface UpdateInboundSsoAssignmentOperationMetadata {
}

export const UpdateInboundSsoAssignmentOperationMetadata: Schema.Schema<UpdateInboundSsoAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateInboundSsoAssignmentOperationMetadata" }) as any as Schema.Schema<UpdateInboundSsoAssignmentOperationMetadata>;

export interface CancelWipeDeviceRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const CancelWipeDeviceRequest: Schema.Schema<CancelWipeDeviceRequest> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "CancelWipeDeviceRequest" }) as any as Schema.Schema<CancelWipeDeviceRequest>;

export interface ListDeviceUsersResponse {
  /** Devices meeting the list restrictions. */
  deviceUsers?: Array<DeviceUser>;
  /** Token to retrieve the next page of results. Empty if there are no more results. */
  nextPageToken?: string;
}

export const ListDeviceUsersResponse: Schema.Schema<ListDeviceUsersResponse> = Schema.suspend(() => Schema.Struct({
  deviceUsers: Schema.optional(Schema.Array(DeviceUser)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDeviceUsersResponse" }) as any as Schema.Schema<ListDeviceUsersResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListOrgUnitsMembershipsRequest {
  /** The search query. Must be specified in [Common Expression Language](https://opensource.google/projects/cel). May only contain equality operators on the `type` (e.g., `type == 'shared_drive'`). */
  filter?: string;
  /** The maximum number of results to return. The service may return fewer than this value. If omitted (or defaulted to zero) the server will default to 50. The maximum allowed value is 100, though requests with page_size greater than that will be silently interpreted as 100. */
  pageSize?: number;
  /** Required. Immutable. OrgUnit which is queried for a list of memberships. Format: orgUnits/{$orgUnitId} where `$orgUnitId` is the `orgUnitId` from the [Admin SDK `OrgUnit` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits). */
  parent: string;
  /** A page token, received from a previous `OrgMembershipsService.ListOrgMemberships` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListOrgMembershipsRequest` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. Immutable. Customer that this OrgMembership belongs to. All authorization will happen on the role assignments of this customer. Format: customers/{$customerId} where `$customerId` is the `id` from the [Admin SDK `Customer` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). You may also use `customers/my_customer` to specify your own organization. */
  customer?: string;
}

export const ListOrgUnitsMembershipsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/orgUnits/{orgUnitsId}/memberships" }),
  svc,
) as unknown as Schema.Schema<ListOrgUnitsMembershipsRequest>;

export type ListOrgUnitsMembershipsResponse = ListOrgMembershipsResponse;
export const ListOrgUnitsMembershipsResponse = ListOrgMembershipsResponse;

export type ListOrgUnitsMembershipsError = CommonErrors;

/** List OrgMembership resources in an OrgUnit treated as 'parent'. Parent format: orgUnits/{$orgUnitId} where `$orgUnitId` is the `orgUnitId` from the [Admin SDK `OrgUnit` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits) */
export const listOrgUnitsMemberships: API.PaginatedOperationMethod<ListOrgUnitsMembershipsRequest, ListOrgUnitsMembershipsResponse, ListOrgUnitsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOrgUnitsMembershipsRequest,
  output: ListOrgUnitsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface MoveOrgUnitsMembershipsRequest {
  /** Required. Immutable. The [resource name](https://cloud.google.com/apis/design/resource_names) of the OrgMembership. Format: orgUnits/{$orgUnitId}/memberships/{$membership} The `$orgUnitId` is the `orgUnitId` from the [Admin SDK `OrgUnit` resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits). To manage a Membership without specifying source `orgUnitId`, this API also supports the wildcard character '-' for `$orgUnitId` per https://google.aip.dev/159. The `$membership` shall be of the form `{$entityType};{$memberId}`, where `$entityType` is the enum value of OrgMembership.EntityType, and `memberId` is the `id` from [Drive API (V3) `Drive` resource](https://developers.google.com/drive/api/v3/reference/drives#resource) for OrgMembership.EntityType.SHARED_DRIVE. */
  name: string;
  /** Request body */
  body?: MoveOrgMembershipRequest;
}

export const MoveOrgUnitsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MoveOrgMembershipRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/orgUnits/{orgUnitsId}/memberships/{membershipsId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveOrgUnitsMembershipsRequest>;

export type MoveOrgUnitsMembershipsResponse = Operation;
export const MoveOrgUnitsMembershipsResponse = Operation;

export type MoveOrgUnitsMembershipsError = CommonErrors;

/** Move an OrgMembership to a new OrgUnit. NOTE: This is an atomic copy-and-delete. The resource will have a new copy under the destination OrgUnit and be deleted from the source OrgUnit. The resource can only be searched under the destination OrgUnit afterwards. */
export const moveOrgUnitsMemberships: API.OperationMethod<MoveOrgUnitsMembershipsRequest, MoveOrgUnitsMembershipsResponse, MoveOrgUnitsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveOrgUnitsMembershipsRequest,
  output: MoveOrgUnitsMembershipsResponse,
  errors: [],
}));

export interface CancelWipeDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}`, where device_id is the unique ID assigned to the Device. */
  name: string;
  /** Request body */
  body?: CancelWipeDeviceRequest;
}

export const CancelWipeDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelWipeDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices/{devicesId}:cancelWipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelWipeDevicesRequest>;

export type CancelWipeDevicesResponse = Operation;
export const CancelWipeDevicesResponse = Operation;

export type CancelWipeDevicesError = CommonErrors;

/** Cancels an unfinished device wipe. This operation can be used to cancel device wipe in the gap between the wipe operation returning success and the device being wiped. */
export const cancelWipeDevices: API.OperationMethod<CancelWipeDevicesRequest, CancelWipeDevicesResponse, CancelWipeDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelWipeDevicesRequest,
  output: CancelWipeDevicesResponse,
  errors: [],
}));

export interface GetDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}`, where device_id is the unique ID assigned to the Device. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Customer in format: `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const GetDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesRequest>;

export type GetDevicesResponse = Device;
export const GetDevicesResponse = Device;

export type GetDevicesError = CommonErrors;

/** Retrieves the specified device. */
export const getDevices: API.OperationMethod<GetDevicesRequest, GetDevicesResponse, GetDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesRequest,
  output: GetDevicesResponse,
  errors: [],
}));

export interface CreateDevicesRequest {
  /** Request body */
  body?: CreateDeviceRequest;
}

export const CreateDevicesRequest = Schema.Struct({
  body: Schema.optional(CreateDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateDevicesRequest>;

export type CreateDevicesResponse = Operation;
export const CreateDevicesResponse = Operation;

export type CreateDevicesError = CommonErrors;

/** Creates a device. Only company-owned device may be created. **Note**: This method is available only to customers who have one of the following SKUs: Enterprise Standard, Enterprise Plus, Enterprise for Education, and Cloud Identity Premium */
export const createDevices: API.OperationMethod<CreateDevicesRequest, CreateDevicesResponse, CreateDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateDevicesRequest,
  output: CreateDevicesResponse,
  errors: [],
}));

export interface ListDevicesRequest {
  /** Optional. Order specification for devices in the response. Only one of the following field names may be used to specify the order: `create_time`, `last_sync_time`, `model`, `os_version`, `device_type` and `serial_number`. `desc` may be specified optionally to specify results to be sorted in descending order. Default order is ascending. */
  orderBy?: string;
  /** Optional. Additional restrictions when fetching list of devices. For a list of search fields, refer to [Mobile device search fields](https://developers.google.com/admin-sdk/directory/v1/search-operators). Multiple search fields are separated by the space character. */
  filter?: string;
  /** Optional. The maximum number of Devices to return. If unspecified, at most 20 Devices will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. */
  customer?: string;
  /** Optional. A page token, received from a previous `ListDevices` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDevices` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The view to use for the List request. */
  view?: "VIEW_UNSPECIFIED" | "COMPANY_INVENTORY" | "USER_ASSIGNED_DEVICES" | (string & {});
}

export const ListDevicesRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/devices" }),
  svc,
) as unknown as Schema.Schema<ListDevicesRequest>;

export type ListDevicesResponse_Op = ListDevicesResponse;
export const ListDevicesResponse_Op = ListDevicesResponse;

export type ListDevicesError = CommonErrors;

/** Lists/Searches devices. */
export const listDevices: API.PaginatedOperationMethod<ListDevicesRequest, ListDevicesResponse_Op, ListDevicesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface WipeDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: WipeDeviceRequest;
}

export const WipeDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(WipeDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices/{devicesId}:wipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WipeDevicesRequest>;

export type WipeDevicesResponse = Operation;
export const WipeDevicesResponse = Operation;

export type WipeDevicesError = CommonErrors;

/** Wipes all data on the specified device. */
export const wipeDevices: API.OperationMethod<WipeDevicesRequest, WipeDevicesResponse, WipeDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WipeDevicesRequest,
  output: WipeDevicesResponse,
  errors: [],
}));

export interface DeleteDevicesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}`, where device_id is the unique ID assigned to the Device. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const DeleteDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDevicesRequest>;

export type DeleteDevicesResponse = Operation;
export const DeleteDevicesResponse = Operation;

export type DeleteDevicesError = CommonErrors;

/** Deletes the specified device. */
export const deleteDevices: API.OperationMethod<DeleteDevicesRequest, DeleteDevicesResponse, DeleteDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDevicesRequest,
  output: DeleteDevicesResponse,
  errors: [],
}));

export interface GetDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const GetDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesDeviceUsersRequest>;

export type GetDevicesDeviceUsersResponse = DeviceUser;
export const GetDevicesDeviceUsersResponse = DeviceUser;

export type GetDevicesDeviceUsersError = CommonErrors;

/** Retrieves the specified DeviceUser */
export const getDevicesDeviceUsers: API.OperationMethod<GetDevicesDeviceUsersRequest, GetDevicesDeviceUsersResponse, GetDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesDeviceUsersRequest,
  output: GetDevicesDeviceUsersResponse,
  errors: [],
}));

export interface ApproveDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: ApproveDeviceUserRequest;
}

export const ApproveDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveDevicesDeviceUsersRequest>;

export type ApproveDevicesDeviceUsersResponse = Operation;
export const ApproveDevicesDeviceUsersResponse = Operation;

export type ApproveDevicesDeviceUsersError = CommonErrors;

/** Approves device to access user data. */
export const approveDevicesDeviceUsers: API.OperationMethod<ApproveDevicesDeviceUsersRequest, ApproveDevicesDeviceUsersResponse, ApproveDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveDevicesDeviceUsersRequest,
  output: ApproveDevicesDeviceUsersResponse,
  errors: [],
}));

export interface CancelWipeDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: CancelWipeDeviceUserRequest;
}

export const CancelWipeDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelWipeDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}:cancelWipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelWipeDevicesDeviceUsersRequest>;

export type CancelWipeDevicesDeviceUsersResponse = Operation;
export const CancelWipeDevicesDeviceUsersResponse = Operation;

export type CancelWipeDevicesDeviceUsersError = CommonErrors;

/** Cancels an unfinished user account wipe. This operation can be used to cancel device wipe in the gap between the wipe operation returning success and the device being wiped. */
export const cancelWipeDevicesDeviceUsers: API.OperationMethod<CancelWipeDevicesDeviceUsersRequest, CancelWipeDevicesDeviceUsersResponse, CancelWipeDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelWipeDevicesDeviceUsersRequest,
  output: CancelWipeDevicesDeviceUsersResponse,
  errors: [],
}));

export interface BlockDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: BlockDeviceUserRequest;
}

export const BlockDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(BlockDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}:block", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BlockDevicesDeviceUsersRequest>;

export type BlockDevicesDeviceUsersResponse = Operation;
export const BlockDevicesDeviceUsersResponse = Operation;

export type BlockDevicesDeviceUsersError = CommonErrors;

/** Blocks device from accessing user data */
export const blockDevicesDeviceUsers: API.OperationMethod<BlockDevicesDeviceUsersRequest, BlockDevicesDeviceUsersResponse, BlockDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BlockDevicesDeviceUsersRequest,
  output: BlockDevicesDeviceUsersResponse,
  errors: [],
}));

export interface DeleteDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const DeleteDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDevicesDeviceUsersRequest>;

export type DeleteDevicesDeviceUsersResponse = Operation;
export const DeleteDevicesDeviceUsersResponse = Operation;

export type DeleteDevicesDeviceUsersError = CommonErrors;

/** Deletes the specified DeviceUser. This also revokes the user's access to device data. */
export const deleteDevicesDeviceUsers: API.OperationMethod<DeleteDevicesDeviceUsersRequest, DeleteDevicesDeviceUsersResponse, DeleteDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDevicesDeviceUsersRequest,
  output: DeleteDevicesDeviceUsersResponse,
  errors: [],
}));

export interface LookupDevicesDeviceUsersRequest {
  /** Optional. The partner-specified device identifier assigned to the iOS device that initiated the Lookup API call. This string must match the value of the iosDeviceId key in the app config dictionary provided to Google Workspace apps. */
  iosDeviceId?: string;
  /** Must be set to "devices/-/deviceUsers" to search across all DeviceUser belonging to the user. */
  parent: string;
  /** A page token, received from a previous `LookupDeviceUsers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `LookupDeviceUsers` must match the call that provided the page token. */
  pageToken?: string;
  /** Android Id returned by [Settings.Secure#ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID). */
  androidId?: string;
  /** The user whose DeviceUser's resource name will be fetched. Must be set to 'me' to fetch the DeviceUser's resource name for the calling user. */
  userId?: string;
  /** Raw Resource Id used by Google Endpoint Verification. If the user is enrolled into Google Endpoint Verification, this id will be saved as the 'device_resource_id' field in the following platform dependent files. Mac: ~/.secureConnect/context_aware_config.json Windows: C:\Users\%USERPROFILE%\.secureConnect\context_aware_config.json Linux: ~/.secureConnect/context_aware_config.json */
  rawResourceId?: string;
  /** The maximum number of DeviceUsers to return. If unspecified, at most 20 DeviceUsers will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** Optional. The partner ID of the calling iOS app. This string must match the value of the partner key within the app configuration dictionary provided to Google Workspace apps. */
  partner?: string;
}

export const LookupDevicesDeviceUsersRequest = Schema.Struct({
  iosDeviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("iosDeviceId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
  userId: Schema.optional(Schema.String).pipe(T.HttpQuery("userId")),
  rawResourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("rawResourceId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  partner: Schema.optional(Schema.String).pipe(T.HttpQuery("partner")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/devices/{devicesId}/deviceUsers:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupDevicesDeviceUsersRequest>;

export type LookupDevicesDeviceUsersResponse = LookupSelfDeviceUsersResponse;
export const LookupDevicesDeviceUsersResponse = LookupSelfDeviceUsersResponse;

export type LookupDevicesDeviceUsersError = CommonErrors;

/** Looks up resource names of the DeviceUsers associated with the caller's credentials, as well as the properties provided in the request. This method must be called with end-user credentials with the scope: https://www.googleapis.com/auth/cloud-identity.devices.lookup If multiple properties are provided, only DeviceUsers having all of these properties are considered as matches - i.e. the query behaves like an AND. Different platforms require different amounts of information from the caller to ensure that the DeviceUser is uniquely identified. - iOS: If either the `partner` or `ios_device_id` field is provided, then both fields are required. - Android: Specifying the `android_id` field is required. - Desktop: Specifying the `raw_resource_id` field is required. */
export const lookupDevicesDeviceUsers: API.PaginatedOperationMethod<LookupDevicesDeviceUsersRequest, LookupDevicesDeviceUsersResponse, LookupDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: LookupDevicesDeviceUsersRequest,
  output: LookupDevicesDeviceUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListDevicesDeviceUsersRequest {
  /** Optional. Order specification for devices in the response. */
  orderBy?: string;
  /** Optional. Additional restrictions when fetching list of devices. For a list of search fields, refer to [Mobile device search fields](https://developers.google.com/admin-sdk/directory/v1/search-operators). Multiple search fields are separated by the space character. */
  filter?: string;
  /** Optional. The maximum number of DeviceUsers to return. If unspecified, at most 5 DeviceUsers will be returned. The maximum value is 20; values above 20 will be coerced to 20. */
  pageSize?: number;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
  /** Optional. A page token, received from a previous `ListDeviceUsers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBooks` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. To list all DeviceUsers, set this to "devices/-". To list all DeviceUsers owned by a device, set this to the resource name of the device. Format: devices/{device} */
  parent: string;
}

export const ListDevicesDeviceUsersRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/devices/{devicesId}/deviceUsers" }),
  svc,
) as unknown as Schema.Schema<ListDevicesDeviceUsersRequest>;

export type ListDevicesDeviceUsersResponse = ListDeviceUsersResponse;
export const ListDevicesDeviceUsersResponse = ListDeviceUsersResponse;

export type ListDevicesDeviceUsersError = CommonErrors;

/** Lists/Searches DeviceUsers. */
export const listDevicesDeviceUsers: API.PaginatedOperationMethod<ListDevicesDeviceUsersRequest, ListDevicesDeviceUsersResponse, ListDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListDevicesDeviceUsersRequest,
  output: ListDevicesDeviceUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface WipeDevicesDeviceUsersRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where device_id is the unique ID assigned to the Device, and device_user_id is the unique ID assigned to the User. */
  name: string;
  /** Request body */
  body?: WipeDeviceUserRequest;
}

export const WipeDevicesDeviceUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(WipeDeviceUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}:wipe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WipeDevicesDeviceUsersRequest>;

export type WipeDevicesDeviceUsersResponse = Operation;
export const WipeDevicesDeviceUsersResponse = Operation;

export type WipeDevicesDeviceUsersError = CommonErrors;

/** Wipes the user's account on a device. */
export const wipeDevicesDeviceUsers: API.OperationMethod<WipeDevicesDeviceUsersRequest, WipeDevicesDeviceUsersResponse, WipeDevicesDeviceUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WipeDevicesDeviceUsersRequest,
  output: WipeDevicesDeviceUsersResponse,
  errors: [],
}));

export interface GetDevicesDeviceUsersClientStatesRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device_id}/deviceUsers/{device_user_id}/clientStates/{partner_id}`, where `device_id` is the unique ID assigned to the Device, `device_user_id` is the unique ID assigned to the User and `partner_id` identifies the partner storing the data. To get the client state for devices belonging to your own organization, the `partnerId` is in the format: `customerId-*anystring*`. Where the `customerId` is your organization's customer ID and `anystring` is any suffix. This suffix is used in setting up Custom Access Levels in Context-Aware Access. You may use `my_customer` instead of the customer ID for devices managed by your own organization. You may specify `-` in place of the `{device_id}`, so the ClientState resource name can be: `devices/-/deviceUsers/{device_user_resource_id}/clientStates/{partner_id}`. */
  name: string;
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
}

export const GetDevicesDeviceUsersClientStatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}/clientStates/{clientStatesId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesDeviceUsersClientStatesRequest>;

export type GetDevicesDeviceUsersClientStatesResponse = ClientState;
export const GetDevicesDeviceUsersClientStatesResponse = ClientState;

export type GetDevicesDeviceUsersClientStatesError = CommonErrors;

/** Gets the client state for the device user */
export const getDevicesDeviceUsersClientStates: API.OperationMethod<GetDevicesDeviceUsersClientStatesRequest, GetDevicesDeviceUsersClientStatesResponse, GetDevicesDeviceUsersClientStatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesDeviceUsersClientStatesRequest,
  output: GetDevicesDeviceUsersClientStatesResponse,
  errors: [],
}));

export interface PatchDevicesDeviceUsersClientStatesRequest {
  /** Optional. [Resource name](https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. */
  customer?: string;
  /** Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device_id}/deviceUsers/{device_user_id}/clientState/{partner_id}`, where partner_id corresponds to the partner storing the data. */
  name: string;
  /** Optional. Comma-separated list of fully qualified names of fields to be updated. If not specified, all updatable fields in ClientState are updated. */
  updateMask?: string;
  /** Request body */
  body?: ClientState;
}

export const PatchDevicesDeviceUsersClientStatesRequest = Schema.Struct({
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ClientState).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/devices/{devicesId}/deviceUsers/{deviceUsersId}/clientStates/{clientStatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchDevicesDeviceUsersClientStatesRequest>;

export type PatchDevicesDeviceUsersClientStatesResponse = Operation;
export const PatchDevicesDeviceUsersClientStatesResponse = Operation;

export type PatchDevicesDeviceUsersClientStatesError = CommonErrors;

/** Updates the client state for the device user **Note**: This method is available only to customers who have one of the following SKUs: Enterprise Standard, Enterprise Plus, Enterprise for Education, and Cloud Identity Premium */
export const patchDevicesDeviceUsersClientStates: API.OperationMethod<PatchDevicesDeviceUsersClientStatesRequest, PatchDevicesDeviceUsersClientStatesResponse, PatchDevicesDeviceUsersClientStatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchDevicesDeviceUsersClientStatesRequest,
  output: PatchDevicesDeviceUsersClientStatesResponse,
  errors: [],
}));

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
  T.Http({ method: "PATCH", path: "v1beta1/inboundOidcSsoProfiles/{inboundOidcSsoProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInboundOidcSsoProfilesRequest>;

export type PatchInboundOidcSsoProfilesResponse = Operation;
export const PatchInboundOidcSsoProfilesResponse = Operation;

export type PatchInboundOidcSsoProfilesError = CommonErrors;

/** Updates an InboundOidcSsoProfile. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export const patchInboundOidcSsoProfiles: API.OperationMethod<PatchInboundOidcSsoProfilesRequest, PatchInboundOidcSsoProfilesResponse, PatchInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInboundOidcSsoProfilesRequest,
  output: PatchInboundOidcSsoProfilesResponse,
  errors: [],
}));

export interface GetInboundOidcSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundOidcSsoProfile to get. Format: `inboundOidcSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const GetInboundOidcSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/inboundOidcSsoProfiles/{inboundOidcSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundOidcSsoProfilesRequest>;

export type GetInboundOidcSsoProfilesResponse = InboundOidcSsoProfile;
export const GetInboundOidcSsoProfilesResponse = InboundOidcSsoProfile;

export type GetInboundOidcSsoProfilesError = CommonErrors;

/** Gets an InboundOidcSsoProfile. */
export const getInboundOidcSsoProfiles: API.OperationMethod<GetInboundOidcSsoProfilesRequest, GetInboundOidcSsoProfilesResponse, GetInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundOidcSsoProfilesRequest,
  output: GetInboundOidcSsoProfilesResponse,
  errors: [],
}));

export interface DeleteInboundOidcSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundOidcSsoProfile to delete. Format: `inboundOidcSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const DeleteInboundOidcSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/inboundOidcSsoProfiles/{inboundOidcSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundOidcSsoProfilesRequest>;

export type DeleteInboundOidcSsoProfilesResponse = Operation;
export const DeleteInboundOidcSsoProfilesResponse = Operation;

export type DeleteInboundOidcSsoProfilesError = CommonErrors;

/** Deletes an InboundOidcSsoProfile. */
export const deleteInboundOidcSsoProfiles: API.OperationMethod<DeleteInboundOidcSsoProfilesRequest, DeleteInboundOidcSsoProfilesResponse, DeleteInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundOidcSsoProfilesRequest,
  output: DeleteInboundOidcSsoProfilesResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1beta1/inboundOidcSsoProfiles" }),
  svc,
) as unknown as Schema.Schema<ListInboundOidcSsoProfilesRequest>;

export type ListInboundOidcSsoProfilesResponse_Op = ListInboundOidcSsoProfilesResponse;
export const ListInboundOidcSsoProfilesResponse_Op = ListInboundOidcSsoProfilesResponse;

export type ListInboundOidcSsoProfilesError = CommonErrors;

/** Lists InboundOidcSsoProfile objects for a Google enterprise customer. */
export const listInboundOidcSsoProfiles: API.PaginatedOperationMethod<ListInboundOidcSsoProfilesRequest, ListInboundOidcSsoProfilesResponse_Op, ListInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListInboundOidcSsoProfilesRequest,
  output: ListInboundOidcSsoProfilesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateInboundOidcSsoProfilesRequest {
  /** Request body */
  body?: InboundOidcSsoProfile;
}

export const CreateInboundOidcSsoProfilesRequest = Schema.Struct({
  body: Schema.optional(InboundOidcSsoProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/inboundOidcSsoProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInboundOidcSsoProfilesRequest>;

export type CreateInboundOidcSsoProfilesResponse = Operation;
export const CreateInboundOidcSsoProfilesResponse = Operation;

export type CreateInboundOidcSsoProfilesError = CommonErrors;

/** Creates an InboundOidcSsoProfile for a customer. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export const createInboundOidcSsoProfiles: API.OperationMethod<CreateInboundOidcSsoProfilesRequest, CreateInboundOidcSsoProfilesResponse, CreateInboundOidcSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInboundOidcSsoProfilesRequest,
  output: CreateInboundOidcSsoProfilesResponse,
  errors: [],
}));

export interface UpdateSecuritySettingsGroupsRequest {
  /** Required. The fully-qualified names of fields to update. May only contain the following field: `member_restriction.query`. */
  updateMask?: string;
  /** Output only. The resource name of the security settings. Shall be of the form `groups/{group_id}/securitySettings`. */
  name: string;
  /** Request body */
  body?: SecuritySettings;
}

export const UpdateSecuritySettingsGroupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/groups/{groupsId}/securitySettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSecuritySettingsGroupsRequest>;

export type UpdateSecuritySettingsGroupsResponse = Operation;
export const UpdateSecuritySettingsGroupsResponse = Operation;

export type UpdateSecuritySettingsGroupsError = CommonErrors;

/** Update Security Settings */
export const updateSecuritySettingsGroups: API.OperationMethod<UpdateSecuritySettingsGroupsRequest, UpdateSecuritySettingsGroupsResponse, UpdateSecuritySettingsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSecuritySettingsGroupsRequest,
  output: UpdateSecuritySettingsGroupsResponse,
  errors: [],
}));

export interface GetGroupsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group` to retrieve. Must be of the form `groups/{group_id}`. */
  name: string;
}

export const GetGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetGroupsRequest>;

export type GetGroupsResponse = Group;
export const GetGroupsResponse = Group;

export type GetGroupsError = CommonErrors;

/** Retrieves a `Group`. */
export const getGroups: API.OperationMethod<GetGroupsRequest, GetGroupsResponse, GetGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGroupsRequest,
  output: GetGroupsResponse,
  errors: [],
}));

export interface SearchGroupsRequest {
  /** The ordering of groups for the display name or email in the search groups response. The syntax for this field can be found at https://cloud.google.com/apis/design/design_patterns#sorting_order. Example: Sort by the ascending name: order_by="display_name" Sort by the descending group key email: order_by="group_key desc" */
  orderBy?: string;
  /** The maximum number of results to return. Note that the number of results returned may be less than this value even if there are more available results. To fetch all results, clients must continue calling this method repeatedly until the response no longer contains a `next_page_token`. If unspecified, defaults to 200 for `GroupView.BASIC` and to 50 for `GroupView.FULL`. Must not be greater than 1000 for `GroupView.BASIC` or 500 for `GroupView.FULL`. */
  pageSize?: number;
  /** Required. The search query. * Must be specified in [Common Expression Language](https://opensource.google/projects/cel). * Must contain equality operators on the parent, e.g. `parent == 'customers/{customer_id}'`. The `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your customer ID.] (https://support.google.com/cloudidentity/answer/10070793) * Can contain optional inclusion operators on `labels` such as `'cloudidentity.googleapis.com/groups.discussion_forum' in labels`). * Can contain an optional equality operator on `domain_name`. e.g. `domain_name == 'examplepetstore.com'` * Can contain optional `startsWith/contains/equality` operators on `group_key`, e.g. `group_key.startsWith('dev')`, `group_key.contains('dev'), group_key == 'dev@examplepetstore.com'` * Can contain optional `startsWith/contains/equality` operators on `display_name`, such as `display_name.startsWith('dev')` , `display_name.contains('dev')`, `display_name == 'dev'` */
  query?: string;
  /** The level of detail to be returned. If unspecified, defaults to `View.BASIC`. */
  view?: "BASIC" | "FULL" | (string & {});
  /** The `next_page_token` value returned from a previous search request, if any. */
  pageToken?: string;
}

export const SearchGroupsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups:search" }),
  svc,
) as unknown as Schema.Schema<SearchGroupsRequest>;

export type SearchGroupsResponse_Op = SearchGroupsResponse;
export const SearchGroupsResponse_Op = SearchGroupsResponse;

export type SearchGroupsError = CommonErrors;

/** Searches for `Group` resources matching a specified query. */
export const searchGroups: API.PaginatedOperationMethod<SearchGroupsRequest, SearchGroupsResponse_Op, SearchGroupsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchGroupsRequest,
  output: SearchGroupsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateGroupsRequest {
  /** Required. The initial configuration option for the `Group`. */
  initialGroupConfig?: "INITIAL_GROUP_CONFIG_UNSPECIFIED" | "WITH_INITIAL_OWNER" | "EMPTY" | (string & {});
  /** Request body */
  body?: Group;
}

export const CreateGroupsRequest = Schema.Struct({
  initialGroupConfig: Schema.optional(Schema.String).pipe(T.HttpQuery("initialGroupConfig")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/groups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGroupsRequest>;

export type CreateGroupsResponse = Operation;
export const CreateGroupsResponse = Operation;

export type CreateGroupsError = CommonErrors;

/** Creates a `Group`. */
export const createGroups: API.OperationMethod<CreateGroupsRequest, CreateGroupsResponse, CreateGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGroupsRequest,
  output: CreateGroupsResponse,
  errors: [],
}));

export interface LookupGroupsRequest {
  /** The ID of the entity. For Google-managed entities, the `id` must be the email address of an existing group or user. For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. */
  "groupKey.id"?: string;
  /** The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source_id}`. */
  "groupKey.namespace"?: string;
}

export const LookupGroupsRequest = Schema.Struct({
  "groupKey.id": Schema.optional(Schema.String).pipe(T.HttpQuery("groupKey.id")),
  "groupKey.namespace": Schema.optional(Schema.String).pipe(T.HttpQuery("groupKey.namespace")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupGroupsRequest>;

export type LookupGroupsResponse = LookupGroupNameResponse;
export const LookupGroupsResponse = LookupGroupNameResponse;

export type LookupGroupsError = CommonErrors;

/** Looks up the [resource name](https://cloud.google.com/apis/design/resource_names) of a `Group` by its `EntityKey`. */
export const lookupGroups: API.OperationMethod<LookupGroupsRequest, LookupGroupsResponse, LookupGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupGroupsRequest,
  output: LookupGroupsResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/securitySettings" }),
  svc,
) as unknown as Schema.Schema<GetSecuritySettingsGroupsRequest>;

export type GetSecuritySettingsGroupsResponse = SecuritySettings;
export const GetSecuritySettingsGroupsResponse = SecuritySettings;

export type GetSecuritySettingsGroupsError = CommonErrors;

/** Get Security Settings */
export const getSecuritySettingsGroups: API.OperationMethod<GetSecuritySettingsGroupsRequest, GetSecuritySettingsGroupsResponse, GetSecuritySettingsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSecuritySettingsGroupsRequest,
  output: GetSecuritySettingsGroupsResponse,
  errors: [],
}));

export interface PatchGroupsRequest {
  /** Required. The names of fields to update. May only contain the following field names: `display_name`, `description`, `labels`, `dynamic_group_metadata`, `posix_groups`. */
  updateMask?: string;
  /** Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group_id}`. */
  name: string;
  /** Request body */
  body?: Group;
}

export const PatchGroupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchGroupsRequest>;

export type PatchGroupsResponse = Operation;
export const PatchGroupsResponse = Operation;

export type PatchGroupsError = CommonErrors;

/** Updates a `Group`. */
export const patchGroups: API.OperationMethod<PatchGroupsRequest, PatchGroupsResponse, PatchGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchGroupsRequest,
  output: PatchGroupsResponse,
  errors: [],
}));

export interface ListGroupsRequest {
  /** The level of detail to be returned. If unspecified, defaults to `View.BASIC`. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The maximum number of results to return. Note that the number of results returned may be less than this value even if there are more available results. To fetch all results, clients must continue calling this method repeatedly until the response no longer contains a `next_page_token`. If unspecified, defaults to 200 for `View.BASIC` and to 50 for `View.FULL`. Must not be greater than 1000 for `View.BASIC` or 500 for `View.FULL`. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous list request, if any. */
  pageToken?: string;
  /** Required. The parent resource under which to list all `Group` resources. Must be of the form `identitysources/{identity_source_id}` for external- identity-mapped groups or `customers/{customer_id}` for Google Groups. The `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your customer ID.] (https://support.google.com/cloudidentity/answer/10070793) */
  parent?: string;
}

export const ListGroupsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups" }),
  svc,
) as unknown as Schema.Schema<ListGroupsRequest>;

export type ListGroupsResponse_Op = ListGroupsResponse;
export const ListGroupsResponse_Op = ListGroupsResponse;

export type ListGroupsError = CommonErrors;

/** Lists the `Group` resources under a customer or namespace. */
export const listGroups: API.PaginatedOperationMethod<ListGroupsRequest, ListGroupsResponse_Op, ListGroupsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteGroupsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group` to retrieve. Must be of the form `groups/{group_id}`. */
  name: string;
}

export const DeleteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteGroupsRequest>;

export type DeleteGroupsResponse = Operation;
export const DeleteGroupsResponse = Operation;

export type DeleteGroupsError = CommonErrors;

/** Deletes a `Group`. */
export const deleteGroups: API.OperationMethod<DeleteGroupsRequest, DeleteGroupsResponse, DeleteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGroupsRequest,
  output: DeleteGroupsResponse,
  errors: [],
}));

export interface CheckTransitiveMembershipGroupsMembershipsRequest {
  /** Required. A CEL expression that MUST include member specification. This is a `required` field. Certain groups are uniquely identified by both a 'member_key_id' and a 'member_key_namespace', which requires an additional query input: 'member_key_namespace'. Example query: `member_key_id == 'member_key_id_value'` */
  query?: string;
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to check the transitive membership in. Format: `groups/{group_id}`, where `group_id` is the unique id assigned to the Group to which the Membership belongs to. */
  parent: string;
}

export const CheckTransitiveMembershipGroupsMembershipsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships:checkTransitiveMembership" }),
  svc,
) as unknown as Schema.Schema<CheckTransitiveMembershipGroupsMembershipsRequest>;

export type CheckTransitiveMembershipGroupsMembershipsResponse = CheckTransitiveMembershipResponse;
export const CheckTransitiveMembershipGroupsMembershipsResponse = CheckTransitiveMembershipResponse;

export type CheckTransitiveMembershipGroupsMembershipsError = CommonErrors;

/** Check a potential member for membership in a group. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. A member has membership to a group as long as there is a single viewable transitive membership between the group and the member. The actor must have view permissions to at least one transitive membership between the member and group. */
export const checkTransitiveMembershipGroupsMemberships: API.OperationMethod<CheckTransitiveMembershipGroupsMembershipsRequest, CheckTransitiveMembershipGroupsMembershipsResponse, CheckTransitiveMembershipGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckTransitiveMembershipGroupsMembershipsRequest,
  output: CheckTransitiveMembershipGroupsMembershipsResponse,
  errors: [],
}));

export interface ModifyMembershipRolesGroupsMembershipsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` whose roles are to be modified. Must be of the form `groups/{group_id}/memberships/{membership_id}`. */
  name: string;
  /** Request body */
  body?: ModifyMembershipRolesRequest;
}

export const ModifyMembershipRolesGroupsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ModifyMembershipRolesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/groups/{groupsId}/memberships/{membershipsId}:modifyMembershipRoles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyMembershipRolesGroupsMembershipsRequest>;

export type ModifyMembershipRolesGroupsMembershipsResponse = ModifyMembershipRolesResponse;
export const ModifyMembershipRolesGroupsMembershipsResponse = ModifyMembershipRolesResponse;

export type ModifyMembershipRolesGroupsMembershipsError = CommonErrors;

/** Modifies the `MembershipRole`s of a `Membership`. */
export const modifyMembershipRolesGroupsMemberships: API.OperationMethod<ModifyMembershipRolesGroupsMembershipsRequest, ModifyMembershipRolesGroupsMembershipsResponse, ModifyMembershipRolesGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyMembershipRolesGroupsMembershipsRequest,
  output: ModifyMembershipRolesGroupsMembershipsResponse,
  errors: [],
}));

export interface ListGroupsMembershipsRequest {
  /** Required. The parent `Group` resource under which to lookup the `Membership` name. Must be of the form `groups/{group_id}`. */
  parent: string;
  /** The level of detail to be returned. If unspecified, defaults to `MembershipView.BASIC`. */
  view?: "BASIC" | "FULL" | (string & {});
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
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships" }),
  svc,
) as unknown as Schema.Schema<ListGroupsMembershipsRequest>;

export type ListGroupsMembershipsResponse = ListMembershipsResponse;
export const ListGroupsMembershipsResponse = ListMembershipsResponse;

export type ListGroupsMembershipsError = CommonErrors;

/** Lists the `Membership`s within a `Group`. */
export const listGroupsMemberships: API.PaginatedOperationMethod<ListGroupsMembershipsRequest, ListGroupsMembershipsResponse, ListGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListGroupsMembershipsRequest,
  output: ListGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetMembershipGraphGroupsMembershipsRequest {
  /** Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group_id}`, where `group_id` is the unique ID assigned to the Group to which the Membership belongs to. group_id can be a wildcard collection id "-". When `group_id` is specified, the membership graph will be constrained to paths between the member (defined in the query) and the parent. If a wildcard collection is provided, all membership paths connected to the member will be returned. */
  parent: string;
  /** Required. A CEL expression that MUST include member specification AND label(s). Certain groups are uniquely identified by both a 'member_key_id' and a 'member_key_namespace', which requires an additional query input: 'member_key_namespace'. Example query: `member_key_id == 'member_key_id_value' && in labels` */
  query?: string;
}

export const GetMembershipGraphGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships:getMembershipGraph" }),
  svc,
) as unknown as Schema.Schema<GetMembershipGraphGroupsMembershipsRequest>;

export type GetMembershipGraphGroupsMembershipsResponse = Operation;
export const GetMembershipGraphGroupsMembershipsResponse = Operation;

export type GetMembershipGraphGroupsMembershipsError = CommonErrors;

/** Get a membership graph of just a member or both a member and a group. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. Given a member, the response will contain all membership paths from the member. Given both a group and a member, the response will contain all membership paths between the group and the member. */
export const getMembershipGraphGroupsMemberships: API.OperationMethod<GetMembershipGraphGroupsMembershipsRequest, GetMembershipGraphGroupsMembershipsResponse, GetMembershipGraphGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMembershipGraphGroupsMembershipsRequest,
  output: GetMembershipGraphGroupsMembershipsResponse,
  errors: [],
}));

export interface SearchDirectGroupsGroupsMembershipsRequest {
  /** Required. A CEL expression that MUST include member specification AND label(s). Users can search on label attributes of groups. CONTAINS match ('in') is supported on labels. Identity-mapped groups are uniquely identified by both a `member_key_id` and a `member_key_namespace`, which requires an additional query input: `member_key_namespace`. Example query: `member_key_id == 'member_key_id_value' && 'label_value' in labels` */
  query?: string;
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: groups/{group_id}, where group_id is always '-' as this API will search across all groups for a given member. */
  parent: string;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** The ordering of membership relation for the display name or email in the response. The syntax for this field can be found at https://cloud.google.com/apis/design/design_patterns#sorting_order. Example: Sort by the ascending display name: order_by="group_name" or order_by="group_name asc". Sort by the descending display name: order_by="group_name desc". Sort by the ascending group key: order_by="group_key" or order_by="group_key asc". Sort by the descending group key: order_by="group_key desc". */
  orderBy?: string;
  /** The default page size is 200 (max 1000). */
  pageSize?: number;
}

export const SearchDirectGroupsGroupsMembershipsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships:searchDirectGroups" }),
  svc,
) as unknown as Schema.Schema<SearchDirectGroupsGroupsMembershipsRequest>;

export type SearchDirectGroupsGroupsMembershipsResponse = SearchDirectGroupsResponse;
export const SearchDirectGroupsGroupsMembershipsResponse = SearchDirectGroupsResponse;

export type SearchDirectGroupsGroupsMembershipsError = CommonErrors;

/** Searches direct groups of a member. */
export const searchDirectGroupsGroupsMemberships: API.PaginatedOperationMethod<SearchDirectGroupsGroupsMembershipsRequest, SearchDirectGroupsGroupsMembershipsResponse, SearchDirectGroupsGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchDirectGroupsGroupsMembershipsRequest,
  output: SearchDirectGroupsGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteGroupsMembershipsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` to delete. Must be of the form `groups/{group_id}/memberships/{membership_id}`. */
  name: string;
}

export const DeleteGroupsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/groups/{groupsId}/memberships/{membershipsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteGroupsMembershipsRequest>;

export type DeleteGroupsMembershipsResponse = Operation;
export const DeleteGroupsMembershipsResponse = Operation;

export type DeleteGroupsMembershipsError = CommonErrors;

/** Deletes a `Membership`. */
export const deleteGroupsMemberships: API.OperationMethod<DeleteGroupsMembershipsRequest, DeleteGroupsMembershipsResponse, DeleteGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGroupsMembershipsRequest,
  output: DeleteGroupsMembershipsResponse,
  errors: [],
}));

export interface SearchTransitiveGroupsGroupsMembershipsRequest {
  /** Required. A CEL expression that MUST include member specification AND label(s). This is a `required` field. Users can search on label attributes of groups. CONTAINS match ('in') is supported on labels. Identity-mapped groups are uniquely identified by both a `member_key_id` and a `member_key_namespace`, which requires an additional query input: `member_key_namespace`. Example query: `member_key_id == 'member_key_id_value' && in labels` Query may optionally contain equality operators on the parent of the group restricting the search within a particular customer, e.g. `parent == 'customers/{customer_id}'`. The `customer_id` must begin with "C" (for example, 'C046psxkn'). This filtering is only supported for Admins with groups read permissions on the input customer. Example query: `member_key_id == 'member_key_id_value' && in labels && parent == 'customers/C046psxkn'` */
  query?: string;
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group_id}`, where `group_id` is always '-' as this API will search across all groups for a given member. */
  parent: string;
  /** The default page size is 200 (max 1000). */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous list request, if any. */
  pageToken?: string;
}

export const SearchTransitiveGroupsGroupsMembershipsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships:searchTransitiveGroups" }),
  svc,
) as unknown as Schema.Schema<SearchTransitiveGroupsGroupsMembershipsRequest>;

export type SearchTransitiveGroupsGroupsMembershipsResponse = SearchTransitiveGroupsResponse;
export const SearchTransitiveGroupsGroupsMembershipsResponse = SearchTransitiveGroupsResponse;

export type SearchTransitiveGroupsGroupsMembershipsError = CommonErrors;

/** Search transitive groups of a member. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. A transitive group is any group that has a direct or indirect membership to the member. Actor must have view permissions all transitive groups. */
export const searchTransitiveGroupsGroupsMemberships: API.PaginatedOperationMethod<SearchTransitiveGroupsGroupsMembershipsRequest, SearchTransitiveGroupsGroupsMembershipsResponse, SearchTransitiveGroupsGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchTransitiveGroupsGroupsMembershipsRequest,
  output: SearchTransitiveGroupsGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetGroupsMembershipsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` to retrieve. Must be of the form `groups/{group_id}/memberships/{membership_id}`. */
  name: string;
}

export const GetGroupsMembershipsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships/{membershipsId}" }),
  svc,
) as unknown as Schema.Schema<GetGroupsMembershipsRequest>;

export type GetGroupsMembershipsResponse = Membership;
export const GetGroupsMembershipsResponse = Membership;

export type GetGroupsMembershipsError = CommonErrors;

/** Retrieves a `Membership`. */
export const getGroupsMemberships: API.OperationMethod<GetGroupsMembershipsRequest, GetGroupsMembershipsResponse, GetGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGroupsMembershipsRequest,
  output: GetGroupsMembershipsResponse,
  errors: [],
}));

export interface CreateGroupsMembershipsRequest {
  /** Required. The parent `Group` resource under which to create the `Membership`. Must be of the form `groups/{group_id}`. */
  parent: string;
  /** Request body */
  body?: Membership;
}

export const CreateGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Membership).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/groups/{groupsId}/memberships", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGroupsMembershipsRequest>;

export type CreateGroupsMembershipsResponse = Operation;
export const CreateGroupsMembershipsResponse = Operation;

export type CreateGroupsMembershipsError = CommonErrors;

/** Creates a `Membership`. */
export const createGroupsMemberships: API.OperationMethod<CreateGroupsMembershipsRequest, CreateGroupsMembershipsResponse, CreateGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGroupsMembershipsRequest,
  output: CreateGroupsMembershipsResponse,
  errors: [],
}));

export interface SearchTransitiveMembershipsGroupsMembershipsRequest {
  /** [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group_id}`, where `group_id` is the unique ID assigned to the Group. */
  parent: string;
  /** The default page size is 200 (max 1000). */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const SearchTransitiveMembershipsGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships:searchTransitiveMemberships" }),
  svc,
) as unknown as Schema.Schema<SearchTransitiveMembershipsGroupsMembershipsRequest>;

export type SearchTransitiveMembershipsGroupsMembershipsResponse = SearchTransitiveMembershipsResponse;
export const SearchTransitiveMembershipsGroupsMembershipsResponse = SearchTransitiveMembershipsResponse;

export type SearchTransitiveMembershipsGroupsMembershipsError = CommonErrors;

/** Search transitive memberships of a group. **Note:** This feature is only available to Google Workspace Enterprise Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity Premium accounts. A transitive membership is any direct or indirect membership of a group. Actor must have view permissions to all transitive memberships. */
export const searchTransitiveMembershipsGroupsMemberships: API.PaginatedOperationMethod<SearchTransitiveMembershipsGroupsMembershipsRequest, SearchTransitiveMembershipsGroupsMembershipsResponse, SearchTransitiveMembershipsGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchTransitiveMembershipsGroupsMembershipsRequest,
  output: SearchTransitiveMembershipsGroupsMembershipsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface LookupGroupsMembershipsRequest {
  /** Required. The parent `Group` resource under which to lookup the `Membership` name. Must be of the form `groups/{group_id}`. */
  parent: string;
  /** The ID of the entity. For Google-managed entities, the `id` must be the email address of an existing group or user. For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. */
  "memberKey.id"?: string;
  /** The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source_id}`. */
  "memberKey.namespace"?: string;
}

export const LookupGroupsMembershipsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  "memberKey.id": Schema.optional(Schema.String).pipe(T.HttpQuery("memberKey.id")),
  "memberKey.namespace": Schema.optional(Schema.String).pipe(T.HttpQuery("memberKey.namespace")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/groups/{groupsId}/memberships:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupGroupsMembershipsRequest>;

export type LookupGroupsMembershipsResponse = LookupMembershipNameResponse;
export const LookupGroupsMembershipsResponse = LookupMembershipNameResponse;

export type LookupGroupsMembershipsError = CommonErrors;

/** Looks up the [resource name](https://cloud.google.com/apis/design/resource_names) of a `Membership` by its `EntityKey`. */
export const lookupGroupsMemberships: API.OperationMethod<LookupGroupsMembershipsRequest, LookupGroupsMembershipsResponse, LookupGroupsMembershipsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupGroupsMembershipsRequest,
  output: LookupGroupsMembershipsResponse,
  errors: [],
}));

export interface CreateInboundSamlSsoProfilesRequest {
  /** Request body */
  body?: InboundSamlSsoProfile;
}

export const CreateInboundSamlSsoProfilesRequest = Schema.Struct({
  body: Schema.optional(InboundSamlSsoProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/inboundSamlSsoProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInboundSamlSsoProfilesRequest>;

export type CreateInboundSamlSsoProfilesResponse = Operation;
export const CreateInboundSamlSsoProfilesResponse = Operation;

export type CreateInboundSamlSsoProfilesError = CommonErrors;

/** Creates an InboundSamlSsoProfile for a customer. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export const createInboundSamlSsoProfiles: API.OperationMethod<CreateInboundSamlSsoProfilesRequest, CreateInboundSamlSsoProfilesResponse, CreateInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInboundSamlSsoProfilesRequest,
  output: CreateInboundSamlSsoProfilesResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1beta1/inboundSamlSsoProfiles" }),
  svc,
) as unknown as Schema.Schema<ListInboundSamlSsoProfilesRequest>;

export type ListInboundSamlSsoProfilesResponse_Op = ListInboundSamlSsoProfilesResponse;
export const ListInboundSamlSsoProfilesResponse_Op = ListInboundSamlSsoProfilesResponse;

export type ListInboundSamlSsoProfilesError = CommonErrors;

/** Lists InboundSamlSsoProfiles for a customer. */
export const listInboundSamlSsoProfiles: API.PaginatedOperationMethod<ListInboundSamlSsoProfilesRequest, ListInboundSamlSsoProfilesResponse_Op, ListInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListInboundSamlSsoProfilesRequest,
  output: ListInboundSamlSsoProfilesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteInboundSamlSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSamlSsoProfile to delete. Format: `inboundSamlSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const DeleteInboundSamlSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundSamlSsoProfilesRequest>;

export type DeleteInboundSamlSsoProfilesResponse = Operation;
export const DeleteInboundSamlSsoProfilesResponse = Operation;

export type DeleteInboundSamlSsoProfilesError = CommonErrors;

/** Deletes an InboundSamlSsoProfile. */
export const deleteInboundSamlSsoProfiles: API.OperationMethod<DeleteInboundSamlSsoProfilesRequest, DeleteInboundSamlSsoProfilesResponse, DeleteInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundSamlSsoProfilesRequest,
  output: DeleteInboundSamlSsoProfilesResponse,
  errors: [],
}));

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
  T.Http({ method: "PATCH", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInboundSamlSsoProfilesRequest>;

export type PatchInboundSamlSsoProfilesResponse = Operation;
export const PatchInboundSamlSsoProfilesResponse = Operation;

export type PatchInboundSamlSsoProfilesError = CommonErrors;

/** Updates an InboundSamlSsoProfile. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export const patchInboundSamlSsoProfiles: API.OperationMethod<PatchInboundSamlSsoProfilesRequest, PatchInboundSamlSsoProfilesResponse, PatchInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInboundSamlSsoProfilesRequest,
  output: PatchInboundSamlSsoProfilesResponse,
  errors: [],
}));

export interface GetInboundSamlSsoProfilesRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSamlSsoProfile to get. Format: `inboundSamlSsoProfiles/{sso_profile_id}` */
  name: string;
}

export const GetInboundSamlSsoProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundSamlSsoProfilesRequest>;

export type GetInboundSamlSsoProfilesResponse = InboundSamlSsoProfile;
export const GetInboundSamlSsoProfilesResponse = InboundSamlSsoProfile;

export type GetInboundSamlSsoProfilesError = CommonErrors;

/** Gets an InboundSamlSsoProfile. */
export const getInboundSamlSsoProfiles: API.OperationMethod<GetInboundSamlSsoProfilesRequest, GetInboundSamlSsoProfilesResponse, GetInboundSamlSsoProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundSamlSsoProfilesRequest,
  output: GetInboundSamlSsoProfilesResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials" }),
  svc,
) as unknown as Schema.Schema<ListInboundSamlSsoProfilesIdpCredentialsRequest>;

export type ListInboundSamlSsoProfilesIdpCredentialsResponse = ListIdpCredentialsResponse;
export const ListInboundSamlSsoProfilesIdpCredentialsResponse = ListIdpCredentialsResponse;

export type ListInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

/** Returns a list of IdpCredentials in an InboundSamlSsoProfile. */
export const listInboundSamlSsoProfilesIdpCredentials: API.PaginatedOperationMethod<ListInboundSamlSsoProfilesIdpCredentialsRequest, ListInboundSamlSsoProfilesIdpCredentialsResponse, ListInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListInboundSamlSsoProfilesIdpCredentialsRequest,
  output: ListInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteInboundSamlSsoProfilesIdpCredentialsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the IdpCredential to delete. Format: `inboundSamlSsoProfiles/{sso_profile_id}/idpCredentials/{idp_credential_id}` */
  name: string;
}

export const DeleteInboundSamlSsoProfilesIdpCredentialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials/{idpCredentialsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundSamlSsoProfilesIdpCredentialsRequest>;

export type DeleteInboundSamlSsoProfilesIdpCredentialsResponse = Operation;
export const DeleteInboundSamlSsoProfilesIdpCredentialsResponse = Operation;

export type DeleteInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

/** Deletes an IdpCredential. */
export const deleteInboundSamlSsoProfilesIdpCredentials: API.OperationMethod<DeleteInboundSamlSsoProfilesIdpCredentialsRequest, DeleteInboundSamlSsoProfilesIdpCredentialsResponse, DeleteInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundSamlSsoProfilesIdpCredentialsRequest,
  output: DeleteInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
}));

export interface GetInboundSamlSsoProfilesIdpCredentialsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the IdpCredential to retrieve. Format: `inboundSamlSsoProfiles/{sso_profile_id}/idpCredentials/{idp_credential_id}` */
  name: string;
}

export const GetInboundSamlSsoProfilesIdpCredentialsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials/{idpCredentialsId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundSamlSsoProfilesIdpCredentialsRequest>;

export type GetInboundSamlSsoProfilesIdpCredentialsResponse = IdpCredential;
export const GetInboundSamlSsoProfilesIdpCredentialsResponse = IdpCredential;

export type GetInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

/** Gets an IdpCredential. */
export const getInboundSamlSsoProfilesIdpCredentials: API.OperationMethod<GetInboundSamlSsoProfilesIdpCredentialsRequest, GetInboundSamlSsoProfilesIdpCredentialsResponse, GetInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundSamlSsoProfilesIdpCredentialsRequest,
  output: GetInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
}));

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
  T.Http({ method: "POST", path: "v1beta1/inboundSamlSsoProfiles/{inboundSamlSsoProfilesId}/idpCredentials:add", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddInboundSamlSsoProfilesIdpCredentialsRequest>;

export type AddInboundSamlSsoProfilesIdpCredentialsResponse = Operation;
export const AddInboundSamlSsoProfilesIdpCredentialsResponse = Operation;

export type AddInboundSamlSsoProfilesIdpCredentialsError = CommonErrors;

/** Adds an IdpCredential. Up to 2 credentials are allowed. When the target customer has enabled [Multi-party approval for sensitive actions](https://support.google.com/a/answer/13790448), the `Operation` in the response will have `"done": false`, it will not have a response, and the metadata will have `"state": "awaiting-multi-party-approval"`. */
export const addInboundSamlSsoProfilesIdpCredentials: API.OperationMethod<AddInboundSamlSsoProfilesIdpCredentialsRequest, AddInboundSamlSsoProfilesIdpCredentialsResponse, AddInboundSamlSsoProfilesIdpCredentialsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddInboundSamlSsoProfilesIdpCredentialsRequest,
  output: AddInboundSamlSsoProfilesIdpCredentialsResponse,
  errors: [],
}));

export interface DeletePoliciesRequest {
  /** Required. The name of the policy to delete. Format: `policies/{policy}`. */
  name: string;
}

export const DeletePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePoliciesRequest>;

export type DeletePoliciesResponse = Operation;
export const DeletePoliciesResponse = Operation;

export type DeletePoliciesError = CommonErrors;

/** Delete a policy. */
export const deletePolicies: API.OperationMethod<DeletePoliciesRequest, DeletePoliciesResponse, DeletePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeletePoliciesRequest,
  output: DeletePoliciesResponse,
  errors: [],
}));

export interface CreatePoliciesRequest {
  /** Request body */
  body?: Policy;
}

export const CreatePoliciesRequest = Schema.Struct({
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/policies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePoliciesRequest>;

export type CreatePoliciesResponse = Operation;
export const CreatePoliciesResponse = Operation;

export type CreatePoliciesError = CommonErrors;

/** Create a policy. */
export const createPolicies: API.OperationMethod<CreatePoliciesRequest, CreatePoliciesResponse, CreatePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreatePoliciesRequest,
  output: CreatePoliciesResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1beta1/policies" }),
  svc,
) as unknown as Schema.Schema<ListPoliciesRequest>;

export type ListPoliciesResponse_Op = ListPoliciesResponse;
export const ListPoliciesResponse_Op = ListPoliciesResponse;

export type ListPoliciesError = CommonErrors;

/** List policies. */
export const listPolicies: API.PaginatedOperationMethod<ListPoliciesRequest, ListPoliciesResponse_Op, ListPoliciesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetPoliciesRequest {
  /** Required. The name of the policy to retrieve. Format: `policies/{policy}`. */
  name: string;
}

export const GetPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetPoliciesRequest>;

export type GetPoliciesResponse = Policy;
export const GetPoliciesResponse = Policy;

export type GetPoliciesError = CommonErrors;

/** Get a policy. */
export const getPolicies: API.OperationMethod<GetPoliciesRequest, GetPoliciesResponse, GetPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPoliciesRequest,
  output: GetPoliciesResponse,
  errors: [],
}));

export interface PatchPoliciesRequest {
  /** Output only. Identifier. The [resource name](https://cloud.google.com/apis/design/resource_names) of the Policy. Format: policies/{policy}. */
  name: string;
  /** Request body */
  body?: Policy;
}

export const PatchPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/policies/{policiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchPoliciesRequest>;

export type PatchPoliciesResponse = Operation;
export const PatchPoliciesResponse = Operation;

export type PatchPoliciesError = CommonErrors;

/** Update a policy. */
export const patchPolicies: API.OperationMethod<PatchPoliciesRequest, PatchPoliciesResponse, PatchPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchPoliciesRequest,
  output: PatchPoliciesResponse,
  errors: [],
}));

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
  T.Http({ method: "POST", path: "v1beta1/customers/{customersId}/userinvitations/{userinvitationsId}:send", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendCustomersUserinvitationsRequest>;

export type SendCustomersUserinvitationsResponse = Operation;
export const SendCustomersUserinvitationsResponse = Operation;

export type SendCustomersUserinvitationsError = CommonErrors;

/** Sends a UserInvitation to email. If the `UserInvitation` does not exist for this request and it is a valid request, the request creates a `UserInvitation`. **Note:** The `get` and `list` methods have a 48-hour delay where newly-created consumer accounts will not appear in the results. You can still send a `UserInvitation` to those accounts if you know the unmanaged email address and IsInvitableUser==True. */
export const sendCustomersUserinvitations: API.OperationMethod<SendCustomersUserinvitationsRequest, SendCustomersUserinvitationsResponse, SendCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendCustomersUserinvitationsRequest,
  output: SendCustomersUserinvitationsResponse,
  errors: [],
}));

export interface ListCustomersUserinvitationsRequest {
  /** Optional. The sort order of the list results. You can sort the results in descending order based on either email or last update timestamp but not both, using `order_by="email desc"`. Currently, sorting is supported for `update_time asc`, `update_time desc`, `email asc`, and `email desc`. If not specified, results will be returned based on `email asc` order. */
  orderBy?: string;
  /** Optional. The maximum number of UserInvitation resources to return. If unspecified, at most 100 resources will be returned. The maximum value is 200; values above 200 will be set to 200. */
  pageSize?: number;
  /** Optional. A query string for filtering `UserInvitation` results by their current state, in the format: `"state=='invited'"`. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListUserInvitations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBooks` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The customer ID of the Google Workspace or Cloud Identity account the UserInvitation resources are associated with. */
  parent: string;
}

export const ListCustomersUserinvitationsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/customers/{customersId}/userinvitations" }),
  svc,
) as unknown as Schema.Schema<ListCustomersUserinvitationsRequest>;

export type ListCustomersUserinvitationsResponse = ListUserInvitationsResponse;
export const ListCustomersUserinvitationsResponse = ListUserInvitationsResponse;

export type ListCustomersUserinvitationsError = CommonErrors;

/** Retrieves a list of UserInvitation resources. **Note:** New consumer accounts with the customer's verified domain created within the previous 48 hours will not appear in the result. This delay also applies to newly-verified domains. */
export const listCustomersUserinvitations: API.PaginatedOperationMethod<ListCustomersUserinvitationsRequest, ListCustomersUserinvitationsResponse, ListCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListCustomersUserinvitationsRequest,
  output: ListCustomersUserinvitationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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
  T.Http({ method: "POST", path: "v1beta1/customers/{customersId}/userinvitations/{userinvitationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelCustomersUserinvitationsRequest>;

export type CancelCustomersUserinvitationsResponse = Operation;
export const CancelCustomersUserinvitationsResponse = Operation;

export type CancelCustomersUserinvitationsError = CommonErrors;

/** Cancels a UserInvitation that was already sent. */
export const cancelCustomersUserinvitations: API.OperationMethod<CancelCustomersUserinvitationsRequest, CancelCustomersUserinvitationsResponse, CancelCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelCustomersUserinvitationsRequest,
  output: CancelCustomersUserinvitationsResponse,
  errors: [],
}));

export interface IsInvitableUserCustomersUserinvitationsRequest {
  /** Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}` */
  name: string;
}

export const IsInvitableUserCustomersUserinvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/customers/{customersId}/userinvitations/{userinvitationsId}:isInvitableUser" }),
  svc,
) as unknown as Schema.Schema<IsInvitableUserCustomersUserinvitationsRequest>;

export type IsInvitableUserCustomersUserinvitationsResponse = IsInvitableUserResponse;
export const IsInvitableUserCustomersUserinvitationsResponse = IsInvitableUserResponse;

export type IsInvitableUserCustomersUserinvitationsError = CommonErrors;

/** Verifies whether a user account is eligible to receive a UserInvitation (is an unmanaged account). Eligibility is based on the following criteria: * the email address is a consumer account and it's the primary email address of the account, and * the domain of the email address matches an existing verified Google Workspace or Cloud Identity domain If both conditions are met, the user is eligible. **Note:** This method is not supported for Workspace Essentials customers. */
export const isInvitableUserCustomersUserinvitations: API.OperationMethod<IsInvitableUserCustomersUserinvitationsRequest, IsInvitableUserCustomersUserinvitationsResponse, IsInvitableUserCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IsInvitableUserCustomersUserinvitationsRequest,
  output: IsInvitableUserCustomersUserinvitationsResponse,
  errors: [],
}));

export interface GetCustomersUserinvitationsRequest {
  /** Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}` */
  name: string;
}

export const GetCustomersUserinvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/customers/{customersId}/userinvitations/{userinvitationsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersUserinvitationsRequest>;

export type GetCustomersUserinvitationsResponse = UserInvitation;
export const GetCustomersUserinvitationsResponse = UserInvitation;

export type GetCustomersUserinvitationsError = CommonErrors;

/** Retrieves a UserInvitation resource. **Note:** New consumer accounts with the customer's verified domain created within the previous 48 hours will not appear in the result. This delay also applies to newly-verified domains. */
export const getCustomersUserinvitations: API.OperationMethod<GetCustomersUserinvitationsRequest, GetCustomersUserinvitationsResponse, GetCustomersUserinvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersUserinvitationsRequest,
  output: GetCustomersUserinvitationsResponse,
  errors: [],
}));

export interface DeleteInboundSsoAssignmentsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSsoAssignment to delete. Format: `inboundSsoAssignments/{assignment}` */
  name: string;
}

export const DeleteInboundSsoAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/inboundSsoAssignments/{inboundSsoAssignmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInboundSsoAssignmentsRequest>;

export type DeleteInboundSsoAssignmentsResponse = Operation;
export const DeleteInboundSsoAssignmentsResponse = Operation;

export type DeleteInboundSsoAssignmentsError = CommonErrors;

/** Deletes an InboundSsoAssignment. To disable SSO, Create (or Update) an assignment that has `sso_mode` == `SSO_OFF`. */
export const deleteInboundSsoAssignments: API.OperationMethod<DeleteInboundSsoAssignmentsRequest, DeleteInboundSsoAssignmentsResponse, DeleteInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInboundSsoAssignmentsRequest,
  output: DeleteInboundSsoAssignmentsResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1beta1/inboundSsoAssignments" }),
  svc,
) as unknown as Schema.Schema<ListInboundSsoAssignmentsRequest>;

export type ListInboundSsoAssignmentsResponse_Op = ListInboundSsoAssignmentsResponse;
export const ListInboundSsoAssignmentsResponse_Op = ListInboundSsoAssignmentsResponse;

export type ListInboundSsoAssignmentsError = CommonErrors;

/** Lists the InboundSsoAssignments for a `Customer`. */
export const listInboundSsoAssignments: API.PaginatedOperationMethod<ListInboundSsoAssignmentsRequest, ListInboundSsoAssignmentsResponse_Op, ListInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListInboundSsoAssignmentsRequest,
  output: ListInboundSsoAssignmentsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateInboundSsoAssignmentsRequest {
  /** Request body */
  body?: InboundSsoAssignment;
}

export const CreateInboundSsoAssignmentsRequest = Schema.Struct({
  body: Schema.optional(InboundSsoAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/inboundSsoAssignments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateInboundSsoAssignmentsRequest>;

export type CreateInboundSsoAssignmentsResponse = Operation;
export const CreateInboundSsoAssignmentsResponse = Operation;

export type CreateInboundSsoAssignmentsError = CommonErrors;

/** Creates an InboundSsoAssignment for users and devices in a `Customer` under a given `Group` or `OrgUnit`. */
export const createInboundSsoAssignments: API.OperationMethod<CreateInboundSsoAssignmentsRequest, CreateInboundSsoAssignmentsResponse, CreateInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateInboundSsoAssignmentsRequest,
  output: CreateInboundSsoAssignmentsResponse,
  errors: [],
}));

export interface GetInboundSsoAssignmentsRequest {
  /** Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSsoAssignment to fetch. Format: `inboundSsoAssignments/{assignment}` */
  name: string;
}

export const GetInboundSsoAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/inboundSsoAssignments/{inboundSsoAssignmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetInboundSsoAssignmentsRequest>;

export type GetInboundSsoAssignmentsResponse = InboundSsoAssignment;
export const GetInboundSsoAssignmentsResponse = InboundSsoAssignment;

export type GetInboundSsoAssignmentsError = CommonErrors;

/** Gets an InboundSsoAssignment. */
export const getInboundSsoAssignments: API.OperationMethod<GetInboundSsoAssignmentsRequest, GetInboundSsoAssignmentsResponse, GetInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInboundSsoAssignmentsRequest,
  output: GetInboundSsoAssignmentsResponse,
  errors: [],
}));

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
  T.Http({ method: "PATCH", path: "v1beta1/inboundSsoAssignments/{inboundSsoAssignmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchInboundSsoAssignmentsRequest>;

export type PatchInboundSsoAssignmentsResponse = Operation;
export const PatchInboundSsoAssignmentsResponse = Operation;

export type PatchInboundSsoAssignmentsError = CommonErrors;

/** Updates an InboundSsoAssignment. The body of this request is the `inbound_sso_assignment` field and the `update_mask` is relative to that. For example: a PATCH to `/v1beta1/inboundSsoAssignments/0abcdefg1234567&update_mask=rank` with a body of `{ "rank": 1 }` moves that (presumably group-targeted) SSO assignment to the highest priority and shifts any other group-targeted assignments down in priority. */
export const patchInboundSsoAssignments: API.OperationMethod<PatchInboundSsoAssignmentsRequest, PatchInboundSsoAssignmentsResponse, PatchInboundSsoAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchInboundSsoAssignmentsRequest,
  output: PatchInboundSsoAssignmentsResponse,
  errors: [],
}));

