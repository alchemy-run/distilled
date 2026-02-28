// ==========================================================================
// Google Play EMM API (androidenterprise v1)
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
  name: "androidenterprise",
  version: "v1",
  rootUrl: "https://androidenterprise.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ManagedPropertyBundle {
  /** The list of managed properties. */
  managedProperty?: Array<ManagedProperty>;
}

export const ManagedPropertyBundle: Schema.Schema<ManagedPropertyBundle> = Schema.suspend(() => Schema.Struct({
  managedProperty: Schema.optional(Schema.Array(ManagedProperty)),
})).annotate({ identifier: "ManagedPropertyBundle" }) as any as Schema.Schema<ManagedPropertyBundle>;

export interface ManagedProperty {
  /** The unique key that identifies the property. */
  key?: string;
  /** The boolean value - this will only be present if type of the property is bool. */
  valueBool?: boolean;
  /** The integer value - this will only be present if type of the property is integer. */
  valueInteger?: number;
  /** The string value - this will only be present if type of the property is string, choice or hidden. */
  valueString?: string;
  /** The list of string values - this will only be present if type of the property is multiselect. */
  valueStringArray?: Array<string>;
  /** The bundle of managed properties - this will only be present if type of the property is bundle. */
  valueBundle?: ManagedPropertyBundle;
  /** The list of bundles of properties - this will only be present if type of the property is bundle_array. */
  valueBundleArray?: Array<ManagedPropertyBundle>;
}

export const ManagedProperty: Schema.Schema<ManagedProperty> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  valueBool: Schema.optional(Schema.Boolean),
  valueInteger: Schema.optional(Schema.Number),
  valueString: Schema.optional(Schema.String),
  valueStringArray: Schema.optional(Schema.Array(Schema.String)),
  valueBundle: Schema.optional(ManagedPropertyBundle),
  valueBundleArray: Schema.optional(Schema.Array(ManagedPropertyBundle)),
})).annotate({ identifier: "ManagedProperty" }) as any as Schema.Schema<ManagedProperty>;

export interface VariableSet {
  /** The placeholder string; defined by EMM. */
  placeholder?: string;
  /** The value of the placeholder, specific to the user. */
  userValue?: string;
}

export const VariableSet: Schema.Schema<VariableSet> = Schema.suspend(() => Schema.Struct({
  placeholder: Schema.optional(Schema.String),
  userValue: Schema.optional(Schema.String),
})).annotate({ identifier: "VariableSet" }) as any as Schema.Schema<VariableSet>;

export interface ConfigurationVariables {
  /** The ID of the managed configurations settings. */
  mcmId?: string;
  /** The variable set that is attributed to the user. */
  variableSet?: Array<VariableSet>;
}

export const ConfigurationVariables: Schema.Schema<ConfigurationVariables> = Schema.suspend(() => Schema.Struct({
  mcmId: Schema.optional(Schema.String),
  variableSet: Schema.optional(Schema.Array(VariableSet)),
})).annotate({ identifier: "ConfigurationVariables" }) as any as Schema.Schema<ConfigurationVariables>;

export interface ManagedConfiguration {
  /** Deprecated. */
  kind?: string;
  /** The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm". */
  productId?: string;
  /** The set of managed properties for this configuration. */
  managedProperty?: Array<ManagedProperty>;
  /** Contains the ID of the managed configuration profile and the set of configuration variables (if any) defined for the user. */
  configurationVariables?: ConfigurationVariables;
}

export const ManagedConfiguration: Schema.Schema<ManagedConfiguration> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  managedProperty: Schema.optional(Schema.Array(ManagedProperty)),
  configurationVariables: Schema.optional(ConfigurationVariables),
})).annotate({ identifier: "ManagedConfiguration" }) as any as Schema.Schema<ManagedConfiguration>;

export interface AutoInstallConstraint {
  /** Network type constraint. */
  networkTypeConstraint?: "networkTypeConstraintUnspecified" | "anyNetwork" | "unmeteredNetwork" | (string & {});
  /** Charging state constraint. */
  chargingStateConstraint?: "chargingStateConstraintUnspecified" | "chargingNotRequired" | "chargingRequired" | (string & {});
  /** Device idle state constraint. */
  deviceIdleStateConstraint?: "deviceIdleStateConstraintUnspecified" | "deviceIdleNotRequired" | "deviceIdleRequired" | (string & {});
}

export const AutoInstallConstraint: Schema.Schema<AutoInstallConstraint> = Schema.suspend(() => Schema.Struct({
  networkTypeConstraint: Schema.optional(Schema.String),
  chargingStateConstraint: Schema.optional(Schema.String),
  deviceIdleStateConstraint: Schema.optional(Schema.String),
})).annotate({ identifier: "AutoInstallConstraint" }) as any as Schema.Schema<AutoInstallConstraint>;

export interface AutoInstallPolicy {
  /** The auto-install mode. If unset, defaults to "doNotAutoInstall". An app is automatically installed regardless of a set maintenance window. */
  autoInstallMode?: "autoInstallModeUnspecified" | "doNotAutoInstall" | "autoInstallOnce" | "forceAutoInstall" | (string & {});
  /** The priority of the install, as an unsigned integer. A lower number means higher priority. */
  autoInstallPriority?: number;
  /** The constraints for auto-installing the app. You can specify a maximum of one constraint. */
  autoInstallConstraint?: Array<AutoInstallConstraint>;
  /** The minimum version of the app. If a lower version of the app is installed, then the app will be auto-updated according to the auto-install constraints, instead of waiting for the regular auto-update. You can set a minimum version code for at most 20 apps per device. */
  minimumVersionCode?: number;
}

export const AutoInstallPolicy: Schema.Schema<AutoInstallPolicy> = Schema.suspend(() => Schema.Struct({
  autoInstallMode: Schema.optional(Schema.String),
  autoInstallPriority: Schema.optional(Schema.Number),
  autoInstallConstraint: Schema.optional(Schema.Array(AutoInstallConstraint)),
  minimumVersionCode: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoInstallPolicy" }) as any as Schema.Schema<AutoInstallPolicy>;

export interface EnterpriseAuthenticationAppLinkConfig {
  /** An authentication url. */
  uri?: string;
}

export const EnterpriseAuthenticationAppLinkConfig: Schema.Schema<EnterpriseAuthenticationAppLinkConfig> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseAuthenticationAppLinkConfig" }) as any as Schema.Schema<EnterpriseAuthenticationAppLinkConfig>;

export interface ProductPolicy {
  /** The ID of the product. For example, "app:com.google.android.gm". */
  productId?: string;
  /** Deprecated. Use trackIds instead. */
  tracks?: Array<"appTrackUnspecified" | "production" | "beta" | "alpha" | (string & {})>;
  /** Grants the device visibility to the specified product release track(s), identified by trackIds. The list of release tracks of a product can be obtained by calling Products.Get. */
  trackIds?: Array<string>;
  /** The managed configuration for the product. */
  managedConfiguration?: ManagedConfiguration;
  /** The auto-install policy for the product. */
  autoInstallPolicy?: AutoInstallPolicy;
  /** The auto-update mode for the product. When autoUpdateMode is used, it always takes precedence over the user's choice. So when a user makes changes to the device settings manually, these changes are ignored. */
  autoUpdateMode?: "autoUpdateModeUnspecified" | "autoUpdateDefault" | "autoUpdatePostponed" | "autoUpdateHighPriority" | (string & {});
  /** An authentication URL configuration for the authenticator app of an identity provider. This helps to launch the identity provider's authenticator app during the authentication happening in a private app using Android WebView. Authenticator app should already be the default handler for the authentication url on the device. */
  enterpriseAuthenticationAppLinkConfigs?: Array<EnterpriseAuthenticationAppLinkConfig>;
}

export const ProductPolicy: Schema.Schema<ProductPolicy> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  tracks: Schema.optional(Schema.Array(Schema.String)),
  trackIds: Schema.optional(Schema.Array(Schema.String)),
  managedConfiguration: Schema.optional(ManagedConfiguration),
  autoInstallPolicy: Schema.optional(AutoInstallPolicy),
  autoUpdateMode: Schema.optional(Schema.String),
  enterpriseAuthenticationAppLinkConfigs: Schema.optional(Schema.Array(EnterpriseAuthenticationAppLinkConfig)),
})).annotate({ identifier: "ProductPolicy" }) as any as Schema.Schema<ProductPolicy>;

export interface MaintenanceWindow {
  /** Start time of the maintenance window, in milliseconds after midnight on the device. Windows can span midnight. */
  startTimeAfterMidnightMs?: string;
  /** Duration of the maintenance window, in milliseconds. The duration must be between 30 minutes and 24 hours (inclusive). */
  durationMs?: string;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  startTimeAfterMidnightMs: Schema.optional(Schema.String),
  durationMs: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface Policy {
  /** Controls when automatic app updates on the device can be applied. Recommended alternative: autoUpdateMode which is set per app, provides greater flexibility around update frequency. When autoUpdateMode is set to AUTO_UPDATE_POSTPONED or AUTO_UPDATE_HIGH_PRIORITY, autoUpdatePolicy has no effect. - choiceToTheUser allows the device's user to configure the app update policy. - always enables auto updates. - never disables auto updates. - wifiOnly enables auto updates only when the device is connected to wifi. *Important:* Changes to app update policies don't affect updates that are in progress. Any policy changes will apply to subsequent app updates. */
  autoUpdatePolicy?: "autoUpdatePolicyUnspecified" | "choiceToTheUser" | "never" | "wifiOnly" | "always" | (string & {});
  /** The availability granted to the device for the specified products. "all" gives the device access to all products, regardless of approval status. "all" does not enable automatic visibility of "alpha" or "beta" tracks. "whitelist" grants the device access the products specified in productPolicy[]. Only products that are approved or products that were previously approved (products with revoked approval) by the enterprise can be whitelisted. If no value is provided, the availability set at the user level is applied by default. */
  productAvailabilityPolicy?: "productAvailabilityPolicyUnspecified" | "whitelist" | "all" | (string & {});
  /** The list of product policies. The productAvailabilityPolicy needs to be set to WHITELIST or ALL for the product policies to be applied. */
  productPolicy?: Array<ProductPolicy>;
  /** The maintenance window defining when apps running in the foreground should be updated. */
  maintenanceWindow?: MaintenanceWindow;
  /** Whether the device reports app states to the EMM. The default value is "deviceReportDisabled". */
  deviceReportPolicy?: "deviceReportPolicyUnspecified" | "deviceReportDisabled" | "deviceReportEnabled" | (string & {});
  /** An identifier for the policy that will be passed with the app install feedback sent from the Play Store. */
  policyId?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  autoUpdatePolicy: Schema.optional(Schema.String),
  productAvailabilityPolicy: Schema.optional(Schema.String),
  productPolicy: Schema.optional(Schema.Array(ProductPolicy)),
  maintenanceWindow: Schema.optional(MaintenanceWindow),
  deviceReportPolicy: Schema.optional(Schema.String),
  policyId: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface KeyedAppState {
  /** Key indicating what the app is providing a state for. The content of the key is set by the app's developer. To prevent XSS, we recommend removing any HTML from the key before displaying it. This field will always be present. */
  key?: string;
  /** Timestamp of when the app set the state in milliseconds since epoch. This field will always be present. */
  stateTimestampMillis?: string;
  /** Severity of the app state. This field will always be present. */
  severity?: "severityUnknown" | "severityInfo" | "severityError" | (string & {});
  /** Free-form, human-readable message describing the app state. For example, an error message. To prevent XSS, we recommend removing any HTML from the message before displaying it. */
  message?: string;
  /** Additional field intended for machine-readable data. For example, a number or JSON object. To prevent XSS, we recommend removing any HTML from the data before displaying it. */
  data?: string;
}

export const KeyedAppState: Schema.Schema<KeyedAppState> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  stateTimestampMillis: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyedAppState" }) as any as Schema.Schema<KeyedAppState>;

export interface AppState {
  /** The package name of the app. This field will always be present. */
  packageName?: string;
  /** List of keyed app states. This field will always be present. */
  keyedAppState?: Array<KeyedAppState>;
}

export const AppState: Schema.Schema<AppState> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  keyedAppState: Schema.optional(Schema.Array(KeyedAppState)),
})).annotate({ identifier: "AppState" }) as any as Schema.Schema<AppState>;

export interface DeviceReport {
  /** The timestamp of the last report update in milliseconds since epoch. This field will always be present. */
  lastUpdatedTimestampMillis?: string;
  /** List of app states set by managed apps on the device. App states are defined by the app's developers. This field will always be present. */
  appState?: Array<AppState>;
}

export const DeviceReport: Schema.Schema<DeviceReport> = Schema.suspend(() => Schema.Struct({
  lastUpdatedTimestampMillis: Schema.optional(Schema.String),
  appState: Schema.optional(Schema.Array(AppState)),
})).annotate({ identifier: "DeviceReport" }) as any as Schema.Schema<DeviceReport>;

export interface Device {
  /** The Google Play Services Android ID for the device encoded as a lowercase hex string. For example, "123456789abcdef0". */
  androidId?: string;
  /** Identifies the extent to which the device is controlled by a managed Google Play EMM in various deployment configurations. Possible values include: - "managedDevice", a device that has the EMM's device policy controller (DPC) as the device owner. - "managedProfile", a device that has a profile managed by the DPC (DPC is profile owner) in addition to a separate, personal profile that is unavailable to the DPC. - "containerApp", no longer used (deprecated). - "unmanagedProfile", a device that has been allowed (by the domain's admin, using the Admin Console to enable the privilege) to use managed Google Play, but the profile is itself not owned by a DPC. */
  managementType?: "managedDevice" | "managedProfile" | "containerApp" | "unmanagedProfile" | (string & {});
  /** The policy enforced on the device. */
  policy?: Policy;
  /** The device report updated with the latest app states. */
  report?: DeviceReport;
  /** The build fingerprint of the device if known. */
  latestBuildFingerprint?: string;
  /** API compatibility version. */
  sdkVersion?: number;
  /** The manufacturer of the device. This comes from android.os.Build.MANUFACTURER. */
  maker?: string;
  /** The model name of the device. This comes from android.os.Build.MODEL. */
  model?: string;
  /** The internal hardware codename of the device. This comes from android.os.Build.DEVICE. (field named "device" per logs/wireless/android/android_checkin.proto) */
  device?: string;
  /** The product name of the device. This comes from android.os.Build.PRODUCT. */
  product?: string;
  /** Retail brand for the device, if set. See android.os.Build.BRAND */
  retailBrand?: string;
}

export const Device: Schema.Schema<Device> = Schema.suspend(() => Schema.Struct({
  androidId: Schema.optional(Schema.String),
  managementType: Schema.optional(Schema.String),
  policy: Schema.optional(Policy),
  report: Schema.optional(DeviceReport),
  latestBuildFingerprint: Schema.optional(Schema.String),
  sdkVersion: Schema.optional(Schema.Number),
  maker: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  device: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  retailBrand: Schema.optional(Schema.String),
})).annotate({ identifier: "Device" }) as any as Schema.Schema<Device>;

export interface DevicesListResponse {
  /** A managed device. */
  device?: Array<Device>;
}

export const DevicesListResponse: Schema.Schema<DevicesListResponse> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(Schema.Array(Device)),
})).annotate({ identifier: "DevicesListResponse" }) as any as Schema.Schema<DevicesListResponse>;

export interface DeviceState {
  /** The state of the Google account on the device. "enabled" indicates that the Google account on the device can be used to access Google services (including Google Play), while "disabled" means that it cannot. A new device is initially in the "disabled" state. */
  accountState?: "enabled" | "disabled" | (string & {});
}

export const DeviceState: Schema.Schema<DeviceState> = Schema.suspend(() => Schema.Struct({
  accountState: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceState" }) as any as Schema.Schema<DeviceState>;

export interface EnrollmentTokenGoogleAuthenticationOptions {
  /** [Optional] Specifies whether user should authenticate with Google during enrollment. This setting, if specified,`GoogleAuthenticationSettings` specified for the enterprise resource is ignored for devices enrolled with this token. */
  authenticationRequirement?: "authenticationRequirementUnspecified" | "optional" | "required" | (string & {});
  /** [Optional] Specifies the managed Google account that the user must use during enrollment.`AuthenticationRequirement` must be set to`REQUIRED` if this field is set. */
  requiredAccountEmail?: string;
}

export const EnrollmentTokenGoogleAuthenticationOptions: Schema.Schema<EnrollmentTokenGoogleAuthenticationOptions> = Schema.suspend(() => Schema.Struct({
  authenticationRequirement: Schema.optional(Schema.String),
  requiredAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "EnrollmentTokenGoogleAuthenticationOptions" }) as any as Schema.Schema<EnrollmentTokenGoogleAuthenticationOptions>;

export interface EnrollmentToken {
  /** The token value that's passed to the device and authorizes the device to enroll. This is a read-only field generated by the server. */
  token?: string;
  /** [Required] The type of the enrollment token. */
  enrollmentTokenType?: "enrollmentTokenTypeUnspecified" | "userlessDevice" | "userDevice" | (string & {});
  /** [Optional] The length of time the enrollment token is valid, ranging from 1 minute to [`Durations.MAX_VALUE`](https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/util/Durations.html#MAX_VALUE), approximately 10,000 years. If not specified, the default duration is 1 hour. */
  duration?: string;
  /** [Optional] Provides options related to Google authentication during the enrollment. */
  googleAuthenticationOptions?: EnrollmentTokenGoogleAuthenticationOptions;
}

export const EnrollmentToken: Schema.Schema<EnrollmentToken> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  enrollmentTokenType: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  googleAuthenticationOptions: Schema.optional(EnrollmentTokenGoogleAuthenticationOptions),
})).annotate({ identifier: "EnrollmentToken" }) as any as Schema.Schema<EnrollmentToken>;

export interface Administrator {
  /** The admin's email address. */
  email?: string;
}

export const Administrator: Schema.Schema<Administrator> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "Administrator" }) as any as Schema.Schema<Administrator>;

