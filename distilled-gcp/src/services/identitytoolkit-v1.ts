// ==========================================================================
// Identity Toolkit API (identitytoolkit v1)
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
  name: "identitytoolkit",
  version: "v1",
  rootUrl: "https://identitytoolkit.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudIdentitytoolkitV1CreateAuthUriRequest {
  /** The email identifier of the user account to fetch associated providers for. At least one of the fields `identifier` and `provider_id` must be set. The length of the email address should be less than 256 characters and in the format of `name@domain.tld`. The email address should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. */
  identifier?: string;
  /** A valid URL for the IdP to redirect the user back to. The URL cannot contain fragments or the reserved `state` query parameter. */
  continueUri?: string;
  openidRealm?: string;
  /** The provider ID of the IdP for the user to sign in with. This should be a provider ID enabled for sign-in, which is either from the list of [default supported IdPs](https://cloud.google.com/identity-platform/docs/reference/rest/v2/defaultSupportedIdps/list), or of the format `oidc.*` or `saml.*`. Some examples are `google.com`, `facebook.com`, `oidc.testapp`, and `saml.testapp`. At least one of the fields `identifier` and `provider_id` must be set. */
  providerId?: string;
  oauthConsumerKey?: string;
  /** Additional space-delimited OAuth 2.0 scopes specifying the scope of the authentication request with the IdP. Used for OAuth 2.0 IdPs. For the Google provider, the authorization code flow will be used if this field is set. */
  oauthScope?: string;
  /** An opaque string used to maintain contextual information between the authentication request and the callback from the IdP. */
  context?: string;
  otaApp?: string;
  appId?: string;
  /** Used for the Google provider. The G Suite hosted domain of the user in order to restrict sign-in to users at that domain. */
  hostedDomain?: string;
  /** A session ID that can be verified against in SignInWithIdp to prevent session fixation attacks. If absent, a random string will be generated and returned as the session ID. */
  sessionId?: string;
  /** Used for the Google provider. The type of the authentication flow to be used. If present, this should be `CODE_FLOW` to specify the authorization code flow. Otherwise, the default ID Token flow will be used. */
  authFlowType?: string;
  /** Additional customized query parameters to be added to the authorization URI. The following parameters are reserved and cannot be added: `client_id`, `response_type`, `scope`, `redirect_uri`, `state`. For the Microsoft provider, the Azure AD tenant to sign-in to can be specified in the `tenant` custom parameter. */
  customParameter?: Record<string, string>;
  /** The ID of the Identity Platform tenant to create an authorization URI or lookup an email identifier for. If not set, the operation will be performed in the default Identity Platform instance in the project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1CreateAuthUriRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1CreateAuthUriRequest> = Schema.suspend(() => Schema.Struct({
  identifier: Schema.optional(Schema.String),
  continueUri: Schema.optional(Schema.String),
  openidRealm: Schema.optional(Schema.String),
  providerId: Schema.optional(Schema.String),
  oauthConsumerKey: Schema.optional(Schema.String),
  oauthScope: Schema.optional(Schema.String),
  context: Schema.optional(Schema.String),
  otaApp: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  hostedDomain: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  authFlowType: Schema.optional(Schema.String),
  customParameter: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1CreateAuthUriRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1CreateAuthUriRequest>;

export interface GoogleCloudIdentitytoolkitV1CreateAuthUriResponse {
  kind?: string;
  /** The authorization URI for the requested provider. Present only when a provider ID is set in the request. */
  authUri?: string;
  allProviders?: Array<string>;
  /** Whether the email identifier represents an existing account. Present only when an email identifier is set in the request. */
  registered?: boolean;
  /** The provider ID from the request, if provided. */
  providerId?: string;
  /** Whether the user has previously signed in with the provider ID in the request. Present only when a registered email identifier is set in the request. */
  forExistingProvider?: boolean;
  /** Whether a CAPTCHA is needed because there have been too many failed login attempts by the user. Present only when a registered email identifier is set in the request. */
  captchaRequired?: boolean;
  /** The session ID from the request, or a random string generated by CreateAuthUri if absent. It is used to prevent session fixation attacks. */
  sessionId?: string;
  /** The list of sign-in methods that the user has previously used. Each element is one of `password`, `emailLink`, or the provider ID of an IdP. Present only when a registered email identifier is set in the request. If [email enumeration protection](https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection) is enabled, this method returns an empty list. */
  signinMethods?: Array<string>;
}

export const GoogleCloudIdentitytoolkitV1CreateAuthUriResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1CreateAuthUriResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  authUri: Schema.optional(Schema.String),
  allProviders: Schema.optional(Schema.Array(Schema.String)),
  registered: Schema.optional(Schema.Boolean),
  providerId: Schema.optional(Schema.String),
  forExistingProvider: Schema.optional(Schema.Boolean),
  captchaRequired: Schema.optional(Schema.Boolean),
  sessionId: Schema.optional(Schema.String),
  signinMethods: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1CreateAuthUriResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1CreateAuthUriResponse>;

export interface GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse {
  kind?: string;
  recaptchaStoken?: string;
  /** The reCAPTCHA v2 site key used to invoke the reCAPTCHA service. Always present. */
  recaptchaSiteKey?: string;
  /** The producer project number used to generate PIA tokens */
  producerProjectNumber?: string;
}

export const GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  recaptchaStoken: Schema.optional(Schema.String),
  recaptchaSiteKey: Schema.optional(Schema.String),
  producerProjectNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse>;

export interface GoogleCloudIdentitytoolkitV1AutoRetrievalInfo {
  /** The Android app's signature hash for Google Play Service's SMS Retriever API. */
  appSignatureHash?: string;
}

