// ==========================================================================
// Google Identity Toolkit API (identitytoolkit v3)
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
  version: "v3",
  rootUrl: "https://www.googleapis.com/",
  servicePath: "identitytoolkit/v3/relyingparty/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Relyingparty {
  /** The new email if the code is for email change. */
  newEmail?: string;
  /** The user's Gitkit login token for email change. */
  idToken?: string;
  /** the iOS bundle id of iOS app to handle the action code */
  iOSBundleId?: string;
  /** The recaptcha challenge presented to the user. */
  challenge?: string;
  /** The email of the user. */
  email?: string;
  /** iOS app store id to download the app if it's not already installed */
  iOSAppStoreId?: string;
  /** android package name of the android app to handle the action code */
  androidPackageName?: string;
  /** whether or not the app can handle the oob code without first going to web */
  canHandleCodeInApp?: boolean;
  /** The url to continue to the Gitkit app */
  continueUrl?: string;
  /** whether or not to install the android app on the device where the link is opened */
  androidInstallApp?: boolean;
  /** The request type. */
  requestType?: string;
  /** minimum version of the app. if the version on the device is lower than this version then the user is taken to the play store to upgrade the app */
  androidMinimumVersion?: string;
  /** The recaptcha response from the user. */
  captchaResp?: string;
  /** The IP address of the user. */
  userIp?: string;
  /** The fixed string "identitytoolkit#relyingparty". */
  kind?: string;
}

export const Relyingparty: Schema.Schema<Relyingparty> = Schema.suspend(() => Schema.Struct({
  newEmail: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  iOSBundleId: Schema.optional(Schema.String),
  challenge: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  iOSAppStoreId: Schema.optional(Schema.String),
  androidPackageName: Schema.optional(Schema.String),
  canHandleCodeInApp: Schema.optional(Schema.Boolean),
  continueUrl: Schema.optional(Schema.String),
  androidInstallApp: Schema.optional(Schema.Boolean),
  requestType: Schema.optional(Schema.String),
  androidMinimumVersion: Schema.optional(Schema.String),
  captchaResp: Schema.optional(Schema.String),
  userIp: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Relyingparty" }) as any as Schema.Schema<Relyingparty>;

export interface EmailLinkSigninResponse {
  /** The RP local ID of the user. */
  localId?: string;
  /** The refresh token for the signed in user. */
  refreshToken?: string;
  /** The fixed string "identitytoolkit#EmailLinkSigninResponse". */
  kind?: string;
  /** Expiration time of STS id token in seconds. */
  expiresIn?: string;
  /** The user's email. */
  email?: string;
  /** Whether the user is new. */
  isNewUser?: boolean;
  /** The STS id token to login the newly signed in user. */
  idToken?: string;
}

export const EmailLinkSigninResponse: Schema.Schema<EmailLinkSigninResponse> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  idToken: Schema.optional(Schema.String),
})).annotate({ identifier: "EmailLinkSigninResponse" }) as any as Schema.Schema<EmailLinkSigninResponse>;

export interface IdentitytoolkitRelyingpartyVerifyCustomTokenRequest {
  /** Instance id token of the app. */
  instanceId?: string;
  /** Whether return sts id token and refresh token instead of gitkit token. */
  returnSecureToken?: boolean;
  /** The custom token to verify */
  token?: string;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
}