export interface GoogleAuthenticationSettings {
  /** Whether Google authentication is required. */
  googleAuthenticationRequired?: "googleAuthenticationRequiredUnspecified" | "notRequired" | "required" | (string & {});
  /** Whether dedicated devices are allowed. */
  dedicatedDevicesAllowed?: "dedicatedDevicesAllowedUnspecified" | "disallowed" | "allowed" | (string & {});
}

export const GoogleAuthenticationSettings: Schema.Schema<GoogleAuthenticationSettings> = Schema.suspend(() => Schema.Struct({
  googleAuthenticationRequired: Schema.optional(Schema.String),
  dedicatedDevicesAllowed: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAuthenticationSettings" }) as any as Schema.Schema<GoogleAuthenticationSettings>;

export interface Enterprise {
  /** The unique ID for the enterprise. */
  id?: string;
  /** The enterprise's primary domain, such as "example.com". */
  primaryDomain?: string;
  /** The name of the enterprise, for example, "Example, Inc". */
  name?: string;
  /** Admins of the enterprise. This is only supported for enterprises created via the EMM-initiated flow. */
  administrator?: Array<Administrator>;
  /** Output only. Settings for Google-provided user authentication. */
  googleAuthenticationSettings?: GoogleAuthenticationSettings;
  /** The type of the enterprise. */
  enterpriseType?: "enterpriseTypeUnspecified" | "managedGoogleDomain" | "managedGooglePlayAccountsEnterprise" | (string & {});
  /** The type of managed Google domain */
  managedGoogleDomainType?: "managedGoogleDomainTypeUnspecified" | "typeTeam" | "typeDomain" | (string & {});
}

export const Enterprise: Schema.Schema<Enterprise> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  primaryDomain: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  administrator: Schema.optional(Schema.Array(Administrator)),
  googleAuthenticationSettings: Schema.optional(GoogleAuthenticationSettings),
  enterpriseType: Schema.optional(Schema.String),
  managedGoogleDomainType: Schema.optional(Schema.String),
})).annotate({ identifier: "Enterprise" }) as any as Schema.Schema<Enterprise>;

export interface EnterprisesListResponse {
  /** An enterprise. */
  enterprise?: Array<Enterprise>;
}

export const EnterprisesListResponse: Schema.Schema<EnterprisesListResponse> = Schema.suspend(() => Schema.Struct({
  enterprise: Schema.optional(Schema.Array(Enterprise)),
})).annotate({ identifier: "EnterprisesListResponse" }) as any as Schema.Schema<EnterprisesListResponse>;

export interface EnterpriseAccount {
  /** The email address of the service account. */
  accountEmail?: string;
}

export const EnterpriseAccount: Schema.Schema<EnterpriseAccount> = Schema.suspend(() => Schema.Struct({
  accountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseAccount" }) as any as Schema.Schema<EnterpriseAccount>;

export interface EnterprisesSendTestPushNotificationResponse {
  /** The name of the Cloud Pub/Sub topic to which notifications for this enterprise's enrolled account will be sent. */
  topicName?: string;
  /** The message ID of the test push notification that was sent. */
  messageId?: string;
}

export const EnterprisesSendTestPushNotificationResponse: Schema.Schema<EnterprisesSendTestPushNotificationResponse> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
  messageId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterprisesSendTestPushNotificationResponse" }) as any as Schema.Schema<EnterprisesSendTestPushNotificationResponse>;

export interface ProductApprovalEvent {
  /** The id of the product (e.g. "app:com.google.android.gm") for which the approval status has changed. This field will always be present. */
  productId?: string;
  /** Whether the product was approved or unapproved. This field will always be present. */
  approved?: "unknown" | "approved" | "unapproved" | (string & {});
}

export const ProductApprovalEvent: Schema.Schema<ProductApprovalEvent> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  approved: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductApprovalEvent" }) as any as Schema.Schema<ProductApprovalEvent>;

export interface InstallFailureEvent {
  /** The id of the product (e.g. "app:com.google.android.gm") for which the install failure event occured. This field will always be present. */
  productId?: string;
  /** The Android ID of the device. This field will always be present. */
  deviceId?: string;
  /** The ID of the user. This field will always be present. */
  userId?: string;
  /** The reason for the installation failure. This field will always be present. */
  failureReason?: "unknown" | "timeout" | (string & {});
  /** Additional details on the failure if applicable. */
  failureDetails?: string;
}

export const InstallFailureEvent: Schema.Schema<InstallFailureEvent> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  failureReason: Schema.optional(Schema.String),
  failureDetails: Schema.optional(Schema.String),
})).annotate({ identifier: "InstallFailureEvent" }) as any as Schema.Schema<InstallFailureEvent>;

export interface AppUpdateEvent {
  /** The id of the product (e.g. "app:com.google.android.gm") that was updated. This field will always be present. */
  productId?: string;
}

export const AppUpdateEvent: Schema.Schema<AppUpdateEvent> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "AppUpdateEvent" }) as any as Schema.Schema<AppUpdateEvent>;

export interface NewPermissionsEvent {
  /** The id of the product (e.g. "app:com.google.android.gm") for which new permissions were added. This field will always be present. */
  productId?: string;
  /** The set of permissions that the app is currently requesting. Use Permissions.Get on the EMM API to retrieve details about these permissions. */
  requestedPermissions?: Array<string>;
  /** The set of permissions that the enterprise admin has already approved for this application. Use Permissions.Get on the EMM API to retrieve details about these permissions. */
  approvedPermissions?: Array<string>;
}

export const NewPermissionsEvent: Schema.Schema<NewPermissionsEvent> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  requestedPermissions: Schema.optional(Schema.Array(Schema.String)),
  approvedPermissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NewPermissionsEvent" }) as any as Schema.Schema<NewPermissionsEvent>;

export interface AppRestrictionsSchemaChangeEvent {
  /** The id of the product (e.g. "app:com.google.android.gm") for which the app restriction schema changed. This field will always be present. */
  productId?: string;
}

export const AppRestrictionsSchemaChangeEvent: Schema.Schema<AppRestrictionsSchemaChangeEvent> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
})).annotate({ identifier: "AppRestrictionsSchemaChangeEvent" }) as any as Schema.Schema<AppRestrictionsSchemaChangeEvent>;

export interface ProductAvailabilityChangeEvent {
  /** The id of the product (e.g. "app:com.google.android.gm") for which the product availability changed. This field will always be present. */
  productId?: string;
  /** The new state of the product. This field will always be present. */
  availabilityStatus?: "unknown" | "available" | "removed" | "unpublished" | (string & {});
}

export const ProductAvailabilityChangeEvent: Schema.Schema<ProductAvailabilityChangeEvent> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  availabilityStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductAvailabilityChangeEvent" }) as any as Schema.Schema<ProductAvailabilityChangeEvent>;

export interface NewDeviceEvent {
  /** The ID of the user. This field will always be present. */
  userId?: string;
  /** The Android ID of the device. This field will always be present. */
  deviceId?: string;
  /** Identifies the extent to which the device is controlled by an Android EMM in various deployment configurations. Possible values include: - "managedDevice", a device where the DPC is set as device owner, - "managedProfile", a device where the DPC is set as profile owner. */
  managementType?: "managedDevice" | "managedProfile" | (string & {});
  /** Policy app on the device. */
  dpcPackageName?: string;
}

export const NewDeviceEvent: Schema.Schema<NewDeviceEvent> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  managementType: Schema.optional(Schema.String),
  dpcPackageName: Schema.optional(Schema.String),
})).annotate({ identifier: "NewDeviceEvent" }) as any as Schema.Schema<NewDeviceEvent>;

export interface DeviceReportUpdateEvent {
  /** The ID of the user. This field will always be present. */
  userId?: string;
  /** The Android ID of the device. This field will always be present. */
  deviceId?: string;
  /** The device report updated with the latest app states. This field will always be present. */
  report?: DeviceReport;
}

export const DeviceReportUpdateEvent: Schema.Schema<DeviceReportUpdateEvent> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  report: Schema.optional(DeviceReport),
})).annotate({ identifier: "DeviceReportUpdateEvent" }) as any as Schema.Schema<DeviceReportUpdateEvent>;

export interface EnterpriseUpgradeEvent {
  /** The upgrade state. */
  upgradeState?: "upgradeStateUnspecified" | "upgradeStateSucceeded" | (string & {});
}

export const EnterpriseUpgradeEvent: Schema.Schema<EnterpriseUpgradeEvent> = Schema.suspend(() => Schema.Struct({
  upgradeState: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseUpgradeEvent" }) as any as Schema.Schema<EnterpriseUpgradeEvent>;

export interface Notification {
  /** The ID of the enterprise for which the notification is sent. This will always be present. */
  enterpriseId?: string;
  /** The time when the notification was published in milliseconds since 1970-01-01T00:00:00Z. This will always be present. */
  timestampMillis?: string;
  /** Type of the notification. */
  notificationType?: "unknown" | "testNotification" | "productApproval" | "installFailure" | "appUpdate" | "newPermissions" | "appRestricionsSchemaChange" | "productAvailabilityChange" | "newDevice" | "deviceReportUpdate" | "enterpriseUpgrade" | (string & {});
  /** Notifications about changes to a product's approval status. */
  productApprovalEvent?: ProductApprovalEvent;
  /** Notifications about an app installation failure. */
  installFailureEvent?: InstallFailureEvent;
  /** Notifications about app updates. */
  appUpdateEvent?: AppUpdateEvent;
  /** Notifications about new app permissions. */
  newPermissionsEvent?: NewPermissionsEvent;
  /** Notifications about new app restrictions schema changes. */
  appRestrictionsSchemaChangeEvent?: AppRestrictionsSchemaChangeEvent;
  /** Notifications about product availability changes. */
  productAvailabilityChangeEvent?: ProductAvailabilityChangeEvent;
  /** Notifications about new devices. */
  newDeviceEvent?: NewDeviceEvent;
  /** Notifications about device report updates. */
  deviceReportUpdateEvent?: DeviceReportUpdateEvent;
  /** Notifications about enterprise upgrade. */
  enterpriseUpgradeEvent?: EnterpriseUpgradeEvent;
}

export const Notification: Schema.Schema<Notification> = Schema.suspend(() => Schema.Struct({
  enterpriseId: Schema.optional(Schema.String),
  timestampMillis: Schema.optional(Schema.String),
  notificationType: Schema.optional(Schema.String),
  productApprovalEvent: Schema.optional(ProductApprovalEvent),
  installFailureEvent: Schema.optional(InstallFailureEvent),
  appUpdateEvent: Schema.optional(AppUpdateEvent),
  newPermissionsEvent: Schema.optional(NewPermissionsEvent),
  appRestrictionsSchemaChangeEvent: Schema.optional(AppRestrictionsSchemaChangeEvent),
  productAvailabilityChangeEvent: Schema.optional(ProductAvailabilityChangeEvent),
  newDeviceEvent: Schema.optional(NewDeviceEvent),
  deviceReportUpdateEvent: Schema.optional(DeviceReportUpdateEvent),
  enterpriseUpgradeEvent: Schema.optional(EnterpriseUpgradeEvent),
})).annotate({ identifier: "Notification" }) as any as Schema.Schema<Notification>;

export interface NotificationSet {
  /** The notification set ID, required to mark the notification as received with the Enterprises.AcknowledgeNotification API. This will be omitted if no notifications are present. */
  notificationSetId?: string;
  /** The notifications received, or empty if no notifications are present. */
  notification?: Array<Notification>;
}

export const NotificationSet: Schema.Schema<NotificationSet> = Schema.suspend(() => Schema.Struct({
  notificationSetId: Schema.optional(Schema.String),
  notification: Schema.optional(Schema.Array(Notification)),
})).annotate({ identifier: "NotificationSet" }) as any as Schema.Schema<NotificationSet>;

export interface StoreLayout {
  /** The ID of the store page to be used as the homepage. The homepage is the first page shown in the managed Google Play Store. Not specifying a homepage is equivalent to setting the store layout type to "basic". */
  homepageId?: string;
  /** The store layout type. By default, this value is set to "basic" if the homepageId field is not set, and to "custom" otherwise. If set to "basic", the layout will consist of all approved apps that have been whitelisted for the user. */
  storeLayoutType?: "unknown" | "basic" | "custom" | (string & {});
}

export const StoreLayout: Schema.Schema<StoreLayout> = Schema.suspend(() => Schema.Struct({
  homepageId: Schema.optional(Schema.String),
  storeLayoutType: Schema.optional(Schema.String),
})).annotate({ identifier: "StoreLayout" }) as any as Schema.Schema<StoreLayout>;

export interface SignupInfo {
  /** Deprecated. */
  kind?: string;
  /** A URL under which the Admin can sign up for an enterprise. The page pointed to cannot be rendered in an iframe. */
  url?: string;
  /** An opaque token that will be required, along with the Enterprise Token, for obtaining the enterprise resource from CompleteSignup. */
  completionToken?: string;
}

export const SignupInfo: Schema.Schema<SignupInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  completionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SignupInfo" }) as any as Schema.Schema<SignupInfo>;

export interface ServiceAccountKey {
  /** An opaque, unique identifier for this ServiceAccountKey. Assigned by the server. */
  id?: string;
  /** The file format of the generated key data. */
  type?: "googleCredentials" | "pkcs12" | (string & {});
  /** The body of the private key credentials file, in string format. This is only populated when the ServiceAccountKey is created, and is not stored by Google. */
  data?: string;
  /** Public key data for the credentials file. This is an X.509 cert. If you are using the googleCredentials key type, this is identical to the cert that can be retrieved by using the X.509 cert url inside of the credentials file. */
  publicData?: string;
}

export const ServiceAccountKey: Schema.Schema<ServiceAccountKey> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  publicData: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceAccountKey" }) as any as Schema.Schema<ServiceAccountKey>;

export interface ServiceAccount {
  /** The account name of the service account, in the form of an email address. Assigned by the server. */
  name?: string;
  /** Credentials that can be used to authenticate as this ServiceAccount. */
  key?: ServiceAccountKey;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  key: Schema.optional(ServiceAccountKey),
})).annotate({ identifier: "ServiceAccount" }) as any as Schema.Schema<ServiceAccount>;

export interface AdministratorWebTokenSpecPlaySearch {
  /** Whether the managed Play Search apps page is displayed. Default is true. */
  enabled?: boolean;
  /** Allow access to the iframe in approve mode. Default is false. */
  approveApps?: boolean;
}

export const AdministratorWebTokenSpecPlaySearch: Schema.Schema<AdministratorWebTokenSpecPlaySearch> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  approveApps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdministratorWebTokenSpecPlaySearch" }) as any as Schema.Schema<AdministratorWebTokenSpecPlaySearch>;

export interface AdministratorWebTokenSpecPrivateApps {
  /** Whether the Private Apps page is displayed. Default is true. */
  enabled?: boolean;
}

export const AdministratorWebTokenSpecPrivateApps: Schema.Schema<AdministratorWebTokenSpecPrivateApps> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdministratorWebTokenSpecPrivateApps" }) as any as Schema.Schema<AdministratorWebTokenSpecPrivateApps>;

export interface AdministratorWebTokenSpecWebApps {
  /** Whether the Web Apps page is displayed. Default is true. */
  enabled?: boolean;
}

export const AdministratorWebTokenSpecWebApps: Schema.Schema<AdministratorWebTokenSpecWebApps> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdministratorWebTokenSpecWebApps" }) as any as Schema.Schema<AdministratorWebTokenSpecWebApps>;

export interface AdministratorWebTokenSpecStoreBuilder {
  /** Whether the Organize apps page is displayed. Default is true. */
  enabled?: boolean;
}

export const AdministratorWebTokenSpecStoreBuilder: Schema.Schema<AdministratorWebTokenSpecStoreBuilder> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdministratorWebTokenSpecStoreBuilder" }) as any as Schema.Schema<AdministratorWebTokenSpecStoreBuilder>;

export interface AdministratorWebTokenSpecManagedConfigurations {
  /** Whether the Managed Configuration page is displayed. Default is true. */
  enabled?: boolean;
}

export const AdministratorWebTokenSpecManagedConfigurations: Schema.Schema<AdministratorWebTokenSpecManagedConfigurations> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdministratorWebTokenSpecManagedConfigurations" }) as any as Schema.Schema<AdministratorWebTokenSpecManagedConfigurations>;

export interface AdministratorWebTokenSpecZeroTouch {
  /** Whether zero-touch embedded UI is usable with this token. If enabled, the admin can link zero-touch customers to this enterprise. */
  enabled?: boolean;
}

export const AdministratorWebTokenSpecZeroTouch: Schema.Schema<AdministratorWebTokenSpecZeroTouch> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdministratorWebTokenSpecZeroTouch" }) as any as Schema.Schema<AdministratorWebTokenSpecZeroTouch>;

export interface AdministratorWebTokenSpec {
  /** Deprecated. Use PlaySearch.approveApps. */
  permission?: Array<"unknown" | "approveApps" | "manageMcm" | (string & {})>;
  /** The URI of the parent frame hosting the iframe. To prevent XSS, the iframe may not be hosted at other URIs. This URI must be https. Use whitespaces to separate multiple parent URIs. */
  parent?: string;
  /** Options for displaying the managed Play Search apps page. */
  playSearch?: AdministratorWebTokenSpecPlaySearch;
  /** Options for displaying the Private Apps page. */
  privateApps?: AdministratorWebTokenSpecPrivateApps;
  /** Options for displaying the Web Apps page. */
  webApps?: AdministratorWebTokenSpecWebApps;
  /** Options for displaying the Organize apps page. */
  storeBuilder?: AdministratorWebTokenSpecStoreBuilder;
  /** Options for displaying the Managed Configuration page. */
  managedConfigurations?: AdministratorWebTokenSpecManagedConfigurations;
  /** Options for displaying the Zero Touch page. */
  zeroTouch?: AdministratorWebTokenSpecZeroTouch;
}

export const AdministratorWebTokenSpec: Schema.Schema<AdministratorWebTokenSpec> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(Schema.Array(Schema.String)),
  parent: Schema.optional(Schema.String),
  playSearch: Schema.optional(AdministratorWebTokenSpecPlaySearch),
  privateApps: Schema.optional(AdministratorWebTokenSpecPrivateApps),
  webApps: Schema.optional(AdministratorWebTokenSpecWebApps),
  storeBuilder: Schema.optional(AdministratorWebTokenSpecStoreBuilder),
  managedConfigurations: Schema.optional(AdministratorWebTokenSpecManagedConfigurations),
  zeroTouch: Schema.optional(AdministratorWebTokenSpecZeroTouch),
})).annotate({ identifier: "AdministratorWebTokenSpec" }) as any as Schema.Schema<AdministratorWebTokenSpec>;