export const GoogleCloudIdentitytoolkitV1AutoRetrievalInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1AutoRetrievalInfo> = Schema.suspend(() => Schema.Struct({
  appSignatureHash: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1AutoRetrievalInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1AutoRetrievalInfo>;

export interface GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest {
  /** The phone number to send the verification code to in E.164 format. */
  phoneNumber?: string;
  /** Receipt of successful iOS app token validation. At least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator, if 'captcha_response' is not used (reCAPTCHA enterprise is not enabled). This should come from the response of verifyIosClient. If present, the caller should also provide the `ios_secret`, as well as a bundle ID in the `x-ios-bundle-identifier` header, which must match the bundle ID from the verifyIosClient request. */
  iosReceipt?: string;
  /** Secret delivered to iOS app as a push notification. Should be passed with an `ios_receipt` as well as the `x-ios-bundle-identifier` header. */
  iosSecret?: string;
  /** Recaptcha token for app verification. At least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator, if 'captcha_response' is not used (reCAPTCHA enterprise is not enabled). The recaptcha should be generated by calling getRecaptchaParams and the recaptcha token will be generated on user completion of the recaptcha challenge. */
  recaptchaToken?: string;
  /** Tenant ID of the Identity Platform tenant the user is signing in to. */
  tenantId?: string;
  /** Android only. Used by Google Play Services to identify the app for auto-retrieval. */
  autoRetrievalInfo?: GoogleCloudIdentitytoolkitV1AutoRetrievalInfo;
  /** Android only. Safety Net has been deprecated. Please use play_integrity_token instead. */
  safetyNetToken?: string;
  /** Android only. Used to assert application identity in place of a recaptcha token (and safety_net_token). At least one of (`ios_receipt` and `ios_secret`), `recaptcha_token`, , or `play_integrity_token` must be specified to verify the verification code is being sent on behalf of a real app and not an emulator, if 'captcha_response' is not used (reCAPTCHA enterprise is not enabled). A Play Integrity Token can be generated via the [PlayIntegrity API](https://developer.android.com/google/play/integrity) with applying SHA256 to the `phone_number` field as the nonce. */
  playIntegrityToken?: string;
  /** Optional. The reCAPTCHA Enterprise token provided by the reCAPTCHA client-side integration. Required when reCAPTCHA enterprise is enabled. */
  captchaResponse?: string;
  /** Optional. The client type, web, android or ios. Required when reCAPTCHA Enterprise is enabled. */
  clientType?: "CLIENT_TYPE_UNSPECIFIED" | "CLIENT_TYPE_WEB" | "CLIENT_TYPE_ANDROID" | "CLIENT_TYPE_IOS" | (string & {});
  /** Optional. The reCAPTCHA version of the reCAPTCHA token in the captcha_response. Required when reCAPTCHA Enterprise is enabled. */
  recaptchaVersion?: "RECAPTCHA_VERSION_UNSPECIFIED" | "RECAPTCHA_ENTERPRISE" | (string & {});
}

export const GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  iosReceipt: Schema.optional(Schema.String),
  iosSecret: Schema.optional(Schema.String),
  recaptchaToken: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  autoRetrievalInfo: Schema.optional(GoogleCloudIdentitytoolkitV1AutoRetrievalInfo),
  safetyNetToken: Schema.optional(Schema.String),
  playIntegrityToken: Schema.optional(Schema.String),
  captchaResponse: Schema.optional(Schema.String),
  clientType: Schema.optional(Schema.String),
  recaptchaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest>;

export interface GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse {
  /** Encrypted session information. This can be used in signInWithPhoneNumber to authenticate the phone number. */
  sessionInfo?: string;
}

export const GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse> = Schema.suspend(() => Schema.Struct({
  sessionInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse>;

export interface GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest {
  /** Required. The custom Auth token asserted by the developer. The token should be a [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) that includes the claims listed in the [API reference](https://cloud.google.com/identity-platform/docs/reference/rest/client/) under the "Custom Token Claims" section. */
  token?: string;
  instanceId?: string;
  /** Should always be true. */
  returnSecureToken?: boolean;
  delegatedProjectNumber?: string;
  /** The ID of the Identity Platform tenant the user is signing in to. If present, the ID should match the tenant_id in the token. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  delegatedProjectNumber: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest>;

export interface GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse {
  kind?: string;
  /** An Identity Platform ID token for the authenticated user. */
  idToken?: string;
  /** An Identity Platform refresh token for the authenticated user. */
  refreshToken?: string;
  /** The number of seconds until the ID token expires. */
  expiresIn?: string;
  /** Whether the authenticated user was created by this request. */
  isNewUser?: boolean;
}

export const GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse>;

export interface GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest {
  /** Required. The user's Game Center player ID. Deprecated by Apple. Pass `playerID` along with `gamePlayerID` and `teamPlayerID` to initiate the migration of a user's Game Center player ID to `gamePlayerID`. */
  playerId?: string;
  /** Required. The URL to fetch the Apple public key in order to verify the given signature is signed by Apple. */
  publicKeyUrl?: string;
  /** Required. The verification signature data generated by Apple. */
  signature?: string;
  /** Required. A random string used to generate the given signature. */
  salt?: string;
  /** Required. The time when the signature was created by Apple, in milliseconds since the epoch. */
  timestamp?: string;
  /** A valid ID token for an Identity Platform account. If present, this request will link the Game Center player ID to the account represented by this ID token. */
  idToken?: string;
  /** The user's Game Center display name. */
  displayName?: string;
  /** The ID of the Identity Platform tenant the user is signing in to. */
  tenantId?: string;
  /** The user's Game Center team player ID. A unique identifier for a player of all the games that you distribute using your developer account. https://developer.apple.com/documentation/gamekit/gkplayer/3174857-teamplayerid */
  teamPlayerId?: string;
  /** The user's Game Center game player ID. A unique identifier for a player of the game. https://developer.apple.com/documentation/gamekit/gkplayer/3113960-gameplayerid */
  gamePlayerId?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest> = Schema.suspend(() => Schema.Struct({
  playerId: Schema.optional(Schema.String),
  publicKeyUrl: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  salt: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  teamPlayerId: Schema.optional(Schema.String),
  gamePlayerId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest>;

export interface GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse {
  /** The ID of the authenticated user. Always present in the response. */
  localId?: string;
  /** The user's Game Center player ID. Pass `playerID` along with `gamePlayerID` and `teamPlayerID` to initiate the migration of a user's Game Center player ID to `gamePlayerID`. */
  playerId?: string;
  /** An Identity Platform ID token for the authenticated user. */
  idToken?: string;
  /** An Identity Platform refresh token for the authenticated user. */
  refreshToken?: string;
  /** The number of seconds until the ID token expires. */
  expiresIn?: string;
  /** Whether the logged in user was created by this request. */
  isNewUser?: boolean;
  /** Display name of the authenticated user. */
  displayName?: string;
  /** The user's Game Center team player ID. A unique identifier for a player of all the games that you distribute using your developer account. https://developer.apple.com/documentation/gamekit/gkplayer/3174857-teamplayerid */
  teamPlayerId?: string;
  /** The user's Game Center game player ID. A unique identifier for a player of the game. https://developer.apple.com/documentation/gamekit/gkplayer/3113960-gameplayerid */
  gamePlayerId?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  playerId: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  teamPlayerId: Schema.optional(Schema.String),
  gamePlayerId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse>;

export interface GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest {
  /** Required. The email the user is signing in with. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. */
  email?: string;
  /** Required. The password the user provides to sign in to the account. */
  password?: string;
  pendingIdToken?: string;
  captchaChallenge?: string;
  /** The reCAPTCHA token provided by the reCAPTCHA client-side integration. reCAPTCHA Enterprise uses it for risk assessment. Required when reCAPTCHA Enterprise is enabled. */
  captchaResponse?: string;
  instanceId?: string;
  delegatedProjectNumber?: string;
  idToken?: string;
  /** Should always be true. */
  returnSecureToken?: boolean;
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform instance in the project. */
  tenantId?: string;
  /** The client type, web, android or ios. Required when reCAPTCHA Enterprise is enabled. */
  clientType?: "CLIENT_TYPE_UNSPECIFIED" | "CLIENT_TYPE_WEB" | "CLIENT_TYPE_ANDROID" | "CLIENT_TYPE_IOS" | (string & {});
  /** The reCAPTCHA version of the reCAPTCHA token in the captcha_response. */
  recaptchaVersion?: "RECAPTCHA_VERSION_UNSPECIFIED" | "RECAPTCHA_ENTERPRISE" | (string & {});
}

export const GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  pendingIdToken: Schema.optional(Schema.String),
  captchaChallenge: Schema.optional(Schema.String),
  captchaResponse: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  tenantId: Schema.optional(Schema.String),
  clientType: Schema.optional(Schema.String),
  recaptchaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest>;

export interface GoogleCloudIdentitytoolkitV1TotpInfo {
}

export const GoogleCloudIdentitytoolkitV1TotpInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1TotpInfo> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1TotpInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1TotpInfo>;

export interface GoogleCloudIdentitytoolkitV1EmailInfo {
  /** Email address that a MFA verification should be sent to. */
  emailAddress?: string;
}

export const GoogleCloudIdentitytoolkitV1EmailInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1EmailInfo> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1EmailInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1EmailInfo>;

export interface GoogleCloudIdentitytoolkitV1MfaEnrollment {
  /** Normally this will show the phone number associated with this enrollment. In some situations, such as after a first factor sign in, it will only show the obfuscated version of the associated phone number. */
  phoneInfo?: string;
  /** Contains information specific to TOTP MFA. */
  totpInfo?: GoogleCloudIdentitytoolkitV1TotpInfo;
  /** Contains information specific to email MFA. */
  emailInfo?: GoogleCloudIdentitytoolkitV1EmailInfo;
  /** ID of this MFA option. */
  mfaEnrollmentId?: string;
  /** Display name for this mfa option e.g. "corp cell phone". */
  displayName?: string;
  /** Timestamp when the account enrolled this second factor. */
  enrolledAt?: string;
  /** Output only. Unobfuscated phone_info. */
  unobfuscatedPhoneInfo?: string;
}

export const GoogleCloudIdentitytoolkitV1MfaEnrollment: Schema.Schema<GoogleCloudIdentitytoolkitV1MfaEnrollment> = Schema.suspend(() => Schema.Struct({
  phoneInfo: Schema.optional(Schema.String),
  totpInfo: Schema.optional(GoogleCloudIdentitytoolkitV1TotpInfo),
  emailInfo: Schema.optional(GoogleCloudIdentitytoolkitV1EmailInfo),
  mfaEnrollmentId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  enrolledAt: Schema.optional(Schema.String),
  unobfuscatedPhoneInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1MfaEnrollment" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1MfaEnrollment>;

export interface GoogleCloudIdentitytoolkitV1UserNotification {
  /** Warning notification enum. Can be used for localization. */
  notificationCode?: "NOTIFICATION_CODE_UNSPECIFIED" | "MISSING_LOWERCASE_CHARACTER" | "MISSING_UPPERCASE_CHARACTER" | "MISSING_NUMERIC_CHARACTER" | "MISSING_NON_ALPHANUMERIC_CHARACTER" | "MINIMUM_PASSWORD_LENGTH" | "MAXIMUM_PASSWORD_LENGTH" | (string & {});
  /** Warning notification string. Can be used as fallback. */
  notificationMessage?: string;
}

export const GoogleCloudIdentitytoolkitV1UserNotification: Schema.Schema<GoogleCloudIdentitytoolkitV1UserNotification> = Schema.suspend(() => Schema.Struct({
  notificationCode: Schema.optional(Schema.String),
  notificationMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1UserNotification" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1UserNotification>;

export interface GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse {
  kind?: string;
  /** The ID of the authenticated user. Always present in the response. */
  localId?: string;
  /** The email of the authenticated user. Always present in the response. */
  email?: string;
  /** The user's display name stored in the account's attributes. */
  displayName?: string;
  /** An Identity Platform ID token for the authenticated user. */
  idToken?: string;
  /** Whether the email is for an existing account. Always true. */
  registered?: boolean;
  /** The user's profile picture stored in the account's attributes. */
  profilePicture?: string;
  /** The OAuth2 access token. */
  oauthAccessToken?: string;
  /** The access token expiration time in seconds. */
  oauthExpireIn?: number;
  oauthAuthorizationCode?: string;
  /** An Identity Platform refresh token for the authenticated user. */
  refreshToken?: string;
  /** The number of seconds until the Identity Platform ID token expires. */
  expiresIn?: string;
  /** An opaque string that functions as proof that the user has successfully passed the first factor authentication. */
  mfaPendingCredential?: string;
  /** Info on which multi-factor authentication providers are enabled for the account. Present if the user needs to complete the sign-in using multi-factor authentication. */
  mfaInfo?: Array<GoogleCloudIdentitytoolkitV1MfaEnrollment>;
  /** Warning notifications for the user. */
  userNotifications?: Array<GoogleCloudIdentitytoolkitV1UserNotification>;
}

export const GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  registered: Schema.optional(Schema.Boolean),
  profilePicture: Schema.optional(Schema.String),
  oauthAccessToken: Schema.optional(Schema.String),
  oauthExpireIn: Schema.optional(Schema.Number),
  oauthAuthorizationCode: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  mfaPendingCredential: Schema.optional(Schema.String),
  mfaInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1MfaEnrollment)),
  userNotifications: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1UserNotification)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse>;

export interface GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest {
  /** Required. The out-of-band code from the email link. */
  oobCode?: string;
  /** Required. The email address the sign-in link was sent to. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. */
  email?: string;
  /** A valid ID token for an Identity Platform account. If passed, this request will link the email address to the user represented by this ID token and enable sign-in with email link on the account for the future. */
  idToken?: string;
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest> = Schema.suspend(() => Schema.Struct({
  oobCode: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest>;

export interface GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse {
  kind?: string;
  /** An Identity Platform ID token for the authenticated user. */
  idToken?: string;
  /** The email the user signed in with. Always present in the response. */
  email?: string;
  /** Refresh token for the authenticated user. */
  refreshToken?: string;
  /** The number of seconds until the ID token expires. */
  expiresIn?: string;
  /** The ID of the authenticated user. Always present in the response. */
  localId?: string;
  /** Whether the authenticated user was created by this request. */
  isNewUser?: boolean;
  /** An opaque string that functions as proof that the user has successfully passed the first factor check. */
  mfaPendingCredential?: string;
  /** Info on which multi-factor authentication providers are enabled. Present if the user needs to complete the sign-in using multi-factor authentication. */
  mfaInfo?: Array<GoogleCloudIdentitytoolkitV1MfaEnrollment>;
}

export const GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  mfaPendingCredential: Schema.optional(Schema.String),
  mfaInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1MfaEnrollment)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse>;

export interface GoogleCloudIdentitytoolkitV1SignInWithIdpRequest {
  /** Required. The URL to which the IdP redirects the user back. This can be set to `http://localhost` if the user is signing in with a manually provided IdP credential. */
  requestUri?: string;
  /** If the user is signing in with an authorization response obtained via a previous CreateAuthUri authorization request, this is the body of the HTTP POST callback from the IdP, if present. Otherwise, if the user is signing in with a manually provided IdP credential, this should be a URL-encoded form that contains the credential (e.g. an ID token or access token for OAuth 2.0 IdPs) and the provider ID of the IdP that issued the credential. For example, if the user is signing in to the Google provider using a Google ID token, this should be set to id_token`=[GOOGLE_ID_TOKEN]&providerId=google.com`, where `[GOOGLE_ID_TOKEN]` should be replaced with the Google ID token. If the user is signing in to the Facebook provider using a Facebook authentication token, this should be set to id_token`=[FACEBOOK_AUTHENTICATION_TOKEN]&providerId=facebook. com&nonce= [NONCE]`, where `[FACEBOOK_AUTHENTICATION_TOKEN]` should be replaced with the Facebook authentication token. Nonce is required for validating the token. The request will fail if no nonce is provided. If the user is signing in to the Facebook provider using a Facebook access token, this should be set to access_token`=[FACEBOOK_ACCESS_TOKEN]&providerId=facebook. com`, where `[FACEBOOK_ACCESS_TOKEN]` should be replaced with the Facebook access token. If the user is signing in to the Twitter provider using a Twitter OAuth 1.0 credential, this should be set to access_token`=[TWITTER_ACCESS_TOKEN]&oauth_token_secret= [TWITTER_TOKEN_SECRET]&providerId=twitter.com`, where `[TWITTER_ACCESS_TOKEN]` and `[TWITTER_TOKEN_SECRET]` should be replaced with the Twitter OAuth access token and Twitter OAuth token secret respectively. */
  postBody?: string;
  pendingIdToken?: string;
  /** Whether or not to return the OAuth refresh token from the IdP, if available. */
  returnRefreshToken?: boolean;
  /** The session ID returned from a previous CreateAuthUri call. This field is verified against that session ID to prevent session fixation attacks. Required if the user is signing in with an authorization response from a previous CreateAuthUri authorization request. */
  sessionId?: string;
  delegatedProjectNumber?: string;
  /** A valid Identity Platform ID token. If passed, the user's account at the IdP will be linked to the account represented by this ID token. */
  idToken?: string;
  /** Should always be true. */
  returnSecureToken?: boolean;
  /** Whether or not to return OAuth credentials from the IdP on the following errors: `FEDERATED_USER_ID_ALREADY_LINKED` and `EMAIL_EXISTS`. */
  returnIdpCredential?: boolean;
  autoCreate?: boolean;
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. */
  tenantId?: string;
  /** An opaque string from a previous SignInWithIdp response. If set, it can be used to repeat the sign-in operation from the previous SignInWithIdp operation. This may be present if the user needs to confirm their account information as part of a previous federated login attempt, or perform account linking. */
  pendingToken?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithIdpRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithIdpRequest> = Schema.suspend(() => Schema.Struct({
  requestUri: Schema.optional(Schema.String),
  postBody: Schema.optional(Schema.String),
  pendingIdToken: Schema.optional(Schema.String),
  returnRefreshToken: Schema.optional(Schema.Boolean),
  sessionId: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  returnIdpCredential: Schema.optional(Schema.Boolean),
  autoCreate: Schema.optional(Schema.Boolean),
  tenantId: Schema.optional(Schema.String),
  pendingToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithIdpRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithIdpRequest>;

export interface GoogleCloudIdentitytoolkitV1SignInWithIdpResponse {
  /** The user's account ID at the IdP. Always present in the response. */
  federatedId?: string;
  /** The provider ID of the IdP that the user is signing in to. Always present in the response. */
  providerId?: string;
  /** The email address of the user's account at the IdP. */
  email?: string;
  /** Whether the user account's email address is verified. */
  emailVerified?: boolean;
  /** The first name for the user's account at the IdP. */
  firstName?: string;
  /** The full name for the user's account at the IdP. */
  fullName?: string;
  /** The last name for the user's account at the IdP. */
  lastName?: string;
  /** The nickname for the user's account at the IdP. */
  nickName?: string;
  /** The language preference for the user's account at the IdP. */
  language?: string;
  /** The time zone for the user's account at the IdP. */
  timeZone?: string;
  /** The URL of the user's profile picture at the IdP. */
  photoUrl?: string;
  /** The date of birth for the user's account at the IdP. */
  dateOfBirth?: string;
  inputEmail?: string;
  /** The main (top-level) email address of the user's Identity Platform account, if different from the email address at the IdP. Only present if the "One account per email address" setting is enabled. */
  originalEmail?: string;
  /** The ID of the authenticated Identity Platform user. Always present in the response. */
  localId?: string;
  /** Whether or not there is an existing Identity Platform user account with the same email address but linked to a different account at the same IdP. Only present if the "One account per email address" setting is enabled and the email address at the IdP is verified. */
  emailRecycled?: boolean;
  /** The display name for the user's account at the IdP. */
  displayName?: string;
  /** An Identity Platform ID token for the authenticated user. */
  idToken?: string;
  /** The opaque string set in CreateAuthUri that is used to maintain contextual information between the authentication request and the callback from the IdP. */
  context?: string;
  /** A list of provider IDs that the user can sign in to in order to resolve a `need_confirmation` error. Only present if `need_confirmation` is set to `true`. */
  verifiedProvider?: Array<string>;
  /** Whether or not there is an existing Identity Platform user account with the same email address as the current account signed in at the IdP, and the account's email address is not verified at the IdP. The user will need to sign in to the existing Identity Platform account and then link the current credential from the IdP to it. Only present if the "One account per email address" setting is enabled. */
  needConfirmation?: boolean;
  /** The OAuth access token from the IdP, if available. */
  oauthAccessToken?: string;
  /** The OAuth 2.0 refresh token from the IdP, if available and `return_refresh_token` is set to `true`. */
  oauthRefreshToken?: string;
  /** The number of seconds until the OAuth access token from the IdP expires. */
  oauthExpireIn?: number;
  /** The OAuth 2.0 authorization code, if available. Only present for the Google provider. */
  oauthAuthorizationCode?: string;
  needEmail?: boolean;
  /** The OAuth 1.0 token secret from the IdP, if available. Only present for the Twitter provider. */
  oauthTokenSecret?: string;
  /** An Identity Platform refresh token for the authenticated user. */
  refreshToken?: string;
  /** The number of seconds until the Identity Platform ID token expires. */
  expiresIn?: string;
  /** The OpenID Connect ID token from the IdP, if available. */
  oauthIdToken?: string;
  /** The screen name for the user's account at the Twitter IdP or the login name for the user's account at the GitHub IdP. */
  screenName?: string;
  /** The stringified JSON response containing all the data corresponding to the user's account at the IdP. */
  rawUserInfo?: string;
  /** The error message returned if `return_idp_credential` is set to `true` and either the `FEDERATED_USER_ID_ALREADY_LINKED` or `EMAIL_EXISTS` error is encountered. This field's value is either `FEDERATED_USER_ID_ALREADY_LINKED` or `EMAIL_EXISTS`. */
  errorMessage?: string;
  /** Whether or not a new Identity Platform account was created for the authenticated user. */
  isNewUser?: boolean;
  kind?: string;
  /** An opaque string that can be used as a credential from the IdP the user is signing into. The pending token obtained here can be set in a future SignInWithIdp request to sign the same user in with the IdP again. */
  pendingToken?: string;
  /** The value of the `tenant_id` field in the request. */
  tenantId?: string;
  /** An opaque string that functions as proof that the user has successfully passed the first factor authentication. */
  mfaPendingCredential?: string;
  /** Info on which multi-factor authentication providers are enabled for the account. Present if the user needs to complete the sign-in using multi-factor authentication. */
  mfaInfo?: Array<GoogleCloudIdentitytoolkitV1MfaEnrollment>;
}

export const GoogleCloudIdentitytoolkitV1SignInWithIdpResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithIdpResponse> = Schema.suspend(() => Schema.Struct({
  federatedId: Schema.optional(Schema.String),
  providerId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
  firstName: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
  lastName: Schema.optional(Schema.String),
  nickName: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  dateOfBirth: Schema.optional(Schema.String),
  inputEmail: Schema.optional(Schema.String),
  originalEmail: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  emailRecycled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  context: Schema.optional(Schema.String),
  verifiedProvider: Schema.optional(Schema.Array(Schema.String)),
  needConfirmation: Schema.optional(Schema.Boolean),
  oauthAccessToken: Schema.optional(Schema.String),
  oauthRefreshToken: Schema.optional(Schema.String),
  oauthExpireIn: Schema.optional(Schema.Number),
  oauthAuthorizationCode: Schema.optional(Schema.String),
  needEmail: Schema.optional(Schema.Boolean),
  oauthTokenSecret: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  oauthIdToken: Schema.optional(Schema.String),
  screenName: Schema.optional(Schema.String),
  rawUserInfo: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  pendingToken: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  mfaPendingCredential: Schema.optional(Schema.String),
  mfaInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1MfaEnrollment)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithIdpResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithIdpResponse>;

export interface GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest {
  /** Encrypted session information from the response of sendVerificationCode. In the case of authenticating with an SMS code this must be specified, but in the case of using a temporary proof it can be unspecified. */
  sessionInfo?: string;
  /** The user's phone number to sign in with. This is necessary in the case of uing a temporary proof, in which case it must match the phone number that was authenticated in the request that generated the temporary proof. This field is ignored if a session info is passed. */
  phoneNumber?: string;
  /** User-entered verification code from an SMS sent to the user's phone. */
  code?: string;
  /** A proof of the phone number verification, provided from a previous signInWithPhoneNumber request. If this is passed, the caller must also pass in the phone_number field the phone number that was verified in the previous request. */
  temporaryProof?: string;
  /** Do not use. */
  verificationProof?: string;
  /** A valid ID token for an Identity Platform account. If passed, this request will link the phone number to the user represented by this ID token if the phone number is not in use, or will reauthenticate the user if the phone number is already linked to the user. */
  idToken?: string;
  operation?: "VERIFY_OP_UNSPECIFIED" | "SIGN_UP_OR_IN" | "REAUTH" | "UPDATE" | "LINK" | (string & {});
  /** The ID of the Identity Platform tenant the user is signing in to. If not set, the user will sign in to the default Identity Platform project. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest> = Schema.suspend(() => Schema.Struct({
  sessionInfo: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  temporaryProof: Schema.optional(Schema.String),
  verificationProof: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest>;

export interface GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse {
  /** Identity Platform ID token for the authenticated user. */
  idToken?: string;
  /** Refresh token for the authenticated user. */
  refreshToken?: string;
  /** The number of seconds until the ID token expires. */
  expiresIn?: string;
  /** The id of the authenticated user. Present in the case of a successful authentication. In the case when the phone could be verified but the account operation could not be performed, a temporary proof will be returned instead. */
  localId?: string;
  /** Whether the authenticated user was created by this request. */
  isNewUser?: boolean;
  /** A proof of the phone number verification, provided if a phone authentication is successful but the user operation fails. This happens when the request tries to link a phone number to a user with an ID token or reauthenticate with an ID token but the phone number is linked to a different user. */
  temporaryProof?: string;
  /** Do not use. */
  verificationProof?: string;
  /** Do not use. */
  verificationProofExpiresIn?: string;
  /** Phone number of the authenticated user. Always present in the response. */
  phoneNumber?: string;
  /** The number of seconds until the temporary proof expires. */
  temporaryProofExpiresIn?: string;
}

export const GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  temporaryProof: Schema.optional(Schema.String),
  verificationProof: Schema.optional(Schema.String),
  verificationProofExpiresIn: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  temporaryProofExpiresIn: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse>;

export interface GoogleCloudIdentitytoolkitV1VerifyIosClientRequest {
  /** A device token that the iOS client gets after registering to APNs (Apple Push Notification service). */
  appToken?: string;
  /** Whether the app token is in the iOS sandbox. If false, the app token is in the production environment. */
  isSandbox?: boolean;
}

export const GoogleCloudIdentitytoolkitV1VerifyIosClientRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1VerifyIosClientRequest> = Schema.suspend(() => Schema.Struct({
  appToken: Schema.optional(Schema.String),
  isSandbox: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1VerifyIosClientRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1VerifyIosClientRequest>;

export interface GoogleCloudIdentitytoolkitV1VerifyIosClientResponse {
  /** Receipt of successful app token validation. */
  receipt?: string;
  /** Suggested time that the client should wait in seconds for delivery of the push notification. */
  suggestedTimeout?: string;
}

export const GoogleCloudIdentitytoolkitV1VerifyIosClientResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1VerifyIosClientResponse> = Schema.suspend(() => Schema.Struct({
  receipt: Schema.optional(Schema.String),
  suggestedTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1VerifyIosClientResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1VerifyIosClientResponse>;

export interface GoogleCloudIdentitytoolkitV1MfaFactor {
  /** Phone number to receive OTP for MFA. */
  phoneInfo?: string;
  /** Display name for this mfa option e.g. "corp cell phone". */
  displayName?: string;
}

export const GoogleCloudIdentitytoolkitV1MfaFactor: Schema.Schema<GoogleCloudIdentitytoolkitV1MfaFactor> = Schema.suspend(() => Schema.Struct({
  phoneInfo: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1MfaFactor" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1MfaFactor>;

export interface GoogleCloudIdentitytoolkitV1SignUpRequest {
  /** The email to assign to the created user. The length of the email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. An anonymous user will be created if not provided. */
  email?: string;
  /** The password to assign to the created user. The password must be be at least 6 characters long. If set, the `email` field must also be set. */
  password?: string;
  /** The display name of the user to be created. */
  displayName?: string;
  captchaChallenge?: string;
  /** The reCAPTCHA token provided by the reCAPTCHA client-side integration. reCAPTCHA Enterprise uses it for assessment. Required when reCAPTCHA enterprise is enabled. */
  captchaResponse?: string;
  instanceId?: string;
  /** A valid ID token for an Identity Platform user. If set, this request will link the authentication credential to the user represented by this ID token. For a non-admin request, both the `email` and `password` fields must be set. For an admin request, `local_id` must not be set. */
  idToken?: string;
  /** Whether the user's email is verified. Specifying this field requires a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  emailVerified?: boolean;
  /** The profile photo url of the user to create. */
  photoUrl?: string;
  /** Whether the user will be disabled upon creation. Disabled accounts are inaccessible except for requests bearing a Google OAuth2 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  disabled?: boolean;
  /** The ID of the user to create. The ID must be unique within the project that the user is being created under. Specifying this field requires a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  localId?: string;
  /** The phone number of the user to create. Specifying this field requires a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  phoneNumber?: string;
  /** The ID of the Identity Platform tenant to create a user under. If not set, the user will be created under the default Identity Platform project. */
  tenantId?: string;
  /** The project ID of the project which the user should belong to. Specifying this field requires a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). If this is not set, the target project is inferred from the scope associated to the Bearer access token. */
  targetProjectId?: string;
  /** The multi-factor authentication providers for the user to create. */
  mfaInfo?: Array<GoogleCloudIdentitytoolkitV1MfaFactor>;
  /** The client type: web, Android or iOS. Required when enabling reCAPTCHA enterprise protection. */
  clientType?: "CLIENT_TYPE_UNSPECIFIED" | "CLIENT_TYPE_WEB" | "CLIENT_TYPE_ANDROID" | "CLIENT_TYPE_IOS" | (string & {});
  /** The reCAPTCHA version of the reCAPTCHA token in the captcha_response. */
  recaptchaVersion?: "RECAPTCHA_VERSION_UNSPECIFIED" | "RECAPTCHA_ENTERPRISE" | (string & {});
}

export const GoogleCloudIdentitytoolkitV1SignUpRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SignUpRequest> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  captchaChallenge: Schema.optional(Schema.String),
  captchaResponse: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
  photoUrl: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  localId: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
  mfaInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1MfaFactor)),
  clientType: Schema.optional(Schema.String),
  recaptchaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignUpRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignUpRequest>;

export interface GoogleCloudIdentitytoolkitV1SignUpResponse {
  kind?: string;
  /** An Identity Platform ID token for the created user. This field is only set for non-admin requests. */
  idToken?: string;
  /** The created user's display name. */
  displayName?: string;
  /** The created user's email. */
  email?: string;
  /** An Identity Platform refresh token for the created user. This field is only set for non-admin requests. */
  refreshToken?: string;
  /** The number of seconds until the ID token expires. */
  expiresIn?: string;
  /** The ID of the created user. Always present in the response. */
  localId?: string;
}

export const GoogleCloudIdentitytoolkitV1SignUpResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SignUpResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SignUpResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SignUpResponse>;

export interface GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest {
  /** Relying Party identifier, which is the audience of issued SAMLResponse. */
  rpId?: string;
  /** The Identity Platform ID token. It will be verified and then converted to a new SAMLResponse. */
  idToken?: string;
  /** SAML app entity id specified in Google Admin Console for each app. If developers want to redirect to a third-party app rather than a G Suite app, they'll probably they need this. When it's used, we'll return a RelayState. This includes a SAMLRequest, which can be used to trigger a SP-initiated SAML flow to redirect to the real app. */
  samlAppEntityId?: string;
}

export const GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest> = Schema.suspend(() => Schema.Struct({
  rpId: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  samlAppEntityId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest>;

export interface GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse {
  /** Signed SAMLResponse created for the Relying Party. */
  samlResponse?: string;
  /** The ACS endpoint which consumes the returned SAMLResponse. */
  acsEndpoint?: string;
  /** Generated RelayState. */
  relayState?: string;
  /** Email of the user. */
  email?: string;
  /** First name of the user. */
  firstName?: string;
  /** Last name of the user. */
  lastName?: string;
  /** Whether the logged in user was created by this request. */
  isNewUser?: boolean;
}

export const GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse> = Schema.suspend(() => Schema.Struct({
  samlResponse: Schema.optional(Schema.String),
  acsEndpoint: Schema.optional(Schema.String),
  relayState: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  firstName: Schema.optional(Schema.String),
  lastName: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse>;

export interface GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest {
  /** Required. List of user IDs to be deleted. */
  localIds?: Array<string>;
  /** Whether to force deleting accounts that are not in disabled state. If false, only disabled accounts will be deleted, and accounts that are not disabled will be added to the `errors`. */
  force?: boolean;
  /** If the accounts belong to an Identity Platform tenant, the ID of the tenant. If the accounts belong to a default Identity Platform project, the field is not needed. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest> = Schema.suspend(() => Schema.Struct({
  localIds: Schema.optional(Schema.Array(Schema.String)),
  force: Schema.optional(Schema.Boolean),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest>;

export interface GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo {
  /** The index of the errored item in the original local_ids field. */
  index?: number;
  /** The corresponding user ID. */
  localId?: string;
  /** Detailed error message. */
  message?: string;
}

export const GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  localId: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo>;

export interface GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse {
  /** Detailed error info for accounts that cannot be deleted. */
  errors?: Array<GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo>;
}

export const GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1BatchDeleteErrorInfo)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse>;

export interface GoogleCloudIdentitytoolkitV1DeleteAccountRequest {
  /** The ID of user account to delete. Specifying this field requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). Requests from users lacking the credential should pass an ID token instead. */
  localId?: string;
  delegatedProjectNumber?: string;
  /** The Identity Platform ID token of the account to delete. Require to be specified for requests from end users that lack Google OAuth 2.0 credential. Authenticated requests bearing a Google OAuth2 credential with proper permissions may pass local_id to specify the account to delete alternatively. */
  idToken?: string;
  /** The ID of the tenant that the account belongs to, if applicable. Only require to be specified for authenticated requests bearing a Google OAuth 2.0 credential that specify local_id of an account that belongs to an Identity Platform tenant. */
  tenantId?: string;
  /** The ID of the project which the account belongs to. Should only be specified in authenticated requests that specify local_id of an account. */
  targetProjectId?: string;
}

export const GoogleCloudIdentitytoolkitV1DeleteAccountRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1DeleteAccountRequest> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1DeleteAccountRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1DeleteAccountRequest>;

export interface GoogleCloudIdentitytoolkitV1DeleteAccountResponse {
  kind?: string;
}

export const GoogleCloudIdentitytoolkitV1DeleteAccountResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1DeleteAccountResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1DeleteAccountResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1DeleteAccountResponse>;

export interface GoogleCloudIdentitytoolkitV1ProviderUserInfo {
  /** The ID of the Identity Provider. */
  providerId?: string;
  /** The user's display name at the Identity Provider. */
  displayName?: string;
  /** The user's profile photo URL at the Identity Provider. */
  photoUrl?: string;
  /** The user's identifier at the Identity Provider. */
  federatedId?: string;
  /** The user's email address at the Identity Provider. */
  email?: string;
  /** The user's raw identifier directly returned from Identity Provider. */
  rawId?: string;
  /** The user's screen_name at Twitter or login name at GitHub. */
  screenName?: string;
  /** The user's phone number at the Identity Provider. */
  phoneNumber?: string;
}

export const GoogleCloudIdentitytoolkitV1ProviderUserInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1ProviderUserInfo> = Schema.suspend(() => Schema.Struct({
  providerId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  federatedId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  rawId: Schema.optional(Schema.String),
  screenName: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1ProviderUserInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1ProviderUserInfo>;

export interface GoogleCloudIdentitytoolkitV1UserInfo {
  /** Immutable. The unique ID of the account. */
  localId?: string;
  /** The account's email address. The length of the email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec. */
  email?: string;
  /** The display name of the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. */
  displayName?: string;
  /** Output only. The language preference of the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. */
  language?: string;
  /** The URL of the account's profile photo. This account attribute is not used by Identity Platform. It is available for informational purposes only. */
  photoUrl?: string;
  /** Output only. The time zone preference of the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. */
  timeZone?: string;
  /** Output only. The date of birth set for the account. This account attribute is not used by Identity Platform. It is available for informational purposes only. */
  dateOfBirth?: string;
  /** The account's hashed password. Only accessible by requests bearing a Google OAuth2 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  passwordHash?: string;
  /** The account's password salt. Only accessible by requests bearing a Google OAuth2 credential with proper permissions. */
  salt?: string;
  /** The version of the account's password. Only accessible by requests bearing a Google OAuth2 credential with proper permissions. */
  version?: number;
  /** Whether the account's email address has been verified. */
  emailVerified?: boolean;
  /** The timestamp, in milliseconds from the epoch of 1970-01-01T00:00:00Z, when the account's password was last updated. */
  passwordUpdatedAt?: number;
  /** Information about the user as provided by various Identity Providers. */
  providerUserInfo?: Array<GoogleCloudIdentitytoolkitV1ProviderUserInfo>;
  /** Oldest timestamp, in seconds since epoch, that an ID token should be considered valid. All ID tokens issued before this time are considered invalid. */
  validSince?: string;
  /** Whether the account is disabled. Disabled accounts are inaccessible except for requests bearing a Google OAuth2 credential with proper permissions. */
  disabled?: boolean;
  /** The last time, in milliseconds from epoch, this account was logged into. */
  lastLoginAt?: string;
  /** The time, in milliseconds from epoch, when the account was created. */
  createdAt?: string;
  /** Output only. This account's screen name at Twitter or login name at GitHub. */
  screenName?: string;
  /** Output only. Whether this account has been authenticated using SignInWithCustomToken. */
  customAuth?: boolean;
  /** Input only. Plain text password used to update a account's password. This field is only ever used as input in a request. Identity Platform uses cryptographically secure hashing when managing passwords and will never store or transmit a user's password in plain text. */
  rawPassword?: string;
  /** The account's phone number. */
  phoneNumber?: string;
  /** Custom claims to be added to any ID tokens minted for the account. Should be at most 1,000 characters in length and in valid JSON format. */
  customAttributes?: string;
  /** Output only. Whether the account can authenticate with email link. */
  emailLinkSignin?: boolean;
  /** ID of the tenant this account belongs to. Only set if this account belongs to a tenant. */
  tenantId?: string;
  /** Information on which multi-factor authentication providers are enabled for this account. */
  mfaInfo?: Array<GoogleCloudIdentitytoolkitV1MfaEnrollment>;
  /** The first email address associated with this account. The account's initial email cannot be changed once set and is used to recover access to this account if lost via the RECOVER_EMAIL flow in GetOobCode. Should match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec. */
  initialEmail?: string;
  /** Timestamp when an ID token was last minted for this account. */
  lastRefreshAt?: string;
}

export const GoogleCloudIdentitytoolkitV1UserInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1UserInfo> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  dateOfBirth: Schema.optional(Schema.String),
  passwordHash: Schema.optional(Schema.String),
  salt: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  emailVerified: Schema.optional(Schema.Boolean),
  passwordUpdatedAt: Schema.optional(Schema.Number),
  providerUserInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1ProviderUserInfo)),
  validSince: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  lastLoginAt: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  screenName: Schema.optional(Schema.String),
  customAuth: Schema.optional(Schema.Boolean),
  rawPassword: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  customAttributes: Schema.optional(Schema.String),
  emailLinkSignin: Schema.optional(Schema.Boolean),
  tenantId: Schema.optional(Schema.String),
  mfaInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1MfaEnrollment)),
  initialEmail: Schema.optional(Schema.String),
  lastRefreshAt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1UserInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1UserInfo>;

export interface GoogleCloudIdentitytoolkitV1DownloadAccountResponse {
  kind?: string;
  /** All accounts belonging to the project/tenant limited by max_results in the request. */
  users?: Array<GoogleCloudIdentitytoolkitV1UserInfo>;
  /** If there are more accounts to be downloaded, a token that can be passed back to DownloadAccount to get more accounts. Otherwise, this is blank. */
  nextPageToken?: string;
}

export const GoogleCloudIdentitytoolkitV1DownloadAccountResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1DownloadAccountResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  users: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1UserInfo)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1DownloadAccountResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1DownloadAccountResponse>;

export interface GoogleCloudIdentitytoolkitV1FederatedUserIdentifier {
  /** The ID of supported identity providers. This should be a provider ID enabled for sign-in, which is either from the list of [default supported IdPs](https://cloud.google.com/identity-platform/docs/reference/rest/v2/defaultSupportedIdps/list), or of the format `oidc.*` or `saml.*`. Some examples are `google.com`, `facebook.com`, `oidc.testapp`, and `saml.testapp`. */
  providerId?: string;
  /** The user ID of the account at the third-party Identity Provider specified by `provider_id`. */
  rawId?: string;
}

export const GoogleCloudIdentitytoolkitV1FederatedUserIdentifier: Schema.Schema<GoogleCloudIdentitytoolkitV1FederatedUserIdentifier> = Schema.suspend(() => Schema.Struct({
  providerId: Schema.optional(Schema.String),
  rawId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1FederatedUserIdentifier" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1FederatedUserIdentifier>;

export interface GoogleCloudIdentitytoolkitV1GetAccountInfoRequest {
  /** The Identity Platform ID token of the account to fetch. Require to be specified for requests from end users. */
  idToken?: string;
  /** The ID of one or more accounts to fetch. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  localId?: Array<string>;
  /** The email address of one or more accounts to fetch. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. Should only be specified by authenticated requests from a developer. */
  email?: Array<string>;
  delegatedProjectNumber?: string;
  /** The phone number of one or more accounts to fetch. Should only be specified by authenticated requests from a developer and should be in E.164 format, for example, +15555555555. */
  phoneNumber?: Array<string>;
  federatedUserId?: Array<GoogleCloudIdentitytoolkitV1FederatedUserIdentifier>;
  /** The ID of the tenant that the account belongs to. Should only be specified by authenticated requests from a developer. */
  tenantId?: string;
  /** The ID of the Google Cloud project that the account or the Identity Platform tenant specified by `tenant_id` belongs to. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  targetProjectId?: string;
  /** The initial email of one or more accounts to fetch. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. Should only be specified by authenticated requests from a developer. */
  initialEmail?: Array<string>;
}

export const GoogleCloudIdentitytoolkitV1GetAccountInfoRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1GetAccountInfoRequest> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.Array(Schema.String)),
  email: Schema.optional(Schema.Array(Schema.String)),
  delegatedProjectNumber: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.Array(Schema.String)),
  federatedUserId: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1FederatedUserIdentifier)),
  tenantId: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
  initialEmail: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetAccountInfoRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetAccountInfoRequest>;

export interface GoogleCloudIdentitytoolkitV1GetAccountInfoResponse {
  kind?: string;
  /** The information of specific user account(s) matching the parameters in the request. */
  users?: Array<GoogleCloudIdentitytoolkitV1UserInfo>;
}

export const GoogleCloudIdentitytoolkitV1GetAccountInfoResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1GetAccountInfoResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  users: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1UserInfo)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetAccountInfoResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetAccountInfoResponse>;

export interface GoogleCloudIdentitytoolkitV1GetOobCodeRequest {
  /** Required. The type of out-of-band (OOB) code to send. Depending on this value, other fields in this request will be required and/or have different meanings. There are 4 different OOB codes that can be sent: * PASSWORD_RESET * EMAIL_SIGNIN * VERIFY_EMAIL * VERIFY_AND_CHANGE_EMAIL */
  requestType?: "OOB_REQ_TYPE_UNSPECIFIED" | "PASSWORD_RESET" | "OLD_EMAIL_AGREE" | "NEW_EMAIL_ACCEPT" | "VERIFY_EMAIL" | "RECOVER_EMAIL" | "EMAIL_SIGNIN" | "VERIFY_AND_CHANGE_EMAIL" | "REVERT_SECOND_FACTOR_ADDITION" | (string & {});
  /** The account's email address to send the OOB code to, and generally the email address of the account that needs to be updated. Required for PASSWORD_RESET, EMAIL_SIGNIN, and VERIFY_EMAIL. Only required for VERIFY_AND_CHANGE_EMAIL requests when return_oob_link is set to true. In this case, it is the original email of the user. */
  email?: string;
  challenge?: string;
  /** For a PASSWORD_RESET request, a reCaptcha response is required when the system detects possible abuse activity. In those cases, this is the response from the reCaptcha challenge used to verify the caller. */
  captchaResp?: string;
  /** The IP address of the caller. Required only for PASSWORD_RESET requests. */
  userIp?: string;
  /** The email address the account is being updated to. Required only for VERIFY_AND_CHANGE_EMAIL requests. */
  newEmail?: string;
  /** An ID token for the account. It is required for VERIFY_AND_CHANGE_EMAIL and VERIFY_EMAIL requests unless return_oob_link is set to true. */
  idToken?: string;
  /** The Url to continue after user clicks the link sent in email. This is the url that will allow the web widget to handle the OOB code. */
  continueUrl?: string;
  /** If an associated iOS app can handle the OOB code, the iOS bundle id of this app. This will allow the correct app to open if it is already installed. */
  iOSBundleId?: string;
  /** If an associated iOS app can handle the OOB code, the App Store id of this app. This will allow App Store to open to the correct app if the app is not yet installed. */
  iOSAppStoreId?: string;
  /** If an associated android app can handle the OOB code, the Android package name of the android app that will handle the callback when this OOB code is used. This will allow the correct app to open if it is already installed, or allow Google Play Store to open to the correct app if it is not yet installed. */
  androidPackageName?: string;
  /** If an associated android app can handle the OOB code, whether or not to install the android app on the device where the link is opened if the app is not already installed. */
  androidInstallApp?: boolean;
  /** If an associated android app can handle the OOB code, the minimum version of the app. If the version on the device is lower than this version then the user is taken to Google Play Store to upgrade the app. */
  androidMinimumVersion?: string;
  /** When set to true, the OOB code link will be be sent as a Universal Link or an Android App Link and will be opened by the corresponding app if installed. If not set, or set to false, the OOB code will be sent to the web widget first and then on continue will redirect to the app if installed. */
  canHandleCodeInApp?: boolean;
  /** The tenant ID of the Identity Platform tenant the account belongs to. */
  tenantId?: string;
  /** The Project ID of the Identity Platform project which the account belongs to. To specify this field, it requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  targetProjectId?: string;
  /** In order to ensure that the url used can be easily opened up in iOS or android, we create a [Firebase Dynamic Link](https://firebase.google.com/docs/dynamic-links). Most Identity Platform projects will only have one Dynamic Link domain enabled, and can leave this field blank. This field contains a specified Dynamic Link domain for projects that have multiple enabled. */
  dynamicLinkDomain?: string;
  /** Whether the confirmation link containing the OOB code should be returned in the response (no email is sent). Used when a developer wants to construct the email template and send it on their own. By default this is false; to specify this field, and to set it to true, it requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control) */
  returnOobLink?: boolean;
  /** The client type: web, Android or iOS. Required when reCAPTCHA Enterprise protection is enabled. */
  clientType?: "CLIENT_TYPE_UNSPECIFIED" | "CLIENT_TYPE_WEB" | "CLIENT_TYPE_ANDROID" | "CLIENT_TYPE_IOS" | (string & {});
  /** The reCAPTCHA version of the reCAPTCHA token in the captcha_response. */
  recaptchaVersion?: "RECAPTCHA_VERSION_UNSPECIFIED" | "RECAPTCHA_ENTERPRISE" | (string & {});
  /** Optional. In order to ensure that the url used can be easily opened in iOS or Android, we create a Hosting link '/__/auth/links'. This optional field contains the domain to use when constructing a Hosting link. If not set, '.firebaseapp.com' domain will be used. */
  linkDomain?: string;
}

export const GoogleCloudIdentitytoolkitV1GetOobCodeRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1GetOobCodeRequest> = Schema.suspend(() => Schema.Struct({
  requestType: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  challenge: Schema.optional(Schema.String),
  captchaResp: Schema.optional(Schema.String),
  userIp: Schema.optional(Schema.String),
  newEmail: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  continueUrl: Schema.optional(Schema.String),
  iOSBundleId: Schema.optional(Schema.String),
  iOSAppStoreId: Schema.optional(Schema.String),
  androidPackageName: Schema.optional(Schema.String),
  androidInstallApp: Schema.optional(Schema.Boolean),
  androidMinimumVersion: Schema.optional(Schema.String),
  canHandleCodeInApp: Schema.optional(Schema.Boolean),
  tenantId: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
  dynamicLinkDomain: Schema.optional(Schema.String),
  returnOobLink: Schema.optional(Schema.Boolean),
  clientType: Schema.optional(Schema.String),
  recaptchaVersion: Schema.optional(Schema.String),
  linkDomain: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetOobCodeRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetOobCodeRequest>;

export interface GoogleCloudIdentitytoolkitV1GetOobCodeResponse {
  kind?: string;
  /** If return_oob_link is true in the request, the OOB code to send. */
  oobCode?: string;
  /** If return_oob_link is false in the request, the email address the verification was sent to. */
  email?: string;
  /** If return_oob_link is true in the request, the OOB link to be sent to the user. This returns the constructed link including [Firebase Dynamic Link](https://firebase.google.com/docs/dynamic-links) related parameters. */
  oobLink?: string;
}

export const GoogleCloudIdentitytoolkitV1GetOobCodeResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1GetOobCodeResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  oobCode: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  oobLink: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetOobCodeResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetOobCodeResponse>;

export interface GoogleCloudIdentitytoolkitV1SqlExpression {
  /** A case insensitive string that the account's email should match. Only one of `email`, `phone_number`, or `user_id` should be specified in a SqlExpression. If more than one is specified, only the first (in that order) will be applied. */
  email?: string;
  /** A string that the account's local ID should match. Only one of `email`, `phone_number`, or `user_id` should be specified in a SqlExpression If more than one is specified, only the first (in that order) will be applied. */
  userId?: string;
  /** A string that the account's phone number should match. Only one of `email`, `phone_number`, or `user_id` should be specified in a SqlExpression. If more than one is specified, only the first (in that order) will be applied. */
  phoneNumber?: string;
}

export const GoogleCloudIdentitytoolkitV1SqlExpression: Schema.Schema<GoogleCloudIdentitytoolkitV1SqlExpression> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SqlExpression" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SqlExpression>;

export interface GoogleCloudIdentitytoolkitV1QueryUserInfoRequest {
  /** If `true`, this request will return the accounts matching the query. If `false`, only the __count__ of accounts matching the query will be returned. Defaults to `true`. */
  returnUserInfo?: boolean;
  /** The maximum number of accounts to return with an upper limit of __500__. Defaults to _500_. Only valid when `return_user_info` is set to `true`. */
  limit?: string;
  /** The number of accounts to skip from the beginning of matching records. Only valid when `return_user_info` is set to `true`. */
  offset?: string;
  sortBy?: "SORT_BY_FIELD_UNSPECIFIED" | "USER_ID" | "NAME" | "CREATED_AT" | "LAST_LOGIN_AT" | "USER_EMAIL" | (string & {});
  order?: "ORDER_UNSPECIFIED" | "ASC" | "DESC" | (string & {});
  /** The ID of the tenant to which the result is scoped. */
  tenantId?: string;
  expression?: Array<GoogleCloudIdentitytoolkitV1SqlExpression>;
}

export const GoogleCloudIdentitytoolkitV1QueryUserInfoRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1QueryUserInfoRequest> = Schema.suspend(() => Schema.Struct({
  returnUserInfo: Schema.optional(Schema.Boolean),
  limit: Schema.optional(Schema.String),
  offset: Schema.optional(Schema.String),
  sortBy: Schema.optional(Schema.String),
  order: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1SqlExpression)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1QueryUserInfoRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1QueryUserInfoRequest>;

export interface GoogleCloudIdentitytoolkitV1QueryUserInfoResponse {
  /** If `return_user_info` in the request is true, this is the number of returned accounts in this message. Otherwise, this is the total number of accounts matching the query. */
  recordsCount?: string;
  /** If `return_user_info` in the request is true, this is the accounts matching the query. */
  userInfo?: Array<GoogleCloudIdentitytoolkitV1UserInfo>;
}

export const GoogleCloudIdentitytoolkitV1QueryUserInfoResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1QueryUserInfoResponse> = Schema.suspend(() => Schema.Struct({
  recordsCount: Schema.optional(Schema.String),
  userInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1UserInfo)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1QueryUserInfoResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1QueryUserInfoResponse>;

export interface GoogleCloudIdentitytoolkitV1ResetPasswordRequest {
  /** An out-of-band (OOB) code generated by GetOobCode request. Specify only this parameter (or only this parameter and a tenant ID) to get the out-of-band code's type in the response without mutating the account's state. Only a PASSWORD_RESET out-of-band code can be consumed via this method. */
  oobCode?: string;
  /** The new password to be set for this account. Specifying this field will result in a change to the account and consume the out-of-band code if one was specified and it was of type PASSWORD_RESET. */
  newPassword?: string;
  /** The current password of the account to be modified. Specify this and email to change an account's password without using an out-of-band code. */
  oldPassword?: string;
  /** Optional. The email of the account to be modified. Specify this and the old password in order to change an account's password without using an out-of-band code. */
  email?: string;
  /** Optional. The tenant ID of the Identity Platform tenant the account belongs to. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1ResetPasswordRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1ResetPasswordRequest> = Schema.suspend(() => Schema.Struct({
  oobCode: Schema.optional(Schema.String),
  newPassword: Schema.optional(Schema.String),
  oldPassword: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1ResetPasswordRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1ResetPasswordRequest>;

export interface GoogleCloudIdentitytoolkitV1ResetPasswordResponse {
  kind?: string;
  /** The email associated with the out-of-band code that was used. */
  email?: string;
  newEmail?: string;
  requestType?: "OOB_REQ_TYPE_UNSPECIFIED" | "PASSWORD_RESET" | "OLD_EMAIL_AGREE" | "NEW_EMAIL_ACCEPT" | "VERIFY_EMAIL" | "RECOVER_EMAIL" | "EMAIL_SIGNIN" | "VERIFY_AND_CHANGE_EMAIL" | "REVERT_SECOND_FACTOR_ADDITION" | (string & {});
  mfaInfo?: GoogleCloudIdentitytoolkitV1MfaEnrollment;
}

export const GoogleCloudIdentitytoolkitV1ResetPasswordResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1ResetPasswordResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  newEmail: Schema.optional(Schema.String),
  requestType: Schema.optional(Schema.String),
  mfaInfo: Schema.optional(GoogleCloudIdentitytoolkitV1MfaEnrollment),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1ResetPasswordResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1ResetPasswordResponse>;

export interface GoogleCloudIdentitytoolkitV1MfaInfo {
  /** The second factors the user has enrolled. */
  enrollments?: Array<GoogleCloudIdentitytoolkitV1MfaEnrollment>;
}

export const GoogleCloudIdentitytoolkitV1MfaInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1MfaInfo> = Schema.suspend(() => Schema.Struct({
  enrollments: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1MfaEnrollment)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1MfaInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1MfaInfo>;

export interface GoogleCloudIdentitytoolkitV1SetAccountInfoRequest {
  /** A valid Identity Platform ID token. Required when attempting to change user-related information. */
  idToken?: string;
  /** The ID of the user. Specifying this field requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). For requests from end-users, an ID token should be passed instead. */
  localId?: string;
  /** The user's new display name to be updated in the account's attributes. The length of the display name must be less than or equal to 256 characters. */
  displayName?: string;
  /** The user's new email to be updated in the account's attributes. The length of email should be less than 256 characters and in the format of `name@domain.tld`. The email should also match the [RFC 822](https://tools.ietf.org/html/rfc822) addr-spec production. If [email enumeration protection](https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection) is enabled, the email cannot be changed by the user without verifying the email first, but it can be changed by an administrator. */
  email?: string;
  /** The user's new password to be updated in the account's attributes. The password must be at least 6 characters long. */
  password?: string;
  /** The Identity Providers that the account should be associated with. */
  provider?: Array<string>;
  /** The out-of-band code to be applied on the user's account. The following out-of-band code types are supported: * VERIFY_EMAIL * RECOVER_EMAIL * REVERT_SECOND_FACTOR_ADDITION * VERIFY_AND_CHANGE_EMAIL */
  oobCode?: string;
  /** Whether the user's email has been verified. Specifying this field requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). */
  emailVerified?: boolean;
  /** Whether the account should be restricted to only using federated login. */
  upgradeToFederatedLogin?: boolean;
  captchaChallenge?: string;
  /** The response from reCaptcha challenge. This is required when the system detects possible abuse activities. */
  captchaResponse?: string;
  /** Specifies the minimum timestamp in seconds for an Identity Platform ID token to be considered valid. */
  validSince?: string;
  /** If true, marks the account as disabled, meaning the user will no longer be able to sign-in. */
  disableUser?: boolean;
  instanceId?: string;
  delegatedProjectNumber?: string;
  /** The user's new photo URL for the account's profile photo to be updated in the account's attributes. The length of the URL must be less than or equal to 2048 characters. */
  photoUrl?: string;
  deleteAttribute?: Array<"USER_ATTRIBUTE_NAME_UNSPECIFIED" | "EMAIL" | "DISPLAY_NAME" | "PROVIDER" | "PHOTO_URL" | "PASSWORD" | "RAW_USER_INFO" | (string & {})>;
  /** Whether or not to return an ID and refresh token. Should always be true. */
  returnSecureToken?: boolean;
  /** The Identity Providers to unlink from the user's account. */
  deleteProvider?: Array<string>;
  /** The timestamp in milliseconds when the account last logged in. */
  lastLoginAt?: string;
  /** The timestamp in milliseconds when the account was created. */
  createdAt?: string;
  /** The phone number to be updated in the account's attributes. */
  phoneNumber?: string;
  /** JSON formatted custom attributes to be stored in the Identity Platform ID token. Specifying this field requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). */
  customAttributes?: string;
  /** The tenant ID of the Identity Platform tenant that the account belongs to. Requests from end users should pass an Identity Platform ID token rather than setting this field. */
  tenantId?: string;
  /** The project ID for the project that the account belongs to. Specifying this field requires Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). Requests from end users should pass an Identity Platform ID token instead. */
  targetProjectId?: string;
  /** The multi-factor authentication related information to be set on the user's account. This will overwrite any previous multi-factor related information on the account. Specifying this field requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). */
  mfa?: GoogleCloudIdentitytoolkitV1MfaInfo;
  /** The provider to be linked to the user's account. Specifying this field requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). */
  linkProviderUserInfo?: GoogleCloudIdentitytoolkitV1ProviderUserInfo;
}

export const GoogleCloudIdentitytoolkitV1SetAccountInfoRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1SetAccountInfoRequest> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.Array(Schema.String)),
  oobCode: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
  upgradeToFederatedLogin: Schema.optional(Schema.Boolean),
  captchaChallenge: Schema.optional(Schema.String),
  captchaResponse: Schema.optional(Schema.String),
  validSince: Schema.optional(Schema.String),
  disableUser: Schema.optional(Schema.Boolean),
  instanceId: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  deleteAttribute: Schema.optional(Schema.Array(Schema.String)),
  returnSecureToken: Schema.optional(Schema.Boolean),
  deleteProvider: Schema.optional(Schema.Array(Schema.String)),
  lastLoginAt: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  customAttributes: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
  mfa: Schema.optional(GoogleCloudIdentitytoolkitV1MfaInfo),
  linkProviderUserInfo: Schema.optional(GoogleCloudIdentitytoolkitV1ProviderUserInfo),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SetAccountInfoRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SetAccountInfoRequest>;

export interface GoogleCloudIdentitytoolkitV1SetAccountInfoResponse {
  kind?: string;
  /** The ID of the authenticated user. */
  localId?: string;
  /** The account's email address. */
  email?: string;
  /** The account's display name. */
  displayName?: string;
  /** An Identity Platform ID token for the account. This is used for legacy user sign up. */
  idToken?: string;
  /** The linked Identity Providers on the account. */
  providerUserInfo?: Array<GoogleCloudIdentitytoolkitV1ProviderUserInfo>;
  /** The new email that has been set on the user's account attributes. */
  newEmail?: string;
  /** The user's photo URL for the account's profile photo. */
  photoUrl?: string;
  /** A refresh token for the account. This is used for legacy user sign up. */
  refreshToken?: string;
  /** The number of seconds until the Identity Platform ID token expires. */
  expiresIn?: string;
  /** Deprecated. No actual password hash is currently returned. */
  passwordHash?: string;
  /** Whether the account's email has been verified. */
  emailVerified?: boolean;
}

export const GoogleCloudIdentitytoolkitV1SetAccountInfoResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1SetAccountInfoResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  providerUserInfo: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1ProviderUserInfo)),
  newEmail: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  passwordHash: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1SetAccountInfoResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1SetAccountInfoResponse>;

export interface GoogleCloudIdentitytoolkitV1Argon2Parameters {
  /** Required. The desired hash length in bytes. Minimum is 4 and maximum is 1024. */
  hashLengthBytes?: number;
  /** Required. Must not be HASH_TYPE_UNSPECIFIED. */
  hashType?: "HASH_TYPE_UNSPECIFIED" | "ARGON2_D" | "ARGON2_ID" | "ARGON2_I" | (string & {});
  /** Required. The degree of parallelism, also called threads or lanes. Minimum is 1, maximum is 16. */
  parallelism?: number;
  /** Required. The number of iterations to perform. Minimum is 1, maximum is 16. */
  iterations?: number;
  /** Required. The memory cost in kibibytes. Maximum is 32768. */
  memoryCostKib?: number;
  /** The version of the Argon2 algorithm. This defaults to VERSION_13 if not specified. */
  version?: "VERSION_UNSPECIFIED" | "VERSION_10" | "VERSION_13" | (string & {});
  /** The additional associated data, if provided, is appended to the hash value to provide an additional layer of security. A base64-encoded string if specified via JSON. */
  associatedData?: string;
}

export const GoogleCloudIdentitytoolkitV1Argon2Parameters: Schema.Schema<GoogleCloudIdentitytoolkitV1Argon2Parameters> = Schema.suspend(() => Schema.Struct({
  hashLengthBytes: Schema.optional(Schema.Number),
  hashType: Schema.optional(Schema.String),
  parallelism: Schema.optional(Schema.Number),
  iterations: Schema.optional(Schema.Number),
  memoryCostKib: Schema.optional(Schema.Number),
  version: Schema.optional(Schema.String),
  associatedData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1Argon2Parameters" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1Argon2Parameters>;

export interface GoogleCloudIdentitytoolkitV1UploadAccountRequest {
  /** Required. The hashing function used to hash the account passwords. Must be one of the following: * HMAC_SHA256 * HMAC_SHA1 * HMAC_MD5 * SCRYPT * PBKDF_SHA1 * MD5 * HMAC_SHA512 * SHA1 * BCRYPT * PBKDF2_SHA256 * SHA256 * SHA512 * STANDARD_SCRYPT * ARGON2 */
  hashAlgorithm?: string;
  /** The signer key used to hash the password. Required for the following hashing functions: * SCRYPT, * HMAC_MD5, * HMAC_SHA1, * HMAC_SHA256, * HMAC_SHA512 */
  signerKey?: string;
  /** One or more bytes to be inserted between the salt and plain text password. For stronger security, this should be a single non-printable character. */
  saltSeparator?: string;
  /** The number of rounds used for hash calculation. Only required for the following hashing functions: * MD5 * SHA1 * SHA256 * SHA512 * PBKDF_SHA1 * PBKDF2_SHA256 * SCRYPT */
  rounds?: number;
  /** Memory cost for hash calculation. Only required when the hashing function is SCRYPT. */
  memoryCost?: number;
  /** A list of accounts to upload. `local_id` is required for each user; everything else is optional. */
  users?: Array<GoogleCloudIdentitytoolkitV1UserInfo>;
  delegatedProjectNumber?: string;
  /** If true, the service will do the following list of checks before an account is uploaded: * Duplicate emails * Duplicate federated IDs * Federated ID provider validation If the duplication exists within the list of accounts to be uploaded, it will prevent the entire list from being uploaded. If the email or federated ID is a duplicate of a user already within the project/tenant, the account will not be uploaded, but the rest of the accounts will be unaffected. If false, these checks will be skipped. */
  sanityCheck?: boolean;
  /** Whether to overwrite an existing account in Identity Platform with a matching `local_id` in the request. If true, the existing account will be overwritten. If false, an error will be returned. */
  allowOverwrite?: boolean;
  /** The CPU memory cost parameter to be used by the STANDARD_SCRYPT hashing function. This parameter, along with block_size and cpu_mem_cost help tune the resources needed to hash a password, and should be tuned as processor speeds and memory technologies advance. */
  cpuMemCost?: number;
  /** The parallelization cost parameter to be used by the STANDARD_SCRYPT hashing function. This parameter, along with block_size and cpu_mem_cost help tune the resources needed to hash a password, and should be tuned as processor speeds and memory technologies advance. */
  parallelization?: number;
  /** The block size parameter used by the STANDARD_SCRYPT hashing function. This parameter, along with parallelization and cpu_mem_cost help tune the resources needed to hash a password, and should be tuned as processor speeds and memory technologies advance. */
  blockSize?: number;
  /** The desired key length for the STANDARD_SCRYPT hashing function. Must be at least 1. */
  dkLen?: number;
  passwordHashOrder?: "UNSPECIFIED_ORDER" | "SALT_AND_PASSWORD" | "PASSWORD_AND_SALT" | (string & {});
  /** The ID of the Identity Platform tenant the account belongs to. */
  tenantId?: string;
  /** The parameters for Argon2 hashing algorithm. */
  argon2Parameters?: GoogleCloudIdentitytoolkitV1Argon2Parameters;
}

export const GoogleCloudIdentitytoolkitV1UploadAccountRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1UploadAccountRequest> = Schema.suspend(() => Schema.Struct({
  hashAlgorithm: Schema.optional(Schema.String),
  signerKey: Schema.optional(Schema.String),
  saltSeparator: Schema.optional(Schema.String),
  rounds: Schema.optional(Schema.Number),
  memoryCost: Schema.optional(Schema.Number),
  users: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1UserInfo)),
  delegatedProjectNumber: Schema.optional(Schema.String),
  sanityCheck: Schema.optional(Schema.Boolean),
  allowOverwrite: Schema.optional(Schema.Boolean),
  cpuMemCost: Schema.optional(Schema.Number),
  parallelization: Schema.optional(Schema.Number),
  blockSize: Schema.optional(Schema.Number),
  dkLen: Schema.optional(Schema.Number),
  passwordHashOrder: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  argon2Parameters: Schema.optional(GoogleCloudIdentitytoolkitV1Argon2Parameters),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1UploadAccountRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1UploadAccountRequest>;

export interface GoogleCloudIdentitytoolkitV1ErrorInfo {
  /** The index of the item, range is [0, request.size - 1] */
  index?: number;
  /** Detailed error message */
  message?: string;
}

export const GoogleCloudIdentitytoolkitV1ErrorInfo: Schema.Schema<GoogleCloudIdentitytoolkitV1ErrorInfo> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1ErrorInfo" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1ErrorInfo>;

export interface GoogleCloudIdentitytoolkitV1UploadAccountResponse {
  kind?: string;
  /** Detailed error info for accounts that cannot be uploaded. */
  error?: Array<GoogleCloudIdentitytoolkitV1ErrorInfo>;
}

export const GoogleCloudIdentitytoolkitV1UploadAccountResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1UploadAccountResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  error: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1ErrorInfo)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1UploadAccountResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1UploadAccountResponse>;

export interface GoogleCloudIdentitytoolkitV1IdpConfig {
  provider?: "PROVIDER_UNSPECIFIED" | "MSLIVE" | "GOOGLE" | "FACEBOOK" | "PAYPAL" | "TWITTER" | "YAHOO" | "AOL" | "GITHUB" | "GOOGLE_PLAY_GAMES" | "LINKEDIN" | "IOS_GAME_CENTER" | (string & {});
  /** True if allows the user to sign in with the provider. */
  enabled?: boolean;
  /** Percent of users who will be prompted/redirected federated login for this IdP */
  experimentPercent?: number;
  /** OAuth2 client ID. */
  clientId?: string;
  /** OAuth2 client secret. */
  secret?: string;
  /** Whitelisted client IDs for audience check. */
  whitelistedAudiences?: Array<string>;
}

export const GoogleCloudIdentitytoolkitV1IdpConfig: Schema.Schema<GoogleCloudIdentitytoolkitV1IdpConfig> = Schema.suspend(() => Schema.Struct({
  provider: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  experimentPercent: Schema.optional(Schema.Number),
  clientId: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  whitelistedAudiences: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1IdpConfig" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1IdpConfig>;

export interface GoogleCloudIdentitytoolkitV1EmailTemplate {
  /** Whether the template is disabled. If true, a default template will be used. */
  disabled?: boolean;
  /** From address of the email */
  from?: string;
  /** Email body */
  body?: string;
  /** Subject of the email */
  subject?: string;
  /** From display name */
  fromDisplayName?: string;
  /** Email body format */
  format?: "EMAIL_BODY_FORMAT_UNSPECIFIED" | "PLAINTEXT" | "HTML" | (string & {});
  /** Reply-to address */
  replyTo?: string;
  /** Local part of From address */
  fromLocalPart?: string;
  /** Value is in III language code format (e.g. "zh-CN", "es"). Both '-' and '_' separators are accepted. */
  locale?: string;
  /** Whether the body or subject of the email is customized. */
  customized?: boolean;
}

export const GoogleCloudIdentitytoolkitV1EmailTemplate: Schema.Schema<GoogleCloudIdentitytoolkitV1EmailTemplate> = Schema.suspend(() => Schema.Struct({
  disabled: Schema.optional(Schema.Boolean),
  from: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  fromDisplayName: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  replyTo: Schema.optional(Schema.String),
  fromLocalPart: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.String),
  customized: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1EmailTemplate" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1EmailTemplate>;

export interface GoogleCloudIdentitytoolkitV1GetProjectConfigResponse {
  /** The project id of the retrieved configuration. */
  projectId?: string;
  /** Google Cloud API key. This field is only returned for authenticated calls from a developer. */
  apiKey?: string;
  /** Whether to allow password account sign up. This field is only returned for authenticated calls from a developer. */
  allowPasswordUser?: boolean;
  /** OAuth2 provider config. This field is only returned for authenticated calls from a developer. */
  idpConfig?: Array<GoogleCloudIdentitytoolkitV1IdpConfig>;
  /** Authorized domains for widget redirect. */
  authorizedDomains?: Array<string>;
  /** Whether anonymous user is enabled. This field is only returned for authenticated calls from a developer. */
  enableAnonymousUser?: boolean;
  /** The Firebase Dynamic Links domain used to construct links for redirects to native apps. */
  dynamicLinksDomain?: string;
  /** Whether to use email sending. This field is only returned for authenticated calls from a developer. */
  useEmailSending?: boolean;
  /** Email template for reset password. This field is only returned for authenticated calls from a developer. */
  resetPasswordTemplate?: GoogleCloudIdentitytoolkitV1EmailTemplate;
  /** Email template for verify email. This field is only returned for authenticated calls from a developer. */
  verifyEmailTemplate?: GoogleCloudIdentitytoolkitV1EmailTemplate;
  /** Email template for change email. This field is only returned for authenticated calls from a developer. */
  changeEmailTemplate?: GoogleCloudIdentitytoolkitV1EmailTemplate;
  /** Reset password email template for legacy Firebase V1 app. This field is only returned for authenticated calls from a developer. */
  legacyResetPasswordTemplate?: GoogleCloudIdentitytoolkitV1EmailTemplate;
  /** Email template for reverting second factor additions. This field is only returned for authenticated calls from a developer. */
  revertSecondFactorAdditionTemplate?: GoogleCloudIdentitytoolkitV1EmailTemplate;
}

export const GoogleCloudIdentitytoolkitV1GetProjectConfigResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1GetProjectConfigResponse> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
  allowPasswordUser: Schema.optional(Schema.Boolean),
  idpConfig: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1IdpConfig)),
  authorizedDomains: Schema.optional(Schema.Array(Schema.String)),
  enableAnonymousUser: Schema.optional(Schema.Boolean),
  dynamicLinksDomain: Schema.optional(Schema.String),
  useEmailSending: Schema.optional(Schema.Boolean),
  resetPasswordTemplate: Schema.optional(GoogleCloudIdentitytoolkitV1EmailTemplate),
  verifyEmailTemplate: Schema.optional(GoogleCloudIdentitytoolkitV1EmailTemplate),
  changeEmailTemplate: Schema.optional(GoogleCloudIdentitytoolkitV1EmailTemplate),
  legacyResetPasswordTemplate: Schema.optional(GoogleCloudIdentitytoolkitV1EmailTemplate),
  revertSecondFactorAdditionTemplate: Schema.optional(GoogleCloudIdentitytoolkitV1EmailTemplate),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetProjectConfigResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetProjectConfigResponse>;

export interface GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest {
  /** Required. A valid Identity Platform ID token. */
  idToken?: string;
  /** The number of seconds until the session cookie expires. Specify a duration in seconds, between five minutes and fourteen days, inclusively. */
  validDuration?: string;
  /** The tenant ID of the Identity Platform tenant the account belongs to. */
  tenantId?: string;
}

export const GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest: Schema.Schema<GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  validDuration: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest>;

export interface GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse {
  /** The session cookie that has been created from the Identity Platform ID token specified in the request. It is in the form of a JSON Web Token (JWT). Always present. */
  sessionCookie?: string;
}

export const GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse> = Schema.suspend(() => Schema.Struct({
  sessionCookie: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse>;

export interface GoogleCloudIdentitytoolkitV1OpenIdConnectKey {
  /** Key type. */
  kty?: string;
  /** Signature algorithm. */
  alg?: string;
  /** Key use. */
  use?: string;
  /** Unique string to identify this key. */
  kid?: string;
  /** Modulus for the RSA public key, it is represented as the base64url encoding of the value's big endian representation. */
  n?: string;
  /** Exponent for the RSA public key, it is represented as the base64url encoding of the value's big endian representation. */
  e?: string;
}

export const GoogleCloudIdentitytoolkitV1OpenIdConnectKey: Schema.Schema<GoogleCloudIdentitytoolkitV1OpenIdConnectKey> = Schema.suspend(() => Schema.Struct({
  kty: Schema.optional(Schema.String),
  alg: Schema.optional(Schema.String),
  use: Schema.optional(Schema.String),
  kid: Schema.optional(Schema.String),
  n: Schema.optional(Schema.String),
  e: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1OpenIdConnectKey" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1OpenIdConnectKey>;

export interface GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse {
  /** Public keys of the session cookie signer, formatted as [JSON Web Keys (JWK)](https://tools.ietf.org/html/rfc7517). */
  keys?: Array<GoogleCloudIdentitytoolkitV1OpenIdConnectKey>;
}

export const GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse: Schema.Schema<GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse> = Schema.suspend(() => Schema.Struct({
  keys: Schema.optional(Schema.Array(GoogleCloudIdentitytoolkitV1OpenIdConnectKey)),
})).annotate({ identifier: "GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse" }) as any as Schema.Schema<GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateAuthUriAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1CreateAuthUriRequest;
}

export const CreateAuthUriAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1CreateAuthUriRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:createAuthUri", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAuthUriAccountsRequest>;

export type CreateAuthUriAccountsResponse = GoogleCloudIdentitytoolkitV1CreateAuthUriResponse;
export const CreateAuthUriAccountsResponse = GoogleCloudIdentitytoolkitV1CreateAuthUriResponse;

export type CreateAuthUriAccountsError = CommonErrors;

/** If an email identifier is specified, checks and returns if any user account is registered with the email. If there is a registered account, fetches all providers associated with the account's email. If the provider ID of an Identity Provider (IdP) is specified, creates an authorization URI for the IdP. The user can be directed to this URI to sign in with the IdP. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const createAuthUriAccounts: API.OperationMethod<CreateAuthUriAccountsRequest, CreateAuthUriAccountsResponse, CreateAuthUriAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAuthUriAccountsRequest,
  output: CreateAuthUriAccountsResponse,
  errors: [],
}));

export interface SendVerificationCodeAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest;
}

export const SendVerificationCodeAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SendVerificationCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:sendVerificationCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendVerificationCodeAccountsRequest>;

export type SendVerificationCodeAccountsResponse = GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse;
export const SendVerificationCodeAccountsResponse = GoogleCloudIdentitytoolkitV1SendVerificationCodeResponse;

export type SendVerificationCodeAccountsError = CommonErrors;

/** Sends a SMS verification code for phone number sign-in. To localize the text of the SMS sent to the user, set the HTTP header `X-Firebase-Locale` to the language code that corresponds with the user's locale. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const sendVerificationCodeAccounts: API.OperationMethod<SendVerificationCodeAccountsRequest, SendVerificationCodeAccountsResponse, SendVerificationCodeAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendVerificationCodeAccountsRequest,
  output: SendVerificationCodeAccountsResponse,
  errors: [],
}));

export interface SignInWithCustomTokenAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest;
}

export const SignInWithCustomTokenAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignInWithCustomTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signInWithCustomToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignInWithCustomTokenAccountsRequest>;

export type SignInWithCustomTokenAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse;
export const SignInWithCustomTokenAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithCustomTokenResponse;

export type SignInWithCustomTokenAccountsError = CommonErrors;

/** Signs in or signs up a user by exchanging a custom Auth token. Upon a successful sign-in or sign-up, a new Identity Platform ID token and refresh token are issued for the user. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const signInWithCustomTokenAccounts: API.OperationMethod<SignInWithCustomTokenAccountsRequest, SignInWithCustomTokenAccountsResponse, SignInWithCustomTokenAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignInWithCustomTokenAccountsRequest,
  output: SignInWithCustomTokenAccountsResponse,
  errors: [],
}));

export interface SignInWithGameCenterAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest;
}

export const SignInWithGameCenterAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignInWithGameCenterRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signInWithGameCenter", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignInWithGameCenterAccountsRequest>;

export type SignInWithGameCenterAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse;
export const SignInWithGameCenterAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithGameCenterResponse;

export type SignInWithGameCenterAccountsError = CommonErrors;

/** Signs in or signs up a user with iOS Game Center credentials. If the sign-in succeeds, a new Identity Platform ID token and refresh token are issued for the authenticated user. The bundle ID is required in the request header as `x-ios-bundle-identifier`. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. Apple has [deprecated the `playerID` field](https://developer.apple.com/documentation/gamekit/gkplayer/1521127-playerid/). The Apple platform Firebase SDK will use `gamePlayerID` and `teamPlayerID` from version 10.5.0 and onwards. Upgrading to SDK version 10.5.0 or later updates existing integrations that use `playerID` to instead use `gamePlayerID` and `teamPlayerID`. When making calls to `signInWithGameCenter`, you must include `playerID` along with the new fields `gamePlayerID` and `teamPlayerID` to successfully identify all existing users. Upgrading existing Game Center sign in integrations to SDK version 10.5.0 or later is irreversible. */
export const signInWithGameCenterAccounts: API.OperationMethod<SignInWithGameCenterAccountsRequest, SignInWithGameCenterAccountsResponse, SignInWithGameCenterAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignInWithGameCenterAccountsRequest,
  output: SignInWithGameCenterAccountsResponse,
  errors: [],
}));

export interface SignInWithPasswordAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest;
}

export const SignInWithPasswordAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignInWithPasswordRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signInWithPassword", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignInWithPasswordAccountsRequest>;

export type SignInWithPasswordAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse;
export const SignInWithPasswordAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithPasswordResponse;

export type SignInWithPasswordAccountsError = CommonErrors;

/** Signs in a user with email and password. If the sign-in succeeds, a new Identity Platform ID token and refresh token are issued for the authenticated user. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const signInWithPasswordAccounts: API.OperationMethod<SignInWithPasswordAccountsRequest, SignInWithPasswordAccountsResponse, SignInWithPasswordAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignInWithPasswordAccountsRequest,
  output: SignInWithPasswordAccountsResponse,
  errors: [],
}));

export interface SignInWithEmailLinkAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest;
}

export const SignInWithEmailLinkAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignInWithEmailLinkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signInWithEmailLink", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignInWithEmailLinkAccountsRequest>;

export type SignInWithEmailLinkAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse;
export const SignInWithEmailLinkAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithEmailLinkResponse;

export type SignInWithEmailLinkAccountsError = CommonErrors;

/** Signs in or signs up a user with a out-of-band code from an email link. If a user does not exist with the given email address, a user record will be created. If the sign-in succeeds, an Identity Platform ID and refresh token are issued for the authenticated user. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const signInWithEmailLinkAccounts: API.OperationMethod<SignInWithEmailLinkAccountsRequest, SignInWithEmailLinkAccountsResponse, SignInWithEmailLinkAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignInWithEmailLinkAccountsRequest,
  output: SignInWithEmailLinkAccountsResponse,
  errors: [],
}));

export interface SignInWithIdpAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignInWithIdpRequest;
}

export const SignInWithIdpAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignInWithIdpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signInWithIdp", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignInWithIdpAccountsRequest>;

export type SignInWithIdpAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithIdpResponse;
export const SignInWithIdpAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithIdpResponse;

export type SignInWithIdpAccountsError = CommonErrors;

/** Signs in or signs up a user using credentials from an Identity Provider (IdP). This is done by manually providing an IdP credential, or by providing the authorization response obtained via the authorization request from CreateAuthUri. If the sign-in succeeds, a new Identity Platform ID token and refresh token are issued for the authenticated user. A new Identity Platform user account will be created if the user has not previously signed in to the IdP with the same account. In addition, when the "One account per email address" setting is enabled, there should not be an existing Identity Platform user account with the same email address for a new user account to be created. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const signInWithIdpAccounts: API.OperationMethod<SignInWithIdpAccountsRequest, SignInWithIdpAccountsResponse, SignInWithIdpAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignInWithIdpAccountsRequest,
  output: SignInWithIdpAccountsResponse,
  errors: [],
}));

export interface SignInWithPhoneNumberAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest;
}

export const SignInWithPhoneNumberAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signInWithPhoneNumber", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignInWithPhoneNumberAccountsRequest>;

export type SignInWithPhoneNumberAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse;
export const SignInWithPhoneNumberAccountsResponse = GoogleCloudIdentitytoolkitV1SignInWithPhoneNumberResponse;

export type SignInWithPhoneNumberAccountsError = CommonErrors;

/** Completes a phone number authentication attempt. If a user already exists with the given phone number, an ID token is minted for that user. Otherwise, a new user is created and associated with the phone number. This method may also be used to link a phone number to an existing user. To localize the text of the SMS sent to the user, set the HTTP header `X-Firebase-Locale` to the language code that corresponds with the user's locale. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const signInWithPhoneNumberAccounts: API.OperationMethod<SignInWithPhoneNumberAccountsRequest, SignInWithPhoneNumberAccountsResponse, SignInWithPhoneNumberAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignInWithPhoneNumberAccountsRequest,
  output: SignInWithPhoneNumberAccountsResponse,
  errors: [],
}));

export interface VerifyIosClientAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1VerifyIosClientRequest;
}

export const VerifyIosClientAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1VerifyIosClientRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:verifyIosClient", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyIosClientAccountsRequest>;

export type VerifyIosClientAccountsResponse = GoogleCloudIdentitytoolkitV1VerifyIosClientResponse;
export const VerifyIosClientAccountsResponse = GoogleCloudIdentitytoolkitV1VerifyIosClientResponse;

export type VerifyIosClientAccountsError = CommonErrors;

/** Verifies an iOS client is a real iOS device. If the request is valid, a receipt will be sent in the response and a secret will be sent via Apple Push Notification Service. The client should send both of them back to certain Identity Platform APIs in a later call (for example, /accounts:sendVerificationCode), in order to verify the client. The bundle ID is required in the request header as `x-ios-bundle-identifier`. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const verifyIosClientAccounts: API.OperationMethod<VerifyIosClientAccountsRequest, VerifyIosClientAccountsResponse, VerifyIosClientAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyIosClientAccountsRequest,
  output: VerifyIosClientAccountsResponse,
  errors: [],
}));

export interface SignUpAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignUpRequest;
}

export const SignUpAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignUpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:signUp", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignUpAccountsRequest>;

export type SignUpAccountsResponse = GoogleCloudIdentitytoolkitV1SignUpResponse;
export const SignUpAccountsResponse = GoogleCloudIdentitytoolkitV1SignUpResponse;

export type SignUpAccountsError = CommonErrors;

/** Signs up a new email and password user or anonymous user, or upgrades an anonymous user to email and password. For an admin request with a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control), creates a new anonymous, email and password, or phone number user. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const signUpAccounts: API.OperationMethod<SignUpAccountsRequest, SignUpAccountsResponse, SignUpAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignUpAccountsRequest,
  output: SignUpAccountsResponse,
  errors: [],
}));

export interface IssueSamlResponseAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest;
}

export const IssueSamlResponseAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1IssueSamlResponseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:issueSamlResponse", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IssueSamlResponseAccountsRequest>;

export type IssueSamlResponseAccountsResponse = GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse;
export const IssueSamlResponseAccountsResponse = GoogleCloudIdentitytoolkitV1IssueSamlResponseResponse;

export type IssueSamlResponseAccountsError = CommonErrors;

/** Experimental */
export const issueSamlResponseAccounts: API.OperationMethod<IssueSamlResponseAccountsRequest, IssueSamlResponseAccountsResponse, IssueSamlResponseAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IssueSamlResponseAccountsRequest,
  output: IssueSamlResponseAccountsResponse,
  errors: [],
}));

export interface DeleteAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1DeleteAccountRequest;
}

export const DeleteAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1DeleteAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:delete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRequest>;

export type DeleteAccountsResponse = GoogleCloudIdentitytoolkitV1DeleteAccountResponse;
export const DeleteAccountsResponse = GoogleCloudIdentitytoolkitV1DeleteAccountResponse;

export type DeleteAccountsError = CommonErrors;

/** Deletes a user's account. */
export const deleteAccounts: API.OperationMethod<DeleteAccountsRequest, DeleteAccountsResponse, DeleteAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsRequest,
  output: DeleteAccountsResponse,
  errors: [],
}));

export interface LookupAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1GetAccountInfoRequest;
}

export const LookupAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1GetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupAccountsRequest>;

export type LookupAccountsResponse = GoogleCloudIdentitytoolkitV1GetAccountInfoResponse;
export const LookupAccountsResponse = GoogleCloudIdentitytoolkitV1GetAccountInfoResponse;

export type LookupAccountsError = CommonErrors;

/** Gets account information for all matched accounts. For an end user request, retrieves the account of the end user. For an admin request with Google OAuth 2.0 credential, retrieves one or multiple account(s) with matching criteria. */
export const lookupAccounts: API.OperationMethod<LookupAccountsRequest, LookupAccountsResponse, LookupAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupAccountsRequest,
  output: LookupAccountsResponse,
  errors: [],
}));

export interface SendOobCodeAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1GetOobCodeRequest;
}

export const SendOobCodeAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1GetOobCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:sendOobCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendOobCodeAccountsRequest>;

export type SendOobCodeAccountsResponse = GoogleCloudIdentitytoolkitV1GetOobCodeResponse;
export const SendOobCodeAccountsResponse = GoogleCloudIdentitytoolkitV1GetOobCodeResponse;

export type SendOobCodeAccountsError = CommonErrors;

/** Sends an out-of-band confirmation code for an account. Requests from a authenticated request can optionally return a link including the OOB code instead of sending it. */
export const sendOobCodeAccounts: API.OperationMethod<SendOobCodeAccountsRequest, SendOobCodeAccountsResponse, SendOobCodeAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendOobCodeAccountsRequest,
  output: SendOobCodeAccountsResponse,
  errors: [],
}));

export interface ResetPasswordAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1ResetPasswordRequest;
}

export const ResetPasswordAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1ResetPasswordRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:resetPassword", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetPasswordAccountsRequest>;

export type ResetPasswordAccountsResponse = GoogleCloudIdentitytoolkitV1ResetPasswordResponse;
export const ResetPasswordAccountsResponse = GoogleCloudIdentitytoolkitV1ResetPasswordResponse;

export type ResetPasswordAccountsError = CommonErrors;

/** Resets the password of an account either using an out-of-band code generated by sendOobCode or by specifying the email and password of the account to be modified. Can also check the purpose of an out-of-band code without consuming it. */
export const resetPasswordAccounts: API.OperationMethod<ResetPasswordAccountsRequest, ResetPasswordAccountsResponse, ResetPasswordAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetPasswordAccountsRequest,
  output: ResetPasswordAccountsResponse,
  errors: [],
}));

export interface UpdateAccountsRequest {
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SetAccountInfoRequest;
}

export const UpdateAccountsRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts:update", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsRequest>;

export type UpdateAccountsResponse = GoogleCloudIdentitytoolkitV1SetAccountInfoResponse;
export const UpdateAccountsResponse = GoogleCloudIdentitytoolkitV1SetAccountInfoResponse;

export type UpdateAccountsError = CommonErrors;

/** Updates account-related information for the specified user by setting specific fields or applying action codes. Requests from administrators and end users are supported. */
export const updateAccounts: API.OperationMethod<UpdateAccountsRequest, UpdateAccountsResponse, UpdateAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsRequest,
  output: UpdateAccountsResponse,
  errors: [],
}));

export interface GetPublicKeysV1Request {
}

export const GetPublicKeysV1Request = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/publicKeys" }),
  svc,
) as unknown as Schema.Schema<GetPublicKeysV1Request>;

export interface GetPublicKeysV1Response {}
export const GetPublicKeysV1Response: Schema.Schema<GetPublicKeysV1Response> = Schema.Struct({}) as any as Schema.Schema<GetPublicKeysV1Response>;

export type GetPublicKeysV1Error = CommonErrors;

/** Retrieves public keys of the legacy Identity Toolkit token signer to enable third parties to verify the legacy ID token. For now the X509 pem cert is the only format supported. */
export const getPublicKeysV1: API.OperationMethod<GetPublicKeysV1Request, GetPublicKeysV1Response, GetPublicKeysV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPublicKeysV1Request,
  output: GetPublicKeysV1Response,
  errors: [],
}));

export interface GetRecaptchaParamsV1Request {
}

export const GetRecaptchaParamsV1Request = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/recaptchaParams" }),
  svc,
) as unknown as Schema.Schema<GetRecaptchaParamsV1Request>;

export type GetRecaptchaParamsV1Response = GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse;
export const GetRecaptchaParamsV1Response = GoogleCloudIdentitytoolkitV1GetRecaptchaParamResponse;

export type GetRecaptchaParamsV1Error = CommonErrors;

/** Gets parameters needed for generating a reCAPTCHA challenge. */
export const getRecaptchaParamsV1: API.OperationMethod<GetRecaptchaParamsV1Request, GetRecaptchaParamsV1Response, GetRecaptchaParamsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRecaptchaParamsV1Request,
  output: GetRecaptchaParamsV1Response,
  errors: [],
}));

export interface GetProjectsV1Request {
  /** Project Number of the delegated project request. This field should only be used as part of the Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** Project number of the configuration to retrieve. This field is deprecated and should not be used by new integrations. */
  projectNumber?: string;
  /** Whether dynamic link should be returned. */
  returnDynamicLink?: boolean;
  /** Android package name to check against the real android package name. If this field is provided, and sha1_cert_hash is not provided, the action will throw an error if this does not match the real android package name. */
  androidPackageName?: string;
  /** iOS bundle id to check against the real ios bundle id. If this field is provided, the action will throw an error if this does not match the real iOS bundle id. */
  iosBundleId?: string;
  /** The RP OAuth client ID. If set, a check will be performed to ensure that the OAuth client is valid for the retrieved project and the request rejected with a client error if not valid. */
  clientId?: string;
  /** SHA-1 Android application cert hash. If set, a check will be performed to ensure that the cert hash is valid for the retrieved project and android_package_name. */
  sha1Cert?: string;
  /** The Firebase app ID, for applications that use Firebase. This can be found in the Firebase console for your project. If set, a check will be performed to ensure that the app ID is valid for the retrieved project. If not valid, the request will be rejected with a client error. */
  firebaseAppId?: string;
}

export const GetProjectsV1Request = Schema.Struct({
  delegatedProjectNumber: Schema.optional(Schema.String).pipe(T.HttpQuery("delegatedProjectNumber")),
  projectNumber: Schema.optional(Schema.String).pipe(T.HttpQuery("projectNumber")),
  returnDynamicLink: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnDynamicLink")),
  androidPackageName: Schema.optional(Schema.String).pipe(T.HttpQuery("androidPackageName")),
  iosBundleId: Schema.optional(Schema.String).pipe(T.HttpQuery("iosBundleId")),
  clientId: Schema.optional(Schema.String).pipe(T.HttpQuery("clientId")),
  sha1Cert: Schema.optional(Schema.String).pipe(T.HttpQuery("sha1Cert")),
  firebaseAppId: Schema.optional(Schema.String).pipe(T.HttpQuery("firebaseAppId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects" }),
  svc,
) as unknown as Schema.Schema<GetProjectsV1Request>;

export type GetProjectsV1Response = GoogleCloudIdentitytoolkitV1GetProjectConfigResponse;
export const GetProjectsV1Response = GoogleCloudIdentitytoolkitV1GetProjectConfigResponse;

export type GetProjectsV1Error = CommonErrors;

/** Gets a project's public Identity Toolkit configuration. (Legacy) This method also supports authenticated calls from a developer to retrieve non-public configuration. */
export const getProjectsV1: API.OperationMethod<GetProjectsV1Request, GetProjectsV1Response, GetProjectsV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsV1Request,
  output: GetProjectsV1Response,
  errors: [],
}));

export interface GetSessionCookiePublicKeysV1Request {
}

export const GetSessionCookiePublicKeysV1Request = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1/sessionCookiePublicKeys" }),
  svc,
) as unknown as Schema.Schema<GetSessionCookiePublicKeysV1Request>;

export type GetSessionCookiePublicKeysV1Response = GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse;
export const GetSessionCookiePublicKeysV1Response = GoogleCloudIdentitytoolkitV1GetSessionCookiePublicKeysResponse;

export type GetSessionCookiePublicKeysV1Error = CommonErrors;

/** Retrieves the set of public keys of the session cookie JSON Web Token (JWT) signer that can be used to validate the session cookie created through createSessionCookie. */
export const getSessionCookiePublicKeysV1: API.OperationMethod<GetSessionCookiePublicKeysV1Request, GetSessionCookiePublicKeysV1Response, GetSessionCookiePublicKeysV1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSessionCookiePublicKeysV1Request,
  output: GetSessionCookiePublicKeysV1Response,
  errors: [],
}));

export interface AccountsProjectsRequest {
  /** The project ID of the project which the user should belong to. Specifying this field requires a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). If this is not set, the target project is inferred from the scope associated to the Bearer access token. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignUpRequest;
}

export const AccountsProjectsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignUpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AccountsProjectsRequest>;

export type AccountsProjectsResponse = GoogleCloudIdentitytoolkitV1SignUpResponse;
export const AccountsProjectsResponse = GoogleCloudIdentitytoolkitV1SignUpResponse;

export type AccountsProjectsError = CommonErrors;

/** Signs up a new email and password user or anonymous user, or upgrades an anonymous user to email and password. For an admin request with a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control), creates a new anonymous, email and password, or phone number user. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const accountsProjects: API.OperationMethod<AccountsProjectsRequest, AccountsProjectsResponse, AccountsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AccountsProjectsRequest,
  output: AccountsProjectsResponse,
  errors: [],
}));

export interface QueryAccountsProjectsRequest {
  /** The ID of the project to which the result is scoped. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1QueryUserInfoRequest;
}

export const QueryAccountsProjectsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1QueryUserInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:queryAccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryAccountsProjectsRequest>;

export type QueryAccountsProjectsResponse = GoogleCloudIdentitytoolkitV1QueryUserInfoResponse;
export const QueryAccountsProjectsResponse = GoogleCloudIdentitytoolkitV1QueryUserInfoResponse;

export type QueryAccountsProjectsError = CommonErrors;

/** Looks up user accounts within a project or a tenant based on conditions in the request. */
export const queryAccountsProjects: API.OperationMethod<QueryAccountsProjectsRequest, QueryAccountsProjectsResponse, QueryAccountsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryAccountsProjectsRequest,
  output: QueryAccountsProjectsResponse,
  errors: [],
}));

export interface CreateSessionCookieProjectsRequest {
  /** The ID of the project that the account belongs to. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest;
}

export const CreateSessionCookieProjectsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:createSessionCookie", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSessionCookieProjectsRequest>;

export type CreateSessionCookieProjectsResponse = GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse;
export const CreateSessionCookieProjectsResponse = GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse;

export type CreateSessionCookieProjectsError = CommonErrors;

/** Creates a session cookie for the given Identity Platform ID token. The session cookie is used by the client to preserve the user's login state. */
export const createSessionCookieProjects: API.OperationMethod<CreateSessionCookieProjectsRequest, CreateSessionCookieProjectsResponse, CreateSessionCookieProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSessionCookieProjectsRequest,
  output: CreateSessionCookieProjectsResponse,
  errors: [],
}));

export interface AccountsProjectsTenantsRequest {
  /** The project ID of the project which the user should belong to. Specifying this field requires a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). If this is not set, the target project is inferred from the scope associated to the Bearer access token. */
  targetProjectId: string;
  /** The ID of the Identity Platform tenant to create a user under. If not set, the user will be created under the default Identity Platform project. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SignUpRequest;
}

export const AccountsProjectsTenantsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SignUpRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AccountsProjectsTenantsRequest>;

export type AccountsProjectsTenantsResponse = GoogleCloudIdentitytoolkitV1SignUpResponse;
export const AccountsProjectsTenantsResponse = GoogleCloudIdentitytoolkitV1SignUpResponse;

export type AccountsProjectsTenantsError = CommonErrors;

/** Signs up a new email and password user or anonymous user, or upgrades an anonymous user to email and password. For an admin request with a Google OAuth 2.0 credential with the proper [permissions](https://cloud.google.com/identity-platform/docs/access-control), creates a new anonymous, email and password, or phone number user. An [API key](https://cloud.google.com/docs/authentication/api-keys) is required in the request in order to identify the Google Cloud project. */
export const accountsProjectsTenants: API.OperationMethod<AccountsProjectsTenantsRequest, AccountsProjectsTenantsResponse, AccountsProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AccountsProjectsTenantsRequest,
  output: AccountsProjectsTenantsResponse,
  errors: [],
}));

export interface CreateSessionCookieProjectsTenantsRequest {
  /** The ID of the project that the account belongs to. */
  targetProjectId: string;
  /** The tenant ID of the Identity Platform tenant the account belongs to. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest;
}

export const CreateSessionCookieProjectsTenantsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1CreateSessionCookieRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}:createSessionCookie", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSessionCookieProjectsTenantsRequest>;

export type CreateSessionCookieProjectsTenantsResponse = GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse;
export const CreateSessionCookieProjectsTenantsResponse = GoogleCloudIdentitytoolkitV1CreateSessionCookieResponse;

export type CreateSessionCookieProjectsTenantsError = CommonErrors;

/** Creates a session cookie for the given Identity Platform ID token. The session cookie is used by the client to preserve the user's login state. */
export const createSessionCookieProjectsTenants: API.OperationMethod<CreateSessionCookieProjectsTenantsRequest, CreateSessionCookieProjectsTenantsResponse, CreateSessionCookieProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSessionCookieProjectsTenantsRequest,
  output: CreateSessionCookieProjectsTenantsResponse,
  errors: [],
}));

