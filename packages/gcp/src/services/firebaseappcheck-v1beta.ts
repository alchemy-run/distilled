// ==========================================================================
// Firebase App Check API (firebaseappcheck v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "firebaseappcheck",
  version: "v1beta",
  rootUrl: "https://firebaseappcheck.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleFirebaseAppcheckV1betaAppAttestConfig {
  /** Required. The relative resource name of the App Attest configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from App Attest artifacts will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
}

export const GoogleFirebaseAppcheckV1betaAppAttestConfig: Schema.Schema<GoogleFirebaseAppcheckV1betaAppAttestConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tokenTtl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaAppAttestConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaAppAttestConfig>;

export interface GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse {
  /** AppAttestConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaAppAttestConfig>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaAppAttestConfig),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaDeviceCheckConfig {
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

export const GoogleFirebaseAppcheckV1betaDeviceCheckConfig: Schema.Schema<GoogleFirebaseAppcheckV1betaDeviceCheckConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tokenTtl: Schema.optional(Schema.String),
      keyId: Schema.optional(Schema.String),
      privateKey: Schema.optional(Schema.String),
      privateKeySet: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaDeviceCheckConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaDeviceCheckConfig>;

export interface GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse {
  /** DeviceCheckConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaDeviceCheckConfig>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaDeviceCheckConfig),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaRecaptchaConfig {
  /** Specifies the duration for which App Check tokens exchanged from reCAPTCHA tokens will be valid. If unset, a default value of 1 day is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** Required. The relative resource name of the reCAPTCHA v3 configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaConfig ``` */
  name?: string;
  /** Required. Input only. The site secret used to identify your service for reCAPTCHA v3 verification. For security reasons, this field will never be populated in any response. */
  siteSecret?: string;
  /** Output only. Whether the `site_secret` field was previously set. Since we will never return the `site_secret` field, this field is the only way to find out whether it was previously set. */
  siteSecretSet?: boolean;
  /** Specifies a minimum score required for a reCAPTCHA token to be considered valid. If its score is greater than or equal to this value, it will be accepted; otherwise, it will be rejected. The value must be between 0.0 and 1.0. The default value is 0.5. */
  minValidScore?: number;
}

export const GoogleFirebaseAppcheckV1betaRecaptchaConfig: Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokenTtl: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      siteSecret: Schema.optional(Schema.String),
      siteSecretSet: Schema.optional(Schema.Boolean),
      minValidScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaRecaptchaConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaConfig>;

export interface GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse {
  /** RecaptchaConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaRecaptchaConfig>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaRecaptchaConfig),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaRecaptchaV3Config {
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

export const GoogleFirebaseAppcheckV1betaRecaptchaV3Config: Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaV3Config> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokenTtl: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      siteSecret: Schema.optional(Schema.String),
      siteSecretSet: Schema.optional(Schema.Boolean),
      minValidScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaRecaptchaV3Config",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaV3Config>;

export interface GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse {
  /** RecaptchaV3Configs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaRecaptchaV3Config>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaRecaptchaV3Config),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis {
  /** Specifies a minimum score required for a reCAPTCHA token to be considered valid. If its score is greater than or equal to this value, it will be accepted; otherwise, it will be rejected. The value must be between 0.0 and 1.0. The default value is 0.5. */
  minValidScore?: number;
}

export const GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis: Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minValidScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis>;

export interface GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig {
  /** Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from reCAPTCHA Enterprise tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** The score-based site key [created in reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/create-key#creating_a_site_key) used to [invoke reCAPTCHA and generate the reCAPTCHA tokens](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages) for your application. Important: This is *not* the `site_secret` (as it is in reCAPTCHA v3), but rather your score-based reCAPTCHA Enterprise site key. */
  siteKey?: string;
  /** Specifies risk tolerance and requirements for your application. These settings correspond to requirements on the [**`riskAnalysis`**](https://cloud.google.com/recaptcha/docs/interpret-assessment-website#interpret_assessment) tuple in the assessment obtained from reCAPTCHA Enterprise. The default values for these settings work for most apps, and are recommended. */
  riskAnalysis?: GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis;
}

export const GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig: Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tokenTtl: Schema.optional(Schema.String),
      siteKey: Schema.optional(Schema.String),
      riskAnalysis: Schema.optional(
        GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfigRiskAnalysis,
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig>;

export interface GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse {
  /** RecaptchaEnterpriseConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaSafetyNetConfig {
  /** Required. The relative resource name of the SafetyNet configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from SafetyNet tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
}

export const GoogleFirebaseAppcheckV1betaSafetyNetConfig: Schema.Schema<GoogleFirebaseAppcheckV1betaSafetyNetConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tokenTtl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaSafetyNetConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaSafetyNetConfig>;

export interface GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse {
  /** SafetyNetConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaSafetyNetConfig>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaSafetyNetConfig),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity {
  /** Specifies whether your running app is allowed to have the `UNRECOGNIZED_VERSION` [app recognition verdict](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field). Note that the app recognition verdict `PLAY_RECOGNIZED` is a strong, comprehensive integrity signal that takes into account various other signals, including conditional and optional device integrity responses that you have opted into. If your app is published off-Play, this field should be set to `true` to allow instances of your app installed from off-Play sources to function. If set to `false`, only `PLAY_RECOGNIZED` verdicts are allowed, and both `UNRECOGNIZED_VERSION` and `UNEVALUATED` will be rejected. If set to `true`, any app recognition verdict is allowed. The default value is `false`. */
  allowUnrecognizedVersion?: boolean;
}

export const GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity: Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowUnrecognizedVersion: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity>;

export interface GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity {
  /** Specifies the minimum device integrity level in order for the device to be considered valid. Any device with a device recognition verdict lower than this level will be rejected. If this is unspecified, the default level is `NO_INTEGRITY`. */
  minDeviceRecognitionLevel?:
    | "DEVICE_RECOGNITION_LEVEL_UNSPECIFIED"
    | "NO_INTEGRITY"
    | "MEETS_BASIC_INTEGRITY"
    | "MEETS_DEVICE_INTEGRITY"
    | "MEETS_STRONG_INTEGRITY"
    | (string & {});
}

export const GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity: Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minDeviceRecognitionLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity>;

export interface GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails {
  /** Specifies whether the caller must have received the [`LICENSED` verdict](https://developer.android.com/google/play/integrity/verdicts#account-details-field). For additional details about scenarios where your users will receive this `LICENSED` label, see [the default responses table](https://developer.android.com/google/play/integrity/setup#default). If set to `true`, apps without the `LICENSED` app licensing verdict will be rejected. If set to `false`, any app licensing verdict is allowed. The default value is `false`. */
  requireLicensed?: boolean;
}

export const GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails: Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requireLicensed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails>;

export interface GoogleFirebaseAppcheckV1betaPlayIntegrityConfig {
  /** Required. The relative resource name of the Play Integrity configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` */
  name?: string;
  /** Specifies the duration for which App Check tokens exchanged from Play Integrity tokens will be valid. If unset, a default value of 1 hour is assumed. Must be between 30 minutes and 7 days, inclusive. */
  tokenTtl?: string;
  /** Specifies application integrity requirements for Android devices running your app. These settings correspond to requirements on the [**application integrity** field](https://developer.android.com/google/play/integrity/verdicts#application-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended. */
  appIntegrity?: GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity;
  /** Specifies device integrity requirements for Android devices running your app. These settings correspond to requirements on the [**device integrity** field](https://developer.android.com/google/play/integrity/verdicts#device-integrity-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. Warning: There are also [conditional](https://developer.android.com/google/play/integrity/setup#conditional) as well as [optional](https://developer.android.com/google/play/integrity/setup#optional_device_information) responses that you can receive, but requires additional explicit opt-in from you. The App Check API is **not** responsible for any such opt-ins. The default values for these settings work for most apps, and are recommended. */
  deviceIntegrity?: GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity;
  /** Specifies account requirements for Android devices running your app. These settings correspond to requirements on the [**account details** field](https://developer.android.com/google/play/integrity/verdicts#account-details-field) obtained from the Play Integrity API. See the [default responses table](https://developer.android.com/google/play/integrity/setup#default) for a quick summary. The default values for these settings work for most apps, and are recommended. */
  accountDetails?: GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails;
}

export const GoogleFirebaseAppcheckV1betaPlayIntegrityConfig: Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tokenTtl: Schema.optional(Schema.String),
      appIntegrity: Schema.optional(
        GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAppIntegrity,
      ),
      deviceIntegrity: Schema.optional(
        GoogleFirebaseAppcheckV1betaPlayIntegrityConfigDeviceIntegrity,
      ),
      accountDetails: Schema.optional(
        GoogleFirebaseAppcheckV1betaPlayIntegrityConfigAccountDetails,
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaPlayIntegrityConfig",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaPlayIntegrityConfig>;

export interface GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse {
  /** PlayIntegrityConfigs retrieved. */
  configs?: Array<GoogleFirebaseAppcheckV1betaPlayIntegrityConfig>;
}

export const GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      configs: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaPlayIntegrityConfig),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse>;

export interface GoogleFirebaseAppcheckV1betaDebugToken {
  /** Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name?: string;
  /** Required. A human readable display name used to identify this debug token. */
  displayName?: string;
  /** Required. Input only. Immutable. The secret token itself. Must be provided during creation, and must be a UUID4, case insensitive. This field is immutable once set, and cannot be provided during an UpdateDebugToken request. You can, however, delete this debug token using DeleteDebugToken to revoke it. For security reasons, this field will never be populated in any response. */
  token?: string;
  /** Output only. Timestamp when this debug token was most recently updated. */
  updateTime?: string;
}

export const GoogleFirebaseAppcheckV1betaDebugToken: Schema.Schema<GoogleFirebaseAppcheckV1betaDebugToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaDebugToken",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaDebugToken>;

export interface GoogleFirebaseAppcheckV1betaListDebugTokensResponse {
  /** The DebugTokens retrieved. */
  debugTokens?: Array<GoogleFirebaseAppcheckV1betaDebugToken>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty or omitted, then this response is the last page of results. This token can be used in a subsequent call to ListDebugTokens to find the next group of DebugTokens. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppcheckV1betaListDebugTokensResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaListDebugTokensResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      debugTokens: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaDebugToken),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaListDebugTokensResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaListDebugTokensResponse>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleFirebaseAppcheckV1betaService {
  /** Required. The relative resource name of the service configuration object, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `identitytoolkit.googleapis.com` (Firebase Authentication with Identity Platform) * `oauth2.googleapis.com` (Google Identity for iOS) */
  name?: string;
  /** Required. The App Check enforcement mode for this service. */
  enforcementMode?: "OFF" | "UNENFORCED" | "ENFORCED" | (string & {});
  /** Output only. Timestamp when this service configuration object was most recently updated. */
  updateTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. This etag is strongly validated as defined by RFC 7232. */
  etag?: string;
}

export const GoogleFirebaseAppcheckV1betaService: Schema.Schema<GoogleFirebaseAppcheckV1betaService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      enforcementMode: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaService",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaService>;

export interface GoogleFirebaseAppcheckV1betaListServicesResponse {
  /** The Services retrieved. */
  services?: Array<GoogleFirebaseAppcheckV1betaService>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty or omitted, then this response is the last page of results. This token can be used in a subsequent call to ListServices to find the next group of Services. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppcheckV1betaListServicesResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaListServicesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      services: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaService),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaListServicesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaListServicesResponse>;

export interface GoogleFirebaseAppcheckV1betaUpdateServiceRequest {
  /** Required. The Service to update. The Service's `name` field is used to identify the Service to be updated, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `identitytoolkit.googleapis.com` (Firebase Authentication with Identity Platform) * `oauth2.googleapis.com` (Google Identity for iOS) For Firebase Authentication to work with App Check, you must first upgrade to [Firebase Authentication with Identity Platform](https://firebase.google.com/docs/auth#identity-platform). */
  service?: GoogleFirebaseAppcheckV1betaService;
  /** Required. A comma-separated list of names of fields in the Service to update. Example: `enforcement_mode`. */
  updateMask?: string;
}

export const GoogleFirebaseAppcheckV1betaUpdateServiceRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaUpdateServiceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(GoogleFirebaseAppcheckV1betaService),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaUpdateServiceRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaUpdateServiceRequest>;

export interface GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest {
  /** Optional. A comma-separated list of names of fields in the Services to update. Example: `display_name`. If the `update_mask` field is set in both this request and any of the UpdateServiceRequest messages, they must match or the entire batch fails and no updates will be committed. */
  updateMask?: string;
  /** Required. The request messages specifying the Services to update. A maximum of 100 objects can be updated in a batch. */
  requests?: Array<GoogleFirebaseAppcheckV1betaUpdateServiceRequest>;
}

export const GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateMask: Schema.optional(Schema.String),
      requests: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaUpdateServiceRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest>;

export interface GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse {
  /** Service objects after the updates have been applied. */
  services?: Array<GoogleFirebaseAppcheckV1betaService>;
}

export const GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      services: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaService),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse>;

