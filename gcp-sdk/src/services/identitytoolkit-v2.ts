// ==========================================================================
// Identity Toolkit API (identitytoolkit v2)
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
  name: "identitytoolkit",
  version: "v2",
  rootUrl: "https://identitytoolkit.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest {}

export const GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest>;

export interface GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse {}

export const GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse>;

export interface GoogleCloudIdentitytoolkitAdminV2Email {
  /** Whether email auth is enabled for the project or not. */
  enabled?: boolean;
  /** Whether a password is required for email auth or not. If true, both an email and password must be provided to sign in. If false, a user may sign in via either email/password or email link. */
  passwordRequired?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2Email: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Email> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      passwordRequired: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Email",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Email>;

export interface GoogleCloudIdentitytoolkitAdminV2PhoneNumber {
  /** Whether phone number auth is enabled for the project or not. */
  enabled?: boolean;
  /** A map of that can be used for phone auth testing. */
  testPhoneNumbers?: Record<string, string>;
}

export const GoogleCloudIdentitytoolkitAdminV2PhoneNumber: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2PhoneNumber> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      testPhoneNumbers: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2PhoneNumber",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2PhoneNumber>;

export interface GoogleCloudIdentitytoolkitAdminV2Anonymous {
  /** Whether anonymous user auth is enabled for the project or not. */
  enabled?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2Anonymous: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Anonymous> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Anonymous",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Anonymous>;

export interface GoogleCloudIdentitytoolkitAdminV2HashConfig {
  /** Output only. Different password hash algorithms used in Identity Toolkit. */
  algorithm?:
    | "HASH_ALGORITHM_UNSPECIFIED"
    | "HMAC_SHA256"
    | "HMAC_SHA1"
    | "HMAC_MD5"
    | "SCRYPT"
    | "PBKDF_SHA1"
    | "MD5"
    | "HMAC_SHA512"
    | "SHA1"
    | "BCRYPT"
    | "PBKDF2_SHA256"
    | "SHA256"
    | "SHA512"
    | "STANDARD_SCRYPT"
    | (string & {});
  /** Output only. Signer key in base64. */
  signerKey?: string;
  /** Output only. Non-printable character to be inserted between the salt and plain text password in base64. */
  saltSeparator?: string;
  /** Output only. How many rounds for hash calculation. Used by scrypt and other similar password derivation algorithms. */
  rounds?: number;
  /** Output only. Memory cost for hash calculation. Used by scrypt and other similar password derivation algorithms. See https://tools.ietf.org/html/rfc7914 for explanation of field. */
  memoryCost?: number;
}

export const GoogleCloudIdentitytoolkitAdminV2HashConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2HashConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      algorithm: Schema.optional(Schema.String),
      signerKey: Schema.optional(Schema.String),
      saltSeparator: Schema.optional(Schema.String),
      rounds: Schema.optional(Schema.Number),
      memoryCost: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2HashConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2HashConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2SignInConfig {
  /** Configuration options related to authenticating a user by their email address. */
  email?: GoogleCloudIdentitytoolkitAdminV2Email;
  /** Configuration options related to authenticated a user by their phone number. */
  phoneNumber?: GoogleCloudIdentitytoolkitAdminV2PhoneNumber;
  /** Configuration options related to authenticating an anonymous user. */
  anonymous?: GoogleCloudIdentitytoolkitAdminV2Anonymous;
  /** Whether to allow more than one account to have the same email. */
  allowDuplicateEmails?: boolean;
  /** Output only. Hash config information. */
  hashConfig?: GoogleCloudIdentitytoolkitAdminV2HashConfig;
}

export const GoogleCloudIdentitytoolkitAdminV2SignInConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SignInConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(GoogleCloudIdentitytoolkitAdminV2Email),
      phoneNumber: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2PhoneNumber,
      ),
      anonymous: Schema.optional(GoogleCloudIdentitytoolkitAdminV2Anonymous),
      allowDuplicateEmails: Schema.optional(Schema.Boolean),
      hashConfig: Schema.optional(GoogleCloudIdentitytoolkitAdminV2HashConfig),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SignInConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SignInConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2Smtp {
  /** Sender email for the SMTP relay */
  senderEmail?: string;
  /** SMTP relay host */
  host?: string;
  /** SMTP relay port */
  port?: number;
  /** SMTP relay username */
  username?: string;
  /** SMTP relay password */
  password?: string;
  /** SMTP security mode. */
  securityMode?:
    | "SECURITY_MODE_UNSPECIFIED"
    | "SSL"
    | "START_TLS"
    | (string & {});
}

export const GoogleCloudIdentitytoolkitAdminV2Smtp: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Smtp> =
  Schema.suspend(() =>
    Schema.Struct({
      senderEmail: Schema.optional(Schema.String),
      host: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
      securityMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Smtp",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Smtp>;

export interface GoogleCloudIdentitytoolkitAdminV2EmailTemplate {
  /** Local part of From address */
  senderLocalPart?: string;
  /** Subject of the email */
  subject?: string;
  /** Sender display name */
  senderDisplayName?: string;
  /** Email body */
  body?: string;
  /** Email body format */
  bodyFormat?:
    | "BODY_FORMAT_UNSPECIFIED"
    | "PLAIN_TEXT"
    | "HTML"
    | (string & {});
  /** Reply-to address */
  replyTo?: string;
  /** Output only. Whether the body or subject of the email is customized. */
  customized?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2EmailTemplate: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2EmailTemplate> =
  Schema.suspend(() =>
    Schema.Struct({
      senderLocalPart: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.String),
      senderDisplayName: Schema.optional(Schema.String),
      body: Schema.optional(Schema.String),
      bodyFormat: Schema.optional(Schema.String),
      replyTo: Schema.optional(Schema.String),
      customized: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2EmailTemplate",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2EmailTemplate>;

export interface GoogleCloudIdentitytoolkitAdminV2DnsInfo {
  /** Output only. The applied verified custom domain. */
  customDomain?: string;
  /** Whether to use custom domain. */
  useCustomDomain?: boolean;
  /** Output only. The custom domain that's to be verified. */
  pendingCustomDomain?: string;
  /** Output only. The current verification state of the custom domain. The custom domain will only be used once the domain verification is successful. */
  customDomainState?:
    | "VERIFICATION_STATE_UNSPECIFIED"
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "FAILED"
    | "SUCCEEDED"
    | (string & {});
  /** Output only. The timestamp of initial request for the current domain verification. */
  domainVerificationRequestTime?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2DnsInfo: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2DnsInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      customDomain: Schema.optional(Schema.String),
      useCustomDomain: Schema.optional(Schema.Boolean),
      pendingCustomDomain: Schema.optional(Schema.String),
      customDomainState: Schema.optional(Schema.String),
      domainVerificationRequestTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2DnsInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2DnsInfo>;

export interface GoogleCloudIdentitytoolkitAdminV2SendEmail {
  /** The method used for sending an email. */
  method?: "METHOD_UNSPECIFIED" | "DEFAULT" | "CUSTOM_SMTP" | (string & {});
  /** Use a custom SMTP relay */
  smtp?: GoogleCloudIdentitytoolkitAdminV2Smtp;
  /** Email template for reset password */
  resetPasswordTemplate?: GoogleCloudIdentitytoolkitAdminV2EmailTemplate;
  /** Email template for verify email */
  verifyEmailTemplate?: GoogleCloudIdentitytoolkitAdminV2EmailTemplate;
  /** Email template for change email */
  changeEmailTemplate?: GoogleCloudIdentitytoolkitAdminV2EmailTemplate;
  /** Reset password email template for legacy Firebase V1 app. */
  legacyResetPasswordTemplate?: GoogleCloudIdentitytoolkitAdminV2EmailTemplate;
  /** action url in email template. */
  callbackUri?: string;
  /** Information of custom domain DNS verification. */
  dnsInfo?: GoogleCloudIdentitytoolkitAdminV2DnsInfo;
  /** Email template for reverting second factor addition emails */
  revertSecondFactorAdditionTemplate?: GoogleCloudIdentitytoolkitAdminV2EmailTemplate;
}

export const GoogleCloudIdentitytoolkitAdminV2SendEmail: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SendEmail> =
  Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      smtp: Schema.optional(GoogleCloudIdentitytoolkitAdminV2Smtp),
      resetPasswordTemplate: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailTemplate,
      ),
      verifyEmailTemplate: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailTemplate,
      ),
      changeEmailTemplate: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailTemplate,
      ),
      legacyResetPasswordTemplate: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailTemplate,
      ),
      callbackUri: Schema.optional(Schema.String),
      dnsInfo: Schema.optional(GoogleCloudIdentitytoolkitAdminV2DnsInfo),
      revertSecondFactorAdditionTemplate: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailTemplate,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SendEmail",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SendEmail>;

export interface GoogleCloudIdentitytoolkitAdminV2SmsTemplate {
  /** Output only. The SMS's content. Can contain the following placeholders which will be replaced with the appropriate values: %APP_NAME% - For Android or iOS apps, the app's display name. For web apps, the domain hosting the application. %LOGIN_CODE% - The OOB code being sent in the SMS. */
  content?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2SmsTemplate: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SmsTemplate> =
  Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SmsTemplate",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SmsTemplate>;

export interface GoogleCloudIdentitytoolkitAdminV2SendSms {
  /** Whether to use the accept_language header for SMS. */
  useDeviceLocale?: boolean;
  /** Output only. The template to use when sending an SMS. */
  smsTemplate?: GoogleCloudIdentitytoolkitAdminV2SmsTemplate;
}

export const GoogleCloudIdentitytoolkitAdminV2SendSms: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SendSms> =
  Schema.suspend(() =>
    Schema.Struct({
      useDeviceLocale: Schema.optional(Schema.Boolean),
      smsTemplate: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2SmsTemplate,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SendSms",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SendSms>;

export interface GoogleCloudIdentitytoolkitAdminV2NotificationConfig {
  /** Options for email sending. */
  sendEmail?: GoogleCloudIdentitytoolkitAdminV2SendEmail;
  /** Options for SMS sending. */
  sendSms?: GoogleCloudIdentitytoolkitAdminV2SendSms;
  /** Default locale used for email and SMS in IETF BCP 47 format. */
  defaultLocale?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2NotificationConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2NotificationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      sendEmail: Schema.optional(GoogleCloudIdentitytoolkitAdminV2SendEmail),
      sendSms: Schema.optional(GoogleCloudIdentitytoolkitAdminV2SendSms),
      defaultLocale: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2NotificationConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2NotificationConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2TemporaryQuota {
  /** Corresponds to the 'refill_token_count' field in QuotaServer config */
  quota?: string;
  /** When this quota will take effect */
  startTime?: string;
  /** How long this quota will be active for */
  quotaDuration?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2TemporaryQuota: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2TemporaryQuota> =
  Schema.suspend(() =>
    Schema.Struct({
      quota: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      quotaDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2TemporaryQuota",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2TemporaryQuota>;

export interface GoogleCloudIdentitytoolkitAdminV2QuotaConfig {
  /** Quota for the Signup endpoint, if overwritten. Signup quota is measured in sign ups per project per hour per IP. */
  signUpQuotaConfig?: GoogleCloudIdentitytoolkitAdminV2TemporaryQuota;
}

export const GoogleCloudIdentitytoolkitAdminV2QuotaConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2QuotaConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      signUpQuotaConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2TemporaryQuota,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2QuotaConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2QuotaConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2RequestLogging {
  /** Whether logging is enabled for this project or not. */
  enabled?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2RequestLogging: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RequestLogging> =
  Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2RequestLogging",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RequestLogging>;

export interface GoogleCloudIdentitytoolkitAdminV2MonitoringConfig {
  /** Configuration for logging requests made to this project to Stackdriver Logging */
  requestLogging?: GoogleCloudIdentitytoolkitAdminV2RequestLogging;
}

export const GoogleCloudIdentitytoolkitAdminV2MonitoringConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MonitoringConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      requestLogging: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2RequestLogging,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2MonitoringConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MonitoringConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig {
  /** Whether this project can have tenants or not. */
  allowTenants?: boolean;
  /** The default cloud parent org or folder that the tenant project should be created under. The parent resource name should be in the format of "/", such as "folders/123" or "organizations/456". If the value is not set, the tenant will be created under the same organization or folder as the agent project. */
  defaultTenantLocation?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      allowTenants: Schema.optional(Schema.Boolean),
      defaultTenantLocation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2Permissions {
  /** When true, end users cannot sign up for a new account on the associated project through any of our API methods */
  disabledUserSignup?: boolean;
  /** When true, end users cannot delete their account on the associated project through any of our API methods */
  disabledUserDeletion?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2Permissions: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Permissions> =
  Schema.suspend(() =>
    Schema.Struct({
      disabledUserSignup: Schema.optional(Schema.Boolean),
      disabledUserDeletion: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Permissions",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Permissions>;

export interface GoogleCloudIdentitytoolkitAdminV2ClientConfig {
  /** Output only. API key that can be used when making requests for this project. */
  apiKey?: string;
  /** Configuration related to restricting a user's ability to affect their account. */
  permissions?: GoogleCloudIdentitytoolkitAdminV2Permissions;
  /** Output only. Firebase subdomain. */
  firebaseSubdomain?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2ClientConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ClientConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      apiKey: Schema.optional(Schema.String),
      permissions: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2Permissions,
      ),
      firebaseSubdomain: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ClientConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ClientConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig {
  /** The allowed number of adjacent intervals that will be used for verification to avoid clock skew. */
  adjacentIntervals?: number;
}

export const GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      adjacentIntervals: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2ProviderConfig {
  /** TOTP MFA provider config for this project. */
  totpProviderConfig?: GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig;
  /** Describes the state of the MultiFactor Authentication type. */
  state?:
    | "MFA_STATE_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | "MANDATORY"
    | (string & {});
}

export const GoogleCloudIdentitytoolkitAdminV2ProviderConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ProviderConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      totpProviderConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2TotpMfaProviderConfig,
      ),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ProviderConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ProviderConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig {
  /** Whether MultiFactor Authentication has been enabled for this project. */
  state?:
    | "STATE_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | "MANDATORY"
    | (string & {});
  /** A list of usable second factors for this project. */
  enabledProviders?: Array<
    "PROVIDER_UNSPECIFIED" | "PHONE_SMS" | (string & {})
  >;
  /** A list of usable second factors for this project along with their configurations. This field does not support phone based MFA, for that use the 'enabled_providers' field. */
  providerConfigs?: Array<GoogleCloudIdentitytoolkitAdminV2ProviderConfig>;
}

export const GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      enabledProviders: Schema.optional(Schema.Array(Schema.String)),
      providerConfigs: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2ProviderConfig),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2Trigger {
  /** HTTP URI trigger for the Cloud Function. */
  functionUri?: string;
  /** When the trigger was changed. */
  updateTime?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2Trigger: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Trigger> =
  Schema.suspend(() =>
    Schema.Struct({
      functionUri: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Trigger",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Trigger>;

export interface GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials {
  /** Whether to pass the user's OIDC identity provider's ID token. */
  idToken?: boolean;
  /** Whether to pass the user's OAuth identity provider's access token. */
  accessToken?: boolean;
  /** Whether to pass the user's OAuth identity provider's refresh token. */
  refreshToken?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.Boolean),
      accessToken: Schema.optional(Schema.Boolean),
      refreshToken: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials>;

export interface GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig {
  /** Map of Trigger to event type. Key should be one of the supported event types: "beforeCreate", "beforeSignIn" */
  triggers?: Record<string, GoogleCloudIdentitytoolkitAdminV2Trigger>;
  /** The user credentials to include in the JWT payload that is sent to the registered Blocking Functions. */
  forwardInboundCredentials?: GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials;
}

export const GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      triggers: Schema.optional(
        Schema.Record(Schema.String, GoogleCloudIdentitytoolkitAdminV2Trigger),
      ),
      forwardInboundCredentials: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2ForwardInboundCredentials,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule {
  /** The end score (inclusive) of the score range for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3, ... 0.9, 1.0. A score of 0.0 indicates the riskiest request (likely a bot), whereas 1.0 indicates the safest request (likely a human). See https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment. */
  endScore?: number;
  /** The action taken if the reCAPTCHA score of a request is within the interval [start_score, end_score]. */
  action?: "RECAPTCHA_ACTION_UNSPECIFIED" | "BLOCK" | (string & {});
}

export const GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule> =
  Schema.suspend(() =>
    Schema.Struct({
      endScore: Schema.optional(Schema.Number),
      action: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule>;

export interface GoogleCloudIdentitytoolkitAdminV2RecaptchaKey {
  /** The reCAPTCHA Enterprise key resource name, e.g. "projects/{project}/keys/{key}" */
  key?: string;
  /** The client's platform type. */
  type?: "CLIENT_TYPE_UNSPECIFIED" | "WEB" | "IOS" | "ANDROID" | (string & {});
}

export const GoogleCloudIdentitytoolkitAdminV2RecaptchaKey: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaKey> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2RecaptchaKey",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaKey>;

export interface GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule {
  /** The start score (inclusive) for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3, ... 0.9, 1.0. A score of 0.0 indicates the safest request (likely legitimate), whereas 1.0 indicates the riskiest request (likely toll fraud). See https://cloud.google.com/recaptcha-enterprise/docs/sms-fraud-detection#create-assessment-sms. */
  startScore?: number;
  /** The action taken if the reCAPTCHA score of a request is within the interval [start_score, end_score]. */
  action?: "RECAPTCHA_ACTION_UNSPECIFIED" | "BLOCK" | (string & {});
}

export const GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule> =
  Schema.suspend(() =>
    Schema.Struct({
      startScore: Schema.optional(Schema.Number),
      action: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule>;

export interface GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig {
  /** The reCAPTCHA config for email/password provider, containing the enforcement status. The email/password provider contains all email related user flows protected by reCAPTCHA. */
  emailPasswordEnforcementState?:
    | "RECAPTCHA_PROVIDER_ENFORCEMENT_STATE_UNSPECIFIED"
    | "OFF"
    | "AUDIT"
    | "ENFORCE"
    | (string & {});
  /** The managed rules for authentication action based on reCAPTCHA scores. The rules are shared across providers for a given tenant project. */
  managedRules?: Array<GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule>;
  /** The reCAPTCHA keys. */
  recaptchaKeys?: Array<GoogleCloudIdentitytoolkitAdminV2RecaptchaKey>;
  /** Whether to use the account defender for reCAPTCHA assessment. Defaults to `false`. */
  useAccountDefender?: boolean;
  /** The reCAPTCHA config for phone provider, containing the enforcement status. The phone provider contains all SMS related user flows protected by reCAPTCHA. */
  phoneEnforcementState?:
    | "RECAPTCHA_PROVIDER_ENFORCEMENT_STATE_UNSPECIFIED"
    | "OFF"
    | "AUDIT"
    | "ENFORCE"
    | (string & {});
  /** The managed rules for the authentication action based on reCAPTCHA toll fraud risk scores. Toll fraud managed rules will only take effect when the phone_enforcement_state is AUDIT or ENFORCE and use_sms_toll_fraud_protection is true. */
  tollFraudManagedRules?: Array<GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule>;
  /** Whether to use the rCE bot score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE. */
  useSmsBotScore?: boolean;
  /** Whether to use the rCE sms toll fraud protection risk score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE. */
  useSmsTollFraudProtection?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      emailPasswordEnforcementState: Schema.optional(Schema.String),
      managedRules: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2RecaptchaManagedRule),
      ),
      recaptchaKeys: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2RecaptchaKey),
      ),
      useAccountDefender: Schema.optional(Schema.Boolean),
      phoneEnforcementState: Schema.optional(Schema.String),
      tollFraudManagedRules: Schema.optional(
        Schema.Array(
          GoogleCloudIdentitytoolkitAdminV2RecaptchaTollFraudManagedRule,
        ),
      ),
      useSmsBotScore: Schema.optional(Schema.Boolean),
      useSmsTollFraudProtection: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2AllowByDefault {
  /** Two letter unicode region codes to disallow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json */
  disallowedRegions?: Array<string>;
}

export const GoogleCloudIdentitytoolkitAdminV2AllowByDefault: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2AllowByDefault> =
  Schema.suspend(() =>
    Schema.Struct({
      disallowedRegions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2AllowByDefault",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2AllowByDefault>;

export interface GoogleCloudIdentitytoolkitAdminV2AllowlistOnly {
  /** Two letter unicode region codes to allow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json */
  allowedRegions?: Array<string>;
}

export const GoogleCloudIdentitytoolkitAdminV2AllowlistOnly: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2AllowlistOnly> =
  Schema.suspend(() =>
    Schema.Struct({
      allowedRegions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2AllowlistOnly",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2AllowlistOnly>;

export interface GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig {
  /** A policy of allowing SMS to every region by default and adding disallowed regions to a disallow list. */
  allowByDefault?: GoogleCloudIdentitytoolkitAdminV2AllowByDefault;
  /** A policy of only allowing regions by explicitly adding them to an allowlist. */
  allowlistOnly?: GoogleCloudIdentitytoolkitAdminV2AllowlistOnly;
}

export const GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      allowByDefault: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2AllowByDefault,
      ),
      allowlistOnly: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2AllowlistOnly,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions {
  /** Minimum password length. Range from 6 to 30 */
  minPasswordLength?: number;
  /** Maximum password length. No default max length */
  maxPasswordLength?: number;
  /** The password must contain a lower case character. */
  containsLowercaseCharacter?: boolean;
  /** The password must contain an upper case character. */
  containsUppercaseCharacter?: boolean;
  /** The password must contain a number. */
  containsNumericCharacter?: boolean;
  /** The password must contain a non alpha numeric character. */
  containsNonAlphanumericCharacter?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      minPasswordLength: Schema.optional(Schema.Number),
      maxPasswordLength: Schema.optional(Schema.Number),
      containsLowercaseCharacter: Schema.optional(Schema.Boolean),
      containsUppercaseCharacter: Schema.optional(Schema.Boolean),
      containsNumericCharacter: Schema.optional(Schema.Boolean),
      containsNonAlphanumericCharacter: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions>;

export interface GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion {
  /** The custom strength options enforced by the password policy. */
  customStrengthOptions?: GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions;
  /** Output only. schema version number for the password policy */
  schemaVersion?: number;
}

export const GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion> =
  Schema.suspend(() =>
    Schema.Struct({
      customStrengthOptions: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2CustomStrengthOptions,
      ),
      schemaVersion: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion>;

export interface GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig {
  /** Which enforcement mode to use for the password policy. */
  passwordPolicyEnforcementState?:
    | "PASSWORD_POLICY_ENFORCEMENT_STATE_UNSPECIFIED"
    | "OFF"
    | "ENFORCE"
    | (string & {});
  /** Must be of length 1. Contains the strength attributes for the password policy. */
  passwordPolicyVersions?: Array<GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion>;
  /** Users must have a password compliant with the password policy to sign-in. */
  forceUpgradeOnSignin?: boolean;
  /** Output only. The last time the password policy on the project was updated. */
  lastUpdateTime?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      passwordPolicyEnforcementState: Schema.optional(Schema.String),
      passwordPolicyVersions: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2PasswordPolicyVersion),
      ),
      forceUpgradeOnSignin: Schema.optional(Schema.Boolean),
      lastUpdateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig {
  /** Migrates the project to a state of improved email privacy. For example certain error codes are more generic to avoid giving away information on whether the account exists. In addition, this disables certain features that as a side-effect allow user enumeration. Enabling this toggle disables the fetchSignInMethodsForEmail functionality and changing the user's email to an unverified email. It is recommended to remove dependence on this functionality and enable this toggle to improve user privacy. */
  enableImprovedEmailPrivacy?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enableImprovedEmailPrivacy: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig {
  /** Open code in app domain to use for app links and universal links. */
  domain?:
    | "DOMAIN_UNSPECIFIED"
    | "FIREBASE_DYNAMIC_LINK_DOMAIN"
    | "HOSTING_DOMAIN"
    | (string & {});
}

export const GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      domain: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2Config {
  /** Output only. The name of the Config resource. Example: "projects/my-awesome-project/config" */
  name?: string;
  /** Configuration related to local sign in methods. */
  signIn?: GoogleCloudIdentitytoolkitAdminV2SignInConfig;
  /** Configuration related to sending notifications to users. */
  notification?: GoogleCloudIdentitytoolkitAdminV2NotificationConfig;
  /** Configuration related to quotas. */
  quota?: GoogleCloudIdentitytoolkitAdminV2QuotaConfig;
  /** Configuration related to monitoring project activity. */
  monitoring?: GoogleCloudIdentitytoolkitAdminV2MonitoringConfig;
  /** Configuration related to multi-tenant functionality. */
  multiTenant?: GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig;
  /** List of domains authorized for OAuth redirects */
  authorizedDomains?: Array<string>;
  /** Output only. The subtype of this config. */
  subtype?:
    | "SUBTYPE_UNSPECIFIED"
    | "IDENTITY_PLATFORM"
    | "FIREBASE_AUTH"
    | (string & {});
  /** Options related to how clients making requests on behalf of a project should be configured. */
  client?: GoogleCloudIdentitytoolkitAdminV2ClientConfig;
  /** Configuration for this project's multi-factor authentication, including whether it is active and what factors can be used for the second factor */
  mfa?: GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig;
  /** Configuration related to blocking functions. */
  blockingFunctions?: GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig;
  /** The project-level reCAPTCHA config. */
  recaptchaConfig?: GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig;
  /** Configures which regions are enabled for SMS verification code sending. */
  smsRegionConfig?: GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig;
  /** Whether anonymous users will be auto-deleted after a period of 30 days. */
  autodeleteAnonymousUsers?: boolean;
  /** The project level password policy configuration. */
  passwordPolicyConfig?: GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig;
  /** Configuration for settings related to email privacy and public visibility. */
  emailPrivacyConfig?: GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig;
  /** Configuration for settings related to univeral links (iOS) and app links (Android). */
  mobileLinksConfig?: GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig;
  /** Output only. Default Firebase hosting site name */
  defaultHostingSite?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2Config: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Config> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      signIn: Schema.optional(GoogleCloudIdentitytoolkitAdminV2SignInConfig),
      notification: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2NotificationConfig,
      ),
      quota: Schema.optional(GoogleCloudIdentitytoolkitAdminV2QuotaConfig),
      monitoring: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MonitoringConfig,
      ),
      multiTenant: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MultiTenantConfig,
      ),
      authorizedDomains: Schema.optional(Schema.Array(Schema.String)),
      subtype: Schema.optional(Schema.String),
      client: Schema.optional(GoogleCloudIdentitytoolkitAdminV2ClientConfig),
      mfa: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig,
      ),
      blockingFunctions: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2BlockingFunctionsConfig,
      ),
      recaptchaConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig,
      ),
      smsRegionConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig,
      ),
      autodeleteAnonymousUsers: Schema.optional(Schema.Boolean),
      passwordPolicyConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig,
      ),
      emailPrivacyConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig,
      ),
      mobileLinksConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig,
      ),
      defaultHostingSite: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Config",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Config>;

export interface GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig {
  /** Apple Developer Team ID. */
  teamId?: string;
  /** Key ID for the private key. */
  keyId?: string;
  /** Private key used for signing the client secret JWT. */
  privateKey?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      teamId: Schema.optional(Schema.String),
      keyId: Schema.optional(Schema.String),
      privateKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig {
  /** Additional config for Apple for code flow. */
  codeFlowConfig?: GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig;
  /** A list of Bundle ID's usable by this project */
  bundleIds?: Array<string>;
}

export const GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      codeFlowConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2CodeFlowConfig,
      ),
      bundleIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig {
  /** The name of the DefaultSupportedIdpConfig resource, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name?: string;
  /** True if allows the user to sign in with the provider. */
  enabled?: boolean;
  /** OAuth client ID. */
  clientId?: string;
  /** OAuth client secret. */
  clientSecret?: string;
  /** Additional config for Apple-based projects. */
  appleSignInConfig?: GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig;
}

export const GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      appleSignInConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2AppleSignInConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp {
  /** Id the of Idp */
  idpId?: string;
  /** Description of the Idp */
  description?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp> =
  Schema.suspend(() =>
    Schema.Struct({
      idpId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp>;

export interface GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse {
  /** The set of configs. */
  defaultSupportedIdps?: Array<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultSupportedIdps: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdp),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse>;

export interface GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse {
  /** The set of configs. */
  defaultSupportedIdpConfigs?: Array<GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultSupportedIdpConfigs: Schema.optional(
        Schema.Array(
          GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse>;

export interface GoogleCloudIdentitytoolkitAdminV2OAuthResponseType {
  /** If true, ID token is returned from IdP's authorization endpoint. */
  idToken?: boolean;
  /** If true, authorization code is returned from IdP's authorization endpoint. */
  code?: boolean;
  /** Do not use. The `token` response type is not supported at the moment. */
  token?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2OAuthResponseType: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2OAuthResponseType> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.Boolean),
      code: Schema.optional(Schema.Boolean),
      token: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2OAuthResponseType",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2OAuthResponseType>;

export interface GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig {
  /** The name of the OAuthIdpConfig resource, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. Ignored during create requests. */
  name?: string;
  /** The client id of an OAuth client. */
  clientId?: string;
  /** For OIDC Idps, the issuer identifier. */
  issuer?: string;
  /** The config's display name set by developers. */
  displayName?: string;
  /** True if allows the user to sign in with the provider. */
  enabled?: boolean;
  /** The client secret of the OAuth client, to enable OIDC code flow. */
  clientSecret?: string;
  /** The response type to request for in the OAuth authorization flow. You can set either `id_token` or `code` to true, but not both. Setting both types to be simultaneously true (`{code: true, id_token: true}`) is not yet supported. */
  responseType?: GoogleCloudIdentitytoolkitAdminV2OAuthResponseType;
}

export const GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
      clientSecret: Schema.optional(Schema.String),
      responseType: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2OAuthResponseType,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse {
  /** The set of configs. */
  oauthIdpConfigs?: Array<GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      oauthIdpConfigs: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse>;

export interface GoogleCloudIdentitytoolkitAdminV2IdpCertificate {
  /** The x509 certificate */
  x509Certificate?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2IdpCertificate: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2IdpCertificate> =
  Schema.suspend(() =>
    Schema.Struct({
      x509Certificate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2IdpCertificate",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2IdpCertificate>;

export interface GoogleCloudIdentitytoolkitAdminV2IdpConfig {
  /** Unique identifier for all SAML entities. */
  idpEntityId?: string;
  /** URL to send Authentication request to. */
  ssoUrl?: string;
  /** IDP's public keys for verifying signature in the assertions. */
  idpCertificates?: Array<GoogleCloudIdentitytoolkitAdminV2IdpCertificate>;
  /** Indicates if outbounding SAMLRequest should be signed. */
  signRequest?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2IdpConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2IdpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      idpEntityId: Schema.optional(Schema.String),
      ssoUrl: Schema.optional(Schema.String),
      idpCertificates: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2IdpCertificate),
      ),
      signRequest: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2IdpConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2IdpConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2SpCertificate {
  /** Self-signed public certificate. */
  x509Certificate?: string;
  /** Timestamp of the cert expiration instance. */
  expiresAt?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2SpCertificate: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SpCertificate> =
  Schema.suspend(() =>
    Schema.Struct({
      x509Certificate: Schema.optional(Schema.String),
      expiresAt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SpCertificate",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SpCertificate>;

export interface GoogleCloudIdentitytoolkitAdminV2SpConfig {
  /** Unique identifier for all SAML entities. */
  spEntityId?: string;
  /** Callback URI where responses from IDP are handled. */
  callbackUri?: string;
  /** Output only. Public certificates generated by the server to verify the signature in SAMLRequest in the SP-initiated flow. */
  spCertificates?: Array<GoogleCloudIdentitytoolkitAdminV2SpCertificate>;
}

export const GoogleCloudIdentitytoolkitAdminV2SpConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      spEntityId: Schema.optional(Schema.String),
      callbackUri: Schema.optional(Schema.String),
      spCertificates: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2SpCertificate),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2SpConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2SpConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig {
  /** The name of the InboundSamlConfig resource, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. Ignored during create requests. */
  name?: string;
  /** The SAML IdP (Identity Provider) configuration when the project acts as the relying party. */
  idpConfig?: GoogleCloudIdentitytoolkitAdminV2IdpConfig;
  /** The SAML SP (Service Provider) configuration when the project acts as the relying party to receive and accept an authentication assertion issued by a SAML identity provider. */
  spConfig?: GoogleCloudIdentitytoolkitAdminV2SpConfig;
  /** The config's display name set by developers. */
  displayName?: string;
  /** True if allows the user to sign in with the provider. */
  enabled?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      idpConfig: Schema.optional(GoogleCloudIdentitytoolkitAdminV2IdpConfig),
      spConfig: Schema.optional(GoogleCloudIdentitytoolkitAdminV2SpConfig),
      displayName: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse {
  /** The set of configs. */
  inboundSamlConfigs?: Array<GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      inboundSamlConfigs: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse>;

export interface GoogleTypeExpr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(
  () =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "GoogleTypeExpr",
}) as any as Schema.Schema<GoogleTypeExpr>;

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> =
  Schema.suspend(() =>
    Schema.Struct({
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
      condition: Schema.optional(GoogleTypeExpr),
    }),
  ).annotate({
    identifier: "GoogleIamV1Binding",
  }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleIamV1AuditLogConfig {
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleIamV1AuditLogConfig",
  }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
    }),
  ).annotate({
    identifier: "GoogleIamV1AuditConfig",
  }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleIamV1Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
      auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleIamV1Policy",
  }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleIamV1SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: GoogleIamV1Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const GoogleIamV1SetIamPolicyRequest: Schema.Schema<GoogleIamV1SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(GoogleIamV1Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleIamV1SetIamPolicyRequest",
  }) as any as Schema.Schema<GoogleIamV1SetIamPolicyRequest>;

export interface GoogleIamV1GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GoogleIamV1GetPolicyOptions: Schema.Schema<GoogleIamV1GetPolicyOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      requestedPolicyVersion: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleIamV1GetPolicyOptions",
  }) as any as Schema.Schema<GoogleIamV1GetPolicyOptions>;

export interface GoogleIamV1GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GoogleIamV1GetPolicyOptions;
}

export const GoogleIamV1GetIamPolicyRequest: Schema.Schema<GoogleIamV1GetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(GoogleIamV1GetPolicyOptions),
    }),
  ).annotate({
    identifier: "GoogleIamV1GetIamPolicyRequest",
  }) as any as Schema.Schema<GoogleIamV1GetIamPolicyRequest>;

export interface GoogleIamV1TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsRequest: Schema.Schema<GoogleIamV1TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleIamV1TestIamPermissionsRequest",
  }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsRequest>;

export interface GoogleIamV1TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsResponse: Schema.Schema<GoogleIamV1TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleIamV1TestIamPermissionsResponse",
  }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsResponse>;

export interface GoogleCloudIdentitytoolkitAdminV2Inheritance {
  /** Whether to allow the tenant to inherit custom domains, email templates, and custom SMTP settings. If true, email sent from tenant will follow the project level email sending configurations. If false (by default), emails will go with the default settings with no customizations. */
  emailSendingConfig?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2Inheritance: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Inheritance> =
  Schema.suspend(() =>
    Schema.Struct({
      emailSendingConfig: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Inheritance",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Inheritance>;

export interface GoogleCloudIdentitytoolkitAdminV2ClientPermissions {
  /** When true, end users cannot sign up for a new account on the associated project through any of our API methods */
  disabledUserSignup?: boolean;
  /** When true, end users cannot delete their account on the associated project through any of our API methods */
  disabledUserDeletion?: boolean;
}

export const GoogleCloudIdentitytoolkitAdminV2ClientPermissions: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ClientPermissions> =
  Schema.suspend(() =>
    Schema.Struct({
      disabledUserSignup: Schema.optional(Schema.Boolean),
      disabledUserDeletion: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ClientPermissions",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ClientPermissions>;

export interface GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig {
  /** Configuration related to restricting a user's ability to affect their account. */
  permissions?: GoogleCloudIdentitytoolkitAdminV2ClientPermissions;
}

export const GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2ClientPermissions,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig>;

export interface GoogleCloudIdentitytoolkitAdminV2Tenant {
  /** Output only. Resource name of a tenant. For example: "projects/{project-id}/tenants/{tenant-id}" */
  name?: string;
  /** Display name of the tenant. */
  displayName?: string;
  /** Whether to allow email/password user authentication. */
  allowPasswordSignup?: boolean;
  /** Whether to enable email link user authentication. */
  enableEmailLinkSignin?: boolean;
  /** Whether authentication is disabled for the tenant. If true, the users under the disabled tenant are not allowed to sign-in. Admins of the disabled tenant are not able to manage its users. */
  disableAuth?: boolean;
  /** Output only. Hash config information of a tenant for display on Pantheon. This can only be displayed on Pantheon to avoid the sensitive information to get accidentally leaked. Only returned in GetTenant response to restrict reading of this information. Requires firebaseauth.configs.getHashConfig permission on the agent project for returning this field. */
  hashConfig?: GoogleCloudIdentitytoolkitAdminV2HashConfig;
  /** Whether to enable anonymous user authentication. */
  enableAnonymousUser?: boolean;
  /** The tenant-level configuration of MFA options. */
  mfaConfig?: GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig;
  /** A map of pairs that can be used for MFA. The phone number should be in E.164 format (https://www.itu.int/rec/T-REC-E.164/) and a maximum of 10 pairs can be added (error will be thrown once exceeded). */
  testPhoneNumbers?: Record<string, string>;
  /** Specify the settings that the tenant could inherit. */
  inheritance?: GoogleCloudIdentitytoolkitAdminV2Inheritance;
  /** The tenant-level reCAPTCHA config. */
  recaptchaConfig?: GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig;
  /** Configures which regions are enabled for SMS verification code sending. */
  smsRegionConfig?: GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig;
  /** Whether anonymous users will be auto-deleted after a period of 30 days. */
  autodeleteAnonymousUsers?: boolean;
  /** Configuration related to monitoring project activity. */
  monitoring?: GoogleCloudIdentitytoolkitAdminV2MonitoringConfig;
  /** The tenant-level password policy config */
  passwordPolicyConfig?: GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig;
  /** Configuration for settings related to email privacy and public visibility. */
  emailPrivacyConfig?: GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig;
  /** Options related to how clients making requests on behalf of a project should be configured. */
  client?: GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig;
  /** Optional. Deprecated. Never launched. Configuration for settings related to univeral links (iOS) and app links (Android). */
  mobileLinksConfig?: GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig;
}

export const GoogleCloudIdentitytoolkitAdminV2Tenant: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Tenant> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      allowPasswordSignup: Schema.optional(Schema.Boolean),
      enableEmailLinkSignin: Schema.optional(Schema.Boolean),
      disableAuth: Schema.optional(Schema.Boolean),
      hashConfig: Schema.optional(GoogleCloudIdentitytoolkitAdminV2HashConfig),
      enableAnonymousUser: Schema.optional(Schema.Boolean),
      mfaConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MultiFactorAuthConfig,
      ),
      testPhoneNumbers: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      inheritance: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2Inheritance,
      ),
      recaptchaConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2RecaptchaConfig,
      ),
      smsRegionConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2SmsRegionConfig,
      ),
      autodeleteAnonymousUsers: Schema.optional(Schema.Boolean),
      monitoring: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MonitoringConfig,
      ),
      passwordPolicyConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2PasswordPolicyConfig,
      ),
      emailPrivacyConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2EmailPrivacyConfig,
      ),
      client: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2ClientPermissionConfig,
      ),
      mobileLinksConfig: Schema.optional(
        GoogleCloudIdentitytoolkitAdminV2MobileLinksConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2Tenant",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2Tenant>;

export interface GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse {
  /** A list of tenants under the given agent project. */
  tenants?: Array<GoogleCloudIdentitytoolkitAdminV2Tenant>;
  /** The token to get the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse: Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      tenants: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitAdminV2Tenant),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo {
  /** An opaque string that represents the enrollment session. */
  sessionInfo?: string;
  /** User-entered verification code. */
  code?: string;
  /** Android only. Uses for "instant" phone number verification though GmsCore. */
  androidVerificationProof?: string;
  /** Required if Android verification proof is presented. */
  phoneNumber?: string;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      sessionInfo: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      androidVerificationProof: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo {
  /** An opaque string that represents the enrollment session. */
  sessionInfo?: string;
  /** User-entered verification code. */
  verificationCode?: string;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      sessionInfo: Schema.optional(Schema.String),
      verificationCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest {
  /** Required. ID token. */
  idToken?: string;
  /** Display name which is entered by users to distinguish between different second factors with same type or different type. */
  displayName?: string;
  /** Verification info to authorize sending an SMS for phone verification. */
  phoneVerificationInfo?: GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo;
  /** Verification information for TOTP. */
  totpVerificationInfo?: GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo;
  /** The ID of the Identity Platform tenant that the user enrolling MFA belongs to. If not set, the user belongs to the default Identity Platform project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      phoneVerificationInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo,
      ),
      totpVerificationInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentRequestInfo,
      ),
      tenantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo {
  /** Android only. Long-lived replacement for valid code tied to android device. */
  androidVerificationProof?: string;
  /** Android only. Expiration time of verification proof in seconds. */
  androidVerificationProofExpireTime?: string;
  /** For Android verification proof. */
  phoneNumber?: string;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      androidVerificationProof: Schema.optional(Schema.String),
      androidVerificationProofExpireTime: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo {}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse {
  /** ID token updated to reflect MFA enrollment. */
  idToken?: string;
  /** Refresh token updated to reflect MFA enrollment. */
  refreshToken?: string;
  /** Auxiliary auth info specific to phone auth. */
  phoneAuthInfo?: GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo;
  /** Auxiliary auth info specific to TOTP auth. */
  totpAuthInfo?: GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.String),
      refreshToken: Schema.optional(Schema.String),
      phoneAuthInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo,
      ),
      totpAuthInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2FinalizeMfaTotpEnrollmentResponseInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse>;

export interface GoogleCloudIdentitytoolkitV2AutoRetrievalInfo {
  /** The Android app's signature hash for Google Play Service's SMS Retriever API. */
  appSignatureHash?: string;
}

export const GoogleCloudIdentitytoolkitV2AutoRetrievalInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2AutoRetrievalInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      appSignatureHash: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2AutoRetrievalInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2AutoRetrievalInfo>;

export interface GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo {
  /** Required for enrollment. Phone number to be enrolled as MFA. */
  phoneNumber?: string;
  /** iOS only. Receipt of successful app token validation with APNS. */
  iosReceipt?: string;
  /** iOS only. Secret delivered to iOS app via APNS. */
  iosSecret?: string;
  /** Web only. Recaptcha solution. */
  recaptchaToken?: string;
  /** Android only. Used by Google Play Services to identify the app for auto-retrieval. */
  autoRetrievalInfo?: GoogleCloudIdentitytoolkitV2AutoRetrievalInfo;
  /** Android only. Used to assert application identity in place of a recaptcha token. A SafetyNet Token can be generated via the [SafetyNet Android Attestation API](https://developer.android.com/training/safetynet/attestation.html), with the Base64 encoding of the `phone_number` field as the nonce. */
  safetyNetToken?: string;
  /** Android only. Used to assert application identity in place of a recaptcha token (or safety net token). A Play Integrity Token can be generated via the [PlayIntegrity API] (https://developer.android.com/google/play/integrity) with applying SHA256 to the `phone_number` field as the nonce. */
  playIntegrityToken?: string;
  /** The reCAPTCHA Enterprise token provided by the reCAPTCHA client-side integration. Required when reCAPTCHA enterprise is enabled. */
  captchaResponse?: string;
  /** The client type, web, android or ios. Required when reCAPTCHA Enterprise is enabled. */
  clientType?:
    | "CLIENT_TYPE_UNSPECIFIED"
    | "CLIENT_TYPE_WEB"
    | "CLIENT_TYPE_ANDROID"
    | "CLIENT_TYPE_IOS"
    | (string & {});
  /** The reCAPTCHA version of the reCAPTCHA token in the captcha_response. Required when reCAPTCHA Enterprise is enabled. */
  recaptchaVersion?:
    | "RECAPTCHA_VERSION_UNSPECIFIED"
    | "RECAPTCHA_ENTERPRISE"
    | (string & {});
}

export const GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
      iosReceipt: Schema.optional(Schema.String),
      iosSecret: Schema.optional(Schema.String),
      recaptchaToken: Schema.optional(Schema.String),
      autoRetrievalInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2AutoRetrievalInfo,
      ),
      safetyNetToken: Schema.optional(Schema.String),
      playIntegrityToken: Schema.optional(Schema.String),
      captchaResponse: Schema.optional(Schema.String),
      clientType: Schema.optional(Schema.String),
      recaptchaVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo>;

export interface GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo {}

export const GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo>;

export interface GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest {
  /** Required. User's ID token. */
  idToken?: string;
  /** Verification info to authorize sending an SMS for phone verification. */
  phoneEnrollmentInfo?: GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo;
  /** Sign-in info specific to TOTP auth. */
  totpEnrollmentInfo?: GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo;
  /** The ID of the Identity Platform tenant that the user enrolling MFA belongs to. If not set, the user belongs to the default Identity Platform project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.String),
      phoneEnrollmentInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo,
      ),
      totpEnrollmentInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentRequestInfo,
      ),
      tenantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest>;

export interface GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo {
  /** An opaque string that represents the enrollment session. */
  sessionInfo?: string;
}

export const GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      sessionInfo: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo>;

export interface GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo {
  /** A base 32 encoded string that represents the shared TOTP secret. The base 32 encoding is the one specified by [RFC4648#section-6](https://datatracker.ietf.org/doc/html/rfc4648#section-6). (This is the same as the base 32 encoding from [RFC3548#section-5](https://datatracker.ietf.org/doc/html/rfc3548#section-5).) */
  sharedSecretKey?: string;
  /** The length of the verification code that needs to be generated. */
  verificationCodeLength?: number;
  /** The hashing algorithm used to generate the verification code. */
  hashingAlgorithm?: string;
  /** Duration in seconds at which the verification code will change. */
  periodSec?: number;
  /** An encoded string that represents the enrollment session. */
  sessionInfo?: string;
  /** The time by which the enrollment must finish. */
  finalizeEnrollmentTime?: string;
}

export const GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      sharedSecretKey: Schema.optional(Schema.String),
      verificationCodeLength: Schema.optional(Schema.Number),
      hashingAlgorithm: Schema.optional(Schema.String),
      periodSec: Schema.optional(Schema.Number),
      sessionInfo: Schema.optional(Schema.String),
      finalizeEnrollmentTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo>;

export interface GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse {
  /** Verification info to authorize sending an SMS for phone verification. */
  phoneSessionInfo?: GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo;
  /** Enrollment response info specific to TOTP auth. */
  totpSessionInfo?: GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo;
}

export const GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      phoneSessionInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo,
      ),
      totpSessionInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2StartMfaTotpEnrollmentResponseInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse>;

export interface GoogleCloudIdentitytoolkitV2WithdrawMfaRequest {
  /** Required. User's ID token. */
  idToken?: string;
  /** Required. MFA enrollment id from a current MFA enrollment. */
  mfaEnrollmentId?: string;
  /** The ID of the Identity Platform tenant that the user unenrolling MFA belongs to. If not set, the user belongs to the default Identity Platform project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV2WithdrawMfaRequest: Schema.Schema<GoogleCloudIdentitytoolkitV2WithdrawMfaRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.String),
      mfaEnrollmentId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2WithdrawMfaRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2WithdrawMfaRequest>;

export interface GoogleCloudIdentitytoolkitV2WithdrawMfaResponse {
  /** ID token updated to reflect removal of the second factor. */
  idToken?: string;
  /** Refresh token updated to reflect removal of the second factor. */
  refreshToken?: string;
}

export const GoogleCloudIdentitytoolkitV2WithdrawMfaResponse: Schema.Schema<GoogleCloudIdentitytoolkitV2WithdrawMfaResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.String),
      refreshToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2WithdrawMfaResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2WithdrawMfaResponse>;

export interface GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo {
  /** User-entered verification code. */
  verificationCode?: string;
}

export const GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo: Schema.Schema<GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      verificationCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest {
  /** Required. Pending credential from first factor sign-in. */
  mfaPendingCredential?: string;
  /** Proof of completion of the SMS based MFA challenge. */
  phoneVerificationInfo?: GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo;
  /** Proof of completion of the TOTP based MFA challenge. */
  totpVerificationInfo?: GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo;
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. */
  tenantId?: string;
  /** The MFA enrollment ID from the user's list of current MFA enrollments. */
  mfaEnrollmentId?: string;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      mfaPendingCredential: Schema.optional(Schema.String),
      phoneVerificationInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneRequestInfo,
      ),
      totpVerificationInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2MfaTotpSignInRequestInfo,
      ),
      tenantId: Schema.optional(Schema.String),
      mfaEnrollmentId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest>;

export interface GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse {
  /** ID token for the authenticated user. */
  idToken?: string;
  /** Refresh token for the authenticated user. */
  refreshToken?: string;
  /** Extra phone auth info, including android verification proof. */
  phoneAuthInfo?: GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo;
}

export const GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse: Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      idToken: Schema.optional(Schema.String),
      refreshToken: Schema.optional(Schema.String),
      phoneAuthInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2FinalizeMfaPhoneResponseInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse>;

export interface GoogleCloudIdentitytoolkitV2StartMfaSignInRequest {
  /** Required. Pending credential from first factor sign-in. */
  mfaPendingCredential?: string;
  /** Required. MFA enrollment id from the user's list of current MFA enrollments. */
  mfaEnrollmentId?: string;
  /** Verification info to authorize sending an SMS for phone verification. */
  phoneSignInInfo?: GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo;
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV2StartMfaSignInRequest: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaSignInRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      mfaPendingCredential: Schema.optional(Schema.String),
      mfaEnrollmentId: Schema.optional(Schema.String),
      phoneSignInInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2StartMfaPhoneRequestInfo,
      ),
      tenantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaSignInRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaSignInRequest>;

export interface GoogleCloudIdentitytoolkitV2StartMfaSignInResponse {
  /** MultiFactor sign-in session information specific to SMS-type second factors. Along with the one-time code retrieved from the sent SMS, the contents of this session information should be passed to FinalizeMfaSignIn to complete the sign in. */
  phoneResponseInfo?: GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo;
}

export const GoogleCloudIdentitytoolkitV2StartMfaSignInResponse: Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaSignInResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      phoneResponseInfo: Schema.optional(
        GoogleCloudIdentitytoolkitV2StartMfaPhoneResponseInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2StartMfaSignInResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2StartMfaSignInResponse>;

export interface GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState {
  /** The provider that has reCAPTCHA protection. */
  provider?:
    | "RECAPTCHA_PROVIDER_UNSPECIFIED"
    | "EMAIL_PASSWORD_PROVIDER"
    | "PHONE_PROVIDER"
    | (string & {});
  /** The reCAPTCHA enforcement state for the provider. */
  enforcementState?:
    | "ENFORCEMENT_STATE_UNSPECIFIED"
    | "OFF"
    | "AUDIT"
    | "ENFORCE"
    | (string & {});
}

export const GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState: Schema.Schema<GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState> =
  Schema.suspend(() =>
    Schema.Struct({
      provider: Schema.optional(Schema.String),
      enforcementState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState>;

export interface GoogleCloudIdentitytoolkitV2RecaptchaConfig {
  /** The reCAPTCHA Enterprise key resource name, e.g. "projects/{project}/keys/{key}". This will only be returned when the reCAPTCHA enforcement state is AUDIT or ENFORCE on at least one of the reCAPTCHA providers. */
  recaptchaKey?: string;
  /** The reCAPTCHA enforcement state for the providers that GCIP supports reCAPTCHA protection. */
  recaptchaEnforcementState?: Array<GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState>;
  /** Whether to use the rCE bot score for reCAPTCHA phone provider. */
  useSmsBotScore?: boolean;
  /** Whether to use the rCE sms toll fraud protection risk score for reCAPTCHA phone provider. */
  useSmsTollFraudProtection?: boolean;
}

export const GoogleCloudIdentitytoolkitV2RecaptchaConfig: Schema.Schema<GoogleCloudIdentitytoolkitV2RecaptchaConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      recaptchaKey: Schema.optional(Schema.String),
      recaptchaEnforcementState: Schema.optional(
        Schema.Array(GoogleCloudIdentitytoolkitV2RecaptchaEnforcementState),
      ),
      useSmsBotScore: Schema.optional(Schema.Boolean),
      useSmsTollFraudProtection: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2RecaptchaConfig",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2RecaptchaConfig>;

export interface GoogleCloudIdentitytoolkitV2CustomStrengthOptions {
  /** Minimum password length. Range from 6 to 30 */
  minPasswordLength?: number;
  /** Maximum password length. No default max length */
  maxPasswordLength?: number;
  /** The password must contain a lower case character. */
  containsLowercaseCharacter?: boolean;
  /** The password must contain an upper case character. */
  containsUppercaseCharacter?: boolean;
  /** The password must contain a number. */
  containsNumericCharacter?: boolean;
  /** The password must contain a non alpha numeric character. */
  containsNonAlphanumericCharacter?: boolean;
}

export const GoogleCloudIdentitytoolkitV2CustomStrengthOptions: Schema.Schema<GoogleCloudIdentitytoolkitV2CustomStrengthOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      minPasswordLength: Schema.optional(Schema.Number),
      maxPasswordLength: Schema.optional(Schema.Number),
      containsLowercaseCharacter: Schema.optional(Schema.Boolean),
      containsUppercaseCharacter: Schema.optional(Schema.Boolean),
      containsNumericCharacter: Schema.optional(Schema.Boolean),
      containsNonAlphanumericCharacter: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2CustomStrengthOptions",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2CustomStrengthOptions>;

export interface GoogleCloudIdentitytoolkitV2PasswordPolicy {
  /** The custom strength options enforced by the password policy. */
  customStrengthOptions?: GoogleCloudIdentitytoolkitV2CustomStrengthOptions;
  /** Output only. schema version number for the password policy */
  schemaVersion?: number;
  /** Output only. Allowed characters which satisfy the non_alphanumeric requirement. */
  allowedNonAlphanumericCharacters?: Array<string>;
  /** Output only. Which enforcement mode to use for the password policy. */
  enforcementState?:
    | "ENFORCEMENT_STATE_UNSPECIFIED"
    | "OFF"
    | "ENFORCE"
    | (string & {});
  /** Users must have a password compliant with the password policy to sign-in. */
  forceUpgradeOnSignin?: boolean;
}

export const GoogleCloudIdentitytoolkitV2PasswordPolicy: Schema.Schema<GoogleCloudIdentitytoolkitV2PasswordPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      customStrengthOptions: Schema.optional(
        GoogleCloudIdentitytoolkitV2CustomStrengthOptions,
      ),
      schemaVersion: Schema.optional(Schema.Number),
      allowedNonAlphanumericCharacters: Schema.optional(
        Schema.Array(Schema.String),
      ),
      enforcementState: Schema.optional(Schema.String),
      forceUpgradeOnSignin: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2PasswordPolicy",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2PasswordPolicy>;

export interface GoogleCloudIdentitytoolkitV2RevokeTokenRequest {
  /** Required. The idp provider for the token. Currently only supports Apple Idp. The format should be "apple.com". */
  providerId?: string;
  /** Required. The type of the token to be revoked. */
  tokenType?:
    | "TOKEN_TYPE_UNSPECIFIED"
    | "REFRESH_TOKEN"
    | "ACCESS_TOKEN"
    | "CODE"
    | (string & {});
  /** Required. The token to be revoked. If an authorization_code is passed in, the API will first exchange the code for access token and then revoke the token exchanged. */
  token?: string;
  /** Required. A valid Identity Platform ID token to link the account. If there was a successful token revocation request on the account and no tokens are generated after the revocation, the duplicate requests will be ignored and returned immediately. */
  idToken?: string;
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. */
  tenantId?: string;
  /** The redirect URI provided in the initial authorization request made by the client to the IDP. The URI must use the HTTPS protocol, include a domain name, and can't contain an IP address or localhost. Required if token_type is CODE. */
  redirectUri?: string;
}

export const GoogleCloudIdentitytoolkitV2RevokeTokenRequest: Schema.Schema<GoogleCloudIdentitytoolkitV2RevokeTokenRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      providerId: Schema.optional(Schema.String),
      tokenType: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      idToken: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      redirectUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2RevokeTokenRequest",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2RevokeTokenRequest>;

export interface GoogleCloudIdentitytoolkitV2RevokeTokenResponse {}

export const GoogleCloudIdentitytoolkitV2RevokeTokenResponse: Schema.Schema<GoogleCloudIdentitytoolkitV2RevokeTokenResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudIdentitytoolkitV2RevokeTokenResponse",
  }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV2RevokeTokenResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetConfigProjectsRequest {
  /** The resource name of the config, for example: "projects/my-awesome-project/config" */
  name: string;
}

export const GetConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsRequest>;

export type GetConfigProjectsResponse = GoogleCloudIdentitytoolkitAdminV2Config;
export const GetConfigProjectsResponse =
  GoogleCloudIdentitytoolkitAdminV2Config;

export type GetConfigProjectsError = DefaultErrors;

/** Retrieve an Identity Toolkit project configuration. */
export const getConfigProjects: API.OperationMethod<
  GetConfigProjectsRequest,
  GetConfigProjectsResponse,
  GetConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetConfigProjectsRequest,
  output: GetConfigProjectsResponse,
  errors: [],
}));

export interface UpdateConfigProjectsRequest {
  /** Output only. The name of the Config resource. Example: "projects/my-awesome-project/config" */
  name: string;
  /** The update mask applies to the resource. Fields set in the config but not included in this update mask will be ignored. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2Config;
}

export const UpdateConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2Config).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/config",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateConfigProjectsRequest>;

export type UpdateConfigProjectsResponse =
  GoogleCloudIdentitytoolkitAdminV2Config;
export const UpdateConfigProjectsResponse =
  GoogleCloudIdentitytoolkitAdminV2Config;

export type UpdateConfigProjectsError = DefaultErrors;

/** Update an Identity Toolkit project configuration. */
export const updateConfigProjects: API.OperationMethod<
  UpdateConfigProjectsRequest,
  UpdateConfigProjectsResponse,
  UpdateConfigProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateConfigProjectsRequest,
  output: UpdateConfigProjectsResponse,
  errors: [],
}));

export interface InitializeAuthProjectsIdentityPlatformRequest {
  /** The resource name of the target project the developer wants to enable Identity Platform for. */
  project: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest;
}

export const InitializeAuthProjectsIdentityPlatformRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/identityPlatform:initializeAuth",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InitializeAuthProjectsIdentityPlatformRequest>;

export type InitializeAuthProjectsIdentityPlatformResponse =
  GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse;
export const InitializeAuthProjectsIdentityPlatformResponse =
  GoogleCloudIdentitytoolkitAdminV2InitializeIdentityPlatformResponse;

export type InitializeAuthProjectsIdentityPlatformError = DefaultErrors;

/** Initialize Identity Platform for a Cloud project. Identity Platform is an end-to-end authentication system for third-party users to access your apps and services. These could include mobile/web apps, games, APIs and beyond. This is the publicly available variant of EnableIdentityPlatform that is only available to billing-enabled projects. */
export const initializeAuthProjectsIdentityPlatform: API.OperationMethod<
  InitializeAuthProjectsIdentityPlatformRequest,
  InitializeAuthProjectsIdentityPlatformResponse,
  InitializeAuthProjectsIdentityPlatformError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InitializeAuthProjectsIdentityPlatformRequest,
  output: InitializeAuthProjectsIdentityPlatformResponse,
  errors: [],
}));

export interface CreateProjectsDefaultSupportedIdpConfigsRequest {
  /** The parent resource name where the config to be created, for example: "projects/my-awesome-project" */
  parent: string;
  /** The id of the Idp to create a config for. Call ListDefaultSupportedIdps for list of all default supported Idps. */
  idpId?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
}

export const CreateProjectsDefaultSupportedIdpConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  idpId: Schema.optional(Schema.String).pipe(T.HttpQuery("idpId")),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/defaultSupportedIdpConfigs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDefaultSupportedIdpConfigsRequest>;

export type CreateProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
export const CreateProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;

export type CreateProjectsDefaultSupportedIdpConfigsError = DefaultErrors;

/** Create a default supported Idp configuration for an Identity Toolkit project. */
export const createProjectsDefaultSupportedIdpConfigs: API.OperationMethod<
  CreateProjectsDefaultSupportedIdpConfigsRequest,
  CreateProjectsDefaultSupportedIdpConfigsResponse,
  CreateProjectsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsDefaultSupportedIdpConfigsRequest,
  output: CreateProjectsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsDefaultSupportedIdpConfigsRequest {
  /** The resource name of the config, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name: string;
}

export const DeleteProjectsDefaultSupportedIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2/projects/{projectsId}/defaultSupportedIdpConfigs/{defaultSupportedIdpConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDefaultSupportedIdpConfigsRequest>;

export type DeleteProjectsDefaultSupportedIdpConfigsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsDefaultSupportedIdpConfigsResponse =
  GoogleProtobufEmpty;

export type DeleteProjectsDefaultSupportedIdpConfigsError = DefaultErrors;

/** Delete a default supported Idp configuration for an Identity Toolkit project. */
export const deleteProjectsDefaultSupportedIdpConfigs: API.OperationMethod<
  DeleteProjectsDefaultSupportedIdpConfigsRequest,
  DeleteProjectsDefaultSupportedIdpConfigsResponse,
  DeleteProjectsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsDefaultSupportedIdpConfigsRequest,
  output: DeleteProjectsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface GetProjectsDefaultSupportedIdpConfigsRequest {
  /** The resource name of the config, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name: string;
}

export const GetProjectsDefaultSupportedIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/defaultSupportedIdpConfigs/{defaultSupportedIdpConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDefaultSupportedIdpConfigsRequest>;

export type GetProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
export const GetProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;

export type GetProjectsDefaultSupportedIdpConfigsError = DefaultErrors;

/** Retrieve a default supported Idp configuration for an Identity Toolkit project. */
export const getProjectsDefaultSupportedIdpConfigs: API.OperationMethod<
  GetProjectsDefaultSupportedIdpConfigsRequest,
  GetProjectsDefaultSupportedIdpConfigsResponse,
  GetProjectsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDefaultSupportedIdpConfigsRequest,
  output: GetProjectsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface ListProjectsDefaultSupportedIdpConfigsRequest {
  /** The parent resource name, for example, "projects/my-awesome-project". */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsDefaultSupportedIdpConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/defaultSupportedIdpConfigs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsDefaultSupportedIdpConfigsRequest>;

export type ListProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse;
export const ListProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse;

export type ListProjectsDefaultSupportedIdpConfigsError = DefaultErrors;

/** List all default supported Idp configurations for an Identity Toolkit project. */
export const listProjectsDefaultSupportedIdpConfigs: API.PaginatedOperationMethod<
  ListProjectsDefaultSupportedIdpConfigsRequest,
  ListProjectsDefaultSupportedIdpConfigsResponse,
  ListProjectsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDefaultSupportedIdpConfigsRequest,
  output: ListProjectsDefaultSupportedIdpConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsDefaultSupportedIdpConfigsRequest {
  /** The name of the DefaultSupportedIdpConfig resource, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
}

export const PatchProjectsDefaultSupportedIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/defaultSupportedIdpConfigs/{defaultSupportedIdpConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDefaultSupportedIdpConfigsRequest>;

export type PatchProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
export const PatchProjectsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;

export type PatchProjectsDefaultSupportedIdpConfigsError = DefaultErrors;

/** Update a default supported Idp configuration for an Identity Toolkit project. */
export const patchProjectsDefaultSupportedIdpConfigs: API.OperationMethod<
  PatchProjectsDefaultSupportedIdpConfigsRequest,
  PatchProjectsDefaultSupportedIdpConfigsResponse,
  PatchProjectsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsDefaultSupportedIdpConfigsRequest,
  output: PatchProjectsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface CreateProjectsOauthIdpConfigsRequest {
  /** The parent resource name where the config to be created, for example: "projects/my-awesome-project" */
  parent: string;
  /** The id to use for this config. */
  oauthIdpConfigId?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
}

export const CreateProjectsOauthIdpConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  oauthIdpConfigId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("oauthIdpConfigId"),
  ),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/oauthIdpConfigs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsOauthIdpConfigsRequest>;

export type CreateProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
export const CreateProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;

export type CreateProjectsOauthIdpConfigsError = DefaultErrors;

/** Create an Oidc Idp configuration for an Identity Toolkit project. */
export const createProjectsOauthIdpConfigs: API.OperationMethod<
  CreateProjectsOauthIdpConfigsRequest,
  CreateProjectsOauthIdpConfigsResponse,
  CreateProjectsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsOauthIdpConfigsRequest,
  output: CreateProjectsOauthIdpConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsOauthIdpConfigsRequest {
  /** The resource name of the config to be deleted, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. */
  name: string;
}

export const DeleteProjectsOauthIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2/projects/{projectsId}/oauthIdpConfigs/{oauthIdpConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsOauthIdpConfigsRequest>;

export type DeleteProjectsOauthIdpConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsOauthIdpConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsOauthIdpConfigsError = DefaultErrors;

/** Delete an Oidc Idp configuration for an Identity Toolkit project. */
export const deleteProjectsOauthIdpConfigs: API.OperationMethod<
  DeleteProjectsOauthIdpConfigsRequest,
  DeleteProjectsOauthIdpConfigsResponse,
  DeleteProjectsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsOauthIdpConfigsRequest,
  output: DeleteProjectsOauthIdpConfigsResponse,
  errors: [],
}));

export interface GetProjectsOauthIdpConfigsRequest {
  /** The resource name of the config, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. */
  name: string;
}

export const GetProjectsOauthIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/oauthIdpConfigs/{oauthIdpConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsOauthIdpConfigsRequest>;

export type GetProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
export const GetProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;

export type GetProjectsOauthIdpConfigsError = DefaultErrors;

/** Retrieve an Oidc Idp configuration for an Identity Toolkit project. */
export const getProjectsOauthIdpConfigs: API.OperationMethod<
  GetProjectsOauthIdpConfigsRequest,
  GetProjectsOauthIdpConfigsResponse,
  GetProjectsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsOauthIdpConfigsRequest,
  output: GetProjectsOauthIdpConfigsResponse,
  errors: [],
}));

export interface ListProjectsOauthIdpConfigsRequest {
  /** The parent resource name, for example, "projects/my-awesome-project". */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsOauthIdpConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/oauthIdpConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOauthIdpConfigsRequest>;

export type ListProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse;
export const ListProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse;

export type ListProjectsOauthIdpConfigsError = DefaultErrors;

/** List all Oidc Idp configurations for an Identity Toolkit project. */
export const listProjectsOauthIdpConfigs: API.PaginatedOperationMethod<
  ListProjectsOauthIdpConfigsRequest,
  ListProjectsOauthIdpConfigsResponse,
  ListProjectsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsOauthIdpConfigsRequest,
  output: ListProjectsOauthIdpConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsOauthIdpConfigsRequest {
  /** The name of the OAuthIdpConfig resource, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. Ignored during create requests. */
  name: string;
  /** The update mask applies to the resource. Empty update mask will result in updating nothing. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
}

export const PatchProjectsOauthIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/oauthIdpConfigs/{oauthIdpConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsOauthIdpConfigsRequest>;

export type PatchProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
export const PatchProjectsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;

export type PatchProjectsOauthIdpConfigsError = DefaultErrors;

/** Update an Oidc Idp configuration for an Identity Toolkit project. */
export const patchProjectsOauthIdpConfigs: API.OperationMethod<
  PatchProjectsOauthIdpConfigsRequest,
  PatchProjectsOauthIdpConfigsResponse,
  PatchProjectsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsOauthIdpConfigsRequest,
  output: PatchProjectsOauthIdpConfigsResponse,
  errors: [],
}));

export interface CreateProjectsInboundSamlConfigsRequest {
  /** The parent resource name where the config to be created, for example: "projects/my-awesome-project" */
  parent: string;
  /** The id to use for this config. */
  inboundSamlConfigId?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
}

export const CreateProjectsInboundSamlConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  inboundSamlConfigId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("inboundSamlConfigId"),
  ),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/inboundSamlConfigs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInboundSamlConfigsRequest>;

export type CreateProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
export const CreateProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;

export type CreateProjectsInboundSamlConfigsError = DefaultErrors;

/** Create an inbound SAML configuration for an Identity Toolkit project. */
export const createProjectsInboundSamlConfigs: API.OperationMethod<
  CreateProjectsInboundSamlConfigsRequest,
  CreateProjectsInboundSamlConfigsResponse,
  CreateProjectsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsInboundSamlConfigsRequest,
  output: CreateProjectsInboundSamlConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsInboundSamlConfigsRequest {
  /** The resource name of the config to be deleted, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. */
  name: string;
}

export const DeleteProjectsInboundSamlConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2/projects/{projectsId}/inboundSamlConfigs/{inboundSamlConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInboundSamlConfigsRequest>;

export type DeleteProjectsInboundSamlConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsInboundSamlConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsInboundSamlConfigsError = DefaultErrors;

/** Delete an inbound SAML configuration for an Identity Toolkit project. */
export const deleteProjectsInboundSamlConfigs: API.OperationMethod<
  DeleteProjectsInboundSamlConfigsRequest,
  DeleteProjectsInboundSamlConfigsResponse,
  DeleteProjectsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsInboundSamlConfigsRequest,
  output: DeleteProjectsInboundSamlConfigsResponse,
  errors: [],
}));

export interface GetProjectsInboundSamlConfigsRequest {
  /** The resource name of the config, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. */
  name: string;
}

export const GetProjectsInboundSamlConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/inboundSamlConfigs/{inboundSamlConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsInboundSamlConfigsRequest>;

export type GetProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
export const GetProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;

export type GetProjectsInboundSamlConfigsError = DefaultErrors;

/** Retrieve an inbound SAML configuration for an Identity Toolkit project. */
export const getProjectsInboundSamlConfigs: API.OperationMethod<
  GetProjectsInboundSamlConfigsRequest,
  GetProjectsInboundSamlConfigsResponse,
  GetProjectsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsInboundSamlConfigsRequest,
  output: GetProjectsInboundSamlConfigsResponse,
  errors: [],
}));

export interface ListProjectsInboundSamlConfigsRequest {
  /** The parent resource name, for example, "projects/my-awesome-project". */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsInboundSamlConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/inboundSamlConfigs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsInboundSamlConfigsRequest>;

export type ListProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse;
export const ListProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse;

export type ListProjectsInboundSamlConfigsError = DefaultErrors;

/** List all inbound SAML configurations for an Identity Toolkit project. */
export const listProjectsInboundSamlConfigs: API.PaginatedOperationMethod<
  ListProjectsInboundSamlConfigsRequest,
  ListProjectsInboundSamlConfigsResponse,
  ListProjectsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsInboundSamlConfigsRequest,
  output: ListProjectsInboundSamlConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsInboundSamlConfigsRequest {
  /** The name of the InboundSamlConfig resource, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. Ignored during create requests. */
  name: string;
  /** The update mask applies to the resource. Empty update mask will result in updating nothing. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
}

export const PatchProjectsInboundSamlConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/inboundSamlConfigs/{inboundSamlConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInboundSamlConfigsRequest>;

export type PatchProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
export const PatchProjectsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;

export type PatchProjectsInboundSamlConfigsError = DefaultErrors;

/** Update an inbound SAML configuration for an Identity Toolkit project. */
export const patchProjectsInboundSamlConfigs: API.OperationMethod<
  PatchProjectsInboundSamlConfigsRequest,
  PatchProjectsInboundSamlConfigsResponse,
  PatchProjectsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsInboundSamlConfigsRequest,
  output: PatchProjectsInboundSamlConfigsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsTenantsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsTenantsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsTenantsRequest>;

export type SetIamPolicyProjectsTenantsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsTenantsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsTenantsError = DefaultErrors;

/** Sets the access control policy for a resource. If the policy exists, it is replaced. Caller must have the right Google IAM permission on the resource. */
export const setIamPolicyProjectsTenants: API.OperationMethod<
  SetIamPolicyProjectsTenantsRequest,
  SetIamPolicyProjectsTenantsResponse,
  SetIamPolicyProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsTenantsRequest,
  output: SetIamPolicyProjectsTenantsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsTenantsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1GetIamPolicyRequest;
}

export const GetIamPolicyProjectsTenantsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsTenantsRequest>;

export type GetIamPolicyProjectsTenantsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsTenantsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsTenantsError = DefaultErrors;

/** Gets the access control policy for a resource. An error is returned if the resource does not exist. An empty policy is returned if the resource exists but does not have a policy set on it. Caller must have the right Google IAM permission on the resource. */
export const getIamPolicyProjectsTenants: API.OperationMethod<
  GetIamPolicyProjectsTenantsRequest,
  GetIamPolicyProjectsTenantsResponse,
  GetIamPolicyProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsTenantsRequest,
  output: GetIamPolicyProjectsTenantsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsTenantsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsTenantsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsTenantsRequest>;

export type TestIamPermissionsProjectsTenantsResponse =
  GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsTenantsResponse =
  GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsTenantsError = DefaultErrors;

/** Returns the caller's permissions on a resource. An error is returned if the resource does not exist. A caller is not required to have Google IAM permission to make this request. */
export const testIamPermissionsProjectsTenants: API.OperationMethod<
  TestIamPermissionsProjectsTenantsRequest,
  TestIamPermissionsProjectsTenantsResponse,
  TestIamPermissionsProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsTenantsRequest,
  output: TestIamPermissionsProjectsTenantsResponse,
  errors: [],
}));

export interface CreateProjectsTenantsRequest {
  /** The parent resource name where the tenant will be created. For example, "projects/project1". */
  parent: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2Tenant;
}

export const CreateProjectsTenantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2Tenant).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/tenants",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsRequest>;

export type CreateProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2Tenant;
export const CreateProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2Tenant;

export type CreateProjectsTenantsError = DefaultErrors;

/** Create a tenant. Requires write permission on the Agent project. */
export const createProjectsTenants: API.OperationMethod<
  CreateProjectsTenantsRequest,
  CreateProjectsTenantsResponse,
  CreateProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsTenantsRequest,
  output: CreateProjectsTenantsResponse,
  errors: [],
}));

export interface DeleteProjectsTenantsRequest {
  /** Resource name of the tenant to delete. */
  name: string;
}

export const DeleteProjectsTenantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsRequest>;

export type DeleteProjectsTenantsResponse = GoogleProtobufEmpty;
export const DeleteProjectsTenantsResponse = GoogleProtobufEmpty;

export type DeleteProjectsTenantsError = DefaultErrors;

/** Delete a tenant. Requires write permission on the Agent project. */
export const deleteProjectsTenants: API.OperationMethod<
  DeleteProjectsTenantsRequest,
  DeleteProjectsTenantsResponse,
  DeleteProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsTenantsRequest,
  output: DeleteProjectsTenantsResponse,
  errors: [],
}));

export interface GetProjectsTenantsRequest {
  /** Resource name of the tenant to retrieve. */
  name: string;
}

export const GetProjectsTenantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsTenantsRequest>;

export type GetProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2Tenant;
export const GetProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2Tenant;

export type GetProjectsTenantsError = DefaultErrors;

/** Get a tenant. Requires read permission on the Tenant resource. */
export const getProjectsTenants: API.OperationMethod<
  GetProjectsTenantsRequest,
  GetProjectsTenantsResponse,
  GetProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTenantsRequest,
  output: GetProjectsTenantsResponse,
  errors: [],
}));

export interface ListProjectsTenantsRequest {
  /** Required. The parent resource name to list tenants for. */
  parent: string;
  /** The pagination token from the response of a previous request. */
  pageToken?: string;
  /** The maximum number of results to return, capped at 1000. If not specified, the default value is 20. */
  pageSize?: number;
}

export const ListProjectsTenantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/tenants" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTenantsRequest>;

export type ListProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse;
export const ListProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListTenantsResponse;

export type ListProjectsTenantsError = DefaultErrors;

/** List tenants under the given agent project. Requires read permission on the Agent project. */
export const listProjectsTenants: API.PaginatedOperationMethod<
  ListProjectsTenantsRequest,
  ListProjectsTenantsResponse,
  ListProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsTenantsRequest,
  output: ListProjectsTenantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsTenantsRequest {
  /** Output only. Resource name of a tenant. For example: "projects/{project-id}/tenants/{tenant-id}" */
  name: string;
  /** If provided, only update fields set in the update mask. Otherwise, all settable fields will be updated. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2Tenant;
}

export const PatchProjectsTenantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2Tenant).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTenantsRequest>;

export type PatchProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2Tenant;
export const PatchProjectsTenantsResponse =
  GoogleCloudIdentitytoolkitAdminV2Tenant;

export type PatchProjectsTenantsError = DefaultErrors;

/** Update a tenant. Requires write permission on the Tenant resource. */
export const patchProjectsTenants: API.OperationMethod<
  PatchProjectsTenantsRequest,
  PatchProjectsTenantsResponse,
  PatchProjectsTenantsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsTenantsRequest,
  output: PatchProjectsTenantsResponse,
  errors: [],
}));

