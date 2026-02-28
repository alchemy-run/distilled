// ==========================================================================
// Android Management API (androidmanagement v1)
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
  name: "androidmanagement",
  version: "v1",
  rootUrl: "https://androidmanagement.googleapis.com/",
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
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SignupUrl {
  /** The name of the resource. Use this value in the signupUrl field when calling enterprises.create to complete the enterprise signup flow. */
  name?: string;
  /** A URL where an enterprise admin can register their enterprise. The page can't be rendered in an iframe. */
  url?: string;
}

export const SignupUrl: Schema.Schema<SignupUrl> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "SignupUrl" }) as any as Schema.Schema<SignupUrl>;

export interface ExternalData {
  /** The absolute URL to the data, which must use either the http or https scheme. Android Device Policy doesn't provide any credentials in the GET request, so the URL must be publicly accessible. Including a long, random component in the URL may be used to prevent attackers from discovering the URL. */
  url?: string;
  /** The base-64 encoded SHA-256 hash of the content hosted at url. If the content doesn't match this hash, Android Device Policy won't use the data. */
  sha256Hash?: string;
}

export const ExternalData: Schema.Schema<ExternalData> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  sha256Hash: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalData" }) as any as Schema.Schema<ExternalData>;

export interface UserFacingMessage {
  /** A map containing pairs, where locale is a well-formed BCP 47 language (https://www.w3.org/International/articles/language-tags/) code, such as en-US, es-ES, or fr. */
  localizedMessages?: Record<string, string>;
  /** The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided. */
  defaultMessage?: string;
}

export const UserFacingMessage: Schema.Schema<UserFacingMessage> = Schema.suspend(() => Schema.Struct({
  localizedMessages: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  defaultMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "UserFacingMessage" }) as any as Schema.Schema<UserFacingMessage>;

export interface TermsAndConditions {
  /** A short header which appears above the HTML content. */
  header?: UserFacingMessage;
  /** A well-formatted HTML string. It will be parsed on the client with android.text.Html#fromHtml. */
  content?: UserFacingMessage;
}

export const TermsAndConditions: Schema.Schema<TermsAndConditions> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(UserFacingMessage),
  content: Schema.optional(UserFacingMessage),
})).annotate({ identifier: "TermsAndConditions" }) as any as Schema.Schema<TermsAndConditions>;

export interface SigninDetail {
  /** Sign-in URL for authentication when device is provisioned with a sign-in enrollment token. The sign-in endpoint should finish authentication flow with a URL in the form of https://enterprise.google.com/android/enroll?et= for a successful login, or https://enterprise.google.com/android/enroll/invalid for a failed login. */
  signinUrl?: string;
  /** An enterprise wide enrollment token used to trigger custom sign-in flow. This is a read-only field generated by the server. */
  signinEnrollmentToken?: string;
  /** A JSON string whose UTF-8 representation can be used to generate a QR code to enroll a device with this enrollment token. To enroll a device using NFC, the NFC record must contain a serialized java.util.Properties representation of the properties in the JSON. This is a read-only field generated by the server. */
  qrCode?: string;
  /** Controls whether personal usage is allowed on a device provisioned with this enrollment token.For company-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage requires the user provision the device as a fully managed device.For personally-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage will prevent the device from provisioning. Personal usage cannot be disabled on personally-owned device. */
  allowPersonalUsage?: "ALLOW_PERSONAL_USAGE_UNSPECIFIED" | "PERSONAL_USAGE_ALLOWED" | "PERSONAL_USAGE_DISALLOWED" | "PERSONAL_USAGE_DISALLOWED_USERLESS" | (string & {});
  /** An EMM-specified metadata to distinguish between instances of SigninDetail. */
  tokenTag?: string;
  /** Optional. Whether the sign-in URL should be used by default for the enterprise. The SigninDetail with defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT is used for Google account enrollment method. Only one of an enterprise's signinDetails can have defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT. If an Enterprise has at least one signinDetails and none of them have defaultStatus set to SIGNIN_DETAIL_IS_DEFAULT then the first one from the list is selected and has set defaultStatus to SIGNIN_DETAIL_IS_DEFAULT. If no signinDetails specified for the Enterprise then the Google Account device enrollment will fail. */
  defaultStatus?: "SIGNIN_DETAIL_DEFAULT_STATUS_UNSPECIFIED" | "SIGNIN_DETAIL_IS_DEFAULT" | "SIGNIN_DETAIL_IS_NOT_DEFAULT" | (string & {});
}

export const SigninDetail: Schema.Schema<SigninDetail> = Schema.suspend(() => Schema.Struct({
  signinUrl: Schema.optional(Schema.String),
  signinEnrollmentToken: Schema.optional(Schema.String),
  qrCode: Schema.optional(Schema.String),
  allowPersonalUsage: Schema.optional(Schema.String),
  tokenTag: Schema.optional(Schema.String),
  defaultStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "SigninDetail" }) as any as Schema.Schema<SigninDetail>;

export interface ContactInfo {
  /** Email address for a point of contact, which will be used to send important announcements related to managed Google Play. */
  contactEmail?: string;
  /** The name of the data protection officer. */
  dataProtectionOfficerName?: string;
  /** The email of the data protection officer. The email is validated but not verified. */
  dataProtectionOfficerEmail?: string;
  /** The phone number of the data protection officer The phone number is validated but not verified. */
  dataProtectionOfficerPhone?: string;
  /** The name of the EU representative. */
  euRepresentativeName?: string;
  /** The email of the EU representative. The email is validated but not verified. */
  euRepresentativeEmail?: string;
  /** The phone number of the EU representative. The phone number is validated but not verified. */
  euRepresentativePhone?: string;
}

export const ContactInfo: Schema.Schema<ContactInfo> = Schema.suspend(() => Schema.Struct({
  contactEmail: Schema.optional(Schema.String),
  dataProtectionOfficerName: Schema.optional(Schema.String),
  dataProtectionOfficerEmail: Schema.optional(Schema.String),
  dataProtectionOfficerPhone: Schema.optional(Schema.String),
  euRepresentativeName: Schema.optional(Schema.String),
  euRepresentativeEmail: Schema.optional(Schema.String),
  euRepresentativePhone: Schema.optional(Schema.String),
})).annotate({ identifier: "ContactInfo" }) as any as Schema.Schema<ContactInfo>;

export interface GoogleAuthenticationSettings {
  /** Output only. Whether users need to be authenticated by Google during the enrollment process. IT admin can specify if Google authentication is enabled for the enterprise for knowledge worker devices. This value can be set only via the Google Admin Console. Google authentication can be used with signin_url In the case where Google authentication is required and a signin_url is specified, Google authentication will be launched before signin_url. This value is overridden by EnrollmentToken.googleAuthenticationOptions and SigninDetail.googleAuthenticationOptions, if they are set. */
  googleAuthenticationRequired?: "GOOGLE_AUTHENTICATION_REQUIRED_UNSPECIFIED" | "NOT_REQUIRED" | "REQUIRED" | (string & {});
}

export const GoogleAuthenticationSettings: Schema.Schema<GoogleAuthenticationSettings> = Schema.suspend(() => Schema.Struct({
  googleAuthenticationRequired: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleAuthenticationSettings" }) as any as Schema.Schema<GoogleAuthenticationSettings>;

export interface Enterprise {
  /** The name of the enterprise which is generated by the server during creation, in the form enterprises/{enterpriseId}. */
  name?: string;
  /** The types of Google Pub/Sub notifications enabled for the enterprise. */
  enabledNotificationTypes?: Array<"NOTIFICATION_TYPE_UNSPECIFIED" | "ENROLLMENT" | "COMPLIANCE_REPORT" | "STATUS_REPORT" | "COMMAND" | "USAGE_LOGS" | "ENTERPRISE_UPGRADE" | (string & {})>;
  /** The topic which Pub/Sub notifications are published to, in the form projects/{project}/topics/{topic}. This field is only required if Pub/Sub notifications are enabled. */
  pubsubTopic?: string;
  /** A color in RGB format that indicates the predominant color to display in the device management app UI. The color components are stored as follows: (red << 16) | (green << 8) | blue, where the value of each component is between 0 and 255, inclusive. */
  primaryColor?: number;
  /** An image displayed as a logo during device provisioning. Supported types are: image/bmp, image/gif, image/x-ico, image/jpeg, image/png, image/webp, image/vnd.wap.wbmp, image/x-adobe-dng. */
  logo?: ExternalData;
  /** The name of the enterprise displayed to users. This field has a maximum length of 100 characters. */
  enterpriseDisplayName?: string;
  /** Terms and conditions that must be accepted when provisioning a device for this enterprise. A page of terms is generated for each value in this list. */
  termsAndConditions?: Array<TermsAndConditions>;
  /** Deprecated and unused. */
  appAutoApprovalEnabled?: boolean;
  /** Sign-in details of the enterprise. */
  signinDetails?: Array<SigninDetail>;
  /** The enterprise contact info of an EMM-managed enterprise. */
  contactInfo?: ContactInfo;
  /** Settings for Google-provided user authentication. */
  googleAuthenticationSettings?: GoogleAuthenticationSettings;
  /** Output only. The type of the enterprise. */
  enterpriseType?: "ENTERPRISE_TYPE_UNSPECIFIED" | "MANAGED_GOOGLE_DOMAIN" | "MANAGED_GOOGLE_PLAY_ACCOUNTS_ENTERPRISE" | (string & {});
  /** Output only. The type of a managed Google Play Accounts enterprise. */
  managedGooglePlayAccountsEnterpriseType?: "MANAGED_GOOGLE_PLAY_ACCOUNTS_ENTERPRISE_TYPE_UNSPECIFIED" | "CUSTOMER_MANAGED" | "EMM_MANAGED" | (string & {});
  /** Output only. The type of managed Google domain. */
  managedGoogleDomainType?: "MANAGED_GOOGLE_DOMAIN_TYPE_UNSPECIFIED" | "TYPE_TEAM" | "TYPE_DOMAIN" | (string & {});
}

export const Enterprise: Schema.Schema<Enterprise> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enabledNotificationTypes: Schema.optional(Schema.Array(Schema.String)),
  pubsubTopic: Schema.optional(Schema.String),
  primaryColor: Schema.optional(Schema.Number),
  logo: Schema.optional(ExternalData),
  enterpriseDisplayName: Schema.optional(Schema.String),
  termsAndConditions: Schema.optional(Schema.Array(TermsAndConditions)),
  appAutoApprovalEnabled: Schema.optional(Schema.Boolean),
  signinDetails: Schema.optional(Schema.Array(SigninDetail)),
  contactInfo: Schema.optional(ContactInfo),
  googleAuthenticationSettings: Schema.optional(GoogleAuthenticationSettings),
  enterpriseType: Schema.optional(Schema.String),
  managedGooglePlayAccountsEnterpriseType: Schema.optional(Schema.String),
  managedGoogleDomainType: Schema.optional(Schema.String),
})).annotate({ identifier: "Enterprise" }) as any as Schema.Schema<Enterprise>;

export interface ListEnterprisesResponse {
  /** The list of enterprises. */
  enterprises?: Array<Enterprise>;
  /** If there are more results, a token to retrieve next page of results. */
  nextPageToken?: string;
}

export const ListEnterprisesResponse: Schema.Schema<ListEnterprisesResponse> = Schema.suspend(() => Schema.Struct({
  enterprises: Schema.optional(Schema.Array(Enterprise)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEnterprisesResponse" }) as any as Schema.Schema<ListEnterprisesResponse>;

export interface User {
  /** A unique identifier you create for this user, such as user342 or asset#44418. This field must be set when the user is created and can't be updated. This field must not contain personally identifiable information (PII). This identifier must be 1024 characters or less; otherwise, the update policy request will fail. */
  accountIdentifier?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  accountIdentifier: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface EnrollmentToken {
  /** The name of the enrollment token, which is generated by the server during creation, in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}. */
  name?: string;
  /** The token value that's passed to the device and authorizes the device to enroll. This is a read-only field generated by the server. */
  value?: string;
  /** The length of time the enrollment token is valid, ranging from 1 minute to Durations.MAX_VALUE (https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/util/Durations.html#MAX_VALUE), approximately 10,000 years. If not specified, the default duration is 1 hour. Please note that if requested duration causes the resulting expiration_timestamp to exceed Timestamps.MAX_VALUE (https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/util/Timestamps.html#MAX_VALUE), then expiration_timestamp is coerced to Timestamps.MAX_VALUE. */
  duration?: string;
  /** The expiration time of the token. This is a read-only field generated by the server. */
  expirationTimestamp?: string;
  /** The name of the policy initially applied to the enrolled device, in the form enterprises/{enterpriseId}/policies/{policyId}. If not specified, the policy_name for the device’s user is applied. If user_name is also not specified, enterprises/{enterpriseId}/policies/default is applied by default. When updating this field, you can specify only the policyId as long as the policyId doesn’t contain any slashes. The rest of the policy name will be inferred. */
  policyName?: string;
  /** Optional, arbitrary data associated with the enrollment token. This could contain, for example, the ID of an org unit the device is assigned to after enrollment. After a device enrolls with the token, this data will be exposed in the enrollment_token_data field of the Device resource. The data must be 1024 characters or less; otherwise, the creation request will fail. */
  additionalData?: string;
  /** A JSON string whose UTF-8 representation can be used to generate a QR code to enroll a device with this enrollment token. To enroll a device using NFC, the NFC record must contain a serialized java.util.Properties representation of the properties in the JSON. */
  qrCode?: string;
  /** Whether the enrollment token is for one time use only. If the flag is set to true, only one device can use it for registration. */
  oneTimeOnly?: boolean;
  /** This field is deprecated and the value is ignored. */
  user?: User;
  /** Controls whether personal usage is allowed on a device provisioned with this enrollment token.For company-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage requires the user provision the device as a fully managed device.For personally-owned devices: Enabling personal usage allows the user to set up a work profile on the device. Disabling personal usage will prevent the device from provisioning. Personal usage cannot be disabled on personally-owned device. */
  allowPersonalUsage?: "ALLOW_PERSONAL_USAGE_UNSPECIFIED" | "PERSONAL_USAGE_ALLOWED" | "PERSONAL_USAGE_DISALLOWED" | "PERSONAL_USAGE_DISALLOWED_USERLESS" | (string & {});
}

export const EnrollmentToken: Schema.Schema<EnrollmentToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  expirationTimestamp: Schema.optional(Schema.String),
  policyName: Schema.optional(Schema.String),
  additionalData: Schema.optional(Schema.String),
  qrCode: Schema.optional(Schema.String),
  oneTimeOnly: Schema.optional(Schema.Boolean),
  user: Schema.optional(User),
  allowPersonalUsage: Schema.optional(Schema.String),
})).annotate({ identifier: "EnrollmentToken" }) as any as Schema.Schema<EnrollmentToken>;

export interface ListEnrollmentTokensResponse {
  /** The list of enrollment tokens. */
  enrollmentTokens?: Array<EnrollmentToken>;
  /** If there are more results, a token to retrieve next page of results. */
  nextPageToken?: string;
}

export const ListEnrollmentTokensResponse: Schema.Schema<ListEnrollmentTokensResponse> = Schema.suspend(() => Schema.Struct({
  enrollmentTokens: Schema.optional(Schema.Array(EnrollmentToken)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEnrollmentTokensResponse" }) as any as Schema.Schema<ListEnrollmentTokensResponse>;

export interface WebToken {
  /** The name of the web token, which is generated by the server during creation in the form enterprises/{enterpriseId}/webTokens/{webTokenId}. */
  name?: string;
  /** The token value which is used in the hosting page to generate the iframe with the embedded UI. This is a read-only field generated by the server. */
  value?: string;
  /** Permissions available to an admin in the embedded UI. An admin must have all of these permissions in order to view the UI. This field is deprecated. */
  permissions?: Array<"WEB_TOKEN_PERMISSION_UNSPECIFIED" | "APPROVE_APPS" | (string & {})>;
  /** The URL of the parent frame hosting the iframe with the embedded UI. To prevent XSS, the iframe may not be hosted at other URLs. The URL must use the https scheme. */
  parentFrameUrl?: string;
  /** The features to enable. Use this if you want to control exactly which feature(s) will be activated; leave empty to allow all features.Restrictions / things to note: - If no features are listed here, all features are enabled — this is the default behavior where you give access to all features to your admins. - This must not contain any FEATURE_UNSPECIFIED values. - Repeated values are ignored */
  enabledFeatures?: Array<"FEATURE_UNSPECIFIED" | "PLAY_SEARCH" | "PRIVATE_APPS" | "WEB_APPS" | "STORE_BUILDER" | "MANAGED_CONFIGURATIONS" | "ZERO_TOUCH_CUSTOMER_MANAGEMENT" | (string & {})>;
}

export const WebToken: Schema.Schema<WebToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Schema.String)),
  parentFrameUrl: Schema.optional(Schema.String),
  enabledFeatures: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "WebToken" }) as any as Schema.Schema<WebToken>;

export interface GenerateEnterpriseUpgradeUrlRequest {
  /** Optional. A list of domains that are permitted for the admin email. The IT admin cannot enter an email address with a domain name that is not in this list. Subdomains of domains in this list are not allowed but can be allowed by adding a second entry which has *. prefixed to the domain name (e.g. *.example.com). If the field is not present or is an empty list then the IT admin is free to use any valid domain name. Personal email domains are not allowed. */
  allowedDomains?: Array<string>;
  /** Optional. Email address used to prefill the admin field of the enterprise signup form as part of the upgrade process. This value is a hint only and can be altered by the user. Personal email addresses are not allowed. If allowedDomains is non-empty then this must belong to one of the allowedDomains. */
  adminEmail?: string;
}

export const GenerateEnterpriseUpgradeUrlRequest: Schema.Schema<GenerateEnterpriseUpgradeUrlRequest> = Schema.suspend(() => Schema.Struct({
  allowedDomains: Schema.optional(Schema.Array(Schema.String)),
  adminEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateEnterpriseUpgradeUrlRequest" }) as any as Schema.Schema<GenerateEnterpriseUpgradeUrlRequest>;

export interface GenerateEnterpriseUpgradeUrlResponse {
  /** A URL for an enterprise admin to upgrade their enterprise. The page can't be rendered in an iframe. */
  url?: string;
}

export const GenerateEnterpriseUpgradeUrlResponse: Schema.Schema<GenerateEnterpriseUpgradeUrlResponse> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateEnterpriseUpgradeUrlResponse" }) as any as Schema.Schema<GenerateEnterpriseUpgradeUrlResponse>;

export interface OncWifiContext {
  /** The GUID of non-compliant Wi-Fi configuration. */
  wifiGuid?: string;
}

export const OncWifiContext: Schema.Schema<OncWifiContext> = Schema.suspend(() => Schema.Struct({
  wifiGuid: Schema.optional(Schema.String),
})).annotate({ identifier: "OncWifiContext" }) as any as Schema.Schema<OncWifiContext>;

export interface PasswordPoliciesContext {
  /** The scope of non-compliant password. */
  passwordPolicyScope?: "SCOPE_UNSPECIFIED" | "SCOPE_DEVICE" | "SCOPE_PROFILE" | (string & {});
}

export const PasswordPoliciesContext: Schema.Schema<PasswordPoliciesContext> = Schema.suspend(() => Schema.Struct({
  passwordPolicyScope: Schema.optional(Schema.String),
})).annotate({ identifier: "PasswordPoliciesContext" }) as any as Schema.Schema<PasswordPoliciesContext>;

export interface DefaultApplicationContext {
  /** Output only. The scope of non-compliant default application setting. */
  defaultApplicationScope?: "DEFAULT_APPLICATION_SCOPE_UNSPECIFIED" | "SCOPE_FULLY_MANAGED" | "SCOPE_WORK_PROFILE" | "SCOPE_PERSONAL_PROFILE" | (string & {});
}

export const DefaultApplicationContext: Schema.Schema<DefaultApplicationContext> = Schema.suspend(() => Schema.Struct({
  defaultApplicationScope: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultApplicationContext" }) as any as Schema.Schema<DefaultApplicationContext>;

export interface SpecificNonComplianceContext {
  /** Additional context for non-compliance related to Wi-Fi configuration. See ONC_WIFI_INVALID_VALUE and ONC_WIFI_API_LEVEL */
  oncWifiContext?: OncWifiContext;
  /** Additional context for non-compliance related to password policies. See PASSWORD_POLICIES_PASSWORD_EXPIRED and PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT. */
  passwordPoliciesContext?: PasswordPoliciesContext;
  /** Output only. Additional context for non-compliance related to default application settings. See DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE. */
  defaultApplicationContext?: DefaultApplicationContext;
}

export const SpecificNonComplianceContext: Schema.Schema<SpecificNonComplianceContext> = Schema.suspend(() => Schema.Struct({
  oncWifiContext: Schema.optional(OncWifiContext),
  passwordPoliciesContext: Schema.optional(PasswordPoliciesContext),
  defaultApplicationContext: Schema.optional(DefaultApplicationContext),
})).annotate({ identifier: "SpecificNonComplianceContext" }) as any as Schema.Schema<SpecificNonComplianceContext>;

export interface NonComplianceDetail {
  /** The name of the policy setting. This is the JSON field name of a top-level Policy field. */
  settingName?: string;
  /** The reason the device is not in compliance with the setting. */
  nonComplianceReason?: "NON_COMPLIANCE_REASON_UNSPECIFIED" | "API_LEVEL" | "MANAGEMENT_MODE" | "USER_ACTION" | "INVALID_VALUE" | "APP_NOT_INSTALLED" | "UNSUPPORTED" | "APP_INSTALLED" | "PENDING" | "APP_INCOMPATIBLE" | "APP_NOT_UPDATED" | "DEVICE_INCOMPATIBLE" | "APP_SIGNING_CERT_MISMATCH" | "PROJECT_NOT_PERMITTED" | (string & {});
  /** The package name indicating which app is out of compliance, if applicable. */
  packageName?: string;
  /** For settings with nested fields, if a particular nested field is out of compliance, this specifies the full path to the offending field. The path is formatted in the same way the policy JSON field would be referenced in JavaScript, that is: 1) For object-typed fields, the field name is followed by a dot then by a subfield name. 2) For array-typed fields, the field name is followed by the array index enclosed in brackets. For example, to indicate a problem with the url field in the externalData field in the 3rd application, the path would be applications[2].externalData.url */
  fieldPath?: string;
  /** If the policy setting could not be applied, the current value of the setting on the device. */
  currentValue?: unknown;
  /** If package_name is set and the non-compliance reason is APP_NOT_INSTALLED or APP_NOT_UPDATED, the detailed reason the app can't be installed or updated. */
  installationFailureReason?: "INSTALLATION_FAILURE_REASON_UNSPECIFIED" | "INSTALLATION_FAILURE_REASON_UNKNOWN" | "IN_PROGRESS" | "NOT_FOUND" | "NOT_COMPATIBLE_WITH_DEVICE" | "NOT_APPROVED" | "PERMISSIONS_NOT_ACCEPTED" | "NOT_AVAILABLE_IN_COUNTRY" | "NO_LICENSES_REMAINING" | "NOT_ENROLLED" | "USER_INVALID" | "NETWORK_ERROR_UNRELIABLE_CONNECTION" | "INSUFFICIENT_STORAGE" | (string & {});
  /** The policy-specific reason the device is not in compliance with the setting. */
  specificNonComplianceReason?: "SPECIFIC_NON_COMPLIANCE_REASON_UNSPECIFIED" | "PASSWORD_POLICIES_USER_CREDENTIALS_CONFIRMATION_REQUIRED" | "PASSWORD_POLICIES_PASSWORD_EXPIRED" | "PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT" | "ONC_WIFI_INVALID_VALUE" | "ONC_WIFI_API_LEVEL" | "ONC_WIFI_INVALID_ENTERPRISE_CONFIG" | "ONC_WIFI_USER_SHOULD_REMOVE_NETWORK" | "ONC_WIFI_KEY_PAIR_ALIAS_NOT_CORRESPONDING_TO_EXISTING_KEY" | "PERMISSIBLE_USAGE_RESTRICTION" | "REQUIRED_ACCOUNT_NOT_IN_ENTERPRISE" | "NEW_ACCOUNT_NOT_IN_ENTERPRISE" | "DEFAULT_APPLICATION_SETTING_UNSUPPORTED_SCOPES" | "DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE" | "PRIVATE_DNS_HOST_NOT_SERVING" | (string & {});
  /** Additional context for specific_non_compliance_reason. */
  specificNonComplianceContext?: SpecificNonComplianceContext;
}

export const NonComplianceDetail: Schema.Schema<NonComplianceDetail> = Schema.suspend(() => Schema.Struct({
  settingName: Schema.optional(Schema.String),
  nonComplianceReason: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  fieldPath: Schema.optional(Schema.String),
  currentValue: Schema.optional(Schema.Unknown),
  installationFailureReason: Schema.optional(Schema.String),
  specificNonComplianceReason: Schema.optional(Schema.String),
  specificNonComplianceContext: Schema.optional(SpecificNonComplianceContext),
})).annotate({ identifier: "NonComplianceDetail" }) as any as Schema.Schema<NonComplianceDetail>;

export interface SystemUpdateInfo {
  /** The status of an update: whether an update exists and what type it is. */
  updateStatus?: "UPDATE_STATUS_UNKNOWN" | "UP_TO_DATE" | "UNKNOWN_UPDATE_AVAILABLE" | "SECURITY_UPDATE_AVAILABLE" | "OS_UPDATE_AVAILABLE" | (string & {});
  /** The time when the update was first available. A zero value indicates that this field is not set. This field is set only if an update is available (that is, updateStatus is neither UPDATE_STATUS_UNKNOWN nor UP_TO_DATE). */
  updateReceivedTime?: string;
}

export const SystemUpdateInfo: Schema.Schema<SystemUpdateInfo> = Schema.suspend(() => Schema.Struct({
  updateStatus: Schema.optional(Schema.String),
  updateReceivedTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SystemUpdateInfo" }) as any as Schema.Schema<SystemUpdateInfo>;

export interface SoftwareInfo {
  /** The user-visible Android version string. For example, 6.0.1. */
  androidVersion?: string;
  /** The Android Device Policy app version code. */
  androidDevicePolicyVersionCode?: number;
  /** The Android Device Policy app version as displayed to the user. */
  androidDevicePolicyVersionName?: string;
  /** Android build ID string meant for displaying to the user. For example, shamu-userdebug 6.0.1 MOB30I 2756745 dev-keys. */
  androidBuildNumber?: string;
  /** Kernel version, for example, 2.6.32.9-g103d848. */
  deviceKernelVersion?: string;
  /** The system bootloader version number, e.g. 0.6.7. */
  bootloaderVersion?: string;
  /** Build time. */
  androidBuildTime?: string;
  /** Security patch level, e.g. 2016-05-01. */
  securityPatchLevel?: string;
  /** An IETF BCP 47 language code for the primary locale on the device. */
  primaryLanguageCode?: string;
  /** SHA-256 hash of android.content.pm.Signature (https://developer.android.com/reference/android/content/pm/Signature.html) associated with the system package, which can be used to verify that the system build hasn't been modified. */
  deviceBuildSignature?: string;
  /** Information about a potential pending system update. */
  systemUpdateInfo?: SystemUpdateInfo;
}

export const SoftwareInfo: Schema.Schema<SoftwareInfo> = Schema.suspend(() => Schema.Struct({
  androidVersion: Schema.optional(Schema.String),
  androidDevicePolicyVersionCode: Schema.optional(Schema.Number),
  androidDevicePolicyVersionName: Schema.optional(Schema.String),
  androidBuildNumber: Schema.optional(Schema.String),
  deviceKernelVersion: Schema.optional(Schema.String),
  bootloaderVersion: Schema.optional(Schema.String),
  androidBuildTime: Schema.optional(Schema.String),
  securityPatchLevel: Schema.optional(Schema.String),
  primaryLanguageCode: Schema.optional(Schema.String),
  deviceBuildSignature: Schema.optional(Schema.String),
  systemUpdateInfo: Schema.optional(SystemUpdateInfo),
})).annotate({ identifier: "SoftwareInfo" }) as any as Schema.Schema<SoftwareInfo>;

export interface EuiccChipInfo {
  /** Output only. The Embedded Identity Document (EID) that identifies the eUICC chip for each eUICC chip on the device. This is available on company owned devices running Android 13 and above. */
  eid?: string;
}

export const EuiccChipInfo: Schema.Schema<EuiccChipInfo> = Schema.suspend(() => Schema.Struct({
  eid: Schema.optional(Schema.String),
})).annotate({ identifier: "EuiccChipInfo" }) as any as Schema.Schema<EuiccChipInfo>;

export interface HardwareInfo {
  /** Brand of the device. For example, Google. */
  brand?: string;
  /** Name of the hardware. For example, Angler. */
  hardware?: string;
  /** Baseband version. For example, MDM9625_104662.22.05.34p. */
  deviceBasebandVersion?: string;
  /** Manufacturer. For example, Motorola. */
  manufacturer?: string;
  /** The device serial number. However, for personally-owned devices running Android 12 and above, this is the same as the enterpriseSpecificId. */
  serialNumber?: string;
  /** The model of the device. For example, Asus Nexus 7. */
  model?: string;
  /** Battery shutdown temperature thresholds in Celsius for each battery on the device. */
  batteryShutdownTemperatures?: Array<number>;
  /** Battery throttling temperature thresholds in Celsius for each battery on the device. */
  batteryThrottlingTemperatures?: Array<number>;
  /** CPU shutdown temperature thresholds in Celsius for each CPU on the device. */
  cpuShutdownTemperatures?: Array<number>;
  /** CPU throttling temperature thresholds in Celsius for each CPU on the device. */
  cpuThrottlingTemperatures?: Array<number>;
  /** GPU shutdown temperature thresholds in Celsius for each GPU on the device. */
  gpuShutdownTemperatures?: Array<number>;
  /** GPU throttling temperature thresholds in Celsius for each GPU on the device. */
  gpuThrottlingTemperatures?: Array<number>;
  /** Device skin shutdown temperature thresholds in Celsius. */
  skinShutdownTemperatures?: Array<number>;
  /** Device skin throttling temperature thresholds in Celsius. */
  skinThrottlingTemperatures?: Array<number>;
  /** Output only. ID that uniquely identifies a personally-owned device in a particular organization. On the same physical device when enrolled with the same organization, this ID persists across setups and even factory resets. This ID is available on personally-owned devices with a work profile on devices running Android 12 and above. */
  enterpriseSpecificId?: string;
  /** Output only. Information related to the eUICC chip. */
  euiccChipInfo?: Array<EuiccChipInfo>;
}

export const HardwareInfo: Schema.Schema<HardwareInfo> = Schema.suspend(() => Schema.Struct({
  brand: Schema.optional(Schema.String),
  hardware: Schema.optional(Schema.String),
  deviceBasebandVersion: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  batteryShutdownTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  batteryThrottlingTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  cpuShutdownTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  cpuThrottlingTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  gpuShutdownTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  gpuThrottlingTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  skinShutdownTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  skinThrottlingTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  enterpriseSpecificId: Schema.optional(Schema.String),
  euiccChipInfo: Schema.optional(Schema.Array(EuiccChipInfo)),
})).annotate({ identifier: "HardwareInfo" }) as any as Schema.Schema<HardwareInfo>;

export interface Display {
  /** Name of the display. */
  name?: string;
  /** Unique display id. */
  displayId?: number;
  /** Refresh rate of the display in frames per second. */
  refreshRate?: number;
  /** State of the display. */
  state?: "DISPLAY_STATE_UNSPECIFIED" | "OFF" | "ON" | "DOZE" | "SUSPENDED" | (string & {});
  /** Display width in pixels. */
  width?: number;
  /** Display height in pixels. */
  height?: number;
  /** Display density expressed as dots-per-inch. */
  density?: number;
}

export const Display: Schema.Schema<Display> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayId: Schema.optional(Schema.Number),
  refreshRate: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  density: Schema.optional(Schema.Number),
})).annotate({ identifier: "Display" }) as any as Schema.Schema<Display>;

export interface ApplicationEvent {
  /** App event type. */
  eventType?: "APPLICATION_EVENT_TYPE_UNSPECIFIED" | "INSTALLED" | "CHANGED" | "DATA_CLEARED" | "REMOVED" | "REPLACED" | "RESTARTED" | "PINNED" | "UNPINNED" | (string & {});
  /** The creation time of the event. */
  createTime?: string;
}

export const ApplicationEvent: Schema.Schema<ApplicationEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationEvent" }) as any as Schema.Schema<ApplicationEvent>;

export interface KeyedAppState {
  /** The key for the app state. Acts as a point of reference for what the app is providing state for. For example, when providing managed configuration feedback, this key could be the managed configuration key. */
  key?: string;
  /** The severity of the app state. */
  severity?: "SEVERITY_UNSPECIFIED" | "INFO" | "ERROR" | (string & {});
  /** Optionally, a free-form message string to explain the app state. If the state was triggered by a particular value (e.g. a managed configuration value), it should be included in the message. */
  message?: string;
  /** Optionally, a machine-readable value to be read by the EMM. For example, setting values that the admin can choose to query against in the EMM console (e.g. “notify me if the battery_warning data < 10”). */
  data?: string;
  /** The creation time of the app state on the device. */
  createTime?: string;
  /** The time the app state was most recently updated. */
  lastUpdateTime?: string;
}

export const KeyedAppState: Schema.Schema<KeyedAppState> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyedAppState" }) as any as Schema.Schema<KeyedAppState>;

export interface ApplicationReport {
  /** Package name of the app. */
  packageName?: string;
  /** The app version as displayed to the user. */
  versionName?: string;
  /** The app version code, which can be used to determine whether one version is more recent than another. */
  versionCode?: number;
  /** The list of app events which have occurred in the last 30 hours. */
  events?: Array<ApplicationEvent>;
  /** The display name of the app. */
  displayName?: string;
  /** The SHA-256 hash of the app's APK file, which can be used to verify the app hasn't been modified. Each byte of the hash value is represented as a two-digit hexadecimal number. */
  packageSha256Hash?: string;
  /** The SHA-1 hash of each android.content.pm.Signature (https://developer.android.com/reference/android/content/pm/Signature.html) associated with the app package. Each byte of each hash value is represented as a two-digit hexadecimal number. */
  signingKeyCertFingerprints?: Array<string>;
  /** The package name of the app that installed this app. */
  installerPackageName?: string;
  /** The source of the package. */
  applicationSource?: "APPLICATION_SOURCE_UNSPECIFIED" | "SYSTEM_APP_FACTORY_VERSION" | "SYSTEM_APP_UPDATED_VERSION" | "INSTALLED_FROM_PLAY_STORE" | "CUSTOM" | (string & {});
  /** Application state. */
  state?: "APPLICATION_STATE_UNSPECIFIED" | "REMOVED" | "INSTALLED" | (string & {});
  /** List of keyed app states reported by the app. */
  keyedAppStates?: Array<KeyedAppState>;
  /** Whether the app is user facing. */
  userFacingType?: "USER_FACING_TYPE_UNSPECIFIED" | "NOT_USER_FACING" | "USER_FACING" | (string & {});
}

export const ApplicationReport: Schema.Schema<ApplicationReport> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  versionName: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.Number),
  events: Schema.optional(Schema.Array(ApplicationEvent)),
  displayName: Schema.optional(Schema.String),
  packageSha256Hash: Schema.optional(Schema.String),
  signingKeyCertFingerprints: Schema.optional(Schema.Array(Schema.String)),
  installerPackageName: Schema.optional(Schema.String),
  applicationSource: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  keyedAppStates: Schema.optional(Schema.Array(KeyedAppState)),
  userFacingType: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationReport" }) as any as Schema.Schema<ApplicationReport>;

export interface TelephonyInfo {
  /** The phone number associated with this SIM card. */
  phoneNumber?: string;
  /** The carrier name associated with this SIM card. */
  carrierName?: string;
  /** Output only. The ICCID associated with this SIM card. */
  iccId?: string;
  /** Output only. Activation state of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always ACTIVATION_STATE_UNSPECIFIED for physical SIMs and for devices below Android 15. */
  activationState?: "ACTIVATION_STATE_UNSPECIFIED" | "ACTIVATED" | "NOT_ACTIVATED" | (string & {});
  /** Output only. The configuration mode of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always CONFIG_MODE_UNSPECIFIED for physical SIMs and for devices below Android 15. */
  configMode?: "CONFIG_MODE_UNSPECIFIED" | "ADMIN_CONFIGURED" | "USER_CONFIGURED" | (string & {});
}

export const TelephonyInfo: Schema.Schema<TelephonyInfo> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  carrierName: Schema.optional(Schema.String),
  iccId: Schema.optional(Schema.String),
  activationState: Schema.optional(Schema.String),
  configMode: Schema.optional(Schema.String),
})).annotate({ identifier: "TelephonyInfo" }) as any as Schema.Schema<TelephonyInfo>;

export interface NetworkInfo {
  /** IMEI number of the GSM device. For example, A1000031212. */
  imei?: string;
  /** MEID number of the CDMA device. For example, A00000292788E1. */
  meid?: string;
  /** Wi-Fi MAC address of the device. For example, 7c:11:11:11:11:11. */
  wifiMacAddress?: string;
  /** Alphabetic name of current registered operator. For example, Vodafone. */
  networkOperatorName?: string;
  /** Provides telephony information associated with each SIM card on the device. Only supported on fully managed devices starting from Android 6. */
  telephonyInfos?: Array<TelephonyInfo>;
}

export const NetworkInfo: Schema.Schema<NetworkInfo> = Schema.suspend(() => Schema.Struct({
  imei: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  wifiMacAddress: Schema.optional(Schema.String),
  networkOperatorName: Schema.optional(Schema.String),
  telephonyInfos: Schema.optional(Schema.Array(TelephonyInfo)),
})).annotate({ identifier: "NetworkInfo" }) as any as Schema.Schema<NetworkInfo>;

export interface MemoryInfo {
  /** Total RAM on device in bytes. */
  totalRam?: string;
  /** Total internal storage on device in bytes. */
  totalInternalStorage?: string;
}

export const MemoryInfo: Schema.Schema<MemoryInfo> = Schema.suspend(() => Schema.Struct({
  totalRam: Schema.optional(Schema.String),
  totalInternalStorage: Schema.optional(Schema.String),
})).annotate({ identifier: "MemoryInfo" }) as any as Schema.Schema<MemoryInfo>;

export interface MemoryEvent {
  /** Event type. */
  eventType?: "MEMORY_EVENT_TYPE_UNSPECIFIED" | "RAM_MEASURED" | "INTERNAL_STORAGE_MEASURED" | "EXTERNAL_STORAGE_DETECTED" | "EXTERNAL_STORAGE_REMOVED" | "EXTERNAL_STORAGE_MEASURED" | (string & {});
  /** The creation time of the event. */
  createTime?: string;
  /** The number of free bytes in the medium, or for EXTERNAL_STORAGE_DETECTED, the total capacity in bytes of the storage medium. */
  byteCount?: string;
}

export const MemoryEvent: Schema.Schema<MemoryEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  byteCount: Schema.optional(Schema.String),
})).annotate({ identifier: "MemoryEvent" }) as any as Schema.Schema<MemoryEvent>;

export interface PowerManagementEvent {
  /** Event type. */
  eventType?: "POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED" | "BATTERY_LEVEL_COLLECTED" | "POWER_CONNECTED" | "POWER_DISCONNECTED" | "BATTERY_LOW" | "BATTERY_OKAY" | "BOOT_COMPLETED" | "SHUTDOWN" | (string & {});
  /** The creation time of the event. */
  createTime?: string;
  /** For BATTERY_LEVEL_COLLECTED events, the battery level as a percentage. */
  batteryLevel?: number;
}

export const PowerManagementEvent: Schema.Schema<PowerManagementEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  batteryLevel: Schema.optional(Schema.Number),
})).annotate({ identifier: "PowerManagementEvent" }) as any as Schema.Schema<PowerManagementEvent>;