export interface GoogleFirebaseAppcheckV1betaResourcePolicy {
  /** Required. Identifier. The relative name of the resource policy object, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) `resource_policy_id` is a system-generated UID. */
  name?: string;
  /** Required. Service specific name of the resource object to which this policy applies, in the format: * **iOS OAuth clients** (Google Identity for iOS): `//oauth2.googleapis.com/projects/{project_number}/oauthClients/{oauth_client_id}` Note that the resource must belong to the service specified in the `name` and be from the same project as this policy, but the resource is allowed to be missing at the time of creation of this policy; in that case, we make a best-effort attempt at respecting this policy, but it may not have any effect until the resource is fully created. */
  targetResource?: string;
  /** Required. The App Check enforcement mode for this resource. This will override the EnforcementMode setting on the parent service. */
  enforcementMode?: "OFF" | "UNENFORCED" | "ENFORCED" | (string & {});
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. This etag is strongly validated as defined by RFC 7232. */
  etag?: string;
  /** Output only. Timestamp when this resource policy configuration object was most recently updated. */
  updateTime?: string;
}

export const GoogleFirebaseAppcheckV1betaResourcePolicy: Schema.Schema<GoogleFirebaseAppcheckV1betaResourcePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      targetResource: Schema.optional(Schema.String),
      enforcementMode: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaResourcePolicy",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaResourcePolicy>;

export interface GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse {
  /** The ResourcePolicy objects retrieved. */
  resourcePolicies?: Array<GoogleFirebaseAppcheckV1betaResourcePolicy>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty or omitted, then this response is the last page of results. This token can be used in a subsequent call to ListResourcePolicies to find the next group of ResourcePolicy objects. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourcePolicies: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaResourcePolicy),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse>;

export interface GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest {
  /** Required. The ResourcePolicy to update. The ResourcePolicy's `name` field is used to identify the ResourcePolicy to be updated, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  resourcePolicy?: GoogleFirebaseAppcheckV1betaResourcePolicy;
  /** Required. A comma-separated list of names of fields in the ResourcePolicy to update. Example: `enforcement_mode`. */
  updateMask?: string;
}

export const GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourcePolicy: Schema.optional(
        GoogleFirebaseAppcheckV1betaResourcePolicy,
      ),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest>;

export interface GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest {
  /** Optional. A comma-separated list of names of fields in the ResourcePolicy objects to update. Example: `enforcement_mode`. If this field is present, the `update_mask` field in the UpdateResourcePolicyRequest messages must all match this field, or the entire batch fails and no updates will be committed. */
  updateMask?: string;
  /** Required. The request messages specifying the ResourcePolicy objects to update. A maximum of 100 objects can be updated in a batch. */
  requests?: Array<GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest>;
}

export const GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateMask: Schema.optional(Schema.String),
      requests: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaUpdateResourcePolicyRequest),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest>;

export interface GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse {
  /** ResourcePolicy objects after the updates have been applied. */
  resourcePolicies?: Array<GoogleFirebaseAppcheckV1betaResourcePolicy>;
}

export const GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourcePolicies: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaResourcePolicy),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse>;