export interface CreateProjectsTenantsDefaultSupportedIdpConfigsRequest {
  /** The parent resource name where the config to be created, for example: "projects/my-awesome-project" */
  parent: string;
  /** The id of the Idp to create a config for. Call ListDefaultSupportedIdps for list of all default supported Idps. */
  idpId?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
}

export const CreateProjectsTenantsDefaultSupportedIdpConfigsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    idpId: Schema.optional(Schema.String).pipe(T.HttpQuery("idpId")),
    body: Schema.optional(
      GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/tenants/{tenantsId}/defaultSupportedIdpConfigs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsTenantsDefaultSupportedIdpConfigsRequest>;

export type CreateProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
export const CreateProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;

export type CreateProjectsTenantsDefaultSupportedIdpConfigsError =
  DefaultErrors;

/** Create a default supported Idp configuration for an Identity Toolkit project. */
export const createProjectsTenantsDefaultSupportedIdpConfigs: API.OperationMethod<
  CreateProjectsTenantsDefaultSupportedIdpConfigsRequest,
  CreateProjectsTenantsDefaultSupportedIdpConfigsResponse,
  CreateProjectsTenantsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsTenantsDefaultSupportedIdpConfigsRequest,
  output: CreateProjectsTenantsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsTenantsDefaultSupportedIdpConfigsRequest {
  /** The resource name of the config, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name: string;
}

export const DeleteProjectsTenantsDefaultSupportedIdpConfigsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v2/projects/{projectsId}/tenants/{tenantsId}/defaultSupportedIdpConfigs/{defaultSupportedIdpConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsTenantsDefaultSupportedIdpConfigsRequest>;

export type DeleteProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleProtobufEmpty;

export type DeleteProjectsTenantsDefaultSupportedIdpConfigsError =
  DefaultErrors;

/** Delete a default supported Idp configuration for an Identity Toolkit project. */
export const deleteProjectsTenantsDefaultSupportedIdpConfigs: API.OperationMethod<
  DeleteProjectsTenantsDefaultSupportedIdpConfigsRequest,
  DeleteProjectsTenantsDefaultSupportedIdpConfigsResponse,
  DeleteProjectsTenantsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsTenantsDefaultSupportedIdpConfigsRequest,
  output: DeleteProjectsTenantsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface GetProjectsTenantsDefaultSupportedIdpConfigsRequest {
  /** The resource name of the config, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name: string;
}

export const GetProjectsTenantsDefaultSupportedIdpConfigsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/tenants/{tenantsId}/defaultSupportedIdpConfigs/{defaultSupportedIdpConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsTenantsDefaultSupportedIdpConfigsRequest>;

export type GetProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
export const GetProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;

export type GetProjectsTenantsDefaultSupportedIdpConfigsError = DefaultErrors;

/** Retrieve a default supported Idp configuration for an Identity Toolkit project. */
export const getProjectsTenantsDefaultSupportedIdpConfigs: API.OperationMethod<
  GetProjectsTenantsDefaultSupportedIdpConfigsRequest,
  GetProjectsTenantsDefaultSupportedIdpConfigsResponse,
  GetProjectsTenantsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTenantsDefaultSupportedIdpConfigsRequest,
  output: GetProjectsTenantsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface ListProjectsTenantsDefaultSupportedIdpConfigsRequest {
  /** The parent resource name, for example, "projects/my-awesome-project". */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsTenantsDefaultSupportedIdpConfigsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/tenants/{tenantsId}/defaultSupportedIdpConfigs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsTenantsDefaultSupportedIdpConfigsRequest>;

export type ListProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse;
export const ListProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpConfigsResponse;

export type ListProjectsTenantsDefaultSupportedIdpConfigsError = DefaultErrors;

/** List all default supported Idp configurations for an Identity Toolkit project. */
export const listProjectsTenantsDefaultSupportedIdpConfigs: API.PaginatedOperationMethod<
  ListProjectsTenantsDefaultSupportedIdpConfigsRequest,
  ListProjectsTenantsDefaultSupportedIdpConfigsResponse,
  ListProjectsTenantsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsTenantsDefaultSupportedIdpConfigsRequest,
  output: ListProjectsTenantsDefaultSupportedIdpConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsTenantsDefaultSupportedIdpConfigsRequest {
  /** The name of the DefaultSupportedIdpConfig resource, for example: "projects/my-awesome-project/defaultSupportedIdpConfigs/google.com" */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
}

export const PatchProjectsTenantsDefaultSupportedIdpConfigsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(
      GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v2/projects/{projectsId}/tenants/{tenantsId}/defaultSupportedIdpConfigs/{defaultSupportedIdpConfigsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsTenantsDefaultSupportedIdpConfigsRequest>;

export type PatchProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;
export const PatchProjectsTenantsDefaultSupportedIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2DefaultSupportedIdpConfig;

export type PatchProjectsTenantsDefaultSupportedIdpConfigsError = DefaultErrors;

/** Update a default supported Idp configuration for an Identity Toolkit project. */
export const patchProjectsTenantsDefaultSupportedIdpConfigs: API.OperationMethod<
  PatchProjectsTenantsDefaultSupportedIdpConfigsRequest,
  PatchProjectsTenantsDefaultSupportedIdpConfigsResponse,
  PatchProjectsTenantsDefaultSupportedIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsTenantsDefaultSupportedIdpConfigsRequest,
  output: PatchProjectsTenantsDefaultSupportedIdpConfigsResponse,
  errors: [],
}));

export interface CreateProjectsTenantsOauthIdpConfigsRequest {
  /** The parent resource name where the config to be created, for example: "projects/my-awesome-project" */
  parent: string;
  /** The id to use for this config. */
  oauthIdpConfigId?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
}

export const CreateProjectsTenantsOauthIdpConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  oauthIdpConfigId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("oauthIdpConfigId"),
  ),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/oauthIdpConfigs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsOauthIdpConfigsRequest>;

export type CreateProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
export const CreateProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;

export type CreateProjectsTenantsOauthIdpConfigsError = DefaultErrors;

/** Create an Oidc Idp configuration for an Identity Toolkit project. */
export const createProjectsTenantsOauthIdpConfigs: API.OperationMethod<
  CreateProjectsTenantsOauthIdpConfigsRequest,
  CreateProjectsTenantsOauthIdpConfigsResponse,
  CreateProjectsTenantsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsTenantsOauthIdpConfigsRequest,
  output: CreateProjectsTenantsOauthIdpConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsTenantsOauthIdpConfigsRequest {
  /** The resource name of the config to be deleted, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. */
  name: string;
}

export const DeleteProjectsTenantsOauthIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/oauthIdpConfigs/{oauthIdpConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsOauthIdpConfigsRequest>;

export type DeleteProjectsTenantsOauthIdpConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsTenantsOauthIdpConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsTenantsOauthIdpConfigsError = DefaultErrors;

/** Delete an Oidc Idp configuration for an Identity Toolkit project. */
export const deleteProjectsTenantsOauthIdpConfigs: API.OperationMethod<
  DeleteProjectsTenantsOauthIdpConfigsRequest,
  DeleteProjectsTenantsOauthIdpConfigsResponse,
  DeleteProjectsTenantsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsTenantsOauthIdpConfigsRequest,
  output: DeleteProjectsTenantsOauthIdpConfigsResponse,
  errors: [],
}));