export interface AdministratorWebToken {
  /** An opaque token to be passed to the Play front-end to generate an iframe. */
  token?: string;
}

export const AdministratorWebToken: Schema.Schema<AdministratorWebToken> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
})).annotate({ identifier: "AdministratorWebToken" }) as any as Schema.Schema<AdministratorWebToken>;

export interface GenerateEnterpriseUpgradeUrlResponse {
  /** A URL for an enterprise admin to upgrade their enterprise. The page can't be rendered in an iframe. */
  url?: string;
}

export const GenerateEnterpriseUpgradeUrlResponse: Schema.Schema<GenerateEnterpriseUpgradeUrlResponse> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateEnterpriseUpgradeUrlResponse" }) as any as Schema.Schema<GenerateEnterpriseUpgradeUrlResponse>;

export interface Entitlement {
  /** The ID of the product that the entitlement is for. For example, "app:com.google.android.gm". */
  productId?: string;
  /** The reason for the entitlement. For example, "free" for free apps. This property is temporary: it will be replaced by the acquisition kind field of group licenses. */
  reason?: "free" | "groupLicense" | "userPurchase" | (string & {});
}

export const Entitlement: Schema.Schema<Entitlement> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "Entitlement" }) as any as Schema.Schema<Entitlement>;

export interface EntitlementsListResponse {
  /** An entitlement of a user to a product (e.g. an app). For example, a free app that they have installed, or a paid app that they have been allocated a license to. */
  entitlement?: Array<Entitlement>;
}

export const EntitlementsListResponse: Schema.Schema<EntitlementsListResponse> = Schema.suspend(() => Schema.Struct({
  entitlement: Schema.optional(Schema.Array(Entitlement)),
})).annotate({ identifier: "EntitlementsListResponse" }) as any as Schema.Schema<EntitlementsListResponse>;

export interface User {
  /** The unique ID for the user. */
  id?: string;
  /** The entity that manages the user. With googleManaged users, the source of truth is Google so EMMs have to make sure a Google Account exists for the user. With emmManaged users, the EMM is in charge. */
  managementType?: "googleManaged" | "emmManaged" | (string & {});
  /** The type of account that this user represents. A userAccount can be installed on multiple devices, but a deviceAccount is specific to a single device. An EMM-managed user (emmManaged) can be either type (userAccount, deviceAccount), but a Google-managed user (googleManaged) is always a userAccount. */
  accountType?: "deviceAccount" | "userAccount" | (string & {});
  /** The user's primary email address, for example, "jsmith@example.com". Will always be set for Google managed users and not set for EMM managed users. */
  primaryEmail?: string;
  /** A unique identifier you create for this user, such as "user342" or "asset#44418". Do not use personally identifiable information (PII) for this property. Must always be set for EMM-managed users. Not set for Google-managed users. */
  accountIdentifier?: string;
  /** The name that will appear in user interfaces. Setting this property is optional when creating EMM-managed users. If you do set this property, use something generic about the organization (such as "Example, Inc.") or your name (as EMM). Not used for Google-managed user accounts. @mutable androidenterprise.users.update */
  displayName?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  managementType: Schema.optional(Schema.String),
  accountType: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
  accountIdentifier: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface GroupLicenseUsersListResponse {
  /** A user of an enterprise. */
  user?: Array<User>;
}

export const GroupLicenseUsersListResponse: Schema.Schema<GroupLicenseUsersListResponse> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(Schema.Array(User)),
})).annotate({ identifier: "GroupLicenseUsersListResponse" }) as any as Schema.Schema<GroupLicenseUsersListResponse>;

export interface GroupLicense {
  /** The ID of the product that the license is for. For example, "app:com.google.android.gm". */
  productId?: string;
  /** The number of purchased licenses (possibly in multiple purchases). If this field is omitted, then there is no limit on the number of licenses that can be provisioned (for example, if the acquisition kind is "free"). */
  numPurchased?: number;
  /** The total number of provisioned licenses for this product. Returned by read operations, but ignored in write operations. */
  numProvisioned?: number;
  /** How this group license was acquired. "bulkPurchase" means that this Grouplicenses resource was created because the enterprise purchased licenses for this product; otherwise, the value is "free" (for free products). */
  acquisitionKind?: "free" | "bulkPurchase" | (string & {});
  /** Whether the product to which this group license relates is currently approved by the enterprise. Products are approved when a group license is first created, but this approval may be revoked by an enterprise admin via Google Play. Unapproved products will not be visible to end users in collections, and new entitlements to them should not normally be created. */
  approval?: "approved" | "unapproved" | (string & {});
  /** The permission approval status of the product. This field is only set if the product is approved. Possible states are: - "currentApproved", the current set of permissions is approved, but additional permissions will require the administrator to reapprove the product (If the product was approved without specifying the approved permissions setting, then this is the default behavior.), - "needsReapproval", the product has unapproved permissions. No additional product licenses can be assigned until the product is reapproved, - "allCurrentAndFutureApproved", the current permissions are approved and any future permission updates will be automatically approved without administrator review. */
  permissions?: "currentApproved" | "needsReapproval" | "allCurrentAndFutureApproved" | (string & {});
}

export const GroupLicense: Schema.Schema<GroupLicense> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  numPurchased: Schema.optional(Schema.Number),
  numProvisioned: Schema.optional(Schema.Number),
  acquisitionKind: Schema.optional(Schema.String),
  approval: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.String),
})).annotate({ identifier: "GroupLicense" }) as any as Schema.Schema<GroupLicense>;

export interface GroupLicensesListResponse {
  /** A group license for a product approved for use in the enterprise. */
  groupLicense?: Array<GroupLicense>;
}

export const GroupLicensesListResponse: Schema.Schema<GroupLicensesListResponse> = Schema.suspend(() => Schema.Struct({
  groupLicense: Schema.optional(Schema.Array(GroupLicense)),
})).annotate({ identifier: "GroupLicensesListResponse" }) as any as Schema.Schema<GroupLicensesListResponse>;

export interface Install {
  /** The ID of the product that the install is for. For example, "app:com.google.android.gm". */
  productId?: string;
  /** The version of the installed product. Guaranteed to be set only if the install state is "installed". */
  versionCode?: number;
  /** Install state. The state "installPending" means that an install request has recently been made and download to the device is in progress. The state "installed" means that the app has been installed. This field is read-only. */
  installState?: "installed" | "installPending" | (string & {});
}

export const Install: Schema.Schema<Install> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.Number),
  installState: Schema.optional(Schema.String),
})).annotate({ identifier: "Install" }) as any as Schema.Schema<Install>;

export interface InstallsListResponse {
  /** An installation of an app for a user on a specific device. The existence of an install implies that the user must have an entitlement to the app. */
  install?: Array<Install>;
}

export const InstallsListResponse: Schema.Schema<InstallsListResponse> = Schema.suspend(() => Schema.Struct({
  install: Schema.optional(Schema.Array(Install)),
})).annotate({ identifier: "InstallsListResponse" }) as any as Schema.Schema<InstallsListResponse>;

export interface ManagedConfigurationsForDeviceListResponse {
  /** A managed configuration for an app on a specific device. */
  managedConfigurationForDevice?: Array<ManagedConfiguration>;
}

export const ManagedConfigurationsForDeviceListResponse: Schema.Schema<ManagedConfigurationsForDeviceListResponse> = Schema.suspend(() => Schema.Struct({
  managedConfigurationForDevice: Schema.optional(Schema.Array(ManagedConfiguration)),
})).annotate({ identifier: "ManagedConfigurationsForDeviceListResponse" }) as any as Schema.Schema<ManagedConfigurationsForDeviceListResponse>;

export interface ManagedConfigurationsForUserListResponse {
  /** A managed configuration for an app for a specific user. */
  managedConfigurationForUser?: Array<ManagedConfiguration>;
}

export const ManagedConfigurationsForUserListResponse: Schema.Schema<ManagedConfigurationsForUserListResponse> = Schema.suspend(() => Schema.Struct({
  managedConfigurationForUser: Schema.optional(Schema.Array(ManagedConfiguration)),
})).annotate({ identifier: "ManagedConfigurationsForUserListResponse" }) as any as Schema.Schema<ManagedConfigurationsForUserListResponse>;

export interface ManagedConfigurationsSettings {
  /** The ID of the managed configurations settings. */
  mcmId?: string;
  /** The name of the managed configurations settings. */
  name?: string;
  /** The last updated time of the managed configuration settings in milliseconds since 1970-01-01T00:00:00Z. */
  lastUpdatedTimestampMillis?: string;
}