export const IdentitytoolkitRelyingpartyVerifyCustomTokenRequest: Schema.Schema<IdentitytoolkitRelyingpartyVerifyCustomTokenRequest> = Schema.suspend(() => Schema.Struct({
  instanceId: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  token: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyVerifyCustomTokenRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyVerifyCustomTokenRequest>;

export interface UserInfo {
  /** Whether the user is authenticated by the developer. */
  customAuth?: boolean;
  /** The user's password salt. */
  salt?: string;
  /** The URL of the user profile photo. */
  photoUrl?: string;
  /** Timestamp in seconds for valid login token. */
  validSince?: string;
  /** The local ID of the user. */
  localId?: string;
  /** The IDP of the user. */
  providerUserInfo?: Array<{ email?: string; rawId?: string; phoneNumber?: string; displayName?: string; providerId?: string; photoUrl?: string; screenName?: string; federatedId?: string }>;
  /** User's phone number. */
  phoneNumber?: string;
  /** The user's hashed password. */
  passwordHash?: string;
  /** The timestamp when the password was last updated. */
  passwordUpdatedAt?: number;
  /** Whether the user is disabled. */
  disabled?: boolean;
  /** The email of the user. */
  email?: string;
  /** The name of the user. */
  displayName?: string;
  /** The custom attributes to be set in the user's id token. */
  customAttributes?: string;
  /** Version of the user's password. */
  version?: number;
  /** Whether the email has been verified. */
  emailVerified?: boolean;
  /** User creation timestamp. */
  createdAt?: string;
  /** The user's plain text password. */
  rawPassword?: string;
  /** last login timestamp. */
  lastLoginAt?: string;
  /** User's screen name at Twitter or login name at Github. */
  screenName?: string;
}

export const UserInfo: Schema.Schema<UserInfo> = Schema.suspend(() => Schema.Struct({
  customAuth: Schema.optional(Schema.Boolean),
  salt: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  validSince: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  providerUserInfo: Schema.optional(Schema.Array(Schema.Struct({ email: Schema.optional(Schema.String), rawId: Schema.optional(Schema.String), phoneNumber: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), providerId: Schema.optional(Schema.String), photoUrl: Schema.optional(Schema.String), screenName: Schema.optional(Schema.String), federatedId: Schema.optional(Schema.String) }))),
  phoneNumber: Schema.optional(Schema.String),
  passwordHash: Schema.optional(Schema.String),
  passwordUpdatedAt: Schema.optional(Schema.Number),
  disabled: Schema.optional(Schema.Boolean),
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  customAttributes: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  emailVerified: Schema.optional(Schema.Boolean),
  createdAt: Schema.optional(Schema.String),
  rawPassword: Schema.optional(Schema.String),
  lastLoginAt: Schema.optional(Schema.String),
  screenName: Schema.optional(Schema.String),
})).annotate({ identifier: "UserInfo" }) as any as Schema.Schema<UserInfo>;

export interface IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse {
  temporaryProofExpiresIn?: string;
  isNewUser?: boolean;
  localId?: string;
  temporaryProof?: string;
  verificationProof?: string;
  expiresIn?: string;
  idToken?: string;
  refreshToken?: string;
  verificationProofExpiresIn?: string;
  phoneNumber?: string;
}

export const IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse: Schema.Schema<IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse> = Schema.suspend(() => Schema.Struct({
  temporaryProofExpiresIn: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  localId: Schema.optional(Schema.String),
  temporaryProof: Schema.optional(Schema.String),
  verificationProof: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  verificationProofExpiresIn: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse>;

export interface VerifyAssertionResponse {
  /** The language preference of the user. */
  language?: string;
  /** The OAuth1 access token secret. */
  oauthTokenSecret?: string;
  /** Whether need client to supply email to complete the federated login flow. */
  needEmail?: boolean;
  /** The user approved request token for the OpenID OAuth extension. */
  oauthRequestToken?: string;
  /** The original email stored in the mapping storage. It's returned when the federated ID is associated to a different email. */
  originalEmail?: string;
  /** The URI of the public accessible profiel picture. */
  photoUrl?: string;
  /** The unique ID identifies the IdP account. */
  federatedId?: string;
  /** The fixed string "identitytoolkit#VerifyAssertionResponse". */
  kind?: string;
  /** The ID token. */
  idToken?: string;
  /** It's true if the email is recycled. */
  emailRecycled?: boolean;
  /** The lifetime in seconds of the OAuth2 access token. */
  oauthExpireIn?: number;
  /** Whether the assertion is from a non-trusted IDP and need account linking confirmation. */
  needConfirmation?: boolean;
  /** If idToken is STS id token, then this field will be refresh token. */
  refreshToken?: string;
  /** Client error code. */
  errorMessage?: string;
  /** The nick name of the user. */
  nickName?: string;
  /** The full name of the user. */
  fullName?: string;
  /** Raw IDP-returned user info. */
  rawUserInfo?: string;
  /** The opaque value used by the client to maintain context info between the authentication request and the IDP callback. */
  context?: string;
  /** The action code. */
  action?: string;
  /** The screen_name of a Twitter user or the login name at Github. */
  screenName?: string;
  /** The OAuth2 authorization code. */
  oauthAuthorizationCode?: string;
  /** The email returned by the IdP. NOTE: The federated login user may not own the email. */
  email?: string;
  /** The OIDC id token. */
  oauthIdToken?: string;
  /** The first name of the user. */
  firstName?: string;
  /** When action is 'map', contains the idps which can be used for confirmation. */
  verifiedProvider?: Array<string>;
  /** The display name of the user. */
  displayName?: string;
  /** The IdP ID. For white listed IdPs it's a short domain name e.g. google.com, aol.com, live.net and yahoo.com. If the "providerId" param is set to OpenID OP identifer other than the whilte listed IdPs the OP identifier is returned. If the "identifier" param is federated ID in the createAuthUri request. The domain part of the federated ID is returned. */
  providerId?: string;
  /** The RP local ID if it's already been mapped to the IdP account identified by the federated ID. */
  localId?: string;
  /** It's the identifier param in the createAuthUri request if the identifier is an email. It can be used to check whether the user input email is different from the asserted email. */
  inputEmail?: string;
  /** The custom scheme used by mobile app. */
  appScheme?: string;
  /** True if it's a new user sign-in, false if it's a returning user. */
  isNewUser?: boolean;
  /** The value is true if the IDP is also the email provider. It means the user owns the email. */
  emailVerified?: boolean;
  /** If idToken is STS id token, then this field will be expiration time of STS id token in seconds. */
  expiresIn?: string;
  /** The OAuth2 access token. */
  oauthAccessToken?: string;
  /** The birth date of the IdP account. */
  dateOfBirth?: string;
  /** URL for OTA app installation. */
  appInstallationUrl?: string;
  /** The scope for the OpenID OAuth extension. */
  oauthScope?: string;
  /** The timezone of the user. */
  timeZone?: string;
  /** The last name of the user. */
  lastName?: string;
}

export const VerifyAssertionResponse: Schema.Schema<VerifyAssertionResponse> = Schema.suspend(() => Schema.Struct({
  language: Schema.optional(Schema.String),
  oauthTokenSecret: Schema.optional(Schema.String),
  needEmail: Schema.optional(Schema.Boolean),
  oauthRequestToken: Schema.optional(Schema.String),
  originalEmail: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  federatedId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  emailRecycled: Schema.optional(Schema.Boolean),
  oauthExpireIn: Schema.optional(Schema.Number),
  needConfirmation: Schema.optional(Schema.Boolean),
  refreshToken: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  nickName: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
  rawUserInfo: Schema.optional(Schema.String),
  context: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  screenName: Schema.optional(Schema.String),
  oauthAuthorizationCode: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  oauthIdToken: Schema.optional(Schema.String),
  firstName: Schema.optional(Schema.String),
  verifiedProvider: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  providerId: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  inputEmail: Schema.optional(Schema.String),
  appScheme: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  emailVerified: Schema.optional(Schema.Boolean),
  expiresIn: Schema.optional(Schema.String),
  oauthAccessToken: Schema.optional(Schema.String),
  dateOfBirth: Schema.optional(Schema.String),
  appInstallationUrl: Schema.optional(Schema.String),
  oauthScope: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  lastName: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyAssertionResponse" }) as any as Schema.Schema<VerifyAssertionResponse>;

export interface EmailTemplate {
  /** Subject of the email. */
  subject?: string;
  /** From address of the email. */
  from?: string;
  /** Reply-to address. */
  replyTo?: string;
  /** Email body. */
  body?: string;
  /** Email body format. */
  format?: string;
  /** From display name. */
  fromDisplayName?: string;
}

export const EmailTemplate: Schema.Schema<EmailTemplate> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(Schema.String),
  from: Schema.optional(Schema.String),
  replyTo: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  fromDisplayName: Schema.optional(Schema.String),
})).annotate({ identifier: "EmailTemplate" }) as any as Schema.Schema<EmailTemplate>;

export interface IdpConfig {
  /** OAuth2 client secret. */
  secret?: string;
  /** OAuth2 client ID. */
  clientId?: string;
  /** Whether this IDP is enabled. */
  enabled?: boolean;
  /** OAuth2 provider. */
  provider?: string;
  /** Whitelisted client IDs for audience check. */
  whitelistedAudiences?: Array<string>;
  /** Percent of users who will be prompted/redirected federated login for this IDP. */
  experimentPercent?: number;
}

export const IdpConfig: Schema.Schema<IdpConfig> = Schema.suspend(() => Schema.Struct({
  secret: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  provider: Schema.optional(Schema.String),
  whitelistedAudiences: Schema.optional(Schema.Array(Schema.String)),
  experimentPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "IdpConfig" }) as any as Schema.Schema<IdpConfig>;

export interface IdentitytoolkitRelyingpartySetProjectConfigRequest {
  /** Whether to use email sending provided by Firebear. */
  useEmailSending?: boolean;
  /** Verify email template. */
  verifyEmailTemplate?: EmailTemplate;
  /** Authorized domains for widget redirect. */
  authorizedDomains?: Array<string>;
  /** Oauth2 provider configuration. */
  idpConfig?: Array<IdpConfig>;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** Browser API key, needed when making http request to Apiary. */
  apiKey?: string;
  /** Whether to enable anonymous user. */
  enableAnonymousUser?: boolean;
  /** Legacy reset password email template. */
  legacyResetPasswordTemplate?: EmailTemplate;
  /** Whether to allow password user sign in or sign up. */
  allowPasswordUser?: boolean;
  /** Change email template. */
  changeEmailTemplate?: EmailTemplate;
  /** Reset password email template. */
  resetPasswordTemplate?: EmailTemplate;
}

export const IdentitytoolkitRelyingpartySetProjectConfigRequest: Schema.Schema<IdentitytoolkitRelyingpartySetProjectConfigRequest> = Schema.suspend(() => Schema.Struct({
  useEmailSending: Schema.optional(Schema.Boolean),
  verifyEmailTemplate: Schema.optional(EmailTemplate),
  authorizedDomains: Schema.optional(Schema.Array(Schema.String)),
  idpConfig: Schema.optional(Schema.Array(IdpConfig)),
  delegatedProjectNumber: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
  enableAnonymousUser: Schema.optional(Schema.Boolean),
  legacyResetPasswordTemplate: Schema.optional(EmailTemplate),
  allowPasswordUser: Schema.optional(Schema.Boolean),
  changeEmailTemplate: Schema.optional(EmailTemplate),
  resetPasswordTemplate: Schema.optional(EmailTemplate),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySetProjectConfigRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySetProjectConfigRequest>;

export interface IdentitytoolkitRelyingpartyVerifyPasswordRequest {
  /** The password inputed by the user. */
  password?: string;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** Tenant project number to be used for idp discovery. */
  tenantProjectNumber?: string;
  /** Whether return sts id token and refresh token instead of gitkit token. */
  returnSecureToken?: boolean;
  /** Response to the captcha. */
  captchaResponse?: string;
  /** For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. */
  tenantId?: string;
  /** The GITKit token of the authenticated user. */
  idToken?: string;
  /** Instance id token of the app. */
  instanceId?: string;
  /** The email of the user. */
  email?: string;
  /** The captcha challenge. */
  captchaChallenge?: string;
  /** The GITKit token for the non-trusted IDP, which is to be confirmed by the user. */
  pendingIdToken?: string;
}

export const IdentitytoolkitRelyingpartyVerifyPasswordRequest: Schema.Schema<IdentitytoolkitRelyingpartyVerifyPasswordRequest> = Schema.suspend(() => Schema.Struct({
  password: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  tenantProjectNumber: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  captchaResponse: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  captchaChallenge: Schema.optional(Schema.String),
  pendingIdToken: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyVerifyPasswordRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyVerifyPasswordRequest>;

export interface VerifyCustomTokenResponse {
  /** The GITKit token for authenticated user. */
  idToken?: string;
  /** True if it's a new user sign-in, false if it's a returning user. */
  isNewUser?: boolean;
  /** If idToken is STS id token, then this field will be refresh token. */
  refreshToken?: string;
  /** If idToken is STS id token, then this field will be expiration time of STS id token in seconds. */
  expiresIn?: string;
  /** The fixed string "identitytoolkit#VerifyCustomTokenResponse". */
  kind?: string;
}

export const VerifyCustomTokenResponse: Schema.Schema<VerifyCustomTokenResponse> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  isNewUser: Schema.optional(Schema.Boolean),
  refreshToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyCustomTokenResponse" }) as any as Schema.Schema<VerifyCustomTokenResponse>;

export type IdentitytoolkitRelyingpartyGetPublicKeysResponse = Record<string, string>;
export const IdentitytoolkitRelyingpartyGetPublicKeysResponse: Schema.Schema<IdentitytoolkitRelyingpartyGetPublicKeysResponse> = Schema.Record(Schema.String, Schema.String) as any as Schema.Schema<IdentitytoolkitRelyingpartyGetPublicKeysResponse>;

export interface IdentitytoolkitRelyingpartyCreateAuthUriRequest {
  /** Tenant project number to be used for idp discovery. */
  tenantProjectNumber?: string;
  /** The email or federated ID of the user. */
  identifier?: string;
  /** Explicitly specify the auth flow type. Currently only support "CODE_FLOW" type. The field is only used for Google provider. */
  authFlowType?: string;
  /** The native app package for OTA installation. */
  otaApp?: string;
  /** Optional realm for OpenID protocol. The sub string "scheme://domain:port" of the param "continueUri" is used if this is not set. */
  openidRealm?: string;
  /** The developer's consumer key for OpenId OAuth Extension */
  oauthConsumerKey?: string;
  /** The hosted domain to restrict sign-in to accounts at that domain for Google Apps hosted accounts. */
  hostedDomain?: string;
  /** The query parameter that client can customize by themselves in auth url. The following parameters are reserved for server so that they cannot be customized by clients: client_id, response_type, scope, redirect_uri, state, oauth_token. */
  customParameter?: Record<string, string>;
  /** The session_id passed by client. */
  sessionId?: string;
  /** The IdP ID. For white listed IdPs it's a short domain name e.g. google.com, aol.com, live.net and yahoo.com. For other OpenID IdPs it's the OP identifier. */
  providerId?: string;
  /** The opaque value used by the client to maintain context info between the authentication request and the IDP callback. */
  context?: string;
  /** For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. */
  tenantId?: string;
  /** Additional oauth scopes, beyond the basid user profile, that the user would be prompted to grant */
  oauthScope?: string;
  /** The app ID of the mobile app, base64(CERT_SHA1):PACKAGE_NAME for Android, BUNDLE_ID for iOS. */
  appId?: string;
  /** The relying party OAuth client ID. */
  clientId?: string;
  /** The URI to which the IDP redirects the user after the federated login flow. */
  continueUri?: string;
}

export const IdentitytoolkitRelyingpartyCreateAuthUriRequest: Schema.Schema<IdentitytoolkitRelyingpartyCreateAuthUriRequest> = Schema.suspend(() => Schema.Struct({
  tenantProjectNumber: Schema.optional(Schema.String),
  identifier: Schema.optional(Schema.String),
  authFlowType: Schema.optional(Schema.String),
  otaApp: Schema.optional(Schema.String),
  openidRealm: Schema.optional(Schema.String),
  oauthConsumerKey: Schema.optional(Schema.String),
  hostedDomain: Schema.optional(Schema.String),
  customParameter: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sessionId: Schema.optional(Schema.String),
  providerId: Schema.optional(Schema.String),
  context: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  oauthScope: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  continueUri: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyCreateAuthUriRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyCreateAuthUriRequest>;

export interface IdentitytoolkitRelyingpartyGetProjectConfigResponse {
  /** OAuth2 provider configuration. */
  idpConfig?: Array<IdpConfig>;
  /** Verify email template. */
  verifyEmailTemplate?: EmailTemplate;
  /** Whether to allow password user sign in or sign up. */
  allowPasswordUser?: boolean;
  dynamicLinksDomain?: string;
  /** Browser API key, needed when making http request to Apiary. */
  apiKey?: string;
  /** Project ID of the relying party. */
  projectId?: string;
  /** Whether anonymous user is enabled. */
  enableAnonymousUser?: boolean;
  /** Authorized domains. */
  authorizedDomains?: Array<string>;
  /** Whether to use email sending provided by Firebear. */
  useEmailSending?: boolean;
  /** Legacy reset password email template. */
  legacyResetPasswordTemplate?: EmailTemplate;
  /** Change email template. */
  changeEmailTemplate?: EmailTemplate;
  /** Reset password email template. */
  resetPasswordTemplate?: EmailTemplate;
}

export const IdentitytoolkitRelyingpartyGetProjectConfigResponse: Schema.Schema<IdentitytoolkitRelyingpartyGetProjectConfigResponse> = Schema.suspend(() => Schema.Struct({
  idpConfig: Schema.optional(Schema.Array(IdpConfig)),
  verifyEmailTemplate: Schema.optional(EmailTemplate),
  allowPasswordUser: Schema.optional(Schema.Boolean),
  dynamicLinksDomain: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  enableAnonymousUser: Schema.optional(Schema.Boolean),
  authorizedDomains: Schema.optional(Schema.Array(Schema.String)),
  useEmailSending: Schema.optional(Schema.Boolean),
  legacyResetPasswordTemplate: Schema.optional(EmailTemplate),
  changeEmailTemplate: Schema.optional(EmailTemplate),
  resetPasswordTemplate: Schema.optional(EmailTemplate),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyGetProjectConfigResponse" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyGetProjectConfigResponse>;

export interface IdentitytoolkitRelyingpartySignOutUserRequest {
  /** The local ID of the user. */
  localId?: string;
  /** Instance id token of the app. */
  instanceId?: string;
}

export const IdentitytoolkitRelyingpartySignOutUserRequest: Schema.Schema<IdentitytoolkitRelyingpartySignOutUserRequest> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySignOutUserRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySignOutUserRequest>;

export interface IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest {
  /** The session info previously returned by IdentityToolkit-SendVerificationCode. */
  sessionInfo?: string;
  verificationProof?: string;
  phoneNumber?: string;
  code?: string;
  idToken?: string;
  operation?: string;
  temporaryProof?: string;
}

export const IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest: Schema.Schema<IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest> = Schema.suspend(() => Schema.Struct({
  sessionInfo: Schema.optional(Schema.String),
  verificationProof: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  temporaryProof: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest>;

export interface UploadAccountResponse {
  /** The fixed string "identitytoolkit#UploadAccountResponse". */
  kind?: string;
  /** The error encountered while processing the account info. */
  error?: Array<{ index?: number; message?: string }>;
}

export const UploadAccountResponse: Schema.Schema<UploadAccountResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  error: Schema.optional(Schema.Array(Schema.Struct({ index: Schema.optional(Schema.Number), message: Schema.optional(Schema.String) }))),
})).annotate({ identifier: "UploadAccountResponse" }) as any as Schema.Schema<UploadAccountResponse>;

export interface IdentitytoolkitRelyingpartySignOutUserResponse {
  /** The local ID of the user. */
  localId?: string;
}

export const IdentitytoolkitRelyingpartySignOutUserResponse: Schema.Schema<IdentitytoolkitRelyingpartySignOutUserResponse> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySignOutUserResponse" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySignOutUserResponse>;

export interface GetRecaptchaParamResponse {
  /** The fixed string "identitytoolkit#GetRecaptchaParamResponse". */
  kind?: string;
  /** Site key registered at recaptcha. */
  recaptchaSiteKey?: string;
  /** The stoken field for the recaptcha widget, used to request captcha challenge. */
  recaptchaStoken?: string;
}

export const GetRecaptchaParamResponse: Schema.Schema<GetRecaptchaParamResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  recaptchaSiteKey: Schema.optional(Schema.String),
  recaptchaStoken: Schema.optional(Schema.String),
})).annotate({ identifier: "GetRecaptchaParamResponse" }) as any as Schema.Schema<GetRecaptchaParamResponse>;

export interface GetAccountInfoResponse {
  /** The fixed string "identitytoolkit#GetAccountInfoResponse". */
  kind?: string;
  /** The info of the users. */
  users?: Array<UserInfo>;
}

export const GetAccountInfoResponse: Schema.Schema<GetAccountInfoResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  users: Schema.optional(Schema.Array(UserInfo)),
})).annotate({ identifier: "GetAccountInfoResponse" }) as any as Schema.Schema<GetAccountInfoResponse>;

export interface IdentitytoolkitRelyingpartyVerifyAssertionRequest {
  /** The GITKit token for the non-trusted IDP pending to be confirmed by the user. */
  pendingIdToken?: string;
  /** Session ID, which should match the one in previous createAuthUri request. */
  sessionId?: string;
  /** The GITKit token of the authenticated user. */
  idToken?: string;
  /** For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. */
  tenantId?: string;
  /** Tenant project number to be used for idp discovery. */
  tenantProjectNumber?: string;
  /** The URI to which the IDP redirects the user back. It may contain federated login result params added by the IDP. */
  requestUri?: string;
  /** Whether to return refresh tokens. */
  returnRefreshToken?: boolean;
  /** Instance id token of the app. */
  instanceId?: string;
  /** The post body if the request is a HTTP POST. */
  postBody?: string;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** Whether return sts id token and refresh token instead of gitkit token. */
  returnSecureToken?: boolean;
  /** When it's true, automatically creates a new account if the user doesn't exist. When it's false, allows existing user to sign in normally and throws exception if the user doesn't exist. */
  autoCreate?: boolean;
  /** Whether return 200 and IDP credential rather than throw exception when federated id is already linked. */
  returnIdpCredential?: boolean;
}

export const IdentitytoolkitRelyingpartyVerifyAssertionRequest: Schema.Schema<IdentitytoolkitRelyingpartyVerifyAssertionRequest> = Schema.suspend(() => Schema.Struct({
  pendingIdToken: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  tenantProjectNumber: Schema.optional(Schema.String),
  requestUri: Schema.optional(Schema.String),
  returnRefreshToken: Schema.optional(Schema.Boolean),
  instanceId: Schema.optional(Schema.String),
  postBody: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  autoCreate: Schema.optional(Schema.Boolean),
  returnIdpCredential: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyVerifyAssertionRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyVerifyAssertionRequest>;

export interface SignupNewUserResponse {
  /** The Gitkit id token to login the newly sign up user. */
  idToken?: string;
  /** The fixed string "identitytoolkit#SignupNewUserResponse". */
  kind?: string;
  /** If idToken is STS id token, then this field will be expiration time of STS id token in seconds. */
  expiresIn?: string;
  /** The RP local ID of the user. */
  localId?: string;
  /** The email of the user. */
  email?: string;
  /** The name of the user. */
  displayName?: string;
  /** If idToken is STS id token, then this field will be refresh token. */
  refreshToken?: string;
}

export const SignupNewUserResponse: Schema.Schema<SignupNewUserResponse> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SignupNewUserResponse" }) as any as Schema.Schema<SignupNewUserResponse>;

export interface DeleteAccountResponse {
  /** The fixed string "identitytoolkit#DeleteAccountResponse". */
  kind?: string;
}

export const DeleteAccountResponse: Schema.Schema<DeleteAccountResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DeleteAccountResponse" }) as any as Schema.Schema<DeleteAccountResponse>;

export interface IdentitytoolkitRelyingpartySendVerificationCodeResponse {
  /** Encrypted session information */
  sessionInfo?: string;
}

export const IdentitytoolkitRelyingpartySendVerificationCodeResponse: Schema.Schema<IdentitytoolkitRelyingpartySendVerificationCodeResponse> = Schema.suspend(() => Schema.Struct({
  sessionInfo: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySendVerificationCodeResponse" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySendVerificationCodeResponse>;

export interface IdentitytoolkitRelyingpartySetProjectConfigResponse {
  /** Project ID of the relying party. */
  projectId?: string;
}

export const IdentitytoolkitRelyingpartySetProjectConfigResponse: Schema.Schema<IdentitytoolkitRelyingpartySetProjectConfigResponse> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySetProjectConfigResponse" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySetProjectConfigResponse>;

export interface IdentitytoolkitRelyingpartySetAccountInfoRequest {
  /** The GITKit token of the authenticated user. */
  idToken?: string;
  /** The email of the user. */
  email?: string;
  /** Mark the email as verified or not. */
  emailVerified?: boolean;
  /** The photo url of the user. */
  photoUrl?: string;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** Whether return sts id token and refresh token instead of gitkit token. */
  returnSecureToken?: boolean;
  /** The captcha challenge. */
  captchaChallenge?: string;
  /** The new password of the user. */
  password?: string;
  /** The name of the user. */
  displayName?: string;
  /** The associated IDPs of the user. */
  provider?: Array<string>;
  /** The out-of-band code of the change email request. */
  oobCode?: string;
  /** Mark the user to upgrade to federated login. */
  upgradeToFederatedLogin?: boolean;
  /** The IDPs the user request to delete. */
  deleteProvider?: Array<string>;
  /** Privileged caller can update user with specified phone number. */
  phoneNumber?: string;
  /** The local ID of the user. */
  localId?: string;
  /** The attributes users request to delete. */
  deleteAttribute?: Array<string>;
  /** The custom attributes to be set in the user's id token. */
  customAttributes?: string;
  /** The timestamp when the account is created. */
  createdAt?: string;
  /** Instance id token of the app. */
  instanceId?: string;
  /** Whether to disable the user. */
  disableUser?: boolean;
  /** Last login timestamp. */
  lastLoginAt?: string;
  /** Timestamp in seconds for valid login token. */
  validSince?: string;
  /** Response to the captcha. */
  captchaResponse?: string;
}

export const IdentitytoolkitRelyingpartySetAccountInfoRequest: Schema.Schema<IdentitytoolkitRelyingpartySetAccountInfoRequest> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
  photoUrl: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  returnSecureToken: Schema.optional(Schema.Boolean),
  captchaChallenge: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.Array(Schema.String)),
  oobCode: Schema.optional(Schema.String),
  upgradeToFederatedLogin: Schema.optional(Schema.Boolean),
  deleteProvider: Schema.optional(Schema.Array(Schema.String)),
  phoneNumber: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  deleteAttribute: Schema.optional(Schema.Array(Schema.String)),
  customAttributes: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
  disableUser: Schema.optional(Schema.Boolean),
  lastLoginAt: Schema.optional(Schema.String),
  validSince: Schema.optional(Schema.String),
  captchaResponse: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySetAccountInfoRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySetAccountInfoRequest>;

export interface IdentitytoolkitRelyingpartyResetPasswordRequest {
  /** The old password inputted by the user. */
  oldPassword?: string;
  /** The confirmation code. */
  oobCode?: string;
  /** The email address of the user. */
  email?: string;
  /** The new password inputted by the user. */
  newPassword?: string;
}

export const IdentitytoolkitRelyingpartyResetPasswordRequest: Schema.Schema<IdentitytoolkitRelyingpartyResetPasswordRequest> = Schema.suspend(() => Schema.Struct({
  oldPassword: Schema.optional(Schema.String),
  oobCode: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  newPassword: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyResetPasswordRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyResetPasswordRequest>;

export interface IdentitytoolkitRelyingpartySendVerificationCodeRequest {
  /** Recaptcha solution. */
  recaptchaToken?: string;
  /** The phone number to send the verification code to in E.164 format. */
  phoneNumber?: string;
  /** Receipt of successful app token validation with APNS. */
  iosReceipt?: string;
  /** Secret delivered to iOS app via APNS. */
  iosSecret?: string;
}

export const IdentitytoolkitRelyingpartySendVerificationCodeRequest: Schema.Schema<IdentitytoolkitRelyingpartySendVerificationCodeRequest> = Schema.suspend(() => Schema.Struct({
  recaptchaToken: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  iosReceipt: Schema.optional(Schema.String),
  iosSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySendVerificationCodeRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySendVerificationCodeRequest>;

export interface GetOobConfirmationCodeResponse {
  /** The code to be send to the user. */
  oobCode?: string;
  /** The fixed string "identitytoolkit#GetOobConfirmationCodeResponse". */
  kind?: string;
  /** The email address that the email is sent to. */
  email?: string;
}

export const GetOobConfirmationCodeResponse: Schema.Schema<GetOobConfirmationCodeResponse> = Schema.suspend(() => Schema.Struct({
  oobCode: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "GetOobConfirmationCodeResponse" }) as any as Schema.Schema<GetOobConfirmationCodeResponse>;

export interface VerifyPasswordResponse {
  /** The lifetime in seconds of the OAuth2 access token. */
  oauthExpireIn?: number;
  /** The URI of the user's photo at IdP */
  photoUrl?: string;
  /** The name of the user. */
  displayName?: string;
  /** The OAuth2 access token. */
  oauthAccessToken?: string;
  /** Whether the email is registered. */
  registered?: boolean;
  /** The RP local ID if it's already been mapped to the IdP account identified by the federated ID. */
  localId?: string;
  /** The fixed string "identitytoolkit#VerifyPasswordResponse". */
  kind?: string;
  /** The email returned by the IdP. NOTE: The federated login user may not own the email. */
  email?: string;
  /** The GITKit token for authenticated user. */
  idToken?: string;
  /** If idToken is STS id token, then this field will be expiration time of STS id token in seconds. */
  expiresIn?: string;
  /** If idToken is STS id token, then this field will be refresh token. */
  refreshToken?: string;
  /** The OAuth2 authorization code. */
  oauthAuthorizationCode?: string;
}

export const VerifyPasswordResponse: Schema.Schema<VerifyPasswordResponse> = Schema.suspend(() => Schema.Struct({
  oauthExpireIn: Schema.optional(Schema.Number),
  photoUrl: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  oauthAccessToken: Schema.optional(Schema.String),
  registered: Schema.optional(Schema.Boolean),
  localId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  oauthAuthorizationCode: Schema.optional(Schema.String),
})).annotate({ identifier: "VerifyPasswordResponse" }) as any as Schema.Schema<VerifyPasswordResponse>;

export interface IdentitytoolkitRelyingpartyUploadAccountRequest {
  /** Rounds for hash calculation. Used by scrypt and similar algorithms. */
  rounds?: number;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  dkLen?: number;
  /** If true, backend will do sanity check(including duplicate email and federated id) when uploading account. */
  sanityCheck?: boolean;
  parallelization?: number;
  /** The account info to be stored. */
  users?: Array<UserInfo>;
  /** The password hash algorithm. */
  hashAlgorithm?: string;
  /** Whether allow overwrite existing account when user local_id exists. */
  allowOverwrite?: boolean;
  blockSize?: number;
  /** The key for to hash the password. */
  signerKey?: string;
  /** The salt separator. */
  saltSeparator?: string;
  /** Specify which project (field value is actually project id) to operate. Only used when provided credential. */
  targetProjectId?: string;
  /** Memory cost for hash calculation. Used by scrypt similar algorithms. */
  memoryCost?: number;
  /** The following 4 fields are for standard scrypt algorithm. */
  cpuMemCost?: number;
}

export const IdentitytoolkitRelyingpartyUploadAccountRequest: Schema.Schema<IdentitytoolkitRelyingpartyUploadAccountRequest> = Schema.suspend(() => Schema.Struct({
  rounds: Schema.optional(Schema.Number),
  delegatedProjectNumber: Schema.optional(Schema.String),
  dkLen: Schema.optional(Schema.Number),
  sanityCheck: Schema.optional(Schema.Boolean),
  parallelization: Schema.optional(Schema.Number),
  users: Schema.optional(Schema.Array(UserInfo)),
  hashAlgorithm: Schema.optional(Schema.String),
  allowOverwrite: Schema.optional(Schema.Boolean),
  blockSize: Schema.optional(Schema.Number),
  signerKey: Schema.optional(Schema.String),
  saltSeparator: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
  memoryCost: Schema.optional(Schema.Number),
  cpuMemCost: Schema.optional(Schema.Number),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyUploadAccountRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyUploadAccountRequest>;

export interface IdentitytoolkitRelyingpartySignupNewUserRequest {
  /** Privileged caller can create user with specified user id. */
  localId?: string;
  /** For multi-tenant use cases, in order to construct sign-in URL with the correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP configs from. */
  tenantId?: string;
  /** The captcha challenge. */
  captchaChallenge?: string;
  /** Tenant project number to be used for idp discovery. */
  tenantProjectNumber?: string;
  /** Whether to disable the user. Only can be used by service account. */
  disabled?: boolean;
  /** The name of the user. */
  displayName?: string;
  /** The photo url of the user. */
  photoUrl?: string;
  /** The GITKit token of the authenticated user. */
  idToken?: string;
  /** Response to the captcha. */
  captchaResponse?: string;
  /** Privileged caller can create user with specified phone number. */
  phoneNumber?: string;
  /** Mark the email as verified or not. Only can be used by service account. */
  emailVerified?: boolean;
  /** The new password of the user. */
  password?: string;
  /** The email of the user. */
  email?: string;
  /** Instance id token of the app. */
  instanceId?: string;
}

export const IdentitytoolkitRelyingpartySignupNewUserRequest: Schema.Schema<IdentitytoolkitRelyingpartySignupNewUserRequest> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  tenantId: Schema.optional(Schema.String),
  captchaChallenge: Schema.optional(Schema.String),
  tenantProjectNumber: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  photoUrl: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  captchaResponse: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  emailVerified: Schema.optional(Schema.Boolean),
  password: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  instanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartySignupNewUserRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartySignupNewUserRequest>;

export interface DownloadAccountResponse {
  /** The next page token. To be used in a subsequent request to return the next page of results. */
  nextPageToken?: string;
  /** The user accounts data. */
  users?: Array<UserInfo>;
  /** The fixed string "identitytoolkit#DownloadAccountResponse". */
  kind?: string;
}

export const DownloadAccountResponse: Schema.Schema<DownloadAccountResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  users: Schema.optional(Schema.Array(UserInfo)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DownloadAccountResponse" }) as any as Schema.Schema<DownloadAccountResponse>;

export interface IdentitytoolkitRelyingpartyGetAccountInfoRequest {
  /** Privileged caller can query users by specified phone number. */
  phoneNumber?: Array<string>;
  /** The GITKit token of the authenticated user. */
  idToken?: string;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** The list of local ID's of the users to inquiry. */
  localId?: Array<string>;
  /** The list of emails of the users to inquiry. */
  email?: Array<string>;
}

export const IdentitytoolkitRelyingpartyGetAccountInfoRequest: Schema.Schema<IdentitytoolkitRelyingpartyGetAccountInfoRequest> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.Array(Schema.String)),
  idToken: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.Array(Schema.String)),
  email: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyGetAccountInfoRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyGetAccountInfoRequest>;

export interface SetAccountInfoResponse {
  /** If email has been verified. */
  emailVerified?: boolean;
  /** The photo url of the user. */
  photoUrl?: string;
  /** If idToken is STS id token, then this field will be expiration time of STS id token in seconds. */
  expiresIn?: string;
  /** If idToken is STS id token, then this field will be refresh token. */
  refreshToken?: string;
  /** The email of the user. */
  email?: string;
  /** The local ID of the user. */
  localId?: string;
  /** The Gitkit id token to login the newly sign up user. */
  idToken?: string;
  /** The user's hashed password. */
  passwordHash?: string;
  /** The name of the user. */
  displayName?: string;
  /** The fixed string "identitytoolkit#SetAccountInfoResponse". */
  kind?: string;
  /** The user's profiles at the associated IdPs. */
  providerUserInfo?: Array<{ providerId?: string; displayName?: string; federatedId?: string; photoUrl?: string }>;
  /** The new email the user attempts to change to. */
  newEmail?: string;
}

export const SetAccountInfoResponse: Schema.Schema<SetAccountInfoResponse> = Schema.suspend(() => Schema.Struct({
  emailVerified: Schema.optional(Schema.Boolean),
  photoUrl: Schema.optional(Schema.String),
  expiresIn: Schema.optional(Schema.String),
  refreshToken: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  localId: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
  passwordHash: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  providerUserInfo: Schema.optional(Schema.Array(Schema.Struct({ providerId: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), federatedId: Schema.optional(Schema.String), photoUrl: Schema.optional(Schema.String) }))),
  newEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "SetAccountInfoResponse" }) as any as Schema.Schema<SetAccountInfoResponse>;

export interface IdentitytoolkitRelyingpartyEmailLinkSigninRequest {
  /** Token for linking flow. */
  idToken?: string;
  /** The email address of the user. */
  email?: string;
  /** The confirmation code. */
  oobCode?: string;
}

export const IdentitytoolkitRelyingpartyEmailLinkSigninRequest: Schema.Schema<IdentitytoolkitRelyingpartyEmailLinkSigninRequest> = Schema.suspend(() => Schema.Struct({
  idToken: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  oobCode: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyEmailLinkSigninRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyEmailLinkSigninRequest>;

export interface IdentitytoolkitRelyingpartyDownloadAccountRequest {
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** The token for the next page. This should be taken from the previous response. */
  nextPageToken?: string;
  /** Specify which project (field value is actually project id) to operate. Only used when provided credential. */
  targetProjectId?: string;
  /** The max number of results to return in the response. */
  maxResults?: number;
}

export const IdentitytoolkitRelyingpartyDownloadAccountRequest: Schema.Schema<IdentitytoolkitRelyingpartyDownloadAccountRequest> = Schema.suspend(() => Schema.Struct({
  delegatedProjectNumber: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  targetProjectId: Schema.optional(Schema.String),
  maxResults: Schema.optional(Schema.Number),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyDownloadAccountRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyDownloadAccountRequest>;

export interface CreateAuthUriResponse {
  /** The fixed string identitytoolkit#CreateAuthUriResponse". */
  kind?: string;
  /** True if the authUri is for user's existing provider. */
  forExistingProvider?: boolean;
  /** True if captcha is required. */
  captchaRequired?: boolean;
  /** The URI used by the IDP to authenticate the user. */
  authUri?: string;
  /** Whether the user is registered if the identifier is an email. */
  registered?: boolean;
  /** all providers the user has once used to do federated login */
  allProviders?: Array<string>;
  /** The provider ID of the auth URI. */
  providerId?: string;
  /** Session ID which should be passed in the following verifyAssertion request. */
  sessionId?: string;
  /** All sign-in methods this user has used. */
  signinMethods?: Array<string>;
}

export const CreateAuthUriResponse: Schema.Schema<CreateAuthUriResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  forExistingProvider: Schema.optional(Schema.Boolean),
  captchaRequired: Schema.optional(Schema.Boolean),
  authUri: Schema.optional(Schema.String),
  registered: Schema.optional(Schema.Boolean),
  allProviders: Schema.optional(Schema.Array(Schema.String)),
  providerId: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  signinMethods: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreateAuthUriResponse" }) as any as Schema.Schema<CreateAuthUriResponse>;

export interface ResetPasswordResponse {
  /** The fixed string "identitytoolkit#ResetPasswordResponse". */
  kind?: string;
  /** The request type. */
  requestType?: string;
  /** If the out-of-band code is for email recovery, the user's new email. */
  newEmail?: string;
  /** The user's email. If the out-of-band code is for email recovery, the user's original email. */
  email?: string;
}

export const ResetPasswordResponse: Schema.Schema<ResetPasswordResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  requestType: Schema.optional(Schema.String),
  newEmail: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "ResetPasswordResponse" }) as any as Schema.Schema<ResetPasswordResponse>;

export interface IdentitytoolkitRelyingpartyDeleteAccountRequest {
  /** The local ID of the user. */
  localId?: string;
  /** GCP project number of the requesting delegated app. Currently only intended for Firebase V1 migration. */
  delegatedProjectNumber?: string;
  /** The GITKit token or STS id token of the authenticated user. */
  idToken?: string;
}

export const IdentitytoolkitRelyingpartyDeleteAccountRequest: Schema.Schema<IdentitytoolkitRelyingpartyDeleteAccountRequest> = Schema.suspend(() => Schema.Struct({
  localId: Schema.optional(Schema.String),
  delegatedProjectNumber: Schema.optional(Schema.String),
  idToken: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentitytoolkitRelyingpartyDeleteAccountRequest" }) as any as Schema.Schema<IdentitytoolkitRelyingpartyDeleteAccountRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Verifies the assertion returned by the IdP. */
export interface VerifyAssertionRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyVerifyAssertionRequest;
}

export const VerifyAssertionRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyVerifyAssertionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "verifyAssertion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyAssertionRelyingpartyRequest>;

export type VerifyAssertionRelyingpartyResponse = VerifyAssertionResponse;
export const VerifyAssertionRelyingpartyResponse = VerifyAssertionResponse;

export type VerifyAssertionRelyingpartyError = CommonErrors;

export const verifyAssertionRelyingparty: API.OperationMethod<VerifyAssertionRelyingpartyRequest, VerifyAssertionRelyingpartyResponse, VerifyAssertionRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyAssertionRelyingpartyRequest,
  output: VerifyAssertionRelyingpartyResponse,
  errors: [],
}));

/** Get token signing public key. */
export interface GetPublicKeysRelyingpartyRequest {
}

export const GetPublicKeysRelyingpartyRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "publicKeys" }),
  svc,
) as unknown as Schema.Schema<GetPublicKeysRelyingpartyRequest>;

export type GetPublicKeysRelyingpartyResponse = IdentitytoolkitRelyingpartyGetPublicKeysResponse;
export const GetPublicKeysRelyingpartyResponse = IdentitytoolkitRelyingpartyGetPublicKeysResponse;

export type GetPublicKeysRelyingpartyError = CommonErrors;

export const getPublicKeysRelyingparty: API.OperationMethod<GetPublicKeysRelyingpartyRequest, GetPublicKeysRelyingpartyResponse, GetPublicKeysRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPublicKeysRelyingpartyRequest,
  output: GetPublicKeysRelyingpartyResponse,
  errors: [],
}));

/** Sign out user. */
export interface SignOutUserRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartySignOutUserRequest;
}

export const SignOutUserRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartySignOutUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "signOutUser", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignOutUserRelyingpartyRequest>;

export type SignOutUserRelyingpartyResponse = IdentitytoolkitRelyingpartySignOutUserResponse;
export const SignOutUserRelyingpartyResponse = IdentitytoolkitRelyingpartySignOutUserResponse;

export type SignOutUserRelyingpartyError = CommonErrors;

export const signOutUserRelyingparty: API.OperationMethod<SignOutUserRelyingpartyRequest, SignOutUserRelyingpartyResponse, SignOutUserRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignOutUserRelyingpartyRequest,
  output: SignOutUserRelyingpartyResponse,
  errors: [],
}));

/** Set project configuration. */
export interface SetProjectConfigRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartySetProjectConfigRequest;
}

export const SetProjectConfigRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartySetProjectConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "setProjectConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetProjectConfigRelyingpartyRequest>;

export type SetProjectConfigRelyingpartyResponse = IdentitytoolkitRelyingpartySetProjectConfigResponse;
export const SetProjectConfigRelyingpartyResponse = IdentitytoolkitRelyingpartySetProjectConfigResponse;

export type SetProjectConfigRelyingpartyError = CommonErrors;

export const setProjectConfigRelyingparty: API.OperationMethod<SetProjectConfigRelyingpartyRequest, SetProjectConfigRelyingpartyResponse, SetProjectConfigRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetProjectConfigRelyingpartyRequest,
  output: SetProjectConfigRelyingpartyResponse,
  errors: [],
}));

/** Verifies ownership of a phone number and creates/updates the user account accordingly. */
export interface VerifyPhoneNumberRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest;
}

export const VerifyPhoneNumberRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "verifyPhoneNumber", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyPhoneNumberRelyingpartyRequest>;

export type VerifyPhoneNumberRelyingpartyResponse = IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse;
export const VerifyPhoneNumberRelyingpartyResponse = IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse;

export type VerifyPhoneNumberRelyingpartyError = CommonErrors;

export const verifyPhoneNumberRelyingparty: API.OperationMethod<VerifyPhoneNumberRelyingpartyRequest, VerifyPhoneNumberRelyingpartyResponse, VerifyPhoneNumberRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyPhoneNumberRelyingpartyRequest,
  output: VerifyPhoneNumberRelyingpartyResponse,
  errors: [],
}));

/** Reset password for a user. */
export interface ResetPasswordRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyResetPasswordRequest;
}

export const ResetPasswordRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyResetPasswordRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "resetPassword", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetPasswordRelyingpartyRequest>;

export type ResetPasswordRelyingpartyResponse = ResetPasswordResponse;
export const ResetPasswordRelyingpartyResponse = ResetPasswordResponse;

export type ResetPasswordRelyingpartyError = CommonErrors;

export const resetPasswordRelyingparty: API.OperationMethod<ResetPasswordRelyingpartyRequest, ResetPasswordRelyingpartyResponse, ResetPasswordRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetPasswordRelyingpartyRequest,
  output: ResetPasswordRelyingpartyResponse,
  errors: [],
}));

/** Send SMS verification code. */
export interface SendVerificationCodeRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartySendVerificationCodeRequest;
}

export const SendVerificationCodeRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartySendVerificationCodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "sendVerificationCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendVerificationCodeRelyingpartyRequest>;

export type SendVerificationCodeRelyingpartyResponse = IdentitytoolkitRelyingpartySendVerificationCodeResponse;
export const SendVerificationCodeRelyingpartyResponse = IdentitytoolkitRelyingpartySendVerificationCodeResponse;

export type SendVerificationCodeRelyingpartyError = CommonErrors;

export const sendVerificationCodeRelyingparty: API.OperationMethod<SendVerificationCodeRelyingpartyRequest, SendVerificationCodeRelyingpartyResponse, SendVerificationCodeRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendVerificationCodeRelyingpartyRequest,
  output: SendVerificationCodeRelyingpartyResponse,
  errors: [],
}));

/** Get project configuration. */
export interface GetProjectConfigRelyingpartyRequest {
  /** Delegated GCP project number of the request. */
  delegatedProjectNumber?: string;
  /** GCP project number of the request. */
  projectNumber?: string;
}

export const GetProjectConfigRelyingpartyRequest = Schema.Struct({
  delegatedProjectNumber: Schema.optional(Schema.String).pipe(T.HttpQuery("delegatedProjectNumber")),
  projectNumber: Schema.optional(Schema.String).pipe(T.HttpQuery("projectNumber")),
}).pipe(
  T.Http({ method: "GET", path: "getProjectConfig" }),
  svc,
) as unknown as Schema.Schema<GetProjectConfigRelyingpartyRequest>;

export type GetProjectConfigRelyingpartyResponse = IdentitytoolkitRelyingpartyGetProjectConfigResponse;
export const GetProjectConfigRelyingpartyResponse = IdentitytoolkitRelyingpartyGetProjectConfigResponse;

export type GetProjectConfigRelyingpartyError = CommonErrors;

export const getProjectConfigRelyingparty: API.OperationMethod<GetProjectConfigRelyingpartyRequest, GetProjectConfigRelyingpartyResponse, GetProjectConfigRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectConfigRelyingpartyRequest,
  output: GetProjectConfigRelyingpartyResponse,
  errors: [],
}));