export interface GetProjectsTenantsOauthIdpConfigsRequest {
  /** The resource name of the config, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. */
  name: string;
}

export const GetProjectsTenantsOauthIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/oauthIdpConfigs/{oauthIdpConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsTenantsOauthIdpConfigsRequest>;

export type GetProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
export const GetProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;

export type GetProjectsTenantsOauthIdpConfigsError = DefaultErrors;

/** Retrieve an Oidc Idp configuration for an Identity Toolkit project. */
export const getProjectsTenantsOauthIdpConfigs: API.OperationMethod<
  GetProjectsTenantsOauthIdpConfigsRequest,
  GetProjectsTenantsOauthIdpConfigsResponse,
  GetProjectsTenantsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTenantsOauthIdpConfigsRequest,
  output: GetProjectsTenantsOauthIdpConfigsResponse,
  errors: [],
}));

export interface ListProjectsTenantsOauthIdpConfigsRequest {
  /** The parent resource name, for example, "projects/my-awesome-project". */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsTenantsOauthIdpConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/oauthIdpConfigs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsTenantsOauthIdpConfigsRequest>;

export type ListProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse;
export const ListProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListOAuthIdpConfigsResponse;

export type ListProjectsTenantsOauthIdpConfigsError = DefaultErrors;

/** List all Oidc Idp configurations for an Identity Toolkit project. */
export const listProjectsTenantsOauthIdpConfigs: API.PaginatedOperationMethod<
  ListProjectsTenantsOauthIdpConfigsRequest,
  ListProjectsTenantsOauthIdpConfigsResponse,
  ListProjectsTenantsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsTenantsOauthIdpConfigsRequest,
  output: ListProjectsTenantsOauthIdpConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsTenantsOauthIdpConfigsRequest {
  /** The name of the OAuthIdpConfig resource, for example: 'projects/my-awesome-project/oauthIdpConfigs/oauth-config-id'. Ignored during create requests. */
  name: string;
  /** The update mask applies to the resource. Empty update mask will result in updating nothing. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
}

export const PatchProjectsTenantsOauthIdpConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/oauthIdpConfigs/{oauthIdpConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTenantsOauthIdpConfigsRequest>;

export type PatchProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;
export const PatchProjectsTenantsOauthIdpConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2OAuthIdpConfig;

export type PatchProjectsTenantsOauthIdpConfigsError = DefaultErrors;

/** Update an Oidc Idp configuration for an Identity Toolkit project. */
export const patchProjectsTenantsOauthIdpConfigs: API.OperationMethod<
  PatchProjectsTenantsOauthIdpConfigsRequest,
  PatchProjectsTenantsOauthIdpConfigsResponse,
  PatchProjectsTenantsOauthIdpConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsTenantsOauthIdpConfigsRequest,
  output: PatchProjectsTenantsOauthIdpConfigsResponse,
  errors: [],
}));