export interface BatchDeleteProjectsTenantsAccountsRequest {
  /** If `tenant_id` is specified, the ID of the Google Cloud project that the Identity Platform tenant belongs to. Otherwise, the ID of the Google Cloud project that accounts belong to. */
  targetProjectId: string;
  /** If the accounts belong to an Identity Platform tenant, the ID of the tenant. If the accounts belong to a default Identity Platform project, the field is not needed. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest;
}

export const BatchDeleteProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsTenantsAccountsRequest>;

export type BatchDeleteProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse;
export const BatchDeleteProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse;

export type BatchDeleteProjectsTenantsAccountsError = CommonErrors;

/** Batch deletes multiple accounts. For accounts that fail to be deleted, error info is contained in the response. The method ignores accounts that do not exist or are duplicated in the request. This method requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). */
export const batchDeleteProjectsTenantsAccounts: API.OperationMethod<BatchDeleteProjectsTenantsAccountsRequest, BatchDeleteProjectsTenantsAccountsResponse, BatchDeleteProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsTenantsAccountsRequest,
  output: BatchDeleteProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface DeleteProjectsTenantsAccountsRequest {
  /** The ID of the project which the account belongs to. Should only be specified in authenticated requests that specify local_id of an account. */
  targetProjectId: string;
  /** The ID of the tenant that the account belongs to, if applicable. Only require to be specified for authenticated requests bearing a Google OAuth 2.0 credential that specify local_id of an account that belongs to an Identity Platform tenant. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1DeleteAccountRequest;
}

export const DeleteProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1DeleteAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:delete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsAccountsRequest>;

export type DeleteProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1DeleteAccountResponse;
export const DeleteProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1DeleteAccountResponse;

export type DeleteProjectsTenantsAccountsError = CommonErrors;

/** Deletes a user's account. */
export const deleteProjectsTenantsAccounts: API.OperationMethod<DeleteProjectsTenantsAccountsRequest, DeleteProjectsTenantsAccountsResponse, DeleteProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTenantsAccountsRequest,
  output: DeleteProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface BatchGetProjectsTenantsAccountsRequest {
  /** If `tenant_id` is specified, the ID of the Google Cloud project that the Identity Platform tenant belongs to. Otherwise, the ID of the Google Cloud project that the accounts belong to. */
  targetProjectId: string;
  /** The ID of the Identity Platform tenant the accounts belongs to. If not specified, accounts on the Identity Platform project are returned. */
  tenantId: string;
  delegatedProjectNumber?: string;
  /** The pagination token from the response of a previous request. */
  nextPageToken?: string;
  /** The maximum number of results to return. Must be at least 1 and no greater than 1000. By default, it is 20. */
  maxResults?: number;
}

export const BatchGetProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  delegatedProjectNumber: Schema.optional(Schema.String).pipe(T.HttpQuery("delegatedProjectNumber")),
  nextPageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("nextPageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsTenantsAccountsRequest>;

export type BatchGetProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1DownloadAccountResponse;
export const BatchGetProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1DownloadAccountResponse;

export type BatchGetProjectsTenantsAccountsError = CommonErrors;

/** Download account information for all accounts on the project in a paginated manner. To use this method requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control).. Furthermore, additional permissions are needed to get password hash, password salt, and password version from accounts; otherwise these fields are redacted. */
export const batchGetProjectsTenantsAccounts: API.OperationMethod<BatchGetProjectsTenantsAccountsRequest, BatchGetProjectsTenantsAccountsResponse, BatchGetProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsTenantsAccountsRequest,
  output: BatchGetProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface LookupProjectsTenantsAccountsRequest {
  /** The ID of the Google Cloud project that the account or the Identity Platform tenant specified by `tenant_id` belongs to. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  targetProjectId: string;
  /** The ID of the tenant that the account belongs to. Should only be specified by authenticated requests from a developer. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1GetAccountInfoRequest;
}

export const LookupProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1GetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupProjectsTenantsAccountsRequest>;

export type LookupProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1GetAccountInfoResponse;
export const LookupProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1GetAccountInfoResponse;

export type LookupProjectsTenantsAccountsError = CommonErrors;

/** Gets account information for all matched accounts. For an end user request, retrieves the account of the end user. For an admin request with Google OAuth 2.0 credential, retrieves one or multiple account(s) with matching criteria. */
export const lookupProjectsTenantsAccounts: API.OperationMethod<LookupProjectsTenantsAccountsRequest, LookupProjectsTenantsAccountsResponse, LookupProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupProjectsTenantsAccountsRequest,
  output: LookupProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface SendOobCodeProjectsTenantsAccountsRequest {
  /** The Project ID of the Identity Platform project which the account belongs to. To specify this field, it requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  targetProjectId: string;
  /** The tenant ID of the Identity Platform tenant the account belongs to. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1GetOobCodeRequest;
}

export const SendOobCodeProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1GetOobCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:sendOobCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendOobCodeProjectsTenantsAccountsRequest>;

export type SendOobCodeProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1GetOobCodeResponse;
export const SendOobCodeProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1GetOobCodeResponse;

export type SendOobCodeProjectsTenantsAccountsError = CommonErrors;

/** Sends an out-of-band confirmation code for an account. Requests from a authenticated request can optionally return a link including the OOB code instead of sending it. */
export const sendOobCodeProjectsTenantsAccounts: API.OperationMethod<SendOobCodeProjectsTenantsAccountsRequest, SendOobCodeProjectsTenantsAccountsResponse, SendOobCodeProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendOobCodeProjectsTenantsAccountsRequest,
  output: SendOobCodeProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface QueryProjectsTenantsAccountsRequest {
  /** The ID of the project to which the result is scoped. */
  targetProjectId: string;
  /** The ID of the tenant to which the result is scoped. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1QueryUserInfoRequest;
}

export const QueryProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1QueryUserInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryProjectsTenantsAccountsRequest>;

export type QueryProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1QueryUserInfoResponse;
export const QueryProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1QueryUserInfoResponse;

export type QueryProjectsTenantsAccountsError = CommonErrors;

/** Looks up user accounts within a project or a tenant based on conditions in the request. */
export const queryProjectsTenantsAccounts: API.OperationMethod<QueryProjectsTenantsAccountsRequest, QueryProjectsTenantsAccountsResponse, QueryProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryProjectsTenantsAccountsRequest,
  output: QueryProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface UpdateProjectsTenantsAccountsRequest {
  /** The project ID for the project that the account belongs to. Specifying this field requires Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). Requests from end users should pass an Identity Platform ID token instead. */
  targetProjectId: string;
  /** The tenant ID of the Identity Platform tenant that the account belongs to. Requests from end users should pass an Identity Platform ID token rather than setting this field. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SetAccountInfoRequest;
}

export const UpdateProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:update", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsTenantsAccountsRequest>;

export type UpdateProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1SetAccountInfoResponse;
export const UpdateProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1SetAccountInfoResponse;

export type UpdateProjectsTenantsAccountsError = CommonErrors;

/** Updates account-related information for the specified user by setting specific fields or applying action codes. Requests from administrators and end users are supported. */
export const updateProjectsTenantsAccounts: API.OperationMethod<UpdateProjectsTenantsAccountsRequest, UpdateProjectsTenantsAccountsResponse, UpdateProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsTenantsAccountsRequest,
  output: UpdateProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface BatchCreateProjectsTenantsAccountsRequest {
  /** The Project ID of the Identity Platform project which the account belongs to. */
  targetProjectId: string;
  /** The ID of the Identity Platform tenant the account belongs to. */
  tenantId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1UploadAccountRequest;
}

export const BatchCreateProjectsTenantsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  tenantId: Schema.String.pipe(T.HttpPath("tenantId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1UploadAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/tenants/{tenantsId}/accounts:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsTenantsAccountsRequest>;

export type BatchCreateProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1UploadAccountResponse;
export const BatchCreateProjectsTenantsAccountsResponse = GoogleCloudIdentitytoolkitV1UploadAccountResponse;

export type BatchCreateProjectsTenantsAccountsError = CommonErrors;

/** Uploads multiple accounts into the Google Cloud project. If there is a problem uploading one or more of the accounts, the rest will be uploaded, and a list of the errors will be returned. To use this method requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
export const batchCreateProjectsTenantsAccounts: API.OperationMethod<BatchCreateProjectsTenantsAccountsRequest, BatchCreateProjectsTenantsAccountsResponse, BatchCreateProjectsTenantsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsTenantsAccountsRequest,
  output: BatchCreateProjectsTenantsAccountsResponse,
  errors: [],
}));

export interface BatchDeleteProjectsAccountsRequest {
  /** If `tenant_id` is specified, the ID of the Google Cloud project that the Identity Platform tenant belongs to. Otherwise, the ID of the Google Cloud project that accounts belong to. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest;
}

export const BatchDeleteProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1BatchDeleteAccountsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsAccountsRequest>;

export type BatchDeleteProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse;
export const BatchDeleteProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1BatchDeleteAccountsResponse;

export type BatchDeleteProjectsAccountsError = CommonErrors;

/** Batch deletes multiple accounts. For accounts that fail to be deleted, error info is contained in the response. The method ignores accounts that do not exist or are duplicated in the request. This method requires a Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). */
export const batchDeleteProjectsAccounts: API.OperationMethod<BatchDeleteProjectsAccountsRequest, BatchDeleteProjectsAccountsResponse, BatchDeleteProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsAccountsRequest,
  output: BatchDeleteProjectsAccountsResponse,
  errors: [],
}));

export interface DeleteProjectsAccountsRequest {
  /** The ID of the project which the account belongs to. Should only be specified in authenticated requests that specify local_id of an account. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1DeleteAccountRequest;
}

export const DeleteProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1DeleteAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:delete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAccountsRequest>;

export type DeleteProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1DeleteAccountResponse;
export const DeleteProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1DeleteAccountResponse;

export type DeleteProjectsAccountsError = CommonErrors;

/** Deletes a user's account. */
export const deleteProjectsAccounts: API.OperationMethod<DeleteProjectsAccountsRequest, DeleteProjectsAccountsResponse, DeleteProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAccountsRequest,
  output: DeleteProjectsAccountsResponse,
  errors: [],
}));

export interface BatchGetProjectsAccountsRequest {
  /** If `tenant_id` is specified, the ID of the Google Cloud project that the Identity Platform tenant belongs to. Otherwise, the ID of the Google Cloud project that the accounts belong to. */
  targetProjectId: string;
  delegatedProjectNumber?: string;
  /** The pagination token from the response of a previous request. */
  nextPageToken?: string;
  /** The maximum number of results to return. Must be at least 1 and no greater than 1000. By default, it is 20. */
  maxResults?: number;
  /** The ID of the Identity Platform tenant the accounts belongs to. If not specified, accounts on the Identity Platform project are returned. */
  tenantId?: string;
}

export const BatchGetProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  delegatedProjectNumber: Schema.optional(Schema.String).pipe(T.HttpQuery("delegatedProjectNumber")),
  nextPageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("nextPageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  tenantId: Schema.optional(Schema.String).pipe(T.HttpQuery("tenantId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/accounts:batchGet" }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsAccountsRequest>;

export type BatchGetProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1DownloadAccountResponse;
export const BatchGetProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1DownloadAccountResponse;

export type BatchGetProjectsAccountsError = CommonErrors;

/** Download account information for all accounts on the project in a paginated manner. To use this method requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control).. Furthermore, additional permissions are needed to get password hash, password salt, and password version from accounts; otherwise these fields are redacted. */
export const batchGetProjectsAccounts: API.OperationMethod<BatchGetProjectsAccountsRequest, BatchGetProjectsAccountsResponse, BatchGetProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchGetProjectsAccountsRequest,
  output: BatchGetProjectsAccountsResponse,
  errors: [],
}));

export interface LookupProjectsAccountsRequest {
  /** The ID of the Google Cloud project that the account or the Identity Platform tenant specified by `tenant_id` belongs to. Should only be specified by authenticated requests bearing a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1GetAccountInfoRequest;
}

export const LookupProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1GetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:lookup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LookupProjectsAccountsRequest>;

export type LookupProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1GetAccountInfoResponse;
export const LookupProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1GetAccountInfoResponse;

export type LookupProjectsAccountsError = CommonErrors;

/** Gets account information for all matched accounts. For an end user request, retrieves the account of the end user. For an admin request with Google OAuth 2.0 credential, retrieves one or multiple account(s) with matching criteria. */
export const lookupProjectsAccounts: API.OperationMethod<LookupProjectsAccountsRequest, LookupProjectsAccountsResponse, LookupProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupProjectsAccountsRequest,
  output: LookupProjectsAccountsResponse,
  errors: [],
}));