/** Get a code for user action confirmation. */
export interface GetOobConfirmationCodeRelyingpartyRequest {
  /** Request body */
  body?: Relyingparty;
}

export const GetOobConfirmationCodeRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(Relyingparty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "getOobConfirmationCode", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetOobConfirmationCodeRelyingpartyRequest>;

export type GetOobConfirmationCodeRelyingpartyResponse = GetOobConfirmationCodeResponse;
export const GetOobConfirmationCodeRelyingpartyResponse = GetOobConfirmationCodeResponse;

export type GetOobConfirmationCodeRelyingpartyError = CommonErrors;

export const getOobConfirmationCodeRelyingparty: API.OperationMethod<GetOobConfirmationCodeRelyingpartyRequest, GetOobConfirmationCodeRelyingpartyResponse, GetOobConfirmationCodeRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOobConfirmationCodeRelyingpartyRequest,
  output: GetOobConfirmationCodeRelyingpartyResponse,
  errors: [],
}));

/** Creates the URI used by the IdP to authenticate the user. */
export interface CreateAuthUriRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyCreateAuthUriRequest;
}

export const CreateAuthUriRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyCreateAuthUriRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "createAuthUri", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAuthUriRelyingpartyRequest>;

export type CreateAuthUriRelyingpartyResponse = CreateAuthUriResponse;
export const CreateAuthUriRelyingpartyResponse = CreateAuthUriResponse;