export interface CreateProjectsTenantsInboundSamlConfigsRequest {
  /** The parent resource name where the config to be created, for example: "projects/my-awesome-project" */
  parent: string;
  /** The id to use for this config. */
  inboundSamlConfigId?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
}

export const CreateProjectsTenantsInboundSamlConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  inboundSamlConfigId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("inboundSamlConfigId"),
  ),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/inboundSamlConfigs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsInboundSamlConfigsRequest>;

export type CreateProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
export const CreateProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;

export type CreateProjectsTenantsInboundSamlConfigsError = DefaultErrors;

/** Create an inbound SAML configuration for an Identity Toolkit project. */
export const createProjectsTenantsInboundSamlConfigs: API.OperationMethod<
  CreateProjectsTenantsInboundSamlConfigsRequest,
  CreateProjectsTenantsInboundSamlConfigsResponse,
  CreateProjectsTenantsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsTenantsInboundSamlConfigsRequest,
  output: CreateProjectsTenantsInboundSamlConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsTenantsInboundSamlConfigsRequest {
  /** The resource name of the config to be deleted, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. */
  name: string;
}

export const DeleteProjectsTenantsInboundSamlConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/inboundSamlConfigs/{inboundSamlConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsInboundSamlConfigsRequest>;

export type DeleteProjectsTenantsInboundSamlConfigsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsTenantsInboundSamlConfigsResponse =
  GoogleProtobufEmpty;

export type DeleteProjectsTenantsInboundSamlConfigsError = DefaultErrors;

/** Delete an inbound SAML configuration for an Identity Toolkit project. */
export const deleteProjectsTenantsInboundSamlConfigs: API.OperationMethod<
  DeleteProjectsTenantsInboundSamlConfigsRequest,
  DeleteProjectsTenantsInboundSamlConfigsResponse,
  DeleteProjectsTenantsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsTenantsInboundSamlConfigsRequest,
  output: DeleteProjectsTenantsInboundSamlConfigsResponse,
  errors: [],
}));