export interface HardwareStatus {
  /** The time the measurements were taken. */
  createTime?: string;
  /** Current battery temperatures in Celsius for each battery on the device. */
  batteryTemperatures?: Array<number>;
  /** Current CPU temperatures in Celsius for each CPU on the device. */
  cpuTemperatures?: Array<number>;
  /** Current GPU temperatures in Celsius for each GPU on the device. */
  gpuTemperatures?: Array<number>;
  /** Current device skin temperatures in Celsius. */
  skinTemperatures?: Array<number>;
  /** Fan speeds in RPM for each fan on the device. Empty array means that there are no fans or fan speed is not supported on the system. */
  fanSpeeds?: Array<number>;
  /** CPU usages in percentage for each core available on the device. Usage is 0 for each unplugged core. Empty array implies that CPU usage is not supported in the system. */
  cpuUsages?: Array<number>;
}

export const HardwareStatus: Schema.Schema<HardwareStatus> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  batteryTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  cpuTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  gpuTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  skinTemperatures: Schema.optional(Schema.Array(Schema.Number)),
  fanSpeeds: Schema.optional(Schema.Array(Schema.Number)),
  cpuUsages: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "HardwareStatus" }) as any as Schema.Schema<HardwareStatus>;

export interface DeviceSettings {
  /** Whether the device is secured with PIN/password. */
  isDeviceSecure?: boolean;
  /** Whether installing apps from unknown sources is enabled. */
  unknownSourcesEnabled?: boolean;
  /** Whether developer mode is enabled on the device. */
  developmentSettingsEnabled?: boolean;
  /** Whether ADB (https://developer.android.com/studio/command-line/adb.html) is enabled on the device. */
  adbEnabled?: boolean;
  /** Whether the storage encryption is enabled. */
  isEncrypted?: boolean;
  /** Encryption status from DevicePolicyManager. */
  encryptionStatus?: "ENCRYPTION_STATUS_UNSPECIFIED" | "UNSUPPORTED" | "INACTIVE" | "ACTIVATING" | "ACTIVE" | "ACTIVE_DEFAULT_KEY" | "ACTIVE_PER_USER" | (string & {});
  /** Whether Google Play Protect verification (https://support.google.com/accounts/answer/2812853) is enforced on the device. */
  verifyAppsEnabled?: boolean;
}

export const DeviceSettings: Schema.Schema<DeviceSettings> = Schema.suspend(() => Schema.Struct({
  isDeviceSecure: Schema.optional(Schema.Boolean),
  unknownSourcesEnabled: Schema.optional(Schema.Boolean),
  developmentSettingsEnabled: Schema.optional(Schema.Boolean),
  adbEnabled: Schema.optional(Schema.Boolean),
  isEncrypted: Schema.optional(Schema.Boolean),
  encryptionStatus: Schema.optional(Schema.String),
  verifyAppsEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DeviceSettings" }) as any as Schema.Schema<DeviceSettings>;

export interface PostureDetail {
  /** A specific security risk that negatively affects the security posture of the device. */
  securityRisk?: "SECURITY_RISK_UNSPECIFIED" | "UNKNOWN_OS" | "COMPROMISED_OS" | "HARDWARE_BACKED_EVALUATION_FAILED" | (string & {});
  /** Corresponding admin-facing advice to mitigate this security risk and improve the security posture of the device. */
  advice?: Array<UserFacingMessage>;
}

export const PostureDetail: Schema.Schema<PostureDetail> = Schema.suspend(() => Schema.Struct({
  securityRisk: Schema.optional(Schema.String),
  advice: Schema.optional(Schema.Array(UserFacingMessage)),
})).annotate({ identifier: "PostureDetail" }) as any as Schema.Schema<PostureDetail>;

export interface SecurityPosture {
  /** Device's security posture value. */
  devicePosture?: "POSTURE_UNSPECIFIED" | "SECURE" | "AT_RISK" | "POTENTIALLY_COMPROMISED" | (string & {});
  /** Additional details regarding the security posture of the device. */
  postureDetails?: Array<PostureDetail>;
}

export const SecurityPosture: Schema.Schema<SecurityPosture> = Schema.suspend(() => Schema.Struct({
  devicePosture: Schema.optional(Schema.String),
  postureDetails: Schema.optional(Schema.Array(PostureDetail)),
})).annotate({ identifier: "SecurityPosture" }) as any as Schema.Schema<SecurityPosture>;

export interface CommonCriteriaModeInfo {
  /** Whether Common Criteria Mode is enabled. */
  commonCriteriaModeStatus?: "COMMON_CRITERIA_MODE_STATUS_UNKNOWN" | "COMMON_CRITERIA_MODE_DISABLED" | "COMMON_CRITERIA_MODE_ENABLED" | (string & {});
  /** Output only. The status of policy signature verification. */
  policySignatureVerificationStatus?: "POLICY_SIGNATURE_VERIFICATION_STATUS_UNSPECIFIED" | "POLICY_SIGNATURE_VERIFICATION_DISABLED" | "POLICY_SIGNATURE_VERIFICATION_SUCCEEDED" | "POLICY_SIGNATURE_VERIFICATION_NOT_SUPPORTED" | "POLICY_SIGNATURE_VERIFICATION_FAILED" | (string & {});
}

export const CommonCriteriaModeInfo: Schema.Schema<CommonCriteriaModeInfo> = Schema.suspend(() => Schema.Struct({
  commonCriteriaModeStatus: Schema.optional(Schema.String),
  policySignatureVerificationStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "CommonCriteriaModeInfo" }) as any as Schema.Schema<CommonCriteriaModeInfo>;

export interface PasswordRequirements {
  /** The minimum allowed password length. A value of 0 means there is no restriction. Only enforced when password_quality is NUMERIC, NUMERIC_COMPLEX, ALPHABETIC, ALPHANUMERIC, or COMPLEX. */
  passwordMinimumLength?: number;
  /** Minimum number of letters required in the password. Only enforced when password_quality is COMPLEX. */
  passwordMinimumLetters?: number;
  /** Minimum number of lower case letters required in the password. Only enforced when password_quality is COMPLEX. */
  passwordMinimumLowerCase?: number;
  /** Minimum number of non-letter characters (numerical digits or symbols) required in the password. Only enforced when password_quality is COMPLEX. */
  passwordMinimumNonLetter?: number;
  /** Minimum number of numerical digits required in the password. Only enforced when password_quality is COMPLEX. */
  passwordMinimumNumeric?: number;
  /** Minimum number of symbols required in the password. Only enforced when password_quality is COMPLEX. */
  passwordMinimumSymbols?: number;
  /** Minimum number of upper case letters required in the password. Only enforced when password_quality is COMPLEX. */
  passwordMinimumUpperCase?: number;
  /** The required password quality. */
  passwordQuality?: "PASSWORD_QUALITY_UNSPECIFIED" | "BIOMETRIC_WEAK" | "SOMETHING" | "NUMERIC" | "NUMERIC_COMPLEX" | "ALPHABETIC" | "ALPHANUMERIC" | "COMPLEX" | "COMPLEXITY_LOW" | "COMPLEXITY_MEDIUM" | "COMPLEXITY_HIGH" | (string & {});
  /** The length of the password history. After setting this field, the user won't be able to enter a new password that is the same as any password in the history. A value of 0 means there is no restriction. */
  passwordHistoryLength?: number;
  /** Number of incorrect device-unlock passwords that can be entered before a device is wiped. A value of 0 means there is no restriction. */
  maximumFailedPasswordsForWipe?: number;
  /** Password expiration timeout. */
  passwordExpirationTimeout?: string;
  /** The scope that the password requirement applies to. */
  passwordScope?: "SCOPE_UNSPECIFIED" | "SCOPE_DEVICE" | "SCOPE_PROFILE" | (string & {});
  /** The length of time after a device or work profile is unlocked using a strong form of authentication (password, PIN, pattern) that it can be unlocked using any other authentication method (e.g. fingerprint, trust agents, face). After the specified time period elapses, only strong forms of authentication can be used to unlock the device or work profile. */
  requirePasswordUnlock?: "REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED" | "USE_DEFAULT_DEVICE_TIMEOUT" | "REQUIRE_EVERY_DAY" | (string & {});
  /** Controls whether a unified lock is allowed for the device and the work profile, on devices running Android 9 and above with a work profile. This can be set only if password_scope is set to SCOPE_PROFILE, the policy will be rejected otherwise. If user has not set a separate work lock and this field is set to REQUIRE_SEPARATE_WORK_LOCK, a NonComplianceDetail is reported with nonComplianceReason set to USER_ACTION. */
  unifiedLockSettings?: "UNIFIED_LOCK_SETTINGS_UNSPECIFIED" | "ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK" | "REQUIRE_SEPARATE_WORK_LOCK" | (string & {});
}

export const PasswordRequirements: Schema.Schema<PasswordRequirements> = Schema.suspend(() => Schema.Struct({
  passwordMinimumLength: Schema.optional(Schema.Number),
  passwordMinimumLetters: Schema.optional(Schema.Number),
  passwordMinimumLowerCase: Schema.optional(Schema.Number),
  passwordMinimumNonLetter: Schema.optional(Schema.Number),
  passwordMinimumNumeric: Schema.optional(Schema.Number),
  passwordMinimumSymbols: Schema.optional(Schema.Number),
  passwordMinimumUpperCase: Schema.optional(Schema.Number),
  passwordQuality: Schema.optional(Schema.String),
  passwordHistoryLength: Schema.optional(Schema.Number),
  maximumFailedPasswordsForWipe: Schema.optional(Schema.Number),
  passwordExpirationTimeout: Schema.optional(Schema.String),
  passwordScope: Schema.optional(Schema.String),
  requirePasswordUnlock: Schema.optional(Schema.String),
  unifiedLockSettings: Schema.optional(Schema.String),
})).annotate({ identifier: "PasswordRequirements" }) as any as Schema.Schema<PasswordRequirements>;

export interface DpcMigrationInfo {
  /** Output only. If this device was migrated from another DPC, this is its package name. Not populated otherwise. */
  previousDpc?: string;
  /** Output only. If this device was migrated from another DPC, the additionalData field of the migration token is populated here. */
  additionalData?: string;
}

export const DpcMigrationInfo: Schema.Schema<DpcMigrationInfo> = Schema.suspend(() => Schema.Struct({
  previousDpc: Schema.optional(Schema.String),
  additionalData: Schema.optional(Schema.String),
})).annotate({ identifier: "DpcMigrationInfo" }) as any as Schema.Schema<DpcMigrationInfo>;

export interface DefaultApplicationSettingAttempt {
  /** Output only. The package name of the attempted application. */
  packageName?: string;
  /** Output only. The outcome of setting the app as the default. */
  attemptOutcome?: "ATTEMPT_OUTCOME_UNSPECIFIED" | "SUCCESS" | "APP_NOT_INSTALLED" | "APP_SIGNING_CERT_MISMATCH" | "OTHER_FAILURE" | (string & {});
}

export const DefaultApplicationSettingAttempt: Schema.Schema<DefaultApplicationSettingAttempt> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  attemptOutcome: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultApplicationSettingAttempt" }) as any as Schema.Schema<DefaultApplicationSettingAttempt>;

export interface DefaultApplicationInfo {
  /** Output only. The default application type. */
  defaultApplicationType?: "DEFAULT_APPLICATION_TYPE_UNSPECIFIED" | "DEFAULT_ASSISTANT" | "DEFAULT_BROWSER" | "DEFAULT_CALL_REDIRECTION" | "DEFAULT_CALL_SCREENING" | "DEFAULT_DIALER" | "DEFAULT_HOME" | "DEFAULT_SMS" | "DEFAULT_WALLET" | (string & {});
  /** Output only. The package name of the current default application. */
  packageName?: string;
  /** Output only. Details on the default application setting attempts, in the same order as listed in defaultApplications. */
  defaultApplicationSettingAttempts?: Array<DefaultApplicationSettingAttempt>;
}

export const DefaultApplicationInfo: Schema.Schema<DefaultApplicationInfo> = Schema.suspend(() => Schema.Struct({
  defaultApplicationType: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  defaultApplicationSettingAttempts: Schema.optional(Schema.Array(DefaultApplicationSettingAttempt)),
})).annotate({ identifier: "DefaultApplicationInfo" }) as any as Schema.Schema<DefaultApplicationInfo>;

export interface Device {
  /** The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}. */
  name?: string;
  /** The resource name of the user that owns this device in the form enterprises/{enterpriseId}/users/{userId}. */
  userName?: string;
  /** The type of management mode Android Device Policy takes on the device. This influences which policy settings are supported. */
  managementMode?: "MANAGEMENT_MODE_UNSPECIFIED" | "DEVICE_OWNER" | "PROFILE_OWNER" | (string & {});
  /** The state to be applied to the device. This field can be modified by a patch request. Note that when calling enterprises.devices.patch, ACTIVE and DISABLED are the only allowable values. To enter the device into a DELETED state, call enterprises.devices.delete. */
  state?: "DEVICE_STATE_UNSPECIFIED" | "ACTIVE" | "DISABLED" | "DELETED" | "PROVISIONING" | "LOST" | "PREPARING_FOR_MIGRATION" | "DEACTIVATED_BY_DEVICE_FINANCE" | (string & {});
  /** The state currently applied to the device. */
  appliedState?: "DEVICE_STATE_UNSPECIFIED" | "ACTIVE" | "DISABLED" | "DELETED" | "PROVISIONING" | "LOST" | "PREPARING_FOR_MIGRATION" | "DEACTIVATED_BY_DEVICE_FINANCE" | (string & {});
  /** Whether the device is compliant with its policy. */
  policyCompliant?: boolean;
  /** Details about policy settings that the device is not compliant with. */
  nonComplianceDetails?: Array<NonComplianceDetail>;
  /** The time of device enrollment. */
  enrollmentTime?: string;
  /** The last time the device sent a status report. */
  lastStatusReportTime?: string;
  /** Deprecated. */
  lastPolicyComplianceReportTime?: string;
  /** The last time the device fetched its policy. */
  lastPolicySyncTime?: string;
  /** The name of the policy applied to the device, in the form enterprises/{enterpriseId}/policies/{policyId}. If not specified, the policy_name for the device's user is applied. This field can be modified by a patch request. You can specify only the policyId when calling enterprises.devices.patch, as long as the policyId doesn’t contain any slashes. The rest of the policy name is inferred. */
  policyName?: string;
  /** The name of the policy currently applied to the device. */
  appliedPolicyName?: string;
  /** The version of the policy currently applied to the device. */
  appliedPolicyVersion?: string;
  /** The API level of the Android platform version running on the device. */
  apiLevel?: number;
  /** If the device was enrolled with an enrollment token with additional data provided, this field contains that data. */
  enrollmentTokenData?: string;
  /** If the device was enrolled with an enrollment token, this field contains the name of the token. */
  enrollmentTokenName?: string;
  /** If the device state is DISABLED, an optional message that is displayed on the device indicating the reason the device is disabled. This field can be modified by a patch request. */
  disabledReason?: UserFacingMessage;
  /** Detailed information about the device software. This information is only available if softwareInfoEnabled is true in the device's policy. */
  softwareInfo?: SoftwareInfo;
  /** Detailed information about the device hardware. */
  hardwareInfo?: HardwareInfo;
  /** Detailed information about displays on the device. This information is only available if displayInfoEnabled is true in the device's policy. */
  displays?: Array<Display>;
  /** Reports for apps installed on the device. This information is only available when application_reports_enabled is true in the device's policy. */
  applicationReports?: Array<ApplicationReport>;
  /** If the same physical device has been enrolled multiple times, this field contains its previous device names. The serial number is used as the unique identifier to determine if the same physical device has enrolled previously. The names are in chronological order. */
  previousDeviceNames?: Array<string>;
  /** Device network information. This information is only available if networkInfoEnabled is true in the device's policy. */
  networkInfo?: NetworkInfo;
  /** Memory information: contains information about device memory and storage. */
  memoryInfo?: MemoryInfo;
  /** Events related to memory and storage measurements in chronological order. This information is only available if memoryInfoEnabled is true in the device's policy.Events are retained for a certain period of time and old events are deleted. */
  memoryEvents?: Array<MemoryEvent>;
  /** Power management events on the device in chronological order. This information is only available if powerManagementEventsEnabled is true in the device's policy. */
  powerManagementEvents?: Array<PowerManagementEvent>;
  /** Hardware status samples in chronological order. This information is only available if hardwareStatusEnabled is true in the device's policy. */
  hardwareStatusSamples?: Array<HardwareStatus>;
  /** Device settings information. This information is only available if deviceSettingsEnabled is true in the device's policy. */
  deviceSettings?: DeviceSettings;
  /** The user who owns the device. */
  user?: User;
  /** Map of selected system properties name and value related to the device. This information is only available if systemPropertiesEnabled is true in the device's policy. */
  systemProperties?: Record<string, string>;
  /** Device's security posture value that reflects how secure the device is. */
  securityPosture?: SecurityPosture;
  /** Ownership of the managed device. */
  ownership?: "OWNERSHIP_UNSPECIFIED" | "COMPANY_OWNED" | "PERSONALLY_OWNED" | (string & {});
  /** Information about Common Criteria Mode—security standards defined in the Common Criteria for Information Technology Security Evaluation (https://www.commoncriteriaportal.org/) (CC).This information is only available if statusReportingSettings.commonCriteriaModeEnabled is true in the device's policy the device is company-owned. */
  commonCriteriaModeInfo?: CommonCriteriaModeInfo;
  /** The password requirements currently applied to the device. This field exists because the applied requirements may be slightly different from those specified in passwordPolicies in some cases. Note that this field does not provide information about password compliance. For non-compliance information, see nonComplianceDetails. NonComplianceDetail.fieldPath, is set based on passwordPolicies, not based on this field. */
  appliedPasswordPolicies?: Array<PasswordRequirements>;
  /** Output only. Information related to whether this device was migrated from being managed by another Device Policy Controller (DPC). */
  dpcMigrationInfo?: DpcMigrationInfo;
  /** Output only. The default application information for the DefaultApplicationType. This information is only available if defaultApplicationInfoReportingEnabled is true in the device's policy. Available on Android 16 and above.All app types are reported on fully managed devices. DEFAULT_BROWSER, DEFAULT_CALL_REDIRECTION, DEFAULT_CALL_SCREENING and DEFAULT_DIALER types are reported for the work profiles on company-owned devices with a work profile and personally-owned devices. DEFAULT_WALLET is also reported for company-owned devices with a work profile, but will only include work profile information. */
  defaultApplicationInfo?: Array<DefaultApplicationInfo>;
}

export const Device: Schema.Schema<Device> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userName: Schema.optional(Schema.String),
  managementMode: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  appliedState: Schema.optional(Schema.String),
  policyCompliant: Schema.optional(Schema.Boolean),
  nonComplianceDetails: Schema.optional(Schema.Array(NonComplianceDetail)),
  enrollmentTime: Schema.optional(Schema.String),
  lastStatusReportTime: Schema.optional(Schema.String),
  lastPolicyComplianceReportTime: Schema.optional(Schema.String),
  lastPolicySyncTime: Schema.optional(Schema.String),
  policyName: Schema.optional(Schema.String),
  appliedPolicyName: Schema.optional(Schema.String),
  appliedPolicyVersion: Schema.optional(Schema.String),
  apiLevel: Schema.optional(Schema.Number),
  enrollmentTokenData: Schema.optional(Schema.String),
  enrollmentTokenName: Schema.optional(Schema.String),
  disabledReason: Schema.optional(UserFacingMessage),
  softwareInfo: Schema.optional(SoftwareInfo),
  hardwareInfo: Schema.optional(HardwareInfo),
  displays: Schema.optional(Schema.Array(Display)),
  applicationReports: Schema.optional(Schema.Array(ApplicationReport)),
  previousDeviceNames: Schema.optional(Schema.Array(Schema.String)),
  networkInfo: Schema.optional(NetworkInfo),
  memoryInfo: Schema.optional(MemoryInfo),
  memoryEvents: Schema.optional(Schema.Array(MemoryEvent)),
  powerManagementEvents: Schema.optional(Schema.Array(PowerManagementEvent)),
  hardwareStatusSamples: Schema.optional(Schema.Array(HardwareStatus)),
  deviceSettings: Schema.optional(DeviceSettings),
  user: Schema.optional(User),
  systemProperties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  securityPosture: Schema.optional(SecurityPosture),
  ownership: Schema.optional(Schema.String),
  commonCriteriaModeInfo: Schema.optional(CommonCriteriaModeInfo),
  appliedPasswordPolicies: Schema.optional(Schema.Array(PasswordRequirements)),
  dpcMigrationInfo: Schema.optional(DpcMigrationInfo),
  defaultApplicationInfo: Schema.optional(Schema.Array(DefaultApplicationInfo)),
})).annotate({ identifier: "Device" }) as any as Schema.Schema<Device>;

export interface ListDevicesResponse {
  /** The list of devices. */
  devices?: Array<Device>;
  /** If there are more results, a token to retrieve next page of results. */
  nextPageToken?: string;
}

export const ListDevicesResponse: Schema.Schema<ListDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(Device)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDevicesResponse" }) as any as Schema.Schema<ListDevicesResponse>;

export interface PermissionGrant {
  /** The Android permission or group, e.g. android.permission.READ_CALENDAR or android.permission_group.CALENDAR. */
  permission?: string;
  /** The policy for granting the permission. */
  policy?: "PERMISSION_POLICY_UNSPECIFIED" | "PROMPT" | "GRANT" | "DENY" | (string & {});
}

export const PermissionGrant: Schema.Schema<PermissionGrant> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
})).annotate({ identifier: "PermissionGrant" }) as any as Schema.Schema<PermissionGrant>;

export interface ManagedConfigurationTemplate {
  /** The ID of the managed configurations template. */
  templateId?: string;
  /** Optional, a map containing configuration variables defined for the configuration. */
  configurationVariables?: Record<string, string>;
}