export type CreateAuthUriRelyingpartyError = CommonErrors;

export const createAuthUriRelyingparty: API.OperationMethod<CreateAuthUriRelyingpartyRequest, CreateAuthUriRelyingpartyResponse, CreateAuthUriRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAuthUriRelyingpartyRequest,
  output: CreateAuthUriRelyingpartyResponse,
  errors: [],
}));

/** Delete user account. */
export interface DeleteAccountRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyDeleteAccountRequest;
}

export const DeleteAccountRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyDeleteAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "deleteAccount", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteAccountRelyingpartyRequest>;

export type DeleteAccountRelyingpartyResponse = DeleteAccountResponse;
export const DeleteAccountRelyingpartyResponse = DeleteAccountResponse;

export type DeleteAccountRelyingpartyError = CommonErrors;

export const deleteAccountRelyingparty: API.OperationMethod<DeleteAccountRelyingpartyRequest, DeleteAccountRelyingpartyResponse, DeleteAccountRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountRelyingpartyRequest,
  output: DeleteAccountRelyingpartyResponse,
  errors: [],
}));

/** Batch upload existing user accounts. */
export interface UploadAccountRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyUploadAccountRequest;
}

export const UploadAccountRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyUploadAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "uploadAccount", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UploadAccountRelyingpartyRequest>;