export interface GetProjectsTenantsInboundSamlConfigsRequest {
  /** The resource name of the config, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. */
  name: string;
}

export const GetProjectsTenantsInboundSamlConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/inboundSamlConfigs/{inboundSamlConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsTenantsInboundSamlConfigsRequest>;

export type GetProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
export const GetProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;

export type GetProjectsTenantsInboundSamlConfigsError = DefaultErrors;

/** Retrieve an inbound SAML configuration for an Identity Toolkit project. */
export const getProjectsTenantsInboundSamlConfigs: API.OperationMethod<
  GetProjectsTenantsInboundSamlConfigsRequest,
  GetProjectsTenantsInboundSamlConfigsResponse,
  GetProjectsTenantsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTenantsInboundSamlConfigsRequest,
  output: GetProjectsTenantsInboundSamlConfigsResponse,
  errors: [],
}));

export interface ListProjectsTenantsInboundSamlConfigsRequest {
  /** The parent resource name, for example, "projects/my-awesome-project". */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsTenantsInboundSamlConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/inboundSamlConfigs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsTenantsInboundSamlConfigsRequest>;

export type ListProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse;
export const ListProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListInboundSamlConfigsResponse;

export type ListProjectsTenantsInboundSamlConfigsError = DefaultErrors;

/** List all inbound SAML configurations for an Identity Toolkit project. */
export const listProjectsTenantsInboundSamlConfigs: API.PaginatedOperationMethod<
  ListProjectsTenantsInboundSamlConfigsRequest,
  ListProjectsTenantsInboundSamlConfigsResponse,
  ListProjectsTenantsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsTenantsInboundSamlConfigsRequest,
  output: ListProjectsTenantsInboundSamlConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsTenantsInboundSamlConfigsRequest {
  /** The name of the InboundSamlConfig resource, for example: 'projects/my-awesome-project/inboundSamlConfigs/my-config-id'. Ignored during create requests. */
  name: string;
  /** The update mask applies to the resource. Empty update mask will result in updating nothing. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
}

export const PatchProjectsTenantsInboundSamlConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(
    GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v2/projects/{projectsId}/tenants/{tenantsId}/inboundSamlConfigs/{inboundSamlConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTenantsInboundSamlConfigsRequest>;

export type PatchProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;
export const PatchProjectsTenantsInboundSamlConfigsResponse =
  GoogleCloudIdentitytoolkitAdminV2InboundSamlConfig;

export type PatchProjectsTenantsInboundSamlConfigsError = DefaultErrors;

/** Update an inbound SAML configuration for an Identity Toolkit project. */
export const patchProjectsTenantsInboundSamlConfigs: API.OperationMethod<
  PatchProjectsTenantsInboundSamlConfigsRequest,
  PatchProjectsTenantsInboundSamlConfigsResponse,
  PatchProjectsTenantsInboundSamlConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsTenantsInboundSamlConfigsRequest,
  output: PatchProjectsTenantsInboundSamlConfigsResponse,
  errors: [],
}));