export interface GoogleFirebaseAppcheckV1betaPublicJwk {
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

export const GoogleFirebaseAppcheckV1betaPublicJwk: Schema.Schema<GoogleFirebaseAppcheckV1betaPublicJwk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kty: Schema.optional(Schema.String),
      use: Schema.optional(Schema.String),
      alg: Schema.optional(Schema.String),
      kid: Schema.optional(Schema.String),
      n: Schema.optional(Schema.String),
      e: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaPublicJwk",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaPublicJwk>;

export interface GoogleFirebaseAppcheckV1betaPublicJwkSet {
  /** The set of public keys. See [section 5.1 of RFC 7517](https://tools.ietf.org/html/rfc7517#section-5). */
  keys?: Array<GoogleFirebaseAppcheckV1betaPublicJwk>;
}

export const GoogleFirebaseAppcheckV1betaPublicJwkSet: Schema.Schema<GoogleFirebaseAppcheckV1betaPublicJwkSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      keys: Schema.optional(
        Schema.Array(GoogleFirebaseAppcheckV1betaPublicJwk),
      ),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaPublicJwkSet",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaPublicJwkSet>;

export interface GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest {
  /** Required. The [SafetyNet attestation response](https://developer.android.com/training/safetynet/attestation#request-attestation-step) issued to your app. */
  safetyNetToken?: string;
}

export const GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      safetyNetToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaAppCheckToken {
  /** The App Check token. App Check tokens are signed [JWTs](https://tools.ietf.org/html/rfc7519) containing claims that identify the attested app and GCP project. This token is used to access Google services protected by App Check. These tokens can also be [verified by your own custom backends](https://firebase.google.com/docs/app-check/custom-resource-backend) using the Firebase Admin SDK or third-party libraries. */
  attestationToken?: string;
  /** The App Check token. App Check tokens are signed [JWTs](https://tools.ietf.org/html/rfc7519) containing claims that identify the attested app and GCP project. This token is used to access Google services protected by App Check. These tokens can also be [verified by your own custom backends](https://firebase.google.com/docs/app-check/custom-resource-backend) using the Firebase Admin SDK or third-party libraries. */
  token?: string;
  /** The duration from the time this token is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1betaAppCheckToken: Schema.Schema<GoogleFirebaseAppcheckV1betaAppCheckToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attestationToken: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaAppCheckToken",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaAppCheckToken>;

export interface GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest {}

export const GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest>;

export interface GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse {
  /** A one-time use [challenge](https://developer.android.com/google/play/integrity/verdict#protect-against-replay-attacks) for the client to pass to the Play Integrity API. */
  challenge?: string;
  /** The duration from the time this challenge is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      challenge: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse>;

export interface GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest {
  /** Required. The [integrity verdict response token from Play Integrity](https://developer.android.com/google/play/integrity/verdict#decrypt-verify) issued to your app. */
  playIntegrityToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playIntegrityToken: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest {
  /** Required. The `device_token` as returned by Apple's client-side [DeviceCheck API](https://developer.apple.com/documentation/devicecheck/dcdevice). This is the base64 encoded `Data` (Swift) or `NSData` (ObjC) object. */
  deviceToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deviceToken: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest {
  /** Required. The reCAPTCHA token as returned by the [reCAPTCHA v3 JavaScript API](https://developers.google.com/recaptcha/docs/v3). */
  recaptchaToken?: string;
}

export const GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recaptchaToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest {
  /** Required. The reCAPTCHA token as returned by the [reCAPTCHA v3 JavaScript API](https://developers.google.com/recaptcha/docs/v3). */
  recaptchaV3Token?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recaptchaV3Token: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest>;

export interface GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest {
  /** Required. The reCAPTCHA token as returned by the [reCAPTCHA Enterprise JavaScript API](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages). */
  recaptchaEnterpriseToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recaptchaEnterpriseToken: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest {
  /** Required. A custom token signed using your project's Admin SDK service account credentials. */
  customToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
  /** Optional. When `limited_use` is set to `true`, this field specifies the desired `jti` claim (Section 4.1.7 of RFC 7519) in the returned App Check token. *Limited use* App Check tokens with the same `jti` will be counted as the same token for the purposes of replay protection. An error is returned if this field is specified without setting `limited_use` to `true`. The size of this field is limited to 500 bytes. If specified, its length must be at least 16 bytes. If this field is omitted or is empty and `limited_use` is set to `true`, a randomly generated `jti` claim with length between 16 and 500 bytes (inclusive) will be used in the returned App Check token. Leaving this field empty is only recommended if your custom attestation provider itself is not vulnerable to replay attacks. When `limited_use` is set to `false`, neither the presence nor the contents of the `jti` claim in the returned App Check token is specified. To ensure that the returned App Check token is eligible for limited use functionality, set `limited_use` to `true`. */
  jti?: string;
}

export const GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customToken: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
      jti: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest {
  /** Required. A debug token secret. This string must match a debug token secret previously created using CreateDebugToken. */
  debugToken?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      debugToken: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest {}

export const GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest>;

export interface GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse {
  /** A one-time use challenge for the client to pass to the App Attest API. */
  challenge?: string;
  /** The duration from the time this challenge is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      challenge: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse>;

export interface GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest {
  /** Required. The App Attest statement returned by the client-side App Attest API. This is a base64url encoded CBOR object in the JSON response. */
  attestationStatement?: string;
  /** Required. A one-time challenge returned by an immediately prior call to GenerateAppAttestChallenge. */
  challenge?: string;
  /** Required. The key ID generated by App Attest for the client app. */
  keyId?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attestationStatement: Schema.optional(Schema.String),
      challenge: Schema.optional(Schema.String),
      keyId: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest>;

export interface GoogleFirebaseAppcheckV1betaAttestationTokenResponse {
  /** An App Check token. App Check tokens are signed [JWTs](https://tools.ietf.org/html/rfc7519) containing claims that identify the attested app and Firebase project. This token is used to access Firebase services protected by App Check. */
  attestationToken?: string;
  /** The duration from the time this token is minted until its expiration. This field is intended to ease client-side token management, since the client may have clock skew, but is still able to accurately measure a duration. */
  ttl?: string;
}

export const GoogleFirebaseAppcheckV1betaAttestationTokenResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaAttestationTokenResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attestationToken: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaAttestationTokenResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaAttestationTokenResponse>;

export interface GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse {
  /** An artifact that can be used in future calls to ExchangeAppAttestAssertion. */
  artifact?: string;
  /** Encapsulates an App Check token. */
  attestationToken?: GoogleFirebaseAppcheckV1betaAttestationTokenResponse;
  /** Encapsulates an App Check token. */
  appCheckToken?: GoogleFirebaseAppcheckV1betaAppCheckToken;
}

export const GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      artifact: Schema.optional(Schema.String),
      attestationToken: Schema.optional(
        GoogleFirebaseAppcheckV1betaAttestationTokenResponse,
      ),
      appCheckToken: Schema.optional(GoogleFirebaseAppcheckV1betaAppCheckToken),
    }),
  ).annotate({
    identifier:
      "GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse>;

export interface GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest {
  /** Required. The artifact returned by a previous call to ExchangeAppAttestAttestation. */
  artifact?: string;
  /** Required. The CBOR-encoded assertion returned by the client-side App Attest API. */
  assertion?: string;
  /** Required. A one-time challenge returned by an immediately prior call to GenerateAppAttestChallenge. */
  challenge?: string;
  /** Specifies whether this attestation is for use in a *limited use* (`true`) or *session based* (`false`) context. To enable this attestation to be used with the *replay protection* feature, set this to `true`. The default value is `false`. */
  limitedUse?: boolean;
}

export const GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      artifact: Schema.optional(Schema.String),
      assertion: Schema.optional(Schema.String),
      challenge: Schema.optional(Schema.String),
      limitedUse: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest>;

export interface GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest {
  /** Required. The App Check token to verify. App Check tokens exchanged from the SafetyNet provider are not supported; an HTTP 400 error will be returned. */
  appCheckToken?: string;
}

export const GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest: Schema.Schema<GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appCheckToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest>;

export interface GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse {
  /** Whether this token was already consumed. If this is the first time this method has seen the given App Check token, this field will be omitted from the response. The given token will then be marked as `already_consumed` (set to `true`) for all future invocations of this method for that token. Note that if the given App Check token is invalid, an HTTP 403 error is returned instead of a response containing this field, regardless whether the token was already consumed. */
  alreadyConsumed?: boolean;
}

export const GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse: Schema.Schema<GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      alreadyConsumed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse",
  }) as any as Schema.Schema<GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetJwksRequest {
  /** Required. The relative resource name to the public JWK set. Must always be exactly the string `jwks`. */
  name: string;
}

export const GetJwksRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/jwks" }),
  svc,
) as unknown as Schema.Schema<GetJwksRequest>;

export type GetJwksResponse = GoogleFirebaseAppcheckV1betaPublicJwkSet;
export const GetJwksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaPublicJwkSet;

export type GetJwksError = DefaultErrors;

/** Returns a public JWK set as specified by [RFC 7517](https://tools.ietf.org/html/rfc7517) that can be used to verify App Check tokens. Exactly one of the public keys in the returned set will successfully validate any App Check token that is currently valid. */
export const getJwks: API.OperationMethod<
  GetJwksRequest,
  GetJwksResponse,
  GetJwksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetJwksRequest,
  output: GetJwksResponse,
  errors: [],
}));

export interface ExchangeDebugTokenOauthClientsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest;
}

export const ExchangeDebugTokenOauthClientsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/oauthClients/{oauthClientsId}:exchangeDebugToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeDebugTokenOauthClientsRequest>;

export type ExchangeDebugTokenOauthClientsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeDebugTokenOauthClientsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeDebugTokenOauthClientsError = DefaultErrors;

/** Validates a debug token secret that you have previously created using CreateDebugToken. If valid, returns an AppCheckToken. Note that a restrictive quota is enforced on this method to prevent accidental exposure of the app to abuse. */
export const exchangeDebugTokenOauthClients: API.OperationMethod<
  ExchangeDebugTokenOauthClientsRequest,
  ExchangeDebugTokenOauthClientsResponse,
  ExchangeDebugTokenOauthClientsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeDebugTokenOauthClientsRequest,
  output: ExchangeDebugTokenOauthClientsResponse,
  errors: [],
}));

export interface GenerateAppAttestChallengeOauthClientsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest;
}

export const GenerateAppAttestChallengeOauthClientsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/oauthClients/{oauthClientsId}:generateAppAttestChallenge",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateAppAttestChallengeOauthClientsRequest>;

export type GenerateAppAttestChallengeOauthClientsResponse =
  GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse;
export const GenerateAppAttestChallengeOauthClientsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse;

export type GenerateAppAttestChallengeOauthClientsError = DefaultErrors;

/** Generates a challenge that protects the integrity of an immediately following call to ExchangeAppAttestAttestation or ExchangeAppAttestAssertion. A challenge should not be reused for multiple calls. */
export const generateAppAttestChallengeOauthClients: API.OperationMethod<
  GenerateAppAttestChallengeOauthClientsRequest,
  GenerateAppAttestChallengeOauthClientsResponse,
  GenerateAppAttestChallengeOauthClientsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateAppAttestChallengeOauthClientsRequest,
  output: GenerateAppAttestChallengeOauthClientsResponse,
  errors: [],
}));

export interface ExchangeAppAttestAttestationOauthClientsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest;
}

export const ExchangeAppAttestAttestationOauthClientsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/oauthClients/{oauthClientsId}:exchangeAppAttestAttestation",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeAppAttestAttestationOauthClientsRequest>;

export type ExchangeAppAttestAttestationOauthClientsResponse =
  GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse;
export const ExchangeAppAttestAttestationOauthClientsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse;

export type ExchangeAppAttestAttestationOauthClientsError = DefaultErrors;

/** Accepts an App Attest CBOR attestation and verifies it with Apple using your preconfigured team and bundle IDs. If valid, returns an attestation artifact that can later be exchanged for an AppCheckToken using ExchangeAppAttestAssertion. For convenience and performance, this method's response object will also contain an AppCheckToken (if the verification is successful). */
export const exchangeAppAttestAttestationOauthClients: API.OperationMethod<
  ExchangeAppAttestAttestationOauthClientsRequest,
  ExchangeAppAttestAttestationOauthClientsResponse,
  ExchangeAppAttestAttestationOauthClientsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeAppAttestAttestationOauthClientsRequest,
  output: ExchangeAppAttestAttestationOauthClientsResponse,
  errors: [],
}));

export interface ExchangeAppAttestAssertionOauthClientsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest;
}

export const ExchangeAppAttestAssertionOauthClientsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/oauthClients/{oauthClientsId}:exchangeAppAttestAssertion",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeAppAttestAssertionOauthClientsRequest>;

export type ExchangeAppAttestAssertionOauthClientsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeAppAttestAssertionOauthClientsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeAppAttestAssertionOauthClientsError = DefaultErrors;

/** Accepts an App Attest assertion and an artifact previously obtained from ExchangeAppAttestAttestation and verifies those with Apple. If valid, returns an AppCheckToken. */
export const exchangeAppAttestAssertionOauthClients: API.OperationMethod<
  ExchangeAppAttestAssertionOauthClientsRequest,
  ExchangeAppAttestAssertionOauthClientsResponse,
  ExchangeAppAttestAssertionOauthClientsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeAppAttestAssertionOauthClientsRequest,
  output: ExchangeAppAttestAssertionOauthClientsResponse,
  errors: [],
}));