export type UploadAccountRelyingpartyResponse = UploadAccountResponse;
export const UploadAccountRelyingpartyResponse = UploadAccountResponse;

export type UploadAccountRelyingpartyError = CommonErrors;

export const uploadAccountRelyingparty: API.OperationMethod<UploadAccountRelyingpartyRequest, UploadAccountRelyingpartyResponse, UploadAccountRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UploadAccountRelyingpartyRequest,
  output: UploadAccountRelyingpartyResponse,
  errors: [],
}));

/** Batch download user accounts. */
export interface DownloadAccountRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyDownloadAccountRequest;
}

export const DownloadAccountRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyDownloadAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "downloadAccount", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DownloadAccountRelyingpartyRequest>;

export type DownloadAccountRelyingpartyResponse = DownloadAccountResponse;
export const DownloadAccountRelyingpartyResponse = DownloadAccountResponse;

export type DownloadAccountRelyingpartyError = CommonErrors;

export const downloadAccountRelyingparty: API.OperationMethod<DownloadAccountRelyingpartyRequest, DownloadAccountRelyingpartyResponse, DownloadAccountRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DownloadAccountRelyingpartyRequest,
  output: DownloadAccountRelyingpartyResponse,
  errors: [],
}));

/** Verifies the developer asserted ID token. */
export interface VerifyCustomTokenRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyVerifyCustomTokenRequest;
}