export interface ListDefaultSupportedIdpsRequest {
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListDefaultSupportedIdpsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/defaultSupportedIdps" }),
  svc,
) as unknown as Schema.Schema<ListDefaultSupportedIdpsRequest>;

export type ListDefaultSupportedIdpsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse;
export const ListDefaultSupportedIdpsResponse =
  GoogleCloudIdentitytoolkitAdminV2ListDefaultSupportedIdpsResponse;

export type ListDefaultSupportedIdpsError = DefaultErrors;

/** List all default supported Idps. */
export const listDefaultSupportedIdps: API.PaginatedOperationMethod<
  ListDefaultSupportedIdpsRequest,
  ListDefaultSupportedIdpsResponse,
  ListDefaultSupportedIdpsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListDefaultSupportedIdpsRequest,
  output: ListDefaultSupportedIdpsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetRecaptchaConfigV2Request {
  /** The id of a tenant. */
  tenantId?: string;
  /** reCAPTCHA Enterprise uses separate site keys for different client types. Specify the client type to get the corresponding key. */
  clientType?:
    | "CLIENT_TYPE_UNSPECIFIED"
    | "CLIENT_TYPE_WEB"
    | "CLIENT_TYPE_ANDROID"
    | "CLIENT_TYPE_IOS"
    | (string & {});
  /** The reCAPTCHA version. */
  version?:
    | "RECAPTCHA_VERSION_UNSPECIFIED"
    | "RECAPTCHA_ENTERPRISE"
    | (string & {});
}