export interface VerifyAppCheckTokenProjectsRequest {
  /** Required. The relative resource name of the project for which the token was minted, in the format: ``` projects/{project_number} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  project: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest;
}

export const VerifyAppCheckTokenProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project: Schema.String.pipe(T.HttpPath("project")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}:verifyAppCheckToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<VerifyAppCheckTokenProjectsRequest>;

export type VerifyAppCheckTokenProjectsResponse =
  GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse;
export const VerifyAppCheckTokenProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaVerifyAppCheckTokenResponse;

export type VerifyAppCheckTokenProjectsError = DefaultErrors;

/** Verifies the given App Check token and returns token usage signals that callers may act upon. This method currently only supports App Check tokens exchanged from the following attestation providers: * Play Integrity API * App Attest * DeviceCheck (`DCDevice` tokens) * reCAPTCHA Enterprise * reCAPTCHA v3 * Custom providers App Check tokens exchanged from debug secrets are also supported. Calling this method on an otherwise valid App Check token with an unsupported provider will cause an HTTP 400 error to be returned. Returns whether this token was already consumed before this call. If this is the first time this method has seen the given App Check token, the field `already_consumed` in the response will be absent. The given token will then be marked as `already_consumed` (set to `true`) for all future invocations of this method for that token. Note that if the given App Check token is invalid, an HTTP 403 error is returned instead of a response object, regardless whether the token was already consumed. Currently, when evaluating whether an App Check token was already consumed, only calls to this exact method are counted. Use of the App Check token elsewhere will not mark the token as being already consumed. The caller must have the [`firebaseappcheck.appCheckTokens.verify`](https://firebase.google.com/docs/projects/iam/permissions#app-check) permission to call this method. This permission is part of the [Firebase App Check Token Verifier role](https://firebase.google.com/docs/projects/iam/roles-predefined-product#app-check). */
export const verifyAppCheckTokenProjects: API.OperationMethod<
  VerifyAppCheckTokenProjectsRequest,
  VerifyAppCheckTokenProjectsResponse,
  VerifyAppCheckTokenProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VerifyAppCheckTokenProjectsRequest,
  output: VerifyAppCheckTokenProjectsResponse,
  errors: [],
}));

export interface GetProjectsServicesRequest {
  /** Required. The relative resource name of the Service to retrieve, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `identitytoolkit.googleapis.com` (Firebase Authentication with Identity Platform) * `oauth2.googleapis.com` (Google Identity for iOS) */
  name: string;
}

export const GetProjectsServicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/services/{servicesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsServicesRequest>;

export type GetProjectsServicesResponse = GoogleFirebaseAppcheckV1betaService;
export const GetProjectsServicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaService;

export type GetProjectsServicesError = DefaultErrors;

/** Gets the Service configuration for the specified service name. */
export const getProjectsServices: API.OperationMethod<
  GetProjectsServicesRequest,
  GetProjectsServicesResponse,
  GetProjectsServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsServicesRequest,
  output: GetProjectsServicesResponse,
  errors: [],
}));

export interface ListProjectsServicesRequest {
  /** Required. The relative resource name of the parent project for which to list each associated Service, in the format: ``` projects/{project_number} ``` */
  parent: string;
  /** The maximum number of Services to return in the response. Only explicitly configured services are returned. The server may return fewer than this at its own discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. */
  pageSize?: number;
  /** Token returned from a previous call to ListServices indicating where in the set of Services to resume listing. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListServices must match the call that provided the page token; if they do not match, the result is undefined. */
  pageToken?: string;
}

export const ListProjectsServicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/services" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsServicesRequest>;

export type ListProjectsServicesResponse =
  GoogleFirebaseAppcheckV1betaListServicesResponse;
export const ListProjectsServicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaListServicesResponse;

export type ListProjectsServicesError = DefaultErrors;

/** Lists all Service configurations for the specified project. Only Services which were explicitly configured using UpdateService or BatchUpdateServices will be returned. */
export const listProjectsServices: API.PaginatedOperationMethod<
  ListProjectsServicesRequest,
  ListProjectsServicesResponse,
  ListProjectsServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsServicesRequest,
  output: ListProjectsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsServicesRequest {
  /** Required. The relative resource name of the service configuration object, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore) * `identitytoolkit.googleapis.com` (Firebase Authentication with Identity Platform) * `oauth2.googleapis.com` (Google Identity for iOS) */
  name: string;
  /** Required. A comma-separated list of names of fields in the Service to update. Example: `enforcement_mode`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaService;
}

export const PatchProjectsServicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaService).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/services/{servicesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsServicesRequest>;

export type PatchProjectsServicesResponse = GoogleFirebaseAppcheckV1betaService;
export const PatchProjectsServicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaService;

export type PatchProjectsServicesError = DefaultErrors;

/** Updates the specified Service configuration. */
export const patchProjectsServices: API.OperationMethod<
  PatchProjectsServicesRequest,
  PatchProjectsServicesResponse,
  PatchProjectsServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsServicesRequest,
  output: PatchProjectsServicesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsServicesRequest {
  /** Required. The parent project name shared by all Service configurations being updated, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being updated must match this field, or the entire batch fails. */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest;
}

export const BatchUpdateProjectsServicesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaBatchUpdateServicesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/services:batchUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchUpdateProjectsServicesRequest>;

export type BatchUpdateProjectsServicesResponse =
  GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse;
export const BatchUpdateProjectsServicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchUpdateServicesResponse;

export type BatchUpdateProjectsServicesError = DefaultErrors;

/** Atomically updates the specified Service configurations. */
export const batchUpdateProjectsServices: API.OperationMethod<
  BatchUpdateProjectsServicesRequest,
  BatchUpdateProjectsServicesResponse,
  BatchUpdateProjectsServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateProjectsServicesRequest,
  output: BatchUpdateProjectsServicesResponse,
  errors: [],
}));

export interface GetProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the ResourcePolicy to retrieve, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  name: string;
}

export const GetProjectsServicesResourcePoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/services/{servicesId}/resourcePolicies/{resourcePoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsServicesResourcePoliciesRequest>;

export type GetProjectsServicesResourcePoliciesResponse =
  GoogleFirebaseAppcheckV1betaResourcePolicy;
export const GetProjectsServicesResourcePoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaResourcePolicy;

export type GetProjectsServicesResourcePoliciesError = DefaultErrors;

/** Gets the requested ResourcePolicy configuration. */
export const getProjectsServicesResourcePolicies: API.OperationMethod<
  GetProjectsServicesResourcePoliciesRequest,
  GetProjectsServicesResourcePoliciesResponse,
  GetProjectsServicesResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsServicesResourcePoliciesRequest,
  output: GetProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

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

export const ListProjectsServicesResourcePoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/services/{servicesId}/resourcePolicies",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsServicesResourcePoliciesRequest>;

export type ListProjectsServicesResourcePoliciesResponse =
  GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse;
export const ListProjectsServicesResourcePoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaListResourcePoliciesResponse;

export type ListProjectsServicesResourcePoliciesError = DefaultErrors;

/** Lists all ResourcePolicy configurations for the specified project and service. */
export const listProjectsServicesResourcePolicies: API.PaginatedOperationMethod<
  ListProjectsServicesResourcePoliciesRequest,
  ListProjectsServicesResourcePoliciesResponse,
  ListProjectsServicesResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsServicesResourcePoliciesRequest,
  output: ListProjectsServicesResourcePoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the parent Service in which the specified ResourcePolicy will be created, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaResourcePolicy;
}

export const CreateProjectsServicesResourcePoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaResourcePolicy).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/services/{servicesId}/resourcePolicies",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsServicesResourcePoliciesRequest>;

export type CreateProjectsServicesResourcePoliciesResponse =
  GoogleFirebaseAppcheckV1betaResourcePolicy;
export const CreateProjectsServicesResourcePoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaResourcePolicy;

export type CreateProjectsServicesResourcePoliciesError = DefaultErrors;

/** Creates the specified ResourcePolicy configuration. */
export const createProjectsServicesResourcePolicies: API.OperationMethod<
  CreateProjectsServicesResourcePoliciesRequest,
  CreateProjectsServicesResourcePoliciesResponse,
  CreateProjectsServicesResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsServicesResourcePoliciesRequest,
  output: CreateProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

export interface PatchProjectsServicesResourcePoliciesRequest {
  /** Required. Identifier. The relative name of the resource policy object, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `oauth2.googleapis.com` (Google Identity for iOS) `resource_policy_id` is a system-generated UID. */
  name: string;
  /** Required. A comma-separated list of names of fields in the ResourcePolicy to update. Example: `enforcement_mode`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaResourcePolicy;
}

export const PatchProjectsServicesResourcePoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaResourcePolicy).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/services/{servicesId}/resourcePolicies/{resourcePoliciesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsServicesResourcePoliciesRequest>;

export type PatchProjectsServicesResourcePoliciesResponse =
  GoogleFirebaseAppcheckV1betaResourcePolicy;
export const PatchProjectsServicesResourcePoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaResourcePolicy;

export type PatchProjectsServicesResourcePoliciesError = DefaultErrors;

/** Updates the specified ResourcePolicy configuration. */
export const patchProjectsServicesResourcePolicies: API.OperationMethod<
  PatchProjectsServicesResourcePoliciesRequest,
  PatchProjectsServicesResourcePoliciesResponse,
  PatchProjectsServicesResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsServicesResourcePoliciesRequest,
  output: PatchProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

export interface DeleteProjectsServicesResourcePoliciesRequest {
  /** Required. The relative resource name of the ResourcePolicy to delete, in the format: ``` projects/{project_number}/services/{service_id}/resourcePolicies/{resource_policy_id} ``` */
  name: string;
  /** The checksum to be validated against the current ResourcePolicy, to ensure the client has an up-to-date value before proceeding. This checksum is computed by the server based on the values of fields in the ResourcePolicy object, and can be obtained from the ResourcePolicy object received from the last CreateResourcePolicy, GetResourcePolicy, ListResourcePolicies, UpdateResourcePolicy, or BatchUpdateResourcePolicies call. This etag is strongly validated as defined by RFC 7232. */
  etag?: string;
}

export const DeleteProjectsServicesResourcePoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/services/{servicesId}/resourcePolicies/{resourcePoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsServicesResourcePoliciesRequest>;

export type DeleteProjectsServicesResourcePoliciesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsServicesResourcePoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsServicesResourcePoliciesError = DefaultErrors;

/** Deletes the specified ResourcePolicy configuration. */
export const deleteProjectsServicesResourcePolicies: API.OperationMethod<
  DeleteProjectsServicesResourcePoliciesRequest,
  DeleteProjectsServicesResourcePoliciesResponse,
  DeleteProjectsServicesResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsServicesResourcePoliciesRequest,
  output: DeleteProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsServicesResourcePoliciesRequest {
  /** Required. The parent service name, in the format ``` projects/{project_number}/services/{service_id} ``` The parent collection in the `name` field of any resource being updated must match this field, or the entire batch fails. */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest;
}

export const BatchUpdateProjectsServicesResourcePoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/services/{servicesId}/resourcePolicies:batchUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchUpdateProjectsServicesResourcePoliciesRequest>;

export type BatchUpdateProjectsServicesResourcePoliciesResponse =
  GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse;
export const BatchUpdateProjectsServicesResourcePoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchUpdateResourcePoliciesResponse;

export type BatchUpdateProjectsServicesResourcePoliciesError = DefaultErrors;

/** Atomically updates the specified ResourcePolicy configurations. */
export const batchUpdateProjectsServicesResourcePolicies: API.OperationMethod<
  BatchUpdateProjectsServicesResourcePoliciesRequest,
  BatchUpdateProjectsServicesResourcePoliciesResponse,
  BatchUpdateProjectsServicesResourcePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateProjectsServicesResourcePoliciesRequest,
  output: BatchUpdateProjectsServicesResourcePoliciesResponse,
  errors: [],
}));