export const VerifyCustomTokenRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyVerifyCustomTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "verifyCustomToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyCustomTokenRelyingpartyRequest>;

export type VerifyCustomTokenRelyingpartyResponse = VerifyCustomTokenResponse;
export const VerifyCustomTokenRelyingpartyResponse = VerifyCustomTokenResponse;

export type VerifyCustomTokenRelyingpartyError = CommonErrors;

export const verifyCustomTokenRelyingparty: API.OperationMethod<VerifyCustomTokenRelyingpartyRequest, VerifyCustomTokenRelyingpartyResponse, VerifyCustomTokenRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyCustomTokenRelyingpartyRequest,
  output: VerifyCustomTokenRelyingpartyResponse,
  errors: [],
}));

/** Verifies the user entered password. */
export interface VerifyPasswordRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyVerifyPasswordRequest;
}

export const VerifyPasswordRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyVerifyPasswordRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "verifyPassword", hasBody: true }),
  svc,
) as unknown as Schema.Schema<VerifyPasswordRelyingpartyRequest>;

export type VerifyPasswordRelyingpartyResponse = VerifyPasswordResponse;
export const VerifyPasswordRelyingpartyResponse = VerifyPasswordResponse;

export type VerifyPasswordRelyingpartyError = CommonErrors;

