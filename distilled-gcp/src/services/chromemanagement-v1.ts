// ==========================================================================
// Chrome Management API (chromemanagement v1)
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
  name: "chromemanagement",
  version: "v1",
  rootUrl: "https://chromemanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleChromeManagementV1ChromeAppPermission {
  /** Output only. The type of the permission. */
  type?: string;
  /** Output only. If available, a URI to a page that has documentation for the current permission. */
  documentationUri?: string;
  /** Output only. If available, whether this permissions grants the app/extension access to user data. */
  accessUserData?: boolean;
}

export const GoogleChromeManagementV1ChromeAppPermission: Schema.Schema<GoogleChromeManagementV1ChromeAppPermission> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  documentationUri: Schema.optional(Schema.String),
  accessUserData: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChromeManagementV1ChromeAppPermission" }) as any as Schema.Schema<GoogleChromeManagementV1ChromeAppPermission>;

export interface GoogleChromeManagementV1ChromeAppSiteAccess {
  /** Output only. This can contain very specific hosts, or patterns like "*.com" for instance. */
  hostMatch?: string;
}

export const GoogleChromeManagementV1ChromeAppSiteAccess: Schema.Schema<GoogleChromeManagementV1ChromeAppSiteAccess> = Schema.suspend(() => Schema.Struct({
  hostMatch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ChromeAppSiteAccess" }) as any as Schema.Schema<GoogleChromeManagementV1ChromeAppSiteAccess>;

export interface GoogleChromeManagementV1ChromeAppInfo {
  /** Output only. The app developer has enabled support for their app. Version-specific field that will only be set when the requested app version is found. */
  supportEnabled?: boolean;
  /** Output only. The minimum number of users using this app. */
  minUserCount?: number;
  /** Output only. Every custom permission requested by the app. Version-specific field that will only be set when the requested app version is found. */
  permissions?: Array<GoogleChromeManagementV1ChromeAppPermission>;
  /** Output only. Every permission giving access to domains or broad host patterns. ( e.g. www.google.com). This includes the matches from content scripts as well as hosts in the permissions node of the manifest. Version-specific field that will only be set when the requested app version is found. */
  siteAccess?: Array<GoogleChromeManagementV1ChromeAppSiteAccess>;
  /** Output only. Whether the app or extension is a theme. */
  isTheme?: boolean;
  /** Output only. Whether the app or extension is built and maintained by Google. Version-specific field that will only be set when the requested app version is found. */
  googleOwned?: boolean;
  /** Output only. Whether the app or extension is in a published state in the Chrome Web Store. */
  isCwsHosted?: boolean;
  /** Output only. Whether this app is enabled for Kiosk mode on ChromeOS devices */
  kioskEnabled?: boolean;
  /** Output only. Whether the app is only for Kiosk mode on ChromeOS devices */
  isKioskOnly?: boolean;
  /** Output only. Types of an item in the Chrome Web Store */
  type?: "ITEM_TYPE_UNSPECIFIED" | "EXTENSION" | "OTHERS" | (string & {});
  /** Output only. Whether an app supports policy for extensions. */
  isExtensionPolicySupported?: boolean;
  /** Output only. The version of this extension's manifest. */
  manifestVersion?: string;
}

export const GoogleChromeManagementV1ChromeAppInfo: Schema.Schema<GoogleChromeManagementV1ChromeAppInfo> = Schema.suspend(() => Schema.Struct({
  supportEnabled: Schema.optional(Schema.Boolean),
  minUserCount: Schema.optional(Schema.Number),
  permissions: Schema.optional(Schema.Array(GoogleChromeManagementV1ChromeAppPermission)),
  siteAccess: Schema.optional(Schema.Array(GoogleChromeManagementV1ChromeAppSiteAccess)),
  isTheme: Schema.optional(Schema.Boolean),
  googleOwned: Schema.optional(Schema.Boolean),
  isCwsHosted: Schema.optional(Schema.Boolean),
  kioskEnabled: Schema.optional(Schema.Boolean),
  isKioskOnly: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  isExtensionPolicySupported: Schema.optional(Schema.Boolean),
  manifestVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ChromeAppInfo" }) as any as Schema.Schema<GoogleChromeManagementV1ChromeAppInfo>;

export interface GoogleChromeManagementV1AndroidAppPermission {
  /** Output only. The type of the permission. */
  type?: string;
}

export const GoogleChromeManagementV1AndroidAppPermission: Schema.Schema<GoogleChromeManagementV1AndroidAppPermission> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1AndroidAppPermission" }) as any as Schema.Schema<GoogleChromeManagementV1AndroidAppPermission>;

export interface GoogleChromeManagementV1AndroidAppInfo {
  /** Output only. Permissions requested by an Android app. */
  permissions?: Array<GoogleChromeManagementV1AndroidAppPermission>;
}

export const GoogleChromeManagementV1AndroidAppInfo: Schema.Schema<GoogleChromeManagementV1AndroidAppInfo> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(GoogleChromeManagementV1AndroidAppPermission)),
})).annotate({ identifier: "GoogleChromeManagementV1AndroidAppInfo" }) as any as Schema.Schema<GoogleChromeManagementV1AndroidAppInfo>;

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleChromeManagementV1AppDetails {
  /** Output only. Format: name=customers/{customer_id}/apps/{chrome|android|web}/{app_id}@{version} */
  name?: string;
  /** Output only. App's display name. */
  displayName?: string;
  /** Output only. App's description. */
  description?: string;
  /** Output only. Unique store identifier for the item. Examples: "gmbmikajjgmnabiglmofipeabaddhgne" for the Save to Google Drive Chrome extension, "com.google.android.apps.docs" for the Google Drive Android app. */
  appId?: string;
  /** Output only. App version. A new revision is committed whenever a new version of the app is published. */
  revisionId?: string;
  /** Output only. App type. */
  type?: "APP_ITEM_TYPE_UNSPECIFIED" | "CHROME" | "ANDROID" | "WEB" | (string & {});
  /** Output only. A link to an image that can be used as an icon for the product. */
  iconUri?: string;
  /** Output only. The uri for the detail page of the item. */
  detailUri?: string;
  /** Output only. First published time. */
  firstPublishTime?: string;
  /** Output only. Latest published time. */
  latestPublishTime?: string;
  /** Output only. The publisher of the item. */
  publisher?: string;
  /** Output only. Indicates if the app has to be paid for OR has paid content. */
  isPaidApp?: boolean;
  /** Output only. Home page or Website uri. */
  homepageUri?: string;
  /** Output only. The URI pointing to the privacy policy of the app, if it was provided by the developer. Version-specific field that will only be set when the requested app version is found. */
  privacyPolicyUri?: string;
  /** Output only. Number of reviews received. Chrome Web Store review information will always be for the latest version of an app. */
  reviewNumber?: string;
  /** Output only. The rating of the app (on 5 stars). Chrome Web Store review information will always be for the latest version of an app. */
  reviewRating?: number;
  /** Output only. Chrome Web Store app information. */
  chromeAppInfo?: GoogleChromeManagementV1ChromeAppInfo;
  /** Output only. Android app information. */
  androidAppInfo?: GoogleChromeManagementV1AndroidAppInfo;
  /** Output only. Information about a partial service error if applicable. */
  serviceError?: GoogleRpcStatus;
}

export const GoogleChromeManagementV1AppDetails: Schema.Schema<GoogleChromeManagementV1AppDetails> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  iconUri: Schema.optional(Schema.String),
  detailUri: Schema.optional(Schema.String),
  firstPublishTime: Schema.optional(Schema.String),
  latestPublishTime: Schema.optional(Schema.String),
  publisher: Schema.optional(Schema.String),
  isPaidApp: Schema.optional(Schema.Boolean),
  homepageUri: Schema.optional(Schema.String),
  privacyPolicyUri: Schema.optional(Schema.String),
  reviewNumber: Schema.optional(Schema.String),
  reviewRating: Schema.optional(Schema.Number),
  chromeAppInfo: Schema.optional(GoogleChromeManagementV1ChromeAppInfo),
  androidAppInfo: Schema.optional(GoogleChromeManagementV1AndroidAppInfo),
  serviceError: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleChromeManagementV1AppDetails" }) as any as Schema.Schema<GoogleChromeManagementV1AppDetails>;

export interface GoogleChromeManagementV1ChromeAppRequest {
  /** Output only. Unique store identifier for the app. Example: "gmbmikajjgmnabiglmofipeabaddhgne" for the Save to Google Drive Chrome extension. */
  appId?: string;
  /** Output only. App's display name. */
  displayName?: string;
  /** Output only. Format: app_details=customers/{customer_id}/apps/chrome/{app_id} */
  appDetails?: string;
  /** Output only. A link to an image that can be used as an icon for the product. */
  iconUri?: string;
  /** Output only. The uri for the detail page of the item. */
  detailUri?: string;
  /** Output only. Total count of requests for this app. */
  requestCount?: string;
  /** Output only. The timestamp of the most recently made request for this app. */
  latestRequestTime?: string;
}

export const GoogleChromeManagementV1ChromeAppRequest: Schema.Schema<GoogleChromeManagementV1ChromeAppRequest> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  appDetails: Schema.optional(Schema.String),
  iconUri: Schema.optional(Schema.String),
  detailUri: Schema.optional(Schema.String),
  requestCount: Schema.optional(Schema.String),
  latestRequestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ChromeAppRequest" }) as any as Schema.Schema<GoogleChromeManagementV1ChromeAppRequest>;

export interface GoogleChromeManagementV1CountChromeAppRequestsResponse {
  /** Count of requested apps matching request. */
  requestedApps?: Array<GoogleChromeManagementV1ChromeAppRequest>;
  /** Token to specify the next page in the list. */
  nextPageToken?: string;
  /** Total number of matching app requests. */
  totalSize?: number;
}

export const GoogleChromeManagementV1CountChromeAppRequestsResponse: Schema.Schema<GoogleChromeManagementV1CountChromeAppRequestsResponse> = Schema.suspend(() => Schema.Struct({
  requestedApps: Schema.optional(Schema.Array(GoogleChromeManagementV1ChromeAppRequest)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeAppRequestsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeAppRequestsResponse>;

export interface GoogleChromeManagementV1DeviceRequestingExtensionDetails {
  /** The name of a device that has requested the extension. */
  deviceName?: string;
  /** Request justification as entered by the user. */
  justification?: string;
}

export const GoogleChromeManagementV1DeviceRequestingExtensionDetails: Schema.Schema<GoogleChromeManagementV1DeviceRequestingExtensionDetails> = Schema.suspend(() => Schema.Struct({
  deviceName: Schema.optional(Schema.String),
  justification: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1DeviceRequestingExtensionDetails" }) as any as Schema.Schema<GoogleChromeManagementV1DeviceRequestingExtensionDetails>;

export interface GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse {
  /** Details of devices that have requested the queried extension. */
  deviceDetails?: Array<GoogleChromeManagementV1DeviceRequestingExtensionDetails>;
  /** Optional. Total number of devices in response. */
  totalSize?: number;
  /** Optional. Token to specify the next page in the list. Token expires after 1 day. */
  nextPageToken?: string;
}

export const GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse: Schema.Schema<GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse> = Schema.suspend(() => Schema.Struct({
  deviceDetails: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceRequestingExtensionDetails)),
  totalSize: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse" }) as any as Schema.Schema<GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse>;

export interface GoogleChromeManagementV1UserRequestingExtensionDetails {
  /** The e-mail address of a user that has requested the extension. */
  email?: string;
  /** Request justification as entered by the user. */
  justification?: string;
}

export const GoogleChromeManagementV1UserRequestingExtensionDetails: Schema.Schema<GoogleChromeManagementV1UserRequestingExtensionDetails> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  justification: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1UserRequestingExtensionDetails" }) as any as Schema.Schema<GoogleChromeManagementV1UserRequestingExtensionDetails>;

export interface GoogleChromeManagementV1FetchUsersRequestingExtensionResponse {
  /** Details of users that have requested the queried extension. */
  userDetails?: Array<GoogleChromeManagementV1UserRequestingExtensionDetails>;
  /** Total number of users in response. */
  totalSize?: number;
  /** Token to specify the next page in the list. */
  nextPageToken?: string;
}

export const GoogleChromeManagementV1FetchUsersRequestingExtensionResponse: Schema.Schema<GoogleChromeManagementV1FetchUsersRequestingExtensionResponse> = Schema.suspend(() => Schema.Struct({
  userDetails: Schema.optional(Schema.Array(GoogleChromeManagementV1UserRequestingExtensionDetails)),
  totalSize: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1FetchUsersRequestingExtensionResponse" }) as any as Schema.Schema<GoogleChromeManagementV1FetchUsersRequestingExtensionResponse>;

export interface GoogleChromeManagementV1DeviceAueCountReport {
  /** Public model name of the devices. */
  model?: string;
  /** Count of devices of this model. */
  count?: string;
  /** Enum value of month corresponding to the auto update expiration date in UTC time zone. If the device is already expired, this field is empty. */
  aueMonth?: "MONTH_UNSPECIFIED" | "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER" | (string & {});
  /** Int value of year corresponding to the Auto Update Expiration date in UTC time zone. If the device is already expired, this field is empty. */
  aueYear?: string;
  /** Boolean value for whether or not the device has already expired. */
  expired?: boolean;
}

export const GoogleChromeManagementV1DeviceAueCountReport: Schema.Schema<GoogleChromeManagementV1DeviceAueCountReport> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  aueMonth: Schema.optional(Schema.String),
  aueYear: Schema.optional(Schema.String),
  expired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChromeManagementV1DeviceAueCountReport" }) as any as Schema.Schema<GoogleChromeManagementV1DeviceAueCountReport>;

export interface GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse {
  /** The list of reports sorted by auto update expiration date in ascending order. */
  deviceAueCountReports?: Array<GoogleChromeManagementV1DeviceAueCountReport>;
}

export const GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse: Schema.Schema<GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse> = Schema.suspend(() => Schema.Struct({
  deviceAueCountReports: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceAueCountReport)),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse>;

export interface GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse {
  /** Number of ChromeOS devices have not synced policies in the past 28 days. */
  noRecentPolicySyncCount?: string;
  /** Number of ChromeOS devices that have not seen any user activity in the past 28 days. */
  noRecentUserActivityCount?: string;
  /** Number of devices that are pending an OS update. */
  pendingUpdate?: string;
  /** Number of devices whose OS version is not compliant. */
  osVersionNotCompliantCount?: string;
  /** Number of devices that are unable to apply a policy due to an OS version mismatch. */
  unsupportedPolicyCount?: string;
}

export const GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse: Schema.Schema<GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse> = Schema.suspend(() => Schema.Struct({
  noRecentPolicySyncCount: Schema.optional(Schema.String),
  noRecentUserActivityCount: Schema.optional(Schema.String),
  pendingUpdate: Schema.optional(Schema.String),
  osVersionNotCompliantCount: Schema.optional(Schema.String),
  unsupportedPolicyCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse>;

export interface GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse {
  /** Number of browsers that have been recently enrolled */
  recentlyEnrolledCount?: string;
  /** Number of browsers that haven’t had any recent activity */
  noRecentActivityCount?: string;
  /** Number of browsers that are pending an OS update */
  pendingBrowserUpdateCount?: string;
}

export const GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse: Schema.Schema<GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse> = Schema.suspend(() => Schema.Struct({
  recentlyEnrolledCount: Schema.optional(Schema.String),
  noRecentActivityCount: Schema.optional(Schema.String),
  pendingBrowserUpdateCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse>;

export interface GoogleChromeManagementV1DeviceHardwareCountReport {
  /** Public name of the hardware specification. */
  bucket?: string;
  /** Count of devices with a unique hardware specification. */
  count?: string;
}

export const GoogleChromeManagementV1DeviceHardwareCountReport: Schema.Schema<GoogleChromeManagementV1DeviceHardwareCountReport> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1DeviceHardwareCountReport" }) as any as Schema.Schema<GoogleChromeManagementV1DeviceHardwareCountReport>;

export interface GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse {
  /** The DeviceHardwareCountReport for device model type (for example Acer C7 Chromebook). */
  modelReports?: Array<GoogleChromeManagementV1DeviceHardwareCountReport>;
  /** The DeviceHardwareCountReport for device cpu type (for example Intel(R) Core(TM) i7-10610U CPU @ 1.80GHz). */
  cpuReports?: Array<GoogleChromeManagementV1DeviceHardwareCountReport>;
  /** The DeviceHardwareCountReport for device storage amount in gigabytes (for example 128). */
  storageReports?: Array<GoogleChromeManagementV1DeviceHardwareCountReport>;
  /** The DeviceHardwareCountReport for device memory amount in gigabytes (for example 16). */
  memoryReports?: Array<GoogleChromeManagementV1DeviceHardwareCountReport>;
}

export const GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse: Schema.Schema<GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse> = Schema.suspend(() => Schema.Struct({
  modelReports: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceHardwareCountReport)),
  cpuReports: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceHardwareCountReport)),
  storageReports: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceHardwareCountReport)),
  memoryReports: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceHardwareCountReport)),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse>;

export interface GoogleChromeManagementV1RiskAssessment {
  /** Risk assessment for the extension. Currently, this is a numerical value, and its interpretation is specific to each risk assessment provider. */
  assessment?: string;
  /** A URL that a user can navigate to for more information about the risk assessment. */
  detailsUrl?: string;
  /** The version of the extension that this assessment applies to. */
  version?: string;
}

export const GoogleChromeManagementV1RiskAssessment: Schema.Schema<GoogleChromeManagementV1RiskAssessment> = Schema.suspend(() => Schema.Struct({
  assessment: Schema.optional(Schema.String),
  detailsUrl: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1RiskAssessment" }) as any as Schema.Schema<GoogleChromeManagementV1RiskAssessment>;

export interface GoogleChromeManagementV1RiskAssessmentEntry {
  /** Output only. The risk assessment provider from which this entry comes from. */
  provider?: "RISK_ASSESSMENT_PROVIDER_UNSPECIFIED" | "RISK_ASSESSMENT_PROVIDER_CRXCAVATOR" | "RISK_ASSESSMENT_PROVIDER_SPIN_AI" | "RISK_ASSESSMENT_PROVIDER_LAYERX" | "RISK_ASSESSMENT_PROVIDER_SPIN_AI_V2" | (string & {});
  /** Output only. The details of the provider's risk assessment. */
  riskAssessment?: GoogleChromeManagementV1RiskAssessment;
  /** Output only. The bucketed risk level for the risk assessment. */
  riskLevel?: "RISK_LEVEL_UNSPECIFIED" | "RISK_LEVEL_LOW" | "RISK_LEVEL_MEDIUM" | "RISK_LEVEL_HIGH" | (string & {});
}

export const GoogleChromeManagementV1RiskAssessmentEntry: Schema.Schema<GoogleChromeManagementV1RiskAssessmentEntry> = Schema.suspend(() => Schema.Struct({
  provider: Schema.optional(Schema.String),
  riskAssessment: Schema.optional(GoogleChromeManagementV1RiskAssessment),
  riskLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1RiskAssessmentEntry" }) as any as Schema.Schema<GoogleChromeManagementV1RiskAssessmentEntry>;

export interface GoogleChromeManagementV1RiskAssessmentData {
  /** Individual risk assessments. */
  entries?: Array<GoogleChromeManagementV1RiskAssessmentEntry>;
  /** Overall assessed risk level across all entries. This will be the highest risk level from all entries. */
  overallRiskLevel?: "RISK_LEVEL_UNSPECIFIED" | "RISK_LEVEL_LOW" | "RISK_LEVEL_MEDIUM" | "RISK_LEVEL_HIGH" | (string & {});
}

export const GoogleChromeManagementV1RiskAssessmentData: Schema.Schema<GoogleChromeManagementV1RiskAssessmentData> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(GoogleChromeManagementV1RiskAssessmentEntry)),
  overallRiskLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1RiskAssessmentData" }) as any as Schema.Schema<GoogleChromeManagementV1RiskAssessmentData>;

export interface GoogleChromeManagementV1InstalledApp {
  /** Output only. Unique identifier of the app. For Chrome apps and extensions, the 32-character id (e.g. ehoadneljpdggcbbknedodolkkjodefl). For Android apps, the package name (e.g. com.evernote). */
  appId?: string;
  /** Output only. Type of the app. */
  appType?: "APP_TYPE_UNSPECIFIED" | "EXTENSION" | "APP" | "THEME" | "HOSTED_APP" | "ANDROID_APP" | (string & {});
  /** Output only. Count of browser devices with this app installed. */
  browserDeviceCount?: string;
  /** Output only. Count of ChromeOS users with this app installed. */
  osUserCount?: string;
  /** Output only. How the app was installed. */
  appInstallType?: "APP_INSTALL_TYPE_UNSPECIFIED" | "MULTIPLE" | "NORMAL" | "ADMIN" | "DEVELOPMENT" | "SIDELOAD" | "OTHER" | (string & {});
  /** Output only. Whether the app is disabled. */
  disabled?: boolean;
  /** Output only. Source of the installed app. */
  appSource?: "APP_SOURCE_UNSPECIFIED" | "CHROME_WEBSTORE" | "PLAY_STORE" | (string & {});
  /** Output only. Name of the installed app. */
  displayName?: string;
  /** Output only. Description of the installed app. */
  description?: string;
  /** Output only. Homepage uri of the installed app. */
  homepageUri?: string;
  /** Output only. Permissions of the installed app. */
  permissions?: Array<string>;
  /** Output only. If available, the risk assessment data about this extension. */
  riskAssessment?: GoogleChromeManagementV1RiskAssessmentData;
}

export const GoogleChromeManagementV1InstalledApp: Schema.Schema<GoogleChromeManagementV1InstalledApp> = Schema.suspend(() => Schema.Struct({
  appId: Schema.optional(Schema.String),
  appType: Schema.optional(Schema.String),
  browserDeviceCount: Schema.optional(Schema.String),
  osUserCount: Schema.optional(Schema.String),
  appInstallType: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  appSource: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  homepageUri: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  riskAssessment: Schema.optional(GoogleChromeManagementV1RiskAssessmentData),
})).annotate({ identifier: "GoogleChromeManagementV1InstalledApp" }) as any as Schema.Schema<GoogleChromeManagementV1InstalledApp>;

export interface GoogleChromeManagementV1CountInstalledAppsResponse {
  /** List of installed apps matching request. */
  installedApps?: Array<GoogleChromeManagementV1InstalledApp>;
  /** Token to specify the next page of the request. */
  nextPageToken?: string;
  /** Total number of installed apps matching request. */
  totalSize?: number;
}

export const GoogleChromeManagementV1CountInstalledAppsResponse: Schema.Schema<GoogleChromeManagementV1CountInstalledAppsResponse> = Schema.suspend(() => Schema.Struct({
  installedApps: Schema.optional(Schema.Array(GoogleChromeManagementV1InstalledApp)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1CountInstalledAppsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountInstalledAppsResponse>;

export interface GoogleChromeManagementV1Device {
  /** Output only. The ID of the device that reported this Chrome browser information. */
  deviceId?: string;
  /** Output only. The name of the machine within its local network. */
  machine?: string;
}

export const GoogleChromeManagementV1Device: Schema.Schema<GoogleChromeManagementV1Device> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  machine: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1Device" }) as any as Schema.Schema<GoogleChromeManagementV1Device>;

export interface GoogleChromeManagementV1FindInstalledAppDevicesResponse {
  /** A list of devices which have the app installed. Sorted in ascending alphabetical order on the Device.machine field. */
  devices?: Array<GoogleChromeManagementV1Device>;
  /** Token to specify the next page of the request. */
  nextPageToken?: string;
  /** Total number of devices matching request. */
  totalSize?: number;
}

export const GoogleChromeManagementV1FindInstalledAppDevicesResponse: Schema.Schema<GoogleChromeManagementV1FindInstalledAppDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(GoogleChromeManagementV1Device)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1FindInstalledAppDevicesResponse" }) as any as Schema.Schema<GoogleChromeManagementV1FindInstalledAppDevicesResponse>;

export interface GoogleChromeManagementV1BrowserVersion {
  /** Output only. The full version of the installed browser. */
  version?: string;
  /** Output only. Count grouped by device_system and major version */
  count?: string;
  /** Output only. The release channel of the installed browser. */
  channel?: "RELEASE_CHANNEL_UNSPECIFIED" | "CANARY" | "DEV" | "BETA" | "STABLE" | (string & {});
  /** Output only. The device operating system. */
  system?: "DEVICE_SYSTEM_UNSPECIFIED" | "SYSTEM_OTHER" | "SYSTEM_ANDROID" | "SYSTEM_IOS" | "SYSTEM_CROS" | "SYSTEM_WINDOWS" | "SYSTEM_MAC" | "SYSTEM_LINUX" | (string & {});
  /** Output only. Version of the system-specified operating system. */
  deviceOsVersion?: string;
}

export const GoogleChromeManagementV1BrowserVersion: Schema.Schema<GoogleChromeManagementV1BrowserVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  system: Schema.optional(Schema.String),
  deviceOsVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1BrowserVersion" }) as any as Schema.Schema<GoogleChromeManagementV1BrowserVersion>;

export interface GoogleChromeManagementV1CountChromeVersionsResponse {
  /** List of all browser versions and their install counts. */
  browserVersions?: Array<GoogleChromeManagementV1BrowserVersion>;
  /** Token to specify the next page of the request. */
  nextPageToken?: string;
  /** Total number browser versions matching request. */
  totalSize?: number;
}

export const GoogleChromeManagementV1CountChromeVersionsResponse: Schema.Schema<GoogleChromeManagementV1CountChromeVersionsResponse> = Schema.suspend(() => Schema.Struct({
  browserVersions: Schema.optional(Schema.Array(GoogleChromeManagementV1BrowserVersion)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeVersionsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeVersionsResponse>;

export interface GoogleChromeManagementV1UserPrintReport {
  /** The unique Directory API ID of the user. */
  userId?: string;
  /** The primary e-mail address of the user. */
  userEmail?: string;
  /** Number of print jobs initiated by the user. */
  jobCount?: string;
  /** Number of printers used by the user. */
  printerCount?: string;
  /** Number of chrome devices that have been used to initiate print jobs by the user. */
  deviceCount?: string;
}

export const GoogleChromeManagementV1UserPrintReport: Schema.Schema<GoogleChromeManagementV1UserPrintReport> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  jobCount: Schema.optional(Schema.String),
  printerCount: Schema.optional(Schema.String),
  deviceCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1UserPrintReport" }) as any as Schema.Schema<GoogleChromeManagementV1UserPrintReport>;

export interface GoogleChromeManagementV1CountPrintJobsByUserResponse {
  /** List of UserPrintReports matching request. */
  userPrintReports?: Array<GoogleChromeManagementV1UserPrintReport>;
  /** Pagination token for requesting the next page. */
  nextPageToken?: string;
  /** Total number of users matching request. */
  totalSize?: string;
}

export const GoogleChromeManagementV1CountPrintJobsByUserResponse: Schema.Schema<GoogleChromeManagementV1CountPrintJobsByUserResponse> = Schema.suspend(() => Schema.Struct({
  userPrintReports: Schema.optional(Schema.Array(GoogleChromeManagementV1UserPrintReport)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountPrintJobsByUserResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountPrintJobsByUserResponse>;

export interface GoogleChromeManagementV1PrinterReport {
  /** Printer API ID. */
  printerId?: string;
  /** Printer name. */
  printer?: string;
  /** Printer model. */
  printerModel?: string;
  /** Number of print jobs sent to the printer. */
  jobCount?: string;
  /** Number of users that have sent print jobs to the printer. */
  userCount?: string;
  /** Number of chrome devices that have been used to send print jobs to the specified printer. */
  deviceCount?: string;
}

export const GoogleChromeManagementV1PrinterReport: Schema.Schema<GoogleChromeManagementV1PrinterReport> = Schema.suspend(() => Schema.Struct({
  printerId: Schema.optional(Schema.String),
  printer: Schema.optional(Schema.String),
  printerModel: Schema.optional(Schema.String),
  jobCount: Schema.optional(Schema.String),
  userCount: Schema.optional(Schema.String),
  deviceCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1PrinterReport" }) as any as Schema.Schema<GoogleChromeManagementV1PrinterReport>;

export interface GoogleChromeManagementV1CountPrintJobsByPrinterResponse {
  /** List of PrinterReports matching request. */
  printerReports?: Array<GoogleChromeManagementV1PrinterReport>;
  /** Pagination token for requesting the next page. */
  nextPageToken?: string;
  /** Total number of printers matching request. */
  totalSize?: string;
}

export const GoogleChromeManagementV1CountPrintJobsByPrinterResponse: Schema.Schema<GoogleChromeManagementV1CountPrintJobsByPrinterResponse> = Schema.suspend(() => Schema.Struct({
  printerReports: Schema.optional(Schema.Array(GoogleChromeManagementV1PrinterReport)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountPrintJobsByPrinterResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountPrintJobsByPrinterResponse>;

export interface GoogleChromeManagementV1PrintJob {
  /** Unique ID of the print job. */
  id?: string;
  /** The title of the document. */
  title?: string;
  /** The final state of the job. */
  state?: "STATE_UNSPECIFIED" | "PRINTED" | "CANCELLED" | "FAILED" | (string & {});
  /** Print job creation timestamp. */
  createTime?: string;
  /** Print job completion timestamp. */
  completeTime?: string;
  /** Number of pages in the document. */
  documentPageCount?: number;
  /** Color mode. */
  colorMode?: "COLOR_MODE_UNSPECIFIED" | "BLACK_AND_WHITE" | "COLOR" | (string & {});
  /** Duplex mode. */
  duplexMode?: "DUPLEX_MODE_UNSPECIFIED" | "ONE_SIDED" | "TWO_SIDED_LONG_EDGE" | "TWO_SIDED_SHORT_EDGE" | (string & {});
  /** Number of copies. */
  copyCount?: number;
  /** API ID of the printer used for printing. */
  printerId?: string;
  /** Name of the printer used for printing. */
  printer?: string;
  /** The primary e-mail address of the user who submitted the print job. */
  userEmail?: string;
  /** The unique Directory API ID of the user who submitted the print job. */
  userId?: string;
}

export const GoogleChromeManagementV1PrintJob: Schema.Schema<GoogleChromeManagementV1PrintJob> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  documentPageCount: Schema.optional(Schema.Number),
  colorMode: Schema.optional(Schema.String),
  duplexMode: Schema.optional(Schema.String),
  copyCount: Schema.optional(Schema.Number),
  printerId: Schema.optional(Schema.String),
  printer: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1PrintJob" }) as any as Schema.Schema<GoogleChromeManagementV1PrintJob>;

export interface GoogleChromeManagementV1EnumeratePrintJobsResponse {
  /** List of requested print jobs. */
  printJobs?: Array<GoogleChromeManagementV1PrintJob>;
  /** A token, which can be used in a subsequent request to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Total number of print jobs matching request. */
  totalSize?: string;
}

export const GoogleChromeManagementV1EnumeratePrintJobsResponse: Schema.Schema<GoogleChromeManagementV1EnumeratePrintJobsResponse> = Schema.suspend(() => Schema.Struct({
  printJobs: Schema.optional(Schema.Array(GoogleChromeManagementV1PrintJob)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1EnumeratePrintJobsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1EnumeratePrintJobsResponse>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount {
  /** Date of the crash event. */
  date?: GoogleTypeDate;
  /** Total count of crash events. */
  count?: string;
  /** Browser version this is counting. */
  browserVersion?: string;
}

export const GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount: Schema.Schema<GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(GoogleTypeDate),
  count: Schema.optional(Schema.String),
  browserVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount>;

export interface GoogleChromeManagementV1CountChromeCrashEventsResponse {
  /** Crash event counts grouped by date and browser version. */
  crashEventCounts?: Array<GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount>;
}

export const GoogleChromeManagementV1CountChromeCrashEventsResponse: Schema.Schema<GoogleChromeManagementV1CountChromeCrashEventsResponse> = Schema.suspend(() => Schema.Struct({
  crashEventCounts: Schema.optional(Schema.Array(GoogleChromeManagementV1CountChromeCrashEventsResponseCrashEventCount)),
})).annotate({ identifier: "GoogleChromeManagementV1CountChromeCrashEventsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountChromeCrashEventsResponse>;

export interface GoogleChromeManagementV1CountActiveDevicesResponse {
  /** Number of active devices in the 7 days leading up to the date specified in the request. */
  sevenDaysCount?: string;
  /** Number of active devices in the 30 days leading up to the date specified in the request. */
  thirtyDaysCount?: string;
}

export const GoogleChromeManagementV1CountActiveDevicesResponse: Schema.Schema<GoogleChromeManagementV1CountActiveDevicesResponse> = Schema.suspend(() => Schema.Struct({
  sevenDaysCount: Schema.optional(Schema.String),
  thirtyDaysCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountActiveDevicesResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountActiveDevicesResponse>;

export interface GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse {
  /** Number of devices with an unreported release channel. */
  unreportedChannelCount?: string;
  /** Number of devices with canary release channel. */
  canaryChannelCount?: string;
  /** Number of devices with dev release channel. */
  devChannelCount?: string;
  /** Number of devices with beta release channel. */
  betaChannelCount?: string;
  /** Number of devices with stable release channel. */
  stableChannelCount?: string;
  /** Number of devices with ltc release channel. */
  ltcChannelCount?: string;
  /** Number of devices with lts release channel. */
  ltsChannelCount?: string;
  /** Number of devices with unsupported release channel. */
  unsupportedChannelCount?: string;
}

export const GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse: Schema.Schema<GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse> = Schema.suspend(() => Schema.Struct({
  unreportedChannelCount: Schema.optional(Schema.String),
  canaryChannelCount: Schema.optional(Schema.String),
  devChannelCount: Schema.optional(Schema.String),
  betaChannelCount: Schema.optional(Schema.String),
  stableChannelCount: Schema.optional(Schema.String),
  ltcChannelCount: Schema.optional(Schema.String),
  ltsChannelCount: Schema.optional(Schema.String),
  unsupportedChannelCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse>;

export interface GoogleChromeManagementV1CountDevicesPerBootTypeResponse {
  /** Number of devices with unreported boot type. */
  unreportedBootTypeCount?: string;
  /** Number of devices with dev boot type. */
  devBootTypeCount?: string;
  /** Number of devices with verified boot type. */
  verifiedBootTypeCount?: string;
}

export const GoogleChromeManagementV1CountDevicesPerBootTypeResponse: Schema.Schema<GoogleChromeManagementV1CountDevicesPerBootTypeResponse> = Schema.suspend(() => Schema.Struct({
  unreportedBootTypeCount: Schema.optional(Schema.String),
  devBootTypeCount: Schema.optional(Schema.String),
  verifiedBootTypeCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CountDevicesPerBootTypeResponse" }) as any as Schema.Schema<GoogleChromeManagementV1CountDevicesPerBootTypeResponse>;

export interface GoogleChromeManagementV1CpuInfo {
  /** Output only. The CPU model name. Example: Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz */
  model?: string;
  /** Output only. Architecture type for the CPU. * This field provides device information, which is static and will not change over time. * Data for this field is controlled via policy: [ReportDeviceCpuInfo](https://chromeenterprise.google/policies/#ReportDeviceCpuInfo) * Data Collection Frequency: Only at Upload * Default Data Reporting Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is offline, the collected data is stored locally, and will be reported when the device is next online: No * Reported for affiliated users only: N/A */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X64" | (string & {});
  /** Output only. The max CPU clock speed in kHz. */
  maxClockSpeed?: number;
  /** Output only. Whether keylocker is supported. */
  keylockerSupported?: boolean;
  /** Output only. Whether keylocker is configured.`TRUE` = Enabled; `FALSE` = disabled. Only reported if keylockerSupported = `TRUE`. */
  keylockerConfigured?: boolean;
}

export const GoogleChromeManagementV1CpuInfo: Schema.Schema<GoogleChromeManagementV1CpuInfo> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  maxClockSpeed: Schema.optional(Schema.Number),
  keylockerSupported: Schema.optional(Schema.Boolean),
  keylockerConfigured: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChromeManagementV1CpuInfo" }) as any as Schema.Schema<GoogleChromeManagementV1CpuInfo>;

export interface GoogleChromeManagementV1CpuTemperatureInfo {
  /** Output only. CPU temperature in Celsius. */
  temperatureCelsius?: number;
  /** Output only. CPU label. Example: Core 0 */
  label?: string;
}

export const GoogleChromeManagementV1CpuTemperatureInfo: Schema.Schema<GoogleChromeManagementV1CpuTemperatureInfo> = Schema.suspend(() => Schema.Struct({
  temperatureCelsius: Schema.optional(Schema.Number),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1CpuTemperatureInfo" }) as any as Schema.Schema<GoogleChromeManagementV1CpuTemperatureInfo>;

export interface GoogleChromeManagementV1CpuStatusReport {
  /** Output only. The timestamp in milliseconds representing time at which this report was sampled. */
  reportTime?: string;
  /** Output only. Frequency the report is sampled. */
  sampleFrequency?: string;
  /** Output only. Sample of CPU utilization (0-100 percent). */
  cpuUtilizationPct?: number;
  /** Output only. CPU temperature sample info per CPU core in Celsius */
  cpuTemperatureInfo?: Array<GoogleChromeManagementV1CpuTemperatureInfo>;
}

export const GoogleChromeManagementV1CpuStatusReport: Schema.Schema<GoogleChromeManagementV1CpuStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  sampleFrequency: Schema.optional(Schema.String),
  cpuUtilizationPct: Schema.optional(Schema.Number),
  cpuTemperatureInfo: Schema.optional(Schema.Array(GoogleChromeManagementV1CpuTemperatureInfo)),
})).annotate({ identifier: "GoogleChromeManagementV1CpuStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1CpuStatusReport>;

export interface GoogleChromeManagementV1TotalMemoryEncryptionInfo {
  /** The state of memory encryption on the device. */
  encryptionState?: "MEMORY_ENCRYPTION_STATE_UNSPECIFIED" | "MEMORY_ENCRYPTION_STATE_UNKNOWN" | "MEMORY_ENCRYPTION_STATE_DISABLED" | "MEMORY_ENCRYPTION_STATE_TME" | "MEMORY_ENCRYPTION_STATE_MKTME" | (string & {});
  /** The maximum number of keys that can be used for encryption. */
  maxKeys?: string;
  /** The length of the encryption keys. */
  keyLength?: string;
  /** Memory encryption algorithm. */
  encryptionAlgorithm?: "MEMORY_ENCRYPTION_ALGORITHM_UNSPECIFIED" | "MEMORY_ENCRYPTION_ALGORITHM_UNKNOWN" | "MEMORY_ENCRYPTION_ALGORITHM_AES_XTS_128" | "MEMORY_ENCRYPTION_ALGORITHM_AES_XTS_256" | (string & {});
}

export const GoogleChromeManagementV1TotalMemoryEncryptionInfo: Schema.Schema<GoogleChromeManagementV1TotalMemoryEncryptionInfo> = Schema.suspend(() => Schema.Struct({
  encryptionState: Schema.optional(Schema.String),
  maxKeys: Schema.optional(Schema.String),
  keyLength: Schema.optional(Schema.String),
  encryptionAlgorithm: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TotalMemoryEncryptionInfo" }) as any as Schema.Schema<GoogleChromeManagementV1TotalMemoryEncryptionInfo>;

export interface GoogleChromeManagementV1MemoryInfo {
  /** Output only. Total RAM in bytes. */
  totalRamBytes?: string;
  /** Output only. Amount of available RAM in bytes. */
  availableRamBytes?: string;
  /** Output only. Total memory encryption info for the device. */
  totalMemoryEncryption?: GoogleChromeManagementV1TotalMemoryEncryptionInfo;
}

export const GoogleChromeManagementV1MemoryInfo: Schema.Schema<GoogleChromeManagementV1MemoryInfo> = Schema.suspend(() => Schema.Struct({
  totalRamBytes: Schema.optional(Schema.String),
  availableRamBytes: Schema.optional(Schema.String),
  totalMemoryEncryption: Schema.optional(GoogleChromeManagementV1TotalMemoryEncryptionInfo),
})).annotate({ identifier: "GoogleChromeManagementV1MemoryInfo" }) as any as Schema.Schema<GoogleChromeManagementV1MemoryInfo>;

export interface GoogleChromeManagementV1MemoryStatusReport {
  /** Output only. The timestamp in milliseconds representing time at which this report was sampled. */
  reportTime?: string;
  /** Output only. Frequency the report is sampled. */
  sampleFrequency?: string;
  /** Output only. Amount of free RAM in bytes (unreliable due to Garbage Collection). */
  systemRamFreeBytes?: string;
  /** Output only. Number of page faults during this collection */
  pageFaults?: number;
}

export const GoogleChromeManagementV1MemoryStatusReport: Schema.Schema<GoogleChromeManagementV1MemoryStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  sampleFrequency: Schema.optional(Schema.String),
  systemRamFreeBytes: Schema.optional(Schema.String),
  pageFaults: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1MemoryStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1MemoryStatusReport>;

export interface GoogleChromeManagementV1NetworkDevice {
  /** Output only. Network device type. */
  type?: "NETWORK_DEVICE_TYPE_UNSPECIFIED" | "CELLULAR_DEVICE" | "ETHERNET_DEVICE" | "WIFI_DEVICE" | (string & {});
  /** Output only. MAC address (if applicable) of the corresponding network device. */
  macAddress?: string;
  /** Output only. MEID (if applicable) of the corresponding network device. */
  meid?: string;
  /** Output only. IMEI (if applicable) of the corresponding network device. */
  imei?: string;
  /** Output only. The integrated circuit card ID associated with the device's sim card. */
  iccid?: string;
  /** Output only. The mobile directory number associated with the device's sim card. */
  mdn?: string;
}

export const GoogleChromeManagementV1NetworkDevice: Schema.Schema<GoogleChromeManagementV1NetworkDevice> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  macAddress: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  imei: Schema.optional(Schema.String),
  iccid: Schema.optional(Schema.String),
  mdn: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1NetworkDevice" }) as any as Schema.Schema<GoogleChromeManagementV1NetworkDevice>;

export interface GoogleChromeManagementV1NetworkInfo {
  /** Output only. List of network devices. */
  networkDevices?: Array<GoogleChromeManagementV1NetworkDevice>;
}

export const GoogleChromeManagementV1NetworkInfo: Schema.Schema<GoogleChromeManagementV1NetworkInfo> = Schema.suspend(() => Schema.Struct({
  networkDevices: Schema.optional(Schema.Array(GoogleChromeManagementV1NetworkDevice)),
})).annotate({ identifier: "GoogleChromeManagementV1NetworkInfo" }) as any as Schema.Schema<GoogleChromeManagementV1NetworkInfo>;

export interface GoogleChromeManagementV1NetworkStatusReport {
  /** Output only. Time at which the network state was reported. */
  reportTime?: string;
  /** Output only. Frequency the report is sampled. */
  sampleFrequency?: string;
  /** Output only. Signal strength for wireless networks measured in decibels. */
  signalStrengthDbm?: number;
  /** Output only. LAN IP address. */
  lanIpAddress?: string;
  /** Output only. Gateway IP address. */
  gatewayIpAddress?: string;
  /** Output only. Transmission bit rate measured in Megabits per second. */
  transmissionBitRateMbps?: string;
  /** Output only. Receiving bit rate measured in Megabits per second. */
  receivingBitRateMbps?: string;
  /** Output only. Transmission power measured in decibels. */
  transmissionPowerDbm?: number;
  /** Output only. Whether the wifi encryption key is turned off. */
  encryptionOn?: boolean;
  /** Output only. Wifi link quality. Value ranges from [0, 70]. 0 indicates no signal and 70 indicates a strong signal. */
  wifiLinkQuality?: string;
  /** Output only. Wifi power management enabled */
  wifiPowerManagementEnabled?: boolean;
  /** Output only. Network connection guid. */
  guid?: string;
  /** Output only. Current connection state of the network. */
  connectionState?: "NETWORK_CONNECTION_STATE_UNSPECIFIED" | "ONLINE" | "CONNECTED" | "PORTAL" | "CONNECTING" | "NOT_CONNECTED" | (string & {});
  /** Output only. Network connection type. */
  connectionType?: "NETWORK_TYPE_UNSPECIFIED" | "CELLULAR" | "ETHERNET" | "TETHER" | "VPN" | "WIFI" | (string & {});
  /** Output only. IPv6 addresses assigned to this network, if any. Each address is a string in standard IPv6 text representation (e.g., "2001:db8::1"). */
  ipv6Address?: Array<string>;
  /** Output only. The gateway IPv6 for this interface, if detected */
  gatewayIpv6Address?: string;
  /** Output only. Whether the network was detected as metered. */
  metered?: boolean;
  /** Output only. The maximum downstream bandwidth in Kilobits per second (Kbps), if reported by the network interface or connection. */
  linkDownSpeedKbps?: string;
}

export const GoogleChromeManagementV1NetworkStatusReport: Schema.Schema<GoogleChromeManagementV1NetworkStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  sampleFrequency: Schema.optional(Schema.String),
  signalStrengthDbm: Schema.optional(Schema.Number),
  lanIpAddress: Schema.optional(Schema.String),
  gatewayIpAddress: Schema.optional(Schema.String),
  transmissionBitRateMbps: Schema.optional(Schema.String),
  receivingBitRateMbps: Schema.optional(Schema.String),
  transmissionPowerDbm: Schema.optional(Schema.Number),
  encryptionOn: Schema.optional(Schema.Boolean),
  wifiLinkQuality: Schema.optional(Schema.String),
  wifiPowerManagementEnabled: Schema.optional(Schema.Boolean),
  guid: Schema.optional(Schema.String),
  connectionState: Schema.optional(Schema.String),
  connectionType: Schema.optional(Schema.String),
  ipv6Address: Schema.optional(Schema.Array(Schema.String)),
  gatewayIpv6Address: Schema.optional(Schema.String),
  metered: Schema.optional(Schema.Boolean),
  linkDownSpeedKbps: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1NetworkStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1NetworkStatusReport>;

export interface GoogleChromeManagementV1HttpsLatencyRoutineData {
  /** Output only. HTTPS latency routine problem if a problem occurred. */
  problem?: "HTTPS_LATENCY_PROBLEM_UNSPECIFIED" | "FAILED_DNS_RESOLUTIONS" | "FAILED_HTTPS_REQUESTS" | "HIGH_LATENCY" | "VERY_HIGH_LATENCY" | (string & {});
  /** Output only. HTTPS latency if routine succeeded or failed because of HIGH_LATENCY or VERY_HIGH_LATENCY. */
  latency?: string;
}

export const GoogleChromeManagementV1HttpsLatencyRoutineData: Schema.Schema<GoogleChromeManagementV1HttpsLatencyRoutineData> = Schema.suspend(() => Schema.Struct({
  problem: Schema.optional(Schema.String),
  latency: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1HttpsLatencyRoutineData" }) as any as Schema.Schema<GoogleChromeManagementV1HttpsLatencyRoutineData>;

export interface GoogleChromeManagementV1NetworkDiagnosticsReport {
  /** Output only. Timestamp of when the diagnostics were collected. */
  reportTime?: string;
  /** Output only. HTTPS latency test data. */
  httpsLatencyData?: GoogleChromeManagementV1HttpsLatencyRoutineData;
}

export const GoogleChromeManagementV1NetworkDiagnosticsReport: Schema.Schema<GoogleChromeManagementV1NetworkDiagnosticsReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  httpsLatencyData: Schema.optional(GoogleChromeManagementV1HttpsLatencyRoutineData),
})).annotate({ identifier: "GoogleChromeManagementV1NetworkDiagnosticsReport" }) as any as Schema.Schema<GoogleChromeManagementV1NetworkDiagnosticsReport>;

export interface GoogleChromeManagementV1OsUpdateStatus {
  /** Output only. Current state of the os update. */
  updateState?: "UPDATE_STATE_UNSPECIFIED" | "OS_IMAGE_DOWNLOAD_NOT_STARTED" | "OS_IMAGE_DOWNLOAD_IN_PROGRESS" | "OS_UPDATE_NEED_REBOOT" | (string & {});
  /** Output only. New platform version of the os image being downloaded and applied. It is only set when update status is OS_IMAGE_DOWNLOAD_IN_PROGRESS or OS_UPDATE_NEED_REBOOT. Note this could be a dummy "0.0.0.0" for OS_UPDATE_NEED_REBOOT status for some edge cases, e.g. update engine is restarted without a reboot. */
  newPlatformVersion?: string;
  /** Output only. New requested platform version from the pending updated kiosk app. */
  newRequestedPlatformVersion?: string;
  /** Output only. Timestamp of the last successful update. */
  lastUpdateTime?: string;
  /** Output only. Timestamp of the last update check. */
  lastUpdateCheckTime?: string;
  /** Output only. Timestamp of the last reboot. */
  lastRebootTime?: string;
}

export const GoogleChromeManagementV1OsUpdateStatus: Schema.Schema<GoogleChromeManagementV1OsUpdateStatus> = Schema.suspend(() => Schema.Struct({
  updateState: Schema.optional(Schema.String),
  newPlatformVersion: Schema.optional(Schema.String),
  newRequestedPlatformVersion: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  lastUpdateCheckTime: Schema.optional(Schema.String),
  lastRebootTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1OsUpdateStatus" }) as any as Schema.Schema<GoogleChromeManagementV1OsUpdateStatus>;

export interface GoogleChromeManagementV1GraphicsAdapterInfo {
  /** Output only. Adapter name. Example: Mesa DRI Intel(R) UHD Graphics 620 (Kabylake GT2). */
  adapter?: string;
  /** Output only. Version of the GPU driver. */
  driverVersion?: string;
  /** Output only. Represents the graphics card device id. */
  deviceId?: string;
}

export const GoogleChromeManagementV1GraphicsAdapterInfo: Schema.Schema<GoogleChromeManagementV1GraphicsAdapterInfo> = Schema.suspend(() => Schema.Struct({
  adapter: Schema.optional(Schema.String),
  driverVersion: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1GraphicsAdapterInfo" }) as any as Schema.Schema<GoogleChromeManagementV1GraphicsAdapterInfo>;

export interface GoogleChromeManagementV1DisplayDevice {
  /** Output only. Display device name. */
  displayName?: string;
  /** Output only. Display width in millimeters. */
  displayWidthMm?: number;
  /** Output only. Display height in millimeters. */
  displayHeightMm?: number;
  /** Output only. Is display internal or not. */
  internal?: boolean;
  /** Output only. Three letter manufacturer ID. */
  manufacturerId?: string;
  /** Output only. Manufacturer product code. */
  modelId?: number;
  /** Output only. Year of manufacture. */
  manufactureYear?: number;
  /** Output only. Serial number. */
  serialNumber?: number;
  /** Output only. EDID version. */
  edidVersion?: string;
}

export const GoogleChromeManagementV1DisplayDevice: Schema.Schema<GoogleChromeManagementV1DisplayDevice> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  displayWidthMm: Schema.optional(Schema.Number),
  displayHeightMm: Schema.optional(Schema.Number),
  internal: Schema.optional(Schema.Boolean),
  manufacturerId: Schema.optional(Schema.String),
  modelId: Schema.optional(Schema.Number),
  manufactureYear: Schema.optional(Schema.Number),
  serialNumber: Schema.optional(Schema.Number),
  edidVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1DisplayDevice" }) as any as Schema.Schema<GoogleChromeManagementV1DisplayDevice>;

export interface GoogleChromeManagementV1TouchScreenDevice {
  /** Output only. Touch screen device display name. */
  displayName?: string;
  /** Output only. Number of touch points supported on the device. */
  touchPointCount?: number;
  /** Output only. Touch screen device is stylus capable or not. */
  stylusCapable?: boolean;
}

export const GoogleChromeManagementV1TouchScreenDevice: Schema.Schema<GoogleChromeManagementV1TouchScreenDevice> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  touchPointCount: Schema.optional(Schema.Number),
  stylusCapable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChromeManagementV1TouchScreenDevice" }) as any as Schema.Schema<GoogleChromeManagementV1TouchScreenDevice>;

export interface GoogleChromeManagementV1TouchScreenInfo {
  /** Output only. Touchpad library name used by the input stack. */
  touchpadLibrary?: string;
  /** Output only. List of the internal touch screen devices. */
  devices?: Array<GoogleChromeManagementV1TouchScreenDevice>;
}

export const GoogleChromeManagementV1TouchScreenInfo: Schema.Schema<GoogleChromeManagementV1TouchScreenInfo> = Schema.suspend(() => Schema.Struct({
  touchpadLibrary: Schema.optional(Schema.String),
  devices: Schema.optional(Schema.Array(GoogleChromeManagementV1TouchScreenDevice)),
})).annotate({ identifier: "GoogleChromeManagementV1TouchScreenInfo" }) as any as Schema.Schema<GoogleChromeManagementV1TouchScreenInfo>;

export interface GoogleChromeManagementV1GraphicsInfo {
  /** Output only. Information about the graphics adapter (GPU). */
  adapterInfo?: GoogleChromeManagementV1GraphicsAdapterInfo;
  /** Output only. Is ePrivacy screen supported or not. */
  eprivacySupported?: boolean;
  /** Output only. Information about the display(s) of the device. */
  displayDevices?: Array<GoogleChromeManagementV1DisplayDevice>;
  /** Output only. Information about the internal touch screen(s) of the device. */
  touchScreenInfo?: GoogleChromeManagementV1TouchScreenInfo;
}

export const GoogleChromeManagementV1GraphicsInfo: Schema.Schema<GoogleChromeManagementV1GraphicsInfo> = Schema.suspend(() => Schema.Struct({
  adapterInfo: Schema.optional(GoogleChromeManagementV1GraphicsAdapterInfo),
  eprivacySupported: Schema.optional(Schema.Boolean),
  displayDevices: Schema.optional(Schema.Array(GoogleChromeManagementV1DisplayDevice)),
  touchScreenInfo: Schema.optional(GoogleChromeManagementV1TouchScreenInfo),
})).annotate({ identifier: "GoogleChromeManagementV1GraphicsInfo" }) as any as Schema.Schema<GoogleChromeManagementV1GraphicsInfo>;

export interface GoogleChromeManagementV1DisplayInfo {
  /** Output only. Represents the graphics card device id. */
  deviceId?: string;
  /** Output only. Resolution width in pixels. */
  resolutionWidth?: number;
  /** Output only. Resolution height in pixels. */
  resolutionHeight?: number;
  /** Output only. Refresh rate in Hz. */
  refreshRate?: number;
  /** Output only. Indicates if display is internal or not. */
  isInternal?: boolean;
  /** Output only. Display device name. */
  displayName?: string;
  /** Output only. Serial number. */
  serialNumber?: number;
  /** Output only. EDID version. */
  edidVersion?: string;
}

export const GoogleChromeManagementV1DisplayInfo: Schema.Schema<GoogleChromeManagementV1DisplayInfo> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  resolutionWidth: Schema.optional(Schema.Number),
  resolutionHeight: Schema.optional(Schema.Number),
  refreshRate: Schema.optional(Schema.Number),
  isInternal: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.Number),
  edidVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1DisplayInfo" }) as any as Schema.Schema<GoogleChromeManagementV1DisplayInfo>;

export interface GoogleChromeManagementV1GraphicsStatusReport {
  /** Output only. Time at which the graphics data was reported. */
  reportTime?: string;
  /** Output only. Information about the displays for the device. */
  displays?: Array<GoogleChromeManagementV1DisplayInfo>;
}

export const GoogleChromeManagementV1GraphicsStatusReport: Schema.Schema<GoogleChromeManagementV1GraphicsStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  displays: Schema.optional(Schema.Array(GoogleChromeManagementV1DisplayInfo)),
})).annotate({ identifier: "GoogleChromeManagementV1GraphicsStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1GraphicsStatusReport>;

export interface GoogleChromeManagementV1BatteryInfo {
  /** Output only. Battery serial number. */
  serialNumber?: string;
  /** Output only. Battery manufacturer. */
  manufacturer?: string;
  /** Output only. Design capacity (mAmpere-hours). */
  designCapacity?: string;
  /** Output only. Designed minimum output voltage (mV) */
  designMinVoltage?: number;
  /** Output only. The date the battery was manufactured. */
  manufactureDate?: GoogleTypeDate;
  /** Output only. Technology of the battery. Example: Li-ion */
  technology?: string;
}

export const GoogleChromeManagementV1BatteryInfo: Schema.Schema<GoogleChromeManagementV1BatteryInfo> = Schema.suspend(() => Schema.Struct({
  serialNumber: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  designCapacity: Schema.optional(Schema.String),
  designMinVoltage: Schema.optional(Schema.Number),
  manufactureDate: Schema.optional(GoogleTypeDate),
  technology: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1BatteryInfo" }) as any as Schema.Schema<GoogleChromeManagementV1BatteryInfo>;

export interface GoogleChromeManagementV1BatterySampleReport {
  /** Output only. Timestamp of when the sample was collected on device */
  reportTime?: string;
  /** Output only. Battery voltage (millivolt). */
  voltage?: string;
  /** Output only. Battery remaining capacity (mAmpere-hours). */
  remainingCapacity?: string;
  /** Output only. Temperature in Celsius degrees. */
  temperature?: number;
  /** Output only. The battery discharge rate measured in mW. Positive if the battery is being discharged, negative if it's being charged. */
  dischargeRate?: number;
  /** Output only. Battery charge percentage. */
  chargeRate?: number;
  /** Output only. Battery current (mA). */
  current?: string;
  /** Output only. Battery status read from sysfs. Example: Discharging */
  status?: string;
}

export const GoogleChromeManagementV1BatterySampleReport: Schema.Schema<GoogleChromeManagementV1BatterySampleReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  voltage: Schema.optional(Schema.String),
  remainingCapacity: Schema.optional(Schema.String),
  temperature: Schema.optional(Schema.Number),
  dischargeRate: Schema.optional(Schema.Number),
  chargeRate: Schema.optional(Schema.Number),
  current: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1BatterySampleReport" }) as any as Schema.Schema<GoogleChromeManagementV1BatterySampleReport>;

export interface GoogleChromeManagementV1BatteryStatusReport {
  /** Output only. Timestamp of when the sample was collected on device */
  reportTime?: string;
  /** Output only. Battery serial number. */
  serialNumber?: string;
  /** Output only. Sampling data for the battery sorted in a decreasing order of report_time. */
  sample?: Array<GoogleChromeManagementV1BatterySampleReport>;
  /** Output only. Battery health. */
  batteryHealth?: "BATTERY_HEALTH_UNSPECIFIED" | "BATTERY_HEALTH_NORMAL" | "BATTERY_REPLACE_SOON" | "BATTERY_REPLACE_NOW" | (string & {});
  /** Output only. Full charge capacity (mAmpere-hours). */
  fullChargeCapacity?: string;
  /** Output only. Cycle count. */
  cycleCount?: number;
}

export const GoogleChromeManagementV1BatteryStatusReport: Schema.Schema<GoogleChromeManagementV1BatteryStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  sample: Schema.optional(Schema.Array(GoogleChromeManagementV1BatterySampleReport)),
  batteryHealth: Schema.optional(Schema.String),
  fullChargeCapacity: Schema.optional(Schema.String),
  cycleCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1BatteryStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1BatteryStatusReport>;

export interface GoogleChromeManagementV1StorageInfoDiskVolume {
  /** Disk volume id. */
  volumeId?: string;
  /** Free storage space in bytes. */
  storageFreeBytes?: string;
  /** Total storage space in bytes. */
  storageTotalBytes?: string;
}

export const GoogleChromeManagementV1StorageInfoDiskVolume: Schema.Schema<GoogleChromeManagementV1StorageInfoDiskVolume> = Schema.suspend(() => Schema.Struct({
  volumeId: Schema.optional(Schema.String),
  storageFreeBytes: Schema.optional(Schema.String),
  storageTotalBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1StorageInfoDiskVolume" }) as any as Schema.Schema<GoogleChromeManagementV1StorageInfoDiskVolume>;

export interface GoogleChromeManagementV1StorageInfo {
  /** Information for disk volumes */
  volume?: Array<GoogleChromeManagementV1StorageInfoDiskVolume>;
  /** The available space for user data storage in the device in bytes. */
  availableDiskBytes?: string;
  /** The total space for user data storage in the device in bytes. */
  totalDiskBytes?: string;
}

export const GoogleChromeManagementV1StorageInfo: Schema.Schema<GoogleChromeManagementV1StorageInfo> = Schema.suspend(() => Schema.Struct({
  volume: Schema.optional(Schema.Array(GoogleChromeManagementV1StorageInfoDiskVolume)),
  availableDiskBytes: Schema.optional(Schema.String),
  totalDiskBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1StorageInfo" }) as any as Schema.Schema<GoogleChromeManagementV1StorageInfo>;

export interface GoogleChromeManagementV1DiskInfo {
  /** Output only. Disk serial number. */
  serialNumber?: string;
  /** Output only. Disk manufacturer. */
  manufacturer?: string;
  /** Output only. Disk model. */
  model?: string;
  /** Output only. Disk size. */
  sizeBytes?: string;
  /** Output only. Disk type: eMMC / NVMe / ATA / SCSI. */
  type?: string;
  /** Output only. Disk health. */
  health?: string;
  /** Output only. Disk volumes. */
  volumeIds?: Array<string>;
  /** Output only. Number of bytes read since last boot. */
  bytesReadThisSession?: string;
  /** Output only. Number of bytes written since last boot. */
  bytesWrittenThisSession?: string;
  /** Output only. Time spent reading from disk since last boot. */
  readTimeThisSession?: string;
  /** Output only. Time spent writing to disk since last boot. */
  writeTimeThisSession?: string;
  /** Output only. Counts the time the disk and queue were busy, so unlike the fields above, parallel requests are not counted multiple times. */
  ioTimeThisSession?: string;
  /** Output only. Time spent discarding since last boot. Discarding is writing to clear blocks which are no longer in use. Supported on kernels 4.18+. */
  discardTimeThisSession?: string;
}

export const GoogleChromeManagementV1DiskInfo: Schema.Schema<GoogleChromeManagementV1DiskInfo> = Schema.suspend(() => Schema.Struct({
  serialNumber: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
  volumeIds: Schema.optional(Schema.Array(Schema.String)),
  bytesReadThisSession: Schema.optional(Schema.String),
  bytesWrittenThisSession: Schema.optional(Schema.String),
  readTimeThisSession: Schema.optional(Schema.String),
  writeTimeThisSession: Schema.optional(Schema.String),
  ioTimeThisSession: Schema.optional(Schema.String),
  discardTimeThisSession: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1DiskInfo" }) as any as Schema.Schema<GoogleChromeManagementV1DiskInfo>;

export interface GoogleChromeManagementV1StorageStatusReport {
  /** Output only. Timestamp of when the sample was collected on device */
  reportTime?: string;
  /** Output only. Reports on disk. */
  disk?: Array<GoogleChromeManagementV1DiskInfo>;
}

export const GoogleChromeManagementV1StorageStatusReport: Schema.Schema<GoogleChromeManagementV1StorageStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  disk: Schema.optional(Schema.Array(GoogleChromeManagementV1DiskInfo)),
})).annotate({ identifier: "GoogleChromeManagementV1StorageStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1StorageStatusReport>;

export interface GoogleChromeManagementV1ThunderboltInfo {
  /** Security level of the Thunderbolt bus. */
  securityLevel?: "THUNDERBOLT_SECURITY_LEVEL_UNSPECIFIED" | "THUNDERBOLT_SECURITY_NONE_LEVEL" | "THUNDERBOLT_SECURITY_USER_LEVEL" | "THUNDERBOLT_SECURITY_SECURE_LEVEL" | "THUNDERBOLT_SECURITY_DP_ONLY_LEVEL" | "THUNDERBOLT_SECURITY_USB_ONLY_LEVEL" | "THUNDERBOLT_SECURITY_NO_PCIE_LEVEL" | (string & {});
}

export const GoogleChromeManagementV1ThunderboltInfo: Schema.Schema<GoogleChromeManagementV1ThunderboltInfo> = Schema.suspend(() => Schema.Struct({
  securityLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ThunderboltInfo" }) as any as Schema.Schema<GoogleChromeManagementV1ThunderboltInfo>;

export interface GoogleChromeManagementV1AudioStatusReport {
  /** Output only. Timestamp of when the sample was collected on device. */
  reportTime?: string;
  /** Output only. Is active output device mute or not. */
  outputMute?: boolean;
  /** Output only. Is active input device mute or not. */
  inputMute?: boolean;
  /** Output only. Active output device's volume in [0, 100]. */
  outputVolume?: number;
  /** Output only. Active output device's name. */
  outputDevice?: string;
  /** Output only. Active input device's gain in [0, 100]. */
  inputGain?: number;
  /** Output only. Active input device's name. */
  inputDevice?: string;
}

export const GoogleChromeManagementV1AudioStatusReport: Schema.Schema<GoogleChromeManagementV1AudioStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  outputMute: Schema.optional(Schema.Boolean),
  inputMute: Schema.optional(Schema.Boolean),
  outputVolume: Schema.optional(Schema.Number),
  outputDevice: Schema.optional(Schema.String),
  inputGain: Schema.optional(Schema.Number),
  inputDevice: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1AudioStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1AudioStatusReport>;

export interface GoogleChromeManagementV1BootPerformanceReport {
  /** Timestamp when the report was collected. */
  reportTime?: string;
  /** Total time to boot up. */
  bootUpDuration?: string;
  /** The timestamp when power came on. */
  bootUpTime?: string;
  /** Total time since shutdown start to power off. */
  shutdownDuration?: string;
  /** The timestamp when shutdown. */
  shutdownTime?: string;
  /** The shutdown reason. */
  shutdownReason?: "SHUTDOWN_REASON_UNSPECIFIED" | "USER_REQUEST" | "SYSTEM_UPDATE" | "LOW_BATTERY" | "OTHER" | (string & {});
}

export const GoogleChromeManagementV1BootPerformanceReport: Schema.Schema<GoogleChromeManagementV1BootPerformanceReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  bootUpDuration: Schema.optional(Schema.String),
  bootUpTime: Schema.optional(Schema.String),
  shutdownDuration: Schema.optional(Schema.String),
  shutdownTime: Schema.optional(Schema.String),
  shutdownReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1BootPerformanceReport" }) as any as Schema.Schema<GoogleChromeManagementV1BootPerformanceReport>;

export interface GoogleChromeManagementV1HeartbeatStatusReport {
  /** Timestamp of when status changed was detected */
  reportTime?: string;
  /** State the device changed to */
  state?: "STATE_UNSPECIFIED" | "UNKNOWN" | "ONLINE" | "OFFLINE" | "DEVICE_OUTDATED" | (string & {});
}

export const GoogleChromeManagementV1HeartbeatStatusReport: Schema.Schema<GoogleChromeManagementV1HeartbeatStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1HeartbeatStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1HeartbeatStatusReport>;

export interface GoogleChromeManagementV1KioskAppStatusReport {
  /** Timestamp of when report was collected */
  reportTime?: string;
  /** App id of kiosk app for example "mdmkkicfmmkgmpkmkdikhlbggogpicma" */
  appId?: string;
  /** App version number of kiosk app for example "1.10.118" */
  appVersion?: string;
}

export const GoogleChromeManagementV1KioskAppStatusReport: Schema.Schema<GoogleChromeManagementV1KioskAppStatusReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  appVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1KioskAppStatusReport" }) as any as Schema.Schema<GoogleChromeManagementV1KioskAppStatusReport>;

export interface GoogleChromeManagementV1NetworkBandwidthReport {
  /** Output only. Timestamp of when the report was collected. */
  reportTime?: string;
  /** Output only. Download speed in kilobits per second. */
  downloadSpeedKbps?: string;
}

export const GoogleChromeManagementV1NetworkBandwidthReport: Schema.Schema<GoogleChromeManagementV1NetworkBandwidthReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  downloadSpeedKbps: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1NetworkBandwidthReport" }) as any as Schema.Schema<GoogleChromeManagementV1NetworkBandwidthReport>;

export interface GoogleChromeManagementV1UsbPeripheralReport {
  /** Output only. Vendor name */
  vendor?: string;
  /** Output only. Device name, model name, or product name */
  name?: string;
  /** Output only. Vendor ID */
  vid?: number;
  /** Output only. Product ID */
  pid?: number;
  /** Output only. Categories the device belongs to https://www.usb.org/defined-class-codes */
  categories?: Array<string>;
  /** Output only. Class ID https://www.usb.org/defined-class-codes */
  classId?: number;
  /** Output only. Subclass ID https://www.usb.org/defined-class-codes */
  subclassId?: number;
  /** Output only. Firmware version */
  firmwareVersion?: string;
}

export const GoogleChromeManagementV1UsbPeripheralReport: Schema.Schema<GoogleChromeManagementV1UsbPeripheralReport> = Schema.suspend(() => Schema.Struct({
  vendor: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  vid: Schema.optional(Schema.Number),
  pid: Schema.optional(Schema.Number),
  categories: Schema.optional(Schema.Array(Schema.String)),
  classId: Schema.optional(Schema.Number),
  subclassId: Schema.optional(Schema.Number),
  firmwareVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1UsbPeripheralReport" }) as any as Schema.Schema<GoogleChromeManagementV1UsbPeripheralReport>;

export interface GoogleChromeManagementV1PeripheralsReport {
  /** Output only. Timestamp of when the report was collected. */
  reportTime?: string;
  /** Reports of all usb connected devices. */
  usbPeripheralReport?: Array<GoogleChromeManagementV1UsbPeripheralReport>;
}

export const GoogleChromeManagementV1PeripheralsReport: Schema.Schema<GoogleChromeManagementV1PeripheralsReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  usbPeripheralReport: Schema.optional(Schema.Array(GoogleChromeManagementV1UsbPeripheralReport)),
})).annotate({ identifier: "GoogleChromeManagementV1PeripheralsReport" }) as any as Schema.Schema<GoogleChromeManagementV1PeripheralsReport>;

export interface GoogleChromeManagementV1AppUsageData {
  /** App foreground running time. */
  runningDuration?: string;
  /** App id. */
  appId?: string;
  /** Type of app. */
  appType?: "TELEMETRY_APPLICATION_TYPE_UNSPECIFIED" | "APPLICATION_TYPE_ARC" | "APPLICATION_TYPE_BUILT_IN" | "APPLICATION_TYPE_CROSTINI" | "APPLICATION_TYPE_CHROME_APP" | "APPLICATION_TYPE_WEB" | "APPLICATION_TYPE_MAC_OS" | "APPLICATION_TYPE_PLUGIN_VM" | "APPLICATION_TYPE_STANDALONE_BROWSER" | "APPLICATION_TYPE_REMOTE" | "APPLICATION_TYPE_BOREALIS" | "APPLICATION_TYPE_SYSTEM_WEB" | "APPLICATION_TYPE_STANDALONE_BROWSER_CHROME_APP" | "APPLICATION_TYPE_EXTENSION" | "APPLICATION_TYPE_STANDALONE_BROWSER_EXTENSION" | "APPLICATION_TYPE_BRUSCHETTA" | (string & {});
  /** Application instance id. This will be unique per window/instance. */
  appInstanceId?: string;
}

export const GoogleChromeManagementV1AppUsageData: Schema.Schema<GoogleChromeManagementV1AppUsageData> = Schema.suspend(() => Schema.Struct({
  runningDuration: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  appType: Schema.optional(Schema.String),
  appInstanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1AppUsageData" }) as any as Schema.Schema<GoogleChromeManagementV1AppUsageData>;

export interface GoogleChromeManagementV1AppReport {
  /** Timestamp when the report was collected. */
  reportTime?: string;
  /** App usage data. */
  usageData?: Array<GoogleChromeManagementV1AppUsageData>;
}

export const GoogleChromeManagementV1AppReport: Schema.Schema<GoogleChromeManagementV1AppReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  usageData: Schema.optional(Schema.Array(GoogleChromeManagementV1AppUsageData)),
})).annotate({ identifier: "GoogleChromeManagementV1AppReport" }) as any as Schema.Schema<GoogleChromeManagementV1AppReport>;

export interface GoogleChromeManagementV1RuntimeCountersReport {
  /** Timestamp when the report was collected. */
  reportTime?: string;
  /** Total lifetime runtime. Currently always S0 runtime from Intel vPro PSR. */
  uptimeRuntimeDuration?: string;
  /** Number of times that the device has entered into the sleep state. Currently obtained via the PSR, count from S0->S3. */
  enterSleepCount?: string;
  /** Number of times that the device has entered into the hibernation state. Currently obtained via the PSR, count from S0->S4. */
  enterHibernationCount?: string;
  /** Number of times that the device has entered into the power-off state. Currently obtained via the PSR, count from S0->S5. */
  enterPoweroffCount?: string;
}

export const GoogleChromeManagementV1RuntimeCountersReport: Schema.Schema<GoogleChromeManagementV1RuntimeCountersReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  uptimeRuntimeDuration: Schema.optional(Schema.String),
  enterSleepCount: Schema.optional(Schema.String),
  enterHibernationCount: Schema.optional(Schema.String),
  enterPoweroffCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1RuntimeCountersReport" }) as any as Schema.Schema<GoogleChromeManagementV1RuntimeCountersReport>;

export interface GoogleChromeManagementV1TelemetryDevice {
  /** Output only. Resource name of the device. */
  name?: string;
  /** Output only. Google Workspace Customer whose enterprise enrolled the device. */
  customer?: string;
  /** Output only. Organization unit ID of the device. */
  orgUnitId?: string;
  /** Output only. The unique Directory API ID of the device. This value is the same as the Admin Console's Directory API ID in the ChromeOS Devices tab */
  deviceId?: string;
  /** Output only. Device serial number. This value is the same as the Admin Console's Serial Number in the ChromeOS Devices tab. */
  serialNumber?: string;
  /** Output only. Information regarding CPU specs for the device. */
  cpuInfo?: Array<GoogleChromeManagementV1CpuInfo>;
  /** Output only. CPU status reports collected periodically sorted in a decreasing order of report_time. */
  cpuStatusReport?: Array<GoogleChromeManagementV1CpuStatusReport>;
  /** Output only. Information regarding memory specs for the device. */
  memoryInfo?: GoogleChromeManagementV1MemoryInfo;
  /** Output only. Memory status reports collected periodically sorted decreasing by report_time. */
  memoryStatusReport?: Array<GoogleChromeManagementV1MemoryStatusReport>;
  /** Output only. Network devices information. */
  networkInfo?: GoogleChromeManagementV1NetworkInfo;
  /** Output only. Network specs collected periodically. */
  networkStatusReport?: Array<GoogleChromeManagementV1NetworkStatusReport>;
  /** Output only. Network diagnostics collected periodically. */
  networkDiagnosticsReport?: Array<GoogleChromeManagementV1NetworkDiagnosticsReport>;
  /** Output only. Contains relevant information regarding ChromeOS update status. */
  osUpdateStatus?: Array<GoogleChromeManagementV1OsUpdateStatus>;
  /** Output only. Contains information regarding Graphic peripherals for the device. */
  graphicsInfo?: GoogleChromeManagementV1GraphicsInfo;
  /** Output only. Graphics reports collected periodically. */
  graphicsStatusReport?: Array<GoogleChromeManagementV1GraphicsStatusReport>;
  /** Output only. Information on battery specs for the device. */
  batteryInfo?: Array<GoogleChromeManagementV1BatteryInfo>;
  /** Output only. Battery reports collected periodically. */
  batteryStatusReport?: Array<GoogleChromeManagementV1BatteryStatusReport>;
  /** Output only. Information of storage specs for the device. */
  storageInfo?: GoogleChromeManagementV1StorageInfo;
  /** Output only. Storage reports collected periodically. */
  storageStatusReport?: Array<GoogleChromeManagementV1StorageStatusReport>;
  /** Output only. Information on Thunderbolt bus. */
  thunderboltInfo?: Array<GoogleChromeManagementV1ThunderboltInfo>;
  /** Output only. Audio reports collected periodically sorted in a decreasing order of report_time. */
  audioStatusReport?: Array<GoogleChromeManagementV1AudioStatusReport>;
  /** Output only. Boot performance reports of the device. */
  bootPerformanceReport?: Array<GoogleChromeManagementV1BootPerformanceReport>;
  /** Output only. Heartbeat status report containing timestamps periodically sorted in decreasing order of report_time */
  heartbeatStatusReport?: Array<GoogleChromeManagementV1HeartbeatStatusReport>;
  /** Output only. Kiosk app status report for the kiosk device */
  kioskAppStatusReport?: Array<GoogleChromeManagementV1KioskAppStatusReport>;
  /** Output only. Network bandwidth reports collected periodically sorted in a decreasing order of report_time. */
  networkBandwidthReport?: Array<GoogleChromeManagementV1NetworkBandwidthReport>;
  /** Output only. Peripherals reports collected periodically sorted in a decreasing order of report_time. */
  peripheralsReport?: Array<GoogleChromeManagementV1PeripheralsReport>;
  /** Output only. App reports collected periodically sorted in a decreasing order of report_time. */
  appReport?: Array<GoogleChromeManagementV1AppReport>;
  /** Output only. Runtime counters reports collected device lifetime runtime, as well as the counts of S0->S3, S0->S4, and S0->S5 transitions, meaning entering into sleep, hibernation, and power-off states */
  runtimeCountersReport?: Array<GoogleChromeManagementV1RuntimeCountersReport>;
}

export const GoogleChromeManagementV1TelemetryDevice: Schema.Schema<GoogleChromeManagementV1TelemetryDevice> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  cpuInfo: Schema.optional(Schema.Array(GoogleChromeManagementV1CpuInfo)),
  cpuStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1CpuStatusReport)),
  memoryInfo: Schema.optional(GoogleChromeManagementV1MemoryInfo),
  memoryStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1MemoryStatusReport)),
  networkInfo: Schema.optional(GoogleChromeManagementV1NetworkInfo),
  networkStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1NetworkStatusReport)),
  networkDiagnosticsReport: Schema.optional(Schema.Array(GoogleChromeManagementV1NetworkDiagnosticsReport)),
  osUpdateStatus: Schema.optional(Schema.Array(GoogleChromeManagementV1OsUpdateStatus)),
  graphicsInfo: Schema.optional(GoogleChromeManagementV1GraphicsInfo),
  graphicsStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1GraphicsStatusReport)),
  batteryInfo: Schema.optional(Schema.Array(GoogleChromeManagementV1BatteryInfo)),
  batteryStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1BatteryStatusReport)),
  storageInfo: Schema.optional(GoogleChromeManagementV1StorageInfo),
  storageStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1StorageStatusReport)),
  thunderboltInfo: Schema.optional(Schema.Array(GoogleChromeManagementV1ThunderboltInfo)),
  audioStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1AudioStatusReport)),
  bootPerformanceReport: Schema.optional(Schema.Array(GoogleChromeManagementV1BootPerformanceReport)),
  heartbeatStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1HeartbeatStatusReport)),
  kioskAppStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1KioskAppStatusReport)),
  networkBandwidthReport: Schema.optional(Schema.Array(GoogleChromeManagementV1NetworkBandwidthReport)),
  peripheralsReport: Schema.optional(Schema.Array(GoogleChromeManagementV1PeripheralsReport)),
  appReport: Schema.optional(Schema.Array(GoogleChromeManagementV1AppReport)),
  runtimeCountersReport: Schema.optional(Schema.Array(GoogleChromeManagementV1RuntimeCountersReport)),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryDevice" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryDevice>;

export interface GoogleChromeManagementV1ListTelemetryDevicesResponse {
  /** Telemetry devices returned in the response. */
  devices?: Array<GoogleChromeManagementV1TelemetryDevice>;
  /** Token to specify next page in the list. */
  nextPageToken?: string;
}

export const GoogleChromeManagementV1ListTelemetryDevicesResponse: Schema.Schema<GoogleChromeManagementV1ListTelemetryDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(GoogleChromeManagementV1TelemetryDevice)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ListTelemetryDevicesResponse" }) as any as Schema.Schema<GoogleChromeManagementV1ListTelemetryDevicesResponse>;

export interface GoogleChromeManagementV1TelemetryDeviceInfo {
  /** Output only. The unique Directory API ID of the device. This value is the same as the Admin Console's Directory API ID in the ChromeOS Devices tab. */
  deviceId?: string;
  /** Output only. Organization unit ID of the device. */
  orgUnitId?: string;
}

export const GoogleChromeManagementV1TelemetryDeviceInfo: Schema.Schema<GoogleChromeManagementV1TelemetryDeviceInfo> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryDeviceInfo" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryDeviceInfo>;

export interface GoogleChromeManagementV1TelemetryUserInfo {
  /** Output only. User's email. */
  email?: string;
  /** Output only. Organization unit ID of the user. */
  orgUnitId?: string;
}

export const GoogleChromeManagementV1TelemetryUserInfo: Schema.Schema<GoogleChromeManagementV1TelemetryUserInfo> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryUserInfo" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryUserInfo>;

export interface GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent {
}

export const GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent: Schema.Schema<GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent>;

export interface GoogleChromeManagementV1TelemetryUsbPeripheralsEvent {
  /** List of usb devices that were either added or removed. */
  usbPeripheralReport?: Array<GoogleChromeManagementV1UsbPeripheralReport>;
}

export const GoogleChromeManagementV1TelemetryUsbPeripheralsEvent: Schema.Schema<GoogleChromeManagementV1TelemetryUsbPeripheralsEvent> = Schema.suspend(() => Schema.Struct({
  usbPeripheralReport: Schema.optional(Schema.Array(GoogleChromeManagementV1UsbPeripheralReport)),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryUsbPeripheralsEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryUsbPeripheralsEvent>;

export interface GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent {
  /** Unique identifier of the network. */
  guid?: string;
  /** Current connection state of the network. */
  connectionState?: "NETWORK_CONNECTION_STATE_UNSPECIFIED" | "ONLINE" | "CONNECTED" | "PORTAL" | "CONNECTING" | "NOT_CONNECTED" | (string & {});
}

export const GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent: Schema.Schema<GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent> = Schema.suspend(() => Schema.Struct({
  guid: Schema.optional(Schema.String),
  connectionState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent>;

export interface GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent {
  /** HTTPS latency routine data that triggered the event. */
  httpsLatencyRoutineData?: GoogleChromeManagementV1HttpsLatencyRoutineData;
  /** Current HTTPS latency state. */
  httpsLatencyState?: "HTTPS_LATENCY_STATE_UNSPECIFIED" | "RECOVERY" | "PROBLEM" | (string & {});
}

export const GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent: Schema.Schema<GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent> = Schema.suspend(() => Schema.Struct({
  httpsLatencyRoutineData: Schema.optional(GoogleChromeManagementV1HttpsLatencyRoutineData),
  httpsLatencyState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent>;

export interface GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent {
  /** Unique identifier of the network. */
  guid?: string;
  /** Signal strength RSSI value. */
  signalStrengthDbm?: number;
}

export const GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent: Schema.Schema<GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent> = Schema.suspend(() => Schema.Struct({
  guid: Schema.optional(Schema.String),
  signalStrengthDbm: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent>;

export interface GoogleChromeManagementV1TelemetryAppInstallEvent {
  /** App installation source. */
  appInstallSource?: "APPLICATION_INSTALL_SOURCE_UNSPECIFIED" | "APPLICATION_INSTALL_SOURCE_SYSTEM" | "APPLICATION_INSTALL_SOURCE_SYNC" | "APPLICATION_INSTALL_SOURCE_PLAY_STORE" | "APPLICATION_INSTALL_SOURCE_CHROME_WEB_STORE" | "APPLICATION_INSTALL_SOURCE_BROWSER" | (string & {});
  /** App installation reason. */
  appInstallReason?: "APPLICATION_INSTALL_REASON_UNSPECIFIED" | "APPLICATION_INSTALL_REASON_SYSTEM" | "APPLICATION_INSTALL_REASON_POLICY" | "APPLICATION_INSTALL_REASON_OEM" | "APPLICATION_INSTALL_REASON_DEFAULT" | "APPLICATION_INSTALL_REASON_SYNC" | "APPLICATION_INSTALL_REASON_USER" | "APPLICATION_INSTALL_REASON_SUB_APP" | "APPLICATION_INSTALL_REASON_KIOSK" | "APPLICATION_INSTALL_REASON_COMMAND_LINE" | (string & {});
  /** App installation time depending on the app lifecycle. */
  appInstallTime?: "APPLICATION_INSTALL_TIME_UNSPECIFIED" | "APPLICATION_INSTALL_TIME_INIT" | "APPLICATION_INSTALL_TIME_RUNNING" | (string & {});
  /** App id. For PWAs this is the start URL, and for extensions this is the extension id. */
  appId?: string;
  /** Type of app. */
  appType?: "TELEMETRY_APPLICATION_TYPE_UNSPECIFIED" | "APPLICATION_TYPE_ARC" | "APPLICATION_TYPE_BUILT_IN" | "APPLICATION_TYPE_CROSTINI" | "APPLICATION_TYPE_CHROME_APP" | "APPLICATION_TYPE_WEB" | "APPLICATION_TYPE_MAC_OS" | "APPLICATION_TYPE_PLUGIN_VM" | "APPLICATION_TYPE_STANDALONE_BROWSER" | "APPLICATION_TYPE_REMOTE" | "APPLICATION_TYPE_BOREALIS" | "APPLICATION_TYPE_SYSTEM_WEB" | "APPLICATION_TYPE_STANDALONE_BROWSER_CHROME_APP" | "APPLICATION_TYPE_EXTENSION" | "APPLICATION_TYPE_STANDALONE_BROWSER_EXTENSION" | "APPLICATION_TYPE_BRUSCHETTA" | (string & {});
}

export const GoogleChromeManagementV1TelemetryAppInstallEvent: Schema.Schema<GoogleChromeManagementV1TelemetryAppInstallEvent> = Schema.suspend(() => Schema.Struct({
  appInstallSource: Schema.optional(Schema.String),
  appInstallReason: Schema.optional(Schema.String),
  appInstallTime: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  appType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryAppInstallEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryAppInstallEvent>;

export interface GoogleChromeManagementV1TelemetryAppUninstallEvent {
  /** App uninstall source. */
  appUninstallSource?: "APPLICATION_UNINSTALL_SOURCE_UNSPECIFIED" | "APPLICATION_UNINSTALL_SOURCE_APP_LIST" | "APPLICATION_UNINSTALL_SOURCE_APP_MANAGEMENT" | "APPLICATION_UNINSTALL_SOURCE_SHELF" | "APPLICATION_UNINSTALL_SOURCE_MIGRATION" | (string & {});
  /** App id. For PWAs this is the start URL, and for extensions this is the extension id. */
  appId?: string;
  /** Type of app. */
  appType?: "TELEMETRY_APPLICATION_TYPE_UNSPECIFIED" | "APPLICATION_TYPE_ARC" | "APPLICATION_TYPE_BUILT_IN" | "APPLICATION_TYPE_CROSTINI" | "APPLICATION_TYPE_CHROME_APP" | "APPLICATION_TYPE_WEB" | "APPLICATION_TYPE_MAC_OS" | "APPLICATION_TYPE_PLUGIN_VM" | "APPLICATION_TYPE_STANDALONE_BROWSER" | "APPLICATION_TYPE_REMOTE" | "APPLICATION_TYPE_BOREALIS" | "APPLICATION_TYPE_SYSTEM_WEB" | "APPLICATION_TYPE_STANDALONE_BROWSER_CHROME_APP" | "APPLICATION_TYPE_EXTENSION" | "APPLICATION_TYPE_STANDALONE_BROWSER_EXTENSION" | "APPLICATION_TYPE_BRUSCHETTA" | (string & {});
}

export const GoogleChromeManagementV1TelemetryAppUninstallEvent: Schema.Schema<GoogleChromeManagementV1TelemetryAppUninstallEvent> = Schema.suspend(() => Schema.Struct({
  appUninstallSource: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  appType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryAppUninstallEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryAppUninstallEvent>;

export interface GoogleChromeManagementV1TelemetryAppLaunchEvent {
  /** App launch source. */
  appLaunchSource?: "APPLICATION_LAUNCH_SOURCE_UNSPECIFIED" | "APPLICATION_LAUNCH_SOURCE_APP_LIST_GRID" | "APPLICATION_LAUNCH_SOURCE_APP_LIST_GRID_CONTEXT_MENU" | "APPLICATION_LAUNCH_SOURCE_APP_LIST_QUERY" | "APPLICATION_LAUNCH_SOURCE_APP_LIST_QUERY_CONTEXT_MENU" | "APPLICATION_LAUNCH_SOURCE_APP_LIST_RECOMMENDATION" | "APPLICATION_LAUNCH_SOURCE_PARENTAL_CONTROLS" | "APPLICATION_LAUNCH_SOURCE_SHELF" | "APPLICATION_LAUNCH_SOURCE_FILE_MANAGER" | "APPLICATION_LAUNCH_SOURCE_LINK" | "APPLICATION_LAUNCH_SOURCE_OMNIBOX" | "APPLICATION_LAUNCH_SOURCE_CHROME_INTERNAL" | "APPLICATION_LAUNCH_SOURCE_KEYBOARD" | "APPLICATION_LAUNCH_SOURCE_OTHER_APP" | "APPLICATION_LAUNCH_SOURCE_MENU" | "APPLICATION_LAUNCH_SOURCE_INSTALLED_NOTIFICATION" | "APPLICATION_LAUNCH_SOURCE_TEST" | "APPLICATION_LAUNCH_SOURCE_ARC" | "APPLICATION_LAUNCH_SOURCE_SHARESHEET" | "APPLICATION_LAUNCH_SOURCE_RELEASE_NOTES_NOTIFICATION" | "APPLICATION_LAUNCH_SOURCE_FULL_RESTORE" | "APPLICATION_LAUNCH_SOURCE_SMART_TEXT_CONTEXT_MENU" | "APPLICATION_LAUNCH_SOURCE_DISCOVER_TAB_NOTIFICATION" | "APPLICATION_LAUNCH_SOURCE_MANAGEMENT_API" | "APPLICATION_LAUNCH_SOURCE_KIOSK" | "APPLICATION_LAUNCH_SOURCE_COMMAND_LINE" | "APPLICATION_LAUNCH_SOURCE_BACKGROUND_MODE" | "APPLICATION_LAUNCH_SOURCE_NEW_TAB_PAGE" | "APPLICATION_LAUNCH_SOURCE_INTENT_URL" | "APPLICATION_LAUNCH_SOURCE_OS_LOGIN" | "APPLICATION_LAUNCH_SOURCE_PROTOCOL_HANDLER" | "APPLICATION_LAUNCH_SOURCE_URL_HANDLER" | "APPLICATION_LAUNCH_SOURCE_LOCK_SCREEN" | "APPLICATION_LAUNCH_SOURCE_APP_HOME_PAGE" | "APPLICATION_LAUNCH_SOURCE_REPARENTING" | "APPLICATION_LAUNCH_SOURCE_PROFILE_MENU" | "APPLICATION_LAUNCH_SOURCE_SYSTEM_TRAY_CALENDAR" | "APPLICATION_LAUNCH_SOURCE_INSTALLER" | "APPLICATION_LAUNCH_SOURCE_FIRST_RUN" | "APPLICATION_LAUNCH_SOURCE_WELCOME_TOUR" | "APPLICATION_LAUNCH_SOURCE_FOCUS_MODE" | "APPLICATION_LAUNCH_SOURCE_SPARKY" | "APPLICATION_LAUNCH_SOURCE_NAVIGATION_CAPTURING" | "APPLICATION_LAUNCH_SOURCE_WEB_INSTALL_API" | (string & {});
  /** App id. For PWAs this is the start URL, and for extensions this is the extension id. */
  appId?: string;
  /** Type of app. */
  appType?: "TELEMETRY_APPLICATION_TYPE_UNSPECIFIED" | "APPLICATION_TYPE_ARC" | "APPLICATION_TYPE_BUILT_IN" | "APPLICATION_TYPE_CROSTINI" | "APPLICATION_TYPE_CHROME_APP" | "APPLICATION_TYPE_WEB" | "APPLICATION_TYPE_MAC_OS" | "APPLICATION_TYPE_PLUGIN_VM" | "APPLICATION_TYPE_STANDALONE_BROWSER" | "APPLICATION_TYPE_REMOTE" | "APPLICATION_TYPE_BOREALIS" | "APPLICATION_TYPE_SYSTEM_WEB" | "APPLICATION_TYPE_STANDALONE_BROWSER_CHROME_APP" | "APPLICATION_TYPE_EXTENSION" | "APPLICATION_TYPE_STANDALONE_BROWSER_EXTENSION" | "APPLICATION_TYPE_BRUSCHETTA" | (string & {});
}

export const GoogleChromeManagementV1TelemetryAppLaunchEvent: Schema.Schema<GoogleChromeManagementV1TelemetryAppLaunchEvent> = Schema.suspend(() => Schema.Struct({
  appLaunchSource: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  appType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryAppLaunchEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryAppLaunchEvent>;

export interface GoogleChromeManagementV1TelemetryOsCrashEvent {
  /** Crash type. */
  crashType?: "CRASH_TYPE_UNSPECIFIED" | "CRASH_TYPE_KERNEL" | "CRASH_TYPE_EMBEDDED_CONTROLLER" | (string & {});
  /** Session type. */
  sessionType?: "SESSION_TYPE_UNSPECIFIED" | "SESSION_TYPE_SIGNED_IN_USER" | "SESSION_TYPE_KIOSK" | "SESSION_TYPE_MANAGED_GUEST" | "SESSION_TYPE_ACTIVE_DIRECTORY" | (string & {});
  /** Crash id. */
  crashId?: string;
}

export const GoogleChromeManagementV1TelemetryOsCrashEvent: Schema.Schema<GoogleChromeManagementV1TelemetryOsCrashEvent> = Schema.suspend(() => Schema.Struct({
  crashType: Schema.optional(Schema.String),
  sessionType: Schema.optional(Schema.String),
  crashId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryOsCrashEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryOsCrashEvent>;

export interface GoogleChromeManagementV1TelemetryExternalDisplayData {
  /** The display name. */
  displayName?: string;
  /** The horizontal resolution. */
  resolutionHorizontal?: number;
  /** The vertical resolution. */
  resolutionVertical?: number;
  /** The refresh rate. */
  refreshRate?: string;
  /** The serial number. */
  serialNumber?: number;
  /** The EDID version. */
  edidVersion?: string;
}

export const GoogleChromeManagementV1TelemetryExternalDisplayData: Schema.Schema<GoogleChromeManagementV1TelemetryExternalDisplayData> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  resolutionHorizontal: Schema.optional(Schema.Number),
  resolutionVertical: Schema.optional(Schema.Number),
  refreshRate: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.Number),
  edidVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryExternalDisplayData" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryExternalDisplayData>;

export interface GoogleChromeManagementV1TelemetryExternalDisplayEvent {
  /** List of external displays that were connected/disconnected. */
  externalDisplayData?: Array<GoogleChromeManagementV1TelemetryExternalDisplayData>;
}

export const GoogleChromeManagementV1TelemetryExternalDisplayEvent: Schema.Schema<GoogleChromeManagementV1TelemetryExternalDisplayEvent> = Schema.suspend(() => Schema.Struct({
  externalDisplayData: Schema.optional(Schema.Array(GoogleChromeManagementV1TelemetryExternalDisplayData)),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryExternalDisplayEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryExternalDisplayEvent>;

export interface GoogleChromeManagementV1TelemetryEvent {
  /** Output only. Resource name of the event. */
  name?: string;
  /** Output only. Information about the device associated with the event. */
  device?: GoogleChromeManagementV1TelemetryDeviceInfo;
  /** Output only. Information about the user associated with the event. */
  user?: GoogleChromeManagementV1TelemetryUserInfo;
  /** Timestamp that represents when the event was reported. */
  reportTime?: string;
  /** The event type of the current event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "AUDIO_SEVERE_UNDERRUN" | "NETWORK_STATE_CHANGE" | "USB_ADDED" | "USB_REMOVED" | "NETWORK_HTTPS_LATENCY_CHANGE" | "WIFI_SIGNAL_STRENGTH_LOW" | "WIFI_SIGNAL_STRENGTH_RECOVERED" | "VPN_CONNECTION_STATE_CHANGE" | "APP_INSTALLED" | "APP_UNINSTALLED" | "APP_LAUNCHED" | "OS_CRASH" | "EXTERNAL_DISPLAY_CONNECTED" | "EXTERNAL_DISPLAY_DISCONNECTED" | (string & {});
  /** Output only. Payload for audio severe underrun event. Present only when the `event_type` field is `AUDIO_SEVERE_UNDERRUN`. */
  audioSevereUnderrunEvent?: GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent;
  /** Output only. Payload for usb peripherals event. Present only when the `event_type` field is either `USB_ADDED` or `USB_REMOVED`. */
  usbPeripheralsEvent?: GoogleChromeManagementV1TelemetryUsbPeripheralsEvent;
  /** Output only. Payload for network connection state change event. Present only when `event_type` is `NETWORK_STATE_CHANGE`. */
  networkStateChangeEvent?: GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent;
  /** Output only. Payload for HTTPS latency change event. Present only when `event_type` is `NETWORK_HTTPS_LATENCY_CHANGE`. */
  httpsLatencyChangeEvent?: GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent;
  /** Output only. Payload for WiFi signal strength events. Present only when `event_type` is `WIFI_SIGNAL_STRENGTH_LOW` or `WIFI_SIGNAL_STRENGTH_RECOVERED`. */
  wifiSignalStrengthEvent?: GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent;
  /** Output only. Payload for VPN connection state change event. Present only when `event_type` is `VPN_CONNECTION_STATE_CHANGE`. */
  vpnConnectionStateChangeEvent?: GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent;
  /** Output only. Payload for app install event. Present only when `event_type` is `APP_INSTALLED`. */
  appInstallEvent?: GoogleChromeManagementV1TelemetryAppInstallEvent;
  /** Output only. Payload for app uninstall event. Present only when `event_type` is `APP_UNINSTALLED`. */
  appUninstallEvent?: GoogleChromeManagementV1TelemetryAppUninstallEvent;
  /** Output only. Payload for app launch event.Present only when `event_type` is `APP_LAUNCHED`. */
  appLaunchEvent?: GoogleChromeManagementV1TelemetryAppLaunchEvent;
  /** Output only. Payload for OS crash event. Present only when `event_type` is `OS_CRASH`. */
  osCrashEvent?: GoogleChromeManagementV1TelemetryOsCrashEvent;
  /** Output only. Payload for external display connected/disconnected event. Present only when `event_type` is `EXTERNAL_DISPLAY_CONNECTED` or `EXTERNAL_DISPLAY_DISCONNECTED`. */
  externalDisplaysEvent?: GoogleChromeManagementV1TelemetryExternalDisplayEvent;
}

export const GoogleChromeManagementV1TelemetryEvent: Schema.Schema<GoogleChromeManagementV1TelemetryEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  device: Schema.optional(GoogleChromeManagementV1TelemetryDeviceInfo),
  user: Schema.optional(GoogleChromeManagementV1TelemetryUserInfo),
  reportTime: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  audioSevereUnderrunEvent: Schema.optional(GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent),
  usbPeripheralsEvent: Schema.optional(GoogleChromeManagementV1TelemetryUsbPeripheralsEvent),
  networkStateChangeEvent: Schema.optional(GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent),
  httpsLatencyChangeEvent: Schema.optional(GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent),
  wifiSignalStrengthEvent: Schema.optional(GoogleChromeManagementV1TelemetryNetworkSignalStrengthEvent),
  vpnConnectionStateChangeEvent: Schema.optional(GoogleChromeManagementV1TelemetryNetworkConnectionStateChangeEvent),
  appInstallEvent: Schema.optional(GoogleChromeManagementV1TelemetryAppInstallEvent),
  appUninstallEvent: Schema.optional(GoogleChromeManagementV1TelemetryAppUninstallEvent),
  appLaunchEvent: Schema.optional(GoogleChromeManagementV1TelemetryAppLaunchEvent),
  osCrashEvent: Schema.optional(GoogleChromeManagementV1TelemetryOsCrashEvent),
  externalDisplaysEvent: Schema.optional(GoogleChromeManagementV1TelemetryExternalDisplayEvent),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryEvent" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryEvent>;

export interface GoogleChromeManagementV1ListTelemetryEventsResponse {
  /** Telemetry events returned in the response. */
  telemetryEvents?: Array<GoogleChromeManagementV1TelemetryEvent>;
  /** Token to specify next page in the list. */
  nextPageToken?: string;
}

export const GoogleChromeManagementV1ListTelemetryEventsResponse: Schema.Schema<GoogleChromeManagementV1ListTelemetryEventsResponse> = Schema.suspend(() => Schema.Struct({
  telemetryEvents: Schema.optional(Schema.Array(GoogleChromeManagementV1TelemetryEvent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ListTelemetryEventsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1ListTelemetryEventsResponse>;

export interface GoogleChromeManagementV1DeviceActivityReport {
  /** Output only. Timestamp of when the report was collected. */
  reportTime?: string;
  /** Output only. Device activity state. */
  deviceActivityState?: "DEVICE_ACTIVITY_STATE_UNSPECIFIED" | "ACTIVE" | "IDLE" | "LOCKED" | (string & {});
}

export const GoogleChromeManagementV1DeviceActivityReport: Schema.Schema<GoogleChromeManagementV1DeviceActivityReport> = Schema.suspend(() => Schema.Struct({
  reportTime: Schema.optional(Schema.String),
  deviceActivityState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1DeviceActivityReport" }) as any as Schema.Schema<GoogleChromeManagementV1DeviceActivityReport>;

export interface GoogleChromeManagementV1TelemetryUserDevice {
  /** The unique Directory API ID of the device. This value is the same as the Admin Console's Directory API ID in the ChromeOS Devices tab. */
  deviceId?: string;
  /** Output only. Audio reports collected periodically sorted in a decreasing order of report_time. */
  audioStatusReport?: Array<GoogleChromeManagementV1AudioStatusReport>;
  /** Output only. Device activity reports collected periodically sorted in a decreasing order of report_time. */
  deviceActivityReport?: Array<GoogleChromeManagementV1DeviceActivityReport>;
  /** Output only. Network bandwidth reports collected periodically sorted in a decreasing order of report_time. */
  networkBandwidthReport?: Array<GoogleChromeManagementV1NetworkBandwidthReport>;
  /** Output only. Peripherals reports collected periodically sorted in a decreasing order of report_time. */
  peripheralsReport?: Array<GoogleChromeManagementV1PeripheralsReport>;
  /** Output only. App reports collected periodically sorted in a decreasing order of report_time. */
  appReport?: Array<GoogleChromeManagementV1AppReport>;
}

export const GoogleChromeManagementV1TelemetryUserDevice: Schema.Schema<GoogleChromeManagementV1TelemetryUserDevice> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  audioStatusReport: Schema.optional(Schema.Array(GoogleChromeManagementV1AudioStatusReport)),
  deviceActivityReport: Schema.optional(Schema.Array(GoogleChromeManagementV1DeviceActivityReport)),
  networkBandwidthReport: Schema.optional(Schema.Array(GoogleChromeManagementV1NetworkBandwidthReport)),
  peripheralsReport: Schema.optional(Schema.Array(GoogleChromeManagementV1PeripheralsReport)),
  appReport: Schema.optional(Schema.Array(GoogleChromeManagementV1AppReport)),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryUserDevice" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryUserDevice>;

export interface GoogleChromeManagementV1TelemetryUser {
  /** Resource name of the user. */
  name?: string;
  /** G Suite Customer whose enterprise enrolled the device. */
  customer?: string;
  /** Organization unit of the user. */
  orgUnitId?: string;
  /** Directory ID of the user. */
  userId?: string;
  /** Email address of the user. */
  userEmail?: string;
  /** Telemetry data collected from a managed user and device. */
  userDevice?: Array<GoogleChromeManagementV1TelemetryUserDevice>;
}

export const GoogleChromeManagementV1TelemetryUser: Schema.Schema<GoogleChromeManagementV1TelemetryUser> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  userDevice: Schema.optional(Schema.Array(GoogleChromeManagementV1TelemetryUserDevice)),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryUser" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryUser>;

export interface GoogleChromeManagementV1ListTelemetryUsersResponse {
  /** Telemetry users returned in the response. */
  telemetryUsers?: Array<GoogleChromeManagementV1TelemetryUser>;
  /** Token to specify next page in the list. */
  nextPageToken?: string;
}

export const GoogleChromeManagementV1ListTelemetryUsersResponse: Schema.Schema<GoogleChromeManagementV1ListTelemetryUsersResponse> = Schema.suspend(() => Schema.Struct({
  telemetryUsers: Schema.optional(Schema.Array(GoogleChromeManagementV1TelemetryUser)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ListTelemetryUsersResponse" }) as any as Schema.Schema<GoogleChromeManagementV1ListTelemetryUsersResponse>;

export interface GoogleChromeManagementV1TelemetryEventNotificationFilter {
  /** Only sends the notifications for events of these types. Must not be empty. */
  eventTypes?: Array<"EVENT_TYPE_UNSPECIFIED" | "AUDIO_SEVERE_UNDERRUN" | "NETWORK_STATE_CHANGE" | "USB_ADDED" | "USB_REMOVED" | "NETWORK_HTTPS_LATENCY_CHANGE" | "WIFI_SIGNAL_STRENGTH_LOW" | "WIFI_SIGNAL_STRENGTH_RECOVERED" | "VPN_CONNECTION_STATE_CHANGE" | "APP_INSTALLED" | "APP_UNINSTALLED" | "APP_LAUNCHED" | "OS_CRASH" | "EXTERNAL_DISPLAY_CONNECTED" | "EXTERNAL_DISPLAY_DISCONNECTED" | (string & {})>;
}

export const GoogleChromeManagementV1TelemetryEventNotificationFilter: Schema.Schema<GoogleChromeManagementV1TelemetryEventNotificationFilter> = Schema.suspend(() => Schema.Struct({
  eventTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryEventNotificationFilter" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryEventNotificationFilter>;

export interface GoogleChromeManagementV1TelemetryNotificationFilter {
  /** If set, only sends notifications for telemetry data coming from devices owned by users in this org unit. */
  userOrgUnitId?: string;
  /** If set, only sends notifications for telemetry data coming from devices in this org unit. */
  deviceOrgUnitId?: string;
  /** If set, only sends notifications for telemetry data coming from devices owned by this user. */
  userEmail?: string;
  /** If set, only sends notifications for telemetry data coming from this device. */
  deviceId?: string;
  /** Only sends notifications for the telemetry events matching this filter. */
  telemetryEventNotificationFilter?: GoogleChromeManagementV1TelemetryEventNotificationFilter;
}

export const GoogleChromeManagementV1TelemetryNotificationFilter: Schema.Schema<GoogleChromeManagementV1TelemetryNotificationFilter> = Schema.suspend(() => Schema.Struct({
  userOrgUnitId: Schema.optional(Schema.String),
  deviceOrgUnitId: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  telemetryEventNotificationFilter: Schema.optional(GoogleChromeManagementV1TelemetryEventNotificationFilter),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryNotificationFilter" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryNotificationFilter>;

export interface GoogleChromeManagementV1TelemetryNotificationConfig {
  /** Output only. Resource name of the notification configuration. */
  name?: string;
  /** Output only. Google Workspace customer that owns the resource. */
  customer?: string;
  /** The pubsub topic to which notifications are published to. */
  googleCloudPubsubTopic?: string;
  /** Only send notifications for telemetry data matching this filter. */
  filter?: GoogleChromeManagementV1TelemetryNotificationFilter;
}

export const GoogleChromeManagementV1TelemetryNotificationConfig: Schema.Schema<GoogleChromeManagementV1TelemetryNotificationConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  googleCloudPubsubTopic: Schema.optional(Schema.String),
  filter: Schema.optional(GoogleChromeManagementV1TelemetryNotificationFilter),
})).annotate({ identifier: "GoogleChromeManagementV1TelemetryNotificationConfig" }) as any as Schema.Schema<GoogleChromeManagementV1TelemetryNotificationConfig>;

export interface GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse {
  /** The telemetry notification configs from the specified customer. */
  telemetryNotificationConfigs?: Array<GoogleChromeManagementV1TelemetryNotificationConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse: Schema.Schema<GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse> = Schema.suspend(() => Schema.Struct({
  telemetryNotificationConfigs: Schema.optional(Schema.Array(GoogleChromeManagementV1TelemetryNotificationConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse" }) as any as Schema.Schema<GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleChromeManagementVersionsV1DeviceInfo {
  /** Output only. Type of the device on which the profile exists. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "CHROME_BROWSER" | (string & {});
  /** Output only. Device ID that identifies the affiliated device on which the profile exists. If the device type is CHROME_BROWSER, then this represents a unique Directory API ID of the device that can be used in Admin SDK Browsers API. */
  affiliatedDeviceId?: string;
  /** Output only. Machine name of the device on which the profile exists. On platforms which do not report the machine name (currently iOS and Android) this is instead set to the browser's device_id - but note that this is a different device_id than the |affiliated_device_id|. */
  machine?: string;
  /** Output only. Hostname of the device on which the profile exists. */
  hostname?: string;
}

export const GoogleChromeManagementVersionsV1DeviceInfo: Schema.Schema<GoogleChromeManagementVersionsV1DeviceInfo> = Schema.suspend(() => Schema.Struct({
  deviceType: Schema.optional(Schema.String),
  affiliatedDeviceId: Schema.optional(Schema.String),
  machine: Schema.optional(Schema.String),
  hostname: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1DeviceInfo" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1DeviceInfo>;

export interface GoogleChromeManagementVersionsV1AttestationCredential {
  /** Output only. Type of the public key. */
  keyType?: "KEY_TYPE_UNSPECIFIED" | "RSA_KEY" | "EC_KEY" | (string & {});
  /** Output only. Trust level of the public key. */
  keyTrustLevel?: "KEY_TRUST_LEVEL_UNSPECIFIED" | "CHROME_BROWSER_HW_KEY" | "CHROME_BROWSER_OS_KEY" | (string & {});
  /** Output only. Value of the public key. */
  publicKey?: string;
  /** Output only. Latest rotation timestamp of the public key rotation. */
  keyRotationTime?: string;
}

export const GoogleChromeManagementVersionsV1AttestationCredential: Schema.Schema<GoogleChromeManagementVersionsV1AttestationCredential> = Schema.suspend(() => Schema.Struct({
  keyType: Schema.optional(Schema.String),
  keyTrustLevel: Schema.optional(Schema.String),
  publicKey: Schema.optional(Schema.String),
  keyRotationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1AttestationCredential" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1AttestationCredential>;

export interface GoogleChromeManagementVersionsV1ReportingDataExtensionData {
  /** Output only. ID of the extension. */
  extensionId?: string;
  /** Output only. Version of the extension. */
  version?: string;
  /** Output only. Permissions requested by the extension. */
  permissions?: Array<string>;
  /** Output only. Name of the extension. */
  name?: string;
  /** Output only. Description of the extension. */
  description?: string;
  /** Output only. Type of the extension. */
  extensionType?: "EXTENSION_TYPE_UNSPECIFIED" | "EXTENSION" | "APP" | "THEME" | "HOSTED_APP" | (string & {});
  /** Output only. The URL of the homepage of the extension. */
  homepageUri?: string;
  /** Output only. Installation type of the extension. */
  installationType?: "INSTALLATION_TYPE_UNSPECIFIED" | "MULTIPLE" | "NORMAL" | "ADMIN" | "DEVELOPMENT" | "SIDELOAD" | "OTHER" | (string & {});
  /** Output only. Represents whether the user disabled the extension. */
  isDisabled?: boolean;
  /** Output only. Represents whether the extension is from the webstore. */
  isWebstoreExtension?: boolean;
  /** Output only. Manifest version of the extension. */
  manifestVersion?: number;
}

export const GoogleChromeManagementVersionsV1ReportingDataExtensionData: Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataExtensionData> = Schema.suspend(() => Schema.Struct({
  extensionId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  extensionType: Schema.optional(Schema.String),
  homepageUri: Schema.optional(Schema.String),
  installationType: Schema.optional(Schema.String),
  isDisabled: Schema.optional(Schema.Boolean),
  isWebstoreExtension: Schema.optional(Schema.Boolean),
  manifestVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ReportingDataExtensionData" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataExtensionData>;

export interface GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData {
  /** Output only. Source of the policy. */
  source?: "POLICY_SOURCE_UNSPECIFIED" | "MACHINE_PLATFORM" | "USER_PLATFORM" | "MACHINE_LEVEL_USER_CLOUD" | "USER_CLOUD" | "MACHINE_MERGED" | (string & {});
}

export const GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData: Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData>;

export interface GoogleChromeManagementVersionsV1ReportingDataPolicyData {
  /** Output only. Source of the policy. */
  source?: "POLICY_SOURCE_UNSPECIFIED" | "MACHINE_PLATFORM" | "USER_PLATFORM" | "MACHINE_LEVEL_USER_CLOUD" | "USER_CLOUD" | "MACHINE_MERGED" | (string & {});
  /** Output only. Name of the policy. */
  name?: string;
  /** Output only. Value of the policy. */
  value?: string;
  /** Output only. Error message of the policy, if any. */
  error?: string;
  /** Output only. Conflicting policy information. */
  conflicts?: Array<GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData>;
}

export const GoogleChromeManagementVersionsV1ReportingDataPolicyData: Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataPolicyData> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
  conflicts: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ReportingDataConflictingPolicyData)),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ReportingDataPolicyData" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataPolicyData>;

export interface GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData {
  /** Output only. ID of the extension. */
  extensionId?: string;
  /** Output only. Name of the extension. */
  extensionName?: string;
  /** Output only. Information of the policies applied on the extension. */
  policyData?: Array<GoogleChromeManagementVersionsV1ReportingDataPolicyData>;
}

export const GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData: Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData> = Schema.suspend(() => Schema.Struct({
  extensionId: Schema.optional(Schema.String),
  extensionName: Schema.optional(Schema.String),
  policyData: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ReportingDataPolicyData)),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData>;

export interface GoogleChromeManagementVersionsV1ReportingData {
  /** Output only. Executable path of the installed Chrome browser. A valid path is included only in affiliated profiles. */
  browserExecutablePath?: string;
  /** Output only. Updated version of a browser, if it is different from the active browser version. */
  installedBrowserVersion?: string;
  /** Output only. Path of the profile. A valid path is included only in affiliated profiles. */
  profilePath?: string;
  /** Output only. Information of the extensions installed on the profile. */
  extensionData?: Array<GoogleChromeManagementVersionsV1ReportingDataExtensionData>;
  /** Output only. Information of the policies applied on the profile. */
  policyData?: Array<GoogleChromeManagementVersionsV1ReportingDataPolicyData>;
  /** Output only. Information of the policies applied on the extensions. */
  extensionPolicyData?: Array<GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData>;
}

export const GoogleChromeManagementVersionsV1ReportingData: Schema.Schema<GoogleChromeManagementVersionsV1ReportingData> = Schema.suspend(() => Schema.Struct({
  browserExecutablePath: Schema.optional(Schema.String),
  installedBrowserVersion: Schema.optional(Schema.String),
  profilePath: Schema.optional(Schema.String),
  extensionData: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ReportingDataExtensionData)),
  policyData: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ReportingDataPolicyData)),
  extensionPolicyData: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ReportingDataExtensionPolicyData)),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ReportingData" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ReportingData>;

export interface GoogleChromeManagementVersionsV1ChromeBrowserProfile {
  /** Identifier. Format: customers/{customer_id}/profiles/{profile_permanent_id} */
  name?: string;
  /** Output only. Chrome client side profile ID. */
  profileId?: string;
  /** Output only. Profile permanent ID is the unique identifier of a profile within one customer. */
  profilePermanentId?: string;
  /** Output only. Profile display name set by client. */
  displayName?: string;
  /** Output only. Unique Directory API ID of the user that can be used in Admin SDK Users API. */
  userId?: string;
  /** Output only. Email address of the user to which the profile belongs. */
  userEmail?: string;
  /** Output only. Timestamp of the latest activity by the profile. */
  lastActivityTime?: string;
  /** Output only. Timestamp of the latest policy fetch by the profile. */
  lastPolicyFetchTime?: string;
  /** Output only. Timestamp of the latest policy sync by the profile. */
  lastPolicySyncTime?: string;
  /** Output only. Timestamp of the latest status report by the profile. */
  lastStatusReportTime?: string;
  /** Output only. Basic information of the device on which the profile exists. This information is only available for the affiliated profiles. */
  deviceInfo?: GoogleChromeManagementVersionsV1DeviceInfo;
  /** Output only. OS platform of the device on which the profile exists. */
  osPlatformType?: string;
  /** Output only. OS version of the device on which the profile exists. */
  osVersion?: string;
  /** Output only. Version of the browser on which the profile exists. */
  browserVersion?: string;
  /** Output only. Channel of the browser on which the profile exists. */
  browserChannel?: string;
  /** Output only. Number of policies applied on the profile. */
  policyCount?: string;
  /** Output only. Number of extensions installed on the profile. */
  extensionCount?: string;
  /** Optional. Location of the profile annotated by the admin. */
  annotatedLocation?: string;
  /** Optional. User of the profile annotated by the admin. */
  annotatedUser?: string;
  /** Output only. Attestation credential information of the profile. */
  attestationCredential?: GoogleChromeManagementVersionsV1AttestationCredential;
  /** Output only. Detailed reporting data of the profile. This information is only available when the profile reporting policy is enabled. */
  reportingData?: GoogleChromeManagementVersionsV1ReportingData;
  /** Output only. Etag of this ChromeBrowserProfile resource. This etag can be used with UPDATE operation to ensure consistency. */
  etag?: string;
  /** Output only. Identify provider of the profile. */
  identityProvider?: "IDENTITY_PROVIDER_UNSPECIFIED" | "GOOGLE_IDENTITY_PROVIDER" | "EXTERNAL_IDENTITY_PROVIDER" | (string & {});
  /** Output only. Timestamp of the first enrollment of the profile. */
  firstEnrollmentTime?: string;
  /** Output only. Major OS platform version of the device on which the profile exists, from profile reporting. */
  osPlatformVersion?: string;
  /** Output only. The specific affiliation state of the profile. */
  affiliationState?: "AFFILIATION_STATE_UNSPECIFIED" | "UNAFFILIATED_GENERIC" | "PROFILE_ONLY" | "UNAFFILIATED_LOCAL_MACHINE" | "UNAFFILIATED_CLOUD_MACHINE" | "AFFILIATED_CLOUD_MANAGED" | (string & {});
  /** Output only. Whether the profile supports FCM notifications. */
  supportsFcmNotifications?: boolean;
}

export const GoogleChromeManagementVersionsV1ChromeBrowserProfile: Schema.Schema<GoogleChromeManagementVersionsV1ChromeBrowserProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  profileId: Schema.optional(Schema.String),
  profilePermanentId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  lastActivityTime: Schema.optional(Schema.String),
  lastPolicyFetchTime: Schema.optional(Schema.String),
  lastPolicySyncTime: Schema.optional(Schema.String),
  lastStatusReportTime: Schema.optional(Schema.String),
  deviceInfo: Schema.optional(GoogleChromeManagementVersionsV1DeviceInfo),
  osPlatformType: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  browserVersion: Schema.optional(Schema.String),
  browserChannel: Schema.optional(Schema.String),
  policyCount: Schema.optional(Schema.String),
  extensionCount: Schema.optional(Schema.String),
  annotatedLocation: Schema.optional(Schema.String),
  annotatedUser: Schema.optional(Schema.String),
  attestationCredential: Schema.optional(GoogleChromeManagementVersionsV1AttestationCredential),
  reportingData: Schema.optional(GoogleChromeManagementVersionsV1ReportingData),
  etag: Schema.optional(Schema.String),
  identityProvider: Schema.optional(Schema.String),
  firstEnrollmentTime: Schema.optional(Schema.String),
  osPlatformVersion: Schema.optional(Schema.String),
  affiliationState: Schema.optional(Schema.String),
  supportsFcmNotifications: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ChromeBrowserProfile" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ChromeBrowserProfile>;

export interface GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse {
  /** The list of profiles returned. */
  chromeBrowserProfiles?: Array<GoogleChromeManagementVersionsV1ChromeBrowserProfile>;
  /** The pagination token that can be used to list the next page. */
  nextPageToken?: string;
  /** Total size represents an estimated number of resources returned. Not guaranteed to be accurate above 10k profiles. */
  totalSize?: string;
}

export const GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse: Schema.Schema<GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse> = Schema.suspend(() => Schema.Struct({
  chromeBrowserProfiles: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ChromeBrowserProfile)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse>;

export interface GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult {
  /** Output only. Result type of the remote command. */
  resultType?: "COMMAND_RESULT_TYPE_UNSPECIFIED" | "IGNORED" | "FAILURE" | "SUCCESS" | (string & {});
  /** Output only. Timestamp of the client execution of the remote command. */
  clientExecutionTime?: string;
  /** Output only. Result code that indicates the type of error or success of the command. */
  resultCode?: string;
}

export const GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult: Schema.Schema<GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult> = Schema.suspend(() => Schema.Struct({
  resultType: Schema.optional(Schema.String),
  clientExecutionTime: Schema.optional(Schema.String),
  resultCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult>;

export interface GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand {
  /** Identifier. Format: customers/{customer_id}/profiles/{profile_permanent_id}/commands/{command_id} */
  name?: string;
  /** Required. Type of the remote command. The only supported command_type is "clearBrowsingData". */
  commandType?: string;
  /** Required. Payload of the remote command. The payload for "clearBrowsingData" command supports: - fields "clearCache" and "clearCookies" - values of boolean type. */
  payload?: Record<string, unknown>;
  /** Output only. State of the remote command. */
  commandState?: "COMMAND_STATE_UNSPECIFIED" | "PENDING" | "EXPIRED" | "EXECUTED_BY_CLIENT" | (string & {});
  /** Output only. Result of the remote command. */
  commandResult?: GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult;
  /** Output only. Timestamp of the issurance of the remote command. */
  issueTime?: string;
  /** Output only. Valid duration of the remote command. */
  validDuration?: string;
}

export const GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand: Schema.Schema<GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  commandType: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  commandState: Schema.optional(Schema.String),
  commandResult: Schema.optional(GoogleChromeManagementVersionsV1ChromeBrowserProfileCommandCommandResult),
  issueTime: Schema.optional(Schema.String),
  validDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand>;

export interface GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse {
  /** The list of commands returned. */
  chromeBrowserProfileCommands?: Array<GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand>;
  /** The pagination token that can be used to list the next page. */
  nextPageToken?: string;
  /** Total size represents an estimated number of resources returned. */
  totalSize?: string;
}

export const GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse: Schema.Schema<GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse> = Schema.suspend(() => Schema.Struct({
  chromeBrowserProfileCommands: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest {
  /** Required. The instance id of the caller. */
  callerInstanceId?: string;
}

export const GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest: Schema.Schema<GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest> = Schema.suspend(() => Schema.Struct({
  callerInstanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest>;

export interface GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse {
}

export const GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse: Schema.Schema<GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse>;

export interface GoogleChromeManagementVersionsV1GenericCaConnection {
  /** Output only. A string that references the administrator-provided configuration for the certification authority service. */
  caConnectionAdapterConfigReference?: string;
}

export const GoogleChromeManagementVersionsV1GenericCaConnection: Schema.Schema<GoogleChromeManagementVersionsV1GenericCaConnection> = Schema.suspend(() => Schema.Struct({
  caConnectionAdapterConfigReference: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1GenericCaConnection" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1GenericCaConnection>;

export interface GoogleChromeManagementVersionsV1ScepCaConnection {
  /** Output only. A string that references the administrator-provided configuration for the certification authority service. */
  caConnectionAdapterConfigReference?: string;
}

export const GoogleChromeManagementVersionsV1ScepCaConnection: Schema.Schema<GoogleChromeManagementVersionsV1ScepCaConnection> = Schema.suspend(() => Schema.Struct({
  caConnectionAdapterConfigReference: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ScepCaConnection" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ScepCaConnection>;

export interface GoogleChromeManagementVersionsV1GenericProfile {
  /** Output only. A string that references the administrator-provided configuration for the certificate provisioning profile. */
  profileAdapterConfigReference?: string;
}

export const GoogleChromeManagementVersionsV1GenericProfile: Schema.Schema<GoogleChromeManagementVersionsV1GenericProfile> = Schema.suspend(() => Schema.Struct({
  profileAdapterConfigReference: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1GenericProfile" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1GenericProfile>;

export interface GoogleChromeManagementVersionsV1SubjectAltName {
  /** Output only. The type of the SubjectAltName extension. */
  type?: "SUBJECT_ALT_NAME_TYPE_UNSPECIFIED" | "RFC822_NAME" | "DNS_NAME" | "OTHER_NAME_USER_PRINCIPAL_NAME" | "UNIFORM_RESOURCE_IDENTIFIER" | (string & {});
  /** Output only. The value of the subject alternative name with respect to the `type`. */
  value?: string;
}

export const GoogleChromeManagementVersionsV1SubjectAltName: Schema.Schema<GoogleChromeManagementVersionsV1SubjectAltName> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1SubjectAltName" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1SubjectAltName>;

export interface GoogleChromeManagementVersionsV1ScepProfile {
  /** Output only. The common name of the subject. */
  subjectCommonName?: string;
  /** Output only. The name of the organization the subject belongs to. */
  organization?: string;
  /** Output only. The organizational units of the subject. */
  organizationalUnits?: Array<string>;
  /** Output only. The locality of the subject. */
  locality?: string;
  /** Output only. The state of the subject. */
  state?: string;
  /** Output only. The country of the subject. */
  country?: string;
  /** Output only. The subject alternative names. */
  subjectAltNames?: Array<GoogleChromeManagementVersionsV1SubjectAltName>;
  /** Output only. The certificate template name as defined by the admin on their on-prem infrastructure. The Certificate Authority uses this name to identify the certificate template. */
  certificateTemplateName?: string;
  /** Output only. The allowed key usages for certificate's key. */
  keyUsages?: Array<"KEY_USAGE_UNSPECIFIED" | "KEY_USAGE_SIGNING" | "KEY_USAGE_KEY_ENCIPHERMENT" | (string & {})>;
}

export const GoogleChromeManagementVersionsV1ScepProfile: Schema.Schema<GoogleChromeManagementVersionsV1ScepProfile> = Schema.suspend(() => Schema.Struct({
  subjectCommonName: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  organizationalUnits: Schema.optional(Schema.Array(Schema.String)),
  locality: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  subjectAltNames: Schema.optional(Schema.Array(GoogleChromeManagementVersionsV1SubjectAltName)),
  certificateTemplateName: Schema.optional(Schema.String),
  keyUsages: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ScepProfile" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ScepProfile>;

export interface GoogleChromeManagementVersionsV1ChromeOsDevice {
  /** Output only. The unique Directory API ID of the device. This value is the same as the Admin Console's Directory API ID in the ChromeOS Devices tab. */
  deviceDirectoryApiId?: string;
  /** Output only. Device serial number. This value is the same as the Admin Console's Serial Number in the ChromeOS Devices tab. */
  serialNumber?: string;
}

export const GoogleChromeManagementVersionsV1ChromeOsDevice: Schema.Schema<GoogleChromeManagementVersionsV1ChromeOsDevice> = Schema.suspend(() => Schema.Struct({
  deviceDirectoryApiId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ChromeOsDevice" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ChromeOsDevice>;

export interface GoogleChromeManagementVersionsV1ChromeOsUserSession {
  /** Output only. The unique Directory API ID of the user. */
  userDirectoryApiId?: string;
  /** Output only. The primary e-mail address of the user. */
  userPrimaryEmail?: string;
  /** Output only. This field contains information about the ChromeOS device that the user session is running on. It is only set if the user is affiliated, i.e., if the user is managed by the same organization that manages the ChromeOS device. */
  chromeOsDevice?: GoogleChromeManagementVersionsV1ChromeOsDevice;
}

export const GoogleChromeManagementVersionsV1ChromeOsUserSession: Schema.Schema<GoogleChromeManagementVersionsV1ChromeOsUserSession> = Schema.suspend(() => Schema.Struct({
  userDirectoryApiId: Schema.optional(Schema.String),
  userPrimaryEmail: Schema.optional(Schema.String),
  chromeOsDevice: Schema.optional(GoogleChromeManagementVersionsV1ChromeOsDevice),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ChromeOsUserSession" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ChromeOsUserSession>;

export interface GoogleChromeManagementVersionsV1CertificateProvisioningProcess {
  /** Output only. The CA connection is a generic CA connection. */
  genericCaConnection?: GoogleChromeManagementVersionsV1GenericCaConnection;
  /** Output only. The CA connection is a SCEP CA connection. */
  scepCaConnection?: GoogleChromeManagementVersionsV1ScepCaConnection;
  /** Output only. The profile is a generic certificate provisioning profile. */
  genericProfile?: GoogleChromeManagementVersionsV1GenericProfile;
  /** Output only. The profile is a SCEP certificate provisioning profile. */
  scepProfile?: GoogleChromeManagementVersionsV1ScepProfile;
  /** Output only. The client certificate is being provisioned for a ChromeOS device. This contains information about the device. */
  chromeOsDevice?: GoogleChromeManagementVersionsV1ChromeOsDevice;
  /** Output only. The client certificate is being provisioned for a ChromeOS user. This contains information about the current user session. */
  chromeOsUserSession?: GoogleChromeManagementVersionsV1ChromeOsUserSession;
  /** Identifier. Resource name of the `CertificateProvisioningProcess`. The name pattern is given as `customers/{customer}/certificateProvisioningProcesses/{certificate_provisioning_process}` with `{customer}` being the obfuscated customer id and `{certificate_provisioning_process}` being the certificate provisioning process id. */
  name?: string;
  /** Output only. The ID of the certificate provisioning profile. */
  provisioningProfileId?: string;
  /** Output only. The public key for which a certificate should be provisioned. Represented as a DER-encoded X.509 SubjectPublicKeyInfo. */
  subjectPublicKeyInfo?: string;
  /** Output only. Server-generated timestamp of when the certificate provisioning process has been created. */
  startTime?: string;
  /** Output only. The data that the client was asked to sign. This field is only present after the `SignData` operation has been initiated. */
  signData?: string;
  /** Output only. The signature algorithm that the client and backend components use when processing `sign_data`. If the `profile_type` is a `GenericProfile`, this field will only be present after the `SignData` operation was initiated. If the `profile_type` is a `ScepProfile`, the field will always be present. */
  signatureAlgorithm?: "SIGNATURE_ALGORITHM_UNSPECIFIED" | "SIGNATURE_ALGORITHM_RSA_PKCS1_V1_5_SHA256" | "SIGNATURE_ALGORITHM_ECDSA_SHA256" | (string & {});
  /** Output only. The signature of `signature_algorithm`, generated using the client's private key using `signature_algorithm`. This field is only present after the `SignData` operation has finished. */
  signature?: string;
  /** Output only. The issued certificate for this `CertificateProvisioningProcess` in PEM format. */
  issuedCertificate?: string;
  /** Output only. A message describing why this `CertificateProvisioningProcess` has failed. Presence of this field indicates that the `CertificateProvisioningProcess` has failed. */
  failureMessage?: string;
}

export const GoogleChromeManagementVersionsV1CertificateProvisioningProcess: Schema.Schema<GoogleChromeManagementVersionsV1CertificateProvisioningProcess> = Schema.suspend(() => Schema.Struct({
  genericCaConnection: Schema.optional(GoogleChromeManagementVersionsV1GenericCaConnection),
  scepCaConnection: Schema.optional(GoogleChromeManagementVersionsV1ScepCaConnection),
  genericProfile: Schema.optional(GoogleChromeManagementVersionsV1GenericProfile),
  scepProfile: Schema.optional(GoogleChromeManagementVersionsV1ScepProfile),
  chromeOsDevice: Schema.optional(GoogleChromeManagementVersionsV1ChromeOsDevice),
  chromeOsUserSession: Schema.optional(GoogleChromeManagementVersionsV1ChromeOsUserSession),
  name: Schema.optional(Schema.String),
  provisioningProfileId: Schema.optional(Schema.String),
  subjectPublicKeyInfo: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  signData: Schema.optional(Schema.String),
  signatureAlgorithm: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  issuedCertificate: Schema.optional(Schema.String),
  failureMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1CertificateProvisioningProcess" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1CertificateProvisioningProcess>;

export interface GoogleChromeManagementVersionsV1SignDataRequest {
  /** Required. The data that the client was asked to sign. */
  signData?: string;
  /** Required. The signature algorithm that the adapter expects the client and backend components to use when processing `sign_data`. */
  signatureAlgorithm?: "SIGNATURE_ALGORITHM_UNSPECIFIED" | "SIGNATURE_ALGORITHM_RSA_PKCS1_V1_5_SHA256" | "SIGNATURE_ALGORITHM_ECDSA_SHA256" | (string & {});
}

export const GoogleChromeManagementVersionsV1SignDataRequest: Schema.Schema<GoogleChromeManagementVersionsV1SignDataRequest> = Schema.suspend(() => Schema.Struct({
  signData: Schema.optional(Schema.String),
  signatureAlgorithm: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1SignDataRequest" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1SignDataRequest>;

export interface GoogleChromeManagementVersionsV1UploadCertificateRequest {
  /** Required. The issued certificate in PEM format. */
  certificatePem?: string;
}

export const GoogleChromeManagementVersionsV1UploadCertificateRequest: Schema.Schema<GoogleChromeManagementVersionsV1UploadCertificateRequest> = Schema.suspend(() => Schema.Struct({
  certificatePem: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1UploadCertificateRequest" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1UploadCertificateRequest>;

export interface GoogleChromeManagementVersionsV1UploadCertificateResponse {
}

export const GoogleChromeManagementVersionsV1UploadCertificateResponse: Schema.Schema<GoogleChromeManagementVersionsV1UploadCertificateResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleChromeManagementVersionsV1UploadCertificateResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1UploadCertificateResponse>;

export interface GoogleChromeManagementVersionsV1SetFailureRequest {
  /** Required. A message describing the failure details. It is displayed on the ChromeOS client device. */
  errorMessage?: string;
}

export const GoogleChromeManagementVersionsV1SetFailureRequest: Schema.Schema<GoogleChromeManagementVersionsV1SetFailureRequest> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1SetFailureRequest" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1SetFailureRequest>;

export interface GoogleChromeManagementVersionsV1SetFailureResponse {
}

export const GoogleChromeManagementVersionsV1SetFailureResponse: Schema.Schema<GoogleChromeManagementVersionsV1SetFailureResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleChromeManagementVersionsV1SetFailureResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1SetFailureResponse>;

export interface GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest {
  /** Required. Destination organizational unit where the third party chrome profile user will be moved to. */
  destinationOrgUnit?: string;
}

export const GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest: Schema.Schema<GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest> = Schema.suspend(() => Schema.Struct({
  destinationOrgUnit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest>;

export interface GoogleChromeManagementVersionsV1ThirdPartyProfileUser {
  /** Identifier. Format: customers/{customer_id}/thirdPartyProfileUsers/{third_party_profile_user_id} */
  name?: string;
  /** Output only. The ID of the organizational unit assigned to the user. */
  orgUnitId?: string;
}

export const GoogleChromeManagementVersionsV1ThirdPartyProfileUser: Schema.Schema<GoogleChromeManagementVersionsV1ThirdPartyProfileUser> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1ThirdPartyProfileUser" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1ThirdPartyProfileUser>;

export interface GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse {
  /** Output only. The moved third party profile user. */
  thirdPartyProfileUser?: GoogleChromeManagementVersionsV1ThirdPartyProfileUser;
}

export const GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse: Schema.Schema<GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse> = Schema.suspend(() => Schema.Struct({
  thirdPartyProfileUser: Schema.optional(GoogleChromeManagementVersionsV1ThirdPartyProfileUser),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse>;

export interface GoogleChromeManagementVersionsV1SignDataMetadata {
  /** Output only. Start time of the SignData operation. */
  startTime?: string;
}

export const GoogleChromeManagementVersionsV1SignDataMetadata: Schema.Schema<GoogleChromeManagementVersionsV1SignDataMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1SignDataMetadata" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1SignDataMetadata>;

export interface GoogleChromeManagementVersionsV1SignDataResponse {
  /** Output only. The certificate provisioning process. The signature generated by the client will be available in the `signature` field of `CertificateProvisioningProcess`. */
  certificateProvisioningProcess?: GoogleChromeManagementVersionsV1CertificateProvisioningProcess;
}

export const GoogleChromeManagementVersionsV1SignDataResponse: Schema.Schema<GoogleChromeManagementVersionsV1SignDataResponse> = Schema.suspend(() => Schema.Struct({
  certificateProvisioningProcess: Schema.optional(GoogleChromeManagementVersionsV1CertificateProvisioningProcess),
})).annotate({ identifier: "GoogleChromeManagementVersionsV1SignDataResponse" }) as any as Schema.Schema<GoogleChromeManagementVersionsV1SignDataResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Generate summary of app installation requests. */
export interface CountChromeAppRequestsCustomersAppsRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit. */
  orgUnitId?: string;
  /** Maximum number of results to return. Maximum and default are 50, anything above will be coerced to 50. */
  pageSize?: number;
  /** Token to specify the page of the request to be returned. */
  pageToken?: string;
  /** Field used to order results. Supported fields: * request_count * latest_request_time */
  orderBy?: string;
}

export const CountChromeAppRequestsCustomersAppsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/apps:countChromeAppRequests" }),
  svc,
) as unknown as Schema.Schema<CountChromeAppRequestsCustomersAppsRequest>;

export type CountChromeAppRequestsCustomersAppsResponse = GoogleChromeManagementV1CountChromeAppRequestsResponse;
export const CountChromeAppRequestsCustomersAppsResponse = GoogleChromeManagementV1CountChromeAppRequestsResponse;

export type CountChromeAppRequestsCustomersAppsError = CommonErrors;

export const countChromeAppRequestsCustomersApps = API.makePaginated(() => ({
  input: CountChromeAppRequestsCustomersAppsRequest,
  output: CountChromeAppRequestsCustomersAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a list of devices that have requested to install an extension. */
export interface FetchDevicesRequestingExtensionCustomersAppsRequest {
  /** Required. The customer ID or "my_customer" prefixed with "customers/". */
  customer: string;
  /** The ID of the organizational unit. Only consider devices that directly belong to this org unit, i.e. sub-orgunits are not counted. If omitted, all data will be returned. */
  orgUnitId?: string;
  /** Required. The extension for which we want to find requesting devices. */
  extensionId?: string;
  /** Optional. Maximum number of results to return. Maximum and default are 50. Any page size larger than 50 will be coerced to 50. */
  pageSize?: number;
  /** Optional. Token to specify the page of the request to be returned. Token expires after 1 day. */
  pageToken?: string;
}

export const FetchDevicesRequestingExtensionCustomersAppsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  extensionId: Schema.optional(Schema.String).pipe(T.HttpQuery("extensionId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/apps:fetchDevicesRequestingExtension" }),
  svc,
) as unknown as Schema.Schema<FetchDevicesRequestingExtensionCustomersAppsRequest>;

export type FetchDevicesRequestingExtensionCustomersAppsResponse = GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse;
export const FetchDevicesRequestingExtensionCustomersAppsResponse = GoogleChromeManagementV1FetchDevicesRequestingExtensionResponse;

export type FetchDevicesRequestingExtensionCustomersAppsError = CommonErrors;

export const fetchDevicesRequestingExtensionCustomersApps = API.makePaginated(() => ({
  input: FetchDevicesRequestingExtensionCustomersAppsRequest,
  output: FetchDevicesRequestingExtensionCustomersAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a list of users that have requested to install an extension. */
export interface FetchUsersRequestingExtensionCustomersAppsRequest {
  /** Required. The customer ID or "my_customer" prefixed with "customers/". */
  customer: string;
  /** The ID of the organizational unit. Only consider devices that directly belong to this org unit, i.e. sub-orgunits are not counted. If omitted, all data will be returned. */
  orgUnitId?: string;
  /** Required. The extension for which we want to find the requesting users. */
  extensionId?: string;
  /** Optional. Maximum number of results to return. Maximum and default are 50. Any page size larger than 50 will be coerced to 50. */
  pageSize?: number;
  /** Optional. Token to specify the page of the request to be returned. Token expires after 1 day. */
  pageToken?: string;
}

export const FetchUsersRequestingExtensionCustomersAppsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  extensionId: Schema.optional(Schema.String).pipe(T.HttpQuery("extensionId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/apps:fetchUsersRequestingExtension" }),
  svc,
) as unknown as Schema.Schema<FetchUsersRequestingExtensionCustomersAppsRequest>;

export type FetchUsersRequestingExtensionCustomersAppsResponse = GoogleChromeManagementV1FetchUsersRequestingExtensionResponse;
export const FetchUsersRequestingExtensionCustomersAppsResponse = GoogleChromeManagementV1FetchUsersRequestingExtensionResponse;

export type FetchUsersRequestingExtensionCustomersAppsError = CommonErrors;

export const fetchUsersRequestingExtensionCustomersApps = API.makePaginated(() => ({
  input: FetchUsersRequestingExtensionCustomersAppsRequest,
  output: FetchUsersRequestingExtensionCustomersAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a specific app for a customer by its resource name. */
export interface GetCustomersAppsChromeRequest {
  /** Required. The app for which details are being queried. Examples: "customers/my_customer/apps/chrome/gmbmikajjgmnabiglmofipeabaddhgne@2.1.2" for the Save to Google Drive Chrome extension version 2.1.2, "customers/my_customer/apps/android/com.google.android.apps.docs" for the Google Drive Android app's latest version. */
  name: string;
}

export const GetCustomersAppsChromeRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/apps/chrome/{chromeId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersAppsChromeRequest>;

export type GetCustomersAppsChromeResponse = GoogleChromeManagementV1AppDetails;
export const GetCustomersAppsChromeResponse = GoogleChromeManagementV1AppDetails;

export type GetCustomersAppsChromeError = CommonErrors;

export const getCustomersAppsChrome: API.OperationMethod<GetCustomersAppsChromeRequest, GetCustomersAppsChromeResponse, GetCustomersAppsChromeError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersAppsChromeRequest,
  output: GetCustomersAppsChromeResponse,
  errors: [],
}));

/** Get a specific app for a customer by its resource name. */
export interface GetCustomersAppsAndroidRequest {
  /** Required. The app for which details are being queried. Examples: "customers/my_customer/apps/chrome/gmbmikajjgmnabiglmofipeabaddhgne@2.1.2" for the Save to Google Drive Chrome extension version 2.1.2, "customers/my_customer/apps/android/com.google.android.apps.docs" for the Google Drive Android app's latest version. */
  name: string;
}

export const GetCustomersAppsAndroidRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/apps/android/{androidId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersAppsAndroidRequest>;

export type GetCustomersAppsAndroidResponse = GoogleChromeManagementV1AppDetails;
export const GetCustomersAppsAndroidResponse = GoogleChromeManagementV1AppDetails;

export type GetCustomersAppsAndroidError = CommonErrors;

export const getCustomersAppsAndroid: API.OperationMethod<GetCustomersAppsAndroidRequest, GetCustomersAppsAndroidResponse, GetCustomersAppsAndroidError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersAppsAndroidRequest,
  output: GetCustomersAppsAndroidResponse,
  errors: [],
}));

/** Get a specific app for a customer by its resource name. */
export interface GetCustomersAppsWebRequest {
  /** Required. The app for which details are being queried. Examples: "customers/my_customer/apps/chrome/gmbmikajjgmnabiglmofipeabaddhgne@2.1.2" for the Save to Google Drive Chrome extension version 2.1.2, "customers/my_customer/apps/android/com.google.android.apps.docs" for the Google Drive Android app's latest version. */
  name: string;
}

export const GetCustomersAppsWebRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/apps/web/{webId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersAppsWebRequest>;

export type GetCustomersAppsWebResponse = GoogleChromeManagementV1AppDetails;
export const GetCustomersAppsWebResponse = GoogleChromeManagementV1AppDetails;

export type GetCustomersAppsWebError = CommonErrors;

export const getCustomersAppsWeb: API.OperationMethod<GetCustomersAppsWebRequest, GetCustomersAppsWebResponse, GetCustomersAppsWebError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersAppsWebRequest,
  output: GetCustomersAppsWebResponse,
  errors: [],
}));

/** Generate report of the number of devices expiring in each month of the selected time frame. Devices are grouped by auto update expiration date and model. Further information can be found [here](https://support.google.com/chrome/a/answer/10564947). */
export interface CountChromeDevicesReachingAutoExpirationDateCustomersReportsRequest {
  /** Required. The customer ID or "my_customer" prefixed with "customers/". */
  customer: string;
  /** Optional. The organizational unit ID, if omitted, will return data for all organizational units. */
  orgUnitId?: string;
  /** Optional. Maximum expiration date in format yyyy-mm-dd in UTC timezone. If included returns all devices that have already expired and devices with auto expiration date equal to or later than the minimum date. */
  minAueDate?: string;
  /** Optional. Maximum expiration date in format yyyy-mm-dd in UTC timezone. If included returns all devices that have already expired and devices with auto expiration date equal to or earlier than the maximum date. */
  maxAueDate?: string;
}

export const CountChromeDevicesReachingAutoExpirationDateCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  minAueDate: Schema.optional(Schema.String).pipe(T.HttpQuery("minAueDate")),
  maxAueDate: Schema.optional(Schema.String).pipe(T.HttpQuery("maxAueDate")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countChromeDevicesReachingAutoExpirationDate" }),
  svc,
) as unknown as Schema.Schema<CountChromeDevicesReachingAutoExpirationDateCustomersReportsRequest>;

export type CountChromeDevicesReachingAutoExpirationDateCustomersReportsResponse = GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse;
export const CountChromeDevicesReachingAutoExpirationDateCustomersReportsResponse = GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse;

export type CountChromeDevicesReachingAutoExpirationDateCustomersReportsError = CommonErrors;

export const countChromeDevicesReachingAutoExpirationDateCustomersReports: API.OperationMethod<CountChromeDevicesReachingAutoExpirationDateCustomersReportsRequest, CountChromeDevicesReachingAutoExpirationDateCustomersReportsResponse, CountChromeDevicesReachingAutoExpirationDateCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountChromeDevicesReachingAutoExpirationDateCustomersReportsRequest,
  output: CountChromeDevicesReachingAutoExpirationDateCustomersReportsResponse,
  errors: [],
}));

/** Counts of ChromeOS devices that have not synced policies or have lacked user activity in the past 28 days, are out of date, or are not complaint. Further information can be found here https://support.google.com/chrome/a/answer/10564947 */
export interface CountChromeDevicesThatNeedAttentionCustomersReportsRequest {
  /** Required. The customer ID or "my_customer" prefixed with "customers/". */
  customer: string;
  /** Optional. The ID of the organizational unit. If omitted, all data will be returned. */
  orgUnitId?: string;
  /** Required. Mask of the fields that should be populated in the returned report. */
  readMask?: string;
}

export const CountChromeDevicesThatNeedAttentionCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countChromeDevicesThatNeedAttention" }),
  svc,
) as unknown as Schema.Schema<CountChromeDevicesThatNeedAttentionCustomersReportsRequest>;

export type CountChromeDevicesThatNeedAttentionCustomersReportsResponse = GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse;
export const CountChromeDevicesThatNeedAttentionCustomersReportsResponse = GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse;

export type CountChromeDevicesThatNeedAttentionCustomersReportsError = CommonErrors;

export const countChromeDevicesThatNeedAttentionCustomersReports: API.OperationMethod<CountChromeDevicesThatNeedAttentionCustomersReportsRequest, CountChromeDevicesThatNeedAttentionCustomersReportsResponse, CountChromeDevicesThatNeedAttentionCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountChromeDevicesThatNeedAttentionCustomersReportsRequest,
  output: CountChromeDevicesThatNeedAttentionCustomersReportsResponse,
  errors: [],
}));

/** Count of Chrome Browsers that have been recently enrolled, have new policy to be synced, or have no recent activity. */
export interface CountChromeBrowsersNeedingAttentionCustomersReportsRequest {
  /** Required. The customer ID or "my_customer" prefixed with "customers/". */
  customer: string;
  /** Optional. The ID of the organizational unit. If omitted, all data will be returned. */
  orgUnitId?: string;
}

export const CountChromeBrowsersNeedingAttentionCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countChromeBrowsersNeedingAttention" }),
  svc,
) as unknown as Schema.Schema<CountChromeBrowsersNeedingAttentionCustomersReportsRequest>;

export type CountChromeBrowsersNeedingAttentionCustomersReportsResponse = GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse;
export const CountChromeBrowsersNeedingAttentionCustomersReportsResponse = GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse;

export type CountChromeBrowsersNeedingAttentionCustomersReportsError = CommonErrors;

export const countChromeBrowsersNeedingAttentionCustomersReports: API.OperationMethod<CountChromeBrowsersNeedingAttentionCustomersReportsRequest, CountChromeBrowsersNeedingAttentionCustomersReportsResponse, CountChromeBrowsersNeedingAttentionCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountChromeBrowsersNeedingAttentionCustomersReportsRequest,
  output: CountChromeBrowsersNeedingAttentionCustomersReportsResponse,
  errors: [],
}));

/** Counts of devices with a specific hardware specification from the requested hardware type (for example model name, processor type). Further information can be found here https://support.google.com/chrome/a/answer/10564947 */
export interface CountChromeHardwareFleetDevicesCustomersReportsRequest {
  /** Required. The customer ID or "my_customer". */
  customer: string;
  /** Optional. The ID of the organizational unit. If omitted, all data will be returned. */
  orgUnitId?: string;
  /** Required. Mask of the fields that should be populated in the returned report. */
  readMask?: string;
}

export const CountChromeHardwareFleetDevicesCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countChromeHardwareFleetDevices" }),
  svc,
) as unknown as Schema.Schema<CountChromeHardwareFleetDevicesCustomersReportsRequest>;

export type CountChromeHardwareFleetDevicesCustomersReportsResponse = GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse;
export const CountChromeHardwareFleetDevicesCustomersReportsResponse = GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse;

export type CountChromeHardwareFleetDevicesCustomersReportsError = CommonErrors;

export const countChromeHardwareFleetDevicesCustomersReports: API.OperationMethod<CountChromeHardwareFleetDevicesCustomersReportsRequest, CountChromeHardwareFleetDevicesCustomersReportsResponse, CountChromeHardwareFleetDevicesCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountChromeHardwareFleetDevicesCustomersReportsRequest,
  output: CountChromeHardwareFleetDevicesCustomersReportsResponse,
  errors: [],
}));

/** Generate report of app installations. */
export interface CountInstalledAppsCustomersReportsRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit. */
  orgUnitId?: string;
  /** Maximum number of results to return. Maximum and default are 100. */
  pageSize?: number;
  /** Token to specify the page of the request to be returned. */
  pageToken?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Note: OR operations are not supported in this filter. Supported filter fields: * app_name * app_type * install_type * number_of_permissions * total_install_count * latest_profile_active_date * permission_name * app_id * manifest_versions * risk_score */
  filter?: string;
  /** Field used to order results. Supported order by fields: * app_name * app_type * install_type * number_of_permissions * total_install_count * app_id * manifest_versions * risk_score */
  orderBy?: string;
}

export const CountInstalledAppsCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countInstalledApps" }),
  svc,
) as unknown as Schema.Schema<CountInstalledAppsCustomersReportsRequest>;

export type CountInstalledAppsCustomersReportsResponse = GoogleChromeManagementV1CountInstalledAppsResponse;
export const CountInstalledAppsCustomersReportsResponse = GoogleChromeManagementV1CountInstalledAppsResponse;

export type CountInstalledAppsCustomersReportsError = CommonErrors;

export const countInstalledAppsCustomersReports = API.makePaginated(() => ({
  input: CountInstalledAppsCustomersReportsRequest,
  output: CountInstalledAppsCustomersReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generate report of managed Chrome browser devices that have a specified app installed. */
export interface FindInstalledAppDevicesCustomersReportsRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit. */
  orgUnitId?: string;
  /** Unique identifier of the app. For Chrome apps and extensions, the 32-character id (e.g. ehoadneljpdggcbbknedodolkkjodefl). For Android apps, the package name (e.g. com.evernote). */
  appId?: string;
  /** Type of the app. Optional. If not provided, an app type will be inferred from the format of the app ID. */
  appType?: "APP_TYPE_UNSPECIFIED" | "EXTENSION" | "APP" | "THEME" | "HOSTED_APP" | "ANDROID_APP" | (string & {});
  /** Maximum number of results to return. Maximum and default are 100. */
  pageSize?: number;
  /** Token to specify the page of the request to be returned. */
  pageToken?: string;
  /** Field used to order results. Supported order by fields: * machine * device_id */
  orderBy?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Note: OR operations are not supported in this filter. Supported filter fields: * last_active_date */
  filter?: string;
}

export const FindInstalledAppDevicesCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  appId: Schema.optional(Schema.String).pipe(T.HttpQuery("appId")),
  appType: Schema.optional(Schema.String).pipe(T.HttpQuery("appType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:findInstalledAppDevices" }),
  svc,
) as unknown as Schema.Schema<FindInstalledAppDevicesCustomersReportsRequest>;

export type FindInstalledAppDevicesCustomersReportsResponse = GoogleChromeManagementV1FindInstalledAppDevicesResponse;
export const FindInstalledAppDevicesCustomersReportsResponse = GoogleChromeManagementV1FindInstalledAppDevicesResponse;

export type FindInstalledAppDevicesCustomersReportsError = CommonErrors;

export const findInstalledAppDevicesCustomersReports = API.makePaginated(() => ({
  input: FindInstalledAppDevicesCustomersReportsRequest,
  output: FindInstalledAppDevicesCustomersReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generate report of installed Chrome versions. */
export interface CountChromeVersionsCustomersReportsRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit. */
  orgUnitId?: string;
  /** Maximum number of results to return. Maximum and default are 100. */
  pageSize?: number;
  /** Token to specify the page of the request to be returned. */
  pageToken?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Note: OR operations are not supported in this filter. Supported filter fields: * last_active_date */
  filter?: string;
}

export const CountChromeVersionsCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countChromeVersions" }),
  svc,
) as unknown as Schema.Schema<CountChromeVersionsCustomersReportsRequest>;

export type CountChromeVersionsCustomersReportsResponse = GoogleChromeManagementV1CountChromeVersionsResponse;
export const CountChromeVersionsCustomersReportsResponse = GoogleChromeManagementV1CountChromeVersionsResponse;

export type CountChromeVersionsCustomersReportsError = CommonErrors;

export const countChromeVersionsCustomersReports = API.makePaginated(() => ({
  input: CountChromeVersionsCustomersReportsRequest,
  output: CountChromeVersionsCustomersReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a summary of printing done by each user. */
export interface CountPrintJobsByUserCustomersReportsRequest {
  /** Required. Customer ID prefixed with "customers/" or "customers/my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit for printers. If specified, only print jobs initiated with printers from the specified organizational unit will be counted. If omitted, all print jobs will be counted. */
  printerOrgUnitId?: string;
  /** Maximum number of results to return. Maximum and default are 100. */
  pageSize?: number;
  /** Token to specify the page of the response to be returned. */
  pageToken?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Note: OR operations are not supported in this filter. Note: Only >= and <= comparators are supported in this filter. Supported filter fields: * complete_time */
  filter?: string;
  /** Field used to order results. If omitted, results will be ordered in ascending order of the 'user_email' field. Supported order_by fields: * user_email * job_count * printer_count * device_count */
  orderBy?: string;
}

export const CountPrintJobsByUserCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  printerOrgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("printerOrgUnitId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countPrintJobsByUser" }),
  svc,
) as unknown as Schema.Schema<CountPrintJobsByUserCustomersReportsRequest>;

export type CountPrintJobsByUserCustomersReportsResponse = GoogleChromeManagementV1CountPrintJobsByUserResponse;
export const CountPrintJobsByUserCustomersReportsResponse = GoogleChromeManagementV1CountPrintJobsByUserResponse;

export type CountPrintJobsByUserCustomersReportsError = CommonErrors;

export const countPrintJobsByUserCustomersReports = API.makePaginated(() => ({
  input: CountPrintJobsByUserCustomersReportsRequest,
  output: CountPrintJobsByUserCustomersReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a summary of printing done by each printer. */
export interface CountPrintJobsByPrinterCustomersReportsRequest {
  /** Required. Customer ID prefixed with "customers/" or "customers/my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit for printers. If specified, only data for printers from the specified organizational unit will be returned. If omitted, data for printers from all organizational units will be returned. */
  printerOrgUnitId?: string;
  /** Maximum number of results to return. Maximum and default are 100. */
  pageSize?: number;
  /** Token to specify the page of the response to be returned. */
  pageToken?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Note: OR operations are not supported in this filter. Note: Only >= and <= comparators are supported in this filter. Supported filter fields: * complete_time */
  filter?: string;
  /** Field used to order results. If omitted, results will be ordered in ascending order of the 'printer' field. Supported order_by fields: * printer * job_count * device_count * user_count */
  orderBy?: string;
}

export const CountPrintJobsByPrinterCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  printerOrgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("printerOrgUnitId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countPrintJobsByPrinter" }),
  svc,
) as unknown as Schema.Schema<CountPrintJobsByPrinterCustomersReportsRequest>;

export type CountPrintJobsByPrinterCustomersReportsResponse = GoogleChromeManagementV1CountPrintJobsByPrinterResponse;
export const CountPrintJobsByPrinterCustomersReportsResponse = GoogleChromeManagementV1CountPrintJobsByPrinterResponse;

export type CountPrintJobsByPrinterCustomersReportsError = CommonErrors;

export const countPrintJobsByPrinterCustomersReports = API.makePaginated(() => ({
  input: CountPrintJobsByPrinterCustomersReportsRequest,
  output: CountPrintJobsByPrinterCustomersReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a list of print jobs. */
export interface EnumeratePrintJobsCustomersReportsRequest {
  /** Required. Customer ID prefixed with "customers/" or "customers/my_customer" to use the customer associated to the account making the request. */
  customer: string;
  /** The ID of the organizational unit for printers. If specified, only print jobs submitted to printers from the specified organizational unit will be returned. */
  printerOrgUnitId?: string;
  /** The number of print jobs in the page from 0 to 100 inclusive, if page_size is not specified or zero, the size will be 50. */
  pageSize?: number;
  /** A page token received from a previous `EnumeratePrintJobs` call. Provide this to retrieve the subsequent page. If omitted, the first page of results will be returned. When paginating, all other parameters provided to `EnumeratePrintJobs` must match the call that provided the page token. */
  pageToken?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Note: OR operations are not supported in this filter. Note: Only >= and <= comparators are supported for `complete_time`. Note: Only = comparator supported for `user_id` and `printer_id`. Supported filter fields: * complete_time * printer_id * user_id */
  filter?: string;
  /** Field used to order results. If not specified, results will be ordered in descending order of the `complete_time` field. Supported order by fields: * title * state * create_time * complete_time * document_page_count * color_mode * duplex_mode * printer * user_email */
  orderBy?: string;
}

export const EnumeratePrintJobsCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  printerOrgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("printerOrgUnitId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:enumeratePrintJobs" }),
  svc,
) as unknown as Schema.Schema<EnumeratePrintJobsCustomersReportsRequest>;

export type EnumeratePrintJobsCustomersReportsResponse = GoogleChromeManagementV1EnumeratePrintJobsResponse;
export const EnumeratePrintJobsCustomersReportsResponse = GoogleChromeManagementV1EnumeratePrintJobsResponse;

export type EnumeratePrintJobsCustomersReportsError = CommonErrors;

export const enumeratePrintJobsCustomersReports = API.makePaginated(() => ({
  input: EnumeratePrintJobsCustomersReportsRequest,
  output: EnumeratePrintJobsCustomersReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a count of Chrome crash events. */
export interface CountChromeCrashEventsCustomersReportsRequest {
  /** Customer ID. */
  customer: string;
  /** If specified, only count the number of crash events of the devices in this organizational unit. */
  orgUnitId?: string;
  /** Query string to filter results, AND-separated fields in EBNF syntax. Supported filter fields: * major_browser_version * minor_browser_version * browser_channel * device_platform * past_number_days Example: `major_browser_version = 'M115' AND past_number_days = '28'`. */
  filter?: string;
  /** Field used to order results. Supported order by fields: * browser_version * count * date */
  orderBy?: string;
}

export const CountChromeCrashEventsCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countChromeCrashEvents" }),
  svc,
) as unknown as Schema.Schema<CountChromeCrashEventsCustomersReportsRequest>;

export type CountChromeCrashEventsCustomersReportsResponse = GoogleChromeManagementV1CountChromeCrashEventsResponse;
export const CountChromeCrashEventsCustomersReportsResponse = GoogleChromeManagementV1CountChromeCrashEventsResponse;

export type CountChromeCrashEventsCustomersReportsError = CommonErrors;

export const countChromeCrashEventsCustomersReports: API.OperationMethod<CountChromeCrashEventsCustomersReportsRequest, CountChromeCrashEventsCustomersReportsResponse, CountChromeCrashEventsCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountChromeCrashEventsCustomersReportsRequest,
  output: CountChromeCrashEventsCustomersReportsResponse,
  errors: [],
}));

/** Get a count of active devices per set time frames. */
export interface CountActiveDevicesCustomersReportsRequest {
  /** Required. Obfuscated customer ID prefixed with "customers/C" or "customers/my_customer". */
  customer: string;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "date.year"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "date.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "date.day"?: number;
}

export const CountActiveDevicesCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  "date.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.year")),
  "date.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.month")),
  "date.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countActiveDevices" }),
  svc,
) as unknown as Schema.Schema<CountActiveDevicesCustomersReportsRequest>;

export type CountActiveDevicesCustomersReportsResponse = GoogleChromeManagementV1CountActiveDevicesResponse;
export const CountActiveDevicesCustomersReportsResponse = GoogleChromeManagementV1CountActiveDevicesResponse;

export type CountActiveDevicesCustomersReportsError = CommonErrors;

export const countActiveDevicesCustomersReports: API.OperationMethod<CountActiveDevicesCustomersReportsRequest, CountActiveDevicesCustomersReportsResponse, CountActiveDevicesCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountActiveDevicesCustomersReportsRequest,
  output: CountActiveDevicesCustomersReportsResponse,
  errors: [],
}));

/** Get a count of devices per channel. */
export interface CountDevicesPerReleaseChannelCustomersReportsRequest {
  /** Required. Obfuscated customer ID prefixed with "customers/C" or "customers/my_customer". */
  customer: string;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "date.year"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "date.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "date.day"?: number;
}

export const CountDevicesPerReleaseChannelCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  "date.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.year")),
  "date.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.month")),
  "date.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countDevicesPerReleaseChannel" }),
  svc,
) as unknown as Schema.Schema<CountDevicesPerReleaseChannelCustomersReportsRequest>;

export type CountDevicesPerReleaseChannelCustomersReportsResponse = GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse;
export const CountDevicesPerReleaseChannelCustomersReportsResponse = GoogleChromeManagementV1CountDevicesPerReleaseChannelResponse;

export type CountDevicesPerReleaseChannelCustomersReportsError = CommonErrors;

export const countDevicesPerReleaseChannelCustomersReports: API.OperationMethod<CountDevicesPerReleaseChannelCustomersReportsRequest, CountDevicesPerReleaseChannelCustomersReportsResponse, CountDevicesPerReleaseChannelCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountDevicesPerReleaseChannelCustomersReportsRequest,
  output: CountDevicesPerReleaseChannelCustomersReportsResponse,
  errors: [],
}));

/** Get a count of devices per boot type. */
export interface CountDevicesPerBootTypeCustomersReportsRequest {
  /** Required. Obfuscated customer ID prefixed with "customers/C" or "customers/my_customer". */
  customer: string;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  "date.year"?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  "date.month"?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  "date.day"?: number;
}

export const CountDevicesPerBootTypeCustomersReportsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  "date.year": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.year")),
  "date.month": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.month")),
  "date.day": Schema.optional(Schema.Number).pipe(T.HttpQuery("date.day")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/reports:countDevicesPerBootType" }),
  svc,
) as unknown as Schema.Schema<CountDevicesPerBootTypeCustomersReportsRequest>;

export type CountDevicesPerBootTypeCustomersReportsResponse = GoogleChromeManagementV1CountDevicesPerBootTypeResponse;
export const CountDevicesPerBootTypeCustomersReportsResponse = GoogleChromeManagementV1CountDevicesPerBootTypeResponse;

export type CountDevicesPerBootTypeCustomersReportsError = CommonErrors;

export const countDevicesPerBootTypeCustomersReports: API.OperationMethod<CountDevicesPerBootTypeCustomersReportsRequest, CountDevicesPerBootTypeCustomersReportsResponse, CountDevicesPerBootTypeCustomersReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CountDevicesPerBootTypeCustomersReportsRequest,
  output: CountDevicesPerBootTypeCustomersReportsResponse,
  errors: [],
}));

/** List all telemetry devices. */
export interface ListCustomersTelemetryDevicesRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  parent: string;
  /** Optional. Only include resources that match the filter. Requests that don't specify a "reports_timestamp" value will default to returning only recent reports. Specify "reports_timestamp>=0" to get all report data. Supported filter fields: - org_unit_id - serial_number - device_id - reports_timestamp The "reports_timestamp" filter accepts either the Unix Epoch milliseconds format or the RFC3339 UTC "Zulu" format with nanosecond resolution and up to nine fractional digits. Both formats should be surrounded by simple double quotes. Examples: "2014-10-02T15:01:23Z", "2014-10-02T15:01:23.045123456Z", "1679283943823". */
  filter?: string;
  /** Required. Read mask to specify which fields to return. Supported read_mask paths are: - name - org_unit_id - device_id - serial_number - cpu_info - cpu_status_report - memory_info - memory_status_report - network_info - network_diagnostics_report - network_status_report - os_update_status - graphics_info - graphics_status_report - battery_info - battery_status_report - storage_info - storage_status_report - thunderbolt_info - audio_status_report - boot_performance_report - heartbeat_status_report - network_bandwidth_report - peripherals_report - kiosk_app_status_report - app_report - runtime_counters_report */
  readMask?: string;
  /** Maximum number of results to return. Default value is 100. Maximum value is 1000. */
  pageSize?: number;
  /** Token to specify next page in the list. */
  pageToken?: string;
}

export const ListCustomersTelemetryDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/telemetry/devices" }),
  svc,
) as unknown as Schema.Schema<ListCustomersTelemetryDevicesRequest>;

export type ListCustomersTelemetryDevicesResponse = GoogleChromeManagementV1ListTelemetryDevicesResponse;
export const ListCustomersTelemetryDevicesResponse = GoogleChromeManagementV1ListTelemetryDevicesResponse;

export type ListCustomersTelemetryDevicesError = CommonErrors;

export const listCustomersTelemetryDevices = API.makePaginated(() => ({
  input: ListCustomersTelemetryDevicesRequest,
  output: ListCustomersTelemetryDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get telemetry device. */
export interface GetCustomersTelemetryDevicesRequest {
  /** Required. Name of the `TelemetryDevice` to return. */
  name: string;
  /** Required. Read mask to specify which fields to return. Supported read_mask paths are: - name - org_unit_id - device_id - serial_number - cpu_info - cpu_status_report - memory_info - memory_status_report - network_info - network_diagnostics_report - network_status_report - os_update_status - graphics_info - graphics_status_report - battery_info - battery_status_report - storage_info - storage_status_report - thunderbolt_info - audio_status_report - boot_performance_report - heartbeat_status_report - network_bandwidth_report - peripherals_report - kiosk_app_status_report - app_report - runtime_counters_report */
  readMask?: string;
}

export const GetCustomersTelemetryDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/telemetry/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersTelemetryDevicesRequest>;

export type GetCustomersTelemetryDevicesResponse = GoogleChromeManagementV1TelemetryDevice;
export const GetCustomersTelemetryDevicesResponse = GoogleChromeManagementV1TelemetryDevice;

export type GetCustomersTelemetryDevicesError = CommonErrors;

export const getCustomersTelemetryDevices: API.OperationMethod<GetCustomersTelemetryDevicesRequest, GetCustomersTelemetryDevicesResponse, GetCustomersTelemetryDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersTelemetryDevicesRequest,
  output: GetCustomersTelemetryDevicesResponse,
  errors: [],
}));

/** List telemetry events. */
export interface ListCustomersTelemetryEventsRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  parent: string;
  /** Optional. Only include resources that match the filter. Although this parameter is currently optional, this parameter will be required- please specify at least 1 event type. Supported filter fields: - device_id - user_id - device_org_unit_id - user_org_unit_id - timestamp - event_type The "timestamp" filter accepts either the Unix Epoch milliseconds format or the RFC3339 UTC "Zulu" format with nanosecond resolution and up to nine fractional digits. Both formats should be surrounded by simple double quotes. Examples: "2014-10-02T15:01:23Z", "2014-10-02T15:01:23.045123456Z", "1679283943823". */
  filter?: string;
  /** Required. Read mask to specify which fields to return. Although currently required, this field will become optional, while the filter parameter with an event type will be come required. Supported read_mask paths are: - device - user - audio_severe_underrun_event - usb_peripherals_event - https_latency_change_event - network_state_change_event - wifi_signal_strength_event - vpn_connection_state_change_event - app_install_event - app_uninstall_event - app_launch_event - os_crash_event - external_displays_event */
  readMask?: string;
  /** Optional. Maximum number of results to return. Default value is 100. Maximum value is 1000. */
  pageSize?: number;
  /** Optional. Token to specify next page in the list. */
  pageToken?: string;
}

export const ListCustomersTelemetryEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/telemetry/events" }),
  svc,
) as unknown as Schema.Schema<ListCustomersTelemetryEventsRequest>;

export type ListCustomersTelemetryEventsResponse = GoogleChromeManagementV1ListTelemetryEventsResponse;
export const ListCustomersTelemetryEventsResponse = GoogleChromeManagementV1ListTelemetryEventsResponse;

export type ListCustomersTelemetryEventsError = CommonErrors;

export const listCustomersTelemetryEvents = API.makePaginated(() => ({
  input: ListCustomersTelemetryEventsRequest,
  output: ListCustomersTelemetryEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** List all telemetry users. */
export interface ListCustomersTelemetryUsersRequest {
  /** Required. Customer id or "my_customer" to use the customer associated to the account making the request. */
  parent: string;
  /** Only include resources that match the filter. Supported filter fields: - user_id - user_org_unit_id */
  filter?: string;
  /** Read mask to specify which fields to return. Supported read_mask paths are: - name - org_unit_id - user_id - user_email - user_device.device_id - user_device.audio_status_report - user_device.device_activity_report - user_device.network_bandwidth_report - user_device.peripherals_report - user_device.app_report */
  readMask?: string;
  /** Maximum number of results to return. Default value is 100. Maximum value is 1000. */
  pageSize?: number;
  /** Token to specify next page in the list. */
  pageToken?: string;
}

export const ListCustomersTelemetryUsersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/telemetry/users" }),
  svc,
) as unknown as Schema.Schema<ListCustomersTelemetryUsersRequest>;

export type ListCustomersTelemetryUsersResponse = GoogleChromeManagementV1ListTelemetryUsersResponse;
export const ListCustomersTelemetryUsersResponse = GoogleChromeManagementV1ListTelemetryUsersResponse;

export type ListCustomersTelemetryUsersError = CommonErrors;

export const listCustomersTelemetryUsers = API.makePaginated(() => ({
  input: ListCustomersTelemetryUsersRequest,
  output: ListCustomersTelemetryUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get telemetry user. */
export interface GetCustomersTelemetryUsersRequest {
  /** Required. Name of the `TelemetryUser` to return. */
  name: string;
  /** Read mask to specify which fields to return. Supported read_mask paths are: - name - org_unit_id - user_id - user_email - user_device.device_id - user_device.audio_status_report - user_device.device_activity_report - user_device.network_bandwidth_report - user_device.peripherals_report - user_device.app_report */
  readMask?: string;
}

export const GetCustomersTelemetryUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/telemetry/users/{usersId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersTelemetryUsersRequest>;

export type GetCustomersTelemetryUsersResponse = GoogleChromeManagementV1TelemetryUser;
export const GetCustomersTelemetryUsersResponse = GoogleChromeManagementV1TelemetryUser;

export type GetCustomersTelemetryUsersError = CommonErrors;

export const getCustomersTelemetryUsers: API.OperationMethod<GetCustomersTelemetryUsersRequest, GetCustomersTelemetryUsersResponse, GetCustomersTelemetryUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersTelemetryUsersRequest,
  output: GetCustomersTelemetryUsersResponse,
  errors: [],
}));

/** List all telemetry notification configs. */
export interface ListCustomersTelemetryNotificationConfigsRequest {
  /** Required. The parent which owns the notification configs. */
  parent: string;
  /** The maximum number of notification configs to return. The service may return fewer than this value. If unspecified, at most 100 notification configs will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A page token, received from a previous `ListTelemetryNotificationConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTelemetryNotificationConfigs` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCustomersTelemetryNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/telemetry/notificationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListCustomersTelemetryNotificationConfigsRequest>;

export type ListCustomersTelemetryNotificationConfigsResponse = GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse;
export const ListCustomersTelemetryNotificationConfigsResponse = GoogleChromeManagementV1ListTelemetryNotificationConfigsResponse;

export type ListCustomersTelemetryNotificationConfigsError = CommonErrors;

export const listCustomersTelemetryNotificationConfigs = API.makePaginated(() => ({
  input: ListCustomersTelemetryNotificationConfigsRequest,
  output: ListCustomersTelemetryNotificationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a telemetry notification config. */
export interface CreateCustomersTelemetryNotificationConfigsRequest {
  /** Required. The parent resource where this notification config will be created. Format: `customers/{customer}` */
  parent: string;
  /** Request body */
  body?: GoogleChromeManagementV1TelemetryNotificationConfig;
}

export const CreateCustomersTelemetryNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleChromeManagementV1TelemetryNotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/telemetry/notificationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersTelemetryNotificationConfigsRequest>;

export type CreateCustomersTelemetryNotificationConfigsResponse = GoogleChromeManagementV1TelemetryNotificationConfig;
export const CreateCustomersTelemetryNotificationConfigsResponse = GoogleChromeManagementV1TelemetryNotificationConfig;

export type CreateCustomersTelemetryNotificationConfigsError = CommonErrors;

export const createCustomersTelemetryNotificationConfigs: API.OperationMethod<CreateCustomersTelemetryNotificationConfigsRequest, CreateCustomersTelemetryNotificationConfigsResponse, CreateCustomersTelemetryNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersTelemetryNotificationConfigsRequest,
  output: CreateCustomersTelemetryNotificationConfigsResponse,
  errors: [],
}));

/** Delete a telemetry notification config. */
export interface DeleteCustomersTelemetryNotificationConfigsRequest {
  /** Required. The name of the notification config to delete. Format: `customers/{customer}/telemetry/notificationConfigs/{notification_config}` */
  name: string;
}

export const DeleteCustomersTelemetryNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/customers/{customersId}/telemetry/notificationConfigs/{notificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersTelemetryNotificationConfigsRequest>;

export type DeleteCustomersTelemetryNotificationConfigsResponse = GoogleProtobufEmpty;
export const DeleteCustomersTelemetryNotificationConfigsResponse = GoogleProtobufEmpty;

export type DeleteCustomersTelemetryNotificationConfigsError = CommonErrors;

export const deleteCustomersTelemetryNotificationConfigs: API.OperationMethod<DeleteCustomersTelemetryNotificationConfigsRequest, DeleteCustomersTelemetryNotificationConfigsResponse, DeleteCustomersTelemetryNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersTelemetryNotificationConfigsRequest,
  output: DeleteCustomersTelemetryNotificationConfigsResponse,
  errors: [],
}));

/** Gets a Chrome browser profile with customer ID and profile permanent ID. */
export interface GetCustomersProfilesRequest {
  /** Required. Format: customers/{customer_id}/profiles/{profile_permanent_id} */
  name: string;
}

export const GetCustomersProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/profiles/{profilesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersProfilesRequest>;

export type GetCustomersProfilesResponse = GoogleChromeManagementVersionsV1ChromeBrowserProfile;
export const GetCustomersProfilesResponse = GoogleChromeManagementVersionsV1ChromeBrowserProfile;

export type GetCustomersProfilesError = CommonErrors;

export const getCustomersProfiles: API.OperationMethod<GetCustomersProfilesRequest, GetCustomersProfilesResponse, GetCustomersProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersProfilesRequest,
  output: GetCustomersProfilesResponse,
  errors: [],
}));

/** Lists Chrome browser profiles of a customer based on the given search and sorting criteria. */
export interface ListCustomersProfilesRequest {
  /** Required. Format: customers/{customer_id} */
  parent: string;
  /** Optional. The maximum number of profiles to return. The default page size is 100 if page_size is unspecified, and the maximum page size allowed is 200. */
  pageSize?: number;
  /** Optional. The page token used to retrieve a specific page of the listing request. */
  pageToken?: string;
  /** Optional. The filter used to filter profiles. The following fields can be used in the filter: - profile_id - display_name - user_email - last_activity_time - last_policy_sync_time - last_status_report_time - first_enrollment_time - os_platform_type - os_version - browser_version - browser_channel - policy_count - extension_count - identity_provider - affiliation_state - os_platform_version - ouId Any of the above fields can be used to specify a filter, and filtering by multiple fields is supported with AND operator. String type fields and enum type fields support '=' and '!=' operators. The integer type and the timestamp type fields support '=', '!=', '<', '>', '<=' and '>=' operators. Timestamps expect an RFC-3339 formatted string (e.g. 2012-04-21T11:30:00-04:00). Wildcard '*' can be used with a string type field filter. In addition, string literal filtering is also supported, for example, 'ABC' as a filter maps to a filter that checks if any of the filterable string type fields contains 'ABC'. Organization unit number can be used as a filtering criteria here by specifying 'ouId = ${your_org_unit_id}', please note that only single OU ID matching is supported. */
  filter?: string;
  /** Optional. The fields used to specify the ordering of the results. The supported fields are: - profile_id - display_name - user_email - last_activity_time - last_policy_sync_time - last_status_report_time - first_enrollment_time - os_platform_type - os_version - browser_version - browser_channel - policy_count - extension_count - identity_provider - affiliation_state - os_platform_version By default, sorting is in ascending order, to specify descending order for a field, a suffix " desc" should be added to the field name. The default ordering is the descending order of last_status_report_time. */
  orderBy?: string;
}

export const ListCustomersProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/profiles" }),
  svc,
) as unknown as Schema.Schema<ListCustomersProfilesRequest>;

export type ListCustomersProfilesResponse = GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse;
export const ListCustomersProfilesResponse = GoogleChromeManagementVersionsV1ListChromeBrowserProfilesResponse;

export type ListCustomersProfilesError = CommonErrors;

export const listCustomersProfiles = API.makePaginated(() => ({
  input: ListCustomersProfilesRequest,
  output: ListCustomersProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the data collected from a Chrome browser profile. */
export interface DeleteCustomersProfilesRequest {
  /** Required. Format: customers/{customer_id}/profiles/{profile_permanent_id} */
  name: string;
}

export const DeleteCustomersProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/customers/{customersId}/profiles/{profilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersProfilesRequest>;

export type DeleteCustomersProfilesResponse = GoogleProtobufEmpty;
export const DeleteCustomersProfilesResponse = GoogleProtobufEmpty;

export type DeleteCustomersProfilesError = CommonErrors;

export const deleteCustomersProfiles: API.OperationMethod<DeleteCustomersProfilesRequest, DeleteCustomersProfilesResponse, DeleteCustomersProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersProfilesRequest,
  output: DeleteCustomersProfilesResponse,
  errors: [],
}));

/** Creates a Chrome browser profile remote command. */
export interface CreateCustomersProfilesCommandsRequest {
  /** Required. Format: customers/{customer_id}/profiles/{profile_permanent_id} */
  parent: string;
  /** Request body */
  body?: GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand;
}

export const CreateCustomersProfilesCommandsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/profiles/{profilesId}/commands", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersProfilesCommandsRequest>;

export type CreateCustomersProfilesCommandsResponse = GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand;
export const CreateCustomersProfilesCommandsResponse = GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand;

export type CreateCustomersProfilesCommandsError = CommonErrors;

export const createCustomersProfilesCommands: API.OperationMethod<CreateCustomersProfilesCommandsRequest, CreateCustomersProfilesCommandsResponse, CreateCustomersProfilesCommandsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersProfilesCommandsRequest,
  output: CreateCustomersProfilesCommandsResponse,
  errors: [],
}));

/** Gets a Chrome browser profile remote command. */
export interface GetCustomersProfilesCommandsRequest {
  /** Required. Format: customers/{customer_id}/profiles/{profile_permanent_id}/commands/{command_id} */
  name: string;
}

export const GetCustomersProfilesCommandsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/profiles/{profilesId}/commands/{commandsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersProfilesCommandsRequest>;

export type GetCustomersProfilesCommandsResponse = GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand;
export const GetCustomersProfilesCommandsResponse = GoogleChromeManagementVersionsV1ChromeBrowserProfileCommand;

export type GetCustomersProfilesCommandsError = CommonErrors;

export const getCustomersProfilesCommands: API.OperationMethod<GetCustomersProfilesCommandsRequest, GetCustomersProfilesCommandsResponse, GetCustomersProfilesCommandsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersProfilesCommandsRequest,
  output: GetCustomersProfilesCommandsResponse,
  errors: [],
}));

/** Lists remote commands of a Chrome browser profile. */
export interface ListCustomersProfilesCommandsRequest {
  /** Required. Format: customers/{customer_id}/profiles/{profile_permanent_id} */
  parent: string;
  /** Optional. The maximum number of commands to return. The default page size is 100 if page_size is unspecified, and the maximum page size allowed is 100. */
  pageSize?: number;
  /** Optional. The page token used to retrieve a specific page of the listing request. */
  pageToken?: string;
}

export const ListCustomersProfilesCommandsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/profiles/{profilesId}/commands" }),
  svc,
) as unknown as Schema.Schema<ListCustomersProfilesCommandsRequest>;

export type ListCustomersProfilesCommandsResponse = GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse;
export const ListCustomersProfilesCommandsResponse = GoogleChromeManagementVersionsV1ListChromeBrowserProfileCommandsResponse;

export type ListCustomersProfilesCommandsError = CommonErrors;

export const listCustomersProfilesCommands = API.makePaginated(() => ({
  input: ListCustomersProfilesCommandsRequest,
  output: ListCustomersProfilesCommandsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Claims a certificate provisioning process. For each certificate provisioning process, this operation can succeed only for one `caller_instance_id`. */
export interface ClaimCustomersCertificateProvisioningProcessesRequest {
  /** Required. Resource name of the `CertificateProvisioningProcess` to claim. The name pattern is given as `customers/{customer}/certificateProvisioningProcesses/{certificate_provisioning_process}` with `{customer}` being the obfuscated customer id and `{certificate_provisioning_process}` being the certificate provisioning process id. */
  name: string;
  /** Request body */
  body?: GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest;
}

export const ClaimCustomersCertificateProvisioningProcessesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/certificateProvisioningProcesses/{certificateProvisioningProcessesId}:claim", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClaimCustomersCertificateProvisioningProcessesRequest>;

export type ClaimCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse;
export const ClaimCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1ClaimCertificateProvisioningProcessResponse;

export type ClaimCustomersCertificateProvisioningProcessesError = CommonErrors;

export const claimCustomersCertificateProvisioningProcesses: API.OperationMethod<ClaimCustomersCertificateProvisioningProcessesRequest, ClaimCustomersCertificateProvisioningProcessesResponse, ClaimCustomersCertificateProvisioningProcessesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClaimCustomersCertificateProvisioningProcessesRequest,
  output: ClaimCustomersCertificateProvisioningProcessesResponse,
  errors: [],
}));

/** Retrieves a certificate provisioning process. */
export interface GetCustomersCertificateProvisioningProcessesRequest {
  /** Required. Resource name of the `CertificateProvisioningProcess` to return. The name pattern is given as `customers/{customer}/certificateProvisioningProcesses/{certificate_provisioning_process}` with `{customer}` being the obfuscated customer id and `{certificate_provisioning_process}` being the certificate provisioning process id. */
  name: string;
}

export const GetCustomersCertificateProvisioningProcessesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/certificateProvisioningProcesses/{certificateProvisioningProcessesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersCertificateProvisioningProcessesRequest>;

export type GetCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1CertificateProvisioningProcess;
export const GetCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1CertificateProvisioningProcess;

export type GetCustomersCertificateProvisioningProcessesError = CommonErrors;

export const getCustomersCertificateProvisioningProcesses: API.OperationMethod<GetCustomersCertificateProvisioningProcessesRequest, GetCustomersCertificateProvisioningProcessesResponse, GetCustomersCertificateProvisioningProcessesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersCertificateProvisioningProcessesRequest,
  output: GetCustomersCertificateProvisioningProcessesResponse,
  errors: [],
}));

/** Requests the client that initiated a certificate provisioning process to sign data. This should only be called after `ClaimCertificateProvisioningProcess` has been successfully executed. */
export interface SignDataCustomersCertificateProvisioningProcessesRequest {
  /** Required. Resource name of the `CertificateProvisioningProcess` to return. The name pattern is given as `customers/{customer}/certificateProvisioningProcesses/{certificate_provisioning_process}` with `{customer}` being the obfuscated customer id and `{certificate_provisioning_process}` being the certificate provisioning process id. */
  name: string;
  /** Request body */
  body?: GoogleChromeManagementVersionsV1SignDataRequest;
}

export const SignDataCustomersCertificateProvisioningProcessesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleChromeManagementVersionsV1SignDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/certificateProvisioningProcesses/{certificateProvisioningProcessesId}:signData", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignDataCustomersCertificateProvisioningProcessesRequest>;

export type SignDataCustomersCertificateProvisioningProcessesResponse = GoogleLongrunningOperation;
export const SignDataCustomersCertificateProvisioningProcessesResponse = GoogleLongrunningOperation;

export type SignDataCustomersCertificateProvisioningProcessesError = CommonErrors;

export const signDataCustomersCertificateProvisioningProcesses: API.OperationMethod<SignDataCustomersCertificateProvisioningProcessesRequest, SignDataCustomersCertificateProvisioningProcessesResponse, SignDataCustomersCertificateProvisioningProcessesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignDataCustomersCertificateProvisioningProcessesRequest,
  output: SignDataCustomersCertificateProvisioningProcessesResponse,
  errors: [],
}));

/** Uploads a successfully issued certificate for a certificate provisioning process. */
export interface UploadCertificateCustomersCertificateProvisioningProcessesRequest {
  /** Required. Resource name of the `CertificateProvisioningProcess` to return. The name pattern is given as `customers/{customer}/certificateProvisioningProcesses/{certificate_provisioning_process}` with `{customer}` being the obfuscated customer id and `{certificate_provisioning_process}` being the certificate provisioning process id. */
  name: string;
  /** Request body */
  body?: GoogleChromeManagementVersionsV1UploadCertificateRequest;
}

export const UploadCertificateCustomersCertificateProvisioningProcessesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleChromeManagementVersionsV1UploadCertificateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/certificateProvisioningProcesses/{certificateProvisioningProcessesId}:uploadCertificate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadCertificateCustomersCertificateProvisioningProcessesRequest>;

export type UploadCertificateCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1UploadCertificateResponse;
export const UploadCertificateCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1UploadCertificateResponse;

export type UploadCertificateCustomersCertificateProvisioningProcessesError = CommonErrors;

export const uploadCertificateCustomersCertificateProvisioningProcesses: API.OperationMethod<UploadCertificateCustomersCertificateProvisioningProcessesRequest, UploadCertificateCustomersCertificateProvisioningProcessesResponse, UploadCertificateCustomersCertificateProvisioningProcessesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadCertificateCustomersCertificateProvisioningProcessesRequest,
  output: UploadCertificateCustomersCertificateProvisioningProcessesResponse,
  errors: [],
}));

/** Marks a certificate provisioning process as failed. */
export interface SetFailureCustomersCertificateProvisioningProcessesRequest {
  /** Required. Resource name of the `CertificateProvisioningProcess` to return. The name pattern is given as `customers/{customer}/certificateProvisioningProcesses/{certificate_provisioning_process}` with `{customer}` being the obfuscated customer id and `{certificate_provisioning_process}` being the certificate provisioning process id. */
  name: string;
  /** Request body */
  body?: GoogleChromeManagementVersionsV1SetFailureRequest;
}

export const SetFailureCustomersCertificateProvisioningProcessesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleChromeManagementVersionsV1SetFailureRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/certificateProvisioningProcesses/{certificateProvisioningProcessesId}:setFailure", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetFailureCustomersCertificateProvisioningProcessesRequest>;

export type SetFailureCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1SetFailureResponse;
export const SetFailureCustomersCertificateProvisioningProcessesResponse = GoogleChromeManagementVersionsV1SetFailureResponse;

export type SetFailureCustomersCertificateProvisioningProcessesError = CommonErrors;

export const setFailureCustomersCertificateProvisioningProcesses: API.OperationMethod<SetFailureCustomersCertificateProvisioningProcessesRequest, SetFailureCustomersCertificateProvisioningProcessesResponse, SetFailureCustomersCertificateProvisioningProcessesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetFailureCustomersCertificateProvisioningProcessesRequest,
  output: SetFailureCustomersCertificateProvisioningProcessesResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetCustomersCertificateProvisioningProcessesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetCustomersCertificateProvisioningProcessesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/customers/{customersId}/certificateProvisioningProcesses/{certificateProvisioningProcessesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersCertificateProvisioningProcessesOperationsRequest>;

export type GetCustomersCertificateProvisioningProcessesOperationsResponse = GoogleLongrunningOperation;
export const GetCustomersCertificateProvisioningProcessesOperationsResponse = GoogleLongrunningOperation;

export type GetCustomersCertificateProvisioningProcessesOperationsError = CommonErrors;

export const getCustomersCertificateProvisioningProcessesOperations: API.OperationMethod<GetCustomersCertificateProvisioningProcessesOperationsRequest, GetCustomersCertificateProvisioningProcessesOperationsResponse, GetCustomersCertificateProvisioningProcessesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersCertificateProvisioningProcessesOperationsRequest,
  output: GetCustomersCertificateProvisioningProcessesOperationsResponse,
  errors: [],
}));

/** Moves a third party chrome profile user to a destination OU. All profiles associated to that user will be moved to the destination OU. */
export interface MoveCustomersThirdPartyProfileUsersRequest {
  /** Required. Format: customers/{customer_id}/thirdPartyProfileUsers/{third_party_profile_user_id} */
  name: string;
  /** Request body */
  body?: GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest;
}

export const MoveCustomersThirdPartyProfileUsersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/customers/{customersId}/thirdPartyProfileUsers/{thirdPartyProfileUsersId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveCustomersThirdPartyProfileUsersRequest>;

export type MoveCustomersThirdPartyProfileUsersResponse = GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse;
export const MoveCustomersThirdPartyProfileUsersResponse = GoogleChromeManagementVersionsV1MoveThirdPartyProfileUserResponse;

export type MoveCustomersThirdPartyProfileUsersError = CommonErrors;

export const moveCustomersThirdPartyProfileUsers: API.OperationMethod<MoveCustomersThirdPartyProfileUsersRequest, MoveCustomersThirdPartyProfileUsersResponse, MoveCustomersThirdPartyProfileUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveCustomersThirdPartyProfileUsersRequest,
  output: MoveCustomersThirdPartyProfileUsersResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = GoogleProtobufEmpty;
export const DeleteOperationsResponse = GoogleProtobufEmpty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = GoogleProtobufEmpty;
export const CancelOperationsResponse = GoogleProtobufEmpty;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

