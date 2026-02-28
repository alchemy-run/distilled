// ==========================================================================
// Firebase App Check API (firebaseappcheck v1)
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
  name: "firebaseappcheck",
  version: "v1",
  rootUrl: "https://firebaseappcheck.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleFirebaseAppcheckV1AppAttestConfig {
  /** Required. The relative resource name of the App Attest configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from App Attest artifacts will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
}

export const GoogleFirebaseAppcheckV1AppAttestConfig: Schema.Schema<GoogleFirebaseAppcheckV1AppAttestConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tokenTtl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1AppAttestConfig" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1AppAttestConfig>;

export interface GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse {
  /** AppAttestConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1AppAttestConfig>;
}

export const GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1AppAttestConfig)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse>;

export interface GoogleFirebaseAppcheckV1DeviceCheckConfig {
  /** Required. The relative resource name of the DeviceCheck configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from DeviceCheck tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** Required. The key identifier of a private key enabled with DeviceCheck, created in your Apple Developer account. */
  keyId?: string;
  /** Required. Input only. The contents of the private key (`.p8`) file associated with the key specified by `key_id`. For security reasons, this field will never be populated in any response. */
  privateKey?: string;
  /** Output only. Whether the `private_key` field was previously set. Since we will never return the `private_key` field, this field is the only way to find out whether it was previously set. */
  privateKeySet?: boolean;
}

export const GoogleFirebaseAppcheckV1DeviceCheckConfig: Schema.Schema<GoogleFirebaseAppcheckV1DeviceCheckConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tokenTtl: Schema.optional(Schema.String),
  keyId: Schema.optional(Schema.String),
  privateKey: Schema.optional(Schema.String),
  privateKeySet: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1DeviceCheckConfig" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1DeviceCheckConfig>;

export interface GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse {
  /** DeviceCheckConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1DeviceCheckConfig>;
}

export const GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1DeviceCheckConfig)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse>;

export interface GoogleFirebaseAppcheckV1RecaptchaV3Config {
  /** Specifies the duration for which App Check tokens exchanged from reCAPTCHA tokens will be valid. If unset, a default value of 1 day is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** Required. The relative resource name of the reCAPTCHA v3 configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` */
  name?: string;
  /** Required. Input only. The site secret used to identify your service for reCAPTCHA v3 verification. For security reasons, this field will never be populated in any response. */
  siteSecret?: string;
  /** Output only. Whether the `site_secret` field was previously set. Since we will never return the `site_secret` field, this field is the only way to find out whether it was previously set. */
  siteSecretSet?: boolean;
  /** Specifies a minimum score required for a reCAPTCHA token to be considered valid. If its score is greater than or equal to this value, it will be accepted; otherwise, it will be rejected. The value must be between 0.0 and 1.0. The default value is 0.5. */
  minValidScore?: number;
}

