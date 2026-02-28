// ==========================================================================
// Chrome Verified Access API (verifiedaccess v2)
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
  name: "verifiedaccess",
  version: "v2",
  rootUrl: "https://verifiedaccess.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Challenge {
  /** Generated challenge, the bytes representation of SignedData. */
  challenge?: string;
}

export const Challenge: Schema.Schema<Challenge> = Schema.suspend(() => Schema.Struct({
  challenge: Schema.optional(Schema.String),
})).annotate({ identifier: "Challenge" }) as any as Schema.Schema<Challenge>;

export interface VerifyChallengeResponseRequest {
  /** Required. The generated response to the challenge, the bytes representation of SignedData. */
  challengeResponse?: string;
  /** Optional. Service can optionally provide identity information about the device or user associated with the key. For an EMK, this value is the enrolled domain. For an EUK, this value is the user's email address. If present, this value will be checked against contents of the response, and verification will fail if there is no match. */
  expectedIdentity?: string;
}

export const VerifyChallengeResponseRequest: Schema.Schema<VerifyChallengeResponseRequest> = Schema.suspend(() => Schema.Struct({
  challengeResponse: Schema.optional(Schema.String),
  expectedIdentity: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyChallengeResponseRequest" }) as any as Schema.Schema<VerifyChallengeResponseRequest>;

export interface CrowdStrikeAgent {
  /** Output only. The Agent ID of the Crowdstrike agent. */
  agentId?: string;
  /** Output only. The Customer ID to which the agent belongs to. */
  customerId?: string;
}

export const CrowdStrikeAgent: Schema.Schema<CrowdStrikeAgent> = Schema.suspend(() => Schema.Struct({
  agentId: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
})).annotate({ identifier: "CrowdStrikeAgent" }) as any as Schema.Schema<CrowdStrikeAgent>;

export interface Antivirus {
  /** Output only. The state of the antivirus on the device. Introduced in Chrome M136. */
  state?: "STATE_UNSPECIFIED" | "MISSING" | "DISABLED" | "ENABLED" | (string & {});
}

export const Antivirus: Schema.Schema<Antivirus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Antivirus" }) as any as Schema.Schema<Antivirus>;

export interface DeviceSignals {
  /** Output only. The name of the device's manufacturer. */
  deviceManufacturer?: string;
  /** Output only. The name of the device's model. */
  deviceModel?: string;
  /** Output only. The type of the Operating System currently running on the device. */
  operatingSystem?: "OPERATING_SYSTEM_UNSPECIFIED" | "CHROME_OS" | "CHROMIUM_OS" | "WINDOWS" | "MAC_OS_X" | "LINUX" | (string & {});
  /** Output only. The current version of the Operating System. On Windows and linux, the value will also include the security patch information. */
  osVersion?: string;
  /** Output only. The display name of the device, as defined by the user. */
  displayName?: string;
  /** Output only. The encryption state of the disk. On ChromeOS, the main disk is always ENCRYPTED. */
  diskEncryption?: "DISK_ENCRYPTION_UNSPECIFIED" | "DISK_ENCRYPTION_UNKNOWN" | "DISK_ENCRYPTION_DISABLED" | "DISK_ENCRYPTION_ENCRYPTED" | (string & {});
  /** Output only. The serial number of the device. On Windows, this represents the BIOS's serial number. Not available on most Linux distributions. */
  serialNumber?: string;
  /** Output only. The state of the OS level firewall. On ChromeOS, the value will always be ENABLED on regular devices and UNKNOWN on devices in developer mode. Support for MacOS 15 (Sequoia) and later has been introduced in Chrome M131. */
  osFirewall?: "OS_FIREWALL_UNSPECIFIED" | "OS_FIREWALL_UNKNOWN" | "OS_FIREWALL_DISABLED" | "OS_FIREWALL_ENABLED" | (string & {});
  /** List of the addesses of all OS level DNS servers configured in the device's network settings. */
  systemDnsServers?: Array<string>;
  /** Hostname of the device. */
  hostname?: string;
  /** Output only. MAC addresses of the device. */
  macAddresses?: Array<string>;
  /** Output only. The state of the Screen Lock password protection. On ChromeOS, this value will always be ENABLED as there is not way to disable requiring a password or pin when unlocking the device. */
  screenLockSecured?: "SCREEN_LOCK_SECURED_UNSPECIFIED" | "SCREEN_LOCK_SECURED_UNKNOWN" | "SCREEN_LOCK_SECURED_DISABLED" | "SCREEN_LOCK_SECURED_ENABLED" | (string & {});
  /** Output only. Value of the AllowScreenLock policy on the device. See https://chromeenterprise.google/policies/?policy=AllowScreenLock for more details. Available on ChromeOS only. */
  allowScreenLock?: boolean;
  /** Output only. International Mobile Equipment Identity (IMEI) of the device. Available on ChromeOS only. */
  imei?: Array<string>;
  /** Output only. Mobile Equipment Identifier (MEID) of the device. Available on ChromeOS only. */
  meid?: Array<string>;
  /** Output only. Whether the device's startup software has its Secure Boot feature enabled. Available on Windows only. */
  secureBootMode?: "SECURE_BOOT_MODE_UNSPECIFIED" | "SECURE_BOOT_MODE_UNKNOWN" | "SECURE_BOOT_MODE_DISABLED" | "SECURE_BOOT_MODE_ENABLED" | (string & {});
  /** Output only. Windows domain that the current machine has joined. Available on Windows only. */
  windowsMachineDomain?: string;
  /** Output only. Windows domain for the current OS user. Available on Windows only. */
  windowsUserDomain?: string;
  /** Output only. Enrollment domain of the customer which is currently managing the device. */
  deviceEnrollmentDomain?: string;
  /** Output only. Current version of the Chrome browser which generated this set of signals. Example value: "107.0.5286.0". */
  browserVersion?: string;
  /** Output only. Affiliation IDs of the organizations that are affiliated with the organization that is currently managing the device. When the sets of device and profile affiliation IDs overlap, it means that the organizations managing the device and user are affiliated. To learn more about user affiliation, visit https://support.google.com/chrome/a/answer/12801245?ref_topic=9027936. */
  deviceAffiliationIds?: Array<string>;
  /** Output only. Affiliation IDs of the organizations that are affiliated with the organization that is currently managing the Chrome Profile’s user or ChromeOS user. */
  profileAffiliationIds?: Array<string>;
  /** Output only. Whether Chrome's built-in DNS client is used. The OS DNS client is otherwise used. This value may be controlled by an enterprise policy: https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled. */
  builtInDnsClientEnabled?: boolean;
  /** Output only. Whether access to the Chrome Remote Desktop application is blocked via a policy. */
  chromeRemoteDesktopAppBlocked?: boolean;
  /** Output only. Safe Browsing Protection Level. That setting may be controlled by an enterprise policy: https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel. */
  safeBrowsingProtectionLevel?: "SAFE_BROWSING_PROTECTION_LEVEL_UNSPECIFIED" | "INACTIVE" | "STANDARD" | "ENHANCED" | (string & {});
  /** Output only. Whether the Site Isolation (a.k.a Site Per Process) setting is enabled. That setting may be controlled by an enterprise policy: https://chromeenterprise.google/policies/#SitePerProcess */
  siteIsolationEnabled?: boolean;
  /** Output only. Whether the Password Protection Warning feature is enabled or not. Password protection alerts users when they reuse their protected password on potentially suspicious sites. This setting is controlled by an enterprise policy: https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger. Note that the policy unset does not have the same effects as having the policy explicitly set to `PASSWORD_PROTECTION_OFF`. */
  passwordProtectionWarningTrigger?: "PASSWORD_PROTECTION_WARNING_TRIGGER_UNSPECIFIED" | "POLICY_UNSET" | "PASSWORD_PROTECTION_OFF" | "PASSWORD_REUSE" | "PHISHING_REUSE" | (string & {});
  /** Output only. Whether Enterprise-grade (i.e. custom) unsafe URL scanning is enabled or not. This setting may be controlled by an enterprise policy: https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode */
  realtimeUrlCheckMode?: "REALTIME_URL_CHECK_MODE_UNSPECIFIED" | "REALTIME_URL_CHECK_MODE_DISABLED" | "REALTIME_URL_CHECK_MODE_ENABLED_MAIN_FRAME" | (string & {});
  /** Output only. Deprecated. The corresponding policy is now deprecated. Whether Chrome is blocking third-party software injection or not. This setting may be controlled by an enterprise policy: https://chromeenterprise.google/policies/?policy=ThirdPartyBlockingEnabled. Available on Windows only. */
  thirdPartyBlockingEnabled?: boolean;
  /** Output only. Crowdstrike agent properties installed on the device, if any. Available on Windows and MacOS only. */
  crowdStrikeAgent?: CrowdStrikeAgent;
  /** Output only. The trigger which generated this set of signals. */
  trigger?: "TRIGGER_UNSPECIFIED" | "TRIGGER_BROWSER_NAVIGATION" | "TRIGGER_LOGIN_SCREEN" | (string & {});
  /** Output only. Enrollment domain of the customer which is currently managing the profile. */
  profileEnrollmentDomain?: string;
  /** Output only. Information about Antivirus software on the device. Available on Windows only. */
  antivirus?: Antivirus;
}

export const DeviceSignals: Schema.Schema<DeviceSignals> = Schema.suspend(() => Schema.Struct({
  deviceManufacturer: Schema.optional(Schema.String),
  deviceModel: Schema.optional(Schema.String),
  operatingSystem: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  diskEncryption: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  osFirewall: Schema.optional(Schema.String),
  systemDnsServers: Schema.optional(Schema.Array(Schema.String)),
  hostname: Schema.optional(Schema.String),
  macAddresses: Schema.optional(Schema.Array(Schema.String)),
  screenLockSecured: Schema.optional(Schema.String),
  allowScreenLock: Schema.optional(Schema.Boolean),
  imei: Schema.optional(Schema.Array(Schema.String)),
  meid: Schema.optional(Schema.Array(Schema.String)),
  secureBootMode: Schema.optional(Schema.String),
  windowsMachineDomain: Schema.optional(Schema.String),
  windowsUserDomain: Schema.optional(Schema.String),
  deviceEnrollmentDomain: Schema.optional(Schema.String),
  browserVersion: Schema.optional(Schema.String),
  deviceAffiliationIds: Schema.optional(Schema.Array(Schema.String)),
  profileAffiliationIds: Schema.optional(Schema.Array(Schema.String)),
  builtInDnsClientEnabled: Schema.optional(Schema.Boolean),
  chromeRemoteDesktopAppBlocked: Schema.optional(Schema.Boolean),
  safeBrowsingProtectionLevel: Schema.optional(Schema.String),
  siteIsolationEnabled: Schema.optional(Schema.Boolean),
  passwordProtectionWarningTrigger: Schema.optional(Schema.String),
  realtimeUrlCheckMode: Schema.optional(Schema.String),
  thirdPartyBlockingEnabled: Schema.optional(Schema.Boolean),
  crowdStrikeAgent: Schema.optional(CrowdStrikeAgent),
  trigger: Schema.optional(Schema.String),
  profileEnrollmentDomain: Schema.optional(Schema.String),
  antivirus: Schema.optional(Antivirus),
})).annotate({ identifier: "DeviceSignals" }) as any as Schema.Schema<DeviceSignals>;

export interface VerifyChallengeResponseResult {
  /** Output only. Device permanent id is returned in this field (for the machine response only). */
  devicePermanentId?: string;
  /** Output only. Virtual device id of the device. The definition of virtual device id is platform-specific. */
  virtualDeviceId?: string;
  /** Output only. Unique customer id that this device belongs to, as defined by the Google Admin SDK at https://developers.google.com/admin-sdk/directory/v1/guides/manage-customers */
  customerId?: string;
  /** Output only. Certificate Signing Request (in the SPKAC format, base64 encoded) is returned in this field. This field will be set only if device has included CSR in its challenge response. (the option to include CSR is now available for both user and machine responses) */
  signedPublicKeyAndChallenge?: string;
  /** Output only. Deprecated. Device signal in json string representation. Prefer using `device_signals` instead. */
  deviceSignal?: string;
  /** Output only. Device signals. */
  deviceSignals?: DeviceSignals;
  /** Output only. Device attested key trust level. */
  keyTrustLevel?: "KEY_TRUST_LEVEL_UNSPECIFIED" | "CHROME_OS_VERIFIED_MODE" | "CHROME_OS_DEVELOPER_MODE" | "CHROME_BROWSER_HW_KEY" | "CHROME_BROWSER_OS_KEY" | "CHROME_BROWSER_NO_KEY" | "CHROME_OS_NO_KEY" | (string & {});
  /** Output only. Unique customer id that this profile belongs to, as defined by the Google Admin SDK at https://developers.google.com/admin-sdk/directory/v1/guides/manage-customers */
  profileCustomerId?: string;
  /** Output only. The client-provided ID of a profile on the device. */
  virtualProfileId?: string;
  /** Output only. The unique server-side ID of a profile on the device. */
  profilePermanentId?: string;
  /** Output only. Profile attested key trust level. */
  profileKeyTrustLevel?: "KEY_TRUST_LEVEL_UNSPECIFIED" | "CHROME_OS_VERIFIED_MODE" | "CHROME_OS_DEVELOPER_MODE" | "CHROME_BROWSER_HW_KEY" | "CHROME_BROWSER_OS_KEY" | "CHROME_BROWSER_NO_KEY" | "CHROME_OS_NO_KEY" | (string & {});
  /** Output only. Attested device ID (ADID). */
  attestedDeviceId?: string;
  /** Output only. Device enrollment id for ChromeOS devices. */
  deviceEnrollmentId?: string;
}

export const VerifyChallengeResponseResult: Schema.Schema<VerifyChallengeResponseResult> = Schema.suspend(() => Schema.Struct({
  devicePermanentId: Schema.optional(Schema.String),
  virtualDeviceId: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  signedPublicKeyAndChallenge: Schema.optional(Schema.String),
  deviceSignal: Schema.optional(Schema.String),
  deviceSignals: Schema.optional(DeviceSignals),
  keyTrustLevel: Schema.optional(Schema.String),
  profileCustomerId: Schema.optional(Schema.String),
  virtualProfileId: Schema.optional(Schema.String),
  profilePermanentId: Schema.optional(Schema.String),
  profileKeyTrustLevel: Schema.optional(Schema.String),
  attestedDeviceId: Schema.optional(Schema.String),
  deviceEnrollmentId: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyChallengeResponseResult" }) as any as Schema.Schema<VerifyChallengeResponseResult>;

// ==========================================================================
// Operations
// ==========================================================================

/** Generates a new challenge. */
export interface GenerateChallengeRequest {
  /** Request body */
  body?: Empty;
}

export const GenerateChallengeRequest = Schema.Struct({
  body: Schema.optional(Empty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/challenge:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateChallengeRequest>;

export type GenerateChallengeResponse = Challenge;
export const GenerateChallengeResponse = Challenge;

export type GenerateChallengeError = CommonErrors;

export const generateChallenge: API.OperationMethod<GenerateChallengeRequest, GenerateChallengeResponse, GenerateChallengeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateChallengeRequest,
  output: GenerateChallengeResponse,
  errors: [],
}));

/** Verifies the challenge response. */
export interface VerifyChallengeRequest {
  /** Request body */
  body?: VerifyChallengeResponseRequest;
}

export const VerifyChallengeRequest = Schema.Struct({
  body: Schema.optional(VerifyChallengeResponseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/challenge:verify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyChallengeRequest>;

export type VerifyChallengeResponse = VerifyChallengeResponseResult;
export const VerifyChallengeResponse = VerifyChallengeResponseResult;

export type VerifyChallengeError = CommonErrors;

export const verifyChallenge: API.OperationMethod<VerifyChallengeRequest, VerifyChallengeResponse, VerifyChallengeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyChallengeRequest,
  output: VerifyChallengeResponse,
  errors: [],
}));