export const ManagedConfigurationsSettings: Schema.Schema<ManagedConfigurationsSettings> = Schema.suspend(() => Schema.Struct({
  mcmId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  lastUpdatedTimestampMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedConfigurationsSettings" }) as any as Schema.Schema<ManagedConfigurationsSettings>;

export interface ManagedConfigurationsSettingsListResponse {
  /** A managed configurations settings for an app that may be assigned to a group of users in an enterprise. */
  managedConfigurationsSettings?: Array<ManagedConfigurationsSettings>;
}

export const ManagedConfigurationsSettingsListResponse: Schema.Schema<ManagedConfigurationsSettingsListResponse> = Schema.suspend(() => Schema.Struct({
  managedConfigurationsSettings: Schema.optional(Schema.Array(ManagedConfigurationsSettings)),
})).annotate({ identifier: "ManagedConfigurationsSettingsListResponse" }) as any as Schema.Schema<ManagedConfigurationsSettingsListResponse>;

export interface Permission {
  /** An opaque string uniquely identifying the permission. */
  permissionId?: string;
  /** The name of the permission. */
  name?: string;
  /** A longer description of the Permissions resource, giving more details of what it affects. */
  description?: string;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() => Schema.Struct({
  permissionId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface AppVersion {
  /** The string used in the Play store by the app developer to identify the version. The string is not necessarily unique or localized (for example, the string could be "1.4"). */
  versionString?: string;
  /** Unique increasing identifier for the app version. */
  versionCode?: number;
  /** Deprecated, use trackId instead. */
  track?: "appTrackUnspecified" | "production" | "beta" | "alpha" | (string & {});
  /** The SDK version this app targets, as specified in the manifest of the APK. See http://developer.android.com/guide/topics/manifest/uses-sdk-element.html */
  targetSdkVersion?: number;
  /** Track ids that the app version is published in. Replaces the track field (deprecated), but doesn't include the production track (see isProduction instead). */
  trackId?: Array<string>;
  /** True if this version is a production APK. */
  isProduction?: boolean;
}

export const AppVersion: Schema.Schema<AppVersion> = Schema.suspend(() => Schema.Struct({
  versionString: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.Number),
  track: Schema.optional(Schema.String),
  targetSdkVersion: Schema.optional(Schema.Number),
  trackId: Schema.optional(Schema.Array(Schema.String)),
  isProduction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AppVersion" }) as any as Schema.Schema<AppVersion>;

export interface ProductSigningCertificate {
  /** The base64 urlsafe encoded SHA2-256 hash of the certificate. */
  certificateHashSha256?: string;
  /** The base64 urlsafe encoded SHA1 hash of the certificate. (This field is deprecated in favor of SHA2-256. It should not be used and may be removed at any time.) */
  certificateHashSha1?: string;
}

export const ProductSigningCertificate: Schema.Schema<ProductSigningCertificate> = Schema.suspend(() => Schema.Struct({
  certificateHashSha256: Schema.optional(Schema.String),
  certificateHashSha1: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductSigningCertificate" }) as any as Schema.Schema<ProductSigningCertificate>;

export interface TrackInfo {
  /** Unmodifiable, unique track identifier. This identifier is the releaseTrackId in the url of the play developer console page that displays the track information. */
  trackId?: string;
  /** A modifiable name for a track. This is the visible name in the play developer console. */
  trackAlias?: string;
}

export const TrackInfo: Schema.Schema<TrackInfo> = Schema.suspend(() => Schema.Struct({
  trackId: Schema.optional(Schema.String),
  trackAlias: Schema.optional(Schema.String),
})).annotate({ identifier: "TrackInfo" }) as any as Schema.Schema<TrackInfo>;

export interface ProductPermission {
  /** An opaque string uniquely identifying the permission. */
  permissionId?: string;
  /** Whether the permission has been accepted or not. */
  state?: "required" | "accepted" | (string & {});
}

export const ProductPermission: Schema.Schema<ProductPermission> = Schema.suspend(() => Schema.Struct({
  permissionId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductPermission" }) as any as Schema.Schema<ProductPermission>;

export interface AppRestrictionsSchemaRestrictionRestrictionValue {
  /** The type of the value being provided. */
  type?: "bool" | "string" | "integer" | "choice" | "multiselect" | "hidden" | "bundle" | "bundleArray" | (string & {});
  /** The boolean value - this will only be present if type is bool. */
  valueBool?: boolean;
  /** The string value - this will be present for types string, choice and hidden. */
  valueString?: string;
  /** The integer value - this will only be present if type is integer. */
  valueInteger?: number;
  /** The list of string values - this will only be present if type is multiselect. */
  valueMultiselect?: Array<string>;
}

export const AppRestrictionsSchemaRestrictionRestrictionValue: Schema.Schema<AppRestrictionsSchemaRestrictionRestrictionValue> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  valueBool: Schema.optional(Schema.Boolean),
  valueString: Schema.optional(Schema.String),
  valueInteger: Schema.optional(Schema.Number),
  valueMultiselect: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AppRestrictionsSchemaRestrictionRestrictionValue" }) as any as Schema.Schema<AppRestrictionsSchemaRestrictionRestrictionValue>;

export interface AppRestrictionsSchemaRestriction {
  /** The unique key that the product uses to identify the restriction, e.g. "com.google.android.gm.fieldname". */
  key?: string;
  /** The name of the restriction. */
  title?: string;
  /** The type of the restriction. */
  restrictionType?: "bool" | "string" | "integer" | "choice" | "multiselect" | "hidden" | "bundle" | "bundleArray" | (string & {});
  /** A longer description of the restriction, giving more detail of what it affects. */
  description?: string;
  /** For choice or multiselect restrictions, the list of possible entries' human-readable names. */
  entry?: Array<string>;
  /** For choice or multiselect restrictions, the list of possible entries' machine-readable values. These values should be used in the configuration, either as a single string value for a choice restriction or in a stringArray for a multiselect restriction. */
  entryValue?: Array<string>;
  /** The default value of the restriction. bundle and bundleArray restrictions never have a default value. */
  defaultValue?: AppRestrictionsSchemaRestrictionRestrictionValue;
  /** For bundle or bundleArray restrictions, the list of nested restrictions. A bundle restriction is always nested within a bundleArray restriction, and a bundleArray restriction is at most two levels deep. */
  nestedRestriction?: Array<AppRestrictionsSchemaRestriction>;
}

export const AppRestrictionsSchemaRestriction: Schema.Schema<AppRestrictionsSchemaRestriction> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  restrictionType: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entry: Schema.optional(Schema.Array(Schema.String)),
  entryValue: Schema.optional(Schema.Array(Schema.String)),
  defaultValue: Schema.optional(AppRestrictionsSchemaRestrictionRestrictionValue),
  nestedRestriction: Schema.optional(Schema.Array(AppRestrictionsSchemaRestriction)),
})).annotate({ identifier: "AppRestrictionsSchemaRestriction" }) as any as Schema.Schema<AppRestrictionsSchemaRestriction>;

export interface AppRestrictionsSchema {
  /** Deprecated. */
  kind?: string;
  /** The set of restrictions that make up this schema. */
  restrictions?: Array<AppRestrictionsSchemaRestriction>;
}

export const AppRestrictionsSchema: Schema.Schema<AppRestrictionsSchema> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  restrictions: Schema.optional(Schema.Array(AppRestrictionsSchemaRestriction)),
})).annotate({ identifier: "AppRestrictionsSchema" }) as any as Schema.Schema<AppRestrictionsSchema>;

export interface Product {
  /** A string of the form *app:<package name>*. For example, app:com.google.android.gm represents the Gmail app. */
  productId?: string;
  /** The name of the product. */
  title?: string;
  /** The name of the author of the product (for example, the app developer). */
  authorName?: string;
  /** A link to an image that can be used as an icon for the product. This image is suitable for use at up to 512px x 512px. */
  iconUrl?: string;
  /** A link to a smaller image that can be used as an icon for the product. This image is suitable for use at up to 128px x 128px. */
  smallIconUrl?: string;
  /** A link to the (consumer) Google Play details page for the product. */
  detailsUrl?: string;
  /** A link to the managed Google Play details page for the product, for use by an Enterprise admin. */
  workDetailsUrl?: string;
  /** Deprecated. */
  requiresContainerApp?: boolean;
  /** App versions currently available for this product. */
  appVersion?: Array<AppVersion>;
  /** How and to whom the package is made available. The value publicGoogleHosted means that the package is available through the Play store and not restricted to a specific enterprise. The value privateGoogleHosted means that the package is a private app (restricted to an enterprise) but hosted by Google. The value privateSelfHosted means that the package is a private app (restricted to an enterprise) and is privately hosted. */
  distributionChannel?: "publicGoogleHosted" | "privateGoogleHosted" | "privateSelfHosted" | (string & {});
  /** Whether this product is free, free with in-app purchases, or paid. If the pricing is unknown, this means the product is not generally available anymore (even though it might still be available to people who own it). */
  productPricing?: "unknown" | "free" | "freeWithInAppPurchase" | "paid" | (string & {});
  /** The certificate used to sign this product. */
  signingCertificate?: ProductSigningCertificate;
  /** Deprecated, use appTracks instead. */
  availableTracks?: Array<"appTrackUnspecified" | "production" | "beta" | "alpha" | (string & {})>;
  /** The tracks visible to the enterprise. */
  appTracks?: Array<TrackInfo>;
  /** The localized promotional description, if available. */
  description?: string;
  /** The localized full app store description, if available. */
  fullDescription?: string;
  /** A list of screenshot links representing the app. */
  screenshotUrls?: Array<string>;
  /** The app category (e.g. RACING, SOCIAL, etc.) */
  category?: string;
  /** A description of the recent changes made to the app. */
  recentChanges?: string;
  /** The minimum Android SDK necessary to run the app. */
  minAndroidSdkVersion?: number;
  /** The content rating for this app. */
  contentRating?: "ratingUnknown" | "all" | "preTeen" | "teen" | "mature" | (string & {});
  /** The approximate time (within 7 days) the app was last published, expressed in milliseconds since epoch. */
  lastUpdatedTimestampMillis?: string;
  /** A list of permissions required by the app. */
  permissions?: Array<ProductPermission>;
  /** The countries which this app is available in. */
  availableCountries?: Array<string>;
  /** Noteworthy features (if any) of this product. */
  features?: Array<"featureUnknown" | "vpnApp" | (string & {})>;
  /** The app restriction schema */
  appRestrictionsSchema?: AppRestrictionsSchema;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  authorName: Schema.optional(Schema.String),
  iconUrl: Schema.optional(Schema.String),
  smallIconUrl: Schema.optional(Schema.String),
  detailsUrl: Schema.optional(Schema.String),
  workDetailsUrl: Schema.optional(Schema.String),
  requiresContainerApp: Schema.optional(Schema.Boolean),
  appVersion: Schema.optional(Schema.Array(AppVersion)),
  distributionChannel: Schema.optional(Schema.String),
  productPricing: Schema.optional(Schema.String),
  signingCertificate: Schema.optional(ProductSigningCertificate),
  availableTracks: Schema.optional(Schema.Array(Schema.String)),
  appTracks: Schema.optional(Schema.Array(TrackInfo)),
  description: Schema.optional(Schema.String),
  fullDescription: Schema.optional(Schema.String),
  screenshotUrls: Schema.optional(Schema.Array(Schema.String)),
  category: Schema.optional(Schema.String),
  recentChanges: Schema.optional(Schema.String),
  minAndroidSdkVersion: Schema.optional(Schema.Number),
  contentRating: Schema.optional(Schema.String),
  lastUpdatedTimestampMillis: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(ProductPermission)),
  availableCountries: Schema.optional(Schema.Array(Schema.String)),
  features: Schema.optional(Schema.Array(Schema.String)),
  appRestrictionsSchema: Schema.optional(AppRestrictionsSchema),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

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

export interface ProductsListResponse {
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** Pagination information for token pagination. */
  tokenPagination?: TokenPagination;
  /** Information about a product (e.g. an app) in the Google Play store, for display to an enterprise admin. */
  product?: Array<Product>;
}

export const ProductsListResponse: Schema.Schema<ProductsListResponse> = Schema.suspend(() => Schema.Struct({
  pageInfo: Schema.optional(PageInfo),
  tokenPagination: Schema.optional(TokenPagination),
  product: Schema.optional(Schema.Array(Product)),
})).annotate({ identifier: "ProductsListResponse" }) as any as Schema.Schema<ProductsListResponse>;

export interface ProductPermissions {
  /** The ID of the app that the permissions relate to, e.g. "app:com.google.android.gm". */
  productId?: string;
  /** The permissions required by the app. */
  permission?: Array<ProductPermission>;
}

export const ProductPermissions: Schema.Schema<ProductPermissions> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.Array(ProductPermission)),
})).annotate({ identifier: "ProductPermissions" }) as any as Schema.Schema<ProductPermissions>;

export interface ProductsGenerateApprovalUrlResponse {
  /** A URL that can be rendered in an iframe to display the permissions (if any) of a product. This URL can be used to approve the product only once and only within 24 hours of being generated, using the Products.approve call. If the product is currently unapproved and has no permissions, this URL will point to an empty page. If the product is currently approved, a URL will only be generated if that product has added permissions since it was last approved, and the URL will only display those new permissions that have not yet been accepted. */
  url?: string;
}

export const ProductsGenerateApprovalUrlResponse: Schema.Schema<ProductsGenerateApprovalUrlResponse> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductsGenerateApprovalUrlResponse" }) as any as Schema.Schema<ProductsGenerateApprovalUrlResponse>;

export interface ApprovalUrlInfo {
  /** A URL that displays a product's permissions and that can also be used to approve the product with the Products.approve call. */
  approvalUrl?: string;
}

export const ApprovalUrlInfo: Schema.Schema<ApprovalUrlInfo> = Schema.suspend(() => Schema.Struct({
  approvalUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ApprovalUrlInfo" }) as any as Schema.Schema<ApprovalUrlInfo>;

export interface ProductsApproveRequest {
  /** The approval URL that was shown to the user. Only the permissions shown to the user with that URL will be accepted, which may not be the product's entire set of permissions. For example, the URL may only display new permissions from an update after the product was approved, or not include new permissions if the product was updated since the URL was generated. */
  approvalUrlInfo?: ApprovalUrlInfo;
  /** Sets how new permission requests for the product are handled. "allPermissions" automatically approves all current and future permissions for the product. "currentPermissionsOnly" approves the current set of permissions for the product, but any future permissions added through updates will require manual reapproval. If not specified, only the current set of permissions will be approved. */
  approvedPermissions?: "currentPermissionsOnly" | "allPermissions" | (string & {});
}

export const ProductsApproveRequest: Schema.Schema<ProductsApproveRequest> = Schema.suspend(() => Schema.Struct({
  approvalUrlInfo: Schema.optional(ApprovalUrlInfo),
  approvedPermissions: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductsApproveRequest" }) as any as Schema.Schema<ProductsApproveRequest>;

export interface ServiceAccountKeysListResponse {
  /** The service account credentials. */
  serviceAccountKey?: Array<ServiceAccountKey>;
}

export const ServiceAccountKeysListResponse: Schema.Schema<ServiceAccountKeysListResponse> = Schema.suspend(() => Schema.Struct({
  serviceAccountKey: Schema.optional(Schema.Array(ServiceAccountKey)),
})).annotate({ identifier: "ServiceAccountKeysListResponse" }) as any as Schema.Schema<ServiceAccountKeysListResponse>;

export interface LocalizedText {
  /** The BCP47 tag for a locale. (e.g. "en-US", "de"). */
  locale?: string;
  /** The text localized in the associated locale. */
  text?: string;
}

export const LocalizedText: Schema.Schema<LocalizedText> = Schema.suspend(() => Schema.Struct({
  locale: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalizedText" }) as any as Schema.Schema<LocalizedText>;

export interface StoreCluster {
  /** Unique ID of this cluster. Assigned by the server. Immutable once assigned. */
  id?: string;
  /** Ordered list of localized strings giving the name of this page. The text displayed is the one that best matches the user locale, or the first entry if there is no good match. There needs to be at least one entry. */
  name?: Array<LocalizedText>;
  /** List of products in the order they are displayed in the cluster. There should not be duplicates within a cluster. */
  productId?: Array<string>;
  /** String (US-ASCII only) used to determine order of this cluster within the parent page's elements. Page elements are sorted in lexicographic order of this field. Duplicated values are allowed, but ordering between elements with duplicate order is undefined. The value of this field is never visible to a user, it is used solely for the purpose of defining an ordering. Maximum length is 256 characters. */
  orderInPage?: string;
}

export const StoreCluster: Schema.Schema<StoreCluster> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.Array(LocalizedText)),
  productId: Schema.optional(Schema.Array(Schema.String)),
  orderInPage: Schema.optional(Schema.String),
})).annotate({ identifier: "StoreCluster" }) as any as Schema.Schema<StoreCluster>;

export interface StoreLayoutClustersListResponse {
  /** A store cluster of an enterprise. */
  cluster?: Array<StoreCluster>;
}

export const StoreLayoutClustersListResponse: Schema.Schema<StoreLayoutClustersListResponse> = Schema.suspend(() => Schema.Struct({
  cluster: Schema.optional(Schema.Array(StoreCluster)),
})).annotate({ identifier: "StoreLayoutClustersListResponse" }) as any as Schema.Schema<StoreLayoutClustersListResponse>;

export interface StorePage {
  /** Unique ID of this page. Assigned by the server. Immutable once assigned. */
  id?: string;
  /** Ordered list of localized strings giving the name of this page. The text displayed is the one that best matches the user locale, or the first entry if there is no good match. There needs to be at least one entry. */
  name?: Array<LocalizedText>;
  /** Ordered list of pages a user should be able to reach from this page. The list can't include this page. It is recommended that the basic pages are created first, before adding the links between pages. The API doesn't verify that the pages exist or the pages are reachable. */
  link?: Array<string>;
}

export const StorePage: Schema.Schema<StorePage> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.Array(LocalizedText)),
  link: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StorePage" }) as any as Schema.Schema<StorePage>;

export interface StoreLayoutPagesListResponse {
  /** A store page of an enterprise. */
  page?: Array<StorePage>;
}

export const StoreLayoutPagesListResponse: Schema.Schema<StoreLayoutPagesListResponse> = Schema.suspend(() => Schema.Struct({
  page: Schema.optional(Schema.Array(StorePage)),
})).annotate({ identifier: "StoreLayoutPagesListResponse" }) as any as Schema.Schema<StoreLayoutPagesListResponse>;

export interface UsersListResponse {
  /** A user of an enterprise. */
  user?: Array<User>;
}

export const UsersListResponse: Schema.Schema<UsersListResponse> = Schema.suspend(() => Schema.Struct({
  user: Schema.optional(Schema.Array(User)),
})).annotate({ identifier: "UsersListResponse" }) as any as Schema.Schema<UsersListResponse>;

export interface AuthenticationToken {
  /** The authentication token to be passed to the device policy client on the device where it can be used to provision the account for which this token was generated. */
  token?: string;
}

export const AuthenticationToken: Schema.Schema<AuthenticationToken> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthenticationToken" }) as any as Schema.Schema<AuthenticationToken>;

export interface ProductVisibility {
  /** The product ID to make visible to the user. Required for each item in the productVisibility list. */
  productId?: string;
  /** Deprecated. Use trackIds instead. */
  tracks?: Array<"appTrackUnspecified" | "production" | "beta" | "alpha" | (string & {})>;
  /** Grants the user visibility to the specified product track(s), identified by trackIds. */
  trackIds?: Array<string>;
}

export const ProductVisibility: Schema.Schema<ProductVisibility> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.String),
  tracks: Schema.optional(Schema.Array(Schema.String)),
  trackIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProductVisibility" }) as any as Schema.Schema<ProductVisibility>;

export interface ProductSet {
  /** The list of product IDs making up the set of products. */
  productId?: Array<string>;
  /** The interpretation of this product set. "unknown" should never be sent and is ignored if received. "whitelist" means that the user is entitled to access the product set. "includeAll" means that all products are accessible, including products that are approved, products with revoked approval, and products that have never been approved. "allApproved" means that the user is entitled to access all products that are approved for the enterprise. If the value is "allApproved" or "includeAll", the productId field is ignored. If no value is provided, it is interpreted as "whitelist" for backwards compatibility. Further "allApproved" or "includeAll" does not enable automatic visibility of "alpha" or "beta" tracks for Android app. Use ProductVisibility to enable "alpha" or "beta" tracks per user. */
  productSetBehavior?: "unknown" | "whitelist" | "includeAll" | "allApproved" | (string & {});
  /** Additional list of product IDs making up the product set. Unlike the productID array, in this list It's possible to specify which tracks (alpha, beta, production) of a product are visible to the user. See ProductVisibility and its fields for more information. Specifying the same product ID both here and in the productId array is not allowed and it will result in an error. */
  productVisibility?: Array<ProductVisibility>;
}

export const ProductSet: Schema.Schema<ProductSet> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.Array(Schema.String)),
  productSetBehavior: Schema.optional(Schema.String),
  productVisibility: Schema.optional(Schema.Array(ProductVisibility)),
})).annotate({ identifier: "ProductSet" }) as any as Schema.Schema<ProductSet>;

export interface WebAppIcon {
  /** The actual bytes of the image in a base64url encoded string (c.f. RFC4648, section 5 "Base 64 Encoding with URL and Filename Safe Alphabet"). - The image type can be png or jpg. - The image should ideally be square. - The image should ideally have a size of 512x512. */
  imageData?: string;
}

export const WebAppIcon: Schema.Schema<WebAppIcon> = Schema.suspend(() => Schema.Struct({
  imageData: Schema.optional(Schema.String),
})).annotate({ identifier: "WebAppIcon" }) as any as Schema.Schema<WebAppIcon>;

export interface WebApp {
  /** The ID of the application. A string of the form "app:<package name>" where the package name always starts with the prefix "com.google.enterprise.webapp." followed by a random id. */
  webAppId?: string;
  /** The title of the web app as displayed to the user (e.g., amongst a list of other applications, or as a label for an icon). */
  title?: string;
  /** The start URL, i.e. the URL that should load when the user opens the application. */
  startUrl?: string;
  /** A list of icons representing this website. If absent, a default icon (for create) or the current icon (for update) will be used. */
  icons?: Array<WebAppIcon>;
  /** The display mode of the web app. Possible values include: - "minimalUi", the device's status bar, navigation bar, the app's URL, and a refresh button are visible when the app is open. For HTTP URLs, you can only select this option. - "standalone", the device's status bar and navigation bar are visible when the app is open. - "fullScreen", the app opens in full screen mode, hiding the device's status and navigation bars. All browser UI elements, page URL, system status bar and back button are not visible, and the web app takes up the entirety of the available display area. */
  displayMode?: "displayModeUnspecified" | "minimalUi" | "standalone" | "fullScreen" | (string & {});
  /** The current version of the app. Note that the version can automatically increase during the lifetime of the web app, while Google does internal housekeeping to keep the web app up-to-date. */
  versionCode?: string;
  /** A flag whether the app has been published to the Play store yet. */
  isPublished?: boolean;
}

export const WebApp: Schema.Schema<WebApp> = Schema.suspend(() => Schema.Struct({
  webAppId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  startUrl: Schema.optional(Schema.String),
  icons: Schema.optional(Schema.Array(WebAppIcon)),
  displayMode: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.String),
  isPublished: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WebApp" }) as any as Schema.Schema<WebApp>;

export interface WebAppsListResponse {
  /** The manifest describing a web app. */
  webApp?: Array<WebApp>;
}

export const WebAppsListResponse: Schema.Schema<WebAppsListResponse> = Schema.suspend(() => Schema.Struct({
  webApp: Schema.optional(Schema.Array(WebApp)),
})).annotate({ identifier: "WebAppsListResponse" }) as any as Schema.Schema<WebAppsListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves the IDs of all of a user's devices. */
export interface ListDevicesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const ListDevicesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListDevicesRequest>;

export type ListDevicesResponse = DevicesListResponse;
export const ListDevicesResponse = DevicesListResponse;

export type ListDevicesError = CommonErrors;

export const listDevices: API.OperationMethod<ListDevicesRequest, ListDevicesResponse, ListDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListDevicesRequest,
  output: ListDevicesResponse,
  errors: [],
}));

/** Retrieves the details of a device. */
export interface GetDevicesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the device. */
  deviceId: string;
}

export const GetDevicesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}" }),
  svc,
) as unknown as Schema.Schema<GetDevicesRequest>;