export const ManagedConfigurationTemplate: Schema.Schema<ManagedConfigurationTemplate> = Schema.suspend(() => Schema.Struct({
  templateId: Schema.optional(Schema.String),
  configurationVariables: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ManagedConfigurationTemplate" }) as any as Schema.Schema<ManagedConfigurationTemplate>;

export interface ExtensionConfig {
  /** Hex-encoded SHA-256 hashes of the signing key certificates of the extension app. Only hexadecimal string representations of 64 characters are valid.The signing key certificate fingerprints are always obtained from the Play Store and this field is used to provide additional signing key certificate fingerprints. However, if the application is not available on the Play Store, this field needs to be set. A NonComplianceDetail with INVALID_VALUE is reported if this field is not set when the application is not available on the Play Store.The signing key certificate fingerprint of the extension app on the device must match one of the signing key certificate fingerprints obtained from the Play Store or the ones provided in this field for the app to be able to communicate with Android Device Policy.In production use cases, it is recommended to leave this empty. */
  signingKeyFingerprintsSha256?: Array<string>;
  /** Fully qualified class name of the receiver service class for Android Device Policy to notify the extension app of any local command status updates. The service must be exported in the extension app's AndroidManifest.xml and extend NotificationReceiverService (https://developers.google.com/android/management/reference/amapi/com/google/android/managementapi/notification/NotificationReceiverService) (see Integrate with the AMAPI SDK (https://developers.google.com/android/management/sdk-integration) guide for more details). */
  notificationReceiver?: string;
}

export const ExtensionConfig: Schema.Schema<ExtensionConfig> = Schema.suspend(() => Schema.Struct({
  signingKeyFingerprintsSha256: Schema.optional(Schema.Array(Schema.String)),
  notificationReceiver: Schema.optional(Schema.String),
})).annotate({ identifier: "ExtensionConfig" }) as any as Schema.Schema<ExtensionConfig>;

export interface CustomAppConfig {
  /** Optional. User uninstall settings of the custom app. */
  userUninstallSettings?: "USER_UNINSTALL_SETTINGS_UNSPECIFIED" | "DISALLOW_UNINSTALL_BY_USER" | "ALLOW_UNINSTALL_BY_USER" | (string & {});
}

export const CustomAppConfig: Schema.Schema<CustomAppConfig> = Schema.suspend(() => Schema.Struct({
  userUninstallSettings: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomAppConfig" }) as any as Schema.Schema<CustomAppConfig>;

export interface InstallConstraint {
  /** Optional. Network type constraint. */
  networkTypeConstraint?: "NETWORK_TYPE_CONSTRAINT_UNSPECIFIED" | "INSTALL_ON_ANY_NETWORK" | "INSTALL_ONLY_ON_UNMETERED_NETWORK" | (string & {});
  /** Optional. Charging constraint. */
  chargingConstraint?: "CHARGING_CONSTRAINT_UNSPECIFIED" | "CHARGING_NOT_REQUIRED" | "INSTALL_ONLY_WHEN_CHARGING" | (string & {});
  /** Optional. Device idle constraint. */
  deviceIdleConstraint?: "DEVICE_IDLE_CONSTRAINT_UNSPECIFIED" | "DEVICE_IDLE_NOT_REQUIRED" | "INSTALL_ONLY_WHEN_DEVICE_IDLE" | (string & {});
}

export const InstallConstraint: Schema.Schema<InstallConstraint> = Schema.suspend(() => Schema.Struct({
  networkTypeConstraint: Schema.optional(Schema.String),
  chargingConstraint: Schema.optional(Schema.String),
  deviceIdleConstraint: Schema.optional(Schema.String),
})).annotate({ identifier: "InstallConstraint" }) as any as Schema.Schema<InstallConstraint>;

export interface ApplicationSigningKeyCert {
  /** Required. The SHA-256 hash value of the signing key certificate of the app. This must be a valid SHA-256 hash value, i.e. 32 bytes. */
  signingKeyCertFingerprintSha256?: string;
}

export const ApplicationSigningKeyCert: Schema.Schema<ApplicationSigningKeyCert> = Schema.suspend(() => Schema.Struct({
  signingKeyCertFingerprintSha256: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationSigningKeyCert" }) as any as Schema.Schema<ApplicationSigningKeyCert>;

export interface Role {
  /** Required. The type of the role an app can have. */
  roleType?: "ROLE_TYPE_UNSPECIFIED" | "COMPANION_APP" | "KIOSK" | "MOBILE_THREAT_DEFENSE_ENDPOINT_DETECTION_RESPONSE" | "SYSTEM_HEALTH_MONITORING" | (string & {});
}

export const Role: Schema.Schema<Role> = Schema.suspend(() => Schema.Struct({
  roleType: Schema.optional(Schema.String),
})).annotate({ identifier: "Role" }) as any as Schema.Schema<Role>;

export interface ApplicationPolicy {
  /** The package name of the app. For example, com.google.android.youtube for the YouTube app. */
  packageName?: string;
  /** The type of installation to perform. */
  installType?: "INSTALL_TYPE_UNSPECIFIED" | "PREINSTALLED" | "FORCE_INSTALLED" | "BLOCKED" | "AVAILABLE" | "REQUIRED_FOR_SETUP" | "KIOSK" | "CUSTOM" | (string & {});
  /** Whether the app is allowed to lock itself in full-screen mode. DEPRECATED. Use InstallType KIOSK or kioskCustomLauncherEnabled to configure a dedicated device. */
  lockTaskAllowed?: boolean;
  /** The default policy for all permissions requested by the app. If specified, this overrides the policy-level default_permission_policy which applies to all apps. It does not override the permission_grants which applies to all apps. */
  defaultPermissionPolicy?: "PERMISSION_POLICY_UNSPECIFIED" | "PROMPT" | "GRANT" | "DENY" | (string & {});
  /** Explicit permission grants or denials for the app. These values override the default_permission_policy and permission_grants which apply to all apps. */
  permissionGrants?: Array<PermissionGrant>;
  /** Managed configuration applied to the app. The format for the configuration is dictated by the ManagedProperty values supported by the app. Each field name in the managed configuration must match the key field of the ManagedProperty. The field value must be compatible with the type of the ManagedProperty: *type* *JSON value* BOOL true or false STRING string INTEGER number CHOICE string MULTISELECT array of strings HIDDEN string BUNDLE_ARRAY array of objects Note: string values cannot be longer than 65535 characters. */
  managedConfiguration?: Record<string, unknown>;
  /** Whether the app is disabled. When disabled, the app data is still preserved. */
  disabled?: boolean;
  /** The minimum version of the app that runs on the device. If set, the device attempts to update the app to at least this version code. If the app is not up-to-date, the device will contain a NonComplianceDetail with non_compliance_reason set to APP_NOT_UPDATED. The app must already be published to Google Play with a version code greater than or equal to this value. At most 20 apps may specify a minimum version code per policy. */
  minimumVersionCode?: number;
  /** The scopes delegated to the app from Android Device Policy. These provide additional privileges for the applications they are applied to. */
  delegatedScopes?: Array<"DELEGATED_SCOPE_UNSPECIFIED" | "CERT_INSTALL" | "MANAGED_CONFIGURATIONS" | "BLOCK_UNINSTALL" | "PERMISSION_GRANT" | "PACKAGE_ACCESS" | "ENABLE_SYSTEM_APP" | "NETWORK_ACTIVITY_LOGS" | "SECURITY_LOGS" | "CERT_SELECTION" | (string & {})>;
  /** The managed configurations template for the app, saved from the managed configurations iframe. This field is ignored if managed_configuration is set. */
  managedConfigurationTemplate?: ManagedConfigurationTemplate;
  /** List of the app’s track IDs that a device belonging to the enterprise can access. If the list contains multiple track IDs, devices receive the latest version among all accessible tracks. If the list contains no track IDs, devices only have access to the app’s production track. More details about each track are available in AppTrackInfo. */
  accessibleTrackIds?: Array<string>;
  /** Controls whether the app can communicate with itself across a device’s work and personal profiles, subject to user consent. */
  connectedWorkAndPersonalApp?: "CONNECTED_WORK_AND_PERSONAL_APP_UNSPECIFIED" | "CONNECTED_WORK_AND_PERSONAL_APP_DISALLOWED" | "CONNECTED_WORK_AND_PERSONAL_APP_ALLOWED" | (string & {});
  /** Controls the auto-update mode for the app. */
  autoUpdateMode?: "AUTO_UPDATE_MODE_UNSPECIFIED" | "AUTO_UPDATE_DEFAULT" | "AUTO_UPDATE_POSTPONED" | "AUTO_UPDATE_HIGH_PRIORITY" | (string & {});
  /** Configuration to enable this app as an extension app, with the capability of interacting with Android Device Policy offline.This field can be set for at most one app. If there is any app with COMPANION_APP role, this field cannot be set.The signing key certificate fingerprint of the app on the device must match one of the entries in ApplicationPolicy.signingKeyCerts or ExtensionConfig.signingKeyFingerprintsSha256 (deprecated) or the signing key certificate fingerprints obtained from Play Store for the app to be able to communicate with Android Device Policy. If the app is not on Play Store and if ApplicationPolicy.signingKeyCerts and ExtensionConfig.signingKeyFingerprintsSha256 (deprecated) are not set, a NonComplianceDetail with INVALID_VALUE is reported. */
  extensionConfig?: ExtensionConfig;
  /** Specifies whether the app is allowed networking when the VPN is not connected and alwaysOnVpnPackage.lockdownEnabled is enabled. If set to VPN_LOCKDOWN_ENFORCED, the app is not allowed networking, and if set to VPN_LOCKDOWN_EXEMPTION, the app is allowed networking. Only supported on devices running Android 10 and above. If this is not supported by the device, the device will contain a NonComplianceDetail with non_compliance_reason set to API_LEVEL and a fieldPath. If this is not applicable to the app, the device will contain a NonComplianceDetail with non_compliance_reason set to UNSUPPORTED and a fieldPath. The fieldPath is set to applications[i].alwaysOnVpnLockdownExemption, where i is the index of the package in the applications policy. */
  alwaysOnVpnLockdownExemption?: "ALWAYS_ON_VPN_LOCKDOWN_EXEMPTION_UNSPECIFIED" | "VPN_LOCKDOWN_ENFORCED" | "VPN_LOCKDOWN_EXEMPTION" | (string & {});
  /** Specifies whether the app installed in the work profile is allowed to add widgets to the home screen. */
  workProfileWidgets?: "WORK_PROFILE_WIDGETS_UNSPECIFIED" | "WORK_PROFILE_WIDGETS_ALLOWED" | "WORK_PROFILE_WIDGETS_DISALLOWED" | (string & {});
  /** Optional. Whether the app is allowed to act as a credential provider on Android 14 and above. */
  credentialProviderPolicy?: "CREDENTIAL_PROVIDER_POLICY_UNSPECIFIED" | "CREDENTIAL_PROVIDER_ALLOWED" | (string & {});
  /** Optional. Configuration for this custom app.install_type must be set to CUSTOM for this to be set. */
  customAppConfig?: CustomAppConfig;
  /** Optional. The constraints for installing the app. You can specify a maximum of one InstallConstraint. Multiple constraints are rejected. */
  installConstraint?: Array<InstallConstraint>;
  /** Optional. Amongst apps with installType set to: FORCE_INSTALLED PREINSTALLEDthis controls the relative priority of installation. A value of 0 (default) means this app has no priority over other apps. For values between 1 and 10,000, a lower value means a higher priority. Values outside of the range 0 to 10,000 inclusive are rejected. */
  installPriority?: number;
  /** Optional. Specifies whether user control is permitted for the app. User control includes user actions like force-stopping and clearing app data. Certain types of apps have special treatment, see USER_CONTROL_SETTINGS_UNSPECIFIED and USER_CONTROL_ALLOWED for more details. */
  userControlSettings?: "USER_CONTROL_SETTINGS_UNSPECIFIED" | "USER_CONTROL_ALLOWED" | "USER_CONTROL_DISALLOWED" | (string & {});
  /** Optional. ID of the preferential network the application uses. There must be a configuration for the specified network ID in preferentialNetworkServiceConfigs. If set to PREFERENTIAL_NETWORK_ID_UNSPECIFIED, the application will use the default network ID specified in defaultPreferentialNetworkId. See the documentation of defaultPreferentialNetworkId for the list of apps excluded from this defaulting. This applies on both work profiles and fully managed devices on Android 13 and above. */
  preferentialNetworkId?: "PREFERENTIAL_NETWORK_ID_UNSPECIFIED" | "NO_PREFERENTIAL_NETWORK" | "PREFERENTIAL_NETWORK_ID_ONE" | "PREFERENTIAL_NETWORK_ID_TWO" | "PREFERENTIAL_NETWORK_ID_THREE" | "PREFERENTIAL_NETWORK_ID_FOUR" | "PREFERENTIAL_NETWORK_ID_FIVE" | (string & {});
  /** Optional. Signing key certificates of the app.This field is required in the following cases: The app has installType set to CUSTOM (i.e. a custom app). The app has roles set to a nonempty list and the app does not exist on the Play Store. The app has extensionConfig set (i.e. an extension app) but ExtensionConfig.signingKeyFingerprintsSha256 (deprecated) is not set and the app does not exist on the Play Store.If this field is not set for a custom app, the policy is rejected. If it is not set when required for a non-custom app, a NonComplianceDetail with INVALID_VALUE is reported.For other cases, this field is optional and the signing key certificates obtained from Play Store are used.See following policy settings to see how this field is used: choosePrivateKeyRules ApplicationPolicy.InstallType.CUSTOM ApplicationPolicy.extensionConfig ApplicationPolicy.roles */
  signingKeyCerts?: Array<ApplicationSigningKeyCert>;
  /** Optional. Roles the app has.Apps having certain roles can be exempted from power and background execution restrictions, suspension and hibernation on Android 14 and above. The user control can also be disallowed for apps with certain roles on Android 11 and above. Refer to the documentation of each RoleType for more details.The app is notified about the roles that are set for it if the app has a notification receiver service with . The app is notified whenever its roles are updated or after the app is installed when it has nonempty list of roles. The app can use this notification to bootstrap itself after the installation. See Integrate with the AMAPI SDK (https://developers.google.com/android/management/sdk-integration) and Manage app roles (https://developers.google.com/android/management/app-roles) guides for more details on the requirements for the service.For the exemptions to be applied and the app to be notified about the roles, the signing key certificate fingerprint of the app on the device must match one of the signing key certificate fingerprints obtained from Play Store or one of the entries in ApplicationPolicy.signingKeyCerts. Otherwise, a NonComplianceDetail with APP_SIGNING_CERT_MISMATCH is reported.There must not be duplicate roles with the same roleType. Multiple apps cannot hold a role with the same roleType. A role with type ROLE_TYPE_UNSPECIFIED is not allowed. */
  roles?: Array<Role>;
}

export const ApplicationPolicy: Schema.Schema<ApplicationPolicy> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  installType: Schema.optional(Schema.String),
  lockTaskAllowed: Schema.optional(Schema.Boolean),
  defaultPermissionPolicy: Schema.optional(Schema.String),
  permissionGrants: Schema.optional(Schema.Array(PermissionGrant)),
  managedConfiguration: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  disabled: Schema.optional(Schema.Boolean),
  minimumVersionCode: Schema.optional(Schema.Number),
  delegatedScopes: Schema.optional(Schema.Array(Schema.String)),
  managedConfigurationTemplate: Schema.optional(ManagedConfigurationTemplate),
  accessibleTrackIds: Schema.optional(Schema.Array(Schema.String)),
  connectedWorkAndPersonalApp: Schema.optional(Schema.String),
  autoUpdateMode: Schema.optional(Schema.String),
  extensionConfig: Schema.optional(ExtensionConfig),
  alwaysOnVpnLockdownExemption: Schema.optional(Schema.String),
  workProfileWidgets: Schema.optional(Schema.String),
  credentialProviderPolicy: Schema.optional(Schema.String),
  customAppConfig: Schema.optional(CustomAppConfig),
  installConstraint: Schema.optional(Schema.Array(InstallConstraint)),
  installPriority: Schema.optional(Schema.Number),
  userControlSettings: Schema.optional(Schema.String),
  preferentialNetworkId: Schema.optional(Schema.String),
  signingKeyCerts: Schema.optional(Schema.Array(ApplicationSigningKeyCert)),
  roles: Schema.optional(Schema.Array(Role)),
})).annotate({ identifier: "ApplicationPolicy" }) as any as Schema.Schema<ApplicationPolicy>;

export interface PersistentPreferredActivity {
  /** The activity that should be the default intent handler. This should be an Android component name, e.g. com.android.enterprise.app/.MainActivity. Alternatively, the value may be the package name of an app, which causes Android Device Policy to choose an appropriate activity from the app to handle the intent. */
  receiverActivity?: string;
  /** The intent actions to match in the filter. If any actions are included in the filter, then an intent's action must be one of those values for it to match. If no actions are included, the intent action is ignored. */
  actions?: Array<string>;
  /** The intent categories to match in the filter. An intent includes the categories that it requires, all of which must be included in the filter in order to match. In other words, adding a category to the filter has no impact on matching unless that category is specified in the intent. */
  categories?: Array<string>;
}

export const PersistentPreferredActivity: Schema.Schema<PersistentPreferredActivity> = Schema.suspend(() => Schema.Struct({
  receiverActivity: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(Schema.String)),
  categories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PersistentPreferredActivity" }) as any as Schema.Schema<PersistentPreferredActivity>;

export interface Androidmanagement_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Androidmanagement_Date: Schema.Schema<Androidmanagement_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Androidmanagement_Date" }) as any as Schema.Schema<Androidmanagement_Date>;

export interface FreezePeriod {
  /** The start date (inclusive) of the freeze period. Note: day and month must be set. year should not be set as it is not used. For example, {"month": 1,"date": 30}. */
  startDate?: Androidmanagement_Date;
  /** The end date (inclusive) of the freeze period. Must be no later than 90 days from the start date. If the end date is earlier than the start date, the freeze period is considered wrapping year-end. Note: day and month must be set. year should not be set as it is not used. For example, {"month": 1,"date": 30}. */
  endDate?: Androidmanagement_Date;
}

export const FreezePeriod: Schema.Schema<FreezePeriod> = Schema.suspend(() => Schema.Struct({
  startDate: Schema.optional(Androidmanagement_Date),
  endDate: Schema.optional(Androidmanagement_Date),
})).annotate({ identifier: "FreezePeriod" }) as any as Schema.Schema<FreezePeriod>;

export interface SystemUpdate {
  /** The type of system update to configure. */
  type?: "SYSTEM_UPDATE_TYPE_UNSPECIFIED" | "AUTOMATIC" | "WINDOWED" | "POSTPONE" | (string & {});
  /** If the type is WINDOWED, the start of the maintenance window, measured as the number of minutes after midnight in the device's local time. This value must be between 0 and 1439, inclusive. */
  startMinutes?: number;
  /** If the type is WINDOWED, the end of the maintenance window, measured as the number of minutes after midnight in device's local time. This value must be between 0 and 1439, inclusive. If this value is less than start_minutes, then the maintenance window spans midnight. If the maintenance window specified is smaller than 30 minutes, the actual window is extended to 30 minutes beyond the start time. */
  endMinutes?: number;
  /** If this is greater than zero, then this is the number of days after a pending update becoming available that a device can remain compliant, without taking the update. Has no effect otherwise. */
  allowedDaysWithoutUpdate?: number;
  /** An annually repeating time period in which over-the-air (OTA) system updates are postponed to freeze the OS version running on a device. To prevent freezing the device indefinitely, each freeze period must be separated by at least 60 days. */
  freezePeriods?: Array<FreezePeriod>;
}

export const SystemUpdate: Schema.Schema<SystemUpdate> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  startMinutes: Schema.optional(Schema.Number),
  endMinutes: Schema.optional(Schema.Number),
  allowedDaysWithoutUpdate: Schema.optional(Schema.Number),
  freezePeriods: Schema.optional(Schema.Array(FreezePeriod)),
})).annotate({ identifier: "SystemUpdate" }) as any as Schema.Schema<SystemUpdate>;

export interface ApplicationReportingSettings {
  /** Whether removed apps are included in application reports. */
  includeRemovedApps?: boolean;
}

export const ApplicationReportingSettings: Schema.Schema<ApplicationReportingSettings> = Schema.suspend(() => Schema.Struct({
  includeRemovedApps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ApplicationReportingSettings" }) as any as Schema.Schema<ApplicationReportingSettings>;

export interface StatusReportingSettings {
  /** Whether app reports are enabled. */
  applicationReportsEnabled?: boolean;
  /** Whether device settings reporting is enabled. */
  deviceSettingsEnabled?: boolean;
  /** Whether software info reporting is enabled. */
  softwareInfoEnabled?: boolean;
  /** Whether memory event reporting is enabled. */
  memoryInfoEnabled?: boolean;
  /** Whether network info reporting is enabled. */
  networkInfoEnabled?: boolean;
  /** Whether displays reporting is enabled. Report data is not available for personally owned devices with work profiles. */
  displayInfoEnabled?: boolean;
  /** Whether power management event reporting is enabled. Report data is not available for personally owned devices with work profiles. */
  powerManagementEventsEnabled?: boolean;
  /** Whether hardware status reporting is enabled. Report data is not available for personally owned devices with work profiles. */
  hardwareStatusEnabled?: boolean;
  /** Whether system properties reporting is enabled. */
  systemPropertiesEnabled?: boolean;
  /** Application reporting settings. Only applicable if application_reports_enabled is true. */
  applicationReportingSettings?: ApplicationReportingSettings;
  /** Whether Common Criteria Mode reporting is enabled. This is supported only on company-owned devices. */
  commonCriteriaModeEnabled?: boolean;
  /** Optional. Whether defaultApplicationInfo reporting is enabled. */
  defaultApplicationInfoReportingEnabled?: boolean;
}

export const StatusReportingSettings: Schema.Schema<StatusReportingSettings> = Schema.suspend(() => Schema.Struct({
  applicationReportsEnabled: Schema.optional(Schema.Boolean),
  deviceSettingsEnabled: Schema.optional(Schema.Boolean),
  softwareInfoEnabled: Schema.optional(Schema.Boolean),
  memoryInfoEnabled: Schema.optional(Schema.Boolean),
  networkInfoEnabled: Schema.optional(Schema.Boolean),
  displayInfoEnabled: Schema.optional(Schema.Boolean),
  powerManagementEventsEnabled: Schema.optional(Schema.Boolean),
  hardwareStatusEnabled: Schema.optional(Schema.Boolean),
  systemPropertiesEnabled: Schema.optional(Schema.Boolean),
  applicationReportingSettings: Schema.optional(ApplicationReportingSettings),
  commonCriteriaModeEnabled: Schema.optional(Schema.Boolean),
  defaultApplicationInfoReportingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StatusReportingSettings" }) as any as Schema.Schema<StatusReportingSettings>;

export interface PackageNameList {
  /** A list of package names. */
  packageNames?: Array<string>;
}

export const PackageNameList: Schema.Schema<PackageNameList> = Schema.suspend(() => Schema.Struct({
  packageNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PackageNameList" }) as any as Schema.Schema<PackageNameList>;

export interface ProxyInfo {
  /** The host of the direct proxy. */
  host?: string;
  /** The port of the direct proxy. */
  port?: number;
  /** For a direct proxy, the hosts for which the proxy is bypassed. The host names may contain wildcards such as *.example.com. */
  excludedHosts?: Array<string>;
  /** The URI of the PAC script used to configure the proxy. */
  pacUri?: string;
}

export const ProxyInfo: Schema.Schema<ProxyInfo> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  excludedHosts: Schema.optional(Schema.Array(Schema.String)),
  pacUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ProxyInfo" }) as any as Schema.Schema<ProxyInfo>;

export interface ChoosePrivateKeyRule {
  /** The URL pattern to match against the URL of the request. If not set or empty, it matches all URLs. This uses the regular expression syntax of java.util.regex.Pattern. */
  urlPattern?: string;
  /** The package names to which this rule applies. The signing key certificate fingerprint of the app is verified against the signing key certificate fingerprints provided by Play Store and ApplicationPolicy.signingKeyCerts . If no package names are specified, then the alias is provided to all apps that call KeyChain.choosePrivateKeyAlias (https://developer.android.com/reference/android/security/KeyChain#choosePrivateKeyAlias%28android.app.Activity,%20android.security.KeyChainAliasCallback,%20java.lang.String[],%20java.security.Principal[],%20java.lang.String,%20int,%20java.lang.String%29) or any overloads (but not without calling KeyChain.choosePrivateKeyAlias, even on Android 11 and above). Any app with the same Android UID as a package specified here will have access when they call KeyChain.choosePrivateKeyAlias. */
  packageNames?: Array<string>;
  /** The alias of the private key to be used. */
  privateKeyAlias?: string;
}

export const ChoosePrivateKeyRule: Schema.Schema<ChoosePrivateKeyRule> = Schema.suspend(() => Schema.Struct({
  urlPattern: Schema.optional(Schema.String),
  packageNames: Schema.optional(Schema.Array(Schema.String)),
  privateKeyAlias: Schema.optional(Schema.String),
})).annotate({ identifier: "ChoosePrivateKeyRule" }) as any as Schema.Schema<ChoosePrivateKeyRule>;

export interface AlwaysOnVpnPackage {
  /** The package name of the VPN app. */
  packageName?: string;
  /** Disallows networking when the VPN is not connected. */
  lockdownEnabled?: boolean;
}

export const AlwaysOnVpnPackage: Schema.Schema<AlwaysOnVpnPackage> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  lockdownEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AlwaysOnVpnPackage" }) as any as Schema.Schema<AlwaysOnVpnPackage>;

export interface NonComplianceDetailCondition {
  /** The name of the policy setting. This is the JSON field name of a top-level Policy field. If not set, then this condition matches any setting name. */
  settingName?: string;
  /** The reason the device is not in compliance with the setting. If not set, then this condition matches any reason. */
  nonComplianceReason?: "NON_COMPLIANCE_REASON_UNSPECIFIED" | "API_LEVEL" | "MANAGEMENT_MODE" | "USER_ACTION" | "INVALID_VALUE" | "APP_NOT_INSTALLED" | "UNSUPPORTED" | "APP_INSTALLED" | "PENDING" | "APP_INCOMPATIBLE" | "APP_NOT_UPDATED" | "DEVICE_INCOMPATIBLE" | "APP_SIGNING_CERT_MISMATCH" | "PROJECT_NOT_PERMITTED" | (string & {});
  /** The package name of the app that's out of compliance. If not set, then this condition matches any package name. */
  packageName?: string;
}

export const NonComplianceDetailCondition: Schema.Schema<NonComplianceDetailCondition> = Schema.suspend(() => Schema.Struct({
  settingName: Schema.optional(Schema.String),
  nonComplianceReason: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "NonComplianceDetailCondition" }) as any as Schema.Schema<NonComplianceDetailCondition>;

export interface ApiLevelCondition {
  /** The minimum desired Android Framework API level. If the device doesn't meet the minimum requirement, this condition is satisfied. Must be greater than zero. */
  minApiLevel?: number;
}

export const ApiLevelCondition: Schema.Schema<ApiLevelCondition> = Schema.suspend(() => Schema.Struct({
  minApiLevel: Schema.optional(Schema.Number),
})).annotate({ identifier: "ApiLevelCondition" }) as any as Schema.Schema<ApiLevelCondition>;

export interface ComplianceRule {
  /** A condition which is satisfied if there exists any matching NonComplianceDetail for the device. */
  nonComplianceDetailCondition?: NonComplianceDetailCondition;
  /** A condition which is satisfied if the Android Framework API level on the device doesn't meet a minimum requirement. */
  apiLevelCondition?: ApiLevelCondition;
  /** If set to true, the rule includes a mitigating action to disable apps so that the device is effectively disabled, but app data is preserved. If the device is running an app in locked task mode, the app will be closed and a UI showing the reason for non-compliance will be displayed. */
  disableApps?: boolean;
  /** If set, the rule includes a mitigating action to disable apps specified in the list, but app data is preserved. */
  packageNamesToDisable?: Array<string>;
}

export const ComplianceRule: Schema.Schema<ComplianceRule> = Schema.suspend(() => Schema.Struct({
  nonComplianceDetailCondition: Schema.optional(NonComplianceDetailCondition),
  apiLevelCondition: Schema.optional(ApiLevelCondition),
  disableApps: Schema.optional(Schema.Boolean),
  packageNamesToDisable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ComplianceRule" }) as any as Schema.Schema<ComplianceRule>;

export interface LaunchAppAction {
  /** Package name of app to be launched */
  packageName?: string;
}

export const LaunchAppAction: Schema.Schema<LaunchAppAction> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "LaunchAppAction" }) as any as Schema.Schema<LaunchAppAction>;

export interface SetupAction {
  /** An action to launch an app. The app will be launched with an intent containing an extra with key com.google.android.apps.work.clouddpc.EXTRA_LAUNCHED_AS_SETUP_ACTION set to the boolean value true to indicate that this is a setup action flow. If SetupAction references an app, the corresponding installType in the application policy must be set as REQUIRED_FOR_SETUP or said setup will fail. */
  launchApp?: LaunchAppAction;
  /** Title of this action. */
  title?: UserFacingMessage;
  /** Description of this action. */
  description?: UserFacingMessage;
}

export const SetupAction: Schema.Schema<SetupAction> = Schema.suspend(() => Schema.Struct({
  launchApp: Schema.optional(LaunchAppAction),
  title: Schema.optional(UserFacingMessage),
  description: Schema.optional(UserFacingMessage),
})).annotate({ identifier: "SetupAction" }) as any as Schema.Schema<SetupAction>;

export interface BlockAction {
  /** Number of days the policy is non-compliant before the device or work profile is blocked. To block access immediately, set to 0. blockAfterDays must be less than wipeAfterDays. */
  blockAfterDays?: number;
  /** Specifies the scope of this BlockAction. Only applicable to devices that are company-owned. */
  blockScope?: "BLOCK_SCOPE_UNSPECIFIED" | "BLOCK_SCOPE_WORK_PROFILE" | "BLOCK_SCOPE_DEVICE" | (string & {});
}

export const BlockAction: Schema.Schema<BlockAction> = Schema.suspend(() => Schema.Struct({
  blockAfterDays: Schema.optional(Schema.Number),
  blockScope: Schema.optional(Schema.String),
})).annotate({ identifier: "BlockAction" }) as any as Schema.Schema<BlockAction>;

export interface WipeAction {
  /** Number of days the policy is non-compliant before the device or work profile is wiped. wipeAfterDays must be greater than blockAfterDays. */
  wipeAfterDays?: number;
  /** Whether the factory-reset protection data is preserved on the device. This setting doesn’t apply to work profiles. */
  preserveFrp?: boolean;
}

export const WipeAction: Schema.Schema<WipeAction> = Schema.suspend(() => Schema.Struct({
  wipeAfterDays: Schema.optional(Schema.Number),
  preserveFrp: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WipeAction" }) as any as Schema.Schema<WipeAction>;

export interface PolicyEnforcementRule {
  /** The top-level policy to enforce. For example, applications or passwordPolicies. */
  settingName?: string;
  /** An action to block access to apps and data on a company owned device or in a work profile. This action also triggers a user-facing notification with information (where possible) on how to correct the compliance issue. Note: wipeAction must also be specified. */
  blockAction?: BlockAction;
  /** An action to reset a company owned device or delete a work profile. Note: blockAction must also be specified. */
  wipeAction?: WipeAction;
}

export const PolicyEnforcementRule: Schema.Schema<PolicyEnforcementRule> = Schema.suspend(() => Schema.Struct({
  settingName: Schema.optional(Schema.String),
  blockAction: Schema.optional(BlockAction),
  wipeAction: Schema.optional(WipeAction),
})).annotate({ identifier: "PolicyEnforcementRule" }) as any as Schema.Schema<PolicyEnforcementRule>;

export interface KioskCustomization {
  /** Sets the behavior of a device in kiosk mode when a user presses and holds (long-presses) the Power button. */
  powerButtonActions?: "POWER_BUTTON_ACTIONS_UNSPECIFIED" | "POWER_BUTTON_AVAILABLE" | "POWER_BUTTON_BLOCKED" | (string & {});
  /** Specifies whether system error dialogs for crashed or unresponsive apps are blocked in kiosk mode. When blocked, the system will force-stop the app as if the user chooses the "close app" option on the UI. */
  systemErrorWarnings?: "SYSTEM_ERROR_WARNINGS_UNSPECIFIED" | "ERROR_AND_WARNINGS_ENABLED" | "ERROR_AND_WARNINGS_MUTED" | (string & {});
  /** Specifies which navigation features are enabled (e.g. Home, Overview buttons) in kiosk mode. */
  systemNavigation?: "SYSTEM_NAVIGATION_UNSPECIFIED" | "NAVIGATION_ENABLED" | "NAVIGATION_DISABLED" | "HOME_BUTTON_ONLY" | (string & {});
  /** Specifies whether system info and notifications are disabled in kiosk mode. */
  statusBar?: "STATUS_BAR_UNSPECIFIED" | "NOTIFICATIONS_AND_SYSTEM_INFO_ENABLED" | "NOTIFICATIONS_AND_SYSTEM_INFO_DISABLED" | "SYSTEM_INFO_ONLY" | (string & {});
  /** Specifies whether the Settings app is allowed in kiosk mode. */
  deviceSettings?: "DEVICE_SETTINGS_UNSPECIFIED" | "SETTINGS_ACCESS_ALLOWED" | "SETTINGS_ACCESS_BLOCKED" | (string & {});
}

export const KioskCustomization: Schema.Schema<KioskCustomization> = Schema.suspend(() => Schema.Struct({
  powerButtonActions: Schema.optional(Schema.String),
  systemErrorWarnings: Schema.optional(Schema.String),
  systemNavigation: Schema.optional(Schema.String),
  statusBar: Schema.optional(Schema.String),
  deviceSettings: Schema.optional(Schema.String),
})).annotate({ identifier: "KioskCustomization" }) as any as Schema.Schema<KioskCustomization>;

export interface AdvancedSecurityOverrides {
  /** The policy for untrusted apps (apps from unknown sources) enforced on the device. Replaces install_unknown_sources_allowed (deprecated). */
  untrustedAppsPolicy?: "UNTRUSTED_APPS_POLICY_UNSPECIFIED" | "DISALLOW_INSTALL" | "ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY" | "ALLOW_INSTALL_DEVICE_WIDE" | (string & {});
  /** Whether Google Play Protect verification (https://support.google.com/accounts/answer/2812853) is enforced. Replaces ensureVerifyAppsEnabled (deprecated). */
  googlePlayProtectVerifyApps?: "GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED" | "VERIFY_APPS_ENFORCED" | "VERIFY_APPS_USER_CHOICE" | (string & {});
  /** Controls access to developer settings: developer options and safe boot. Replaces safeBootDisabled (deprecated) and debuggingFeaturesAllowed (deprecated). On personally-owned devices with a work profile, setting this policy will not disable safe boot. In this case, a NonComplianceDetail with MANAGEMENT_MODE is reported. */
  developerSettings?: "DEVELOPER_SETTINGS_UNSPECIFIED" | "DEVELOPER_SETTINGS_DISABLED" | "DEVELOPER_SETTINGS_ALLOWED" | (string & {});
  /** Controls Common Criteria Mode—security standards defined in the Common Criteria for Information Technology Security Evaluation (https://www.commoncriteriaportal.org/) (CC). Enabling Common Criteria Mode increases certain security components on a device, see CommonCriteriaMode for details.Warning: Common Criteria Mode enforces a strict security model typically only required for IT products used in national security systems and other highly sensitive organizations. Standard device use may be affected. Only enabled if required. If Common Criteria Mode is turned off after being enabled previously, all user-configured Wi-Fi networks may be lost and any enterprise-configured Wi-Fi networks that require user input may need to be reconfigured. */
  commonCriteriaMode?: "COMMON_CRITERIA_MODE_UNSPECIFIED" | "COMMON_CRITERIA_MODE_DISABLED" | "COMMON_CRITERIA_MODE_ENABLED" | (string & {});
  /** Personal apps that can read work profile notifications using a NotificationListenerService (https://developer.android.com/reference/android/service/notification/NotificationListenerService). By default, no personal apps (aside from system apps) can read work notifications. Each value in the list must be a package name. */
  personalAppsThatCanReadWorkNotifications?: Array<string>;
  /** Optional. Controls Memory Tagging Extension (MTE) (https://source.android.com/docs/security/test/memory-safety/arm-mte) on the device. The device needs to be rebooted to apply changes to the MTE policy. On Android 15 and above, a NonComplianceDetail with PENDING is reported if the policy change is pending a device reboot. */
  mtePolicy?: "MTE_POLICY_UNSPECIFIED" | "MTE_USER_CHOICE" | "MTE_ENFORCED" | "MTE_DISABLED" | (string & {});
  /** Optional. Controls whether content protection, which scans for deceptive apps, is enabled. This is supported on Android 15 and above. */
  contentProtectionPolicy?: "CONTENT_PROTECTION_POLICY_UNSPECIFIED" | "CONTENT_PROTECTION_DISABLED" | "CONTENT_PROTECTION_ENFORCED" | "CONTENT_PROTECTION_USER_CHOICE" | (string & {});
}

export const AdvancedSecurityOverrides: Schema.Schema<AdvancedSecurityOverrides> = Schema.suspend(() => Schema.Struct({
  untrustedAppsPolicy: Schema.optional(Schema.String),
  googlePlayProtectVerifyApps: Schema.optional(Schema.String),
  developerSettings: Schema.optional(Schema.String),
  commonCriteriaMode: Schema.optional(Schema.String),
  personalAppsThatCanReadWorkNotifications: Schema.optional(Schema.Array(Schema.String)),
  mtePolicy: Schema.optional(Schema.String),
  contentProtectionPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "AdvancedSecurityOverrides" }) as any as Schema.Schema<AdvancedSecurityOverrides>;

export interface PersonalApplicationPolicy {
  /** The package name of the application. */
  packageName?: string;
  /** The type of installation to perform. */
  installType?: "INSTALL_TYPE_UNSPECIFIED" | "BLOCKED" | "AVAILABLE" | (string & {});
}

export const PersonalApplicationPolicy: Schema.Schema<PersonalApplicationPolicy> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  installType: Schema.optional(Schema.String),
})).annotate({ identifier: "PersonalApplicationPolicy" }) as any as Schema.Schema<PersonalApplicationPolicy>;

export interface PersonalUsagePolicies {
  /** If true, the camera is disabled on the personal profile. */
  cameraDisabled?: boolean;
  /** If true, screen capture is disabled for all users. */
  screenCaptureDisabled?: boolean;
  /** Account types that can't be managed by the user. */
  accountTypesWithManagementDisabled?: Array<string>;
  /** Controls how long the work profile can stay off. The minimum duration must be at least 3 days. Other details are as follows: - If the duration is set to 0, the feature is turned off. - If the duration is set to a value smaller than the minimum duration, the feature returns an error. *Note:* If you want to avoid personal profiles being suspended during long periods of off-time, you can temporarily set a large value for this parameter. */
  maxDaysWithWorkOff?: number;
  /** Used together with personalApplications to control how apps in the personal profile are allowed or blocked. */
  personalPlayStoreMode?: "PLAY_STORE_MODE_UNSPECIFIED" | "BLACKLIST" | "BLOCKLIST" | "ALLOWLIST" | (string & {});
  /** Policy applied to applications in the personal profile. */
  personalApplications?: Array<PersonalApplicationPolicy>;
  /** Optional. Controls whether a private space is allowed on the device. */
  privateSpacePolicy?: "PRIVATE_SPACE_POLICY_UNSPECIFIED" | "PRIVATE_SPACE_ALLOWED" | "PRIVATE_SPACE_DISALLOWED" | (string & {});
  /** Optional. Whether bluetooth sharing is allowed. */
  bluetoothSharing?: "BLUETOOTH_SHARING_UNSPECIFIED" | "BLUETOOTH_SHARING_ALLOWED" | "BLUETOOTH_SHARING_DISALLOWED" | (string & {});
}

export const PersonalUsagePolicies: Schema.Schema<PersonalUsagePolicies> = Schema.suspend(() => Schema.Struct({
  cameraDisabled: Schema.optional(Schema.Boolean),
  screenCaptureDisabled: Schema.optional(Schema.Boolean),
  accountTypesWithManagementDisabled: Schema.optional(Schema.Array(Schema.String)),
  maxDaysWithWorkOff: Schema.optional(Schema.Number),
  personalPlayStoreMode: Schema.optional(Schema.String),
  personalApplications: Schema.optional(Schema.Array(PersonalApplicationPolicy)),
  privateSpacePolicy: Schema.optional(Schema.String),
  bluetoothSharing: Schema.optional(Schema.String),
})).annotate({ identifier: "PersonalUsagePolicies" }) as any as Schema.Schema<PersonalUsagePolicies>;

export interface ContentProviderEndpoint {
  /** This feature is not generally available. */
  uri?: string;
  /** This feature is not generally available. */
  packageName?: string;
  /** Required. This feature is not generally available. */
  signingCertsSha256?: Array<string>;
}

export const ContentProviderEndpoint: Schema.Schema<ContentProviderEndpoint> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  signingCertsSha256: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ContentProviderEndpoint" }) as any as Schema.Schema<ContentProviderEndpoint>;

export interface OncCertificateProvider {
  /** This feature is not generally available. */
  contentProviderEndpoint?: ContentProviderEndpoint;
  /** This feature is not generally available. */
  certificateReferences?: Array<string>;
}

export const OncCertificateProvider: Schema.Schema<OncCertificateProvider> = Schema.suspend(() => Schema.Struct({
  contentProviderEndpoint: Schema.optional(ContentProviderEndpoint),
  certificateReferences: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OncCertificateProvider" }) as any as Schema.Schema<OncCertificateProvider>;

export interface CrossProfilePolicies {
  /** Whether personal apps can access contacts stored in the work profile.See also exemptions_to_show_work_contacts_in_personal_profile. */
  showWorkContactsInPersonalProfile?: "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_UNSPECIFIED" | "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED" | "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_ALLOWED" | "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED_EXCEPT_SYSTEM" | (string & {});
  /** Whether text copied from one profile (personal or work) can be pasted in the other profile. */
  crossProfileCopyPaste?: "CROSS_PROFILE_COPY_PASTE_UNSPECIFIED" | "COPY_FROM_WORK_TO_PERSONAL_DISALLOWED" | "CROSS_PROFILE_COPY_PASTE_ALLOWED" | (string & {});
  /** Whether data from one profile (personal or work) can be shared with apps in the other profile. Specifically controls simple data sharing via intents. Management of other cross-profile communication channels, such as contact search, copy/paste, or connected work & personal apps, are configured separately. */
  crossProfileDataSharing?: "CROSS_PROFILE_DATA_SHARING_UNSPECIFIED" | "CROSS_PROFILE_DATA_SHARING_DISALLOWED" | "DATA_SHARING_FROM_WORK_TO_PERSONAL_DISALLOWED" | "CROSS_PROFILE_DATA_SHARING_ALLOWED" | (string & {});
  /** Specifies the default behaviour for work profile widgets. If the policy does not specify work_profile_widgets for a specific application, it will behave according to the value specified here. */
  workProfileWidgetsDefault?: "WORK_PROFILE_WIDGETS_DEFAULT_UNSPECIFIED" | "WORK_PROFILE_WIDGETS_DEFAULT_ALLOWED" | "WORK_PROFILE_WIDGETS_DEFAULT_DISALLOWED" | (string & {});
  /** Optional. Controls whether personal profile apps can invoke app functions exposed by apps in the work profile. */
  crossProfileAppFunctions?: "CROSS_PROFILE_APP_FUNCTIONS_UNSPECIFIED" | "CROSS_PROFILE_APP_FUNCTIONS_DISALLOWED" | "CROSS_PROFILE_APP_FUNCTIONS_ALLOWED" | (string & {});
  /** List of apps which are excluded from the ShowWorkContactsInPersonalProfile setting. For this to be set, ShowWorkContactsInPersonalProfile must be set to one of the following values: SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_ALLOWED. In this case, these exemptions act as a blocklist. SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED. In this case, these exemptions act as an allowlist. SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED_EXCEPT_SYSTEM. In this case, these exemptions act as an allowlist, in addition to the already allowlisted system apps.Supported on Android 14 and above. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 14. */
  exemptionsToShowWorkContactsInPersonalProfile?: PackageNameList;
}

export const CrossProfilePolicies: Schema.Schema<CrossProfilePolicies> = Schema.suspend(() => Schema.Struct({
  showWorkContactsInPersonalProfile: Schema.optional(Schema.String),
  crossProfileCopyPaste: Schema.optional(Schema.String),
  crossProfileDataSharing: Schema.optional(Schema.String),
  workProfileWidgetsDefault: Schema.optional(Schema.String),
  crossProfileAppFunctions: Schema.optional(Schema.String),
  exemptionsToShowWorkContactsInPersonalProfile: Schema.optional(PackageNameList),
})).annotate({ identifier: "CrossProfilePolicies" }) as any as Schema.Schema<CrossProfilePolicies>;

export interface UsageLog {
  /** Specifies which log types are enabled. Note that users will receive on-device messaging when usage logging is enabled. */
  enabledLogTypes?: Array<"LOG_TYPE_UNSPECIFIED" | "SECURITY_LOGS" | "NETWORK_ACTIVITY_LOGS" | (string & {})>;
  /** Specifies which of the enabled log types can be uploaded over mobile data. By default logs are queued for upload when the device connects to WiFi. */
  uploadOnCellularAllowed?: Array<"LOG_TYPE_UNSPECIFIED" | "SECURITY_LOGS" | "NETWORK_ACTIVITY_LOGS" | (string & {})>;
}

export const UsageLog: Schema.Schema<UsageLog> = Schema.suspend(() => Schema.Struct({
  enabledLogTypes: Schema.optional(Schema.Array(Schema.String)),
  uploadOnCellularAllowed: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UsageLog" }) as any as Schema.Schema<UsageLog>;

export interface WifiSsid {
  /** Required. Wi-Fi SSID represented as a string. */
  wifiSsid?: string;
}

export const WifiSsid: Schema.Schema<WifiSsid> = Schema.suspend(() => Schema.Struct({
  wifiSsid: Schema.optional(Schema.String),
})).annotate({ identifier: "WifiSsid" }) as any as Schema.Schema<WifiSsid>;

export interface WifiSsidPolicy {
  /** Type of the Wi-Fi SSID policy to be applied. */
  wifiSsidPolicyType?: "WIFI_SSID_POLICY_TYPE_UNSPECIFIED" | "WIFI_SSID_DENYLIST" | "WIFI_SSID_ALLOWLIST" | (string & {});
  /** Optional. List of Wi-Fi SSIDs that should be applied in the policy. This field must be non-empty when WifiSsidPolicyType is set to WIFI_SSID_ALLOWLIST. If this is set to a non-empty list, then a NonComplianceDetail detail with API_LEVEL is reported if the Android version is less than 13 and a NonComplianceDetail with MANAGEMENT_MODE is reported for non-company-owned devices. */
  wifiSsids?: Array<WifiSsid>;
}

export const WifiSsidPolicy: Schema.Schema<WifiSsidPolicy> = Schema.suspend(() => Schema.Struct({
  wifiSsidPolicyType: Schema.optional(Schema.String),
  wifiSsids: Schema.optional(Schema.Array(WifiSsid)),
})).annotate({ identifier: "WifiSsidPolicy" }) as any as Schema.Schema<WifiSsidPolicy>;

export interface WifiRoamingSetting {
  /** Required. SSID of the Wi-Fi network. */
  wifiSsid?: string;
  /** Required. Wi-Fi roaming mode for the specified SSID. */
  wifiRoamingMode?: "WIFI_ROAMING_MODE_UNSPECIFIED" | "WIFI_ROAMING_DISABLED" | "WIFI_ROAMING_DEFAULT" | "WIFI_ROAMING_AGGRESSIVE" | (string & {});
}

export const WifiRoamingSetting: Schema.Schema<WifiRoamingSetting> = Schema.suspend(() => Schema.Struct({
  wifiSsid: Schema.optional(Schema.String),
  wifiRoamingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "WifiRoamingSetting" }) as any as Schema.Schema<WifiRoamingSetting>;

export interface WifiRoamingPolicy {
  /** Optional. Wi-Fi roaming settings. SSIDs provided in this list must be unique, the policy will be rejected otherwise. */
  wifiRoamingSettings?: Array<WifiRoamingSetting>;
}

export const WifiRoamingPolicy: Schema.Schema<WifiRoamingPolicy> = Schema.suspend(() => Schema.Struct({
  wifiRoamingSettings: Schema.optional(Schema.Array(WifiRoamingSetting)),
})).annotate({ identifier: "WifiRoamingPolicy" }) as any as Schema.Schema<WifiRoamingPolicy>;

export interface PreferentialNetworkServiceConfig {
  /** Required. Preferential network identifier. This must not be set to NO_PREFERENTIAL_NETWORK or PREFERENTIAL_NETWORK_ID_UNSPECIFIED, the policy will be rejected otherwise. */
  preferentialNetworkId?: "PREFERENTIAL_NETWORK_ID_UNSPECIFIED" | "NO_PREFERENTIAL_NETWORK" | "PREFERENTIAL_NETWORK_ID_ONE" | "PREFERENTIAL_NETWORK_ID_TWO" | "PREFERENTIAL_NETWORK_ID_THREE" | "PREFERENTIAL_NETWORK_ID_FOUR" | "PREFERENTIAL_NETWORK_ID_FIVE" | (string & {});
  /** Optional. Whether fallback to the device-wide default network is allowed. If this is set to FALLBACK_TO_DEFAULT_CONNECTION_ALLOWED, then nonMatchingNetworks must not be set to NON_MATCHING_NETWORKS_DISALLOWED, the policy will be rejected otherwise. Note: If this is set to FALLBACK_TO_DEFAULT_CONNECTION_DISALLOWED, applications are not able to access the internet if the 5G slice is not available. */
  fallbackToDefaultConnection?: "FALLBACK_TO_DEFAULT_CONNECTION_UNSPECIFIED" | "FALLBACK_TO_DEFAULT_CONNECTION_ALLOWED" | "FALLBACK_TO_DEFAULT_CONNECTION_DISALLOWED" | (string & {});
  /** Optional. Whether apps this configuration applies to are blocked from using networks other than the preferential service. If this is set to NON_MATCHING_NETWORKS_DISALLOWED, then fallbackToDefaultConnection must be set to FALLBACK_TO_DEFAULT_CONNECTION_DISALLOWED. */
  nonMatchingNetworks?: "NON_MATCHING_NETWORKS_UNSPECIFIED" | "NON_MATCHING_NETWORKS_ALLOWED" | "NON_MATCHING_NETWORKS_DISALLOWED" | (string & {});
}

export const PreferentialNetworkServiceConfig: Schema.Schema<PreferentialNetworkServiceConfig> = Schema.suspend(() => Schema.Struct({
  preferentialNetworkId: Schema.optional(Schema.String),
  fallbackToDefaultConnection: Schema.optional(Schema.String),
  nonMatchingNetworks: Schema.optional(Schema.String),
})).annotate({ identifier: "PreferentialNetworkServiceConfig" }) as any as Schema.Schema<PreferentialNetworkServiceConfig>;

export interface PreferentialNetworkServiceSettings {
  /** Required. Preferential network service configurations which enables having multiple enterprise slices. There must not be multiple configurations with the same preferentialNetworkId. If a configuration is not referenced by any application by setting ApplicationPolicy.preferentialNetworkId or by setting defaultPreferentialNetworkId, it will be ignored. For devices on 4G networks, enterprise APN needs to be configured additionally to set up data call for preferential network service. These APNs can be added using apnPolicy. */
  preferentialNetworkServiceConfigs?: Array<PreferentialNetworkServiceConfig>;
  /** Required. Default preferential network ID for the applications that are not in applications or if ApplicationPolicy.preferentialNetworkId is set to PREFERENTIAL_NETWORK_ID_UNSPECIFIED. There must be a configuration for the specified network ID in preferentialNetworkServiceConfigs, unless this is set to NO_PREFERENTIAL_NETWORK. If set to PREFERENTIAL_NETWORK_ID_UNSPECIFIED or unset, this defaults to NO_PREFERENTIAL_NETWORK. Note: If the default preferential network is misconfigured, applications with no ApplicationPolicy.preferentialNetworkId set are not able to access the internet. This setting does not apply to the following critical apps: com.google.android.apps.work.clouddpc com.google.android.gmsApplicationPolicy.preferentialNetworkId can still be used to configure the preferential network for them. */
  defaultPreferentialNetworkId?: "PREFERENTIAL_NETWORK_ID_UNSPECIFIED" | "NO_PREFERENTIAL_NETWORK" | "PREFERENTIAL_NETWORK_ID_ONE" | "PREFERENTIAL_NETWORK_ID_TWO" | "PREFERENTIAL_NETWORK_ID_THREE" | "PREFERENTIAL_NETWORK_ID_FOUR" | "PREFERENTIAL_NETWORK_ID_FIVE" | (string & {});
}

export const PreferentialNetworkServiceSettings: Schema.Schema<PreferentialNetworkServiceSettings> = Schema.suspend(() => Schema.Struct({
  preferentialNetworkServiceConfigs: Schema.optional(Schema.Array(PreferentialNetworkServiceConfig)),
  defaultPreferentialNetworkId: Schema.optional(Schema.String),
})).annotate({ identifier: "PreferentialNetworkServiceSettings" }) as any as Schema.Schema<PreferentialNetworkServiceSettings>;

export interface ApnSetting {
  /** Required. Usage categories for the APN. Policy will be rejected if this field is empty or contains APN_TYPE_UNSPECIFIED or duplicates. Multiple APN types can be set on fully managed devices. ENTERPRISE is the only allowed APN type on work profiles. A NonComplianceDetail with MANAGEMENT_MODE is reported for any other value on work profiles. APN types that are not supported on the device or management mode will be ignored. If this results in the empty list, the APN setting will be ignored, because apnTypes is a required field. A NonComplianceDetail with INVALID_VALUE is reported if none of the APN types are supported on the device or management mode. */
  apnTypes?: Array<"APN_TYPE_UNSPECIFIED" | "ENTERPRISE" | "BIP" | "CBS" | "DEFAULT" | "DUN" | "EMERGENCY" | "FOTA" | "HIPRI" | "IA" | "IMS" | "MCX" | "MMS" | "RCS" | "SUPL" | "VSIM" | "XCAP" | (string & {})>;
  /** Required. Name of the APN. Policy will be rejected if this field is empty. */
  apn?: string;
  /** Required. Human-readable name that describes the APN. Policy will be rejected if this field is empty. */
  displayName?: string;
  /** Optional. Whether User Plane resources have to be activated during every transition from CM-IDLE mode to CM-CONNECTED state for this APN. See 3GPP TS 23.501 section 5.6.13. */
  alwaysOnSetting?: "ALWAYS_ON_SETTING_UNSPECIFIED" | "NOT_ALWAYS_ON" | "ALWAYS_ON" | (string & {});
  /** Optional. Authentication type of the APN. */
  authType?: "AUTH_TYPE_UNSPECIFIED" | "NONE" | "PAP" | "CHAP" | "PAP_OR_CHAP" | (string & {});
  /** Optional. Carrier ID for the APN. A value of 0 (default) means not set and negative values are rejected. */
  carrierId?: number;
  /** Optional. MMS (Multimedia Messaging Service) proxy address of the APN which can be an IP address or hostname (not a URL). */
  mmsProxyAddress?: string;
  /** Optional. MMS (Multimedia Messaging Service) proxy port of the APN. A value of 0 (default) means not set and negative values are rejected. */
  mmsProxyPort?: number;
  /** Optional. MMSC (Multimedia Messaging Service Center) URI of the APN. */
  mmsc?: string;
  /** Optional. The default MTU (Maximum Transmission Unit) size in bytes of the IPv4 routes brought up by this APN setting. A value of 0 (default) means not set and negative values are rejected. Supported on Android 13 and above. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 13. */
  mtuV4?: number;
  /** Optional. The MTU (Maximum Transmission Unit) size of the IPv6 mobile interface to which the APN connected. A value of 0 (default) means not set and negative values are rejected. Supported on Android 13 and above. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 13. */
  mtuV6?: number;
  /** Optional. MVNO match type for the APN. */
  mvnoType?: "MVNO_TYPE_UNSPECIFIED" | "GID" | "ICCID" | "IMSI" | "SPN" | (string & {});
  /** Optional. Radio technologies (network types) the APN may use. Policy will be rejected if this field contains NETWORK_TYPE_UNSPECIFIED or duplicates. */
  networkTypes?: Array<"NETWORK_TYPE_UNSPECIFIED" | "EDGE" | "GPRS" | "GSM" | "HSDPA" | "HSPA" | "HSPAP" | "HSUPA" | "IWLAN" | "LTE" | "NR" | "TD_SCDMA" | "UMTS" | (string & {})>;
  /** Optional. APN username of the APN. */
  username?: string;
  /** Optional. APN password of the APN. */
  password?: string;
  /** Optional. The numeric operator ID of the APN. Numeric operator ID is defined as MCC (Mobile Country Code) + MNC (Mobile Network Code). */
  numericOperatorId?: string;
  /** Optional. The protocol to use to connect to this APN. */
  protocol?: "PROTOCOL_UNSPECIFIED" | "IP" | "IPV4V6" | "IPV6" | "NON_IP" | "PPP" | "UNSTRUCTURED" | (string & {});
  /** Optional. The protocol to use to connect to this APN while the device is roaming. */
  roamingProtocol?: "PROTOCOL_UNSPECIFIED" | "IP" | "IPV4V6" | "IPV6" | "NON_IP" | "PPP" | "UNSTRUCTURED" | (string & {});
  /** Optional. The proxy address of the APN. */
  proxyAddress?: string;
  /** Optional. The proxy port of the APN. A value of 0 (default) means not set and negative values are rejected. */
  proxyPort?: number;
}

export const ApnSetting: Schema.Schema<ApnSetting> = Schema.suspend(() => Schema.Struct({
  apnTypes: Schema.optional(Schema.Array(Schema.String)),
  apn: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  alwaysOnSetting: Schema.optional(Schema.String),
  authType: Schema.optional(Schema.String),
  carrierId: Schema.optional(Schema.Number),
  mmsProxyAddress: Schema.optional(Schema.String),
  mmsProxyPort: Schema.optional(Schema.Number),
  mmsc: Schema.optional(Schema.String),
  mtuV4: Schema.optional(Schema.Number),
  mtuV6: Schema.optional(Schema.Number),
  mvnoType: Schema.optional(Schema.String),
  networkTypes: Schema.optional(Schema.Array(Schema.String)),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  numericOperatorId: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  roamingProtocol: Schema.optional(Schema.String),
  proxyAddress: Schema.optional(Schema.String),
  proxyPort: Schema.optional(Schema.Number),
})).annotate({ identifier: "ApnSetting" }) as any as Schema.Schema<ApnSetting>;

export interface ApnPolicy {
  /** Optional. Whether override APNs are disabled or enabled. See DevicePolicyManager.setOverrideApnsEnabled (https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setOverrideApnsEnabled) for more details. */
  overrideApns?: "OVERRIDE_APNS_UNSPECIFIED" | "OVERRIDE_APNS_DISABLED" | "OVERRIDE_APNS_ENABLED" | (string & {});
  /** Optional. APN settings for override APNs. There must not be any conflict between any of APN settings provided, otherwise the policy will be rejected. Two ApnSettings are considered to conflict when all of the following fields match on both: numericOperatorId, apn, proxyAddress, proxyPort, mmsProxyAddress, mmsProxyPort, mmsc, mvnoType, protocol, roamingProtocol. If some of the APN settings result in non-compliance of INVALID_VALUE , they will be ignored. This can be set on fully managed devices on Android 10 and above. This can also be set on work profiles on Android 13 and above and only with ApnSetting's with ENTERPRISE APN type. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 10. A NonComplianceDetail with MANAGEMENT_MODE is reported for work profiles on Android versions less than 13. */
  apnSettings?: Array<ApnSetting>;
}

export const ApnPolicy: Schema.Schema<ApnPolicy> = Schema.suspend(() => Schema.Struct({
  overrideApns: Schema.optional(Schema.String),
  apnSettings: Schema.optional(Schema.Array(ApnSetting)),
})).annotate({ identifier: "ApnPolicy" }) as any as Schema.Schema<ApnPolicy>;

export interface PrivateDnsSettings {
  /** Optional. The configuration mode for device's global private DNS settings. If this is set to PRIVATE_DNS_SPECIFIED_HOST, then private_dns_host must be set. */
  privateDnsMode?: "PRIVATE_DNS_MODE_UNSPECIFIED" | "PRIVATE_DNS_USER_CHOICE" | "PRIVATE_DNS_AUTOMATIC" | "PRIVATE_DNS_SPECIFIED_HOST" | (string & {});
  /** Optional. The hostname of the DNS server. This must be set if and only if private_dns_mode is set to PRIVATE_DNS_SPECIFIED_HOST. Supported on Android 10 and above on fully managed devices. A NonComplianceDetail with MANAGEMENT_MODE is reported on other management modes. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 10. A NonComplianceDetail with PENDING is reported if the device is not connected to a network. A NonComplianceDetail with nonComplianceReason INVALID_VALUE and specificNonComplianceReason PRIVATE_DNS_HOST_NOT_SERVING is reported if the specified host is not a DNS server or not supported on Android. A NonComplianceReason with nonComplianceReason INVALID_VALUE is reported if applying this setting fails for any other reason. */
  privateDnsHost?: string;
}

export const PrivateDnsSettings: Schema.Schema<PrivateDnsSettings> = Schema.suspend(() => Schema.Struct({
  privateDnsMode: Schema.optional(Schema.String),
  privateDnsHost: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateDnsSettings" }) as any as Schema.Schema<PrivateDnsSettings>;

export interface DeviceConnectivityManagement {
  /** Controls what files and/or data can be transferred via USB. Supported only on company-owned devices. */
  usbDataAccess?: "USB_DATA_ACCESS_UNSPECIFIED" | "ALLOW_USB_DATA_TRANSFER" | "DISALLOW_USB_FILE_TRANSFER" | "DISALLOW_USB_DATA_TRANSFER" | (string & {});
  /** Controls Wi-Fi configuring privileges. Based on the option set, user will have either full or limited or no control in configuring Wi-Fi networks. */
  configureWifi?: "CONFIGURE_WIFI_UNSPECIFIED" | "ALLOW_CONFIGURING_WIFI" | "DISALLOW_ADD_WIFI_CONFIG" | "DISALLOW_CONFIGURING_WIFI" | (string & {});
  /** Controls configuring and using Wi-Fi direct settings. Supported on company-owned devices running Android 13 and above. */
  wifiDirectSettings?: "WIFI_DIRECT_SETTINGS_UNSPECIFIED" | "ALLOW_WIFI_DIRECT" | "DISALLOW_WIFI_DIRECT" | (string & {});
  /** Controls tethering settings. Based on the value set, the user is partially or fully disallowed from using different forms of tethering. */
  tetheringSettings?: "TETHERING_SETTINGS_UNSPECIFIED" | "ALLOW_ALL_TETHERING" | "DISALLOW_WIFI_TETHERING" | "DISALLOW_ALL_TETHERING" | (string & {});
  /** Restrictions on which Wi-Fi SSIDs the device can connect to. Note that this does not affect which networks can be configured on the device. Supported on company-owned devices running Android 13 and above. */
  wifiSsidPolicy?: WifiSsidPolicy;
  /** Optional. Wi-Fi roaming policy. */
  wifiRoamingPolicy?: WifiRoamingPolicy;
  /** Optional. Controls whether Bluetooth sharing is allowed. */
  bluetoothSharing?: "BLUETOOTH_SHARING_UNSPECIFIED" | "BLUETOOTH_SHARING_ALLOWED" | "BLUETOOTH_SHARING_DISALLOWED" | (string & {});
  /** Optional. Preferential network service configuration. Setting this field will override preferentialNetworkService. This can be set on both work profiles and fully managed devices on Android 13 and above. See 5G network slicing (https://developers.google.com/android/management/5g-network-slicing) guide for more details. */
  preferentialNetworkServiceSettings?: PreferentialNetworkServiceSettings;
  /** Optional. Access Point Name (APN) policy. Configuration for Access Point Names (APNs) which may override any other APNs on the device. See OVERRIDE_APNS_ENABLED and overrideApns for details. */
  apnPolicy?: ApnPolicy;
  /** Optional. The global private DNS settings. */
  privateDnsSettings?: PrivateDnsSettings;
}

export const DeviceConnectivityManagement: Schema.Schema<DeviceConnectivityManagement> = Schema.suspend(() => Schema.Struct({
  usbDataAccess: Schema.optional(Schema.String),
  configureWifi: Schema.optional(Schema.String),
  wifiDirectSettings: Schema.optional(Schema.String),
  tetheringSettings: Schema.optional(Schema.String),
  wifiSsidPolicy: Schema.optional(WifiSsidPolicy),
  wifiRoamingPolicy: Schema.optional(WifiRoamingPolicy),
  bluetoothSharing: Schema.optional(Schema.String),
  preferentialNetworkServiceSettings: Schema.optional(PreferentialNetworkServiceSettings),
  apnPolicy: Schema.optional(ApnPolicy),
  privateDnsSettings: Schema.optional(PrivateDnsSettings),
})).annotate({ identifier: "DeviceConnectivityManagement" }) as any as Schema.Schema<DeviceConnectivityManagement>;

export interface DeviceRadioState {
  /** Controls current state of Wi-Fi and if user can change its state. */
  wifiState?: "WIFI_STATE_UNSPECIFIED" | "WIFI_STATE_USER_CHOICE" | "WIFI_ENABLED" | "WIFI_DISABLED" | (string & {});
  /** Controls whether airplane mode can be toggled by the user or not. */
  airplaneModeState?: "AIRPLANE_MODE_STATE_UNSPECIFIED" | "AIRPLANE_MODE_USER_CHOICE" | "AIRPLANE_MODE_DISABLED" | (string & {});
  /** Controls the state of the ultra wideband setting and whether the user can toggle it on or off. */
  ultraWidebandState?: "ULTRA_WIDEBAND_STATE_UNSPECIFIED" | "ULTRA_WIDEBAND_USER_CHOICE" | "ULTRA_WIDEBAND_DISABLED" | (string & {});
  /** Controls whether cellular 2G setting can be toggled by the user or not. */
  cellularTwoGState?: "CELLULAR_TWO_G_STATE_UNSPECIFIED" | "CELLULAR_TWO_G_USER_CHOICE" | "CELLULAR_TWO_G_DISABLED" | (string & {});
  /** The minimum required security level of Wi-Fi networks that the device can connect to. */
  minimumWifiSecurityLevel?: "MINIMUM_WIFI_SECURITY_LEVEL_UNSPECIFIED" | "OPEN_NETWORK_SECURITY" | "PERSONAL_NETWORK_SECURITY" | "ENTERPRISE_NETWORK_SECURITY" | "ENTERPRISE_BIT192_NETWORK_SECURITY" | (string & {});
  /** Optional. Controls whether the user is allowed to add eSIM profiles. */
  userInitiatedAddEsimSettings?: "USER_INITIATED_ADD_ESIM_SETTINGS_UNSPECIFIED" | "USER_INITIATED_ADD_ESIM_ALLOWED" | "USER_INITIATED_ADD_ESIM_DISALLOWED" | (string & {});
}

export const DeviceRadioState: Schema.Schema<DeviceRadioState> = Schema.suspend(() => Schema.Struct({
  wifiState: Schema.optional(Schema.String),
  airplaneModeState: Schema.optional(Schema.String),
  ultraWidebandState: Schema.optional(Schema.String),
  cellularTwoGState: Schema.optional(Schema.String),
  minimumWifiSecurityLevel: Schema.optional(Schema.String),
  userInitiatedAddEsimSettings: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceRadioState" }) as any as Schema.Schema<DeviceRadioState>;

export interface ScreenBrightnessSettings {
  /** Optional. Controls the screen brightness mode. */
  screenBrightnessMode?: "SCREEN_BRIGHTNESS_MODE_UNSPECIFIED" | "BRIGHTNESS_USER_CHOICE" | "BRIGHTNESS_AUTOMATIC" | "BRIGHTNESS_FIXED" | (string & {});
  /** Optional. The screen brightness between 1 and 255 where 1 is the lowest and 255 is the highest brightness. A value of 0 (default) means no screen brightness set. Any other value is rejected. screenBrightnessMode must be either BRIGHTNESS_AUTOMATIC or BRIGHTNESS_FIXED to set this. Supported on Android 9 and above on fully managed devices. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 9. Supported on work profiles on company-owned devices on Android 15 and above. */
  screenBrightness?: number;
}

export const ScreenBrightnessSettings: Schema.Schema<ScreenBrightnessSettings> = Schema.suspend(() => Schema.Struct({
  screenBrightnessMode: Schema.optional(Schema.String),
  screenBrightness: Schema.optional(Schema.Number),
})).annotate({ identifier: "ScreenBrightnessSettings" }) as any as Schema.Schema<ScreenBrightnessSettings>;

export interface ScreenTimeoutSettings {
  /** Optional. Controls whether the user is allowed to configure the screen timeout. */
  screenTimeoutMode?: "SCREEN_TIMEOUT_MODE_UNSPECIFIED" | "SCREEN_TIMEOUT_USER_CHOICE" | "SCREEN_TIMEOUT_ENFORCED" | (string & {});
  /** Optional. Controls the screen timeout duration. The screen timeout duration must be greater than 0, otherwise it is rejected. Additionally, it should not be greater than maximumTimeToLock, otherwise the screen timeout is set to maximumTimeToLock and a NonComplianceDetail with INVALID_VALUE reason and SCREEN_TIMEOUT_GREATER_THAN_MAXIMUM_TIME_TO_LOCK specific reason is reported. If the screen timeout is less than a certain lower bound, it is set to the lower bound. The lower bound may vary across devices. If this is set, screenTimeoutMode must be SCREEN_TIMEOUT_ENFORCED. Supported on Android 9 and above on fully managed devices. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 9. Supported on work profiles on company-owned devices on Android 15 and above. */
  screenTimeout?: string;
}

export const ScreenTimeoutSettings: Schema.Schema<ScreenTimeoutSettings> = Schema.suspend(() => Schema.Struct({
  screenTimeoutMode: Schema.optional(Schema.String),
  screenTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "ScreenTimeoutSettings" }) as any as Schema.Schema<ScreenTimeoutSettings>;

export interface DisplaySettings {
  /** Optional. Controls the screen brightness settings. */
  screenBrightnessSettings?: ScreenBrightnessSettings;
  /** Optional. Controls the screen timeout settings. */
  screenTimeoutSettings?: ScreenTimeoutSettings;
}

export const DisplaySettings: Schema.Schema<DisplaySettings> = Schema.suspend(() => Schema.Struct({
  screenBrightnessSettings: Schema.optional(ScreenBrightnessSettings),
  screenTimeoutSettings: Schema.optional(ScreenTimeoutSettings),
})).annotate({ identifier: "DisplaySettings" }) as any as Schema.Schema<DisplaySettings>;

export interface WorkAccountSetupConfig {
  /** Optional. The authentication type of the user on the device. */
  authenticationType?: "AUTHENTICATION_TYPE_UNSPECIFIED" | "AUTHENTICATION_TYPE_NOT_ENFORCED" | "GOOGLE_AUTHENTICATED" | (string & {});
  /** Optional. The specific google work account email address to be added. This field is only relevant if authenticationType is GOOGLE_AUTHENTICATED. This must be an enterprise account and not a consumer account. Once set and a Google authenticated account is added to the device, changing this field will have no effect, and thus recommended to be set only once. */
  requiredAccountEmail?: string;
}

export const WorkAccountSetupConfig: Schema.Schema<WorkAccountSetupConfig> = Schema.suspend(() => Schema.Struct({
  authenticationType: Schema.optional(Schema.String),
  requiredAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkAccountSetupConfig" }) as any as Schema.Schema<WorkAccountSetupConfig>;

export interface DefaultApplication {
  /** Required. The package name that should be set as the default application. The policy is rejected if the package name is invalid. */
  packageName?: string;
}

export const DefaultApplication: Schema.Schema<DefaultApplication> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultApplication" }) as any as Schema.Schema<DefaultApplication>;

export interface DefaultApplicationSetting {
  /** Required. The app type to set the default application. */
  defaultApplicationType?: "DEFAULT_APPLICATION_TYPE_UNSPECIFIED" | "DEFAULT_ASSISTANT" | "DEFAULT_BROWSER" | "DEFAULT_CALL_REDIRECTION" | "DEFAULT_CALL_SCREENING" | "DEFAULT_DIALER" | "DEFAULT_HOME" | "DEFAULT_SMS" | "DEFAULT_WALLET" | (string & {});
  /** Required. The list of applications that can be set as the default app for a given type. This list must not be empty or contain duplicates. The first app in the list that is installed and qualified for the defaultApplicationType (e.g. SMS app for DEFAULT_SMS) is set as the default app. The signing key certificate fingerprint of the app on the device must also match one of the signing key certificate fingerprints obtained from Play Store or one of the entries in ApplicationPolicy.signingKeyCerts in order to be set as the default.If the defaultApplicationScopes contains SCOPE_FULLY_MANAGED or SCOPE_WORK_PROFILE, the app must have an entry in applications with installType set to a value other than BLOCKED.A NonComplianceDetail with APP_NOT_INSTALLED reason and DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE specific reason is reported if none of the apps in the list are installed. A NonComplianceDetail with INVALID_VALUE reason and DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE specific reason is reported if at least one app is installed but the policy fails to apply due to other reasons (e.g. the app is not of the right type).When applying to SCOPE_PERSONAL_PROFILE on a company-owned device with a work profile, only pre-installed system apps can be set as the default. A NonComplianceDetail with INVALID_VALUE reason and DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE specific reason is reported if the policy fails to apply to the personal profile. */
  defaultApplications?: Array<DefaultApplication>;
  /** Required. The scopes to which the policy should be applied. This list must not be empty or contain duplicates.A NonComplianceDetail with MANAGEMENT_MODE reason and DEFAULT_APPLICATION_SETTING_UNSUPPORTED_SCOPES specific reason is reported if none of the specified scopes can be applied to the management mode (e.g. a fully managed device receives a policy with only SCOPE_PERSONAL_PROFILE in the list). */
  defaultApplicationScopes?: Array<"DEFAULT_APPLICATION_SCOPE_UNSPECIFIED" | "SCOPE_FULLY_MANAGED" | "SCOPE_WORK_PROFILE" | "SCOPE_PERSONAL_PROFILE" | (string & {})>;
}

export const DefaultApplicationSetting: Schema.Schema<DefaultApplicationSetting> = Schema.suspend(() => Schema.Struct({
  defaultApplicationType: Schema.optional(Schema.String),
  defaultApplications: Schema.optional(Schema.Array(DefaultApplication)),
  defaultApplicationScopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DefaultApplicationSetting" }) as any as Schema.Schema<DefaultApplicationSetting>;

export interface Policy {
  /** The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}. */
  name?: string;
  /** The version of the policy. This is a read-only field. The version is incremented each time the policy is updated. */
  version?: string;
  /** Policy applied to apps. This can have at most 3,000 elements. */
  applications?: Array<ApplicationPolicy>;
  /** Maximum time in milliseconds for user activity until the device locks. A value of 0 means there is no restriction. */
  maximumTimeToLock?: string;
  /** Whether screen capture is disabled. */
  screenCaptureDisabled?: boolean;
  /** If camera_access is set to any value other than CAMERA_ACCESS_UNSPECIFIED, this has no effect. Otherwise this field controls whether cameras are disabled: If true, all cameras are disabled, otherwise they are available. For fully managed devices this field applies for all apps on the device. For work profiles, this field applies only to apps in the work profile, and the camera access of apps outside the work profile is unaffected. */
  cameraDisabled?: boolean;
  /** Disabled keyguard customizations, such as widgets. */
  keyguardDisabledFeatures?: Array<"KEYGUARD_DISABLED_FEATURE_UNSPECIFIED" | "CAMERA" | "NOTIFICATIONS" | "UNREDACTED_NOTIFICATIONS" | "TRUST_AGENTS" | "DISABLE_FINGERPRINT" | "DISABLE_REMOTE_INPUT" | "FACE" | "IRIS" | "BIOMETRICS" | "SHORTCUTS" | "ALL_FEATURES" | (string & {})>;
  /** The default permission policy for runtime permission requests. */
  defaultPermissionPolicy?: "PERMISSION_POLICY_UNSPECIFIED" | "PROMPT" | "GRANT" | "DENY" | (string & {});
  /** Default intent handler activities. */
  persistentPreferredActivities?: Array<PersistentPreferredActivity>;
  /** Network configuration for the device. See configure networks for more information. */
  openNetworkConfiguration?: Record<string, unknown>;
  /** The system update policy, which controls how OS updates are applied. If the update type is WINDOWED, the update window will automatically apply to Play app updates as well.Note: Google Play system updates (https://source.android.com/docs/core/ota/modular-system) (also called Mainline updates) are automatically downloaded and require a device reboot to be installed. Refer to the mainline section in Manage system updates (https://developer.android.com/work/dpc/system-updates#mainline) for further details. */
  systemUpdate?: SystemUpdate;
  /** Account types that can't be managed by the user. */
  accountTypesWithManagementDisabled?: Array<string>;
  /** Whether adding new users and profiles is disabled. For devices where managementMode is DEVICE_OWNER this field is ignored and the user is never allowed to add or remove users. */
  addUserDisabled?: boolean;
  /** Whether adjusting the master volume is disabled. Also mutes the device. The setting has effect only on fully managed devices. */
  adjustVolumeDisabled?: boolean;
  /** Whether factory resetting from settings is disabled. */
  factoryResetDisabled?: boolean;
  /** Whether user installation of apps is disabled. */
  installAppsDisabled?: boolean;
  /** Whether the user mounting physical external media is disabled. */
  mountPhysicalMediaDisabled?: boolean;
  /** Whether adding or removing accounts is disabled. */
  modifyAccountsDisabled?: boolean;
  /** Whether rebooting the device into safe boot is disabled. */
  safeBootDisabled?: boolean;
  /** Whether user uninstallation of applications is disabled. This prevents apps from being uninstalled, even those removed using applications */
  uninstallAppsDisabled?: boolean;
  /** Whether the status bar is disabled. This disables notifications, quick settings, and other screen overlays that allow escape from full-screen mode. DEPRECATED. To disable the status bar on a kiosk device, use InstallType KIOSK or kioskCustomLauncherEnabled. */
  statusBarDisabled?: boolean;
  /** If true, this disables the Lock Screen (https://source.android.com/docs/core/display/multi_display/lock-screen) for primary and/or secondary displays. This policy is supported only in dedicated device management mode. */
  keyguardDisabled?: boolean;
  /** The minimum allowed Android API level. */
  minimumApiLevel?: number;
  /** Status reporting settings */
  statusReportingSettings?: StatusReportingSettings;
  /** Whether bluetooth contact sharing is disabled. */
  bluetoothContactSharingDisabled?: boolean;
  /** A message displayed to the user in the settings screen wherever functionality has been disabled by the admin. If the message is longer than 200 characters it may be truncated. */
  shortSupportMessage?: UserFacingMessage;
  /** A message displayed to the user in the device administators settings screen. */
  longSupportMessage?: UserFacingMessage;
  /** Password requirements. The field password_requirements.require_password_unlock must not be set. DEPRECATED - Use passwordPolicies.Note:Complexity-based values of PasswordQuality, that is, COMPLEXITY_LOW, COMPLEXITY_MEDIUM, and COMPLEXITY_HIGH, cannot be used here. unified_lock_settings cannot be used here. */
  passwordRequirements?: PasswordRequirements;
  /** This is deprecated. */
  wifiConfigsLockdownEnabled?: boolean;
  /** Whether configuring bluetooth is disabled. */
  bluetoothConfigDisabled?: boolean;
  /** Whether configuring cell broadcast is disabled. */
  cellBroadcastsConfigDisabled?: boolean;
  /** Whether configuring user credentials is disabled. */
  credentialsConfigDisabled?: boolean;
  /** Whether configuring mobile networks is disabled. */
  mobileNetworksConfigDisabled?: boolean;
  /** Whether configuring tethering and portable hotspots is disabled. If tetheringSettings is set to anything other than TETHERING_SETTINGS_UNSPECIFIED, this setting is ignored. */
  tetheringConfigDisabled?: boolean;
  /** Whether configuring VPN is disabled. */
  vpnConfigDisabled?: boolean;
  /** Whether configuring Wi-Fi networks is disabled. Supported on fully managed devices and work profiles on company-owned devices. For fully managed devices, setting this to true removes all configured networks and retains only the networks configured using openNetworkConfiguration. For work profiles on company-owned devices, existing configured networks are not affected and the user is not allowed to add, remove, or modify Wi-Fi networks. If configureWifi is set to anything other than CONFIGURE_WIFI_UNSPECIFIED, this setting is ignored. Note: If a network connection can't be made at boot time and configuring Wi-Fi is disabled then network escape hatch will be shown in order to refresh the device policy (see networkEscapeHatchEnabled). */
  wifiConfigDisabled?: boolean;
  /** Whether creating windows besides app windows is disabled. */
  createWindowsDisabled?: boolean;
  /** Whether resetting network settings is disabled. */
  networkResetDisabled?: boolean;
  /** Whether using NFC to beam data from apps is disabled. */
  outgoingBeamDisabled?: boolean;
  /** Whether outgoing calls are disabled. */
  outgoingCallsDisabled?: boolean;
  /** Whether removing other users is disabled. */
  removeUserDisabled?: boolean;
  /** Whether location sharing is disabled. */
  shareLocationDisabled?: boolean;
  /** Whether sending and receiving SMS messages is disabled. */
  smsDisabled?: boolean;
  /** If microphone_access is set to any value other than MICROPHONE_ACCESS_UNSPECIFIED, this has no effect. Otherwise this field controls whether microphones are disabled: If true, all microphones are disabled, otherwise they are available. This is available only on fully managed devices. */
  unmuteMicrophoneDisabled?: boolean;
  /** Whether transferring files over USB is disabled. This is supported only on company-owned devices. */
  usbFileTransferDisabled?: boolean;
  /** Whether app verification is force-enabled. */
  ensureVerifyAppsEnabled?: boolean;
  /** If present, only the input methods provided by packages in this list are permitted. If this field is present, but the list is empty, then only system input methods are permitted. */
  permittedInputMethods?: PackageNameList;
  /** The battery plugged in modes for which the device stays on. When using this setting, it is recommended to clear maximum_time_to_lock so that the device doesn't lock itself while it stays on. */
  stayOnPluggedModes?: Array<"BATTERY_PLUGGED_MODE_UNSPECIFIED" | "AC" | "USB" | "WIRELESS" | (string & {})>;
  /** The network-independent global HTTP proxy. Typically proxies should be configured per-network in open_network_configuration. However for unusual configurations like general internal filtering a global HTTP proxy may be useful. If the proxy is not accessible, network access may break. The global proxy is only a recommendation and some apps may ignore it. */
  recommendedGlobalProxy?: ProxyInfo;
  /** Whether changing the user icon is disabled. This applies only on devices running Android 7 and above. */
  setUserIconDisabled?: boolean;
  /** Whether changing the wallpaper is disabled. */
  setWallpaperDisabled?: boolean;
  /** Rules for determining apps' access to private keys. See ChoosePrivateKeyRule for details. This must be empty if any application has CERT_SELECTION delegation scope. */
  choosePrivateKeyRules?: Array<ChoosePrivateKeyRule>;
  /** Configuration for an always-on VPN connection. Use with vpn_config_disabled to prevent modification of this setting. */
  alwaysOnVpnPackage?: AlwaysOnVpnPackage;
  /** Email addresses of device administrators for factory reset protection. When the device is factory reset, it will require one of these admins to log in with the Google account email and password to unlock the device. If no admins are specified, the device won't provide factory reset protection. */
  frpAdminEmails?: Array<string>;
  /** The device owner information to be shown on the lock screen. */
  deviceOwnerLockScreenInfo?: UserFacingMessage;
  /** Whether roaming data services are disabled. */
  dataRoamingDisabled?: boolean;
  /** The degree of location detection enabled. */
  locationMode?: "LOCATION_MODE_UNSPECIFIED" | "HIGH_ACCURACY" | "SENSORS_ONLY" | "BATTERY_SAVING" | "OFF" | "LOCATION_USER_CHOICE" | "LOCATION_ENFORCED" | "LOCATION_DISABLED" | (string & {});
  /** Whether the network escape hatch is enabled. If a network connection can't be made at boot time, the escape hatch prompts the user to temporarily connect to a network in order to refresh the device policy. After applying policy, the temporary network will be forgotten and the device will continue booting. This prevents being unable to connect to a network if there is no suitable network in the last policy and the device boots into an app in lock task mode, or the user is otherwise unable to reach device settings.Note: Setting wifiConfigDisabled to true will override this setting under specific circumstances. Please see wifiConfigDisabled for further details. Setting configureWifi to DISALLOW_CONFIGURING_WIFI will override this setting under specific circumstances. Please see DISALLOW_CONFIGURING_WIFI for further details. */
  networkEscapeHatchEnabled?: boolean;
  /** Whether bluetooth is disabled. Prefer this setting over bluetooth_config_disabled because bluetooth_config_disabled can be bypassed by the user. */
  bluetoothDisabled?: boolean;
  /** Rules declaring which mitigating actions to take when a device is not compliant with its policy. When the conditions for multiple rules are satisfied, all of the mitigating actions for the rules are taken. There is a maximum limit of 100 rules. Use policy enforcement rules instead. */
  complianceRules?: Array<ComplianceRule>;
  /** This field has no effect. */
  blockApplicationsEnabled?: boolean;
  /** This field has no effect. */
  installUnknownSourcesAllowed?: boolean;
  /** Whether the user is allowed to enable debugging features. */
  debuggingFeaturesAllowed?: boolean;
  /** Whether the user is allowed to have fun. Controls whether the Easter egg game in Settings is disabled. */
  funDisabled?: boolean;
  /** Whether auto time is required, which prevents the user from manually setting the date and time. If autoDateAndTimeZone is set, this field is ignored. */
  autoTimeRequired?: boolean;
  /** Specifies permitted accessibility services. If the field is not set, any accessibility service can be used. If the field is set, only the accessibility services in this list and the system's built-in accessibility service can be used. In particular, if the field is set to empty, only the system's built-in accessibility servicess can be used. This can be set on fully managed devices and on work profiles. When applied to a work profile, this affects both the personal profile and the work profile. */
  permittedAccessibilityServices?: PackageNameList;
  /** Recommended alternative: autoUpdateMode which is set per app, provides greater flexibility around update frequency.When autoUpdateMode is set to AUTO_UPDATE_POSTPONED or AUTO_UPDATE_HIGH_PRIORITY, this field has no effect.The app auto update policy, which controls when automatic app updates can be applied. */
  appAutoUpdatePolicy?: "APP_AUTO_UPDATE_POLICY_UNSPECIFIED" | "CHOICE_TO_THE_USER" | "NEVER" | "WIFI_ONLY" | "ALWAYS" | (string & {});
  /** Whether the kiosk custom launcher is enabled. This replaces the home screen with a launcher that locks down the device to the apps installed via the applications setting. Apps appear on a single page in alphabetical order. Use kioskCustomization to further configure the kiosk device behavior. */
  kioskCustomLauncherEnabled?: boolean;
  /** This setting is not supported. Any value is ignored. */
  androidDevicePolicyTracks?: Array<"APP_TRACK_UNSPECIFIED" | "PRODUCTION" | "BETA" | (string & {})>;
  /** Flag to skip hints on the first use. Enterprise admin can enable the system recommendation for apps to skip their user tutorial and other introductory hints on first start-up. */
  skipFirstUseHintsEnabled?: boolean;
  /** Allows showing UI on a device for a user to choose a private key alias if there are no matching rules in ChoosePrivateKeyRules. For devices below Android P, setting this may leave enterprise keys vulnerable. This value will have no effect if any application has CERT_SELECTION delegation scope. */
  privateKeySelectionEnabled?: boolean;
  /** Whether encryption is enabled */
  encryptionPolicy?: "ENCRYPTION_POLICY_UNSPECIFIED" | "ENABLED_WITHOUT_PASSWORD" | "ENABLED_WITH_PASSWORD" | (string & {});
  /** Whether USB storage is enabled. Deprecated. */
  usbMassStorageEnabled?: boolean;
  /** Explicit permission or group grants or denials for all apps. These values override the default_permission_policy. */
  permissionGrants?: Array<PermissionGrant>;
  /** This mode controls which apps are available to the user in the Play Store and the behavior on the device when apps are removed from the policy. */
  playStoreMode?: "PLAY_STORE_MODE_UNSPECIFIED" | "WHITELIST" | "BLACKLIST" | (string & {});
  /** Action to take during the setup process. At most one action may be specified. */
  setupActions?: Array<SetupAction>;
  /** Password requirement policies. Different policies can be set for work profile or fully managed devices by setting the password_scope field in the policy. */
  passwordPolicies?: Array<PasswordRequirements>;
  /** Rules that define the behavior when a particular policy can not be applied on device */
  policyEnforcementRules?: Array<PolicyEnforcementRule>;
  /** Settings controlling the behavior of a device in kiosk mode. To enable kiosk mode, set kioskCustomLauncherEnabled to true or specify an app in the policy with installType KIOSK. */
  kioskCustomization?: KioskCustomization;
  /** Advanced security settings. In most cases, setting these is not needed. */
  advancedSecurityOverrides?: AdvancedSecurityOverrides;
  /** Policies managing personal usage on a company-owned device. */
  personalUsagePolicies?: PersonalUsagePolicies;
  /** Whether auto date, time, and time zone are enabled on a company-owned device. If this is set, then autoTimeRequired is ignored. */
  autoDateAndTimeZone?: "AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED" | "AUTO_DATE_AND_TIME_ZONE_USER_CHOICE" | "AUTO_DATE_AND_TIME_ZONE_ENFORCED" | (string & {});
  /** This feature is not generally available. */
  oncCertificateProviders?: Array<OncCertificateProvider>;
  /** Cross-profile policies applied on the device. */
  crossProfilePolicies?: CrossProfilePolicies;
  /** Controls whether preferential network service is enabled on the work profile or on fully managed devices. For example, an organization may have an agreement with a carrier that all of the work data from its employees' devices will be sent via a network service dedicated for enterprise use. An example of a supported preferential network service is the enterprise slice on 5G networks. This policy has no effect if preferentialNetworkServiceSettings or ApplicationPolicy.preferentialNetworkId is set on devices running Android 13 or above. */
  preferentialNetworkService?: "PREFERENTIAL_NETWORK_SERVICE_UNSPECIFIED" | "PREFERENTIAL_NETWORK_SERVICE_DISABLED" | "PREFERENTIAL_NETWORK_SERVICE_ENABLED" | (string & {});
  /** Configuration of device activity logging. */
  usageLog?: UsageLog;
  /** Controls the use of the camera and whether the user has access to the camera access toggle. */
  cameraAccess?: "CAMERA_ACCESS_UNSPECIFIED" | "CAMERA_ACCESS_USER_CHOICE" | "CAMERA_ACCESS_DISABLED" | "CAMERA_ACCESS_ENFORCED" | (string & {});
  /** Controls the use of the microphone and whether the user has access to the microphone access toggle. This applies only on fully managed devices. */
  microphoneAccess?: "MICROPHONE_ACCESS_UNSPECIFIED" | "MICROPHONE_ACCESS_USER_CHOICE" | "MICROPHONE_ACCESS_DISABLED" | "MICROPHONE_ACCESS_ENFORCED" | (string & {});
  /** Covers controls for device connectivity such as Wi-Fi, USB data access, keyboard/mouse connections, and more. */
  deviceConnectivityManagement?: DeviceConnectivityManagement;
  /** Covers controls for radio state such as Wi-Fi, bluetooth, and more. */
  deviceRadioState?: DeviceRadioState;
  /** Controls which apps are allowed to act as credential providers on Android 14 and above. These apps store credentials, see this (https://developer.android.com/training/sign-in/passkeys) and this (https://developer.android.com/reference/androidx/credentials/CredentialManager) for details. See also credentialProviderPolicy. */
  credentialProviderPolicyDefault?: "CREDENTIAL_PROVIDER_POLICY_DEFAULT_UNSPECIFIED" | "CREDENTIAL_PROVIDER_DEFAULT_DISALLOWED" | "CREDENTIAL_PROVIDER_DEFAULT_DISALLOWED_EXCEPT_SYSTEM" | (string & {});
  /** Optional. Controls whether printing is allowed. This is supported on devices running Android 9 and above. . */
  printingPolicy?: "PRINTING_POLICY_UNSPECIFIED" | "PRINTING_DISALLOWED" | "PRINTING_ALLOWED" | (string & {});
  /** Optional. Controls for the display settings. */
  displaySettings?: DisplaySettings;
  /** Optional. Controls whether AssistContent (https://developer.android.com/reference/android/app/assist/AssistContent) is allowed to be sent to a privileged app such as an assistant app. AssistContent includes screenshots and information about an app, such as package name. This is supported on Android 15 and above. */
  assistContentPolicy?: "ASSIST_CONTENT_POLICY_UNSPECIFIED" | "ASSIST_CONTENT_DISALLOWED" | "ASSIST_CONTENT_ALLOWED" | (string & {});
  /** Optional. Controls the work account setup configuration, such as details of whether a Google authenticated account is required. */
  workAccountSetupConfig?: WorkAccountSetupConfig;
  /** Optional. Wipe flags to indicate what data is wiped when a device or profile wipe is triggered due to any reason (for example, non-compliance). This does not apply to the enterprises.devices.delete method. . This list must not have duplicates. */
  wipeDataFlags?: Array<"WIPE_DATA_FLAG_UNSPECIFIED" | "WIPE_ESIMS" | (string & {})>;
  /** Optional. Controls whether the enterpriseDisplayName is visible on the device (e.g. lock screen message on company-owned devices). */
  enterpriseDisplayNameVisibility?: "ENTERPRISE_DISPLAY_NAME_VISIBILITY_UNSPECIFIED" | "ENTERPRISE_DISPLAY_NAME_VISIBLE" | "ENTERPRISE_DISPLAY_NAME_HIDDEN" | (string & {});
  /** Optional. Controls whether apps on the device for fully managed devices or in the work profile for devices with work profiles are allowed to expose app functions. */
  appFunctions?: "APP_FUNCTIONS_UNSPECIFIED" | "APP_FUNCTIONS_DISALLOWED" | "APP_FUNCTIONS_ALLOWED" | (string & {});
  /** Optional. The default application setting for supported types. If the default application is successfully set for at least one app type on a profile, users are prevented from changing any default applications on that profile.Only one DefaultApplicationSetting is allowed for each DefaultApplicationType.See Default application settings (https://developers.google.com/android/management/default-application-settings) guide for more details. */
  defaultApplicationSettings?: Array<DefaultApplicationSetting>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  applications: Schema.optional(Schema.Array(ApplicationPolicy)),
  maximumTimeToLock: Schema.optional(Schema.String),
  screenCaptureDisabled: Schema.optional(Schema.Boolean),
  cameraDisabled: Schema.optional(Schema.Boolean),
  keyguardDisabledFeatures: Schema.optional(Schema.Array(Schema.String)),
  defaultPermissionPolicy: Schema.optional(Schema.String),
  persistentPreferredActivities: Schema.optional(Schema.Array(PersistentPreferredActivity)),
  openNetworkConfiguration: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  systemUpdate: Schema.optional(SystemUpdate),
  accountTypesWithManagementDisabled: Schema.optional(Schema.Array(Schema.String)),
  addUserDisabled: Schema.optional(Schema.Boolean),
  adjustVolumeDisabled: Schema.optional(Schema.Boolean),
  factoryResetDisabled: Schema.optional(Schema.Boolean),
  installAppsDisabled: Schema.optional(Schema.Boolean),
  mountPhysicalMediaDisabled: Schema.optional(Schema.Boolean),
  modifyAccountsDisabled: Schema.optional(Schema.Boolean),
  safeBootDisabled: Schema.optional(Schema.Boolean),
  uninstallAppsDisabled: Schema.optional(Schema.Boolean),
  statusBarDisabled: Schema.optional(Schema.Boolean),
  keyguardDisabled: Schema.optional(Schema.Boolean),
  minimumApiLevel: Schema.optional(Schema.Number),
  statusReportingSettings: Schema.optional(StatusReportingSettings),
  bluetoothContactSharingDisabled: Schema.optional(Schema.Boolean),
  shortSupportMessage: Schema.optional(UserFacingMessage),
  longSupportMessage: Schema.optional(UserFacingMessage),
  passwordRequirements: Schema.optional(PasswordRequirements),
  wifiConfigsLockdownEnabled: Schema.optional(Schema.Boolean),
  bluetoothConfigDisabled: Schema.optional(Schema.Boolean),
  cellBroadcastsConfigDisabled: Schema.optional(Schema.Boolean),
  credentialsConfigDisabled: Schema.optional(Schema.Boolean),
  mobileNetworksConfigDisabled: Schema.optional(Schema.Boolean),
  tetheringConfigDisabled: Schema.optional(Schema.Boolean),
  vpnConfigDisabled: Schema.optional(Schema.Boolean),
  wifiConfigDisabled: Schema.optional(Schema.Boolean),
  createWindowsDisabled: Schema.optional(Schema.Boolean),
  networkResetDisabled: Schema.optional(Schema.Boolean),
  outgoingBeamDisabled: Schema.optional(Schema.Boolean),
  outgoingCallsDisabled: Schema.optional(Schema.Boolean),
  removeUserDisabled: Schema.optional(Schema.Boolean),
  shareLocationDisabled: Schema.optional(Schema.Boolean),
  smsDisabled: Schema.optional(Schema.Boolean),
  unmuteMicrophoneDisabled: Schema.optional(Schema.Boolean),
  usbFileTransferDisabled: Schema.optional(Schema.Boolean),
  ensureVerifyAppsEnabled: Schema.optional(Schema.Boolean),
  permittedInputMethods: Schema.optional(PackageNameList),
  stayOnPluggedModes: Schema.optional(Schema.Array(Schema.String)),
  recommendedGlobalProxy: Schema.optional(ProxyInfo),
  setUserIconDisabled: Schema.optional(Schema.Boolean),
  setWallpaperDisabled: Schema.optional(Schema.Boolean),
  choosePrivateKeyRules: Schema.optional(Schema.Array(ChoosePrivateKeyRule)),
  alwaysOnVpnPackage: Schema.optional(AlwaysOnVpnPackage),
  frpAdminEmails: Schema.optional(Schema.Array(Schema.String)),
  deviceOwnerLockScreenInfo: Schema.optional(UserFacingMessage),
  dataRoamingDisabled: Schema.optional(Schema.Boolean),
  locationMode: Schema.optional(Schema.String),
  networkEscapeHatchEnabled: Schema.optional(Schema.Boolean),
  bluetoothDisabled: Schema.optional(Schema.Boolean),
  complianceRules: Schema.optional(Schema.Array(ComplianceRule)),
  blockApplicationsEnabled: Schema.optional(Schema.Boolean),
  installUnknownSourcesAllowed: Schema.optional(Schema.Boolean),
  debuggingFeaturesAllowed: Schema.optional(Schema.Boolean),
  funDisabled: Schema.optional(Schema.Boolean),
  autoTimeRequired: Schema.optional(Schema.Boolean),
  permittedAccessibilityServices: Schema.optional(PackageNameList),
  appAutoUpdatePolicy: Schema.optional(Schema.String),
  kioskCustomLauncherEnabled: Schema.optional(Schema.Boolean),
  androidDevicePolicyTracks: Schema.optional(Schema.Array(Schema.String)),
  skipFirstUseHintsEnabled: Schema.optional(Schema.Boolean),
  privateKeySelectionEnabled: Schema.optional(Schema.Boolean),
  encryptionPolicy: Schema.optional(Schema.String),
  usbMassStorageEnabled: Schema.optional(Schema.Boolean),
  permissionGrants: Schema.optional(Schema.Array(PermissionGrant)),
  playStoreMode: Schema.optional(Schema.String),
  setupActions: Schema.optional(Schema.Array(SetupAction)),
  passwordPolicies: Schema.optional(Schema.Array(PasswordRequirements)),
  policyEnforcementRules: Schema.optional(Schema.Array(PolicyEnforcementRule)),
  kioskCustomization: Schema.optional(KioskCustomization),
  advancedSecurityOverrides: Schema.optional(AdvancedSecurityOverrides),
  personalUsagePolicies: Schema.optional(PersonalUsagePolicies),
  autoDateAndTimeZone: Schema.optional(Schema.String),
  oncCertificateProviders: Schema.optional(Schema.Array(OncCertificateProvider)),
  crossProfilePolicies: Schema.optional(CrossProfilePolicies),
  preferentialNetworkService: Schema.optional(Schema.String),
  usageLog: Schema.optional(UsageLog),
  cameraAccess: Schema.optional(Schema.String),
  microphoneAccess: Schema.optional(Schema.String),
  deviceConnectivityManagement: Schema.optional(DeviceConnectivityManagement),
  deviceRadioState: Schema.optional(DeviceRadioState),
  credentialProviderPolicyDefault: Schema.optional(Schema.String),
  printingPolicy: Schema.optional(Schema.String),
  displaySettings: Schema.optional(DisplaySettings),
  assistContentPolicy: Schema.optional(Schema.String),
  workAccountSetupConfig: Schema.optional(WorkAccountSetupConfig),
  wipeDataFlags: Schema.optional(Schema.Array(Schema.String)),
  enterpriseDisplayNameVisibility: Schema.optional(Schema.String),
  appFunctions: Schema.optional(Schema.String),
  defaultApplicationSettings: Schema.optional(Schema.Array(DefaultApplicationSetting)),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ListPoliciesResponse {
  /** The list of policies. */
  policies?: Array<Policy>;
  /** If there are more results, a token to retrieve next page of results. */
  nextPageToken?: string;
}

export const ListPoliciesResponse: Schema.Schema<ListPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  policies: Schema.optional(Schema.Array(Policy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPoliciesResponse" }) as any as Schema.Schema<ListPoliciesResponse>;

export interface ApplicationPolicyChange {
  /** If ApplicationPolicy.packageName matches an existing ApplicationPolicy object within the Policy being modified, then that object will be updated. Otherwise, it will be added to the end of the Policy.applications. */
  application?: ApplicationPolicy;
  /** The field mask indicating the fields to update. If omitted, all modifiable fields are updated. */
  updateMask?: string;
}

export const ApplicationPolicyChange: Schema.Schema<ApplicationPolicyChange> = Schema.suspend(() => Schema.Struct({
  application: Schema.optional(ApplicationPolicy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationPolicyChange" }) as any as Schema.Schema<ApplicationPolicyChange>;

export interface ModifyPolicyApplicationsRequest {
  /** Required. The changes to be made to the ApplicationPolicy objects. There must be at least one ApplicationPolicyChange. */
  changes?: Array<ApplicationPolicyChange>;
}

export const ModifyPolicyApplicationsRequest: Schema.Schema<ModifyPolicyApplicationsRequest> = Schema.suspend(() => Schema.Struct({
  changes: Schema.optional(Schema.Array(ApplicationPolicyChange)),
})).annotate({ identifier: "ModifyPolicyApplicationsRequest" }) as any as Schema.Schema<ModifyPolicyApplicationsRequest>;

export interface ModifyPolicyApplicationsResponse {
  /** The updated policy. */
  policy?: Policy;
}

export const ModifyPolicyApplicationsResponse: Schema.Schema<ModifyPolicyApplicationsResponse> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "ModifyPolicyApplicationsResponse" }) as any as Schema.Schema<ModifyPolicyApplicationsResponse>;

export interface RemovePolicyApplicationsRequest {
  /** Required. Package names to be removed. Entries that are not found are ignored. There must be at least one entry in package_names. */
  packageNames?: Array<string>;
}

export const RemovePolicyApplicationsRequest: Schema.Schema<RemovePolicyApplicationsRequest> = Schema.suspend(() => Schema.Struct({
  packageNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RemovePolicyApplicationsRequest" }) as any as Schema.Schema<RemovePolicyApplicationsRequest>;

export interface RemovePolicyApplicationsResponse {
  /** The updated policy after ApplicationPolicy objects have been removed. */
  policy?: Policy;
}

export const RemovePolicyApplicationsResponse: Schema.Schema<RemovePolicyApplicationsResponse> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "RemovePolicyApplicationsResponse" }) as any as Schema.Schema<RemovePolicyApplicationsResponse>;

export interface ClearAppsDataParams {
  /** The package names of the apps whose data will be cleared when the command is executed. */
  packageNames?: Array<string>;
}

export const ClearAppsDataParams: Schema.Schema<ClearAppsDataParams> = Schema.suspend(() => Schema.Struct({
  packageNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ClearAppsDataParams" }) as any as Schema.Schema<ClearAppsDataParams>;

export interface StartLostModeParams {
  /** The message displayed to the user when the device is in lost mode. */
  lostMessage?: UserFacingMessage;
  /** The phone number that will be called when the device is in lost mode and the call owner button is tapped. */
  lostPhoneNumber?: UserFacingMessage;
  /** The email address displayed to the user when the device is in lost mode. */
  lostEmailAddress?: string;
  /** The street address displayed to the user when the device is in lost mode. */
  lostStreetAddress?: UserFacingMessage;
  /** The organization name displayed to the user when the device is in lost mode. */
  lostOrganization?: UserFacingMessage;
}

export const StartLostModeParams: Schema.Schema<StartLostModeParams> = Schema.suspend(() => Schema.Struct({
  lostMessage: Schema.optional(UserFacingMessage),
  lostPhoneNumber: Schema.optional(UserFacingMessage),
  lostEmailAddress: Schema.optional(Schema.String),
  lostStreetAddress: Schema.optional(UserFacingMessage),
  lostOrganization: Schema.optional(UserFacingMessage),
})).annotate({ identifier: "StartLostModeParams" }) as any as Schema.Schema<StartLostModeParams>;

export interface StopLostModeParams {
}

export const StopLostModeParams: Schema.Schema<StopLostModeParams> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopLostModeParams" }) as any as Schema.Schema<StopLostModeParams>;

export interface AddEsimParams {
  /** Required. The activation code for the eSIM profile. */
  activationCode?: string;
  /** Required. The activation state of the eSIM profile once it is downloaded. */
  activationState?: "ACTIVATION_STATE_UNSPECIFIED" | "ACTIVATED" | "NOT_ACTIVATED" | (string & {});
}

export const AddEsimParams: Schema.Schema<AddEsimParams> = Schema.suspend(() => Schema.Struct({
  activationCode: Schema.optional(Schema.String),
  activationState: Schema.optional(Schema.String),
})).annotate({ identifier: "AddEsimParams" }) as any as Schema.Schema<AddEsimParams>;

export interface RemoveEsimParams {
  /** Required. ICC ID of the eSIM profile to be deleted. */
  iccId?: string;
}

export const RemoveEsimParams: Schema.Schema<RemoveEsimParams> = Schema.suspend(() => Schema.Struct({
  iccId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveEsimParams" }) as any as Schema.Schema<RemoveEsimParams>;

export interface RequestDeviceInfoParams {
  /** Required. Type of device information to be requested. */
  deviceInfo?: "DEVICE_INFO_UNSPECIFIED" | "EID" | (string & {});
}

export const RequestDeviceInfoParams: Schema.Schema<RequestDeviceInfoParams> = Schema.suspend(() => Schema.Struct({
  deviceInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestDeviceInfoParams" }) as any as Schema.Schema<RequestDeviceInfoParams>;

export interface WipeParams {
  /** Optional. Flags to determine what data to wipe. */
  wipeDataFlags?: Array<"WIPE_DATA_FLAG_UNSPECIFIED" | "PRESERVE_RESET_PROTECTION_DATA" | "WIPE_EXTERNAL_STORAGE" | "WIPE_ESIMS" | (string & {})>;
  /** Optional. A short message displayed to the user before wiping the work profile on personal devices. This has no effect on company owned devices. The maximum message length is 200 characters. */
  wipeReason?: UserFacingMessage;
}

export const WipeParams: Schema.Schema<WipeParams> = Schema.suspend(() => Schema.Struct({
  wipeDataFlags: Schema.optional(Schema.Array(Schema.String)),
  wipeReason: Schema.optional(UserFacingMessage),
})).annotate({ identifier: "WipeParams" }) as any as Schema.Schema<WipeParams>;

export interface PerAppResult {
  /** The result of an attempt to clear the data of a single app. */
  clearingResult?: "CLEARING_RESULT_UNSPECIFIED" | "SUCCESS" | "APP_NOT_FOUND" | "APP_PROTECTED" | "API_LEVEL" | (string & {});
}

export const PerAppResult: Schema.Schema<PerAppResult> = Schema.suspend(() => Schema.Struct({
  clearingResult: Schema.optional(Schema.String),
})).annotate({ identifier: "PerAppResult" }) as any as Schema.Schema<PerAppResult>;

export interface ClearAppsDataStatus {
  /** The per-app results, a mapping from package names to the respective clearing result. */
  results?: Record<string, PerAppResult>;
}

export const ClearAppsDataStatus: Schema.Schema<ClearAppsDataStatus> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Record(Schema.String, PerAppResult)),
})).annotate({ identifier: "ClearAppsDataStatus" }) as any as Schema.Schema<ClearAppsDataStatus>;

export interface StartLostModeStatus {
  /** The status. See StartLostModeStatus. */
  status?: "STATUS_UNSPECIFIED" | "SUCCESS" | "RESET_PASSWORD_RECENTLY" | "USER_EXIT_LOST_MODE_RECENTLY" | "ALREADY_IN_LOST_MODE" | (string & {});
}

export const StartLostModeStatus: Schema.Schema<StartLostModeStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "StartLostModeStatus" }) as any as Schema.Schema<StartLostModeStatus>;

export interface StopLostModeStatus {
  /** The status. See StopLostModeStatus. */
  status?: "STATUS_UNSPECIFIED" | "SUCCESS" | "NOT_IN_LOST_MODE" | (string & {});
}

export const StopLostModeStatus: Schema.Schema<StopLostModeStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "StopLostModeStatus" }) as any as Schema.Schema<StopLostModeStatus>;

export interface InternalErrorDetails {
  /** Output only. Integer representation of the operation code as specified here (https://developer.android.com/reference/android/telephony/euicc/EuiccManager#EXTRA_EMBEDDED_SUBSCRIPTION_DETAILED_CODE). See operation_code_detail for more details. */
  operationCode?: string;
  /** Output only. Integer representation of the error code as specified here (https://developer.android.com/reference/android/telephony/euicc/EuiccManager#EXTRA_EMBEDDED_SUBSCRIPTION_DETAILED_CODE). See also, OPERATION_SMDX_SUBJECT_REASON_CODE. See error_code_detail for more details. */
  errorCode?: string;
  /** Output only. The operation code detail corresponding to the operation_code. */
  operationCodeDetail?: "OPERATION_CODE_DETAIL_UNSPECIFIED" | "OPERATION_SYSTEM" | "OPERATION_SIM_SLOT" | "OPERATION_EUICC_CARD" | "OPERATION_SMDX" | "OPERATION_SWITCH" | "OPERATION_DOWNLOAD" | "OPERATION_METADATA" | "OPERATION_EUICC_GSMA" | "OPERATION_APDU" | "OPERATION_SMDX_SUBJECT_REASON_CODE" | "OPERATION_HTTP" | (string & {});
  /** Output only. The error code detail corresponding to the error_code. */
  errorCodeDetail?: "ERROR_CODE_DETAIL_UNSPECIFIED" | "ERROR_TIME_OUT" | "ERROR_EUICC_MISSING" | "ERROR_UNSUPPORTED_VERSION" | "ERROR_ADDRESS_MISSING" | "ERROR_INVALID_CONFIRMATION_CODE" | "ERROR_CERTIFICATE_ERROR" | "ERROR_NO_PROFILES_AVAILABLE" | "ERROR_CONNECTION_ERROR" | "ERROR_INVALID_RESPONSE" | "ERROR_CARRIER_LOCKED" | "ERROR_DISALLOWED_BY_PPR" | "ERROR_INVALID_ACTIVATION_CODE" | "ERROR_INCOMPATIBLE_CARRIER" | "ERROR_OPERATION_BUSY" | "ERROR_INSTALL_PROFILE" | "ERROR_EUICC_INSUFFICIENT_MEMORY" | "ERROR_INVALID_PORT" | "ERROR_SIM_MISSING" | (string & {});
}

export const InternalErrorDetails: Schema.Schema<InternalErrorDetails> = Schema.suspend(() => Schema.Struct({
  operationCode: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  operationCodeDetail: Schema.optional(Schema.String),
  errorCodeDetail: Schema.optional(Schema.String),
})).annotate({ identifier: "InternalErrorDetails" }) as any as Schema.Schema<InternalErrorDetails>;

export interface EsimInfo {
  /** Output only. ICC ID of the eSIM. */
  iccId?: string;
}

export const EsimInfo: Schema.Schema<EsimInfo> = Schema.suspend(() => Schema.Struct({
  iccId: Schema.optional(Schema.String),
})).annotate({ identifier: "EsimInfo" }) as any as Schema.Schema<EsimInfo>;

export interface EsimCommandStatus {
  /** Output only. Status of an ADD_ESIM or REMOVE_ESIM command. */
  status?: "STATUS_UNSPECIFIED" | "SUCCESS" | "IN_PROGRESS" | "PENDING_USER_ACTION" | "ERROR_SETUP_IN_PROGRESS" | "ERROR_USER_DENIED" | "INTERNAL_ERROR" | "ERROR_ICC_ID_NOT_FOUND" | "ERROR_MULTIPLE_ACTIVE_ESIMS_NO_AVAILABLE_SLOT" | (string & {});
  /** Output only. Details of the error if the status is set to INTERNAL_ERROR. */
  internalErrorDetails?: InternalErrorDetails;
  /** Output only. Information about the eSIM added or removed. This is populated only when the eSIM operation status is SUCCESS. */
  esimInfo?: EsimInfo;
}

export const EsimCommandStatus: Schema.Schema<EsimCommandStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  internalErrorDetails: Schema.optional(InternalErrorDetails),
  esimInfo: Schema.optional(EsimInfo),
})).annotate({ identifier: "EsimCommandStatus" }) as any as Schema.Schema<EsimCommandStatus>;

export interface Eid {
  /** Output only. The EID */
  eid?: string;
}

export const Eid: Schema.Schema<Eid> = Schema.suspend(() => Schema.Struct({
  eid: Schema.optional(Schema.String),
})).annotate({ identifier: "Eid" }) as any as Schema.Schema<Eid>;

export interface EidInfo {
  /** Output only. EID information for each eUICC chip. */
  eids?: Array<Eid>;
}

export const EidInfo: Schema.Schema<EidInfo> = Schema.suspend(() => Schema.Struct({
  eids: Schema.optional(Schema.Array(Eid)),
})).annotate({ identifier: "EidInfo" }) as any as Schema.Schema<EidInfo>;

export interface RequestDeviceInfoStatus {
  /** Output only. Status of a REQUEST_DEVICE_INFO command. */
  status?: "STATUS_UNSPECIFIED" | "SUCCEEDED" | "PENDING_USER_ACTION" | "USER_DECLINED" | "UNSUPPORTED" | (string & {});
  /** Information related to the EIDs of the device. */
  eidInfo?: EidInfo;
}

export const RequestDeviceInfoStatus: Schema.Schema<RequestDeviceInfoStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  eidInfo: Schema.optional(EidInfo),
})).annotate({ identifier: "RequestDeviceInfoStatus" }) as any as Schema.Schema<RequestDeviceInfoStatus>;

export interface Command {
  /** The type of the command. */
  type?: "COMMAND_TYPE_UNSPECIFIED" | "LOCK" | "RESET_PASSWORD" | "REBOOT" | "RELINQUISH_OWNERSHIP" | "CLEAR_APP_DATA" | "START_LOST_MODE" | "STOP_LOST_MODE" | "ADD_ESIM" | "REMOVE_ESIM" | "REQUEST_DEVICE_INFO" | "WIPE" | (string & {});
  /** The timestamp at which the command was created. The timestamp is automatically generated by the server. */
  createTime?: string;
  /** The duration for which the command is valid. The command will expire if not executed by the device during this time. The default duration if unspecified is ten minutes. There is no maximum duration. */
  duration?: string;
  /** The resource name of the user that owns the device in the form enterprises/{enterpriseId}/users/{userId}. This is automatically generated by the server based on the device the command is sent to. */
  userName?: string;
  /** If the command failed, an error code explaining the failure. This is not set when the command is cancelled by the caller. For reasoning about command errors, prefer fields in the following order (most preferred first): 1. Command-specific fields like clearAppsDataStatus, startLostModeStatus, or similar, if they exist. 2. This field, if set. 3. The generic error field in the Operation that wraps the command. */
  errorCode?: "COMMAND_ERROR_CODE_UNSPECIFIED" | "UNKNOWN" | "API_LEVEL" | "MANAGEMENT_MODE" | "INVALID_VALUE" | "UNSUPPORTED" | (string & {});
  /** For commands of type RESET_PASSWORD, optionally specifies the new password. Note: The new password must be at least 6 characters long if it is numeric in case of Android 14 devices. Else the command will fail with INVALID_VALUE. */
  newPassword?: string;
  /** For commands of type RESET_PASSWORD, optionally specifies flags. */
  resetPasswordFlags?: Array<"RESET_PASSWORD_FLAG_UNSPECIFIED" | "REQUIRE_ENTRY" | "DO_NOT_ASK_CREDENTIALS_ON_BOOT" | "LOCK_NOW" | (string & {})>;
  /** Parameters for the CLEAR_APP_DATA command to clear the data of specified apps from the device. See ClearAppsDataParams. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to CLEAR_APP_DATA. It is also acceptable to explicitly set type to CLEAR_APP_DATA. */
  clearAppsDataParams?: ClearAppsDataParams;
  /** Parameters for the START_LOST_MODE command to put the device into lost mode. See StartLostModeParams. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to START_LOST_MODE. It is also acceptable to explicitly set type to START_LOST_MODE. */
  startLostModeParams?: StartLostModeParams;
  /** Parameters for the STOP_LOST_MODE command to take the device out of lost mode. See StopLostModeParams. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to STOP_LOST_MODE. It is also acceptable to explicitly set type to STOP_LOST_MODE. */
  stopLostModeParams?: StopLostModeParams;
  /** Optional. Parameters for the ADD_ESIM command to add an eSIM profile to the device. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to ADD_ESIM. It is also acceptable to explicitly set type to ADD_ESIM. */
  addEsimParams?: AddEsimParams;
  /** Optional. Parameters for the REMOVE_ESIM command to remove an eSIM profile from the device. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to REMOVE_ESIM. It is also acceptable to explicitly set type to REMOVE_ESIM. */
  removeEsimParams?: RemoveEsimParams;
  /** Optional. Parameters for the REQUEST_DEVICE_INFO command to get device related information. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to REQUEST_DEVICE_INFO . It is also acceptable to explicitly set type to REQUEST_DEVICE_INFO. */
  requestDeviceInfoParams?: RequestDeviceInfoParams;
  /** Optional. Parameters for the WIPE command to wipe the device. If this is set, then it is suggested that type should not be set. In this case, the server automatically sets it to WIPE. It is also acceptable to explicitly set type to WIPE. */
  wipeParams?: WipeParams;
  /** Output only. Status of the CLEAR_APP_DATA command to clear the data of specified apps from the device. See ClearAppsDataStatus. */
  clearAppsDataStatus?: ClearAppsDataStatus;
  /** Output only. Status of the START_LOST_MODE command to put the device into lost mode. See StartLostModeStatus. */
  startLostModeStatus?: StartLostModeStatus;
  /** Output only. Status of the STOP_LOST_MODE command to take the device out of lost mode. See StopLostModeStatus. */
  stopLostModeStatus?: StopLostModeStatus;
  /** Output only. Status of an ADD_ESIM or REMOVE_ESIM command. */
  esimStatus?: EsimCommandStatus;
  /** Output only. Status of the REQUEST_DEVICE_INFO command. */
  requestDeviceInfoStatus?: RequestDeviceInfoStatus;
}

export const Command: Schema.Schema<Command> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  userName: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  newPassword: Schema.optional(Schema.String),
  resetPasswordFlags: Schema.optional(Schema.Array(Schema.String)),
  clearAppsDataParams: Schema.optional(ClearAppsDataParams),
  startLostModeParams: Schema.optional(StartLostModeParams),
  stopLostModeParams: Schema.optional(StopLostModeParams),
  addEsimParams: Schema.optional(AddEsimParams),
  removeEsimParams: Schema.optional(RemoveEsimParams),
  requestDeviceInfoParams: Schema.optional(RequestDeviceInfoParams),
  wipeParams: Schema.optional(WipeParams),
  clearAppsDataStatus: Schema.optional(ClearAppsDataStatus),
  startLostModeStatus: Schema.optional(StartLostModeStatus),
  stopLostModeStatus: Schema.optional(StopLostModeStatus),
  esimStatus: Schema.optional(EsimCommandStatus),
  requestDeviceInfoStatus: Schema.optional(RequestDeviceInfoStatus),
})).annotate({ identifier: "Command" }) as any as Schema.Schema<Command>;

export interface ApplicationPermission {
  /** An opaque string uniquely identifying the permission. Not localized. */
  permissionId?: string;
  /** The name of the permission. Localized. */
  name?: string;
  /** A longer description of the permission, providing more detail on what it affects. Localized. */
  description?: string;
}

export const ApplicationPermission: Schema.Schema<ApplicationPermission> = Schema.suspend(() => Schema.Struct({
  permissionId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplicationPermission" }) as any as Schema.Schema<ApplicationPermission>;

export interface ManagedPropertyEntry {
  /** The machine-readable value of the entry, which should be used in the configuration. Not localized. */
  value?: string;
  /** The human-readable name of the value. Localized. */
  name?: string;
}

export const ManagedPropertyEntry: Schema.Schema<ManagedPropertyEntry> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedPropertyEntry" }) as any as Schema.Schema<ManagedPropertyEntry>;

export interface ManagedProperty {
  /** The unique key that the app uses to identify the property, e.g. "com.google.android.gm.fieldname". */
  key?: string;
  /** The type of the property. */
  type?: "MANAGED_PROPERTY_TYPE_UNSPECIFIED" | "BOOL" | "STRING" | "INTEGER" | "CHOICE" | "MULTISELECT" | "HIDDEN" | "BUNDLE" | "BUNDLE_ARRAY" | (string & {});
  /** The name of the property. Localized. */
  title?: string;
  /** A longer description of the property, providing more detail of what it affects. Localized. */
  description?: string;
  /** For CHOICE or MULTISELECT properties, the list of possible entries. */
  entries?: Array<ManagedPropertyEntry>;
  /** The default value of the property. BUNDLE_ARRAY properties don't have a default value. */
  defaultValue?: unknown;
  /** For BUNDLE_ARRAY properties, the list of nested properties. A BUNDLE_ARRAY property is at most two levels deep. */
  nestedProperties?: Array<ManagedProperty>;
}

export const ManagedProperty: Schema.Schema<ManagedProperty> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entries: Schema.optional(Schema.Array(ManagedPropertyEntry)),
  defaultValue: Schema.optional(Schema.Unknown),
  nestedProperties: Schema.optional(Schema.Array(ManagedProperty)),
})).annotate({ identifier: "ManagedProperty" }) as any as Schema.Schema<ManagedProperty>;

export interface AppTrackInfo {
  /** The unmodifiable unique track identifier, taken from the releaseTrackId in the URL of the Play Console page that displays the app’s track information. */
  trackId?: string;
  /** The track name associated with the trackId, set in the Play Console. The name is modifiable from Play Console. */
  trackAlias?: string;
}

export const AppTrackInfo: Schema.Schema<AppTrackInfo> = Schema.suspend(() => Schema.Struct({
  trackId: Schema.optional(Schema.String),
  trackAlias: Schema.optional(Schema.String),
})).annotate({ identifier: "AppTrackInfo" }) as any as Schema.Schema<AppTrackInfo>;

export interface AppVersion {
  /** The string used in the Play store by the app developer to identify the version. The string is not necessarily unique or localized (for example, the string could be "1.4"). */
  versionString?: string;
  /** Unique increasing identifier for the app version. */
  versionCode?: number;
  /** Track identifiers that the app version is published in. This does not include the production track (see production instead). */
  trackIds?: Array<string>;
  /** If the value is True, it indicates that this version is a production track. */
  production?: boolean;
}

export const AppVersion: Schema.Schema<AppVersion> = Schema.suspend(() => Schema.Struct({
  versionString: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.Number),
  trackIds: Schema.optional(Schema.Array(Schema.String)),
  production: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AppVersion" }) as any as Schema.Schema<AppVersion>;

export interface Application {
  /** The name of the app in the form enterprises/{enterprise}/applications/{package_name}. */
  name?: string;
  /** The title of the app. Localized. */
  title?: string;
  /** The permissions required by the app. */
  permissions?: Array<ApplicationPermission>;
  /** The set of managed properties available to be pre-configured for the app. */
  managedProperties?: Array<ManagedProperty>;
  /** A link to an image that can be used as an icon for the app. This image is suitable for use up to a pixel size of 512 x 512. */
  iconUrl?: string;
  /** A link to a smaller image that can be used as an icon for the app. This image is suitable for use up to a pixel size of 128 x 128. */
  smallIconUrl?: string;
  /** Application tracks visible to the enterprise. */
  appTracks?: Array<AppTrackInfo>;
  /** The name of the author of the apps (for example, the app developer). */
  author?: string;
  /** A link to the (consumer) Google Play details page for the app. */
  playStoreUrl?: string;
  /** How and to whom the package is made available. */
  distributionChannel?: "DISTRIBUTION_CHANNEL_UNSPECIFIED" | "PUBLIC_GOOGLE_HOSTED" | "PRIVATE_GOOGLE_HOSTED" | "PRIVATE_SELF_HOSTED" | (string & {});
  /** Whether this app is free, free with in-app purchases, or paid. If the pricing is unspecified, this means the app is not generally available anymore (even though it might still be available to people who own it). */
  appPricing?: "APP_PRICING_UNSPECIFIED" | "FREE" | "FREE_WITH_IN_APP_PURCHASE" | "PAID" | (string & {});
  /** The localized promotional description, if available. */
  description?: string;
  /** A list of screenshot links representing the app. */
  screenshotUrls?: Array<string>;
  /** The app category (e.g. RACING, SOCIAL, etc.) */
  category?: string;
  /** A localised description of the recent changes made to the app. */
  recentChanges?: string;
  /** The minimum Android SDK necessary to run the app. */
  minAndroidSdkVersion?: number;
  /** The content rating for this app. */
  contentRating?: "CONTENT_RATING_UNSPECIFIED" | "THREE_YEARS" | "SEVEN_YEARS" | "TWELVE_YEARS" | "SIXTEEN_YEARS" | "EIGHTEEN_YEARS" | (string & {});
  /** Output only. The approximate time (within 7 days) the app was last published. */
  updateTime?: string;
  /** The countries which this app is available in as per ISO 3166-1 alpha-2. */
  availableCountries?: Array<string>;
  /** Noteworthy features (if any) of this app. */
  features?: Array<"APP_FEATURE_UNSPECIFIED" | "VPN_APP" | (string & {})>;
  /** Versions currently available for this app. */
  appVersions?: Array<AppVersion>;
  /** Full app description, if available. */
  fullDescription?: string;
}

export const Application: Schema.Schema<Application> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(ApplicationPermission)),
  managedProperties: Schema.optional(Schema.Array(ManagedProperty)),
  iconUrl: Schema.optional(Schema.String),
  smallIconUrl: Schema.optional(Schema.String),
  appTracks: Schema.optional(Schema.Array(AppTrackInfo)),
  author: Schema.optional(Schema.String),
  playStoreUrl: Schema.optional(Schema.String),
  distributionChannel: Schema.optional(Schema.String),
  appPricing: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  screenshotUrls: Schema.optional(Schema.Array(Schema.String)),
  category: Schema.optional(Schema.String),
  recentChanges: Schema.optional(Schema.String),
  minAndroidSdkVersion: Schema.optional(Schema.Number),
  contentRating: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  availableCountries: Schema.optional(Schema.Array(Schema.String)),
  features: Schema.optional(Schema.Array(Schema.String)),
  appVersions: Schema.optional(Schema.Array(AppVersion)),
  fullDescription: Schema.optional(Schema.String),
})).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface WebAppIcon {
  /** The actual bytes of the image in a base64url encoded string (c.f. RFC4648, section 5 "Base 64 Encoding with URL and Filename Safe Alphabet"). - The image type can be png or jpg. - The image should ideally be square. - The image should ideally have a size of 512x512. */
  imageData?: string;
}

export const WebAppIcon: Schema.Schema<WebAppIcon> = Schema.suspend(() => Schema.Struct({
  imageData: Schema.optional(Schema.String),
})).annotate({ identifier: "WebAppIcon" }) as any as Schema.Schema<WebAppIcon>;

export interface WebApp {
  /** The name of the web app, which is generated by the server during creation in the form enterprises/{enterpriseId}/webApps/{packageName}. */
  name?: string;
  /** The title of the web app as displayed to the user (e.g., amongst a list of other applications, or as a label for an icon). */
  title?: string;
  /** The start URL, i.e. the URL that should load when the user opens the application. */
  startUrl?: string;
  /** A list of icons for the web app. Must have at least one element. */
  icons?: Array<WebAppIcon>;
  /** The display mode of the web app. */
  displayMode?: "DISPLAY_MODE_UNSPECIFIED" | "MINIMAL_UI" | "STANDALONE" | "FULL_SCREEN" | (string & {});
  /** The current version of the app.Note that the version can automatically increase during the lifetime of the web app, while Google does internal housekeeping to keep the web app up-to-date. */
  versionCode?: string;
}

export const WebApp: Schema.Schema<WebApp> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  startUrl: Schema.optional(Schema.String),
  icons: Schema.optional(Schema.Array(WebAppIcon)),
  displayMode: Schema.optional(Schema.String),
  versionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "WebApp" }) as any as Schema.Schema<WebApp>;

export interface ListWebAppsResponse {
  /** The list of web apps. */
  webApps?: Array<WebApp>;
  /** If there are more results, a token to retrieve next page of results. */
  nextPageToken?: string;
}

export const ListWebAppsResponse: Schema.Schema<ListWebAppsResponse> = Schema.suspend(() => Schema.Struct({
  webApps: Schema.optional(Schema.Array(WebApp)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListWebAppsResponse" }) as any as Schema.Schema<ListWebAppsResponse>;

export interface MigrationToken {
  /** Output only. The name of the migration token, which is generated by the server during creation, in the form enterprises/{enterprise}/migrationTokens/{migration_token}. */
  name?: string;
  /** Output only. The value of the migration token. */
  value?: string;
  /** Immutable. The time when this migration token expires. This can be at most seven days from the time of creation. The migration token is deleted seven days after it expires. */
  expireTime?: string;
  /** Input only. The time that this migration token is valid for. This is input-only, and for returning a migration token the server will populate the expireTime field. This can be at most seven days. The default is seven days. */
  ttl?: string;
  /** Output only. Time when this migration token was created. */
  createTime?: string;
  /** Required. Immutable. The user id of the Managed Google Play account on the device, as in the Play EMM API. This corresponds to the userId parameter in Play EMM API's Devices.get (https://developers.google.com/android/work/play/emm-api/v1/devices/get#parameters) call. */
  userId?: string;
  /** Required. Immutable. The id of the device, as in the Play EMM API. This corresponds to the deviceId parameter in Play EMM API's Devices.get (https://developers.google.com/android/work/play/emm-api/v1/devices/get#parameters) call. */
  deviceId?: string;
  /** Required. Immutable. The management mode of the device or profile being migrated. */
  managementMode?: "MANAGEMENT_MODE_UNSPECIFIED" | "WORK_PROFILE_PERSONALLY_OWNED" | "WORK_PROFILE_COMPANY_OWNED" | "FULLY_MANAGED" | (string & {});
  /** Required. Immutable. The name of the policy initially applied to the enrolled device, in the form enterprises/{enterprise}/policies/{policy}. */
  policy?: string;
  /** Immutable. Optional EMM-specified additional data. Once the device is migrated this will be populated in the migrationAdditionalData field of the Device resource. This must be at most 1024 characters. */
  additionalData?: string;
  /** Output only. Once this migration token is used to migrate a device, the name of the resulting Device resource will be populated here, in the form enterprises/{enterprise}/devices/{device}. */
  device?: string;
}

export const MigrationToken: Schema.Schema<MigrationToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  managementMode: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
  additionalData: Schema.optional(Schema.String),
  device: Schema.optional(Schema.String),
})).annotate({ identifier: "MigrationToken" }) as any as Schema.Schema<MigrationToken>;

export interface ListMigrationTokensResponse {
  /** The migration tokens from the specified enterprise. */
  migrationTokens?: Array<MigrationToken>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMigrationTokensResponse: Schema.Schema<ListMigrationTokensResponse> = Schema.suspend(() => Schema.Struct({
  migrationTokens: Schema.optional(Schema.Array(MigrationToken)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMigrationTokensResponse" }) as any as Schema.Schema<ListMigrationTokensResponse>;

export interface ProvisioningInfo {
  /** The name of this resource in the form provisioningInfo/{provisioning_info}. */
  name?: string;
  /** The name of the enterprise in the form enterprises/{enterprise}. */
  enterprise?: string;
  /** The email address of the authenticated user (only present for Google Account provisioning method). */
  authenticatedUserEmail?: string;
  /** The brand of the device. For example, Google. */
  brand?: string;
  /** The model of the device. For example, Asus Nexus 7. */
  model?: string;
  /** The API level of the Android platform version running on the device. */
  apiLevel?: number;
  /** The management mode of the device or profile. */
  managementMode?: "MANAGEMENT_MODE_UNSPECIFIED" | "DEVICE_OWNER" | "PROFILE_OWNER" | (string & {});
  /** Ownership of the managed device. */
  ownership?: "OWNERSHIP_UNSPECIFIED" | "COMPANY_OWNED" | "PERSONALLY_OWNED" | (string & {});
  /** For corporate-owned devices, IMEI number of the GSM device. For example, A1000031212. */
  imei?: string;
  /** For corporate-owned devices, MEID number of the CDMA device. For example, A00000292788E1. */
  meid?: string;
  /** For corporate-owned devices, The device serial number. */
  serialNumber?: string;
}

export const ProvisioningInfo: Schema.Schema<ProvisioningInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enterprise: Schema.optional(Schema.String),
  authenticatedUserEmail: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  apiLevel: Schema.optional(Schema.Number),
  managementMode: Schema.optional(Schema.String),
  ownership: Schema.optional(Schema.String),
  imei: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "ProvisioningInfo" }) as any as Schema.Schema<ProvisioningInfo>;

export interface IssueCommandResponse {
}

export const IssueCommandResponse: Schema.Schema<IssueCommandResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "IssueCommandResponse" }) as any as Schema.Schema<IssueCommandResponse>;

export interface AdbShellCommandEvent {
  /** Shell command that was issued over ADB via "adb shell command". Redacted to empty string on organization-owned managed profile devices. */
  shellCmd?: string;
}

export const AdbShellCommandEvent: Schema.Schema<AdbShellCommandEvent> = Schema.suspend(() => Schema.Struct({
  shellCmd: Schema.optional(Schema.String),
})).annotate({ identifier: "AdbShellCommandEvent" }) as any as Schema.Schema<AdbShellCommandEvent>;

export interface AdbShellInteractiveEvent {
}

export const AdbShellInteractiveEvent: Schema.Schema<AdbShellInteractiveEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AdbShellInteractiveEvent" }) as any as Schema.Schema<AdbShellInteractiveEvent>;

export interface AppProcessInfo {
  /** Process name. */
  processName?: string;
  /** Process start time. */
  startTime?: string;
  /** UID of the package. */
  uid?: number;
  /** Process ID. */
  pid?: number;
  /** SELinux policy info. */
  seinfo?: string;
  /** SHA-256 hash of the base APK, in hexadecimal format. */
  apkSha256Hash?: string;
  /** Package names of all packages that are associated with the particular user ID. In most cases, this will be a single package name, the package that has been assigned that user ID. If multiple application share a UID then all packages sharing UID will be included. */
  packageNames?: Array<string>;
}

export const AppProcessInfo: Schema.Schema<AppProcessInfo> = Schema.suspend(() => Schema.Struct({
  processName: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.Number),
  pid: Schema.optional(Schema.Number),
  seinfo: Schema.optional(Schema.String),
  apkSha256Hash: Schema.optional(Schema.String),
  packageNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AppProcessInfo" }) as any as Schema.Schema<AppProcessInfo>;

export interface AppProcessStartEvent {
  /** Information about a process. */
  processInfo?: AppProcessInfo;
}

export const AppProcessStartEvent: Schema.Schema<AppProcessStartEvent> = Schema.suspend(() => Schema.Struct({
  processInfo: Schema.optional(AppProcessInfo),
})).annotate({ identifier: "AppProcessStartEvent" }) as any as Schema.Schema<AppProcessStartEvent>;

export interface KeyguardDismissedEvent {
}

export const KeyguardDismissedEvent: Schema.Schema<KeyguardDismissedEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "KeyguardDismissedEvent" }) as any as Schema.Schema<KeyguardDismissedEvent>;

export interface KeyguardDismissAuthAttemptEvent {
  /** Whether the unlock attempt was successful. */
  success?: boolean;
  /** Whether a strong form of authentication (password, PIN, or pattern) was used to unlock device. */
  strongAuthMethodUsed?: boolean;
}

export const KeyguardDismissAuthAttemptEvent: Schema.Schema<KeyguardDismissAuthAttemptEvent> = Schema.suspend(() => Schema.Struct({
  success: Schema.optional(Schema.Boolean),
  strongAuthMethodUsed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeyguardDismissAuthAttemptEvent" }) as any as Schema.Schema<KeyguardDismissAuthAttemptEvent>;

export interface KeyguardSecuredEvent {
}

export const KeyguardSecuredEvent: Schema.Schema<KeyguardSecuredEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "KeyguardSecuredEvent" }) as any as Schema.Schema<KeyguardSecuredEvent>;

export interface FilePulledEvent {
  /** The path of the file being pulled. */
  filePath?: string;
}

export const FilePulledEvent: Schema.Schema<FilePulledEvent> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
})).annotate({ identifier: "FilePulledEvent" }) as any as Schema.Schema<FilePulledEvent>;

export interface FilePushedEvent {
  /** The path of the file being pushed. */
  filePath?: string;
}

export const FilePushedEvent: Schema.Schema<FilePushedEvent> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
})).annotate({ identifier: "FilePushedEvent" }) as any as Schema.Schema<FilePushedEvent>;

export interface CertAuthorityInstalledEvent {
  /** Subject of the certificate. */
  certificate?: string;
  /** The user in which the certificate install event happened. Only available for devices running Android 11 and above. */
  userId?: number;
  /** Whether the installation event succeeded. */
  success?: boolean;
}

export const CertAuthorityInstalledEvent: Schema.Schema<CertAuthorityInstalledEvent> = Schema.suspend(() => Schema.Struct({
  certificate: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.Number),
  success: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CertAuthorityInstalledEvent" }) as any as Schema.Schema<CertAuthorityInstalledEvent>;

export interface CertAuthorityRemovedEvent {
  /** Subject of the certificate. */
  certificate?: string;
  /** The user in which the certificate removal event occurred. Only available for devices running Android 11 and above. */
  userId?: number;
  /** Whether the removal succeeded. */
  success?: boolean;
}

export const CertAuthorityRemovedEvent: Schema.Schema<CertAuthorityRemovedEvent> = Schema.suspend(() => Schema.Struct({
  certificate: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.Number),
  success: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CertAuthorityRemovedEvent" }) as any as Schema.Schema<CertAuthorityRemovedEvent>;

export interface CertValidationFailureEvent {
  /** The reason why certification validation failed. */
  failureReason?: string;
}

export const CertValidationFailureEvent: Schema.Schema<CertValidationFailureEvent> = Schema.suspend(() => Schema.Struct({
  failureReason: Schema.optional(Schema.String),
})).annotate({ identifier: "CertValidationFailureEvent" }) as any as Schema.Schema<CertValidationFailureEvent>;

export interface CryptoSelfTestCompletedEvent {
  /** Whether the test succeeded. */
  success?: boolean;
}

export const CryptoSelfTestCompletedEvent: Schema.Schema<CryptoSelfTestCompletedEvent> = Schema.suspend(() => Schema.Struct({
  success: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CryptoSelfTestCompletedEvent" }) as any as Schema.Schema<CryptoSelfTestCompletedEvent>;

export interface KeyDestructionEvent {
  /** Alias of the key. */
  keyAlias?: string;
  /** UID of the application which owns the key. */
  applicationUid?: number;
  /** Whether the operation was successful. */
  success?: boolean;
}

export const KeyDestructionEvent: Schema.Schema<KeyDestructionEvent> = Schema.suspend(() => Schema.Struct({
  keyAlias: Schema.optional(Schema.String),
  applicationUid: Schema.optional(Schema.Number),
  success: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeyDestructionEvent" }) as any as Schema.Schema<KeyDestructionEvent>;

export interface KeyGeneratedEvent {
  /** Alias of the key. */
  keyAlias?: string;
  /** UID of the application which generated the key. */
  applicationUid?: number;
  /** Whether the operation was successful. */
  success?: boolean;
}

export const KeyGeneratedEvent: Schema.Schema<KeyGeneratedEvent> = Schema.suspend(() => Schema.Struct({
  keyAlias: Schema.optional(Schema.String),
  applicationUid: Schema.optional(Schema.Number),
  success: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeyGeneratedEvent" }) as any as Schema.Schema<KeyGeneratedEvent>;

export interface KeyImportEvent {
  /** Alias of the key. */
  keyAlias?: string;
  /** UID of the application which imported the key */
  applicationUid?: number;
  /** Whether the operation was successful. */
  success?: boolean;
}

export const KeyImportEvent: Schema.Schema<KeyImportEvent> = Schema.suspend(() => Schema.Struct({
  keyAlias: Schema.optional(Schema.String),
  applicationUid: Schema.optional(Schema.Number),
  success: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeyImportEvent" }) as any as Schema.Schema<KeyImportEvent>;

export interface KeyIntegrityViolationEvent {
  /** Alias of the key. */
  keyAlias?: string;
  /** UID of the application which owns the key */
  applicationUid?: number;
}

export const KeyIntegrityViolationEvent: Schema.Schema<KeyIntegrityViolationEvent> = Schema.suspend(() => Schema.Struct({
  keyAlias: Schema.optional(Schema.String),
  applicationUid: Schema.optional(Schema.Number),
})).annotate({ identifier: "KeyIntegrityViolationEvent" }) as any as Schema.Schema<KeyIntegrityViolationEvent>;

export interface LoggingStartedEvent {
}

export const LoggingStartedEvent: Schema.Schema<LoggingStartedEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LoggingStartedEvent" }) as any as Schema.Schema<LoggingStartedEvent>;

export interface LoggingStoppedEvent {
}

export const LoggingStoppedEvent: Schema.Schema<LoggingStoppedEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LoggingStoppedEvent" }) as any as Schema.Schema<LoggingStoppedEvent>;

export interface LogBufferSizeCriticalEvent {
}

export const LogBufferSizeCriticalEvent: Schema.Schema<LogBufferSizeCriticalEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LogBufferSizeCriticalEvent" }) as any as Schema.Schema<LogBufferSizeCriticalEvent>;

export interface MediaMountEvent {
  /** Mount point. */
  mountPoint?: string;
  /** Volume label. Redacted to empty string on organization-owned managed profile devices. */
  volumeLabel?: string;
}

export const MediaMountEvent: Schema.Schema<MediaMountEvent> = Schema.suspend(() => Schema.Struct({
  mountPoint: Schema.optional(Schema.String),
  volumeLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "MediaMountEvent" }) as any as Schema.Schema<MediaMountEvent>;

export interface MediaUnmountEvent {
  /** Mount point. */
  mountPoint?: string;
  /** Volume label. Redacted to empty string on organization-owned managed profile devices. */
  volumeLabel?: string;
}

export const MediaUnmountEvent: Schema.Schema<MediaUnmountEvent> = Schema.suspend(() => Schema.Struct({
  mountPoint: Schema.optional(Schema.String),
  volumeLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "MediaUnmountEvent" }) as any as Schema.Schema<MediaUnmountEvent>;

export interface OsShutdownEvent {
}

export const OsShutdownEvent: Schema.Schema<OsShutdownEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OsShutdownEvent" }) as any as Schema.Schema<OsShutdownEvent>;

export interface OsStartupEvent {
  /** Verified Boot state. */
  verifiedBootState?: "VERIFIED_BOOT_STATE_UNSPECIFIED" | "GREEN" | "YELLOW" | "ORANGE" | (string & {});
  /** dm-verity mode. */
  verityMode?: "DM_VERITY_MODE_UNSPECIFIED" | "ENFORCING" | "IO_ERROR" | "DISABLED" | (string & {});
}

export const OsStartupEvent: Schema.Schema<OsStartupEvent> = Schema.suspend(() => Schema.Struct({
  verifiedBootState: Schema.optional(Schema.String),
  verityMode: Schema.optional(Schema.String),
})).annotate({ identifier: "OsStartupEvent" }) as any as Schema.Schema<OsStartupEvent>;

export interface RemoteLockEvent {
  /** Package name of the admin app requesting the change. */
  adminPackageName?: string;
  /** User ID of the admin app from the which the change was requested. */
  adminUserId?: number;
  /** User ID in which the change was requested in. */
  targetUserId?: number;
}

export const RemoteLockEvent: Schema.Schema<RemoteLockEvent> = Schema.suspend(() => Schema.Struct({
  adminPackageName: Schema.optional(Schema.String),
  adminUserId: Schema.optional(Schema.Number),
  targetUserId: Schema.optional(Schema.Number),
})).annotate({ identifier: "RemoteLockEvent" }) as any as Schema.Schema<RemoteLockEvent>;

export interface WipeFailureEvent {
}

export const WipeFailureEvent: Schema.Schema<WipeFailureEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "WipeFailureEvent" }) as any as Schema.Schema<WipeFailureEvent>;

export interface ConnectEvent {
  /** The destination IP address of the connect call. */
  destinationIpAddress?: string;
  /** The destination port of the connect call. */
  destinationPort?: number;
  /** The package name of the UID that performed the connect call. */
  packageName?: string;
}

export const ConnectEvent: Schema.Schema<ConnectEvent> = Schema.suspend(() => Schema.Struct({
  destinationIpAddress: Schema.optional(Schema.String),
  destinationPort: Schema.optional(Schema.Number),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectEvent" }) as any as Schema.Schema<ConnectEvent>;

export interface DnsEvent {
  /** The hostname that was looked up. */
  hostname?: string;
  /** The (possibly truncated) list of the IP addresses returned for DNS lookup (max 10 IPv4 or IPv6 addresses). */
  ipAddresses?: Array<string>;
  /** The number of IP addresses returned from the DNS lookup event. May be higher than the amount of ip_addresses if there were too many addresses to log. */
  totalIpAddressesReturned?: string;
  /** The package name of the UID that performed the DNS lookup. */
  packageName?: string;
}

export const DnsEvent: Schema.Schema<DnsEvent> = Schema.suspend(() => Schema.Struct({
  hostname: Schema.optional(Schema.String),
  ipAddresses: Schema.optional(Schema.Array(Schema.String)),
  totalIpAddressesReturned: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
})).annotate({ identifier: "DnsEvent" }) as any as Schema.Schema<DnsEvent>;

export interface StopLostModeUserAttemptEvent {
  /** The status of the attempt to stop lost mode. */
  status?: "STATUS_UNSPECIFIED" | "ATTEMPT_SUCCEEDED" | "ATTEMPT_FAILED" | (string & {});
}

export const StopLostModeUserAttemptEvent: Schema.Schema<StopLostModeUserAttemptEvent> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "StopLostModeUserAttemptEvent" }) as any as Schema.Schema<StopLostModeUserAttemptEvent>;

export interface LostModeOutgoingPhoneCallEvent {
}

export const LostModeOutgoingPhoneCallEvent: Schema.Schema<LostModeOutgoingPhoneCallEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LostModeOutgoingPhoneCallEvent" }) as any as Schema.Schema<LostModeOutgoingPhoneCallEvent>;

export interface Location {
  /** The latitude position of the location */
  latitude?: number;
  /** The longitude position of the location */
  longitude?: number;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface LostModeLocationEvent {
  /** The device location */
  location?: Location;
  /** The battery level as a number between 0 and 100 inclusive */
  batteryLevel?: number;
}

export const LostModeLocationEvent: Schema.Schema<LostModeLocationEvent> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Location),
  batteryLevel: Schema.optional(Schema.Number),
})).annotate({ identifier: "LostModeLocationEvent" }) as any as Schema.Schema<LostModeLocationEvent>;

export interface EnrollmentCompleteEvent {
}

export const EnrollmentCompleteEvent: Schema.Schema<EnrollmentCompleteEvent> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnrollmentCompleteEvent" }) as any as Schema.Schema<EnrollmentCompleteEvent>;

export interface BackupServiceToggledEvent {
  /** Package name of the admin app requesting the change. */
  adminPackageName?: string;
  /** User ID of the admin app from the which the change was requested. */
  adminUserId?: number;
  /** Whether the backup service is enabled */
  backupServiceState?: "BACKUP_SERVICE_STATE_UNSPECIFIED" | "BACKUP_SERVICE_DISABLED" | "BACKUP_SERVICE_ENABLED" | (string & {});
}

export const BackupServiceToggledEvent: Schema.Schema<BackupServiceToggledEvent> = Schema.suspend(() => Schema.Struct({
  adminPackageName: Schema.optional(Schema.String),
  adminUserId: Schema.optional(Schema.Number),
  backupServiceState: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupServiceToggledEvent" }) as any as Schema.Schema<BackupServiceToggledEvent>;

export interface UsageLogEvent {
  /** Unique id of the event. */
  eventId?: string;
  /** Device timestamp when the event was logged. */
  eventTime?: string;
  /** The particular usage log event type that was reported on the device. Use this to determine which event field to access. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "ADB_SHELL_COMMAND" | "ADB_SHELL_INTERACTIVE" | "APP_PROCESS_START" | "KEYGUARD_DISMISSED" | "KEYGUARD_DISMISS_AUTH_ATTEMPT" | "KEYGUARD_SECURED" | "FILE_PULLED" | "FILE_PUSHED" | "CERT_AUTHORITY_INSTALLED" | "CERT_AUTHORITY_REMOVED" | "CERT_VALIDATION_FAILURE" | "CRYPTO_SELF_TEST_COMPLETED" | "KEY_DESTRUCTION" | "KEY_GENERATED" | "KEY_IMPORT" | "KEY_INTEGRITY_VIOLATION" | "LOGGING_STARTED" | "LOGGING_STOPPED" | "LOG_BUFFER_SIZE_CRITICAL" | "MEDIA_MOUNT" | "MEDIA_UNMOUNT" | "OS_SHUTDOWN" | "OS_STARTUP" | "REMOTE_LOCK" | "WIPE_FAILURE" | "CONNECT" | "DNS" | "STOP_LOST_MODE_USER_ATTEMPT" | "LOST_MODE_OUTGOING_PHONE_CALL" | "LOST_MODE_LOCATION" | "ENROLLMENT_COMPLETE" | "BACKUP_SERVICE_TOGGLED" | (string & {});
  /** A shell command was issued over ADB via “adb shell command”. Part of SECURITY_LOGS. */
  adbShellCommandEvent?: AdbShellCommandEvent;
  /** An ADB interactive shell was opened via “adb shell”. Part of SECURITY_LOGS. */
  adbShellInteractiveEvent?: AdbShellInteractiveEvent;
  /** An app process was started. Part of SECURITY_LOGS. */
  appProcessStartEvent?: AppProcessStartEvent;
  /** The keyguard was dismissed. Part of SECURITY_LOGS. */
  keyguardDismissedEvent?: KeyguardDismissedEvent;
  /** An attempt was made to unlock the device. Part of SECURITY_LOGS. */
  keyguardDismissAuthAttemptEvent?: KeyguardDismissAuthAttemptEvent;
  /** The device was locked either by user or timeout. Part of SECURITY_LOGS. */
  keyguardSecuredEvent?: KeyguardSecuredEvent;
  /** A file was downloaded from the device. Part of SECURITY_LOGS. */
  filePulledEvent?: FilePulledEvent;
  /** A file was uploaded onto the device. Part of SECURITY_LOGS. */
  filePushedEvent?: FilePushedEvent;
  /** A new root certificate was installed into the system's trusted credential storage. Part of SECURITY_LOGS. */
  certAuthorityInstalledEvent?: CertAuthorityInstalledEvent;
  /** A root certificate was removed from the system's trusted credential storage. Part of SECURITY_LOGS. */
  certAuthorityRemovedEvent?: CertAuthorityRemovedEvent;
  /** An X.509v3 certificate failed to validate, currently this validation is performed on the Wi-FI access point and failure may be due to a mismatch upon server certificate validation. However it may in the future include other validation events of an X.509v3 certificate. Part of SECURITY_LOGS. */
  certValidationFailureEvent?: CertValidationFailureEvent;
  /** Validates whether Android’s built-in cryptographic library (BoringSSL) is valid. Should always succeed on device boot, if it fails, the device should be considered untrusted. Part of SECURITY_LOGS. */
  cryptoSelfTestCompletedEvent?: CryptoSelfTestCompletedEvent;
  /** A cryptographic key including user installed, admin installed and system maintained private key is removed from the device either by the user or management. Part of SECURITY_LOGS. */
  keyDestructionEvent?: KeyDestructionEvent;
  /** A cryptographic key including user installed, admin installed and system maintained private key is installed on the device either by the user or management. Part of SECURITY_LOGS. */
  keyGeneratedEvent?: KeyGeneratedEvent;
  /** A cryptographic key including user installed, admin installed and system maintained private key is imported on the device either by the user or management. Part of SECURITY_LOGS. */
  keyImportEvent?: KeyImportEvent;
  /** A cryptographic key including user installed, admin installed and system maintained private key is determined to be corrupted due to storage corruption, hardware failure or some OS issue. Part of SECURITY_LOGS. */
  keyIntegrityViolationEvent?: KeyIntegrityViolationEvent;
  /** usageLog policy has been enabled. Part of SECURITY_LOGS. */
  loggingStartedEvent?: LoggingStartedEvent;
  /** usageLog policy has been disabled. Part of SECURITY_LOGS. */
  loggingStoppedEvent?: LoggingStoppedEvent;
  /** The audit log buffer has reached 90% of its capacity, therefore older events may be dropped. Part of SECURITY_LOGS. */
  logBufferSizeCriticalEvent?: LogBufferSizeCriticalEvent;
  /** Removable media was mounted. Part of SECURITY_LOGS. */
  mediaMountEvent?: MediaMountEvent;
  /** Removable media was unmounted. Part of SECURITY_LOGS. */
  mediaUnmountEvent?: MediaUnmountEvent;
  /** Device was shutdown. Part of SECURITY_LOGS. */
  osShutdownEvent?: OsShutdownEvent;
  /** Device was started. Part of SECURITY_LOGS. */
  osStartupEvent?: OsStartupEvent;
  /** The device or profile has been remotely locked via the LOCK command. Part of SECURITY_LOGS. */
  remoteLockEvent?: RemoteLockEvent;
  /** The work profile or company-owned device failed to wipe when requested. This could be user initiated or admin initiated e.g. delete was received. Part of SECURITY_LOGS. */
  wipeFailureEvent?: WipeFailureEvent;
  /** A TCP connect event was initiated through the standard network stack. Part of NETWORK_ACTIVITY_LOGS. */
  connectEvent?: ConnectEvent;
  /** A DNS lookup event was initiated through the standard network stack. Part of NETWORK_ACTIVITY_LOGS. */
  dnsEvent?: DnsEvent;
  /** An attempt to take a device out of lost mode. */
  stopLostModeUserAttemptEvent?: StopLostModeUserAttemptEvent;
  /** An outgoing phone call has been made when a device in lost mode. */
  lostModeOutgoingPhoneCallEvent?: LostModeOutgoingPhoneCallEvent;
  /** A lost mode location update when a device in lost mode. */
  lostModeLocationEvent?: LostModeLocationEvent;
  /** Device has completed enrollment. Part of AMAPI_LOGS. */
  enrollmentCompleteEvent?: EnrollmentCompleteEvent;
  /** An admin has enabled or disabled backup service. Part of SECURITY_LOGS. */
  backupServiceToggledEvent?: BackupServiceToggledEvent;
}

export const UsageLogEvent: Schema.Schema<UsageLogEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  adbShellCommandEvent: Schema.optional(AdbShellCommandEvent),
  adbShellInteractiveEvent: Schema.optional(AdbShellInteractiveEvent),
  appProcessStartEvent: Schema.optional(AppProcessStartEvent),
  keyguardDismissedEvent: Schema.optional(KeyguardDismissedEvent),
  keyguardDismissAuthAttemptEvent: Schema.optional(KeyguardDismissAuthAttemptEvent),
  keyguardSecuredEvent: Schema.optional(KeyguardSecuredEvent),
  filePulledEvent: Schema.optional(FilePulledEvent),
  filePushedEvent: Schema.optional(FilePushedEvent),
  certAuthorityInstalledEvent: Schema.optional(CertAuthorityInstalledEvent),
  certAuthorityRemovedEvent: Schema.optional(CertAuthorityRemovedEvent),
  certValidationFailureEvent: Schema.optional(CertValidationFailureEvent),
  cryptoSelfTestCompletedEvent: Schema.optional(CryptoSelfTestCompletedEvent),
  keyDestructionEvent: Schema.optional(KeyDestructionEvent),
  keyGeneratedEvent: Schema.optional(KeyGeneratedEvent),
  keyImportEvent: Schema.optional(KeyImportEvent),
  keyIntegrityViolationEvent: Schema.optional(KeyIntegrityViolationEvent),
  loggingStartedEvent: Schema.optional(LoggingStartedEvent),
  loggingStoppedEvent: Schema.optional(LoggingStoppedEvent),
  logBufferSizeCriticalEvent: Schema.optional(LogBufferSizeCriticalEvent),
  mediaMountEvent: Schema.optional(MediaMountEvent),
  mediaUnmountEvent: Schema.optional(MediaUnmountEvent),
  osShutdownEvent: Schema.optional(OsShutdownEvent),
  osStartupEvent: Schema.optional(OsStartupEvent),
  remoteLockEvent: Schema.optional(RemoteLockEvent),
  wipeFailureEvent: Schema.optional(WipeFailureEvent),
  connectEvent: Schema.optional(ConnectEvent),
  dnsEvent: Schema.optional(DnsEvent),
  stopLostModeUserAttemptEvent: Schema.optional(StopLostModeUserAttemptEvent),
  lostModeOutgoingPhoneCallEvent: Schema.optional(LostModeOutgoingPhoneCallEvent),
  lostModeLocationEvent: Schema.optional(LostModeLocationEvent),
  enrollmentCompleteEvent: Schema.optional(EnrollmentCompleteEvent),
  backupServiceToggledEvent: Schema.optional(BackupServiceToggledEvent),
})).annotate({ identifier: "UsageLogEvent" }) as any as Schema.Schema<UsageLogEvent>;

export interface BatchUsageLogEvents {
  /** If present, the name of the device in the form ‘enterprises/{enterpriseId}/devices/{deviceId}’ */
  device?: string;
  /** If present, the resource name of the user that owns this device in the form ‘enterprises/{enterpriseId}/users/{userId}’. */
  user?: string;
  /** The device timestamp when the batch of events were collected from the device. */
  retrievalTime?: string;
  /** The list of UsageLogEvent that were reported by the device, sorted chronologically by the event time. */
  usageLogEvents?: Array<UsageLogEvent>;
}

export const BatchUsageLogEvents: Schema.Schema<BatchUsageLogEvents> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  retrievalTime: Schema.optional(Schema.String),
  usageLogEvents: Schema.optional(Schema.Array(UsageLogEvent)),
})).annotate({ identifier: "BatchUsageLogEvents" }) as any as Schema.Schema<BatchUsageLogEvents>;

export interface EnterpriseUpgradeEvent {
  /** The name of upgraded enterprise in the format "enterprises/{enterprise}" */
  enterprise?: string;
  /** Output only. The upgrade state of the enterprise. */
  upgradeState?: "UPGRADE_STATE_UNSPECIFIED" | "UPGRADE_STATE_SUCCEEDED" | (string & {});
}

export const EnterpriseUpgradeEvent: Schema.Schema<EnterpriseUpgradeEvent> = Schema.suspend(() => Schema.Struct({
  enterprise: Schema.optional(Schema.String),
  upgradeState: Schema.optional(Schema.String),
})).annotate({ identifier: "EnterpriseUpgradeEvent" }) as any as Schema.Schema<EnterpriseUpgradeEvent>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates an enterprise signup URL. */
export interface CreateSignupUrlsRequest {
  /** The ID of the Google Cloud Platform project which will own the enterprise. */
  projectId?: string;
  /** The callback URL that the admin will be redirected to after successfully creating an enterprise. Before redirecting there the system will add a query parameter to this URL named enterpriseToken which will contain an opaque token to be used for the create enterprise request. The URL will be parsed then reformatted in order to add the enterpriseToken parameter, so there may be some minor formatting changes. */
  callbackUrl?: string;
  /** Optional. Email address used to prefill the admin field of the enterprise signup form. This value is a hint only and can be altered by the user. If allowedDomains is non-empty then this must belong to one of the allowedDomains. */
  adminEmail?: string;
  /** Optional. A list of domains that are permitted for the admin email. The IT admin cannot enter an email address with a domain name that is not in this list. Subdomains of domains in this list are not allowed but can be allowed by adding a second entry which has *. prefixed to the domain name (e.g. *.example.com). If the field is not present or is an empty list then the IT admin is free to use any valid domain name. Personal email domains are always allowed, but will result in the creation of a managed Google Play Accounts enterprise. */
  allowedDomains?: string[];
}

export const CreateSignupUrlsRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  callbackUrl: Schema.optional(Schema.String).pipe(T.HttpQuery("callbackUrl")),
  adminEmail: Schema.optional(Schema.String).pipe(T.HttpQuery("adminEmail")),
  allowedDomains: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("allowedDomains")),
}).pipe(
  T.Http({ method: "POST", path: "v1/signupUrls", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignupUrlsRequest>;

export type CreateSignupUrlsResponse = SignupUrl;
export const CreateSignupUrlsResponse = SignupUrl;

export type CreateSignupUrlsError = CommonErrors;

export const createSignupUrls: API.OperationMethod<CreateSignupUrlsRequest, CreateSignupUrlsResponse, CreateSignupUrlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignupUrlsRequest,
  output: CreateSignupUrlsResponse,
  errors: [],
}));

/** Creates an enterprise. This is the last step in the enterprise signup flow. See also: SigninDetail */
export interface CreateEnterprisesRequest {
  /** The ID of the Google Cloud Platform project which will own the enterprise. */
  projectId?: string;
  /** The name of the SignupUrl used to sign up for the enterprise. Set this when creating a customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises) and not when creating a deprecated EMM-managed enterprise (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises). */
  signupUrlName?: string;
  /** The enterprise token appended to the callback URL. Set this when creating a customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises) and not when creating a deprecated EMM-managed enterprise (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises). */
  enterpriseToken?: string;
  /** Whether the enterprise admin has seen and agreed to the managed Google Play Agreement (https://www.android.com/enterprise/terms/). Do not set this field for any customer-managed enterprise (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises). Set this to field to true for all EMM-managed enterprises (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises). */
  agreementAccepted?: boolean;
  /** Request body */
  body?: Enterprise;
}

export const CreateEnterprisesRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  signupUrlName: Schema.optional(Schema.String).pipe(T.HttpQuery("signupUrlName")),
  enterpriseToken: Schema.optional(Schema.String).pipe(T.HttpQuery("enterpriseToken")),
  agreementAccepted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("agreementAccepted")),
  body: Schema.optional(Enterprise).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEnterprisesRequest>;

export type CreateEnterprisesResponse = Enterprise;
export const CreateEnterprisesResponse = Enterprise;

export type CreateEnterprisesError = CommonErrors;

export const createEnterprises: API.OperationMethod<CreateEnterprisesRequest, CreateEnterprisesResponse, CreateEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEnterprisesRequest,
  output: CreateEnterprisesResponse,
  errors: [],
}));

/** Permanently deletes an enterprise and all accounts and data associated with it. Warning: this will result in a cascaded deletion of all AM API devices associated with the deleted enterprise. Only available for EMM-managed enterprises. */
export interface DeleteEnterprisesRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  name: string;
}

export const DeleteEnterprisesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/enterprises/{enterprisesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEnterprisesRequest>;

export type DeleteEnterprisesResponse = Empty;
export const DeleteEnterprisesResponse = Empty;

export type DeleteEnterprisesError = CommonErrors;

export const deleteEnterprises: API.OperationMethod<DeleteEnterprisesRequest, DeleteEnterprisesResponse, DeleteEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEnterprisesRequest,
  output: DeleteEnterprisesResponse,
  errors: [],
}));

/** Gets an enterprise. */
export interface GetEnterprisesRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  name: string;
}

export const GetEnterprisesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}" }),
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

/** Updates an enterprise. See also: SigninDetail */
export interface PatchEnterprisesRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  name: string;
  /** The field mask indicating the fields to update. If not set, all modifiable fields will be modified. */
  updateMask?: string;
  /** Request body */
  body?: Enterprise;
}

export const PatchEnterprisesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Enterprise).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/enterprises/{enterprisesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEnterprisesRequest>;

export type PatchEnterprisesResponse = Enterprise;
export const PatchEnterprisesResponse = Enterprise;

export type PatchEnterprisesError = CommonErrors;

export const patchEnterprises: API.OperationMethod<PatchEnterprisesRequest, PatchEnterprisesResponse, PatchEnterprisesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEnterprisesRequest,
  output: PatchEnterprisesResponse,
  errors: [],
}));

/** Lists EMM-managed enterprises. Only BASIC fields are returned. */
export interface ListEnterprisesRequest {
  /** Required. The Cloud project ID of the EMM managing the enterprises. */
  projectId?: string;
  /** The requested page size. The actual page size may be fixed to a min or max value. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
  /** Specifies which Enterprise fields to return. This method only supports BASIC. */
  view?: "ENTERPRISE_VIEW_UNSPECIFIED" | "BASIC" | (string & {});
}

export const ListEnterprisesRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesRequest>;

export type ListEnterprisesResponse_Op = ListEnterprisesResponse;
export const ListEnterprisesResponse_Op = ListEnterprisesResponse;

export type ListEnterprisesError = CommonErrors;

export const listEnterprises = API.makePaginated(() => ({
  input: ListEnterprisesRequest,
  output: ListEnterprisesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generates an enterprise upgrade URL to upgrade an existing managed Google Play Accounts enterprise to a managed Google domain. See the guide (https://developers.google.com/android/management/upgrade-an-enterprise) for more details. */
export interface GenerateEnterpriseUpgradeUrlEnterprisesRequest {
  /** Required. The name of the enterprise to be upgraded in the form enterprises/{enterpriseId}. */
  name: string;
  /** Request body */
  body?: GenerateEnterpriseUpgradeUrlRequest;
}

export const GenerateEnterpriseUpgradeUrlEnterprisesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateEnterpriseUpgradeUrlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}:generateEnterpriseUpgradeUrl", hasBody: true }),
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

/** Creates an enrollment token for a given enterprise. It's up to the caller's responsibility to manage the lifecycle of newly created tokens and deleting them when they're not intended to be used anymore. */
export interface CreateEnterprisesEnrollmentTokensRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** Request body */
  body?: EnrollmentToken;
}

export const CreateEnterprisesEnrollmentTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(EnrollmentToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/enrollmentTokens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEnterprisesEnrollmentTokensRequest>;

export type CreateEnterprisesEnrollmentTokensResponse = EnrollmentToken;
export const CreateEnterprisesEnrollmentTokensResponse = EnrollmentToken;

export type CreateEnterprisesEnrollmentTokensError = CommonErrors;

export const createEnterprisesEnrollmentTokens: API.OperationMethod<CreateEnterprisesEnrollmentTokensRequest, CreateEnterprisesEnrollmentTokensResponse, CreateEnterprisesEnrollmentTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEnterprisesEnrollmentTokensRequest,
  output: CreateEnterprisesEnrollmentTokensResponse,
  errors: [],
}));

/** Deletes an enrollment token. This operation invalidates the token, preventing its future use. */
export interface DeleteEnterprisesEnrollmentTokensRequest {
  /** The name of the enrollment token in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}. */
  name: string;
}

export const DeleteEnterprisesEnrollmentTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/enterprises/{enterprisesId}/enrollmentTokens/{enrollmentTokensId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEnterprisesEnrollmentTokensRequest>;

export type DeleteEnterprisesEnrollmentTokensResponse = Empty;
export const DeleteEnterprisesEnrollmentTokensResponse = Empty;

export type DeleteEnterprisesEnrollmentTokensError = CommonErrors;

export const deleteEnterprisesEnrollmentTokens: API.OperationMethod<DeleteEnterprisesEnrollmentTokensRequest, DeleteEnterprisesEnrollmentTokensResponse, DeleteEnterprisesEnrollmentTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEnterprisesEnrollmentTokensRequest,
  output: DeleteEnterprisesEnrollmentTokensResponse,
  errors: [],
}));

/** Gets an active, unexpired enrollment token. A partial view of the enrollment token is returned. Only the following fields are populated: name, expirationTimestamp, allowPersonalUsage, value, qrCode. This method is meant to help manage active enrollment tokens lifecycle. For security reasons, it's recommended to delete active enrollment tokens as soon as they're not intended to be used anymore. */
export interface GetEnterprisesEnrollmentTokensRequest {
  /** Required. The name of the enrollment token in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}. */
  name: string;
}

export const GetEnterprisesEnrollmentTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/enrollmentTokens/{enrollmentTokensId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesEnrollmentTokensRequest>;

export type GetEnterprisesEnrollmentTokensResponse = EnrollmentToken;
export const GetEnterprisesEnrollmentTokensResponse = EnrollmentToken;

export type GetEnterprisesEnrollmentTokensError = CommonErrors;

export const getEnterprisesEnrollmentTokens: API.OperationMethod<GetEnterprisesEnrollmentTokensRequest, GetEnterprisesEnrollmentTokensResponse, GetEnterprisesEnrollmentTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesEnrollmentTokensRequest,
  output: GetEnterprisesEnrollmentTokensResponse,
  errors: [],
}));

/** Lists active, unexpired enrollment tokens for a given enterprise. The list items contain only a partial view of EnrollmentToken object. Only the following fields are populated: name, expirationTimestamp, allowPersonalUsage, value, qrCode. This method is meant to help manage active enrollment tokens lifecycle. For security reasons, it's recommended to delete active enrollment tokens as soon as they're not intended to be used anymore. */
export interface ListEnterprisesEnrollmentTokensRequest {
  /** Required. The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** The requested page size. The service may return fewer than this value. If unspecified, at most 10 items will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListEnterprisesEnrollmentTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/enrollmentTokens" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesEnrollmentTokensRequest>;

export type ListEnterprisesEnrollmentTokensResponse = ListEnrollmentTokensResponse;
export const ListEnterprisesEnrollmentTokensResponse = ListEnrollmentTokensResponse;

export type ListEnterprisesEnrollmentTokensError = CommonErrors;

export const listEnterprisesEnrollmentTokens = API.makePaginated(() => ({
  input: ListEnterprisesEnrollmentTokensRequest,
  output: ListEnterprisesEnrollmentTokensResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a web token to access an embeddable managed Google Play web UI for a given enterprise. */
export interface CreateEnterprisesWebTokensRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** Request body */
  body?: WebToken;
}

export const CreateEnterprisesWebTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(WebToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/webTokens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEnterprisesWebTokensRequest>;

export type CreateEnterprisesWebTokensResponse = WebToken;
export const CreateEnterprisesWebTokensResponse = WebToken;

export type CreateEnterprisesWebTokensError = CommonErrors;

export const createEnterprisesWebTokens: API.OperationMethod<CreateEnterprisesWebTokensRequest, CreateEnterprisesWebTokensResponse, CreateEnterprisesWebTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEnterprisesWebTokensRequest,
  output: CreateEnterprisesWebTokensResponse,
  errors: [],
}));

/** Gets a device. Deleted devices will respond with a 404 error. */
export interface GetEnterprisesDevicesRequest {
  /** The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}. */
  name: string;
}

export const GetEnterprisesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesDevicesRequest>;

export type GetEnterprisesDevicesResponse = Device;
export const GetEnterprisesDevicesResponse = Device;

export type GetEnterprisesDevicesError = CommonErrors;

export const getEnterprisesDevices: API.OperationMethod<GetEnterprisesDevicesRequest, GetEnterprisesDevicesResponse, GetEnterprisesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesDevicesRequest,
  output: GetEnterprisesDevicesResponse,
  errors: [],
}));

/** Lists devices for a given enterprise. Deleted devices are not returned in the response. */
export interface ListEnterprisesDevicesRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** The requested page size. If unspecified, at most 10 devices will be returned. The maximum value is 100; values above 100 will be coerced to 100. The limits can change over time. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListEnterprisesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesDevicesRequest>;

export type ListEnterprisesDevicesResponse = ListDevicesResponse;
export const ListEnterprisesDevicesResponse = ListDevicesResponse;

export type ListEnterprisesDevicesError = CommonErrors;

export const listEnterprisesDevices = API.makePaginated(() => ({
  input: ListEnterprisesDevicesRequest,
  output: ListEnterprisesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a device. */
export interface PatchEnterprisesDevicesRequest {
  /** The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}. */
  name: string;
  /** The field mask indicating the fields to update. If not set, all modifiable fields will be modified. */
  updateMask?: string;
  /** Request body */
  body?: Device;
}

export const PatchEnterprisesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Device).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEnterprisesDevicesRequest>;

export type PatchEnterprisesDevicesResponse = Device;
export const PatchEnterprisesDevicesResponse = Device;

export type PatchEnterprisesDevicesError = CommonErrors;

export const patchEnterprisesDevices: API.OperationMethod<PatchEnterprisesDevicesRequest, PatchEnterprisesDevicesResponse, PatchEnterprisesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEnterprisesDevicesRequest,
  output: PatchEnterprisesDevicesResponse,
  errors: [],
}));

/** Deletes a device. This operation attempts to wipe the device but this is not guaranteed to succeed if the device is offline for an extended period. Deleted devices do not show up in enterprises.devices.list calls and a 404 is returned from enterprises.devices.get. */
export interface DeleteEnterprisesDevicesRequest {
  /** The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}. */
  name: string;
  /** Optional flags that control the device wiping behavior. */
  wipeDataFlags?: "WIPE_DATA_FLAG_UNSPECIFIED" | "PRESERVE_RESET_PROTECTION_DATA" | "WIPE_EXTERNAL_STORAGE" | "WIPE_ESIMS" | (string & {})[];
  /** Optional. A short message displayed to the user before wiping the work profile on personal devices. This has no effect on company owned devices. The maximum message length is 200 characters. */
  wipeReasonMessage?: string;
}

export const DeleteEnterprisesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  wipeDataFlags: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("wipeDataFlags")),
  wipeReasonMessage: Schema.optional(Schema.String).pipe(T.HttpQuery("wipeReasonMessage")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEnterprisesDevicesRequest>;

export type DeleteEnterprisesDevicesResponse = Empty;
export const DeleteEnterprisesDevicesResponse = Empty;

export type DeleteEnterprisesDevicesError = CommonErrors;

export const deleteEnterprisesDevices: API.OperationMethod<DeleteEnterprisesDevicesRequest, DeleteEnterprisesDevicesResponse, DeleteEnterprisesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEnterprisesDevicesRequest,
  output: DeleteEnterprisesDevicesResponse,
  errors: [],
}));

/** Issues a command to a device. The Operation resource returned contains a Command in its metadata field. Use the get operation method to get the status of the command. */
export interface IssueCommandEnterprisesDevicesRequest {
  /** The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}. */
  name: string;
  /** Request body */
  body?: Command;
}

export const IssueCommandEnterprisesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Command).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}:issueCommand", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IssueCommandEnterprisesDevicesRequest>;

export type IssueCommandEnterprisesDevicesResponse = Operation;
export const IssueCommandEnterprisesDevicesResponse = Operation;

export type IssueCommandEnterprisesDevicesError = CommonErrors;

export const issueCommandEnterprisesDevices: API.OperationMethod<IssueCommandEnterprisesDevicesRequest, IssueCommandEnterprisesDevicesResponse, IssueCommandEnterprisesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IssueCommandEnterprisesDevicesRequest,
  output: IssueCommandEnterprisesDevicesResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListEnterprisesDevicesOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListEnterprisesDevicesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesDevicesOperationsRequest>;

export type ListEnterprisesDevicesOperationsResponse = ListOperationsResponse;
export const ListEnterprisesDevicesOperationsResponse = ListOperationsResponse;

export type ListEnterprisesDevicesOperationsError = CommonErrors;

export const listEnterprisesDevicesOperations = API.makePaginated(() => ({
  input: ListEnterprisesDevicesOperationsRequest,
  output: ListEnterprisesDevicesOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetEnterprisesDevicesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetEnterprisesDevicesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesDevicesOperationsRequest>;

export type GetEnterprisesDevicesOperationsResponse = Operation;
export const GetEnterprisesDevicesOperationsResponse = Operation;

export type GetEnterprisesDevicesOperationsError = CommonErrors;

export const getEnterprisesDevicesOperations: API.OperationMethod<GetEnterprisesDevicesOperationsRequest, GetEnterprisesDevicesOperationsResponse, GetEnterprisesDevicesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesDevicesOperationsRequest,
  output: GetEnterprisesDevicesOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelEnterprisesDevicesOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelEnterprisesDevicesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/devices/{devicesId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelEnterprisesDevicesOperationsRequest>;

export type CancelEnterprisesDevicesOperationsResponse = Empty;
export const CancelEnterprisesDevicesOperationsResponse = Empty;

export type CancelEnterprisesDevicesOperationsError = CommonErrors;

export const cancelEnterprisesDevicesOperations: API.OperationMethod<CancelEnterprisesDevicesOperationsRequest, CancelEnterprisesDevicesOperationsResponse, CancelEnterprisesDevicesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelEnterprisesDevicesOperationsRequest,
  output: CancelEnterprisesDevicesOperationsResponse,
  errors: [],
}));

/** Gets a policy. */
export interface GetEnterprisesPoliciesRequest {
  /** The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}. */
  name: string;
}

export const GetEnterprisesPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesPoliciesRequest>;

export type GetEnterprisesPoliciesResponse = Policy;
export const GetEnterprisesPoliciesResponse = Policy;

export type GetEnterprisesPoliciesError = CommonErrors;

export const getEnterprisesPolicies: API.OperationMethod<GetEnterprisesPoliciesRequest, GetEnterprisesPoliciesResponse, GetEnterprisesPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesPoliciesRequest,
  output: GetEnterprisesPoliciesResponse,
  errors: [],
}));

/** Lists policies for a given enterprise. */
export interface ListEnterprisesPoliciesRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** The requested page size. The actual page size may be fixed to a min or max value. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListEnterprisesPoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/policies" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesPoliciesRequest>;

export type ListEnterprisesPoliciesResponse = ListPoliciesResponse;
export const ListEnterprisesPoliciesResponse = ListPoliciesResponse;

export type ListEnterprisesPoliciesError = CommonErrors;

export const listEnterprisesPolicies = API.makePaginated(() => ({
  input: ListEnterprisesPoliciesRequest,
  output: ListEnterprisesPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates or creates a policy. */
export interface PatchEnterprisesPoliciesRequest {
  /** The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}. */
  name: string;
  /** The field mask indicating the fields to update. If not set, all modifiable fields will be modified. */
  updateMask?: string;
  /** Request body */
  body?: Policy;
}

export const PatchEnterprisesPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Policy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/enterprises/{enterprisesId}/policies/{policiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEnterprisesPoliciesRequest>;

export type PatchEnterprisesPoliciesResponse = Policy;
export const PatchEnterprisesPoliciesResponse = Policy;

export type PatchEnterprisesPoliciesError = CommonErrors;

export const patchEnterprisesPolicies: API.OperationMethod<PatchEnterprisesPoliciesRequest, PatchEnterprisesPoliciesResponse, PatchEnterprisesPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEnterprisesPoliciesRequest,
  output: PatchEnterprisesPoliciesResponse,
  errors: [],
}));

/** Deletes a policy. This operation is only permitted if no devices are currently referencing the policy. */
export interface DeleteEnterprisesPoliciesRequest {
  /** The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}. */
  name: string;
}

export const DeleteEnterprisesPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/enterprises/{enterprisesId}/policies/{policiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEnterprisesPoliciesRequest>;

export type DeleteEnterprisesPoliciesResponse = Empty;
export const DeleteEnterprisesPoliciesResponse = Empty;

export type DeleteEnterprisesPoliciesError = CommonErrors;

export const deleteEnterprisesPolicies: API.OperationMethod<DeleteEnterprisesPoliciesRequest, DeleteEnterprisesPoliciesResponse, DeleteEnterprisesPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEnterprisesPoliciesRequest,
  output: DeleteEnterprisesPoliciesResponse,
  errors: [],
}));

/** Updates or creates applications in a policy. */
export interface ModifyPolicyApplicationsEnterprisesPoliciesRequest {
  /** Required. The name of the Policy containing the ApplicationPolicy objects to be updated, in the form enterprises/{enterpriseId}/policies/{policyId}. */
  name: string;
  /** Request body */
  body?: ModifyPolicyApplicationsRequest;
}

export const ModifyPolicyApplicationsEnterprisesPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ModifyPolicyApplicationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/policies/{policiesId}:modifyPolicyApplications", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyPolicyApplicationsEnterprisesPoliciesRequest>;

export type ModifyPolicyApplicationsEnterprisesPoliciesResponse = ModifyPolicyApplicationsResponse;
export const ModifyPolicyApplicationsEnterprisesPoliciesResponse = ModifyPolicyApplicationsResponse;

export type ModifyPolicyApplicationsEnterprisesPoliciesError = CommonErrors;

export const modifyPolicyApplicationsEnterprisesPolicies: API.OperationMethod<ModifyPolicyApplicationsEnterprisesPoliciesRequest, ModifyPolicyApplicationsEnterprisesPoliciesResponse, ModifyPolicyApplicationsEnterprisesPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyPolicyApplicationsEnterprisesPoliciesRequest,
  output: ModifyPolicyApplicationsEnterprisesPoliciesResponse,
  errors: [],
}));

/** Removes applications in a policy. */
export interface RemovePolicyApplicationsEnterprisesPoliciesRequest {
  /** Required. The name of the policy containing the ApplicationPolicy objects to be removed, in the form enterprises/{enterpriseId}/policies/{policyId}. */
  name: string;
  /** Request body */
  body?: RemovePolicyApplicationsRequest;
}

export const RemovePolicyApplicationsEnterprisesPoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemovePolicyApplicationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/policies/{policiesId}:removePolicyApplications", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemovePolicyApplicationsEnterprisesPoliciesRequest>;

export type RemovePolicyApplicationsEnterprisesPoliciesResponse = RemovePolicyApplicationsResponse;
export const RemovePolicyApplicationsEnterprisesPoliciesResponse = RemovePolicyApplicationsResponse;

export type RemovePolicyApplicationsEnterprisesPoliciesError = CommonErrors;

export const removePolicyApplicationsEnterprisesPolicies: API.OperationMethod<RemovePolicyApplicationsEnterprisesPoliciesRequest, RemovePolicyApplicationsEnterprisesPoliciesResponse, RemovePolicyApplicationsEnterprisesPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemovePolicyApplicationsEnterprisesPoliciesRequest,
  output: RemovePolicyApplicationsEnterprisesPoliciesResponse,
  errors: [],
}));