export interface ExchangeSafetyNetTokenProjectsAppsRequest {
  /** Required. The relative resource name of the Android app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest;
}

export const ExchangeSafetyNetTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeSafetyNetTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeSafetyNetToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeSafetyNetTokenProjectsAppsRequest>;

export type ExchangeSafetyNetTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeSafetyNetTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeSafetyNetTokenProjectsAppsError = DefaultErrors;

/** Validates a [SafetyNet token](https://developer.android.com/training/safetynet/attestation#request-attestation-step). If valid, returns an AppCheckToken. */
export const exchangeSafetyNetTokenProjectsApps: API.OperationMethod<
  ExchangeSafetyNetTokenProjectsAppsRequest,
  ExchangeSafetyNetTokenProjectsAppsResponse,
  ExchangeSafetyNetTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeSafetyNetTokenProjectsAppsRequest,
  output: ExchangeSafetyNetTokenProjectsAppsResponse,
  errors: [],
}));

export interface GeneratePlayIntegrityChallengeProjectsAppsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest;
}

export const GeneratePlayIntegrityChallengeProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:generatePlayIntegrityChallenge",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GeneratePlayIntegrityChallengeProjectsAppsRequest>;

export type GeneratePlayIntegrityChallengeProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse;
export const GeneratePlayIntegrityChallengeProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaGeneratePlayIntegrityChallengeResponse;

export type GeneratePlayIntegrityChallengeProjectsAppsError = DefaultErrors;

/** Generates a challenge that protects the integrity of an immediately following integrity verdict request to the Play Integrity API. The next call to ExchangePlayIntegrityToken using the resulting integrity token will verify the presence and validity of the challenge. A challenge should not be reused for multiple calls. */
export const generatePlayIntegrityChallengeProjectsApps: API.OperationMethod<
  GeneratePlayIntegrityChallengeProjectsAppsRequest,
  GeneratePlayIntegrityChallengeProjectsAppsResponse,
  GeneratePlayIntegrityChallengeProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GeneratePlayIntegrityChallengeProjectsAppsRequest,
  output: GeneratePlayIntegrityChallengeProjectsAppsResponse,
  errors: [],
}));

export interface ExchangePlayIntegrityTokenProjectsAppsRequest {
  /** Required. The relative resource name of the Android app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest;
}

export const ExchangePlayIntegrityTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangePlayIntegrityTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangePlayIntegrityToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangePlayIntegrityTokenProjectsAppsRequest>;

export type ExchangePlayIntegrityTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangePlayIntegrityTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangePlayIntegrityTokenProjectsAppsError = DefaultErrors;

/** Validates an [integrity verdict response token from Play Integrity](https://developer.android.com/google/play/integrity/verdict#decrypt-verify). If valid, returns an AppCheckToken. */
export const exchangePlayIntegrityTokenProjectsApps: API.OperationMethod<
  ExchangePlayIntegrityTokenProjectsAppsRequest,
  ExchangePlayIntegrityTokenProjectsAppsResponse,
  ExchangePlayIntegrityTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangePlayIntegrityTokenProjectsAppsRequest,
  output: ExchangePlayIntegrityTokenProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeDeviceCheckTokenProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest;
}

export const ExchangeDeviceCheckTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeDeviceCheckTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeDeviceCheckToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeDeviceCheckTokenProjectsAppsRequest>;

export type ExchangeDeviceCheckTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeDeviceCheckTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeDeviceCheckTokenProjectsAppsError = DefaultErrors;

/** Accepts a [`device_token`](https://developer.apple.com/documentation/devicecheck/dcdevice) issued by DeviceCheck, and attempts to validate it with Apple. If valid, returns an AppCheckToken. */
export const exchangeDeviceCheckTokenProjectsApps: API.OperationMethod<
  ExchangeDeviceCheckTokenProjectsAppsRequest,
  ExchangeDeviceCheckTokenProjectsAppsResponse,
  ExchangeDeviceCheckTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeDeviceCheckTokenProjectsAppsRequest,
  output: ExchangeDeviceCheckTokenProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeRecaptchaTokenProjectsAppsRequest {
  /** Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest;
}

export const ExchangeRecaptchaTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeRecaptchaTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeRecaptchaToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeRecaptchaTokenProjectsAppsRequest>;

export type ExchangeRecaptchaTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeRecaptchaTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeRecaptchaTokenProjectsAppsError = DefaultErrors;

/** Validates a [reCAPTCHA v3 response token](https://developers.google.com/recaptcha/docs/v3). If valid, returns an AppCheckToken. */
export const exchangeRecaptchaTokenProjectsApps: API.OperationMethod<
  ExchangeRecaptchaTokenProjectsAppsRequest,
  ExchangeRecaptchaTokenProjectsAppsResponse,
  ExchangeRecaptchaTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeRecaptchaTokenProjectsAppsRequest,
  output: ExchangeRecaptchaTokenProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeRecaptchaV3TokenProjectsAppsRequest {
  /** Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest;
}

export const ExchangeRecaptchaV3TokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeRecaptchaV3TokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeRecaptchaV3Token",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeRecaptchaV3TokenProjectsAppsRequest>;

export type ExchangeRecaptchaV3TokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeRecaptchaV3TokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeRecaptchaV3TokenProjectsAppsError = DefaultErrors;

/** Validates a [reCAPTCHA v3 response token](https://developers.google.com/recaptcha/docs/v3). If valid, returns an AppCheckToken. */
export const exchangeRecaptchaV3TokenProjectsApps: API.OperationMethod<
  ExchangeRecaptchaV3TokenProjectsAppsRequest,
  ExchangeRecaptchaV3TokenProjectsAppsResponse,
  ExchangeRecaptchaV3TokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeRecaptchaV3TokenProjectsAppsRequest,
  output: ExchangeRecaptchaV3TokenProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest {
  /** Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest;
}

export const ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeRecaptchaEnterpriseTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeRecaptchaEnterpriseToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest>;

export type ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeRecaptchaEnterpriseTokenProjectsAppsError = DefaultErrors;

/** Validates a [reCAPTCHA Enterprise response token](https://cloud.google.com/recaptcha-enterprise/docs/create-assessment#retrieve_token). If valid, returns an App Check token AppCheckToken. */
export const exchangeRecaptchaEnterpriseTokenProjectsApps: API.OperationMethod<
  ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest,
  ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse,
  ExchangeRecaptchaEnterpriseTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeRecaptchaEnterpriseTokenProjectsAppsRequest,
  output: ExchangeRecaptchaEnterpriseTokenProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeCustomTokenProjectsAppsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest;
}

export const ExchangeCustomTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeCustomTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeCustomToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeCustomTokenProjectsAppsRequest>;

export type ExchangeCustomTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeCustomTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeCustomTokenProjectsAppsError = DefaultErrors;

/** Validates a custom token signed using your project's Admin SDK service account credentials. If valid, returns an AppCheckToken. */
export const exchangeCustomTokenProjectsApps: API.OperationMethod<
  ExchangeCustomTokenProjectsAppsRequest,
  ExchangeCustomTokenProjectsAppsResponse,
  ExchangeCustomTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeCustomTokenProjectsAppsRequest,
  output: ExchangeCustomTokenProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeDebugTokenProjectsAppsRequest {
  /** Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest;
}

export const ExchangeDebugTokenProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeDebugTokenRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeDebugToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeDebugTokenProjectsAppsRequest>;

export type ExchangeDebugTokenProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeDebugTokenProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeDebugTokenProjectsAppsError = DefaultErrors;

/** Validates a debug token secret that you have previously created using CreateDebugToken. If valid, returns an AppCheckToken. Note that a restrictive quota is enforced on this method to prevent accidental exposure of the app to abuse. */
export const exchangeDebugTokenProjectsApps: API.OperationMethod<
  ExchangeDebugTokenProjectsAppsRequest,
  ExchangeDebugTokenProjectsAppsResponse,
  ExchangeDebugTokenProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeDebugTokenProjectsAppsRequest,
  output: ExchangeDebugTokenProjectsAppsResponse,
  errors: [],
}));

export interface GenerateAppAttestChallengeProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest;
}

export const GenerateAppAttestChallengeProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:generateAppAttestChallenge",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateAppAttestChallengeProjectsAppsRequest>;

export type GenerateAppAttestChallengeProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse;
export const GenerateAppAttestChallengeProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaGenerateAppAttestChallengeResponse;

export type GenerateAppAttestChallengeProjectsAppsError = DefaultErrors;

/** Generates a challenge that protects the integrity of an immediately following call to ExchangeAppAttestAttestation or ExchangeAppAttestAssertion. A challenge should not be reused for multiple calls. */
export const generateAppAttestChallengeProjectsApps: API.OperationMethod<
  GenerateAppAttestChallengeProjectsAppsRequest,
  GenerateAppAttestChallengeProjectsAppsResponse,
  GenerateAppAttestChallengeProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateAppAttestChallengeProjectsAppsRequest,
  output: GenerateAppAttestChallengeProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeAppAttestAttestationProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest;
}

export const ExchangeAppAttestAttestationProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeAppAttestAttestation",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeAppAttestAttestationProjectsAppsRequest>;

export type ExchangeAppAttestAttestationProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse;
export const ExchangeAppAttestAttestationProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaExchangeAppAttestAttestationResponse;

export type ExchangeAppAttestAttestationProjectsAppsError = DefaultErrors;

/** Accepts an App Attest CBOR attestation and verifies it with Apple using your preconfigured team and bundle IDs. If valid, returns an attestation artifact that can later be exchanged for an AppCheckToken using ExchangeAppAttestAssertion. For convenience and performance, this method's response object will also contain an AppCheckToken (if the verification is successful). */
export const exchangeAppAttestAttestationProjectsApps: API.OperationMethod<
  ExchangeAppAttestAttestationProjectsAppsRequest,
  ExchangeAppAttestAttestationProjectsAppsResponse,
  ExchangeAppAttestAttestationProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeAppAttestAttestationProjectsAppsRequest,
  output: ExchangeAppAttestAttestationProjectsAppsResponse,
  errors: [],
}));

export interface ExchangeAppAttestAssertionProjectsAppsRequest {
  /** Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard. Alternatively, if this method is being called for an OAuth client protected by App Check, this field can also be in the format: ``` oauthClients/{oauth_client_id} ``` You can view the OAuth client ID for your OAuth clients in the Google Cloud console. Note that only iOS OAuth clients are supported at this time, and they must be linked to corresponding iOS Firebase apps. Please see [the documentation](https://developers.google.com/identity/sign-in/ios/appcheck/get-started#project-setup) for more information. */
  app: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest;
}

export const ExchangeAppAttestAssertionProjectsAppsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app: Schema.String.pipe(T.HttpPath("app")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaExchangeAppAttestAssertionRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}:exchangeAppAttestAssertion",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExchangeAppAttestAssertionProjectsAppsRequest>;

export type ExchangeAppAttestAssertionProjectsAppsResponse =
  GoogleFirebaseAppcheckV1betaAppCheckToken;
export const ExchangeAppAttestAssertionProjectsAppsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppCheckToken;

export type ExchangeAppAttestAssertionProjectsAppsError = DefaultErrors;

/** Accepts an App Attest assertion and an artifact previously obtained from ExchangeAppAttestAttestation and verifies those with Apple. If valid, returns an AppCheckToken. */
export const exchangeAppAttestAssertionProjectsApps: API.OperationMethod<
  ExchangeAppAttestAssertionProjectsAppsRequest,
  ExchangeAppAttestAssertionProjectsAppsResponse,
  ExchangeAppAttestAssertionProjectsAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExchangeAppAttestAssertionProjectsAppsRequest,
  output: ExchangeAppAttestAssertionProjectsAppsResponse,
  errors: [],
}));

export interface GetProjectsAppsAppAttestConfigRequest {
  /** Required. The relative resource name of the AppAttestConfig, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` */
  name: string;
}

export const GetProjectsAppsAppAttestConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/appAttestConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsAppAttestConfigRequest>;

export type GetProjectsAppsAppAttestConfigResponse =
  GoogleFirebaseAppcheckV1betaAppAttestConfig;
export const GetProjectsAppsAppAttestConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppAttestConfig;

export type GetProjectsAppsAppAttestConfigError = DefaultErrors;