export const verifyPasswordRelyingparty: API.OperationMethod<VerifyPasswordRelyingpartyRequest, VerifyPasswordRelyingpartyResponse, VerifyPasswordRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VerifyPasswordRelyingpartyRequest,
  output: VerifyPasswordRelyingpartyResponse,
  errors: [],
}));

/** Signup new user. */
export interface SignupNewUserRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartySignupNewUserRequest;
}

export const SignupNewUserRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartySignupNewUserRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "signupNewUser", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignupNewUserRelyingpartyRequest>;

export type SignupNewUserRelyingpartyResponse = SignupNewUserResponse;
export const SignupNewUserRelyingpartyResponse = SignupNewUserResponse;

export type SignupNewUserRelyingpartyError = CommonErrors;

export const signupNewUserRelyingparty: API.OperationMethod<SignupNewUserRelyingpartyRequest, SignupNewUserRelyingpartyResponse, SignupNewUserRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignupNewUserRelyingpartyRequest,
  output: SignupNewUserRelyingpartyResponse,
  errors: [],
}));

/** Get recaptcha secure param. */
export interface GetRecaptchaParamRelyingpartyRequest {
}

export const GetRecaptchaParamRelyingpartyRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "getRecaptchaParam" }),
  svc,
) as unknown as Schema.Schema<GetRecaptchaParamRelyingpartyRequest>;