/** Gets info about an application. */
export interface GetEnterprisesApplicationsRequest {
  /** The name of the application in the form enterprises/{enterpriseId}/applications/{package_name}. */
  name: string;
  /** The preferred language for localized application info, as a BCP47 tag (e.g. "en-US", "de"). If not specified the default language of the application will be used. */
  languageCode?: string;
}

export const GetEnterprisesApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/applications/{applicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesApplicationsRequest>;

export type GetEnterprisesApplicationsResponse = Application;
export const GetEnterprisesApplicationsResponse = Application;

export type GetEnterprisesApplicationsError = CommonErrors;

export const getEnterprisesApplications: API.OperationMethod<GetEnterprisesApplicationsRequest, GetEnterprisesApplicationsResponse, GetEnterprisesApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesApplicationsRequest,
  output: GetEnterprisesApplicationsResponse,
  errors: [],
}));

/** Creates a web app. */
export interface CreateEnterprisesWebAppsRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** Request body */
  body?: WebApp;
}

export const CreateEnterprisesWebAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(WebApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/webApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEnterprisesWebAppsRequest>;

export type CreateEnterprisesWebAppsResponse = WebApp;
export const CreateEnterprisesWebAppsResponse = WebApp;

export type CreateEnterprisesWebAppsError = CommonErrors;

export const createEnterprisesWebApps: API.OperationMethod<CreateEnterprisesWebAppsRequest, CreateEnterprisesWebAppsResponse, CreateEnterprisesWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEnterprisesWebAppsRequest,
  output: CreateEnterprisesWebAppsResponse,
  errors: [],
}));