/** Gets the AppAttestConfig for the specified app. */
export const getProjectsAppsAppAttestConfig: API.OperationMethod<
  GetProjectsAppsAppAttestConfigRequest,
  GetProjectsAppsAppAttestConfigResponse,
  GetProjectsAppsAppAttestConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsAppAttestConfigRequest,
  output: GetProjectsAppsAppAttestConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsAppAttestConfigRequest {
  /** Required. The parent project name shared by all AppAttestConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the AppAttestConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsAppAttestConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/appAttestConfig:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsAppAttestConfigRequest>;

export type BatchGetProjectsAppsAppAttestConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse;
export const BatchGetProjectsAppsAppAttestConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetAppAttestConfigsResponse;

export type BatchGetProjectsAppsAppAttestConfigError = DefaultErrors;

/** Atomically gets the AppAttestConfigs for the specified list of apps. */
export const batchGetProjectsAppsAppAttestConfig: API.OperationMethod<
  BatchGetProjectsAppsAppAttestConfigRequest,
  BatchGetProjectsAppsAppAttestConfigResponse,
  BatchGetProjectsAppsAppAttestConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsAppAttestConfigRequest,
  output: BatchGetProjectsAppsAppAttestConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsAppAttestConfigRequest {
  /** Required. The relative resource name of the App Attest configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the AppAttestConfig to update. Example: `token_ttl`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaAppAttestConfig;
}

export const PatchProjectsAppsAppAttestConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaAppAttestConfig).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/appAttestConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsAppAttestConfigRequest>;

export type PatchProjectsAppsAppAttestConfigResponse =
  GoogleFirebaseAppcheckV1betaAppAttestConfig;
export const PatchProjectsAppsAppAttestConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaAppAttestConfig;

export type PatchProjectsAppsAppAttestConfigError = DefaultErrors;

/** Updates the AppAttestConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange AppAttest tokens for App Check tokens. */
export const patchProjectsAppsAppAttestConfig: API.OperationMethod<
  PatchProjectsAppsAppAttestConfigRequest,
  PatchProjectsAppsAppAttestConfigResponse,
  PatchProjectsAppsAppAttestConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsAppAttestConfigRequest,
  output: PatchProjectsAppsAppAttestConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsDeviceCheckConfigRequest {
  /** Required. The relative resource name of the DeviceCheckConfig, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` */
  name: string;
}

export const GetProjectsAppsDeviceCheckConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/deviceCheckConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsDeviceCheckConfigRequest>;

export type GetProjectsAppsDeviceCheckConfigResponse =
  GoogleFirebaseAppcheckV1betaDeviceCheckConfig;
export const GetProjectsAppsDeviceCheckConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaDeviceCheckConfig;

export type GetProjectsAppsDeviceCheckConfigError = DefaultErrors;

/** Gets the DeviceCheckConfig for the specified app. For security reasons, the `private_key` field is never populated in the response. */
export const getProjectsAppsDeviceCheckConfig: API.OperationMethod<
  GetProjectsAppsDeviceCheckConfigRequest,
  GetProjectsAppsDeviceCheckConfigResponse,
  GetProjectsAppsDeviceCheckConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsDeviceCheckConfigRequest,
  output: GetProjectsAppsDeviceCheckConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsDeviceCheckConfigRequest {
  /** Required. The parent project name shared by all DeviceCheckConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the DeviceCheckConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsDeviceCheckConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/deviceCheckConfig:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsDeviceCheckConfigRequest>;

export type BatchGetProjectsAppsDeviceCheckConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse;
export const BatchGetProjectsAppsDeviceCheckConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetDeviceCheckConfigsResponse;

export type BatchGetProjectsAppsDeviceCheckConfigError = DefaultErrors;

/** Atomically gets the DeviceCheckConfigs for the specified list of apps. For security reasons, the `private_key` field is never populated in the response. */
export const batchGetProjectsAppsDeviceCheckConfig: API.OperationMethod<
  BatchGetProjectsAppsDeviceCheckConfigRequest,
  BatchGetProjectsAppsDeviceCheckConfigResponse,
  BatchGetProjectsAppsDeviceCheckConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsDeviceCheckConfigRequest,
  output: BatchGetProjectsAppsDeviceCheckConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsDeviceCheckConfigRequest {
  /** Required. The relative resource name of the DeviceCheck configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the DeviceCheckConfig to update. Example: `key_id,private_key`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaDeviceCheckConfig;
}

export const PatchProjectsAppsDeviceCheckConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaDeviceCheckConfig).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/deviceCheckConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsDeviceCheckConfigRequest>;

export type PatchProjectsAppsDeviceCheckConfigResponse =
  GoogleFirebaseAppcheckV1betaDeviceCheckConfig;
export const PatchProjectsAppsDeviceCheckConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaDeviceCheckConfig;

export type PatchProjectsAppsDeviceCheckConfigError = DefaultErrors;

/** Updates the DeviceCheckConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange DeviceCheck tokens for App Check tokens. For security reasons, the `private_key` field is never populated in the response. */
export const patchProjectsAppsDeviceCheckConfig: API.OperationMethod<
  PatchProjectsAppsDeviceCheckConfigRequest,
  PatchProjectsAppsDeviceCheckConfigResponse,
  PatchProjectsAppsDeviceCheckConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsDeviceCheckConfigRequest,
  output: PatchProjectsAppsDeviceCheckConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsRecaptchaConfigRequest {
  /** Required. The relative resource name of the RecaptchaConfig, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaConfig ``` */
  name: string;
}

export const GetProjectsAppsRecaptchaConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/recaptchaConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsRecaptchaConfigRequest>;

export type GetProjectsAppsRecaptchaConfigResponse =
  GoogleFirebaseAppcheckV1betaRecaptchaConfig;
export const GetProjectsAppsRecaptchaConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaRecaptchaConfig;

export type GetProjectsAppsRecaptchaConfigError = DefaultErrors;

/** Gets the RecaptchaConfig for the specified app. For security reasons, the `site_secret` field is never populated in the response. */
export const getProjectsAppsRecaptchaConfig: API.OperationMethod<
  GetProjectsAppsRecaptchaConfigRequest,
  GetProjectsAppsRecaptchaConfigResponse,
  GetProjectsAppsRecaptchaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsRecaptchaConfigRequest,
  output: GetProjectsAppsRecaptchaConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsRecaptchaConfigRequest {
  /** Required. The parent project name shared by all RecaptchaConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the RecaptchaConfigs to retrieve, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsRecaptchaConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/recaptchaConfig:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsRecaptchaConfigRequest>;

export type BatchGetProjectsAppsRecaptchaConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse;
export const BatchGetProjectsAppsRecaptchaConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetRecaptchaConfigsResponse;

export type BatchGetProjectsAppsRecaptchaConfigError = DefaultErrors;

/** Atomically gets the RecaptchaConfigs for the specified list of apps. For security reasons, the `site_secret` field is never populated in the response. */
export const batchGetProjectsAppsRecaptchaConfig: API.OperationMethod<
  BatchGetProjectsAppsRecaptchaConfigRequest,
  BatchGetProjectsAppsRecaptchaConfigResponse,
  BatchGetProjectsAppsRecaptchaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsRecaptchaConfigRequest,
  output: BatchGetProjectsAppsRecaptchaConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsRecaptchaConfigRequest {
  /** Required. The relative resource name of the reCAPTCHA v3 configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the RecaptchaConfig to update. Example: `site_secret`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaRecaptchaConfig;
}

export const PatchProjectsAppsRecaptchaConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaRecaptchaConfig).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/recaptchaConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsRecaptchaConfigRequest>;

export type PatchProjectsAppsRecaptchaConfigResponse =
  GoogleFirebaseAppcheckV1betaRecaptchaConfig;
export const PatchProjectsAppsRecaptchaConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaRecaptchaConfig;

export type PatchProjectsAppsRecaptchaConfigError = DefaultErrors;

/** Updates the RecaptchaConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange reCAPTCHA tokens for App Check tokens. For security reasons, the `site_secret` field is never populated in the response. */
export const patchProjectsAppsRecaptchaConfig: API.OperationMethod<
  PatchProjectsAppsRecaptchaConfigRequest,
  PatchProjectsAppsRecaptchaConfigResponse,
  PatchProjectsAppsRecaptchaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsRecaptchaConfigRequest,
  output: PatchProjectsAppsRecaptchaConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsRecaptchaV3ConfigRequest {
  /** Required. The relative resource name of the RecaptchaV3Config, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` */
  name: string;
}

export const GetProjectsAppsRecaptchaV3ConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/recaptchaV3Config",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsRecaptchaV3ConfigRequest>;

export type GetProjectsAppsRecaptchaV3ConfigResponse =
  GoogleFirebaseAppcheckV1betaRecaptchaV3Config;
export const GetProjectsAppsRecaptchaV3ConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaRecaptchaV3Config;

export type GetProjectsAppsRecaptchaV3ConfigError = DefaultErrors;

/** Gets the RecaptchaV3Config for the specified app. For security reasons, the `site_secret` field is never populated in the response. */
export const getProjectsAppsRecaptchaV3Config: API.OperationMethod<
  GetProjectsAppsRecaptchaV3ConfigRequest,
  GetProjectsAppsRecaptchaV3ConfigResponse,
  GetProjectsAppsRecaptchaV3ConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsRecaptchaV3ConfigRequest,
  output: GetProjectsAppsRecaptchaV3ConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsRecaptchaV3ConfigRequest {
  /** Required. The parent project name shared by all RecaptchaV3Configs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the RecaptchaV3Configs to retrieve, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsRecaptchaV3ConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/recaptchaV3Config:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsRecaptchaV3ConfigRequest>;

export type BatchGetProjectsAppsRecaptchaV3ConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse;
export const BatchGetProjectsAppsRecaptchaV3ConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetRecaptchaV3ConfigsResponse;

export type BatchGetProjectsAppsRecaptchaV3ConfigError = DefaultErrors;

/** Atomically gets the RecaptchaV3Configs for the specified list of apps. For security reasons, the `site_secret` field is never populated in the response. */
export const batchGetProjectsAppsRecaptchaV3Config: API.OperationMethod<
  BatchGetProjectsAppsRecaptchaV3ConfigRequest,
  BatchGetProjectsAppsRecaptchaV3ConfigResponse,
  BatchGetProjectsAppsRecaptchaV3ConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsRecaptchaV3ConfigRequest,
  output: BatchGetProjectsAppsRecaptchaV3ConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsRecaptchaV3ConfigRequest {
  /** Required. The relative resource name of the reCAPTCHA v3 configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the RecaptchaV3Config to update. Example: `site_secret`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaRecaptchaV3Config;
}

export const PatchProjectsAppsRecaptchaV3ConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaRecaptchaV3Config).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/recaptchaV3Config",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsRecaptchaV3ConfigRequest>;

export type PatchProjectsAppsRecaptchaV3ConfigResponse =
  GoogleFirebaseAppcheckV1betaRecaptchaV3Config;
export const PatchProjectsAppsRecaptchaV3ConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaRecaptchaV3Config;

export type PatchProjectsAppsRecaptchaV3ConfigError = DefaultErrors;

/** Updates the RecaptchaV3Config for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange reCAPTCHA V3 tokens for App Check tokens. For security reasons, the `site_secret` field is never populated in the response. */
export const patchProjectsAppsRecaptchaV3Config: API.OperationMethod<
  PatchProjectsAppsRecaptchaV3ConfigRequest,
  PatchProjectsAppsRecaptchaV3ConfigResponse,
  PatchProjectsAppsRecaptchaV3ConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsRecaptchaV3ConfigRequest,
  output: PatchProjectsAppsRecaptchaV3ConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsRecaptchaEnterpriseConfigRequest {
  /** Required. The relative resource name of the RecaptchaEnterpriseConfig, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` */
  name: string;
}

export const GetProjectsAppsRecaptchaEnterpriseConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/recaptchaEnterpriseConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsRecaptchaEnterpriseConfigRequest>;

export type GetProjectsAppsRecaptchaEnterpriseConfigResponse =
  GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig;
export const GetProjectsAppsRecaptchaEnterpriseConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig;

export type GetProjectsAppsRecaptchaEnterpriseConfigError = DefaultErrors;

/** Gets the RecaptchaEnterpriseConfig for the specified app. */
export const getProjectsAppsRecaptchaEnterpriseConfig: API.OperationMethod<
  GetProjectsAppsRecaptchaEnterpriseConfigRequest,
  GetProjectsAppsRecaptchaEnterpriseConfigResponse,
  GetProjectsAppsRecaptchaEnterpriseConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsRecaptchaEnterpriseConfigRequest,
  output: GetProjectsAppsRecaptchaEnterpriseConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest {
  /** Required. The parent project name shared by all RecaptchaEnterpriseConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the RecaptchaEnterpriseConfigs to retrieve, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/recaptchaEnterpriseConfig:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest>;

export type BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse;
export const BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetRecaptchaEnterpriseConfigsResponse;

export type BatchGetProjectsAppsRecaptchaEnterpriseConfigError = DefaultErrors;

/** Atomically gets the RecaptchaEnterpriseConfigs for the specified list of apps. */
export const batchGetProjectsAppsRecaptchaEnterpriseConfig: API.OperationMethod<
  BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest,
  BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse,
  BatchGetProjectsAppsRecaptchaEnterpriseConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsRecaptchaEnterpriseConfigRequest,
  output: BatchGetProjectsAppsRecaptchaEnterpriseConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsRecaptchaEnterpriseConfigRequest {
  /** Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the RecaptchaEnterpriseConfig to update. Example: `site_key`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig;
}

export const PatchProjectsAppsRecaptchaEnterpriseConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(
      GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/recaptchaEnterpriseConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsRecaptchaEnterpriseConfigRequest>;

export type PatchProjectsAppsRecaptchaEnterpriseConfigResponse =
  GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig;
export const PatchProjectsAppsRecaptchaEnterpriseConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaRecaptchaEnterpriseConfig;

export type PatchProjectsAppsRecaptchaEnterpriseConfigError = DefaultErrors;

/** Updates the RecaptchaEnterpriseConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange reCAPTCHA Enterprise tokens for App Check tokens. */
export const patchProjectsAppsRecaptchaEnterpriseConfig: API.OperationMethod<
  PatchProjectsAppsRecaptchaEnterpriseConfigRequest,
  PatchProjectsAppsRecaptchaEnterpriseConfigResponse,
  PatchProjectsAppsRecaptchaEnterpriseConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsRecaptchaEnterpriseConfigRequest,
  output: PatchProjectsAppsRecaptchaEnterpriseConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsSafetyNetConfigRequest {
  /** Required. The relative resource name of the SafetyNetConfig, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` */
  name: string;
}

export const GetProjectsAppsSafetyNetConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/safetyNetConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsSafetyNetConfigRequest>;

export type GetProjectsAppsSafetyNetConfigResponse =
  GoogleFirebaseAppcheckV1betaSafetyNetConfig;
export const GetProjectsAppsSafetyNetConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaSafetyNetConfig;

export type GetProjectsAppsSafetyNetConfigError = DefaultErrors;

/** Gets the SafetyNetConfig for the specified app. */
export const getProjectsAppsSafetyNetConfig: API.OperationMethod<
  GetProjectsAppsSafetyNetConfigRequest,
  GetProjectsAppsSafetyNetConfigResponse,
  GetProjectsAppsSafetyNetConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsSafetyNetConfigRequest,
  output: GetProjectsAppsSafetyNetConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsSafetyNetConfigRequest {
  /** Required. The parent project name shared by all SafetyNetConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the SafetyNetConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsSafetyNetConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/safetyNetConfig:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsSafetyNetConfigRequest>;

export type BatchGetProjectsAppsSafetyNetConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse;
export const BatchGetProjectsAppsSafetyNetConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetSafetyNetConfigsResponse;

export type BatchGetProjectsAppsSafetyNetConfigError = DefaultErrors;

/** Atomically gets the SafetyNetConfigs for the specified list of apps. */
export const batchGetProjectsAppsSafetyNetConfig: API.OperationMethod<
  BatchGetProjectsAppsSafetyNetConfigRequest,
  BatchGetProjectsAppsSafetyNetConfigResponse,
  BatchGetProjectsAppsSafetyNetConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsSafetyNetConfigRequest,
  output: BatchGetProjectsAppsSafetyNetConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsSafetyNetConfigRequest {
  /** Required. The relative resource name of the SafetyNet configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the SafetyNetConfig to update. Example: `token_ttl`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaSafetyNetConfig;
}

export const PatchProjectsAppsSafetyNetConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaSafetyNetConfig).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/safetyNetConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsSafetyNetConfigRequest>;

export type PatchProjectsAppsSafetyNetConfigResponse =
  GoogleFirebaseAppcheckV1betaSafetyNetConfig;
export const PatchProjectsAppsSafetyNetConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaSafetyNetConfig;

export type PatchProjectsAppsSafetyNetConfigError = DefaultErrors;

/** Updates the SafetyNetConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange SafetyNet tokens for App Check tokens. */
export const patchProjectsAppsSafetyNetConfig: API.OperationMethod<
  PatchProjectsAppsSafetyNetConfigRequest,
  PatchProjectsAppsSafetyNetConfigResponse,
  PatchProjectsAppsSafetyNetConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsSafetyNetConfigRequest,
  output: PatchProjectsAppsSafetyNetConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsPlayIntegrityConfigRequest {
  /** Required. The relative resource name of the PlayIntegrityConfig, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` */
  name: string;
}

export const GetProjectsAppsPlayIntegrityConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/playIntegrityConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsPlayIntegrityConfigRequest>;

export type GetProjectsAppsPlayIntegrityConfigResponse =
  GoogleFirebaseAppcheckV1betaPlayIntegrityConfig;
export const GetProjectsAppsPlayIntegrityConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaPlayIntegrityConfig;

export type GetProjectsAppsPlayIntegrityConfigError = DefaultErrors;

/** Gets the PlayIntegrityConfig for the specified app. */
export const getProjectsAppsPlayIntegrityConfig: API.OperationMethod<
  GetProjectsAppsPlayIntegrityConfigRequest,
  GetProjectsAppsPlayIntegrityConfigResponse,
  GetProjectsAppsPlayIntegrityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsPlayIntegrityConfigRequest,
  output: GetProjectsAppsPlayIntegrityConfigResponse,
  errors: [],
}));

export interface BatchGetProjectsAppsPlayIntegrityConfigRequest {
  /** Required. The parent project name shared by all PlayIntegrityConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails. */
  parent: string;
  /** Required. The relative resource names of the PlayIntegrityConfigs to retrieve, in the format ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` A maximum of 100 objects can be retrieved in a batch. */
  names?: string[];
}

export const BatchGetProjectsAppsPlayIntegrityConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    names: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("names"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/-/playIntegrityConfig:batchGet",
    }),
    svc,
  ) as unknown as Schema.Schema<BatchGetProjectsAppsPlayIntegrityConfigRequest>;

export type BatchGetProjectsAppsPlayIntegrityConfigResponse =
  GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse;
export const BatchGetProjectsAppsPlayIntegrityConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaBatchGetPlayIntegrityConfigsResponse;

export type BatchGetProjectsAppsPlayIntegrityConfigError = DefaultErrors;

/** Atomically gets the PlayIntegrityConfigs for the specified list of apps. */
export const batchGetProjectsAppsPlayIntegrityConfig: API.OperationMethod<
  BatchGetProjectsAppsPlayIntegrityConfigRequest,
  BatchGetProjectsAppsPlayIntegrityConfigResponse,
  BatchGetProjectsAppsPlayIntegrityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetProjectsAppsPlayIntegrityConfigRequest,
  output: BatchGetProjectsAppsPlayIntegrityConfigResponse,
  errors: [],
}));

export interface PatchProjectsAppsPlayIntegrityConfigRequest {
  /** Required. The relative resource name of the Play Integrity configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the PlayIntegrityConfig to update. Example: `token_ttl`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaPlayIntegrityConfig;
}

export const PatchProjectsAppsPlayIntegrityConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaPlayIntegrityConfig).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/playIntegrityConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsPlayIntegrityConfigRequest>;

export type PatchProjectsAppsPlayIntegrityConfigResponse =
  GoogleFirebaseAppcheckV1betaPlayIntegrityConfig;
export const PatchProjectsAppsPlayIntegrityConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaPlayIntegrityConfig;

export type PatchProjectsAppsPlayIntegrityConfigError = DefaultErrors;

/** Updates the PlayIntegrityConfig for the specified app. While this configuration is incomplete or invalid, the app will be unable to exchange Play Integrity tokens for App Check tokens. */
export const patchProjectsAppsPlayIntegrityConfig: API.OperationMethod<
  PatchProjectsAppsPlayIntegrityConfigRequest,
  PatchProjectsAppsPlayIntegrityConfigResponse,
  PatchProjectsAppsPlayIntegrityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsPlayIntegrityConfigRequest,
  output: PatchProjectsAppsPlayIntegrityConfigResponse,
  errors: [],
}));

export interface GetProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name: string;
}

export const GetProjectsAppsDebugTokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/debugTokens/{debugTokensId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsAppsDebugTokensRequest>;

export type GetProjectsAppsDebugTokensResponse =
  GoogleFirebaseAppcheckV1betaDebugToken;
export const GetProjectsAppsDebugTokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaDebugToken;

export type GetProjectsAppsDebugTokensError = DefaultErrors;

/** Gets the specified DebugToken. For security reasons, the `token` field is never populated in the response. */
export const getProjectsAppsDebugTokens: API.OperationMethod<
  GetProjectsAppsDebugTokensRequest,
  GetProjectsAppsDebugTokensResponse,
  GetProjectsAppsDebugTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsAppsDebugTokensRequest,
  output: GetProjectsAppsDebugTokensResponse,
  errors: [],
}));