export const GetRecaptchaConfigV2Request = Schema.Struct({
  tenantId: Schema.optional(Schema.String).pipe(T.HttpQuery("tenantId")),
  clientType: Schema.optional(Schema.String).pipe(T.HttpQuery("clientType")),
  version: Schema.optional(Schema.String).pipe(T.HttpQuery("version")),
}).pipe(
  T.Http({ method: "GET", path: "v2/recaptchaConfig" }),
  svc,
) as unknown as Schema.Schema<GetRecaptchaConfigV2Request>;

export type GetRecaptchaConfigV2Response =
  GoogleCloudIdentitytoolkitV2RecaptchaConfig;
export const GetRecaptchaConfigV2Response =
  GoogleCloudIdentitytoolkitV2RecaptchaConfig;

export type GetRecaptchaConfigV2Error = DefaultErrors;

/** Gets parameters needed for reCAPTCHA analysis. */
export const getRecaptchaConfigV2: API.OperationMethod<
  GetRecaptchaConfigV2Request,
  GetRecaptchaConfigV2Response,
  GetRecaptchaConfigV2Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRecaptchaConfigV2Request,
  output: GetRecaptchaConfigV2Response,
  errors: [],
}));

export interface GetPasswordPolicyV2Request {
  /** The id of a tenant. */
  tenantId?: string;
}