export interface SendOobCodeProjectsAccountsRequest {
  /** The Project ID of the Identity Platform project which the account belongs to. To specify this field, it requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1GetOobCodeRequest;
}

export const SendOobCodeProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1GetOobCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:sendOobCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendOobCodeProjectsAccountsRequest>;

export type SendOobCodeProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1GetOobCodeResponse;
export const SendOobCodeProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1GetOobCodeResponse;

export type SendOobCodeProjectsAccountsError = CommonErrors;

/** Sends an out-of-band confirmation code for an account. Requests from a authenticated request can optionally return a link including the OOB code instead of sending it. */
export const sendOobCodeProjectsAccounts: API.OperationMethod<SendOobCodeProjectsAccountsRequest, SendOobCodeProjectsAccountsResponse, SendOobCodeProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendOobCodeProjectsAccountsRequest,
  output: SendOobCodeProjectsAccountsResponse,
  errors: [],
}));

export interface QueryProjectsAccountsRequest {
  /** The ID of the project to which the result is scoped. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1QueryUserInfoRequest;
}

export const QueryProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1QueryUserInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryProjectsAccountsRequest>;

export type QueryProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1QueryUserInfoResponse;
export const QueryProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1QueryUserInfoResponse;

export type QueryProjectsAccountsError = CommonErrors;

/** Looks up user accounts within a project or a tenant based on conditions in the request. */
export const queryProjectsAccounts: API.OperationMethod<QueryProjectsAccountsRequest, QueryProjectsAccountsResponse, QueryProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryProjectsAccountsRequest,
  output: QueryProjectsAccountsResponse,
  errors: [],
}));