/** Gets a web app. */
export interface GetEnterprisesWebAppsRequest {
  /** The name of the web app in the form enterprises/{enterpriseId}/webApps/{packageName}. */
  name: string;
}

export const GetEnterprisesWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/webApps/{webAppsId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesWebAppsRequest>;

export type GetEnterprisesWebAppsResponse = WebApp;
export const GetEnterprisesWebAppsResponse = WebApp;

export type GetEnterprisesWebAppsError = CommonErrors;

export const getEnterprisesWebApps: API.OperationMethod<GetEnterprisesWebAppsRequest, GetEnterprisesWebAppsResponse, GetEnterprisesWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesWebAppsRequest,
  output: GetEnterprisesWebAppsResponse,
  errors: [],
}));

/** Lists web apps for a given enterprise. */
export interface ListEnterprisesWebAppsRequest {
  /** The name of the enterprise in the form enterprises/{enterpriseId}. */
  parent: string;
  /** The requested page size. This is a hint and the actual page size in the response may be different. */
  pageSize?: number;
  /** A token identifying a page of results returned by the server. */
  pageToken?: string;
}

export const ListEnterprisesWebAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/webApps" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesWebAppsRequest>;

export type ListEnterprisesWebAppsResponse = ListWebAppsResponse;
export const ListEnterprisesWebAppsResponse = ListWebAppsResponse;