export const GoogleFirebaseAppcheckV1RecaptchaV3Config: Schema.Schema<GoogleFirebaseAppcheckV1RecaptchaV3Config> = Schema.suspend(() => Schema.Struct({
  tokenTtl: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  siteSecret: Schema.optional(Schema.String),
  siteSecretSet: Schema.optional(Schema.Boolean),
  minValidScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1RecaptchaV3Config" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1RecaptchaV3Config>;

export interface GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse {
  /** RecaptchaV3Configs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1RecaptchaV3Config>;
}

export const GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1RecaptchaV3Config)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse>;

export interface GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis {
  /** Specifies a minimum score required for a reCAPTCHA token to be considered valid. If its score is greater than or equal to this value, it will be accepted; otherwise, it will be rejected. The value must be between 0.0 and 1.0. The default value is 0.5. */
  minValidScore?: number;
}

export const GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis: Schema.Schema<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis> = Schema.suspend(() => Schema.Struct({
  minValidScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis>;

export interface GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig {
  /** Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from reCAPTCHA Enterprise tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** The score-based site key [created in reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/create-key#creating_a_site_key) used to [invoke reCAPTCHA and generate the reCAPTCHA tokens](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages) for your application. Important: This is *not* the `site_secret` (as it is in reCAPTCHA v3), but rather your score-based reCAPTCHA Enterprise site key. */
  siteKey?: string;
  /** Specifies risk tolerance and requirements for your application. These settings correspond to requirements on the [**`riskAnalysis`**](https://cloud.google.com/recaptcha/docs/interpret-assessment-website#interpret_assessment) tuple in the assessment obtained from reCAPTCHA Enterprise. The default values for these settings work for most apps, and are recommended. */
  riskAnalysis?: GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis;
}

export const GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig: Schema.Schema<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tokenTtl: Schema.optional(Schema.String),
  siteKey: Schema.optional(Schema.String),
  riskAnalysis: Schema.optional(GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfigRiskAnalysis),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig>;

export interface GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse {
  /** RecaptchaEnterpriseConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig>;
}

export const GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse>;

export interface GoogleFirebaseAppcheckV1SafetyNetConfig {
  /** Required. The relative resource name of the SafetyNet configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from SafetyNet tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
}

export const GoogleFirebaseAppcheckV1SafetyNetConfig: Schema.Schema<GoogleFirebaseAppcheckV1SafetyNetConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tokenTtl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1SafetyNetConfig" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1SafetyNetConfig>;

export interface GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse {
  /** SafetyNetConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1SafetyNetConfig>;
}

export const GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1SafetyNetConfig)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse>;

export interface GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity {
  /** Specifies whether your running app is allowed to have the `UNRECOGNIZED_VERSION` [app recognition verdict](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field). Note that the app recognition verdict `PLAY_RECOGNIZED` is a strong, comprehensive integrity signal that takes into account various other signals, including conditional and optional device integrity responses that you have opted into. If your app is published off-Play, this field should be set to `true` to allow instances of your app installed from off-Play sources to function. If set to `false`, only `PLAY_RECOGNIZED` verdicts are allowed, and both `UNRECOGNIZED_VERSION` and `UNEVALUATED` will be rejected. If set to `true`, any app recognition verdict is allowed. The default value is `false`. */
  allowUnrecognizedVersion?: boolean;
}

export const GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity: Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity> = Schema.suspend(() => Schema.Struct({
  allowUnrecognizedVersion: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity>;

export interface GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity {
  /** Specifies the minimum device integrity level in order for the device to be considered valid. Any device with a device recognition verdict lower than this level will be rejected. If this is unspecified, the default level is `NO_INTEGRITY`. */
  minDeviceRecognitionLevel?: "DEVICE_RECOGNITION_LEVEL_UNSPECIFIED" | "NO_INTEGRITY" | "MEETS_BASIC_INTEGRITY" | "MEETS_DEVICE_INTEGRITY" | "MEETS_STRONG_INTEGRITY" | (string & {});
}

export const GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity: Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity> = Schema.suspend(() => Schema.Struct({
  minDeviceRecognitionLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity>;

export interface GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails {
  /** Specifies whether the caller must have received the [`LICENSED` verdict](https://developer.android.com/google/play/integrity/verdicts#account-details-field). For additional details about scenarios where your users will receive this `LICENSED` label, see [the default responses table](https://developer.android.com/google/play/integrity/setup#default). If set to `true`, apps without the `LICENSED` app licensing verdict will be rejected. If set to `false`, any app licensing verdict is allowed. The default value is `false`. */
  requireLicensed?: boolean;
}

export const GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails: Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails> = Schema.suspend(() => Schema.Struct({
  requireLicensed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails>;

export interface GoogleFirebaseAppcheckV1PlayIntegrityConfig {
  /** Required. The relative resource name of the Play Integrity configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from Play Integrity tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** Specifies application integrity requirements for Android devices running your app. These settings correspond to requirements on the [**application integrity** field](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended. */
  appIntegrity?: GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity;
  /** Specifies device integrity requirements for Android devices running your app. These settings correspond to requirements on the [**device integrity** field](https://developer.android.com/google/play/integrity/verdicts#device-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. Warning: There are also [conditional](https://developer.android.com/google/play/integrity/setup#conditional) as well as [optional](https://developer.android.com/google/play/integrity/setup#optional_device_information) responses that you can receive, but requires additional explicit opt-in from you. The App Check API is **not** responsible for any such opt-ins. The default values for these settings work for most apps, and are recommended. */
  deviceIntegrity?: GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity;
  /** Specifies account requirements for Android devices running your app. These settings correspond to requirements on the [**account details** field](https://developer.android.com/google/play/integrity/verdicts#account-details-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended. */
  accountDetails?: GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails;
}

export const GoogleFirebaseAppcheckV1PlayIntegrityConfig: Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tokenTtl: Schema.optional(Schema.String),
  appIntegrity: Schema.optional(GoogleFirebaseAppcheckV1PlayIntegrityConfigAppIntegrity),
  deviceIntegrity: Schema.optional(GoogleFirebaseAppcheckV1PlayIntegrityConfigDeviceIntegrity),
  accountDetails: Schema.optional(GoogleFirebaseAppcheckV1PlayIntegrityConfigAccountDetails),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1PlayIntegrityConfig" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1PlayIntegrityConfig>;

export interface GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse {
  /** PlayIntegrityConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1PlayIntegrityConfig>;
}

export const GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1PlayIntegrityConfig)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse>;

export interface GoogleFirebaseAppcheckV1DebugToken {
  /** Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name?: string;
  /** Required. A human readable display name used to identify this debug token. */
  displayName?: string;
  /** Required. Input only. Immutable. The secret token itself. Must be provided during creation, and must be a UUID4, case insensitive. This field is immutable once set, and cannot be provided during an UpdateDebugToken request. You can, however, delete this debug token using DeleteDebugToken to revoke it. For security reasons, this field will never be populated in any response. */
  token?: string;
  /** Output only. Timestamp when this debug token was most recently updated. */
  updateTime?: string;
}

export const GoogleFirebaseAppcheckV1DebugToken: Schema.Schema<GoogleFirebaseAppcheckV1DebugToken> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1DebugToken" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1DebugToken>;

export interface GoogleFirebaseAppcheckV1ListDebugTokensResponse {
  /** The DebugTokens retrieved. */
  debugTokens?: Array<GoogleFirebaseAppcheckV1DebugToken>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty or omitted, then this response is the last page of results. This token can be used in a subsequent call to ListDebugTokens to find the next group of DebugTokens. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppcheckV1ListDebugTokensResponse: Schema.Schema<GoogleFirebaseAppcheckV1ListDebugTokensResponse> = Schema.suspend(() => Schema.Struct({
  debugTokens: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1DebugToken)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ListDebugTokensResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ListDebugTokensResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleFirebaseAppcheckV1Service {
  /** Required. The relative resource name of the service configuration object, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `oauth2.googleapis.com` (Google Identity for iOS) */
  name?: string;
  /** Required. The App Check enforcement mode for this service. */
  enforcementMode?: "OFF" | "UNENFORCED" | "ENFORCED" | (string & {});
}

export const GoogleFirebaseAppcheckV1Service: Schema.Schema<GoogleFirebaseAppcheckV1Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enforcementMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1Service" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1Service>;

export interface GoogleFirebaseAppcheckV1ListServicesResponse {
  /** The Services retrieved. */
  services?: Array<GoogleFirebaseAppcheckV1Service>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty or omitted, then this response is the last page of results. This token can be used in a subsequent call to ListServices to find the next group of Services. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppcheckV1ListServicesResponse: Schema.Schema<GoogleFirebaseAppcheckV1ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1Service)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ListServicesResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ListServicesResponse>;

export interface GoogleFirebaseAppcheckV1UpdateServiceRequest {
  /** Required. The Service to update. The Service's `name` field is used to identify the Service to be updated, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `oauth2.googleapis.com` (Google Identity for iOS) */
  service?: GoogleFirebaseAppcheckV1Service;
  /** Required. A comma-separated list of names of fields in the Service to update. Example: `enforcement_mode`. */
  updateMask?: string;
}

export const GoogleFirebaseAppcheckV1UpdateServiceRequest: Schema.Schema<GoogleFirebaseAppcheckV1UpdateServiceRequest> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(GoogleFirebaseAppcheckV1Service),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1UpdateServiceRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1UpdateServiceRequest>;

export interface GoogleFirebaseAppcheckV1BatchUpdateServicesRequest {
  /** Optional. A comma-separated list of names of fields in the Services to update. Example: `display_name`. If the `update_mask` field is set in both this request and any of the UpdateServiceRequest messages, they must match or the entire batch fails and no updates will be committed. */
  updateMask?: string;
  /** Required. The request messages specifying the Services to update. A maximum of 100 objects can be updated in a batch. */
  requests?: Array<GoogleFirebaseAppcheckV1UpdateServiceRequest>;
}

export const GoogleFirebaseAppcheckV1BatchUpdateServicesRequest: Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateServicesRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  requests: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1UpdateServiceRequest)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchUpdateServicesRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateServicesRequest>;

export interface GoogleFirebaseAppcheckV1BatchUpdateServicesResponse {
  /** Service objects after the updates have been applied. */
  services?: Array<GoogleFirebaseAppcheckV1Service>;
}

export const GoogleFirebaseAppcheckV1BatchUpdateServicesResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1Service)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchUpdateServicesResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateServicesResponse>;

export interface GoogleFirebaseAppcheckV1ResourcePolicy {
  /** Required. Identifier. The relative name of the resource policy object, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) `resource_policy_id` is a system-generated UID. */
  name?: string;
  /** Required. Service specific name of the resource object to which this policy applies, in the format: * **iOS OAuth clients** (Google Identity for iOS): `//oauth2.googleapis.com/projects/{project_number}/oauthClients/{oauth_client_id}` Note that the resource must belong to the service specified in the `name` and be from the same project as this policy, but the resource is allowed to be missing at the time of creation of this policy; in that case, we make a best-effort attempt at respecting this policy, but it may not have any effect until the resource is fully created. */
  targetResource?: string;
  /** Required. The App Check enforcement mode for this resource. This will override the App Check overall EnforcementMode setting on the service. */
  enforcementMode?: "OFF" | "UNENFORCED" | "ENFORCED" | (string & {});
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. This etag is strongly validated as defined by RFC 7232. */
  etag?: string;
  /** Output only. Timestamp when this resource policy configuration object was most recently updated. */
  updateTime?: string;
}

export const GoogleFirebaseAppcheckV1ResourcePolicy: Schema.Schema<GoogleFirebaseAppcheckV1ResourcePolicy> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  targetResource: Schema.optional(Schema.String),
  enforcementMode: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ResourcePolicy" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ResourcePolicy>;

export interface GoogleFirebaseAppcheckV1ListResourcePoliciesResponse {
  /** The ResourcePolicy objects retrieved. */
  resourcePolicies?: Array<GoogleFirebaseAppcheckV1ResourcePolicy>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty or omitted, then this response is the last page of results. This token can be used in a subsequent call to ListResourcePolicies to find the next group of ResourcePolicy objects. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppcheckV1ListResourcePoliciesResponse: Schema.Schema<GoogleFirebaseAppcheckV1ListResourcePoliciesResponse> = Schema.suspend(() => Schema.Struct({
  resourcePolicies: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1ResourcePolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ListResourcePoliciesResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ListResourcePoliciesResponse>;

export interface GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest {
  /** Required. The ResourcePolicy to update. The ResourcePolicy's `name` field is used to identify the ResourcePolicy to be updated, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  resourcePolicy?: GoogleFirebaseAppcheckV1ResourcePolicy;
  /** Required. A comma-separated list of names of fields in the ResourcePolicy to update. Example: `enforcement_mode`. */
  updateMask?: string;
}

export const GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest: Schema.Schema<GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest> = Schema.suspend(() => Schema.Struct({
  resourcePolicy: Schema.optional(GoogleFirebaseAppcheckV1ResourcePolicy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest>;

export interface GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest {
  /** Optional. A comma-separated list of names of fields in the ResourcePolicy objects to update. Example: `enforcement_mode`. If this field is present, the `update_mask` field in the UpdateResourcePolicyRequest messages must all match this field, or the entire batch fails and no updates will be committed. */
  updateMask?: string;
  /** Required. The request messages specifying the ResourcePolicy objects to update. A maximum of 100 objects can be updated in a batch. */
  requests?: Array<GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest>;
}

export const GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest: Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  requests: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1UpdateResourcePolicyRequest)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest>;

export interface GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse {
  /** ResourcePolicy objects after the updates have been applied. */
  resourcePolicies?: Array<GoogleFirebaseAppcheckV1ResourcePolicy>;
}

export const GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse: Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse> = Schema.suspend(() => Schema.Struct({
  resourcePolicies: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1ResourcePolicy)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse>;

export interface GoogleFirebaseAppcheckV1PublicJwk {
  /** See [section 4.1 of RFC 7517](https://tools.ietf.org/html/rfc7517#section-4.1). */
  kty?: string;
  /** See [section 4.2 of RFC 7517](https://tools.ietf.org/html/rfc7517#section-4.2). */
  use?: string;
  /** See [section 4.4 of RFC 7517](https://tools.ietf.org/html/rfc7517#section-4.4). */
  alg?: string;
  /** See [section 4.5 of RFC 7517](https://tools.ietf.org/html/rfc7517#section-4.5). */
  kid?: string;
  /** See [section 6.3.1.1 of RFC 7518](https://tools.ietf.org/html/rfc7518#section-6.3.1.1). */
  n?: string;
  /** See [section 6.3.1.2 of RFC 7518](https://tools.ietf.org/html/rfc7518#section-6.3.1.2). */
  e?: string;
}

export const GoogleFirebaseAppcheckV1PublicJwk: Schema.Schema<GoogleFirebaseAppcheckV1PublicJwk> = Schema.suspend(() => Schema.Struct({
  kty: Schema.optional(Schema.String),
  use: Schema.optional(Schema.String),
  alg: Schema.optional(Schema.String),
  kid: Schema.optional(Schema.String),
  n: Schema.optional(Schema.String),
  e: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1PublicJwk" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1PublicJwk>;

export interface GoogleFirebaseAppcheckV1PublicJwkSet {
  /** The set of public keys. See [section 5.1 of RFC 7517](https://tools.ietf.org/html/rfc7517#section-5). */
  keys?: Array<GoogleFirebaseAppcheckV1PublicJwk>;
}

export const GoogleFirebaseAppcheckV1PublicJwkSet: Schema.Schema<GoogleFirebaseAppcheckV1PublicJwkSet> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(GoogleFirebaseAppcheckV1PublicJwk)),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1PublicJwkSet" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1PublicJwkSet>;

export interface GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest {
  /** Required. The [SafetyNet attestation response](https://developer.android.com/training/safetynet/attestation#request-attestation-step) issued to your app. */
  safetyNetToken?: string;
}

export const GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest> = Schema.suspend(() => Schema.Struct({
  safetyNetToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest>;

export interface GoogleFirebaseAppcheckV1AppCheckToken {
  /** The App Check token. App Check tokens are signed [JWTs](https://tools.ietf.org/html/rfc7519) containing claims that identify the attested app and GCP project. This token is used to access Google services protected by App Check. These tokens can also be [verified by your own custom backends](https://firebase.google.com/docs/app-check/custom-resource-backend) using the Firebase Admin SDK or third-party libraries. */
  token?: string;
  /** The duration from the time this token is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1AppCheckToken: Schema.Schema<GoogleFirebaseAppcheckV1AppCheckToken> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1AppCheckToken" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1AppCheckToken>;

export interface GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest {
}

export const GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest: Schema.Schema<GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest>;

export interface GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse {
  /** A one-time use [challenge](https://developer.android.com/google/play/integrity/verdict#protect-against-replay-attacks) for the client to pass to the Play Integrity API. */
  challenge?: string;
  /** The duration from the time this challenge is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse: Schema.Schema<GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse> = Schema.suspend(() => Schema.Struct({
  challenge: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse>;

export interface GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest {
  /** Required. The [integrity verdict response token from Play Integrity](https://developer.android.com/google/play/integrity/verdict#decrypt-verify) issued to your app. */
  playIntegrityToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest> = Schema.suspend(() => Schema.Struct({
  playIntegrityToken: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest>;

export interface GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest {
  /** Required. The `device_token` as returned by Apple's client-side [DeviceCheck API](https://developer.apple.com/documentation/devicecheck/dcdevice). This is the base64 encoded `Data` (Swift) or `NSData` (ObjC) object. */
  deviceToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest> = Schema.suspend(() => Schema.Struct({
  deviceToken: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest>;

export interface GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest {
  /** Required. The reCAPTCHA token as returned by the [reCAPTCHA v3 JavaScript API](https://developers.google.com/recaptcha/docs/v3). */
  recaptchaV3Token?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest> = Schema.suspend(() => Schema.Struct({
  recaptchaV3Token: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest>;

export interface GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest {
  /** Required. The reCAPTCHA token as returned by the [reCAPTCHA Enterprise JavaScript API](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages). */
  recaptchaEnterpriseToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest> = Schema.suspend(() => Schema.Struct({
  recaptchaEnterpriseToken: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest>;

export interface GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest {
  /** Required. A custom token signed using your project's Admin SDK service account credentials. */
  customToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest> = Schema.suspend(() => Schema.Struct({
  customToken: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest>;

export interface GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest {
  /** Required. A debug token secret. This string must match a debug token secret previously created using CreateDebugToken. */
  debugToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest> = Schema.suspend(() => Schema.Struct({
  debugToken: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest>;

export interface GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest {
}

export const GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest: Schema.Schema<GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest>;

export interface GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse {
  /** A one-time use challenge for the client to pass to the App Attest API. */
  challenge?: string;
  /** The duration from the time this challenge is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse: Schema.Schema<GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse> = Schema.suspend(() => Schema.Struct({
  challenge: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse>;

export interface GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest {
  /** Required. The App Attest statement returned by the client-side App Attest API. This is a base64url encoded CBOR object in the JSON response. */
  attestationStatement?: string;
  /** Required. A one-time challenge returned by an immediately prior call to GenerateAppAttestChallenge. */
  challenge?: string;
  /** Required. The key ID generated by App Attest for the client app. */
  keyId?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest> = Schema.suspend(() => Schema.Struct({
  attestationStatement: Schema.optional(Schema.String),
  challenge: Schema.optional(Schema.String),
  keyId: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest>;

export interface GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse {
  /** An artifact that can be used in future calls to ExchangeAppAttestAssertion. */
  artifact?: string;
  /** Encapsulates an App Check token. */
  appCheckToken?: GoogleFirebaseAppcheckV1AppCheckToken;
}

export const GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse> = Schema.suspend(() => Schema.Struct({
  artifact: Schema.optional(Schema.String),
  appCheckToken: Schema.optional(GoogleFirebaseAppcheckV1AppCheckToken),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse>;

export interface GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest {
  /** Required. The artifact returned by a previous call to ExchangeAppAttestAttestation. */
  artifact?: string;
  /** Required. The CBOR-encoded assertion returned by the client-side App Attest API. */
  assertion?: string;
  /** Required. A one-time challenge returned by an immediately prior call to GenerateAppAttestChallenge. */
  challenge?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest: Schema.Schema<GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest> = Schema.suspend(() => Schema.Struct({
  artifact: Schema.optional(Schema.String),
  assertion: Schema.optional(Schema.String),
  challenge: Schema.optional(Schema.String),
  limitedUse: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest" }) as any as Schema.Schema<GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the Service configuration for the specified service name. */
export interface GetProjectsServicesRequest {
  /** Required. The relative resource name of the Service to retrieve, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `oauth2.googleapis.com` (Google Identity for iOS) */
  name: string;
}

export const GetProjectsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsServicesRequest>;

export type GetProjectsServicesResponse = GoogleFirebaseAppcheckV1Service;
export const GetProjectsServicesResponse = GoogleFirebaseAppcheckV1Service;

export type GetProjectsServicesError = CommonErrors;

export const getProjectsServices: API.OperationMethod<GetProjectsServicesRequest, GetProjectsServicesResponse, GetProjectsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsServicesRequest,
  output: GetProjectsServicesResponse,
  errors: [],
}));

/** Lists all Service configurations for the specified project. Only Services which were explicitly configured using UpdateService or BatchUpdateServices will be returned. */
export interface ListProjectsServicesRequest {
  /** Required. The relative resource name of the parent project for which to list each associated Service, in the format: ``` projects/{project_number} ``` */
  parent: string;
  /** The maximum number of Services to return in the response. Only explicitly configured services are returned. The server may return fewer than this at its own discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. */
  pageSize?: number;
  /** Token returned from a previous call to ListServices indicating where in the set of Services to resume listing. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListServices must match the call that provided the page token; if they do not match, the result is undefined. */
  pageToken?: string;
}

export const ListProjectsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/services" }),
  svc,
) as unknown as Schema.Schema<ListProjectsServicesRequest>;

export type ListProjectsServicesResponse = GoogleFirebaseAppcheckV1ListServicesResponse;
export const ListProjectsServicesResponse = GoogleFirebaseAppcheckV1ListServicesResponse;

export type ListProjectsServicesError = CommonErrors;

export const listProjectsServices = API.makePaginated(() => ({
  input: ListProjectsServicesRequest,
  output: ListProjectsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the specified Service configuration. */
export interface PatchProjectsServicesRequest {
  /** Required. The relative resource name of the service configuration object, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `oauth2.googleapis.com` (Google Identity for iOS) */
  name: string;
  /** Required. A comma-separated list of names of fields in the Service to update. Example: `enforcement_mode`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1Service;
}

export const PatchProjectsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsServicesRequest>;

export type PatchProjectsServicesResponse = GoogleFirebaseAppcheckV1Service;
export const PatchProjectsServicesResponse = GoogleFirebaseAppcheckV1Service;

export type PatchProjectsServicesError = CommonErrors;

export const patchProjectsServices: API.OperationMethod<PatchProjectsServicesRequest, PatchProjectsServicesResponse, PatchProjectsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsServicesRequest,
  output: PatchProjectsServicesResponse,
  errors: [],
}));

/** Atomically updates the specified Service configurations. */
export interface BatchUpdateProjectsServicesRequest {
  /** Required. The parent project name shared by all Service configurations being updated, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being updated must match this field, or the entire batch fails. */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1BatchUpdateServicesRequest;
}

export const BatchUpdateProjectsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirebaseAppcheckV1BatchUpdateServicesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/services:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsServicesRequest>;

export type BatchUpdateProjectsServicesResponse = GoogleFirebaseAppcheckV1BatchUpdateServicesResponse;
export const BatchUpdateProjectsServicesResponse = GoogleFirebaseAppcheckV1BatchUpdateServicesResponse;

export type BatchUpdateProjectsServicesError = CommonErrors;

export const batchUpdateProjectsServices: API.OperationMethod<BatchUpdateProjectsServicesRequest, BatchUpdateProjectsServicesResponse, BatchUpdateProjectsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsServicesRequest,
  output: BatchUpdateProjectsServicesResponse,
  errors: [],
}));

/** Gets the requested ResourcePolicy configuration. */
export interface GetProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the ResourcePolicy to retrieve, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  name: string;
}

export const GetProjectsServicesResourcePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/services/{servicesId}/resourcePolicies/{resourcePoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsServicesResourcePoliciesRequest>;

export type GetProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ResourcePolicy;
export const GetProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ResourcePolicy;

export type GetProjectsServicesResourcePoliciesError = CommonErrors;

export const getProjectsServicesResourcePolicies: API.OperationMethod<GetProjectsServicesResourcePoliciesRequest, GetProjectsServicesResourcePoliciesResponse, GetProjectsServicesResourcePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsServicesResourcePoliciesRequest,
  output: GetProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

/** Lists all ResourcePolicy configurations for the specified project and service. */
export interface ListProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the parent Service for which to list each associated ResourcePolicy, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  parent: string;
  /** The maximum number of ResourcePolicy objects to return in the response. The server may return fewer than this at its own discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. */
  pageSize?: number;
  /** Token returned from a previous call to ListResourcePolicies indicating where in the set of ResourcePolicy objects to resume listing. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListResourcePolicies must match the call that provided the page token; if they do not match, the result is undefined. */
  pageToken?: string;
  /** Optional. Filters the results by the specified rule. For the exact syntax of this field, please consult the [AIP-160](https://google.aip.dev/160) standard. Currently, since the only fields in the ResourcePolicy resource are the scalar fields `enforcement_mode` and `target_resource`, this method does not support the traversal operator (`.`) or the has operator (`:`). Here are some examples of valid filters: * `enforcement_mode = ENFORCED` * `target_resource = "//oauth2.googleapis.com/projects/12345/oauthClients/"` * `enforcement_mode = ENFORCED AND target_resource = "//oauth2.googleapis.com/projects/12345/oauthClients/"` */
  filter?: string;
}

export const ListProjectsServicesResourcePoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/services/{servicesId}/resourcePolicies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsServicesResourcePoliciesRequest>;

export type ListProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ListResourcePoliciesResponse;
export const ListProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ListResourcePoliciesResponse;

export type ListProjectsServicesResourcePoliciesError = CommonErrors;

export const listProjectsServicesResourcePolicies = API.makePaginated(() => ({
  input: ListProjectsServicesResourcePoliciesRequest,
  output: ListProjectsServicesResourcePoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates the specified ResourcePolicy configuration. */
export interface CreateProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the parent Service in which the specified ResourcePolicy will be created, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ResourcePolicy;
}

export const CreateProjectsServicesResourcePoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ResourcePolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/services/{servicesId}/resourcePolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsServicesResourcePoliciesRequest>;

export type CreateProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ResourcePolicy;
export const CreateProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ResourcePolicy;

export type CreateProjectsServicesResourcePoliciesError = CommonErrors;

export const createProjectsServicesResourcePolicies: API.OperationMethod<CreateProjectsServicesResourcePoliciesRequest, CreateProjectsServicesResourcePoliciesResponse, CreateProjectsServicesResourcePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsServicesResourcePoliciesRequest,
  output: CreateProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

/** Updates the specified ResourcePolicy configuration. */
export interface PatchProjectsServicesResourcePoliciesRequest {
  /** Required. Identifier. The relative name of the resource policy object, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) `resource_policy_id` is a system-generated UID. */
  name: string;
  /** Required. A comma-separated list of names of fields in the ResourcePolicy to update. Example: `enforcement_mode`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ResourcePolicy;
}

export const PatchProjectsServicesResourcePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ResourcePolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/services/{servicesId}/resourcePolicies/{resourcePoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsServicesResourcePoliciesRequest>;

export type PatchProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ResourcePolicy;
export const PatchProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1ResourcePolicy;

export type PatchProjectsServicesResourcePoliciesError = CommonErrors;

export const patchProjectsServicesResourcePolicies: API.OperationMethod<PatchProjectsServicesResourcePoliciesRequest, PatchProjectsServicesResourcePoliciesResponse, PatchProjectsServicesResourcePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsServicesResourcePoliciesRequest,
  output: PatchProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

/** Deletes the specified ResourcePolicy configuration. */
export interface DeleteProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the ResourcePolicy to delete, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` */
  name: string;
  /** The checksum to be validated against the current ResourcePolicy, to ensure the client has an up-to-date value before proceeding. This checksum is computed by the server based on the values of fields in the ResourcePolicy object, and can be obtained from the ResourcePolicy object received from the last CreateResourcePolicy, GetResourcePolicy, ListResourcePolicies, UpdateResourcePolicy, or BatchUpdateResourcePolicies call. This etag is strongly validated as defined by RFC 7232. */
  etag?: string;
}

export const DeleteProjectsServicesResourcePoliciesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/services/{servicesId}/resourcePolicies/{resourcePoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsServicesResourcePoliciesRequest>;

export type DeleteProjectsServicesResourcePoliciesResponse = GoogleProtobufEmpty;
export const DeleteProjectsServicesResourcePoliciesResponse = GoogleProtobufEmpty;

export type DeleteProjectsServicesResourcePoliciesError = CommonErrors;

export const deleteProjectsServicesResourcePolicies: API.OperationMethod<DeleteProjectsServicesResourcePoliciesRequest, DeleteProjectsServicesResourcePoliciesResponse, DeleteProjectsServicesResourcePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsServicesResourcePoliciesRequest,
  output: DeleteProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

/** Atomically updates the specified ResourcePolicy configurations. */
export interface BatchUpdateProjectsServicesResourcePoliciesRequest {
  /** Required. The parent service name, in the format ``` projects/{project_number}/services/{service_id} ``` The parent collection in the `name` field of any resource being updated must match this field, or the entire batch fails. */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest;
}

export const BatchUpdateProjectsServicesResourcePoliciesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/services/{servicesId}/resourcePolicies:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsServicesResourcePoliciesRequest>;

export type BatchUpdateProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse;
export const BatchUpdateProjectsServicesResourcePoliciesResponse = GoogleFirebaseAppcheckV1BatchUpdateResourcePoliciesResponse;

export type BatchUpdateProjectsServicesResourcePoliciesError = CommonErrors;

export const batchUpdateProjectsServicesResourcePolicies: API.OperationMethod<BatchUpdateProjectsServicesResourcePoliciesRequest, BatchUpdateProjectsServicesResourcePoliciesResponse, BatchUpdateProjectsServicesResourcePoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsServicesResourcePoliciesRequest,
  output: BatchUpdateProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

/** Validates a [SafetyNet token](https://developer.android.com/training/safetynet/attestation#request-attestation-step). If valid, returns an AppCheckToken. */
export interface ExchangeSafetyNetTokenProjectsAppsRequest {
  /** Required. The relative resource name of the Android app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest;
}

export const ExchangeSafetyNetTokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeSafetyNetToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeSafetyNetTokenProjectsAppsRequest>;

export type ExchangeSafetyNetTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeSafetyNetTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeSafetyNetTokenProjectsAppsError = CommonErrors;

export const exchangeSafetyNetTokenProjectsApps: API.OperationMethod<ExchangeSafetyNetTokenProjectsAppsRequest, ExchangeSafetyNetTokenProjectsAppsResponse, ExchangeSafetyNetTokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeSafetyNetTokenProjectsAppsRequest,
  output: ExchangeSafetyNetTokenProjectsAppsResponse,
  errors: [],
}));

/** Generates a challenge that protects the integrity of an immediately following integrity verdict request to the Play Integrity API. The next call to ExchangePlayIntegrityToken using the resulting integrity token will verify the presence and validity of the challenge. A challenge should not be reused for multiple calls. */
export interface GeneratePlayIntegrityChallengeProjectsAppsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest;
}

export const GeneratePlayIntegrityChallengeProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:generatePlayIntegrityChallenge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GeneratePlayIntegrityChallengeProjectsAppsRequest>;

export type GeneratePlayIntegrityChallengeProjectsAppsResponse = GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse;
export const GeneratePlayIntegrityChallengeProjectsAppsResponse = GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse;

export type GeneratePlayIntegrityChallengeProjectsAppsError = CommonErrors;

export const generatePlayIntegrityChallengeProjectsApps: API.OperationMethod<GeneratePlayIntegrityChallengeProjectsAppsRequest, GeneratePlayIntegrityChallengeProjectsAppsResponse, GeneratePlayIntegrityChallengeProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GeneratePlayIntegrityChallengeProjectsAppsRequest,
  output: GeneratePlayIntegrityChallengeProjectsAppsResponse,
  errors: [],
}));

/** Validates an [integrity verdict response token from Play Integrity](https://developer.android.com/google/play/integrity/verdict#decrypt-verify). If valid, returns an AppCheckToken. */
export interface ExchangePlayIntegrityTokenProjectsAppsRequest {
  /** Required. The relative resource name of the Android app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest;
}

export const ExchangePlayIntegrityTokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangePlayIntegrityToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangePlayIntegrityTokenProjectsAppsRequest>;

export type ExchangePlayIntegrityTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangePlayIntegrityTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangePlayIntegrityTokenProjectsAppsError = CommonErrors;

export const exchangePlayIntegrityTokenProjectsApps: API.OperationMethod<ExchangePlayIntegrityTokenProjectsAppsRequest, ExchangePlayIntegrityTokenProjectsAppsResponse, ExchangePlayIntegrityTokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangePlayIntegrityTokenProjectsAppsRequest,
  output: ExchangePlayIntegrityTokenProjectsAppsResponse,
  errors: [],
}));

/** Accepts a [`device_token`](https://developer.apple.com/documentation/devicecheck/dcdevice) issued by DeviceCheck, and attempts to validate it with Apple. If valid, returns an AppCheckToken. */
export interface ExchangeDeviceCheckTokenProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest;
}

export const ExchangeDeviceCheckTokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeDeviceCheckToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeDeviceCheckTokenProjectsAppsRequest>;

export type ExchangeDeviceCheckTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeDeviceCheckTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeDeviceCheckTokenProjectsAppsError = CommonErrors;

export const exchangeDeviceCheckTokenProjectsApps: API.OperationMethod<ExchangeDeviceCheckTokenProjectsAppsRequest, ExchangeDeviceCheckTokenProjectsAppsResponse, ExchangeDeviceCheckTokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeDeviceCheckTokenProjectsAppsRequest,
  output: ExchangeDeviceCheckTokenProjectsAppsResponse,
  errors: [],
}));

/** Validates a [reCAPTCHA v3 response token](https://developers.google.com/recaptcha/docs/v3). If valid, returns an AppCheckToken. */
export interface ExchangeRecaptchaV3TokenProjectsAppsRequest {
  /** Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest;
}

export const ExchangeRecaptchaV3TokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeRecaptchaV3Token", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeRecaptchaV3TokenProjectsAppsRequest>;

export type ExchangeRecaptchaV3TokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeRecaptchaV3TokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeRecaptchaV3TokenProjectsAppsError = CommonErrors;

export const exchangeRecaptchaV3TokenProjectsApps: API.OperationMethod<ExchangeRecaptchaV3TokenProjectsAppsRequest, ExchangeRecaptchaV3TokenProjectsAppsResponse, ExchangeRecaptchaV3TokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeRecaptchaV3TokenProjectsAppsRequest,
  output: ExchangeRecaptchaV3TokenProjectsAppsResponse,
  errors: [],
}));

/** Validates a [reCAPTCHA Enterprise response token](https://cloud.google.com/recaptcha-enterprise/docs/create-assessment#retrieve_token). If valid, returns an AppCheckToken. */
export interface ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest {
  /** Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest;
}

export const ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeRecaptchaEnterpriseToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest>;

export type ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeRecaptchaEnterpriseTokenProjectsAppsError = CommonErrors;

export const exchangeRecaptchaEnterpriseTokenProjectsApps: API.OperationMethod<ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest, ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse, ExchangeRecaptchaEnterpriseTokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest,
  output: ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse,
  errors: [],
}));

/** Validates a custom token signed using your project's Admin SDK service account credentials. If valid, returns an AppCheckToken. */
export interface ExchangeCustomTokenProjectsAppsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest;
}

export const ExchangeCustomTokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeCustomToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeCustomTokenProjectsAppsRequest>;

export type ExchangeCustomTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeCustomTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeCustomTokenProjectsAppsError = CommonErrors;

export const exchangeCustomTokenProjectsApps: API.OperationMethod<ExchangeCustomTokenProjectsAppsRequest, ExchangeCustomTokenProjectsAppsResponse, ExchangeCustomTokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeCustomTokenProjectsAppsRequest,
  output: ExchangeCustomTokenProjectsAppsResponse,
  errors: [],
}));

/** Validates a debug token secret that you have previously created using CreateDebugToken. If valid, returns an AppCheckToken. Note that a restrictive quota is enforced on this method to prevent accidental exposure of the app to abuse. */
export interface ExchangeDebugTokenProjectsAppsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest;
}

export const ExchangeDebugTokenProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeDebugToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeDebugTokenProjectsAppsRequest>;

export type ExchangeDebugTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeDebugTokenProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeDebugTokenProjectsAppsError = CommonErrors;

export const exchangeDebugTokenProjectsApps: API.OperationMethod<ExchangeDebugTokenProjectsAppsRequest, ExchangeDebugTokenProjectsAppsResponse, ExchangeDebugTokenProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeDebugTokenProjectsAppsRequest,
  output: ExchangeDebugTokenProjectsAppsResponse,
  errors: [],
}));

/** Generates a challenge that protects the integrity of an immediately following call to ExchangeAppAttestAttestation or ExchangeAppAttestAssertion. A challenge should not be reused for multiple calls. */
export interface GenerateAppAttestChallengeProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest;
}

export const GenerateAppAttestChallengeProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:generateAppAttestChallenge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAppAttestChallengeProjectsAppsRequest>;

export type GenerateAppAttestChallengeProjectsAppsResponse = GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse;
export const GenerateAppAttestChallengeProjectsAppsResponse = GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse;

export type GenerateAppAttestChallengeProjectsAppsError = CommonErrors;

export const generateAppAttestChallengeProjectsApps: API.OperationMethod<GenerateAppAttestChallengeProjectsAppsRequest, GenerateAppAttestChallengeProjectsAppsResponse, GenerateAppAttestChallengeProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAppAttestChallengeProjectsAppsRequest,
  output: GenerateAppAttestChallengeProjectsAppsResponse,
  errors: [],
}));

/** Accepts an App Attest CBOR attestation and verifies it with Apple using your preconfigured team and bundle IDs. If valid, returns an attestation artifact that can later be exchanged for an AppCheckToken using ExchangeAppAttestAssertion. For convenience and performance, this method's response object will also contain an AppCheckToken (if the verification is successful). */
export interface ExchangeAppAttestAttestationProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest;
}

export const ExchangeAppAttestAttestationProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeAppAttestAttestation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeAppAttestAttestationProjectsAppsRequest>;

export type ExchangeAppAttestAttestationProjectsAppsResponse = GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse;
export const ExchangeAppAttestAttestationProjectsAppsResponse = GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse;

export type ExchangeAppAttestAttestationProjectsAppsError = CommonErrors;

export const exchangeAppAttestAttestationProjectsApps: API.OperationMethod<ExchangeAppAttestAttestationProjectsAppsRequest, ExchangeAppAttestAttestationProjectsAppsResponse, ExchangeAppAttestAttestationProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeAppAttestAttestationProjectsAppsRequest,
  output: ExchangeAppAttestAttestationProjectsAppsResponse,
  errors: [],
}));

/** Accepts an App Attest assertion and an artifact previously obtained from ExchangeAppAttestAttestation and verifies those with Apple. If valid, returns an AppCheckToken. */
export interface ExchangeAppAttestAssertionProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest;
}

export const ExchangeAppAttestAssertionProjectsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}:exchangeAppAttestAssertion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeAppAttestAssertionProjectsAppsRequest>;

export type ExchangeAppAttestAssertionProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeAppAttestAssertionProjectsAppsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeAppAttestAssertionProjectsAppsError = CommonErrors;

export const exchangeAppAttestAssertionProjectsApps: API.OperationMethod<ExchangeAppAttestAssertionProjectsAppsRequest, ExchangeAppAttestAssertionProjectsAppsResponse, ExchangeAppAttestAssertionProjectsAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeAppAttestAssertionProjectsAppsRequest,
  output: ExchangeAppAttestAssertionProjectsAppsResponse,
  errors: [],
}));

/** Gets the AppAttestConfig for the specified app. */
export interface GetProjectsAppsAppAttestConfigRequest {
  /** Required. The relative resource name of the AppAttestConfig, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` */
  name: string;
}

export const GetProjectsAppsAppAttestConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/appAttestConfig" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsAppAttestConfigRequest>;

export type GetProjectsAppsAppAttestConfigResponse = GoogleFirebaseAppcheckV1AppAttestConfig;
export const GetProjectsAppsAppAttestConfigResponse = GoogleFirebaseAppcheckV1AppAttestConfig;

export type GetProjectsAppsAppAttestConfigError = CommonErrors;

export const getProjectsAppsAppAttestConfig: API.OperationMethod<GetProjectsAppsAppAttestConfigRequest, GetProjectsAppsAppAttestConfigResponse, GetProjectsAppsAppAttestConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsAppAttestConfigRequest,
  output: GetProjectsAppsAppAttestConfigResponse,
  errors: [],
}));

/** Atomically gets the AppAttestConfigs for the specified list of apps. */
export interface BatchGetProjectsAppsAppAttestConfigRequest {
  /** Required. The parent project name shared by all AppAttestConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the AppAttestConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsAppAttestConfigRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/-/appAttestConfig:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAppsAppAttestConfigRequest>;

export type BatchGetProjectsAppsAppAttestConfigResponse = GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse;
export const BatchGetProjectsAppsAppAttestConfigResponse = GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse;

export type BatchGetProjectsAppsAppAttestConfigError = CommonErrors;

export const batchGetProjectsAppsAppAttestConfig: API.OperationMethod<BatchGetProjectsAppsAppAttestConfigRequest, BatchGetProjectsAppsAppAttestConfigResponse, BatchGetProjectsAppsAppAttestConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAppsAppAttestConfigRequest,
  output: BatchGetProjectsAppsAppAttestConfigResponse,
  errors: [],
}));

/** Updates the AppAttestConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange AppAttest tokens for App Check tokens. */
export interface PatchProjectsAppsAppAttestConfigRequest {
  /** Required. The relative resource name of the App Attest configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the AppAttestConfig to update. Example: `token_ttl`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1AppAttestConfig;
}

export const PatchProjectsAppsAppAttestConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1AppAttestConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/appAttestConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsAppAttestConfigRequest>;

export type PatchProjectsAppsAppAttestConfigResponse = GoogleFirebaseAppcheckV1AppAttestConfig;
export const PatchProjectsAppsAppAttestConfigResponse = GoogleFirebaseAppcheckV1AppAttestConfig;

export type PatchProjectsAppsAppAttestConfigError = CommonErrors;

export const patchProjectsAppsAppAttestConfig: API.OperationMethod<PatchProjectsAppsAppAttestConfigRequest, PatchProjectsAppsAppAttestConfigResponse, PatchProjectsAppsAppAttestConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsAppAttestConfigRequest,
  output: PatchProjectsAppsAppAttestConfigResponse,
  errors: [],
}));

/** Gets the DeviceCheckConfig for the specified app. For security reasons, the `private_key` field is never populated in the response. */
export interface GetProjectsAppsDeviceCheckConfigRequest {
  /** Required. The relative resource name of the DeviceCheckConfig, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` */
  name: string;
}

export const GetProjectsAppsDeviceCheckConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/deviceCheckConfig" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsDeviceCheckConfigRequest>;

export type GetProjectsAppsDeviceCheckConfigResponse = GoogleFirebaseAppcheckV1DeviceCheckConfig;
export const GetProjectsAppsDeviceCheckConfigResponse = GoogleFirebaseAppcheckV1DeviceCheckConfig;

export type GetProjectsAppsDeviceCheckConfigError = CommonErrors;

export const getProjectsAppsDeviceCheckConfig: API.OperationMethod<GetProjectsAppsDeviceCheckConfigRequest, GetProjectsAppsDeviceCheckConfigResponse, GetProjectsAppsDeviceCheckConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsDeviceCheckConfigRequest,
  output: GetProjectsAppsDeviceCheckConfigResponse,
  errors: [],
}));

/** Atomically gets the DeviceCheckConfigs for the specified list of apps. For security reasons, the `private_key` field is never populated in the response. */
export interface BatchGetProjectsAppsDeviceCheckConfigRequest {
  /** Required. The parent project name shared by all DeviceCheckConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the DeviceCheckConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsDeviceCheckConfigRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/-/deviceCheckConfig:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAppsDeviceCheckConfigRequest>;

export type BatchGetProjectsAppsDeviceCheckConfigResponse = GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse;
export const BatchGetProjectsAppsDeviceCheckConfigResponse = GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse;

export type BatchGetProjectsAppsDeviceCheckConfigError = CommonErrors;

export const batchGetProjectsAppsDeviceCheckConfig: API.OperationMethod<BatchGetProjectsAppsDeviceCheckConfigRequest, BatchGetProjectsAppsDeviceCheckConfigResponse, BatchGetProjectsAppsDeviceCheckConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAppsDeviceCheckConfigRequest,
  output: BatchGetProjectsAppsDeviceCheckConfigResponse,
  errors: [],
}));

/** Updates the DeviceCheckConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange DeviceCheck tokens for App Check tokens. For security reasons, the `private_key` field is never populated in the response. */
export interface PatchProjectsAppsDeviceCheckConfigRequest {
  /** Required. The relative resource name of the DeviceCheck configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the DeviceCheckConfig to update. Example: `key_id,private_key`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1DeviceCheckConfig;
}

export const PatchProjectsAppsDeviceCheckConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1DeviceCheckConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/deviceCheckConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsDeviceCheckConfigRequest>;

export type PatchProjectsAppsDeviceCheckConfigResponse = GoogleFirebaseAppcheckV1DeviceCheckConfig;
export const PatchProjectsAppsDeviceCheckConfigResponse = GoogleFirebaseAppcheckV1DeviceCheckConfig;

export type PatchProjectsAppsDeviceCheckConfigError = CommonErrors;

export const patchProjectsAppsDeviceCheckConfig: API.OperationMethod<PatchProjectsAppsDeviceCheckConfigRequest, PatchProjectsAppsDeviceCheckConfigResponse, PatchProjectsAppsDeviceCheckConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsDeviceCheckConfigRequest,
  output: PatchProjectsAppsDeviceCheckConfigResponse,
  errors: [],
}));

/** Gets the RecaptchaV3Config for the specified app. For security reasons, the `site_secret` field is never populated in the response. */
export interface GetProjectsAppsRecaptchaV3ConfigRequest {
  /** Required. The relative resource name of the RecaptchaV3Config, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` */
  name: string;
}

export const GetProjectsAppsRecaptchaV3ConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/recaptchaV3Config" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsRecaptchaV3ConfigRequest>;

export type GetProjectsAppsRecaptchaV3ConfigResponse = GoogleFirebaseAppcheckV1RecaptchaV3Config;
export const GetProjectsAppsRecaptchaV3ConfigResponse = GoogleFirebaseAppcheckV1RecaptchaV3Config;

export type GetProjectsAppsRecaptchaV3ConfigError = CommonErrors;

export const getProjectsAppsRecaptchaV3Config: API.OperationMethod<GetProjectsAppsRecaptchaV3ConfigRequest, GetProjectsAppsRecaptchaV3ConfigResponse, GetProjectsAppsRecaptchaV3ConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsRecaptchaV3ConfigRequest,
  output: GetProjectsAppsRecaptchaV3ConfigResponse,
  errors: [],
}));

/** Atomically gets the RecaptchaV3Configs for the specified list of apps. For security reasons, the `site_secret` field is never populated in the response. */
export interface BatchGetProjectsAppsRecaptchaV3ConfigRequest {
  /** Required. The parent project name shared by all RecaptchaV3Configs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the RecaptchaV3Configs to retrieve, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsRecaptchaV3ConfigRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/-/recaptchaV3Config:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAppsRecaptchaV3ConfigRequest>;

export type BatchGetProjectsAppsRecaptchaV3ConfigResponse = GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse;
export const BatchGetProjectsAppsRecaptchaV3ConfigResponse = GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse;

export type BatchGetProjectsAppsRecaptchaV3ConfigError = CommonErrors;

export const batchGetProjectsAppsRecaptchaV3Config: API.OperationMethod<BatchGetProjectsAppsRecaptchaV3ConfigRequest, BatchGetProjectsAppsRecaptchaV3ConfigResponse, BatchGetProjectsAppsRecaptchaV3ConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAppsRecaptchaV3ConfigRequest,
  output: BatchGetProjectsAppsRecaptchaV3ConfigResponse,
  errors: [],
}));

/** Updates the RecaptchaV3Config for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange reCAPTCHA V3 tokens for App Check tokens. For security reasons, the `site_secret` field is never populated in the response. */
export interface PatchProjectsAppsRecaptchaV3ConfigRequest {
  /** Required. The relative resource name of the reCAPTCHA v3 configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the RecaptchaV3Config to update. Example: `site_secret`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1RecaptchaV3Config;
}

export const PatchProjectsAppsRecaptchaV3ConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1RecaptchaV3Config).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/recaptchaV3Config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsRecaptchaV3ConfigRequest>;

export type PatchProjectsAppsRecaptchaV3ConfigResponse = GoogleFirebaseAppcheckV1RecaptchaV3Config;
export const PatchProjectsAppsRecaptchaV3ConfigResponse = GoogleFirebaseAppcheckV1RecaptchaV3Config;

export type PatchProjectsAppsRecaptchaV3ConfigError = CommonErrors;

export const patchProjectsAppsRecaptchaV3Config: API.OperationMethod<PatchProjectsAppsRecaptchaV3ConfigRequest, PatchProjectsAppsRecaptchaV3ConfigResponse, PatchProjectsAppsRecaptchaV3ConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsRecaptchaV3ConfigRequest,
  output: PatchProjectsAppsRecaptchaV3ConfigResponse,
  errors: [],
}));

/** Gets the RecaptchaEnterpriseConfig for the specified app. */
export interface GetProjectsAppsRecaptchaEnterpriseConfigRequest {
  /** Required. The relative resource name of the RecaptchaEnterpriseConfig, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` */
  name: string;
}

export const GetProjectsAppsRecaptchaEnterpriseConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/recaptchaEnterpriseConfig" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsRecaptchaEnterpriseConfigRequest>;

export type GetProjectsAppsRecaptchaEnterpriseConfigResponse = GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig;
export const GetProjectsAppsRecaptchaEnterpriseConfigResponse = GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig;

export type GetProjectsAppsRecaptchaEnterpriseConfigError = CommonErrors;

export const getProjectsAppsRecaptchaEnterpriseConfig: API.OperationMethod<GetProjectsAppsRecaptchaEnterpriseConfigRequest, GetProjectsAppsRecaptchaEnterpriseConfigResponse, GetProjectsAppsRecaptchaEnterpriseConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsRecaptchaEnterpriseConfigRequest,
  output: GetProjectsAppsRecaptchaEnterpriseConfigResponse,
  errors: [],
}));

/** Atomically gets the RecaptchaEnterpriseConfigs for the specified list of apps. */
export interface BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest {
  /** Required. The parent project name shared by all RecaptchaEnterpriseConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the RecaptchaEnterpriseConfigs to retrieve, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/-/recaptchaEnterpriseConfig:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest>;

export type BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse = GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse;
export const BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse = GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse;

export type BatchGetProjectsAppsRecaptchaEnterpriseConfigError = CommonErrors;

export const batchGetProjectsAppsRecaptchaEnterpriseConfig: API.OperationMethod<BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest, BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse, BatchGetProjectsAppsRecaptchaEnterpriseConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest,
  output: BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse,
  errors: [],
}));

/** Updates the RecaptchaEnterpriseConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange reCAPTCHA Enterprise tokens for App Check tokens. */
export interface PatchProjectsAppsRecaptchaEnterpriseConfigRequest {
  /** Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the RecaptchaEnterpriseConfig to update. Example: `site_key`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig;
}

export const PatchProjectsAppsRecaptchaEnterpriseConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/recaptchaEnterpriseConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsRecaptchaEnterpriseConfigRequest>;

export type PatchProjectsAppsRecaptchaEnterpriseConfigResponse = GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig;
export const PatchProjectsAppsRecaptchaEnterpriseConfigResponse = GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig;

export type PatchProjectsAppsRecaptchaEnterpriseConfigError = CommonErrors;

export const patchProjectsAppsRecaptchaEnterpriseConfig: API.OperationMethod<PatchProjectsAppsRecaptchaEnterpriseConfigRequest, PatchProjectsAppsRecaptchaEnterpriseConfigResponse, PatchProjectsAppsRecaptchaEnterpriseConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsRecaptchaEnterpriseConfigRequest,
  output: PatchProjectsAppsRecaptchaEnterpriseConfigResponse,
  errors: [],
}));

/** Gets the SafetyNetConfig for the specified app. */
export interface GetProjectsAppsSafetyNetConfigRequest {
  /** Required. The relative resource name of the SafetyNetConfig, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` */
  name: string;
}

export const GetProjectsAppsSafetyNetConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/safetyNetConfig" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsSafetyNetConfigRequest>;

export type GetProjectsAppsSafetyNetConfigResponse = GoogleFirebaseAppcheckV1SafetyNetConfig;
export const GetProjectsAppsSafetyNetConfigResponse = GoogleFirebaseAppcheckV1SafetyNetConfig;

export type GetProjectsAppsSafetyNetConfigError = CommonErrors;

export const getProjectsAppsSafetyNetConfig: API.OperationMethod<GetProjectsAppsSafetyNetConfigRequest, GetProjectsAppsSafetyNetConfigResponse, GetProjectsAppsSafetyNetConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsSafetyNetConfigRequest,
  output: GetProjectsAppsSafetyNetConfigResponse,
  errors: [],
}));

/** Atomically gets the SafetyNetConfigs for the specified list of apps. */
export interface BatchGetProjectsAppsSafetyNetConfigRequest {
  /** Required. The parent project name shared by all SafetyNetConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the SafetyNetConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsSafetyNetConfigRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/-/safetyNetConfig:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAppsSafetyNetConfigRequest>;

export type BatchGetProjectsAppsSafetyNetConfigResponse = GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse;
export const BatchGetProjectsAppsSafetyNetConfigResponse = GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse;

export type BatchGetProjectsAppsSafetyNetConfigError = CommonErrors;

export const batchGetProjectsAppsSafetyNetConfig: API.OperationMethod<BatchGetProjectsAppsSafetyNetConfigRequest, BatchGetProjectsAppsSafetyNetConfigResponse, BatchGetProjectsAppsSafetyNetConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAppsSafetyNetConfigRequest,
  output: BatchGetProjectsAppsSafetyNetConfigResponse,
  errors: [],
}));

/** Updates the SafetyNetConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange SafetyNet tokens for App Check tokens. */
export interface PatchProjectsAppsSafetyNetConfigRequest {
  /** Required. The relative resource name of the SafetyNet configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the SafetyNetConfig to update. Example: `token_ttl`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1SafetyNetConfig;
}

export const PatchProjectsAppsSafetyNetConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1SafetyNetConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/safetyNetConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsSafetyNetConfigRequest>;

export type PatchProjectsAppsSafetyNetConfigResponse = GoogleFirebaseAppcheckV1SafetyNetConfig;
export const PatchProjectsAppsSafetyNetConfigResponse = GoogleFirebaseAppcheckV1SafetyNetConfig;

export type PatchProjectsAppsSafetyNetConfigError = CommonErrors;

export const patchProjectsAppsSafetyNetConfig: API.OperationMethod<PatchProjectsAppsSafetyNetConfigRequest, PatchProjectsAppsSafetyNetConfigResponse, PatchProjectsAppsSafetyNetConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsSafetyNetConfigRequest,
  output: PatchProjectsAppsSafetyNetConfigResponse,
  errors: [],
}));

/** Gets the PlayIntegrityConfig for the specified app. */
export interface GetProjectsAppsPlayIntegrityConfigRequest {
  /** Required. The relative resource name of the PlayIntegrityConfig, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` */
  name: string;
}

export const GetProjectsAppsPlayIntegrityConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/playIntegrityConfig" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsPlayIntegrityConfigRequest>;

export type GetProjectsAppsPlayIntegrityConfigResponse = GoogleFirebaseAppcheckV1PlayIntegrityConfig;
export const GetProjectsAppsPlayIntegrityConfigResponse = GoogleFirebaseAppcheckV1PlayIntegrityConfig;

export type GetProjectsAppsPlayIntegrityConfigError = CommonErrors;

export const getProjectsAppsPlayIntegrityConfig: API.OperationMethod<GetProjectsAppsPlayIntegrityConfigRequest, GetProjectsAppsPlayIntegrityConfigResponse, GetProjectsAppsPlayIntegrityConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsPlayIntegrityConfigRequest,
  output: GetProjectsAppsPlayIntegrityConfigResponse,
  errors: [],
}));

/** Atomically gets the PlayIntegrityConfigs for the specified list of apps. */
export interface BatchGetProjectsAppsPlayIntegrityConfigRequest {
  /** Required. The parent project name shared by all PlayIntegrityConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the PlayIntegrityConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsPlayIntegrityConfigRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  names: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("names")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/-/playIntegrityConfig:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAppsPlayIntegrityConfigRequest>;

export type BatchGetProjectsAppsPlayIntegrityConfigResponse = GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse;
export const BatchGetProjectsAppsPlayIntegrityConfigResponse = GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse;

export type BatchGetProjectsAppsPlayIntegrityConfigError = CommonErrors;

export const batchGetProjectsAppsPlayIntegrityConfig: API.OperationMethod<BatchGetProjectsAppsPlayIntegrityConfigRequest, BatchGetProjectsAppsPlayIntegrityConfigResponse, BatchGetProjectsAppsPlayIntegrityConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAppsPlayIntegrityConfigRequest,
  output: BatchGetProjectsAppsPlayIntegrityConfigResponse,
  errors: [],
}));

/** Updates the PlayIntegrityConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange Play Integrity tokens for App Check tokens. */
export interface PatchProjectsAppsPlayIntegrityConfigRequest {
  /** Required. The relative resource name of the Play Integrity configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the PlayIntegrityConfig to update. Example: `token_ttl`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1PlayIntegrityConfig;
}

export const PatchProjectsAppsPlayIntegrityConfigRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1PlayIntegrityConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/playIntegrityConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsPlayIntegrityConfigRequest>;

export type PatchProjectsAppsPlayIntegrityConfigResponse = GoogleFirebaseAppcheckV1PlayIntegrityConfig;
export const PatchProjectsAppsPlayIntegrityConfigResponse = GoogleFirebaseAppcheckV1PlayIntegrityConfig;

export type PatchProjectsAppsPlayIntegrityConfigError = CommonErrors;

export const patchProjectsAppsPlayIntegrityConfig: API.OperationMethod<PatchProjectsAppsPlayIntegrityConfigRequest, PatchProjectsAppsPlayIntegrityConfigResponse, PatchProjectsAppsPlayIntegrityConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsPlayIntegrityConfigRequest,
  output: PatchProjectsAppsPlayIntegrityConfigResponse,
  errors: [],
}));

/** Gets the specified DebugToken. For security reasons, the `token` field is never populated in the response. */
export interface GetProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name: string;
}

export const GetProjectsAppsDebugTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/debugTokens/{debugTokensId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAppsDebugTokensRequest>;

export type GetProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1DebugToken;
export const GetProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1DebugToken;

export type GetProjectsAppsDebugTokensError = CommonErrors;

export const getProjectsAppsDebugTokens: API.OperationMethod<GetProjectsAppsDebugTokensRequest, GetProjectsAppsDebugTokensResponse, GetProjectsAppsDebugTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAppsDebugTokensRequest,
  output: GetProjectsAppsDebugTokensResponse,
  errors: [],
}));

/** Lists all DebugTokens for the specified app. For security reasons, the `token` field is never populated in the response. */
export interface ListProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the parent app for which to list each associated DebugToken, in the format: ``` projects/{project_number}/apps/{app_id} ``` */
  parent: string;
  /** The maximum number of DebugTokens to return in the response. Note that an app can have at most 20 debug tokens. The server may return fewer than this at its own discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. */
  pageSize?: number;
  /** Token returned from a previous call to ListDebugTokens indicating where in the set of DebugTokens to resume listing. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDebugTokens must match the call that provided the page token; if they do not match, the result is undefined. */
  pageToken?: string;
}

export const ListProjectsAppsDebugTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/apps/{appsId}/debugTokens" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAppsDebugTokensRequest>;

export type ListProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1ListDebugTokensResponse;
export const ListProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1ListDebugTokensResponse;

export type ListProjectsAppsDebugTokensError = CommonErrors;

export const listProjectsAppsDebugTokens = API.makePaginated(() => ({
  input: ListProjectsAppsDebugTokensRequest,
  output: ListProjectsAppsDebugTokensResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new DebugToken for the specified app. For security reasons, after the creation operation completes, the `token` field cannot be updated or retrieved, but you can revoke the debug token using DeleteDebugToken. Each app can have a maximum of 20 debug tokens. */
export interface CreateProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the parent app in which the specified DebugToken will be created, in the format: ``` projects/{project_number}/apps/{app_id} ``` */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1DebugToken;
}

export const CreateProjectsAppsDebugTokensRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirebaseAppcheckV1DebugToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/apps/{appsId}/debugTokens", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAppsDebugTokensRequest>;

export type CreateProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1DebugToken;
export const CreateProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1DebugToken;

export type CreateProjectsAppsDebugTokensError = CommonErrors;

export const createProjectsAppsDebugTokens: API.OperationMethod<CreateProjectsAppsDebugTokensRequest, CreateProjectsAppsDebugTokensResponse, CreateProjectsAppsDebugTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAppsDebugTokensRequest,
  output: CreateProjectsAppsDebugTokensResponse,
  errors: [],
}));

/** Updates the specified DebugToken. For security reasons, the `token` field cannot be updated, nor will it be populated in the response, but you can revoke the debug token using DeleteDebugToken. */
export interface PatchProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the DebugToken to update. Example: `display_name`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1DebugToken;
}

export const PatchProjectsAppsDebugTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleFirebaseAppcheckV1DebugToken).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/apps/{appsId}/debugTokens/{debugTokensId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAppsDebugTokensRequest>;

export type PatchProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1DebugToken;
export const PatchProjectsAppsDebugTokensResponse = GoogleFirebaseAppcheckV1DebugToken;

export type PatchProjectsAppsDebugTokensError = CommonErrors;

export const patchProjectsAppsDebugTokens: API.OperationMethod<PatchProjectsAppsDebugTokensRequest, PatchProjectsAppsDebugTokensResponse, PatchProjectsAppsDebugTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAppsDebugTokensRequest,
  output: PatchProjectsAppsDebugTokensResponse,
  errors: [],
}));

/** Deletes the specified DebugToken. A deleted debug token cannot be used to exchange for an App Check token. Use this method when you suspect the secret `token` has been compromised or when you no longer need the debug token. */
export interface DeleteProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the DebugToken to delete, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name: string;
}

export const DeleteProjectsAppsDebugTokensRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/apps/{appsId}/debugTokens/{debugTokensId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAppsDebugTokensRequest>;

export type DeleteProjectsAppsDebugTokensResponse = GoogleProtobufEmpty;
export const DeleteProjectsAppsDebugTokensResponse = GoogleProtobufEmpty;

export type DeleteProjectsAppsDebugTokensError = CommonErrors;

export const deleteProjectsAppsDebugTokens: API.OperationMethod<DeleteProjectsAppsDebugTokensRequest, DeleteProjectsAppsDebugTokensResponse, DeleteProjectsAppsDebugTokensError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAppsDebugTokensRequest,
  output: DeleteProjectsAppsDebugTokensResponse,
  errors: [],
}));

/** Returns a public JWK set as specified by [RFC 7517](https://tools.ietf.org/html/rfc7517) that can be used to verify App Check tokens. Exactly one of the public keys in the returned set will successfully validate any App Check token that is currently valid. */
export interface GetJwksRequest {
  /** Required. The relative resource name to the public JWK set. Must always be exactly the string `jwks`. */
  name: string;
}

export const GetJwksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/jwks" }),
  svc,
) as unknown as Schema.Schema<GetJwksRequest>;

export type GetJwksResponse = GoogleFirebaseAppcheckV1PublicJwkSet;
export const GetJwksResponse = GoogleFirebaseAppcheckV1PublicJwkSet;

export type GetJwksError = CommonErrors;

export const getJwks: API.OperationMethod<GetJwksRequest, GetJwksResponse, GetJwksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetJwksRequest,
  output: GetJwksResponse,
  errors: [],
}));

/** Validates a debug token secret that you have previously created using CreateDebugToken. If valid, returns an AppCheckToken. Note that a restrictive quota is enforced on this method to prevent accidental exposure of the app to abuse. */
export interface ExchangeDebugTokenOauthClientsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest;
}

export const ExchangeDebugTokenOauthClientsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/oauthClients/{oauthClientsId}:exchangeDebugToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeDebugTokenOauthClientsRequest>;

export type ExchangeDebugTokenOauthClientsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeDebugTokenOauthClientsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeDebugTokenOauthClientsError = CommonErrors;

export const exchangeDebugTokenOauthClients: API.OperationMethod<ExchangeDebugTokenOauthClientsRequest, ExchangeDebugTokenOauthClientsResponse, ExchangeDebugTokenOauthClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeDebugTokenOauthClientsRequest,
  output: ExchangeDebugTokenOauthClientsResponse,
  errors: [],
}));

/** Generates a challenge that protects the integrity of an immediately following call to ExchangeAppAttestAttestation or ExchangeAppAttestAssertion. A challenge should not be reused for multiple calls. */
export interface GenerateAppAttestChallengeOauthClientsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest;
}

export const GenerateAppAttestChallengeOauthClientsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/oauthClients/{oauthClientsId}:generateAppAttestChallenge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateAppAttestChallengeOauthClientsRequest>;

export type GenerateAppAttestChallengeOauthClientsResponse = GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse;
export const GenerateAppAttestChallengeOauthClientsResponse = GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse;

export type GenerateAppAttestChallengeOauthClientsError = CommonErrors;

export const generateAppAttestChallengeOauthClients: API.OperationMethod<GenerateAppAttestChallengeOauthClientsRequest, GenerateAppAttestChallengeOauthClientsResponse, GenerateAppAttestChallengeOauthClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateAppAttestChallengeOauthClientsRequest,
  output: GenerateAppAttestChallengeOauthClientsResponse,
  errors: [],
}));

/** Accepts an App Attest CBOR attestation and verifies it with Apple using your preconfigured team and bundle IDs. If valid, returns an attestation artifact that can later be exchanged for an AppCheckToken using ExchangeAppAttestAssertion. For convenience and performance, this method's response object will also contain an AppCheckToken (if the verification is successful). */
export interface ExchangeAppAttestAttestationOauthClientsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest;
}

export const ExchangeAppAttestAttestationOauthClientsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/oauthClients/{oauthClientsId}:exchangeAppAttestAttestation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeAppAttestAttestationOauthClientsRequest>;

export type ExchangeAppAttestAttestationOauthClientsResponse = GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse;
export const ExchangeAppAttestAttestationOauthClientsResponse = GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse;

export type ExchangeAppAttestAttestationOauthClientsError = CommonErrors;

export const exchangeAppAttestAttestationOauthClients: API.OperationMethod<ExchangeAppAttestAttestationOauthClientsRequest, ExchangeAppAttestAttestationOauthClientsResponse, ExchangeAppAttestAttestationOauthClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeAppAttestAttestationOauthClientsRequest,
  output: ExchangeAppAttestAttestationOauthClientsResponse,
  errors: [],
}));

/** Accepts an App Attest assertion and an artifact previously obtained from ExchangeAppAttestAttestation and verifies those with Apple. If valid, returns an AppCheckToken. */
export interface ExchangeAppAttestAssertionOauthClientsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest;
}

export const ExchangeAppAttestAssertionOauthClientsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/oauthClients/{oauthClientsId}:exchangeAppAttestAssertion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExchangeAppAttestAssertionOauthClientsRequest>;

export type ExchangeAppAttestAssertionOauthClientsResponse = GoogleFirebaseAppcheckV1AppCheckToken;
export const ExchangeAppAttestAssertionOauthClientsResponse = GoogleFirebaseAppcheckV1AppCheckToken;

export type ExchangeAppAttestAssertionOauthClientsError = CommonErrors;

export const exchangeAppAttestAssertionOauthClients: API.OperationMethod<ExchangeAppAttestAssertionOauthClientsRequest, ExchangeAppAttestAssertionOauthClientsResponse, ExchangeAppAttestAssertionOauthClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExchangeAppAttestAssertionOauthClientsRequest,
  output: ExchangeAppAttestAssertionOauthClientsResponse,
  errors: [],
}));