export type GetDevicesResponse = Device;
export const GetDevicesResponse = Device;

export type GetDevicesError = CommonErrors;

export const getDevices: API.OperationMethod<GetDevicesRequest, GetDevicesResponse, GetDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDevicesRequest,
  output: GetDevicesResponse,
  errors: [],
}));

/** Updates the device policy. To ensure the policy is properly enforced, you need to prevent unmanaged accounts from accessing Google Play by setting the allowed_accounts in the managed configuration for the Google Play package. See restrict accounts in Google Play. When provisioning a new device, you should set the device policy using this method before adding the managed Google Play Account to the device, otherwise the policy will not be applied for a short period of time after adding the account to the device. */
export interface UpdateDevicesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the device. */
  deviceId: string;
  /** Mask that identifies which fields to update. If not set, all modifiable fields will be modified. When set in a query parameter, this field should be specified as updateMask=<field1>,<field2>,... */
  updateMask?: string;
  /** Request body */
  body?: Device;
}

export const UpdateDevicesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Device).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDevicesRequest>;

export type UpdateDevicesResponse = Device;
export const UpdateDevicesResponse = Device;

export type UpdateDevicesError = CommonErrors;

export const updateDevices: API.OperationMethod<UpdateDevicesRequest, UpdateDevicesResponse, UpdateDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDevicesRequest,
  output: UpdateDevicesResponse,
  errors: [],
}));

/** Retrieves whether a device's access to Google services is enabled or disabled. The device state takes effect only if enforcing EMM policies on Android devices is enabled in the Google Admin Console. Otherwise, the device state is ignored and all devices are allowed access to Google services. This is only supported for Google-managed users. */
export interface GetStateDevicesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the device. */
  deviceId: string;
}

export const GetStateDevicesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/state" }),
  svc,
) as unknown as Schema.Schema<GetStateDevicesRequest>;

export type GetStateDevicesResponse = DeviceState;
export const GetStateDevicesResponse = DeviceState;

export type GetStateDevicesError = CommonErrors;

export const getStateDevices: API.OperationMethod<GetStateDevicesRequest, GetStateDevicesResponse, GetStateDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStateDevicesRequest,
  output: GetStateDevicesResponse,
  errors: [],
}));

/** Sets whether a device's access to Google services is enabled or disabled. The device state takes effect only if enforcing EMM policies on Android devices is enabled in the Google Admin Console. Otherwise, the device state is ignored and all devices are allowed access to Google services. This is only supported for Google-managed users. */
export interface SetStateDevicesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the device. */
  deviceId: string;
  /** Request body */
  body?: DeviceState;
}

export const SetStateDevicesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  body: Schema.optional(DeviceState).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/state", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetStateDevicesRequest>;

export type SetStateDevicesResponse = DeviceState;
export const SetStateDevicesResponse = DeviceState;

export type SetStateDevicesError = CommonErrors;

export const setStateDevices: API.OperationMethod<SetStateDevicesRequest, SetStateDevicesResponse, SetStateDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetStateDevicesRequest,
  output: SetStateDevicesResponse,
  errors: [],
}));

/** Uploads a report containing any changes in app states on the device since the last report was generated. You can call this method up to 3 times every 24 hours for a given device. If you exceed the quota, then the Google Play EMM API returns HTTP 429 Too Many Requests. */
export interface ForceReportUploadDevicesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the device. */
  deviceId: string;
}

export const ForceReportUploadDevicesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/forceReportUpload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ForceReportUploadDevicesRequest>;

export interface ForceReportUploadDevicesResponse {}
export const ForceReportUploadDevicesResponse: Schema.Schema<ForceReportUploadDevicesResponse> = Schema.Struct({}) as any as Schema.Schema<ForceReportUploadDevicesResponse>;

export type ForceReportUploadDevicesError = CommonErrors;

export const forceReportUploadDevices: API.OperationMethod<ForceReportUploadDevicesRequest, ForceReportUploadDevicesResponse, ForceReportUploadDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ForceReportUploadDevicesRequest,
  output: ForceReportUploadDevicesResponse,
  errors: [],
}));

/** Returns a token for device enrollment. The DPC can encode this token within the QR/NFC/zero-touch enrollment payload or fetch it before calling the on-device API to authenticate the user. The token can be generated for each device or reused across multiple devices. */
export interface CreateEnrollmentTokensRequest {
  /** Required. The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: EnrollmentToken;
}

export const CreateEnrollmentTokensRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(EnrollmentToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/enrollmentTokens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEnrollmentTokensRequest>;

export type CreateEnrollmentTokensResponse = EnrollmentToken;
export const CreateEnrollmentTokensResponse = EnrollmentToken;

export type CreateEnrollmentTokensError = CommonErrors;

export const createEnrollmentTokens: API.OperationMethod<CreateEnrollmentTokensRequest, CreateEnrollmentTokensResponse, CreateEnrollmentTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEnrollmentTokensRequest,
  output: CreateEnrollmentTokensResponse,
  errors: [],
}));

/** Looks up an enterprise by domain name. This is only supported for enterprises created via the Google-initiated creation flow. Lookup of the id is not needed for enterprises created via the EMM-initiated flow since the EMM learns the enterprise ID in the callback specified in the Enterprises.generateSignupUrl call. */
export interface ListEnterprisesRequest {
  /** Required. The exact primary domain name of the enterprise to look up. */
  domain: string;
}

export const ListEnterprisesRequest = Schema.Struct({
  domain: Schema.String.pipe(T.HttpQuery("domain")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesRequest>;

export type ListEnterprisesResponse = EnterprisesListResponse;
export const ListEnterprisesResponse = EnterprisesListResponse;

export type ListEnterprisesError = CommonErrors;

export const listEnterprises: API.OperationMethod<ListEnterprisesRequest, ListEnterprisesResponse, ListEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEnterprisesRequest,
  output: ListEnterprisesResponse,
  errors: [],
}));

/** Retrieves the name and domain of an enterprise. */
export interface GetEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const GetEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesRequest>;

export type GetEnterprisesResponse = Enterprise;
export const GetEnterprisesResponse = Enterprise;

export type GetEnterprisesError = CommonErrors;

export const getEnterprises: API.OperationMethod<GetEnterprisesRequest, GetEnterprisesResponse, GetEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesRequest,
  output: GetEnterprisesResponse,
  errors: [],
}));

/** Enrolls an enterprise with the calling EMM. */
export interface EnrollEnterprisesRequest {
  /** Required. The token provided by the enterprise to register the EMM. */
  token: string;
  /** Request body */
  body?: Enterprise;
}

export const EnrollEnterprisesRequest = Schema.Struct({
  token: Schema.String.pipe(T.HttpQuery("token")),
  body: Schema.optional(Enterprise).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/enroll", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnrollEnterprisesRequest>;

export type EnrollEnterprisesResponse = Enterprise;
export const EnrollEnterprisesResponse = Enterprise;

export type EnrollEnterprisesError = CommonErrors;

export const enrollEnterprises: API.OperationMethod<EnrollEnterprisesRequest, EnrollEnterprisesResponse, EnrollEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnrollEnterprisesRequest,
  output: EnrollEnterprisesResponse,
  errors: [],
}));

/** Sets the account that will be used to authenticate to the API as the enterprise. */
export interface SetAccountEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: EnterpriseAccount;
}

export const SetAccountEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(EnterpriseAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/account", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAccountEnterprisesRequest>;

export type SetAccountEnterprisesResponse = EnterpriseAccount;
export const SetAccountEnterprisesResponse = EnterpriseAccount;

export type SetAccountEnterprisesError = CommonErrors;

export const setAccountEnterprises: API.OperationMethod<SetAccountEnterprisesRequest, SetAccountEnterprisesResponse, SetAccountEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAccountEnterprisesRequest,
  output: SetAccountEnterprisesResponse,
  errors: [],
}));

/** Sends a test notification to validate the EMM integration with the Google Cloud Pub/Sub service for this enterprise. */
export interface SendTestPushNotificationEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const SendTestPushNotificationEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/sendTestPushNotification", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendTestPushNotificationEnterprisesRequest>;

export type SendTestPushNotificationEnterprisesResponse = EnterprisesSendTestPushNotificationResponse;
export const SendTestPushNotificationEnterprisesResponse = EnterprisesSendTestPushNotificationResponse;

export type SendTestPushNotificationEnterprisesError = CommonErrors;

export const sendTestPushNotificationEnterprises: API.OperationMethod<SendTestPushNotificationEnterprisesRequest, SendTestPushNotificationEnterprisesResponse, SendTestPushNotificationEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendTestPushNotificationEnterprisesRequest,
  output: SendTestPushNotificationEnterprisesResponse,
  errors: [],
}));

/** Pulls and returns a notification set for the enterprises associated with the service account authenticated for the request. The notification set may be empty if no notification are pending. A notification set returned needs to be acknowledged within 20 seconds by calling Enterprises.AcknowledgeNotificationSet, unless the notification set is empty. Notifications that are not acknowledged within the 20 seconds will eventually be included again in the response to another PullNotificationSet request, and those that are never acknowledged will ultimately be deleted according to the Google Cloud Platform Pub/Sub system policy. Multiple requests might be performed concurrently to retrieve notifications, in which case the pending notifications (if any) will be split among each caller, if any are pending. If no notifications are present, an empty notification list is returned. Subsequent requests may return more notifications once they become available. */
export interface PullNotificationSetEnterprisesRequest {
  /** The request mode for pulling notifications. Specifying waitForNotifications will cause the request to block and wait until one or more notifications are present, or return an empty notification list if no notifications are present after some time. Specifying returnImmediately will cause the request to immediately return the pending notifications, or an empty list if no notifications are present. If omitted, defaults to waitForNotifications. */
  requestMode?: "waitForNotifications" | "returnImmediately" | (string & {});
}

export const PullNotificationSetEnterprisesRequest = Schema.Struct({
  requestMode: Schema.optional(Schema.String).pipe(T.HttpQuery("requestMode")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/pullNotificationSet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PullNotificationSetEnterprisesRequest>;

export type PullNotificationSetEnterprisesResponse = NotificationSet;
export const PullNotificationSetEnterprisesResponse = NotificationSet;

export type PullNotificationSetEnterprisesError = CommonErrors;

export const pullNotificationSetEnterprises: API.OperationMethod<PullNotificationSetEnterprisesRequest, PullNotificationSetEnterprisesResponse, PullNotificationSetEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PullNotificationSetEnterprisesRequest,
  output: PullNotificationSetEnterprisesResponse,
  errors: [],
}));

/** Acknowledges notifications that were received from Enterprises.PullNotificationSet to prevent subsequent calls from returning the same notifications. */
export interface AcknowledgeNotificationSetEnterprisesRequest {
  /** The notification set ID as returned by Enterprises.PullNotificationSet. This must be provided. */
  notificationSetId?: string;
}

export const AcknowledgeNotificationSetEnterprisesRequest = Schema.Struct({
  notificationSetId: Schema.optional(Schema.String).pipe(T.HttpQuery("notificationSetId")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/acknowledgeNotificationSet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcknowledgeNotificationSetEnterprisesRequest>;

export interface AcknowledgeNotificationSetEnterprisesResponse {}
export const AcknowledgeNotificationSetEnterprisesResponse: Schema.Schema<AcknowledgeNotificationSetEnterprisesResponse> = Schema.Struct({}) as any as Schema.Schema<AcknowledgeNotificationSetEnterprisesResponse>;

export type AcknowledgeNotificationSetEnterprisesError = CommonErrors;

export const acknowledgeNotificationSetEnterprises: API.OperationMethod<AcknowledgeNotificationSetEnterprisesRequest, AcknowledgeNotificationSetEnterprisesResponse, AcknowledgeNotificationSetEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcknowledgeNotificationSetEnterprisesRequest,
  output: AcknowledgeNotificationSetEnterprisesResponse,
  errors: [],
}));

/** Unenrolls an enterprise from the calling EMM. */
export interface UnenrollEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const UnenrollEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/unenroll", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnenrollEnterprisesRequest>;

export interface UnenrollEnterprisesResponse {}
export const UnenrollEnterprisesResponse: Schema.Schema<UnenrollEnterprisesResponse> = Schema.Struct({}) as any as Schema.Schema<UnenrollEnterprisesResponse>;

export type UnenrollEnterprisesError = CommonErrors;

export const unenrollEnterprises: API.OperationMethod<UnenrollEnterprisesRequest, UnenrollEnterprisesResponse, UnenrollEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnenrollEnterprisesRequest,
  output: UnenrollEnterprisesResponse,
  errors: [],
}));

/** Returns the store layout for the enterprise. If the store layout has not been set, returns "basic" as the store layout type and no homepage. */
export interface GetStoreLayoutEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const GetStoreLayoutEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout" }),
  svc,
) as unknown as Schema.Schema<GetStoreLayoutEnterprisesRequest>;

export type GetStoreLayoutEnterprisesResponse = StoreLayout;
export const GetStoreLayoutEnterprisesResponse = StoreLayout;

export type GetStoreLayoutEnterprisesError = CommonErrors;

export const getStoreLayoutEnterprises: API.OperationMethod<GetStoreLayoutEnterprisesRequest, GetStoreLayoutEnterprisesResponse, GetStoreLayoutEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStoreLayoutEnterprisesRequest,
  output: GetStoreLayoutEnterprisesResponse,
  errors: [],
}));

/** Sets the store layout for the enterprise. By default, storeLayoutType is set to "basic" and the basic store layout is enabled. The basic layout only contains apps approved by the admin, and that have been added to the available product set for a user (using the setAvailableProductSet call). Apps on the page are sorted in order of their product ID value. If you create a custom store layout (by setting storeLayoutType = "custom" and setting a homepage), the basic store layout is disabled. */
export interface SetStoreLayoutEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: StoreLayout;
}

export const SetStoreLayoutEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(StoreLayout).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetStoreLayoutEnterprisesRequest>;

export type SetStoreLayoutEnterprisesResponse = StoreLayout;
export const SetStoreLayoutEnterprisesResponse = StoreLayout;

export type SetStoreLayoutEnterprisesError = CommonErrors;

export const setStoreLayoutEnterprises: API.OperationMethod<SetStoreLayoutEnterprisesRequest, SetStoreLayoutEnterprisesResponse, SetStoreLayoutEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetStoreLayoutEnterprisesRequest,
  output: SetStoreLayoutEnterprisesResponse,
  errors: [],
}));

/** Generates a sign-up URL. */
export interface GenerateSignupUrlEnterprisesRequest {
  /** The callback URL to which the Admin will be redirected after successfully creating an enterprise. Before redirecting there the system will add a single query parameter to this URL named "enterpriseToken" which will contain an opaque token to be used for the CompleteSignup request. Beware that this means that the URL will be parsed, the parameter added and then a new URL formatted, i.e. there may be some minor formatting changes and, more importantly, the URL must be well-formed so that it can be parsed. */
  callbackUrl?: string;
  /** Optional. Email address used to prefill the admin field of the enterprise signup form. This value is a hint only and can be altered by the user. If `allowedDomains` is non-empty then this must belong to one of the `allowedDomains`. */
  adminEmail?: string;
  /** Optional. A list of domains that are permitted for the admin email. The IT admin cannot enter an email address with a domain name that is not in this list. Subdomains of domains in this list are not allowed but can be allowed by adding a second entry which has `*.` prefixed to the domain name (e.g. *.example.com). If the field is not present or is an empty list then the IT admin is free to use any valid domain name. Personal email domains are always allowed, but will result in the creation of a managed Google Play Accounts enterprise. */
  allowedDomains?: string[];
}