export type ListEnterprisesWebAppsError = CommonErrors;

export const listEnterprisesWebApps = API.makePaginated(() => ({
  input: ListEnterprisesWebAppsRequest,
  output: ListEnterprisesWebAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a web app. */
export interface PatchEnterprisesWebAppsRequest {
  /** The name of the web app in the form enterprises/{enterpriseId}/webApps/{packageName}. */
  name: string;
  /** The field mask indicating the fields to update. If not set, all modifiable fields will be modified. */
  updateMask?: string;
  /** Request body */
  body?: WebApp;
}

export const PatchEnterprisesWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(WebApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/enterprises/{enterprisesId}/webApps/{webAppsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchEnterprisesWebAppsRequest>;

export type PatchEnterprisesWebAppsResponse = WebApp;
export const PatchEnterprisesWebAppsResponse = WebApp;

export type PatchEnterprisesWebAppsError = CommonErrors;

export const patchEnterprisesWebApps: API.OperationMethod<PatchEnterprisesWebAppsRequest, PatchEnterprisesWebAppsResponse, PatchEnterprisesWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchEnterprisesWebAppsRequest,
  output: PatchEnterprisesWebAppsResponse,
  errors: [],
}));

/** Deletes a web app. */
export interface DeleteEnterprisesWebAppsRequest {
  /** The name of the web app in the form enterprises/{enterpriseId}/webApps/{packageName}. */
  name: string;
}

export const DeleteEnterprisesWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/enterprises/{enterprisesId}/webApps/{webAppsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteEnterprisesWebAppsRequest>;

export type DeleteEnterprisesWebAppsResponse = Empty;
export const DeleteEnterprisesWebAppsResponse = Empty;

export type DeleteEnterprisesWebAppsError = CommonErrors;

export const deleteEnterprisesWebApps: API.OperationMethod<DeleteEnterprisesWebAppsRequest, DeleteEnterprisesWebAppsResponse, DeleteEnterprisesWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEnterprisesWebAppsRequest,
  output: DeleteEnterprisesWebAppsResponse,
  errors: [],
}));