export interface UpdateProjectsAccountsRequest {
  /** The project ID for the project that the account belongs to. Specifying this field requires Google OAuth 2.0 credential with proper [permissions] (https://cloud.google.com/identity-platform/docs/access-control). Requests from end users should pass an Identity Platform ID token instead. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1SetAccountInfoRequest;
}

export const UpdateProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1SetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:update", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsAccountsRequest>;

export type UpdateProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1SetAccountInfoResponse;
export const UpdateProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1SetAccountInfoResponse;

export type UpdateProjectsAccountsError = CommonErrors;

/** Updates account-related information for the specified user by setting specific fields or applying action codes. Requests from administrators and end users are supported. */
export const updateProjectsAccounts: API.OperationMethod<UpdateProjectsAccountsRequest, UpdateProjectsAccountsResponse, UpdateProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsAccountsRequest,
  output: UpdateProjectsAccountsResponse,
  errors: [],
}));

export interface BatchCreateProjectsAccountsRequest {
  /** The Project ID of the Identity Platform project which the account belongs to. */
  targetProjectId: string;
  /** Request body */
  body?: GoogleCloudIdentitytoolkitV1UploadAccountRequest;
}

export const BatchCreateProjectsAccountsRequest = Schema.Struct({
  targetProjectId: Schema.String.pipe(T.HttpPath("targetProjectId")),
  body: Schema.optional(GoogleCloudIdentitytoolkitV1UploadAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/accounts:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsAccountsRequest>;

export type BatchCreateProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1UploadAccountResponse;
export const BatchCreateProjectsAccountsResponse = GoogleCloudIdentitytoolkitV1UploadAccountResponse;

export type BatchCreateProjectsAccountsError = CommonErrors;

/** Uploads multiple accounts into the Google Cloud project. If there is a problem uploading one or more of the accounts, the rest will be uploaded, and a list of the errors will be returned. To use this method requires a Google OAuth 2.0 credential with proper [permissions](https://cloud.google.com/identity-platform/docs/access-control). */
export const batchCreateProjectsAccounts: API.OperationMethod<BatchCreateProjectsAccountsRequest, BatchCreateProjectsAccountsResponse, BatchCreateProjectsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsAccountsRequest,
  output: BatchCreateProjectsAccountsResponse,
  errors: [],
}));