export interface ListProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the parent app for which to list each associated DebugToken, in the format: ``` projects/{project_number}/apps/{app_id} ``` */
  parent: string;
  /** The maximum number of DebugTokens to return in the response. Note that an app can have at most 20 debug tokens. The server may return fewer than this at its own discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. */
  pageSize?: number;
  /** Token returned from a previous call to ListDebugTokens indicating where in the set of DebugTokens to resume listing. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDebugTokens must match the call that provided the page token; if they do not match, the result is undefined. */
  pageToken?: string;
}

export const ListProjectsAppsDebugTokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/debugTokens",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsAppsDebugTokensRequest>;

export type ListProjectsAppsDebugTokensResponse =
  GoogleFirebaseAppcheckV1betaListDebugTokensResponse;
export const ListProjectsAppsDebugTokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaListDebugTokensResponse;

export type ListProjectsAppsDebugTokensError = DefaultErrors;

/** Lists all DebugTokens for the specified app. For security reasons, the `token` field is never populated in the response. */
export const listProjectsAppsDebugTokens: API.PaginatedOperationMethod<
  ListProjectsAppsDebugTokensRequest,
  ListProjectsAppsDebugTokensResponse,
  ListProjectsAppsDebugTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsAppsDebugTokensRequest,
  output: ListProjectsAppsDebugTokensResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the parent app in which the specified DebugToken will be created, in the format: ``` projects/{project_number}/apps/{app_id} ``` */
  parent: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaDebugToken;
}

export const CreateProjectsAppsDebugTokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaDebugToken).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/debugTokens",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsAppsDebugTokensRequest>;

export type CreateProjectsAppsDebugTokensResponse =
  GoogleFirebaseAppcheckV1betaDebugToken;
export const CreateProjectsAppsDebugTokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaDebugToken;

export type CreateProjectsAppsDebugTokensError = DefaultErrors;

/** Creates a new DebugToken for the specified app. For security reasons, after the creation operation completes, the `token` field cannot be updated or retrieved, but you can revoke the debug token using DeleteDebugToken. Each app can have a maximum of 20 debug tokens. */
export const createProjectsAppsDebugTokens: API.OperationMethod<
  CreateProjectsAppsDebugTokensRequest,
  CreateProjectsAppsDebugTokensResponse,
  CreateProjectsAppsDebugTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsAppsDebugTokensRequest,
  output: CreateProjectsAppsDebugTokensResponse,
  errors: [],
}));

export interface PatchProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name: string;
  /** Required. A comma-separated list of names of fields in the DebugToken to update. Example: `display_name`. */
  updateMask?: string;
  /** Request body */
  body?: GoogleFirebaseAppcheckV1betaDebugToken;
}

export const PatchProjectsAppsDebugTokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleFirebaseAppcheckV1betaDebugToken).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/debugTokens/{debugTokensId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsAppsDebugTokensRequest>;

export type PatchProjectsAppsDebugTokensResponse =
  GoogleFirebaseAppcheckV1betaDebugToken;
export const PatchProjectsAppsDebugTokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleFirebaseAppcheckV1betaDebugToken;

export type PatchProjectsAppsDebugTokensError = DefaultErrors;

/** Updates the specified DebugToken. For security reasons, the `token` field cannot be updated, nor will it be populated in the response, but you can revoke the debug token using DeleteDebugToken. */
export const patchProjectsAppsDebugTokens: API.OperationMethod<
  PatchProjectsAppsDebugTokensRequest,
  PatchProjectsAppsDebugTokensResponse,
  PatchProjectsAppsDebugTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsAppsDebugTokensRequest,
  output: PatchProjectsAppsDebugTokensResponse,
  errors: [],
}));

export interface DeleteProjectsAppsDebugTokensRequest {
  /** Required. The relative resource name of the DebugToken to delete, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ``` */
  name: string;
}

export const DeleteProjectsAppsDebugTokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/apps/{appsId}/debugTokens/{debugTokensId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsAppsDebugTokensRequest>;

export type DeleteProjectsAppsDebugTokensResponse = GoogleProtobufEmpty;
export const DeleteProjectsAppsDebugTokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsAppsDebugTokensError = DefaultErrors;

/** Deletes the specified DebugToken. A deleted debug token cannot be used to exchange for an App Check token. Use this method when you suspect the secret `token` has been compromised or when you no longer need the debug token. */
export const deleteProjectsAppsDebugTokens: API.OperationMethod<
  DeleteProjectsAppsDebugTokensRequest,
  DeleteProjectsAppsDebugTokensResponse,
  DeleteProjectsAppsDebugTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsAppsDebugTokensRequest,
  output: DeleteProjectsAppsDebugTokensResponse,
  errors: [],
}));