/** Creates a migration token, to migrate an existing device from being managed by the EMM's Device Policy Controller (DPC) to being managed by the Android Management API. See the guide (https://developers.google.com/android/management/dpc-migration) for more details. */
export interface CreateEnterprisesMigrationTokensRequest {
  /** Required. The enterprise in which this migration token is created. This must be the same enterprise which already manages the device in the Play EMM API. Format: enterprises/{enterprise} */
  parent: string;
  /** Request body */
  body?: MigrationToken;
}

export const CreateEnterprisesMigrationTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(MigrationToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/enterprises/{enterprisesId}/migrationTokens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateEnterprisesMigrationTokensRequest>;

export type CreateEnterprisesMigrationTokensResponse = MigrationToken;
export const CreateEnterprisesMigrationTokensResponse = MigrationToken;

export type CreateEnterprisesMigrationTokensError = CommonErrors;

export const createEnterprisesMigrationTokens: API.OperationMethod<CreateEnterprisesMigrationTokensRequest, CreateEnterprisesMigrationTokensResponse, CreateEnterprisesMigrationTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateEnterprisesMigrationTokensRequest,
  output: CreateEnterprisesMigrationTokensResponse,
  errors: [],
}));

/** Gets a migration token. */
export interface GetEnterprisesMigrationTokensRequest {
  /** Required. The name of the migration token to retrieve. Format: enterprises/{enterprise}/migrationTokens/{migration_token} */
  name: string;
}

export const GetEnterprisesMigrationTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/migrationTokens/{migrationTokensId}" }),
  svc,
) as unknown as Schema.Schema<GetEnterprisesMigrationTokensRequest>;

export type GetEnterprisesMigrationTokensResponse = MigrationToken;
export const GetEnterprisesMigrationTokensResponse = MigrationToken;

export type GetEnterprisesMigrationTokensError = CommonErrors;

export const getEnterprisesMigrationTokens: API.OperationMethod<GetEnterprisesMigrationTokensRequest, GetEnterprisesMigrationTokensResponse, GetEnterprisesMigrationTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEnterprisesMigrationTokensRequest,
  output: GetEnterprisesMigrationTokensResponse,
  errors: [],
}));

/** Lists migration tokens. */
export interface ListEnterprisesMigrationTokensRequest {
  /** Required. The enterprise which the migration tokens belong to. Format: enterprises/{enterprise} */
  parent: string;
  /** The maximum number of migration tokens to return. Fewer migration tokens may be returned. If unspecified, at most 100 migration tokens will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A page token, received from a previous ListMigrationTokens call. Provide this to retrieve the subsequent page.When paginating, all other parameters provided to ListMigrationTokens must match the call that provided the page token. */
  pageToken?: string;
}

export const ListEnterprisesMigrationTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/enterprises/{enterprisesId}/migrationTokens" }),
  svc,
) as unknown as Schema.Schema<ListEnterprisesMigrationTokensRequest>;

export type ListEnterprisesMigrationTokensResponse = ListMigrationTokensResponse;
export const ListEnterprisesMigrationTokensResponse = ListMigrationTokensResponse;

export type ListEnterprisesMigrationTokensError = CommonErrors;

export const listEnterprisesMigrationTokens = API.makePaginated(() => ({
  input: ListEnterprisesMigrationTokensRequest,
  output: ListEnterprisesMigrationTokensResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get the device provisioning information by the identifier provided in the sign-in url. */
export interface GetProvisioningInfoRequest {
  /** Required. The identifier that Android Device Policy passes to the 3P sign-in page in the form of provisioningInfo/{provisioning_info}. */
  name: string;
}

export const GetProvisioningInfoRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/provisioningInfo/{provisioningInfoId}" }),
  svc,
) as unknown as Schema.Schema<GetProvisioningInfoRequest>;

export type GetProvisioningInfoResponse = ProvisioningInfo;
export const GetProvisioningInfoResponse = ProvisioningInfo;

export type GetProvisioningInfoError = CommonErrors;

export const getProvisioningInfo: API.OperationMethod<GetProvisioningInfoRequest, GetProvisioningInfoResponse, GetProvisioningInfoError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProvisioningInfoRequest,
  output: GetProvisioningInfoResponse,
  errors: [],
}));