export const GetPasswordPolicyV2Request = Schema.Struct({
  tenantId: Schema.optional(Schema.String).pipe(T.HttpQuery("tenantId")),
}).pipe(
  T.Http({ method: "GET", path: "v2/passwordPolicy" }),
  svc,
) as unknown as Schema.Schema<GetPasswordPolicyV2Request>;

export type GetPasswordPolicyV2Response =
  GoogleCloudIdentitytoolkitV2PasswordPolicy;
export const GetPasswordPolicyV2Response =
  GoogleCloudIdentitytoolkitV2PasswordPolicy;

export type GetPasswordPolicyV2Error = DefaultErrors;

/** Gets password policy config set on the project or tenant. */
export const getPasswordPolicyV2: API.OperationMethod<
  GetPasswordPolicyV2Request,
  GetPasswordPolicyV2Response,
  GetPasswordPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPasswordPolicyV2Request,
  output: GetPasswordPolicyV2Response,
  errors: [],
}));

export interface RevokeTokenAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV2RevokeTokenRequest;
}

export const RevokeTokenAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV2RevokeTokenRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({ method: "POST", path: "v2/accounts:revokeToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokeTokenAccountsRequest>;

export type RevokeTokenAccountsResponse =
  GoogleCloudIdentitytoolkitV2RevokeTokenResponse;
export const RevokeTokenAccountsResponse =
  GoogleCloudIdentitytoolkitV2RevokeTokenResponse;

export type RevokeTokenAccountsError = DefaultErrors;

/** Revokes a user's token from an Identity Provider (IdP). This is done by manually providing an IdP credential, and the token types for revocation. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const revokeTokenAccounts: API.OperationMethod<
  RevokeTokenAccountsRequest,
  RevokeTokenAccountsResponse,
  RevokeTokenAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RevokeTokenAccountsRequest,
  output: RevokeTokenAccountsResponse,
  errors: [],
}));

export interface FinalizeAccountsMfaEnrollmentRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest;
}

export const FinalizeAccountsMfaEnrollmentRequest = Schema.Struct({
  body: Schema.optional(
    GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/accounts/mfaEnrollment:finalize",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<FinalizeAccountsMfaEnrollmentRequest>;

export type FinalizeAccountsMfaEnrollmentResponse =
  GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse;
export const FinalizeAccountsMfaEnrollmentResponse =
  GoogleCloudIdentitytoolkitV2FinalizeMfaEnrollmentResponse;

export type FinalizeAccountsMfaEnrollmentError = DefaultErrors;

/** Finishes enrolling a second factor for the user. */
export const finalizeAccountsMfaEnrollment: API.OperationMethod<
  FinalizeAccountsMfaEnrollmentRequest,
  FinalizeAccountsMfaEnrollmentResponse,
  FinalizeAccountsMfaEnrollmentError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: FinalizeAccountsMfaEnrollmentRequest,
  output: FinalizeAccountsMfaEnrollmentResponse,
  errors: [],
}));

export interface StartAccountsMfaEnrollmentRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest;
}

export const StartAccountsMfaEnrollmentRequest = Schema.Struct({
  body: Schema.optional(
    GoogleCloudIdentitytoolkitV2StartMfaEnrollmentRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/accounts/mfaEnrollment:start",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<StartAccountsMfaEnrollmentRequest>;

export type StartAccountsMfaEnrollmentResponse =
  GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse;
export const StartAccountsMfaEnrollmentResponse =
  GoogleCloudIdentitytoolkitV2StartMfaEnrollmentResponse;

export type StartAccountsMfaEnrollmentError = DefaultErrors;

/** Step one of the MFA enrollment process. In SMS case, this sends an SMS verification code to the user. */
export const startAccountsMfaEnrollment: API.OperationMethod<
  StartAccountsMfaEnrollmentRequest,
  StartAccountsMfaEnrollmentResponse,
  StartAccountsMfaEnrollmentError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: StartAccountsMfaEnrollmentRequest,
  output: StartAccountsMfaEnrollmentResponse,
  errors: [],
}));

export interface WithdrawAccountsMfaEnrollmentRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV2WithdrawMfaRequest;
}

export const WithdrawAccountsMfaEnrollmentRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV2WithdrawMfaRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/accounts/mfaEnrollment:withdraw",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<WithdrawAccountsMfaEnrollmentRequest>;

export type WithdrawAccountsMfaEnrollmentResponse =
  GoogleCloudIdentitytoolkitV2WithdrawMfaResponse;
export const WithdrawAccountsMfaEnrollmentResponse =
  GoogleCloudIdentitytoolkitV2WithdrawMfaResponse;

export type WithdrawAccountsMfaEnrollmentError = DefaultErrors;

/** Revokes one second factor from the enrolled second factors for an account. */
export const withdrawAccountsMfaEnrollment: API.OperationMethod<
  WithdrawAccountsMfaEnrollmentRequest,
  WithdrawAccountsMfaEnrollmentResponse,
  WithdrawAccountsMfaEnrollmentError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: WithdrawAccountsMfaEnrollmentRequest,
  output: WithdrawAccountsMfaEnrollmentResponse,
  errors: [],
}));

export interface FinalizeAccountsMfaSignInRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest;
}

export const FinalizeAccountsMfaSignInRequest = Schema.Struct({
  body: Schema.optional(
    GoogleCloudIdentitytoolkitV2FinalizeMfaSignInRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/accounts/mfaSignIn:finalize",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<FinalizeAccountsMfaSignInRequest>;

export type FinalizeAccountsMfaSignInResponse =
  GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse;
export const FinalizeAccountsMfaSignInResponse =
  GoogleCloudIdentitytoolkitV2FinalizeMfaSignInResponse;

export type FinalizeAccountsMfaSignInError = DefaultErrors;

/** Verifies the MFA challenge and performs sign-in */
export const finalizeAccountsMfaSignIn: API.OperationMethod<
  FinalizeAccountsMfaSignInRequest,
  FinalizeAccountsMfaSignInResponse,
  FinalizeAccountsMfaSignInError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: FinalizeAccountsMfaSignInRequest,
  output: FinalizeAccountsMfaSignInResponse,
  errors: [],
}));

export interface StartAccountsMfaSignInRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV2StartMfaSignInRequest;
}

export const StartAccountsMfaSignInRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV2StartMfaSignInRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/accounts/mfaSignIn:start",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<StartAccountsMfaSignInRequest>;

export type StartAccountsMfaSignInResponse =
  GoogleCloudIdentitytoolkitV2StartMfaSignInResponse;
export const StartAccountsMfaSignInResponse =
  GoogleCloudIdentitytoolkitV2StartMfaSignInResponse;

export type StartAccountsMfaSignInError = DefaultErrors;

/** Sends the MFA challenge */
export const startAccountsMfaSignIn: API.OperationMethod<
  StartAccountsMfaSignInRequest,
  StartAccountsMfaSignInResponse,
  StartAccountsMfaSignInError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: StartAccountsMfaSignInRequest,
  output: StartAccountsMfaSignInResponse,
  errors: [],
}));