export type GetRecaptchaParamRelyingpartyResponse = GetRecaptchaParamResponse;
export const GetRecaptchaParamRelyingpartyResponse = GetRecaptchaParamResponse;

export type GetRecaptchaParamRelyingpartyError = CommonErrors;

export const getRecaptchaParamRelyingparty: API.OperationMethod<GetRecaptchaParamRelyingpartyRequest, GetRecaptchaParamRelyingpartyResponse, GetRecaptchaParamRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRecaptchaParamRelyingpartyRequest,
  output: GetRecaptchaParamRelyingpartyResponse,
  errors: [],
}));

/** Reset password for a user. */
export interface EmailLinkSigninRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyEmailLinkSigninRequest;
}

export const EmailLinkSigninRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyEmailLinkSigninRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "emailLinkSignin", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EmailLinkSigninRelyingpartyRequest>;

export type EmailLinkSigninRelyingpartyResponse = EmailLinkSigninResponse;
export const EmailLinkSigninRelyingpartyResponse = EmailLinkSigninResponse;

export type EmailLinkSigninRelyingpartyError = CommonErrors;

export const emailLinkSigninRelyingparty: API.OperationMethod<EmailLinkSigninRelyingpartyRequest, EmailLinkSigninRelyingpartyResponse, EmailLinkSigninRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EmailLinkSigninRelyingpartyRequest,
  output: EmailLinkSigninRelyingpartyResponse,
  errors: [],
}));

/** Returns the account info. */
export interface GetAccountInfoRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartyGetAccountInfoRequest;
}

export const GetAccountInfoRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartyGetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "getAccountInfo", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetAccountInfoRelyingpartyRequest>;

export type GetAccountInfoRelyingpartyResponse = GetAccountInfoResponse;
export const GetAccountInfoRelyingpartyResponse = GetAccountInfoResponse;

export type GetAccountInfoRelyingpartyError = CommonErrors;

export const getAccountInfoRelyingparty: API.OperationMethod<GetAccountInfoRelyingpartyRequest, GetAccountInfoRelyingpartyResponse, GetAccountInfoRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountInfoRelyingpartyRequest,
  output: GetAccountInfoRelyingpartyResponse,
  errors: [],
}));

/** Set account info for a user. */
export interface SetAccountInfoRelyingpartyRequest {
  /** Request body */
  body?: IdentitytoolkitRelyingpartySetAccountInfoRequest;
}

export const SetAccountInfoRelyingpartyRequest = Schema.Struct({
  body: Schema.optional(IdentitytoolkitRelyingpartySetAccountInfoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "setAccountInfo", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAccountInfoRelyingpartyRequest>;

export type SetAccountInfoRelyingpartyResponse = SetAccountInfoResponse;
export const SetAccountInfoRelyingpartyResponse = SetAccountInfoResponse;

export type SetAccountInfoRelyingpartyError = CommonErrors;

export const setAccountInfoRelyingparty: API.OperationMethod<SetAccountInfoRelyingpartyRequest, SetAccountInfoRelyingpartyResponse, SetAccountInfoRelyingpartyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAccountInfoRelyingpartyRequest,
  output: SetAccountInfoRelyingpartyResponse,
  errors: [],
}));