export const GenerateSignupUrlEnterprisesRequest = Schema.Struct({
  callbackUrl: Schema.optional(Schema.String).pipe(T.HttpQuery("callbackUrl")),
  adminEmail: Schema.optional(Schema.String).pipe(T.HttpQuery("adminEmail")),
  allowedDomains: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("allowedDomains")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/signupUrl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateSignupUrlEnterprisesRequest>;

export type GenerateSignupUrlEnterprisesResponse = SignupInfo;
export const GenerateSignupUrlEnterprisesResponse = SignupInfo;

export type GenerateSignupUrlEnterprisesError = CommonErrors;

export const generateSignupUrlEnterprises: API.OperationMethod<GenerateSignupUrlEnterprisesRequest, GenerateSignupUrlEnterprisesResponse, GenerateSignupUrlEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateSignupUrlEnterprisesRequest,
  output: GenerateSignupUrlEnterprisesResponse,
  errors: [],
}));

/** Completes the signup flow, by specifying the Completion token and Enterprise token. This request must not be called multiple times for a given Enterprise Token. */
export interface CompleteSignupEnterprisesRequest {
  /** The Completion token initially returned by GenerateSignupUrl. */
  completionToken?: string;
  /** The Enterprise token appended to the Callback URL. */
  enterpriseToken?: string;
}

export const CompleteSignupEnterprisesRequest = Schema.Struct({
  completionToken: Schema.optional(Schema.String).pipe(T.HttpQuery("completionToken")),
  enterpriseToken: Schema.optional(Schema.String).pipe(T.HttpQuery("enterpriseToken")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/completeSignup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteSignupEnterprisesRequest>;

export type CompleteSignupEnterprisesResponse = Enterprise;
export const CompleteSignupEnterprisesResponse = Enterprise;

export type CompleteSignupEnterprisesError = CommonErrors;

export const completeSignupEnterprises: API.OperationMethod<CompleteSignupEnterprisesRequest, CompleteSignupEnterprisesResponse, CompleteSignupEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteSignupEnterprisesRequest,
  output: CompleteSignupEnterprisesResponse,
  errors: [],
}));

/** Returns a service account and credentials. The service account can be bound to the enterprise by calling setAccount. The service account is unique to this enterprise and EMM, and will be deleted if the enterprise is unbound. The credentials contain private key data and are not stored server-side. This method can only be called after calling Enterprises.Enroll or Enterprises.CompleteSignup, and before Enterprises.SetAccount; at other times it will return an error. Subsequent calls after the first will generate a new, unique set of credentials, and invalidate the previously generated credentials. Once the service account is bound to the enterprise, it can be managed using the serviceAccountKeys resource. *Note:* After you create a key, you might need to wait for 60 seconds or more before you perform another operation with the key. If you try to perform an operation with the key immediately after you create the key, and you receive an error, you can retry the request with exponential backoff . */
export interface GetServiceAccountEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The type of credential to return with the service account. Required. */
  keyType?: "googleCredentials" | "pkcs12" | (string & {});
}

export const GetServiceAccountEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  keyType: Schema.optional(Schema.String).pipe(T.HttpQuery("keyType")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccount" }),
  svc,
) as unknown as Schema.Schema<GetServiceAccountEnterprisesRequest>;

export type GetServiceAccountEnterprisesResponse = ServiceAccount;
export const GetServiceAccountEnterprisesResponse = ServiceAccount;

export type GetServiceAccountEnterprisesError = CommonErrors;

export const getServiceAccountEnterprises: API.OperationMethod<GetServiceAccountEnterprisesRequest, GetServiceAccountEnterprisesResponse, GetServiceAccountEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServiceAccountEnterprisesRequest,
  output: GetServiceAccountEnterprisesResponse,
  errors: [],
}));

/** Returns a unique token to access an embeddable UI. To generate a web UI, pass the generated token into the managed Google Play javascript API. Each token may only be used to start one UI session. See the JavaScript API documentation for further information. */
export interface CreateWebTokenEnterprisesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: AdministratorWebTokenSpec;
}

export const CreateWebTokenEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(AdministratorWebTokenSpec).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/createWebToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateWebTokenEnterprisesRequest>;

export type CreateWebTokenEnterprisesResponse = AdministratorWebToken;
export const CreateWebTokenEnterprisesResponse = AdministratorWebToken;

export type CreateWebTokenEnterprisesError = CommonErrors;

export const createWebTokenEnterprises: API.OperationMethod<CreateWebTokenEnterprisesRequest, CreateWebTokenEnterprisesResponse, CreateWebTokenEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateWebTokenEnterprisesRequest,
  output: CreateWebTokenEnterprisesResponse,
  errors: [],
}));

/** Generates an enterprise upgrade URL to upgrade an existing managed Google Play Accounts enterprise to a managed Google domain. See the guide to upgrading an enterprise for more details. */
export interface GenerateEnterpriseUpgradeUrlEnterprisesRequest {
  /** Required. The ID of the enterprise. */
  enterpriseId: string;
  /** Optional. A list of domains that are permitted for the admin email. The IT admin cannot enter an email address with a domain name that is not in this list. Subdomains of domains in this list are not allowed but can be allowed by adding a second entry which has `*.` prefixed to the domain name (e.g. *.example.com). If the field is not present or is an empty list then the IT admin is free to use any valid domain name. Personal email domains are not allowed. */
  allowedDomains?: string[];
  /** Optional. Email address used to prefill the admin field of the enterprise signup form as part of the upgrade process. This value is a hint only and can be altered by the user. Personal email addresses are not allowed. If `allowedDomains` is non-empty then this must belong to one of the `allowedDomains`. */
  adminEmail?: string;
}

export const GenerateEnterpriseUpgradeUrlEnterprisesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  allowedDomains: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("allowedDomains")),
  adminEmail: Schema.optional(Schema.String).pipe(T.HttpQuery("adminEmail")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/generateEnterpriseUpgradeUrl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateEnterpriseUpgradeUrlEnterprisesRequest>;

export type GenerateEnterpriseUpgradeUrlEnterprisesResponse = GenerateEnterpriseUpgradeUrlResponse;
export const GenerateEnterpriseUpgradeUrlEnterprisesResponse = GenerateEnterpriseUpgradeUrlResponse;

export type GenerateEnterpriseUpgradeUrlEnterprisesError = CommonErrors;

export const generateEnterpriseUpgradeUrlEnterprises: API.OperationMethod<GenerateEnterpriseUpgradeUrlEnterprisesRequest, GenerateEnterpriseUpgradeUrlEnterprisesResponse, GenerateEnterpriseUpgradeUrlEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateEnterpriseUpgradeUrlEnterprisesRequest,
  output: GenerateEnterpriseUpgradeUrlEnterprisesResponse,
  errors: [],
}));

/** Lists all entitlements for the specified user. Only the ID is set. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface ListEntitlementsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const ListEntitlementsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/entitlements" }),
  svc,
) as unknown as Schema.Schema<ListEntitlementsRequest>;

export type ListEntitlementsResponse = EntitlementsListResponse;
export const ListEntitlementsResponse = EntitlementsListResponse;

export type ListEntitlementsError = CommonErrors;

export const listEntitlements: API.OperationMethod<ListEntitlementsRequest, ListEntitlementsResponse, ListEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListEntitlementsRequest,
  output: ListEntitlementsResponse,
  errors: [],
}));

/** Retrieves details of an entitlement. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface GetEntitlementsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the entitlement (a product ID), e.g. "app:com.google.android.gm". */
  entitlementId: string;
}

export const GetEntitlementsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  entitlementId: Schema.String.pipe(T.HttpPath("entitlementId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/entitlements/{entitlementId}" }),
  svc,
) as unknown as Schema.Schema<GetEntitlementsRequest>;

export type GetEntitlementsResponse = Entitlement;
export const GetEntitlementsResponse = Entitlement;

export type GetEntitlementsError = CommonErrors;

export const getEntitlements: API.OperationMethod<GetEntitlementsRequest, GetEntitlementsResponse, GetEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEntitlementsRequest,
  output: GetEntitlementsResponse,
  errors: [],
}));

/** Adds or updates an entitlement to an app for a user. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface UpdateEntitlementsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the entitlement (a product ID), e.g. "app:com.google.android.gm". */
  entitlementId: string;
  /** Set to true to also install the product on all the user's devices where possible. Failure to install on one or more devices will not prevent this operation from returning successfully, as long as the entitlement was successfully assigned to the user. */
  install?: boolean;
  /** Request body */
  body?: Entitlement;
}

export const UpdateEntitlementsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  entitlementId: Schema.String.pipe(T.HttpPath("entitlementId")),
  install: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("install")),
  body: Schema.optional(Entitlement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/entitlements/{entitlementId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateEntitlementsRequest>;

export type UpdateEntitlementsResponse = Entitlement;
export const UpdateEntitlementsResponse = Entitlement;

export type UpdateEntitlementsError = CommonErrors;

export const updateEntitlements: API.OperationMethod<UpdateEntitlementsRequest, UpdateEntitlementsResponse, UpdateEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateEntitlementsRequest,
  output: UpdateEntitlementsResponse,
  errors: [],
}));

/** Removes an entitlement to an app for a user. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface DeleteEntitlementsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the entitlement (a product ID), e.g. "app:com.google.android.gm". */
  entitlementId: string;
}

export const DeleteEntitlementsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  entitlementId: Schema.String.pipe(T.HttpPath("entitlementId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/entitlements/{entitlementId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEntitlementsRequest>;

export interface DeleteEntitlementsResponse {}
export const DeleteEntitlementsResponse: Schema.Schema<DeleteEntitlementsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteEntitlementsResponse>;

export type DeleteEntitlementsError = CommonErrors;

export const deleteEntitlements: API.OperationMethod<DeleteEntitlementsRequest, DeleteEntitlementsResponse, DeleteEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEntitlementsRequest,
  output: DeleteEntitlementsResponse,
  errors: [],
}));

/** Retrieves the IDs of the users who have been granted entitlements under the license. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface ListGrouplicenseusersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product the group license is for, e.g. "app:com.google.android.gm". */
  groupLicenseId: string;
}

export const ListGrouplicenseusersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  groupLicenseId: Schema.String.pipe(T.HttpPath("groupLicenseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/groupLicenses/{groupLicenseId}/users" }),
  svc,
) as unknown as Schema.Schema<ListGrouplicenseusersRequest>;

export type ListGrouplicenseusersResponse = GroupLicenseUsersListResponse;
export const ListGrouplicenseusersResponse = GroupLicenseUsersListResponse;

export type ListGrouplicenseusersError = CommonErrors;

export const listGrouplicenseusers: API.OperationMethod<ListGrouplicenseusersRequest, ListGrouplicenseusersResponse, ListGrouplicenseusersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListGrouplicenseusersRequest,
  output: ListGrouplicenseusersResponse,
  errors: [],
}));

/** Retrieves IDs of all products for which the enterprise has a group license. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface ListGrouplicensesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const ListGrouplicensesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/groupLicenses" }),
  svc,
) as unknown as Schema.Schema<ListGrouplicensesRequest>;

export type ListGrouplicensesResponse = GroupLicensesListResponse;
export const ListGrouplicensesResponse = GroupLicensesListResponse;

export type ListGrouplicensesError = CommonErrors;

export const listGrouplicenses: API.OperationMethod<ListGrouplicensesRequest, ListGrouplicensesResponse, ListGrouplicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListGrouplicensesRequest,
  output: ListGrouplicensesResponse,
  errors: [],
}));

/** Retrieves details of an enterprise's group license for a product. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface GetGrouplicensesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product the group license is for, e.g. "app:com.google.android.gm". */
  groupLicenseId: string;
}

export const GetGrouplicensesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  groupLicenseId: Schema.String.pipe(T.HttpPath("groupLicenseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/groupLicenses/{groupLicenseId}" }),
  svc,
) as unknown as Schema.Schema<GetGrouplicensesRequest>;

export type GetGrouplicensesResponse = GroupLicense;
export const GetGrouplicensesResponse = GroupLicense;

export type GetGrouplicensesError = CommonErrors;

export const getGrouplicenses: API.OperationMethod<GetGrouplicensesRequest, GetGrouplicensesResponse, GetGrouplicensesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGrouplicensesRequest,
  output: GetGrouplicensesResponse,
  errors: [],
}));

/** Retrieves the details of all apps installed on the specified device. */
export interface ListInstallsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
}

export const ListInstallsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/installs" }),
  svc,
) as unknown as Schema.Schema<ListInstallsRequest>;

export type ListInstallsResponse = InstallsListResponse;
export const ListInstallsResponse = InstallsListResponse;

export type ListInstallsError = CommonErrors;

export const listInstalls: API.OperationMethod<ListInstallsRequest, ListInstallsResponse, ListInstallsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListInstallsRequest,
  output: ListInstallsResponse,
  errors: [],
}));

/** Retrieves details of an installation of an app on a device. */
export interface GetInstallsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
  /** The ID of the product represented by the install, e.g. "app:com.google.android.gm". */
  installId: string;
}

export const GetInstallsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  installId: Schema.String.pipe(T.HttpPath("installId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/installs/{installId}" }),
  svc,
) as unknown as Schema.Schema<GetInstallsRequest>;

export type GetInstallsResponse = Install;
export const GetInstallsResponse = Install;

export type GetInstallsError = CommonErrors;

export const getInstalls: API.OperationMethod<GetInstallsRequest, GetInstallsResponse, GetInstallsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetInstallsRequest,
  output: GetInstallsResponse,
  errors: [],
}));

/** Requests to install the latest version of an app to a device. If the app is already installed, then it is updated to the latest version if necessary. */
export interface UpdateInstallsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
  /** The ID of the product represented by the install, e.g. "app:com.google.android.gm". */
  installId: string;
  /** Request body */
  body?: Install;
}

export const UpdateInstallsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  installId: Schema.String.pipe(T.HttpPath("installId")),
  body: Schema.optional(Install).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/installs/{installId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateInstallsRequest>;

export type UpdateInstallsResponse = Install;
export const UpdateInstallsResponse = Install;

export type UpdateInstallsError = CommonErrors;

export const updateInstalls: API.OperationMethod<UpdateInstallsRequest, UpdateInstallsResponse, UpdateInstallsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateInstallsRequest,
  output: UpdateInstallsResponse,
  errors: [],
}));

/** Requests to remove an app from a device. A call to get or list will still show the app as installed on the device until it is actually removed. A successful response indicates that a removal request has been sent to the device. The call will be considered successful even if the app is not present on the device (e.g. it was never installed, or was removed by the user). */
export interface DeleteInstallsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
  /** The ID of the product represented by the install, e.g. "app:com.google.android.gm". */
  installId: string;
}

export const DeleteInstallsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  installId: Schema.String.pipe(T.HttpPath("installId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/installs/{installId}" }),
  svc,
) as unknown as Schema.Schema<DeleteInstallsRequest>;

export interface DeleteInstallsResponse {}
export const DeleteInstallsResponse: Schema.Schema<DeleteInstallsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteInstallsResponse>;

export type DeleteInstallsError = CommonErrors;

export const deleteInstalls: API.OperationMethod<DeleteInstallsRequest, DeleteInstallsResponse, DeleteInstallsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteInstallsRequest,
  output: DeleteInstallsResponse,
  errors: [],
}));

/** Lists all the per-device managed configurations for the specified device. Only the ID is set. */
export interface ListManagedconfigurationsfordeviceRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
}

export const ListManagedconfigurationsfordeviceRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice" }),
  svc,
) as unknown as Schema.Schema<ListManagedconfigurationsfordeviceRequest>;

export type ListManagedconfigurationsfordeviceResponse = ManagedConfigurationsForDeviceListResponse;
export const ListManagedconfigurationsfordeviceResponse = ManagedConfigurationsForDeviceListResponse;

export type ListManagedconfigurationsfordeviceError = CommonErrors;

export const listManagedconfigurationsfordevice: API.OperationMethod<ListManagedconfigurationsfordeviceRequest, ListManagedconfigurationsfordeviceResponse, ListManagedconfigurationsfordeviceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagedconfigurationsfordeviceRequest,
  output: ListManagedconfigurationsfordeviceResponse,
  errors: [],
}));

/** Retrieves details of a per-device managed configuration. */
export interface GetManagedconfigurationsfordeviceRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
  /** The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm". */
  managedConfigurationForDeviceId: string;
}

export const GetManagedconfigurationsfordeviceRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  managedConfigurationForDeviceId: Schema.String.pipe(T.HttpPath("managedConfigurationForDeviceId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice/{managedConfigurationForDeviceId}" }),
  svc,
) as unknown as Schema.Schema<GetManagedconfigurationsfordeviceRequest>;

export type GetManagedconfigurationsfordeviceResponse = ManagedConfiguration;
export const GetManagedconfigurationsfordeviceResponse = ManagedConfiguration;

export type GetManagedconfigurationsfordeviceError = CommonErrors;

export const getManagedconfigurationsfordevice: API.OperationMethod<GetManagedconfigurationsfordeviceRequest, GetManagedconfigurationsfordeviceResponse, GetManagedconfigurationsfordeviceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagedconfigurationsfordeviceRequest,
  output: GetManagedconfigurationsfordeviceResponse,
  errors: [],
}));

/** Adds or updates a per-device managed configuration for an app for the specified device. */
export interface UpdateManagedconfigurationsfordeviceRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
  /** The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm". */
  managedConfigurationForDeviceId: string;
  /** Request body */
  body?: ManagedConfiguration;
}

export const UpdateManagedconfigurationsfordeviceRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  managedConfigurationForDeviceId: Schema.String.pipe(T.HttpPath("managedConfigurationForDeviceId")),
  body: Schema.optional(ManagedConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice/{managedConfigurationForDeviceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagedconfigurationsfordeviceRequest>;

export type UpdateManagedconfigurationsfordeviceResponse = ManagedConfiguration;
export const UpdateManagedconfigurationsfordeviceResponse = ManagedConfiguration;

export type UpdateManagedconfigurationsfordeviceError = CommonErrors;

export const updateManagedconfigurationsfordevice: API.OperationMethod<UpdateManagedconfigurationsfordeviceRequest, UpdateManagedconfigurationsfordeviceResponse, UpdateManagedconfigurationsfordeviceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagedconfigurationsfordeviceRequest,
  output: UpdateManagedconfigurationsfordeviceResponse,
  errors: [],
}));

/** Removes a per-device managed configuration for an app for the specified device. */
export interface DeleteManagedconfigurationsfordeviceRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The Android ID of the device. */
  deviceId: string;
  /** The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm". */
  managedConfigurationForDeviceId: string;
}

export const DeleteManagedconfigurationsfordeviceRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  managedConfigurationForDeviceId: Schema.String.pipe(T.HttpPath("managedConfigurationForDeviceId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/devices/{deviceId}/managedConfigurationsForDevice/{managedConfigurationForDeviceId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagedconfigurationsfordeviceRequest>;

export interface DeleteManagedconfigurationsfordeviceResponse {}
export const DeleteManagedconfigurationsfordeviceResponse: Schema.Schema<DeleteManagedconfigurationsfordeviceResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagedconfigurationsfordeviceResponse>;

export type DeleteManagedconfigurationsfordeviceError = CommonErrors;

export const deleteManagedconfigurationsfordevice: API.OperationMethod<DeleteManagedconfigurationsfordeviceRequest, DeleteManagedconfigurationsfordeviceResponse, DeleteManagedconfigurationsfordeviceError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagedconfigurationsfordeviceRequest,
  output: DeleteManagedconfigurationsfordeviceResponse,
  errors: [],
}));

/** Lists all the per-user managed configurations for the specified user. Only the ID is set. */
export interface ListManagedconfigurationsforuserRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const ListManagedconfigurationsforuserRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser" }),
  svc,
) as unknown as Schema.Schema<ListManagedconfigurationsforuserRequest>;

export type ListManagedconfigurationsforuserResponse = ManagedConfigurationsForUserListResponse;
export const ListManagedconfigurationsforuserResponse = ManagedConfigurationsForUserListResponse;

export type ListManagedconfigurationsforuserError = CommonErrors;

export const listManagedconfigurationsforuser: API.OperationMethod<ListManagedconfigurationsforuserRequest, ListManagedconfigurationsforuserResponse, ListManagedconfigurationsforuserError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagedconfigurationsforuserRequest,
  output: ListManagedconfigurationsforuserResponse,
  errors: [],
}));

/** Retrieves details of a per-user managed configuration for an app for the specified user. */
export interface GetManagedconfigurationsforuserRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm". */
  managedConfigurationForUserId: string;
}

export const GetManagedconfigurationsforuserRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  managedConfigurationForUserId: Schema.String.pipe(T.HttpPath("managedConfigurationForUserId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser/{managedConfigurationForUserId}" }),
  svc,
) as unknown as Schema.Schema<GetManagedconfigurationsforuserRequest>;

export type GetManagedconfigurationsforuserResponse = ManagedConfiguration;
export const GetManagedconfigurationsforuserResponse = ManagedConfiguration;

export type GetManagedconfigurationsforuserError = CommonErrors;

export const getManagedconfigurationsforuser: API.OperationMethod<GetManagedconfigurationsforuserRequest, GetManagedconfigurationsforuserResponse, GetManagedconfigurationsforuserError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetManagedconfigurationsforuserRequest,
  output: GetManagedconfigurationsforuserResponse,
  errors: [],
}));

/** Adds or updates the managed configuration settings for an app for the specified user. If you support the Managed configurations iframe, you can apply managed configurations to a user by specifying an mcmId and its associated configuration variables (if any) in the request. Alternatively, all EMMs can apply managed configurations by passing a list of managed properties. */
export interface UpdateManagedconfigurationsforuserRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm". */
  managedConfigurationForUserId: string;
  /** Request body */
  body?: ManagedConfiguration;
}

export const UpdateManagedconfigurationsforuserRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  managedConfigurationForUserId: Schema.String.pipe(T.HttpPath("managedConfigurationForUserId")),
  body: Schema.optional(ManagedConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser/{managedConfigurationForUserId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateManagedconfigurationsforuserRequest>;

export type UpdateManagedconfigurationsforuserResponse = ManagedConfiguration;
export const UpdateManagedconfigurationsforuserResponse = ManagedConfiguration;

export type UpdateManagedconfigurationsforuserError = CommonErrors;

export const updateManagedconfigurationsforuser: API.OperationMethod<UpdateManagedconfigurationsforuserRequest, UpdateManagedconfigurationsforuserResponse, UpdateManagedconfigurationsforuserError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateManagedconfigurationsforuserRequest,
  output: UpdateManagedconfigurationsforuserResponse,
  errors: [],
}));

/** Removes a per-user managed configuration for an app for the specified user. */
export interface DeleteManagedconfigurationsforuserRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm". */
  managedConfigurationForUserId: string;
}

export const DeleteManagedconfigurationsforuserRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  managedConfigurationForUserId: Schema.String.pipe(T.HttpPath("managedConfigurationForUserId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser/{managedConfigurationForUserId}" }),
  svc,
) as unknown as Schema.Schema<DeleteManagedconfigurationsforuserRequest>;

export interface DeleteManagedconfigurationsforuserResponse {}
export const DeleteManagedconfigurationsforuserResponse: Schema.Schema<DeleteManagedconfigurationsforuserResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteManagedconfigurationsforuserResponse>;

export type DeleteManagedconfigurationsforuserError = CommonErrors;

export const deleteManagedconfigurationsforuser: API.OperationMethod<DeleteManagedconfigurationsforuserRequest, DeleteManagedconfigurationsforuserResponse, DeleteManagedconfigurationsforuserError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteManagedconfigurationsforuserRequest,
  output: DeleteManagedconfigurationsforuserResponse,
  errors: [],
}));

/** Lists all the managed configurations settings for the specified app. */
export interface ListManagedconfigurationssettingsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product for which the managed configurations settings applies to. */
  productId: string;
}

export const ListManagedconfigurationssettingsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/managedConfigurationsSettings" }),
  svc,
) as unknown as Schema.Schema<ListManagedconfigurationssettingsRequest>;

export type ListManagedconfigurationssettingsResponse = ManagedConfigurationsSettingsListResponse;
export const ListManagedconfigurationssettingsResponse = ManagedConfigurationsSettingsListResponse;

export type ListManagedconfigurationssettingsError = CommonErrors;

export const listManagedconfigurationssettings: API.OperationMethod<ListManagedconfigurationssettingsRequest, ListManagedconfigurationssettingsResponse, ListManagedconfigurationssettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListManagedconfigurationssettingsRequest,
  output: ListManagedconfigurationssettingsResponse,
  errors: [],
}));

/** Retrieves details of an Android app permission for display to an enterprise admin. */
export interface GetPermissionsRequest {
  /** The ID of the permission. */
  permissionId: string;
  /** The BCP47 tag for the user's preferred language (e.g. "en-US", "de") */
  language?: string;
}

export const GetPermissionsRequest = Schema.Struct({
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/permissions/{permissionId}" }),
  svc,
) as unknown as Schema.Schema<GetPermissionsRequest>;

export type GetPermissionsResponse = Permission;
export const GetPermissionsResponse = Permission;

export type GetPermissionsError = CommonErrors;

export const getPermissions: API.OperationMethod<GetPermissionsRequest, GetPermissionsResponse, GetPermissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPermissionsRequest,
  output: GetPermissionsResponse,
  errors: [],
}));

/** Retrieves details of a product for display to an enterprise admin. */
export interface GetProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product, e.g. "app:com.google.android.gm". */
  productId: string;
  /** The BCP47 tag for the user's preferred language (e.g. "en-US", "de"). */
  language?: string;
}

export const GetProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}" }),
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

/** Finds approved products that match a query, or all approved products if there is no query. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface ListProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Defines how many results the list operation should return. The default number depends on the resource collection. */
  maxResults?: number;
  /** Defines the token of the page to return, usually taken from TokenPagination. This can only be used if token paging is enabled. */
  token?: string;
  /** Specifies whether to search among all products (false) or among only products that have been approved (true). Only "true" is supported, and should be specified. */
  approved?: boolean;
  /** The search query as typed in the Google Play store search box. If omitted, all approved apps will be returned (using the pagination parameters), including apps that are not available in the store (e.g. unpublished apps). */
  query?: string;
  /** The BCP47 tag for the user's preferred language (e.g. "en-US", "de"). Results are returned in the language best matching the preferred language. */
  language?: string;
}

export const ListProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  approved: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("approved")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/products" }),
  svc,
) as unknown as Schema.Schema<ListProductsRequest>;

export type ListProductsResponse = ProductsListResponse;
export const ListProductsResponse = ProductsListResponse;

export type ListProductsError = CommonErrors;

export const listProducts: API.OperationMethod<ListProductsRequest, ListProductsResponse, ListProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProductsRequest,
  output: ListProductsResponse,
  errors: [],
}));

/** Retrieves the Android app permissions required by this app. */
export interface GetPermissionsProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product. */
  productId: string;
}

export const GetPermissionsProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/permissions" }),
  svc,
) as unknown as Schema.Schema<GetPermissionsProductsRequest>;

export type GetPermissionsProductsResponse = ProductPermissions;
export const GetPermissionsProductsResponse = ProductPermissions;

export type GetPermissionsProductsError = CommonErrors;

export const getPermissionsProducts: API.OperationMethod<GetPermissionsProductsRequest, GetPermissionsProductsResponse, GetPermissionsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPermissionsProductsRequest,
  output: GetPermissionsProductsResponse,
  errors: [],
}));

/** Generates a URL that can be rendered in an iframe to display the permissions (if any) of a product. An enterprise admin must view these permissions and accept them on behalf of their organization in order to approve that product. Admins should accept the displayed permissions by interacting with a separate UI element in the EMM console, which in turn should trigger the use of this URL as the approvalUrlInfo.approvalUrl property in a Products.approve call to approve the product. This URL can only be used to display permissions for up to 1 day. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface GenerateApprovalUrlProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product. */
  productId: string;
  /** The BCP 47 language code used for permission names and descriptions in the returned iframe, for instance "en-US". */
  languageCode?: string;
}

export const GenerateApprovalUrlProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/generateApprovalUrl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateApprovalUrlProductsRequest>;

export type GenerateApprovalUrlProductsResponse = ProductsGenerateApprovalUrlResponse;
export const GenerateApprovalUrlProductsResponse = ProductsGenerateApprovalUrlResponse;

export type GenerateApprovalUrlProductsError = CommonErrors;

export const generateApprovalUrlProducts: API.OperationMethod<GenerateApprovalUrlProductsRequest, GenerateApprovalUrlProductsResponse, GenerateApprovalUrlProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateApprovalUrlProductsRequest,
  output: GenerateApprovalUrlProductsResponse,
  errors: [],
}));

/** Approves the specified product and the relevant app permissions, if any. The maximum number of products that you can approve per enterprise customer is 1,000. To learn how to use managed Google Play to design and create a store layout to display approved products to your users, see Store Layout Design. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface ApproveProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product. */
  productId: string;
  /** Request body */
  body?: ProductsApproveRequest;
}

export const ApproveProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  body: Schema.optional(ProductsApproveRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveProductsRequest>;

export interface ApproveProductsResponse {}
export const ApproveProductsResponse: Schema.Schema<ApproveProductsResponse> = Schema.Struct({}) as any as Schema.Schema<ApproveProductsResponse>;

export type ApproveProductsError = CommonErrors;

export const approveProducts: API.OperationMethod<ApproveProductsRequest, ApproveProductsResponse, ApproveProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveProductsRequest,
  output: ApproveProductsResponse,
  errors: [],
}));

/** Unapproves the specified product (and the relevant app permissions, if any) **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface UnapproveProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product. */
  productId: string;
}

export const UnapproveProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/unapprove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnapproveProductsRequest>;

export interface UnapproveProductsResponse {}
export const UnapproveProductsResponse: Schema.Schema<UnapproveProductsResponse> = Schema.Struct({}) as any as Schema.Schema<UnapproveProductsResponse>;

export type UnapproveProductsError = CommonErrors;

export const unapproveProducts: API.OperationMethod<UnapproveProductsRequest, UnapproveProductsResponse, UnapproveProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnapproveProductsRequest,
  output: UnapproveProductsResponse,
  errors: [],
}));

/** Retrieves the schema that defines the configurable properties for this product. All products have a schema, but this schema may be empty if no managed configurations have been defined. This schema can be used to populate a UI that allows an admin to configure the product. To apply a managed configuration based on the schema obtained using this API, see Managed Configurations through Play. */
export interface GetAppRestrictionsSchemaProductsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the product. */
  productId: string;
  /** The BCP47 tag for the user's preferred language (e.g. "en-US", "de"). */
  language?: string;
}

export const GetAppRestrictionsSchemaProductsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  productId: Schema.String.pipe(T.HttpPath("productId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/appRestrictionsSchema" }),
  svc,
) as unknown as Schema.Schema<GetAppRestrictionsSchemaProductsRequest>;

export type GetAppRestrictionsSchemaProductsResponse = AppRestrictionsSchema;
export const GetAppRestrictionsSchemaProductsResponse = AppRestrictionsSchema;

export type GetAppRestrictionsSchemaProductsError = CommonErrors;

export const getAppRestrictionsSchemaProducts: API.OperationMethod<GetAppRestrictionsSchemaProductsRequest, GetAppRestrictionsSchemaProductsResponse, GetAppRestrictionsSchemaProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppRestrictionsSchemaProductsRequest,
  output: GetAppRestrictionsSchemaProductsResponse,
  errors: [],
}));

/** Generates new credentials for the service account associated with this enterprise. The calling service account must have been retrieved by calling Enterprises.GetServiceAccount and must have been set as the enterprise service account by calling Enterprises.SetAccount. Only the type of the key should be populated in the resource to be inserted. */
export interface InsertServiceaccountkeysRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: ServiceAccountKey;
}

export const InsertServiceaccountkeysRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(ServiceAccountKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccountKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertServiceaccountkeysRequest>;

export type InsertServiceaccountkeysResponse = ServiceAccountKey;
export const InsertServiceaccountkeysResponse = ServiceAccountKey;

export type InsertServiceaccountkeysError = CommonErrors;

export const insertServiceaccountkeys: API.OperationMethod<InsertServiceaccountkeysRequest, InsertServiceaccountkeysResponse, InsertServiceaccountkeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertServiceaccountkeysRequest,
  output: InsertServiceaccountkeysResponse,
  errors: [],
}));

/** Lists all active credentials for the service account associated with this enterprise. Only the ID and key type are returned. The calling service account must have been retrieved by calling Enterprises.GetServiceAccount and must have been set as the enterprise service account by calling Enterprises.SetAccount. */
export interface ListServiceaccountkeysRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const ListServiceaccountkeysRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccountKeys" }),
  svc,
) as unknown as Schema.Schema<ListServiceaccountkeysRequest>;

export type ListServiceaccountkeysResponse = ServiceAccountKeysListResponse;
export const ListServiceaccountkeysResponse = ServiceAccountKeysListResponse;

export type ListServiceaccountkeysError = CommonErrors;

export const listServiceaccountkeys: API.OperationMethod<ListServiceaccountkeysRequest, ListServiceaccountkeysResponse, ListServiceaccountkeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListServiceaccountkeysRequest,
  output: ListServiceaccountkeysResponse,
  errors: [],
}));

/** Removes and invalidates the specified credentials for the service account associated with this enterprise. The calling service account must have been retrieved by calling Enterprises.GetServiceAccount and must have been set as the enterprise service account by calling Enterprises.SetAccount. */
export interface DeleteServiceaccountkeysRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the key. */
  keyId: string;
}

export const DeleteServiceaccountkeysRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  keyId: Schema.String.pipe(T.HttpPath("keyId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccountKeys/{keyId}" }),
  svc,
) as unknown as Schema.Schema<DeleteServiceaccountkeysRequest>;

export interface DeleteServiceaccountkeysResponse {}
export const DeleteServiceaccountkeysResponse: Schema.Schema<DeleteServiceaccountkeysResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteServiceaccountkeysResponse>;

export type DeleteServiceaccountkeysError = CommonErrors;

export const deleteServiceaccountkeys: API.OperationMethod<DeleteServiceaccountkeysRequest, DeleteServiceaccountkeysResponse, DeleteServiceaccountkeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteServiceaccountkeysRequest,
  output: DeleteServiceaccountkeysResponse,
  errors: [],
}));

/** Retrieves the details of all clusters on the specified page. */
export interface ListStorelayoutclustersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
}

export const ListStorelayoutclustersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListStorelayoutclustersRequest>;

export type ListStorelayoutclustersResponse = StoreLayoutClustersListResponse;
export const ListStorelayoutclustersResponse = StoreLayoutClustersListResponse;

export type ListStorelayoutclustersError = CommonErrors;

export const listStorelayoutclusters: API.OperationMethod<ListStorelayoutclustersRequest, ListStorelayoutclustersResponse, ListStorelayoutclustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListStorelayoutclustersRequest,
  output: ListStorelayoutclustersResponse,
  errors: [],
}));

/** Inserts a new cluster in a page. */
export interface InsertStorelayoutclustersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
  /** Request body */
  body?: StoreCluster;
}

export const InsertStorelayoutclustersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  body: Schema.optional(StoreCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertStorelayoutclustersRequest>;

export type InsertStorelayoutclustersResponse = StoreCluster;
export const InsertStorelayoutclustersResponse = StoreCluster;

export type InsertStorelayoutclustersError = CommonErrors;

export const insertStorelayoutclusters: API.OperationMethod<InsertStorelayoutclustersRequest, InsertStorelayoutclustersResponse, InsertStorelayoutclustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertStorelayoutclustersRequest,
  output: InsertStorelayoutclustersResponse,
  errors: [],
}));

/** Retrieves details of a cluster. */
export interface GetStorelayoutclustersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
  /** The ID of the cluster. */
  clusterId: string;
}

export const GetStorelayoutclustersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}/clusters/{clusterId}" }),
  svc,
) as unknown as Schema.Schema<GetStorelayoutclustersRequest>;

export type GetStorelayoutclustersResponse = StoreCluster;
export const GetStorelayoutclustersResponse = StoreCluster;

export type GetStorelayoutclustersError = CommonErrors;

export const getStorelayoutclusters: API.OperationMethod<GetStorelayoutclustersRequest, GetStorelayoutclustersResponse, GetStorelayoutclustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStorelayoutclustersRequest,
  output: GetStorelayoutclustersResponse,
  errors: [],
}));

/** Updates a cluster. */
export interface UpdateStorelayoutclustersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
  /** The ID of the cluster. */
  clusterId: string;
  /** Request body */
  body?: StoreCluster;
}

export const UpdateStorelayoutclustersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
  body: Schema.optional(StoreCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}/clusters/{clusterId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateStorelayoutclustersRequest>;

export type UpdateStorelayoutclustersResponse = StoreCluster;
export const UpdateStorelayoutclustersResponse = StoreCluster;

export type UpdateStorelayoutclustersError = CommonErrors;

export const updateStorelayoutclusters: API.OperationMethod<UpdateStorelayoutclustersRequest, UpdateStorelayoutclustersResponse, UpdateStorelayoutclustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateStorelayoutclustersRequest,
  output: UpdateStorelayoutclustersResponse,
  errors: [],
}));

/** Deletes a cluster. */
export interface DeleteStorelayoutclustersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
  /** The ID of the cluster. */
  clusterId: string;
}

export const DeleteStorelayoutclustersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  clusterId: Schema.String.pipe(T.HttpPath("clusterId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}/clusters/{clusterId}" }),
  svc,
) as unknown as Schema.Schema<DeleteStorelayoutclustersRequest>;

export interface DeleteStorelayoutclustersResponse {}
export const DeleteStorelayoutclustersResponse: Schema.Schema<DeleteStorelayoutclustersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteStorelayoutclustersResponse>;

export type DeleteStorelayoutclustersError = CommonErrors;

export const deleteStorelayoutclusters: API.OperationMethod<DeleteStorelayoutclustersRequest, DeleteStorelayoutclustersResponse, DeleteStorelayoutclustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteStorelayoutclustersRequest,
  output: DeleteStorelayoutclustersResponse,
  errors: [],
}));

/** Retrieves the details of all pages in the store. */
export interface ListStorelayoutpagesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const ListStorelayoutpagesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages" }),
  svc,
) as unknown as Schema.Schema<ListStorelayoutpagesRequest>;

export type ListStorelayoutpagesResponse = StoreLayoutPagesListResponse;
export const ListStorelayoutpagesResponse = StoreLayoutPagesListResponse;

export type ListStorelayoutpagesError = CommonErrors;

export const listStorelayoutpages: API.OperationMethod<ListStorelayoutpagesRequest, ListStorelayoutpagesResponse, ListStorelayoutpagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListStorelayoutpagesRequest,
  output: ListStorelayoutpagesResponse,
  errors: [],
}));

/** Inserts a new store page. */
export interface InsertStorelayoutpagesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: StorePage;
}

export const InsertStorelayoutpagesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(StorePage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertStorelayoutpagesRequest>;

export type InsertStorelayoutpagesResponse = StorePage;
export const InsertStorelayoutpagesResponse = StorePage;

export type InsertStorelayoutpagesError = CommonErrors;

export const insertStorelayoutpages: API.OperationMethod<InsertStorelayoutpagesRequest, InsertStorelayoutpagesResponse, InsertStorelayoutpagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertStorelayoutpagesRequest,
  output: InsertStorelayoutpagesResponse,
  errors: [],
}));

/** Retrieves details of a store page. */
export interface GetStorelayoutpagesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
}

export const GetStorelayoutpagesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<GetStorelayoutpagesRequest>;

export type GetStorelayoutpagesResponse = StorePage;
export const GetStorelayoutpagesResponse = StorePage;

export type GetStorelayoutpagesError = CommonErrors;

export const getStorelayoutpages: API.OperationMethod<GetStorelayoutpagesRequest, GetStorelayoutpagesResponse, GetStorelayoutpagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStorelayoutpagesRequest,
  output: GetStorelayoutpagesResponse,
  errors: [],
}));

/** Updates the content of a store page. */
export interface UpdateStorelayoutpagesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
  /** Request body */
  body?: StorePage;
}

export const UpdateStorelayoutpagesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
  body: Schema.optional(StorePage).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateStorelayoutpagesRequest>;

export type UpdateStorelayoutpagesResponse = StorePage;
export const UpdateStorelayoutpagesResponse = StorePage;

export type UpdateStorelayoutpagesError = CommonErrors;

export const updateStorelayoutpages: API.OperationMethod<UpdateStorelayoutpagesRequest, UpdateStorelayoutpagesResponse, UpdateStorelayoutpagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateStorelayoutpagesRequest,
  output: UpdateStorelayoutpagesResponse,
  errors: [],
}));

/** Deletes a store page. */
export interface DeleteStorelayoutpagesRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the page. */
  pageId: string;
}

export const DeleteStorelayoutpagesRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  pageId: Schema.String.pipe(T.HttpPath("pageId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}" }),
  svc,
) as unknown as Schema.Schema<DeleteStorelayoutpagesRequest>;

export interface DeleteStorelayoutpagesResponse {}
export const DeleteStorelayoutpagesResponse: Schema.Schema<DeleteStorelayoutpagesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteStorelayoutpagesResponse>;

export type DeleteStorelayoutpagesError = CommonErrors;

export const deleteStorelayoutpages: API.OperationMethod<DeleteStorelayoutpagesRequest, DeleteStorelayoutpagesResponse, DeleteStorelayoutpagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteStorelayoutpagesRequest,
  output: DeleteStorelayoutpagesResponse,
  errors: [],
}));

/** Creates a new EMM-managed user. The Users resource passed in the body of the request should include an accountIdentifier and an accountType. If a corresponding user already exists with the same account identifier, the user will be updated with the resource. In this case only the displayName field can be changed. */
export interface InsertUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: User;
}

export const InsertUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/users", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertUsersRequest>;

export type InsertUsersResponse = User;
export const InsertUsersResponse = User;

export type InsertUsersError = CommonErrors;

export const insertUsers: API.OperationMethod<InsertUsersRequest, InsertUsersResponse, InsertUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertUsersRequest,
  output: InsertUsersResponse,
  errors: [],
}));

/** Updates the details of an EMM-managed user. Can be used with EMM-managed users only (not Google managed users). Pass the new details in the Users resource in the request body. Only the displayName field can be changed. Other fields must either be unset or have the currently active value. */
export interface UpdateUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** Request body */
  body?: User;
}

export const UpdateUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUsersRequest>;

export type UpdateUsersResponse = User;
export const UpdateUsersResponse = User;

export type UpdateUsersError = CommonErrors;

export const updateUsers: API.OperationMethod<UpdateUsersRequest, UpdateUsersResponse, UpdateUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUsersRequest,
  output: UpdateUsersResponse,
  errors: [],
}));

/** Looks up a user by primary email address. This is only supported for Google-managed users. Lookup of the id is not needed for EMM-managed users because the id is already returned in the result of the Users.insert call. */
export interface ListUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Required. The exact primary email address of the user to look up. */
  email: string;
}

export const ListUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  email: Schema.String.pipe(T.HttpQuery("email")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users" }),
  svc,
) as unknown as Schema.Schema<ListUsersRequest>;

export type ListUsersResponse = UsersListResponse;
export const ListUsersResponse = UsersListResponse;

export type ListUsersError = CommonErrors;

export const listUsers: API.OperationMethod<ListUsersRequest, ListUsersResponse, ListUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [],
}));

/** Retrieves a user's details. */
export interface GetUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const GetUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetUsersRequest>;

export type GetUsersResponse = User;
export const GetUsersResponse = User;

export type GetUsersError = CommonErrors;

export const getUsers: API.OperationMethod<GetUsersRequest, GetUsersResponse, GetUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

/** Deleted an EMM-managed user. */
export interface DeleteUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const DeleteUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersRequest>;

export interface DeleteUsersResponse {}
export const DeleteUsersResponse: Schema.Schema<DeleteUsersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersResponse>;

export type DeleteUsersError = CommonErrors;

export const deleteUsers: API.OperationMethod<DeleteUsersRequest, DeleteUsersResponse, DeleteUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersRequest,
  output: DeleteUsersResponse,
  errors: [],
}));

/** Generates an authentication token which the device policy client can use to provision the given EMM-managed user account on a device. The generated token is single-use and expires after a few minutes. You can provision a maximum of 10 devices per user. This call only works with EMM-managed accounts. */
export interface GenerateAuthenticationTokenUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const GenerateAuthenticationTokenUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/authenticationToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAuthenticationTokenUsersRequest>;

export type GenerateAuthenticationTokenUsersResponse = AuthenticationToken;
export const GenerateAuthenticationTokenUsersResponse = AuthenticationToken;

export type GenerateAuthenticationTokenUsersError = CommonErrors;

export const generateAuthenticationTokenUsers: API.OperationMethod<GenerateAuthenticationTokenUsersRequest, GenerateAuthenticationTokenUsersResponse, GenerateAuthenticationTokenUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAuthenticationTokenUsersRequest,
  output: GenerateAuthenticationTokenUsersResponse,
  errors: [],
}));

/** Retrieves the set of products a user is entitled to access. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface GetAvailableProductSetUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const GetAvailableProductSetUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/availableProductSet" }),
  svc,
) as unknown as Schema.Schema<GetAvailableProductSetUsersRequest>;

export type GetAvailableProductSetUsersResponse = ProductSet;
export const GetAvailableProductSetUsersResponse = ProductSet;

export type GetAvailableProductSetUsersError = CommonErrors;

export const getAvailableProductSetUsers: API.OperationMethod<GetAvailableProductSetUsersRequest, GetAvailableProductSetUsersResponse, GetAvailableProductSetUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAvailableProductSetUsersRequest,
  output: GetAvailableProductSetUsersResponse,
  errors: [],
}));

/** Revokes access to all devices currently provisioned to the user. The user will no longer be able to use the managed Play store on any of their managed devices. This call only works with EMM-managed accounts. */
export interface RevokeDeviceAccessUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
}

export const RevokeDeviceAccessUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/deviceAccess" }),
  svc,
) as unknown as Schema.Schema<RevokeDeviceAccessUsersRequest>;

export interface RevokeDeviceAccessUsersResponse {}
export const RevokeDeviceAccessUsersResponse: Schema.Schema<RevokeDeviceAccessUsersResponse> = Schema.Struct({}) as any as Schema.Schema<RevokeDeviceAccessUsersResponse>;

export type RevokeDeviceAccessUsersError = CommonErrors;

export const revokeDeviceAccessUsers: API.OperationMethod<RevokeDeviceAccessUsersRequest, RevokeDeviceAccessUsersResponse, RevokeDeviceAccessUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokeDeviceAccessUsersRequest,
  output: RevokeDeviceAccessUsersResponse,
  errors: [],
}));

/** Modifies the set of products that a user is entitled to access (referred to as *whitelisted* products). Only products that are approved or products that were previously approved (products with revoked approval) can be whitelisted. **Note:** This item has been deprecated. New integrations cannot use this method and can refer to our new recommendations. */
export interface SetAvailableProductSetUsersRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the user. */
  userId: string;
  /** Request body */
  body?: ProductSet;
}

export const SetAvailableProductSetUsersRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(ProductSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/availableProductSet", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAvailableProductSetUsersRequest>;

export type SetAvailableProductSetUsersResponse = ProductSet;
export const SetAvailableProductSetUsersResponse = ProductSet;

export type SetAvailableProductSetUsersError = CommonErrors;

export const setAvailableProductSetUsers: API.OperationMethod<SetAvailableProductSetUsersRequest, SetAvailableProductSetUsersResponse, SetAvailableProductSetUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAvailableProductSetUsersRequest,
  output: SetAvailableProductSetUsersResponse,
  errors: [],
}));

/** Gets an existing web app. */
export interface GetWebappsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the web app. */
  webAppId: string;
}

export const GetWebappsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  webAppId: Schema.String.pipe(T.HttpPath("webAppId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/webApps/{webAppId}" }),
  svc,
) as unknown as Schema.Schema<GetWebappsRequest>;

export type GetWebappsResponse = WebApp;
export const GetWebappsResponse = WebApp;

export type GetWebappsError = CommonErrors;

export const getWebapps: API.OperationMethod<GetWebappsRequest, GetWebappsResponse, GetWebappsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetWebappsRequest,
  output: GetWebappsResponse,
  errors: [],
}));

/** Retrieves the details of all web apps for a given enterprise. */
export interface ListWebappsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
}

export const ListWebappsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
}).pipe(
  T.Http({ method: "GET", path: "androidenterprise/v1/enterprises/{enterpriseId}/webApps" }),
  svc,
) as unknown as Schema.Schema<ListWebappsRequest>;

export type ListWebappsResponse = WebAppsListResponse;
export const ListWebappsResponse = WebAppsListResponse;

export type ListWebappsError = CommonErrors;

export const listWebapps: API.OperationMethod<ListWebappsRequest, ListWebappsResponse, ListWebappsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListWebappsRequest,
  output: ListWebappsResponse,
  errors: [],
}));

/** Creates a new web app for the enterprise. */
export interface InsertWebappsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** Request body */
  body?: WebApp;
}

export const InsertWebappsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  body: Schema.optional(WebApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "androidenterprise/v1/enterprises/{enterpriseId}/webApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertWebappsRequest>;

export type InsertWebappsResponse = WebApp;
export const InsertWebappsResponse = WebApp;

export type InsertWebappsError = CommonErrors;

export const insertWebapps: API.OperationMethod<InsertWebappsRequest, InsertWebappsResponse, InsertWebappsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertWebappsRequest,
  output: InsertWebappsResponse,
  errors: [],
}));

/** Updates an existing web app. */
export interface UpdateWebappsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the web app. */
  webAppId: string;
  /** Request body */
  body?: WebApp;
}

export const UpdateWebappsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  webAppId: Schema.String.pipe(T.HttpPath("webAppId")),
  body: Schema.optional(WebApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "androidenterprise/v1/enterprises/{enterpriseId}/webApps/{webAppId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateWebappsRequest>;

export type UpdateWebappsResponse = WebApp;
export const UpdateWebappsResponse = WebApp;

export type UpdateWebappsError = CommonErrors;

export const updateWebapps: API.OperationMethod<UpdateWebappsRequest, UpdateWebappsResponse, UpdateWebappsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateWebappsRequest,
  output: UpdateWebappsResponse,
  errors: [],
}));

/** Deletes an existing web app. */
export interface DeleteWebappsRequest {
  /** The ID of the enterprise. */
  enterpriseId: string;
  /** The ID of the web app. */
  webAppId: string;
}

export const DeleteWebappsRequest = Schema.Struct({
  enterpriseId: Schema.String.pipe(T.HttpPath("enterpriseId")),
  webAppId: Schema.String.pipe(T.HttpPath("webAppId")),
}).pipe(
  T.Http({ method: "DELETE", path: "androidenterprise/v1/enterprises/{enterpriseId}/webApps/{webAppId}" }),
  svc,
) as unknown as Schema.Schema<DeleteWebappsRequest>;

export interface DeleteWebappsResponse {}
export const DeleteWebappsResponse: Schema.Schema<DeleteWebappsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteWebappsResponse>;

export type DeleteWebappsError = CommonErrors;

export const deleteWebapps: API.OperationMethod<DeleteWebappsRequest, DeleteWebappsResponse, DeleteWebappsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteWebappsRequest,
  output: DeleteWebappsResponse,
  errors: [],
}));

